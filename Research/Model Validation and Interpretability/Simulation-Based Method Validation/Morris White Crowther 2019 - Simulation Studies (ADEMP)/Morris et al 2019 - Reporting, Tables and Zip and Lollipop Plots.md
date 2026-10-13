---
title: "Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§6.1 The 'methods' section p.19; §6.2 Presentation of results pp.19-20; §5.1 item 5 p.13 (zip plot definition); §7.2 pp.21-23 (Figures 3-5); §7.3 pp.23-24 (Table 8 layout, Figure 6 lollipop plot p.25); §8 p.25-26 (simsum/rsimsum, ADEMP exemplars); Table 1 reporting rows p.3. arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
used_by:
  - "[[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
aliases:
  - Zip plot
  - Zipper plot
  - Lollipop plot
  - Nested-loop plot
  - Simulation study reporting checklist
---

# Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots

> [!summary]
> How Morris, White & Crowther (2019, §6) say a simulation study should be written up and displayed. Write the methods section **in ADEMP order** (a pre-written plan *is* the methods section). Results have **four dimensions** — DGMs, methods, estimands, performance measures — and the key design choice is placing **methods side-by-side**. Report **Monte Carlo SEs** (in parentheses, as a maximum in the caption, or as intervals on plots) and never report more digits than the MCSE justifies. Two new graphics are introduced: the **zip plot** (CIs ranked by $|z|$, revealing whether coverage is achieved for the right reasons) and the **lollipop plot** (performance by method with Monte Carlo 95% CIs). The note ends with a consolidated reporting checklist drawn from Table 1, §6 and §8.
^summary-reporting-plots

## Overview

Reporting is the last ADEMP step but is fixed by the first: the paper's rationale for the ADEMP ordering is that "this is usually the appropriate order to report them in a methods section" (§6.1, p.19). The review found that only seven of 100 articles presented Monte Carlo SEs for estimated performance (§6.2, p.19), so most of the guidance here is about making simulation uncertainty visible. The two new graphics (zip plot, lollipop plot) are demonstrated on the worked example in [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]].

## Main Content

### §6.1 The methods section (p.19)

"The rationale for the ordering of elements in ADEMP is that this is usually the appropriate order to report them in a methods section. If the simulation study has been planned and written out before it is executed, the methods section is largely written." Include enough detail to allow reproduction "as far as possible, such as the value of $n_{\text{sim}}$ and how this was decided on, dependence among simulated datasets," plus "a justification of the chosen targets for particular applied contexts."

### §6.2 Presentation of results (pp.19-20)

Very small studies (one or two measures, one DGM) can be reported in text — the paper's example is He et al. (2015) [60]. Otherwise tables or graphs, with **four potential dimensions**: DGMs, methods, estimands, performance measures.

> [!definition] Table design rules (§6.2, p.19)
> 1. **Layout.** Commonly rows = DGMs, columns = methods (example cited: Chen, Hong & Riley 2015 [61]); if there are more methods than DGMs, swap them (example: Hsu, Taylor & Hu 2015 [62]). Performance measures and estimands go across rows or columns, whichever is easier to digest (example: Alonso et al. 2015 [63]).
> 2. **Side-by-side comparisons.** "The most important comparisons will typically be of methods, so bias (for example) for different methods should be arranged in adjacent rows or columns."
> 3. **Monte Carlo SEs.** Their presentation "tends to confound the first" consideration: in parentheses they clutter the table. An alternative is to report the **maximum MCSE in the table caption** (examples cited: Seaman, Bartlett & White 2012 [64]; White & Royston 2009 [43]).
> 4. **Precision of reporting.** "Results should not be presented to a greater accuracy than is justified by the Monte Carlo SE (e.g. 3dp for coverage)."
>
> Review: only 7 of 100 articles presented MCSEs — 3 in text, 2 in a table, 1 in a graph, 1 in a float caption.
^def-table-rules

> [!definition] Graphs vs tables (§6.2, pp.19-20)
> **Advantages of graphs:** patterns are quick to spot, including across dimensions not placed side-by-side; raw estimates ($\hat\theta_i$) can be shown alongside performance summaries (example cited: Figure 3 of Lambert, Dickman & Rutherford 2015 [65]; the authors call such plots "popular and intuitive ways to summarise the $\hat\theta_i$ and model SE's"). "Even if plots of estimates are not planned to be included in publications we urge their use in exploration of simulation results." Kahan's histogram (bias ≃ 0 but almost no $\hat\theta_i$ near $\theta$) is the cautionary example.
>
> **Disadvantages:** less space-efficient; exact numbers cannot be read; separate plots are often needed for different measures.
>
> **Monte Carlo SE on plots:** easier than in tables and "this should be done, for example as 95% confidence intervals."
>
> **Orientation:** method names are long, so "it is usually preferable to arrange methods in horizontal rows and performance measures across columns."
^def-graphs-vs-tables

> [!definition] Nested-loop plot for large factorial designs (§6.2, p.19)
> Full factorial designs are hard to present. Option 1: present assuming no interaction unless one is obviously present. Option 2 (Rücker & Schwarzer 2014): show all results of a $4\times4\times4\times4\times3=768$-DGM study comparing six methods in a **nested-loop plot**, which "loops through nested factors – usually data-generating mechanisms – for an estimand, and plots results for different methods on top of each other." Useful, but "will not suit all designs (and makes depiction of Monte Carlo SE difficult)."
^def-nested-loop-plot

"There is no one correct way to present results, but we encourage careful thought to facilitate readability and clarity, considering the comparisons that need to be made by readers" (p.20).

### The zip plot (§5.1 p.13; §7.2 pp.21-23, Figure 5)

> [!definition] Zip plot (§5.1 item 5, p.13; §7.2, pp.21-23)
> For each DGM × method:
> 1. For each repetition compute $z_i=(\hat\theta_i-\theta)/\text{ModSE}_i$.
> 2. Rank the $n_{\text{sim}}$ confidence intervals by the **fractional centile of $|z_i|$**.
> 3. Plot each interval horizontally (x-axis: the CI) at height = its centile rank (y-axis 0-100).
> 4. Colour intervals that **cover** $\theta$ (bottom, blue in the paper) differently from **non-coverers** (top, purple).
> 5. Draw horizontal lines at the **Monte Carlo 95% CI for percent coverage** (yellow in the paper).
>
> **Reading it:** with exactly 95% coverage, the colour switches at 95 on the vertical axis. If the switch falls outside the Monte Carlo band, coverage is off. **Asymmetry** — more non-covering intervals on one side of $\theta$ — reveals bias that the coverage number hides. "The interesting area in many zip plots will be near to the top," so zooming in is often more informative (Wicklin's suggestion). Implementations: Stata (the authors), R `rsimsum` (Gasparini & White), SAS (Wicklin's "zipper plot").
^def-zip-plot

> [!example] Figure 5: Zip plot for the worked example (p.23)
> Six panels: DGM $\gamma\in\{1,1.5\}$ × exponential / Weibull / Cox, 1,600 CIs each; y-axis "Fractional centile of $|z|$ for $z=(\theta_i-0.5)/SE_i$" (as printed); x-axis the 95% CIs from −2 to 2. "Despite coverage being approximately 95% as advertised, there are more intervals to the right of $\theta=-0.5$ than to the left, particularly for those that do not cover $\theta$. This indicates that the model SEs must overestimate the empirical SE, because coverage is adequate despite bias. A zip plot helps to make such a feature clear" (p.23). Interpreted in [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]].
^ex-figure5

### The lollipop plot (§7.3, pp.23-25, Figure 6)

> [!definition] Lollipop plot (§7.3, p.23; Figure 6, p.25)
> A graphical alternative to the performance table. Performance measures are **stacked vertically**; within each measure, **one row per method**; DGMs in **separate columns** (here $\gamma=1$ and $\gamma=1.5$; see the source-slip note below). Each estimate is a lollipop from a reference line (0 for bias, nominal 95 for coverage) with its value printed, and the **Monte Carlo 95% CI shown as parentheses** around the point — "a visual cue due to the usual presentation of intervals as two numbers within parentheses." "Concerning features need not be highlighted since they are readily visible" (Fig. 6 caption).
^def-lollipop-plot

> [!note] Source slip in the §7.3 lollipop description (pp.24-25)
> The raw text reads: "for each performance measure the results for the three methods now occupy one row each; results for different methods are arranged across the two columns." Read literally, the second clause contradicts the first: methods are already the rows. In Figure 6 the two columns are the two **data-generating mechanisms** ($\gamma=1$, $\gamma=1.5$). The intended wording is almost certainly "results for different data-generating mechanisms are arranged across the two columns", which mirrors the Table 8 description just before it ("results for the two data-generating mechanisms each occupy one row; results for different methods are arranged across three columns"). The definition above follows the figure, not the sentence. This is the same treatment as the Table 4 typo and the Figure 3 prose-direction slip noted elsewhere in this set.
^note-source-slip-7-3

The companion **table layout** for Table 8 (§7.3, p.23): measures stacked vertically; each DGM one row within a measure; methods across three columns; MCSEs in parentheses at a smaller point size; concerning results in bold; only one estimand.

### Other plots demonstrated in §7.2 (Figures 3-4)

- **Figure 3** (p.22): strip plots of the 1,600 $\hat\theta_i$ (left) and $\widehat{\text{SE}}(\hat\theta_i)$ (right) by DGM and method; y-axis is repetition number, for separation; yellow pipes mark means. Axis ranges: $\hat\theta$ −1.5 to 0.5 ($\gamma=1$) and −1 to 0 ($\gamma=1.5$); SE 0.18-0.26 ($\gamma=1$) and 0.14-0.17 ($\gamma=1.5$). Full reading in [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox#^ex-figure3-axes|the worked-example note]].
- **Figure 4(A)** (p.22): scatter-plot matrix for $\gamma=1.5$ — upper triangle $\hat\theta_i$ method-vs-method, lower triangle $\widehat{\text{SE}}(\hat\theta_i)$, against the line of equality.
- **Figure 4(B)**: limits-of-agreement plots (difference vs mean) with **Weibull as comparator** (correctly specified).

### Software (§8, p.26)

Stata `simsum` (White 2010) and R `rsimsum` (Gasparini & White 2018) "automate this process for commonly used performance measures" (p.26) — i.e. computing the commonly used measures and their Monte Carlo SEs; they do not necessarily cover every Table 6 row or bespoke measures. Boos & Osborne (2015) cover MCSEs for complex measures. Published examples that explicitly use ADEMP: Thompson et al. (2017), Sayers et al. (2017), Morris et al. (2017), Keogh & Morris (2018), Pham et al. (2018); for "an excellent example of a clearly described design", Austin & Stuart (2015) (§8, p.25).

### Consolidated reporting checklist

> [!algorithm] Reporting checklist for a simulation study (Table 1 reporting rows p.3; §6 pp.19-20; §8 pp.25-26; §5 p.13)
> **Methods section (in ADEMP order)**
> 1. **Aims** — what is to be learned; proof-of-concept or stretch/break.
> 2. **DGMs** — parametric or resampling; model and all parameter values; whether based on real data; factors varied, levels, and full/partial factorial or one-at-a-time; $n_{\text{obs}}$.
> 3. **Estimands / targets** — stated explicitly, with justification for the applied context; how $\theta$ was obtained (known or estimated by simulation).
> 4. **Methods** — each method, software and version, user-written code; how non-convergence is handled (pure vs procedural).
> 5. **Performance measures** — each listed and justified; explicit formulae for less-used ones; $n_{\text{sim}}$ **and how it was chosen**.
> 6. **Execution details** — RNG, seed, streams, dependence among simulated datasets.
>
> **Results**
> 7. Number/proportion of **missing estimates** by DGM and method, first.
> 8. Exploratory plots of estimates (at least in exploration).
> 9. Tables/plots with **methods side-by-side**.
> 10. **Monte Carlo SEs** for every performance estimate (parentheses, caption maximum, or CIs on plots).
> 11. Digits consistent with the MCSE.
>
> **Transparency**
> 12. **Publish code**, including user-written routines; for resampling studies, release code even if data cannot be shared.
> 13. Ideally, a **protocol written before coding** ([[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]]).
^alg-reporting-checklist

## Examples

> [!example] A zip plot for a marketing model's credible intervals (illustrative)
> For a Bayesian MMM validated on 500 simulated datasets, plot each channel's 90% interval for true ROAS ranked by $|(\hat\theta_i-\theta)/\text{sd}_i|$. If nominal coverage is reached but nearly all non-covering intervals sit **above** the truth, the model is biased upward (e.g. confounding of spend with seasonality) and its posterior SDs are inflated enough to hide it. The coverage number alone would have passed the model.
^ex-zip-plot-marketing-model

## Connections

- [[How Many Digits to Report]] gives the same digits-vs-Monte-Carlo-error rule for MCMC summaries.
- Zip plots and calibration plots answer the same question as SBC rank histograms ([[The SBC Algorithm]]) — are the reported intervals calibrated? — from the frequentist side.
- Conditional coverage displays connect to [[Marginal vs Conditional Coverage]].

## See Also

- [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]] — Figures 3-6 and Table 8 in context
- [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] — what is being displayed
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
