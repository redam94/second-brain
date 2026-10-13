---
title: Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Whole paper: Gordon, B. R., Zettelmeyer, F., Bhargava, N. & Chapsky, D., 'A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook' (Kellogg working paper, 12 Apr 2018; published Marketing Science 38(2), 2019). Main text pp. 1-42, references pp. 43-47, online appendix pp. A-1 to A-18 (66 PDF pages)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Propensity Score Matching - Overview]]"
  - "[[Conversion Lift Studies on Ad Platforms]]"
used_by:
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
  - "[[User-Level Ad Experiments - Overview]]"
aliases:
  - Gordon Zettelmeyer Bhargava Chapsky 2019
  - A Comparison of Approaches to Advertising Measurement
  - Evidence from Big Field Experiments at Facebook
  - Gordon et al 2019 - Overview
---

# Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview

> [!summary]
> **Question.** With the rich individual-level data the ad industry has, can standard observational methods recover the causal effect of online advertising? **Design.** A LaLonde-style within-study comparison on 15 US Facebook conversion-lift RCTs from 2015 (about 500M user-experiment observations, 1.6B impressions). Drop the randomized control group, estimate the ATT lift from exposed vs unexposed test users with six methods (EM, PSM, STRAT, RA, IPWRA, STRATREG) × four nested covariate sets, and compare with the RCT. **Findings.** Observational estimates mostly overstate lift, sometimes understate it (even with the wrong sign), and "in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods" (§1). No method dominates. A machine-learned look-alike score helps most. Matching achieves excellent balance and still leaves bias. A simulated-confounder sensitivity analysis shows the missing covariates would sometimes need **5-10×** the explanatory power of everything observed.

^summary-gordon-et-al-2019-facebook-rcts-vs-obser

## Overview

**Research question** (§1). "We assess empirically whether the variation in data typically available in the advertising industry enables observational methods to recover the causal effects of online advertising" (Abstract).

**Why it matters.** Advertisers and measurement vendors mostly use observational methods (matching, regression) because RCTs are seen as technically hard, costly or unnecessary. Advertising effects are small relative to outcome noise, and exposure is endogenous through user activity, the targeting optimizer and auction competition. Even a little residual confounding swamps the signal.

**Contributions** (§1, §9):
1. Evidence that observational methods using good individual-level data are *not* "good enough" for ad measurement.
2. A characterization of how strong an unobserved covariate would have to be to close the gap, relative to the observables.
3. An update of LaLonde (1986) for a setting where an ML targeting engine assigns treatment. Imbens (2015) had shown modern methods *can* recover the LaLonde benchmark. Here they mostly cannot.

**Key numbers.**
- RCT checkout ATT lifts range from -15% to 450%. Six of 14 are not significant at 5%. Registration/page-view lifts go up to 1,517% (Tables 3-4).
- Study 4: E-U 316% → STRATREG4 74% vs RCT 73% (success). Study 9: E-U 4,074%, best 1,306% vs RCT 2.4%. Study 15: almost all methods -6% to -14% vs RCT +2.4%.
- Seven of 14 checkout studies (by our reading of the grid: Studies **2, 7, 8, 9, 10, 12, 15**) are off by more than 3× for every method (Fig. 10). See [[Gordon et al 2019 - Observational Lift Estimates by Study and Method#^ex-g19-fig10-seven]].
- Bias-reduction ratio after stratification ranges from 0.4% to 63% of the selection effect (Table 6).

## Main Content

### Note set for this source

| Note | Covers |
|---|---|
| [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] | §1 motivation; §2.1 pixels, login, placements, auction; §2.2 runner-up control-ad algorithm and auction-stability assumption; §2.3 user-, targeting- and competition-induced endogeneity |
| [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] | §3 eq. 1-8 (SUTVA, exclusion, ITT→ATT, lift); §4 eq. 9-28 (E-U, strong ignorability, EM, PSM, STRAT + recursive strata, RA, IPWRA, STRATREG); §4.3 deterministic targeting and RD |
| [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]] | §5 selection criteria, Table 1, Table 2, variable sets 1-4, Fig. 4 randomization check |
| [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]] | §6.1 exogenous variation (pacing, rival bids, visit timing); §6.2 LASSO propensity, trimming, eq. 29, joint bootstrap algorithm, subsampling for PSM; §6.3 Figs. 5-6 with per-panel read-offs, A-1-A-7 |
| [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]] | §7.1 Study 4 walk-through, Fig. 7 2×2 diagram described in full, Tables 3-4 in full, fn. 19-22 |
| [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] | §7.2 Table 5, Figs. 8-9 (Studies 4, 1, 9, 15); §7.3 Fig. 10 findings, the seven >3× studies named, per-cell shading transcribed and its colour rule reconstructed; full 22 × 23 grid from Figs. A-8-A-13 |
| [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]] | §8 eq. 30, relative $R^2$, Fig. 11, $brr$, Table 6; Appendix Rosenbaum-Rubin model (A1-A5), Ichino et al. $p_{jk}$ simulation algorithm, Figs. A-14-A-15 |
| [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] | §9 conclusions and caveats; §1 literature (LaLonde, Imbens, Lewis-Rao-Reiley, Blake-Nosko-Tadelis), fn. 2, 4, 12, 23 |
| [[Gordon et al 2019 - Reference List and Cited Literature]] | All 69 entries of the reference list (pp. 43-47), grouped by role, with citing pages, purpose and printed-list slips |

Cross-source syntheses that also use this paper: [[Experimental Benchmarks for Observational Ad Measurement]] (with the 2023 DML follow-up), [[From ITT to Treatment-on-the-Treated in Ad Experiments]], [[Conversion Lift Studies on Ad Platforms]], [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]], [[User-Level vs Geo-Level Experiments - When to Use Which]], [[User-Level Ad Experiments - Overview]].

### Argument flow

1. A platform RCT gives an unbiased ATT because the optimizer and rivals act identically on both arms (§2).
2. The observational analyst sees only the test arm, where exposure is selected (§2.3, §4).
3. Under strong ignorability, six standard estimators would recover the ATT (§4.1-4.2), provided enough exogenous variation survives conditioning (§4.3, §6.1).
4. The estimators are run well: LASSO-selected propensities, trimming, joint bootstrap, excellent balance (§6).
5. They still miss, in both directions, by large factors (§7).
6. Closing the gap would need confounders at least as strong as, and sometimes much stronger than, everything observed (§8).
7. So better data, logging, or experiments built into the platform are needed (§9).

## Source Map

| Source section / item | Pages | Note |
|---|---|---|
| Abstract, keywords, author note (no PII; authors uncompensated by Facebook) | title page | [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] |
| §1 Introduction: measurement challenges, RCT scarcity, data strengths, fn. 1-3 (incl. fn. 3 Lewis-Reiley logged-in precedent) | 1-2 | [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] |
| §1 contributions, "preview" outlook, LaLonde/Imbens, prior benchmarks, fn. 4 | 2-4 | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| §2 intro, §2.1 Advertising on Facebook, Figs. 1-2, fn. 5-8 | 4-6 | [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] |
| §2.2 Experimental implementation, Fig. 3 (a, b) | 6-8 | [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity#^alg-g19-control-ad]] |
| §2.3 Determinants of exposure (user, targeting, competition) | 8-10 | [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] |
| §3.1 Definitions and assumptions, eq. 1, fn. 9-10 | 10-11 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^def-g19-po]] |
| §3.2 Causal effects in the RCT, eq. 2-7 | 11-12 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^thm-g19-att]] |
| §3.3 Lift, eq. 8, fn. 11 | 12-13 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^def-g19-lift]] |
| §4 intro, attributed academic matching applications, vendor citations, fn. 12-13 (NCS case studies) | 13-14 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]; [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| §4.1 eq. 9-16 (E-U, unconfoundedness, overlap, propensity score) | 14-15 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^def-g19-ignorability]] |
| §4.2 EM eq. 17-18; PSM eq. 19-20; STRAT eq. 21-23; RA eq. 24-26; IPWRA; STRATREG eq. 27-28 | 15-19 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] |
| §4.3 Alternative methods (deterministic targeting, RD) | 19-20 | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] |
| §5 Data, selection criteria, variable sets, fn. 14 | 20-21 | [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]] |
| Table 1 Summary statistics | 21 | [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]] |
| Table 2 Description of variables | 22 | [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]] |
| Fig. 4 p-value distribution (randomization check) | 23 | [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check#^ex-g19-randcheck]] |
| §6.1 Identification (pacing, rival budgets, visit timing), fn. 15 | 23-24 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^def-g19-exog]] |
| §6.2 Estimation and inference, eq. 29, bootstrap Steps 1-3, fn. 16-17 | 24-26 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^alg-g19-bootstrap]] |
| §6.3 Assessing balance, fn. 18 | 26-29 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^ex-g19-balance]] |
| Fig. 5 Study 4 propensity densities, sets 1-4 (peak heights and locations, crossings, matched curves) | 27 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^ex-g19-fig5-readoff]] |
| Fig. 6 Study 4 standardized differences, sets 1-4 (per-group before/after read-off) | 29 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^ex-g19-fig6-readoff]] |
| §7 intro (rates masked), §7.1 RCT, fn. 19-20 | 30 | [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies#^ex-g19-study4]] |
| Fig. 7 Results from RCT (2×2 test/control × exposed/unexposed diagram, ITT and ATT lift markers) | 30 | [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies#^ex-g19-fig7]] |
| Table 3 ITT lift; Table 4 ATT lift; fn. 21-22 | 31-32 | [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]] |
| §7.2 Observational models, Table 5 | 32-33 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] |
| Fig. 8 Study 4 lift estimates | 34 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method#^ex-g19-fig8]] |
| Fig. 9 Studies 1, 9, 15 | 35 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] |
| Fig. 10 Summary of lift results (cumulative column labels, RCT-column rounding vs Table 4); §7.3 Summary of all studies | 36-37 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method#^thm-g19-findings]] |
| Fig. 10 / §7.3 "seven of the 14" checkout studies named (S2, S7, S8, S9, S10, S12, S15) and checked | 36-37 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method#^ex-g19-fig10-seven]] |
| Fig. 10 per-cell colour coding (286 cells) and the reconstructed shading rule | 36 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method#^ex-g19-fig10-shading]]; [[Gordon et al 2019 - Observational Lift Estimates by Study and Method#^def-g19-fig10-shading]] |
| §8 Role of unobservables, eq. 30, relative $R^2$, fn. 23 | 37-38 | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^def-g19-relr2]] |
| Fig. 11 Sensitivity for Studies 4, 1, 9 (incl. axis ranges and marker positions) | 39 | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^ex-g19-fig11]]; [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^tbl-g19-fig11-detail]] |
| $brr$ definition, Table 6, variable-group insights | 40-41 | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^thm-g19-sens]] |
| §9 Conclusion | 41-42 | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| References (69 works, full) | 43-47 | [[Gordon et al 2019 - Reference List and Cited Literature]]; key works also in [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Online Appendix Figs. A-1-A-3 propensity densities (set 4), per-study patterns | A-1-A-3 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^ex-g19-balance-per-study]] |
| Figs. A-4-A-7 standardized differences, per-study before/after maxima | A-4-A-7 | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^ex-g19-balance-per-study]] |
| Figs. A-8-A-11 checkout lift estimates (all studies) | A-8-A-11 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] |
| Figs. A-12-A-13 registration and page-view lift estimates | A-12-A-13 | [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] |
| Appendix "Incorporating an Unobservable", eq. A1-A5, $p_{jk}$, algorithm, grid/Brent search, fn. 24-27 (fn. 26 undefined $d$, $s$ flagged) | A-14-A-16 | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^alg-g19-sens]] |
| Figs. A-14-A-15 sensitivity plots for all checkout studies (per-study markers, axes, locus) | A-17-A-18 | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^tbl-g19-a14-a15]] |

**Transcription notes found during capture** (each is discussed in its note): Table 1 lists Study 13 with R and Study 14 with C only, while the results report registration for S14 and not S13. Fig. 10's "Regression Adjustment" block matches the IPWRA estimates. Table 6 shows Study 7 STRAT as +35% where the figures show -35.3%. The §8 text has one "4047%" for 4,074%. The quoted Study 4 exposed and unexposed rates do not reproduce 316% by direct arithmetic, because rates are masked. The §8 text says M explains about 40% of relative treatment variation in Study 1, but Fig. 11 places it near 25%. Appendix fn. 26 uses symbols $d$ and $s$ that are never defined.

## Examples

> [!example] One-paragraph takeaway for a measurement team (generic)
> If your "incrementality" number compares people who saw an ad with people who did not, even after matching on demographics, activity and a look-alike score, then in this paper's evidence it could be 4× too high (Study 4), 1,700× too high (Study 9), or the wrong sign (Study 15). You cannot tell which from inside the data, because balance diagnostics look perfect in all three cases. The only check that works is an experiment.

^exa-g19-facebook-rcts-vs-obs-1

## Connections

- [[Experimental Benchmarks for Observational Ad Measurement]] — cross-source summary including the 663-experiment DML sequel.
- [[Observational vs Experimental Methods in Advertising]], [[Activity Bias in Advertising]] — the predecessor benchmark.
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] — the geo-randomized search benchmark the paper contrasts itself with.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — the aggregate-data version of targeting-induced selection.
- [[Sensitivity Analysis in Observational Studies]], [[Propensity Score Matching - Balancing Theorem and Failure Modes]], [[DML Estimators for ATE and the Interactive Model]].
- [[Researcher Degrees of Freedom]] — 6 methods × 4 covariate sets = 24 analyst choices per study, and they disagree.

## See Also

- [[User-Level Ad Experiments - Overview]] — cluster entry point.
- [[Conversion Lift Studies on Ad Platforms]] — the experimental product.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — estimands.
