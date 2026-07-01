---
title: Classical Quadrature as Inference
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/theorem
  - type/example
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 11, pp. 87-105"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[Bayesian Quadrature]]"
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Bayesian Filtering and Smoothing]]"
  - "[[The Integration Problem]]"
used_by:
  - "[[Convergence and Priors in Bayesian Quadrature]]"
  - "[[Lessons from Integration]]"
aliases:
  - Bayesian Trapezoidal Rule
  - Trapezoid as Inference
  - Gaussian Quadrature as Bayesian Quadrature
  - Spline Quadrature
---

# Classical Quadrature as Inference

> [!summary]
> The foundational thesis of Part II made concrete: classical quadrature rules are the posterior-mean (MAP) estimators of Bayesian quadrature under specific Gaussian-process priors. The **trapezoidal rule** is the posterior mean under a Wiener-process prior on the integrand; higher-order **spline rules** arise from $q$-times integrated Wiener processes; and the classical **Gaussian (Gauss–Legendre etc.) quadrature** rules arise from degenerate polynomial kernels, with the Bayesian-optimal design coinciding exactly with the Gaussian nodes. Polynomial exactness of degree corresponds to prior choice. We give the full trapezoid derivation and its equivalent Kalman-filter form.

## Overview

[[Bayesian Quadrature]] showed BQ produces a weighted-sum rule $\hat F=\sum_i w_i f(x_i)$ whose weights come from the prior. This note runs the correspondence the other way: take a *classical* rule and exhibit the prior for which it is the BQ posterior mean. Doing so (i) proves classical rules are "implicitly probabilistic" and therefore that PN is *no worse* than classical numerics; (ii) equips each classical rule with a calibrated error bar (the posterior variance) for free or nearly free; and (iii) shows the probabilistic viewpoint is a *design framework* — new rules are built by choosing new priors. The chapter uses [[Gauss-Markov Processes and SDEs]] and [[Bayesian Filtering and Smoothing]] to give an $\mathcal O(N)$ filtering implementation, proving that a probabilistic method need not cost more than its classical twin.

## Main Content

### The Wiener-process prior behind the trapezoidal rule

> [!definition] Wiener-process prior for quadrature
> Take zero prior mean $m(x)=0$ and the covariance
> $$
> k(x,x')=\theta^2\big(\min(x,x')-\chi\big),\qquad \theta\in\mathbb R_+,\ \chi\in\mathbb R,\ \chi<a,
> $$
> giving $p(f)=\mathcal{GP}\big(f;\,0,\ \theta^2(\min(x,x')-\chi)\big)$. This is the **Wiener process** with starting time $\chi$ and intensity $\theta$ — a very broad prior whose samples are (almost surely) continuous but nowhere differentiable.
> ^def-wiener-prior

For ordered nodes $X=[x_1,\dots,x_N]$ with $a\le x_i\le b$, and writing step sizes $\delta_i=x_{i+1}-x_i$, the BQ ingredients (see [[Bayesian Quadrature]] ^def-three-integrals) evaluate to $\mathfrak m_0=0$ and
$$
\mathfrak K=\iint_a^b k(x,x')\,\mathrm dx\,\mathrm dx' = \theta^2\Big(\tfrac13 b^3 - a^2 b + \tfrac23 a^3 - \chi(b-a)^2\Big),
$$
$$
\ell(x_i)=\int_a^b k(x,x_i)\,\mathrm dx = \theta^2\Big(x_i b - \tfrac12(a^2+x_i^2) - \chi(b-a)\Big)\quad\text{(using }a\le x_i\le b).
$$

### Derivation: the trapezoidal rule as posterior mean

The cleanest route is to note that the GP posterior mean over $f$ is a weighted sum of kernel functions at the nodes:
$$
\mathbb E_{p(f\mid Y)}\big(f(x)\big)=k_{xX}\underbrace{k_{XX}^{-1}Y}_{=:\alpha}=\sum_i k(x,x_i)\,\alpha_i. \tag{11.3}
$$
Each $k(x,x_i)=\theta^2(\min(x,x_i)-\chi)$ is **piecewise linear** in $x$ with a single kink (non-differentiable point) at $x=x_i$. A sum of such functions is piecewise linear with kinks only at the nodes $X$. Since this posterior mean must interpolate the data (pass through the $N$ points $(x_i,y_i)$, as observations are noise-free), and there is a unique piecewise-linear interpolant through $N$ points, the posterior mean is exactly the **linear spline** connecting the evaluations. For $a\le x_i<x<x_{i+1}\le b$ (assuming $x_1=a$, $x_N=b$):
$$
\mathbb E_{p(f\mid Y)}\big(f(x)\big)=f(x_i)+\frac{x-x_i}{\delta_i}\big(f(x_{i+1})-f(x_i)\big).
$$
The expected value of the integral is the integral of the expected value (Fubini):
$$
\mathbb E_{p(f\mid Y)}\Big(\int_a^b f(x)\,\mathrm dx\Big)=\int_a^b \mathbb E\big(f(x)\big)\,\mathrm dx = \sum_{i=1}^{N-1}\frac{\delta_i}{2}\big(f(x_{i+1})+f(x_i)\big). \tag{11.4}
$$
The right-hand side is precisely the **trapezoidal rule** (integrating each linear segment gives the area of a trapezium). Hence:

> [!theorem] Theorem 11.1 (Trapezoidal rule = Bayesian quadrature)
> The trapezoidal rule is the posterior-mean (and, since a Gaussian's mean equals its mode, the maximum-a-posteriori) estimate for $F=\int_a^b f(x)\,\mathrm dx$ under **any** centred Wiener-process prior $p(f)=\mathcal{GP}(f;0,k)$ with $k(x,x')=\theta^2(\min(x,x')-\chi)$, for arbitrary $\theta\in\mathbb R_+$ and $\chi<a$.
> ^thm-trapezoid

The trapezoidal rule is therefore *literally* Bayesian quadrature: a foundational classical algorithm has a clear probabilistic identity. Note the whole family $\mathcal M(\theta,\chi)$ gives the *same* trapezoidal mean — the rule is *independent* of the scale $\theta$ (which only sets the error bar).

### The trapezoidal error estimate

The novelty over the classical rule is a computable error bar. The posterior variance (from [[Bayesian Quadrature]] ^thm-bq-posterior), which as always **does not depend on the collected values $y_i$**, evaluates for the Wiener prior to
$$
\mathfrak v=\operatorname{var}_{p(f\mid Y,X)}(F)=\iint_a^b \mathbb V(x,x')\,\mathrm dx\,\mathrm dx' = \frac{\theta^2}{12}\sum_{i=1}^{N-1}\delta_i^3. \tag{11.8}
$$
Minimising this over step sizes (subject to endpoints on the boundary) is achieved by the **equidistant grid** — so the regular grid is the *maximally informative* (variance-minimising) design, motivated probabilistically without any appeal to classical analysis. On an equidistant grid $\delta_i=(b-a)/(N-1)$,
$$
\operatorname{var}(F)=\frac{\theta^2(b-a)^3}{12(N-1)^2}, \qquad \operatorname{std}(F)=\sqrt{\operatorname{var}(F)}\in\mathcal O(N^{-1}),
$$
contracting faster than the Monte Carlo $\mathcal O(N^{-1/2})$ (see [[Convergence and Priors in Bayesian Quadrature]]).

### Equivalent derivation as a Kalman filter (O(N) cost)

The joint inference on $(f,F)$ under the Wiener model can equivalently be phrased as a **Kalman filter** (see [[Bayesian Filtering and Smoothing]] and [[Gauss-Markov Processes and SDEs]]), which (a) gives an alternative proof of Theorem 11.1, (b) yields the posterior variance on $F$, and (c) proves the probabilistic method costs the *same* as the classical one. Define the antiderivative $F_x=\int_a^x f(\tilde x)\,\mathrm d\tilde x$ and the state $z(x)=[F_x,\ f_x]^\top$. The Wiener prior is the linear SDE
$$
\mathrm dz(x)=Fz(x)\,\mathrm dx + L\,\mathrm d\omega_t,\qquad F=\begin{bmatrix}0&1\\0&0\end{bmatrix},\ L=\begin{bmatrix}0\\\theta\end{bmatrix},\ z(\chi)=\begin{bmatrix}0\\0\end{bmatrix},
$$
whose discrete-time transition (step $\delta_i$) has
$$
A_i=\begin{bmatrix}1&\delta_i\\0&1\end{bmatrix},\qquad Q_i=\theta^2\begin{bmatrix}\delta_i^3/3&\delta_i^2/2\\\delta_i^2/2&\delta_i\end{bmatrix}.
$$
With $H=[0\ 1]$ and $R=0$ (exact observations $y_i=f(x_i)$), the Kalman mean/covariance updates simplify to
$$
m_i=\begin{bmatrix}[m_{i-1}]_1+\tfrac{\delta_i}{2}\big(y_i+[m_{i-1}]_2\big)\\ y_i\end{bmatrix},\qquad P_i=\begin{bmatrix}[P_{i-1}]_{11}+\delta_i^3/12&0\\0&0\end{bmatrix}. \tag{11.6, 11.7}
$$
Reading off the first component recovers, by a telescoping sum, exactly the trapezoidal estimate and the variance $\theta^2/12\sum\delta_i^3$:

> [!theorem] Filtering form (Algorithm 11.1 / Exercise 11.2)
> $$
> \mathbb E(F)=\sum_{i=1}^{N-1}\frac{\delta_i}{2}(f_{i+1}+f_i),\qquad \operatorname{var}(F)=\frac{\theta^2}{12}\sum_{i=1}^{N-1}\delta_i^3.
> $$
> The filter runs in $\mathcal O(N)$ operations — *identical* cost to the classical trapezoidal rule. Adding uncertainty to this computation incurs *no* overhead if one counts evaluations of $f$, and only a small percentage if one counts all arithmetic.
> ^thm-trapezoid-filter

The take-away: "the simple software implementation of the trapezoidal rule *is* that of a particular Bayesian quadrature algorithm." Probabilistic numerics can be **fast**.

### Spline rules for smoother integrands

The Wiener prior is *too rough* — its samples are non-differentiable, so it under-uses smoothness and gives over-conservative error bars. If $f$ has $q$ continuous derivatives, use the **$q$-times integrated Wiener process** by extending the state to $z(x)=[F_a(x),f(x),f'(x),\dots,f^{(q)}(x)]^\top$ with $\mathrm dz=Mz\,\mathrm dx+L\,\mathrm d\omega$ (matrices as in the SDE chapter):
- $q=1$: integrated Wiener process → posterior mean is a **cubic spline**.
- $q=2$: twice-integrated Wiener process → **quintic spline**. Etc.

With $H=[0,1,0,\dots]$ the standard Kalman filter becomes a probabilistic integration method (Algorithm 11.2). Initialisation must express ignorance of the unknown derivatives: $m=[0,f(a),0,\dots]$ and $P=\operatorname{diag}(0,0,\alpha I_q)$ with "very large" $\alpha$. These reproduce **spline quadrature** rules (Wahba) and give correspondingly faster convergence for smoother integrands (see [[Convergence and Priors in Bayesian Quadrature]]).

### Gaussian quadrature via degenerate polynomial kernels

The most efficient classical family is **Gaussian quadrature**. A quadrature rule $Q=(X,w)$ is of **degree $M$** if it integrates all polynomials of degree $\le M$ exactly; for $N$ nodes chosen as the roots of the $N$th $\nu$-orthogonal polynomial one attains the maximal degree $2N-1$ (Theorem 11.4, Gauss). The probabilistic reproduction uses a **degenerate (finite-rank) kernel** built from orthonormal polynomials:

> [!definition] Degenerate polynomial kernel
> Let $\{\bar\psi_i\}_{i\ge0}$ be $\nu$-orthonormal polynomials, $\nu(\bar\psi_i\bar\psi_j)=\int\bar\psi_i\bar\psi_j\,\mathrm d\nu=\delta_{ij}$. For positive scales $c_0,\dots,c_{q-1}$, set
> $$
> k^q(x,x')=\sum_{i=0}^{q-1}c_i\,\bar\psi_i(x)\,\bar\psi_i(x').
> $$
> The GP $p(f)=\mathcal{GP}(f;0,k^q)$ assumes $f(x)=\sum_i\bar\psi_i(x)v_i$ with weights $v_i\sim\mathcal N(0,c_i)$ i.i.d. — i.e. $f$ is a degree-$(q-1)$ random polynomial.
> ^def-degenerate-kernel

> [!theorem] Theorem 11.5 / Corollary 11.6 (Bayesian Gaussian quadrature; Karvonen & Särkkä 2017)
> The Bayesian quadrature rule with kernel $k^q$ on $(\Omega,\nu)$ coincides with the classical quadrature rule of degree $M-1$ **if and only if** $N\le q\le M$, and for such a rule the posterior variance on the integral **vanishes**, $\mathfrak v=0$. Setting $N:=q/2$: for each $N\in\mathbb N$ there is a unique $N$-point optimal Bayesian quadrature rule for the kernel $k^{2N}$, and it coincides with the Gaussian quadrature rule. The optimal (variance-minimising) BQ design equals the Gaussian nodes (roots of the $N$th orthonormal polynomial).
> ^thm-gauss-bq

Thus polynomial exactness ↔ prior choice: choosing a degree-$(q-1)$ polynomial prior yields a rule exact to that degree. Popular pairings (Table 11.1): $[-1,1]$ with Legendre (Gauss–Legendre), Chebyshev, Jacobi/Gegenbauer; $[0,\infty)$ with Laguerre; $(-\infty,\infty)$ with Hermite. **Clenshaw–Curtis** likewise fits this polynomial-interpolation family.

**Caveats (why the probabilistic reading is imperfect here).** (1) The equivalence class of GP priors reproducing a given Gaussian rule is *large* — any $c\in\mathbb R_+^{2N}$ in the prior $p(v)=\mathcal N(v;0,\operatorname{diag}(c))$ over polynomial coefficients yields the *same* integral estimate, though wildly different priors over $f$. (2) The variance vanishes ($\mathfrak v=0$) at the $N$ nodes, so this simple form gives no useful uncertainty; it is an *open question* whether an empirical-Bayes extension can restore a meaningful error bar. (3) The kernel must grow in rank as $N$ grows, so the "prior" depends on the data and is "not a real prior at all" (echoing the kernel-quadrature caveat in [[Kernel Quadrature and Kernel Means]]).

## Examples

> [!example] Trapezoid on the running integrand
> For $f(x)=\exp(-(\sin3x)^2-x^2)$ on $[-3,3]$, the Wiener-prior BQ with an equidistant grid gives exactly the trapezoidal estimate $\sum_i\frac{\delta}{2}(f_{i+1}+f_i)$ and the error bar $\sqrt{\theta^2(b-a)^3/(12(N-1)^2)}\in\mathcal O(N^{-1})$. Empirically the trapezoidal rule overtakes Monte Carlo after $\approx8$ evaluations; after $N=32$ evaluations the absolute error is $\approx1.3\times10^{-6}$, which would need $N\approx8.8\times10^{10}$ Monte Carlo samples to match — a saving of $\sim2.75$ billion evaluations.

> [!example] Kepler's / Simpson's rule as a "contrived" prior
> The piecewise-quadratic (Kepler/Simpson) rule $\int_a^b f\approx\sum \tfrac{x_{i+1}-x_{i-1}}{2}(f(x_{i-1})+4f(x_i)+f(x_{i+1}))/3$ can be obtained from a Gaussian prior on the *weights* of piecewise parametric polynomial features (Diaconis 1988). But this prior is "so far-fetched" (requiring a fixed pre-determined node grid) that it is a warning: not every classical rule has a *natural* GP-on-the-integrand prior.

## Connections

- **Concretises** the Part-II thesis stated in [[The Integration Problem]] and [[Bayesian Quadrature]]: classical rules are BQ posterior means.
- **Uses** [[Gauss-Markov Processes and SDEs]] (Wiener / integrated-Wiener SDEs) and [[Bayesian Filtering and Smoothing]] (the $\mathcal O(N)$ Kalman implementation).
- **Degenerate kernels** relate to the RKHS view of [[Kernel Quadrature and Kernel Means]] (the finite-rank RKHS of polynomials; vanishing worst-case error at nodes).
- **Convergence rates** of trapezoid, spline, and Gaussian rules are compared in [[Convergence and Priors in Bayesian Quadrature]].
- **Design lesson** ("classical methods are MAP estimators") is drawn out in [[Lessons from Integration]].

## See Also
- [[Bayesian Quadrature]] — the general posterior whose mean these classical rules instantiate.
- [[Convergence and Priors in Bayesian Quadrature]] — $\mathcal O(N^{-1})$ (trapezoid) vs faster spline / Gauss rates.
- [[Kernel Quadrature and Kernel Means]] — degenerate/polynomial kernels and vanishing variance.
- [[Bayesian Filtering and Smoothing]] — the Kalman-filter implementation of the Bayesian trapezoidal rule.
- [[Gaussian Process Regression]] — the general regression whose posterior mean these classical rules are, once the integral functional is applied.
