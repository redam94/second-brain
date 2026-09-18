---
title: Contextual and Linear Bandits
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - topic/multi-armed-bandits
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Russo et al 2018 - A Tutorial on Thompson Sampling.pdf]]"
source_location: "§4 pp. 19-26 (Examples 4.1-4.2); §6.2 p. 44; §7.1-7.2 pp. 51-57 (news recommendation, product assortment)"
date_ingested: 2026-07-03
folder: "Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling"
doc_type: paper
depends_on:
  - "[[Bernoulli Bandit and Thompson Sampling Algorithm]]"
used_by:
  - "[[Regret Bounds for Thompson Sampling]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Contextual Bandit
  - Linear Bandit
  - Generalized Linear Bandit
  - News Article Recommendation
  - Product Assortment
---

# Contextual and Linear Bandits

> [!summary]
> The general Thompson-sampling algorithm (Algorithm 4.2, [[Bernoulli Bandit and Thompson Sampling Algorithm]]) extends far past independent Bernoulli arms: rewards can be **linear** or **logistic (generalized linear)** functions of a parameter vector, actions can carry **side information/context** observed before each decision, and the parameter space can be a **matrix** (product assortment) rather than a vector. This note collects the tutorial's three running non-trivial-structure examples — correlated shortest-path edges, contextual news-article recommendation, and assortment optimization — plus the general recipe for turning "time-varying constraints" and "side information" into a straightforward extension of TS.

## Overview

The unifying move in all these extensions is the same: TS never needed $\mathcal X$ to be small or $\theta$ to be low-dimensional — it only needs (a) a posterior over $\theta$ that can be sampled or approximated, and (b) an ability to solve $\arg\max_x \mathbb{E}_{q_{\hat\theta}}[r(y_t)\mid x_t=x]$ for a *given* sampled $\hat\theta$. Linear/GLM structure buys efficient conjugate (or near-conjugate) posterior updates; context and constraints are absorbed by simply augmenting the action space per period.

## Main Content

### Correlated linear-Gaussian rewards (Example 4.2)

Extending the independent log-Gaussian edge-time model (Example 4.1, [[Bernoulli Bandit and Thompson Sampling Algorithm]]), suppose travel times share common shocks: $y_{t,e} = \zeta_{t,e}\,\eta_t\,\nu_{t,\ell(e)}\,\theta_e$, where $\eta_t$ is a day-wide factor and $\nu_{t,0},\nu_{t,1}$ are factors shared within each half of the graph. Taking logs, $\phi_e=\ln(\theta_e)$ is jointly **Gaussian** with mean $\mu$ and covariance $\Sigma\in\mathbb{R}^{N\times N}$, updated in closed form via
$$
(\mu,\Sigma) \leftarrow \Big((\Sigma^{-1}+\tilde C)^{-1}(\Sigma^{-1}\mu+\tilde C z_t),\ (\Sigma^{-1}+\tilde C)^{-1}\Big)
$$
for an edge-wise "information" contribution $\tilde C$ built from the observed edges' precision. TS samples $\hat\phi\sim N(\mu,\Sigma)$, exponentiates to get $\hat\theta_e=e^{\hat\phi_e}$, and solves the deterministic shortest-path problem as before.

> [!example] Coherent vs. misspecified TS (Fig. 4.3)
> "**Coherent** TS" models the true edge-correlation structure above; "**misspecified** TS" pretends edges are independent (as in Example 4.1) despite the correlated data-generating process. Coherent TS substantially outperforms misspecified TS in both regret and cumulative-travel-time-vs.-optimal — a direct demonstration that correctly modeling *dependencies among actions* (not just marginal per-action uncertainty) materially accelerates learning, exactly the lesson CascadeTS also relies on (see [[UCB and Greedy Algorithms for Bandits]]).
^ex-coherent-misspecified

### Contextual bandits: side information before each decision (§6.2)

> [!definition] Contextual online decision problem
> Before choosing $x_t$, the agent observes an independent random context $z_t$, and the outcome distribution becomes $p_\theta(\cdot\mid x_t, z_t)$. This is handled **without any new algorithm** by augmenting the action to $\tilde x_t=(x_t,z_t)$ and constraining its choice to $\mathcal X_t=\{(x,z_t): x\in\mathcal X\}$ — a **time-varying constraint set** — after which ordinary TS (Algorithm 4.2 of [[Bernoulli Bandit and Thompson Sampling Algorithm]]) applies unchanged to $\tilde x_1,\tilde x_2,\dots$.
^def-contextual

### News article recommendation (§7.1)

> [!example] Logit contextual bandit for personalized recommendation (Li et al. 2010; Chapelle & Li 2011)
> At each round $t$, the website observes a user feature vector $z_t\in\mathbb{R}^d$, chooses an article $x_t$ from $\{1,\dots,k\}$, and observes a binary "liked" reward. Each article $x$ has parameter $\theta_x\in\mathbb{R}^d$; conditional on $(x_t,\theta_{x_t},z_t)$, a positive review occurs with probability $g(z_t^\top\theta_{x_t})$ for logistic function $g(a)=1/(1+e^{-a})$ — a **generalized linear model** per article. Per-period regret is $\mathrm{regret}_t=\max_x g(z_t^\top\theta_x) - g(z_t^\top\theta_{x_t})$.
^ex-news-recommendation

Because the logit link breaks Gaussian conjugacy, exact posterior updates are intractable; the tutorial applies the **Laplace approximation** and **Langevin Monte Carlo** approximate-sampling schemes of [[Approximate Thompson Sampling and Practical Extensions]] and finds both substantially outperform tuned $\epsilon$-greedy (Fig. 7.1). Two generalization limitations are noted: (1) as written, $\theta_x$ must be estimated *separately per article*, with no transfer learning across articles — fixed by instead using a feature vector $z_{t,x}$ that encodes user–article interactions with a single shared $\theta$, enabling learning about one article to inform others; (2) the article set $\mathcal X$ was assumed time-invariant, whereas real news sites continually retire/add articles — still a contextual bandit, just with a time-varying $\mathcal X_t$ as in §6.2 above.

### Product assortment optimization (§7.2)

> [!example] Assortment planning with substitute/complement effects
> $n$ products, profit $p_i$ per unit of product $i$. The agent offers a subset $x\in\{0,1\}^n$; log-demand for included product $i$ is Gaussian, $\log(d_i)\mid\theta,x \sim N((\theta x)_i,\sigma^2)$, where $(\theta x)_i = \theta_{ii} + \sum_{j\neq i} x_j\theta_{ij}$ — the diagonal $\theta_{ii}$ is product $i$'s own popularity, off-diagonals $\theta_{ij}$ capture how offering $j$ shifts demand for $i$ (substitution/complementarity). Expected profit is $\sum_i p_i x_i e^{(\theta x)_i + \sigma^2/2}$.
^ex-assortment

Here $\theta$ is a **matrix**, not a vector, but the same multivariate-Gaussian-conjugacy machine applies after vectorizing $\theta$ (stacking its columns into $\bar\theta$) and forming a Kronecker-product design matrix $W = x^\top \otimes S$ from the offered assortment and a selection matrix $S$; the posterior mean/covariance update is the same generalized-least-squares-looking formula as ordinary Bayesian linear regression. TS **strictly outperforms greedy and tuned $\epsilon$-greedy** in simulation (Fig. 7.2) — greedy in particular performs poorly because it fails to actively probe substitution effects.

## Connections

- This note's three examples are all instances of the general Thompson/greedy algorithms in [[Bernoulli Bandit and Thompson Sampling Algorithm]] — the "reward model" $q_\theta$ becomes linear-Gaussian or logistic instead of Bernoulli.
- Exact conjugate updates are available for the linear-Gaussian cases (correlated edges, assortment); the logistic news-recommendation case requires the approximate-sampling machinery of [[Approximate Thompson Sampling and Practical Extensions]].
- The **linear-bandit regret bound** $O(d\sqrt T \log T)$ and the **eluder-dimension** generalization in [[Regret Bounds for Thompson Sampling]] are stated precisely for the reward models introduced here.
- **Sparse linear models** and **assortment diversification** reappear in [[Regret Bounds for Thompson Sampling]] as two of the four documented TS failure modes (TS explores one-hot/single-type actions when a more diverse or bisection-search-like strategy would learn faster) — a caution against naively deploying the algorithms in this note without checking the information-ratio diagnosis.

## See Also
- [[Bernoulli Bandit and Thompson Sampling Algorithm]] — the base algorithm these examples specialize
- [[Approximate Thompson Sampling and Practical Extensions]] — Laplace/Langevin approximations needed for the logistic news-recommendation model
- [[Regret Bounds for Thompson Sampling]] — linear/eluder-dimension regret bounds, and the assortment/sparse-model failure modes
- [[UCB and Greedy Algorithms for Bandits]] — the ellipsoidal- vs. hyper-rectangular-confidence-set argument for why modeling correlation among actions (as in coherent TS here) matters
- [[RLHF and Instruction Tuning]] — the RLHF environment is a contextual bandit
