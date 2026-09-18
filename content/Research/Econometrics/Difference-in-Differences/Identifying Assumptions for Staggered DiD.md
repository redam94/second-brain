---
title: Identifying Assumptions for Staggered DiD
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]]"
source_location: "Sec. 2.3, pp. 7-10"
date_ingested: 2026-06-17
folder: "Econometrics/Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Group-Time Average Treatment Effects]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Doubly-Robust Estimands for ATT(g,t)]]"
  - "[[Simultaneous Inference via Multiplier Bootstrap]]"
aliases:
  - parallel trends staggered
  - no-anticipation assumption
  - conditional parallel trends
  - limited treatment anticipation
---

# Identifying Assumptions for Staggered DiD

> [!summary]
> Point-identification of $ATT(g,t)$ in the Callaway–Sant'Anna framework rests on four assumptions beyond random sampling: **limited treatment anticipation** (Assumption 3, with horizon $\delta \ge 0$), one of two **conditional parallel trends** assumptions — based on a never-treated group (Assumption 4) or on not-yet-treated groups (Assumption 5) — and an **overlap/common-support** condition (Assumption 6). All allow covariate-specific trends, making them strictly weaker than randomization-based or unconditional parallel-trends assumptions used elsewhere.

## Overview

These conditions extend the canonical parallel-trends assumption to multiple groups and periods, and crucially allow it to hold only **after conditioning on covariates $X$** — important when groups differ in observables that drive untreated outcome dynamics (e.g. job-training programs where age, education, employment history differ across participants; Heckman et al. 1997). They also accommodate (bounded) **anticipation** of treatment. The choice between Assumptions 4 and 5 governs which comparison group is valid; the anticipation horizon $\delta$ governs the reference period.

## Main Content

> [!definition] Assumption 3 — Limited Treatment Anticipation
> There is a **known** $\delta \ge 0$ such that
> $$
> \mathbb{E}[Y_t(g)\mid X, G_g=1] = \mathbb{E}[Y_t(0)\mid X, G_g=1]\ \text{a.s. for all } g\in\mathcal{G},\ t < g-\delta.
> $$
> When $\delta = 0$ this is the standard **no-anticipation** condition (units do not respond before treatment starts). $\delta > 0$ permits anticipation up to $\delta$ periods (e.g. $\delta=1$ if units react one period early). Under Assumption 3, $ATT(g,t) = 0$ for all pre-treatment periods $t < g-\delta$. **The parallel-trends assumptions become stronger as $\delta$ grows** (Remark 1) — a previously-unnoticed trade-off.
> ^a3-anticipation

> [!definition] Assumption 4 — Conditional Parallel Trends (Never-Treated comparison)
> Let $\delta$ be as in Assumption 3. For each $g \in \mathcal{G}$ and $t \in \{2,\dots,\mathcal{T}\}$ with $t \ge g-\delta$,
> $$
> \mathbb{E}[Y_t(0) - Y_{t-1}(0)\mid X, G_g=1] = \mathbb{E}[Y_t(0) - Y_{t-1}(0)\mid X, C=1]\ \text{a.s.}
> $$
> Conditional on covariates, group-$g$ and the **never-treated** group ($C=1$) would have followed parallel untreated paths. Favored when a sizable never-treated group exists that is similar to the eventually-treated. Under $\delta=0$ it places **no** restriction on observed pre-treatment trends.
> ^a4-never-treated

> [!definition] Assumption 5 — Conditional Parallel Trends (Not-Yet-Treated comparison)
> Let $\delta$ be as in Assumption 3. For each $g\in\mathcal{G}$ and $(s,t)\in\{2,\dots,\mathcal{T}\}^2$ with $t \ge g-\delta$ and $t+\delta \le s < \bar g$,
> $$
> \mathbb{E}[Y_t(0) - Y_{t-1}(0)\mid X, G_g=1] = \mathbb{E}[Y_t(0)-Y_{t-1}(0)\mid X, D_s=0, G_g=0]\ \text{a.s.}
> $$
> Uses groups **not-yet-treated by time $t+\delta$** as comparison. Favored when no/too-small never-treated group exists, as it exploits more comparison units (more informative inference). Drawback: unlike Assumption 4 it **does** restrict pre-treatment trends, which can fail when early periods experienced different shocks than later ones (Marcus & Sant'Anna 2020). Practitioners uncomfortable using never-treated units (who may behave differently) can drop them and proceed under Assumption 5 (Remark 2).
> ^a5-not-yet-treated

> [!definition] Assumption 6 — Overlap (common support)
> For each $t \in \{2,\dots,\mathcal{T}\}$, $g \in \mathcal{G}$, there exists $\varepsilon > 0$ with
> $$
> P(G_g = 1) > \varepsilon \quad\text{and}\quad p_{g,t}(X) < 1 - \varepsilon\ \text{a.s.}
> $$
> A positive fraction starts treatment in $g$, and the generalized propensity score is uniformly bounded away from one. Rules out "irregular identification" (Khan & Tamer 2010). Extends the overlap conditions of Heckman et al., Abadie (2005), and Sant'Anna & Zhao (2020).
> ^a6-overlap

**Conditional vs. unconditional.** The *unconditional* versions of Assumptions 4–5 are still **weaker** than the parallel-trends conditions in de Chaisemartin & D'Haultfœuille (2020) and Sun & Abraham (2020), and weaker than the randomization-of-adoption-date assumption in Athey & Imbens (2018). Allowing conditioning on $X$ permits **covariate-specific trends**; ignoring them when present biases unconditional DiD. Only **pre-treatment** covariates may be used — post-treatment covariates can be affected by treatment (Wooldridge 2005b).

> [!warning] Do not pre-test to pick the assumption
> It is tempting to use statistical pre-tests to choose between parallel-trends versions, but Roth (2020) shows this distorts inference. The authors recommend choosing based on the application's context, not data-driven tests (Sec. 2.3, fn. 8).
> ^no-pretesting

## Examples

> [!example] Minimum wage: covariates that make parallel trends plausible
> County characteristics used to justify **conditional** parallel trends: census region, county population, median income, fraction white, fraction with HS education, poverty rate. Treated counties differ markedly (much less likely Southern; population ~94k vs ~53k; 89% vs 83% white) — so unconditional parallel trends is suspect and conditioning is warranted. Sant'Anna & Song (2019) propensity-score specification tests fail to reject correct specification.
> ^min-wage-assumptions

## Connections

- Conditions for the identification results in [[Doubly-Robust Estimands for ATT(g,t)]].
- Apply to the target defined in [[Group-Time Average Treatment Effects]].
- Visualized as a conditioning structure in [[Directed Acyclic Graphs]].
- Anticipation horizon $\delta$ pins the reference period $g-\delta-1$ used by the estimands.

## See Also

- [[The Experimental Ideal]] — randomization as the strongest (and stronger) benchmark
- [[Synthetic Control]] — alternative when parallel trends is implausible
- de Chaisemartin & D'Haultfœuille (2020); Sun & Abraham (2020) — stronger parallel-trends variants
- [[Bayesian Difference in Differences]] — Bayesian approach to DiD; same identifying assumptions apply
- [[Conditional Independence Assumption]] — the overlap condition (Assumption 6) is the DiD analog of the CIA common-support requirement
- [[Regression Discontinuity Designs]] — another quasi-experimental alternative that does not rely on parallel trends
