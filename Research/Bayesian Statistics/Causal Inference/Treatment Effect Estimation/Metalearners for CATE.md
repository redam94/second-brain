---
title: "Metalearners for CATE"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/treatment-effects
  - topic/machine-learning
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]]"
source_location: "Framework & Definitions, pp. 4157-4158"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Treatment Effect Estimation"
doc_type: paper
depends_on:
  - "[[Causal Estimands]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[S-Learner]]"
  - "[[T-Learner and Minimax Rate]]"
  - "[[X-Learner]]"
aliases:
  - metalearner framework
  - CATE estimation framework
---

# Metalearners for CATE

> [!summary]
> A **metalearner** (or meta-algorithm) is any algorithm that takes base ML learners as inputs and combines them to estimate the CATE. The framework decouples the structural problem of CATE estimation from the choice of base learner, enabling use of any supervised ML method (random forests, BART, neural nets) as a drop-in component.

## Overview

**Why metalearners?** Estimating CATE $\tau(x) = \mathbb{E}[Y(1) - Y(0) \mid X = x]$ directly is hard because one never observes both potential outcomes for the same unit. Metalearners exploit the structure of the problem — splitting it into subproblems where standard supervised ML excels.

## Setup and Notation

> [!definition] Definition: Potential Outcomes Setup
> For each unit $i$ with covariates $X_i \in \mathbb{R}^p$:
> - $Y_i(0)$ = potential outcome under control
> - $Y_i(1)$ = potential outcome under treatment
> - $W_i \in \{0, 1\}$ = treatment indicator
> - Observed outcome: $Y_i = Y_i(W_i)$
>
> **CATE:** $\tau(x) = \mathbb{E}[Y_i(1) - Y_i(0) \mid X_i = x]$
>
> **ATE:** $\tau = \mathbb{E}[\tau(X_i)]$
^def-potential-outcomes

> [!definition] Definition: Metalearner
> A **metalearner** (or metaalgorithm) is an algorithm $\hat{\tau}$ that:
> 1. Takes one or more supervised learning base learners $\mu_0, \mu_1$ (or $\mu$) as inputs
> 2. Uses these base learners to estimate response functions $\mu_0(x) = \mathbb{E}[Y(0) \mid X=x]$, $\mu_1(x) = \mathbb{E}[Y(1) \mid X=x]$
> 3. Combines the estimates to produce $\hat{\tau}(x)$
>
> The base learner can be *any* supervised ML method that minimizes expected squared error (regression) or any analogous loss.
^def-metalearner

## Superpopulation Model

Units are drawn i.i.d. from a superpopulation $\mathcal{P}$ over $(X, W, Y(0), Y(1))$. The treatment indicator $W \sim \text{Bern}(e(X))$ where $e(x) = P(W=1 \mid X=x)$ is the **propensity score**.

## Families of Distributions and Minimax Rate

> [!definition] Definition: Family with Bounded Minimax Rate
> For $a \in (0,1]$, the family $S(a)$ is the set of families $\mathcal{F}$ with a minimax rate $CN^{-a}$:
>
> $$\sup_{\mathcal{P} \in \mathcal{F}} \text{EMSE}(\hat{\mu}, \hat{\mu}_N) \leq CN^{-a}$$
>
> for some constant $C$, where $\hat{\mu}_N$ is the best estimator using $N$ samples.
>
> - $F_0 \in S(1)$ — families where we can estimate response at the parametric rate
> - $F_2 \in S(2/3)$ — nonparametric regression on $\mathbb{R}^d$ requires rate $N^{-2/(2+d)}$
^def-family

**Key implication for CATE:** Since CATE is a difference of two conditional means, its estimation rate depends on the smoothness of both response functions and the CATE function itself. The X-learner exploits the case where the CATE is smoother than the response functions.

## EMSE for CATE

> [!definition] Definition: EMSE for CATE Estimator
> The **Expected Mean Squared Error** for a CATE estimator $\hat{\tau}$ over $N$ observations with $n$ treated units:
>
> $$\text{EMSE}(\mathcal{P}, \hat{\tau}^{\text{mn}}) = \mathbb{E}\left[\left(\tau(X) - \hat{\tau}(X)\right)^2 \cdot \sum_{i=1}^{N} w_i\right]$$
>
> where the $w_i$ are importance weights ensuring the loss is meaningful when treatment groups are unequal.
^def-emse

## Three Metalearners

| Learner | Strategy | Key Advantage | Key Weakness |
|---------|----------|---------------|--------------|
| [[S-Learner]] | Single model on $(X, W)$ | Borrows strength across groups | Treatment indicator may be regularized to zero |
| [[T-Learner and Minimax Rate|T-Learner]] | Separate models for $W=0$ and $W=1$ | Clean separation | Suboptimal for unbalanced groups |
| [[X-Learner]] | Two-stage: impute ITEs, then regress | Best for unbalanced treatment | More complex; requires propensity score |

## Connections

- Builds on [[Causal Estimands]] — CATE is the target quantity
- [[Potential Outcomes Framework]] — the theoretical foundation
- [[Propensity Score in Bayesian CI]] — propensity score $e(x)$ used by X-learner as weighting function
- [[Nonparametric Causal Inference]] — BART is a common base learner for metalearners

## See Also

- [[Künzel 2019 - Overview]] — paper context
- [[S-Learner]], [[T-Learner and Minimax Rate]], [[X-Learner]] — the three metalearners
