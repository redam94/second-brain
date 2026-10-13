---
title: "Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results"
tags:
  - source/ingested
  - topic/market-response
  - topic/model-validation
  - type/example
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 4.1 Figure 3, p. 8; Sec. 5.2, pp. 13-15 (Figures 5-6)"
date_updated: 2026-10-13
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]"
used_by:
  - "[[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]"
  - "[[Jin 2017 MMM - Conclusions, Limitations and Extensions]]"
aliases:
  - Jin 2017 simulated ROAS
  - Jin Figure 5
  - Jin Figure 6
  - Jin optimal mix scenarios
---

# Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results

> [!summary]
> Section 5.2 applies the attribution and optimisation formulas of Section 4 (Eqs. 10-16) to the simulated dataset, where the true answer is known. **ROAS/mROAS (Fig. 5):** Media 2 is estimated well. Media 1's ROAS is more biased but its mROAS is fine. Media 3, the weak channel, has a ROAS posterior with very large extreme values and a badly biased mROAS. The ranking follows how well each channel's $\beta$Hill curve is recovered. **Optimisation (Fig. 6):** with a total weekly budget of 1, close to historical spend, the optimal Media 1 spend is unimodal around the truth. With a budget of 0.5, in sparse data, the posterior of the optimal spend has **three modes**. The uncertainty in predicted sales then matches or exceeds the sales differences between mixes, so the recommended mix should not be trusted.
^summary

## Overview

This is the paper's ground-truth check of the *decision outputs* rather than the parameters. Its general lesson: an optimiser is only as reliable as the response curves in the region it explores, and sparse data in that region shows up as a multimodal posterior over the optimum. Definitions are in [[ROAS, mROAS, and Optimal Media Mix]]. The data are described in [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]].

## Main Content

> [!definition] Attribution windows used (Sec. 5.2, p. 13; Fig. 3, p. 8)
> - **Change period** $(t_0,t_1)$: **one year**.
> - **Pre- and post-change periods**: **12 weeks each**, because $L=13$ means spend affects sales for $L-1=12$ further weeks.
> - The most recent 12 weeks are the post-change period, and the year before them is the change period.
> - Predicted sales in Fig. 3 come from **one randomly chosen posterior sample** of $\Phi$.
>
> **Figure 3 (p. 8)** plots predicted weekly sales (black) and scaled channel spend (blue) on a week axis running from about 25 to about 105 (ticks at 40, 60, 80, 100). Reading the vertical lines: the pre-change period runs from about week 29 to week 41, the change period from about week 41 to week 92, and the post-change period from about week 92 to week 104. The y-axis (sales and scaled spend) runs from about 3.6 to 6.0. Solid lines use historical spend. Dashed lines set the channel's spend to **zero during the change period**. The gap between the black lines is the incremental sales. It is **small at the start** of the change period because of carryover from pre-period spend, and it **continues into the post-change period**, so those sales must go into the ROAS numerator. This is why pre/post periods are set to the carryover length unless the data run out.
^attribution-windows

> [!theorem] Result: ROAS/mROAS recovery follows curve recovery (Figure 5, p. 14)
> Posterior samples of ROAS and mROAS come from plugging each posterior draw of $\Phi$ into Eqs. 10-11. The summary is the **posterior median**. Figure 5 shows the posterior density (black), the median (dashed) and the truth (red).
>
> | Channel | ROAS | mROAS |
> |---|---|---|
> | Media 1 | larger bias than Media 2 (axis about 0.5-2.0) | estimated about as well as Media 2 (axis about 0.3-0.6) |
> | Media 2 | estimated reasonably well (axis about 1-4) | estimated reasonably well (axis about 0.4-0.7) |
> | Media 3 | **very large extreme values** (axis about 0-4) | **large bias** (axis about 0-0.3) |
>
> **Explanation (forward reference to Sec. 6).** Media 2's $\beta$Hill curve has the smallest bias of the three (Table 4: -18.1% at $x=1$ vs -32.5% and -25.3%), so its ROAS and mROAS are estimated best. See [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]].
^fig5

> [!example] Figure 5 read off the plot (approximate; my readings, not printed numbers)
>
> | Panel | true value (red) | posterior median (dashed) | density axis max | x-range |
> |---|---|---|---|---|
> | ROAS Media 1 | ~1.2 | ~0.85, **below** truth | ~2.0 | ~0.3-2.2, ragged and wide |
> | ROAS Media 2 | ~1.15 | ~1.15, on truth | ~1.0 | ~0.5-4.6, right tail |
> | ROAS Media 3 | ~0.5 | ~0.15, well below | ~2.2 | 0-4.2, spike near 0 plus a long flat tail |
> | mROAS Media 1 | ~0.39 | ~0.42, slightly above | ~10 | ~0.27-0.62 |
> | mROAS Media 2 | ~0.49 | ~0.50, on truth | ~10 | ~0.35-0.70 |
> | mROAS Media 3 | ~0.15 | ~0.065, **below** (about half) | ~9 | 0-0.32 |
>
> ROAS is an average over the whole curve, so it inherits the two-year underestimation of the curve (Table 4). mROAS is a local slope at current spend, so for Media 1 it can come out close to the truth even though the curve's level is wrong.
^fig5-readings

> [!definition] Optimisation experiment (Sec. 5.2, pp. 13-14)
> - Optimise over a **change period of 8 weeks**, with the same 12-week pre/post periods.
> - **Only Media 1 and Media 2** are optimised. Media 3 stays at its historical spend.
> - **Fixed flight pattern:** weekly spend is constant within the change period, so the budget constraint becomes a constraint on total **weekly** Media 1 + Media 2 spend (Eq. 14 form).
> - **Scenario I:** total weekly budget = **1**, close to the average combined weekly spend of Media 1 and 2.
> - **Scenario II:** total weekly budget = **0.5**, which puts predictions in the **sparse part** of the observed data.
> - Both Bayesian approaches from Sec. 4.2 are used: **(A)** maximise the posterior-averaged objective (Eq. 15), which gives one optimum; **(B)** optimise each posterior draw separately (Eq. 16), which gives a posterior over optima.
^opt-design

> [!algorithm] Two Bayesian approaches to the optimal mix (Sec. 4.2, Eqs. 15-16)
> Given posterior draws $\Phi_1,\dots,\Phi_J$, a budget $C$, a change period $(t_0,t_1)$ and carryover $L$:
> 1. **Fix a flight pattern** to reduce the free variables, e.g. $x_{t,m}=c_m/(t_1-t_0+1)$ with $\sum_m c_m=C$.
> 2. **Approach A (stable point):** solve $\max_{\{c_m\}} \frac1J\sum_{j=1}^J\sum_{t_0\le t\le t_1+L-1}\hat Y_t(\cdot;\Phi_j)$ subject to $\sum_m c_m=C$, using constrained optimisation such as Lagrange multipliers. Report $X^o$.
> 3. **Approach B (uncertainty):** for each $j$, solve $\max\sum_{t_0\le t\le t_1+L-1}\hat Y_t(\cdot;\Phi_j)$ subject to the same constraint, giving $X^o_j$.
> 4. Summarise $\{X^o_j\}$ by mean, median or credible interval. **A wide or multimodal distribution means the model cannot guide this allocation.**
^alg-opt

> [!theorem] Result: the optimum is reliable near historical spend and unreliable in sparse regions (Figure 6, p. 15)
> **Fig. 6a (optimal Media 1 spend).** Blue line = approach A. Black density and black vertical line = approach B posterior and its median. Red line = true optimum.
> - **Scenario I:** both the approach A optimum and the approach B median are **very close to the truth**. The posterior is **unimodal**.
> - **Scenario II:** both are **slightly off** the truth. The posterior has **three modes**.
>
> **Fig. 6b (expected sales vs Media 1 spend at fixed total).** Black curves = individual posterior draws (the objectives of Eq. 16). Blue = their average (the objective of Eq. 15). Red = true expected sales (Table 1 parameters).
> - Scenario I: most black curves **peak near the true optimum**.
> - Scenario II: some curves peak at the **left end** and others near the **right end**, which produces the multimodal posterior.
>
> **Axis scales and true optimum positions (read off the plot, approximate).**
>
> | Panel | x-axis | y-axis | true optimum (red) | approach A (blue) | approach B median (black) | density shape |
> |---|---|---|---|---|---|---|
> | (a1) budget 1 | Media 1 spend 0-1 | density 0-~8.5 | ~0.47 | ~0.47 (overlaps red) | ~0.47 | one peak ~8.4 at ~0.48, support ~0.3-0.6 |
> | (a2) budget 0.5 | Media 1 spend 0-0.5 | density 0-12 | ~0.21 | ~0.18 | ~0.16 | three modes: a spike ~11.5 at **0** (all spend to Media 2), a main peak ~10.5 at ~0.19, and a smaller mode ~3 at **0.5** (all spend to Media 1) |
> | (b1) budget 1 | spend on Media 1, 0-1 | expected sales 30-45 | red sales curve peaks ~39.5 at ~0.47 | blue average just above red (~40 at its peak) | — | band of draws ~30-45 |
> | (b2) budget 0.5 | spend on Media 1, 0-0.5 | expected sales 30-45 | red curve almost flat, ~34.4-36.4, peaks ~0.2 | blue ~36.4-37.6, **above** red by about 1 | — | draws spread ~31-41, far wider than the ~1-2 unit rise of any curve across mixes |
>
> In (b2) every vertical line sits between 0.16 and 0.21, yet the spread of the curves at any fixed spend (about ±4 sales units) dwarfs the ~2-unit variation along a single curve. That is the paper's untrustworthy-optimum diagnosis made visible.
>
> **Conclusion (p. 14).** In Scenario II the variance in estimated sales "is comparable or even larger than the variation in sales caused by different media mix". The user should be cautious about acting on the estimated optimum in such cases.
^fig6

## Examples

> [!example] A practical check derived from Fig. 6
> Before acting on an MMM budget recommendation, run approach B and plot the per-draw objective curves. If the spread of the objectives across draws at a fixed mix is larger than the change in the averaged objective across mixes, the data cannot tell the mixes apart. This happens most often when the proposed budget is far from historical levels. The shampoo case shows the same pattern on real data (bimodal optimal TV share, Fig. 15): see [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]].
^a-practical-check-derived

## Connections

- Formal definitions: [[ROAS, mROAS, and Optimal Media Mix]] (^roas-eq, ^mroas-eq, ^optimal-mix).
- The "plug in each draw, not the posterior mean" rule is what makes Fig. 5 posterior *densities* of ROAS possible: [[ROAS, mROAS, and Optimal Media Mix#^posterior-plug-in]].
- Extrapolation risk outside observed spend is the MMM version of the extrapolation problem in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- When several model fits give conflicting optima, compare [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] and the Rashomon framing in [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- Decision-making background: [[Optimal Marketing Decisions and Forecasting]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map
- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]
- [[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]
