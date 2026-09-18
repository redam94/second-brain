---
title: Bayesian Quadrature
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 10, pp. 75-86"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[The Integration Problem]]"
  - "[[Gaussian Process Regression]]"
  - "[[Gaussian Distributions and Algebra]]"
  - "[[Hierarchical Inference in Gaussian Models]]"
used_by:
  - "[[Kernel Quadrature and Kernel Means]]"
  - "[[Classical Quadrature as Inference]]"
  - "[[Convergence and Priors in Bayesian Quadrature]]"
  - "[[Active Bayesian Quadrature and Bayesian Monte Carlo]]"
  - "[[Lessons from Integration]]"
aliases:
  - BQ
  - Bayesian Quadrature Posterior
  - GP Quadrature
---

# Bayesian Quadrature

> [!summary]
> Bayesian quadrature (BQ) places a Gaussian-process prior on the integrand $f$; because integration is a *linear* operation and Gaussian measures are closed under linear maps, the integral $F=\int f\,\mathrm d\nu$ is itself Gaussian, jointly with the function values $Y$. Conditioning gives a closed-form Gaussian posterior $p(F\mid Y)=\mathcal N(F;\mathfrak m,\mathfrak v)$ whose mean is an **affine function of the data** — a weighted sum $\sum_i w_i y_i$ — and whose variance $\mathfrak v$ is an *a priori* error bar independent of the observed values. The mean, weights, and variance are built from three integrals of the kernel: the integrated prior mean $\mathfrak m_0$, the **kernel mean** $\ell(x_i)$, and the doubly-integrated kernel (initial error) $\mathfrak K$.

## Overview

This is the central note of Part II. It answers the question posed by [[The Integration Problem]]: given that we may know quite a lot about the integrand $f$ (it is defined by source code), how much can be gained by encoding that knowledge as a prior? The answer: a great deal. By embedding the single integrand in a hypothesis class of functions — the support of a GP prior — the intractable problem of exact integration becomes tractable, uncertain inference.

The construction rests entirely on the Gaussian algebra of [[Gaussian Distributions and Algebra]] and the regression machinery of [[Gaussian Process Regression]]: a GP prior on $f$ induces a *joint Gaussian* over $(Y,F)$, and the Gaussian conditioning identity delivers the posterior. Crucially, the posterior mean is a linear map of the observations, so BQ produces a classical-looking quadrature rule $\hat F=F_0+\sum_i w_i y_i$ — and, as [[Classical Quadrature as Inference]] shows, particular kernels reproduce the trapezoidal, spline, and Gaussian quadrature rules exactly. The added value over classical rules is the **posterior variance**: a calibrated, computable error bar that also drives active node selection (see [[Active Bayesian Quadrature and Bayesian Monte Carlo]]).

## Main Content

### The joint model and the posterior

Following the exposition of GP regression, a generic GP prior $p(f)=\mathcal{GP}(f;m,k)$ over the integrand induces a joint Gaussian measure over the function values $Y:=[f(x_1),\dots,f(x_N)]$ and the integral $F$:

> [!definition] Joint prior over evaluations and integral
> Using the Dirac point measure $\delta$ as the (noise-free) likelihood encoding exact observations $y_i=f(x_i)$,
> $$
> p(F,Y)=\mathcal N\!\left(
> \begin{bmatrix} Y\\ F\end{bmatrix};
> \begin{bmatrix} m_X\\ \int_{\mathcal X} m(x)\,\nu(\mathrm dx)\end{bmatrix},
> \begin{bmatrix} k_{XX} & \int_{\mathcal X} k_{Xx}\,\nu(\mathrm dx)\\[2pt]
> \int_{\mathcal X} k_{xX}\,\nu(\mathrm dx) & \iint_{\mathcal X} k_{xx'}\,\nu(\mathrm dx)\nu(\mathrm dx')
> \end{bmatrix}\right).
> $$
> Here $m_X=[m(x_1),\dots,m(x_N)]$ is the prior mean at the nodes, $k_{XX}$ is the $N\times N$ Gram matrix $[k(x_i,x_j)]_{ij}$, $k_{Xx}=[k(x_i,x)]$, and the off-diagonal / bottom-right blocks are the kernel integrated once / twice against $\nu$.
> ^def-bq-joint

Because $F$ is a *linear functional* of $f$ and Gaussians are closed under linear maps (see [[Gaussian Distributions and Algebra]]), the block structure above is exact: no approximation is made.

> [!theorem] Bayesian quadrature posterior
> The conditional $p(F\mid Y)$ is the univariate Gaussian
> $$ p(F\mid Y)=\mathcal N(F;\mathfrak m,\mathfrak v), $$
> with mean $\mathfrak m\in\mathbb R$ and variance $\mathfrak v\in\mathbb R_+$
> $$
> \mathfrak m := \int_{\mathcal X} m\,\nu(\mathrm dx) + k_{xX}k_{XX}^{-1}(Y-m_X)\,\nu(\mathrm dx)
> = \mathfrak m_0 + \ell_X^{\!\top}k_{XX}^{-1}(Y-m_X),
> $$
> $$
> \mathfrak v := \iint_{\mathcal X}\! k_{xx'}\,\nu(\mathrm dx)\nu(\mathrm dx') - \iint k_{xX}k_{XX}^{-1}k_{Xx'}\,\nu(\mathrm dx)\nu(\mathrm dx')
> = \mathfrak K - \ell_X^{\!\top}k_{XX}^{-1}\ell_X.
> $$
> ^thm-bq-posterior

*Derivation.* Apply the Gaussian conditioning identity (Eq. 3.4 of the text; see [[Gaussian Distributions and Algebra]]) to the joint of ^def-bq-joint: for a jointly Gaussian $(Y,F)$ with cross-covariance $\operatorname{cov}(F,Y)=\ell_X^\top:=\int k_{xX}\nu(\mathrm dx)$ and $\operatorname{var}(F)=\mathfrak K$, the conditional mean is $\mathbb E[F]+\operatorname{cov}(F,Y)k_{XX}^{-1}(Y-m_X)$ and conditional variance is $\operatorname{var}(F)-\operatorname{cov}(F,Y)k_{XX}^{-1}\operatorname{cov}(Y,F)$. Equivalently, one may first form the GP posterior $p(f\mid Y)=\mathcal{GP}(f;\,m_x+k_{xX}k_{XX}^{-1}(Y-m_X),\;k_{xx'}-k_{xX}k_{XX}^{-1}k_{Xx'})$ and then apply the closure of the GP under the linear integration operator. $\square$

### The three tractability integrals

The posterior is available in closed form precisely when these three integrals of the *mean and kernel* (never the intractable $f$ itself) have analytic forms:

> [!definition] Integrated mean, kernel mean, and initial error
> $$ \mathfrak m_0 := \int_{\mathcal X} m(x)\,\nu(\mathrm dx)\in\mathbb R, \qquad\text{(integrated prior mean)}$$
> $$ \ell(x_i) := \int_{\mathcal X} k(x,x_i)\,\nu(\mathrm dx)\in\mathbb R, \qquad\text{(kernel mean / kernel embedding of }\nu)$$
> $$ \mathfrak K := \iint_{\mathcal X} k(x,x')\,\nu(\mathrm dx)\nu(\mathrm dx')\in\mathbb R_+. \qquad\text{(doubly-integrated kernel / initial variance)}$$
> ^def-three-integrals

Here $\ell_X:=[\ell(x_1),\dots,\ell(x_N)]^\top$ is the vector of kernel means at the nodes. $\ell(x)$ is exactly the **kernel mean** (kernel embedding) of the measure $\nu$ in the RKHS of $k$; BQ is thereby connected to *kernel herding* and *kernel means* in machine learning (see [[Kernel Quadrature and Kernel Means]]). $\mathfrak K$ is the prior variance of $F$ before any evaluation — the **initial (worst-case) error**.

### The BQ rule: posterior mean as a weighted sum

The posterior mean is an **affine function of $Y$**, exposing the classical quadrature structure:

> [!theorem] BQ weights
> $$ \mathfrak m = F_0 + w^{\!\top}Y = F_0 + \sum_{i=1}^N w_i\, y_i, $$
> with offset and weights
> $$ F_0 := \mathfrak m_0 - \ell_X^{\!\top}k_{XX}^{-1}m_X, \qquad w_i := \sum_{j=1}^N \ell_{x_j}\,[k_{XX}^{-1}]_{ji},\quad i=1,\dots,N. $$
> ^thm-bq-weights

Thus BQ *is* a quadrature rule $\hat F=F_0+\sum_i w_i f(x_i)$, but with weights determined by the prior (via $\ell_X$ and $k_{XX}^{-1}$) rather than by ad-hoc polynomial-exactness conditions. This is the precise sense in which **classical quadrature is contained in Bayesian quadrature** (developed in [[Classical Quadrature as Inference]]).

**The zero-mean simplification.** In practice $m(x)\equiv0$ almost always (rarely is an integrand known well enough before evaluation to justify otherwise). Then $\mathfrak m_0=0$, $F_0=0$, and
$$ \mathfrak m = \ell_X^{\!\top}k_{XX}^{-1}Y, \qquad \mathfrak v = \mathfrak K - \ell_X^{\!\top}k_{XX}^{-1}\ell_X. $$

### Scale separation and hierarchical inference

Following the hierarchical construction, the text uses a *scaled* covariance family separating a scale $\theta\in\mathbb R$ from a "unit" kernel $\tilde k$:
$$ k(x,x') := \theta^2\,\tilde k(x,x'). \tag{10.9} $$
The unit kernel $\tilde k$ controls the *shape* of the posterior and the *rate* at which uncertainty contracts; the scale $\theta$ sets the overall magnitude of the error bar. Because $\theta$ appears multiplicatively in the posterior variance, it can be inferred hierarchically (conjugate Gamma prior on $\theta^{-2}$), exactly as in [[Hierarchical Inference in Gaussian Models]], to calibrate the error estimate at runtime (see [[Convergence and Priors in Bayesian Quadrature]]).

### The variance is data-independent (open-loop)

A striking property (from ^thm-bq-posterior): **$\mathfrak v$ does not depend on the observed values $Y$ at all** — it is a function of the nodes $X$ and the kernel only. Consequences:

- The error estimate and optimal node placement are set *a priori*; the design can be pre-computed (a computational saving) — hence Gaussian BQ is fundamentally **open-loop / non-adaptive**.
- But the error bar is then based purely on prior assumptions, not on the collected values themselves. To make evaluations inform *both* confidence and future node choices requires **non-Gaussian** models (see [[Active Bayesian Quadrature and Bayesian Monte Carlo]]).

### Node selection

Thinking of the design rule as minimising an expected loss (the square error), the natural criterion is to place nodes to minimise the posterior variance:
$$ X = \arg\min_{\tilde X\in\mathbb R^N} \mathfrak v(\tilde X). $$
Since the entropy of a Gaussian is monotone in its variance, this is equivalently the **maximally informative** design (minimum conditional entropy of $F$). Finding the exact optimal grid can be computationally hard; sampling from the $N$-**determinantal point process (DPP)** associated with $k$ costs $\mathcal O(N^3)$ and gives only limited performance loss — a *deterministic* way to draw good "samples."

### Tractable model pairings

The posterior is only usable when $\mathfrak m_0,\ell,\mathfrak K$ are analytic. The canonical pairing is the **Gaussian (squared-exponential) kernel with a Gaussian measure** (see Example below). Table 10.1 of the text lists further tractable $(\mathcal X,\nu,k)$ triples, e.g. Uniform measure with Wendland / Matérn-weighted tensor-product kernels on $[0,1]^d$; Gegenbauer kernels on the sphere $\mathbb S^d$; spline kernels (via integration by parts) and polynomial kernels (via known moments) on arbitrary domains — the latter two underlie [[Classical Quadrature as Inference]].

## Examples

> [!example] Gaussian kernel × Gaussian measure (the workhorse univariate BQ)
> Take zero prior mean, the scaled Gaussian covariance written via the Gaussian density
> $$ k(x,x')=\theta^2\,\mathcal N(x;x',\lambda^2), \qquad \nu(x)=\mathcal N(x;\mu,\sigma^2). $$
> Then the three integrals are closed-form:
> $$ [\ell]_i = \theta^2\,\mathcal N(x_i;\mu,\lambda^2+\sigma^2)\in\mathbb R,\quad i=1,\dots,N,\qquad \mathfrak K = \frac{\theta^2}{\sqrt{2\pi(2\sigma^2+\lambda^2)}}\in\mathbb R. $$
> The posterior is $p(F\mid Y)=\mathcal N(F;\ \ell_X^\top k_{XX}^{-1}Y,\ \mathfrak K-\ell_X^\top k_{XX}^{-1}\ell_X)$. This gives a fully practical univariate BQ procedure: evaluate $f$ at chosen nodes, assemble $\ell_X$, $k_{XX}$, and read off point estimate and error bar.

> [!example] Multivariate extension
> On $\mathbb R^d$ with Gaussian measure $\nu(\boldsymbol x)=\mathcal N(\boldsymbol x;\boldsymbol\mu,\Sigma)$ and $d$-dimensional Gaussian covariance $k(\boldsymbol x,\boldsymbol x')=\theta^2\mathcal N(\boldsymbol x;\boldsymbol x',\Lambda)$,
> $$ [\ell]_i=\theta^2\,\mathcal N(\boldsymbol x_i;\boldsymbol\mu,\Lambda+\Sigma),\qquad \mathfrak K=\theta^2\big(\det 2\pi(2\Sigma+\Lambda)\big)^{-1/2}. $$
> BQ extends readily in form, but the *curse of dimensionality* limits it: the volume grows exponentially, evaluations become sparse, the model matters more than the data, and the light-tailed Gaussian kernel predicts poorly in unexplored regions. At the time of writing BQ is rarely used above $d\approx20$.

## Connections

- **Solves** [[The Integration Problem]] by specialising its generic model to a Gaussian-process prior.
- **Built on** [[Gaussian Process Regression]] (the posterior over $f$) and [[Gaussian Distributions and Algebra]] (closure under the linear integration map; conditioning identity).
- **Generalises** classical rules — trapezoid, spline, Gauss, Clenshaw–Curtis — each recovered by a specific kernel in [[Classical Quadrature as Inference]].
- **The kernel mean $\ell$** is the subject of [[Kernel Quadrature and Kernel Means]]; $\mathfrak v$ is the squared RKHS worst-case error.
- **Hierarchical scale inference** on $\theta$ uses [[Hierarchical Inference in Gaussian Models]] to calibrate the error bar (see [[Convergence and Priors in Bayesian Quadrature]]).
- **Non-Gaussian / adaptive** variants (WSABI, BBQ, MMLT) are covered in [[Active Bayesian Quadrature and Bayesian Monte Carlo]].

## See Also
- [[The Integration Problem]] — the task and the two-ingredient recipe BQ instantiates.
- [[Kernel Quadrature and Kernel Means]] — RKHS/worst-case-error reading of $\ell$ and $\mathfrak v$.
- [[Classical Quadrature as Inference]] — classical rules as BQ posterior means.
- [[Convergence and Priors in Bayesian Quadrature]] — how the kernel controls the contraction rate.
- [[Active Bayesian Quadrature and Bayesian Monte Carlo]] — adaptive, warped, non-Gaussian BQ.
- [[Gauss-Markov Processes and SDEs]] — the IWP/Gauss–Markov priors that give BQ an $\mathcal{O}(N)$ Kalman-filter form.
- [[Probabilistic Numerics - Overview]] — the book-level framing this method instantiates
