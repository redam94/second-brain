---
title: Numerical Integration and Optimization in PyBLP
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/pyblp
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
source_location: "Section 3 (Integration, Optimization, Numerical Issues) & Section 5/7 (Recommendations), pp. 18-26, 40-49"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
depends_on:
  - "[[Random Coefficients Logit Model]]"
  - "[[The BLP Contraction Mapping]]"
  - "[[GMM Estimation and Instruments for Price Endogeneity]]"
used_by: []
aliases:
  - PyBLP Integration
  - Quadrature vs Monte Carlo
  - Nested Fixed Point
  - NFXP
  - BLP Best Practices
  - PyBLP Optimization
---

# Numerical Integration and Optimization in PyBLP

> [!summary]
> Estimating BLP requires (1) approximating the **share integrals** over consumer heterogeneity and (2) optimizing a **non-convex GMM objective**. PyBLP's best practices: use **Gaussian quadrature product rules** for few random coefficients (sparse grids or **scrambled Halton** draws in high dimensions) rather than crude pseudo-Monte Carlo; use the **nested fixed-point (NFXP)** algorithm with analytic gradients, gradient-based optimizers (Knitro Interior/Direct or SciPy L-BFGS-B), **box constraints**, and **tight tolerances**; and guard numerical stability with the **log-sum-exp** trick. These choices largely eliminate the multiple-local-optima difficulties reported in earlier literature.

## Overview

The share integral $s_{jt}(\boldsymbol{\delta}_t,\widetilde{\theta}_2) = \int \frac{\exp(\delta_{jt}+\mu_{ijt})}{\sum_k \exp(\delta_{kt}+\mu_{ikt})} f(\boldsymbol{\mu}_{it}\mid\widetilde{\theta}_2)\,\mathrm{d}\boldsymbol{\mu}_{it}$ has no closed form and is approximated at a finite set of $I_t$ **nodes** $\nu_{it}$ with **weights** $w_{it}$ (an "integration rule"):
$$
s_{jt}(\boldsymbol{\delta}_t,\widetilde{\theta}_2) \approx \sum_{i\in I_t} w_{it}\cdot s_{ijt}(\boldsymbol{\delta}_t, \boldsymbol{\mu}_{it}(\nu_{it},\widetilde{\theta}_2)).
$$
The logit kernel is bounded on $(0,1)$ and infinitely differentiable, so it is well-behaved for quadrature.

## Main Content

> [!definition] Integration rules: pMC, qMC, and quadrature ^integration-rules
> - **Pseudo-Monte Carlo (pMC).** Equally weighted random draws ($w_{it}=I_t^{-1}$). Simulation error is $O(I_t^{-1/2})$ and (by CLT) $\epsilon^{pMC}_{I_t}\xrightarrow{d} N(0, \sqrt{V(s_{jt})/I_t})$. Advantage: no curse of dimensionality. Disadvantage: error declines **slowly**.
> - **Quasi-Monte Carlo (qMC).** Deterministic **low-discrepancy sequences** (e.g. **Halton**) that cover the hypercube $[0,1]^{K_2}$ more evenly; error $O(I_t^{-1}\cdot(\log I_t)^{K_2})$, beating pMC as $I_t$ grows. Best practice: **scramble** the sequence (Owen 2017) and **discard** the first ~1,000 points to avoid cross-dimension correlation.
> - **Gaussian quadrature.** Approximates the integrand by a polynomial integrated exactly; a weighted sum over a chosen $(\nu_{it}, w_{it})$. **Gauss-Hermite** rules suit normal mixing densities. Most accurate for **few** dimensions, but **product rules** need $I_t^d$ points in dimension $d$ — the **curse of dimensionality**. **Sparse grids** (Heiss & Winschel 2008) and **monomial cubature** (Judd & Skrainka 2011) prune nodes (sometimes with negative weights, which can be problematic for counterfactuals).
> - **Variance reduction.** Modified Latin Hypercube Sampling (MLHS), **antithetic** sampling ($\phi(\nu)=\phi(-\nu)$), and **importance sampling** (oversample where $s_{ijt}$ is large, reweight by $w(\nu)=\phi(\nu)/q(\nu)$).
>
> **Recommendation:** product rules to high polynomial accuracy for **few** random coefficients; **sparse grids or scrambled Halton** for $K_2 > 5$. After obtaining $\hat{\widetilde{\theta}}_2$, verify the chosen rule against finer alternatives by comparing $\lVert\boldsymbol{\mathcal{S}}_t - \boldsymbol{s}_t(\boldsymbol{\delta}_t,\hat{\widetilde{\theta}}_2; I_t)\rVert_2$.

> [!definition] The Nested Fixed Point (NFXP) algorithm ^nfxp
> For each guess of $\theta_2$ (the **outer loop**):
> (a) **Inner loop** — for each market solve the share system for $\hat{\boldsymbol{\delta}}_t(\theta_2)$ via the [[The BLP Contraction Mapping|contraction]] (SQUAREM/LM).
> (b) Build the intra-firm derivative matrix $\Delta_t$ and recover markups $\hat{\eta}_t(\theta_2) = \Delta_t^{-1}\boldsymbol{s}_t$.
> (c) Run **linear IV-GMM** to concentrate out the linear $[\theta_1,\theta_3]$ from $\hat{\delta}_{jt}+\alpha p_{jt}=[x_{jt},v_{jt}]\beta+\xi_{jt}$ and $f_{MC}(p_{jt}-\hat\eta_{jt})=[x_{jt},w_{jt}]\gamma+\omega_{jt}$.
> (d) Form residuals $\hat\xi_{jt}(\theta_2), \hat\omega_{jt}(\theta_2)$, stack moments $g(\theta_2)$, and evaluate $q(\theta_2)=g(\theta_2)'W g(\theta_2)$.
> Only the $K_2$ **nonlinear** parameters are searched over (Hessian is $K_2\times K_2$); linear parameters and fixed effects are "essentially free." Conlon-Gortmaker place $\alpha p_{jt}$ on the LHS so the endogenous markup depends only on $\theta_2$, enabling simultaneous supply/demand with fixed effects. (MPEC of Dubé et al. 2012 is an alternative; this paper focuses on the more popular NFXP.)

> [!definition] Optimization of the GMM objective ^optimization
> The objective is **non-convex** (the Hessian need not be PSD), so no routine guarantees a global minimum. Best practices:
> - **Analytic gradients** (PyBLP computes them for any model, including supply+demand and fixed effects) — major speedup and better convergence than finite differences or derivative-free methods.
> - **Gradient-based optimizers**: try **Knitro Interior/Direct** first if available, then a **BFGS**-based routine, ideally **SciPy L-BFGS-B** with bounds. Avoid Nelder-Mead.
> - **Box constraints** $\theta_2^{(\ell)}\in[\underline{\theta}_2^{(\ell)}, \overline{\theta}_2^{(\ell)}]$ (e.g. nonnegative, bounded variances; $\rho\in[0,0.95]$; $\alpha\le -0.001$ with a supply side) — prevent unreasonable values and overflow.
> - **Tight termination tolerances** (loose defaults cause early termination, worse when $N$ is large) and verifying **first-order** (gradient $\approx 0$) and **second-order** (PSD Hessian / positive eigenvalues) conditions, reported by default.
> - **Multiple starting values and optimizers** to check agreement.
>
> With these, **>99%** of simulation runs converge to a valid local minimum, contradicting Knittel & Metaxoglou (2014)'s many-local-optima finding.

> [!definition] Numerical stability tricks ^numerical-tricks
> The exponentiated utilities $\sum_j \exp(\delta_{jt}+\mu_{ijt})$ cause **loss of precision / overflow** (e.g. $\exp(800)$). Fixes:
> - **Protected log-sum-exp**: $\mathrm{LSE}(\boldsymbol{x}) = \log\sum_k \exp x_k = a + \log\sum_k\exp(x_k - a)$ with $a=\max\{0,\max_k x_k\}$ — implemented by default, near-zero cost, recommended.
> - Work market-by-market; box-constrain random coefficients; robust error handling (replace near-singular $W$ or $\Delta_t$ with pseudo-inverses and warn).
> - Tricks like using $\exp(\delta_{jt})$ in place of $\delta_{jt}$, or "hot starts," give little benefit once SQUAREM is used.

## Examples

Conlon-Gortmaker Monte Carlo config: **Gauss-Hermite product rule** exact to degree 17 (9 nodes in 1-D, 81 in 2-D); **SQUAREM** inner loop with `1E-14` tolerance; **L-BFGS-B** with analytic gradients, projected-gradient tolerance `1E-5`, three starting values drawn $\pm 50\%$ around truth, box constraints $\sigma_x,\sigma_p\ge 0$, $\rho\in[0,0.95]$, $\alpha\le -0.001$. In the **Nevo (2000b)** and **BLP (1995)** replications, switching from a few pMC draws to quadrature plus tight tolerances **eliminates the dispersion** in elasticities across starting values that Knittel & Metaxoglou (2014) reported.

## Connections

- [[The BLP Contraction Mapping]] — the inner loop nested inside the optimization.
- [[Random Coefficients Logit Model]] — defines the integral being approximated.
- [[GMM Estimation and Instruments for Price Endogeneity]] — the objective being optimized.
- [[Method of Simulated Moments]] — numerical integration of moments is the simulation step shared with MSM.
- [[Supply Side and Markups]] — counterfactual pricing equilibria reuse these numerical methods.

## See Also

- [[BLP Demand Estimation - Overview]]
- [[_Index]]
