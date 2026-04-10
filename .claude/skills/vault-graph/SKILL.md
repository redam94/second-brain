---
name: vault-graph
description: "Perform graph analysis and structure optimization on the Obsidian vault knowledge graph. Use when the user asks about note connectivity, orphaned notes, most important/central notes, community clusters, missing links between related notes, or wants suggestions for reorganizing the vault. Also use for 'what are the most connected notes?', 'which notes are isolated?', 'how should I restructure this folder?', or any vault analytics question."
user-invocable: true
argument-hint: "[analyze|optimize|centrality|orphans|communities|density] [--folder <subfolder>]"
---

# Vault Graph Skill

Analyze the vault's knowledge graph using three Python scripts located in this skill directory. Produces insights about connectivity, missing links, community structure, and actionable folder reorganization suggestions.

## Scripts

All scripts are in the same directory as this SKILL.md:

| Script | Purpose | Key output |
|--------|---------|-----------|
| `build_graph.py` | Parse vault → NetworkX JSON graph | nodes, edges, stats |
| `analyze_graph.py` | Run analytics on graph JSON | centrality, orphans, bridges, communities, tags, density |
| `optimize_structure.py` | Suggest structural improvements | move candidates, missing links, new folders, split candidates |

**Dependencies**: `networkx`, `pyyaml`, `numpy` (install with `pip3 install networkx pyyaml numpy`)

## Workflow

### Step 1: Determine scope and mode

Parse the user's request to identify:
- **Scope**: entire vault, a specific folder (e.g. `Research/Bayesian Statistics`), or a sub-topic
- **Mode**: analytics (what's the current state?) vs. optimization (what should change?)
- **Focus**: centrality, orphans, communities, density, missing links, or all

### Step 2: Build the graph

```bash
SKILL_DIR="$(dirname "$0")"  # or use absolute path to skill directory
VAULT="/Users/redam94/Documents/second-brain"

# Full vault
python3 "$SKILL_DIR/build_graph.py" "$VAULT" -o /tmp/vault_graph.json

# Restricted to a subfolder (faster, more focused)
python3 "$SKILL_DIR/build_graph.py" "$VAULT" --folder "Research/Bayesian Statistics" -o /tmp/graph.json
```

The `--folder` argument restricts which notes are parsed. The graph JSON still resolves cross-folder links when building edges — use `--folder` on `analyze_graph.py` or `optimize_structure.py` to restrict analysis after building the full graph.

**Graph JSON schema**:
```json
{
  "nodes": [{"id": "relative/path.md", "title": "...", "folder": "...", "tags": [...],
              "doc_type": "...", "depends_on": [...], "used_by": [...],
              "out_links": [...], "is_index": false}],
  "edges": [{"source": "path.md", "target": "path.md", "type": "wikilink|depends_on|used_by"}],
  "stats": {"total_notes": N, "total_edges": M, "folders": [...]}
}
```

### Step 3: Run analysis

```bash
SKILL_DIR="/Users/redam94/Documents/second-brain/.claude/skills/vault-graph"

# All analytics
python3 "$SKILL_DIR/analyze_graph.py" /tmp/vault_graph.json --mode all --top 15

# Specific modes
python3 "$SKILL_DIR/analyze_graph.py" /tmp/vault_graph.json --mode centrality orphans

# Filter to subfolder after building full graph
python3 "$SKILL_DIR/analyze_graph.py" /tmp/vault_graph.json --folder "Research/Bayesian Statistics" --mode communities density
```

**Available modes**:
- `centrality` — PageRank + in/out degree. Most/least connected notes.
- `orphans` — Notes with no incoming or no outgoing links. True orphans = both.
- `bridges` — Betweenness centrality. Notes that connect otherwise separate clusters.
- `communities` — Greedy modularity community detection. Shows which notes naturally cluster together.
- `tags` — Tag co-occurrence and per-tag internal connectivity.
- `density` — Per-folder edge density and cross-folder link matrix.
- `all` — Run all of the above.

### Step 4: Run optimization (structure suggestions)

```bash
python3 "$SKILL_DIR/optimize_structure.py" /tmp/vault_graph.json --folder "Research"
```

**Output categories**:

| Category | What it finds | Action |
|----------|--------------|--------|
| `move_candidates` | Notes more connected to another folder than their own | Propose moving the note |
| `missing_links` | Note pairs that share many common neighbors but aren't linked | Add wikilinks between them |
| `new_folder_suggestions` | Community clusters scattered across multiple folders | Propose creating a new folder |
| `split_candidates` | High-betweenness notes linking to many different topic areas | Propose splitting the note |

Each suggestion includes a `priority` score, `reason`, and `note_ids` for direct action.

### Step 5: Interpret and present results

After running the scripts, interpret the JSON output and present findings to the user:

**For analytics results**:
- Highlight the top 5 most central notes — these are the knowledge hubs
- Flag true orphans as needing attention (add links or consider deletion)
- Describe the community structure in plain language
- Identify cross-folder link patterns that reveal hidden connections

**For optimization results**:
- Present move candidates grouped by suggested destination folder
- For missing links: show the pair + shared neighbors so the user can verify relevance
- For new folder suggestions: name the suggested folder based on the community's top tags
- For split candidates: explain what topics the note currently bridges

**Result format**: Present a concise summary (bullet points), then offer to take specific actions (add wikilinks, propose moves, create index notes for new communities).

## Example Commands

```bash
SKILL_DIR="/Users/redam94/Documents/second-brain/.claude/skills/vault-graph"
VAULT="/Users/redam94/Documents/second-brain"

# Quick full-vault analytics
python3 "$SKILL_DIR/build_graph.py" "$VAULT" | \
  python3 "$SKILL_DIR/analyze_graph.py" - --mode centrality orphans --top 10

# Full optimization pass on Research folder
python3 "$SKILL_DIR/build_graph.py" "$VAULT" -o /tmp/g.json && \
  python3 "$SKILL_DIR/optimize_structure.py" /tmp/g.json --folder Research

# Community analysis on Bayesian Statistics
python3 "$SKILL_DIR/build_graph.py" "$VAULT" -o /tmp/g.json && \
  python3 "$SKILL_DIR/analyze_graph.py" /tmp/g.json \
    --folder "Research/Bayesian Statistics" --mode communities density
```

## Acting on Results

After presenting analysis, ask the user which suggestions to act on. Then:

- **Add missing wikilinks**: Use Edit tool to insert `[[Note Name]]` in relevant sections
- **Move a note**: Use Bash `mv` to move the file, then update `_Index.md` files
- **Create a new folder**: `mkdir` + move relevant notes + create `_Index.md`
- **Update indexes**: Re-read and edit relevant `_Index.md` files to reflect changes

Always re-run `build_graph.py` after making structural changes to verify improvements.
