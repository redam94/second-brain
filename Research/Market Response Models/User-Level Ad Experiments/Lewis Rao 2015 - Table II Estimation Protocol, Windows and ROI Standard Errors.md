---
title: Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/power-analysis
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§III.B pp. 1955-1961, Table II p. 1958, Figure II p. 1960, fns. 14-16"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]]"
  - "[[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]"
  - "[[CUPED and Regression-Adjusted Variance Reduction]]"
used_by:
  - "[[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]"
aliases:
  - Lewis Rao Table II
  - Lewis Rao Figure II ROI uncertainty and campaign cost
  - Half-the-average-effect rule for evaluation windows
---

# Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors

> [!summary]
> Section III.B estimates each experiment as precisely as the data allow (short post-campaign windows, filtering to post-exposure outcomes, PSA/active-user controls, lagged-sales and behavioural covariates) and still finds a median ROI standard error of **26.1%** for retailers (mean 61.8%) and **115%** for brokerages. Three design results: (1) adding a week to the evaluation window raises $t$ only if that week's effect exceeds about half the average effect of the previous weeks; (2) a covariate $R^2_{|W}$ of 0.40 (lagged sales, the best predictor) cuts standard errors by only 23%, and a tenfold cut needs $R^2_{|W}=0.99$; (3) binarizing sales lowers variance but biases ROI downward when ads move basket size or frequency. Figure II shows ROI uncertainty falling with dose; below \$0.05 per person the RCTs were uninformative.
^lr-table2-summary

## Overview

Table II is the paper's "best effort" estimate of precision for each of the 25 experiments. Its columns (1)-(5) document the *estimation strategy* and (6)-(10) the *key campaign statistics*.

## Main Content

### Evaluation windows

The partner firms followed industry practice: the campaign period plus 1-4 weeks afterwards. Effects could be long-lived, so the bias-minimizing window would be long, but long windows damage power.

> [!theorem] Proposition: When does an extra week help? (§III.B p. 1955-1956, proved in Lewis, Rao & Reiley 2015)
> If the next week's expected causal effect is **less than one-half the average causal effect over all previous weeks**, including that week **reduces** the $t$-statistic of the total treatment effect. Unless the ad effect decays little over time, short windows are power-optimal.
>
> **Sketch.** With independent weeks of equal variance $\sigma^2$, $t_T\propto\sum_{t\le T}\Delta_t/\sqrt T$. Write $S_T=\sum_{t\le T}\Delta_t$. Then $t_{T+1}>t_T$ iff $(S_T+\Delta_{T+1})/\sqrt{T+1}>S_T/\sqrt T$, i.e. $\Delta_{T+1}>S_T(\sqrt{(T+1)/T}-1)\approx S_T/(2T)$, half the running average.
^thm-lr-window-half-rule

> [!example] Example: Three-week window (fn. 15)
> Week-1 effect 5%, week-2 effect 2%. Week 3 adds power only if its effect $z>\tfrac{(5+2)/2}{2}=1.75\%$.
> The authors caution that applying the rule quantitatively "requires precise ROI estimates for the very inference problem we are trying to solve".
^ex-lr-window

The chosen windows thus err toward variance reduction at the possible expense of bias. For "buy it now or never" response patterns (Damgaard & Gravert 2014) the bias is minimal; otherwise the approach overestimates precision somewhat.

### Estimation protocol (Table II columns 2-5)

- **Y** (unit of observation): 1 = daily, 2 = weekly, 3 = total campaign window. Retail: 10 daily, 5 weekly, 4 whole-campaign. Finance: campaign-period totals except one daily.
- **X** (implementation): 1 = randomized control group (all experiments); 2 = control ensured active on the publisher (the majority); 3 = placebo ads shown to control; 4 = multiple treatments.
- **Y&X** (filtering): 1 = sales filtered to after first exposure or first page view; 2 = outcome filtered to a post-exposure time window.
- **W** (controls): 1 = lagged sales (available for 16 retail experiments, not for brokerages, whose campaigns targeted new accounts); 2 = demographics (six experiments); 3 = online behaviours such as browsing intensity (all except firm 2).

Panel techniques "predict and absorb residual variation" using W.

> [!theorem] Covariate adjustment reduces standard errors sub-linearly (§III.B p. 1957, fn. 16)
> Lagged sales were the best predictor, reducing outcome variance by up to 40% (consistent with Deng et al. 2013). Going from $R^2=0$ to $R^2_{|W}=0.40$ reduces the treatment standard error by
> $$1-\frac{\sqrt{1-R^2_{|W}}}{\sqrt{1-R^2}}=1-\sqrt{1-0.40}=23\%.$$
> An order-of-magnitude reduction requires $\sqrt{1-R^2_{|W}}=0.1$, i.e. $R^2_{|W}=0.99$.
^thm-lr-covariate-sublinear

This is the ceiling on [[CUPED and Regression-Adjusted Variance Reduction]] in lumpy retail-purchase data.

### Single-channel assumption and binarization (pp. 1957-1959)

Brokerage ROI uses a fixed lifetime value (\$1,000) per account, which rules out ads affecting heterogeneous value over the customer's lifetime; more generally, assuming a single channel of effect is problematic. Just as sales variance has three components, so does the treatment effect: purchase probability, basket size, frequency.

> [!example] Example: The binarization bias-variance trade-off (p. 1959)
> Converting sales to a purchase indicator removes basket-size and frequency variance (the coefficient of variation fell by up to 40%). But if ads also move basket size (Lewis & Reiley 2014) or frequency (Johnson, Lewis & Reiley 2015), ROI is biased downward. In both cited papers the authors would have **failed** to reject 100%-loss ROI with the binary outcome but found significant effects with continuous sales. Unlike window length, where decay is expected, it is unclear ex ante which component a campaign moves, so the paper keeps continuous sales for retailers.
^ex-lr-binarization

### Table II, Panel A: Retailers (p. 1958)

| Expt. | Y | X | Y&X | W | s.e. sales (\$) | 1.96×s.e., % of sales | Spend / exposed (\$) | Gross margin (%) | s.e. ROI (%) |
|---|---|---|---|---|---|---|---|---|---|
| 1.1 | 2 | 1 | — | 1,2,3 | 0.193 | 4.0 | 0.16 | 50 | 61 |
| 1.2 | 2 | 1 | — | 1,2,3 | 0.226 | 4.2 | 0.06 | 50 | 193 |
| 1.3 | 2 | 1 | — | 1,2,3 | 0.143 | 5.8 | 0.09 | 50 | 84 |
| 1.4 | 2 | 1,2,3 | — | 1,2,3 | 0.912 | 1.4 | 0.34 | 50 | 134 |
| 1.5 | 2 | 1,2 | — | 1,2,3 | 0.244 | 4.2 | 0.04 | 50 | 278 |
| 1.6 | 1 | 1,2,3,4 | 1 | 1,2,3 | 0.207 | 2.3 | 0.12 | 50 | 84 |
| 2.1 | 3 | 1 | — | — | 0.139 | 0.9 | 0.09 | 15 | 24 |
| 2.2 | 3 | 1 | — | — | 0.142 | 0.9 | 0.08 | 15 | 25 |
| 2.3 | 3 | 1 | — | — | 0.131 | 0.8 | 0.09 | 15 | 23 |
| 3.1 | 1 | 1,2,3 | 1 | 1,3 | 0.061 | 9.5 | 0.04 | 30 | 52 |
| 3.2 | 1 | 1,2 | 1 | 1,3 | 0.044 | 8.0 | 0.04 | 30 | 34 |
| 3.3 | 1 | 1,2,3 | 1 | 1,3 | 0.065 | 6.7 | 0.09 | 30 | 22 |
| 3.4 | 1 | 1,2,3 | 1 | 1,3 | 0.051 | 7.8 | 0.06 | 30 | 26 |
| 3.5 | 1 | 1,2 | 1 | 1,3 | 0.049 | 5.5 | 0.07 | 30 | 21 |
| 3.6 | 1 | 1,2,3 | 1 | 1,3 | 0.064 | 4.8 | 0.08 | 30 | 25 |
| 3.7 | 1 | 1,2,3 | 1 | 1,3 | 0.032 | 10.6 | 0.11 | 30 | 9 |
| 4.1 | 1 | 1,2 | 1 | 1 | 0.031 | 10.9 | 0.13 | 40 | 10 |
| 5.1 | 3 | 1,2 | — | 1,3 | 0.215 | 0.8 | 0.11 | 30 | 57 |
| 5.2 | 1 | 1,2 | 1 | 1,3 | 0.190 | 4.4 | 0.39 | 30 | 15 |
| **Mean** | | | | | 0.165 | 4.9 | 0.11 | 34 | 62 |
| **Median** | | | | | 0.139 | 4.4 | 0.09 | 30 | 26 |

### Table II, Panel B: Financial services (p. 1958)

| Expt. | Y | X | Y&X | W | s.e. new accts.\* | 1.96×s.e., % new | Spend / person (\$) | Lifetime value (\$) | s.e. ROI (%) |
|---|---|---|---|---|---|---|---|---|---|
| 6.1 | 3 | 1,2,4 | — | 3 | 69 | 15.6 | 0.06 | 1,000 | 138 |
| 6.2 | 3 | 1,2,4 | — | 3 | 69 | 17.7 | 0.07 | 1,000 | 137 |
| 6.3 | 3 | 1,2,4 | — | 3 | 70 | 10.9 | 0.07 | 1,000 | 93 |
| 6.4 | 3 | 1,2,4 | — | 3 | 70 | 10.5 | 0.07 | 1,000 | 93 |
| 7.1 | 1 | 1,2,3,4 | 1,2 | 3 | 288 | 5.5 | 0.03 | 1,000 | 47 |
| 7.2 | 3 | 1,2 | — | 3 | 46 | 8.3 | 0.02 | 1,000 | 233 |
| **Mean** | | | | | 102 | 11.4 | 0.05 | 1,000 | 123 |
| **Median** | | | | | 69 | 10.7 | 0.06 | 1,000 | 115 |

\*Footnote e: the causal effect is rescaled in new accounts, approximately the regression coefficient on exposure times the number of exposed users.

**Reading the table.**
- s.e. of ROI $=m\cdot\text{s.e.}(\hat\beta)/c$. Check 1.1: $0.5\times0.193/0.16=0.60$ (printed 61%, spend rounded). Check 3.7: $0.3\times0.032/0.11=8.7\%$ (printed 9).
- Median CI radius in % of sales: Table II median 4.4% retail; the text (p. 1957) says "the median radius is 5.5%" (apparently pooling both panels). Spend per exposed person ranges \$0.02-\$0.39, centred on \$0.10.
- Retail median ROI s.e. 26.1% ⇒ 95% CI about 100 points wide, "too wide to be of much practical use" given all but the least informative priors. Finance: median spend \$0.065, all but one ROI s.e. above 93%.

### Figure II: ROI uncertainty and campaign cost (p. 1960)

Scatter-with-lines of ROI standard error (y, 0-300%) against campaign cost per person (x, \$0-\$0.40), one line per advertiser (Retailers 1-5, Financial 6-7). The y-axis label is printed "ROI Stanard Error" (sic). The table below uses Table II values: column (8) is spend per exposed person and column (10) is the s.e. of ROI. I checked each plotted marker against those values on a high-resolution render of p. 1960 (cross-check on 2026-10-13). Agreement, marker by marker:

- **Matches the table.** Retailer 1 (all six points), Retailer 5 (2), Financial 7 (2) and Retailer 4 (one × near \$0.13, 10%).
- **Overlapping markers.** Retailer 2's three campaigns (\$0.08-0.09, 23-25%) show as a single red marker near \$0.085, about 24%. Financial 6 shows three distinct circles (about \$0.06/138%, \$0.07/137% and \$0.07/93%), because rows 6.3 and 6.4 are identical (\$0.07, 93%) and plot on top of each other.
- **Retailer 3 differs from the table.** The green line shows five triangles at about (\$0.036, 52%), (\$0.04, 34%), (\$0.06, 26%), (\$0.07, 21%) and (\$0.08, 25%), and it ends near \$0.08. No triangle appears at row 3.7's (\$0.11, 9%). Row 3.3's (\$0.09, 22%) is either hidden under the Retailer 2 marker or not plotted. The x positions also read slightly below the rounded Table II spends. So the figure appears to leave out 3.7, the most precise retailer-3 campaign. This changes no conclusion, but the figure is not a complete plot of Table II.

Values (from Table II, ordered by cost along each line):

| Advertiser | Points (cost, s.e. ROI) |
|---|---|
| Retailer 1 | (\$0.04, 278%), (\$0.06, 193%), (\$0.09, 84%), (\$0.12, 84%), (\$0.16, 61%), (\$0.34, 134%) |
| Retailer 2 | (\$0.09, 24%), (\$0.08, 25%), (\$0.09, 23%) in the table; plotted as one overlapping marker |
| Retailer 3 | Table II has seven: (\$0.04, 52%), (\$0.04, 34%), (\$0.06, 26%), (\$0.07, 21%), (\$0.08, 25%), (\$0.09, 22%), (\$0.11, 9%). Only the first five are visible in the figure |
| Retailer 4 | (\$0.13, 10%) |
| Retailer 5 | (\$0.11, 57%), (\$0.39, 15%) |
| Financial 6 | (\$0.06, 138%), (\$0.07, 137%), (\$0.07, 93%) ×2 (rows 6.3 and 6.4 coincide) |
| Financial 7 | (\$0.02, 233%), (\$0.03, 47%) |

Takeaways stated in the text:
1. Large heterogeneity across firms: firm 1 (higher sales s.d.) and the financial firms are least precise.
2. Curves slope down with one exception (firm 1's \$0.34 campaign, the 105-day experiment 1.4): "the larger the dose, the better the power", since a bigger dose must produce a bigger absolute effect to deliver the same percentage return.
3. Firm 5's second campaign (\$0.39 per person; over 80 display ads or 30-40 TV ads; 3.5M-person control; pre-period sales and online behaviour as covariates) still had a 95% ROI interval 60 points wide.
4. Firms can buy precision by advertising more intensely than normal (a bias-variance trade in external validity); firms for which low per-person spend is optimal face much harder measurement. RCTs below \$0.05 per person were uninformative; most of those needed to be over 10 times larger to test zero effect.

## Examples

> [!example] Example: Reconciling firm 5's second campaign with the "60 points wide" claim
> Row 5.2: s.e. of sales effect \$0.190, gross margin 30%, spend \$0.39 per exposed person. Then s.e.(ROI) $=0.30\times0.190/0.39\approx14.6\%$ (printed 15). A 95% interval is $\pm1.96\times15\approx\pm29$ points, about 59 points in total, matching the text's "still 60 percentage points wide" (p. 1960) for the most intense, best-designed retail campaign in the study. (Arithmetic from Table II values.)
^ex-lr-row52-ci

## Connections
- [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]] — converts column (10) into $E[t]$ and multipliers.
- [[Carryover (Adstock) Functional Forms]] — the window rule is why lift tests report short-run effects and long-run effects are left to modeled carryover.
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — the same decay/window tension in sequential tests.
- [[Researcher Degrees of Freedom]] — window length, outcome binarization and filtering are analyst choices; the paper fixes them ex ante with the partner firms.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]
