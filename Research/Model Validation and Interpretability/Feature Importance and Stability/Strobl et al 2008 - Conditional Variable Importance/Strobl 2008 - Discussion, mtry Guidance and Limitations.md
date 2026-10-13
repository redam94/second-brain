---
title: "Strobl 2008 - Discussion, mtry Guidance and Limitations"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §5 Discussion and conclusion (2 paras.), Authors' contributions, Acknowledgements; limitations synthesized from §2.5, §3, §4"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]"
  - "[[Strobl 2008 - Simulation Results for Conditional Importance]]"
  - "[[Strobl 2008 - Peptide-Binding Application]]"
  - "[[Conditional Permutation Importance (Strobl 2008 Algorithm)]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - Strobl 2008 Discussion
  - Conditional Importance Limitations
---

# Strobl 2008 - Discussion, mtry Guidance and Limitations

> [!summary]
> §5 summarizes the paper. Conditional permutation, using the fitted model's own partition as the grid, reflects each predictor's true impact better than the marginal scheme. It "cannot entirely eliminate the preference for correlated predictor variables", but it gives a fairer comparison. Two practical rules follow. (1) With correlated predictors, try several `mtry` values instead of trusting the default $\sqrt p$. (2) Grow enough trees that results do not change systematically across random seeds; only then are marginal-vs-conditional differences more than noise. The method was announced for the next `party` release. This note also gathers the method's limitations as they appear across the paper, plus later context marked as outside the source.
^summary-discussion

## Overview

Section 5 is the paper's shortest section: one paragraph of conclusions and one sentence on software. This note records it, then collects the method's limitations from §2.5, §3 and §4 in one place, and finally adds clearly labelled context from later literature. The method itself is in [[Conditional Permutation Importance (Strobl 2008 Algorithm)]].

## Main Content

### Conclusions stated in §5

> [!theorem] Claims of the discussion (§5, para. 1)
> 1. **Diagnosis.** The paper has investigated the sources of the preference for correlated predictors in RF importance: split selection and the permutation null.
> 2. **Method.** The conditional permutation scheme uses "the partition that is automatically provided by the fitted model as a conditioning grid". It reflects true impact better than the marginal scheme.
> 3. **Limit.** It "cannot entirely eliminate the preference for correlated predictor variables". It provides "a more fair means of comparison" that helps identify the relevant predictors.
> 4. **`mtry`.** The default $\texttt{mtry} = \sqrt p$ is often optimal for prediction accuracy in empirical studies (ref. [36], Svetnik et al. 2003, on random forests for compound classification and QSAR modelling). With correlated predictors, "different values of mtry should be considered".
> 5. **Number of trees.** Interpretation is sensible only when `ntree` is large enough that results from different random seeds "do not vary systematically". Only then can marginal-vs-conditional differences be attributed to something other than random variation.
^thm-discussion-claims

**Software (§5, para. 2).** The conditional permutation importance was to be released in the next version of the `party` package for R.

**Authors' contributions.** C. Strobl defined the question, proposed the conditional importance, ran the simulations and drafted the paper. A.-L. Boulesteix analysed the peptide-binding data. T. Kneib, T. Augustin and A. Zeileis contributed to the theory and presentation. **Acknowledgements:** Porticus Foundation funding (A.-L. Boulesteix), and T. Hothorn for help with `cforest` objects.

### Limitations collected from the paper

| Limitation | Where stated | Implication |
|---|---|---|
| Correlated small- and zero-coefficient variables remain overestimated | §3, §5 | Conditioning fixes the permutation null but not split-selection preference |
| Grid treats every cutpoint as a global bisector, so cells can be small | §2.5 | Extra variance; the authors judge it uncritical in their simulation |
| Choice of $Z$ (all / threshold / $p$-value / user) and the threshold value | §2.5, §3 ($r\ge .2$) | Analyst degree of freedom that affects rankings |
| Importance variance increases with `mtry`; bias increases as `mtry` decreases | §3 | No single `mtry` is best for importance; scan several |
| Scores are relative ("absolute values … should not be interpreted") | §4 | Use rankings and contrasts, not magnitudes |
| Causal reading needs extra assumptions | §1 | Conditional importance is a predictive statement |
| Simulation reporting: $n$ and Monte Carlo SE not given; the `mtry` grid {1, 3, 8} appears only in figure panels; the smaller `mtry` fits mentioned in §4 are not reported | §2.1, §3, §4 | Limits replication; see [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] |
| Text and figure disagree slightly: conditional $X_1$ is called "almost equal" to $X_5$, but the Fig. 3 medians are about 1.5–2× higher | §3, Fig. 3 | Conditioning reduces the correlation advantage but does not remove it for strong drivers either |

### Critical commentary (beyond the source)

The paper has no published discussant comments. The points below are later context and analysis, not claims from the paper.

1. **What "true importance" means.** The paper treats the coefficient pattern as the target. *Exact* conditional permutation measures the **unique** predictive contribution of $X_j$ given $Z$. For a true driver that is highly correlated with other true drivers, this contribution is small (see the oracle calculation in [[Strobl 2008 - Permutation Importance Null Hypotheses#^ex-oracle]]: about 13% of the marginal value at $\rho=0.9$). Coarse tree grids partly hide this. Neither the marginal nor the conditional score equals "$|\beta_j|$". They answer different questions.
2. **Extrapolation.** [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] later argued that marginal permute-and-predict pushes the model into regions with no data. Conditional permutation, conditional resampling, or dropping and refitting the variable avoids this. That gives a second rationale for the Strobl approach.
3. **Population targets.** [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] defines model reliance (marginal) and a conditional version as population quantities, and bounds them over a Rashomon set of good models.
4. **Successor implementation.** Debeer & Strobl (2020, R package `permimp`) later revisited the conditional scheme, including how the conditioning threshold and grid are constructed. Readers should check package documentation before relying on `party::varimp(conditional = TRUE)` defaults.
5. **SHAP parallel.** The interventional vs conditional value-function debate ([[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]) is the same choice in a Shapley framework. [[Dillon et al - SHAP and Causal Insights - Overview]] adds that neither choice gives a causal effect without a causal design.

### Practical checklist for correlated drivers (synthesis)

1. Grow forests on **subsamples without replacement** with unbiased trees (Strobl 2007).
2. Compute **both** marginal and conditional importance and report the gap.
3. Scan **several `mtry`** values and several **conditioning thresholds**, and report how stable the rankings are ([[Researcher Degrees of Freedom]], [[Model Selection and Overfitting]]).
4. Use enough trees for **seed stability**. Repeat with different seeds.
5. Validate on a simulated design with your own correlation structure ([[Designing Simulated-Data Experiments]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] for media data).
6. Do not read importance as incremental lift. Use experiments or causal designs for that ([[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]).

## Examples

> [!example] Applying the §5 advice to a driver ranking (illustrative, not in the paper)
> A forest on 104 weekly rows ranks paid social 3rd marginally and 7th conditionally at `mtry` = $\sqrt p$. Following §5, refit at several `mtry` values (e.g. 1, $\sqrt p$, $p/3$, $p$) and with several seeds at a large `ntree`. If paid social's conditional rank moves between 5th and 9th across seeds, the marginal-vs-conditional gap is within noise and should not be reported as a finding. If it stays near 7th while the marginal rank stays near 3rd, the gap reflects borrowed importance from correlated channels.
^ex-discussion-mtry-check

## Connections

- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]: the bias from scale and number of categories, which is the reason for subsampling and `cforest`.
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]: formal error control for unstable selections.
- [[SR 11-7 - Model Risk Management Guidance - Overview]]: driver rankings used in decisions call for sensitivity analysis and effective challenge.

## See Also

- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
