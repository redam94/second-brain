---
title: Group-Time Average Treatment Effects
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]]"
source_location: "Sec. 2.1-2.2, pp. 5-7"
date_ingested: 2026-06-17
folder: "Econometrics/Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Difference-in-Differences with Multiple Time Periods - Overview]]"
  - "[[Estimands in Longitudinal Research]]"
used_by:
  - "[[Identifying Assumptions for Staggered DiD]]"
  - "[[Doubly-Robust Estimands for ATT(g,t)]]"
  - "[[Aggregating Group-Time Effects]]"
aliases:
  - ATT(g,t)
  - group-time ATT
  - group-time average treatment effect
---

# Group-Time Average Treatment Effects

> [!summary]
> The group-time average treatment effect $ATT(g,t) = \mathbb{E}[Y_t(g) - Y_t(0) \mid G_g = 1]$ is the disaggregated building block of the Callaway–Sant'Anna framework: the average effect at calendar time $t$ for the cohort first treated in period $g$. It imposes **no** restriction on treatment-effect heterogeneity across groups or over time, so it (unlike a single TWFE coefficient) always carries a well-defined causal interpretation and can be flexibly aggregated to answer many policy questions.

## Overview

In the canonical two-period setup the target is $ATT = \mathbb{E}[Y_2(2) - Y_2(0) \mid G_2 = 1]$. With multiple periods and staggered adoption there is no single "treated" timing, so the paper indexes effects by **both** the cohort $g$ (when treatment starts) and the calendar period $t$ (when we measure). Fixing $g$ and varying $t$ traces effect **dynamics** for that cohort; varying $g$ compares cohorts. Because $ATT(g,t)$ is defined directly on potential outcomes — not as a regression coefficient — it sidesteps the TWFE negative-weighting problem entirely (see [[Difference-in-Differences with Multiple Time Periods - Overview]]).

## Main Content

> [!definition] Setup and notation
> - $\mathcal{T}$ periods, $t = 1,\dots,\mathcal{T}$. $D_{i,t} \in \{0,1\}$ = treatment status of unit $i$ at $t$.
> - **Group** $G$ = the first period a unit is treated; $G = \infty$ if never treated. $G_{i,g} = \mathbf{1}\{G_i = g\}$, and $C_i = \mathbf{1}\{G_i = \infty\} = 1 - D_{i,\mathcal{T}}$ flags the **never-treated**. $\bar g = \max_i G_i$ is the last-treated group.
> - $\mathcal{G} = \text{supp}(G)\setminus\{\bar g\} \subseteq \{2,\dots,\mathcal{T}\}$ is the set of identifiable groups (drops $\bar g$ when no never-treated group exists, since it has no valid comparison). $\mathcal{X} = \text{supp}(X) \subseteq \mathbb{R}^k$ is the support of pre-treatment covariates.
> - **Generalized propensity score** $p_g(X) = P(G_g = 1 \mid X, G_g + C = 1)$: probability of first treatment at $g$, conditional on $X$ and on being either in group $g$ or never-treated. (More generally $p_{g,s}(X)$ conditions on being in $g$ or "not-yet-treated by $s$".)
> ^setup

> [!definition] Potential outcomes (multi-stage adoption)
> Combining Robins' dynamic potential outcomes with Heckman et al.'s multi-stage adoption: $Y_{i,t}(0)$ = untreated potential outcome (never participates through $\mathcal{T}$); $Y_{i,t}(g)$ = potential outcome if first treated in period $g$. Observed and potential outcomes link via
> $$ Y_{i,t} = Y_{i,t}(0) + \sum_{g=2}^{\mathcal{T}} \big(Y_{i,t}(g) - Y_{i,t}(0)\big)\cdot G_{i,g}. \tag{2.1}$$
> We observe exactly one potential-outcome path per unit. **Assumption 1 (Irreversibility):** $D_1 = 0$ a.s., and $D_{t-1}=1 \Rightarrow D_t = 1$ a.s. (staggered adoption — units never "forget" treatment). **Assumption 2 (Random sampling):** the panel $\{Y_{i,1},\dots,Y_{i,\mathcal{T}}, X_i, D_{i,1},\dots,D_{i,\mathcal{T}}\}_{i=1}^n$ is iid (results extend to repeated cross-sections, Appendix B). The unit index $i$ is suppressed henceforth.
> ^potential-outcomes

> [!definition] The group-time average treatment effect
> The main building block is
> $$ ATT(g,t) = \mathbb{E}[Y_t(g) - Y_t(0) \mid G_g = 1], $$
> the average treatment effect at period $t$ among units first treated in period $g$. It places **no restriction** on (a) heterogeneity across groups, (b) the timing $g$, or (c) how effects evolve over $t$. The family $\{ATT(g,t)\}$ can therefore be read directly for heterogeneity or aggregated to answer: *(a)* overall effect of participating by $\mathcal{T}$; *(b)* across-group heterogeneity; *(c)* effects by length of exposure $e = t-g$ (event study); *(d)* how effects evolve over calendar time. In the 2x2 case $ATT(g,t)$ collapses to the canonical ATT.
> ^attgt-def

**Why this avoids TWFE bias.** A single $\beta$ in a TWFE regression must average all cohort-period effects with estimator-determined (possibly negative) weights. By contrast, each $ATT(g,t)$ is its own estimand; aggregation weights $w(g,t)$ are then chosen *transparently by the researcher* to match the question (see [[Aggregating Group-Time Effects]]), and the simple combinations the paper proposes use non-negative weights — ruling out the "positive-for-all-but-negative-estimate" pathology.

## Examples

> [!example] Minimum wage: reading $ATT(g,t)$ directly
> With $\mathcal{T}$ running 2001-2007 and groups $g \in \{2004, 2006, 2007\}$, the cohort first raising its minimum wage in 2004 (Illinois) has $ATT(2004, 2004) \approx -3.4\%$, $ATT(2004,2005) \approx -7.1\%$, $ATT(2004,2006)\approx -12.5\%$, $ATT(2004,2007)\approx -13.6\%$ — i.e. teen employment falls more the longer the higher wage is in place. Each number is interpretable on its own without any homogeneity assumption.
> ^min-wage-attgt

## Connections

- Identified under conditions in [[Identifying Assumptions for Staggered DiD]].
- Estimated via the formulas in [[Doubly-Robust Estimands for ATT(g,t)]].
- Combined into summaries in [[Aggregating Group-Time Effects]].
- Inference on the whole family in [[Simultaneous Inference via Multiplier Bootstrap]].

## See Also

- [[Estimands in Longitudinal Research]] — potential-outcome estimands across periods
- [[Difference in differences]] — the canonical 2x2 ATT this generalizes
- [[Mostly Harmless Econometrics]] — DiD chapter
