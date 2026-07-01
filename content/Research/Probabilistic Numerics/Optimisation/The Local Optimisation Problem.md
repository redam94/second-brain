---
title: The Local Optimisation Problem
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 24-25, pp. 197-202; Ch. 26.1, pp. 203-205"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[Computation as Probabilistic Inference]]"
  - "[[The Numerical Agent]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Probabilistic Step-Size Selection and Line Searches]]"
  - "[[First- and Second-Order Optimisation Methods]]"
  - "[[The Global Optimisation Problem]]"
aliases:
  - Local Optimisation
  - Nonlinear Optimisation Problem
  - Stochastic Optimisation Setting
  - Empirical Risk Minimisation
---
# The Local Optimisation Problem
> [!summary]
> Local optimisation seeks a local minimiser $x_*$ of a (generally non-convex, twice-differentiable) objective $f:\mathbb{R}^N\to\mathbb{R}$ via an iterative loop that alternates a **search-direction** decision and a **step-size** (line-search) decision. In modern machine learning the objective is an *empirical risk* evaluated on **sub-sampled mini-batches**, so gradients and values arrive corrupted by a genuine Gaussian **likelihood** rather than to machine precision. This noise — of magnitude far beyond machine epsilon — breaks classical notions of stability and step-size selection, and is exactly the opening for the probabilistic viewpoint.

## Overview
Chapters II (integration) and III (linear algebra) reconstructed *linear* numerical tasks as inference. Local optimisation is the first *nonlinear* task (§25). The recurring PN thesis applies: optimisation algorithms are [[The Numerical Agent|probabilistic agents]] whose step-size and direction choices are expected-loss-minimising actions. But unlike earlier chapters, Part IV moves *away* from merely re-deriving classical methods and instead develops **new functionality** for the noisy, big-data regime that classical solvers handle poorly (Ch. 24).

The key numerical challenge separating machine learning from classical numerics is the central role of **big external data**. When datasets are large, data points are sub-sampled ("batched") for every internal computation. Batching introduces stochasticity — noise of a magnitude far beyond machine precision — and classical notions of stability no longer apply. It no longer makes sense to speak of a "correct number computed with a tiny error"; a real **likelihood** function must enter the picture. If this likelihood is not modelled, a number of visible problems arise (e.g. the disappointing algorithmic landscape of deep learning).

## Main Content
### Problem setting
> [!definition] Unconstrained local minimisation
> Given $f:\mathbb{R}^N\to\mathbb{R}$, at least twice continuously differentiable, with gradient and Hessian
> $$
> \nabla f:\mathbb{R}^N\to\mathbb{R}^N,\quad [\nabla f(x)]_i=\frac{\partial f(x)}{\partial x_i},\qquad B:\mathbb{R}^N\to\mathbb{R}^{N\times N},\quad [B(x)]_{ij}=\frac{\partial^2 f(x)}{\partial x_i\partial x_j},
> $$
> a **local minimiser** is
> $$
> x_*=\arg\min_x f(x):\quad\Leftrightarrow\quad \big(\nabla f(x_*)=0\big)\wedge\big(B(x_*)\ \text{is spd}\big).
> $$
> $f$ is **strongly convex** if $B(x)$ is (strictly) positive definite everywhere; this is **not** generally assumed. $N$ ranges from a handful (control) to billions (deep learning). The setting is *unconstrained* and seeks a *local* (not global — cf. [[The Global Optimisation Problem]]) minimum.
^def-local-min

### The generic iterative loop
Classical unconstrained solvers (Algorithm 25.1) mirror the linear solvers of Ch. III: from $x_i$ they produce $x_{i+1}$ by two principal steps.
> [!definition] Direction–then–step-length iteration
> 1. **Search direction** $d_i\in\mathbb{R}^N$: choose $d_i$ using calls to the black boxes $f$ and/or $\nabla f$. The naïve choice is *steepest / gradient descent*, $d_i=-\nabla f(x_i)$.
> 2. **Step size** $\alpha_i\in\mathbb{R}_+$: the next iterate is $x_{i+1}=x_i+\alpha_i d_i$. Finding a good $\alpha_i$ is a **univariate optimisation** solved by a *line search*. A line search returning the exact univariate optimum $\alpha_*=\arg\min_\alpha f(x_i+\alpha d_i)$ is called **perfect** (an analytical device; it does not exist in practice).
>
> The line search operates on the *projected* univariate sub-problem $f(\alpha):=f(x_i+\alpha d_i)$ with derivative the **projected gradient** $f'(\alpha)=d_i^\top\nabla f(x_i+\alpha d_i)\in\mathbb{R}$.
^def-iteration

Both $f(\alpha)$ and $f'(\alpha)$ are scalars; a line search lives in an "inner loop" with almost no state propagation between calls (so the subscript $i$ is dropped). Typically only 1–10 evaluations are used. Performance depends crucially on *both* $d_i$ and $\alpha_i$ (Exercise 25.2): even gradient descent with a badly-chosen fixed step size fails.

> [!theorem] Convergence of exact-line-search steepest descent (quadratic case)
> For the strongly convex quadratic $f(x)=\tfrac12 x^\top Bx-b^\top x$ ($B$ spd, global min $x_*=B^{-1}b$) with eigenvalues $0<\lambda_1\le\cdots\le\lambda_N$, steepest descent with exact line searches, $x_{i+1}=x_i-\big(\tfrac{\nabla f_i^\top\nabla f_i}{\nabla f_i^\top B\nabla f_i}\big)\nabla f_i$, satisfies
> $$
> \|x_{i+1}-x_*\|_B^2\le\Big(\frac{\lambda_N-\lambda_1}{\lambda_N+\lambda_1}\Big)^2\|x_i-x_*\|_B^2.
> $$
> **Interpretation.** With condition number $\kappa(B)=\lambda_N/\lambda_1$: an isometric problem ($\kappa=1$) converges in one step; large $\kappa$ makes the bound essentially vacuous (constant near 1), matching the known slowness of gradient descent. A general-function version (Thm. 25.3) shows $f(x_{i+1})-f(x_*)\le c^2\big(f(x_i)-f(x_*)\big)$ near a spd minimum, with $c\in\big(\tfrac{\lambda_N-\lambda_1}{\lambda_N+\lambda_1},1\big)$ — i.e. a **linear** convergence rate.
^thm-sd-convergence

Convergence-rate vocabulary (S. Wright): **sublinear** ($r_i\to0$ but $r_{i+1}/r_i\to1$); **linear/geometric** ($r_{i+1}\le C d^i$, $0<d<1$); **superlinear** ($r_{i+1}/r_i\to0$); **quadratic** ($r_{i+1}\le d r_i^2$, Newton's rate — leading digits double each step).

### Numerical uncertainty is a feature of data science (§26.1)
Classical numerics recovers methods as MAP/mean estimates under a **Dirac likelihood** $p(z\mid c,\mathcal{M})\propto\mathcal{N}(z;\mu_\mathcal{M},\Sigma_\mathcal{M})\,\delta(c-P_\mathcal{M}z)$: the Dirac encodes that a computer computes $c=Pz$ to machine precision (see [[Computation as Probabilistic Inference]]). Contemporary big-data tasks feature errors of a more drastic nature, requiring the Dirac to be replaced by an **explicit likelihood**.

> [!definition] Empirical risk minimisation and batch noise
> Fitting parameters $x$ to data $\Xi=[\xi_1,\dots,\xi_K]$ minimises a (regularised) **empirical risk**
> $$
> \mathcal{L}(\Xi,x)=r(x)+\frac1K\sum_{k=1}^K\ell(\xi_k,x),
> $$
> with regulariser $r$ (data-independent) and per-datum loss $\ell$. For big data, one uses a random **batch** $\tilde\Xi=[\xi_{J_1},\dots,\xi_{J_M}]$ of size $M\ll K$:
> $$
> \tilde{\mathcal{L}}(x)=r(x)+\frac1M\sum_{m=1}^M\ell(\xi_{J_m},x)\approx\mathcal{L}(\Xi,x).
> $$
> Re-drawing $J$ i.i.d. each call makes $\tilde{\mathcal{L}}$ an unbiased estimator; by the CLT it is approximately Gaussian:
> $$
> p\big(\tilde{\mathcal{L}}(x)\mid\mathcal{L}(\Xi,x)\big)\approx\mathcal{N}\big(\tilde{\mathcal{L}}(x);\mathcal{L}(\Xi,x),\sigma^2\big),\qquad \sigma^2\propto 1/M.
> $$
> Batching thus provides a **knob** ($M$) trading computational *precision* against *cost*, and evaluations at different $x$ are disturbed by *independent* Gaussian noise (batches re-drawn each request). Signal-to-noise ratios below one are common in deep learning.
^def-erm

This Gaussian noise explicitly introduces a **likelihood** into the computation, naturally motivating a probabilistic treatment — and explains why efficient classical methods (tuned for Dirac likelihoods) struggle in the noisy setting.

## Examples
> [!example] Two robots doing gradient descent (Exercise 25.2)
> Two wheeled robots on a hill do "gradient descent" on potential-energy density $f(x_i)=\mathbb{E}(x_i)/m=g\cdot h(x_i)$ with a *fixed* step $\alpha=0.1$, stepping $x_{i+1}=x_i-\alpha\nabla f(x_i)$. One uses SI units ($g=9.81\,\text{m/s}^2$), the other Imperial ($g=32.19\,\text{ft/s}^2$). Because a *fixed* step size interacts with the units/scaling of the gradient, the two identical-in-spirit robots take *different* physical steps and reach different energies — an intuition for why fixed step sizes (unlike an adaptive/perfect line search) are problematic and hide unit-dependent assumptions.

> [!example] Gaussian-process view of ERM (Exercise 26.1)
> A basic GP regression model — data $Y=[y_1,\dots,y_N]$ produced by latent $f$ at $X=[x_1,\dots,x_N]$ under i.i.d. Gaussian likelihood $p(Y\mid f)=\mathcal{N}(Y;f_X,\sigma^2I_N)$ and GP prior $p(f)=\mathcal{GP}(f;\mu,k)$ — is itself an optimisation problem with a loss of the ERM form. Its MAP posterior mean solves that loss; choosing the prior/likelihood corresponds to choosing regulariser $r$ and per-datum loss $\ell$.

## Connections
- Instantiates [[Computation as Probabilistic Inference]] for the first nonlinear task; the Dirac→explicit-likelihood move is the crux.
- The two per-iteration decisions are agent actions ([[The Numerical Agent]]); step-size selection is developed in [[Probabilistic Step-Size Selection and Line Searches]] and direction selection in [[First- and Second-Order Optimisation Methods]].
- The batch-noise likelihood mirrors the observation model of [[Gaussian Process Regression]]; the GP surrogate along a line reuses [[Gauss-Markov Processes and SDEs]].
- Global optimisation ([[The Global Optimisation Problem]]) targets the *global* $x_*$ of a multimodal, expensive black box — a fundamentally different problem.

## See Also
- [[Probabilistic Step-Size Selection and Line Searches]] — the line-search sub-problem made probabilistic.
- [[First- and Second-Order Optimisation Methods]] — choosing the search direction $d_i$.
- [[The Global Optimisation Problem]] — from local modes to the global optimum.
- [[Computation as Probabilistic Inference]] — Dirac vs. explicit likelihood.
