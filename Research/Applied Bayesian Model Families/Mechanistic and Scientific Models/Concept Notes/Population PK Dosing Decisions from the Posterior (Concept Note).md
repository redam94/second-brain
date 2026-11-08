---
title: "Population PK Dosing Decisions from the Posterior (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature: Gelman, Bois & Jiang 1996, JASA 91:1400-1412; Sheiner & Beal NONMEM tradition; Margossian et al. 2022 ingested separately)"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Margossian 2022 - Population Two-Compartment Model]]"
  - "[[Decision Analysis]]"
used_by:
  - "[[Margossian 2022 - Bayesian Pharmacometrics - Overview]]"
aliases:
  - probability of target attainment
  - Bayesian dose selection
  - population pharmacokinetics decision analysis
---

# Population PK Dosing Decisions from the Posterior (Concept Note)

> [!summary]
> Concept note, no raw source (Gelman, Bois & Jiang 1996 was not retrievable as an open copy). Once a population PK model is fit, a dosing rule is a decision problem: choose dose $D$ to maximise expected utility, or to maximise the **probability of target attainment** (PTA) that a patient's exposure lies in a therapeutic window, integrating over between-patient variability *and* posterior parameter uncertainty. This is the "dosing decisions" half of example E64.

## Overview

Two layers of uncertainty need separating: (i) **between-patient variability** (the population distribution $\vartheta_j\sim\text{logN}(\log\vartheta_{pop},\Omega)$) and (ii) **parameter uncertainty** about $\vartheta_{pop},\Omega,\sigma$ (the posterior). For a new patient the predictive for exposure marginalizes both. For a *known* patient with observed concentrations, the individual posterior $p(\vartheta_j\mid y_j,\text{population})$ supports individualized dosing (therapeutic drug monitoring).

## Main Content

> [!definition] Exposure target and PTA
> Let $E(D,\vartheta)$ be an exposure summary (e.g., average steady-state concentration $C_{ss,avg}=D/(\tau\,CL)$ for dose $D$ every $\tau$ hours; peak or trough concentration; AUC$=D/CL$ per dose). With window $[L,U]$,
> $$\text{PTA}(D)=\Pr\big(L\le E(D,\vartheta)\le U\big)=\iint\mathbb I\{L\le E(D,\vartheta)\le U\}\,p(\vartheta\mid\vartheta_{pop},\Omega)\,p(\vartheta_{pop},\Omega\mid y)\,d\vartheta\,d(\vartheta_{pop},\Omega).$$
^def-pta

> [!definition] Expected-utility dosing rule
> $$D^*=\arg\max_D\ \mathbb E\big[u(E(D,\vartheta))\big],$$
> with a utility penalising sub-therapeutic exposure (failure) and toxic exposure asymmetrically. Posterior draws give the Monte Carlo estimate by averaging $u$ over simulated patients. Changing the loss changes the optimal dose; report the PTA curve in addition to $D^*$.
^def-eu-dosing

**Algorithm (posterior simulation).** For each posterior draw $s$: draw a new patient's $\vartheta^{(s)}\sim\text{logN}(\log\vartheta_{pop}^{(s)},\Omega^{(s)})$, scale by body weight with the allometric rules, compute $E(D,\vartheta^{(s)})$ for each candidate $D$, evaluate $u$ or the window indicator. Average over $s$. In Stan this is a `generated quantities` block; in PyMC use `pm.sample_posterior_predictive` with a function of the posterior ([[Margossian 2022 - Population Two-Compartment Model]]).

**Weight-based dosing.** With allometric scaling $CL\propto w^{0.75}$, a fixed dose over-exposes light patients; per-kg dosing under-corrects because it scales as $w^1$ vs $w^{0.75}$. Compare PTA across weight strata to choose a rule.

**Pharmacodynamic link.** With PKPD (e.g. warfarin PK/PD in E64), the target is a response (e.g. INR in range, neutrophil nadir above a threshold) and requires the nonlinear ODE solves of [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]].

## Examples

**PTA for a q12h regimen (runs; verified).** Clearance $CL_i=10\,e^{0.3z_i}$ L/h, target $C_{ss,avg}\in[5,15]$ mg/L, $C_{ss,avg}=D/(12\,CL_i)$:
```python
import numpy as np
rng = np.random.default_rng(0); n = 20000; CL = 10.
CLi = CL*np.exp(0.3*rng.normal(size=n))
for D in (600, 900, 1200, 1800):
    css = D/12/CLi
    print(D, np.round([np.mean((css >= 5) & (css <= 15)), np.mean(css < 5), np.mean(css > 15)], 3))
# 600: [0.502 0.498 0.   ]   900: [0.902 0.087 0.011]   1200: [0.906 0.01 0.084]   1800: [0.498 0. 0.502]
```
**Interpretation.** PTA peaks at about 0.90 for 900-1200 mg q12h; 900 errs toward under-exposure (8.7% below, 1.1% above), 1200 toward over-exposure (1.0% below, 8.4% above). If toxicity is costlier than sub-therapeutic exposure, choose near 900; otherwise near 1200. The decision depends on utilities, not just the model. Adding posterior uncertainty about $CL_{pop}$ and $\omega$ widens the exposure distribution and lowers the maximum PTA.

## Relevance to marketing measurement

The same structure turns an MMM posterior into a budget decision: simulate outcomes for each candidate budget over posterior draws (and geo-level variability), score with a utility, and report the probability of hitting a target. See [[Decision Analysis]] and [[Using a Fitted Model for Decision Analysis - Classification Competition]].

## Connections

[[Hierarchical Models]], [[Posterior Predictive Checking]], [[Margossian 2022 - Posterior Predictive Checks and LOO]].

## See Also

[[Margossian 2022 - Compartment Models and Event Schedules]], [[Margossian 2022 - Bayesian Pharmacometrics - Overview]].
