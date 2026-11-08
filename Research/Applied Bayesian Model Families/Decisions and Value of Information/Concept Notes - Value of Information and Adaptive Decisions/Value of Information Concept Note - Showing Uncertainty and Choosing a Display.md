---
title: "Value of Information Concept Note - Showing Uncertainty and Choosing a Display"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (cites the literature listed under Sources)"
source_location: "Literature synthesis (see Sources)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions"
doc_type: paper
depends_on:
  - "[[Kay 2016 - Quantile Dotplot Construction]]"
  - "[[Hullman 2015 - HOP Method and Related Work]]"
used_by:
  - "[[Concept Notes - Value of Information and Adaptive Decisions/_Index|Index for this source]]"
aliases:
  - One posterior twenty displays
  - Choosing an uncertainty display
---

# Value of Information Concept Note - Showing Uncertainty and Choosing a Display

> [!summary]
> Concept note, no raw source beyond the two ingested papers. The right uncertainty display depends on the question asked of the posterior: a threshold probability (quantile dotplot, exceedance curve), a ranking or joint event (HOPs or a directly computed difference), a trend over time (fan chart), a set of curves (spaghetti), many groups (caterpillar, ridgeline). A band is not a set of curves.

## Overview

E16 (**Showing uncertainty: one posterior, twenty displays**) runs one posterior through epistemic and predictive bands, fan charts, spaghetti plots, animated hypothetical outcome plots, quantile dotplots, exceedance curves, caterpillars and ridgelines on a motorcycle crash-test series, Minnesota radon with county boundaries and Premier League 2024/25. The two ingested papers give the empirical evidence for two of the twenty: [[Kay 2016 - Quantile Dotplot Construction]] and [[Hullman 2015 - HOP Method and Related Work]].

## Main Content

| Question to answer | Display | Evidence / reasoning |
|---|---|---|
| "How likely is X above a threshold?" (single quantity) | Quantile dotplot with about 20 dots; exceedance curve | Dotplot-20 gives SD 0.11 vs density 0.13 for probability estimates ([[Kay 2016 - Experiment Beta Regression and Results]]); counting a tail uses subitizing. |
| "Is B larger than A?" or "which is best?" (joint event) | HOPs, or plot the posterior of $B-A$ | HOP MAE 0.09-0.13 vs 0.35-0.63 for violin/error bars ([[Hullman 2015 - Results and Mean Absolute Error]]); marginal bands drop correlation. |
| "What range of future values?" over time | Fan chart (nested predictive intervals) | Shows intervals at several coverage levels; conveys range, not joint paths. |
| "What shape could the whole curve take?" | Spaghetti / posterior draws of the function; animated draws | A band is a pointwise summary, not a set of curves: a curve inside the band can still be implausible. |
| Many groups with partial pooling | Caterpillar (intervals), ridgeline (densities) | Comparison across groups; extrinsic intervals risk misreading ([[Kay 2016 - Transit User Survey and Design Requirements]]). |
| "Parameter uncertainty vs future observation" | Epistemic (mean) band vs predictive band | Different quantities: the mean band narrows with data, the predictive band includes noise. |

> [!definition] Epistemic versus predictive band
> For $y=f(x)+\epsilon$: the **epistemic band** is a credible interval for $f(x)$ (shrinks as data grow); the **predictive band** is an interval for new $y$, with width $\approx\sqrt{\operatorname{Var}f(x)+\sigma^2}$ (does not shrink below noise). Confusing them is a standard error: one covers the curve, the other covers new points.
^def-epistemic-predictive

> [!theorem] A band is not a set of curves
> A pointwise 95% band for $f(\cdot)$ contains the true $f$ at each $x$ with 95% probability, but simultaneous coverage of the whole curve is lower unless the band is widened (simultaneous bands). A single draw from the posterior typically wanders inside and outside the pointwise band. *Reason*: coverage is a marginal statement; path properties depend on correlation across $x$.
^thm-band-not-curves

**Principles supported by the ingested papers.**
1. Put uncertainty *intrinsic* to the mark carrying the estimate (density, dots), not as an extrinsic bar (Kay et al.).
2. Prefer discrete outcomes in small numbers (about 20) so viewers can count or subitize (Kay et al.); animation trades time for space (Hullman et al.).
3. Use joint-draw displays when the question concerns relations among quantities (Hullman et al.).
4. Reduce Monte Carlo noise with quantiles rather than random draws when the display is static (Kay et al.).
5. Let users apply their own risk tolerance (a miss probability) rather than a fixed 95% interval.

## Examples

Verified: for independent $A\sim N(40,15)$, $B\sim N(45,15)$ the probability $P(B>A)=0.593$; a pair of 95% bars cannot show this, a HOP over 5000 frames can, and a 20-dot quantile dotplot of $B-A\sim N(5,21.2)$ gives it by counting dots above zero.

```python
import numpy as np
from scipy import stats
d = stats.norm(5, np.sqrt(450))
dots = d.ppf((np.arange(1, 21) - 0.5)/20)
print((dots > 0).sum(), "of 20 dots above 0")      # 12 -> 0.60 vs exact 0.593
```

## Connections
- Decision link: a displayed probability only matters relative to a threshold; see [[Vickers 2019 - Net Benefit and Threshold Probability]] and [[Value of Information Concept Note - EVPI, EVPPI and EVSI]].
- Posterior predictive thinking: [[Posterior Predictive Checking]].

## See Also
- [[Kay 2016 - When-ish is My Bus - Overview]], [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]

## Sources
- Kay et al. (2016); Hullman et al. (2015). Fan-chart, caterpillar and ridgeline conventions are standard practice (no single source cited here). E16 method list at <https://redam94.github.io/pymc-challenges/examples.html>.
