---
title: "Multiple Testing Corrections"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/fdr
  - type/concept
  - doc/paper
source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2907892/"
date_ingested: 2026-04-08
date_updated: 2026-08-24
folder: "Research Methodology/Experimental Design"
aliases:
  - "Bonferroni correction"
  - "False discovery rate"
  - "FDR"
  - "Benjamini-Hochberg"
  - "FWER"
  - "q-value"
doc_type: concept
source_location: "PMC2907892 (review article)"
depends_on:
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
---

# Multiple Testing Corrections

> [!summary]
> When performing many statistical tests simultaneously, the probability of false positives increases dramatically. Multiple testing corrections adjust significance thresholds to control error rates. The two main frameworks are **FWER** (Bonferroni — no false positives allowed) and **FDR** (Benjamini-Hochberg — tolerate a fixed proportion of false discoveries).

## The Problem

With $m$ independent tests at $\alpha = 0.05$:

$$P(\text{at least one false positive}) = 1 - (1-\alpha)^m$$

| Tests ($m$) | P(at least one FP) |
|-------------|-------------------|
| 1 | 5.0% |
| 10 | 40.1% |
| 100 | 99.4% |
| 1000 | ~100% |

This is why the [[Garden of Forking Paths]] is so dangerous — even without explicit testing, the implicit multiplicity inflates false positives.

## Family-Wise Error Rate (FWER)

### Bonferroni Correction

The simplest approach: reject $H_i$ only if $p_i \leq \alpha / m$.

$$\alpha_{\text{adjusted}} = \frac{\alpha}{m}$$

- **Controls**: probability that *any* false positive occurs
- **Pro**: simple, conservative, valid under any dependency structure
- **Con**: very conservative — often yields no significant results in large-scale studies

> [!warning]
> Bonferroni becomes extremely conservative as $m$ grows. With 10,000 tests, the threshold drops to $5 \times 10^{-6}$ — potentially missing many real effects.

### Holm's Step-Down Procedure

A less conservative FWER method:
1. Sort p-values: $p_{(1)} \leq p_{(2)} \leq \ldots \leq p_{(m)}$
2. Reject $H_{(i)}$ if $p_{(i)} \leq \alpha / (m - i + 1)$
3. Stop at first non-rejection

Uniformly more powerful than Bonferroni while still controlling FWER.

## False Discovery Rate (FDR)

### Concept

Instead of preventing *all* false positives, FDR controls the *expected proportion* of false discoveries among rejected hypotheses:

$$\text{FDR} = E\!\left[\frac{\text{false positives}}{\text{total rejections}}\right]$$

### Benjamini-Hochberg (BH) Procedure

1. Sort p-values: $p_{(1)} \leq p_{(2)} \leq \ldots \leq p_{(m)}$
2. Find the largest $k$ such that $p_{(k)} \leq \frac{k}{m} \alpha$
3. Reject all $H_{(1)}, \ldots, H_{(k)}$

- Controls FDR at level $\alpha$ under independence (or positive dependence)
- Much more powerful than Bonferroni for large-scale testing

### Q-Values (Storey)

The **q-value** of a test is the minimum FDR at which that test would be called significant — analogous to the p-value but for FDR rather than FWER.

## When to Use Each

| Method | Best for | Error controlled |
|--------|----------|-----------------|
| **Bonferroni** | Few tests, each individually important | FWER (any FP) |
| **Holm** | Few tests, want more power than Bonferroni | FWER |
| **BH/FDR** | Many tests, batch follow-up (genomics, imaging) | FDR (proportion of FP) |
| **Q-values** | Ranking results by reliability | FDR |

## Connection to Bayesian Approaches

> [!tip]
> [[Hierarchical Models]] provide a natural Bayesian alternative to multiple testing corrections. Partial pooling shrinks estimates toward the grand mean, automatically regularizing extreme results — achieving a similar effect to FDR control but derived from the model structure rather than an ad hoc correction. See [[Forking Paths and Bayesian Approaches]].

## See Also

- [[Garden of Forking Paths]] — why multiple comparisons are a problem even without explicit testing
- [[Researcher Degrees of Freedom]] — sources of implicit multiplicity
- [[Hierarchical Models]] — the Bayesian structural alternative
- [[Multiple Comparisons - Bayesian Perspective]] — Gelman et al. (2009) argue multilevel models replace classical corrections entirely
- [[Type S and Type M Errors]] — reframing statistical error beyond Type 1/Type 2
- [[Partial Pooling as Multiple Comparisons Correction]] — formal algebra of how shrinkage reduces z-scores
- [[Power Analysis and Sample Size]] — designing studies with adequate power
- [[The Experimental Ideal]] — even randomized experiments require multiple comparisons correction when testing many outcomes
- [[Always-Valid p-values and the mSPRT]] — sequential versions of Bonferroni and Benjamini-Hochberg
