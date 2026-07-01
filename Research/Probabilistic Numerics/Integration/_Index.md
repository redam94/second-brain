---
title: "Index: Integration (Probabilistic Numerics)"
tags: [type/index, source/ingested]
parent: "[[../_Index|Probabilistic Numerics]]"
date_updated: 2026-07-01
concept_count: 7
---

# Integration

Part II of *Probabilistic Numerics: Computation as Machine Learning* (Hennig, Osborne & Kersting, 2022), book pp. 63-121. Integration is the pedagogical prototype of Probabilistic Numerics: the definite integral $F=\int_{\mathcal X} f\,\mathrm d\nu$ is an epistemically-uncertain number, a Gaussian-process prior on $f$ turns computing it into inference, and classical quadrature rules are revealed as posterior-mean estimators under specific priors.

> [!abstract] Routing Summary
> - **Need the task setup, notation, weighted-sum rules, MC baseline?** -> [[The Integration Problem]]
> - **Need the core method — GP prior, Gaussian $F$, posterior mean/weights/variance, kernel mean?** -> [[Bayesian Quadrature]]
> - **Need the RKHS / worst-case-error / kernel-mean / MMD view?** -> [[Kernel Quadrature and Kernel Means]]
> - **Need the trapezoid/spline/Gauss rules derived as inference (with the trapezoid derivation)?** -> [[Classical Quadrature as Inference]]
> - **Need convergence rates, how smoothness sets the rate, error calibration?** -> [[Convergence and Priors in Bayesian Quadrature]]
> - **Need active/adaptive BQ, WSABI/BBQ, warped models, model evidence, Bayesian Monte Carlo?** -> [[Active Bayesian Quadrature and Bayesian Monte Carlo]]
> - **Need the transferable PN design lessons + "why not random numbers" + further reading?** -> [[Lessons from Integration]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| The quadrature task | [[The Integration Problem]] | concept | Computation as Inference; Numerical Agent | $F=\int f\,\mathrm d\nu$ is epistemically uncertain; classical rules are $\sum_i w_i f(x_i)$; MC is $\mathcal O(N^{-1/2})$ (Lemma 9.2) |
| Bayesian quadrature | [[Bayesian Quadrature]] | concept, theorem | The Integration Problem; GP Regression; Gaussian Algebra | GP prior $\Rightarrow$ $F$ Gaussian; $\mathfrak m=\mathfrak m_0+\ell_X^\top k_{XX}^{-1}(Y-m_X)$, $\mathfrak v=\mathfrak K-\ell_X^\top k_{XX}^{-1}\ell_X$; weights $w=k_{XX}^{-1}\ell_X$ |
| Kernel means / RKHS | [[Kernel Quadrature and Kernel Means]] | concept, theorem | Bayesian Quadrature; GP Regression | Kernel mean $\mu_\nu=\int k(x,\cdot)\,\mathrm d\nu$; $\mathfrak v = $ squared worst-case RKHS error; MMD / kernel herding |
| Classical rules as inference | [[Classical Quadrature as Inference]] | theorem, example | Bayesian Quadrature; Gauss-Markov/SDEs; Filtering | Trapezoid = MAP under Wiener prior (Thm 11.1); spline / Gauss rules from integrated-Wiener / degenerate kernels (Thm 11.5) |
| Convergence & calibration | [[Convergence and Priors in Bayesian Quadrature]] | concept, theorem | Bayesian Quadrature; Classical Quadrature; Hierarchical Inference | Rate set by kernel smoothness (trapezoid $\mathcal O(N^{-1})$); $\theta$ inferred $\Rightarrow$ Student-t error; model-fit statistic $r$ |
| Active / warped BQ | [[Active Bayesian Quadrature and Bayesian Monte Carlo]] | concept | Bayesian Quadrature; Numerical Agent | Warped models (WSABI $\sqrt f$, BBQ $\log f$) for non-negative integrands; uncertainty sampling; weak adaptivity; faster than MC/AIS |
| Design lessons | [[Lessons from Integration]] | concept, overview | all above | Classical = MAP; priors encode assumptions; PN can be fast; MC is MAP under white-noise prior (Thm 12.1); randomness usually harmful |

## Notes

- [[The Integration Problem]] — CONTAINS: the quadrature task $F=\int f\,\nu(\mathrm dx)$; epistemic vs aleatory uncertainty; intractability; classical weighted-sum rules; the model + design-rule recipe; models must be simpler than the problem; Monte Carlo and Lemma 9.2.
- [[Bayesian Quadrature]] — CONTAINS: GP prior on $f$; joint Gaussian over $(Y,F)$; posterior mean/variance (Thm ^thm-bq-posterior); the three integrals $\mathfrak m_0,\ell,\mathfrak K$; BQ weights; scale separation $k=\theta^2\tilde k$; data-independent (open-loop) variance; node selection; Gaussian × Gaussian and multivariate examples; curse of dimensionality.
- [[Kernel Quadrature and Kernel Means]] — CONTAINS: kernel mean / embedding of $\nu$; reproducing property; worst-case error = posterior std (Thm); MMD, kernel herding, kernel quadrature; initial error; the "shrinking kernel" difference from BQ.
- [[Classical Quadrature as Inference]] — CONTAINS: Wiener-process prior; full trapezoid-as-posterior-mean derivation (Thm 11.1); equivalent Kalman-filter form at $\mathcal O(N)$ (Alg 11.1); trapezoid error bar $\tfrac{\theta^2}{12}\sum\delta_i^3$; integrated-Wiener spline rules; degenerate polynomial kernels and Bayesian Gaussian quadrature (Thm 11.5 / Cor 11.6); Kepler/Simpson caveat.
- [[Convergence and Priors in Bayesian Quadrature]] — CONTAINS: rate-by-smoothness table; equidistant grid as maximally-informative design; rate vs scale; conjugate-Gamma scale inference and Student-t marginal on $F$; model-fit statistic $r$ and over/under-confidence; worst-case vs expected-case error.
- [[Active Bayesian Quadrature and Bayesian Monte Carlo]] — CONTAINS: Bayesian Monte Carlo; model evidence integral; BBQ (log-GP), WSABI (sqrt-GP, linearised & moment-matched), MMLT; uncertainty sampling; weak adaptivity (Thm); the sin/phase pathological example; WSABI beating MC/AIS in wall-clock time; computation as investment.
- [[Lessons from Integration]] — CONTAINS: the four Ch. 13 lessons; PN is no-worse and can be fast; Monte Carlo as MAP under a white-noise prior (Thm 12.1); dimension-independence as "equally bad"; quasi-Monte Carlo / Riemann sums; four arguments against a PRNG; "which sequence is random?"; adversarial caveat; software and further reading.

## Sources
- [[raw/ProbabilisticNumerics.pdf]] — Part II "Integration" (Ch. 8-13, book pp. 63-121). Philipp Hennig, Michael A. Osborne, Hans P. Kersting, *Probabilistic Numerics: Computation as Machine Learning*, Cambridge University Press, 2022. Exercise solutions: book pp. 357-368 (Exercise 9.3, pathological MC variance).

## See Also
- [[../Foundations/_Index|Foundations]] — GP regression, Gaussian algebra, Gauss-Markov/SDEs, filtering/smoothing, hierarchical inference (prerequisites).
- [[../Linear Algebra/_Index|Linear Algebra]] — the same "solver as agent" recipe for linear systems.
- [[../Optimisation/_Index|Optimisation]] — priors, acquisition functions, and active design in optimisation.
- [[../Differential Equations/_Index|Differential Equations]] — ODE solvers as inference (filtering, as in the trapezoid's Kalman form).
