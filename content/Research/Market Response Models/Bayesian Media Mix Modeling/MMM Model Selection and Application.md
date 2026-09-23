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
aliases:
  - BIC Model Selection MMM
  - Shampoo Advertiser MMM
  - MMM Simulation Recovery
---

# MMM Model Selection and Application

> [!summary]
> The functional forms for carryover and shape are not known a priori, so Jin et al. fit competing specifications and pick among them by **BIC** ($-2\log\hat{\mathcal{L}} + k\log n$), which rewards fit and penalizes complexity. In the **shampoo-advertiser** application (2.5 years weekly, 5 media channels), four models crossing {delayed, geometric} adstock with {Hill, reach} shape are compared; their likelihoods are nearly identical, so BIC favors the **most parsimonious** (Model IV: geometric adstock + reach). Simulations confirm the model recovers parameters well on huge samples (sixty years) but is biased on realistic two-year samples — reinforcing that real MMM data lacks the information to identify rich carryover/shape forms.

## Overview

This note collects the empirical evidence: (1) large-vs-small-sample recovery simulations, and (2) the real shampoo dataset with BIC-based model selection, ROAS/mROAS reporting, optimization, and residual diagnostics.

## Main Content

> [!definition] Bayesian Information Criterion (BIC)
> $$
> \text{BIC} = -2\log\hat{\mathcal{L}} + k\log n,
> $$
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
> Setup: 500 simulated datasets, 3 media + 1 control (price), comparing **two years** vs **sixty years** of weekly data, priors fixed (Table 3). Result: adstock parameters $(\alpha,\theta)$ recover fairly well at both sizes; shape parameters $(\mathcal{K},\mathcal{S},\beta)$ and the $\beta$Hill curves are badly biased (underestimated) at two years but near-unbiased at sixty years.
> Relative bias of $\beta$Hill at $x=1$: Media 1 −32.5% (2 yr) → −0.2% (60 yr); Media 2 −18.1% → 3.3%; Media 3 −25.3% → 10.4%. **Interpretation:** real MMM data (a couple of years) carries too little information; the priors dominate (see [[Bayesian Estimation and Priors for MMM]]). Note: lengthening history is *not* the recommended fix in practice (market conditions drift) — better to pool brands/geos for informative priors.

> [!example] Sampler timing (Sec. 5.1, Table 8)
> On one simulated dataset the custom Gibbs sampler with 10,000 iterations took 52 s; STAN with 1,000 iterations took 1,149 s. On the real data, including highly correlated control variables made STAN take 3,040 s; orthogonalizing the controls (regress distribution & promotion on price, use residuals) cut it to 75 s. Model complexity drives runtime: Model I (471 s, all 5 media) ≫ Model IV (91 s). All models converged ($\hat R \approx 1$).

> [!example] Shampoo advertiser: BIC selection (Sec. 8, Table 9)
> Data: 2.5 years weekly volume sales (ounces), 5 media (TV, magazines, display, YouTube, search), controls price/distribution/promotion (highly correlated, so orthogonalized; $n=106$). Negative log-likelihoods are almost identical across models (~98.1), so BIC is driven entirely by the complexity penalty:
> | Model | NegLogLik | $\Delta$ penalty | BIC |
> |-------|-----------|------------------|-----|
> | I | 98.12 | 0 | 98.12 |
> | II | 98.11 | −23.3 | 74.81 |
> | III | 98.06 | −23.3 | 74.76 |
> | IV | 98.09 | −46.6 | **51.49** |
> **Model IV (geometric adstock + reach) wins.** Rationale matches diagnostics: the delay $\theta$ is not estimated (posterior ≈ uniform prior → prefer geometric adstock); the flexible $\beta$Hill gives much wider credible intervals than reach without better fit → prefer reach. The retention rate $\alpha$'s posterior ≈ its prior, i.e. the data carries little information about carryover.

> [!example] ROAS / mROAS and optimization on real data (Sec. 8)
> Scaled ROAS/mROAS reported for the two biggest channels (TV, magazines). All four models give similar mROAS-of-TV and ROAS-of-magazines; reach-based Models II & IV give smaller magazine-mROAS medians and Model IV the least mROAS variance. All models have **large extreme values / long right tails in ROAS posteriors**. Optimizing the TV/magazine split (Model IV): the optimal-spend posterior is **bimodal at the extremes** and estimated sales vary far more across posterior samples than across the mix — so the optimal allocation is **not trustworthy** (cf. [[ROAS, mROAS, and Optimal Media Mix]]).

> [!example] Residual diagnostics & misspecification (Sec. 8, Fig. 17)
> Residual autocorrelation is much lower than that of raw log-sales (the adstock + explanatory variables absorb most serial dependence), but **significant autocorrelation persists up to lag ~15 weeks** — a sign of model misspecification. Suggested extensions: multi-stage / graphical models for richer media-to-sales mechanisms.

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
