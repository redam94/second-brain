---
title: "Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview"
tags:
  - source/ingested
  - topic/latent-traits
  - type/overview
  - doc/paper
source: "[[raw/Elrod and Keane 1995 - A Factor-Analytic Probit Model for Market Structure in Panel Data.pdf]]"
source_location: "Full paper, J. Marketing Research 32(1):1-16 (MPRA Paper 52434)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Elrod and Keane 1995 - Factor-Analytic Probit Market Structure"
doc_type: paper
depends_on:
  - "[[Discrete Choice Models]]"
  - "[[Random Coefficients Logit Model]]"
used_by:
  - "[[Elrod and Keane 1995 - Models for Internal Market Structure Analysis]]"
  - "[[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]]"
aliases:
  - Elrod Keane factor-analytic probit
  - internal market structure analysis panel data
---

# Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview

> [!summary]
> Elrod & Keane propose a multinomial probit with a factor-analytic covariance (common factors for market structure plus equal unique variance) estimated from household panel data by simulated moments. On a laundry-detergent data set it beats the structureless Dirichlet-multinomial and equisimilar probit, Choice Map, SCULPTRE and Chintagunta's latent-class map on predictive log-likelihood and face validity, supporting the claim that it alone recovered real market structure. Market structure means: brands compete more closely when they load similarly on a few common attributes, which a structureless (IIA) model cannot represent.

## Overview

**Citation.** Elrod, T. and Keane, M. P. (1995), *A factor-analytic probit model for representing the market structure in panel data*, Journal of Marketing Research 32(1): 1-16. Scanned copy via MPRA (Paper No. 52434).

**Problem.** Internal market structure analysis infers brand attributes and consumer preferences from choice data. Existing methods (Table 1 in the paper) either require aggregate data, ignore marketing variables, or restrict consumer heterogeneity (linear in observed covariates, discrete latent classes, or reduced-rank).

**Contribution.** (1) A probit model with factor structure $\Sigma=LL'+\kappa I$ for household brand-preference deviations; (2) estimation for panel data (up to 24 purchases) using Keane's (1990) simulated-moments method with the Geweke-Hajivassiliou-Keane (GHK) simulator; (3) an equisimilar probit ($L=0$) as the structureless benchmark in the same model family; (4) an empirical comparison on 100 households and 8 detergent brands.

## Motivating PyMC examples

See <https://redam94.github.io/pymc-challenges/examples.html>: **E84** (Market structure analysis: who competes with whom? - Allenby & Rossi (1991) margarine scanner panel; switching matrices, IIA, nested logit hierarchies, factor-structured hierarchical logit as a choice map) and **E85** (Market structure from purchase incidence: panel, activity and demographics; Bernoulli-logit factor ladder). The probit factor model here is the classical precursor of those factor-structured choice maps; the Bayesian logit-factor versions are in the concept note [[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]]. Substitution note: Allenby & Rossi (1991) has no legal open copy; this MPRA paper is the closest open source on the same method family.

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract; Introduction; Models for internal market structure analysis (Table 1) | 1-4 | [[Elrod and Keane 1995 - Models for Internal Market Structure Analysis]] |
| A new factor-analytic probit model for panel data | 4-5 | [[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]] |
| Fitting probit models to panel data | 5 | [[Elrod and Keane 1995 - Simulated Moments and Panel Estimation]] |
| Model specification: factor-analytic probit (Eqs. 1-6); equisimilar probit and IIA (Eqs. 7-8) | 5-7 | [[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]] |
| Empirical assessment: data, models compared, estimation notes | 7-8 | [[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]] |
| Probit estimates (Table 2, Fig. 1) | 8-9 | [[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]] |
| Predictive validity, goodness of fit (Eqs. 9-17, Table 3), face validity, conclusions | 9-13 | [[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]] |
| Technical appendix (Eqs. A1-A7): MOM, MSM, panel MSM, GHK | 13-15 | [[Elrod and Keane 1995 - Simulated Moments and Panel Estimation]] |
| References | 15-16 | this note |

## Main Content

Table 1 of the paper compares nine families by data type, whether they explain market shares, handle non-product variables, model structure and heterogeneity:

| Model | Data | Shares | Marketing vars | Structure | Heterogeneity |
|---|---|---|---|---|---|
| DEFENDER | market shares | yes | price | spatial | uniform/beta |
| Competitive maps | market shares | no | price | spatial | implicit |
| Grover-Srinivasan; Jain-Bass-Chen | switching | no | no | cluster | latent class |
| DeSarbo-Hoffman | pick-any/n | yes | no | spatial | idiosyncratic or explained |
| SCULPTRE | purchase frequencies | yes | no | ultrametric tree | latent class |
| Choice Map | purchase frequencies | yes | no | spatial | reduced-rank normal |
| Chintagunta (1994) | disaggregate panel | yes | any | spatial | reduced-rank latent class |
| **Factor-analytic probit** | disaggregate panel | yes | any | spatial | full-rank multivariate normal |

## Examples

Table 2 and Table 3 results: [[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]].

## Relevance to marketing measurement

Market structure determines cross-elasticities: who a brand's promotions steal from. A structureless model (IIA) predicts proportional substitution and so misprices cannibalisation and competitive response in MMM-adjacent demand modelling; factor-structured choice models capture asymmetric competition in a low-dimensional map. See [[Discrete Choice Models]] and [[Random Coefficients Logit Model]] (BLP-style demand) for continuous heterogeneity alternatives.

## Connections

- Probit vs logit: the probit covariance structure relaxes IIA; mixed logit does it via random coefficients ([[Random Coefficients Logit Model]]).
- Factor structure: [[Factor Analysis and PPCA]].

## See Also

[[Elrod and Keane 1995 - Models for Internal Market Structure Analysis]]
