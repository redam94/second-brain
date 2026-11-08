---
title: "Li 2019 - Kullback-Leibler Risk Bound and Bias Theory"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Li 2019 - The Graphical Horseshoe Estimator.pdf]]"
source_location: "Sec. 3-4, pp. 10-16; Supplement S.1-S.2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Li 2019 - Graphical Horseshoe Estimator"
doc_type: paper
depends_on:
  - "[[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]]"
used_by:
  - "[[Li 2019 - Simulation Study and Gene Expression Application]]"
aliases:
  - "graphical horseshoe risk bound"
  - "horseshoe posterior mean bias"
---

# Li 2019 - Kullback-Leibler Risk Bound and Bias Theory

> [!summary]
> Thm 3.2: for sparse $\Omega_0$ the GHS Cesaro-average KL risk bound has a log factor of order $\log\{\log(\cdot)\ /(\ldots)\}$ on each zero entry (prior mass $\sim\log(n^{1/2}p)/(n^{1/2}p)$) rather than $1/(n^{1/2}p)$, so its bound is smaller than for any prior bounded near the true value (lasso, SCAD). Thm 4.1: the GHS posterior mean of an entry is $(1-E[Z])\hat\omega$ with $E[Z]=O(1/\hat\omega^2)$, hence within $O(1/\hat\omega)$ of least squares, while the double-exponential posterior mean stays biased by a constant.

## Overview
All methods' bounds diverge when $p^2/n\to\infty$; GHS diverges more slowly.

## Main Content

> [!theorem] Lemma 3.1 (Barron 1988)
> With KL neighbourhood $A_\epsilon=\{\Omega:D(p_{\Omega_0}\|p_\Omega)\le\epsilon\}$ and prior $\nu$ with $\nu(A_\epsilon)>0$ for all $\epsilon>0$, the Cesaro-average risk of the Bayes posterior-mean density estimate $\hat p_n$ satisfies $R_n=\frac1n\sum_{j=1}^n\mathbb E\,D(p_{\Omega_0}\|\hat p_j)\le\epsilon-\frac1n\log\nu(A_\epsilon)$ for all $\epsilon>0$.

^thm-barron

> [!theorem] Theorem 3.2 (KL risk bound under GHS)
> Let $y\sim N(0,\Omega_0)$, $\sum_{i,j}\sigma^0_{ij}=Mp$ for a constant $M$, and assume a cube of half-width $2/(Mn^{1/2}p)$ around $\Omega_0$ lies in $\mathcal S_p$. Then $R_n\le\frac1n-\frac1n\log\nu(A_{1/n})$ and: (1) under GHS, $\log\nu(A_{1/n})>p_0\log\Big\{\frac{1}{Mn^{1/2}p}\,C_1\log\big(2Mn^{1/2}p\big)\Big\}+p_1\log\frac{C_2}{n^{1/2}p}$ with $p_0$ zero and $p_1$ non-zero entries of $\Omega_0$; (2) for any other prior density continuous, bounded and strictly positive near $\omega^0_{ij}$: $\log\nu(A_{1/n})>p^2\log\frac{K_1}{n^{1/2}p}$.

^thm-kl-risk

Reading: densities bounded near zero (Bayesian lasso; the SCAD-penalty-equivalent density by Polson & Scott 2012) get prior measure of order $1/(n^{1/2}p)$ per dimension, whereas the horseshoe's unbounded spike gives order $\log(n^{1/2}p)/(n^{1/2}p)$ on each zero entry and $1/(n^{1/2}p)$ on non-zero ones. Rissanen (1986) lower bound: no estimator avoids divergence in high dimension; recommendation: screen variables first.

> [!theorem] Theorem 4.1 (element-wise bias)
> Assume the diagonal is known; by partial regression $y_p\mid y_{-p}\sim N(-\omega_{pp}^{-1}\omega_{p(-p)}y_{-p},\omega_{pp}^{-1})$, and the least-squares estimate $\hat\omega_{p(-p)}\mid Y_{(-p)}\sim N(\omega^0_{p(-p)},\omega^0_{pp}(Y_{(-p)}^\top Y_{(-p)})^{-1})$. Scale $\omega_{pj}$ and $\hat\omega_{pj}$ by $\{\omega^0_{pp}(Y_{(-p)}^\top Y_{(-p)})^{-1}_{jj}\}^{-1/2}$ to get $\omega'_{pj},\hat\omega'_{pj}$.
> (1) GHS: $E(\omega'_{pj}\mid Y,\tau)=(1-E(Z_{pj}))\hat\omega'_{pj}$, $Z_{pj}\sim$ Compound Confluent Hypergeometric $(1,\tfrac12,1,\hat\omega'^2_{pj}/2,1,\theta_{pj}^{-1})$ on $(0,1)$, with $\theta_{pj}=\omega^0_{pp}(Y_{(-p)}^\top Y_{(-p)})^{-1}_{jj}\tau^{-2}$. If $\hat\omega'^2_{pj}/2>1$: $E(Z_{pj})<4(C_1+C_2)\theta_{pj}(1+\hat\omega'^2_{pj}/2)/\hat\omega'^4_{pj}$, with $C_1=1-2/e\approx0.26$, $C_2=\Gamma(1/2)\Gamma(2)/\Gamma(2.5)=0.75$; so $E(Z_{pj})=O(1/\hat\omega'^2_{pj})$ as $\hat\omega'_{pj}\to\infty$.
> (2) Double-exponential prior: $E(\omega'_{pj}\mid Y)=\hat\omega'_{pj}+\frac{d}{d\hat\omega'_{pj}}\log m_{\text{lasso}}(\hat\omega'_{pj})$, with limit $\pm a$, $a=2^{1/2}/(nv)$, $v$ the prior variance: a non-vanishing shrinkage bias.
> (3) $\hat\omega'^2_{pj}\mid Y_{(-p)}\sim\text{noncentral }\chi^2_1(\omega'^2_{pj})$; $\omega'^2_{pj}=\omega^{02}_{pj}\omega^{0-1}_{pp}\{(Y_{(-p)}^\top Y_{(-p)})^{-1}_{jj}\}^{-1}$ with the last factor Gamma-distributed (mean prop. to $n-p+2$, mode prop. to $n-p$) when $n>p-1$.

^thm-bias

Interpretation: with $n\gg p$ and a non-zero true entry, GHS is close to unbiased with high probability; BGL's bias does not vanish and is larger when sparse (large $a$). Bias is smaller when $\omega^2_{pj0}\omega_{pp0}^{-1}$ is large even for $n<p$. Proofs: Supplement S.1 (Thm 3.2: cube measure via the horseshoe's Thm 1 of Carvalho et al. 2010) and S.2 (Thm 4.1, via Bhadra et al. 2016 and Carvalho et al. 2010 Thm 2).

## Examples
Shrinkage factor: for the scalar horseshoe, $E[\kappa\mid y]$ with $\kappa=1/(1+\lambda^2\tau^2)$ has a U-shaped (horseshoe) prior; large $|\hat\omega|$ pushes $\kappa\to0$ (no shrinkage). Numerical illustration with $\tau=0.1$: posterior mean $\approx\hat\omega(1-E[\kappa])$; quick Monte Carlo is left to the reader.

```python
import numpy as np
rng = np.random.default_rng(0)
def hs_post_mean(y, tau=0.1, s=1.0, M=400000):      # normal-means horseshoe, importance sampling over lambda
    lam = np.abs(rng.standard_cauchy(M)); v = (lam*tau)**2
    w = np.exp(-0.5*y**2/(s**2 + v))/np.sqrt(s**2 + v)           # marginal likelihood of y given lambda
    shrink = v/(s**2 + v)                                       # E[theta | y, lambda] = shrink * y
    return y*np.sum(w*shrink)/np.sum(w)
print([round(hs_post_mean(y), 2) for y in (0.5, 1.5, 3., 6., 12.)])   # approaches y for large y
```

## Connections
Limits of shrinkage vs selection: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] controls false positives differently.

## See Also
[[Li 2019 - Graphical Horseshoe Estimator - Overview]]
