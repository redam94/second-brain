---
title: "Surplus-Production State-Space Models for Fisheries (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/fisheries
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature: Schaefer 1954; Pella & Tomlinson 1969; Meyer & Millar 1999, Can. J. Fish. Aquat. Sci. 56:1078-1086 and Millar & Meyer 2000, J. R. Stat. Soc. C 49:327-342 on Bayesian state-space surplus production; Ricard et al. 2012 for the RAM Legacy database)"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
  - "[[State-Space Models and the Kalman Filter - Overview]]"
used_by:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
aliases:
  - Schaefer model
  - Pella-Tomlinson
  - biomass dynamics model
  - fisheries stock assessment state-space
---

# Surplus-Production State-Space Models for Fisheries (Concept Note)

> [!summary]
> Concept note, no raw source; citations from memory and should be verified before formal use. A surplus-production model treats a fish stock like a savings account: next year's biomass equals this year's, plus **surplus production** $g(B_t)$ (growth/recruitment net of natural mortality), minus catch $C_t$. In its state-space form the biomass is a latent process observed through an abundance index $I_t=qB_t\epsilon_t$. The data (catches and an index) weakly identify $r$, $K$, $q$ jointly, so *informative priors from biology* (resilience, life history) do real work; this is the point of example E114.

## Overview

The deterministic skeleton is the logistic (Schaefer) model. Fitting only to the trajectory ("observation-error" fit) ignores that real stocks fluctuate; putting process noise on biomass gives the state-space model. Catch is treated as known.

## Main Content

> [!definition] Schaefer state-space surplus-production model
> $$
> B_{t+1}=\Big[B_t+rB_t\Big(1-\tfrac{B_t}{K}\Big)-C_t\Big]e^{\eta_t},\quad\eta_t\sim N(0,\sigma_p^2),\qquad I_t=qB_te^{\varepsilon_t},\quad\varepsilon_t\sim N(0,\sigma_o^2).
> $$
> $r$ intrinsic growth rate; $K$ carrying capacity; $C_t$ catch; $q$ catchability; $\sigma_p,\sigma_o$ process and observation sd. Reference points: $\text{MSY}=rK/4$ at $B_{MSY}=K/2$ and $F_{MSY}=r/2$. Pella-Tomlinson generalises the surplus function with a shape parameter $m$ ($B_{MSY}/K$ becomes $m^{-1/(m-1)}$).
^def-schaefer-ssm

### Identifiability and the role of priors

| Issue | Mechanism | Remedy |
|---|---|---|
| $r$-$K$ ridge | Many $(r,K)$ combinations produce similar biomass trajectories when the series lacks contrast ("one-way trip": steady decline) | Informative prior on $r$ (e.g., from FishBase resilience classes) and/or on depletion |
| $q$ and $K$ scale confounding | Index is relative; $qK$ is identified, $q$ and $K$ separately are not | Prior on $q$ or on initial depletion $B_1/K$; absolute abundance survey |
| Process vs observation noise | Only the ratio $\sigma_p^2/\sigma_o^2$ is weakly identified | Fix the ratio or put a prior on the variance ratio |
| Collapse invisible to catches alone | Catch can be flat or falling while biomass crashes; the index reveals the decline | Always model the index; plot catch/biomass ratio $C_t/B_t$ (harvest rate) |

**Hierarchical extension.** Fit many stocks jointly with log $r_s\sim N(\mu_r(\text{resilience}_s),\tau^2)$ and shared structure: partial pooling shrinks poorly informed stocks toward group behaviour, the same logic as [[Hierarchical Models]]; this is how 18-22 stocks in the RAM Legacy database are treated in E114.

**Decision output.** Posterior of $B_T/B_{MSY}$ and $F_T/F_{MSY}$, probability the stock is overfished ($B/B_{MSY}<1$), and catch advice as a function of risk tolerance ([[Decision Analysis]]).

## Examples

**Simulate a collapse and watch the index (runs; verified).**
```python
import numpy as np
rng = np.random.default_rng(1)
r, K, q, sp, so = 0.4, 1000., 0.001, 0.05, 0.1
T = 40; B = np.zeros(T); B[0] = 0.8*K
C = np.concatenate([np.full(15, 40.), np.full(25, 160.)])     # catch quadruples after year 15
for t in range(T-1):
    B[t+1] = max((B[t] + r*B[t]*(1 - B[t]/K) - C[t])*np.exp(sp*rng.normal()), 1e-3)
I = q*B*np.exp(so*rng.normal(size=T))
print(np.round(B[::8]), np.round(I[::8], 3))      # biomass 800, 908, 770, 190, ~0 ; index follows
print("MSY", r*K/4, "B_MSY", K/2)                 # MSY = 100: catch of 160 exceeds MSY and the stock collapses
```
**Interpretation.** A constant catch above MSY (160 vs 100) is unsustainable: biomass falls from about 770 to about 190 and then to zero within 16 years, yet the catch series itself looks flat. Only the index (or a model linking catch to biomass) shows it.

**PyMC sketch (untested).**
```python
with pm.Model() as spm:
    r = pm.LogNormal("r", np.log(0.4), 0.3)           # biology-informed prior
    K = pm.LogNormal("K", np.log(1000), 1.0)
    q = pm.LogNormal("q", np.log(1e-3), 1.0)
    # latent biomass via pm.Scan or a non-centered log-random-walk with recursion; observation via index
```

## Relevance to marketing measurement

Latent stock with replenishment and depletion, observed through a noisy relative index with an unknown scaling constant ($q$), is formally the same as brand equity/awareness observed through surveys. The identifiability lessons (scale confounding, need for informative priors on one component) carry over; see [[Linear-Gaussian State-Space Models]].

## Connections

[[Hierarchical Models]], [[Prior Predictive Checking]], [[Marginal Likelihood via the Kalman Filter]] (exact for the linearised case), [[Chen 2018 - Latent ODE Time-Series Model]].

## See Also

[[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]], [[Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)]].
