#!/usr/bin/env python3
"""
optimize_structure.py — Suggest folder structure optimizations based on graph topology.

Usage:
    python3 optimize_structure.py graph.json [--folder <subfolder>] [--output suggestions.json]

    # Full pipeline:
    python3 build_graph.py /vault | python3 optimize_structure.py - --folder Research

Output: JSON with ranked, actionable suggestions:
  - Notes to move (based on link gravity toward another folder)
  - Missing wikilinks (notes discussing the same concept without linking)
  - Notes that should be split (too many responsibilities — high betweenness + mixed tags)
  - New folder suggestions (community clusters not yet reflected in folder structure)
  - Shallow notes (very few links AND short content)
"""

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

import networkx as nx


def load_graph(path: str) -> dict:
    if path == '-':
        return json.load(sys.stdin)
    return json.loads(Path(path).read_text(encoding='utf-8'))


def build_nx(data: dict) -> tuple[nx.DiGraph, dict]:
    G = nx.DiGraph()
    node_meta = {n['id']: n for n in data['nodes']}
    for n in data['nodes']:
        G.add_node(n['id'])
    for e in data['edges']:
        if e['source'] in node_meta and e['target'] in node_meta:
            G.add_edge(e['source'], e['target'], type=e['type'])
    return G, node_meta


# ---------------------------------------------------------------------------
# Suggestion 1: Move candidates — link gravity
# ---------------------------------------------------------------------------

def suggest_moves(G: nx.DiGraph, node_meta: dict) -> list[dict]:
    """
    For each note, compare how many links it has to notes in its own folder
    vs. links to notes in other folders. If a note is more connected to a
    different folder than its own, flag it as a move candidate.
    """
    suggestions = []

    for node in G.nodes:
        meta = node_meta.get(node, {})
        if meta.get('is_index'):
            continue

        current_folder = meta.get('folder', '')
        neighbors = list(G.predecessors(node)) + list(G.successors(node))
        if not neighbors:
            continue

        folder_counts: Counter = Counter()
        for nb in neighbors:
            nb_folder = node_meta.get(nb, {}).get('folder', '')
            folder_counts[nb_folder] += 1

        top_folder, top_count = folder_counts.most_common(1)[0]
        home_count = folder_counts.get(current_folder, 0)

        if top_folder != current_folder and top_count > home_count and top_count >= 3:
            suggestions.append({
                'type': 'move',
                'priority': round((top_count - home_count) / max(len(neighbors), 1), 3),
                'note': meta.get('title', Path(node).stem),
                'note_id': node,
                'current_folder': current_folder,
                'suggested_folder': top_folder,
                'link_count_there': top_count,
                'link_count_here': home_count,
                'total_neighbors': len(neighbors),
                'reason': (
                    f"{top_count}/{len(neighbors)} neighbors are in '{top_folder}' "
                    f"vs {home_count} in current folder '{current_folder}'"
                ),
            })

    return sorted(suggestions, key=lambda x: -x['priority'])


# ---------------------------------------------------------------------------
# Suggestion 2: Missing wikilinks — co-cited notes
# ---------------------------------------------------------------------------

def suggest_missing_links(G: nx.DiGraph, node_meta: dict, min_shared: int = 3) -> list[dict]:
    """
    Find pairs of notes that share many common neighbors (co-cited / co-citing)
    but do not directly link to each other. These are candidates for explicit links.
    """
    UG = G.to_undirected()
    suggestions = []
    seen = set()

    nodes = [n for n in G.nodes if not node_meta.get(n, {}).get('is_index')]

    for node in nodes:
        neighbors_a = set(UG.neighbors(node))
        if len(neighbors_a) < 2:
            continue

        # Find other nodes that share many neighbors with `node`
        candidate_counts: Counter = Counter()
        for nb in neighbors_a:
            for nb2 in UG.neighbors(nb):
                if nb2 != node and not node_meta.get(nb2, {}).get('is_index'):
                    candidate_counts[nb2] += 1

        for other, shared in candidate_counts.most_common(5):
            if shared < min_shared:
                break
            if UG.has_edge(node, other):
                continue
            pair = tuple(sorted([node, other]))
            if pair in seen:
                continue
            seen.add(pair)

            meta_a = node_meta.get(node, {})
            meta_b = node_meta.get(other, {})
            shared_nodes = neighbors_a & set(UG.neighbors(other))

            suggestions.append({
                'type': 'missing_link',
                'priority': shared,
                'note_a': meta_a.get('title', Path(node).stem),
                'note_a_id': node,
                'note_b': meta_b.get('title', Path(other).stem),
                'note_b_id': other,
                'shared_neighbors': shared,
                'shared_neighbor_titles': [
                    node_meta.get(n, {}).get('title', Path(n).stem)
                    for n in list(shared_nodes)[:5]
                ],
                'reason': (
                    f"Both notes share {shared} common neighbors but are not linked"
                ),
            })

    return sorted(suggestions, key=lambda x: -x['priority'])[:30]


# ---------------------------------------------------------------------------
# Suggestion 3: New folder suggestions — community-folder mismatch
# ---------------------------------------------------------------------------

def suggest_new_folders(G: nx.DiGraph, node_meta: dict) -> list[dict]:
    """
    Detect communities (clusters of notes) whose members are scattered
    across multiple folders, suggesting they might benefit from a shared folder.
    Excludes communities that already map cleanly to one folder.
    """
    UG = G.to_undirected()
    UG_conn = UG.copy()
    UG_conn.remove_nodes_from(list(nx.isolates(UG_conn)))

    if len(UG_conn) < 4:
        return []

    communities = list(nx.community.greedy_modularity_communities(UG_conn))
    suggestions = []

    for i, comm in enumerate(communities):
        members = [n for n in comm if not node_meta.get(n, {}).get('is_index')]
        if len(members) < 4:
            continue

        folder_counts = Counter(node_meta.get(n, {}).get('folder', '') for n in members)
        top_folder, top_count = folder_counts.most_common(1)[0]
        scatter_ratio = 1 - (top_count / len(members))

        if scatter_ratio < 0.3:
            continue  # Community mostly lives in one folder already

        # Infer a name from shared tags
        tag_counts = Counter(
            t for n in members
            for t in node_meta.get(n, {}).get('tags', [])
            if not t.startswith('source/') and not t.startswith('type/')
        )
        top_tags = [t for t, _ in tag_counts.most_common(3)]

        suggestions.append({
            'type': 'new_folder',
            'priority': round(scatter_ratio, 3),
            'community_size': len(members),
            'scatter_ratio': round(scatter_ratio, 3),
            'folder_distribution': dict(folder_counts.most_common(5)),
            'suggested_name_hint': ' / '.join(top_tags) if top_tags else f'Community {i}',
            'member_notes': sorted([
                node_meta.get(n, {}).get('title', Path(n).stem) for n in members
            ]),
            'reason': (
                f"{len(members)}-note cluster is scattered across "
                f"{len(folder_counts)} folders (scatter ratio {scatter_ratio:.0%})"
            ),
        })

    return sorted(suggestions, key=lambda x: -x['priority'])


# ---------------------------------------------------------------------------
# Suggestion 4: Split candidates — high betweenness + mixed tag/folder links
# ---------------------------------------------------------------------------

def suggest_splits(G: nx.DiGraph, node_meta: dict, top_n: int = 10) -> list[dict]:
    """
    Find notes with high betweenness centrality that also link to many
    different folders/topics — potential candidates for splitting into
    more focused notes.
    """
    if len(G) < 5:
        return []

    UG = G.to_undirected()
    if len(UG) > 500:
        betweenness = nx.betweenness_centrality(UG, k=min(200, len(UG)), normalized=True)
    else:
        betweenness = nx.betweenness_centrality(UG, normalized=True)

    suggestions = []
    for node, bw in sorted(betweenness.items(), key=lambda x: -x[1])[:top_n * 2]:
        meta = node_meta.get(node, {})
        if meta.get('is_index') or bw < 0.01:
            continue

        neighbors = list(G.predecessors(node)) + list(G.successors(node))
        neighbor_folders = Counter(node_meta.get(n, {}).get('folder', '') for n in neighbors)
        neighbor_tags = Counter(
            t for n in neighbors
            for t in node_meta.get(n, {}).get('tags', [])
            if not t.startswith('source/')
        )

        if len(neighbor_folders) < 3:
            continue  # Not truly cross-cutting

        suggestions.append({
            'type': 'split_candidate',
            'priority': round(bw * len(neighbor_folders), 4),
            'note': meta.get('title', Path(node).stem),
            'note_id': node,
            'betweenness': round(bw, 5),
            'total_connections': len(neighbors),
            'connected_folders': len(neighbor_folders),
            'top_connected_folders': dict(neighbor_folders.most_common(5)),
            'top_neighbor_tags': dict(neighbor_tags.most_common(5)),
            'reason': (
                f"High betweenness ({bw:.3f}), connects to {len(neighbor_folders)} different folders"
            ),
        })

    return sorted(suggestions, key=lambda x: -x['priority'])[:top_n]


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_optimization(data: dict, folder_filter: str | None) -> dict:
    if folder_filter:
        data['nodes'] = [n for n in data['nodes'] if n['folder'].startswith(folder_filter)]
        node_ids = {n['id'] for n in data['nodes']}
        data['edges'] = [e for e in data['edges']
                         if e['source'] in node_ids and e['target'] in node_ids]

    G, node_meta = build_nx(data)

    moves = suggest_moves(G, node_meta)
    missing = suggest_missing_links(G, node_meta)
    new_folders = suggest_new_folders(G, node_meta)
    splits = suggest_splits(G, node_meta)

    return {
        'scope': folder_filter or 'entire vault',
        'graph_stats': {'nodes': G.number_of_nodes(), 'edges': G.number_of_edges()},
        'summary': {
            'move_candidates': len(moves),
            'missing_links': len(missing),
            'new_folder_suggestions': len(new_folders),
            'split_candidates': len(splits),
        },
        'move_candidates': moves[:20],
        'missing_links': missing[:20],
        'new_folder_suggestions': new_folders,
        'split_candidates': splits,
    }


def main():
    parser = argparse.ArgumentParser(description='Suggest vault structure optimizations.')
    parser.add_argument('graph_json', help='Path to graph JSON or "-" for stdin')
    parser.add_argument('--folder', '-f', default=None, help='Filter to a subfolder')
    parser.add_argument('--output', '-o', default='-', help='Output JSON file')
    args = parser.parse_args()

    data = load_graph(args.graph_json)
    results = run_optimization(data, args.folder)

    output = json.dumps(results, indent=2, ensure_ascii=False)
    if args.output == '-':
        print(output)
    else:
        Path(args.output).write_text(output, encoding='utf-8')
        print(f'Suggestions written to {args.output}', file=sys.stderr)


if __name__ == '__main__':
    main()
