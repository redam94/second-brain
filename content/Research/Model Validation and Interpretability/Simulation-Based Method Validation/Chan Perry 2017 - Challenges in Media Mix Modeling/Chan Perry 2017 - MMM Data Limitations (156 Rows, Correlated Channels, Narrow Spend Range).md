---
title: "Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "§4 intro (p.6); §4.1 Data limitations: §4.1.1 Limited amount of data (p.6), §4.1.2 Correlated input variables incl. Figure 1 (pp.6-7), §4.1.3 Limited range of data incl. Figure 2 (pp.7-8)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
used_by:
  - "[[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]"
  - "[[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]]"
aliases:
  - Chan Perry 156 data points
  - Chan Perry Figure 1 correlated response surfaces
  - Chan Perry Figure 2 extrapolation uncertainty
  - MMM 7-10 data points per parameter rule
  - Average ROAS requires extrapolation to zero spend
---

# Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)

> [!summary]
> Section 4.1 of Chan & Perry (2017) lists three data limitations that undermine Eq. (3) even before causality enters.
> (1) **Too few rows**: three years of national weekly data is 156 points, often for 20+ channels at 3-4 parameters
> each, against a rule of thumb of 7-10 points per parameter. (2) **Correlated inputs**: channels planned together
> admit many response surfaces that fit and even predict out-of-sample equally well but disagree once spend departs
> from history (Figure 1). (3) **Narrow spend range**: curves that fit equally well inside the observed range diverge
> outside it (Figure 2), so doubling spend and **average ROAS** (which extrapolates to zero spend) are poorly
> determined even when **marginal ROAS** near current spend is reasonable.
^summary

## Overview

Section 4 opens (p.6) by noting that these issues "are frequently encountered by the modeler, but are often not openly
acknowledged or discussed with the end-user of the MMM". It groups them into three areas: data limitations (this note),
selection bias ([[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]]),
and modeling ([[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]). The data limitations
violate trustworthiness conditions 1-3 of [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification#^thm-cp-trust-conditions]].

## Main Content

### §4.1.1 Limited amount of data (p.6)

> [!theorem] The MMM sample-size gap (§4.1.1, p.6)
> - "A typical MMM dataset, consisting of three years of national weekly data is only 156 data points."
> - From it the modeler is "expected to produce a MMM often with 20 or more ad channels".
> - Flexible response forms as in Eq. (3) are typically required; modeling a lag and a diminishing return "might require
>   3 - 4 parameters for each channel", so the parameter count "could exceed the number of data points available".
> - Rule of thumb for a *stable* linear regression, setting causal validity aside: "7-10 data points per parameter, of
>   which typical MMMs fall short."
^thm-cp-sample-size-gap

**Arithmetic.** 20 channels x 3-4 parameters = 60-80 media parameters before any control. At 7-10 rows per parameter
that needs 420-800 rows, i.e. 8-15 years of weekly data, against the 156 available. The ratio actually achieved is about
2-2.6 rows per media parameter. Formal minimum-sample-size criteria for prediction models (shrinkage, optimism, precision
of the intercept) are developed in [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]; Jin et al.'s
simulation confirms the point for MMM shape parameters ([[MMM Model Selection and Application]]; detail in
[[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]).

### §4.1.2 Correlated input variables (pp.6-7)

Advertisers allocate spend across channels in a correlated way, which can be sensible for effectiveness. These choices
also interact with other marketing decisions, so the whole input set is correlated: a channel may only be observed at a
high level when another marketing variable is high, or only in a particular season (p.6).

> [!theorem] Consequences of correlated inputs (§4.1.2, pp.6-7)
> For a linear regression, highly correlated inputs give coefficient estimates with **high variance**, which leads to bad
> attribution of sales to channels. Three named consequences:
> 1. **Many surfaces, equal fit.** Many response surfaces with different slopes fit the data well (Figure 1).
> 2. **Out-of-sample accuracy does not discriminate.** Such models can give "good predictive accuracy of out-of-sample
>    sales, but perform poorly when the advertiser deviates from previous spend patterns", because "the data contains
>    little information about sales outcomes when one of the ad channels moves independently of the other" (p.7).
> 3. **Instability.** "The estimated relationship can change radically due to small changes in the data or the addition
>    or subtraction of seemingly unrelated variables in the model" (p.7).
^thm-cp-collinearity

> [!example] Figure 1 - Two response planes for two correlated channels (§4.1.2, p.7)
> **What is plotted.** A 3-D scatter: two ad channels' spend on the horizontal axes, labelled "Media 1" and "Media 2"
> (each with ticks 0-1), and sales on the vertical axis, labelled "Sales" (ticks up to 3). The observed points are red
> dots with vertical drop lines to the floor. They lie along a narrow diagonal ridge because the two channels' spend is
> strongly correlated. (Axis labels, ranges and plane colours checked against the rendered p.7.)
>
> **Two fitted planes** (one blue, one green) both pass through the ridge and fit the observed data well, yet have
> different slopes with respect to each channel.
>
> **Reading.** Along the diagonal, both planes agree, so any test set drawn from the same planning regime is predicted
> equally well. Off the diagonal (one channel moved without the other) they disagree; that is exactly the region a budget
> reallocation explores. In regression terms only the sum $\beta_1+\beta_2$ (the effect along the ridge) is identified
> well; the contrast $\beta_1-\beta_2$ has huge variance.
^ex-cp-fig1

**Why the sum is identified and the contrast is not (vault sketch).** With $x_2 = x_1 + \eta$, $\operatorname{Var}(\eta)$
small, write $\beta_1x_1+\beta_2x_2=(\beta_1+\beta_2)x_1+\beta_2\eta$. The coefficient on $\eta$ is estimated with
variance $\propto\sigma^2/(T\operatorname{Var}(\eta))$, which explodes as $\operatorname{Var}(\eta)\to0$; the coefficient
on $x_1$ does not. Any reallocation question depends on $\beta_2$ separately and inherits the explosion.

### §4.1.3 Limited range of data (pp.7-8)

Advertisers settle on a spend range that suits their business; models fitted to that history are then asked about
spend outside it, e.g. "what if I double my ad spend next year?" (p.7).

> [!example] Figure 2 - Extrapolation uncertainty from a limited spend range (§4.1.3, p.8)
> **Left panel:** the response curve over a wide spend range (ad spend 0-1000, sales rising concavely from 0 to about 650),
> i.e. what the modeler would see if the advertiser had spent across the whole range. A grey box marks a narrow window.
>
> **Middle panel:** what the modeler actually has: points only in the narrow window (ad spend about 100-240, sales about
> 220-370), where the curve looks almost linear.
>
> **Right panel:** four fitted response curves on the windowed data, each labelled with $R^2 = 0.8$: a **linear**, a
> **log**, a **log-log** and a **quadratic** model. They overlap on the observed range but at spend around 600 they range
> from rising steeply (linear, log) to flattening (log-log) to *falling* toward zero (quadratic).
>
> **Reading.** Fit statistics on the observed range cannot choose among them; the answer to a doubling of spend depends
> entirely on the functional-form assumption. (Axis values above are read off the plot and are approximate.)
^ex-cp-fig2

> [!theorem] Marginal vs. average ROAS under limited range (§4.1.3, p.8)
> "What happens if I cease my ad spend?" is also an extrapolation: average ROAS for a channel requires extrapolating the
> response curve back to **zero spend**. The fitted model "might provide reasonable estimates of the marginal ROAS, due to
> the data available around current spend levels, but poor estimates of the average ROAS" (p.8).
^thm-cp-avg-vs-marginal

In the notation of [[ROAS, mROAS, and Optimal Media Mix]]: mROAS is a local derivative at current spend (supported by
data), while average ROAS is $[\text{sales}(x)-\text{sales}(0)]/x$, which depends on the curve over $[0,x_{\min}]$, where
there are no data.

## Examples

> [!example] Simulating the Figure 1 failure (vault illustration, not from the paper)
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> T = 156
> a = rng.gamma(4, 25, T)                      # channel A weekly spend
> b = 0.9 * a + rng.normal(0, 5, T)            # channel B planned with A (corr ~0.98)
> sales = 1000 + 2.0 * a + 0.5 * b + rng.normal(0, 60, T)
> X = np.column_stack([np.ones(T), a, b])
> fits = []
> for s in range(200):                         # bootstrap refits
>     i = rng.integers(0, T, T)
>     fits.append(np.linalg.lstsq(X[i], sales[i], rcond=None)[0])
> fits = np.array(fits)
> print("sd beta_A, beta_B:", fits[:, 1].std(), fits[:, 2].std())
> print("sd beta_A + 0.9*beta_B:", (fits[:, 1] + 0.9 * fits[:, 2]).std())
> ```
> The individual coefficients swing widely across resamples (and can change sign) while the combination along the
> planning direction is stable. In-sample $R^2$ and a random holdout barely move. Reallocating budget from B to A is a
> question about $\beta_A-\beta_B$, which the data barely inform.
^ex-cp-collinearity-sim

> [!example] Same issue in a feature-importance workflow (vault illustration)
> Weekly marketing data with 52-156 rows, fitted with a tree ensemble and explained with SHAP, shows the same pathology:
> correlated channels split importance arbitrarily between themselves and the split changes between refits. See
> [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and
> [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] (permuting one of two correlated inputs
> forces the model to extrapolate off the data ridge, the Figure 1 problem in another guise).
^ex-cp-shap-collinearity

## Connections

- Equal-fit, different-slope models are a case of the Rashomon effect formalized in
  [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] and first named in
  [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- Narrow-range extrapolation is why Jin et al. use informative priors on Hill parameters; see
  [[Shape (Saturation) Effects]] and [[Bayesian Estimation and Priors for MMM]].
- Remedies that add independent variation (category and geo pooling) are in
  [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]]; experiments that move one
  channel alone (e.g. [[Geo-Experiment Design and Power Analysis]]) break the correlation directly.
- Stability of selected variables under resampling: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[Model Selection and Overfitting]]: parameters vs. data points
- [[Spurious Association and Confounds]]: masked and multicollinear relationships in regression
