---
title: "Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/high-dimensional-statistics
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: Abstract; §1 (pp. 1-2); §1.1 Preliminaries and examples, eqs (1)-(4) (pp. 2-3); §1.2 Outline (p. 4)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Model Selection and Overfitting]]"
  - "[[Regularization Bias and the Partially Linear Model]]"
used_by:
  - "[[Stability Paths and the Stable-Variable Set]]"
  - "[[Randomised Lasso and the Irrepresentable Condition]]"
  - "[[Stability Selection for Gaussian Graphical Models and Computational Cost]]"
aliases:
  - Structure Estimation Problem (Stability Selection)
  - Sparse Structure Estimation Setup
---

# Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso

> [!summary]
> Structure estimation means recovering the support $S=\{k:\beta_k\ne0\}$ of a sparse parameter: non-zero regression coefficients, non-zero precision-matrix entries (graph edges), or cluster structure. $\ell_1$ relaxations (Lasso, graphical Lasso) make this computationally feasible for $p\gg n$, but two problems remain. One is **how much to regularise**. The other is that recovering $S$ needs **restrictive design conditions**. Stability selection targets both with subsampling, giving finite-sample error control instead of asymptotic statements.
^summary-ss-stability-selection-setup-structure-esti

## Overview

The paper opens (§1, pp. 1-2) by naming two obstacles in discrete structure estimation: computation (the problems are combinatorial) and "determining the right amount of regularisation". Convex relaxations ($\ell_1$ penalties) and greedy algorithms (boosting, matching pursuit) have largely solved the computational side. The regularisation side, picking a right-sized model, "has largely remained a problem with unsatisfactory solutions" (§1, p. 2).

The authors' proposal is a generic subsampling approach (bootstrapping "would behave similarly"). It has three properties:
- it controls a familywise type-I error rate in finite samples;
- it is a new selection scheme in its own right;
- for the Lasso, it needs much weaker design assumptions for consistency, especially when extra randomisation is added to the selection step, in the spirit of Random Forests.

The paper stresses that subsampling had mostly been used for standard errors and confidence intervals. Here it is "of a very different nature" (§1, p. 2): it is used to select structure and to control errors.

## Main Content

### Generic notation (§1.1, p. 2)

> [!definition] Sparse structure, signal set and noise set (§1.1)
> Let $\beta\in\mathbb R^p$ be **sparse**: $\|\beta\|_0=s<p$. Define
> $$
> S=\{k:\beta_k\ne0\},\qquad N=\{k:\beta_k=0\}.
> $$
> The goal of **structure estimation** is to infer $S$ from noisy observations. Throughout, $S$ is the set of relevant variables and $N$ the noise variables, with $|S|+|N|=p$.
^def-ss-structure

### Example 1: variable selection in linear regression (eqs 1-2)

Data $(X^{(1)},Y^{(1)}),\dots,(X^{(n)},Y^{(n)})$, typically i.i.d., with univariate $Y$ and $p$-dimensional $X$:
$$
Y=X\beta+\varepsilon, \tag{1}
$$
where $Y=(Y_1,\dots,Y_n)$, $X$ is the $n\times p$ design and $\varepsilon$ has i.i.d. components.

The classical route penalises the negative log-likelihood by $\|\beta\|_0$. This is infeasible for large $p$ even with branch-and-bound. Its convex relaxation is the **Lasso** (Tibshirani 1996; Chen et al. 2001):

> [!definition] Lasso estimator and selected set (eq. 2)
> $$
> \hat\beta^\lambda=\arg\min_{\beta\in\mathbb R^p}\ \|Y-X\beta\|_2^2+\lambda\sum_{k=1}^p|\beta_k|,
> $$
> with $\lambda\in\mathbb R^+$ and columns standardised, $\|X_k\|_2^2=\sum_i (X_k^{(i)})^2=1$. The estimated support is
> $$
> \hat S^\lambda=\{k:\hat\beta^\lambda_k\ne0\}.
> $$
> The problem is convex, so it is feasible for large $p$, and it sets coefficients exactly to zero.
^def-ss-lasso

The open issues (§1.1, p. 3) are choosing $\lambda$ for consistent selection, and the "restrictive design conditions" needed to recover $S$ asymptotically. Both are developed in [[Randomised Lasso and the Irrepresentable Condition]].

### Example 2: Gaussian graphical modelling (eqs 3-4)

$$
X^{(1)},\dots,X^{(n)}\ \text{i.i.d.}\sim\mathcal N_d(\mu,\Sigma). \tag{3}
$$
$X_j$ and $X_k$ are conditionally dependent given all other components iff $(\Sigma^{-1})_{jk}\ne0$, and then the graph has an edge $j$-$k$ (Lauritzen 1996). The structure lives on the index set $G=\{(j,k):1\le j<k\le d\}$, with $p=\binom d2$, and
$$
S=\{(j,k)\in G:(\Sigma^{-1})_{jk}\ne0\}.
$$

> [!definition] Graphical Lasso (eq. 4; Friedman et al. 2008)
> $$
> \hat\Theta^\lambda=\arg\min_{\Theta\ \text{nonneg. def.}}\Big\{-\log\det\Theta+\operatorname{tr}(S\Theta)+\lambda\sum_{j<k}|\Theta_{jk}|\Big\},
> $$
> where $S$ here denotes the empirical covariance. This is the $\ell_1$-penalised Gaussian log-likelihood, partially maximised over $\mu$. Estimated edge set: $\hat S^\lambda=\{(j,k)\in G:\hat\Theta^\lambda_{jk}\ne0\}$.
^def-ss-glasso

Worked through in [[Stability Selection for Gaussian Graphical Models and Computational Cost]].

### Example 3: clustering (§1.1, p. 3)

Choosing the number of clusters is "notoriously difficult". Clusters that are stable under subsampling or perturbation are more believable, which is the idea behind consensus clustering (Monti et al. 2003). The authors state that their false-discovery control "can be applied to consensus clustering" to tune a base clustering method. The paper does not develop this further.

### Outline and positioning (§1.2, p. 4)

Resampling for validation "is certainly not new". The paper's contribution is to put it into a formal framework with empirical and theoretical guarantees. The sections are: §2 generic method, error control and examples; §3 asymptotics for Lasso and randomised Lasso; §4 numerical results; §5 discussion; Appendix proofs.

## Examples

> [!example] Mapping the setup to a marketing-analytics problem
> **Setup:** A weekly regression of a sales KPI on 60 candidate drivers (media channels at several adstock lags, price, distribution, weather, macro indices) with $n=104$ weeks. $p<n$, but many drivers are highly collinear.
> **Structure question:** Which drivers have $\beta_k\ne0$? This is $S$ in the paper's notation, and the Lasso's $\hat S^\lambda$ is one estimate.
> **Why the paper applies:** The answer changes with $\lambda$. It also changes across resamples when columns are correlated, which is the "restrictive design condition" problem. Stability selection asks which drivers are selected in most half-samples, and how many false drivers we expect for a given threshold.
^example-ss-mapping-the-setup-to

## Connections

- The Lasso's shrinkage also biases coefficient estimates, a different problem from support recovery. See [[Regularization Bias and the Partially Linear Model]] and [[DML Estimators for ATE and the Interactive Model]]. Stability selection addresses *which* variables, not *how large* the effects are.
- Bayesian alternatives to $\ell_1$ selection: [[Spike-and-Slab Prior for Covariate Selection]], [[Horseshoe and Regularized Horseshoe Priors]].
- Graph-structure selection in another model class: [[Estimation and Structure Selection for Vines]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Paths and the Stable-Variable Set]]
- [[Randomised Lasso and the Irrepresentable Condition]]
