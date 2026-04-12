---
title: "SMM Estimator for Copulas"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - topic/copulas
  - type/concept
  - doc/paper
source: "[[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Oh & Patton (2011), Sections 1-2.1, pp. 1-6"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Copula SMM"
doc_type: paper
depends_on:
  - "[[Method of Simulated Moments]]"
  - "[[Dependence Measures for Copulas]]"
  - "[[Copula Estimation]]"
used_by:
  - "[[SMM Copula Asymptotic Theory]]"
  - "[[SMM Copula Specification Testing]]"
  - "[[SMM Copula Simulation and Application]]"
aliases:
  - SMM for Copulas
  - Simulation-Based Copula Estimation
  - Oh-Patton Estimator
---

# SMM Estimator for Copulas

> [!summary]
> Oh and Patton (2011) develop a simulation-based estimator for copula model parameters that matches simulated **rank dependence measures** (Spearman's rank correlation and quantile dependence) to their sample counterparts. This approach is valuable when: (1) the copula likelihood is unavailable in closed form (e.g., factor copulas), (2) the researcher wants to target specific dependence features, or (3) GMM is infeasible because the mapping from parameters to dependence measures has no closed form. The estimator nests both GMM and standard MM as special cases and applies to both *iid* and time series data.

## Overview

Standard estimation of copula models relies on maximum likelihood or [[Copula Estimation|two-stage (IFM) methods]], but these require the copula density in closed form. Many flexible copula models — particularly factor copulas and high-dimensional specifications — lack tractable densities. Moreover, in financial applications the copula model is often used to price derivatives (CDOs, CDS), and it may be more natural to calibrate parameters by matching dependence measures that are directly relevant to pricing.

The Oh-Patton SMM estimator addresses this by using only "pure" dependence measures as moments — measures that are functions solely of the copula and unaffected by the marginal distributions.

## Data Generating Process

The DGP allows each variable to have time-varying conditional mean and variance, governed by parametric models:

> [!definition] Definition: Data Generating Process (Oh & Patton DGP)
> $$
> [Y_{1t}, \ldots, Y_{Nt}]' \equiv \mathbf{Y}_t = \boldsymbol{\mu}_t(\phi_0) + \boldsymbol{\sigma}_t(\phi_0) \boldsymbol{\eta}_t
> $$
>
> where:
> - $\boldsymbol{\mu}_t(\phi) = [\mu_{1t}(\phi), \ldots, \mu_{Nt}(\phi)]'$ — conditional means ($\mathcal{F}_{t-1}$-measurable)
> - $\boldsymbol{\sigma}_t(\phi) = \text{diag}\{\sigma_{1t}(\phi), \ldots, \sigma_{Nt}(\phi)\}$ — conditional standard deviations ($\mathcal{F}_{t-1}$-measurable)
> - $[\eta_{1t}, \ldots, \eta_{Nt}]' \equiv \boldsymbol{\eta}_t \sim iid \; \mathbf{F}_{\boldsymbol{\eta}} = \mathbf{C}(F_1, \ldots, F_N; \boldsymbol{\theta}_0)$ — standardized residuals with copula $\mathbf{C}$
> - $\phi_0$ is an $r \times 1$ vector governing the dynamics (assumed $\sqrt{T}$-consistently estimable)
> - $\boldsymbol{\theta}_0 \in \Theta$ is the $p \times 1$ vector of copula parameters to be estimated
>
> Common examples for the marginal dynamics: ARMA models, GARCH models, stochastic volatility models.
^def-dgp

**Two-stage estimation procedure:**
1. **Stage 1**: Estimate $\phi_0$ from the marginal models (e.g., AR-GARCH for each series) to obtain estimated standardized residuals $\hat{\eta}_{it} = \hat{\sigma}_{it}^{-1}(Y_{it} - \hat{\mu}_{it})$
2. **Stage 2**: Estimate $\boldsymbol{\theta}_0$ from the copula model using the SMM approach applied to $\{\hat{\boldsymbol{\eta}}_t\}_{t=1}^T$

> [!important] Marginal Distributions Are Unknown
> The marginal distributions $F_1, \ldots, F_N$ are estimated nonparametrically using the **empirical distribution function** (EDF):
> $$
> \hat{F}_i(y) = (T+1)^{-1} \sum_{t=1}^T \mathbf{1}\{\hat{\eta}_{it} \leq y\}
> $$
> The $(T+1)$ denominator (rather than $T$) ensures that the pseudo-observations lie strictly in $(0,1)$.

## Choice of Moments: Pure Dependence Measures

The key innovation is using only "pure" dependence measures — those unaffected by changes in the marginal distributions of the simulated data. This is critical because simulated data $\mathbf{X}$ drawn from $\mathbf{F}_x(\boldsymbol{\theta})$ may have different marginals than the observed data.

Moments like means and variances are functions of the marginals $G_i$ alone and contain **no copula information**. Linear correlation contains copula information but is also affected by the marginals. The measures used are:

### Spearman's Rank Correlation

For the pair $(\eta_i, \eta_j)$:

$$\rho^{ij} = 12 E[F_i(\eta_i) F_j(\eta_j)] - 3 = 12 \int \int uv \, dC_{ij}(u,v) - 3$$

This is purely a function of the copula $C_{ij}$ and invariant to the marginals. See [[Dependence Measures for Copulas#^def-spearman-rank|Spearman's rank correlation]].

### Quantile Dependence

$$\tau_q^{ij} = \begin{cases} P[F_i(\eta_i) \leq q | F_j(\eta_j) \leq q] = \frac{C_{ij}(q,q)}{q}, & q \in (0, 0.5] \\ P[F_i(\eta_i) > q | F_j(\eta_j) > q] = \frac{1 - 2q + C_{ij}(q,q)}{1-q}, & q \in (0.5, 1) \end{cases}$$

This captures tail dependence at various quantile levels. See [[Dependence Measures for Copulas#^def-quantile-dependence|quantile dependence]].

### Sample Counterparts

Based on the estimated standardized residuals:

$$\hat{\rho}^{ij} = \frac{12}{T} \sum_{t=1}^T \hat{F}_i(\hat{\eta}_{it}) \hat{F}_j(\hat{\eta}_{jt}) - 3$$

$$\hat{\tau}_q^{ij} = \begin{cases} \frac{1}{Tq} \sum_{t=1}^T \mathbf{1}\{\hat{F}_i(\hat{\eta}_{it}) \leq q, \hat{F}_j(\hat{\eta}_{jt}) \leq q\}, & q \in (0, 0.5] \\ \frac{1}{T(1-q)} \sum_{t=1}^T \mathbf{1}\{\hat{F}_i(\hat{\eta}_{it}) > q, \hat{F}_j(\hat{\eta}_{jt}) > q\}, & q \in (0.5, 1) \end{cases}$$

## The SMM Estimator

> [!definition] Definition: SMM Estimator for Copulas (Oh & Patton, 2011)
> Let $\hat{\mathbf{m}}_T$ be the $(m \times 1)$ vector of sample dependence measures computed from the standardized residuals $\{\hat{\boldsymbol{\eta}}_t\}_{t=1}^T$.
>
> Let $\tilde{\mathbf{m}}_S(\boldsymbol{\theta})$ be the corresponding vector computed from $S$ simulations drawn from $\mathbf{F}_x(\boldsymbol{\theta})$, $\{\mathbf{X}_s\}_{s=1}^S$.
>
> Define the moment difference:
> $$
> \mathbf{g}_{T,S}(\boldsymbol{\theta}) \equiv \hat{\mathbf{m}}_T - \tilde{\mathbf{m}}_S(\boldsymbol{\theta})
> $$
>
> The SMM estimator is:
> $$
> \hat{\boldsymbol{\theta}}_{T,S} = \arg\min_{\boldsymbol{\theta} \in \Theta} Q_{T,S}(\boldsymbol{\theta})
> $$
> where:
> $$
> Q_{T,S}(\boldsymbol{\theta}) = \mathbf{g}_{T,S}'(\boldsymbol{\theta}) \, \hat{\mathbf{W}}_T \, \mathbf{g}_{T,S}(\boldsymbol{\theta})
> $$
>
> and $\hat{\mathbf{W}}_T$ is a positive definite weight matrix. For identification, $m \geq p$ (at least as many moment conditions as parameters).
^def-smm-copula

### Typical Moment Selection

Oh and Patton use **five dependence measures** averaged across all $\binom{N}{2}$ pairs of assets:
1. Spearman's rank correlation
2. Quantile dependence at $q = 0.05$ (lower tail)
3. Quantile dependence at $q = 0.10$
4. Quantile dependence at $q = 0.90$
5. Quantile dependence at $q = 0.95$ (upper tail)

For an $N$-dimensional model with $p$ copula parameters, this gives $m = 5 \times \binom{N}{2}$ moment conditions when using all pairs, or $m = 5$ when averaging across pairs (for exchangeable models).

## Nesting of GMM and MM

The SMM estimator nests two important special cases:

1. **GMM**: If the mapping $\boldsymbol{\theta} \mapsto \mathbf{m}_0(\boldsymbol{\theta}) \equiv \lim_{S \to \infty} \tilde{\mathbf{m}}_S(\boldsymbol{\theta})$ is known in closed form, then GMM is feasible and is equivalent to the SMM estimator with $S/T \to \infty$.

2. **Standard Method of Moments**: If $m = p$ and the mapping is invertible, the estimator reduces to the method of moments.

For the **Clayton copula**, Kendall's rank correlation has a closed form ($\rho_{\text{Kendall}} = \kappa/(2+\kappa)$) so GMM is feasible using Kendall's $\tau$. For the **Normal copula**, Spearman's rank correlation has a closed form ($\rho_{\text{Spearman}} = (6/\pi) \arcsin(\rho/2)$) so GMM is feasible using Spearman's $\rho$.

For the **factor copula**, neither the likelihood nor any dependence measures are available in closed form — SMM is the only feasible approach among these methods.

## The Factor Copula Model

Oh and Patton (2011) introduce a factor copula as a key application:

> [!definition] Definition: Factor Copula (Oh & Patton, 2011)
> $$
> X_i = Z + \varepsilon_i, \quad i = 1, 2, \ldots, N
> $$
> where:
> - $Z \sim \text{Skew-}t(0, \sigma^2, \nu^{-1}, \lambda)$ — skewed $t$ distribution of Hansen (1994)
> - $\varepsilon_i \sim iid \; t(\nu^{-1})$ — Student's $t$ with $\nu^{-1}$ degrees of freedom
> - $\varepsilon_i \perp Z$ for all $i$
>
> The copula of $[X_1, \ldots, X_N]' \sim \mathbf{F}_x = \mathbf{C}(G_x, \ldots, G_x)$ is parameterized by $(\sigma^2, \nu^{-1}, \lambda)$:
> - $\sigma^2$: controls the overall level of dependence
> - $\nu^{-1}$: controls tail thickness (and thus tail dependence)
> - $\lambda$: controls asymmetry in dependence (stronger in crashes vs. booms)
>
> Neither the likelihood nor the dependence measures of this copula are available in closed form, making SMM the natural estimation approach.
^def-factor-copula

## Connections

- Applies [[Method of Simulated Moments]] to the specific problem of copula estimation
- Uses [[Dependence Measures for Copulas]] as the moment conditions
- Extends [[Copula Estimation|Bayesian copula estimation]] to non-Gaussian, non-tractable copulas
- [[SMM Copula Asymptotic Theory]] establishes formal consistency and normality results
- [[SMM Copula Specification Testing]] provides goodness-of-fit via over-identifying restrictions
- [[SMM Copula Simulation and Application]] presents Monte Carlo evidence and financial application

## See Also

- [[Simulation-Based Estimation - Overview]] — broader context of simulation-based methods
- [[SMM Copula Asymptotic Theory]] — formal theoretical results (Propositions 1-3)
- [[SMM Copula Specification Testing]] — over-identifying restrictions test (Proposition 4)
- [[SMM Copula Simulation and Application]] — Monte Carlo and empirical results
- [[Dependence Measures for Copulas]] — the moments used in estimation
- [[Copula Estimation]] — Bayesian/MLE approaches for comparison

## Sources

- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), Sections 1-2.1
