---
title: "Index: Probabilistic Numerics"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-01
concept_count: 36
---

# Probabilistic Numerics

> [!abstract] Routing Summary
> Ingest of the textbook **Hennig, Osborne & Kersting, *Probabilistic Numerics: Computation as Machine Learning*** (Cambridge, 2022). PN recasts numerical tasks — integration, linear algebra, optimisation, ODEs — as **Bayesian inference** returning a calibrated posterior, and treats a solver as a **decision-making agent**. The unifying result: many classical methods (trapezoid/Gauss quadrature, Conjugate Gradients, BFGS, Runge–Kutta) are the **posterior mean of a specific Gaussian inference procedure**. Contains 36 notes across 5 sub-topics.
> - The big picture / where to start? → [[Probabilistic Numerics - Overview]]
> - The Gaussian inference toolbox everything is built on? → [[Foundations/_Index|Foundations]]
> - Integration & Bayesian quadrature? → [[Integration/_Index|Integration]]
> - Solving linear systems $Ax=b$ as inference? → [[Linear Algebra/_Index|Linear Algebra]]
> - Local optimisation, Bayesian optimisation, acquisition functions? → [[Optimisation/_Index|Optimisation]]
> - Solving ODEs with filters/smoothers? → [[Differential Equations/_Index|Differential Equations]]

## Sub-topics

- [[Foundations/_Index|Foundations]] — COVERS (Part I): the shared machinery — [[Computation as Probabilistic Inference|the PN thesis]] and [[The Numerical Agent|agent view]]; [[Gaussian Distributions and Algebra|Gaussian algebra]] (conditioning/affine maps); [[Gaussian Process Regression|GP regression]] (RKHS, worst-case error); [[Gauss-Markov Processes and SDEs|Gauss–Markov/SDE priors]] (IWP, Matérn, IOUP); [[Bayesian Filtering and Smoothing|Kalman filter & RTS smoother]] as $\mathcal{O}(N)$ GP regression; [[Hierarchical Inference in Gaussian Models|hyperparameter/scale calibration]]. *(7 notes.)*
- [[Integration/_Index|Integration]] — COVERS (Part II): [[The Integration Problem|the quadrature task]]; [[Bayesian Quadrature|Bayesian quadrature]] (GP-integral posterior, BQ weights); [[Kernel Quadrature and Kernel Means|kernel means & worst-case error]]; [[Classical Quadrature as Inference|trapezoid/Gauss/Clenshaw–Curtis as posterior means]]; [[Convergence and Priors in Bayesian Quadrature|convergence & scale inference]]; [[Active Bayesian Quadrature and Bayesian Monte Carlo|active BQ, WSABI, Bayesian Monte Carlo]]; [[Lessons from Integration|transferable PN lessons]]. *(7 notes.)*
- [[Linear Algebra/_Index|Linear Algebra]] — COVERS (Part III): [[The Linear Algebra Problem and Evaluation Strategies|the spd solve & matrix-vector observations]]; [[Classic Linear Solvers - A Review|CG/Krylov/conjugacy]]; [[Gaussian Priors over Matrices and the Symmetric Kronecker Product|matrix-variate Gaussians]]; [[Probabilistic Linear Solvers - Algorithmic Scaffold|the general probabilistic solver]]; [[Conjugate Gradients as Probabilistic Inference|CG = BayesCG posterior mean]]; [[Computational Constraints on Probabilistic Solvers|keeping $\mathcal{O}(\cdot)$ cost]]; [[Uncertainty Calibration for Linear Solvers|scale calibration]]. *(7 notes.)*
- [[Optimisation/_Index|Optimisation]] — COVERS (Parts IV–V): local — [[The Local Optimisation Problem|noisy gradient minimisation]], [[Probabilistic Step-Size Selection and Line Searches|probabilistic line search & Wolfe conditions]], [[First- and Second-Order Optimisation Methods|BFGS-as-inference, probabilistic gradients]]; global — [[The Global Optimisation Problem|expensive black-box optimisation]], [[Bayesian Optimisation|the BO loop]], [[Value Loss and Entropy Search|value-of-information & entropy search]], [[Acquisition Functions|PI/EI/UCB/KG closed forms]], [[Further Topics in Global Optimisation|batch/multi-fidelity/AutoML]]. *(8 notes.)*
- [[Differential Equations/_Index|Differential Equations]] — COVERS (Parts VI–VII): [[Solving ODEs as Inference|the IVP as regression]]; [[Classical ODE Solvers as Regression|Runge–Kutta/multistep as posterior means]]; [[ODE Filters and Smoothers|the EKF0/EKF1 ODE filter + RTS smoother]]; [[Theory of ODE Filters and Smoothers|convergence, A-stability, calibration]]; [[Perturbative ODE Solvers|randomised/additive-noise solvers]]; [[Further Topics in ODE Solvers|inverse problems, PDEs, the frontier]]. *(6 notes.)*

## Cross-Cutting Concepts

Concepts that span multiple sub-topics:
- **Classical method = Gaussian posterior mean** — the book's signature result, instantiated in [[Classical Quadrature as Inference]] (trapezoid/Gauss), [[Conjugate Gradients as Probabilistic Inference]] (CG), [[First- and Second-Order Optimisation Methods]] (BFGS), and [[Classical ODE Solvers as Regression]] (Runge–Kutta).
- **Bayesian filtering & smoothing as the engine** — [[Bayesian Filtering and Smoothing]] underlies both state-space GP regression and the [[ODE Filters and Smoothers|ODE filter]]; the same IWP/Matérn [[Gauss-Markov Processes and SDEs|Gauss–Markov priors]] appear in ODEs and in $\mathcal{O}(N)$ quadrature ([[Classical Quadrature as Inference]]).
- **Gaussian conditioning** — the master formula from [[Gaussian Distributions and Algebra]] produces every closed-form posterior in [[Bayesian Quadrature]], [[Probabilistic Linear Solvers - Algorithmic Scaffold]], and [[Gaussian Process Regression]].
- **Active evaluation / value of information** — choosing the next evaluation to shrink posterior uncertainty: [[Active Bayesian Quadrature and Bayesian Monte Carlo]], [[Acquisition Functions]], [[Value Loss and Entropy Search]], and probabilistic-line-search node selection ([[Probabilistic Step-Size Selection and Line Searches]]).
- **Runtime scale calibration** — the same Gauss–Gamma conjugate trick calibrates uncertainty in [[Hierarchical Inference in Gaussian Models]], [[Convergence and Priors in Bayesian Quadrature]], and [[Uncertainty Calibration for Linear Solvers]].
- **Consolidating numerics with statistics** — the keystone payoff: a probabilistic solver inside an inverse problem reduces bias — [[Further Topics in ODE Solvers]] (§41.3).

## Concept Dependency Chain

[[Computation as Probabilistic Inference]] / [[The Numerical Agent]] → [[Gaussian Distributions and Algebra]] → {[[Gaussian Process Regression]], [[Gauss-Markov Processes and SDEs]] → [[Bayesian Filtering and Smoothing]]} → [[Hierarchical Inference in Gaussian Models]]; then each application branch:
- **Integration:** [[The Integration Problem]] → [[Bayesian Quadrature]] → [[Kernel Quadrature and Kernel Means]] → [[Classical Quadrature as Inference]] → [[Convergence and Priors in Bayesian Quadrature]] → [[Active Bayesian Quadrature and Bayesian Monte Carlo]] → [[Lessons from Integration]].
- **Linear algebra:** [[The Linear Algebra Problem and Evaluation Strategies]] → [[Classic Linear Solvers - A Review]] → [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]] → [[Probabilistic Linear Solvers - Algorithmic Scaffold]] → [[Conjugate Gradients as Probabilistic Inference]] → [[Computational Constraints on Probabilistic Solvers]] → [[Uncertainty Calibration for Linear Solvers]].
- **Optimisation:** [[The Local Optimisation Problem]] → [[Probabilistic Step-Size Selection and Line Searches]] → [[First- and Second-Order Optimisation Methods]]; [[The Global Optimisation Problem]] → [[Bayesian Optimisation]] → [[Value Loss and Entropy Search]] → [[Acquisition Functions]] → [[Further Topics in Global Optimisation]].
- **ODEs:** [[Solving ODEs as Inference]] → [[Classical ODE Solvers as Regression]] → [[ODE Filters and Smoothers]] → [[Theory of ODE Filters and Smoothers]] → [[Perturbative ODE Solvers]] → [[Further Topics in ODE Solvers]].

## Sources
- [[raw/ProbabilisticNumerics.pdf]] — Philipp Hennig, Michael A. Osborne, Hans P. Kersting, *Probabilistic Numerics: Computation as Machine Learning*, **Cambridge University Press**, 2022. (Draft/pre-publication copy, 412 pp.)

## See Also
- [[Bayesian Statistics/_Index|Bayesian Statistics]] — the inference, GP, and conjugate-prior foundations PN reuses
- [[Bayesian Experimental Design/_Index|Bayesian Experimental Design]] — the expected-information-gain logic mirrored in active evaluation and acquisition functions
- [[Econometrics/_Index|Econometrics]] · [[Market Response Models/_Index|Market Response Models]] — downstream users of GP regression and Bayesian optimisation
