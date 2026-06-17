---
title: "Index: Bayesian Media Mix Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Market Response Models]]"
date_updated: 2026-06-17
concept_count: 6
---

# Index: Bayesian Media Mix Modeling

Deep ingestion of Jin, Wang, Sun, Chan & Koehler (Google, 2017), *"Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects"* — a flexible-functional-form media mix model (MMM) estimated by MCMC, with attribution metrics (ROAS/mROAS), optimal-mix derivation, prior-sensitivity analysis, BIC model selection, and a shampoo-advertiser application.

> [!abstract] Routing Summary
> - Need **what MMM is / why Bayesian / key findings**? -> [[Bayesian Media Mix Modeling - Overview]]
> - Need the **carryover / adstock formulas** (geometric decay, delayed/peak adstock, finite-window normalization)? -> [[Carryover (Adstock) Functional Forms]]
> - Need the **saturation / shape forms** (Hill function, $\beta$Hill, reach transform, identifiability)? -> [[Shape (Saturation) Effects]]
> - Need the **likelihood, MCMC samplers, prior choices, and small-sample prior dominance**? -> [[Bayesian Estimation and Priors for MMM]]
> - Need **ROAS / mROAS definitions, optimal media mix, and the high-variance caveat**? -> [[ROAS, mROAS, and Optimal Media Mix]]
> - Need **BIC model selection, simulation recovery results, or the shampoo case study**? -> [[MMM Model Selection and Application]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| MMM overview & combined model | [[Bayesian Media Mix Modeling - Overview]] | overview | Carryover, Shape | Additive model $y_t = \tau + \sum_m \beta_m\text{Hill}(\text{adstock}(x)) + \sum_c \gamma_c z_{t,c} + \epsilon_t$; Bayesian to offset weak single-dataset signal |
| Adstock / carryover | [[Carryover (Adstock) Functional Forms]] | definition | [[Carryover Effects and Distributed Lags]] | Geometric decay $\alpha_m^l$ (= Koyck analog) and delayed/peak $\alpha_m^{(l-\theta_m)^2}$ (Gaussian kernel), finite-window normalized |
| Shape / saturation | [[Shape (Saturation) Effects]] | definition | [[Shape of the Marketing Response Function]] | Hill $\frac{1}{1+(x/\mathcal{K})^{-\mathcal{S}}}$; $\beta$Hill poorly identifiable → prefer reach ($\mathcal{S}=1$) |
| Bayesian estimation & priors | [[Bayesian Estimation and Priors for MMM]] | concept | Overview, Carryover, Shape, [[MCMC Basics]] | Gibbs/HMC MCMC; small samples → posterior dominated by prior → biased estimates |
| ROAS, mROAS, optimal mix | [[ROAS, mROAS, and Optimal Media Mix]] | definition | Bayesian Estimation | Counterfactual zero/perturb spend incl. post-change period; optimal mix has large (multimodal) variance |
| Model selection & application | [[MMM Model Selection and Application]] | example | all of the above | BIC picks parsimonious Model IV (geometric + reach), BIC 51.49; large samples recover, two-year samples biased |

## Notes

- [[Bayesian Media Mix Modeling - Overview]] — CONTAINS: definition of MMM and the 4Ps lineage; the combined additive regression equation (Eq. 7); motivation for the Bayesian approach; carryover + shape framing; headline findings (large-sample recovery, small-sample prior bias, high optimal-mix variance).
- [[Carryover (Adstock) Functional Forms]] — CONTAINS: the normalized finite-window adstock (Eq. 1); geometric decay weights and retention rate $\alpha_m$ (Eq. 2); delayed/peak adstock with delay $\theta_m$ as a Gaussian radial kernel (Eq. 3); choice of carryover length $L$; explicit Koyck-lag connection.
- [[Shape (Saturation) Effects]] — CONTAINS: the Hill function (Eq. 4); the $\beta$Hill scaled transform (Eq. 5); the one-parameter reach transformation (Eq. 6); slope $\mathcal{S}$ vs half-saturation $\mathcal{K}$ behavior (concave vs S-shape); the near-unidentifiability problem.
- [[Bayesian Estimation and Priors for MMM]] — CONTAINS: MLE vs posterior (Eqs. 8-9); Gibbs (slice/BOOM) vs STAN/HMC samplers; per-parameter prior specifications and rationale; prior-dominance-in-small-samples finding; $\beta$- and $\mathcal{K}$-prior sensitivity studies.
- [[ROAS, mROAS, and Optimal Media Mix]] — CONTAINS: ROAS (Eq. 10) and mROAS (Eq. 11) definitions with post-change-period accounting; plug-posterior-samples-not-means rule; constrained optimal-mix optimization (Eqs. 12-16); the bimodal/high-variance optimal-mix caveat.
- [[MMM Model Selection and Application]] — CONTAINS: BIC formula (Eq. 18); the four candidate specifications (Table 7); sample-size recovery simulations (Tables 4); sampler timing (Table 8); the shampoo dataset, BIC table (Table 9, Model IV wins), real-data ROAS/mROAS, optimization, and residual-autocorrelation misspecification diagnostic.

## Sources

- [[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]] — Jin, Y., Wang, Y., Sun, Y., Chan, D., & Koehler, J. (2017). *Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects.* Google Inc., 14 April 2017. 34 pp.

## See Also

- [[../_Index|Market Response Models]]
- [[Carryover Effects and Distributed Lags]] — Koyck / distributed-lag foundations
- [[Shape of the Marketing Response Function]] — concave vs S-shaped response
- [[Advertising and Promotion Effects]] — advertising elasticity (~0.10) benchmarks
- [[Activity Bias in Advertising]] — observational-causality confound for MMM
- [[MCMC Basics]] · [[Bayesian Linear Regression]] — Bayesian computation
