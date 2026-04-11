---
title: "Indirect Inference"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/tdb136.pdf]]"
source_location: "Liesenfeld & Breitung (1998), Section 4, pp. 8-11"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Simulation-Based Estimation - Overview]]"
  - "[[Method of Simulated Moments]]"
used_by:
  - "[[Efficient Method of Moments]]"
aliases:
  - Indirect Inference Estimator
  - Minimum Distance Estimator (Simulation)
  - Score-Based Estimator
---

# Indirect Inference

> [!summary]
> Indirect inference estimates structural parameters $\theta$ by matching properties of an **auxiliary model** — a possibly misspecified but tractable model — between observed and simulated data. The structural model is too complex for direct estimation, but the auxiliary model can be estimated by quasi-MLE. The key idea: find $\theta$ such that simulated data from the structural model "looks like" real data through the lens of the auxiliary model. Two formulations exist: **minimum distance** (match auxiliary parameter estimates) and **score-based** (match auxiliary model scores). Both are consistent and asymptotically equivalent, but differ computationally.

## Overview

The MSM approach requires the researcher to specify moment conditions, which may not fully capture the model's features. Indirect inference offers an alternative: instead of choosing moments directly, the researcher chooses an **auxiliary model** whose parameters implicitly define a rich set of moment conditions.

The approach was proposed by Gouriéroux, Monfort, and Renault (1993) for the minimum distance formulation, and by Gallant and Tauchen (1996a) for the score-based formulation (which they termed "EMM" when combined with the SNP auxiliary model — see [[Efficient Method of Moments]]).

## Setup

Let $\mathcal{M}^* = \{h^*(y_t | z_t; \lambda), \lambda \in \Lambda\}$ denote the **auxiliary model**, where $\lambda$ is a $q$-dimensional parameter vector with $q \geq p$ (at least as many auxiliary parameters as structural parameters).

The auxiliary model is generally **misspecified**: there is no $\lambda^*$ such that $h^*(y_t | z_t; \lambda^*) = h(y_t | z_t; \theta_0)$ exactly. However, the quasi-MLE of $\lambda$ is well-defined:

$$\tilde{\lambda}_T = \arg\max_\lambda Q(Y, X; \lambda) = \arg\max_\lambda T^{-1} \sum_{t=1}^T \log h^*(y_t | z_t; \lambda)$$

> [!definition] Definition: Binding Function
> The **binding function** $b(\theta)$ links the structural parameters $\theta$ to the auxiliary parameters $\lambda$. It is defined as the solution to:
> $$E_\theta[g(Y, X; b(\theta))] = 0$$
> where $g(Y, X; \lambda) = \frac{\partial Q(Y, X; \lambda)}{\partial \lambda}$ is the score vector of the auxiliary model and the expectation is taken with respect to the joint distribution $h(Y, X | \theta)$ implied by the structural model.
>
> The QML estimate $\tilde{\lambda}_T$ converges in probability to the **pseudo-true value** $\lambda_0 = b(\theta_0)$.
^def-binding-function

## Minimum Distance Formulation

Since the binding function $b(\theta)$ is generally unknown, it must be approximated by simulation.

> [!definition] Definition: Simulated Binding Function
> Generate $R$ simulated paths $y_1^{(r)}(\theta), \ldots, y_T^{(r)}(\theta)$ from the structural model. For each path, estimate the auxiliary model parameters:
> $$\tilde{\lambda}_T^{(r)}(\theta) = \arg\max_\lambda T^{-1} \sum_{t=1}^T \log h^*[y_t^{(r)}(\theta) | z_t^{(r)}(\theta); \lambda]$$
>
> The simulated binding function is the average:
> $$\hat{b}_R(\theta) = \frac{1}{R} \sum_{r=1}^R \tilde{\lambda}_T^{(r)}(\theta)$$
^def-simulated-binding

> [!definition] Definition: Minimum Distance Indirect Inference Estimator
> The **minimum distance** indirect inference estimator is:
> $$\hat{\theta}_{MD}^R = \arg\min_\theta \left[\tilde{\lambda}_T - \hat{b}_R(\theta)\right]' A \left[\tilde{\lambda}_T - \hat{b}_R(\theta)\right]$$
>
> where $A$ is a positive definite weight matrix. The estimator finds the structural parameter $\theta$ for which the simulated auxiliary estimates $\hat{b}_R(\theta)$ are as close as possible to the real-data estimates $\tilde{\lambda}_T$.
^def-md-estimator

## Score-Based Formulation

> [!definition] Definition: Score-Based Indirect Inference Estimator
> The **score-based** formulation, suggested by Gallant and Tauchen (1996a), uses the moment conditions implied by the scores of the auxiliary model:
> $$E\, g[Y, X; b(\theta_0)] = 0$$
>
> Using path simulations to approximate $E_\theta g$, the estimator is:
> $$\hat{\theta}_{GT}^R = \arg\min_\theta \hat{g}_R(\theta, \tilde{\lambda}_T)' A \, \hat{g}_R(\theta, \tilde{\lambda}_T)$$
>
> where:
> $$\hat{g}_R(\theta, \tilde{\lambda}_T) = \frac{1}{R} \sum_{r=1}^R \frac{1}{T} \sum_{t=1}^T \frac{\partial \log h^*[y_t^{(r)}(\theta) | z_t^{(r)}(\theta); \tilde{\lambda}_T]}{\partial \lambda}$$
>
> The estimator searches for $\theta$ such that the simulated scores, evaluated at the real-data QML estimate $\tilde{\lambda}_T$, are close to zero.
^def-score-estimator

## Asymptotic Theory

> [!theorem] Theorem: Consistency and Asymptotic Normality of Indirect Inference
> Both the minimum distance and score-based indirect inference estimators are **consistent** as $T \to \infty$ for any fixed $R \geq 1$, and **asymptotically normal**:
> $$T^{1/2}(\hat{\theta}^R - \theta_0) \xrightarrow{d} N(0, \text{avar}(\hat{\theta}^R))$$
>
> Both approaches yield **asymptotically equivalent** estimators (Gouriéroux, Monfort, and Renault, 1993).
^thm-ii-normality

> [!theorem] Theorem: Optimal Weight Matrix for Minimum Distance
> For the minimum distance estimator $\hat{\theta}_{MD}^R$, the asymptotic optimal weight matrix is:
> $$A_0 = J_0 I_0^{-1} J_0$$
> where:
> $$J_0 = \lim_{T \to \infty} E\left\{\frac{\partial^2 Q(Y, X; \lambda_0)}{\partial \lambda \partial \lambda'}\right\}, \qquad I_0 = \lim_{T \to \infty} \text{var}\left\{\sqrt{T} g(Y, X; \lambda_0) - E[\sqrt{T} g(Y, X; \lambda_0) | X]\right\}$$
>
> The asymptotic variance is:
> $$\text{avar}(\hat{\theta}_{MD}^R) = \left(1 + \frac{1}{R}\right)[B' A_0 B]^{-1}$$
> where $B = \partial b(\theta_0) / \partial \theta'$.
^thm-ii-optimal-weight

> [!theorem] Theorem: Optimal Weight Matrix for Score-Based Estimator
> For the score-based estimator $\hat{\theta}_{GT}^R$, the asymptotic optimal weight matrix is:
> $$A_0 = I_0^{-1}$$
>
> The asymptotic variance is:
> $$\text{avar}(\hat{\theta}_{GT}^R) = \left(1 + \frac{1}{R}\right)[B' A_0 B]^{-1}$$
^thm-gt-optimal-weight

## Computational Comparison

| Feature | Minimum Distance ($\hat{\theta}_{MD}^R$) | Score-Based ($\hat{\theta}_{GT}^R$) |
|---------|----------------------------------------|-------------------------------------|
| Each iteration of $\theta$ | Requires $R$ nested optimizations to estimate $\tilde{\lambda}_T^{(r)}(\theta)$ | Requires only one optimization for $\tilde{\lambda}_T$ (done once) |
| Optimal $A_0$ | Requires $J_0$ (Hessian estimate) | Only requires $I_0$ (variance estimate) |
| Score vector availability | Not required | Must have analytical score $g(Y,X;\lambda)$ |
| Overall cost | Higher (nested optimization) | Lower |

## Efficiency and the Choice of Auxiliary Model

The efficiency of indirect inference depends critically on the auxiliary model's ability to approximate the structural model:

> [!important] Smoothly Embedded Condition
> If $h(y_t | z_t; \theta_0) = h^*(y_t | z_t; b(\theta_0))$ in some neighborhood of $\theta_0$ — i.e., the structural model is **smoothly embedded** within the auxiliary model — then the indirect inference estimator is **asymptotically efficient** (equal to MLE).

Two strategies for choosing the auxiliary model:

1. **Simple, close auxiliary model**: Choose a tractable model that captures the salient features of the structural model. For example, use a GARCH model as auxiliary for an SV structural model, since both capture volatility clustering.

2. **Data-dependent flexible model (SNP)**: Use the semi-nonparametric density of Gallant and Nychka (1987), increasing its flexibility with sample size. This is the [[Efficient Method of Moments]] approach.

## Connections

- Builds on [[Method of Simulated Moments]] — both are simulation-based, but indirect inference uses an auxiliary model rather than direct moment conditions
- Leads to [[Efficient Method of Moments]] when combined with SNP auxiliary models
- The binding function concept relates to [[Simulation-Based Estimation - Overview|simulation-based estimation]] more broadly
- [[Practical Issues in Simulation Estimation]] covers variance reduction and auxiliary model selection

## See Also

- [[Simulation-Based Estimation - Overview]] — comparison of all methods
- [[Method of Simulated Moments]] — direct moment-matching approach
- [[Efficient Method of Moments]] — data-driven auxiliary model (SNP)
- [[Practical Issues in Simulation Estimation]] — implementation guidance

## Sources

- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), Section 4
- Gouriéroux, C., A. Monfort, and E. Renault (1993), "Indirect Inference," *Journal of Applied Econometrics* 8, S85-S118
- Gallant, A.R. and G.E. Tauchen (1996a), "Which Moments to Match?," *Econometric Theory* 12, 657-681
- Smith, A.A. (1993), "Estimating Nonlinear Time-Series Models Using Simulated Vector Autoregressions," *Journal of Applied Econometrics* 8, S63-S84
