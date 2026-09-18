---
title: Proper Scoring Rules (CRPS, Log Score, Pinball Loss)
tags:
  - source/ingested
  - topic/forecasting
  - topic/scoring-rules
  - topic/machine-learning
  - type/concept
  - doc/paper
source: "[[raw/Gneiting Raftery 2007 - Strictly Proper Scoring Rules Prediction and Estimation.pdf]]"
source_location: "Secs. 1-2 (pp. 359-362), 4.1-4.3 (pp. 365-367), 6.1-6.4 (pp. 370-372), 7 (pp. 372-373), 8.2-8.3 (pp. 373-374), 9 (pp. 375-376)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[Model Comparison]]"
  - "[[Quantile Regression]]"
used_by:
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[DeepAR and Global Autoregressive Neural Forecasters]]"
  - "[[Time-Series Foundation Models (Chronos)]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
aliases:
  - Proper Scoring Rules
  - Strictly Proper Scoring Rules
  - CRPS
  - Continuous Ranked Probability Score
  - Logarithmic Score
  - Pinball Loss
  - Quantile Loss
  - Interval Score
  - Winkler Score
  - Energy Score
---

# Proper Scoring Rules (CRPS, Log Score, Pinball Loss)

> [!summary]
> A **scoring rule** $S(P, x)$ assigns a numerical reward to a predictive distribution $P$ when outcome $x$ materialises. It is **proper** if a forecaster whose true belief is $Q$ maximises expected score by reporting $Q$, and **strictly proper** if $Q$ is the unique maximiser. Gneiting & Raftery (2007) characterise all proper rules through convex functions (Theorem 1), link them to entropies and Bregman divergences, and catalogue the rules used in practice: the **logarithmic score** (↔ Shannon entropy / KL divergence / Bayes factors), the **CRPS** (a distance-sensitive score on CDFs that generalises absolute error), the **energy score** (multivariate CRPS), the **pinball / check loss** (proper for a quantile), and the **interval score** (proper for central prediction intervals, rewarding narrowness and penalising misses). Their case study shows that intuitive but *improper* scores lead to badly wrong conclusions.

## Overview

Any comparison of [[Probabilistic Forecasting - Overview|probabilistic forecasts]] needs a loss that acts on distributions. The danger is that a badly chosen loss can be *gamed*: the forecaster does better, in expectation, by reporting something other than their honest belief — typically an over-confident distribution. Propriety rules this out. Because a proper score is maximised in expectation by the true data-generating distribution, averaging it over a test set measures **calibration and sharpness simultaneously**; one does not need separate penalties for interval width and coverage.

Gneiting & Raftery take scores to be *positively oriented* (rewards). The forecasting literature (DeepAR, Chronos, the M-competitions) uses the *negatively oriented* versions (losses); this note gives both.

## Main Content

> [!definition] Proper and strictly proper scoring rule ^def-proper
> Let $\mathcal P$ be a convex class of probability measures on $(\Omega,\mathcal A)$. A scoring rule is a function $S:\mathcal P\times\Omega\to\bar{\mathbb R}$. Write the expected score under $Q$ when $P$ is quoted as
>
> $$
> S(P,Q) = \int S(P,\omega)\,\mathrm dQ(\omega).
> $$
>
> $S$ is **proper** relative to $\mathcal P$ if $S(Q,Q)\ge S(P,Q)$ for all $P,Q\in\mathcal P$, and **strictly proper** if equality holds only when $P=Q$ (Eq. 1, p. 360). If $S$ is (strictly) proper, so is $S^*(P,\omega)=cS(P,\omega)+h(\omega)$ for $c>0$ (Eq. 2): such rules are *equivalent*.

> [!theorem] Characterisation via convex functions (Gneiting & Raftery, Theorem 1) ^thm-convex-characterisation
> A regular scoring rule $S$ is proper relative to $\mathcal P$ **if and only if** there exists a convex real-valued function $G$ on $\mathcal P$ such that
>
> $$
> S(P,\omega) = G(P) - \int G^*(P,\omega')\,\mathrm dP(\omega') + G^*(P,\omega),
> $$
>
> where $G^*(P,\cdot)$ is a subtangent of $G$ at $P$. The statement holds with *strictly proper* and *strictly convex*. Equivalently, the expected-score function $G(P)=S(P,P)$ is convex and $S(P,\cdot)$ is a subtangent of $G$ at $P$ (p. 361).

> [!definition] Entropy and divergence of a scoring rule ^def-entropy-divergence
> $G(P)=\sup_Q S(Q,P)=S(P,P)$ is the **generalised entropy** (information measure) and
>
> $$
> d(P,Q)=S(Q,Q)-S(P,Q)\ \ge 0
> $$
>
> is the associated **divergence** (Eqs. 6-7); on finite sample spaces it is the Bregman divergence of $G$. Proper rules also arise from decision problems: if $a_P$ is the Bayes act under $P$ and $U$ a utility, then $S(P,\omega)=U(\omega,a_P)$ is proper (Sec. 2.2).

### Scores for density forecasts (Sec. 4.1)

> [!definition] Logarithmic score ^def-log-score
>
> $$
> \operatorname{LogS}(p,x)=\log p(x).
> $$
>
> Strictly proper relative to the class of dominated measures. Its entropy is negative Shannon entropy and its divergence is the Kullback–Leibler divergence (p. 365). It is **local** — it depends on $p$ only through $p(x)$ — and Bernardo (1979) showed every proper local rule is equivalent to it. Negatively oriented, it is the negative log predictive density (NLPD) used as the DeepAR training loss and as `elpd` in Bayesian [[Model Comparison]].

Other density scores are the **quadratic score** $\operatorname{QS}(p,x)=2p(x)-\lVert p\rVert_2^2$ and the **spherical score** $p(x)/\lVert p\rVert_2$. By contrast the **linear score** $\operatorname{LinS}(p,x)=p(x)$ is *not* proper: it "encourages overprediction at the modes of an assessor's true predictive density" (p. 366).

### CRPS and the energy score (Secs. 4.2-4.3)

> [!definition] Continuous ranked probability score ^def-crps
> For a predictive CDF $F$ on $\mathbb R$, in negative orientation,
>
> $$
> \operatorname{CRPS}^*(F,x)=\int_{-\infty}^{\infty}\bigl(F(y)-\mathbf 1\{y\ge x\}\bigr)^2\,\mathrm dy
> = \mathbb E_F|X-x|-\tfrac12\,\mathbb E_F|X-X'|,
> $$
>
> with $X,X'$ independent draws from $F$ (Eqs. 20-21). It is the integral of Brier scores over all thresholds, is proper on all Borel measures and **strictly proper** on those with finite first moment, is reported **in the units of the observations**, and **reduces to the absolute error** when $F$ is a point mass — so it "provides a direct way to compare deterministic and probabilistic forecasts" (p. 367). Its divergence is the Cramér–von Mises-type distance $\int (F-G)^2\,\mathrm dy$.

> [!theorem] Closed form for a Gaussian forecast ^thm-crps-gaussian
> With $z=(x-\mu)/\sigma$,
>
> $$
> \operatorname{CRPS}^*\bigl(\mathcal N(\mu,\sigma^2),x\bigr)=\sigma\left[z\bigl(2\Phi(z)-1\bigr)+2\varphi(z)-\frac{1}{\sqrt\pi}\right].
> $$
>
> For a sample of size $n$ the score is computable from order statistics in $O(n\log n)$ (Hersbach 2000).

The **energy score** $\operatorname{ES}(P,x)=\tfrac12\mathbb E_P\lVert X-X'\rVert^\beta-\mathbb E_P\lVert X-x\rVert^\beta$, $\beta\in(0,2)$, generalises CRPS ($\beta=1$, $m=1$) to vector-valued outcomes and is strictly proper (Eq. 22); at $\beta=2$ it degenerates to squared error of the mean, which is proper but *not* strictly proper. This is the natural score for joint sample paths over a horizon or across a hierarchy.

### Quantile and interval forecasts (Sec. 6)

> [!theorem] Proper scoring rules for a quantile (Theorem 6) ^thm-quantile-score
> If $s$ is nondecreasing and $h$ arbitrary, then
>
> $$
> S(r;x)=\alpha\, s(r)+\bigl(s(x)-s(r)\bigr)\mathbf 1\{x\le r\}+h(x)
> $$
>
> is proper for predicting the $\alpha$-quantile (Eq. 40). Taking $s(x)=x$, $h(x)=-\alpha x$ gives $S(r;x)=(x-r)(\mathbf 1\{x\le r\}-\alpha)$ (Eq. 41), whose negative is the **tick / check / pinball loss**
>
> $$
> \operatorname{QL}_\alpha(r,x)=\begin{cases}\alpha\,(x-r), & x>r\\ (1-\alpha)(r-x), & x\le r.\end{cases}
> $$

This is exactly the criterion minimised in [[Quantile Regression]] (Koenker & Bassett 1978; Sec. 9.2), and — doubled — the $\rho$-risk of DeepAR and the WQL of Chronos (see [[Forecast Evaluation and Backtesting]]). Eq. 48 shows that integrating a proper quantile score over levels, $S(F,x)=\int_0^1 S_\alpha(F^{-1}(\alpha);x)\,\nu(\mathrm d\alpha)$, yields a proper score for the whole distribution. With pinball loss and uniform $\nu$ this construction gives the CRPS up to a constant — the standard identity (not stated explicitly in the paper; see Laio & Tamea 2007) is $\operatorname{CRPS}^*(F,x)=2\int_0^1\operatorname{QL}_\alpha(F^{-1}(\alpha),x)\,\mathrm d\alpha$ — which is why an average of doubled pinball losses over a quantile grid is used as a CRPS approximation.

> [!definition] Interval score ^def-interval-score
> For the central $(1-\alpha)\times100\%$ interval $[l,u]$ (the $\alpha/2$ and $1-\alpha/2$ quantiles), negatively oriented,
>
> $$
> S^{\text{int}}_\alpha(l,u;x)=(u-l)+\frac2\alpha(l-x)\mathbf 1\{x<l\}+\frac2\alpha(x-u)\mathbf 1\{x>u\}
> $$
>
> (Eq. 43). "The forecaster is rewarded for narrow prediction intervals, and he or she incurs a penalty, the size of which depends on $\alpha$, if the observation misses the interval" (p. 370). It was later adopted as the interval metric of the M4 competition.

### Links to Bayes factors and cross-validation (Sec. 7)

With fully specified forecasts, $\log B=\operatorname{LogS}(H_1,X)-\operatorname{LogS}(H_2,X)$: the log Bayes factor *is* a difference of log scores (Eq. 51). With estimated parameters, the log marginal likelihood decomposes **prequentially**, $\log P(X\mid H_k)=\sum_t\log P(X_t\mid X^{t-1},H_k)$ (Eqs. 52-53) — a sum of one-step-ahead out-of-sample log scores, i.e. a rolling-origin backtest — and is asymptotically equivalent to BIC (Dawid 1984). For unordered data the authors propose **random-fold cross-validation** (Eq. 55) and conjecture the equivalences survive replacing the log score by CRPS. This ties forecast scoring directly to [[Overfitting and Information Criteria]] and [[Cross Validation Checking]].

> [!warning] Skill scores are generally improper
> The skill score $(S^{\text{fcst}}_n-S^{\text{ref}}_n)/(S^{\text{opt}}_n-S^{\text{ref}}_n)$ (Eq. 8) is "generally improper, even if the underlying scoring rule $S$ is proper" (Sec. 2.3, p. 362), though hedging benefits vanish as the number of forecasts grows. Scores are only directly comparable over *exactly the same set of forecast situations*.

## Examples

**Why propriety matters — the Pacific Northwest ensemble (Sec. 8.2, Table 3).** A five-member weather ensemble gives mean $\mu_i$ and spread $\sigma_i$ for sea-level pressure at 16,015 station-times. The forecast density is $\mathcal N(\mu_i,(r\sigma_i)^2)$ and the question is which inflation factor $r$ is best; the ensemble is known to be under-dispersed (RMSE/spread ratio $r_0=1.55$).

| Score | Proper? | Optimal $r$ |
|---|---|---|
| Quadratic | yes | 2.18 |
| Spherical | yes | 1.84 |
| Logarithmic | yes | 2.41 |
| CRPS | yes | 1.62 |
| Linear $p(x)$ | **no** | 0.05 |
| Probability score $\int_{x-1}^{x+1}p$ | **no** | 0.02 |

The improper scores recommend *shrinking* the spread to almost nothing — "essentially deterministic forecasts." All proper scores correctly demand inflation. The log score picks the largest $r$ because it "involves a harsh penalty for low probability events and thus is highly sensitive to extreme cases"; the authors find CRPS "less sensitive to extreme cases or outliers" (p. 374).

**Interval score beats coverage + width (Sec. 6.3, Table 2).** For a bilinear process, three 95% one-step intervals all achieve ≈95% coverage: the true conditional interval $I$ (width 4.00), the unconditional interval $J$ (5.45) and a width-minimising interval $K$ (3.79) that perversely collapses when variance is highest. Average interval scores: $I=4.77$, $K=5.32$, $J=8.04$. Coverage alone cannot separate them; width alone prefers the wrong one; the proper score ranks them correctly.

```python
import numpy as np
from scipy.stats import norm
def crps_gaussian(mu, sigma, x):
    z = (x - mu) / sigma
    return sigma * (z * (2 * norm.cdf(z) - 1) + 2 * norm.pdf(z) - 1 / np.sqrt(np.pi))
def pinball(q, x, alpha):
    return np.where(x > q, alpha * (x - q), (1 - alpha) * (q - x))
def interval_score(l, u, x, alpha):
    return (u - l) + 2 / alpha * np.maximum(l - x, 0) + 2 / alpha * np.maximum(x - u, 0)
```

## Connections

- [[Probabilistic Forecasting - Overview]] — calibration/sharpness paradigm that scoring rules operationalise.
- [[Forecast Evaluation and Backtesting]] — how pinball loss is aggregated into $\rho$-risk and WQL, and paired with MASE.
- [[DeepAR and Global Autoregressive Neural Forecasters]] — trained by maximising the log score; evaluated by quantile loss.
- [[Time-Series Foundation Models (Chronos)]] — cross-entropy training is the log score on a discretised outcome.
- [[Quantile Regression]] — optimum-score estimation with the pinball loss.
- [[Model Comparison]] and [[Overfitting and Information Criteria]] — elpd / WAIC / LOO are estimates of the expected log score; Sec. 7 gives the Bayes-factor and BIC links.
- [[Cross Validation Checking]] — LOO-PIT is a calibration diagnostic complementary to a proper score.

## See Also

- [[Conformal Prediction - Overview]] — guarantees marginal coverage; the interval score then compares the *efficiency* of valid intervals.
- [[Posterior Predictive Checking]] — graphical calibration checks for Bayesian predictive distributions.
- [[Simulation-Based Calibration - Overview]] — rank/PIT-uniformity ideas applied to posterior computation rather than forecasts.
- [[Counterfactual Impact Estimation]] — pre-period CRPS/interval score as a check on the counterfactual forecast's credibility.
