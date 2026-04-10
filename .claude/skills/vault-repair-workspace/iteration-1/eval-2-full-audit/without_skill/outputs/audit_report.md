# Obsidian Vault Audit Report

**Vault:** `/Users/redam94/Documents/second-brain/`
**Date:** 2026-04-09
**Scope:** Full audit -- orphaned files, frontmatter, broken wikilinks, tag inconsistencies, index quality

---

## 1. Vault Overview

| Metric | Count |
|--------|-------|
| Total markdown files (vault proper) | ~96 (excluding .claude/) |
| Clippings | 13 |
| Research/raw markdown files | 12 |
| Research/raw PDF files | 6 |
| Processed Research notes | ~73 |
| Index files (_Index.md) | 14 |
| Dream files | 1 |
| Top-level vault index | 1 |

### Directory Structure

```
second-brain/
  _Vault_Index.md
  Clippings/                          (13 notes, NO _Index.md)
  Dream/
    _Index.md
  Research/
    _Index.md
    raw/                              (12 .md + 6 .pdf)
    Bayesian Statistics/
      _Index.md
      BDA3 - Overview.md
      Statistical Rethinking - Overview.md
      Inference Fundamentals/  (8 notes + _Index)
      Model Assessment/        (5 notes + _Index)
      Computation/             (5 notes + _Index)
      Regression Models/       (9 notes + _Index)
      Advanced Models/         (9 notes + _Index)
      Workflow/                (7 notes + _Index)
    Econometrics/
      _Index.md
      Mostly Harmless Econometrics - Overview.md
      Foundations/             (3 notes + _Index)
      Regression Foundations/  (3 notes + _Index)
      Identification Strategies/ (5 notes + _Index)
      Extensions/              (3 notes + _Index)
    Research Methodology/
      _Index.md
      5 standalone notes
      Experimental Design/     (3 notes + _Index)
```

---

## 2. Orphaned Raw Files

### 2.1 Clipping Without Raw Counterpart

| Clipping | Has raw/.md? | Has raw/.pdf? | Has processed note? |
|----------|-------------|---------------|---------------------|
| Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs.md | NO | NO | NO |

**Issue:** This clipping exists only in `Clippings/` with no corresponding raw file in `Research/raw/` and no processed note in the Research hierarchy. It is completely orphaned from the ingestion pipeline.

### 2.2 Raw Markdown Files -- All Have Processed Notes

All 12 raw markdown files in `Research/raw/` have corresponding processed notes in the Research hierarchy. Each raw .md file also has an identical copy in `Clippings/`.

| Raw .md File | Processed Note Location |
|-------------|------------------------|
| Baby Births Modelling with HSGPs.md | Bayesian Statistics/Advanced Models/Hilbert Space Gaussian Processes.md |
| Bayesian Non-parametric Causal Inference.md | Bayesian Statistics/Advanced Models/Nonparametric Causal Inference.md |
| Bayesian copula estimation... .md | Bayesian Statistics/Advanced Models/Copula Estimation.md |
| Bayesian moderation analysis.md | Bayesian Statistics/Regression Models/Moderation Analysis.md |
| Confirmatory Factor Analysis... .md | Bayesian Statistics/Advanced Models/Confirmatory Factor Analysis and SEM.md |
| Counterfactual inference... .md | Bayesian Statistics/Regression Models/Counterfactual Inference.md |
| Difference in differences.md | Econometrics/Identification Strategies/Bayesian Difference in Differences.md |
| Discrete Choice and Random Utility Models.md | Econometrics/Extensions/Discrete Choice Models.md |
| Factor analysis.md | Bayesian Statistics/Advanced Models/Factor Analysis and PPCA.md |
| Missing Data.md | Bayesian Statistics/Regression Models/Missing Data - Statistical Rethinking.md |
| Social Networks.md | Bayesian Statistics/Advanced Models/Social Network Models.md |
| The Besag-York-Mollie Model... .md | Bayesian Statistics/Advanced Models/Spatial Models - BYM.md |

### 2.3 Raw PDFs -- All Have Processed Notes

| Raw PDF | Processed Overview/Notes |
|---------|------------------------|
| BDA3.pdf | BDA3 - Overview.md + ~25 chapter notes |
| StatRethink-Bayes.pdf | Statistical Rethinking - Overview.md + ~10 chapter notes |
| Mostly Harmless Econometrics.pdf | Mostly Harmless Econometrics - Overview.md + ~14 chapter notes |
| BayesWorkflow.pdf | Bayesian Workflow - Overview.md + 6 section notes |
| p_hacking.pdf | Garden of Forking Paths.md + 2 related notes |
| ssrn-2080235.pdf | Activity Bias in Advertising.md + 1 related note |

### 2.4 Duplicate Content: Clippings = Raw

All 12 files in `Clippings/` that have a raw counterpart are **byte-for-byte identical** to their `Research/raw/` copies. Both use the same `clippings` tag and same frontmatter. This is redundant storage.

---

## 3. Frontmatter Issues

### 3.1 Missing `source` Field

The following processed Research notes lack a `source` field linking back to their raw file. This makes provenance tracking incomplete.

**PyMC-ingested notes (all 2026-04-09, missing `source`):**
1. `Research/Bayesian Statistics/Advanced Models/Hilbert Space Gaussian Processes.md`
2. `Research/Bayesian Statistics/Advanced Models/Nonparametric Causal Inference.md`
3. `Research/Bayesian Statistics/Advanced Models/Copula Estimation.md`
4. `Research/Bayesian Statistics/Advanced Models/Social Network Models.md`
5. `Research/Bayesian Statistics/Advanced Models/Spatial Models - BYM.md`
6. `Research/Bayesian Statistics/Advanced Models/Confirmatory Factor Analysis and SEM.md`
7. `Research/Bayesian Statistics/Regression Models/Counterfactual Inference.md`
8. `Research/Bayesian Statistics/Regression Models/Moderation Analysis.md`
9. `Research/Bayesian Statistics/Regression Models/Missing Data - Statistical Rethinking.md`
10. `Research/Econometrics/Identification Strategies/Bayesian Difference in Differences.md`

**Count:** 10 of ~73 processed notes are missing `source` (all from the 2026-04-09 batch).

### 3.2 Missing `folder` Field

Notes ingested on 2026-04-09 consistently lack the `folder` field that notes ingested on 2026-04-08 have. The `folder` field records the note's intended location in the hierarchy.

**Affected:** Same 10 notes listed in 3.1 above.

### 3.3 Missing `depends_on`, `used_by`, `source_location`, `doc_type` Fields

Per the vault-ingest skill template, processed notes should have:
- `doc_type`: textbook | paper | tutorial | article | reference
- `source_location`: precise location in source (e.g., "Ch. 5, pp. 117-137")
- `depends_on`: prerequisite concepts (list of wikilinks)
- `used_by`: downstream concepts that build on this (list of wikilinks)

**Finding:** ZERO notes in the actual vault have any of these four fields. They exist only in the skill template and in prior eval workspace outputs. This is a systematic gap across all ~73 processed notes.

### 3.4 Missing `authors`/`year` Fields on Book Overviews

| Note | Has `authors`? | Has `year`? |
|------|---------------|-------------|
| BDA3 - Overview.md | NO | NO |
| Statistical Rethinking - Overview.md | YES | YES |
| Mostly Harmless Econometrics - Overview.md | YES | YES |
| Bayesian Workflow - Overview.md | NO | NO |
| Garden of Forking Paths.md | NO | NO |
| Activity Bias in Advertising.md | NO | NO |

### 3.5 Clippings and Raw Files: Empty `author`/`published` Fields

All Clippings and raw .md files have `author:` and `published:` fields that are **empty** (no value). Example:
```yaml
author:
published:
```

This applies to all 12 Clippings with raw counterparts plus the "Unlock the Secrets" clipping (which does have `author: "[[Graham Harrison]]"` and `published: 2023-04-06`).

---

## 4. Broken Wikilinks

### 4.1 Links to Non-Existent Notes (Definite Breaks)

These wikilinks point to notes that do not exist anywhere in the vault:

| Broken Link | Referenced From (sample) | Count |
|-------------|------------------------|-------|
| `[[Gelman and Loken 2013 - The Garden of Forking Paths]]` | Multiple notes | 30 |
| `[[Bayes Theorem]]` | Multiple notes | 28 |
| `[[Bayes' Theorem]]` | Multiple notes | 14 |
| `[[Case Studies in Forking Paths]]` | Multiple notes | 23 |
| `[[Solutions for Multiple Comparisons]]` | Multiple notes | 19 |
| `[[Data Processing and Analysis Choices]]` | Multiple notes | 18 |
| `[[Statistical Notation and Framework]]` | Multiple notes | 17 |
| `[[Theoretical Framework for Multiple Comparisons]]` | Multiple notes | 16 |
| `[[Exchangeability]]` | Multiple notes | 15 |
| `[[Predictive Distributions]]` | Multiple notes | 14 |
| `[[Discrete Bayesian Examples]]` | Multiple notes | 14 |
| `[[Three Steps of Bayesian Data Analysis]]` | Multiple notes | 13 |
| `[[P-Hacking]]` | Multiple notes | 11 |
| `[[Multiple Comparisons Problem]]` | Multiple notes | 11 |
| `[[Likelihood and Odds Ratios]]` | Multiple notes | 11 |
| `[[Pre-registration]]` | Multiple notes | 10 |
| `[[BDA3 - S1.3 - Bayesian Inference]]` | Multiple notes | 9 |
| `[[BDA3 - Ch06 - Model Checking]]` | Multiple notes | 8 |
| `[[BDA3 - Ch02 - Single-Parameter Models]]` | Multiple notes | 8 |
| `[[BDA3 - Bayesian Data Analysis]]` | Multiple notes | 8 |
| `[[Pre-publication Replication]]` | Multiple notes | 7 |
| `[[Simmons Nelson and Simonsohn 2011]]` | Multiple notes | 6 |
| `[[Replication Crisis]]` | Multiple notes | 5 |
| `[[Exploratory vs Confirmatory Research]]` | Multiple notes | 5 |
| `[[Andrew Gelman]]` | Multiple notes | 5 |
| `[[Note Name]]`, `[[Note A]]`, `[[Note B]]`, etc. | Skill templates | 5 each |
| `[[Asymptotics and Non-Bayesian Connections]]` | 1 note | 1 |
| `[[Researcher Degrees of Freedom - Theoretical Framework]]` | 1 note | 1+ |
| `[[Difference in differences]]` | 1 note | 1 |
| `[[Graham Harrison]]` | Clippings | 1 |
| `[[Eric Loken]]` | Multiple notes | 3 |
| `[[Conditional Expectation Function]]` | 1 note | 1 |
| `[[Bayesian Copula Estimation]]` | 1 note | 1 |

**Key patterns:**
- The `BDA3 - S1.x` and `BDA3 - Chxx` links (approx. 50+ references) point to a fine-grained section/chapter naming scheme that does not match actual note names. Actual notes use descriptive names like "Probability and Bayesian Inference" instead of "BDA3 - Ch01 - Probability and Inference."
- Many concept links (Bayes Theorem, Exchangeability, Predictive Distributions, etc.) reference concepts discussed within existing notes but not given their own standalone notes.
- The `P-Hacking and Multiple Comparisons/_Index` path is referenced but does not exist; this was a prior ingestion scheme that was superseded.

### 4.2 Duplicate/Inconsistent Link Targets

| Variant A | Variant B | Issue |
|-----------|-----------|-------|
| `[[Bayes Theorem]]` (28 refs) | `[[Bayes' Theorem]]` (14 refs) | Neither exists; inconsistent naming |
| `[[Asymptotics and Frequentist Connections]]` (14 refs) | `[[Asymptotics and Non-Bayesian Connections]]` (1 ref) | First is correct filename; second is broken |
| `[[Bayesian Copula Estimation]]` (1 ref) | `[[Copula Estimation]]` (2 refs) | Second is the actual filename |
| `[[Difference in differences]]` (1 ref) | `[[Differences-in-Differences]]` (15 refs) | Second is the actual filename; first matches raw |
| `[[MCMC]]` (2 refs) | `[[MCMC Basics]]` (12 refs) | Second is the actual filename |

### 4.3 Escaped Pipe Characters in Wikilinks

Several wikilinks use backslash-escaped pipes (`\|`) instead of normal pipes for display text. This may cause rendering issues in some Obsidian versions:

Examples:
- `[[Instrumental Variables\|IV]]`
- `[[Differences-in-Differences\|DD/Fixed effects]]`
- `[[BDA3 - Overview\|BDA3]]`
- `[[Bayesian Statistics/_Index\|Bayesian Statistics]]`
- Plus ~15 more instances.

---

## 5. Tag Inconsistencies

### 5.1 Tag Taxonomy

The vault uses a hierarchical tag system:
- `source/ingested` -- all processed notes
- `topic/<domain>` -- topic classification (e.g., `topic/bayesian-statistics`)
- `type/<note-type>` -- note type (e.g., `type/index`, `type/overview`, `type/book-overview`)
- `method/<tool>` -- computational method (e.g., `method/pymc`, `method/bart`)
- `source/<book>` -- book source (e.g., `source/statistical-rethinking`)
- `doc/<type>` -- document type -- NOT USED in any actual note
- `clippings` -- used on all Clippings and raw files

### 5.2 Missing `type/` Tags on Processed Notes

Most processed notes lack a `type/` tag (e.g., `type/concept`, `type/overview`). Only 3 notes use them:
- `type/overview` on BDA3 - Overview.md
- `type/book-overview` on Statistical Rethinking - Overview.md and Mostly Harmless Econometrics - Overview.md

All other ~60+ processed notes have no `type/` tag, despite the skill template defining `type/<note-type>` as expected.

### 5.3 Missing `doc/` Tags

The skill template defines `doc/<source-type>` (e.g., `doc/textbook`, `doc/paper`, `doc/tutorial`). **Zero** notes in the vault use any `doc/` tag.

### 5.4 Inconsistent `source/` Tag Usage

The tag `source/ingested` appears on all processed notes AND all index files. However, `source/statistical-rethinking` is used as a book-source tag on only 2 notes:
- `Social Network Models.md`
- `Missing Data - Statistical Rethinking.md`

Other Statistical Rethinking notes (Golem of Prague, Garden of Forking Data, Linear Models, Spurious Association, Monsters and Mixtures) do NOT have `source/statistical-rethinking`. This is inconsistent.

### 5.5 `clippings` Tag (Unnamespaced)

All Clippings and raw files use the tag `clippings` (quoted as `"clippings"` in YAML). This does not follow the `namespace/tag` convention used elsewhere. It should arguably be `type/clipping` or `source/clipping`.

### 5.6 Inline Tags from Raw Content

The grep results show many inline tags that appear to be HTML anchor IDs from web clippings rather than intentional Obsidian tags:
- `#id1` through `#id72`
- `#pymc` (20 occurrences -- legitimate, but only as inline anchors in raw content)
- `#mediation_analysis`, `#structural-equation-modelling-sem`, `#ordinal-regression`, etc.
- `#FF0000` (a color hex code)
- `#Events`, `#gp-meansandcovs`, `#conditional_autoregressive_priors`

These are not part of the deliberate tag taxonomy and add noise to the tag graph.

---

## 6. Index File Issues

### 6.1 Missing Clippings Index

The `Clippings/` folder has **no `_Index.md` file**. The `_Vault_Index.md` links to `[[Clippings/_Index|Clippings]]`, which is a **broken link**. This is the only broken structural link in the vault navigation hierarchy.

### 6.2 _Vault_Index.md: Topic Map Has Broken Links

The Topic Map in `_Vault_Index.md` references several notes that do not exist:
- `[[Hierarchical Models]]` -- exists (correct)
- `[[MCMC Basics|MCMC]]` -- exists (correct)
- But the overall structure links to 4 topic categories that each contain some broken links from Section 4.1 above.

### 6.3 _Vault_Index.md: Stale `date_updated`

The vault index shows `date_updated: 2026-04-08` but content was ingested on 2026-04-09. The date is one day stale.

### 6.4 Research Methodology/_Index.md: Stale `date_updated`

`Research Methodology/_Index.md` has `date_updated: 2026-04-08` but notes were added to this section on 2026-04-09 (e.g., via the PyMC ingestion batch).

### 6.5 Index Files Missing `concept_count` Field

The skill template specifies a `concept_count` field for index files. No index file in the vault has this field.

### 6.6 Research/_Index.md: Comprehensive but Could List Raw Sources More Systematically

The Research index lists 16 sources but mixes the format between PDF references and markdown raw references. The sources list is complete and well-maintained.

### 6.7 Econometrics/_Index.md: Missing Bayesian DiD from Sub-topics

The Identification Strategies sub-topic listing in the Econometrics index does not mention `Bayesian Difference in Differences.md`, which was added on 2026-04-09. The sub-index `Identification Strategies/_Index.md` may or may not list it.

### 6.8 Identification Strategies/_Index.md: Check for Bayesian DiD

This index should be checked to confirm it lists the `Bayesian Difference in Differences` note added on 2026-04-09.

---

## 7. Summary of Issues by Severity

### Critical (Broken Navigation)

| # | Issue | Impact |
|---|-------|--------|
| 1 | Missing `Clippings/_Index.md` | Broken vault navigation; `_Vault_Index.md` links to non-existent file |
| 2 | ~200+ broken wikilinks to non-existent notes | Significant link graph fragmentation |

### High (Frontmatter Gaps)

| # | Issue | Affected Notes |
|---|-------|---------------|
| 3 | No `depends_on`/`used_by` fields anywhere | All ~73 processed notes |
| 4 | No `doc_type`/`source_location` fields anywhere | All ~73 processed notes |
| 5 | 10 notes missing `source` field | All 2026-04-09 PyMC batch notes |
| 6 | 10 notes missing `folder` field | All 2026-04-09 PyMC batch notes |

### Medium (Consistency)

| # | Issue | Impact |
|---|-------|--------|
| 7 | `Bayes Theorem` vs `Bayes' Theorem` inconsistency | 42 broken links split between two spellings |
| 8 | BDA3 section/chapter links use non-existent naming scheme | ~50+ orphan links |
| 9 | `source/statistical-rethinking` tag used on only 2 of ~7 SR notes | Tag inconsistency |
| 10 | `clippings` tag not namespaced | Tag taxonomy violation |
| 11 | Escaped pipe characters in wikilinks | ~15+ instances |
| 12 | Empty `author`/`published` in Clippings frontmatter | 11 of 13 Clippings |
| 13 | Missing `type/` tags on most processed notes | ~60+ notes |
| 14 | Missing `doc/` tags on all notes | All notes |

### Low (Housekeeping)

| # | Issue | Impact |
|---|-------|--------|
| 15 | Duplicate content: Clippings = Research/raw | Storage redundancy |
| 16 | Stale `date_updated` on 2 index files | Minor metadata drift |
| 17 | Missing `concept_count` on all index files | Template compliance |
| 18 | Inline HTML anchor tags polluting tag graph | Tag noise |
| 19 | 1 orphaned Clipping (DAG article) not ingested | Missing content in Research |
| 20 | Missing `authors`/`year` on 4 of 6 source overviews | Incomplete bibliographic metadata |

---

## 8. Recommendations (Not Implemented)

1. **Create `Clippings/_Index.md`** to fix the broken vault navigation link.
2. **Add `source` and `folder` fields** to the 10 PyMC-ingested notes from 2026-04-09.
3. **Resolve the BDA3 naming mismatch** -- either create redirect notes or update all `BDA3 - Chxx` / `BDA3 - S1.x` links to point to the actual descriptive note names.
4. **Standardize Bayes Theorem links** -- pick `Bayes' Theorem` or `Bayes Theorem` and either create the note or update all references.
5. **Add `depends_on`, `used_by`, `doc_type`, `source_location`** fields to all processed notes per the skill template specification.
6. **Add `type/` and `doc/` tags** to all processed notes for consistent taxonomy.
7. **Fix `source/statistical-rethinking` tag** inconsistency across all Statistical Rethinking notes.
8. **Process the orphaned DAG clipping** into the Research hierarchy.
9. **Namespace the `clippings` tag** to `type/clipping` or `source/clipping`.
10. **Fix escaped pipe characters** in wikilinks (`\|` to `|`).
