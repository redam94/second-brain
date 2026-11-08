---
title: "Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 2.1-2.3, pp. 3-5, Eq. (1)-(5)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
used_by:
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
  - "[[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]"
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
  - "[[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]]"
aliases:
  - random-effects meta-analysis model
  - mixed-effects meta-regression model
  - fixed-effects versus random-effects inference
---

# Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models

> [!summary]
> Meta-analysis starts from $k$ independent effect estimates $y_i=\theta_i+e_i$ with known sampling variances $v_i$. The random-effects model adds $\theta_i=\mu+u_i$, $u_i\sim N(0,\tau^2)$; the mixed-effects model replaces $\mu$ with a linear predictor in study-level moderators. Crucially, a fixed-effects model does not assume homogeneity; it simply restricts inference to the $k$ studies at hand, whereas random/mixed models infer to a hypothetical population of studies.

## Overview

Section 2 of the paper states the models underlying the entire package. It is deliberately brief and points to Hedges and Olkin (1985), Berkey et al. (1995), van Houwelingen et al. (2002) and Raudenbush (2009).

## Main Content

### Sampling model

> [!definition] Observed effect model (Eq. 1)
> For $i=1,\dots,k$ independent studies,
> $$y_i=\theta_i+e_i,\qquad e_i\sim N(0,v_i),$$
> where $y_i$ is the observed effect, $\theta_i$ the unknown true effect of study $i$, $e_i$ the sampling error and $v_i$ the sampling variance, **assumed known**. The $y_i$ are assumed unbiased, normally distributed estimates of $\theta_i$. A bias-correcting, normalizing or variance-stabilising transformation may be needed (log for odds ratios, Fisher's $r$-to-$z$ for correlations; see [[Viechtbauer 2010 - Effect Size Measures and escalc]]).
^def-sampling-model

### Random-effects model

> [!definition] Random-effects model (Eq. 2)
> $$\theta_i=\mu+u_i,\qquad u_i\sim N(0,\tau^2),$$
> so marginally $y_i\sim N(\mu,\,v_i+\tau^2)$. $\mu$ is the average true effect and $\tau^2$ the total amount of heterogeneity among true effects. If $\tau^2=0$ then $\theta_1=\dots=\theta_k\equiv\theta$ and $\mu=\theta$.
^def-random-effects-model

### Mixed-effects model

> [!definition] Mixed-effects model / meta-regression (Eq. 3)
> $$\theta_i=\beta_0+\beta_1x_{i1}+\dots+\beta_{p'}x_{ip'}+u_i,\qquad u_i\sim N(0,\tau^2),$$
> with $x_{ij}$ the value of moderator $j$ for study $i$ ($p'$ moderators, $p=p'+1$ coefficients with intercept). Now $\tau^2$ is the **residual** heterogeneity, the variability of true effects not accounted for by the moderators. Categorical moderators enter by dummy coding.
^def-mixed-effects-model

### What the fixed-effects model estimates

> [!definition] Fixed-effects targets (Eq. 4-5)
> With weighted least squares and typical weights $w_i=1/v_i$, the fixed-effects model estimates the weighted average of the true effects,
> $$\bar\theta_w=\frac{\sum_i w_i\theta_i}{\sum_i w_i}.$$
> With unweighted least squares it estimates the simple average $\bar\theta_u=\sum_i\theta_i/k$ (Laird and Mosteller 1990).
^def-fixed-effects-targets

> [!theorem] Fixed versus random inference (Sec. 2.3)
> 1. A fixed-effects model gives a **conditional** inference about the $k$ included studies (more precisely, about sets of $k$ studies whose true effects equal those of the included studies), answering "How large is the average true effect in this set of $k$ studies?" (Hedges and Vevea 1998).
> 2. Random/mixed-effects models give an **unconditional** inference about a larger population of studies (conducted, conductable or future) of which the $k$ are a random sample, answering "How large is $\mu$ in that population?"
> 3. Contrary to common statements, the fixed-effects model does **not** assume homogeneous true effects. It gives valid inference under heterogeneity provided conclusions are restricted to the included studies.
> 4. If the true effects are homogeneous, $\mu=\bar\theta_w=\bar\theta_u=\theta$ and the distinction disappears.
> 5. Because there is no infallible homogeneity test, the type of inference should be chosen **before** examining the data.
^thm-fixed-vs-random-inference

Footnote 2 of the paper adds that weighted versus unweighted least squares is also a choice for random/mixed models but, since the parameters are the same either way, weighted estimation is preferred for efficiency.

## Examples

**Interpreting the two on the BCG data** (values from [[Viechtbauer 2010 - BCG Vaccine Worked Example]]). The fixed-effects pooled log RR is $-0.4303$ (RR 0.65), dominated by the huge TPT Madras and Comstock 1974 trials, and answers "what is the precision-weighted average among these 13 trials?" The random-effects $\hat\mu=-0.7145$ (RR 0.49) answers "what is the average true effect across a population of BCG trials?", with $\hat\tau=0.56$ describing spread across trials. The two differ because trials are heterogeneous ($I^2=92\%$) and the large trials sit near zero effect.

## Connections

- Marketing measurement: a brand running geo tests in many markets and quarters must decide the estimand. A fixed-effect view reports the average lift of tests run; a random-effects view reports expected lift for the next market, which is what budget planning needs, and $\tau$ gives the prediction-interval width.
- Bayesian view: [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]] writes the same model as a hierarchical normal-normal model; see [[Hierarchical Models]] and [[Hierarchical Linear Models]].
- [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]] shows how each model is requested in code.

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]
