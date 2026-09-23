---
title: "Index: Delayed and Censored Feedback"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Experimental Design]]"
date_updated: 2026-07-03
concept_count: 4
---

# Delayed and Censored Feedback

> [!abstract] Routing Summary
> How to learn and make decisions when the label/reward isn't just noisy but **arrives late — and might never arrive at all**. Contains 4 notes: a topic **overview** relating this to classical censoring, Chapelle's (2014) **supervised** joint classifier + delay model for conversion prediction, the **EM / gradient optimization** that fits it (and reduces to weighted censored survival regression), and Vernade, Cappé & Perchet's (2017) **bandit-theoretic** generalization with regret lower/upper bounds.
> - Why delay + censoring matters, how the two source papers relate? → [[Delayed and Censored Feedback - Overview]]
> - The joint conversion classifier + exponential delay model, and the likelihood that handles pending (censored) examples? → [[Delayed Feedback Model for Conversion Prediction]]
> - How that joint model is fit: EM algorithm, direct gradient descent, reduction to weighted censored exponential regression? → [[EM and Gradient Optimization for the Delayed Feedback Model]]
> - The stochastic bandit formalization of delayed + censored rewards, DelayedUCB/DelayedKLUCB, and their regret bounds? → [[Bandit Models with Delayed and Censored Feedback]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Topic overview; delay vs. censoring; supervised vs. bandit framing | [[Delayed and Censored Feedback - Overview]] | concept/overview | [[Survival Analysis]] | Censoring here adds a "never happens" outcome absent from classical survival analysis |
| $(X,Y,C,D,E)$ setup; naive-labeling bias; joint likelihood | [[Delayed Feedback Model for Conversion Prediction]] | concept/theorem | [[Survival Analysis]], [[Delayed and Censored Feedback - Overview]] | $\Pr(Y=0\mid X,E)=1-p(x)+p(x)\exp(-\lambda(x)e)$ |
| EM algorithm; joint gradient optimization; reduction to censored regression | [[EM and Gradient Optimization for the Delayed Feedback Model]] | concept/theorem | [[Delayed Feedback Model for Conversion Prediction]] | M-step decomposes into weighted logistic regression + weighted censored exponential regression |
| Delayed/censored bandit model; DelayedUCB/DelayedKLUCB; regret bounds | [[Bandit Models with Delayed and Censored Feedback]] | concept/theorem | [[Survival Analysis]], [[Delayed Feedback Model for Conversion Prediction]] | Censored lower bound $\sum_{k\ne k^*}\tau_m(\theta^*-\theta_k)/d(\tau_m\theta_k,\tau_m\theta^*)$; matching $O(\log T)$ upper bounds (Thms 9, 11) |

## Notes

- [[Delayed and Censored Feedback - Overview]] — CONTAINS: why delayed/censored feedback breaks naive classification and survival-analysis assumptions; comparison table (Chapelle vs. Vernade et al.); explicit mapping of "not-yet-converted" to right-censoring; reading order.
- [[Delayed Feedback Model for Conversion Prediction]] — CONTAINS: the $(X,Y,C,D,E)$ variable setup (Eqs. 2–4); why short/long matching windows both fail; the logistic classifier + exponential hazard joint model (Eq. 5); the full likelihood for observed and pending conversions (Eqs. 6, 8–9); the two limiting-regime interpretation of an unlabeled example; toy convergence and real-traffic (Table 1) results.
- [[EM and Gradient Optimization for the Delayed Feedback Model]] — CONTAINS: E-step posterior $w_i$ (Eq. 10); M-step decomposition into weighted logistic + weighted censored exponential regression (Eqs. 11–13); the direct (non-convex) joint gradient objective (Eqs. 14–17) and its two limiting gradients; the closed-form censored-exponential-MLE special case; empirical comparison against Naive/Rescale/Shifted/STC/Oracle baselines.
- [[Bandit Models with Delayed and Censored Feedback]] — CONTAINS: the $(C_t,D_t)$ stochastic bandit model and $m$-thresholded censored variant (§2); the regret decomposition (Lemma 1); censored and uncensored regret lower bounds (Theorems 3–4, recovering Lai–Robbins in the uncensored limit); the delay-corrected estimator $\tilde N_k(t),\hat\theta_k(t)$ (Eq. 5); DelayedUCB and DelayedKLUCB indices (Prop. 6, Lemma 7) and their finite-time regret upper bounds (Theorems 9, 11 and Corollaries 10, 12); simulation results.

## Sources
- Chapelle 2014 - Modeling Delayed Feedback in Display Advertising — Chapelle, O. (2014), *Modeling Delayed Feedback in Display Advertising*, **KDD'14**, Criteo Labs.
- Vernade Cappe Perchet 2017 - Stochastic Bandit Models for Delayed Conversions — Vernade, C., Cappé, O. & Perchet, V. (2017), *Stochastic Bandit Models for Delayed Conversions*, arXiv:1706.09186.

## See Also
- [[Survival Analysis]] — the classical right-censoring framework this sub-topic extends with a "may never happen" outcome
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — the standard bandit-regret framework that the delayed/censored bandit model generalizes
