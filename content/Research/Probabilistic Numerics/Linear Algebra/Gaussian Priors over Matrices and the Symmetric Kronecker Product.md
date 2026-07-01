---
title: Gaussian Priors over Matrices and the Symmetric Kronecker Product
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/definition
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 15, 19, pp. 127-130, 149-161"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Linear Algebra"
doc_type: textbook
depends_on:
  - "[[Gaussian Distributions and Algebra]]"
  - "[[The Linear Algebra Problem and Evaluation Strategies]]"
used_by:
  - "[[Probabilistic Linear Solvers - Algorithmic Scaffold]]"
  - "[[Computational Constraints on Probabilistic Solvers]]"
aliases:
  - Matrix-Variate Gaussian
  - Kronecker Covariance
  - Symmetric Kronecker Product
  - Vectorised Matrices
---

# Gaussian Priors over Matrices and the Symmetric Kronecker Product

> [!summary]
> To build a concrete probabilistic linear solver we need tractable probability distributions over *matrices*. This note collects the required machinery: vectorisation and the Kronecker product (Ch. 15), the matrix-variate Gaussian, the **Kronecker-structured covariance** $\Sigma_0=V_0\otimes W_0$ that reduces inference cost from $\mathcal{O}(M^3)$-plus to $\mathcal{O}(NM^2)$, and the **symmetric Kronecker product** $W\otimes_{\!\ominus}W$ used to encode matrix symmetry as a linear constraint. These objects are the building blocks of the update equations in [[Probabilistic Linear Solvers - Algorithmic Scaffold]].

## Overview

A matrix $A\in\mathbb{R}^{N\times M}$ is treated here not as an algebraic operator but as a *table of $NM$ numbers*. The Gaussian family over vectors is transplanted onto matrices via vectorisation. The challenge is that a fully general covariance over $NM$ elements is $NM\times NM$ — larger than the matrix we are trying to invert — so structural restrictions are mandatory. Kronecker structure supplies the needed tractability without giving up support over all matrices.

## Main Content

### Vectorisation and the Kronecker product

> [!definition] Vectorisation ^def-vec
> For $A\in\mathbb{R}^{N\times M}$, $\vec{A}\in\mathbb{R}^{NM}$ stacks the elements **row after row** ("row-major"), indexed by the same double index $(ij)$ as the matrix. The inverse operation is written $A=\natural\,\vec{A}$.

> [!definition] Kronecker product ^def-kron
> For $A\in\mathbb{R}^{N_A\times M_A}$, $B\in\mathbb{R}^{N_B\times M_B}$, the Kronecker product $A\otimes B$ has size $N_A N_B\times M_A M_B$ with elements $[A\otimes B]_{ij,k\ell}=[A]_{ik}[B]_{j\ell}$ (15.2). It "translates" between matrix multiplication and vectorisation:
> $$
> [(A\otimes B)\vec{C}]_{ij}=\textstyle\sum_{k\ell}[A]_{ik}[C]_{k\ell}[B]_{j\ell}=[\overline{ACB^\top}]_{ij}. \tag{15.3}
> $$
> Key identities (all assuming the inverses/decompositions exist):
> $$
> (A\otimes B)(C\otimes D)=AC\otimes BD, \tag{15.4}
> $$
> $$
> (A\otimes B)^{-1}=A^{-1}\otimes B^{-1},\qquad (A\otimes B)^\top=A^\top\otimes B^\top. \tag{15.5, 15.7}
> $$

### The matrix-variate Gaussian

> [!definition] Gaussian over matrix elements ^def-matrix-gaussian
> For $X\in\mathbb{R}^{N\times K}$, define
> $$
> \mathcal{N}(X;X_0,\Sigma_0):=\frac{\exp\!\big(-\tfrac12(\vec{X}-\vec{X_0})^\top\Sigma_0^{-1}(\vec{X}-\vec{X_0})\big)}{(2\pi)^{NK/2}|\Sigma_0|^{1/2}}, \tag{19.3}
> $$
> where $\vec{X_0}\in\mathbb{R}^{NK}$ is a vectorised mean matrix and $\Sigma_0\in\mathbb{R}^{NK\times NK}$ is a symmetric positive-(semi)definite covariance. If $\Sigma_0$ is full rank (spd), this assigns non-zero density to *every* matrix — symmetric and asymmetric, definite and indefinite, invertible and non-invertible. (The arrow over the matrix argument is suppressed in shorthand.)

The **Wishart** distribution $\mathcal{W}(X;V,\nu)\propto|X|^{(\nu-N-1)/2}e^{-\frac12\mathrm{tr}(V^{-1}X)}$ might seem natural (it lives on spd matrices, $X=\sum_i w_i w_i^\top$ with $w_i\sim\mathcal{N}(0,V)$), but the posterior from conditioning on linear projections $Y=AS$ is not Wishart and has no compact form. Gaussians are used instead because linear projections keep them Gaussian.

### Kronecker covariance for efficiency

A diagonal $\Sigma_0$ (independent elements) makes the Gram matrix cost $\mathcal{O}(NM^2)$ but its inverse costs more than $M^3$ — still too much. The fix is a Kronecker product covariance:

> [!definition] Kronecker covariance ^def-kron-cov
> $$
> \Sigma_0=V_0\otimes W_0,\qquad V_0,W_0\in\mathbb{R}^{N\times N}\ \text{spd}. \tag{19.8}
> $$
> Since a Kronecker product of two spd matrices is spd, this is a valid spd covariance assigning non-vanishing density to every matrix, while offering only $2\cdot\tfrac12 N(N+1)=N(N+1)$ degrees of freedom (versus $\tfrac12 N^2(N^2+1)$ for a general $\Sigma_0$). Element covariances factorise:
> $$
> \mathrm{cov}(A_{ij},A_{k\ell})=[V_0\otimes W_0]_{ij,k\ell}=[V_0]_{ik}[W_0]_{j\ell}, \tag{19.9}
> $$
> and marginal variances depend only on the diagonals: $\mathrm{var}(A_{ij})=[V_0]_{ii}[W_0]_{jj}$.

**Caution (Fig. 19.2):** it is tempting but *not entirely correct* to read $V_0$ as "covariance among rows" and $W_0$ "among columns". A matrix $\tilde A=B\odot C+A_0$ built from column-vectors $b_i\sim\mathcal{N}(0,V_0)$ and row-vectors $c_j\sim\mathcal{N}(0,W_0)$ satisfies (19.9) but is *not* Gaussian. The Kronecker restriction limits complexity, not the *support* — the measure still covers all matrices.

### The symmetric Kronecker product (encoding symmetry)

Symmetry $A_{ij}-A_{ji}=0$ is a **linear** constraint, and Gaussians are closed under linear constraints (positive-definiteness, being a cone, is not — see [[Probabilistic Linear Solvers - Algorithmic Scaffold#^cone]]). Two orthogonal projection operators on $\mathbb{R}^{N^2}$ (space of vectorised $N\times N$ matrices) formalise this:

> [!definition] Symmetric / anti-symmetric projections ^def-proj
> $$
> [\Pi_\ominus]_{(ij),(k\ell)}:=\tfrac12(\delta_{ik}\delta_{j\ell}+\delta_{i\ell}\delta_{jk}),\qquad \natural\,\Pi_\ominus\vec{X}=\tfrac12(X+X^\top),
> $$
> $$
> [\Pi_\oplus]_{(ij),(k\ell)}:=\tfrac12(\delta_{ik}\delta_{j\ell}-\delta_{i\ell}\delta_{jk}),\qquad \natural\,\Pi_\oplus\vec{X}=\tfrac12(X-X^\top).
> $$
> They are orthogonal projectors that jointly span $\mathbb{R}^{N^2}$: $\Pi_\ominus\Pi_\ominus=\Pi_\ominus$, $\Pi_\oplus\Pi_\oplus=\Pi_\oplus$, $\Pi_\ominus\Pi_\oplus=0$, $\Pi_\ominus+\Pi_\oplus=I_{N^2}$ (19.15).

A Kronecker product $W\otimes W$ splits into a symmetric and skew-symmetric part:
$$
W\otimes W=\underbrace{\Pi_\ominus(W\otimes W)\Pi_\ominus}_{=:W\otimes_{\!\ominus}W}+\underbrace{\Pi_\oplus(W\otimes W)\Pi_\oplus}_{=:W\otimes_{\!\oplus}W}.
$$

> [!definition] Symmetric / skew Kronecker product ^def-symkron
> $$
> [C\otimes_{\!\ominus}D]_{(ij),(k\ell)}=\tfrac12(C_{ik}D_{j\ell}+C_{i\ell}D_{jk}),\qquad [C\otimes_{\!\oplus}D]_{(ij),(k\ell)}=\tfrac12(C_{ik}D_{j\ell}-C_{i\ell}D_{jk}). \tag{19.16}
> $$
> They inherit *some* Kronecker properties. In particular, on symmetric matrices $(W\otimes_{\!\ominus}W)^{-1}=W^{-1}\otimes_{\!\ominus}W^{-1}$, but in general $(C\otimes_{\!\oplus}D)^{-1}\neq C^{-1}\otimes_{\!\oplus}D^{-1}$. Also $(C\otimes_{\!\ominus}D)\vec{X}=\tfrac12(CXD^\top+CX^\top D^\top)$ (19.17).

Symmetry information is written as a Dirac likelihood $p(\ominus\mid A)=\delta(\Pi_\oplus\vec{A}-0)=\lim_{\beta\to0}\mathcal{N}(\vec{0};\Pi_\oplus\vec{A},\beta I)$ (19.18). Conditioning the Gaussian prior on it yields a posterior that, with Kronecker covariance $\Sigma_0=W_0\otimes W_0$, collapses to a symmetric prior mean and a **symmetric Kronecker covariance**:
$$
p(A)=\mathcal{N}(A;A_0,W_0\otimes_{\!\ominus}W_0), \tag{19.20}
$$
which assigns non-zero measure only to symmetric matrices.

## Examples

> [!example] Degrees of freedom
> A full spd covariance on $N\times N$ matrix elements has $\tfrac12 N^2(N^2+1)$ parameters. Kronecker $V_0\otimes W_0$ has $N(N+1)$. The symmetric $N\times N$ matrices form a space of dimension $\tfrac12 N(N+1)$; if $W$ is full rank, $W\otimes_{\!\ominus}W$ has rank $\tfrac12 N(N+1)$ and its inverse on that space is $W^{-1}\otimes_{\!\ominus}W^{-1}$.

> [!example] Sampling intuition (Figs. 19.3–19.4)
> Samples from $\mathcal{N}(I,V_0\otimes W_0)$ with $V_0=W_0=I$ look like uncorrelated noise; with $V_0=\mathrm{diag}[10^4,9^4,8^4,\dots]$ the row structure dominates. Samples from the symmetry-encoding $\mathcal{N}(A_0,W_0\otimes_{\!\ominus}W_0)$ are visibly symmetric matrices.

## Connections
- Provides the covariance objects used in the mean/covariance update equations of [[Probabilistic Linear Solvers - Algorithmic Scaffold]].
- The matrix inversion lemma and block-inverse identities (Ch. 15.5) are the algebraic tools for turning a posterior over $A$ into an estimator $H_i=A_M^{-1}$.
- Builds directly on [[Gaussian Distributions and Algebra]] (closure under linear maps and conditioning).

## See Also
- [[Gaussian Distributions and Algebra]] — the vector-Gaussian identities transplanted here.
- [[Probabilistic Linear Solvers - Algorithmic Scaffold]] — uses these priors to instantiate the solver.
- [[The Linear Algebra Problem and Evaluation Strategies]] — the observation model $Y=AS$ conditioned on.
