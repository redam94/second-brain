---
title: Bayesian Outcome Models
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§4, pp. 8–11"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: paper
depends_on:
  - "[[General Structure of Bayesian CI]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[Propensity Score in Bayesian CI]]"
aliases:
  - BART causal
  - Bayesian Causal Forest
  - outcome model specification
---

# Bayesian Outcome Models

> [!summary]
> The outcome model $\mu_z(x) = \mathbb{E}[Y \mid Z=z, X=x]$ is the central component in Bayesian causal inference. Common specifications range from linear regression to non-parametric models (BART, Gaussian Process). In high-dimensional settings, standard regularization priors can induce bias through *regularization-induced confounding*, a phenomenon unique to causal inference.

## Overview

In Bayesian causal inference, the outcome model $\mu_z(x) = \mathbb{E}[Y_i \mid X_i = x, Z_i = z]$ is specified to estimate the [[Causal Estimands#^def-cate|CATE]] $\tau(x) = \mu_1(x) - \mu_0(x)$. Two common approaches:

1. **Joint model**: specify a single $\mu(z, x) = \mu(z, x)$ for both treatment arms
2. **Separate models**: model each arm separately with $\mu_z(x) = \mu(z, x)$, known as **S-learner** (joint) and **T-learner** (separate) in the literature

## Linear Outcome Model

The simplest outcome model: linear regression with a treatment-covariate interaction term:
$$\mu(z, x) = x + z + xz$$
where the $xz$ interaction captures treatment effect heterogeneity. Equivalent to fitting a linear regression in each group.

**Limitations**: linear models are easy to implement but often too restrictive. They do not adapt to the true data-generating mechanism in regions of poor covariate overlap.

## Non-Parametric Outcome Models

The recent focus on heterogeneous treatment effects has driven adoption of flexible, non-parametric outcome models. The most widely used are **regression trees** and their ensembles.

### BART (Bayesian Additive Regression Trees)

> [!definition] Definition: BART for Causal Inference
> BART places priors on the parameters of an ensemble of regression trees to control the depth and the degree of shrinkage of the mean function in terminal nodes. For causal inference, one specifies $\mu(z, x)$ as an S-learner (joint model) or fits a separate BART model for each treatment arm (T-learner).
^def-bart

- Originally proposed by Chipman, George, McCulloch (2010)
- For causal inference: Hill (2011) first advocated using BART as an S-learner $\mu(z, x)$
- Has been shown to **outperform many competing methods**, including Frequentist random forests, in numerous empirical applications (Hill 2011, Dorie et al. 2019)
- Available in R: `BayesTree`, `BART`, `dbarts` packages

### Bayesian Causal Forest (BCF)

> [!definition] Definition: Bayesian Causal Forest (BCF)
> Hahn et al. (2020) proposed BCF: separate the outcome model as
> $$\mu(z, x) = g_1(x) + g_2(x) \cdot z$$
> where $g_1(x)$ models the distribution of $Y(0)$ and $g_2(x)$ represents the heterogeneous treatment effect, with a **separate BART prior** for $g_1(\cdot)$ and $g_2(\cdot)$.
^def-bcf

**Advantages of BCF over standard BART**:
- Fast computation; good performance of default hyperparameters
- Available software: `bcf` R package
- Importantly: adding the estimated propensity score as an additional input to $g_1(\cdot)$ significantly improves empirical estimation of the CATE

### Gaussian Process (GP) Outcome Model

A Gaussian Process prior on $\mu_z(\cdot)$ provides:
- Potential **bias reduction** by widening credible intervals as overlap decreases (adaptively)
- Flexible covariance function: e.g., Gaussian kernel with signal-to-noise ratio $\rho$ and inverse-bandwidth $\lambda$
  $$\Sigma_{ij} = \delta^2 \rho^2 \exp\{-\lambda^2 \|x_i - x_j\|^2\}$$

However, the GP prior's uncertainty does not automatically adapt to overlap — see Example 4.1.

## Example 4.1 — Priors and Overlap in Estimating the CATE

> [!example] Example 4.1 — Choice of Priors in Estimating the CATE (Li et al. §4b)
> **Setup**: 250 treated ($Z_i=1$) and 250 control ($Z_i=0$) units. Single covariate $X \sim \text{Gamma}(\text{mean } 60 \text{ [treated]}, \text{mean } 35 \text{ [control]}, \text{sd } 8)$. True outcome: $Y_i(z) = 10 + 5z - 0.3X_i + \epsilon_i$, $\epsilon_i \sim \mathcal{N}(0,1)$. True CATE $= 5$ for all $x$.
>
> Three outcome model priors:
> - **(i)** Linear: $\mu(z,x) = \alpha_z + \beta_z x$
> - **(ii)** Gaussian Process with Gaussian kernel
> - **(iii)** BART
>
> **Findings** (illustrated in Figure 1):
> - In the region of **good overlap** (40–50 in $X$): all three models agree
> - **Linear** model: overconfident everywhere; does not widen uncertainty in poor overlap regions
> - **GP** model: trades potential bias for wider credible intervals as overlap decreases, but uncertainty does not fully adapt
> - **BART**: shorter error bars than GP (wider than linear), but width remains similar regardless of overlap → **overconfident in poor overlap regions**
>
> **Lesson**: A desirable prior should accurately reflect uncertainty according to the degree of covariate overlap — uncertainty should increase as overlap decreases.
^ex-41

## Challenges in High Dimensions

### Two Settings

1. **Non-parametric outcome model** with infinite/large parameters (regardless of $p$)
2. **High-dimensional covariates** ($p$ large relative to $N$)

Both are increasingly common in causal inference, especially when targeting the CATE.

### Regularization-Induced Confounding

> [!warning] Regularization-Induced Confounding
> In high dimensions, Bayesian regularization priors (spike-and-slab, Bayesian LASSO, model averaging) on the **nuisance parameters** — the regression coefficients for the covariate-outcome relationship — can induce bias in causal estimates.
>
> **Mechanism** (Hahn et al. 2020; Linero 2021):
> Under Assumption 3.2 (prior independence), many Bayesian regularization priors on $\theta_Y$ concentrate the selection bias $\delta_z = \mathbb{E}[Y_i \mid Z_i=z, X_i] - \mathbb{E}[Y_i(z)]$ around zero as $p \to \infty$.
>
> This is **prior dogmatism** — the prior effectively removes confounding, regardless of what the data say.
^warn-reg-confounding

**Solution**: Use **double machine learning** strategies — regularize the propensity score model and outcome model *jointly*, ensuring the regularized propensity score enters the outcome model for valid causal inference. See §5 of the paper and [[Propensity Score in Bayesian CI]].

### Key References
- Robins & Ritov (1997): non-parametric estimators have slow convergence rates in high dimensions
- Hahn et al. (2020) *Bayesian Regression Tree Models for Causal Inference* — BCF, identification of regularization-induced confounding
- Linero (2021) — rigorous treatment of Bayesian ignorability in non-parametric models

## Model Averaging

High-dimensional settings often use **Bayesian model averaging** techniques:
- Spike-and-slab priors (Antonelli et al. 2019)
- Bayesian LASSO (Park & Casella 2008)
- Model averaging (Raftery et al. 1997)

These achieve regularization via sparsity-inducing priors but must be used carefully due to regularization-induced confounding.

## Connections

- [[General Structure of Bayesian CI]] — the outcome model is the core of Bayesian causal inference
- [[Propensity Score in Bayesian CI]] — strategies to incorporate propensity score into outcome model
- [[Nonparametric Causal Inference]] — existing vault note on non-parametric Bayesian causal methods

## See Also
- [[Causal Estimands#^def-cate]] — CATE is the primary target of outcome modeling
- [[Bayesian Inverse Probability Weighting]] — Bayesian IPW as alternative to outcome modeling
