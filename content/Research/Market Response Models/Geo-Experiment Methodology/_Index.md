---
title: "Index: Geo-Experiment Methodology"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Market Response Models]]"
date_updated: 2026-07-03
concept_count: 4
---

# Geo-Experiment Methodology

> [!abstract] Routing Summary
> Classical (non-Bayesian-design) geo-experiment methodology from two Google papers: randomized/matched geographic control groups, ad-spend perturbation, and two competing estimators — cross-sectional **Geo-Based Regression (GBR)** and time-series **Time-Based Regression (TBR)**. Contains 4 notes.
> - Need the topic framing, GBR-vs-TBR comparison table, and how this connects to the vault's Bayesian geo-holdout design problem? → [[Geo-Experiment Methodology - Overview]]
> - Need the GBR model, ad-spend differential construction, variance formula, and simulation-based power analysis? → [[Geo-Experiment Design and Power Analysis]]
> - Need the TBR model, counterfactual prediction, cumulative causal effect, and iROAS posterior? → [[Time-Based Regression Estimator for Geo Experiments]]
> - Need TBR's design/power procedure, per-parameter sensitivity, bias/coverage evaluation, and the stationarity assumption (+ TBR-OR)? → [[TBR Design Sensitivity and the Stationarity Assumption]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Geo experiment structure; GBR vs. TBR comparison; design-vector $\xi$; GeoLift third branch | [[Geo-Experiment Methodology - Overview]] | overview | [[Bayesian Media Mix Modeling - Overview]], [[Differences-in-Differences]], [[Synthetic Control]] | GBR draws power from geo count; TBR from pretest time points; both are the frequentist counterpart of the Bayesian geo-holdout EIG problem |
| GBR model; spend-differential construction; stratified assignment; variance formula; power analysis | [[Geo-Experiment Design and Power Analysis]] | concept/theorem | [[Geo-Experiment Methodology - Overview]] | $y_{i,1}=\beta_0+\beta_1y_{i,0}+\beta_2\delta_i+\epsilon_i$; $\mathrm{var}(\beta_2)=\sigma_\epsilon^2/[(1-\rho_{y\delta}^2)\sum_i w_i(\delta_i-\bar\delta)^2]$; CI half-width $=2\sqrt{\overline{\mathrm{var}(\beta_2)}}$ |
| TBR model; counterfactual; cumulative effect $\Delta(t)$; iROAS posterior; graceful degradation to 2 geos | [[Time-Based Regression Estimator for Geo Experiments]] | concept/definition | [[Geo-Experiment Design and Power Analysis]], [[Bayesian Structural Time-Series Model]] | $y_t=\alpha+\beta x_t+\epsilon_t$ (pretest); $\Delta(t)=\sum_{t'\le t}(y_{t'}-y_{t'}^*)$; $\mathrm{iROAS}(t)=\Delta_{\text{resp}}(t)/\Delta_{\text{cost}}(t)$, a shifted/scaled $t$-distribution |
| Pseudo-geo-experiment design procedure; per-parameter CI sensitivity; bias/coverage simulation; stationarity assumption; TBR-OR | [[TBR Design Sensitivity and the Stationarity Assumption]] | concept/theorem | [[Time-Based Regression Estimator for Geo Experiments]] | CI half-width $\propto 1/f$ (spend intensity), $\propto 1/\sqrt n$ but floor $\sigma_0/(\bar c\sqrt T)$ (pretest length); bias²/MSE $=0.04\%$ across scenarios; TBR unbiased only if treatment/control relationship is stable pretest→test |

## Notes

- [[Geo-Experiment Methodology - Overview]] — CONTAINS: why geo experiments (vs. observational/traffic/cookie experiments); shared pretest/intervention/cooldown structure; GBR-vs-TBR comparison table; the two-design-lever definition ($\xi$); relationship to the Bayesian geo-holdout EIG design problem; the GeoLift/synthetic-control third branch.
- [[Geo-Experiment Design and Power Analysis]] — CONTAINS: the GBR cross-sectional regression model (Eq. 1) and its WLS fitting; the auxiliary ad-spend counterfactual model (Eq. 2) and $\delta_i$ construction (Eq. 3, Eq. 6); size-stratified geo randomization; the $\mathrm{var}(\beta_2)$ variance formula (Eqs. 4-5) and its Appendix derivation; the pseudo-pretest/circular-shift power-analysis procedure; the real 210-DMA paid-search CPIC/CPC experiment (Section 4) and offline-sales lag example.
- [[Time-Based Regression Estimator for Geo Experiments]] — CONTAINS: the TBR pretest regression model (Eq. 1) and its Bayesian $t$-distribution posterior; counterfactual prediction $y_t^*$, pointwise effect $\phi_t$, and cumulative effect $\Delta(t)$; the iROAS definition and its posterior (incl. the zero-pretest-cost special case); the closed-form Appendix scale of $\Delta(T)$ and $\mathrm{iROAS}(T)$; why TBR degrades gracefully to a single matched treatment/control geo pair; the 210-DMA revenue/cost/iROAS worked example.
- [[TBR Design Sensitivity and the Stationarity Assumption]] — CONTAINS: the 4-step pseudo-geo-experiment design/power procedure (with data "recycling"); closed-form and simulated sensitivity of the iROAS CI half-width to spend intensity, pretest length, test length, cooldown length, and treatment/control geo volume; the simulation-based bias/coverage evaluation (2000 datasets × 9 noise/correlation scenarios, near-zero bias, nominal coverage); the formal stationarity/stability assumption for TBR unbiasedness; TBR-OR (orthogonal regression) as a partial fix under sustained trend/seasonality, and its own instability at low correlation; the 210-DMA design preanalysis example (\$22,000 predicted vs. \$18,273 actual spend).

## Sources
- Vaver Koehler 2011 - Measuring Ad Effectiveness Using Geo Experiments — Vaver, J. & Koehler, J. (2011), *Measuring Ad Effectiveness Using Geo Experiments*, Google Inc. The founding GBR paper.
- Kerman Wang Vaver 2017 - Time-Based Regression Geo Experiments — Kerman, J., Wang, P. & Vaver, J. (2017), *Estimating Ad Effectiveness using Geo Experiments in a Time-Based Regression Framework*, Google Inc. Introduces TBR and the Matched Markets tool.

## See Also
- [[../_Index|Market Response Models]] — parent folder index
- [[Bayesian Structural Time-Series Model]] — the more flexible BSTS/Causal Impact model TBR simplifies
- [[Synthetic Control]] · [[Generalized Synthetic Control Method]] — the donor-weighting alternative estimator family (GeoLift), not ingested as a standalone source
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — the Bayesian EIG framing this classical methodology is the frequentist counterpart of
