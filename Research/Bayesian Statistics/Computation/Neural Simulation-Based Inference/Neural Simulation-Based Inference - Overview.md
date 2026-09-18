---
title: Neural Simulation-Based Inference - Overview
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/overview
  - doc/paper
source: "[[raw/Cranmer Brehmer Louppe 2020 - The Frontier of Simulation-Based Inference.pdf]]"
source_location: "Cranmer, Brehmer & Louppe (2020), Secs. 1-4, pp. 1-9; taxonomy follows Fig. 3 and Sec. 3.B"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Simulation-Based and Amortized Inference]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[Synthetic Likelihood - Overview]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Likelihood Estimation and Sequential Neural Likelihood]]"
  - "[[Neural Ratio Estimation]]"
  - "[[Normalizing Flows as Conditional Density Estimators]]"
  - "[[Amortized vs Sequential Inference]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - Neural SBI
  - Neural Simulation-Based Inference
  - Neural Likelihood-Free Inference
  - The Frontier of Simulation-Based Inference
---

# Neural Simulation-Based Inference - Overview

> [!summary]
> **Simulation-based inference (SBI)** is statistical inference for models that exist only as a *simulator*: a program you can run forward to draw $x \sim p(x \mid \theta)$ but whose likelihood $p(x\mid\theta) = \int p(x, z\mid\theta)\,dz$ is an intractable integral over every latent execution path. Cranmer, Brehmer & Louppe (2020) argue the term "likelihood-free" is "a bit of a misnomer" because most modern methods *estimate* the missing likelihood (or a function of it). **Neural SBI** replaces the accept/reject comparison of [[Approximate Bayesian Computation for ABMs|ABC]] and the Gaussian of [[Synthetic Likelihood - Overview|synthetic likelihood]] with a trained neural **surrogate** for one of three objects: the posterior ([[Neural Posterior Estimation (NPE)|NPE]]), the likelihood ([[Neural Likelihood Estimation and Sequential Neural Likelihood|NLE / SNL]]), or the likelihood ratio ([[Neural Ratio Estimation|NRE]]). The payoffs are sample efficiency, freedom from hand-crafted summary statistics and tolerances, and [[Amortized vs Sequential Inference|amortization]].

## Overview

The vault already covers the classical toolbox for intractable-likelihood models: [[Approximate Bayesian Computation for ABMs|ABC]], [[Synthetic Likelihood - Overview|synthetic likelihood]], and the frequentist [[Simulation-Based Estimation - Overview|simulation-based estimation]] family ([[Method of Simulated Moments|MSM/SMM]], [[Indirect Inference]], [[Efficient Method of Moments|EMM]]). The Bayesian Workflow note [[Simulation-Based and Amortized Inference]] names neural density estimators in two paragraphs. This cluster is the dedicated treatment of that modern branch.

Cranmer et al. define a simulator as a program that takes parameters $\theta$, samples latent variables $z_i \sim p_i(z_i \mid \theta, z_{<i})$, and emits data $x \sim p(x\mid\theta, z)$ (Sec. 1.A). The defining obstruction is their Eq. (2):

$$
p(x \mid \theta) = \int dz\; p(x, z \mid \theta), \qquad p(x, z\mid\theta) = p(x\mid\theta,z)\prod_i p_i(z_i\mid\theta, z_{<i}).
$$

For an agent-based model $z$ is every random draw made by every agent at every tick, so the integral is hopeless. Both Bayesian inference (the posterior of their Eq. 1) and frequentist inference (likelihood-ratio tests) are blocked at the same place.

They diagnose **three shortcomings of the traditional methods** (Sec. 1.C-2):

1. **Sample efficiency.** ABC and classical (histogram / kernel) density estimation suffer the curse of dimensionality: "in the worst case, the required number of simulations increases exponentially with the dimension of the data $x$."
2. **Quality of inference.** Reducing data to low-dimensional summaries "invariably discards some of the information in the data about $\theta$"; a large ABC tolerance $\epsilon$ or KDE bandwidth degrades it further.
3. **Amortization.** ABC for a new dataset "requires repeating most steps of the inference chain."

and **three forces** moving the frontier (Sec. 2): (A) the machine-learning revolution, above all neural density estimation with [[Normalizing Flows as Conditional Density Estimators|normalizing flows]]; (B) **active learning**, running the simulator where it is most informative; (C) **integration and augmentation**, opening the black box via probabilistic programming and automatic differentiation.

## Main Content

> [!definition] Simulation-based inference problem ^def-sbi
> Given a prior $p(\theta)$, a simulator from which one can sample $x \sim p(x\mid\theta)$ but not evaluate $p(x\mid\theta)$, and an observation $x_o$, approximate the posterior
>
> $$
> p(\theta \mid x_o) = \frac{p(x_o\mid\theta)\,p(\theta)}{\int d\theta'\, p(x_o\mid\theta')\,p(\theta')}.
> $$
>
> Such models are called **implicit** models, in contrast to **prescribed** models whose likelihood can be written down (Cranmer et al., p. 1). Black-box SBI assumes neither differentiability of the simulator nor access to its internal random numbers (Lueckmann et al. 2021, Sec. 1).

> [!definition] Surrogate (emulator) based inference ^def-surrogate
> Methods that "construct a surrogate model and use that for inference", as opposed to methods that, like ABC, "use the simulator itself during inference" (Sec. 3). Simulator output becomes *training data* for a learning stage; the trained surrogate is then queried instead of the simulator. This is what makes the expensive stage reusable, i.e. amortized.

### The three neural targets

Cranmer et al. (Sec. 3.B, Fig. 3e-g) organize the neural methods by which conditional object the network learns from simulated pairs $(\theta_n, x_n)$:

| Family | Network learns | Learning problem | Posterior samples via | Note |
|---|---|---|---|---|
| **NPE** | $q_\phi(\theta\mid x) \approx p(\theta\mid x)$ | conditional density estimation | direct sampling from $q_\phi$ | [[Neural Posterior Estimation (NPE)]] |
| **NLE** | $q_\phi(x\mid\theta) \approx p(x\mid\theta)$ | conditional density estimation | MCMC or VI on $q_\phi(x_o\mid\theta)p(\theta)$ | [[Neural Likelihood Estimation and Sequential Neural Likelihood]] |
| **NRE** | $\hat r(x,\theta) \approx p(x\mid\theta)/p(x)$ | binary / multi-class classification | MCMC on $\hat r(x_o,\theta)p(\theta)$ | [[Neural Ratio Estimation]] |

> [!theorem] Trade-offs among the three targets (Cranmer et al., Sec. 3.B, p. 7) ^thm-tradeoffs
> - **Posterior.** "Learning the posterior directly provides the main target quantity in Bayesian inference, but induces a prior dependence at every stage of the inference method."
> - **Likelihood / ratio.** These enable "frequentist inference or model comparisons, though for Bayesian inference an additional MCMC or VI step is necessary." Prior independence gives "extra flexibility to change the prior during inference."
> - **Generative vs discriminative.** Likelihood and posterior surrogates can be *sampled*; but "learning the likelihood or posterior is an unsupervised learning problem, whereas estimating the likelihood ratio through a classifier is an example of supervised learning and often a simpler task."
> - **All three** are amortized, all "require an upfront specification of the parameters of interest" with the network implicitly marginalizing over the latents $z$, and all can adopt an iteratively updated proposal (active learning).

### How the neural methods sit relative to the classical ones

- **ABC** never forms the likelihood; it is "implicitly replaced by rejection probability", which is why it "does not lend itself to frequentist inference" (Sec. 3). It needs summaries $y(x)$, a distance $\rho$, and a tolerance $\epsilon$, and is exact only as $\epsilon \to 0$.
- **Classical density-estimation likelihoods** (histograms, KDE, and the Gaussian of [[Synthetic Likelihood Construction|synthetic likelihood]]) are already amortized, which is why they powered the Higgs discovery, but they cannot go beyond a handful of summary dimensions. NLE "is structurally identical to the classical density estimation-based approach, but uses more powerful density estimation techniques."
- **Moment-matching estimators** ([[Method of Simulated Moments]], [[Indirect Inference]]) give point estimates with asymptotic standard errors and also depend on the analyst's choice of moments or auxiliary model. Neural SBI targets the full posterior and can learn its own summaries through an embedding network.

### Beyond the black box

If the simulator exposes more than samples, Cranmer et al. (Sec. 2.C) list six extractable quantities, including the **joint score** $t(x,z\mid\theta) = \nabla_\theta \log p(x,z\mid\theta)$ and the **joint likelihood ratio** $r(x,z\mid\theta,\theta') = p(x,z\mid\theta)/p(x,z\mid\theta')$. These are tractable even though their marginal counterparts are not, and they can "augment" training data to turn surrogate fitting into a much more sample-efficient supervised problem. The marginal score is itself a locally sufficient summary statistic (Sec. 3.C). Probabilistic programming with inference compilation (Fig. 3d) goes further and infers the latent trace $z$ too. The same gradient-through-an-implicit-model ideas appear in experimental design in [[Likelihood-Free ACE and Gradient Estimation]].

> [!example] Practitioner recommendations (Cranmer et al., Sec. 3.D, p. 8) ^ex-recommendations
> 1. If any of the augmented quantities (scores, joint ratios, differentiability, a probabilistic-programming interface) is available, use it.
> 2. If powerful low-dimensional summaries already exist, traditional techniques remain reasonable.
> 3. Otherwise "we recommend trying methods based on training a neural network surrogate for the likelihood or the likelihood ratio"; prefer the ratio when you do not need to sample synthetic data from the surrogate.
> 4. Active learning helps every method, but "there is a tradeoff between active learning, which tailors the efficiency to a particular observed data set, and amortization." See [[Amortized vs Sequential Inference]].

### Relevance to marketing measurement and applied work

Three situations in the vault owner's practice are SBI problems in disguise. (1) **Agent-based market simulators**: consumer-adoption or media-exposure ABMs of the kind surveyed in [[ABM in Marketing Strategy]] have no likelihood, and calibration has so far meant [[HM-ABC Calibration Framework|history matching plus ABC]] or [[Q - Using SMM to Calibrate Agent Based Models|SMM]]; NPE/NRE give a full posterior with 10-1000x fewer simulator runs (see [[Neural SBI for Agent-Based and Economic Models]]). (2) **Amortized refits**: a media mix model that is refit weekly for many brands or geos is the "many datasets, one model" regime where an amortized posterior network replaces repeated [[HMC and Stan in Practice|HMC]] runs, a complement to [[Variational Inference and Pathfinder]]. (3) **Design of geo experiments**: expected-information-gain estimators for implicit models ([[Implicit Likelihood Estimator]]) are NLE/NRE under another name. In every case the uncomfortable truth from Cranmer et al. stands: none of the diagnostics address misspecification, and an ABM that is a poor description of the market yields a confident, well-calibrated posterior about the wrong model.

## Examples

**One training set, three surrogates.** Take a toy simulator $\theta \sim \mathcal U(-3,3)$, $x = \theta^2 + 0.3\,\varepsilon$, $\varepsilon\sim\mathcal N(0,1)$, and simulate $N = 5{,}000$ pairs once. The same table $\{(\theta_n, x_n)\}$ trains:

```python
# pseudo-code in the style of the `sbi` toolbox used by Lueckmann et al. (2021)
theta = prior.sample((5000,))
x     = simulator(theta)

npe = NPE(prior).append_simulations(theta, x).train()   # flow over theta given x
nle = NLE(prior).append_simulations(theta, x).train()   # flow over x given theta
nre = NRE(prior).append_simulations(theta, x).train()   # classifier on (theta, x)

post_npe = npe.build_posterior().sample((10_000,), x=x_o)               # direct, no MCMC
post_nle = nle.build_posterior(sample_with="mcmc").sample((10_000,), x=x_o)
post_nre = nre.build_posterior(sample_with="mcmc").sample((10_000,), x=x_o)
```

For $x_o = 4$ the true posterior is bimodal at $\theta \approx \pm 2$. NPE must represent a bimodal density over $\theta$ directly, so it needs a flexible flow or mixture. NLE only has to learn a unimodal Gaussian-like $p(x\mid\theta)$ and lets MCMC discover the two modes, which is the "simple likelihood, complex posterior" argument made for SNL. Rejection ABC on the same budget keeps only the few hundred draws with $|x_n - 4| < \epsilon$ and throws the rest away, whereas the neural methods "use all of them for training" (Papamakarios & Murray 2016, Sec. 3).

## Connections

- [[Simulation-Based and Amortized Inference]] - the Bayesian Workflow summary this cluster expands; it quotes the same Cranmer et al. review.
- [[Approximate Bayesian Computation for ABMs]] - the classical baseline whose $\epsilon$, distance, and summary choices neural SBI removes.
- [[Synthetic Likelihood - Overview]] and [[Synthetic Likelihood Construction]] - the Gaussian special case of likelihood estimation that NLE generalizes.
- [[Simulation-Based Estimation - Overview]], [[Method of Simulated Moments]], [[Indirect Inference]], [[Efficient Method of Moments]] - the econometric point-estimation cousins.
- [[Neural Posterior Estimation (NPE)]], [[Neural Likelihood Estimation and Sequential Neural Likelihood]], [[Neural Ratio Estimation]] - the three method notes.
- [[Normalizing Flows as Conditional Density Estimators]] - the density-estimator machinery behind NPE and NLE.
- [[Amortized vs Sequential Inference]] - the active-learning versus amortization trade-off.
- [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] - how to tell whether any of this worked.
- [[Neural SBI for Agent-Based and Economic Models]] - the ABM application.

## See Also

- [[ABM Calibration Overview]] and [[HM-ABC Calibration Framework]] - where neural SBI slots into the ABM calibration workflow.
- [[Simulation-Based Calibration - Overview]] and [[The SBC Algorithm]] - the validation tool that amortization makes cheap.
- [[Variational Inference and Pathfinder]] - the other neural-flavoured approximation to a posterior, which needs a tractable likelihood.
- [[Variational Posterior Estimator (Barber-Agakov)]] and [[Implicit Likelihood Estimator]] - the same amortized-posterior and learned-likelihood ideas inside Bayesian experimental design.
- [[Gaussian Process Regression]] - the non-neural surrogate: Gaussian-process surrogate ABC (Meeds & Welling), cited in the SNL paper, models the synthetic-likelihood moments $(m_\theta, S_\theta)$ as functions of $\theta$ and uses GP uncertainty to decide when to simulate more.
- [[Q - Using SMM to Calibrate Agent Based Models]] - the frequentist route to the same calibration problem.
- Additional sources for this cluster: [[raw/Papamakarios Murray 2016 - Fast Epsilon-Free Inference of Simulation Models.pdf]], [[raw/Papamakarios Sterratt Murray 2019 - Sequential Neural Likelihood.pdf]], [[raw/Hermans Begy Louppe 2020 - Likelihood-free MCMC with Amortized Approximate Ratio Estimators.pdf]], [[raw/Lueckmann 2021 - Benchmarking Simulation-Based Inference.pdf]], [[raw/Papamakarios 2019 - Normalizing Flows for Probabilistic Modeling and Inference.pdf]], [[raw/Dyer 2022 - Black-Box Bayesian Inference for Economic Agent-Based Models.pdf]].
