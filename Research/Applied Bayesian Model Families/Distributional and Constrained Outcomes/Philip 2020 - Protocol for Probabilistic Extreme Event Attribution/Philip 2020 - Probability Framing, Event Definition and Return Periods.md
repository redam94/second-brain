---
title: "Philip 2020 - Probability Framing, Event Definition and Return Periods"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]]"
source_location: "Sec. 1-3 (Steps 1-2), pp. 177-182"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
doc_type: paper
depends_on:
  - "[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]"
used_by:
  - "[[Philip 2020 - Extreme Value Distributions for Attribution]]"
  - "[[Philip 2020 - Trend Models and Natural Variability]]"
aliases:
  - probability ratio
  - risk ratio attribution
  - fraction of attributable risk
  - FAR
  - return period
  - storyline vs probability approach
---

# Philip 2020 - Probability Framing, Event Definition and Return Periods

> [!summary]
> Probabilistic attribution compares $p_1$, the probability of an event "as strong as or stronger than" the observed one in the current climate, with $p_0$ in a counterfactual climate without anthropogenic emissions: $PR=p_1/p_0$. Return periods are $\tau=1/p$. The event is a class defined by a one-dimensional severity variable and fixed *before* looking at the trend, so the answer is not tuned.

## Overview

Two framings: **probability/risk-based** (how has the probability of the event class changed?) and **storyline** (how did climate change alter the thermodynamic/dynamic processes of this particular event? Shepherd 2016). The authors prefer to call the former "probability-based" and reserve "risk" for impacts (hazard x exposure x vulnerability; Field et al. 2012). Lloyd and Oreskes (2018): neither is "right" or "wrong". WWA standardises the probability framing because it is automatable and actionable; the storyline approach "requires a research mindset to interpret results".

## Main Content

> [!definition] Probability ratio and intensity change
> $PR=\dfrac{p_1}{p_0}$ with $p_1=P(X\ge x_\text{ev}\mid\text{current climate})$, $p_0=P(X\ge x_\text{ev}\mid\text{counterfactual})$ - the counterfactual may be approximated by a past climate (e.g. late 19th century, often 1900 as a baseline). Equivalent framing: the change $\Delta I$ in intensity at fixed probability (return period). For decreasing tails, a shift of the tail to higher intensities is to first order the same as a shift to higher probabilities (Otto et al. 2012).
^def-pr

> [!definition] Fraction of attributable risk (FAR)
> *(Standard definition, not stated in this paper, which uses PR; Allen 2003; Stott et al. 2004.)* $\text{FAR}=1-\dfrac{p_0}{p_1}=1-\dfrac1{PR}$: the fraction of the current probability that would not exist without the forcing. Example: $PR=2.8\Rightarrow\text{FAR}\approx0.64$.
^def-far

> [!definition] Return period
> $\tau=1/p$ (years for annual maxima). Return periods of the event in the current climate and in the counterfactual are $\tau_1=1/p_1$, $\tau_0=1/p_0$; $PR=\tau_0/\tau_1$.
^def-return-period

### Framing spectrum (Sec. 1)

From inclusive (all similar extremes; coupled ocean-atmosphere or SST-forced models varying only greenhouse gases and aerosols) to specific (nudged regional models, boundary conditions fixed to the observed state). Fixing conditions can bias results (SST-forced models underestimate temperature variability, Fischer et al. 2018; selection bias if conditions were near-optimal for the extreme to occur - check a warmer climate for linearity, e.g. Meredith et al. 2015). The protocol uses only the inclusive end: coupled and SST-forced experiments.

### Step 1 - analysis trigger

Event selection must not depend on the expected outcome (events that became *less* likely are studied less often, giving a trend bias toward "more extreme" in published collections). Practical triggers: objective impact thresholds combining absolute and percentage loss (people, economic, ecosystem), plus demand-driven requests (a national weather service or NGO); beware media-driven bias to high-interest geographies. Feasibility questions: peer-reviewed methods exist? local partners? enough historical observations? can models represent the extreme? enough time/people to do all eight steps? Document why an event was or was not analysed.

### Step 2 - event definition

> [!definition] Event class
> Choose a one-dimensional severity variable and threshold set by the observed event: e.g. $T_{max}>T_0$, heat index $H>H_0$, precipitation $P>Z$ mm per $N$ days, discharge $D>D_0$. The attribution question: "how has the probability of an event above the threshold set by the current event changed due to anthropogenic emissions?"
^def-event-class

Goals: maximise the climate-change signature (fingerprinting), maximise meteorological extremity (Cattiaux and Ribes 2018), or match societal/ecosystem impact (van der Wiel et al. 2020); the last two are used. Variable: the most extreme one (record-breaking) or one close to impacts (maximum temperature, daily precipitation, heat index, runoff); attempts to attribute losses directly (Mitchell et al. 2016; Schaller et al. 2016; Frame et al. 2020) conflict with vulnerability changing faster than the hazard (Paris and Barcelona excess heat mortality more than halved after heat plans). Area: local station data for heat/cold (impacts local; coastal stations cannot be represented by climate models), national averages for power management, homogeneous boxes for drought (Ethiopia 2015 box chosen by rainfall homogeneity and topography; Kenya multiple boxes by duration). Large-area averages reduce noise and increase PR.

## Examples

> [!example] Computing PR and FAR from fitted return levels
> ```python
> from scipy import stats
> # Gumbel/GEV with location shifting with GMST anomaly T:  mu = mu0 + alpha*T
> mu0, sigma, xi, alpha = 35.0, 1.2, -0.1, 1.5          # illustrative values
> x_event, T0, T1 = 41.0, 0.0, 1.2
> def p_exceed(T):
>     c = -xi                                          # scipy's genextreme shape is -xi
>     return stats.genextreme.sf(x_event, c, loc=mu0 + alpha*T, scale=sigma)
> p0, p1 = p_exceed(T0), p_exceed(T1)
> PR, FAR = p1/p0, 1 - p0/p1
> print(1/p1, 1/p0, PR, FAR)                           # return periods, PR, FAR
> ```
^ex-pr-far

## Connections

PR/FAR parallel "relative risk" and "attributable fraction" in epidemiology and incrementality (see [[Decision Analysis]]). Statistical models: [[Philip 2020 - Extreme Value Distributions for Attribution]].

## See Also

[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
