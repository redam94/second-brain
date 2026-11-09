---
title: "Degtiar 2023 - Marketing Application Transporting Experiment Results"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/example
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Application of Secs. 2, 3, 5.1-5.3 (PATE, IPPW, outcome regression, A-IPPW); simulation and marketing mapping are this vault's own, not from the paper"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
  - "[[Degtiar 2023 - Outcome Regression Methods]]"
  - "[[Degtiar 2023 - Doubly Robust and Combined Methods]]"
used_by:
  - "[[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]"
aliases:
  - Geo test transport simulation
  - IPPW vs outcome regression vs A-IPPW simulation
  - Transporting experiment results to new markets
---

# Degtiar 2023 - Marketing Application Transporting Experiment Results

> [!summary]
> A fully reproducible simulation of the review's central problem in a marketing frame: a randomized geo test over-represents large-covariate markets, effects vary with that covariate, and the planner needs the average effect in a rollout population with a different covariate mix. The naive test average is off by a factor of three; outcome regression, normalized IPPW and A-IPPW all recover the target effect, with different variances, and A-IPPW survives a misspecified outcome model. **This is a vault illustration built from the review's formulas; the paper contains no simulation.**

## Overview

Mapping (our reading): study sample = markets in the geo test (with randomized treatment $A$); target sample = rollout markets with covariates only ($S=0$, transportability, so study and target are disjoint); $X$ = a single standardized effect modifier (e.g. digital share of sales); $Y$ = incremental sales index. Assumptions A1-A3 and B1-B3 from [[Degtiar 2023 - Identifying Assumptions]] hold by construction, so differences between estimators are purely statistical.

## Main Content

### Data-generating process

- Study: $n_s=3000$ units, $X\sim N(1,1)$, $A\sim\text{Bernoulli}(0.5)$ randomized.
- Target: $n_t=6000$ units, $X\sim N(-0.5,1)$, outcomes unobserved.
- Outcome: $Y=1+0.5X+A(1+0.8X)+\varepsilon$, $\varepsilon\sim N(0,1)$. Effect $\tau(x)=1+0.8x$.
- Truth: SATE $=1+0.8(1)=1.8$; **PATE (target) $=1+0.8(-0.5)=0.6$**.

### Code

```python
import numpy as np
rng = np.random.default_rng(7)
ns, nt = 3000, 6000
def make(n, mu):
    return rng.normal(mu, 1.0, n)
# study (geo test): randomized A; target: covariates only (S=0)
xs = make(ns, 1.0); xt = make(nt, -0.5)
A = rng.integers(0, 2, ns)
Y = 1 + 0.5*xs + A*(1.0 + 0.8*xs) + rng.normal(0, 1, ns)
true_pate = 1.0 + 0.8*(-0.5)
sate_true = 1.0 + 0.8*1.0

# --- naive
naive = Y[A==1].mean() - Y[A==0].mean()

# --- outcome regression (separate OLS per arm), marginalise over target covariates
def ols(X, y):
    X1 = np.c_[np.ones(len(X)), X]; b = np.linalg.lstsq(X1, y, rcond=None)[0]; return lambda Z: np.c_[np.ones(len(Z)), Z] @ b
m1 = ols(xs[A==1], Y[A==1]); m0 = ols(xs[A==0], Y[A==0])
or_est = (m1(xt) - m0(xt)).mean()

# --- logistic selection model (IRLS) on pooled covariates: P(S=1|x)
def logit_fit(X, s, iters=25):
    X1 = np.c_[np.ones(len(X)), X, X**2]; b = np.zeros(X1.shape[1])
    for _ in range(iters):
        p = 1/(1+np.exp(-X1@b)); W = p*(1-p)
        b += np.linalg.solve(X1.T@(X1*W[:,None]) + 1e-8*np.eye(len(b)), X1.T@(s-p))
    return lambda Z: 1/(1+np.exp(-(np.c_[np.ones(len(Z)), Z, Z**2]@b)))
xp = np.r_[xs, xt]; sp = np.r_[np.ones(ns), np.zeros(nt)]
pi = logit_fit(xp, sp)
pis = pi(xs)
odds_w = (1-pis)/pis                         # odds of non-participation  (transport to S=0)
pa = 0.5                                     # known randomisation probability
def ippw(a, normalise=True):
    m = (A==a); w = odds_w[m]/pa
    return (w*Y[m]).sum()/(w.sum() if normalise else nt)
ippw_est = ippw(1) - ippw(0)

# --- augmented (A-IPPW) for transportability: (1/nt) * sum_{S=1} w(Y - m_a(X)) + (1/nt) * sum_{S=0} m_a(X)
def aipw(a, ma):
    m = (A==a); w = odds_w[m]/pa
    return ( (w*(Y[m]-ma(xs[m]))).sum() + ma(xt).sum() ) / nt
aipw_est = aipw(1, m1) - aipw(0, m0)

# --- misspecified outcome model (ignore interaction) + correct weights  -> DR protects
def ols_main(X, y):
    X1 = np.c_[np.ones(len(X)), X]; b = np.linalg.lstsq(X1, np.r_[y], rcond=None)[0]; return lambda Z: np.c_[np.ones(len(Z)), Z]@b
mm = ols_main(xs, Y)   # pooled linear model without treatment interaction
mm1 = lambda Z: mm(Z) ; # same prediction for both arms -> effect 0 under OR
or_bad = 0.0
dr_bad = (( (odds_w[A==1]/pa)*(Y[A==1]-mm(xs[A==1])) ).sum()/nt) - (( (odds_w[A==0]/pa)*(Y[A==0]-mm(xs[A==0])) ).sum()/nt)
print("true PATE (target):", round(true_pate,3), "| true SATE (study):", round(sate_true,3))
print("naive study diff    :", round(naive,3))
print("outcome regression  :", round(or_est,3))
print("IPPW (normalised)   :", round(ippw_est,3))
print("A-IPPW (transport)  :", round(aipw_est,3))
print("OR with wrong model :", or_bad, "| A-IPPW with wrong OR, right weights:", round(dr_bad,3))
```

### Single-run output (seed 7)

```
true PATE (target): 0.6 | true SATE (study): 1.8
naive study diff    : 1.81
outcome regression  : 0.684
IPPW (normalised)   : 0.639
A-IPPW (transport)  : 0.667
OR with wrong model : 0.0 | A-IPPW with wrong OR, right weights: 0.66
```

### Monte Carlo summary (200 seeds, same design)

| Estimator | Mean | SD | Comment |
|---|---|---|---|
| Naive study difference (SATE) | 1.801 | 0.051 | external validity bias of +1.2 (the estimate is three times the truth) |
| Outcome regression (per-arm OLS, marginalized over target $X$) | 0.600 | 0.068 | lowest variance when the model class contains the truth |
| IPPW (normalized odds-of-participation weights) | 0.613 | 0.189 | no outcome model, but noisiest: extreme weights in the tail where the target has little study support |
| A-IPPW (transportability, correct outcome model) | 0.597 | 0.113 | residual correction cuts IPPW's SD by about 40% |
| A-IPPW, outcome model without treatment interaction (wrong), right weights | 0.604 | 0.120 | double robustness: outcome regression alone would return 0.0 |

Interpretation:
1. **Heterogeneity plus a selection imbalance create the bias.** Both ingredients are needed ([[Degtiar 2023 - Populations, Estimands and External Validity Bias]]). Setting the interaction coefficient to zero removes the bias for any selection imbalance.
2. **No free lunch on overlap.** The target mean is 1.5 sd below the study mean: on this design about 45% of target units fall outside the study's 5th-95th percentile selection-score range ([[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]]). The linear outcome model extrapolates well only because the truth is linear; with a nonlinear $\tau(x)$ the OR estimate would be biased while IPPW's weights would blow up, which is the empirical-positivity warning of Sec. 5.1.
3. **Variance ranking is design dependent.** OR is best when correct; A-IPPW trades a little variance for protection against model misspecification; IPPW needs no outcome model but pays in variance.

### Practical checklist derived from the run

| Step | Do |
|---|---|
| Diagnose | report SMD, selection-score overlap and generalizability index before estimating |
| Estimate | compute at least OR and A-IPPW; large disagreement signals misspecification or a positivity problem |
| Weights | normalize; inspect max weight and effective sample size; trimming changes the target |
| Uncertainty | bootstrap both samples (as the review notes the sandwich can be hard to compute) |
| Report | state the target population, the modifiers adjusted for, and the sensitivity of the result to unmeasured modifiers |

## Examples

> [!example] Reading the single-run output
> The geo test said "+1.81 per unit of treatment". The rollout population is lower on the modifier, so the transported number is about 0.6 to 0.7. A budget plan using 1.81 would overstate incremental return roughly threefold. The Pearl-Bareinboim alternative for a *discrete* modifier is the same reweighting in closed form: [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].

## Connections

- Estimator definitions: [[Degtiar 2023 - Weighting and Matching Methods]] (IPPW, odds weights), [[Degtiar 2023 - Outcome Regression Methods]], [[Degtiar 2023 - Doubly Robust and Combined Methods]] (A-IPPW).
- Experiment design and analysis: [[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]].
- Identification view of the same problem: [[Bareinboim 2016 - Transportability and Data Fusion]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
- [[Hierarchical Models]]
