---
title: "Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation"
tags:
  - source/ingested
  - topic/market-response
  - topic/model-validation
  - topic/mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 7, pp. 19-22 (Tables 5-6, Figures 9-12); Sec. 3, p. 7 (footnote 3); Appendix p. 29"
date_updated: 2026-10-13
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]"
  - "[[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[Jin 2017 MMM - Conclusions, Limitations and Extensions]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
aliases:
  - Jin 2017 prior sensitivity
  - Jin Table 5
  - Jin Table 6
  - MMM prior on beta sensitivity
  - MMM prior on half saturation sensitivity
---

# Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation

> [!summary]
> Section 7 reruns the two-year, 500-dataset simulation with different priors on the **maximum-effect coefficient $\beta$** and on the **half-saturation point $K$**. **Prior on $\beta$ (Table 5):** half-normal$(0,1)$ and normal$(0,1)$ give the same underestimated curves (Media 2 at $x=1$: -18.0% for both). Uniform$(0,3)$ puts more mass on large $\beta$ and nearly removes the bias (-1.5%). The authors warn that this does **not** make uniform$(0,3)$ a better prior, because it would make over-estimated curves worse. **Prior on $K$ (Table 6):** the *curves* barely change across beta$(2,2)$, uniform$(0,1)$ and uniform$(0,10)$, but the estimates of $K$ itself do. When the true $K=2$ lies outside the observed spend range $[0,1]$, no prior recovers $K$, yet the curve inside the range is fine. Attribution is sensitive to the prior on the curve's **scale**, and much less to priors on its **shape location**.
^summary

## Overview

Section 6 attributes the two-year bias to the priors (see [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]). Section 7 tests that claim by varying one prior at a time and keeping everything else from Section 5 fixed: the DGP of [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]], two years of data and 500 replicates. It is a planned **prior sensitivity analysis**, a standard step of the [[Bayesian Workflow - Overview]].

Background from Sec. 3 (p. 7): priors **with the same support** give similar posteriors when the data are informative. When they are not, the prior dominates "and in some cases the posterior distribution may look almost the same as the prior". Footnote 3 defines **support** as the set where the density is positive, or more rigorously "the smallest closed set whose complement has probability zero".

## Main Content

### 7.1 Prior on $\beta$

> [!definition] Experiment 7.1 design (p. 19)
> Three priors on each $\beta_m$: **half normal$(0,1)$** (the Table 3 baseline), **normal$(0,1)$** and **uniform$(0,3)$**. Everything else is as in Section 5, with 500 simulated two-year datasets. Outputs: densities of the posterior medians of $\beta$ (Fig. 9), Media 2's posterior-median $\beta$Hill curves (Fig. 10; panel (a) is the same as Fig. 8a), and the relative bias of the curves (Table 5).
^exp71

> [!theorem] Table 5 — relative bias of $\beta$Hill curves by prior on $\beta$ (p. 20)
>
> | | $x=0.5$ half normal | $x=0.5$ normal | $x=0.5$ uniform | $x=1$ half normal | $x=1$ normal | $x=1$ uniform |
> |---|---|---|---|---|---|---|
> | Media 1 | -39.6% | -39.4% | **-27.7%** | -32.4% | -32.3% | **-21.7%** |
> | Media 2 | -25.5% | -25.6% | **-4.5%** | -18.0% | -18.0% | **-1.5%** |
> | Media 3 | -39.3% | -42.2% | **-22.6%** | -25.6% | -28.7% | **-10.3%** |
>
> **Findings.**
> 1. Half-normal and normal give nearly identical estimates of $\beta$ and of the curves. Both are very different from uniform$(0,3)$.
> 2. Uniform$(0,3)$ shrinks the bias for every medium at both $x$ values. It "puts more mass on larger values of $\beta$", which corrects the underestimation.
> 3. **This does not generalise.** In scenarios where the curves are **over**-estimated, uniform$(0,3)$ would make the bias larger. Table 5 shows that the prior moves the answer. It does not show which prior is right.
>
> **Consistency check.** The half-normal column reproduces the two-year column of Table 4 (-39.6 vs -39.7, -25.5 vs -25.6, -39.3 vs -39.0 at $x=0.5$). The small differences are Monte Carlo noise from separate runs, which gives a rough idea of the run-to-run MC error.
^table5

> [!example] Figure 9 — posterior medians of $\beta$ by prior (p. 19)
> Densities of the 500 posterior medians of $\beta$ per medium, one curve per prior, with the mean of the medians shown dashed and the truth in red. The half-normal and normal densities overlap. The uniform$(0,3)$ density is shifted right toward the true $\beta$ (0.8, 0.6, 0.3). Figure 10 shows the same shift as Media 2 curves moving up toward the true curve under uniform$(0,3)$.
^figure-9-posterior-medians

> [!example] Figure 10 — Media 2 curves under the three $\beta$ priors (p. 20)
> Three panels, (a) half normal$(0,1)$, (b) normal$(0,1)$, (c) uniform$(0,3)$. Each shows 500 posterior-median $\beta$Hill curves for Media 2 (spend 0-1, y-axis 0 to about 0.7), the true curve in red ($\beta\text{Hill}(1)=0.577$) and their mean in blue.
> - **(a)** is **the same plot as Fig. 8a** (Media 2, two years). The paper repeats it "for the reader to compare with the curves of other priors conveniently" (p. 19). The blue mean sits clearly below red from about $x=0.1$ onward and ends near 0.47 at $x=1$ (Table 5: -18.0%).
> - **(b)** looks almost identical to (a): blue near 0.47 at $x=1$, the same grey band (about 0.2-0.7 at $x=1$).
> - **(c)** The blue mean curve **lies almost on top of the red truth** over the whole range. A small gap shows only in the mid-range, and the two meet at $x=1$ (Table 5: -4.5% at $x=0.5$, -1.5% at $x=1$). The density of curves is shifted up, with the dark core around the truth. The band is still wide, about 0.25-0.7 at $x=1$, so the bias falls but the dataset-to-dataset spread does not.
^fig10

### 7.2 Prior on $K$

> [!definition] Experiment 7.2 design (p. 20)
> Two scenarios:
> - **Scenario I:** the Section 5 setting, true $K=0.2$ for all media, which is **inside** the observed spend range $[0,1]$.
> - **Scenario II:** true $K=2$ for all media, which is **outside** the observed range, with $\beta=(2,3,1.5)$ for Media 1-3 and everything else unchanged.
>
> Three priors on $K$: **beta$(2,2)$**, **uniform$(0,1)$** and **uniform$(0,10)$**. Only Media 2 is reported: $K$ medians in Fig. 11, curves in Fig. 12, bias in Table 6.
>
> **Prior support vs truth in Scenario II.** Beta$(2,2)$ and uniform$(0,1)$ are both supported on $[0,1]$, so they put **zero prior mass on the true $K=2$**. Their posteriors cannot reach the truth **by construction**, whatever the data say. Only uniform$(0,10)$ contains $K=2$. The appendix Stan program declares `ec` with `<lower=0,upper=1>`, so to run the uniform$(0,10)$ arm (or any $K$ outside the scaled spend range) that bound must be changed to `upper=10`. See [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation#^code-map]].
^exp72

> [!theorem] Table 6 — relative bias of Media 2's $\beta$Hill curve by prior on $K$ (p. 20)
>
> | | $x=0.5$ beta(2,2) | $x=0.5$ unif(0,1) | $x=0.5$ unif(0,10) | $x=1$ beta(2,2) | $x=1$ unif(0,1) | $x=1$ unif(0,10) |
> |---|---|---|---|---|---|---|
> | Scenario I ($K$=0.2) | -25.5% | -16.0% | -21.2% | -18.0% | -9.2% | -10.2% |
> | Scenario II ($K$=2) | -0.7% | -0.6% | -8.9% | -25.2% | -21.2% | -13.6% |
>
> **Findings (Figs. 11-12, pp. 21-22).**
> 1. In both scenarios the three priors give **very similar $\beta$Hill curves** (Fig. 12).
> 2. The estimates of **$K$** agree for the first two priors and differ for uniform$(0,10)$ (Fig. 11). In Scenario I uniform$(0,10)$ gives the **larger** bias in $K$. In Scenario II it gives the **smaller** bias. Uniform$(0,10)$ always produces **more variation** in the posterior medians of $K$.
> 3. Media effect depends on the curve, not on its separate parameters, so the model "is not very sensitive in the choice of prior on $K$". A tighter prior backed by real knowledge is still better because the **sampler converges faster**.
> 4. **Scenario II.** $K$ outside the data range is nearly unidentifiable. Even uniform$(0,10)$, which puts mass on the true value 2, **cannot estimate $K$ well**, yet the curve **within** the observed range is estimated quite well. This supports the advice in Sec. 3 to constrain the $K$ prior to the observed spend range. The response cannot be extrapolated beyond observed spend anyway.
^table6

> [!example] Figure 11 — posterior medians of $K$ for Media 2 (p. 21; approximate readings)
> Two panels, both with an x-axis from 0 to 3. Black = beta$(2,2)$, blue = uniform$(0,1)$, orange = uniform$(0,10)$. Dashed lines are the means of the medians and the red line is the truth.
>
> | Scenario | Prior | where the 500 medians sit | mean of medians (dashed) | truth |
> |---|---|---|---|---|
> | I ($K$=0.2) | beta(2,2) | ~0.1-0.6, peak (density ~3.5) at ~0.3 | ~0.32 | 0.2 |
> | I ($K$=0.2) | uniform(0,1) | ~0.1-0.6, sharper peak (~4.2) at ~0.2 | ~0.30 | 0.2 |
> | I ($K$=0.2) | uniform(0,10) | peak (~3.5) near 0.2, then a **long flat tail to 3** | ~0.7 | 0.2 |
> | II ($K$=2) | beta(2,2) | ~0.45-0.9, peak (~5) at ~0.7 | ~0.68 | 2 |
> | II ($K$=2) | uniform(0,1) | ~0.5-0.95, peak (~4.7) at ~0.75 | ~0.75 | 2 |
> | II ($K$=2) | uniform(0,10) | ~0.8-1.6, peak (~3.1) at ~1.1 | ~1.07 | 2 |
>
> In Scenario II **none** of the 1,500 medians comes near 2. The bounded priors pile up against their support, and even the wide prior stops at about 1.1. In Scenario I the wide prior has the largest bias in $K$ (mean ~0.7 against 0.2) because a few datasets wander far into the tail. In Scenario II it has the smallest. This is the paper's point that tail mass helps or hurts depending on where the truth lies.
^fig11

> [!example] Figure 12 — Media 2 curves under the three $K$ priors (p. 21)
> Six panels: row (a) true $K=0.2$, row (b) true $K=2$; columns beta$(2,2)$, uniform$(0,1)$, uniform$(0,10)$. Spend runs 0-1 and the y-axis 0 to about 0.7. Red is the truth, blue the mean of 500 posterior-median curves. Approximate readings:
>
> | Panel | true curve | blue mean vs truth |
> |---|---|---|
> | (a1) $K$=0.2, beta(2,2) | concave, saturates at 0.577 | below truth from ~0.1 on; ~0.47 at $x=1$ (-18.0%) |
> | (a2) $K$=0.2, unif(0,1) | same | closer; ~0.52 at $x=1$ (-9.2%), gap mostly in the 0.2-0.6 region |
> | (a3) $K$=0.2, unif(0,10) | same | similar to (a2); ~0.52 at $x=1$ (-10.2%), slightly wider grey band at the bottom |
> | (b1) $K$=2, beta(2,2) | **convex** over [0,1] (we are below half-saturation), $3x^2/(x^2+4)$, rising to 0.6 at $x=1$ | blue on top of red up to ~0.6, then bends below (concave), ~0.45 at $x=1$ (-25.2%) |
> | (b2) $K$=2, unif(0,1) | same | same pattern; ~0.47 at $x=1$ (-21.2%) |
> | (b3) $K$=2, unif(0,10) | same | tracks red furthest; ~0.52 at $x=1$ (-13.6%) |
>
> In row (b) the fitted curves (with $K$ estimated at 0.7-1.1) start to saturate inside $[0,1]$ while the true curve is still accelerating. The curves therefore match at low and middle spend ($x=0.5$ bias under 1% for the bounded priors) and fall short at the top edge. The paper sums up all six panels as "very similar estimates" across priors (p. 21). The Table 6 differences at $x=1$ are the visible part of that similarity.
^fig12

> [!example] Reading Table 6, Scenario II
> At $x=0.5$, well inside the data, all priors are nearly unbiased (-0.7%, -0.6%, -8.9%). At $x=1$, the edge of the observed range, bias rises to between -13.6% and -25.2%. Accuracy falls off **toward the edge of the observed spend**, which is exactly where budget optimisation pushes. The same thing happens to the optimal mix in [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]].
^reading-table-6-scenario

## Examples

> [!example] Generic analytics illustration
> Suppose a team fits a weekly MMM with 104 rows and tries "half-normal vs uniform" priors on channel coefficients. If the fitted response curves (and so ROAS) differ by 10-20%, Table 5 shows this is **expected**, not a bug. With this little data the prior on scale *is* the estimate. The honest reports are (a) the attribution under each defensible prior, or (b) a prior fixed in advance from external evidence such as experiments (see [[Q - Using Experiment Results as Priors in a Bayesian MMM]]). Choosing whichever prior gives the most plausible ROAS after seeing the results is a [[Researcher Degrees of Freedom]] problem.
^generic-analytics-illustration

## Connections

- Prior influence in general: [[Influence of Likelihood and Prior]], [[Tail Behavior and Prior-Likelihood Conflict]], [[Prior Predictive Checking]].
- The Table 5 lesson (an "unbiased-looking" prior can be right for the wrong reason) parallels the analytic-flexibility simulations in [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
- Identifiability of $K$ outside the observed range: [[Shape (Saturation) Effects#^identifiability]]. The same "narrow spend range" problem appears in [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]].
- Earlier shorter summary: [[Bayesian Estimation and Priors for MMM]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]
- [[Constructing Priors for Effect Sizes]]
- [[Prior Distributions]]
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — report how far results are prior-driven
