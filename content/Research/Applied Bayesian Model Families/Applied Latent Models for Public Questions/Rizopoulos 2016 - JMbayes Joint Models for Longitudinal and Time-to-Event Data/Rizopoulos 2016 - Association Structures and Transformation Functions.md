---
title: "Rizopoulos 2016 - Association Structures and Transformation Functions"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/definition
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Sec. 4.3-4.5, pp. 16-23; Eqs. 8-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on:
  - "[[Rizopoulos 2016 - Joint Model Specification and Posterior]]"
  - "[[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]]"
used_by:
  - "[[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]]"
  - "[[Rizopoulos 2016 - JMbayes Joint Models Overview]]"
aliases:
  - "joint model association structures"
  - "current value slope cumulative effect"
  - "shared random effects parameterization"
---

# Rizopoulos 2016 - Association Structures and Transformation Functions

> [!summary]
> The function $f[H_i(t),\mathbf b_i,\boldsymbol\alpha]$ decides which feature of the longitudinal profile drives risk: current value, slope, area under the curve, weighted history, or the random effects themselves. On PBC, current level and slope are both strongly associated with risk; the estimated weight function shows only the last 0.3 years matter; the shared-random-effects parametrisation dominates the model-averaging weights for Patient 2.

## Main Content

> [!definition] Association structures
> Written for the default `param`, with `extraForm` giving the fixed/random formulas and the index vectors `indFixed`, `indRandom` of the original mixed model used by the extra term.
> 1. **Current value** (`"td-value"`): $h_i(t)=h_0(t)\exp\{\gamma^\top w_i+\alpha\,\eta_i(t)\}$.
> 2. **Value + slope** (Eq. 8, `"td-both"`): $h_i(t)=h_0(t)\exp\{\gamma^\top w_i+\alpha_1\eta_i(t)+\alpha_2\eta_i'(t)\}$, $\eta_i'(t)=d\{\mathbf x_i^\top\boldsymbol\beta+\mathbf z_i^\top\mathbf b_i\}/dt$, computed with `dns()` (central difference of the natural spline).
> 3. **Cumulative effect** (`"td-extra"`): $h_i(t)=h_0(t)\exp\{\gamma^\top w_i+\alpha\int_0^t\eta_i(s)ds\}$ via `ins()` (Gauss-Kronrod integral of `ns()`).
> 4. **Weighted cumulative effect**: $h_i(t)=h_0(t)\exp\{\gamma^\top w_i+\alpha\int_0^t\varpi(t-s)\eta_i(s)ds\}$ with $\varpi$ a user density (normal, Student-$t$, logistic) with up to three shape parameters, normalised over $[0,t_{\max}]$ (`estimateWeightFun=TRUE`).
> 5. **Shared random effects** (Eq. 9, `"shared-RE"`): $h_i(t)=h_0(t)\exp(\gamma^\top w_i+\boldsymbol\alpha^\top\mathbf b_i)$; with random intercept and slope, $\alpha$ components say whether baseline level or trajectory steepness drives risk.
^def-assoc

> [!example] PBC estimates by association structure
> | Fit | Terms | Estimates (SD) | Time |
> |---|---|---|---|
> | pbc1 value | Assoct | 1.4099 (0.0935) | 3.8 min |
> | pbc12 value + slope | Assoct; AssoctE | 1.3530 (0.1010); 2.0905 (0.5425) | 4.4 min |
> | pbc13 cumulative | AssoctE | 0.2198 (0.0197) | 3.8 min |
> | pbc13w weighted | Assoct; shape (SD of normal weight) | 1.3734 (0.0998); 0.0898 (0.0371) | 59.3 min |
> | pbc14 shared RE | intercept; ns1; ns2 | 1.3655 (0.1512); 0.5381 (0.0629); 0.1545 (0.1010) | 5.5 min |
> | pbc15 transformed | Assoct; Assoct:$^2$; AssoctE; AssoctE:D-penicil | 0.8572 (0.3179); 0.1457 (0.0949); 2.4226 (0.7515); 0.1818 (0.9590) | 4.6 min |
>
> Readings: (i) hazard ratio for a 50% rise within a year at the same level $=\exp(0.4054\times2.0905)=2.33$ (95% CI 1.5-3.6). (ii) Cumulative term: unit increase of the area multiplies risk by 1.2 (CI 1.2-1.3). (iii) Weight-function SD of 0.09 means only measurements within about 0.3 years (3 SD) before $t$ matter, so the weighted model reproduces the current-value $\alpha$. (iv) No evidence of non-linearity in the current value or of treatment-specific slope effects.
^ex-assoc-table

> [!definition] Transformation functions (`transFun`, Sec. 4.4)
> A function (or list with components `value` and `extra`) applied to the current value or the extra term before it enters the linear predictor, vectorised in `x`, with access to `data`. Example: `tf1 <- function(x, data) cbind(x, "^2" = x*x)` and `tf2 <- function(x, data) cbind(x, "D-penicil" = x*(data$drug=="D-penicil"))` fit $\alpha_1\eta+\alpha_2\eta^2+\alpha_3\eta'+\alpha_4\eta'\times\text{drug}$.
^def-transfun

**Choosing a structure.** Hard in general: more than one can hold (not available together in JMbayes). For inference treat as model selection by DIC; for prediction use model averaging ([[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]]). **Supporting functions** (4.5): `coef`, `fixef`, `ranef`, `vcov`, `fitted`, `residuals` (martingale residuals for survival), `anova` (DIC, pD, LPML), `plot`, `predict`, `survfitJM`, `logLik` (with Laplace-approximate marginal likelihood), `xtable`.

## Connections
[[Model Comparison]] (DIC/LPML), [[Hierarchical Models]], [[Survival Analysis]].

## See Also
[[Rizopoulos 2016 - JMbayes Joint Models Overview]]
