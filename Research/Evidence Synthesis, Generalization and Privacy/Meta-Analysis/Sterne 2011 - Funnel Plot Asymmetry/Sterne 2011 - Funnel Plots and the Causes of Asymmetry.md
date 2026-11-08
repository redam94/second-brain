---
title: "Sterne 2011 - Funnel Plots and the Causes of Asymmetry"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry.pdf]]"
source_location: "Introduction; What is a funnel plot?; Implications...; Interpreting funnel plot asymmetry; Box 1; Figs 1-3, pp. 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry"
doc_type: paper
depends_on:
  - "[[Sterne 2011 - Funnel Plot Asymmetry - Overview]]"
used_by:
  - "[[Sterne 2011 - Tests for Asymmetry and the Egger Regression]]"
aliases:
  - "Funnel plot basics"
  - "Causes of funnel plot asymmetry"
  - "Small study effects"
---
# Sterne 2011 - Funnel Plots and the Causes of Asymmetry

> [!summary]
> A funnel plot scatters study effect estimates against a measure of precision; absent bias and heterogeneity it is a symmetric inverted funnel. Asymmetry (small-study effects) has five families of causes - reporting bias, poor small-study quality, true heterogeneity, artefact and chance - so it must never be read as proof of publication bias.

## Overview

The first half of the article defines the funnel plot and catalogues what can distort it. This note covers: the plot, the expected 95% triangle, heterogeneity (including the three-subgroup illustration), the three consequences of reporting bias, the role of chance, the interpretive rules, contour-enhanced funnel plots, and Box 1.

## Main Content

### The funnel plot

> [!definition] Funnel plot
> A scatter plot of the effect estimates $\hat\theta_i$ from individual studies $i=1,\dots,k$ against a measure of each study's size or precision. The standard error $s_i=\operatorname{SE}(\hat\theta_i)$ is often chosen and plotted on the vertical axis with a **reversed** scale, so the largest, most powerful studies are at the top.

^def-funnel-plot

Smaller studies scatter more widely at the bottom, with the spread narrowing among larger ones. If the scatter is due only to sampling variation, the plot resembles a symmetric inverted funnel (Fig 1).

> [!definition] Expected 95% region
> Centred on a fixed-effect summary estimate $\hat\theta_{FE}$, the triangle $\hat\theta_{FE}\pm1.96\,s$ (as $s$ ranges over the vertical axis) should contain about 95% of studies when there is no bias and the fixed-effect assumption (one true effect) holds. Fig 1 shows this with a log odds ratio, outer dashed lines at $\hat\theta_{FE}\pm1.96\times$SE, and a solid vertical line at no effect.

^def-funnel-triangle

Any shape is contingent on studies having a *range* of standard errors; with equal $s_i$ they lie on a horizontal line. Funnel asymmetry may also be an artefact of the statistic plotted (the technical appendix on bmj.com discusses axis choices).

### Box 1 - possible sources of asymmetry

> [!definition] Sources of funnel plot asymmetry (adapted from Egger et al. 1997)
> **Reporting biases** - publication bias (delayed publication / time-lag bias; location biases such as language, citation, multiple-publication bias); selective outcome reporting; selective analysis reporting.
> **Poor methodological quality leading to spuriously inflated effects in smaller studies** - poor design; inadequate analysis; fraud.
> **True heterogeneity** - effect size differs with study size (e.g. intensity of intervention, or baseline risk, differs between small and large studies).
> **Artefactual** - sampling variation can induce an association between effect and its standard error.
> **Chance** - asymmetry may occur by chance, which motivates the use of tests.

^def-asymmetry-sources

### Heterogeneity

Statistical heterogeneity is between-study difference beyond chance; it can arise from clinical differences (setting, participants, implementation) or methodological ones (extent of bias control). Under a random-effects model with heterogeneity that fits its assumptions, the plot is symmetric with extra horizontal scatter; with very large heterogeneity the plot becomes *cylindrical* as it overwhelms sampling error.

Heterogeneity creates asymmetry only when it induces a **correlation between study size and effect**. Examples in the paper: benefit seen only in high-risk patients who were preferentially enrolled in early small studies; or an intervention implemented less thoroughly in large studies. Methodological quality works the same way: small studies are often run and analysed less rigorously, and lower-quality trials tend to show larger effects.

> [!example] Fig 2 - asymmetry from three subgroups
> *Setup:* the meta-analysis consists of three distinct subgroups of studies, each with a different true intervention effect and each with its own symmetric funnel. *Result:* the funnel for all studies together is clearly asymmetric (Egger test $P<0.001$) while the $P$-values within each subgroup are all $>0.49$. *Interpretation:* the asymmetry is entirely due to heterogeneity that happens to be correlated with study size; separating the subgroups removes it. In practice the important sources of heterogeneity are often unknown.

^ex-fig2-subgroups

### Reporting bias

Reporting biases arise when dissemination depends on the nature and direction of results: significant "positive" results are published more often, sooner, in English, more than once, in higher-impact journals and are cited more. Three consequences for a meta-analysis:

1. A review may fail to locate an eligible study because all information is suppressed (*publication bias*).
2. A located study may lack usable data on the outcome of interest (*selective outcome reporting*).
3. A located study may report a biased result, e.g. the smallest $P$ or largest effect after trying several analyses (*selective analysis reporting*).

These cause asymmetry if significant beneficial results are more likely to be published than non-significant ones, exaggerated if small studies are more prone to suppression ("a small study can easily be lost in a file drawer"; large studies cannot easily disappear, and mortality cannot easily go unreported in a large trial). Caveat: the plot can be symmetric despite bias - e.g. if published findings point in different directions and unreported ones indicate neither - or bias may affect too few studies to show.

### Chance

Most meta-analyses of randomised trials contain few studies; investigating relations across studies with few studies and heterogeneity is "seriously prone to false positive findings".

### Interpreting asymmetry

- Separate the possible reasons (Box 1) using knowledge of the intervention and where it was implemented, and the research field's susceptibility to bias (conflicts of interest, standardised outcomes/analyses, trial registration). Antidepressant trials are the paper's high-risk example (large revenues, hundreds of outcome scales, flexible analyses, little registration until recently). In a **prospective meta-analysis** with all data and a pre-specified standardised analysis, publication/reporting bias cannot exist.
- Terrin et al. found researchers poor at spotting publication bias from funnel plots, so visual impression alone is unreliable.
- **Contour-enhanced funnel plots** overlay contours at significance milestones ($P=0.01, 0.05, 0.1,\dots$). Missing studies in the *non-significant* region (Fig 3 top) make reporting bias plausible; missing studies in regions of *high significance* or in the direction authors would find undesirable (Fig 3 bottom) point to other causes.

> [!example] Fig 3 - reading contour-enhanced plots
> *Top panel:* a gap in the middle and right of the plot, broadly in the white non-significance band - publication bias is a plausible cause. *Bottom panel:* the gap is at the bottom left, mostly within high-significance regions - publication bias is unlikely to be the underlying cause.

^ex-fig3-contours

## Examples

The two figure-based examples above (Fig 2, Fig 3) are the paper's illustrations of *interpretation*; the quantitative magnesium case is in [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]].

## Connections

- Test statistics that quantify "association between effect and study size": [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]].
- Formal model of selection on significance that generates a gap in the non-significant band: [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]].
- Researcher-side mechanisms (selective analysis reporting): [[Researcher Degrees of Freedom]], [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].

### Relevance to marketing measurement

A portfolio of geo or lift tests exhibits the same causes: selective write-up (reporting), small tests in a few hand-picked markets with looser controls (quality), larger tests in different verticals or spend intensities (true heterogeneity). A contour-enhanced plot of lift vs standard error, with the significance bands drawn, separates "missing non-significant tests" from "large tests simply behaved differently".

## See Also

- [[Sterne 2011 - Funnel Plot Asymmetry - Overview]]
- [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]]
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
