---
title: "Margossian 2022 - Compartment Models and Event Schedules"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/definition
  - doc/paper
source: "[[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Sec. 2.1-2.2, pp. 4-7; Table 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
doc_type: paper
depends_on:
  - "[[Margossian 2022 - Bayesian Pharmacometrics - Overview]]"
used_by:
  - "[[Margossian 2022 - Stan Workflow and MCMC Diagnostics]]"
  - "[[Margossian 2022 - Population Two-Compartment Model]]"
aliases:
  - two-compartment PK model
  - clinical event schedule
  - NONMEM event conventions
---

# Margossian 2022 - Compartment Models and Event Schedules

> [!summary]
> A compartment model is a linear (or nonlinear) ODE for drug amounts moving between body compartments. The likelihood is: solve the ODE under the **event schedule** (doses and observation times), divide the central amount by volume to get concentration $\hat c$, and compare to data with a lognormal error. Priors are lognormal on positive rates and volumes, centred on earlier-study estimates.

## Overview

The running example is a simulated patient receiving 1200 mg boluses every 12 hours for 14 doses, with plasma samples at 0.083, 0.167, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6 and 8 h after the first, second and final dose, trough samples before each dose, and samples 12, 18 and 24 h after the last dose.

## Main Content

> [!definition] Two-compartment model with first-order absorption
> State $u(t)=(u_{\text{gut}},u_{\text{cent}},u_{\text{peri}})$ in mg. With $k_{10}=CL/V_{cent}$, $k_{12}=Q/V_{cent}$, $k_{21}=Q/V_{peri}$:
> $$
> \dot u_{\text{gut}}=-k_au_{\text{gut}},\quad \dot u_{\text{cent}}=k_au_{\text{gut}}-(k_{10}+k_{12})u_{\text{cent}}+k_{21}u_{\text{peri}},\quad \dot u_{\text{peri}}=k_{12}u_{\text{cent}}-k_{21}u_{\text{peri}}.
> $$
> Parameters: $k_a$ absorption rate constant (1/h); $CL$ elimination clearance from the central compartment (L/h); $Q$ intercompartmental clearance (L/h); $V_{cent},V_{peri}$ volumes (L). Predicted concentration $\hat c=u_{\text{cent}}/V_{cent}$. (The ODE right-hand side is read off the paper's own Stan function in Sec. 4.)
^def-two-compartment-model

> [!definition] Clinical event schedule (Table 1, NONMEM/NMTRAN convention)
> Each row is an event with: time; amount (dose); rate (infusion rate for infusions); `evid` (0 = measurement, 1 = dosing); `cmt` (compartment receiving the dose); `addl` (number of *additional* identical doses); `ii` (inter-dose interval for multiple dosing); `ss` (steady-state flag). Torsten follows these input names so a NONMEM data set maps onto Stan arrays.
^def-event-schedule

> [!definition] Likelihood and priors for the single patient
> $$
> y\mid\hat c,\sigma\sim\text{logNormal}(\log\hat c,\sigma),\qquad \theta=\{k_a,CL,Q,V_{cent},V_{peri},\sigma\}.
> $$
> Priors (from hypothetical earlier studies): $CL\sim\text{logN}(\log10,0.25)$, $Q\sim\text{logN}(\log15,0.5)$, $V_{cent}\sim\text{logN}(\log35,0.25)$, $V_{peri}\sim\text{logN}(\log105,0.5)$, $k_a\sim\text{logN}(\log2.5,1)$, $\sigma\sim\text{Half-Normal}(0,1)$. Principle: allocate mass to every plausible value and exclude absurd ones (a central volume of ten litres, not the size of the Sun).
^def-pk-likelihood-priors

Alternatives noted: proportional and additive error models are supported; the lognormal residual is a multiplicative-error choice. Torsten provides analytic solvers (`pmx_solve_onecpt`, `pmx_solve_twocpt`) because linear compartment models have closed-form solutions via the matrix exponential, so no numerical ODE solver is needed (contrast with the nonlinear PK/PD case in [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]]).

## Examples

**Closed form via matrix exponential (NumPy).** For a bolus into the gut at time $t_d$, $u(t)=e^{A(t-t_d)}\,(D,0,0)^\top$ with $A$ the linear system matrix; doses superpose. Using the prior-mean parameters ($CL=10,Q=15,V_c=35,V_p=105,k_a=2.5$) with 1200 mg at $t=0$ and $12$ h:
```python
import numpy as np
from scipy.linalg import expm
CL,Q,Vc,Vp,ka = 10.,15.,35.,105.,2.5
k10,k12,k21 = CL/Vc, Q/Vc, Q/Vp
A = np.array([[-ka,0,0],[ka,-(k10+k12),k21],[0,k12,-k21]])
def conc(t_grid, dose_times, dose=1200.):
    out=[]
    for t in t_grid:
        u = sum(expm(A*(t-td))@np.array([dose,0,0]) for td in dose_times if t>=td)
        out.append(u[1]/Vc if np.ndim(u) else 0.0)
    return np.array(out)
print(np.round(conc(np.array([0.5,1,2,4,8,12,12.5,13,24,36]),[0,12]),2))
# [19.9 19.9 12.39 5.25 2.92 2.33 22.17 22.11 3.6 1.96] mg/L (verified when writing)
```
The profile shows absorption peak near 0.5-1 h, biphasic decline (distribution then elimination), and accumulation at the second dose.

**PyMC sketch (untested).** Pass the closed-form concentration (via `pt.linalg.expm` or a `jax` function wrapped as an Op) into `pm.LogNormal("y", mu=pt.log(c_hat), sigma=sigma, observed=y)`; PyMC has no event-schedule helper, so implement the superposition with a loop or `scan` over rows with `evid==1`.

## Relevance to marketing measurement

Doses with `addl`/`ii` are recurring campaigns; compartments are stocks with decay (adstock is a one-compartment model with $k_{10}$ = decay rate); a two-compartment model gives a fast and a slow carry-over component. See [[Linear-Gaussian State-Space Models]] for the discrete-time analogue.

## Connections

[[Chen 2018 - Adjoint Sensitivity Method]], [[Likelihoods Built on Differential Equations (Concept Note)]], [[Prior Predictive Checking]].

## See Also

[[Margossian 2022 - Bayesian Pharmacometrics - Overview]].
