---
title: "Ji 2024 - Simulation Results and Applications"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/example
  - doc/paper
source: "[[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]]"
source_location: "Sec. 4-7, Figs. 1-9, pp. 11-27"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
doc_type: paper
depends_on:
  - "[[Ji 2024 - Infinitesimal Jackknife Standard Errors]]"
  - "[[Ji 2024 - Yang-Wang-He Sandwich Adjustment]]"
used_by:
  - "[[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]]"
aliases:
  - Engel food expenditure quantile
  - Project STAR quantile regression
  - AL coverage simulation
---

# Ji 2024 - Simulation Results and Applications

> [!summary]
> Simulations (independent and clustered data) and two applications (Engel food expenditure; Project STAR) show: model-based AL posterior SDs can be wrong by up to 300% depending on $\sigma$; the Yang adjustment is >50% too large for some $\sigma$ at extreme $\tau$; IJ SEs track the frequentist sampling SD; and for extreme quantiles with large $\sigma$ the posterior mean is biased because the posterior is skewed (mean > median > mode).

## Overview

Design: two data-generating models, $n\in\{200,1000\}$, $\tau\in\{0.1,0.3,0.5,0.7,0.9\}$, 100 replications; $\alpha=\beta=2$ (and $\gamma=0.3$ in Model 2).

## Main Content

### Independent data (Sec. 4)

> [!definition] Data-generating models
> **Model 1** (location shift): $y_i=\alpha+\beta x_i+\epsilon_i$, $\epsilon_i\sim N(0,1)$, so $Q_\tau(y\mid x)=[\alpha+\Phi^{-1}(\tau)]+\beta x$. **Model 2** (location-scale): $y_i=\alpha+\beta x_i+(1+\gamma x_i)\epsilon_i$, $Q_\tau=[\alpha+\Phi^{-1}(\tau)]+[\beta+\gamma\Phi^{-1}(\tau)]x$. $x_i\sim N(0,1)$.
^def-dgp

Methods compared (fixed $\sigma\in\{0.1,0.2,0.5,1,2,5,10\}$): **ALD** (unadjusted posterior SD), **IJf** (IJ with fixed $\sigma$), **Yang** (adjusted). Free-$\sigma$ methods: **boot** and **sandwich** (`quantreg`, `se="boot"` with `bsmethod="xy"` and `se="nid"`), **IJ** (`brms`, half-$t$(3) on $\sigma$, `IJSE`), **AdjBQR** (Yang SEs with $\sigma$ = MLE at median), **brms** (unadjusted), **BayesQR** (IG(0.01,0.01) on $\sigma$).

> [!definition] Evaluation metrics
> Relative error $Re=\sqrt{\overline{se^2}/\operatorname{var}(\hat\beta)}-1$, Monte Carlo error (White 2010) $MCe=(Re+1)\sqrt{\operatorname{var}(se^2)/\overline{se^2}^{\,2}+1/(2m-1)}$ with $m=100$; empirical coverage of 90% normal-approximation credible intervals with exact binomial 95% CIs.
^def-metrics

Findings:
- ALD SDs over- or under-estimate depending on $\sigma$; as $\sigma$ grows the data look less informative and SDs grow. Up to 300% too large. Coverage: under-coverage up to $\sigma\approx1$, over-coverage beyond.
- Yang improves but is "over 50% too large" for some $\sigma$, especially $\tau=0.1,0.9$. IJf relative error near 0 for all $\sigma$.
- For $\tau\in\{0.3,0.5,0.7\}$ IJf coverage is about 0.9 at every $\sigma$, $n$ and model, like sandwich and bootstrap.
- For $\tau=0.1,0.9$ with $\sigma=5,10$ IJf coverage is too low, especially for the intercept, because the *Bayesian point estimator is biased* (posterior skewed; mean differs from the mode). Example: $\tau=0.9,\sigma=10$: bias in $\beta$ about 0.2 (Model 2, $n=200$); Yang covers 0.99 with average SE 0.2 vs 0.09 for IJf.
- Sample-size study ($\sigma=10$, $\tau=0.7$, $n=50\ldots5000$): Yang's relative error falls with $n$; IJf is clearly better when $n<500$.
- With free $\sigma$: IJ, IJf and AdjBQR are comparable to boot and sandwich; unadjusted brms underestimates SEs for $\alpha$ at all quantiles and for $\beta$ at $\tau=0.1,0.9$; BayesQR is consistently poor (dropped).

### Clustered data (Sec. 5; Hagemann 2017 design)

> [!definition] Cluster data-generating model
> $y_{ij}=u_{ij}+\tfrac1{10}x_{ij}+x_{ij}^2u_{ij}$ with $x_{ij}=\sqrt\rho z_j+\sqrt{1-\rho}\epsilon_{ij}$ (intraclass correlation $\rho$, variance 1), $z_j,\epsilon_{ij}\sim N(0,1)$, $u_{ij}\sim N(0,\tfrac13)$. Conditional quantiles: $Q_\tau(y_{ij}\mid x_{ij})=\alpha(\tau)+\beta_1(\tau)x_{ij}+\beta_2(\tau)x_{ij}^2$ with $\alpha(\tau)=\Phi^{-1}(\tau)/\sqrt{300}$, $\beta_1=1$, $\beta_2(\tau)=\Phi^{-1}(\tau)/\sqrt3$.
^def-cluster-dgp

Cluster size $I\in\{10,30\}$, $J\in\{10,50,100\}$, ICC $\in\{0.3,0.8\}$. IJf with $\sigma=0.1$, IJ, and clustered gradient bootstrap (`boot`). With $J=10$ none performs consistently: bootstrap relative error explodes at extreme $\tau$ (huge SEs in some datasets), IJ/IJf undercover (especially $\beta_2$ at extremes); **do not use these for extreme quantiles with 10 clusters.** For $J>10$ (e.g. $I=10,J=50$ and $I=30,J=100$ at $\rho=0.8$) IJ is closer to nominal than IJf, intervals mostly span 0.9 except $\beta_2$ at extreme $\tau$ with small total $n$.

### Application 1 - Engel (1857) income and food expenditure (n = 235 Belgian working-class households)

Koenker and Bassett (1982) log-log slopes (Engel elasticities): **0.85, 0.88, 0.92** at $\tau=0.25,0.50,0.75$. Methods: bayes:qreg (IG prior), brms, ALD ($\sigma$ at median MLE), iid qreg, iid rq, sandwich qreg/rq, AdjBQR, IJ, boot qreg, boot. Point estimates similar across methods; **SEs differ greatly**: `brms` and `bayes:qreg` are "considerably smaller than for other methods"; AdjBQR and IJ comparable to sandwich; bootstrap SEs tend to be larger; sandwich and iid `rq` underestimate the slope SE at $\tau=0.75$ similar to brms (local sparsity estimate in `rq`). Fig. 8: for $\tau=0.75$ and fixed $\sigma$, the intercept posterior becomes increasingly right-skewed as $\sigma$ rises; mean - median - mode/MLE separate; at $\sigma=100$ (equivalently $\sigma=1$ after rescaling $y$) the mean far exceeds the MLE.

### Application 2 - Project STAR (Hagemann 2017)

79 Tennessee schools, 6,325 students in 325 classrooms (5,727 with complete data); treatments `small` (13-17 students), `regaide` (regular + aide); outcomes: math and reading scores. IJ cluster-robust CIs for the `small` coefficient across 11 quantile levels $\tau\in\{0.05,\dots,0.95\}$ "closely match" Hagemann's wild-gradient bootstrap (999 draws), whereas naive `se="ker"` intervals ignoring clustering are narrower.

## Examples

> [!example] Reading Fig. 1-style output
> A relative error of +1.0 means the reported SE is twice the sampling SD ($\sqrt{4}=2$, i.e. $Re=2-1$). ALD at $\sigma=10$ giving $Re\approx3$ means the interval is four times too wide; at $\sigma=0.1$ the interval is too narrow. Since $\sigma$ is "free" in the modeller's mind, the credible interval's width is arbitrary.
^ex-relative-error

## Connections

Correction methods: [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]], [[Ji 2024 - Infinitesimal Jackknife Standard Errors]]; conceptually the calibration problem is the one addressed by [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]] and [[Simulation-Based Calibration - Overview]].

## See Also

[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
