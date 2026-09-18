---
title: Bayesian Filtering and Smoothing
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 5, pp. 42-48"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Gaussian Distributions and Algebra]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[ODE Filters and Smoothers]]"
  - "[[Theory of ODE Filters and Smoothers]]"
  - "[[Solving ODEs as Inference]]"
  - "[[Classical ODE Solvers as Regression]]"
aliases:
  - Filtering and Smoothing
  - Message Passing on Chains
---
# Bayesian Filtering and Smoothing
> [!summary]
> On a linear-Gaussian state-space model, exact Bayesian inference over the latent states is carried out by the **Kalman filter** (a forward pass of alternating predict/update steps) and the **RTS smoother** (a backward pass). Both are just repeated application of [[Gaussian Distributions and Algebra|Gaussian conditioning]] exploiting the Markov property, so the whole posterior stays Gaussian and inference costs $\mathcal{O}(N)$ in the number of time steps — the linear-time realisation of [[Gaussian Process Regression|GP regression]] with Gauss–Markov priors.

## Overview
A Markov chain plus local observations lets inference factorise into *local* messages passed along the chain (belief propagation / sum-product on a chain graph). When every factor is linear-Gaussian, these messages have closed Gaussian form. The forward pass is **filtering**; the backward pass is **smoothing**. This is what makes [[Gauss-Markov Processes and SDEs|Gauss–Markov process]] inference scale linearly instead of the $\mathcal{O}(N^3)$ of general GP regression — the crucial property for numerical solvers that must run indefinitely and refine their estimate over time (quadrature, ODE solvers).

## Main Content
### Markov chain and message passing
> [!definition] Markov chain (Def. 5.1)
> A set of latent states $X=[x_t]_{t=0,\dots,T}$ with joint density $p(X)$ is a **Markov chain** if each state is conditionally independent of all earlier ones given its direct precursor:
> $$
> p(x_t\mid x_0,\dots,x_{t-1})=p(x_t\mid x_{t-1}). \tag{5.1}
> $$
> Observations depend only on the local state: $p(y_t\mid X)=p(y_t\mid x_t)$. These two structural restrictions make inference on the latent states linear in $T$.
^def-markov-chain

Recursive prediction follows from marginalising the chain:
$$
\textbf{Predict:}\quad p(x_t\mid y_{0:t-1})=\int p(x_t\mid x_{t-1})\,p(x_{t-1}\mid y_{0:t-1})\,\mathrm{d}x_{t-1} \tag{5.2}
$$
(the **Chapman–Kolmogorov** equation), and updating by Bayes' theorem:
$$
\textbf{Update:}\quad p(x_t\mid y_{0:t})=\frac{p(y_t\mid x_t)\,p(x_t\mid y_{0:t-1})}{\int p(y_t\mid x_t)\,p(x_t\mid y_{0:t-1})\,\mathrm{d}x_t}. \tag{5.3}
$$
The forward pass ("filtering") produces $p(x_t\mid y_{0:t})$; a backward pass ("smoothing") then computes the full marginals $p(x_t\mid y)$ conditioned on *all* data via
$$
p(x_t\mid y)=p(x_t\mid y_{0:t})\int p(x_{t+1}\mid x_t)\,\frac{p(x_{t+1}\mid y)}{p(x_{t+1}\mid y_{0:t})}\,\mathrm{d}x_{t+1}. \tag{5.7}
$$

### Linear-Gaussian state-space model
> [!definition] Linear (time-invariant) Gaussian state-space model
> $$
> p(x_0)=\mathcal{N}(x_0;m_0,P_0),\quad p(x_{t+1}\mid x_t)=\mathcal{N}(x_{t+1};A_t x_t,Q_t),\quad p(y_t\mid x_t)=\mathcal{N}(y_t;H_t x_t,R_t). \tag{5.8-5.9}
> $$
> Equivalently, dynamic model $x_{t+1}=A_t x_t+\xi_t$, $\xi_t\sim\mathcal{N}(0,Q_t)$, and measurement model $y_t=H_t x_t+\zeta_t$, $\zeta_t\sim\mathcal{N}(0,R_t)$. Here $A_t$ = transition matrix, $H_t$ = measurement/observation matrix, $Q_t$ = process-noise covariance, $R_t$ = observation-noise covariance (all from the discretised SDE, see [[Gauss-Markov Processes and SDEs]]). If the parameters are time-invariant ($A,Q,H,R$), the system is **linear time-invariant (LTI)**.
^def-lg-statespace

### The Kalman filter (predict/update)
> [!theorem] Kálmán filter — one step
> Under the linear-Gaussian model, predictive and updated marginals stay Gaussian. **Predict** (Chapman–Kolmogorov becomes):
> $$
> p(x_{t+1}\mid y_{0:t})=\mathcal{N}(x_{t+1};m^-_{t+1},P^-_{t+1}),\quad m^-_{t+1}=A_t m_t,\quad P^-_{t+1}=A_t P_t A_t^\top+Q_t. \tag{5.10-5.11}
> $$
> **Update** (given the new observation $y_t$), $p(x_t\mid y_{0:t})=\mathcal{N}(x_t;m_t,P_t)$ with
> $$
> z_t := y_t-H_t m^-_t \quad(\text{innovation residual}),
> $$
> $$
> S_t := H_t P^-_t H_t^\top + R_t \quad(\text{innovation covariance}),
> $$
> $$
> K_t := P^-_t H_t^\top S_t^{-1} \quad(\text{Kálmán gain}),
> $$
> $$
> m_t = m^-_t + K_t z_t,\qquad P_t = (I-K_t H_t)P^-_t. \tag{5.12-5.13}
> $$
^thm-kalman-filter

For latent dimension $L$ and observation dimension $V$, one filter step costs $\mathcal{O}(L^3+V^3)$ (matrix products in the predict, inversion of $S_t$ in the update); across $N$ steps the total is $\mathcal{O}(N(L^3+V^3))$ — **linear in time $N$**, with constant memory (Algorithm 5.3, `Predict`).

### The RTS smoother (backward pass)
> [!theorem] Rauch–Tung–Striebel smoother — one step
> The full posterior marginals $p(x_t\mid y)=\mathcal{N}(x_t;m^s_t,P^s_t)$ (conditioned on all past *and future* data) are computed by a backward recursion from $t=T-1$ down to $0$, using the filtering outputs $(m_t,P_t)$ and the next step's predictive $(m^-_{t+1},P^-_{t+1})$ and smoothed $(m^s_{t+1},P^s_{t+1})$:
> $$
> G_t := P_t A_t^\top (P^-_{t+1})^{-1} \quad(\text{smoother gain}),
> $$
> $$
> m^s_t = m_t + G_t\,(m^s_{t+1}-m^-_{t+1}),\qquad P^s_t = P_t + G_t\,(P^s_{t+1}-P^-_{t+1})\,G_t^\top. \tag{5.15}
> $$
> The smoother, touching no observations directly, costs $\mathcal{O}(L^3)$ per step.
^thm-rts-smoother

### Equivalence to GP regression
> [!theorem] Filter+smoother = linear-time GP regression
> For a finite chain $t=0,\dots,T$, the combined forward filter and backward smoother (Algorithm 5.4, `Infer`) return posterior marginals whose means and variances are **exactly equal** to those of [[Gaussian Process Regression|GP regression]] (§4.2) with the corresponding Gauss–Markov prior. Thus `Infer` is nothing but an $\mathcal{O}(N)$ implementation of GP regression with Markov priors (versus $\mathcal{O}(N^3)$ for the dense Gram-matrix approach). Memory grows linearly in $T$ (to store all filtered/predicted parameters for the backward pass).
^thm-filter-gp-equivalence

At each step, uncertainty (variance) drops from prediction → filtering (adding the local observation) → smoothing (adding future observations). The Kálmán gain $K_t$ is historically the "optimal gain"; in the PN interpretation the posterior is not merely optimal but the *only* meaningful probabilistic estimator given the model.

### Beyond linear-Gaussian
Filters/smoothers are so efficient they are applied even when linearity/Gaussianity are violated. In numerics this case is *especially* strong: saved compute can be reinvested in finer discretisations, so almost all PN methods use Kálmán-type Gaussian filtering. The exception is highly nonlinear ODE dynamics, where sequential Monte Carlo (**particle filters/smoothers**) may be warranted (see [[ODE Filters and Smoothers]]).

## Examples
> [!example] Online quadrature / ODE marching
> Running `Predict` (Alg. 5.3) advances an integrator one grid point at a time at constant per-step cost, indefinitely refining the estimate — the "keep running and improve precision over time" property that motivated Gauss–Markov priors in the first place. For a finite curve, `Infer` (Alg. 5.4) does a forward filter then backward smooth to get the full posterior over the ODE solution. This is exactly the [[ODE Filters and Smoothers]] template (whose EKF0/EKS0 are the analogues for nonlinear vector fields).

> [!example] Predict → update → smooth on one node
> Suppose at step $t$ the prediction is $\mathcal{N}(m^-_t,P^-_t)$ and we observe $y_t=H_t x_t+\zeta_t$. The innovation $z_t=y_t-H_t m^-_t$ and gain $K_t=P^-_t H_t^\top S_t^{-1}$ pull the mean toward the data by an amount set by the ratio of prior to observation uncertainty; the update shrinks $P^-_t$ to $P_t=(I-K_tH_t)P^-_t$. The later backward pass with gain $G_t$ further contracts it to $P^s_t$ using downstream evidence.

## Connections
- Operates on the [[Gauss-Markov Processes and SDEs|state-space / SDE models]] (its $A,Q,H,R$ come from the discretised SDE).
- Is the $\mathcal{O}(N)$ realisation of [[Gaussian Process Regression]] (Theorem above) and reduces to repeated [[Gaussian Distributions and Algebra|Gaussian conditioning]].
- Hyperparameter ($\theta$) calibration during the filter pass is [[Hierarchical Inference in Gaussian Models]] (§6.3).
- Directly generalised to ODEs in [[ODE Filters and Smoothers]] and analysed in [[Theory of ODE Filters and Smoothers]].

## See Also
- [[Gauss-Markov Processes and SDEs]] — where $A(h),Q(h),H,R$ come from.
- [[Gaussian Process Regression]] — the equivalent $\mathcal{O}(N^3)$ formulation.
- [[Gaussian Distributions and Algebra]] — the conditioning identity each step reuses.
- [[ODE Filters and Smoothers]] — filtering applied to differential equations.
