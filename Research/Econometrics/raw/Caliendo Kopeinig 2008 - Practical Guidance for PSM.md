---
title: "Caliendo & Kopeinig (2008) — Some Practical Guidance for the Implementation of Propensity Score Matching"
doc_type: paper
authors: "Marco Caliendo, Sabine Kopeinig"
year: 2008
journal: "Journal of Economic Surveys"
volume_issue: "22(1): 31–72"
doi: "10.1111/j.1467-6419.2007.00527.x"
free_url: "https://docs.iza.org/dp1588.pdf"
ssrn_url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=721907"
tags:
  - doc/paper
  - topic/causal-inference
  - topic/propensity-score
  - topic/matching
download_status: "URL identified (IZA DP 1588); download blocked by environment network policy (proxy 403)"
date_noted: 2026-06-30
---

# Caliendo & Kopeinig (2008) — Practical Guidance for PSM

## Bibliographic Reference

**Authors:** Marco Caliendo, Sabine Kopeinig  
**Title:** Some Practical Guidance for the Implementation of Propensity Score Matching  
**Journal:** Journal of Economic Surveys, 22(1): 31–72 (2008)  
**DOI:** 10.1111/j.1467-6419.2007.00527.x  
**IZA Discussion Paper:** 1588 (https://docs.iza.org/dp1588.pdf)  
**SSRN:** https://papers.ssrn.com/sol3/papers.cfm?abstract_id=721907

## Abstract (paraphrased)

A practitioner's guide to the implementation of PSM covering: (1) specification of the propensity score model; (2) choice of matching algorithm (NN, caliper, kernel, radius, Mahalanobis); (3) checking overlap / common support; (4) covariate balance assessment after matching; (5) choice of the matching estimand (ATT vs ATE); (6) sensitivity analysis (Rosenbaum bounds). The paper provides concrete guidance on when to use each algorithm and what diagnostics to report.

## Key Content (from training knowledge)

1. **PS model specification**: Use all pre-treatment variables that affect treatment or outcome; logit/probit; include interactions and squares if covariate distributions differ substantially.
2. **Algorithm comparison**: NNM (low bias, high variance); kernel/radius (lower variance, smooth); caliper (protects against bad matches); Mahalanobis (works well with few covariates).
3. **Common support**: Enforce common support by dropping units with estimated PS below the minimum or above the maximum of the other group.
4. **Balance tests**: SMD (standardized bias) < 10% threshold; t-test for equality of means (though balance tests should assess the size of imbalance, not just p-values).
5. **Sensitivity analysis**: Rosenbaum $\Gamma$ parameter; how large must an unobserved confounder be to overturn the result?

## Derived Notes

- [[PSM Algorithms and Matching Estimators]]
- [[Covariate Balance and Overlap Diagnostics]]
