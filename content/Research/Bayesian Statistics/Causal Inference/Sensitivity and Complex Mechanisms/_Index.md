---
title: "Index: Sensitivity Analysis and Complex Mechanisms"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Causal Inference]]"
date_updated: 2026-04-10
concept_count: 3
---

# Sensitivity Analysis and Complex Mechanisms

> [!abstract] Routing Summary
> This folder covers: (1) sensitivity analysis when unconfoundedness may fail (E-value, copula methods), (2) IV / principal stratification for settings where unconfoundedness is untenable, and (3) time-varying treatments with the g-formula and Bayesian g-computation. Contains 3 notes.
> - Need to assess robustness to unmeasured confounders (E-value, Rosenbaum bounds, copula)? → [[Sensitivity Analysis in Observational Studies]]
> - Need IV, compliance strata, CACE / LATE, Bayesian mixture model for IV? → [[Instrumental Variables and Principal Stratification]]
> - Need sequential treatments, g-formula, Bayesian g-computation, MSM? → [[Time-Varying Treatments and G-computation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Cornfield inequality | [[Sensitivity Analysis in Observational Studies]] | theorem | Potential Outcomes Framework | Hidden confounder must match observed association to explain it away |
| E-value | [[Sensitivity Analysis in Observational Studies]] | definition | — | Model-free; min confounder strength to explain away effect |
| Copula sensitivity | [[Sensitivity Analysis in Observational Studies]] | definition | General Structure | Bayesian prior on copula params = sensitivity params |
| Compliance types | [[Instrumental Variables and Principal Stratification]] | definition | Potential Outcomes Framework | co/at/nt/df strata; $U_i = (W_i(0),W_i(1))$ |
| CACE / LATE | [[Instrumental Variables and Principal Stratification]] | definition | Compliance types | $\tau_\text{co} = \text{ITT} / \text{compliance rate}$ |
| Bayesian IV | [[Instrumental Variables and Principal Stratification]] | concept | General Structure | Data augmentation over latent compliance stratum |
| Principal stratification | [[Instrumental Variables and Principal Stratification]] | concept | Compliance types | Generalization: any post-treatment variable defines strata |
| Sequential ignorability | [[Time-Varying Treatments and G-computation]] | definition | Potential Outcomes Framework | $Z_t \perp Y(\bar{z}) \mid \bar{Z}_{t-1}, \bar{L}_{t-1}$ |
| G-formula | [[Time-Varying Treatments and G-computation]] | theorem | Sequential ignorability | Identification via iterating outcome regression across time |
| Bayesian g-computation | [[Time-Varying Treatments and G-computation]] | concept | General Structure | Fit Bayesian model per g-formula component; combine draws |

## Notes

- [[Sensitivity Analysis in Observational Studies]] — CONTAINS: Cornfield inequality (theorem), Rosenbaum & Rubin logistic model, E-value (definition), copula-based sensitivity analysis (definition), Rosenbaum's Γ, comparison table
- [[Instrumental Variables and Principal Stratification]] — CONTAINS: compliance type definitions, IV validity assumptions, CACE/LATE definition, Bayesian IV posterior factorization, Example 7.1 (Gibbs sampler for one-sided non-compliance), principal stratification generalization
- [[Time-Varying Treatments and G-computation]] — CONTAINS: sequential ignorability (Assumption 7.2), g-formula (theorem), Bayesian g-computation algorithm, Example 7.3 (two-period Bayesian g-computation), g-null paradox, dynamic treatment regimes overview

## Sources

- Li et al. - 2022 - Bayesian causal inference a critical review — §6–7, pp. 12–18

## See Also
- [[Research/Bayesian Statistics/Causal Inference/Bayesian Inference/_Index|Bayesian Inference]] — core Bayesian CI structure that these methods extend
- [[Copula Estimation]] — vault note on copulas used in sensitivity analysis
