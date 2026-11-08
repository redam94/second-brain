---
title: "Imai 2010 - Bayesian Mediation Sketch for Halo Effects"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Sec. 7, pp. 16-17 (concluding remarks); synthesis of Sec. 3-5 for a Bayesian marketing model, not a paper section"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]]"
  - "[[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]"
used_by: []
aliases:
  - Bayesian causal mediation halo effect
  - counterfactual propagation from posterior draws
  - mediation limitations and future directions
---

# Imai 2010 - Bayesian Mediation Sketch for Halo Effects

> [!summary]
> The paper's limitations (no post-treatment confounders, single mediator, no measurement error, mediation relying on scientific theory) and its identification result translate directly into a Bayesian recipe: fit a joint mediator-outcome model, then compute $\delta(t)$ and $\zeta(t)$ by pushing each posterior draw through the counterfactual mediator. This note sketches that recipe for the "does Meta work through branded search?" question (E35) and flags where sequential ignorability is least credible in marketing data. *Concept note: the PyMC code is untested and not from the paper.*

## Overview

**Concluding remarks and limitations (Sec. 7).**
1. A new identification condition, interpretable and weaker than some existing ones in some settings.
2. LSEM estimates have valid causal interpretations under Assumption 1, giving a basis to audit past Baron-Kenny studies. "Over twenty years later, the work of Baron and Kenny has come full circle."
3. Simple nonparametric estimators; 4. a parametric sensitivity analysis. "We view sensitivity analysis as an essential part of causal mediation analysis because the assumptions required for identifying causal mediation effects are unverifiable and often are not justified in applied settings."
- Mediation depends on **background scientific theory**: whether $M$ mediates $T$'s effect on $Y$ or vice versa depends on the investigator's belief (the H1N1 example). Causal mediation can be "uncomfortably far from a completely data-oriented approach".
- **Future work:** nonlinear sensitivity; multiple mediators (competing causal pathways); measurement error in the mediator; post-treatment confounding of $M$-$Y$ (not allowed by Assumption 1); new experimental designs (Imai, Tingley & Yamamoto 2009) that weaken the assumptions.

## Main Content

### Mapping the paper to the halo-effect question (E35)
| Paper object | Marketing object |
|---|---|
| $T_i$ | Meta spend (or a binary lift-test arm) in geo/week $i$ |
| $M_i$ | branded-search clicks (count) |
| $Y_i$ | new customers (count) |
| $X_i$ | pre-treatment controls: seasonality, Google spend, price, region |
| $\bar\delta(t)$ | halo of Meta that runs through search, holding Meta at $t$ |
| $\bar\zeta(t)$ | direct effect of Meta not routed through search |
| Asm. (5) | no unmeasured cause of both search clicks and customers, given spend and $X$ (violated by brand demand, PR, promotions) |
| "search as control" vs "search left out" | controlling for $M$ gives only $\zeta$-like quantity (a *controlled/direct* effect); omitting $M$ gives the total effect $\tau$ |

Post-treatment confounding is a real threat: e.g. a promotion launched alongside Meta also drives search, and cannot be conditioned on under Assumption 1. The $\rho$ analysis covers only pre-treatment confounders.

### Bayesian estimation by counterfactual propagation (Eq. 20 with posterior draws)
For each posterior draw $\theta^{(s)}$ of a joint model $p(M|T,X;\theta_M)\,p(Y|M,T,X;\theta_Y)$:
1. Draw (or take the mean of) $M^{(s)}(1)$ and $M^{(s)}(0)$ for each unit from the mediator model.
2. Compute $\delta^{(s)}_i(t)=E[Y|M^{(s)}(1),t,X_i;\theta_Y^{(s)}]-E[Y|M^{(s)}(0),t,X_i;\theta_Y^{(s)}]$ (plug-in) or average Monte Carlo outcome draws.
3. Average over units for $\bar\delta^{(s)}(t)$, repeat over $s$ to get the posterior of the ACME, and similarly for $\bar\zeta^{(s)}(t)$; check $\bar\tau^{(s)}=\bar\delta^{(s)}(t)+\bar\zeta^{(s)}(1-t)$.
4. Product-of-coefficients check: in linear models $\beta_2\gamma$ should match the propagated draws (Theorem 2).

```python
# PyMC 5 sketch (UNTESTED): joint negative-binomial mediator/outcome with spend as treatment.
import numpy as np, pymc as pm

def build(spend, search, new_cust, X):
    with pm.Model() as m:
        a_m = pm.Normal("a_m", 0, 2); b_m = pm.Normal("b_m", 0, 0.5)       # spend -> search (log link)
        g_m = pm.Normal("g_m", 0, 0.5, shape=X.shape[1]); phi_m = pm.Exponential("phi_m", 0.1)
        mu_m = pm.math.exp(a_m + b_m*spend + pm.math.dot(X, g_m))
        pm.NegativeBinomial("search", mu=mu_m, alpha=phi_m, observed=search)

        a_y = pm.Normal("a_y", 0, 2); b_y = pm.Normal("b_y", 0, 0.5)       # direct effect of spend
        c_y = pm.Normal("c_y", 0, 0.5)                                      # search -> customers (mediator effect)
        g_y = pm.Normal("g_y", 0, 0.5, shape=X.shape[1]); phi_y = pm.Exponential("phi_y", 0.1)
        mu_y = pm.math.exp(a_y + b_y*spend + c_y*pm.math.log1p(search) + pm.math.dot(X, g_y))
        pm.NegativeBinomial("cust", mu=mu_y, alpha=phi_y, observed=new_cust)
    return m

def acme_from_draws(idata, X, s1, s0, rng=np.random.default_rng(0)):
    """Counterfactual propagation: s1/s0 are the two spend levels; returns posterior of delta(s1) and zeta(s0)."""
    P = idata.posterior.stack(s=("chain", "draw"))
    out = []
    for k in range(P.sizes["s"]):
        mu_m = lambda s: np.exp(P.a_m.values[k] + P.b_m.values[k]*s + X @ P.g_m.values[:, k])
        ey   = lambda s, mm: np.exp(P.a_y.values[k] + P.b_y.values[k]*s + P.c_y.values[k]*np.log1p(mm) + X @ P.g_y.values[:, k])
        m1, m0 = mu_m(s1), mu_m(s0)                    # plug-in mediator means (swap for NB draws for Monte Carlo)
        delta = (ey(s1, m1) - ey(s1, m0)).mean()       # indirect effect holding spend at s1
        zeta  = (ey(s1, m0) - ey(s0, m0)).mean()       # direct effect holding mediator at its s0 value
        out.append((delta, zeta))
    return np.array(out)
```

Notes on the sketch: with log links the "product of coefficients" is a first-order approximation (the paper's Theorem 2 is for linear models), so the propagated estimate is the object of interest; $\text{E}[Y|M]$ is a nonlinear function of the mediator so Assumption 2 (no interaction) generally fails on the count scale.

### Sensitivity in the Bayesian setting
$\rho$ is not identified, so its posterior equals its prior. Two defensible options: (a) a **grid** over $\rho$ using a Gaussian copula or correlated latent errors linking the mediator and outcome models, reporting the ACME posterior per $\rho$; (b) a **prior** on $\rho$ (e.g. $\text{Beta}$-shifted, centred at 0 with scale from domain knowledge), then marginalising, which makes the unidentified part explicit in the final interval. This is the same stance as in [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]]. In the linear case the closed form of Theorem 4 can be used on each draw.

## Examples

> [!example] Reading a halo result
> Suppose the posterior of $\bar\delta(1)$ (Meta at a high level vs. none, through search) has median 120 customers/week and 90% interval $[40,210]$, and $\bar\zeta(0)$ has median 300. The halo is then about $120/(120+300)\approx29\%$ of the total. If $\rho$-sensitivity shows the interval covers zero only for strongly negative confounding, the claim "Meta works partly through search" is robust to plausible unmeasured positive confounding such as brand-demand shocks. Numbers here are illustrative, not from E35.

## Connections

- Complements [[Instrumental Variables and Principal Stratification]] and [[Intent-to-Treat, PSA and Ghost Ad Designs]] for experiment-based identification of the total effect that mediation splits.
- Priors and adstock/saturation in the outcome model: [[Bayesian Estimation and Priors for MMM]].
- Hierarchical extensions across brands/geos: [[Hierarchical Models]].

## See Also

[[Imai 2010 - Causal Mediation Analysis - Overview]], [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]
