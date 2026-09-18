---
title: Approximate Thompson Sampling and Practical Extensions
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - topic/multi-armed-bandits
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Russo et al 2018 - A Tutorial on Thompson Sampling.pdf]]"
source_location: "Ch. 5-6, pp. 27-49; §7.4-7.5, pp. 61-69"
date_ingested: 2026-07-03
folder: "Bayesian Experimental Design/Multi-Armed Bandits and Thompson Sampling"
doc_type: paper
depends_on:
  - "[[Bernoulli Bandit and Thompson Sampling Algorithm]]"
  - "[[Contextual and Linear Bandits]]"
used_by:
  - "[[Multi-Armed Bandits and Thompson Sampling - Overview]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Laplace Approximation TS
  - Langevin Monte Carlo TS
  - Bootstrap Thompson Sampling
  - Ensemble Sampling
  - Posterior Sampling for Reinforcement Learning
  - PSRL
  - Deep Exploration
---

# Approximate Thompson Sampling and Practical Extensions

> [!summary]
> Exact conjugate posteriors (Beta-Bernoulli, Gaussian-linear) are the exception, not the rule. This note covers the tutorial's four **approximate-posterior-sampling** methods — Gibbs sampling, the Laplace approximation, Langevin Monte Carlo, and the bootstrap — used when models (e.g. binary feedback on log-Gaussian travel times, logistic recommendation models) aren't conjugate; their **incremental** (fixed per-period compute) variants and **ensemble sampling**, which scales the idea to neural-network reward models; and three "make TS practical" modeling extensions — **prior specification**, **nonstationarity**, and **concurrence** — plus TS's use for **deep exploration** in reinforcement learning (PSRL).

## Overview

Every approximate method targets the same object: a sample $\hat\theta$ whose distribution approximates the true posterior $f_{t-1}$, for use in place of an exact conjugate draw inside Algorithm 4.2 ([[Bernoulli Bandit and Thompson Sampling Algorithm]]). The motivating running example is **binary feedback on the online shortest-path problem** (Example 5.1): deterministic edge travel times $\theta_e$ (independent Gamma-distributed) with a binary "was this route good" rating $y_t\mid\theta \sim \mathrm{Bernoulli}\big(1/(1+\exp(\sum_{e\in x_t}\theta_e - M))\big)$ — a logistic link that destroys the Gaussian/Gamma conjugacy exploited elsewhere.

## Main Content

### Four approximate-sampling methods

> [!definition] Gibbs sampling
> A general MCMC method: iteratively resample each coordinate $\hat\theta_k^n \sim f_{t-1}^{n,k}(\cdot)$ — the one-dimensional conditional given the current values of all other coordinates — for $N$ sweeps, converging (under regularity) to the true joint posterior. Broadly applicable and often computationally viable because 1-D conditional sampling is easy, but can still be **too slow** for problems requiring thousands of simulations over hundreds of periods each.
^def-gibbs

> [!definition] Laplace approximation
> If the target density $g(\phi)$ is unimodal and $\ln g$ is strictly concave and sharply peaked around its mode $\bar\phi$, a second-order Taylor expansion of $\ln g$ gives a Gaussian approximation $\tilde g(\phi)\propto e^{-\frac12(\phi-\bar\phi)^\top C(\phi-\bar\phi)}$ with $C=-\nabla^2\ln g(\bar\phi)$ — i.e. mean $\bar\phi$, covariance $C^{-1}$. Effective when the log-posterior is smooth, concave, and its mode/Hessian are cheap to compute (Chapelle & Li 2011 first used this for TS in display-ad CTR logistic regression). **Not invariant to reparameterization** — e.g. approximating the log-Gaussian edge-time posterior directly in $\phi=\ln\theta$ makes the Laplace approximation *exact*, whereas approximating in $\theta$ itself would not be — so a good variable substitution can materially improve accuracy.
^def-laplace

> [!definition] Langevin Monte Carlo (LMC)
> Simulates the Langevin diffusion $d\phi_t = \nabla\ln g(\phi_t)\,dt + \sqrt2\,dB_t$ (unique stationary distribution $g$) via the Euler discretization $\phi_{n+1}=\phi_n+\epsilon\nabla\ln g(\phi_n)+\sqrt{2\epsilon}\,W_n$. In practice: **stochastic-gradient** LMC (minibatches, following Welling & Teh 2011) for efficiency, and a **preconditioning matrix** $A$ (e.g. the negative inverse Hessian at the mode) in $\phi_{n+1}=\phi_n+\epsilon A\nabla\ln g(\phi_n)+\sqrt{2\epsilon}A^{1/2}W_n$ to fix slow mixing when the log-posterior is ill-conditioned. In the tutorial's binary-feedback shortest-path experiment, LMC **outperforms** both Laplace and bootstrap (Fig. 5.1) — evidence that the true posterior isn't close enough to Gaussian for Laplace to be competitive there.
^def-langevin

> [!definition] Bootstrap approximate sampling
> Draw a hypothetical history $\hat{\mathbb H}_{t-1}$ by resampling $t-1$ action–observation pairs **with replacement** from the real history, draw a prior sample $\theta^0\sim f_0$, and solve $\hat\theta=\arg\max_\theta e^{-(\theta-\theta^0)^\top\Sigma(\theta-\theta^0)}\hat L_{t-1}(\theta)$ (the randomized-history likelihood, regularized toward $\theta^0$ by the prior's covariance $\Sigma$). Early on, randomness is dominated by the prior draw $\theta^0$ (encouraging exploration with little data); late, it's dominated by the bootstrap resampling of history. **Nonparametric** — works regardless of the posterior's functional form — but has essentially **no theoretical performance guarantee**, unlike Laplace/Langevin.
^def-bootstrap

**Sanity check (§5.5):** applying all three approximations to the Beta-Bernoulli bandit and the correlated-edge shortest-path problem — where **exact** TS is tractable — shows all three track exact TS's regret closely, with Laplace typically the weakest and bootstrap/Langevin competitive with exact sampling (Figs. 5.2a-b).

### Incremental implementation and ensemble sampling

Naively, each of the above methods' per-period compute **grows with $t$** because it must revisit the full history. **Incremental Laplace** fixes this with an online-Newton update of the posterior mode $\bar\theta_t = \bar\theta_{t-1} - H_t^{-1}\nabla g_t(\bar\theta_{t-1})$ and Hessian accumulator $H_t=H_{t-1}+\nabla^2 g_t(\bar\theta_{t-1})$ (closely related to an extended Kalman filter), giving **fixed per-period compute**. An analogous incremental bootstrap maintains $N$ models $(\bar\theta_t^n, H_t^n)$, each fit to an independently Poisson(1)-reweighted "replica" of the data stream.

> [!definition] Ensemble sampling
> Maintain, incrementally update, and sample from a finite ensemble of $N$ "statistically plausible" models rather than parameterizing the posterior directly — in the spirit of particle filtering, though the interaction between the ensemble and the actions selected makes the dynamics more intricate than standard particle filtering (Lu & Van Roy 2017). At each period, pick one ensemble member uniformly and act greedily on it; each member is incrementally updated (e.g. via SGD on a randomly-perturbed-prior, randomly-reweighted-data loss) to track its share of the posterior.
^def-ensemble-sampling

> [!example] Ensemble sampling for active learning with a neural network (Lu & Van Roy 2017)
> For a two-layer network $g_\theta(x)=w_2^\top\max(0,w_1 x)$ with Gaussian priors on weights, $N$ independently-initialized-and-perturbed networks are each trained (a handful of SGD steps per period, on a loss regularized toward the network's own random prior draw and using randomly-perturbed observed rewards) to approximate a posterior sample. Ensemble TS **outperforms** both fixed and annealed $\epsilon$-greedy (Fig. 7.5) and is efficient with **surprisingly few members** (as few as ~30); too few members makes the algorithm behave more like plain greedy — good for short horizons but prone to premature, suboptimal convergence.
^ex-ensemble-nn

### Practical modeling extensions

- **Prior specification (§6.1):** the prior should encode genuine plausible-value information — e.g. building a Beta prior on click-through rate for a *new* ad from the empirical CTR distribution of *similar past* ads, rather than defaulting to uniform. A **misspecified prior** (inconsistent with the true generative process) measurably slows learning relative to a **coherent** one (Fig. 6.2), directly paralleling the coherent-vs.-misspecified-TS contrast in [[Contextual and Linear Bandits]].
- **Constraints, context, caution (§6.2):** time-varying admissible action sets $\mathcal X_t$ (e.g. road closures) and contextual side information $z_t$ are absorbed by constraining/augmenting the action space each period — the mechanism formalized in [[Contextual and Linear Bandits]]. A **caution** constraint $\mathcal X_t=\{x: \mathbb{E}[r_t\mid x_t=x]\ge \underline r\}$ enforces a minimum expected-reward floor while still allowing an initially-excluded action back in once related actions' outcomes raise its estimate.
- **Nonstationary systems (§6.3):** when $\theta_t$ drifts over time, standard TS's exploration decays to zero and it stops tracking. **Nonstationary TS** injects uncertainty at rate $\gamma\in[0,1]$ back into the Beta (or general) posterior update at each step, $(\alpha_k,\beta_k)\leftarrow((1-\gamma)\alpha_k+\gamma\overline\alpha,\dots)$, so the algorithm never fully stops exploring; it materially outperforms stationary TS once drift sets in (Fig. 6.3), though regret can no longer be driven to zero.
- **Concurrence (§6.4):** when $K$ agents act simultaneously per period (e.g. $K$ commuters on the same graph) using a shared posterior, drawing $K$ independent samples per period is a natural TS extension. Per-*action* regret decays faster with more concurrent agents (shared observations accelerate learning) but decays more slowly per *action count* than fully-sequential updating would, since concurrent actions aren't informed by each other's outcomes within the period (Fig. 6.4).

### Reinforcement learning in MDPs: PSRL and deep exploration (§7.5)

> [!definition] Posterior sampling for reinforcement learning (PSRL)
> For a finite-horizon MDP $M=(\mathcal S,\mathcal A,R^M,P^M,H,\rho)$ learned over repeated episodes, maintain a posterior over the unknown reward and transition functions $(R^M, P^M)$ (e.g. Gaussian per state-action reward, **Dirichlet** per state-action transition — the multi-dimensional generalization of the Beta prior). At the **start of each episode**, draw one sample $(\hat R,\hat P)$, solve for its optimal policy, and follow that fixed policy for the whole episode (Strens 2000).
^def-psrl

> [!theorem] Sampling frequency and deep exploration (Fig. 7.6-7.7)
> Sampling a **new policy at every timestep** within an episode (rather than once per episode) can make exploration exponentially inefficient: in an $N$-state chain MDP where only the two far ends are rewarding, per-timestep resampling is exponentially unlikely to walk all the way to either end, requiring a minimum of $2^N$ episodes before any reward is seen, whereas per-episode TS (holding one sampled policy fixed for a full episode) learns the optimal policy within a **single** episode. This "deep exploration" — seeking actions whose value lies in the information they reveal about *future*, not just immediate, reward — is essential whenever consequences are delayed, and requires the sample-once-per-episode discipline rather than fresh sampling at each decision.
^thm-deep-exploration

PSRL is the sequential/delayed-consequence generalization of everything in this note: episodic RL reduces to an online decision problem over *policies* rather than single actions, and the same posterior-sampling principle — with the crucial "sample once, commit for the episode" caveat — carries over.

## Connections

- These approximation methods make TS usable on exactly the non-conjugate models introduced in [[Contextual and Linear Bandits]] (logistic news recommendation) and this note's own binary-feedback shortest-path and neural-network examples.
- **Nonstationarity** and **caution/constraints** are the same practical concerns that motivate adaptive redesign in sequential BED — cf. [[Sequential and Adaptive BED]] for the analogous "don't stop updating" argument in the experimental-design setting.
- **PSRL/deep exploration** is the bandit-literature counterpart to the sequential-decision-theory framing in [[Q- and A-learning - Overview]] and [[Optimal Regime via Dynamic Programming]]: both must reason about the *future* value of current actions, though PSRL does so via posterior sampling over a learned MDP rather than backward-induction value functions over known dynamics.

## See Also
- [[Bernoulli Bandit and Thompson Sampling Algorithm]] — the exact-conjugate case these methods approximate around
- [[Contextual and Linear Bandits]] — the logistic/GLM models motivating Laplace and Langevin approximate sampling
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — where PSRL/deep exploration fits in the broader TS story
- [[Sequential and Adaptive BED]] — the BED-side analog of "never stop exploring" under a changing or sequential model
