---
title: Multi-Armed Bandits and Thompson Sampling - Overview
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - topic/multi-armed-bandits
  - type/overview
  - doc/paper
source: "[[raw/Russo et al 2018 - A Tutorial on Thompson Sampling.pdf]]"
source_location: "Ch. 1, pp. 3-8 (Introduction); whole-tutorial scope pp. 1-91"
date_ingested: 2026-07-03
folder: "Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling"
doc_type: paper
depends_on:
  - "[[The Global Optimisation Problem]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Thompson Sampling
  - Multi-Armed Bandits
  - MAB
  - Posterior Sampling
  - Probability Matching
---

# Multi-Armed Bandits and Thompson Sampling - Overview

> [!summary]
> The **multi-armed bandit (MAB)** problem formalizes sequential decision-making under uncertainty: a set of actions ("arms") with unknown reward distributions is played repeatedly, and the agent must balance **exploiting** arms known to pay well against **exploring** arms that might pay better. **Thompson sampling (TS)** — also called *posterior sampling* or *probability matching* — is a 1933-vintage algorithm that resolves this trade-off by selecting each action with probability equal to the posterior probability that it is optimal, implemented simply by drawing one sample from the current posterior over model parameters and acting greedily on that sample. This note is the topic map for a six-note ingestion of Russo, Van Roy, Kazerouni, Osband & Wen (2018), *A Tutorial on Thompson Sampling* — the vault's answer to its previously identified "biggest gap" for the earn-while-learning paradigm (see [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]).

## Overview

Bandit problems have been studied since WWII as the canonical crystallization of the **exploration–exploitation trade-off** in sequential decision-making (cf. [[The Global Optimisation Problem]], which frames the same trade-off for continuous black-box optimization). The name comes from a gambler at a "one-armed bandit" slot machine choosing among several arms with unknown, fixed payout probabilities, trying to maximize cumulative winnings over many pulls. The internet made this practically urgent: online systems (ad placement, recommendation, pricing) can run thousands of small experiments per second, and every impression is simultaneously a trial and a payout — so exploration is not free but must be *earned back* through improved future decisions.

Thompson sampling was proposed by Thompson (1933, 1935) for two-armed clinical-trial allocation, essentially ignored for eight decades, and then rediscovered as a highly effective heuristic (Wyatt 1997; Strens 2000) before two influential empirical papers (Chapelle & Li 2011; Scott 2010) triggered an explosion of industrial and academic interest. It has since been deployed at Adobe, Amazon, Facebook, Google, LinkedIn, Microsoft, Netflix, and Twitter, across revenue management, marketing, website optimization, Monte Carlo tree search, A/B testing, internet advertising, recommendation, hyperparameter tuning, and arcade games.

## Main Content

### The problem, in one definition

> [!definition] Multi-armed bandit problem
> There are $K$ actions (arms). At each period $t=1,2,\dots$, the agent selects an action $x_t \in \{1,\dots,K\}$, and the system generates an outcome/reward drawn from a distribution associated with $x_t$ that depends on unknown parameters $\theta$, fixed over time. The agent's objective is to maximize cumulative reward (equivalently minimize [[Regret Bounds for Thompson Sampling|cumulative regret]]) over a horizon $T$, learning about $\theta$ only through experimentation.
^def-mab

The canonical instance is the **Bernoulli bandit** (Example 1.1): action $k$ produces success (reward 1) with unknown probability $\theta_k$, failure (reward 0) otherwise; see [[Bernoulli Bandit and Thompson Sampling Algorithm]]. The tutorial repeatedly stress-tests the same idea on richer information structures: an **online shortest-path** problem (edge travel times, exponentially many "arms" = paths), **news article recommendation** and **product assortment** (contextual/combinatorial actions), **cascading recommendations** (ordered lists), **active learning with neural networks**, and **reinforcement learning in MDPs** — see [[Contextual and Linear Bandits]] and [[Approximate Thompson Sampling and Practical Extensions]].

### Why not just be greedy?

A **greedy** algorithm estimates $\theta$ from history and always plays the currently-best-looking action. It can get permanently stuck on a suboptimal arm because it never revisits actions it currently believes are worse, however uncertain that belief is. **Dithering** (e.g. $\epsilon$-greedy) fixes this by forcing occasional random exploration, but wastes effort by exploring uniformly rather than where uncertainty is actually decision-relevant. TS and UCB algorithms explore *judiciously* instead — see [[UCB and Greedy Algorithms for Bandits]].

### The core idea of Thompson sampling

> [!definition] Thompson sampling (informal)
> Maintain a Bayesian posterior over $\theta$. At each period, draw one sample $\hat\theta$ from the posterior, then act as if $\hat\theta$ were the true parameter (play the action optimal under $\hat\theta$). Update the posterior on the observed outcome and repeat.
^def-ts-informal

This is **probability matching**: because $\hat\theta$ is a posterior draw, the probability that action $k$ is selected exactly equals the posterior probability that $k$ is optimal. Actions that could plausibly be optimal keep getting tried; actions that are implausible get abandoned — all without ever computing an explicit confidence bound. The full algorithm (Beta-Bernoulli special case and the general form) is in [[Bernoulli Bandit and Thompson Sampling Algorithm]].

### Why it works, and where it doesn't

TS enjoys both frequentist regret guarantees matching the Lai–Robbins lower bound for the classical Bernoulli bandit and much more general Bayesian regret bounds — via a UCB-analogy and via an **information-theoretic** analysis based on the *information ratio* — that extend to linear models, generalized linear models, and beyond. See [[Regret Bounds for Thompson Sampling]] for the formal statements. TS is not universally best, however: it under-performs on problems that need no active exploration, pure best-arm-identification ("ranking and selection"), time-sensitive learning, and problems where the *most informative* action is not the most rewarding one (revealing actions, sparse linear models, assortment diversification) — the tutorial's Section 8.2 catalogs these failure modes and points to **information-directed sampling** as a fix.

## Connections

- **Shares the exploration–exploitation framing** with [[The Global Optimisation Problem]]; the bandit **UCB** rule is literally the same construction as **GP-UCB** in [[Acquisition Functions]] — see [[UCB and Greedy Algorithms for Bandits]] for the direct comparison.
- **Generalizes the sequential-decision problem** studied via backward induction / dynamic treatment regimes in [[Q- and A-learning - Overview]] and [[Optimal Regime via Dynamic Programming]]: both frame choosing actions from accumulating history to maximize a long-run objective, though DTR methods target non-myopic policy value while bandits target cumulative regret under online exploration.
- **Contrasts with Bayesian experimental design**: BED ([[Expected Information Gain]]) maximizes information about *all* of $\theta$ with no reward earned during learning; bandits earn reward *while* learning and pay for exploration as regret. [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] works out this three-way comparison (BED vs. Bayesian optimization vs. bandits) for media-measurement use cases and explicitly names the absence of a bandit note as the vault's biggest gap — this six-note ingestion fills that gap.
- **Extends to reinforcement learning**: sampling a posterior over MDP dynamics/rewards once per episode (rather than once per timestep) yields *posterior sampling for reinforcement learning* (PSRL) and *deep exploration* — see [[Approximate Thompson Sampling and Practical Extensions]].

## See Also
- [[Bernoulli Bandit and Thompson Sampling Algorithm]] — the worked Beta-Bernoulli example and the general TS/greedy algorithm boxes
- [[UCB and Greedy Algorithms for Bandits]] — greedy, $\epsilon$-greedy, UCB1, CascadeUCB, and the link to GP-UCB
- [[Regret Bounds for Thompson Sampling]] — cumulative/Bayesian regret, asymptotic and information-theoretic bounds
- [[Contextual and Linear Bandits]] — linear/generalized-linear reward models, news recommendation, product assortment
- [[Approximate Thompson Sampling and Practical Extensions]] — Laplace/Langevin/bootstrap/ensemble approximations, nonstationarity, concurrence, RL in MDPs
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — where bandits fit relative to BED and Bayesian optimization in a media-measurement decision framework
- [[Confidence Sequences]] — anytime-valid bounds behind UCB-style methods
