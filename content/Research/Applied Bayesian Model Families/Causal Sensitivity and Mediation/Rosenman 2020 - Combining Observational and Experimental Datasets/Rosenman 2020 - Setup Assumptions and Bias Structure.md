---
title: "Rosenman 2020 - Setup Assumptions and Bias Structure"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/definition
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Sec. 1-3, pp. 2-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]"
used_by:
  - "[[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]]"
  - "[[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]]"
aliases:
  - common treatment effect assumption
  - stratum bias xi
  - Green Strawderman estimators
---

# Rosenman 2020 - Setup Assumptions and Bias Structure

> [!summary]
> The paper's setting: an observational study $O$ and an RCT $R$ share a common average effect $\tau_k$ in each of $K$ strata (Assumption 2). The RCT estimate $\hat\tau_r$ is unbiased with covariance $\Sigma_r$; the observational estimate $\hat\tau_o$ has mean $\tau+\xi$ where the bias $\xi_k$ arises from correlation between potential outcomes and propensity scores. Estimation error is the $D$-weighted squared error $L(\tau,\hat\tau)=(\hat\tau-\tau)^TD(\hat\tau-\tau)$.

## Overview

**Related work (Sec. 2).** Transportability and generalisation (Campbell 1957 internal/external validity; Bareinboim & Pearl 2016; Cole & Stuart 2010; Stuart et al. 2011; Hartman et al. 2015) typically use observational data to *generalise* RCT results. Using observational *causal estimates* is rarer because of bias: Rosenman et al. (2018) and Athey et al. (2019) assume unconfoundedness; Kallus et al. (2018) assume parametric hidden confounding; Peysakhovich & Lada (2016) assume the bias preserves unit-level rank order. Green & Strawderman (1991) and Green et al. (2005) address combining biased and unbiased estimators in the empirical Bayes setting.

> [!definition] Green-Strawderman (1991) estimator (homoscedastic case)
> If $\hat\tau_r\sim N_K(\theta,\sigma^2I)$ and $\hat\tau_o\sim N_K(\theta-\xi,v^2I)$, the estimator $\hat\tau_o+\left(1-\dfrac{(K-2)\sigma^2}{\|\hat\tau_o-\hat\tau_r\|^2}\right)_+(\hat\tau_r-\hat\tau_o)$ dominates $\hat\tau_r$ under $L_2$ loss and, unlike precision weighting, has bounded risk as the bias grows. The heteroscedastic follow-up gives $\delta_1=\hat\tau_o+\left(1-\dfrac{a}{(\hat\tau_r-\hat\tau_o)^T\hat\Sigma_r^{-1}(\hat\tau_r-\hat\tau_o)}\right)(\hat\tau_r-\hat\tau_o)$ (dominates under precision-weighted loss; $a$ depends on $\xi$) and $\delta_2=\hat\tau_o+\left(I_K-\dfrac{a\hat\Sigma_r^{-1}}{(\hat\tau_r-\hat\tau_o)^T\hat\Sigma_r^{-2}(\hat\tau_r-\hat\tau_o)}\right)(\hat\tau_r-\hat\tau_o)$ (conventional $L_2$ loss); $a=K-2$ is optimal for $\delta_2$ and the default for $\delta_1$.
^def-green-strawderman

## Main Content

### Units and notation (Sec. 3.1)
Units $i\in O\cup R$, $|O|=n_o$, $|R|=n_r$. Each has fixed, unseen potential outcomes $(Y_i(1),Y_i(0))$, measured covariates $X_i\in\mathbb R^p$, an unmeasured covariate $U_i$. For $i\in O$, an unknown propensity $p_i\in[0,1]$. Random quantities: treatment $W_i$ and observed $Y_i=W_iY_i(1)+(1-W_i)Y_i(0)$. The framework is randomisation-based: potential outcomes are fixed; only assignment is random.

### Assumptions and loss (Sec. 3.2)
A known stratification gives $k=1,\dots,K$ strata with population weights $w_1,\dots,w_K$ (treated as non-random); subsets $O_k,R_k$ with sizes $n_{ok},n_{rk}$.

> [!definition] Assumption 1 (allocations to treatment)
> For $i\in O$, $W_i\sim\text{Bern}(p_i)$ with $p_i=f(X_i,U_i)$, a function of observed and unobserved covariates. For $i\in R$, treatment is a simple random sample of size $n_{rkt}$ in each stratum $k$.
^asm-allocation

> [!definition] Assumption 2 (common treatment effect)
> For all $k$: $\tau_k=\frac1{n_{ok}}\sum_{i\in O_k}[Y_i(1)-Y_i(0)]=\frac1{n_{rk}}\sum_{i\in R_k}[Y_i(1)-Y_i(0)]$. Target $\tau=(\tau_1,\dots,\tau_K)$.
^asm-common-effect

Plausible when the $K$ strata are $K$ treatments in a multi-arm trial (Dimmery et al. 2019: each treatment has a constant effect transportable across datasets) or $K$ subgroups with heterogeneous effects (found a priori or via Wager & Athey 2018, Hill 2011). It is "a mathematical convenience"; it will not hold exactly in finite samples (alternatives: effects differ by $O(1/n)$, or only after adjustment; left to future work).

> [!definition] Loss function
> $L(\tau,\hat\tau)=\frac1K\sum_kd_k(\hat\tau_k-\tau_k)^2$ with $d_k>0$, $\sum_kd_k=1$, i.e. $(\hat\tau-\tau)^TD(\hat\tau-\tau)$ with $D=\text{diag}(d_k/K)$. Ideally $d_k\approx w_k$; otherwise use $d_k=n_{ok}/n_o$ (observational frequencies as population frequencies).
^def-loss

### Estimators and distributions (Sec. 3.3)
$$
\hat\tau_{ok}=\frac{\sum_{i\in O_k}W_iY_i}{\sum_{i\in O_k}W_i}-\frac{\sum_{i\in O_k}(1-W_i)Y_i}{\sum_{i\in O_k}(1-W_i)},\qquad\hat\tau_{rk}=\frac{\sum_{i\in R_k}W_iY_i}{n_{rkt}}-\frac{\sum_{i\in R_k}(1-W_i)Y_i}{n_{rkc}},
$$
$n_{rkc}=n_{rk}-n_{rkt}$. With sufficient sample sizes a finite-population CLT (Li & Ding 2017) gives $\hat\tau_r\approx N(\tau,\Sigma_r)$. No distributional assumption for $\hat\tau_o$ beyond its mean $\tau+\xi$ and covariance $\Sigma_o$. Both $\Sigma_r$ and $\Sigma_o$ are diagonal (entries $\sigma_{rk}^2,\sigma_{ok}^2$).

> [!theorem] Bias of the observational estimator (delta method, from Rosenman et al. 2018)
> $$
> \xi_k=\left(\frac{s_{tk}}{\bar p_k}+\frac{s_{ck}}{1-\bar p_k}\right)+O\!\left(\frac1{n_{ok}}\right),
> $$
> where $s_{tk},s_{ck}$ are the within-stratum correlations of the propensity score $p_i$ with $Y_i(1)$ and $Y_i(0)$ respectively and $\bar p_k$ the average propensity in stratum $k$. The bias vanishes if propensity and potential outcomes are uncorrelated within stratum (unconfounded after stratification). Full derivation is in the 2018 paper (not in this PDF).
^thm-bias-xi

## Examples

> [!example] Bias from hidden targeting
> Suppose in stratum $k$ the propensity of exposure correlates $s_{ck}=+0.02$ with baseline conversion $Y(0)$ (retargeting) and $s_{tk}=+0.02$ with $Y(1)$, and $\bar p_k=0.2$. Then $\xi_k\approx0.02/0.2+0.02/0.8=0.125$ on the outcome's scale: a large bias from a small correlation when the exposed share is small. (Illustrative arithmetic on the displayed formula; units of $s$ follow the paper's covariance convention.)

```python
import numpy as np
def xi_k(s_t, s_c, pbar):          # first-order bias of the observational stratum estimate
    return s_t/pbar + s_c/(1-pbar)
print(xi_k(0.02, 0.02, 0.2))       # 0.125
```

## Connections

- The additive per-stratum bias is the same object a hierarchical Bayesian model would put a prior on: [[Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts]].
- Experiment-vs-observation grading in ads: [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]].

## See Also

[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]], [[Potential Outcomes Framework]]
