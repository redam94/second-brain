---
title: Honest DiD - Sensitivity to Parallel Trends Violations
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/difference-in-differences
  - topic/event-study
  - topic/sensitivity-analysis
  - topic/partial-identification
  - type/method
  - doc/paper
source: "[[raw/Rambachan Roth 2023 - A More Credible Approach to Parallel Trends.pdf]]"
source_location: "Rambachan & Roth 2023 (REStud 90(5)) §1 pp. 2555-2559; §2.3-2.5 (Lemma 2.1, Def. 1, eqs. 4-11), pp. 2561-2566; §3.1-3.2 (eqs. 12-15), pp. 2566-2569; §4 (eqs. 17-18, Props. 4.1-4.2), pp. 2575-2578; §5.2.5; §6 pp. 2582-2587. Also Roth et al. 2023 §4.5-4.6"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Event Study Designs and Dynamic Treatment Effects]]"
  - "[[Pre-Trend Testing and Its Pitfalls]]"
  - "[[Differences-in-Differences]]"
used_by: []
aliases:
  - Honest DiD
  - HonestDiD
  - Rambachan and Roth 2023
  - Relative magnitudes restriction
  - Smoothness restriction on parallel trends
  - Breakdown value for parallel trends
  - A More Credible Approach to Parallel Trends
---

# Honest DiD - Sensitivity to Parallel Trends Violations

> [!summary]
> Rambachan & Roth (2023, *REStud*) replace the assumption "parallel trends holds exactly" with "the post-treatment violation $\delta_{post}$ cannot be **too different** from the pre-treatment violations $\delta_{pre}$," formalised as $\delta\in\Delta$ for a researcher-chosen set. Two leading choices: **relative magnitudes** $\Delta^{RM}(\bar M)$ (post-period shocks at most $\bar M$ times the largest pre-period shock) and **smoothness** $\Delta^{SD}(M)$ (the differential trend's slope changes by at most $M$ per period; $M=0$ is a linear-trend extrapolation). Under such restrictions the treatment effect is **partially identified**; the paper supplies confidence sets with uniform coverage that account for *both* sampling error in the estimated pre-trend *and* identification uncertainty. The natural deliverable is a **sensitivity plot** and a **breakdown value** — the smallest $\bar M$ (or $M$) at which the conclusion no longer holds. Implemented in the `HonestDiD` R/Stata packages.

## Overview

[[Pre-Trend Testing and Its Pitfalls]] ends with a problem: the pre-test is underpowered, distorts inference when passed, and gives no guidance when failed. Honest DiD keeps the *intuition* behind pre-testing — pre-trends are informative about counterfactual post-trends — but uses it quantitatively rather than as a gate. Two kinds of uncertainty are separated (§1):

- **Statistical uncertainty** — "we can only noisily estimate the true pre-trend."
- **Identification uncertainty** — "even if the true pre-trend were known, we may not know exactly how to extrapolate it."

A useful consequence noted by Roth et al. (2023, §4.5): unlike a pre-test, honest confidence sets get **wider** when the leads are imprecisely estimated. A noisy, "insignificant" pre-period is no longer rewarded.

The approach builds on Manski & Pepper (2018), who bounded DiD variation in their right-to-carry application by calibrating to the largest pre-period deviation; Rambachan & Roth generalise the restriction classes and, crucially, add **inference**.

## Main Content

> [!definition] Set-up and identified set ^def-honest-identified-set
> Event-study coefficients $\hat\beta_n = (\hat\beta_{pre}^\top,\hat\beta_{post}^\top)^\top\in\mathbb R^{\underline T+\bar T}$ with $\sqrt n(\hat\beta_n-\beta)\to_d\mathcal N(0,\Sigma^*)$ and $\beta=\tau+\delta$, $\tau_{pre}=0$ ([[Event Study Designs and Dynamic Treatment Effects#^def-event-study-decomposition|decomposition]]). Target: a scalar $\theta = l^\top\tau_{post}$ (one period's effect, or the post-period average with $l = (1/\bar T,\dots,1/\bar T)^\top$). Assume $\delta\in\Delta$. The identified set is
> $$
> \mathcal S(\beta,\Delta) = \left\{\theta : \exists\,\delta\in\Delta,\ \tau_{post}\in\mathbb R^{\bar T}\ \text{s.t.}\ l^\top\tau_{post}=\theta,\ \beta = \delta + \begin{pmatrix}0\\ \tau_{post}\end{pmatrix}\right\}
> $$
> Exact parallel trends is the special case $\Delta=\{\delta:\delta_{post}=0\}$.

> [!theorem] Lemma 2.1 — the identified set is an interval ^thm-honest-lemma21
> If $\Delta$ is closed and convex, $\mathcal S(\beta,\Delta) = [\theta^{lb},\theta^{ub}]$ with
> $$
> \theta^{lb} = l^\top\beta_{post} - \underbrace{\max_\delta\ l^\top\delta_{post}\ \ \text{s.t.}\ \delta\in\Delta,\ \delta_{pre}=\beta_{pre}}_{b^{max}(\beta_{pre},\Delta)}, \qquad
> \theta^{ub} = l^\top\beta_{post} - \underbrace{\min_\delta\ l^\top\delta_{post}\ \ \text{s.t.}\ \delta\in\Delta,\ \delta_{pre}=\beta_{pre}}_{b^{min}(\beta_{pre},\Delta)}
> $$
> i.e. "point estimate minus worst-case bias, given the observed pre-trend." If $\Delta=\bigcup_k\Delta_k$, then $\mathcal S(\beta,\Delta)=\bigcup_k\mathcal S(\beta,\Delta_k)$, and a union of valid confidence sets is valid (Lemma 2.2).

> [!definition] Restriction classes $\Delta$ (§2.4) ^def-honest-delta-classes
> With $\delta_0=0$ at the reference period:
>
> **Relative magnitudes**
> $$
> \Delta^{RM}(\bar M) = \left\{\delta : \forall t\ge0,\ |\delta_{t+1}-\delta_t|\le\bar M\cdot\max_{s<0}|\delta_{s+1}-\delta_s|\right\}
> $$
> Motivation: confounding *shocks* post-treatment are of similar size to those seen pre-treatment. $\bar M=1$ is the natural benchmark when pre- and post-windows have similar length.
>
> **Smoothness (second differences)**
> $$
> \Delta^{SD}(M) = \left\{\delta : |(\delta_{t+1}-\delta_t)-(\delta_t-\delta_{t-1})|\le M\ \ \forall t\right\}
> $$
> Motivation: smoothly evolving secular trends. $M=0$ forces $\delta$ to be exactly linear — the assumption behind adding group-specific linear trends — so $\Delta^{SD}(M)$ nests and relaxes that common practice.
>
> **Hybrids and shape restrictions:** $\Delta^{SDRM}(\bar M)$ bounds post-period non-linearity by $\bar M$ times the largest pre-period non-linearity; sign ($\Delta^{PB}$: $\delta_t\ge0$ for $t\ge0$, e.g. a known confounding policy with positive effect) and monotonicity ($\Delta^{I}$) restrictions can be intersected with the above.
>
> **Polyhedral class (Definition 1):** $\Delta=\{\delta:A\delta\le d\}$. $\Delta^{SD}$ is a polyhedron; $\Delta^{RM}$ and $\Delta^{SDRM}$ are finite unions of polyhedra (one per location and sign of the pre-period maximum). Bespoke restrictions — e.g. Ashenfelter's dip — fit the same template.

**Three-period illustration** ($\underline T=\bar T=1$): under $\Delta^{RM}(\bar M)$, $|\delta_1|\le\bar M|\delta_{-1}|$, so the identified set for $\tau_1$ is $\beta_1\pm\bar M|\beta_{-1}|$. Under $\Delta^{SD}(M)$, $\delta_1\in[-\delta_{-1}-M,\ -\delta_{-1}+M]$, so the set is $(\beta_1+\beta_{-1})\pm M$: extrapolate the pre-trend linearly, then allow slack $M$.

> [!definition] Inferential goal — uniform ("honest") coverage ^def-honest-coverage
> Under the normal approximation $\hat\beta_n\approx_d\mathcal N(\beta,\Sigma_n)$, find $\mathcal C_n$ with
> $$
> \inf_{\delta\in\Delta,\ \tau}\ \ \inf_{\theta\in\mathcal S(\delta+\tau,\Delta)}\ \mathbb P_{\hat\beta_n\sim\mathcal N(\delta+\tau,\Sigma_n)}\left(\theta\in\mathcal C_n(\hat\beta_n,\Sigma_n)\right)\ \ge\ 1-\alpha
> $$
> (eq. 10), which translates to uniform asymptotic coverage over a large class of DGPs with estimated $\hat\Sigma_n$ (eq. 11). Only $\hat\beta$ and its **full covariance matrix** are required — any estimator that delivers them (TWFE, Callaway–Sant'Anna, Sun–Abraham, IV event studies) can be plugged in.

### Method 1 — moment inequalities (conditional / hybrid tests)

For polyhedral $\Delta$, since $\mathbb E[\hat\beta_n-\tau]=\delta$, the null $H_0:\theta=\bar\theta,\ \delta\in\Delta$ is equivalent to a system of **moment inequalities with linear nuisance parameters** (eq. 13):

$$
H_0:\ \exists\,\tilde\tau\in\mathbb R^{\bar T-1}\ \ \text{s.t.}\ \ \mathbb E\left[\tilde Y_n(\bar\theta)-\tilde X\tilde\tau\right]\le0, \qquad \tilde Y_n = A\hat\beta_n-d-\tilde A_{(\cdot,1)}\bar\theta
$$

The nuisance parameters are the other $\bar T-1$ post-period effects. The test statistic profiles them out with a linear program, $\hat\eta=\min_{\eta,\tilde\tau}\eta$ s.t. $\tilde Y_n(\bar\theta)-\tilde X\tilde\tau\le\tilde\sigma_n\eta$ (eq. 14), whose dual is $\hat\eta=\max_\gamma\gamma^\top\tilde Y_n$ s.t. $\gamma^\top\tilde X=0,\ \gamma^\top\tilde\sigma_n=1,\ \gamma\ge0$. Following Andrews, Roth & Pakes (ARP), conditional on the optimal dual vertex $\gamma_*$, $\hat\eta$ is **truncated normal**, giving a critical value that adapts to which inequalities bind. The **hybrid** test first runs a size-$\kappa=\alpha/10$ least-favourable test, then a conditional test of adjusted size, fixing the conditional test's weak power when two moments are nearly tied. Confidence sets come from test inversion over $\bar\theta$. Rambachan & Roth prove uniform size control, consistency, and — under a linear-independence constraint qualification (LICQ) — optimal local asymptotic power. The approach is tractable even when $\bar T>10$ (true of 5 of the 12 papers in Roth's survey).

### Method 2 — fixed-length confidence intervals (FLCIs)

> [!theorem] Optimal FLCI and its guarantees (§4) ^thm-honest-flci
> Consider $\mathcal C = (a+v^\top\hat\beta_n)\pm\chi$. For given $(a,v)$ the smallest valid half-length is
> $$
> \chi_n(a,v;\alpha) = \sigma_{v,n}\cdot cv_\alpha\left(\bar b(a,v)/\sigma_{v,n}\right), \qquad \sigma_{v,n}=\sqrt{v^\top\Sigma_nv}
> $$
> where $\bar b(a,v)$ is the **worst-case bias** of the affine estimator over $\Delta$ (eq. 17) and $cv_\alpha(t)$ is the $1-\alpha$ quantile of $|\mathcal N(t,1)|$. Minimise over $(a,v)$ (a convex problem when $\Delta$ is convex). For $\Delta^{SD}(M)$ and $\theta=\tau_1$ the optimal estimator is
> $$
> \hat\beta_{1}-\sum_{s}w_s\left(\hat\beta_{s}-\hat\beta_{s-1}\right), \qquad \sum_sw_s=1
> $$
> — the first lag minus a weighted average of pre-period slopes, trading bias (favours recent slopes) against variance (favours averaging many).
>
> **Proposition 4.1:** if $\Delta$ is convex and centrosymmetric (true for $\Delta^{SD}$; false for $\Delta^{RM}$, $\Delta^{SDPB}$) and $\delta$ is, e.g., zero or linear, the optimal FLCI's length is near-minimal in finite samples: at $\alpha=0.05$ any valid confidence set is at most 28% shorter in expectation.
>
> **Proposition 4.2:** an FLCI is consistent iff the identified set has its maximal possible length at the true $\delta$. For $\Delta^{RM}(\bar M)$ with $\bar M>0$ every affine estimator has *infinite* worst-case bias, so "the only valid FLCI is the entire real line"; FLCIs also ignore added sign/monotonicity restrictions.

**Recommendation (§5.2.5, §6.1.2):** FLCIs for $\Delta^{SD}(M)$; the ARP **hybrid** for everything else, including $\Delta^{RM}$. `HonestDiD` applies these defaults.

### Choosing $\Delta$ and reporting

- Choose the class from domain knowledge about the confounder: *discrete differential shocks* $\Rightarrow\Delta^{RM}$; *smooth secular trends* $\Rightarrow\Delta^{SD}$; known sign of a concurrent confounder $\Rightarrow$ add $\Delta^{PB}$.
- Report the robust confidence set as a function of $\bar M$ (or $M$), and the **breakdown value**. If $M^*$ is the population breakdown point for a null effect and $\hat M^*$ its sample analogue, $(-\infty,\hat M^*]$ is a valid $1-\alpha$ confidence interval for $M^*$ (fn. 33).
- Identified sets under $\Delta^{RM}$ **grow with the horizon** — per-period deviations accumulate — so average or late-period effects are less robust than first-period effects.
- Interpret $\bar M$ with context: "robust to $\bar M=2$" is strong if the treatment date was otherwise quiet, weak if it coincided with a shock larger than anything in the pre-period (Roth et al. §4.6).
- Later pre-periods can be given more weight, e.g. $|\delta_{t+1}-\delta_t|\le\max\{|\delta_0-\delta_{-1}|,\ 2|\delta_{-1}-\delta_{-2}|\}$ (fn. 7).

## Examples

> [!example] Benzarti & Carloni — French restaurant VAT cut (§6.2) ^ex-honest-vat
> Event study of log restaurant profits vs other service firms, VAT cut July 2009. The pre-test **fails**: $\beta_{pre}=0$ is rejected ($p<0.01$). Industry-specific shocks, not smooth trends, are the concern, so use $\Delta^{RM}(\bar M)$. For the 2009 effect, $\bar M=1$ gives a robust confidence set of **$[0.07,\ 0.31]$** — wider than OLS but excluding zero. The **breakdown value is $\bar M\approx2$**: the conclusion survives unless post-period shocks were more than twice the largest pre-period shock (2009 was a recession, so this is a live question). For the four-year *average* effect, the $\bar M=1$ set already includes zero and is about twice as wide. Confidence sets are 40–80% longer than the estimated identified set — both sources of uncertainty matter.

> [!example] Lovenheim & Willén — duty-to-bargain laws (§6.3) ^ex-honest-dtb
> Long-run employment effects, concern = smooth secular trends, so $\Delta^{SD}(M)$ with FLCIs for $\theta=\tau_{15}$. **Men:** robust sets resemble OLS near $M=0$; breakdown at $M\approx0.01$. **Women:** OLS is significantly *negative*, but a visible downward pre-trend means that for $M<0.01$ the robust set contains only **positive** values — the point estimate lies above the linear extrapolation of the pre-trend. Calibration: $M=0.01$ equals the employment effect of $1/40$ s.d. of teacher value-added per period. Also note the reference period was moved from $-1$ to $-2$ because cohorts at $-1$ may be partially treated — honest sets *require* $\tau_{pre}=0$.

Workflow sketch in R:

```r
library(did); library(HonestDiD)
es    <- aggte(att_gt(yname="y", tname="t", idname="id", gname="g", data=df, base_period="universal"),
               type = "dynamic")                       # heterogeneity-robust event study
# betahat: event-study coefficients (reference period removed); sigma: their FULL covariance
# (for `did` output, build sigma from the influence functions; see the pedrohcgs/CS_RR example repo)

rm <- createSensitivityResults_relativeMagnitudes(betahat, sigma,
        numPrePeriods = K, numPostPeriods = M_post, Mbarvec = seq(0.5, 2, by = 0.5))
sd <- createSensitivityResults(betahat, sigma,
        numPrePeriods = K, numPostPeriods = M_post, Mvec = seq(0, 0.05, by = 0.01))
orig <- constructOriginalCS(betahat, sigma, numPrePeriods = K, numPostPeriods = M_post)
createSensitivityPlot_relativeMagnitudes(rm, orig)     # read off the breakdown Mbar
```

**Marketing reading.** For an observational lift study (regional price change, staggered feature rollout), the stakeholder-facing statement becomes: "the lift is positive unless week-to-week divergence between test and control regions during the campaign was more than $\bar M$ times the largest divergence seen in the pre-period." With weekly data and promotional shocks, $\Delta^{RM}$ is usually the more defensible class; with slow distribution or brand-health drift, $\Delta^{SD}$.

## Connections

- [[Pre-Trend Testing and Its Pitfalls]] — the problem this solves.
- [[Event Study Designs and Dynamic Treatment Effects]] — supplies $\hat\beta$ and $\hat\Sigma$; any asymptotically normal event-study estimator qualifies.
- [[Aggregating Group-Time Effects]], [[Group-Time Average Treatment Effects]] — honest sets can be wrapped around Callaway–Sant'Anna event-study aggregates.
- [[Sensitivity Analysis in Observational Studies]] — same philosophy (bound the unverifiable, report a breakdown point) applied to unobserved confounding under ignorability; $\bar M$ plays the role of a Rosenbaum-$\Gamma$-type sensitivity parameter.
- [[Plausible GMM - Overview]] — a quasi-Bayesian relative: instead of a hard set $\Delta$ for the violation, place a prior on the degree of moment misspecification.
- [[Bayesian Difference in Differences]] — a prior over $\delta_{post}$ given $\delta_{pre}$ (e.g. a random walk or smooth-trend prior) is the Bayesian analogue of $\Delta^{RM}$ / $\Delta^{SD}$.
- [[Synthetic Difference-in-Differences - Overview]] — the alternative strategy: construct parallel trends by reweighting. The two are complementary, not competing.
- [[The Selection Problem]] — $\delta_{post}$ is the DiD form of selection bias; Honest DiD *bounds* it, in the partial-identification tradition of Manski, rather than assuming it away.

## See Also

- [[Differences-in-Differences]]
- [[Identifying Assumptions for Staggered DiD]]
- [[Simultaneous Inference via Multiplier Bootstrap]]
- [[SDID vs DiD vs Synthetic Control]]
