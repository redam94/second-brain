---
title: Bandit Models with Delayed and Censored Feedback
tags:
  - source/ingested
  - topic/research-methodology
  - topic/delayed-feedback
  - topic/censoring
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Vernade Cappe Perchet 2017 - Stochastic Bandit Models for Delayed Conversions.pdf]]"
source_location: "§2-6, pp. 2-8 (arXiv:1706.09186)"
date_ingested: 2026-07-03
folder: "Research Methodology/Experimental Design/Delayed and Censored Feedback"
doc_type: paper
depends_on:
  - "[[Survival Analysis]]"
  - "[[Delayed Feedback Model for Conversion Prediction]]"
used_by:
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
aliases:
  - Delayed Bandits
  - Censored Bandits
  - DelayedUCB
  - DelayedKLUCB
  - Stochastic Bandit Models for Delayed Conversions
---

# Bandit Models with Delayed and Censored Feedback

> [!summary]
> Vernade, Cappé & Perchet (2017) embed Chapelle's conversion/delay structure into a **stochastic multi-armed bandit**: pulling arm $k$ triggers a Bernoulli "will it convert" indicator $C_t$ and a stochastic delay $D_t$ (known CDF $\tau$), and the reward actually credited at each round is the running sum of conversions that have arrived by then. In the realistic **censored** variant, feedback more than $m$ steps old is permanently unobservable. Assuming the delay distribution is known, they prove **problem-dependent regret lower bounds** for both the uncensored and censored settings, and give matching (up to constants) **UCB- and KL-UCB-style algorithms** — `DelayedUCB` and `DelayedKLUCB` — that use a *delay-corrected* estimator of the conversion rate and achieve near-optimal $O(\log T)$ regret.

## Overview

This paper extends the classical stochastic bandit (finite arms, i.i.d. Bernoulli rewards, minimize regret vs. the best arm) to the setting where a pulled arm's reward doesn't arrive immediately, and — in the realistic case — may **never** arrive if the delay exceeds how long the learner is willing/able to wait. The authors state explicitly that this model is *"inspired by"* Chapelle's applied conversion-modeling setup ([[Delayed Feedback Model for Conversion Prediction]]): the same conversion indicator / delay decomposition reappears here, but now the goal is not offline prediction accuracy but **online regret minimization** — deciding, round after round, which arm to pull despite an incomplete, still-arriving feedback stream.

## Main Content

### Formal bandit model with delays

> [!definition] Definition: Delayed-feedback bandit model (Vernade et al. §2.1)
> At each round $t\in\mathbb{N}^*$ the learner chooses an arm $A_t\in\{1,\dots,K\}$, which triggers two independent latent random variables:
> - $C_t\in\{0,1\}$, the **conversion indicator** — $C_t=1$ iff this action *will* convert.
> - $D_t\in\mathbb{N}$, the **delay**, i.e. the number of rounds until the conversion (if any) is revealed to the learner.
>
> The reward actually credited to the learner at round $t$ is the count of conversions that have "landed" by then:
> $$Y_t = \sum_{s=1}^t C_s\,\mathbb{1}\{D_s = t-s\}$$
> with $X_{s,t} := C_s\,\mathbb{1}\{D_s\le t-s\}$ denoting whether the action taken at $s$ has (possibly) converted by time $t$. The learner observes **all** individual contributions $(X_{s,t})_{1\le s\le t}$ triggered by past actions, not just the aggregate $Y_t$.
>
> **Stochastic assumptions**: $C_t\mid\mathcal{H}_{t-1}\sim\text{Bernoulli}(\theta_{A_t})$ and $D_t\mid\mathcal{H}_{t-1}\sim$ a distribution with **known CDF** $\tau$ (shared across arms), with $C_t,D_t$ conditionally independent given the history. $\theta_k$ is arm $k$'s unknown conversion rate — the quantity the learner must estimate and exploit.
^def-bandit-delay-model

If $C_t=1$, the learner will eventually observe $D_t$ at $t+D_t$; if $C_t=0$, the delay never resolves, so from any finite vantage point $t$ it can be **impossible to tell** whether $C_s=0$ or ($C_s=1$ but $D_s > t-s$) — exactly the ambiguity in [[Delayed Feedback Model for Conversion Prediction#The core ambiguity|Chapelle's core ambiguity]], now embedded in an online decision process.

> [!definition] Definition: $m$-thresholded (censored) observations (Vernade et al. §2.2)
> In the **censored model**, a conversion can only be observed within $m$ rounds of the action; contributions are capped to the next $m$ time steps:
> $$Y_t = \sum_{s=t-m}^{t} C_s\,\mathbb{1}\{D_s = t-s\}$$
> After $m$ rounds with no observed conversion, that pull's true outcome is **permanently unrecoverable** — this is the bandit analogue of a **hard right-censoring window**, stricter than Chapelle's setting (where the learner can in principle wait arbitrarily long) and stricter than classical [[Survival Analysis]] censoring (where a censored unit could in principle still be followed up).
^def-bandit-censored-model

### Regret decomposition

> [!theorem] Lemma 1: expected regret under delay (Vernade et al., Lemma 1)
> Let $a^*$ be an optimal arm ($\theta_{a^*}\ge\theta_k\;\forall k$), $\tau_{T-s} := \Pr(D_s \le T-s)$, and $N_k(t):=\sum_{s=1}^{t-1}\mathbb{1}\{A_s=k\}$ the pull count. The expected regret at horizon $T$ is
> $$L(T) = \mathbb{E}[r^*(T)-r(T)] = \sum_{s=1}^T \mathbb{E}\big[(\theta_{a^*}-\theta_{A_s})\,\tau_{T-s}\big]$$
> so that $L(T)\le \sum_{k=1}^K(\theta_{a^*}-\theta_k)N_k(t)$, and if the mean delay $\mu=\mathbb{E}[D_s]<\infty$,
> $$\sum_{k=1}^K(\theta_{a^*}-\theta_k)N_k(t) - L(T) \le \mu\sum_{k=1}^K(\theta_{a^*}-\theta_k).$$
> Intuitively: regret looks like the usual bandit regret $\sum_k \Delta_k N_k(t)$, but **discounted** by $\tau_{T-s}$ (the probability a pull's delay has resolved by the horizon) — and the total discrepancy this discount can cause is bounded by the mean delay $\mu$ times the total suboptimality gap. Long delays cost at most an *additive*, $\mu$-bounded amount of extra regret in the uncensored setting.
^thm-bandit-regret-decomp

### Regret lower bounds

> [!theorem] Theorem 3: lower bound, censored setting (Vernade et al., Theorem 3)
> For any *uniformly efficient* bandit algorithm (i.e. $\mathbb{E}[R(T)]/T^\alpha\to 0\;\forall\alpha\in(0,1)$, following Lai & Robbins), with $\tau_m$ the probability a conversion is revealed within the censoring window $m$:
> $$\liminf_{T\to\infty} \frac{R(T)}{\log T} \;\ge\; \sum_{k\ne k^*} \frac{\tau_m(\theta^*-\theta_k)}{d(\tau_m\theta_k,\, \tau_m\theta^*)}$$
> where $d(p,q)$ is the binary KL divergence. This says the $m$-censored delayed bandit is **exactly as hard as** an ordinary (immediate-feedback) bandit problem with *rescaled* conversion rates $(\tau_m\theta_1,\dots,\tau_m\theta_K)$ — you cannot learn faster than a naive learner that discards the last $m$ pulls and treats the problem as this rescaled, immediate-feedback bandit. Because $\tau\mapsto d(\tau p,\tau q)$ is convex, the bound is monotonically increasing in $\tau_m$, so a **smaller** censoring window $m$ (or longer expected delay $\mu$) makes the problem strictly **harder** in the worst case.
^thm-bandit-lb-censored

> [!theorem] Theorem 4: lower bound, uncensored setting (Vernade et al., Theorem 4)
> When conversions are eventually always observed (no hard window), the lower bound reduces exactly to the classical **Lai & Robbins bound**:
> $$\liminf_{T\to\infty} \frac{R(T)}{\log T} \;\ge\; \sum_{k\ne k^*} \frac{\theta^*-\theta_k}{d(\theta_k,\theta^*)}.$$
> I.e. asymptotically, arbitrarily long (but eventually-resolving) delay costs **nothing** in the leading-order regret rate — only censoring (a hard, permanent observation cutoff) changes the fundamental difficulty of the problem.
^thm-bandit-lb-uncensored

### Delay-corrected estimators and algorithms

Because censored/pending pulls contribute partial, time-decaying information, a naive empirical-mean estimator is biased low (the [[Delayed Feedback Model for Conversion Prediction|same bias Chapelle's Naive baseline exhibits]]). The fix is a **conditionally unbiased, delay-corrected estimator**:

> [!definition] Definition: Delay-corrected count and conversion-rate estimator (Vernade et al. §5.1, Eq. 5)
> $$\tilde N_k(t) := \sum_{s=1}^{t-m}\mathbb{1}\{A_s=k\}\,\tau_m \;+\!\!\sum_{s=t-m+1}^{t-1}\mathbb{1}\{A_s=k\}\,\tau_{t-s} \qquad\qquad \hat\theta_k(t) := \frac{S_k(t)}{\tilde N_k(t)}$$
> where $S_k(t)$ is the cumulative observed reward from arm $k$. Each pull of $k$ is weighted down by the probability its conversion *could* have arrived by now ($\tau_m$ for old-enough pulls, $\tau_{t-s}$ for recent ones) — analogous to Chapelle's censoring-time weighting in [[EM and Gradient Optimization for the Delayed Feedback Model#thm-em-mstep|the EM M-step]], but here computed from the *known* delay CDF rather than learned jointly.
^def-bandit-delay-corrected-estimator

> [!theorem] Optimistic indices: DelayedUCB and DelayedKLUCB (Vernade et al. §5.2–5.3, Prop. 6, Lemma 7)
> **UCB index** (Prop. 6): for any $\beta>0$, $\Pr\big(\theta_k > \hat\theta_k(t) + \sqrt{N_k(t)/\tilde N_k(t)}\sqrt{\beta/2\tilde N_k(t)}\big) < \beta e\log(t)e^{-\beta}$, giving
> $$U_k^{\text{UCB}}(t) = \hat\theta_k(t) + \sqrt{\frac{N_k(t)}{\tilde N_k(t)}}\sqrt{\frac{\beta_\epsilon(t)}{2\tilde N_k(t)}}.$$
> **KL-UCB index** (Lemma 7, via a Poissonized Chernoff bound with $d_{\text{Pois}}$, the Poisson KL divergence):
> $$U_k^{\text{KL}}(t) = \max\Big\{q\in[\hat\theta_k(t),1] : \tilde N_k(t)\,d_{\text{Pois}}(\hat\theta_k(t), q) \le \beta_\epsilon(t)\Big\}.$$
> Both indices inflate the confidence interval by the ratio $N_k(t)/\tilde N_k(t)$ — the more the observed pulls are still "pending" (large median delay), the larger $\tilde N_k(t)$ shrinks relative to $N_k(t)$, and the wider (more optimistic/exploratory) the index becomes. **Algorithm 1 (DelayedUCB / DelayedKLUCB)** plugs either index into the usual "play $\arg\max_k U_k(t)$" rule.
^thm-bandit-ucb-indices

> [!theorem] Theorem 9 & Corollary 10: finite-time regret of DelayedUCB
> In the **censored** setting, for exploration rate $\beta_\epsilon(t)=(1+\epsilon)\log t$:
> $$L_{\text{UCB}}(T) \le (1+\epsilon)\log(T)\sum_{k\ne *} \frac{1}{2\tau_m\Delta_k} + o_{\epsilon,m}(\log T).$$
> In the **uncensored** setting (Corollary 10), assuming $1-\tau_m\le c/m$ for some $c>0$:
> $$L_{\text{UCB}}(T) \le \frac{1+\epsilon}{1-\epsilon}\log(T)\sum_{k>1}\frac{1}{2\Delta_k} + o_{\epsilon,m}(\log T).$$
> Both match the corresponding lower bound's $\log T$ rate and dependence on the gaps $\Delta_k=\theta^*-\theta_k$, up to constants — DelayedUCB is **asymptotically near-optimal**.
^thm-bandit-ucb-regret

> [!theorem] Theorem 11 & Corollary 12: finite-time regret of DelayedKLUCB
> In the censored setting, for any $\eta>0$:
> $$L_{\text{KLUCB}}(T) \le (1+\eta)\frac{\beta_\epsilon(t)}{1-\theta_1}\sum_{k>1}\frac{\tau_m\Delta_k}{d(\tau_m\theta_k,\tau_m\theta_1)} + o_{\epsilon,m,\eta}(\log T),$$
> with an analogous uncensored bound (Corollary 12) using the true (unscaled) KL divergence $d((1-\epsilon)\theta_k,(1-\epsilon)\theta_1)$. Because the KL-based index adapts to the true Bernoulli variance, **DelayedKLUCB is preferable when conversion rates are low** (the regime typical of real conversion data — see [[Delayed Feedback Model for Conversion Prediction|Chapelle's data]], where a large majority of clicks never convert), providing near-optimal performance matching Theorem 3's lower bound far more tightly than DelayedUCB.
^thm-bandit-klucb-regret

## Examples

> [!example] Simulated comparison (Vernade et al. §7, Figs. 1–2)
> With geometric delays (parameter $\lambda=1/\mu$, chosen for a memoryless/efficient online update of $\tilde N_k(t)$), $T=10{,}000$, $\mu=500$, $m=1000$: both DelayedUCB and DelayedKLUCB track their respective lower bounds closely, with DelayedKLUCB substantially better at low conversion rates ($\theta^*=0.1$) as predicted by the KL-based analysis. Comparing against a naive **Discarding** baseline (plain UCB/KL-UCB run only on already-resolved pulls, ignoring pending ones) shows the delay-corrected algorithms avoid a long initial linear-regret phase that Discarding suffers while waiting for the first $m$ rounds to resolve.

## Connections

- **Formalizes and extends** the conversion/delay structure of [[Delayed Feedback Model for Conversion Prediction]] (same $C$, $D$ decomposition) into a sequential decision / regret-minimization setting, explicitly citing Chapelle (2014) as its inspiration.
- **Generalizes classical bandit regret theory**: Theorem 4's uncensored lower bound recovers the classical Lai–Robbins bound exactly; censoring (not delay per se) is what changes the asymptotic constant.
- **Extends the bandit-regret framework to delayed and censored rewards** — see [[Multi-Armed Bandits and Thompson Sampling - Overview]] for the standard (immediate-reward) UCB/Thompson-sampling regret framework that this model generalizes. (Note: that overview note is being created concurrently in `Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling/`; the link may not resolve until it lands.)
- **Relates to** [[Survival Analysis]] via its known-CDF delay/censoring mechanism, and to the EM/likelihood machinery of [[EM and Gradient Optimization for the Delayed Feedback Model]] — Vernade et al. assume the delay CDF $\tau$ is *known*, whereas Chapelle's setting *estimates* the analogous $\lambda(x)$ jointly with the conversion model; the authors note extending their bandit analysis to an estimated, context-dependent delay distribution (à la Chapelle's GLM) as future work.

## See Also
- [[Delayed and Censored Feedback - Overview]] — topic overview and how this note relates to Chapelle's
- [[Delayed Feedback Model for Conversion Prediction]] — the applied model this bandit formalism generalizes
- [[EM and Gradient Optimization for the Delayed Feedback Model]] — the analogous offline fitting problem
- [[Survival Analysis]] — the right-censoring concept underlying the $m$-thresholded censored model
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — the standard bandit-regret framework being extended
