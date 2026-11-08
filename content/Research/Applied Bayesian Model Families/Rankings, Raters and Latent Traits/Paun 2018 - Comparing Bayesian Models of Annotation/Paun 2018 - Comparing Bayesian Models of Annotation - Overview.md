---
title: "Paun 2018 - Comparing Bayesian Models of Annotation - Overview"
tags:
  - source/ingested
  - topic/latent-traits
  - type/overview
  - doc/paper
source: "[[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]"
source_location: "Full paper, TACL 6:571-585, pp. 1-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Paun 2018 - Comparing Bayesian Models of Annotation"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[Monsters and Mixtures]]"
used_by:
  - "[[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]]"
  - "[[Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)]]"
aliases:
  - Comparing Bayesian models of annotation
  - Paun Carpenter annotation models
---

# Paun 2018 - Comparing Bayesian Models of Annotation - Overview

> [!summary]
> Paun et al. compare six Bayesian annotation models (pooled MULTINOM, unpooled Dawid-Skene and MACE, partially pooled HIERD&S, ITEMDIFF, LOGRNDEFF) against majority vote on four crowdsourced datasets, along four axes: agreement with gold labels, predictive density, annotator characterization and item difficulty. Models with annotator structure win; unpooled models can overfit predictively; partial pooling gives the best predictive density. This is the Dawid-Skene "truth without a gold standard" latent class model in a modern Bayesian multilevel setting.

## Overview

**Citation.** Paun, S., Carpenter, B., Chamberlain, J., Hovy, D., Kruschwitz, U. and Poesio, M. (2018), *Comparing Bayesian models of annotation*, Transactions of the ACL 6: 571-585 (CC BY 4.0).

**Question.** Majority voting assumes equal annotator expertise and agreement coefficients (Cohen's $\kappa$) have known failings. Model-based analysis estimates (1) true labels, (2) annotator accuracy/bias, (3) item difficulty. Which model structure works best and when?

**Contributions.** Six models spanning pooled, unpooled and partially pooled structure; fully Bayesian Stan implementations; evaluation on four datasets (two to four classes, sparse to dense); guidelines; technical notes on non-centered parameterization and label switching.

**Key result.** Ignoring annotator structure (MULTINOM, ITEMDIFF, majority vote) is rarely appropriate. D&S and MACE match partially pooled models against gold labels but overfit predictively; hierarchical models avoid this, except on the Phrase Detectives corpus, where a single-population hierarchical prior is a poor fit.

## Motivating PyMC examples

See <https://redam94.github.io/pymc-challenges/examples.html>: **E69** (Truth without a gold standard: latent class models for noisy raters and diagnostic tests - 7 pathologists x 118 slides; Dawid & Skene's 5 anaesthetists x 45 patients). Paun et al. supply the model zoo; the Hui-Walter diagnostic-test case is covered in [[Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)]].

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note |
| 2.1 Pooled model (MULTINOM); 2.2 Unpooled (D&S, MACE) | [[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]] |
| 2.3 Partially pooled (HIERD&S, ITEMDIFF, LOGRNDEFF) | [[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]] |
| 3 Implementation (Stan, priors, convergence) | [[Paun 2018 - Implementation Priors Label Switching and Guidelines]] |
| 4 Evaluation (datasets, Table 1, gold, lpd, annotators, difficulty) | [[Paun 2018 - Evaluation Protocol and Results Tables]] |
| 5 Results (Tables 2-9, Figs 7-9) | [[Paun 2018 - Evaluation Protocol and Results Tables]] |
| 6 Discussion: observations/guidelines, technical notes | [[Paun 2018 - Implementation Priors Label Switching and Guidelines]] |
| 7 Related work (IRT/Rasch, feature models); 8 Conclusions | [[Paun 2018 - Implementation Priors Label Switching and Guidelines]] |

## Main Content

| Model | Pooling | Annotator parameters | Item parameters |
|---|---|---|---|
| MULTINOM | full | one response vector $\zeta_k$ per class, shared | none |
| D&S | none | confusion matrix $\beta_j$ per annotator | none |
| MACE | none | credibility $\theta_j$ + spam distribution $\xi_j$ | none |
| HIERD&S | partial | $\beta_{j,k,\cdot}\sim N(\zeta_k,\Omega_k)$ | none |
| ITEMDIFF | partial | none | difficulty $\theta_i\sim N(\eta_{c_i},X_{c_i})$ |
| LOGRNDEFF | partial | $\beta_j$ hierarchical | item difficulty $\theta_i$ |

## Examples

Simulated demonstration with Python code in [[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]].

## Relevance to marketing measurement

Same structure as: multiple vendors or tools labelling conversions or incrementality (no ground truth), human raters grading creatives or LLM outputs, survey-panel quality screens (spam respondents), and latent-class "truth without a gold standard" for noisy attribution signals. Partial pooling of rater confusion matrices is the key lever when raters are many and labels sparse. See also [[Reward Modeling from Human Preferences]] (noisy preference labels).

## Connections

- Item response theory links: [[Bürkner 2021 - Bayesian IRT with brms Overview]].
- Hierarchical shrinkage: [[Hierarchical Models]]; mixture identifiability: [[Monsters and Mixtures]].

## See Also

[[Paun 2018 - Evaluation Protocol and Results Tables]]
