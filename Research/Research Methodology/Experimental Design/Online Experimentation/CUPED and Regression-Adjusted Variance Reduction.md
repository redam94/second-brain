---
title: CUPED and Regression-Adjusted Variance Reduction
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/variance-reduction
  - type/method
  - doc/paper
source: "[[raw/Deng 2013 - CUPED Improving Sensitivity with Pre-Experiment Data.pdf]]"
source_location: "Secs. 2-6 and Appendices A-B (pp. 2-10); context from [[raw/Larsen 2022 - Statistical Challenges in Online Controlled Experiments.pdf]] Sec. 2.1"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[Online Experimentation - Overview]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Confidence Sequences]]"
  - "[[Sample Ratio Mismatch and Trustworthiness Checks]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
aliases:
  - CUPED
  - Controlled-experiment Using Pre-Experiment Data
  - Control Variates for A/B Tests
  - Pre-Experiment Covariate Adjustment
---

# CUPED and Regression-Adjusted Variance Reduction

> [!summary]
> **CUPED** (Controlled-experiment Using Pre-Experiment Data; Deng, Xu, Kohavi & Walker, WSDM 2013) imports the Monte Carlo **control variate** trick into A/B testing. Replace each arm's mean $\bar Y$ by $\bar Y - \theta \bar X$, where $X$ is a covariate measured *before* assignment. Because randomization guarantees $\mathbb E X^{(t)} = \mathbb E X^{(c)}$, the adjusted difference $\Delta_{cv}$ remains unbiased for the treatment effect, and with the optimal $\theta = \operatorname{cov}(Y,X)/\operatorname{var}(X)$ its variance is $\operatorname{var}(\Delta)(1-\rho^2)$. The best covariate is almost always *the same metric in the pre-period*. On Bing, CUPED cut variance by about 50%, equivalent to doubling traffic or halving run time. The one hard rule: **never use a covariate that the treatment could have affected.**

## Overview

Online experiments chase effects of a fraction of a percent, and the required sample size grows as $\sigma^2/\delta^2$ (see [[Online Experimentation - Overview#^ex-power]] and [[Power Analysis and Sample Size]]). Deng et al. list why simply adding traffic is not enough: effects are tiny, results are needed quickly (especially for harmful treatments), many features have low *triggering* rates, and traffic must be shared among many concurrent experiments. The alternative to increasing $n$ is decreasing $\sigma^2$.

The analysis framework is the two-sample $t$-test, with statistic $\Delta / \sqrt{\operatorname{var}(\Delta)}$ where $\Delta = \bar Y^{(t)} - \bar Y^{(c)}$ and, by independence of the arms, $\operatorname{var}(\Delta) = \operatorname{var}(\bar Y^{(t)}) + \operatorname{var}(\bar Y^{(c)})$. So reducing the variance of the difference reduces to reducing the variance of each mean, which is exactly the problem studied in Monte Carlo simulation. The goal is an adjusted estimator $\Delta^*$ that is (i) still unbiased for the mean shift and (ii) lower variance, without the parametric commitments of a linear model (ANCOVA assumes $\mathbb E(Y \mid Z, X) = \theta_0 + \delta Z + \theta^\top X$ and homoscedastic errors) and without the machinery of semiparametric efficiency theory (Tsiatis 2006), to which the result is nonetheless equivalent.

## Main Content

### Stratification

Split the sampling region into $K$ strata with probabilities $w_k$ and form $\hat Y_{\text{strat}} = \sum_k w_k \bar Y_k$. The variance decomposition (Deng et al. Sec. 3.1.1) is

$$
\operatorname{var}(\bar Y) = \sum_{k=1}^K \frac{w_k}{n}\sigma_k^2 + \sum_{k=1}^K \frac{w_k}{n}(\mu_k - \mu)^2 \;\ge\; \sum_{k=1}^K \frac{w_k}{n}\sigma_k^2 = \operatorname{var}(\hat Y_{\text{strat}}),
$$

so stratification removes the **between-strata** variance. Online, users cannot be sampled stratum by stratum because they arrive over time, but strata can be formed *after the fact* from pre-experiment variables (browser, country, heavy/light user), giving the post-stratified delta $\Delta_{\text{strat}} = \sum_k w_k(\bar Y_k^{(t)} - \bar Y_k^{(c)})$. Because the stratifying variable is pre-experiment it is independent of the treatment effect, which keeps $\Delta_{\text{strat}}$ unbiased.

### Control variates

> [!definition] Control variate estimator ^def-control-variate
> Given i.i.d. pairs $(Y_i, X_i)$ with $\mathbb E X$ known, define for any constant $\theta$
>
> $$
> \hat Y_{cv} = \bar Y - \theta \bar X + \theta\, \mathbb E X .
> $$
>
> $\hat Y_{cv}$ is unbiased for $\mathbb E Y$ and
>
> $$
> \operatorname{var}(\hat Y_{cv}) = \tfrac{1}{n}\big(\operatorname{var}(Y) + \theta^2 \operatorname{var}(X) - 2\theta \operatorname{cov}(Y,X)\big).
> $$

> [!theorem] Optimal coefficient and variance reduction (Deng et al. Eqs. 4-5) ^thm-cuped-variance
> The variance of $\hat Y_{cv}$ is minimised at
>
> $$
> \theta^* = \frac{\operatorname{cov}(Y, X)}{\operatorname{var}(X)},
> $$
>
> the OLS slope of $Y$ on $X$, giving
>
> $$
> \operatorname{var}(\hat Y_{cv}) = \operatorname{var}(\bar Y)\,(1 - \rho^2), \qquad \rho = \operatorname{cor}(Y, X).
> $$
>
> With several covariates $1-\rho^2$ becomes $1 - R^2$ from the regression of $Y$ on $X$. More generally, among adjustments $\bar Y - \overline{f(X)} + \mathbb E f(X)$ the optimal $f$ is the regression function $\mathbb E(Y \mid X)$.

### The CUPED observation

In simulation, the hard part of a control variate is knowing $\mathbb E X$. In an experiment we do not need it:

> [!theorem] CUPED delta is unbiased (Deng et al. Sec. 3.2.2, Eq. 7) ^thm-cuped-unbiased
> If $X$ is constructed only from information that precedes treatment, randomization implies $\mathbb E X^{(t)} = \mathbb E X^{(c)}$. Then
>
> $$
> \Delta_{cv} = \hat Y_{cv}^{(t)} - \hat Y_{cv}^{(c)} = \big(\bar Y^{(t)} - \bar Y^{(c)}\big) - \theta\big(\bar X^{(t)} - \bar X^{(c)}\big)
> $$
>
> is unbiased for $\delta = \mathbb E \Delta$ (the unknown $\theta\,\mathbb E X$ terms cancel), and with $\theta = \theta^*$,
>
> $$
> \operatorname{var}(\Delta_{cv}) = \operatorname{var}(\Delta)\,(1 - \rho^2).
> $$
>
> The **same** $\theta$ must be used in both arms; the simplest estimate is from the pooled treatment-plus-control sample.

Read the formula as: *the in-experiment difference, corrected by the chance pre-experiment imbalance between the arms*. If the treatment group happened to draw heavier users, $\bar X^{(t)} - \bar X^{(c)} > 0$ and the raw delta is pulled down accordingly.

**Stratification is a special case.** With a categorical $X$, using the indicators $\mathbf 1\{X = k\}$ as control variates (whose means are the weights $w_k$) reproduces $\hat Y_{\text{strat}}$ exactly; the fitted coefficients are $\hat\theta_k = \bar Y_k - \bar Y_0$ (Appendix A). Control variates therefore generalise stratification to continuous covariates and avoid having to estimate $w_k$.

### Practical guidance (Secs. 4-5)

- **Which covariate?** Across a large class of metrics, *the same metric measured in the pre-experiment period* gives the largest reduction. In a 3-week A/A test on queries-per-user: entry-day alone gave 9-10%; pre-period queries-per-user gave more than 45%; both together added only 2-3%.
- **How long a pre-period?** Two forces compete. *Correlation* rises with a longer pre-period (better signal-to-noise for cumulative metrics). *Coverage*, the share of experiment users seen in the pre-period, rises with pre-period length but falls as the experiment runs longer (late arrivals are new or cookie-churned users). Reduction peaked at about two weeks of experiment; **1-2 weeks of pre-period** is the recommendation, giving roughly 50% reduction over a wide range of durations.
- **Missing pre-period data.** Add a binary covariate "appeared in the pre-period" and set the missing $X$ to any constant. This is equivalent to stratifying on presence and then adjusting within the matched stratum.
- **Beyond the pre-period.** The requirement is only that the treatment cannot affect $X$. Information fixed at a user's first appearance (e.g. entry day-of-week) or anything established *before triggering* qualifies, which is useful for low-trigger-rate features.
- **Non-user metrics.** For page-level metrics such as CTR = clicks / page views with user-level randomization, combine CUPED with the delta method: linearise both ratios and compute $\theta = \beta_1^\top \Sigma \beta_2 / \beta_2^\top \Sigma \beta_2$ from the user-level covariance $\Sigma$ of (clicks, views, pre-clicks, pre-views) (Appendix B). Compare [[Standard Errors and Clustering]].
- **Where it fails.** Revenue-per-user gained less than 5% because pre- and in-experiment revenue are weakly correlated. CUPED works best for metrics with stable heavy/light-user heterogeneity.

> [!warning] Post-treatment covariates bias the estimate (Sec. 5.3) ^warn-post-treatment
> In an experiment known to *increase* queries-per-user, the in-experiment metric Distinct-Queries-per-user is an almost perfect correlate and shrinks the interval dramatically. But the treatment also raised DQ, so $\mathbb E X^{(t)} \ne \mathbb E X^{(c)}$ and the "corrected" delta came out **significantly negative**: a narrow interval around the wrong sign. This is the experimental version of conditioning on a mediator or collider; see [[Logic of Regression Adjustment]].

### Relation to regression adjustment

CUPED with one covariate is numerically the ANCOVA estimate from regressing $Y$ on treatment and centred $X$, but its justification is design-based: unbiasedness comes from randomization, not from the linear model being correct. The semiparametric literature (Yang & Tsiatis 2001; Tsiatis et al. 2008) shows ANCOVA-type estimators are asymptotically at least as efficient as the unadjusted test even under misspecification. Later work replaces the linear $\theta X$ with a machine-learned prediction $f(X)$ (Larsen et al. Sec. 2.1), following the optimal-$f$ remark above. This is the *opposite use* of regression to the one in [[Logic of Regression Adjustment]]: there, covariates remove confounding; here there is no confounding to remove, and covariates only soak up outcome variance.

## Examples

**Slowdown experiment (Sec. 5.1).** Bing delayed responses by 250 ms. After two weeks on a small slice the CTR effect was borderline ($p$ just under 0.05); a much larger rerun confirmed it at $p = 2 \times 10^{-13}$. Re-analysing the *original* run with CUPED and two-week pre-period CTR as the covariate made the effect significant from day 1, and CUPED on *half* the users was still more sensitive than the raw $t$-test on all of them. Three later experiments showed reductions of 45%, 52% and 49% with one week of pre-period data.

**Code sketch.**

```python
import numpy as np

def cuped(y, x_pre, treat):
    """y: in-experiment metric, x_pre: same metric pre-assignment, treat: 0/1."""
    theta = np.cov(y, x_pre)[0, 1] / np.var(x_pre, ddof=1)   # pooled, both arms
    y_adj = y - theta * (x_pre - x_pre.mean())
    d = y_adj[treat == 1].mean() - y_adj[treat == 0].mean()
    se = np.sqrt(y_adj[treat == 1].var(ddof=1) / (treat == 1).sum()
               + y_adj[treat == 0].var(ddof=1) / (treat == 0).sum())
    return d, se          # var ratio vs raw is about 1 - corr(y, x_pre)**2
```

With $\rho = 0.7$ the variance falls by $49\%$, so an experiment planned for four weeks reaches the same power in about two.

## Connections

- [[Online Experimentation - Overview]] — the sensitivity problem CUPED addresses.
- [[Power Analysis and Sample Size]] — replace $\sigma^2$ by $\sigma^2(1-\rho^2)$ in any sample-size formula.
- [[Logic of Regression Adjustment]] — same algebra, different purpose (precision rather than identification); both forbid post-treatment controls.
- [[Time-Based Regression Estimator for Geo Experiments]] — the geo analogue: pre-period control-geo sales predict the counterfactual and absorb variance.
- [[Geo-Experiment Design and Power Analysis]] — pre-period matching and stratification of geos is the design-stage counterpart of post-stratification.
- [[Confidence Sequences]] — variance-reduced, regression-adjusted estimates can be monitored sequentially; Howard et al.'s ATE sequence accepts arbitrary predictions of the potential outcomes for the same reason.
- [[The Experimental Ideal]] — randomization is what makes $\mathbb E X^{(t)} = \mathbb E X^{(c)}$.

## See Also

- [[Randomization Inference - Overview]]
- [[Differences-in-Differences]]
- [[Type S and Type M Errors]]
- [[Activity Bias in Advertising]]
- [[Poststratification]]
