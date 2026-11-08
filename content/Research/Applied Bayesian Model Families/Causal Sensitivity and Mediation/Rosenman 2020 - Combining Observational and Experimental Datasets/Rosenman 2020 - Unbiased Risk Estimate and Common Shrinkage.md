---
title: "Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Sec. 4.1-4.2, pp. 6-10; Theorems 1-2; Lemmas 1-2; Appendix 8 (Lemmas 4-5), pp. 25-28"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[Rosenman 2020 - Setup Assumptions and Bias Structure]]"
used_by:
  - "[[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]]"
  - "[[Rosenman 2020 - Sensitivity Analysis and Implied Gamma]]"
aliases:
  - kappa 1 estimator
  - common shrinkage factor
  - generalized Stein unbiased risk estimate
  - oracle shrinkage factor lambda opt
---

# Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage

> [!summary]
> Generalising Stein's unbiased risk estimate to heteroscedastic, weighted loss gives the risk of any estimator $\kappa=Z+\Sigma g$ in closed form. Minimising the URE over a single shrinkage factor yields $\kappa_1=\hat\tau_r-\lambda_1^{URE}(\hat\tau_r-\hat\tau_o)$ with $\lambda_1^{URE}=\text{Tr}(\Sigma_rD)/\{(\hat\tau_o-\hat\tau_r)^TD(\hat\tau_o-\hat\tau_r)\}$. It dominates the RCT-only estimator whenever $4\max_kd_k\sigma_{rk}^2\le\sum_kd_k\sigma_{rk}^2$ (so $K\ge4$), and its positive-part version is asymptotically optimal among common-factor shrinkers as $K\to\infty$.

## Overview

Procedure used for every estimator in the paper:
1. Posit a structure for the shrinkage estimator.
2. Derive the shrinkage factor by optimising the URE assuming the factor is known ("base" estimator).
3. Optionally correct for the extra risk from estimating the factor from the data.

## Main Content

> [!theorem] Theorem 1 (estimator risk; generalisation of Strawderman et al. 2003, Thm 3.1)
> Let $Z\sim N(\theta,\Sigma)$ with $\Sigma=\text{diag}(\sigma_1^2,\dots,\sigma_K^2)$, $Y$ a random vector, $D=\frac1K\text{diag}(d_1,\dots,d_K)$, $L(\theta,v)=(v-\theta)^TD(v-\theta)$ and $\kappa(Z,Y)=Z+\Sigma g(Z,Y)$ with $g$ differentiable in $Z$ and $E\|g\|^2<\infty$. Then
> $$
> R(\theta,\kappa)=\text{Tr}(\Sigma D)+E\left[\sum_k\sigma_k^4D_{kk}\left(g_k^2(Z,Y)+2\frac{\partial g_k(Z,Y)}{\partial Z_k}\right)\right],\qquad D_{kk}=d_k/K.
> $$
^thm-risk

*Proof.* Fix $Y=y$ and apply Theorem 3.1 of Strawderman et al. (2003) to $g^{(y)}(Z)=g(Z,y)$; then use the tower rule, $E[R(\theta,\kappa(Z,Y))]=E[E(R(\theta,\kappa(Z,y))|Y=y)]$. (In the paper the $1/K$ is displayed outside; it is absorbed into $D$ here.)

Dropping the expectation gives the **generalised Stein unbiased risk estimate**
$$
\text{URE}(\theta,\kappa(Z,Y))=\text{Tr}(\Sigma D)+\sum_k\sigma_k^4D_{kk}\left(g_k^2+2\,\partial g_k/\partial Z_k\right).
$$

### The estimator $\kappa_1$ (common shrinkage, Sec. 4.2)
Structure: $\kappa(\lambda,\hat\tau_r,\hat\tau_o)=\hat\tau_r-\lambda(\hat\tau_r-\hat\tau_o)$. For fixed $\lambda$ (Eq. 1):
$$
\text{URE}=\text{Tr}(\Sigma_rD)+\lambda^2(\hat\tau_o-\hat\tau_r)^TD(\hat\tau_o-\hat\tau_r)-2\lambda\text{Tr}(\Sigma_rD).
$$
Strictly convex in $\lambda$ if $\hat\tau_r\neq\hat\tau_o$; minimiser

> [!definition] $\kappa_1$ and $\kappa_{1+}$
> $$
> \lambda_1^{URE}=\frac{\text{Tr}(\Sigma_rD)}{(\hat\tau_o-\hat\tau_r)^TD(\hat\tau_o-\hat\tau_r)},\qquad\kappa_1=\hat\tau_r-\lambda_1^{URE}(\hat\tau_r-\hat\tau_o),\qquad\kappa_{1+}=\hat\tau_o+\left(1-\lambda_1^{URE}\right)_+(\hat\tau_r-\hat\tau_o)
> $$
> (the positive part keeps the weight on $\hat\tau_r$ between 0 and 1, i.e. $\lambda\le1$: Baranchik 1964). $\kappa_1$ generalises Green & Strawderman (1991) to the heteroscedastic, weighted-loss case.
^def-kappa1

**Oracle.** The weighted-MSE-optimal shrinkage factor is
$$
\lambda_{opt}=\frac{\text{Tr}(\Sigma_rD)}{\text{Tr}(\Sigma_rD)+\text{Tr}(\Sigma_oD)+\xi^TD^2\xi}.
$$
The denominator cannot be estimated because $\xi$ is unknown, but it equals $E[(\hat\tau_o-\hat\tau_r)^TD(\hat\tau_o-\hat\tau_r)]$, so $\kappa_1$ substitutes that "best guess". Interpretation: the weight moved from $\hat\tau_r$ toward $\hat\tau_o$ is the RCT variance share of total discrepancy.

> [!theorem] Lemma 1 (testable dominance)
> If $4\max_kd_k\sigma_{rk}^2\le\sum_kd_k\sigma_{rk}^2$ then $\kappa_1$ dominates $\hat\tau_r$ under the loss.
^lem-dominance-kappa1

*Proof.* By Theorem 1, $R(\tau,\hat\tau_r)-R(\tau,\kappa_1)=E\left[-\dfrac{\text{Tr}(\Sigma_rD)^2}{Q}+\dfrac{4\text{Tr}(\Sigma_rD)\,\Delta^TD^2\Sigma_r\Delta}{Q^2}\right]$ with $\Delta=\hat\tau_o-\hat\tau_r$, $Q=\Delta^TD\Delta$. Bound $\Delta^TD^2\Sigma_r\Delta\le\max_kd_k\sigma_{rk}^2\cdot Q$ (up to the $1/K$ in $D$) to get a bound of the form $\text{Tr}(\Sigma_rD)\,E\left[\dfrac{4\max_k\sigma_{rk}^2-\text{Tr}(\Sigma_rD)\cdot(\text{normalisation})}{Q}\right]$ whose numerator is non-positive exactly under the stated condition, so the risk difference is $\ge0$ in favour of $\kappa_1$ (the paper's displayed chain carries the $d_k$ and $1/K$ factors, which the PDF extraction scrambles).

Remark: the condition forces $K\ge4$ at least (the paper says this is at least the dimension needed for classical James-Stein shrinkage toward a grand mean, Efron 2012), more if variances/weights are unequal. In a multi-arm trial that means at least four distinct treatments; for heterogeneous effects at least four subgroups.

> [!theorem] Theorem 2 ($\kappa_{1+}$ asymptotic risk)
> Under mild conditions, as $K\to\infty$ $\kappa_{1+}$ has the lowest risk among all estimators with a shared shrinkage factor across components.
^thm-kappa1-asymptotic

*Proof (Appendix 8, modelled on Xie, Kou & Brown 2012).*
- **Lemma 4.** Assume $\limsup\frac1K\sum_kd_k^2\sigma_{rk}^2\xi_k^2<\infty$, $\limsup\frac1K\sum_kd_k^2\sigma_{rk}^2\sigma_{ok}^2<\infty$, $\limsup\frac1K\sum_kd_k^2\sigma_{rk}^4<\infty$. Then $\sup_{0\le\lambda\le1}|\text{URE}(\tau,\kappa(\lambda))-L(\tau,\kappa(\lambda))|\to0$ in $L^2$ and in probability. The difference splits into $\frac1K\sum_kd_k[\sigma_{rk}^2-(\hat\tau_{rk}-\tau_k)^2]$ (variance $\propto\frac2{K^2}\sum d_k^2\sigma_{rk}^4\to0$) and $\frac{2\lambda}K\sum_kd_k[\sigma_{rk}^2-(\hat\tau_{rk}-\tau_k)(\hat\tau_{rk}-\hat\tau_{ok})]$; for the latter bound $\sup_\lambda$ by $\sup_{1\ge c_1\ge\dots\ge c_K\ge0}$, apply Lemma 2.1 of Li et al. (1986) to reduce to $\max_j|\frac2K\sum_{k\le j}\cdots|$, note the partial sums $M_j$ form a martingale (mean zero), and use the $L^p$ maximal inequality $E\max_jM_j^2\le4E M_K^2=4\sum_kd_k^2\sigma_{rk}^2(\xi_k^2+\sigma_{ok}^2+2\sigma_{rk}^2)$.
- **Lemma 5.** Under those conditions $\lim_{K\to\infty}R(\kappa(\lambda_1^{URE}))-R(\kappa(\lambda))\le0$ for every fixed $\lambda$. Write $L(\lambda^{URE})-L(\lambda)=[L-\text{URE}](\lambda^{URE})+[\text{URE}(\lambda^{URE})-\text{URE}(\lambda)]+[\text{URE}-L](\lambda)$; the middle term is $\le0$ by minimality, the others are bounded by $2\sup|\text{URE}-L|\to0$.

### Corrected version $\kappa_1^*$ (optional step 3)
Because $\lambda_1^{URE}$ is estimated from the data, the risk of $\kappa_1$ is not the URE at fixed $\lambda$; one should shrink by less. Scale by $a$:
$$
\text{URE}(\kappa(a\lambda_1^{URE}))=\text{Tr}(\Sigma_rD)+\frac{(a^2-2a)\text{Tr}(\Sigma_rD)^2}{\Delta^TD\Delta}+\frac{4a\,\text{Tr}(\Sigma_rD)\,\Delta^TD^2\Sigma_r\Delta}{(\Delta^TD\Delta)^2},
$$
minimised at
$$
a_1^*=1-\frac{2\Delta^TD^2\Sigma_r\Delta}{\Delta^TD\Delta}\cdot\frac1{\text{Tr}(\Sigma_rD)},\qquad\kappa_1^*=\hat\tau_r-a_1^*\frac{\text{Tr}(\Sigma_rD)}{\Delta^TD\Delta}(\hat\tau_r-\hat\tau_o).
$$
Iterating would continue "ad infinitum"; the paper stops after one step.

> [!theorem] Lemma 2 ($\kappa_1^*$ vs $\kappa_1$)
> $\kappa_1^*$ has risk no greater than $\kappa_1$ if $\max_kd_k^2\sigma_{rk}^4\le\tfrac32\left(\min_k\sigma_{rk}^2d_k\right)^2$ (reconstructed from the proof, which requires $8\max_kd_k^2\sigma_{rk}^4\le12(\min_k\sigma_{rk}^2d_k)^2$); i.e. stratum variances and weights are sufficiently concentrated.
^lem-corrected-kappa1

## Examples

```python
import numpy as np
def kappa1_plus(tau_r, tau_o, sigma2_r, d=None):
    """Common-shrinkage estimator of Rosenman et al. (2020). Returns (estimate, weight on tau_r)."""
    K = len(tau_r); d = np.ones(K) if d is None else d
    D = d / K
    lam = (sigma2_r * D).sum() / max(((tau_o - tau_r)**2 * D).sum(), 1e-12)   # lambda_1^URE
    lam = min(lam, 1.0)                                                         # positive part
    return tau_r - lam * (tau_r - tau_o), 1 - lam   # weight on tau_o = lam

# Toy: 20 strata, RCT sd 0.2, observational sd 0.02, bias sd 0.1
rng = np.random.default_rng(0); K = 20; tau = rng.uniform(0, 1, K)
tr = tau + rng.normal(0, 0.2, K); to = tau + rng.normal(0, 0.1, K) + rng.normal(0, 0.02, K)
est, _ = kappa1_plus(tr, to, np.full(K, 0.04))
print(((tr-tau)**2).mean(), ((est-tau)**2).mean())
```

> [!example] Reading the weight
> With equal RCT variances $\sigma_{rk}^2=0.04$ (so $\text{Tr}(\Sigma_rD)=0.04$), if the observed mean squared discrepancy (with $D=I/K$) $\Delta^TD\Delta=0.10$ then $\lambda_1=0.04/0.10=0.4$: 40% of the way from the RCT toward the observational estimate. If the discrepancy is $0.02$ (below the RCT's own noise), $\lambda_1=2\to$ capped at 1 by the positive part, i.e. full weight on $\hat\tau_o$.

## Connections

- $\kappa_1$ has the same form as the James-Stein / empirical Bayes shrinkage: [[James-Stein Estimator]], [[Empirical Bayes Interpretation of Shrinkage]], [[Stein's Paradox and Risk Dominance]].
- Bayesian equivalent: a normal prior on the stratum bias $\xi_k$ with an estimated scale gives the same weight; see [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]].

## See Also

[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
