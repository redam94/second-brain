---
title: "Elrod and Keane 1995 - Factor-Analytic Probit Model Specification"
tags:
  - source/ingested
  - topic/latent-traits
  - type/definition
  - doc/paper
source: "[[raw/Elrod and Keane 1995 - A Factor-Analytic Probit Model for Market Structure in Panel Data.pdf]]"
source_location: "Model specification, pp. 5-7 (Eqs. 1-8)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Elrod and Keane 1995 - Factor-Analytic Probit Market Structure"
doc_type: paper
depends_on:
  - "[[Elrod and Keane 1995 - Models for Internal Market Structure Analysis]]"
used_by:
  - "[[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]]"
  - "[[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]]"
aliases:
  - factor-analytic probit
  - equisimilar probit
  - probit market structure covariance
---

# Elrod and Keane 1995 - Factor-Analytic Probit Model Specification

> [!summary]
> Brand utilities for household $i$ at occasion $t$ are $\tilde u_{it}=\alpha+\tilde\mu_i+\tilde\epsilon_{it}$ with $\tilde\mu_i\sim N(0,\Sigma)$, $\Sigma=LL'+\kappa I$. Brand intercepts are tied to the common factors by $\alpha=Lc$, so a new brand's share is predicted from its factor positions alone. Setting $L=0$ gives the equisimilar probit - the structureless, IIA-like benchmark within the same family.

## Overview

Probit models are random-utility models: consumers buy the brand with the highest utility on each occasion, and unobserved (to the analyst) utility components are normal. Unlike logit, a general covariance for the errors relaxes independence of irrelevant alternatives.

## Main Content

> [!definition] Choice rule (Eq. 1)
> $d_{ijt}=1$ iff $\tilde u_{ijt}=\max\{\tilde u_{i1t},\dots,\tilde u_{iJt}\}$, for household $i$, brand $j\in\{1..J\}$, occasion $t$.
> ^def-fap-choice

> [!definition] Factor-analytic probit (Eqs. 2-5)
> $\tilde u_{it}=\alpha+\tilde\mu_i+\tilde\epsilon_{it}$; $\tilde\epsilon_{it}\sim N(0,\kappa I)$ iid over households and occasions; $\tilde\mu_i\sim N(0,\Sigma)$ with $\Sigma=LL'+\kappa I$, where $L$ is a $J\times M$ lower-triangular loadings matrix on $M$ common factors, and $\kappa>0$ is a scalar unique (brand-specific) variance shared by all brands. The brand intercepts satisfy $\alpha=Lc$ with $c$ an $M$-vector (the "mean importance vector").
> ^def-fap

*Reading.* $\alpha$ is the average utility of each brand; $\tilde\mu_i$ is the household's deviation from the population mean; $\kappa$ equal across brands makes unique variance a property of the product class, so repositioned or new brands inherit it. Equivalently (Eq. 6): $\tilde u_{ijt}=l_j'\tilde w_i+\tilde\eta_{ijt}+\tilde\epsilon_{ijt}$ with $l_j$ brand $j$'s values on the $M$ attributes, $\tilde w_i\sim N(c,I)$ the household's importance weights, and $\tilde\eta_{ijt}$ iid $N(0,\kappa)$ - so the model predicts the share of a new brand once its position on the common factors is specified.

> [!theorem] Identification
> The model (2)-(4) is under-identified: a common positive affine transformation of all $\tilde u_{ijt}$ leaves choice probabilities unchanged. By convention the estimation algorithm fixes the utility of the last brand $J$ at zero mean and unit variance (so $\alpha_J=0$ and the $J$-th row of $L$ is zero, with the remaining variance constraint absorbing the scale). Hence only $J-1$ intercepts and $\kappa$ plus the free elements of $L$ are estimated.
> ^thm-fap-identification

> [!definition] Equisimilar probit - the structureless case (Eq. 8)
> $L=0$, so $\Sigma=\kappa I$: there are no common factors. This is the nearest probit model to **IIA**: knowledge of a consumer's utility for any subset of brands says nothing about the other brands. Only the $J-1$ intercepts and $\kappa$ are estimated. $\kappa\to0$ means no heterogeneity (nobody is loyal to any brand); $\kappa\to\infty$ means every household is absolutely loyal to one brand. It is not a special case of market structure analysis, as brand intercepts cannot be a linear function of factors (this would force equal shares).
> ^def-equisimilar-probit

**Dirichlet-multinomial benchmark (Eq. 7).** The structureless stochastic brand choice model (Bass, Jeuland & Wright 1976) has $E(p_k\mid p_j)/E(p_{k'}\mid p_j)=E(p_k\mid d_{ij})/E(p_{k'}\mid d_{ij})=E(p_k)/E(p_{k'})$: information about a household's purchase of brand $j$ tells nothing about its relative preferences for other brands (IIA in the aggregate and for the individual). Elrod & Winer (1991) found it predicted best among their competing models.

## Examples

> [!example] Substitution under a one-factor probit versus IIA
> **Setup.** $J=4$ brands, one factor with loadings $0.8\times(1,1,-1,-1)$, $\kappa=1$, equal intercepts $\alpha=0$.
> **Solution.** Simulate $u=\mu+\epsilon$ with $\mu\sim N(0,LL'+\kappa I)$; shares are 0.25 each. Remove brand 0 and re-simulate: shares become $(0.394,0.302,0.304)$ for brands 1-3, versus the IIA (logit-style) proportional prediction $(0.333,0.333,0.333)$.
> **Interpretation.** Brand 1, which loads like the removed brand, picks up 39% of the market rather than 33%: market structure appears as asymmetric substitution.
> ^ex-fap-substitution

```python
import numpy as np
rng = np.random.default_rng(0)
J = 4
L = 0.8*np.array([[1.], [1.], [-1.], [-1.]])
Sigma = L @ L.T + 1.0*np.eye(J)
u = rng.multivariate_normal(np.zeros(J), Sigma, size=200_000)
print(np.bincount(u.argmax(1), minlength=J)/len(u))          # [0.25 .. ]
u3 = rng.multivariate_normal(np.zeros(3), Sigma[1:, 1:], size=200_000)
print(np.bincount(u3.argmax(1), minlength=3)/len(u3))         # ~[0.394 0.302 0.304]
```

## Connections

- Probit factor covariance vs nested logit and mixed logit: [[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]], [[Random Coefficients Logit Model]].
- Probit as random utility model: [[Discrete Choice Models]].

## See Also

[[Elrod and Keane 1995 - Simulated Moments and Panel Estimation]]
