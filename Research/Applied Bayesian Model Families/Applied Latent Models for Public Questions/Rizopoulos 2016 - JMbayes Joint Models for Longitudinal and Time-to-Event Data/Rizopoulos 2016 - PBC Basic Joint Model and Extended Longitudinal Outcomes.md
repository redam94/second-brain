---
title: "Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/example
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Sec. 4.1-4.2, pp. 7-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on:
  - "[[Rizopoulos 2016 - Joint Model Specification and Posterior]]"
  - "[[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]]"
used_by:
  - "[[Rizopoulos 2016 - Association Structures and Transformation Functions]]"
  - "[[Rizopoulos 2016 - JMbayes Joint Models Overview]]"
aliases:
  - "PBC joint model results"
  - "joint model Student-t binary censored longitudinal"
  - "PBC Mayo Clinic bilirubin"
---

# Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes

> [!summary]
> Data: Mayo Clinic primary biliary cirrhosis (1974-84); the text says 312 patients randomized to D-penicillamine and 154 to placebo (as printed), while the model output lists 312 subjects, 1,945 serum-bilirubin measurements (6.2 per patient on average) and 169 composite events (54.2%). Basic joint model with natural-spline mixed model for log bilirubin and current-value association: $\alpha=1.41$ (SD 0.094), hazard ratio 2.7 for doubling bilirubin. Student-$t$, binary and left-censored extensions give similar substantive conclusions.

## Main Content

> [!example] The basic joint model `jointFit.pbc1` (3.8 min)
> Mixed model `lme(log(serBilir) ~ ns(year,2), random = ~ ns(year,2) | id)`; Cox model `Surv(years, status2) ~ drug * age`; `jointModelBayes(..., timeVar="year", n.iter=30000)`. Fit: LPML -3165.22, DIC 6082.5, pD 929.6.
>
> | Component | Estimate | SD | 95% CrI |
> |---|---|---|---|
> | Random effects SD: intercept / ns1 / ns2 / residual | 1.006 / 2.225 / 2.078 / 0.303 | | |
> | Longitudinal intercept | 0.5116 | 0.0579 | (0.3959, 0.6234) |
> | Longitudinal ns(year,2)1 | 2.2845 | 0.1476 | (2.0071, 2.5828) |
> | Longitudinal ns(year,2)2 | 2.0899 | 0.1516 | (1.7947, 2.3801) |
> | drug D-penicil | -0.7776 | 0.7762 | (-2.2608, 0.9006) |
> | age | 0.0404 | 0.0126 | (0.0158, 0.0668) |
> | drug:age | 0.0125 | 0.0153 | (-0.0196, 0.0412) |
> | Assoct ($\alpha$) | 1.4099 | 0.0935 | (1.2317, 1.6008) |
> | tauBs (smoothing) | 523.8 | 272.2 | (143.7, 1153.4) |
>
> Interpretation: $\exp(0.693\times1.4099)=2.66$ per doubling of serum bilirubin (95% CI 2.3-3.0); the treatment effect is not distinguished from zero.
^ex-basic-pbc

> [!definition] Extended longitudinal outcomes via `densLong`
> `densLong(y, eta.y, scale, log, data)` supplies the log-density of the longitudinal response given its linear predictor, so any family or censoring can be used without changing the sampler.
> - **Student-$t$ errors** (df = 4): `dgt(y, mu=eta.y, sigma=scale, df=4)`. Residual SD falls to 0.209; $\alpha=1.348$; doubling bilirubin gives 2.5-fold risk (CI 2.3-2.9).
> - **Binary biomarker** (bilirubin $>1.8$ mg/dL; mixed logistic model by `glmmPQL`): $\alpha=0.228$ (SD 0.032) = log hazard ratio per unit increase in the log-odds of high bilirubin.
> - **Left-censored biomarker** (detection limit 0.8 mg/dL): density for uncensored, CDF for censored (`CensInd`): $\alpha=1.388$ (SD 0.098), close to the uncensored fit.
^def-densLong

> [!example] Comparison across the longitudinal specifications
> | Model | $\alpha$ | SD | 95% CrI | Fit time |
> |---|---|---|---|---|
> | Normal errors (pbc1) | 1.4099 | 0.0935 | (1.2317, 1.6008) | 3.8 min |
> | Student-$t$, df=4 (pbc2) | 1.3479 | 0.0896 | (1.1786, 1.5178) | 3.7 min |
> | Binary (pbc3) | 0.2282 | 0.0316 | (0.1774, 0.2947) | 2.5 min |
> | Left-censored (pbc4) | 1.3883 | 0.0977 | (1.1999, 1.5915) | 4.0 min |
>
> Only the binary model changes the scale of $\alpha$ (log-odds, not log-bilirubin). The substantive finding (strong positive association) is stable.
^ex-longitudinal-compare

**Left truncation and exogenous time-varying covariates** (Appendix C): fit a counting-process time-varying Cox model first and pass it to `jointModelBayes()`.

## Connections
E25 biases (baseline-only, last-observation-carried-forward and two-stage approaches) are the standard foil for the joint model; see [[Missing Data Models]] and [[Rizopoulos 2016 - Joint Model Specification and Posterior]]. [[Survival Analysis]] for the Cox background.

## See Also
[[Rizopoulos 2016 - JMbayes Joint Models Overview]]
