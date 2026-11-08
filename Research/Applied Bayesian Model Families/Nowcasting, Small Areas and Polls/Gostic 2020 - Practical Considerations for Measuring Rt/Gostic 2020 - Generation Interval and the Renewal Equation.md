---
title: "Gostic 2020 - Generation Interval and the Renewal Equation"
tags:
  - source/ingested
  - topic/nowcasting
  - type/theorem
  - doc/paper
source: "[[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]"
source_location: "Sec. 'Generation interval', Fig 3, pp. 8-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Gostic 2020 - Practical Considerations for Measuring Rt"
doc_type: paper
depends_on:
  - "[[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]]"
used_by:
  - "[[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]]"
aliases:
  - "renewal equation"
  - "generation interval misspecification"
---

# Gostic 2020 - Generation Interval and the Renewal Equation

> [!summary]
> The renewal equation links incidence, the generation interval and $R_t$; it underlies all three estimators. The interval needed is the *intrinsic* one, which is not what contact tracing observes. Misspecifying its mean, variance or shape biases $R_t$, most when $R_t$ is far from 1.

## Overview
Epidemic form of the demographic renewal equation, in the standard discrete form (the paper's equation was lost in text extraction): $I(t)=R_t\,S(t)\sum_s w_s I(t-s)$ where $S(t)$ is the susceptible fraction and $w(\cdot)$ the intrinsic generation interval (the paper's equation was lost in text extraction; this is the standard discrete form). In the demographic analogy $w$ is fecundity by age and $S(t)$ decides whether offspring are "viable".

## Main Content

> [!definition] Intrinsic vs observed generation interval
> The intrinsic interval is the time distribution of all infectious contact events, whether or not the contacted person is susceptible. Observed intervals involve only successful (viable) transmissions, so they shorten as susceptibles are depleted and when contact tracing or isolation truncates late transmission. ^def-gi-intrinsic

> [!definition] Serial interval
> Time between symptom onset in an infector-infectee pair. It has the same mean as the generation interval but usually a larger variance and can be negative (as observed for COVID-19). ^def-serial-interval

> [!theorem] Bias from misspecified generation interval mean (Fig 3A, qualitative)
> For Cori's estimator: if the assumed mean generation interval is too long, estimated $R_t$ is pushed away from 1 (too high when $R_t>1$, too low when $R_t<1$); if too short it is pulled toward 1. The bias is smallest in absolute terms near $R_t=1$ and grows as $R_t$ moves away, so it is largest early in an epidemic. Variance and shape misspecification also bias the estimate (Fig 3B; Bettencourt-Ribeiro is the extreme case). ^thm-gi-bias

Uncertainty about $w$ (EpiEstim resampling; EpiNow2 priors) widens intervals but does not shift the centre toward the truth. Joint estimation of $R_t$ and the serial interval (EpiEstim) estimates the *observed* serial interval, not the intrinsic generation interval.

## Examples

> [!example] Direction of bias
> For exponential growth with rate $r$ and a Gamma generation interval with mean $\mu$ and standard deviation $\sigma$, the standard relation (Wallinga & Lipsitch 2007) is $R=(1+r\sigma^2/\mu)^{\mu^2/\sigma^2}$. With $r=0.1$/day, $\mu=8$, $\sigma=4$: $R=(1+0.2)^{4}=2.07$. Assuming instead $\mu=12$, $\sigma=6$ gives $(1+0.3)^{4}=2.86$, further above 1, and assuming a shorter interval pulls the estimate toward 1. ^ex-gi-bias

## Connections
Why E38 uses a fixed, externally supplied $w$: an estimated GI is weakly identified from case counts alone. Marketing analogue: a misspecified adstock decay shifts the implied ROI, with the error growing as effects get larger.

## See Also
[[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]]
