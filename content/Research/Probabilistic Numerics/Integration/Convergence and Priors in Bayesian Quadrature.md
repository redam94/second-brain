---
title: Convergence and Priors in Bayesian Quadrature
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 11-12, pp. 87-105"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[Bayesian Quadrature]]"
  - "[[Classical Quadrature as Inference]]"
  - "[[Hierarchical Inference in Gaussian Models]]"
  - "[[Kernel Quadrature and Kernel Means]]"
used_by:
  - "[[Active Bayesian Quadrature and Bayesian Monte Carlo]]"
  - "[[Lessons from Integration]]"
aliases:
  - BQ Convergence Rates
  - Posterior Contraction
  - Error Estimation and Calibration
  - Rate vs Scale
---

# Convergence and Priors in Bayesian Quadrature

> [!summary]
> The convergence *rate* of Bayesian quadrature is controlled by the **smoothness of the prior kernel** (how many times sample paths are differentiable), while the *scale* $\theta$ of the error bar is set separately and should be estimated at runtime. The trapezoidal (Wiener) rule contracts as $\mathcal O(N^{-1})$; $q$-times-integrated Wiener (spline) priors contract faster for smoother integrands; Gaussian quadrature (degenerate polynomial kernels) contracts exponentially. Because the posterior variance is data-independent, its raw magnitude can be mis-calibrated — hierarchical (conjugate-Gamma) inference on $\theta$ and a cheap model-fit statistic $r$ let the method detect over- or under-confidence and calibrate its error bars.

## Overview

A probabilistic numerical method must satisfy the classical desideratum — its point estimate should *converge* at a good rate — while also making its *uncertainty* meaningful. This note collects the convergence and calibration theory of Part II. Two ideas recur. First, the **separation of rate and scale**: the kernel's smoothness fixes the exponent of the error decay, while a scalar $\theta$ fixes the constant. This mirrors the classical division between *error analysis* (rate) and *error estimation* (scale). Second, because the Gaussian posterior variance ignores the observed values $Y$ (see [[Bayesian Quadrature]]), the error bar rests entirely on prior assumptions; if those assumptions mismatch the integrand, the bar is mis-scaled, and one needs the hierarchical machinery of [[Hierarchical Inference in Gaussian Models]] to fix it.

## Main Content

### Rate is set by kernel smoothness

> [!theorem] Contraction rates by prior order (empirical + classical analysis)
> For integrands matching the prior's regularity, the posterior standard deviation on $F$ contracts as:
> - **Wiener prior ($q=0$, trapezoidal rule):** $\operatorname{std}(F)=\sqrt{\theta^2(b-a)^3/(12(N-1)^2)}\in\mathcal O(N^{-1})$. For genuinely differentiable integrands the *mean* error even reaches $\mathcal O(N^{-2})$, while the non-adaptive Wiener error bar stays at the conservative $\mathcal O(N^{-1})$.
> - **$q$-times integrated Wiener (spline) priors:** faster polynomial rates increasing with $q$, up to the point where added smoothness stops helping the particular integrand.
> - **Degenerate polynomial kernels (Gaussian quadrature):** exponential (super-algebraic) convergence — but with vanishing posterior variance $\mathfrak v=0$ (see [[Classical Quadrature as Inference]]).
> All beat the Monte Carlo $\mathcal O(N^{-1/2})$ of Lemma 9.2 (see [[The Integration Problem]]).
> ^thm-rates

The mechanism: from the Wiener error $\mathfrak v=\frac{\theta^2}{12}\sum_i\delta_i^3$, the *kernel* $\tilde k$ (through the exponent on $\delta_i$) determines the rate, and $\theta$ only the constant. A rougher prior (Wiener) assigns non-zero mass only to continuous functions — a more restrictive, and here *correct*, assumption than Monte Carlo's mere integrability — which is exactly why it converges faster. But the Wiener prior is *so vague* that it is also *over-conservative*: it both fails to exploit smoothness and reports pessimistic error bars.

### Node placement and posterior contraction

Node placement is chosen to minimise the (data-independent) posterior variance (see [[Bayesian Quadrature]] node selection). For the Wiener prior this gives the **equidistant grid** as the maximally-informative design (derivation in [[Classical Quadrature as Inference]] ^thm-trapezoid). The equidistant grid is optimal *independently of the scale $\theta$*: every prior in the scaled family $\mathcal M(\theta)$ shares the same optimal design and the same trapezoidal estimation rule. (A subtlety from the time-directed nature of the Wiener process: with the endpoint constraints relaxed, the strictly optimal Sacks–Ylvisaker nodes are $x_i=a+(b-a)\frac{2i}{2N+1}$, slightly denser on the left; e.g. for $N=2$ on $[0,1]$ the optimal nodes are $[2/5,4/5]$.) Regular grids' probabilistic optimality also grounds the good behaviour of quasi-Monte Carlo (see [[Lessons from Integration]]).

### Rate vs scale, and runtime calibration of $\theta$

The algebraic form of the estimation rule (hence its *rate*) is hard to change at runtime, so rate is studied by abstract analysis. The **scale** $\theta$, by contrast, estimates the concrete magnitude of the error and *should* be inferred online. Using the conjugate hierarchical mechanism of [[Hierarchical Inference in Gaussian Models]] — a Gamma prior $p(\theta^{-2})=\mathcal G(\theta^{-2};\alpha_0,\beta_0)$ on the inverse scale — the joint posterior on $(\theta,F)$ stays tractable:

> [!theorem] Conjugate scale inference and Student-t marginal on F
> The posterior on the inverse scale, accumulated from Kalman residuals, is
> $$
> p(\theta^{-2}\mid Y_{1:N}) = \mathcal G\!\Big(\theta^{-2};\ \alpha_0+\tfrac N2,\ \beta_0+\tfrac12\sum_{i=1}^N\frac{(y_i-H\bar P_i^- H^\top)^2\ \text{-residuals}}{H\bar P_i^- H^\top}\Big) =: \mathcal G(\theta^{-2};\alpha_N,\beta_N).
> $$
> Marginalising $\theta$ gives a **Student-t** posterior on the integral:
> $$
> p(F\mid Y_{1:N}) = \int \mathcal N(F;\mu_{F\mid Y},\theta\sigma_F^2)\,\mathcal G(\theta^{-2};\alpha_N,\beta_N)\,\mathrm d\theta^{-2} = \mathrm{St}\!\Big(F;\ \mu_{F\mid Y},\ \tfrac{\alpha_N}{\beta_N\sigma_F^2},\ 2\alpha_N\Big),
> $$
> with variance $\frac{\beta_N}{\alpha_N-1}\sigma_F^2 = \frac{\beta_0+\tfrac N2\theta_{\mathrm{ML}}^2}{\alpha_0+\tfrac N2-1}\sigma_F^2$. This estimated variance **does depend on the values $Y$** (unlike the raw $\mathfrak v$), and can be computed at linear cost by accumulating a running sum of the squared local residuals $(f(x_i)-Hm_i^-)^2$.
> ^thm-student-t

This is the "empirical Bayes" upgrade promised in Ch. 8: the Wiener error estimate is a conservative *worst-case* bound (see [[Kernel Quadrature and Kernel Means]]), and adapting $\theta$ moves it toward an *expected-case* estimate — better calibrated — at negligible ($\sim$ a few percent) overhead over the classical trapezoidal rule.

### A model-fit statistic for detecting mis-calibration

Even $\theta$-adaptation can fail if the *shape* $\tilde k$ (the order $q$) mismatches the integrand. A cheap diagnostic detects this. With unit scale $\theta=1$, the log marginal likelihood of the model $\mathcal M$ is
$$
\log p(Y\mid\mathcal M)=-\tfrac12\sum_{i=1}^N\frac{(y_i-Hm_i^-)^2}{H\bar P_i^-H^\top}-\tfrac12\log|H\bar P_i^-H^\top|+\text{const}. \tag{11.14}
$$
Comparing the observed log-likelihood to its prior-predicted expectation yields the **expected log-ratio / model-fit statistic**
$$
r(Y,\mathcal M):=\int\log\frac{p(\tilde Y\mid\mathcal M)}{p(Y\mid\mathcal M)}\,p(\tilde Y\mid\mathcal M)\,\mathrm d\tilde Y = -\tfrac12\Big(N-\sum_i\frac{(y_i-Hm_i^-)^2}{H\bar P_i^-H^\top}\Big)=\sum_i\frac{z_i^2}{2s_i^2}-\frac N2 = \beta_N-\beta_0-\tfrac N2, \tag{11.15}
$$
a trivial transform of the sufficient statistic $\beta_N$ already collected by the filter (Algorithm 11.2), so it costs *nothing extra*.

> [!definition] Interpreting the model-fit statistic $r$
> - $r(Y,\mathcal M)>0$: the integrand is *less* variable / more regular than the prior expects → the error estimate is **conservative** (method under-confident; true error smaller than reported).
> - $r(Y,\mathcal M)<0$: the integrand varies *more* than the prior expects → surprises are likely elsewhere too → the error estimate is **over-confident** and should not be trusted.
> ^def-model-fit

Empirically, on the smooth running integrand, $q=1$ (cubic-spline / integrated-Wiener) is a good choice; convergence does not improve for higher $q$. If the integrand is a true sample of an integrated Wiener process, a too-rough $q=0$ integrator flags $r<0$ (over-confident), and too-smooth $q>1$ integrators can detect their over-confident smoothness assumptions. **Calibration is epistemic**: it rests on the assumption that unobserved parts of the integrand resemble observed ones.

## Examples

> [!example] Trapezoid vs Monte Carlo convergence (running integrand)
> On $f(x)=\exp(-(\sin3x)^2-x^2)$, the Monte Carlo error tracks its theoretical $\sqrt{\operatorname{var}_p(w)/N}\in\mathcal O(N^{-1/2})$ standard deviation. The trapezoidal rule overtakes MC after $\approx8$ evaluations; after $N=64$ it settles into $\mathcal O(N^{-2})$ (its differentiable-integrand rate), while the non-adaptive GP error bar predicts the conservative $\mathcal O(N^{-1})$. Even the $\theta$-adapted Student-t error estimate (contracting faster than $1/N$ but slower than the mean) remains a *conservative* bound — reflecting the Wiener prior's overly-cautious non-differentiability assumption.

> [!example] Gauss–Legendre's exponential rate
> Gauss–Legendre quadrature on the same integrand converges *exponentially* — far faster than trapezoid ($\mathcal O(N^{-2})$) or Monte Carlo ($\mathcal O(N^{-1/2})$). This showcases the payoff of a stronger (polynomial-exact) prior, at the cost (see [[Classical Quadrature as Inference]]) that its Bayesian posterior variance vanishes and gives no usable error bar.

## Connections

- **Quantifies** the error bar of [[Bayesian Quadrature]] and its rate/scale decomposition.
- **Rates for specific rules** (trapezoid, spline, Gauss) come from the priors of [[Classical Quadrature as Inference]].
- **Calibration** uses the conjugate-Gamma / Student-t hierarchy of [[Hierarchical Inference in Gaussian Models]].
- **Worst-case vs expected-case** error connects to the RKHS worst-case error of [[Kernel Quadrature and Kernel Means]].
- **Motivates** adaptive, non-Gaussian schemes whose error *does* depend on data — see [[Active Bayesian Quadrature and Bayesian Monte Carlo]].

## See Also
- [[Bayesian Quadrature]] — the data-independent posterior variance being calibrated here.
- [[Classical Quadrature as Inference]] — the specific priors whose rates are compared.
- [[Hierarchical Inference in Gaussian Models]] — conjugate scale inference producing the Student-t marginal.
- [[Lessons from Integration]] — why good priors are needed for meaningful error measures.
