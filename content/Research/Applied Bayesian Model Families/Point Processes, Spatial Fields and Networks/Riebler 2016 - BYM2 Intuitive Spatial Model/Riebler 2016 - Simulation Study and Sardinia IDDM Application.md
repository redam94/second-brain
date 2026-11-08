---
title: "Riebler 2016 - Simulation Study and Sardinia IDDM Application"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping.pdf]]"
source_location: "Sec. 5-6, Appendices A-B, pp. 10-15, Tables 1-4, Figs. 3-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Riebler 2016 - BYM2 Intuitive Spatial Model"
doc_type: paper
depends_on:
  - "[[Riebler 2016 - Penalised Complexity Priors for BYM2]]"
used_by:
aliases:
  - "BYM2 simulation study"
  - "Sardinia IDDM"
---

# Riebler 2016 - Simulation Study and Sardinia IDDM Application

> [!summary]
> On the 366-district Sardinia graph, 200 datasets x 9 scenarios show BYM2 with PC priors shrinks to both base models (constant risk; iid noise) and learns spatial structure when present, with model-choice criteria (RMSE, DIC, log score) no worse than iid, Besag, Leroux, Dean. The IDDM application (619 cases) supports near-constant risk, and posterior risk maps are insensitive to the prior on $\phi$.

## Overview
Truth: $\log\theta_i=\mu+\tau_b^{-1/2}b_i$ with $\mu=0$. Scenarios: constant ($1/\sqrt{\tau_b}=0$); iid ($0.5$, $b\sim N(0,I)$); spatial ($0.5$, $b\sim N(0,Q^{\star-})$); each with $E_i\in\{15,60,200\}$. Fitted with INLA.

## Main Content

### Table 1 - BYM2 posterior means (SD in parentheses; PC priors for $\phi$ and $\tau_b$)

| Scenario | $E$ | $\mu$ | $1/\sqrt\tau$ | $\phi$ |
|---|---|---|---|---|
| Constant ($0$, $\phi=0$) | 15 | -3.78E-04 (0.01) | 0.02 (0.02) | 0.26 (0.05) |
| | 60 | -9.15E-04 (0.01) | 0.01 (0.01) | 0.26 (0.05) |
| | 200 | -4.36E-04 (0.004) | 0.01 (0.01) | 0.26 (0.04) |
| iid ($0.5$, $\phi=0$) | 15 | 1.62E-03 (0.03) | 0.50 (0.02) | 0.05 (0.03) |
| | 60 | -1.94E-03 (0.03) | 0.51 (0.03) | 0.04 (0.02) |
| | 200 | 1.21E-03 (0.03) | 0.50 (0.02) | 0.04 (0.02) |
| Spatial ($0.5$, $\phi=1$) | 15 | 2.14E-03 (0.01) | 0.47 (0.04) | 0.90 (0.06) |
| | 60 | 9.11E-06 (0.01) | 0.49 (0.05) | 0.93 (0.04) |
| | 200 | 4.70E-05 (0.004) | 0.49 (0.07) | 0.93 (0.04) |

Interpretation: with constant risk $\phi$ is unidentified and the prior dominates (0.26); with uniform $\phi$ prior it sits near 0.5 (Table 4, Appendix A); iid and spatial truths are recovered; $\phi$ is slightly lower for $E=15$ (learning needs data).

### Table 2 - Comparison, constant risk, $E=60$

| Model | $\mu$ | $1/\sqrt\tau$ | $\phi$ | RMSE | DIC | LS |
|---|---|---|---|---|---|---|
| iid | -1.65E-03 | 0.05 | 0.00 | 0.11 | 2545 | 3.47 |
| Besag | -1.26E-03 | 0.07 | 1.00 | 0.12 | 2545 | 3.48 |
| Leroux | -1.51E-03 | 0.07 | 0.56 (0.08) | 0.11 | 2545 | 3.48 |
| Dean | -1.69E-03 | 0.06 | 0.60 (0.12) | 0.11 | 2547 | 3.48 |
| BYM2 (unif) | -8.39E-04 | 0.01 | 0.46 (0.05) | 0.12 | 2540 | 3.47 |
| BYM2 (PC) | -9.15E-04 | 0.01 | 0.26 (0.05) | 0.12 | 2540 | 3.47 |

Caution: parameters across models are not comparable (different priors, unscaled precision in Leroux/Dean). Only iid and BYM2 estimates are comparable. DIC slightly favours BYM2; Besag worse under iid truth, iid worse under spatial truth (Figs. 5-6, Appendix A).

### Table 3 - Sardinia IDDM posterior (366 districts, 619 cases 1989-92, ages 0-29, no covariates)
Priors: $\Pr(\phi<0.5)=2/3$; $\tau_b$ with $U=0.2/0.31$, $\alpha=0.1$ (marginal SD 0.2).

| Prior for $\phi$ | quantity | mean | sd | 2.5% | median | 97.5% | mode |
|---|---|---|---|---|---|---|---|
| $U{=}.5,\alpha{=}2/3$ | $\mu$ | 0.01 | 0.05 | -0.09 | 0.01 | 0.10 | 0.01 |
| | $\tau_b$ | 262.79 | 751.60 | 10.14 | 45.36 | 2549.91 | 17.40 |
| | $\phi$ | 0.48 | 0.31 | 0.01 | 0.48 | 0.98 | 1.00 |
| $U{=}.5,\alpha{=}.5$ | $\tau_b$ | 233.51 | 686.28 | 10.00 | 42.78 | 2241.48 | 17.37 |
| | $\phi$ | 0.54 | 0.31 | 0.02 | 0.57 | 0.99 | 1.00 |
| $U{=}.5,\alpha{=}.1$ | $\tau_b$ | 201.56 | 616.57 | 9.83 | 40.11 | 1880.89 | 17.27 |
| | $\phi$ | 0.63 | 0.29 | 0.03 | 0.69 | 1.00 | 1.00 |
| Unif(0,1) | $\tau_b$ | 189.46 | 591.67 | 9.77 | 39.07 | 1734.34 | 17.21 |
| | $\phi$ | 0.64 | 0.26 | 0.08 | 0.69 | 0.99 | 1.00 |

High $\tau_b$ supports constant relative risk (zero log-RR inside all credible intervals); posterior of $\phi$ is nearly flat; posterior risk estimates barely change with the $\phi$ prior (Fig. 4), consistent with MacNab et al. but MacNab found strong sensitivity in the Leroux model.

### Discussion (Sec. 6)
Scaling gives interpretable, transferable priors; PC priors allow reduction to simpler models and avoid overfitting; BYM2 integrates with covariates and space-time; more work needed to distribute variance across all linear-predictor terms and for formal prior sensitivity (Roos et al.). Applicable beyond disease mapping (e.g. genes as regions).

## Examples
Appendix B INLA call: `f(region, model="bym2", graph=..., scale.model=TRUE, constr=TRUE, hyper=list(phi=list(prior="pc", param=c(0.5,2/3), initial=-3), prec=list(prior="pc.prec", param=c(0.2/0.31, 0.1), initial=5)))` (paraphrased; priors given on logit-$\phi$ and log-precision scales).

## Connections
[[Spatial Models - BYM]] (baseline model), [[Riebler 2016 - Penalised Complexity Priors for BYM2]].

## See Also
[[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]]
