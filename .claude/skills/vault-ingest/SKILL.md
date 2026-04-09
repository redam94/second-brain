---
name: vault-ingest
description: "Two modes: (1) INGEST mode — upload files or directories into an Obsidian vault, organizing them into folders with raw file storage, processed interconnected markdown notes, and hierarchical index files. (2) QUERY mode — search and answer questions from the vault's knowledge base, compiling answers with summaries, crosslinks, and references to raw source documents. Use when the user wants to import/upload/ingest files into their vault OR when they want to query/search/ask questions about their vault's ingested knowledge."
---

# Vault Ingest Skill

Two operating modes:
- **Ingest mode**: Import external files, store raw copies, produce interconnected markdown notes, and build hierarchical indexes.
- **Query mode**: Search the vault knowledge base, compile answers with summaries, crosslinks, and raw source references.

## Determining the mode

Ask the user which mode they want using AskUserQuestion:

```
What would you like to do?

  1. Ingest — Import files/directories into the vault
  2. Query — Search and ask questions about vault knowledge

Enter 1 or 2:
```

If the user's original message already makes the intent clear (e.g., "upload these files" = ingest, "what do my notes say about X" = query), skip this prompt and proceed directly.

---

# Mode 1: Ingest

## Step 1: Identify source files

Ask the user for files or directories to ingest using AskUserQuestion:

```
What files or directories would you like to ingest into the vault?
Provide absolute paths, separated by commas. Examples:
  - /path/to/file.pdf
  - /path/to/folder/
  - /path/to/report.csv, /path/to/notes.txt
```

Validate that all paths exist before proceeding. If any path is invalid, report it and ask the user to correct it.

## Step 2: Choose destination folder

1. List the current top-level folders in the vault root (excluding `.obsidian/` and `.claude/`) using `ls` or Glob.
2. Present the user with options using AskUserQuestion:

```
Where should these files go?

Existing folders:
  1. Clippings
  2. Projects
  3. Research
  ... (list actual folders)

Options:
  - Enter a number to choose an existing folder
  - Type a new folder name to create one
```

3. If the user picks an existing folder, use it. If they type a new name, create it.

## Step 3: Copy raw files

1. Create a `raw/` subdirectory under the chosen folder if it doesn't exist:
   ```
   <vault>/<chosen-folder>/raw/
   ```
2. Copy all source files into `raw/`, preserving original filenames. For directories, copy the entire subtree.
3. Confirm the copy succeeded and list what was copied.

## Step 4: Plan folder hierarchy

Before creating any notes, analyze ALL ingested files to determine a topic-based folder hierarchy.

### 4a. Content analysis pass

1. Read/scan every ingested file to extract its major themes, topics, and sub-topics.
2. Collect all discovered topics into a flat list with their relationships (parent → child).
3. Group related topics into a hierarchy no more than 3 levels deep (beyond `raw/`):

```
<destination-folder>/
├── raw/                          # untouched source files (from Step 3)
├── <Topic A>/
│   ├── <Sub-topic A1>/
│   │   ├── Note1.md
│   │   └── Note2.md
│   ├── <Sub-topic A2>/
│   │   └── Note3.md
│   └── _Index.md
├── <Topic B>/
│   ├── <Sub-topic B1>/
│   │   └── Note4.md
│   └── _Index.md
└── _Index.md
```

### 4b. Hierarchy rules

- **Top-level sub-folders** = broad themes or domains (e.g., `Methods`, `Results`, `Background`).
- **Second-level sub-folders** = specific sub-topics within a theme (e.g., `Methods/Data Collection`, `Methods/Statistical Analysis`).
- **Third-level sub-folders** = optional, only when a sub-topic is large enough to warrant further splitting (5+ notes).
- Folder names should be short, descriptive, and use Title Case with spaces (Obsidian handles this well).
- If a note doesn't fit cleanly into a sub-folder, place it directly in the nearest parent folder.
- If the entire ingest is small (≤5 notes), a flat structure under the destination folder is fine — don't force nesting.

### 4c. Present the plan

Before creating notes, present the proposed folder hierarchy to the user using AskUserQuestion:

```
Proposed folder structure for ingested content:

<destination-folder>/
├── raw/
├── Topic A/
│   ├── Sub-topic A1/
│   └── Sub-topic A2/
├── Topic B/
│   └── Sub-topic B1/
└── _Index.md

This will create approximately N notes across M folders.
Proceed? (yes / suggest changes)
```

If the user suggests changes, adjust the hierarchy and re-confirm.

## Step 5: Process and create linked notes

For each ingested file, analyze its content and produce small, focused markdown notes, placing them into the folder hierarchy from Step 4.

### File type handling

| File type | Processing approach |
|-----------|-------------------|
| `.md` | Read content, split into atomic notes by topic/section |
| `.pdf` | Read with the Read tool (supports PDF), extract key concepts into notes |
| `.txt` | Read content, split into atomic notes |
| `.csv`/`.tsv` | Read data, create summary note + per-category/topic notes |
| `.json` | Parse structure, create notes for key entities/concepts |
| `.py`/`.js`/`.ts`/code files | Create notes documenting functions, classes, patterns |
| Images (`.png`/`.jpg`/`.svg`) | Create a note that embeds the image with `![[raw/filename.png]]` and add descriptive metadata |
| Other | Create a note linking to the raw file with metadata |

### Note placement

Each note is placed in the sub-folder that best matches its topic from the hierarchy plan:
- A note about "linear regression assumptions" → `Methods/Statistical Analysis/`
- A note about "sample demographics" → `Results/Demographics/`
- A cross-cutting overview note → parent folder (e.g., `Methods/`)

### Note creation rules

1. **Atomic notes**: Each note should cover ONE concept, entity, or idea. Prefer many small notes over few large ones.
2. **Properties**: Every note MUST have YAML frontmatter:
   ```yaml
   ---
   title: Note Title
   tags:
     - source/ingested
     - topic/relevant-topic
   source: "[[raw/original-filename.ext]]"
   date_ingested: YYYY-MM-DD
   folder: "<Topic>/<Sub-topic>"
   ---
   ```
3. **Wikilinks**: Link notes to each other using `[[Note Name]]` wherever concepts relate. Link back to the raw source file. Obsidian resolves wikilinks by name across folders, so `[[Note Name]]` works regardless of nesting depth.
4. **Embeds**: Use `![[raw/image.png]]` or `![[raw/file.pdf#page=N]]` to embed visual content.
5. **Callouts**: Use callouts for key takeaways, warnings, or summaries:
   ```markdown
   > [!summary]
   > Key point extracted from the source material.
   ```

### Linking strategy

- Link to other notes in the SAME ingest batch using `[[Note Name]]`
- Link to EXISTING vault notes if concepts overlap — use Grep/Glob to find related notes first
- Use consistent tag hierarchies: `source/ingested`, `topic/<domain>`, `type/<note-type>`
- Add aliases in frontmatter for alternate names of concepts
- Each sub-folder's `_Index.md` should link up to its parent index and down to its child notes

## Step 6: Build hierarchical indexes

After creating notes, build or update an `_Index.md` at **every level** of the folder hierarchy, from leaf sub-folders up to the vault root.

### 6a. Leaf sub-folder indexes

For each bottom-level sub-folder that contains notes, create an `_Index.md`:

```markdown
---
title: "Index: <Sub-topic Name>"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|<Parent Topic>]]"
date_updated: YYYY-MM-DD
---

# <Sub-topic Name>

> [!abstract] Summary
> 2-3 sentence overview of what this sub-folder covers.

## Notes
- [[Note 1]] — One-line summary
- [[Note 2]] — One-line summary

## Sources
- [[raw/file1.pdf]] — Which source(s) these notes derive from

## See Also
- [[Other Note]] — Crosslink to related notes in sibling or parent folders
```

### 6b. Mid-level topic indexes

For each topic folder that contains sub-folders, create an `_Index.md` that links **down** to child indexes and **up** to the parent:

```markdown
---
title: "Index: <Topic Name>"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|<Destination Folder>]]"
date_updated: YYYY-MM-DD
---

# <Topic Name>

> [!abstract] Summary
> 2-3 sentence overview of this topic area and its sub-topics.

## Sub-topics
- [[Sub-topic A1/_Index|Sub-topic A1]] — Summary of sub-topic contents
- [[Sub-topic A2/_Index|Sub-topic A2]] — Summary of sub-topic contents

## Notes
(Any notes placed directly in this folder, not in a sub-topic)
- [[Overview Note]] — One-line summary

## Sources
- [[raw/file1.pdf]] — Brief description of raw sources relevant to this topic
```

### 6c. Destination folder index

Create (or update) the `_Index.md` at the destination folder root, linking to all top-level topic sub-folders:

```markdown
---
title: "Index: <Folder Name>"
tags:
  - type/index
  - source/ingested
date_updated: YYYY-MM-DD
---

# <Folder Name>

> [!abstract] Summary
> 2-3 sentence overview of what this folder contains and its key themes.

## Topics
- [[Topic A/_Index|Topic A]] — Summary of topic and its sub-topics
- [[Topic B/_Index|Topic B]] — Summary of topic and its sub-topics

## Sources
- [[raw/file1.pdf]] — Brief description of the raw source
- [[raw/file2.csv]] — Brief description of the raw source

## See Also
- [[Other Vault Note]] — Crosslink to related knowledge elsewhere in vault
```

### 6d. Vault root index (`_Vault_Index.md`)

Create or update `_Vault_Index.md` at the vault root. This is the top-level map of all knowledge in the vault:

```markdown
---
title: "Vault Index"
tags:
  - type/index
  - type/vault-root
date_updated: YYYY-MM-DD
---

# Vault Index

> [!abstract] Knowledge Base Overview
> High-level summary of what this vault contains and its major domains.

## Areas
- [[Clippings/_Index|Clippings]] — Web articles and saved content
- [[Research/_Index|Research]] — Research papers and analysis
- [[Projects/_Index|Projects]] — Project documentation and notes

## Recent Ingestions
- YYYY-MM-DD: Ingested N files into [[Folder/_Index|Folder]] — brief description

## Topic Map
Cross-cutting topics that span multiple folders:
- **Topic A**: [[Folder1/Note]], [[Folder2/Note]] — summary
- **Topic B**: [[Folder3/Note]] — summary
```

### Index update rules

- When updating an existing index, MERGE new entries — never delete existing entries unless the referenced note no longer exists.
- Keep summaries short (one line per entry) — the detail lives in the linked note.
- Update `date_updated` in frontmatter on every modification.
- The Topic Map in the vault root index should surface cross-folder connections discovered during ingestion.

## Step 7: Summary

After processing, report to the user:
- Number of raw files copied
- Number of notes created
- Number of folders/sub-folders created
- Folder hierarchy tree (visual representation)
- Indexes created or updated
- List of all created notes organized by folder, with brief descriptions
- Suggest next steps (e.g., "review the index note", "check the graph view for connections", "browse the folder tree")

---

# Mode 2: Query

Search the vault's knowledge base, compile an answer with summaries and source references.

## Step 1: Understand the question

Parse the user's question. Identify:
- **Key concepts/terms** to search for
- **Scope**: are they asking about a specific folder/project, or the whole vault?
- **Depth**: do they want a quick answer or a deep dive?

## Step 2: Search the vault

Use a layered search strategy, starting broad and narrowing:

### 2a. Check indexes first

1. Read `_Vault_Index.md` at the vault root to understand what's available and where.
2. If the question targets a specific area, read that folder's `_Index.md`.
3. Use the index topic maps and summaries to identify which notes are most relevant.

### 2b. Search for content

1. Use Grep to search note content for key terms from the question.
2. Use Glob to find notes with relevant names.
3. If Obsidian is running, use `obsidian search query="<terms>"` for full-text search.
4. Read the most relevant notes found.

### 2c. Follow crosslinks

From the notes found, follow wikilinks to related notes that may contain additional relevant information. Read those too. This "link-walking" often surfaces context that keyword search misses.

### 2d. Trace to raw sources

For each relevant note, check its `source` frontmatter property to identify the original raw document. Read relevant sections of the raw source to verify claims and gather additional detail.

## Step 3: Compile the answer

Structure the response as follows:

### Answer format

```markdown
## Answer

> [!summary]
> 1-3 sentence direct answer to the question.

### Details

Expanded explanation organized by sub-topic. Use clear headings.
Each claim or fact should have an inline source reference like:
"The system uses batch processing for efficiency ([[raw/architecture.pdf|Source: architecture.pdf, p.3]])."

### Sources

| Source | Location | Relevance |
|--------|----------|-----------|
| [[raw/file1.pdf]] | p. 3-5 | Main source for X |
| [[Note Name]] | — | Summary of Y concept |
| [[raw/data.csv]] | rows 10-50 | Data supporting Z |

### Related Notes
- [[Note A]] — brief description of how it relates
- [[Note B]] — brief description of how it relates

### Gaps
If the vault does not fully answer the question, note what's missing:
- "No information found about X — consider ingesting sources on this topic."
```

### Answer rules

1. **Always cite sources**: Every factual claim must reference either a vault note or a raw source document. Use wikilinks for vault notes and include page/section numbers for PDFs.
2. **Prefer raw sources for verification**: When a note summarizes a raw document, cite both the note AND the raw source.
3. **Be honest about gaps**: If the vault doesn't contain enough information, say so clearly. Don't fabricate information.
4. **Crosslink to deepen**: Include a "Related Notes" section so the user can explore further.
5. **Short summaries, deep links**: The answer itself should be concise. Point the user to the detailed notes and raw sources for full context.

## Step 4: Offer follow-ups

After answering, suggest:
- Related questions the vault could answer
- Notes the user might want to explore
- Gaps that could be filled by ingesting additional sources

---

# General Rules (Both Modes)

- Always use the obsidian-markdown skill conventions for note formatting
- Use the obsidian-cli skill to create notes when Obsidian is running (`obsidian create`)
- If Obsidian CLI is not available, fall back to writing files directly with Write tool
- Never modify or delete the user's original source files — only copy into `raw/`
- For large directories with many files, process in batches and report progress
- Ask the user before proceeding if the ingest would create more than 20 notes
- When updating any index, always re-read it first to avoid overwriting existing entries
