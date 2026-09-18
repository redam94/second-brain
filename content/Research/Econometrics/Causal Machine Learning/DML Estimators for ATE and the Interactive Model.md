---
title: DML Estimators for ATE and the Interactive Model
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/treatment-effects
  - type/method
  - type/theorem
  - doc/paper
source: "[[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]]"
source_location: "§5.1 (pp. 35-37), eqs. 5.1-5.5, Assumption 5.1, Theorem 5.1, Remark 5.2; §5.2 (pp. 37-39), Theorem 5.2; §6.1-6.2, 6.4 (pp. 39-45), Tables 1-2"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Neyman Orthogonality]]"
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Causal Estimands]]"
  - "[[Common Support and Overlap]]"
used_by:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
aliases:
  - Interactive Regression Model
  - IRM
  - AIPW Score
  - Cross-Fit AIPW
  - DML for ATE ATTE and LATE
  - Doubly Robust Score
---

# DML Estimators for ATE and the Interactive Model

> [!summary]
> For a **binary treatment** with fully heterogeneous effects, Chernozhukov et al. (2018, §5) replace the partially linear model by the **interactive model** $Y=g_0(D,X)+U$, $D=m_0(X)+V$ and estimate the ATE with the **augmented inverse-probability-weighted (AIPW / doubly-robust) score** of Robins & Rotnitzky (1995) — which is [[Neyman Orthogonality|Neyman orthogonal]] — evaluated with [[Cross-Fitting and Sample Splitting|cross-fit]] ML estimates of the outcome regression $g_0$ and propensity score $m_0$. Theorem 5.1: under overlap, moment bounds and the **product-rate condition** $\|\hat m_0-m_0\|_{P,2}\times\|\hat g_0-g_0\|_{P,2}\le\delta_NN^{-1/2}$, the estimator is $\sqrt N$-consistent, asymptotically normal with variance $\mathbb E[\psi^2]$, uniformly valid, and attains Hahn's (1998) semiparametric efficiency bound. Analogous orthogonal scores handle the **ATTE** and, with a binary instrument, the **LATE**.

## Overview

The partially linear model forces a constant, additively separable effect $D\theta_0$. With binary $D\in\{0,1\}$ this is unnecessary: write the outcome regression as a free function $g_0(D,X)$, so the conditional effect $g_0(1,X)-g_0(0,X)$ varies arbitrarily with $X$. Under the [[Conditional Independence Assumption|unconfoundedness assumption]] of Rosenbaum & Rubin (1983) the ATE and ATTE are identified (see [[Causal Estimands]]); without it, the same quantities "measure association, and could be referred to as average predictive effect (APE)" (fn. 10) and the inference theory still applies.

The vault's [[Frequentist Causal Estimation]] note presents three estimator families — outcome regression, IPW, and doubly-robust. DML's contribution is to explain *why the DR form is the right one to combine with ML*: regression-only and IPW-only moments have non-zero nuisance derivatives, so ML regularization bias passes through at first order; the DR moment is the unique one (in this model, the efficient influence function) with zero derivative in *both* nuisances.

## Main Content

> [!definition] Interactive regression model (eqs. 5.1–5.2) ^def-irm
> $$
> Y=g_0(D,X)+U,\quad\mathbb E_P[U\mid X,D]=0;\qquad D=m_0(X)+V,\quad\mathbb E_P[V\mid X]=0,\quad D\in\{0,1\}.
> $$
> Targets: $\theta_0^{\text{ATE}}=\mathbb E_P[g_0(1,X)-g_0(0,X)]$ and $\theta_0^{\text{ATTE}}=\mathbb E_P[g_0(1,X)-g_0(0,X)\mid D=1]$. Here $m_0(X)=\mathbb P(D=1\mid X)$ is the propensity score.

> [!definition] Orthogonal scores ^def-aipw-score
> **ATE (eq. 5.3)** — nuisance $\eta=(g,m)$ with $m:\mathrm{supp}(X)\to(\varepsilon,1-\varepsilon)$:
> $$
> \psi(W;\theta,\eta)=\big(g(1,X)-g(0,X)\big)+\frac{D\,(Y-g(1,X))}{m(X)}-\frac{(1-D)(Y-g(0,X))}{1-m(X)}-\theta .
> $$
> **ATTE (eq. 5.4)** — nuisance $\eta=(\bar g,m,p)$ with $\bar g_0(X)=g_0(0,X)$ and $p_0=\mathbb E_P[D]$:
> $$
> \psi(W;\theta,\eta)=\frac{D\,(Y-\bar g(X))}{p}-\frac{m(X)(1-D)(Y-\bar g(X))}{p\,(1-m(X))}-\frac{D\theta}{p}.
> $$
> Estimating the ATTE does **not** require $g_0(1,X)$. Both scores satisfy $\mathbb E_P\psi(W;\theta_0,\eta_0)=0$ and $\partial_\eta\mathbb E_P\psi(W;\theta_0,\eta_0)[\eta-\eta_0]=0$.

**Verifying orthogonality for the ATE score.** Perturb $g(1,\cdot)$ by $\delta_1$: the derivative is $\mathbb E[\delta_1(X)(1-D/m_0(X))]=0$ since $\mathbb E[D\mid X]=m_0(X)$. Perturb $m$ by $\delta_m$: the derivative is $-\mathbb E[D(Y-g_0(1,X))\delta_m/m_0^2]-\mathbb E[(1-D)(Y-g_0(0,X))\delta_m/(1-m_0)^2]=0$ since $\mathbb E[U\mid X,D]=0$. The second-order term is a cross-product $\delta_m\times\delta_g$, which is why a **product** of rates appears below — and why, when $m_0$ is known (an RCT), the second derivative vanishes and only consistency of $\hat g_0$ is needed.

Both scores are linear, $\psi=\psi^a\theta+\psi^b$ with $\psi^a=-1$ (ATE) or $-D/p$ (ATTE), so DML2 has a closed form. For the ATE,
$$
\tilde\theta_0=\frac1N\sum_{k=1}^K\sum_{i\in I_k}\Big[\hat g_k(1,X_i)-\hat g_k(0,X_i)+\frac{D_i(Y_i-\hat g_k(1,X_i))}{\hat m_k(X_i)}-\frac{(1-D_i)(Y_i-\hat g_k(0,X_i))}{1-\hat m_k(X_i)}\Big],
$$
and DML1 $=$ DML2.

> [!theorem] Theorem 5.1 — DML inference on ATE and ATTE ^thm-dml-ate
> Suppose Assumption 5.1: (a) the interactive model holds; (b) $\|Y\|_{P,q}\le C$, $q>2$; (c) **overlap** $\mathbb P_P(\varepsilon\le m_0(X)\le1-\varepsilon)=1$; (d)–(e) $\|U\|_{P,2}\ge c$, $\|\mathbb E_P[U^2\mid X]\|_{P,\infty}\le C$; (f) the cross-fit nuisance estimators satisfy, with probability $\ge1-\Delta_N$, $\|\hat\eta_0-\eta_0\|_{P,q}\le C$, $\|\hat\eta_0-\eta_0\|_{P,2}\le\delta_N$, $\|\hat m_0-1/2\|_{P,\infty}\le1/2-\varepsilon$ (estimated propensities respect overlap), and
> $$
> \|\hat m_0-m_0\|_{P,2}\times\|\hat g_0-g_0\|_{P,2}\le\delta_NN^{-1/2}.
> $$
> Then DML1 and DML2 are first-order equivalent and
> $$
> \sigma^{-1}\sqrt N(\tilde\theta_0-\theta_0)\rightsquigarrow\mathcal N(0,1),\qquad\sigma^2=\mathbb E_P[\psi^2(W;\theta_0,\eta_0)],
> $$
> uniformly over $P\in\mathcal P$; $\hat\sigma^2$ from Theorem 3.2 may replace $\sigma^2$; and $[\tilde\theta_0\pm\Phi^{-1}(1-\alpha/2)\hat\sigma/\sqrt N]$ has uniform asymptotic validity. "The scores $\psi$ in (5.3) and (5.4) are efficient, so both estimators are asymptotically efficient, reaching the semi-parametric efficiency bound of Hahn (1998)."

**Rate trade-off (Remark 5.2).** With sparse $g_0,m_0$ (indices $s_g,s_m$) and $\ell_1$-penalized estimators converging at $\sqrt{s_g/N},\sqrt{s_m/N}$, the product condition is $s_gs_m\ll N$, "much weaker than the condition $(s_g)^2+(s_m)^2\ll N$ required without sample splitting." A very sparse propensity allows a dense outcome regression ($s_g>\sqrt N$) and vice versa. This is the *rate* version of double robustness: classical DR says "consistent if either model is correctly specified"; DML says "$\sqrt N$-normal if the *product* of the two errors is $o(N^{-1/2})$." The paper notes the complementary result of Athey, Imbens & Wager (2016) — approximate residual balancing — which allows an inconsistently estimated propensity at the price of strong sparsity $s_g\ll\sqrt N$ in the outcome model.

> [!definition] LATE score (§5.2) ^def-late-score
> With binary instrument $Z$, define $\mu_0(Z,X)=\mathbb E[Y\mid Z,X]$, $m_0(Z,X)=\mathbb E[D\mid Z,X]$, $p_0(X)=\mathbb E[Z\mid X]$. The target $\theta_0=\dfrac{\mathbb E_P[\mu_0(1,X)]-\mathbb E_P[\mu_0(0,X)]}{\mathbb E_P[m_0(1,X)]-\mathbb E_P[m_0(0,X)]}$ is the LATE under the Imbens–Angrist (1994) / Frölich (2007) assumptions. The orthogonal score is a ratio of two AIPW scores (one for the reduced form, one for the first stage):
> $$
> \psi=\Big[\mu(1,X)-\mu(0,X)+\tfrac{Z(Y-\mu(1,X))}{p(X)}-\tfrac{(1-Z)(Y-\mu(0,X))}{1-p(X)}\Big]-\Big[m(1,X)-m(0,X)+\tfrac{Z(D-m(1,X))}{p(X)}-\tfrac{(1-Z)(D-m(0,X))}{1-p(X)}\Big]\theta .
> $$
> Theorem 5.2 gives the same $\sqrt N$-normality under product-rate conditions $\|\hat p_0-p_0\|_{P,2}\times(\|\hat\mu_0-\mu_0\|_{P,2}+\|\hat m_0-m_0\|_{P,2})\le\delta_NN^{-1/2}$.

**Practical cautions.** (i) Overlap is an assumption, not a by-product: $1/\hat m$ and $1/(1-\hat m)$ enter the score, so extreme fitted propensities inflate $\sigma^2=\mathbb E[\psi^2]$ and the assumption $\|\hat m_0-1/2\|_{P,\infty}\le1/2-\varepsilon$ is effectively enforced in practice by trimming/clipping — see [[Common Support and Overlap]]. (ii) A highly predictive $\hat m$ is not "good": it signals limited overlap. (iii) All of this presumes no unmeasured confounding; ML on $X$ cannot fix a missing confounder ([[Sensitivity Analysis in Observational Studies]]).

## Examples

**401(k) eligibility and net financial assets (§6.2, Table 2).** Data: 1991 SIPP; $D$ = 401(k) eligibility, argued exogenous conditional on income and job-related covariates (Poterba, Venti & Wise). Earlier work controlled "only linearly for a small number of terms"; DML lets the income control be flexible.

| Model | Lasso | Reg. Tree | Forest | Boosting | Neural Net | Ensemble | Best |
|---|---|---|---|---|---|---|---|
| Interactive ATE, 5-fold | 7170 (1398) | 7993 (1236) | 8105 (1299) | 7713 (1177) | 7788 (1293) | 7839 (1148) | 7753 (1294) |
| PLR, 5-fold | 8187 (1558) | 8871 (1418) | 9247 (1328) | 9110 (1328) | 9038 (1355) | 9166 (1310) | 9215 (1312) |

(Split-adjusted s.e. in parentheses; 100 splits, median method.) Conclusions drawn in §6.4: "the choice of the ML method used in estimating nuisance functions does not substantively change the conclusion," and accounting for split uncertainty raises standard errors modestly. The same section applies the LATE score with eligibility as an instrument for 401(k) *participation* (Table 3): the 5-fold DML2 LATE ranges from \$8,944 (lasso) to \$11,764 (forest), uniformly positive and significant across learners.

**Pennsylvania reemployment bonus (§6.1, Table 1).** An RCT, so the propensity is set to the treated fraction rather than learned; the ATE on log unemployment duration is $-0.07$ to $-0.085$ (s.e. 0.036) for every learner and both models — the $\lambda_N'=0$ case in action.

**Code sketch (cross-fit AIPW).**

```python
def dml_ate(Y, D, X, fit_g, fit_m, K=5, clip=0.01):
    psi = np.zeros(len(Y))
    for train, test in KFold(K, shuffle=True).split(X):
        g1 = fit_g(X[train][D[train] == 1], Y[train][D[train] == 1])
        g0 = fit_g(X[train][D[train] == 0], Y[train][D[train] == 0])
        m  = np.clip(fit_m(X[train], D[train]).predict_proba(X[test])[:, 1], clip, 1 - clip)
        mu1, mu0 = g1.predict(X[test]), g0.predict(X[test])
        psi[test] = (mu1 - mu0 + D[test] * (Y[test] - mu1) / m
                     - (1 - D[test]) * (Y[test] - mu0) / (1 - m))
    return psi.mean(), psi.std(ddof=1) / np.sqrt(len(Y))     # theta, se = sqrt(E[psi^2]/N)
```

## Connections

- [[Frequentist Causal Estimation]] — the DR estimator; this note supplies its ML-era asymptotic theory.
- [[Neyman Orthogonality]] and [[Cross-Fitting and Sample Splitting]] — the two ingredients.
- [[Regularization Bias and the Partially Linear Model]] — the constant-effect special case; for binary $D$ the PLR coefficient is a variance-weighted average of conditional effects rather than the ATE, which is why Tables 1–2 report both.
- [[Doubly-Robust Estimands for ATT(g,t)]] — the ATTE score (5.4) is the cross-sectional analogue of Callaway & Sant'Anna's DR estimand; DML theory justifies ML nuisances there.
- [[Propensity Score Matching - Overview]], [[Propensity Score and the Balancing Property]], [[Bayesian Inverse Probability Weighting]] — alternative uses of $m_0(X)$; AIPW dominates pure IPW in efficiency and robustness.
- [[Local Average Treatment Effects]], [[Instrumental Variables]] — the complier-effect target of the LATE score.
- [[Nonparametric Causal Inference]] — BART plug-in estimation of the same ATE; a regression-only (non-orthogonal) strategy whose frequentist coverage depends on the prior not inducing regularization bias.

## See Also

- [[Honest Trees and Causal Forests]] and [[R-Learner and Orthogonal CATE Estimation]] — when the target is $\tau(x)$ rather than its average; averaging AIPW scores built from forest nuisances is how GRF-style software recovers an ATE from a CATE fit.
- [[Causal Estimands]] — ATE vs ATT vs LATE definitions.
- [[Covariate Balance and Matching Diagnostics]] — diagnostics that remain useful for checking the fitted propensity.
- [[Experimental Benchmarks for Observational Ad Measurement]] — DML tested against RCT ground truth
