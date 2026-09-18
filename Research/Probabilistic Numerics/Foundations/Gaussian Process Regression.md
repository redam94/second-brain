---
title: Gaussian Process Regression
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 4, pp. 27-40"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Gaussian Distributions and Algebra]]"
  - "[[Computation as Probabilistic Inference]]"
used_by:
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Bayesian Quadrature]]"
  - "[[Kernel Quadrature and Kernel Means]]"
  - "[[Convergence and Priors in Bayesian Quadrature]]"
  - "[[Bayesian Optimisation]]"
  - "[[Solving ODEs as Inference]]"
  - "[[Uncertainty Calibration for Linear Solvers]]"
aliases:
  - GP Regression
  - Gaussian Process
  - Parametric Gaussian Regression
  - Kernel Ridge Regression
  - Positive Definite Kernel
---
# Gaussian Process Regression
> [!summary]
> Regression — inferring a function $f:\mathbb{X}\to\mathbb{R}$ from finitely many (noisy) evaluations — is the low-level operation inside every numerical method and the canonical PN latent object. This note develops it two ways: **parametric** (Gaussian prior on weights of feature functions) and **nonparametric** (a Gaussian process $\mathcal{GP}(m,k)$, the infinite-dimensional limit). Both give closed-form Gaussian posterior mean and covariance over function values. The GP posterior mean coincides with **kernel ridge regression** / least-squares, and its posterior variance equals the RKHS **worst-case error** — the bridge PN uses to reinterpret classical methods.

## Overview
In numerical applications the objects of interest are usually real-valued *functions*: the integrand for quadrature, the objective for optimisation, the vector field for an ODE. Applying the [[Gaussian Distributions and Algebra|Gaussian inference machinery]] to functions is the central tool of PN. Regression is "an internal operation of all numerical methods and arguably a low-level numerical algorithm in itself." From the ML/statistics viewpoint regression is not computation but *learning* — highlighting once more the fundamental similarity of computation and learning ([[Computation as Probabilistic Inference]]).

Two equivalent constructions: start finite (weights over $F$ features) then take $F\to\infty$ to obtain a **Gaussian process**, a Gaussian measure over an infinite-dimensional function space in which only finite marginals — governed by a **mean function** and a **covariance kernel** — are ever manipulated.

## Main Content
### Parametric (weight-space) Gaussian regression
> [!definition] Linear feature model
> Assume $f$ is a weighted sum of $F$ **feature functions** $\phi_i:\mathbb{X}\to\mathbb{R}$:
> $$ f(x)=\sum_{i=1}^{F}\phi_i(x)\,w_i =: \Phi_x^\top w,\qquad w\in\mathbb{R}^F. $$
> For a data set $X=[x_1,\dots,x_N]$, write $\Phi_X\in\mathbb{R}^{F\times N}$ (columns are feature vectors), and $f_X=[f(x_1),\dots,f(x_N)]$. The model is *linear in the weights $w$* (though generally nonlinear in $x$) — a **linear regression** model. (Eq. 4.1.)
^def-feature-model

Place a Gaussian prior $p(w)=\mathcal{N}(w;\mu,\Sigma)$ and observe $y=[y_1,\dots,y_N]$ corrupted by Gaussian noise, $p(y\mid f)=\mathcal{N}(y;f_X,\Lambda)$ with $\Lambda\in\mathbb{R}^{N\times N}$ (the case $\Lambda\to 0$ gives exact, machine-precision observations $p(y\mid f)=\delta(y-f_X)$). By the [[Gaussian Distributions and Algebra|conditioning formula]] (Eq. 3.13), the posterior over weights is
$$ p(w\mid y)=\mathcal{N}(w;\tilde\mu,\tilde\Sigma),\quad \tilde\Sigma=(\Sigma^{-1}+\Phi_X\Lambda^{-1}\Phi_X^\top)^{-1},\quad \tilde\mu=\tilde\Sigma(\Sigma^{-1}\mu+\Phi_X\Lambda^{-1}y). $$
Inference in weight space costs $\mathcal{O}(NF^2+F^3)$. Via the matrix inversion lemma this can be rewritten with an $N\times N$ inverse. The induced posterior over **function values** $f_x$ at test points is (Eq. 4.3):
$$ p(f_x)=\mathcal{N}\!\big(f_x;\;\Phi_x^\top\tilde\mu,\;\Phi_x^\top\tilde\Sigma\,\Phi_x\big), $$
$$ \Phi_x^\top\tilde\mu = \Phi_x^\top\mu+\Phi_x^\top\Sigma\Phi_X(\Phi_X^\top\Sigma\Phi_X+\Lambda)^{-1}(y-\Phi_X\mu). $$
Crucially, function-space expressions contain the features **only** through inner products
$$ k_{ab}:=\Phi_a^\top\Sigma\,\Phi_b=\sum_{ij=1}^F\phi_i(a)\phi_j(b)\Sigma_{ij},\qquad m_a:=\Phi_a^\top\mu, $$
the **covariance function** $k:\mathbb{X}\times\mathbb{X}\to\mathbb{R}$ and **mean function** $m:\mathbb{X}\to\mathbb{R}$. The features are "encapsulated" — motivating the kernel trick and the nonparametric limit. (The maximum-likelihood/OLS estimate $w_{ML}=(\Phi_X\Phi_X^\top)^{-1}\Phi_X y$ is the flat-prior special case, Exercise 4.1.)

### Positive-definite kernels
> [!definition] Kernel (positive semi-definite)
> A function $k:\mathbb{X}\times\mathbb{X}\to\mathbb{R}$ is a **positive (semi-)definite kernel** if for every finite set $X=[x_1,\dots,x_N]$ the Gram matrix $[k_{XX}]_{ij}=k(x_i,x_j)$ is positive (semi-)definite. Such $k$ are also called Mercer kernels / covariance functions. (Def. 4.2.)
^def-kernel

Kernels form a *semi-ring*: if $k,h$ are kernels and $\alpha\in\mathbb{R}_+$, then $\alpha k$, $k+h$, the Hadamard product $(k\odot h)(a,b)=k(a,b)h(a,b)$ (Schur's theorem), and $k(\phi(y),\phi(y'))$ for any map $\phi$ are all kernels. Standard examples over $\mathbb{R}$:
$$ k_{\text{SE}}(a,b)=\theta^2\exp\!\Big(-\tfrac{(a-b)^2}{2\lambda^2}\Big)\ \text{(square-exponential)},\quad k_{\text{Wiener}}(a,b)=\min(a,b),\quad k_{\text{OU}}(a,b)=\exp(-|a-b|). $$
The square-exponential kernel arises as the $F\to\infty$ limit of a Gaussian-feature model with feature prior variance scaled as $\propto 1/F$ (Eq. 4.4): infinitely many degrees of freedom, finite total prior mass.

### Nonparametric limit: the Gaussian process
> [!definition] Gaussian process
> Given a mean function $\mu:\mathbb{X}\to\mathbb{R}$ and a positive-definite kernel $k$, the **Gaussian process** $p(f)=\mathcal{GP}(f;\mu,k)$ is the measure such that, for *any* finite subset $X=[x_1,\dots,x_N]$, the function values $f_X$ are jointly Gaussian, $p(f_X)=\mathcal{N}(f_X;\mu_X,k_{XX})$. (Def. 4.4.) It extends regression from finite weight vectors to real-valued functions.
^def-gaussian-process

> [!theorem] GP regression posterior
> Given a GP prior $p(f)=\mathcal{GP}(f;\mu,k)$ and Gaussian likelihood $p(y\mid f)=\mathcal{N}(y;f_X,\Lambda)$, the posterior is a GP, $p(f\mid y)=\mathcal{GP}(f;m,\mathbb{V})$, with
> $$ m_x = \mu_x + k_{xX}(k_{XX}+\Lambda)^{-1}(y-\mu_X), \tag{4.6} $$
> $$ \mathbb{V}(x,x') = k_{xx'} - k_{xX}(k_{XX}+\Lambda)^{-1}k_{Xx'}. \tag{4.7} $$
> Here $k_{xX}$ is the row vector of covariances between test point $x$ and data $X$. The dominant cost is the $\mathcal{O}(N^3)$ Cholesky factorisation of the Gram matrix $G=k_{XX}+\Lambda$; the mean prediction at a new point is then $\mathcal{O}(N)$ and the marginal variance $\mathcal{O}(N^2)$.
^thm-gp-posterior

### Connection to least-squares / kernel ridge regression / RKHS
Each kernel is associated (Moore–Aronszajn) with a **reproducing kernel Hilbert space (RKHS)** $\mathcal{H}_k$: functions $f$ with $k(x,\cdot)\in\mathcal{H}_k$ and the reproducing property $f(x)=\langle f,k(\cdot,x)\rangle$. The GP posterior mean is exactly the **kernel ridge regression** estimate — the minimiser of a regularised empirical risk over $\mathcal{H}_k$:
$$ m_x=\arg\min_{f\in\mathcal{H}_k}\ \sigma^2\|f\|_{\mathcal{H}_k}^2 + \tfrac{1}{N}\sum_{i=1}^N(y_i-f(x_i))^2. \tag{4.8} $$
> [!theorem] Posterior variance = worst-case error (noise-free)
> Let $\mathcal{H}$ be the RKHS of a positive-definite kernel $k$, and consider $f\in\mathcal{H}$ with $\|f\|\le 1$. For noise-free data ($\Lambda\to 0$) at $X$, the pointwise error between $f_x=f(x)$ and the posterior mean $m_x$ is tightly bounded above by the GP posterior marginal variance:
> $$ \sup_{f\in\mathcal{H},\,\|f\|\le 1}(m_x-f_x)^2 = k_{xx}-k_{xX}\,k_{XX}^{-1}\,k_{Xx}. \tag{Thm. 4.8} $$
> Thus the Bayesian *expected* squared error equals the *worst-case* squared error over the unit RKHS ball — the linchpin identity that lets PN endow classical point estimates with calibrated error bars.
^thm-worstcase-variance

### Inference on and from derivatives and integrals
Because linear maps preserve Gaussianity ([[Gaussian Distributions and Algebra|Eq. 3.4]]), if $f\sim\mathcal{GP}(m,k)$ with sufficiently differentiable/integrable $m,k$, then any partial derivatives $\partial^\ell f/\partial x^\ell$ and integrals $\int_a^b f\,\mathrm{d}\nu$ are *jointly* Gaussian with $f$. Their mean/covariance functions are obtained by applying the same linear operator to $m$ and to each argument of $k$, e.g.
$$ \mathbb{E}\Big(\tfrac{\partial^\ell f(x)}{\partial x^\ell}\Big)=\tfrac{\partial^\ell m(x)}{\partial x^\ell},\qquad \operatorname{cov}\Big(\tfrac{\partial^\ell f(x)}{\partial x^\ell},\tfrac{\partial^m f(x')}{\partial x'^m}\Big)=\tfrac{\partial^{\ell}\partial^{m}k(x,x')}{\partial x^\ell\,\partial x'^m}. $$
This is the engine of [[Bayesian Quadrature]] (observe $f$, infer $\int f$) and [[Solving ODEs as Inference|ODE filters]] (relate $f$ and $f'$).

## Examples
> [!example] Two viewpoints on the same estimate
> (1) Assign $p(f)=\mathcal{GP}(f;0,k)$ with noise-free likelihood; the posterior is a GP with mean $m_x$ and variance $\sigma_x^2$. (2) Assume the *true* $f\in\mathcal{H}_k$ and take the regularised least-squares estimate (Eq. 4.8) — it *equals* $m_x$, and its distance to the truth is bounded by $\sigma_x$ times the (unknown) RKHS norm of $f$. The probabilistic and the approximation-theoretic stories give the same point estimate and error, but the prior is a *generative* object one can sample and criticise, whereas an empirical risk is not.

> [!example] Integrated Wiener process posterior = cubic spline
> Under the once-integrated Wiener process kernel (a Gauss–Markov prior, see [[Gauss-Markov Processes and SDEs]]) and noise-free observations, the GP posterior mean is the piecewise-cubic interpolant of the data — the classical **cubic spline**. This is a first concrete instance of "a classical numerical method is a Gaussian posterior mean."

## Connections
- Specialises [[Gaussian Distributions and Algebra]] to infinite dimension (marginalisation reads off finite sub-blocks).
- Univariate GPs with the Markov property are [[Gauss-Markov Processes and SDEs]], enabling $\mathcal{O}(N)$ inference via [[Bayesian Filtering and Smoothing]].
- Kernel/covariance choice and its hyperparameters are calibrated in [[Hierarchical Inference in Gaussian Models]].
- The worst-case/expected-error identity underlies [[Convergence and Priors in Bayesian Quadrature]] and [[Uncertainty Calibration for Linear Solvers]].

## See Also
- [[Gaussian Distributions and Algebra]] — the finite-dimensional parent.
- [[Gauss-Markov Processes and SDEs]] — GPs with finite memory (linear-time inference).
- [[Bayesian Quadrature]] — GP regression used to infer integrals.
- [[Kernel Quadrature and Kernel Means]] — RKHS/kernel-mean view of integration.
- [[Classical Quadrature as Inference]] — trapezoid/Gauss rules as the posterior mean of this regression applied to the integrand.
- [[ODE Filters and Smoothers]] — GP regression in state-space form, conditioned on the ODE vector field.
- [[First- and Second-Order Optimisation Methods]] — BFGS as Gaussian regression on the Hessian.
- [[Scaled Dot-Product and Multi-Head Attention]] — attention as a kernel-weighted smoother
