---
title: "Blake 2015 - ROI Derivation from Experimental Log-Sales Effects"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§5 Deriving Returns on Investment pp. 20-21, eq. (6), Table 4, fn. 28-29; Appendix 'ROI Calculations' pp. 31-33, eq. (9)-(11); Appendix 'ROI Results in Levels' p. 31, Table 8 (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]"
  - "[[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
used_by:
  - "[[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]"
aliases:
  - Blake ROI Formula
  - ROI from Log-Sales DiD Coefficient
  - Paid Search ROI -63 Percent
---

# Blake 2015 - ROI Derivation from Experimental Log-Sales Effects

> [!summary]
> The paper turns a log-sales treatment coefficient $\beta_1$ into a short-term ROI using only total revenue $R_1$ and channel spend $S_1$: $\text{ROI}\approx\frac{\beta_1}{1+\beta_1}\frac{R_1}{S_1}-1$, valid when spend in the "off" condition is about zero. OLS and IV elasticities are put on the same scale by multiplying by the first-stage $\Delta\ln\text{Spend}=3.51$. With public eBay figures (US revenue \$2,880.64M, US paid search spend \$51M) the ROIs are **4,173%** (OLS), **1,632%** (OLS + FE), **−22%** (IV), **−63%** (IV + FE) and **−63%** (DiD). The 95% interval for the experimental estimate is **[−124%, −3%]**, so positive returns are rejected. In levels, ROI is −80%.
^roi-summary

## Overview

§5 makes the coefficients economically interpretable. Actual DMA revenues and costs are proprietary, so public figures are used. Because the formula is a ratio, only $R_1/S_1$ matters (about 56.5 here).

## Main Content

> [!definition] Return on investment (eq. 9, Appendix p. 31-32)
> For spend moving from $S_0$ to $S_1$ with revenue moving from $R_0$ to $R_1$:
> $$
> \text{ROI}=\frac{R_1-R_0}{S_1-S_0}-1\equiv\frac{\Delta R}{\Delta S}-1 .
> $$
> ROI $=0$ is break-even in revenue terms: \$1 back per \$1 spent. The paper uses revenue, not margin, so a break-even channel in this sense can still lose money.
^def-roi

> [!theorem] ROI from a log-sales experiment (eq. 6 / eq. 11)
> Let $\beta_1=\Delta\ln R$ be the DiD coefficient on $\text{AdsOn}$ (eq. 1-2), and let the "off" condition have $S_0\approx0$. Then
> $$
> \boxed{\ \text{ROI}\approx\frac{\beta_1}{1+\beta_1}\cdot\frac{R_1}{S_1}-1\ }
> $$
> **The regression the appendix starts from (p. 32).** The appendix does not restate eq. (1)-(2). It writes
> $$
> \ln(R_{it})=\beta_1 D_i+\delta_t+\gamma_i+\epsilon_{it},\qquad D_i=\begin{cases}1&\text{DMA }i\text{ treated (paid search **off**)}\\0&\text{paid search on}\end{cases}
> $$
> with $\delta_t$ and $\gamma_i$ time and DMA fixed effects.
>
> **Derivation (Appendix eq. 10-11).** For small changes, $\beta_1\approx\frac{R_1-R_0}{R_0}$, so $R_0\approx\frac{R_1}{1+\beta_1}$ (eq. 10). Substituting into (9) with $S_0=0$:
> $$
> \text{ROI}\approx\frac{R_1-\frac{R_1}{1+\beta_1}}{S_1}-1=\frac{\beta_1}{1+\beta_1}\frac{R_1}{S_1}-1 .
> $$
> The authors call this "a well defined and financially correct estimate of the ROI" when $S_0=0$ (p. 32).
^thm-roi

> [!warning] Two inconsistencies in the appendix regression as printed (p. 32)
> 1. **Sign convention is reversed.** In eq. (1)-(2) the regressor is $\text{AdsOn}_{it}$, which equals 1 when paid search is **on**, and Table 2 reports $\hat\beta_1=+0.00659$. The appendix's $D_i$ equals 1 when paid search is **off**. Taken literally, its coefficient would be $\approx-0.00659$, and plugging that into eq. (11) would give $\text{ROI}\approx\frac{-0.00659}{0.99341}\times56.48-1\approx-137\%$, not −63%. The derivation's own step $\beta_1\approx(R_1-R_0)/R_0$, where $R_1$ is the ads-**on** revenue, only works if $\beta_1$ is the effect of turning ads **on**. So eq. (11) must be read with the AdsOn convention of eq. (1)-(2), which is what Table 4 does.
> 2. **The treatment term has no time interaction.** $D_i$ is indexed only by DMA. With DMA fixed effects $\gamma_i$ in the model, a time-invariant $D_i$ is perfectly collinear with them, and $\beta_1$ is not identified. The intended regressor is the DiD interaction $D_i\times\text{Post}_t$, i.e. $\text{AdsOn}_{it}$ up to sign, as in eq. (2).
>
> Neither problem affects any reported number: Table 4 uses the Table 2 coefficient directly. Both are notational slips, and both are carried over unchanged into the published supplement ("ROI Calculations", Econometrica Supplementary Material). See [[Blake 2015 - Working Paper vs Econometrica Version Differences]].
^warn-appendix-sign

> [!theorem] Putting elasticities on the DiD scale (§5, Appendix p. 32-33)
> OLS and IV estimate $\alpha_1=\frac{\Delta\ln\text{Sales}}{\Delta\ln\text{Spend}}$ (eq. 3). The first stage (eq. 4) estimates $\tilde\alpha_1=\Delta\ln\text{Spend}$ caused by the experiment. Because the change in spend is large, $\alpha_1$ is a poor approximation to a percentage change, so instead use
> $$
> \alpha_1\cdot\tilde\alpha_1=\frac{\Delta\ln\text{Sales}}{\Delta\ln\text{Spend}}\cdot\Delta\ln\text{Spend}=\Delta\ln\text{Sales}=\beta_1 ,
> $$
> and substitute into the ROI formula. This makes the OLS, IV and DiD ROIs comparable and turns the IV into a reduced-form estimate.
^thm-elasticity-scale

### Inputs (§5, fn. 28-29)

- **US gross revenue $R_1$ = \$2,880.64M.** The main text (p. 20) says this is "derived from eBay's financial disclosures of Marketplaces net revenue prorated to U.S. levels using the ratio of gross market volume (sales) in the U.S. to global levels". Footnote 28 gives the inputs, but its wording differs: "Total revenues for 2012 were \$7,398" (no unit is printed; the Econometrica version adds "(in millions)"), and the US share is "\$26,424/\$67,763". So the text calls the \$7,398M figure Marketplaces net revenue, while the footnote calls it total revenues. (The footnote cites eBay's January 2013 earnings release. Whether \$7,398M is the Marketplaces segment or company-wide revenue is not settled by the paper itself, and this note does not check the earnings release.) Recomputing $7398\times26424/67763$ gives about \$2,884.8M. The small gap from the paper's figure is presumably rounding in the inputs, and it does not affect any reported ROI to the percent.
- **US paid search spend $S_1$ = \$51M a year.** "Data from Google reports a monthly spend of \$4.25 million, which we impute to be \$51 million" (fn. 29), i.e. \$4.25M × 12. The cited source is a Mashable article dated **6 September 2010**.

> [!warning] The two ROI inputs come from different years (§5, fn. 28-29)
> Revenue $R_1$ uses **2012** financials. Spend $S_1$ is a **2010** monthly figure from a press report, annualised. The experiment itself ran in **spring-summer 2012**. Because ROI depends only on $R_1/S_1$, a timing mismatch moves the result directly. If US paid search spend had grown by 2012 to, say, \$70M, then $R_1/S_1$ would fall from 56.5 to 41.2, and the DiD ROI would be $\frac{0.00659}{1.00659}\times41.2-1\approx-73\%$ rather than −63%. If spend had fallen, the ROI would be less negative. The authors say they use public figures because DMA-level revenue and cost are proprietary, but they do not discuss the year mismatch. The *sign* conclusion is robust: break-even needs $R_1/S_1\geq(1+\beta_1)/\beta_1\approx153$, i.e. spend would have to be below about \$18.9M a year for the point estimate to break even.
^warn-roi-timing
- $R_1/S_1=56.48$.

### Table 4: Return on Investment (p. 21)

| Row | | OLS (1) | OLS (2) | IV (3) | IV (4) | DnD (5) |
|---|---|---|---|---|---|---|
| A | Estimated coefficient | 0.88500 | 0.12600 | 0.00401 | 0.00188 | 0.00659 |
| B | (Std err) | (0.0143) | (0.0404) | (0.0410) | (0.0016) | (0.0056) |
| C | $\Delta\ln$(Spend) adjustment | 3.51 | 3.51 | 3.51 | 3.51 | 1 |
| D = A×C | $\Delta\ln$(Sales) ($\beta$) | 3.10635 | 0.44226 | 0.01408 | 0.00660 | 0.00659 |
| E | Spend (\$M) | 51.00 | 51.00 | 51.00 | 51.00 | 51.00 |
| F | Gross revenue $R_1$ (\$M) | 2,880.64 | 2,880.64 | 2,880.64 | 2,880.64 | 2,880.64 |
| G | ROI | 4173% | 1632% | −22% | −63% | −63% |
| | ROI lower bound | 4139% | 697% | −2168% | −124% | −124% |
| | ROI upper bound | 4205% | 2265% | 1191% | −3% | −3% |

The printed formula for row G reads "A/(1+A)*(F/E)", but the reported values are reproduced with **D** in place of A, minus 1, i.e. $\text{ROI}=\frac{D}{1+D}\frac{F}{E}-1$. Check for col 5: $\frac{0.00659}{1.00659}\times56.48-1=-0.630$. Col 3: $\frac{0.01408}{1.01408}\times56.48-1=-0.216$. (Using A in col 3 would give −77%, not the reported −22%.)

> [!warning] The paper quotes three different OLS + FE ROIs, and the §5 text overstates the IV columns
> **1. Inconsistent OLS figures.** The same two OLS estimates are described three ways:
>
> | Where | OLS without controls (col 1) | OLS with time and geographic controls (col 2) |
> |---|---|---|
> | §1 introduction (p. 5) | "over 4,100%" | "over 1,400%" |
> | §5 text (p. 21) | "over 4000 percent" | "greater than 1500 percent" |
> | Table 4 (p. 21) | 4173% | 1632% |
>
> All three statements about col 1 are true of 4173%. For col 2, "over 1,400%" and "greater than 1500 percent" are both technically true of 1632%, but they are lower bounds that undersell the table, and they disagree with each other. The likely cause is a revised estimate that was not carried through every mention. This note does not know which value came first. Table 4 is internally consistent (D = 0.126 × 3.51 = 0.44226 → $\frac{0.44226}{1.44226}\times56.48-1=16.32$), so **1632% is the figure to cite**. Either way, the point that naive OLS overstates ROI by well over an order of magnitude stands.
>
> **2. "The IV estimation reduces the ROI estimate significantly below zero" (p. 21) holds only with fixed effects.** Table 4 col 3 (IV without fixed effects) gives a point estimate of **−22%**, but its 95% interval is **[−2168%, +1191%]**, which spans zero by a wide margin. Col 3 is *not* significantly below zero. Only col 4 (IV with DMA and date FE) and col 5 (DiD), both −63% with interval [−124%, −3%], exclude zero. The sentence that follows ("our best estimate ... is negative 63 percent as shown in Columns (4) and (5). This ROI is statistically different from zero at the 95 percent confidence level") is correct because it refers only to cols 4-5. Checking col 3's bounds: $\beta=0.01408\pm1.96\times(0.0410\times3.51)=[-0.268,\ 0.296]$, which maps to $\frac{-0.268}{0.732}\times56.48-1\approx-21.7$ and $\frac{0.296}{1.296}\times56.48-1\approx11.9$, i.e. −2168% and +1191%, matching the table. Why col 3 is so much less precise is discussed in [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap#^note-iv-se]].
^warn-roi-text-vs-table

> [!theorem] Headline: the experimental ROI is negative and significantly below zero (§5)
> The preferred experimental estimates (IV with FE, and DiD) give **ROI = −63%** with 95% bounds **[−124%, −3%]**. The upper bound is below zero, so the hypothesis that the channel yields positive short-term returns is rejected at the 95% level. Naive OLS overstates the ROI by more than 4,000 points.
^res-roi

The bounds come from mapping $\beta\pm1.96\,\text{s.e.}$ through the formula: $0.00659\pm1.96\times0.0056$ gives $[-0.0044,\ 0.0176]$, which maps to about $[-125\%,\ -3\%]$.

### Level-regression cross-check (Table 8)

A revenue-on-cost IV regression in dollars gives 0.199 (s.e. 0.161), so ROI $=-80\%$, and the interval excludes the break-even coefficient of 1. The log specification is preferred because sales are heavily right-skewed. See [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]].

### Scope

This is a **short-term** ROI. Footnote 34 notes one could compute the customer lifetime value needed to overturn a −63% short-run ROI and leaves it outside the paper's scope ([[Customer Lifetime Value - Overview]]).

## Examples

> [!example] ROI calculator and break-even lift
> ```python
> def roi_from_log_effect(beta, revenue, spend):
>     return beta / (1 + beta) * revenue / spend - 1
>
> R, S = 2880.64, 51.0
> for b in [0.88500*3.51, 0.126*3.51, 0.00401*3.51, 0.00188*3.51, 0.00659]:
>     print(round(100*roi_from_log_effect(b, R, S)))   # 4173, 1632, -22, -63, -63
>
> # break-even log lift: beta/(1+beta) = S/R  ->  beta* = S/(R-S)
> print(S/(R-S))   # 0.0180 -> paid search must add 1.8% to sales to break even
> ```
> **Interpretation.** Break-even needs $\beta^*=S/(R-S)\approx1.8\%$. The estimate is 0.66% with s.e. 0.55%, so break-even sits about 2.1 standard errors above the point estimate. That is the sense in which the interval excludes zero ROI. For a channel taking 1.8% of revenue, a test must resolve sales effects of about a percentage point, which is [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise|the core power problem]] of ad experiments.
^roi-ex-2

## Connections

- ROI here is an average return over the whole programme (off vs on). Budget decisions need **marginal** ROI ([[ROAS, mROAS, and Optimal Media Mix]]). A negative average ROI implies the marginal one is worse still, if response is concave.
- Experiment-based ROI like this is the quantity used to calibrate MMM priors ([[Q - Using Experiment Results as Priors in a Bayesian MMM]], [[Bayesian Media Mix Modeling - Overview]]).
- The width of the interval relative to the decision threshold is a [[Type S and Type M Errors]] consideration.

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]
- [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]
