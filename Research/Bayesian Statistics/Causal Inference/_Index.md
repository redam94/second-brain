---
title: "Index: Bayesian Causal Inference"
tags:
  - type/index
  - source/ingested
parent: "[[../Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-10
concept_count: 34
---

# Bayesian Causal Inference

> [!abstract] Routing Summary
> This folder covers Bayesian and ML-based causal inference. Contains 34 notes across 6 sub-topics.
> - For potential outcomes setup, SUTVA, ignorability, propensity score? → [[Foundations/_Index|Foundations]]
> - For Bayesian CI likelihood factorization, BART/GP/BCF outcome models, propensity score strategies? → [[Bayesian Inference/_Index|Bayesian Inference]]
> - For sensitivity analysis (E-value, copula), IV/principal stratification, time-varying treatments? → [[Sensitivity and Complex Mechanisms/_Index|Sensitivity and Complex Mechanisms]]
> - For interactive and LLM-based methods to elicit causal structure? → [[Knowledge Elicitation/_Index|Knowledge Elicitation]]
> - For S/T/X-learners and CATE estimation with ML? → [[Treatment Effect Estimation/_Index|Treatment Effect Estimation]]
> - For Bayesian structural time-series and CausalImpact? → [[Time Series Causal Inference/_Index|Time Series Causal Inference]]
> - For paper overview of Li et al. 2022? → [[Li et al 2022 - Overview]]

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 3 | Potential outcomes, SUTVA, ignorability, causal estimands, frequentist methods |
| [[Bayesian Inference/_Index\|Bayesian Inference]] | 3 | Bayesian CI structure, outcome models (BART/GP/BCF), propensity score strategies |
| [[Sensitivity and Complex Mechanisms/_Index\|Sensitivity and Complex Mechanisms]] | 3 | E-value, copula sensitivity, IV/principal stratification, g-formula, time-varying treatments |
| [[Knowledge Elicitation/_Index\|Knowledge Elicitation]] | 9 | Interactive (Yamashita 2020) and LLM-based (Shaposhnyk 2025) causal structure elicitation |
| [[Treatment Effect Estimation/_Index\|Treatment Effect Estimation]] | 6 | S/T/X-learner metalearners for CATE; minimax rates; voter turnout & transphobia applications |
| [[Time Series Causal Inference/_Index\|Time Series Causal Inference]] | 7 | BSTS model; spike-and-slab; Gibbs sampler; CausalImpact; advertising application |

## Paper Overview

- [[Li et al 2022 - Overview]] — "Bayesian causal inference: a critical review", Li, Ding & Mealli (2022), *Phil. Trans. R. Soc. A* 381
- [[Yamashita 2020 - Overview]] — "Interactive method to elicit local causal knowledge", Yamashita et al. (2020), HCII 2020
- [[Shaposhnyk 2025 - Overview]] — "Can LLMs assist expert elicitation for probabilistic causal modeling?", Shaposhnyk et al. (2025), arXiv
- [[Künzel 2019 - Overview]] — "Metalearners for estimating heterogeneous treatment effects", Künzel et al. (2019), PNAS 116(10)
- [[Brodersen 2015 - Overview]] — "Inferring causal impact using Bayesian structural time-series models", Brodersen et al. (2015), Ann. Appl. Stat. 9(1)

## Key Concept Dependency Chain

```
Potential Outcomes Framework
  └─► Causal Estimands (ITE, SATE, CATE, PATE, MATE)
        └─► Frequentist Causal Estimation (IPW, DR, matching)
        └─► Metalearners for CATE [Künzel 2019]
              ├── S-Learner (single model)
              ├── T-Learner (separate models; minimax rate)
              └── X-Learner (cross-imputation; optimal for unbalanced groups)
  └─► General Structure of Bayesian CI (factorization, Assumption 3.2)
        └─► Bayesian Outcome Models (BART, BCF, GP, regularization-induced confounding)
        └─► Propensity Score in Bayesian CI (3 strategies)
  └─► Sensitivity Analysis in Observational Studies (E-value, copula)
  └─► Instrumental Variables and Principal Stratification (CACE, compliance strata)
  └─► Time-Varying Treatments and G-computation (g-formula, sequential ignorability)
  └─► Counterfactual Inference [Brodersen 2015]
        └─► Bayesian Structural Time-Series Model (BSTS)
              ├── Local Linear Trend + Seasonality
              ├── Spike-and-Slab Prior (variable selection)
              ├── MCMC Inference (Gibbs + Kalman smoother)
              └── Counterfactual Impact Estimation (pointwise, cumulative, running avg)
Causal Structure Learning
  └─► Knowledge Elicitation [Yamashita 2020]
        ├── Cause-Precondition-Effect Model
        ├── Interactive GUI Workshop Method
        └── NLP Causal Extraction (Method A + B, Word2Vec)
  └─► LLM Expert Elicitation [Shaposhnyk 2025]
        ├── Dual-LLM Architecture (GPT-4o + Claude)
        ├── BN Construction Comparison (LLM vs BIC vs Human)
        └── Entropy-Based BN Evaluation
```

## Cross-Cutting Themes

- **Propensity score paradox**: Drops from Bayesian likelihood under ignorability, yet essential for design/overlap — appears in [[General Structure of Bayesian CI]], [[Propensity Score in Bayesian CI]], [[Bayesian Outcome Models]]
- **Regularization-induced confounding**: In high dimensions, standard Bayesian priors can bias causal estimates — see [[Bayesian Outcome Models#^warn-reg-confounding]] and [[General Structure of Bayesian CI#^warn-prior-dogmatism]]
- **Transparent parametrization**: Separating identifiable from non-identifiable parameters — see [[Sensitivity Analysis in Observational Studies]], [[General Structure of Bayesian CI]]

## Sources

- [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — Li F, Ding P, Mealli F. 2023. *Phil. Trans. R. Soc. A* 381: 20220153
- [[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]] — Yamashita G, Kanno T, Furuta K. 2020. HCII, LNCS 12217, pp. 437-446
- [[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]] — Shaposhnyk O, Zahorska D, Yanushkevich S. 2025. arXiv:2504.10397
- [[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]] — Künzel SR, Sekhon JS, Bickel PJ, Yu B. 2019. *PNAS* 116(10): 4156-4165
- [[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]] — Brodersen KH, Gallusser F, Koehler J, Remy N, Scott SL. 2015. *Ann. Appl. Stat.* 9(1): 247-274

## Cross-Links to Existing Vault Notes

- [[Bayesian Inverse Probability Weighting|Bayesian Propensity Scores and IPW]] — Bayesian IPW via Liao-Zigler two-stage method (Heiss blog) — related to [[Propensity Score in Bayesian CI]] Strategy 3
- [[Nonparametric Causal Inference]] — BART and non-parametric Bayesian causal methods — related to [[Bayesian Outcome Models]]
- [[Copula Estimation]] — copula methods used in sensitivity analysis — related to [[Sensitivity Analysis in Observational Studies]]
