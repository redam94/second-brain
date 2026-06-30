---
title: "Rosenbaum & Rubin (1983) — The Central Role of the Propensity Score"
doc_type: paper
authors: "Paul R. Rosenbaum, Donald B. Rubin"
year: 1983
journal: "Biometrika"
volume_issue: "70(1): 41–55"
doi: "10.1093/biomet/70.1.41"
free_url: "https://www.stat.cmu.edu/~ryantibs/journalclub/rosenbaum_1983.pdf"
nber_url: ""
tags:
  - doc/paper
  - topic/causal-inference
  - topic/propensity-score
download_status: "URL identified; download blocked by environment network policy (proxy 403)"
date_noted: 2026-06-30
---

# Rosenbaum & Rubin (1983) — The Central Role of the Propensity Score

## Bibliographic Reference

**Authors:** Paul R. Rosenbaum, Donald B. Rubin  
**Title:** The Central Role of the Propensity Score in Observational Studies for Causal Effects  
**Journal:** Biometrika, 70(1): 41–55 (1983)  
**DOI:** 10.1093/biomet/70.1.41  
**Free access:** https://www.stat.cmu.edu/~ryantibs/journalclub/rosenbaum_1983.pdf

## Abstract (paraphrased)

The propensity score $e(x) = \Pr(Z=1 | X=x)$ is the conditional probability of assignment to treatment given observed covariates. The paper shows that: (1) the propensity score is a "balancing score" — conditioning on it makes the treatment indicator independent of the covariates; (2) under strong ignorability, conditioning on the propensity score is sufficient for unconfounded causal inference (matching, subclassification, or weighting on the scalar propensity score eliminates multivariate confounding); (3) subclassification on 5 propensity score groups removes >90% of bias in each covariate.

## Key Results (from training knowledge)

- **Theorem 1 (Balancing Score):** If $e(X) = \Pr(D=1|X)$, then $D \perp X | e(X)$.
- **Theorem 2 (Sufficiency for ignorability):** If $(Y_0, Y_1) \perp D | X$ and $0 < e(X) < 1$, then $(Y_0, Y_1) \perp D | e(X)$.
- **Corollary:** The propensity score reduces the dimensionality of the matching problem to a single scalar.
- **Subclassification result:** Five equally-spaced strata on $e(X)$ remove more than 90% of bias from each covariate asymptotically.

## Derived Notes

- [[Propensity Score Matching - Overview]]
- [[PSM Algorithms and Matching Estimators]]
- [[Covariate Balance and Overlap Diagnostics]]
