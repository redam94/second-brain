---
title: "Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - type/application
  - type/example
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§3 Brand Search Experiments pp. 7-10, Fig. 2a-b, Table 1, fn. 16-17; Appendix 'Conrolled Brand-Keyword Experiments' pp. 27-28, Fig. 6, Table 5 (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]]"
  - "[[Differences-in-Differences]]"
used_by:
  - "[[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]]"
  - "[[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]"
aliases:
  - eBay Brand Keyword Test
  - Brand Search Shutoff Experiment
  - 99.5 Percent Click Retention
---

# Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution

> [!summary]
> Three tests of eBay's **brand-keyword** paid search. (1) **MSN/Yahoo! halt, March 2012.** Paid clicks went to zero, organic clicks rose, and a cross-platform DiD with Google as control shows only 0.529% of total click traffic was lost, so **99.5% was retained**. (2) **Google halt and resume, July 2012.** Total Google-referred clicks fell about 3% in a pre-post comparison with no control. (3) **Germany geo test, Jan 2013.** Brand ads were off in 8 of 16 randomly chosen states, and the three DiD estimates on log sales were −0.00143, −0.00422 and −0.000937 (Table 5, cols 1-3), all small, negative and insignificant. Conclusion: for brand terms, organic search is close to a perfect substitute and brand SEM has no measurable short-term return.
^brand-summary

## Overview

**Brand ads in the wild (§1, p. 3).** As an illustration, the authors note that on **16 February 2013** Google searches for "AT&T", "Macy", "Safeway", "Ford" and "Amazon" each returned a paid ad at the top of the page, directly above the organic link to the same company's site. Users who type such a narrow term "intend to go to that company's website and are seeking the easiest route there" (p. 3), so brand ads intercept them "at the last point in their navigational process" (p. 3). Footnote 4 adds that a web search for "brand-keyword advertising" returns dozens of sites, many from ad-service agencies, urging firms to pay for their own brand terms. The authors call defence against competitors bidding on the brand "Perhaps the only reasonable argument" (fn. 4), and they take it up in §6.

Brand queries are navigational: the user wants to get to ebay.com. If the paid link disappears, the next easiest path is the organic link just below it, which is free. The brand tests check this "substitution hypothesis" (p. 8) directly on traffic, and the German test checks it on sales.

## Main Content

### Test 1: MSN and Yahoo! shutdown (March 2012)

**Design.** eBay stopped bidding on all brand-related terms (any query containing "eBay") on Yahoo! and Microsoft's search platforms, and kept buying them on Google.

**Figure 2a** (p. 8). Daily MSN paid clicks, MSN organic clicks and Google organic clicks, Jan-Jun 2012. Paid clicks drop to zero at the halt and MSN organic clicks visibly rise.

**Estimators.**

> [!definition] Pre-post estimator (Table 1 col 1)
> $$\ln(\text{Clicks}_t^{MSN})=\mu+\tau\,\text{Period}_t+u_t$$
> where $\text{Clicks}^{MSN}_t$ is total (paid + organic) daily clicks from MSN to eBay and $\text{Period}_t=1$ on days with ads off.
^def-prepost

> [!definition] Cross-platform DiD (Table 1 col 2)
> Stack daily traffic from MSN, Google and Yahoo! ($p$ = platform):
> $$\ln(\text{Clicks}_{pt})=\tau\,(\text{MSN}_p\times\text{Period}_t)+\lambda_p+\delta_t+\kappa_p t+u_{pt}$$
> with platform dummies $\lambda_p$, date fixed effects $\delta_t$ and platform-specific linear trends $\kappa_p t$. Google, where brand ads stayed on, controls for seasonality. Results are "very similar" without the date FE and trends (fn. 17).
^def-xplatform-did

**Table 1: Quantifying Brand Keyword Substitution** (p. 9)

| | (1) MSN, log clicks | (2) MSN DiD, log clicks | (3) Google, log clicks |
|---|---|---|---|
| Period | −0.0560*** (0.00861) | | −0.0321* (0.0124) |
| Interaction (MSN × Period) | | −0.00529 (0.0177) | |
| Google | | 5.088 (10.06) | |
| Yahoo | | 1.375 (5.660) | |
| Constant | 12.82*** (0.00583) | 11.33* (5.664) | 14.34*** (0.00630) |
| Date FE | | Yes | |
| Platform trends | | Yes | |
| N | 118 | 180 | 120 |

Standard errors in parentheses; * p<0.05, ** p<0.01, *** p<0.001.

> [!note] Reading the nuisance rows and sample sizes of Table 1 (p. 9)
> The paper interprets only the Period and Interaction coefficients. The rest of the table is read here; everything in this callout is this note's inference, not something the paper states.
> - **Platform dummies and the constant in col 2 carry no information.** MSN is the omitted base platform, so "Google" (5.088, s.e. 10.06) and "Yahoo" (1.375, s.e. 5.660) are level differences from MSN, and the constant (11.33*, s.e. 5.664) is the MSN intercept. Col 2 also has date fixed effects and platform-specific linear trends $\kappa_p t$. With platform trends, each platform intercept is the trend line extrapolated to $t=0$. If dates are coded as day counts from a distant origin, as statistical packages usually do, $t=0$ lies years before the data, and those intercepts are extrapolations that are close to unidentified. That explains standard errors of 5-10 log points, against 0.006 for the constants in cols 1 and 3. Note also that a log-click level gap of 5 between Google and MSN would mean Google sent about 150 times as much traffic, which is not a plausible reading. None of this affects the Interaction coefficient, which is identified from MSN's deviation during the off period relative to the other platforms' trends.
> - **Period is absent from col 2** because the date fixed effects absorb it. Only its MSN interaction is identified.
> - **Sample sizes.** Cols 1 and 3 have one platform each, so N is a count of days: 118 MSN days and 120 Google days, i.e. roughly four-month windows around each halt. Col 2's N = 180 is consistent with **3 platforms × 60 days**. That means the cross-platform DiD uses a shorter window (about 60 days) than the MSN pre-post in col 1 (118 days). The paper states none of these windows.
> - **Significance stars differ from the other tables.** Table 1 (and Table 5) mark * p<0.05, ** p<0.01, *** p<0.001, while Tables 2 and 3 mark * p<.1, ** p<.05, *** p<.01. So Google's −0.0321* in col 3 is significant at 5%.
^note-table1-nuisance

> [!theorem] Result: 99.5% of brand traffic is retained (§3, p. 8-9)
> The pre-post estimate says total MSN click volume fell 5.6%. Once seasonality is controlled for with Google, only **0.529%** of click traffic is lost, so **99.5% is retained**. This is a *lower bound* on retention: some of the lost 0.5% may arrive by other routes, such as typing "ebay.com" into the browser. The 0.5% of all clicks lost equals about **1.5% of paid clicks** (fn. 16).
^res-995

Footnote 16 contrasts Yang & Ghose (2010), who turned paid search off and on for 90 random keywords and found larger traffic differences. The authors explain the gap by their test using a brand term, where substitution is strongest.

### Test 2: Google halt and resume (July 2012)

**Figure 2b** (p. 8). Google paid and organic clicks, June-September 2012. Organic clicks rise when paid search is suspended and traffic moves back to paid when it resumes.

Table 1 col 3: total Google-referred traffic fell **3.2%**. No contemporaneous brand campaign existed to act as a control, and the MSN experience suggests that a proper control would shrink this figure.

### Test 3: Germany geo test (Appendix, pp. 27-28)

**Design.** January 2013. Google allows geographic targeting across Germany's 16 states. Brand ("eBay") keyword ads were suspended in a random half (8 states). Unlike the pre-post tests, this preserves a randomized control.

**Figure 6** (p. 28). Daily log difference in mean sales, Log(On) − Log(Off) states, 1 Dec 2012 to 26 Jan 2013. The treated half is about 5% smaller at baseline, since with only 16 units any split leaves a level difference. The difference does not change after launch, and the day-to-day noise is large.

**Table 5: Brand Test Europe: Difference-in-Differences Estimates** (p. 28)

| | (1) | (2) | (3) |
|---|---|---|---|
| Interaction | −0.00143 (0.0104) | −0.00422 (0.0132) | −0.000937 (0.0140) |
| State FE | Yes | Yes | Yes |
| Date FE | Yes | Yes | Yes |
| Post Jan 1 subset | | Yes | Yes |
| State trends | | | Yes |
| N | 912 | 416 | 416 |

Standard errors clustered on state. Col 1 is the §4.1 baseline specification, col 2 restricts to the less noisy window from 1 Jan 2013, col 3 adds state-specific linear trends.

> [!note] Timing and sample sizes of the German test, reconciled (Appendix pp. 27-28, Fig. 6, Table 5)
> The text says only that the test was conducted "In January 2013" (p. 27). It gives no launch date, end date or window lengths. The numbers fit together as follows (this note's arithmetic):
> - **N = 912 = 16 states × 57 days.** 1 Dec 2012 to 26 Jan 2013 inclusive is 31 + 26 = 57 days, exactly the x-axis range of Fig. 6. So col 1 uses the whole plotted window.
> - **N = 416 = 16 states × 26 days**, i.e. 1-26 January 2013. This is the "Post Jan 1" subset of cols 2-3.
> - **Pre-period.** All of December (31 days) is pre-treatment, plus whatever January days came before launch. The DiD interaction in cols 2-3 is only identified if some January days are pre-launch, so the test must have started after 1 January. How many pre-launch January days there were is not stated and cannot be read off the printed figure. So col 1 has at least 31 pre days against at most 26 post days, while cols 2-3 rest on a short January pre-period.
> - **Why the authors drop December.** They call the January-only data "less noisy" (p. 27) and give no reason. A likely one (this note's reading): December contains the Christmas peak and the post-holiday drop, when online sales swing sharply, and the two halves of the country need not move in step. Dropping it trades a longer pre-period for a cleaner one. Its cost shows in the standard errors, which rise from 0.0104 to 0.0132.
> - **The test is short.** At most 26 post days in 16 units, against about 60 days in 210 DMAs in the US non-brand test. This is why the authors stress that it "is noisier than the U.S. test" (p. 28).
^note-germany-timing

> [!note] Does narrowing the window and adding state trends really shrink the estimate? (p. 28)
> The text says "Narrowing the window and controlling for state trends reduces the magnitude of the estimate, which is consistent with a zero result" (p. 28). Read against Table 5, this holds only for the end points. Col 3 (narrow window + state trends, −0.000937) is smaller in magnitude than col 1 (full window, −0.00143). Col 2 (narrow window only, −0.00422) is about **three times larger** in magnitude than col 1. So narrowing the window alone *increased* the magnitude, and only adding state trends brought it below the baseline. The standard errors (0.0104, 0.0132, 0.0140) are 3-15 times the point estimates, so none of the three can be told apart from the others or from zero. The paper's qualitative conclusion stands, but the monotone story in the text does not match its own table. The same sentence and the same numbers appear unchanged in the Econometrica supplement (Table A.III), see [[Blake 2015 - Working Paper vs Econometrica Version Differences]].
^note-table5-monotonicity

All three estimates are small, negative and insignificant. With only 16 regions the intervals are wide, and there is no public German spend figure, so no ROI interval is reported. The authors conclude there is "no measurable or meaningful short run return to brand spending" (p. 28).

### Interpretation

Removing the paid link raises the prominence of the organic eBay result. Since users intend to reach eBay, they take "the next easiest path" (p. 8). In the authors' words for the summary, "natural search is close to a perfect substitute for paid search" for brand keywords (p. 10).

## Examples

> [!example] Back-of-envelope value of a brand campaign
> Suppose a brand campaign buys 1,000,000 paid clicks a month at \$0.10 CPC (\$100k). If 99.5% of the total traffic is retained without ads (the MSN DiD), the incremental clicks are about 0.5% of total clicks, roughly 1.5% of paid clicks (fn. 16), i.e. about 15,000. The effective cost per incremental click is about \$6.70 rather than \$0.10, and that is before asking whether those clicks convert incrementally (Germany says sales do not move).
^brand-ex-2

## Connections

- A competitive-defence argument for brand bidding (the Prisoner's Dilemma) is taken up in [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]].
- The pre-post estimate (−5.6%) shrinking to −0.5% under DiD is a small lesson in [[Differences-in-Differences]]: seasonality would otherwise have been attributed to the ads.
- The few-unit German test shows the power problem of geo designs with very few regions ([[Geo-Experiment Design and Power Analysis]]; [[Randomization Inference - Overview]] is the natural small-sample alternative to clustered SEs with 16 clusters, see [[Standard Errors and Clustering]]).
- Simulator encoding of organic/paid substitution: [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]] — the non-brand counterpart (42% of paid clicks are new)
- [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]
