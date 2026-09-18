---
title: Sequential and Adaptive BED
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §2.2, §4; Foster 2019 §2 (Eq. 5); Foster 2020 §3.5"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Foundations"
doc_type: paper
depends_on:
  - "[[Expected Information Gain]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
  - "[[High-Dimensional Design Applications]]"
aliases:
  - BAD
  - Bayesian Adaptive Design
  - Sequential BED
  - Iterated experimental design
  - Adaptive design optimization
---

# Sequential and Adaptive BED

> [!summary]
> **Bayesian adaptive design (BAD)** extends BED to a sequence of $T$ experiment steps, choosing each design $\xi_t$ after seeing the history $h_{t-1}=\{(\xi_k,y_k)\}_{k<t}$. Each step maximizes the **incremental EIG** — an ordinary EIG with the prior replaced by the current posterior $p(\theta\mid h_{t-1})$. Traditional BAD iterates *design → run → infer* (Figure 1 of Rainforth 2023), which is powerful but (a) requires expensive posterior inference at every step and (b) is myopically greedy. These two flaws motivate **policy-based** adaptive design ([[From Designs to Policies (Deep Adaptive Design)]]).

## Overview

Many real experiments are sequential: a psychology trial asks a participant a series of questions; an active-learning loop queries points one at a time. Here we can use information from earlier responses to choose later designs, substantially improving efficiency — fewer iterations to reach the same certainty. The Bayesian framework handles this self-consistently: the posterior after step $t-1$ simply becomes the prior for step $t$.

## Main Content

> [!definition] Definition: Sequential model and Bayesian update (Foster 2019, Eq. 5)
> For $T$ experiments with outcomes conditionally independent given $(\theta, \xi)$,
> $$
> p(y_{1:T},\theta\mid \xi_{1:T}) = p(\theta)\prod_{t=1}^T p(y_t\mid\theta,\xi_t).
> $$
> Having run experiments $1,\dots,t-1$, design $\xi_t$ by replacing the prior with the posterior $p(\theta\mid \xi_{1:t-1}, y_{1:t-1})$ conditional on the history.
^def-seq-model

> [!definition] Definition: Incremental EIG (Rainforth 2023, Eq. 4)
> With history $h_{t-1}=\{(\xi_k,y_k)\}_{k=1}^{t-1}$ (and $h_0=\varnothing$), the incremental EIG of the next step is
> $$
> \mathrm{EIG}_\theta(\xi_t\mid h_{t-1}) := \mathbb{E}_{p(\theta\mid h_{t-1})\,p(y_t\mid\theta,\xi_t,h_{t-1})}\!\left[\log\frac{p(y_t\mid\theta,\xi_t,h_{t-1})}{p(y_t\mid\xi_t,h_{t-1})}\right].
> $$
> This is just an ordinary EIG with an *updated prior and likelihood*; traditional BAD greedily picks $\xi_t=\arg\max_{\xi_t}\mathrm{EIG}_\theta(\xi_t\mid h_{t-1})$ at each step.
^def-incremental-eig

> [!theorem] Additivity of incremental EIGs
> The incremental EIGs are additive in expectation, so the **total EIG** over all $T$ steps equals the sum of the per-step incremental EIGs (Rainforth 2023, Eq. 17):
> $$
> \mathrm{TEIG}_\theta(\pi_\phi) = \mathrm{EIG}_\theta(\pi_\phi(\varnothing)) + \sum_{t=2}^T \mathbb{E}_{p(y_{1:t-1}\mid\pi_\phi)}\!\left[\mathrm{EIG}_\theta(\pi_\phi(h_{t-1})\mid h_{t-1})\right].
> $$
> This requires updating beliefs about **all** model parameters (including nuisance $\psi$) between steps, not just the target $\theta$ — otherwise previously gathered data is ignored and additivity breaks.
^thm-teig-additive

### The two flaws of traditional BAD

1. **Inference cost.** Even with an extremely fast EIG estimator, BAD must update the model via Bayesian inference at *every* step (Figure 1: the *design → observe → infer* loop). This is only practical when computation time during the experiment is cheap — often it is not.
2. **Greedy myopia.** Choosing $\xi_t$ to maximize only the *next* step's incremental EIG ignores how that design influences information gathered at *future* steps. The truly optimal policy maximizes the total EIG, not the per-step EIG.

Both flaws are removed by learning a **design policy** $\pi_\phi(h_{t-1})\mapsto\xi_t$ upfront, deployed near-instantly during the experiment — see [[From Designs to Policies (Deep Adaptive Design)]].

### Inference compatibility (estimator caveat)

In sequential settings, replacing $p(\theta)$ with $p(\theta\mid h_{t-1})$ has estimator-specific consequences (Foster 2019 §3, Eq. 14): the **marginal** and **implicit-likelihood** estimators need only *samples* from the posterior, while the **posterior** and **VNMC** estimators also need its *density*. Foster 2019 shows the additive constant $\log p(y_{1:t-1}\mid\xi_{1:t-1})$ can be dropped, so any inference scheme — exact or approximate — is compatible. ACE in iterated design (Foster 2020 §3.5) similarly replaces $p(\theta)$ with the running posterior.

## Examples

> [!example] Adaptive psychology experiment (Foster 2019 §6.3)
> Human participants on Mechanical Turk respond to features of stylized faces under a **mixed-effects** model with per-participant nuisance variables. Using the implicit-likelihood estimator $\hat\mu_{m+\ell}$ to choose each of 36 possible stimuli online yields a lower-entropy (more certain) posterior than random design — a fully online *design → respond → re-infer → design* loop. The constant-elasticity-of-substitution (CES) economics experiment (20 sequential steps) is the other recurring adaptive benchmark across both Foster papers; see [[High-Dimensional Design Applications]].

## Connections

- **Special case of** Bayesian active learning (the designs are which datapoints to label); the BALD score is the per-step EIG of model parameters.
- **Reframed as** a Bayes-adaptive Markov decision process (RL), with the incremental EIG as reward — links BAD to Bayesian reinforcement learning (Rainforth 2023 §5.2).
- **Solved non-myopically** by [[From Designs to Policies (Deep Adaptive Design)|deep adaptive design]], which amortizes the entire policy and optimizes the *total* EIG.

## See Also
- [[Expected Information Gain]] — the per-step objective
- [[From Designs to Policies (Deep Adaptive Design)]] — amortized policies that fix BAD's two flaws
- [[High-Dimensional Design Applications]] — the CES iterated-design experiment
- [[Dynamic Treatment Regimes Framework]] — a parallel sequential-decision framework in causal inference
- [[Tool Use and the Agent Loop]] — choosing the next query/action adaptively
