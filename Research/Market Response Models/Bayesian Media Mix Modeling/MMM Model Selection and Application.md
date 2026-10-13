---
title: MMM Model Selection and Application
tags:
  - source/ingested
  - topic/market-response
  - type/example
  - doc/paper
  - topic/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 5, pp. 10-15; Sec. 6, pp. 16-18; Sec. 8, pp. 22-27 (Eq. 18, Tables 7-9)"
date_ingested: 2026-06-17
date_updated: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
used_by:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
  - "[[Model Class Reliance - Discussion, Limitations and Extensions]]"
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
  - "[[Out-of-Sample Validation for Time-Series Models]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
  - "[[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
  - "[[Model Validation and Interpretability - Overview]]"
aliases:
  - BIC Model Selection MMM
  - Shampoo Advertiser MMM
  - MMM Simulation Recovery
---

# MMM Model Selection and Application

> [!summary]
> The functional forms for carryover and shape are not known a priori, so Jin et al. fit competing specifications and pick among them by **BIC** ($-2\log\hat{\mathcal{L}} + k\log n$), which rewards fit and penalizes complexity. In the **shampoo-advertiser** application (2.5 years weekly, 5 media channels), four models crossing {delayed, geometric} adstock with {Hill, reach} shape are compared; their likelihoods are nearly identical, so BIC favors the **most parsimonious** (Model IV: geometric adstock + reach). Simulations confirm the model recovers parameters well on huge samples (sixty years) but is biased on realistic two-year samples — reinforcing that real MMM data lacks the information to identify rich carryover/shape forms.
^summary

## Overview

This note collects the empirical evidence: (1) large-vs-small-sample recovery simulations, and (2) the real shampoo dataset with BIC-based model selection, ROAS/mROAS reporting, optimization, and residual diagnostics.

## Main Content

> [!definition] Bayesian Information Criterion (BIC)
> $$ \text{BIC} = -2\log\hat{\mathcal{L}} + k\log n, $$
> where $\hat{\mathcal{L}}$ is the maximized likelihood, $k$ the number of free parameters, and $n$ the sample size. $\log\hat{\mathcal{L}}$ is approximated by averaging the log-likelihood over post-burn-in posterior samples. BIC balances fit against complexity; the model with the **smallest** BIC is preferred. (DIC and WAIC are alternatives.) **Caveat:** these criteria select the best *regression* model, not the best *causal* model. (Eq. 18, Schwarz 1978)
^bic-eq

> [!definition] The four candidate specifications (Table 7)
> | Model | Adstock | Shape |
> |-------|---------|-------|
> | I | delayed adstock | $\beta$Hill |
> | II | delayed adstock | reach |
> | III | geometric adstock | $\beta$Hill |
> | IV | geometric adstock | reach |
> Model I is the most complex (most parameters via $\theta$ and $\mathcal{S}$), Model IV the most parsimonious.
^four-models

## Examples

> [!example] Simulation recovery: sample size matters (Sec. 6)
> Setup: 500 simulated datasets, 3 media + 1 control (price), comparing **two years** vs **sixty years** of weekly data, priors fixed (Table 3). Result: the delay $\theta$ has low bias and moderate uncertainty even at two years, but the retention rate $\alpha$ shows "somewhat more bias and uncertainty for small sample size" (p. 16) — e.g. the Media 3 mean posterior median is about 0.64 against a true 0.8 (Fig. 7a) — and both are precise only at sixty years. The adstock is estimated better for Media 1-2 than for the weak Media 3. Shape parameters $(\mathcal{K},\mathcal{S},\beta)$ have high variance and large bias at two years and still vary widely at sixty; the $\beta$Hill *curves* are underestimated at two years but near-unbiased at sixty years.
> Relative bias of $\beta$Hill (Table 4): at $x=0.5$, Media 1 −39.7% (2 yr) → −0.2% (60 yr), Media 2 −25.6% → 3.4%, Media 3 −39.0% → 10.4%; at $x=1$, Media 1 −32.5% → −0.2%, Media 2 −18.1% → 3.3%, Media 3 −25.3% → 10.4%. Sixty years is about 3,120 weekly rows against 104. **Interpretation:** real MMM data (a couple of years) carries too little information; the priors dominate (see [[Bayesian Estimation and Priors for MMM]]). Note: lengthening history is *not* the recommended fix in practice (market conditions drift) — better to pool brands/geos for informative priors.
^simulation-recovery-sample-size

> [!example] Sampler timing (Sec. 5.1, Table 8)
> On one simulated dataset the custom Gibbs sampler with 10,000 iterations took 52 s; STAN with 1,000 iterations took 1,149 s. On the real data, including highly correlated control variables made STAN take 3,040 s; orthogonalizing the controls (regress distribution & promotion on price, use residuals) cut it to 75 s. Model complexity drives runtime: Model I (471 s, all 5 media) ≫ Model IV (91 s). All models converged ($\hat R \approx 1$).
^sampler-timing

> [!example] Shampoo advertiser: BIC selection (Sec. 8, Table 9)
> Data: 2.5 years weekly volume sales (ounces), 5 media (TV, magazines, display, YouTube, search), controls price/distribution/promotion (highly correlated, so orthogonalized; $n=106$). Negative log-likelihoods are almost identical across models (~98.1), so BIC is driven entirely by the complexity penalty:
>
> | Model | NegLogLik | Change in $k$ | $\Delta$ penalty | BIC |
> |-------|-----------|---------------|------------------|-----|
> | I | 98.12 | 0 | 0 | 98.12 |
> | II | 98.11 | −5 | −23.3 | 74.81 |
> | III | 98.06 | −5 | −23.3 | 74.76 |
> | IV | 98.09 | −10 | −46.6 | **51.49** |
>
> **Model IV (geometric adstock + reach) wins.** Rationale matches diagnostics: the delay $\theta$ is not estimated (Model II posterior ≈ the uniform prior; Model I posterior bimodal near 2.5 and 9 weeks → prefer geometric adstock); the flexible $\beta$Hill gives much wider credible intervals than reach without better fit → prefer reach. The retention rate $\alpha$'s posterior ≈ its prior, i.e. the data carries little information about carryover.
^shampoo-advertiser-bic-selection

> [!example] ROAS / mROAS and optimization on real data (Sec. 8)
> Scaled ROAS/mROAS reported for the two biggest channels (TV, magazines). All four models give similar mROAS-of-TV and ROAS-of-magazines; reach-based Models II & IV give smaller magazine-mROAS medians and Model IV the least mROAS variance. All models have **large extreme values / long right tails in ROAS posteriors**. The Hill models' magazines-mROAS medians (about 0.13-0.17) are 3-4 times the reach models' (about 0.04-0.06). Optimizing the TV/magazine split (Model IV): the optimal-spend posterior is **bimodal at the extremes** (density about 15 at a TV share of 0 and about 14 at 1; posterior mean about 0.47, approach-A optimum about 0.65) and estimated sales vary far more across posterior samples than across the mix — so the optimal allocation is **not trustworthy** (cf. [[ROAS, mROAS, and Optimal Media Mix]]). Figure readings: [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]].
^roas-mroas-and-optimization

> [!example] Residual diagnostics & misspecification (Sec. 8, Fig. 17)
> Residual autocorrelation is much lower than that of raw log-sales (the adstock + explanatory variables absorb most serial dependence), but **significant autocorrelation persists up to lag ~15 weeks** (residual ACF about 0.6 at lag 1 and 0.24 at lag 15, vs 0.96 and 0.46 for log sales) — a sign of model misspecification. Suggested extensions: multi-stage / graphical models for richer media-to-sales mechanisms.
^residual-diagnostics-misspecification

## Connections

- Selects among the carryover forms of [[Carryover (Adstock) Functional Forms]] and shape forms of [[Shape (Saturation) Effects]].
- The small-sample bias narrative is the empirical payoff of [[Bayesian Estimation and Priors for MMM]].
- Reports the attribution metrics defined in [[ROAS, mROAS, and Optimal Media Mix]].
- Headline conclusions feed [[Bayesian Media Mix Modeling - Overview]]; relates to applied benchmarks in [[Advertising and Promotion Effects]] and [[Implementation of Market Response Models]].

## See Also

- [[Bayesian Estimation and Priors for MMM]]
- [[ROAS, mROAS, and Optimal Media Mix]]
- [[Bayesian Media Mix Modeling - Overview]]
- [[_Index|Index: Bayesian Media Mix Modeling]]
- [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]] — full Table 8, Fig. 13 correlations, BIC footnotes, Figs. 14-17
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] — Table 4 at both x = 0.5 and x = 1
- [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] — how importance is credited between collinear media channels
- [[Model Class Reliance - Discussion, Limitations and Extensions]] — report the channel-reliance range across near-optimal fits
- [[Stability Selection - Discussion, Limitations and Practice]] — stable driver selection on collinear weekly media data
- [[Out-of-Sample Validation for Time-Series Models]] — rolling-origin and nested validation with naive and phantom-media baselines
- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — audit the sample-size recovery simulation against ADEMP
- [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] — five equally fitting specifications disagree on ROAS and allocation
- [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] — validation gate for MMM outputs used in budgeting
- [[Model Validation and Interpretability - Overview]] — validation checklist for MMM outputs before budgeting
