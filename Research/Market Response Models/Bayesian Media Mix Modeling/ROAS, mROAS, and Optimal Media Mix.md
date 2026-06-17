---
title: ROAS, mROAS, and Optimal Media Mix
tags:
  - source/ingested
  - topic/market-response-models
  - type/definition
  - doc/paper
  - method/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 4, pp. 7-10 (Eqs. 10-16); Sec. 5.2, pp. 13-15"
date_ingested: 2026-06-17
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
used_by:
  - "[[MMM Model Selection and Application]]"
aliases:
  - ROAS
  - mROAS
  - Marginal ROAS
  - Optimal Media Mix
  - Budget Allocation MMM
---

# ROAS, mROAS, and Optimal Media Mix

> [!summary]
> From the fitted MMM, advertisers want attribution metrics: **ROAS** (return on ad spend — total incremental revenue per dollar of channel spend) and **mROAS** (marginal ROAS — extra revenue from one more unit of spend). Both are computed counterfactually by zeroing or perturbing a channel's spend and comparing predicted sales, including the **post-change period** because carryover keeps affecting sales after the change. In the Bayesian framework, posterior samples of $\Phi$ are plugged in to get full posterior *distributions* of ROAS/mROAS. The same machinery yields an **optimal media mix** under a budget constraint — but its posterior has **large variance** (in one scenario, three modes), so the optimal allocation is often untrustworthy.

## Overview

ROAS and mROAS can be computed overall or per channel; per-channel is what guides optimization. The paper assumes channels can be changed independently (additive media effects, no cross-channel demand spillover — otherwise metrics must be computed jointly). Metrics are evaluated over a selected **change period** $(t_0, t_1)$, framed by pre- and post-change periods each set to the carryover length $L$ so lagged effects are fully captured (Figure 3).

## Main Content

> [!definition] ROAS (return on ad spend)
> Let $\hat Y_t^m(\cdot;\Phi)$ be predicted sales as a function of channel $m$'s spend (sum of the non-noise terms in the model; apply the inverse transform if $y$ was log-sales). With historical spend $x_{t,m}$ and counterfactual spend $\tilde x_{t,m}$ (channel $m$ set to zero during the change period):
> $$ \text{ROAS}_m = \frac{\sum_{t_0 \le t \le t_1 + L - 1}\big[\hat Y_t^m(x_{t-L+1,m},\dots,x_{t,m};\Phi) - \hat Y_t^m(\tilde x_{t-L+1,m},\dots,\tilde x_{t,m};\Phi)\big]}{\sum_{t_0 \le t \le t_1} x_{t,m}}. $$
> The numerator sums the sales difference over **both the change period and the post-change period** (up to $t_1 + L - 1$) to capture carryover. Because effects are additive, $\text{ROAS}_m$ depends only on channel $m$. (Eq. 10)
^roas-eq

> [!definition] mROAS (marginal ROAS)
> The additional revenue from a one-unit (here, +1%) increase in spend — the derivative of cumulative predicted sales w.r.t. cumulative spend. With $\bar x_{t,m}$ = historical spend increased by 1% during the change period:
> $$ \text{mROAS}_m = \frac{\sum_{t_0 \le t \le t_1 + L - 1}\big[\hat Y_t^m(\bar x_{t-L+1,m},\dots;\Phi) - \hat Y_t^m(x_{t-L+1,m},\dots;\Phi)\big]}{0.01 \times \sum_{t_0 \le t \le t_1} x_{t,m}}. $$
> Computed analytically for tractable models or numerically by a small perturbation. (Eq. 11)
^mroas-eq

> [!warning] Plug in posterior samples, not posterior means
> In the Bayesian framework, **each** posterior sample $\Phi_j$ is plugged into Eqs. 10-11 to obtain posterior *distributions* of ROAS/mROAS (summarize by mean/median + credible interval). It is **wrong** to first average the parameters and then plug the means in — that ignores the correlation among parameters in $\Phi$ and can produce incorrect metrics.
^posterior-plug-in

> [!definition] Optimal media mix under a budget constraint
> With total change-period budget $\mathcal{C}$, the optimal mix $\mathbf{X}^o = \{x^o_{t,m}\}$ solves
> $$ \max \ \sum_{t_0 \le t \le t_1+L-1} \hat Y_t(\,\cdot;\Phi) \quad \text{s.t.} \quad \sum_{t_0\le t\le t_1}\sum_m x_{t,m} = \mathcal{C}. \tag{12-13}$$
> The objective includes post-change sales (carryover). Solved by constrained optimization (e.g. Lagrange multipliers). To cut free parameters, fix the **flight pattern** (e.g. constant weekly spend $x_{t,m}=c_m/(t_1-t_0+1)$), reducing the constraint to $\sum_m c_m = \mathcal{C}$ (Eq. 14). Two Bayesian routes: (A) optimize the *average* predicted sales across all $J$ posterior samples (Eq. 15) — gives one **stable** optimal mix; (B) optimize each sample separately (Eq. 16) — gives a **posterior distribution** of the optimal mix that reveals its uncertainty.
^optimal-mix

## Examples

> [!example] Optimal-mix variance in simulation (Sec. 5.2)
> Optimizing Media 1 vs Media 2 spend under a fixed weekly budget. **Scenario I** (budget = 1, near the historical average spend): the posterior of optimal Media-1 spend is unimodal and tight around the truth — both approaches land near the true optimum. **Scenario II** (budget = 0.5, predicting in the sparse part of observed data): the posterior of the optimal mix has **three modes** (some posterior samples peak at the low end, others at the high end), with much higher variation. Crucially, the variance in *estimated sales* across posterior samples is comparable to or larger than the variation in sales caused by changing the mix — so the optimal allocation is **not trustworthy** when extrapolating beyond well-observed spend. ROAS of Media 3 (weak signal) had very large extreme values and large mROAS bias; Media 2's $\beta$Hill curve had the least bias, so its ROAS/mROAS were estimated best.

## Connections

- Built on the posterior samples produced in [[Bayesian Estimation and Priors for MMM]]; the high optimal-mix variance is the downstream consequence of the prior-dominated, hard-to-identify parameters there and in [[Shape (Saturation) Effects]].
- Carryover-period accounting depends on $L$ from [[Carryover (Adstock) Functional Forms]].
- Applied to TV vs magazines in the shampoo case: [[MMM Model Selection and Application]].
- Connects to optimal-budget/forecasting practice in [[Optimal Marketing Decisions and Forecasting]] and elasticity benchmarks in [[Advertising and Promotion Effects]].

## See Also

- [[Bayesian Estimation and Priors for MMM]]
- [[Bayesian Media Mix Modeling - Overview]]
- [[MMM Model Selection and Application]]
- [[_Index|Index: Bayesian Media Mix Modeling]]
