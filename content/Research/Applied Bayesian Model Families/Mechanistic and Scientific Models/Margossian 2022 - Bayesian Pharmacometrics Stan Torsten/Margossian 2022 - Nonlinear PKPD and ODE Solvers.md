---
title: "Margossian 2022 - Nonlinear PKPD and ODE Solvers"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/example
  - doc/paper
source: "[[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Sec. 4-5, pp. 22-29; Figs. 7-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
doc_type: paper
depends_on:
  - "[[Margossian 2022 - Population Two-Compartment Model]]"
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
used_by:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
aliases:
  - Friberg-Karlsson model
  - semi-mechanistic myelosuppression model
  - Torsten coupled ODE solver
---

# Margossian 2022 - Nonlinear PKPD and ODE Solvers

> [!summary]
> The Friberg-Karlsson semi-mechanistic model couples a PK model to a five-state nonlinear ODE (proliferating cells, three transit compartments, circulating neutrophils) with a feedback term $(\text{Circ}_0/y_{circ})^\gamma$ and a drug effect $E_{drug}=\min(\alpha\hat c,1)$. It needs a numerical ODE solver. Because PK feeds PD one way, Torsten solves PK analytically and only the PD part numerically, which is faster.

## Overview

This is the 'nonlinear ODE inside the likelihood' case: the posterior is explored by HMC, which needs gradients of the ODE solution with respect to parameters (obtained in Stan by forward sensitivity analysis, per [[Chen 2018 - Scope, Limitations and Statistical Use]]).

## Main Content

> [!definition] Friberg-Karlsson PK/PD model (eq. 4)
> $\text{MTT}=(3+1)/k_{tr}$ is the mean transit time through three transit compartments. With $\hat c=y_{cent}/V_{cent}$ from the PK model,
> $$
> \begin{aligned}\dot y_{prol}&=k_{prol}\,y_{prol}\,(1-E_{drug})\Big(\tfrac{\text{Circ}_0}{y_{circ}}\Big)^{\gamma}-k_{tr}y_{prol},\\ \dot y_{trans1}&=k_{tr}y_{prol}-k_{tr}y_{trans1},\quad \dot y_{trans2}=k_{tr}y_{trans1}-k_{tr}y_{trans2},\\ \dot y_{trans3}&=k_{tr}y_{trans2}-k_{tr}y_{trans3},\quad \dot y_{circ}=k_{tr}y_{trans3}-k_{tr}y_{circ},\end{aligned}
> $$
> $E_{drug}=\min(\alpha\hat c,1)$, and the absolute neutrophil count likelihood is $\text{ANC}\sim\text{logNormal}(\log y_{circ},\sigma_{ANC})$. The delayed negative feedback holds ANC at baseline $\text{Circ}_0$; the drug reduces proliferation. The cap at 1 prevents the feedback loop from flipping sign if $\hat c$ is huge during warmup, improving numerical stability. (In the Stan code the states are stored as differences from $\text{Circ}_0$ and $y_{circ}$ is bounded below by machine precision.)
^def-friberg-karlsson

**Parameters.** PK: $CL,Q,V_1,V_2,k_a$; PD: MTT, $\text{Circ}_0$, $\gamma$ (feedback strength), $\alpha$ (linear drug effect); lognormal priors on all; measurement errors $\sigma$ (PK) and $\sigma_{Neut}$ (PD). The complete system couples eq. (1) (PK) with eq. (4).

### Numerical solving in Stan

Define the right-hand side in the `functions` block; call an ODE solver (RK45 etc.) in `transformed parameters`, passing parameters and the event times; solve both PK and PD states as one system (8 states: 3 PK + 5 PD). This approach applies to *any* ODE model.

### Coupled solver (Torsten)

> [!definition] One-way coupling exploited by Torsten
> The PK (eq. 1) and PD (eq. 4) are coupled through $y_{prol}$ and $E_{drug}$ in only one direction, so PK can be solved independently. Torsten's `pmx_solve_twocpt_rk45` solves the linear PK analytically and passes the PK solution to the PD ODE, which is solved numerically. The numerical ODE then has lower dimension, so the coupled strategy is "in general more efficient". Only two code changes are needed: the ODE function now returns only PD states, and the solver call changes.
^def-coupled-solver

**Checks.** PPCs must be done for both outputs (PK concentration and neutrophil counts) (Fig. 8); `generated quantities` can be run on a fitted model without refitting (`mod$generate_quantities(fit)`).

### Section 5: role of Stan/Torsten

Strengths: random effects other than normal, priors beyond those in standard pharmacometric tools, multiple submodels with different random-effect structures. Costs: HMC can be computationally intensive for hierarchical ODE models; Stan's optimization and variational engines can be slow and error-prone for large population models. Alternatives: PyMC3, TensorFlow Probability, Turing offer similar modelling capability. Part II topics: within-chain parallelism and group solvers, divergent transitions, fake-data simulation and prior predictive checks, solver choice, accuracy control and stability.

## Examples

**Simulating the neutrophil nadir (SciPy; parameter values illustrative, not the paper's).**
```python
import numpy as np
from scipy.integrate import solve_ivp
circ0, mtt, gamma, alpha = 5.0, 125., 0.17, 0.1      # illustrative, units 1e9/L and hours
ktr = 4/mtt; kprol = ktr
def rhs(t, y, conc):
    prol, t1, t2, t3, circ = y
    edrug = min(alpha*conc(t), 1.0)
    circ = max(circ, 1e-12)
    return [kprol*prol*(1-edrug)*(circ0/circ)**gamma - ktr*prol,
            ktr*(prol-t1), ktr*(t1-t2), ktr*(t2-t3), ktr*(t3-circ)]
conc = lambda t: 5.0*np.exp(-0.2*(t % 336)) if t < 336 else 0.0   # crude PK drive, one cycle
sol = solve_ivp(rhs, [0, 1000], [circ0]*5, args=(conc,), max_step=2.0)
print(round(sol.y[4].min(), 2), round(sol.y[4][-1], 2))   # 4.69 4.99: nadir below baseline 5.0, then recovery (verified)
```
Illustrative code for understanding the structure; not from the paper.

## Relevance to marketing measurement

A delayed negative-feedback mechanism with transit-compartment lags is the pharmacological analogue of distributed-lag adstock with a saturating effect (the cap on $E_{drug}$ mirrors bounded response). The generalization lesson: encode bounds so that sampler excursions do not break the model.

## Connections

[[Likelihoods Built on Differential Equations (Concept Note)]], [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]], [[ODE Filters and Smoothers]], [[Challenge of Multimodality - Differential Equation for Planetary Motion]].

## See Also

[[Margossian 2022 - Bayesian Pharmacometrics - Overview]], [[Chen 2018 - Neural ODEs - Overview]].
