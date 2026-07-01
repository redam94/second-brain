---
title: Probabilistic Linear Solvers - Algorithmic Scaffold
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 19, pp. 149-167"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Linear Algebra"
doc_type: textbook
depends_on:
  - "[[The Linear Algebra Problem and Evaluation Strategies]]"
  - "[[Classic Linear Solvers - A Review]]"
  - "[[Gaussian Priors over Matrices and the Symmetric Kronecker Product]]"
  - "[[Gaussian Distributions and Algebra]]"
used_by:
  - "[[Conjugate Gradients as Probabilistic Inference]]"
  - "[[Computational Constraints on Probabilistic Solvers]]"
  - "[[Uncertainty Calibration for Linear Solvers]]"
aliases:
  - Probabilistic Linear Solver
  - Inference on A vs H vs x
  - Gaussian Linear Solvers
  - BayesCG scaffold
---

# Probabilistic Linear Solvers - Algorithmic Scaffold

> [!summary]
> This is the central note of Part III. It fills the abstract `Infer` step of the iterative skeleton (Algorithm 17.2) with concrete **Gaussian inference over matrices**. One may place a Gaussian prior on the matrix $A$, on its inverse $H=A^{-1}$, or (implicitly) on the solution $x=Hb$; in the noise-free case observations $Z=AD$ can be read as linear maps of either $A$ or $H$, so inference on one transforms into inference on the other. Kronecker-structured covariances give closed-form, low-rank posteriors whose mean is analytically invertible, providing the estimators $H_i$ the solver needs. Encoding **symmetry** (linear, easy) turns the solver into a conjugate-direction method; encoding **positive-definiteness** (a nonlinear cone, hard) cannot be done in a Gaussian likelihood. The four resulting model families are summarised in Table 19.1.

## Overview

From [[The Linear Algebra Problem and Evaluation Strategies]] we have the iterative skeleton whose inference rule (line 12) was left abstract, and from [[Classic Linear Solvers - A Review]] we know which *properties* of that rule reproduce classical solvers. This chapter supplies **Gaussian** inference rules with those properties. The design questions are:

1. What do we put a prior on — $A$, $H=A^{-1}$, or $x$?
2. What covariance structure keeps inference tractable? (Answer: Kronecker; see [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]].)
3. Can we encode the known facts that $A$ is symmetric and positive-definite?

The **recurring thesis** made concrete: with these ingredients, an existing solver like CG becomes the *policy of an agent* that holds an internal Gaussian model over $A$ (or $H$), uses it to estimate the solution of $Ax=b$, and performs Bayesian inference on the matrix-vector products it collects.

## Main Content

### A prior over A, H, or x?

The uncertain aspects of $Ax=b$ can be located differently:

> [!definition] Three modelling choices ^def-choices
> - **Inference on $A$**: treat the matrix $A$ as the latent object, $p(A,Y,S)$. Advantage: the matrix-matrix product $AS=Y$ is described *explicitly* and linearly (relevant if the main uncertainty is that products are computed approximately). Downside: it does not explicitly involve $x$; a tractable distribution on $A$ can induce a *complicated* (even non-invertible-supporting) distribution on $x$ (Fig. 19.1 — the inverse of a Gaussian is not Gaussian).
> - **Inference on $H$**: write $x=Hb$ explicitly with $H=A^{-1}$ and model $p(H,Y,S)$. Advantage: since $x$ is a *linear* function of $H$, tractable posteriors on $H$ give tractable posteriors on $x$. Downside: if $Y=AS$ holds only approximately, the likelihood $p(Y,S\mid H)$ is hard to capture.
> - **Inference on $x$**: model only the solution vector for one specific $b$ (cheapest; see [[Computational Constraints on Probabilistic Solvers]]).

> [!theorem] Duality of noise-free inference on A and H ^thm-duality
> In the **noise-free** case, the observations $Z=AD$ can be written as linear maps of either $A$ or $H$:
> $$Z=AD\iff D=HZ.$$
> Inference on $A$ transforms directly into inference on $H$ by simultaneously exchanging
> $$S\leftrightarrow Y\qquad\text{and}\qquad A\leftrightarrow H.$$
> (Here $S=[s_1,\dots,s_M]$ collects the rescaled directions and $Y=AS=[y_1,\dots,y_M]$ the observations.) One therefore studies inference on $A$ and reads off $H$ by the exchange.

### General Gaussian inference on A

With a general Gaussian prior $p(A)=\mathcal{N}(A;A_0,\Sigma_0)$, the noise-free observation $Y=AS$ is a Dirac likelihood, the limit of a Gaussian:
$$p(S,Y\mid A)=\delta\big(\vec{Y}-(I\otimes S^\top)\vec{A}\big)=\lim_{\beta\to0}\mathcal{N}\big(\vec{Y};(I\otimes S^\top)\vec{A},\beta\Lambda\big).$$
Because $Y$ is a *linear* projection of $A$ (via the Kronecker map $I\otimes S^\top$), the posterior is Gaussian, $p(A\mid Y,S)=\mathcal{N}(A;A_M,\Sigma_M)$ (19.4), with

> [!theorem] General Gaussian posterior ^thm-general-posterior
> $$\vec{A}_M=\vec{A}_0+\Sigma_0(I\otimes S)\underbrace{\big((I\otimes S^\top)\Sigma_0(I\otimes S)\big)^{-1}}_{\text{via Gram }G_M}\big(\vec{Y}-(I\otimes S^\top)\vec{A}_0\big), \tag{19.5}$$
> $$\Sigma_M=\Sigma_0-\Sigma_0(I\otimes S)\big((I\otimes S^\top)\Sigma_0(I\otimes S)\big)^{-1}(I\otimes S^\top)\Sigma_0. \tag{19.6}$$
> The posterior is always **consistent**: the marginal over the projection is $p(AS)=\mathcal{N}(\vec{AS};Y,0)$ (19.7), so every sample obeys $\tilde A S=Y$, and if invertible also $\tilde A^{-1}Y=S$ (required by Algorithm 17.2). This holds for the posterior mean $A_M$ too.

Problem: the Gram matrix $G_M=(I\otimes S^\top)\Sigma_0(I\otimes S)$ is $NM\times NM$ — *larger* than the original $N\times N$ matrix. Structure on $\Sigma_0$ is mandatory.

### Kronecker covariances give low-rank posteriors

With $\Sigma_0=V_0\otimes W_0$ (spd $V_0,W_0$; see [[Gaussian Priors over Matrices and the Symmetric Kronecker Product#^def-kron-cov]]), the posterior collapses to a rank-$\le M$ outer-product update:

> [!theorem] Kronecker posterior mean and covariance ^thm-kron-posterior
> $$A_M=A_0+\underbrace{(Y-A_0 S)}_{=:\Delta_M}\underbrace{(S^\top W_0 S)^{-1}}_{M\times M}\ \underbrace{S^\top W_0}_{M\times N}, \tag{19.10}$$
> $$\Sigma_M=V_0\otimes\underbrace{\big(W_0-W_0 S(S^\top W_0 S)^{-1}S^\top W_0\big)}_{=:W_M}. \tag{19.11}$$
> Symbols: $\Delta_M$ = residual between prediction $A_0 S$ and observation $Y$; $S^\top W_0 S$ = predictive covariance between the rows of the residual; $S^\top W_0$ = predictive covariance between residual rows and rows of $A$. All objects are stored in $\mathcal{O}(NM^2)$ and involve a single $M\times M$ inverse.

The estimator required by Algorithm 17.2 is $H_i=A_i^{-1}$. Thanks to the low-rank structure, the mean's inverse is available via the matrix inversion lemma (15.9):
$$A_M^{-1}=A_0^{-1}+(S-A_0^{-1}Y)(S^\top W_0 A_0^{-1}Y)^{-1}S^\top W_0 A_0^{-1}. \tag{19.12}$$

> [!theorem] Lemma 19.3 (existence of the inverse-of-the-mean estimator) ^thm-193
> If $A_0$ and $W_0$ are spd, and the search directions $S$ are linearly independent, then for spd $A$ the inverse (19.12) exists.
> *Proof.* If $A_0$ is spd its inverse exists; $Y=AS$ and products of spd matrices are spd, so $W_0 A_0^{-1}A$ is spd, hence $S^\top W_0 A_0^{-1}AS$ is invertible. $\square$

This gives the **first concrete realisation of Algorithm 17.2**: set the prior $p(A)=\mathcal{N}(A;A_0,V_0\otimes W_0)$ and use $H_i=A_i^{-1}$ from (19.12). Note $A_M^{-1}$ (inverse of the expected value) is *not* $\mathbb{E}[A^{-1}]$ (the harder object).

### Encoding symmetry (linear ⇒ conjugate directions)

Symmetry $A_{ij}-A_{ji}=0$ is a linear constraint; the Gaussian family is closed under it. Using the symmetric Kronecker product covariance $W_0\otimes_{\!\ominus}W_0$ (see [[Gaussian Priors over Matrices and the Symmetric Kronecker Product#^def-symkron]]) and prior $p(A)=\mathcal{N}(A;A_0,W_0\otimes_{\!\ominus}W_0)$ (19.20, symmetric $A_0$), conditioning on $Y=AS$ gives:

> [!theorem] Symmetric Gaussian posterior ^thm-sym-posterior
> $$A_M=A_0+(Y-A_0 S)(S^\top W_0 S)^{-1}S^\top W_0+W_0 S(S^\top W_0 S)^{-1}(Y-A_0 S)^\top$$
> $$\qquad-W_0 S(S^\top W_0 S)^{-1}S^\top(Y-A_0 S)(S^\top W_0 S)^{-1}S^\top W_0, \tag{19.21}$$
> $$\Sigma_M=W_M\otimes_{\!\ominus}W_M,\qquad W_M:=W_0-W_0 S(S^\top W_0 S)^{-1}S^\top W_0. \tag{19.22}$$
> $A_M$ is symmetric when $A_0$ is (since $S^\top Y=S^\top AS$ is symmetric), and the term added to $A_0$ has rank at most $2M$. Introducing $U:=W_0 S(S^\top W_0 S)^{-1}$ and $V:=(I-\tfrac12 U S^\top)(Y-A_0 S)$ (19.23), it is a **rank-$2M$** update
> $$A_M=A_0+UV^\top+VU^\top=A_0+\begin{bmatrix}U&V\end{bmatrix}\begin{bmatrix}0&I_M\\ I_M&0\end{bmatrix}\begin{bmatrix}U^\top\\ V^\top\end{bmatrix},$$
> whose inverse follows from the matrix inversion lemma, inverting only a $2M\times 2M$ matrix (19.24) — cost at most $\mathcal{O}(M^3)$ (plus $\mathcal{O}(NM^2)$ to multiply).

Because the estimator $A_M^{-1}$ (equivalently $H_M$) is now **symmetric**, Theorem 18.2 applies: the solver is a **conjugate-direction method** (see [[Classic Linear Solvers - A Review#^thm-182]]). This is the key payoff of symmetry.

### What about positive-definiteness? (the hard, nonlinear part)

> [!definition] The positive-definite cone obstruction ^cone
> The set of spd matrices is a **cone**, a *nonlinear* sub-space of $\mathbb{R}^{N^2}$ (and of the symmetric matrices; Fig. 19.5). Information about positive-definiteness therefore **cannot** be captured by a Gaussian likelihood using only *linear* terms in $A$. A Gaussian posterior always places non-zero mass outside the cone.

Two partial remedies keep the *posterior mean* spd:

> [!theorem] Corollary 19.9 (hereditary positive-definiteness via $W_0 S=Y$) ^thm-199
> Assume $A_0$ is spd, $A_i$ is the posterior mean of (19.21), and Algorithm 17.2 uses conjugate search directions $s_i$. If $W_i$ has the property $W_i s_i=y_i$, then all $A_i$ are symmetric positive-semi-definite. (This corresponds to the unrealistic but conceptually interesting choice $W_0=A$.)
> *Proof.* The rank-2 mean update (19.25) is spsd iff $\det A_{i+1}>0$ (Lemma 19.8, Dennis & Moré Thm. 7.5). Under $A$-conjugacy and $y_i^\top s_i=s_i^\top A s_i$, the offending term $W_i s_i-y_i=As_i-Y(S^\top Y)^{-1}Y^\top s_i=0$ vanishes, so the condition (19.27) holds. $\square$

> [!theorem] Theorem 19.10 (drag the mean into the cone by inflating the prior) ^thm-1910
> Assume scalar prior parameters $A_0=\alpha I$, $W_0=\beta I$ for $\alpha,\beta\in\mathbb{R}_+$, with $A_i$ the posterior mean (19.21) and conjugate search directions $S$. Then there exists a finite $\alpha_0>0$ such that any choice $\alpha>\alpha_0$ ensures all $A_i$ are positive-semi-definite.
> *(Proof in Ch. 22.4; developed in [[Conjugate Gradients as Probabilistic Inference#^proof-1910]]. Intuition: since $y_i$ is bounded by $\lambda_{\max}\|s_i\|$, hereditary pos-def is achieved by setting $\alpha$ much larger than $\lambda_{\max}$.)*

Both are *dissatisfying* probabilistically: they are post-hoc statements about the *mean* only. The Gaussian *distribution* still puts mass outside the cone, and the correction is not a use of prior knowledge during inference — the known fact "$A$ is spd" changes the estimate but is not truly exploited in the action rule. At the time of writing there is no clean solution.

### The four model families

> [!definition] Summary of Gaussian linear-solver models (Table 19.1) ^def-four-models
> Aiming to solve $Ax=b$ with spd $A$, adopting the iterative paradigm (Algorithm 17.2) with projection–observation pairs $S=[s_1,\dots,s_M]$, $Y=AS=[y_1,\dots,y_M]$, there are **four** Gaussian model classes, from the two axes {model $H$ vs model $A$} × {asymmetric vs symmetric}:
>
> | | Asymmetric prior | Symmetric prior |
> |---|---|---|
> | **Model for $H$** | $p(H)=\mathcal{N}(H_0,V_0\otimes W_0)$; mean $H_0+(S-H_0 Y)(Y^\top W_0 Y)^{-1}Y^\top W_0$; cov $V_0\otimes W_0(I-YU^\top)$ | $p(H)=\mathcal{N}(H_0,W_0\otimes_{\!\ominus}W_0)$; mean adds symmetric rank-$2M$ term; cov $W_0(I-YU^\top)\otimes_{\!\ominus}W_0(I-YU^\top)$ |
> | **Model for $A$** | $p(A)=\mathcal{N}(A_0,V_0\otimes W_0)$; mean $A_0+(Y-A_0 S)(S^\top W_0 S)^{-1}S^\top W_0$; cov $V_0\otimes W_0(I-SU^\top)$ | $p(A)=\mathcal{N}(A_0,W_0\otimes_{\!\ominus}W_0)$; mean (19.21); cov $W_0(I-SU^\top)\otimes_{\!\ominus}W_0(I-SU^\top)$ |
>
> (with $U^\top:=(S^\top W_0 S)^{-1}S^\top W_0$ etc.) Modelling $H$ allows a joint Gaussian model over $H$ and the solution $x=Hb$. Modelling $A$ allows explicit treatment of Gaussian observation *noise*, and still gives a low-rank mean estimate for $A$ (so an easily-computable estimate of $A^{-1}$). The likelihoods in all four cases are Dirac masses on $AS$ or $HY$, arising from different limit processes; the symmetric ones require the symmetric Kronecker product in the covariance, else the compact forms break — this is the principal reason the framework does not extend easily to the noisy setting.

### Consistency between beliefs on A and H, and preconditioning

Because the inverse of a Gaussian is not Gaussian (Fig. 19.9), a Gaussian on $A$ does not correspond to a Gaussian on $H$ exactly; but when the signal-to-noise ratio is large the correspondence is good.

> [!definition] Posterior correspondence ^def-correspondence
> Two solvers (one with belief on $A$, prior mean $A_0$, covariance parameter $W_0^A$, posterior mean $A_M$; one with belief on $H$, mean $H_0$, parameter $W_0^H$, posterior mean $H_M$) exhibit **posterior correspondence** if $A_M^{-1}=H_M$ for all $0\le M\le N$ (19.28), and **weak** posterior correspondence if only $A_M^{-1}Y=H_M Y$ (19.29). Lemma 19.12 (asymmetric) and Theorem 19.13 (symmetric) give the algebraic conditions; e.g. $A_0=\alpha_0 I,W_0^A=\beta_0 A$ pairs with $H_0=\alpha_0^{-1}I,W_0^H=\beta_0/\alpha_0$.

> [!theorem] Theorem 19.14 (probabilistic projection methods) ^thm-1914
> Any Gaussian generative model on elements of $A$, $p(A)=\mathcal{N}(A,A_0,\Sigma_A)$, or on $H$, $p(H)=\mathcal{N}(H,H_0,\Sigma_H)$, used in Algorithm 17.2, gives rise to a **projection method**.
> *Proof.* By Eq. (19.7) the estimator obeys the consistency requirement of line 12, hence is a projection method by construction. $\square$

> [!theorem] Theorem 19.15 (probabilistic conjugate-direction methods) ^thm-1915
> Any Gaussian model with symmetric Kronecker covariance for $A$ or $H$ — $p(A)=\mathcal{N}(A,A_0,W_A\otimes_{\!\ominus}W_A)$ or $p(H)=\mathcal{N}(H,H_0,W_H\otimes_{\!\ominus}W_H)$ with spd $A_0,W_A$ or $H_0,W_H$ — used in Algorithm 17.2 gives rise to a **conjugate-direction method**.
> *Proof.* Immediate from Theorem 18.2 (symmetric estimator ⇒ conjugacy) and consistency of the Gaussian posterior (19.7). $\square$

> [!theorem] Corollary 19.17 (probabilistic preconditioned CG) ^thm-1917
> For a prior $p(A)=\mathcal{N}(A;\alpha K,\beta^2 K\otimes_{\!\ominus}K)$ with spd $K=C^\top C$ and scalars $\alpha,\beta$, Algorithm 17.2 is equivalent to **preconditioned CG** with preconditioner $K$. The same holds for $p(H)=\mathcal{N}(H;\alpha K^{-1},\beta^2(K\otimes_{\!\ominus}K)^{-1})$.
> *Proof.* pCG runs CG on $\tilde A\tilde x=\tilde b$ with $\tilde A=C^{-\top}AC^{-1}$; by Theorem 19.16 running CG on $\tilde A$ equals inferring $\tilde A$ from $\mathcal{N}(\tilde A;\alpha I,\beta^2(I\otimes_{\!\ominus}I))$; the transformation $A=(C\otimes C)^\top\vec{\tilde A}$ maps this to the stated prior on $A$. $\square$

This is the precise sense in which **a preconditioner is a choice of prior** (mean $A_0$ *and* surrounding uncertainty), with the ideal $K=A$ the most "natural" prior.

## Examples

> [!example] The point-estimate "trick" — means need only accessible quantities
> It seems odd that Theorem 19.16 lists the inaccessible true $A$ (or $H$) as an allowed parameter $W_A=\beta I+\gamma A$. But the posterior *means* $H_M,A_M$ contain $W$ only as $W_H Y$ or $W_A S$. Since $HY=S$ and $AS=Y$, one can substitute $W_H Y=(\beta I+\gamma H)Y=\beta Y+\gamma S$ and $W_A S=\beta S+\gamma Y$ — quantities available at runtime. So the point estimator is computable even though its "prior covariance" formally references the unknown matrix. The **covariances**, however, explicitly contain $W$; that is why calibrating the covariance (Ch. 21) needs an empirical-Bayes estimate of $W$.

> [!example] Consistency check on the posterior
> No matter the prior covariance, the marginal on the projection is a delta at the data: $p(AS)=\mathcal{N}(\vec{AS};Y,0)$. Any sample $\tilde A$ satisfies $\tilde A S=Y$; if invertible, $\tilde A^{-1}Y=S$. The solver's belief is always exactly consistent with the matrix-vector products it has seen.

## Connections
- The symmetry ⇒ conjugacy chain (19.15 → Theorem 18.2) is what connects this scaffold to CG; the full equivalence (parameters $H_0=\alpha I$, $W_H=\beta I+\gamma H$) is Theorem 19.16, detailed in [[Conjugate Gradients as Probabilistic Inference]].
- The choice $W_0 S=Y$, $A_0=0$ (Corollary 19.9) reappears as the computationally and calibration-favoured choice in [[Computational Constraints on Probabilistic Solvers]].
- Empirical-Bayes estimation of the covariance parameter $W$ is the subject of [[Uncertainty Calibration for Linear Solvers]].
- Compare with [[Hierarchical Inference in Gaussian Models]] for the general empirical-Bayes / conjugate-prior machinery invoked for scale estimation.

## See Also
- [[Gaussian Priors over Matrices and the Symmetric Kronecker Product]] — the covariance machinery used throughout.
- [[Conjugate Gradients as Probabilistic Inference]] — Theorem 19.16 and the CG-equivalence proof.
- [[Computational Constraints on Probabilistic Solvers]] — instantiating cheap, CG-cost solvers; inference on $x$ only.
- [[Uncertainty Calibration for Linear Solvers]] — calibrating the covariance $W$.
- [[The Linear Algebra Problem and Evaluation Strategies]] — the skeleton (Algorithm 17.2) instantiated here.
- [[Classic Linear Solvers - A Review]] — the classical properties (projection, conjugacy, Krylov) these models realise.
- [[Gaussian Process Regression]] — the "posterior mean = classic estimate, at little extra cost" pattern parallels GP regression's Hessian/covariance reuse.
