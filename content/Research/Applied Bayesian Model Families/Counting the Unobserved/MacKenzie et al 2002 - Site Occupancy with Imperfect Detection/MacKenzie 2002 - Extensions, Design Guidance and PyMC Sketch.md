---
title: "MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch"
tags:
  - source/ingested
  - topic/population-estimation
  - type/concept
  - doc/paper
source: "[[raw/MacKenzie 2002 - Estimating Site Occupancy Rates When Detection Probabilities Are Less Than One.pdf]]"
source_location: "Discussion, pp. 2253-2254"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/MacKenzie et al 2002 - Site Occupancy with Imperfect Detection"
doc_type: paper
depends_on:
  - "[[MacKenzie 2002 - Occupancy Model and Likelihood]]"
  - "[[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]]"
used_by:
  - "[[Barker 2018 - Reliability of N-Mixture Models - Overview]]"
aliases:
  - occupancy design guidance
  - occupancy PyMC sketch
---

# MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch

> [!summary]
> The discussion gives red flags for untrustworthy $\hat\psi$, minimum-effort guidance for visit numbers, and four extensions (robust design, colonisation/extinction, species co-occurrence, heterogeneity). A PyMC sketch shows how the latent presence indicator is marginalised so NUTS can be used.

## Overview

The paper positions occupancy as a cheaper state variable than abundance for large-scale monitoring and metapopulation work. Its discussion is the source of widely cited design rules of thumb.

## Main Content

> [!theorem] Caution rule (Discussion)
> Doubt an estimate of $\psi$ very close to 1 when per-visit detection is low ($<0.15$), especially with few visits ($<7$): the data cannot distinguish a genuinely absent species from one merely not detected.
^thm-occupancy-caution

**Design guidance.**
- With only two visits per site, the true occupancy should exceed 0.7 and per-visit detection should exceed 0.3, and even then precision may be low.
- More visits improve precision and (at low $p$) accuracy. Multiple searches in a single trip (e.g. two 3-minute calling surveys in one night) can substitute when travel is costly.
- If many patches must be surveyed, repeat-visit a subset to estimate $p$ (possibly as a function of site covariates) and apply it to single-visit sites.
- Think about the likely analysis when designing the survey.

**Extensions the authors foresee.**
1. *Dynamics*: combine with Pollock's robust design. Within each closed period estimate $\psi$; across periods model **colonisation and extinction** probabilities, analogous to open-population birth and death. This removes the need for $p=1$ or stationarity assumed by earlier metapopulation work (Hanski 1992, 1994; Erwin et al. 1998).
2. *Species co-occurrence*: parameterise $\psi_{AB}$ in addition to $\psi_A,\psi_B$. Parameters grow exponentially: three species need four extra ($\psi_{AB},\psi_{AC},\psi_{BC},\psi_{ABC}$); six species need 57 extra.
3. *Heterogeneity*: unmodelled site heterogeneity in $\psi$ or $p$ could be handled with the finite-mixture approach of Pledger (2000), jackknife (Burnham and Overton 1978) or coverage estimators (Chao et al. 1992).
4. *Continuous detection processes*: Poisson-family models (Boyce et al. 2001).

Software and the Maryland data were provided in ESA's Electronic Data Archive supplement (E083-041-S1).

## Examples

> [!example] PyMC sketch (untested, PyMC 5 style)
> Marginalise the binary presence $z_i$ so that gradient-based sampling works. For each site, the log-likelihood is `log(psi) + sum(logp_det)` if detected at least once, else `logaddexp(log(psi) + sum(log1m(p)), log1m(psi))`.
>
> ```python
> import pymc as pm, pytensor.tensor as pt, numpy as np
> # y: (N, T) 0/1 array, X_psi: (N, k), W_p: (N, T, m)
> with pm.Model() as occ:
>     b_psi = pm.Normal("b_psi", 0, 1.5, shape=X_psi.shape[1])
>     b_p = pm.Normal("b_p", 0, 1.5, shape=W_p.shape[2])
>     psi = pm.math.sigmoid(pt.dot(X_psi, b_psi))            # (N,)
>     p = pm.math.sigmoid(pt.dot(W_p, b_p))                  # (N, T)
>     ever = y.max(1) > 0
>     ll_det = pt.log(psi) + pt.sum(y*pt.log(p) + (1-y)*pt.log1p(-p), axis=1)
>     ll_nodet = pt.logaddexp(pt.log(psi) + pt.sum(pt.log1p(-p), axis=1),
>                             pt.log1p(-psi))
>     pm.Potential("lik", pt.sum(pt.where(ever, ll_det, ll_nodet)))
> ```
> For a missing visit, mask its term out of both sums. This is the same trick as `pymc_extras.marginalize` mentioned for E28; see [[Concept - Marginalising Latent Discrete Counts for HMC]].
^ex-occupancy-pymc-sketch

## Connections

- Visit-number and low-detection warnings anticipate the weak-identification results of N-mixture models: [[Barker 2018 - Reliability of N-Mixture Models - Overview]].
- Heterogeneity mixtures lead to latent class MSE: [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]].
- Prior choices on logit-scale coefficients: [[Prior Predictive Checking]].

## See Also

- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]
- [[Concept - Closed-Population Capture-Recapture and Otis Models]]
