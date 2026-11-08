---
title: "Kay 2016 - Experiment Beta Regression and Results"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/example
  - doc/paper
source: "[[raw/Kay Kola Hullman Munson 2016 - When (ish) is My Bus.pdf]]"
source_location: "Experiment, Results, Figs 5-7, pp. 6-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Kay 2016 - When-ish is My Bus"
doc_type: paper
depends_on:
  - "[[Kay 2016 - Quantile Dotplot Construction]]"
used_by:
  - "[[Kay 2016 - Discussion and Design Implications]]"
aliases:
  - Quantile dotplot experiment results
  - Beta regression of probability estimates
---

# Kay 2016 - Experiment Beta Regression and Results

> [!summary]
> Online experiment (320 bus-timeline plus 221 route-timeline participants after dropping 9): each person estimated bus-arrival probabilities from density, stripeplot-50, dotplot-20 and dotplot-100. A Bayesian beta regression with mean and dispersion submodels shows dotplot-20 is most precise (SD 0.11 at $p=0.5$), density and dotplot-100 about 0.13, stripeplot 0.16.

## Overview

**Method.** Four scenarios drawn from the user survey, each with two questions on arrival probability (for example waiting for a bus and deciding whether there is time to get coffee: chance the bus arrives in 10 minutes or earlier). Response by a 100-point visual analog slider; the response bubble shows the probability in every denominator used by the displays ("20/100, 10/50, 4/20") to avoid mental arithmetic. Predictions came from Box-Cox $t$ models fit to about two weeks of real Seattle arrival data with fake route names. Participants also rated confidence, ease of use and visual appeal. Each saw each visualisation once; scenario order and scenario-visualisation pairing randomised; layout (bus- vs route-timeline) between participants; a brief tutorial preceded each display.

**Participants.** Recruited via department lists, a transit blog and reddit; raffle for a USD 100 gift card plus USD 25 per 100 participants. The first 100 ran only the bus-timeline layout (a power analysis on the Hullman et al. data suggested power at least 0.8 for similar effects). After excluding 9 for incomplete data, 320 bus-timeline and 221 route-timeline; 71% male; 90% existing OneBusAway users.

## Main Content

> [!definition] Error decomposition
> Error $=\operatorname{logit}(\hat p)-\operatorname{logit}(p_{\text{true}})$. *Bias*: do people over/under-estimate on average. *Variance*: how self-consistent estimates are. The authors argue variance matters more "so long as the bias is low", because people can adjust to a small consistent bias.
^def-error-decomp

> [!definition] Beta regression model
> Responses $\hat p\in(0,1)$ (0 and 1 mapped to 0.001 and 0.999) follow a Beta distribution with a mean submodel in logit space (fixed effects: visualisation, $\operatorname{logit}(p_{\text{true}})$ and their interaction; random effects: participant, participant x visualisation, question) and a dispersion submodel in log space (fixed effects: visualisation, layout, gender). Fitted in Stan with 16 chains of 20,000 iterations (half warmup), thinned by 8, final sample 20,000; ESS above 10,000, $\hat R<1.001$. Priors are Gaussian, derived from fitting a similar model to the Hullman et al. (2015) data (skeptical means: 0 intercept, 1 slope in logit-logit space); results were similar under more default priors.
^def-beta-regression

**Bias.** Slightly positive and similar across conditions (error densities peak just right of 0; Fig. 6A). The authors suggest right-skewed arrival-time distributions as the cause.

**Variance: SD of $\hat p$ at $p=0.5$ (Fig. 6B).**

| Display | SD of estimated $p$ (percentage points) | Mean confidence (0-100) | Visual appeal | Ease of use |
|---|---|---|---|---|
| dotplot-20 | 11 | 81 [77, 83] | 43 [42, 45] | about 60 |
| dotplot-100 | 13 | 73 [71, 76] | not reported in text | about 60 |
| density | 13 | not reported in text | 66 [64, 67] (highest) | about 60 |
| stripeplot-50 | 16 (between 13 and 20) | not reported in text | not reported in text | 35 [33, 36] |

**Pairwise SD ratios (Fig. 7).**

| Comparison | Ratio |
|---|---|
| stripeplot / density | 1.25x |
| stripeplot / dotplot-100 | 1.22x |
| density / dotplot-100 | 0.97x |
| stripeplot / dotplot-20 | 1.44x |
| density / dotplot-20 | 1.15x (interval 1.04 to 1.26) |
| dotplot-100 / dotplot-20 | 1.18x |

*Interpretation.* Dotplot-20 is about 1.15 times more precise than density, i.e. estimates 1-3 percentage points tighter. Dotplot-100 converges to density behaviour because counting is too laborious, so people read area. The stripeplot, a discrete analogue of the gradient plot, performed worst (opacity is a weak encoding and counting is hard). Confidence for dotplot-20 correlated negatively with absolute error (Spearman $\rho=-0.18$, 95% CI $[-0.25,-0.13]$), an association not seen in other conditions: people can tell when they are accurate.

## Examples

Reading SD ratios: if density gives SD 0.13 then dotplot-20 gives roughly $0.13/1.15=0.113$, matching the 0.11 reported. Combining with a 95% interval: with SD 0.113 vs 0.13, a person's 95% band on $\hat p$ narrows from about $\pm0.25$ to $\pm0.22$ around the truth.

PyMC-style sketch (untested) for the dispersion submodel: `pm.Beta("y", mu=pm.math.invlogit(eta), nu=pm.math.exp(zeta), observed=y)` with `eta` and `zeta` linear predictors including participant random effects.

## Connections
- This is a hierarchical Bayesian analysis of a designed experiment: random effects for participant and question, informative priors from a prior study.
- Compare Hullman et al. (2015) who test animated outcomes: [[Hullman 2015 - Hypothetical Outcome Plots - Overview]].

## See Also
- [[Kay 2016 - When-ish is My Bus - Overview]]
