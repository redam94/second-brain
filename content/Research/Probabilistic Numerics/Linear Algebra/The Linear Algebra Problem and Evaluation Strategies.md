---
title: The Linear Algebra Problem and Evaluation Strategies
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 14-17, pp. 125-141"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Linear Algebra"
doc_type: textbook
depends_on:
  - "[[Gaussian Distributions and Algebra]]"
  - "[[The Numerical Agent]]"
  - "[[Computation as Probabilistic Inference]]"
used_by:
  - "[[Classic Linear Solvers - A Review]]"
  - "[[Probabilistic Linear Solvers - Algorithmic Scaffold]]"
  - "[[Conjugate Gradients as Probabilistic Inference]]"
aliases:
  - The Linear Algebra Problem
  - Evaluation Strategies for Linear Solvers
  - Matrix-Vector Products as Observations
---

# The Linear Algebra Problem and Evaluation Strategies

> [!summary]
> The numerical task of Part III is to solve the symmetric positive-definite (spd) linear system $Ax=b$ — equivalently to invert $A$ or minimise a convex quadratic. A solver is a numerical agent whose only allowed observations are **matrix-vector products** $z = As$: it chooses which vectors (search directions) $s$ to multiply, and each product is one datum. This note sets up the problem, the "least-squares" optimisation view, the evaluation/action framework of iterative solvers, and the structural skeleton `LinSolve_Project` that all later probabilistic solvers refine.

## Overview

Linear algebra (solving systems, inverting and decomposing matrices) is the bedrock on which almost all heavyweight numerical computation is built. Part III makes a deliberate simplification: **computations are assumed exact** (arbitrary precision), so all questions of *numerical stability* are set aside. What remains is a pure question of **epistemic uncertainty**: given a computer that can form matrix-vector products, what is the most efficient way to extract information about the solution of a linear system?

The recurring thesis of the whole part: classical iterative solvers (in particular Conjugate Gradients) are the posterior-mean estimators of a Gaussian inference procedure — they *are* probabilistic numerical methods, and can be read as agents deciding which matrix-vector products to observe. This note builds the problem statement (Ch. 16) and the action–observation scaffold (Ch. 17) on which that reading rests.

A key warning from Ch. 14 (Key Points): despite the name "linear" algebra, **matrix inversion is a nonlinear operation**. Unlike integration — where the integral is a *linear* functional of the integrand, so latent and observable live in one joint Gaussian — here the latent quantity ($x=A^{-1}b$ or $H=A^{-1}$) is a nonlinear function of the observed matrix $A$. This forces a conscious modelling choice (model $A$, or model $H$/$x$) that structures the entire part.

## Main Content

### The problem

> [!definition] The spd linear problem ^def-problem
> Given a **symmetric positive-definite** matrix $A\in\mathbb{R}^{N\times N}$ (so $A=A^\top$ and $v^\top A v>0$ for all $v\neq 0$) and a right-hand side $b\in\mathbb{R}^N$, find $x\in\mathbb{R}^N$ solving
> $$
> Ax=b, \qquad A\ \text{spd},\ x,b\in\mathbb{R}^N. \tag{16.1}
> $$
> Because $A$ is spd it is invertible; its inverse is given a dedicated symbol
> $$
> A^{-1}=:H,
> $$
> ("$H$" is historic convention for inverse Hessians). Solving for general $b$ means finding $H$; solving for one specific $b$ means finding the single vector $x=Hb$.

Symbols: $N$ = dimension; $A$ = system matrix (spd); $b$ = right-hand side; $x$ = sought solution; $H=A^{-1}$ = matrix inverse.

> [!definition] Least-squares / quadratic form ^def-quadratic
> Equation (16.1) is equivalent to the unconstrained minimisation of the convex quadratic
> $$
> f(x)=\tfrac12 x^\top A x - x^\top b, \tag{16.2}
> $$
> whose unique minimiser is $x=A^{-1}b$. Its gradient is the **residual**
> $$
> r(x):=\nabla f(x)=Ax-b, \tag{16.3}
> $$
> and its Hessian is the constant matrix $\nabla\nabla^\top f(x)=A$. The problem is solved iff $r(x)=0$. The terms "residual" and "gradient" are used interchangeably.

This dual view (linear system $\equiv$ convex quadratic minimisation) is the bridge to Part IV: least-squares estimation underlies Gaussian process regression (§4.2), and estimating spd Hessians and their inverses reappears in nonlinear optimisation. Iterative linear solvers connect to eigen/singular-value decompositions through the **Krylov sequence**.

### Why iterative, anytime solvers?

The "pedestrian" solution is **Gaussian elimination** (LU decomposition, $\mathcal{O}(N^3)$), applicable to any solvable system, numerically stabilised by pivoting. But it is **not an "anytime" algorithm**: it only yields a correct answer on completion. Stopped at step $i<N$, its intermediate estimate error $\|\hat{x}_i-x\|$ can actually *grow*, converging only suddenly at step $N$ (Hestenes & Stiefel, 1952).

**Iterative** solvers (prototype: Conjugate Gradients) instead continuously improve an initial guess $\hat{x}_0$, with $\mathcal{O}(N^2)$ cost per step, so they can be stopped at $i\ll N$ and already provide a good estimate. This "improve a point estimate over the run" behaviour is exactly what a probabilistic solver needs — it is what lets us assign uncertainty to an *incompletely* solved problem.

> [!example] Conjugate Gradients (CG), basic form ^ex-cg-alg
> `CG(A(·), b, x₀)` (Algorithm 16.1). Initialise $r_0=Ax_0-b$, $d_0=0$, $\beta_0=0$. For $i=1,\dots,N$:
> 1. $d_i=-r_{i-1}+\beta_{i-1}d_{i-1}$ — compute direction
> 2. $z_i=Ad_i$ — **the one matrix-vector multiplication** (the expensive step)
> 3. $\alpha_i=-d_i^\top r_{i-1}/d_i^\top z_i$ — optimal step size
> 4. $s_i=\alpha_i d_i$ — rescale step
> 5. $y_i=\alpha_i z_i$ — rescale observation
> 6. $x_i=x_{i-1}+s_i$ — update estimate
> 7. $r_i=r_{i-1}+y_i$ — new gradient/residual
> 8. $\beta_i=r_i^\top r_i/r_{i-1}^\top r_{i-1}$ — conjugate correction
>
> The dominant cost is the single product $z_i=Ad_i$; every other line is $\mathcal{O}(N)$ or $\mathcal{O}(1)$. Two control parameters: $\alpha$ (how the observed projection updates $x_i$) and $\beta$ (which projection to take next). This split of "estimation" ($\alpha$, inference) from "action" ($\beta$, policy) is the agent structure reused from the integration chapter — see [[The Numerical Agent]].

### Evaluation strategies: matrix-vector products as observations

A probabilistic linear solver mimicking CG's *structure* proceeds by collecting observations of matrix-vector products $z_i=Ad_i$ for smartly chosen vectors $d_i$ (called **search directions** or **projections**). Collecting the $d_1,\dots,d_i$ as columns of $D_i$ and the $z_1,\dots,z_i$ as columns of $Z_i$, the whole observation set after $M$ steps is
$$
Z_i=AD_i,\qquad Z_i,D_i\in\mathbb{R}^{N\times M}.
$$
After each step the solver holds a posterior $p(A\mid D_i,Z_i)$, used both to form an estimate $x_i$ and to choose the next action $d_{i+1}$.

> [!definition] Consistency of the estimator ^def-consistency
> The minimal assumption on the (as-yet-abstract) inference scheme is that it is **consistent** with the observations: it puts zero measure on all matrices $\tilde A$ with $\tilde A D_i\neq Z_i$. Consequently, any reasonable point estimators $A_i$ (for $A$) and $H_i$ (for $H=A^{-1}$) must satisfy
> $$
> A_i D_i=Z_i\qquad\text{and}\qquad H_i Z_i=D_i.
> $$

The crucial policy question: **how should the solver choose the next action $d_{i+1}$?**

**Direct methods** choose $d_{i+1}$ a priori, independent of observations (e.g. random directions, or unit vectors $d_i=e_i$ giving sparse cheap projections $z_i=A_{:i}$ in linear time). Nyström approximation, inducing-point and spectral methods, and Gaussian/LU/Cholesky decompositions all fall here. Cost of $M$ steps is $\mathcal{O}(NM^2)$. Downside: they cannot adapt to the matrix's structure, so a badly calibrated prior gives a bad estimate.

**Iterative methods** (the focus) use collected directions to converge to the *exact* solution; each step costs $\mathcal{O}(N^2)$ (one generic matrix-vector product), so $M$ steps cost $\mathcal{O}(N^2 M)$.

### Building the iterative skeleton

For any estimate $\tilde x$, the update $\tilde x\leftarrow\tilde x-Hr(\tilde x)=\tilde x-H(A\tilde x-b)=Hb=x$ solves the problem *exactly* if $H$ is known. Since the solver only has an estimate $H_i$, this suggests the **estimation update rule**
$$
x_{i+1}:=x_i-H_i\,r(x_i), \tag{17.1}
$$
with inference on $H$ left abstract. The **action rule** chooses the next projection. A natural choice couples the two:
$$
d_{i+1}:=x_{i+1}-x_i=-H_i r(x_i),\qquad z_{i+1}=Ad_{i+1}. \tag{17.2}
$$
This lets the residual be updated in $\mathcal{O}(N)$ time without a second matrix-vector product:
$$
r(x_{i+1})=A(x_{i+1}-x_i)+r(x_i)=z_{i+1}+r(x_i).
$$
Intuition (Fig. 17.1): the residual is the gradient of $f$, i.e. the direction of maximal improvement — so following it (mapped through $H_i$) is sensible, provided $H_i$ does not destroy that property.

> [!definition] Optimal step size (symmetric $A$) ^def-alpha
> Parametrising $x_i=x_{i-1}+\alpha_i d_i$, the derivative of $f$ in $\alpha_i$ is $\alpha_i d_i^\top A d_i + d_i^\top r_{i-1}$, which vanishes at
> $$
> \alpha_i=-\frac{d_i^\top A d_i}{d_i^\top r_{i-1}}=-\frac{d_i^\top r_{i-1}}{d_i^\top z_i}. \tag{17.3}
> $$
> At this $\alpha_i$ the new gradient is orthogonal to $d_i$: $d_i^\top\nabla f(x_{i-1}+\alpha_i d_i)=0$. This costs one extra $\mathcal{O}(N)$ division using the already-computed $z_i=Ad_i$.

> [!example] `LinSolve_Project` — the structural skeleton (Algorithm 17.2) ^ex-scaffold
> `LinSolve_Project(A(·), b, p(A))`: initialise $x_0=H_0 b$, $r_0=Ax_0-b$. For $i=1,\dots,N$:
> 1. $d_i=-H_{i-1}r_{i-1}$ — direction
> 2. $z_i=Ad_i$ — **observe**
> 3. $\alpha_i=-d_i^\top r_{i-1}/d_i^\top z_i$ — optimal step
> 4. $s_i=\alpha_i d_i$; 5. $y_i=\alpha_i z_i$; 6. $x_i=x_{i-1}+s_i$; 7. $r_i=r_{i-1}+y_i$
> 8. $H_i=\textsc{Infer}(H\mid Y_i,S_i,p(A))$ — estimate the inverse (placeholder)
>
> This differs from CG (Algorithm 16.1) only in lines 5 and 12 — the inference step is left abstract. It is the skeleton for the rest of Part III: §19 fills in the `Infer` step with concrete Gaussian rules; §18 shows which choices reproduce classic solvers.

## Examples

> [!example] Residual bookkeeping trick
> Because $r(x_{i+1})=z_{i+1}+r(x_i)$, an iterative solver needs only **one** matrix-vector product per step (to compute $z_{i+1}=Ad_{i+1}$) yet obtains both the new estimate and its exact residual. This is the "smart book-keeping" that makes linear algebra cheap: the observation $z$ simultaneously drives the estimate update, the step-size, and the next residual.

> [!example] Why calibration is hard here (Ch. 14 key point)
> A matrix is a *big* object: an $N\times N$ matrix has $N^2$ degrees of freedom. After $M$ linearly-many matrix-vector projections, the solver identifies only $\sim M\cdot N$ of them, learning nothing about the other $N(N-1)$ directions of the matrix. So while the *point estimate* converges quickly, honest *uncertainty* over the unexplored remainder is intricate — the subject of [[Uncertainty Calibration for Linear Solvers]].

## Connections

- Design trade-off (Ch. 14 wider point): a good computational prior balances constraints from *knowledge* (e.g. that $A$ is spd) against constraints from *computation*. Even known-true facts (like positive-definiteness) may be counter-productive to encode if doing so makes inference much more complex.
- The action/observation split mirrors [[The Numerical Agent]] and the active integration policies of [[Active Bayesian Quadrature and Bayesian Monte Carlo]].
- The optimisation reading of (16.2)–(16.3) directly connects to [[The Local Optimisation Problem]] and second-order methods.

## See Also
- [[Classic Linear Solvers - A Review]] — casts `LinSolve_Project` as projection / conjugate-direction / Krylov methods.
- [[Probabilistic Linear Solvers - Algorithmic Scaffold]] — fills the abstract `Infer` step with Gaussian inference over $A$/$H$/$x$.
- [[Conjugate Gradients as Probabilistic Inference]] — the equivalence theorem for the skeleton above.
- [[Gaussian Distributions and Algebra]] — the conditioning machinery used for `Infer`.
- [[The Numerical Agent]] — estimation-vs-action decomposition reused here.
- [[The Integration Problem]] — contrast: there latent and observable are jointly Gaussian; here inversion is nonlinear.
