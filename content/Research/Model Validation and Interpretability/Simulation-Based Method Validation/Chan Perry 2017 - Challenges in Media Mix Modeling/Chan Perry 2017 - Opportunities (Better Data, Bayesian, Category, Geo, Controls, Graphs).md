---
title: "Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "§5 Opportunities intro incl. better data (pp.11-12); §5.1 Bayesian modeling (pp.12-13); §5.2 Category models (p.13); §5.3 Geo models (p.13); §5.4 Control variables (pp.13-14); §5.5 Graphical models incl. Figure 5 (p.14)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]"
  - "[[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]]"
aliases:
  - Chan Perry opportunities
  - Category MMM (Chan Perry)
  - Geo-level hierarchical MMM (Chan Perry)
  - Search query volume as demand control
  - Chan Perry Figure 5 media funnel
---

# Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)

> [!summary]
> Section 5 of Chan & Perry (2017) answers §4 with opportunities in three areas: **better data**, **better models**, and
> **model evaluation through simulation**. This note covers the first two. Better data: a standardized MMM data and
> reporting format and tighter coordination between campaign intermediaries and publishers. Better models: **Bayesian
> fitting** (informative priors, complex models, parameter and model uncertainty, uncertainty propagated into
> optimization); **category models** pooling brands in a hierarchical Bayesian model; **geo models** using sub-national
> data; **demand-proxy controls** such as relevant search query volume for paid search; and **graphical models** for media
> funnels (Figure 5). Simulation (§5.6) is in [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]].
^summary

## Overview

Every remedy here works on one of two levers: **add independent variation** (category pooling, geo data, better data)
to fix the §4.1 limitations, or **represent the causal structure** (demand controls, graphical models) to fix §4.2
selection bias. Bayesian modeling is the common fitting framework; in the vault's reading (not a claim the paper makes), its informative
priors are the main defence against the §4.1.3 extrapolation problem.

## Main Content

### Three areas of opportunity (§5, p.12)

> [!definition] Opportunity areas (§5, p.12)
> 1. **Better data**: more accurate and more granular data.
> 2. **Better models**: §5.1-5.5 below.
> 3. **Model evaluation through simulations**: §5.6.
^def-cp-opportunity-areas

**Better data (p.12).** Advertisers commonly source exposure data through the agencies managing their campaigns, which
can introduce inconsistencies and inaccuracies (see the data problems in
[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]). The authors propose that the
industry adopt a **standardized data and reporting format for MMMs**, and that tighter coordination between the
intermediaries who execute campaigns and the publishers that serve the ads would enable more accurate data collection.

### §5.1 Bayesian modeling (pp.12-13)

> [!theorem] Benefits of Bayesian MMM fitting (§5.1, pp.12-13)
> Eq. (3) can be fitted in several ways; the authors found a Bayesian framework offers improvements:
> 1. **Informative priors** for the parameters, which can come from a variety of sources.
> 2. Ability to handle **complicated models**.
> 3. Ability to report both **parameter uncertainty and model uncertainty**.
> 4. Ability to **propagate uncertainty to optimization** statements.
>
> See Jin et al. (2017) for a Bayesian framework that does this. A strong candidate source of informative priors is a
> category-level MMM fitted across brands with a Bayesian hierarchical model (§5.2).
^thm-cp-bayesian-benefits

Vault coverage of Jin et al. (2017): [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]],
[[ROAS, mROAS, and Optimal Media Mix]]. Experiment results as a prior source:
[[Q - Using Experiment Results as Priors in a Bayesian MMM]]. A Bayesian fit only addresses the §4 problems if the
priors carry real outside information; with diffuse priors on 156 rows, the posterior reproduces the §4.1 instability
with error bars. Checking that a Bayesian fitting procedure is calibrated is [[Simulation-Based Calibration - Overview]].

### §5.2 Category models (p.13)

> [!definition] Category MMM (§5.2, p.13)
> Pool national-weekly data for **several brands in the same product category** and fit a hierarchical Bayesian MMM in
> which brand-level parameters share a category-level distribution (Wang, Jin, Sun, Chan & Koehler 2017).
> - **Why it helps:** a single brand's dataset has too little quantity and information. Brands tend to act
>   independently of each other in advertising preferences and execution, so the category dataset has **more independent
>   variability**.
> - **Uses of the output:** (a) brand-level results directly; (b) the category posterior as an **informative prior** for a
>   Bayesian MMM of a brand that was *not* in the category model.
> - **Evidence cited:** Wang et al. (2017) show with simulation and real case studies that this improves parameter
>   estimation and reduces the uncertainty of prediction and extrapolation.
^def-cp-category-model

Generic hierarchical-model mechanics (partial pooling, shrinkage toward the group mean): [[Hierarchical Models]].

### §5.3 Geo models (p.13)

> [!definition] Geo-level hierarchical MMM (§5.3, p.13)
> Use sub-national data (city, county, province or state, depending on the country) and fit a geo-level model, e.g. the
> hierarchical Bayesian model of Sun et al. (2017).
> - **Effects reported:** reduced variance of parameter estimates. More information may also **reduce model uncertainty
>   by reducing the number of models that fit the data well** (the §4.3.2 problem).
> - **Reporting:** parameters at the individual geo level or nationally; budget optimization at either level.
> - **Mixed granularity:** national-only channels are **disaggregated to the geo level using population metrics**, then the
>   hierarchical model is fitted as usual (this addresses the "lowest common denominator" problem of §3.1).
> - **Extension:** category-geo-level models when such data exist.
^def-cp-geo-model

### §5.4 Control variables (pp.13-14)

> [!theorem] Demand-proxy controls for targeted channels (§5.4, pp.13-14)
> Paid search is a severe form of selection bias because it targets related query volume, which is driven by an
> unobservable demand that also affects sales. Remedy: use the **search volume for relevant queries as a control** for
> the part of underlying demand coming from people likely to perform product-related searches. Chen et al. (2017) show how
> this makes the paid-search estimate "more causal".
>
> **Generalization:** any medium where a control for the triggering demand exists. For **remarketing**, the volume of
> website visits that triggered the remarketing ads may be a suitable control.
^thm-cp-demand-controls

Logic in DAG terms (vault): in the funnel of Figure 5, query volume sits between latent user interest and paid-search
ads. Conditioning on it blocks the back-door path *ads <- queries <- interest -> sales*. The remaining paid-search
coefficient measures the effect of ads given that the query occurred, which is the incremental quantity. The caveat
from §4.2.3 still applies: if TV raises queries, query volume is also a mediator for TV, so TV's total effect must be
read from a model that does not condition on it. See [[DAGs and Causal Identification]] and the field-experiment
benchmark in [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].

### §5.5 Graphical models (p.14)

The section opens by introducing Figure 5 as "a simple example of the media funnels one could expect when fitting
MMMs" (p.14). A graphical model expresses the dependencies between variables, observed and unobserved (Pearl 2009). It can capture
the conditional dependencies created by media funnels, communicate the assumed causal structure more clearly, and
"allows a more realistic model than what is typically achieved through a one- or two-stage regression framework"
(p.14). Such models can be fitted, for example, with "the STAN package", cited to the Stan Development Team (2015),
*Stan Modeling Language User's Guide and Reference Manual*, version 2.10.0 (p.14; References p.16). For a worked Stan
implementation of a Bayesian MMM by the same group, see [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]].

> [!example] Figure 5 - Example of media funnel effects on sales (§5.5, p.14)
> Nodes and arrows as drawn:
> - An offline-media group (dashed box, unlabelled in the figure): TV, OOH, Radio, Print, Cinema.
> - An online-media group (dashed box, unlabelled): YouTube, Yahoo, Facebook, Other Digital.
> - **Non-media channels** ("Non-media channels: eg price, promotions, weather, holidays").
> - **User Interest** (a large latent node). Both media groups and the non-media channels point into User Interest; both
>   media groups also point directly to **KPI (Sales)**.
> - User Interest fans out into four **observable intent signals**, each of which triggers a **targeted ad type**:
>
> | Intent signal (from User Interest) | Triggered ads |
> |---|---|
> | Branded Search | Branded Search Ads |
> | Generic Search | Generic Search Ads |
> | Website Visit | Remarketing Ads |
> | Meta Site Visit | Meta Ads |
>
> - All four triggered-ad nodes point to KPI (Sales); User Interest also points directly to KPI (Sales).
>
> **Reading.** Mass media act partly *through* user interest (the funnel of §4.2.3). Targeted ads are *downstream* of
> interest (the selection bias of §4.2.1). The intent-signal nodes are exactly the demand-proxy controls of §5.4.
^ex-cp-fig5

## Examples

> [!example] Choosing remedies per failure mode (vault synthesis)
> | §4 failure | §5 remedy | What it buys | What it does not fix |
> |---|---|---|---|
> | 156 rows, many parameters (§4.1.1) | Category/geo pooling; informative priors | More rows and shrinkage | Bias from omitted demand |
> | Correlated channels (§4.1.2) | Category pooling (brands plan independently); geo variation | Independent variation | Collinearity that is national and shared |
> | Narrow spend range (§4.1.3) | Priors from category models or experiments | Pins the curve outside the data | Prior misspecification |
> | Ad targeting (§4.2.1) | Query-volume / site-visit controls | Blocks the demand back-door | Mediation by upstream media |
> | Funnels (§4.2.3) | Graphical / structural models | Separates direct from indirect effects | Needs upstream-to-downstream effects, equally data-hungry |
> | Model uncertainty (§4.3) | Bayesian model uncertainty; more data | Honest spread, fewer equal-fit models | Spread that the data cannot resolve |
^ex-cp-remedy-matrix

## Connections

- Geo experiments complement geo models: [[Geo-Experiment Methodology - Overview]],
  [[Time-Based Regression Estimator for Geo Experiments]].
- Prior-driven vs. data-driven conclusions is the §6 disclosure item; see
  [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]].
- Bayesian workflow for checking such models: [[Bayesian Workflow - Overview]].

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[Directed Acyclic Graphs]]: graphical models of the Figure 5 kind
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]: simulator whose structure mirrors Figure 5
