---
title: "Margossian 2022 - Population Two-Compartment Model"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/definition
  - doc/paper
source: "[[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Sec. 3, pp. 16-22; Figs. 5-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
doc_type: paper
depends_on:
  - "[[Margossian 2022 - Compartment Models and Event Schedules]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Population PK Dosing Decisions from the Posterior (Concept Note)]]"
aliases:
  - population PK model
  - nonlinear mixed-effects model Bayesian
  - allometric scaling
  - flip-flop kinetics
---

# Margossian 2022 - Population Two-Compartment Model

> [!summary]
> Patient-level PK parameters $\vartheta_j$ are drawn from a lognormal population distribution $\text{logN}(\log\vartheta_{pop},\Omega)$, with clearances and volumes scaled allometrically by body weight. A constraint $k_{a,pop}>\lambda_1$ removes the 'flip-flop' non-identifiability. Posterior predictive checks are done for the observed patients and for hypothetical new patients drawn from the population distribution.

## Overview

A population (nonlinear mixed-effects, NLME) model captures between-patient heterogeneity while pooling information: what is learned about one patient says something, but not everything, about others. The Bayesian reading: $\vartheta_j\mid\vartheta_{pop},\Omega$ is a *prior* for the individual parameters, with hyperparameters estimated. The authors warn such models can frustrate samplers (Part II examines a harder case).

## Main Content

> [!definition] Population model (Sec. 3.1)
> For patient $j$ with weight-normalized parameters $\vartheta_j=(CL_{norm,j},Q_{norm,j},V_{cent,norm,j},V_{peri,norm,j},k_{a,j})$:
> $$
> \vartheta_{pop}\sim p(\vartheta_{pop}),\quad\Omega\sim p(\Omega),\quad\sigma\sim p(\sigma),
> $$
> $$
> \vartheta_j\mid\vartheta_{pop},\Omega\sim\text{logNormal}(\log\vartheta_{pop},\Omega),\qquad y_{ji}\mid c_{ji},\sigma\sim\text{logNormal}(\log c_{ji},\sigma),
> $$
> with $\Omega$ initially diagonal. Individual parameters after **allometric scaling** (reference weight 70 kg): $CL_j=CL_{norm,j}(w_j/70)^{0.75}$, $Q_j=Q_{norm,j}(w_j/70)^{0.75}$, $V_{cent,j}=V_{cent,norm,j}\,w_j/70$, $V_{peri,j}=V_{peri,norm,j}\,w_j/70$; $k_{a,j}$ is not scaled. Likelihood as before, computed per patient.
^def-population-pk

> [!definition] Flip-flop constraint
> In a model with first-order absorption, $k_a$ and the dominant elimination rate are exchangeable in the concentration curve ('flip-flop'), causing a bimodal, non-identified posterior. The Stan code constrains the population absorption rate to be above the larger eigenvalue of the disposition system,
> $$
> k_{a,pop}>\lambda_1=\tfrac12\Big[(k_{10}+k_{12}+k_{21})+\sqrt{(k_{10}+k_{12}+k_{21})^2-4k_{10}k_{21}}\Big],
> $$
> computed from the population values; the declaration illustrates that bounds may be expressions of other parameters.
^def-flip-flop-constraint

**Priors used.** $CL_{pop}\sim\text{logN}(\log10,0.25)$, $Q_{pop}\sim\text{logN}(\log15,0.5)$, $V_{C,pop}\sim\text{logN}(\log35,0.25)$, $V_{P,pop}\sim\text{logN}(\log105,0.5)$, $k_{a,pop}\sim\text{logN}(\log2.5,1)$; independent lognormal priors on each element of $\omega$ (the code uses lognormal(0.25, 0.1)); $\sigma$ half-normal. Torsten's `pmx_solve_twocpt` is called inside a loop over subjects.

**Predictive checks (Figs. 5-6).** (i) Same code as in the single-patient case to simulate new observations for the *same* patients; (ii) for *hypothetical new patients*: draw PK parameters from the population distribution, solve the ODEs, and apply the measurement model. A composite PPC across all individuals is also shown. Generated-quantities cost is small relative to sampling.

## Examples

**Why partial pooling here.** With few samples per patient, individual CL is noisy; the population distribution shrinks it toward $CL_{pop}$ by an amount that depends on $\omega_{CL}$ vs the individual's information, exactly the normal-normal shrinkage in [[Hierarchical Linear Models]] on the log scale.

**PyMC sketch (untested), noncentered.**
```python
with pm.Model() as pop:
    mu = pm.Normal("log_theta_pop", pt.log(theta_prior), 0.5, shape=5)
    omega = pm.LogNormal("omega", 0.25, 0.1, shape=5)
    z = pm.Normal("z", 0, 1, shape=(J, 5))                    # noncentered individual effects
    theta = pm.Deterministic("theta", pt.exp(mu + omega*z))    # (J, 5)
    scale = weight/70
    CL = theta[:,0]*scale**0.75; Q = theta[:,1]*scale**0.75
    Vc = theta[:,2]*scale;      Vp = theta[:,3]*scale;  ka = theta[:,4]
    # ... per-subject closed-form concentration -> pm.LogNormal("y", log(c), sigma, observed=y)
```
The noncentered form (not shown in the paper's Part I; mentioned as important in Part II topics) is the standard guard against funnel geometry; see [[Hierarchical Models]] and [[HMC and Stan in Practice]].

## Relevance to marketing measurement

A geo-level MMM with partially pooled carry-over and saturation parameters on the log scale is the same structure ($\text{logN}(\log\vartheta_{pop},\Omega)$ across geos). Allometric scaling corresponds to normalizing geo effects by market size. See [[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]].

## Connections

[[Meager 2019 - Hierarchical Model Specifications]] (hierarchical Bayesian across sites), [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]].

## See Also

[[Margossian 2022 - Bayesian Pharmacometrics - Overview]], [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]].
