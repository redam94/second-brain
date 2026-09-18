---
title: "Type S and Type M Errors"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/statistical-errors
  - type/concept
  - doc/paper
source: "[[raw/multiple2f.pdf]]"
source_location: "Sec. 3.1, pp. 7-8"
date_ingested: 2026-04-09
folder: "Research Methodology/Experimental Design"
doc_type: concept
depends_on:
  - "[[Multiple Testing Corrections]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
used_by:
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]"
aliases:
  - "Type S error"
  - "Type M error"
  - "Sign error"
  - "Magnitude error"
  - "Exaggeration ratio"
---

# Type S and Type M Errors

> [!summary]
> Type S (sign) and Type M (magnitude) errors reframe statistical error beyond the classical Type 1/Type 2 dichotomy. A Type S error occurs when we get the direction of an effect wrong; a Type M error occurs when we substantially over- or under-estimate its size. These errors are more practically relevant than Type 1 errors in social science, where effects are rarely exactly zero, and they are exacerbated by underpowered studies.

## Overview

The classical multiple comparisons framework focuses on Type 1 error: the probability of rejecting $H_0: \tau_j = 0$ when it is true. Gelman & Tuerlinckx (2000) argue this is the wrong concern for most applied research, because:

1. We rarely believe the null hypothesis is *exactly* true — in social science, there is almost always *some* difference between groups
2. The practical question is not "is the effect zero?" but "what is the effect's sign and magnitude?"

## Definitions

> [!definition] Definition: Type S Error (Gelman & Tuerlinckx, 2000)
> A **Type S (sign) error** occurs when we claim an effect is in one direction (e.g., $\tau_j > 0$) when the true effect is in the opposite direction ($\tau_j < 0$). For comparisons between groups, this means claiming $\tau_j > \tau_k$ when in fact $\tau_j < \tau_k$.
^def-type-s

> [!definition] Definition: Type M Error (Gelman & Tuerlinckx, 2000)
> A **Type M (magnitude) error** occurs when the estimated effect size substantially differs from the true effect size. The **exaggeration ratio** is $|\hat{\tau}| / |\tau|$. A Type M error is particularly concerning when a treatment effect is reported as near zero when it is actually large, or reported as large when it is near zero.
^def-type-m

## Why These Errors Matter More Than Type 1

Consider site-specific treatment effects $\tau_j$ for $j = 1, \ldots, J$ with hypotheses $H_0^j: \tau_j = 0$ vs. $H_A^j: \tau_j \neq 0$:

- **Type 1 error** asks: do we reject $H_0^j$ when $\tau_j = 0$? But when do we truly believe $\tau_j$ is *exactly* zero?
- **Type S error** asks: do we claim the effect is positive when it's actually negative? This has direct policy consequences.
- **Type M error** asks: is our estimate wildly off from the truth? This determines whether our conclusions are actionable.

## The Role of Uncertainty

> [!theorem] Theorem: Large Standard Errors Inflate Type M Errors (Gelman, Hill & Yajima, 2009, Sec. 3.1)
> When the true effect is near zero, an estimator with a large standard deviation is more likely to produce large point estimates (in absolute value) than an estimator with a small standard deviation. Statistically significant results from underpowered studies are therefore likely to be *exaggerated* — large estimates are a *byproduct* of large standard errors, not evidence of large effects.
^thm-type-m-inflation

This is illustrated by comparing two sampling distributions when the true effect is zero:
- With $\text{sd} = 1$: estimates exceeding $\pm 1.96$ occur 5% of the time, but their magnitude is modest
- With $\text{sd} = 3$: significant estimates are larger in absolute value, giving the misleading impression of a large effect

> [!example] Example: Subgroup Analysis (IHDP, Sec. 4.5)
> **Setup:** When moving from main effects to subgroup effects (e.g., site $\times$ birth-weight group), sample sizes per cell decrease and standard errors increase.
>
> **Result:** Classical estimates become more volatile — the lighter low-birth-weight group shows large swings across sites. The Bonferroni correction only widens intervals further, reinforcing the unreliability.
>
> **Bayesian solution:** The multilevel model shrinks the volatile estimates toward the group mean, yielding more stable and reliable subgroup-specific estimates. None of the Bayesian 95% intervals come close to covering zero, contrasting with 4 of the Bonferroni-adjusted classical intervals that include zero.
^ex-ihdp-subgroup

## Connection to Multiple Comparisons

When we switch from examining main effects to subgroup effects or pairwise comparisons:
- Sample sizes per comparison decrease
- Standard errors increase
- **Type M errors become more likely** — we are more likely to see large, misleading estimates
- **Type S errors become more likely** — with wide sampling distributions, getting the sign wrong is more probable

Classical multiple comparisons corrections (Bonferroni, FDR) address Type 1 error by widening intervals or raising the significance threshold. But this *further reduces power*, potentially *increasing* Type S and Type M error rates for real effects.

[[Hierarchical Models|Multilevel models]] address all three error types simultaneously:
- Partial pooling reduces the rate of "significant" comparisons (like classical corrections)
- But it does so by *improving point estimates* through shrinkage, not by *inflating uncertainty*
- Type S error rates decrease because shrunk estimates are more stable
- Type M error rates decrease because extreme estimates are pulled toward the grand mean

## Practical Guidance

1. **Frame questions in terms of sign and magnitude**, not "is it zero?"
2. **Use multilevel models** when comparing many groups — they naturally control Type S and Type M errors
3. **Be suspicious of large estimates from small samples** — they are likely Type M errors
4. **Don't rely solely on statistical significance** — a significant result from an underpowered study may have the wrong sign

## See Also

- [[Multiple Comparisons - Bayesian Perspective]] — the full argument for multilevel models over classical corrections
- [[Partial Pooling as Multiple Comparisons Correction]] — how shrinkage formally reduces Type S/M errors
- [[Multiple Testing Corrections]] — the classical corrections that focus on Type 1 error
- [[Power Analysis and Sample Size]] — underpowered studies amplify Type S and Type M errors
- [[Garden of Forking Paths]] — implicit multiplicity that compounds these errors
- [[Hierarchical Models]] — the modeling framework that addresses all error types
- [[Activity Bias in Advertising]] — the most dramatic Type M error in the vault: the 1198% observational estimate vs 5.4% RCT result yields an exaggeration ratio of ≈220×
- [[Observational vs Experimental Methods in Advertising]] — documents the full magnitude of observational bias in advertising as a concrete illustration of Type M error
