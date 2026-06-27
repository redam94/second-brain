---
title: Variational BOED - Overview
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/overview
  - doc/paper
  - method/pyro
source: "[[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]]"
source_location: "NeurIPS 2019, full paper"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Variational EIG Estimators"
doc_type: paper
depends_on:
  - "[[Expected Information Gain]]"
  - "[[Nested Estimation and Nested Monte Carlo]]"
used_by:
  - "[[Variational Posterior Estimator (Barber-Agakov)]]"
  - "[[Variational Marginal Estimator]]"
  - "[[Variational NMC Estimator]]"
  - "[[Implicit Likelihood Estimator]]"
  - "[[Unified SGD BOED - Overview]]"
aliases:
  - Variational Bayesian Optimal Experimental Design
  - Foster 2019
  - VBOED
---

# Variational BOED - Overview

> [!summary]
> **Foster et al. (2019), *Variational Bayesian Optimal Experimental Design* (NeurIPS).** Introduces **four fast variational EIG estimators** that sidestep the double intractability of the EIG using amortized variational inference. By learning a *functional approximation* to an intractable density (posterior or marginal) and reusing it across outcomes, cost drops from NMC's $\mathcal{O}(NM)$ to $\mathcal{O}(N+M)$ and convergence improves from $\mathcal{O}(T^{-1/3})$ to $\mathcal{O}(T^{-1/2})$ — matching ordinary Monte Carlo. Two estimators give bounds (lower/upper) that sandwich the EIG; one is asymptotically consistent even with an imperfect variational family; two handle implicit-likelihood models.

## Overview

**Research question.** Estimating the EIG ([[Expected Information Gain]]) is the central bottleneck of BOED, especially for real-time sequential experiments. The classic [[Nested Estimation and Nested Monte Carlo|nested Monte Carlo]] estimator is consistent but prohibitively slow ($\mathcal{O}(T^{-1/3})$) because it makes a *separate* inner estimate for every outcome $y_n$.

**Key insight.** Amortized variational inference lets us learn a *functional approximation* — e.g. a map $y\mapsto p(\theta\mid y,\xi)$ or $y\mapsto p(y\mid\xi)$ — once, then evaluate it at many points. Information is shared across outcomes, so the total cost becomes $\mathcal{O}(N+M)$ and the rate becomes $\mathcal{O}(T^{-1/2})$ (proved in [[Convergence Rates and Estimator Selection]]).

**Contribution.** Four estimators, each with distinct advantages, plus a general-purpose implementation in the probabilistic programming system **Pyro**.

## Main Content

### The four estimators at a glance (Foster 2019, Table 1)

| Estimator | Eq. | Approximates | Bound on EIG | Implicit-likelihood? | Consistent? |
|-----------|-----|--------------|--------------|----------------------|-------------|
| **[[Variational Posterior Estimator (Barber-Agakov)\|$\hat\mu_{\text{post}}$]]** | 6 | posterior $p(\theta\mid y,\xi)$ via $q_p(\theta\mid y,d)$ | **lower** | ✗ | ✗ |
| **[[Variational Marginal Estimator\|$\hat\mu_{\text{marg}}$]]** | 9 | marginal $p(y\mid d)$ via $q_m(y\mid d)$ | **upper** | ✗ | ✗ |
| **[[Variational NMC Estimator\|$\hat\mu_{\text{VNMC}}$]]** | 11 | posterior proposal $q_v(\theta\mid y,d)$ + NMC | **upper** | ✗ | **✓** (as $L\to\infty$) |
| **[[Implicit Likelihood Estimator\|$\hat\mu_{m+\ell}$]]** | 12 | marginal $q_m(y\mid d)$ **and** likelihood $q_\ell(y\mid\theta,d)$ | neither (bounded *error*) | **✓** | ✗ |

- **$\hat\mu_{\text{post}}$** (lower bound, tight iff $q_p$ = true posterior) is the **Barber–Agakov** bound repurposed for design; best when $\dim(\theta)\ll\dim(y)$.
- **$\hat\mu_{\text{marg}}$** (upper bound, tight iff $q_m$ = true marginal) targets $p(y\mid d)$; best when $\dim(y)\ll\dim(\theta)$.
- **$\hat\mu_{\text{VNMC}}$** (upper bound) is the *only* estimator guaranteed to converge to the true EIG even when the variational family does **not** contain the target — trading NMC's consistency against variational speed.
- **$\hat\mu_{m+\ell}$** handles **implicit likelihoods** (models with nuisance latents $\psi$ you can sample but not evaluate, e.g. random effects).

### Why bounds are useful

Having a *lower* bound ($\hat\mu_{\text{post}}$) and an *upper* bound ($\hat\mu_{\text{marg}}$ or $\hat\mu_{\text{VNMC}}$) lets you **trap** the true EIG of a design: if design $A$'s lower bound exceeds design $B$'s upper bound, $A$ is provably better — without ever computing the EIG exactly. This sandwiching is exploited heavily in [[Unified SGD BOED - Overview|Foster 2020]] for design verification.

### Baselines compared against (Foster 2019 §5)

- **NMC** ([[Nested Estimation and Nested Monte Carlo]]) — the consistent-but-slow reference.
- **Laplace approximation** to the posterior — fast but can be badly biased; exact only for Gaussian linear models.
- **LFIRE** (Likelihood-Free Inference by Ratio Estimation) — implicit-likelihood baseline.
- **Donsker–Varadhan (DV)** representation of the KL — an MI bound included for illustration.

## Examples

> [!example] Four benchmark design problems (Foster 2019 §6.1)
> The estimators are validated on **A/B testing** (Gaussian linear model, explicit likelihood), **revealed preference** (economics utility model, explicit), **mixed effects** (item-response psychology, *implicit* likelihood with nuisance variables), and **extrapolation** (predict labels in a target region, *implicit*). All four methods outperform NMC; Laplace wins only on the Gaussian A/B model where it is exact. See [[Convergence Rates and Estimator Selection]] for the bias²/variance table.

## Connections

- **Builds directly on** [[Nested Estimation and Nested Monte Carlo]] — these estimators exist to beat NMC's rate.
- **Repurposes mutual-information bounds** from representation learning: $\hat\mu_{\text{post}}$ = Barber–Agakov; $\hat\mu_{\text{marg}}$ = a variational marginal MI bound; see Poole et al. 2019.
- **Generalized by** [[Unified SGD BOED - Overview|Foster 2020]], which makes these bounds differentiable in the design too, fusing estimation and optimization.

## See Also
- [[Variational Posterior Estimator (Barber-Agakov)]] / [[Variational Marginal Estimator]] / [[Variational NMC Estimator]] / [[Implicit Likelihood Estimator]] — the four estimators in detail
- [[Convergence Rates and Estimator Selection]] — the $\mathcal{O}(T^{-1/2})$ theorem and how to choose
- [[Approximation Methods]] — variational inference background
