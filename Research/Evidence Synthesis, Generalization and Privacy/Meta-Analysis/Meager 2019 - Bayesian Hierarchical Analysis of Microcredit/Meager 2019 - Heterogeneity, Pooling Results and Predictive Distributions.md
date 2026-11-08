---
title: "Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. IV (pp. 74-80): Tables 3-4, Figs 5-6"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Pooling Factors and Measuring External Validity]]"
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
used_by:
  - "[[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]]"
  - "[[Meager 2019 - Conclusion, Limitations and Marketing Analogues]]"
aliases:
  - "Microcredit heterogeneity and predictive distributions"
  - "Pooling factor tables for microcredit"
---
# Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions

> [!summary]
> About 60% of observed variation in treatment effects is sampling variation (average of the pooling metrics across outcomes), whereas there is essentially no pooling of control means - so similar treatment effects do not reflect similar populations. Predictive intervals for the next site are much wider than OLS (profit: nearly three times) and, for almost all outcomes, carry about a 25% chance of an adverse-sign effect.

## Overview

Section IV: the heterogeneity metrics for the joint model (Table 3) and independent model (Table 4), the posterior predictive distribution $\tau_{K+1}$ (Figs 5-6) and the comparison with Pritchett-Sandefur and Vivalt.

## Main Content

> [!example] Table 3 - Pooling factors, joint model (averages across sites)
> | Outcome | $\omega(\tau)$ | $\breve\omega(\tau)$ | $\lambda(\tau)$ | $\omega(\mu)$ | $\breve\omega(\mu)$ | $\lambda(\mu)$ |
> |---|---|---|---|---|---|---|
> | Profit | 0.5 | 0.7 | 0.7 | 0.0 | 0.1 | 0.0 |
> | Expenditures | 0.5 | 0.6 | 0.8 | 0.0 | 0.1 | 0.0 |
> | Revenues | 0.5 | 0.5 | 0.8 | 0.0 | 0.1 | 0.0 |
> | Consumption | 0.5 | 0.7 | 0.9 | 0.0 | 0.2 | 0.0 |
> | Consumer durables | 0.3 | 0.5 | 1.0 | 0.0 | 0.0 | 0.0 |
> | Temptation goods | 0.2 | 0.4 | 0.6 | 0.0 | 0.1 | 0.0 |
>
> $0$ = no pooling, $1$ = full pooling; simple averages across all sites. $\omega$ conventional metric (eq. 6), $\breve\omega$ proximity/brute-force metric (eq. 7), $\lambda$ Gelman-Pardoe metric (eq. 8).

^ex-table3

> [!example] Table 4 - Pooling factors, independent model (robustness)
> | Outcome | $\omega(\tau)$ | $\breve\omega(\tau)$ | $\lambda(\tau)$ | $\omega(\mu)$ | $\breve\omega(\mu)$ | $\lambda(\mu)$ |
> |---|---|---|---|---|---|---|
> | Profit | 0.4 | 0.5 | 0.7 | 0.0 | 0.0 | 0.0 |
> | Expenditures | 0.5 | 0.4 | 0.8 | 0.0 | 0.1 | 0.0 |
> | Revenues | 0.4 | 0.5 | 0.7 | 0.0 | 0.0 | 0.0 |
> | Consumption | 0.4 | 0.6 | 0.8 | 0.0 | 0.2 | 0.0 |
> | Consumer durables | 0.3 | 0.4 | 1.0 | 0.0 | 0.0 | 0.0 |
> | Temptation goods | 0.3 | 0.4 | 0.7 | 0.0 | 0.1 | 0.0 |
> ^ex-table4

> [!theorem] The "60 percent" result
> Averaged across all metrics and outcomes, about 60% of the initially observed variation in treatment effects is attributed to sampling error. Arithmetic check: the 18 treatment-effect entries of Table 3 average $10.7/18=0.59$ (Table 4: $9.8/18=0.54$). There is no pooling of information on control means ($\omega(\mu)=0$ in every row), so whatever similarity there is in treatment effects does not reflect pre-existing similarity in study populations: microcredit access produces "similar, although not identical, treatment effects even in heterogeneous populations". The genuine heterogeneity is thus smaller than previously thought (Pritchett and Sandefur 2015; Vivalt 2016), and the hierarchical models detect slightly more general than local information on average.

^thm-sixty-percent

### Posterior predictive for the next site

> [!definition] Predictive distribution of $\tau_{K+1}$
> For each outcome, the posterior predictive distribution of the effect in the next exchangeable site (Fig 5, joint model; Fig 6, independent model, somewhat wider because the observed typically positive correlation between control mean and treatment effect improves fit) with full-pooling OLS for comparison. Predictive intervals are substantially wider than OLS intervals, reflecting heterogeneity, and for almost all outcomes the next site's effect has a **25% chance of falling in a socially undesirable direction**. Exception: for consumer durables the hierarchical results are more precise, because sampling variation is particularly large for durables.

^def-predictive-next

> [!example] Profit in the next site
> The next site's effect on profit has a 50% chance of lying between US\$0 and US\$11 PPP, a 25% chance of being negative, and a 25% chance of exceeding US\$11 PPP. The 95% prediction interval is "almost three times wider" than the OLS 95% interval. Full pooling tends to underestimate uncertainty when effects are heterogeneous.

^ex-predictive-profit

*Comparison with others.* Pritchett and Sandefur (2015) analysed each study separately before comparing results; that procedure does not pool and retains sampling-variation heterogeneity, so it is unsurprising they find more dispersion. Vivalt (2016) finds more heterogeneity, perhaps because observational studies are included. Both differ from this paper's finding that effects are reasonably informative of one another.

## Examples

*Why ω is about 0.5 for profit.* From Table 3, $\omega(\text{profit})=0.5$ means $\tilde\sigma_\tau^2\approx\widehat{se}^2$ for the average site, i.e. true heterogeneity is about equal to sampling noise: the shrinkage weight toward the general effect is a half. In the hypothetical Rubin example of [[Meager 2019 - Pooling Factors and Measuring External Validity]] precise sites had $\omega\approx0.3$ and noisy sites $\omega\approx0.95$.

## Connections

- Metric definitions: [[Meager 2019 - Pooling Factors and Measuring External Validity]].
- What explains the residual heterogeneity: [[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]].
- Transportability framing of "which sites can predict which": [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]].

### Relevance to marketing measurement

Quote the predictive interval for the next market, not just the pooled mean: here a US\$7 average profit effect sits next to a one-in-four chance of a negative effect. For budget allocation, that downside probability is the decision-relevant number.

## See Also

- [[Meager 2019 - Average Treatment Effects - Results]]
- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
