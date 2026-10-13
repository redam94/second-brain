---
title: "Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "Abstract; §1 Introduction pp. 1-6 (fn. 1-13); §2 An Overview of Search Engine Marketing pp. 6-7, Fig. 1a-b, fn. 14-15 (NBER WP 20171 printed pages)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Selection Problem]]"
  - "[[Omitted Variables Bias]]"
  - "[[Activity Bias in Advertising]]"
used_by:
  - "[[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]]"
  - "[[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]"
  - "[[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]]"
  - "[[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]]"
aliases:
  - Click-Priced Spend Endogeneity
  - Intent-Driven Ad Spend Endogeneity
  - Brand vs Non-Brand Keywords (Blake)
---

# Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend

> [!summary]
> The motivation of Blake, Nosko & Tadelis. Internet ads were supposed to fix Wanamaker's problem through **targeting** and **individual-level measurement**. With pay-per-click search ads, though, the advertiser's spend is determined by **consumer behaviour and intent**: you pay only when someone clicks, and the people who click are disproportionately those already heading to you. Spend and sales are therefore correlated even when ads do nothing. This is a different endogeneity from the classic firm-side one, where firms advertise more when demand is high. Brand-keyword ads are its extreme case, and the informative view of advertising predicts that only uninformed consumers respond.
^sem-summary

## Overview

The introduction (pp. 1-6) sets up two findings: (1) conventional methods vastly overstate SEM's causal impact, and the channel is ineffective on average for eBay; (2) SEM does have a detectable effect on new users and infrequent buyers, which supports the *informative* view and makes "targeting uninformed users" (p. 1) the key lever.

## Main Content

### Market context (§1, fn. 1-2, 13)

- US internet ad revenue was \$36.6B in 2012, up 15.2% on 2011. Paid search (SEM) was 46.3% of it (\$16.9B), "up 14.5 percent from \$14.8 billion in 2010" as the paper puts it (p. 1). Source: IAB/PwC Internet Advertising Revenue Report, FY 2012, April 2013 (fn. 1).
- Google had \$46B of global revenue in 2012, \$43.7B (95%) of it from advertising.
- Of the \$31.7B spent on US internet advertising in 2011, the top 10 spenders accounted for about \$2.36B. In order of dollars spent they were IAC/Interactive Group, Experian Group, GM, AT&T, Progressive, Verizon, Comcast, Capital One, Amazon and eBay (Kantar Media press release of 12 March 2012, fn. 13).

### Wanamaker's problem and infra-marginal consumers (§1, p. 1)

The paper opens the measurement problem with the line attributed to the 19th-century retailer John Wanamaker (spelled "Wannamaker" in the paper): "I know half the money I spend on advertising is wasted, but I can never find out which half." (p. 1).

> [!definition] Infra-marginal vs marginal consumers (§1, p. 1)
> Traditional media (TV, radio, print, billboards) have "limited targeting capabilities". Advertisers therefore "waste valuable marketing dollars on 'infra-marginal' consumers who are not affected by ads to get to those marginal consumers who are" (p. 1).
> - **Marginal consumer:** one whose purchase decision is changed by the ad.
> - **Infra-marginal consumer:** one who would buy (or not buy) regardless, so spend reaching them is wasted.
>
> The paper's twist is that search ads do not escape this. Pay-per-click pricing *concentrates* spend on infra-marginal consumers, because those already intent on buying are the most likely to click.
^def-inframarginal

### The promise of internet advertising (§1, pp. 1-2)

1. **Targeting to activity** (Goldfarb 2012). Display ads can be placed next to related content, and search ads can be bid on query terms such as "flat-screen TVs", so spend is not wasted on uninterested shoppers.
2. **Measurement.** The advertiser sees clicks, cost per click and (through its own data) whether the visitor bought. In principle that is enough for an individual-level ROI.

### Two kinds of advertising endogeneity

> [!definition] Classical (firm-side) advertising endogeneity (§1, p. 2)
> Advertising is set by the firm in response to expected demand. Examples: spending more in the holiday season, or setting budgets as a share of last quarter's revenue (Berndt 1991, Ch. 8). Then $\text{Cov}(\text{Spend}_t,\varepsilon_t)\neq0$ because the firm conditions on demand shocks.
^def-classical-endogeneity

> [!definition] Consumer-side (click-priced) spend endogeneity (§1, p. 2)
> Under pay-per-click pricing, realised spend is
> $$
> \text{Spend}_{it}=\sum_{q}\text{CPC}_q\cdot\text{Clicks}_{iqt},
> $$
> and $\text{Clicks}_{iqt}$ is a choice made by consumers whose purchase intent also drives $\text{Sales}_{it}$. Spend therefore rises with intent *mechanically*, whatever the ad's causal effect. A print ad's cost, by contrast, does not depend on reader response. The consumers who click "may already be informed about the advertiser's product" (p. 2) and would have reached the site through another channel.
^def-click-endogeneity

The paper's formal version of the problem is the naive regression $\ln(\text{Sales}_{it})=\alpha_1\ln(\text{Spend}_{it})+\varepsilon_{it}$ (eq. 3), in which $\varepsilon$ contains intent. See [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]].

**Relation to activity bias.** Lewis & Reiley's "activity bias" is a cousin: more active users both see more ads and click more links ([[Activity Bias in Advertising]]). Click-priced endogeneity is stronger, because the *cost* itself is a function of the outcome-correlated behaviour.

### SEM mechanics (§2, Fig. 1)

> [!definition] Paid vs organic search results (§2, pp. 6-7)
> - **Organic (natural) results** are ranked by relevance (Google's PageRank) and are free to the destination site.
> - **Paid (sponsored) results** are ranked by the advertiser's bid times a proprietary **quality score** that depends on the advertiser's past click-through rate (Edelman, Ostrovsky & Schwarz 2007; Varian 2007).
> - **Pricing:** the advertiser pays only when a user clicks.
> - **Position auctions** are argued to align incentives: low-quality firms whose clicks will not convert do not bid, and high-quality firms bid high (Athey & Ellison 2011, fn. 15).
^def-sem

> [!definition] Brand vs non-brand keywords (§2, §3)
> - **Brand keyword:** any query containing the advertiser's name, e.g. "macys" or "ebay shoes". Fig. 1b shows a single paid ad for Macy's sitting *directly above* the organic link to the same page. A click on the first costs money, a click on the second is free.
> - **Non-brand keyword:** a product query that many retailers could serve, even if it contains a product brand, e.g. "used gibson les paul". Fig. 1a shows 2 top paid ads, 5 thumbnail-photo ads, 7 right-rail ads and 3 organic results, with eBay appearing in both paid and organic slots.
^def-brand-nonbrand

**Figure 1** (p. 6). (a) Google results page for "used gibson les paul"; (b) results page for "macys".

**Where eBay appears in Fig. 1a (§4.4, p. 19).** The §2 caption only counts the slots: "two in the shaded upper area, five thumbnail-photo ads below the two and seven ads on the right", plus "the three that appear at the bottom" as organic results (p. 6). §4.4 returns to the figure and names eBay's placements: "the second ad from the top, as well as the center image of the guitar below it, are both paid ads that link to eBay, while the two bottom results of the natural search part of the page also link to eBay" (p. 19). So on this one non-brand page eBay holds **two paid slots** (the second top text ad and the centre thumbnail) and **two of the three organic slots**. The authors use this to argue that "some substitution from paid to natural search may occur for non-brand keywords as well", not only for brand terms. See [[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]].

### Scale of eBay's keyword operation (§1, p. 3, fn. 6)

eBay "historically managed over 100 million keywords and keyword combinations using algorithms that are updated daily and automatically feed into Google's, Microsoft's and Yahoo!'s search platforms" (p. 3). The source for this is a trade-press piece, Jon Tullett's "Inside eBay's business intelligence" for ITWeb (fn. 6). Example non-brand keyword strings: **"memory"**, **"cell phone"** and **"used gibson les paul"** (p. 3). Unlike brand terms, where the firm's own site usually holds the top organic slot, organic placement for non-brand terms "vary widely" (p. 3). Even without an organic listing, a consumer can still reach eBay through other channels, for example by typing www.ebay.com.

Footnote 14 (p. 6) separates search ads from **display (banner) ads**: display ads "appear on websites that the consumer is browsing, and are not a response to a search query entered by the consumer". The paper focuses on Google "primarily because it is the leading search platform".

### Why brand terms are the extreme case

On 16 February 2013, Google searches for "AT&T", "Macy", "Safeway", "Ford" and "Amazon" each showed a paid ad directly above the organic link to the same company (p. 3). People who type a brand name intend to visit that site. Brand ads "simply intercept consumers at the last point in their navigational process" (p. 3), the most extreme form of the endogeneity above. The industry rationale for brand bidding is defensive: competitors might bid on your brand (fn. 4, discussed in §6).

### Theory of advertising (fn. 8, §1 p. 4)

> [!definition] Three views of advertising (Bagwell 2007, via fn. 8)
> 1. **Informative:** ads tell consumers about product characteristics, location and prices they did not know.
> 2. **Persuasive:** ads create preference and raise the advertiser's market power.
> 3. **Complementary:** ads enter the utility function directly.
>
> The authors argue SEM is mainly informative, since it responds to a query the user has already typed, and so it should affect only consumers who lack information about the advertiser. Display ads, shown without a query, may be more persuasive. This echoes Ackerberg (2001), where inexperienced consumers responded more to ads than experienced ones.
^def-views-of-advertising

### Preview of results (§1, pp. 3-5)

- Brand test: halting brand ads on Yahoo!/MSN while continuing on Google (the control) showed near-complete substitution to organic traffic.
- Non-brand test: in a random 30% of US traffic (by DMA) all non-brand bidding was stopped for 60 days, and the result was analysed by DiD.
- Heterogeneity: positive effects for new registered users and users with 1-2 purchases in the prior year. Users with 3 or more transactions are unaffected.
- ROI: typical OLS gives "over 4,100%" without and "over 1,400%" with time and geographic controls. The experiment gives −63% (95% CI [−124%, −3%]) and rejects positive returns (p. 5). Note that Table 4 actually prints 1632% for the controlled OLS and §5 says "greater than 1500 percent"; see [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects#^warn-roi-text-vs-table]].

## Examples

> [!example] Why spend–sales correlation appears with zero causal effect (constructed illustration)
> Two weeks, the same bids. In week 2 a seasonal shock doubles the number of people intending to buy. Brand-query volume doubles, so clicks and **spend** double. Sales also double, entirely because of the shock. A regression of log sales on log spend recovers an elasticity near 1, even though turning the ads off would have sent every one of those buyers through the organic link. Column 1 of Table 3 (elasticity 0.885) is this situation in real data.
^sem-ex-2

## Connections

- The same structure, where an input is chosen by or priced on the outcome-generating process, appears in MMM as "ad targeting" selection bias ([[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]) and in the simulator ground truth of [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].
- In DAG terms, intent is a common cause of spend and sales: [[Omitted Variables Bias]], [[The Selection Problem]], and the unobserved-confounding discussion in [[Dillon et al - SHAP and Causal Insights - Overview]].

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]]
- [[Observational vs Experimental Methods in Advertising]]
- [[Advertising and Promotion Effects]]
