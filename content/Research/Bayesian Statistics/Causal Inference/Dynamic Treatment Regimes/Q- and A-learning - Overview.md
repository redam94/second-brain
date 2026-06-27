---
title: "Q- and A-learning - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - type/overview
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "Abstract, §1 Introduction, pp. 640-642"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Dynamic Treatment Regimes Framework]]"
used_by: []
aliases:
  - dynamic treatment regimes
  - DTR
  - optimal treatment regime
  - personalized medicine sequential
  - Schulte Tsiatis Laber Davidian 2014
---

# Q- and A-learning - Overview

> [!summary]
> Schulte, Tsiatis, Laber & Davidian (2014) is a self-contained review of the two main statistical approaches — **Q-learning** ("quality") and **A-learning** ("advantage"/contrast) — for estimating **optimal dynamic treatment regimes (DTRs)** from clinical-trial or observational data. A DTR is a sequence of decision rules mapping a patient's accumulated history to a treatment at each of $K$ decision points; the optimal regime maximizes the population mean outcome. Both methods estimate it by **backward recursion** (dynamic programming). Q-learning models the full outcome regression (Q-functions) at every stage; A-learning models only the treatment *contrast* plus the propensity, buying **double robustness** and lower sensitivity to model misspecification at some cost in efficiency. The paper formalizes the framework, derives both estimators, and studies the bias–variance / robustness trade-off by simulation and a depression-study (STAR\*D) application.

## Overview

**Personalized medicine** treats a chronic disease through a *series* of decisions, each tailored to a patient's baseline and evolving characteristics. A **dynamic treatment regime** operationalizes this: a set of sequential decision rules, one per decision point, that take the patient's history to that point and output the next treatment. The statistical goal is to estimate, from existing data, the regime that — if followed by the whole population — yields the most favorable expected outcome.

Q- and A-learning are the two dominant estimation approaches, both rooted in **dynamic programming / backward induction** and related to reinforcement learning for sequential decisions. This note is the entry point; the framework, the two methods, and their comparison are developed in the linked notes.

## Main Content

### Research question

Given data $(S_{1i}, A_{1i}, \dots, S_{Ki}, A_{Ki}, Y_i)$, $i=1,\dots,n$, on $n$ patients each followed through $K$ treatment decisions, how do we estimate the **optimal dynamic treatment regime** $d^{\text{opt}}$ — the sequence of rules maximizing the population mean outcome — and how do Q-learning and A-learning differ in their assumptions, robustness, and efficiency?

### The two methods at a glance

| | **Q-learning** | **A-learning** |
|---|---|---|
| What is modeled | full **Q-functions** $Q_k(\bar s_k, \bar a_k)$ (outcome regressions) at each stage | only the **contrast/advantage function** $C_k$ + the **propensity** $\pi_k$ |
| Estimation | backward recursive OLS/WLS regressions | backward recursive **g-estimation** (estimating equations) |
| Robustness | requires *all* Q-functions correct | **doubly robust**: consistent if contrast is correct and *either* propensity or the nuisance $h_k$ is correct |
| Efficiency | more efficient when all models correct | somewhat less efficient when everything is correct |
| Interpretability/diagnostics | standard regression diagnostics | semi-parametric; harder to diagnose |

See [[Q-learning]] and [[A-learning and Robustness]] for the formal estimators.

### Key findings

1. **Equivalence of optimal regime in observed data.** Under consistency, sequential randomization (no unmeasured confounders), and positivity, the optimal regime defined via potential outcomes can be expressed and estimated from the observed-data distribution (see [[Optimal Regime via Dynamic Programming]]).
2. **Bias–variance / robustness trade-off.** When all working models are correct, Q-learning is more efficient. Under misspecification of the propensity model and/or the Q-function, A-learning's reliance only on a correct *contrast* makes it more robust — it maintains higher "value efficiency" $R(\hat d^{\text{opt}})$ across the simulations (Figs. 1–6).
3. **Model misspecification is the central practical concern.** Q-learning's stagewise outcome models for $k < K$ regress on *estimated value functions*, which are generally highly nonlinear; linear working models are likely misspecified, and the error propagates through the backward recursion.

## Connections

- A **sequential / multi-stage** generalization of single-decision treatment-effect estimation — compare the [[Metalearners for CATE|metalearners (S/T/X-learner)]] for one-stage CATE.
- Built on the [[Potential Outcomes Framework]] extended to sequential treatments; the identification assumptions parallel those for [[Time-Varying Treatments and G-computation|g-computation with time-varying treatments]].
- A-learning's g-estimation derives from Robins's structural nested mean models; the backward-induction logic is dynamic programming.

## See Also

- [[Dynamic Treatment Regimes Framework]] — potential outcomes, optimal regime definition, identification assumptions
- [[Optimal Regime via Dynamic Programming]] — Q-functions, value functions, backward induction
- [[Q-learning]] / [[A-learning and Robustness]] — the two estimation methods
- [[Time-Varying Treatments and G-computation]] — related sequential-treatment identification
