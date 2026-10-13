---
title: Carryover (Adstock) Functional Forms
tags:
  - source/ingested
  - topic/market-response
  - type/definition
  - doc/paper
  - topic/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 2.1, pp. 3-4 (Eqs. 1-3, Figure 1); Sec. 8 Table 7, p. 22; Appendix p. 30"
date_ingested: 2026-06-17
date_updated: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Carryover Effects and Distributed Lags]]"
used_by:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]"
  - "[[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]]"
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
  - "[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]"
aliases:
  - Adstock
  - Geometric Adstock
  - Delayed Adstock
  - Peak Adstock
  - Carryover Effect
---

# Carryover (Adstock) Functional Forms

> [!summary]
> The **adstock** transformation captures advertising's carryover (lag) effect by replacing current spend with a finite, normalized weighted average of current and past spend over $L$ periods. Jin et al. give two weight functions: **geometric decay** (effect peaks at the exposure period and decays by a retention rate $\alpha_m$) and **delayed adstock** (effect peaks $\theta_m$ periods later, a Gaussian-shaped radial kernel). Geometric adstock is the continuous analog of the Koyck distributed lag.
^summary

## Overview

Some media build effect immediately (peak at exposure); others (e.g. brand TV) take time to peak. The adstock function transforms the raw spend time series so the regression sees the *cumulative* media effect rather than instantaneous spend. The maximum carryover duration $L$ truncates the window; for the chosen simulation parameters $L=13$ weeks approximates infinity (weights $< 10^{-7}$ beyond 13 weeks), and $L=13$ is also used in the real-data application.

> [!definition] Choosing $L$ (Sec. 2.1, p. 3)
> The paper gives three pieces of guidance on the window length:
> 1. **$L$ could differ by medium**, but "for simplicity we use a common L for all media". A per-medium $L_m$ is a legitimate extension the paper does not pursue.
> 2. **Prior knowledge of $L$ helps:** "A properly chosen L can help with estimating the weights in the adstock transformation." A window that matches the true carryover duration removes lags that carry no signal, which reduces the room for the weight parameters ($\alpha_m$, $\theta_m$) to fit noise. In the delayed form it also bounds $\theta_m \le L-1$, so $L$ sets the support of the delay prior (uniform$(0, L-1)$ in the Stan code).
> 3. **Without prior information, set $L$ very large** "as an approximation to infinity, so the weights $w_m(l)$ for $l > L$ are close to zero". With the Table 1 parameters, $L=13$ already meets this (weights below $10^{-7}$ beyond 13 weeks).
>
> Point 2 also means $L$ is a **researcher degree of freedom**: different windows give different adstock fits from the same data. See [[Researcher Degrees of Freedom]].
^choosing-L

## Main Content

> [!definition] Adstock transformation (finite-window, normalized)
> $$
> \text{adstock}(x_{t-L+1,m},\dots,x_{t,m};\,w_m,L) = \frac{\sum_{l=0}^{L-1} w_m(l)\,x_{t-l,m}}{\sum_{l=0}^{L-1} w_m(l)},
> $$
> where $x_{t,m}$ is spend of channel $m$ at week $t$, $w_m(\cdot) \ge 0$ is a weight function, $L$ is the maximum carryover duration (common across media for simplicity). The denominator **normalizes** the weights so adstock is a proper weighted average (preserving the spend scale). A large $L$ approximates an infinite window. (Eq. 1)
^adstock-eq

> [!definition] Geometric decay weights
> $$
> w^{g}_m(l;\alpha_m) = \alpha_m^{\,l}, \qquad l = 0,\dots,L-1, \quad 0 < \alpha_m < 1.
> $$
> $\alpha_m$ is the **retention rate** of the ad effect from one period to the next. The effect peaks at the same period as the exposure ($l=0$) and decays geometrically. This is the discrete geometric distributed lag — the marketing analog of the **Koyck lag** (see [[Carryover Effects and Distributed Lags]]). (Eq. 2)
^geometric-decay

> [!definition] Delayed (peak) adstock weights
> $$
> w^{d}_m(l;\alpha_m,\theta_m) = \alpha_m^{\,(l-\theta_m)^2}, \qquad l = 0,\dots,L-1, \quad 0 < \alpha_m < 1, \quad 0 \le \theta_m \le L-1.
> $$
> $\theta_m$ is the **delay of the peak effect**: the weight is maximized at lag $l=\theta_m$ rather than at $l=0$. The form is proportional to a normal density with mean $\theta_m$ and variance $-1/(2\log\alpha_m)$ — equivalently the **radial (Gaussian) kernel** used in local regression (Friedman, Hastie & Tibshirani 2009, p. 212). Other delayed forms (e.g. negative-binomial density, Hanssens et al. 2003) work too. (Eq. 3)
^delayed-adstock

> [!warning] Delayed adstock does **not** nest geometric adstock
> Some summaries say that setting $\theta_m=0$ in Eq. 3 gives Eq. 2. It does not:
> $$
> w^d_m(l;\alpha_m,0)=\alpha_m^{\,l^2}\neq\alpha_m^{\,l}=w^g_m(l;\alpha_m).
> $$
> With zero delay, the delayed kernel is a **half-Gaussian** in $l$: it peaks at $l=0$ but falls off like $e^{-c\,l^2}$, much faster than the exponential decay $e^{-c\,l}$ of the geometric form. For $\alpha=0.8$ the lag-2 weight is $0.8^4\approx0.41$ against $0.8^2=0.64$, and the lag-3 weight is $0.8^9\approx0.13$ against $0.512$. The two families share the parameter $\alpha_m$ but are **non-nested** specifications. In Sec. 8 the shampoo Models III/IV (geometric) are separate model forms compared by BIC, not restricted versions of Models I/II (delayed) with the delay fixed at 0. Read $\alpha_m$ differently in each: in Eq. 2 it is a one-period retention rate, while in Eq. 3 it sets the kernel width (variance $-1/(2\log\alpha_m)$). See also [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation#^code-map]] for the code change needed to fit the geometric form.
^not-nested

> [!example] Figure 1 — the two weight functions at $\alpha_m=0.8$ (p. 4)
> Figure 1 plots the **unnormalised** weights $w_m(l)$ against lag $l$ (axis 0 to about 19; y-axis 0-1). The black line is geometric with $\alpha_m=0.8$. The red line is delayed with the same $\alpha_m$ and $\theta_m=5$. Values computed from Eqs. 2-3 (my computation; the paper gives only the plot):
>
> | lag $l$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 13 |
> |---|---|---|---|---|---|---|---|---|---|---|---|
> | geometric $0.8^{l}$ | 1.00 | 0.80 | 0.64 | 0.51 | 0.41 | **0.33** | 0.26 | 0.21 | 0.17 | 0.11 | 0.055 |
> | delayed $0.8^{(l-5)^2}$ | 0.004 | 0.028 | 0.13 | 0.41 | 0.80 | **1.00** | 0.80 | 0.41 | 0.13 | 0.004 | ~$10^{-6}$ |
>
> Geometric adstock decays monotonically from lag 0. Delayed adstock is a symmetric bell centred on lag 5: it is almost zero at lags 0-1, rises to its peak at lag 5, and is almost zero again by lag 10. A delayed medium therefore puts nearly all of its weight on spend from 3-7 weeks earlier, while a geometric medium puts most weight on the most recent weeks. Note also that the geometric tail at $\alpha=0.8$ is still about 0.05 at lag 13. The paper's "$L=13$ is a good approximation to infinity" claim (weights below $10^{-7}$ beyond 13 weeks) refers to the **Table 1 delayed-adstock parameters**, whose Gaussian tails die out far faster.
^figure1

## Examples

> [!example] Simulation generating parameters (Sec. 5, Table 1)
> The simulated dataset uses **delayed adstock**. Per-media: retention $\alpha = (0.6, 0.8, 0.8)$, delay $\theta = (5, 3, 4)$ for Media 1/2/3, with $L = 13$. Estimation recovery (Sec. 6): the delay $\theta$ is estimated with **low bias and only moderate uncertainty even in small samples**, while $\alpha$ shows somewhat more bias/uncertainty in small samples but is precise for large samples. Adstock parameters are recovered better for stronger-signal media (Media 1, 2) than the weak Media 3.
^simulation-generating-parameters

> [!example] Real-data preference for geometric adstock (Sec. 8)
> In the shampoo application the delay $\theta$ is **not estimated well** in either Model I or Model II (Fig. 16: Model I's posterior is bimodal, Model II's is nearly flat like its uniform prior), so the authors prefer the simpler geometric adstock. The delayed form also barely changes the likelihood (Table 9: negative log-likelihood 98.12 for Model I vs 98.06 for Model III). See [[MMM Model Selection and Application]].
^real-data-preference-for

## Connections

- Direct generalization of the **Koyck / geometric distributed lag** model: [[Carryover Effects and Distributed Lags]]. The retention rate $\alpha_m$ plays the role of the Koyck carryover coefficient $\lambda$.
- Feeds the combined model in [[Bayesian Media Mix Modeling - Overview]] (adstock applied before Hill shape transform).
- Prior choices for $\alpha_m$ (beta/uniform on $[0,1)$) and $\theta_m$ (uniform on $[0,L-1]$): [[Bayesian Estimation and Priors for MMM]].

## See Also

- [[Shape (Saturation) Effects]]
- [[Carryover Effects and Distributed Lags]]
- [[Bayesian Media Mix Modeling - Overview]]
- [[Design of Dynamic Response Models]] — covers the broader design space for dynamic marketing response (Koyck, PDL, ARMA transfer functions) of which adstock is a special case
- [[_Index|Index: Bayesian Media Mix Modeling]]
- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] — Table 1 generating parameters
- [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] — adstock-then-shape ordering (Sec. 2.3)
- [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] — levels regressions of trending KPIs on adstocked spend risk spurious regression
- [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]] — carryover produced by mindset persistence, a distinct DGM for testing adstock MMMs
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — omitting carryover gives negative ROAS bias
- [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] — general regression in which adstock transforms sit
