---
title: "Sterne 2011 - Magnesium Example, Model Choice and Adjustment"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry.pdf]]"
source_location: "Funnel plots and meta-analysis models; Extrapolation; Discussion; Figs 4-5, pp. 4-6"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry"
doc_type: paper
depends_on:
  - "[[Sterne 2011 - Tests for Asymmetry and the Egger Regression]]"
used_by:
  []
aliases:
  - "Magnesium example funnel plot"
  - "Fixed versus random effects under asymmetry"
---
# Sterne 2011 - Magnesium Example, Model Choice and Adjustment

> [!summary]
> With funnel plot asymmetry, a random-effects estimate weights small studies more evenly than a fixed-effect one and so is pulled toward them; random effects are therefore not always "conservative". In the intravenous magnesium trials, small trials suggested benefit and ISIS-4 (90% of the fixed-effect weight) did not; the authors recommend comparing fixed and random estimates and judging which evidence is more credible.

## Overview

This note covers the model-choice section, the magnesium case (Figs 4-5), the discussion of regression-line extrapolation, and the article's closing discussion.

## Main Content

### Fixed vs random-effects weighting under asymmetry

> [!theorem] Random-effects pull toward small studies
> Random-effects meta-analysis weights studies more equally by adding the between-study variance to the denominator of each weight. If effect estimates are related to standard errors (asymmetry), the random-effects estimate is pulled more toward the small studies than the fixed-effect estimate is. In notation, with weights $w_i^{FE}=1/s_i^2$ and $w_i^{RE}=1/(s_i^2+\hat\tau^2)$, the relative weight of a small study ($s_i$ large) is increased as $\hat\tau^2$ grows.

^thm-re-pull

(The weight formulas are standard; the paper states the qualitative result and its undesirable consequence: "Random effects models can thus have undesirable consequences and are not always conservative".)

> [!example] Intravenous magnesium after myocardial infarction (Figs 4-5)
> *Setup:* trials of IV magnesium on mortality after MI. A meta-analysis of small trials had found a beneficial effect on mortality; the very large ISIS-4 trial then found no benefit.
> *Funnel plot (Fig 4):* a contour-enhanced funnel plot gives a clear visual impression of asymmetry, confirmed by small $P$-values from the Harbord test ($P<0.001$) and the Peters test ($P=0.002$).
> *Fig 5 (fixed vs random):* in the fixed-effect analysis ISIS-4 receives 90% of the weight and there is no evidence of benefit. There is clear between-study heterogeneity ($P<0.001$, $I^2=68\%$), and in the random-effects analysis the small studies dominate so that the intervention appears beneficial.
> *Interpretation:* one must judge the validity or relevance of the small trials versus ISIS-4. The contour-enhanced plot suggests publication bias does not completely explain the asymmetry, since many of the beneficial effects in small studies were not significant. Plausible explanations: methodological flaws in small studies, or changes in the standard of care (aspirin, heparin, thrombolysis). This was reinforced by the later MAGIC trial (magnesium added to these treatments; odds ratio 1.0, 95% CI 0.8 to 1.1, no benefit on mortality).

^ex-magnesium

### Recommended practice

> [!definition] Compare fixed and random effects
> When concerned about asymmetry in a meta-analysis with between-study heterogeneity, compare the fixed- and random-effects estimates. If the random-effects estimate is more beneficial, consider whether it is plausible that the intervention is more effective in smaller studies. Formal investigation of heterogeneity may explain the asymmetry, in which case results should focus on it. If larger studies are methodologically superior or run in conditions more typical of practice, it may be appropriate to include only larger studies.

^def-compare-fe-re

### Extrapolation of a funnel plot regression line

> [!definition] Regression-based adjustment
> If asymmetry is due to bias rather than substantive heterogeneity, larger studies are usually taken to be more believable. Extrapolating a regression line on the funnel plot to minimum bias (maximum sample size, $s\to0$) yields a meta-analytic estimate regarded as corrected for such biases. In the Egger form this is the intercept $\beta_0$ of $\hat\theta_i=\beta_0+\beta_1 s_i+\dots$. Because bias, heterogeneity and chance are hard to distinguish, "the broad applicability of such approaches is uncertain"; further adjustment approaches are in the appendix.

^def-extrapolation

Andrews and Kasy later argue this interpretation can be misleading under selection because the conditional mean of $\hat\theta$ is non-linear in $s$ and $1/s$ ([[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]]).

### Discussion in the paper

- Reporting bias is one of several explanations of asymmetry; because of low power and multiple causes, other remedies matter: trial-registry searches (not yet guaranteeing access to protocols/results); restricting to registered trials when all report the outcome (precludes publication bias); comparisons of published trials against regulatory submissions show clear reporting bias; methods for selective outcome reporting are described elsewhere.
- Applicability: the recommendations are for **randomised trials**. Observational and diagnostic meta-analyses differ: confounding and measurement precision may relate study size to effect (e.g. large routinely-collected-data studies controlling confounding less well; large studies using self-reported exposure, small studies precise instruments).

## Examples

The magnesium case above is the worked example. A numeric illustration of the random-effects pull (illustrative, not from the paper): two studies, a large one ($s=0.05$, $\hat\theta=0.0$) and a small one ($s=0.5$, $\hat\theta=1.0$), $\hat\tau^2=0.25$. Fixed-effect weights $400$ and $4$ give $\hat\theta_{FE}\approx0.0099$. Random-effects weights $1/(0.0025+0.25)=3.96$ and $1/(0.25+0.25)=2.0$ give $\hat\theta_{RE}=2.0/5.96\approx0.336$ - the small study now carries one third of the weight instead of 1%.

## Connections

- Test mechanics that detect the asymmetry: [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]].
- A Bayesian hierarchical alternative that estimates $\tau$ jointly rather than choosing between fixed and random: [[Meager 2019 - Hierarchical Model Specifications]].
- Prior-based regularisation of the between-study scale: [[Hierarchical Models]].

### Relevance to marketing measurement

Pooling a big always-on geo experiment with many small platform lift studies is exactly the ISIS-4 situation: the fixed-effect pool follows the big test, the random-effects pool follows the small ones. Report both, and ask whether small tests plausibly measured something different (different audiences, creative, or spend levels) before choosing.

## See Also

- [[Sterne 2011 - Funnel Plot Asymmetry - Overview]]
- [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]
- [[Conversion Lift Studies on Ad Platforms]]
- [[Geo-Experiment Methodology - Overview]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
