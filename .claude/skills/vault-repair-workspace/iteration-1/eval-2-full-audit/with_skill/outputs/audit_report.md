---
title: "Vault Repair Audit Report"
date: 2026-04-09
scope: "/Users/redam94/Documents/second-brain/"
---

# Vault Repair Audit Report

Generated: 2026-04-09
Vault: `/Users/redam94/Documents/second-brain/`

---

## Summary

```
Vault Repair Audit
==================

Frontmatter:
  - 83 notes missing depends_on/used_by
  - 83 notes missing doc_type
  - 83 notes missing source_location
  - 15 notes missing source/ingested tag (have source but lack tag)
  - 2 notes using non-standard type/book-overview tag
  - 2 non-standard type/ tags found (type/book-overview, type/vault-root, type/dream)
  - 13 Clippings notes using "clippings" tag instead of vault-ingest standard tags

Content depth:
  - 4 raw PDF files fully processed (BDA3.pdf, BayesWorkflow.pdf, Mostly Harmless Econometrics.pdf, StatRethink-Bayes.pdf)
  - 1 raw file with shallow notes (Missing Data.md — only 50 lines in processed note)
  - 0 orphaned raw files (all 18 raw files have at least 1 corresponding note)
  - 2 raw PDF files with indirect processing (p_hacking.pdf, ssrn-2080235.pdf — 3-4 notes each)

Cross-references:
  - 3 broken wikilinks (targets do not exist as files)
  - 1 missing index file (Clippings/_Index.md referenced but absent)
  - 13 Clippings notes not referenced from any Research note

Indexes:
  - 15 indexes need routing summary upgrade (none use > [!abstract] Routing Summary)
  - 15 indexes missing concept map tables
  - 15 indexes missing CONTAINS/COVERS annotations
  - 0 .base files in active vault (only exist in .claude/ eval workspaces)

Estimated work: ~83 notes to modify, ~1 index to create, ~3 .base files to create per folder
```

---

## 1. Raw File Inventory

### 1a. PDF Raw Files (4 textbooks/papers)

| Raw File | Status | Corresponding Notes | Note Count |
|----------|--------|-------------------|------------|
| `BDA3.pdf` | Fully processed | 26 notes across Inference Fundamentals, Model Assessment, Computation, Regression Models, Advanced Models | 26 |
| `StatRethink-Bayes.pdf` | Fully processed | 14 notes across Inference Fundamentals, Regression Models, Advanced Models, Model Assessment | 14 |
| `Mostly Harmless Econometrics.pdf` | Fully processed | 13 notes across Foundations, Regression Foundations, Identification Strategies, Extensions | 13 |
| `BayesWorkflow.pdf` | Fully processed | 7 notes in Workflow subfolder | 7 |
| `p_hacking.pdf` | Processed | 3 notes in Research Methodology (Garden of Forking Paths, Researcher Degrees of Freedom, Forking Paths and Bayesian Approaches) | 3 |
| `ssrn-2080235.pdf` | Processed | 2 notes in Research Methodology (Activity Bias in Advertising, Observational vs Experimental Methods) | 2 |

### 1b. Markdown Raw Files (12 PyMC tutorials)

| Raw File | Status | Processed Note(s) | Lines |
|----------|--------|-------------------|-------|
| `Baby Births Modelling with HSGPs.md` | Processed | Hilbert Space Gaussian Processes | 81 |
| `Bayesian Non-parametric Causal Inference.md` | Processed | Nonparametric Causal Inference | 83 |
| `Bayesian copula estimation Describing correlated joint distributions.md` | Processed | Copula Estimation | 101 |
| `Bayesian moderation analysis.md` | Processed | Moderation Analysis | 108 |
| `Confirmatory Factor Analysis and Structural Equation Models in Psychometrics.md` | Processed | Confirmatory Factor Analysis and SEM | 93 |
| `Counterfactual inference calculating excess deaths due to COVID-19.md` | Processed | Counterfactual Inference | 86 |
| `Difference in differences.md` | Processed | Bayesian Difference in Differences | 109 |
| `Discrete Choice and Random Utility Models.md` | Processed | Discrete Choice Models | 106 |
| `Factor analysis.md` | Processed | Factor Analysis and PPCA | 117 |
| `Missing Data.md` | Shallow | Missing Data - Statistical Rethinking (84 lines), Missing Data Models (50 lines -- thin) | 50-84 |
| `Social Networks.md` | Processed | Social Network Models | 85 |
| `The Besag-York-Mollie Model for Spatial Data.md` | Processed | Spatial Models - BYM | 110 |

**Shallow notes** (under 40 lines of content excluding frontmatter):

- `Research/Bayesian Statistics/Regression Models/Missing Data Models.md` (50 total lines, ~34 content lines) -- derived from BDA3 Ch. 18 via `BDA3.pdf`. Lacks formal theorem/definition callouts, has no worked examples, missing source_location. The raw source (BDA3 Chapter 18) covers multiple imputation, EM algorithm, and MNAR modeling in depth, but the note compresses this to bullet points.

### 1c. Clippings (13 web clippings -- raw-like files outside raw/)

The `Clippings/` folder contains 13 markdown files that appear to be Obsidian Web Clipper captures. These are essentially raw source material that was clipped directly from the web and has not been processed into vault-ingest format:

| Clipping | Matching Raw File | Matching Research Note |
|----------|------------------|----------------------|
| `Baby Births Modelling with HSGPs.md` | Yes (identical name in raw/) | Hilbert Space Gaussian Processes |
| `Bayesian Non-parametric Causal Inference.md` | Yes | Nonparametric Causal Inference |
| `Bayesian copula estimation...md` | Yes | Copula Estimation |
| `Bayesian moderation analysis.md` | Yes | Moderation Analysis |
| `Confirmatory Factor Analysis...md` | Yes | CFA and SEM |
| `Counterfactual inference...md` | Yes | Counterfactual Inference |
| `Difference in differences.md` | Yes | Bayesian DiD |
| `Discrete Choice and Random Utility Models.md` | Yes | Discrete Choice Models |
| `Factor analysis.md` | Yes | Factor Analysis and PPCA |
| `Missing Data.md` | Yes | Missing Data - Statistical Rethinking |
| `Social Networks.md` | Yes | Social Network Models |
| `The Besag-York-Mollie Model...md` | Yes | Spatial Models - BYM |
| `Unlock the Secrets of Causal Inference...md` | **No matching raw/** | **No matching Research note** |

The `Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs` clipping has no corresponding raw file and no processed Research note. It is effectively an **orphaned clipping**.

---

## 2. Frontmatter Audit

### 2a. Notes with frontmatter present

- **Total vault notes scanned**: 98 (excluding raw/, .obsidian/, .claude/)
- **Research notes with frontmatter**: 83 (all Research notes have frontmatter)
- **Clippings with frontmatter**: 13 (all Clippings have frontmatter, but in web-clipper format)
- **Vault Index & Dream Index**: 2 (have frontmatter)

### 2b. Missing basic fields

All 83 Research notes have these basic fields present:
- `title`: present in all
- `tags`: present in all
- `source`: present in 70 notes (absent from 13 _Index.md files which use `parent` instead)
- `date_ingested`: present in 68 notes (15 _Index.md and overview files use `date_updated` instead)
- `folder`: present in 68 notes (absent from indexes and overviews)

**Clippings frontmatter gap**: The 13 Clippings notes use web-clipper frontmatter (`source`, `author`, `published`, `created`, `description`, `tags: ["clippings"]`) which does NOT match vault-ingest schema. They are missing:
- `date_ingested` (use `created` instead)
- `folder` (absent)
- All enhanced fields (see below)

### 2c. Missing enhanced fields

**Every note in the vault is missing ALL four enhanced fields:**

| Field | Notes Missing | Percentage |
|-------|--------------|------------|
| `depends_on` | 83 of 83 Research notes | 100% |
| `used_by` | 83 of 83 Research notes | 100% |
| `doc_type` | 83 of 83 Research notes | 100% |
| `source_location` | 83 of 83 Research notes | 100% |

These fields have never been populated in any note.

### 2d. Tag inconsistencies

**Non-standard type/ tags:**

| File | Tag | Should Be |
|------|-----|-----------|
| `Research/Econometrics/Mostly Harmless Econometrics - Overview.md` | `type/book-overview` | `type/overview` |
| `Research/Bayesian Statistics/Statistical Rethinking - Overview.md` | `type/book-overview` | `type/overview` |
| `_Vault_Index.md` | `type/vault-root` | Non-standard (could keep as custom or map to `type/index`) |
| `Dream/_Index.md` | `type/dream` | Non-standard (custom tag, acceptable) |

**Missing type/ tags (notes without any type/ tag):**

55 Research notes lack a `type/` tag entirely. These are the non-index notes that have `topic/` and `source/ingested` tags but no `type/concept`, `type/theorem`, etc. Examples:
- All Inference Fundamentals notes (8 notes)
- All Model Assessment notes (5 notes)
- All Computation notes (5 notes)
- All Regression Models notes (9 notes)
- All Advanced Models notes (9 notes)
- All Workflow notes (7 notes)
- All Econometrics non-index notes (12 notes)

**Missing source/ingested tag:**

15 notes have a `source` field but lack the `source/ingested` tag. These are primarily _Index.md files and overview notes that reference sources but use `source/ingested` inconsistently:
- Index files that have `source/ingested` tag but no `source` field: 15 _Index.md files
- Overview/regular notes that have `source` but may lack `source/ingested`: None -- all non-index notes with a `source` field do have `source/ingested`

**Clippings tag issue:**
- All 13 Clippings notes use `tags: ["clippings"]` -- a single flat tag instead of the hierarchical `type/`, `topic/`, `source/` taxonomy used in Research notes.

**Missing doc/ tags:**
- No notes have `doc/textbook`, `doc/paper`, `doc/tutorial`, or `doc/article` tags. These should be added based on source type.

---

## 3. Wikilink Audit

### 3a. Broken wikilinks (target file does not exist)

| Source File | Broken Link | Notes |
|-------------|-------------|-------|
| `_Vault_Index.md` | `[[Clippings/_Index\|Clippings]]` | No `Clippings/_Index.md` file exists |
| `Research/Econometrics/Mostly Harmless Econometrics - Overview.md` | `[[Conditional Expectation Function\|CEF]]` | No `Conditional Expectation Function.md` exists -- concept is covered inline in Regression and the CEF |
| `Research/Bayesian Statistics/Advanced Models/Copula Estimation.md` | `[[LKJ distribution]]` | No `LKJ distribution.md` exists -- concept mentioned in Hierarchical Models but no dedicated note |
| `Clippings/Unlock the Secrets of Causal Inference...md` | `[[Graham Harrison]]` | No `Graham Harrison.md` exists -- likely an author name from the clipping |

### 3b. Dangling links (one-directional references)

Many notes reference other notes without reciprocal backlinks in the target's "See Also" section. This is expected for hierarchical references (index -> note) but notable for peer references. A full enumeration would require cross-referencing all 180+ unique wikilinks, but prominent examples include:

- Notes that reference `[[Hierarchical Models]]` (8+ notes) but Hierarchical Models only links back to a subset
- Notes that reference `[[The Selection Problem]]` (5+ notes) from both Bayesian and Econometrics contexts
- Cross-domain references (e.g., Econometrics notes referencing Bayesian Statistics notes) that lack reciprocal "See Also" entries

### 3c. Code-artifact wikilinks

Several raw/Clippings files contain Python code with double-bracket syntax that Obsidian interprets as wikilinks. These are false positives in the raw files, not actual broken links:
- `[["age", "bmi"]]`, `[["choiceId"]]`, `[["cov"]]`, etc.
- These appear in Clippings and raw/ files, not in processed Research notes.

---

## 4. Index Audit

### 4a. Index inventory

| Index File | Has Routing Summary? | Has Concept Map? | Has CONTAINS/COVERS? |
|------------|---------------------|------------------|---------------------|
| `Research/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/Inference Fundamentals/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/Model Assessment/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/Computation/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/Regression Models/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/Advanced Models/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Bayesian Statistics/Workflow/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Econometrics/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Econometrics/Foundations/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Econometrics/Regression Foundations/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Econometrics/Identification Strategies/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Econometrics/Extensions/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Research Methodology/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Research/Research Methodology/Experimental Design/_Index.md` | No (uses `> [!abstract] Summary`) | No | No |
| `Dream/_Index.md` | No (uses `> [!abstract] Purpose`) | N/A (special index) | N/A |

**All 15 Research indexes** use `> [!abstract] Summary` callouts instead of the vault-ingest routing format (`> [!abstract] Routing Summary` with conditional navigation like "Need X? -> [[Note]]"). None have concept map tables or CONTAINS/COVERS annotations on note entries.

### 4b. Missing index

- `Clippings/_Index.md` -- Referenced from `_Vault_Index.md` but does not exist. The Clippings folder has 13 notes with no index.

### 4c. .base files

No `.base` files exist anywhere in the active vault. The only `.base` files found are in `.claude/skills/` eval workspaces (from prior skill evaluations). Each Research subfolder should have:
- `Ingested Notes.base`
- `Concept Dependencies.base`
- `Theorems and Definitions.base`

---

## 5. Estimated Repair Work

### Notes to modify: ~83

| Repair Type | Count | Description |
|-------------|-------|-------------|
| Add `depends_on`/`used_by` | 83 | All Research notes need dependency analysis |
| Add `doc_type` | 83 | Classify each note (concept, theorem, definition, example, overview, index) |
| Add `source_location` | ~55 | Notes with specific chapter/section references in their source |
| Standardize tags | 57 | 55 notes need `type/` tag added, 2 need `type/book-overview` -> `type/overview` |
| Add `doc/` tags | 68 | Add `doc/textbook`, `doc/paper`, or `doc/tutorial` based on source |
| Deepen shallow notes | 1 | Missing Data Models needs enrichment |

### Files to create: ~4

| File | Purpose |
|------|---------|
| `Clippings/_Index.md` | Missing index for Clippings folder |
| 1 stub note for `LKJ distribution` | Referenced from Copula Estimation, concept exists in Hierarchical Models |
| Update `Conditional Expectation Function` link | Fix or create stub |

### .base files to create: ~24-45

Each of the 8 Research subfolders plus the top-level Research folder needs 3 `.base` files (Ingested Notes, Concept Dependencies, Theorems and Definitions), totaling ~27 `.base` files.

### Indexes to upgrade: 15

All 15 _Index.md files need conversion to routing table format with:
- `> [!abstract] Routing Summary` with conditional navigation
- Concept Map table
- CONTAINS/COVERS annotations on note entries
