---
title: The Integration Problem
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 9, pp. 69-74"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[Computation as Probabilistic Inference]]"
  - "[[The Numerical Agent]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Bayesian Quadrature]]"
  - "[[Classical Quadrature as Inference]]"
  - "[[Active Bayesian Quadrature and Bayesian Monte Carlo]]"
  - "[[Lessons from Integration]]"
aliases:
  - Numerical Integration
  - Quadrature Problem
  - The Quadrature Task
---

# The Integration Problem

> [!summary]
> Numerical integration (quadrature) is the task of computing a definite integral $F=\int_{\mathcal X} f(x)\,\nu(\mathrm dx)$ that has no closed form, using only a finite number of evaluations $f(x_i)$ of the integrand. Classical rules estimate $F$ by a weighted sum $\sum_i w_i f(x_i)$; the values of $F$ are epistemically uncertain even though $f$ is a deterministic function, which licenses a probabilistic treatment. This note fixes the setup, notation, and the two ingredients — a **model** and a **design rule** — from which every probabilistic quadrature method is built.

## Overview

Integration is one of the oldest and most elementary numerical tasks, which makes it the ideal pedagogical starting point for Probabilistic Numerics. It is also ubiquitous: it is the central operation of Bayesian inference (marginalisation, model evidence), and a provocative Bayesian view holds that integration is "the single challenge separating us from systems that fully automate statistics" (Hennig et al., Ch. 9, p. 69).

The key conceptual move is to notice that although a definite integral such as $F=\int_{-3}^{3}\exp(-(\sin(3x))^2-x^2)\,\mathrm dx$ is a single, unique real number fully specified by a handful of symbols, we cannot compute its value elementarily: there is no antiderivative in the standard tables and no atomic machine operation returns it. Our uncertainty about $F$ is therefore **epistemic** — arising from a lack of knowledge/computation, not from randomness. This is exactly the kind of uncertainty that [[Computation as Probabilistic Inference]] proposes to quantify with a probability measure, and it distinguishes numerical from *atomic* operations (whose uncertainty is always nil). This note motivates and sets up the problem; [[Bayesian Quadrature]] solves it, and [[Classical Quadrature as Inference]] shows classical rules are special cases.

## Main Content

> [!definition] The integration (quadrature) problem
> Given an integrand $f:\mathcal X\to\mathbb R$ and a measure $\nu$ on the domain $\mathcal X$ (in the univariate case usually a bounded interval $[a,b]\subset\mathbb R$), compute
> $$ F \;=\; \int_{\mathcal X} f(x)\,\nu(\mathrm dx) \;\in\;\mathbb R. $$
> Here $\nu$ may be the Lebesgue measure ($\nu(\mathrm dx)=\mathrm dx$, giving $\int_a^b f(x)\,\mathrm dx$) or a probability measure (e.g. a prior $p(x)$, in which case $F=\mathbb E_\nu[f]$). The algorithm may only access $f$ through a finite set of **evaluations** $Y:=[f(x_1),\dots,f(x_N)]$ at **nodes** $X:=[x_1,\dots,x_N]$.
> ^def-integration-problem

**Symbols.** $\mathcal X$ = integration domain; $\nu$ = base/weight measure; $f$ = integrand; $F$ = the (scalar) integral, the *latent* quantity of interest; $X=[x_1,\dots,x_N]$ = nodes/knots/sigma-points; $Y=[f(x_1),\dots,f(x_N)]$ = observed function values; $w=[w_1,\dots,w_N]$ = quadrature weights.

### Why it is intractable

The integrand of the running example $f(x)=\exp(-(\sin 3x)^2-x^2)$ can be evaluated to machine precision in nanoseconds using only atomic operations (`exp`, `sin`, `+`, `\times`). Yet $F=\int_{-3}^{3}f(x)\,\mathrm dx$ has no elementary antiderivative and no atomic operation returns it. Despite the formal clarity of $f$, the number $F$ is only accessible through further computation — hence the epistemic uncertainty.

Because $f>0$ here, $F>0$; and since $f(x)\le g(x):=\exp(-x^2)$ for all $x$, we have the a priori bounds
$$ 0 < F < \int_{-\infty}^{\infty} g(x)\,\mathrm dx = \sqrt\pi. $$
Such analytic bounds already allow a *proper prior measure* over $F$ (e.g. $p(F)=\mathcal U_{(0,\sqrt\pi)}$), the first hint that inference is available. Collecting evaluations $Y$ related to $F$ through a likelihood yields a posterior $p(F\mid Y)$ that concentrates on the true value.

### Classical rules as weighted sums

Almost all classical quadrature rules are **linear** in the evaluations:
$$ \hat F \;=\; Q(f) \;=\; \sum_{i=1}^{N} w_i\, f(x_i), $$
differing only in their choice of nodes $X$ and weights $w$. The trapezoidal rule, Simpson's/Kepler's rule, Gauss and Clenshaw–Curtis rules all take this form. A central thesis of Part II is that each such rule is the **posterior mean of a Bayesian quadrature method under a specific Gaussian-process prior** — classical quadrature is *contained* in [[Bayesian Quadrature]] as a set of special cases (see [[Classical Quadrature as Inference]]).

> [!definition] The two ingredients of a probabilistic quadrature method
> **(1) A model** $\mathcal M := p(F,Y)$: a joint probability measure over the integral $F$ and the data $Y=[f(x_1),\dots,f(x_N)]$. Assuming sufficient regularity it factors as a prior and likelihood through the integrand $f$ as latent variable (using that $F$ and $Y$ are conditionally independent given $f$):
> $$ p(F,Y) = \int p(F\mid f)\,p(Y\mid f)\,\mathrm dp(f), \qquad p(F\mid Y)=\int p(F\mid f)\,\mathrm dp(f\mid Y). $$
> **(2) A design rule** governing the choice of nodes $X$. In general a function of the model $\mathcal M$, previous choices $\{x_j\}_{j<i}$, and previously collected data $Y_{<i}$. If it uses $Y_{<i}$ it is **adaptive / closed-loop**; if it depends only on the model it is **non-adaptive / open-loop**.
> ^def-two-ingredients

**Interpretation.** The model encodes assumptions not only over the integrand $f$ but over its relationship to the numbers being computed. A solver is thus a probabilistic agent (see [[The Numerical Agent]]): the design rule translates the information in the model — and, for adaptive rules, the observations — into *actions* (choices of where to evaluate $f$).

### Models must be simpler than the problem

One might wish to encode maximal prior information. But an agent's model of the world must be *simpler and smaller* than the world itself (Fig. 9.3). A "perfect" prior placing unit mass on the true $F$ would be as intractable as the original task. The goal is instead **tractable** priors that (a) place high mass near the truth, (b) allow efficient computation of $p(F\mid Y)$ using only atomic operations, and (c) give non-trivial uncertainty at intermediate points. This tractability constraint is what makes Gaussian-process priors so attractive (see [[Bayesian Quadrature]]).

### Contrast: Monte Carlo

Monte Carlo (MC) is a non-probabilistic (frequentist) but *stochastic* route. With a sampling measure $p(x)>0$ wherever $f(x)\neq0$ and i.i.d. draws $x_i\sim p$, the importance-sampling estimator is
$$ \hat F := \frac1N\sum_{i=1}^N w(x_i),\qquad w(x):=f(x)/p(x). $$

> [!theorem] Lemma 9.2 (Monte Carlo is unbiased with $O(N^{-1/2})$ rate)
> If $F$ is integrable, $\hat F$ is unbiased, $\mathbb E[\hat F]=F$, with variance
> $$ \operatorname{var}(\hat F) = \tfrac1N\operatorname{var}_p(w), $$
> assuming $\operatorname{var}_p(w)$ exists. Hence the standard deviation (root-mean-square error) drops as $\mathcal O(N^{-1/2})$.
> ^thm-mc-rate

*Proof sketch.* Unbiasedness follows from $\mathbb E[\hat F]=\frac1N\sum_i\int w(x_i)p(x_i)\,\mathrm dx_i=F$ for i.i.d. draws with known $w(\cdot)$. As $\hat F$ is a linear combination of i.i.d. variables, $\operatorname{var}(\hat F)=\sum_i\operatorname{var}_p(w_i)/N^2=\operatorname{var}_p(w)/N$. $\square$

MC converts a deterministic-but-unknown number into a *random* one, introducing an **aleatory** form of uncertainty. Its virtue is generality (almost no assumptions on $f$); Part II argues its $\mathcal O(N^{-1/2})$ rate is the *worst* achievable among sensible integrators because it uses the weakest possible model (see [[Lessons from Integration]] and [[Convergence and Priors in Bayesian Quadrature]]).

## Examples

> [!example] The running univariate integrand
> The whole of Part II uses
> $$ f(x)=\exp\!\big(-(\sin 3x)^2 - x^2\big),\qquad F=\int_{-3}^{3} f(x)\,\mathrm dx. $$
> $f$ is smooth and strictly positive; it is bounded above by the Gaussian $g(x)=\exp(-x^2)$, giving $0<F<\sqrt\pi$ before any evaluation. This can be read either as integrating $f$ against Lebesgue measure on $[-3,3]$, or as integrating $\exp(-(\sin3x)^2)$ against the Gaussian measure $\nu(x)=\exp(-x^2)$. Both readings are used depending on which prior/measure pairing yields tractable Bayesian-quadrature integrals.

> [!example] Adaptive vs non-adaptive design
> A **non-adaptive** rule fixes the nodes $X$ in advance (e.g. an equidistant grid for the trapezoidal rule), independent of the observed $y_i$; it can be pre-computed and parallelised. An **adaptive** rule chooses $x_{i+1}$ using the values $y_1,\dots,y_i$ already seen (e.g. placing the next node where the model is most uncertain). For Gaussian models the posterior variance on $F$ is independent of the values $Y$, so the "optimal" node placement is already open-loop — adaptivity only helps once one moves to non-Gaussian models (see [[Active Bayesian Quadrature and Bayesian Monte Carlo]]).

## Connections

- **Specialised by** [[Bayesian Quadrature]], which chooses the model to be a Gaussian process on $f$, making $F$ Gaussian and giving closed-form posterior mean and variance.
- **Instance of** the general PN programme of [[Computation as Probabilistic Inference]]: a numerical quantity ($F$) is inferred from computable data ($Y$) via a prior and likelihood.
- **Contrasts with** Monte Carlo, the stochastic/frequentist alternative analysed via Lemma 9.2, discussed critically in [[Lessons from Integration]].
- **Uses** the agent framing of [[The Numerical Agent]]: the design rule is the agent's policy for choosing evaluations.

## See Also
- [[Bayesian Quadrature]] — the GP-based solution to this problem; central note of Part II.
- [[Classical Quadrature as Inference]] — shows the weighted-sum rules $\sum_i w_i f(x_i)$ are posterior means of specific priors.
- [[Kernel Quadrature and Kernel Means]] — the RKHS/worst-case-error view of the same problem.
- [[Lessons from Integration]] — why the epistemic framing beats the stochastic (Monte Carlo) one.
- [[Computation as Probabilistic Inference]] — the epistemic-uncertainty foundation.
