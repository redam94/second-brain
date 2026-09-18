---
title: "Index: Machine Learning and AI"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-09-18
concept_count: 29
---

# Machine Learning and AI

> [!abstract] Routing Summary
> This folder covers modern machine learning and AI as seen from a statistician's desk: how transformers and large language models work, how LLMs are turned into reasoning systems and agents, and two places where ML meets classical inference — distribution-free predictive uncertainty (conformal prediction) and probabilistic forecasting. Contains 29 notes in 4 sub-topics, grounded in 16 primary papers (2007–2024).
> - Need how attention, transformers, pretraining, scaling laws or in-context learning work? -> [[Research/Machine Learning and AI/Transformers and LLM Foundations/_Index|Transformers and LLM Foundations]], starting at [[Transformers and LLM Foundations - Overview]]
> - Need chain-of-thought, RAG, ReAct agents, tool use, RLHF or LLM evaluation? -> [[Research/Machine Learning and AI/LLM Reasoning, Retrieval and Agents/_Index|LLM Reasoning, Retrieval and Agents]], starting at [[LLM Reasoning, Retrieval and Agents - Overview]]
> - Need finite-sample, model-agnostic prediction intervals (split conformal, CQR, covariate shift, ITE intervals)? -> [[Research/Machine Learning and AI/Conformal Prediction/_Index|Conformal Prediction]], starting at [[Conformal Prediction - Overview]]
> - Need modern forecasting (proper scoring rules, DeepAR, Chronos, hierarchical reconciliation, backtesting)? -> [[Research/Machine Learning and AI/Probabilistic Forecasting/_Index|Probabilistic Forecasting]], starting at [[Probabilistic Forecasting - Overview]]
> - Need ML **for causal inference** (double ML, causal forests, R-learner)? -> [[Research/Econometrics/Causal Machine Learning/_Index|Causal Machine Learning]] (in Econometrics)
> - Need neural networks **for Bayesian computation** (neural SBI, normalizing flows, VAEs, ADVI)? -> [[Research/Bayesian Statistics/Computation/Neural Simulation-Based Inference/_Index|Neural Simulation-Based Inference]] and [[Research/Bayesian Statistics/Computation/Variational Inference/_Index|Variational Inference]] (in Bayesian Statistics)
> - Need LLMs **as simulated consumers / survey respondents**? -> [[Research/Agent-Based Modeling/LLM-Powered Agents/_Index|LLM-Powered Agents]] (in Agent-Based Modeling)
> - Need LLMs for eliciting causal graphs and Bayesian networks? -> [[Research/Bayesian Statistics/Causal Inference/Knowledge Elicitation/_Index|Knowledge Elicitation]]

## Sub-topics

| Sub-topic | Notes | Covers |
|-----------|-------|--------|
| [[Research/Machine Learning and AI/Transformers and LLM Foundations/_Index\|Transformers and LLM Foundations]] | 7 | Scaled dot-product and multi-head attention, the transformer architecture and positional encoding, autoregressive pretraining, Kaplan scaling laws, Chinchilla compute-optimal training, in-context learning — Vaswani 2017, Kaplan 2020, Hoffmann 2022, Brown 2020 |
| [[Research/Machine Learning and AI/LLM Reasoning, Retrieval and Agents/_Index\|LLM Reasoning, Retrieval and Agents]] | 8 | Chain-of-thought prompting, retrieval-augmented generation, ReAct, the tool-use agent loop, RLHF and instruction tuning, reward modeling as a paired-comparison choice model, evaluation and hallucination — Wei 2022, Lewis 2020, Yao 2022, Ouyang 2022 |
| [[Research/Machine Learning and AI/Conformal Prediction/_Index\|Conformal Prediction]] | 7 | Split conformal and the exchangeability coverage guarantee, conformity scores and adaptive sets, conformalized quantile regression, marginal vs conditional coverage, weighted conformal under covariate shift, conformal intervals for counterfactuals and ITEs — Angelopoulos & Bates 2021, Romano 2019, Tibshirani 2019, Lei & Candès 2020 |
| [[Research/Machine Learning and AI/Probabilistic Forecasting/_Index\|Probabilistic Forecasting]] | 7 | Proper scoring rules (CRPS, log score, pinball), DeepAR and global neural forecasters, time-series foundation models (Chronos), local vs global models, MinT hierarchical reconciliation, rolling-origin backtesting — Gneiting & Raftery 2007, Salinas 2017, Ansari 2024, Wickramasuriya 2019 |

## Reading Paths

- **"How do LLMs actually work?"** [[Scaled Dot-Product and Multi-Head Attention]] → [[Transformer Architecture and Positional Encoding]] → [[Autoregressive Language Modeling and Pretraining]] → [[Neural Scaling Laws]] → [[Compute-Optimal Training (Chinchilla)]] → [[In-Context Learning and Few-Shot Prompting]]
- **"How do I build something with an LLM?"** [[In-Context Learning and Few-Shot Prompting]] → [[Chain-of-Thought Prompting]] → [[Retrieval-Augmented Generation (RAG)]] → [[ReAct - Reasoning and Acting Agents]] → [[Tool Use and the Agent Loop]] → [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]
- **"How do I put honest error bars on an ML prediction?"** [[Split Conformal Prediction and the Coverage Guarantee]] → [[Conformalized Quantile Regression]] → [[Marginal vs Conditional Coverage]] → [[Conformal Prediction Under Covariate Shift]] → [[Conformal Inference for Counterfactuals and ITEs]]
- **"How do I forecast many related series and evaluate the forecasts?"** [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] → [[Local vs Global Forecasting Models]] → [[DeepAR and Global Autoregressive Neural Forecasters]] → [[Time-Series Foundation Models (Chronos)]] → [[Hierarchical Forecast Reconciliation (MinT)]] → [[Forecast Evaluation and Backtesting]]

## Cross-Cutting Concepts
- **Amortization**: one expensive training run buys cheap inference for every future input — in-context learning ([[In-Context Learning and Few-Shot Prompting]]), zero-shot forecasting ([[Time-Series Foundation Models (Chronos)]]), and, elsewhere in the vault, [[Neural Posterior Estimation (NPE)]] and [[Reparameterization Trick and Variational Autoencoders]].
- **Pooling across units**: global forecasters ([[Local vs Global Forecasting Models]]) and LLM pretraining are the ML analogue of partial pooling in [[Hierarchical Models]].
- **Exchangeability**: the single assumption behind conformal coverage ([[Split Conformal Prediction and the Coverage Guarantee]]) is the same one behind [[Permutation Tests and Exact Inference]]; forecasting breaks it, which is why [[Forecast Evaluation and Backtesting]] is time-ordered.
- **Budget allocation under a power law**: [[Compute-Optimal Training (Chinchilla)]] solves the same constrained-allocation problem as [[ROAS, mROAS, and Optimal Media Mix]].
- **Preference data as choice data**: [[Reward Modeling from Human Preferences]] fits a Bradley–Terry / logit model, i.e. the machinery of [[Discrete Choice Models]].
- **Calibration has two meanings**: predictive coverage ([[Conformal Prediction - Overview]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]) versus computational faithfulness ([[Simulation-Based Calibration - Overview]]).

## Sources
All PDFs are in `Machine Learning and AI/raw/`; each sub-topic index lists its own sources with arXiv ids.

## See Also
- [[Research/Econometrics/Causal Machine Learning/_Index|Causal Machine Learning]] — DML, Neyman orthogonality, causal forests / GRF, R-learner
- [[Research/Bayesian Statistics/Computation/Variational Inference/_Index|Variational Inference]] — ELBO, CAVI, ADVI, VAEs, normalizing flows, PSIS diagnostics
- [[Research/Bayesian Statistics/Computation/Neural Simulation-Based Inference/_Index|Neural Simulation-Based Inference]] — NPE / NLE / NRE for simulator calibration
- [[Research/Agent-Based Modeling/LLM-Powered Agents/_Index|LLM-Powered Agents]] — generative agents, silicon samples, homo silicus
- [[Research/Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling/_Index|Multi-Armed Bandits and Thompson Sampling]] — the sequential-decision side of ML already in the vault
- [[Research/Probabilistic Numerics/_Index|Probabilistic Numerics]] — Gaussian processes and Bayesian optimisation
