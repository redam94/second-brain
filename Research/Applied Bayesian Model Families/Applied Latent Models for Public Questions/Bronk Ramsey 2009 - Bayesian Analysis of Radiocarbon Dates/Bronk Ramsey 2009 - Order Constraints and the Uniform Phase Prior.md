---
title: "Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]"
source_location: "pp. 338-339, 342-345: Eqs. 2, 12-16, Figs. 2-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
doc_type: paper
depends_on:
  - "[[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]]"
used_by:
  - "[[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]]"
  - "[[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]]"
  - "[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]"
aliases:
  - "uniform phase model"
  - "span prior problem"
  - "radiocarbon order constraints"
---

# Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior

> [!summary]
> Stratigraphic order enters as a Heaviside-type prior $p_H=1$ if the dates are ordered and 0 otherwise. But a flat prior on $n$ events gives the span $s=\max-\min$ a density $\propto s^{n-2}$, heavily favouring long spans. The **uniform phase** model fixes this by giving a start and end boundary uniform priors and the $n$ events a uniform prior between them: $p(\mathbf t)\propto p_H/(t_b-t_a)^n$, which makes the implied span prior constant.

## Overview

A chronological model needs priors for sets of events. The paper builds these in two layers: relative constraints (order) and groupings (phases). Constraints "should only ever be used in conjunction with some kind of a grouping model".

## Main Content

> [!definition] Order constraint (Eqs. 12-13)
> For $t_a<t_b$: $p_H(t_a,t_b)=1$ if $t_a<t_b$, else $0$ (equal to the Heaviside $H(t_b-t_a)$ except at $t_a=t_b$). For a sequence: $p_H(t_a,t_b,t_c,\dots)=1$ if $t_a<t_b<t_c<\dots$, else $0$. Each constraint is one more factor in the prior.
^def-order-constraint

> [!theorem] The span problem for a flat prior
> Under $p_0(\mathbf t)\propto\text{const}$ with $n$ events, the effective prior of the span $s=\max_i t_i-\min_i t_i$ is $\propto s^{\,n-2}$. For $n=2$ it is uniform, but for large $n$ it is "very highly weighted to higher values" (Steier and Rom 2000; Bronk Ramsey 2000). This is why people looking at calibrated dates from one phase "instinctively overestimate their spread".
>
> *Proof sketch.* The density of the range of $n$ iid uniforms on an interval of length $L$ is $n(n-1)s^{n-2}(L-s)/L^n$, proportional to $s^{n-2}$ for $s\ll L$.
^thm-span-problem

> [!definition] Uniform phase model (Eqs. 14-16)
> Let $t_a$ (start) and $t_b$ (end) be boundary events with $p(t_a,t_b)\propto p_H(t_a,t_b)$; the span $t_b-t_a$ then has a uniform prior on $(0,\infty)$. Each of the $n$ events lies uniformly between them: $p(t_i\mid t_a,t_b)=p_H(t_a,t_i,t_b)/(t_b-t_a)$ (Eq. 15). The joint prior is
> $$p(\mathbf t)\propto\prod_i\frac{p_H(t_a,t_i,t_b)}{(t_b-t_a)}=\frac{\prod_i p_H(t_a,t_i,t_b)}{(t_b-t_a)^n}\quad\text{(Eq. 16)}.$$
> The *effective prior for the span of all the events is constant*: the model does not favour short or long phases. The assumption is that events are equally likely anywhere between start and end.
^def-uniform-phase

This is the model used in OxCal (Bronk Ramsey 1995), BCal (Buck et al. 1999) and DateLab (Jones and Nicholls 2002); the original derivations are by Buck et al. (1991, 1992) and Zeidler et al. (1998). It also forms "the basis for most of the more complex models".

## Examples

> [!example] How badly a flat prior biases the span
> Setup: $n$ events iid $U(0,1)$ (the flat-prior picture). Solution: $\mathbb E[s]=(n-1)/(n+1)$. Simulation of $2\times10^5$ draws gives mean span $0.333$ ($n=2$), $0.667$ ($n=5$) and $0.818$ ($n=10$). Interpretation: with ten dates the prior alone says "this phase spans over 80% of the window"; the uniform phase prior instead leaves the span flat, so the data decide.
^ex-span-bias

```python
import numpy as np
rng = np.random.default_rng(0)
for n in (2, 5, 10):
    t = rng.uniform(0, 1, (200_000, n)); print(n, round((t.max(1) - t.min(1)).mean(), 3))
# 2 0.333 / 5 0.667 / 10 0.818
```

**PyMC-style sketch (untested).** Use two boundary variables with an ordering transform and a `Potential` for $-n\log(t_b-t_a)$:
```python
with pm.Model():
    ta = pm.Flat("ta"); span = pm.HalfFlat("span"); tb = pm.Deterministic("tb", ta + span)
    t = pm.Uniform("t", lower=ta, upper=tb, shape=n)
    # Uniform already supplies the 1/(tb-ta)^n factor of Eq. 16
```

## Connections
- Other group shapes and multiple phases: [[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]].
- Calibration likelihood: [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]].
- Prior implications of exchangeable structure: [[Hierarchical Models]]; check implied priors with [[Prior Predictive Checking]].

## See Also
[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
