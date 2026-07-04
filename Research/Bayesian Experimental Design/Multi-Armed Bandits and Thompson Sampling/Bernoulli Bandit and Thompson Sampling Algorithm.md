---
title: Bernoulli Bandit and Thompson Sampling Algorithm
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - topic/multi-armed-bandits
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Russo et al 2018 - A Tutorial on Thompson Sampling.pdf]]"
source_location: "Ch. 3-4, pp. 13-26 (Algorithms 3.1-3.2, 4.1-4.2)"
date_ingested: 2026-07-03
folder: "Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling"
doc_type: paper
depends_on:
  - "[[Multi-Armed Bandits and Thompson Sampling - Overview]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Regret Bounds for Thompson Sampling]]"
  - "[[Contextual and Linear Bandits]]"
  - "[[Approximate Thompson Sampling and Practical Extensions]]"
aliases:
  - Beta-Bernoulli Bandit
  - BernTS
  - BernGreedy
  - Thompson Sampling Algorithm
  - Posterior Sampling Algorithm
---

# Bernoulli Bandit and Thompson Sampling Algorithm

> [!summary]
> The **Beta-Bernoulli bandit** is the tutorial's running example: $K$ arms, each paying 1 (success) with unknown probability $\theta_k$, learned via a conjugate **Beta** posterior over each $\theta_k$. **BernGreedy** always plays the arm with highest posterior-mean success probability; **BernTS** instead draws one sample $\hat\theta_k\sim\mathrm{Beta}(\alpha_k,\beta_k)$ per arm and plays the arm with the largest sample. This note gives the exact algorithm boxes, the Beta-Bernoulli conjugate update, and the general (non-conjugate) Thompson-sampling and greedy algorithms that later notes specialize to shortest-path, contextual, and linear-bandit problems.

## Overview

Every algorithm in the tutorial follows the same generic "online decision algorithm" loop (Fig. 2.1): fit/update a Bayesian model from history, use it to select an action, apply the action, observe an outcome, repeat. **Greedy** algorithms break this into (1) estimate $\hat\theta$ and (2) act optimally for $\hat\theta$ — with no accounting for estimation uncertainty. **Thompson sampling** changes only step (1): instead of a point estimate, it draws $\hat\theta$ from the *posterior distribution* itself, so the randomness in $\hat\theta$ correctly reflects the agent's residual uncertainty.

## Main Content

### The Beta-Bernoulli model (Example 3.1)

> [!definition] Beta-Bernoulli Bandit
> There are $K$ actions. Action $k$ produces reward $1$ with probability $\theta_k$ and reward $0$ with probability $1-\theta_k$; $\theta=(\theta_1,\dots,\theta_K)$ is fixed but unknown. Each $\theta_k$ has an independent $\mathrm{Beta}(\alpha_k,\beta_k)$ prior,
> $$p(\theta_k) = \frac{\Gamma(\alpha_k+\beta_k)}{\Gamma(\alpha_k)\Gamma(\beta_k)}\,\theta_k^{\alpha_k-1}(1-\theta_k)^{\beta_k-1}.$$
> $(\alpha_k=\beta_k=1)$ gives the uniform prior on $[0,1]$.
^def-beta-bernoulli

> [!theorem] Beta-Bernoulli conjugate update
> Beta priors are conjugate to Bernoulli likelihoods: after playing action $x_t$ and observing reward $r_t\in\{0,1\}$,
> $$(\alpha_k,\beta_k) \leftarrow \begin{cases} (\alpha_k,\beta_k) & x_t\neq k \\ (\alpha_k,\beta_k) + (r_t,\, 1-r_t) & x_t = k. \end{cases}$$
> $(\alpha_k,\beta_k)$ are **pseudo-counts**: $\alpha_k$ (resp. $\beta_k$) increments by one with each observed success (resp. failure) of arm $k$. The mean is $\alpha_k/(\alpha_k+\beta_k)$; concentration grows with $\alpha_k+\beta_k$.
^thm-beta-update

### The two algorithms, side by side (Algorithms 3.1-3.2)

> [!definition] BernGreedy$(K,\alpha,\beta)$
> For $t=1,2,\dots$:
> 1. **Estimate model:** for $k=1,\dots,K$, set $\hat\theta_k \leftarrow \alpha_k/(\alpha_k+\beta_k)$ (the posterior **mean**).
> 2. **Select and apply action:** $x_t \leftarrow \arg\max_k \hat\theta_k$; apply $x_t$, observe $r_t$.
> 3. **Update distribution:** $(\alpha_{x_t},\beta_{x_t}) \leftarrow (\alpha_{x_t}+r_t,\ \beta_{x_t}+1-r_t)$.
^def-berngreedy

> [!definition] BernTS$(K,\alpha,\beta)$
> For $t=1,2,\dots$:
> 1. **Sample model:** for $k=1,\dots,K$, draw $\hat\theta_k \sim \mathrm{Beta}(\alpha_k,\beta_k)$ (a posterior **sample**, not the mean).
> 2. **Select and apply action:** $x_t \leftarrow \arg\max_k \hat\theta_k$; apply $x_t$, observe $r_t$.
> 3. **Update distribution:** $(\alpha_{x_t},\beta_{x_t}) \leftarrow (\alpha_{x_t}+r_t,\ \beta_{x_t}+1-r_t)$.
^def-bernts

The *only* difference between the two algorithms is step 1. This is the general pattern: TS = greedy with the point estimate replaced by a posterior draw.

> [!note] A common misconception
> $\hat\theta_k$ in BernTS is **not** a sample of the binary outcome $y_t$ that would occur if arm $k$ were played. It is a sample of the *success probability* $\theta_k$ itself — a statistically plausible parameter value, not a statistically plausible observation.

### The general (non-conjugate) algorithms (Algorithms 4.1-4.2)

TS extends far beyond Beta-Bernoulli. Let the agent apply actions $x_t\in\mathcal X$ (possibly infinite), observe outcomes $y_t \sim q_\theta(\cdot\mid x_t)$, and earn reward $r_t=r(y_t)$ for known function $r$. A prior $p$ over $\theta$ is updated by Bayes' rule.

> [!definition] Greedy$(\mathcal X, p, q, r)$ — Algorithm 4.1
> For $t=1,2,\dots$:
> 1. **Estimate model:** $\hat\theta \leftarrow \mathbb{E}_p[\theta]$.
> 2. **Select and apply action:** $x_t \leftarrow \arg\max_{x\in\mathcal X} \mathbb{E}_{q_{\hat\theta}}[r(y_t)\mid x_t=x]$; apply $x_t$, observe $y_t$.
> 3. **Update distribution:** $p \leftarrow \mathbb{P}_{p,q}(\theta\in\cdot \mid x_t,y_t)$.
^def-greedy-general

> [!definition] Thompson$(\mathcal X, p, q, r)$ — Algorithm 4.2
> For $t=1,2,\dots$:
> 1. **Sample model:** $\hat\theta \sim p$.
> 2. **Select and apply action:** $x_t \leftarrow \arg\max_{x\in\mathcal X} \mathbb{E}_{q_{\hat\theta}}[r(y_t)\mid x_t=x]$; apply $x_t$, observe $y_t$.
> 3. **Update distribution:** $p \leftarrow \mathbb{P}_{p,q}(\theta\in\cdot \mid x_t,y_t)$.
^def-ts-general

with the Bayes-rule update, for finite $\theta$-support, $\mathbb{P}_{p,q}(\theta=u\mid x_t,y_t) = \dfrac{p(u)\,q_u(y_t\mid x_t)}{\sum_v p(v)\,q_v(y_t\mid x_t)}$. The Beta-Bernoulli algorithms above are the special case $\mathcal X=\{1,\dots,K\}$, $y_t=r_t$, $q_\theta(1\mid k)=\theta_k$.

## Examples

> [!example] Three-armed Bernoulli bandit (Fig. 2.2, 3.1-3.2)
> With posteriors concentrated near $0.6$, $0.4$ for arms 1-2 (1000 plays each) and a near-uniform posterior for arm 3 (3 plays, 1 success), a greedy algorithm locks onto arm 1 forever and never learns whether arm 3 (true mean $0.7$) is actually better. TS instead samples arms 1/2/3 with probabilities $\approx 0.82/0/0.18$ — exactly the posterior probability each is optimal — so it continues to probe arm 3 without wasting effort on arm 2 (posterior probability $\approx 0$ of being optimal). Over 1000 periods and $\theta=(0.9,0.8,0.7)$, TS's per-period regret vanishes while greedy's does not (Fig. 3.2).

> [!example] Independent travel times / shortest path (Example 4.1)
> Actions are paths through a graph; each edge $e$ has an independent log-Gaussian-distributed mean travel time $\theta_e$ with $\ln(\theta_e)\sim N(\mu_e,\sigma_e^2)$, updated in closed form after each traversal by a Gaussian conjugate rule analogous to the Beta update above. The action that maximizes expected reward (minimizes expected cost) is found via Dijkstra's algorithm on the sampled/estimated edge weights $\hat\theta_e$ — showing that Algorithms 4.1-4.2 apply even when $|\mathcal X|$ is exponentially large, as long as the *maximization* step is tractable. See [[Contextual and Linear Bandits]] for the linear/generalized-linear versions of this same pattern.

## Connections

- Both algorithms instantiate the generic online-decision loop of [[Multi-Armed Bandits and Thompson Sampling - Overview]]; only the model-estimation step (mean vs. sample) differs.
- The general Algorithm 4.2 is exactly what gets specialized to the **linear** and **generalized linear** reward models in [[Contextual and Linear Bandits]], and to **cascading bandits** (CascadeTS) in [[UCB and Greedy Algorithms for Bandits]].
- When exact conjugate posteriors are unavailable (e.g. binary feedback on travel times, logistic reward models), Algorithm 4.2's sampling step is approximated — see [[Approximate Thompson Sampling and Practical Extensions]].
- The resulting regret behavior of BernTS vs. BernGreedy is formalized in [[Regret Bounds for Thompson Sampling]].

## See Also
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — problem setup and why greedy fails
- [[UCB and Greedy Algorithms for Bandits]] — the optimistic (UCB) alternative to sampling
- [[Regret Bounds for Thompson Sampling]] — why probability matching controls regret
- [[Contextual and Linear Bandits]] — the general algorithm applied to linear/GLM reward models
