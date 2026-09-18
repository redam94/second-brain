---
title: UCB and Greedy Algorithms for Bandits
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - topic/multi-armed-bandits
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Russo et al 2018 - A Tutorial on Thompson Sampling.pdf]]"
source_location: "Ch. 2, pp. 9-12; §7.3, pp. 57-61; §8.1.2, §8.3, pp. 75-77, 90-91"
date_ingested: 2026-07-03
folder: "Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling"
doc_type: paper
depends_on:
  - "[[Bernoulli Bandit and Thompson Sampling Algorithm]]"
used_by:
  - "[[Regret Bounds for Thompson Sampling]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Upper Confidence Bound
  - UCB
  - UCB1
  - epsilon-greedy
  - CascadeUCB
  - Gittins Index
  - Dithering
---

# UCB and Greedy Algorithms for Bandits

> [!summary]
> Before Thompson sampling, two other families of exploration rules dominate the bandit literature. **Greedy / $\epsilon$-greedy** algorithms pick the currently-best action and force exploration only through fixed random perturbation ("dithering"), which wastes effort on arms already known to be bad. **Upper-confidence-bound (UCB)** algorithms instead compute an *optimistic* score $U_t(x)$ for each action — a statistically plausible best case — and act on it; UCB1's canonical form and the **CascadeUCB**/**CascadeTS** ranked-list comparison in this note make the exploitative-vs-optimistic contrast concrete, and it is the same UCB idea underlying **GP-UCB** in [[Acquisition Functions]]. The **Gittins index** gives an exact optimal solution for the classical case but does not scale to structured problems.

## Overview

All three families — greedy/dithering, UCB, TS — share the same online-decision-algorithm skeleton (estimate → act → observe → update). They differ only in how the estimate/action-selection step handles uncertainty: greedy ignores it, UCB inflates estimates by a confidence term, TS samples from the posterior. UCB and TS turn out to be far more closely related than either is to greedy — Section 8.1.2 shows nearly every UCB regret bound translates directly into a TS bound (see [[Regret Bounds for Thompson Sampling]]).

## Main Content

### Greedy and dithering ($\epsilon$-greedy)

> [!definition] Greedy decision rule
> At each period, fit $\hat\theta$ from history and play $\arg\max_x \mathbb{E}_{q_{\hat\theta}}[r(y_t)\mid x_t=x]$ — i.e. act as if the current point estimate were exactly correct. This can get **permanently stuck**: if an early-tried action returns a lucky high reward, the point estimate may never again favor a truly-better untried action, because the algorithm assigns it no chance of investigation.
^def-greedy-decision

> [!definition] Dithering / $\epsilon$-greedy exploration
> With probability $1-\epsilon$, play the greedy action; otherwise, play an action selected uniformly at random. Common ("dithering") fix for greedy's failure to explore, but **wasteful**: it perturbs *uniformly*, spending exploration budget on actions that are essentially known to be bad rather than on the genuinely uncertain ones. In the three-armed example of [[Bernoulli Bandit and Thompson Sampling Algorithm]], $\epsilon$-greedy allocates equal chances to an arm known to be hopeless and an arm worth investigating — TS instead allocates $\approx 0.82/0/0.18$, matching each arm's actual posterior probability of being optimal.
^def-epsilon-greedy

Across every worked example in the tutorial (Bernoulli bandit, shortest path, news recommendation, product assortment, neural-network active learning), tuned $\epsilon$-greedy and annealed $\epsilon=m/(m+t)$-greedy are used as baselines and are consistently outperformed by TS, sometimes dramatically (e.g. Fig. 7.2, product assortment).

### Upper confidence bound (UCB)

> [!definition] Prototypical UCB algorithm
> Generate, from history $\mathbb{H}_{t-1}$, a function $U_t(x)$ that is a **statistically plausible optimistic** (upper-confidence) estimate of the expected reward of $x$ — e.g. the $(1-1/t)$-quantile of the posterior of $\mu(x,\theta)$, or the simple heuristic
> $$U_t(x) = \mathbb{E}[\mu(x,\theta)\mid \mathbb{H}_{t-1}] + \sqrt{2\ln(t)/t_x},$$
> where $t_x$ is the number of times $x$ has been played ($U_t(x)=\infty$ if $t_x=0$, forcing initial exploration of every action). Play $\bar x_t = \arg\max_x U_t(x)$.
^def-ucb-general

The per-period regret bound for UCB decomposes as
$$\mu(x^*,\theta) - \mu(\bar x_t,\theta) \le \underbrace{\mu(x^*,\theta)-U_t(x^*)}_{\text{pessimism (}\le 0\text{ w.h.p.)}} + \underbrace{U_t(\bar x_t) - \mu(\bar x_t,\theta)}_{\text{width (shrinks with plays)}},$$
i.e. regret is controlled once the pessimism term is non-positive (the true optimum's UCB isn't accidentally too low) and the width term (slack at the played action) vanishes with repeated play.

> [!example] UCB1
> The classical instance, $U_t(k)=\alpha_k/(\alpha_k+\beta_k) + c\sqrt{1.5\log(t)/(\alpha_k+\beta_k)}$ with degree-of-optimism parameter $c$; $c=1$ recovers the standard UCB1 analyzed by Auer, Cesa-Bianchi & Fischer (2002).

### CascadeUCB vs. CascadeTS: a worked comparison

Cascading bandits recommend an ordered list $x_t=(x_{t,1},\dots,x_{t,J})$ from $K$ items with unknown per-item attraction probabilities $\theta_k\in[0,1]$; the user examines items in order and stops at the first one found attractive (probability $\theta_{x_{t,j}}$) or gives up. Expected reward of a list is $h(x,\theta)=1-\prod_{j=1}^J(1-\theta_{x_j})$.

> [!definition] CascadeUCB — Algorithm 7.1
> Maintain $(\alpha_k,\beta_k)$ per item $k$. Each period, compute $\mathrm{U}_t(k) = \alpha_k/(\alpha_k+\beta_k) + c\sqrt{1.5\log(t)/(\alpha_k+\beta_k)}$ for every item, then select $x_t \in \arg\max_{x:|x|=J} h(x,\mathrm{U}_t)$ — greedily, the $J$ items with the largest itemwise UCBs. Update $(\alpha,\beta)$ for the examined prefix of the list based on clicks.
^def-cascadeucb

> [!definition] CascadeTS — Algorithm 7.2
> Identical, except each item's score is a **sample** $\hat\theta_k\sim\mathrm{Beta}(\alpha_k,\beta_k)$ rather than an upper confidence bound: select $x_t\in\arg\max_{x:|x|=J} h(x,\hat\theta)$.
^def-cascadets

**Why CascadeTS wins in practice (Fig. 7.3):** $h(x,\mathrm{U}_t)$ evaluates the list's attraction assuming *every* item **simultaneously** attains its individually optimistic bound — a Cartesian-product (hyper-rectangular) confidence set — which becomes wildly over-optimistic as $J,K$ grow, since it's statistically implausible for all items to be simultaneously under-estimated. CascadeTS's joint posterior sample doesn't have this problem: any one item's sample can deviate from its mean, but it's unlikely *every* sampled item deviates in the same direction. The deeper diagnosis (also relevant to linear/GP bandits): the *true* statistically-plausible parameter region is closer to an **ellipsoid** (by the Bayesian CLT) than a hyper-rectangle, and UCB algorithms that use per-coordinate confidence intervals pay a real statistical price for that geometric mismatch (Dani et al. 2008). A carefully re-tuned CascadeUCB ($c=0.05$, "UCB-best") narrows but does not close this gap at large $K$ (Fig. 7.3); at smaller $K,J$ a tuned CascadeUCB can even out-perform TS (Fig. 7.4) — the comparison is scale-dependent, not a blanket win for either method.

### The Gittins index and other alternatives

> [!theorem] Gittins index theorem
> For the classical bandit with $K$ *independent* arms and the objective of maximizing expected **discounted** reward, the Gittins index theorem (Gittins & Jones 1979) characterizes the *exactly* optimal strategy: play the arm with the highest Gittins index, computable via a per-arm dynamic program (Katehakis & Veinott 1987). It is exact for this canonical case but computationally onerous relative to TS/UCB, and **fails to hold** once the problem departs from the independent-arms, infinite-horizon-discounted setting that later chapters address (correlated arms, contextual/combinatorial actions) — where computing optimal actions from it becomes infeasible.
^thm-gittins

Beyond UCB/TS/Gittins, **information-directed sampling** (Russo & Van Roy 2014a, 2018a) explicitly minimizes the *information ratio* (see [[Regret Bounds for Thompson Sampling]]) to fix known TS failure modes at the cost of heavier computation, and the **knowledge gradient** (Frazier et al. 2008, 2009) — the same idea used for global optimization in [[Acquisition Functions]] — more carefully assesses the value of information and time-sensitivity than either TS or UCB.

## Connections

- **Same construction, different literatures**: the bandit UCB rule and **GP-UCB** in [[Acquisition Functions]] are the identical optimistic-score idea, one over discrete arms with a (typically Beta/Gaussian) posterior, the other over a continuous domain with a GP posterior.
- UCB regret-bound machinery (pessimism + width decomposition) is the direct ancestor of the TS regret bounds in [[Regret Bounds for Thompson Sampling]] — Russo & Van Roy (2014b) show the translation is close to mechanical.
- CascadeUCB/CascadeTS instantiate the general Thompson$(\mathcal X,p,q,r)$ algorithm of [[Bernoulli Bandit and Thompson Sampling Algorithm]] on a combinatorial (ranked-list) action space.

## See Also
- [[Bernoulli Bandit and Thompson Sampling Algorithm]] — the TS algorithm this note contrasts against
- [[Regret Bounds for Thompson Sampling]] — the pessimism/width decomposition formalized, and the UCB→TS regret-bound translation
- [[Acquisition Functions]] — GP-UCB and the exploitative/explorative acquisition spectrum in continuous optimization
- [[Contextual and Linear Bandits]] — linear-bandit UCB results (Dani et al. 2008; Abbasi-Yadkori et al. 2011) referenced by the CascadeUCB ellipsoid discussion
