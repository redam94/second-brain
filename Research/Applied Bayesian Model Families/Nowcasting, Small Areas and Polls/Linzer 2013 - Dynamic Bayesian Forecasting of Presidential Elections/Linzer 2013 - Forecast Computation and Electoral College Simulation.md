---
title: "Linzer 2013 - Forecast Computation and Electoral College Simulation"
tags:
  - source/ingested
  - topic/nowcasting
  - type/theorem
  - doc/paper
source: "[[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]"
source_location: "Sec. 3 (last paragraphs), p. 128"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections"
doc_type: paper
depends_on:
  - "[[Linzer 2013 - Reverse Random-Walk Model and Priors]]"
used_by:
  - "[[Linzer 2013 - 2008 Application and Results]]"
aliases:
  - "electoral college simulation"
  - "state win probability"
---

# Linzer 2013 - Forecast Computation and Electoral College Simulation

> [!summary]
> State win probabilities are posterior proportions of draws with $\pi_{iJ}>0.5$. The presidential win probability comes from summing electoral votes within each joint posterior draw, so correlation across states is preserved automatically, then counting draws with at least 270 of 538 votes.

## Overview
All outputs are by-products of the MCMC: daily opinion $\pi_{ij}$, national effects $\delta_j$, filtered state trends $\beta_{ij}$, and Election-Day forecasts $\pi_{iJ}$, each with credible intervals from the spread of posterior draws.

## Main Content

> [!definition] State win probability
> $\Pr(\text{Dem wins state }i)=\frac1M\sum_{m=1}^{M}\mathbf 1\{\pi_{iJ}^{(m)}>0.5\}$. ^def-state-win

> [!definition] Electoral College probability
> For draw $m$: $EV^{(m)}=3+\sum_i EV_i\,\mathbf 1\{\pi_{iJ}^{(m)}>0.5\}$ (3 for DC, reliably Democratic). $\Pr(\text{Dem presidency})=\frac1M\sum_m\mathbf 1\{EV^{(m)}\ge270\}$ of 538. Using joint draws avoids the independence assumption of per-state-probability convolution (Kaplan & Barnett 2003). ^def-ec-prob

> [!definition] Swing state
> State with posterior probability of a Democratic win between 10% and 90%. ^def-swing

## Examples

> [!example] Why joint draws matter
> Two states of 10 and 6 electoral votes, each with $\Pr(\text{win})=0.7$. Under independence, $\Pr(\text{both})=0.49$ and $\Pr(\text{neither})=0.09$. If the draws are positively correlated (a national swing), $\Pr(\text{both})$ and $\Pr(\text{neither})$ both rise and the middle outcomes fall, so electoral-vote tails are heavier than a product-of-marginals convolution implies. Computing the tally within each posterior draw captures this with no extra modelling. ^ex-ec-toy

```python
import numpy as np
def ec_prob(pi_draws, ev, base=3, need=270):
    wins=(pi_draws>0.5)                 # M x S
    tally=base+wins@ev
    return wins.mean(0), (tally>=need).mean(), np.percentile(tally,[2.5,97.5])
```

## Connections
The same joint-draw construction supports E40's tipping-point analysis, and E95's reweighting of the stored draws (see the concept note).

## See Also
[[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]]
