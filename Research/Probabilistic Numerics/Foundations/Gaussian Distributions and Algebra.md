---
title: Gaussian Distributions and Algebra
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 3, pp. 23-25"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Computation as Probabilistic Inference]]"
used_by:
  - "[[Gaussian Process Regression]]"
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Bayesian Filtering and Smoothing]]"
  - "[[Hierarchical Inference in Gaussian Models]]"
  - "[[Bayesian Quadrature]]"
  - "[[Probabilistic Linear Solvers - Algorithmic Scaffold]]"
  - "[[First- and Second-Order Optimisation Methods]]"
  - "[[ODE Filters and Smoothers]]"
aliases:
  - Gaussian Algebra
  - Normal Distribution
  - Gaussian Conditioning
  - Gaussian Closure Properties
---
# Gaussian Distributions and Algebra
> [!summary]
> The Gaussian (normal) distribution is the computational workhorse of PN because it is *closed* under all the linear operations computers do well: affine maps, marginalisation, conditioning, and (up to scale) products. Consequently Gaussian inference reduces probability theory to linear algebra — matrix multiplication and inversion. The key result is the **Gaussian conditioning formula**: a Gaussian prior plus a linear-Gaussian likelihood yields a Gaussian posterior in closed form.

## Overview
PN quantifies uncertainty with probability measures, but for continuous-valued quantities it almost always uses *Gaussian* measures. The reason is practical, not merely the central limit theorem or maximum entropy: Gaussians are the family of distributions **preserved under all linear operations**, mirroring why *linear* approximations dominate numerics (rich analytic theory; computers excel at addition and multiplication). Because marginalisation (the sum rule) and conditioning (the product rule) both map to matrix operations, "Gaussian distributions map probability theory to linear algebra." This chapter supplies the algebraic identities that every later PN derivation ([[Gaussian Process Regression]], [[Bayesian Filtering and Smoothing]], [[Bayesian Quadrature]], [[Probabilistic Linear Solvers - Algorithmic Scaffold]]) invokes.

## Main Content
> [!definition] Gaussian probability density
> The **Gaussian** / **normal** distribution over $\mathbb{R}^D$ has density
> $$ \mathcal{N}(x;\mu,\Sigma) = \frac{1}{(2\pi)^{D/2}\,|\Sigma|^{1/2}}\exp\!\left(-\tfrac{1}{2}(x-\mu)^\top \Sigma^{-1}(x-\mu)\right), $$
> where $\mu\in\mathbb{R}^D$ is the **mean** $\mu_i=\mathbb{E}(x_i)$ and $\Sigma\in\mathbb{R}^{D\times D}$ is the **covariance**, a symmetric positive definite (SPD) matrix with $\Sigma_{ij}=\operatorname{cov}(x_i,x_j)$. The inverse $\Sigma^{-1}$ is the **precision** matrix; its diagonal gives *conditional* (not marginal) variances: $\operatorname{var}_{x_i\mid x_{j\neq i}}(x_i)=1/[\Sigma^{-1}]_{ii}$. The differential entropy is $\mathbb{H}[\mathcal{N}]=\tfrac{D}{2}(1+\log 2\pi)+\tfrac{1}{2}\log|\Sigma|$.
^def-gaussian

### Closure properties
> [!theorem] Affine maps preserve Gaussianity
> If $p(x)=\mathcal{N}(x;\mu,\Sigma)$ and $y := Ax+b$ for $A\in\mathbb{R}^{M\times D}$, $b\in\mathbb{R}^M$, then
> $$ p(y)=\mathcal{N}(y;\,A\mu+b,\;A\Sigma A^\top). $$
> Every affine transformation of a Gaussian is Gaussian. (Eq. 3.4.)
^thm-affine-map

> [!theorem] Product of two Gaussian densities
> The pointwise product of two Gaussian densities in $x$ is an unnormalised Gaussian; the normaliser is itself a Gaussian density evaluated at the means:
> $$ \mathcal{N}(x;a,A)\,\mathcal{N}(x;b,B)=\mathcal{N}(x;c,C)\,\mathcal{N}(a;b,A+B), $$
> $$ C:=(A^{-1}+B^{-1})^{-1},\qquad c:=C(A^{-1}a+B^{-1}b). $$
> (Eq. 3.5. This concerns products of *densities*; the product of two Gaussian *random variables* is not Gaussian.)
^thm-gaussian-product

> [!theorem] Gaussian inference (conditioning) — master formula
> Let $x\in\mathbb{R}^D$ have a Gaussian prior and let observations $y\in\mathbb{R}^M$ be linear-Gaussian in $x$:
> $$ p(x)=\mathcal{N}(x;\mu,\Sigma),\qquad p(y\mid x)=\mathcal{N}(y;\,Ax+b,\;\Lambda). $$
> Then the posterior on $x$ and the marginal (evidence) on $y$ are both Gaussian:
> $$ p(x\mid y)=\mathcal{N}(x;\tilde\mu,\tilde\Sigma), $$
> $$ \tilde\Sigma := (\Sigma^{-1}+A^\top\Lambda^{-1}A)^{-1} = \Sigma - \Sigma A^\top(A\Sigma A^\top+\Lambda)^{-1}A\Sigma, $$
> $$ \tilde\mu := \tilde\Sigma\,(A^\top\Lambda^{-1}(y-b)+\Sigma^{-1}\mu) = \mu + \Sigma A^\top(A\Sigma A^\top+\Lambda)^{-1}(y-(A\mu+b)), $$
> $$ p(y)=\mathcal{N}(y;\,A\mu+b,\;A\Sigma A^\top+\Lambda). $$
> (Eqs. 3.6–3.11.) The two equivalent forms trade a $D\times D$ inverse for an $M\times M$ inverse — choose whichever is smaller. The evidence covariance $A\Sigma A^\top+\Lambda$ already appears inside the posterior, so computing the evidence adds negligible overhead.
^def-gaussian-conditioning

### Marginals and conditionals of a joint Gaussian
For a partitioned Gaussian $x=[a,b]^\top$ with
$$ p(x)=\mathcal{N}\!\left(\begin{bmatrix}a\\b\end{bmatrix};\begin{bmatrix}\mu_a\\\mu_b\end{bmatrix},\begin{bmatrix}\Sigma_{aa}&\Sigma_{ab}\\\Sigma_{ba}&\Sigma_{bb}\end{bmatrix}\right), $$
the **marginal** simply reads off the corresponding sub-blocks (via the selector map $A=[I_d,0]$ in the affine rule):
$$ p(a)=\int p(a,b)\,\mathrm{d}b=\mathcal{N}(a;\mu_a,\Sigma_{aa}), \tag{3.12} $$
and the **conditional** is
$$ p(a\mid b)=\mathcal{N}\!\big(a;\;\mu_a+\Sigma_{ab}\Sigma_{bb}^{-1}(b-\mu_b),\;\Sigma_{aa}-\Sigma_{ab}\Sigma_{bb}^{-1}\Sigma_{ba}\big). \tag{3.13}
$$
^marginal-conditional

That marginalisation reads off sub-vectors/sub-matrices — needing only quantities of the marginal's own dimension — is precisely what makes an *infinite*-dimensional Gaussian (a [[Gaussian Process Regression|Gaussian process]]) usable: one only ever handles finite sub-blocks.

### Why Gaussians are the PN workhorse
Sum rule ↔ marginalisation ↔ selecting sub-blocks; product rule ↔ conditioning ↔ matrix multiplication and inversion. Every Gaussian inference is thus a sequence of linear-algebra steps, and the dominant cost is the matrix inverse (size $\min(D,M)$). This is exactly why classical linear-algebra structure resurfaces throughout PN (see [[Probabilistic Linear Solvers - Algorithmic Scaffold]]).

## Examples
> [!example] Conditioning induces correlation ("explaining away")
> Take independent parents $x_1,x_2$ (prior $\Sigma$ diagonal) and observe a linear combination $y=a_1x_1+a_2x_2$. Applying the conditioning formula, the posterior covariance $\tilde\Sigma$ acquires off-diagonal terms: the two a-priori-independent variables become correlated once their sum is observed. This is Pearl's *explaining away* — a direct consequence of Eq. 3.6/3.13.

> [!example] 1-D update
> Prior $x\sim\mathcal{N}(0,\sigma^2)$, observation $y=x+\varepsilon$ with $\varepsilon\sim\mathcal{N}(0,\lambda^2)$ (so $A=1,b=0,\Lambda=\lambda^2$). The master formula gives posterior variance $\tilde\Sigma=(\sigma^{-2}+\lambda^{-2})^{-1}=\frac{\sigma^2\lambda^2}{\sigma^2+\lambda^2}$ and mean $\tilde\mu=\frac{\sigma^2}{\sigma^2+\lambda^2}\,y$ — the familiar precision-weighted average, recovered as a special case.

## Connections
- Instantiated in function space as [[Gaussian Process Regression]] (the conditioning formula becomes the GP posterior mean/covariance).
- The recursive, linear-time version for time series is [[Bayesian Filtering and Smoothing]] (Kalman predict/update = repeated affine map + conditioning).
- Hyperparameters of these Gaussians (mean/covariance scale) are inferred in [[Hierarchical Inference in Gaussian Models]].
- The affine-closure property is what lets [[Gauss-Markov Processes and SDEs|SDEs]] and derivative/integral observations stay Gaussian.

## See Also
- [[Computation as Probabilistic Inference]] — why PN needs a tractable inference engine.
- [[Gaussian Process Regression]] — the infinite-dimensional generalisation.
- [[Bayesian Filtering and Smoothing]] — Gaussian conditioning applied recursively in time.
- [[Hierarchical Inference in Gaussian Models]] — inference over the Gaussian's own parameters.
