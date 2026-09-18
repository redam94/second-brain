---
title: Studentized Randomization Tests
tags:
  - source/ingested
  - topic/causal-inference
  - type/theorem
  - doc/paper
source: "[[raw/Wu Ding 2021 - Randomization Tests for Weak Null Hypotheses.pdf]]"
source_location: "Secs. 3-4, 7, pp. 8-14, 26"
date_ingested: 2026-06-28
folder: "Econometrics/Foundations/Randomization Inference"
doc_type: paper
depends_on:
  - "[[Fisher Randomization Test and the Sharp Null]]"
  - "[[Sharp vs Weak Null Hypotheses]]"
  - "[[Randomization Inference - Overview]]"
used_by:
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
aliases:
  - Studentized FRT
  - Studentized Statistic
  - Wu and Ding Test
  - Dual Validity Randomization Test
  - X-squared statistic
---

# Studentized Randomization Tests

> [!summary]
> The central result of Wu & Ding (2021): running the [[Fisher Randomization Test and the Sharp Null|FRT]] with a **studentized (Wald-type) statistic** $X^2 = N(C\hat{\bar Y}-x)^{\mathsf T}(C\hat D C^{\mathsf T})^{-1}(C\hat{\bar Y}-x)$ — the estimated contrast scaled by a **heteroscedasticity-robust** covariance estimator — yields a test with **dual validity**: it is **finite-sample exact under the sharp null** $H_{0\text F}$ (a free property of any FRT) *and* **asymptotically conservative (valid type I error) under the weak null** $H_{0\text N}(C,x)$. It is model-free and **agnostic to treatment-effect heterogeneity**. Non-studentized statistics ($|\hat\tau|$, the $F$ statistic, the Box-type statistic $B$) lack this and can fail. Practical recommendation: **always use $X^2$**.

## Overview

Recall (from [[Sharp vs Weak Null Hypotheses]]) the weak null $H_{0\text N}(C,x): C\bar Y = x$. The estimator $\hat{\bar Y}=(\hat{\bar Y}(1),\dots,\hat{\bar Y}(J))^{\mathsf T}$ of arm means satisfies $N^{1/2}(\hat{\bar Y}-\bar Y)\xrightarrow{d}\mathcal N(0_J,V)$ with $V = D - S \preceq D$, where $D=\text{diag}\{S(1,1)/p_1,\dots,S(J,J)/p_J\}$. The true $V$ depends on the **unestimable** cross-arm covariances $S(j,k)$, $j\ne k$; but the diagonal "Neyman" estimator
$$
\hat D = N\,\text{diag}\{\hat S(1,1)/N_1,\dots,\hat S(J,J)/N_J\}\xrightarrow{p} D \succeq V
$$
is **conservative** (it over-estimates the true variance). Studentizing by $C\hat D C^{\mathsf T}$ is what makes the FRT robust to variance heterogeneity.

**Proposition 4 (the criterion).** The FRT with statistic $T$ controls type I error at any level for $H_{0\text N}(C,x)$ if, under the null, the **sampling** distribution of $T$ is **stochastically dominated by** its **randomization** distribution $T_\pi\mid W$ (written $T \le_{\text{st}} T_\pi\mid W$). A statistic with this property is called **proper**. The whole game is to find a $T$ that is proper; $X^2$ is.

## Main Content

> [!definition] The studentized statistic $X^2$ ^def-x2
> $$
> X^2 \;=\; N\,(C\hat{\bar Y}-x)^{\mathsf T}\,(C\hat D C^{\mathsf T})^{-1}\,(C\hat{\bar Y}-x).
> $$
> A Wald-type quadratic form using the **conservative robust** covariance estimator $C\hat D C^{\mathsf T}$ for $N^{1/2}(C\hat{\bar Y}-x)$. In the treatment-control case ($C=(1,-1)$) it reduces to the squared studentized ATE,
> $$
> X^2 = \frac{\hat\tau^2}{\hat S(1,1)/N_1 + \hat S(2,2)/N_2} = t^2,
> $$
> i.e. the square of Neyman's ATE estimate over its (heteroscedasticity-robust) standard error.

> [!theorem] Theorem 1 — $X^2$ is proper (dual validity) ^thm-x2-proper
> Under Assumption 1, the **sampling** distribution satisfies, under $H_{0\text N}(C,x)$,
> $$
> X^2 \xrightarrow{d} \sum_{j=1}^m a_j\,\xi_j^2,\qquad a_j\in[0,1],
> $$
> a weighted sum of independent $\chi_1^2$ variates with weights at most 1. Under the stronger Assumption 2, with $\pi\sim\text{Unif}(\Pi_N)$, the **randomization** distribution satisfies
> $$
> X^2_\pi\mid W \xrightarrow{d} \chi_m^2 \quad\text{almost surely}.
> $$
> Because $\chi_m^2 = \sum_{j=1}^m \xi_j^2$ stochastically **dominates** $\sum_j a_j\xi_j^2$ (weights $a_j\le 1$), the FRT with $X^2$ **asymptotically conservatively controls type I error** under the weak null. Combined with [[Fisher Randomization Test and the Sharp Null|finite-sample exactness under the sharp null]], $X^2$ is robust on **two classes of nulls**.

> [!theorem] Box-type statistic $B$ is NOT proper ^thm-box-improper
> The Box-type statistic $B = N\hat{\bar Y}^{\mathsf T} M \hat{\bar Y}/\text{tr}(M\hat D)$ (with $M=C^{\mathsf T}(CC^{\mathsf T})^{-1}C$) has asymptotic-mean ratio $\le 1$ but this is **necessary, not sufficient**, for the stochastic-dominance criterion of Proposition 4. Hence the FRT with $B$ **cannot control type I error in general**, even asymptotically. Exceptions: equal variances, or a one-dimensional hypothesis ($C$ a row vector, where $B=X^2$).

> [!theorem] OLS $F$ statistic is NOT proper; Huber–White repairs it ^thm-F-improper
> The classical regression $F$ statistic uses a **pooled** variance $\hat\sigma^2$, which presumes homoscedasticity — incompatible with the potential-outcomes framework. Under $H_{0\text N}(C,0_m)$, $mF \xrightarrow{d} \sum_j \lambda_j(\cdots)\xi_j^2$ with weights that can exceed 1, so $F$ is **improper** (fails type I control under heteroscedasticity). Replacing $\hat\sigma^2(\mathcal X^{\mathsf T}\mathcal X)^{-1}$ by the **Huber–White** estimator $\hat D_{\text{HW}}=N\,\text{diag}\{(N_j-1)\hat S(j,j)/N_j^2\}$ gives $X^2_{\text{HW}}=N(C\hat{\bar Y})^{\mathsf T}(C\hat D_{\text{HW}}C^{\mathsf T})^{-1}C\hat{\bar Y}$, which is asymptotically equivalent to $X^2$ (since $N_j\approx N_j-1$). **Covariate adjustment / regression-based inference must pair the robust (HW) covariance with the FRT.**

> [!definition] Two valid tests, one statistic ^def-two-tests
> Theorem 1 yields **two** asymptotically conservative tests from $X^2$: (a) the **FRT** — compare observed $X^2$ to its randomization distribution (also finite-sample exact for $H_{0\text F}$); (b) the **$\chi^2_m$ approximation** — reject if $X^2$ exceeds the $1-\alpha$ quantile of $\chi^2_m$ (no Monte Carlo). The FRT has the extra finite-sample-exactness property; in simulations and applications it tends to be slightly more conservative than the $\chi^2$ approximation.

> [!summary] Practical recommendation ^summary-recommendation
> **Use the FRT with the studentized statistic $X^2$ (equivalently $t^2$ for ATE, or the Huber–White-robust $F$).** It is model-free, finite-sample exact under the sharp null, asymptotically valid under the weak null, robust to treatment-effect heterogeneity and unequal variances, and extends to stratified, clustered, factorial, ANOVA, trend-test, and binary-outcome designs. Avoid the non-studentized $|\hat\tau|$, plain $F$, and Box-type $B$ for weak nulls except in the narrow special cases (equal variances; $J=2$ balanced; binary outcomes under the equal-means null).

## Examples

**Charness & Gneezy (2009), financial incentives for exercise** (paper's Sec. 7.1). $N=120$ college students, $J=3$ arms (no / small / large incentive), $N_1=N_2=N_3=40$; outcome = change in weekly gym visits. Sample means $\approx(-0.029, 0.054, 0.640)$ and sample variances $(0.152, 0.386, 1.489)$ — clearly **heteroscedastic**. Testing the weak null $\bar Y(1)=\bar Y(2)=\bar Y(3)$ at the 1% level, the FRT-with-$X^2$ and its $\chi^2$ approximation give congruent, significant results, whereas the $F$-based test is **overly conservative** for this data (its $p$-values inflate). Guided by the theory, one **trusts the $X^2$ $p$-values over the $F$ ones**. (A tiny jitter was added to outcomes because many were exactly 0, to avoid degenerate permuted groups.)

**Sanity computation of $X^2$.** Two arms, $\hat\tau=2.5$, $\hat S(1,1)/N_1=1.0$, $\hat S(2,2)/N_2=0.56$. Then $X^2 = 2.5^2/(1.0+0.56)=6.25/1.56\approx 4.01 = t^2$ (so $t\approx 2.0$). Compare $4.01$ to the randomization distribution of $X^2$ (asymptotically $\chi^2_1$, whose $0.95$ quantile is $3.84$) — borderline reject at 5%. Crucially the denominator used **arm-specific** variances, not a pooled one.

## Connections

- [[Fisher Randomization Test and the Sharp Null]] — supplies the finite-sample-exact half of the dual validity and the imputation machinery.
- [[Sharp vs Weak Null Hypotheses]] — explains the heteroscedasticity problem that studentization solves.
- [[Randomization Inference - Overview]] — finite-population asymptotics and the conservative estimator $\hat D$.
- [[Permutation Tests and Exact Inference]] — studentization is the same device that fixes permutation tests under unequal variances (Behrens–Fisher).

## See Also

- [[Multiple Testing Corrections]] — when testing several contrasts $C$ jointly or in sequence.
- [[Power Analysis and Sample Size]] — the conservative test sacrifices some power for valid type I control.
- [[Differences-in-Differences]] and [[Synthetic Control Inference and Diagnostics]] — other settings where robust/permutation inference matters.
- [[The Experimental Ideal]] — covariate adjustment via regression with robust (Huber–White) standard errors.
