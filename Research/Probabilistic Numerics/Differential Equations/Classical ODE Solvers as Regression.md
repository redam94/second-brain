---
title: Classical ODE Solvers as Regression
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/theorem
  - type/example
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 37, pp. 289-294"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Differential Equations"
doc_type: textbook
depends_on:
  - "[[Solving ODEs as Inference]]"
  - "[[Gaussian Process Regression]]"
  - "[[Classical Quadrature as Inference]]"
used_by:
  - "[[ODE Filters and Smoothers]]"
  - "[[Theory of ODE Filters and Smoothers]]"
aliases:
  - Runge-Kutta as Regression
  - Nordsieck Methods
  - Uncertainty-Unawareness
  - Taylor Extrapolation of the Flow
---

# Classical ODE Solvers as Regression

> [!summary]
> Every classical ODE solver extrapolates a numerical estimate forward using the flow map $\Phi_h$, whose Taylor expansion in the step $h$ it matches to some order $p$. Both single-step (Runge–Kutta) and multistep (Nordsieck) methods amount to iterated **Hermite interpolation** of the flow using derivative data $\{f^{(i)}\}$. Stripping away the artificial "flow map" bookkeeping reveals that solving an IVP is nothing but **regression on the data $\{x(0)=x_0,\ x'(t_n)=f(\hat x(t_n))\}$**. Classical solvers are the (uncertainty-unaware) posterior means of such Gaussian regressions; adding calibrated noise to their Hermite extrapolation yields uncertainty-aware probabilistic solvers.

## Overview

This note substantiates the thesis that **classical solvers are posterior means of a Gaussian regression procedure**. It builds the bridge from the "physics" view of an ODE solver (following the flow of a force field) to the statistical view (regression on derivative data), preparing the rigorous state-space model of [[ODE Filters and Smoothers]].

## Main Content

### The flow map and forward extrapolation

Any estimate $\hat{x}(t) \approx x(t)$ comes with a derivative estimate
$$ y_t := f(\hat{x}(t)) \stackrel{\hat{x}(t)\approx x(t)}{\approx} f(x(t)) \stackrel{\text{ODE}}{=} x'(t), \tag{37.1} $$
which supports a local linearisation $\hat{x}(t+h) = \hat{x}(t) + h\,y_t$ (Euler's method). Symbols: $\hat{x}(t)$ numerical estimate; $y_t$ the derivative estimate from evaluating $f$; $h$ the step size.

After the first step a solver follows a *new* IVP with the same $f$ but initial value $x(t) = \hat{x}(t)$, motivating the **flow map**
$$ \Phi_t(a) := a + \int_0^t f(x(s))\,ds, \tag{37.2} $$
where $x(t) = \Phi_t(a)$ solves the IVP with $x(0) = a$. Standard solvers extrapolate $t \to t+h$ by approximating $\Phi_h(\hat{x}(t))$ as cheaply and precisely as possible.

### Order conditions = matching Taylor summands of the flow

> [!definition] Taylor series of the flow (Eq. 37.3–37.4)
> $$ \Phi_h(\hat{x}(t)) = \sum_{i=0}^{\infty} \frac{h^i}{i!} f^{\langle i\rangle}(\hat{x}(t)), $$
> where the **iterated coefficients** are recursively defined by $f^{\langle 0\rangle}(a) := a$, $f^{\langle 1\rangle}(a) := f(a)$, and
> $$ f^{\langle i\rangle}(a) := \big[\nabla_x f^{\langle i-1\rangle} \odot f\big](a), $$
> with $\odot$ the elementwise product. Crucially $\tfrac{\partial^i}{\partial t^i}\Phi_t(\hat x(t))|_{t=0} = f^{\langle i\rangle}(\hat x(t))$, i.e. the $i$-th Taylor summand is the $i$-th total time-derivative of the flow. ^def-flow-taylor

> [!theorem] Order of a classical solver (§37)
> A solver that matches the first $p \in \mathbb{N}$ summands of Eq. (37.3) has **local convergence rate** $\mathcal{O}(h^{p+1})$ and, after $N = T/h \in \mathcal{O}(1/h)$ steps, **global rate** $\mathcal{O}(h^{p})$; it is called a **$p$th-order method**. ^thm-order
>
> A $p$th-order single-step solver (e.g. $p$th-order Runge–Kutta) matches the first $p$ derivatives $\{f^{\langle i\rangle}(\hat{x}(t)); i=1,\dots,p\}$ of $\Phi_h(\hat{x}(t))$ at $h=0$, i.e. it **locally performs Hermite interpolation** of $\Phi_h(\hat x(t))$ with data
> $$ \Big\{ \Phi_0(\hat{x}(t)) \stackrel{!}{=} \hat{x}(t), \quad \tfrac{\partial^i}{\partial t^i}\Phi_t(\hat{x}(t))\big|_{t=0} \stackrel{!}{=} f^{\langle i\rangle}(\hat{x}(t)); \; i = 1,\dots,p \Big\}. \tag{37.5}$$

Single-step methods collect additional Taylor information at sub-steps of $[t, t+h]$; multistep methods reuse information $\{y_{t-h}, y_{t-2h}, \dots\}$ from previous steps. Both build a better polynomial extrapolation of $\Phi$; Nordsieck (1962) already observed that *all* such methods are equivalent to finding an approximating polynomial.

### Uncertainty-unawareness: the false data assignment

Because $\hat{x}(t) \approx x(t)$, classical solvers **pretend** the flow-map data (37.5) relate to the *true* solution rather than to the estimate $\hat{x}(t)$. Removing the flow map $\Phi$ gives the data set actually used:
$$ \big\{ x(t) \stackrel{!}{=} \hat{x}(t), \quad x^{(i)}(t) \stackrel{!}{=} f^{\langle i\rangle}(\hat{x}(t)); \; i = 1,\dots,p \big\}. \tag{37.6}$$
Falsely treating the current estimate $\hat{x}(t)$ as the true $x(t)$ (rather than re-conditioning on the exact solution) is the property called **uncertainty-unawareness** — a defining trait of classical numerics (Kersting 2020). It is overly optimistic: iterating Hermite interpolation on the true (but inaccessible) data would give a strictly more accurate regression, numerically demonstrated for RK4 in Fig. 37.2.

### The regression formulation

Two observations unify single-step and multistep methods:
1. Whenever an estimate $\hat{x}(t)$ is available, we may pool derivative data across *all* visited times $t$.
2. Even the higher-derivative data $f^{\langle i\rangle}$ are artificial constructs built from the single principle (37.1); a regression method that aggregates $x'$ information at least as skillfully can treat any evaluation $f(\hat{x}(t))$ as data on $x'(t)$.

Discarding the artificial higher-derivative bookkeeping, on a discretisation $0 = t_0 < \dots < t_N = T$, **approximating $x$ is nothing but a regression on**
$$ \big\{ x(0) \stackrel{!}{=} x_0, \quad x'(t_n) \stackrel{!}{=} f(\hat{x}(t_n)); \; n = 0,\dots,N \big\}. \tag{37.7}$$
The apparent circularity (needing $\hat{x}(t_n)$ to define the regression whose goal is $\hat{x}(t_n)$) is resolved because Gauss–Markov regression proceeds **sequentially in time**: at each $t_n$ a predictive mean conditioned on the preceding steps is available. The global regression (37.7) is revealed to the solver one step at a time, as a time series. Performing Bayesian regression on a state-space model realising (37.7) yields the **ODE filters and smoothers**.

### Classical vs probabilistic: what changes

For a *well-calibrated* classical solver the point estimate $\hat{x}$ lies close to the true solution — and equals the **mean/mode** of the corresponding Gaussian probabilistic solver. The probabilistic solver additionally returns a posterior whose **width (standard deviation)** is meaningfully related to the true error, and, in the nonparametric (perturbative/particle) case, whose samples cover the whole distribution of numerically possible trajectories (e.g. both branches of a bifurcation).

## Examples

> [!example] Euler's method as first-order Taylor / regression
> Euler uses a first-order Taylor expansion $\hat{x}(t+h) = \hat{x}(t) + h\,y_t$ to approximate $\Phi_h(\hat x(t))$. By Taylor's theorem the local error is $\mathcal{O}(h^2)$ and, after $N = T/h$ steps, the global error is $\mathcal{O}(h)$: a first-order method ($p=1$). It is the purest instance of iterating the single principle (37.1).

> [!example] RK4 vs iterated Hermite interpolation (Fig. 37.2)
> On a linear ODE $x'(t) = x(t)$, $x(0)=1.0$, and on the Van-der-Pol oscillator, comparing fourth-order Runge–Kutta (which uses the *inaccessible* estimate-based data $\hat{x}$) against iterated fourth-order Hermite interpolation on the *exact* data (37.6) shows the latter attains a **lower maximal error**. This quantifies the price of uncertainty-unawareness: classical solvers throw away information by mislabelling estimates as truth.

> [!example] A brief history (§37.1)
> Skilling (1991) first proposed treating ODEs as GP regression. Hennig & Hauberg (2014) generated data by evaluating $f$ at the posterior *mean* — the lineage of **ODE filters** (reproducing Runge–Kutta: Schober, Duvenaud & Hennig 2014; Kalman speed-up: Schober, Särkkä & Hennig 2019; rigorous SSM: Tronarp et al. 2019). Chkrebtii et al. (2016) evaluated $f$ at Gaussian *samples* — the lineage of **perturbative solvers** (Conrad et al. 2017 modelled local error as scaled random variables added after each step).

## Connections

- Provides the rigorous "regression" reading needed by [[Solving ODEs as Inference]] and realised in [[ODE Filters and Smoothers]].
- Parallels [[Classical Quadrature as Inference]]: classical quadrature rules are likewise posterior means of Bayesian quadrature.
- The Taylor-expansion logic of the flow underlies the choice of the **integrated Wiener process prior** and the convergence theory of [[Theory of ODE Filters and Smoothers]].

## See Also
- [[Solving ODEs as Inference]] — the framing this note makes rigorous.
- [[ODE Filters and Smoothers]] — the state-space realisation of regression (37.7); EKF0 reproduces classical solvers.
- [[Theory of ODE Filters and Smoothers]] — §39.3 shows EKF0 with IWP prior equals the trapezoidal rule and Nordsieck methods.
- [[Classical Quadrature as Inference]] — the integration analogue.
