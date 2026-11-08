---
title: "Kay 2016 - Quantile Dotplot Construction"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/definition
  - doc/paper
source: "[[raw/Kay Kola Hullman Munson 2016 - When (ish) is My Bus.pdf]]"
source_location: "Design: Encoding probability, Figs 2-5, pp. 4-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Kay 2016 - When-ish is My Bus"
doc_type: paper
depends_on:
  - "[[Kay 2016 - When-ish is My Bus - Overview]]"
  - "[[Kay 2016 - Transit User Survey and Design Requirements]]"
used_by:
  - "[[Kay 2016 - Experiment Beta Regression and Results]]"
aliases:
  - Quantile dotplot
  - Wilkinson dotplot of quantiles
---

# Kay 2016 - Quantile Dotplot Construction

> [!summary]
> A quantile dotplot draws one dot per evenly spaced quantile of the predictive distribution (not random draws), stacked as a Wilkinson dotplot. It is a deterministic, countable discrete analogue of a density plot: counting $m$ dots from the tail gives a one-sided prediction interval of $1-m/n$.

## Overview

Sampling from the predictive distribution gives noisy plots that differ between instances; quantiles give a consistent representation. The authors also propose stripeplots of quantiles (a discrete analogue of the gradient plot).

## Main Content

> [!definition] Quantile dotplot (Fig. 2)
> For a predictive distribution with quantile function $Q$ (inverse CDF) and $n$ dots, the dots sit at $x_i=Q\big(\tfrac{i-0.5}{n}\big)$, $i=1..n$, and are drawn as a Wilkinson dotplot. In the paper's wording, "we use the quantile function (inverse CDF) of the distribution to generate 'draws' from evenly-spaced quantiles."
^def-quantile-dotplot

> [!theorem] Interval-by-counting property
> With $n$ dots, counting $m$ dots from the left tail gives a one-sided prediction interval of probability $1-m/n$. The paper's example: with 50 dots and willingness to miss the bus 3 times in 50, count 3 dots from the left for a one-sided 94% $(1-3/50)$ interval. For arbitrary precision interval probabilities are multiples of $1/n$, and a Wilkinson dotplot also conveys density.
^thm-dot-interval

**Encodings considered (Fig. 4 matrix).** Density; density+; stripeplot-50; dotplot-20; dotplot-50; dotplot-100. Rated on: shows discrete countable events; fast counting in tails and body; directly estimates density; directly estimates quantiles; tight densities drawn consistently; projects to axis; assesses range; assesses mode. Selected for testing (Fig. 5): density, stripeplot-50, dotplot-20, dotplot-100.

**Small-screen issues.** Tight (low-variance) densities become tall; compromise: scale down max height only when it exceeds the row height (density, dotplot-50, dotplot-100; for dense dotplots reduce dot spacing). Dotplot-20 and stripeplot are drawn consistently with no modification. Countability varies: few dots are easy to count in body and tails but resolve density poorly; many dots resolve density but are overwhelming to count in the body.

## Examples

Verified: 20 quantile dots for $X\sim N(5,2^2)$ sit at $1.08, 2.12, 2.70, 3.13, 3.49, 3.80, 4.09, 4.36, 4.62, 4.87, 5.13, 5.38, 5.64, 5.91, 6.20, 6.51, 6.87, 7.30, 7.88, 8.92$. Counting the 3 leftmost dots covers $x\lesssim2.9$ (the boundary between dots 3 and 4), whose exact probability is $\Phi(-1.05)\approx0.147\approx3/20$: the quantile construction makes interval-by-counting accurate to the grid $1/n$, which is the property the random-draw version lacks.

```python
import numpy as np
from scipy import stats
n = 20
q = stats.norm(5, 2).ppf((np.arange(1, n + 1) - 0.5) / n)      # dot positions
# plotting: stack dots by binning q (matplotlib: ax.scatter with cumulative count in bin)
```

PyMC-style sketch (untested): quantile dots for a posterior predictive are `np.quantile(idata.posterior_predictive["y"].values.ravel(), (np.arange(n)+.5)/n)`; ArviZ and the R package `ggdist` (`stat_dots(quantiles = 20)`) implement the plot.

## Connections
- This is E16's recipe: one posterior, many displays; a dotplot of 20 quantiles of the predictive distribution of a lift or ROI is a direct "17 of 20 chances above the hurdle" read.
- See the empirical evidence for 20 versus 100 dots: [[Kay 2016 - Experiment Beta Regression and Results]].

## See Also
- [[Kay 2016 - When-ish is My Bus - Overview]], [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
