---
title: Synthetic Difference-in-Differences - Index
tags:
  - type/index
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/difference-in-differences
  - topic/synthetic-control
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
parent: "[[Econometrics/Identification Strategies/_Index|Identification Strategies]]"
---

# Synthetic Difference-in-Differences - Index

> [!abstract] Routing Summary
> Two linked responses to fragile parallel trends in panel causal inference. **(A) Construct parallel trends:** Synthetic Difference-in-Differences (Arkhangelsky, Athey, Hirshberg, Imbens & Wager 2021, *AER*) — a TWFE regression weighted by synthetic-control-style unit weights and novel time weights. **(B) Interrogate parallel trends:** event-study designs, Roth's (2022, *AER: Insights*) critique of pre-trend testing, and Rambachan & Roth's (2023, *REStud*) Honest DiD sensitivity analysis, with Roth, Sant'Anna, Bilinski & Poe (2023) as the synthesising survey. Fills Dream gaps #47 and #45.
>
> - Need the big picture / where SDID sits between DiD and SC? → [[Synthetic Difference-in-Differences - Overview]]
> - Need the optimisation problems for $\hat\omega$, $\hat\lambda$, $\zeta$ and Algorithm 1? → [[SDID Estimator - Unit and Time Weights]]
> - Need *why* it works (factor model, bias decomposition, double robustness) and the CPS / Penn World Table simulation evidence? → [[SDID vs DiD vs Synthetic Control]]
> - Need standard errors — especially with a single treated unit? → [[SDID Inference - Bootstrap, Jackknife and Placebo]]
> - Need to apply it to a geo test, matched-market test or marketing panel? → [[SDID for Geo Experiments and Marketing Panels]]
> - Need the leads-and-lags regression, normalisation, anticipation, binning, staggered-timing contamination? → [[Event Study Designs and Dynamic Treatment Effects]]
> - Need to know why "no significant pre-trend" is weak evidence (power, pre-test bias)? → [[Pre-Trend Testing and Its Pitfalls]]
> - Need robust confidence sets / a breakdown value when parallel trends may fail? → [[Honest DiD - Sensitivity to Parallel Trends Violations]]
> - Need the headline asymptotic result? → [[SDID Inference - Bootstrap, Jackknife and Placebo#^thm-sdid-asymptotic-normality|Theorem 1]]
> - Need the double-robustness identity? → [[SDID vs DiD vs Synthetic Control#^thm-sdid-double-robust|bias decomposition]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| SDID framing; DiD/SC/SDID as one regression family | [[Synthetic Difference-in-Differences - Overview]] | overview | DiD; Synthetic Control; Fixed-Effects Model | $\hat\tau^{sdid}$ = TWFE weighted by $\hat\omega_i\hat\lambda_t$; Prop 99: SDID $-15.6\,(8.4)$ vs SC $-19.6\,(9.9)$ vs DID $-27.3\,(17.7)$ |
| Unit weights, time weights, regularisation | [[SDID Estimator - Unit and Time Weights]] | method | Overview; Synthetic Control | Eqs. 2.1-2.3; $\zeta=(N_{tr}T_{post})^{1/4}\hat\sigma$; weighted double-difference form (4.3); invariance to $\alpha_i+\beta_t$ shifts |
| Factor-model bias analysis and simulation evidence | [[SDID vs DiD vs Synthetic Control]] | concept | Estimator; SC Bias Theory | $B(\omega,\lambda)$ vanishes if *either* unit or time weights balance $L$; SDID RMSE 0.028 vs DID 0.049 (CPS), 0.031 vs 0.197 (PWT) |
| Large-sample inference | [[SDID Inference - Bootstrap, Jackknife and Placebo]] | method | Estimator; Standard Errors and Clustering | Thm 1 asymptotic normality with oracle variance; Thm 2 jackknife conservative; placebo needs homoskedasticity, only option for $N_{tr}=1$ |
| Application to geo lift and marketing panels | [[SDID for Geo Experiments and Marketing Panels]] | application | All SDID notes; Geo-Experiment Methodology | Non-random market selection biases DiD; SDID about 2× more precise even under randomisation; practical checklist |
| Event-study specification and dynamic effects | [[Event Study Designs and Dynamic Treatment Effects]] | concept | DiD; Staggered DiD assumptions | $\beta=\tau+\delta$, $\tau_{pre}=0$; coefficients are 2×2 DiDs sharing reference-period noise; dynamic TWFE contaminated under staggered heterogeneity |
| Limits of pre-trend tests | [[Pre-Trend Testing and Its Pitfalls]] | concept | Event Study | Prop. 1 pre-test bias $=\Sigma_{12}\Sigma_{22}^{-1}(\mathbb E[\hat\beta_{pre}\mid\text{pass}]-\beta_{pre})$; Prop. 2 exacerbation under monotone trends; rejection rates up to 0.98 |
| Partial identification under bounded violations | [[Honest DiD - Sensitivity to Parallel Trends Violations]] | method | Event Study; Pre-Trend Testing | $\Delta^{RM}(\bar M)$, $\Delta^{SD}(M)$; identified set = estimate − worst-case bias; hybrid/FLCI confidence sets; breakdown value |

## Notes

- [[Synthetic Difference-in-Differences - Overview]] — CONTAINS: block-assignment setting and estimand, estimator family table (DiD / SC / DIFP / SDID), headline results, cluster map, marketing-measurement relevance, Prop 99 table, `synthdid` usage.
- [[SDID Estimator - Unit and Time Weights]] — CONTAINS: eq. 2.1 unit weights with intercept and ridge, eq. 2.2 $\zeta$, eq. 2.3 time weights, Algorithm 1, covariate residualisation, weighted double-differencing (4.3) and adjusted outcomes $\hat\delta_i$ (2.4-2.5), invariance property, autoregression vector $\psi$, staggered-adoption recipe, California weight tables, CVXPY sketch.
- [[SDID vs DiD vs Synthetic Control]] — CONTAINS: latent factor model (3.2/4.1), error decomposition (4.4), double-robustness identity, oracle weights and three-term error (4.8), untestable-assumption caveat, comparison with IFE/GSC/matrix completion and augmented SC (6.1), CPS and Penn World Table placebo tables, rules of thumb.
- [[SDID Inference - Bootstrap, Jackknife and Placebo]] — CONTAINS: Assumptions 1-4, Theorem 1, Algorithms 2-4, Theorem 2, placebo-method assumptions and relation to Conley–Taber and randomisation inference, method comparison table, Table 4 coverage, jackknife code sketch.
- [[SDID for Geo Experiments and Marketing Panels]] — CONTAINS: mapping of GBR / TBR / CausalImpact / augmented SC to the panel-estimator taxonomy, geo test as SDID panel and iROAS, three lessons from the paper's empirical studies, 9-point practical checklist, when not to use SDID, R workflow.
- [[Event Study Designs and Dynamic Treatment Effects]] — CONTAINS: dynamic TWFE specification, 2×2 equivalence and induced correlation, causal decomposition, normalisation / anticipation / baseline / binning / simultaneous-band conventions, Sun–Abraham contamination result, $ATT_l^w$ aggregation, Python sketch.
- [[Pre-Trend Testing and Its Pitfalls]] — CONTAINS: four problems with pre-testing, normal model and NIS test, survey of 12 papers, power calibration ($\gamma_{0.5},\gamma_{0.8}$), Propositions 1-4, publication-filter model (eq. 4), recommendations, verified simulation of pre-test bias.
- [[Honest DiD - Sensitivity to Parallel Trends Violations]] — CONTAINS: identified set and Lemma 2.1, $\Delta^{RM}$ / $\Delta^{SD}$ / $\Delta^{SDRM}$ / sign / polyhedral classes, uniform coverage criterion, ARP conditional and hybrid tests, optimal FLCI with Props. 4.1-4.2, choice-of-$\Delta$ guidance, breakdown values, two empirical illustrations, `HonestDiD` workflow.

## External / Cross-Folder Links

- [[Differences-in-Differences]], [[Bayesian Difference in Differences]], [[Fixed-Effects Model]] — parent design and regression.
- [[Synthetic Control]], [[Synthetic Control Bias Theory]], [[Synthetic Control Requirements]], [[Synthetic Control Inference and Diagnostics]], [[Synthetic Control Extensions]], [[Abadie 2021 - Overview]] — the SC cluster SDID builds on.
- [[Generalized Synthetic Control Method]], [[Xu 2016 - Overview]] — explicit interactive-fixed-effects alternative.
- [[Difference-in-Differences with Multiple Time Periods - Overview]], [[Group-Time Average Treatment Effects]], [[Identifying Assumptions for Staggered DiD]], [[Aggregating Group-Time Effects]], [[Doubly-Robust Estimands for ATT(g,t)]], [[Simultaneous Inference via Multiplier Bootstrap]] — staggered DiD cluster.
- [[Standard Errors and Clustering]], [[Randomization Inference - Overview]], [[Permutation Tests and Exact Inference]], [[Fisher Randomization Test and the Sharp Null]] — inference foundations.
- [[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[TBR Design Sensitivity and the Stationarity Assumption]], [[Counterfactual Impact Estimation]] — marketing-measurement counterparts.
- [[Sensitivity Analysis in Observational Studies]], [[Plausible GMM - Overview]] — sensitivity / partial-identification relatives.
- [[Carryover Effects and Distributed Lags]] — dynamic effects as lag distributions.

## Sources

- [[raw/Arkhangelsky 2021 - Synthetic Difference in Differences.pdf]] — Arkhangelsky, D., Athey, S., Hirshberg, D. A., Imbens, G. W. & Wager, S. (2021), "Synthetic Difference-in-Differences," *American Economic Review* 111(12). arXiv:1812.09970v4.
- [[raw/Roth 2022 - Pretest with Caution.pdf]] — Roth, J. (2022), "Pretest with Caution: Event-Study Estimates after Testing for Parallel Trends," *AER: Insights* 4(3): 305–322.
- [[raw/Rambachan Roth 2023 - A More Credible Approach to Parallel Trends.pdf]] — Rambachan, A. & Roth, J. (2023), "A More Credible Approach to Parallel Trends," *Review of Economic Studies* 90(5): 2555–2591.
- [[raw/Roth 2023 - Whats Trending in Difference-in-Differences.pdf]] — Roth, J., Sant'Anna, P. H. C., Bilinski, A. & Poe, J. (2023), "What's Trending in Difference-in-Differences? A Synthesis of the Recent Econometrics Literature," *Journal of Econometrics*. arXiv:2201.01194.
