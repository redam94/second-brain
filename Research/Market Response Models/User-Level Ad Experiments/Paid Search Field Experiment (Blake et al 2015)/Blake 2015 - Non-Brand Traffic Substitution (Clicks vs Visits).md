---
title: "Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - type/application
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§4.4 Where did the Traffic Go? pp. 18-20, fn. 27; §6 p. 23 (comparison with Chan et al. 2011a) (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]]"
  - "[[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]"
  - "[[Instrumental Variables]]"
used_by:
  - "[[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]"
aliases:
  - Incremental Clicks vs Incremental Sales
  - Paid Search Visit Substitution
---

# Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)

> [!summary]
> Unlike brand terms, non-brand ads do generate extra **clicks**. When they were switched off, paid clicks fell 41% but total clicks fell only 2%. The total loss is about 58% of the lost paid clicks, so about **42% of paid clicks were "newly acquired"**. Clicks are not sessions, though. Using the experiment as an instrument, a **1% drop in paid-search visits** (sessions starting with a paid click) **raises organic-search visits by 0.5% and direct-navigation visits by 0.23%**. Most, if not all, of the lost traffic comes back. The general lesson: **incremental clicks ≠ incremental sales**.
^traffic-summary

## Overview

The brand tests showed one door closing and users walking through the next one. For non-brand queries users want *any* site with the product, so substitution is less automatic. eBay can still appear organically (Fig. 1a shows two organic eBay links for "used gibson les paul"), and users who intended to visit eBay can type the URL.

## Main Content

### Why substitution is possible for non-brand terms too (§4.4, pp. 18-19, Fig. 1a)

Brand queries are navigational: users "closed one door and ... simply switched to the next easiest door" (p. 18). Non-brand queries are not, because users are looking for "any destination that has the desired product". The authors still expect some substitution, and they point back to Fig. 1a ("used gibson les paul"). There the second paid ad from the top and the centre guitar image below it are paid ads that link to eBay, and the two bottom organic results also link to eBay (p. 19). Remove the paid ads and a user on that page can still reach eBay through organic results, or "will choose to directly navigate to www.ebay.com" (p. 19). Only experimental variation can tell how many users were actually *directed* by the ads.

### Clicks (§4.4, p. 19)

| Quantity (non-brand test) | Change when ads off |
|---|---|
| Paid search clicks | −41% |
| Total clicks to eBay | −2% (organic clicks are a much larger denominator, fn. 27) |
| Total clicks lost / paid clicks lost | about 58% |
| Implied "newly acquired" share of paid clicks | about 42% |

This "conforms to" Google's own studies finding that most lost paid clicks would not be recouped by organic search (Chan, Yuan, Koehler & Kumar 2011, "Incremental Clicks"). In §6 the authors note those studies put about 89% of paid clicks as incremental.

### Visits vs referring clicks

> [!definition] Referring click vs visit (session) (§4.4, p. 19)
> - **Referring click:** any click on another site that leads to an eBay page. One shopping session can generate many, as users go back and forth between Google and eBay.
> - **Visit (session):** a cluster of page views by the same user.
> - **Paid search visit:** a session that *begins* with a paid search click. Natural-search and direct-navigation visits are defined the same way.
^def-visit

The relevant question is whether paid search increases the number of *sessions*, i.e. of users visiting. In the authors' words, "clicks are lost but revenue is not" (p. 19).

> [!definition] Visit-substitution IV regression (§4.4, pp. 19-20)
> The paper describes the estimator in one sentence: "regressing the log of eBay visit counts from either organic search or from direct navigation on the log of eBay visit counts from paid search, using the experiment as an instrument" (p. 19). Written out:
> $$\ln(\text{Visits}^{c}_{it})=\eta_c\ln(\text{Visits}^{paid}_{it})+[\text{unreported controls}]+e_{it},\qquad c\in\{\text{organic},\ \text{direct}\},$$
> $$\ln(\text{Visits}^{paid}_{it})=\pi\,Z_{it}+[\text{same controls}]+v_{it}.$$
> $\eta_c<0$ measures substitution.
^def-visit-iv

> [!warning] What the paper does not say about this regression
> None of the following is reported, and this note does not guess them:
> - **Unit and period:** DMA-day like Tables 2-3, or DMA-period.
> - **Instrument $Z$:** whether it is the $\text{AdsOn}_{it}$ interaction alone with Post and Group as included controls (as in eq. 4), or all three experiment dummies.
> - **Fixed effects:** whether DMA or date fixed effects are included.
> - **Sample:** whether it is the full 210 DMAs, how many observations, and over what window.
> - **Uncertainty:** standard errors or confidence intervals, and the first-stage strength.
> - **Session definition:** the inactivity threshold that ends a "visit".
>
> By analogy with Table 3 it is most likely a DMA-day 2SLS with the DiD indicators as instruments, but that is an assumption. Treat 0.5 and 0.23 as point estimates of unknown precision. The text and numbers are identical in the Econometrica version (§3.3), which adds one sentence: "This helps explain why we found that clicks are lost but revenue is not."
^warn-visit-iv-unknowns

> [!theorem] Result: lost paid visits come back through organic and direct (§4.4)
> $\hat\eta_{organic}\approx-0.5$ and $\hat\eta_{direct}\approx-0.23$. "We find that a 1 percent drop in paid search visits leads to a 0.5 percent increase in natural search visits and to a 0.23 percent increase in direct navigation visits" (pp. 19-20), from which the authors conclude "most, if not all, of the 'lost' traffic finds its way back through natural search and direct navigation" (p. 20).
^res-visit-sub

### Reconciling "42% of paid clicks are new" with "most, if not all, visits come back"

These two statements look contradictory but measure different things.

1. **Clicks are not visits.** A *referring click* is counted every time a user arrives from Google. In one shopping session a user may bounce between Google and eBay many times (p. 19), so one session can generate several paid referring clicks. Switching ads off removes all of them. If the same user then returns once through an organic link and browses from there, several paid clicks are "lost" but only one session needs to be recovered.
2. **The click figures are aggregate counts.** −41% paid clicks against −2% total clicks means that per 100 lost paid clicks, about 58 total clicks are lost, so 42 are replaced by other referring clicks. This says nothing about whether the *user* came back in a session that began some other way.
3. **The visit figures are session counts by entry channel.** A paid search visit is a session that *begins* with a paid click. Elasticities of −0.5 and −0.23 on much larger organic and direct bases can add up to (nearly) one recovered session per lost paid session.

So the 42% "new" clicks can be mostly *repeat referring clicks within sessions the user would have had anyway*. This is consistent with the sales result: clicks are lost but sessions, and so revenue, are not.

### How much recovery do the elasticities imply?

Let $P$, $O$ and $D$ be baseline paid, organic and direct visits. For a small proportional cut $\epsilon$ in paid visits, lost visits are $\epsilon P$ and recovered visits are $\epsilon(0.5\,O+0.23\,D)$. The **recovery ratio** is
$$\rho=\frac{0.5\,O+0.23\,D}{P}.$$
$\rho=1$ means full recovery. $\rho>1$ would mean switching off ads *raises* total visits, which is implausible, so it signals that the constant-elasticity form is being extrapolated outside its range. The paper does not report $P$, $O$ or $D$, so $\rho$ cannot be computed from the source.

### Why incremental clicks are not incremental sales (§6, p. 23)

The authors contrast their sales-based design with Google's click-based studies. A majority of eBay's paid clicks are not recovered when eBay stops paying, but most of those clicks did not produce incremental sales. "clicks alone are not a source of revenues" (p. 23).

## Examples

> [!example] Which channel mixes are consistent with "most, if not all" recovery?
> Hypothetical shares, not eBay's, which are confidential. Suppose that, per 100 visits, paid search starts 10, organic 30 and direct 60. Then $\rho=(0.5\times30+0.23\times60)/10=(15+13.8)/10=2.9$. That is impossible as literal accounting: switching ads off would almost triple the visits recovered relative to those lost. So with constant elasticities, a channel mix like this cannot be reconciled with the estimates.
>
> For $\rho\approx1$ the paid base must be large relative to the others. For example, paid 25, organic 30 and direct 45 gives $\rho=(15+10.35)/25\approx1.01$, and paid 30, organic 30 and direct 40 gives $\rho=(15+9.2)/30\approx0.81$, i.e. about 80% recovery. In other words, the paper's "most, if not all" reading requires paid search to start a sizeable share of eBay sessions in test-relevant DMAs. Alternatively, the elasticities are local approximations that should not be pushed to a 100% cut, which is what the experiment actually imposed. Elasticities estimated from a near-total shutdown via log-log IV are a crude summary in any case: $\ln(\text{Visits}^{paid})$ falls by a large, discrete amount, so "a 1 percent drop" is a linearisation of a non-marginal change.
>
> **Practical reading.** Treat the elasticities as directional evidence that lost paid sessions largely reappear as organic and direct sessions. Do not treat them as an accounting identity. The sales DiD (+0.66%, n.s.) is the authoritative check that little was lost.
^traffic-ex-2

## Connections

- A click-level KPI ("incremental clicks") optimised in place of incremental sales is a textbook regressional/causal Goodhart case ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
- The [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview|AMSS]] paid search module encodes paid/organic cannibalisation explicitly, which lets measurement methods be tested against a known substitution rate.
- Funnel-metric caution in MMM: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]] — 99.5% retention for brand terms
- [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]
