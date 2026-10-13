---
title: Model Class Reliance for Linear and RKHS Model Classes
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/regression
  - type/theorem
  - method/quadratic-programming
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§7 pp. 26-30 (Prop. 15 Eqs 7.1-7.2; Remark 16 Eq 7.3; §7.3 Eqs 7.4-7.5, Lemma 17; §7.4 Eqs 7.6-7.11, Lemma 18); App B.8 pp. 64-65; App C.6-C.8 pp. 75-77"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Class Reliance - Binary Search Computation]]"
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]"
  - "[[Model Class Reliance - Recidivism Case Study]]"
aliases:
  - Model Reliance for Linear Models
  - MR Closed Form for Linear Models
  - MCR QP1QC
  - MCR for Kernel Regression
---

# Model Class Reliance for Linear and RKHS Model Classes

> [!summary]
> Under squared-error loss, linear and additive models allow a closed form. **Proposition 15:** $MR(f_\beta)=1+\frac{2}{e_{\text{orig}}(f_\beta)}\{\mathrm{Cov}(Y,X_1)\beta_1-\beta_2'\mathrm{Cov}(X_2,X_1)\beta_1\}$, and $\hat e_{\text{switch}}(f_\beta)$ costs $O(n)$. Any linear combination $\xi_{\text{orig}}\hat e_{\text{orig}}+\xi_{\text{switch}}\hat e_{\text{switch}}$ is a (possibly non-convex) **quadratic in $\beta$** (Remark 16). With a quadratic norm constraint (ridge-type, Eq 7.4) or an RKHS norm constraint (Eq 7.6), each binary-search step is a **QP1QC**: one quadratic objective, one quadratic constraint, a trust-region-type problem that is solvable globally. Lemmas 17-18 give the loss bound $B_{\text{ind}}$ needed by the theory.
^summary

## Overview

Throughout §7: $\mathcal X\subset\mathbb R^p$, $\mathcal Y\subset\mathbb R$, $L(f,(y,x_1,x_2))=(y-f(x_1,x_2))^2$, and $0<\min_{f\in\mathcal F}\hat e_{\text{orig}}(f)$. The section serves two purposes. It makes MR *interpretable* for linear models, and it makes empirical MCR *exactly computable* (global minima, despite non-convexity) for three classes: unconstrained linear, quadratically constrained linear, and kernel regression.

## Main Content

### Interpreting and computing MR for linear models (§7.1)

> [!theorem] Proposition 15: MR for linear models (p. 26, Eqs 7.1-7.2)
> Use squared-error loss, $y\in\mathbb R$, $x_1\in\mathbb R^{p_1}$ and $x_2\in\mathbb R^{p_2}$. Let $\beta=(\beta_1,\beta_2)$ and $f_\beta(x)=x'\beta=x_1'\beta_1+x_2'\beta_2$. Then
> $$MR(f_\beta)=1+\frac{2}{e_{\text{orig}}(f_\beta)}\Big\{\mathrm{Cov}(Y,X_1)\beta_1-\beta_2'\mathrm{Cov}(X_2,X_1)\beta_1\Big\},\qquad(7.1)$$
> and for finite samples
> $$\hat e_{\text{switch}}(f_\beta)=\frac1n\left\{\mathbf y'\mathbf y-2\begin{bmatrix}\mathbf X_1'\mathbf W\mathbf y\\\mathbf X_2'\mathbf y\end{bmatrix}'\beta+\beta'\begin{bmatrix}\mathbf X_1'\mathbf X_1&\mathbf X_1'\mathbf W\mathbf X_2\\\mathbf X_2'\mathbf W\mathbf X_1&\mathbf X_2'\mathbf X_2\end{bmatrix}\beta\right\},\qquad(7.2)$$
> where $\mathbf W:=\frac1{n-1}(\mathbf 1_n\mathbf 1_n'-\mathbf I_n)$.
>
> **Linear cost.** $\mathbf X_1'\mathbf W\mathbf y=\frac1{n-1}\{(\mathbf X_1'\mathbf 1_n)(\mathbf 1_n'\mathbf y)-\mathbf X_1'\mathbf y\}$ and $\mathbf X_1'\mathbf W\mathbf X_2=\frac1{n-1}\{(\mathbf X_1'\mathbf 1_n)(\mathbf 1_n'\mathbf X_2)-\mathbf X_1'\mathbf X_2\}$. Each needs $O(n)$ work, although (3.3) has $n(n-1)$ terms.
>
> **Additive models.** Both results extend to $f_{g_1,g_2}(X_1,X_2)=g_1(X_1)+g_2(X_2)$, since permuting $X_1$ is the same as permuting $g_1(X_1)$ (as in Gregorutti et al. 2017, who derived the equivalent of (7.1) assuming $f_\beta=E(Y\mid X)$ and centered covariates).
^thm-prop15

> [!theorem] Proof of Proposition 15 (App B.8, pp. 64-65)
> Write $e_{\text{orig}}=\mathbb E[(Y-X_2'\beta_2)^2]-2\mathbb E[(Y-X_2'\beta_2)X_1']\beta_1+\beta_1'\mathbb E[X_1X_1']\beta_1$. In $e_{\text{switch}}$, $X_1^{(a)}$ is independent of $(Y^{(b)},X_2^{(b)})$, so the cross term factorizes: $e_{\text{switch}}=\mathbb E[(Y-X_2'\beta_2)^2]-2\mathbb E[Y-X_2'\beta_2]\mathbb E[X_1']\beta_1+\beta_1'\mathbb E[X_1X_1']\beta_1$. Subtracting,
> $$e_{\text{switch}}(f_\beta)=e_{\text{orig}}(f_\beta)+2\,\mathrm{Cov}(Y-X_2'\beta_2,X_1)\beta_1=e_{\text{orig}}+2\mathrm{Cov}(Y,X_1)\beta_1-2\beta_2'\mathrm{Cov}(X_2,X_1)\beta_1.$$
> Divide by $e_{\text{orig}}$ to get (7.1).
>
> **Finite-sample half, Eq 7.2 (Eqs B.48-B.49, pp. 64-65).** Start from the U-statistic form $\hat e_{\text{switch}}(f_\beta)=\frac{1}{n(n-1)}\sum_{i=1}^n\sum_{j\ne i}(y_{[j]}-\mathbf X_{2[j,\cdot]}\beta_2-\mathbf X_{1[i,\cdot]}\beta_1)^2$. Here row $j$ supplies $(y,x_2)$ and row $i$ supplies $x_1$.
> 1. **Expand the square inside the double sum.** Each term is $(y_{[j]}-\mathbf X_{2[j,\cdot]}\beta_2)^2-2(y_{[j]}-\mathbf X_{2[j,\cdot]}\beta_2)(\mathbf X_{1[i,\cdot]}\beta_1)+(\mathbf X_{1[i,\cdot]}\beta_1)^2$.
> 2. **Count the pure terms (B.48).** Each of the two squared pieces depends on one index only, and each index value appears in $n-1$ ordered pairs. So
> $$n(n-1)\hat e_{\text{switch}}=(n-1)\sum_{i}(y_{[i]}-\mathbf X_{2[i,\cdot]}\beta_2)^2-2\Big\{\sum_i\sum_{j\ne i}(\mathbf X_{1[i,\cdot]}\beta_1)(y_{[j]}-\mathbf X_{2[j,\cdot]}\beta_2)\Big\}+(n-1)\sum_i(\mathbf X_{1[i,\cdot]}\beta_1)^2.\qquad(\text{B.48})$$
> 3. **Simplify the braces term (B.49).** Add and subtract the diagonal $j=i$: $\sum_i\sum_{j\ne i}=\sum_i\sum_{j=1}^n-\sum_{i=j}$. The full double sum factorizes as $\big(\sum_i\mathbf X_{1[i,\cdot]}\beta_1\big)\big(\sum_j(y_{[j]}-\mathbf X_{2[j,\cdot]}\beta_2)\big)=(\mathbf X_1\beta_1)'\mathbf 1_n\mathbf 1_n'(\mathbf y-\mathbf X_2\beta_2)$. The diagonal is $(\mathbf X_1\beta_1)'(\mathbf y-\mathbf X_2\beta_2)$. Hence
> $$\{\cdot\}=(\mathbf X_1\beta_1)'(\mathbf 1_n\mathbf 1_n'-\mathbf I_n)(\mathbf y-\mathbf X_2\beta_2).\qquad(\text{B.49})$$
> 4. **Plug back in and write in matrix form.** $n(n-1)\hat e_{\text{switch}}=(n-1)\|\mathbf y-\mathbf X_2\beta_2\|_2^2-2(\mathbf X_1\beta_1)'(\mathbf 1_n\mathbf 1_n'-\mathbf I_n)(\mathbf y-\mathbf X_2\beta_2)+(n-1)\|\mathbf X_1\beta_1\|_2^2$. Divide by $n-1$. The matrix $\frac{1}{n-1}(\mathbf 1_n\mathbf 1_n'-\mathbf I_n)$ is exactly $\mathbf W$:
> $$n\hat e_{\text{switch}}=\|\mathbf y-\mathbf X_2\beta_2\|_2^2-2(\mathbf X_1\beta_1)'\mathbf W(\mathbf y-\mathbf X_2\beta_2)+\|\mathbf X_1\beta_1\|_2^2.$$
> 5. **Collect terms in $\beta$.** Expanding gives $\mathbf y'\mathbf y-2\mathbf y'\mathbf X_2\beta_2+\beta_2'\mathbf X_2'\mathbf X_2\beta_2-2\beta_1'\mathbf X_1'\mathbf W\mathbf y+2\beta_1'\mathbf X_1'\mathbf W\mathbf X_2\beta_2+\beta_1'\mathbf X_1'\mathbf X_1\beta_1$. In block form this is $\mathbf y'\mathbf y-2[\mathbf X_1'\mathbf W\mathbf y;\ \mathbf X_2'\mathbf y]'\beta+\beta'\begin{bmatrix}\mathbf X_1'\mathbf X_1&\mathbf X_1'\mathbf W\mathbf X_2\\\mathbf X_2'\mathbf W\mathbf X_1&\mathbf X_2'\mathbf X_2\end{bmatrix}\beta$, which is (7.2). $\mathbf W$ is symmetric, so the cross term $2\beta_1'\mathbf X_1'\mathbf W\mathbf X_2\beta_2$ splits evenly across the two off-diagonal blocks.
>
> **Intuition.** $\mathbf W$ has zeros on the diagonal and $\frac1{n-1}$ off it. It is the "average over all *other* rows" operator. The $\mathbf W$ appears only where $X_1$ meets $(y,X_2)$, because those are the only pairs the permutation separates.
^proof-prop15

**Reading (7.1).** MR exceeds 1 to the extent that the $X_1$ term $X_1'\beta_1$ covaries with the part of $Y$ *not* already explained by $X_2'\beta_2$, scaled by model accuracy. Two linear models with equal loss can split a shared signal between correlated $X_1$ and $X_2$ in different proportions, and so have very different MR. This is the Rashomon effect in its simplest form.

### Linear model classes (§7.2)

$\mathcal F_{\text{lm}}:=\{f_\beta:f_\beta(x)=x'\beta,\ \beta\in\mathbb R^p\}$.

> [!theorem] Remark 16: Tractability of empirical MCR for linear model classes (p. 27, Eq 7.3)
> For any $f_\beta\in\mathcal F_{\text{lm}}$ and fixed $\xi_{\text{orig}},\xi_{\text{switch}}\in\mathbb R$, the combination
> $$\xi_{\text{orig}}\hat e_{\text{orig}}(f_\beta)+\xi_{\text{switch}}\hat e_{\text{switch}}(f_\beta)\qquad(7.3)$$
> is proportional in $\beta$ to $-2\mathbf q'\beta+\beta'\mathbf Q\beta$, with
> $$\mathbf Q:=\xi_{\text{orig}}\mathbf X'\mathbf X+\xi_{\text{switch}}\begin{bmatrix}\mathbf X_1'\mathbf X_1&\mathbf X_1'\mathbf W\mathbf X_2\\\mathbf X_2'\mathbf W\mathbf X_1&\mathbf X_2'\mathbf X_2\end{bmatrix},\qquad\mathbf q:=\xi_{\text{orig}}\mathbf X'\mathbf y+\xi_{\text{switch}}\begin{bmatrix}\mathbf X_1'\mathbf W\mathbf y\\\mathbf X_2'\mathbf y\end{bmatrix}.$$
> So each search step is an **unconstrained, possibly non-convex QP**. $\mathbf Q$ can be indefinite when $\xi$ has mixed signs, as in $\hat h_{+,\gamma}$ with $\gamma<0$.
>
> **Proof (App C.6).** Apply Proposition 15 to $\hat e_{\text{switch}}$, use $\hat e_{\text{orig}}=\frac1n(\mathbf y'\mathbf y-2\mathbf y'\mathbf X\beta+\beta'\mathbf X'\mathbf X\beta)$, and drop the constant $\mathbf y'\mathbf y$ terms.
^thm-remark16

### Regularized linear models (§7.3)

> [!definition] Definition: Quadratically constrained linear class (Eq 7.4, p. 27)
> $$\mathcal F_{\text{lm},r_{\text{lm}}}:=\{f_\beta:f_\beta(x)=x'\beta,\ \beta\in\mathbb R^p,\ \beta'\mathbf M_{\text{lm}}\beta\le r_{\text{lm}}\},$$
> with $\mathbf M_{\text{lm}}$ and $r_{\text{lm}}$ prespecified. This is the constrained form of ridge regression.
^def-flm-r

> [!theorem] Search subproblem as QP1QC (§7.3.1, Eq 7.5, p. 28)
> $$\min_\beta\ -2\mathbf q'\beta+\beta'\mathbf Q\beta\quad\text{s.t.}\quad\beta'\mathbf M_{\text{lm}}\beta\le r_{\text{lm}}.\qquad(7.5)$$
> This is a possibly non-convex quadratic program with one quadratic constraint (QP1QC). It is well studied and related to the trust-region problem (Boyd & Vandenberghe 2004; Pólik & Terlaky 2007; Park & Boyd 2017), so the §6 bounds are computationally tractable for this class. (Background, not stated in the paper: the S-lemma gives zero duality gap for a QP1QC, which is why global solutions are available despite non-convexity.)
^thm-qp1qc-lm

> [!theorem] Lemma 17: Loss upper bound for linear models (§7.3.2, p. 28)
> Suppose $\mathbf M_{\text{lm}}$ is **positive definite**, $Y$ is **bounded within a known range**, and there is a known $r_X$ with $x'\mathbf M_{\text{lm}}^{-1}x\le r_X$ for all $x\in\mathcal X_1\times\mathcal X_2$. Then Assumption 1 holds for $\mathcal F_{\text{lm},r_{\text{lm}}}$ under squared error with
> $$B_{\text{ind}}=\max\Big[\{\min_{y\in\mathcal Y}(y)-\sqrt{r_Xr_{\text{lm}}}\}^2,\ \{\max_{y\in\mathcal Y}(y)+\sqrt{r_Xr_{\text{lm}}}\}^2\Big].$$
> In practice $r_X$ can be approximated from the empirical distribution of $X$ and $Y$. The constraints on $X$ and $\beta$ are complementary: if $\mathbf M_{\text{lm}}$ is diagonal, its smallest entries are the directions in which $\beta$ is least restricted and $x$ is most restricted.
>
> **Proof (App C.7).** Bound the loss by maximizing or minimizing $x'\beta$ subject to $x'\mathbf M_{\text{lm}}^{-1}x\le r_X$ and $\beta'\mathbf M_{\text{lm}}\beta\le r_{\text{lm}}$ (C.17). The paper notes (p. 75) that **both constraints hold with equality at the solution** (our gloss: the objective is bilinear, so scaling either $x$ or $\beta$ up to its constraint boundary can only increase a positive optimum). This is why it is valid to replace the inequality constraints with the equality (unit-norm) constraints after the change of variables. With the eigendecomposition $\mathbf U\mathbf D\mathbf U'=\mathbf M_{\text{lm}}$, the change of variables $\tilde x=r_X^{-1/2}\mathbf D^{-1/2}\mathbf U'x$, $\tilde\beta=r_{\text{lm}}^{-1/2}\mathbf D^{1/2}\mathbf U'\beta$ turns this into $\max\tilde x'\tilde\beta\sqrt{r_Xr_{\text{lm}}}$ over unit vectors, with optimum $\sqrt{r_Xr_{\text{lm}}}$. The minimum is $-\sqrt{r_Xr_{\text{lm}}}$. The squared error is largest at an extreme $y$ paired with an extreme prediction.
^thm-lemma17

### Regression in a reproducing kernel Hilbert space (§7.4)

> [!definition] Definition: Kernel regression class $\mathcal F_{\mathbf D,r_k}$ (Eqs 7.6-7.7, pp. 28-29)
> Let $\mathbf D$ be an $R\times p$ dictionary of reference points (rows in $\mathcal X=\mathbb R^p$), $k$ a prespecified positive-definite kernel, $\mu$ a prespecified estimate of $\mathbb EY$, and $\mathbf K_{\mathbf D}$ the $R\times R$ matrix with $\mathbf K_{\mathbf D[i,j]}=k(\mathbf D_{[i,\cdot]},\mathbf D_{[j,\cdot]})$. Then
> $$\mathcal F_{\mathbf D,r_k}=\Big\{f_\alpha:f_\alpha(x)=\mu+\sum_{i=1}^Rk(x,\mathbf D_{[i,\cdot]})\alpha_{[i]},\ \|f_\alpha\|_k\le r_k,\ \alpha\in\mathbb R^R\Big\},\qquad(7.6)$$
> $$\|f_\alpha\|_k:=\sum_{i=1}^R\sum_{j=1}^R\alpha_{[i]}\alpha_{[j]}k(\mathbf D_{[i,\cdot]},\mathbf D_{[j,\cdot]})=\alpha'\mathbf K_{\mathbf D}\alpha.\qquad(7.7)$$
> The similarity to each reference point is a regression feature. This allows nonlinear and non-additive structure.
^def-rkhs-class

> [!theorem] Search subproblem for RKHS class as QP1QC (§7.4.1, Eqs 7.8-7.11, pp. 29-30)
> Given a test sample $\mathbf Z=[\mathbf y\ \mathbf X]$:
> - let $\mathbf K_{\text{orig}}$ be $n\times R$ with $\mathbf K_{\text{orig}[i,j]}=k(\mathbf X_{[i,\cdot]},\mathbf D_{[j,\cdot]})$;
> - let $\mathbf Z_{\text{switch}}=[\mathbf y_{\text{switch}}\ \mathbf X_{\text{switch}}]$ be the $n(n-1)\times(1+p)$ matrix with rows $\{(\mathbf y_{[i]},\mathbf X_{1[j,\cdot]},\mathbf X_{2[i,\cdot]}):i\ne j\}$;
> - let $\mathbf K_{\text{switch}}$ be $n(n-1)\times R$ with $\mathbf K_{\text{switch}[i,j]}=k(\mathbf X_{\text{switch}[i,\cdot]},\mathbf D_{[j,\cdot]})$.
>
> Then minimizing $\xi_{\text{orig}}\hat e_{\text{orig}}(f_\alpha)+\xi_{\text{switch}}\hat e_{\text{switch}}(f_\alpha)$ over $\mathcal F_{\mathbf D,r_k}$ is
> $$\min_\alpha\ \frac{\xi_{\text{orig}}}{n}\|\mathbf y-\mu-\mathbf K_{\text{orig}}\alpha\|_2^2+\frac{\xi_{\text{switch}}}{n(n-1)}\|\mathbf y_{\text{switch}}-\mu-\mathbf K_{\text{switch}}\alpha\|_2^2\quad\text{s.t.}\quad\alpha'\mathbf K_{\mathbf D}\alpha<r_k,\qquad(7.8\text{-}7.9)$$
> again a QP1QC. **Derivation:** $\hat e_{\text{orig}}(f_\alpha)=\frac1n\sum_i\{\mathbf y_{[i]}-\mu-\sum_jk(\mathbf X_{[i,\cdot]},\mathbf D_{[j,\cdot]})\alpha_{[j]}\}^2=\frac1n\|\mathbf y-\mu-\mathbf K_{\text{orig}}\alpha\|_2^2$ (7.10-7.11), and likewise $\hat e_{\text{switch}}(f_\alpha)=\frac{1}{n(n-1)}\|\mathbf y_{\text{switch}}-\mu-\mathbf K_{\text{switch}}\alpha\|_2^2$.
^thm-qp1qc-rkhs

> [!theorem] Lemma 18: Loss upper bound for RKHS regression (§7.4.2, p. 30)
> Suppose $Y$ is **bounded within a known range** and there is a known $r_{\mathbf D}$ with $v(x)'\mathbf K_{\mathbf D}^{-1}v(x)\le r_{\mathbf D}$ for all $x\in\mathcal X_1\times\mathcal X_2$, where $v:\mathbb R^p\to\mathbb R^R$ and $v(x)_{[i]}=k(x,\mathbf D_{[i,\cdot]})$. Then Assumption 1 holds for $\mathcal F_{\mathbf D,r_k}$ under squared error with
> $$B_{\text{ind}}=\max\Big[\{\min_{y\in\mathcal Y}(y)-(\mu+\sqrt{r_{\mathbf D}r_k})\}^2,\ \{\max_{y\in\mathcal Y}(y)+(\mu+\sqrt{r_{\mathbf D}r_k})\}^2\Big].$$
> **Proof as given in the paper (App C.8, pp. 75-76).** The proof follows the structure of C.7. From (7.7), the largest possible output of $f_\alpha\in\mathcal F_{\mathbf D,r_k}$ is
> $$\mu+\max_{x\in\mathbb R^p,\alpha\in\mathbb R^R}\sum_{i=1}^Rk(x,\mathbf D_{[i,\cdot]})\alpha_{[i]}=\mu+\max_{x,\alpha}v(x)'\alpha\quad\text{s.t.}\quad v(x)'\mathbf K_{\mathbf D}^{-1}v(x)\le r_{\mathbf D},\ \alpha'\mathbf K_{\mathbf D}\alpha\le r_k.$$
> 1. **Relax.** Replace $v(x)$, which ranges over the image of the feature map, by an arbitrary vector $z\in\mathbb R^R$ with $z'\mathbf K_{\mathbf D}^{-1}z\le r_{\mathbf D}$. The feasible set gets larger, so the maximum can only grow: $\le\mu+\max_{z,\alpha\in\mathbb R^R}z'\alpha$ s.t. $z'\mathbf K_{\mathbf D}^{-1}z\le r_{\mathbf D}$, $\alpha'\mathbf K_{\mathbf D}\alpha\le r_k$.
> 2. **Reuse C.17.** This is the same problem as (C.17), with $(\mathbf K_{\mathbf D},r_k)$ in place of $(\mathbf M_{\text{lm}},r_{\text{lm}})$ and $(z,r_{\mathbf D})$ in place of $(x,r_X)$. Its optimum is $\sqrt{r_{\mathbf D}r_k}$. So the largest output is at most $\mu+\sqrt{r_{\mathbf D}r_k}$.
> 3. **Lower side and conclusion.** The paper states that the smallest output is "similarly" lower bounded by $-(\mu+\sqrt{r_{\mathbf D}r_k})$, and concludes that $B_{\text{ind}}$ is at most the displayed expression.
>
> **Equivalent shortcut (not the paper's wording).** Cauchy-Schwarz in the $\mathbf K_{\mathbf D}$ metric gives the same bound in one line: $|v(x)'\alpha|\le\sqrt{v(x)'\mathbf K_{\mathbf D}^{-1}v(x)}\sqrt{\alpha'\mathbf K_{\mathbf D}\alpha}\le\sqrt{r_{\mathbf D}r_k}$.
>
> **Caveat on the lower output bound (our check, not flagged in the paper).** The symmetric argument actually gives a minimum output of $\mu-\sqrt{r_{\mathbf D}r_k}$, not $-(\mu+\sqrt{r_{\mathbf D}r_k})$. The two agree only when $\mu=0$. For $\mu\ge0$, $-(\mu+\sqrt{r_{\mathbf D}r_k})\le\mu-\sqrt{r_{\mathbf D}r_k}$, so the stated value is still a valid but loose lower bound. In that case the stated $B_{\text{ind}}$ is conservative, provided also $\max y+\sqrt{r_{\mathbf D}r_k}\ge0$ (true for any nonnegative outcome): its second term $\{\max y+\mu+\sqrt{r_{\mathbf D}r_k}\}^2$ is then at least the tight $\{\max y-\mu+\sqrt{r_{\mathbf D}r_k}\}^2$. For $\mu<0$ the stated lower output bound is *not* valid, and the stated $B_{\text{ind}}$ can understate the worst-case loss. The safe general form is
> $$B_{\text{ind}}=\max\Big[\{\min_{y}(y)-(\mu+\sqrt{r_{\mathbf D}r_k})\}^2,\ \{\max_{y}(y)-(\mu-\sqrt{r_{\mathbf D}r_k})\}^2\Big].$$
> In practice, centering $Y$ so that $\mu\approx0$ makes the two forms coincide.
^thm-lemma18

## Examples

> [!example] MR of a two-variable linear model (illustrative use of Eq 7.1)
> Let $X_1,X_2$ have unit variance with correlation $\rho$, $Y=X_1+X_2+\varepsilon$ and $\mathrm{Var}(\varepsilon)=1$. The model $f_\beta$ with $\beta=(1,1)$ has $e_{\text{orig}}=1$, $\mathrm{Cov}(Y,X_1)=1+\rho$ and $\mathrm{Cov}(X_2,X_1)=\rho$. So $MR=1+2\{(1+\rho)-\rho\}=3$, whatever $\rho$ is. Now take $\rho=0.9$ and the alternative $\beta=(0,1.95)$. Its $e_{\text{orig}}=\mathrm{Var}(X_1+X_2-1.95X_2)+1=\mathrm{Var}(X_1-0.95X_2)+1=1+0.9025-1.71+1=1.19$, only 19% worse, yet $MR(f_{(0,1.95)})=1$. With $\epsilon\approx0.2$, the Rashomon set contains models with MR from 1 to above 3 on $X_1$. MCR exposes this; a single fit hides it.
^ex-mr-of-a-two

> [!example] Marketing use
> For a ridge-constrained linear response model on adstocked channel spends, Remark 16 and (7.5) make MCR for any channel *exactly* computable with a trust-region solver in a few dozen solves. Swapping $\mathbf M_{\text{lm}}$ for a prior-precision matrix links this to a MAP or ridge Bayesian MMM ([[Bayesian Estimation and Priors for MMM]]).
^ex-marketing-use

## Connections

- The RKHS class is the finite-dictionary form of kernel ridge regression, closely related to the [[Gaussian Process Regression]] posterior mean. The norm bound $r_k$ is the frequentist counterpart of the GP prior scale.
- Equation (7.1) shows MR depends on the residualized covariance of $Y$ with $X_1$ *given the model's own use of $X_2$*. That is why MR can be large for a variable with zero marginal correlation, and vice versa.
- [[Regularization Bias and the Partially Linear Model]]: ridge-type constraints that make MCR computable also bias individual coefficients.

## See Also
- [[Model Class Reliance - Binary Search Computation]]: the outer loop these subproblems plug into
- [[Model Class Reliance - Recidivism Case Study]]: RKHS class applied with an RBF kernel
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
