---
title: "Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - topic/geo-experiments
  - type/method
  - type/application
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§4 intro p. 10; §4.1 Experimental Design and Basic Results pp. 11-13, Fig. 3a-b, eq. (1)-(2), Table 2, fn. 18-22; Appendix: Randomization Procedure Detail pp. 28-29, Candidacy IV eq. (7)-(8) Table 6, Candidacy Difference-in-Differences Table 7 pp. 29-31 (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]]"
  - "[[Differences-in-Differences]]"
  - "[[Standard Errors and Clustering]]"
  - "[[Geo-Experiment Methodology - Overview]]"
  - "[[Instrumental Variables]]"
used_by:
  - "[[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]]"
  - "[[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]]"
  - "[[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]"
  - "[[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]]"
aliases:
  - eBay Non-Brand Geo Test
  - Blake DMA Shutoff Experiment
  - Candidacy IV Check
---

# Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates

> [!summary]
> eBay switched off **all non-brand paid search** on Google in **68 of 210 US DMAs**, chosen by a two-step procedure: random candidacy, then a split stratified on historical sales correlation, then a coin flip. The test ran for about 60 days from spring 2012. Attributed sales in test DMAs fell by more than 72%, yet the DiD effect of the entire paid search programme on log sales is **0.00659 (s.e. 0.0055)**, i.e. +0.66%, insignificant. The result is stable across daily and DMA-period aggregation and fixed-effects specifications. Appendix checks use random candidacy as an instrument (Table 6) and a placebo among never-treated DMAs (Table 7). Both find no bias from the stratification, and the IV gives even smaller effects.
^geo-summary

## Overview

Non-brand ads can reach people who do not know eBay sells the item, so this is where informative advertising could pay off. Endogeneity persists, however, because the ads may also attract users who would have visited anyway. eBay bid on more than 100 million keywords (§1, §4), so a full shutdown measures the value of the *whole* non-brand programme.

## Main Content

### Design (§4.1, Appendix)

> [!algorithm] Treatment assignment procedure (Appendix "Randomization Procedure Detail", pp. 28-29; §4.1 p. 11)
> 1. **Geographic unit.** Nielsen Designated Market Areas (210 in the US), targeted with Google's geographic bid feature. DMAs "typically correspond to large metropolitan areas" but vary a lot in size: the paper's examples are San Francisco, Oakland and San Jose, CA, which together form one large DMA, and Butte and Bozeman, MT, which form a small one (p. 11).
> 2. **Candidacy, purely random.** Draw 133 of the 210 DMAs at random as treatment candidates. The other 77 form the "rest of U.S." control.
> 3. **Stratified split.** Draw a random group of 68 from the 133 candidates and compute the *historical weekly serial correlation* of sales between that group and the remaining 65. Discard draws with very low historical correlation, and keep a draw where the two groups track each other.
> 4. **Coin flip** to decide which of the two groups (68 or 65) has ads turned off.
> 5. **Launch** in the 68 test DMAs on an arbitrary date set by engineering availability. Brand ads stayed on nationally until about 6 weeks into the test, when they were halted everywhere (fn. 18).
> 6. **Duration** about 60 days. Analysis window April-July 2012.
^alg-assignment

The authors call the result "not a purely random sample, but ... an arbitrary sample" with no historical difference in trends (p. 11). The stratification is why the main analysis is a DiD built on common trends rather than a simple post-period comparison. The motivation for turning off only about 30% of DMAs was to limit cost "in the event that the ads created considerable profits" (p. 11).

**Outcome measurement.** Sales are assigned to DMAs by the buyer's **registered shipping zip code**. Only **fixed-price** transactions are used, because auctions can pool bidders from test and control DMAs and attenuate the effect. Results are similar with auctions included (fn. 22). "Sales" means the total dollar value of goods bought, and revenue is close to a constant fraction of sales (fn. 5).

**Misclassification.** Attributed sales do not go to zero in test DMAs (Fig. 3a), because Google's geo-location and eBay's zip-code assignment disagree, e.g. for a traveller who buys while in an ads-on region but ships home. This classification error attenuates the DiD towards zero. The authors argue the IV in Table 3 works on the intensive margin of spend and avoids the problem (fn. 20).

### Figure 3 (p. 12)

- **(a) Attributed sales by region.** Paid-search-attributed sales (purchases within 24 hours of a Google paid click) per DMA per day for test (68, solid), matched control (65, dotted) and rest of US (77, dash-dot), 1 April to 22 July 2012. The y-axis is suppressed to protect proprietary data. It is "in units of dollars per DMA, per day" (fn. 19). The three series move together until about 20-22 May. Then the test series drops to a low, flat level that stays above zero (because of location misclassification), while the two control series carry on as before. Attributed sales in test DMAs fall by **over 72%**.
- **(b) Differences in total sales.** Three daily series comparing mean sales in ads-on and ads-off regions, with the test period shaded from about 22 May. Per fn. 21, "The Y-axis is shown for the ratio, the log difference, and in differences in thousands of dollars per day, per DMA."
  - **Ratio On/Off** (solid, top axis labelled 1.2-1.4): flat at about **1.3** throughout.
  - **Difference On − Off** (dotted, axis labelled 20-60, in **thousands of dollars per DMA per day**): fluctuates around roughly 40-50.
  - **Log(On) − Log(Off)** (dash-dot, axis labelled .2-.4): flat at about **0.25-0.3**, consistent with $\ln1.3\approx0.26$.

  (Levels are read approximately from the plot.) Ads-on regions are about 30% larger, an artefact of the matching algorithm. None of the three series shows a visible break at launch. A raw DiD over April-July says the whole paid search regime adds **0.66%** to sales.

### Estimating equations

> [!definition] Difference-in-differences and two-way fixed-effects specifications (eq. 1-2, p. 12)
> $$
> \ln(\text{Sales}_{it})=\beta_1\,\text{AdsOn}_{it}+\beta_2\,\text{Post}_t+\beta_3\,\text{Group}_i+\varepsilon_{it}\qquad(1)
> $$
> $$
> \ln(\text{Sales}_{it})=\beta_1\,\text{AdsOn}_{it}+\delta_t+\gamma_i+\varepsilon_{it}\qquad(2)
> $$
> - $i$ indexes DMA, $t$ indexes day.
> - $\text{Post}_t=1$ while the test is running.
> - $\text{Group}_i=1$ if DMA $i$ **kept search on**.
> - $\text{AdsOn}_{it}=\text{Post}_t\times\text{Group}_i$.
> - $\delta_t$ and $\gamma_i$ are day and DMA fixed effects, which absorb $\text{Post}$ and $\text{Group}$ in (2).
> - Standard errors are clustered by DMA.
>
> Because the outcome is in logs, $\beta_1$ is approximately the proportional effect on sales of having paid search on.
^def-did-spec

> [!theorem] Identifying assumption: common trends
> $\beta_1$ is causal if, without the intervention, log sales in ads-on and ads-off DMAs would have moved in parallel. In potential-outcome terms, $E[\ln Y_{it}(0)-\ln Y_{i,t'}(0)\mid\text{Group}=1]=E[\ln Y_{it}(0)-\ln Y_{i,t'}(0)\mid\text{Group}=0]$. The stratification on historical serial correlation was designed to make this credible, and the random candidacy step supports the falsification tests below. General treatment: [[Differences-in-Differences]], [[Honest DiD - Sensitivity to Parallel Trends Violations]].
^thm-common-trends

### Table 2: Diff-in-Diff Regression Estimates (p. 13)

| | (1) Daily, eq. (1) | (2) Daily, eq. (2) | (3) Totaled, eq. (1) | (4) Totaled, eq. (2) |
|---|---|---|---|---|
| Interaction ($\beta_1$) | 0.00659 (0.00553) | 0.00659 (0.00555) | 0.00578 (0.00572) | 0.00578 (0.00572) |
| Experiment period | −0.0460*** (0.00453) | | 0.150*** (0.00459) | 0.150*** (0.00459) |
| Search group | −0.0141 (0.168) | | −0.0119 (0.168) | |
| DMA FE | | Yes | | Yes |
| N | 23,730 | 23,730 | 420 | 420 |

SEs clustered on DMA; * p<.1, ** p<.05, *** p<.01.

**Reading Table 2.** The paper states only the observation counts (23,730 DMA-days; 420 DMA-periods) and that the totaled columns aggregate "over days at the DMA level for the pre and post periods separately" (p. 13). The decompositions below are this note's arithmetic, not the paper's.
- **23,730 = 210 DMAs × 113 days.** 113 days is exactly 1 April to 22 July 2012 inclusive (30 + 31 + 30 + 22), which matches the x-axis range of Fig. 3 and the "April through July" window in the text (p. 12).
- **420 = 210 DMAs × 2 periods.**
- **10,500 = 210 × 50** (Table 3's pre-period OLS sample), i.e. 50 pre-test days per DMA.

> [!note] Search Group ≈ 0 in Table 2, yet ads-on regions are "about 30 percent" larger in Fig. 3b
> Table 2 col 1 puts the Search Group coefficient at **−0.0141 (s.e. 0.168)**: no average difference in log daily sales between ads-on and ads-off DMAs. The text and Fig. 3b say "the regions where search remained on are larger (about 30 percent)" (p. 12), i.e. a ratio of about 1.3 and a log difference of about 0.26. These do not contradict each other, because they compare different things (this note's reconciliation; the paper does not discuss it):
> 1. **Different groups.** In eq. (1), $\text{Group}_i=1$ for all **142** ads-on DMAs (65 matched controls + 77 rest of US) against the 68 off DMAs. Fig. 3b plots "daily average sales in the designated control regions where search remained on and the test regions where search is off" (p. 12), which reads as the 65 matched controls against the 68 test DMAs. The text's 30% gap is called "an artifact of the selection algorithm" (p. 12), which concerns the 65-vs-68 split. The 77 rest-of-US DMAs were never part of that split.
> 2. **Mean of logs vs log of means.** Group is the difference in the *average of log sales* across DMAs, which weights each DMA equally. Fig. 3b plots the log (or ratio) of *mean sales* per DMA, which is dominated by the largest DMAs. DMA sales are very right-skewed (the paper's reason for using logs). One or two very large metros on the ads-on side can raise mean sales by 30% while the typical DMA is no bigger. Both statistics can hold at once.
> 3. **Precision.** The s.e. of 0.168 is large: the 95% interval for Group is about [−0.34, +0.31], which includes 0.26. Table 2 therefore cannot rule out a 30% average gap even in logs. The large s.e. reflects how much log sales vary across DMAs, which is also why the DMA fixed effects matter (they remove this level variation without changing $\hat\beta_1$).
>
> For identification the level gap is harmless: DiD and DMA fixed effects difference it out, and only the trend in the gap matters, which Fig. 3b shows to be flat.
^note-group-vs-size

> [!note] Why "Experiment Period" flips sign between the daily and totaled columns
> The paper does not explain this. A consistent reading:
> - In the **daily** columns the outcome is log *daily* sales. The Experiment Period coefficient (−0.0460) is the average change in log daily sales from the pre to the post period, common to all DMAs: daily sales were about 4.5% lower in late May to July than in April to May. That is a seasonal decline, not an ad effect.
> - In the **totaled** columns the outcome is the log of sales *summed over each period*. If the periods have unequal lengths $T_{pre}$ and $T_{post}$, the period coefficient picks up $\ln(T_{post}/T_{pre})$ as well as the daily change: approximately $\ln(T_{post}/T_{pre})-0.046$. Setting this equal to 0.150 gives $T_{post}/T_{pre}\approx e^{0.196}\approx1.22$. With $T_{pre}+T_{post}=113$ this implies about **51 pre days and 62 post days**, i.e. a launch around 22 May 2012. That is consistent with the "60 days" of the design and with the start of the shaded test region in Fig. 3b. The positive 0.150 is therefore mostly an artefact of the post period being longer. (Inference by this note; the paper reports neither period length nor launch date.)
> - The DiD **interaction** is unaffected by period length, because the length effect is common to both groups. That is why cols 3-4 give almost the same $\beta_1$ (0.00578) as cols 1-2 (0.00659).
^geo-note-period-sign

> [!note] Why col (4) still reports Experiment Period despite DMA fixed effects
> DMA fixed effects absorb only time-invariant DMA differences, i.e. the Search Group dummy. They do not absorb the period dummy. Eq. (2) has *day* fixed effects $\delta_t$ as well, and in col (2) those absorb Post. In the totaled data there are only two periods, so "date fixed effects" and the Experiment Period dummy are the same thing, and col (4) reports the period effect as a coefficient. In the Econometrica supplement this table (Table A.II) adds a "Date Fixed Effects" row, ticked for col (2) only. That confirms col (4) is DMA FE + period dummy rather than full two-way FE in the daily sense. The WP's Table 2 omits that row, which makes cols (2) and (4) look identical in specification when they are not.
^geo-note-col4-fe

> [!theorem] Main result: whole-programme effect is about +0.6%, not significant (§4.1)
> In every specification, turning non-brand paid search **on** raises log sales by 0.0058-0.0066, with a standard error of about 0.0055. The 95% interval is about [−0.4%, +1.7%]. Paid search on non-brand terms had "very small and statistically insignificant" effects (p. 13).
^res-main

### Appendix robustness: does the stratified split bias the result?

> [!definition] Candidacy IV (eq. 7-8, Table 6, p. 29)
> Collapse to one observation per DMA ($N=210$). Use the **purely random** candidacy indicator as an instrument for treatment:
> $$
> \ln(\text{Sales}_i)=\beta_0+\beta_1\text{AdsOn}_i+\beta_2\ln(\text{PreSales})_i+\epsilon_i\qquad(7)
> $$
> $$
> \text{AdsOn}_i=\alpha_0+\alpha_1\text{Candidate}_i+\mu_i\qquad(8)
> $$
> Pre-period sales enter both stages to control for DMA size.
^def-candidacy-iv

**Table 6: Candidate DMA Instrument**

| | (1) ln(Test Period Sales) | (2) ln(Test Period Revenue) |
|---|---|---|
| Ads On | 0.00207 (0.0108) | |
| ln(Test Period Cost) | | 0.000795 (0.00350) |
| ln(Pre Period Sales) | 1.007*** (0.00226) | |
| ln(Pre Period Revenue) | | 0.997*** (0.0113) |
| ln(Pre Period Cost) | | 0.00877 (0.0109) |
| Constant | 0.0436 (0.0354) | 0.102** (0.0520) |
| Observations | 210 | 210 |

> [!definition] Candidacy IV, intensive-margin version (Table 6 col 2; equation not printed in the paper)
> The paper writes out only eq. (7)-(8), the extensive-margin (AdsOn) version. Column 2 is described only as instrumenting "test period spending" with candidacy (table note in the Econometrica supplement, Table A.IV; the WP text says the IV estimates "the effect of treatment assignment and advertising spending on revenue", p. 29). Reconstructed from the column's regressors:
> $$
> \ln(\text{Rev}^{test}_i)=b_0+b_1\ln(\text{Cost}^{test}_i)+b_2\ln(\text{Rev}^{pre}_i)+b_3\ln(\text{Cost}^{pre}_i)+e_i
> $$
> $$
> \ln(\text{Cost}^{test}_i)=a_0+a_1\text{Candidate}_i+a_2\ln(\text{Rev}^{pre}_i)+a_3\ln(\text{Cost}^{pre}_i)+u_i
> $$
> Here $i$ is a DMA ($N=210$), "test" and "pre" are totals over the experiment and pre-experiment windows, and Cost is paid search spend (the supplement relabels the rows "Spend"). The controls in the first stage are an assumption, based on the authors' statement that pre-period sales enter both stages in the col 1 version. $\hat b_1=0.000795$ (s.e. 0.00350) is an elasticity of revenue with respect to spend, to be compared with Table 3's IV elasticities 0.00401 / 0.00188. Note that col 1's outcome is labelled "Sales" and col 2's "Revenue". The paper treats these as proportional (fn. 5).
^def-candidacy-iv-intensive

Both the extensive (AdsOn) and intensive (spend) coefficients are **smaller** than in Tables 2 and 3. If the stratification introduced any bias it was upward, which makes the main estimates an **upper bound**. The IV is less precise: 210 rather than 420 observations, it gives up the exogenous timing, and the stratification was itself designed to reduce inter-temporal variance.

**Table 7: Candidate DMA Diff-in-Diff**

| | (1) All DMAs | (2) Ads-on DMAs only |
|---|---|---|
| Interaction | −0.00247 (0.00526) | 0.00124 (0.00653) |
| Candidate for Off DMA | 0.167*** (0.00288) | 1.194*** (0.00358) |
| Experiment period | −0.199*** (0.0117) | −0.195*** (0.0150) |
| Constant | 11.87*** (0.00738) | 11.87*** (0.00924) |
| Date FE / DMA FE | Yes / Yes | Yes / Yes |
| N | 23,730 | 16,046 |

- **Col 1 (intention-to-treat on candidacy).** Treat all 133 candidates as "treated". This is a diluted ITT, since only about half the candidates were switched off. The −0.25% is negative as expected (candidates were the ones at risk of ads off) and "just under half" the main estimate in magnitude.
- **Col 2 (placebo).** Among DMAs that kept ads on throughout, compare the 65 candidate controls with the 77 non-candidates. The coefficient is small and statistically zero, so "the stratification procedure did not create any evidence of a biased treatment assignment" (p. 31).

> [!warning] Unexplained coefficients in Table 7
> Both columns include DMA fixed effects *and* date fixed effects, yet they report coefficients on **Candidate for Off DMA** (time-invariant within DMA) and **Experiment Period** (common to all DMAs on a date), along with a constant. With full DMA and date FE, all three are perfectly collinear with the fixed effects and are not identified. The values are also odd in themselves. Candidate is 0.167 in col 1 but **1.194** in col 2, which would mean candidate DMAs have about $e^{1.194}\approx3.3\times$ the log sales of non-candidates. That is implausible for a randomly drawn candidate set, and the main text says the ads-on regions are only about 30% larger than the off regions. The Experiment Period coefficient (about −0.2) is also four times the daily-specification value in Table 2 (−0.046). The most likely explanation is that the software dropped some fixed-effect dummies for collinearity and loaded their levels onto these regressors, so the reported values depend on which reference DMA and date were dropped and have no substantive meaning. The paper does not comment. Only the **Interaction** row is interpretable, and it is the only row the text uses. The same numbers appear unchanged in the Econometrica supplement (Table A.V).
^geo-warn-table7-coefs

## Examples

> [!example] Reproducing the structure with simulated geo data (Python sketch)
> ```python
> import numpy as np, pandas as pd, statsmodels.formula.api as smf
> rng = np.random.default_rng(0)
> D, T, launch = 210, 113, 60
> size = rng.lognormal(10, 1, D)
> cand = rng.permutation(D) < 133                 # step 2: random candidacy
> idx = np.flatnonzero(cand); rng.shuffle(idx)
> off = np.zeros(D, bool); off[idx[:68]] = True   # steps 3-4 (no stratification here)
> season = 0.1*np.sin(np.arange(T)/10)
> rows = []
> for i in range(D):
>     for t in range(T):
>         ads_on = (not off[i]) or t < launch
>         ly = np.log(size[i]) + season[t] + 0.006*ads_on + rng.normal(0, 0.05)
>         rows.append((i, t, ly, int(not off[i]), int(t >= launch)))
> df = pd.DataFrame(rows, columns="dma day lsales group post".split())
> df["adson"] = df.group*df.post
> fit = smf.ols("lsales ~ adson + C(day) + C(dma)", df).fit(
>     cov_type="cluster", cov_kwds={"groups": df.dma})
> print(fit.params["adson"], fit.bse["adson"])   # about 0.006 +/- 0.005-ish
> ```
> The fitted effect is about the size of the true effect, but its standard error is similar, which is the paper's situation: a well-run test of a large channel can still leave ROI uncertain by ±60 points.
^geo-ex-5

## Connections

- **Geo-experiment practice.** The design, a matched-market split plus DiD, is an early large-scale instance of [[Geo-Experiment Methodology - Overview]]. Modern alternatives that would use the same data: [[Time-Based Regression Estimator for Geo Experiments]], [[Synthetic Control]], [[Synthetic Difference-in-Differences - Overview]]. Their comparison: [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]].
- **Designing on historical similarity.** Re-drawing until groups are similar is a form of re-randomization. It makes nominal randomization-based inference conservative or invalid unless the inference conditions on the acceptance rule ([[Fisher Randomization Test and the Sharp Null]], [[Randomization Inference - Overview]]). The authors respond with the candidacy checks rather than an adjusted test.
- **ITT dilution.** Location misclassification and the diluted candidacy estimate are both ITT-vs-TOT issues ([[From ITT to Treatment-on-the-Treated in Ad Experiments]], [[Local Average Treatment Effects]]).
- **Interference.** Excluding auction sales removes one channel of cross-DMA spillover ([[Interference and Marketplace Experiments]]).

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]] — Table 3, same experiment
- [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]] — turns $\beta_1=0.00659$ into −63% ROI
- [[Geo-Experiment Design and Power Analysis]]
- [[User-Level vs Geo-Level Experiments - When to Use Which]]
