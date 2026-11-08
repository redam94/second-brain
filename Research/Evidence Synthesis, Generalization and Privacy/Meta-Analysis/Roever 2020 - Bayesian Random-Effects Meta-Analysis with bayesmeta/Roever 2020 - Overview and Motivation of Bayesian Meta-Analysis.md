---
title: "Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 1.1-1.4, pp. 1-6; Sec. 4, p. 37"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
used_by:
  - "[[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]]"
  - "[[Roever 2020 - Priors for the Effect and Heterogeneity]]"
aliases:
  - why Bayesian meta-analysis
  - Bayesian vs frequentist meta-analysis with few studies
---

# Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis

> [!summary]
> Meta-analyses typically include very few studies (Cochrane median 3, 75th percentile 6), where large-sample frequentist methods and plug-in heterogeneity estimates misbehave. Bayesian inference marginalises over the nuisance heterogeneity, needs no asymptotics, allows informative priors for $\tau$ and is uniquely defined once model and prior are fixed. The cost, MCMC, is avoided here by exploiting the two-parameter structure.

## Overview

Section 1 sets the context: meta-analysis as formal combination of information from separate investigations; heterogeneity between studies motivates a random-effects model; the normal-normal hierarchical model (NNHM) is the generic tool when estimates come with standard errors on a real-valued scale (e.g. log odds ratios from contingency tables); zero heterogeneity reduces it to the fixed-effect model.

## Main Content

### Why Bayesian: the small-$k$ argument

- **Study counts.** Cochrane Library: median 3, 75% quantile 6 studies (Davey et al. 2011; Kontopantelis et al. 2013). Psychological Bulletin meta-analyses (van Erp et al. 2017): median 12, quartiles 5 and 33.
- **Zero heterogeneity estimates.** 57% of heterogeneity estimates in Cochrane meta-analyses were exactly zero (Turner et al. 2012), more so for small analyses (Kontopantelis et al. 2013), suggesting heterogeneity is commonly underestimated or undetected. Chung et al. (2013) use a Gamma-type penalty to avoid zeros.
- **Plug-in problem.** The usual two-stage frequentist method estimates $\tau$ and then conditions on it as if known; warranted only if $\tau$ is estimated precisely. Exceptions that account for the uncertainty: Follmann and Proschan (1999), Hartung and Knapp (2001a,b), Sidik and Jonkman (2002) (inflated SE and Student-$t$), bootstrap (van den Noortgate and Onghena 2005), generalized inference (Friedrich and Knapp 2013).
- **Estimator arbitrariness.** Many heterogeneity estimators exist (Veroniki et al. 2016) and can give quite different values.
- **Bounded parameter.** $\tau\ge0$ causes boundary problems for frequentist methods (Mandelkern 2002).
- **Bayesian answer.** Marginalisation handles nuisance uncertainty; valid for any $k$ (no asymptotics for proper priors); a flat prior is *not* equivalent to likelihood-only inference here; posterior of one analysis can be the prior of the next (sequential meta-analysis: Spence et al. 2016; future trial design: Schmidli et al. 2017; historical controls: Wandel et al. 2017).

> [!theorem] Interval semantics (Sec. 1.3, App. A.5)
> A frequentist 95% CI aims at 95% coverage *conditionally on any single parameter point*; a Bayesian 95% credible interval has correct coverage *averaged over the prior*. Both statements are exact only in their own sense; a "uniform prior = frequentist" equivalence is a misconception in this model because $\tau$ lives on a bounded space.
^thm-interval-semantics

### Software landscape

- Frequentist: RevMan (Cochrane), `metafor`, `meta`.
- MCMC-based Bayesian: `bmeta` (Gibbs via JAGS; meta-regression), `bspmma` (nonparametric NNHM), `metaBMA` (model averaging), `bamdit`/`metamisc` (diagnostic studies).
- Exact/analytic: `mmeta` (count data); INLA-based: `meta4diag`, `nmaINLA` (network meta-analysis).
- `bayesmeta`: quasi-analytical posteriors, reproducible, no MCMC convergence diagnostics, enabling quick sensitivity analyses and large simulations (e.g. Friede et al. 2017a,b, who compared Bayesian and frequentist methods for few studies and recommended half-normal $\tau$ priors with scale 0.5 or 1.0 for log-OR endpoints).

### Summary (Sec. 4)

Advantages claimed: coherent handling of heterogeneity uncertainty; small $k$ no obstacle; direct interpretation; informative priors from external evidence; results uniquely defined by model and prior. `bayesmeta` makes this "not more complicated to use than many other common meta-analysis tools" and supports extrapolation to future studies. Further uses: hierarchical structure within a study (groups of patients), two-stage individual-patient-data meta-analysis. Future work: meta-regression with the same numerical approach.

## Examples

> [!example] A three-study meta-analysis in marketing terms
> Three geo experiments estimate log lift 0.12, 0.05, 0.20 with SEs 0.06, 0.05, 0.10. With $k=3$ a DL fit returns $Q\approx2.09$ on 2 df and $\hat\tau\approx0.01$ (essentially zero), with a narrow CI, implying near-perfect transfer to the next market. A Bayesian fit with a half-normal(0.1) prior on $\tau$ returns a posterior for $\tau$ that honestly spans 0 to about 0.2 and a wider predictive interval for market 4, which is what a budget decision needs. (Illustrative numbers; the machinery is [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]].)
^ex-three-geo-tests

## Connections

- [[Hierarchical Models]], [[Posterior Sampling and Summarization]]: general Bayesian context. [[Constructing Priors for Effect Sizes]]: how to choose the $\tau$ prior.
- Frequentist alternative for small $k$: [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]].

## See Also

- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
