---
title: "Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - topic/heterogeneous-effects
  - type/application
  - type/theorem
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§4.2 Consumer Response Heterogeneity pp. 15-18, eq. (5), Fig. 4a-b, Fig. 5a-b, fn. 23-26; §4.3 Product Response Heterogeneity p. 18 (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]"
  - "[[RFM Sufficient Statistics and Iso-Value Curves]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]"
  - "[[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]"
aliases:
  - Paid Search Effect by Purchase Frequency
  - Paid Search Effect by Recency
  - Informative Advertising Evidence (Blake)
---

# Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response

> [!summary]
> The geo experiment is large enough to estimate the effect of paid search separately for user segments, since every segment appears in both test and control DMAs. By **purchase frequency** (0 = new registrant, 1, …, 10 purchases in the prior 12 months), the effect is largest for new users and falls quickly to about zero for anyone buying more than about 3 times a year. By **recency**, effects are tightly zero for recent buyers and rise with time since last purchase: a spline gives +0.02 percentage points per month of absence, and effects are significant for those absent more than a year. Yet **frequent buyers dominate paid search clicks and attributed sales** (Fig. 5), so most spend goes on unaffected users. No product-category pattern was found across 378 categories (under 5% significant, about what chance gives), and zip-code demographics showed no significant moderation. The pattern fits the informative view of advertising.
^het-summary

## Overview

The question is *who* paid search moves. The authors use two RFM dimensions from the CRM literature, recency and frequency (cf. [[RFM Sufficient Statistics and Iso-Value Curves]], Fader, Hardie & Lee 2005), plus product category and local demographics.

## Main Content

### Segment-interacted DiD

> [!definition] Segment-interacted DiD (eq. 5, p. 15)
> $$
> \ln(\text{Sales}_{imt})=\beta_m\,(\text{AdsOn}_{imt}\times\theta_m)+\delta_t+\gamma_i+\theta_m+\varepsilon_{imt}\qquad(5)
> $$
> - $m\in\{0,1,\dots,10\}$ indexes user segments by number of purchases in the 12 months before the experiment. $m=0$ is **new registered users**, $m=1$ bought once, and so on.
> - $\text{Sales}_{imt}$ is the log of total sales to all users in segment $m$, DMA $i$, period $t$.
> - $\theta_m$ are segment dummies, $\delta_t$ and $\gamma_i$ are period and DMA fixed effects.
> - This gives 11 coefficients $\beta_m$, each the total average effect of the paid search regime on that segment. Running 11 separate regressions gives qualitatively similar results (fn. 24). Transaction counts exclude the pre-test DiD window (fn. 23).
^def-seg-did

### Figure 4: Paid Search Impact by User Segment (p. 16)

- **(a) User frequency.** x-axis: the user's purchase count in the 12 months ending 2012-04-01 (0-10). y-axis: % change in sales from −0.05 to 0.15, with point estimates and 95% CIs. The largest effect is for $m=0$ (never purchased). Effects decline quickly with frequency and are near zero for regular buyers (more than about 3 purchases a year).
- **(b) User recency.** x-axis: days since the user's last purchase (0-360 in 30-day bins). Effects are tightly estimated zeros at 0 days and centred on zero at 30 and 60 days. They rise steadily with absence and are large and significant beyond a year. Estimates get noisier at long absences because few lapsed buyers return. The fitted spline is overlaid.

**Approximate values read off Fig. 4** (the paper prints no table for these, so they are this note's reading of the plot, to about ±0.005; y-axis "% Change in Sales" runs −0.05 to 0.15 and is in log points, so 0.10 ≈ 10%):

| Frequency $m$ (purchases, prior 12 months) | Point estimate | Approx. 95% CI | Excludes 0? |
|---|---|---|---|
| 0 | ≈0.10 | ≈0.08 to 0.12 | yes |
| 1 | ≈0.033 | ≈0.01 to 0.055 | yes |
| 2 | ≈0.045 | ≈0.02 to 0.07 | yes |
| 3 | ≈0.023 | ≈0.00 to 0.047 | borderline |
| 4 | ≈0.027 | ≈0.007 to 0.049 | marginally |
| 5 | ≈0.014 | ≈−0.015 to 0.042 | no |
| 6 | ≈0.025 | ≈−0.005 to 0.055 | no |
| 7 | ≈−0.008 | ≈−0.033 to 0.016 | no |
| 8 | ≈0.011 | ≈−0.018 to 0.04 | no |
| 9 | ≈0.012 | ≈−0.015 to 0.04 | no |
| 10 | ≈0.00 | ≈−0.027 to 0.027 | no |

| Recency (days since last purchase) | 0 | 30 | 60 | 90 | 120 | 150 | 180 | 210 | 240 | 270 | 300 | 330 | 360 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Point estimate (≈) | 0.003 | −0.007 | 0.008 | 0.037 | 0.042 | 0.043 | 0.033 | 0.052 | 0.017 | 0.062 | 0.048 | 0.036 | 0.090 |

In the recency panel, only the 360-day bin has an interval clearly above zero (about 0.03 to 0.15). The 0-day interval is tight around zero (about ±0.015). The 30- and 60-day intervals are wider (roughly −0.04 to +0.05) but centred on zero, matching the text's "tightly estimated zero impacts for zero days and consistently centered on zero for 30 and 60 day absences" (p. 15). The 90-330-day intervals are wide (often ±0.05 or more) and straddle zero. The dashed spline rises from about 0 at 90 days to about 0.06 at 360 days.

**What this means for the text's claims.** The m=0 effect (about +10% sales for users with no purchase in the prior year) is the dominant result, roughly three times the m=1-2 effects (+3-5%). The text's statement that effects are "near zero for users who buy regularly (e.g. more than 3 times per year)" (p. 15) fits the plot from m=5 onward. m=3-4 are small and at the edge of significance. The published version adds that "Only the zero purchases effect is statistically distinguishable from other segments", and that the effect-frequency slope from one purchase upward is negative at −0.0038 (s.e. 0.0014) per purchase (Econometrica accepted manuscript fn. 19; not in the WP). So "significant for m=1-2" means significantly different from **zero**, not from the frequent-buyer segments.

> [!theorem] Recency gradient (§4.2, fn. 26)
> Replace the separate recency-bin coefficients with an interaction of the treatment dummy with **days since last purchase**, using a spline with a break at an arbitrarily chosen **90 days**. The treatment effect grows by about **0.02 percentage points per month of absence**. This is statistically distinguishable from zero (s.e. 0.00004577), and pooling across segments gives better evidence of the trend than the noisy separate coefficients.
^res-recency

> [!theorem] Frequency result (§4.2, p. 15-16)
> The causal effect of the non-brand programme is positive and significant for **new registered users** and for users with **1-2 purchases** in the prior year. It is approximately **zero** for users with 3 or more prior-year purchases. Advertising "works only on a firm's least active customers" (p. 16): the customers firms usually call their "worst", while campaigns are usually aimed at high-value repeat customers (Fader et al. 2005).
^res-frequency

> [!quote] The authors' interpretation of Fig. 4 (§4.2, p. 16)
> The paragraph after Fig. 4 draws the informative-advertising conclusion in plain terms:
> - The evidence "supports the informative view where ads affect consumption only when they update a consumer's information set."
> - "Bluntly, search advertising only works if the consumer has no idea that the company has the desired product."
> - "Large firms like eBay with powerful brands will see little benefit from paid search advertising because most consumers already know that they exist, as well as what they have to offer."
> - "The modest returns on infrequent users likely come from informing them that eBay has products they did not think were available on eBay. Active consumers already know this and hence are not influenced."
>
> So the mechanism has two layers. Awareness that the firm exists explains why brand ads do nothing. Awareness of the firm's *assortment* explains why non-brand ads still move infrequent buyers: they know eBay, but not that it carries the item they searched for. The second layer is the authors' conjecture ("likely"). It is not tested, for example by splitting the effect by whether a user had ever bought in the searched category.
^quote-fig4-interpretation

**Supporting literature.** Gönül & Shi (1998) found that direct mail did not move recent buyers, who would buy anyway, and that mailing budget is best spent on those who have not bought recently (fn. 25). Ackerberg (2001) found inexperienced consumers more responsive to ads.

### Figure 5: who gets attributed (p. 17)

- **(a) Buyer Count Mix.** x-axis: purchase-count buckets **1, 2, …, 49, then "50-100" and ">100"** purchases in the 12 months ending 4/1/2012 (51 buckets). Bars: count of all **Buyers** and of **Paid Search Buyers** (those who bought after a paid search click at some point in the prior year). The left axis ("Count of Buyers in Each Group") has no tick labels, so counts are suppressed. The line is **Proportion Tracked** = paid-search buyers ÷ buyers, on the right axis (**0% to 25%**). Shape, read approximately: the buyer bars are tallest at 1 purchase and decline steeply and roughly geometrically, with a long thin tail through 49. They jump back up in the pooled 50-100 and >100 buckets, which collect a wide range of counts. The paid-search-buyer bars are small throughout. The proportion-tracked line **rises almost linearly**, from about **9-10%** at 1 purchase to about 13% at 20, about 16% at 35 and about **18%** at 49, then to about **19%** for 50-100 and about **22%** for >100.
- **(b) Transaction Count Mix.** x-axis: buckets **1 to 50** purchases. Bars: total **Sales** in Q2 2012 to users in each group, and **Paid Search Sales**. The left axis ("Total Sales in Q2 2012 to Users in Each Group") is unlabelled. The line is **Proportion Paid Search** (paid search sales ÷ sales), on the right axis (**0.0% to 6.0%**). Read approximately: the share is about **4.5-4.7%** for 1-5-purchase users and drifts down to about **3.8-4.3%** by 40-50 purchases. That is, it is nearly flat. Sales bars decline with bucket, like 5a. The text: "Even users who buy more than 50 times in a year still use paid search clicks for 4 percent of their purchases" (p. 17).

**Reading 5a and 5b together.** Per *buyer*, heavy users are about twice as likely as one-time buyers to have bought via paid search at some point (22% vs 9%). Per *transaction*, the paid-search share is about the same (around 4%) at every frequency. Heavy buyers make many more purchases, so the absolute volume of paid-search-attributed sales, and hence click spend, is concentrated on them. Fig. 4 shows they are exactly the segment with no causal response.

> [!theorem] Attribution–incrementality mismatch (§4.2, p. 17)
> Paid search **clicks and attributed sales are concentrated among high-frequency buyers**, the segment with zero causal response. Because "the majority of spending on Google is related to clicks by those users that would purchase anyway" (p. 17), most spend is wasted, which explains the negative average ROI in §5. Attribution models "mistakenly treat purchases as causally influenced by ads" (p. 17).
^res-attribution-mismatch

### Local demographics (§4.2, pp. 17-18)

Randomization was by DMA, but outcomes can be measured by zip code. A zip-level regression interacts treatment with income, population size, unemployment rate, household size and eBay user penetration. None of these interactions is statistically significant. The penetration coefficient (registered users per DMA) is **negative**, consistent with less-informed areas responding more.

### Product categories (§4.3, p. 18)

**Framing.** A consumer's susceptibility to search ads depends on how well informed they are about where products are available. Availability varies widely across products, so effectiveness might vary by product type. eBay's categories "vary in competitiveness, market thickness and general desirability" (p. 18), which makes them a natural test. The authors report the outcome as unexpected: "To our surprise, different product attributes did not offer any significant variation in paid search effectiveness" (p. 18). Method: as in §4.2, interact the treatment indicator with dummies for sub-groupings of revenue by sales category. They "explored multiple layers of categorization, ranging from the broadest groupings of hundreds of categories" (p. 18; the sentence is garbled in the source, apparently meaning from the broadest groupings down to hundreds of categories). The prior expectation was that eBay's extensive inventory would let some categories show returns, because customers might not know eBay sells them. In the Econometrica version this subsection moves to the online appendix ("Product Response Heterogeneity").

- **Top-level categories:** treatment interacted with **38** category dummies. Only one is significant, and "with 38 coefficients, at least one will be significant by chance" (p. 18).
- **Granular:** **378** fine categories. Fewer than 5% are significant at the 5% level, which is what chance alone would produce. There is no relation between the ordinal ranking of category effects and features such as sales volume or availability.
- Conclusion: for a well-known company, user intent and user information matter more than product attributes.

## Examples

> [!example] The arithmetic of why the average is negative
> Stylised numbers in the spirit of Fig. 4-5. Suppose 80% of paid-search spend goes on frequent buyers (causal effect 0) and 20% on new or infrequent users with a revenue lift worth \$2 per \$1 spent. The blended return is $0.8\times0+0.2\times2=\$0.40$ per \$1, an ROI of −60%. Moving the whole budget to the responsive segment (if it could be targeted without decay) would give +100%. The headline null hides a profitable niche, but the platform's click-pricing sends budget to the unprofitable segment.
^het-ex-2

> [!example] Multiple comparisons sanity check (§4.3)
> Under the global null, with 378 independent tests at $\alpha=0.05$, the expected number of false positives is $378\times0.05=18.9$, with s.d. $\sqrt{378\times0.05\times0.95}\approx4.2$. The observed "fewer than 5%" (under 19 categories) is entirely consistent with no category effects, so the authors rightly treat any individual significant category as noise.
^het-ex-3

## Connections

- The analysis is a pre-CATE-era subgroup analysis by interaction. Modern equivalents: [[Metalearners for CATE]], [[R-Learner and Orthogonal CATE Estimation]], [[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]].
- The 38-category and 378-category scans are an instance of the forking-paths and multiplicity concerns in [[Multiple Testing Corrections]], [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]] and [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]. Partial pooling would be the Bayesian alternative ([[Partial Pooling as Multiple Comparisons Correction]]).
- The targeting implication (spend on lapsed and new users) links to [[Customer Lifetime Value - Overview]].
- Fig. 5's attributed-vs-incremental divergence is a proxy-metric failure ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]] — the informative-view framing
- [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]
