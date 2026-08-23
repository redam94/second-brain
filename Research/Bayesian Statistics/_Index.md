---
title: "Index: Bayesian Statistics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-06-17
concept_count: 60
---

# Bayesian Statistics

> [!abstract] Routing Summary
> This folder covers comprehensive Bayesian statistics from BDA3, Statistical Rethinking, the Bayesian Workflow paper, simulation-based calibration (SBC), and PyMC tutorials. Contains 60 notes across 7 sub-topics.
> - Need inference basics (Bayes' theorem, conjugate priors, hierarchical)? -> [[Inference Fundamentals/_Index|Inference Fundamentals]]
> - Need model evaluation (PPC, WAIC, LOO)? -> [[Model Assessment/_Index|Model Assessment]]
> - Need MCMC, HMC, or variational inference? -> [[Computation/_Index|Computation]]
> - Need regression, GLMs, or missing data? -> [[Regression Models/_Index|Regression Models]]
> - Need GPs, mixtures, spatial, or causal BART? -> [[Advanced Models/_Index|Advanced Models]]
> - Need Bayesian causal inference (potential outcomes, BART/BCF, IV, g-computation)? -> [[Causal Inference/_Index|Causal Inference]]
> - Need the iterative modeling cycle **or simulation-based calibration (SBC) for validating inference algorithms**? -> [[Workflow/_Index|Bayesian Workflow]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Bayes' theorem, probability as belief | [[Probability and Bayesian Inference]] | definition | — | Three-step Bayesian workflow |
| Single-parameter conjugate models | [[Single-Parameter Models]] | concept | [[Probability and Bayesian Inference]] | Beta-binomial, Normal-Normal conjugacy |
| Nuisance parameter marginalization | [[Multiparameter Models]] | concept | [[Single-Parameter Models]] | Joint-to-marginal posterior |
| Bernstein-von Mises theorem | [[Asymptotics and Frequentist Connections]] | theorem | [[Multiparameter Models]] | Posterior → N(MLE, I⁻¹) asymptotically |
| Partial pooling via exchangeability | [[Hierarchical Models]] | concept | [[Multiparameter Models]] | Eight-schools; precision-weighted pooling |
| Posterior predictive checks | [[Model Checking]] | concept | [[Hierarchical Models]] | Bayesian goodness-of-fit |
| WAIC, PSIS-LOO | [[Model Comparison]] | concept | [[Model Checking]] | Information-criteria model selection |
| HMC, NUTS, Stan | [[Efficient MCMC]] | concept | [[MCMC Basics]] | Gradient-based sampler |
| SBC rank uniformity | [[Simulation-Based Calibration]] | theorem | [[Efficient MCMC]] | Algorithm validation |
| Bayesian linear regression, horseshoe | [[Bayesian Linear Regression]] | concept | [[Hierarchical Models]] | Priors as regularization |
| BART, BCF | [[Bayesian Outcome Models]] | concept | [[Bayesian Linear Regression]] | Nonparametric causal outcome models |

## Book Overviews

- [[BDA3 - Overview]] — CONTAINS: full structure of BDA3 Parts I–V; key themes; author list
- [[Statistical Rethinking - Overview]] — CONTAINS: golem metaphor; course structure Ch. 1–15; comparison with BDA3

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Inference Fundamentals/_Index\|Inference Fundamentals]] | 8 | Bayes' theorem, conjugate models, hierarchical models (BDA3 Part I) |
| [[Model Assessment/_Index\|Model Assessment]] | 5 | Posterior predictive checks, model comparison, decision analysis (BDA3 Part II) |
| [[Computation/_Index\|Computation]] | 5 | MCMC, HMC, variational inference, Stan (BDA3 Part III) |
| [[Regression Models/_Index\|Regression Models]] | 9 | Bayesian regression, multilevel models, GLMs, missing data (BDA3 Part IV) |
| [[Advanced Models/_Index\|Advanced Models]] | 10 | GPs, mixtures, Dirichlet processes, spatial, copulas, BART, Bayesian IPW (BDA3 Part V + PyMC) |
| [[Workflow/_Index\|Bayesian Workflow]] | 13 | The iterative modeling cycle (Gelman et al. 2020) + simulation-based calibration: data-averaged posterior self-consistency, rank uniformity, the SBC algorithm, histogram diagnostics, case studies (Talts et al. 2018) |
| [[Causal Inference/_Index\|Causal Inference]] | 10 | Potential outcomes, BART/BCF outcome models, propensity score, IV, g-formula (Li et al. 2022) |

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman, Carlin, Stern, Dunson, Vehtari, Rubin)
- [[raw/BayesWorkflow.pdf]] — Bayesian Workflow (Gelman, Vehtari, Simpson et al., 2020)
- [[raw/1804.06788-Talts-SBC.pdf|Talts et al. - Simulation-Based Calibration]] — Talts, Betancourt, Simpson, Vehtari & Gelman (2018), "Validating Bayesian Inference Algorithms with Simulation-Based Calibration" (arXiv:1804.06788)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015)
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[Causal Inference/raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — Li, Ding & Mealli (2022): Bayesian causal inference critical review, *Phil. Trans. R. Soc. A* 381

## See Also

- [[Research Methodology/_Index|Research Methodology]] — Multiple comparisons, causal inference in advertising
- [[Econometrics/_Index|Econometrics]] — Frequentist/econometric perspective on causal inference
- [[Mostly Harmless Econometrics - Overview]] — Frequentist/econometric perspective on related topics
