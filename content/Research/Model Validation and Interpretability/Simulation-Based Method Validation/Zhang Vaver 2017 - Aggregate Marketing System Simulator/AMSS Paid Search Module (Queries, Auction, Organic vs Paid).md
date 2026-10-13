---
title: "AMSS Paid Search Module (Queries, Auction, Organic vs Paid)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - topic/advertising
  - type/definition
  - type/algorithm
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §2.3.2 pp.14-17 (Fig. 4, footnotes 4-6); App. C.2 pp.39-41; §4.1.1 search parameterisation pp.25-26; Figs. 10-11 p.27"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]"
  - "[[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]"
used_by:
  - "[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]"
  - "[[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]"
aliases:
  - AMSS search module
  - AMSS share of voice and CPC
  - AMSS organic vs paid search effect
---

# AMSS Paid Search Module (Queries, Auction, Organic vs Paid)

> [!summary]
> Paid search in AMSS is driven by **demand**. The budget sets **campaign settings** (spend cap, bid, keyword-list
> length). Segment-specific query propensities produce a **query volume** that depends on the hidden mindset
> distribution. A simplified **auction** maps the bid to CPC and maximum share of voice, and these give available
> impressions, clicks (segment CTRs) and spend, truncated by the cap. **Effects** differ across three exposure types:
> organic only, paid impression without a click, and paid click, weighted by $\psi=(\psi_w,\psi_u,\psi_v)$. Because
> spend follows queries and queries follow latent demand, search spend is **endogenous**. Because organic search is
> modelled, the **incremental** value of paid over organic is well defined: zero the search budget.

## Overview

Search differs from TV in that inventory is limited and priced by auction (§2.3.2, p.14). Its volume and effectiveness
also depend on what earlier events did to the population. Activity state raises the probability of generic queries.
Activity and brand states raise the probability of branded queries. Favorability and loyalty raise CTR. Organic results
exist when no paid ad is shown, which "allows modelers to identify the incremental effect of paid search over organic
search" (p.14).

**One module, several channels (§2.3, p.11).** A channel is a *parameterisation* of a module. Different query rates and
CTRs by segment let the same paid search module produce **separate branded and generic search events**, each sequenced
as its own event.

**Figure 4 (p.15)** is a dependency diagram. Inputs (ovals): expected reach by segment, query rate, competitor bid
range, budget-to-campaign-settings mapping functions, maximum effect, relative effectiveness by exposure type, CTR by
segment, budget parameters. **Observed** (unshaded): query volume; impressions, clicks and spend; budget. **Hidden**
(shaded): audience, share of voice and CPC, campaign settings, effect scaling, migration, and the population
segmentations before and after.

## Main Content

> [!algorithm] Paid search module, event $k$ in interval $t$ (§2.3.2, pp.15-17; App. C.2, pp.39-41)
> 1. **Campaign settings from budget.** The modeler supplies three functions of the budget:
>    (a) the **weekly spend cap** $x^{(M)}_t$, which can be the budget split evenly or uncapped ($\infty$);
>    (b) the **bid** $c^*_t$, a single campaign-level number rather than per-keyword bids (footnote 5), e.g. rising
>    linearly with the yearly budget;
>    (c) the **keyword-list length**: a longer list matches more queries.
>    App. C.2 (p.39) adds two points. The bid is expressed as a **maximum cost per click**, which the paper says "is
>    equivalent to a bid". A budget cut can be realised in two ways. **(i) Lower bids**, which lower both the CPC and the
>    SOV through the auction in step 4. **(ii) Throttling** paid search volume through a lower spend cap, a shorter
>    keyword list, or any combination of these.
> 2. **Audience.** People in each segment who make queries matching the keyword list, $a_{t,k,s}$. The draw is analogous
>    to TV, but the query propensity depends on activity *and* brand state, which is needed for branded campaigns, and
>    is scaled by keyword coverage. Generic ads mainly reach exploratory and purchase consumers. Branded ads reach high
>    favorability and loyalty. "Modeling multiple channels with different levels of targeting allows modelers to explore
>    challenges related to selection bias" (p.16).
> 3. **Query volume.** Each audience member queries as a Poisson process with rate $\lambda^{(k)}$:
>    $w_{t,\mathcal S}\mid a_{t,k,\cdot}\sim\text{Poisson}(\lambda^{(k)}a_{t,k,\mathcal S})$.
> 4. **Auction: CPC and maximum share of voice.** The competitive landscape is summarised by a bid range
>    $[\eta^{(m)}_t,\eta^{(M)}_t]$. Below $\eta^{(m)}_t$ the advertiser loses every auction. At or above $\eta^{(M)}_t$
>    it wins every auction.
>    $$
>    c_t=\eta^{(m)}_t\vee c^*_t\wedge\eta^{(M)}_t,\qquad p^{(u)}_t=0\vee\frac{c^*_t-\eta^{(m)}_t}{\eta^{(M)}_t-\eta^{(m)}_t}\wedge1 .
>    $$
>    $\vee$ is max and $\wedge$ is min. Maximum SOV is "the fraction of search queries matching the keyword list whose
>    auctions the advertiser can win at the current bid" (footnote 6). The realised SOV can be lower when the cap binds.
>    For branded campaigns, which win cheaply thanks to quality-score relevance, set a low $[\eta^{(m)},\eta^{(M)}]$.
> 5. **Available impressions.** $u^*_{t,\mathcal S}\mid w_{t,\mathcal S}\sim\text{Binomial}(w_{t,\mathcal S},p^{(u)}_t)$.
> 6. **Spend cap → click cap.** $v^{(M)}_t=x^{(M)}_t/c_t$. The overall CTR is the audience-weighted
>    $p^{(v)}_t=\sum_s a_{t,k,s}\pi^{(v)}_s/a_{t,k,\mathcal S}$, using segment CTRs $\pi^{(v)}_s$ that are higher for
>    favourable and loyal states. The impressions needed to hit the click cap are drawn as
>    $u^{(M)}_t-v^{(M)}_t\sim\text{NegBin}(v^{(M)}_t,p^{(v)}_t)$ (failures before the $r$-th success).
> 7. **Paid impressions and clicks.** $u_{t,\mathcal S}=\min\{u^*_{t,\mathcal S},u^{(M)}_t\}$. If $u^{(M)}_t\le u^*_{t,\mathcal S}$
>    (the cap binds), clicks are $v^{(M)}_t$. Otherwise
>    $v_{t,\mathcal S}\sim\text{Hyper}(v^{(M)}_t,\,u^{(M)}_t-v^{(M)}_t,\,u^*_{t,\mathcal S})$, the successes in $k$ draws
>    from $m$ successes and $n$ failures. This tends to a binomial as $m,n\to\infty$.
> 8. **Allocate volumes to segments** (multinomials):
>    clicks $v_{t,\cdot}\mid v_{t,\mathcal S}\sim\text{Mult}\bigl(v_{t,\mathcal S},\,(a_{t,k,s}\pi^{(v)}_s)_s/\textstyle\sum_s a_{t,k,s}\pi^{(v)}_s\bigr)$;
>    non-click impressions $u_{t,\cdot}-v_{t,\cdot}\sim\text{Mult}\bigl(u_{t,\mathcal S}-v_{t,\mathcal S},\,(a_{t,k,s}(1-\pi^{(v)}_s))_s/\textstyle\sum_s a_{t,k,s}(1-\pi^{(v)}_s)\bigr)$;
>    queries without an ad $w_{t,\cdot}-u_{t,\cdot}\sim\text{Mult}(w_{t,\mathcal S}-u_{t,\mathcal S},\,a_{t,k,\cdot}/a_{t,k,\mathcal S})$.
> 9. **Spend.** $x_{t,s}=v_{t,k,s}\,c_t$, i.e. paid clicks × CPC.
> 10. **Effect.** See below. Migrate by Eqs. 1-2 with the effect-scaled matrix, as in the traditional module.
^alg-amss-search

> [!definition] Search effect by exposure type (§2.3.2 step 4, p.17; App. C.2, p.41)
> In each segment, count the **people** (not the queries) who: made a matching query, $n^{(w)}_{t,s}$; saw a paid
> impression, $n^{(u)}_{t,s}$; made a paid click, $n^{(v)}_{t,s}$. The counts are drawn in a chain (App. C.2, p.41):
> 1. **Query-makers.** Given the segment's query total $w_{t,s}$ spread over its query-making audience $a_{t,s}$, the
>    queries per individual follow $\text{Multinomial}\bigl(w_{t,s},(1/a_{t,s},\dots,1/a_{t,s})^\top\bigr)$. The first
>    and second moments of $n^{(w)}_{t,s}$, the number with at least one query, are computed from this, and
>    $n^{(w)}_{t,s}$ is drawn from a normal approximation.
> 2. **Impression-viewers.** The same calculation, conditioned on the impression total $u_{t,s}$ and the
>    $n^{(w)}_{t,s}$ query-makers, gives $n^{(u)}_{t,s}$.
> 3. **Clickers.** The same calculation, conditioned on the paid-click total $v_{t,k,s}$ and the $n^{(u)}_{t,s}$
>    impression-viewers, gives $n^{(v)}_{t,s}$.
>
> Each step is the occupancy calculation used for TV reach in
> [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]: the moments of the number not reached, with
> mean $\mu_1$ and variance $\mu_2-\mu_1^2$. Exposure types are disjoint: **(a)** organic only, $n^{(w)}-n^{(u)}$; **(b)** paid
> impression without a click, $n^{(u)}-n^{(v)}$; **(c)** paid click, $n^{(v)}$. The effect size is
> $$
> e_{t,s}=\psi^{(k)}_w\frac{n^{(w)}_{t,s}-n^{(u)}_{t,s}}{a_{t,k,s}}+\psi^{(k)}_u\frac{n^{(u)}_{t,s}-n^{(v)}_{t,s}}{a_{t,k,s}}+\psi^{(k)}_v\frac{n^{(v)}_{t,s}}{a_{t,k,s}} .
> $$
> Search uses **no frequency curve**: a person "will feel the full effect of any search volume at a frequency of 1."
> Usually $\psi_v=1$. The maximal matrix $\mathcal Q^{(k)}$ is built from per-dimension $\mathcal Q^{(k,l)}$ exactly as
> in the traditional module.
^def-amss-search-effect

> [!definition] Incrementality of paid over organic (§2.3.2, p.17; App. C.2, p.41)
> $\psi_w$ is the effect of organic results seen by searchers who were not shown the paid ad (footnote 9). Setting the
> search budget to zero puts every searcher in group (a). The paid-vs-zero-budget counterfactual therefore isolates the
> incremental effect of paid search. A **high $\psi_w$** simulates **branded search** where the paid ad mostly
> *replaces* the organic click and adds little.
^def-amss-search-incrementality

**Simplified competition (App. C.2, p.39).** In reality competitors make all the same decisions. AMSS summarises them by
$[\eta^{(m)}_t,\eta^{(M)}_t]$, so competitors do **not** react to the advertiser's bids. The paper flags this as a
simplification.

**Uncapped spend is not settable (§3.1, p.22).** When the cap does not bind, spend = clicks × CPC moves with query
volume, SOV and CPC, and query volume moves with every upstream event. Several combinations of campaign settings can
produce the same spend with different effects on consumers. So "fixing search spend" is not a well-defined intervention.
Counterfactuals must be set on the budget or the campaign settings. See
[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS#^def-amss-counterfactual-types]].

> [!warning] Inconsistency: weekly vs daily spend cap
> §2.3.2 step 1 and footnote 4 (p.15) describe a **weekly** spend cap. App. C.2 (p.39) says advertisers choose "a daily
> spend cap". The simulator works in weekly intervals, and the algorithm above uses the weekly cap $x^{(M)}_t$. Read
> "daily" in the appendix as the real-world setting and "weekly" as what the simulator models.
^warn-amss-inconsistency-weekly-daily-spend

## Examples

> [!example] Search in the simple scenario (§4.1.1, pp.25-26)
> **Targeting.** Ads are shown on queries from 1% of inactive, 30% of exploratory and 40% of purchasing people.
> **CTR.** 0.005 for inactive, 0.08 for exploratory, 0.10 for purchase. Neither query rates nor CTRs depend on
> favorability, so that TV cannot raise search effectiveness and there is no TV × search interaction.
> **Settings.** Spend cap and keyword list are fixed and spend is **uncapped**. The bid rises linearly with budget from
> 0.8 at budget 0. The search budget is larger each year to create variation.
> **Effect** on activity only:
> $$
> \mathcal Q^{(search,3)}=\begin{pmatrix}0.05&0.95&0\\0&0.85&0.15\\0&0&1\end{pmatrix},\qquad\psi^{search}=(0.0,\ 0.1,\ 1.0).
> $$
> **Solution.** A click moves an inactive person to exploratory with probability $1.0\times0.95=95\%$, and an
> exploratory person to purchase with probability $1.0\times0.15=15\%$. An impression without a click gives 9.5% and
> 1.5%. Organic-only exposure gives 0%.
> **Interpretation.** The 95% looks huge, but footnote 7 notes it applies only to the small group of inactive people who
> see *and* click a paid ad. The campaign is targeted and reaches few inactive people.
^ex-amss-search-simple-scenario

> [!example] What the simulated search data look like (Figs. 10-11, p.27)
> **Fig. 10.** Weekly TV spend (black) is spiky, up to about \$11M a week with many zero weeks. Search spend (blue) is
> smooth, about \$0.5-2M, and **tracks the seasonal market rate**.
> **Fig. 11.** Query volume (solid, about 1-2.5×10⁷ a week), paid impressions (dotted) and paid clicks (dashed, about
> 10⁶) all follow seasonality and are highly correlated within each year. As the bid rises each year, SOV rises and the
> paid-impressions line approaches the query line.
> **Interpretation.** Search spend is a near-proxy for seasonal demand. A model that does not control for seasonality
> would credit search with seasonal sales. That is why the paper hands the model observed seasonality.
^ex-amss-what-simulated-search-data

## Connections

- **Endogenous search spend.** The aggregate analogue of the selection problem measured in the eBay paid-search
  experiment ([[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]), where brand-keyword ads were close to
  zero incremental. In AMSS, a high $\psi_w$ for a branded campaign reproduces that finding.
- **Selection bias in observational MMM.** [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] discusses
  search as the canonical selection-bias channel. [[Activity Bias in Advertising]] and
  [[Experimental Benchmarks for Observational Ad Measurement]] cover the user-level version.
- **Predictive importance vs causal effect.** A predictive model will give search spend large attribution because it
  co-moves with demand. See [[Dillon et al - SHAP and Causal Insights - Overview]] and
  [[Dillon et al - Observed Confounding and Double ML for Ad Spend]].

## See Also

- [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]
- [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]: why spend cannot be the intervention
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
- [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]] — empirical paid/organic substitution rates
