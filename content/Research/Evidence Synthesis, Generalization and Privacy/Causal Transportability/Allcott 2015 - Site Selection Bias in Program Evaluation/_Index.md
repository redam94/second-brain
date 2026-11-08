---
title: "Index: Allcott 2015 - Site Selection Bias in Program Evaluation"
tags:
  - type/index
  - source/ingested
  - topic/causal-transportability
parent: "[[../_Index|Causal Transportability]]"
date_updated: 2026-11-08
concept_count: 14
---

# Allcott 2015 - Site Selection Bias in Program Evaluation

> [!abstract] Routing Summary
> This folder fully captures Allcott (2015), *Site Selection Bias in Program Evaluation* (Quarterly Journal of Economics 130(3); NBER WP 18373, revised Sept. 2014 — the captured PDF): the formal model of external validity and site selection bias, motivating evidence from microfinance and clinical trials, the Opower setting (111 RCTs, 8.6M households), extrapolation from first-ten-site microdata that overpredicts later sites by about 0.5 pp, the metadata decomposition of selection mechanisms, and the design-based remedies. The online appendices (A-D, pp. 44-73 of the PDF) are referenced but not transcribed.
> - Need the paper on one page, headline numbers, or the section-to-note map? -> [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
> - Need MFI Table 1 or hospital Table 2 evidence that RCT sites are unrepresentative? -> [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]]
> - Need external unconfoundedness, Assumptions 1-4, 3A vs 3B, or the definition of site selection bias? -> [[Allcott 2015 - Model of External Validity and Site Selection Bias]]
> - Need the Opower programme, five selection mechanisms, Tables 3-4, or dispersion of site effects? -> [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]]
> - Need the linear/reweighting extrapolation, Table 5, or the in-sample prediction test? -> [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]
> - Need Table 6 (cohort trends), Table 7 (utility selection), or nationwide predictions from the metadata? -> [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]
> - Need Allcott's remedies, or how this applies to marketing experiments? -> [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Selection of RCT partners on observables | [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]] | example | none | partners differ on 6 of 8 MFI traits; F-tests reject |
| External unconfoundedness / overlap | [[Allcott 2015 - Model of External Validity and Site Selection Bias]] | definition | Rubin causal model | Assumptions 3-4 enable eq. (1) |
| Transport of the ATE | [[Allcott 2015 - Model of External Validity and Site Selection Bias]] | theorem | Assumptions 1-4 | target ATE = sample CATE averaged over target X |
| Site; Assumption 3A; Assumption 3B | [[Allcott 2015 - Model of External Validity and Site Selection Bias]] | definition | external unconfoundedness | 3B weaker than 3A |
| Site selection bias | [[Allcott 2015 - Model of External Validity and Site Selection Bias]] | definition | 3B | fails unless sites randomly selected |
| Five selection mechanisms | [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]] | concept | Opower setting | usage, preferences, programmes, size, ownership |
| Dispersion of site effects | [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]] | example | metadata | Q p<0.001; $695M-$3.62B range |
| Heterogeneous effects regression | [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] | definition | microdata | electric heat +1.2 pp, first comparison +0.09 pp/kWh |
| Linear prediction; reweighting | [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] | definition | Assumptions 5-6 | national prediction ~1.7% |
| In-sample prediction failure | [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] | theorem | above | overpredicts later sites by 0.64 / 0.40 pp |
| Cohort and within-utility trends | [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]] | theorem | metadata | -0.173 pp/year; -0.091 pp per next site |
| Utility-level selection | [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]] | theorem | Z_u variables | preferences positive; IOU negative |
| Nationwide prediction | [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]] | example | eq. (8) | $1.45B vs naive $1.80B |
| Design-based remedies | [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]] | concept | all above | randomise sites within strata |

## Notes

- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] — CONTAINS: research question, contributions, key results, full Source Map, marketing relevance.
- [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]] — CONTAINS: Sec. 2; Table 1 (MFIs); Table 2 (hospitals); interpretation.
- [[Allcott 2015 - Model of External Validity and Site Selection Bias]] — CONTAINS: Sec. 3; Assumptions 1-4; transport formula (1) with proof sketch; sites; 3A and 3B; definition of site selection bias.
- [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]] — CONTAINS: Sec. 4-5; programme design; five mechanisms; datasets; Tables 3 and 4; dispersion of effects; early academic benchmarks.
- [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] — CONTAINS: Sec. 6; eqs. 2-4; Assumptions 5-6; Table 5; Figures 2-3; overlap diagnostics; Python.
- [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]] — CONTAINS: Sec. 7; eqs. 5-8; Tables 6 and 7; nationwide predictions; time vs cohort robustness.
- [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]] — CONTAINS: Sec. 8; four remedies; JTPA context; marketing analogue table.

## Sources
- Allcott 2015 - Site Selection Bias in Program Evaluation — Allcott H (2015), QJE 130(3); NBER Working Paper 18373 (rev. Sept. 2014), 73 pp. including appendices.

## See Also
- [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]] — estimators that exploit target covariates; require the same exchangeability.
- [[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]] — modelling the distribution of site effects.
- [[Geo-Experiment Methodology - Overview]], [[Bayesian Media Mix Modeling - Overview]] — marketing contexts for extrapolating experiments.
