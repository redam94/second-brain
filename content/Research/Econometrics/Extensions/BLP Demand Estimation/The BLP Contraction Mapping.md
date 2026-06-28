---
title: The BLP Contraction Mapping
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
  - method/pyblp
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
source_location: "Section 3 (Solving for the Shares), pp. 15-18"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
depends_on:
  - "[[Random Coefficients Logit Model]]"
used_by:
  - "[[GMM Estimation and Instruments for Price Endogeneity]]"
  - "[[Numerical Integration and Optimization in PyBLP]]"
aliases:
  - BLP Contraction
  - Berry Inversion
  - Share Inversion
  - Mean Utility Inversion
  - Inner Loop
---

# The BLP Contraction Mapping

> [!summary]
> Estimation requires inverting the random-coefficients share system to recover the vector of **mean utilities** $\boldsymbol{\delta}_t$ that rationalizes the **observed** market shares $\boldsymbol{\mathcal{S}}_t$ for a given guess of $\theta_2$. Berry (1994) / BLP (1995) show this inversion can be computed by iterating the fixed point $\boldsymbol{\delta}_t^{h+1} \leftarrow \boldsymbol{\delta}_t^{h} + \log\boldsymbol{\mathcal{S}}_t - \log \boldsymbol{s}_t(\boldsymbol{\delta}_t^h, \widetilde{\theta}_2)$, which is a **contraction mapping** with a unique fixed point. This is the "inner loop" of the nested fixed-point algorithm. Modern best practice replaces plain iteration with acceleration (SQUAREM) or Jacobian-based (Levenberg-Marquardt) solvers, which are 3-12x faster.

## Overview

For each candidate $\theta_2$, and **separately and in parallel for each market $t$**, we must solve the $J_t$ equations in $J_t$ unknowns $\boldsymbol{\delta}_t$ that set predicted shares equal to observed shares. Holding $\theta_2$ fixed turns one large $N$-dimensional nonlinear system into $T$ small $J_t$-dimensional systems, which is the source of BLP's scalability. The mapping $\boldsymbol{\delta}_t \equiv D_t^{-1}(\boldsymbol{\mathcal{S}}_t, \widetilde{\theta}_2)$ is the **Berry inversion**.

## Main Content

> [!theorem] The system to solve ^share-system
> In market $t$ we seek the $J_t$-vector $\boldsymbol{\delta}_t$ satisfying
> $$
> \mathcal{S}_{jt} = s_{jt}(\boldsymbol{\delta}_t \mid \theta_2) = \int \frac{\exp(\delta_{jt} + \mu_{ijt})}{\sum_{k\in J_t}\exp(\delta_{kt}+\mu_{ikt})}\, f(\boldsymbol{\mu}_{it}\mid\widetilde{\theta}_2)\, \mathrm{d}\boldsymbol{\mu}_{it}.
> $$
> A unique solution exists mathematically, but it cannot be solved exactly numerically; instead we solve to a tolerance expressed in the **log difference in shares**:
> $$
> \lVert \log\boldsymbol{\mathcal{S}}_t - \log \boldsymbol{s}_t(\boldsymbol{\delta}_t, \theta_2)\rVert_\infty \le \epsilon^{tol}.
> $$
> Tolerance is a tradeoff: too loose and numerical error propagates to $\hat{\theta}$ (Dubé et al. 2012); too tight and it can never be met. The recommended $\epsilon^{tol}$ is between `1E-14` and `1E-12` (machine epsilon $\approx$ `1E-16` in double precision).

> [!theorem] The BLP fixed point is a contraction ^contraction
> Berry et al. (1995) show the relation $f(\boldsymbol{\delta}_t) = \boldsymbol{\delta}_t$ given by
> $$
> f:\ \boldsymbol{\delta}_t^{h+1} \leftarrow \boldsymbol{\delta}_t^{h} + \log\boldsymbol{\mathcal{S}}_t - \log \boldsymbol{s}_t(\boldsymbol{\delta}_t^h, \widetilde{\theta}_2)
> $$
> is a **contraction mapping**. Iteration is **linearly convergent** at a rate proportional to $L(\widetilde{\theta}_2)/[1 - L(\widetilde{\theta}_2)]$, where the **Lipschitz constant** (Dubé et al. 2012) is
> $$
> L(\widetilde{\theta}_2) = \max_{\boldsymbol{\delta}_t}\ \Big\lVert I_{J_t} - \tfrac{\partial \log \boldsymbol{s}_t}{\partial \boldsymbol{\delta}_t}(\boldsymbol{\delta}_t, \widetilde{\theta}_2)\Big\rVert_\infty < 1.
> $$
> A smaller $L$ converges faster. A **larger outside-good share** generally implies a smaller Lipschitz constant; as the outside share shrinks, convergence takes increasingly many steps. (Empirically, shrinking $s_{0t}$ from 0.91 to 0.27 raised iteration counts by ~5x.)

> [!theorem] RCNL: the contraction must be dampened ^rcnl-dampen
> For random-coefficients **nested** logit, the plain update is no longer a contraction; it must be dampened by $(1-\rho)$:
> $$
> \boldsymbol{\delta}_t \leftarrow \boldsymbol{\delta}_t + (1-\rho)\big[\log\boldsymbol{\mathcal{S}}_t - \log \boldsymbol{s}_t(\boldsymbol{\delta}_t, \theta_2)\big].
> $$
> Convergence becomes **arbitrarily slow as $\rho \to 1$** (more within-nest substitution), making RCNL harder to estimate. Without random coefficients ($\mu_{ijt}=0$) the inversion has the closed form $\delta_{jt} = \log\mathcal{S}_{jt} - \log\mathcal{S}_{0t} - \rho\log\mathcal{S}_{j\mid ht}$ (Berry 1994).

> [!theorem] Faster solvers: Newton / Levenberg-Marquardt and SQUAREM ^accelerated
> Two families improve on plain iteration:
> - **Jacobian-based.** Newton-Raphson updates $\boldsymbol{\delta}_t^{h+1} \leftarrow \boldsymbol{\delta}_t^h - \lambda\,\Psi_t^{-1}\boldsymbol{s}_t$, where $\Psi_t = \partial \boldsymbol{s}_t/\partial\boldsymbol{\delta}_t$. The **Levenberg-Marquardt (LM)** least-squares solver $\min_{\boldsymbol{\delta}_t}\sum_j[\mathcal{S}_{jt}-s_{jt}]^2$ is the fastest, most reliable Jacobian method; its update solves $[\Psi_t'\Psi_t + \lambda\,\mathrm{diag}(\Psi_t'\Psi_t)]\,\boldsymbol{x}_t = \Psi_t'[\boldsymbol{\mathcal{S}}_t - \boldsymbol{s}_t]$, interpolating between Gauss-Newton ($\lambda=0$) and gradient descent (large $\lambda$). Cost per iteration is high (computing $J_t\times J_t$ numerical-integral Jacobians).
> - **Accelerated fixed points.** **SQUAREM** (Varadhan & Roland 2008) uses the residual $r^h = f(\boldsymbol{\delta}_t^h)-\boldsymbol{\delta}_t^h$ and curvature to take an approximate Newton step **without forming the Jacobian**, at essentially the cost of plain iterations. It is **3-6x faster** than direct iteration (3-8x fewer iterations in simulations) and is the recommended default. (No formal convergence guarantee, as the accelerated iteration is no longer a contraction; DF-SANE is a similar but slightly slower/less robust alternative.)

## Examples

Inner loop for one guess of $\theta_2$ (NFXP step (a)):
1. For each market $t$, start $\boldsymbol{\delta}_t^0$ at the plain-logit solution $\log\boldsymbol{\mathcal{S}}_t - \log\mathcal{S}_{0t}$ (or the previous $\theta_2$'s solution, a "hot start" saving 10-20% of iterations).
2. Run **SQUAREM** (or **LM**) until $\lVert\log\boldsymbol{\mathcal{S}}_t - \log\boldsymbol{s}_t\rVert_\infty \le$ `1E-14`.
3. Return $\hat{\boldsymbol{\delta}}_t(\theta_2)$ to the outer GMM loop. Markets run in parallel across processors.

## Connections

- [[Random Coefficients Logit Model]] — defines the share integrals being inverted.
- [[GMM Estimation and Instruments for Price Endogeneity]] — the recovered $\boldsymbol{\delta}_t$ feeds the linear index and moment conditions (this is the "inner loop" of NFXP).
- [[Numerical Integration and Optimization in PyBLP]] — each share evaluation requires numerical integration; the contraction is the "inner loop," optimization the "outer loop."
- [[Method of Simulated Moments]] — the simulated shares make this a simulated fixed point.

## See Also

- [[BLP Demand Estimation - Overview]]
- [[Supply Side and Markups]]
- [[_Index]]
