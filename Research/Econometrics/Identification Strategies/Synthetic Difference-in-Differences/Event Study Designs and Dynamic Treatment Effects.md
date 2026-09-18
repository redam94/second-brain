---
title: Event Study Designs and Dynamic Treatment Effects
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/panel-data
  - topic/difference-in-differences
  - topic/event-study
  - type/concept
  - doc/paper
source:
  - "[[raw/Roth 2023 - Whats Trending in Difference-in-Differences.pdf]]"
  - "[[raw/Rambachan Roth 2023 - A More Credible Approach to Parallel Trends.pdf]]"
  - "[[raw/Roth 2022 - Pretest with Caution.pdf]]"
source_location: "Roth, Sant'Anna, Bilinski & Poe 2023 §3.1-3.3 (eqs. 4-9), §4.3 (eq. 16), §4.6; Rambachan & Roth 2023 §2.1-2.2 (eqs. 1-3), pp. 2559-2561; Roth 2022 §II.A-B (eq. 3), pp. 314-316; Arkhangelsky et al. 2021 p. 9"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Differences-in-Differences]]"
  - "[[Fixed-Effects Model]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Identifying Assumptions for Staggered DiD]]"
used_by:
  - "[[Pre-Trend Testing and Its Pitfalls]]"
  - "[[Honest DiD - Sensitivity to Parallel Trends Violations]]"
aliases:
  - Event Study
  - Event-Study Design
  - Event-Study Plot
  - Dynamic TWFE Specification
  - Leads and Lags Regression
  - Relative-Time Indicators
---

# Event Study Designs and Dynamic Treatment Effects

> [!summary]
> An **event study** re-indexes a panel by time *relative to treatment* and estimates one coefficient per relative period: $Y_{it} = \alpha_i + \phi_t + \sum_{r\ne r_0}\mathbf 1[R_{it}=r]\beta_r + \epsilon_{it}$, with one pre-period $r_0$ normalised to zero. Post-treatment coefficients trace the **dynamic treatment effect** path; pre-treatment coefficients are **placebo** estimates that should be zero under parallel trends and no anticipation. The unifying algebra (Rambachan & Roth 2023; Roth 2022) is $\beta = \tau + \delta$: coefficient = causal effect + differential trend, with $\tau_{pre}=0$ so that $\beta_{pre}=\delta_{pre}$ is identified. With a common treatment date the dynamic TWFE regression is exactly a sequence of 2×2 DiDs against the reference period. With **staggered** timing and heterogeneous effects it is contaminated (Sun & Abraham 2021), and event-study coefficients should instead be built by aggregating [[Group-Time Average Treatment Effects|$ATT(g,t)$]] by event time.

## Overview

The static DiD coefficient answers "what was the average effect over the post period?" Three questions force a dynamic view: Does the effect build, persist or decay? (For marketing: what is the carryover profile?) Was there anticipation? And — the usual reason — do the groups look comparable *before* treatment? The event-study plot answers all three in one figure, which is why Roth (2022) found 70 papers in three AEA journals (2014–mid-2018) featuring one, and why Roth et al. (2023, §4.6) "encourage researchers to continue to plot 'event-study plots'" even while cautioning about how they are read.

## Main Content

> [!definition] Dynamic TWFE / event-study specification ^def-event-study-spec
> Let $G_i$ be unit $i$'s first treated period ($G_i=\infty$ if never treated) and define relative time $R_{it} = t - G_i + 1$, so $R_{it}=1$ in the first treated period (Roth et al. eq. 7/16):
> $$
> Y_{it} = \alpha_i + \phi_t + \sum_{r\ne 0}\mathbf 1[R_{it}=r]\,\beta_r + \epsilon_{it}
> $$
> The omitted category ($r=0$ here, the last pre-period; equivalently "$\ell=-1$" when the first treated period is labelled $\ell=0$) is the **normalisation**: every $\beta_r$ is measured *relative to* that period. For a common treatment date this is $Y_{it} = \lambda_i + \phi_t + \sum_{s\ne0}\beta_s\,\mathbf 1[t=s]\,D_i + \epsilon_{it}$ (Rambachan & Roth eq. 2). $\hat\beta_{post} = (\hat\beta_1,\dots,\hat\beta_{\bar T})$ are the dynamic effects; $\hat\beta_{pre} = (\hat\beta_{-\underline T},\dots,\hat\beta_{-1})$ are the leads.

> [!theorem] Non-staggered case: event-study coefficients are 2×2 DiDs ^thm-event-study-2x2
> With a balanced panel and a single treatment date, the OLS coefficients are numerically
> $$
> \hat\beta_s = (\bar Y_{s,1}-\bar Y_{s,0}) - (\bar Y_{0,1}-\bar Y_{0,0})
> $$
> where $\bar Y_{s,d}$ is the period-$s$ mean for group $D_i=d$ (Rambachan & Roth Example 1). In error form, $\hat\beta_s = \beta_s + \Delta\bar\epsilon_s - \Delta\bar\epsilon_0$ (Roth 2022, p. 316). Consequence: **every coefficient shares the reference-period noise $\Delta\bar\epsilon_0$**, so under homoskedasticity $\operatorname{Var}[\hat\beta_k]=\sigma^2$ and $\operatorname{Cov}(\hat\beta_k,\hat\beta_j)=\sigma^2/2$ — event-study coefficients are strongly positively correlated by construction. This correlation is what drives pre-test bias ([[Pre-Trend Testing and Its Pitfalls]]), and it means pointwise error bars overstate how "independently" each lead supports parallel trends.

> [!definition] Causal decomposition $\beta = \tau + \delta$ ^def-event-study-decomposition
> Under **no anticipation** ($Y_{it}(1)=Y_{it}(0)$ for all pre-treatment $t$),
> $$
> \beta_s = \underbrace{\mathbb E[Y_{is}(1)-Y_{is}(0)\mid D_i=1]}_{\tau_{ATT,s}} + \underbrace{\mathbb E[Y_{is}(0)-Y_{i0}(0)\mid D_i=1] - \mathbb E[Y_{is}(0)-Y_{i0}(0)\mid D_i=0]}_{\delta_s\ \text{(differential trend)}}
> $$
> and stacking,
> $$
> \beta = \begin{pmatrix}\tau_{pre}\\ \tau_{post}\end{pmatrix} + \begin{pmatrix}\delta_{pre}\\ \delta_{post}\end{pmatrix}, \qquad \tau_{pre}=0
> $$
> (Rambachan & Roth Assumption 1; Roth 2022 eq. 2). **Parallel trends** is $\delta_{post}=0$. The pre-period coefficients identify $\delta_{pre}$ — *not* $\delta_{post}$. Everything in the pre-trend debate is about what $\delta_{pre}$ licenses one to believe about $\delta_{post}$.

### Reading the plot: the conventions

- **Normalisation.** One pre-period is dropped; its coefficient is zero with no error bar. Papers that do not normalise to a pre-treatment period (3 of Roth's 70) cannot be read as DiD event studies.
- **Anticipation.** If units respond before formal treatment (announced campaigns, pre-launch buzz), leads near zero are *not* placebos. The standard fix is to move the reference period earlier than the anticipation window; the Callaway–Sant'Anna framework encodes this as an anticipation horizon (see [[Identifying Assumptions for Staggered DiD]]).
- **Which baseline?** Event studies implicitly put *all* baseline weight on the single reference period, DiD weights all pre-periods equally, and SDID chooses the weights from data (Arkhangelsky et al., p. 9) — see [[SDID Estimator - Unit and Time Weights]]. Relatedly, Callaway–Sant'Anna use period $g-1$ as the baseline, while imputation estimators (Borusyak, Jaravel & Spiess) use the average of all pre-periods: more efficient under full parallel trends, less robust if only recent trends are parallel (Roth et al. §3.3).
- **Endpoint binning.** Distant leads/lags are often pooled ("5+ years since treatment"). Roth et al. (fn. 8) flag that the clean interpretation of dynamic TWFE assumes *all* relative-time indicators are included and that "problems may arise if one 'bins' endpoints," citing Sun & Abraham, Baker–Larcker–Wang, and Schmidheiny & Siegloch. Binning imposes that effects are constant beyond the bin edge; if they are not, the misspecification leaks into other coefficients. (Schmidheiny & Siegloch also show the formal equivalence between binned event-study and distributed-lag specifications — compare [[Carryover Effects and Distributed Lags]]; that paper is not yet in the vault.)
- **Bands.** Use **simultaneous** rather than pointwise confidence bands for the coefficient path (Roth et al. §4.6, citing Freyaldenhoven et al. 2021; Olea & Plagborg-Møller 2019; Callaway & Sant'Anna 2021) — implemented in [[Simultaneous Inference via Multiplier Bootstrap]].

> [!theorem] Staggered adoption: dynamic TWFE is contaminated (Sun & Abraham 2021, as summarised by Roth et al. §3.2) ^thm-event-study-contamination
> Under staggered parallel trends (Assumption 4) and no anticipation (Assumption 5):
> 1. If effects depend **only on time since treatment**, $\tau_{i,t}(g)=\sum_{s\ge0}\tau_s\mathbf 1[t-g=s]$, then $\beta_s=\tau_s$: dynamic TWFE is fine (unlike *static* TWFE, which already fails here).
> 2. If dynamic effects are **heterogeneous across adoption cohorts**, then (a) $\beta_r$ may put **negative weight** on some units' lag-$r$ effects, and (b) $\beta_r$ puts non-zero weight on effects at other lags $r'\ne r$ — **cross-lag contamination**.
> 3. Hence "the 'treatment lead' coefficients … are not guaranteed to be zero even if parallel trends is satisfied in all periods (and vice versa), and thus evaluation of pre-trends based on these coefficients can be very misleading."
>
> The root cause is the same as for static TWFE: OLS uses "forbidden comparisons" in which already-treated units serve as controls.

> [!definition] Heterogeneity-robust event study ^def-event-study-robust
> Estimate each cohort-period effect by a clean 2×2 DiD against not-yet- or never-treated units (Roth et al. eq. 8),
> $$
> \widehat{ATT}(g,t) = \frac{1}{N_g}\sum_{i:G_i=g}[Y_{it}-Y_{i,g-1}] - \frac{1}{N_{\mathcal G_{comp}}}\sum_{i:G_i\in\mathcal G_{comp}}[Y_{it}-Y_{i,g-1}]
> $$
> then aggregate by event time $l$ with researcher-chosen non-negative weights (eq. 9):
> $$
> ATT_l^w = \sum_g w_g\,ATT(g,g+l)
> $$
> Evaluating the same construction at $l<0$ gives **placebo** event-study coefficients. This is exactly the event-study aggregation in [[Aggregating Group-Time Effects#^event-study|Callaway & Sant'Anna]], where the compositional-change caveat and the "balanced" version are developed. Roth et al.'s recommendation (§4.6): with a common treatment date TWFE event studies are fine; "in contexts with staggered timing, we recommend plotting estimates of $ATT_l^w$."

### A common framework

Rambachan & Roth (§2.1-2.2) stress that the $\beta=\tau+\delta$ structure is estimator-agnostic: it holds for canonical DiD, Callaway–Sant'Anna or Sun–Abraham event-study aggregates (with $\delta_r = \sum_g w_g\delta_{g,g+r}$), IV event studies, and covariate-adjusted DiD. Roth (2022, Remark 1) makes the same point from the inference side — all yield $\sqrt N(\hat\beta-\beta)\to_d\mathcal N(0,\Sigma)$ — so that "the issues surrounding pretesting are distinct from those related to the interpretation of TWFE models under heterogeneity." Fixing the staggered-timing problem does **not** fix the pre-trend problem.

## Examples

**Marketing reading.** A retailer launches a loyalty programme in 40 of 200 stores in week 0. The event-study coefficients $\hat\beta_r$ on weekly sales trace (i) leads $r<0$: were programme stores already trending differently? (ii) $r=1,2,\dots$: ramp-up and plateau of the effect; (iii) if the programme is withdrawn, the decay — the quasi-experimental analogue of an adstock/carryover curve. If the rollout is staggered across regions and late regions get an improved programme (cohort heterogeneity), dynamic TWFE leads can be non-zero *because of* contamination; use $ATT_l^w$.

```python
import pandas as pd, statsmodels.formula.api as smf

# common treatment date: leads/lags interacted with treated-group dummy, ref = last pre-period
df["rel"] = df["week"] - T0                     # rel = 0 is the last pre-period
df["rel_b"] = df["rel"].clip(-8, 12)            # bin endpoints (imposes constant effects beyond)
m = smf.ols("y ~ C(store) + C(week) + C(rel_b, Treatment(reference=0)):treated", df) \
       .fit(cov_type="cluster", cov_kwds={"groups": df["store"]})
# staggered timing: do NOT use this; use Callaway-Sant'Anna (R `did`: aggte(type = "dynamic"))
# keep m.params and the FULL covariance m.cov_params() -- needed for pretrends / HonestDiD
```

**Published example** (Rambachan & Roth §6.2): Benzarti & Carloni's event study of the 2009 French restaurant VAT cut on log profits rejects $\beta_{pre}=0$ ($p<0.01$) because of a 2006–07 wiggle, yet post-treatment coefficients are far larger than any lead. A binary pre-test says "fail"; the right question is *how large* a post-period violation is plausible given the observed leads — see [[Honest DiD - Sensitivity to Parallel Trends Violations]].

## Connections

- [[Differences-in-Differences]] — the static parent design; "leads and lags" are introduced there as a robustness check.
- [[Difference-in-Differences with Multiple Time Periods - Overview]], [[Group-Time Average Treatment Effects]], [[Aggregating Group-Time Effects]], [[Identifying Assumptions for Staggered DiD]] — the heterogeneity-robust construction of event-study coefficients.
- [[Simultaneous Inference via Multiplier Bootstrap]] — uniform bands for the event-study path.
- [[Fixed-Effects Model]] — the TWFE regression being extended.
- [[Carryover Effects and Distributed Lags]] — post-treatment $\beta_r$ are a nonparametric lag distribution for a one-off "pulse" treatment.
- [[Bayesian Difference in Differences]] — the Bayesian treatment of the static design; a smoothness prior on the $\beta_r$ path is the natural Bayesian event study and mirrors the $\Delta^{SD}$ restriction of Honest DiD.
- [[Synthetic Difference-in-Differences - Overview]] — SDID replaces the single reference period with data-driven time weights.

## See Also

- [[Pre-Trend Testing and Its Pitfalls]]
- [[Honest DiD - Sensitivity to Parallel Trends Violations]]
- [[Doubly-Robust Estimands for ATT(g,t)]]
- [[Standard Errors and Clustering]]
