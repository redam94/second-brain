---
title: "Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/Molina Marhuenda 2015 - sae An R Package for Small Area Estimation.pdf]]"
source_location: "Concept note, no raw source (extends Sec. FH model, pp. 83-86)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Molina Marhuenda 2015 - sae Small Area Estimation"
doc_type: paper
depends_on:
  - "[[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]]"
aliases:
  - "Bayesian Fay-Herriot"
  - "surprise map"
  - "generalised variance function"
---

# Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)

> [!summary]
> Concept note, no raw source: it extends the frequentist FH model of Molina & Marhuenda (2015) to the full-Bayes version used in the PyMC example E112 (county child poverty), adding uncertainty in $A$, a logit link, estimated variances, and "surprise" maps. Literature: Fay & Herriot (1979, JASA); Rao & Molina (2015, *Small Area Estimation*, 2nd ed.); Gelman et al. (BDA3, eight-schools); Wolter and Fay-Herriot on generalised variance functions.

## Overview
EBLUP plugs in $\hat A$ and ignores its uncertainty (hence MSE corrections). A hierarchical Bayes (HB) FH puts priors on $\beta$ and $A$ and returns full posteriors of $\delta_d$ for any area-level question.

## Main Content

> [!definition] Hierarchical Bayes FH
> $y_d\mid\delta_d\sim N(\delta_d,\psi_d)$; $\delta_d\mid\beta,A\sim N(x_d^\top\beta,A)$; $\beta\sim N(0,\ \text{weak})$, $\sqrt A\sim\text{Half-Normal}$ (or half-Cauchy). Posterior of $\delta_d$ given $A$ is $N(\gamma_dy_d+(1-\gamma_d)x_d^\top\beta,\ \gamma_d\psi_d)$, so the EBLUP is its mean. ^def-hbfh

**Logit variant (proportions).** For a rate $p_d$ with direct estimate $\hat p_d$ and margin of error, model $\hat p_d\sim N(p_d,\psi_d)$ with $\text{logit}(p_d)=x_d^\top\beta+u_d$ so shrinkage respects $[0,1]$. Counties with zero direct poverty and zero variance are left-censored data: use a split likelihood (censored term for zeros, Normal for positive) rather than discarding them (E112's "censored zeros").

**Variances are estimates.** FH assumes $\psi_d$ known. ACS margins of error are themselves noisy; a generalised variance function (GVF) smooths them: $\log\hat\psi_d=a+b\log\{\hat p_d(1-\hat p_d)/n_d\}+\epsilon_d$, or treat published variances as Gamma data with a model for the mean (E112 does the latter). Two independent surveys of the same year (ACS 2014-18 vs 2019-23) test whether stated margins of error are calibrated: standardised differences should be $N(0,1)$.

> [!definition] Surprise map
> Map the standardised departure of a posterior from its prior-model expectation, e.g. $z_d=(\hat p_d^{\text{direct}}-E[p_d\mid x])/\sqrt{\text{Var}}$ or $\Pr(p_d>\text{national rate}\mid \text{data})$. It highlights areas that are unusual *given* their covariates and sampling noise, rather than areas that merely have noisy estimates. Posterior-predictive checks (mixed predictive checks that resample the area effect) calibrate it. ^def-surprise

## Examples

> [!example] PyMC sketch (untested)
> ```python
> import pymc as pm
> with pm.Model():
>     beta = pm.Normal("beta", 0, 2, shape=X.shape[1])
>     A = pm.HalfNormal("A", 1.0)
>     u = pm.Normal("u", 0, 1, shape=D)
>     logit_p = X @ beta + A * u              # non-centred
>     p = pm.Deterministic("p", pm.math.sigmoid(logit_p))
>     pos = y > 0
>     pm.Normal("y_pos", p[pos], sigma=se[pos], observed=y[pos])
>     # zeros: left-censored at 0 (illustrative)
    pm.Potential("y_zero", pm.logcdf(pm.Normal.dist(p[~pos], se[~pos]), 0.0).sum())
> ```
> Quantities: shrinkage $\gamma_d=A^2/(A^2+\psi_d)$ on the link scale; surprise = posterior probability that $p_d$ exceeds a threshold. ^ex-pymc-fh

## Connections
Marketing: geo-level lift with unequal standard errors is the same model with $\psi_d$ the geo SE. See [[Hierarchical Models]]; poststratified small-area estimates in [[Poststratification]]; shrinkage vs multiple comparisons in [[Partial Pooling as Multiple Comparisons Correction]].

## See Also
[[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]
