---
title: Solving ODEs as Inference
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 35-36, pp. 281-287"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Differential Equations"
doc_type: textbook
depends_on:
  - "[[Computation as Probabilistic Inference]]"
  - "[[The Numerical Agent]]"
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[The Integration Problem]]"
used_by:
  - "[[Classical ODE Solvers as Regression]]"
  - "[[ODE Filters and Smoothers]]"
  - "[[Perturbative ODE Solvers]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
aliases:
  - Initial Value Problem
  - IVP as Regression
  - Probabilistic ODE Solvers Overview
---

# Solving ODEs as Inference

> [!summary]
> An ordinary differential equation (ODE) defines the solution curve $x(t)$ as the integral of a vector field $f$ along its own path. Solving the initial value problem (IVP) can be cast as **curve fitting** / regression: the solution $x$ is a latent function to be inferred from evaluations of $f$ at a grid of points, which act as data on the derivative $x'$. Restricting the prior to Gauss–Markov processes makes this inference a linear-time Bayesian filtering/smoothing problem, producing the family of **ODE filters and smoothers**; an alternative, non-Bayesian family perturbs classical solvers (**perturbative solvers**).

## Overview

This note frames the entire Part VI programme. An ODE is the mechanistic model of a dynamical system whose derivative is known everywhere as a function of state, but whose actual trajectory must be computed. The recurring thesis of probabilistic numerics applies: a solver is a [[The Numerical Agent|numerical agent]] that infers a latent quantity (here the solution curve) from a finite number of computations (here evaluations of the vector field $f$), and should return a calibrated posterior — not just a point estimate.

The key conceptual move (Skilling 1991; Hennig & Hauberg 2014; Chkrebtii et al. 2016; rigorously Tronarp et al. 2019) is that **solving an IVP is a regression problem on the derivative**. Because we can only evaluate $f$ at estimated points, the "data" are generated on-the-fly and sequentially, one time step at a time — which is exactly the setting of [[Bayesian Filtering and Smoothing|Gauss–Markov filtering]].

## Main Content

### The initial value problem

> [!definition] ODE and IVP (Def. 36.1, 36.2)
> An **ordinary differential equation** is a relation
> $$ x'(t) = f(x(t)), \qquad \text{for all } t \in [0,T], $$
> between a curve $x : [0,T] \to \mathbb{R}^d$ and a **vector field** (dynamics) $f : V \to \mathbb{R}^d$ on a non-empty open set $V \subseteq \mathbb{R}^d$. The curve $x$ is a **solution of the initial value problem (IVP)** if additionally
> $$ x(0) = x_0 \in \mathbb{R}^d. $$
> If an additional **final condition** $x(T) = x_T$ is imposed, the problem becomes a **boundary value problem (BVP)**. ^def-ivp
>
> Symbols: $x(t)$ the solution/state at time $t$; $x'(t) = \tfrac{d}{dt}x(t)$ its time derivative; $f$ the vector field mapping state to derivative; $x_0$ the (known) initial state; $[0,T]$ the time interval; $d$ the state dimension.

Restriction to **first-order autonomous** ODEs is without loss of generality: an $n$th-order ODE $x^{(n)}(t) = f(x^{(n-1)}(t),\dots,x(t))$ is reduced to first order by stacking derivatives into an augmented state $\bar{x} := [x, x', \dots, x^{(n-1)}]^\top$; and a non-autonomous $f(x(t),t)$ is analogous. (Notation is decluttered by hiding $t$.)

### Well-posedness: existence, uniqueness, regularity

Not every IVP has a well-defined solution (multiple solutions, or blow-up before $T$). Two assumptions exclude these pathologies.

> [!definition] Local Lipschitz assumption (Assumption 36.3)
> $V \subseteq \mathbb{R}^d$ is open, $x_0 \in V$, and $f$ is **locally Lipschitz continuous**: for each subset $U \subseteq V$ there is $L_U > 0$ with
> $$ \|f(x) - f(y)\| \le L_U \|x - y\|, \qquad \forall x,y \in U. $$

> [!theorem] Picard–Lindelöf (Theorem 36.4)
> Under Assumption 36.3, choose $\delta > 0$ with $\overline{B_\delta(x_0)} := \{x : \|x - x_0\| \le \delta\} \subseteq V$ and set $M := \sup_{x \in \overline{B_\delta(x_0)}} \|f(x)\|$. Then there is a **unique local solution** $x : [0, \delta/M] \to \mathbb{R}^d$. If $V = \mathbb{R}^d$ and $M < \infty$, the unique global solution exists on $[0,\infty)$. ^thm-picard

> [!theorem] Regularity of IVP solutions (Theorem 36.6)
> Under Assumption 36.3 and Assumption 36.5 ($f \in C^{q-1}(V, \mathbb{R}^d)$, i.e. $f$ is $(q-1)$-times continuously differentiable, for some $q \in \mathbb{N}$), the unique solution is **one order more regular than $f$**: $x \in C^q([0,T], \mathbb{R}^d)$. ^thm-regularity
>
> *Proof sketch.* Induction over $q$. Base case $q=1$: continuity of $f$ plus the fundamental theorem of calculus applied to the ODE. Inductive step: differentiate the ODE $x' = f(x)$ once more, using $f \in C^{q}$. $\square$

This regularity is the crucial fact exploited by probabilistic solvers: if $f$ is smooth, the solution has $q$ well-defined derivatives that can be **modelled explicitly in a state-space representation** and extrapolated by Taylor polynomials.

### From IVP to regression: the state-space (derivatives) view

The solution can be regarded as **curve fitting of a time series** using information about $x'(t)$ at grid points $0 = t_0 < t_1 < \dots < t_N = T$, obtained from evaluations of $f$. Jointly modelling $[x, x']$ with a Gaussian process and treating this as GP regression is the abstract idea; the naive cost is $\mathcal{O}(N^3)$. Restricting to **Gauss–Markov priors** (laws of linear time-invariant SDEs) collapses the cost to $\mathcal{O}(N)$ via [[Bayesian Filtering and Smoothing|Kalman filtering/smoothing]] — see [[ODE Filters and Smoothers]].

The pivotal insight (developed fully in [[Classical ODE Solvers as Regression]]) is that after discarding the artificial local "flow map" constructs of classical numerics, approximating $x$ is **nothing but a regression on the data set**
$$ \big\{ x(0) \stackrel{!}{=} x_0, \quad x'(t_n) \stackrel{!}{=} f(\hat{x}(t_n)); \; n = 0,\dots,N \big\}, $$
where $\hat{x}(t_n)$ is the solver's current numerical estimate. The circularity ($\hat{x}$ appears on both sides) is harmless because the solver, like a filter, proceeds **sequentially through time**: at each $t_n$ a predictive mean conditioned on preceding steps is already available.

### Relation to integration

ODEs are the "nonlinear extension" of univariate integration: if the vector field is independent of $x$, i.e. $x'(t) = g(t)$, the IVP reduces to the [[The Integration Problem|quadrature]] problem $x(t) = x_0 + \int_0^t g(s)\,ds$, solvable by any method of Part II. Consequently, any ODE solver that models $x$ by a GP reduces to [[Bayesian Quadrature]] on such linear instances (made precise in [[ODE Filters and Smoothers]], the EKF0/BQ equivalence). Beyond quadrature, ODE solvers additionally require **iterative learning** of $x(t)$ using its own previous estimates and **tracking of accumulated uncertainty over time**.

### Two families of probabilistic solvers

- **ODE filters and smoothers** ([[ODE Filters and Smoothers]], [[Theory of ODE Filters and Smoothers]]): impose a Gauss–Markov *prior* on $x$ and its derivatives and compute a *posterior* $p(x \mid \{f(\hat{x}(t_i))\})$ by (extended/unscented) Kalman filtering + RTS smoothing, or by particle filtering for the full non-Gaussian posterior. This family contains classical Runge–Kutta and Nordsieck methods as posterior means.
- **Perturbative solvers** ([[Perturbative ODE Solvers]]): do *not* compute a posterior. They build a stochastic simulator by perturbing a classical solver so that the injected noise matches the numerical error; randomised runs are samples from the distribution of numerically possible trajectories. They can represent bifurcations and chaos, but must simulate the ODE multiple times.

## Examples

> [!example] Ill-posed IVPs (from §36)
> **Non-unique:** $x'(t) = 2\,\text{sign}(t)\sqrt{|x(t)|}$ with $x_0 = 0$ admits infinitely many solutions $x(t) = 0$ for $t \le t_0$ and $\pm(t - t_0)^2$ afterwards, for any $t_0$. **Finite-time blow-up:** $x'(t) = x(t)^2$ with $x(0)=x_0$ has $x(t) = x_0/(1 - x_0 t)$, which cannot be extended past the singularity $t = 1/x_0$. Both violate the conditions guaranteeing a well-defined solution; there is then nothing to approximate. Assumptions 36.3/36.5 exclude such cases, so numerical error retains its meaning.

> [!example] Higher-order ODE as first-order system
> A second-order ODE $x''(t) = f(x'(t), x(t))$ becomes first-order via $\bar{x} := [x, x']^\top$ and $\bar{f}(\bar{x}) := [x', f(x', x)]^\top$. Classical solvers always do this reduction; ODE filters can alternatively model the higher-order ODE *directly* by choosing a suitable state-space model with enough derivatives (Exercise 38.2; Bosch, Tronarp & Hennig 2022).

## Connections

- Instantiates [[Computation as Probabilistic Inference]] and the [[The Numerical Agent]] agenda for the ODE problem class.
- The engine is [[Gauss-Markov Processes and SDEs]] (the prior) and [[Bayesian Filtering and Smoothing]] (the inference).
- Reduces to [[The Integration Problem]] / [[Bayesian Quadrature]] when $f$ is independent of $x$.

## See Also
- [[Classical ODE Solvers as Regression]] — makes the "IVP = regression on $x'$" claim rigorous and shows classical solvers are posterior means.
- [[ODE Filters and Smoothers]] — the central algorithmic realisation via state-space models.
- [[Perturbative ODE Solvers]] — the alternative, non-Bayesian family.
- [[Further Topics in ODE Solvers]] — BVPs, inverse problems, PDEs, and the frontier.
