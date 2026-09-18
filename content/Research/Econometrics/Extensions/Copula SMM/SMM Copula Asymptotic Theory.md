---
title: "SMM Copula Asymptotic Theory"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Oh & Patton (2011), Sections 2.2-2.4, pp. 6-13"
date_ingested: 2026-04-11
date_updated: 2026-07-27
folder: "Econometrics/Extensions/Copula SMM"
doc_type: paper
depends_on:
  - "[[SMM Estimator for Copulas]]"
  - "[[Method of Simulated Moments]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[SMM Copula Specification Testing]]"
  - "[[SMM Copula Simulation and Application]]"
aliases:
  - SMM Copula Consistency
  - SMM Copula Asymptotic Normality
  - Oh-Patton Asymptotic Theory
---

# SMM Copula Asymptotic Theory

> [!summary]
> Oh and Patton (2011) establish the consistency (Proposition 1) and asymptotic normality (Proposition 2) of their SMM estimator for copula parameters, and provide a consistent estimator of the asymptotic covariance matrix (Proposition 3). The key technical challenges are: (1) the objective function $Q_{T,S}(\boldsymbol{\theta})$ is not continuous in $\boldsymbol{\theta}$ because the simulated moments involve empirical distribution functions, and (2) a standard law of large numbers is unavailable for the moment functions. These are overcome using empirical process theory (Fermanian, Radulović, and Wegkamp, 2004; Rémillard, 2010) and stochastic equicontinuity arguments (Andrews, 1994; Newey and McFadden, 1994). A surprising result: estimation error from the first-stage marginal parameters $\hat{\phi}$ does **not** enter the asymptotic distribution of the copula parameter estimator.

## Overview

The estimation problem differs from standard GMM or M-estimation in two important ways:

1. **Non-continuity**: The objective function $Q_{T,S}(\boldsymbol{\theta})$ is not continuous in $\boldsymbol{\theta}$ because the simulated moments $\tilde{\mathbf{m}}_S(\boldsymbol{\theta})$ involve indicator functions through the EDF. For example, simulated quantile dependence $\tilde{\tau}_q^{ij}(\boldsymbol{\theta})$ takes values in the discrete set $\{0, \frac{1}{S_q}, \frac{2}{S_q}, \ldots, \frac{S}{S_q}\}$.

2. **No standard LLN**: Both $\hat{\mathbf{m}}_T$ and $\tilde{\mathbf{m}}_S(\boldsymbol{\theta})$ involve empirical distribution functions, so a standard law of large numbers for the pointwise convergence of $\mathbf{g}_{T,S}(\boldsymbol{\theta})$ is not available.

## Assumptions for Consistency

> [!definition] Definition: Assumption 1 (Distributional Smoothness)
> *(i)* The distributions $\mathbf{F}_\eta$ and $\mathbf{F}_x$ are **continuous**.
>
> *(ii)* Every bivariate marginal copula $C_{ij}$ of $\mathbf{C}$ has **continuous partial derivatives** with respect to $u_i$ and $u_j$.
>
> **Role:** Assumption 1(i) ensures that the marginal CDFs are well-defined and invertible. Assumption 1(ii) is needed for the copula density to exist and for the empirical copula process to converge.
^assumption-1

> [!definition] Definition: Assumption 2 (Time Series Regularity)
> These conditions control the estimation error from the first-stage marginal models. Define:
> - $\boldsymbol{\gamma}_{0t} = \boldsymbol{\sigma}_t^{-1}(\hat{\phi}) \dot{\boldsymbol{\mu}}_t(\hat{\phi})$ and $\boldsymbol{\gamma}_{1kt} = \boldsymbol{\sigma}_t^{-1}(\hat{\phi}) \dot{\boldsymbol{\sigma}}_{kt}(\hat{\phi})$
> - $\mathbf{d}_t = \boldsymbol{\eta}_t - \hat{\boldsymbol{\eta}}_t - \left(\boldsymbol{\gamma}_{0t} + \sum_{k=1}^N \eta_{kt} \boldsymbol{\gamma}_{1kt}\right)(\hat{\phi} - \phi_0)$
>
> Conditions:
> *(i)* $\frac{1}{T}\sum_{t=1}^T \boldsymbol{\gamma}_{0t} \xrightarrow{p} \boldsymbol{\Gamma}_0$ and $\frac{1}{T}\sum_{t=1}^T \boldsymbol{\gamma}_{1kt} \xrightarrow{p} \boldsymbol{\Gamma}_{1k}$ (deterministic limits)
>
> *(ii)* Bounded second moments of $\boldsymbol{\gamma}_{0t}$ and $\boldsymbol{\gamma}_{1kt}$
>
> *(iii)* Tightness condition on $\max_{1 \leq t \leq T} \|\mathbf{d}_t\| / r_t$ for some summable sequence $r_t$
>
> *(iv)* $\max_{1 \leq t \leq T} \|\boldsymbol{\gamma}_{0t}\| / \sqrt{T} = o_p(1)$ and $\max_{1 \leq t \leq T} \eta_{kt} \|\boldsymbol{\gamma}_{1kt}\| / \sqrt{T} = o_p(1)$
>
> *(v)* $\left(\alpha_T, \sqrt{T}(\hat{\phi} - \phi_0)\right)$ weakly converges to a continuous Gaussian process in $[0,1]^N \times \mathbb{R}^r$, where $\alpha_T$ is the empirical copula process
>
> *(vi)* Bounded and continuous partial derivatives of $\mathbf{F}_\eta$
>
> **Role:** These conditions are standard for time series with estimated marginal parameters. They are satisfied by common models (ARMA, GARCH, stochastic volatility). If the data are *iid* (i.e., $\boldsymbol{\mu}_t$ and $\boldsymbol{\sigma}_t$ are known constants, or $\phi_0$ is known), only Assumption 1 is needed.
^assumption-2

> [!definition] Definition: Assumption 3 (Identification and Compactness)
> *(i)* $\mathbf{g}_0(\boldsymbol{\theta}) \neq \mathbf{0}$ for $\boldsymbol{\theta} \neq \boldsymbol{\theta}_0$ (global identification)
>
> *(ii)* $\Theta$ is **compact**
>
> *(iii)* Every bivariate marginal copula $C_{ij}(u_i, u_j; \boldsymbol{\theta})$ of $\mathbf{C}(\boldsymbol{\theta})$ on $(u_i, u_j) \in (0,1) \times (0,1)$ is **Lipschitz continuous** on $\Theta$
>
> *(iv)* $\hat{\mathbf{W}}_T$ is $O_p(1)$ and converges in probability to $\mathbf{W}_0$, a positive definite matrix
>
> **Role:** 3(i) is the standard identification condition. 3(ii) is standard. 3(iii) is needed to prove the stochastic Lipschitz continuity (and hence stochastic equicontinuity) of $\mathbf{g}_{T,S}(\boldsymbol{\theta})$. Many bivariate parametric copulas satisfy 3(iii). 3(iv) is standard for the weight matrix.
^assumption-3

## Proposition 1: Consistency

> [!theorem] Theorem: Consistency of the SMM Copula Estimator (Oh & Patton, Proposition 1)
> **Suppose that Assumptions 1, 2, and 3 hold.** Then:
> $$
> \hat{\boldsymbol{\theta}}_{T,S} \xrightarrow{p} \boldsymbol{\theta}_0 \quad \text{as } T, S \to \infty
> $$
>
> **Key features of this result:**
> 1. Consistency holds at **any relative rate** of $T$ and $S$ diverging — unlike standard SMM results (Pakes and Pollard, 1989; McFadden, 1989) which require $T$ and $S$ to diverge at the same rate
> 2. If the population moment function $\mathbf{m}(\boldsymbol{\theta})$ is known in closed form, then GMM is feasible and is equivalent to this estimator with $S/T \to \infty$
>
> **Proof sketch:** The main challenge is establishing that $Q_{T,S}$ uniformly converges in probability to $Q_0$. This requires:
> - Pointwise convergence of $\mathbf{g}_{T,S}(\boldsymbol{\theta})$ to $\mathbf{g}_0(\boldsymbol{\theta}) \equiv \mathbf{m}_0(\boldsymbol{\theta}_0) - \mathbf{m}_0(\boldsymbol{\theta})$ for all $\boldsymbol{\theta} \in \Theta$ (using Theorems 3 and 6 of Fermanian, Radulović, and Wegkamp, 2004, and Corollary 1 of Rémillard, 2010)
> - Stochastic equicontinuity of $\mathbf{g}_{T,S}(\boldsymbol{\theta})$ via the Lipschitz condition (Assumption 3(iii))
> - Application of Theorem 2.1 of Newey and McFadden (1994) for uniform convergence
^prop-1-consistency

## Assumptions for Asymptotic Normality

> [!definition] Definition: Assumption 4 (Differentiability and Approximate Minimization)
> *(i)* $\boldsymbol{\theta}_0$ is an **interior point** of $\Theta$
>
> *(ii)* $\mathbf{g}_0(\boldsymbol{\theta})$ is **differentiable** at $\boldsymbol{\theta}_0$ with derivative $\mathbf{G}_0$ such that $\mathbf{G}_0' \mathbf{W}_0 \mathbf{G}_0$ is **nonsingular**
>
> *(iii)* $\mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S})' \hat{\mathbf{W}}_T \mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S}) \leq \inf_{\boldsymbol{\theta} \in \Theta} \mathbf{g}_{T,S}(\boldsymbol{\theta})' \hat{\mathbf{W}}_T \mathbf{g}_{T,S}(\boldsymbol{\theta}) + o_p(\min(T,S)^{-1})$
>
> **Role:** 4(i) is standard for Taylor expansion. 4(ii) requires the *population* moment function to be differentiable even though the finite-sample counterpart is not — this is common in simulation-based estimation. The nonsingularity of $\mathbf{G}_0' \mathbf{W}_0 \mathbf{G}_0$ is sufficient for local identification. 4(iii) is the approximate minimization condition, standard in simulation-based estimation (Newey and McFadden, 1994). The $o_p$ term depends on the smaller of $T$ or $S$.
^assumption-4

## Proposition 2: Asymptotic Normality

> [!theorem] Theorem: Asymptotic Normality of the SMM Copula Estimator (Oh & Patton, Proposition 2)
> **Suppose that Assumptions 1, 2, 3, and 4 hold.** Then the asymptotic distribution depends on the relative rate at which $T$ and $S$ diverge:
>
> **(i)** If $S/T \to \infty$ as $T, S \to \infty$:
> $$
> \sqrt{T}\left(\hat{\boldsymbol{\theta}}_{T,S} - \boldsymbol{\theta}_0\right) \xrightarrow{d} N(\mathbf{0}, \boldsymbol{\Omega}_0) \quad \text{as } T, S \to \infty
> $$
>
> **(ii)** If $S/T \to k \in (0, \infty)$ as $T, S \to \infty$:
> $$
> \sqrt{T}\left(\hat{\boldsymbol{\theta}}_{T,S} - \boldsymbol{\theta}_0\right) \xrightarrow{d} N\left(\mathbf{0}, \left(1 + \frac{1}{k}\right) \boldsymbol{\Omega}_0\right) \quad \text{as } T, S \to \infty
> $$
>
> **(iii)** If $S/T \to 0$ as $T, S \to \infty$:
> $$
> \sqrt{S}\left(\hat{\boldsymbol{\theta}}_{T,S} - \boldsymbol{\theta}_0\right) \xrightarrow{d} N(\mathbf{0}, \boldsymbol{\Omega}_0) \quad \text{as } T, S \to \infty
> $$
>
> where:
> $$
> \boldsymbol{\Omega}_0 = (\mathbf{G}_0' \mathbf{W}_0 \mathbf{G}_0)^{-1} \mathbf{G}_0' \mathbf{W}_0 \boldsymbol{\Sigma}_0 \mathbf{W}_0 \mathbf{G}_0 (\mathbf{G}_0' \mathbf{W}_0 \mathbf{G}_0)^{-1}
> $$
>
> and $\boldsymbol{\Sigma}_0 \equiv \text{avar}[\hat{\mathbf{m}}_T]$ is the asymptotic variance of the sample dependence measures.
>
> **Interpretation:**
> - Case (i): $S$ grows much faster than $T$, so simulation error is negligible. The asymptotic variance is the same as the (infeasible) GMM estimator — the familiar sandwich form.
> - Case (ii): $S$ and $T$ grow proportionally. The $(1 + 1/k)$ factor captures the efficiency loss from simulation. Setting $S = 25T$ gives a factor of $1.04$ (4% inflation).
> - Case (iii): $S$ grows much slower than $T$ — the convergence rate is $\sqrt{S}$ not $\sqrt{T}$, but the asymptotic covariance is the same as Case (i).
>
> **Efficient weight matrix:** If $\mathbf{W}_0 = \boldsymbol{\Sigma}_0^{-1}$, then $\boldsymbol{\Omega}_0$ simplifies to $(\mathbf{G}_0' \boldsymbol{\Sigma}_0^{-1} \mathbf{G}_0)^{-1}$.
^prop-2-normality

> [!important] Surprising Result: First-Stage Estimation Error Is Irrelevant
> Chen and Fan (2006) and Rémillard (2010) show that estimation error from $\hat{\phi}$ does **not** enter the asymptotic distribution of the copula parameter estimator for maximum likelihood or (analytical) moment-based estimators. Proposition 2 extends this surprising result to SMM-type estimators. This means the asymptotic variance $\boldsymbol{\Omega}_0$ is the same whether $\phi_0$ is known or estimated — a practically very convenient property.

## Proof Strategy

The proof of Proposition 2 for the case $S/T \to k \in (0, \infty)$ proceeds as follows:

**Step 1:** Establish the asymptotic normality of the moment function at the true parameter:

$$
\sqrt{T} \mathbf{g}_{T,S}(\boldsymbol{\theta}_0) = \underbrace{\sqrt{T}(\hat{\mathbf{m}}_T - \mathbf{m}_0(\boldsymbol{\theta}_0))}_{\xrightarrow{d} N(\mathbf{0}, \boldsymbol{\Sigma}_0)} - \underbrace{\sqrt{T/S}}_{\to 1/\sqrt{k}} \cdot \underbrace{\sqrt{S}(\tilde{\mathbf{m}}_S(\boldsymbol{\theta}_0) - \mathbf{m}_0(\boldsymbol{\theta}_0))}_{\xrightarrow{d} N(\mathbf{0}, \boldsymbol{\Sigma}_0)}
$$

Since $\hat{\mathbf{m}}_T$ and $\tilde{\mathbf{m}}_S$ are independent, $\sqrt{T} \mathbf{g}_{T,S}(\boldsymbol{\theta}_0) \xrightarrow{d} N(\mathbf{0}, (1 + 1/k) \boldsymbol{\Sigma}_0)$.

**Step 2:** Establish stochastic equicontinuity of $\mathbf{v}_{T,S}(\boldsymbol{\theta}) = \sqrt{T}[\mathbf{g}_{T,S}(\boldsymbol{\theta}) - \mathbf{g}_0(\boldsymbol{\theta})]$ — shown in the supplemental appendix using the type II class of functions (Andrews, 1994).

**Step 3:** Apply Theorem 7.2 of Newey and McFadden (1994) to obtain the standard GMM expansion:

$$
\sqrt{T} \mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S}) = \sqrt{T} \mathbf{g}_{T,S}(\boldsymbol{\theta}_0) + \hat{\mathbf{G}}_{T,S} \cdot \sqrt{T}(\hat{\boldsymbol{\theta}}_{T,S} - \boldsymbol{\theta}_0) + \mathbf{R}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S})
$$

where the remainder $\mathbf{R}_{T,S} = o_p(1)$.

## Proposition 3: Consistent Variance Estimation

> [!theorem] Theorem: Consistent Estimation of the Asymptotic Covariance (Oh & Patton, Proposition 3)
> **Suppose that all assumptions of Proposition 2 are satisfied**, and that:
> - $\varepsilon_{T,S} \to 0$
> - $\varepsilon_{T,S} \times \min(\sqrt{T}, \sqrt{S}) \to \infty$
> - $B \to \infty$ (number of bootstrap replications)
>
> Then:
> $$
> \hat{\boldsymbol{\Sigma}}_{T,B} \xrightarrow{p} \boldsymbol{\Sigma}_0, \qquad \hat{\mathbf{G}}_{T,S} \xrightarrow{p} \mathbf{G}_0, \qquad \hat{\boldsymbol{\Omega}}_{T,S,B} \xrightarrow{p} \boldsymbol{\Omega}_0
> $$
>
> **Bootstrap estimation of $\boldsymbol{\Sigma}_0$:**
> 1. Sample with replacement from $\{\hat{\boldsymbol{\eta}}_t\}_{t=1}^T$ to obtain $\{\hat{\boldsymbol{\eta}}_t^{(b)}\}_{t=1}^T$. Repeat $B$ times.
> 2. For each bootstrap sample $b$, compute the sample moments $\hat{\mathbf{m}}_T^{(b)}$
> 3. Estimate:
>    $$
>    \hat{\boldsymbol{\Sigma}}_{T,B} = \frac{T}{B} \sum_{b=1}^B \left(\hat{\mathbf{m}}_T^{(b)} - \hat{\mathbf{m}}_T\right)\left(\hat{\mathbf{m}}_T^{(b)} - \hat{\mathbf{m}}_T\right)'
>    $$
>
> **Numerical derivative estimation of $\mathbf{G}_0$:**
> The $k$-th column of $\hat{\mathbf{G}}_{T,S}$ is:
> $$
> \hat{\mathbf{G}}_{T,S,k} = \frac{\mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S} + \mathbf{e}_k \varepsilon_{T,S}) - \mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S} - \mathbf{e}_k \varepsilon_{T,S})}{2 \varepsilon_{T,S}}
> $$
> where $\mathbf{e}_k$ is the $k$-th unit vector.
>
> **Full covariance estimator:**
> $$
> \hat{\boldsymbol{\Omega}}_{T,S,B} = \left(\hat{\mathbf{G}}_{T,S}' \hat{\mathbf{W}}_T \hat{\mathbf{G}}_{T,S}\right)^{-1} \hat{\mathbf{G}}_{T,S}' \hat{\mathbf{W}}_T \hat{\boldsymbol{\Sigma}}_{T,B} \hat{\mathbf{W}}_T \hat{\mathbf{G}}_{T,S} \left(\hat{\mathbf{G}}_{T,S}' \hat{\mathbf{W}}_T \hat{\mathbf{G}}_{T,S}\right)^{-1}
> $$
^prop-3-variance

> [!warning] Critical Step-Size Requirement
> The step size $\varepsilon_{T,S}$ for the numerical derivative must go to zero, but **slower** than the inverse of the convergence rate: $\varepsilon_{T,S} \times \min(\sqrt{T}, \sqrt{S}) \to \infty$.
>
> For $T = 1000$, this means $\varepsilon_{T,S} > 1/\sqrt{1000} \approx 0.032$. Setting $\varepsilon_{T,S} = 0.01$ or $0.1$ works well; setting it to $0.001$ or smaller (e.g., MATLAB's default $6 \times 10^{-6}$) produces **severely distorted** coverage rates.
>
> See [[SMM Copula Simulation and Application]] for Monte Carlo evidence on step-size sensitivity.

## Connections

- Builds on [[SMM Estimator for Copulas]] — the estimator whose properties are established here
- [[Dependence Measures for Copulas]] — the moments whose asymptotic behavior drives $\boldsymbol{\Sigma}_0$
- [[Method of Simulated Moments]] — general MSM theory that this extends to the copula setting
- [[Factor Copulas - Overview]] — the primary copula model estimated by this SMM procedure in Oh & Patton (2012)
- [[Indirect Inference]] — a related simulation-based estimation framework; II uses an auxiliary model while SMM matches moments directly
- [[SMM Copula Specification Testing]] — uses these asymptotic results for the J-test
- [[SMM Copula Simulation and Application]] — verifies these results in finite samples

## See Also

- [[SMM Estimator for Copulas]] — estimator definition
- [[SMM Copula Specification Testing]] — over-identifying restrictions test
- [[SMM Copula Simulation and Application]] — Monte Carlo evidence

## Sources

- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), Sections 2.2-2.4, Appendix
- Fermanian, J., D. Radulović, and M. Wegkamp (2004), "Weak Convergence of Empirical Copula Process," *Bernoulli* 10, 847-860
- Rémillard, B. (2010), "Goodness-of-fit Tests for Copulas of Multivariate Time Series," working paper
- Newey, W.K. and D. McFadden (1994), "Large Sample Estimation and Hypothesis Testing," *Handbook of Econometrics* 4, 2111-2245
- Andrews, D.W.K. (1994), "Empirical Process Methods in Econometrics," *Handbook of Econometrics* 4, 2247-2294
