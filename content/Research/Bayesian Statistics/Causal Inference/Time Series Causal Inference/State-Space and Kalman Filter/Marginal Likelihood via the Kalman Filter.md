---
title: "Marginal Likelihood via the Kalman Filter"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/time-series
  - type/concept
  - doc/textbook
source: "[[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf]]"
source_location: "§12.1-12.3, Thm 12.1-12.3; pp. 174-188"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter"
doc_type: textbook
depends_on:
  - "[[The Kalman Filter]]"
  - "[[Linear-Gaussian State-Space Models]]"
used_by: []
aliases:
  - prediction error decomposition
  - marginal likelihood
  - energy function
  - state-space likelihood
  - Kalman filter likelihood
---

# Marginal Likelihood via the Kalman Filter

> [!summary]
> Running the [[The Kalman Filter|Kalman filter]] not only estimates the state — it also evaluates the **marginal likelihood** $p(\mathbf{y}_{1:T}\mid\boldsymbol\theta)$ of the model parameters $\boldsymbol\theta$, *for free*, as a by-product. The trick is the **prediction-error decomposition**: the joint density of the data factors into a product of one-step predictive densities, each a Gaussian in the filter's innovation $\mathbf{v}_k$ with covariance $\mathbf{S}_k$. This turns an intractable high-dimensional integral over states into a simple recursive sum — which is precisely what lets you put a prior on $\boldsymbol\theta$ and run **MCMC**, MAP optimization, or EM. It is the engine behind parameter inference in [[Bayesian Structural Time-Series Model|BSTS]].

## Overview

To learn parameters $\boldsymbol\theta$ (the entries of $\mathbf{A},\mathbf{H},\mathbf{Q},\mathbf{R},\mathbf{m}_0,\mathbf{P}_0$) we want the marginal posterior $p(\boldsymbol\theta\mid\mathbf{y}_{1:T})\propto p(\mathbf{y}_{1:T}\mid\boldsymbol\theta)\,p(\boldsymbol\theta)$. The states must be integrated out:
$$
p(\boldsymbol\theta\mid\mathbf{y}_{1:T}) = \int p(\mathbf{x}_{0:T},\boldsymbol\theta\mid\mathbf{y}_{1:T})\,\mathrm{d}\mathbf{x}_{0:T}.
$$
Doing this integral directly is intractable (and grows with $T$). The state-space structure dissolves it.

## Main Content

> [!theorem] Theorem: Prediction-error decomposition (Särkkä Thm. 12.1, Eq. 12.5)
> The marginal likelihood factors into one-step predictive densities:
> $$
> p(\mathbf{y}_{1:T}\mid\boldsymbol\theta) = \prod_{k=1}^{T} p(\mathbf{y}_k\mid\mathbf{y}_{1:k-1},\boldsymbol\theta), \tag{12.5}
> $$
> where each term is obtained by integrating the measurement model against the predicted state:
> $$
> p(\mathbf{y}_k\mid\mathbf{y}_{1:k-1},\boldsymbol\theta) = \int p(\mathbf{y}_k\mid\mathbf{x}_k,\boldsymbol\theta)\,p(\mathbf{x}_k\mid\mathbf{y}_{1:k-1},\boldsymbol\theta)\,\mathrm{d}\mathbf{x}_k. \tag{12.6}
> $$
> The predictive $p(\mathbf{x}_k\mid\mathbf{y}_{1:k-1},\boldsymbol\theta)$ is exactly the Kalman **prediction step**, and the normalizer $Z_k$ of the **update step** *is* this term — so the filter computes it at no extra cost.
^thm-ped

> [!theorem] Theorem: Energy function for the linear-Gaussian model (Särkkä Thm. 12.3, Eq. 12.38)
> Define the **energy function** (unnormalized negative log-posterior) $\varphi_T(\boldsymbol\theta) = -\log p(\mathbf{y}_{1:T}\mid\boldsymbol\theta) - \log p(\boldsymbol\theta)$. For the linear-Gaussian model it is built recursively alongside the Kalman filter:
> $$
> \varphi_k(\boldsymbol\theta) = \varphi_{k-1}(\boldsymbol\theta) + \tfrac{1}{2}\log\bigl|2\pi\,\mathbf{S}_k(\boldsymbol\theta)\bigr| + \tfrac{1}{2}\,\mathbf{v}_k^{\mathsf T}(\boldsymbol\theta)\,\mathbf{S}_k^{-1}(\boldsymbol\theta)\,\mathbf{v}_k(\boldsymbol\theta), \tag{12.38}
> $$
> started from $\varphi_0(\boldsymbol\theta)=-\log p(\boldsymbol\theta)$, where $\mathbf{v}_k$ (innovation) and $\mathbf{S}_k$ (innovation covariance) come straight from the [[The Kalman Filter|Kalman update step]]. Each one-step predictive density is the Gaussian
> $$
> p(\mathbf{y}_k\mid\mathbf{y}_{1:k-1},\boldsymbol\theta) = \mathcal{N}\bigl(\mathbf{y}_k \mid \mathbf{H}_k\mathbf{m}_k^-,\; \mathbf{S}_k\bigr), \qquad \mathbf{S}_k = \mathbf{H}_k\mathbf{P}_k^-\mathbf{H}_k^{\mathsf T}+\mathbf{R}_k. \tag{12.41}
> $$
> The marginal parameter posterior is then $p(\boldsymbol\theta\mid\mathbf{y}_{1:T}) \propto \exp(-\varphi_T(\boldsymbol\theta))$.
^thm-energy

> [!note] Why this makes inference tractable
> - **The intractable integral is gone.** The full likelihood is a *recursive sum of cheap Gaussian terms* — one Kalman pass evaluates $\varphi_T(\boldsymbol\theta)$ exactly for any $\boldsymbol\theta$.
> - **MAP / ML estimates:** $\hat{\boldsymbol\theta}^{\mathrm{MAP}} = \arg\min_{\boldsymbol\theta}\varphi_T(\boldsymbol\theta)$ (Eq. 12.13); the ML estimate is the same with a flat prior $p(\boldsymbol\theta)\propto 1$.
> - **MCMC:** Metropolis–Hastings only needs the *unnormalized* posterior, i.e. $\varphi_T(\boldsymbol\theta)$; the normalizing constant $p(\mathbf{y}_{1:T})$ is never required. The acceptance ratio uses energy differences directly:
>   $$
>   \alpha_i = \min\Bigl\{1,\;\exp\bigl(\varphi_T(\boldsymbol\theta^{(i-1)})-\varphi_T(\boldsymbol\theta^{*})\bigr)\,\tfrac{q(\boldsymbol\theta^{(i-1)}\mid\boldsymbol\theta^{*})}{q(\boldsymbol\theta^{*}\mid\boldsymbol\theta^{(i-1)})}\Bigr\}. \tag{12.17}
>   $$
>   So a single Kalman-filter run per proposal gives a full MCMC sampler over model parameters.
> - **EM:** Fisher's identity expresses $\nabla\varphi_T$ as an expectation of the complete-data score under the smoothing distribution — the [[The RTS Smoother|RTS smoother]] supplies the required sufficient statistics (Särkkä §12.3, Eq. 12.32).
> - **Laplace approximation:** $p(\boldsymbol\theta\mid\mathbf{y}_{1:T})\approx\mathcal{N}(\boldsymbol\theta\mid\hat{\boldsymbol\theta}^{\mathrm{MAP}}, [\mathbf{H}(\hat{\boldsymbol\theta}^{\mathrm{MAP}})]^{-1})$ using the Hessian of $\varphi_T$ (Eq. 12.15).
^why

## Examples

> [!example] Posterior of the noise variance in the random walk (Särkkä Ex. 12.1)
> For the Gaussian random-walk model, fix the process variance and treat the measurement variance $R$ as the unknown $\theta$. With a flat prior $p(R)\propto 1$, running the scalar Kalman filter and accumulating $\varphi_T(R)$ from Eq. (12.38) yields $p(R\mid y_{1:T})\propto\exp(-\varphi_T(R))$. Särkkä's Fig. 12.1 shows the true $R$ sits in the high-density region — but the MAP/ML point estimate is biased *low* relative to the truth, illustrating why full posterior (MCMC) treatment beats point estimation.

> [!example] Worked energy step (local level model)
> Per time step, with scalar innovation $v_k=y_k-m_k^-$ and $S_k=P_k^-+R$:
> $$
> \varphi_k = \varphi_{k-1} + \tfrac{1}{2}\log(2\pi S_k) + \tfrac{v_k^2}{2 S_k}.
> $$
> Summing over $k$ and adding $-\log p(\theta)$ gives the negative log-posterior used inside an MCMC loop.

## Connections

- [[The Kalman Filter]] — supplies the innovations $\mathbf{v}_k$ and covariances $\mathbf{S}_k$ that form every likelihood term
- [[The RTS Smoother]] — supplies smoothing statistics for EM / Fisher's-identity gradients
- [[Linear-Gaussian State-Space Models]] — the parameters $\boldsymbol\theta=(\mathbf{A},\mathbf{H},\mathbf{Q},\mathbf{R},\dots)$ being inferred
- [[State-Space Models and the Kalman Filter - Overview]] — pipeline context

## See Also

- [[Bayesian Structural Time-Series Model]] — BSTS marginal likelihood / sampler is built on exactly this prediction-error decomposition
- [[MCMC Inference for CausalImpact]] — the Gibbs sampler draws variances/coefficients conditional on states, the complement to integrating states out here
- [[Spike-and-Slab Prior for Covariate Selection]] — variable selection relies on tractable marginal likelihoods of competing models
- [[Single Marketing Time Series]] — ARIMA likelihoods are evaluated the same way via the Kalman filter
