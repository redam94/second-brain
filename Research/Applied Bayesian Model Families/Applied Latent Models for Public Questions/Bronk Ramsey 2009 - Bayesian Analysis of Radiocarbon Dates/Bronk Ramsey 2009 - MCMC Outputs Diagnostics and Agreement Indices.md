---
title: "Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]"
source_location: "pp. 353-358: Analysis methods, Model outputs, Diagnosis, Eqs. 33-39, Fig. 8, Conclusions"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
doc_type: paper
depends_on:
  - "[[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]]"
  - "[[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]]"
  - "[[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]]"
used_by:
  - "[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]"
aliases:
  - "OxCal agreement index"
  - "radiocarbon MCMC diagnostics"
  - "outlier analysis radiocarbon"
---

# Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices

> [!summary]
> Posteriors are explored by Metropolis-Hastings MCMC (about $10^5$-$10^6$ iterations), summarised as marginal densities and HPD ranges, and interrogated with derived quantities (first, last, span, order, interval). Models are checked by simulation (recover a known phase) and a data-free run; fit is measured by agreement indices $A_i=100F_i$ (acceptable above about 60%) and formal outlier analysis.

## Overview

The paper separates three problem areas: the model, the measurements, and the MCMC itself.

## Main Content

**Computation.** With 20 events over a 500-year span at 5-year resolution there are $(500/5)^{20}=10^{40}$ outcomes, so grid enumeration is impossible. OxCal 4 uses Metropolis-Hastings (needs only relative probabilities); Gibbs sampling can converge faster but works only for specific models and is no longer used. Convergence: noisy, run-to-run-varying densities indicate too few iterations; several starting points should give the same marginals (necessary, not sufficient). If the chain cannot start (e.g. undated boundaries), give a likelihood to the boundary, e.g. `Boundary("End",U(AD(1000),AD(1400)))`, or split the model.

**Outputs.** Marginal posterior of each parameter (integrating out the others, by histogramming MCMC draws); ranges at 68% and 95% as HPD (the shortest interval containing that mass); interrogation without changing the model: `First`, `Last`, `Span`, `Order` (pairwise order matrix), `Interval`, `Difference`, `Correlation`, and `MCMC_Sample`.

> [!definition] Agreement index (Eqs. 33-39)
> Let $p_0(\mathbf t\mid\mathbf y)\propto p(\mathbf y\mid\mathbf t)$ be the posterior under the null prior and $p_1$ the posterior under the full model. Then $p_0(t_i\mid\mathbf y)=p(t_i\mid y_i)\propto p(y_i\mid t_i)$ while $p_1(t_i\mid\mathbf y)$ depends on all data. For each measurement
> $$F_i=\frac{\int p(y_i\mid t_i)\,p_1(t_i\mid\mathbf y)\,dt_i}{\int p(y_i\mid t_i)\,p(t_i\mid y_i)\,dt_i},\qquad A_i=100\,F_i,$$
> the ratio of mean likelihoods under the full and null models; reasonable minimum $A_i\approx60\%$ (about 1 in 20 may fall below). $F_i>1$ is allowed. Overall: $F_{\text{overall}}=\prod_iF_i$ (Eq. 36) ignores parameter correlation; the better $F_{\text{model}}=\dfrac{\int p(\mathbf y\mid\mathbf t)\,p_1(\mathbf t\mid\mathbf y)\,d\mathbf t}{\int p(\mathbf y\mid\mathbf t)\,p_0(\mathbf t\mid\mathbf y)\,d\mathbf t}$ (Eq. 37). Geometric-mean versions $A_{\text{overall}}=100F_{\text{overall}}^{1/n}$ and $A_{\text{model}}=100F_{\text{model}}^{1/n}$ (Eqs. 38-39); prefer $A_{\text{model}}$ (OxCal 4). These are not strict Bayes factors but are comparable across models.
^def-agreement-index

**Testing models (Fig. 8).** (1) *Simulate known truth*: simulate 14C dates (`R_Simulate`) for a scenario (e.g. ten events in a 100-year phase, $\pm25$ errors), run the analysis, and check that the output recovers the truth; if precision is too low, increase the number of dates; if accuracy is wrong, the model is wrong. (2) *Run with no data* (`Date` without likelihood) to see how "vague" the prior alone is; even a bare order constraint on ten events in 1000-1200 CE strongly shapes the intermediate dates.

**Measurement-model conflict.** Spot a bad date by little overlap between its likelihood and the marginal prior (residual material, contamination). Two remedies: *formal outlier analysis* (each date gets a prior outlier probability, typically 0.05, and a posterior outlier probability is returned; Christen 1994, 2003; Bronk Ramsey 2009 `Outlier`) which model-averages but complicates the model; or the agreement index, which leaves the model unchanged. Extreme outliers are caught by both; cut-offs are arbitrary. Model choice by Bayes factors (Nicholls and Jones 2001) is possible but not yet generalised.

**Other problems.** Any correlated mismatch between samples and calibration curve is hard to diagnose; conclusions rest on 14C assumptions, sample context and association.

## Examples

> [!example] Reading a poor agreement index
> (Hypothetical numbers.) A 10-date uniform phase gives $A_{\text{model}}=45\%$ and one date with $A_i=12\%$. Interpretation: that date is incompatible with the phase assumption and the other nine; either it is residual or intrusive (outlier model with prior 0.05 will down-weight it), or the single-phase assumption is wrong. Compare $A_{\text{model}}$ after removing the date or using two phases.
^ex-agreement

```python
import numpy as np
def agreement_i(lik_i, post_full, post_null):
    """lik_i: p(y_i|t) on a grid; post_*: marginal posteriors on the same grid (sum to 1)."""
    return 100.0 * (lik_i * post_full).sum() / (lik_i * post_null).sum()
```

## Connections
Compare with posterior-predictive and prior-predictive checks: [[Posterior Predictive Checking]], [[Prior Predictive Checking]]; simulated-truth recovery: [[Simulation-Based Calibration - Overview]]; MCMC theory: [[MCMC Basics]], [[Efficient MCMC]]; outlier mixtures: [[Monsters and Mixtures]].

## See Also
[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
