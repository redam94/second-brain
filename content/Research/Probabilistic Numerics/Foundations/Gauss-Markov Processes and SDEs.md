---
title: Gauss-Markov Processes and SDEs
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/definition
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 5, pp. 41-54"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Gaussian Process Regression]]"
  - "[[Gaussian Distributions and Algebra]]"
used_by:
  - "[[Bayesian Filtering and Smoothing]]"
  - "[[Solving ODEs as Inference]]"
  - "[[ODE Filters and Smoothers]]"
  - "[[Theory of ODE Filters and Smoothers]]"
  - "[[Classical ODE Solvers as Regression]]"
aliases:
  - Linear SDE
  - Integrated Wiener Process
  - IWP
  - State-Space Model
  - Ornstein-Uhlenbeck Process
  - Matern Process
  - Ito Integral
---
# Gauss-Markov Processes and SDEs
> [!summary]
> Gauss–Markov processes are Gaussian processes on a one-dimensional (time) domain whose "finite memory" (Markov property) permits inference in *linear* time. Their continuous-time dynamics are linear time-invariant **stochastic differential equations** (SDEs) driven by a Wiener process (via the Itô integral). Discretising an SDE on a time grid yields a linear-Gaussian state-space recurrence $x_{t+1}=A(h)x_t+\xi_t$, $\xi_t\sim\mathcal{N}(0,Q(h))$, with closed-form transition matrix $A(h)$ and process-noise covariance $Q(h)$. The **integrated Wiener process (IWP)** and the **Matérn/Ornstein–Uhlenbeck** families are the workhorse priors for ODE solvers and filtering.

## Overview
[[Gaussian Process Regression|GP regression]] with $N$ data points costs $\mathcal{O}(N^3)$ (a Gram-matrix inverse). Many numerical problems, however, live on an *ordered* one-dimensional path parametrised by "time" $t$: quadrature steps along the integration interval; ODE solvers march along the solution curve; even optimisation traces a (discretised) curve of iterates. On such domains one can build models that pass a *finite* amount of information forward and backward along the line — the **Markov property** — reducing inference to $\mathcal{O}(N)$. These are Gauss–Markov processes, and their computations are packaged as *filters* and *smoothers* (see [[Bayesian Filtering and Smoothing]]). Their continuous-time generators are linear SDEs.

## Main Content
### Deterministic linear dynamics
For a deterministic state $x(t)\in\mathbb{R}^N$, the linear time-invariant ODE $\tfrac{\mathrm{d}x}{\mathrm{d}t}=Fx(t)$, $x(t_0)=x_0$, is solved by the **matrix exponential** $x(t)=\exp(F(t-t_0))x_0$, where $e^{X}=\sum_{i=0}^\infty X^i/i!$. On a time grid $[t_0,\dots,t_N]$ this yields the linear recurrence $x_{t_{i+1}}=A_{t_i}x_{t_i}$ with $A_{t_i}=\exp(F(t_{i+1}-t_i))$. To turn this into a probabilistic prior we add centred Gaussian disturbances — leading to SDEs.

### The linear SDE and the Itô integral
> [!definition] Linear (time-invariant) SDE (Def. 5.4)
> Consider curves $x:t\mapsto x(t)\in\mathbb{R}^N$ for $t>t_0$, with matrices $F\in\mathbb{R}^{N\times N}$ and vector $L\in\mathbb{R}^N$. The linear time-invariant SDE
> $$
> \mathrm{d}x(t) = F\,x(t)\,\mathrm{d}t + L\,\mathrm{d}\omega_t,
> $$
> together with initial value $x(t_0)=x_0$, describes the local behaviour of a unique Gaussian process with
> $$
> \mathbb{E}(x(t))=e^{F(t-t_0)}x_0, \tag{5.18}
> $$
> $$
> \operatorname{cov}(x(t),x(t'))=\int_{t_0}^{\min(t,t')}e^{F(t-\tau)}\,LL^\top\,e^{F^\top(t'-\tau)}\,\mathrm{d}\tau =: k(t,t'). \tag{5.19}
> $$
> This GP is *the* solution of the SDE.
^def-linear-sde

Here $\mathrm{d}\omega_t$ denotes an **Itô integral** increment. Rigorously, SDE solution paths are almost surely *nowhere differentiable* (infinite total variation), so $\mathrm{d}\omega_t$ is not an ordinary derivative; the notation "$\mathrm{d}x=L\,\mathrm{d}\omega_t$" is shorthand for the Itô stochastic integral equation $x(t)=\int_0^t L\,\mathrm{d}\omega_s$. The heuristic "$\mathrm{d}\omega/\mathrm{d}t$ = Gaussian white noise" is intuitive but formally informal.

> [!definition] Wiener process (increment of Brownian motion)
> The simplest choice $N=1,\,L=1,\,F=0$ gives $\mathrm{d}x(t)=\mathrm{d}\omega_t$, whose solution is the **Wiener process**: constant mean $\mathbb{E}(x(t))=x_0$ and covariance $k(t,t')=\min(t,t')-t_0$. Its paths are continuous but nowhere differentiable, with expected deviation from $x_0$ growing as $\sqrt{t}$.
^def-wiener

### Discretisation: state-space recurrence
On grid steps $h_i:=t_{i+1}-t_i$, the SDE induces the discrete-time stochastic recurrence
$$
p(x_{t_{i+1}}\mid x_{t_i})=\mathcal{N}(x_{t_{i+1}};\,A_{t_i}x_{t_i},\,Q_{t_i}),
$$
$$
A_{t_i}:=\exp(F(t_{i+1}-t_i)),\qquad Q_{t_i}:=\int_0^{t_{i+1}-t_i}e^{F\tau}\,LL^\top\,e^{F^\top\tau}\,\mathrm{d}\tau. \tag{5.20-5.21}
$$
$A(h)$ is the **transition/discretisation matrix**, $Q(h)$ the **process-noise covariance** — exactly the ingredients of a linear-Gaussian [[Bayesian Filtering and Smoothing|state-space model]].

### The Integrated Wiener Process (IWP) and polynomial splines
> [!definition] $q$-times integrated Wiener process
> Take $F\in\mathbb{R}^{(q+1)\times(q+1)}$ and $L\in\mathbb{R}^{q+1}$ as
> $$
> F=\begin{bmatrix}0&1&0&\cdots&0\\0&0&1&\cdots&0\\ \vdots&&\ddots&\ddots&\vdots\\0&0&\cdots&0&1\\0&0&\cdots&0&0\end{bmatrix},\qquad L=\begin{bmatrix}0\\0\\\vdots\\0\\\theta\end{bmatrix}. \tag{5.22}
> $$
> This makes each state component the derivative of the previous, so the state stacks a function and its derivatives:
> $$
> x(t)=\big[f(t)\ \ f'(t)\ \ f''(t)\ \cdots\ f^{(q)}(t)\big]. \tag{5.23}
> $$
> The bottom component is driven by white noise; integrating it $q$ times yields $f$. The scale $\theta$ (in $L$) is the output-scale hyperparameter (see [[Hierarchical Inference in Gaussian Models]]).
^def-iwp

For the IWP the discrete matrices are **polynomials in the step $h$** (SPD $Q$, upper-triangular $A$), with elements ($1\le i,j\le q+1$)
$$
[A(h)]_{ij}=\mathbb{I}(j\ge i)\,\frac{h^{\,j-i}}{(j-i)!},\qquad [A^{-1}(h)]_{ij}=\mathbb{I}(j\ge i)\,\frac{(-h)^{\,j-i}}{(j-i)!}, \tag{5.24-5.25}
$$
$$
[Q(h)]_{ij}=\theta^2\,\frac{h^{\,2q+3-i-j}}{(2q+3-i-j)\,(q+1-i)!\,(q+1-j)!}. \tag{5.26}
$$
For $q=1$ (once-integrated Wiener) the kernel is $\operatorname{cov}(f(a),f(b))=\theta^2\big(\tfrac13\min^3(a,b)+|a-b|\tfrac12\min^2(a,b)\big)$ (Eq. 5.27), whose noise-free GP posterior mean is the **cubic spline**. Generally, posterior interpolants of the $q$-times IWP are $2q+1$-order splines.

### The Matérn / Ornstein–Uhlenbeck family
> [!definition] Ornstein–Uhlenbeck (OU) process
> The univariate SDE with negative $F=-1/\lambda$ and $L=2\theta/\sqrt\lambda$,
> $$
> \mathrm{d}x=-\tfrac{x}{\lambda}\,\mathrm{d}t+\tfrac{2\theta}{\sqrt\lambda}\,\mathrm{d}\omega_t,
> $$
> has (from Eqs. 5.18–5.19) $\mathbb{E}(x(t))=x_0e^{-(t-t_0)/\lambda}$ and, in the stationary limit $t_0\to-\infty$, vanishing mean and covariance $k(t,t')=\theta^2 e^{-|t-t'|/\lambda}$. It models a particle in a harmonic potential (velocity/mean-reversion). $\lambda$ is a length-scale, $\theta$ an output-scale.
^def-ou

General integrals of OU processes give the **Matérn** covariance family. For $\nu=q+\tfrac12$ (integer $q$), with $r=|t-t'|$ and $\xi=\sqrt{2\nu}/\lambda$, the Matérn process is the solution of the multivariate state-space SDE $\mathrm{d}z(t)=Fz(t)\,\mathrm{d}t+L\,\mathrm{d}\omega_t$, $z\in\mathbb{R}^{q+1}$, with **companion-matrix** $F$ (bottom row $-a_0,\dots,-a_q$ from the polynomial $(\xi+i\omega)^{-(q+1)}$) and $L=[0,\dots,0,\theta]^\top$ (Eq. 5.28). The most popular kernels are
$$
k_{1/2}(r)=\theta^2 e^{-r/\lambda},\quad k_{3/2}(r)=\theta^2\big(1+\tfrac{\sqrt3 r}{\lambda}\big)e^{-\sqrt3 r/\lambda},\quad k_{5/2}(r)=\theta^2\big(1+\tfrac{\sqrt5 r}{\lambda}+\tfrac{5r^2}{3\lambda^2}\big)e^{-\sqrt5 r/\lambda}.
$$
The Matérn RKHS is norm-equivalent to the Sobolev space $H^{q+1}(\mathbb{R})$ — controlling sample smoothness.

### Steady state (Riccati)
Running a filter with such a prior for many steps, the predictive covariance $P_i^-$ obeys a **discrete-time algebraic Riccati equation (DARE)**; whether it converges to a finite steady-state $P_\infty^-$ is decided by the eigenvalues of an associated symplectic matrix (half inside the unit circle ⇒ convergence). This certifies that the solver does not "lose track" over long integrations.

## Examples
> [!example] Building an ODE-solver prior
> To solve $x'(t)=f(x(t),t)$, place a $q$-times IWP prior on the solution: the state $[x,x',\dots,x^{(q)}]$ literally carries the derivatives the ODE constrains. Discretising gives cheap $A(h),Q(h)$ (polynomials in the step), and each ODE evaluation becomes a Gaussian observation on the derivative component — the basis of [[ODE Filters and Smoothers]].

> [!example] Wiener prior as a random walk of information
> With $F=0,L=1$ the Wiener process spreads variance $\propto t$: uncertainty grows linearly with distance from the last observation, exactly the intuition of accumulating numerical error between evaluation nodes.

## Connections
- A Gauss–Markov process is a [[Gaussian Process Regression|Gaussian process]] with the Markov property; inference is $\mathcal{O}(N)$ via [[Bayesian Filtering and Smoothing]] rather than $\mathcal{O}(N^3)$.
- The IWP/Matérn priors are the backbone of [[Solving ODEs as Inference]], [[ODE Filters and Smoothers]], and [[Theory of ODE Filters and Smoothers]].
- The IWP posterior-mean = spline result links to [[Classical ODE Solvers as Regression]] and the "classical methods are Gaussian posterior means" thesis.
- The scale $\theta$ and length-scale $\lambda$ are calibrated by [[Hierarchical Inference in Gaussian Models]].

## See Also
- [[Bayesian Filtering and Smoothing]] — the linear-time inference algorithms on these models.
- [[Gaussian Process Regression]] — the non-Markov parent framework.
- [[Solving ODEs as Inference]] — the main downstream application.
- [[Hierarchical Inference in Gaussian Models]] — calibrating $\theta,\lambda$ at runtime.
