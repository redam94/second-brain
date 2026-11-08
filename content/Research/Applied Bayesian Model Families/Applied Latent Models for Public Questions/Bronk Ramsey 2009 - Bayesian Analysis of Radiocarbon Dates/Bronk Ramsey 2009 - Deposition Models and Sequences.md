---
title: "Bronk Ramsey 2009 - Deposition Models and Sequences"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]"
source_location: "p. 352 (Specific models; Eq. 32); Bchron context is outside the paper"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
doc_type: paper
depends_on:
  - "[[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]]"
used_by:
  - "[[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]]"
  - "[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]"
aliases:
  - "radiocarbon deposition models"
  - "age-depth models"
  - "Bchron Sluggan Bog"
---

# Bronk Ramsey 2009 - Deposition Models and Sequences

> [!summary]
> When samples come from a depositional record, depth carries information. The paper describes: simple `Sequence` order only; defined deposition rate (exact gaps $t_{i+1}=t_i+g_i$, one free variable, posterior computed without MCMC); constant rate (`U_Sequence`); piecewise-constant rates with change points; and random-variability models (`P_Sequence`). Bchron-style monotone-process models (used in example E39 for the Sluggan Bog core) are in the same family but are not described in this paper.

## Overview

The generic group priors have no notion of depth. For tree rings or sediment cores, the spacing between samples is known or constrained, which sharpens the posterior.

## Main Content

> [!definition] Defined deposition rate (Eq. 32)
> For dated events $t_i$ with known gaps $g_i$ (e.g. counted tree rings): $t_{i+1}=t_i+g_i$ for $a\le i<b$. There is one independent variable (typically the felling date $t_b$), so "this is one of the few Bayesian models where the posterior probability densities can be directly calculated without having to use Monte Carlo methods." Implemented as `D_Sequence`; used to fit floating tree-ring chronologies to the calibration data (Christen and Litton 1995; Bronk Ramsey et al. 2001).
^def-defined-rate

> [!definition] Other deposition models (listed, not derived)
> - `Sequence`: order only, "surprisingly effective" but ignores depth.
> - Constant rate (`U_Sequence`): Christen et al. 1995; Kilian et al. 1995.
> - Piecewise-constant rate with periodic changes: Aguilar et al. 2002; Blaauw et al. 2003; Blaauw and Christen 2005.
> - Non-linear rates: Walker et al. 2003; Telford et al. 2004; Heegaard et al. 2005.
> - Randomly variable rate (`P_Sequence`, Poisson-type): Bronk Ramsey 2008.
> The priors "are mathematically more complicated" than group priors; ideally they encode knowledge about the deposition process.
^def-deposition-list

**Relation to Bchron and E39 (outside the paper).** Bchron (Haslett and Parnell 2008; Parnell et al. 2008) models cumulative age as a monotone stochastic process in depth with gamma-distributed increments, with each date calibrated by an IntCal-type curve. E39 fits 31 dates from the Sluggan Bog peat core this way, treating depth-ordered ages as a monotone process and estimating age at unsampled depths.

## Examples

> [!example] Why the defined-rate model needs no MCMC
> Setup: 30 tree rings, so $g_i=1$ year. Only the final-ring date $t_b$ is unknown; each earlier ring is $t_b-(b-i)$. The posterior of $t_b$ is $\propto\prod_i p(y_i\mid t_b-(b-i))$ evaluated on a grid of $t_b$ and multiplied by the prior. The wiggle-match is "sharp" because the calibration curve's wiggles must fit all rings simultaneously.
^ex-wiggle-match

```python
import numpy as np
def wiggle_match(r_obs, s_obs, gaps, cal, r_curve, s_curve):
    """posterior over final-ring date on grid `cal` (untested toy)"""
    offs = np.r_[np.cumsum(gaps[::-1])[::-1], 0]    # years before final ring
    logp = np.zeros_like(cal, dtype=float)
    for k, tb in enumerate(cal):
        idx = np.searchsorted(cal, tb - offs)       # clip to grid in real code
        sd2 = s_obs**2 + s_curve[idx.clip(0, len(cal)-1)]**2
        logp[k] = (-0.5*(r_obs - r_curve[idx.clip(0, len(cal)-1)])**2/sd2 - 0.5*np.log(sd2)).sum()
    p = np.exp(logp - logp.max()); return p/p.sum()
```

## Connections
[[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]], [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]], [[Hilbert Space Gaussian Processes]] (alternative smooth-in-depth model).

## See Also
[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
