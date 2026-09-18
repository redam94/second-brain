#!/usr/bin/env python3
"""
build_graph.py — Parse an Obsidian vault and build a NetworkX knowledge graph.

Usage:
    python3 build_graph.py <vault_path> [--output graph.json] [--folder <subfolder>]

Output JSON schema:
    {
      "nodes": [
        {
          "id": "relative/path/to/Note.md",
          "title": "Note Title",
          "folder": "relative/folder/path",
          "tags": ["tag1", "tag2"],
          "doc_type": "paper",
          "depends_on": ["Other Note"],
          "used_by": ["Another Note"],
          "out_links": ["linked note name"],
          "is_index": false
        }
      ],
      "edges": [
        {
          "source": "relative/path/Note.md",
          "target": "relative/path/Other.md",
          "type": "wikilink" | "depends_on" | "used_by"
        }
      ],
      "stats": {
        "total_notes": N,
        "total_edges": M,
        "folders": ["folder1", ...]
      }
    }
"""

import argparse
import json
import re
import sys
from pathlib import Path

import yaml


WIKILINK_RE = re.compile(r'\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]')
FRONTMATTER_RE = re.compile(r'^---\s*\n(.*?)\n---', re.DOTALL)
# Non-vault directories at the repo root: Quartz site tooling and the content/ mirror of the vault
EXCLUDED_TOP_DIRS = {'node_modules', 'content', 'public', 'quartz', 'scripts'}


def parse_frontmatter(text: str) -> dict:
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}
    try:
        return yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        return {}


def parse_wikilinks(text: str) -> list[str]:
    """Extract wikilink targets from note body (excluding frontmatter)."""
    # Strip frontmatter first
    body = FRONTMATTER_RE.sub('', text, count=1)
    links = []
    for m in WIKILINK_RE.finditer(body):
        target = m.group(1).strip()
        # Strip path prefix if present (e.g. "folder/Note" -> "Note")
        if '/' in target:
            target = target.split('/')[-1]
        # Strip .md extension
        target = target.removesuffix('.md')
        if target:
            links.append(target)
    return list(dict.fromkeys(links))  # deduplicate preserving order


def collect_notes(vault_path: Path, folder_filter: str | None = None) -> list[dict]:
    """Collect all markdown notes from the vault."""
    notes = []
    search_root = vault_path / folder_filter if folder_filter else vault_path

    for md_file in search_root.rglob('*.md'):
        # Skip hidden dirs
        if any(p.name.startswith('.') for p in md_file.parents):
            continue

        rel_path = md_file.relative_to(vault_path)
        # Skip site tooling, the Quartz content/ mirror of the vault, and raw source dumps
        if rel_path.parts[0] in EXCLUDED_TOP_DIRS or 'raw' in rel_path.parts[:-1]:
            continue
        text = md_file.read_text(encoding='utf-8', errors='ignore')
        fm = parse_frontmatter(text)
        links = parse_wikilinks(text)

        # Normalise list frontmatter fields
        def to_list(v):
            if v is None:
                return []
            if isinstance(v, list):
                # Extract note name from wikilink strings like "[[Note Name]]"
                result = []
                for item in v:
                    s = str(item).strip()
                    wl = re.match(r'\[\[([^\]|#]+)', s)
                    result.append(wl.group(1).strip() if wl else s)
                return result
            s = str(v).strip()
            wl = re.match(r'\[\[([^\]|#]+)', s)
            return [wl.group(1).strip() if wl else s]

        tags = fm.get('tags', [])
        if isinstance(tags, str):
            tags = [tags]

        notes.append({
            'id': str(rel_path),
            'title': fm.get('title', md_file.stem),
            'folder': str(rel_path.parent),
            'tags': [str(t) for t in (tags or [])],
            'doc_type': fm.get('doc_type', ''),
            'depends_on': to_list(fm.get('depends_on')),
            'used_by': to_list(fm.get('used_by')),
            'out_links': links,
            'is_index': 'type/index' in [str(t) for t in (tags or [])],
        })

    return notes


def resolve_link(name: str, note_by_stem: dict) -> str | None:
    """Resolve a wikilink name to a note ID."""
    # Exact stem match
    if name in note_by_stem:
        candidates = note_by_stem[name]
        return candidates[0] if candidates else None
    # Case-insensitive match
    lower = name.lower()
    for stem, ids in note_by_stem.items():
        if stem.lower() == lower:
            return ids[0] if ids else None
    return None


def build_graph(vault_path: Path, folder_filter: str | None = None) -> dict:
    notes = collect_notes(vault_path, folder_filter)

    # Build stem -> [note_id] index for link resolution
    note_by_stem: dict[str, list[str]] = {}
    for n in notes:
        stem = Path(n['id']).stem
        note_by_stem.setdefault(stem, []).append(n['id'])
        # Also index by title
        title = n['title']
        if title != stem:
            note_by_stem.setdefault(title, []).append(n['id'])

    edges = []
    seen_edges = set()

    def add_edge(src, tgt, etype):
        key = (src, tgt, etype)
        if key not in seen_edges:
            seen_edges.add(key)
            edges.append({'source': src, 'target': tgt, 'type': etype})

    for n in notes:
        src = n['id']

        # Wikilink edges
        for link in n['out_links']:
            tgt = resolve_link(link, note_by_stem)
            if tgt and tgt != src:
                add_edge(src, tgt, 'wikilink')

        # depends_on edges
        for dep in n['depends_on']:
            tgt = resolve_link(dep, note_by_stem)
            if tgt and tgt != src:
                add_edge(src, tgt, 'depends_on')

        # used_by edges
        for ub in n['used_by']:
            tgt = resolve_link(ub, note_by_stem)
            if tgt and tgt != src:
                add_edge(tgt, src, 'used_by')

    folders = sorted({n['folder'] for n in notes})

    return {
        'nodes': notes,
        'edges': edges,
        'stats': {
            'total_notes': len(notes),
            'total_edges': len(edges),
            'folders': folders,
        }
    }


def main():
    parser = argparse.ArgumentParser(description='Build a knowledge graph from an Obsidian vault.')
    parser.add_argument('vault_path', help='Path to the vault root')
    parser.add_argument('--output', '-o', default='-', help='Output JSON file path (default: stdout)')
    parser.add_argument('--folder', '-f', default=None, help='Restrict to a subfolder (relative to vault root)')
    args = parser.parse_args()

    vault = Path(args.vault_path).expanduser().resolve()
    if not vault.is_dir():
        print(f'Error: vault path not found: {vault}', file=sys.stderr)
        sys.exit(1)

    graph = build_graph(vault, args.folder)

    output = json.dumps(graph, indent=2, ensure_ascii=False)
    if args.output == '-':
        print(output)
    else:
        Path(args.output).write_text(output, encoding='utf-8')
        print(f'Graph written to {args.output}', file=sys.stderr)
        print(f'  {graph["stats"]["total_notes"]} notes, {graph["stats"]["total_edges"]} edges', file=sys.stderr)


if __name__ == '__main__':
    main()
