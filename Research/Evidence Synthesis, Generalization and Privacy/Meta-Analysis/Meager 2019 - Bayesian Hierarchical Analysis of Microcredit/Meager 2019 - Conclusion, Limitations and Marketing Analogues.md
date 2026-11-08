---
title: "Meager 2019 - Conclusion, Limitations and Marketing Analogues"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. VI Conclusion (pp. 86-87); limitations across the paper"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
  - "[[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]"
  - "[[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]]"
used_by:
  []
aliases:
  - "Meager 2019 conclusion and marketing analogues"
  - "Using hierarchical aggregation for marketing experiments"
---
# Meager 2019 - Conclusion, Limitations and Marketing Analogues

> [!summary]
> Microcredit access does not transform the lives of poor households measurably, nor causes over-indebtedness; heterogeneity is moderate (about 60% of observed variation is sampling variation) so RCTs are reasonably externally valid; but the Bayesian predictive effect differs from classical meta-analysis. This note also maps the method to combining marketing experiments (my extension, not the paper's claims).

## Overview

The conclusion, the paper's limitations and future directions, and a grounded translation of its method to marketing measurement.

## Main Content

### Conclusion (as stated)

- Microcredit access does not transform lives "in measurable ways", yet there is little evidence of over-indebtedness or destroyed livelihoods from credit bubbles.
- Moderate heterogeneity: about 60% of initial variation is sampling variation; the studies' effects are reasonable signals for other sites and contain predictive information about a broader class of sites. But the moderate heterogeneity detected is still enough to make the Bayesian predictive effect $\tau_{K+1}$ differ from classical meta-analysis.
- Prior business experience: larger effects, but varying so widely across studies as to prevent general conclusions of positive impact.
- Interest rates, loan sizes and gender targeting are more predictive than randomisation unit or other protocols; further work on altering loan-contract features (Field et al. 2013) may be warranted.

### Limitations and open directions (stated)

> [!definition] Stated limitations
> (1) **Mean effects only:** microcredit might affect welfare without moving averages (risk management; heterogeneity across quantiles within studies, Crepon et al. 2015); quantile treatment effects need different aggregation models, treated in Meager (2016). (2) **RCT-only inclusion:** limits contexts; observational studies could add insight; new aggregation methods are needed for mixed study types. (3) **Exchangeability:** $\tau_{K+1}$ applies only to sites exchangeable with those studied; policymakers must judge comparability. (4) **Decision theory:** aggregation is necessary but not sufficient for policy decisions - risks, cost of information and other variables require a decision-theoretic framework (future research). (5) **Gaussian outcome likelihood** is unrealistic (see Meager 2016). (6) **Data issues** (attrition, selection, few individual baseline surveys) left as in the public datasets. (7) **Spillovers:** the ITT access effect may understate effects on eventual borrowers.

^def-meager-limitations

### Mapping to marketing measurement (extension, not in the paper)

| Meager 2019 object | Marketing analogue |
|---|---|
| site $k$, $\hat\tau_k\pm\widehat{se}_k$ | one geo experiment or lift study for a channel |
| $\tau$ | channel's general incremental effect (e.g. lift per dollar) |
| $\sigma_\tau$ | portability of that effect across markets, brands, flights |
| $\omega(\tau_k)$ | how much a single test should be shrunk toward the channel average |
| $\tau_{K+1}$ posterior predictive | what to expect in the next test/market; used as a prior for an MMM channel coefficient |
| exchangeability | tests are comparable (same channel, similar creative/spend regime); otherwise condition on covariates (eq. 4) |
| ridge on site covariates | which test attributes predict effect variation when you have a handful of experiments |
| vote counting | counting "significant" tests in a deck instead of pooling |
| control-mean pooling $\omega(\mu)$ | do baselines differ so much that similar lifts are a coincidence of market choice |

> [!example] Combining five geo tests (hypothetical)
> *Setup.* Five geo experiments for one channel give incremental ROAS estimates $(2.8,1.1,0.4,2.0,0.9)$ with standard errors $(1.0,0.6,0.5,1.2,0.4)$. *Method.* Fit eq. (1) with a weak prior on $\sigma_\tau$ (e.g. half-normal or half-Cauchy); report the posterior of $\tau$, $\omega_k$ for each test and the predictive interval for $\tau_{K+1}$ (code in [[Meager 2019 - Pooling Factors and Measuring External Validity]]). *Interpretation.* Use the predictive distribution, not the pooled $\tau$ interval, as the prior for the next geo's channel ROAS in the MMM; wide predictive width is a signal the market-specific test is worth running. The numbers here are invented for illustration.

^ex-geo-combination

Caveats for transferring the method: (i) test selection - if only tests that "worked" are in the set, Meager's inputs are contaminated by the selection described in [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]; (ii) measurement protocols vary (geo vs user-level, ITT vs ATT); (iii) the paper's microcredit results do not carry any quantitative expectation for advertising.

## Examples

See the geo-combination illustration above and the results tables in [[Meager 2019 - Average Treatment Effects - Results]].

## Connections

- Marketing experiment context: [[Geo-Experiment Methodology - Overview]], [[Conversion Lift Studies on Ad Platforms]], [[User-Level vs Geo-Level Experiments - When to Use Which]].
- MMM prior use: [[Bayesian Estimation and Priors for MMM]].
- Publication/selection bias in the input set: [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]], [[Sterne 2011 - Funnel Plot Asymmetry - Overview]].
- Transport of experimental results to targets: [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]].

### Relevance to marketing measurement

See the mapping table above; the paper itself makes no marketing claims.

## See Also

- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Hierarchical Models]]
