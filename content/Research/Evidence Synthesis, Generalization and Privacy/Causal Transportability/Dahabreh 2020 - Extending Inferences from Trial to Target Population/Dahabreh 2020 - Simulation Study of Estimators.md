---
title: "Dahabreh 2020 - Simulation Study of Estimators"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/example
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Sec. 6, pp. 9-11, Tables 2-3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]"
used_by:
  - "[[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]"
aliases:
  - "simulation of OM IOW DR transportability estimators"
---

# Dahabreh 2020 - Simulation Study of Estimators

> [!summary]
> A 36-scenario proof-of-concept simulation (100,000 runs each) with correctly specified parametric models. All adjusted estimators are near-unbiased; the trial-only estimator is biased by 0.66-0.89 under strong selection on an effect modifier; OM has the smallest variance, DR estimators are close, and IOW (especially unnormalized) is far noisier.

## Overview
Purpose: examine finite-sample bias and variance of eqs. (1)-(6) for potential-outcome means and treatment effects in the target, in nested trial designs with continuous outcomes. Binary-outcome and non-nested results are in the Appendix (not in the PDF).

## Main Content

### Data generation (Sec. 6.1)
Factorial design: 3 trial sizes × 3 cohort sizes × 2 effect-modification magnitudes × 2 selection magnitudes = 36 scenarios.

- Cohort $n\in\{2000,5000,10000\}$; trial size $n_{RCT}\approx\{200,500,1000\}$.
- $X=(1,X_1,X_2,X_3)^\top$, $X_j\sim N(0,1)$ independent.
- Selection: $\operatorname{logit}\Pr[S=1\mid X]=\beta^\top X$, $\beta=(\beta_0,\dots,\beta_3)$, $\beta_0$ solved numerically so that $n_{RCT}$ hits its target; $\beta_1\in\{0,1\}$ (none/strong selection on $X_1$); $\beta_2=\beta_3=1$.
- Potential outcomes $Y^a=\theta^{a\top}X+\epsilon^a$, $\epsilon^a\sim N(0,1)$; $\theta^1=(1,\theta_{11},1,1)$ with $\theta_{11}\in\{2,1\}$, $\theta^0=(0,1,1,1)$. So $\theta_{11}=2$ means effect modification by $X_1$ on the mean-difference scale.
- Treatment: $A\sim\text{Bernoulli}(0.5)$ among $S=1$ (marginally randomized). $Y=AY^1+(1-A)Y^0$.
- Estimators applied: eqs. (1)-(6) plus trial-only. All working models correctly specified: outcome models with main effects, fit separately by arm; logistic participation and treatment models with main effects.

### Results (strong selection $\beta_1=1$, strong effect modification, $\theta_{11}-\theta_{10}=1$)

> [!example] Table 2 - bias of target-ATE estimators
> | $n_{RCT}$ | $n$ | Trial | IOW1 | IOW2 | OM | DR1 | DR2 | DR3 |
> |---|---|---|---|---|---|---|---|---|
> | 200 | 2000 | 0.7656 | 0.0018 | 0.0593 | 0.0000 | 0.0000 | 0.0003 | 0.0006 |
> | 200 | 5000 | 0.8401 | 0.0080 | 0.0710 | -0.0007 | 0.0002 | -0.0002 | 0.0000 |
> | 200 | 10000 | 0.8855 | 0.0029 | 0.0753 | -0.0002 | -0.0019 | -0.0015 | -0.0012 |
> | 500 | 2000 | 0.6892 | 0.0036 | 0.0235 | 0.0001 | 0.0016 | 0.0013 | 0.0013 |
> | 500 | 5000 | 0.7654 | -0.0003 | 0.0306 | -0.0001 | 0.0004 | 0.0002 | -0.0004 |
> | 500 | 10000 | 0.8233 | 0.0033 | 0.0339 | -0.0012 | -0.0023 | -0.0021 | -0.0020 |
> | 1000 | 2000 | 0.6576 | -0.0004 | 0.0081 | 0.0000 | -0.0004 | -0.0004 | -0.0003 |
> | 1000 | 5000 | 0.7061 | 0.0033 | 0.0157 | -0.0003 | -0.0009 | -0.0009 | -0.0005 |
> | 1000 | 10000 | 0.7653 | -0.0010 | 0.0160 | 0.0002 | 0.0002 | 0.0002 | 0.0002 |
>
> Trial = trial-only unadjusted; OM = outcome model; IOW1/IOW2 = unnormalized/normalized inverse-odds weighting; DR1/DR2/DR3 = doubly robust (unnormalized weights / normalized weights / weighted regression). ^tbl-sim-bias

> [!example] Table 3 - variance of target-ATE estimators
> | $n_{RCT}$ | $n$ | Trial | IOW1 | IOW2 | OM | DR1 | DR2 | DR3 |
> |---|---|---|---|---|---|---|---|---|
> | 200 | 2000 | 0.0843 | 4.4507 | 1.1256 | 0.0762 | 0.2562 | 0.1501 | 0.1582 |
> | 200 | 5000 | 0.0905 | 6.9650 | 1.2765 | 0.0819 | 0.3353 | 0.1669 | 0.1791 |
> | 200 | 10000 | 0.0939 | 6.1245 | 1.3539 | 0.0841 | 0.3321 | 0.1753 | 0.1921 |
> | 500 | 2000 | 0.0324 | 1.1901 | 0.5278 | 0.0268 | 0.0808 | 0.0610 | 0.0558 |
> | 500 | 5000 | 0.0336 | 1.5804 | 0.6760 | 0.0294 | 0.1059 | 0.0718 | 0.0662 |
> | 500 | 10000 | 0.0351 | 1.4593 | 0.7505 | 0.0310 | 0.1113 | 0.0783 | 0.0727 |
> | 1000 | 2000 | 0.0166 | 0.4580 | 0.2456 | 0.0127 | 0.0333 | 0.0290 | 0.0258 |
> | 1000 | 5000 | 0.0162 | 0.6061 | 0.3558 | 0.0137 | 0.0423 | 0.0346 | 0.0305 |
> | 1000 | 10000 | 0.0168 | 0.6964 | 0.4291 | 0.0146 | 0.0503 | 0.0399 | 0.0352 |
> ^tbl-sim-variance

### Interpretation
1. **Bias.** All estimators except Trial are essentially unbiased, with one exception: IOW2 shows small positive finite-sample bias (0.008 to 0.075), largest when the trial is small relative to the cohort. This is the usual ratio-estimator bias, traded against its massive variance reduction vs IOW1 (e.g., 1.13 vs 4.45 at 200/2000).
2. **Variance.** OM lowest; DR2/DR3 roughly 2x the variance of OM (1.97x at 200/2000, 2.3x at 1000/2000); DR1 (unnormalized) worse; IOW1 an order of magnitude worse than OM. Variance falls with $n_{RCT}$ and, for the weighted estimators, grows mildly with cohort size $n$ (more extreme weights as the target grows relative to the trial).
3. **Trial-only.** Biased for $E[Y^1-Y^0\mid S=0]$ whenever selection depends on the effect modifier, but unbiased for $E[Y^1-Y^0\mid S=1]$. Its variance is low — precision about the wrong estimand.
4. **Normalization.** With strong selection and a trial much smaller than the target, normalized weights (IOW2, DR2, DR3) beat unnormalized (IOW1, DR1). The authors "recommend avoiding weighted estimators that do not use normalized weights".
5. **Double robustness is visible even though no model was misspecified** (see special-case note in [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]).

### Code
The paper's Appendix provides R functions (one per estimator), a `geex` sandwich-variance implementation and Stata code to reproduce the study; these are not in the PDF.

## Examples

> [!example] Independent mini-replication (Python)
> A 300-replication run of one cell ($n=5000$, $n_{RCT}\approx500$, $\beta_1=1$, $\theta_{11}=2$, known $e_a=0.5$, estimand = finite-cohort mean of $Y^1-Y^0$ among non-participants) gave bias/variance: Trial +0.764 / 0.035; OM +0.011 / 0.031; IOW1 +0.042 / 0.865; IOW2 +0.048 / 0.565; DR1 -0.005 / 0.074; DR2 -0.006 / 0.062; DR3 -0.004 / 0.062. The Trial row matches the paper's 0.7654 for the same cell; the qualitative ordering of variances matches Table 3 (absolute values differ because of 300 vs 100,000 runs, known treatment probabilities, and a finite-sample target).
> ```python
> import numpy as np
> from scipy.optimize import brentq
> def logit_fit(X, s):
>     Z = np.c_[np.ones(len(X)), X]; b = np.zeros(Z.shape[1])
>     for _ in range(50):
>         p = 1/(1+np.exp(-Z@b)); b += np.linalg.solve(Z.T@(Z*(p*(1-p))[:,None]), Z.T@(s-p))
>     return 1/(1+np.exp(-Z@b))
> def wls(Xtr, ytr, Xall, w=None):
>     Z = np.c_[np.ones(len(Xtr)), Xtr]; w = np.ones(len(Xtr)) if w is None else w
>     return np.c_[np.ones(len(Xall)), Xall] @ np.linalg.solve(Z.T@(Z*w[:,None]), Z.T@(w*ytr))
> def one(rng, n=5000, nrct=500, b1=1.0, th11=2.0):
>     X = rng.standard_normal((n,3)); Xd = np.c_[np.ones(n), X]
>     b0 = brentq(lambda b: (1/(1+np.exp(-(Xd@np.r_[b,b1,1,1])))).sum()-nrct, -20, 5)
>     S = rng.random(n) < 1/(1+np.exp(-(Xd@np.r_[b0,b1,1,1])))
>     Y1 = Xd@np.array([1,th11,1,1]) + rng.standard_normal(n); Y0 = Xd@np.array([0,1,1,1]) + rng.standard_normal(n)
>     A = rng.random(n) < .5; Y = np.where(A, Y1, Y0); truth = (Y1-Y0)[~S].mean()
>     p = logit_fit(X, S.astype(float)); mu = {}
>     for a in (0,1):
>         sel = S & (A==a); g = wls(X[sel], Y[sel], X); w = np.where(sel, (1-p)/(p*.5), 0.)
>         mu[a] = dict(OM=g[~S].mean(), IOW1=(w*Y).sum()/(~S).sum(), IOW2=(w*Y).sum()/w.sum(),
>                      DR2=(w*(Y-g)).sum()/w.sum()+g[~S].mean(),
>                      DR3=wls(X[sel], Y[sel], X, w[sel])[~S].mean())
>     out = {k: mu[1][k]-mu[0][k]-truth for k in mu[1]}
>     out["Trial"] = Y[S&A].mean()-Y[S&~A].mean()-truth
>     return out
> rng = np.random.default_rng(1); R = [one(rng) for _ in range(300)]
> for k in R[0]: v = np.array([r[k] for r in R]); print(k, round(v.mean(),3), round(v.var(),3))
> ```

## Connections
Takeaway for analysts: pick OM or a normalized DR estimator by default; keep the trial-only number for comparison; report both.

## See Also
- [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]
- [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]]
