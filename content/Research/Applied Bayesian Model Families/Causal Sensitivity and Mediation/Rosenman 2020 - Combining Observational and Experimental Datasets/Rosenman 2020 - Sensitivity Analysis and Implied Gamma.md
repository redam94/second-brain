---
title: "Rosenman 2020 - Sensitivity Analysis and Implied Gamma"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Sec. 5.1-5.2, pp. 13-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]]"
used_by:
  - "[[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]]"
aliases:
  - implied Gamma
  - marginal sensitivity model for shrinkage
  - Zhao Small Bhattacharya sensitivity
---

# Rosenman 2020 - Sensitivity Analysis and Implied Gamma

> [!summary]
> The shrinkage estimator implicitly asserts how biased the observational estimate is. To make that assertion interpretable, the paper maps it to the single-parameter marginal sensitivity model of Zhao, Small & Bhattacharya (2019), in which $\Gamma\ge1$ bounds the odds ratio between the true and estimated treatment probabilities. A binary search finds the **implied $\Gamma$**: the $\Gamma$ whose worst-case bias and variance give the same shrinkage factor as the data-driven $\lambda_{1+}$. If $\Gamma_{imp}$ is implausibly small (say 1.01), the estimator leans on $\hat\tau_o$ more than the analyst believes is warranted.

## Overview

Recall $\lambda_{opt}=\text{Tr}(\Sigma_rD)/\{\text{Tr}(\Sigma_rD)+\text{Tr}(\Sigma_oD)+\xi^TD^2\xi\}$. The shrinkage estimator estimates the denominator from the discrepancy of the two estimates. Sensitivity analysis offers an alternative: postulate the level of unmeasured confounding in each stratum, compute worst-case bias and variance, and plug these "maximally pessimistic" values into $\lambda_{opt}$. That would ignore the parallel RCT/observational estimates and translate untestable confounding assumptions into a conservative trade-off.

## Main Content

> [!definition] Marginal sensitivity model with parameter $\Gamma$ (Zhao et al. 2019)
> An extension of Rosenbaum's (1987) sensitivity model in which $\Gamma\ge1$ bounds the odds ratio of the true treatment probability and the estimated treatment probability for every unit in the observational study: $\Gamma^{-1}\le\frac{\text{odds}(p_i^{true})}{\text{odds}(\hat p_i)}\le\Gamma$. $\Gamma=1$ means no unmeasured confounding; larger $\Gamma$, larger deviations. For SIPW estimators the worst-case (extreme) estimates under $\Gamma$ solve a **linear fractional programme**; confidence intervals use a percentile bootstrap.
^def-marginal-sensitivity

(The odds-ratio form is the standard statement of the model; the PDF gives the verbal description.)

### Estimating implied $\Gamma$ (Sec. 5.2)
With estimated shrinkage $\lambda_{1+}=1-\left(1-\dfrac{a_1^*\text{Tr}(\Sigma_rD)}{(\hat\tau_o-\hat\tau_r)^TD(\hat\tau_o-\hat\tau_r)}\right)_+$.

For a posited $\Gamma$ and each stratum $k$:
1. Solve the linear fractional programme for the lower and upper extremes of $\hat\tau_{ok}$ consistent with the stratum's data and the model.
2. Bias estimates: subtract the point estimate and take absolute values to get $\widehat{\text{Bias}}_{lk}(\Gamma)$ and $\widehat{\text{Bias}}_{rk}(\Gamma)$.
3. Bootstrap the observational units within the stratum, recompute extremes per replicate, and use the variance across replicates for each bound: $\widehat{\text{Var}}_{lk}(\Gamma),\widehat{\text{Var}}_{rk}(\Gamma)$.
4. Take the worse bound:
$$
d_k^2\widehat{\text{Bias}}_k^2(\Gamma)+d_k\widehat{\text{Var}}_k(\Gamma)=\max\{d_k^2\widehat{\text{Bias}}^2_{lk}+d_k\widehat{\text{Var}}_{lk},\ d_k^2\widehat{\text{Bias}}^2_{rk}+d_k\widehat{\text{Var}}_{rk}\}.
$$
5. Plug into $\lambda_{opt}$ to get $\lambda(\Gamma)$.

> [!definition] Implied $\Gamma$ algorithm (shared $\Gamma$ across strata)
> 1. Compute $\lambda_{1+}$ from the data. 2. Binary-search $\Gamma$ until $|\lambda_{1+}-\lambda(\Gamma)|<\epsilon$. Return $\Gamma_{imp}$. (Randomness from the bootstrap; many replicates and a sensible tolerance give fast convergence.)
^def-implied-gamma

**Using it.** If $\Gamma_{imp}$ matches the analyst's intuition about confounding the analysis can proceed. If unreasonably small (e.g. 1.01), the analyst can (a) use $\hat\tau_r$ alone, or (b) reverse the process: pick a reasonable $\Gamma$, compute $\lambda(\Gamma)$ and use $\lambda(\Gamma)\hat\tau_r+(1-\lambda(\Gamma))\hat\tau_o$.

## Examples

```python
import numpy as np
def lam_opt(sigma2_r, sigma2_o, xi, d):
    """Oracle weight on the RCT: Tr(Sr D) / (Tr(Sr D) + Tr(So D) + xi' D^2 xi), diagonal case with D = diag(d)/K."""
    D = d / len(d)
    tr_r, tr_o = (sigma2_r * D).sum(), (sigma2_o * D).sum()
    return tr_r / (tr_r + tr_o + ((D * xi) ** 2).sum())
# lambda(Gamma): replace xi with the worst-case bias (and sigma2_o with the bootstrap variance) under Gamma, then
# binary-search Gamma so that lam_opt(...) matches the data-driven lambda_{1+}.
print(lam_opt(np.full(6, .04), np.full(6, .0004), np.full(6, 0.1), np.ones(6)))
```
(Illustrative only: the worst-case bias under $\Gamma$ requires the Zhao et al. linear-fractional solver, which is not reimplemented here.)

> [!example] Interpreting $\Gamma_{imp}$ for an ad programme
> Suppose a platform's holdout tests and its propensity-weighted observational lift disagree little, so $\kappa_{1+}$ puts 90% weight on the observational estimate. If the implied $\Gamma$ is 1.02, the analyst is effectively asserting that unmeasured targeting shifts exposure odds by at most 2%, a claim most advertisers would not make for retargeted audiences; the right response is to widen the RCT weight, as in option (b).

## Connections

- Bayesian counterpart: instead of a worst-case $\Gamma$, put a prior on the bias and let a hierarchical model decide the weight, [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]].
- Different parameterisations of "how strong is hidden confounding": [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] (partial $R^2$), [[Franks 2019 - Calibrating Sensitivity Parameters]] (selection slope), and the E-value discussed in [[Sensitivity Analysis in Observational Studies]].

## See Also

[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
