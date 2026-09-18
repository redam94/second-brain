---
title: Generalized Random Forests - Local Moment Equations
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/treatment-effects
  - topic/random-forests
  - type/method
  - doc/paper
source: "[[raw/Athey Tibshirani Wager 2019 - Generalized Random Forests.pdf]]"
source_location: "§1-2 (pp. 1-11), eqs. 1-9, Propositions 1-2, Algorithms 1-2; §5 (pp. 18-20), Fig. 2; §6 (pp. 20-23), eqs. 19-21, Table 1; §7 (pp. 23-25), eq. 17"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Honest Trees and Causal Forests]]"
  - "[[Neyman Orthogonality]]"
  - "[[Causal Machine Learning - Overview]]"
used_by:
  - "[[Asymptotic Normality and Inference for Forests]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
aliases:
  - Generalized Random Forests
  - GRF
  - grf
  - Forest Weights
  - Gradient Tree
  - Local Centering
  - Instrumental Forest
  - Quantile Forest
---

# Generalized Random Forests - Local Moment Equations

> [!summary]
> **Generalized random forests** (Athey, Tibshirani & Wager 2019, *Annals of Statistics*) extend Breiman's forests from conditional-mean estimation to **any parameter $\theta(x)$ identified by a local moment condition** $\mathbb E[\psi_{\theta(x),\nu(x)}(O_i)\mid X_i=x]=0$. Two ideas make this work. (1) **Forests as adaptive kernels**: instead of averaging per-tree estimates (which does not remove the bias of noisy moment solutions), the forest produces *weights* $\alpha_i(x)$ — how often training point $i$ shares a leaf with $x$ — and $\hat\theta(x)$ solves a single $\alpha$-weighted estimating equation. (2) **Gradient-based splitting**: each node computes influence-function pseudo-outcomes $\rho_i$ and runs an ordinary CART split on them, maximizing heterogeneity in $\hat\theta$ at CART-like cost. Instances: regression forests (exactly recovered), **quantile forests**, **causal forests / conditional average partial effects** (with DML-style **local centering**), and **instrumental forests**. Implemented in the `grf` package.

## Overview

The local-moment framing unifies problems the vault treats separately: $\psi=Y-\theta$ (regression), $\psi=q-\mathbf 1\{Y\le\theta\}$ ([[Quantile Regression]]), the least-squares normal equations for $Y$ on $W$ (CATE), and the IV moments ([[Instrumental Variables]]). Classical local estimation (local likelihood / local GMM) solves $\sum_i\alpha_i(x)\psi_{\theta,\nu}(O_i)=0$ with **kernel** weights and suffers the curse of dimensionality beyond two or three covariates. GRF keeps the estimating equation and replaces the kernel with **data-adaptive forest weights** targeted at heterogeneity in $\theta(\cdot)$.

Why not average trees as in [[Honest Trees and Causal Forests]]? "Noisy solutions to moment equations … are generally biased, and averaging would do nothing to alleviate the bias." For regression the two views coincide; for ratio-type estimators (IV, partial effects in small leaves) the weighting view is materially more stable.

## Main Content

> [!definition] Forest weights and the GRF estimator (eqs. 2–3) ^def-grf-weights
> Grow $B$ trees; let $L_b(x)$ be the set of training examples in the same leaf as $x$ in tree $b$. Define
> $$
> \alpha_{bi}(x)=\frac{\mathbf 1\{X_i\in L_b(x)\}}{|L_b(x)|},\qquad\alpha_i(x)=\frac1B\sum_{b=1}^B\alpha_{bi}(x),
> $$
> so $\sum_i\alpha_i(x)=1$. The GRF estimate is
> $$
> \big(\hat\theta(x),\hat\nu(x)\big)\in\arg\min_{\theta,\nu}\Big\|\sum_{i=1}^n\alpha_i(x)\,\psi_{\theta,\nu}(O_i)\Big\|_2 .
> $$
> With $\psi_{\mu(x)}(Y_i)=Y_i-\mu(x)$ this gives $\hat\mu(x)=\frac1B\sum_b\hat\mu_b(x)$ — exactly Breiman's regression forest.

> [!theorem] Proposition 1 — the $\Delta$ splitting criterion ^thm-delta-criterion
> For a parent node $P$ split into children $C_1,C_2$, let $\hat\theta_{C_j}$ solve the estimating equation within child $j$ and define
> $$
> \Delta(C_1,C_2):=\frac{n_{C_1}n_{C_2}}{n_P^2}\big(\hat\theta_{C_1}-\hat\theta_{C_2}\big)^2 .
> $$
> Under the Section 3 assumptions, if $P$ has radius $<r$ and $n_{C_1},n_{C_2}\gg r^{-2}$, then the target error $\mathrm{err}(C_1,C_2)=\sum_j\mathbb P[X\in C_j\mid X\in P]\,\mathbb E[(\hat\theta_{C_j}-\theta(X))^2\mid X\in C_j]$ satisfies $\mathrm{err}(C_1,C_2)=K(P)-\mathbb E[\Delta(C_1,C_2)]+o(r^2)$, where $K(P)$ does not depend on the split. Hence: **choose splits that maximize heterogeneity $\Delta$ in the child estimates.** (The Athey–Imbens causal-tree rule is a special case.)

Optimizing $\Delta$ exactly would mean re-solving the moment equation in every candidate child. GRF linearizes instead.

> [!algorithm] Gradient tree (Algorithm 2; eqs. 4, 6–9) ^alg-gradient-tree
> At each parent node $P$:
> 1. **Solve once in the parent:** $(\hat\theta_P,\hat\nu_P)\in\arg\min\|\sum_{\{i:X_i\in P\}}\psi_{\theta,\nu}(O_i)\|_2$, and compute $A_P=\frac{1}{|\{i:X_i\in P\}|}\sum_{\{i:X_i\in P\}}\nabla\psi_{\hat\theta_P,\hat\nu_P}(O_i)$ (any consistent estimate of $\nabla\mathbb E[\psi\mid X_i\in P]$).
> 2. **Labeling step:** pseudo-outcomes $\rho_i=-\xi^\top A_P^{-1}\psi_{\hat\theta_P,\hat\nu_P}(O_i)\in\mathbb R$, where $\xi$ picks the $\theta$-coordinate. ($\rho_i$ is observation $i$'s influence on $\hat\theta_P$.)
> 3. **Regression step:** run a standard CART split on the $\rho_i$, maximizing
> $$
> \tilde\Delta(C_1,C_2)=\sum_{j=1}^2\frac{1}{|\{i:X_i\in C_j\}|}\Big(\sum_{\{i:X_i\in C_j\}}\rho_i\Big)^2 .
> $$
> 4. Recurse on the children (relabeling within each).
>
> Proposition 2: if $A_P$ is consistent, $\tilde\Delta(C_1,C_2)=\Delta(C_1,C_2)+o_P(\max\{r^2,1/n_{C_1},1/n_{C_2}\})$. For least squares, $\rho_i=Y_i-\bar Y_P$ and step 3 is exactly Breiman's split. All candidate splits along a feature are evaluated in a single pass via cumulative sums, as in gradient boosting.

> [!algorithm] Generalized random forest with honesty and subsampling (Algorithm 1) ^alg-grf
> For $b=1,\dots,B$: draw a subsample $\mathcal I$ of size $s$ without replacement; split it into halves $\mathcal J_1,\mathcal J_2$; grow a gradient tree on $\mathcal J_1$; find the $\mathcal J_2$-examples sharing a leaf with $x$, $\mathcal N$; add $1/|\mathcal N|$ to the weight of each $e\in\mathcal N$. Output $\hat\theta(x)$ solving the weighted moment equation with weights $\alpha/B$.
>
> *Specification 1* (theory): trees are symmetric, make balanced splits (each child gets $\ge$ a fraction $\omega$ of the parent), split on each feature with probability $\ge\pi$ (implemented by trying $\min\{\max\{\text{Poisson}(m),1\},p\}$ variables per split), and the forest is [[Honest Trees and Causal Forests#^def-honesty|honest]] with $s/n\to0$, $s\to\infty$.

### Application 1 — quantile forests (§5)

With $\psi_\theta(Y_i)=q\mathbf 1\{Y_i>\theta\}-(1-q)\mathbf 1\{Y_i\le\theta\}$ the pseudo-outcomes reduce to $\rho_i=\mathbf 1\{Y_i>\hat\theta_{q,P}\}$: split so as to separate observations above the parent's $q$-th quantile from those below. For several quantiles $q_1<\dots<q_k$ at once, label each point by the parent-quantile interval it falls in and use a multiclass split. Meinshausen's (2006) quantile regression forest uses the same weighting idea but ordinary CART splits on $Y$, so it detects mean shifts only. In Fig. 2 ($n=2000$, $p=40$, 39 noise covariates) both methods track a mean shift at $X_1=0$, but under a pure **scale shift** $Y\mid X\sim\mathcal N(0,(1+\mathbf 1\{X_1>0\})^2)$ Meinshausen's method "breaks down completely" while GRF recovers the 0.1/0.9 quantile jump. This is the nonparametric counterpart of conditional quantile treatment effects in [[Quantile Regression]].

### Application 2 — conditional average partial effects and causal forests (§6)

Model $Y_i=W_i\cdot b_i+\varepsilon_i$ with $\beta(x)=\mathbb E[b_i\mid X_i=x]$, exogeneity $\{b_i,\varepsilon_i\}\perp W_i\mid X_i$ (unconfoundedness when $W_i\in\{0,1\}$), and $\psi_{\beta(x),c(x)}(Y_i,W_i)=(Y_i-\beta(x)\cdot W_i-c(x))(1\;W_i^\top)^\top$. Then $\theta(x)=\xi^\top\mathrm{Var}[W_i\mid X_i=x]^{-1}\mathrm{Cov}[W_i,Y_i\mid X_i=x]$ and
$$
\hat\theta(x)=\xi^\top\Big(\sum_i\alpha_i(x)(W_i-\bar W_\alpha)^{\otimes2}\Big)^{-1}\sum_i\alpha_i(x)(W_i-\bar W_\alpha)(Y_i-\bar Y_\alpha),
$$
a forest-weighted regression of $Y$ on $W$. Pseudo-outcomes: $\rho_i=\xi^\top A_P^{-1}(W_i-\bar W_P)\big(Y_i-\bar Y_P-(W_i-\bar W_P)\hat\beta_P\big)$ with $A_P=|P|^{-1}\sum(W_i-\bar W_P)^{\otimes2}$. Continuous treatments (spend, price, dose) are covered as-is.

> [!definition] Local centering (§6.1.1) ^def-local-centering
> Before growing the forest, replace $Y_i,W_i$ by $\tilde Y_i=Y_i-\hat y^{(-i)}(X_i)$ and $\tilde W_i=W_i-\hat w^{(-i)}(X_i)$, where $\hat y^{(-i)},\hat w^{(-i)}$ are leave-one-out (out-of-bag) forest estimates of $\mathbb E[Y\mid X]$ and $\mathbb E[W\mid X]$. On any region $S$ where $\beta$ is constant, $\theta=\xi^\top\mathrm{Var}[W_i-\mathbb E[W_i\mid X_i]\mid X_i\in S]^{-1}\mathrm{Cov}[W_i-\mathbb E[W_i\mid X_i],\,Y_i-\mathbb E[Y_i\mid X_i]\mid X_i\in S]$ — Robinson's (1988) partialling-out moment — so the estimator is "robust to confounding effects even when the weights $\alpha_i(x)$ are not sharply concentrated around $x$."

Local centering is [[Neyman Orthogonality]] applied *inside* the forest: the residual-on-residual moment is insensitive to first-order errors in $\hat y,\hat w$, exactly as in [[Regularization Bias and the Partially Linear Model]]. Leave-one-out prediction is used because it is cheap for forests; $K$-fold [[Cross-Fitting and Sample Splitting|cross-fitting]] is the option "precisely covered by theory."

### Application 3 — instrumental forests (§7)

Structural model $Y_i=\mu(X_i)+\tau(X_i)W_i+\varepsilon_i$ with $\varepsilon_i$ possibly correlated with $W_i$; binary instrument $Z_i$ with $Z_i\perp\varepsilon_i\mid X_i$ and $\mathrm{Cov}[Z_i,W_i\mid X_i=x]\ne0$. Then $\tau(x)=\mathrm{Cov}[Y_i,Z_i\mid X_i=x]/\mathrm{Cov}[W_i,Z_i\mid X_i=x]$, identified by the moments $\mathbb E[Z_i(Y_i-W_i\tau(x)-\mu(x))\mid X_i=x]=0$ and $\mathbb E[Y_i-W_i\tau(x)-\mu(x)\mid X_i=x]=0$, with curvature matrix
$$
V(x)=\begin{pmatrix}\mathbb E[Z_iW_i\mid X_i=x]&\mathbb E[Z_i\mid X_i=x]\\ \mathbb E[W_i\mid X_i=x]&1\end{pmatrix}.
$$
Without a constant-effect assumption $\tau(x)$ is a *conditional* [[Local Average Treatment Effects|LATE]]. The gradient labeling step gives $\rho_i=(Z_i-\bar Z_P)\big((Y_i-\bar Y_P)-(W_i-\bar W_P)\hat\tau_P\big)$, and the authors recommend centering $Y,W,Z$ by three leave-one-out regression forests by default. The paper's empirical illustration (§7.2) is Angrist & Evans' (1998) same-sex-siblings instrument for the effect of a third child on mothers' labor-force participation: $n=334{,}535$ married mothers (1980 census), overall LATE $0.14\pm0.054$; the forest ($s/n=0.05$, minimum leaf size 800, $B=100{,}000$ trees) suggests the effect "is driven by mothers whose husbands have a lower income."

## Examples

**Table 1 of the paper — value of orthogonalization** (MSE $\times10$; $B=2000$; 60 replications; WA-1/WA-2 are Wager–Athey Procedures 1/2; C. GRF = GRF with local centering):

| confounding | heterogeneity | $p$ | $n$ | WA-1 | WA-2 | GRF | C. GRF |
|---|---|---|---|---|---|---|---|
| no | yes | 10 | 800 | 1.37 | 6.48 | 0.85 | 0.87 |
| yes | no | 10 | 800 | 0.81 | 0.16 | 1.12 | 0.27 |
| yes | yes | 10 | 800 | 4.51 | 7.67 | 1.92 | **0.91** |
| yes | yes | 20 | 1600 | 3.54 | 8.61 | 1.55 | **0.57** |

WA-1 (effect-variance splits) handles heterogeneity but not confounding; WA-2 (propensity trees) the reverse — and the practitioner was "forced to choose." Centered GRF is near-best in both pure settings and clearly best when both are present.

**Usage sketch.**

```r
library(grf)
Y.hat <- predict(regression_forest(X, Y))$predictions      # out-of-bag = leave-one-out
W.hat <- predict(regression_forest(X, W))$predictions
cf  <- causal_forest(X, Y, W, Y.hat = Y.hat, W.hat = W.hat) # local centering
ivf <- instrumental_forest(X, Y, W, Z)                       # conditional LATE
qf  <- quantile_forest(X, Y, quantiles = c(0.1, 0.5, 0.9))
average_treatment_effect(cf)                                 # AIPW average of the CATE fit
```

## Connections

- [[Honest Trees and Causal Forests]] — Procedure 1 is "almost equivalent to a generalized random forest without centering"; the differences are exact-vs-gradient splitting and tree-averaging-vs-weighting.
- [[Asymptotic Normality and Inference for Forests]] — consistency (Thm 3), the pseudo-forest coupling (Lemma 4), the CLT (Thm 5) and bootstrap-of-little-bags intervals (Thm 6).
- [[Neyman Orthogonality]], [[Regularization Bias and the Partially Linear Model]], [[R-Learner and Orthogonal CATE Estimation]] — local centering is the R-learner idea with forest-kernel localization; Nie & Wager describe GRF as using Robinson's decomposition for "local parametric modeling."
- [[GMM Estimation and Instruments for Price Endogeneity]], [[Method of Simulated Moments]] — GRF is *local* (forest-weighted) method-of-moments; any just-identified moment model with computable $\psi$ and $\nabla\psi$ can be plugged in.
- [[Instrumental Variables]], [[Local Average Treatment Effects]] — heterogeneous IV.
- [[Quantile Regression]] — quantile forests as the nonparametric version.
- [[Metalearners for CATE]], [[Nonparametric Causal Inference]] — alternative CATE estimators (metalearners; BART).

## See Also

- [[DML Estimators for ATE and the Interactive Model]] — for averaging a fitted $\hat\tau(\cdot)$ into an ATE with valid inference, use the AIPW score with the forest's nuisance estimates.
- [[Common Support and Overlap]] — local centering does not remove the need for overlap; $\mathrm{Var}[W\mid X=x]$ must be invertible (Assumption 2).
- [[Shape (Saturation) Effects]] — conditional average partial effects of a continuous spend variable are local slopes of a response curve; GRF estimates them without a parametric saturation form.
