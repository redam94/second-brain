---
title: "Covariate Balance and Matching Diagnostics"
aliases:
  - love plot
  - covariate balance
  - balance diagnostics propensity score
  - overlap plot
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/PSM-Rosenbaum-Rubin-Stuart-Survey.md]]"
source_location: "Stuart (2010) §4; Austin (2009, 2011); Rubin (2001)"
date_ingested: 2026-06-28
date_updated: 2026-08-10
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
doc_type: paper
depends_on:
  - "[[Propensity Score Matching - Balancing Theorem and Failure Modes]]"
  - "[[Matching Algorithms and Caliper]]"
used_by:
  - "[[Bayesian Inverse Probability Weighting]]"
  - "[[Activity Bias in Advertising]]"
---

# Covariate Balance and Matching Diagnostics

> [!summary]
> After matching, balance must be assessed empirically — not with hypothesis tests but with effect-size measures. The **standardised mean difference (SMD)** is the primary scalar diagnostic (threshold: $|$SMD$|<0.1$ per covariate). The **love plot** visualises SMD for all covariates before and after matching. The **propensity score overlap plot** checks common support. Rubin (2001) formalises three criteria for "good balance." If diagnostics reveal poor balance, iterate: adjust the PS model or matching algorithm before estimating outcomes.

## Overview

Matching does not guarantee covariate balance — it reduces imbalance by construction, but the actual achieved balance must be verified. The fundamental principle, from Rosenbaum & Rubin (1985):

> **Check balance, not hypothesis tests.** The goal of matching is distributional equivalence of $X$ between treatment groups, not to achieve a significant $p$-value on a group difference test.

Balance diagnostics serve two purposes:
1. **Validate the design**: confirm that the matched sample approximates a randomised experiment
2. **Guide iteration**: identify specific covariates that remain imbalanced and drive adjustment

## The Standardised Mean Difference (SMD)

> [!definition] Definition: Standardised Mean Difference (SMD)
> For covariate $X_j$, the SMD in the matched sample is:
> $$\text{SMD}_j = \frac{\bar{X}_{j,T=1} - \bar{X}_{j,T=0}}{\sqrt{(s^2_{j,T=1} + s^2_{j,T=0})/2}}$$
> where $\bar{X}_{j,T=t}$ and $s^2_{j,T=t}$ are the mean and variance of $X_j$ in treatment group $t$ **in the matched sample**.
>
> The denominator uses the **pre-matched** pooled SD to make before/after comparisons interpretable on the same scale.
^def-smd

> [!tip] Threshold: |SMD| < 0.1
> Austin (2011) recommends $|\text{SMD}_j| < 0.1$ as the threshold for adequate balance. Values above 0.25 indicate serious imbalance. Some applied work uses 0.1 as a strict criterion and 0.25 as a "borderline" warning.

**Why not $t$-tests or $F$-tests?**

Hypothesis tests for covariate balance are fundamentally inappropriate (Austin 2009):
- $p$-values depend on **sample size**, not on balance quality. A large sample with moderate imbalance will give a significant $p$-value; a small well-matched sample will not.
- After matching, the matched sample is smaller, reducing power precisely when balance matters most.
- The goal is to make the matched sample resemble a **balanced design**, not to perform inference on it.

SMD is a **design criterion**, not a test statistic.

## The Love Plot

> [!definition] Definition: Love Plot (Austin 2009, named after Thomas Love)
> A dot plot showing the absolute SMD for each covariate, with two points per covariate: one for the **original (unmatched)** sample and one for the **matched** sample. A vertical reference line at 0.1 marks the balance threshold.
^def-love-plot

```r
library(cobalt)
# After matchit() or other matching procedure
love.plot(m.out,
          stats = "mean.diffs",     # plot SMD
          thresholds = c(m = 0.1),  # reference line at 0.1
          abs = TRUE,               # plot |SMD|
          var.order = "unadjusted", # order by pre-match SMD
          colors = c("grey50", "steelblue"),
          shapes = c("circle", "circle"),
          title = "Covariate Balance — Before and After Matching")
```

**Reading the love plot:**
- Points to the **right** of 0.1 in the matched sample indicate remaining imbalance requiring iteration
- Points shifting **left** (towards 0) after matching confirm improvement
- Covariates where the matched point is *further right* than the unmatched point signal **matching degradation** — rare but possible with poor caliper choice

## Propensity Score Overlap Plot

The overlap plot examines the **distribution** of propensity scores in treatment and control groups — before and after matching.

```r
# Base R: density of logit PS by group
par(mfrow = c(1,2))
# Before matching
plot(density(logit_ps[treated==1]), col="steelblue", main="Before",
     xlab="Logit propensity score")
lines(density(logit_ps[treated==0]), col="grey50")
legend("topright", c("Treated","Control"), col=c("steelblue","grey50"), lty=1)

# After matching
m.data <- match.data(m.out)
plot(density(m.data$logit_ps[m.data$T==1]), col="steelblue", main="After matching")
lines(density(m.data$logit_ps[m.data$T==0]), col="grey50")
```

**What to look for:**
- **Good overlap**: treated and control densities substantially overlap across the full PS range
- **Poor overlap**: treatment density has a long tail in a region with few controls — signals a common support problem; caliper will discard those treated units
- **After matching**: the control density should closely track the treated density — the matched control group has been *reweighted* to resemble the treated group

## Additional Diagnostics

### Variance Ratio

> [!definition] Definition: Variance Ratio (Rubin 2001)
> $$\text{VR}_j = \frac{s^2_{j,T=1}}{s^2_{j,T=0}}$$
> measured in the matched sample. Values near 1 indicate equal variances; Rubin (2001) recommends $\text{VR}_j \in [0.5, 2]$ for adequate balance.
^def-variance-ratio

The variance ratio detects distributional imbalance beyond the mean — even with equal means, if the treated group has a tighter or wider spread, the distributions differ. Austin (2009) reports that VR failures are common even when SMDs are acceptable.

### Kolmogorov-Smirnov (KS) Statistic

The KS statistic measures the maximum difference between empirical CDFs of the covariate in treatment and control:

$$\text{KS}_j = \sup_x |F_{j,T=1}(x) - F_{j,T=0}(x)|$$

Values near 0 indicate distributional balance. The KS statistic is sensitive to distributional differences beyond the mean and variance (e.g., multimodality, tail differences). Available in `cobalt::bal.tab()`.

### Effective Sample Size (ESS)

For weighting estimators (IPW, overlap weights), the **effective sample size** measures how much the weights reduce information:

$$\text{ESS} = \frac{\left(\sum_i w_i\right)^2}{\sum_i w_i^2}$$

ESS $\ll N$ signals extreme weights and inflated variance; recommend weight trimming or alternative weighting. For PSM (not weighting), the equivalent is the caliper exclusion rate.

## Rubin's Balance Criteria

Rubin (2001) proposes three criteria for claiming "good balance" in a matched sample:

> [!theorem] Rubin (2001) Balance Criteria
> A matched sample has **good balance** if all three conditions hold:
> 1. **PS balance**: $|\text{SMD}|$ for the propensity score itself is $< 0.25$
> 2. **PS variance ratio**: $\text{VR}$ for the propensity score is in $[0.5, 2]$
> 3. **Covariate variance ratios**: For each covariate $X_j$, $\text{VR}_j \in [0.5, 2]$ in the residuals of regression of $X_j$ on the PS
^thm-rubin-balance

Rubin's Criterion 1 on the PS itself is particularly important: if the PS distribution is not balanced between groups, no downstream regression can undo the imbalance.

## The Iterative Balance Cycle

Good matching practice is iterative:

```
1. Estimate PS with initial model (main effects only)
2. Match using chosen algorithm + caliper
3. Assess balance (love plot + overlap plot)
4. If poor balance on specific X_j:
   a. Add interactions / polynomials for X_j to PS model
   b. Or: switch matching algorithm (e.g., caliper → optimal)
   c. Or: add exact matching constraint on X_j
5. Re-estimate PS and re-match
6. Repeat until balance satisfactory
7. ONLY THEN: estimate the outcome model
```

> [!warning] Outcome Blinding
> The balance assessment should be conducted **without looking at the outcome $Y$**. Iterating the matching until the effect estimate changes is not legitimate — it is a form of specification searching. Check balance on $X$, blind to $Y$, then commit to the matched sample before estimating effects.

## Estimating ATT After Matching

After achieving satisfactory balance, the ATT is estimated from the matched sample:

```r
library(MatchIt)
m.data <- match.data(m.out)

# Simple difference in means (with matching weights)
lm_att <- lm(Y ~ T, data = m.data, weights = weights)

# Better: regression adjustment to reduce residual imbalance
lm_att_adj <- lm(Y ~ T + X1 + X2 + X3, data = m.data, weights = weights)

# Marginal effects via margins package or marginaleffects
library(marginaleffects)
avg_comparisons(lm_att_adj, variables = "T", data = m.data, weights = m.data$weights)
```

Including covariates in the outcome model even after matching (a "doubly robust" approach for PSM) reduces residual imbalance and variance, and is generally recommended.

## cobalt: Standardised Balance Assessment in R

The `cobalt` package (Greifer & Stuart 2021) is the standard tool for balance assessment after any matching or weighting procedure:

```r
library(cobalt)

# Comprehensive balance table
bal.tab(m.out,
        stats = c("m", "v", "ks"),  # SMD, variance ratio, KS
        thresholds = c(m = 0.1, v = 2))

# Love plot (see above)
love.plot(m.out, ...)

# Balance across subclasses
bal.plot(m.out, var.name = "X1", which = "both")  # density by group, before/after
```

`cobalt` works with `MatchIt`, `WeightIt`, `CBPS`, `twang`, and other matching/weighting packages.

## Connections

- [[Propensity Score Matching - Balancing Theorem and Failure Modes]] — the theoretical framework for which these diagnostics are the empirical check
- [[Matching Algorithms and Caliper]] — the algorithms whose output these diagnostics evaluate
- [[Frequentist Causal Estimation]] — for doubly-robust estimators after matching
- [[Bayesian Inverse Probability Weighting]] — the Bayesian IPW approach, which uses ESS and weight distributions as analogous diagnostics

## See Also

- [[Activity Bias in Advertising]] — a case where all observable balance diagnostics pass but causal estimates remain biased (unobserved confounder)
- [[The Selection Problem]] — why balance on $X$ does not guarantee unbiasedness when $U \not\in X$
- [[Conditional Independence Assumption]] — the assumption that observable balance validates (or fails to validate)
- [[Sensitivity Analysis in Observational Studies]] — complement to balance diagnostics: quantifies robustness to residual unmeasured confounding after matching
