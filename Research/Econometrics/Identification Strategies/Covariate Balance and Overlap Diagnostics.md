---
title: "Covariate Balance and Overlap Diagnostics"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/propensity-score
  - topic/matching
  - type/concept
  - doc/paper
source: "[[raw/Caliendo Kopeinig 2008 - Practical Guidance for PSM]]"
source_location: "Journal of Economic Surveys 22(1): 31–72 (2008), §4–§5; Imbens (2004) REStat 86(1), §6"
date_ingested: 2026-06-30
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Propensity Score Matching - Overview]]"
  - "[[PSM Algorithms and Matching Estimators]]"
used_by:
  - "[[Sensitivity Analysis in Observational Studies]]"
  - "[[Frequentist Causal Estimation]]"
aliases:
  - love plot
  - covariate balance
  - SMD
  - standardized mean difference
  - overlap plot
  - common support
  - Rosenbaum bounds
---

# Covariate Balance and Overlap Diagnostics

> [!summary]
> After propensity score matching, balance diagnostics verify that the matched sample resembles a (approximate) experiment — treated and control groups look similar on all observed covariates. Key diagnostics: standardized mean differences (SMDs) < 0.10 on all covariates; variance ratios between 0.8 and 1.25; a Love plot showing pre/post-matching imbalance; and propensity score overlap plots confirming the common support condition. Rosenbaum bounds quantify robustness to unobserved confounders.

## Overview

Propensity score matching succeeds only if two conditions hold *after* matching:
1. **Balance**: The distribution of covariates $X$ is the same in the matched treated and control groups.
2. **Overlap**: Both groups share a common region of propensity score values.

Balance and overlap cannot be verified before matching — they must be checked as a post-matching diagnostic. Unlike model specification tests, balance is assessed by **effect size** (how large is the remaining imbalance?), not by p-values (is it statistically significant?).

## Standardized Mean Difference (SMD)

> [!definition] Definition: Standardized Mean Difference
> For covariate $k$, the SMD (also called "standardized bias") is:
> $$\text{SMD}_k = \frac{\bar{X}_{k,1} - \bar{X}_{k,0}}{\sqrt{(s_{k,1}^2 + s_{k,0}^2)/2}}$$
> where $\bar{X}_{k,t}$ and $s_{k,t}^2$ are the mean and variance of covariate $k$ in group $t \in \{0,1\}$ (treated/control).
^def-smd

For binary covariates, the SMD is:
$$\text{SMD}_k = \frac{\hat{p}_{k,1} - \hat{p}_{k,0}}{\sqrt{(\hat{p}_{k,1}(1-\hat{p}_{k,1}) + \hat{p}_{k,0}(1-\hat{p}_{k,0}))/2}}$$

> [!definition] Definition: Balance Threshold
> Standard thresholds:
> - $|\text{SMD}| < 0.10$: **adequate balance** (Austin 2009; Caliendo & Kopeinig 2008)
> - $|\text{SMD}| < 0.25$: acceptable balance (less stringent)
> - $|\text{SMD}| > 0.25$: problematic imbalance
>
> The SMD of 0.10 corresponds to Cohen's "very small" effect size — at this level, covariate imbalance contributes negligible bias to the treatment effect estimate.
^def-balance-threshold

> [!warning] Do Not Use t-Tests for Balance Assessment
> Testing for covariate balance using t-tests (or F-tests) is inappropriate: t-tests assess statistical significance (whether a difference is detectable given the sample size), but we want to assess the *magnitude* of imbalance. A small SMD in a large sample will be statistically significant but practically negligible. Always assess balance via SMD, not p-values.

## Variance Ratio

> [!definition] Definition: Variance Ratio
> $$VR_k = \frac{s_{k,1}^2}{s_{k,0}^2}$$
> A variance ratio of 1.0 indicates identical variance. Acceptable range: **0.5 to 2.0** (Rubin 2001); stricter standard: **0.8 to 1.25** (Ho et al. 2007).
^def-vr

The variance ratio checks that matching has not only equalized means but also higher-order moments of the distribution. Even if the means match, a large variance ratio implies the treated and matched controls come from distributions with different shapes.

## Love Plot

> [!definition] Definition: Love Plot
> A **Love plot** is a dot plot displaying the SMD for each covariate, for both the pre-matching and post-matching samples, on the same axis. Named for Thomas E. Love who popularized this visualization.
>
> **Construction:**
> - X-axis: SMD value
> - Y-axis: covariate names (one row per covariate)
> - Points: open circle = before matching, filled circle = after matching
> - Reference lines: dashed lines at $|\text{SMD}| = 0.10$ and $0.25$
> - Goal: all post-matching points should lie inside the $\pm 0.10$ band
^def-love-plot

Love plots immediately convey how well the matching worked across all covariates simultaneously, and whether any covariates remain imbalanced.

```r
# Minimal Love plot with cobalt::love.plot()
library(cobalt)
love.plot(
  m.out,                      # MatchIt output
  threshold = c(m = 0.1),     # dashed line at SMD = 0.1
  binary = "std",             # use SMD for binary vars
  abs = FALSE,                # show signed SMD
  var.order = "unadjusted"    # sort by pre-match imbalance
)
```

## KS Statistic (Full Distribution Balance)

SMD only measures mean imbalance. For continuous covariates, the Kolmogorov-Smirnov (KS) statistic measures imbalance in the full empirical distribution:

$$\text{KS}_k = \sup_x |F_{k,1}(x) - F_{k,0}(x)|$$

where $F_{k,t}(x)$ is the empirical CDF of covariate $k$ in group $t$. A KS statistic near 0 indicates distributional balance.

`cobalt` reports KS statistics alongside SMDs in `bal.tab()` output.

## Propensity Score Overlap Plot

> [!definition] Definition: Propensity Score Overlap Plot
> A **PS overlap plot** (or "mirrored histogram") shows the distribution of estimated propensity scores $\hat{e}(X_i)$ separately for treated and control units.
>
> **Good overlap**: the two distributions substantially overlap across the $(0,1)$ interval.
> **Poor overlap**: one group's PS is concentrated near 0 or 1 with little overlap with the other group.
^def-overlap-plot

```r
# Overlap plot in MatchIt
plot(m.out, type = "jitter", interactive = FALSE)    # jitter plot
plot(m.out, type = "density")                        # density overlay
```

## Common Support Condition

> [!definition] Definition: Common Support (Overlap)
> The **common support condition** requires that for every covariate value $x$ in the sample, there exist both treated and control units:
> $$0 < e(x) < 1 \quad \text{for all } x \in \mathcal{X}$$
^def-common-support

In practice, this is enforced by the **min-max rule**:

> [!definition] Definition: Common Support Region (Min-Max Rule)
> Keep only units with propensity scores in the intersection of the PS ranges of the two groups:
> $$\hat{e}(X_i) \in \left[\max\!\left(\min_{D_j=1} \hat{e}(X_j),\ \min_{D_j=0} \hat{e}(X_j)\right),\ \min\!\left(\max_{D_j=1} \hat{e}(X_j),\ \max_{D_j=0} \hat{e}(X_j)\right)\right]$$
^def-common-support-region

Units outside this region are dropped; this changes the estimand (the treatment effect is now estimated for the subset with common support). Always report how many units are excluded.

## Trimming: Crump et al. (2009) Optimal Rule

The min-max rule is heuristic. Crump et al. (2009) derive the optimal trimming rule for ATE estimation:

> [!theorem] Crump et al. Optimal Trimming
> For ATE estimation, keep only units with propensity score in $[\alpha, 1-\alpha]$ where $\alpha$ minimizes the variance of the IPW-ATE estimator:
> $$\alpha = \frac{2 - \sqrt{2 - 2\sqrt{1-\frac{1}{\sigma^2 \alpha^2}}} }{2}$$
> In practice, the optimal $\alpha \approx 0.10$ in many applications.
^thm-crump-trimming

After trimming at $\alpha = 0.10$, units with $\hat{e}(X_i) < 0.10$ or $\hat{e}(X_i) > 0.90$ are excluded.

## Sensitivity Analysis: Rosenbaum Bounds

After finding a significant treatment effect in the matched sample, the key question is: **could an unobserved confounder explain this result?** Rosenbaum (2002) provides sensitivity bounds.

> [!definition] Definition: Rosenbaum Bounds / $\Gamma$ Statistic
> Let $\Gamma \geq 1$ be a parameter measuring the degree of departure from a "matched" study. In a matched pair $(i, j)$, the odds of treatment for unit $i$ relative to unit $j$ is bounded by:
> $$\frac{1}{\Gamma} \leq \frac{\Pr(D_i=1) / \Pr(D_i=0)}{\Pr(D_j=1) / \Pr(D_j=0)} \leq \Gamma$$
> $\Gamma = 1$: no hidden bias (PSM worked perfectly). $\Gamma = 2$: an unobserved confounder could make one unit twice as likely to be treated as an identically-matched unit.
^def-rosenbaum-gamma

> [!definition] Definition: Sensitivity Analysis Procedure
> For $\Gamma = 1.5, 2, 3, \ldots$, compute the **maximum p-value** of the treatment effect under the worst-case hidden confounder of that strength. Report the **critical $\Gamma$**: the smallest $\Gamma$ at which the p-value exceeds 0.05.
>
> A result is **robust** if the critical $\Gamma$ is large (e.g., $\Gamma > 3$); it is **fragile** if $\Gamma \approx 1.1$.
^def-sensitivity-procedure

```r
library(rbounds)
# Rosenbaum bounds for signed Wilcoxon rank test on matched pairs
psens(
  matched_outcomes_treated,
  matched_outcomes_control,
  Gamma = 3,   # test up to Gamma = 3
  GammaInc = 0.1
)
```

## Checklist for Reporting PSM Results

A complete PSM analysis should report:
- [ ] Propensity score model specification (logit formula, covariates)
- [ ] Algorithm choice and parameters (NN/caliper/kernel, k, caliper width, with/without replacement)
- [ ] Number of matched units and (if applicable) number of treated discarded due to caliper
- [ ] Balance table: SMD for each covariate, before and after matching
- [ ] Love plot (standard figure)
- [ ] Propensity score overlap plot (pre-matching distribution)
- [ ] Variance ratios (optional, but good practice)
- [ ] Sensitivity analysis (Rosenbaum bounds or similar)
- [ ] Point estimate and standard error of ATT (using appropriate weighted variance)

## Connections

- [[Propensity Score Matching - Overview]] — the theoretical basis (Rosenbaum & Rubin 1983 balancing property)
- [[PSM Algorithms and Matching Estimators]] — the matching algorithms whose quality these diagnostics assess
- [[Frequentist Causal Estimation]] — IPW and DR estimators: the alternative to matching that also uses the PS
- [[Sensitivity Analysis in Observational Studies]] — broader treatment of sensitivity to unmeasured confounding

## See Also

- [[The Selection Problem]] — what PSM is trying to solve
- [[Bayesian Propensity Score Weighting]] — Bayesian version of IPW (no matching, but same PS)
- [[Omitted Variables Bias]] — what happens when the CIA fails and unobserved confounders exist
- [[Activity Bias in Advertising]] — applied example where PSM fails despite good covariate balance
