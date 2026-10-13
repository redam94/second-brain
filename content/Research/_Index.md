---
title: "Index: Research"
tags:
  - type/index
  - source/ingested
date_updated: 2026-10-13
concept_count: 824
---

# Research

> [!abstract] Routing Summary
> This folder covers applied statistics, econometrics, causal inference, causal discovery, Bayesian experimental design, probabilistic numerics, physics, agent-based modeling, and market response models from textbooks and research papers. Contains 824 notes across 11 major topics (85 notes in 11 new clusters added 2026-09-18, including the new **Machine Learning and AI** topic; 229 notes added 2026-10-13, including the new **Model Validation and Interpretability** topic).
> - Need Bayesian inference, computation, or regression? -> [[Research/Bayesian Statistics/_Index|Bayesian Statistics]]
> - Need the **applied Bayesian workflow** — priors, predictive checks, LOO, failure modes, or 16 worked case studies? -> [[Research/Bayesian Statistics/Workflow/_Index|Bayesian Workflow]], starting at [[Bayesian Workflow Book - Overview]]
> - Need causal inference toolkit (IV, DiD, RD, synthetic control, GSC, DAGs)? -> [[Research/Econometrics/_Index|Econometrics]]
> - Need causal *structure learning* / DAG discovery from data (NOTEARS, continuous optimization)? -> [[Research/Causal Discovery/_Index|Causal Discovery]]
> - Need forking paths, power analysis, ad measurement, or longitudinal causal inference? -> [[Research/Research Methodology/_Index|Research Methodology]]
> - Need Bayesian experimental design / expected information gain (EIG estimators, gradient/ACE/PCE, deep adaptive design)? -> [[Research/Bayesian Experimental Design/_Index|Bayesian Experimental Design]]
> - Need probabilistic numerics (Bayesian quadrature, probabilistic linear solvers, Bayesian optimisation, ODE filters — computation as inference)? -> [[Research/Probabilistic Numerics/_Index|Probabilistic Numerics]]
> - Need quantum mechanics, QFT, QED, renormalization, gauge theory, or the Standard Model? -> [[Research/Physics/_Index|Physics]]
> - Need ABM methodology, consumer behavior simulation, WOM modeling, or ABM calibration (GA, HM+ABC, uncertainty quantification)? -> [[Research/Agent-Based Modeling/_Index|Agent-Based Modeling]]
> - Need market response models (functional forms, carryover, VAR, empirical elasticities)? -> [[Research/Market Response Models/_Index|Market Response Models]]
> - Need **machine learning / AI** (transformers, scaling laws, in-context learning, chain-of-thought, RAG, ReAct agents, RLHF, conformal prediction, probabilistic forecasting with DeepAR / Chronos / MinT)? -> [[Research/Machine Learning and AI/_Index|Machine Learning and AI]]
> - Need ML for causal inference (DML, causal forests, R-learner)? -> [[Research/Econometrics/Causal Machine Learning/_Index|Causal Machine Learning]]; synthetic DiD / event studies / Honest DiD? -> [[Research/Econometrics/Identification Strategies/Synthetic Difference-in-Differences/_Index|Synthetic Difference-in-Differences]]
> - Need variational inference or neural simulation-based inference? -> [[Research/Bayesian Statistics/Computation/Variational Inference/_Index|Variational Inference]], [[Research/Bayesian Statistics/Computation/Neural Simulation-Based Inference/_Index|Neural Simulation-Based Inference]]
> - Need online A/B testing statistics (CUPED, always-valid inference, SRM, switchbacks)? -> [[Research/Research Methodology/Experimental Design/Online Experimentation/_Index|Online Experimentation]]; customer lifetime value (Pareto-NBD, BG-NBD)? -> [[Research/Market Response Models/Customer Lifetime Value/_Index|Customer Lifetime Value]]; LLM-powered simulated consumers? -> [[Research/Agent-Based Modeling/LLM-Powered Agents/_Index|LLM-Powered Agents]]
> - Need **user-level ad experiments** (ghost ads, PSA/ITT designs, conversion lift, power economics, experimental benchmarks, identity fragmentation, user- vs geo-level)? -> [[Research/Market Response Models/User-Level Ad Experiments/_Index|User-Level Ad Experiments]]
> - Need **model validation and interpretability**: false discovery and overfitting, RF/SHAP importance bias and stability, explanations vs causal effects, Goodhart, time-series CV, known-truth simulation (ADEMP/AMSS), SR 11-7 / NIST AI RMF? -> [[Research/Model Validation and Interpretability/_Index|Model Validation and Interpretability]], starting at [[Model Validation and Interpretability - Overview]]
> - Need a specific concept? Check the Concept Map below or use the .base files for database views

## Concept Map

| Topic | Notes | Key Concepts |
|-------|-------|-------------|
| [[Research/Bayesian Statistics/_Index\|Bayesian Statistics]] | 217 | Bayes' theorem, conjugate priors, hierarchical models, MCMC/HMC, GLMs, GPs, spatial, copulas, BART, Bayesian IPW, Bayesian causal inference, **simulation-based calibration (SBC)**, and the full **2026 *Bayesian Workflow* textbook** (79 notes: model building and priors, predictive checking, PSIS-LOO, computational failure modes, 16 case studies); **variational inference** (ELBO, CAVI, ADVI, VAEs, flows, PSIS/VSBC diagnostics) and **neural simulation-based inference** (NPE/NLE/NRE, amortized vs sequential, ABM calibration) |
| [[Research/Bayesian Experimental Design/_Index\|Bayesian Experimental Design]] | 21 | Lindley's information measure (1956), expected information gain (EIG), nested Monte Carlo, variational EIG estimators (posterior/marginal/VNMC/implicit), unified stochastic-gradient design, **adaptive & prior contrastive estimation (ACE/PCE)**, sequential/adaptive design, **deep adaptive design (DAD) policies**, EIG vs Fisher information |
| [[Research/Probabilistic Numerics/_Index\|Probabilistic Numerics]] | 36 | Computation as Bayesian inference, the numerical agent, Gaussian algebra/GP regression, Gauss–Markov/SDE priors, Kalman filter & RTS smoother, **Bayesian quadrature** (kernel means, classical rules as posterior means), **probabilistic linear solvers** (CG = BayesCG), **Bayesian optimisation** (PI/EI/UCB/KG, entropy search), **ODE filters & smoothers** (EKF0/EKF1, convergence theory), uncertainty calibration |
| [[Research/Econometrics/_Index\|Econometrics]] | 65 | Selection bias, CEF, IV, LATE, DiD, RD, synthetic control, GSC, DAGs, Bayesian IPTW, quantile regression, discrete choice, SMM, Brock-Mirman structural estimation, **staggered/multi-period DiD (group-time ATT, doubly-robust)**, **factor copulas / high-dimensional tail dependence**; **synthetic DiD, event studies, pre-trend testing, Honest DiD**, **causal machine learning (DML, Neyman orthogonality, cross-fitting, causal forests / GRF, R-learner)** |
| [[Research/Causal Discovery/_Index\|Causal Discovery]] | 5 | DAG / Bayesian-network structure learning, linear SEM, score-based learning, **NOTEARS** continuous optimization, smooth acyclicity $h(W)=\mathrm{tr}\,e^{W\circ W}-d$, augmented Lagrangian, vs FGS/GES/PC |
| [[Research/Research Methodology/_Index\|Research Methodology]] | 42 | Forking paths, researcher degrees of freedom, activity bias, power analysis, FDR, survival analysis, Type S/M errors, Bayesian multiple comparisons, within/between-persons distinction (Rohrer & Murayama 2023), fixed-effects model, CLPM, dynamic panel model, estimands in longitudinal research, **Table 2 Fallacy**, regression adjustment logic, nuisance parameter bias simulation; **online experimentation (CUPED, peeking, mSPRT / always-valid p-values, confidence sequences, SRM, marketplace interference, switchbacks)** |
| [[Research/Physics/_Index\|Physics]] | 14 | Quantum mechanics (overview, formalism, phenomena, wave functions, Schrödinger equation, uncertainty, entanglement), QFT, canonical quantization, QED, renormalization, gauge theory, Yang–Mills, Standard Model (the former `Theoretical Physics/` folder was merged in on 2026-09-18) |
| [[Research/Agent-Based Modeling/_Index\|Agent-Based Modeling]] | 42 | ABM methodology, emergence, heterogeneity, consumer utility models, CUBES behavioral simulator, WOM, opinion leaders, network diffusion, GA calibration, validation, HM+ABC calibration (McCulloch et al. 2022), history matching, ABC, uncertainty quantification; **LLM-powered agents (generative agents, silicon samples, homo silicus, persona-mixture calibration, validity threats)** |
| [[Research/Market Response Models/_Index\|Market Response Models]] | 86 | Functional forms (10), Koyck/ADL carryover, reaction functions, OLS/2SLS/Bayes estimation, ARIMA, transfer functions, VAR, cointegration, ECM, empirical generalizations (advertising ≈ 0.10, price ≈ −2.5), **Bayesian MMM (adstock, Hill saturation, ROAS/mROAS, optimal media mix)**; **customer lifetime value (Pareto-NBD, BG-NBD, Gamma-Gamma, RFM iso-value curves, shifted-beta-geometric retention)**; **user-level ad experiments (ITT/PSA/ghost ads, ITT→ATT, Lewis–Rao power economics, conversion lift, Gordon et al. benchmarks, identity fragmentation, user- vs geo-level decision; Blake et al. 2015 eBay paid-search experiment; full paper maps of Gordon et al. 2019 and Lewis & Rao 2015)** |
| [[Research/Machine Learning and AI/_Index\|Machine Learning and AI]] | 29 | **Transformers and LLM foundations** (attention, architecture, pretraining, Kaplan and Chinchilla scaling laws, in-context learning), **LLM reasoning, retrieval and agents** (chain-of-thought, RAG, ReAct, tool-use loop, RLHF, reward modeling, evaluation), **conformal prediction** (split conformal, CQR, conditional coverage, covariate shift, counterfactual / ITE intervals), **probabilistic forecasting** (proper scoring rules, DeepAR, Chronos, local vs global models, MinT reconciliation, backtesting) |
| [[Research/Model Validation and Interpretability/_Index\|Model Validation and Interpretability]] | 186 | **False discovery and overfitting** (Ioannidis PPV, Simmons et al. researcher degrees of freedom, Breiman two cultures / Rashomon, Riley sample size for prediction models), **feature importance and stability** (Strobl RF importance bias and conditional importance, Hooker permute-and-predict extrapolation, Fisher model class reliance, Meinshausen-Bühlmann stability selection), **explanations, causality and proxies** (Kumar Shapley critique, Janzing interventional SHAP, Dillon SHAP vs causal effects, Goodhart variants), **time-series validation** (Granger spurious regression and cointegration, Bergmeir K-fold CV for AR models), **simulation-based validation** (ADEMP, AMSS, Chan & Perry MMM challenges), **model risk governance** (SR 11-7, NIST AI RMF 1.0) |

## Cross-Cutting Themes

- **ML meets inference (added 2026-09-18)**: [[Neyman Orthogonality]] → [[Cross-Fitting and Sample Splitting]] → [[Honest Trees and Causal Forests]] (ML for causal effects); [[Split Conformal Prediction and the Coverage Guarantee]] → [[Conformal Inference for Counterfactuals and ITEs]] (distribution-free uncertainty); [[The ELBO and KL Divergence Minimization]] → [[Reparameterization Trick and Variational Autoencoders]] → [[Neural Posterior Estimation (NPE)]] (neural Bayesian computation); [[Silicon Samples and Algorithmic Fidelity]] ↔ [[Poststratification]] (LLMs as simulated populations)
- **Validating predictive analytics before decisions (added 2026-10-13)**: failure mechanisms [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] (too few rows) → [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] / [[Garden of Forking Paths]] (best-of-many) → [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] (chance fits in weekly series) → [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]] / [[Permute-and-Predict Extrapolation in Variable Importance]] (importance crediting proxies) → [[Dillon et al - SHAP Plots vs True Causal Effects]] (importance ≠ intervention) → [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] / [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]] (observational error); remedies [[Out-of-Sample Validation for Time-Series Models]] → [[Stability Paths and the Stable-Variable Set]] → [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] / [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] → [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]; synthesis in [[Model Validation and Interpretability - Overview]]
- **Experimentation stack for marketing measurement**: [[CUPED and Regression-Adjusted Variance Reduction]] / [[Always-Valid p-values and the mSPRT]] (user-level A/B) → [[Interference and Marketplace Experiments]] / [[Switchback Experiment Design and Analysis]] → [[User-Level Ad Experiments - Overview]] / [[User-Level vs Geo-Level Experiments - When to Use Which]] → [[Geo-Experiment Methodology - Overview]] → [[SDID for Geo Experiments and Marketing Panels]] → [[Bayesian Media Mix Modeling - Overview]]; value metric from [[Customer Lifetime Value - Overview]]

- **Bayesian vs. Frequentist**: [[Asymptotics and Frequentist Connections]], [[Forking Paths and Bayesian Approaches]]
- **Causal Inference**: [[The Experimental Ideal]], [[Activity Bias in Advertising]], [[Data Collection Models]], [[Counterfactual Inference]], [[Nonparametric Causal Inference]], [[Directed Acyclic Graphs]], [[Synthetic Control]], [[Bayesian Inverse Probability Weighting]], [[DAGs and Causal Identification]], [[Bayesian Inverse Probability Weighting]], [[Table 2 Fallacy]], [[Logic of Regression Adjustment]]
- **Staggered Difference-in-Differences (Callaway & Sant'Anna)**: [[Difference-in-Differences with Multiple Time Periods - Overview]] → [[Group-Time Average Treatment Effects]] → [[Identifying Assumptions for Staggered DiD]] → [[Doubly-Robust Estimands for ATT(g,t)]] → [[Aggregating Group-Time Effects]] → [[Simultaneous Inference via Multiplier Bootstrap]]
- **High-Dimensional Dependence (Factor Copulas)**: [[Factor Copulas - Overview]] → [[Factor Copula Construction]] → [[Tail Dependence in Factor Copulas]] / [[Multi-Factor and Block Dependence Structures]] → [[SMM Estimation of Factor Copulas]] → [[Factor Copula Application - S&P 100 and Systemic Risk]]
- **Simulation-Based Calibration (SBC)**: [[Simulation-Based Calibration - Overview]] → [[Data-Averaged Posterior Self-Consistency]] → [[Rank Statistics and Uniformity]] → [[The SBC Algorithm]] → [[Interpreting SBC Histograms]] → [[SBC Case Studies]]
- **Bayesian Media Mix Modeling**: [[Carryover (Adstock) Functional Forms]] + [[Shape (Saturation) Effects]] → [[Bayesian Media Mix Modeling - Overview]] → [[Bayesian Estimation and Priors for MMM]] → [[ROAS, mROAS, and Optimal Media Mix]] → [[MMM Model Selection and Application]]
- **Causal Discovery (structure learning)**: [[NOTEARS - Overview]], [[DAG Structure Learning Problem]], [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]]
- **Bayesian Experimental Design (EIG)**: [[Lindley's Information Measure]] → [[Expected Information Gain]] → [[Nested Estimation and Nested Monte Carlo]] → [[Variational BOED - Overview]] → [[Unified SGD BOED - Overview]] ([[Adaptive Contrastive Estimation (ACE)]] / [[Prior Contrastive Estimation (PCE)]]) → [[Modern Bayesian Experimental Design - Overview]] → [[From Designs to Policies (Deep Adaptive Design)]]
- **Probabilistic Numerics (computation as inference)**: [[Computation as Probabilistic Inference]] / [[The Numerical Agent]] → [[Gaussian Distributions and Algebra]] → {[[Gaussian Process Regression]], [[Gauss-Markov Processes and SDEs]] → [[Bayesian Filtering and Smoothing]]} → application branches: [[Bayesian Quadrature]] → [[Classical Quadrature as Inference]]; [[Probabilistic Linear Solvers - Algorithmic Scaffold]] → [[Conjugate Gradients as Probabilistic Inference]]; [[Bayesian Optimisation]] → [[Acquisition Functions]]; [[ODE Filters and Smoothers]] → [[Theory of ODE Filters and Smoothers]]
- **Model Building**: [[Bayesian Workflow Book - Overview]] → [[From Inference to Data Analysis to Workflow]] → [[Choosing an Initial Model]] → [[Prior Predictive Checking]] → [[Posterior Predictive Checking]] → [[Cross Validation Checking]] → [[Model Expansion - Predictive Consistency and Coherence]]; also [[Bayesian Workflow - Overview]], [[Model Checking]], [[Model Comparison]], [[Overfitting and Information Criteria]]
- **Multiple Comparisons**: [[Multiple Comparisons - Bayesian Perspective]], [[Multiple Testing Corrections]], [[Type S and Type M Errors]], [[Partial Pooling as Multiple Comparisons Correction]]
- **Missing Data**: [[Missing Data Models]], [[Missing Data - Statistical Rethinking]], [[Data Collection Models]]
- **Regression**: [[Bayesian Linear Regression]], [[Regression and the CEF]], [[Hierarchical Linear Models]], [[Generalized Linear Models]]
- **Physics Chain (survey)**: [[Quantum Mechanics - Overview]] → [[Quantum Mechanics - Mathematical Formalism]] → [[Quantum Field Theory - Overview]] → [[QED and Renormalization]] → [[Gauge Theory - Overview]] → [[Standard Model and Gauge Groups]]
- **Physics Chain (concepts)**: [[Wave Function and Hilbert Space]] → [[Schrödinger Equation and Time Evolution]] → [[Uncertainty Principle]] → [[Quantum Entanglement]] → [[Canonical Quantization of Fields]] → [[Renormalization]] → [[Yang-Mills Theory and Gauge Fields]]
- **ABM Calibration Chain**: [[ABM Calibration Overview]] → [[Genetic Algorithm Calibration for ABM]] → [[HM-ABC Calibration Framework]] → [[History Matching for ABMs]] → [[Approximate Bayesian Computation for ABMs]] (with [[Uncertainty Quantification for ABM Calibration]] feeding both HM and ABC)
- **Longitudinal Causal Inference**: [[Within-Between Persons Distinction - Overview]] → [[Within-Between Persons Causal Inference]] → [[Fixed-Effects Model]] / [[Cross-Lagged and Dynamic Panel Models]] (guided by [[Estimands in Longitudinal Research]])

## Sources

- BDA3 — Bayesian Data Analysis, 3rd Edition (Gelman et al., 2013/2025)
- BayesWorkflow — Bayesian Workflow (Gelman, Vehtari, Simpson et al., 2020)
- StatRethink-Bayes — Statistical Rethinking: A Bayesian Course (McElreath, 2015)
- p_hacking — The Garden of Forking Paths (Gelman & Loken, 2013)
- ssrn-2080235 — Here, There, and Everywhere (Lewis, Rao, & Reiley, 2011)
- Mostly Harmless Econometrics — Mostly Harmless Econometrics (Angrist & Pischke, 2008)
- Discrete Choice and Random Utility Models — PyMC tutorial: Bayesian discrete choice / random utility models (2026-04-08)
- Factor analysis — PyMC tutorial: factor analysis and probabilistic PCA (2026-04-08)
- Baby Births Modelling with HSGPs — PyMC tutorial: Hilbert Space Gaussian Processes for time series (2026-04-09)
- Bayesian Non-parametric Causal Inference — PyMC tutorial: BART + propensity scores for causal ATE/ATT estimation (2026-04-09)
- Bayesian copula estimation Describing correlated joint distributions — PyMC tutorial: Gaussian copula for joint distributions (2026-04-09)
- Missing Data — PyMC / Statistical Rethinking Lecture 18: DAG-based missing data analysis (2026-04-09)
- Counterfactual inference calculating excess deaths due to COVID-19 — PyMC tutorial: Bayesian counterfactual inference, COVID excess deaths (2026-04-09)
- Confirmatory Factor Analysis and Structural Equation Models in Psychometrics — PyMC case study: CFA and SEM for psychometrics (2026-04-09)
- The Besag-York-Mollie Model for Spatial Data — PyMC tutorial: BYM spatial model on NYC traffic data (2026-04-09)
- Difference in differences — PyMC tutorial: Bayesian DiD with counterfactual prediction (2026-04-09)
- Social Networks — PyMC / Statistical Rethinking Lecture 15: dyadic social network models (2026-04-09)
- Bayesian moderation analysis — PyMC tutorial: moderation analysis with interaction terms (2026-04-09)
- multiple2f — "Why we (usually) don't have to worry about multiple comparisons" (Gelman, Hill & Yajima, 2009)
- 15 - Synthetic Control — Causal Inference for the Brave and True — Causal Inference for the Brave and True, Ch. 15: synthetic control with Python (Matheu Facure, 2023)
- Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs — Graham Harrison, Towards Data Science (2023-04-06): DAGs, confounders, backdoor adjustment, d-separation
- How to use Bayesian propensity scores and inverse probability weights — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- Quantum mechanics — Wikipedia: quantum mechanics, Hilbert space formalism, Schrödinger equation, entanglement, Bell's theorem (2026-04-11)
- Quantum field theory — Wikipedia: quantum field theory, canonical quantization, Fock space, path integrals, Feynman diagrams (2026-04-11)
- Gauge theory — Wikipedia: gauge theory, local symmetry, Yang-Mills, Standard Model gauge groups (2026-04-11)
- Market Response Models Econometric and Time Series Analysis — Hanssens, Parsons & Schultz (2001), 2nd Ed.: functional forms, Koyck/ADL lags, OLS/2SLS/Bayes, ARIMA, transfer functions, VAR/cointegration/ECM, advertising/price empirical generalizations
- abm_word_of_mouth — Bonabeau (2002), ABM methods and techniques for simulating human systems (PNAS)
- abm_consumer — Karakaya, Badur & Aytekin (2011), marketing strategies with WOM using ABM
- abm_human_behaviour — Ben Said, Bouron & Drogoul (2002), CUBES consumer behavior simulator
- calibration_ABM — McCulloch et al. (2022), Calibrating ABMs using Uncertainty Quantification Methods (JASSS 25(2))
- rohrer-murayama-2023 — Rohrer & Murayama (2023), These Are Not the Effects You Are Looking For: Causality and the Within/Between-Persons Distinction (AMPPS 6(1))
- These Are Not the Effects You Are Looking For — A. Jordan Nafa (2022), Table 2 Fallacy, logic of statistical control/mutual adjustment, simulation (R/Python/Stan) demonstrating nuisance parameter bias (2026-06-26)
- 19 — Evans (2024), Computational Methods for Economists, Ch. 19: SMM theory, Python implementation, Brock-Mirman structural macro exercise (2026-04-12)
- NOTEARS — Zheng, Aragam, Ravikumar & Xing (2018), *DAGs with NO TEARS: Continuous Optimization for Structure Learning* (NeurIPS), arXiv:1803.01422 (2026-06-17)
- Callaway & Sant'Anna - DiD with Multiple Time Periods — Callaway & Sant'Anna (2020), staggered difference-in-differences: group-time ATT, doubly-robust estimands, aggregation, multiplier-bootstrap inference (2026-06-17)
- Oh & Patton - Factor Copulas — Oh & Patton (2012), high-dimensional factor copulas, EVT tail dependence, rank-based SMM, S&P 100 systemic risk (2026-06-17)
- Talts et al. - Simulation-Based Calibration — Talts, Betancourt, Simpson, Vehtari & Gelman (2018), validating Bayesian inference algorithms via rank-statistic SBC (2026-06-17)
- Jin et al. - Bayesian Media Mix Modeling — Jin, Wang, Sun, Chan & Koehler (Google, 2017), Bayesian MMM with adstock carryover and Hill shape effects, ROAS/mROAS, optimal media mix (2026-06-17)
- Hennig, Osborne & Kersting - Probabilistic Numerics — Hennig, Osborne & Kersting (2022), *Probabilistic Numerics: Computation as Machine Learning* (Cambridge University Press): computation as Bayesian inference, Bayesian quadrature, probabilistic linear solvers, Bayesian optimisation, ODE filters/smoothers (2026-07-01)
- Ioannidis 2005, Simmons, Nelson & Simonsohn 2011, Breiman 2001, Riley et al. 2020 — overfitting and false discovery (2026-10-13)
- Strobl et al. 2007, Strobl et al. 2008, Hooker, Mentch & Zhou 2021, Fisher, Rudin & Dominici 2019, Meinshausen & Bühlmann 2010 — feature importance and stability (2026-10-13)
- Kumar et al. 2020, Janzing et al. 2020, Dillon et al., Manheim & Garrabrant 2018 — explanations, causality and proxies (2026-10-13)
- Granger 2003, Bergmeir, Hyndman & Koo 2018 — time-series validation (2026-10-13)
- Morris, White & Crowther 2019, Zhang & Vaver 2017, Chan & Perry 2017 — simulation-based method validation (2026-10-13)
- SR 11-7 (2011), NIST AI RMF 1.0 (2023) — model risk governance (2026-10-13)
- Blake, Nosko & Tadelis 2015 — eBay paid-search field experiment (Econometrica 83(1); NBER WP 20171) (2026-10-13)

## See Also

- [[Clippings/_Index|Clippings]] — Web articles and saved content
