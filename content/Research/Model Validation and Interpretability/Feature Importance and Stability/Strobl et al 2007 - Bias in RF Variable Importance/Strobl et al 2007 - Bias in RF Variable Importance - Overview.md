---
title: "Strobl et al 2007 - Bias in RF Variable Importance - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/overview
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), 'Bias in random forest variable importance measures: Illustrations, sources and a solution', BMC Bioinformatics 8:25 (open access; full text saved as markdown from Europe PMC PMC1796903 — no page numbers, cited by section). All sections: Background; Methods; Results and discussion (null case, power case, C-to-U application, sources of bias: tree selection bias, bootstrapping); Conclusion; Authors' contributions; Supplementary material; Tables 1-5; Figures 1-11"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Honest Trees and Causal Forests]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Strobl et al 2008 - Conditional Variable Importance - Overview]]"
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
aliases:
  - Strobl et al 2007
  - Bias in Random Forest Variable Importance
  - Bias in random forest variable importance measures
  - cforest Paper
---

# Strobl et al 2007 - Bias in RF Variable Importance - Overview

> [!summary]
> **Question.** Can random-forest variable importance be trusted for *variable selection* when predictors differ in **scale of measurement** or **number of categories**? **Answer.** Not with Breiman's original forest. In a simulation with one continuous and four categorical predictors (2-20 levels), $n=120$ and 1000 runs, **selection frequency** and especially **Gini importance** prefer many-category and continuous *noise* variables, and **permutation importance**, though unbiased in mean, has a **variance that grows with cardinality**, so noise can outrank the true driver in a single run. Two causes: **split-selection bias** in CART trees (best-of-many-cutpoints = hidden multiple testing) and **bootstrap-induced association** (resampling with replacement makes independent variables look associated, more so with more categories, at any $n$). **Solution:** `cforest` — a forest of unbiased **conditional inference trees** — grown on **subsamples without replacement**; it raises the correct-identification rate (e.g. 0.413 → 0.729 at relevance 0.1) and slightly improves accuracy.

## Overview

**Contribution.** (1) *Illustrations*: a clean simulation showing cardinality-driven artefacts in all three standard RF importance measures. (2) *Sources*: two separable mechanisms, each demonstrated with a stripped-down experiment (single trees, Fig. 10; $\chi^2$ tests on bootstrap samples, Fig. 11). (3) *A solution*: unbiased trees plus subsampling, validated in simulation and on a real RNA-editing data set. The paper's subtitle names exactly these three parts.

**Why it matters for model validation.** Importance charts are routinely used to justify decisions ("these are the drivers"). This paper shows that an importance score can reflect how a variable is *coded* rather than how it relates to the outcome, and that the default pipeline (CART trees, bootstrap, Gini importance) is the worst case. The same defaults survive in many gradient-boosting "gain" importances.

**Key numbers.**

| Quantity | Default `randomForest` (bootstrap) | `cforest` (subsampling) | Source |
|---|---|---|---|
| Correct identification of $X_2$, unscaled PI, relevance 0.05 / 0.1 / 0.2 | 0.194 / 0.413 / 0.928 | 0.370 / 0.729 / 0.994 | Table 3 |
| Mean test misclassification, relevance 0.2 | 0.4028 | 0.3384 | Table 4 |
| C-to-U data mean misclassification (100 splits) | 0.2896 | 0.2788 | Table 5 |
| C-to-U run time | 0.24 s | 4.82 s | Conclusion |

## Main Content

### Note Set

| Note | What it holds |
|---|---|
| [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] | Background/motivation; random forest; definitions of selection frequency, Gini importance, permutation importance (scaled/unscaled); `ctree`/`cforest`; bootstrap vs 0.632 subsampling |
| [[Strobl 2007 - Null and Power Case Simulation Design]] | Tables 1-2, ADEMP reading, protocol, effect sizes |
| [[Strobl 2007 - Null and Power Case Results]] | Figs 1-8, Tables 3-4, Monte Carlo SE checks |
| [[Strobl 2007 - Split-Selection Bias in CART Trees]] | Mechanism 1, propagation to all measures, Fig. 10, root-split reproduction |
| [[Strobl 2007 - Bootstrap-Induced Association]] | Mechanism 2, Fig. 11, Bickel & Ren, proof sketch, reproduction at $n=120$ and $1200$ |
| [[Strobl 2007 - C-to-U RNA Editing Application]] | Data, Fig. 9, Table 5, seed advice, timings |
| [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] | Scope statement, recommendations checklist, cost, future work, limitations, metadata |

### Source Map

| Source section / element | Content | Note |
|---|---|---|
| Background (10 paras: 1-3 motivation, 4-6 applications survey, 7 scope claim, 8-10 roadmap) | small-$n$/large-$p$; SNP-SNP, microarray, sequence-to-phenotype, protein-interaction and other applications; scope claim; roadmap (simulations, two sources, cforest + C-to-U re-analysis) — paragraph-by-paragraph table | [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] |
| Methods intro | RF as ensemble of unpruned trees on bootstrap samples, `mtry`, interpretability problem | [[Strobl 2007 - RF Importance Measures and the cforest Alternative#^def-random-forest]] |
| Methods §Random forest variable importance measures | selection frequency, Gini importance, permutation importance; advantage over univariate screening | [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] |
| Methods §Simulation studies paras 1-4 | `randomForest` vs `cforest`; bootstrap vs 0.632 subsampling; subagging; Politis–Romano–Wolf | [[Strobl 2007 - RF Importance Measures and the cforest Alternative#^def-resampling-schemes]] |
| Methods §Simulation studies paras 5-7; Table 1; Table 2 | predictor and response distributions; null and power case success criteria (incl. "even more so with increasing degree of dependence"); $n=120$ | [[Strobl 2007 - Null and Power Case Simulation Design]], [[Strobl 2007 - Null and Power Case Simulation Design#^def-success-criteria]] |
| Results and discussion (intro) | headline: all `randomForest` measures unreliable, Gini worst | [[Strobl 2007 - Null and Power Case Results]] |
| §Null case — Fig. 1 | selection frequency | [[Strobl 2007 - Null and Power Case Results#^res-null-selfreq]] |
| §Null case — Fig. 2 | Gini importance | [[Strobl 2007 - Null and Power Case Results#^res-null-gini]] |
| §Null case — Figs 3, 4 | unscaled/scaled permutation importance; scaled depends on number of trees | [[Strobl 2007 - Null and Power Case Results#^res-null-perm]] |
| §Power case — Fig. 5 | selection frequency | [[Strobl 2007 - Null and Power Case Results#^res-power-selfreq]] |
| §Power case — Fig. 6 | Gini importance | [[Strobl 2007 - Null and Power Case Results#^res-power-gini]] |
| §Power case — Figs 7, 8 | unscaled/scaled permutation importance | [[Strobl 2007 - Null and Power Case Results#^res-power-perm]] |
| §Power case — Table 3 | correct-identification rates, 8 rows (scaled/unscaled × 2 methods × 2 resampling schemes) × 4 relevance levels = 32 cells; monotone rise with relevance | [[Strobl 2007 - Null and Power Case Results#^tab-3]] |
| §Power case — paras before Table 4; Table 4 | many-category noise "fools" `randomForest`; `cforest` "can also be superior" in accuracy; mean misclassification rates with SEs | [[Strobl 2007 - Null and Power Case Results#^tab-4]] |
| §Application to C-to-U conversion data — para. 1 and data list | Cummings & Myers' three species (*A. thaliana*, *B. napus*, *O. sativa*); only *Arabidopsis* re-analysed; 876 obs, 43 predictors | [[Strobl 2007 - C-to-U RNA Editing Application#^def-ctou-data]] |
| §Application — Fig. 9 | scaled permutation importance, four methods | [[Strobl 2007 - C-to-U RNA Editing Application#^fig-9]] |
| §Application — seed stability advice | repeat with several seeds | [[Strobl 2007 - C-to-U RNA Editing Application]] |
| §Application — Table 5 | 100 × 2:1 split misclassification | [[Strobl 2007 - C-to-U RNA Editing Application#^tab-5]] |
| §Sources of variable importance bias | two mechanisms overview | [[Strobl 2007 - Split-Selection Bias in CART Trees]] |
| §Variable selection bias in individual trees; Fig. 10 | cutpoint multiple testing; `ctree` $p$-value selection; propagation to PI variance | [[Strobl 2007 - Split-Selection Bias in CART Trees#^thm-cutpoint-bias]], [[Strobl 2007 - Split-Selection Bias in CART Trees#^fig-10]] |
| §Effects induced by bootstrapping; Fig. 11 | $\chi^2$ $p$-value shift; cell counts; $n$-invariance; Bickel & Ren; relative size of mechanisms | [[Strobl 2007 - Bootstrap-Induced Association]] |
| Conclusion | paras 1-2 (RF reach and the two reasons for its popularity); principle, scope, recommendations, computation time, van der Laan future work | [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] |
| Authors' contributions; Additional file 1; Acknowledgements | roles, R code supplement, funding, thanks (Augustin, Leisch, Tutz, Bühlmann, referees); contributor information | [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] |

No theorems or proofs in the formal sense: the paper's "results" are simulation findings and mechanism arguments, captured as `[!theorem]`-style callouts with block IDs.

## Examples

> [!example] Example: what the paper predicts for a typical marketing driver chart ^ex-driver-chart
> **Setup.** A tree ensemble ranks drivers of a weekly KPI using continuous spend columns, a binary holiday flag, a 4-level promotion type and a 20-level region code, with default CART trees, bootstrap resampling and Gini ("gain") importance.
>
> **Prediction from the paper.** Gini importance will favour the 20-level code and the continuous spend columns even if they carry no signal (Results N2/P2), and the binary flag will be disadvantaged even if it is the true driver. Permutation importance removes the mean bias but its spread still grows with cardinality, so in a single run the region code can outrank the flag (Result P3; at an effect size like relevance 0.1, default `randomForest` ranks the true binary driver first in only 41.3% of runs, Table 3).
>
> **Remedy.** Unbiased (conditional inference) trees, subsampling without replacement, permutation importance repeated over several seeds ([[Strobl 2007 - Conclusions, Scope and Practical Guidance#^alg-checklist]]), plus a placebo run of the same pipeline ([[Strobl 2007 - Null and Power Case Simulation Design#^ex-placebo-design]]).

## Connections

- **Multiplicity inside the algorithm** — [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Multiple Testing Corrections]], [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].
- **Simulation as validation** — [[Designing Simulated-Data Experiments]], [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- **Tree and forest inference** — [[Honest Trees and Causal Forests]], [[Asymptotic Normality and Inference for Forests]].
- **Other sources in this cluster** — [[Strobl et al 2008 - Conditional Variable Importance - Overview]] (correlated predictors), [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] (extrapolation), [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] (Rashomon set), [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] (subsampling-based selection), [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] (what importance should mean).

## See Also
- [[Research/Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance/_Index|Index: Strobl et al 2007 - Bias in RF Variable Importance]]
- [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] — the practitioner checklist
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — the follow-up paper
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — original random-forest permutation importance
