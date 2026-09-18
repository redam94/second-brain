---
title: "The RTS Smoother"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/time-series
  - type/theorem
  - doc/textbook
source: "[[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf]]"
source_location: "§8.1-8.2, Thm 8.1-8.2; pp. 134-139"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter"
doc_type: textbook
depends_on:
  - "[[The Kalman Filter]]"
  - "[[Linear-Gaussian State-Space Models]]"
used_by:
  - "[[Marginal Likelihood via the Kalman Filter]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
aliases:
  - RTS smoother
  - Rauch-Tung-Striebel smoother
  - Kalman smoother
  - fixed-interval smoother
  - forward-backward smoothing
---

# The RTS Smoother

> [!summary]
> The **Rauch–Tung–Striebel (RTS) smoother** (a.k.a. the **Kalman smoother**) is the closed-form solution to the Bayesian *smoothing* problem for a [[Linear-Gaussian State-Space Models|linear-Gaussian model]]: it computes $p(\mathbf{x}_k \mid \mathbf{y}_{1:T})$, the posterior of each state given the **entire** data record, not just the past. It is a **backward recursion** run after the forward [[The Kalman Filter|Kalman filter]]: starting from the last filtered estimate it sweeps $k = T-1, \dots, 0$, correcting each filtered $(\mathbf{m}_k,\mathbf{P}_k)$ using future information through a **smoother gain** $\mathbf{G}_k$. Smoothed estimates are always at least as precise as filtered ones.

## Overview

The [[The Kalman Filter|Kalman filter]] gives the *filtering* distribution $p(\mathbf{x}_k\mid\mathbf{y}_{1:k})$ — conditioned only on data up to $k$. **Bayesian smoothing** instead conditions on all $T$ measurements, $p(\mathbf{x}_k\mid\mathbf{y}_{1:T})$ with $T>k$, so each state estimate benefits from future observations. This is the natural object for retrospective / counterfactual analysis (e.g. inferring a latent trend across a whole sample). Särkkä derives the general backward recursion (Thm. 8.1) then its linear-Gaussian special case, the RTS smoother (Thm. 8.2).

## Main Content

> [!theorem] Theorem: Bayesian (fixed-interval) smoothing equations (Särkkä Thm. 8.1)
> The smoothed distributions $p(\mathbf{x}_k\mid\mathbf{y}_{1:T})$ for $k<T$ satisfy the backward recursion
> $$
> p(\mathbf{x}_{k+1}\mid\mathbf{y}_{1:k}) = \int p(\mathbf{x}_{k+1}\mid\mathbf{x}_k)\, p(\mathbf{x}_k\mid\mathbf{y}_{1:k})\,\mathrm{d}\mathbf{x}_k,
> $$
> $$
> p(\mathbf{x}_k\mid\mathbf{y}_{1:T}) = p(\mathbf{x}_k\mid\mathbf{y}_{1:k})\int \left[\frac{p(\mathbf{x}_{k+1}\mid\mathbf{x}_k)\,p(\mathbf{x}_{k+1}\mid\mathbf{y}_{1:T})}{p(\mathbf{x}_{k+1}\mid\mathbf{y}_{1:k})}\right]\mathrm{d}\mathbf{x}_{k+1}, \tag{8.2}
> $$
> where $p(\mathbf{x}_k\mid\mathbf{y}_{1:k})$ is the filtering distribution and $p(\mathbf{x}_{k+1}\mid\mathbf{y}_{1:k})$ is the one-step prediction. It is run **backwards**, initialized at the filtering distribution of the last step $p(\mathbf{x}_T\mid\mathbf{y}_{1:T})$.
^thm-bayes-smooth

> [!theorem] Theorem: RTS smoother (Särkkä Thm. 8.2)
> For the linear-Gaussian model, the smoothed distribution is Gaussian, $p(\mathbf{x}_k\mid\mathbf{y}_{1:T})=\mathcal{N}(\mathbf{x}_k\mid\mathbf{m}_k^s,\mathbf{P}_k^s)$, computed by the **backward recursion** for $k=T-1,\dots,0$:
> $$
> \mathbf{m}_{k+1}^- = \mathbf{A}_k\,\mathbf{m}_k
> $$
> $$
> \mathbf{P}_{k+1}^- = \mathbf{A}_k\,\mathbf{P}_k\,\mathbf{A}_k^{\mathsf T} + \mathbf{Q}_k
> $$
> $$
> \mathbf{G}_k = \mathbf{P}_k\,\mathbf{A}_k^{\mathsf T}\,[\mathbf{P}_{k+1}^-]^{-1} \qquad \text{(smoother gain)}
> $$
> $$
> \mathbf{m}_k^s = \mathbf{m}_k + \mathbf{G}_k\,[\,\mathbf{m}_{k+1}^s - \mathbf{m}_{k+1}^-\,]
> $$
> $$
> \mathbf{P}_k^s = \mathbf{P}_k + \mathbf{G}_k\,[\,\mathbf{P}_{k+1}^s - \mathbf{P}_{k+1}^-\,]\,\mathbf{G}_k^{\mathsf T} \tag{8.6}
> $$
> where $\mathbf{m}_k,\mathbf{P}_k$ are the **filtered** mean/covariance from the [[The Kalman Filter|Kalman filter]]. The recursion is **initialized at the last time step** with $\mathbf{m}_T^s=\mathbf{m}_T$, $\mathbf{P}_T^s=\mathbf{P}_T$.
^thm-rts

> [!note] Reading the equations
> - The first two lines are *exactly the Kalman prediction step* (Eq. 4.20); since the filter already computes $\mathbf{m}_{k+1}^-,\mathbf{P}_{k+1}^-$, they can be **stored during the forward pass** to avoid recomputation. The gains $\mathbf{G}_k$ can likewise be precomputed.
> - $\mathbf{G}_k=\mathbf{P}_k\mathbf{A}_k^{\mathsf T}[\mathbf{P}_{k+1}^-]^{-1}$ is the **smoother gain**; the bracket $\mathbf{m}_{k+1}^s-\mathbf{m}_{k+1}^-$ is the *discrepancy between the smoothed future and what the filter predicted for it* — the correction that future data injects into the present.
> - **Smoothing never increases uncertainty:** $\mathbf{P}_k^s \preceq \mathbf{P}_k$ for $k<T$, with equality only at $k=T$ (the endpoint, which has no future to borrow from). This is the *forward–backward* structure: one Kalman pass forward, one RTS pass backward.
> - **Derivation** (Särkkä §8.2): via the Gaussian conditioning lemmas applied to $p(\mathbf{x}_k,\mathbf{x}_{k+1}\mid\mathbf{y}_{1:k})$ and the Markov property $p(\mathbf{x}_k\mid\mathbf{x}_{k+1},\mathbf{y}_{1:T})=p(\mathbf{x}_k\mid\mathbf{x}_{k+1},\mathbf{y}_{1:k})$.
> - An **alternative two-filter smoother** (Fraser–Potter / Kitagawa) factors $p(\mathbf{x}_k\mid\mathbf{y}_{1:T})\propto p(\mathbf{x}_k\mid\mathbf{y}_{1:k-1})\,p(\mathbf{y}_{k:T}\mid\mathbf{x}_k)$ combining a forward and a backward filter; Särkkä prefers the RTS forward–backward form (§8.3).
^reading

> [!note] Algorithm
> ```text
> run Kalman filter forward, store m_k, P_k, m⁻_{k+1}, P⁻_{k+1}  for all k
> initialize  m_T^s = m_T ,  P_T^s = P_T
> for k = T-1 down to 0:
>   G_k   = P_k Aᵀ (P⁻_{k+1})⁻¹
>   m_k^s = m_k + G_k (m_{k+1}^s − m⁻_{k+1})
>   P_k^s = P_k + G_k (P_{k+1}^s − P⁻_{k+1}) G_kᵀ
> ```
^algorithm

## Examples

> [!example] RTS smoother for the Gaussian random walk (Särkkä Ex. 8.1)
> For the scalar local-level model the backward recursion is
> $$
> m_{k+1}^- = m_k, \qquad P_{k+1}^- = P_k + Q,
> $$
> $$
> m_k^s = m_k + \frac{P_k}{P_{k+1}^-}\,(m_{k+1}^s - m_{k+1}^-), \qquad P_k^s = P_k + \left(\frac{P_k}{P_{k+1}^-}\right)^2\,[\,P_{k+1}^s - P_{k+1}^-\,]. \tag{8.16}
> $$
> where $m_k,P_k$ are the filtered values from Kalman Ex. 4.2. Särkkä's Fig. 8.2 shows the **smoother variance is uniformly below the filter variance**, except at the final step where they coincide.

> [!example] RTS smoother for car tracking (Särkkä Ex. 8.2)
> Applying the backward recursion to the 4-D car-tracking filter lowers the position RMSE from $0.43$ (Kalman filter) to $0.27$ (RTS smoother): conditioning each position on the whole trajectory produces a visibly smoother, more accurate estimate.

## Connections

- [[The Kalman Filter]] — supplies the filtered $(\mathbf{m}_k,\mathbf{P}_k)$ and predicted $(\mathbf{m}_{k+1}^-,\mathbf{P}_{k+1}^-)$ this recursion consumes
- [[Linear-Gaussian State-Space Models]] — the model being smoothed
- [[Marginal Likelihood via the Kalman Filter]] — smoothing supplies the sufficient statistics for EM-based parameter estimation (Fisher's identity)
- [[State-Space Models and the Kalman Filter - Overview]] — pipeline context

## See Also

- [[MCMC Inference for CausalImpact]] — the Durbin–Koopman *simulation* smoother draws state trajectories; the RTS smoother gives their conditional means/covariances
- [[Bayesian Structural Time-Series Model]] — counterfactual estimation conditions latent states on the full pre-period, a smoothing operation
- [[Local Linear Trend and Seasonality]] — the latent components recovered by smoothing
