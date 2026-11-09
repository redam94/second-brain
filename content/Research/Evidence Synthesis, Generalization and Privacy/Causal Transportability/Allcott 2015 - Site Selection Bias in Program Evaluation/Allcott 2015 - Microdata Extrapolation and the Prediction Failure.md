---
title: "Allcott 2015 - Microdata Extrapolation and the Prediction Failure"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Sec. 6, pp. 16-23, Table 5, Figures 2-3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Model of External Validity and Site Selection Bias]]"
  - "[[Allcott 2015 - Opower Program, Selection Mechanisms and Data]]"
used_by:
  - "[[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]"
  - "[[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]"
aliases:
  - "in-sample test of external validity Opower"
  - "linear prediction and reweighting extrapolation"
---

# Allcott 2015 - Microdata Extrapolation and the Prediction Failure

> [!summary]
> Using standard extrapolation (linear prediction and Hellerstein-Imbens reweighting) on microdata from the first ten sites, Allcott predicts a nationwide first-year effect of about 1.7% of electricity use (\$2.3 billion). The same estimates predict the 101 later sites with a bias of +0.64 pp (linear) and +0.40 pp (weighted), both $p<0.0001$; site-specific predictions are uncorrelated with realised effects. Overlap and covariate balance are not the explanation.

## Overview
Under Assumptions 1-4, the ten-site microdata could identify the target ATE; with ten replications, 3B might hold even though 3A fails. Test: predict the 101 later sites' mean ATE in-sample. Missing covariates are multiply imputed (MICE, 25 imputations, Rubin rules). Only target *means* of $X$ are observed, so two off-the-shelf procedures are used, each conditioning only on covariates that significantly moderate the effect (fewer extreme weights).

## Main Content

### Empirical strategy

> [!definition] Heterogeneous-effects regression (eq. 2)
> $y_{is}=100Y_{is}/C_s$ is household $i$'s first-year mean daily usage as a percent of site $s$'s control mean $C_s$; $\tilde X_{is}=X_{is}-\bar X_{D=1}$ demeaned covariates; $Y_{0i}$ three baseline usage controls (annual, winter, summer).
>
> $$
> y_{is}=-(\alpha\tilde X_i+\alpha_0)T_i+\sum_s\big(\beta_s\tilde X_i+\gamma_sY_{0i}+\pi_s\big)+\varepsilon_{is}.
> $$
>
> The sign convention makes positive $\alpha$ mean higher efficacy; $\alpha_0$ is the sample ATE in percent (a 1 means a 1% reduction). Standard errors are robust and clustered at the randomization unit (household for sites 1-9; 952 block-batch groups at site 10). ^def-het-effects-regression

**Covariate selection**: the "top-down" procedure of Crump, Hotz, Imbens and Mitnik (2008): drop the covariate with the smallest $|t|$ and re-estimate until all remaining have $|t|\ge2$. The surviving set is $X^*$.

> [!definition] Linear prediction (Assumption 5, eq. 3)
> **Assumption 5 (linear treatment effects)**: $E[\tau_i\mid X_i=x]=\alpha x+\alpha_0$. Then, under external unconfoundedness,
>
> $$
> \hat\tau_{D=0}=\hat\tau_{D=1}+\hat\alpha\big(\bar X^*_{D=0}-\bar X^*_{D=1}\big),
> $$
>
> with standard errors by the delta method. ^def-linear-prediction

> [!definition] Reweighting (Assumption 6)
> **Assumption 6 (rescaled distributions)**: $f_{D=1}(x)=f_{D=0}(x)\cdot(1+\lambda(x-\bar X^*_{D=0}))$. Weights $w_i=1/(1+\lambda(X^*_i-\bar X^*_{D=0}))$ then re-weight the sample to the target. Estimate by empirical likelihood (Hellerstein and Imbens 1999): maximise $\sum_i\ln w_i$ subject to $\sum_iw_i=1$ and $\sum_iw_iX^*_i=\bar X^*_{D=0}$ — the most similar weights that still match target means (Jensen penalises variation in $w$). ^def-reweighting

> [!definition] Frequency adjustment (eq. 4)
> Reports per month differ across sites. $\phi$ (effect of frequency) is estimated from the two microdata sites with randomized monthly vs quarterly frequency: $\hat\phi=0.515$ percent of use per (report/month).
>
> $$
> \tilde\tau_s=\hat\tau_s+\hat\phi(\bar F-F_s),\quad \bar F=0.58\text{ reports/month}.
> $$
>
> One SD of frequency across sites (0.11) shifts the ATE by only $0.515\times0.11=0.056$ pp. ^def-frequency-adjustment

### Results

> [!example] Table 5 - heterogeneous treatment effects (percent of usage; SE in parentheses; N = 508,295)
> | Interaction | (1) | (2) all X | (3) final X* | (4) + site indicators | (5) + baseline usage |
> |---|---|---|---|---|---|
> | Treatment | 1.707 (0.056) | 1.762 (0.055) | 1.760 (0.058) | - | 1.760 (0.058) |
> | T x First comparison | | 0.089 (0.009) | 0.092 (0.009) | 0.095 (0.009) | 0.099 (0.013) |
> | T x Electric heat | | 1.125 (0.229) | 1.196 (0.223) | 1.015 (0.224) | 1.314 (0.269) |
> | T x Has pool | | 0.460 (0.211) | 0.491 (0.208) | 0.415 (0.214) | 0.571 (0.224) |
> | T x Square feet (000s) | | 0.498 (0.128) | 0.494 (0.109) | 0.652 (0.121) | 0.565 (0.127) |
> | T x Baseline usage | | | | | -0.010 (0.013) |
> | T x tract income, college share, hybrid share, green pricing, EE participant, house age, rent, single family | | all insignificant | dropped | | |
>
> $R^2=0.86$ in column 1 (lagged outcomes). Coefficients are stable across columns and across individual sites (Appendix Table A8). ^tbl-het-effects

Interpretation of the signs: 10 kWh/day above neighbors (about 1/3 of the mean) goes with just under 1 pp more effect; electric heat adds over 1 pp (thermostat cuts reduce electricity use); pools and +1000 sq ft each add about 0.5 pp.

**Predictions (Figure 2).** Frequency-adjusted sample ATE $\tilde\tau_{D=1}$ is about 1.7%. Linear fit nationwide adjusts by $(0.34-0.12)\times1.196\approx+0.26$ (electric heat) and $(0-1.47)\times0.092\approx-0.14$ (first comparison); the weighted fit is close to the unadjusted ATE. National prediction: about **1.7%** of use = 21 TWh = output of about three large coal plants = **\$2.3 billion** at retail prices.

**In-sample test on the 101 later sites.** Predicted ATEs are **0.64** (linear) and **0.40** (weighted) pp larger than the true unweighted mean ATE; about 0.5 pp scaled to the nation = 6.3 TWh = \$690 million overstatement, $p<0.0001$. This is "the improved inference from randomly sampling a sufficiently large number of replication sites".

**Site-specific predictions (Figure 3).** Most of the 101 sites lie below the 45-degree line (overprediction not driven by a single site); only 22 differ non-significantly from the truth at 90%; **no correlation** between predicted and actual ATEs. Observables are uninformative about the unobservables driving site selection, so Altonji-Elder-Taber style "bounding bias from unobservables" would not work here.

### Why did it fail? (Sec. 6.2.3)
- **Overlap / balance**: Imbens-Rubin normalized difference $\Delta=\frac{\bar X_{D=0}-\bar X_{D=1}}{\sqrt{(S^2_{X,D=0}+S^2_{X,D=1})/2}}$ with rule of thumb $|\Delta|<1/4$ for linear regression to be insensitive to specification. Assuming $S^2_{X,D=0}=S^2_{X,D=1}$, all but one of the 101 target sites satisfy it for both continuous variables in $X^*$; with $S^2_{X,D=0}=0$ the 101-site mean still does. So overlap is not the problem.
- **Better conditioning (Appendix C)**: predicting each of the ten sites from the other nine, a polynomial in $X$ (squares and interactions) or restricting to better-overlap sub-populations cuts RMSE by only 10-15%.
- **Caveats**: conditioning on $X$ cannot address individual-level unobservables or site-level observables that do not vary within the sample. Predictiveness of covariates is context-specific.
- Footnote 20: Hotz-Imbens-Mortimer (2005) also found results insensitive to extra covariates once recent employment experience is conditioned on.

## Examples

> [!example] Reproducing the linear-prediction arithmetic
> ```python
> import numpy as np
> from scipy.optimize import root
> # Eq. (3): tau_target = tau_sample + alpha'(Xbar_target - Xbar_sample)  [Table 5 col 3, Table 4]
> alpha = {"FirstComparison":0.092,"ElectricHeat":1.196,"HasPool":0.491,"SquareFeet":0.494}
> xs    = {"FirstComparison":1.47,"ElectricHeat":0.12,"HasPool":0.18,"SquareFeet":1.83}   # microdata mean
> xnat  = {"FirstComparison":0.00,"ElectricHeat":0.34,"HasPool":0.17,"SquareFeet":1.86}   # national mean
> adj = {k: alpha[k]*(xnat[k]-xs[k]) for k in alpha}
> print({k: round(v,3) for k,v in adj.items()}, "total", round(sum(adj.values()),3),
>       "->", round(1.707+sum(adj.values()),3))   # approx 1.845, before frequency adjustment
> # Empirical-likelihood (Hellerstein-Imbens) weights matching a target mean m: w_i = 1/(n(1+lam'(x_i-m)))
> rng = np.random.default_rng(0); x = rng.normal(0.3, 1.0, (5000,1)); m = np.array([0.0])
> sol = root(lambda l: ((x-m)/(1+(x-m)@l)[:,None]).sum(0), x0=np.array([0.0]))
> w = 1/(len(x)*(1+(x-m)@sol.x))
> print("sum w", w.sum().round(3), "weighted mean", (w*x[:,0]).sum().round(3), "ESS", round(1/(w**2).sum()))
> ```
> Output when run: the four-covariate linear fit moves the 1.707% sample ATE to about 1.845% (slightly above the sample ATE, as the paper states, before frequency adjustment and the omitted covariates); the toy reweighting matches the target mean exactly with effective sample size about 4,200 of 5,000, showing the efficiency cost of matching a 0.3 SD shift. (Table values are rounded, so this is an illustration, not the paper's exact 1.7-1.8% figure.)

## Connections
- The test is a concrete instance of failing Assumption 3B ([[Allcott 2015 - Model of External Validity and Site Selection Bias]]).
- Standard reweighting to target means is the aggregate-data cousin of inverse-odds weighting in [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] (there, target microdata on $X$ are available).

## See Also
- [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
