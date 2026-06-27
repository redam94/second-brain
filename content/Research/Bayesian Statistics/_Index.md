---
title: "Index: Bayesian Statistics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-06-27
concept_count: 66
---

# Bayesian Statistics

> [!abstract] Routing Summary
> This folder covers comprehensive Bayesian statistics from BDA3, Statistical Rethinking, the Bayesian Workflow paper, simulation-based calibration (SBC), synthetic likelihood, and PyMC tutorials. Contains 70 notes across 8 sub-topics.
> - Need inference basics (Bayes' theorem, conjugate priors, hierarchical)? -> [[Research/Bayesian Statistics/Inference Fundamentals/_Index|Inference Fundamentals]]
> - Need model evaluation (PPC, WAIC, LOO)? -> [[Research/Bayesian Statistics/Model Assessment/_Index|Model Assessment]]
> - Need MCMC, HMC, or variational inference? -> [[Research/Bayesian Statistics/Computation/_Index|Computation]]
> - Need regression, GLMs, or missing data? -> [[Research/Bayesian Statistics/Regression Models/_Index|Regression Models]]
> - Need GPs, mixtures, spatial, or causal BART? -> [[Research/Bayesian Statistics/Advanced Models/_Index|Advanced Models]]
> - Need Bayesian causal inference (potential outcomes, BART/BCF, IV, g-computation)? -> [[Research/Bayesian Statistics/Causal Inference/_Index|Causal Inference]]
> - Need the iterative modeling cycle **or simulation-based calibration (SBC) for validating inference algorithms**? -> [[Research/Bayesian Statistics/Workflow/_Index|Bayesian Workflow]]
> - Need **likelihood-free / simulation-based inference for chaotic dynamic models (synthetic likelihood)**? -> [[Research/Bayesian Statistics/Synthetic Likelihood/_Index|Synthetic Likelihood]]

## Book Overviews

- [[BDA3 - Overview]] — Master index for the textbook's structure and key themes
- [[Statistical Rethinking - Overview]] — McElreath's pedagogical Bayesian course with R and Stan

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Research/Bayesian Statistics/Inference Fundamentals/_Index\|Inference Fundamentals]] | 8 | Bayes' theorem, conjugate models, hierarchical models (BDA3 Part I) |
| [[Research/Bayesian Statistics/Model Assessment/_Index\|Model Assessment]] | 5 | Posterior predictive checks, model comparison, decision analysis (BDA3 Part II) |
| [[Research/Bayesian Statistics/Computation/_Index\|Computation]] | 5 | MCMC, HMC, variational inference, Stan (BDA3 Part III) |
| [[Research/Bayesian Statistics/Regression Models/_Index\|Regression Models]] | 9 | Bayesian regression, multilevel models, GLMs, missing data (BDA3 Part IV) |
| [[Research/Bayesian Statistics/Advanced Models/_Index\|Advanced Models]] | 10 | GPs, mixtures, Dirichlet processes, spatial, copulas, BART, Bayesian IPW (BDA3 Part V + PyMC) |
| [[Research/Bayesian Statistics/Workflow/_Index\|Bayesian Workflow]] | 13 | The iterative modeling cycle (Gelman et al. 2020) + simulation-based calibration: data-averaged posterior self-consistency, rank uniformity, the SBC algorithm, histogram diagnostics, case studies (Talts et al. 2018) |
| [[Research/Bayesian Statistics/Causal Inference/_Index\|Causal Inference]] | 39 | Potential outcomes, BART/BCF outcome models, propensity score, IV, g-formula, metalearners, BSTS/CausalImpact, knowledge elicitation, and dynamic treatment regimes (Q-/A-learning) |
| [[Research/Bayesian Statistics/Synthetic Likelihood/_Index\|Synthetic Likelihood]] | 4 | Likelihood-free inference for noisy chaotic dynamic models: phase-insensitive summary statistics, the MVN synthetic likelihood, MCMC exploration, Nicholson's blowfly application (Wood 2010, *Nature*) |

## Sources

- [[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]] — Wood, S.N. (2010), *Statistical inference for noisy nonlinear ecological dynamic systems*, **Nature** 466(7310):1102–1104 (synthetic likelihood)
- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman, Carlin, Stern, Dunson, Vehtari, Rubin)
- [[raw/BayesWorkflow.pdf]] — Bayesian Workflow (Gelman, Vehtari, Simpson et al., 2020)
- [[raw/1804.06788-Talts-SBC.pdf|Talts et al. - Simulation-Based Calibration]] — Talts, Betancourt, Simpson, Vehtari & Gelman (2018), "Validating Bayesian Inference Algorithms with Simulation-Based Calibration" (arXiv:1804.06788)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015)
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[Causal Inference/raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — Li, Ding & Mealli (2022): Bayesian causal inference critical review, *Phil. Trans. R. Soc. A* 381

## See Also

- [[Research/Research Methodology/_Index|Research Methodology]] — Multiple comparisons, causal inference in advertising
- [[Research/Econometrics/_Index|Econometrics]] — Frequentist/econometric perspective on causal inference
- [[Mostly Harmless Econometrics - Overview]] — Frequentist/econometric perspective on related topics
