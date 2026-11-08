---
title: "Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]"
source_location: "Sec. 1 and 2.1-2.2, pp. 1-4, Figure 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test"
doc_type: paper
depends_on: []
used_by:
  - "[[Simoiu 2017 - Threshold Test Generative Model]]"
  - "[[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]]"
  - "[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]"
aliases:
  - "infra-marginality"
  - "outcome test Becker"
  - "benchmark test discrimination"
---

# Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem

> [!summary]
> The benchmark test compares rates at which groups are treated (searched); the outcome test (Becker) compares success rates (hit rates) of those treated. Infra-marginality is the failure of the outcome test when risk distributions differ: hit rates depend on the average risk *above* the threshold, not on the threshold itself. A tail-heavier signal distribution raises the hit rate even under a lower threshold.

## Overview

**Benchmarking** suffers the qualified-pool (denominator) problem, an omitted-variable bias. **Outcome tests** (Becker 1957, 1993; applied to policing by Knowles et al. 2001, Goel et al. 2016) avoid choosing a benchmark population but are "imperfect barometers". The paper's two-group, two-type toy: whites are either 1% or 75% likely to carry contraband, blacks 1% or 50%. Officers search anyone with probability at least 10% in a race-neutral way. Search hit rates: whites 75%, blacks 50%, so the outcome test flags apparent bias against whites even with no discrimination.

Related approaches: benchmarks from crash data (Alpert et al. 2004), aerial patrols, "veil of darkness" (Grogger and Ridgeway 2006), neighbourhood-level hierarchical benchmarks (Gelman et al. 2007), propensity matching (Ridgeway 2006), officer-race tests (Antonovics and Knight 2009; Anwar and Fang 2006), internal benchmarks; Knowles et al.'s equilibrium argument that hit rate equals the threshold (needs rational drivers with perfect knowledge, criticised by Engel and Tillyer 2008).

## Main Content

> [!definition] Threshold model of decision making (Sec. 2.1)
> Officers estimate the probability $p$ that a stopped driver carries contraband and search iff $p\ge t_r$, a race-specific threshold. The group's **signal distribution** is the distribution of $p$ across stopped drivers of that group. *Search rate* = area of the signal density above $t_r$; *hit rate* = the mean of the signal distribution conditional on being above $t_r$. If $t_{\text{black}}<t_{\text{white}}$ blacks are discriminated against (taste-based discrimination; statistical discrimination is not tested). Signals marginalise over unobserved covariates, which sidesteps omitted variables.
^def-threshold-model

> [!theorem] Search and hit rates do not identify thresholds (Figure 1)
> For beta signal densities $\text{Beta}(\alpha,\beta)$ and threshold $t$: search rate $=1-F(t;\alpha,\beta)$ and hit rate $=\dfrac{\alpha}{\alpha+\beta}\cdot\dfrac{1-F(t;\alpha+1,\beta)}{1-F(t;\alpha,\beta)}$. Panels (a) and (b) have (almost) the same search and hit rates for red and blue but opposite threshold orderings: (a) red 0.30 < blue 0.35; (b) blue 0.25 < red 0.30. Hence both tests can indicate discrimination against the wrong group.
^thm-infra-marginality

**Why (b) arises.** The blue distribution has higher variance ($\text{Beta}(2.1,4.1)$ vs $\text{Beta}(10.8,19.8)$): easier to separate innocent from guilty, so those searched are more often guilty (higher hit rate) and low-risk people are easy to skip (lower search rate). Mechanisms: innocent minorities who expect bias may act nervously (weaker signal), or one group may conceal better. "It is not a pathological case".

## Examples

> [!example] Reproducing Figure 1
> Setup: red $\text{Beta}(10.2,18.8)$ threshold 0.30; blue $\text{Beta}(10.3,16.2)$ threshold 0.35 for (a); (b) red $\text{Beta}(10.8,19.8)$ at 0.30 and blue $\text{Beta}(2.1,4.1)$ at 0.25. Solution: compute search and hit rates. Result (a): red 71.1% / 39.3%, blue 64.8% / 44.2%; (b): red 72.1% / 39.2%, blue 64.8% / 43.8%. The caption's "71% vs 64% and 39% vs 44%" holds for (a) exactly and for (b) to within about one point. Interpretation: red has the higher search rate and lower hit rate in both worlds, but only in (a) is red held to the lower threshold.
^ex-fig1
```python
from scipy import stats
def rates(a, b, t):
    sr = 1 - stats.beta(a, b).cdf(t)
    hit = a/(a+b) * (1 - stats.beta(a+1, b).cdf(t)) / sr
    return round(sr, 3), round(hit, 3)
print(rates(10.2,18.8,.30), rates(10.3,16.2,.35))   # (0.711,0.393) (0.648,0.442)
print(rates(10.8,19.8,.30), rates(2.1,4.1,.25))     # (0.721,0.392) (0.648,0.438)
```

## Connections
[[Simoiu 2017 - Threshold Test Generative Model]] solves the problem; [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] shows it in data; [[Poststratification]] (benchmark populations) and [[Type S and Type M Errors]] (wrong-sign conclusions).

## See Also
[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
