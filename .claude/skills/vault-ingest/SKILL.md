---
name: vault-ingest
description: "Two modes: (1) INGEST mode — upload files or directories into an Obsidian vault, organizing them into folders with raw file storage, processed interconnected markdown notes, and hierarchical index files. (2) QUERY mode — search and answer questions from the vault's knowledge base, compiling answers with summaries, crosslinks, and references to raw source documents. Use when the user wants to import/upload/ingest files into their vault OR when they want to query/search/ask questions about their vault's ingested knowledge. Make sure to use this skill whenever the user mentions ingesting, uploading, importing files into their vault, or asks questions about their vault's knowledge base, even if they don't explicitly say 'ingest'. Integrates with obsidian-markdown, obsidian-cli, obsidian-bases, and defuddle skills."
---

# Vault Ingest Skill

Two operating modes:
- **Ingest mode**: Import external files, store raw copies, produce deeply interconnected markdown notes with full extraction of formal content (theorems, definitions, proofs, examples), and build hierarchical indexes optimized for LLM retrieval.
- **Query mode**: Search the vault knowledge base, traverse concept dependency graphs, compile answers with summaries, crosslinks, and raw source references.

## Skill Dependencies

This skill integrates with four other skills. Load them as needed:

| Skill | When to use |
|-------|-------------|
| **obsidian-markdown** | All note formatting — wikilinks, embeds, callouts, LaTeX, frontmatter conventions |
| **obsidian-cli** | Primary note creation/search when Obsidian is running |
| **obsidian-bases** | Creating .base files for dynamic views after ingestion |
| **defuddle** | Extracting clean markdown from web URLs before storing in raw/ |

## Determining the mode

If the user's message makes intent clear (e.g., "upload these files" = ingest, "what do my notes say about X" = query), proceed directly. Otherwise ask:

```
What would you like to do?
  1. Ingest — Import files/directories into the vault
  2. Query — Search and ask questions about vault knowledge
```

---

# Mode 1: Ingest

## Step 1: Identify and Classify Source Files

### 1a. Gather sources

Ask the user for files or directories to ingest. Validate that all paths exist.

For web URLs, use the **defuddle** skill to extract clean markdown:
```bash
defuddle parse <url> --md -o <vault>/raw/<sanitized-name>.md
```

### 1b. Classify document type

Each source file must be classified because different document types require different extraction depths:

| Type | Signals | Processing approach |
|------|---------|-------------------|
| `textbook` | PDF, 50+ pages, chapter structure, numbered theorems/definitions, mathematical notation | Multi-pass deep extraction. One note per major concept, not per chapter. Every theorem, definition, and worked example gets formal treatment. |
| `paper` | PDF, 5-40 pages, abstract/introduction/methods/results/discussion | Structured section extraction preserving the argument flow. Full formal statements of all results. |
| `tutorial` | Markdown or web page, code blocks, step-by-step instructions | Preserve code completeness and sequential structure. Link steps to underlying concept notes. |
| `reference` | API docs, man pages, specification tables | Structured lookup notes optimized for quick retrieval. |
| `article` | Blog post, essay, news piece | Summary note with key claims. Use defuddle for extraction. |

Store this classification — it drives the processing strategy in Step 5.

## Step 2: Choose destination folder

1. List current top-level vault folders (excluding `.obsidian/` and `.claude/`) using Glob.
2. Present options to the user — pick an existing folder or create a new one.

## Step 3: Copy raw files

1. Create `<vault>/<chosen-folder>/raw/` if it doesn't exist.
2. Copy all source files into `raw/`, preserving original filenames. For directories, copy the entire subtree.
3. For web URLs already extracted via defuddle in Step 1a, the markdown is already in raw/.
4. Confirm what was copied.

## Step 4: Plan Folder Hierarchy

### 4a. Content analysis pass

Read/scan every ingested file to extract major themes, topics, and sub-topics.

**For textbooks**: Follow the book's own structure (Parts → Chapters → Sections) rather than inventing a new taxonomy. Create an overview note that maps the book's structure to the folder hierarchy.

**For papers**: Group by the paper's logical sections. If ingesting multiple papers, group by shared themes.

### 4b. Hierarchy rules

```
<destination-folder>/
├── raw/                          # untouched source files
├── <Topic A>/
│   ├── <Sub-topic A1>/
│   │   ├── Note1.md
│   │   └── Note2.md
│   ├── <Sub-topic A2>/
│   │   └── Note3.md
│   └── _Index.md
├── <Topic B>/
│   └── _Index.md
└── _Index.md
```

- **Top-level sub-folders** = broad themes or domains
- **Second-level sub-folders** = specific sub-topics within a theme
- **Third-level** = only when a sub-topic has 5+ notes
- Folder names: short, descriptive, Title Case with spaces
- If the ingest is small (5 or fewer notes), use a flat structure — don't force nesting

### 4c. Concept dependency mapping

Before creating notes, build a dependency graph of key concepts discovered during analysis. For each concept, identify:
- **Prerequisites**: What must be understood first
- **Downstream uses**: What builds on this concept

For textbooks, chapter ordering usually implies this. For papers, trace the methods section dependencies. This graph populates the `depends_on` and `used_by` frontmatter properties in Step 5.

### 4d. Present the plan

Show the proposed folder hierarchy and estimated note count. Wait for user approval before proceeding.

## Step 5: Process and Create Linked Notes

This is the core extraction step. The depth and approach depend on the document type classified in Step 1b.

### 5A. Multi-Pass PDF Reading Strategy

PDFs contain dense, structured content that cannot be adequately captured in a single read. Use a three-pass approach:

**Pass 1 — Structural scan:**
Read the table of contents, chapter/section headings, and the first 2-3 pages of each major section. The goal is to identify the structure and decide how many notes each section will produce. Use the Read tool's `pages` parameter (e.g., `pages: "1-10"`) to read efficiently.

**Pass 2 — Section-level deep extraction:**
For each chapter or major section, read the full content in chunks of 10-20 pages using `pages: "45-65"`. For each chunk, extract:
- **Definitions**: Full formal statement with all notation defined
- **Theorems, lemmas, corollaries**: Complete statement including all conditions and assumptions
- **Proofs**: Key steps and logical structure (complete for short proofs, sketch for long ones)
- **Examples**: Full worked problems with setup, solution steps, and interpretation
- **Figures and tables**: Caption text, what they show, page reference for embedding
- **Key intuitions and narrative**: The "why" behind the formalism — motivation, interpretation, connections to other ideas

**Pass 3 — Cross-reference verification:**
After all notes exist, re-scan sections that reference other chapters to ensure:
- Every theorem referenced by a later section has its own note or formal statement
- All wikilinks resolve correctly
- The `depends_on` / `used_by` chains are complete

### 5B. Document-Type-Specific Processing

#### Textbooks (`doc_type: textbook`)

Create one note per major concept, theorem, or technique — not one note per chapter. A single chapter typically produces 3-8 notes.

Create a `<Book Title> - Overview.md` at the topic folder level mapping the book's structure to the folder hierarchy.

**Formal content extraction** — every theorem, definition, and example gets rigorous treatment using callouts:

```markdown
> [!definition] Definition: Exchangeability (BDA3, Ch. 5, Def. 5.1)
> A sequence of random variables $y_1, y_2, \ldots, y_n$ is **exchangeable** if
> the joint probability $p(y_1, \ldots, y_n)$ is invariant to permutation of the indices.
> Formally, for any permutation $\pi$:
> $$p(y_1, \ldots, y_n) = p(y_{\pi(1)}, \ldots, y_{\pi(n)})$$

> [!theorem] Theorem: de Finetti's Theorem (BDA3, Ch. 5, Thm. 5.2)
> If $y_1, y_2, \ldots$ is an infinitely exchangeable sequence, then the joint
> distribution can be written as a mixture:
> $$p(y_1, \ldots, y_n) = \int \prod_{i=1}^{n} p(y_i \mid \theta) \, p(\theta) \, d\theta$$
> for some parameter $\theta$ and prior $p(\theta)$.
>
> **Significance:** This justifies the Bayesian modeling approach — exchangeability
> implies the existence of a parameter and prior.
>
> **Proof sketch:** The key idea is that exchangeability implies the empirical
> distribution converges to a limiting distribution, which serves as $\theta$...

> [!example] Example: Beta-Binomial Conjugacy (BDA3, Ch. 2, Ex. 2.1)
> **Setup:** Observe $y$ successes in $n$ trials, with prior $\theta \sim \text{Beta}(\alpha, \beta)$.
>
> **Solution:**
> $$p(\theta \mid y) \propto \theta^y (1-\theta)^{n-y} \cdot \theta^{\alpha-1}(1-\theta)^{\beta-1} = \theta^{\alpha+y-1}(1-\theta)^{\beta+n-y-1}$$
>
> Therefore $\theta \mid y \sim \text{Beta}(\alpha + y, \beta + n - y)$.
>
> **Interpretation:** The posterior mean $\frac{\alpha+y}{\alpha+\beta+n}$ is a weighted average
> of the prior mean and the sample proportion, with weight determined by $n$ relative to $\alpha+\beta$.
```

Every theorem that is referenced elsewhere in the text must have a note containing its full statement. Do not simply mention "by Theorem 5.2" without including or linking to the formal statement.

#### Papers (`doc_type: paper`)

Preserve the paper's argument structure. Create notes organized as:
- **`<Paper> - Overview.md`**: Research question, contribution, key finding in 1-2 sentences
- **Motivation/Setup note**: Problem statement, why existing approaches fall short
- **Model/Methods note**: Full formal specification with all assumptions stated
- **Main Results note(s)**: Each major result gets formal statement. Preserve the paper's notation — define every symbol explicitly.
- **Empirical Application note** (if applicable): Data, estimation, interpretation of findings
- **Discussion note**: Limitations, extensions, connections to other work

#### Tutorials (`doc_type: tutorial`)

- Preserve the step-by-step structure completely
- Code blocks must be complete and runnable — never abbreviate
- Link each step to the underlying concept note (e.g., "This implements [[Markov Chain Monte Carlo]]")
- Create separate concept notes for the theory; the tutorial note should focus on the practical workflow

#### Articles (`doc_type: article`)

- Use **defuddle** to extract clean markdown from the URL
- Create a summary note in Clippings/ with key claims, source link, and date
- If the article covers a concept already in Research/, create wikilinks to existing notes rather than duplicating content

### 5C. Enhanced Frontmatter Schema

Every note MUST have this frontmatter. Use the **obsidian-markdown** skill conventions for formatting:

```yaml
---
title: Note Title
tags:
  - source/ingested
  - topic/<domain>          # e.g., topic/bayesian-statistics
  - type/<note-type>        # see tag taxonomy below
  - doc/<source-type>       # e.g., doc/textbook
source: "[[raw/original-filename.ext]]"
source_location: "Ch. 5, pp. 117-137"   # precise location in source
date_ingested: YYYY-MM-DD
folder: "<Topic>/<Sub-topic>"
doc_type: textbook | paper | tutorial | article | reference
depends_on:                              # prerequisite concepts
  - "[[Concept A]]"
  - "[[Concept B]]"
used_by:                                 # downstream concepts that build on this
  - "[[Concept C]]"
aliases:
  - alternate name for this concept
---
```

**Tag taxonomy:**
- `source/ingested` — all ingested notes (always present)
- `topic/<domain>` — subject area (e.g., `topic/bayesian-statistics`, `topic/econometrics`)
- `type/index` — index files
- `type/overview` — book or paper overview notes
- `type/concept` — conceptual explanations
- `type/theorem` — notes containing or centered on formal theorems
- `type/definition` — notes containing or centered on definitions
- `type/example` — worked examples
- `type/proof` — proof notes
- `method/<tool>` — computational tools (e.g., `method/pymc`, `method/stan`)
- `doc/textbook`, `doc/paper`, `doc/tutorial`, `doc/article` — source document type

### 5D. Standardized Note Body Structure

Every note follows this template so an LLM agent knows exactly where to find each type of content:

```markdown
# Title

> [!summary]
> 2-3 sentence summary of what this note covers and why it matters.
> Include the key result or takeaway so an LLM reading just this box
> can decide whether to read further.

## Overview

Brief narrative introduction. Why this concept matters. Where it fits
in the broader framework. What problem it solves.

## Main Content

The substance of the note. For concept notes, this contains:
- Formal definitions (using > [!definition] callouts)
- Theorems with full statements (using > [!theorem] callouts)
- Derivations and proof sketches (using > [!theorem] or inline)
- Mathematical notation with all symbols defined

For tutorials, this contains the step-by-step workflow.
For papers, this contains the methods/results.

## Examples

Worked examples with complete setup, solution, and interpretation.
Use > [!example] callouts. Include the full solution — do not abbreviate
or say "the reader can verify."

## Connections

How this concept relates to other ideas in the vault:
- What it generalizes or specializes
- Where it appears in practice
- Contrasts with alternative approaches

## See Also
- [[Related Note]] — brief description of the relationship
```

### 5E. Note Creation — Skill Dispatch

Use the right tool for each task:

| Task | Primary Tool | Fallback |
|------|-------------|----------|
| Create a note | `obsidian create` (obsidian-cli skill) | Write tool |
| Search vault for existing notes | `obsidian search` (obsidian-cli skill) | Grep + Glob |
| Read a vault note | `obsidian read` (obsidian-cli skill) | Read tool |
| Set/update properties | `obsidian property:set` (obsidian-cli skill) | Edit frontmatter directly |
| Extract web content | defuddle skill | WebFetch |
| Format markdown | Follow obsidian-markdown skill conventions | — |
| Create dynamic views | obsidian-bases skill | — |

Before creating notes, search the vault for existing notes on the same concepts. If a relevant note already exists, extend it or link to it rather than creating a duplicate.

### 5F. Linking Strategy

- Link to other notes in the same ingest batch using `[[Note Name]]`
- Link to existing vault notes when concepts overlap — search first with Grep/Glob or `obsidian search`
- Use consistent tag hierarchies from the taxonomy above
- Add aliases in frontmatter for alternate names of concepts
- Use block references `[[Note#^block-id]]` for linking to specific theorems or definitions
- Every `> [!theorem]` and `> [!definition]` callout should have a block ID for precise linking:
  ```markdown
  > [!theorem] Theorem: Name
  > Statement...
  ^thm-name
  ```

## Step 6: Build Hierarchical Index Files (LLM Routing Tables)

Indexes serve two audiences: humans browsing and LLM agents searching. The critical difference from a simple note list is that an LLM reading an index should know exactly which note to open next — without having to read every note in the folder.

### 6a. Leaf sub-folder indexes

For each bottom-level sub-folder containing notes:

```markdown
---
title: "Index: <Sub-topic Name>"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|<Parent Topic>]]"
date_updated: YYYY-MM-DD
concept_count: N
---

# <Sub-topic Name>

> [!abstract] Routing Summary
> This folder covers [DOMAIN DESCRIPTION]. Contains N notes spanning [CONCEPT LIST].
> - Need [concept X]? → [[Note A]]
> - Need [concept Y]? → [[Note B]]
> - Need [worked example of Z]? → [[Note C]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Beta-Binomial conjugacy | [[Single-Parameter Models]] | theorem | [[Bayes Theorem]] | Posterior is Beta(a+y, b+n-y) |
| Jeffreys prior | [[Single-Parameter Models]] | definition | — | $p(\theta) \propto \sqrt{I(\theta)}$ |
| Normal approximation | [[Large-Sample Inference]] | theorem | [[Single-Parameter Models]] | Posterior ~ Normal at mode |

## Notes

- [[Note 1]] — CONTAINS: [list specific theorems, definitions, examples in this note]
- [[Note 2]] — CONTAINS: [list specific content]

## Sources
- [[raw/file1.pdf]] — Which source(s) these notes derive from

## See Also
- [[Other Note]] — Crosslink to related notes in sibling or parent folders
```

### 6b. Mid-level topic indexes

For each topic folder with sub-folders:

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

> [!abstract] Routing Summary
> This topic covers [BROAD DESCRIPTION]. Contains M sub-topics and N total notes.
> - For [sub-domain A] → [[Sub-topic A1/_Index|Sub-topic A1]]
> - For [sub-domain B] → [[Sub-topic A2/_Index|Sub-topic A2]]
> - For overview of the whole topic → [[Topic Overview]]

## Sub-topics
- [[Sub-topic A1/_Index|Sub-topic A1]] — COVERS: [what concepts and results live here]
- [[Sub-topic A2/_Index|Sub-topic A2]] — COVERS: [what concepts and results live here]

## Cross-Cutting Concepts
Concepts that span multiple sub-topics:
- **Concept X**: appears in [[Note A]] (as theory) and [[Note B]] (as application)

## Sources
- [[raw/file1.pdf]] — Brief description
```

### 6c. Destination folder index

The root index for the ingestion destination, linking to all top-level topic sub-folders. Same routing table format.

### 6d. Vault root index (`_Vault_Index.md`)

Create or update the vault-level index. Include a "Recent Ingestions" log and a cross-folder "Topic Map" surfacing connections discovered during ingestion.

### Index update rules

- When updating an existing index, MERGE new entries — never delete existing entries unless the referenced note no longer exists.
- Keep one-line summaries but always include the CONTAINS/COVERS annotations.
- Update `date_updated` in frontmatter on every modification.
- Always re-read an existing index before updating to avoid overwriting content.

## Step 7: Summary and Dynamic Views

### 7a. Report results

After processing, report:
- Number of raw files copied
- Number of notes created, broken down by type (concept, theorem, example, etc.)
- Folder hierarchy tree
- Indexes created or updated
- Concept dependency chain highlights
- Suggest next steps

### 7b. Create .base files for dynamic views

Using the **obsidian-bases** skill, create these views in the destination folder:

**`Ingested Notes.base`** — Table view of all ingested notes:
- Columns: file.name, doc_type, source, source_location, date_ingested
- Filter: `file.hasTag("source/ingested")` AND `file.inFolder("<destination>")`
- Sort: date_ingested DESC

**`Concept Dependencies.base`** — Table showing the concept graph:
- Columns: file.name, depends_on, used_by, tags
- Filter: `file.hasTag("source/ingested")` AND NOT `file.hasTag("type/index")`
- Group by: folder

**`Theorems and Definitions.base`** — Filtered view of formal results:
- Columns: file.name, source, source_location
- Filter: `file.hasTag("type/theorem")` OR `file.hasTag("type/definition")`
- Sort: file.name ASC

These .base files provide dynamic, always-up-to-date views complementing the static _Index.md files. Indexes are for LLM navigation; .base files are for human browsing and exploration.

---

# Mode 2: Query

Search the vault's knowledge base, compile an answer with summaries and source references.

## Step 1: Understand the question

Parse the user's question. Identify:
- **Key concepts/terms** to search for
- **Scope**: specific folder/project, or whole vault?
- **Depth**: quick answer or deep dive?

## Step 2: Search the vault

Use a layered search strategy, starting broad and narrowing:

### 2a. Check indexes first (routing)

1. Read `_Vault_Index.md` at the vault root to identify which area to search.
2. Follow the routing summary: the index will say "If you need X, go to [[Note A]]" — follow those pointers.
3. Navigate down through topic and sub-topic indexes, using the Concept Map tables to identify the right notes.

### 2b. Search for content

1. Use `obsidian search query="<terms>" limit=20` (obsidian-cli skill) for full-text search. This is faster and more accurate than Grep because it uses Obsidian's own index.
2. Fall back to Grep + Glob if Obsidian is not running.
3. Read the most relevant notes found.

### 2c. Traverse the concept graph

From the notes found, use `depends_on` and `used_by` frontmatter properties to traverse the concept graph:
- Follow `depends_on` links backward to build understanding of prerequisites
- Follow `used_by` links forward to find applications and extensions
- This surfaces context that keyword search misses

### 2d. Follow crosslinks

From notes found, follow wikilinks to related notes. Read those too.

### 2e. Trace to raw sources

For each relevant note, use the `source_location` property (e.g., "Ch. 5, pp. 117-137") to read only the relevant pages of the source PDF:
```
Read tool with pages: "117-137"
```
This verifies claims and gathers additional detail without reading the entire document.

## Step 3: Compile the answer

```markdown
## Answer

> [!summary]
> 1-3 sentence direct answer to the question.

### Details

Expanded explanation organized by sub-topic. Use clear headings.
Each claim should have an inline source reference:
"The system uses batch processing ([[raw/architecture.pdf|Source, p.3]])."

### Sources

| Source | Location | Relevance |
|--------|----------|-----------|
| [[raw/file1.pdf]] | Ch. 3, pp. 45-52 | Main source for X |
| [[Note Name]] | — | Summary of Y concept |

### Related Notes
- [[Note A]] — how it relates
- [[Note B]] — how it relates

### Gaps
If the vault doesn't fully answer the question:
- "No information found about X — consider ingesting sources on this topic."
```

### Answer rules

1. **Always cite sources** with wikilinks and page/section numbers.
2. **Prefer raw sources for verification** — cite both the note and its raw source.
3. **Be honest about gaps** — don't fabricate information.
4. **Use the concept graph** — include prerequisite concepts the user may need.

## Step 4: Offer follow-ups

Suggest related questions, notes to explore, and gaps that could be filled by ingesting additional sources.

---

# General Rules (Both Modes)

## Skill integration

Always use the **obsidian-markdown** skill conventions for all note formatting — wikilinks, embeds, callouts, LaTeX math (`$...$` inline, `$$...$$` display), frontmatter properties.

Use the **obsidian-cli** skill as the primary tool for note creation and search when Obsidian is running. Fall back to Write/Read/Grep tools when it's not available.

Use the **defuddle** skill for all web URL ingestion — it produces clean markdown free of navigation clutter.

Use the **obsidian-bases** skill to create .base dynamic views after ingestion.

## File handling

- Never modify or delete the user's original source files — only copy into `raw/`
- For large directories with many files, process in batches and report progress
- Ask the user before proceeding if the ingest would create more than 20 notes

## Index management

- When updating any index, always re-read it first to avoid overwriting existing entries
- Merge new entries into existing indexes — never delete existing entries unless the note no longer exists
- Update `date_updated` on every modification

## Quality checklist

Before considering an ingestion complete, verify:
- [ ] Every theorem/definition referenced in the source has a formal statement in a note (with full conditions, not just a mention)
- [ ] Every worked example in the source is captured with setup, solution, and interpretation
- [ ] Every cross-reference in the source maps to a wikilink
- [ ] The `depends_on` and `used_by` fields are populated for each concept note
- [ ] Each index contains a routing summary and CONTAINS/COVERS annotations
- [ ] All LaTeX renders correctly (proper `$` delimiters, `\text{}` for text in math mode)
- [ ] .base files are created and filter correctly
