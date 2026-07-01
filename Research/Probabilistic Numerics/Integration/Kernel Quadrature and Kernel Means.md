---
title: Kernel Quadrature and Kernel Means
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 10-11, pp. 75-86, 119-121"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[Bayesian Quadrature]]"
  - "[[Gaussian Process Regression]]"
  - "[[The Integration Problem]]"
used_by:
  - "[[Classical Quadrature as Inference]]"
  - "[[Convergence and Priors in Bayesian Quadrature]]"
  - "[[Lessons from Integration]]"
aliases:
  - Kernel Mean
  - Kernel Embedding
  - Kernel Herding
  - Worst-Case Error
  - Maximum Mean Discrepancy
---

# Kernel Quadrature and Kernel Means

> [!summary]
> The three integrals that make Bayesian quadrature tractable have a reproducing-kernel-Hilbert-space (RKHS) reading: the **kernel mean** $\mu_\nu=\int k(x,\cdot)\,\nu(\mathrm dx)$ is the embedding of the base measure $\nu$ into the RKHS $\mathcal H$ of $k$, and the BQ posterior variance $\mathfrak v$ equals the squared **worst-case (RKHS) error** of the quadrature rule. This dual view links Bayesian quadrature to kernel means, kernel herding, and the maximum-mean-discrepancy (MMD); it also clarifies the one subtle difference from *kernel quadrature*, where the kernel is allowed to shrink with the number of nodes.

## Overview

[[Bayesian Quadrature]] showed the posterior mean and variance are assembled from $\mathfrak m_0$, the kernel mean $\ell(x_i)=\int k(x,x_i)\nu(\mathrm dx)$, and the initial error $\mathfrak K=\iint k\,\nu\nu$. This note gives those quantities their functional-analytic meaning. Every positive-definite kernel $k$ defines an RKHS $\mathcal H$ with reproducing property $\langle f,k(\cdot,x)\rangle_{\mathcal H}=f(x)$ (see [[Gaussian Process Regression]]). In this language, integration against $\nu$ is a bounded linear functional whose Riesz representer is precisely the kernel mean. This is the bridge between the *probabilistic* (Bayesian) and the *deterministic worst-case* views of quadrature, and it is why the BQ error bar $\mathfrak v$ is simultaneously a Bayesian posterior variance and a tight worst-case bound over an RKHS ball.

## Main Content

> [!definition] Kernel mean (kernel embedding of a measure)
> For a kernel $k$ with RKHS $\mathcal H$ and a measure $\nu$ on $\mathcal X$, the **kernel mean** (or kernel embedding) of $\nu$ is the element
> $$ \mu_\nu(\cdot) := \int_{\mathcal X} k(x,\cdot)\,\nu(\mathrm dx)\ \in\ \mathcal H. $$
> Evaluated at a node, $\mu_\nu(x_i)=\ell(x_i)=\int k(x,x_i)\,\nu(\mathrm dx)$, recovering the BQ vector $\ell_X$. By the reproducing property, for any $f\in\mathcal H$,
> $$ \int_{\mathcal X} f(x)\,\nu(\mathrm dx) = \big\langle f,\ \mu_\nu\big\rangle_{\mathcal H}, $$
> i.e. $\mu_\nu$ is the Riesz representer of the integration functional $f\mapsto\int f\,\mathrm d\nu$.
> ^def-kernel-mean

**Symbols.** $\mathcal H$ = RKHS of $k$; $\langle\cdot,\cdot\rangle_{\mathcal H}$ = its inner product; $\|\cdot\|_{\mathcal H}$ = its norm; $\mu_\nu\in\mathcal H$ = kernel mean of $\nu$; $\ell_X=[\mu_\nu(x_1),\dots,\mu_\nu(x_N)]$; $\mathfrak K=\langle\mu_\nu,\mu_\nu\rangle_{\mathcal H}=\iint k\,\nu\nu$ = squared RKHS-norm of the kernel mean = initial variance.

### The posterior variance is the squared worst-case error

A quadrature rule $Q(f)=\sum_i w_i f(x_i)$ with weights $w=k_{XX}^{-1}\ell_X$ (the BQ weights of ^thm-bq-weights in [[Bayesian Quadrature]]) has a *worst-case error* over the unit ball of $\mathcal H$. The following identity — the same computation as Exercise 4.7 in the text (the RKHS worst-case error of GP regression) — is the key result.

> [!theorem] Worst-case error = BQ posterior standard deviation
> Define the worst-case integration error of the rule with weights $w$ over the RKHS unit ball,
> $$ e(X,w) := \sup_{\|f\|_{\mathcal H}\le 1}\Big| \int_{\mathcal X} f\,\mathrm d\nu - \sum_{i=1}^N w_i f(x_i)\Big|. $$
> With the BQ weights $w=k_{XX}^{-1}\ell_X$ this worst-case error equals the BQ posterior standard deviation:
> $$ e(X,w)^2 = \mathfrak K - \ell_X^{\!\top}k_{XX}^{-1}\ell_X = \mathfrak v. $$
> ^thm-worst-case-error

*Proof sketch.* Write the error functional as an inner product with $g:=\mu_\nu-\sum_i w_i k(\cdot,x_i)\in\mathcal H$ using the reproducing property: $\int f\,\mathrm d\nu-\sum_i w_i f(x_i)=\langle f,g\rangle_{\mathcal H}$. By Cauchy–Schwarz the supremum over $\|f\|_{\mathcal H}\le1$ is attained at $f=g/\|g\|$ and equals $\|g\|_{\mathcal H}$. Expanding
$$ \|g\|_{\mathcal H}^2 = \langle\mu_\nu,\mu_\nu\rangle - 2\sum_i w_i\mu_\nu(x_i) + \sum_{ij}w_iw_j k(x_i,x_j) = \mathfrak K - 2w^\top\ell_X + w^\top k_{XX}w. $$
Minimising over $w$ gives $w^\star=k_{XX}^{-1}\ell_X$ and the minimal value $\mathfrak K-\ell_X^\top k_{XX}^{-1}\ell_X=\mathfrak v$. So the BQ weights are simultaneously the *minimum-worst-case-error* weights, and $\sqrt{\mathfrak v}$ is that minimal worst-case error. $\square$

This is a foundational fact: the Bayesian posterior variance $\mathfrak v$ (a subjective, prior-dependent quantity) *coincides* with a hard, frequentist worst-case error bound over the RKHS ball. The BQ error bar is therefore an honest upper bound on the actual error for any integrand living in the unit ball of $\mathcal H$.

### Maximum mean discrepancy view

If nodes carry *uniform* weights $w_i=1/N$ (as in Monte Carlo / quasi-Monte Carlo), the worst-case error becomes the **maximum mean discrepancy (MMD)** between the target measure $\nu$ and the empirical measure $\hat\nu_N=\frac1N\sum_i\delta_{x_i}$:
$$ \mathrm{MMD}(\nu,\hat\nu_N) = \big\|\mu_\nu - \mu_{\hat\nu_N}\big\|_{\mathcal H} = \sup_{\|f\|_{\mathcal H}\le1}\Big|\int f\,\mathrm d\nu - \tfrac1N\sum_i f(x_i)\Big|. $$
Minimising MMD by choosing nodes greedily is **kernel herding**; choosing both nodes *and* weights to minimise $e(X,w)$ is **kernel quadrature**. Bayesian quadrature is thus the probabilistic member of a family that also contains kernel herding, kernel quadrature, and (via low-discrepancy sequences) quasi-Monte Carlo.

### Initial error and node contraction

Before any evaluation ($N=0$), the rule integrates to the prior mean and the worst-case error is the **initial error** $\sqrt{\mathfrak K}=\|\mu_\nu\|_{\mathcal H}$. Each added node can only *reduce* the worst-case error, because adding a row/column to $k_{XX}$ and an entry to $\ell_X$ can only increase the subtracted term $\ell_X^\top k_{XX}^{-1}\ell_X$. The *rate* at which $\mathfrak v\to0$ is governed by the smoothness of the kernel and the placement of nodes (see [[Convergence and Priors in Bayesian Quadrature]]).

### Kernel quadrature vs Bayesian quadrature — the subtle difference

Bayesian quadrature keeps the kernel $k$ **fixed** (a genuine prior). *Kernel quadrature* (Bach; Bach, Lacoste-Julien, and Oborozinski) often lets the kernel **shrink as the number of nodes grows**. This can improve worst-case rates but is *not compatible* with the Bayesian notion of a prior (a prior must not depend on the amount of data). More practically, an $N$-dependent kernel amounts to a continuous relaxation of the associated error estimate — which plays a less central role in the deterministic kernel view than in the Bayesian one. This same tension reappears for degenerate (finite-rank) polynomial kernels that reproduce Gaussian quadrature (see [[Classical Quadrature as Inference]]), where the "prior" grows more flexible with $N$ and is "not a real prior at all."

## Examples

> [!example] Kernel mean for the Gaussian pairing
> With $k(x,x')=\theta^2\mathcal N(x;x',\lambda^2)$ and $\nu(x)=\mathcal N(x;\mu,\sigma^2)$ (see [[Bayesian Quadrature]]), the kernel mean is available in closed form by Gaussian convolution:
> $$ \mu_\nu(x_i)=\int \theta^2\mathcal N(x;x_i,\lambda^2)\,\mathcal N(x;\mu,\sigma^2)\,\mathrm dx = \theta^2\mathcal N(x_i;\mu,\lambda^2+\sigma^2), $$
> and its squared RKHS norm is $\mathfrak K=\theta^2/\sqrt{2\pi(2\sigma^2+\lambda^2)}$. Every quantity needed for the worst-case error / posterior variance is thus a Gaussian evaluation.

> [!example] Worst-case interpretation of an error bar
> Suppose $\mathfrak K=1$ (unit initial error) and after $N$ nodes $\ell_X^\top k_{XX}^{-1}\ell_X=0.9999$, so $\mathfrak v=10^{-4}$ and $\sqrt{\mathfrak v}=10^{-2}$. Then for *any* integrand $f$ in the unit ball $\|f\|_{\mathcal H}\le1$, the rule's error is guaranteed $\le10^{-2}$; more generally the guaranteed error scales with $\|f\|_{\mathcal H}$. The Bayesian and worst-case readings agree exactly.

## Connections

- **Explains** the ingredients $\ell_X,\mathfrak K,\mathfrak v$ of [[Bayesian Quadrature]] in RKHS terms.
- **Specialises to** MMD / kernel herding (uniform weights) and quasi-Monte Carlo (low-discrepancy nodes); see [[Lessons from Integration]].
- **Underlies** the degenerate-kernel reproduction of Gaussian quadrature in [[Classical Quadrature as Inference]].
- **Sets up** convergence analysis: worst-case error rates in [[Convergence and Priors in Bayesian Quadrature]].

## See Also
- [[Bayesian Quadrature]] — the probabilistic side of this duality.
- [[Gaussian Process Regression]] — reproducing property and the Exercise 4.7 worst-case-error identity.
- [[Convergence and Priors in Bayesian Quadrature]] — how kernel smoothness sets the rate at which $\sqrt{\mathfrak v}\to0$.
- [[Lessons from Integration]] — quasi-Monte Carlo, kernel herding, and the RKHS view of "why be probabilistic."
