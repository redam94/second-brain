---
title: "Decision Analysis"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/decision-theory
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Model Assessment"
aliases:
  - "Bayesian decision theory"
  - "Loss function"
  - "Utility"
doc_type: concept
source_location: "BDA3 Ch.9:237-258"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Hierarchical Models]]"
  - "[[Model Comparison]]"
  - "[[Overfitting and Information Criteria]]"
used_by:
  - "[[Counterfactual Inference]]"
---

# Decision Analysis

> [!summary]
> Chapter 9 of BDA3 connects Bayesian inference to decision-making. The optimal decision minimizes expected loss (or maximizes expected utility) under the posterior distribution.

## Framework

Given a decision $d$, unknown parameters $\theta$, and a loss function $L(d, \theta)$:

$$d^* = \arg\min_d \; \text{E}[L(d, \theta) \mid y] = \arg\min_d \int L(d, \theta)\, p(\theta \mid y)\, d\theta$$

Common loss functions yield familiar estimators:
- **Squared error loss** → posterior mean
- **Absolute error loss** → posterior median
- **0-1 loss** → posterior mode

## Applications Covered

- **Survey incentives**: using regression predictions to optimize survey response rates
- **Medical screening**: multistage decision making under uncertainty
- **Home radon**: hierarchical model informing household-level decisions
- **Personal vs. institutional decisions**: different utility functions for individual vs. policy decisions

## Key Insight

> [!tip]
> The full posterior distribution — not just point estimates — flows directly into decisions. This is a major advantage of the Bayesian approach: uncertainty quantification naturally informs the cost of being wrong.

## See Also

- [[Probability and Bayesian Inference]] — the posterior that feeds into decisions
- [[Hierarchical Models]] — partial pooling often improves decisions by reducing variance
- [[Model Comparison]] — choosing between models before making decisions
- [[Overfitting and Information Criteria]] — model selection criteria that inform which posterior to use
- [[Counterfactual Inference]] — counterfactual thinking as a prerequisite for decision framing
- [[Model Checking]] — a model must pass posterior predictive checks before its posterior can be trusted in a decision analysis
