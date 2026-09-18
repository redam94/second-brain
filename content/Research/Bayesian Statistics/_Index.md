---
title: "Index: Bayesian Statistics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-09-18
concept_count: 217
---

# Bayesian Statistics

> [!abstract] Routing Summary
> This folder covers comprehensive Bayesian statistics from BDA3, Statistical Rethinking, the **2026 *Bayesian Workflow* textbook** (Gelman, Vehtari & McElreath), the 2020 Bayesian Workflow paper, simulation-based calibration (SBC), synthetic likelihood, and PyMC tutorials. Contains 201 notes across 8 sub-topics.
> - Need inference basics (Bayes' theorem, conjugate priors, hierarchical)? -> [[Research/Bayesian Statistics/Inference Fundamentals/_Index|Inference Fundamentals]]
> - Need model evaluation (PPC, WAIC, LOO)? -> [[Research/Bayesian Statistics/Model Assessment/_Index|Model Assessment]]
> - Need MCMC, HMC, or variational inference? -> [[Research/Bayesian Statistics/Computation/_Index|Computation]]
> - Need **variational inference in depth** (ELBO, ADVI, VAEs, diagnostics) or **neural simulation-based inference** (NPE/NLE/NRE for simulators and ABMs)? -> [[Research/Bayesian Statistics/Computation/Variational Inference/_Index|Variational Inference]], [[Research/Bayesian Statistics/Computation/Neural Simulation-Based Inference/_Index|Neural Simulation-Based Inference]]
> - Need regression, GLMs, or missing data? -> [[Research/Bayesian Statistics/Regression Models/_Index|Regression Models]]
> - Need GPs, mixtures, spatial, or causal BART? -> [[Research/Bayesian Statistics/Advanced Models/_Index|Advanced Models]]
> - Need Bayesian causal inference (potential outcomes, BART/BCF, IV, g-computation)? -> [[Research/Bayesian Statistics/Causal Inference/_Index|Causal Inference]]
> - Need the iterative modeling cycle, **the full 2026 *Bayesian Workflow* textbook (79 notes incl. 16 case studies)**, or simulation-based calibration (SBC)? -> [[Research/Bayesian Statistics/Workflow/_Index|Bayesian Workflow]], starting at [[Bayesian Workflow Book - Overview]]
> - Need **likelihood-free / simulation-based inference for chaotic dynamic models (synthetic likelihood)**? -> [[Research/Bayesian Statistics/Synthetic Likelihood/_Index|Synthetic Likelihood]]

## Book Overviews

- [[BDA3 - Overview]] — Master index for the textbook's structure and key themes
- [[Statistical Rethinking - Overview]] — McElreath's pedagogical Bayesian course with R and Stan
- [[Bayesian Workflow Book - Overview]] — Gelman, Vehtari & McElreath (2026): the workflow textbook, 31 chapters + 2 appendices, 79 notes

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Research/Bayesian Statistics/Inference Fundamentals/_Index\|Inference Fundamentals]] | 8 | Bayes' theorem, conjugate models, hierarchical models (BDA3 Part I) |
| [[Research/Bayesian Statistics/Model Assessment/_Index\|Model Assessment]] | 5 | Posterior predictive checks, model comparison, decision analysis (BDA3 Part II) |
| [[Research/Bayesian Statistics/Computation/_Index\|Computation]] | 21 | MCMC, HMC, variational inference, Stan (BDA3 Part III); **Variational Inference** sub-topic (8 notes: ELBO, CAVI, BBVI, ADVI, VAEs, flows, PSIS/VSBC diagnostics) and **Neural Simulation-Based Inference** sub-topic (8 notes: NPE/NLE/NRE, flows, amortized vs sequential, benchmarking, ABM calibration) |
| [[Research/Bayesian Statistics/Regression Models/_Index\|Regression Models]] | 9 | Bayesian regression, multilevel models, GLMs, missing data (BDA3 Part IV) |
| [[Research/Bayesian Statistics/Advanced Models/_Index\|Advanced Models]] | 10 | GPs, mixtures, Dirichlet processes, spatial, copulas, BART, Bayesian IPW (BDA3 Part V + PyMC) |
| [[Research/Bayesian Statistics/Workflow/_Index\|Bayesian Workflow]] | 92 | **The 2026 *Bayesian Workflow* textbook in full** (79 notes: foundations, model building and priors, evaluation and comparison, computation and failure modes, SBC, 16 case studies, 2 appendices) + the 2020 paper it expands (7 notes) + simulation-based calibration theory (Talts et al. 2018, 6 notes) |
| [[Research/Bayesian Statistics/Causal Inference/_Index\|Causal Inference]] | 39 | Potential outcomes, BART/BCF outcome models, propensity score, IV, g-formula, metalearners, BSTS/CausalImpact, knowledge elicitation, and dynamic treatment regimes (Q-/A-learning) |
| [[Research/Bayesian Statistics/Synthetic Likelihood/_Index\|Synthetic Likelihood]] | 4 | Likelihood-free inference for noisy chaotic dynamic models: phase-insensitive summary statistics, the MVN synthetic likelihood, MCMC exploration, Nicholson's blowfly application (Wood 2010, *Nature*) |

## Sources

- [[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]] — Wood, S.N. (2010), *Statistical inference for noisy nonlinear ecological dynamic systems*, **Nature** 466(7310):1102–1104 (synthetic likelihood)
- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman, Carlin, Stern, Dunson, Vehtari, Rubin)
- [[Workflow/raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]] — Gelman, Vehtari & McElreath (2026), *Bayesian Workflow*, 550 pp. (textbook)
- [[raw/BayesWorkflow.pdf]] — Bayesian Workflow (Gelman, Vehtari, Simpson et al., 2020)
- [[raw/1804.06788-Talts-SBC.pdf|Talts et al. - Simulation-Based Calibration]] — Talts, Betancourt, Simpson, Vehtari & Gelman (2018), "Validating Bayesian Inference Algorithms with Simulation-Based Calibration" (arXiv:1804.06788)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015)
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[Causal Inference/raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — Li, Ding & Mealli (2022): Bayesian causal inference critical review, *Phil. Trans. R. Soc. A* 381

## See Also

- [[Research/Research Methodology/_Index|Research Methodology]] — Multiple comparisons, causal inference in advertising
- [[Research/Econometrics/_Index|Econometrics]] — Frequentist/econometric perspective on causal inference
- [[Mostly Harmless Econometrics - Overview]] — Frequentist/econometric perspective on related topics
