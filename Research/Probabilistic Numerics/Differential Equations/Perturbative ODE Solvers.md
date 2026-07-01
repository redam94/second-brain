---
title: Perturbative ODE Solvers
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 40, pp. 331-338"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Differential Equations"
doc_type: textbook
depends_on:
  - "[[Solving ODEs as Inference]]"
  - "[[Classical ODE Solvers as Regression]]"
  - "[[ODE Filters and Smoothers]]"
used_by:
  - "[[Further Topics in ODE Solvers]]"
aliases:
  - Randomised ODE Solvers
  - Stochastic Runge-Kutta
  - Conrad et al. 2017
  - Randomised Step Sizes
  - Sampling-Based ODE Solvers
---

# Perturbative ODE Solvers

> [!summary]
> Perturbative solvers are **randomised, non-Bayesian** probabilistic ODE solvers: rather than computing a posterior, they perturb a classical solver so the injected noise matches the local numerical error, and treat repeated randomised runs as samples from the distribution of numerically possible trajectories. Two designs: **additive-noise** (Conrad et al. 2017 — add a calibrated Gaussian after each step) and **randomised step sizes** (Abdulle & Garegnani 2020 — jitter $h_n$, preserving geometric structure). Both converge in mean-square at rate $\min(p,q)$; recommend perturbation order $p=q$. They are more expressive than Gaussian filters (capturing chaos and bifurcations) but must simulate the ODE many times.

## Overview

This family fundamentally deviates from the GP-regression philosophy of the rest of the book. It does not impose a prior on $x$ or compute $p(x\mid\{f(\hat x(t_i))\})$. Instead it puts a probabilistic model **over the numerical error** and builds a stochastic simulator. Its randomised outputs are, like a particle ODE filter's samples, viewed as samples from the set of trajectories numerically possible given an integrator and a discretisation. Historically this line began with Chkrebtii et al. (2016) (still Bayesian) and became predominantly non-Bayesian with Conrad et al. (2017).

## Main Content

### Motivation: the spread of possible flows

After one step a single-step solver of local order $q+1$ produces $\hat x(h)$ with $x(h)\in B_{Ch^{q+1}}(\hat x(h))$. Since we only know $x(h)$ lies in that ball, we could equally try to follow *any* flow map $\{\Phi_{t-h}(a) : a\in B_{Ch^{q+1}}(\hat x(h))\}$. The impact of step-$1$ error on a later estimate $x(s)$, $s>h$, depends on the spread of $\{\Phi_{s-h}(a)\}$ plus all subsequent errors. This spread is large when $x$ is **sensitive to initial values** — as in chaotic ODEs. Since Lorenz's work, even simple ODEs (the Lorenz equations) can be so sensitive that long-term behaviour is unpredictable — **chaos**. Such long-term error is **non-Gaussian** and cannot be captured by Gaussians or any parametric family, motivating nonparametric randomisation.

### Randomisation by locally adding noise (§40.1)

Let $\Psi_h : \mathbb{R}^d\to\mathbb{R}^d$ be a classical deterministic solver of local order $q+1$, so $\hat x(t_n) = \Psi_{h_n}(\hat x(t_{n-1}))$ on a mesh $\{t_n\}$ with steps $h_n = t_n - t_{n-1}$.

> [!definition] Uniform local error (Assumption 40.1)
> $\sup_{u\in\mathbb{R}^d}\|\Psi_h(u) - \Phi_h(u)\| \le C h^{q+1}$ for all $h>0$, with $\Phi_h$ the true flow map (Eq. 37.2). Then the local step error $\varepsilon_n(h_n) := \Psi_{h_n}(\hat x(t_{n-1})) - \Phi_{h_n}(\hat x(t_{n-1}))$ is $\mathcal{O}(h_n^{q+1})$.

Model this unknown error by a random variable and add it after every step:

> [!definition] Additive-noise perturbative solver (Eqs. 40.2–40.3, Conrad et al. 2017)
> $$ \hat X_n = \Psi_{h_n}(\hat X_{n-1}) + \xi_n(h_n), \qquad \hat X_0 = x_0, $$
> where $\xi_n(h_n) := \int_0^{h_n}\chi_n(s)\,ds$ models the off-mesh error accumulation, with $\{\chi_n\}$ **independent** zero-mean GPs on $[0,h_n]$ satisfying $\mathbb{E}(\|\xi_n(t)\xi_n(t)^\top\|_F^2) \le C t^{2p+1}$ (Assumption 40.2) — i.e. local standard deviation of order $p + 1/2$. Each random draw $\{\hat X_n\}$ is a numerically possible trajectory. ^def-additive
>
> Note the key contrast with ODE filters: filters put their probabilistic model (the prior) on $x$ via the SDE (38.4); perturbative solvers put their model (40.2) on the numerical *error*.

> [!theorem] Mean-square convergence (Theorem 40.5, Lie–Stuart–Sullivan 2019; from Conrad et al. 2017)
> Suppose Assumptions 40.1, 40.2 hold, fix $x_0$; assume the flow map is globally Lipschitz with $\text{Lip}(\Phi_t)\le 1 + Ct$ (Assumption 40.4, holds if $f$ globally Lipschitz), $\Psi_t(Y)\in L^2$. With $h := \max_n h_n$ there is $C>0$ (independent of $h$) such that
> $$ \mathbb{E}\Big(\max_{n=0,\dots,N}\|\hat X_n - x(t_n)\|^2\Big) \le C\, h^{2\min(p,q)}, $$
> and hence the expected global error is of rate $\min(p,q)$:
> $$ \mathbb{E}\Big(\max_{n=0,\dots,N}\|\hat X_n - x(t_n)\|\Big) \le C\, h^{\min(p,q)}. $$ ^thm-conv
>
> *Proof sketch.* See Lie, Stuart & Sullivan (2019, Thm. 3.4) — a simplified version of their general result; also holds for non-Gaussian perturbations (their Assumption 3.3). $\square$

**Interpretation.** Perturbing local error $\mathcal{O}(h^{q+1})$ by slightly larger noise $\mathcal{O}(h^{q+1/2})$ (i.e. $p\ge q$) does *not* reduce the convergence rate: the random output is "no worse" in expectation than the deterministic estimate. If the added noise is too large ($p<q$), the rate degrades to $\mathcal{O}(h^p)$. Hence Conrad et al. recommend $p := q$: the maximum admissible stochasticity that preserves the underlying integrator's accuracy.

### Randomised step sizes for geometric integrators (§40.2)

The additive-noise method has two drawbacks: (i) for fixed $h$ the extra noise usually raises the global error; (ii) if $\Psi_h$ is **geometric** (preserves mass, symplecticity, first integrals), adding noise destroys these invariants. Remedy (Abdulle & Garegnani 2020): randomise the **step sizes** instead.

> [!definition] Randomised-step perturbative solver (Eq. 40.5)
> $$ \hat X_n = \Psi_{H_n}(\hat X_{n-1}), \qquad \hat X_0 = x_0, $$
> where each step $H_n$ is a random variable satisfying (Assumption 40.6): (i) $H_n>0$ a.s.; (ii) $\mathbb{E}(H_n) = h$; (iii) $\exists\, p\ge 1/2, C>0$ with $\mathbb{E}(|H_n - h|^2)\le Ch^{2p+1}$; (iv) if $\Psi$ implicit, $H_n$ a.s. small enough for well-posedness. The stochasticity is transferred from additive noise to the step size, keeping $\Psi$'s geometric structure intact for every realisation. ^def-randstep

> [!theorem] Mean-square convergence, randomised steps (Theorem 40.7, Abdulle & Garegnani 2020)
> Under Assumptions 40.1 and 40.6, $f$ globally Lipschitz, $t_n = nh$ with $Nh=T$, there is $C>0$ (independent of $h$) such that
> $$ \max_{n=0,\dots,N}\mathbb{E}\big(\|\hat X_n - x(t_n)\|^2\big) \le C\, h^{2\min(p,q)}, $$
> and the global maximum of expected errors is of rate $\min(p,q)$. ^thm-conv-step
>
> *Proof sketch.* See Abdulle & Garegnani (2020, Thm. 2). As before, recommend $p=q$. $\square$

Both methods are **frequentist**: they sample i.i.d. approximations of $x(t)$. This contrasts with the **particle ODE filter** ([[ODE Filters and Smoothers]]), which is Bayesian and computes a *dependent* set of samples approximating the true posterior.

### Perturbative vs Gaussian methods (§40.3)

These nonparametric solvers offer non-Gaussian uncertainty at higher cost — in the **number of evaluations of $f$**, not necessarily wall-clock.

> [!example] The cost trade-off (authors' argument)
> To capture the trajectory distribution "well enough" a perturbative solver needs $S$ samples at step $h$. Absent parallelisation, the same budget could instead compute *one* sample at step $h/S$, which is more precise — and for many (not all) settings one precise estimate beats $S$ rough ones. But a single perturbative sample offers **no uncertainty quantification** (it is just a perturbed classical method). Extended Kalman ODE filters, by contrast, give a good estimate *plus* a calibrated standard deviation, at overhead in wall-clock but not in $f$-evaluations. Since numerical error acts like a statistical **bias**, the empirical sample mean does *not* improve as the number of samples grows — accuracy needs more steps per solve, not more solves.

> [!example] Arenstorf orbit (Fig. 40.1)
> On the restricted three-body problem (a spacecraft between earth and moon, periodic Arenstorf orbit), with a fixed budget of 50 000 steps, the additive-noise (40.3) and randomised-step (40.5) perturbative solvers (each computing two samples of 25 000 steps, Heun's method $q=2$) are compared to an EKF0 (1-times IWP, $R=0$, 50 000 steps). Splitting the budget across samples reduces each sample's precision; the EKF0 filtering mean (using all steps) is a much more accurate estimate than any single perturbative sample. The gap widens with more samples.

**When to prefer perturbative solvers:** when a *structured* non-Gaussian uncertainty estimate is sought — especially for chaotic or bifurcating ODEs (Lorenz strange attractor; Hodgkin–Huxley neuronal models where numerical uncertainty can qualitatively add/remove spikes, captured by Conrad et al. and Abdulle–Garegnani but hard for Gaussian methods). When the error estimate is merely a diagnostic on point-estimate quality, ODE filters use compute better. The meaning of the independent-sample structure remains, at the time of writing, poorly understood analytically.

## Connections

- The non-Bayesian sibling of [[ODE Filters and Smoothers]]; closest to the particle ODE filter (both nonparametric, but perturbative = frequentist i.i.d. samples, particle = Bayesian dependent samples).
- Uses the flow map $\Phi_h$ and order-$q+1$ local error from [[Classical ODE Solvers as Regression]].
- Motivated by the uncertainty-unawareness critique in [[Solving ODEs as Inference]].
- Extends to PDEs (randomised finite-element meshes) — see [[Further Topics in ODE Solvers]].

## See Also
- [[ODE Filters and Smoothers]] — Gaussian/particle Bayesian solvers; the comparison baseline.
- [[Theory of ODE Filters and Smoothers]] — filter convergence rates to contrast with $\min(p,q)$.
- [[Further Topics in ODE Solvers]] — perturbative solvers in ODE inverse problems (uncertainty-aware likelihood) and PDEs.
