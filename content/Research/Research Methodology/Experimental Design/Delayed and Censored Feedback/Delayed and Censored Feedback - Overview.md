---
title: Delayed and Censored Feedback - Overview
tags:
  - source/ingested
  - topic/research-methodology
  - topic/delayed-feedback
  - topic/censoring
  - type/overview
  - doc/paper
source: "[[raw/Chapelle 2014 - Modeling Delayed Feedback in Display Advertising.pdf]]"
source_location: "full paper; companion source [[raw/Vernade Cappe Perchet 2017 - Stochastic Bandit Models for Delayed Conversions.pdf]], full paper"
date_ingested: 2026-07-03
folder: "Research Methodology/Experimental Design/Delayed and Censored Feedback"
doc_type: paper
depends_on:
  - "[[Survival Analysis]]"
used_by:
  - "[[Delayed Feedback Model for Conversion Prediction]]"
  - "[[EM and Gradient Optimization for the Delayed Feedback Model]]"
  - "[[Bandit Models with Delayed and Censored Feedback]]"
aliases:
  - Delayed Feedback
  - Censored Feedback
  - Delayed Conversions
  - Delayed and Censored Rewards
---

# Delayed and Censored Feedback - Overview

> [!summary]
> Many experimentation and measurement settings reward you with a **label that arrives late, and sometimes never**: a display ad click may lead to a purchase weeks later (or not at all); a bandit action's payoff may only be revealed after a stochastic delay that can exceed how long you're willing to wait. This sub-topic covers two papers that formalize this **delayed + censored feedback** problem: **Chapelle (2014)** solves it as a *supervised learning* problem (predict conversion probability from a snapshot of partially-labeled data) and **Vernade, Cappé & Perchet (2017)** solve it as a *sequential decision-making* problem (bandit regret minimization under the same delay/censoring mechanism). Both build directly on the **right-censoring** concept from classical [[Survival Analysis]], but add a twist survival analysis doesn't have: the "patient" may never experience the event at all.

## Overview

### Why delay + censoring matters for experimentation

Classical [[Survival Analysis]] assumes every unit will *eventually* experience the event if followed long enough (death is certain); the only question is *when*, and censoring arises because we stop watching too soon. In **conversion prediction** and **online decision-making with delayed rewards**, this assumption breaks: a user who clicked an ad may simply **never** convert. This creates a fundamental ambiguity that neither classical survival analysis nor classical binary classification handles cleanly:

> [!definition] The core ambiguity
> Given an action (e.g. a click) for which no positive outcome (e.g. a conversion) has yet been observed by the current elapsed time $E$, we cannot tell whether:
> 1. the outcome **will never happen** ($C=0$, a true negative), or
> 2. the outcome **will happen later** ($C=1$, but $E < D$ where $D$ is the delay) — the pending example is **right-censored**, exactly as in [[Survival Analysis]]: we only know the event time is *at least* $E$.
>
> Labeling every not-yet-converted example as a negative (the "**Naive**" approach) systematically biases a classifier's predicted conversion rate downward, worse for the most recent (least-elapsed-time) examples — precisely the examples a live system needs to learn from fastest.

This is why delay + censoring is a first-class experimental-design problem, not just a data-cleaning nuisance: **the choice of observation/attribution window trades off label correctness against model freshness.** A short window mislabels many true positives as negatives; a long window is unbiased but forces the model to train on stale data (see [[Delayed Feedback Model for Conversion Prediction#Why naive labeling is biased|the matching-window dilemma]]).

### Two papers, two settings

| | Chapelle (2014) | Vernade, Cappé & Perchet (2017) |
|---|---|---|
| **Setting** | Batch/streaming supervised learning (conversion-rate prediction) | Sequential decision-making (stochastic multi-armed bandits) |
| **Goal** | Unbiased $\Pr(\text{conversion}\mid X)$ estimate despite pending labels | Minimize cumulative regret while receiving delayed, possibly-censored rewards |
| **Delay model** | Feature-dependent exponential, $\lambda(x)$ | Any distribution with known/estimable CDF $\tau$, shared across arms |
| **Censoring mechanism** | Implicit: elapsed time $E$ since click, unbounded but data collection stops | Explicit: hard **observation window** of $m$ steps after which feedback is permanently lost |
| **Core object** | Joint likelihood combining a classifier and a delay density (§3 of [[Delayed Feedback Model for Conversion Prediction]]) | A delay-corrected reward estimator plus optimistic bandit indices (§ of [[Bandit Models with Delayed and Censored Feedback]]) |
| **Main result type** | MLE / EM algorithm, empirical NLL comparison | Regret lower bounds (Theorems 3–4) and matching upper bounds (Theorems 9, 11) |
| **Industry origin** | Criteo Labs (display advertising) | Criteo Research + academic co-authors; explicitly framed as *"inspired by Chapelle (2014)"* |

Vernade et al. is explicit that their bandit model is **inspired by and formalizes** Chapelle's applied setup: the same conversion indicator $C$, the same delay $D$, and the same intuition that a click with no conversion yet is neither a confirmed negative nor a confirmed positive. What Vernade et al. add is (1) a hard truncation/**observation window** $m$ after which the true outcome can *never* be recovered (Chapelle's setting is, in effect, uncensored but with an unboundedly patient learner), and (2) they cast the *use* of predictions as a **sequential decision problem** with formal regret guarantees, rather than a one-shot prediction-accuracy problem.

## Main Content

### Relation to censoring in Survival Analysis

Both papers explicitly invoke the vocabulary of survival analysis:

- Chapelle: *"if at training time a conversion has not occurred, the delay of the conversion (if any) is known to be at least the time elapsed since the click"* — this is [[Survival Analysis#Censoring|right censoring]] applied to the click→conversion delay. The elapsed time $E$ plays the role of the survival-analysis follow-up time; a not-yet-converted click is a right-censored observation with censoring time $E$.
- Vernade et al.: the **censored model** (§2.2 of their paper) imposes a **fixed censoring window $m$** — once $m$ steps have elapsed with no observed conversion, the outcome is discarded from ever entering the likelihood, rather than merely being *provisionally* right-censored. This is a stricter, "hard-stop" version of right-censoring: classical survival analysis lets you eventually resolve some censored cases if you keep following up; Vernade et al.'s censored bandit model formally forbids this beyond $m$ steps, which is what necessitates *delay-corrected* estimators (see [[Bandit Models with Delayed and Censored Feedback]]).

The crucial departure from [[Survival Analysis]] in **both** papers is that the event is not guaranteed to occur. Standard survival analysis, Cox regression, and Kaplan-Meier all implicitly allow for "the event never happens in this unit," but their machinery is built around *estimating the distribution of the (possibly infinite) survival time*; here, the papers explicitly split "will it ever happen" ($C$, a Bernoulli conversion/success indicator) from "when, if it happens" ($D$, the delay/survival-time distribution) and model them **jointly**, precisely because the mixture between "never" and "just not yet" cannot be resolved from a censored observation alone.

### Reading order

1. [[Delayed Feedback Model for Conversion Prediction]] — Chapelle's problem setup, the joint classifier + delay model, and the likelihood that correctly handles censored (pending) examples.
2. [[EM and Gradient Optimization for the Delayed Feedback Model]] — how the joint model is actually fit: the EM algorithm, the equivalent direct gradient optimization, non-convexity, and empirical validation against naive/oracle baselines.
3. [[Bandit Models with Delayed and Censored Feedback]] — Vernade, Cappé & Perchet's formalization of the same phenomenon inside a stochastic multi-armed bandit, their delay-corrected UCB/KL-UCB algorithms, and regret lower/upper bounds.

## Connections

- **Extends** [[Survival Analysis]]: same right-censoring concept, but with an explicit "will it ever happen" latent variable and (in Vernade et al.) a hard censoring window instead of a soft follow-up cutoff.
- **Feeds into** online/sequential experimentation: the bandit formalization in [[Bandit Models with Delayed and Censored Feedback]] connects this topic to [[Multi-Armed Bandits and Thompson Sampling - Overview]] — it extends the standard bandit-regret framework (immediate, uncensored rewards) to delayed and censored rewards.
- **Relevant to media measurement**: conversion-rate estimation under delayed attribution is a direct analogue of measuring downstream marketing effects (e.g. purchase attribution) that unfold over days-to-weeks, the same "matching window" tradeoff that appears in incrementality and MMM measurement windows.

## See Also
- [[Survival Analysis]] — the classical right-censoring framework this topic extends
- [[Delayed Feedback Model for Conversion Prediction]] — Chapelle's joint classifier + delay model
- [[EM and Gradient Optimization for the Delayed Feedback Model]] — fitting the joint model
- [[Bandit Models with Delayed and Censored Feedback]] — the sequential/bandit-theoretic extension
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — the general bandit-regret framework being extended (note: created concurrently; link may not resolve immediately)
