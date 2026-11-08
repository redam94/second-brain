---
title: "Hullman 2015 - Precision of Inference from HOPs"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]"
source_location: "Sec. 6.2-6.3, pp. 19-21"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Hullman 2015 - Hypothetical Outcome Plots"
doc_type: paper
depends_on:
  - "[[Hullman 2015 - Hypothetical Outcome Plots - Overview]]"
  - "[[Hullman 2015 - Discussion and Limitations]]"
used_by:
  - "[[Hullman 2015 - Study Design and Distribution Tables]]"
aliases:
  - HOP precision bound
  - HOP frame rate
---

# Hullman 2015 - Precision of Inference from HOPs

> [!summary]
> Upper bound on HOP precision, assuming perfect processing: the mean of $n$ frames has standard error $\sigma/\sqrt n$, and the share of frames above a threshold has standard error $\sqrt{p(1-p)/n}$. Precision only improves as $1/\sqrt n$ (four times the frames halves the interval). Frame rate and interaction trade speed against precision per frame.

## Overview

"How many hypothetical outcomes from a distribution does a viewer need to see?" Section 6.2 answers analytically for two tasks; 6.3 addresses frame rate.

## Main Content

> [!theorem] Mean from $n$ frames
> If the viewer sees $n$ independent draws from a distribution with SD $\sigma$ and reports the sample mean $\hat m$, then $\operatorname{SD}(\hat m)=\sigma/\sqrt n$ and (CLT) $\hat m\approx N(\mu,\sigma^2/n)$. For $\sigma=10$, $n=25$: 95% of estimates lie within $1.96\cdot10/\sqrt{25}=3.92$ of $\mu$. With 100 frames the interval halves.
^thm-hop-mean

> [!theorem] Probability above a threshold from $n$ frames
> If the viewer notes only whether each frame exceeds $k$ and reports the share, then $\hat p$ has standard deviation $\sqrt{p(1-p)/n}$. For $p=0.66$, $n=25$: SD $=0.094$, so $\hat p$ is within $\pm19$ percentage points 95% of the time; with 100 frames SD $0.047$ and $\pm9$ points.
^thm-hop-prob

*Proof.* Binomial and CLT arguments. Viewers need not code frames in a binary way; using how far values lie from $k$ may beat these bounds, "however, as the outcome plots and tasks get more complicated, it may become harder to do more with the plot than just noticing whether a binary property is true".

**Frame rate (6.3).** Faster rates help perceive variability and let viewers see more frames; slower rates ease reading each frame. 400 ms was identified in pilots as a good compromise and allows eye motion and silent counting. For very reliable outcomes (near 0 or 1) faster rates may suffice. Optimal rate by task type is open.

## Examples

Verified: $1.96\sqrt{0.66\cdot0.34/25}=0.186$ and $1.96\sqrt{0.66\cdot0.34/100}=0.093$.

```python
import numpy as np
p = 0.66
for n in (25, 100):
    print(n, round(np.sqrt(p*(1 - p)/n), 3), round(1.96*np.sqrt(p*(1 - p)/n), 3))
# 25 0.095 0.186 ; 100 0.047 0.093
```

(The paper rounds the first SD to 0.094.)

## Connections
- Same arithmetic as Monte Carlo error: a probability read off $n$ draws has the standard error above. A quantile dotplot removes this sampling noise by using quantiles instead of draws ([[Kay 2016 - Quantile Dotplot Construction]]).
- Relates to the MC error of a posterior probability with $S$ draws in VoI estimation ([[Heath 2015 - Influenza Vaccine Case Study and Table 1]]).

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
