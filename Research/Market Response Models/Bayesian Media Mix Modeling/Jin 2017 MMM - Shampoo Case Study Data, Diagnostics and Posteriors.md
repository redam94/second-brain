---
title: "Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors"
tags:
  - source/ingested
  - topic/market-response
  - topic/model-validation
  - topic/mcmc
  - type/example
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 8, pp. 22-27 (Tables 7-9, footnotes 4-7, Figures 13-17)"
date_updated: 2026-10-13
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[MMM Model Selection and Application]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]]"
used_by:
  - "[[Jin 2017 MMM - Conclusions, Limitations and Extensions]]"
aliases:
  - Jin 2017 shampoo case study
  - Jin Table 8 STAN running time
  - Jin Figure 13 control correlation
  - Jin Figure 16 posteriors vs priors
  - Jin Figure 17 residual autocorrelation
---

# Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors

> [!summary]
> Section 8 fits the model to **2.5 years of weekly data** ($n=106$) for a shampoo brand: log volume sales, five media and three retail controls. The full detail is: the controls are almost collinear (price-distribution $r=-0.98$), and **orthogonalising** them cut STAN time from 3040 s to 75 s. Run times for all four specifications are in Table 8. BIC (Table 9) is decided entirely by the complexity penalty. The posterior of the retention rate **matches its prior** and $\theta$ is not identified. The Hill-based models' $\beta$Hill panels need a y-axis **20 times larger** than the reach-based ones, and their credible intervals are much wider. The Hill and reach models disagree about 3- to 4-fold on magazines mROAS (Fig. 14) and about 10-fold on the TV $\beta$Hill median (Fig. 16). Residual autocorrelation (about 0.6 at lag 1) persists to lag 15, which signals **misspecification**. The real data could not estimate carryover or shape, which confirms the simulation warning.
^summary

## Overview

[[MMM Model Selection and Application]] already summarises the BIC choice and headline results. This note adds the parts it left out: the data description, the correlation structure, the full run-time table, the footnotes behind the BIC numbers, the per-model ROAS/mROAS comparison, the posterior-vs-prior plots, and the residual diagnostic.

## Main Content

> [!definition] Data (p. 22)
> - **Source (provenance as stated in the paper, p. 22):** an unnamed shampoo advertiser. The data were provided by the MMM vendor **Neustar MarketShare** and consolidated from "sources such as" **Kantar Media, IRI, ITG, JD Power, and Rentrak** (syndicated media-spend, retail-scanner and audience panels; the paper lists the names without saying which variable came from which).
> - **Length:** 2.5 years of weekly data. Footnote 6 gives **$n=106$**.
> - **Response:** **log** weekly volume sales (ounces). An inverse transform is therefore needed before computing ROAS (Sec. 4.1).
> - **Media (5):** TV, magazines, display, YouTube, search.
> - **Controls (3):** average price per ounce, **ACV-weighted distribution** and ACV-weighted promotion. Footnote 4: ACV ("all-commodity volume") is a measure of product availability weighted by total store sales.
> - **$L=13$** weeks for all media (Sec. 2.1).
> - **Priors:** "similar priors as in Table 3 in the simulation studies" (p. 22), i.e. beta$(3,3)$ on $\alpha$, uniform$(0,12)$ on $\theta$, gamma$(3,1)$ on $S$, beta$(2,2)$ on $K$, half-normal on $\beta$. The paper does not list the exact shampoo hyperparameters. Fitted with Stan, 3 chains × 1000 iterations, first half as burn-in (footnote 5).
^shampoo-data

> [!definition] Figure 13 — correlation structure (p. 23)
> **(a) Controls**
>
> | | price | distribution | promotion |
> |---|---|---|---|
> | price | 1 | -0.98 | -0.77 |
> | distribution | -0.98 | 1 | 0.74 |
> | promotion | -0.77 | 0.74 | 1 |
>
> **(b) Media spend**
>
> | | TV | magazines | display | YouTube | search |
> |---|---|---|---|---|---|
> | TV | 1 | 0.13 | 0.28 | 0.05 | 0.46 |
> | magazines | 0.13 | 1 | 0.21 | -0.04 | 0.11 |
> | display | 0.28 | 0.21 | 1 | 0.17 | -0.15 |
> | YouTube | 0.05 | -0.04 | 0.17 | 1 | -0.23 |
> | search | 0.46 | 0.11 | -0.15 | -0.23 | 1 |
>
> TV and search correlate at 0.46. This is the kind of confounding that Chen et al. (2017) on paid-search bias, cited in Sec. 1, addresses.
^fig13

> [!algorithm] Orthogonalising correlated controls (p. 22)
> Highly correlated controls produce highly correlated posteriors for $\gamma_c$, which slows MCMC mixing. The fix:
> 1. Keep **price** as is.
> 2. Regress **distribution** on price with a single-variable OLS and keep the **residuals** as the distribution predictor.
> 3. Do the same for **promotion** on price.
> 4. Use price plus the two residual series as the controls, which are now nearly orthogonal.
>
> This changes the parameterisation, so $\gamma$ for the residualised controls means *the effect beyond what price predicts*. It also speeds sampling (Table 8). The authors justify it computationally. It is not a causal adjustment.
^orthogonalize

> [!definition] Table 8 — STAN running time (p. 23)
>
> | Model | Control | Media | Running time (s) |
> |---|---|---|---|
> | I | Original correlated variables | TV, Magazines | 3040 |
> | I | Orthogonal variables | TV, Magazines | 75 |
> | I | Orthogonal variables | all five media | 471 |
> | II | Orthogonal variables | all five media | 181 |
> | III | Orthogonal variables | all five media | 112 |
> | IV | Orthogonal variables | all five media | 91 |
>
> Caption details: **3 chains in parallel, 1000 iterations each**. The reported time is that of the **last chain to finish**. All models converged, with Gelman-Rubin $\hat R$ equal or close to 1. Footnote 5: the **first half** of each chain is burn-in (the STAN default).
^table8

> [!definition] Table 9 — BIC with footnotes (p. 24)
>
> | Model | Negative log-likelihood | Change in $k$ | Change in penalty | BIC |
> |---|---|---|---|---|
> | I | 98.12 | 0 | 0 | 98.12 |
> | II | 98.11 | -5 | -23.3 | 74.81 |
> | III | 98.06 | -5 | -23.3 | 74.76 |
> | IV | 98.09 | -10 | -46.6 | **51.49** |
>
> - **$\Delta k$:** Model II drops the 5 slopes $S_m$ (reach fixes $S=1$). Model III drops the 5 delays $\theta_m$ (geometric adstock). Model IV drops both.
> - **Penalty:** $5\log(106)\approx 23.3$, consistent with footnote 6 ($n=106$).
> - **Footnote 7:** the BIC values "are different from the one calculated in (18) by a constant common to all models". The table's BIC column equals the negative log-likelihood plus the change in penalty, so it is a relative score. (My observation: the column uses $-\log\hat L$ rather than $-2\log\hat L$. The likelihoods differ by at most 0.06, so the ranking is unaffected.)
> - $\log\hat L$ is approximated by averaging the log-likelihood over post-burn-in posterior draws (Sec. 8, p. 23).
> - **Caveat:** BIC, DIC and WAIC choose the best *regression* model, "not the model with the most accurate causal inference".
^table9

> [!theorem] Result: ROAS/mROAS across the four models (Figure 14, p. 25)
> Scaled ROAS and mROAS for **TV** and **magazines**, the two largest channels. Both are scaled by a common constant.
> - All four models agree on **TV mROAS** and **magazines ROAS**.
> - The reach-based models (II, IV) give **smaller magazines-mROAS medians**. For **TV ROAS** the pattern reverses, though the spread among medians is smaller.
> - **Every model's ROAS posterior has large extreme values.**
> - The mROAS posteriors have long right tails for every model except **Model IV**, which has the **smallest mROAS variance** for both channels.
>
> **Approximate readings (scaled units; x-axis 0-0.6 in every panel; dashed lines = posterior medians):**
>
> | Panel | Peak density | Model I median | Model II median | Model III median | Model IV median |
> |---|---|---|---|---|---|
> | TV ROAS | about 15 (Models I, III spike at about 0.02) | about 0.025 | about 0.085 | about 0.025 | about 0.07 |
> | TV mROAS | about 7.5-8.7 | about 0.08 | about 0.06 | not distinguishable (overlaps) | about 0.045 |
> | Magazines ROAS | about 10-12 | about 0.065 | about 0.08 | about 0.04 | about 0.055 |
> | Magazines mROAS | about 13 (Model IV), about 9 (Model II), about 4-5 (I, III) | about 0.17 | about 0.06 | about 0.13 | about 0.04 |
>
> - **Size of the magazines-mROAS disagreement.** The Hill models put the median at about 0.13-0.17; the reach models at about 0.04-0.06. That is roughly a **3- to 4-fold difference** in marginal return for the same channel and data, driven only by the shape specification. Models I and III also keep visible density out to about 0.6.
> - **TV ROAS reversal.** Here the reach models (II, IV) have the *larger* medians (about 0.07-0.085 vs about 0.025), but the gap, about 0.05-0.06 in scaled units, is smaller than the magazines-mROAS gap of about 0.1.
> - All ROAS densities have thin tails reaching about 0.45-0.55.
^fig14

> [!theorem] Result: TV/magazine optimisation is not trustworthy (Figure 15, p. 25)
> Model IV with total weekly TV + magazines spend fixed at its **historical average**. Both approaches are used (see [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results#^alg-opt]]).
> - **(a)** The posterior of the optimal TV share is **bimodal, with modes at both extremes** of the spend-ratio range. The caption marks the **posterior mean** with the black line; in the simulation it was the median.
> - **(b)** Estimated sales vary **much more across posterior draws than across mixes**.
> - Moving the total budget far from the historical average would make prediction variance even larger, because predictions would fall in sparse data or require extrapolation.
>
> **Approximate readings.**
> - **(a)** The posterior density of the optimal TV share (approach B) has a spike of about **15 at a share of 0** and about **14 at a share of 1**. Between them there are only small bumps: about 1 near 0.05-0.1, about 1 near 0.28 and 0.7, and about 3 near 0.42 and 0.78. The **black line (posterior mean)** sits at about **0.47**, in a region with almost no posterior mass. The **blue line (approach A, optimise the averaged sales curve)** sits at about **0.65**.
> - **(b)** Scaled sales per posterior draw spread over roughly **10-90** on a 0-100 axis at every mix. The blue averaged curve is nearly flat, about **42 at a TV share of 0, about 44 near 0.6, about 43 at 1**. The change across all mixes, about 2 units, is a small fraction of the spread across draws, about 80 units.
> - **Interpretation.** The two-mode posterior of the optimum and the mean landing between the modes are the signs of a flat objective, the same failure seen in simulated Scenario II ([[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results#^fig6]]), but more extreme. The approach-A and approach-B answers differ by about 0.18 in TV share, and neither is supported by the data.
^fig15

> [!theorem] Result: posteriors reproduce priors, and Hill bands are far wider on a 20-times-larger axis (Figure 16, pp. 26-27)
> For TV, posteriors (black) are overlaid on priors (orange), with 95% credible bands and medians of $\beta$Hill (blue dashed) for each model:
> 1. **Scale:** the y-axis of the $\beta$Hill panels for Models I and III (Hill) is **20 times** that of Models II and IV (reach): up to about 0.6 vs about 0.03. The Hill models have **much wider** credible intervals. In the authors' words, "Allowing a more flexible functional form of curvature does not lead to more accurate estimates, instead, it results in much larger variance" (p. 24).
> 2. **Delay $\theta$** is **not estimated well** in Model I or II. This motivates choosing geometric adstock.
> 3. **Retention $\alpha$:** the posterior is **almost identical to the prior** in all models, so the data do not move the prior.
>
> **Approximate panel readings.**
>
> | Panel | What is plotted | Reading |
> |---|---|---|
> | (a1), (b1), (c1), (d1) $\alpha$ | posterior vs prior on $[0,1]$ | The prior is a symmetric bell peaking at about **1.85-1.9 at 0.5**, consistent with beta$(3,3)$ (density 1.875 at 0.5). The posteriors follow it closely over about 0.05-0.95, with ragged peaks of about **2.4** (I, at about 0.5), **2.05** (II), **2.2** (III, at about 0.55) and **2.35** (IV, at about 0.48). The y-axes reach about 2.5 for Model I and about 2.0-2.3 for the others. |
> | (a2) $\theta$, Model I | posterior vs flat prior on 0-12 | The prior is flat at about **0.077** (about $1/13$). The posterior is **bimodal**: about **0.155 near $\theta\approx2.5$** and about **0.125 near $\theta\approx9$**, with a trough of about 0.02-0.04 around 7-8. The y-axis reaches about 0.15. The data allow either a short or a long delay. |
> | (b2) $\theta$, Model II | same | The posterior is a noisy **flat line** at about **0.06-0.10** across 0-12 (y-axis to about 0.09-0.1), essentially the prior. |
> | (a3), (c2) $\beta$Hill, Hill models | TV curve vs scaled spend | Median at $x=1$ about **0.075 (Model I)** and **0.105 (Model III)**. The shading reaches the top of the 0.6 axis by about $x=0.5$, so the upper 95% limit at $x=1$ is **above 0.6**, at least 6-8 times the median. The curve is convex (S-shaped) over the observed range. |
> | (b3), (d2) $\beta$Hill, reach models | same | Median at $x=1$ about **0.007 (II)** and **0.0075 (IV)**, concave from 0. The shading reaches the top of the 0.03 axis, so the upper 95% limit at $x=1$ is **above 0.03**, at least 4 times the median. |
> | rug in every $\beta$Hill panel | observed scaled TV spend | almost all weeks fall at **0-0.35** of the scaled range, with one point near 0.5. Everything to the right is extrapolation. |
>
> The Hill and reach medians at $x=1$ differ by about **10 times** (about 0.075-0.105 vs about 0.007). The two model families disagree on the size of the TV effect, not just on its uncertainty.
>
> Conclusion: with a few hundred observations, the priors largely determine the posteriors of the carryover and shape transforms, and biased priors give biased estimates.
^fig16

> [!theorem] Result: residual autocorrelation indicates misspecification (Figure 17, p. 27)
> For **each MCMC draw**, compute the autocorrelation function of the regression residuals, then **average across draws** (Fig. 17a). Compare with the ACF of log sales (Fig. 17b).
> - The residuals are **much less autocorrelated** than the response, so adstock and the covariates explain much of the serial dependence.
> - **Significant residual autocorrelation remains up to lag 15 weeks**, which signals model misspecification.
> - Suggested remedies (Sec. 9): multi-stage regression or graphical models for media's effect on sales.
>
> **Approximate ACF readings (lags 0-20; y-axis -0.2 to 1.0; the dashed significance bound sits at about 0.19, close to $1.96/\sqrt{106}$):**
>
> | Lag | 1 | 2 | 3 | 5 | 8 | 10 | 12 | 15 | 20 |
> |---|---|---|---|---|---|---|---|---|---|
> | (a) average residual ACF | 0.60 | 0.50 | 0.47 | 0.52 | 0.37 | 0.31 | 0.29 | 0.24 | 0.18 |
> | (b) ACF of log sales | 0.96 | 0.93 | 0.90 | 0.82 | 0.70 | 0.63 | 0.56 | 0.46 | 0.30 |
>
> - Log sales decay slowly and almost linearly, staying above the bound at every lag shown, which looks like a near-unit-root or strongly seasonal series.
> - The model removes roughly a third to a half of the autocorrelation at each lag. Residual ACF is still about 0.5 at lags 1-5 (with a bump at lags 4-5) and stays above the bound until about lag 15-16, falling to about 0.18-0.2 by lags 17-20.
^fig17

## Examples

> [!example] Per-draw residual ACF as a posterior check
> Averaging the residual ACF over posterior draws is a simple [[Posterior Predictive Checking]]-style diagnostic suited to time-series MMMs. A white-noise likelihood with autocorrelated residuals also makes the posterior **overconfident**, because the effective sample size is smaller than $n$. Compare the classic warning about regressions with autocorrelated errors in [[Granger 2003 - Spurious Regression and Cointegration - Overview]].
^per-draw-residual-acf

## Connections

- BIC and its regression-vs-causal caveat: [[Overfitting and Information Criteria]], [[Model Selection and Overfitting]], [[LOO Model Checking and Comparison - Roaches]].
- Multicollinear controls and correlated channels in real MMM data: [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]].
- Convergence ($\hat R$) and the speed-up from reparameterisation: [[What to Do About Convergence Problems]], [[HMC and Stan in Practice]].
- Posterior equal to prior as a diagnostic: [[Influence of Likelihood and Prior]].
- Search/TV correlation and search-ad bias: [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map
- [[MMM Model Selection and Application]] — the BIC summary
- [[Jin 2017 MMM - Conclusions, Limitations and Extensions]]
