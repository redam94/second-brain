---
title: "Audit Report: Orphan Processing - Factor Analysis"
date: 2026-04-09
---

# Vault Repair Audit Report

## Task

Process the orphaned raw file `Research/raw/Factor analysis.md` into proper vault notes following the vault-ingest schema.

## Source Analysis

- **Raw file**: `Research/raw/Factor analysis.md`
- **Source URL**: https://www.pymc.io/projects/examples/en/latest/case_studies/factor_analysis.html
- **Document type**: Tutorial (PyMC case study)
- **Classification**: `doc/tutorial` with `method/pymc` and `method/factor-analysis`

### Existing Vault State

A single combined note already existed at `Research/Bayesian Statistics/Advanced Models/Factor Analysis and PPCA.md` covering the same source. However, per the vault-ingest standard for tutorials, the content should be decomposed into:
- Separate **concept notes** for the underlying theory
- A **tutorial note** preserving the practical workflow
- Proper **dependency chains** between notes

## Notes Created

| # | File | Type | doc_type |
|---|------|------|----------|
| 1 | `Research/Factor Analysis/Factor Analysis Model.md` | `type/concept` | concept |
| 2 | `Research/Factor Analysis/Identifiability in Factor Models.md` | `type/concept` | concept |
| 3 | `Research/Factor Analysis/Amortized Inference for Factor Analysis.md` | `type/concept` | concept |
| 4 | `Research/Factor Analysis/Post-hoc Factor Score Recovery.md` | `type/concept` | concept |
| 5 | `Research/Factor Analysis/PyMC Factor Analysis Tutorial.md` | `type/example` | tutorial |
| 6 | `Research/Factor Analysis/_Index.md` | `type/index` | -- |

**Total: 5 content notes + 1 index = 6 files created**

## Folder Structure

```
outputs/
└── Research/
    └── Factor Analysis/
        ├── _Index.md
        ├── Factor Analysis Model.md
        ├── Identifiability in Factor Models.md
        ├── Amortized Inference for Factor Analysis.md
        ├── Post-hoc Factor Score Recovery.md
        └── PyMC Factor Analysis Tutorial.md
```

## Concept Dependency Graph

```
Factor Analysis Model
  └──> Identifiability in Factor Models
        └──> Amortized Inference for Factor Analysis
              └──> Post-hoc Factor Score Recovery

All four concept notes ──> PyMC Factor Analysis Tutorial
```

## Frontmatter Compliance

All notes include the full enhanced frontmatter schema:
- [x] `title`
- [x] `tags` (with `source/ingested`, `topic/*`, `type/*`, `doc/*`, `method/*`)
- [x] `source` (wikilink to raw file)
- [x] `source_location`
- [x] `date_ingested`
- [x] `folder`
- [x] `doc_type`
- [x] `depends_on` (populated with prerequisite concepts)
- [x] `used_by` (populated with downstream concepts)
- [x] `aliases`

## Note Body Compliance

All notes follow the standardized structure:
- [x] `> [!summary]` callout at top
- [x] Overview section
- [x] Main Content with formal callouts (`> [!definition]`, `> [!theorem]`, `> [!warning]`)
- [x] Block IDs on formal content (`^def-*`, `^thm-*`)
- [x] Complete code blocks (not abbreviated)
- [x] Connections section
- [x] See Also section with wikilinks

## Index Compliance

The `_Index.md` includes:
- [x] Routing Summary with conditional navigation
- [x] Concept Map table with dependencies and key results
- [x] Notes list with CONTAINS annotations
- [x] Sources section
- [x] See Also cross-links

## Cross-References to Existing Vault Notes

The new notes link to these existing vault notes:
- `[[Multiparameter Models]]`
- `[[Bayesian Linear Regression]]`
- `[[Approximation Methods]]`
- `[[Nonparametric Models Overview]]`
- `[[Generalized Linear Models]]`
- `[[Computational Troubleshooting]]`
- `[[Confirmatory Factor Analysis and SEM]]`

## Key Decisions

1. **Decomposition**: Split the single existing combined note into 4 atomic concept notes + 1 tutorial note, following the vault-ingest rule that tutorials should separate theory from practical workflow.
2. **Folder placement**: Created `Research/Factor Analysis/` as a new sub-folder rather than placing inside `Bayesian Statistics/Advanced Models/`, to keep the output self-contained as requested.
3. **Code preservation**: All code blocks from the raw source are preserved completely in the tutorial note; key implementation code is also included in concept notes where it illustrates the concept directly.
4. **LaTeX**: All mathematical expressions use proper `$...$` / `$$...$$` delimiters with correct notation.
