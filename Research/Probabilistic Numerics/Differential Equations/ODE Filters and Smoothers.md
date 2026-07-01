---
title: ODE Filters and Smoothers
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 38, pp. 295-316"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Differential Equations"
doc_type: textbook
depends_on:
  - "[[Solving ODEs as Inference]]"
  - "[[Classical ODE Solvers as Regression]]"
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Bayesian Filtering and Smoothing]]"
  - "[[Gaussian Distributions and Algebra]]"
used_by:
  - "[[Theory of ODE Filters and Smoothers]]"
  - "[[Further Topics in ODE Solvers]]"
aliases:
  - ODE Filter
  - EKF0
  - EKF1
  - Extended Kalman ODE Filter
  - EKS0
  - EKS1
  - Particle ODE Filter
  - IWP Prior
  - State-Space Model for ODEs
---

# ODE Filters and Smoothers

> [!summary]
> An ODE filter models the solution $x$ and its first $q$ derivatives jointly by a Gauss–Markov process — the $q$-times integrated Wiener process (IWP) prior — and conditions on the ODE by treating the residual $x'(t_n) - f(x(t_n))$ as a (zero-valued) observation. This yields a **nonlinear state-space model (SSM)** solved by Bayesian filtering (prediction along the linear-Gaussian dynamics + a nonlinear update) and RTS smoothing. The standard Gaussian methods are the **extended Kalman ODE filters/smoothers EKF0/EKF1** and **EKS0/EKS1** (zeroth/first-order Taylor linearisation of $f$); a **particle ODE filter** captures the full non-Gaussian posterior. Recommended default: **EKS1**.

## Overview

This is the central note of Part VI. It gives (1) the continuous- and discrete-time SSM that rigorously casts an IVP as filtering (Tronarp et al. 2019); (2) the IWP prior and its Taylor-extrapolation semantics; (3) the exact prediction step and the approximate EKF0/EKF1 update; (4) the RTS smoother pass; (5) iterated smoothers for MAP inference; (6) the particle filter for the true posterior; and (7) calibration, step-size control, and the choice of method. It heavily reuses [[Gauss-Markov Processes and SDEs]] (the prior) and [[Bayesian Filtering and Smoothing]] (the Kalman filter/RTS smoother).

## Main Content

### The state vector and continuous-time SSM

We model $x$ and $x'$ jointly by a stochastic process $X(t)$ (the "system"), whose state vector $\vec{x}(t) : [0,T] \to \mathbb{R}^D$ contains $x$ and its derivatives via fixed projection matrices:
$$ x(t) = H_0\,\vec{x}(t), \qquad x'(t) = H\,\vec{x}(t), \tag{38.3}$$
with $H_0 \in \mathbb{R}^{d\times D}$ extracting the solution and $H \in \mathbb{R}^{d\times D}$ extracting its derivative. For the standard choice modelling $q$ derivatives ($d=1$), $H_0 = [1,0,\dots,0]$ and $H = [0,1,0,\dots,0] \in \mathbb{R}^{1\times(q+1)}$, so $D = q+1$.

> [!definition] Continuous-time dynamic model (Eqs. 38.4–38.6)
> The prior is the law of a **linear time-invariant SDE**
> $$ dX(t) = F X(t)\, dt + L\, d\omega_t, \qquad X(0) \sim \mathcal{N}(m_0, P_0), $$
> where $\omega_t$ is a standard Wiener process, $F$ the drift and $L$ the diffusion matrix. From the SDE solution (see [[Gauss-Markov Processes and SDEs]]),
> $$ p(\vec{x}(t)) = \mathcal{N}\big(\vec{x}(t);\, A(t) m_0,\, A(t) P_0 A(t)^\top + Q(t)\big), $$
> $$ A(t) := \exp(tF), \qquad Q(t) := \int_0^t e^{F\tau} L L^\top e^{F^\top\tau}\, d\tau. $$ ^def-ssm-cont
> Here $A(t)$ is the **transition (discretisation) matrix** and $Q(t)$ the **process-noise covariance**.

### Conditioning on the ODE: the observation process

Define the nonlinear map $g : \mathbb{R}^D \to \mathbb{R}^d$, $\ \xi \mapsto H\xi - f(H_0\xi)$, and the **state misalignment** (observation process)
$$ z(t) \sim Z(t) := g(X(t)) = H X(t) - f(H_0 X(t)). \tag{38.7-38.8}$$
Because $\vec{x}(t)$ solves the ODE iff $x' = f(x)$, we have $z(t) = 0$ for all $t \in [0,T]$. Imposing this via the Dirac likelihood $p(z(t)\mid \vec{x}(t)) = \delta(g(\vec{x}(t)))$ and observing the constant data $z \equiv 0$ conditions on all information in the IVP. In the continuous-data limit Picard–Lindelöf guarantees zero posterior uncertainty, $p(x \mid z\equiv 0) = \delta(x - x(t))$ — hinting at the favourable convergence of [[Theory of ODE Filters and Smoothers]].

### Discrete-time SSM (Tronarp et al. 2019)

On a grid $0 = t_0 < \dots < t_N = T$ with steps $h_n := t_n - t_{n-1}$, writing $x_n := \vec{x}(t_n)$, $z_n := z(t_n)$:

> [!definition] Nonlinear discrete SSM for ODEs (Eqs. 38.10–38.13)
> $$ p(x_0) = \mathcal{N}(x_0; m_0, P_0), $$
> $$ p(x_{n+1}\mid x_n) = \mathcal{N}\big(x_{n+1};\, A(h_{n+1}) x_n,\, Q(h_{n+1})\big), $$
> $$ p(z_n\mid x_n) = \delta\big(z_n - g(x_n)\big), \qquad \text{with data } z_n = 0. $$ ^def-ssm-disc
> This resembles the linear-Gaussian SSM of [[Bayesian Filtering and Smoothing]], except the measurement map $H_n x_n = g(x_n)$ is now nonlinear (and $R_n = 0$). It is complete and rigorous, so **any** Bayesian filter/smoother applies. Note the data $z_n=0$ carry information *through the likelihood*: conditioning on $g(x_n)=0$ imposes $x'(t_n) \stackrel{!}{=} f(x(t_n))$ — the analogue of Eq. (37.7).

### Choice of prior: the integrated Wiener process (IWP)

Modelling $x$ and its derivatives as coordinates, $X = [X^{(0)},\dots,X^{(q)}]^\top$ with $x^{(i)} \sim X^{(i)}$, forces $dX^{(i-1)} = X^{(i)}\,dt$ for $i=1,\dots,q$, restricting the SDE to
$$ F = \begin{bmatrix} 0 & 1 & 0 & \cdots & 0 \\ 0 & 0 & 1 & & \vdots \\ \vdots & & \ddots & \ddots & 0 \\ 0 & & & 0 & 1 \\ -a_0 & -a_1 & \cdots & -a_{q-1} & -a_q \end{bmatrix}, \qquad L = \begin{bmatrix} 0 \\ \vdots \\ 0 \\ \sigma \end{bmatrix}. $$
The drift coefficients $(a_0,\dots,a_q) \ge 0$ and scale $\sigma>0$ parametrise the Matérn family ($\nu = q + 1/2$). Two named special cases:
- **$q$-times integrated Wiener process (IWP):** $(a_0,\dots,a_q) = 0$. The **standard prior** for generic ODEs because it extrapolates with **Taylor polynomials** of degree $q$.
- **$q$-times integrated Ornstein–Uhlenbeck process (IOUP):** $(a_0,\dots,a_{q-1}) = 0$, only $a_q \ge 0$ free (mean-reverting); can help exponentially decaying curves (e.g. radioactive decay).

> [!theorem] IWP predictive mean = Taylor extrapolation (Eq. 38.14)
> Under the $q$-times IWP prior, the $i$-th component of the predictive mean of the dynamic model is
> $$ [A(h_{n+1}) x_n]_i = \sum_{k=i}^{q+1} \frac{h_{n+1}^{k-i}}{(k-i)!}[x_n]_k, $$
> i.e. a $(q+1-i)$-th-order **Taylor-polynomial extrapolation**. In particular the solution state ($i=1$) is predicted by a $q$-th-order Taylor expansion — the best local model absent further information (Taylor's theorem), matching classical solvers' forward extrapolation along $\Phi$. ^thm-iwp-taylor

### Initialisation

If $x_0$ is known exactly, all $q$ derivatives at $t_0$ are determined by $x^{(i)}(0) = f^{\langle i\rangle}(x_0)$ (recursive coefficients from [[Classical ODE Solvers as Regression]]), giving the **exact initialisation**
$$ m_0 = \big[x_0, f(x_0), f^{\langle 2\rangle}(x_0),\dots,f^{\langle q\rangle}(x_0)\big]^\top, \qquad P_0 = \mathbf{0}. $$
Krämer & Hennig (2020) compute this efficiently by **Taylor-mode automatic differentiation** (Bettencourt et al. 2019), with cost growing at most quadratically (not exponentially) in $q$.

### The algorithms (high level)

> [!definition] Bayesian ODE filtering (Algorithm 38.1)
> ```
> procedure ODE FILTER(f, x0, p(x_{n+1}|x_n))
>   initialise p(x0)                              // with available info about x(0)
>   for n = 0 : N-1 do
>     (optional) adapt dynamic model p(x_{n+1}|x_n)
>     (optional) choose step size h_n > 0
>     predict p(x_{n+1}|z_{1:n})   from p(x_n|z_{1:n})   // by (38.11)
>     observe z_{n+1} = 0                                  // by (38.13)
>     update  p(x_{n+1}|z_{1:n+1}) from p(x_{n+1}|z_{1:n})  // by (38.12)
>   end for
>   return {p(x_n|z_{1:n}); n=0,...,N}
> ```
> An **ODE smoother** (Algorithm 38.2) wraps this: after the forward filter pass, iterate $n = N-1,\dots,0$ computing the smoothing marginals $p(x_n\mid z_{1:N})$ from $p(x_{n+1}\mid z_{1:N})$ by the RTS recursion (Eq. 38.26). A filter/smoother is named by prefixing "ODE" to its classical name. ^alg-odefilter

### The extended Kalman ODE filters EKF0/EKF1

The dynamic model is linear-Gaussian, so the **prediction step is exact**:
$$ p(x_{n+1}\mid z_{1:n}) = \mathcal{N}(x_{n+1}; m_{n+1}^-, P_{n+1}^-), \quad m_{n+1}^- = A(h_{n+1}) m_n, \quad P_{n+1}^- = A(h_{n+1}) P_n A(h_{n+1})^\top + Q(h_{n+1}). \tag{38.17}$$
The update involves the nonlinear $f$ (via $g$); to stay Gaussian, linearise $f$ by a Taylor approximation around the predictive mean $m_{n+1}^-$. The two standard choices give the **approximate update step** (data $z_{n+1}=0$):

> [!definition] EKF0/EKF1 update (Eqs. 38.18–38.22)
> $$ \hat{z}_{n+1} := f(H_0 m_{n+1}^-) - H m_{n+1}^- \quad \text{(innovation residual)} $$
> $$ S_{n+1} := \tilde{H} P_{n+1}^- \tilde{H}^\top + R_{n+1} \quad \text{(innovation covariance)} $$
> $$ K_{n+1} := P_{n+1}^- \tilde{H}^\top S_{n+1}^{-1} \quad \text{(Kalman gain)} $$
> $$ m_{n+1} := m_{n+1}^- + K_{n+1}\hat{z}_{n+1}, \qquad P_{n+1} := (I_D - K_{n+1}\tilde{H}) P_{n+1}^-. $$
> The difference between EKF0 and EKF1 is only the choice of $\tilde H$:
> - **EKF0:** $\tilde{H} = H$. Exact update after replacing $f$ by the constant $\xi \mapsto f(H_0 m_{n+1}^-)$ (zeroth-order Taylor). Requires no Jacobian.
> - **EKF1:** $\tilde{H} = H - J_f(H_0 m_{n+1}^-) H_0$, with $J_f$ the Jacobian of $f$. Exact update after replacing $f$ by its linearisation $\xi \mapsto f(H_0 m_{n+1}^-) + J_f(H_0 m_{n+1}^-)[\xi - H_0 m_{n+1}^-]$ (first-order Taylor). ^def-ekf
>
> These never leave the Gaussian family, hence **Gaussian ODE filters**. Default $R_{n+1} = 0$ (recommended; a positive $R$ can absorb linearisation error). With $R=0$, EKF0 reproduces classical solvers (Schober, Särkkä & Hennig 2019) — see [[Theory of ODE Filters and Smoothers]] §39.3.

### The extended Kalman ODE smoothers EKS0/EKS1

Extend the filtering distributions to the full smoothing posterior $p(x_n\mid z_{1:N}) = \mathcal{N}(x_n; m_n^s, P_n^s)$ by the backward RTS recursion (Eqs. 38.23–38.25):
$$ G_n := P_n A(h_{n+1})^\top (P_{n+1}^-)^{-1} \ \text{(smoother gain)}, \quad m_n^s := m_n + G_n(m_{n+1}^s - m_{n+1}^-), \quad P_n^s := P_n + G_n(P_{n+1}^s - P_{n+1}^-) G_n^\top. $$
EKS0/EKS1 use the EKF0/EKF1 filter (line 3 of Alg. 38.2) then this backward pass. The smoothing posterior can be interpolated off-grid via the dynamics (38.11), so it contains the **same information as the full GP posterior**.

> [!remark] EKF0/EKS0 generalise Bayesian quadrature
> If the ODE is really an integral, $x'(t) = g(t)$, its solution is $x(t) = x_0 + \int_0^t g(s)\,ds$. Approximating this with the Kalman-filter version of [[Bayesian Quadrature]] (Algorithm 11.2) is **equivalent** to solving the ODE with the EKF0/EKS0 (Tronarp et al. 2019, Prop. 1).

### Iterated smoothers for MAP inference (IEKF/IEKS)

Almost nothing can be said about the *true* non-Gaussian posterior the EKF/EKS approximate. As a compromise, the **maximum a posteriori (MAP)** estimate — the most likely sample trajectory — solves the global MAP problem
$$ \vec{x}^*(t_{0:N}) = \arg\min_{\vec{x}(t_{0:N})} \Big[ \|\vec{x}(0) - m_0\|_{P_0}^2 + \sum_{n=1}^N \|\vec{x}(t_n) - A(h_n)\vec{x}(t_{n-1})\|_{Q(h_n)}^2 \Big], \tag{38.29}$$
subject to $z_{1:N}=0$, where $\|v\|_P := \sqrt{v^\top P^{-1} v}$ is the Mahalanobis norm. The **iterated extended Kalman smoother (IEKS)** and its filter (IEKF) iterate the EKS1/EKF1 with re-linearisation of $f$ around the new estimate until a fixed point; the IEKS converges to a local minimum of this non-convex problem and is regarded as the best Gaussian approximation of the true posterior (see convergence rates in [[Theory of ODE Filters and Smoothers]] §39.1.1).

### Particle ODE filters and smoothers

For the truly non-Gaussian posterior, use sequential Monte Carlo. Represent the filtering distribution by weighted samples $p(x_n\mid z_{1:n}) \approx \sum_{i=1}^M w_n^{(i)}\delta(x_n - x_n^{(i)})$. With a **proposal distribution** $\pi(x_{n+1}\mid x_n, z_{1:n+1})$, draw $x_{n+1}^{(i)} \sim \pi$ and update weights by importance sampling (Eqs. 38.39–38.40):
$$ w_{n+1}^{(i)} \propto w_n^{(i)}\, \frac{p(z_{n+1}\mid x_{n+1}^{(i)})\, p(x_{n+1}^{(i)}\mid x_n^{(i)})}{\pi(x_{n+1}^{(i)}\mid x_n^{(i)}, z_{1:n+1})}. $$
Sequential importance sampling + resampling defines the **particle ODE filter**, which approximates the true nonparametric posterior with Monte-Carlo rate $\mathcal{O}(M^{-1/2})$. It can capture bifurcations (Fig. 38.2, Bernoulli ODE). The bootstrap filter sets $\pi = p(x_{n+1}\mid x_n)$; closer proposals use a Gaussian filter.

### Calibration, error estimation, step-size selection (§38.5)

- **Global calibration:** the posterior covariance scales linearly with the prior scale $\sigma^2$. The quasi-ML estimator (Tronarp et al. 2019) for EKF0/EKF1 is
$$ \widehat{\sigma^2} = \frac{1}{N}\sum_{n=1}^N \hat{z}_n^\top \tilde{S}_n^{-1}\hat{z}_n, \tag{38.41}$$
with $\tilde{S}_n$ the innovation covariance at $\sigma:=1$ — nearly free, since it reuses the EKF likelihood approximations.
- **Local calibration:** $\widehat{\sigma_n^2} = \hat{z}_n^\top[\tilde{H}\tilde{Q}(h_n)\tilde{H}^\top]^{-1}\hat{z}_n$ (Eq. 38.42), capturing the *added* uncertainty of step $t_{n-1}\to t_n$.
- **Local error estimate:** $D(h_n) := \sqrt{\tilde{H} Q(h_n)\tilde{H}^\top}$ (with calibrated $\sigma$), a cheap probabilistic replacement for classical error estimates (which compare two solvers, e.g. Dormand–Prince/`ode45`).
- **Step-size control:** proportional control, $h_n^{\text{new}} = h_n\, \rho\,[\bar\varepsilon / D(h_n)]^{1/(q+1)}$, with tolerance $\bar\varepsilon$, safety factor $\rho\in(0,1]$, and local rate $q+1$ (Theorem 39.2).

### Which filter/smoother to choose? (§38.6)

> [!definition] Recommendation
> **Short answer: EKS1.** Gaussian filters/smoothers are far faster and more stable than particle filters. Among Gaussian ones, first-order (EKF1/EKS1) use the Jacobian of $f$ (automatic differentiation), giving a more precise mean and better-calibrated uncertainty. Smoothing exploits the full data $z_{1:N}$ over $[0,T]$ while keeping $\mathcal{O}(N)$ cost. **Alternatives:** EKF1 (skip smoothing pass — cheaper, good if only final-time $T$ matters); EKS0 (no Jacobian — cheaper constant, good for stiff ODEs when rough uncertainty suffices); EKF0 (both simplifications); IEKS (best for the MAP estimate); particle ODE filter (only when non-Gaussian structure, e.g. bifurcations, is crucial — then it is really an alternative to perturbative solvers). Efficient implementations: **ProbNum** package.

## Examples

> [!example] First EKF0 step, 2-times IWP (Fig. 38.1)
> With a 2-times IWP prior ($q=2$, modelling $x, x', x''$) initialised exactly at $x_0$: the **prediction** extrapolates $p(x_1)$ forward along the dynamic (Taylor) model; samples show diverging possibilities for $x, x', x''$. The **update** conditions on $x'(t_1) = f(m_1^-)$, collapsing the samples to those with the correct first derivative at $t_1$ and reducing uncertainty. The dashed 95% band contracts after conditioning on $z_1$. Repeating over $t_1\to t_2\to\dots$ produces the solution with calibrated error bars.

> [!example] Bifurcation capture (Fig. 38.2)
> The Bernoulli ODE $x'(t) = r x(t)(1 - |x(t)|)$, $r=1.25$, bifurcates at $0$ and concentrates at attractors $\pm 1$. With uncertain initial value $p(x_0) = \mathcal{N}(x_0; 0.05, 0.25^2)$, the true pushforward is bimodal at $\pm 1$. A bootstrap particle ODE filter (30 particles, 2-times IWP, $h=0.4$) nicely captures both branches; a Gaussian ODE filter would only track the middle solution and miss the bifurcation entirely.

## Connections

- Realises the regression (37.7) of [[Classical ODE Solvers as Regression]] as an SSM.
- Prior = [[Gauss-Markov Processes and SDEs]]; inference = [[Bayesian Filtering and Smoothing]] (Kalman + RTS, plus particle filters); Gaussian algebra from [[Gaussian Distributions and Algebra]].
- Convergence and calibration proved in [[Theory of ODE Filters and Smoothers]]; the perturbative alternative is [[Perturbative ODE Solvers]].

## See Also
- [[Theory of ODE Filters and Smoothers]] — convergence rates ($h^q$), A-stability, EKF0 = trapezoidal rule / Nordsieck methods.
- [[Perturbative ODE Solvers]] — non-Bayesian sampling solvers; the particle filter is closer to these than to Gaussian filters.
- [[Further Topics in ODE Solvers]] — BVPs, ODE inverse problems (EKF1 gives cheap gradients/Hessians), PDEs.
- [[Bayesian Quadrature]] — the special case EKF0/EKS0 reduces to.
