---
title: Theory of ODE Filters and Smoothers
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 39, pp. 317-330"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Differential Equations"
doc_type: textbook
depends_on:
  - "[[ODE Filters and Smoothers]]"
  - "[[Classical ODE Solvers as Regression]]"
  - "[[Gauss-Markov Processes and SDEs]]"
used_by:
  - "[[Further Topics in ODE Solvers]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
aliases:
  - Convergence Rates of ODE Filters
  - A-Stability of ODE Filters
  - EKF0 Trapezoidal Rule Equivalence
  - Nordsieck Equivalence
  - Square-Root ODE Filter
---

# Theory of ODE Filters and Smoothers

> [!summary]
> ODE filters attain **global polynomial convergence rates $\mathcal{O}(h^q)$** when $q$ derivatives are modelled — on par with $q$th-order Runge–Kutta — with a posterior standard deviation that is **asymptotically well-calibrated** (contracts at the same rate). Two analyses give this: a classical Grönwall-type argument (EKF0, $q$-times IWP) and a scattered-data-interpolation argument in an RKHS (MAP estimate, general priors). The EKF1/EKS1 are **A-stable**; numerical-linear-algebra instabilities from ill-conditioned $Q(h)$ are cured by a re-scaled (Nordsieck-like) coordinate transform and square-root filtering. In steady state the EKF0 with IWP prior **is** the trapezoidal rule ($q=1$) and a third-order Nordsieck method ($q=2$).

## Overview

Classical numerics has two analytical desiderata: **convergence rates** ($\|\hat x - x\|\to 0$ as $h\to 0$) and **numerical stability** (well-behaved $\hat x$ at practical $h>0$, especially for stiff ODEs). Probabilistic solvers add a third: **calibration** of the posterior variance. This note states the main theorems for the $q$-times IWP prior (the standard choice, [[ODE Filters and Smoothers]]), with conditions and proof sketches. Throughout, w.l.o.g. the step size $h>0$ is constant.

## Main Content

### Convergence rates — classical analysis (§39.1.1)

> [!definition] Regularity assumption (Assumption 39.1)
> $f \in C^q(\mathbb{R}^d,\mathbb{R}^d)$; $f$ globally Lipschitz; all derivatives of $f$ up to order $q$ uniformly bounded and globally Lipschitz. Formally there is $L>0$ with $\|D^\alpha f\|_\infty \le L$ for all multi-indices $1 \le \sum_i\alpha_i \le q$, and $\|D^\alpha f(a) - D^\alpha f(b)\| \le L\|a-b\|$ for $0 \le \sum_i\alpha_i \le q$.

> [!theorem] Local convergence of the EKF0 (Theorem 39.2)
> Let the prior be a $q$-times IWP or IOUP, $R>0$, and $m(h)$ the filtering mean from **one step** of the EKF0. Under Assumption 39.1 there is $C>0$ such that for all sufficiently small $h>0$,
> $$ \|m_0(h) - x(h)\| \le C\, h^{q+1}. $$
> I.e. the local (per-step) rate is $\mathcal{O}(h^{q+1})$, the optimal Taylor rate. ^thm-local
>
> *Proof sketch.* Bound all relevant quantities and apply Taylor's theorem; full argument in Kersting, Sullivan & Hennig (2020, Thm. 8). $\square$

> [!theorem] Global convergence of the EKF0/EKS0 (Theorem 39.3)
> Under the assumptions of Thm. 39.2, additionally restrict $q=1$, the prior to a $q$-times IWP, and $R \in \mathcal{O}(h^q)$ constant across time. Then there is $C(T)>0$, depending on final time $T$, such that for all sufficiently small $h>0$
> $$ \|m(T) - x(T)\| \le C(T)\, h^{q}, $$
> where $m(T) = H_0 m_N$ is the EKF0 posterior-mean estimate of $x(T)$. The same bound holds for the EKS0. ^thm-global
>
> *Proof sketch.* Combine fixed-point arguments with a discrete Grönwall inequality (Kersting, Sullivan & Hennig 2020, Thm. 14). For the EKS0 the bound follows because filtering and smoothing distributions coincide at the final time $T$. $\square$

> [!theorem] Global calibration (Theorem 39.4)
> Under the assumptions/restrictions of Thm. 39.3, there is $C(T)>0$ such that the final posterior standard deviation $\sqrt{P(T)} := \sqrt{H_0 P_N H_0^\top}$ obeys
> $$ \sqrt{P(T)} \le C(T)\, h^{q}, $$
> for both EKF0 and EKS0. Thus the **error bars contract at the same rate $h^q$ as the true error** — the posterior is asymptotically well-calibrated. ^thm-calib

The main limitation of Thms. 39.3–39.4 is the restriction $q=1$. Experiments (Kersting et al. 2020; Krämer & Hennig 2020) validate the $h^q$ rates for $q$ up to $11$, so extension to general $q\in\mathbb{N}$ is widely believed.

### Convergence rates — scattered-data interpolation (§39.1.2)

An alternative analysis (Tronarp, Särkkä & Hennig 2021) works from the SSM directly. The global MAP estimate $\vec{x}^*$ maximises the posterior under the restriction that the **information operator**
$$ \mathcal{Z}[\bullet] := \tfrac{d}{dt}[\bullet] - f[\bullet] \tag{39.1}$$
vanishes at grid points, $\mathcal{Z}[X](t_i) = 0$. The MAP is then a scattered-data interpolant in a Sobolev space; only **one extra derivative** is needed (no Lipschitz/boundedness).

> [!theorem] Convergence of the MAP estimate (Theorem 39.6)
> Under Assumption 39.5 ($f \in C^{q+1}(\mathbb{R}^d,\mathbb{R}^d)$) and for any prior $X(t)$ of smoothness $q$ (a.s. $q$-times differentiable sample paths — includes the Matérn/IWP/IOUP family), there is $C(T)>0$ with
> $$ \sup_{t\in[0,T]} \Big\| \int_0^t \mathcal{Z}[x^*(s)]\,ds \Big\| \le C(T)\, h^q, $$
> where $x^*(t) = H_0\vec{x}^*(t)$ is the MAP estimate for a discretisation $0=t_0<\dots<t_N=T$. ^thm-map
>
> *Proof sketch.* Analyse the regularity $\mathcal{Z}$ inherits from $f$ under Assumption 39.5, then apply scattered-data interpolation bounds in the RKHS/Sobolev space of the prior (Tronarp, Särkkä & Hennig 2021, Thm. 3). $\square$

> [!theorem] Uniform error of the MAP estimate (Corollary 39.7)
> If Assumption 39.5 holds and $f$ is globally $L$-Lipschitz, then for any prior of smoothness $q$ there is $C(T)>0$ with
> $$ \sup_{t\in[0,T]} \|x^*(t) - x(t)\| \le C(T)\, h^q. $$ ^cor-map-uniform
>
> *Proof sketch.* By the fundamental theorem of calculus (with $x^*(0)=x(0)=x_0$), the triangle inequality, and Eq. (39.1):
> $$\|x^*(t)-x(t)\| = \Big\|\int_0^t \tfrac{d}{ds}x^*(s) - f(x(s))\,ds\Big\| \le \underbrace{\Big\|\int_0^t\mathcal{Z}[x^*(s)]ds\Big\|}_{\le C(T)h^q \text{ (Thm. 39.6)}} + \underbrace{\Big\|\int_0^t f(x^*)-f(x)\,ds\Big\|}_{\le \int_0^t L\|x^*-x\|ds}.$$
> Grönwall's inequality (integral form) then closes the bound. $\square$

**Discussion.** Cor. 39.7 applies to *any* prior with $q$ derivatives (vs Thm. 39.3's $q=1$ IWP), but bounds only the **MAP estimate** $x^*$, which standard EKF/EKS do not exactly compute for nonlinear $f$ (the IEKS converges to a *local* MAP minimum, possibly not the global one). So strictly it does not certify any *particular* algorithm — but experiments show EKS0/EKS1/IEKS all attain the $h^q$ MAP rate. Compared to classical methods, $h^q$ is optimal and on par with Runge–Kutta *as a single-step method*; because an ODE filter stores information from previous steps in its derivatives, it is really more like a **multistep method** that can achieve even higher rates in some settings (§39.3).

### Numerical stability (§39.2)

> [!definition] A-stability (§39.2.1)
> On the Dahlquist test equation $x'(t) = \Lambda x(t)$, $x_0\ne 0$, with $\Lambda$ having eigenvalues in the unit circle around zero (so $\lim_{t\to\infty}x(t)=0$), a solver is **A-stable** iff its estimate also $\to 0$ as $t\to\infty$ for fixed $h>0$. For the EKF0/EKF1 the predictive mean obeys
> $$ m_{n+1}^- = [A(h) - A(h)K_n B]\, m_n^-, \qquad B = H - H_0\Lambda, \tag{39.4}$$
> and A-stability holds iff $[A(h)-A(h)K_\infty B]$ has eigenvalues in the unit circle (with steady-state gain $K_\infty = \lim_n K_n$).

> [!theorem] A-stability of EKF1/EKS1 (Theorem 39.8, Tronarp et al. 2019)
> The **EKF1 and EKS1 with a $q$-times IWP prior are A-stable.** ^thm-astable
>
> *Proof sketch.* Filtering theory (Anderson & Moore 1979) guarantees the steady-state gain $K_\infty$ exists and $[A(h)-A(h)K_\infty B]$ has eigenvalues in the unit circle for the EKF1; the EKS1 inherits this since smoothing and filtering means coincide as $t\to\infty$. $\square$

By contrast the **EKF0 is not A-stable** (Exercise 39.9): on $\Lambda = -\alpha<0$ its mean fails to converge to $0$ if $\alpha$ is large enough. The EKS1's A-stability was demonstrated on a very stiff Van-der-Pol ODE (Bosch, Hennig & Tronarp 2021).

### Stability of the linear algebra (§39.2.2)

Gaussian inference reduces to matrix operations, exact up to rounding — except **matrix inversions** (of covariances). For the $q$-times IWP prior,
$$ [Q(h)]_{ij} = \sigma^2\,\frac{h^{2q+3-i-j}}{(2q+3-i-j)(q+1-i)!(q+1-j)!}, $$
whose entries span $2q$ orders of magnitude ($\mathcal{O}(h^{2q+1})$ to $\mathcal{O}(h)$), causing **ill-conditioning** for large $q$. Two fixes (Krämer & Hennig 2020):

> [!definition] Re-scaled (Nordsieck-type) coordinates (Eq. 39.5)
> Use $T^{-1}x$ with $T := \sqrt{h}\,\text{diag}\big(\tfrac{h^q}{q!},\tfrac{h^{q-1}}{(q-1)!},\dots,h,1\big)$. The transformed matrices become **scale-invariant**:
> $$ [\tilde A]_{ij} = \mathbb{1}(j\ge i)\binom{q+1-i}{q+1-j}, \qquad [\tilde Q]_{ij} = \frac{\sigma^2}{2q+3-i-j}, $$
> so the condition number is independent of $h$ and $(\tilde A,\tilde Q)$ can be precomputed across step sizes. ^def-rescale

**Square-root filtering:** track the Cholesky factors of covariances rather than the covariances themselves. E.g. $P_{n+1}^- = R^\top R$ where $R$ is the upper-triangular QR factor of $[A_n L_P, L_Q]^\top$ (with $L_P, L_Q$ Cholesky factors of $P_n, Q(h_{n+1})$) — obtained without ever assembling $P_{n+1}^-$. Same $\mathcal{O}(N)$ complexity, better stability. Both tricks are in ProbNum.

### Connection with classical solvers (§39.3)

> [!theorem] EKF0 = explicit trapezoidal rule (Proposition 39.11, Schober–Särkkä–Hennig 2018)
> The **EKF0 with 1-times IWP prior and $R=0$ is equivalent to the explicit trapezoidal rule (Heun's method).** Its filtering means $\hat x_n := H_0 m_n$ follow
> $$ \hat x_{n+1} = \hat x_n + \tfrac{h}{2}\big(f(\hat x_n) + f(\tilde x_{n+1})\big), \qquad \tilde x_{n+1} := \hat x_n + h f(\hat x_n). $$ ^thm-trapezoid
>
> *Proof sketch.* For the 1-times IWP with $R=0$ the Kalman gains reach a constant steady state $K_\infty$ for all $n$; the mean recursion is then $n$-independent and reduces to the P(EC)$^1$ implementation of the trapezoidal rule (Schober, Särkkä & Hennig 2019, Prop. 1). $\square$

> [!theorem] EKF0 = third-order Nordsieck method (Theorem 39.13, Schober–Särkkä–Hennig 2018)
> The **EKF0 with 2-times IWP prior and $R=0$, in its steady state $K_\infty$, is a Nordsieck method of order 3.** Initialised in steady state,
> $$ \|m(T) - x(T)\| \le C(T)\, h^3. $$ ^thm-nordsieck
>
> *Proof sketch.* Derive the steady-state gain $K_\infty = [\tfrac{3+\sqrt 3}{12}, 1, \tfrac{3-\sqrt 3}{2}]^\top$; insert it as the Nordsieck weight vector $l$ into Skeel (1979, Thm. 4.2), which gives global rate $h^3$. $\square$
>
> **Remark.** For $q=2$ this steady-state rate is $h^{q+1}$, *better* than the $h^q$ of Thms. 39.3/39.7 — but only in steady state, reflecting the multistep-like information sharing between adjacent steps.

The **Nordsieck vector** is $\vec{x}_{\text{Nord}}(t) = [x, hx', \tfrac{h^2}{2}x'', \dots, \tfrac{h^q}{q!}x^{(q)}]^\top = T_{\text{Nord}}^{-1}\vec x(t)$ with $T_{\text{Nord}} := \text{diag}(1, \tfrac{1}{h}, \tfrac{2!}{h^2}, \dots, \tfrac{q!}{h^q})$ — the first $q$ Taylor summands of $x(t+h)=\Phi_h(x(t))$. In these coordinates $\tilde A$ is the Pascal upper-triangle matrix $[\tilde A]_{ij} = \mathbb{1}(j\ge i)\binom{j-1}{i-1}$, and the EKF0 mean recursion (39.16) has the structural form of a Nordsieck method (39.17) $\hat{\vec x}(t+h) = [I - l\tilde H]\tilde A\hat{\vec x}(t) + hlf(H_0\tilde A\hat{\vec x}(t))$, with the Kalman gain $K_{n+1}$ in the role of the weight vector $l$ (but data-dependent, unlike the fixed classical $l$).

## Examples

> [!example] Why EKF0 is not A-stable (Exercise 39.9)
> On the 1-D test ODE $x'(t) = \Lambda x$ with $\Lambda = -\alpha<0$: for any fixed $h>0$ the EKF0 filtering mean $H_0 m_n$ fails to converge to $0$ as $n\to\infty$ once $\alpha$ is large enough — the solver becomes unstable on stiff problems. This motivates preferring the EKF1/EKS1 (Thm. 39.8) whenever stiffness is a concern.

> [!example] Information sharing (Exercise 39.14)
> The trapezoidal-rule equivalence (39.12) uses **both** $y_{n-1}=f(\hat x_{n-1})$ and $y_n=f(\hat x_n)$, unlike Euler ($\hat x_n = \hat x_{n-1} + hy_{n-1}$, only $y_{n-1}$). This shows an ODE filter behaves like a multistep method, exploiting adjacent-step information for higher accuracy.

## Connections

- Certifies the accuracy/calibration promised by [[ODE Filters and Smoothers]]; the IWP prior's Taylor semantics come from [[Classical ODE Solvers as Regression]].
- Steady-state equivalences realise the "classical solvers are posterior means" thesis rigorously.
- Grönwall/SDE machinery from [[Gauss-Markov Processes and SDEs]].

## See Also
- [[ODE Filters and Smoothers]] — the algorithms these theorems analyse (EKF0/1, EKS0/1, IEKS).
- [[Classical ODE Solvers as Regression]] — the flow-Taylor view underpinning the IWP prior and Nordsieck link.
- [[Perturbative ODE Solvers]] — an alternative whose mean-square convergence is rate $\min(p,q)$.
- [[Further Topics in ODE Solvers]] — where these rates feed into inverse problems and BVPs.
