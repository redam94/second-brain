---
title: From Designs to Policies (Deep Adaptive Design)
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §4"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Modern BED Review"
doc_type: paper
depends_on:
  - "[[Sequential and Adaptive BED]]"
  - "[[Optimization and Gradient Schemes for BED]]"
used_by:
  - "[[Open Challenges and Future Directions]]"
aliases:
  - DAD
  - Deep Adaptive Design
  - Design policies
  - Policy-based BAD
  - iDAD
---

# From Designs to Policies (Deep Adaptive Design)

> [!summary]
> The review's signature "what's new" contribution: replace per-step design *optimization* with a pre-trained design **policy**. **Deep adaptive design (DAD)** learns a policy network $\pi_\phi$ that maps the experiment history $h_{t-1}$ directly to the next design $\xi_t=\pi_\phi(h_{t-1})$, trained *offline* by maximizing the **total EIG** over all $T$ steps. At deployment a single forward pass gives each design — no inference, no optimization, in real time — and the learned policy is **non-myopic**, fixing both flaws of traditional BAD.

## Overview

Even with a fast EIG estimator and optimizer, traditional [[Sequential and Adaptive BED|Bayesian adaptive design]] is expensive and myopic: it must (i) run Bayesian inference to update the model at *every* step, and (ii) greedily maximize only the next step's incremental EIG, ignoring downstream effects. DAD removes both by shifting all computation *offline* into training a policy, deployable near-instantly.

## Main Content

### The policy idea

> [!definition] Definition: Design policy and total EIG (Rainforth 2023 §4, Eqs. 16–17)
> A **design policy** is a network $\pi_\phi$ with $\xi_t=\pi_\phi(h_{t-1})$ mapping history $h_{t-1}=\{(\xi_k,y_k)\}_{k<t}$ to the next design via a single forward pass. It is trained to maximize the **total expected information gain** over all $T$ steps:
> $$
> \mathrm{TEIG}_\theta(\pi_\phi) := \mathbb{E}_{p(\theta)p(y_{1:T}\mid\theta,\pi_\phi)}\!\left[\log\frac{p(y_{1:T}\mid\theta,\pi_\phi)}{p(y_{1:T}\mid\pi_\phi)}\right],
> $$
> where $y_{1:T}\mid\theta,\pi_\phi$ is generated autoregressively ($\xi_t=\pi_\phi(h_{t-1})$, $y_t\sim p(y_t\mid\theta,\xi_t,h_{t-1})$). Because incremental EIGs are additive, $\mathrm{TEIG}=\sum_t$ incremental EIGs (Eq. 17), so optimizing the *total* EIG is exactly the non-myopic objective.
^def-dad-policy

### Why it works (Figure 2 of the review)

- **Offline training, live deployment.** All cost is paid once, upfront, learning $\pi_\phi$. During the experiment, design decisions are single forward passes — *real-time* adaptation, no per-step inference or optimization.
- **Amortization across realizations.** The same learned $\pi_\phi$ serves many runs of the experiment (e.g. many survey participants), amortizing the training cost.
- **Non-myopic.** Optimizing the total EIG accounts for how each design influences information gathered at *future* steps — traditional BAD's greedy per-step rule is the sub-optimal $\pi_{\text{trad}}(h_{t-1})=\arg\max_{\xi_t}\mathrm{EIG}_\theta(\xi_t\mid h_{t-1})$.
- **Justified generality.** A policy as a function of history loses no generality: for a given model, all design-relevant information is contained in the history (the posterior belief state is determined by model + history).

### Lineage

- **Huan & Marzouk (2016)** first framed adaptive design via dynamic programming / RL, learning a map from *posterior representations* (the RL "state") to designs — but still required posterior updates at each step.
- **DAD (Foster et al. 2021)** maps histories directly to designs, removing inference at deployment; trained with variational EIG bounds ([[The Computational Revolution in EIG Estimation]]) and stochastic gradients ([[Optimization and Gradient Schemes for BED]]), with a custom permutation-invariant policy architecture.
- **iDAD** generalized DAD to **implicit-likelihood** models and refined the policy architecture.
- Subsequent work uses **reinforcement learning** to learn the policy, reflecting that BAD is a Bayes-adaptive Markov decision process with the incremental EIG as reward.

### Empirical payoff

Beyond the transformative speed gains, DAD has been found to *also* improve the **quality** of designs versus traditional greedy strategies — attributed to learning non-myopic policies and avoiding errors from approximate per-step inference.

## Connections

- **Fixes both flaws** of traditional BAD identified in [[Sequential and Adaptive BED]] (per-step inference cost; greedy myopia).
- **Built on** [[Optimization and Gradient Schemes for BED]] (SGA on EIG bounds) — DAD optimizes a policy the way Foster 2020 optimizes a design.
- **Connects BED to RL:** a Bayes-adaptive MDP with EIG reward — see [[Open Challenges and Future Directions]].

## See Also
- [[Sequential and Adaptive BED]] — the traditional BAD framework DAD supersedes
- [[Optimization and Gradient Schemes for BED]] — the gradient machinery DAD trains with
- [[Open Challenges and Future Directions]] — policy-based BAD as a fledgling, high-potential area
- [[Dynamic Treatment Regimes Framework]] — a parallel sequential-policy framework in causal inference
