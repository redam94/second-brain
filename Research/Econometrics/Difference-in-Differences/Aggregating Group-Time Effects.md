---
title: Aggregating Group-Time Effects
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]]"
source_location: "Sec. 3, pp. 13-19 (Table 1, p. 15)"
date_ingested: 2026-06-17
folder: "Econometrics/Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Group-Time Average Treatment Effects]]"
  - "[[Doubly-Robust Estimands for ATT(g,t)]]"
used_by:
  - "[[Simultaneous Inference via Multiplier Bootstrap]]"
aliases:
  - event-study aggregation
  - dynamic treatment effects DiD
  - overall ATT aggregation
  - calendar-time effects
---

# Aggregating Group-Time Effects

> [!summary]
> Once the family $\{ATT(g,t)\}$ is identified, the Callaway–Sant'Anna framework aggregates it into interpretable summary parameters of the form $\theta = \sum_g\sum_t w(g,t)\,ATT(g,t)$ with researcher-chosen, non-negative weights. The main schemes are **event-study/dynamic** (effects by length of exposure $e=t-g$), **group-specific**, **calendar-time**, and **overall** ATT. Unlike TWFE coefficients, these use transparent positive weights and so cannot be negative when all underlying effects are positive; the "best" scheme is application-specific.

## Overview

With many groups and periods, the raw $ATT(g,t)$'s are hard to digest. The general aggregation is
$$ \theta = \sum_{g\in\mathcal{G}}\sum_{t=2}^{\mathcal{T}} w(g,t)\,ATT(g,t), \tag{3.1}$$
where $w(g,t)$ are known/estimable weights chosen to answer a specific question. The section (which assumes $\delta=0$, no anticipation, and a never-treated group available for clarity) contrasts these with the static/dynamic TWFE specs whose weights can be negative (Goodman-Bacon 2019; even leads-and-lags event-study TWFE is contaminated per Sun & Abraham 2020). Let **event time** $e = t - g$ = periods since adoption.

## Main Content

> [!definition] Event-study / dynamic aggregation (by length of exposure)
> Average effect $e$ periods after adoption, across cohorts observed at that exposure:
> $$ \theta_{es}(e) = \sum_{g\in\mathcal{G}} \mathbf{1}\{g+e\le\mathcal{T}\}\,P(G=g\mid G+e\le\mathcal{T})\,ATT(g,g+e). \tag{3.4}$$
> $e=0$ is the "on-impact" effect. This is the proper target for event-study plots, **without** the dynamic-TWFE pitfalls of $\beta_e$. **Caveat:** comparing $\theta_{es}(e)$ across $e$ mixes the true dynamic effect with two undesirable terms from **compositional change** — different cohorts enter at different $e$ (decomposition 3.5). The fix is the **balanced** version
> $$ \theta_{es}^{bal}(e;e') = \sum_{g\in\mathcal{G}} \mathbf{1}\{g+e'\le\mathcal{T}\}\,ATT(g,g+e)\,P(G=g\mid G+e'\le\mathcal{T}), \tag{3.6}$$
> which fixes the set of cohorts observed for at least $e'$ periods, eliminating composition effects at the cost of fewer groups (a robustness/efficiency trade-off). Resembles the common practice of only reporting event-study coefficients for non-compositionally-changing periods (Remark 8).
> ^event-study

> [!definition] Group-specific aggregation
> Average post-treatment effect for cohort $\tilde g$ across all its post periods:
> $$ \theta_{sel}(\tilde g) = \frac{1}{\mathcal{T} - \tilde g + 1}\sum_{t=\tilde g}^{\mathcal{T}} ATT(\tilde g, t). \tag{3.7}$$
> Answers: do earlier-treated groups have larger/smaller effects than later-treated ones? Building block for the recommended overall parameter.
> ^group-specific

> [!definition] Calendar-time aggregation
> Average effect in calendar period $t$ across cohorts already treated by $t$:
> $$ \theta_c(\tilde t) = \sum_{g\in\mathcal{G}} \mathbf{1}\{\tilde t\ge g\}\,P(G=g\mid G\le\tilde t)\,ATT(g,\tilde t). \tag{3.8}$$
> Cumulative version $\theta_c^{cumu}(\tilde t) = \sum_{t=2}^{\tilde t}\theta_c(t)$ (3.9) gives the cumulative effect among units treated by $\tilde t$ — useful for business-cycle heterogeneity or e.g. cumulative COVID cases averted by shelter-in-place.
> ^calendar-time

> [!definition] Overall treatment-effect parameters
> **Simple weighted average** (by group size):
> $$ \theta_W^O = \frac{1}{\kappa}\sum_{g\in\mathcal{G}}\sum_{t=2}^{\mathcal{T}} \mathbf{1}\{t\ge g\}\,ATT(g,t)\,P(G=g\mid G\le\mathcal{T}), \tag{3.10}$$
> $\kappa = \sum_g\sum_t \mathbf{1}\{t\ge g\}P(G=g\mid G\le\mathcal{T})$. Positive weights → cannot be negative when all effects positive (unlike TWFE $\beta$). Drawback: over-weights long-treated groups. **Recommended overall ATT** averages group effects first, then over groups:
> $$ \theta_{sel}^O = \sum_{g\in\mathcal{G}} \theta_{sel}(g)\,P(G=g\mid G\le\mathcal{T}). \tag{3.11}$$
> $\theta_{sel}^O$ is the average effect experienced by all units that ever participated — the natural multi-period analogue of the canonical 2x2 ATT. Overall event-study/calendar versions: $\theta_{es}^O = \frac{1}{\mathcal{T}-1}\sum_{e=0}^{\mathcal{T}-2}\theta_{es}(e)$ and $\theta_c^O = \frac{1}{\mathcal{T}-1}\sum_{t=2}^{\mathcal{T}}\theta_c(t)$ (3.12); balanced local version $\theta_{es}^{O,bal}(e') = \frac{1}{e'+1}\sum_{e=0}^{e'}\theta_{es}^{bal}(e,e')$ (3.13).
> ^overall

> [!note] Weight table and equality condition
> Table 1 (p. 15) gives the explicit $w(g,t)$ for $\theta_{es},\theta_{es}^{bal},\theta_{sel},\theta_c,\theta_c^{cumu},\theta_W^O,\theta_{sel}^O$ — all non-negative; for $\theta_c^{cumu}$ they sum to $\tilde t -1$ (it is cumulative), otherwise to one. **In general none of the overall parameters equal each other** except in the special case where $ATT(g,t)$ is constant across all groups and times — in which case all of them (including TWFE $\beta$) coincide.
> ^weight-table

## Examples

> [!example] Minimum wage: aggregations side-by-side (Table 3)
> Under **conditional** parallel trends (DR), all clustered at the county level:
> - **Overall** $\theta_{sel}^O \approx -3.1\%$ (vs. TWFE post-dummy -0.8%, statistically insignificant).
> - **Group-specific** $\theta_{sel}$: $g{=}2004$ ≈ -4.4%, $g{=}2006$ ≈ -2.9%, $g{=}2007$ ≈ -2.9%.
> - **Event study** $\theta_{es}(e)$: $e{=}0$ ≈ -2.4%, $e{=}1$ ≈ -4.1%, $e{=}2$ ≈ -5.0%, $e{=}3$ ≈ -7.1% — effects **grow with exposure** (a dynamic effect TWFE misses).
> - **Calendar-time** $\theta_c$: t=2004 ≈ -3.0%, t=2005 ≈ -2.5%, t=2006 ≈ -3.0%, t=2007 ≈ -4.9%.
> - **Balanced event study** (groups 2004 & 2006 only): $e{=}0$ ≈ -1.6%, $e{=}1$ ≈ -4.1%.
> ^min-wage-aggregation

## Connections

- Aggregates the building blocks from [[Group-Time Average Treatment Effects]], identified via [[Doubly-Robust Estimands for ATT(g,t)]].
- Inference on these $\theta$'s (plug-in + multiplier bootstrap) in [[Simultaneous Inference via Multiplier Bootstrap]].
- Directly addresses the negative-weighting pitfall flagged in [[Difference-in-Differences with Multiple Time Periods - Overview]].

## See Also

- Goodman-Bacon (2019) — TWFE decomposition motivating positive-weight aggregation
- Sun & Abraham (2020) — cohort-specific (interaction-weighted) event study
- [[Estimands in Longitudinal Research]] — choosing the target estimand
