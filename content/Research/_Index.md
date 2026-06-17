---
title: "Index: Research"
tags:
  - type/index
  - source/ingested
date_updated: 2026-06-17
concept_count: 177
---

# Research

> [!abstract] Routing Summary
> This folder covers applied statistics, econometrics, causal inference, causal discovery, theoretical physics, agent-based modeling, and market response models from textbooks and research papers. Contains 153 notes across 8 major topics.
> - Need Bayesian inference, computation, or regression? -> [[Research/Bayesian Statistics/_Index|Bayesian Statistics]]
> - Need causal inference toolkit (IV, DiD, RD, synthetic control, GSC, DAGs)? -> [[Research/Econometrics/_Index|Econometrics]]
> - Need causal *structure learning* / DAG discovery from data (NOTEARS, continuous optimization)? -> [[Research/Causal Discovery/_Index|Causal Discovery]]
> - Need forking paths, power analysis, ad measurement, or longitudinal causal inference? -> [[Research/Research Methodology/_Index|Research Methodology]]
> - Need quantum mechanics, QFT, or gauge theory (flat notes)? -> [[Research/Theoretical Physics/_Index|Theoretical Physics]]
> - Need quantum mechanics, QFT, or gauge theory (structured sub-folder notes)? -> [[Research/Physics/_Index|Physics]]
> - Need ABM methodology, consumer behavior simulation, WOM modeling, or ABM calibration (GA, HM+ABC, uncertainty quantification)? -> [[Research/Agent-Based Modeling/_Index|Agent-Based Modeling]]
> - Need market response models (functional forms, carryover, VAR, empirical elasticities)? -> [[Research/Market Response Models/_Index|Market Response Models]]
> - Need a specific concept? Check the Concept Map below or use the .base files for database views

## Concept Map

| Topic | Notes | Key Concepts |
|-------|-------|-------------|
| [[Research/Bayesian Statistics/_Index\|Bayesian Statistics]] | 60 | Bayes' theorem, conjugate priors, hierarchical models, MCMC/HMC, GLMs, GPs, spatial, copulas, BART, Bayesian IPW, Bayesian causal inference, **simulation-based calibration (SBC)** |
| [[Research/Econometrics/_Index\|Econometrics]] | 48 | Selection bias, CEF, IV, LATE, DiD, RD, synthetic control, GSC, DAGs, Bayesian IPTW, quantile regression, discrete choice, SMM, Brock-Mirman structural estimation, **staggered/multi-period DiD (group-time ATT, doubly-robust)**, **factor copulas / high-dimensional tail dependence** |
| [[Research/Causal Discovery/_Index\|Causal Discovery]] | 5 | DAG / Bayesian-network structure learning, linear SEM, score-based learning, **NOTEARS** continuous optimization, smooth acyclicity $h(W)=\mathrm{tr}\,e^{W\circ W}-d$, augmented Lagrangian, vs FGS/GES/PC |
| [[Research/Research Methodology/_Index\|Research Methodology]] | 13+3 | Forking paths, researcher degrees of freedom, activity bias, power analysis, FDR, survival analysis, Type S/M errors, Bayesian multiple comparisons, within/between-persons distinction (Rohrer & Murayama 2023), fixed-effects model, CLPM, dynamic panel model, estimands in longitudinal research |
| [[Research/Theoretical Physics/_Index\|Theoretical Physics]] | 7 | Quantum mechanics, Hilbert space, Schrödinger equation, QFT, second quantization, QED, renormalization, gauge theory, Standard Model |
| [[Research/Physics/_Index\|Physics]] | 9 | Wave functions, Hilbert space, Schrödinger equation, entanglement, QFT, canonical quantization, renormalization, gauge theory, Yang–Mills (structured sub-folder organization) |
| [[Research/Agent-Based Modeling/_Index\|Agent-Based Modeling]] | 34 | ABM methodology, emergence, heterogeneity, consumer utility models, CUBES behavioral simulator, WOM, opinion leaders, network diffusion, GA calibration, validation, HM+ABC calibration (McCulloch et al. 2022), history matching, ABC, uncertainty quantification |
| [[Research/Market Response Models/_Index\|Market Response Models]] | 31 | Functional forms (10), Koyck/ADL carryover, reaction functions, OLS/2SLS/Bayes estimation, ARIMA, transfer functions, VAR, cointegration, ECM, empirical generalizations (advertising ≈ 0.10, price ≈ −2.5), **Bayesian MMM (adstock, Hill saturation, ROAS/mROAS, optimal media mix)** |

## Cross-Cutting Themes

- **Bayesian vs. Frequentist**: [[Asymptotics and Frequentist Connections]], [[Forking Paths and Bayesian Approaches]]
- **Causal Inference**: [[The Experimental Ideal]], [[Activity Bias in Advertising]], [[Data Collection Models]], [[Counterfactual Inference]], [[Nonparametric Causal Inference]], [[Directed Acyclic Graphs]], [[Synthetic Control]], [[Bayesian Inverse Probability Weighting]], [[DAGs and Causal Identification]], [[Bayesian Propensity Score Weighting]]
- **Staggered Difference-in-Differences (Callaway & Sant'Anna)**: [[Difference-in-Differences with Multiple Time Periods - Overview]] → [[Group-Time Average Treatment Effects]] → [[Identifying Assumptions for Staggered DiD]] → [[Doubly-Robust Estimands for ATT(g,t)]] → [[Aggregating Group-Time Effects]] → [[Simultaneous Inference via Multiplier Bootstrap]]
- **High-Dimensional Dependence (Factor Copulas)**: [[Factor Copulas - Overview]] → [[Factor Copula Construction]] → [[Tail Dependence in Factor Copulas]] / [[Multi-Factor and Block Dependence Structures]] → [[SMM Estimation of Factor Copulas]] → [[Factor Copula Application - S&P 100 and Systemic Risk]]
- **Simulation-Based Calibration (SBC)**: [[Simulation-Based Calibration - Overview]] → [[Data-Averaged Posterior Self-Consistency]] → [[Rank Statistics and Uniformity]] → [[The SBC Algorithm]] → [[Interpreting SBC Histograms]] → [[SBC Case Studies]]
- **Bayesian Media Mix Modeling**: [[Carryover (Adstock) Functional Forms]] + [[Shape (Saturation) Effects]] → [[Bayesian Media Mix Modeling - Overview]] → [[Bayesian Estimation and Priors for MMM]] → [[ROAS, mROAS, and Optimal Media Mix]] → [[MMM Model Selection and Application]]
- **Causal Discovery (structure learning)**: [[NOTEARS - Overview]], [[DAG Structure Learning Problem]], [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]]
- **Model Building**: [[Bayesian Workflow - Overview]], [[Model Checking]], [[Model Comparison]], [[Overfitting and Information Criteria]]
- **Multiple Comparisons**: [[Multiple Comparisons - Bayesian Perspective]], [[Multiple Testing Corrections]], [[Type S and Type M Errors]], [[Partial Pooling as Multiple Comparisons Correction]]
- **Missing Data**: [[Missing Data Models]], [[Missing Data - Statistical Rethinking]], [[Data Collection Models]]
- **Regression**: [[Bayesian Linear Regression]], [[Regression and the CEF]], [[Hierarchical Linear Models]], [[Generalized Linear Models]]
- **Theoretical Physics Chain**: [[Quantum Mechanics - Overview]] → [[Quantum Mechanics - Mathematical Formalism]] → [[Quantum Field Theory - Overview]] → [[QED and Renormalization]] → [[Gauge Theory - Overview]] → [[Standard Model and Gauge Groups]]
- **Physics Chain (structured)**: [[Physics/Foundations/Wave Function and Hilbert Space|Wave Function & Hilbert Space]] → [[Physics/Foundations/Schrödinger Equation and Time Evolution|Schrödinger Equation]] → [[Physics/Quantum Field Theory/QFT Overview|QFT Overview]] → [[Physics/Quantum Field Theory/Gauge Theory Overview|Gauge Theory]] → [[Physics/Quantum Field Theory/Yang-Mills Theory and Gauge Fields|Yang–Mills Theory]]
- **ABM Calibration Chain**: [[ABM Calibration Overview]] → [[Genetic Algorithm Calibration for ABM]] → [[HM-ABC Calibration Framework]] → [[History Matching for ABMs]] → [[Approximate Bayesian Computation for ABMs]] (with [[Uncertainty Quantification for ABM Calibration]] feeding both HM and ABC)
- **Longitudinal Causal Inference**: [[Within-Between Persons Distinction - Overview]] → [[Within-Between Persons Causal Inference]] → [[Fixed-Effects Model]] / [[Cross-Lagged and Dynamic Panel Models]] (guided by [[Estimands in Longitudinal Research]])

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
- [[Agent-Based Modeling/raw/calibration_ABM.pdf]] — McCulloch et al. (2022), Calibrating ABMs using Uncertainty Quantification Methods (JASSS 25(2))
- [[Research Methodology/raw/rohrer-murayama-2023.pdf]] — Rohrer & Murayama (2023), These Are Not the Effects You Are Looking For: Causality and the Within/Between-Persons Distinction (AMPPS 6(1))
- [[raw/19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]] — Evans (2024), Computational Methods for Economists, Ch. 19: SMM theory, Python implementation, Brock-Mirman structural macro exercise (2026-04-12)
- [[Causal Discovery/raw/1803.01422-NOTEARS.pdf|NOTEARS]] — Zheng, Aragam, Ravikumar & Xing (2018), *DAGs with NO TEARS: Continuous Optimization for Structure Learning* (NeurIPS), arXiv:1803.01422 (2026-06-17)
- [[Econometrics/raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf|Callaway & Sant'Anna - DiD with Multiple Time Periods]] — Callaway & Sant'Anna (2020), staggered difference-in-differences: group-time ATT, doubly-robust estimands, aggregation, multiplier-bootstrap inference (2026-06-17)
- [[Econometrics/raw/Oh-Patton-2012-Factor-Copulas.pdf|Oh & Patton - Factor Copulas]] — Oh & Patton (2012), high-dimensional factor copulas, EVT tail dependence, rank-based SMM, S&P 100 systemic risk (2026-06-17)
- [[Bayesian Statistics/raw/1804.06788-Talts-SBC.pdf|Talts et al. - Simulation-Based Calibration]] — Talts, Betancourt, Simpson, Vehtari & Gelman (2018), validating Bayesian inference algorithms via rank-statistic SBC (2026-06-17)
- [[Market Response Models/raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf|Jin et al. - Bayesian Media Mix Modeling]] — Jin, Wang, Sun, Chan & Koehler (Google, 2017), Bayesian MMM with adstock carryover and Hill shape effects, ROAS/mROAS, optimal media mix (2026-06-17)

## See Also

- [[Clippings/_Index|Clippings]] — Web articles and saved content
