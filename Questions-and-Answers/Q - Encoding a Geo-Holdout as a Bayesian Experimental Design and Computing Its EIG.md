---
title: "Q: How would a geo-holdout experiment be encoded as a design ξ and its EIG computed against an MMM posterior?"
tags:
  - type/qa
  - topic/market-response
  - topic/bayesian-experimental-design
  - topic/bayesian-statistics
date_asked: 2026-07-01
answered_from:
  - "[[Expected Information Gain]]"
  - "[[Nested Estimation and Nested Monte Carlo]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[Information-Theoretic Design Objectives]]"
  - "[[Optimization and Gradient Schemes for BED]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Bayesian Structural Time-Series Model]]"
related_questions:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
aliases:
  - Encoding a geo-holdout as a BED design
  - Computing EIG of a geo experiment against an MMM
  - Geo-holdout experimental design and information gain
---

# How would a geo-holdout experiment be encoded as a design ξ and its EIG computed against an MMM posterior?

> [!summary]
> Encode the geo-holdout as a **design vector** $\xi$ = which geos get their spend perturbed, on which channel(s), by how much, and over which weeks. The **latent** $\theta$ is the set of media-mix-model (MMM) parameters you care about (channel coefficients, saturation/carryover, and especially cross-channel **interaction** terms). The MMM *is* the likelihood $p(y\mid\theta,\xi)$: it predicts geo-week sales under the perturbed spend. The **expected information gain** $\mathrm{EIG}(\xi)=\mathbb E_{p(y\mid\xi)}[\mathrm H[p(\theta)]-\mathrm H[p(\theta\mid y,\xi)]]$ is then computed by **nested Monte Carlo** over the current MMM posterior (outer draws of $\theta$ and simulated sales $y$, inner marginalization), and the geo-test you actually run is $\xi^\*=\arg\max_\xi\mathrm{EIG}(\xi)$ — solved by stochastic-gradient ascent on a differentiable EIG bound rather than grid search.

## Answer

### 1. The three ingredients BED needs

Bayesian experimental design ([[Bayesian Experimental Design - Overview]]) requires a prior, a design space, and a likelihood linking designs to observations ([[Expected Information Gain]]). For a geo-holdout on top of a media-mix model:

- **Prior $p(\theta)$** — the *current posterior* of your fitted MMM ([[Bayesian Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]]). $\theta$ collects the channel coefficients $\beta_m$, saturation/[[Shape (Saturation) Effects|shape]] parameters, [[Carryover (Adstock) Functional Forms|adstock]] retention rates $\alpha_m$, and the **interaction coefficients** you most want to resolve.
- **Design $\xi$** — the controllable knobs of the experiment (below).
- **Likelihood $p(y\mid\theta,\xi)$** — the MMM's predictive distribution for geo-week sales when spend is set by $\xi$. The MMM already supplies this; a geo-holdout is just a counterfactual spend pattern fed through it.

### 2. Encoding the geo-holdout as a design vector ξ

A geo-holdout partitions markets into treatment/control and imposes a spend change. Encode it as:

$$\xi = \big(\underbrace{a_g\in\{0,1\}}_{\text{geo }g\text{ assignment}},\ \underbrace{m}_{\text{channel(s) perturbed}},\ \underbrace{\Delta_g}_{\text{spend multiplier}},\ \underbrace{[t_0,t_1]}_{\text{treatment window}}\big).$$

- **Assignment $a_g$** — which of the $G$ geos are held out (or scaled up). This is the combinatorial core of the design.
- **Channel(s) $m$** — a single channel isolates its main effect; perturbing *two channels jointly* is what identifies their **interaction** — the whole point when interactions are the target.
- **Magnitude $\Delta_g$** — e.g. cut paid-search spend to $0$ (pure holdout) or to $0.5\times$; larger perturbations move sales more and usually carry more information, traded against lost revenue.
- **Window $[t_0,t_1]$** — start/duration; must be long enough to let [[Carryover (Adstock) Functional Forms|carryover]] play out (see [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]).

The **observation** $y$ is the vector of realized geo-week sales over the test and post-test periods.

### 3. Pointing information at the interactions

The EIG measures information about *all* of $\theta$, but you usually care about a decision-relevant subset. Restrict the target to the parameters of interest $\psi\subset\theta$ (e.g. the TV×search interaction and its implied [[ROAS, mROAS, and Optimal Media Mix|mROAS]]) and use the **marginal / targeted EIG**:

$$\mathrm{EIG}_\psi(\xi)=\mathbb E_{p(\psi,y\mid\xi)}\!\left[\log\frac{p(\psi\mid y,\xi)}{p(\psi)}\right],$$

nuisance parameters marginalized. This makes the design "spend" its information budget on the interaction terms the observational MMM cannot identify, rather than on already-known main effects — the resolution to the cell-explosion framing of [[Q - Continuous Learning in Media Measurement with Interaction Effects]].

### 4. Computing the EIG against the MMM posterior

> [!definition] EIG as a nested expectation ([[Expected Information Gain]], [[Nested Estimation and Nested Monte Carlo]])
> $$\mathrm{EIG}(\xi)=\mathbb E_{p(\theta)p(y\mid\theta,\xi)}\!\left[\log p(y\mid\theta,\xi)-\log p(y\mid\xi)\right],\qquad p(y\mid\xi)=\mathbb E_{p(\theta)}[p(y\mid\theta,\xi)].$$
> The inner marginal $p(y\mid\xi)$ is itself an intractable integral, so the EIG is **doubly intractable**.

Concrete recipe:

1. Draw $\theta_n\sim p(\theta)$ — i.e. take $N$ posterior samples from your fitted MMM (you already have these from MCMC/HMC, [[Bayesian Estimation and Priors for MMM]]).
2. For each, simulate geo-week sales $y_n\sim p(y\mid\theta_n,\xi)$ by pushing the $\xi$-perturbed spend through the MMM's adstock→saturation→regression pipeline plus noise.
3. Estimate the inner marginal with $M$ nested samples and form the **nested Monte Carlo (NMC)** estimator. It is biased at finite $M$, costs $C=NM$, and converges at only $\mathcal O(C^{-1/3})$ ([[Nested Estimation and Nested Monte Carlo]]).

Because NMC is slow, prefer the modern **amortized/variational** estimators — a variational posterior or contrastive bound gives an $\mathcal O(T^{-1/2})$, differentiable estimate ([[Variational BOED - Overview]], [[Adaptive Contrastive Estimation (ACE)]]).

### 5. Optimizing over designs

> [!tip] Don't grid-search geos
> With $G$ geos the assignment space is $2^G$ — the same "more cells than techniques support" wall. [[Optimization and Gradient Schemes for BED]] replaces black-box search over designs with **stochastic-gradient ascent on a differentiable EIG bound**, and [[High-Dimensional Design Applications]] shows this scaling to 100–400-dimensional design spaces. For continuous knobs ($\Delta_g$, window) gradients are direct; for the binary assignment $a_g$ use a relaxation (e.g. Gumbel-softmax) or optimize a per-geo inclusion probability.

The chosen experiment is $\xi^\*=\arg\max_\xi \mathrm{EIG}_\psi(\xi)$. In a **continuous-learning loop**, re-solve each cycle from the updated posterior ([[Sequential and Adaptive BED]]), or amortize with a policy ([[From Designs to Policies (Deep Adaptive Design)]]).

### 6. Reading out the result

After running $\xi^\*$, the geo-holdout's causal effect is estimated by a counterfactual-prediction model — exactly the [[Bayesian Structural Time-Series Model|BSTS/CausalImpact]] machinery, which "produces the posterior predictive distribution over the counterfactual, from which causal impact is derived." Feeding that back updates the MMM posterior, shrinking the targeted interaction's uncertainty and closing the loop.

### Practical Implications

- **Design = (which geos, which channels, how much, how long).** Perturb ≥2 channels together to identify interactions.
- **The MMM is the simulator**: EIG needs nothing new — just forward-simulate sales from posterior parameter draws.
- **Use a targeted/marginal EIG** so tests resolve decision-relevant interactions, not known main effects.
- **Estimate with variational/contrastive bounds and optimize with SGA**, not NMC + grid search, to stay tractable at realistic geo counts.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Expected Information Gain]] | The objective + its four equivalent forms |
| [[Nested Estimation and Nested Monte Carlo]] | Why EIG is doubly intractable; NMC cost/rate |
| [[Optimization and Gradient Schemes for BED]] | Gradient ascent over designs vs grid search |
| [[Sequential and Adaptive BED]] | Re-optimizing from the updated posterior each cycle |
| [[Information-Theoretic Design Objectives]] | EIG vs Fisher-information (alphabetic) design |
| [[Bayesian Media Mix Modeling - Overview]] | The MMM that serves as prior + likelihood/simulator |
| [[ROAS, mROAS, and Optimal Media Mix]] | The decision metric the design targets |
| [[Bayesian Structural Time-Series Model]] | Counterfactual read-out of the geo-holdout |
| [[Variational BOED - Overview]] · [[Adaptive Contrastive Estimation (ACE)]] | Fast differentiable EIG estimators |
| [[High-Dimensional Design Applications]] | Evidence gradient BOED scales to 100–400-D designs |

## Related Concepts

- [[Lindley's Information Measure]] — the 1956 origin of information-based design
- [[Prior Contrastive Estimation (PCE)]] — contrastive EIG bound for high-D designs
- [[Counterfactual Inference]] — the estimand a geo-holdout targets
- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — the parent loop this experiment step slots into
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — how carryover constrains the window $[t_0,t_1]$

## Gaps

- **No vault note on geo-experiment methodology specifically** (matched-market design, GeoLift, time-based regression). The encoding above is constructed from general BED + MMM notes; consider ingesting Google's `GeoLift` / geo-based measurement literature.
- **Relaxations for binary design variables** (Gumbel-softmax over geo assignment) are not covered in the BOED notes, which assume continuous designs.

## Follow-Up Questions

- How large must a geo-holdout be (number of geos × magnitude) to make a target interaction's posterior contract by a set amount?
- Can spillover between neighboring geos be encoded in the likelihood so the design avoids contaminated market pairs?
- How does the optimal design change as the MMM posterior tightens over successive cycles?
