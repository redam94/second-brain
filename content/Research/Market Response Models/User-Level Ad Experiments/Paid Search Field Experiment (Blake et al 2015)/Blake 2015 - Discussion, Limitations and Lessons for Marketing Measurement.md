---
title: "Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§6 Discussion pp. 21-24, fn. 30-35; §1 pp. 4-5 fn. 10-13; references pp. 25-26 (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]"
  - "[[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]]"
  - "[[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]]"
  - "[[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]]"
used_by:
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Brand Keyword Prisoner's Dilemma
  - Why Firms Overspend on Search Ads
---

# Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement

> [!summary]
> §6 asks why well-known brands spend so much on a channel that, measured causally, barely works. The authors' answer is that firms **cannot measure causal returns**: spend-on-sales regressions, attribution and even the platform's own ROI advice all ignore the fact that searchers would have bought anyway. They add that publishers, ad agencies and analytics consultancies all have incentives aligned with *larger* budgets. Brand-keyword bidding may be a Prisoner's Dilemma between competitors, from which the platform profits. Caveats: results are short-term, for a very well-known brand, from a geo-level (not user-level) design. Small, unknown advertisers may well benefit. For analysts, the lessons concern endogenous spend, attribution versus incrementality, and the need for experimental calibration.
^disc-summary

## Overview

The discussion has five threads: generalisation, long-run effects, brand-keyword strategy, why the measurement industry gets it wrong, and design limitations.

## Main Content

### 1. Generalisation (p. 21-22, fn. 30)

- In 2011 the top 10 US internet ad spenders (about \$2.36B of \$31.7B) "generally use the same methods and rely on the same external support" (p. 21-22). The authors expect the results to carry over to large, well-known firms.
- They may **not** carry over to small or new entrants with no brand recognition. Footnote 30: a new site selling a cheap, high-quality "widget" would not rank organically for "widget", because PageRank depends on established inbound links. For such a firm paid search may be the only route to the query.

### 2. Long-term effects (p. 22, fn. 34)

One defence of SEM is long-run benefit that a 60-day test misses. The authors respond that most spend reaches customers already well aware of eBay, who keep visiting without ads, so long-run benefits are likely "limited and small" (p. 22). They point out that one could compute the customer lifetime value an acquired user would need to justify a −63% short-run ROI, but leave this for future work (fn. 34; see [[Customer Lifetime Value - Overview]]).

### 3. Brand keywords as a Prisoner's Dilemma (p. 22, fn. 31)

> [!definition] Brand-bidding Prisoner's Dilemma (§6)
> Two firms $A$ and $B$ each choose whether to bid on their own and on the rival's brand terms. If neither bids, each gets its own navigational traffic for free. If one bids on the other's brand it "pinches" some traffic, so each has an incentive to defect, and each then also buys its own brand defensively. In equilibrium both pay, both are worse off than under mutual restraint, and the search platform collects the rent from this "rent-seeking game" (p. 22).
^def-brand-pd

**Evidence.** After eBay stopped bidding on its brand keywords, competitors were *not* seen moving onto them. Some retailers bid on "broad" brand phrases such as "ebay shoes", both before and after. Several advertisers have pursued litigation, unsuccessfully, to stop competitors bidding on their trademarks, which suggests they recognise the dilemma (fn. 31).

### 4. Why the industry over-invests (pp. 22-24)

- **Measurement.** "typical regressions of sales on advertising spend result in astronomical ROI estimates" (p. 22). The text cites "Table 5" here, but the numbers referred to are those of Tables 3-4 in this working-paper version (Table 5 is the German brand test), so it is apparently a numbering slip. The same pattern holds for display ads: Lewis, Rao & Reiley (2011) found an experimental lift of **5.4%** in brand-related searches against **871%-1,198%** from observational regressions (fn. 32; [[Observational vs Experimental Methods in Advertising]], [[Activity Bias in Advertising]]).
- **Attribution.** Industry relies on attribution, which links clicks to purchases. By that measure eBay's search ads did very well: they earned clicks, and attributed sales fell 72% when they were turned off (Fig. 3a). Those clicks did not become incremental sales.
- **Platform-run studies.** Chan et al. (2011a), from Google, report that about **89%** of paid clicks are incremental. Blake et al. agree that most of eBay's paid clicks are not recovered without ads, but most did not produce incremental *sales* ([[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]]).
- **Platform ROI advice.** The paper quotes in full the advice Google gave advertisers on its AdWords support page (retrieved March 2013, fn. 33):

  > "Determining your AdWords ROI can be a very straightforward process if your business goal is web-based sales. You'll already have the advertising costs for a specific time period for your AdWords account in the statistics from your Campaigns tab. The net profit for your business can then be calculated based on your company's revenue from sales made via your AdWords advertising, minus the cost of your advertising. Divide your net profit by the advertising costs to get your AdWords ROI for that time period." (§6, p. 23)

  In formula terms the advice is $\text{ROI}_{\text{AdWords}}=(R^{\text{attributed}}-C)/C$, where $R^{\text{attributed}}$ is revenue from sales "made via" the ads, i.e. click-attributed revenue. The paper's eq. (9) uses $\Delta R$, the *incremental* revenue. The authors call the advice "akin to running a regression of sales on AdWords expenditures, which is not too different from the approach that results in the inflated ROIs that we report in Columns (1) and (2) of Table 5" (p. 23). (Table 5 should be Table 4 here, the same numbering slip as above.) They say it "does not, however, account for the endogeneity concern that our study highlights where consumers who use paid search advertising on their way to a purchase may have completed that purchase even without the paid search ads" (p. 23). The quote and its critique are **dropped** from the Econometrica version ([[Blake 2015 - Working Paper vs Econometrica Version Differences]]).
- **Incentives.** Ad platforms, publishers and analytics consultancies all benefit from bigger budgets. Methods that inflate ad efficacy justify those budgets, which may not serve advertisers' bottom lines (p. 24).
- **Practice gap.** Scholars use natural experiments (Goldfarb & Tucker 2011b) or controlled experiments (Lewis et al. 2011). Industry, including most marketing analytics consultancies, mostly uses observational data.

### 5. Design limitations (p. 24, fn. 35) and further caveats

The authors' own:
- The **ideal** would be user-level randomization with user-level covariates. Geo randomization was the feasible design in 2012, and they expected better targeting technology to make individual-level online experiments possible. Anderson & Simester (2010) achieve this with addressed catalogues (fn. 35).

Further caveats implied by the design (this note's synthesis, not stated as limitations by the authors):
- **ITT dilution** from location misclassification (fn. 20), which biases towards zero.
- **Revenue, not profit.** ROI is on revenue (gross merchandise value scaled to revenue), so profit ROI would be lower still.
- **Public, not internal, inputs** for $R_1$ and $S_1$ (§5).
- **Common shock.** Brand ads were halted *nationally* about 6 weeks into the non-brand test (fn. 18). That affects both arms, but it changes the context in which non-brand ads are evaluated.
- **Re-randomization.** The stratified draw complicates design-based inference. The candidacy checks address bias, not exact inference ([[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]).
- **One advertiser, one era.** eBay in 2012, Google search, US and Germany.

### What the literature footnotes actually say

- **fn. 10 (§1, p. 5), demographic heterogeneity.** "Using rich internet data, other recent papers have shown heterogeneous responses of consumers along demographic dimensions such as age, gender and location", citing Lewis & Reiley (2014a) and Johnson et al. (2014). The paper's own contribution is heterogeneity by *information*, measured as purchase frequency and recency, rather than by demographics. Its zip-code check on demographics (income, population, unemployment, household size, eBay penetration) found nothing significant ([[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]]).
- **fn. 11, SEM via other methods.** Sahni 2011; Rutz & Bucklin 2011; Yao & Mela 2011; Chan et al. 2011b; Reiley et al. 2010; Yang & Ghose 2010.
- **fn. 12, measurement critiques.** Edelman (2013) raises the concern that industry "attribution models" may overestimate ad efficacy. Lewis & Rao (2013) show that many experimental ad campaigns have serious power problems, which leads to wide confidence intervals. That working paper ("On the near impossibility of measuring the returns to advertising") became Lewis & Rao (2015, QJE), see [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]. Its derivation of why ROI intervals are so wide is in [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]. In return, Lewis & Rao single out this eBay experiment as the rare case large enough to change an advertiser's strategy ([[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]]).
- **fn. 14 (§2, p. 6), search vs display.** Search ads "differ from display (or banner) ads that appear on websites that the consumer is browsing, and are not a response to a search query entered by the consumer". The authors focus on Google "primarily because it is the leading search platform". The distinction matters for the paper's theory: a query-triggered ad reaches someone already looking, so it can only *inform*. The paper speculates that display ads, shown without a query, may play a more persuasive role (§1, p. 4, fn. 9: Manchanda et al. 2006; Goldfarb & Tucker 2011a; Lewis & Reiley 2014b).

### Related literature named in the paper (§1 fn. 10-12, §6)

| Thread | Works cited (as in the reference list) |
|---|---|
| Economics of advertising | Bagwell 2007; Ackerberg 2001; Berndt 1991 |
| Position auctions | Edelman, Ostrovsky & Schwarz 2007; Varian 2007; Athey & Ellison 2011 |
| SEM empirics | Sahni 2011; Rutz & Bucklin 2011; Yao & Mela 2011; Chan, Wu & Xie 2011; Reiley, Li & Lewis 2010; Yang & Ghose 2010; Goldfarb & Tucker 2011b; Chan, Yuan, Koehler & Kumar 2011 |
| Display and online ad experiments | Manchanda et al. 2006; Goldfarb & Tucker 2011a; Lewis & Reiley 2014a,b; Johnson, Lewis & Reiley 2014; Lewis, Rao & Reiley 2011; Lewis & Rao 2013 |
| Measurement critique | Edelman 2013 (attribution models); Lewis & Rao 2013 (power), published as [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview\|Lewis & Rao 2015]] |
| Geo experiments | Vaver & Koehler 2011 |
| Targeting and CRM | Goldfarb 2012; Fader, Hardie & Lee 2005; Gönül & Shi 1998; Anderson & Simester 2010 |

### Published version and later developments

**Econometrica version.** The paper's design, estimates and headline conclusions are unchanged in the Econometrica version (83(1), January 2015). The text was compressed: most regression tables moved to an online supplement, the ROI table became Table 1, and the AdWords ROI quote and the user-level-randomization paragraph were dropped. The checked list is in [[Blake 2015 - Working Paper vs Econometrica Version Differences]].

**Later work (outside this source, not verified against it).** Later brand-keyword studies (e.g. Simonov, Nosko & Rao, Marketing Science 2018) examine how the value of brand bidding depends on whether competitors bid on the brand. This qualifies the "no value" result for brands that face real competitive poaching. Check that literature before applying the eBay finding to a contested brand term.

**How sibling papers in this cluster use Blake et al.**
- Gordon et al. (2019) cite it as the paid-search benchmark whose geo-level design "cannot implement individual-level causal inference methods", which motivates their user-level Facebook RCTs ([[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]], [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]], [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]]).
- Lewis & Rao (2015) cite it as "easily the largest" ad experiment in published work, and the one that changed the firm's strategy ([[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]]). They also cite it as documenting the industry's regression-based practice ([[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]).

## Examples

> [!example] Lessons translated into a measurement checklist for a paid search line in an MMM
> 1. **Do not trust the spend coefficient for a click-priced channel** without exogenous variation. Its spend series is a function of demand ([[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]).
> 2. **Separate brand from non-brand** in the model and in tests. Their incrementality can differ by an order of magnitude.
> 3. **Calibrate with a geo holdout** ([[Geo-Experiment Methodology - Overview]]), and feed the resulting ROI interval in as a prior ([[Q - Using Experiment Results as Priors in a Bayesian MMM]]).
> 4. **Look at who clicks.** If attributed buyers skew to loyal customers, expect low incrementality.
> 5. **Report intervals against break-even**, not just point estimates. A −63% point estimate with a [−124%, −3%] interval is a decision-relevant statement, while "+0.66%, not significant" is not.
> 6. **Prefer simulators with known ground truth** to check whether your MMM recovers a near-zero search effect ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]).
^disc-ex-2

## Connections

- The incentive argument (everyone in the chain benefits from inflated efficacy) parallels the analytic-flexibility and publication incentives in [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] and [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
- Optimising to attributed conversions is a Goodhart failure ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
- Model-risk framing (independent "effective challenge" of vendor-reported ROI): [[SR 11-7 - Model Risk Management Guidance - Overview]].
- User-level designs the authors anticipated: [[Conversion Lift Studies on Ad Platforms]], [[Intent-to-Treat, PSA and Ghost Ad Designs]], [[User-Level vs Geo-Level Experiments - When to Use Which]].

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Working Paper vs Econometrica Version Differences]]
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]] — the published form of the Lewis & Rao (2013) power critique cited in fn. 12
- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] — user-level RCT benchmark that positions itself against this geo design
- [[Experimental Benchmarks for Observational Ad Measurement]]
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]
