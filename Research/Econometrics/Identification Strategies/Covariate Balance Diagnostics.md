---
title: Covariate Balance Diagnostics
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/r
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§2, pp. 3–8"
date_ingested: 2026-06-29
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Propensity Score Matching]]"
  - "[[Matching Algorithms and Caliper Matching]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Activity Bias in Advertising]]"
  - "[[Frequentist Causal Estimation]]"
aliases:
  - covariate balance
  - love plot
  - standardized mean difference
  - SMD
  - overlap plot
---

# Covariate Balance Diagnostics

> [!summary]
> After propensity score matching or weighting, balance diagnostics verify that treated and control groups are comparable on observed covariates. The standardized mean difference (SMD) is the primary scalar measure; a love plot visualises SMDs before and after matching for all covariates; overlap plots check common support; variance ratios detect distributional differences beyond means. The conventional threshold |SMD| < 0.1 is necessary but not sufficient — always inspect the full distribution via overlap plots and empirical CDFs.

## Overview

Matching and weighting methods adjust for observed confounding by creating pseudo-populations with balanced covariate distributions. Balance diagnostics answer the question: *did the matching/weighting actually work?*

The Achilles heel of observational causal inference is [[The Selection Problem]]: selection into treatment is correlated with potential outcomes. If covariate balance is achieved after matching, the treated and control groups resemble a randomized experiment *on the observed covariates*, and we can proceed with standard outcome analysis. Poor balance signals that the matching failed and the ATT estimate would be biased.

> [!important] Design Stage Discipline
> Balance checking is a **design-stage** activity that does not look at outcomes. Per [[Potential Outcomes Framework#^def-ignorability|Potential Outcomes Framework]], maintaining outcome-blinding during design avoids the [[Garden of Forking Paths|forking paths]] problem — one should not iteratively tune matching until the observed treatment effect looks desirable.

## 1. Standardized Mean Difference (SMD)

The SMD is the most widely used balance statistic for a single covariate.

> [!definition] Definition: Standardized Mean Difference
> For covariate $k$, the standardized mean difference between treated ($T=1$) and control ($T=0$) groups is:
> $$\text{SMD}_k = \frac{\bar{X}_{k,1} - \bar{X}_{k,0}}{\sqrt{(s_{k,1}^2 + s_{k,0}^2)/2}}$$
> where $\bar{X}_{k,t}$ is the sample mean of covariate $k$ in group $t$, and $s_{k,t}^2$ is the sample variance. The denominator uses the **pooled standard deviation from the unmatched sample** (so SMD is comparable before and after matching).
> ^def-smd

**Interpretation**:
- $|\text{SMD}_k| < 0.1$: good balance (Cohen's "small effect" threshold; Rubin 2001 recommendation)
- $|\text{SMD}_k| \in [0.1, 0.2)$: marginal balance; acceptable with caution
- $|\text{SMD}_k| \geq 0.2$: poor balance; matching likely inadequate for this covariate

**Key properties**:
- Scale-invariant: SMD compares all covariates on the same scale regardless of units
- Can be computed before and after matching to assess improvement
- Should be computed on all covariates, not just those included in the treatment model (unmeasured confounders cannot be checked, but all measured covariates should balance as a validation)
- Also apply to the propensity score itself (logit scale): $\text{SMD}_{\text{logit}(e)}$ should be near 0 after matching

## 2. Love Plot

A love plot (Austin 2009) visualises all covariate SMDs simultaneously.

**Construction**: Horizontal dot plot where each row is a covariate, the x-axis is the SMD, and two point sets show SMD before and after matching (often connected by a line).

> [!example] Reading a Love Plot
> **Before matching**: Income SMD = 0.42; Age SMD = 0.31; Health SMD = 0.28 — substantial imbalance
> **After matching**: Income SMD = 0.06; Age SMD = 0.04; Health SMD = 0.08 — all within |0.10|
> **Verdict**: Matching achieved good balance on all three covariates.
> ^ex-love-plot

A vertical reference line at $|\text{SMD}| = 0.1$ marks the conventional threshold. A good match has all post-matching dots within the threshold.

```r
library(cobalt)   # main package for balance diagnostics

# love plot comparing balance before vs after matching
love.plot(
  m.out,           # matchit object
  threshold = 0.1, # draw reference line at 0.1
  var.order = "unadjusted",  # sort by pre-match SMD
  abs = TRUE,      # use absolute SMD
  stars = "raw"    # mark binary variables
)
```

## 3. Variance Ratios

SMDs only compare means. A treatment group may have the same mean as the control group but a very different spread — the distributions are still imbalanced. The variance ratio detects this.

> [!definition] Definition: Variance Ratio
> For covariate $k$:
> $$\text{VR}_k = \frac{s_{k,1}^2}{s_{k,0}^2}$$
> **Acceptable range**: $[0.5, 2.0]$ — i.e., the treatment group variance is no more than 2× or less than $\frac{1}{2}×$ the control group variance.
> ^def-variance-ratio

Variance ratios supplement SMDs: if $\text{VR}_k \approx 1$ and $|\text{SMD}_k| < 0.1$, the distributions are similar in location and spread.

## 4. Kolmogorov-Smirnov (KS) Statistic

For continuous covariates, the KS statistic tests whether the empirical CDFs of treated and control groups are identical:
$$\text{KS}_k = \sup_x |F_{k,1}(x) - F_{k,0}(x)|$$
where $F_{k,t}$ is the empirical CDF of covariate $k$ in group $t$.

- $\text{KS}_k = 0$: perfect distributional balance
- $\text{KS}_k = 1$: no overlap
- Conventional threshold: $\text{KS}_k < 0.1$ (same scale as SMD)

The KS statistic is more sensitive than SMD to tail imbalances and bimodality, and should be reported alongside SMD.

## 5. Overlap Plots (Propensity Score Histograms)

An overlap plot displays the distribution of the propensity score (or its logit) separately for treated and control groups.

**Purpose**: Assess **common support** — the region of the propensity score distribution where both treated and control units exist. Matching is only credible in the common support region.

> [!definition] Definition: Common Support / Overlap Region
> The common support is the set of propensity score values where both $\Pr(T=1 \mid e(X)=e) > 0$ and $\Pr(T=0 \mid e(X)=e) > 0$:
> $$\mathcal{S} = \{e : f(e \mid T=1) > 0 \text{ and } f(e \mid T=0) > 0\}$$
> Units outside $\mathcal{S}$ have no comparable counterparts and must be excluded from analysis if the ATT estimate is to remain credible.
> ^def-common-support

**Reading an overlap plot**:
- Good overlap: histograms for treated and control substantially overlap throughout; no large mass at 0 or 1
- Poor overlap: one group has propensity scores concentrated near 0 or 1 where the other group has no units

```r
# Propensity score overlap plot before matching
library(ggplot2)
ggplot(observational_df, aes(x = ps, fill = factor(treatment), color = factor(treatment))) +
  geom_histogram(aes(y = ..density..), alpha = 0.5, position = "identity", bins = 50) +
  scale_fill_manual(values = c("steelblue", "tomato"), labels = c("Control", "Treated")) +
  scale_color_manual(values = c("steelblue", "tomato")) +
  labs(x = "Propensity Score", y = "Density", fill = "Group", color = "Group") +
  theme_minimal()
```

After matching, the overlap plot should show near-identical distributions for treated and matched controls.

## 6. Empirical QQ Plots

For continuous covariates, a QQ plot of treated quantiles vs. control quantiles detects any distributional mismatch (not just mean or variance differences). Points lying on the 45-degree line indicate perfect balance; deviations reveal where the distributions diverge.

```r
# Balance assessment via cobalt
bal.tab(
  m.out,
  stats = c("mean.diffs", "variance.ratios", "ks.statistics"),
  thresholds = c(m = 0.1, v = 2)   # SMD and VR thresholds
)
```

## 7. Overall Assessment Workflow

A complete balance assessment involves:

1. **Check SMDs for all covariates** using a love plot — should be $< 0.1$ post-matching
2. **Check variance ratios** — should be $\in [0.5, 2.0]$
3. **Inspect the overlap plot** — verify common support and visual distributional alignment
4. **Check KS statistics** for continuous covariates — should be $< 0.1$
5. **Re-run matching with different specifications** if balance is poor:
   - Tighten the caliper
   - Include higher-order terms or interactions in the propensity score model
   - Switch from greedy to optimal or full matching
   - Consider trimming the sample to enforce stricter common support

> [!note] Balance is Necessary but Not Sufficient
> Achieving balance on observed covariates does not rule out unmeasured confounding. After demonstrating observed-covariate balance, sensitivity analysis (see [[Sensitivity Analysis in Observational Studies]]) assesses how robust conclusions are to potential unmeasured confounders — calibrated via Rosenbaum's $\Gamma$ parameter or E-values.

## R Package Reference

| Package | Purpose |
|---------|---------|
| `cobalt` | `love.plot()`, `bal.tab()` — primary balance diagnostics |
| `MatchIt` | Matching (`matchit()`), `summary()` gives SMDs |
| `tableone` | `CreateTableOne()` — formatted balance table (SMD column) |
| `ebal` | Entropy balancing — weighting to exact moment balance |

## Connections

- [[Propensity Score Matching]] — the matching framework that these diagnostics evaluate
- [[Matching Algorithms and Caliper Matching]] — algorithm choices that affect post-matching balance
- [[Frequentist Causal Estimation]] — IPW weighting also requires balance checking (via weighted SMDs)

## See Also
- [[Potential Outcomes Framework]] — the ignorability assumption that balance supports
- [[Sensitivity Analysis in Observational Studies]] — next step after confirming observed balance
- [[The Experimental Ideal]] — randomization achieves balance by design; matching approximates it empirically
- [[Activity Bias in Advertising]] — example where PSM balance is argued to be insufficient for causal identification
