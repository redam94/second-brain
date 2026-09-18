---
title: Geo-Experiment Design and Power Analysis
tags:
  - source/ingested
  - topic/market-response
  - topic/geo-experiments
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Vaver Koehler 2011 - Measuring Ad Effectiveness Using Geo Experiments.pdf]]"
source_location: "Vaver & Koehler 2011 §2-7 (Geo Experiment Description, Linear Model, Example Results, Design, Concluding Remarks, Appendix)"
date_ingested: 2026-07-03
folder: "Market Response Models/Geo-Experiment Methodology"
doc_type: paper
depends_on:
  - "[[Geo-Experiment Methodology - Overview]]"
used_by:
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Geo-Based Regression
  - GBR
  - GBR model
  - Geo Experiment Power Analysis
---

# Geo-Experiment Design and Power Analysis

> [!summary]
> **Geo-Based Regression (GBR)**, from Vaver & Koehler (2011), is the founding methodology for Google geo experiments. It randomly assigns non-overlapping geographic regions ("geos") to treatment or control, injects an ad-spend differential in the treatment geos, and fits a single cross-sectional regression of each geo's test-period response against its pretest-period response and its ad-spend differential. The coefficient on the spend differential is the **return on ad spend (ROAS)**. A closed-form variance formula for that coefficient, combined with a simulation-based procedure over historical pretest data, lets an advertiser predict the confidence-interval half-width of ROAS *before* running the experiment — the design/power-analysis half of the geo-experiment toolkit that [[Time-Based Regression Estimator for Geo Experiments|TBR]] complements with a low-geo-count alternative estimator.

## Overview

A geo experiment partitions a region of interest (e.g., a country) into **geos** — non-overlapping areas small enough to be individually ad-targeted, but large enough that ad delivery and response-metric tracking are geographically accurate (postal codes are too small; the 210 U.S. Designated Market Areas, DMAs, are a standard choice). Each geo is randomly assigned to a **control** or **treatment** condition, and geo-targeted advertising realizes that assignment.

Every experiment has two periods (Figure 1 of the paper):
- **Pretest period** — no campaign differences across geos; treatment and control geos operate at the same baseline.
- **Test period** — the treatment geos' campaigns are modified (spend increased or decreased), generating a nonzero **ad-spend differential** $\delta_i$ relative to control. The response metric may lag the spend change by a delay $\nu$ (e.g., offline sales take time to materialize after research/consideration), so the test period is extended by $\nu$ beyond the end of the spend change to capture the full effect.

GBR's statistical power comes from **replication across geos** — more geos means a tighter confidence interval on the ROAS coefficient, exactly as more replicates tighten any regression estimate. This is the source of GBR's one structural limitation: it needs tens or more geos to be well powered, which is why [[Time-Based Regression Estimator for Geo Experiments|TBR]] was later developed for situations with only a handful of geos.

## Main Content

### The GBR linear model

> [!definition] GBR response model (Vaver & Koehler 2011, Eq. 1)
> After the experiment, the results are analyzed with the cross-sectional regression, one observation per geo $i=1,\dots,N$:
> $$y_{i,1} = \beta_0 + \beta_1 y_{i,0} + \beta_2 \delta_i + \epsilon_i$$
> where $y_{i,1}$ is the aggregate response metric (e.g., offline sales, clicks) during the test period for geo $i$, $y_{i,0}$ is the aggregate response metric during the pretest period for geo $i$, and $\delta_i$ is the ad-spend differential — the difference between geo $i$'s actual test-period ad spend and the spend that *would have* occurred without the experiment. The model is fit by **weighted least squares** with weights $w_i = 1/y_{i,0}$, which controls for the heteroscedasticity caused by geos of very different sizes.
>
> $\beta_0$ and $\beta_1$ absorb seasonal differences in the response metric common to the pretest→test transition; $\beta_2$, the coefficient of primary interest, **is the return on ad spend (ROAS)** — the incremental response generated per incremental dollar of ad spend.
^def-gbr-model

### Constructing the ad-spend differential $\delta_i$

If there is no ad spend at all during the pretest period, $\delta_i$ is simply the treatment geo's test-period spend. If spend is nonzero pretest and is then increased or decreased, the counterfactual ("what spend would have been without the experiment") must be estimated. This uses a **second, auxiliary linear model** fit on the control geos only:

> [!definition] Ad-spend counterfactual model (Eq. 2)
> $$s_{i,1} = \gamma_0 + \gamma_1 s_{i,0} + \mu_i, \qquad i \in \text{control geos } C$$
> fit by weighted least squares with weights $w_i = 1/s_{i,0}$, where $s_{i,1}, s_{i,0}$ are geo $i$'s ad spend in the test and pretest periods. Because it is estimated only from control geos, whose campaigns are unmodified, this model characterizes the seasonal drift of ad spend absent any treatment effect, and its fitted value is the spend *counterfactual*.
^def-spend-counterfactual

The spend differential is then

$$\delta_i = \begin{cases} s_{i,1} - (\gamma_0 + \gamma_1 s_{i,0}) & i \in T \\ 0 & i \in C \end{cases}$$

— zero for control geos, since by construction they continue to operate at baseline. If instead the target aggregate spend change $\Delta$ can be hypothesized directly (e.g., a planned budget change), $\delta_i$ can be prorated across treatment geos by their pretest response volume: $\delta_i = \Delta(y_{i,0}/\sum_i y_{i,0})$ for $i\in T$, $0$ otherwise.

### Geo assignment and stratification

Geos are randomly assigned to treatment/control — randomization is what guards against hidden, unmeasured differences between geos being confounded with the treatment effect. Vaver & Koehler found that **constraining** the randomization improves precision: rank geos by pretest volume $y_{i,0}$, partition the ranked list into groups of size $M$ (so the test fraction is $1/M$), and randomly select one geo from each group for treatment. This stratified assignment lowered the ROAS confidence-interval width by about 10% relative to unconstrained randomization in their data.

### Variance of the ROAS estimate and the power/design procedure

> [!theorem] Variance of $\hat\beta_2$ (Vaver & Koehler 2011, Eqs. 4–5; derivation in Appendix)
> For an experiment with $N$ geos, let $\bar y_0 = \frac1N\sum_i y_{i,0}$ and $\bar\delta = \frac1N \sum_i \delta_i$. Linear theory gives
> $$\mathrm{var}(\beta_2) = \frac{\sigma_\epsilon^2}{\left(1-\rho_{y\delta}^2\right)\left[\sum_{i=1}^N w_i(\delta_i-\bar\delta)^2\right]}, \qquad \rho_{y\delta}^2 = \frac{\left[\sum_i w_i(y_{i,0}-\bar y_0)(\delta_i - \bar\delta)\right]^2}{\sum_i w_i(y_{i,0}-\bar y_0)^2 \sum_i w_i (\delta_i-\bar\delta)^2}$$
> where $\sigma_\epsilon^2$ is the residual variance of the model, and $\rho_{y\delta}$ is the (weighted) correlation between pretest response and spend differential across geos. The half-width of the two-sided 95% confidence interval for ROAS is $2\sqrt{\mathrm{var}(\beta_2)}$.
^thm-gbr-variance

This formula is the engine of a **simulation-based design/power-analysis procedure** that only needs historical geo-level pretest data (no live experiment):

1. Carve a consecutive window of the historical response series into **pseudo pretest** and **pseudo test** periods whose lengths match the proposed experiment (e.g., 14 pretest days, 14 test days). Use the pseudo pretest window to estimate $y_{i,0}$ and weights $w_i$.
2. Randomly assign geos to treatment/control (with the size-stratified procedure above).
3. Estimate or hypothesize $\delta_i$ for the pseudo test window (directly, or via the spend-counterfactual model / prorated $\Delta$).
4. Estimate $\sigma_\epsilon$ from the **reduced model** $y_{i,1} = \hat\beta_0 + \hat\beta_1 y_{i,0} + \hat\epsilon$ (Eq. 7 — same as the full model but with the $\delta_i$ term dropped), fit on the pseudo pretest/test data.
5. Plug into Eq. 4 to get $\mathrm{var}(\beta_2)$ for this random assignment; repeat over **many** random assignments, and over different pseudo-period windows obtained by **circularly shifting** the historical data by a random time offset, to avoid artifacts of one particular partition.
6. The predicted CI half-width is $2\sqrt{\overline{\mathrm{var}(\beta_2)}}$, averaged over all the randomizations/shifts.

Circular shifting lets a limited pretest data set support power analyses for long hypothesized test periods, but reusing data points multiple times to build each pseudo-window makes the resulting CI-width estimate **overly optimistic** once the hypothesized experiment length exceeds the available historical window — a caution the paper demonstrates empirically (Figure 5: prediction tracks the realized confidence interval closely until this reuse point, then the two diverge).

## Examples

> [!example] Real experiment: paid-search click ROAS (Vaver & Koehler 2011 §4)
> One Google advertiser ran a multi-week geo experiment with search ads shown in half of the (210 DMA) geos. Fitting Eq. 1 with successively longer windows of test-period data, the ROAS for **clicks** converged to $\beta_2 \approx 1/3$ incremental click per ad dollar — a **cost per incremental click (CPIC) of \$3**, versus a naively reported CPC of **\$2.40** in AdWords (a 20% underestimate of the true incremental cost). The confidence interval was wide early in the test and narrowed quickly as more data accumulated, exactly as Eq. 4 predicts. Cumulative incremental clicks tracked cumulative incremental spend and then **flattened the instant spend returned to baseline** — for clicks, there is no lagged effect ($\nu\approx0$).
>
> A second response metric, **offline sales**, showed the opposite temporal pattern: cumulative incremental revenue kept climbing for some time *after* the spend differential returned to baseline before flattening, illustrating why the test period must be extended by a delay $\nu$ for metrics with a lagged behavioral response.

> [!example] Design levers this procedure controls
> Per [[Geo-Experiment Methodology - Overview#^def-design-levers|the two design levers]] shared by GBR and TBR, GBR's design/power analysis directly answers: (1) which geos go to treatment vs. control (via stratified randomization), (2) the size and sign of the spend differential $\delta_i$ (via the auxiliary spend model or a hypothesized $\Delta$), and (3) how long the pretest/test/cooldown periods need to be to hit a target ROAS CI half-width — all *before* spending a dollar of incremental ad spend.

## Connections

- **Feeds** the design-vector formalism $\xi=(a_g,m,\Delta_g,[t_0,t_1])$ referenced in [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]: GBR's variance formula answers the same "how big / how long" question that note poses as an EIG-maximization problem, but by targeting a CI half-width via closed-form linear-model variance instead of maximizing expected information gain.
- **Contrasts with** [[Time-Based Regression Estimator for Geo Experiments]]: GBR needs many geos (statistical power scales with $N$, the number of geos); TBR needs many pretest *time points* instead, and works down to a single treatment/control geo pair. See the comparison table in [[Geo-Experiment Methodology - Overview]].
- **Complements** [[TBR Design Sensitivity and the Stationarity Assumption]], which gives the analogous design/power procedure (Monte-Carlo "pseudo-geo-experiment" data sets) for TBR — built directly on the pseudo-pretest/circular-shift technique introduced here.

## See Also
- [[Geo-Experiment Methodology - Overview]] — the topic overview and GBR/TBR comparison table
- [[Time-Based Regression Estimator for Geo Experiments]] — the alternative estimator for low-geo-count experiments
- [[TBR Design Sensitivity and the Stationarity Assumption]] — TBR's analogous design/power procedure and assumption checks
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — the Bayesian EIG framing this classical variance-based design is the frequentist counterpart of
- [[Interference and Marketplace Experiments]] — geo tests are cluster-randomized designs against interference
