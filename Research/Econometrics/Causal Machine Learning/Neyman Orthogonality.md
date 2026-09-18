---
title: Neyman Orthogonality
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/semiparametric-inference
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]]"
source_location: "§1.1 (pp. 8-9); §2.1-2.2 (pp. 11-23), Definitions 2.1-2.2, Lemma 2.1, Example 2.1, §2.2.5; §3.2 (pp. 24-28), Assumptions 3.1-3.2, Theorem 3.1"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Regularization Bias and the Partially Linear Model]]"
used_by:
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
aliases:
  - Neyman Orthogonal Score
  - Orthogonal Moment Condition
  - Orthogonal Score
  - Locally Robust Moment
  - Neyman Near-Orthogonality
---

# Neyman Orthogonality

> [!summary]
> A score $\psi(W;\theta,\eta)$ identifying $\theta_0$ via $\mathbb E_P[\psi(W;\theta_0,\eta_0)]=0$ is **Neyman orthogonal** if its pathwise (Gateaux) derivative with respect to the nuisance $\eta$ vanishes at the truth: $\partial_\eta\mathbb E_P\psi(W;\theta_0,\eta_0)[\eta-\eta_0]=0$. The moment condition is then *locally insensitive* to nuisance error, so noisy, regularized ML estimates $\hat\eta_0$ can be plugged in without first-order damage: the remaining bias is *second order* (a product or square of nuisance errors), and $\sqrt N$-inference on $\theta_0$ needs only $\|\hat\eta_0-\eta_0\|=o(N^{-1/4})$. The idea is due to Neyman (1959, 1979; the $C(\alpha)$ test); Chernozhukov et al. (2018) make it, together with [[Cross-Fitting and Sample Splitting|cross-fitting]], one of the two generic keys of DML.

## Overview

Think of the population moment $M(\theta,\eta)=\mathbb E_P[\psi(W;\theta,\eta)]$ as a surface over $(\theta,\eta)$. The estimator $\tilde\theta_0$ solves $\hat M(\theta,\hat\eta_0)=0$. A Taylor expansion in the nuisance direction gives

$$
M(\theta_0,\hat\eta_0)=\underbrace{M(\theta_0,\eta_0)}_{=0}+\underbrace{\partial_\eta M(\theta_0,\eta_0)[\hat\eta_0-\eta_0]}_{\text{first order}}+\underbrace{\tfrac12\partial_\eta^2M[\hat\eta_0-\eta_0]^{2}}_{\text{second order}}+\dots
$$

After scaling by $\sqrt N$, the first-order term is $\sqrt N\times O(N^{-\varphi})\to\infty$ for any ML learner with $\varphi<1/2$ — that is term $b$ in [[Regularization Bias and the Partially Linear Model]]. Orthogonality sets the first-order term to zero by construction, leaving $\sqrt N\times O(N^{-2\varphi})$, which vanishes for $\varphi>1/4$.

## Main Content

> [!definition] Pathwise derivative and Neyman orthogonality (Def. 2.1) ^def-neyman-orth
> Let $T$ be a convex nuisance space and $\mathcal T_N\subset T$ a *nuisance realization set* containing $\hat\eta_0$ with high probability (a shrinking neighborhood of $\eta_0$). Define
> $$
> D_r[\eta-\eta_0]:=\partial_r\,\mathbb E_P\big[\psi(W;\theta_0,\eta_0+r(\eta-\eta_0))\big],\qquad r\in[0,1),
> $$
> and write $\partial_\eta\mathbb E_P\psi(W;\theta_0,\eta_0)[\eta-\eta_0]:=D_0[\eta-\eta_0]$. The score $\psi$ obeys the **orthogonality condition** at $(\theta_0,\eta_0)$ with respect to $\mathcal T_N$ if $\mathbb E_P\psi(W;\theta_0,\eta_0)=0$ and
> $$
> \partial_\eta\mathbb E_P\psi(W;\theta_0,\eta_0)[\eta-\eta_0]=0\quad\text{for all }\eta\in\mathcal T_N .
> $$

> [!definition] Near-orthogonality (Def. 2.2) ^def-near-orth
> $\psi$ is $\lambda_N$ **near-orthogonal** if $\|\partial_\eta\mathbb E_P\psi(W;\theta_0,\eta_0)[\eta-\eta_0]\|\le\lambda_N$ for all $\eta\in\mathcal T_N$, with $\lambda_N=o(N^{-1/2})$. This covers scores whose orthogonalizing parameter is itself regularized (e.g. a lasso-estimated $\mu_0$ satisfying $\|J_{\theta\beta}-\mu J_{\beta\beta}\|_q\le r_N$).

**Check on the PLR model.** For the naive score $\varphi=(Y-\theta D-g(X))D$, a perturbation $\delta_g=g-g_0$ gives $\partial_g\mathbb E\varphi[\delta_g]=-\mathbb E[\delta_g(X)D]=-\mathbb E[\delta_g(X)m_0(X)]\ne0$. For the DML score $\psi=(Y-D\theta-g(X))(D-m(X))$ with $\eta=(g,m)$,
$$
\partial_\eta\mathbb E\psi[\delta_g,\delta_m]=-\mathbb E[\delta_g(X)\,V]-\mathbb E[U\,\delta_m(X)]=0,
$$
because $\mathbb E[V\mid X]=0$ and $\mathbb E[U\mid X,D]=0$. The second derivative is $2\,\mathbb E[\delta_g(X)\delta_m(X)]$ — the product structure that produces term $b^*$.

### Constructing orthogonal scores (§2.2)

> [!theorem] Neyman's construction for (quasi-)likelihood problems (Lemma 2.1) ^thm-neyman-construction
> Let $(\theta_0,\beta_0)$ maximize $\mathbb E_P[\ell(W;\theta,\beta)]$ with finite-dimensional nuisance $\beta$, and let $J=\partial_{(\theta',\beta')}\mathbb E_P[\partial_{(\theta',\beta')'}\ell]$ be partitioned into $J_{\theta\theta},J_{\theta\beta},J_{\beta\theta},J_{\beta\beta}$. The score
> $$
> \psi(W;\theta,\eta)=\partial_\theta\ell(W;\theta,\beta)-\mu\,\partial_\beta\ell(W;\theta,\beta),\qquad \eta=(\beta',\mathrm{vec}(\mu)')',
> $$
> with $\mu_0=J_{\theta\beta}J_{\beta\beta}^{-1}$ solving $J_{\theta\beta}-\mu J_{\beta\beta}=0$, is Neyman orthogonal at $(\theta_0,\eta_0)$ — with respect to both $\beta$ **and** $\mu$. When $\ell$ is the true log-likelihood, $\psi$ is also the *efficient score* (Remark 2.2).

In words: project the $\theta$-score off the span of the nuisance scores. Applied to the high-dimensional linear model $Y=D\theta_0+X'\beta_0+U$, $D=X'\gamma_0+V$ (Example 2.1), one gets $J_{\theta\beta}=-\mathbb E[DX']$, $J_{\beta\beta}=-\mathbb E[XX']$, $\mu_0=\gamma_0'$ and
$$
\psi(W;\theta,\eta)=(Y-D\theta-X'\beta)(D-\mu X),
$$
the "double lasso"/partialling-out score. The paper gives parallel constructions for GMM problems (Lemma 2.3: $\psi=\mu\,m(W;\theta,\beta)$ with $\mu$ chosen to annihilate the nuisance Jacobian $G_\beta$), for M-estimation with infinite-dimensional nuisance via **concentrating-out** (Lemma 2.5: profile $\beta_\theta=\arg\max_\beta\mathbb E\ell(W;\theta,\beta)$ and differentiate $\ell(W;\theta,\beta_\theta)$ totally in $\theta$), and for conditional moment restrictions (Lemma 2.6).

> [!theorem] Orthogonal score = original score + influence-function adjustment (§2.2.5) ^thm-if-adjustment
> If a first-step estimator $\hat\beta_0$ admits the expansion $\int\varphi(w;\theta_0,\hat\beta_0)\,dP(w)=\frac1n\sum_i\phi(W_i;\theta_0,\eta_0)+o_P(n^{-1/2})$ (Newey 1994), then
> $$
> \psi(W;\theta,\eta)=\varphi(W;\theta,\beta)+\phi(W;\theta,\eta)
> $$
> is Neyman orthogonal, and $\psi(W;\theta_0,\eta_0)$ is the influence function of the limit of $n^{-1}\sum_i\varphi(W_i;\theta_0,\hat\beta_0)$. For PLR: the derivative of $\varphi=D(Y-D\theta-g(X))$ in $g$ has conditional mean $-m_0(X)$; multiplying by the nonparametric residual gives $\phi=-m_0(X)\{Y-D\theta-g(X)\}$ and hence $\psi=\{D-m_0(X)\}\{Y-D\theta-g(X)\}$.

This is why the AIPW/doubly-robust score is orthogonal ([[DML Estimators for ATE and the Interactive Model]]): it is the plug-in $g(1,X)-g(0,X)-\theta$ plus the influence-function correction for estimating $g$.

### What orthogonality buys (§3.2)

> [!theorem] Rate requirements under orthogonality ^thm-rates
> For linear scores $\psi=\psi^a(W;\eta)\theta+\psi^b(W;\eta)$, Assumptions 3.1–3.2 require (near-)orthogonality with $\lambda_N\le\delta_NN^{-1/2}$, identification ($J_0=\mathbb E_P[\psi^a(W;\eta_0)]$ with singular values in $[c_0,c_1]$), and statistical rates
> $$
> r_N,\ r_N'\le\delta_N,\qquad \lambda_N':=\sup_{r\in(0,1),\eta\in\mathcal T_N}\big\|\partial_r^2\mathbb E_P[\psi(W;\theta_0,\eta_0+r(\eta-\eta_0))]\big\|\le\delta_N/\sqrt N .
> $$
> In smooth problems $r_N,r_N'\lesssim\varepsilon_N$ and $\lambda_N'\lesssim\varepsilon_N^2$ where $\|\hat\eta_0-\eta_0\|_{P,2}\lesssim\varepsilon_N$, so the **crude requirement** is $\varepsilon_N=o(N^{-1/4})$ (eq. 3.8). When the second derivative vanishes identically, $\lambda_N'=0$ — the optimal-instrument problem, PLR with known $m_0$, and treatment-effect problems with **known propensity score (RCTs)** — the requirement collapses to mere consistency, $\varepsilon_N=o(1)$.

The $o(N^{-1/4})$ rate is attainable: $\ell_1$-penalized methods under approximate sparsity, $L_2$-boosting in sparse linear models, certain trees/forests (Wager & Walther 2016), and classes of neural nets (Chen & White 1999) — the paper's list on p. 26. Given these conditions, Theorem 3.1 delivers $\sqrt N\sigma^{-1}(\tilde\theta_0-\theta_0)=\frac1{\sqrt N}\sum_i\bar\psi(W_i)+O_P(\rho_N)\rightsquigarrow\mathcal N(0,I_d)$ **uniformly over** $P\in\mathcal P_N$, with influence function $\bar\psi=-\sigma^{-1}J_0^{-1}\psi(\cdot;\theta_0,\eta_0)$ and $\sigma^2=J_0^{-1}\mathbb E_P[\psi\psi'](J_0^{-1})'$. Uniformity — robustness to perturbations of $P$ along sequences — "can be shown to fail for methods not based on orthogonal scores."

Two caveats the paper states explicitly: orthogonality is "a joint property of the score, the true parameter value $\eta_0$, the parameter set $T$, and the distribution of $W$" rather than of a model for $\theta$; and orthogonal scores need not be efficient (Remark 2.3: a regularized $\mu_0$ gives up efficiency), though if $\psi$ is the efficient score the DML estimator attains the semiparametric bound (Corollary 3.2).

## Examples

**Numerical intuition.** Suppose $N=10{,}000$ and both nuisances are learned at rate $N^{-0.35}\approx0.040$. Non-orthogonal score: bias in $\sqrt N(\hat\theta-\theta_0)$ is of order $\sqrt N\cdot N^{-0.35}=N^{0.15}\approx4.0$ — four standard-error-scale units of bias, so a nominal 95% CI has near-zero coverage. Orthogonal score: $\sqrt N\cdot N^{-0.70}=N^{-0.20}\approx0.16$ — negligible relative to the $O(1)$ Gaussian term.

**Catalogue of orthogonal scores in the DML paper.**

| Model | Score $\psi(W;\theta,\eta)$ | Nuisance $\eta$ |
|---|---|---|
| PLR (4.3) | $\{Y-D\theta-g(X)\}(D-m(X))$ | $(g,m)$ |
| PLR, Robinson (4.4) | $\{Y-\ell(X)-\theta(D-m(X))\}(D-m(X))$ | $(\ell,m)$ |
| Partially linear IV (4.7) | $(Y-D\theta-g(X))(Z-m(X))$ | $(g,m)$, $m_0=\mathbb E[Z\mid X]$ |
| PLIV, Robinson (4.8) | $(Y-\ell(X)-\theta(D-r(X)))(Z-m(X))$ | $(\ell,m,r)$ |
| ATE (5.3) | AIPW score | $(g,m)$ |
| ATTE (5.4), LATE (§5.2) | see [[DML Estimators for ATE and the Interactive Model]] | $(g,m,p)$; $(\mu,m,p)$ |

## Connections

- [[Regularization Bias and the Partially Linear Model]] — the motivating failure that orthogonality repairs.
- [[Cross-Fitting and Sample Splitting]] — orthogonality handles *bias from regularization*; splitting handles *bias from overfitting*. Both are needed.
- [[DML Estimators for ATE and the Interactive Model]] — doubly-robust scores as the canonical orthogonal scores for treatment effects.
- [[Frequentist Causal Estimation]] — "double robustness" (consistency if either nuisance model is right) and "Neyman orthogonality" (first-order insensitivity to both) are two faces of the same product-form remainder.
- [[Doubly-Robust Estimands for ATT(g,t)]] — Callaway & Sant'Anna's DR estimand is an orthogonal score for the group-time ATT.
- [[Generalized Random Forests - Local Moment Equations]] — local centering orthogonalizes the forest's local moment; [[R-Learner and Orthogonal CATE Estimation]] turns the orthogonal PLR score into a loss.
- [[GMM Estimation and Instruments for Price Endogeneity]] — GMM moments with first-stage nuisance can be orthogonalized by the Lemma 2.3 construction.

## See Also

- [[Instrumental Variables]] — optimal-instrument estimation is the prototypical case with $\lambda_N'=0$.
- [[Plausible GMM - Overview]] — another relaxation of exact moment conditions.
- [[The Experimental Ideal]] — with a known randomization probability, orthogonal scores need only consistent outcome models.
