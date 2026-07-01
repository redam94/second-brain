---
title: Computational Constraints on Probabilistic Solvers
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 20, pp. 169-173"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Linear Algebra"
doc_type: textbook
depends_on:
  - "[[Probabilistic Linear Solvers - Algorithmic Scaffold]]"
  - "[[Conjugate Gradients as Probabilistic Inference]]"
  - "[[Gaussian Priors over Matrices and the Symmetric Kronecker Product]]"
used_by:
  - "[[Uncertainty Calibration for Linear Solvers]]"
aliases:
  - Computational Constraints
  - Algorithms for Inference vs Inference for Algorithms
  - Inferring the Solution x
  - Solution-based Inference
---

# Computational Constraints on Probabilistic Solvers

> [!summary]
> A probabilistic linear solver is only useful if it costs essentially the same as CG. This note shows how: run CG, treat its collected action–output pairs $(s_i,y_i=As_i)$ as *data*, and combine them with a structured Gaussian prior so the posterior mean is $A_0$ plus a low-rank term (cheap to store and apply) and CG's convergence properties transfer to the Gaussian posterior. It records the computationally-favoured prior choices ($A_0=0$, $W_0 S=Y$, giving a diagonal Gram matrix and $\mathcal{O}(N)$-tridiagonal factorisation), the empirical-Bayes tension ($W_0=A_M$ kills the variance), and the cheaper **solution-based** view (a prior on $x$/$H$ directly), which infers only the $b$ numbers $Y^\top x=S^\top b$.

## Overview

Ch. 20 draws a practical corollary of the equivalence results: rather than building a bespoke "algorithm for inference", one can wrap a probabilistic interpretation *around* an existing, highly optimised solver — "inference interpretation of an algorithm". Since CG *is* the posterior mean of a Gaussian model (see [[Conjugate Gradients as Probabilistic Inference]]), the data $S,Y\in\mathbb{R}^{N\times M}$ it produces by running on $A,b$ can be fed to a structured Gaussian prior to obtain posteriors on $A$ and $H$ with convenient low-rank structure.

Two desiderata then arise:
- **Computational efficiency:** the posterior should have low storage/evaluation cost, reusing CG's known properties (orthogonal gradients, conjugate directions).
- **Uncertainty calibration:** the posterior covariance should be analytically linked to the estimation error (the topic of [[Uncertainty Calibration for Linear Solvers]]).

## Main Content

### CG's convergence transfers to the posterior mean

> [!definition] CG convergence and the low-rank mean ^def-convergence
> CG after $k+1$ steps finds the estimate $x_{k+1}=P_k^*(A)r_0$ where $P_k^*$ is the degree-$k$ polynomial minimising $\|x_0+P_k(A)r_0-x\|_A$, $\|v\|_A^2:=v^\top Av$ (20.1). If $A$ has eigenvalues $\lambda_1\le\dots\le\lambda_N$, the $A$-norm error after $M+1$ steps is roughly
> $$\frac{\|x_{M+1}-x\|_A}{\|x_0-x^*\|_A}\approx\Big(\frac{\lambda_{N-M}-\lambda_1}{\lambda_{N-M}+\lambda_1}\Big). \tag{20.2}$$
> If $A$ has $K\ll N$ large eigenvalues and $N-K$ small ones, CG finds a good estimate in only $K$ steps. Since estimates lie in the Krylov span of $S_M$, the **low-rank term in the posterior mean $A_M$ approximately covers the dominant eigenvalues of $A$** — the good convergence of CG becomes good convergence of the Gaussian posterior.

### The computationally-favoured prior

Inference on $A$ with symmetry-encoding prior $p(A)=\mathcal{N}(A;A_0,W_0\otimes_{\!\ominus}W_0)$. Both efficiency and calibration point to:
$$A_0=0,\qquad W_0\ \text{such that}\ W_0 S=Y.$$

> [!definition] Diagonal Gram matrix under CG directions ^def-diag-gram
> With CG-produced (conjugate) directions, the Gram matrix $S^\top W_0 S=S^\top Y=S^\top AS$ is **diagonal** (conjugacy makes $s_m^\top A s_{m'}=0$ for $m\neq m'$). Setting $A_0=0$ makes all $S^\top A_0 S$ terms vanish, and the posterior mean (19.21) reduces to a bare outer product:
> $$A_M=Y(S^\top Y)^{-1}Y^\top=\sum_{m=1}^M\frac{y_m y_m^\top}{s_m^\top y_m}=\tilde Y\tilde Y^\top,\qquad \tilde Y:=Y(S^\top Y)^{-1/2}. \tag{20.3}$$
> Since $S^\top Y=S^\top AS$ has strictly positive diagonal (spd $A$), its square root is just $\sqrt{s_m^\top y_m}>0$. Storage is a single $N\times M$ matrix $\tilde Y$.

For **scalar** $A_0=\alpha_0 I$, the matrix $Y^\top Y$ is symmetric **tridiagonal** (since $y_i=As_i=r_i-r_{i-1}$), and spd — so the required $M\times M$ inverse is solvable in $\mathcal{O}(M)$ time by a positive-definite tridiagonal solver (LAPACK `xPTSV`, ~$8M$ flops). Tridiagonal problems are "essentially trivial".

### Calibration and the empirical-Bayes tension

> [!definition] The hypothetical $W_0=A$ and its perfect calibration ^def-perfect-calib
> The (inaccessible) choice $W_0=A$ is also favourable for calibration: the prior $p(A)=\mathcal{N}(A;0,A\otimes_{\!\ominus}A)$ assigns element-wise variance $\mathrm{var}([A]_{ij})=\tfrac12([W_0]_{ii}[W_0]_{jj}+[W_0]_{ij}^2)$ (20.4). For **diagonal** elements this gives *perfect calibration* — the expected square error equals the true square error:
> $$\frac{([A]_{ii}-\mathbb{E}[A]_{ii})^2}{\mathbb{E}\big(([A]_{ii}-\mathbb{E}[A]_{ii})^2\big)}=1. \tag{20.5}$$
> For **off-diagonal** elements the variance is an *upper* error bound (ratio $<1$), since spd implies $|[A]_{ij}|\le\sqrt{[A]_{ii}[A]_{jj}}$ (20.6). So symmetric-Kronecker structure forces a trade-off: perfect on the diagonal, under-confident (conservative) off it.

But $W_0=A$ is unusable ($A$ is the very unknown). The empirical-Bayes substitute $W_0=A_M$ ensures $WS=Y$ but makes the posterior variance **vanish**:
$$W_M=W_0-W_0 S(S^\top W_0 S)^{-1}S^\top W_0=\tilde Y\tilde Y^\top-\tilde Y\tilde Y^\top=0.$$
So a smarter estimate of $W_0$ — consistent with the chosen mean $A_M$ but giving non-zero variance — is required; that is Ch. 21.

> [!note] Pseudoinverse for the $A_0=0$ estimator
> With $A_0=0$, $A_M=\tilde Y\tilde Y^\top$ is rank-deficient, so the matrix inversion lemma cannot form $A_M^{-1}$. The **Moore–Penrose pseudoinverse** works instead: $A_M^+=\tilde Y(\tilde Y^\top\tilde Y)^{-2}\tilde Y^\top$, and $\tilde Y^\top\tilde Y$ is tridiagonal spd, invertible in $8M$ operations. $A_M^+$ is also the small-$\alpha$ limit of $A_M^{-1}$ arising from $A_0=\alpha I$.

### Inferring the solution x directly (solution-based inference)

If only *one* $b$ matters, threading through the full matrix inverse is wasteful. Because $x=Hb$ is a linear map of $H$, any Gaussian prior on $H$ induces a Gaussian prior on $x$:

> [!definition] Solution-based Gaussian model ^def-solution-based
> $p(H)=\mathcal{N}(H;H_0,\Sigma)$ with $\Sigma\in\mathbb{R}^{N^2\times N^2}$ induces
> $$p(x=Hb)=\mathcal{N}\big(x;H_0 b,\ (I\otimes b)^\top\Sigma(I\otimes b)\big)=:\mathcal{N}(x;x_0,\Xi_0),\quad\Xi_0\in\mathbb{R}^{N\times N}.$$
> The noise-free observations $AS=Y$ read, in the solution view, as linear projections of $x$:
> $$Y^\top x=S^\top b. \tag{20.7}$$
> This is a statement about only the **$b$ numbers** in $Y^\top H b=S^\top b\in\mathbb{R}^M$, not the $N\times M$ numbers in $S$ — so inference on $x$ is *more limited but less expensive* than inference on $H$ plus a projection. The direct posterior is
> $$p(x\mid Y^\top x=S^\top b)=\mathcal{N}(x;x_M,\Xi_M),\ \ x_M=x_0+\Xi_0 Y(Y^\top\Xi_0 Y)^{-1}(S^\top b-Y^\top x_0),\ \ \Xi_M=\Xi_0-\Xi_0 Y(Y^\top\Xi_0 Y)^{-1}Y^\top\Xi_0. \tag{20.8, 20.9}$$

Worked induced priors: a symmetric-Kronecker prior $p(H)=\mathcal{N}(H;H_0,W_0\otimes_{\!\ominus}W_0)$ induces $\Xi_0=\tfrac12(\beta W_0+\tilde b\tilde b^\top)$ with $\tilde b:=W_0 b$, $\beta:=b^\top W_0 b$; the matrix inversion lemma yields a manageable $x_M$ (20.10), computable by tracking the $M$-vector $b^\top W_0 Y$ and the $M\times M$ matrix $Y^\top W_0 Y$ (tridiagonal spd when $Y$ comes from CG and $W_0=\omega I$). This solution-based view — inference on $x$ as a limited but cheap alternative to matrix-based inference — is the setting of Cockayne et al. (2019a) / Bartels et al. (2019).

## Examples

> [!example] "Algorithms for inference" vs "inference interpretations of algorithms"
> Two stances: (1) design a probabilistic algorithm from scratch whose prior is consistent with the actions; (2) run vanilla CG, then *interpret* its output $(s_i,y_i)$ as data under a convenient Gaussian prior. The practical stance (2) no longer cares whether the prior is consistent with CG's actions — it just wants a cheap, well-calibrated posterior mean ($A_0$ + low rank) and covariance. Cost stays at CG's $\mathcal{O}(N^2 M)$.

> [!example] Cost accounting for the tridiagonal factorisation
> Running CG with $W_0=\omega I$ makes $Y^\top Y$ tridiagonal spd. The needed $M\times M$ inverse is then $\mathcal{O}(M)$ (LAPACK `xPTSV`), not $\mathcal{O}(M^3)$. So the full probabilistic wrap adds no order-of-magnitude overhead to CG.

## Connections
- Resolves the "means only need accessible $W Y$" observation from [[Conjugate Gradients as Probabilistic Inference]] into concrete cheap algorithms.
- The failure $W_0=A_M\Rightarrow W_M=0$ motivates the projection-complement covariance of [[Uncertainty Calibration for Linear Solvers]].
- Solution-based inference on $x$ is the linear-algebra analogue of only tracking the quantity of interest, cf. [[Bayesian Quadrature]] tracking only the integral.

## See Also
- [[Uncertainty Calibration for Linear Solvers]] — how to pick $W_0$ so variance is non-zero yet consistent with $A_M$.
- [[Conjugate Gradients as Probabilistic Inference]] — establishes that CG's output is legitimate posterior-mean data.
- [[Probabilistic Linear Solvers - Algorithmic Scaffold]] — the posterior formulas (19.10/19.11/19.21) specialised here.
- [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]] — the Kronecker/pseudoinverse machinery used.
