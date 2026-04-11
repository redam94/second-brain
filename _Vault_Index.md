---
title: "Vault Index"
tags:
  - type/index
  - type/vault-root
date_updated: 2026-04-11
concept_count: 183
---

# Vault Index

> [!abstract] Routing Summary
> A second brain for research, clippings, and knowledge management. Contains 94+ ingested notes organized by topic.
> - Need Bayesian statistics (BDA3, Statistical Rethinking, Workflow)? -> [[Research/Bayesian Statistics/_Index|Bayesian Statistics]]
> - Need econometrics and causal inference (MHE)? -> [[Research/Econometrics/_Index|Econometrics]]
> - Need research methodology (forking paths, power analysis, longitudinal causal inference)? -> [[Research/Research Methodology/_Index|Research Methodology]]
> - Need agent-based modeling (consumer behavior, WOM, diffusion)? -> [[Research/Agent-Based Modeling/_Index|Agent-Based Modeling]]
> - Need web clippings and saved articles? -> [[Clippings/_Index|Clippings]]
> - Need market response models (functional forms, carryover, VAR, advertising/price elasticities)? -> [[Research/Market Response Models/_Index|Market Response Models]]

## Areas

| Area | Notes | Domain |
|------|-------|--------|
| [[Research/_Index\|Research]] | 136 | Applied statistics, econometrics, causal inference, agent-based modeling, market response models from textbooks and papers |
| [[Clippings/_Index\|Clippings]] | 13 | Web articles and saved content (raw source material) |

## Topic Map

Cross-cutting topics that span multiple folders:
- **Bayesian Statistics**: [[BDA3 - Overview|BDA3]], [[Bayesian Workflow - Overview|Workflow]], [[Hierarchical Models]], [[MCMC Basics|MCMC]], [[Model Checking]], [[Model Comparison]]
- **Causal Inference**: [[The Selection Problem|Selection Problem]], [[The Experimental Ideal|Experiments]], [[Conditional Independence Assumption|CIA]], [[Instrumental Variables|IV]], [[Differences-in-Differences|DD]], [[Activity Bias in Advertising|Activity Bias]], [[Counterfactual Inference]], [[Nonparametric Causal Inference|BART Causal]], [[Potential Outcomes Framework]], [[Causal Estimands]], [[Propensity Score in Bayesian CI]], [[Synthetic Control]], [[Synthetic Control Bias Theory|SC Bias Theory]], [[Synthetic Control Requirements|SC Requirements]], [[Generalized Synthetic Control Method|GSC]], [[X-Learner|X-Learner/Metalearners]], [[Bayesian Structural Time-Series Model|CausalImpact BSTS]], [[LLM Expert Elicitation for Bayesian Networks|LLM-BN Elicitation]], [[Causal Model - Cause Precondition Effect|Cause-Precondition-Effect]], [[Summary Causal DAGs|DAG Summarization]], [[CaGReS Algorithm|CaGReS]], [[s-Separation in Summary DAGs|s-Separation]], [[Code Prompts for Causal Structure|Code Causal Prompts]], [[LLM Causal Reasoning Tasks|LLM Causal Tasks]], [[Fine-tuning on Conditional Statements|Conditional Fine-tuning]]
- **Econometrics**: [[Regression and the CEF|Regression/CEF]], [[Omitted Variables Bias|OVB]], [[Quantile Regression]], [[Standard Errors and Clustering|Standard Errors]], [[Simulation-Based Estimation - Overview|Sim-Based Est.]], [[Method of Simulated Moments|MSM]], [[SMM Weighting Matrix and Inference|SMM Weighting]], [[SMM Python Implementation|SMM Code]], [[Indirect Inference]], [[Efficient Method of Moments|EMM]], [[SMM Estimator for Copulas|SMM Copulas]]
- **Research Methodology**: [[Garden of Forking Paths|Forking Paths]], [[Researcher Degrees of Freedom]], [[Multiple Testing Corrections|FDR/Bonferroni]], [[Power Analysis and Sample Size|Power Analysis]], [[Survival Analysis]]
- **Advanced Models**: [[Nonparametric Models Overview|Nonparametric]], [[Hilbert Space Gaussian Processes|HSGP]], [[Spatial Models - BYM|Spatial]], [[Copula Estimation|Copulas]], [[Dependence Measures for Copulas|Dependence Measures]], [[Social Network Models|Networks]], [[Confirmatory Factor Analysis and SEM|CFA/SEM]]
- **Agent-Based Modeling**: [[ABM Methodology and Principles|ABM Foundations]], [[Consumer Utility Function Components|Consumer Utility]], [[Behavioral Attitudes in CUBES|CUBES Behavioral Model]], [[Word of Mouth Mechanisms|WOM]], [[Product Adoption and Diffusion Models|Diffusion]], [[Genetic Algorithm Calibration for ABM|GA Calibration]], [[HM-ABC Calibration Framework|HM+ABC]], [[History Matching for ABMs|History Matching]], [[Approximate Bayesian Computation for ABMs|ABC for ABMs]]
- **Longitudinal Methods**: [[Within-Between Persons Distinction - Overview|Within/Between Overview]], [[Fixed-Effects Model|FE Model]], [[Cross-Lagged and Dynamic Panel Models|CLPM/DPM]], [[Estimands in Longitudinal Research|Longitudinal Estimands]]
- **Market Response Models**: [[Market Response Models - Overview|MRM Overview]], [[Functional Forms in Marketing|Functional Forms]], [[Market Share Models|MCI/MNL]], [[Carryover Effects and Distributed Lags|Koyck/ADL]], [[Reaction Functions and Competitive Dynamics|Reaction Functions]], [[Parameter Estimation in Market Response|Estimation]], [[Single Marketing Time Series|ARIMA]], [[Transfer Function Model|Transfer Function]], [[Multivariate Persistence and Cointegration|VAR/Cointegration]], [[Advertising and Promotion Effects|Advertising Generalizations]], [[Price and Distribution Effects|Price Generalizations]]

## Recent Ingestions

- 2026-04-11: Ingested 2 papers: (1) McCulloch et al. (2022) into [[Research/Agent-Based Modeling/Calibration and Validation/Calibration Methods/_Index|Calibration Methods]] — 5 notes: HM-ABC Framework overview, History Matching (implausibility score, waves, LHS), Approximate Bayesian Computation (rejection sampling, HM-informed prior, epsilon threshold), Uncertainty Quantification (4 sources: parameter/model discrepancy/ensemble variance/observation), Case Studies (SugarScape, territorial birds, RISC Scottish farms). (2) Rohrer & Murayama (2023) into [[Research/Research Methodology/_Index|Research Methodology]] — 5 notes: Within/Between Persons overview (3 main claims), Within/Between Causal Inference (ATE proof, time-varying confounders), Fixed-Effects Model (Box 1 DAG, assumptions, limitations), Cross-Lagged and Dynamic Panel Models (CLPM, DPM/RI-CLPM, comparison table), Estimands in Longitudinal Research (theoretical estimand definition, 5-step workflow, consistency in psychology).
- 2026-04-11: Ingested Hanssens, Parsons & Schultz (2001) into [[Research/Market Response Models/_Index|Market Response Models]] — 25 notes across 5 subfolders: Introduction (3 notes: MRM overview, management tasks, data/variables), Static Response Models (4 notes: 10 functional forms with full LaTeX + elasticities, MCI/MNL share models, aggregation bias), Dynamic Response Models (4 notes: Koyck/ADL/PDL carryover, reaction functions, S-shape/hysteresis), Estimation and Testing (4 notes: OLS/GLS/SUR/2SLS/Bayes HB, RESET/specification errors, flexible forms, model selection), Time Series Analysis (4 notes: ARIMA, transfer functions, VAR/cointegration/ECM, Granger causality), Empirical Findings (5 notes: generalizations framework, advertising elasticity ≈ 0.10 / duration 6-9 months, price elasticity ≈ −2.5, Dorfman-Steiner optimization, implementation). Also: 8 index files created + Research/_Index.md and _Vault_Index.md updated.
- 2026-04-11: Ingested Evans (2024) Ch. 19 SMM tutorial into [[Research/Econometrics/Extensions/_Index|Extensions]] — 2 new notes: [[SMM Weighting Matrix and Inference]] (weighting strategies, two-step Ω̂, Newey-West, Σ̂ via Jacobian) + [[SMM Python Implementation]] (scipy workflow, L-BFGS-B eps fix, indirect inference pattern). Also: graph analysis moved [[Dependence Measures for Copulas]] from Advanced Models to Extensions, and added 14 missing wikilinks across vault.
- 2026-04-11: Ingested 2 papers into [[Research/Econometrics/Extensions/_Index|Extensions]] — 10 notes on simulation-based estimation: MSM, indirect inference, EMM (Liesenfeld & Breitung 1998) + SMM for copulas with asymptotic theory, specification testing, Monte Carlo study, financial application (Oh & Patton 2011). Also 1 note on dependence measures in [[Research/Bayesian Statistics/Advanced Models/_Index|Advanced Models]].
- 2026-04-10: Ingested 3 ABM papers into [[Research/Agent-Based Modeling/_Index|Agent-Based Modeling]] — 29 notes across 5 sub-topics: Foundations (5), Consumer Behavior (8), Social Dynamics (6), Calibration and Validation (5), Applications (5). Sources: Bonabeau 2002 (PNAS), Karakaya et al. 2011, Ben Said et al. 2002
- 2026-04-10: Ingested 2 papers into [[Research/Bayesian Statistics/Causal Inference/_Index|Causal Inference]] — 12 notes: Liu 2025 (6 notes, Knowledge Elicitation — code prompts for LLM causal reasoning) + Zeng 2025 (6 notes, Foundations — causal DAG summarization, CaGReS algorithm, s-separation, do-calculus soundness)
- 2026-04-10: Ingested 4 papers into [[Research/Bayesian Statistics/Causal Inference/_Index|Causal Inference]] — 24 notes across 3 new sub-folders: Knowledge Elicitation (Yamashita 2020 interactive NLP + Shaposhnyk 2025 LLM-for-BN), Treatment Effect Estimation (Künzel 2019 S/T/X-learner metalearners), Time Series Causal Inference (Brodersen 2015 CausalImpact BSTS)
- 2026-04-10: Ingested Xu (2017) into [[Research/Econometrics/Identification Strategies/_Index|Identification Strategies]] — 2 notes: Overview + Generalized Synthetic Control Method (IFE model, 3-step estimator, LOO cross-validation, parametric bootstrap, EDR voter turnout application)
- 2026-04-10: Ingested Abadie (2021) into [[Research/Econometrics/Identification Strategies/_Index|Identification Strategies]] — 5 notes: Overview, Bias Theory (linear factor model, bias bound, sparsity), Inference & Diagnostics (RMSPE ratio, permutation test, backdating), Requirements (5 contextual + 3 data conditions), Extensions (penalized SC, bias correction, elastic net, matrix completion)
- 2026-04-10: Ingested Li, Ding & Mealli (2022) into [[Research/Bayesian Statistics/Causal Inference/_Index|Causal Inference]] — 10 notes covering potential outcomes, Bayesian CI structure, BART/BCF/GP outcome models, propensity score strategies, E-value sensitivity analysis, IV/principal stratification, g-computation
- 2026-04-09: Ingested 9 PyMC tutorials into [[Research/_Index|Research]] — HSGP, copulas, CFA/SEM, spatial BYM, social networks, causal BART, missing data, counterfactual inference, moderation, Bayesian DiD
- 2026-04-08: Ingested 2 PyMC tutorials — discrete choice models, factor analysis
- 2026-04-08: Ingested 5 textbooks/papers — BDA3, Bayesian Workflow, Statistical Rethinking, Garden of Forking Paths, Activity Bias, Mostly Harmless Econometrics
