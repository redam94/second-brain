---
title: "Imbens (2004) — Nonparametric Estimation of Average Treatment Effects under Exogeneity"
doc_type: paper
authors: "Guido W. Imbens"
year: 2004
journal: "Review of Economics and Statistics"
volume_issue: "86(1): 4–29"
doi: "10.1162/003465304323023651"
free_url: "https://sites.stat.columbia.edu/gelman/stuff_for_blog/imbens.pdf"
nber_url: "https://www.nber.org/papers/t0294"
tags:
  - doc/paper
  - topic/causal-inference
  - topic/propensity-score
  - topic/matching
download_status: "URLs identified (Gelman blog mirror + NBER WP t0294); download blocked by environment network policy (proxy 403)"
date_noted: 2026-06-30
---

# Imbens (2004) — Nonparametric Estimation of Average Treatment Effects under Exogeneity

## Bibliographic Reference

**Author:** Guido W. Imbens  
**Title:** Nonparametric Estimation of Average Treatment Effects under Exogeneity: A Review  
**Journal:** Review of Economics and Statistics, 86(1): 4–29 (2004)  
**DOI:** 10.1162/003465304323023651  
**NBER Working Paper:** t0294 (https://www.nber.org/papers/t0294)  
**Mirror:** https://sites.stat.columbia.edu/gelman/stuff_for_blog/imbens.pdf

## Abstract (paraphrased)

A review of nonparametric estimation methods for average treatment effects under the unconfoundedness assumption (no unmeasured confounders). Covers the three main estimation strategies — matching, weighting, and series estimation — and their finite-sample properties. Key contribution: a unifying framework that shows all three approaches are equivalent asymptotically but differ substantially in finite samples; also introduces propensity score trimming based on overlap.

## Key Results (from training knowledge)

- **Estimand taxonomy:** ATE ($E[Y_1 - Y_0]$), ATT ($E[Y_1 - Y_0 | D=1]$), ATC ($E[Y_1 - Y_0 | D=0]$).
- **Unconfoundedness:** $(Y_0, Y_1) \perp D | X$, equivalent to CIA.
- **Overlap (weak):** $0 < \Pr(D=1|X) < 1$ almost surely.
- **Bias-corrected matching:** Abadie-Imbens (2006) bias correction for NN matching removes $O(N^{-1/2})$ leading bias term.
- **Efficient estimation:** Semiparametrically efficient bound for the ATE is $\text{Var}\left[\frac{Y_1}{e(X)} - \frac{Y_0}{1-e(X)}\right] - \tau^2$.
- **Trimming:** Drop units with extreme propensity scores (near 0 or 1) to ensure overlap; Crump et al. (2009) provides optimal trimming rule.

## Derived Notes

- [[Propensity Score Matching - Overview]]
- [[PSM Algorithms and Matching Estimators]]
- [[Covariate Balance and Overlap Diagnostics]]
