---
title: "AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/definition
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §2.2.5 p.11; §2.4-2.4.1 pp.18-19 (Figs. 5-6); §2.4.2 pp.20-21; footnote 3 p.11"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]"
  - "[[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]]"
used_by:
  - "[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]"
  - "[[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]"
aliases:
  - AMSS sales module
  - AMSS competitor strength and substitutability
  - AMSS linear demand curve
---

# AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration

> [!summary]
> The last event each week turns hidden segment counts into **sales**. Only purchase-state segments buy. Each has a
> **linear demand curve in price** $(\alpha_s-\beta_s p_t)$ clipped to $[0,1]$. Competition is summarised by **strength**
> $\gamma_{t,s}$ and **substitutability** $\omega_{t,s}$. A multinomial splits each segment into no purchase, advertiser
> purchase and competitor purchase. Units per buyer are one plus a Poisson draw. Afterwards, **all buyers become
> satiated**, and brand favorability and loyalty can update. Media increases sales by moving people to segments with
> better demand curves. Price promotions move people *along* a demand curve.

## Overview

The sales event (event $K$; footnote 3: "sales" from the advertiser's view, "purchase" from the consumer's) computes
advertiser sales per segment $y_{t,\cdot}=(y_{t,s})_{s\in\mathcal S}$ and competitor sales $z_{t,\cdot}$ (§2.4, p.18).
It also produces the post-purchase segmentation $n_{t+1,1,\cdot}$. To avoid simulating competitors in as much detail as
the advertiser, AMSS summarises them with two time-varying parameters (p.18).

## Main Content

> [!definition] Competition-free purchase probability (§2.4.1, p.18)
> For segments with $s_3=\text{purchase}$, define per-segment parameters:
> - $\alpha_s\in[0,1]$: probability of buying the advertiser's brand at price 0, with no competition;
> - $\beta_s\in\mathbb R$: drop in purchase probability per unit price increase. Usually $\beta_s>0$.
>
> At unit price $p_t>0$,
> $$
> r^{(y^*)}_{t,s}=(\alpha_s-\beta_s p_t)\vee0\wedge1 .
> $$
> Segments with high favorability, loyalty or availability should have **higher $\alpha_s$ and smaller $\beta_s$**.
^def-amss-demand-curve

**Figure 5 (p.19)** shows competition-free demand curves for purchase-state, switcher, average-availability segments:
favorable (solid, highest intercept), somewhat favorable (dash), neutral (dot), unaware (long dash) and negative (the caption's word for Table 1's *unfavorable* level)
(dot-dash, lowest). The lines fall linearly in price to zero.

> [!definition] Competitor strength and substitutability (§2.4.1, pp.18-19)
> - $\gamma=(\gamma_{t,s})\in[0,1]$: probability a segment-$s$ consumer buys a **competitor** brand at time $t$ when
>   the advertiser's price is so high that it sells nothing.
> - $\omega=(\omega_{t,s})\in[0,1]$: how far brand and competitor sales **replace** each other.
>   - $\omega=1$: competitor sales are unaffected by the advertiser's price, and competitors take as much as possible.
>     This is the default for **competitor-loyal** consumers (Fig. 6 top).
>   - $\omega=0$: advertiser sales are unaffected by competition, and the advertiser takes as much as possible. This is
>     the default for **loyal** consumers (Fig. 6 bottom).
>   - $\omega=0.5$: the default for **switchers** (Fig. 6 middle).
>
> Purchase probabilities are
> $$
> r^{(z)}_{t,s}=\bigl\{\gamma_{t,s}-(1-\omega_{t,s})\,r^{(y^*)}_{t,s}\bigr\}\vee0,\qquad r^{(y)}_{t,s}=\max\bigl(r^{(y^*)}_{t,s},\gamma_{t,s}\bigr)-r^{(z)}_{t,s}.
> $$
^def-amss-competition

**Figure 6 (p.20)** plots the probabilities against price. The light region is the competitor's share $r^{(z)}$ and the
dark region is the advertiser's share $r^{(y)}$, shown for $\omega=1$, $1/2$ and $0$. Total category purchase is
$\max(r^{(y^*)},\gamma)$. $\omega$ decides how that total is split where the two curves overlap.

> [!definition] Sales draws (§2.4.1, p.19)
> Let $a^{(w)}_{t,K,s}$, $a^{(y)}_{t,K,s}$ and $a^{(z)}_{t,K,s}$ be the numbers who buy nothing, buy the advertiser's
> brand, and buy a competitor's:
> $$
> \bigl(a^{(w)},a^{(y)},a^{(z)}\bigr)_{t,K,s}\sim\text{Multinomial}\bigl(n_{t,K,s},\ (1-r^{(y)}_{t,s}-r^{(z)}_{t,s},\ r^{(y)}_{t,s},\ r^{(z)}_{t,s})\bigr).
> $$
> With $\lambda^{(y)}$ the mean units per category purchaser, brand units are
> $$
> y_{t,s}\sim a^{(y)}_{t,K,s}+\text{Poisson}\bigl(a^{(y)}_{t,K,s}(\lambda^{(y)}-1)\bigr),
> $$
> and **revenue** $=y_{t,s}\,p_t$. The paper describes competitor units $z_{t,s}$ but does not write them out; they
> presumably follow the same form.
>
> **Profit.** §2.4.2 (p.20) opens with "In addition to calculating sales, revenue, and profit, the sales module also
> models post-purchase changes". So **profit** is listed as a sales-module output alongside sales and revenue, but the
> paper never defines it. It gives no cost-of-goods or margin parameter, and the ROAS ground truth in §3 is stated in
> revenue terms. A natural reading is revenue minus unit costs, possibly net of media spend, but that is not in the
> source.
^def-amss-sales-draws

> [!definition] Post-purchase migration (§2.4.2, pp.20-21; §2.2.5, p.11)
> Two migrations take $n_{t,K,\cdot}$ to $n_{t+1,1,\cdot}$:
> 1. **Satiation.** For unsatiated $s\in\mathcal B$, the affected population is every category purchaser,
>    $a_{t,K,s}=a^{(y)}_{t,K,s}+a^{(z)}_{t,K,s}$. Each moves deterministically to the matching satiated segment
>    $g(s)=(s_1,\text{satiated},s_3,\dots,s_6)^\top$, i.e. $q^{(t,K)}_{s,s'}=\mathbf 1_{\{g(s)\}}(s')$. Apply Eqs. 1-2.
> 2. **Brand-state update.** Purchase experience can create habit or preference. Matrices $\mathcal Q^{(K,l)}$ for
>    $l=4,5,6$ drive the migration as in a media event (C.1), "except the frequency is ignored."
^def-amss-post-purchase

Satiated purchasers are then subject to de-satiation at rate $\lambda$ in later weeks
([[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-desatiation]]). That is the mechanism
behind post-promotion dips.

## Examples

> [!example] Sales parameters in the simple scenario (§4.1.1, p.26)
> **Setup.** Price is a constant \$40. Everyone is a **switcher** with **average** availability, so purchase probability
> varies only with favorability. At \$40 the advertiser purchase probabilities are $(0.014,0,0.2,0.3,0.9)$ for (unaware,
> negative [= Table 1's *unfavorable*], neutral, somewhat favorable, favorable). $\gamma\equiv0.8$ and $\omega\equiv0$, which removes competitor
> effects on advertiser sales. Satiation is switched off: buyers stay in-market and active.
>
> **Implication.** With $\omega=0$, $r^{(z)}=(0.8-r^{(y^*)})\vee0$ and $r^{(y)}=\max(r^{(y^*)},0.8)-r^{(z)}=r^{(y^*)}$.
> Advertiser sales therefore depend only on favorability. TV's value comes entirely from moving people up the
> favorability ladder: from neutral (0.2) to somewhat favorable (0.3) is +0.1 per purchase-state person, and from
> somewhat favorable to favorable is +0.6.
^ex-amss-sales-parameters-simple-scenario

> [!example] Worked competition arithmetic (illustrative)
> **Setup.** A switcher segment with $\alpha_s=0.6$, $\beta_s=0.01$, $p=\$20$, so $r^{(y^*)}=0.4$. $\gamma=0.5$,
> $\omega=0.5$.
>
> **Solution.** $r^{(z)}=0.5-0.5\cdot0.4=0.3$. $r^{(y)}=\max(0.4,0.5)-0.3=0.2$. No purchase: $1-0.2-0.3=0.5$.
>
> **Interpretation.** Category purchase is 0.5. The advertiser keeps half of its competition-free 0.4. A price cut to
> $p=\$0$ gives $r^{(y^*)}=0.6$, $r^{(z)}=0.2$ and $r^{(y)}=0.4$: some sales are stolen from the competitor and the
> category grows to 0.6.
^ex-amss-worked-competition-arithmetic

## Connections

- **Price effects in MMM.** Price enters as a demand-curve movement, which is distinct from media's segment-shifting
  effect. See [[Price and Distribution Effects]]. Competitive reactions, which AMSS simplifies away, are covered in
  [[Reaction Functions and Competitive Dynamics]].
- **Base vs incremental sales.** Base sales are the sales under an all-budgets-zero counterfactual. They come out of
  this event fed by the natural-migration equilibrium. In the simple scenario they are about 95% of total sales
  ([[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]).
- **Availability as a sales lever.** Availability affects sales only through $\alpha_s,\beta_s$. Distribution changes
  are modelled as availability migrations.

## See Also

- [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]
- [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]: revenue $y\cdot p$ is the ROAS numerator
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
