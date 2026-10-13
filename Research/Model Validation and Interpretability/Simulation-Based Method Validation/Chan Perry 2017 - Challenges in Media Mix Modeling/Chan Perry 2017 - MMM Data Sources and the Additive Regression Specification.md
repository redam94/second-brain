---
title: "Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "§3 Regression: §3.1 MMM Data (pp.4-5); §3.2 A general regression model, Eqs. (2)-(3) and the five trustworthiness conditions (pp.5-6)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]"
  - "[[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]]"
  - "[[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]"
aliases:
  - Chan Perry Eq. 3
  - Chan Perry MMM regression form
  - Chan Perry MMM data quality
  - Conditions for trustworthy MMM estimates
---

# Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification

> [!summary]
> Section 3 of Chan & Perry (2017) fixes the object the rest of the paper criticizes. **Data** (§3.1): weekly or monthly
> aggregates of a response KPI, media metrics (spend most common), marketing metrics and controls, assembled from many
> intermediaries and often of uneven quality and granularity. **Model** (§3.2): a general sales function $F$ of lagged media
> and controls (Eq. 2), usually specialized to an **additive** form with one nonlinear lagged response curve per channel
> and linear controls (Eq. 3). Estimates are "generally more trustworthy" under five conditions: enough data, useful
> variability, independent variation of inputs, all important drivers included, and a correctly captured causal structure.
^summary

## Overview

The companion paper by the same group, Jin et al. (2017), supplies the Bayesian machinery for Eq. (3) (adstock,
Hill saturation, priors, ROAS/mROAS); it is summarized in [[Bayesian Media Mix Modeling - Overview]]. Chan & Perry use
Eq. (3) as the reference point for every challenge in §4, so the notation below is reused across this note set.

## Main Content

### §3.1 MMM data (pp.4-5)

> [!definition] Typical MMM dataset (§3.1, p.4)
> Historical **weekly or monthly** data aggregated **nationally** (geo- or store-level data can also be used), containing:
> 1. **Response data**: typically sales, but possibly other KPIs such as store visits.
> 2. **Media metrics** per channel: impressions, clicks, GRPs, with **media spend** the most common.
> 3. **Marketing metrics**: price, promotion, product distribution.
> 4. **Control factors**: seasonality, weather, market competition.
^def-cp-mmm-data

MMMs are usually built on contract by a third party, sometimes in-house (p.4). Data-quality problems the paper lists:

| Problem (§3.1) | Mechanism | Consequence |
|---|---|---|
| **Granularity mismatch, response vs. ads** (p.4) | Sales may be SKU- or store-level, but ads are bought at brand/product level, usually nationwide | Response must be aggregated to the ad level |
| **Unclear product-to-campaign mapping** (p.4) | Which campaigns are "relevant" to which SKUs is partly subjective; **halo** effects from related brand advertising are hard to represent | Under- or over-attribution to particular SKUs |
| **Lowest common denominator of geography** (pp.4-5) | Whichever channel is available only at the coarsest level sets the granularity of the whole model | Throws away geo variation; Sun et al. (2017) show hierarchical Bayesian models can sometimes mix levels (see §5.3) |
| **Missing competitor data** (p.5) | Advertisers "generally have a robust data collection mechanism" for their own sales, and third-party providers supply sales, price and promotion data (including for competitors), but competitor pricing, promotion and distribution are often hard to get | These variables are often **omitted** |
| **Fragmented exposure data** (p.5) | Campaigns run through agencies and other intermediaries; data must be collected from many entities | Missing or misinterpreted data |
| **Proxy exposure metrics** (p.5) | Spend is obtainable, exposure is estimated differently by medium and vendor; e.g. print circulation is a poor proxy for people who saw the ad | Measurement error in the regressors, especially offline |

### §3.2 A general regression model (pp.5-6)

> [!definition] General regression MMM (§3.2, Eq. 2, p.5)
> $$y_t=F\big(x_{t-L+1},\ldots,x_t,\;z_{t-L+1},\ldots,z_t;\;\Phi\big),\qquad t=1,\ldots,T \qquad (2)$$
> - $y_t$: sales at time $t$.
> - $F(\cdot)$: the regression function, chosen by the modeler.
> - $x_t=\{x_{t,m},\ m=1,\ldots,M\}$: vector of $M$ ad-channel variables at $t$.
> - $z_t=\{z_{t,c},\ c=1,\ldots,C\}$: vector of $C$ control variables at $t$.
> - $\Phi$: vector of model parameters.
> - $L$: the longest lag at which media or controls affect sales.
^def-cp-general-mmm

To enable budget optimization and capture **diminishing returns**, the response of sales to one channel is summarized
by a one-dimensional **response curve** for that channel (p.5). The common simplification enters media additively and
controls linearly without lags:

> [!definition] Additive MMM (§3.2, Eq. 3, p.5)
> $$y_t=\sum_{m=1}^{M}\beta_m\, f_m\big(x_{t-L+1,m},\ldots,x_{t,m}\big)+\gamma^{\top} z_t+\epsilon_t \qquad (3)$$
> - $\beta_m$: channel-specific coefficient.
> - $f_m(\cdot)$: nonlinear transform of channel $m$'s current and lagged values, capturing carryover and reach/frequency
>   (diminishing-returns) effects.
> - $\gamma$: column vector of coefficients on the control vector $z_t$.
> - $\epsilon_t$: error term for variation in $y_t$ unexplained by the inputs.
> - $y_t$ may be transformed (e.g. logged) before modeling.
>
> Eq. (3) can be turned into a likelihood and fitted by maximum likelihood, Bayesian inference or other methods (p.5;
> see Jin et al. 2017).
^def-cp-additive-mmm

**Source vs vault context.** Chan & Perry leave $f_m$ unspecified: it takes the current and $L-1$ lagged values of channel $m$ (so carryover enters through the lags) and "captures nonlinearity in the effect of a single channel due to reach/frequency effects" (p.5); the
only pointer they give is "See Jin, Wang, Sun, Chan and Koehler (2017) for further discussion of model fitting
approaches" (§3.2, p.5). *Vault context, not stated in this paper:* in Jin et al. (2017), $f_m$ is a composition of an adstock transform
and a Hill saturation curve; see [[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]] and the
estimation set-up in [[Bayesian Estimation and Priors for MMM]]. That composition is one way to reach the "3 - 4
parameters for each channel" of §4.1.1 (e.g. decay, half-saturation point and slope plus $\beta_m$ gives 4; adding a peak-delay parameter gives 5). For how
Jin et al. simulate data from this exact form and fit it in Stan, see
[[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] and
[[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]; for the ROAS/mROAS quantities that Eq. (3) is used to
produce, see [[ROAS, mROAS, and Optimal Media Mix]].

> [!theorem] Conditions under which regression MMM estimates are more trustworthy (§3.2, p.6)
> The paper does not claim Eq. (3) is causal in general, but says estimates are "generally more trustworthy" when:
> 1. There are **enough data** to estimate all parameters in the model.
> 2. There is **useful variability** in the advertising levels and control variables.
> 3. Model inputs **vary independently**.
> 4. The model accounts for **all the important drivers** that might affect sales.
> 5. The model **captures the causal relationship** between variables.
>
> **How §4 maps onto the list (vault mapping; the paper does not pair challenges with conditions explicitly).** Condition 1 fails through limited data (§4.1.1); conditions 2-3 through correlated inputs
> and narrow spend ranges (§4.1.2-4.1.3); condition 4 through omitted demand drivers (§4.2.1-4.2.2); condition 5 through
> funnel effects and endogenous controls (§4.2.3) and through specification uncertainty (§4.3).
^thm-cp-trust-conditions

## Examples

> [!example] Counting parameters in Eq. (3) for a typical brief (vault illustration)
> $M=20$ channels, each with $f_m$ = geometric adstock (1 decay parameter) composed with a Hill curve (2 parameters), plus
> $\beta_m$: 4 parameters per channel, 80 media parameters. Add $C=10$ controls ($\gamma$), an intercept and a noise
> scale: 92 parameters. Three years of weekly national data give $T=156$. This is the arithmetic behind
> [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]].
^ex-cp-param-count

## Connections

- Eq. (3) is the same additive structure as the Bayesian MMM in [[Bayesian Media Mix Modeling - Overview]] and
  [[Bayesian Estimation and Priors for MMM]].
- Condition 4 (all important drivers) is the no-omitted-confounder assumption; see [[Omitted Variables Bias]] and
  [[DAGs and Causal Identification]].
- The data-quality list is a measurement-error problem in the regressors; aggregated weekly series with these issues are
  treated as single time series in [[Single Marketing Time Series]].

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[ROAS, mROAS, and Optimal Media Mix]]: the quantities derived from Eq. (3)
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]: a generative model whose truth is *not* of the
  Eq. (3) form, used to test it
