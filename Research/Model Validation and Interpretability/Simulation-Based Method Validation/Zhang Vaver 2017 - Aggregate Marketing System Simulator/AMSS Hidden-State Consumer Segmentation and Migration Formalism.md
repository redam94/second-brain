---
title: "AMSS Hidden-State Consumer Segmentation and Migration Formalism"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §2 intro pp.3-4 (Fig. 1); §2.1-2.1.2 pp.4-7 (Fig. 2, Tables 1-3); §2.2 pp.7-9 (Eqs. 1-2); App. A p.32 (Table 8)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
  - "[[AMSS Motivation - Virtual Experiments for Marketing Measurement]]"
used_by:
  - "[[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]]"
  - "[[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]"
  - "[[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]"
  - "[[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]]"
  - "[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]"
aliases:
  - AMSS consumer mindset states
  - AMSS 198 segments
  - AMSS event sequence
  - AMSS multinomial migration
---

# AMSS Hidden-State Consumer Segmentation and Migration Formalism

> [!summary]
> AMSS represents a consumer population as counts in **198 hidden "mindset" segments**: 6 category segments
> (market, satiation, activity) times 33 brand segments (favorability/loyalty, availability). Each week runs an ordered
> sequence of **events**: market size, de-satiation, natural migration, media, and sales. Each event moves an affected
> sub-population between segments by a **multinomial draw from a transition matrix** (Eqs. 1-2) and emits observable
> data. Aggregate KPIs (spend, queries, sales) are functions of these hidden counts. The data-generating process is
> therefore a **hidden-state, time-inhomogeneous Markov chain on segment counts**, with observables emitted along the way.

## Overview

The core modelling choice (§2, p.3) is to treat the consumer's mindset towards the **category** and the **brand** as a
discrete hidden variable and to segment the population by it. Segments differ in media consumption, ad response and
purchase behaviour. Marketing works by moving people into segments with higher purchase probability. Uncontrolled forces
such as seasonality and competition move them too. The aggregate time series an analyst sees is what these hidden
migrations leave behind.

This is a different world from a regression MMM. In an MMM, sales are a direct function of transformed spend
([[Bayesian Media Mix Modeling - Overview]]). In AMSS, spend changes **who is in which state**, and the states determine
sales. Adstock, saturation, interactions and selection bias are not written into an equation. They **emerge** from the
population dynamics. The approach has the flavour of an aggregate agent-based model ([[ABM vs Equation-Based Modeling]],
[[ABM in Marketing Strategy]]), but it tracks segment counts, not individual agents.

## Main Content

### The event-sequence architecture (Fig. 1)

> [!definition] Simulator structure: events within time intervals (§2, pp.3-4, Fig. 1)
> Time is discretised into intervals $t=1,\dots,T$ (weeks in the examples). Within each interval an **ordered sequence of
> events** $k=1,\dots,K$ is applied. Each event corresponds to one actionable force (a media channel, pricing) or
> non-actionable force (seasonality, competition). It does two things:
> 1. **Migration.** It transforms the pre-event segmentation $n_{t,k,\cdot}$ into the post-event segmentation
>    $n_{t,k+1,\cdot}$.
> 2. **Emission.** It generates observable variables, such as GRPs and spend for TV; impressions, clicks and spend for
>    search; and price, sales and revenue for the sales event.
>
> The last event of interval $t$ hands its post-event segmentation to the first event of interval $t+1$:
> $n_{t,K+1,\cdot}\equiv n_{t+1,1,\cdot}$.
^def-amss-event-sequence

**Figure 1 (p.3)** is a toy example: 100 people in 4 generic segments (footnote 2 calls them generic "indicators of
behavioral tendencies", e.g. uninterested, investigating, ready to purchase). The events *Seasonality → TV → Search →
Sales* repeat each week. A 2×2 box of segment counts sits after each event, and the counts change from box to box: the
first week reads (50, 30, 20, 0) → (40, 40, 16, 4) → (30, 30, 26, 14) → (30, 30, 24, 16), and week 2 continues
(41, 29, 26, 4) → (32, 48, 13, 7) → (24, 36, 21, 19). (Counts read from the rendered figure on p.3, row by row
within each 2×2 box; they are not in the text layer. Spot-checked against the PDF page image on 2026-10-13.) Each event lists its "surfaced variables": GRPs and spend for TV,
impressions, clicks and spend for search, and price, sales and revenue for sales. Seasonality surfaces nothing.

> [!definition] Sequential interaction principle (§2, p.4)
> Because events are sequential, "each event impacts all subsequent events through changes to the population
> segmentation" (p.4). Channel interactions therefore need no explicit specification. For example, TV can move people
> into exploratory or favourable states, which raises branded-query volume and so the paid-search inventory that follows
> it in the sequence. The modeler can add or remove events, re-specify them and re-order them to represent different
> theories of consumer behaviour.
^def-amss-sequential-interaction

The default sequence implied by §2.2 is shown below. Rows $k=1$, $k=2$ and $k=3$-6 use the paper's own numbering
(§2.2.1 p.9, §2.2.2 p.9, §2.2.4 p.10), and row $K$ follows §2.2.5 p.10 ("Each time interval finishes with the K-th event,
the sales event"). The paper **never numbers the media events**. The "7 to $K-1$" row is this note's inference from
those fixed positions, not a numbering in the source. The order of the natural-migration dimensions in row 3-6 also
disagrees with Table 1; see the note under the table.

| $k$ | Event | Section | Type |
|---|---|---|---|
| 1 | Market-size change (seasonality and trend) | §2.2.1, App. B.1 | non-actionable |
| 2 | De-satiation | §2.2.2, App. B.2 | non-actionable |
| 3-6 | Natural migration in activity, favorability, loyalty and availability | §2.2.4, App. B.3 | non-actionable |
| 7 to $K-1$ *(inferred, not given in the paper)* | Media events (TV, paid search, ...) | §2.3, App. C | actionable |
| $K$ | Sales event and post-purchase migration | §2.4 | actionable (price) and non-actionable (competition) |

> [!note] Index inconsistency in the source
> Table 1 labels loyalty $l=5$ and availability $l=6$. §2.2.4 (p.10) lists "brand availability state ($l=5$), and brand
> loyalty state ($l=6$)". These notes follow Table 1 and App. C.1, where $R_5=D$ (loyalty migration is restricted to
> favourable consumers) and $R_6=\mathcal S$ (availability is unrestricted).
>
> A second slip sits next to it in §2.2.3 (p.10): "The other two states, marketing state and satiation state, cannot be
> affected by marketing interventions." Here "marketing state" should read **market state** ($l=1$, in-market or
> out-of-market). Table 1 has no "marketing state", and the same sentence goes on to say that out-of-market and satiated
> people are held in the inactive activity state.
^note-amss-index-inconsistency-source

### Consumer-mindset dimensions (§2.1.1, Table 1)

§2.1 opens (p.4) by tying the **aggregate** behaviour of the population to the **sizes** of its segments: segments differ
in media consumption, ad response and purchase behaviour, so the mix of segment sizes sets the totals. The paper's
example is that "if a high proportion of consumers belong to segments corresponding to high brand loyalty, the advertiser
brand will have high market share" (p.4). Every observable series in AMSS is therefore a function of the hidden segment
counts $n_{t,k,\cdot}$. Marketing works only by shifting those counts.

A segment is a vector $s=(s_1,\dots,s_6)^\top$ with $s_l\in S_l$.

> [!definition] The six mindset dimensions (Table 1, p.5)
> | Group | State $l$ | Values $S_l$ |
> |---|---|---|
> | Category | Market ($l=1$) | in-market, out-of-market |
> | Category | Satiation ($l=2$) | satiated, unsatiated |
> | Category | Activity ($l=3$) | inactive, exploratory, purchase |
> | Brand | Favorability ($l=4$) | unaware, unfavorable, neutral, somewhat favorable, favorable |
> | Brand | Loyalty ($l=5$) | switcher, loyal, competitor-loyal |
> | Brand | Availability ($l=6$) | low, average, high |
^def-amss-mindset-dims

The paper grounds each dimension in brand-growth thinking (Sharp 2010; Millward Brown 2009):

- **Market** (p.5). Who is a potential customer at all. The paper's example is that only diagnosed patients are in the
  market for a hypertension drug. Market size moves with **seasonality** (travel and the school year) and **trend**
  (smartphone adoption driving app demand, the economy driving luxury goods, gasoline prices driving SUV sales).
- **Satiation** (p.5). Whether recent purchases have satisfied demand. This is what produces **post-promotion dips**, a
  category-wide effect that the advertiser's own promotions and competitors' promotions both cause. Satiation wears off
  fast for perishables and slowly for travel and durables.
- **Activity** (pp.5-6, Fig. 2). Position on the **path to purchase**. *Inactive* consumers show no observable category
  interest. *Exploratory* consumers make generic and branded queries and research. *Purchase* consumers are in the act of
  buying. **Figure 2** maps example actions to states: display-ad and magazine exposure while inactive; talking with
  friends, a search query plus paid-ad exposure without a click, or a product-review video while exploratory; buying at
  the brand website while in purchase. A sale requires the purchase state. Mass media reach all states. Search reaches
  mostly the later ones. For people in the purchase state, which brand they choose "depends on factors such as brand
  favorability, brand loyalty, brand availability, and price at the point of purchase" (p.6). The purchase can happen at
  a brand-specific location, such as the brand website, or a non-specific one, such as a department store, grocery store
  or fare aggregator.
- **Brand favorability** (p.6). Opinion of the brand, in five levels: unaware, unfavorable, neutral, somewhat favorable,
  favorable. **Terminology:** Table 1 (p.5), the §2.1.1 text (p.6) and Table 3 call the second level *unfavorable*. The
  Fig. 5 caption (p.19) and the §4.1.1 TV matrix and purchase-probability vector (pp.24-26) call it *negative*. Both
  words name the same state, $s_4=$ unfavorable; these notes use them interchangeably. Higher favorability generally means a higher probability of buying the advertiser's brand. "Marketing
  tools may increase brand sales by increasing brand favorability." It is **not exclusive**: a consumer can favour
  several brands, so "high brand favorability does not automatically imply brand purchase or brand loyalty" (p.6).
- **Brand loyalty** (pp.6-7; Sharp ch. 7). Loyal, competitor-loyal, or switcher. It **is exclusive**. "Consumers loyal
  to a particular brand have low probability of buying from a competitor" (pp.6-7). Switchers are loyal neither to the
  advertiser nor to its competitors, and at purchase time they choose among several brands "based on price,
  convenience, and other factors" (p.7).
- **Brand availability** (p.7; Sharp ch. 12). Physical and mental ease of buying. The paper's example is a cereal
  stocked in 70% of stores: availability is *average* for those 70% of shoppers and *low* for the other 30%. Wider
  distribution moves people from low to average. In-store displays, and search ads that add prominence on the results
  page, move them from average to high.

### Full segmentation: 198 segments (§2.1.2, Tables 2-3)

> [!definition] Valid segment set $\mathcal S$ (§2.1.2, p.7)
> $\mathcal S\subset S_1\times\dots\times S_6$, restricted by two rules:
> 1. **Only in-market *and* unsatiated consumers can leave "inactive."** This leaves **6 category segments**
>    $(s_1,s_2,s_3)$ (Table 2).
> 2. **Only "favorable" consumers can be loyal to the advertiser.** This leaves 11 favorability × loyalty combinations.
>    Crossed with 3 availability levels, that gives **33 brand segments** $(s_4,s_5,s_6)$ (Table 3).
>
> $|\mathcal S| = 6\times 33 = 198$.
^def-amss-198-segments

**Table 2: the six category segments (p.7)**

| Market | Satiation | Activity |
|---|---|---|
| out-of-market | satiated | inactive |
| out-of-market | unsatiated | inactive |
| in-market | satiated | inactive |
| in-market | unsatiated | inactive |
| in-market | unsatiated | exploratory |
| in-market | unsatiated | purchase |

**Table 3: the 11 favorability/loyalty states, crossed with availability ∈ {low, average, high} (p.8)**

| Favorability | Loyalty |
|---|---|
| unaware | switcher |
| unfavorable | switcher |
| neutral | switcher |
| somewhat favorable | switcher |
| favorable | switcher |
| favorable | loyal |
| unaware | competitor-loyal |
| unfavorable | competitor-loyal |
| neutral | competitor-loyal |
| somewhat favorable | competitor-loyal |
| favorable | competitor-loyal |

### Probabilistic migration (§2.2, Eqs. 1-2)

> [!definition] Segment counts and groupings (§2.2, p.8)
> $n_{t,k,s}$ is the number of people in segment $s\in\mathcal S$ **before** event $k$ of interval $t$. For a set of
> segments $\mathcal A\subseteq\mathcal S$, $n_{t,k,\mathcal A}=\sum_{s\in\mathcal A}n_{t,k,s}$. The full segmentation
> is the vector $n_{t,k,\cdot}=(n_{t,k,s})_{s\in\mathcal S}$. Event $k$ maps $n_{t,k,\cdot}\mapsto n_{t,k+1,\cdot}$.
^def-amss-counts

> [!definition] Migration law (Eqs. 1-2, p.8)
> Event $(t,k)$ selects an **affected population** $a_{t,k,s}\le n_{t,k,s}$ in each segment and a **transition matrix**
> $Q^{(t,k)}=(q^{(t,k)}_{s,s'})_{\mathcal S\times\mathcal S}$. Both depend on the pre-event segmentation and the event
> specification. Migrations out of $s$ are
> $$m_{t,k,s,\cdot}=(m_{t,k,s,s'})_{s'\in\mathcal S}\sim\text{Multinomial}\!\left(a_{t,k,s},\;q^{(t,k)}_{s,\cdot}\right)\tag{1}$$
> and the post-event segmentation is
> $$n_{t,k+1,s'}=n_{t,k,s'}-a_{t,k,s'}+\sum_{s\in\mathcal S}m_{t,k,s,s'},\qquad s'\in\mathcal S.\tag{2}$$
> Here $m_{t,k,s,s'}$ is the number of people moving from $s$ to $s'$. The diagonal $q_{s,s}$ is the probability of
> staying put.
^def-amss-migration-law

**Reading the formalism.** Conditional on $n_{t,k,\cdot}$, the process is a **Markov chain on the count vector**. The
transition kernel is time-inhomogeneous: it depends on $t$ through seasonality, budgets, prices and competition, and on
$k$ through the event type. Each event uses a different matrix. Media events also make the matrix depend on the current
counts, through reach and frequency, so the dynamics are **non-linear in the state**. The analyst never sees $n$. They
see only emissions such as spend, volume, queries and sales. So from the analyst's side AMSS is a **hidden Markov /
state-space data-generating process**. MMM regressions are reduced-form approximations to it.

Every event that follows is an instance of Eqs. 1-2 with its own choice of $(a_{t,k,\cdot},Q^{(t,k)})$:

| Event | Affected population $a$ | Transition matrix $Q$ | Note |
|---|---|---|---|
| Market size | all in $\mathcal S\setminus\mathcal A$ or all in $\mathcal A$ | moves towards target rate $\rho_t$ | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-market-size\|B.1]] |
| De-satiation | satiated | rate $\lambda$ | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-desatiation\|B.2]] |
| Natural migration $l$ | restricted set $R_l$ | $\mathcal Q^{(l)}$ | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-natural-migration\|B.3]] |
| Traditional media | reach $a_{t,k,s}$ | Hill-scaled $\mathcal Q^{(k)}$ | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)#^def-amss-tv-effect\|C.1]] |
| Paid search | query makers | exposure-type-scaled $\mathcal Q^{(k)}$ | [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)#^def-amss-search-effect\|C.2]] |
| Sales | purchasers | satiate, then brand-state update | [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration#^def-amss-post-purchase\|§2.4.2]] |

### Notation conventions (App. A, Table 8)

| Notation | Represents | Examples |
|---|---|---|
| lowercase bold | vectors | $s$, $n_{t,k,\cdot}$ |
| capital | matrices | $Q^{(t,k)}$, $I_3$ |
| script capitals | sets | $\mathcal S,\mathcal A,\mathcal B$ |
| Greek | parameters | $\mathcal Q$ (the paper uses an archaic koppa, Ϙ), $\lambda$, $\kappa$ |

In these notes the paper's koppa Ϙ is written $\mathcal Q$. It denotes **modeler-specified** matrices, either natural or
maximal migration. Plain $Q^{(t,k)}$ denotes the **realised** event-level transition matrix.

## Examples

> [!example] Reading Fig. 1 as a hidden-state process (p.3)
> **Setup.** 100 people in four unlabelled segments, with counts written as a vector. One week is four events.
>
> **Walk-through.** Each event takes the current count vector, selects an affected subset, and redistributes it by
> Eqs. 1-2. In the figure, week 1 goes (50, 30, 20, 0) → (40, 40, 16, 4) → (30, 30, 26, 14) → (30, 30, 24, 16). The
> total is always 100: migration conserves people, and only the market-size event changes who is "in the market", by
> moving them between segments. TV and search also emit GRPs, spend, impressions and clicks. Sales emits price, sales
> and revenue, and its post-purchase migrations feed week 2, which starts at (41, 29, 26, 4) after seasonality.
>
> **Interpretation.** An analyst sees only the bottom row of Fig. 1 (the surfaced variables). The boxes, meaning the
> mindset distribution, stay hidden. Any MMM fitted to the surfaced variables is a reduced-form model of this hidden
> chain.
^ex-amss-reading-fig-1-hidden

## Connections

- **Aggregation and hidden confounding.** Latent demand (the in-market, exploratory and purchase counts) drives both
  targeted-media volume and sales. That is the structural form of the confounding discussed in
  [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] and of [[Activity Bias in Advertising]].
- **Model-world vs model-of-world.** The ground truth here is a property of this DGM. It is not a property of a fitted
  model. The distinction matters for attribution methods such as SHAP; see
  [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- **Simulation-study framing.** This note specifies the "D" in ADEMP
  ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]).

## See Also

- [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]]: events $k=1,\dots,6$ in full detail
- [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]: the TV and radio event
- [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]: the search event
- [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]]: event $K$
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
