---
title: "Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change"
tags:
  - source/ingested
  - topic/model-validation
  - topic/goodhart
  - topic/extrapolation
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law.pdf]]"
source_location: "arXiv:1803.04585v4, §2 'Extremal Goodhart', p.2-4: definition (p.2-3), Model Insufficiency and eq. (2) (p.3), Change in Regime and eq. (3) (p.3-4), bridge paragraph (p.4)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law"
doc_type: paper
depends_on:
  - "[[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]]"
  - "[[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]"
used_by:
  - "[[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]]"
  - "[[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]]"
aliases:
  - Extremal Goodhart
  - Model Insufficiency Goodhart
  - Change in Regime Goodhart
---

# Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change

> [!summary]
> **Extremal Goodhart**: optimizing the proxy drives the system into extreme states that differ from the ordinary states in which the proxy-goal relationship was learned. It is "out of sample prediction" under selection pressure. It comes in two forms. **Model insufficiency** (eq. 2): the learned relationship is only an approximation that works in the observed region, such as a low-order polynomial whose omitted higher-order terms dominate once optimization moves outward. **Change in regime** (eq. 3): even the correct relationship holds only up to a boundary $a$, beyond which the proxy is linked to the goal differently, because of measurement saturation or a different generating process. Media-mix analogues: extrapolating a fitted saturation curve beyond observed spend, and trusting attribution in a market regime the training window never saw.
^summary

## Overview

The second category (§2, p.2-4) also needs only selection. Here, though, the problem is not noise added to a fixed relationship. The *relationship itself* is different, or wrongly modelled, in the region the optimizer reaches. Regressional Goodhart happens in every region. Extremal Goodhart is specific to the tail.

## Main Content

> [!definition] Extremal Goodhart (§2, p.2-3)
> "Worlds in which the proxy takes an extreme value may be very different from the ordinary worlds in which the relationship between the proxy and the goal was observed. A form of this occurs occurs [sic] in statistics and machine learning as 'out of sample prediction.'"
^def-extremal

The paper gives two routes (p.3):
1. **Simplification.** The proxy was simplified, "based on either an insufficient number of observations to uncover the true relationship, or because a simpler measure was preferred". Either way, "model insufficiency can lead to extremal Goodhart".
2. **Regional validity.** "the measure may be a correct estimator only in certain regions of the space. In regions where the generating process differs, the use of the measure leads to extremal Goodhart."

### 2a. Model insufficiency

> [!definition] Extremal Goodhart: Model Insufficiency (§2, p.3)
> "The metric of interest is based on a learned relationship between the goal and the metric which is approximately accurate in the initial region. Selection pressure moves the metric away from the region in which the relationship is most accurate so that the relationship collapses."
>
> **Simple model, eq. (2):**
> $$M = G(s_i) + G'(s_i) \tag{2}$$
> **Notation.** $s$ is a state in the state space $S$, and $G(s)\to\mathbb{R}$ and $M(s)\to\mathbb{R}$ are the goal and proxy maps defined in the formal setup ("Varieties of Goodhart-like Phenomena", p.2; see [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]]). The paper explains neither the subscript $i$ nor $G'$. Reading $s_i$ as an index over individual states, i.e. the (observed or selected) states $s_1,s_2,\dots$ at which the metric is evaluated, makes eq. (2) a pointwise statement: at each state the metric equals the goal plus a state-specific discrepancy. This reading is the vault's, not the paper's. $G'$ is likewise undefined. From context, it is a state-dependent discrepancy: the part of the goal-proxy relationship that the learned model leaves out. It is negligible in the observed region and grows away from it. (It is not a derivative, despite the prime.)
^def-model-insufficiency

Key points from the text (p.3):
- The error is "induced by model simplification and inaccuracy, and not a fundamental issue with the inability to build an sufficiently accurate estimator."
- In the simplest case it is "incomplete understanding of an empirically learned relationship". Even if the relationship is the same inside and outside the observed range, "it is still often more difficult to detect the exact functional relationship based on a limited range."
- "More commonly, model insufficiency occurs because complex systems are approximated using observations of the non-optimized system space." The data come from a system that was not being optimized, and the model is then used to optimize it.
- **Public-policy example.** A relationship is "simplified for use as a measure without recognizing how selection pressure applied to the metric makes the simplification problematic".
- **ML example.** Underfitting. A relationship "is assumed to be a low degree polynomial because higher order polynomial terms are small in the observed region. Selection on the basis of the approximated metric moves towards regions where the higher-order terms are more important, so that use of the machine learning system creates a Goodhart effect."

### 2b. Change in regime

> [!definition] Extremal Goodhart: Change in Regime (§2, p.3)
> "The proxy M may be related to G differently in different regions. Even if the correct relationship is learned for the observed region, in the region where the proxy takes an extreme value the relationship to the goal may be fundamentally different. Selection on the basis of the proxy moves into such a region."
>
> **Simple model, eq. (3):**
> $$G=\begin{cases} M + x, & M\le a\\ M+y, & M>a\end{cases} \tag{3}$$
> where $a$ is the regime boundary, and $x$ and $y$ are region-specific offsets (or, more generally, region-specific error processes).
^def-regime-change

> [!definition] Two routes to regime change (§2, p.3-4)
> "The case of regime change can be due to measurement error so that errors are systemically incorrect in a given region. Alternatively, it can be due to a generating process that differs in defferent [sic] regions."
>
> 1. **Measurement-error route.** The measurement error is not noise around zero. It is *systematically* signed or sized within a particular region of the state space, so eq. (3)'s offset switches from $x$ to $y$ when the metric enters that region.
> 2. **Generating-process route.** The measurement is fine, but the underlying process obeys a different law beyond a boundary.
^def-regime-change-routes

Examples of the two routes (p.3-4):
- **Systematic measurement error in a region.** "wind-speed measurements may be systematically biased downwards when the wind-speed exceeds the design tolerances of the instruments". The relationship between *measured* wind speed and wind damage therefore differs "at and above the maximum tolerance".
- **A different generating process.** "the relationship between wind speeds and height undergoes a change above the atmospheric boundary layer. Even when the correct relationship is learned for this lower altitude, the relationship changes above it." Any selection pressure here "would cause entremal [sic] Goodhart to occur when a boundary is reached."

### Bridge to causal Goodhart (p.4)

"In the above cases of regressional and extremal Goodhart, there are issues with selection pressure for even simple systems when proxies are used. These two classes require selection pressure, but do not involve an intervention on the part of the regulator. When a regulator intervenes in the causal sense, it changes the state-space and allows an additional type of error that depends on the causal structure of the intervention."

## Examples

> [!example] Underfit polynomial (vault simulation of the paper's ML example)
> True goal $G(s)=s-0.1s^3$. The proxy is learned by OLS on $s\sim U(-1,1)$ with small noise. The fitted linear proxy is $\hat M(s)\approx0.94s$, which tracks $G$ well inside $[-1,1]$. Now optimize $\hat M$ by pushing $s$ upward:
>
> | $s$ | proxy $\hat M(s)$ | true $G(s)$ |
> |---|---|---|
> | 1 | 0.94 | 0.90 |
> | 2 | 1.88 | 1.20 |
> | 3 | 2.82 | 0.30 |
> | 4 | 3.76 | -2.40 |
>
> The proxy keeps rising, while the goal peaks near $s\approx1.83$ and then falls. Optimizing the proxy past the observed range is actively harmful. (Simulation code: [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation#^sim-extremal]].)
^ex-underfit-polynomial

> [!example] Saturation-curve extrapolation in media models (vault illustration)
> A weekly media model is fit on spend between \$20k and \$80k per week. A Hill or exponential saturation curve fitted there can usually be swapped for another functional form with almost no loss of fit inside the range, yet the forms disagree sharply at \$200k. A budget optimizer that recommends \$200k is selecting into the region where the curve is extrapolated: model-insufficiency extremal Goodhart. If a platform caps frequency or exhausts inventory above some spend, the response is a different function there: change-in-regime extremal Goodhart. See [[Shape (Saturation) Effects]] and [[ROAS, mROAS, and Optimal Media Mix]].
^ex-saturation-curve-extrapolation-in

## Connections

- **Permutation importance extrapolation.** Permute-and-predict evaluates models off the data manifold, which is the same out-of-region problem: [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Covariate shift.** Selecting into new regions shifts the input distribution: [[Conformal Prediction Under Covariate Shift]].
- **Time-series regime change.** Structural breaks and nonstationarity make backtests unrepresentative: [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Granger 2003 - Spurious Regression and Cointegration - Overview]].
- **Simulation design.** Testing a method only within the "ordinary" region of a simulator misses extremal failures. Simulation studies should deliberately cover extreme regions: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].
- **Simplicity vs accuracy.** Simple models are preferred for interpretability, at the cost of extremal fragility: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].

## See Also
- [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] — the region-free counterpart
- [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] — ignored causes that show up as model insufficiency or regime change
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]
