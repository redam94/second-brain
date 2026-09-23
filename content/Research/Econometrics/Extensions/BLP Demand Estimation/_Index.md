---
title: BLP Demand Estimation - Index
tags:
  - type/index
  - source/ingested
  - topic/econometrics
  - method/pyblp
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
aliases:
  - BLP Demand Estimation Index
  - PyBLP Index
---

# BLP Demand Estimation - Index

> [!abstract] Routing Summary
> - Need the **big picture / what BLP is and the estimation pipeline**? → [[BLP Demand Estimation - Overview]]
> - Need the **demand utility spec, shares as integrals, relaxing IIA, RCNL**? → [[Random Coefficients Logit Model]]
> - Need **how observed shares are inverted to mean utilities** $\boldsymbol{\delta}_t$ (the contraction, SQUAREM/LM, Lipschitz constant)? → [[The BLP Contraction Mapping]]
> - Need **why price is endogenous and which instruments are valid** (cost shifters, BLP, Gandhi-Houde differentiation IV, optimal IV) + the GMM objective? → [[GMM Estimation and Instruments for Price Endogeneity]]
> - Need **quadrature vs Monte Carlo, the nested fixed point, optimization, and concrete best practices**? → [[Numerical Integration and Optimization in PyBLP]]
> - Need the **supply side, Bertrand markups, marginal-cost recovery, merger/equilibrium simulation**? → [[Supply Side and Markups]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| BLP model & best-practices overview | [[BLP Demand Estimation - Overview]] | overview | RCL, Contraction, GMM, Integration, Supply | BLP = nonlinear change of vars then (two-eq) linear IV; well-behaved with best practices |
| Random-coefficients (mixed) logit | [[Random Coefficients Logit Model]] | definition | [[Discrete Choice Models]] | $U_{ijt}=\delta_{jt}+\mu_{ijt}+\epsilon_{ijt}$; shares are integrals over types; relaxes IIA |
| Share inversion | [[The BLP Contraction Mapping]] | theorem | RCL | $\boldsymbol{\delta}^{h+1}=\boldsymbol{\delta}^h+\log\boldsymbol{\mathcal{S}}-\log\boldsymbol{s}$ is a contraction; SQUAREM/LM accelerate |
| GMM & instruments | [[GMM Estimation and Instruments for Price Endogeneity]] | concept | RCL, Contraction, [[Instrumental Variables]] | $E[\xi_{jt}Z^D_{jt}]=0$; differentiation IV > BLP sums; feasible optimal IV |
| Integration & optimization | [[Numerical Integration and Optimization in PyBLP]] | concept | RCL, Contraction, GMM | Quadrature/sparse-grid/Halton; NFXP + analytic gradients; >99% converge |
| Supply side & markups | [[Supply Side and Markups]] | concept | RCL, GMM | $\eta_t=\Delta_t^{-1}\boldsymbol{s}_t$, $c_{jt}=p_{jt}-\eta_{jt}$; $\zeta$-markup fixed point for equilibria |

## Notes

- [[BLP Demand Estimation - Overview]] — CONTAINS: the BLP problem pipeline; parameter partition $\theta=[\theta_1=\beta,\ \theta_3=\gamma,\ \theta_2=(\alpha,\widetilde{\theta}_2)]$; what is novel in Conlon-Gortmaker (reformulation, optimal IV, best practices); canonical auto/cereal example.
- [[Random Coefficients Logit Model]] — CONTAINS: indirect utility (mean + random-coefficient deviation + EV1 error); outside good; shares as integrals over the mixing distribution; the linear $\delta$-index with structural error $\xi_{jt}$; RCNL extension with nesting parameter $\rho$ and inclusive value.
- [[The BLP Contraction Mapping]] — CONTAINS: the $J_t$-equation share system; tolerance in log-share difference; the contraction and its Lipschitz constant / convergence rate; outside-share effect; dampened RCNL contraction; Newton/Levenberg-Marquardt and SQUAREM acceleration.
- [[GMM Estimation and Instruments for Price Endogeneity]] — CONTAINS: why price is endogenous; demand & full GMM moment conditions and objective; cost shifters, BLP instruments, Gandhi-Houde Local/Quadratic differentiation IV; Chamberlain optimal-IV approximation with explicit exclusion/cross-equation restrictions; overidentification LR test.
- [[Numerical Integration and Optimization in PyBLP]] — CONTAINS: pMC vs qMC (scrambled Halton) vs Gaussian quadrature, sparse grids, curse of dimensionality, variance reduction; the NFXP algorithm; analytic gradients, gradient-based optimizers, box constraints, tight tolerances; log-sum-exp numerical stability.
- [[Supply Side and Markups]] — CONTAINS: Bertrand-Nash FOCs; ownership matrix $\mathcal{H}_t$ and intra-firm derivative matrix $\Delta_t$; markup and marginal-cost recovery; supply moments; Morrow-Skerlos $\zeta$-markup fixed point for counterfactual equilibria; merger simulation.

## Sources

- Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP) — Conlon, C. & Gortmaker, J. (2020), "Best Practices for Differentiated Products Demand Estimation with PyBLP," *RAND Journal of Economics*.
