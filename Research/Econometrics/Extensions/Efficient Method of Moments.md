---
title: "Efficient Method of Moments"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/tdb136.pdf]]"
source_location: "Liesenfeld & Breitung (1998), Section 5, pp. 11-13"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions"
doc_type: paper
depends_on:
  - "[[Indirect Inference]]"
  - "[[Simulation-Based Estimation - Overview]]"
used_by: []
aliases:
  - EMM
  - SNP Approach
  - Semi-Nonparametric Estimation
---

# Efficient Method of Moments

> [!summary]
> The Efficient Method of Moments (EMM) combines indirect inference with a **semi-nonparametric (SNP)** auxiliary model that is flexible enough to approximate any stationary Markovian density. By increasing the SNP model's complexity with sample size, EMM achieves **asymptotic efficiency** equal to MLE — something that standard indirect inference with a fixed auxiliary model cannot guarantee. The SNP density uses a squared Hermite polynomial expansion to capture departures from normality, embedded within a location-scale model that handles dynamic heterogeneity.

## Overview

The central limitation of [[Indirect Inference]] is that efficiency depends on the auxiliary model's ability to approximate the structural model. If the auxiliary model is too simple, information is lost. EMM resolves this by using a flexible, data-driven auxiliary model — the SNP density of Gallant and Nychka (1987) — as the score generator.

## The SNP Density

> [!definition] Definition: Semi-Nonparametric (SNP) Conditional Density
> The SNP model represents any conditional density as:
> $$h_q^*(y_t | z_t; \lambda_q) = \frac{[\mathcal{P}(u_t, z_t)]^2 \, \phi(u_t) / |\det(S_t)|}{\int [\mathcal{P}(v, z_t)]^2 \, \phi(v) \, dv}$$
>
> where:
> - $z_t = [y_{t-1}', \ldots, y_{t-l}']'$ is the conditioning vector
> - $u_t = S_t^{-1}(y_t - \mu_t)$ is the standardized residual
> - $\mu_t$ is a location function and $S_t$ is a scale function
> - $\phi(\cdot)$ is the standard multivariate normal density
> - $\mathcal{P}(u_t, z_t)$ is a polynomial in $u_t$ with coefficients depending on $z_t$
> - $\lambda_q$ is the full parameter vector of dimension $q$
>
> The integration constant ensures that $h_q^*$ integrates to unity.
^def-snp-density

### Components of the SNP Model

**Location function** (vector autoregression):

$$\mu_t = b_0 + \sum_{i=1}^{l_\mu} B_i y_{t-i}$$

**Scale function** (ARCH-type):

$$\text{vech}(S_t) = c_0 + \sum_{i=1}^{l_s} C_i |y_{t-i} - \mu_{t-i}|$$

where $\text{vech}(S_t)$ is the vector containing the $n(n+1)/2$ distinct elements of the scale matrix.

**Polynomial expansion** (Hermite-type):

$$\mathcal{P}(u_t, z_t) = \sum_{|\alpha|=0}^{k_u} a_\alpha(z_t) u_t^\alpha$$

where $u^\alpha = \prod_{i=1}^n u_i^{\alpha_i}$, $|\alpha| = \sum_{i=1}^n |\alpha_i|$, and $k_u$ controls the degree of the polynomial. The coefficients $a_\alpha(z_t)$ are themselves polynomials in $z_t$ of degree $k_z$.

> [!important] Special Cases of the SNP Model
> - **$k_u = 0$**: The SNP model reduces to a Gaussian VAR-ARCH specification (leading term captures first two moments)
> - **$k_z = 0$**: Deviations from normality are independent of past values
> - **$k_u = k_z = 0$**: Pure Gaussian with dynamic location and scale
>
> Increasing $k_u$ captures non-normality and possible heterogeneity in higher-order moments. Increasing $k_z$ allows the shape of the distribution to depend on past values.

## The EMM Estimator

The EMM estimator is a special case of [[Indirect Inference#^def-score-estimator|score-based indirect inference]] where the auxiliary model is the SNP density:

> [!definition] Definition: EMM Estimator
> 1. Estimate the SNP auxiliary model on the observed data:
>    $$\tilde{\lambda}_T = \arg\max_\lambda T^{-1} \sum_{t=1}^T \log h_q^*(y_t | z_t; \lambda)$$
>
> 2. The EMM estimator minimizes:
>    $$\hat{\theta}_{GT}^R = \arg\min_\theta \hat{g}_R(\theta, \tilde{\lambda}_T)' A \, \hat{g}_R(\theta, \tilde{\lambda}_T)$$
>
>    where the simulated scores are:
>    $$\hat{g}_R(\theta, \tilde{\lambda}_T) = \frac{1}{R} \sum_{r=1}^R \frac{1}{T} \sum_{t=1}^T \frac{\partial \log h_q^*[y_t^{(r)}(\theta) | z_t^{(r)}(\theta); \tilde{\lambda}_T]}{\partial \lambda}$$
>
> The EMM estimator searches for $\theta$ such that the SNP scores, evaluated at $\tilde{\lambda}_T$, are close to zero when applied to simulated data from the structural model.
^def-emm-estimator

## Asymptotic Efficiency

> [!theorem] Theorem: Asymptotic Efficiency of EMM
> If the dimension $q$ of the SNP model increases with the sample size $T$ such that $q \to \infty$ as $T \to \infty$, then under weak conditions the quasi-ML estimate $\tilde{\lambda}_T$ is an efficient nonparametric estimate of the true density $h_0(y_t | z_t)$. Consequently:
>
> 1. The SNP model is "smoothly embedded" within the structural model in the sense required for asymptotic efficiency of indirect inference
> 2. The EMM estimator attains the **asymptotic efficiency of MLE**
>
> Specifically, Gallant and Long (1997) show that the indirect inference estimator with the SNP model as score generator attains the asymptotic efficiency of the ML estimator by increasing the dimension $q$.
^thm-emm-efficiency

## Model Selection for the SNP Auxiliary

Determining the adequate specification of the SNP model — choosing $l_\mu$, $l_s$, $k_u$, and $k_z$ — is a key practical challenge:

1. **Successive expansion**: The dimension $q$ is successively increased, and model selection criteria (AIC, BIC/Schwarz) determine the preferred specification
2. **Diagnostic tests**: After selecting a preferred specification, diagnostic tests on the standardized residuals verify adequacy
3. **ARCH vs. polynomial scale**: Substituting an ARCH-type scale function for the polynomial scale in the SNP model can reduce the number of parameters while maintaining the autocorrelation structure

> [!warning] Over-Parameterization Risk
> Score generators based on an over-parameterized SNP model can lead to a substantial loss of efficiency, especially in smaller samples (Andersen, Chung, and Sørensen, 1998). The dimension of the polynomial ($k_u$) and the number of lags ($l_\mu$, $l_s$) should be chosen carefully.

## Finite Sample Properties

Andersen, Chung, and Sørensen (1998) conduct a comprehensive Monte Carlo study comparing EMM with GMM and likelihood-based estimators for the SV model:

- EMM is generally **more efficient** than standard GMM
- **Likelihood-based estimators** are generally more efficient than EMM, but EMM approaches their efficiency as sample size increases
- **ARCH-type scale function** in the SNP model improves efficiency relative to the polynomial scale specification, because it more directly captures the autocorrelation in variance that the SV model implies

## Connections

- Specializes [[Indirect Inference]] by choosing a flexible, data-driven auxiliary model
- Achieves the efficiency that [[Method of Simulated Moments]] cannot guarantee without optimal moment selection
- [[Practical Issues in Simulation Estimation]] covers variance reduction relevant to EMM implementation

## See Also

- [[Simulation-Based Estimation - Overview]] — comparison of all methods
- [[Indirect Inference]] — general auxiliary model framework
- [[Method of Simulated Moments]] — simpler but less efficient alternative
- [[Practical Issues in Simulation Estimation]] — implementation guidance

## Sources

- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), Section 5
- Gallant, A.R. and D.W. Nychka (1987), "Semi-Nonparametric Maximum Likelihood Estimation," *Econometrica* 55, 363-390
- Gallant, A.R. and G.E. Tauchen (1996a), "Which Moments to Match?," *Econometric Theory* 12, 657-681
- Gallant, A.R. and J.R. Long (1997), "Estimating Stochastic Differential Equations Efficiently by Minimum Chi-Squared," *Biometrica* 84, 125-141
- Andersen, T.G., H.J. Chung, and B.E. Sørensen (1998), "Efficient Method of Moments Estimation of a Stochastic Volatility Model: A Monte Carlo Study," Working Paper, Brown University
