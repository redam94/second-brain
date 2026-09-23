---
title: "Index: Foundations (Probabilistic Numerics)"
tags: [type/index, source/ingested]
parent: "[[../_Index|Probabilistic Numerics]]"
date_updated: 2026-07-01
concept_count: 7
---
# Foundations

> [!abstract] Routing Summary
> - Need the **PN thesis** (numerical problem = Bayesian inference; classical methods as MAP/posterior-mean estimates)? -> [[Computation as Probabilistic Inference]]
> - Need the **decision-theoretic / agent view** (solver chooses actions to minimise expected loss; early stopping; uncertainty ≠ randomness)? -> [[The Numerical Agent]]
> - Need the **Gaussian identities** (conditioning formula, affine maps, marginals, products)? -> [[Gaussian Distributions and Algebra]]
> - Need **regression on functions** (GP prior, posterior mean/covariance, kernels, RKHS/least-squares link, derivative & integral observations)? -> [[Gaussian Process Regression]]
> - Need **time-series priors** (linear SDEs, Itô integral, integrated Wiener process, Matérn/OU, transition/noise matrices $A(h),Q(h)$)? -> [[Gauss-Markov Processes and SDEs]]
> - Need **linear-time inference** (Kalman filter predict/update, RTS smoother, = $\mathcal{O}(N)$ GP regression)? -> [[Bayesian Filtering and Smoothing]]
> - Need **hyperparameter/scale calibration** (marginal likelihood, Gauss–Gamma conjugacy, runtime scale estimation)? -> [[Hierarchical Inference in Gaussian Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| PN thesis: computation as inference | [[Computation as Probabilistic Inference]] | concept | Gaussian Algebra | Numerical problems recast as Bayes: prior + likelihood over intractable latent → posterior; classical methods are MAP/posterior-mean estimates |
| Solver as decision-making agent | [[The Numerical Agent]] | concept | Computation as Inference | Agent minimises expected loss to pick actions; uncertainty drives exploration & early stopping; uncertainty ≠ randomness |
| Gaussian algebra | [[Gaussian Distributions and Algebra]] | concept, theorem | Computation as Inference | Closure under affine maps/marginals/products; conditioning formula (Eq. 3.6–3.13) maps inference to linear algebra |
| GP regression | [[Gaussian Process Regression]] | concept, theorem | Gaussian Algebra | GP posterior mean/cov (Eq. 4.6–4.7); posterior mean = kernel ridge/LS; posterior variance = RKHS worst-case error (Thm 4.8) |
| Gauss–Markov / SDEs | [[Gauss-Markov Processes and SDEs]] | concept, definition | GP Regression | Linear SDE (Def 5.4); IWP & Matérn/OU priors; discretisation $A(h),Q(h)$; IWP posterior = spline |
| Filtering & smoothing | [[Bayesian Filtering and Smoothing]] | concept, theorem | Gauss–Markov/SDEs | Kalman predict/update (Eq. 5.10–5.13) + RTS smoother (Eq. 5.15) = exact Gaussian inference, $\mathcal{O}(N)$; equals GP regression |
| Hierarchical inference | [[Hierarchical Inference in Gaussian Models]] | concept | Gaussian Algebra, Filtering | Marginal likelihood/evidence; Gauss–Gamma conjugacy (Eq. 6.8); Student-$t$ predictive; runtime scale calibration in filters (Eq. 6.14) |

## Notes
- [[Computation as Probabilistic Inference]] — CONTAINS: numerical-problem-as-inference definition, Bayes' theorem with prior/likelihood/evidence/posterior, information-channel view (MacKay), loss-driven prior selection, worked examples (quadrature as inference, computation pipelines).
- [[The Numerical Agent]] — CONTAINS: probabilistic-agent definition (expected-loss minimisation), the three roles of uncertainty (early stopping, exploration, bias-controlled self-assessment), the uncertainty≠randomness argument, examples (Bayesian optimisation, probabilistic line search, active quadrature).
- [[Gaussian Distributions and Algebra]] — CONTAINS: Gaussian pdf (Def, Eq. 3.1), affine-map theorem (Eq. 3.4), product-of-densities (Eq. 3.5), master conditioning/inference formula (Eq. 3.6–3.11), partitioned marginal/conditional (Eq. 3.12–3.13), explaining-away & 1-D update examples.
- [[Gaussian Process Regression]] — CONTAINS: parametric feature model (Eq. 4.1), weight-space posterior, kernel definition (Def 4.2) & semi-ring rules, Gaussian process definition (Def 4.4), GP posterior (Eq. 4.6–4.7), kernel-ridge/RKHS equivalence (Eq. 4.8), worst-case-error theorem (Thm 4.8), derivative/integral observations, IWP=cubic-spline example.
- [[Gauss-Markov Processes and SDEs]] — CONTAINS: linear SDE definition (Def 5.4, Eq. 5.18–5.19), Itô integral & Wiener process, discretisation $A(h),Q(h)$ (Eq. 5.20–5.26), integrated Wiener process (Eq. 5.22–5.27), Ornstein–Uhlenbeck & Matérn families ($k_{1/2},k_{3/2},k_{5/2}$), steady-state/Riccati.
- [[Bayesian Filtering and Smoothing]] — CONTAINS: Markov-chain definition (Def 5.1), Chapman–Kolmogorov predict + Bayes update (Eq. 5.2–5.3), linear-Gaussian state-space model (Eq. 5.8–5.9), Kalman filter one-step (Eq. 5.10–5.13, innovation/gain), RTS smoother (Eq. 5.15), filter+smoother = $\mathcal{O}(N)$ GP regression theorem.
- [[Hierarchical Inference in Gaussian Models]] — CONTAINS: hyperparameters & evidence/marginal-likelihood definition, Gauss–Gamma conjugate prior/posterior with sufficient statistics (Eq. 6.5–6.8), Student-$t$ predictive (Eq. 6.9), Gauss-inverse-Wishart multivariate case, recursive scale calibration in filters (Eq. 6.13–6.14), empirical vs full Bayes.

## Sources
- ProbabilisticNumerics — Hennig, Osborne & Kersting, *Probabilistic Numerics: Computation as Machine Learning* (CUP, 2022), Part I "Mathematical Background" + Introduction, book pp. 1-62.

## See Also
- [[Research/Probabilistic Numerics/Integration/_Index|Integration]] — Bayesian quadrature and integration as inference.
- [[Research/Probabilistic Numerics/Linear Algebra/_Index|Linear Algebra]] — probabilistic linear solvers and conjugate gradients.
- [[Research/Probabilistic Numerics/Optimisation/_Index|Optimisation]] — local/global optimisation, Bayesian optimisation.
- [[Research/Probabilistic Numerics/Differential Equations/_Index|Differential Equations]] — ODE filters, solvers as inference.
