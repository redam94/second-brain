---
title: "Izmailov 2021 - Bayesian Neural Network Posteriors - Overview"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
  - type/overview
  - doc/paper
source: "[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]"
source_location: "Whole paper incl. Appendices A-F, pp. 1-24"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Izmailov 2021 - Bayesian Neural Network Posteriors"
doc_type: paper
depends_on:
  - "[[HMC and Stan in Practice]]"
  - "[[Variational Inference - Overview]]"
used_by:
  - "[[Izmailov 2021 - Full-Batch HMC for Neural Networks]]"
  - "[[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]]"
aliases:
  - What are BNN posteriors really like overview
  - Bayesian deep learning HMC benchmark
---

# Izmailov 2021 - Bayesian Neural Network Posteriors - Overview

> [!summary]
> Izmailov, Vikram, Hoffman & Wilson (ICML 2021) run **full-batch HMC** on modern networks (ResNet-20-FRN on CIFAR, CNN-LSTM on IMDB) across hundreds of TPUs to get near-exact BNN posteriors, then use them as ground truth. Findings: BNNs beat SGD and deep ensembles in-domain, one long chain suffices, no cold-posterior effect without data augmentation, performance is insensitive to prior scale, but BNNs are *worse* under covariate shift, and cheap approximations (ensembles, SGMCMC) give predictive distributions distinct from HMC.

## Overview

**Research question.** What do the true posteriors of Bayesian neural networks look like and how well do practical approximations (mean-field VI, SGLD/SGHMC, deep ensembles) reproduce the Bayesian model average

$$p(y\mid x,\mathcal D)=\int p(y\mid x,w)\,p(w\mid\mathcal D)\,dw\tag{1}$$

(the paper's eq. 1)? **Method.** Full-batch HMC, an asymptotically exact sampler needing the density and its gradient, with up to $10^5$ leapfrog steps per iteration.

**Six headline claims (abstract).** (1) BNNs give significant gains over standard training and deep ensembles; (2) a single long chain is comparable to several shorter ones; (3) no posterior tempering needed, "cold posterior" largely an artifact of data augmentation; (4) BMA is robust to prior scale and similar for diagonal Gaussian, mixture-of-Gaussians and logistic priors; (5) surprisingly poor generalization under domain shift; (6) deep ensembles and SGMCMC generalize well but give distinct predictive distributions from HMC (deep ensembles are as close to HMC as standard SGLD and closer than standard VI).

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction, 2 Background (BMA, MCMC) | this note |
| 3 Related work | [[Izmailov 2021 - Cheaper Approximations versus HMC]] |
| 4 HMC for deep nets (implementation, trajectory length, step size, chains); Appendix A hyper-parameters | [[Izmailov 2021 - Full-Batch HMC for Neural Networks]] |
| 5 Mixing: $\hat R$, density visualizations, convergence; Appendices B-E | [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]] |
| 6 Evaluating BNNs: UCI, CIFAR, IMDB, OOD (Table 1), domain shift (Fig. 7); Appendix F | [[Izmailov 2021 - Predictive Performance and Domain Shift]] |
| 7 Cold posteriors | [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]] |
| 8 Priors: scale, non-Gaussian (Table 2), architecture | [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]] |
| 9 Scalable methods vs HMC (Table 3, Fig. 10) | [[Izmailov 2021 - Cheaper Approximations versus HMC]] |
| 10 Discussion | [[Izmailov 2021 - Cheaper Approximations versus HMC]] |

## Motivating PyMC examples

Listed at https://redam94.github.io/pymc-challenges/examples.html :
- **E29 - Bayesian neural networks: what the posterior over weights buys you** (motorcycle crash test; concrete strength): an MLP in PyMC with `dims`, priors over functions and the $1/\sqrt{\text{width}}$ GP limit, NUTS vs ADVI / Pathfinder.
- **E11 - Scientific ML**: a network inside an ODE; weight-space $\hat R$ is meaningless, so diagnose in function space (see [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]]).
- **E15 - BART**: tree-based prior over functions; see [[Chipman 2010 - BART - Overview]].

## Relevance to marketing measurement

- Gives the evidence base for how much to trust a *fully Bayesian* flexible model: in this paper the exact posterior was better in-domain than point estimates, but not robust to shift, which matters for any model used for extrapolation (new spend levels, new markets).
- "Prior over functions, not over weights" is the right lens for specifying any flexible response curve; the architecture (here, sums of trees or networks with saturating activations) sets the function prior.
- A cautionary read of approximate Bayes: mean-field VI is the *worst* approximation in Table 3 of this paper, relevant when MMMs are fit by ADVI ([[Automatic Differentiation Variational Inference (ADVI)]], [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]).

## Connections

[[HMC and Stan in Practice]], [[Efficient MCMC]], [[Variational Inference - Overview]], [[Gaussian Process Regression]] (the infinite-width limit), [[Posterior Predictive Checking]], [[Neural Scaling Laws]], [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]].

## See Also

[[Chipman 2010 - BART - Overview]], [[Chen 2018 - Neural ODEs - Overview]], [[Universal Differential Equations and Scientific ML (Concept Note)]].
