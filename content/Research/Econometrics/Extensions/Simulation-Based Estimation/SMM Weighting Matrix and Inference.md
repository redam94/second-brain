---
title: "SMM Weighting Matrix and Inference"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/concept
  - type/theorem
  - doc/tutorial
source: "[[Clippings/19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]]"
source_location: "Ch. 19, Sections 19.2–19.5"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: tutorial
depends_on:
  - "[[Method of Simulated Moments]]"
  - "[[Standard Errors and Clustering]]"
used_by:
  - "[[SMM Python Implementation]]"
  - "[[Practical Issues in Simulation Estimation]]"
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
aliases:
  - SMM optimal weighting matrix
  - two-step SMM
  - Newey-West SMM
---

# SMM Weighting Matrix and Inference

> [!summary]
> The choice of weighting matrix $W$ in the SMM criterion function controls both the efficiency of the estimator and the standard errors of $\hat{\theta}_{SMM}$. Four strategies exist in increasing order of optimality: identity matrix, two-step variance-covariance estimator, iterated estimator, and Newey-West HAC estimator. Separately, the parameter variance-covariance matrix $\hat{\Sigma}_{SMM}$ is computed from the Jacobian of the moment error vector — an R×K matrix of numerical derivatives evaluated at the SMM estimate.

## Overview

The [[Method of Simulated Moments]] estimator minimizes:

$$
\hat{\theta}_{SMM} = \theta : \min_\theta \; e(\tilde{x}, x | \theta)^T W \, e(\tilde{x}, x | \theta)
$$

where $e(\tilde{x}, x | \theta)$ is the $R \times 1$ vector of moment errors (simulated minus data moments, typically as percent deviations). The $R \times R$ weighting matrix $W$ controls how each moment is weighted in the minimization. Different choices of $W$ produce estimators with different asymptotic variances.

> [!important] Percent-Deviation Scaling
> Scale the moment error vector as percent deviations $e_r = (\hat{m}_r - m_r) / m_r$ (not raw differences). This puts all moments in the same units and prevents moments with larger absolute values from receiving unintended extra weight. Exception: percent deviations are not valid when data moments can be zero or change sign.

## Weighting Matrix Strategies

### 1. Identity Matrix ($W = I$)

$$
\hat{\theta}_{SMM} = \theta : \min_\theta \; e(\tilde{x}, x | \theta)^T e(\tilde{x}, x | \theta)
$$

Gives each moment equal weight. Simple and sufficient when:
- The problem is well-conditioned
- Moments are in the same units (or after percent-deviation scaling)
- A quick estimate is needed before computing the optimal $W$

### 2. Two-Step Variance-Covariance Estimator

> [!definition] Definition: Two-Step SMM Estimator
> **Step 1.** Estimate with identity matrix:
> $$
> \hat{\theta}_{1,SMM} = \theta : \min_\theta \; e(\tilde{x}, x | \theta)^T I \, e(\tilde{x}, x | \theta)
> $$
>
> **Step 2.** Compute the $R \times S$ error matrix at the Step 1 estimates, where each column is the moment error vector from one simulation:
> $$
> E(\tilde{x}, x | \hat{\theta}_{1,SMM}) = \begin{bmatrix} m_1(\tilde{x}_1|\hat{\theta}) - m_1(x) & \cdots & m_1(\tilde{x}_S|\hat{\theta}) - m_1(x) \\ \vdots & \ddots & \vdots \\ m_R(\tilde{x}_1|\hat{\theta}) - m_R(x) & \cdots & m_R(\tilde{x}_S|\hat{\theta}) - m_R(x) \end{bmatrix}
> $$
>
> (Or in percent-deviation form: divide each row by the corresponding data moment $m_r(x)$.)
>
> **Step 3.** Estimate the variance-covariance matrix of the moment errors:
> $$
> \hat{\Omega}_2 = \frac{1}{S} E(\tilde{x}, x | \hat{\theta}_{1,SMM}) \, E(\tilde{x}, x | \hat{\theta}_{1,SMM})^T
> $$
>
> The $(r,s)$ element is $\hat{\Omega}_{2,r,s} = \frac{1}{S}\sum_{i=1}^S [m_r(\tilde{x}_i|\hat{\theta}) - m_r(x)][m_s(\tilde{x}_i|\hat{\theta}) - m_s(x)]$.
>
> **Step 4.** Set the optimal weighting matrix $\hat{W}^{two-step} = \hat{\Omega}_2^{-1}$ and re-estimate:
> $$
> \hat{\theta}_{2,SMM} = \theta : \min_\theta \; e(\tilde{x}, x | \theta)^T \hat{W}^{two-step} \, e(\tilde{x}, x | \theta)
> $$
^def-two-step-smm

**Intuition:** Downweight moments with high simulation variance; upweight moments that are estimated precisely across simulations.

**Practical result:** The two-step optimal $W$ may not change point estimates much compared to $W=I$, but it reduces standard errors by efficiently weighting moments.

### 3. Iterated Variance-Covariance Estimator

The truly optimal $W^{opt}$ is the fixed point of the two-step procedure. Iterate:

$$
\hat{\theta}_{i,SMM} = \theta : \min_\theta \; e^T \hat{W}_i \, e
$$
$$
\hat{W}_{i+1} = \hat{\Omega}_{i+1}^{-1}, \quad \hat{\Omega}_{i+1} = \frac{1}{S} E(\tilde{x}, x | \hat{\theta}_{i,SMM}) E(\tilde{x}, x | \hat{\theta}_{i,SMM})^T
$$

The iterated SMM estimator $\hat{\theta}_{it,SMM}$ is the $\hat{\theta}_{i,SMM}$ such that:
$$
\|\hat{W}_{i+1} - \hat{W}_i\| < \epsilon
$$

In practice, the two-step estimator usually suffices — the gain from additional iterations is typically small.

### 4. Newey-West HAC Estimator

When simulated data are autocorrelated (time series models), the variance-covariance matrix of the moments requires a HAC (heteroskedasticity and autocorrelation consistent) estimator.

> [!definition] Definition: Newey-West Weighting Matrix
> The asymptotically optimal weighting matrix in the presence of autocorrelation:
> $$
> \hat{W}_{nw} = \Gamma_{0,S} + \sum_{v=1}^{q} \left(1 - \frac{v}{q+1}\right)(\Gamma_{v,S} + \Gamma_{v,S}^T)
> $$
>
> where:
> $$
> \Gamma_{v,S} = \frac{1}{S} \sum_{i=v+1}^{S} E(\tilde{x}_i, x | \theta) \, E(\tilde{x}_{i-v}, x | \theta)^T
> $$
>
> The bandwidth parameter $q$ controls how many lags are included.
^def-nw-estimator

The optimal weighting matrix $\hat{W}^{opt}$ in the autocorrelated case:
$$
\hat{W}^{opt} = \lim_{S\to\infty} \frac{1}{S}\sum_{i=1}^S \sum_{l=-\infty}^{\infty} E(\tilde{x}_i, x|\theta) E(\tilde{x}_{i-l}, x|\theta)^T
$$

The Newey-West estimator approximates this via the weighted sum of autocovariance matrices.

**When to use:** Essential for structural models where simulated time series exhibit serial correlation (e.g., DSGE models, asset pricing models with persistence).

## Variance-Covariance of $\hat{\theta}_{SMM}$

The parameter estimates $\hat{\theta}_{SMM}$ are asymptotically normal. The estimated $K \times K$ variance-covariance matrix $\hat{\Sigma}_{SMM}$ is computed from the Jacobian of the moment error vector.

> [!theorem] Theorem: SMM Parameter Variance-Covariance
> Define the $R \times K$ Jacobian matrix $d(\tilde{x}, x | \theta)$ of derivatives of the moment error vector with respect to each parameter:
> $$
> d(\tilde{x}, x | \theta) \equiv \begin{bmatrix} \frac{\partial e_1}{\partial \theta_1} & \cdots & \frac{\partial e_1}{\partial \theta_K} \\ \vdots & \ddots & \vdots \\ \frac{\partial e_R}{\partial \theta_1} & \cdots & \frac{\partial e_R}{\partial \theta_K} \end{bmatrix}
> $$
>
> The SMM estimates are asymptotically normal as $S \to \infty$:
> $$
> \text{plim}_{S\to\infty} \sqrt{S}(\hat{\theta}_{SMM} - \theta_0) \sim N(0, [d^T W d]^{-1})
> $$
>
> The estimated variance-covariance matrix is:
> $$
> \hat{\Sigma}_{SMM} = \frac{1}{S}[d(\tilde{x}, x | \hat{\theta}_{SMM})^T W \, d(\tilde{x}, x | \hat{\theta}_{SMM})]^{-1}
> $$
^thm-smm-varcov

**Computing the Jacobian numerically:** Use centered finite differences:
$$
\frac{\partial e_r}{\partial \theta_k} \approx \frac{e_r(\theta + h e_k) - e_r(\theta - h e_k)}{2h}
$$

where $e_k$ is the $k$-th unit vector and $h$ is the step size. The step size $h$ must be large enough that the criterion function changes detectably — see [[Practical Issues in Simulation Estimation]] for step-size guidelines.

## Identification

A model is:
- **Exactly identified** if $K = R$ (parameters = moments): unique solution, no overidentifying restrictions to test
- **Overidentified** if $K < R$: more moments than needed, enables specification testing (J-test — see [[SMM Copula Specification Testing]])
- **Underidentified** if $K > R$: cannot estimate $\theta$ consistently

> [!important] Practical Moment Selection
> Not all moments are orthogonal — some moments convey the same information and don't separately identify additional parameters. Good practice:
> 1. Choose moments with a clear theoretical connection to specific parameters
> 2. Overidentify the model ($R > K$) to gain efficiency and enable specification testing
> 3. **Out-of-sample moment check**: after estimation, verify that data moments *not used in estimation* are matched by the estimated model — a powerful diagnostic

## Connections

- [[Method of Simulated Moments]] — the estimator these weighting strategies apply to
- [[SMM Copula Specification Testing]] — J-test for overidentified copula SMM (uses efficient $W$)
- [[SMM Copula Asymptotic Theory]] — Propositions 2-3 cover variance estimation for the copula case
- [[Practical Issues in Simulation Estimation]] — step-size guidelines for numerical Jacobians
- [[Standard Errors and Clustering]] — analogous HAC issues in GMM/OLS
- [[Indirect Inference]] — uses auxiliary model parameters as moments; the same W strategies apply

## See Also

- [[SMM Python Implementation]] — Python code implementing two-step W and Jacobian-based Σ̂
- [[Method of Simulated Moments]] — consistency and asymptotic normality theorems
- [[Practical Issues in Simulation Estimation]] — common random numbers, step-size selection

## Sources

- [Computational Methods for Economists — Ch. 19](https://opensourceecon.github.io/CompMethods/struct_est/SMM.html) — Evans (2024), Sections 19.2–19.5
- Newey, W.K. and K.D. West (1987), "A Simple, Positive, Semi-Definite, Heteroskedasticity and Autocorrelation Consistent Covariance Matrix," *Econometrica* 55(3), 703–708
- Adda, J. and R. Cooper (2003), *Dynamic Economics*, MIT Press, pp. 82–100
