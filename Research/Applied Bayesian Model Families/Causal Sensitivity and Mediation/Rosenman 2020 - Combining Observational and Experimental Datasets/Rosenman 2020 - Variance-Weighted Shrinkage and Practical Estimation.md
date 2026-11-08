---
title: "Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Sec. 4.3-4.4, pp. 11-13; Lemma 3; Theorem 3; Appendix 9 (Lemma 6), pp. 28-29"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]]"
used_by:
  - "[[Rosenman 2020 - Sensitivity Analysis and Implied Gamma]]"
aliases:
  - kappa 2 estimator
  - variance-weighted shrinkage
  - stabilized IPW estimator
  - propensity score adjustment in data fusion
---

# Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation

> [!summary]
> Letting the shrinkage factor scale with each stratum's RCT variance gives $\kappa_2=\hat\tau_r-\lambda_2^{URE}\Sigma_r(\hat\tau_r-\hat\tau_o)$: noisy RCT strata lean on the observational data, precise ones do not. The same procedure gives dominance (Lemma 3) and asymptotic optimality (Theorem 3). In practice, variances come from within-arm sample variances (biased upward under treatment-effect heterogeneity), and the observational estimate should use stabilised IPW to cut bias at little variance cost.

## Overview

$\kappa_2$ is the heteroscedastic analogue of $\kappa_1$: component-wise rather than common shrinkage. It tends to over- or under-shrink some strata when variance estimates are off, which is why the simulations find common shrinkage ($\kappa_1$ family) usually wins.

## Main Content

> [!definition] $\kappa_2$ family (Sec. 4.3)
> Structure $\kappa(\lambda\Sigma_r,\hat\tau_r,\hat\tau_o)=\hat\tau_r-\lambda\Sigma_r(\hat\tau_r-\hat\tau_o)$. Minimising the URE:
> $$\lambda_2^{URE}=\frac{\text{Tr}(\Sigma_r^2D)}{(\hat\tau_o-\hat\tau_r)^T\Sigma_r^2D(\hat\tau_o-\hat\tau_r)},\quad\kappa_2=\hat\tau_r-\frac{\text{Tr}(\Sigma_r^2D)\,\Sigma_r}{(\hat\tau_o-\hat\tau_r)^T\Sigma_r^2D(\hat\tau_o-\hat\tau_r)}(\hat\tau_r-\hat\tau_o),$$
> $$\kappa_{2+}=\hat\tau_o+\left[I_K-\frac{\text{Tr}(\Sigma_r^2D)\Sigma_r}{(\hat\tau_o-\hat\tau_r)^T\Sigma_r^2D(\hat\tau_o-\hat\tau_r)+}\right](\hat\tau_r-\hat\tau_o),$$
> and corrected $\kappa_{2+}^*$ with scale $a_2^*=1-\dfrac{2(\hat\tau_o-\hat\tau_r)^T\Sigma_r^4D^2(\hat\tau_o-\hat\tau_r)}{(\hat\tau_o-\hat\tau_r)^T\Sigma_r^2D(\hat\tau_o-\hat\tau_r)}\cdot\dfrac1{\text{Tr}(\Sigma_rD)}$. (Exact positive-part placement as printed; the PDF extraction of the "+" subscript is ambiguous.)
^def-kappa2

> [!theorem] Lemma 3 (dominance)
> If $4\max_kd_k^2\sigma_{rk}^4\le\sum_kd_k^2\sigma_{rk}^4$ then $\kappa_2$ dominates $\hat\tau_r$. Proof by the same argument as Lemma 1.
^lem-dominance-kappa2

> [!theorem] Theorem 3 ($\kappa_2$ asymptotic risk)
> Under mild conditions, as $K\to\infty$ $\kappa_2$ has the lowest risk among all estimators with a variance-weighted shrinkage factor. Proof (Appendix 9) parallels Theorem 2 with stronger moment conditions (Lemma 6): $\limsup\frac1K\sum_kd_k^2\sigma_{rk}^6\xi_k^2<\infty$, $\limsup\frac1K\sum_kd_k^2\sigma_{rk}^6\sigma_{ok}^2<\infty$, $\limsup\frac1K\sum_kd_k^2\sigma_{rk}^8<\infty$.
^thm-kappa2-asymptotic

### Variance estimation (Sec. 4.4.1)
$\Sigma_r$ is unknown; following Green et al. (2005) replace it by
$$\hat\sigma_{rk}^2=\frac1{n_{rkt}}\sum_{i\in R_k}W_i(Y_i-\bar Y_{rkt})^2+\frac1{n_{rkc}}\sum_{i\in R_k}(1-W_i)(Y_i-\bar Y_{rkc})^2$$
(as printed in the paper; the Neyman variance estimator has $1/\{n(n-1)\}$ factors for each arm, i.e. $s_t^2/n_{rkt}+s_c^2/n_{rkc}$, so treat the printed normalisation as shorthand), with $\bar Y_{rkt},\bar Y_{rkc}$ the arm means. It is unbiased under Assumption 2 (constant effect within stratum). If effects are heterogeneous within strata it overestimates the variance (Imbens & Rubin 2015), which for $\kappa_{1+}$ yields too much shrinkage toward $\hat\tau_o$ (the factor is linear in $\text{Tr}(\Sigma_rD)$) and for $\kappa_{2+}$ may over-shrink some and under-shrink others. Mitigations: smaller strata (so Assumption 2 is likelier), or a "menu" of estimators computed under various assumed potential-outcome correlations (correlation 1 = Assumption 2; Imbens & Rubin Chapter 6).

### Propensity adjustment (Sec. 4.4.2)
Because the observational study is typically much larger, adjusting by the estimated propensity score is good practice (bias drops, variance rise is modest). If strata are $K$ treatments fit a propensity model per arm; if subgroups, one model for all of $O$.

> [!definition] Stabilised IPW (SIPW) estimator of stratum $k$
> $$\hat\tau_{ok}=\left(\sum_{i\in O_k}\frac{W_i}{\hat p_i}\right)^{-1}\sum_{i\in O_k}\frac{W_iY_i}{\hat p_i}-\left(\sum_{i\in O_k}\frac{1-W_i}{1-\hat p_i}\right)^{-1}\sum_{i\in O_k}\frac{(1-W_i)Y_i}{1-\hat p_i}$$
> (Horvitz-Thompson with normalised weights). It admits the Zhao et al. (2019) sensitivity analysis used in [[Rosenman 2020 - Sensitivity Analysis and Implied Gamma]].
^def-sipw

## Examples

```python
import numpy as np
def sipw_ate(y, w, p_hat):
    """Stabilised (self-normalised) IPW estimate of the treatment effect within one stratum."""
    w1 = w / p_hat; w0 = (1-w) / (1-p_hat)
    return (w1*y).sum()/w1.sum() - (w0*y).sum()/w0.sum()

def kappa2_plus(tau_r, tau_o, sigma2_r, d=None):
    K = len(tau_r); d = np.ones(K) if d is None else d; D = d/K
    num = (sigma2_r**2 * D).sum()
    den = max(((tau_o-tau_r)**2 * sigma2_r**2 * D).sum(), 1e-12)
    lam = num/den
    shrink = np.clip(lam*sigma2_r, 0, 1)             # component-wise weight toward tau_o
    return tau_r - shrink*(tau_r - tau_o)
```

## Connections

- Marketing: the "strata" can be campaigns, each with a holdout lift test (noisy) and a propensity-based estimate (precise but biased); noisier holdouts borrow more from the observational estimate, as in [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]].
- Propensity machinery: [[Propensity Score and the Balancing Property]], [[Propensity Score in Bayesian CI]].

## See Also

[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
