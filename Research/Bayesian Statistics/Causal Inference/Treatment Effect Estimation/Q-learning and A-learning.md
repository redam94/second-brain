---
title: "Q-learning and A-learning for Dynamic Treatment Regimes"
tags:
  - source/ingested
  - type/concept
  - topic/causal-inference
  - topic/treatment-effects
  - topic/dynamic-treatment-regimes
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "full paper"
date_ingested: 2026-07-19
folder: "Bayesian Statistics/Causal Inference/Treatment Effect Estimation"
doc_type: concept
depends_on:
  - "[[Metalearners for CATE]]"
  - "[[Bayesian Outcome Models]]"
used_by: []
aliases:
  - Q-learning
  - A-learning
  - Dynamic treatment regimes
  - DTR
  - Optimal individualized treatment rules
---

# Q-learning and A-learning for Dynamic Treatment Regimes

> [!summary]
> Q-learning and A-learning are model-based methods for estimating **optimal dynamic treatment regimes (DTRs)** — sequences of treatment decisions tailored to evolving patient/unit characteristics. Q-learning models the full outcome regression; A-learning focuses on contrasts (blip functions) and is more robust to misspecification in the outcome model.

> [!note] Stub Note
> This note is a placeholder created to process the orphaned raw file `q- and a- learning.pdf`. Full content requires reading the paper and expanding the treatment of DTR methods.

## Overview

A **dynamic treatment regime** (DTR) is a decision rule that maps observed patient history to a treatment recommendation at each stage. The goal is to find the optimal DTR that maximizes expected outcome across a population.

Two main estimation approaches:

### Q-learning

- Model the **Q-function**: $Q_t(h_t, a_t) = E[Y \mid H_t = h_t, A_t = a_t]$ (expected outcome given history and action at time $t$)
- Backward induction: estimate $Q$ at the final stage, then use pseudo-outcomes to work backwards
- Sensitive to misspecification of outcome model at intermediate stages

### A-learning

- Model the **blip function**: $\gamma_t(h_t, a_t) = E[Y \mid H_t, A_t = a_t] - E[Y \mid H_t, A_t = a^*_t]$ (treatment contrast relative to reference)
- Only requires correctly specifying the treatment contrast, not the full outcome model
- More robust than Q-learning to outcome model misspecification

## Key Concepts

> [!definition] Definition: Optimal DTR
> The optimal DTR $d^* = (d^*_1, \ldots, d^*_T)$ is the sequence of decision rules that maximizes the expected potential outcome under the DTR:
> $$d^* = \arg\max_d E[Y^{\bar{d}}]$$
^def-optimal-dtr

## Connections

- [[Metalearners for CATE]] — single-stage optimal treatment rules; Q-learning extends this to multiple stages
- [[Bayesian Outcome Models]] — Bayesian approaches to Q-learning use posterior distributions over Q-functions
- [[General Structure of Bayesian CI]] — DTRs as a sequential decision problem under uncertainty

## See Also

- Laber et al. — Q-learning for optimal dynamic treatment
- Murphy (2003) — A-learning and optimal regimes
