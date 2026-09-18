---
title: Simultaneous Inference via Multiplier Bootstrap
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]]"
source_location: "Sec. 4.1-4.2, pp. 21-26; Sec. 5, pp. 26-32 (Tables 2-3, Fig. 1)"
date_ingested: 2026-06-17
folder: "Econometrics/Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Doubly-Robust Estimands for ATT(g,t)]]"
  - "[[Aggregating Group-Time Effects]]"
used_by:
  - "[[Difference-in-Differences with Multiple Time Periods - Overview]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
aliases:
  - multiplier bootstrap DiD
  - uniform confidence bands DiD
  - simultaneous confidence bands
  - Theorem 2 Theorem 3 Callaway Sant'Anna
  - minimum wage application
---

# Simultaneous Inference via Multiplier Bootstrap

> [!summary]
> The DR estimators of $ATT(g,t)$ are $\sqrt{n}$-asymptotically linear and jointly normal (Theorem 2), with a doubly-robust influence function. Rather than plug-in standard errors, the paper uses a fast **multiplier bootstrap** (Theorem 3, Algorithm 1) that perturbs the influence function by random weights — no propensity re-estimation per draw, always has observations from every group, and yields **simultaneous** (uniform) confidence bands covering the entire path of $ATT(g,t)$'s with probability $\ge 1-\alpha$ (Corollary 1), avoiding multiple-testing distortions. The minimum-wage application shows this matters: the heterogeneity-robust approach finds a clear negative employment effect where TWFE finds none.

## Overview

Inference is in the large-$n$, fixed-$\mathcal{T}$ paradigm. Because researchers typically plot many $ATT(g,t)$'s (or $\theta(e)$, $\theta_{sel}(\tilde g)$, etc.), **pointwise** bands would understate joint uncertainty and ignore multiple testing. The multiplier bootstrap produces bands that hold uniformly and account for the dependence across $(g,t)$ estimates — better suited to visualizing overall estimation uncertainty than pointwise intervals.

## Main Content

> [!theorem] Theorem 2 — Asymptotic linearity & joint normality of DR estimators
> Under Assumptions 1–4, 6–8, for each $g\in\mathcal{G}_\delta$, $t\in\{2,\dots,\mathcal{T}-\delta\}$ with $t\ge g-\delta$, and provided the DR consistency claim (4.5) holds (either the propensity working model OR the never-treated outcome-regression working model is correctly specified):
> $$
> \sqrt{n}\big(\widehat{ATT}_{dr}^{nev}(g,t;\delta) - ATT(g,t)\big) = \frac{1}{\sqrt{n}}\sum_{i=1}^n \psi_{g,t,\delta}^{dr,nev}(W_i;\kappa_{g,t}^{*,nev}) + o_p(1).
> $$
> Stacking over $(g,t)$, $\sqrt{n}(\widehat{ATT}_{t\ge(g-\delta)}^{dr,nev} - ATT_{t\ge(g-\delta)}) \xrightarrow{d} N(0,\Sigma)$ with $\Sigma = \mathbb{E}[\Psi(W)\Psi(W)']$. The influence function $\psi^{dr,nev}$ has three pieces — a treated-weight term, a comparison-weight term, and an **estimation-effect** term $\psi^{est}$ correcting for first-step nuisance estimation — making the limiting variance account for estimating $\hat p_g$ and $\hat m_{g,t,\delta}$. **Assumptions 7–8** require the nuisances to be smooth parametric models with $\sqrt{n}$-asymptotically-linear estimators (logit/probit/(N)LS all qualify) plus weak integrability.
> ^theorem-2

> [!theorem] Theorem 3 — Validity of the multiplier bootstrap
> Under the assumptions of Theorem 2, define a bootstrap draw by perturbing the empirical influence function with iid mean-zero, unit-variance, finite-third-moment weights $\{V_i\}$ (e.g. **Mammen (1993)** two-point: $P(V=1-\kappa)=\kappa/\sqrt5$, $P(V=\kappa)=1-\kappa/\sqrt5$, $\kappa=(\sqrt5+1)/2$):
> $$
> \widehat{ATT}_{t\ge(g-\delta)}^{*,dr,nev} = \widehat{ATT}_{t\ge(g-\delta)}^{dr,nev} + \mathbb{E}_n[V\cdot\widehat\Psi_{t\ge(g-\delta)}^{dr,nev}(W)]. \tag{4.6}
> $$
> Then $\sqrt{n}(\widehat{ATT}^{*,dr,nev} - \widehat{ATT}^{dr,nev}) \xrightarrow{d}_{*} N(0,\Sigma)$ conditional on the sample, and for any continuous functional $\Gamma$, $\Gamma(\cdot)$ converges likewise. **Advantages:** (1) trivial/fast — just reweight, no per-draw propensity re-estimation; (2) every group always represented (the empirical bootstrap can drop a group); (3) simultaneous bands are easy; (4) extends to clustering by drawing cluster-level $V$'s (Remark 10).
> ^theorem-3

> [!definition] Algorithm 1 — Studentized simultaneous confidence band
> 1. Draw $\{V_i\}$; 2. compute $\widehat{ATT}^*$ via (4.6); form $\hat R^*(g,t) = \sqrt{n}(\widehat{ATT}^*(g,t) - \widehat{ATT}(g,t))$. 3. Repeat $B$ times. 4. Estimate $\hat\Sigma^{1/2}(g,t) = (q_{0.75}(g,t)-q_{0.25}(g,t))/(z_{0.75}-z_{0.25})$ (interquartile range of the $B$ draws, normalized by the normal IQR — robust scale). 5. Form $t\text{-}test = \max_{(g,t)}|\hat R^*(g,t)|\hat\Sigma(g,t)^{-1/2}$ per draw; let $\hat c_{1-\alpha}$ = empirical $(1-\alpha)$-quantile of these. 6. Band: $\hat C(g,t) = [\widehat{ATT}_{dr}^{nev}(g,t;\delta)\pm \hat c_{1-\alpha}\hat\Sigma(g,t)^{1/2}/\sqrt{n}]$.
> ^algorithm-1

> [!theorem] Corollary 1 — Uniform coverage
> Under the assumptions of Theorem 2, for any $0<\alpha<1$,
> $$
> P\big(ATT(g,t)\in\hat C(g,t)\ \forall t\in\{2,\dots,\mathcal{T}\}, g\in\mathcal{G}_\delta: t\ge g-\delta\big) \to 1-\alpha.
> $$
> The band covers **all** $ATT(g,t)$ simultaneously — no multiple-testing inflation. (Remark 11: setting $\hat\Sigma\equiv 1$ gives a valid but wider constant-width band.)
> ^corollary-1

> [!note] Inference for summary parameters & pre-testing
> **Corollary 2** (Sec. 4.2): plug-in estimators $\hat\theta = \sum_g\sum_t \hat w(g,t)\widehat{ATT}_{dr}^{nev}(g,t;0)$ of any aggregation $\theta$ are $\sqrt{n}$-asymptotically linear and normal, so the same bootstrap delivers (multiple-testing-robust) bands across event-times, groups, or calendar-times. **Remark 12:** pre-treatment "placebo" $ATT(g,t)$ for $t<g-\delta$ (which equal 0 under the assumptions) can be estimated by swapping the long difference $Y_t-Y_{g-\delta-1}$ for the short difference $Y_t-Y_{t-1}$; plotting them lets one assess the parallel-trends assumption.
> ^summary-inference

## Examples

> [!example] Minimum wage on teen employment — full findings (Sec. 5)
> **Data/design.** 2,284 counties, 29 states, 2001–2007 (federal MW flat at \$5.15). Groups $g\in\{2004,2006,2007\}$ = year state first raised MW; never-raisers = comparison. Outcome: county teen employment (QWI). Covariates: region, population, % white, % HS grads, poverty rate, median income (2000 County Data Book). DR estimation = logit generalized propensity score (quadratics in population, median income) + OLS outcome regression; 1000 multiplier-bootstrap iterations clustered at the county level; runs in ~3 s.
> **Result — group-time effects (Fig. 1).** Under unconditional parallel trends, 5 of 7 $ATT(g,t)$ are significantly negative (range -2.3% to -13.6%); simple group-size-weighted average -5.2%; overall $\theta_{sel}^O$ ≈ -3.9%. Under **conditional** parallel trends (DR, Panel b), 3 of 7 significant, range -0.9% (insignificant) to -7.1%; overall $\theta_{sel}^O$ ≈ **-3.1%**.
> **Result — the TWFE contrast.** A TWFE post-treatment dummy with unit + region-year FE gives only **-0.008 (insignificant)** under conditional design (and -0.037 unconditional) — i.e. TWFE says "no/weak effect."
> **Interpretation.** The heterogeneity-robust CS estimates find a clear, dynamically-growing negative effect of the minimum wage on teen employment that TWFE conceals. Caveats: some pre-treatment placebo $ATT(g,t)$ differ from zero (mild evidence against parallel trends), and the size of MW increases varies across states. Key takeaway: in a textbook-complicated application, the choice of estimation method changes the qualitative conclusion.
> ^min-wage-full
> ^block-min-wage

## Connections

- Provides inference for the estimators in [[Doubly-Robust Estimands for ATT(g,t)]] and the summaries in [[Aggregating Group-Time Effects]].
- Validates the empirical conclusions previewed in [[Difference-in-Differences with Multiple Time Periods - Overview]].
- Pre-treatment placebo plots test [[Identifying Assumptions for Staggered DiD]].

## See Also

- Chernozhukov et al. (2018); Kline & Santos (2012) — related multiplier-bootstrap band procedures
- Mammen (1993) — the two-point bootstrap weight
- [[Synthetic Control]] — alternative inference (permutation) for staggered policy effects
- Dube, Lester & Reich (2010); Meer & West (2016) — the minimum-wage literature contrasted
