---
title: "Index: Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/index
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
parent: "[[../_Index|Meta-Analysis]]"
date_updated: 2026-11-08
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
concept_count: 13
aliases:
  - "Andrews Kasy 2019 - Identification of and Correction for Publication Bias index"
---
# Andrews Kasy 2019 - Identification of and Correction for Publication Bias

> [!abstract] Routing Summary
> This folder fully captures Andrews and Kasy (NBER WP 23298): nonparametric identification of publication probabilities from replications and meta-studies, median-unbiased inference, and four empirical applications. It contains 9 notes covering Sections 1-6, Theorems 1-4, Corollaries 1-3, Lemmas 1-5, Tables 1-4 and Figures 1-10.
> - Need the paper on one page, headline results or the section-to-note map? -> [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
> - Need Definition 1, the truncated likelihood (Lemma 1), the ten-fold selectivity example, or censoring/manipulation variants? -> [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]
> - Need Theorem 1/2, Corollaries 1-2, the replication density or the A/B region argument? -> [[Andrews Kasy 2019 - Identification Using Replication Studies]]
> - Need Theorem 3, Corollary 3 or the meta-study density? -> [[Andrews Kasy 2019 - Identification Using Meta-Studies]]
> - Need Egger-type meta-regressions (Lemma 4), replication probability without selection, or p-value bunching? -> [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]]
> - Need Theorem 4, the median-unbiased estimator, corrected CIs, Bonferroni intervals, Python? -> [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]
> - Need Tables 1-2 (economics and psychology replication estimates)? -> [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]
> - Need Tables 3-4 (minimum wage, deworming)? -> [[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]
> - Need the conclusion, optimal publication rules or a table of assumptions? -> [[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Truncated sampling; Lemma 1 | [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] | definition | - | $f_{X|\Theta}=p(x)f_{X^*|\Theta^*}/E[p|\theta]$ |
| Ten-fold selectivity example | [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] | example | Lemma 1 | naive 95% CI covers 65.5% at $\theta=0$ |
| Replication density; Thm 1 | [[Andrews Kasy 2019 - Identification Using Replication Studies]] | theorem | Def. 2 | $f(b,a)/f(a,b)=p(b)/p(a)$; $p$ identified up to scale |
| Cor. 1-2; Thm 2 | [[Andrews Kasy 2019 - Identification Using Replication Studies]] | theorem | Thm 1 | unequal variances, sign normalisation, selection on $\theta$ |
| Meta-study density; Thm 3 | [[Andrews Kasy 2019 - Identification Using Meta-Studies]] | theorem | Def. 3 | $p$ and $\mu$ identified from variation in $\sigma$ |
| Lemma 4 meta-regressions | [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]] | theorem | Def. 3 | valid test of no selection; biased as mean estimate under selection |
| Replication probability | [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]] | theorem | - | 0.025 under null even without selection |
| Thm 4 quantile-unbiased | [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]] | theorem | Lemma 1 | $P(\hat\theta_\alpha\le\theta)=\alpha$ |
| Bonferroni interval | [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]] | theorem | Thm 4 | coverage $\ge1-\alpha$ with estimated $p$ |
| Table 1 | [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]] | example | Thm 1 | economics: significant results >30x more likely |
| Table 2 | [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]] | example | Thm 1 | psychology: >100x relative to insignificant at 10% |
| Tables 3-4 | [[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]] | example | Thm 3 | minimum wage ~30%; deworming not significant |
| Optimal publication rules | [[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]] | theorem | - | optimal rule may favour surprising results |

## Notes

- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]] - CONTAINS: question, contributions, headline table, Source Map, notation.
- [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] - CONTAINS: Def. 1, Lemma 1, covariates, ten-fold example with bias/coverage table and Python, observability variants, manipulation.
- [[Andrews Kasy 2019 - Identification Using Replication Studies]] - CONTAINS: Def. 2, Lemma 2, Thm 1, cycle restriction, Fig 2 A/B example, Cor. 1-2, Thm 2.
- [[Andrews Kasy 2019 - Identification Using Meta-Studies]] - CONTAINS: Def. 3, Lemma 3, Thm 3, Cor. 3, dependence on sigma, Fig 3 example.
- [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]] - CONTAINS: replication-probability theorem and table, meta-regressions (Lemma 4 and caveat), p-value distribution, literature list.
- [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]] - CONTAINS: Thm 4, Lemma 5, median-unbiased estimator, endpoint-order warning, Fig 4 example table, Python, McCrary relation, Bonferroni interval.
- [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]] - CONTAINS: estimation approach, economics (Table 1, 12 of 18), psychology (Table 2, 62 vs 28 of 73), score tests.
- [[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]] - CONTAINS: minimum wage (Table 3), deworming (Table 4), meta-regression checks, multiple estimates per study.
- [[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]] - CONTAINS: contributions, practical advice, optimal publication rules, assumptions table.

## Sources

- Andrews and Kasy (2017/2019), NBER WP 23298 / AER 109(8) - Andrews 2019 - Identification of and Correction for Publication Bias (NBER working paper, Nov 2017 revision).

## See Also

- [[Sterne 2011 - Funnel Plot Asymmetry - Overview]]
- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
