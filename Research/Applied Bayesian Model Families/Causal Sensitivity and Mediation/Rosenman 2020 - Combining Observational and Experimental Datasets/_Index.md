---
title: "Index: Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators"
tags:
  - type/index
  - source/ingested
  - topic/causal-sensitivity
parent: "[[../_Index|Causal Sensitivity and Mediation]]"
date_updated: 2026-11-08
concept_count: 11
---

# Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators

> [!abstract] Routing Summary
> This folder fully captures Rosenman, Basse, Owen & Baiocchi (2020), *Combining Observational and Experimental Datasets Using Shrinkage Estimators* (arXiv:2002.06708): setup and bias structure, the generalised unbiased risk estimate, the $\kappa_1$ and $\kappa_2$ shrinkage estimators with dominance and asymptotic optimality, SIPW and variance estimation, the implied-$\Gamma$ sensitivity link, simulations, and a vault synthesis (hierarchical Bayesian bias model for E103). It contains 7 notes plus this index.
> - Need the paper on one page or the section-to-note map? → [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
> - Need Assumptions 1-2, the loss, or the bias $\xi_k$? → [[Rosenman 2020 - Setup Assumptions and Bias Structure]]
> - Need Theorem 1 (URE), $\kappa_1$, $\lambda_{opt}$, Lemmas 1-2 or Theorem 2? → [[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]]
> - Need $\kappa_2$, SIPW, or variance estimation? → [[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]]
> - Need the Zhao et al. $\Gamma$ link and the implied-$\Gamma$ algorithm? → [[Rosenman 2020 - Sensitivity Analysis and Implied Gamma]]
> - Need simulation design and results (Figs. 1-4) or the conclusion? → [[Rosenman 2020 - Simulation Results]]
> - Need a PyMC hierarchical bias model with a few holdouts (E103)? → [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Common treatment effect (Asm. 2) | Rosenman 2020 - Setup Assumptions and Bias Structure | definition | stratification | same $\tau_k$ in RCT and observational data |
| Stratum bias $\xi_k$ | Rosenman 2020 - Setup Assumptions and Bias Structure | theorem | Asm. 1 | $s_{tk}/\bar p_k+s_{ck}/(1-\bar p_k)$ |
| Theorem 1 (URE) | Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage | theorem | Strawderman et al. 2003 | risk of $Z+\Sigma g$ |
| $\kappa_1$ | Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage | definition | Thm 1 | $\lambda=\text{Tr}(\Sigma_rD)/\Delta^TD\Delta$ |
| Lemma 1 | Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage | theorem | Thm 1 | dominance if $4\max d_k\sigma_{rk}^2\le\sum d_k\sigma_{rk}^2$ |
| Theorem 2 | Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage | theorem | Lemmas 4-5 | $\kappa_{1+}$ asymptotically optimal |
| $\kappa_2$ and Thm 3 | Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation | theorem | Thm 1 | variance-weighted shrinkage |
| SIPW | Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation | definition | propensity score | reduces bias at little variance cost |
| Implied $\Gamma$ | Rosenman 2020 - Sensitivity Analysis and Implied Gamma | concept | Zhao et al. 2019 | binary search for $\Gamma$ matching $\lambda_{1+}$ |
| Simulation results | Rosenman 2020 - Simulation Results | example | all estimators | 1%/5% (unadjusted) vs 25%/40% (SIPW) risk reduction |
| Hierarchical bias model | Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts | example | $\xi_k$, $\lambda_{opt}$ | Bayesian weight equals $1-\lambda_{opt}$ with $\xi^2\to\tau_\xi^2$ |

## Notes

- [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]] — CONTAINS: research question, contributions, Source Map, E103/E101/E102 links, toy simulation.
- [[Rosenman 2020 - Setup Assumptions and Bias Structure]] — CONTAINS: Sec. 1-3: related work, Green-Strawderman estimators, Asm. 1-2, loss, estimators, bias $\xi_k$.
- [[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]] — CONTAINS: Sec. 4.1-4.2, App. 8: Thm 1 + proof, $\kappa_1$, $\lambda_{opt}$, Lemma 1 + proof, Thm 2 + proof sketch, corrected $\kappa_1^*$, Lemma 2.
- [[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]] — CONTAINS: Sec. 4.3-4.4, App. 9: $\kappa_2$, Lemma 3, Thm 3, variance estimator, SIPW.
- [[Rosenman 2020 - Sensitivity Analysis and Implied Gamma]] — CONTAINS: Sec. 5: marginal sensitivity model, worst-case bias/variance, implied-$\Gamma$ algorithm.
- [[Rosenman 2020 - Simulation Results]] — CONTAINS: Sec. 6-7: design, Figs. 1-4 findings, conclusion and extensions, miniature replication.
- [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]] — CONTAINS: vault synthesis: marginal model, posterior-weight equivalence, PyMC sketch, numeric example.

## Sources
- [[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]] — Rosenman E, Basse G, Owen A, Baiocchi M (2020), arXiv:2002.06708v2; 29 pp. Sole source.

## See Also
- [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]], [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]] — cluster siblings.
- [[James-Stein Estimator]], [[Empirical Bayes Interpretation of Shrinkage]], [[Hierarchical Models]], [[Experimental Benchmarks for Observational Ad Measurement]].
