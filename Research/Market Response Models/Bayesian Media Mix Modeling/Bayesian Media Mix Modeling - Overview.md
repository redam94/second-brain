---
title: Bayesian Media Mix Modeling - Overview
tags:
  - source/ingested
  - topic/market-response-models
  - type/overview
  - doc/paper
  - method/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Secs. 1-2, pp. 1-6; Sec. 9, pp. 27-28"
date_ingested: 2026-06-17
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[MMM Model Selection and Application]]"
aliases:
  - MMM
  - Media Mix Model
  - Marketing Mix Model
  - Jin 2017 MMM
---

# Bayesian Media Mix Modeling - Overview

> [!summary]
> Media mix models (MMM) are regression models advertisers use to measure media effectiveness and guide budget allocation. Jin, Wang, Sun, Chan & Koehler (Google, 2017) propose an MMM with flexible functional forms for two phenomena linear regression cannot capture — **carryover** (advertising's lagged effect) and **shape** (saturation / diminishing returns) — estimated in a **Bayesian** framework so prior knowledge can compensate for the low information content of a single MMM dataset. Key finding: the model recovers parameters well on large data, but for typical small samples (a couple of years of weekly data) the priors dominate and estimates can be biased; the optimal media mix derived from the model has large variance and must be trusted cautiously.

## Overview

An MMM relates aggregated sales (weekly or monthly, national or geo-level) to media spend across channels plus control variables (price, distribution, seasonality, macro factors). It descends from the marketing "4Ps" tradition (Borden 1964; McCarthy 1978) and is fundamentally a regression that infers causation from observational correlation. Randomized experiments across media are expensive and rarely feasible, so observational regression remains the workhorse despite its causal fragility (see [[Activity Bias in Advertising]] for one such confound).

Two well-documented features of advertising response break the classic linear decision model (Guadagni & Little 1983):

1. **Carryover / lag effect** — a portion of an ad's impact occurs in periods *after* the exposure (delayed consumer response, inventory effects, word-of-mouth). Modeled via the **adstock** transformation. See [[Carryover (Adstock) Functional Forms]].
2. **Shape / saturation effect** — response is not linear in spend; high spend yields diminishing returns (the "shape effect", Tellis 2006). Modeled via a curvature function. See [[Shape (Saturation) Effects]].

Because these transformations make the model **nonlinear in the parameters**, ordinary least squares / MLE is awkward, and the paper turns to **Bayesian estimation via MCMC** (see [[Bayesian Estimation and Priors for MMM]]). The Bayesian framing is motivated less by philosophy than by data scarcity: as Chan & Perry (2017) note, the information content within a single MMM dataset is low relative to the number of parameters, so **priors** drawn from industry experience or prior/related media-mix models are essential.

## Main Content

> [!definition] The MMM regression equation (combined model)
> For weekly national data over weeks $t = 1,\dots,T$, with $M$ media channels and $C$ control variables, the response (sales, or log-sales) $y_t$ is modeled as
> $$ y_t = \tau + \sum_{m=1}^{M} \beta_m \,\text{Hill}\!\left(x^{*}_{t,m};\,\mathcal{K}_m,\mathcal{S}_m\right) + \sum_{c=1}^{C} \gamma_c z_{t,c} + \epsilon_t, $$
> where
> - $x^{*}_{t,m} = \text{adstock}(x_{t-L+1,m},\dots,x_{t,m};\,w_m,L)$ is the carryover-transformed spend of channel $m$ (Eq. 1, see [[Carryover (Adstock) Functional Forms]]);
> - $\text{Hill}(\cdot)$ is the shape/saturation transform with shape (slope) $\mathcal{S}_m$ and half-saturation $\mathcal{K}_m$ (see [[Shape (Saturation) Effects]]);
> - $\beta_m \ge 0$ is the regression coefficient (maximum effect) of channel $m$;
> - $\tau$ is baseline sales (intercept), $\gamma_c$ the effect of control variable $z_{t,c}$;
> - $\epsilon_t$ is white noise, uncorrelated, constant variance.
>
> Media effects are assumed **additive** (no synergy/interaction between channels — a simplification, cf. Zhang & Vaver 2017). Carryover is applied *before* shape (adstock then Hill), which is appropriate when per-period spend is small relative to cumulative spend.
^combined-model

> [!definition] Why Bayesian
> Bayesian inference treats parameters $\Phi$ as random variables with a posterior $p(\Phi \mid \mathbf{y}, \mathbf{X}) \propto \mathcal{L}(\mathbf{y}\mid \mathbf{X},\mathbf{Z},\Phi)\,\pi(\Phi)$. The prior $\pi(\Phi)$ injects external knowledge to offset the weak signal in a single dataset, and the full posterior (not just a point estimate) supplies credible intervals and propagates parameter uncertainty into downstream attribution metrics (ROAS, mROAS, optimal mix).
^why-bayesian

## Examples

> [!example] Shampoo advertiser case study (preview)
> The model is applied to 2.5 years of weekly volume-sales data for a shampoo advertiser (TV, magazines, display, YouTube, search), with price/distribution/promotion as controls. Four functional-form specifications are compared by BIC; the most parsimonious (geometric adstock + reach transformation) wins. The optimal TV/magazine budget split has a bimodal, high-variance posterior — the data cannot reliably guide allocation. Full treatment in [[MMM Model Selection and Application]].

## Connections

- **Carryover** generalizes the classic distributed-lag idea: the geometric-decay adstock weight is the continuous/marketing analog of the **Koyck lag**. See [[Carryover (Adstock) Functional Forms]] and [[Carryover Effects and Distributed Lags]].
- **Shape** corresponds to the concave-vs-S-shaped response debate in [[Shape of the Marketing Response Function]].
- Empirical advertising-elasticity generalizations (~0.10 short-run) provide priors and sanity checks for $\beta_m$; see [[Advertising and Promotion Effects]].
- Bayesian/MCMC machinery: [[Bayesian Estimation and Priors for MMM]], [[MCMC Basics]], [[Bayesian Linear Regression]].

## See Also

- [[Carryover (Adstock) Functional Forms]]
- [[Shape (Saturation) Effects]]
- [[Bayesian Estimation and Priors for MMM]]
- [[ROAS, mROAS, and Optimal Media Mix]]
- [[MMM Model Selection and Application]]
- [[_Index|Index: Bayesian Media Mix Modeling]]
