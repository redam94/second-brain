---
title: "Dorie 2019 - Predicting Performance and Variance Decomposition"
tags:
  - source/ingested
  - topic/benchmarks
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Sec. 7 (pp. 23-24); Appendix A.4 Tables 5-6 (pp. 35-38); A.5 (pp. 38-39)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Evaluation Metrics and Results by Method]]"
  - "[[Dorie 2019 - Simulation Design and Knobs]]"
used_by:
  - "[[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]"
aliases:
  - ACIC variance decomposition
  - Predicting method performance from data features
  - ACIC oracle and non-oracle metrics
---

# Dorie 2019 - Predicting Performance and Variance Decomposition

> [!summary]
> The authors described each simulated data set with 25 metrics (knob levels, oracle metrics known only to the organisers, and non-oracle metrics computable from observed data) and tried to predict method performance. With non-oracle metrics $R^2$ rarely exceeds 0.10 for a single method; in a multilevel model, methods explain 37% of the variance in log absolute bias, settings 5%, setting-by-method interactions only about 4%, and realizations over half. Relative performance is "much less contextual than we had imagined": use a flexible nonparametric response surface.

## Overview

"Under almost no condition could we predict which of the black box methods would outperform others, beyond its average level of performance across all settings." The DIY competition had too little data for this analysis (footnote 18).

## Main Content

### Metrics used as predictors (Sec. 7.1, App. A.5)

> [!definition] Oracle vs non-oracle metrics
> **Oracle** metrics need knowledge of the true DGP (e.g., correlation between the true propensity score and the outcome). **Non-oracle** metrics can be computed from observed data before choosing a method (e.g., pseudo-$R^2$ of a logistic propensity model). **[knob]** marks oracle metrics equal to the explicit settings.
^def-oracle-metrics

25 metrics (A.5): six knob metrics (outcome nonlinearity 0/1/2; assignment nonlinearity 0/1/2; percentage treated, easily estimated so treated as non-oracle; overlap binary; alignment 0/1/2; heterogeneity 0/1/2), plus oracle measures: correlation of true propensity and outcome (alignment); mean Mahalanobis distance to nearest counterfactual neighbour in ground-truth design matrix (overlap); Euclidean distance between control and treated means (balance); Wasserstein distance between arms (balance); $R^2$ of logit of true propensity on the observable design matrix; $R^2$ of the true treatment effect on the observable design matrix; $R^2$ of the outcome on the ground-truth matrix; the ratio of the observable-matrix $R^2$ to the ground-truth $R^2$; $R^2$ of $Y(0)$ on controls and $Y(1)$ on treated in both observable and ground-truth matrices; and the SD of the ground-truth treatment effect function. Non-oracle: $R^2$ of observed $Y$ on observed $X$ (outcome nonlinearity); pseudo-$R^2$ of logistic propensity model (assignment nonlinearity); $R^2$ between the BART-estimated unit-level effect and logistic-regression propensity scores (alignment); and the Mahalanobis, Euclidean and Wasserstein measures on the observable design matrix.

### Method-by-method regressions (Sec. 7.2, Table 5)

Multiple linear regressions of $\log|\text{bias}|$ over the 7,700 realizations on the 25 metrics plus quadratic terms, one per method (24 black-box methods). The log makes total variation similar across methods so $R^2$ is comparable.

> [!theorem] Predictability of performance (Sec. 7.2)
> With only non-oracle metrics, $R^2$ rarely exceeds $0.10$. Adding oracle knowledge raises $R^2$ to $0.40$ to $0.50$ for just over a third of methods, mostly the weaker ones; for the more successful methods it rarely exceeds $0.10$ even with oracle knowledge. Predictability of a method's performance is "roughly inversely proportional to the overall performance of that method."
^thm-predictability

> [!example] Table 5: $R^2$ of log absolute bias on experimental-condition metrics, by method
> Columns: non-oracle metrics only; indicator for each of the 77 settings only; all metrics (oracle and non-oracle, plus quadratics); settings plus metrics. Ordered by overall RMSE (worst to best, as printed).
>
> | Method | No oracle | Only settings | All metrics | Settings + metrics |
> |---|---|---|---|---|
> | teffects ipw | 0.09 | 0.23 | 0.37 | 0.38 |
> | MHE Algorithm | 0.18 | 0.42 | 0.48 | 0.50 |
> | Linear Model | 0.17 | 0.41 | 0.47 | 0.49 |
> | teffects ipwra | 0.09 | 0.27 | 0.43 | 0.45 |
> | teffects ra | 0.09 | 0.29 | 0.44 | 0.46 |
> | teffects psmatch | 0.07 | 0.22 | 0.33 | 0.35 |
> | CBPS | 0.08 | 0.28 | 0.43 | 0.45 |
> | SL+TMLE Joint | 0.27 | 0.17 | 0.39 | 0.40 |
> | LASSO+CBPS | 0.11 | 0.22 | 0.36 | 0.38 |
> | Adj. Tree Strat | 0.06 | 0.17 | 0.19 | 0.22 |
> | BalanceBoost | 0.11 | 0.21 | 0.32 | 0.34 |
> | Tree Strat | 0.01 | 0.14 | 0.13 | 0.16 |
> | SuperLearner | 0.10 | 0.10 | 0.19 | 0.20 |
> | SL+TMLE | 0.04 | 0.04 | 0.08 | 0.09 |
> | BART IPTW | 0.06 | 0.10 | 0.21 | 0.22 |
> | calCause | 0.03 | 0.08 | 0.09 | 0.10 |
> | h2o Ensemble | 0.03 | 0.08 | 0.09 | 0.10 |
> | SL+BART+TMLE | 0.03 | 0.03 | 0.06 | 0.06 |
> | BART | 0.03 | 0.05 | 0.09 | 0.10 |
> | BART Xval | 0.03 | 0.06 | 0.09 | 0.10 |
> | MBART SymInt | 0.02 | 0.05 | 0.09 | 0.10 |
> | BART MChains | 0.03 | 0.06 | 0.09 | 0.10 |
> | BART+TMLE | 0.03 | 0.04 | 0.08 | 0.09 |
> | BART on PScore | 0.02 | 0.04 | 0.09 | 0.10 |
>
> **Interpretation.** For BART-family and ensemble methods, even all 77 setting dummies plus all metrics explain at most about 10% of variation; for linear and `teffects` methods the same predictors explain 35% to 50%. Good methods are not only more accurate, they are less sensitive to the data conditions. Range across methods in the last column: 0.06 to 0.50.
^ex-table5-r2

### Cross-method multilevel analysis (Sec. 7.3, A.4)

Outcome: log absolute bias over the 7,700 data sets for 24 methods. Random effects for methods (24) and settings (77); the unconditional-means model partitions variance into methods, settings, setting-by-method interaction and realizations. Metric predictors are standardised, split into setting-level means (between-setting effects) and within-setting deviations (centring within cluster; Enders and Tofighi 2007), each with squared terms.

> [!example] Table 6: variance components of log absolute bias
> | Variance component | Uncond. mean | + Method features | + Non-oracle metrics | + Oracle metrics | Feature x non-oracle | Feature x (non-oracle + oracle) |
> |---|---|---|---|---|---|---|
> | Methods | 0.914 | 0.216 | 0.216 | 0.216 | 0.217 | 0.217 |
> | Settings | 0.130 | 0.130 | 0.025 | 0.002 | 0.027 | 0.005 |
> | Setting x Methods | 0.091 | 0.091 | 0.091 | 0.091 | 0.050 | 0.027 |
> | Realizations | 1.308 | 1.308 | 1.288 | 1.269 | 1.272 | 1.225 |
> | **Total** | 2.443 | 1.744 | 1.620 | 1.578 | 1.566 | 1.475 |
>
> **Reading.** Methods + settings + interaction sum to $0.914+0.130+0.091=1.135$, which is 46% of total variation; realizations are 54%. Methods alone: $0.914/2.443\approx37\%$; settings $\approx5\%$ ($0.130/2.443=5.3\%$); interaction $\approx3.7\%$. The small interaction means methods "are simply better or worse, and not dramatically better than another method in a given setting."
^ex-table6-variance

**Findings from the sequence of models.**
- **Method features (Table 1 dummies, 8 non-redundant)** explain 76% of the between-method variance, but few features are significant; a **nonparametric response surface** is "by far the most important feature," improving the outcome by about $-2$ on the log scale.
- **Non-oracle metrics** explain 81% of between-setting variance; oracle metrics explain nearly all. Two non-oracle features suffice essentially: (i) **outcome nonlinearity**, the $R^2$ of observed $Y$ on the observed design matrix; (ii) **alignment**, the $R^2$ between BART's estimated unit-level effect and propensity scores from logistic regression. Poor alignment and nonlinear response surfaces are "almost completely predictive of poor performance."
- **Interactions** (features x metrics): non-oracle interactions explain 45% of the setting-by-method variance; adding oracle metrics, 70%. They explain about 6% of realization variance.
- **Consistency check:** excluding the methods row, total variation to explain is $2.443-0.914=1.53$; after the full model $1.475-0.217=1.26$ remains, so about 18% explained on average, consistent with Table 5's range of $R^2$ (0.06 to 0.50) for the model with 77 dummies plus all metrics.
- **Conclusion:** the researcher can learn their approximate setting from observables, but because the setting-by-method interaction is small this knowledge does little to guide method choice; "a good method will use a non-parametric model of the response surface."

## Examples

> [!example] Variance-share arithmetic
> **Setup.** Use Table 6 column 1: total $2.443$.
> **Compute.** Methods $0.914/2.443=0.374$; settings $0.130/2.443=0.053$; interaction $0.091/2.443=0.037$; realizations $1.308/2.443=0.535$.
> **Interpretation.** Choosing the right method matters about seven times more than the setting (0.374 vs 0.053) and about ten times more than the method-setting interaction (0.374 vs 0.037), which is why a single "use flexible response-surface modelling" rule is nearly as good as a context-tailored rule here.
^ex-variance-share

```python
import numpy as np
v = {"methods": 0.914, "settings": 0.130, "setting_x_methods": 0.091, "realizations": 1.308}
tot = sum(v.values()); print(round(tot, 3))
print({k: round(x / tot, 3) for k, x in v.items()})
```

## Connections

- The finding of small method-by-setting interaction contrasts with SuperGLUE/VTAB ranking flips: [[Dehghani 2021 - Task Selection Bias Case Studies]].
- Variance decomposition as a way to evaluate simulation studies: [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]
