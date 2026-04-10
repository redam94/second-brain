---
name: vault-repair
description: "Scan an Obsidian vault and repair/enrich existing notes: add missing frontmatter fields (depends_on, used_by, source_location, doc_type), deepen shallow notes with more detail from their raw sources, fix broken wikilinks, standardize tags, update indexes to routing format, and create new notes for orphaned raw files that lack corresponding processed notes. Use this skill whenever the user wants to fix, repair, clean up, enrich, update, or improve their vault's existing notes, or when they mention broken links, missing metadata, shallow notes, orphaned files, or inconsistent tags. Also use when the user wants to bring old notes up to the current vault-ingest standard."
---

# Vault Repair Skill

Scans the vault and fixes structural issues in existing notes — enriching frontmatter, deepening shallow content, fixing cross-references, standardizing tags, and creating notes for orphaned raw files.

This skill complements vault-ingest: where vault-ingest creates new notes from external sources, vault-repair improves notes that already exist.

## Skill Dependencies

| Skill | When to use |
|-------|-------------|
| **vault-ingest** | Read its SKILL.md to understand the target schema — all repairs should bring notes into compliance with vault-ingest's standards (frontmatter, callouts, note structure, index format) |
| **obsidian-markdown** | All note formatting — wikilinks, embeds, callouts, LaTeX, frontmatter conventions |
| **obsidian-cli** | Primary tool for reading/updating notes and searching when Obsidian is running |
| **obsidian-bases** | Creating or updating .base files after repairs |

## Overview of the Repair Process

The skill runs as one continuous pipeline:

1. **Audit** — scan the vault and build a repair manifest
2. **Repair frontmatter** — add missing fields, standardize tags
3. **Deepen shallow notes** — re-read raw sources and expand notes that lack detail
4. **Process orphaned raws** — create new notes for raw files with no corresponding processed notes
5. **Fix cross-references** — repair broken wikilinks, populate depends_on/used_by
6. **Update indexes** — bring all _Index.md files to routing table format
7. **Create/update .base files** — add dynamic views if missing
8. **Report** — summarize everything that was changed

---

## Step 1: Audit the Vault

Scan the entire vault to build a repair manifest. This is the diagnostic pass — no files are modified yet.

### 1a. Inventory raw files and their notes

For each folder that contains a `raw/` subdirectory:

1. List all files in `raw/`
2. For each raw file, search for notes that reference it (grep for `[[raw/filename]]` or `source:.*filename`)
3. Classify each raw file as:
   - **Fully processed**: Has 3+ corresponding notes with detailed content
   - **Shallow**: Has 1-2 notes but they're thin (under 40 lines of content excluding frontmatter)
   - **Orphaned**: No corresponding notes at all

### 1b. Audit frontmatter

For every `.md` note (excluding raw/ files and .obsidian/):

1. Check which fields are present in YAML frontmatter
2. Flag notes missing any of these required fields:
   - `title`, `tags`, `source`, `date_ingested`, `folder` (basic — likely present)
   - `depends_on`, `used_by`, `source_location`, `doc_type` (enhanced — likely missing in older notes)
3. Check tag consistency:
   - Is `source/ingested` present on all ingested notes?
   - Are `type/` tags using the standard taxonomy? (`type/concept`, `type/theorem`, `type/definition`, `type/example`, `type/overview`, `type/index`)
   - Are there variant tags that should be unified? (e.g., `type/book-overview` → `type/overview`)

### 1c. Audit wikilinks

For each wikilink `[[Target]]` found in notes:

1. Check if Target.md exists somewhere in the vault (Obsidian resolves by name, not path)
2. Flag broken links where no matching file exists
3. Flag "dangling" links where the target exists but doesn't link back (not necessarily broken, but useful to know)

### 1d. Audit indexes

For each `_Index.md` file:

1. Check if it has a routing summary (`> [!abstract] Routing Summary` with conditional navigation)
2. Check if it has a concept map table
3. Check if note entries have CONTAINS/COVERS annotations
4. Flag indexes that are just simple lists without routing metadata

### 1e. Present the audit report

Before making any changes, present a summary to the user:

```
Vault Repair Audit
==================

Frontmatter:
  - N notes missing depends_on/used_by
  - N notes missing doc_type
  - N notes missing source_location
  - N tag inconsistencies found

Content depth:
  - N raw files fully processed
  - N raw files with shallow notes (need enrichment)
  - N orphaned raw files (need new notes)

Cross-references:
  - N broken wikilinks
  - N dangling backlinks

Indexes:
  - N indexes need routing summary upgrade
  - N indexes missing concept maps

Estimated work: ~N notes to modify, ~N notes to create

Proceeding with all repairs...
```

Then proceed immediately with repairs (the user chose "scan all, fix all").

---

## Step 2: Repair Frontmatter

For every note that's missing enhanced frontmatter fields, add them.

### Adding `doc_type`

Classify each note based on its content and tags:

| Content signals | doc_type value |
|----------------|---------------|
| Has `type/overview` tag, or filename contains "Overview" | `overview` |
| Has `type/theorem` tag, or contains `> [!theorem]` callouts | `theorem` |
| Has `type/definition` tag, or contains `> [!definition]` callouts | `definition` |
| Has `type/example` tag, or contains `> [!example]` callouts, or filename contains "Example" or "Case Study" | `example` |
| Has `type/index` tag | `index` |
| Has code blocks and step-by-step structure | `tutorial` |
| Default for conceptual/explanatory notes | `concept` |

### Adding `source_location`

If the note's `source` field references a raw PDF and the note content mentions specific chapters, sections, or page numbers, extract those into `source_location`. For example:

- Note mentions "Chapter 5" and "Section 5.2" → `source_location: "Ch. 5, Sec. 5.2"`
- Note mentions "pages 117-137" → `source_location: "pp. 117-137"`
- If no location can be inferred, leave `source_location` empty rather than guessing

### Adding `depends_on` and `used_by`

This is the most important repair. For each note:

1. **Scan outgoing wikilinks** — every `[[Other Note]]` in the body is a candidate for `depends_on` if "Other Note" is a prerequisite concept
2. **Scan content for prerequisite language** — phrases like "building on", "requires", "assumes familiarity with", "as shown in" indicate dependencies
3. **Determine directionality**:
   - If Note A says "using the result from [[Note B]]" → A depends_on B, B used_by A
   - If Note A says "this extends to [[Note C]]" → C depends_on A, A used_by C
4. **Update both sides** — when adding `depends_on: [[B]]` to A, also add `used_by: [[A]]` to B

Be conservative — only add dependencies where there's a clear conceptual prerequisite relationship, not every mention. A "See Also" link is not a dependency.

### Standardizing tags

Apply these unification rules:

| Old tag | Standard tag |
|---------|-------------|
| `type/book-overview` | `type/overview` |
| `method/pymc` | `method/pymc` (keep — method/ is fine for computational tools) |
| Any `type/` tag not in the standard set | Map to nearest standard: `type/concept`, `type/theorem`, `type/definition`, `type/example`, `type/overview`, `type/index`, `type/proof` |

Add missing `type/` tags based on content analysis (same logic as doc_type classification above).

Add `doc/textbook`, `doc/paper`, `doc/tutorial`, or `doc/article` tags based on the source file type.

---

## Step 3: Deepen Shallow Notes

For each raw file classified as "shallow" in the audit (has notes, but they're thin):

### 3a. Identify what's missing

1. Read the raw source file (for PDFs, use the Read tool with `pages` parameter)
2. Read the existing note(s) derived from it
3. Compare: what content from the source is absent from the notes?
4. Look specifically for:
   - **Theorems/definitions mentioned but not formally stated** — the note says "by Theorem X" but doesn't include the statement
   - **Examples skipped** — the source has worked examples the note doesn't cover
   - **Derivations abbreviated** — the note says "it can be shown that" instead of showing the key steps
   - **Figures/tables not referenced** — important visual content from the source

### 3b. Enrich the notes

For each gap found:

1. If a theorem/definition is missing, add it using the standard callout format from vault-ingest:
   ```markdown
   > [!theorem] Theorem: Name (Source, Ch. X, Thm Y.Z)
   > Full formal statement with all conditions.
   ^thm-name
   ```

2. If an example is missing, add it:
   ```markdown
   > [!example] Example: Description (Source, Ch. X, Ex. Y)
   > Setup, solution, and interpretation.
   ^ex-name
   ```

3. If the note is missing the standard structure (Overview, Main Content, Examples, Connections, See Also), restructure it while preserving all existing content.

4. Add block IDs (`^thm-name`, `^def-name`) to formal content for precise cross-referencing.

### 3c. Create additional notes if needed

If the raw source covers topics not represented by any existing note, create new atomic notes following the vault-ingest schema. Place them in the appropriate sub-folder based on the existing hierarchy.

---

## Step 4: Process Orphaned Raw Files

For each raw file classified as "orphaned" (no corresponding notes):

Follow the vault-ingest skill's processing pipeline for the appropriate document type:

1. **Classify** the document type (textbook, paper, tutorial, article, reference)
2. **Read the raw file** using multi-pass strategy for PDFs, or full read for markdown/text
3. **Create atomic notes** with full frontmatter, formal callouts for theorems/definitions, worked examples, and proper wikilinks to existing vault notes
4. **Place notes** in the appropriate sub-folder — either within the existing hierarchy or create a new sub-folder if the topic doesn't fit anywhere

For orphaned markdown files (like PyMC tutorials), these are typically tutorials:
- Preserve code blocks completely
- Extract the underlying statistical/ML concepts into separate concept notes
- Link the tutorial steps to the concept notes
- Create a tutorial overview note

---

## Step 5: Fix Cross-References

### 5a. Repair broken wikilinks

For each broken `[[Target]]` link:

1. Search for files with similar names (fuzzy match — the target may have been renamed)
2. If a close match exists, update the link
3. If no match exists, either:
   - Create a stub note if the concept is important enough (has 3+ references from other notes)
   - Remove the broken link and replace with plain text if it's an isolated reference

### 5b. Add missing backlinks

For each note A that references `[[B]]` in its body:

1. Check if B has a "See Also" or "Connections" section
2. If B doesn't mention A anywhere and the relationship is meaningful, add A to B's "See Also" section

### 5c. Verify depends_on/used_by consistency

After Step 2 populated these fields:

1. For every `depends_on: [[X]]` in note A, verify X has `used_by: [[A]]`
2. For every `used_by: [[Y]]` in note A, verify Y has `depends_on: [[A]]`
3. Fix any asymmetries

---

## Step 6: Update Indexes

For each `_Index.md` that was flagged in the audit as needing upgrades:

### Convert to routing table format

Replace simple note lists with the vault-ingest index format:

```markdown
> [!abstract] Routing Summary
> This folder covers [DOMAIN]. Contains N notes spanning [CONCEPTS].
> - Need [concept X]? → [[Note A]]
> - Need [concept Y]? → [[Note B]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| ... | ... | ... | ... | ... |

## Notes
- [[Note 1]] — CONTAINS: [specific theorems, definitions, examples]
```

Build the concept map table from the `depends_on` frontmatter populated in Step 2.

Build the routing summary by reading each note's `> [!summary]` callout to understand what it covers.

### Update the vault root index

Update `_Vault_Index.md` with any new folders or notes created during repair.

---

## Step 7: Create/Update .base Files

For each folder that received repairs, check if these .base files exist:

1. **`Ingested Notes.base`** — table of all notes with metadata columns
2. **`Concept Dependencies.base`** — dependency graph view
3. **`Theorems and Definitions.base`** — filtered view of formal results

If missing, create them using the **obsidian-bases** skill with the same schema as vault-ingest.

If they exist, verify their filters still match the current folder structure.

---

## Step 8: Report

After all repairs, report:

```
Vault Repair Complete
=====================

Frontmatter repairs:
  - N notes: added depends_on/used_by
  - N notes: added doc_type
  - N notes: added source_location
  - N tag standardizations applied

Content enrichment:
  - N shallow notes deepened (added M theorems, K examples)
  - N new notes created from orphaned raw files

Cross-references:
  - N broken wikilinks fixed
  - N backlinks added
  - N depends_on/used_by pairs synchronized

Indexes:
  - N indexes upgraded to routing format
  - N .base files created/updated

Files modified: [list]
Files created: [list]
```

---

## General Rules

- **Read before modifying** — always read a file's current content before editing to avoid overwriting
- **Preserve existing content** — repairs should add or restructure, never delete existing content unless it's clearly wrong (e.g., a broken link being replaced)
- **Use obsidian-cli when available** — prefer `obsidian create`, `obsidian read`, `obsidian search`, `obsidian property:set` over raw file operations
- **Follow obsidian-markdown conventions** — all formatting should match the obsidian-markdown skill
- **Batch progress updates** — for large vaults, report progress every 10-15 notes rather than flooding the user with per-file updates
- **Respect existing hierarchy** — don't reorganize folders; repair notes in place within their current structure
- **Match vault-ingest standards** — the target state for every repaired note is what vault-ingest would have produced. Read the vault-ingest SKILL.md for the authoritative schema if uncertain about any format.
