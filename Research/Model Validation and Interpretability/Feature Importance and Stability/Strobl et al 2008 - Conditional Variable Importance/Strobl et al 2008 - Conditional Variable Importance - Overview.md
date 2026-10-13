---
title: "Strobl et al 2008 - Conditional Variable Importance - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/overview
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl, Boulesteix, Kneib, Augustin & Zeileis (2008), BMC Bioinformatics 9:307 (open-access text saved as markdown, no page numbers; cited by section): §1 Background, §2 Methods (§2.1-2.5, Eq. 1, Table 1, Figs 1-2), §3 Results (Fig. 3), §4 Example (Fig. 4), §5 Discussion and conclusion"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]"
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
  - "[[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]"
aliases:
  - Conditional Variable Importance
  - Conditional Variable Importance for Random Forests
  - Strobl 2008 Conditional Importance
  - Strobl et al 2008
---

# Strobl et al 2008 - Conditional Variable Importance - Overview

> [!summary]
> Strobl, Boulesteix, Kneib, Augustin & Zeileis (2008) ask why random-forest **permutation importance overstates correlated predictors**, and propose a fix. Two mechanisms are at work. (1) Greedy split selection lets a predictor that is merely *correlated* with an influential one win early splits, especially when `mtry` is small. (2) The standard permutation scheme permutes $X_j$ against both $Y$ **and** the other predictors $Z$, so it tests the null $X_j \perp (Y, Z)$. A positive score can therefore come from $X_j$ being correlated with $Z$, not only from $X_j$ predicting $Y$. The fix is the **conditional permutation importance**: within each tree, permute $X_j$ only inside the cells of a grid built from that tree's own cutpoints in the conditioning variables $Z$. This targets the null $(X_j \perp Y)\mid Z$. In a 12-variable linear simulation (500 replications), the conditional scores track the true coefficient pattern much better, with lower variance. In peptide-binding data (n = 310, 104 correlated predictors), conditioning reorders mid-ranked predictors. The paper also states that conditioning cannot *entirely* remove the preference for correlated predictors.
^summary-strobl2008

## Overview

### Research question and contribution

- **Question.** Why do random-forest importance scores prefer correlated predictors? This preference had been reported by Archer & Kimes and by Nicodemus & Shugart. And how should correlated and uncorrelated predictors be compared fairly (§1, last three paragraphs)?
- **Contribution 1: diagnosis.** It separates a *split-selection* effect ([[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]) from a *permutation-scheme* effect ([[Strobl 2008 - Permutation Importance Null Hypotheses]]).
- **Contribution 2: method.** It introduces a conditional permutation scheme whose conditioning grid comes from the fitted tree's own partition. This makes it workable for predictors of any scale ([[Conditional Permutation Importance (Strobl 2008 Algorithm)]]).
- **Contribution 3: evidence.** A simulation ([[Strobl 2008 - Simulation Results for Conditional Importance]]) and an application ([[Strobl 2008 - Peptide-Binding Application]]).

## Main Content

### Key findings

1. In the first split of each tree, predictors correlated with influential ones are chosen as often as the influential predictors themselves when `mtry = 1`. Across all splits most of that advantage disappears, but some remains (§2.2, Fig. 1).
2. The original permutation importance answers the wrong question. Its implied null, $X_j \perp Y, Z$, is violated whenever $X_j$ is correlated with other predictors (§2.4).
3. With conditional permutation, correlated variables that have the same coefficient as uncorrelated ones move much closer to them (Fig. 3 readings are digitized, not printed values). The text says "almost equal"; the digitized Fig. 3 medians are 16/20/31 vs 9/13/16 at `mtry` = 1/3/8, against marginal 29/50/70. Correlated variables with small or zero coefficients drop (§3, Fig. 3). Some overestimation of correlated variables with small or zero coefficients remains.
4. Within each `mtry` level, conditional importance has **lower variance** than marginal importance (§3).
5. The bias is worst for small `mtry`, while the importance becomes more variable as `mtry` grows (§3). The default $\sqrt{p}$ should not be accepted without checking when predictors are correlated (§5).
6. In the application, "h2y8" and "flex8" rank above "pol3" marginally (ranks 8, 9, 11). Conditionally, "pol3" ranks above both (ranks 7, 8, 9 for pol3, flex8, h2y8) (§4, Fig. 4).

### Source Map

| Source section / item | Content | Note |
|---|---|---|
| §1 Background | RF importance in genomics; marginal vs conditional effect; hospital complication-mortality example; PDPs, Gini bias, significance tests, backward elimination, Archer & Kimes, Nicodemus & Shugart; CARTscans | [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]] |
| §1 final paragraph (paper roadmap) | Section 2: how tree ensembles are built, a simulation showing why correlated predictors are overselected, a review of the original permutation importance, and the new conditional permutation scheme. Section 3: simulation results. Section 4: peptide-binding application | this note (rows below follow the same order) |
| §2 Methods (intro) | Bagging and random forests; Bühlmann & Yu smoothing; random split-variable restriction lets "outplayed" variables enter, revealing interactions and working "towards the global optimality of the ensemble"; recursive local split search is conditional only on the current branch | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] |
| §2.1 Simulation design, **Table 1** | 12-predictor linear model, block correlation 0.9 among $X_1$–$X_4$, coefficients (5, 5, 2, 0, −5, −5, −2, 0, 0, …, 0); `cforest` with varying `mtry` | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] |
| §2.1 final sentences | Why `mtry` is varied (to probe Nicodemus & Shugart's findings); defaults otherwise | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] |
| §2.2 Illustration of variable selection, **Figure 1** | Selection rates in first splits vs all splits, by `mtry` (text findings) | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] |
| **Figure 1** values (`mtry` = 1, 3, 8; 12 variables × 2 panels) | Digitized selection rates | [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] |
| §2.3 The permutation importance, **Eq. 1** | OOB tree-wise and forest-level permutation importance; raw vs scaled (z-score) | [[Strobl 2008 - Permutation Importance Null Hypotheses]] |
| **Figure 2** layout (marginal vs within-$Z$ permutation tables) | Transcribed | [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] |
| §2.4 Types of independence, **Figure 2**, $H_0$ displays | Permutation-test view; marginal null $X_j \perp Y, Z$; conditional null $(X_j \perp Y)\mid Z$; factorizations | [[Strobl 2008 - Permutation Importance Null Hypotheses]] |
| §2.5 A new, conditional permutation scheme (4-step algorithm) | Grid from tree cutpoints, applied as bisectors of the whole space; choice of $Z$ (all variables / correlation threshold / conditional-inference $p$-values / user choice); complexity bounded by tree depth | [[Conditional Permutation Importance (Strobl 2008 Algorithm)]] |
| §3 Results, **Figure 3** | Median and IQR over 500 replications, marginal vs conditional, $Z$ = variables with $r \ge .2$ | [[Strobl 2008 - Simulation Results for Conditional Importance]] |
| **Figure 3** values (medians and IQRs, 12 variables × 2 schemes × 3 `mtry`) | Digitized; text-vs-figure discrepancy on "almost equal" | [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] |
| §4 Example, **Figure 4** | Peptide-binding data, n = 310, 104 predictors, 1000 trees, `mtry = 104` (bagging); h2y8 / flex8 / pol3 reranking; pol8 | [[Strobl 2008 - Peptide-Binding Application]] |
| **Figure 4** values | Digitized bar heights; 5 / 2 off-scale bars; top-variable identities not recoverable; other `mtry` fits unreported | [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] |
| §5 Discussion and conclusion | Conditional scheme fairer but not bias-free; consider several `mtry`; enough trees for seed stability; party release | [[Strobl 2008 - Discussion, mtry Guidance and Limitations]] |
| Authors' contributions, Acknowledgements | Division of labour; thanks to T. Hothorn | [[Strobl 2008 - Discussion, mtry Guidance and Limitations]] |
| References (36; empty in the raw markdown) | Key numbered references resolved from the published list | this note, § Reference key |

All four display equations, the four-step algorithm, Table 1 and Figures 1-4 are captured in the notes listed above. The raw markdown has image links only for the figures. Their contents were digitized from the published images, which are saved in `raw/` as [[raw/Strobl et al 2008 - Figure 1 Selection Rates.jpg]], [[raw/Strobl et al 2008 - Figure 2 Permutation Schemes.jpg]], [[raw/Strobl et al 2008 - Figure 3 Permutation Importance.jpg]] and [[raw/Strobl et al 2008 - Figure 4 Peptide Binding.jpg]].

#### Pass-3 checklist (gap fill)

- [x] §1 para. 2: Xia & Li motivation and the forward pointer to correlated predictors → Background note and Peptide note
- [x] §1 para. 7: Féraud & Clérot [12], related to partial dependence → Background note
- [x] §1 para. 8: the "mimic the absence of the variable" rationale → Background note `^def-perm-rationale`
- [x] §2 intro: empirical studies [23-26] → Selection note
- [x] §2.1 final sentences: reason for varying `mtry` → Selection note
- [x] §2.3: raw vs z-score citation [16,17] corrected → Null Hypotheses note
- [x] §2.5 para. 3: parsimony vs the full factorial approach → Algorithm note, requirement (ii)
- [x] Figs 1, 3, 4 numeric content and `mtry` grid {1, 3, 8} → Digitized Figure Data note
- [x] Simulation summary table: inferred cells marked → Simulation Results note
- [x] §1 final para.: roadmap → Source Map first row (this note)
- [x] §1 para. 9: Diaz-Uriarte backward elimination assessment ("reasonable selection of genes") and permuted-response baseline plots → Background note
- [x] §2 intro para. 2: "global optimality of the ensemble" → Selection note
- [x] §2.4 para. 4: aim stated in the paper's terms ("under a given correlation structure … determined by our data set") → Null Hypotheses note `^def-cpi-aim`
- [x] §2.5 para. 2: "any partition derived from a classification tree" can define the grid; unbiased conditional inference trees [31] used → Algorithm note
- [x] §2.5 algorithm: editorial assumptions (OOB-only within-cell shuffling, regression variant) split out of the formal callout and labelled → Algorithm note
- [x] §2.5 para. 5 + §4: conditioning rule in the application (Pearson threshold, value unreported) → Peptide note and Algorithm note $Z$ table
- [x] Figure 3: caption says dashed vs solid, image shows both dashed (colour distinguishes schemes) → Digitized Figure Data note and Simulation Results note
- [ ] Not recoverable from the source: the correlation threshold used for $Z$ in §4, names of the unlabelled top-ranked peptide predictors, the smaller `mtry` values run in §4, and $n$ per simulated data set

### Reference key

The raw markdown's reference list is empty. These are the numbered references, resolved from the published list (PMC2491635; checked against it during verification).

| No. | Reference | Used for |
|---|---|---|
| [1] | Breiman (2001), Random Forests, *Machine Learning* 45 | Random forests; Eq. 1 |
| [2]–[5] | Lunetta et al. (2004, *BMC Genetics* 5); Bureau et al. (2005, *Genet. Epidemiol.* 28); Huang et al. (2005, *BMC Bioinformatics* 6); Qi, Bar-Joseph & Klein-Seetharaman (2006, *Proteins* 63) | RF importance in SNP screening, gene expression and protein-interaction applications (§1 para. 1); [2] also the interaction-detection finding |
| [6] | van der Laan (2006), Statistical inference for variable importance, *Int. J. Biostatistics* | Assumptions for causal reading of importance |
| [7] | Segal, Cummings & Hubbard (2001), *Biometrics* 57 | Peptide-binding data; pol8 |
| [8] | Xia & Li (1998), What amino acid properties affect protein evolution?, *J. Mol. Evol.* 47 | Motivation; pol8 polarity |
| [9] | Silber & Rosenbaum (1998), "A spurious correlation between hospital mortality and complication rates", *J. Urology* 160 | Hospital spurious correlation |
| [10] | Stigler (2005), Correlation and causation: a comment | Historical spurious-correlation example |
| [11] | Breiman (2001), Statistical Modeling: The Two Cultures | Partial dependence plots |
| [12] | Féraud & Clérot (2002), A methodology to explain neural network classification | Related approach to PDPs |
| [13] | Strobl, Boulesteix, Zeileis & Hothorn (2007), *BMC Bioinformatics* 8:25 | Gini bias; subsampling without replacement |
| [14] | Strobl, Boulesteix & Augustin (2007), Unbiased split selection … Gini index, *CSDA* 52 | Gini gain is a biased estimator |
| [15] | Breiman & Cutler, Random Forests classification manual | Simple significance test |
| [16] | Strobl & Zeileis (2008), Danger: High Power! (COMPSTAT) | Poor properties of that test; prefer raw over scaled importance |
| [17] | Diaz-Uriarte & Alvarez de Andrés (2006), *BMC Bioinformatics* 7:3 | Backward elimination; prefer raw importance |
| [18] | Diaz-Uriarte (2007), GeneSrF and varSelRF | R package |
| [19] | Rodenburg et al. (2008), *Physiological Genomics* 33 | Similar selection approach |
| [20] | Archer & Kimes (2008), *CSDA* 52 | Correlated-predictor simulation; covariance design |
| [21] | Nicodemus & Shugart (2007), IGES abstract | Permutation importance depends on `mtry` |
| [22] | Nason, Emerson & LeBlanc (2004), CARTscans, *JCGS* 13 | Conditional influence plots; full-factorial grid |
| [23]–[26] | Breiman (1996) Bagging; Breiman (1998) Arcing; Bauer & Kohavi (1999); Dietterich (2000) | Empirical support for bagging |
| [27] | Bühlmann & Yu (2002), Analyzing bagging, *Ann. Statist.* 30 | Smoothing explanation |
| [28] | Breiman, Friedman, Olshen & Stone (1984), CART | Gini gain splitting |
| [29] | Hastie, Tibshirani & Friedman (2001), *The Elements of Statistical Learning* | Illustrations of tree partitions (§2 para. 3) |
| [30], [31] | Hothorn, Hornik & Zeileis: `party` package; Unbiased recursive partitioning (2006) | `cforest`; conditional-inference $p$-values |
| [32] | R Development Core Team (2008), R | Computing environment |
| [33] | van Os & Meulman (2005), Globally optimal tree models | Global optimality limited to low dimensions |
| [34] | Good (2005), Permutation, Parametric, and Bootstrap Tests | Permutation-test framework |
| [35] | Lin & Jeon (2006), Random forests and adaptive nearest neighbors, *JASA* 101 | Limiting tree depth |
| [36] | Svetnik et al. (2003), *J. Chem. Inf. Comput. Sci.* 43 | $\sqrt p$ default often optimal |

### Reading order

1. [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]]: why the distinction matters.
2. [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]: mechanism 1 (split selection) and the simulation design.
3. [[Strobl 2008 - Permutation Importance Null Hypotheses]]: mechanism 2 (the permutation null).
4. [[Conditional Permutation Importance (Strobl 2008 Algorithm)]]: the fix.
5. [[Strobl 2008 - Simulation Results for Conditional Importance]] and [[Strobl 2008 - Peptide-Binding Application]]: the evidence.
6. [[Strobl 2008 - Discussion, mtry Guidance and Limitations]]: caveats and later developments.

## Examples

### Why this matters for marketing analytics

Marketing driver models are full of correlated inputs. TV and online-video spend are often flighted together, price and promotion depth move together, and brand search tracks overall awareness. When a tree ensemble is fit to weekly media data with 52-156 rows and ranked by permutation importance, a channel that only *co-moves* with an effective one can look important. Small `mtry` makes this worse. The conditional score asks a narrower question: given the channels it moves with, does this one add predictive information? That question is closer to what a budget decision needs. It is still not a causal effect; see [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] and [[Dillon et al - SHAP and Causal Insights - Overview]].

## Connections

- **Predecessor.** [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] covers the bias from scale of measurement and number of categories. That earlier work is why this paper uses `cforest` grown on subsamples.
- **Critiques and successors.** [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] argues that marginal permutation forces the model to extrapolate off the data manifold, and treats conditional permutation as one remedy. [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] formalizes model reliance, including a conditional version. [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] shows the same interventional-vs-conditional choice inside SHAP.
- **Stability.** [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] takes a different route to reliable variable selection.
- **Causal reading.** [[Conditional Independence Assumption]], [[Spurious Association and Confounds]] and [[Omitted Variables Bias]] cover the regression version of "marginal vs conditional".

## See Also

- [[Dillon et al - SHAP and Causal Insights - Overview]]: why neither importance flavour is a causal effect.
- [[Permutation Tests and Exact Inference]]: background on permutation tests.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: the algorithmic-modeling culture that made RF importance popular.
- [[Model Reliance, Causal Effects and Conditional Model Reliance]] — CMR is the model-agnostic counterpart of conditional permutation importance
- [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] — same conditional-vs-marginal dilemma in Shapley form
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — Breiman's permutation importance and the surrogate case
