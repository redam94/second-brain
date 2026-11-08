---
title: "Rosenman 2020 - Combining Observational and Experimental Datasets - Overview"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/overview
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Whole paper, arXiv:2002.06708v2, pp. 1-29 incl. Appendix (proofs of Theorems 2-3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[James-Stein Estimator]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
used_by:
  - "[[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]]"
aliases:
  - Rosenman Basse Owen Baiocchi 2020
  - Combining observational and experimental datasets using shrinkage estimators
  - shrinkage estimators data fusion
---

# Rosenman 2020 - Combining Observational and Experimental Datasets - Overview

> [!summary]
> Rosenman, Basse, Owen & Baiocchi (arXiv 2020) combine a small randomised study (unbiased, high-variance estimates $\hat\tau_r$ of $K$ stratum effects) with a large observational study ($\hat\tau_o$, low-variance but with unknown stratum-level bias $\xi$ from unmeasured confounding). Stein-type shrinkage estimators $\kappa_1^+,\kappa_2^+$ trade off the two by minimising an unbiased risk estimate, provably beating the RCT-alone estimator when $K\ge4$ (testable conditions) and are asymptotically optimal as $K\to\infty$. A link to the Zhao-Small-Bhattacharya marginal sensitivity model converts the data-driven shrinkage into an interpretable "implied $\Gamma$".

## Overview

**Problem ("data fusion").** Observational data have a *bias problem*; experimental data have a *variance problem*. Earlier work (Rosenman et al. 2018) assumed all confounders measured; here residual bias $\xi$ of unknown size remains even after stratifying on the propensity score.

**Contributions.**
1. Generic procedure: posit a shrinkage structure, minimise a generalised unbiased risk estimate (URE, Theorem 1) to get the base estimator, optionally correct for estimating the shrinkage factor from the data.
2. Two estimators: common shrinkage $\kappa_1$ (and positive part $\kappa_{1+}$, corrected $\kappa_1^*$) and variance-weighted $\kappa_2$ ($\kappa_{2+}$, $\kappa_2^*$); finite-sample dominance conditions (Lemmas 1-3) and asymptotic optimality (Theorems 2-3).
3. Sensitivity link: choose $\Gamma$ so that the Zhao et al. (2019) worst-case-bias-based shrinkage factor equals the data-driven one ("implied $\Gamma$").
4. Simulation with $n_o=10{,}000$, $n_r=1{,}000$, $K=6,20$ strata.

## Main Content

### Source Map

| Paper section | Content | Note |
|---|---|---|
| Sec. 1-2 (pp. 2-4) | motivation, data fusion literature, Green-Strawderman estimators | this note and [[Rosenman 2020 - Setup Assumptions and Bias Structure]] |
| Sec. 3.1-3.3 (pp. 4-6) | notation, Assumptions 1-2, loss, estimator distributions, bias $\xi_k$ | [[Rosenman 2020 - Setup Assumptions and Bias Structure]] |
| Sec. 4.1, Theorem 1 (pp. 6-7) | URE for $\kappa=Z+\Sigma g$ | [[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]] |
| Sec. 4.2, Lemma 1-2, Theorem 2 (pp. 8-10) | $\kappa_1,\kappa_{1+},\kappa_1^*$ | [[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]] |
| Sec. 4.3, Lemma 3, Theorem 3 (p. 11) | $\kappa_2,\kappa_{2+},\kappa_2^*$ | [[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]] |
| Sec. 4.4 (pp. 12-13) | variance estimation, propensity (SIPW) adjustment | [[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]] |
| Sec. 5 (pp. 13-15) | sensitivity analysis, $\Gamma$, implied $\Gamma$ | [[Rosenman 2020 - Sensitivity Analysis and Implied Gamma]] |
| Sec. 6, Figs. 1-4 (pp. 15-19) | simulations | [[Rosenman 2020 - Simulation Results]] |
| Sec. 7 (pp. 19-22) | conclusion, extensions | [[Rosenman 2020 - Simulation Results]] |
| Appendix 8-9 (pp. 25-29) | proofs of Theorems 2-3 (Lemmas 4-6) | [[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]], [[Rosenman 2020 - Variance-Weighted Shrinkage and Practical Estimation]] |
| (not in paper) | hierarchical Bayesian version for ad campaigns | [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]] |

## Motivating PyMC examples

From https://redam94.github.io/pymc-challenges/examples.html:
- **E103** "A few holdouts for many campaigns: calibrating propensity estimates with a hierarchical model of their bias" (additivity of the bias; hierarchical bias model with covariates; funnel in $\tau$; shrinkage and posterior predictive bias).
- **E101** "Propensity scores in a brand lift study, graded by the experiment inside it".
- **E102** "Which way does the bias go? Hidden targeting, reach and the sign of a propensity estimate".

## Examples

Toy illustration (this vault's simulation, 4,000 replicates, $K=20$ strata, $\tau_k\sim U(0,1)$, RCT SD 0.2, observational SD 0.02, bias $\xi_k\sim N(0,s^2)$): mean squared error per stratum for RCT-only is 0.0403 in every case; $\kappa_{1+}$ gives 0.0023 ($s=0.02$), 0.0100 ($s=0.1$), 0.0291 ($s=0.3$) against observational-only 0.0008, 0.0104, 0.0902. The shrinkage estimator never does much worse than the better of the two and is far better than the worse.

## Connections

- Shrinkage background: [[James-Stein Estimator]], [[Stein's Paradox and Risk Dominance]], [[Empirical Bayes Interpretation of Shrinkage]].
- Marketing: observational ad measurement vs lift tests, [[Experimental Benchmarks for Observational Ad Measurement]], [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]], [[Conversion Lift Studies on Ad Platforms]].
- Sensitivity link to Bayesian bias priors: [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]].
- Transportability when the experiment population differs: [[Degtiar 2023 - Marketing Application Transporting Experiment Results]].

## See Also

[[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]], [[Propensity Score and the Balancing Property]]
