---
title: Cross-Fitting and Sample Splitting
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/semiparametric-inference
  - type/method
  - doc/paper
source: "[[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]]"
source_location: "§1.1 (pp. 5-8), Figure 2, eqs. 1.6-1.7; §3.1 (pp. 23-24), Definitions 3.1-3.2, Remark 3.1; §3.2 Theorems 3.1-3.2, Corollary 3.1; §3.4 (pp. 30-31), Definition 3.3"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Regularization Bias and the Partially Linear Model]]"
  - "[[Neyman Orthogonality]]"
used_by:
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Honest Trees and Causal Forests]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
aliases:
  - Cross-Fitting
  - DML1 and DML2
  - Sample Splitting for Nuisance Estimation
  - K-fold Cross-Fitting
  - Median Aggregation over Splits
---

# Cross-Fitting and Sample Splitting

> [!summary]
> **Cross-fitting** is the second generic ingredient of DML. Nuisance functions are estimated on the complement $I_k^c$ of each fold and the orthogonal score is evaluated only on the held-out fold $I_k$; roles are rotated across $K$ folds and the results aggregated. Because $\hat\eta_{0,k}$ is independent of the observations in $I_k$, remainder terms such as $\frac1{\sqrt n}\sum_{i\in I}V_i(\hat g_0(X_i)-g_0(X_i))$ have conditional mean zero and vanishing variance — a one-line Chebyshev argument that **replaces Donsker/entropy conditions**, which fail for high-dimensional ML function classes. Rotation restores full-sample efficiency. Two variants, **DML1** (average the fold estimates) and **DML2** (solve one pooled estimating equation; recommended), are asymptotically equivalent; $K=4$–$5$ is recommended; and the residual dependence on the random partition is handled by repeating over $S$ splits and reporting the **median** with a split-adjusted variance.

## Overview

[[Neyman Orthogonality]] neutralizes *regularization* bias. A different bias comes from *overfitting*: if observation $i$ helped fit $\hat g_0$, then the estimation error $\hat g_0(X_i)-g_0(X_i)$ is correlated with that observation's own structural errors $U_i,V_i$, and the remainder $c^*$ in the PLR decomposition need not vanish. The paper's contrived but instructive example (p. 6): let $\hat g_0(X_i)=g_0(X_i)+(Y_i-g_0(X_i))/N^{1/2-\epsilon}$ in-sample. This estimator converges uniformly at the nearly parametric rate $N^{-1/2+\epsilon}$ — excellent by any predictive yardstick — yet without sample splitting
$$
\frac1{\sqrt N}\sum_{i=1}^NV_i\big(\hat g_0(X_i)-g_0(X_i)\big)\propto N^{\epsilon}\to\infty .
$$
Figure 2 shows the resulting studentized $\check\theta$ shifted markedly left; 2-fold cross-fitting with the *same* overfit learner removes the bias entirely while keeping the same spread as the full-sample estimator.

## Main Content

> [!theorem] Why splitting works ^thm-split-chebyshev
> Let $\hat g_0$ be fit only on the auxiliary sample $I^c$. Conditional on $I^c$, and using independence across observations and $\mathbb E[V_i\mid X_i]=0$, the term
> $$
> \frac1{\sqrt n}\sum_{i\in I}V_i\big(\hat g_0(X_i)-g_0(X_i)\big)
> $$
> has mean zero and variance of order $\frac1n\sum_{i\in I}(\hat g_0(X_i)-g_0(X_i))^2\to_P0$, so it vanishes in probability by Chebyshev's inequality. Only $L_2$-**consistency** of $\hat g_0$ is used — no complexity restriction on the learner.

The classical alternative bounds the same term by an empirical-process supremum $\sup_{g\in\mathcal G_N}|\frac1{\sqrt n}\sum V_i(g(X_i)-g_0(X_i))|$ and requires $\mathcal G_N$ to be Donsker (bounded entropy integral). But even the linear class $\{x\mapsto x'\theta:\theta\in\mathbb R^{p_N},\|\theta\|\le1\}$ has log-covering number growing like $p_N$, so Donsker conditions "rule out even the simplest linear parametric model with high-dimensional regressors." Entropy-growth conditions can substitute, but at a price: in sparse IV, Belloni et al. (2012) need $s^2\ll n$ without splitting and only $s\ll n$ with it; in PLR/ATE the requirement improves from $(s_g)^2+(s_m)^2\ll N$ to $s_gs_m\ll N$.

> [!algorithm] DML1 (Definition 3.1) ^alg-dml1
> 1. Take a $K$-fold random partition $(I_k)_{k=1}^K$ of $[N]$ with $|I_k|=n=N/K$; let $I_k^c=[N]\setminus I_k$.
> 2. For each $k$, construct an ML estimator $\hat\eta_{0,k}=\hat\eta_0((W_i)_{i\in I_k^c})$.
> 3. For each $k$, solve $\mathbb E_{n,k}[\psi(W;\check\theta_{0,k},\hat\eta_{0,k})]=0$, where $\mathbb E_{n,k}$ is the empirical mean over fold $I_k$ (or an $\epsilon_N$-approximate solution, $\epsilon_N=o(\delta_NN^{-1/2})$).
> 4. Aggregate: $\tilde\theta_0=\frac1K\sum_{k=1}^K\check\theta_{0,k}$.

> [!algorithm] DML2 (Definition 3.2) ^alg-dml2
> Steps 1–2 as in DML1. Then
> 3. Solve the single pooled equation $\frac1K\sum_{k=1}^K\mathbb E_{n,k}[\psi(W;\tilde\theta_0,\hat\eta_{0,k})]=0$.

> [!theorem] Remark 3.1 — practical recommendations ^thm-dml-recommendations
> - The choice of $K$ has **no asymptotic impact**, but larger $K$ gives more data ($N(K-1)/K$) to the hard problem of learning $\eta_0$; "moderate values of $K$, such as 4 or 5, … work better than $K=2$."
> - **DML2 is generally recommended**: the pooled empirical Jacobian in (3.4) is more stable than fold-specific Jacobians in (3.1). For scores where the Jacobian is constant (ATE in the interactive model, $\psi^a=-1$) the two coincide.

Under Assumptions 3.1–3.2 (see [[Neyman Orthogonality#^thm-rates|rate requirements]]), Theorem 3.1 gives the linear representation
$$
\sqrt N\sigma^{-1}(\tilde\theta_0-\theta_0)=\frac1{\sqrt N}\sum_{i=1}^N\bar\psi(W_i)+O_P(\rho_N)\rightsquigarrow\mathcal N(0,I_d),\qquad\rho_N=N^{-1/2}+r_N+r_N'+N^{1/2}\lambda_N+N^{1/2}\lambda_N',
$$
for both DML1 and DML2 — the *full* sample size $N$ appears, so nothing is lost to splitting asymptotically ("the two estimators will be approximately independent, so simply averaging them offers an efficient procedure").

> [!theorem] Cross-fit variance estimator and confidence intervals (Thm 3.2, Cor. 3.1) ^thm-dml-variance
> $$
> \hat\sigma^2=\hat J_0^{-1}\,\frac1K\sum_{k=1}^K\mathbb E_{n,k}\big[\psi(W;\tilde\theta_0,\hat\eta_{0,k})\psi(W;\tilde\theta_0,\hat\eta_{0,k})'\big]\,(\hat J_0^{-1})',\qquad\hat J_0=\frac1K\sum_{k=1}^K\mathbb E_{n,k}[\psi^a(W;\hat\eta_{0,k})],
> $$
> satisfies $\hat\sigma^2=\sigma^2+O_P(\varrho_N)$, and $\mathrm{CI}=[\ell'\tilde\theta_0\pm\Phi^{-1}(1-\alpha/2)\sqrt{\ell'\hat\sigma^2\ell/N}]$ obeys $\sup_{P\in\mathcal P_N}|\mathbb P_P(\ell'\theta_0\in\mathrm{CI})-(1-\alpha)|\to0$.

> [!algorithm] Accounting for the random partition (Definition 3.3) ^alg-median-splits
> Repeat the whole procedure for $S$ independent random partitions to obtain $(\tilde\theta_0^s,\hat\sigma_s^2)_{s=1}^S$, then report
> $$
> \tilde\theta_0^{\text{median}}=\mathrm{median}\{\tilde\theta_0^s\}_{s=1}^S,\qquad
> \hat\sigma^{2,\text{median}}=\mathrm{median}\big\{\hat\sigma_s^2+(\tilde\theta_0^s-\tilde\theta_0^{\text{median}})(\tilde\theta_0^s-\tilde\theta_0^{\text{median}})'\big\}_{s=1}^S
> $$
> (or the mean analogues). The medians are recommended as "more robust to outliers." For fixed $S$ they are first-order equivalent to a single-split $\tilde\theta_0$ (Corollary 3.3); the added term inflates the variance by the across-split dispersion.

**Lineage.** Sample splitting in semiparametrics goes back to Bickel (1982) and Schick (1986); the targeted-learning literature has cross-validated TMLE variants. The same idea reappears *inside* each tree of a causal forest as **honesty** ([[Honest Trees and Causal Forests]]) — splits are chosen on one half-sample, leaf effects estimated on the other — and the forest's subsampling plays the role that fold rotation plays here: every observation is used for both purposes in *some* tree, so no data are wasted. GRF's local centering uses leave-one-out (out-of-bag) forest predictions as a computationally cheap stand-in for $K$-fold cross-fitting, while noting that "a practitioner wanting to use results that are precisely covered by theory may prefer to use cross-fitting."

**Cross-fitting is not cross-validation.** Cross-validation uses held-out folds to *choose* a model by predictive loss; cross-fitting uses held-out folds to *evaluate a score* with nuisances fit elsewhere. They nest naturally: tune each nuisance learner by CV *within* $I_k^c$, then predict on $I_k$. Tuning on the full sample before cross-fitting reintroduces a (usually small) dependence between $\hat\eta_{0,k}$ and fold $k$.

## Examples

**Empirical sensitivity to $K$ and to the split (paper §6).** All tables report DML2 with the median method over $S=100$ splits, with two standard errors: the median single-split s.e. [brackets] and the split-adjusted s.e. (parentheses).

| Application | Learner | 2-fold | 5-fold |
|---|---|---|---|
| Penn. bonus, interactive ATE | Lasso | $-0.081$ [0.036] (0.036) | $-0.081$ [0.036] (0.036) |
| Penn. bonus, interactive ATE | Forest | $-0.074$ [0.036] (0.036) | $-0.074$ [0.036] (0.036) |
| 401(k), interactive ATE | Lasso | 6830 [1282] (1530) | 7170 [1201] (1398) |
| 401(k), interactive ATE | Forest | 7770 [1276] (1363) | 8105 [1242] (1299) |
| 401(k), PLR | Lasso | 7717 [1346] (1749) | 8187 [1298] (1558) |

In the randomized bonus experiment the split contributes nothing visible; in the observational 401(k) study the split-adjusted s.e. is up to 30% larger under 2-fold lasso and the gap shrinks with 5 folds — direct evidence for the "$K=4$ or $5$" advice and for reporting across-split dispersion.

**Pseudocode.**

```text
for s in 1..S:                        # repeated random partitions
    folds <- random K-fold partition of 1..N
    for k in 1..K:
        eta_hat[k] <- fit_ML(W[-folds[k]])        # tune by CV inside the training part
        psi_a[k], psi_b[k] <- score_parts(W[folds[k]], eta_hat[k])
    theta[s]  <- - sum_k mean(psi_b[k]) / sum_k mean(psi_a[k])          # DML2, linear score
    sigma2[s] <- mean_k mean((psi_a[k]*theta[s] + psi_b[k])^2) / mean_k(mean(psi_a[k]))^2
report median(theta), sqrt( median(sigma2 + (theta - median(theta))^2) / N )
```

## Connections

- [[Neyman Orthogonality]] — the companion ingredient; with a non-orthogonal score, cross-fitting alone still leaves the divergent term $b$.
- [[DML Estimators for ATE and the Interactive Model]] — cross-fit AIPW.
- [[Honest Trees and Causal Forests]] and [[Asymptotic Normality and Inference for Forests]] — honesty as within-tree sample splitting, needed for centered Gaussian limits.
- [[R-Learner and Orthogonal CATE Estimation]] — uses $Q=5$ or $10$ fold cross-fitting for $\hat m^{(-q(i))}$ and $\hat e^{(-q(i))}$.
- [[X-Learner]] and [[Metalearners for CATE]] — metalearners also fit base learners on held-out data, but without an orthogonal objective the quasi-oracle guarantee fails.
- [[Overfitting and Information Criteria]], [[Model Selection and Overfitting]] — the predictive notion of overfitting; here the concern is its *inferential* consequence for a downstream parameter.

## See Also

- [[Permutation Tests and Exact Inference]] — another resampling device, but for the reference distribution rather than for nuisance estimation.
- [[Simultaneous Inference via Multiplier Bootstrap]] — bootstrap inference built on estimated influence functions, which DML supplies.
- [[Doubly-Robust Estimands for ATT(g,t)]] — DR DiD estimators to which cross-fitting applies when nuisances are learned by ML.
