---
title: "Multiple Comparisons - Bayesian Perspective"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/bayesian-statistics
  - topic/multiple-comparisons
  - topic/hierarchical-models
  - type/overview
  - doc/paper
source: "[[raw/multiple2f.pdf]]"
source_location: "Full paper, pp. 1-28"
date_ingested: 2026-04-09
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Multiple Testing Corrections]]"
  - "[[Hierarchical Models]]"
  - "[[Garden of Forking Paths]]"
used_by:
  - "[[Type S and Type M Errors]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
aliases:
  - "Gelman Hill Yajima 2009"
  - "Why we don't have to worry about multiple comparisons"
---

# Multiple Comparisons - Bayesian Perspective

> [!summary]
> Gelman, Hill & Yajima (2009) argue that classical multiple comparisons corrections (Bonferroni, FDR) are often unnecessary because **multilevel models naturally handle multiplicity** through partial pooling. Rather than widening intervals post hoc, hierarchical models shift point estimates toward each other, yielding more reliable inferences while preserving statistical power. The paper reframes the problem away from Type 1 error toward [[Type S and Type M Errors|Type S (sign) and Type M (magnitude) errors]].

## Overview

Applied researchers routinely face settings where many comparisons arise: treatment effects across sites, subgroup analyses, multiple outcomes. Classical approaches address this by adjusting $p$-values or widening confidence intervals ([[Multiple Testing Corrections]]). This paper challenges that paradigm on two fronts:

1. **The null hypothesis is rarely exactly true** in social science — we rarely believe $\tau_j = 0$ exactly, so controlling Type 1 error is of limited practical importance.
2. **The real problem is not multiple testing but insufficient modeling** of the relationships between parameters. Multilevel models address this structurally.

## Two Key Departures from Classical Thinking

### Abandoning the Type 1 Error Paradigm

The classical concern is that we reject $H_0^j: \tau_j = 0$ when it is true. But in social science, effects are virtually never exactly zero — the question is about magnitude and sign. This motivates the [[Type S and Type M Errors]] framework (Gelman & Tuerlinckx, 2000):

- **Type S error**: claiming the effect is positive when it is actually negative (or vice versa)
- **Type M error**: substantial over- or under-estimation of effect magnitude

These errors are more practically relevant and are *exacerbated* by classical corrections that reduce power.

### Multilevel Models as Structural Solutions

Rather than correcting for a perceived problem, multilevel models **build the multiplicity into the model** from the start:

$$y_i \sim \text{N}(\gamma_{j[i]} + \delta_{j[i]} P_i, \sigma_y^2)$$
$$\delta_j \sim \text{N}(\mu, \sigma_\delta^2)$$

The group-level distribution $\delta_j \sim \text{N}(\mu, \sigma_\delta^2)$ is the key — it connects the parameters being compared, enabling information sharing across groups.

## Running Example: Infant Health and Development Program (IHDP)

The paper uses data from a multi-site randomized experiment (8 sites) evaluating an intervention for premature/low-birth-weight infants.

### Classical Analysis

$$y_i = \sum_{j=1}^{8} (\gamma_j S_i^j + \delta_j S_i^j P_i) + \epsilon_i$$

Testing $H_0^j: \delta_j = 0$ for each site at $\alpha = 0.05$: with 8 tests, there is a 34% chance of at least one false rejection. Standard intervals reject the null for 7 of 8 sites.

### Bonferroni Correction

Threshold becomes $0.05/8 = 0.0062$. Now only 5 of 8 sites reject — but this reduces power to detect real effects. The correction widens intervals without incorporating any structural information about the relationship between sites.

### Multilevel Model

Partial pooling shifts estimates toward each other and narrows intervals. All 8 site-specific estimates are clearly positive, and the intervals are *narrower* than the Bonferroni-corrected classical intervals because the model uses information from all sites to inform each site's estimate. See [[Partial Pooling as Multiple Comparisons Correction]] for the formal algebra.

## Extended Examples

### Comparing U.S. State Test Scores (Sec. 4.1)

All pairwise comparisons of NAEP math scores across 40+ states. Classical FDR correction produces a complex significance table. The multilevel model $y_j \sim \text{N}(\alpha_j, \sigma_j^2)$, $\alpha_j \sim \text{N}(\mu_\alpha, \sigma_\alpha^2)$ yields more informative comparisons — more claims with confidence, fewer ambiguous cases — because the high variance ratio $\sigma_\theta^2 / \sigma_y^2$ means little shrinkage is needed.

### Eight Schools (Sec. 4.2)

The classic Rubin (1981) SAT coaching example. Small between-school variance means strong shrinkage toward the common mean. Classical analysis finds at least one significant comparison in 47% of simulations; Bayesian analysis only 5%. Of the classical significant comparisons, only 63% have the correct sign — demonstrating the Type S error problem.

### Teacher Effects (Sec. 4.3)

NYC school system data (Kane, Rockoff & Staiger, 2007). Thousands of teachers make classical multiple comparisons adjustments impractical. A multilevel model is the natural approach — and is essentially what the researchers used.

### Fishing for Significance (Sec. 4.4)

Kanazawa (2007) claimed "beautiful parents have more daughters" ($p = 0.015$). But with 5 attractiveness categories $\times$ 4 time summaries = 20 possible comparisons, this is unsurprising — a textbook case of [[Researcher Degrees of Freedom]] inflating false positive risk. A Bayesian analysis with a reasonable prior finds the probability of a positive effect is only 58%.

### Subgroup Effects and Multiple Outcomes (Sec. 4.5, 5)

The IHDP model is extended to include birth-weight subgroups (lighter vs. heavier low-birth-weight) and 8 different cognitive test outcomes across 3 ages. The multilevel model handles the resulting 64 site $\times$ test comparisons naturally, with Bonferroni-adjusted classical intervals being at least twice as wide as the Bayesian intervals.

## Key Insight

> [!tip]
> The multiple comparisons "problem" and the multilevel modeling "solution" are two sides of the same coin. When there is genuine evidence for a multiple comparisons problem (low group-level variance), the Bayesian model makes corrections through shrinkage. When there isn't (high group-level variance), the model makes inferences similar to those without corrections. The model adapts to the data — classical corrections cannot.

## Connections

- This paper provides the argumentative bridge between [[Multiple Testing Corrections]] (the classical approach) and [[Hierarchical Models]] (the Bayesian structural solution)
- Extends the [[Garden of Forking Paths]] discussion by showing how Bayesian models handle the multiplicity that arises from data-contingent analysis
- The formal mechanism is detailed in [[Partial Pooling as Multiple Comparisons Correction]]

## See Also

- [[Type S and Type M Errors]] — the alternative error framework proposed here
- [[Partial Pooling as Multiple Comparisons Correction]] — the formal algebra of z-score shrinkage
- [[Multiple Testing Corrections]] — the classical corrections this paper argues against
- [[Hierarchical Models]] — the Bayesian framework (BDA3 Ch. 5)
- [[Forking Paths and Bayesian Approaches]] — complementary discussion of Bayesian solutions to multiplicity
- [[Hierarchical Linear Models]] — regression extensions of multilevel models
- [[Power Analysis and Sample Size]] — underpowered studies amplify Type S and Type M errors
- [[The Experimental Ideal]] — well-designed experiments with pre-registration reduce the multiplicity that motivates this paper's argument
