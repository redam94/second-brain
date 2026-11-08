---
title: "Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Sec. 2.1-2.4, pp. 2-8; Eqs. 1-2; Example 1; Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]]"
used_by:
  - "[[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]]"
  - "[[Unidentified Parameters - Partial Identification and Bayesian Updating]]"
aliases:
  - identified sensitivity parameters
  - separating model checking from sensitivity analysis
  - latent confounder model pathologies
---

# Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls

> [!summary]
> In a latent-confounder sensitivity model the observed-data distribution depends on the sensitivity parameters, so the data partly *identify* them (Example 1: a binary latent class produces a two-component normal mixture). Most settings then misfit the data and a competent analyst would reject them, so the "sensitivity analysis" is really model checking; it also needs a refit per setting and invites data snooping. The paper's remedy is a factorization in which the observed-data model is free of the sensitivity parameters.

## Overview

**Setup (Sec. 2.1).** Binary treatment $T_i$, potential outcomes $Y_i(0),Y_i(1)$, covariates $X_i$, SUTVA, observed $Y^{obs}_i=T_iY_i(1)+(1-T_i)Y_i(0)$, propensity $e(x)=P(T_i=1|X_i=x)$; iid draws from an infinite population.

> [!definition] Estimands
> $\tau^{ATE}=E[Y(1)-Y(0)]$, $\tau^{ATT}=E[Y(1)-Y(0)|T=1]$, $\tau^{ATC}=E[Y(1)-Y(0)|T=0]$, and quantile effects $\tau_q=Q_q(Y(1))-Q_q(Y(0))$. Each is a contrast between the marginal complete-data distributions $f(Y(1)),f(Y(0))$.
^def-estimands

For each $t$ the complete-data distribution mixes observed and missing parts:
$$
f(Y(t)|X)=f(T=t|X)f^{obs}_t(Y(t)|T=t,X)+f(T=1{-}t|X)f^{mis}_t(Y(t)|T=1{-}t,X).
$$
All factors are identified except $f^{mis}_t$, "completely uninformed by the data".

> [!definition] Assumption 1 (unconfoundedness)
> $[Y(0),Y(1)]\perp\!\!\!\perp T\mid X$. It implies $f^{obs}_t=f^{mis}_t$.
^asm-unconfoundedness

A sensitivity analysis parameterises the conditional dependence between $T$ and $[Y(0),Y(1)]$ given $X$ by **sensitivity parameters** and reports how estimates change over a plausible range chosen from outside the data.

## Main Content

### Why separate sensitivity from model checking (Sec. 2.4)
Many methods introduce sensitivity parameters informed by the observed data. Pathologies:
1. A parametric relaxation of unconfoundedness can fundamentally change the relationship between confounding and identification and introduce new, unexamined sensitivities.
2. **Computation**: each parameter setting needs a refit (costly for nonparametric models).
3. **Data snooping**: with identified parameters the analyst can choose the most favourable fit as the "main" model (Rosenbaum 2017: "What is not a sensitivity analysis?"); in a valid analysis the observed-data model can be tuned on held-out data.
4. **Bayesian tension** (Gustafson et al. 2018): identified sensitivity parameters conflict between the prior used to calibrate them and the data, making posterior uncertainty hard to interpret. Scharfstein et al. (2003) rejected a parametric complete-data model with an identified parameter because the fit implied implausibly large selection bias.
5. Other examples: ignorability is testable in a Heckman selection model because of Gaussianity (Little & Rubin 2015); small changes in tail thickness change test conclusions about ignorability (Kenward 1998).

> [!example] Example 1: normal outcome, binary latent confounder (Fig. 1)
> No covariates, Bernoulli-design treatment, possible latent class $U$:
> $$
> U\sim\text{Bern}(\xi_u),\quad T|U\sim\text{Bern}(g(\alpha+\psi_TU)),\quad Y(t)|U\sim N(\mu_t+\psi_YU,\sigma^2).
> $$
> At $(\psi_T,\psi_Y)=(0,0)$ this is random assignment. The observed outcome is a two-component normal mixture,
> $$
> Y(t)|T=t\sim h_{\psi_T}\,N(\mu_t+\psi_Y,\sigma^2)+(1-h_{\psi_T})N(\mu_t,\sigma^2),\qquad h_{\psi_T}=f(U=1|T).
> $$
> Observed and missing potential-outcome distributions share the same mixture components but differ in weights; weights and component means are identifiable under weak conditions (Everitt 1985). In the figure (simulated with $\xi_u=1/2$, $\alpha=0$, $\mu_t=0$, $\psi_T=-1$, $\psi_Y=5$, $\sigma^2=1$) only the true $(\psi_T,\psi_Y)$ ($\Delta\psi_T=\Delta\psi_Y=0$) reproduces the observed control density; the other grid cells ($\Delta\in\{-2,0,2\}$) visibly misfit. A competent analyst would reject them, and the investigator could even reject unconfoundedness by fit alone, but only under the parametric form assumed.
^ex-latent-class

Extensions with covariates or nonparametric regression (Imbens 2003; Dorie et al. 2016) leave residuals as normal mixtures and the same identification issue.

### The factorization view (Sec. 2.2, Eq. 1)
$$
f^{mis}_{\psi,t}(Y(t)|T=1{-}t,X)\propto\frac{f_\psi(T=t|Y(t),X)}{f_\psi(T=1{-}t|Y(t),X)}f^{obs}_t(Y(t)|T=t,X).
$$
The fraction is an importance weight turning the observed outcome distribution into the missing one. The observed-data distributions $f^{obs}_t$ are free of $\psi$, so model checking and sensitivity analysis are cleanly separated.

### Related methods (Sec. 2.3)
- **Model-based sensitivity analysis** from Rosenbaum & Rubin (1983); alternatives: Rosenbaum & Silber (2009), Díaz & van der Laan (2013), Ding & VanderWeele (2016), Zhao et al. (2017).
- **Flexible outcome models:** Dorie et al. (2016) with BART (see Sec. 6.1 contrast), Carnegie et al. (2016); Jung et al. (2018) combine black-box models with sensitivity for algorithmic decisions but with sensitivity parameters that depend only weakly on the observed data because they focus on binary outcomes and covariate-smooth parameters.
- **Nonparametric just-identified (NPI) models** (Robins et al. 2000): same Tukey variant, used for missing data and dropout (Rotnitzky et al. 2001; Scharfstein et al. 2003); suggested but not pursued for observational confounding. The Bayesian missing-data line (Linero & Daniels 2017) uses "identifying restrictions"; Hahn et al. (2016) separate observed-data modelling from sensitivity parameters.

## Examples

```python
# Example 1 (latent class): the observed outcome is a mixture, so the sensitivity parameters are identified
import numpy as np
rng = np.random.default_rng(0); n = 200_000
U = rng.binomial(1, 0.5, n)
T = rng.binomial(1, 1/(1+np.exp(-(0.0 - 1.0*U))))          # psi_T = -1, alpha = 0
Y0 = rng.normal(0 + 5.0*U, 1.0)                              # psi_Y = 5
# Observed control outcomes (T=0): two-component mixture whose weights depend on psi_T
obs = Y0[T == 0]
print("share U=1 among observed controls:", U[T == 0].mean(), " (identifies psi_T given psi_Y)")
print("bimodality gap = mean diff between components ~", obs[U[T==0]==1].mean()-obs[U[T==0]==0].mean())
```

## Connections

- This is the Bayesian-workflow version of "do not let the data silently identify the thing you are probing". Marketing analogue: in an MMM, a prior on an unidentified baseline-vs-media split is informative only through the prior; see [[Unidentified Parameters - Partial Identification and Bayesian Updating]].
- Compare with partial-$R^2$ sensitivity where confounder strength is also an externally supplied parameter: [[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]].

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Missing Data Models]]
