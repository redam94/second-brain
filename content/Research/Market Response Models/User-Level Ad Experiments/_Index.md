---
title: User-Level Ad Experiments - Index
tags:
  - type/index
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
parent: "[[Research/Market Response Models/_Index|Market Response Models]]"
---

# User-Level Ad Experiments - Index

> [!abstract] Routing Summary
> How individual-randomized advertising experiments are designed, analysed and interpreted, and where they stop working. Anchored by Johnson, Lewis & Nubbemeyer (Ghost Ads, JMR 2017), Lewis & Rao (QJE 2015), Gordon et al. (Marketing Science 2019), Gordon, Moakler & Zettelmeyer (2023), Lin & Misra (Marketing Science 2022) and Johnson, Lewis & Reiley (Marketing Science 2017). Complements the geo-level cluster ([[Geo-Experiment Methodology - Overview]]) and the generic A/B statistics cluster ([[Online Experimentation - Overview]]).
>
> - Need the big picture, the three structural facts, or the MMM relevance? → [[User-Level Ad Experiments - Overview]]
> - Need the design families (holdout/ITT, PSA placebo, ghost ads) and why PSAs break under optimized delivery? → [[Intent-to-Treat, PSA and Ghost Ad Designs]]
> - Need the auction-level mechanics: simulated auction, PGA-LATE, ghost bids, auction isolation, validation checks? → [[Predicted Ghost Ads and Ghost Bids Mechanics]]
> - Need to go from ITT to the effect on exposed users (one-sided noncompliance, LATE = ATT, lift)? → [[From ITT to Treatment-on-the-Treated in Ad Experiments]]
> - Need power arithmetic, Cohen's $d$ for ads, experiment multipliers, what improves precision? → [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]
> - Need to read or commission a Meta-style conversion lift study? → [[Conversion Lift Studies on Ad Platforms]]
> - Need evidence on how far PSM / regression / IPWRA / DML get from the RCT? → [[Experimental Benchmarks for Observational Ad Measurement]]
> - Need the cookie / cross-device / privacy-era bias and its fixes? → [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]
> - Need to choose between a user-level and a geo-level test, or to know what each calibrates in an MMM? → [[User-Level vs Geo-Level Experiments - When to Use Which]]
> - Need the ITT-to-ATT formula itself? → [[From ITT to Treatment-on-the-Treated in Ad Experiments#^thm-itt-att|ATT = ITT / exposure rate]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Framing of user-level ad experiments | [[User-Level Ad Experiments - Overview]] | overview | Potential Outcomes; Selection Problem; Activity Bias | Every ad holdout is an encouragement design; effect $R^2\approx5\times10^{-6}$; observational substitutes fail |
| Design families | [[Intent-to-Treat, PSA and Ghost Ad Designs]] | concept | Overview; Experimental Ideal | PSAs valid only on reach-based platforms; ghost ads valid on all three generations (first ad only under user-level optimization); pruning beats covariates 31% vs 5% |
| Ghost-ad implementation | [[Predicted Ghost Ads and Ghost Bids Mechanics]] | method | Design families; LATE; IV | PGA LATE $=\{E[y\mid PGA,T{=}1]-E[y\mid PGA,T{=}0]\}/\Pr[X{=}1\mid PGA,T{=}1]$; ITT variance 6-17 times larger |
| ITT to ATT | [[From ITT to Treatment-on-the-Treated in Ad Experiments]] | method | LATE; IV; Principal Stratification | One-sided noncompliance gives LATE = ATT = ITT$/\pi_{co}$; scaling leaves $t$ unchanged; lift uses exposed users' counterfactual baseline |
| Power economics | [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] | concept | Power Analysis; Type S/M | CV of sales about 10; median s.e.(ROI) 26 pts; median experiment 62 times too small for a 10-pt ROI difference; short windows maximize power |
| Platform lift products | [[Conversion Lift Studies on Ad Platforms]] | application | Designs; PGA; ITT to ATT | ITT over the opportunity set with runner-up substitution; median lift 9% (29/18/5% by funnel) over 1,673 RCTs |
| RCT benchmarks for observational methods | [[Experimental Benchmarks for Observational Ad Measurement]] | application | PSM; DML; CIA | Half of purchase studies off by more than a factor of 3 (2019); median DML lift 83/58/24% vs RCT 29/18/5% (2023); a data problem, not a model problem |
| Identity fragmentation | [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] | concept | OVB; Activity Bias | Bias $=\vartheta(\Delta_1+\Delta_2+\Delta_3)$, unsigned; under SIE $E[\hat\beta]=\beta/J$; partial linking can worsen bias; aggregation is unbiased |
| Design choice | [[User-Level vs Geo-Level Experiments - When to Use Which]] | application | Whole cluster; Geo-Experiment notes | Six diagnostic questions; user-level for within-platform online outcomes, geo for cross-channel, offline and MMM-total calibration |

## Notes

- [[User-Level Ad Experiments - Overview]] — CONTAINS: definition of the ideal ad experiment and counterfactual treated, three structural facts (one-sided noncompliance, signal-to-noise, fragility of observational methods), history of the design space, relevance to Bayesian MMM calibration, worked reading of a lift report (Gordon et al. Study 4), note on sources not ingested (Johnson 2023 "Inferno"; Barajas & Bhamidipati 2021).
- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — CONTAINS: ITT design and its $1/\pi$ variance penalty, PSA/placebo design and the two pruning gains (Johnson, Lewis & Reiley: 25% + 8% = 31% vs 5% from 236 covariates), PSA cost and distortion of control-group size, ghost ad definition and competitive-baseline argument, three platform generations (Table 1), validation checks, cost comparison of designs for the Sportsing campaign with code.
- [[Predicted Ghost Ads and Ghost Bids Mechanics]] — CONTAINS: why pure ghost ads fail on display networks, two-stage simulated/real auction algorithm, PGA-LATE estimator, over- vs under-prediction and when PGA LATE equals TOT, auction isolation, ghost events / ghost bids / ghost cookied, link to Facebook's ghost-bid-style design and double-blind designs, Sportsing validation (Table 2) and results (Table 3), implementation hazards, code sketch.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — CONTAINS: potential-outcomes set-up with $W_i(0)=0$, three sources of endogenous exposure, SUTVA / randomization / exclusion assumptions, ITT and ATT definitions, Wald/2SLS theorem with derivation, lift definition, indirect vs direct TOT estimators and their standard errors, interpretation cautions (locality to delivery system, other media, windows), Study 4 worked table, code.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — CONTAINS: Lewis & Rao model and ROI formula, $R^2$ and $t$ formulas, \$0.35-vs-\$75 calibration, Tables I-III summary, experiment multipliers, marginal-ROI difficulty, covariate theorem $1-\sqrt{1-R^2}$, seven precision levers, long-window theorem, Cohen's $d$ from 1,673 Facebook RCTs, industry implications, planning code.
- [[Conversion Lift Studies on Ad Platforms]] — CONTAINS: step-by-step Conversion Lift algorithm, opportunity set, runner-up counterfactual and auction-stability assumption, who pays, comparison with Google predicted ghost ads, single-login identity, aggregate statistics from the 15-study and 663-experiment samples, multi-cell tests, estimand definition, seven-point reading checklist (including the 2020 reporting bug), worked conversion of a lift report into an MMM calibration input.
- [[Experimental Benchmarks for Observational Ad Measurement]] — CONTAINS: LaLonde-style design, sources of quasi-random exposure variation, six 2019 estimators and four covariate sets, Fig. 10 excerpt, bias-reduction ratio and simulated-unobservable sensitivity analysis, 2023 SPSM and DML specifications with the ATT orthogonal score, Tables 3-6 headline numbers, when methods do better, per-auction selection argument, four paths forward, DIY within-study comparison code.
- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — CONTAINS: fragmented-data framework, three-term bias decomposition (eq. 8), SIE condition and the asymmetric-intensity counterexample, design implications (fragment-level symmetric randomization, ITT), comparison of identity linking / experiment-based adjustment / stratified aggregation, empirical inflation of 40-88%, identity tiers (cookie, device, login, household), Table 1 reproduction in code.
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — CONTAINS: side-by-side table, six diagnostic questions, power comparison formulas, direction of interference in each design, mapping of each estimand to MMM quantities, hybrid designs, three worked measurement briefs, code.

## External / Cross-Folder Links

- [[Activity Bias in Advertising]], [[Observational vs Experimental Methods in Advertising]] — earlier Lewis-Rao-Reiley evidence that motivates experiments.
- [[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[TBR Design Sensitivity and the Stationarity Assumption]], [[SDID for Geo Experiments and Marketing Panels]] — the geo-level alternative.
- [[Online Experimentation - Overview]], [[CUPED and Regression-Adjusted Variance Reduction]], [[Sample Ratio Mismatch and Trustworthiness Checks]], [[Interference and Marketplace Experiments]], [[Always-Valid p-values and the mSPRT]] — generic experimentation statistics.
- [[Local Average Treatment Effects]], [[Instrumental Variables]], [[Instrumental Variables and Principal Stratification]], [[Potential Outcomes Framework]], [[The Experimental Ideal]], [[The Selection Problem]] — identification foundations.
- [[Power Analysis and Sample Size]], [[Type S and Type M Errors]] — design-stage tools.
- [[Propensity Score Matching - Overview]], [[Propensity Score Matching - Balancing Theorem and Failure Modes]], [[Common Support and Overlap]], [[DML Estimators for ATE and the Interactive Model]], [[Conditional Independence Assumption]], [[Omitted Variables Bias]] — the observational methods benchmarked.
- [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]], [[Carryover (Adstock) Functional Forms]] — what experiments calibrate.
- [[Delayed Feedback Model for Conversion Prediction]], [[Customer Lifetime Value - Overview]], [[Advertising and Promotion Effects]] — outcome windows, valuing conversions, elasticity evidence.
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]], [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] — companion Q&A notes.

## Sources

- [[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]] — Johnson, G. A., Lewis, R. A. & Nubbemeyer, E. I., "Ghost Ads: Improving the Economics of Measuring Online Ad Effectiveness," *Journal of Marketing Research* 54(6), 867-884 (2017). File is the February 2016 working-paper version (NBER Economics of Digitization conference copy).
- [[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]] — Lewis, R. A. & Rao, J. M., *Quarterly Journal of Economics* 130(4), 1941-1973 (2015).
- [[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]] — Gordon, B. R., Zettelmeyer, F., Bhargava, N. & Chapsky, D., *Marketing Science* 38(2) (2019). File is the April 2018 Kellogg working paper.
- [[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]] — Gordon, B. R., Moakler, R. & Zettelmeyer, F., "Close Enough? A Large-Scale Exploration of Non-Experimental Approaches to Advertising Measurement," arXiv 2201.07055v2 (*Marketing Science* 2023).
- [[raw/Lin Misra 2022 - The Identity Fragmentation Bias.pdf]] — Lin, T. & Misra, S., arXiv 2008.12849v2 (*Marketing Science* 41(3), 2022).
- [[raw/Johnson Lewis Reiley 2017 - When Less Is More Data and Power in Advertising Experiments.pdf]] — Johnson, G. A., Lewis, R. A. & Reiley, D. H., *Marketing Science* 36(1) (2017). File is the December 2015 author version.
- [[raw/Lewis Rao Reiley 2013 - Measuring the Effects of Advertising The Digital Frontier.pdf]] — Lewis, R., Rao, J. M. & Reiley, D. H., NBER Working Paper 19520 (2013).
- [[raw/Barajas Bhamidipati Shanahan 2021 - Online Advertising Incrementality Testing Tutorial.pdf]] — Barajas, J., Bhamidipati, N. & Shanahan, J. G., KDD 2021 tutorial proposal (outline only).
- Not obtained (plain citations): Johnson, G. (2023), "Inferno: A Guide to Field Experiments in Online Display Advertising," *Journal of Economics & Management Strategy* 32, 469-490; Barajas, J. & Bhamidipati, N. (2021), "Incrementality Testing in Programmatic Advertising: Enhanced Precision with Double-Blind Designs," *Proceedings of The Web Conference 2021*.
