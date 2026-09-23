---
title: "Index: Linear Algebra (Probabilistic Numerics)"
tags: [type/index, source/ingested]
parent: "[[../_Index|Probabilistic Numerics]]"
date_updated: 2026-07-01
concept_count: 6
---

# Linear Algebra

Part III of *Probabilistic Numerics: Computation as Machine Learning* (Hennig, Osborne & Kersting, 2022), book pp. 123-193. The numerical task is solving the spd system $Ax=b$ (equivalently inverting $A$ or minimising a convex quadratic). A solver's only observations are **matrix-vector products** $z=As$; it is a probabilistic agent choosing which products to make. The headline result: **Conjugate Gradients is the posterior mean of a specific Gaussian inference procedure** — classical iterative solvers *are* probabilistic numerical methods. Uncertainty calibration is harder here than in integration because a matrix has $N^2$ degrees of freedom but $M$ projections identify only $\sim MN$ of them.

> [!abstract] Routing Summary
> - **Need the task ($Ax=b$ / invert $A$), the least-squares view, matrix-vector products as observations, the iterative skeleton `LinSolve_Project`?** -> [[The Linear Algebra Problem and Evaluation Strategies]]
> - **Need CG / Cholesky-LU / GMRES, projection / conjugate-direction / Krylov taxonomy, preconditioning?** -> [[Classic Linear Solvers - A Review]]
> - **Need the general probabilistic solver — Gaussian prior on $A$/$H$/$x$, update equations, four model families?** -> [[Probabilistic Linear Solvers - Algorithmic Scaffold]] (central)
> - **Need the matrix-variate Gaussian, Kronecker & symmetric-Kronecker covariance machinery?** -> [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]]
> - **Need the theorem that CG = posterior mean (BayesCG), with conditions and Ch. 22 proof sketches?** -> [[Conjugate Gradients as Probabilistic Inference]]
> - **Need to keep the solver at CG's $O(\cdot)$ cost, low-rank posteriors, inference on $x$ only?** -> [[Computational Constraints on Probabilistic Solvers]]
> - **Need trustworthy error bars — Rayleigh regression, scale estimation, conservative bounds?** -> [[Uncertainty Calibration for Linear Solvers]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| The task & evaluation strategy | [[The Linear Algebra Problem and Evaluation Strategies]] | concept | Gaussian Algebra; Numerical Agent | $Ax=b\iff\min\tfrac12 x^\top Ax-x^\top b$; observations $Z=AD$; consistency $A_iD_i=Z_i$; skeleton Algorithm 17.2 |
| Classic solvers | [[Classic Linear Solvers - A Review]] | concept, theorem | The Linear Algebra Problem | projection $\supset$ conjugate-direction $\supset$ Krylov $\ni$ CG; symmetric $H_i\Rightarrow$ conjugacy (Thm 18.2); Cor 18.5 = CG; preconditioning (18.7) |
| Matrix Gaussians & Kronecker | [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]] | concept, definition | Gaussian Algebra; The Linear Algebra Problem | matrix-variate $\mathcal N(X;X_0,\Sigma_0)$; $\Sigma_0=V_0\otimes W_0$; symmetric Kronecker $W\otimes_\ominus W$ encodes symmetry (19.20) |
| Probabilistic solver scaffold | [[Probabilistic Linear Solvers - Algorithmic Scaffold]] | concept, theorem | Classic Solvers; Matrix Gaussians | prior on $A$/$H$/$x$; low-rank posterior mean (19.10/19.21) & inverse (19.12/19.24); symmetry ⇒ conjugate directions (Thm 19.15); pos-def cone obstruction; 4 models (Table 19.1); preconditioning = prior (Cor 19.17) |
| CG as inference | [[Conjugate Gradients as Probabilistic Inference]] | theorem | Classic Solvers; Scaffold | Thm 19.16: scalar-mean symmetric-Kronecker prior ($W=\beta I+\gamma A$) ⇒ Algorithm 17.2 = CG; Ch. 22 proofs of Thms 18.2/18.4, 19.10 |
| Computational constraints | [[Computational Constraints on Probabilistic Solvers]] | concept | Scaffold; CG as Inference | CG output as data; $A_M=\tilde Y\tilde Y^\top$ (20.3); tridiagonal $Y^\top Y$ ⇒ $O(M)$; $W_0=A_M\Rightarrow W_M=0$; inference on $x$ via $Y^\top x=S^\top b$ (20.7) |
| Uncertainty calibration | [[Uncertainty Calibration for Linear Solvers]] | concept, theorem | Scaffold; Computational Constraints; Hierarchical Inference | $W_0=\tilde Y\tilde Y^\top+\omega(I-P_S)$ (21.1); Rayleigh regression for $\omega$ (21.4-21.5); projection error $\Sigma_v$; Gauss-Gamma scale posterior (22.7-22.11); worst-case vs average |

## Notes

- [[The Linear Algebra Problem and Evaluation Strategies]] — CONTAINS: spd problem $Ax=b$, $H=A^{-1}$; least-squares quadratic $f(x)=\tfrac12x^\top Ax-x^\top b$ and residual/gradient $r=Ax-b$; why iterative/anytime beats Gaussian elimination; CG Algorithm 16.1; matrix-vector products as observations $Z=AD$; direct vs iterative evaluation strategies; consistency $A_iD_i=Z_i$, $H_iZ_i=D_i$; estimation update (17.1) and action rule (17.2); optimal step size (17.3); the skeleton `LinSolve_Project` (Algorithm 17.2).
- [[Classic Linear Solvers - A Review]] — CONTAINS: projection methods & Galerkin condition (18.1); $A$-conjugate directions (Def 18.1); linear consistency; **Theorem 18.2** (symmetric estimator ⇒ conjugate directions); Krylov sequence (18.2) & Lemma 18.3; **Theorem 18.4** / **Corollary 18.5** (conditions ⇒ CG); Lanczos/Arnoldi; preconditioning (18.7)/pCG (Alg 18.1) and preconditioning-as-prior (18.8); why no forced Gaussian prior; when uncertainty matters (operators, inverse Hessians, noise).
- [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]] — CONTAINS: vectorisation $\vec A$ / $\natural$; Kronecker product (15.2-15.7); matrix-variate Gaussian (19.3); why not Wishart; Kronecker covariance $\Sigma_0=V_0\otimes W_0$ (19.8-19.9) and its DOF; Fig 19.2 row/column caveat; symmetric/anti-symmetric projections $\Pi_\ominus,\Pi_\oplus$; symmetric & skew Kronecker products (19.16-19.17); symmetry as Dirac likelihood ⇒ $\mathcal N(A_0,W_0\otimes_\ominus W_0)$ (19.20).
- [[Probabilistic Linear Solvers - Algorithmic Scaffold]] — CONTAINS: prior on $A$ vs $H$ vs $x$ and their trade-offs; noise-free duality $S\leftrightarrow Y$, $A\leftrightarrow H$; general Gaussian posterior (19.5/19.6) and the too-large Gram matrix; Kronecker posterior (19.10/19.11), inverse-of-mean (19.12), Lemma 19.3; symmetric posterior (19.21/19.22) as rank-$2M$ update (19.24); positive-definite cone obstruction, Corollary 19.9 & Theorem 19.10; four model families (Table 19.1); posterior correspondence (Def 19.11, Lemma 19.12, Thm 19.13); **Theorems 19.14/19.15/19.16** and **Corollary 19.17** (preconditioning = prior); the "means need only accessible $WY$/$WS$" trick.
- [[Conjugate Gradients as Probabilistic Inference]] — CONTAINS: Theorem 18.4 / Corollary 18.5 restated; **Theorem 19.16** (Probabilistic CG) with full proof; Ch. 22 proof sketches of Theorem 18.2, Lemma 18.3, Theorem 18.4, and Theorem 19.10 (hereditary positive-definiteness); BayesCG scalar prior $\mathcal N(\alpha I,\beta^2 I\otimes_\ominus I)$; two derivations (on $A$ or on $H$).
- [[Computational Constraints on Probabilistic Solvers]] — CONTAINS: inference-interpretation vs algorithm-for-inference; CG convergence (20.1-20.2) and low-rank mean covering dominant eigenvalues; favoured prior $A_0=0$, $W_0S=Y$; diagonal Gram / $A_M=\tilde Y\tilde Y^\top$ (20.3); tridiagonal $Y^\top Y$ ⇒ $O(M)$ solve; perfect diagonal calibration (20.4-20.5), off-diagonal bound (20.6); empirical-Bayes $W_0=A_M\Rightarrow W_M=0$; pseudoinverse $A_M^+$; solution-based inference $Y^\top x=S^\top b$ (20.7), posterior (20.8-20.10).
- [[Uncertainty Calibration for Linear Solvers]] — CONTAINS: projection-complement covariance (21.1), scalar $\Omega=\omega I$ (21.2); Rayleigh coefficients $a(m)$ and spectral bounds; **Rayleigh regression** (21.4)/(21.5); predicting projections $Av$ with $\Sigma_v$ (Fig 21.2 calibration); individual-element difficulty; hard upper bound vs estimated average (Fig 21.3); Gauss-Gamma conjugate-prior scale inference (Ch. 22.5, Eqs 22.7-22.11); conservative worst-case interpretation.

## Sources
- ProbabilisticNumerics — Part III "Linear Algebra" (Ch. 14-23, book pp. 123-193). Philipp Hennig, Michael A. Osborne, Hans P. Kersting, *Probabilistic Numerics: Computation as Machine Learning*, Cambridge University Press, 2022. Key algorithms 16.1 (CG), 17.1/17.2 (probabilistic skeleton), 18.1 (pCG); proofs in Ch. 22 (book pp. 183-192); software: ProbNum (probnum.org).

## See Also
- [[../Foundations/_Index|Foundations]] — Gaussian algebra, GP regression, hierarchical/empirical-Bayes inference, the numerical agent (prerequisites).
- [[../Integration/_Index|Integration]] — the same "solver as agent / classical method as posterior mean" recipe, where latent and observable are jointly Gaussian (contrast: inversion is nonlinear).
- [[../Optimisation/_Index|Optimisation]] — spd-Hessian estimation and second-order methods extend these results.
- [[../Differential Equations/_Index|Differential Equations]] — ODE solvers as inference, another instance of computation as probabilistic inference.
