---
title: "Sterne 2011 - Funnel Plot Asymmetry - Overview"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/overview
  - doc/paper
source: "[[raw/Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry.pdf]]"
source_location: "Whole paper, pp. 1-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry"
doc_type: paper
depends_on:
  []
used_by:
  - "[[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]"
  - "[[Sterne 2011 - Tests for Asymmetry and the Egger Regression]]"
  - "[[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]]"
aliases:
  - "Sterne 2011 funnel plot recommendations"
  - "Funnel plot asymmetry recommendations (Sterne et al. 2011)"
---
# Sterne 2011 - Funnel Plot Asymmetry - Overview

> [!summary]
> Sterne et al. (BMJ 2011;342:d4002, a Research Methods & Reporting article by 13 methodologists) set out how to draw, test and interpret funnel plots in meta-analyses of randomised trials. Their central message is that **funnel plot asymmetry is not the same as publication bias**: heterogeneity, poor small-study quality, artefacts and chance can all produce it, and the standard tests (Egger and successors) have low power, so they should be used only when there are at least about 10 studies.

> [!note] Source substitution
> The requested source was Egger, Davey Smith, Schneider and Minder (1997), *Bias in meta-analysis detected by a simple, graphical test* (BMJ 315:629). No legally free PDF could be retrieved (the PMC/BMJ copies sit behind an automated-access challenge). This article is the closest open-access substitute on the same method: it re-derives the Egger test in context, states when to use it, and lists the alternatives. The 1997 paper's design and headline numbers are summarised from its published abstract in [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]], flagged as such.

## Overview

**Research question.** Funnel plots and asymmetry tests are widely used to "examine bias" in meta-analyses, yet asymmetry is "often, wrongly, equated with publication or other reporting biases". The article asks: how should a reviewer examine and interpret funnel plot asymmetry (also called *small study effects*), which tests are appropriate for which outcome types, and what does asymmetry imply for the choice of meta-analysis model?

**Basis.** A detailed MEDLINE review of literature up to 2007 plus discussions among methodologists, extending guidance from the Cochrane Handbook for Systematic Reviews of Interventions.

**Contributions.**
1. A taxonomy of causes of asymmetry (Box 1): reporting biases, poor methodological quality, true heterogeneity, artefact, chance.
2. Practical rules (Box 2): at least 10 studies, interpret with the plot, pre-specify the test, do not run many tests, avoid when standard errors are all similar.
3. Test-by-outcome guidance: Egger for continuous outcomes; Harbord / Peters for odds ratios with small heterogeneity; arcsine test with random effects (Rucker) when $\tau^2>0.1$.
4. Interaction with model choice: if asymmetry plus heterogeneity exist, compare fixed- and random-effects estimates, because random-effects weighting pulls the pooled estimate toward the small studies.
5. A caution on regression-line extrapolation as a "bias-corrected" estimate.

**Key result.** The intravenous magnesium example (Fig 4-5): fixed effect (ISIS-4 carries 90% of the weight) shows no benefit; random effects, dominated by small trials, shows benefit; asymmetry tests give $P<0.001$ (Harbord) and $P=0.002$ (Peters); the contour-enhanced plot suggests publication bias alone does not explain it.

## Main Content

### Source Map

| Paper section | Where covered |
|---|---|
| Summary points; Introduction | this note; [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] |
| What is a funnel plot? (Fig 1) | [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] |
| Implications of heterogeneity, reporting bias and chance (Fig 2, Box 1) | [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] |
| Interpreting funnel plot asymmetry (Fig 3) | [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] |
| Statistical tests for funnel plot asymmetry; Box 2 | [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]] |
| Funnel plots and meta-analysis models: fixed vs random (Fig 4, Fig 5) | [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] |
| Extrapolation of a funnel plot regression line | [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] |
| Discussion; competing interests; references | [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] |

### One-line statements of the recommendations

> [!theorem] Practical recommendations in brief
> (R1) Do not test for asymmetry with fewer than ~10 studies, or when the standard errors are all similar. (R2) Read the test with the plot (contour-enhanced if possible). (R3) Treat publication bias as only one of several explanations. (R4) Pre-specify the test; if several are run, report all. (R5) Under asymmetry and heterogeneity, compare fixed and random effects estimates.

^thm-sterne-recommendations

## Examples

See the magnesium worked example in [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] and the Egger-test simulation in [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]].

## Connections

- The selective-publication mechanics that make small significant studies over-represented are formalised in [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]], which also analyses the Egger-type meta-regression under its model.
- Why a published literature overstates effects at all: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Researcher Degrees of Freedom]].
- Hierarchical alternative to fixed/random pooling: [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]].

### Relevance to marketing measurement

When pooling many lift or geo experiments, the "small studies" are underpowered tests; if only the winners get written up in an internal deck, an Egger-style check (effect vs standard error) is a cheap diagnostic. The paper's warning applies directly: asymmetry could equally mean the big tests were run on different (less responsive) markets, i.e. true heterogeneity.

## See Also

- [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]
- [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]]
- [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]]
- [[Conversion Lift Studies on Ad Platforms]]
