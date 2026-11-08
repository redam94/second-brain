---
title: "Hullman 2015 - HOP Method and Related Work"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/definition
  - doc/paper
source: "[[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]"
source_location: "Sec. 1-2, pp. 1-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Hullman 2015 - Hypothetical Outcome Plots"
doc_type: paper
depends_on:
  - "[[Hullman 2015 - Hypothetical Outcome Plots - Overview]]"
used_by:
  - "[[Hullman 2015 - Study Design and Distribution Tables]]"
aliases:
  - Hypothetical outcome plot definition
  - Error bar misinterpretation
---

# Hullman 2015 - HOP Method and Related Work

> [!summary]
> A HOP animates a finite set of independent draws from a distribution, one per frame. Its two drawbacks are sampling error (finite frames) and the need to integrate over frames; its advantages are thinking in counts and needing no extra statistical marks. The paper reviews static, multi-draw, line-up and simulation-based precedents.

## Overview

The authors distinguish a *sampling distribution* (for example of a mean) from an *underlying distribution*. HOPs apply to any distribution, not just a null for hypothesis tests, so they support inference beyond NHST.

## Main Content

> [!definition] Hypothetical Outcome Plot (HOP)
> Draw a sample of $n$ hypothetical outcomes $x^{(1)},\dots,x^{(n)}$ from a distribution (jointly, for several quantities); render one plot per draw; present them as an animation with controls to start, pause and step. For one variable each frame shows a horizontal bar at the draw's value; for several variables, bars for each variable in the same frame, so that joint structure such as correlation is visible.
^def-hop

> [!theorem] Advantages and drawbacks (Sec. 1)
> (1) HOPs let viewers reason in finite counts, not infinite probabilities, which numerous studies find easier; (2) no added marks or encodings are needed. Drawbacks: (a) finite frames add sampling error; (b) viewers must integrate information across frames, easier if the axis range is fixed.
^thm-hop-pros-cons

**Related work (Sec. 2).**
- *Static abstract depictions.* Error bars are extrinsic annotations and are misread (misunderstanding the statistic; "overlapping error bars imply no difference"; uniform probability; the within-bar bias that outcomes below the bar top seem more likely). Violin plots encode density as width; gradient plots as opacity (not tested because area is easier to decode than opacity).
- *Multiple draws.* Bootstrapped rainfall draws; animated or toggled stochastic spatial maps (flickering maps found helpful but "annoying" to some); New York Times simulation-based employment and election graphics.
- *Line-ups.* Hypothesis-test line-ups hide the real data among null draws (permutation of a column); HOPs generalise to any model distribution.
- *Simulation in statistics education.* Simulation conveys sampling distributions; Cumming's "dance of the means" is HOPs of the sampling distribution of a mean. The authors suggest HOPs can substitute for abstract static forms, not merely teach them.

## Examples

Fig. 1 scenario: concentrations of two solutes in sea-water vials, each shown as a mean with a 95% bar; ask Pr(B > A). The correct answer, 75%, requires the joint distribution; with independent normals $P(B>A)=\Phi\big((\mu_B-\mu_A)/\sqrt{\sigma_A^2+\sigma_B^2}\big)$, which a HOP lets viewers approximate by counting frames.

```python
import numpy as np
rng = np.random.default_rng(0)
a = rng.normal(40, 15, 5000); b = rng.normal(45, 15, 5000)   # 5000 frames, as in the study
frames = np.stack([a, b], axis=1)             # each row is one frame of the HOP
print((b > a).mean())                         # about 0.59 (distribution 5 in the paper)
```

PyMC-style sketch (untested): `idata.posterior.stack(sample=("chain","draw"))` then `.isel(sample=rng.choice(n, 50))` gives draws; render each with matplotlib `FuncAnimation`.

## Connections
- Compare with posterior-predictive "spaghetti" overlays: [[Posterior Predictive Checking]].

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
