---
title: "Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]"
source_location: "Sec. 'Delays to observation' and 'Right truncation', Figs 4-5, S3, pp. 10-14"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Gostic 2020 - Practical Considerations for Measuring Rt"
doc_type: paper
depends_on:
  - "[[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]]"
  - "[[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]]"
used_by:
  - "[[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]]"
aliases:
  - "right truncation bias in Rt"
  - "deconvolution of infection curve"
---

# Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias

> [!summary]
> Observations at time $t$ reflect infections at $t-d$, so $R_t$ needs (1) inferring the infection series from delayed observations and (2) adjusting for right truncation of recent data. Backward convolution blurs and shifting lags; deconvolution or a joint forward observation model is best; ignoring truncation produces a spurious "epidemic is ending".

## Overview
If $d$ is the delay from infection to observation, observations at time $t$ inform $R_{t-d}$ (Fig 4). Sampling a delay and subtracting it from each observation time equals convolving with the *reversed* delay distribution.

## Main Content

> [!definition] Forward delay convolution
> Observed counts $O_t=\sum_{d} f_d\,I_{t-d}$, with $f_d$ the infection-to-observation delay pmf. The forward kernel spreads infections incident on one day across many days of observation; recovering $I$ needs deconvolution. ^def-forward-delay

> [!theorem] Why backward convolution fails (S3 Fig)
> For 1,000 people infected at the same time, observation time is $t_{\text{obs}}=t_{\text{inf}}+u$ with $u$ random: a forward convolution. Subtracting a sampled $u$ repeats the convolution backward, so variance becomes $2\text{Var}(u)$ rather than 0. Shifting by $E[u]$ adds no variance (preferred if the mean is exact) but does not remove the blur. ^thm-backward-conv

| Approach | Behaviour (Fig 5, synthetic) |
|---|---|
| Shift by mean delay | Moderate accuracy if delay short and mean known; leaves a gap of $m$ days at the end; ignores variability |
| Backward convolution (sample and subtract) | Least accurate: over-smooths peaks and valleys, delays detection of $R_t$ changes, strongly under-counts the last days |
| Deconvolution (e.g. `backprojNP`, ML) | Recovers peaks/valleys best; sensitive to delay misspecification and stopping rule; hard to get uncertainty; the only one adjusting for truncation |
| Joint model with forward delays (EpiNow2, latent infections) | Propagates uncertainty; can pool cases, hospitalisations and deaths |

Errors grow with delay variance (deaths worse than onset). Observations nearer infection (symptom onset) allow closer-to-real-time $R_t$.

> [!definition] Right truncation (epidemic series)
> Recent infections are missing because not yet reported, so the latest counts look artificially low. Options: drop the last few days or flag them; or adjust using past reporting delays (nowcasting, [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]]). Both steps interact: errors in one amplify the other. ^def-truncation-bias

## Examples

> [!example] Spurious wave end
> A growing epidemic whose latest 4 days have only 40-80% reported: unadjusted counts flatten or fall, Cori reports $R_t<1$ on the final days. Correct with $\hat I_t=O_t/F_{T-t}$ where $F_k=\sum_{d\le k}f_d$ is the reporting CDF (chain-ladder scale-up), or a Bayesian nowcast. E38 in the PyMC set reproduces exactly this failure on German hospitalisation data. ^ex-spurious-end

```python
import numpy as np
f=np.array([.2,.3,.25,.15,.1]); F=f.cumsum()      # reporting pmf and CDF by lag
T=20; true=100*1.1**np.arange(T)                  # growing true infections
# fraction observed at time T for onset day t is F[min(T-1-t,4)]
frac=np.array([F[min(T-1-t,4)] for t in range(T)])
seen=true*frac
print(np.round(seen[-6:]/true[-6:],2))             # truncated tail looks like a decline
print(np.round((seen/frac)[-6:]/true[-6:],2))      # adjusted: ratio 1
```

## Connections
Forms the pipeline: nowcast incidence ([[McGough 2020 - NobBS Model and Priors]]) -> renewal $R_t$ ([[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]]). A latent-infection model with forward delays is a state-space model ([[Linear-Gaussian State-Space Models]]).

## See Also
[[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]]
