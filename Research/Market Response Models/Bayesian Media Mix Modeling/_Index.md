---
title: "Index: Bayesian Media Mix Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Market Response Models]]"
date_updated: 2026-10-13
concept_count: 13
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
> - Need the **simulation DGP, Table 1 parameters, the Eq. 17 signal-strength metric, or Table 3 priors**? -> [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]
> - Need **simulated ROAS/mROAS recovery (Fig. 5) or the unimodal vs trimodal optimal mix (Fig. 6)**? -> [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]]
> - Need the **sample size vs bias simulation / full Table 4 (two vs sixty years)**? -> [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]
> - Need the **prior-sensitivity experiments on beta and K (Tables 5-6, Figs. 9-12)**? -> [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]
> - Need the **shampoo data, control orthogonalisation, full Tables 8-9, Figs. 13-17 diagnostics**? -> [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]
> - Need the **verbatim Stan program and the Gibbs/slice scheme**? -> [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]
> - Need **stated limitations, the adstock-then-shape ordering rule, extensions or an MMM audit checklist**? -> [[Jin 2017 MMM - Conclusions, Limitations and Extensions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| MMM overview & combined model | [[Bayesian Media Mix Modeling - Overview]] | overview | Carryover, Shape | Additive model $y_t = \tau + \sum_m \beta_m\text{Hill}(\text{adstock}(x)) + \sum_c \gamma_c z_{t,c} + \epsilon_t$; Bayesian to offset weak single-dataset signal |
| Adstock / carryover | [[Carryover (Adstock) Functional Forms]] | definition | [[Carryover Effects and Distributed Lags]] | Geometric decay $\alpha_m^l$ (= Koyck analog) and delayed/peak $\alpha_m^{(l-\theta_m)^2}$ (Gaussian kernel), finite-window normalized |
| Shape / saturation | [[Shape (Saturation) Effects]] | definition | [[Shape of the Marketing Response Function]] | Hill $\frac{1}{1+(x/\mathcal{K})^{-\mathcal{S}}}$; $\beta$Hill poorly identifiable → prefer reach ($\mathcal{S}=1$) |
| Bayesian estimation & priors | [[Bayesian Estimation and Priors for MMM]] | concept | Overview, Carryover, Shape, [[MCMC Basics]] | Gibbs/HMC MCMC; small samples → posterior dominated by prior → biased estimates |
| ROAS, mROAS, optimal mix | [[ROAS, mROAS, and Optimal Media Mix]] | definition | Bayesian Estimation | Counterfactual zero/perturb spend incl. post-change period; optimal mix has large (multimodal) variance |
| Model selection & application | [[MMM Model Selection and Application]] | example | all of the above | BIC picks parsimonious Model IV (geometric + reach), BIC 51.49; large samples recover, two-year samples biased |
| Simulation design | [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] | example | Overview, Carryover, Shape | DGP with Table 1 parameters; signal strength metric (Eq. 17); Table 3 priors |
| Simulated attribution and optimisation | [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]] | example | ROAS, mROAS, and Optimal Media Mix | ROAS/mROAS recovered in large samples; optimal mix unimodal (Scenario I) vs trimodal (Scenario II) |
| Sample size vs bias | [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] | example | Bayesian Estimation and Priors for MMM | Two years: curves underestimated by about 18-40%; sixty years: bias near zero (500 replicates) |
| Prior sensitivity | [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] | example | Bayesian Estimation and Priors for MMM | Prior on beta and K moves attribution by 15-20 points in short series |
| Shampoo case study detail | [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]] | example | MMM Model Selection and Application | n = 106 weeks; orthogonalised controls cut Stan time 3040 s to 75 s; retention posterior equals prior |
| Stan implementation | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] | method | Bayesian Estimation and Priors for MMM | Verbatim Appendix Stan program mapped to paper notation |
| Scope and extensions | [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] | concept | whole cluster | Not causal by construction; adstock before shape; hierarchical/geo/simulator extensions |

## Notes

- [[Bayesian Media Mix Modeling - Overview]] — CONTAINS: definition of MMM and the 4Ps lineage; the combined additive regression equation (Eq. 7); motivation for the Bayesian approach; carryover + shape framing; headline findings (large-sample recovery, small-sample prior bias, high optimal-mix variance).
- [[Carryover (Adstock) Functional Forms]] — CONTAINS: the normalized finite-window adstock (Eq. 1); geometric decay weights and retention rate $\alpha_m$ (Eq. 2); delayed/peak adstock with delay $\theta_m$ as a Gaussian radial kernel (Eq. 3); choice of carryover length $L$; explicit Koyck-lag connection.
- [[Shape (Saturation) Effects]] — CONTAINS: the Hill function (Eq. 4); the $\beta$Hill scaled transform (Eq. 5); the one-parameter reach transformation (Eq. 6); slope $\mathcal{S}$ vs half-saturation $\mathcal{K}$ behavior (concave vs S-shape); the near-unidentifiability problem.
- [[Bayesian Estimation and Priors for MMM]] — CONTAINS: MLE vs posterior (Eqs. 8-9); Gibbs (slice/BOOM) vs STAN/HMC samplers; per-parameter prior specifications and rationale; prior-dominance-in-small-samples finding; $\beta$- and $\mathcal{K}$-prior sensitivity studies.
- [[ROAS, mROAS, and Optimal Media Mix]] — CONTAINS: ROAS (Eq. 10) and mROAS (Eq. 11) definitions with post-change-period accounting; plug-posterior-samples-not-means rule; constrained optimal-mix optimization (Eqs. 12-16); the bimodal/high-variance optimal-mix caveat.
- [[MMM Model Selection and Application]] — CONTAINS: BIC formula (Eq. 18); the four candidate specifications (Table 7); sample-size recovery simulations (Tables 4); sampler timing (Table 8); the shampoo dataset, BIC table (Table 9, Model IV wins), real-data ROAS/mROAS, optimization, and residual-autocorrelation misspecification diagnostic.

- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] — CONTAINS: data-generating process; Table 1 generating parameters; Eq. 17 signal-strength metric; Table 2; Table 3 priors; Fig. 4 correlations; Fig. 18 single-dataset posteriors; sampler timing.
- [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]] — CONTAINS: attribution windows and Fig. 3; Fig. 5 ROAS/mROAS recovery; optimisation design; two-approach optimal-mix algorithm; Fig. 6 Scenario I unimodal vs Scenario II trimodal.
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] — CONTAINS: ADEMP-style design of the 500-replicate study; full Table 4 (relative bias of betaHill at x=0.5 and x=1, two vs sixty years); Figs. 7-8; worked conversion of bias to curve units; prior-driven bias mechanism; sixty-years caveat.
- [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] — CONTAINS: Sec. 7.1 design, full Table 5 and Figs. 9-10; Sec. 7.2 Scenarios I/II, full Table 6 and Figs. 11-12; footnote 3 definition of support.
- [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]] — CONTAINS: data description and n = 106; Fig. 13 correlation tables; control-orthogonalisation algorithm; full Table 8; Table 9 with footnotes 5-7; Figs. 14-17 (per-model ROAS, bimodal optimum, posterior equal to prior, wider Hill bands, residual ACF to lag 15).
- [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] — CONTAINS: verbatim Appendix Stan program; code-to-notation map; notes on running it with current Stan; reconstructed Gibbs/slice scheme; timing table.
- [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] — CONTAINS: stated scope limits (not causal, no synergy, independent channels, curvature forms, BIC not causal); adstock-then-shape ordering rule; Sec. 9 conclusions; hierarchical, geo and simulator extensions; MMM audit checklist.

## Sources

- [[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]] — Jin, Y., Wang, Y., Sun, Y., Chan, D., & Koehler, J. (2017). *Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects.* Google Inc., 14 April 2017. 34 pp.

## See Also

- [[../_Index|Market Response Models]]
- [[Carryover Effects and Distributed Lags]] — Koyck / distributed-lag foundations
- [[Shape of the Marketing Response Function]] — concave vs S-shaped response
- [[Advertising and Promotion Effects]] — advertising elasticity (~0.10) benchmarks
- [[Activity Bias in Advertising]] — observational-causality confound for MMM
- [[MCMC Basics]] · [[Bayesian Linear Regression]] — Bayesian computation
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — companion Google white paper on why MMMs are hard to validate
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — simulator proposed in Jin et al. Sec. 9 for testing MMMs on known truth
- [[Model Validation and Interpretability - Overview]] — how to validate a model before it informs decisions
