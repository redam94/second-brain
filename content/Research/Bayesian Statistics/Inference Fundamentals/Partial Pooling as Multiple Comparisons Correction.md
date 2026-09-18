---
title: "Partial Pooling as Multiple Comparisons Correction"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/hierarchical-models
  - topic/partial-pooling
  - topic/multiple-comparisons
  - type/theorem
  - doc/paper
source: "[[raw/multiple2f.pdf]]"
source_location: "Sec. 3.2, pp. 8-12"
date_ingested: 2026-04-09
date_updated: 2026-04-13
folder: "Bayesian Statistics/Inference Fundamentals"
doc_type: concept
depends_on:
  - "[[Hierarchical Models]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
  - "[[Type S and Type M Errors]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Hierarchical Linear Models]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[James-Stein Estimator]]"
  - "[[Empirical Bayes - Overview]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "Shrinkage as multiple comparisons correction"
  - "Partial pooling z-score reduction"
---

# Partial Pooling as Multiple Comparisons Correction

> [!summary]
> In a hierarchical model, partial pooling shrinks group-level estimates toward the grand mean. This shrinkage reduces the z-score for any pairwise comparison by a factor of $1/\sqrt{1 + \sigma_{\bar{y}}^2/\sigma_\theta^2}$, which is always less than 1. The effect is strongest when group-level variance is small relative to within-group variance — precisely when multiple comparisons are most concerning. This provides a natural, data-adaptive multiple comparisons correction without the power loss of classical methods.

## Overview

Classical multiple comparisons corrections (Bonferroni, FDR) adjust the *threshold* for significance — they widen confidence intervals or lower the $p$-value cutoff, keeping point estimates unchanged. Multilevel models take a fundamentally different approach: they adjust the *estimates themselves* through partial pooling, pulling them toward each other. This section formalizes why this works as a multiple comparisons correction.

## The Multilevel Model

Consider a simple normal-normal hierarchical model for group effects:

$$
y_j \mid \theta_j \sim \text{N}(\theta_j, \sigma_{\bar{y}}^2), \quad j = 1, \ldots, J
$$
$$
\theta_j \sim \text{N}(\mu, \sigma_\theta^2)
$$

where $y_j$ is the group mean, $\sigma_{\bar{y}}^2$ is the within-group sampling variance, and $\sigma_\theta^2$ is the between-group variance.

## The Algebra of Shrinkage

> [!theorem] Theorem: Posterior Mean and Variance Under Partial Pooling (Gelman et al., 2009, Sec. 3.2)
> For the normal-normal hierarchical model, the posterior mean and standard deviation for group $j$ are:
>
> $$
> \text{posterior } \text{E}(\theta_j) = \left(\frac{1}{\sigma_\theta^2}\mu + \frac{1}{\sigma_{\bar{y}}^2}\bar{y}_j\right) \bigg/ \left(\frac{1}{\sigma_\theta^2} + \frac{1}{\sigma_{\bar{y}}^2}\right)
> $$
>
> $$
> \text{posterior } \text{sd}(\theta_j) = \frac{1}{\sqrt{\frac{1}{\sigma_\theta^2} + \frac{1}{\sigma_{\bar{y}}^2}}}
> $$
>
> The posterior mean is a precision-weighted average of the prior mean $\mu$ and the data $\bar{y}_j$. The smaller $\sigma_\theta^2$ (more similar groups), the more the estimate is pulled toward $\mu$.
^thm-posterior-pooling

## Z-Score Shrinkage for Comparisons

The key result for multiple comparisons: what happens to the z-score when comparing two groups?

> [!theorem] Theorem: Z-Score Shrinkage Factor (Gelman et al., 2009, Sec. 3.2)
> For a comparison $\theta_j - \theta_k$ between two groups:
>
> $$
> \text{posterior } \text{E}(\theta_j - \theta_k) = \frac{\sigma_\theta^2}{\sigma_{\bar{y}}^2 + \sigma_\theta^2}(\bar{y}_j - \bar{y}_k)
> $$
>
> $$
> \text{posterior } \text{sd}(\theta_j - \theta_k) = \sqrt{2}\,\sigma_{\bar{y}}\,\sigma_\theta \bigg/ \sqrt{\sigma_{\bar{y}}^2 + \sigma_\theta^2}
> $$
>
> The posterior z-score for the comparison is:
>
> $$
> z_{\text{Bayes}} = \underbrace{\frac{\bar{y}_j - \bar{y}_k}{\sqrt{2}\,\sigma_{\bar{y}}}}_{\text{classical z-score}} \cdot \underbrace{\frac{1}{\sqrt{1 + \sigma_{\bar{y}}^2 / \sigma_\theta^2}}}_{\text{shrinkage factor}}
> $$
>
> The shrinkage factor is always $< 1$ and approaches 0 as $\sigma_\theta^2 \to 0$ (groups are identical). It approaches 1 as $\sigma_\theta^2 \to \infty$ (groups are unrelated, no pooling).
^thm-zscore-shrinkage

> [!definition] Definition: Variance Ratio
> The **variance ratio** $\sigma_\theta^2 / \sigma_{\bar{y}}^2$ determines the degree of shrinkage:
> - **Small** (groups similar): strong shrinkage, large reduction in z-scores, effective multiple comparisons correction
> - **Large** (groups different): weak shrinkage, z-scores close to classical values, little correction needed
>
> This is the key adaptive property: the model corrects most when correction is most needed.
^def-variance-ratio

## Why This Is Better Than Classical Corrections

| Property | Classical (Bonferroni/FDR) | Multilevel (Partial Pooling) |
|----------|---------------------------|------------------------------|
| Adjusts | Threshold / interval width | Point estimates + intervals |
| Point estimates | Unchanged | Improved (shrunk toward mean) |
| Interval width | Always wider | Can be *narrower* than classical |
| Adapts to data | No (fixed penalty for $m$ tests) | Yes (adapts to variance ratio) |
| Power | Reduced | Preserved or improved |
| Type S error | Not addressed | Reduced by shrinkage |
| Type M error | Not addressed | Reduced by shrinkage |

## Simulation Evidence

> [!example] Example: Eight Schools — Small Effects (Gelman et al., 2009, Sec. 4.2)
> **Setup:** Simulate 8 school treatment effects from $\text{N}(0, 5^2)$ with standard errors from Rubin (1981). Perform 1000 replications, computing all $\binom{8}{2} = 28$ pairwise comparisons.
>
> **Classical results:** 7% of comparisons are statistically significant. Of these, only **63% have the correct sign** — a devastating Type S error rate of 37%.
>
> **Bayesian results:** Only 0.5% of comparisons are significant, with **89% correct sign**. The shrinkage has already performed the multiple comparisons correction.
>
> **Across replications:** Classical analysis finds at least one significant comparison in **47%** of simulations. Bayesian analysis: only **5%**.
^ex-eight-schools-sim

> [!example] Example: Eight Schools — Large Effects (Gelman et al., 2009, Sec. 4.2)
> **Setup:** Same as above but with $\text{N}(0, 10^2)$ — effects are now large relative to standard errors.
>
> **Classical results:** 12% significant, 86% correct sign.
>
> **Bayesian results:** 3% significant, **96% correct sign**.
>
> **Interpretation:** With larger effects, less shrinkage occurs (higher variance ratio), so the Bayesian model makes fewer corrections. But it still reduces false claims while maintaining higher accuracy on the claims it does make.
^ex-eight-schools-large

> [!example] Example: State Test Scores — High Variance Ratio (Gelman et al., 2009, Sec. 4.1)
> **Setup:** NAEP 4th-grade math scores across 40+ states. The variance ratio $\sigma_\theta^2 / \sigma_{\bar{y}}^2$ is large because true state differences are substantial.
>
> **Result:** The multilevel model produces *more* significant comparisons than the classical FDR-corrected analysis — more claims with confidence, fewer ambiguous cases. The hierarchical model adapts: when there's clear evidence of real differences, it doesn't over-correct.
^ex-state-scores

## The Intuition

Why does partial pooling work as a multiple comparisons correction?

1. **Multiple comparisons are a problem because of uncertainty** — if we knew the true effects, there would be nothing to correct
2. **Classical inference uses only within-group information** for each estimate — ignoring what other groups tell us
3. **Multilevel models recognize that groups are measuring the same phenomenon** — each group's estimate is informed by all groups
4. **Greater uncertainty → more shrinkage** — precisely the groups most prone to Type S/M errors get the strongest correction
5. The correction is **built into the model**, not applied as a post hoc patch

## Model Fitting

The multilevel model can be fit in R with `lme4`:

```r
ihdp.fit <- lmer(y ~ treatment + (1 + treatment | group))
```

Functions in the `arm` package can then sample from the posterior distribution for site-specific treatment effects. Full Bayesian fitting via Stan or BUGS allows for more flexible priors.

## Connections

- Greenland & Robins (1991) make a similar argument, framing multiple comparisons as an "opportunity to improve estimates through judicious use of prior information"
- The James-Stein estimator (Efron & Morris, 1975) is a frequentist analogue — pooled estimates dominate unpooled ones in $\geq 3$ dimensions
- Efron (2006) draws connections between empirical Bayes, hierarchical Bayes, and FDR

## See Also

- [[Hierarchical Models]] — the foundational framework (BDA3 Ch. 5, exchangeability, eight schools)
- [[Multiple Comparisons - Bayesian Perspective]] — the full paper overview and examples
- [[Type S and Type M Errors]] — the error framework that motivates this approach
- [[Multiple Testing Corrections]] — classical alternatives (Bonferroni, FDR, Holm)
- [[Hierarchical Linear Models]] — regression extensions with partial pooling
- [[Forking Paths and Bayesian Approaches]] — complementary Bayesian perspective on multiplicity
- [[Single-Parameter Models]] — building block: precision-weighted averaging
- [[James-Stein Estimator]] — the frequentist shrinkage estimator this note cites (Efron & Morris)
- [[Empirical Bayes - Overview]] — empirical-Bayes view of shrinkage and its FDR connections
