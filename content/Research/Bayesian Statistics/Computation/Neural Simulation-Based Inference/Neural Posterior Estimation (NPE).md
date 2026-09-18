---
title: Neural Posterior Estimation (NPE)
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/method
  - doc/paper
source: "[[raw/Papamakarios Murray 2016 - Fast Epsilon-Free Inference of Simulation Models.pdf]]"
source_location: "Papamakarios & Murray (2016), Secs. 2.1-2.5 (pp. 2-4), Algorithms 1-2, Sec. 3 experiments (pp. 4-7); SNPE-A/B/C comparison from Papamakarios et al. (2019) Sec. 2 and Lueckmann et al. (2021) App. A.5-A.6"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[Normalizing Flows as Conditional Density Estimators]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
used_by:
  - "[[Amortized vs Sequential Inference]]"
  - "[[Neural Likelihood Estimation and Sequential Neural Likelihood]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - NPE
  - SNPE
  - Sequential Neural Posterior Estimation
  - Epsilon-Free Inference
  - Bayesian Conditional Density Estimation
  - Amortized Posterior Estimation
---

# Neural Posterior Estimation (NPE)

> [!summary]
> **NPE** trains a conditional density estimator $q_\phi(\theta \mid x)$ on simulated pairs $(\theta_n, x_n)$ by maximum likelihood, then reads off the posterior as $q_\phi(\theta\mid x_o)$. Papamakarios & Murray (2016) introduced it as **"$\epsilon$-free" inference**: unlike [[Approximate Bayesian Computation for ABMs|ABC]], which targets the inflated pseudo-posterior $p(\theta \mid \lVert x - x_o\rVert < \epsilon)$, NPE "learns a parametric approximation to the exact posterior, which can be made as accurate as required." Their Proposition 1 shows that simulating from a **proposal prior** $\tilde p(\theta)$ instead of the prior yields the posterior reweighted by $\tilde p/p$, which is both the engine of the sequential variant (SNPE) and the source of all its difficulties.

## Overview

ABC has three drawbacks that motivate NPE (Sec. 1): it returns only (possibly weighted, correlated) samples; those samples come from a broadened $\epsilon$-approximation rather than the Bayesian posterior; and "as the $\epsilon$-tolerance is reduced, it can become impractical to simulate the model enough times to match the observed data even once."

NPE instead treats the joint simulation $\theta_n \sim p(\theta)$, $x_n\sim p(x\mid\theta_n)$ as a supervised dataset. A sufficiently flexible conditional density estimator fitted to it by maximum likelihood "would learn a conditional of the joint prior model over parameters and data, which is the posterior $p(\theta\mid x)$." No distance, no tolerance, no rejection: "they use all of them for training and, unlike ABC, do not throw a proportion of them away."

Note that the paper makes "no distinction between raw data and summary statistics" and regards the summaries as part of the data-generating process (Sec. 2.1). NPE does not by itself solve the summary problem; a learned embedding network in front of $q_\phi$ does (see [[Neural SBI for Agent-Based and Economic Models]]).

## Main Content

> [!definition] Neural posterior estimator ^def-npe
> A parametric family of conditional densities $q_\phi(\theta\mid x)$ whose parameters are the output of a neural network taking $x$ as input. In Lueckmann et al. (2021, App. A.5) notation, $q_\psi(\theta)$ with $\psi = F(x,\phi)$. The training loss is the negative log probability of the simulated parameters,
>
> $$
> \mathcal L(\phi) = -\sum_{n=1}^N \log q_\phi(\theta_n\mid x_n), \qquad \theta_n\sim p(\theta),\; x_n\sim p(x\mid\theta_n).
> $$
>
> In the infinite-data, infinite-capacity limit this recovers $p(\theta\mid x)$ for **every** $x$, not only for $x_o$. That global property is [[Amortized vs Sequential Inference|amortization]].

> [!theorem] Proposition 1 (Papamakarios & Murray 2016, pp. 2-3) ^thm-proposal-prior
> Let $N$ pairs be generated independently by $\theta_n\sim\tilde p(\theta)$ and $x_n\sim p(x\mid\theta_n)$, where $\tilde p$ is an arbitrary **proposal prior**. In the limit $N\to\infty$, $\prod_n q_\phi(\theta_n\mid x_n)$ is maximized with respect to $\phi$ if and only if
>
> $$
> q_\phi(\theta\mid x) \propto \frac{\tilde p(\theta)}{p(\theta)}\; p(\theta\mid x),
> $$
>
> provided a setting of $\phi$ achieving this exists. Consequently the posterior is recovered by the importance-style correction
>
> $$
> \hat p(\theta\mid x = x_o) \propto \frac{p(\theta)}{\tilde p(\theta)}\; q_\phi(\theta\mid x_o).
> $$

The intuition given in the paper: simulate from the prior and the estimator learns the posterior; simulate from anything else and "we need to 'importance reweight' the result." The quantity the network actually learns is the **proposal posterior** $\tilde p(\theta\mid x) = p(\theta\mid x)\,\tilde p(\theta)p(x) / \big(p(\theta)\tilde p(x)\big)$ with $\tilde p(x) = \int \tilde p(\theta)p(x\mid\theta)\,d\theta$ (Lueckmann et al. 2021, App. A.6).

> [!algorithm] SNPE-A: learn a proposal, then the posterior (Algorithms 1-2) ^alg-snpe-a
> **Algorithm 1 (proposal prior).** Initialize $q_\phi$ with one Gaussian component; set $\tilde p(\theta)\leftarrow p(\theta)$. Repeat until $\tilde p$ converges:
> 1. sample $\theta_n\sim\tilde p(\theta)$ and $x_n\sim p(x\mid\theta_n)$ for $n=1..N$;
> 2. *retrain* $q_\phi$ on $\{\theta_n, x_n\}$, warm-started from the previous round;
> 3. set $\tilde p(\theta) \leftarrow \frac{p(\theta)}{\tilde p(\theta)}\,q_\phi(\theta\mid x_o)$.
>
> **Algorithm 2 (posterior).** Initialize a $K$-component $q_\phi$ (replicating the one learned component $K$ times with small perturbations), draw $N$ more pairs from the converged $\tilde p$, train, and return $\hat p(\theta\mid x_o)\propto \frac{p(\theta)}{\tilde p(\theta)}q_\phi(\theta\mid x_o)$.
>
> "In our experiments typically 4-6 iterations of 200-500 samples each were sufficient" for Algorithm 1.

**Why a fixed point works.** "If we already knew the true posterior, we could use it to construct an efficient proposal prior for learning it." With $\tilde p = p$ the network must learn the posterior for all $x$, "grossly inefficient if we are only interested in the posterior for $x = x_o$"; with $\tilde p\approx p(\theta\mid x_o)$ nearly every simulation lands near $x_o$. A side benefit reported for Lotka-Volterra: a network trained with a good proposal "needs to learn only the local relationship between $x$ and $\theta$ near $x_o$", so a *smaller* network suffices.

**Density estimator.** The original choice is a **mixture density network** (MDN), $q_\phi(\theta\mid x) = \sum_k \alpha_k\,\mathcal N(\theta\mid m_k, S_k)$ with mixing weights, means, and full covariances emitted by a feed-forward net. Paired with a Gaussian proposal and a uniform or Gaussian prior, the correction $p/\tilde p \cdot q_\phi$ is again a Gaussian mixture in closed form (App. C). To survive the tiny per-round sample sizes they use a Bayesian MDN trained with stochastic variational inference (**MDN-SVI**), which "is resistant to overfitting", needs no validation split, and needs no tuning of training time (Sec. 2.5). Modern NPE swaps the MDN for a [[Normalizing Flows as Conditional Density Estimators|conditional normalizing flow]].

### The three corrections: SNPE-A, -B, -C

All three train a network to output density parameters; "they differ in what is targeted by $q_\psi$ and which loss is used" (Lueckmann et al. 2021, App. A.6).

| Variant | Correction | Restriction / failure mode |
|---|---|---|
| **SNPE-A** (Papamakarios & Murray 2016) | train on the proposal posterior, divide by $\tilde p$ *post hoc* | needs MDN + Gaussian proposal + Gaussian/uniform prior; if $\tilde p$ is narrower than a component of $q_\phi$, "the division yields a Gaussian with negative variance" and the algorithm terminates |
| **SNPE-B** (Lueckmann et al. 2017) | importance-weighted loss $-\sum_n \frac{p(\theta_n)}{\tilde p(\theta_n)}\log q_\phi(\theta_n\mid x_n)$ | any estimator or proposal, but "the weights can have high variance, which may result in high-variance gradients and instability" |
| **SNPE-C / APT** (Greenberg et al. 2019) | reparameterize so the loss is on an estimated proposal posterior, using "atomic" proposals over sets of $M$ parameters | works with flows; memory grows with $M$ (the benchmark used $M=10$) |

The SNL paper reports these failure modes empirically: SNPE-A "failed in two out of four cases" through negative variances and "SNPE-B exhibited high variability", which motivated learning the likelihood instead ([[Neural Likelihood Estimation and Sequential Neural Likelihood]]).

### Strengths and weaknesses of targeting the posterior

- **No MCMC.** The posterior "can be evaluated and sampled directly" (Lueckmann et al., Sec. 2.1). This is what makes thousands of posterior evaluations, and therefore [[The SBC Algorithm|SBC]], affordable.
- **Parametric representation.** A density object supports operations samples do not, such as "combining posteriors from two separate analyses" (Sec. 1).
- **Prior dependence at every stage.** Changing the prior means retraining (Cranmer et al., Sec. 3.B); contrast NLE and NRE.
- **i.i.d. data are awkward.** $q_\phi(\theta\mid x_1,\dots,x_T)$ needs a fixed-size input, hence an exchangeable or recurrent embedding network; a likelihood surrogate handles i.i.d. data by simply multiplying.
- **Hard targets.** A simple likelihood can induce a multimodal, truncated posterior that is harder to fit than the likelihood itself (the SLCP task).

## Examples

**Experiments in the original paper (Sec. 3).**

- *Mixture of two Gaussians*, $p(x\mid\theta) = \tfrac12\mathcal N(x\mid\theta,1) + \tfrac12\mathcal N(x\mid\theta, 0.1^2)$, $\theta\sim\mathcal U(-10,10)$, $x_o = 0$. The prior-trained MDN used **10K simulations**; the proposal prior took **4 iterations of 200 simulations**, and the final MDN "1000 simulations on top of the previous 800". The prior-trained network learns $q(\theta\mid x)$ over the whole range of $x$; the proposal-trained one "gives accurate posterior probabilities only near the value actually observed."
- *Bayesian linear regression* (6 parameters, 10 data dimensions, analytic Gaussian posterior): measured by KL to the truth, "sequentially fitting a prior proposal was more than ten times cheaper than training with prior samples, and more accurate." ABC methods plateau and then fail as $\epsilon\to0$.
- *Lotka-Volterra* (4 rate parameters, 9 summary statistics) and *M/G/1 queue* (3 parameters, 5 percentiles): MDN posteriors are "more confident around the true parameters compared to ABC, because the MDNs learn the exact posterior rather than an inflated version of it." Note that simulation counts are *total* for the MDNs but *per effective sample* for ABC.

**Minimal training loop.**

```python
# amortized NPE with any conditional density estimator q(theta | x)
theta = prior.sample((N,))                 # theta_n ~ p(theta)
x     = torch.stack([simulate(t) for t in theta])
for epoch in range(E):
    for tb, xb in batches(theta, x):
        loss = -q.log_prob(tb, context=embed(xb)).mean()   # -log q_phi(theta | x)
        loss.backward(); opt.step(); opt.zero_grad()
samples = q.sample(10_000, context=embed(x_o))             # no MCMC
```

## Connections

- [[Neural Simulation-Based Inference - Overview]] - places NPE beside the likelihood and ratio targets.
- [[Normalizing Flows as Conditional Density Estimators]] - the estimator class that replaced the MDN.
- [[Amortized vs Sequential Inference]] - Proposition 1 is the formal statement of what is lost when proposals are adapted to $x_o$.
- [[Approximate Bayesian Computation for ABMs]] - the $\epsilon$-ball posterior NPE avoids; regression-adjustment ABC is NPE's direct ancestor ("rudimentary density estimators", Sec. 4).
- [[Synthetic Likelihood - Overview]] - the paper's own comparison: synthetic likelihood does not depend on the proposal prior, but needs "further approximate inference on top of it."
- [[Variational Posterior Estimator (Barber-Agakov)]] - the same amortized $q(\theta\mid y)$, trained by the same forward-KL objective, used to bound expected information gain.
- [[Variational Inference and Pathfinder]] - VI minimizes the *reverse* KL and needs the likelihood; NPE minimizes the *forward* KL and needs only samples. The paper cites recognition networks and the variational auto-encoder as relatives.

## See Also

- [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] - why the "log probability of the true parameters" metric used in this paper is unreliable over few observations.
- [[Simulation-Based and Amortized Inference]] - the workflow-level summary.
- [[Simulation-Based Calibration - Overview]] - the natural check for an amortized posterior.
- [[Neural SBI for Agent-Based and Economic Models]] - NPE with recurrent embedding networks on time-series ABMs.
