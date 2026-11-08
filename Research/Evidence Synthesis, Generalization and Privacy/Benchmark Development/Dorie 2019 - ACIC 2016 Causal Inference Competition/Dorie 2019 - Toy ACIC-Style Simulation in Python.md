---
title: "Dorie 2019 - Toy ACIC-Style Simulation in Python"
tags:
  - source/ingested
  - topic/benchmarks
  - type/example
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Illustration of Secs. 4.3 and 6; not from the paper"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Simulation Design and Knobs]]"
  - "[[Dorie 2019 - Evaluation Metrics and Results by Method]]"
used_by:
  - "[[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]"
aliases:
  - ACIC toy simulation
  - Python ACIC-style DGP
---

# Dorie 2019 - Toy ACIC-Style Simulation in Python

> [!summary]
> A 60-line numpy-only miniature of the ACIC design: random nonlinear assignment and response functions with an alignment knob, an optional overlap-penalty corner, a SATT estimand, and three estimators (OLS main effects, IPTW-ATT with a logistic propensity score, flexible response-surface regression-adjustment). In a 200-replication run the flexible response-surface method has near-zero bias and far lower RMSE, qualitatively echoing the paper's headline. This is the note author's illustration, not the paper's DGP or numbers.

## Overview

The code is a deliberately simplified analogue. It follows the paper's factorisation $p(Y(1),Y(0),Z\mid X)=p(Y(1),Y(0)\mid X)\,p(Z\mid X)$ ([[Dorie 2019 - Simulation Design and Knobs]]), targets SATT, and reports bias and RMSE ([[Dorie 2019 - Evaluation Metrics and Results by Method]]). It does not implement the real covariates, 58 variables, step functions, Student-$t$ coefficients, the 77-setting grid, intervals or coverage.

## Main Content

```python
import numpy as np

def simulate(n=1000, p=6, nonlin=True, overlap_penalty=False, align=0.75, hetero=True, seed=None):
    r = np.random.default_rng(seed)
    X = r.normal(size=(n, p))
    a = r.normal(size=p) * 0.6                                   # assignment coefficients
    eta = X @ a + (0.5 * X[:, 0] ** 2 if nonlin else 0)          # assignment index
    keep = r.random(p) < align                                   # alignment knob: copy terms with prob `align`
    b = np.where(keep, a, r.normal(size=p) * 0.6)
    g = X @ b + (0.8 * X[:, 0] * X[:, 1] + 0.5 * X[:, 0] ** 2 if nonlin else 0)
    if overlap_penalty:                                          # force propensity ~ 0 in a corner
        eta = eta - 8.0 * ((X[:, 2] > 0.7) & (X[:, 3] > 0.7))
    e = 1 / (1 + np.exp(-(eta - np.median(eta))))                # ~50% treated before penalty
    Z = (r.random(n) < e).astype(float)
    tau = 0.7 + (0.4 * X[:, 1] if hetero else 0)                 # heterogeneity knob
    Y0 = g + r.standard_t(5, size=n) * 0.5                       # heavy-tailed noise
    Y1 = Y0 + tau
    Y = np.where(Z == 1, Y1, Y0)
    satt = (Y1 - Y0)[Z == 1].mean()                              # estimand known by construction
    return X, Z, Y, satt

def est_ols(X, Z, Y):
    D = np.column_stack([np.ones(len(Y)), Z, X])
    return np.linalg.lstsq(D, Y, rcond=None)[0][1]

def logit_fit(X, Z, iters=25):
    D = np.column_stack([np.ones(len(Z)), X]); w = np.zeros(D.shape[1])
    for _ in range(iters):
        p = 1 / (1 + np.exp(-D @ w)); W = p * (1 - p)
        w += np.linalg.solve(D.T @ (D * W[:, None]) + 1e-6 * np.eye(len(w)), D.T @ (Z - p))
    return 1 / (1 + np.exp(-D @ w))

def est_iptw_att(X, Z, Y):
    e = np.clip(logit_fit(X, Z), 1e-3, 1 - 1e-3)
    w = np.where(Z == 1, 1.0, e / (1 - e))                       # ATT weights
    return Y[Z == 1].mean() - np.average(Y[Z == 0], weights=w[Z == 0])

def feat(X):                                                     # quadratics + pairwise products
    n, p = X.shape; cols = [X, X ** 2]
    cols += [(X[:, i] * X[:, j])[:, None] for i in range(p) for j in range(i + 1, p)]
    return np.column_stack(cols)

def est_flexible_ra(X, Z, Y):                                    # fit control surface, impute Y(0) for treated
    F = np.column_stack([np.ones(len(Y)), feat(X)])
    beta = np.linalg.lstsq(F[Z == 0], Y[Z == 0], rcond=None)[0]
    return (Y[Z == 1] - F[Z == 1] @ beta).mean()

methods = {"OLS main effects": est_ols, "IPTW-ATT (logit)": est_iptw_att, "Flexible RA": est_flexible_ra}
res = {m: [] for m in methods}
for s in range(200):
    X, Z, Y, satt = simulate(seed=s)
    for m, f in methods.items():
        res[m].append(f(X, Z, Y) - satt)
for m, e in res.items():
    e = np.array(e); print(f"{m:20s} bias={e.mean():+.3f}  RMSE={np.sqrt((e**2).mean()):.3f}")
```

> [!example] Observed output (200 replications, seeds 0-199, default knobs)
> | Estimator | Bias | RMSE |
> |---|---|---|
> | OLS main effects | +0.367 | 0.394 |
> | IPTW-ATT (logistic, first-order terms) | +0.427 | 0.477 |
> | Flexible RA (control surface with quadratics and pairwise products, impute for treated) | +0.001 | 0.068 |
>
> **Interpretation.** With a quadratic and interaction response surface and a nonlinear assignment mechanism, the two misspecified estimators (linear outcome, linear-logit propensity) are badly biased, while the flexible response-surface regression-adjustment is nearly unbiased. This mirrors the paper's qualitative finding that flexible response-surface modelling is the most reliable choice; it says nothing about the paper's specific numbers. Setting `overlap_penalty=True` or `align=0.25` lets you explore the other knobs.
^ex-toy-acic-results

> [!definition] Mapping code to paper concepts
> | Code | Paper concept |
> |---|---|
> | `align` | Alignment knob: probability an assignment term is copied to the response |
> | `nonlin` | Degree of nonlinearity (polynomial terms and an interaction in response) |
> | `overlap_penalty` | Overlap knob: large negative term forcing propensity near zero in a corner |
> | `hetero` | Treatment-effect heterogeneity: effect varies with $x_2$ |
> | `satt` | Estimand: SATT, known exactly from simulated potential outcomes |
> | `est_flexible_ra` | Response-surface-only method (T-learner-like, as BART/calCause for controls) |
> | `est_iptw_att` | Assignment-only method with ATT weights |
^def-toy-code-mapping

## Examples

> [!example] Stress the overlap knob
> **Setup.** Re-run with `simulate(..., overlap_penalty=True)` and compare RMSE.
> **Expectation (not verified here).** Methods that extrapolate the response model into the penalised corner are most at risk; because the SATT only needs controls similar to treated, the corner's controls are unneeded, as discussed in [[Dorie 2019 - Estimands, Ignorability and Design Choices]]. Run it and record results before drawing conclusions.
^ex-toy-overlap

## Connections

- Planning and reporting a simulation as aims, DGM, estimands, methods, performance: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- Estimator families used above: [[Propensity Score Matching - Overview]], [[Bayesian Inverse Probability Weighting]], [[Metalearners for CATE]].
- Marketing use: [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Simulation Design and Knobs]]
