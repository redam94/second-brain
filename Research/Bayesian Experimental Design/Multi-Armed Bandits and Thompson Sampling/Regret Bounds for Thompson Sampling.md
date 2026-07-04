---
title: Regret Bounds for Thompson Sampling
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - topic/multi-armed-bandits
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Russo et al 2018 - A Tutorial on Thompson Sampling.pdf]]"
source_location: "Ch. 8.1-8.2, pp. 71-89"
date_ingested: 2026-07-03
folder: "Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling"
doc_type: paper
depends_on:
  - "[[Bernoulli Bandit and Thompson Sampling Algorithm]]"
  - "[[UCB and Greedy Algorithms for Bandits]]"
  - "[[Expected Information Gain]]"
used_by:
  - "[[Multi-Armed Bandits and Thompson Sampling - Overview]]"
  - "[[Contextual and Linear Bandits]]"
aliases:
  - Bayesian Regret
  - Cumulative Regret
  - Information Ratio
  - Eluder Dimension
  - Lai-Robbins Bound
  - Information-Directed Sampling
---

# Regret Bounds for Thompson Sampling

> [!summary]
> **Regret** measures the cumulative reward lost to not knowing $\theta$ in advance. For the classical Bernoulli bandit, Thompson sampling is **asymptotically optimal** — it matches the Lai–Robbins lower bound $\Theta(\log T)$ with the sharpest possible constant — and also enjoys **non-asymptotic** $O(\sqrt{KT\log T})$ worst-case regret. These classical results, however, don't explain TS's success on the tutorial's *complex, structured* problems (shortest paths, linear/GLM bandits, RL). Two general-purpose techniques do: (1) translating any **UCB regret bound** into a TS bound via a pessimism/width argument, yielding bounds through the **eluder dimension**; and (2) a genuinely different **information-theoretic** analysis via the **information ratio**, yielding bounds that scale with the **entropy of the optimal action** and directly explain both TS's efficient use of rich feedback and its known failure modes.

## Overview

Regret quantifies the entire point of exploring: an algorithm with zero regret would need to know $\theta$ from the start. Two regret objectives recur: **conditional (frequentist) regret** $\mathbb{E}[\mathrm{Regret}(T)\mid\theta=\theta']$, evaluated at a fixed true parameter, and **Bayesian regret** $\mathbb{E}[\mathrm{Regret}(T)] = \mathbb{E}[\mathbb{E}[\mathrm{Regret}(T)\mid\theta]]$, integrated over the prior. No algorithm minimizes conditional regret at every $\theta'$ simultaneously; TS is designed around the Bayesian objective, which is precisely what lets it exploit informative priors — the price is that worst-case (frequentist) guarantees require extra assumptions.

## Main Content

### Definitions

> [!definition] Cumulative and Bayesian regret
> For the $K$-action bandit, per-period regret is $\mathrm{regret}_t(\theta) = \max_k \theta_k - \theta_{x_t}$ and cumulative regret over $T$ periods is
> $$\mathrm{Regret}(T) = \sum_{t=1}^T\big(\max_{1\le k\le K}\theta_k - \theta_{x_t}\big).$$
> More generally, with expected reward $\mu(x,\theta)=\mathbb{E}[r(g(x,\theta,w_t))\mid\theta]$ and optimal action $x^*\in\arg\max_x\mu(x,\theta)$,
> $$\mathbb{E}[\mathrm{Regret}(T)] = \mathbb{E}\Big[\sum_{t=1}^T\big(\mu(x^*,\theta)-\mu(x_t,\theta)\big)\Big],$$
> where the outer expectation integrates over $\theta\sim p(\theta)$, the noise $(w_t)$, and the algorithm's randomization — this is the **Bayesian regret**.
^def-regret

### Classical (Bernoulli) asymptotic optimality

> [!theorem] Lai–Robbins asymptotic bound (Eq. 8.1)
> For the Beta-Bernoulli bandit with a unique optimal action $k^*$,
> $$\lim_{T\to\infty} \frac{\mathbb{E}[\mathrm{Regret}(T)\mid\theta]}{\log(T)} = \sum_{k\neq k^*} \frac{\theta_{k^*}-\theta_k}{d_{\mathrm{KL}}(\theta_{k^*}\|\theta_k)},$$
> where $d_{\mathrm{KL}}$ is the Bernoulli KL divergence. Lai & Robbins (1985) prove **no algorithm can do asymptotically better** than this rate; TS attains it (Chapelle & Li 2011, empirically; Agrawal & Goyal 2012/2013a, Kaufmann et al. 2012, proofs), and the result extends to Gaussian and general one-parameter exponential-family rewards (Honda & Takemura 2014).
^thm-lai-robbins

This asymptotic ($T\to\infty$) result focuses on the regime where the agent is already highly confident of the best action and explores only to become more confident still — so the bound is dominated by *near-optimal* actions and can be vacuous when many near-ties exist or actions are uncountable (an issue the information-theoretic bounds below fix).

> [!theorem] Instance-independent (worst-case) regret bound (Eq. 8.3)
> With a uniform prior, TS on the $K$-action Bernoulli bandit satisfies, uniformly over $\theta'$,
> $$\max_{\theta'} \mathbb{E}[\mathrm{Regret}(T)\mid\theta=\theta'] = O(\sqrt{KT\log(T)}) \qquad \text{(Agrawal \& Goyal 2013a)}.$$
> This is nearly order-optimal: some prior over instances forces $\Omega(\sqrt{KT})$ expected regret for *any* algorithm (Bubeck & Cesa-Bianchi 2012).
^thm-worst-case-bernoulli

### Regret bounds via UCB (structured problems)

Because TS's action-selection satisfies $\mathbb{E}[U_t(x_t)] = \mathbb{E}[U_t(x^*)]$ for **any** function $U_t$ measurable w.r.t. history $\mathbb{H}_{t-1}$ (a consequence of $x_t$ being drawn from the posterior of $x^*$), the same pessimism/width decomposition used for [[UCB and Greedy Algorithms for Bandits|UCB algorithms]] applies to TS with $U_t$ chosen to be any valid upper confidence bound — **without $U_t$ ever appearing in the algorithm itself** (Russo & Van Roy 2014b). This is the crucial advantage: a UCB algorithm's regret depends on the *specific, possibly hard-to-design* $U_t$ it uses, while TS's regret bound only requires that *some* good $U_t$ exists.

> [!theorem] Linear-bandit regret bound (Eq. 8.5)
> If $\mu(x,\theta)=x^\top\theta$ for $x,\theta\in\mathbb{R}^d$ with sub-Gaussian reward noise, existing UCB analyses (Dani et al. 2008; Rusmevichientong & Tsitsiklis 2010; Abbasi-Yadkori et al. 2011) translate to
> $$\mathbb{E}[\mathrm{Regret}(T)] = O(d\sqrt{T}\log(T))$$
> for TS, for **any** prior over a compact parameter set — depending on the model's **dimension** $d$, not the number of actions (which may be infinite).
^thm-linear-regret

> [!theorem] General eluder-dimension bound (Eq. 8.6)
> Across a broad class of reward-function families $\mathcal F=\{\mu(\cdot,\theta):\theta\in\Theta\}$, both TS and well-designed UCB algorithms satisfy
> $$\mathbb{E}[\mathrm{Regret}(T)] = \tilde O\Big(\sqrt{\dim_E(\mathcal F, T^{-2})\,\log\big(N(\mathcal F,T^{-2},\|\cdot\|_\infty)\big)\,T}\Big),$$
> where $N(\cdot)$ is the covering number of $\mathcal F$ at resolution $T^{-2}$ (a supervised-learning-style complexity measure) and $\dim_E$ is the **eluder dimension** — a new complexity measure (Russo & Van Roy 2013, 2014b) capturing how effectively unobserved actions' values can be inferred from observed ones. Classical measures like VC dimension are **insufficient** for bounding online-decision regret; the eluder dimension is what plays that role here. Specialized to the linear model, $\dim_E=O(d\log T)$ and $\log N = O(d\log T)$, recovering $\tilde O(d\sqrt T)$.
^thm-eluder-bound

### Regret bounds via information theory

> [!definition] Information ratio (Eq. 8.7)
> For any model and algorithm,
> $$\Gamma_t = \frac{\big(\mathbb{E}[\mu(x^*,\theta)-\mu(x_t,\theta)]\big)^2}{I\big(x^*;(x_t,y_t)\mid \mathbb{H}_{t-1}\big)},$$
> the squared expected per-period regret divided by the [[Expected Information Gain|mutual information]] between the optimal action $x^*$ and the impending observation. It is interpreted as the **expected cost, in regret, per bit of information acquired** about $x^*$.
^def-info-ratio

> [!theorem] Information-theoretic regret bound (Eq. 8.8; Russo & Van Roy 2016)
> For any model and algorithm, with $\overline\Gamma=\max_t \Gamma_t$,
> $$\mathbb{E}[\mathrm{Regret}(T)] \le \sqrt{\overline\Gamma\, H(x^*)\, T},$$
> where $H(x^*)$ is the **Shannon entropy of the prior over the optimal action**. Proof sketch: $\mathbb{E}[\mathrm{Regret}(T)]=\sum_t\sqrt{\Gamma_t I(x^*;(x_t,y_t)\mid\mathbb H_{t-1})} \le \sqrt{\overline\Gamma T \sum_t I(x^*;(x_t,y_t)\mid \mathbb H_{t-1})} \le \sqrt{\overline\Gamma\,T\,H(x^*)}$ (Cauchy–Schwarz/Jensen, then the chain rule for mutual information: cumulative information gained about $x^*$ cannot exceed its prior entropy).
^thm-info-ratio-bound

This bound's dependence on $H(x^*)$ (rather than $\log|\mathcal X|$) is precisely what lets it stay meaningful when the number of actions is exponential (or infinite) but the *prior* over the optimum is informative or the *feedback* is rich. Concretely, on the online shortest-path problem with $d$ edges: bounded feedback (only the total path cost observed) gives $\Gamma_t \le d/2$ and $\mathbb{E}[\mathrm{Regret}(T)]\le\sqrt{dH(x^*)T/2}$; full edge-level feedback (every traversed edge's time observed) gives $\Gamma_t\le 1/2$, i.e. $\mathbb{E}[\mathrm{Regret}(T)]\le\sqrt{H(x^*)T/2}$; and partial per-edge feedback bounded by path length $m$ gives $\Gamma_t \le d/(2m)$. The bound scales with **edges**, not the (exponentially larger) number of paths, and shrinks whenever the prior already favors the true shortest path (lower $H(x^*)$) — formalizing why informative priors on edge lengths accelerate learning (cf. Example 4.1 in [[Bernoulli Bandit and Thompson Sampling Algorithm]]).

### Why TS randomizes, and when it fails

> [!example] Randomization is necessary (Example 8.1)
> A deterministic *stationary* strategy (action a fixed function of the current posterior alone) can incur **linear** regret: with two actions, one known Bernoulli$(1/2)$ and the other Bernoulli$(3/4)$ or $(1/4)$ depending on unknown $\theta\in\{1,2\}$, any deterministic stationary rule locks onto one action forever for some prior $p_0>0$, since the uninformative reward from the fixed action never updates beliefs. Sub-linear Bayesian regret **requires** either randomization (TS) or non-stationary determinism (typical UCB algorithms use a time-varying $U_t$).
^ex-need-randomize

Section 8.2 catalogs four regimes where the information ratio reveals TS leaves value on the table (see [[Multi-Armed Bandits and Thompson Sampling - Overview]] for the summary): problems needing **no active exploration** (greedy is fine, e.g. backtestable trading, contextual bandits with informative random contexts); **pure-exploration/best-arm-identification** ("ranking and selection"), where TS's tendency to exploit once confident makes it converge too slowly on refining near-ties (a *pure-exploration variant* of TS fixes this, Russo 2016); **time-sensitive learning**, where TS over-invests in eventually-negligible gains (the many-armed deterministic-bandit example: TS samples a new action nearly every period even though trying actions $1,2,3,\dots$ in a fixed order finds an $\epsilon$-optimal one in $1/\epsilon$ steps, independent of $K$); and **problems needing careful information-gain assessment** — a "revealing action" that's known to never pay off but would immediately resolve all uncertainty is *never* played by TS, and diversified/combinatorial assortments can accelerate learning by a factor of $m$ (the assortment size) over TS's one-type-at-a-time exploration. **Information-directed sampling** (Russo & Van Roy 2014a, 2018a) — which explicitly minimizes $\Gamma_t$ rather than sampling from the posterior — addresses all four at increased computational cost.

## Connections

- The information ratio's numerator/denominator structure is a direct discrete-decision analog of the [[Expected Information Gain|EIG]]'s mutual-information objective in Bayesian experimental design — both score "regret/utility per bit," but BED has no reward term to trade off against information.
- The UCB→TS translation formalizes the qualitative UCB/TS parallel drawn in [[UCB and Greedy Algorithms for Bandits]].
- The eluder-dimension and linear-bandit bounds are the regret-theoretic counterpart to the linear/GLM reward models introduced in [[Contextual and Linear Bandits]].

## See Also
- [[UCB and Greedy Algorithms for Bandits]] — the pessimism/width decomposition this note's UCB-translation bounds build on
- [[Contextual and Linear Bandits]] — the linear/GLM models these bounds are stated for
- [[Expected Information Gain]] — the mutual-information objective that the information ratio divides regret by
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — where TS sits relative to BED/BO, and the summary of its failure modes
