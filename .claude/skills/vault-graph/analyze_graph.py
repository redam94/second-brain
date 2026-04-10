#!/usr/bin/env python3
"""
analyze_graph.py — Run graph analytics on a vault knowledge graph.

Usage:
    # From a graph JSON file:
    python3 analyze_graph.py graph.json [--mode <mode>] [--top N] [--folder <folder>]

    # Piped from build_graph.py:
    python3 build_graph.py /vault | python3 analyze_graph.py - --mode all

Modes:
    all          Run all analyses (default)
    centrality   PageRank + degree centrality — most/least connected notes
    orphans      Notes with no incoming or outgoing links
    bridges      High betweenness centrality — notes that connect clusters
    communities  Greedy modularity community detection
    tags         Tag co-occurrence and per-tag connectivity
    density      Per-folder link density and cross-folder link analysis

Output: JSON with analysis results, designed to be readable by Claude.
"""

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

import networkx as nx


def load_graph_data(path: str) -> dict:
    if path == '-':
        return json.load(sys.stdin)
    return json.loads(Path(path).read_text(encoding='utf-8'))


def build_nx_graph(data: dict, include_types: list[str] | None = None) -> tuple[nx.DiGraph, dict]:
    """Build a NetworkX DiGraph from graph JSON. Returns (graph, node_meta)."""
    G = nx.DiGraph()
    node_meta = {n['id']: n for n in data['nodes']}

    for n in data['nodes']:
        G.add_node(n['id'], **{k: v for k, v in n.items() if k != 'id'})

    for e in data['edges']:
        if include_types and e['type'] not in include_types:
            continue
        if e['source'] in node_meta and e['target'] in node_meta:
            G.add_edge(e['source'], e['target'], type=e['type'])

    return G, node_meta


def analyze_centrality(G: nx.DiGraph, node_meta: dict, top_n: int = 15) -> dict:
    """PageRank and degree centrality."""
    if len(G) == 0:
        return {'error': 'Empty graph'}

    pagerank = nx.pagerank(G, alpha=0.85)
    in_degree = dict(G.in_degree())
    out_degree = dict(G.out_degree())

    # Top by PageRank
    top_pr = sorted(pagerank.items(), key=lambda x: -x[1])[:top_n]
    # Least linked (potential orphans or under-referenced)
    bottom_pr = sorted(pagerank.items(), key=lambda x: x[1])[:top_n]

    def node_summary(node_id, score):
        m = node_meta.get(node_id, {})
        return {
            'note': m.get('title', Path(node_id).stem),
            'id': node_id,
            'score': round(score, 6),
            'in_links': in_degree.get(node_id, 0),
            'out_links': out_degree.get(node_id, 0),
            'folder': m.get('folder', ''),
            'tags': m.get('tags', []),
        }

    return {
        'most_central': [node_summary(nid, s) for nid, s in top_pr],
        'least_central': [node_summary(nid, s) for nid, s in bottom_pr
                          if not node_meta.get(nid, {}).get('is_index', False)],
        'stats': {
            'mean_in_degree': round(sum(in_degree.values()) / max(len(in_degree), 1), 2),
            'mean_out_degree': round(sum(out_degree.values()) / max(len(out_degree), 1), 2),
            'max_in_degree': max(in_degree.values(), default=0),
            'max_out_degree': max(out_degree.values(), default=0),
        }
    }


def analyze_orphans(G: nx.DiGraph, node_meta: dict) -> dict:
    """Find notes with no links in or out (excluding index files)."""
    no_in = [n for n in G.nodes if G.in_degree(n) == 0
             and not node_meta.get(n, {}).get('is_index', False)]
    no_out = [n for n in G.nodes if G.out_degree(n) == 0
              and not node_meta.get(n, {}).get('is_index', False)]
    true_orphans = set(no_in) & set(no_out)

    def fmt(node_ids):
        return [
            {
                'note': node_meta.get(n, {}).get('title', Path(n).stem),
                'id': n,
                'folder': node_meta.get(n, {}).get('folder', ''),
                'tags': node_meta.get(n, {}).get('tags', []),
            }
            for n in sorted(node_ids)
        ]

    return {
        'true_orphans': fmt(true_orphans),
        'no_incoming_links': fmt(set(no_in) - true_orphans),
        'no_outgoing_links': fmt(set(no_out) - true_orphans),
        'counts': {
            'true_orphans': len(true_orphans),
            'no_incoming': len(no_in),
            'no_outgoing': len(no_out),
        }
    }


def analyze_bridges(G: nx.DiGraph, node_meta: dict, top_n: int = 10) -> dict:
    """Find bridge notes using betweenness centrality on the undirected version."""
    if len(G) < 3:
        return {'error': 'Graph too small for bridge analysis'}

    UG = G.to_undirected()
    # Use approximation for large graphs
    if len(UG) > 500:
        betweenness = nx.betweenness_centrality(UG, k=min(200, len(UG)), normalized=True)
    else:
        betweenness = nx.betweenness_centrality(UG, normalized=True)

    top_bridges = sorted(betweenness.items(), key=lambda x: -x[1])[:top_n]

    def fmt(node_id, score):
        m = node_meta.get(node_id, {})
        return {
            'note': m.get('title', Path(node_id).stem),
            'id': node_id,
            'betweenness': round(score, 6),
            'in_links': G.in_degree(node_id),
            'out_links': G.out_degree(node_id),
            'folder': m.get('folder', ''),
        }

    # Connected components (undirected)
    components = list(nx.connected_components(UG))

    return {
        'top_bridges': [fmt(nid, s) for nid, s in top_bridges
                        if not node_meta.get(nid, {}).get('is_index', False)],
        'connected_components': {
            'count': len(components),
            'sizes': sorted([len(c) for c in components], reverse=True)[:10],
            'largest_component_fraction': round(max(len(c) for c in components) / max(len(G), 1), 3),
        }
    }


def analyze_communities(G: nx.DiGraph, node_meta: dict) -> dict:
    """Greedy modularity community detection on undirected graph."""
    if len(G) < 4:
        return {'error': 'Graph too small for community detection'}

    UG = G.to_undirected()
    # Remove isolated nodes for community detection
    UG_connected = UG.copy()
    UG_connected.remove_nodes_from(list(nx.isolates(UG_connected)))

    if len(UG_connected) < 4:
        return {'error': 'Not enough connected nodes for community detection'}

    communities = list(nx.community.greedy_modularity_communities(UG_connected))
    communities.sort(key=len, reverse=True)

    result = []
    for i, comm in enumerate(communities):
        members = list(comm)
        # Folder distribution within community
        folder_counts = Counter(node_meta.get(n, {}).get('folder', 'unknown') for n in members)
        # Most common tags
        tag_counts = Counter(
            t for n in members
            for t in node_meta.get(n, {}).get('tags', [])
            if not t.startswith('source/')
        )
        # Note titles
        titles = sorted([node_meta.get(n, {}).get('title', Path(n).stem) for n in members])

        result.append({
            'community_id': i,
            'size': len(members),
            'primary_folder': folder_counts.most_common(1)[0][0] if folder_counts else '',
            'folder_distribution': dict(folder_counts.most_common(5)),
            'top_tags': dict(tag_counts.most_common(5)),
            'notes': titles,
            'note_ids': members,
        })

    # Cross-community edges
    node_to_comm = {}
    for i, comm in enumerate(communities):
        for n in comm:
            node_to_comm[n] = i

    cross_edges = sum(
        1 for u, v in G.edges()
        if node_to_comm.get(u) != node_to_comm.get(v)
        and u in node_to_comm and v in node_to_comm
    )

    return {
        'communities': result,
        'stats': {
            'num_communities': len(communities),
            'cross_community_edges': cross_edges,
            'modularity_note': 'Higher modularity = more distinct clusters',
        }
    }


def analyze_tags(G: nx.DiGraph, node_meta: dict) -> dict:
    """Tag co-occurrence and per-tag connectivity."""
    tag_notes: dict[str, list[str]] = defaultdict(list)
    for n in G.nodes:
        for tag in node_meta.get(n, {}).get('tags', []):
            tag_notes[tag].append(n)

    # Per-tag stats
    tag_stats = []
    for tag, nodes in sorted(tag_notes.items(), key=lambda x: -len(x[1])):
        subgraph = G.subgraph(nodes)
        avg_degree = sum(dict(subgraph.degree()).values()) / max(len(nodes), 1)
        tag_stats.append({
            'tag': tag,
            'note_count': len(nodes),
            'avg_internal_degree': round(avg_degree, 2),
            'internal_edges': subgraph.number_of_edges(),
        })

    # Tag co-occurrence (which tags appear together)
    co_occur: Counter = Counter()
    for n in G.nodes:
        tags = [t for t in node_meta.get(n, {}).get('tags', []) if not t.startswith('source/')]
        for i, t1 in enumerate(tags):
            for t2 in tags[i+1:]:
                co_occur[tuple(sorted([t1, t2]))] += 1

    return {
        'tag_stats': tag_stats[:30],
        'top_tag_pairs': [
            {'tags': list(pair), 'count': count}
            for pair, count in co_occur.most_common(15)
        ],
        'total_unique_tags': len(tag_notes),
    }


def analyze_density(G: nx.DiGraph, node_meta: dict) -> dict:
    """Per-folder link density and cross-folder link analysis."""
    folder_nodes: dict[str, list[str]] = defaultdict(list)
    for n in G.nodes:
        folder = node_meta.get(n, {}).get('folder', 'root')
        folder_nodes[folder].append(n)

    folder_stats = []
    for folder, nodes in sorted(folder_nodes.items(), key=lambda x: -len(x[1])):
        subgraph = G.subgraph(nodes)
        n_nodes = len(nodes)
        n_edges = subgraph.number_of_edges()
        max_edges = n_nodes * (n_nodes - 1)
        density = n_edges / max_edges if max_edges > 0 else 0

        # Cross-folder outgoing links
        cross_out = sum(
            1 for u in nodes for v in G.successors(u)
            if node_meta.get(v, {}).get('folder', '') != folder
        )

        folder_stats.append({
            'folder': folder,
            'note_count': n_nodes,
            'internal_edges': n_edges,
            'internal_density': round(density, 4),
            'cross_folder_outgoing': cross_out,
            'notes': sorted([node_meta.get(n, {}).get('title', Path(n).stem) for n in nodes]),
        })

    # Cross-folder edge matrix (top folder pairs)
    cross_matrix: Counter = Counter()
    for u, v, data in G.edges(data=True):
        src_folder = node_meta.get(u, {}).get('folder', 'root')
        tgt_folder = node_meta.get(v, {}).get('folder', 'root')
        if src_folder != tgt_folder:
            cross_matrix[(src_folder, tgt_folder)] += 1

    return {
        'folder_stats': folder_stats,
        'top_cross_folder_links': [
            {'from': pair[0], 'to': pair[1], 'count': count}
            for pair, count in cross_matrix.most_common(20)
        ],
    }


def run_analysis(data: dict, modes: list[str], top_n: int, folder_filter: str | None) -> dict:
    # Optionally filter to a subfolder
    if folder_filter:
        data['nodes'] = [n for n in data['nodes'] if n['folder'].startswith(folder_filter)]
        node_ids = {n['id'] for n in data['nodes']}
        data['edges'] = [e for e in data['edges']
                         if e['source'] in node_ids and e['target'] in node_ids]

    G, node_meta = build_nx_graph(data)
    results = {
        'vault_stats': data.get('stats', {}),
        'filtered_to': folder_filter or 'entire vault',
        'graph_stats': {
            'nodes': G.number_of_nodes(),
            'edges': G.number_of_edges(),
        }
    }

    all_modes = modes == ['all']

    if all_modes or 'centrality' in modes:
        results['centrality'] = analyze_centrality(G, node_meta, top_n)

    if all_modes or 'orphans' in modes:
        results['orphans'] = analyze_orphans(G, node_meta)

    if all_modes or 'bridges' in modes:
        results['bridges'] = analyze_bridges(G, node_meta, top_n)

    if all_modes or 'communities' in modes:
        results['communities'] = analyze_communities(G, node_meta)

    if all_modes or 'tags' in modes:
        results['tags'] = analyze_tags(G, node_meta)

    if all_modes or 'density' in modes:
        results['density'] = analyze_density(G, node_meta)

    return results


def main():
    parser = argparse.ArgumentParser(description='Analyze a vault knowledge graph.')
    parser.add_argument('graph_json', help='Path to graph JSON (from build_graph.py) or "-" for stdin')
    parser.add_argument('--mode', '-m', nargs='+',
                        choices=['all', 'centrality', 'orphans', 'bridges', 'communities', 'tags', 'density'],
                        default=['all'], help='Analysis modes to run')
    parser.add_argument('--top', '-t', type=int, default=15, help='Top-N results to return')
    parser.add_argument('--folder', '-f', default=None, help='Filter to a subfolder path')
    parser.add_argument('--output', '-o', default='-', help='Output JSON file (default: stdout)')
    args = parser.parse_args()

    data = load_graph_data(args.graph_json)
    results = run_analysis(data, args.mode, args.top, args.folder)

    output = json.dumps(results, indent=2, ensure_ascii=False)
    if args.output == '-':
        print(output)
    else:
        Path(args.output).write_text(output, encoding='utf-8')
        print(f'Analysis written to {args.output}', file=sys.stderr)


if __name__ == '__main__':
    main()
