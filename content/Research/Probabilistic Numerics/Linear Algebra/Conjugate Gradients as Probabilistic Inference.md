---
title: Conjugate Gradients as Probabilistic Inference
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 18-19, 22, pp. 143-167, 183-192"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Linear Algebra"
doc_type: textbook
depends_on:
  - "[[Classic Linear Solvers - A Review]]"
  - "[[Probabilistic Linear Solvers - Algorithmic Scaffold]]"
  - "[[The Linear Algebra Problem and Evaluation Strategies]]"
used_by:
  - "[[Computational Constraints on Probabilistic Solvers]]"
  - "[[Uncertainty Calibration for Linear Solvers]]"
aliases:
  - CG as Inference
  - BayesCG
  - Probabilistic Conjugate Gradients
  - Theorem 19.16
---

# Conjugate Gradients as Probabilistic Inference

> [!summary]
> This note states and proves the central equivalence of Part III: the iterates of **Conjugate Gradients are the posterior means of a specific Gaussian probabilistic linear solver**. Formally, for scalar-mean symmetric-Kronecker Gaussian priors on $H$ (or $A$) with covariance parameter $W=\beta I+\gamma H$ (Theorem 19.16), the abstract solver Algorithm 17.2 produces exactly the CG sequence $\{x_i\}$. The result rests on three pillars: symmetric estimator ⇒ conjugate directions (Thm 18.2), conjugate + Krylov ⇒ CG (Thm 18.4 / Cor 18.5), and Gaussian consistency. Full proof sketches from Ch. 22 are reproduced.

## Overview

CG (Algorithm 16.1) is an efficient, purely deterministic algorithm. The claim is that it is *also* a probabilistic numerical method: there is a Gaussian prior such that running Bayesian inference over the matrix (or its inverse), collecting matrix-vector products along conjugate directions, yields posterior means identical to CG's iterates. This makes CG "a probabilistic agent choosing which matrix-vector products to observe" — the recurring thesis, now a theorem.

The logical chain (see [[Classic Linear Solvers - A Review]] for the classical half, [[Probabilistic Linear Solvers - Algorithmic Scaffold]] for the Gaussian half):

$$
\text{symmetric }H_i \xRightarrow{\text{Thm 18.2}} \text{conjugate directions} \xRightarrow[\text{+ Krylov (18.3)}]{\text{Thm 18.4}} \text{CG (Cor 18.5, 19.16)}.
$$

## Main Content

### The classical characterisation of CG

CG is the conjugate-direction method that is also a Krylov subspace method.

> [!theorem] Theorem 18.4 (conditions making the skeleton = CG directions) ^thm-184
> If $A$ is spd, $H_i$ is symmetric for all $i\ge0$, the Krylov assumption (18.3) holds, and Algorithm 17.2 has not terminated before step $k<N$, then residuals are mutually orthogonal ($r_i\perp r_j$, $0\le i\neq j\le k$) and there exist $\gamma_i\in\mathbb{R}\setminus0$ with
> $$
> d_i=-H_{i-1}r_{i-1}=\gamma_i\Big(-r_{i-1}+\tfrac{\beta_i}{\gamma_{i-1}}d_{i-1}\Big),\qquad \beta_i=\frac{r_{i-1}^\top r_{i-1}}{r_{i-2}^\top r_{i-2}}. \tag{18.5}
> $$
> Hence $d_i^{\mathrm{CG}}=\gamma_i d_i^{\text{Prob}}$: identical up to a scalar.

> [!theorem] Corollary 18.5 ^thm-185
> Under Theorem 18.4's assumptions, Algorithm 17.2 produces the **exact same** estimate sequence $\{x_0,x_1,\dots,x_N\}$ as CG initialised at $x_0=H_0 b$. The scaling $\gamma_i$ is absorbed by the step size $\alpha_i$, so estimates coincide.

### The probabilistic version

> [!theorem] Theorem 19.16 (Probabilistic Conjugate Gradients) ^thm-1916
> Consider a prior $p(H)=\mathcal{N}(H;H_0,W_H\otimes_{\!\ominus}W_H)$. For **all** parameter choices $(H_0,W_H)$ with scalar $H_0=\alpha I$ and $W_H=\beta I+\gamma H$ (for $\alpha\in\mathbb{R}$, $\beta,\gamma\in\mathbb{R}_+$), Algorithm 17.2 is equivalent to the method of conjugate gradients — it produces the exact same sequence of estimates $x_i$. The same is true for the model class $p(A)=\mathcal{N}(A;A_0,W_A\otimes_{\!\ominus}W_A)$ with scalar $A_0=\alpha I$ and $W_A=\beta I+\gamma A$.
>
> Symbols: $\alpha$ = scalar prior mean level; $\beta,\gamma$ = covariance-parameter scalars; $\otimes_{\!\ominus}$ = symmetric Kronecker product; $W_H$ formally includes the inaccessible true $H$ (and $W_A$ the true $A$).

> [!note] Why the inaccessible $A$/$H$ can appear
> The posterior *means* contain $W_H$ only through $W_H Y=(\beta I+\gamma H)Y=\beta Y+\gamma S$ (using $HY=S$), and $W_A S=\beta S+\gamma Y$ (using $AS=Y$). These are computable at runtime, so the mean/iterate is well-defined even though the "prior covariance" references the unknown matrix. Only the *covariance* genuinely needs $W$, which is why error bars require the empirical-Bayes calibration of [[Uncertainty Calibration for Linear Solvers]].

**Proof (of Theorem 19.16).** By Theorem 19.15 (symmetric Kronecker covariance ⇒ conjugate directions), the constructed algorithm is a conjugate-direction method. For Theorem 18.4 to apply we must verify the Krylov assumption (18.3): that the estimator $H_i$ maps the gradient $r_{i-1}$ into $s_i=-H_{i-1}r_{i-1}\in\mathrm{span}\{S_{:i-1},Y_{:i-1},r_{i-1}\}$.

Inspecting the posterior-mean image of $H_i$ (right column of Table 19.1), $H_{i-1}$ maps any $v$ into $\mathrm{span}\{H_0 v,S_{:i-1},H_0 Y_{:i-1},W_H S_{:i-1}\}$. For scalar $H_0=\alpha I$ and $W_H=\beta I+\gamma H$ (so $W_H Y=\beta Y+\gamma S$, using $HY=S$), $r_{i-1}$ is mapped into $\mathrm{span}\{r_{i-1},S_{:i-1},Y_{:i-1}\}$ — exactly (18.3). For the $A$-model, $H_{i-1}=A_0^{-1}\cdots$ maps $r_{i-1}$ into $\mathrm{span}\{A_0^{-1}r_{i-1},A_0^{-1}W_A S_{:i-1},A_0^{-1}Y_{:i-1},S_{:i-1}\}$; for scalar $A_0$, $W_A=\beta I+\gamma A$ and $AS=Y$ this is $\mathrm{span}\{r_{i-1},Y_{:i-1},S_{:i-1}\}$. Either way (18.3) holds, so Theorem 18.4 and Corollary 18.5 give equivalence to CG. $\square$

### Proof sketches from Chapter 22

> [!theorem] Proof of Theorem 18.2 (symmetric $H_i$ ⇒ conjugate directions) ^proof-182
> By induction. **Base ($i=2$):** with $\alpha_1=-d_1^\top r_0/d_1^\top Ad_1$, using symmetry of $H_1$ in the third-to-last equality,
> $$
> d_1^\top A d_2=-d_1^\top A(H_1 r_1)=-d_1^\top A(H_1(y_1+r_0))=-\alpha_1 d_1^\top Ad_1-d_1^\top AH_1 r_0=d_1^\top r_0-d_1^\top r_0=0.
> $$
> **Inductive step:** assume $\{d_0,\dots,d_{i-1}\}$ pairwise $A$-conjugate. For $k<i$, applying the assumption *twice*,
> $$
> d_k^\top Ad_i=-d_k^\top A H_i r_i=-d_k^\top A H_i\Big(\textstyle\sum_{j\le i}y_j+r_0\Big)=-d_k^\top A\Big(\sum_{j\le i}s_j+H_i r_0\Big)
> $$
> $$
> =-\alpha_k d_k^\top Ad_k-d_k^\top A(H_i r_0)=d_k^\top r_{k-1}-d_k^\top r_0=d_k^\top\Big(\sum_{j<k}y_j+r_0\Big)-d_k^\top r_0=0.\ \square
> $$

> [!theorem] Proof of Theorem 18.4 (structure ⇒ CG) ^proof-184
> Because $H_i$ symmetric, Thm 18.2 gives conjugacy, so $r_i^\top s_{j<i}=0$ and $s_i^\top A s_{j<i}=s_i^\top y_{j<i}=0$; non-termination gives $r_j\neq0$. Induction:
> - **$i=1$:** $S_0,Y_0$ empty, so $d_1\propto r_0$, i.e. $d_1=-\gamma r_0$; this yields $\alpha_0=r_0^\top r_0/r_0^\top Ar_0$, $x_1=x_0-\alpha_0 r_0$, $r_1=r_0-\alpha_0 Ar_0$, so $r_1\perp r_0$.
> - Compute $d_2=\delta_0 r_0+\delta_1 Ar_0$; imposing $A$-conjugacy $d_2^\top Ar_0=0$ fixes $\delta_1=-(r_0^\top Ar_0/r_0^\top AAr_0)\delta_0$, and algebra using $r_1^\top r_1=r_0^\top r_0(\dots)$ yields the required form $d_2=\gamma_0(-r_1+\tfrac{\beta_2}{\gamma_1}d_1)$.
> - **General step:** assume $r_k\perp r_j$ ($k\neq j<i-1$) and $d_j=\gamma_j(-r_{j-1}+\beta_j d_{j-1})$ for $j<i$. Write $d_i=\sum_{j<i}\nu_j s_j+\nu_i r_{i-1}$ (22.3). Conjugacy $s_\ell^\top Ad_i=0$ with the induction hypothesis $y_\ell^\top r_{i-1}=0$ for $\ell<i-1$ forces $\nu_\ell=0$ for $\ell<i-1$; one remaining degree of freedom (conjugacy to $s_{i-1}$) gives $\nu_{i-1}\alpha_{i-1}=-\nu_i\beta_i/\gamma_{i-1}$, hence $d_i=\gamma_i(-r_{i-1}+\tfrac{\beta_i}{\gamma_{i-1}}d_{i-1})$ (22.4). Finally, using the recursion to rewrite past gradients as combinations of search directions and the updated-gradient identity $r_i=\alpha_i Ad_i+r_{i-1}$, one shows $r_j\perp r_i$ for all $j<i$, closing the induction. $\square$

> [!theorem] Proof of Lemma 18.3 (Krylov equivalence) ^proof-183
> Since $s_i=\alpha_i d_i$, $y_i=As_i$, $r_{i-1}=r_0+\sum_{j<i}y_j$, Eq. (18.3) shortens to $s_i\in\mathrm{span}\{r_0,s_1,\dots,s_{i-1},As_1,\dots,As_{i-1}\}$ (22.1). A trivial induction ($i=1$: $s_1\propto r_0$; assume $s_{i-j}\in\mathrm{span}\{r_0,Ar_0,\dots,A^{i-2}r_0\}$) yields $s_i\in\mathrm{span}\{r_0,Ar_0,\dots,A^{i-1}r_0\}$ (18.4), the Krylov property. Equivalent spans: $\mathrm{span}\{r_0,r_1,\dots,r_{i-1}\}=\mathrm{span}\{s_0,\dots,s_{i-1},r_{i-1}\}=\mathrm{span}\{r_0,y_1,\dots,y_{i-1}\}$. $\square$

> [!theorem] Proof sketch of Theorem 19.10 (hereditary pos-def via inflated prior) ^proof-1910
> For scalar $W_0$, $W_i=\beta(I-S(S^\top S)^{-1}S^\top)$ so $\beta$ cancels in the pos-def condition (19.27), and $W_i s_i$ is the projection of $s_i$ onto the complement of $\mathrm{span}(S)$. Inductively assuming $A_i$ pos-def, the subtracted term in (19.27) is strictly positive, so the RHS is below $y_i^\top A_i^{-1}y_i$; the LHS $y_i^\top s_i=s_i^\top A s_i>0$. Using $A_i^{-1}$ from (19.24), conjugacy gives $y_i^\top S=0$, $y_i^\top A_i^{-1}U=0$, $y_i^\top A_0^{-1}V=\tfrac1\alpha y_i^\top Y$, reducing to $y_i^\top A_i^{-1}y_i=\tfrac1\alpha y_i^\top y_i-\tfrac1{\alpha^2}y_i^\top YMY^\top y_i$ with $M\to-(Y^\top S)^{-1}$ as $\alpha\to\infty$, so $y_i^\top A_i^{-1}y_i\to0$. Thus for large enough $\alpha$ the inequality holds and $A_{i+1}$ is pos-def. Informally, since $y_i\le\lambda_{\max}\|s_i\|$, choose $\alpha\gg\lambda_{\max}$. $\square$

## Examples

> [!example] BayesCG in one line
> Take $p(A)=\mathcal{N}(A;\alpha I,\beta^2 I\otimes_{\!\ominus}I)$ (scalar mean, scalar symmetric-Kronecker covariance). Running Algorithm 17.2 with this prior reproduces CG's $x_i$ exactly, while additionally maintaining a Gaussian posterior over $A$ (or $x$). Setting the prior mean scalar $\alpha$ large enough (Thm 19.10) even keeps every posterior-mean estimate spd. This is the model that in Ch. 21 is chosen for its cheap, positive-semi-definite, fast-converging mean and then equipped with a calibrated covariance.

> [!example] Two "natural" derivations of CG
> CG can be derived from a prior on $A$ *or* on its inverse $H$ (Theorem 19.16 covers both), and — by posterior correspondence (Def. 19.11) — the two resulting uncertainties can be made closely related, though not identical. This is the Part III echo of "one algorithm, several probabilistic readings".

## Connections
- Depends entirely on [[Classic Linear Solvers - A Review]] (Thms 18.2/18.4, Cor 18.5) and [[Probabilistic Linear Solvers - Algorithmic Scaffold]] (Gaussian models, Thm 19.15).
- The scalar prior $p(A)=\mathcal{N}(\alpha I,\beta^2 I\otimes_{\!\ominus}I)$ is the starting point of [[Uncertainty Calibration for Linear Solvers]] and the conjugate-prior treatment in Ch. 22.5.
- The "means need only accessible $W Y$/$W S$" trick feeds directly into [[Computational Constraints on Probabilistic Solvers]].

## See Also
- [[Classic Linear Solvers - A Review]] — the classical theorems this note completes with proofs.
- [[Probabilistic Linear Solvers - Algorithmic Scaffold]] — the Gaussian models and Theorem 19.15/19.16 context.
- [[Uncertainty Calibration for Linear Solvers]] — supplies the covariance the equivalence leaves free.
- [[The Linear Algebra Problem and Evaluation Strategies]] — Algorithm 17.2 and CG Algorithm 16.1.
