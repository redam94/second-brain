---
title: "Index: Research"
tags:
  - type/index
  - source/ingested
date_updated: 2026-04-11
concept_count: 136
---

# Research

> [!abstract] Routing Summary
> This folder covers applied statistics, econometrics, causal inference, theoretical physics, agent-based modeling, and market response models from textbooks and research papers. Contains 136 notes across 6 major topics.
> - Need Bayesian inference, computation, or regression? -> [[Bayesian Statistics/_Index|Bayesian Statistics]]
> - Need causal inference toolkit (IV, DiD, RD, synthetic control, DAGs)? -> [[Econometrics/_Index|Econometrics]]
> - Need forking paths, power analysis, or ad measurement? -> [[Research Methodology/_Index|Research Methodology]]
> - Need quantum mechanics, QFT, or gauge theory? -> [[Theoretical Physics/_Index|Theoretical Physics]]
> - Need ABM methodology, consumer behavior simulation, or WOM modeling? -> [[Agent-Based Modeling/_Index|Agent-Based Modeling]]
> - Need market response models (functional forms, carryover, VAR, empirical elasticities)? -> [[Market Response Models/_Index|Market Response Models]]
> - Need a specific concept? Check the Concept Map below or use the .base files for database views

## Concept Map

| Topic | Notes | Key Concepts |
|-------|-------|-------------|
| [[Bayesian Statistics/_Index\|Bayesian Statistics]] | 54 | Bayes' theorem, conjugate priors, hierarchical models, MCMC/HMC, GLMs, GPs, spatial, copulas, BART, Bayesian IPW, Bayesian causal inference |
| [[Econometrics/_Index\|Econometrics]] | 24 | Selection bias, CEF, IV, LATE, DiD, RD, synthetic control, GSC, quantile regression, discrete choice, DAGs |
| [[Research Methodology/_Index\|Research Methodology]] | 8+4 | Forking paths, researcher degrees of freedom, activity bias, power analysis, FDR, survival analysis, Type S/M errors, Bayesian multiple comparisons |
| [[Theoretical Physics/_Index\|Theoretical Physics]] | 7 | Quantum mechanics, Hilbert space, Schrödinger equation, QFT, second quantization, QED, renormalization, gauge theory, Standard Model |
| [[Agent-Based Modeling/_Index\|Agent-Based Modeling]] | 29 | ABM methodology, emergence, heterogeneity, consumer utility models, CUBES behavioral simulator, WOM, opinion leaders, network diffusion, GA calibration, validation |
| [[Market Response Models/_Index\|Market Response Models]] | 25 | Functional forms (10), Koyck/ADL carryover, reaction functions, OLS/2SLS/Bayes estimation, ARIMA, transfer functions, VAR, cointegration, ECM, empirical generalizations (advertising ≈ 0.10, price ≈ −2.5) |

## Cross-Cutting Themes

- **Bayesian vs. Frequentist**: [[Asymptotics and Frequentist Connections]], [[Forking Paths and Bayesian Approaches]]
- **Causal Inference**: [[The Experimental Ideal]], [[Activity Bias in Advertising]], [[Data Collection Models]], [[Counterfactual Inference]], [[Nonparametric Causal Inference]], [[Directed Acyclic Graphs]], [[Synthetic Control]], [[Bayesian Inverse Probability Weighting]]
- **Model Building**: [[Bayesian Workflow - Overview]], [[Model Checking]], [[Model Comparison]], [[Overfitting and Information Criteria]]
- **Multiple Comparisons**: [[Multiple Comparisons - Bayesian Perspective]], [[Multiple Testing Corrections]], [[Type S and Type M Errors]], [[Partial Pooling as Multiple Comparisons Correction]]
- **Missing Data**: [[Missing Data Models]], [[Missing Data - Statistical Rethinking]], [[Data Collection Models]]
- **Regression**: [[Bayesian Linear Regression]], [[Regression and the CEF]], [[Hierarchical Linear Models]], [[Generalized Linear Models]]
- **Theoretical Physics Chain**: [[Quantum Mechanics - Overview]] → [[Quantum Mechanics - Mathematical Formalism]] → [[Quantum Field Theory - Overview]] → [[QED and Renormalization]] → [[Gauge Theory - Overview]] → [[Standard Model and Gauge Groups]]

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman et al., 2013/2025)
- [[raw/BayesWorkflow.pdf]] — Bayesian Workflow (Gelman, Vehtari, Simpson et al., 2020)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking: A Bayesian Course (McElreath, 2015)
- [[raw/p_hacking.pdf]] — The Garden of Forking Paths (Gelman & Loken, 2013)
- [[raw/ssrn-2080235.pdf]] — Here, There, and Everywhere (Lewis, Rao, & Reiley, 2011)
- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008)
- [[raw/Discrete Choice and Random Utility Models]] — PyMC tutorial: Bayesian discrete choice / random utility models (2026-04-08)
- [[raw/Factor analysis]] — PyMC tutorial: factor analysis and probabilistic PCA (2026-04-08)
- [[raw/Baby Births Modelling with HSGPs]] — PyMC tutorial: Hilbert Space Gaussian Processes for time series (2026-04-09)
- [[raw/Bayesian Non-parametric Causal Inference]] — PyMC tutorial: BART + propensity scores for causal ATE/ATT estimation (2026-04-09)
- [[raw/Bayesian copula estimation Describing correlated joint distributions]] — PyMC tutorial: Gaussian copula for joint distributions (2026-04-09)
- [[raw/Missing Data]] — PyMC / Statistical Rethinking Lecture 18: DAG-based missing data analysis (2026-04-09)
- [[raw/Counterfactual inference calculating excess deaths due to COVID-19]] — PyMC tutorial: Bayesian counterfactual inference, COVID excess deaths (2026-04-09)
- [[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics]] — PyMC case study: CFA and SEM for psychometrics (2026-04-09)
- [[raw/The Besag-York-Mollie Model for Spatial Data]] — PyMC tutorial: BYM spatial model on NYC traffic data (2026-04-09)
- [[raw/Difference in differences]] — PyMC tutorial: Bayesian DiD with counterfactual prediction (2026-04-09)
- [[raw/Social Networks]] — PyMC / Statistical Rethinking Lecture 15: dyadic social network models (2026-04-09)
- [[raw/Bayesian moderation analysis]] — PyMC tutorial: moderation analysis with interaction terms (2026-04-09)
- [[raw/multiple2f.pdf]] — "Why we (usually) don't have to worry about multiple comparisons" (Gelman, Hill & Yajima, 2009)
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Causal Inference for the Brave and True, Ch. 15: synthetic control with Python (Matheu Facure, 2023)
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Graham Harrison, Towards Data Science (2023-04-06): DAGs, confounders, backdoor adjustment, d-separation
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[raw/Quantum mechanics]] — Wikipedia: quantum mechanics, Hilbert space formalism, Schrödinger equation, entanglement, Bell's theorem (2026-04-11)
- [[raw/Quantum field theory]] — Wikipedia: quantum field theory, canonical quantization, Fock space, path integrals, Feynman diagrams (2026-04-11)
- [[raw/Gauge theory]] — Wikipedia: gauge theory, local symmetry, Yang-Mills, Standard Model gauge groups (2026-04-11)
- [[Market Response Models/raw/Market Response Models Econometric and Time Series Analysis.pdf|Market Response Models Econometric and Time Series Analysis]] — Hanssens, Parsons & Schultz (2001), 2nd Ed.: functional forms, Koyck/ADL lags, OLS/2SLS/Bayes, ARIMA, transfer functions, VAR/cointegration/ECM, advertising/price empirical generalizations
- [[Agent-Based Modeling/raw/abm_word_of_mouth.pdf]] — Bonabeau (2002), ABM methods and techniques for simulating human systems (PNAS)
- [[Agent-Based Modeling/raw/abm_consumer.pdf]] — Karakaya, Badur & Aytekin (2011), marketing strategies with WOM using ABM
- [[Agent-Based Modeling/raw/abm_human_behaviour.pdf]] — Ben Said, Bouron & Drogoul (2002), CUBES consumer behavior simulator

## See Also

- [[Clippings/_Index|Clippings]] — Web articles and saved content
