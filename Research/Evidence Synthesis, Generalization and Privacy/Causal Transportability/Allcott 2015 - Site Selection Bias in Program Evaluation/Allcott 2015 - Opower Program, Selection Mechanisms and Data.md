---
title: "Allcott 2015 - Opower Program, Selection Mechanisms and Data"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Secs. 4-5, pp. 9-16, Tables 3-4, Figure 1"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Model of External Validity and Site Selection Bias]]"
used_by:
  - "[[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]"
  - "[[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]"
aliases:
  - "Opower Home Energy Report setting"
  - "utility-level site selection mechanisms"
---

# Allcott 2015 - Opower Program, Selection Mechanisms and Data

> [!summary]
> The Opower Home Energy Report is a mailed neighbor-comparison treatment run as RCTs at 111 sites (58 utilities, 8.6M households). Allcott hypothesizes five utility-level selection mechanisms (usage, population preferences, other programmes, size, ownership) and two data layers: microdata for the first 10 sites (508,295 households) and metadata for all 111. Effects vary significantly across sites (Cochran's Q p<0.001), making site selection bias possible.

## Overview
The setting is nearly ideal for studying site selection: high treatment fidelity, near-universal randomization, no household opt-in problem, and a well-defined target population (all residential consumers of 882 large US electric utilities).

## Main Content

### 4.1 The programme
- **Home Energy Report**: two-page letter; Neighbor Comparison Module compares household use to its 100 geographically nearest neighbors in similar house sizes; Action Steps Module gives personalised conservation tips. Branded with the utility's name.
- Implemented as RCTs (mail makes a randomized holdout easy) except at a few utilities too small for precise estimates. Frequency varies (e.g., three monthly then bimonthly). Treatment fidelity is "remarkably high" versus job training or contract teachers.
- Natural field experiment (people unaware); **opt-out** (about 0.6% opt out in year one), so no household-level selection modelling is needed and the effect is a policy-relevant treatment effect.

### 4.2 Site selection mechanisms
Two levels: (a) utility contracts with Opower (mostly demand-side; founders contacted 50-100 utilities to land the first ten), (b) utility chooses the sample population within its territory.

> [!definition] Five utility-level selection mechanisms
> - **Usage**: higher-usage utilities have more potential savings and better cost effectiveness (kWh saved per dollar).
> - **Population preferences**: environmentalist states adopt Energy Efficiency Resource Standards (EERS); environmentalist consumers may also respond more to conservation messaging — positive selection.
> - **Complementary or substitute programmes**: Opower can lead households into other utility programmes (complement) or crowd out savings already captured (substitute) — sign ambiguous.
> - **Size**: large utilities have scale economies but are urban, with less neighbor-comparison response — negative selection.
> - **Ownership**: investor-owned utilities (IOUs) lack incentives absent EERS and have lower customer satisfaction, hence perhaps lower trust in utility information; municipal and cooperative utilities are more welfare-maximising. ^def-selection-mechanisms

Within-utility selection: utilities, with guidance from Opower, pick who gets reports; heavier users conserve more (more to cut, comparison pushes toward the norm), so some utilities include only heavy users, then later expand.

Opower differs from academic programmes in being for-profit (early successes benefit the company), but non-profits depend on funding contingent on early results too (Pritchett 2002). It is opt-out, so utilities can target responsive households.

### Data (Sec. 5)
- **Utility-level**: all 882 large utilities (excluding utilities under 10,000 residential customers and power marketers in deregulated states); utility defined per state; 58 partners (all that began RCTs by Feb 2013). EIA Form 861 (2007) plus county-level census and other data.
- **Microdata**: household-level for the ten programmes starting before Dec 2009: 21.3M meter reads from 508,295 households (5.4M in first post-treatment year); 12 covariates in four groups (usage comparison, population preferences, existing EE participation, housing stock).
- **Metadata**: ATEs and standard errors, control mean usage, number of reports, for 111 sites with at least a year of post-treatment data (58 utilities). Average site: about 77,200 households (53,300 treated). Total 8.57M households (about one in 12 US households).

> [!example] Table 3 - utility characteristics, partners vs non-partners
> | Characteristic | All (882) | Partners (58) | Non-partners (824) | Difference |
> |---|---|---|---|---|
> | Utility mean usage (kWh/day) | 34.7 | 28.3 | 35.2 | -6.8*** |
> | Mean income ($000s) | 50.2 | 59.0 | 49.6 | 9.4*** |
> | Share college grads | 0.21 | 0.27 | 0.21 | 0.06*** |
> | Hybrid auto share | 0.0073 | 0.0112 | 0.0070 | 0.0042*** |
> | Democrat share | 0.44 | 0.53 | 0.44 | 0.10*** |
> | Green Party share | 0.0046 | 0.0052 | 0.0046 | 0.0007* |
> | EERS in state | 0.58 | 0.97 | 0.55 | 0.41*** |
> | Green pricing share | 0.0045 | 0.0100 | 0.0041 | 0.0059** |
> | Residential conservation / sales | 0.0007 | 0.0035 | 0.0005 | 0.0029*** |
> | Conservation cost / revenues | 0.0027 | 0.0092 | 0.0022 | 0.0069*** |
> | Municipally-owned | 0.26 | 0.17 | 0.27 | -0.10* |
> | Investor-owned | 0.19 | 0.74 | 0.15 | 0.59*** |
> | ln(residential customers) | 10.5 | 12.8 | 10.4 | 2.5*** |
> | F-test p-value | | | | 0.0000 |
>
> All 13 covariates unbalanced at 90%+ confidence. "Normalized Population Preferences" = sum of the seven preference variables (income, college share, hybrid share, Green Party share, Democrat share, EERS, green pricing), each standardised; "Normalized Other Programs" = sum of the two programme variables, each standardised. ^tbl-utility-chars

> [!example] Table 4 - microdata covariates (first 10 sites) vs national and later sites
> | Covariate | Microdata mean | National mean | Later-sites mean |
> |---|---|---|---|
> | First comparison (kWh/day) | 1.47 | 0.00 | 1.34 |
> | Tract mean income ($000s) | 73.8 | 57.0 | 59.3 |
> | Tract share college grads | 0.35 | 0.25 | 0.27 |
> | Tract share hybrid autos | 0.018 | 0.010 | 0.011 |
> | Green pricing participant | 0.096 | 0.006 | 0.009 |
> | Electric heat | 0.12 | 0.34 | 0.28 |
> | House age (years) | 41.5 | 39.2 | 41.2 |
> | Has pool | 0.18 | 0.17 | 0.17 |
> | Rent | 0.10 | 0.33 | 0.33 |
> | Single family | 0.76 | 0.63 | 0.64 |
> | Square feet (000s) | 1.83 | 1.86 | 1.83 |
>
> N = 508,295 households. "First comparison" is the household's usage minus the mean neighbor's, as printed on the first report. EE-programme participant is observed only in the microdata (mean 0.06). National mean is consumer-weighted over the 882 utilities; later-sites mean is unweighted over 101 sites. ^tbl-microdata-covariates

### Dispersion of site effects (Sec. 5.3.1)
- Percent ATEs (first year): mean 1.31% (0.47 kWh/day); range 0.50-2.63% (0.10-1.47 kWh/day); SD 0.45 pp vs mean SE 0.18 pp; **Cochran's Q rejects homogeneity, p<0.001**.
- Percent ATEs are better for prediction: control group usage strongly predicts kWh/day ATEs ($t=11.35$, $R^2=0.54$ across 111 sites); coefficient of variation is 55% higher in kWh/day.
- Figure 1: if each site's percent ATE were extrapolated nationwide, first-year savings would range from \$695 million to \$3.62 billion (factor 5.2), SD \$618 million. Hence Assumption 3A fails when not conditioning on $X$.

## Examples
- Early academic proof-of-concept (Schultz et al. 2007; Nolan et al. 2008): door-hangers to about 300 homes in a wealthy California suburb gave effects 3-6 times larger than even the first ten Opower programmes — "strikingly consistent with site selection bias".

## Connections
Selection-on-observables comparisons (Tables 1-3) are the same descriptive diagnostic as covariate comparisons in [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]].

## See Also
- [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]
- [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
