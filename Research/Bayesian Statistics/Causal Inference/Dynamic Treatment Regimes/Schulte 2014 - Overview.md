---
title: "Q- and A-Learning Methods for Estimating Optimal Dynamic Treatment Regimes"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - topic/personalized-medicine
  - type/overview
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "Full text, pp. 640–661"
date_ingested: 2026-09-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: overview
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Dynamic Treatment Regimes Framework]]"
  - "[[Q-Learning and A-Learning]]"
used_by: []
aliases:
  - Schulte 2014
  - Q- and A-learning DTR
authors:
  - Phillip J. Schulte
  - Anastasios A. Tsiatis
  - Eric B. Laber
  - Marie Davidian
year: 2014
journal: "Statistical Science"
doi: "10.1214/13-STS450"
---

# Q- and A-Learning Methods for Estimating Optimal Dynamic Treatment Regimes

> [!summary]
> Schulte, Tsiatis, Laber, and Davidian (2014) provide a self-contained tutorial on Q-learning and A-learning (advantage learning) for estimating **optimal dynamic treatment regimes** (DTRs) — sequential decision rules that personalize treatment assignment based on evolving patient information. Q-learning models the full Q-functions via backward-recursive regression; A-learning models only the contrast functions, achieving double robustness. The paper compares methods through simulation and applies them to the STAR*D depression study.

## Paper Structure

| Section | Topic |
|---------|-------|
| §1 Introduction | Motivation: personalized medicine, DTRs vs. static rules |
| §2 Framework | Potential outcomes, sequential randomization, positivity |
| §3 Optimal regimes | Q-functions, backward induction, d^opt |
| §4 Midstream regimes | Optimal regime for patients arriving at decision k > 1 |
| §5.1 Q-learning | Backward OLS/WLS fitting of Q-functions |
| §5.2 A-learning | Contrast-function modeling; doubly robust |
| §5.3 Comparison | Q vs. A: misspecification robustness, efficiency tradeoffs |
| §6 Empirical studies | Simulation: misspecification effects, sample sizes |
| §7 Application | STAR*D study, two-stage antidepressant regimes |

## Core Problem

In clinical practice, patients make **K sequential treatment decisions** at times $k = 1, \ldots, K$. At each decision point $k$, a clinician observes patient history $S_k$ (covariates accrued since last decision) and assigns treatment $A_k$. A **dynamic treatment regime** $d = (d_1, \ldots, d_K)$ maps history to treatment:

$$d_k(s_k^-, \bar{a}_{k-1}) \in \mathcal{A}_k$$

The **optimal regime** $d^{\text{opt}}$ maximizes the expected potential outcome $E\{Y^*(d)\}$ over all regimes in the feasible class $\mathcal{D}$.

## Methods Summary

| Method | What is modeled | Robustness |
|--------|-----------------|-----------|
| Q-learning | Full Q-functions $Q_k(s_k, \bar{a}_k; \xi_k)$ | Requires correct specification of all $K$ Q-functions |
| A-learning | Contrast functions $C_k(s_k, \bar{a}_{k-1}; \psi_k)$ only | Doubly robust: consistent if either contrast model or propensity model is correct |

## Key Assumptions

- **Consistency**: observed outcomes equal potential outcomes under the received treatment
- **Sequential randomization** (no unmeasured confounding): $A_k \perp W^* \mid S_k, \bar{A}_{k-1}$
- **Positivity**: $\text{pr}(A_k = a_k \mid S_k = s_k, \bar{A}_{k-1} = \bar{a}_{k-1}) > 0$ for all feasible $(s_k, \bar{a}_{k-1})$

## Application: STAR*D Study

The paper applies both methods to the Sequenced Treatment Alternatives to Relieve Depression (STAR*D, Rush et al. 2004) study — two-stage antidepressant treatment decisions. This illustrates practical implementation in a real-world clinical trial.

## See Also

- [[Dynamic Treatment Regimes Framework]] — formal setup: potential outcomes, Q-functions, backward induction
- [[Q-Learning and A-Learning]] — detailed comparison and estimation procedures
- [[Time-Varying Treatments and G-computation]] — G-computation as an alternative to Q/A-learning
- [[Potential Outcomes Framework]] — foundational causal framework
- [[Metalearners for CATE]] — a related approach for heterogeneous treatment effects (cross-sectional)
- [[raw/q- and a- learning.pdf]] — source paper
