---
title: "Hullman 2015 - Discussion and Limitations"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]"
source_location: "Sec. 6 and 6.1, pp. 15-19"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Hullman 2015 - Hypothetical Outcome Plots"
doc_type: paper
depends_on:
  - "[[Hullman 2015 - Results and Mean Absolute Error]]"
used_by:
  - "[[Hullman 2015 - Hypothetical Outcome Plots - Overview]]"
aliases:
  - HOP limitations
  - HOP viewer strategies
---

# Hullman 2015 - Discussion and Limitations

> [!summary]
> Tasks were "about as favorable as possible" for static plots (independent normals), yet HOPs matched them for one variable and won for two or three. Viewers' strategies are unknown (counting versus ensemble averaging). Limitations include subject pool, normal distributions, no sampling-distribution framing, untested static discrete alternatives (one-dimensional scatter, beeswarm) and unexplained reversals.

## Overview

Section 6 interprets the results, speculates on mechanisms, and lists seven limitations (6.1).

## Main Content

**Interpretation.**
- HOPs performed worse on the mean at high $\sigma$ for two reasons predicted in advance: the bar jumps across large distances between frames, and finite-frame imprecision $\sigma/\sqrt n$ grows with $\sigma$.
- HOPs did better on cumulative probability when variance was low; the authors speculate violin and error bars are compressed vertically so it is hard to judge where a level falls; they note it is unclear why violins were poor at $\Pr(A>k_1)$ and error bars at between-threshold probabilities.
- Static-display failures on bivariate tasks were severe and not explained by any pattern.
- *Strategies.* Informal pilots suggested silent counting for some and ensemble averaging for others; a plausible mix is to count over a short window and extrapolate. Reliable outcomes (near 0 or 1) should be easy for any strategy; intermediate frequencies are harder and more frame-rate dependent (evidence mixed: row 4 with $\Pr\approx0$ had lowest MAE, but row 11 at 76% was next best).

> [!definition] Limitations (Sec. 6.1)
> 1. Unknown Mechanical Turk population, probably above average numeracy. 2. Tasks special: no inference on one variable inside multi-variable animations; pairwise comparisons of separated variables. 3. Described plots as observed samples, not sampling distributions; confidence-interval error bars untested. 4. Other static representations untested. 5. No special-purpose representations tuned to the question (for example $B-A$ with an error bar, $B-\max(A,C)$): the authors call tailoring "cheating" since the goal is a generic representation. 6. No static displays of finite outcomes (one-dimensional scatterplots, beeswarm). 7. No explanations from subjects.
^def-hop-limitations

## Examples

Limitation 5 in practice: if the question is always "is A better than B", compute and display the posterior of $A-B$ directly; HOPs matter when many questions are asked of one set of draws.

## Connections
- A static, countable alternative that avoids animation: [[Kay 2016 - Quantile Dotplot Construction]].
- For the display decision as a whole: [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]].

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
