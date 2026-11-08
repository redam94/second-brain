---
title: "Rosenman 2020 - Simulation Results"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Sec. 6-7, pp. 15-22; Figs. 1-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]]"
  - "[[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]]"
used_by: []
aliases:
  - Rosenman simulation design
  - risk reduction relative to RCT-only
  - shrinkage conclusions and extensions
---

# Rosenman 2020 - Simulation Results

> [!summary]
> In a simulation with $n_o=10{,}000$ observational and $n_r=1{,}000$ RCT units, $K=6$ or $20$ strata, and strong unmeasured confounding, every shrinkage estimator beats the RCT-only estimate. Without bias adjustment the gain is small (about 1% risk reduction for $K=6$, 5% for $K=20$) because $\hat\tau_o$ is very biased; with stabilised IPW the gain is about 25% ($K=6$) and 40% ($K=20$), close to the oracle at $K=20$. Common-shrinkage estimators usually beat component-wise ones; Green-Strawderman's $\delta_1$ is slightly more robust when covariate distributions differ.

## Overview

The paper reports only percent risk-reduction plots (Figs. 1-4), not tables, so the numbers below are the textual claims.

## Main Content

### Design (Sec. 6.1; patterned on Rosenman et al. 2018)
- $X_i\in\mathbb R^3$, $\Sigma$ sampled with unit variances and off-diagonals 0 (prob. 1/2) or $\pm0.1$ (prob. 1/4 each), roughly matching the Women's Health Initiative covariance structure. $X_i\sim N(0,\Sigma)$.
- Unmeasured covariate $U_i=\tfrac13\mathbf 1^TX_i+\eta_i$, $\eta_i\sim N(0,1/4)$ (correlated with measured covariates).
- Control outcome $Y_i(0)=X_i^T\beta+U_i+\varepsilon_i$, $\beta=(1,1,1)^T$, $\varepsilon_i\sim N(0,1)$.
- Treatment effect varies only with the second covariate $X_{i2}$. Strata from quantiles of its normal distribution: $K=6$ ("few strata") and $K=20$ ("many"), equal-size or variable-size (first half of strata have about $2/(3K)$ of the units each, second half $4/(3K)$) to make $\hat\tau_r$ homoscedastic vs heteroscedastic. Stratum effects $\sim U(0,1)$, rescaled so Cohen's $d=0.2$ in the observational study ("weak" effect).
- 25 covariate/potential-outcome draws $\times$ 20 treatment draws = 500 simulations.
- Observational treatment: $p_i=1/(1+e^{-\gamma^TX_i+U_i})$ with $\beta=\gamma$ (high selection bias; because $p_i$ depends on $U_i$ IPW cannot remove it). RCT: half of each stratum randomly treated.
- Estimators: $\kappa_{1+},\kappa_{1+}^*,\kappa_{2+},\kappa_{2+}^*$; Green-Strawderman $\delta_1,\delta_2$; an **oracle** convex combination with true $\lambda_{opt}$. Metric: percent risk reduction vs $\hat\tau_r$, risk estimated as average loss with $d_k=n_{ok}/n_o$.

### Results

| Condition | Observational estimator | Typical risk reduction vs $\hat\tau_r$ | Notes |
|---|---|---|---|
| Same covariate distributions (Fig. 1) | unadjusted | about 1% ($K=6$), 5% ($K=20$) | $\text{risk}(\hat\tau_o)\approx50\times$ ($K=6$), $15\times$ ($K=20$) the risk of $\hat\tau_r$; about half the oracle's gain for few strata; winners: $\delta_1$ (6 strata, similar size), $\kappa_{1+}^*$ (6 strata, variable), $\kappa_{1+}$ (20, similar), $\kappa_{1+}^*$ (20, variable); $\delta_2$ lags |
| Same distributions (Fig. 2) | SIPW | about 25% ($K=6$), 40% ($K=20$) | $\hat\tau_o$'s risk is only about 40% above $\hat\tau_r$'s ($K=6$) and almost identical ($K=20$); estimators near oracle at $K=20$; $\delta_1$ best for 6 strata/similar size, $\kappa_{1+}^*$ best for 20/similar, $\kappa_{1+}$ best in the variable-size cases |
| Different covariate means in $O$ (obs. mean vector drawn $U(-1/2,1/2)^3$) (Fig. 3) | unadjusted | all degrade vs oracle | Green-Strawderman do better: $\delta_1$ best in first three conditions, $\kappa_{2+}^*$ best in 20-strata variable-size |
| Different covariate means (Fig. 4) | SIPW | similar to Fig. 2 pattern | $\delta_1$ modestly ahead of $\kappa_{1+}^*$ in every condition |

General findings: all proposed estimators beat the RCT-only estimator under every tested condition and also beat the observational-only estimator in risk; estimators with a single shrinkage factor ("1" subscript) tend to outperform component-wise ones; more strata gets closer to the oracle (the asymptotics in $K$).

### Conclusion and extensions (Sec. 7)
Summary: a procedure to derive shrinkage estimators from a URE; two estimators and their corrected versions with testable finite-$K$ conditions and asymptotic optimality; sensitivity link via Zhao et al. Extensions suggested: other shrinkage structures (the procedure is general); use auxiliary information to guess which strata are most biased and shrink less there; a **thresholding rule** that uses $\hat\tau_{rk}$ alone when it differs from $\hat\tau_{ok}$ by more than $\Delta$; weaken the assumptions (well-defined shared strata, equal effects within strata), guidance on choosing strata (many accurate subgroups vs few stable ones; minimum four strata, more if heteroscedastic or weights differ), and robustness measures to violations of Assumption 2.

## Examples

```python
# Re-run a miniature version of the simulation logic: oracle vs kappa_1+ vs RCT-only (diagonal case)
import numpy as np
rng = np.random.default_rng(1)
def run(K=20, bias_sd=0.1, sr=0.2, so=0.02, reps=3000):
    out = np.zeros((reps, 4))
    for r in range(reps):
        tau = rng.uniform(0, 1, K); xi = rng.normal(0, bias_sd, K)
        tr = tau + rng.normal(0, sr, K); to = tau + xi + rng.normal(0, so, K)
        lam = min(sr**2 / max(((to - tr)**2).mean(), 1e-12), 1.0)
        k1 = tr - lam*(tr - to)
        lam_or = sr**2 / (sr**2 + so**2 + (xi**2).mean()); orc = tr - lam_or*(tr - to)
        out[r] = [((tr-tau)**2).mean(), ((to-tau)**2).mean(), ((k1-tau)**2).mean(), ((orc-tau)**2).mean()]
    return out.mean(0)      # RCT, OBS, kappa_1+, oracle
print(run())
```
Output of this miniature ($K=20$, bias SD 0.1, 3,000 reps; mean squared error per stratum): RCT-only 0.0399, observational-only 0.0105, $\kappa_{1+}$ 0.0100, oracle 0.0082. The data-driven weight recovers most of the oracle's gain without knowing $\xi$.

## Connections

- Marketing reading: the SIPW result (bias reduction by propensity adjustment matters more than the choice among shrinkers) matches the practice of grading propensity-adjusted brand-lift estimates against experiments; see [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]].
- Hierarchical Bayesian analogue: [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]].

## See Also

[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
