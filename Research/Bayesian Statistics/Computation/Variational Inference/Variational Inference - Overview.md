---
title: Variational Inference - Overview
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - type/overview
  - doc/paper
source:
  - "[[raw/Blei 2017 - Variational Inference A Review for Statisticians.pdf]]"
  - "[[raw/Kucukelbir 2017 - Automatic Differentiation Variational Inference.pdf]]"
  - "[[raw/Kingma 2013 - Auto-Encoding Variational Bayes.pdf]]"
  - "[[raw/Yao 2018 - Yes but Did It Work Evaluating Variational Inference.pdf]]"
source_location: "Blei et al. 2017 Secs. 1-2, 5 (pp. 2-11, 22-26); Kucukelbir et al. 2017 Secs. 1-2; Kingma & Welling 2013 Secs. 1-2; Yao et al. 2018 Sec. 1"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[Introduction to Bayesian Computation]]"
  - "[[MCMC Basics]]"
  - "[[Approximation Methods]]"
used_by:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Mean-Field Family and Coordinate Ascent VI (CAVI)]]"
  - "[[Stochastic and Black-Box Variational Inference]]"
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
  - "[[Normalizing Flows for Variational Inference]]"
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - Variational Inference Overview
  - Variational Bayes
  - VI Cluster Overview
---

# Variational Inference - Overview

> [!summary]
> **Variational inference (VI)** approximates an intractable posterior $p(z \mid x)$ by *optimization* rather than sampling: posit a family of densities $\mathcal Q$ and find the member closest to the posterior in Kullback-Leibler divergence, $q^* = \arg\min_{q\in\mathcal Q}\mathrm{KL}(q(z)\,\|\,p(z\mid x))$ (Blei, Kucukelbir & McAuliffe 2017, Eq. 1). Because the KL involves the unknown evidence $\log p(x)$, one instead maximizes the [[The ELBO and KL Divergence Minimization|evidence lower bound (ELBO)]]. The classical recipe is the [[Mean-Field Family and Coordinate Ascent VI (CAVI)|mean-field family with coordinate ascent (CAVI)]]; the modern recipe is [[Stochastic and Black-Box Variational Inference|Monte Carlo gradients]] of the ELBO, which yields [[Automatic Differentiation Variational Inference (ADVI)|ADVI]] in Stan/PyMC and, with an amortized neural encoder, the [[Reparameterization Trick and Variational Autoencoders|variational autoencoder]]. VI is fast and scalable but comes with few guarantees and systematically distorted uncertainty, so it must be [[Diagnosing Variational Inference (PSIS k-hat and VSBC)|diagnosed]], not trusted.

## Overview

Blei et al. frame VI and MCMC as "different approaches to solving the same problem" (Sec. 1, p. 3). [[MCMC Basics|MCMC]] constructs an ergodic Markov chain whose stationary distribution is the posterior and approximates the posterior with samples; VI solves an optimization problem and approximates the posterior with the optimizer. The trade is explicit:

| | MCMC | Variational inference |
|---|---|---|
| Output | (Asymptotically exact) samples | Best member $q^*$ of a family $\mathcal Q$ |
| Guarantee | Converges to the target as chain length $\to\infty$ | "Can only find a density close to the target" (p. 3); even the global optimum is misspecified if $p(z\mid x)\notin\mathcal Q$ |
| Cost | Heavier; hard to subsample data | Lighter; inherits stochastic and distributed optimization |
| Known bias | Monte Carlo error only | "Generally underestimates the variance of the posterior density; this is a consequence of its objective function" (p. 3) |
| Suited to | Small/expensive data, a trusted model, precise inference | Large data, rapid exploration of many models |

Blei et al. add that dataset size is not the only consideration; posterior *geometry* matters too. For mixture models with label-switching multimodality, VI may outperform a general-purpose sampler like [[HMC and Stan in Practice|HMC]] even on small data, because it commits to one mode (p. 3; compare [[Monsters and Mixtures]]).

The problem has three moving parts, and each note in this cluster isolates one:

1. **The objective.** Reverse KL, its equivalence to maximizing the ELBO, and why this direction of KL is mode-seeking and variance-shrinking. See [[The ELBO and KL Divergence Minimization]].
2. **The family $\mathcal Q$.** Fully factorized [[Mean-Field Family and Coordinate Ascent VI (CAVI)|mean-field]]; mean-field or full-rank Gaussians in unconstrained space ([[Automatic Differentiation Variational Inference (ADVI)|ADVI]]); amortized conditional Gaussians $q_\phi(z\mid x)$ parameterized by a neural network ([[Reparameterization Trick and Variational Autoencoders|VAE]]); and invertible transformations of a simple base density ([[Normalizing Flows for Variational Inference|normalizing flows]]).
3. **The optimizer.** Closed-form coordinate ascent for conditionally conjugate models; natural-gradient stochastic VI for massive data; score-function ("black-box") and reparameterization gradients for arbitrary differentiable models. See [[Stochastic and Black-Box Variational Inference]].

A fourth part, added by Yao, Vehtari, Simpson & Gelman (2018), is **verification**: "While it's always possible to compute a variational approximation to a posterior distribution, it can be difficult to discover problems with this approximation" (abstract). See [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]].

## Main Content

> [!definition] The variational inference problem ^def-vi-problem
> Let $x = x_{1:n}$ be observations and $z = z_{1:m}$ latent variables (in a Bayesian model, *all* unknowns, including parameters) with joint density $p(z, x) = p(z)\,p(x\mid z)$. The posterior is $p(z\mid x) = p(z,x)/p(x)$ where the **evidence** $p(x) = \int p(z,x)\,dz$ is typically unavailable in closed form or exponential-time to compute (Blei et al., Eqs. 2-3). VI specifies a family $\mathcal Q$ of densities over $z$ and solves
>
> $$
> q^*(z) = \arg\min_{q(z)\in\mathcal Q}\ \mathrm{KL}\big(q(z)\,\|\,p(z\mid x)\big).
> $$
>
> "The complexity of the family determines the complexity of this optimization" (Sec. 2.2).

> [!example] Why the evidence is intractable: Bayesian mixture of Gaussians ^ex-gmm-evidence
> With $K$ unit-variance components, $\mu_k\sim\mathcal N(0,\sigma^2)$, $c_i\sim\text{Categorical}(1/K,\dots,1/K)$ and $x_i\mid c_i,\mu\sim\mathcal N(c_i^\top\mu, 1)$, the evidence is
>
> $$
> p(x) = \int p(\mu)\prod_{i=1}^n\sum_{c_i}p(c_i)\,p(x_i\mid c_i,\mu)\,d\mu .
> $$
>
> Each $\mu_k$ appears in all $n$ factors, so the integral does not factor; rewriting it as a sum over assignment configurations gives $K^n$ conjugate integrals (Blei et al., Eqs. 7-9). Exponential in $n$, hence approximate inference.

> [!definition] Four generations of VI ^def-generations
> 1. **Model-specific mean-field VI** (1990s-2000s): hand-derived closed-form coordinate updates for conditionally conjugate exponential-family models. [[Mean-Field Family and Coordinate Ascent VI (CAVI)|CAVI]].
> 2. **Stochastic VI** (Hoffman et al. 2013): noisy natural gradients from data subsamples; scales CAVI to millions of documents.
> 3. **Black-box / automatic VI** (Ranganath et al. 2014; Kingma & Welling 2013; Kucukelbir et al. 2017): Monte Carlo gradients of the ELBO requiring only $\log p(x,z)$ (and its gradient). [[Automatic Differentiation Variational Inference (ADVI)|ADVI]] makes VI a button in Stan.
> 4. **Amortized and flow-based VI**: a neural network outputs the variational parameters for each datum ([[Reparameterization Trick and Variational Autoencoders|VAE]]), and the family is enriched by [[Normalizing Flows for Variational Inference|normalizing flows]].

**What VI gets wrong, and why it matters to this vault.** [[SBC Case Studies]] documents ADVI "drastically underestimat[ing] the posterior for the slope $\beta$" on a simple linear regression. The mechanism is fully explained by two facts developed here: (i) the mean-field Gaussian family cannot represent posterior correlation (here between intercept and slope), and (ii) reverse KL penalizes $q$ for placing mass where $p$ has little, so the best factorized $q$ *shrinks* to fit inside the correlated posterior rather than covering it. For a Gaussian target with precision matrix $\Lambda$ the optimal mean-field variance is $1/\Lambda_{jj} \le (\Lambda^{-1})_{jj}$; see the worked example in [[Mean-Field Family and Coordinate Ascent VI (CAVI)#^ex-mf-gaussian|the mean-field note]]. Kucukelbir et al. measure exactly this: true marginal variances $0.28, 0.31$ versus mean-field ADVI $0.13, 0.14$ (their Fig. 4).

VI can also be **over-dispersed**. In the eight-schools hierarchical model, Yao et al. find centered-parameterization ADVI over-estimates $\tau$ (the posterior mode is at $\tau=0$ but "the entropy penalization keeps VI estimation away from it") and consequently *over*-estimates the posterior variance of every $\theta_j$ (Sec. 4.3). The honest summary is that VI uncertainty is unreliable in an unknown direction unless checked.

**Theory is thin.** Blei et al. Sec. 5.2 surveys what is known: results are model-by-model, mostly showing that VI posterior *means* are consistent point estimates (Bayesian linear model, Poisson mixed models, stochastic block models, Gaussian mixtures), while Wang & Titterington (2005) show the asymptotic variational posterior covariance is "too small", differing from the inverse Fisher information by a positive-definite matrix.

> [!example] Relevance to marketing measurement and applied work ^ex-applied-relevance
> - **Media mix models.** A [[Bayesian Media Mix Modeling - Overview|Bayesian MMM]] has strongly correlated posteriors: adstock decay vs. saturation parameters, channel coefficients for collinear spend, and baseline/trend vs. media effects. These are precisely the correlations a mean-field family deletes. ADVI (`pm.fit` in PyMC, `variational` in Stan) will return ROI intervals that look tight and are wrong. Use VI for fast iteration on model structure and for initializing [[HMC and Stan in Practice|NUTS]]; report intervals from MCMC, or from VI only after a passing $\hat k$ check.
> - **Hierarchical geo models.** Geo-level effects with a shared scale $\tau$ produce the funnel geometry of [[Hierarchical Models]]; Yao et al. show ADVI fails the joint diagnostic ($\hat k = 1.00$) on the centered eight-schools model and only becomes usable ($\hat k = 0.64$) after non-centering.
> - **Scale.** Where VI is genuinely the right tool: user-level or store-level models with millions of rows where minibatch ADVI/SVI is the only thing that fits in time, and the deliverable is a point prediction rather than a calibrated interval. Kucukelbir et al. recommend mean-field for prediction, full-rank when "posterior variances and covariances" are of interest (Sec. 3.1).
> - **Bayesian experimental design.** The [[Variational BOED - Overview|variational EIG estimators]] reuse the same machinery (an amortized $q_\phi$ trained by stochastic gradients on a bound) to estimate expected information gain for geo-experiment design.
> - **ABMs and simulators.** When the likelihood itself is unavailable, amortized VI ideas reappear as neural posterior estimation; see [[Neural Simulation-Based Inference - Overview]] and [[Simulation-Based and Amortized Inference]].

## Examples

A minimal decision procedure, synthesizing the recommendations in the four papers:

1. Fit with mean-field ADVI while the model is still changing. Treat the output as a rough posterior and a source of initial values (the use the [[Variational Inference and Pathfinder|Bayesian Workflow book]] endorses).
2. Tighten the convergence tolerance. Yao et al. show that on a $K=100$ linear regression the default relative-ELBO tolerance $10^{-2}$ gives $\hat k = 4.4$ while $10^{-5}$ gives $\hat k = 0.61$ (Sec. 4.1): the "failure" was premature stopping.
3. Draw $S$ samples from $q$, compute importance ratios $r_s = p(\theta_s, y)/q(\theta_s)$, and fit the Pareto shape $\hat k$. If $\hat k < 0.7$, use PSIS-reweighted estimates; otherwise reparameterize, go full-rank, or switch to MCMC.
4. If only point estimates are needed, check them with VSBC (a VI-specific variant of [[Simulation-Based Calibration - Overview|SBC]]).

## Connections

- [[The ELBO and KL Divergence Minimization]] - the objective and what reverse KL does to $q^*$.
- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] - the classical family and algorithm; the variance-underestimation result.
- [[Stochastic and Black-Box Variational Inference]] - SVI, the score-function estimator, variance reduction.
- [[Automatic Differentiation Variational Inference (ADVI)]] - the Stan/PyMC algorithm the vault's case studies actually run.
- [[Reparameterization Trick and Variational Autoencoders]] - pathwise gradients, amortization, the bridge to deep generative models.
- [[Normalizing Flows for Variational Inference]] - enriching $\mathcal Q$ beyond Gaussians.
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] - how to tell whether it worked.
- [[Variational Inference and Pathfinder]] - the Bayesian Workflow book's assessment of VI and the Pathfinder alternative.
- [[Approximation Methods]] - BDA3 Ch. 13: modal/Laplace approximation, EM, variational Bayes and expectation propagation.
- [[Approximate Algorithms and Approximate Models]] - the workflow-level framing of when an approximate computation is acceptable.

## See Also

- [[SBC Case Studies]] - the ADVI-on-linear-regression failure that motivated this cluster.
- [[Efficient MCMC]] and [[HMC and Stan in Practice]] - the exact-but-slower alternative VI is measured against.
- [[Approximations Based on Joint and Conditional Posterior Modes]] - Laplace-type approximations, which Kucukelbir et al. stress are *not* equivalent to Gaussian VI.
- [[Variational Posterior Estimator (Barber-Agakov)]] and [[Variational Marginal Estimator]] - variational bounds used for expected information gain.
- [[Normalizing Flows as Conditional Density Estimators]] - the flow architecture used as an amortized posterior in simulation-based inference.
- [[Factor Analysis and PPCA]] - the linear-Gaussian latent variable model that the VAE generalizes.
- [[Hilbert Space Gaussian Processes]] - a model-side approximation that often removes the need for an inference-side one.
