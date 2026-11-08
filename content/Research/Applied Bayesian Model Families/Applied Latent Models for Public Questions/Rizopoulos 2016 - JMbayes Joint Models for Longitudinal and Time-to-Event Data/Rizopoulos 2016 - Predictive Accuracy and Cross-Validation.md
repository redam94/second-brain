---
title: "Rizopoulos 2016 - Predictive Accuracy and Cross-Validation"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Sec. 5.3, pp. 30-37; Eq. 11; Sec. 6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on:
  - "[[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]]"
used_by:
  - "[[Rizopoulos 2016 - JMbayes Joint Models Overview]]"
aliases:
  - "time-dependent AUC joint model"
  - "dynamic concordance index"
  - "prediction error validation joint model"
---

# Rizopoulos 2016 - Predictive Accuracy and Cross-Validation

> [!summary]
> Discrimination is the time-dependent AUC $\text{AUC}(t,\Delta t)$ and its weighted average, the dynamic concordance index $C^{\Delta t}_{dyn}$; calibration/accuracy is the expected (integrated) prediction error with a censoring correction. For model pbc15 with 5 years of data and a 2-year window, AUC is 0.854 and $C_{dyn}=0.791$; prediction error at year 7 is 0.106 (IPE over [5, 9]: 0.090). 10-fold cross-validation gives AUC 0.851 and PE 0.121 (some optimism).

## Main Content

> [!definition] Time-dependent sensitivity, specificity and AUC (Sec. 5.3)
> With longitudinal data up to $t$ and horizon $\Delta t$, call subject $j$ a *case* if $\pi_j(t+\Delta t\mid t)\le c$ and a *control* otherwise.
> Sensitivity $=P\{\pi_j\le c\mid T_j^*\in(t,t+\Delta t]\}$; specificity $=P\{\pi_j>c\mid T_j^*>t+\Delta t\}$. For pairs $(i,j)$, $i$ with event in the window and $j$ event-free:
> $$
> \text{AUC}(t,\Delta t)=P\{\pi_i(t+\Delta t\mid t)<\pi_j(t+\Delta t\mid t)\mid T_i^*\in(t,t+\Delta t],\ T_j^*>t+\Delta t\}.
> $$
^def-auc

> [!definition] Estimators with censoring
> $\widehat{\text{AUC}}=\widehat{\text{AUC}}_1+\widehat{\text{AUC}}_2$: the first uses comparable pairs $\Omega^{(1)}_{ij}=\{T_i\in(t,t+\Delta t]\}\cap\{\delta_i=1\}\cap\{T_j>t+\Delta t\}$, the proportion concordant; the second uses pairs with censored $i$, weighted by $\hat\nu_i(t+\Delta t\mid T_i)=1-\hat\pi_i(t+\Delta t\mid T_i)$. **Dynamic concordance** (Eq. 11): $C^{\Delta t}_{dyn}=\int_0^\infty\text{AUC}(t,\Delta t)P\{E(t)\}dt\big/\int_0^\infty P\{E(t)\}dt$, with $P\{E(t)\}=\{S(t)-S(t+\Delta t)\}S(t+\Delta t)$ and $S$ estimated by Kaplan-Meier; integrals by the 15-point Gauss-Kronrod rule. R: `aucJM`, `rocJM`, `dynCJM`.
^def-dyn-c

> [!definition] Prediction error
> $PE(u\mid t)=\mathbb E[L\{N_i(u)-\pi_i(u\mid t)\}]$, $N_i(u)=I(T_i^*>u)$, loss $L$ (square default). Censoring-corrected estimator (Henderson, Diggle and Dobson 2002):
> $\widehat{PE}(u\mid t)=n(t)^{-1}\sum_{i:T_i\ge t}\big[I(T_i\ge u)L\{1-\hat\pi_i(u\mid t)\}+\delta_iI(T_i<u)L\{0-\hat\pi_i(u\mid t)\}+(1-\delta_i)I(T_i<u)\big(\hat\pi_i(u\mid T_i)L\{1-\hat\pi_i(u\mid t)\}+\{1-\hat\pi_i(u\mid T_i)\}L\{0-\hat\pi_i(u\mid t)\}\big)\big]$. Integrated PE over $[t,u]$ (Schemper and Henderson 2000) weights by $\hat S_C(t)/\hat S_C(T_i)$ with $S_C$ the Kaplan-Meier censoring survival. R: `prederrJM`.
^def-pe

> [!example] PBC accuracy of pbc15
> | Measure | Setting | Estimate |
> |---|---|---|
> | AUC | $t=5$, $\Delta t=2$ (202 at risk) | 0.8537 |
> | Dynamic C | $\Delta t=2$, [0, 14.31] | 0.7913 |
> | Prediction error | $t=5$, $u=7$, square loss | 0.1064 |
> | Integrated PE | [5, 9] | 0.0902 |
> | 10-fold CV: mean AUC / PE | $t=5$, horizon 7 | 0.8508 / 0.1213 |
>
> Interpretation: discrimination is good and nearly identical out of sample; the in-sample prediction error is slightly optimistic (0.106 vs 0.121).
^ex-pbc-accuracy

**Validation recipe.** Split patients (not rows) into $V$ folds, refit on training data (re-defining every object), compute AUC and PE on held-out patients with the same $t$ and horizon, and average; run folds in parallel (8.3 min on 5 cores).

**Future plans (Sec. 6).** C++ speed-up, multiple longitudinal outcomes, competing and recurrent events, interval censoring, priors for data-driven structure selection (Andrinopoulou and Rizopoulos 2016), personalised screening intervals.

## Examples
```python
import numpy as np
def auc_pairs(pi_case, pi_ctrl):     # pi_*: predicted survival at t+dt for cases / controls
    pc = np.asarray(pi_case)[:, None]; pn = np.asarray(pi_ctrl)[None, :]
    return (pc < pn).mean() + 0.5 * (pc == pn).mean()
```

## Connections
[[Forecast Evaluation and Backtesting]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]], [[Survival Analysis]].

## See Also
[[Rizopoulos 2016 - JMbayes Joint Models Overview]]
