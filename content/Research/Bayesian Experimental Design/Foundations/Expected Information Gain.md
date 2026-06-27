---
title: Expected Information Gain
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §2; Foster 2019 §2; Foster 2020 §2"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Foundations"
doc_type: paper
depends_on:
  - "[[Lindley's Information Measure]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Nested Estimation and Nested Monte Carlo]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[Variational BOED - Overview]]"
  - "[[Unified SGD BOED - Overview]]"
  - "[[Information-Theoretic Design Objectives]]"
aliases:
  - EIG
  - Expected Information Gain
  - Information Gain
  - Mutual Information design objective
---

# Expected Information Gain

> [!summary]
> The **expected information gain (EIG)** is the objective function of Bayesian experimental design: the expected reduction in entropy (uncertainty) about the latent variable $\theta$ from running an experiment with design $\xi$, averaged over not-yet-observed outcomes $y$. It equals the **mutual information** $\mathrm{MI}_\xi(\theta; y)$. The Bayesian optimal design is $\xi^\* = \arg\max_\xi \mathrm{EIG}(\xi)$. This note gives the four equivalent forms of the EIG and why it is hard to compute.

## Overview

We hold a prior $p(\theta)$ over a latent quantity of interest $\theta$ (model parameters, a function optimum, a future prediction — anything) and a model $p(y\mid\theta,\xi)$ for the outcome $y$ of an experiment run under design $\xi$. After observing $y$, Bayes' rule updates us to the posterior $p(\theta\mid y,\xi)\propto p(\theta)\,p(y\mid\theta,\xi)$.

The **information gain** of a *particular* realized outcome is the drop in Shannon entropy from prior to posterior. Before running the experiment we do not know $y$, so to score a design we take the expectation over outcomes — giving the EIG.

## Main Content

> [!definition] Definition: Information Gain (Rainforth 2023, Eq. 1)
> For a hypothetical outcome $y$ under design $\xi$, the **information gain** in $\theta$ is the reduction in Shannon entropy $\mathrm{H}[\cdot]$ from the prior to the posterior:
> $$
> \mathrm{InfoGain}_\theta(\xi, y) := \mathrm{H}[p(\theta)] - \mathrm{H}[p(\theta\mid y,\xi)] = \mathbb{E}_{p(\theta\mid y,\xi)}\!\left[\log p(\theta\mid y,\xi)\right] - \mathbb{E}_{p(\theta)}\!\left[\log p(\theta)\right]
> $$
> Because $y$ is unknown at design time, this cannot be optimized directly.
^def-infogain

> [!definition] Definition: Expected Information Gain (Rainforth 2023, Eqs. 2–3)
> The **EIG** averages information gain over outcomes via the marginal predictive $p(y\mid\xi) := \mathbb{E}_{p(\theta)}[p(y\mid\theta,\xi)]$:
> $$
> \mathrm{EIG}(\xi) := \mathbb{E}_{p(y\mid\xi)}\!\left[\mathrm{InfoGain}_\theta(\xi,y)\right] = \mathbb{E}_{p(\theta)p(y\mid\theta,\xi)}\!\left[\log p(\theta\mid y,\xi) - \log p(\theta)\right]
> $$
> The **Bayesian optimal design** is $\xi^\* := \arg\max_{\xi\in\Xi}\mathrm{EIG}(\xi)$.
^def-eig

> [!theorem] Equivalent forms of the EIG (mutual information)
> The EIG can be written four equivalent ways, each suggesting a different estimator. Writing the joint as $p(\theta,y\mid\xi)=p(\theta)p(y\mid\theta,\xi)$:
> $$
> \mathrm{EIG}(\xi) = \mathbb{E}_{p(y,\theta\mid\xi)}\!\left[\log\frac{p(\theta\mid y,\xi)}{p(\theta)}\right] = \mathbb{E}_{p(y,\theta\mid\xi)}\!\left[\log\frac{p(\theta,y\mid\xi)}{p(\theta)p(y\mid\xi)}\right] = \mathbb{E}_{p(y,\theta\mid\xi)}\!\left[\log\frac{p(y\mid\theta,\xi)}{p(y\mid\xi)}\right]
> $$
> The middle form shows the EIG **is the mutual information** $\mathrm{MI}_\xi(\theta; y)$ between latent and outcome. The right form (a "likelihood" form) is convenient when $\dim(y)\ll\dim(\theta)$; the left ("posterior") form when $\dim(\theta)\ll\dim(y)$.
^thm-eig-forms

### Why the EIG is hard: double intractability

Every form contains an intractable normalizing density:
- the **posterior** $p(\theta\mid y,\xi)$ (left form), and/or
- the **marginal likelihood** $p(y\mid\xi)$ (right form),

neither of which is generally available in closed form. A naive Monte Carlo estimator of, e.g., the likelihood form,
$$
\mathrm{EIG}(\xi)\approx \frac1N\sum_n \log p(y_n\mid\theta_n,\xi) - \log p(y_n\mid\xi),
$$
fails because each $\log p(y_n\mid\xi)$ is itself an intractable integral. This makes the EIG a **nested (doubly-intractable) expectation** requiring [[Nested Estimation and Nested Monte Carlo|nested estimation]], whose conventional estimators converge slowly ($\mathcal{O}(T^{-1/3})$). Overcoming this is the entire technical program of [[Variational BOED - Overview|variational EIG estimation]] and the [[Unified SGD BOED - Overview|unified gradient approach]].

### Decision-theoretic reading

The EIG is the expected utility of an experiment when utility is the **information / log-score** utility $U(\xi,\theta,y)=\log p(\theta\mid y,\xi)$. More general BED replaces this with any utility that is a functional of the posterior (Bernardo 1979; Chaloner & Verdinelli 1995) — but the KL/entropy utility is the most common and typically best-performing choice. See [[Information-Theoretic Design Objectives]] and [[Decision Analysis]].

## Examples

> [!example] Discrete-outcome (Rao–Blackwellized) EIG
> When $y$ takes a small number of discrete values $\mathcal{Y}$, the inner marginal can be enumerated rather than sampled, giving a lower-variance estimator (Rainforth 2023, Eq. 6):
> $$
> \hat\mu_N := \sum_{y\in\mathcal{Y}} \frac1N\sum_{n=1}^N p(y\mid\theta_n,\xi)\log p(y\mid\theta_n,\xi) - \hat p(y\mid\xi)\log\hat p(y\mid\xi), \quad \hat p(y\mid\xi)=\frac1N\sum_n p(y\mid\theta_n,\xi).
> $$
> This is exactly the trick used for the death-process experiment in [[High-Dimensional Design Applications]].

## Connections

- **Generalizes** to sequential settings via the *incremental* EIG conditioned on history — see [[Sequential and Adaptive BED]].
- **Is a mutual information**, so any MI lower/upper bound (Barber–Agakov, InfoNCE/PCE, NWJ, MINE) becomes an EIG estimator — the basis of [[Variational BOED - Overview]] and [[Adaptive Contrastive Estimation (ACE)]].
- **Contrasts with** the Fisher-information / alphabetic-optimality criteria of classical design, which approximate or replace the EIG — see [[Information-Theoretic Design Objectives]].

## See Also
- [[Lindley's Information Measure]] — the 1956 origin of this measure (Definitions 1–2, additivity, the design rule)
- [[Nested Estimation and Nested Monte Carlo]] — why and how the EIG is estimated
- [[Decision Analysis]] — expected-utility framing of experimentation
- [[Probability and Bayesian Inference]] — the prior→posterior update underlying information gain
