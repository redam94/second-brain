---
title: "Dependence Measures for Copulas"
tags:
  - source/ingested
  - topic/multivariate
  - topic/copulas
  - topic/dependence
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Oh & Patton (2011), Section 2.1, pp. 5-6; Nelsen (2006); Joe (1997)"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions"
doc_type: paper
depends_on:
  - "[[Copula Estimation]]"
used_by:
  - "[[SMM Estimator for Copulas]]"
  - "[[SMM Copula Asymptotic Theory]]"
  - "[[SMM Copula Simulation and Application]]"
aliases:
  - Rank Correlation
  - Quantile Dependence
  - Tail Dependence
  - Pure Dependence Measures
---

# Dependence Measures for Copulas

> [!summary]
> Dependence measures quantify the strength and structure of association between random variables. For copula modeling, **pure dependence measures** — those that depend only on the copula and not on the marginal distributions — are especially important. Spearman's rank correlation captures overall monotone association, while quantile dependence captures the strength of co-movement at specific quantile levels (including the tails). These measures serve as the "moments" in the [[SMM Estimator for Copulas|SMM approach to copula estimation]] and provide diagnostic tools for detecting tail dependence and asymmetry.

## Overview

Different dependence measures capture different aspects of the joint distribution. A critical distinction for copula modeling is whether a measure depends on the marginals:

| Measure | Depends on Marginals? | Copula Information |
|---------|----------------------|-------------------|
| Mean, variance | Yes (marginals only) | **None** |
| Linear (Pearson) correlation | Yes | Some, but contaminated |
| Spearman's rank correlation | **No** | Full copula summary (concordance) |
| Kendall's rank correlation | **No** | Full copula summary (concordance) |
| Quantile dependence | **No** | Tail/local copula structure |
| Tail dependence coefficients | **No** | Asymptotic tail behavior |

Measures like linear correlation contain copula information but are also affected by the marginals — this makes them unsuitable as moments in the [[SMM Estimator for Copulas|SMM framework]] where simulated data may have different marginals than the observed data.

## Spearman's Rank Correlation

> [!definition] Definition: Spearman's Rank Correlation (Population)
> For a pair of random variables $(\eta_i, \eta_j)$ with marginal CDFs $F_i, F_j$ and copula $C_{ij}$:
> $$\rho^{ij} = 12 E[F_i(\eta_i) F_j(\eta_j)] - 3 = 12 \int \int uv \, dC_{ij}(u,v) - 3$$
>
> **Properties:**
> - $\rho^{ij} \in [-1, 1]$
> - $\rho^{ij} = 0$ if and only if $C_{ij}(u,v) = uv$ (independence copula)
> - $\rho^{ij} = 1$ for perfect positive concordance (comonotonic copula)
> - $\rho^{ij} = -1$ for perfect negative concordance (countermonotonic copula)
> - It is a **pure copula functional**: depends only on $C_{ij}$, not on $F_i$ or $F_j$
> - Invariant to strictly increasing transformations of the marginals
^def-spearman-rank

> [!definition] Definition: Spearman's Rank Correlation (Sample)
> Based on estimated standardized residuals $\{\hat{\eta}_{it}, \hat{\eta}_{jt}\}_{t=1}^T$ with empirical CDFs $\hat{F}_i, \hat{F}_j$:
> $$\hat{\rho}^{ij} = \frac{12}{T} \sum_{t=1}^T \hat{F}_i(\hat{\eta}_{it}) \hat{F}_j(\hat{\eta}_{jt}) - 3$$
>
> where $\hat{F}_i(y) = (T+1)^{-1} \sum_{t=1}^T \mathbf{1}\{\hat{\eta}_{it} \leq y\}$.
>
> This is equivalent to the Pearson correlation of the ranks (or pseudo-observations).
^def-spearman-sample

### Closed-Form Relations

For some copula families, Spearman's $\rho$ has a known relationship to the copula parameter:

- **Normal (Gaussian) copula**: $\rho_{\text{Spearman}} = \frac{6}{\pi} \arcsin\left(\frac{\rho}{2}\right)$ where $\rho$ is the copula parameter
- **Clayton copula**: no closed form for Spearman's $\rho$ (but Kendall's $\tau = \kappa/(2+\kappa)$ is available)

When a closed form exists, GMM can be used directly. When it does not, [[SMM Estimator for Copulas|SMM]] is required.

## Quantile Dependence

> [!definition] Definition: Quantile Dependence (Population)
> For a pair $(\eta_i, \eta_j)$ with copula $C_{ij}$, the quantile dependence at level $q$ is:
>
> **Lower quantile dependence** ($q \in (0, 0.5]$):
> $$\tau_q^{ij} = P[F_i(\eta_i) \leq q \mid F_j(\eta_j) \leq q] = \frac{C_{ij}(q, q)}{q}$$
>
> **Upper quantile dependence** ($q \in (0.5, 1)$):
> $$\tau_q^{ij} = P[F_i(\eta_i) > q \mid F_j(\eta_j) > q] = \frac{1 - 2q + C_{ij}(q, q)}{1-q}$$
>
> **Interpretation:**
> - $\tau_q^{ij}$ measures the probability that both variables are simultaneously in the same tail
> - $\tau_{0.05}^{ij}$ = probability that both are below their 5th percentile, given one is
> - $\tau_{0.95}^{ij}$ = probability that both are above their 95th percentile, given one is
> - Under independence: $\tau_q^{ij} = q$ for lower and $\tau_q^{ij} = 1-q$ for upper
> - Like Spearman's $\rho$, this is a **pure copula functional**
^def-quantile-dependence

> [!definition] Definition: Quantile Dependence (Sample)
> Based on estimated standardized residuals:
>
> **Lower** ($q \in (0, 0.5]$):
> $$\hat{\tau}_q^{ij} = \frac{1}{Tq} \sum_{t=1}^T \mathbf{1}\{\hat{F}_i(\hat{\eta}_{it}) \leq q, \, \hat{F}_j(\hat{\eta}_{jt}) \leq q\}$$
>
> **Upper** ($q \in (0.5, 1)$):
> $$\hat{\tau}_q^{ij} = \frac{1}{T(1-q)} \sum_{t=1}^T \mathbf{1}\{\hat{F}_i(\hat{\eta}_{it}) > q, \, \hat{F}_j(\hat{\eta}_{jt}) > q\}$$
^def-quantile-dependence-sample

### Quantile Dependence vs. Tail Dependence Coefficients

The classical **tail dependence coefficients** are the limits:

$$\lambda_L = \lim_{q \to 0^+} \tau_q^{ij} = \lim_{q \to 0^+} \frac{C(q,q)}{q}$$

$$\lambda_U = \lim_{q \to 1^-} \frac{1 - 2q + C(q,q)}{1-q}$$

Quantile dependence at finite $q$ (e.g., $q = 0.05$ or $q = 0.95$) is preferred for estimation because:
1. It can be estimated directly from data (no extrapolation to the limit)
2. It captures dependence at **empirically relevant** quantile levels
3. It provides a richer picture of the dependence structure than the single tail coefficient

## Detecting Asymmetric Dependence

> [!definition] Definition: Asymmetry Measure
> The difference between upper and lower quantile dependence at symmetric quantile levels:
> $$\Delta_q^{ij} = \tau_{1-q}^{ij} - \tau_q^{ij}, \quad q \in (0, 0.5)$$
>
> - $\Delta_q^{ij} > 0$: stronger dependence in booms (upper tail) than crashes (lower tail)
> - $\Delta_q^{ij} < 0$: stronger dependence in crashes than booms
> - $\Delta_q^{ij} = 0$: symmetric dependence (implied by Gaussian copula, for example)
^def-asymmetry-measure

In the [[SMM Copula Simulation and Application#^example-financial-dependence|financial firm application]], Oh and Patton find that $\Delta_q^{ij}$ is negative for 14 out of 21 pairs, suggesting that financial firm returns co-move more strongly during crashes.

## Copula-Specific Dependence Properties

| Copula | Lower Tail Dep. ($\lambda_L$) | Upper Tail Dep. ($\lambda_U$) | Symmetric? |
|--------|-------------------------------|-------------------------------|------------|
| Normal (Gaussian) | 0 | 0 | Yes |
| Clayton | $2^{-1/\kappa} > 0$ | 0 | No (lower only) |
| Gumbel | 0 | $2 - 2^{1/\delta}$ | No (upper only) |
| Student-$t$ | $> 0$ | $> 0$ | Yes |
| Factor copula (Oh & Patton) | $> 0$ | $> 0$ | Asymmetric (via $\lambda$) |

The Normal copula's zero tail dependence is a significant limitation for financial applications where extreme co-movements are observed. The [[SMM Estimator for Copulas#^def-factor-copula|factor copula]] allows non-zero, asymmetric tail dependence through the skewed-$t$ factor distribution.

## Connections

- Foundation for [[SMM Estimator for Copulas]] — these measures serve as the "moments" matched in estimation
- Extends [[Copula Estimation|Bayesian copula estimation]] by providing diagnostic tools beyond Gaussian assumptions
- Asymptotic properties of these sample measures drive [[SMM Copula Asymptotic Theory|the asymptotic theory]] of the SMM estimator
- [[SMM Copula Simulation and Application#^example-financial-dependence|Financial application]] uses these measures to characterize dependence among financial firms

## See Also

- [[Copula Estimation]] — Bayesian estimation of Gaussian copulas (complementary approach)
- [[SMM Estimator for Copulas]] — SMM estimation using these dependence measures
- [[SMM Copula Simulation and Application]] — empirical dependence patterns in financial data

## Sources

- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), Section 2.1
- Nelsen, R.B. (2006), *An Introduction to Copulas*, 2nd ed., Springer
- Joe, H. (1997), *Multivariate Models and Dependence Concepts*, Chapman and Hall
