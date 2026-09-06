---
title: "Index: Simulation-Based Estimation"
tags:
  - type/index
  - source/ingested
parent: "[[../Extensions/_Index|Extensions]]"
date_updated: 2026-04-12
concept_count: 8
doc_type: index
folder: "Research/Econometrics/Extensions/Simulation-Based Estimation"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Simulation-Based Estimation

> [!abstract] Routing Summary
> This folder covers simulation-based estimation methods — the general framework for estimating structural models when moment conditions or likelihoods are intractable. Contains 7 notes from Liesenfeld & Breitung (1998) and Evans (2024) Ch. 19.
> - Need the high-level overview (MSM vs. indirect inference vs. EMM)? → [[Simulation-Based Estimation - Overview]]
> - Need MSM/SMM theory (criterion function, consistency, asymptotic normality)? → [[Method of Simulated Moments]]
> - Need indirect inference (auxiliary model as moments)? → [[Indirect Inference]]
> - Need asymptotically efficient simulation estimation (SNP/score-based)? → [[Efficient Method of Moments]]
> - Need variance reduction, step sizes, common random numbers? → [[Practical Issues in Simulation Estimation]]
> - Need weighting matrix strategies (identity, two-step, Newey-West) and Σ̂? → [[SMM Weighting Matrix and Inference]]
> - Need Python code (scipy workflow, eps fix, Jacobian)? → [[SMM Python Implementation]]
> - Need the Brock-Mirman (1972) structural macro exercise (latent TFP, policy function, 6 moments, 4 params)? → [[Brock-Mirman Model - SMM Estimation Exercise]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| MSM vs. indirect inference vs. EMM — overview | [[Simulation-Based Estimation - Overview]] | overview | [[Standard Errors and Clustering]], [[Copula Estimation]] | Replace intractable criteria with Monte Carlo; variance inflated by $(1+1/R)$ |
| MSM criterion function, consistency, asymptotic normality | [[Method of Simulated Moments]] | concept/theorem | [[Simulation-Based Estimation - Overview]] | Consistent for any $R \geq 1$; variance inflated by $(1+1/R)$ |
| Auxiliary model approach: min-distance and score-based | [[Indirect Inference]] | concept/theorem | [[Method of Simulated Moments]] | Match auxiliary model estimates between real and simulated data |
| SNP density, EMM procedure, asymptotic efficiency | [[Efficient Method of Moments]] | concept/theorem | [[Indirect Inference]] | Achieves MLE efficiency via flexible SNP auxiliary model |
| Common RNGs, variance reduction, step sizes | [[Practical Issues in Simulation Estimation]] | concept | [[Method of Simulated Moments]], [[Indirect Inference]] | Step size must be $\gg 1/\sqrt{T}$; never use software defaults |
| Identity W, two-step W, Newey-West W, Σ̂_SMM via Jacobian | [[SMM Weighting Matrix and Inference]] | concept/theorem | [[Method of Simulated Moments]], [[Standard Errors and Clustering]] | Optimal W = Ω̂⁻¹; Σ̂ = (1/S)[dᵀWd]⁻¹ |
| Python workflow: scipy, eps stepsize fix, numerical Jacobian | [[SMM Python Implementation]] | tutorial | [[SMM Weighting Matrix and Inference]], [[Method of Simulated Moments]], [[Practical Issues in Simulation Estimation]] | L-BFGS-B needs `options={'eps': 1.0}` when moments are in the 100s |
| Brock-Mirman (1972) model: system, policy function, 6-moment SMM exercise | [[Brock-Mirman Model - SMM Estimation Exercise]] | example | [[SMM Python Implementation]], [[SMM Weighting Matrix and Inference]] | Latent TFP motivates SMM; policy function $k_{t+1} = \alpha\beta e^{z_t}k_t^\alpha$ enables efficient simulation |

## Notes

- [[Simulation-Based Estimation - Overview]] — CONTAINS: MSM vs. indirect inference vs. EMM comparison, SV and diffusion motivating examples, $(1+1/R)$ variance structure
- [[Method of Simulated Moments]] — CONTAINS: MSM criterion function, conditional vs. unconditional moments, consistency theorem, asymptotic normality, optimal weight matrix, SV model example
- [[Indirect Inference]] — CONTAINS: Binding function, minimum distance estimator, score-based estimator, auxiliary model choice, smoothly embedded condition
- [[Efficient Method of Moments]] — CONTAINS: SNP density (location, scale, Hermite polynomial), EMM estimator, asymptotic efficiency theorem, model selection for SNP
- [[Practical Issues in Simulation Estimation]] — CONTAINS: Common random numbers, antithetic variates, control variates, auxiliary model selection strategies, step-size guidelines, simulation size trade-offs, implementation checklist
- [[SMM Weighting Matrix and Inference]] — CONTAINS: Identity W, two-step W procedure (R×S error matrix, Ω̂₂ = (1/S)EEᵀ, W̃ = Ω̂₂⁻¹), iterated W, Newey-West HAC W, Σ̂_SMM via Jacobian, identification (exact/over/under)
- [[SMM Python Implementation]] — CONTAINS: General Python SMM workflow, fixed random draws, trunc_norm_draws (inverse CDF), err_vec/criterion functions, L-BFGS-B eps stepsize fix, numerical Jacobian, two-step W code, indirect inference pattern, results comparison table
- [[Brock-Mirman Model - SMM Estimation Exercise]] — CONTAINS: BM1972 six-equation system, latent TFP AR(1), closed-form policy function, simulation algorithm, 6-moment estimation setup (mean c, mean k, mean c/y, var y, corr(c,c-1), corr(c,k)), two-part exercise (identity W + two-step W)

## Sources

- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- [[raw/19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]] — Evans (2024), Computational Methods for Economists, Ch. 19: full SMM tutorial with Python code, truncated normal example, Brock-Mirman exercise

## See Also

- [[Copula SMM/_Index|Copula SMM]] — application of these methods to copula models (Oh & Patton 2011)
- [[Standard Errors and Clustering]] — analogous HAC inference in GMM/OLS
- [[Copula Estimation]] — Bayesian alternative for copula models
