# Frontmatter Repair Audit Report

**Scope**: `Research/Bayesian Statistics/Inference Fundamentals/` (9 files)
**Date**: 2026-04-09

## Summary of Changes

All 9 files in the folder were missing `depends_on`, `used_by`, `doc_type`, and `source_location` frontmatter fields. The `type/chapter-notes` tag was also missing from 8 of 9 files (all except `_Index.md` which already had `type/index`). Body content was preserved unchanged in all files.

## Per-File Changes

### 1. Probability and Bayesian Inference.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 1, pp. 1-31` |
| `depends_on` | missing | `[[raw/BDA3.pdf]]` |
| `used_by` | missing | `[[Single-Parameter Models]]`, `[[Multiparameter Models]]`, `[[Hierarchical Models]]`, `[[Garden of Forking Data]]`, `[[Statistical Rethinking - The Golem of Prague]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 2. Single-Parameter Models.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 2, pp. 33-61` |
| `depends_on` | missing | `[[Probability and Bayesian Inference]]`, `[[raw/BDA3.pdf]]` |
| `used_by` | missing | `[[Multiparameter Models]]`, `[[Hierarchical Models]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 3. Multiparameter Models.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 3, pp. 63-91` |
| `depends_on` | missing | `[[Single-Parameter Models]]`, `[[Probability and Bayesian Inference]]`, `[[raw/BDA3.pdf]]` |
| `used_by` | missing | `[[Asymptotics and Frequentist Connections]]`, `[[Bayesian Linear Regression]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 4. Asymptotics and Frequentist Connections.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 4, pp. 93-113` |
| `depends_on` | missing | `[[Multiparameter Models]]`, `[[Single-Parameter Models]]`, `[[raw/BDA3.pdf]]` |
| `used_by` | missing | `[[Approximation Methods]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 5. Hierarchical Models.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 5, pp. 115-137` |
| `depends_on` | missing | `[[Single-Parameter Models]]`, `[[Multiparameter Models]]`, `[[Probability and Bayesian Inference]]`, `[[raw/BDA3.pdf]]` |
| `used_by` | missing | `[[Hierarchical Linear Models]]`, `[[Bayesian Workflow - Overview]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 6. Statistical Rethinking - The Golem of Prague.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 1, pp. 1-19` |
| `depends_on` | missing | `[[raw/StatRethink-Bayes.pdf]]` |
| `used_by` | missing | `[[Garden of Forking Data]]`, `[[Statistical Rethinking - Overview]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 7. Garden of Forking Data.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 2, pp. 21-51` |
| `depends_on` | missing | `[[Statistical Rethinking - The Golem of Prague]]`, `[[Probability and Bayesian Inference]]`, `[[raw/StatRethink-Bayes.pdf]]` |
| `used_by` | missing | `[[Posterior Sampling and Summarization]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 8. Posterior Sampling and Summarization.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `chapter-notes` |
| `source_location` | missing | `Chapter 3, pp. 53-79` |
| `depends_on` | missing | `[[Garden of Forking Data]]`, `[[Probability and Bayesian Inference]]`, `[[raw/StatRethink-Bayes.pdf]]` |
| `used_by` | missing | `[[Model Checking]]`, `[[Decision Analysis]]`, `[[Bayesian Workflow - Overview]]` |
| tags | no `type/` tag | added `type/chapter-notes` |

### 9. _Index.md
| Field | Before | After |
|-------|--------|-------|
| `doc_type` | missing | `index` |
| `source_location` | missing | `BDA3 Part I (Chs 1-5); Statistical Rethinking Chs 1-3` |
| `depends_on` | missing | `[[raw/BDA3.pdf]]`, `[[raw/StatRethink-Bayes.pdf]]` |
| `used_by` | missing | `[[Bayesian Statistics/_Index]]` |
| tags | missing `topic/` tag | added `topic/bayesian-statistics` |

## Tag Standardization

All notes already used a consistent tag taxonomy (`source/ingested`, `topic/*`). The only standardization needed was adding the `type/*` tag to classify each note's document type:
- 8 chapter-notes files received `type/chapter-notes`
- 1 index file already had `type/index`; also received `topic/bayesian-statistics` for consistency

## Fields Added (All Files)

| Field | Purpose | Notes |
|-------|---------|-------|
| `doc_type` | Classifies the note type | `chapter-notes` or `index` |
| `source_location` | Pinpoints location within source PDF | Chapter number and page range |
| `depends_on` | Lists conceptual prerequisites (wikilinks) | Derived from "See Also" and content analysis |
| `used_by` | Lists notes that build on this one | Inverse of depends_on relationships |

## Body Content

No body content was modified in any file. All changes were confined to YAML frontmatter.
