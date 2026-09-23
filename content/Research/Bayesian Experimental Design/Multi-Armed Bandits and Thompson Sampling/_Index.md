---
title: "Index: Multi-Armed Bandits and Thompson Sampling (Bayesian Experimental Design)"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Experimental Design]]"
date_updated: 2026-07-03
concept_count: 6
---

# Multi-Armed Bandits and Thompson Sampling

> [!abstract] Routing Summary
> The **earn-while-learning** counterpart to the rest of Bayesian Experimental Design: instead of maximizing information about $\theta$ with no reward at stake, bandit algorithms **maximize cumulative reward** while learning online, paying for exploration as **regret**. Ingests Russo, Van Roy, Kazerouni, Osband & Wen (2018), *A Tutorial on Thompson Sampling*. Contains 6 notes.
> - The big picture — bandits vs. BED vs. BO, why greedy fails, TS's core idea? → [[Multi-Armed Bandits and Thompson Sampling - Overview]]
> - The algorithm itself — Beta-Bernoulli conjugate update, general TS/greedy boxes? → [[Bernoulli Bandit and Thompson Sampling Algorithm]]
> - The competing exploration rule — UCB1, CascadeUCB vs. CascadeTS, Gittins index? → [[UCB and Greedy Algorithms for Bandits]]
> - Why it works, and when it doesn't — Lai-Robbins, eluder dimension, information ratio, failure modes? → [[Regret Bounds for Thompson Sampling]]
> - Richer reward models — linear/GLM bandits, news recommendation, product assortment? → [[Contextual and Linear Bandits]]
> - Making it practical — Laplace/Langevin/bootstrap/ensemble approximations, nonstationarity, PSRL? → [[Approximate Thompson Sampling and Practical Extensions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| MAB problem; exploration-exploitation; TS's core idea; why greedy fails | [[Multi-Armed Bandits and Thompson Sampling - Overview]] | concept/overview | [[The Global Optimisation Problem]] | TS = probability matching via one posterior draw per period |
| Beta-Bernoulli conjugacy; BernGreedy/BernTS; general Greedy/Thompson algorithms | [[Bernoulli Bandit and Thompson Sampling Algorithm]] | concept/definition | [[Multi-Armed Bandits and Thompson Sampling - Overview]] | $(\alpha_k,\beta_k)\leftarrow(\alpha_k+r_t,\beta_k+1-r_t)$; TS samples $\hat\theta\sim p$ instead of $\hat\theta=\mathbb E_p[\theta]$ |
| $\epsilon$-greedy/dithering; UCB1; CascadeUCB vs CascadeTS; Gittins index | [[UCB and Greedy Algorithms for Bandits]] | concept/definition | [[Bernoulli Bandit and Thompson Sampling Algorithm]] | Hyper-rectangular UCB confidence sets over-optimistic vs. TS's ellipsoidal posterior draws |
| Bayesian regret; Lai-Robbins asymptotic bound; eluder dimension; information ratio | [[Regret Bounds for Thompson Sampling]] | concept/theorem | [[UCB and Greedy Algorithms for Bandits]], [[Expected Information Gain]] | $\mathbb E[\mathrm{Regret}(T)]\le\sqrt{\overline\Gamma H(x^*)T}$; UCB bounds translate directly to TS |
| Linear/GLM reward models; correlated edges; news recommendation; assortment | [[Contextual and Linear Bandits]] | concept/example | [[Bernoulli Bandit and Thompson Sampling Algorithm]] | Coherent (correlation-aware) TS strictly dominates misspecified (independence-assuming) TS |
| Laplace/Langevin/bootstrap/ensemble approximate sampling; nonstationarity; PSRL/deep exploration | [[Approximate Thompson Sampling and Practical Extensions]] | concept/example | [[Contextual and Linear Bandits]] | Sample-once-per-episode (not per-timestep) is required for deep exploration in RL |

## Notes

- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — CONTAINS: the MAB problem definition; greedy's failure mode and dithering; TS's probability-matching definition; why TS works / where it fails at a glance; positioning vs. BED, Bayesian optimization, and dynamic treatment regimes.
- [[Bernoulli Bandit and Thompson Sampling Algorithm]] — CONTAINS: the Beta-Bernoulli model and conjugate update; Algorithms 3.1-3.2 (BernGreedy, BernTS); Algorithms 4.1-4.2 (general Greedy, Thompson); the three-armed worked example; the independent-travel-times shortest-path example.
- [[UCB and Greedy Algorithms for Bandits]] — CONTAINS: greedy/$\epsilon$-greedy definitions; the generic UCB algorithm and pessimism/width regret decomposition; UCB1; CascadeUCB vs. CascadeTS (Algorithms 7.1-7.2) and the hyper-rectangular-vs-ellipsoidal confidence-set diagnosis; the Gittins index theorem and its scaling limits.
- [[Regret Bounds for Thompson Sampling]] — CONTAINS: cumulative/Bayesian regret definitions; the Lai-Robbins asymptotic bound (Eq. 8.1) and instance-independent $O(\sqrt{KT\log T})$ bound; the UCB→TS translation and eluder-dimension bound (Eqs. 8.5-8.6); the information ratio and information-theoretic bound (Eqs. 8.7-8.8); why randomization is necessary; the four documented TS failure modes and information-directed sampling.
- [[Contextual and Linear Bandits]] — CONTAINS: correlated log-Gaussian edge travel times (Example 4.2) and coherent-vs-misspecified TS; contextual bandits via action-space augmentation (§6.2); logistic news-article recommendation (§7.1); matrix-parameterized product assortment optimization (§7.2).
- [[Approximate Thompson Sampling and Practical Extensions]] — CONTAINS: Gibbs sampling, Laplace approximation, Langevin Monte Carlo, and bootstrap approximate posterior sampling; incremental (fixed-compute) variants and ensemble sampling; prior specification, constraints/caution, nonstationary TS, and concurrent TS; posterior sampling for reinforcement learning (PSRL) and deep exploration.

## Sources
- Russo et al 2018 - A Tutorial on Thompson Sampling — Russo, D.J., Van Roy, B., Kazerouni, A., Osband, I., Wen, Z. (2018), *A Tutorial on Thompson Sampling*, **Foundations and Trends in Machine Learning** 11(1):1-96. arXiv:1707.02038.

## See Also
- [[../Bayesian Experimental Design - Overview|Bayesian Experimental Design - Overview]] — the "learn, don't earn" sibling paradigm
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — the media-measurement decision framework this ingestion fills a gap in
- [[Acquisition Functions]] — GP-UCB, the continuous-optimization analog of bandit UCB
- [[Q- and A-learning - Overview]] — dynamic treatment regimes, the sequential-decision-theory analog for non-bandit action spaces
