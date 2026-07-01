---
title: Further Topics in ODE Solvers
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/overview
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 41-42, pp. 339-356"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Differential Equations"
doc_type: textbook
depends_on:
  - "[[ODE Filters and Smoothers]]"
  - "[[Perturbative ODE Solvers]]"
  - "[[Solving ODEs as Inference]]"
used_by:
  - "[[Probabilistic Numerics - Overview]]"
aliases:
  - ODE Inverse Problems
  - Boundary Value Problems
  - Uncertainty-Aware Likelihood
  - Probabilistic PDE Solvers
  - The Frontier
  - So What
  - Numerics-Statistics Consolidation
---

# Further Topics in ODE Solvers

> [!summary]
> Beyond forward IVPs, probabilistic ODE solvers extend to **boundary value problems** (add a Dirac likelihood on $x(T)$ to the SSM), **ODE inverse problems** (inserting a probabilistic solver's output as the likelihood yields an *uncertainty-aware* likelihood that removes overconfidence and, for the EKF0/EKS0, provides cheap gradient and Hessian estimators), and **PDEs** (Bayesian meshless methods, perturbative FEMs). §41.3 is the conceptual keystone: a probabilistic ODE solver **consolidates numerical computation and statistical inference** into a single SSM, fusing mechanistic ODE knowledge with observational data in one linear-time filtering pass. Part VII ("So What?") lays out open frontier questions.

## Overview

This note collects Ch. 41 (Further Topics) and Ch. 42 (the Part VII frontier). The unifying theme is **passing numerical uncertainty consistently along computational chains** — the founding promise of probabilistic numerics — and, ultimately, dissolving the boundary between numerics and statistics.

## Main Content

### Boundary value problems (§41.1)

> [!definition] BVP posterior (Eq. 41.1)
> A boundary value problem adds a final condition to the IVP: $x'(t) = f(x(t),t)$, $x(0)=x_0$, $x(T)=x_T$. Modelling $x, x'$ by a GP prior $p(\vec x(t_{0:N}))$, the BVP posterior is
> $$ p(\vec x(t_{0:N}) \mid z_{1:N}=0,\, x(T)=x_T), $$
> i.e. the IVP posterior additionally conditioned on $x(T)=x_T$. ^def-bvp
>
> If $f$ is **linear**, $f(x,t)=M(t)x + s(t)$, the likelihood is linear and the posterior is closed-form GP regression (John et al. 2019; from PDE solvers Cockayne et al. 2017a). Nonlinear $f$: quasi-linearisation (Newton's method partitioning into linear BVPs).

To retain the fast **linear-time** state-space formulation, Krämer & Hennig (2021) extend the IWP SSM (38.10)–(38.13) by adding the Dirac likelihood
$$ p(x_T\mid x_N) = \delta(x_T - H_0 x_N), $$
so $x_T$ enters as data on $x(T)=H_0 x_N$. Inference is then as for IVPs (EKS0/EKS1, or IEKS for the MAP), but the final step conditions on both $z_N=0$ and $H_0 x_N = x_T$. The IEKS converges quickly, includes step-size and hyperparameter calibration, and is state-of-the-art PN for BVPs. Application: computing **shortest paths / distances on Riemannian manifolds** (Hennig & Hauberg 2014; Arvanitidis et al. 2019), where numerical uncertainty matters for the final objective.

### ODE inverse problems (§41.2) — the uncertainty-aware likelihood

> [!definition] ODE inverse problem (Eq. 41.2–41.5)
> Infer parameter $\theta\in\Theta\subseteq\mathbb{R}^n$ of a parametrised IVP $x'(t)=f(x(t),\theta)$, $x(0)=x_0$, from noisy observations $z(t_i) := x_{\theta_0}(t_i) + \xi_i$, $\xi_i\sim\mathcal{N}(0,\sigma^2 I_d)$, stacked into $z$, with $p(z\mid x_{\theta_0}) = \mathcal{N}(z; x_{\theta_0}, \sigma^2 I_M)$. The forward map is $F(\theta) = x_\theta$ (the IVP solution). ^def-inverse
>
> Classical inversion uses the **uncertainty-unaware likelihood**: assume $p(x_\theta\mid\theta) = \delta(x_\theta - \hat x_\theta)$ (the numerical estimate is truth), giving
> $$ p(z\mid\theta) = \int p(z\mid x_\theta)p(x_\theta\mid\theta)\,dx_\theta \stackrel{\text{unaware}}{=} \mathcal{N}(z; \hat x_\theta, \sigma^2 I_M). $$

Inserting a **probabilistic** ODE solver's output $p(x_\theta\mid\theta)$ (a carefully designed distribution, not a Dirac) into the integral yields the **uncertainty-aware likelihood**. For the EKF0 this is Gaussian:
$$ p(z\mid\theta) = \mathcal{N}(z; m_\theta,\, P + \sigma^2 I_M), \tag{41.12}$$
where $m_\theta$ is the solver's posterior mean and $P$ its posterior covariance. For large steps $h$ (large numerical uncertainty relative to $\sigma^2$) this **corrects the overconfidence** of the unaware likelihood — demonstrated for the Lotka–Volterra ODE (Fig. 41.2): the unaware likelihood assigns near-zero probability to the true parameter at large $h$, while the aware likelihood keeps it well-calibrated. Reducing bias in the inferred parameter is one place where probabilistic solvers **already improve upon classical methods**.

> [!theorem] Free gradient and Hessian estimators from the EKF0 (Eqs. 41.13–41.14, Kersting et al. 2020)
> Under Assumption 41.1 ($f$ linear in $\theta$: $f(x,\theta) = \sum_{i=1}^n \theta_i f_i(x)$), the EKS0 posterior mean is affine in $\theta$, $m_\theta = x_0\mathbf{1}_M + J\theta$ (Eq. 41.9), with Jacobian estimator $J = KY$ (kernel pre-factor $K$ times data matrix $Y$). Then the log-likelihood $\mathcal{L}(z) := \log p(z\mid\theta)$ has estimators
> $$ \hat\nabla_\theta\mathcal{L}(z) := -J^\top[P + \sigma^2 I_M]^{-1}[z - m_\theta], \qquad \hat\nabla^2_\theta\mathcal{L}(z) := J^\top[P + \sigma^2 I_M]^{-1}J. $$
> These gradient and Hessian estimators come **almost for free** (products of precomputable $K$ and already-computed function evaluations), whereas classically they require expensive sensitivity analysis. Their scale is inversely coupled to the combined numerical+statistical uncertainty $P+\sigma^2 I_M$, inheriting the uncertainty-awareness. ^thm-grad
>
> Twice-differentiable, cheap-gradient likelihoods **greatly increase sample efficiency** of MCMC / optimisation-based inverse-problem solvers, improving overall speed. For perturbative solvers the analogous Bayesian inverse-problem posterior is $p(\theta\mid z)\propto p(\theta)\int p(z\mid x_\theta)p_h(x_\theta\mid\theta)\,dx_\theta$ (Eq. 41.6), approximated e.g. by pseudo-marginal MCMC (Lie, Sullivan & Teckentrup 2018 proved convergence as $h\to 0$).

### §41.3 Consolidating numerics and statistics — the keystone

> [!definition] Extended SSM fusing numerics + data (Eq. 41.15, Schmidt–Krämer–Hennig 2021)
> Extend the ODE SSM with additional **linear observations** of the solution at chosen times through
> $$ p(y_n^{\text{obs}}\mid x_n) = \mathcal{N}(y_n^{\text{obs}}; H^{\text{obs}}x_n, R^{\text{obs}}), $$
> with $H^{\text{obs}}\in\mathbb{R}^{k\times D}$, $0\le R^{\text{obs}}$. The statistical data $y^{\text{obs}}$ is incorporated **exactly like** the numerical data $z=[z_1,\dots,z_N]$: the observation likelihood (41.15) has the same form as the ODE likelihood (38.12). The resulting **extended SSM** is still a single probabilistic SSM. ^def-consolidation

This is the conceptual heart of the chapter: a well-designed probabilistic numerical method lets its statistical model be **extended to include observational data**, so numerical and statistical information are jointly exploited in one model. Concretely, one can infer the **latent force model** of an ODE from observational data using a *single* EKF1/EKS1 filtering/smoothing loop, jointly with the ODE solution, in **linear time** — removing the outer for-loop usually wrapped around classical solvers, giving large real wall-clock speedups.

> [!example] Covid-19 latent contact rate (§41.3)
> Infection numbers follow an ODE (the SIRD family) with unknown time-varying contact rate, modelled by a latent GP, while case counts are empirically observed. The EKF1/EKS1 directly incorporates both the mechanistic ODE knowledge and the empirical counts via an observation model (41.15), inferring the latent contact rate in a **single forward pass** rather than a laborious outer loop wrapped around forward simulation. This is typical of real-world dynamical-systems inference: partial mechanistic knowledge + physical observations.

### Partial differential equations (§41.4)

PDEs are a well-established PN field, beyond this text's scope, but linked to ODEs:
- **Linear PDEs:** exact Bayesian meshless methods by conditioning a Gaussian prior on evaluations of the PDE right-hand side (Cockayne et al. 2017a) — on linear ODEs these coincide with the EKS0. Applied to PDE-constrained inverse problems (Cockayne et al. 2017b) and engineering (Oates et al. 2019b).
- **Nonlinear PDEs:** approximations needed (Wang et al. 2021), philosophically like ODE filters. Krämer, Schmidt & Hennig (2022) solve time-dependent PDEs with ODE filters + GP-interpretation of finite differences.
- **Perturbative PDE solvers:** Chkrebtii et al. (2016) for parabolic PDEs; Conrad et al. (2017) perturbed FEM for elliptic PDEs; Abdulle & Garegnani (2021) randomised-mesh FEM; Girolami et al. (2021) FEM fused with external data (§41.3 analogue). Also Raissi–Perdikaris–Karniadakis (2017), Owhadi (2017) gamblets for rough coefficients.

### Part VII — "So What?" the frontier (Ch. 42)

Open questions likely to shape PN for the coming decade:
- **§42.1 Where will PN find application?** To date substantive impact mainly in global optimisation / hyperparameter tuning; where is the next breakthrough, and what software best supports PN?
- **§42.2 Can randomness be banished from computation?** §12.3 argued against randomness, yet non-random alternatives to stochastic algorithms are impractical; can PN yield effective *and* lightweight deterministic ones?
- **§42.3 Can we scale PN?** Bayesian optimisation/quadrature remain limited to low dimensions; ODEs and linear algebra already scale as well as classical methods, but MCMC is a formidable competitor for integration.
- **§42.4 How can numerics be tailored?** Structure is central to performance; tailoring via human-designed priors works but cannot cover every nested numerical subproblem — **automation is essential** (e.g. parsing source code to infer structure). ODEs are the pointer: PN there already beats classical methods when the ODE supplies mechanistic structure to an empirical inference problem.
- **§42.5 Can PN models be identified at runtime?** Statistical-learning-theory view: which numerical models are identifiable, and at what cost; tractability on binary computers constrains the model space in ways not yet understood.
- **§42.6 What can we say about numerical error given finite computation?** The exact error is never available live, but its scale/structure often is, at minimal overhead — the limits of such calibration need more work.
- **§42.7 What does uncertainty mean in PN?** A deep, partly philosophical debate about uncertainty over a deterministic computation; PN sharpens both the challenges and (because tasks are formally defined in a programming language) the precision of prior assumptions.
- **§42.8 Can computational pipelines be harmonised?** PN promises rigorous uncertainty management across pipelines; graphical models / message passing are promising foundations, but little is built yet.
- **§42.9 Are there limits to synthesising numerical + statistical information?** From an information/decision-theoretic view there should be none: all uncertain information can be expressed by probability and exploited by PN. Whether a firm distinction between statistical inference and numerical computation should survive is left to future research.

## Connections

- Applies [[ODE Filters and Smoothers]] (EKF0/1, EKS0/1, IEKS) to BVPs, inverse problems, and PDEs.
- The uncertainty-aware likelihood operationalises the uncertainty-unawareness critique of [[Classical ODE Solvers as Regression]].
- Perturbative inverse problems and PDE solvers draw on [[Perturbative ODE Solvers]].
- §41.3 realises the founding thesis of [[Computation as Probabilistic Inference]] — numerics and statistics as one inference problem.

## See Also
- [[ODE Filters and Smoothers]] — the solvers extended here.
- [[Perturbative ODE Solvers]] — perturbative inverse-problem and PDE variants.
- [[Solving ODEs as Inference]] — the framing whose consequences culminate in §41.3.
- [[Probabilistic Numerics - Overview]] — the book-wide synthesis the frontier chapter closes.
