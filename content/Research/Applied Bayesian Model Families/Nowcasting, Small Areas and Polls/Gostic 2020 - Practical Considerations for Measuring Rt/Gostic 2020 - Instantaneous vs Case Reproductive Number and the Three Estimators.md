---
title: "Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]"
source_location: "Introduction and Sec. 'Estimators', Figs 1-2, pp. 2-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Gostic 2020 - Practical Considerations for Measuring Rt"
doc_type: paper
depends_on:
  - "[[Gostic 2020 - Generation Interval and the Renewal Equation]]"
used_by:
  - "[[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]]"
aliases:
  - "Cori estimator"
  - "instantaneous reproductive number"
  - "Wallinga-Teunis estimator"
---

# Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators

> [!summary]
> $R_t$ has two definitions. The instantaneous number uses only data before $t$ and suits real-time work; the case (cohort) number looks forward and suits retrospective analysis. Cori et al. estimates the former with a Gamma posterior; Wallinga-Teunis estimates the latter; Bettencourt-Ribeiro approximates the former via the growth rate but assumes an exponential generation interval.

## Overview
Synthetic data came from a deterministic or stochastic SEIR model with $R_0=2.0$, then 0.8, then 1.15 (intervention and partial relaxation), the series truncated at $t=150$ to mimic real time. Generation interval: Gamma(shape 2, rate 1/4 per day, i.e. sum of two exponential stages each with mean 4 days; mean 8 days; the extraction of the PDF reads "rate of 14"). All infections were assumed observed with no delay, a 1-day smoothing window, and no parameter uncertainty. Cori and Wallinga-Teunis were run with `EpiEstim`; Bettencourt-Ribeiro was recoded in Stan.

## Main Content

> [!definition] Instantaneous reproductive number
> The expected number of new infections at $t$ divided by the total infectiousness of the infected population at $t$. For a renewal process with incidence $I_t$ and intrinsic generation interval $w_s$ (probability that $s$ days separate infection of an index case and its secondary case):
> $$
> \mathbb E[I_t]=R_t\,\Lambda_t,\qquad \Lambda_t=\sum_{s\ge1} w_s I_{t-s}.
> $$

^def-rinst

> [!definition] Case (cohort) reproductive number
> The expected number of secondary infections that an individual infected (or symptomatic) at $t$ will *eventually* cause. It is a convolution of the instantaneous number with the generation interval: $R^{\text{case}}_t=\sum_s w_s R^{\text{inst}}_{t+s}$, so it depends on the future. ^def-rcase

> [!theorem] Cori et al. estimator (posterior)
> With a Gamma$(a,\text{scale }b)$ prior on $R_t$ and a sliding window of $\tau$ days ending at $t$, the posterior is
> $$
> R_t\mid I_{1:t}\sim\text{Gamma}\Big(a+\sum_{s=t-\tau+1}^{t}I_s,\ \text{rate }\tfrac1b+\sum_{s=t-\tau+1}^{t}\Lambda_s\Big).
> $$
> Only the generation interval $w$ is assumed. (Posterior form is from Cori et al. 2013, not reproduced in the Gostic text; stated here as the standard result, flagged as from memory.) ^thm-cori-posterior

> [!definition] Wallinga-Teunis
> The probability that case $j$ infected case $i$ is $p_{ij}=w(t_i-t_j)/\sum_{k\ne i}w(t_i-t_k)$; case $j$'s individual reproductive number is $R_j=\sum_i p_{ij}$; the case reproductive number at $t$ is the mean of $R_j$ over individuals infected at $t$. ^def-wt

> [!definition] Bettencourt-Ribeiro
> Approximates $R_t$ from the exponential growth rate $r$ and mean generation time $g$ via an SIR-based relation (Gostic's Eq. 3, $R_t \approx 1+ r_t g$ in the exponential-GI case), with $R_t$ a Gaussian process for efficient Bayesian inference. It implicitly assumes an exponential generation interval, so with a Gamma(2) SEIR it underestimates $R_t$ when the truth is well above 1. ^def-br

**Findings (Fig 2, S1-S2).**
- Cori tracks the instantaneous $R_t$ accurately, including abrupt changes and when the series ends while $R_t$ is rising or falling.
- Wallinga-Teunis leads the instantaneous $R_t$ (by roughly 8 days, the mean generation interval) and without right-truncation adjustment underestimates $R_t$ at the end of the series because unobserved future infections are missing terms in the weighted sum. Shifting it back by the mean generation interval roughly recovers the instantaneous curve.
- Cori overestimates early because infections before the first observed date are missing from the denominator.
- Bettencourt-Ribeiro: biased when the true $R_t$ is far from 1; but the GP penalty gives smoother estimates (useful when reporting noise dominates).

## Examples

> [!example] Cori posterior in numbers
> Daily incidence last 3 days $I=(40,50,60)$, $\Lambda=(38,45,52)$, prior Gamma(1, scale 5). Posterior shape $=1+150=151$, rate $=0.2+135=135.2$; mean $R_t\approx1.117$, sd $\approx \sqrt{151}/135.2\approx0.091$. ^ex-cori

```python
import numpy as np
from scipy import stats
def cori(I, w, tau=7, a=1, b=5):
    I=np.asarray(I,float); lam=np.array([sum(w[s-1]*I[t-s] for s in range(1,min(len(w),t)+1)) for t in range(len(I))])
    t=len(I)-1; sl=slice(t-tau+1,t+1)
    return stats.gamma(a+I[sl].sum(), scale=1/(1/b+lam[sl].sum()))
w=stats.gamma(2,scale=4).pdf(np.arange(1,21)); w/=w.sum()
print(cori(np.exp(0.05*np.arange(60)),w).mean())   # growing epidemic -> R>1
```

## Connections
Next: [[Gostic 2020 - Generation Interval and the Renewal Equation]]. PyMC form for E38: $R_t$ as a latent random walk with `pm.Poisson("I", mu=R_t*Lam_t)`, where $\Lambda_t$ is a triangular convolution of the nowcast incidence (untested sketch).

## See Also
[[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]] · [[Linear-Gaussian State-Space Models]]
