---
title: "Strobl 2007 - Null and Power Case Results"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - topic/simulation
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — Results and discussion (intro para.); §'Results of the null case simulation study' Figs 1-4; §'Results of the power case simulation study' Figs 5-8, Table 3 (rates of correct identification), Table 4 (mean misclassification rates)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2007 - Null and Power Case Simulation Design]]"
  - "[[Strobl 2007 - RF Importance Measures and the cforest Alternative]]"
used_by:
  - "[[Strobl 2007 - Split-Selection Bias in CART Trees]]"
  - "[[Strobl 2007 - Bootstrap-Induced Association]]"
  - "[[Strobl 2007 - Conclusions, Scope and Practical Guidance]]"
aliases:
  - Strobl 2007 Table 3 Correct Identification Rates
  - Strobl 2007 Table 4 Misclassification
  - Gini Importance Bias
  - Random Forest Importance Bias
  - Permutation Importance Variance Inflation
---

# Strobl 2007 - Null and Power Case Results

> [!summary]
> Over 1000 runs with $n=120$: with `randomForest` **all three** importance measures depend on the number of categories, and **Gini importance is the most strongly biased** — it prefers the 20-level and the continuous *noise* variables and "completely fails" to find the informative binary $X_2$. Permutation importance is centred near zero for noise variables but its **variance grows with the number of categories**, so in a single run a 10- or 20-level noise factor can outrank the true driver. Only **`cforest` with subsampling without replacement** gives equal null behaviour; it identifies $X_2$ in **72.9%** of runs at relevance 0.1 vs **41.3%** for default `randomForest` (unscaled, Table 3), and it also predicts better (Table 4).

## Overview

Results are organised by measure (selection frequency, Gini importance, unscaled and scaled permutation importance) and by case (null, power). Every figure is a 2×2 panel grid: **rows** = `randomForest` (top) vs `cforest` (bottom); **columns** = bootstrap with replacement (left) vs subsampling without replacement (right). Gini figures have only the `randomForest` row. The paper's headline (Results intro): for `randomForest` "all three variable importance measures are unreliable, and the Gini importance is most strongly biased"; for `cforest`, reliable results need subsampling without replacement — "Otherwise the measures are biased as well."

## Main Content

### Null case (no predictor informative)

> [!theorem] Result N1 — selection frequency (Fig. 1) ^res-null-selfreq
> Expected: equal mean selection frequencies for $X_1,\dots,X_5$. Observed (means over 1000 runs): frequencies "differ substantially" with `randomForest` (both columns) and with `cforest` + bootstrap; "Variables with more categories are obviously preferred." Only `cforest` + subsampling gives "equally low" frequencies for all uninformative predictors.
>
> **Figure 1** — *Results of the null case study – variable selection frequency.* Mean selection frequencies; top row `randomForest`, bottom `cforest`; left bootstrap, right subsampling.

> [!theorem] Result N2 — Gini importance (Fig. 2) ^res-null-gini
> Mean Gini importance is "biased even stronger" than selection frequency, with "a strong preference for variables with many categories and the continuous variable". Conclusion: Gini importance "cannot be used to reliably measure variable importance in this situation either."
>
> **Figure 2** — *Results of the null case study – Gini importance.* `randomForest` only; left bootstrap, right subsampling. The paper traces this bias to the Gini split criterion itself, which subsampling does not change ([[Strobl 2007 - Split-Selection Bias in CART Trees]]).

> [!theorem] Result N3 — permutation importance: unbiased mean, cardinality-dependent variance (Figs 3-4) ^res-null-perm
> - **Mean:** for every method, the permutation importances are "in mean close to zero as expected for uninformative variables" — no effect of the number of categories on the mean.
> - **Spread:** for `randomForest`, and less so for `cforest` + bootstrap, the deviation over runs is **highest for $X_5$ (20 levels)** and decreases for fewer categories and for the continuous variable. Scaling weakens but does "not substantially" alter this (Fig. 3 vs Fig. 4).
> - **Consequence** (verbatim): "In a single trial this effect may lead to a severe over- or underestimation of the variable importance of variables that have more categories as an artefact of the method, even though they are no more or less informative than the other variables."
> - Only `cforest` + subsampling shows a spread that does not "increase substantially" with the number of categories or scale.
>
> **Figure 3** — *unscaled permutation importance*, boxplots over 1000 runs, 2×2 grid. **Figure 4** — *scaled permutation importance*, same layout.

**Side finding (null case):** the scaled importance of `randomForest` depends on the number of trees (not so for `cforest`), so its magnitude should not be interpreted ([[Strobl 2007 - RF Importance Measures and the cforest Alternative#^def-permutation-importance|definition and mechanism]]).

**Null-case conclusion** (verbatim): "only the variable importance measure available in cforest, and only when used together with sampling without replacement, reliably reflects the true importance of potential predictor variables in a scenario where the potential predictor variables vary in their scale of measurement or number of categories."

### Power case (only $X_2$ informative)

Figures 5-8 show relevance $=0.2$, the strongest dependence, where every measure "should clearly prefer $X_2$".

> [!theorem] Result P1 — selection frequency (Fig. 5) ^res-power-selfreq
> With `randomForest`, mean selection frequencies again differ substantially and **$X_2$ cannot be identified**. `cforest` + bootstrap still shows bias toward many-category predictors. Only `cforest` + subsampling yields equally low frequencies for noise variables with $X_2$ standing out.
>
> **Figure 5** — *Results of the power case study – variable selection frequency*, 2×2 grid.

> [!theorem] Result P2 — Gini importance (Fig. 6) ^res-power-gini
> Strong bias toward many-category and continuous variables persists; Gini importance "completely fails to identify the relevant predictor variable", with the mean for $X_2$ "only slightly higher than in the null case".
>
> **Figure 6** — *Results of the power case study – Gini importance*, `randomForest`, left bootstrap / right subsampling.

> [!theorem] Result P3 — permutation importance (Figs 7-8) ^res-power-perm
> The mean permutation importance of $X_2$ exceeds that of the noise variables, but the spread for the noise variables $X_4$ (10 levels) and $X_5$ (20 levels) is so large "that in a single trial these uninformative variables may outperform the informative variable as an artefact of the method". The variance pattern by cardinality repeats the null case; scaling weakens it only partly.
>
> **Figure 7** — *unscaled permutation importance* (power case). **Figure 8** — *scaled permutation importance* (power case). Both 2×2 grids.

### Table 3 — rates of correct identification

**Conclusion drawn before the table (Results, power case).** Only `cforest` with sampling without replacement "is able to reliably detect the informative variable out of a set of uninformative competitors, even if the degree of dependence between $X_2$ and the response is high." The rate of correct identification "increases with the degree of dependence between $X_2$ and the response", which is the monotonicity the design demands ([[Strobl 2007 - Null and Power Case Simulation Design#^def-success-criteria]]). Every row of Table 3 rises from left to right. The paper then sums up that for assessing importance and selecting variables "it is important to use a reliable method, that is not affected by other characteristics of the predictor variables."

"Correct identification" = $X_2$ has the highest permutation importance of the five predictors in a run. Rates over 1000 runs; MCSE $se=\sqrt{r(1-r)/1000}$ (caption).

> [!theorem] Table 3 — Rates of correct identifications of the informative variable (power case) ^tab-3
>
> | Importance | Method | Replacement | rel 0.05 | 0.1 | 0.15 | 0.2 |
> |---|---|---|---|---|---|---|
> | Scaled | randomForest | true | 0.234 | 0.497 | 0.770 | 0.956 |
> | Scaled | randomForest | false | 0.237 | 0.489 | 0.760 | 0.949 |
> | Scaled | cforest | true | 0.338 | 0.672 | 0.923 | 0.991 |
> | Scaled | cforest | false | 0.365 | 0.728 | 0.943 | 0.994 |
> | Unscaled | randomForest | true | 0.194 | 0.413 | 0.701 | 0.928 |
> | Unscaled | randomForest | false | 0.186 | 0.400 | 0.710 | 0.919 |
> | Unscaled | cforest | true | 0.324 | 0.648 | 0.910 | 0.989 |
> | Unscaled | cforest | false | **0.370** | **0.729** | **0.943** | **0.994** |
>
> Reading (paper): for **every** relevance level `cforest` beats `randomForest`, and `cforest` without replacement beats `cforest` with replacement. For `randomForest`, scaling "can slightly increase" correct-identification rates because it dampens the variance differences (Figs 4, 8). For `cforest`, scaled and unscaled perform equally well.
>
> With five predictors, random guessing would give 0.2; default unscaled `randomForest` at relevance 0.05 (0.194) is at chance.

> [!example] Example: are the Table 3 gaps beyond Monte Carlo noise? ^ex-tab3-mcse
> At relevance 0.1, unscaled: $r_{\text{rF,boot}}=0.413$ with $se=\sqrt{0.413\cdot0.587/1000}=0.0156$; $r_{\text{cf,sub}}=0.729$ with $se=\sqrt{0.729\cdot0.271/1000}=0.0141$. The difference $0.316$ has (treating runs as independent) $se\approx\sqrt{0.0156^2+0.0141^2}=0.021$, i.e. about 15 standard errors. By contrast, `randomForest` with vs. without replacement ($0.413$ vs $0.400$) differs by less than one standard error — the bootstrap effect is swamped by split-selection bias in CART forests ([[Strobl 2007 - Bootstrap-Induced Association]]). (Calculations are a vault addition using the paper's MCSE formula.)

### Table 4 — mean misclassification rates

**The accuracy claim (Results, power case, paras before Table 4).** Beyond importance, `cforest`, "especially when used together with subsampling without replacement, can also be superior to the randomForest method with respect to classification accuracy in situations like that of the power case simulation study, where uninformative predictor variables with many categories 'fool' the randomForest function." Because of its "artificial preference for uninformative predictor variables with many categories", `randomForest` "can produce a higher mean misclassification rate than the cforest function". Table 4 reports these mean rates over 1000 runs, for four relevance levels, with and without replacement.

> [!theorem] Table 4 — Mean misclassification rates for the power case (MCSE in parentheses) ^tab-4
>
> | Method | Replacement | rel 0.05 | 0.1 | 0.15 | 0.2 |
> |---|---|---|---|---|---|
> | randomForest | true | 0.4945 (0.0014) | 0.4819 (0.0015) | 0.4510 (0.0016) | 0.4028 (0.0017) |
> | randomForest | false | 0.4942 (0.0014) | 0.4814 (0.0015) | 0.4496 (0.0016) | 0.4026 (0.0017) |
> | cforest | true | 0.4910 (0.0014) | 0.4660 (0.0016) | 0.4169 (0.0019) | 0.3491 (0.0019) |
> | cforest | false | **0.4879** (0.0014) | **0.4581** (0.0017) | **0.4022** (0.0019) | **0.3384** (0.0019) |
>
> Each method was evaluated on the **same simulated test set** per run, drawn from the learning-set DGP. `cforest`, especially without replacement, has the lowest error at every relevance level.

**Why importance bias costs accuracy.** Due to its "artificial preference for uninformative predictor variables with many categories", `randomForest` splits on noise that does not improve classification. The paper (verbatim): "the same mechanisms underlying the variable importance bias can also affect the classification accuracy, e.g. when suboptimal predictor variables, that do not add to the classification accuracy, are artificially preferred in variable selection merely because they have more categories." At relevance 0.2 the gap is $0.4028-0.3384=0.064$, against a Bayes error of $0.30$ (vault calculation). The paper says "a similar result is obtained" in the C-to-U application, calls the accuracy differences there "moderate", and adds that "one could think of more extreme situations that would produce even greater differences" ([[Strobl 2007 - C-to-U RNA Editing Application]]).

## Examples

> [!example] Example: a single-run ranking from a driver model ^ex-single-run-ranking
> **Setup.** A tree ensemble ranks drivers of a store-level conversion KPI. A binary "loyalty-program store" flag has a real effect comparable to relevance 0.1; a 20-level "store cluster" code has none. One model fit, one permutation-importance run.
>
> **What Table 3 implies.** With default CART forests, the true driver is ranked first in only ~40% of such runs; a noise factor with many levels frequently takes first place. The analyst sees a confident-looking ranking either way.
>
> **Remedy.** Use unbiased trees with subsampling (~73% correct at this effect size), repeat over seeds, and report the *distribution* of each feature's importance rather than a single bar chart. Better still, treat importance as a range across good models ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]).

## Connections

- The result is a concrete instance of **selection among many options inflating apparent signal** — the logic of [[Garden of Forking Paths]] and [[Multiple Testing Corrections]], here operating inside an algorithm.
- Reporting correct-identification rates with MCSEs is good simulation practice: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Effective Sample Size and Monte Carlo Standard Error]].
- Instability of single-run importances motivates resampling-based selection: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl 2007 - Split-Selection Bias in CART Trees]] — mechanism behind N1, N2, P1, P2
- [[Strobl 2007 - Bootstrap-Induced Association]] — mechanism behind the residual bias of `cforest` + bootstrap
- [[Strobl 2007 - Null and Power Case Simulation Design]] — the design these results come from
