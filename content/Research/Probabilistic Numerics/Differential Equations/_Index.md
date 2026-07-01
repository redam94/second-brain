---
title: "Index: Differential Equations (Probabilistic Numerics)"
tags: [type/index, source/ingested]
parent: "[[../_Index|Probabilistic Numerics]]"
date_updated: 2026-07-01
concept_count: 6
---

# Differential Equations

> [!abstract] Routing Summary
> This leaf covers Parts VI–VII of Hennig, Osborne & Kersting, *Probabilistic Numerics* (2022): solving ODEs as Bayesian inference.
> - **New here? Start with** [[Solving ODEs as Inference]] — the IVP $\dot y = f(y,t)$, $y(0)=y_0$ cast as regression on the derivative.
> - **Want the "classical solvers are posterior means" argument** → [[Classical ODE Solvers as Regression]] (Runge–Kutta, Nordsieck, uncertainty-unawareness).
> - **Want the algorithm** (IWP prior, EKF0/EKF1 update, RTS smoother, particle filter) → [[ODE Filters and Smoothers]] — the central note.
> - **Want proofs** (convergence $h^q$, calibration, A-stability, trapezoidal/Nordsieck equivalence) → [[Theory of ODE Filters and Smoothers]].
> - **Want randomised/sampling solvers** (chaos, bifurcations) → [[Perturbative ODE Solvers]].
> - **Want BVPs, inverse problems, PDEs, the frontier** → [[Further Topics in ODE Solvers]].
> - **Foundational reuse:** [[../Foundations/_Index|Foundations]], esp. [[Gauss-Markov Processes and SDEs]] (prior) and [[Bayesian Filtering and Smoothing]] (inference engine).

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| ODE-as-inference framing | [[Solving ODEs as Inference]] | concept | Gauss-Markov SDEs; Numerical Agent | IVP solving = regression on $x'$; Gauss–Markov prior → $\mathcal{O}(N)$ ODE filters; Picard–Lindelöf well-posedness |
| Classical solvers = regression | [[Classical ODE Solvers as Regression]] | theorem, example | Solving ODEs as Inference; GP Regression | $p$th-order solver = iterated Hermite interpolation of flow Taylor series; classical solvers are uncertainty-unaware posterior means; global rate $\mathcal{O}(h^p)$ |
| The ODE filter algorithm | [[ODE Filters and Smoothers]] | concept, theorem | Gauss-Markov SDEs; Bayesian Filtering & Smoothing | Nonlinear SSM (38.10–38.13); IWP prior = Taylor extrapolation; EKF0/EKF1 update via residual $f(H_0m^-)-Hm^-$; EKS0/1, IEKS, particle filter; default **EKS1** |
| Convergence & stability theory | [[Theory of ODE Filters and Smoothers]] | theorem | ODE Filters and Smoothers | Global rate $\mathcal{O}(h^q)$ + calibrated variance (Thm 39.3–39.4); MAP rate via RKHS (Cor 39.7); EKF1/EKS1 A-stable; EKF0 = trapezoidal rule ($q{=}1$) / 3rd-order Nordsieck ($q{=}2$) |
| Randomised solvers | [[Perturbative ODE Solvers]] | concept | Classical Solvers as Regression; ODE Filters | Additive-noise (Conrad 2017) & randomised-step (Abdulle–Garegnani 2020); mean-square rate $\min(p,q)$, recommend $p{=}q$; capture chaos/bifurcations |
| BVPs, inverse problems, PDEs, frontier | [[Further Topics in ODE Solvers]] | concept, overview | ODE Filters; Perturbative Solvers | Dirac likelihood for BVPs; uncertainty-aware likelihood $\mathcal{N}(z;m_\theta,P{+}\sigma^2 I)$ reduces inverse-problem bias; free EKF0 gradients/Hessians; §41.3 numerics+data consolidation; Part VII open questions |

## Notes

- [[Solving ODEs as Inference]] — CONTAINS: IVP/BVP definitions, Picard–Lindelöf & regularity theorems, the state-space (derivatives) representation, reduction to quadrature, filtering-vs-perturbative overview.
- [[Classical ODE Solvers as Regression]] — CONTAINS: flow map $\Phi_h$ and its Taylor series, order conditions as Hermite interpolation, uncertainty-unawareness, the regression data set (37.7), brief history of probabilistic ODE solvers.
- [[ODE Filters and Smoothers]] — CONTAINS: continuous/discrete SSM, IWP/IOUP prior and Taylor-extrapolation theorem, exact-init, Algorithms 38.1/38.2, EKF0/EKF1 update equations, EKS0/1 RTS smoother, IEKS/MAP, particle ODE filter, calibration/step-size/error estimation, method-choice recommendation (EKS1).
- [[Theory of ODE Filters and Smoothers]] — CONTAINS: local/global convergence (Thm 39.2–39.3), calibration (Thm 39.4), scattered-data RKHS analysis (Thm 39.6, Cor 39.7), A-stability (Thm 39.8), linear-algebra stability (rescaling + square-root filters), trapezoidal & Nordsieck equivalences (Prop 39.11, Thm 39.13).
- [[Perturbative ODE Solvers]] — CONTAINS: additive-noise solver (40.3) + Thm 40.5, randomised-step solver (40.5) + Thm 40.7, perturbative-vs-Gaussian cost trade-off, Arenstorf/Lorenz/Hodgkin–Huxley examples.
- [[Further Topics in ODE Solvers]] — CONTAINS: BVP SSM, ODE inverse problems & uncertainty-aware likelihood, free gradient/Hessian estimators (Thm/Eqs 41.13–41.14), §41.3 numerics+data consolidation (Covid example), probabilistic PDE solvers, Part VII "So What?" frontier questions.

## Sources
- [[raw/ProbabilisticNumerics.pdf]] — Hennig, Osborne & Kersting, *Probabilistic Numerics: Computation as Machine Learning* (Cambridge, 2022), Parts VI–VII, book pp. 279–356 (Ch. 35–42).

## See Also
- [[../Foundations/_Index|Foundations]] — especially [[Gauss-Markov Processes and SDEs]] and [[Bayesian Filtering and Smoothing]], the prior and inference engine reused throughout this leaf.
- [[../Integration/_Index|Integration]] — ODE solving is the "nonlinear extension" of quadrature; EKF0/EKS0 generalise [[Bayesian Quadrature]].
- [[../_Index|Probabilistic Numerics]] — topic root.
