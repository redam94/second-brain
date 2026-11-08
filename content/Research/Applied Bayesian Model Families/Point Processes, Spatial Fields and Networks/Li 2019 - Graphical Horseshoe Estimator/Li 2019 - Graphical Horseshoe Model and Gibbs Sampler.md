---
title: "Li 2019 - Graphical Horseshoe Model and Gibbs Sampler"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Li 2019 - The Graphical Horseshoe Estimator.pdf]]"
source_location: "Sec. 1-2, pp. 2-10, Algorithm 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Li 2019 - Graphical Horseshoe Estimator"
doc_type: paper
depends_on:
used_by:
  - "[[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]]"
  - "[[Li 2019 - Simulation Study and Gene Expression Application]]"
aliases:
  - "graphical horseshoe prior"
  - "graphical lasso"
  - "Bayesian graphical lasso"
  - "GHS Gibbs sampler"
---

# Li 2019 - Graphical Horseshoe Model and Gibbs Sampler

> [!summary]
> $y_k\sim N(0,\Omega^{-1})$; $\omega_{ii}\propto1$; for $i<j$: $\omega_{ij}\sim N(0,\lambda_{ij}^2\tau^2)$, $\lambda_{ij},\tau\sim C^+(0,1)$, restricted to the positive-definite cone. A column-by-column block Gibbs sampler (Wang 2012 partitioning + Makalic-Schmidt inverse-gamma augmentation) has all conditionals in closed form and preserves positive definiteness.

## Overview
Competitors: graphical lasso (GL): maximise $\log\det\Omega-\text{tr}(S\Omega/n)-\sum_{i,j}\phi_\lambda(|\omega_{ij}|)$ with $\phi_\lambda=\lambda|\cdot|$; graphical SCAD (no Bayesian form; may not give PD estimates; here selects almost everything); Bayesian graphical lasso (BGL, Wang 2012): double-exponential priors on off-diagonals and exponential on diagonals ($\lambda/2$), whose MAP is the GL.

## Main Content

> [!definition] Precision matrix and partial correlation
> $\Omega=\Sigma^{-1}$. $\omega_{ij}=0$ iff $y_i\perp y_j\mid y_{-ij}$; $\omega_{ii}$ is the inverse residual variance of $y_i$ regressed on the rest; partial correlation $\rho_{ij\cdot}=-\omega_{ij}/\sqrt{\omega_{ii}\omega_{jj}}$ (standard identity).

^def-precision-partial-correlation

> [!definition] Graphical horseshoe (GHS) prior (Sec. 2.1)
> $$
> \omega_{ii}\propto1,\quad \omega_{ij}\mid\lambda_{ij},\tau\sim N(0,\lambda_{ij}^2\tau^2)\ (i<j),\quad \lambda_{ij}\sim C^+(0,1),\ \tau\sim C^+(0,1),\quad \Omega\in\mathcal S_p.
> $$
> $\lambda_{ij}$ local, $\tau$ global shrinkage. Density has a spike at the origin (shrinks noise) and heavy Cauchy-type tails (leaves signals nearly unshrunk). The induced marginal prior is proper.

^def-graphical-horseshoe

> [!theorem] Full conditionals (eq. 2 and Makalic-Schmidt augmentation)
> Posterior given scales: $p(\Omega\mid Y,\Lambda,\tau)\propto|\Omega|^{n/2}\exp\{-\tfrac12\text{tr}(S\Omega)\}\prod_{i<j}\exp(-\omega_{ij}^2/2\lambda_{ij}^2\tau^2)\mathbb 1_{\Omega\in\mathcal S_p}$, $S=Y^\top Y$. Partition the last column: $\beta=\omega_{(-p)p}$, $\gamma=\omega_{pp}-\beta^\top\Omega_{(-p)(-p)}^{-1}\beta$ (constant Jacobian). Then
> $$
> \gamma\sim\text{Gamma}\big(n/2+1,\ \text{rate }s_{pp}/2\big),\quad \beta\sim N(-Cs_{(-p)p},C),\ C=\{s_{pp}\Omega_{(-p)(-p)}^{-1}+(\Lambda^*\tau^2)^{-1}\}^{-1}.
> $$
> Augmentation: $x^2\mid a\sim\text{IG}(\tfrac12,1/a)$, $a\sim\text{IG}(\tfrac12,1)$ implies $x\sim C^+(0,1)$, so $\lambda_{ij}^2\mid\nu_{ij}\sim\text{IG}(\tfrac12,1/\nu_{ij})$, $\nu_{ij}\sim\text{IG}(\tfrac12,1)$, giving $\lambda_{ij}^2\mid\cdot\sim\text{IG}(1,1/\nu_{ij}+\omega_{ij}^2/2\tau^2)$, $\nu_{ij}\mid\cdot\sim\text{IG}(1,1+1/\lambda_{ij}^2)$, $\tau^2\mid\cdot\sim\text{IG}\big(\tfrac{p(p-1)/2+1}{2},\ 1/\xi+\sum_{i<j}\omega_{ij}^2/2\lambda_{ij}^2\big)$, $\xi\mid\cdot\sim\text{IG}(1,1+1/\tau^2)$.

^thm-ghs-conditionals

> [!theorem] Positive definiteness is preserved
> If $\Omega^{(t)}\succ0$ then after updating a last row/column, $\det\Omega^{(t+1)}=\gamma\det\Omega_{(-p)(-p)}^{(t)}>0$ and the other leading principal minors are unchanged, so $\Omega^{(t+1)}\succ0$ (same argument as Wang 2012). Cost per column: inverting a $(p-1)\times(p-1)$ matrix, $O(p^3)$ per sweep column, overall $O(p^4)$ per iteration (the paper states the dominant step is $O(p^3)$ per update).

^thm-ghs-pd

Algorithm 1 (paper): initialise $\Omega=\Sigma=I$, $\Lambda=N=\mathbf 1$, $\tau=\xi=1$; for each $i$: draw $\gamma$, $\beta$, set $\omega_{(-i)i}=\beta$, $\omega_{ii}=\gamma+\beta^\top\Omega_{(-i)(-i)}^{-1}\beta$, draw $\lambda_{(-i)i},\nu_{(-i)i}$, update $\Sigma$ by block formulas; then draw $\tau^2,\xi$. (The printed pseudo-code writes the Gamma as "rate = 2/s_ii", while eq. 2 states rate $s_{pp}/2$; code below follows eq. 2.) MATLAB code: github.com/liyf1988/GHS.

## Examples

> [!example] GHS on a 5-variable toy (numerical check)
> $p=5$, $n=300$, true $\Omega_0$ has two non-zero off-diagonals ($\omega_{12}=-0.5$, $\omega_{34}=0.4$). Posterior means after 300 burn-in + 700 draws: $\hat\omega_{12}=-0.52$, $\hat\omega_{34}=0.29$, all other off-diagonals within $\pm0.04$, diagonal near 1 (checked).

```python
import numpy as np
def ghs(S, n, burnin=300, nmc=700, seed=0):
    rng = np.random.default_rng(seed); p = S.shape[0]
    Om, Sig, Lam, Nu = np.eye(p), np.eye(p), np.ones((p, p)), np.ones((p, p)); tau2, xi = 1.0, 1.0
    out = np.zeros((nmc, p, p))
    for it in range(burnin + nmc):
        for i in range(p):
            idx = np.r_[0:i, i+1:p]
            gam = rng.gamma(n/2 + 1, 2/S[i, i])                       # rate s_ii/2
            O11i = Sig[np.ix_(idx, idx)] - np.outer(Sig[idx, i], Sig[idx, i])/Sig[i, i]
            C = np.linalg.inv(S[i, i]*O11i + np.diag(1/(Lam[idx, i]*tau2))); C = (C + C.T)/2
            beta = rng.multivariate_normal(-C @ S[idx, i], C)
            Om[idx, i] = Om[i, idx] = beta; Om[i, i] = gam + beta @ O11i @ beta
            Lam[idx, i] = Lam[i, idx] = 1/rng.gamma(1.0, 1/(1/Nu[idx, i] + beta**2/(2*tau2)))
            Nu[idx, i] = Nu[i, idx] = 1/rng.gamma(1.0, 1/(1 + 1/Lam[idx, i]))
            W = O11i @ beta; Sig[np.ix_(idx, idx)] = O11i + np.outer(W, W)/gam
            Sig[idx, i] = Sig[i, idx] = -W/gam; Sig[i, i] = 1/gam
        iu = np.triu_indices(p, 1)
        tau2 = 1/rng.gamma((p*(p-1)/2 + 1)/2, 1/(1/xi + np.sum(Om[iu]**2/(2*Lam[iu]))))
        xi = 1/rng.gamma(1.0, 1/(1 + 1/tau2))
        if it >= burnin: out[it-burnin] = Om
    return out
```

PyMC note (E19): putting the horseshoe directly on a precision matrix in a generic sampler leaves the PD cone (no constraint is enforced), which is why GHS needs its column-wise conditional structure; a PyMC alternative is **node-wise (neighbourhood) regression** with a horseshoe on each regression's coefficients and an AND/OR rule to symmetrise edges (see [[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]]).

## Connections
[[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]] gives the theory for the prior's tails/spike; [[Joint Priors and Covariance Matrices]] covers LKJ-based alternatives.

## See Also
[[Li 2019 - Graphical Horseshoe Estimator - Overview]]
