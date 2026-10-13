---
title: "Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - topic/econometrics
  - type/method
  - type/theorem
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "§4.1 pp. 13-14, eq. (3)-(4), Table 3; Appendix 'ROI Results in Levels' p. 31, Table 8 (NBER WP 20171)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]]"
  - "[[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]"
  - "[[Instrumental Variables]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]"
  - "[[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]"
aliases:
  - Paid Search Endogeneity Gap
  - Log Spend Elasticity OLS vs IV (Blake)
---

# Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap

> [!summary]
> How badly does the usual industry regression of sales on ad spend mislead for paid search? On eBay's DMA-day data, the log-log OLS elasticity of revenue on spend is **0.885**: 10% more spend, 9% more revenue. Adding DMA and date fixed effects lowers it to **0.126**. Instrumenting log spend with the experiment's DiD indicators gives **0.004** (0.0019 with fixed effects), statistically zero and "almost two orders of magnitude smaller". A level regression gives \$0.199 of revenue per \$1 of spend (ROI −80%). Fixed effects remove the seasonal/regional (firm-side) confounding but not the consumer-intent confounding, which only the experiment breaks.
^olsiv-summary

## Overview

This note covers the paper's quantification of "the magnitude of the endogeneity problem" (p. 13). It compares the elasticity an analyst gets without an experiment with the one the experiment identifies.

## Main Content

> [!definition] Naive elasticity regression (eq. 3, p. 13)
> $$\ln(\text{Sales}_{it})=\alpha_1\ln(\text{Spend}_{it})+\varepsilon_{it}\qquad(3)$$
> estimated by OLS on the **pre-test** period (10,500 DMA-days), with and without DMA and date fixed effects. $\alpha_1=\partial\ln\text{Sales}/\partial\ln\text{Spend}$ is the spend elasticity. The authors note that industry practitioners use "some form of equation 3", sometimes with seasonality controls.
^def-naive

> [!definition] First stage with experimental instruments (eq. 4, p. 14)
> $$\ln(\text{Spend}_{it})=\tilde\alpha_1\,\text{AdsOn}_{it}+\tilde\alpha_2\,\text{Post}_t+\tilde\alpha_3\,\text{Group}_i+\epsilon_{it}\qquad(4)$$
> 2SLS with $\text{AdsOn}_{it}$ as the excluded instrument (the DiD interaction; $\text{Post}$ and $\text{Group}$, or the FE, are included controls) and eq. (3) as the second stage. Estimated on the full experimental panel (23,730 DMA-days).
^def-first-stage

**Table 3: Instrument for Return, Dep. Var: Log Revenue** (p. 14)

| | OLS (1) | OLS (2) | IV (3) | IV (4) |
|---|---|---|---|---|
| Log spending | 0.885*** (0.0143) | 0.126*** (0.0404) | 0.00401 (0.0410) | 0.00188 (0.00157) |
| DMA FE | | Yes | | Yes |
| Date FE | | Yes | | Yes |
| N | 10,500 | 10,500 | 23,730 | 23,730 |

* p<.1, ** p<.05, *** p<.01.

> [!note] "Log Revenue" in Table 3 vs $\ln(\text{Sales})$ in eq. (3)
> Table 3's title says "Dep Var: Log Revenue" and the text discusses "a regression of log revenue on log spending" (p. 14), but eq. (3) is written with $\ln(\text{Sales}_{it})$, as are eq. (1)-(2) and Table 2 ("Log Sales"). The paper uses the two words almost interchangeably. Footnote 5 (p. 3) defines sales as "the total dollar value of goods purchased by users on eBay" and says "Revenue is close to a constant fraction of sales, so percentage changes in the two are almost equivalent." In a log regression a constant fraction only shifts the intercept (or the DMA fixed effects), so the slope and the elasticity are the same either way. That is also why Table 4 can combine these elasticities with eBay's *revenue* $R_1$ in the ROI formula. The level regression in Table 8 is explicitly in revenue and cost dollars. The labels are therefore a wording inconsistency, not a different outcome variable, *provided* the take rate really is constant across DMAs and over the test window. The paper asserts this but does not show it.
^note-revenue-vs-sales

> [!note] Why the IV standard error falls 26-fold with fixed effects (0.0410 → 0.00157)
> The paper does not comment on this. A reading from the tables (this note's inference):
> - **Cross-DMA level variation is in the residual without fixed effects.** Log sales differ enormously between DMAs: the Search Group coefficient in Table 2 has an s.e. of 0.168, against 0.0055 for the interaction. In col 3, any DMA-level variation in log sales that the included controls do not absorb stays in the second-stage residual, and a 2SLS standard error scales with the residual standard deviation. DMA fixed effects (col 4) remove it, leaving only day-to-day noise within DMAs.
> - **Col 3 is not just "Table 2 col 1 divided by the first stage".** If col 3 used exactly eq. (1)'s controls (Post and Group) with AdsOn as the excluded instrument, the just-identified IV would equal the reduced form over the first stage. That ratio is 0.00659/3.51 = 0.00188, which is what col **4** reports. Col 3 reports 0.00401, which implies $\Delta\ln$Sales of 0.0141, more than twice the DiD estimate. So col 3 must differ in specification in a way the paper does not spell out, for instance only partly controlling for Group or Post, or a different first stage. Its standard error (0.0410 × 3.51 = 0.144 on the log-sales scale) is about 26 times the DiD s.e. of 0.0055. That is the size you would expect if cross-DMA level differences were left in the residual.
> - **Clustering is not stated.** Table 2's note says "Standard errors, clustered on the DMA"; Table 3's says only "Standard errors in parentheses". If Table 3's IV errors are not clustered, the col 4 s.e. would be too small for day-level serial correlation within DMAs. Its agreement with the clustered DiD s.e. (0.00157 × 3.51 = 0.0055 vs 0.00555) suggests either that it is clustered or that within-DMA serial correlation matters little after fixed effects.
>
> **Practical reading.** Col 4 is the IV to trust. Col 3's −22% ROI with a ±1,700-point interval (Table 4) says nothing either way, and should not be cited as evidence that "IV" gives a negative ROI. See [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects#^warn-roi-text-vs-table]].
^note-iv-se

> [!theorem] Why OLS is biased upward here (interpretation of §1, §4.1)
> Write $\ln\text{Sales}_{it}=\alpha_1\ln\text{Spend}_{it}+u_{it}$, where $u_{it}$ contains purchase intent $I_{it}$. Under click pricing, $\ln\text{Spend}_{it}=\pi\,\text{AdsOn}_{it}+\phi I_{it}+v_{it}$ with $\phi>0$ (people who intend to buy search and click). Then
> $$\text{plim}\,\hat\alpha_1^{OLS}=\alpha_1+\frac{\text{Cov}(\ln\text{Spend},u)}{\text{Var}(\ln\text{Spend})}>\alpha_1 .$$
> DMA and date FE remove the parts of $I_{it}$ that are constant within DMA or common across DMAs on a given day (market size, seasonality), which takes 0.885 to 0.126. They cannot remove DMA-day variation in intent, which still drives clicks. $\text{AdsOn}$ is randomized (up to the stratification) and affects sales only through spend/ad presence, so the IV is consistent: $\text{plim}\,\hat\alpha_1^{IV}=\alpha_1$.
^thm-ols-bias

*Proof sketch.* Standard omitted-variable algebra ([[Omitted Variables Bias]]) with $\text{Cov}(\phi I+v,\,u)=\phi\,\text{Cov}(I,u)>0$. The IV is consistent under relevance ($\tilde\alpha_1\neq0$, which holds strongly: the first stage moves log spend by 3.51) and exclusion ([[Instrumental Variables]]). One caveat (this note's, not the authors'): the "exclusion" here is really "ads affect sales only through being shown". The instrument identifies the effect of the paid search *programme*, and spend is just its scale.

**The first-stage magnitude.** §5 reports the first-stage coefficient $\tilde\alpha_1=\Delta\ln\text{Spend}=3.51$ (Table 4 row C). Log spend in ads-on DMAs is 3.51 higher than in ads-off DMAs during the test, i.e. spend is about $e^{3.51}\approx33$ times higher. Spend does not fall to exactly zero in "off" DMAs because of location misclassification.

**From elasticity to the DiD scale.** Multiplying an elasticity by $\tilde\alpha_1$ gives the implied change in log sales from switching the programme on: $\alpha_1\tilde\alpha_1=\Delta\ln\text{Sales}=\beta_1$. For IV (4), $0.00188\times3.51=0.0066$, which matches the direct DiD estimate $0.00659$. That agreement is a useful internal check. For OLS (1), $0.885\times3.51=3.11$: switching on paid search would supposedly multiply sales by $e^{3.11}\approx22$. See [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]].

### Level specification (Appendix, Table 8, p. 31)

Logs are preferred because sales are very right-skewed across DMAs and days. As a check, eq. (3)-(4) are re-estimated in **dollar levels** (revenue on cost, with DMA and date FE, IV):

**Table 8: ROI in Levels**

| | (1) Revenue (\$) |
|---|---|
| Cost (\$) | 0.199 (0.161) |
| DMA FE / Date FE | Yes / Yes |
| N | 23,730 |

The coefficient is dollars of revenue per dollar of spend, so ROI $=0.199-1=-80\%$. The interval excludes break-even (a coefficient of 1). This is "comparable but slightly more negative" than the −63% from logs, and the log result is kept as the more conservative preferred specification.

## Examples

> [!example] How a typical MMM-style regression goes wrong on a pay-per-click channel
> Weekly data, 104 weeks × 50 regions, with log sales regressed on log search spend plus region and week fixed effects. Within a region-week, a local event (a school term starting, a heatwave) raises intent. Searches, clicks, spend and sales all rise together. The fitted elasticity looks healthy, around 0.1 in the paper's FE column, and implies a four-digit ROI. Only exogenous variation in whether ads are shown (a geo holdout) identifies the causal elasticity, which was about 0.002.
^olsiv-ex-2

## Connections

- The same endogeneity is listed as "ad targeting" selection bias for MMMs in [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]. It is why experiment-calibrated priors matter ([[Q - Using Experiment Results as Priors in a Bayesian MMM]], [[Bayesian Media Mix Modeling - Overview]]).
- Using an experiment as an instrument for a continuous dose is the "encouragement design" logic of [[Local Average Treatment Effects]] and [[Instrumental Variables and Principal Stratification]].
- Unobserved confounding of ad spend in ML models: [[Dillon et al - SHAP and Causal Insights - Overview]].
- Comparable observational-vs-RCT gaps: [[Experimental Benchmarks for Observational Ad Measurement]], [[Observational vs Experimental Methods in Advertising]].

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]
- [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]
- [[GMM Estimation and Instruments for Price Endogeneity]] — the same IV logic for prices
