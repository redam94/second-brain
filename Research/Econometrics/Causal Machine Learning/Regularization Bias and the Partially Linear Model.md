---
title: Regularization Bias and the Partially Linear Model
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/semiparametric-inference
  - type/concept
  - doc/paper
source: "[[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]]"
source_location: "§1.1 (pp. 2-8), Figures 1-2; §4.1 (pp. 31-33), Theorem 4.1, Remarks 4.2-4.3"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Neyman Orthogonality]]"
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
aliases:
  - Partially Linear Regression Model
  - PLR Model
  - Regularization Bias
  - Robinson Partialling-Out
  - Double Prediction
---

# Regularization Bias and the Partially Linear Model

> [!summary]
> The **partially linear regression (PLR) model** $Y=D\theta_0+g_0(X)+U$, $D=m_0(X)+V$ (Robinson 1988) is the lead example of Chernozhukov et al. (2018). A *naive* ML estimator — learn $g_0$ with a regularized learner, then regress $Y-\hat g_0(X)$ on $D$ — fails to be $\sqrt n$-consistent: its scaled error contains a term $b$ of order $\sqrt n\,n^{-\varphi_g}\to\infty$ because $D$ is centered at $m_0(X)\neq0$ and correlates with the bias in $\hat g_0$. Partialling $X$ out of $D$ as well ("**double** prediction") replaces this with a term proportional to the *product* $(\hat m_0-m_0)(\hat g_0-g_0)$, bounded by $\sqrt n\,n^{-(\varphi_m+\varphi_g)}$, which vanishes whenever both learners beat the $n^{-1/4}$ rate. This is the origin of the name *double/debiased* machine learning.

## Overview

The PLR model captures a causal design with selection on observables: if $D$ is as good as randomly assigned given $X$ (the [[Conditional Independence Assumption]]), $\theta_0$ is the average treatment effect of $D$ — "the 'lift' parameter in business applications" (§1.1, p. 2). The first equation is the outcome model; the second "keeps track of confounding, namely the dependence of the treatment variable on controls" and is "not of interest per se but is important for characterizing and removing regularization bias." The dimension $p$ of $X$ is modeled as growing with $N$, so the nuisance $\eta_0=(m_0,g_0)$ lives in a space whose entropy grows with the sample — outside classical semiparametrics.

Why not just fit $Y\sim D\theta+g(X)$ with a flexible learner that leaves $\theta$ unpenalized (e.g. alternate between a random forest for $g$ and OLS for $\theta$)? Because every useful high-dimensional learner trades variance for bias, and that bias leaks into $\hat\theta_0$ through the correlation between $D$ and $X$. This is [[Omitted Variables Bias]] in a new guise: the "omitted variable" is the part of $g_0(X)$ that regularization shrank away, and it is correlated with $D$ through $m_0(X)$.

## Main Content

> [!definition] Partially linear regression model ^def-plr
> $$
> Y = D\theta_0 + g_0(X) + U,\qquad \mathbb E[U\mid X,D]=0,
> $$
> $$
> D = m_0(X) + V,\qquad \mathbb E[V\mid X]=0,
> $$
> with outcome $Y$, scalar policy/treatment variable $D$, controls $X=(X_1,\dots,X_p)$, and nuisance $\eta_0=(m_0,g_0)$. (Vector $D$: add one equation like the second per component.)

> [!theorem] Failure of the naive plug-in estimator ^thm-naive-failure
> Split the sample into a main part $I$ (size $n$) and auxiliary part $I^c$; fit $\hat g_0$ on $I^c$ and set
> $$
> \hat\theta_0=\Big(\tfrac1n\sum_{i\in I}D_i^2\Big)^{-1}\tfrac1n\sum_{i\in I}D_i\big(Y_i-\hat g_0(X_i)\big).
> $$
> Then $\sqrt n(\hat\theta_0-\theta_0)=a+b$ with
> $$
> a=\Big(\tfrac1n\sum D_i^2\Big)^{-1}\tfrac1{\sqrt n}\sum_{i\in I}D_iU_i\rightsquigarrow\mathcal N(0,\bar\Sigma),
> $$
> $$
> b=(\mathbb E D_i^2)^{-1}\tfrac1{\sqrt n}\sum_{i\in I}m_0(X_i)\big(g_0(X_i)-\hat g_0(X_i)\big)+o_P(1).
> $$
> Term $b$ is a sum of $n$ terms with **non-zero mean** divided by $\sqrt n$. If $\hat g_0$ converges at rate $n^{-\varphi_g}$ with $\varphi_g<1/2$, then $b$ is of stochastic order $\sqrt n\,n^{-\varphi_g}\to\infty$, so $|\sqrt n(\hat\theta_0-\theta_0)|\to_P\infty$ (eq. 1.4).

Note that sample splitting alone does **not** rescue the naive estimator — $\hat g_0$ above was already fit on an independent sample. The bias is a *first-order sensitivity* problem, not an overfitting problem.

> [!theorem] The orthogonalized (double ML) estimator ^thm-dml-plr-decomp
> Also fit $\hat m_0$ on $I^c$, form $\hat V_i=D_i-\hat m_0(X_i)$ and
> $$
> \check\theta_0=\Big(\tfrac1n\sum_{i\in I}\hat V_iD_i\Big)^{-1}\tfrac1n\sum_{i\in I}\hat V_i\big(Y_i-\hat g_0(X_i)\big).
> $$
> Then $\sqrt n(\check\theta_0-\theta_0)=a^*+b^*+c^*$ where
> $$
> a^*=(\mathbb EV^2)^{-1}\tfrac1{\sqrt n}\sum_{i\in I}V_iU_i\rightsquigarrow\mathcal N(0,\Sigma),
> $$
> $$
> b^*=(\mathbb EV^2)^{-1}\tfrac1{\sqrt n}\sum_{i\in I}\big(\hat m_0(X_i)-m_0(X_i)\big)\big(\hat g_0(X_i)-g_0(X_i)\big),
> $$
> so $|b^*|\lesssim\sqrt n\,n^{-(\varphi_m+\varphi_g)}$, which vanishes e.g. when $\varphi_m,\varphi_g>1/4$. The remainder $c^*$ contains terms like $\tfrac1{\sqrt n}\sum_{i\in I}V_i(\hat g_0(X_i)-g_0(X_i))$ and is $o_P(1)$ **because of sample splitting** (see [[Cross-Fitting and Sample Splitting]]).

$\check\theta_0$ is a linear IV estimator with instrument $\hat V$: the residualized treatment is, by construction, (approximately) uncorrelated with anything that is a function of $X$, including the error in $\hat g_0$. A second, first-order-equivalent version is Robinson's pure **partialling-out** estimator,
$$
\check\theta_0=\Big(\tfrac1n\sum_{i\in I}\hat V_i\hat V_i\Big)^{-1}\tfrac1n\sum_{i\in I}\hat V_i\big(Y_i-\hat\ell_0(X_i)\big),\qquad \ell_0(X)=\mathbb E[Y\mid X],
$$
i.e. regress the outcome residual on the treatment residual — an ML-powered Frisch–Waugh–Lovell. Its practical advantage: both nuisances, $\ell_0$ and $m_0$, are plain conditional means that any off-the-shelf learner can target, whereas $g_0(X)=\mathbb E[Y-D\theta_0\mid X]$ depends on the unknown $\theta_0$.

> [!theorem] Theorem 4.1 — DML inference in the PLR model ^thm-dml-plr
> Under Assumption 4.1 (moment bounds with $q>4$; $\mathbb E[V^2]\ge c$; bounded conditional variances; nuisance estimators with $\|\hat\eta_0-\eta_0\|_{P,2}\le\delta_N$ and the **product-rate condition** $\|\hat m_0-m_0\|_{P,2}\times\|\hat g_0-g_0\|_{P,2}\le\delta_NN^{-1/2}$ for score (4.3), or $\|\hat m_0-m_0\|_{P,2}\times(\|\hat m_0-m_0\|_{P,2}+\|\hat\ell_0-\ell_0\|_{P,2})\le\delta_NN^{-1/2}$ for score (4.4)), the cross-fit DML1 and DML2 estimators are first-order equivalent and
> $$
> \sigma^{-1}\sqrt N(\tilde\theta_0-\theta_0)\rightsquigarrow\mathcal N(0,1),\qquad \sigma^2=[\mathbb E V^2]^{-1}\,\mathbb E[V^2U^2]\,[\mathbb EV^2]^{-1},
> $$
> uniformly over $P\in\mathcal P$; the plug-in $\hat\sigma^2$ is consistent and $[\tilde\theta_0\pm\Phi^{-1}(1-\alpha/2)\hat\sigma/\sqrt N]$ is uniformly valid.

Two remarks sharpen this. **Efficiency (Remark 4.2):** under homoscedasticity $\sigma^2=\mathbb E[V^2]^{-1}\mathbb E[U^2]$, the semiparametric efficiency bound. **Tightness (Remark 4.3):** if $g_0,m_0$ are sparse with indices $s_g,s_m$ and estimated by $\ell_1$-penalization at rates $\sqrt{s_g/N},\sqrt{s_m/N}$, the product-rate condition reads $s_gs_m\ll N$ — far weaker than the $(s_g)^2+(s_m)^2\ll N$ needed without sample splitting. A very sparse propensity permits a dense outcome model and vice versa; if $m_0$ is known (a randomized experiment), mere *consistency* of $\hat g_0$ suffices.

**The variance tells you where identification comes from.** $\sigma^2\propto1/\mathbb E[V^2]$: precision is driven by the variation in treatment *not* predicted by $X$. If a flexible $\hat m_0$ predicts $D$ almost perfectly, $\mathbb E[V^2]\approx0$ and no method can help — the continuous-treatment analogue of an [[Common Support and Overlap|overlap]] failure.

## Examples

**Figure 1 of the paper (n = 500, p = 20).** $g_0$ is "a very smooth function of a small number of variables" — a setting favorable to random forests. The naive forest-based $\hat\theta_0$ has a histogram "badly biased, shifted much to the right" of the truth and poorly described by its nominal normal approximation. On *the same simulated data*, the orthogonal estimator $\check\theta_0$ with forest nuisances is centered at $\theta_0$ and matches the $\mathcal N(0,\Sigma)$ curve.

**Code sketch** (partialling-out score with cross-fitting; any scikit-learn regressors):

```python
import numpy as np
from sklearn.model_selection import KFold
from sklearn.ensemble import RandomForestRegressor

def dml_plr(Y, D, X, K=5, seed=0):
    res_y, res_d = np.zeros_like(Y, float), np.zeros_like(D, float)
    for train, test in KFold(K, shuffle=True, random_state=seed).split(X):
        l_hat = RandomForestRegressor(500, min_samples_leaf=5).fit(X[train], Y[train])
        m_hat = RandomForestRegressor(500, min_samples_leaf=5).fit(X[train], D[train])
        res_y[test] = Y[test] - l_hat.predict(X[test])   # Y - l_hat(X)
        res_d[test] = D[test] - m_hat.predict(X[test])   # V_hat = D - m_hat(X)
    theta = (res_d @ res_y) / (res_d @ res_d)            # DML2: pooled moment
    psi = (res_y - theta * res_d) * res_d                # score at theta
    J = np.mean(res_d ** 2)
    se = np.sqrt(np.mean(psi ** 2) / J ** 2 / len(Y))    # sandwich, Thm 3.2
    return theta, se
```

In the 401(k) application, this PLR estimator gives an eligibility effect of \$7,717–\$9,247 across learners (s.e. $\approx$ \$1,300–\$1,750 with the split-adjusted median method).

## Connections

- [[Neyman Orthogonality]] — the general principle of which "$b$ vs $b^*$" is the special case: $\partial_g\mathbb E[(Y-\theta D-g)D]\ne0$ but $\partial_\eta\mathbb E[(Y-D\theta-g)(D-m)]=0$.
- [[Cross-Fitting and Sample Splitting]] — controls $c^*$ and restores full-sample efficiency.
- [[DML Estimators for ATE and the Interactive Model]] — drops the additive-separability restriction for binary $D$.
- [[R-Learner and Orthogonal CATE Estimation]] — lets $\theta_0$ become a function $\tau(X)$ in the same residual-on-residual equation.
- [[Omitted Variables Bias]] — regularization bias is OVB where the omitted term is $g_0-\hat g_0$.
- [[Horseshoe and Regularized Horseshoe Priors]] — shrinkage priors on control coefficients create the same leak into a treatment coefficient; residualizing the treatment (or including a propensity estimate) is the analogous Bayesian remedy.

## See Also

- [[Table 2 Fallacy]] — $g_0$ and $m_0$ are nuisances; their fitted "effects" have no causal reading.
- [[Instrumental Variables]] — the partially linear IV model (§4.2) replaces $D-m(X)$ with $Z-m(X)$ in the score: $\psi=(Y-D\theta-g(X))(Z-m(X))$.
- [[Frequentist Causal Estimation]] — outcome-regression estimators are the "naive plug-in" family that this note shows to be fragile under ML.
- [[Regression and the CEF]] — the classical regression-anatomy logic that partialling-out generalizes.
