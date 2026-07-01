---
title: "Covariate Balance Diagnostics"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Imbens 2004 - Nonparametric Estimation of Average Treatment Effects.md]]"
source_location: "§5 diagnostics, Review of Economics and Statistics 86(1):4–29"
date_ingested: 2026-07-01
folder: "Econometrics/Identification Strategies"
doc_type: concept
depends_on:
  - "[[Propensity Score Matching Methods]]"
  - "[[Propensity Score Definition and Properties]]"
  - "[[Rosenbaum and Rubin 1983 - Overview]]"
used_by:
  - "[[Frequentist Causal Estimation]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
aliases:
  - SMD
  - standardized mean difference
  - love plot
  - overlap plot
  - balance check
  - covariate balance
---

# Covariate Balance Diagnostics

> [!summary]
> After propensity score matching or weighting, balance diagnostics assess whether the treated and control groups have similar covariate distributions — the condition required for causal identification. The standardized mean difference (SMD) is the primary numeric measure; overlap (propensity score distribution) plots check common support; Love plots display SMD improvement across covariates. Balance assessment must be iterative: if balance is poor, the propensity model must be refined.

## Overview

The [[Propensity Score Definition and Properties#^thm-balancing|balancing property]] guarantees that conditioning on the *true* propensity score achieves covariate balance. But we use the *estimated* $\hat{e}(X)$, which may achieve imperfect balance if the propensity model is misspecified. Balance diagnostics quantify how well balance has been achieved after matching or weighting.

**Key principle (Rubin 2001):** Balance checking is not a statistical hypothesis test of whether the null of perfect balance is rejected. It is a descriptive assessment of whether residual imbalance is small enough to be irrelevant for the analysis. Use effect-size measures (SMD, variance ratio), not $p$-values.

## Diagnostic 1: Standardized Mean Difference (SMD)

> [!definition] Definition: Standardized Mean Difference (SMD)
> For a covariate $X_k$ with sample means $\bar{X}_{k,T=1}$ and $\bar{X}_{k,T=0}$ and standard deviations $s_{k,T=1}$, $s_{k,T=0}$ in the *original* (pre-matching) treated and control groups:
> $$\text{SMD}_k = \frac{\bar{X}_{k,T=1} - \bar{X}_{k,T=0}}{\sqrt{\frac{s_{k,T=1}^2 + s_{k,T=0}^2}{2}}}$$
> The denominator is the **pooled standard deviation** using the *pre-matching* group standard deviations (Austin 2009).
^def-smd

**Why pre-matching SD in the denominator?** Using the pre-matching pooled SD makes the SMD comparable before and after matching — it measures improvement in balance on the same scale.

**Interpretation:**
- $|\text{SMD}| < 0.1$: Generally considered good balance (Austin 2009; Rubin 2001 uses 0.1)
- $|\text{SMD}| < 0.25$: Acceptable in many applied settings (Cohen 1988 "small effect size")
- $|\text{SMD}| > 0.25$: Meaningful imbalance; iterate on propensity model or matching algorithm

**For binary covariates:** The same formula applies; $s^2 = \bar{x}(1-\bar{x})$ for the standard deviation.

**For non-binary distributions:** Can also compare higher moments (variance ratio) or empirical CDFs.

## Diagnostic 2: Variance Ratio

> [!definition] Definition: Variance Ratio
> $$\text{VR}_k = \frac{s_{k,T=1}^2}{s_{k,T=0}^2}$$
> where the variances are computed in the matched/weighted sample.
^def-variance-ratio

**Interpretation:** A variance ratio close to 1.0 indicates similar spread in the two groups. Rubin (2001) suggests the ratio should be between 0.5 and 2.0 for adequate balance, ideally between 0.8 and 1.25.

The variance ratio complements the SMD: two groups can have similar means (SMD ≈ 0) but very different variances (VR far from 1), indicating distributional differences that a means-only check would miss.

## Diagnostic 3: Overlap (Propensity Score Distribution) Plots

Overlap plots display the distribution of estimated propensity scores separately for treated and control units. The goal is to verify **common support**: for every propensity score value attained by treated units, there must be similar-propensity control units available for comparison.

> [!example] Overlap Plot Interpretation
> **Good overlap:** The propensity score distributions for treated and control substantially overlap. IPW weights are bounded; matching finds good matches for all treated units.
>
> **Poor overlap:** The treated distribution is concentrated near 1, the control near 0, with little overlap in $[0.3, 0.7]$. This signals near-violation of the positivity assumption — units in regions of non-overlap cannot be well-matched, and IPW weights will be extreme.
>
> **Action when overlap is poor:** Trim the sample to the region of common support (e.g., drop units with $\hat{e}(X) < 0.05$ or $\hat{e}(X) > 0.95$). This changes the estimand to ATE in the common-support sample.
^ex-overlap

**Mirror histogram:** Plot histograms of propensity scores for treated (above axis) and control (below axis, mirrored) on the same axes. Good overlap means the two distributions look like approximate reflections of each other.

**Density plot:** Kernel density estimates for treated and control overlaid. The region where both densities are above zero is the region of common support.

## Diagnostic 4: Love Plot

A Love plot (Austin & Stuart 2015) is a dot plot displaying the SMD for each covariate, with points for both the unmatched and matched samples. It allows visual assessment of balance improvement across all covariates simultaneously.

```
Love Plot (schematic):
                   Covariate
Income           ○────────────────● (large → small SMD after matching)
Education        ○──────● 
Age              ○───────────●
Prior earnings   ○────────────────────● (still large after matching)
Race             ○──● (already balanced)
                 ─┼──────────────────────
                 0.0  0.1  0.2  0.3  0.4
                       SMD
○ = before matching   ● = after matching
Dashed line at 0.1 = acceptable balance threshold
```

A Love plot provides an at-a-glance summary of:
1. Which covariates were imbalanced before matching
2. How much matching improved balance on each covariate
3. Which covariates remain imbalanced after matching (requiring further attention)

## Diagnostic 5: Empirical CDF Comparison

For continuous covariates, the **Kolmogorov-Smirnov (KS) statistic** is the maximum difference between the empirical CDFs of treated and control:
$$D_k = \sup_x |\hat{F}_{k,T=1}(x) - \hat{F}_{k,T=0}(x)|$$

Like the SMD, this should be interpreted as an effect size, not a significance test. $D_k < 0.1$ is generally adequate.

## The Iterative Balance Improvement Workflow

Balance checking is not a final verification step — it is part of an **iterative workflow**:

```
1. Specify initial propensity model (main effects, logistic regression)
      ↓
2. Estimate propensity scores
      ↓
3. Apply matching/weighting
      ↓
4. CHECK BALANCE (SMD, VR, overlap plots, Love plot)
      ↓
5. Balance adequate? 
      Yes → proceed to outcome analysis
      No  → refine propensity model:
              • Add interactions (e.g., X1 × X2)
              • Add higher-order terms (X²)
              • Use a more flexible estimator (GBM, random forest)
              • Adjust caliper or matching algorithm
            → return to Step 2
```

**Important:** Never modify the propensity model based on outcome model performance. Only look at covariate balance (not the treatment-outcome relationship) when iterating. This preserves the design/analysis separation analogous to blinded experimental analysis.

## Summary Table: Diagnostic Metrics

| Metric | What it measures | Good balance threshold |
|--------|-----------------|------------------------|
| SMD | Mean difference (in SD units) per covariate | \|SMD\| < 0.1 |
| Variance ratio | Spread ratio per covariate | 0.8 < VR < 1.25 |
| KS statistic | Distributional difference per covariate | KS < 0.1 |
| Overlap plot | Common support in propensity score | Substantial overlap visible |
| Love plot | Overall visual summary of all SMDs | All dots near 0 after matching |

## Statistical Tests Are Not Balance Tests

> [!warning] Do Not Use $t$-Tests or $\chi^2$ Tests for Balance Assessment
> After matching, checking balance with $t$-tests or $\chi^2$ tests and calling balance "achieved" when $p > 0.05$ is wrong. These tests measure statistical significance, not effect size. In a small matched sample, $p > 0.05$ can occur even with large SMD (low power). In a large sample, $p < 0.05$ can occur even with tiny, practically irrelevant SMD. Use SMD and variance ratio, which measure effect size rather than significance.
^warning-no-tests

This was emphasized by Imai, King & Stuart (2008), who show that balance tests can lead practitioners to accept badly balanced samples (small $N$, low power) or reject well-balanced ones (large $N$, high power against irrelevant differences).

## Software

| Package | Language | Features |
|---------|----------|----------|
| `MatchIt` | R | Matching + balance diagnostics + Love plots via `cobalt` |
| `cobalt` | R | Balance diagnostics, Love plots, works with any matching/weighting |
| `WeightIt` | R | IPW, entropy balancing, CBPS |
| `econml` | Python | Causal ML with propensity score estimation |
| `causalinference` | Python | Basic propensity score and matching |
| `DoubleML` | R/Python | Double/debiased ML, including propensity estimation |

## Connections

- [[Propensity Score Matching Methods]] — The matching algorithms whose output these diagnostics evaluate
- [[Propensity Score Definition and Properties]] — The balancing property that these diagnostics empirically verify
- [[Frequentist Causal Estimation]] — The estimators (IPW, DR) that also require balance
- [[Bayesian Propensity Score Weighting]] — Bayesian IPTW; same balance concerns apply

## See Also

- [[Activity Bias in Advertising]] — A case where balance diagnostics can look good but unconfoundedness still fails (unmeasured behavioral confounders)
- [[Conditional Independence Assumption]] — What perfect balance achieves: the treated and control groups satisfy CIA
- [[The Selection Problem]] — The underlying confounding problem that balance diagnostics help diagnose
- [[Rosenbaum and Rubin 1983 - Overview]] — The §5 balance-checking recommendations from the original propensity score paper
