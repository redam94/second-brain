---
title: "Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/overview
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Whole paper, AEJ: Applied 11(1): 57-91 (LSE open-access PDF, pp. 57-91)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  []
used_by:
  - "[[Meager 2019 - Studies, Data and Outcomes]]"
  - "[[Meager 2019 - Hierarchical Model Specifications]]"
  - "[[Meager 2019 - Bayesian Estimation, Priors and Computation]]"
  - "[[Meager 2019 - Pooling Factors and Measuring External Validity]]"
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
  - "[[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]"
  - "[[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]]"
  - "[[Meager 2019 - Conclusion, Limitations and Marketing Analogues]]"
aliases:
  - "Meager 2019 overview"
  - "Understanding the Average Impact of Microcredit Expansions (Meager 2019)"
---
# Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview

> [!summary]
> Meager (AEJ: Applied 2019) aggregates seven randomised microcredit trials with Bayesian hierarchical models that jointly estimate the average effect $\tau$ and the cross-site heterogeneity $\sigma_\tau$. Average effects on business and consumption outcomes are small (about 5% of the control mean) and uncertain; about 60% of observed heterogeneity is sampling variation, so the trials are reasonably externally valid; and economic features (interest rates, loan size, women-targeting) predict effects better than study protocols.

## Overview

**Research question.** Multiple RCTs of microcredit exist, but consensus on the overall result has been impeded by external-validity concerns: the studies may be too different from each other and from future settings to permit general conclusions. How large is the average effect, and how heterogeneous are effects across sites?

**Approach.** Rubin (1981)-style hierarchical models (and richer full-data versions with control means, household covariates and site covariates) estimated by Hamiltonian Monte Carlo in Stan, compared with classical full-pooling OLS and "vote-counting". Heterogeneity is assessed through $\sigma_\tau$, the posterior predictive distribution for the *next* site, and three pooling metrics.

**Key results.**
- Posterior mean effects (USD PPP per fortnight): profit $6.8$, expenditures $6.7$, revenues $14.5$, consumption $3.4$, consumer durables $1.8$, temptation goods $-0.8$; all 95% intervals include zero (Table 2).
- "Statistical significance" under full-pooling OLS for revenues and temptation goods disappears under the hierarchical model.
- Average pooling across all metrics and outcomes $\approx60\%$ sampling variation; no pooling of control means.
- Predictive intervals for the next site are far wider than OLS (about three times for profit) and for almost all outcomes have a 25% chance of an adverse sign.
- Prior business experience: precise zero profit effect without it; larger but more heterogeneous with it.
- Ridge regression on seven sites: women-targeting, interest rate, loan size more predictive than randomisation unit.

## Main Content

### Source Map

| Paper section | Where covered |
|---|---|
| Abstract; Introduction (pp. 57-60) | this note; [[Meager 2019 - Studies, Data and Outcomes]] (literature and inclusion) |
| I. Data (Table 1) | [[Meager 2019 - Studies, Data and Outcomes]] |
| II.A Hierarchical models, eq. 1-4, exchangeability | [[Meager 2019 - Hierarchical Model Specifications]] |
| II.B Bayesian estimation and inference, priors (eq. 5) | [[Meager 2019 - Bayesian Estimation, Priors and Computation]] |
| II.C Measuring external validity; eq. 6-8 | [[Meager 2019 - Pooling Factors and Measuring External Validity]] |
| III. General impact (Table 2, Fig 1-4) | [[Meager 2019 - Average Treatment Effects - Results]] |
| IV. Heterogeneity (Tables 3-4, Figs 5-6) | [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]] |
| V.A Household covariates (Figs 7-9); V.B Site-level covariates (Table 5, Fig 10) | [[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]] |
| VI. Conclusion | [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]] |
| Appendix A: technical details of estimation (HMC, NUTS, $\hat R$) | [[Meager 2019 - Bayesian Estimation, Priors and Computation]] |
| Online appendices B, C (robustness, cross-validation) | referenced only; not in the PDF |

### Notation

$K$ sites indexed by $k$; $\tau_k$ site-specific average treatment effect; $\hat\tau_k$ and $\widehat{se}_k$ its estimate and standard error; $\tau=E[\tau_k]$ the general effect; $\sigma_\tau^2=\text{var}(\tau_k)$ cross-site heterogeneity; $\mu_k$ control-group mean; $y_{ik}$ outcome of household $i$ in site $k$; $T_{ik}$ treatment indicator; $\tau_{K+1}$ the effect in a new, exchangeable site.

## Examples

See Table 2 and the profit example in [[Meager 2019 - Average Treatment Effects - Results]], and a runnable Rubin-model illustration (hypothetical data) in [[Meager 2019 - Pooling Factors and Measuring External Validity]].

## Connections

- Selective publication distorts which studies enter such an aggregation: [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]] (Meager cites it for nonparametric identification of the upper-level distribution).
- Classical alternatives and the funnel plot critique of fixed vs random effects: [[Sterne 2011 - Funnel Plot Asymmetry - Overview]].
- Hierarchical modelling in the vault: [[Hierarchical Models]], [[Hierarchical Linear Models]], [[Partial Pooling as Multiple Comparisons Correction]].
- Transport and external validity from the causal-graph viewpoint: [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]].

### Relevance to marketing measurement

The setup is the same as combining many geo or conversion-lift experiments for a channel: site $\leftrightarrow$ experiment/market, $\tau$ the channel's general lift, $\sigma_\tau$ how portable it is, $\tau_{K+1}$ the lift you should expect in the next flight. See the marketing-focused section in [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]] (extension is mine, not the paper's).

## See Also

- [[Meager 2019 - Hierarchical Model Specifications]]
- [[Meager 2019 - Average Treatment Effects - Results]]
- [[Bayesian Estimation and Priors for MMM]]
- [[Geo-Experiment Methodology - Overview]]
