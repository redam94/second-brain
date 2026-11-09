---
title: "Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Sec. 5, pp. 6-9"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Identifiability Conditions and Identification]]"
used_by:
  - "[[Dahabreh 2020 - Simulation Study of Estimators]]"
  - "[[Dahabreh 2020 - CASS Coronary Surgery Application]]"
aliases:
  - "OM IOW DR estimators for transporting trial effects"
  - "inverse odds of trial participation weighting"
---

# Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators

> [!summary]
> Three families of estimators of $\mu(a)=E\{E[Y\mid X,S=1,A=a]\mid S=0\}$: outcome-model (OM), inverse-odds weighting (IOW1 unnormalized, IOW2 normalized), and three doubly robust estimators (DR1-DR3). Each is a solution to a missing-data problem; DR is consistent if either the outcome model or the participation model is right.

## Overview
Under consistency the unknown $Y^a$ for target individuals is a **missing outcome**, with missingness indicator $I(S=1,A=a)$. Parametric working models throughout: outcome $g_a(X;\theta)\approx E[Y\mid X,S=1,A=a]$; participation $p(X;\beta)\approx\Pr[S=1\mid X]$; trial treatment $e_a(X;\gamma)\approx\Pr[A=a\mid X,S=1]$. Treatment probabilities are *known* by design (true values can be used; estimating them can reduce standard errors).

## Main Content

> [!definition] Outcome model-based (OM) estimator (eq. 1)
> $$
> \hat\mu_{OM}(a)=\Big(\sum_{i=1}^n(1-S_i)\Big)^{-1}\sum_{i=1}^n(1-S_i)\,g_a(X_i;\hat\theta).
> $$
>
> Fit the outcome regression in trial participants (separately by arm, i.e., all treatment-by-covariate interactions) and average predictions over target covariates. Consistent when the outcome model is correct. ^def-om-estimator

> [!definition] Inverse-odds weights
> $$
> \hat w_a(X_i,S_i,A_i)=\frac{1-p(X_i;\hat\beta)}{p(X_i;\hat\beta)\,e_a(X_i;\hat\gamma)}\;I(S_i=1,A_i=a).
> $$
>
> The factor $(1-p)/p$ is the **inverse of the odds of participation**. Interpretation: treat the trial as a survey sample from the target with covariate-dependent, estimated sampling probabilities. ^def-io-weights

> [!definition] IOW estimators (eqs. 2-3)
> Unnormalized: $\hat\mu_{IOW1}(a)=\big(\sum_i(1-S_i)\big)^{-1}\sum_i \hat w_a(X_i,S_i,A_i)Y_i$.
> Normalized (ratio/Hajek form): $\hat\mu_{IOW2}(a)=\big(\sum_i\hat w_a\big)^{-1}\sum_i\hat w_aY_i$.
> IOW2 equals the intercept (and intercept + treatment coefficient) of a saturated weighted least squares regression of $Y$ on $A$. It always lies in the support of $Y$ (e.g., within $[0,1]$ for binary $Y$), giving much better finite-sample behaviour with variable weights. Both are consistent if the participation model is right. ^def-iow-estimators

> [!theorem] Why the IO weighting estimator targets $\mu(a)$
> Since $E[I(S=1,A=a)Y\mid X]=p(X)e_a(X)\,g_a(X)$,
>
> $$
> E\Big[\frac{1-p}{p\,e_a}I(S=1,A=a)Y\Big]=E[(1-p(X))g_a(X)]=E[(1-S)g_a(X)],
> $$
>
> so dividing by $\Pr[S=0]$ gives $E[g_a(X)\mid S=0]=\mu(a)$. (Derived here from the definitions; it is the expectation behind eq. 2.) ^thm-iow-unbiased

> [!definition] Doubly robust estimators (eqs. 4-6)
> $$
> \hat\mu_{DR1}(a)=\Big(\sum_i(1-S_i)\Big)^{-1}\sum_i\Big\{\hat w_a\big(Y_i-g_a(X_i;\hat\theta)\big)+(1-S_i)g_a(X_i;\hat\theta)\Big\}
> $$
> $$
> \hat\mu_{DR2}(a)=\Big(\sum_i\hat w_a\Big)^{-1}\sum_i\hat w_a\big(Y_i-g_a(X_i;\hat\theta)\big)+\Big(\sum_i(1-S_i)\Big)^{-1}\sum_i(1-S_i)g_a(X_i;\hat\theta)
> $$
> $$
> \hat\mu_{DR3}(a)=\Big(\sum_i(1-S_i)\Big)^{-1}\sum_i(1-S_i)\,g_a(X_i;\hat\theta_w)
> $$
>
> where $\hat\theta_w$ comes from the outcome regression among trial participants **weighted** by $\hat w_a$. DR3 is doubly robust when the outcome is modelled with a linear exponential family quasi-likelihood and canonical link. ^def-dr-estimators

> [!theorem] Double robustness
> DR estimators are consistent for $\mu(a)$ and asymptotically normal when **either** the participation model or the outcome model is correctly specified (formal result in the Appendix, absent from the PDF; refs [36],[40]). In practice DR estimators are usually more precise than IOW and nearly as precise as OM. Caveat: with a misspecified outcome model *and* highly variable weights, DR can do worse than non-DR estimators using the same misspecified outcome model (refs [41],[34]). ^thm-double-robustness

> [!note] Special cases (paper's argument, Sec. 6.2)
> IOW is DR with a grossly misspecified outcome model $g_a\equiv0$; OM is DR with grossly misspecified participation $p\equiv1$ (weights $\equiv0$). So correct IOW or OM performance in simulation already demonstrates the double robustness property.

### Inference
All estimators are partial M-estimators, so sandwich variances are available (R package geex is cited); the nonparametric bootstrap is easier and "will often be preferred in practice".

## Examples

> [!example] Runnable sketch - OM, IOW2 and DR2 on simulated trial + cohort data
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> n = 5000
> X = rng.standard_normal((n, 3))
> # trial selection depends on X1 (an effect modifier), X2, X3
> logit = -2.5 + X @ np.array([1., 1., 1.])
> p_true = 1 / (1 + np.exp(-logit)); S = rng.random(n) < p_true
> A = rng.random(n) < 0.5
> tau = 1 + 2 * X[:, 0]                 # effect modification by X1
> Y = X @ np.array([1., 1., 1.]) + A * tau + rng.standard_normal(n)
>
> def fit_logit(X, s):
>     Z = np.c_[np.ones(len(X)), X]; b = np.zeros(Z.shape[1])
>     for _ in range(50):
>         p = 1 / (1 + np.exp(-Z @ b)); b += np.linalg.solve(Z.T @ (Z * (p * (1 - p))[:, None]), Z.T @ (s - p))
>     return 1 / (1 + np.exp(-Z @ b))
>
> p = fit_logit(X, S.astype(float))
> def mu(a):
>     sel = S & (A == a)
>     Z = np.c_[np.ones(n), X]
>     beta = np.linalg.lstsq(Z[sel], Y[sel], rcond=None)[0]
>     g = Z @ beta
>     w = np.where(sel, (1 - p) / (p * 0.5), 0.0)      # known e_a = 0.5
>     om = g[~S].mean()
>     iow2 = (w * Y).sum() / w.sum()
>     dr2 = (w * (Y - g)).sum() / w.sum() + g[~S].mean()
>     return om, iow2, dr2
> est = np.array(mu(1)) - np.array(mu(0))
> print("target ATE: OM, IOW2, DR2 =", est.round(3), "| truth", tau[~S].mean().round(3),
>       "| trial-only", (Y[S & A].mean() - Y[S & ~A].mean()).round(3))
> ```
> The trial-only contrast is biased upward (selection over-represents high $X_1$); the three adjusted estimates recover the target ATE (Monte Carlo summaries in [[Dahabreh 2020 - Simulation Study of Estimators]]).

## Connections
Compare to Bayesian treatments of weighting in [[Bayesian Inverse Probability Weighting]]; the AIPW/DR structure is the same as in [[Doubly-Robust Estimands for ATT(g,t)]] (with $S$ playing the role of treatment).

## See Also
- [[Dahabreh 2020 - Identifiability Conditions and Identification]]
- [[Dahabreh 2020 - Simulation Study of Estimators]]
- [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]
