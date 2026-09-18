---
title: Asymptotic Normality and Inference for Forests
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/random-forests
  - topic/asymptotic-theory
  - type/theorem
  - doc/paper
source: "[[raw/Wager Athey 2018 - Heterogeneous Treatment Effects using Random Forests.pdf]]"
source_location: "Wager & Athey §2.3 (eqs. 7-8), §3 (pp. 9-17): Definitions 1-7, Theorem 1, Lemma 2, Theorem 3, Lemma 4, Theorem 5, Corollary 6, Lemma 7, Theorems 8-9, Proposition 10; §4 Theorem 11. Athey, Tibshirani & Wager §3-4 (pp. 11-18): Assumptions 1-6, Theorem 3, Lemma 4, Theorems 5-6, eqs. 12-18"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Honest Trees and Causal Forests]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
used_by:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
aliases:
  - Forest Central Limit Theorem
  - Infinitesimal Jackknife for Random Forests
  - Bootstrap of Little Bags
  - Causal Forest Confidence Intervals
  - Incrementality and Hajek Projection
---

# Asymptotic Normality and Inference for Forests

> [!summary]
> Wager & Athey (2018) prove that predictions of a **subsampled, honest, regular, random-split** forest are **asymptotically Gaussian and centered** at the truth: $(\hat\mu_n(x)-\mu(x))/\sigma_n(x)\Rightarrow\mathcal N(0,1)$ provided the subsample size scales as $s_n\asymp n^\beta$ with $\beta_{\min}<\beta<1$ (Theorem 1), and the same holds for causal-forest estimates $\hat\tau(x)$ under unconfoundedness and overlap (Theorem 11). The proof has two halves: **honesty + Lipschitz continuity bound the bias** by a power of $s$ (leaf diameters shrink), and **subsampling makes the forest a U-statistic close to its Hájek projection**, a sum of independent terms. The variance is consistently estimated by the **infinitesimal jackknife** $\hat V_{IJ}$. Athey, Tibshirani & Wager (2019) extend the result to any GRF estimate $\hat\theta(x)$ by coupling it to an infeasible *pseudo-forest* of influence functions, with variance $\sigma_n^2(x)=\mathrm{polylog}(n/s)^{-1}s/n$ estimated by the **bootstrap of little bags**.

## Overview

A pointwise confidence interval $\hat\tau(x)\pm1.96\,\hat\sigma_n(x)$ is valid only if (i) $\hat\tau(x)$ is asymptotically normal, (ii) its **bias is negligible relative to its standard deviation**, and (iii) $\hat\sigma_n$ is consistent. For adaptive ML estimators (ii) is the hard part; classical nonparametrics handles it by undersmoothing. For forests the tuning knob is the **subsample size $s$**: a larger $s$ gives deeper trees, smaller leaves and less bias but more correlated trees and higher variance ($\sigma_n^2\approx s/n$ up to logs). The theorems identify the window of $\beta=\log s/\log n$ in which bias$^2\ll$ variance.

## Main Content

> [!definition] Random forest as a U-statistic (Definition 1) ^def-rf-ustat
> With base learner $T$, auxiliary randomness $\xi\sim\Xi$ and subsample size $s$,
> $$
> \mathrm{RF}(x;Z_1,\dots,Z_n)=\binom ns^{-1}\sum_{1\le i_1<\dots<i_s\le n}\mathbb E_{\xi\sim\Xi}\big[T(x;\xi,Z_{i_1},\dots,Z_{i_s})\big],
> $$
> approximated in practice by Monte Carlo over $B$ subsamples drawn **without replacement**. The theory assumes $B$ large enough that Monte Carlo error is negligible (Wager et al. recommend $B$ of order $n$).

> [!theorem] Theorem 1 (regression forests) and Theorem 11 (causal forests) ^thm-forest-clt
> Let $Z_i=(X_i,Y_i)$ be i.i.d. with $X_i\sim U([0,1]^d)$ (or a density bounded away from 0 and $\infty$); $\mu(x)=\mathbb E[Y\mid X=x]$ and $\mu_2(x)=\mathbb E[Y^2\mid X=x]$ Lipschitz; $\mathrm{Var}[Y\mid X=x]>0$; $\mathbb E[|Y-\mathbb E[Y\mid X=x]|^{2+\delta}\mid X=x]\le M$. Let $T$ be **honest**, **$\alpha$-regular** with $\alpha\le0.2$, **symmetric** and **random-split** (each feature chosen with probability $\ge\pi/d$). If
> $$
> s_n\asymp n^\beta\quad\text{for some}\quad\beta_{\min}:=1-\Big(1+\frac d\pi\,\frac{\log(\alpha^{-1})}{\log((1-\alpha)^{-1})}\Big)^{-1}<\beta<1,
> $$
> then there is a sequence $\sigma_n(x)\to0$ with
> $$
> \frac{\hat\mu_n(x)-\mu(x)}{\sigma_n(x)}\Rightarrow\mathcal N(0,1)\qquad\text{and}\qquad\hat V_{IJ}(x)/\sigma_n^2(x)\to_p1 .
> $$
> **Theorem 11:** if additionally treatment is unconfounded, overlap holds, and both $(X_i,Y_i^{(0)})$ and $(X_i,Y_i^{(1)})$ satisfy the regularity conditions above, the same conclusions hold for $\hat\tau(x)$ from a causal forest built from honest, $\alpha$-regular (Definition 4b) causal trees. If $s$ grows more slowly than the bound, the forest is still asymptotically normal but may be asymptotically **biased**.

Note how $\beta_{\min}\to1$ as $d\to\infty$: in high dimension the admissible window closes and the rate $\sigma_n^2\approx n^{\beta-1}$ becomes very slow — the curse of dimensionality shows up as a constraint on honest inference, consistent with coverage deteriorating beyond $d\approx10$ in the simulations of [[Honest Trees and Causal Forests]].

### Half 1 — bias (§3.2)

> [!theorem] Lemma 2 and Theorem 3 — leaf diameter and bias ^thm-forest-bias
> For a regular, random-split tree on $X_i\sim U([0,1]^d)$, the leaf diameter along each coordinate $j$ satisfies, for large $s$ and any $0<\eta<1$, $\mathrm{diam}_j(L(x))\lesssim(s/(2k-1))^{-0.99(1-\eta)\frac{\log((1-\alpha)^{-1})}{\log(\alpha^{-1})}\frac\pi d}$ with high probability. If moreover $\mu$ is Lipschitz and the trees are **honest**, then for $\alpha\le0.2$
> $$
> \big|\mathbb E[\hat\mu(x)]-\mu(x)\big|=O\Big(s^{-\frac12\frac{\log((1-\alpha)^{-1})}{\log(\alpha^{-1})}\frac\pi d}\Big).
> $$

Honesty is what converts "small leaf" into "small bias": conditional on the partition, held-out leaf means are unbiased for the leaf's average of $\mu$, so the only bias is $\mu$'s variation within the leaf. Because a forest is an average of identically distributed trees, the forest's bias equals a single tree's bias — **averaging reduces variance, never bias** — which is why bias must be controlled at tree level.

### Half 2 — Gaussianity via Hájek projections (§3.3)

The Hájek projection $\mathring T=\mathbb E[T]+\sum_{i=1}^n(\mathbb E[T\mid Z_i]-\mathbb E[T])$ captures the first-order (additive) part of $T$; it is a sum of independent variables and hence asymptotically normal. If $\mathrm{Var}[\mathring T]/\mathrm{Var}[T]\to1$, $T$ inherits normality. Individual trees do **not** satisfy this, so Wager & Athey introduce a weaker notion.

> [!definition] $\nu$-incrementality (Definition 6) ^def-incremental
> $T$ is $\nu(s)$-incremental at $x$ if $\mathrm{Var}[\mathring T(x;Z_1,\dots,Z_s)]/\mathrm{Var}[T(x;Z_1,\dots,Z_s)]\gtrsim\nu(s)$.

Viewing trees as **$k$-potential-nearest-neighbor** predictors (Lin & Jeon 2006) — $T(x)=\sum_iS_iY_i$ with selection weights $S_i$ that, under honesty, are independent of $Y_i$ given $X_i$ — Lemma 4 shows $s\,\mathrm{Var}[\mathbb E[S_1\mid Z_1]]\gtrsim\frac1kC_{f,d}/\log(s)^d$, and Theorem 5 concludes that honest $k$-regular symmetric trees are $\nu(s)$-incremental with $\nu(s)=C_{f,d}/\log(s)^d$ ($C_{f,d}=2^{-(d+1)}(d-1)!$ for uniform $f$; Corollary 6 gives $C_{f,d}/(4\log(s)^d)$ for double-sample trees). Then **subsampling amplifies weak incrementality to full incrementality**:

> [!theorem] Lemma 7, Theorems 8–9 ^thm-subsampling
> For the forest $\hat\mu$ with Hájek projection $\mathring{\hat\mu}$ (Efron–Stein ANOVA decomposition),
> $$
> \mathbb E\big[(\hat\mu(x)-\mathring{\hat\mu}(x))^2\big]\le\Big(\frac sn\Big)^2\mathrm{Var}[T(x;\xi,Z_1,\dots,Z_s)] .
> $$
> Hence if $s_n\to\infty$ and $s_n\log(n)^d/n\to0$, then $(\hat\mu_n(x)-\mathbb E[\hat\mu_n(x)])/\sigma_n(x)\Rightarrow\mathcal N(0,1)$ (Thm 8), and the infinitesimal jackknife is consistent, $\hat V_{IJ}/\sigma_n^2\to_p1$ (Thm 9).

Combining: variance $\approx s/n$ (up to logs), squared bias $\approx s^{-\frac{\log((1-\alpha)^{-1})}{\log(\alpha^{-1})}\frac\pi d}$; requiring bias$^2/$variance $\to0$ yields exactly the lower bound $\beta_{\min}$.

> [!definition] Infinitesimal jackknife variance estimator (eq. 8) ^def-ij
> $$
> \hat V_{IJ}(x)=\frac{n-1}n\Big(\frac n{n-s}\Big)^2\sum_{i=1}^n\mathrm{Cov}_*\big[\hat\tau_b^*(x),N_{ib}^*\big]^2,
> $$
> where $\hat\tau_b^*(x)$ is tree $b$'s estimate, $N_{ib}^*\in\{0,1\}$ indicates whether example $i$ was in tree $b$'s subsample (either half, for double-sample trees), and the covariance is over trees. The factor $n(n-1)/(n-s)^2$ is a finite-sample correction for subsampling *without* replacement: for trivial no-split trees it makes $\hat V_{IJ}$ equal to the usual unbiased variance of a sample mean (Proposition 10).

### Extension to generalized random forests (ATW 2019, §3–4)

$\hat\theta(x)$ solves a weighted moment equation and is not an average of trees, so the U-statistic argument does not apply directly. Under Assumptions 1–6 (Lipschitz $x$-signal $M_{\theta,\nu}(x)=\mathbb E[\psi_{\theta,\nu}(O)\mid X=x]$; smooth identification with invertible $V(x)=\partial_{(\theta,\nu)}M$; Lipschitz variogram; regularity of $\psi$; existence of approximate solutions; convexity) and Specification 1:

> [!theorem] ATW Theorem 3, Lemma 4, Theorem 5 ^thm-grf-clt
> (i) $(\hat\theta(x),\hat\nu(x))\to_p(\theta(x),\nu(x))$. (ii) Define influence functions $\rho_i^*(x)=-\xi^\top V(x)^{-1}\psi_{\theta(x),\nu(x)}(O_i)$ and the infeasible **pseudo-forest** $\tilde\theta^*(x)=\theta(x)+\sum_i\alpha_i(x)\rho_i^*(x)$ — formally a regression forest with outcomes $\theta(x)+\rho_i^*(x)$, hence a U-statistic. With $s=n^\beta$ and $\beta_{\min}:=1-\big(1+\pi^{-1}\log(\omega^{-1})/\log((1-\omega)^{-1})\big)^{-1}<\beta<1$,
> $$
> \sqrt{n/s}\,\big\|\tilde\theta^*(x)-\hat\theta(x)\big\|_2=O_P\Big(\max\Big\{s^{-\frac\pi2\frac{\log((1-\omega)^{-1})}{\log(\omega^{-1})}},\ (s/n)^{1/6}\Big\}\Big).
> $$
> (iii) If $\mathrm{Var}[\rho_i^*(x)\mid X_i=x]>0$, then $(\hat\theta_n(x)-\theta(x))/\sigma_n(x)\Rightarrow\mathcal N(0,1)$ with $\sigma_n^2(x)=\mathrm{polylog}(n/s)^{-1}\,s/n$.

**Variance by the delta method.** $\mathrm{Var}[\tilde\theta^*(x)]=\xi^\top V(x)^{-1}H_n(x)(V(x)^{-1})^\top\xi$ with $H_n(x)=\mathrm{Var}[\sum_i\alpha_i(x)\psi_{\theta(x),\nu(x)}(O_i)]$; estimate $\hat\sigma_n^2=\xi^\top\hat V_n^{-1}\hat H_n(\hat V_n^{-1})^\top\xi$. $V(x)$ is a problem-specific curvature ($f_x(\theta(x))$ for quantiles; the $2\times2$ matrix of conditional moments for IV), estimated by auxiliary honest regression forests.

> [!algorithm] Bootstrap of little bags for $H_n$ (§4.1, Theorem 6) ^alg-blb
> The ideal estimator is half-sampling: recompute the forest score $\Psi$ on all half-samples $\mathcal H$, $\hat H_n^{HS}=\binom n{\lfloor n/2\rfloor}^{-1}\sum_{\mathcal H}(\Psi_{\mathcal H}-\Psi)^2$ — infeasible. Instead (Sexton & Laake 2009):
> 1. Draw $g=1,\dots,B/\ell$ random half-samples $\mathcal H_g$; grow trees in **little bags** of $\ell\ge2$, all trees in bag $g$ subsampling from $\mathcal H_g$.
> 2. Use the ANOVA identity $\mathbb E_{ss}[(\frac1\ell\sum_{b=1}^\ell\Psi_b-\Psi)^2]=\hat H_n^{HS}+\frac1{\ell-1}\mathbb E_{ss}[\frac1\ell\sum_{b=1}^\ell(\Psi_b-\frac1\ell\sum_{b'}\Psi_{b'})^2]$: between-bag variance minus the within-bag Monte Carlo term estimates $\hat H_n^{HS}$ at almost no extra cost.
>
> Theorem 6: $\hat H_n^{HS}$ is consistent and the resulting Gaussian intervals have asymptotically nominal coverage. For small $B$ the moment estimate can be negative; `grf` uses a Bayesian ANOVA with an improper uniform prior on $[0,\infty)$.

**Scope and caveats.** (1) The guarantees are **pointwise** in $x$, not uniform bands, and Remark 4 (W&A) notes regularity cannot hold at all $x$ simultaneously; scanning for the subgroup with the largest $\hat\tau(x)$ reintroduces a multiple-comparisons problem ([[Multiple Testing Corrections]]). (2) Covariates are fixed-dimensional; "asymptotic normality of random forests in high dimensions" is left to future work. (3) The nuisance estimates $\hat\nu(x)$ are also asymptotically normal, but "tree splits are not necessarily targeted to expressing heterogeneity in $\nu(x)$," so they may be inaccurate. (4) In practice coverage fails through **bias**, not variance (sharp peaks, boundaries, large $d$).

## Examples

**Reading $\beta_{\min}$.** With balanced-ish splits $\alpha=0.2$: $\log(\alpha^{-1})/\log((1-\alpha)^{-1})=1.609/0.223\approx7.2$. For $d=2$ and fully random feature choice ($\pi=1$): $\beta_{\min}=1-(1+14.4)^{-1}\approx0.935$. For $d=10$: $\beta_{\min}\approx0.986$. So theory asks for subsamples nearly as large as $n$ (deep trees) — e.g. the paper's Simulation 2 uses $n=5000$, $s=2500$ — and the resulting rate $n^{-(1-\beta)/2}$ is slow. These are worst-case sufficient conditions under mere Lipschitz smoothness; they do not exploit the forest's adaptivity to sparse signals.

**Empirical check of Gaussianity (W&A Fig. 1).** In the confounded design with $n$ growing, the sampling variance $\sigma_n^2(x)$ falls with $n$, the relative RMSE of $\hat V_{IJ}$ decays, and standardized $\hat\tau(x)$ values across 1,000 test points track the Gaussian QQ line.

**Minimal IJ computation.**

```python
# tau_b: (B,) per-tree estimates at x;  N: (B, n) 0/1 inclusion matrix; s = subsample size
cov = ((N - N.mean(0)) * (tau_b - tau_b.mean())[:, None]).mean(0)   # Cov_* over trees, per i
V_IJ = (n - 1) / n * (n / (n - s)) ** 2 * np.sum(cov ** 2)
ci = tau_b.mean() + np.array([-1.96, 1.96]) * np.sqrt(V_IJ)
```

## Connections

- [[Honest Trees and Causal Forests]] — supplies the honest, regular trees these theorems require.
- [[Generalized Random Forests - Local Moment Equations]] — the estimator to which the pseudo-forest coupling applies; the pseudo-outcomes $\rho_i$ used for *splitting* are the feasible analogues of the $\rho_i^*$ used for *theory*.
- [[Cross-Fitting and Sample Splitting]] — DML obtains $\sqrt N$-normality for a scalar by splitting across folds; forests obtain $\sqrt{n/s}$-normality for a function value by splitting within trees.
- [[Neyman Orthogonality]] — influence functions play the linearizing role in both theories (DML's $\bar\psi$; GRF's $\rho_i^*$).
- [[T-Learner and Minimax Rate]], [[X-Learner]] — rate results for metalearners concern MSE, not distributional limits; this note is the vault's source for *pointwise CIs on CATEs*.
- [[Nonparametric Causal Inference]] — BART's posterior credible intervals are the Bayesian alternative; their frequentist coverage is not guaranteed by these theorems.

## See Also

- [[Simultaneous Inference via Multiplier Bootstrap]] — uniform (simultaneous) bands in a different setting; forests currently offer only pointwise intervals.
- [[Permutation Tests and Exact Inference]] — resampling for exact tests vs. half-sampling for variance estimation.
- [[Power Analysis and Sample Size]] — with $\sigma_n^2\approx s/n$, detecting heterogeneity requires far larger samples than detecting an average effect.
- Source for the GRF results: [[raw/Athey Tibshirani Wager 2019 - Generalized Random Forests.pdf]].
