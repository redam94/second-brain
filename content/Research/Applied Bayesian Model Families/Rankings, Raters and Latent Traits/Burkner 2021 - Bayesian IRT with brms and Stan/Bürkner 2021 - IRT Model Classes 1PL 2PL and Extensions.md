---
title: "Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions"
tags:
  - source/ingested
  - topic/latent-traits
  - type/definition
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 2.2, pp. 6-7; Sec. 5.1 (3PL), pp. 33-35"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - Response Families and Distributional IRT]]"
used_by:
  - "[[Bürkner 2021 - Priors Hierarchical Pooling and Identification]]"
  - "[[Item Response Theory Norms and You Are Here Placement (Concept Note)]]"
aliases:
  - Rasch model
  - 1PL 2PL 3PL
  - item response theory binary models
---

# Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions

> [!summary]
> The Rasch (1PL), 2PL and 3PL models are the same logistic model with progressively more item-level parameters: easiness only; plus discrimination $\alpha_i$; plus guessing $\gamma_i$. Discrimination makes the predictor non-linear (a product of parameters), which brms handles through non-linear formulas.

## Overview

Notation: person $p$ with ability $\theta_p$; item $i$ with easiness $\xi_i$ (brms convention; classical difficulty is $-\xi_i$), discrimination $\alpha_i$ and guessing $\gamma_i$. The distributional parameter is $\psi_n=f(\theta_{p_n},\xi_{i_n})$.

## Main Content

> [!definition] Rasch / 1PL
> $\psi=\text{logistic}(\theta_p+\xi_i)=\dfrac{\exp(\theta_p+\xi_i)}{1+\exp(\theta_p+\xi_i)}$. Higher $\theta_p$ raises success probability on every item; higher $\xi_i$ raises it for every person. Equal discriminations weight all items equally, so persons with the same total score get the same estimate.
> ^def-rasch-1pl

> [!definition] 2PL
> $\psi=\text{logistic}\bigl(\alpha_i(\theta_p+\xi_i)\bigr)=\text{logistic}(\alpha_i\theta_p+\alpha_i\xi_i)$. The argument is a product of parameters, so no longer a linear predictor (a generalized non-linear mixed model).
> ^def-2pl

> [!definition] 3PL
> $\psi=\gamma_i+(1-\gamma_i)\,g\bigl(\alpha_i(\theta_p+\xi_i)\bigr)$ with $g$ a link inverse such as the logistic; $\gamma_i$ is the probability of a correct answer from guessing (e.g. 0.25 for four options). A 4PL adds an upper lapse bound.
> ^def-3pl

> [!theorem] Scale non-identifiability of the 2PL
> The 2PL likelihood is unchanged under $\theta_p\to c\theta_p$, $\xi_i\to c\xi_i$, $\alpha_i\to\alpha_i/c$. Hence the person standard deviation must be fixed (usually $\sigma_\theta=1$), otherwise the scale of the person distribution is absorbed by the discriminations. A sign switch of $\alpha_i$ with sign switch of $\theta_p+\xi_i$ is also a symmetry; impose $\alpha_i>0$ by modelling $\log\alpha_i$.
> ^thm-2pl-identification

*Proof.* $\alpha_i(\theta_p+\xi_i)=(\alpha_i/c)(c\theta_p+c\xi_i)$; the likelihood depends only on this product. (Checked numerically below.)

## Examples

> [!example] Likelihood invariance in a simulated 2PL
> **Setup.** 200 persons, 20 items, $\theta\sim N(0,1)$, $\xi\sim N(0,1)$, $\log\alpha\sim N(0.2,0.2^2)$; responses simulated from the 2PL.
> **Solution.** Log-likelihood at the truth is $-2015.48$; rescaling with $c=2$ ($2\theta$, $2\xi$, $\alpha/2$) gives exactly the same value.
> **Interpretation.** The data cannot distinguish scale; choose $\sigma_\theta=1$ (or an informative prior). A 3PL with $\gamma=0.25$ gives $P(y=1)\approx0.2519$ at ability $-5$.
> ^ex-2pl-scale

```python
import numpy as np
rng = np.random.default_rng(0)
P, I = 200, 20
theta = rng.normal(0, 1, P); xi = rng.normal(0, 1, I); alpha = np.exp(rng.normal(0.2, 0.2, I))
y = rng.binomial(1, 1/(1+np.exp(-alpha[None, :]*(theta[:, None]+xi[None, :]))))
def ll(theta, xi, alpha):
    q = 1/(1+np.exp(-alpha[None, :]*(theta[:, None]+xi[None, :])))
    return (y*np.log(q)+(1-y)*np.log(1-q)).sum()
print(ll(theta, xi, alpha), ll(2*theta, 2*xi, alpha/2))   # identical
```

PyMC-style 2PL sketch (untested; the E116 model is of this form with marginalisation over $\theta$):

```python
with pm.Model():
    sd_xi = pm.HalfNormal("sd_xi", 3)
    xi = pm.Normal("xi", 0, sd_xi, shape=I)               # item easiness
    log_alpha = pm.Normal("log_alpha", 0, 1, shape=I)     # discrimination > 0
    theta = pm.Normal("theta", 0, 1, shape=P)             # sd fixed to 1: identification
    eta = pm.math.exp(log_alpha[item]) * (theta[person] + xi[item])
    pm.Bernoulli("y", logit_p=eta, observed=y)
```

## Connections

- Equivalent to a one-factor model for binary indicators ([[Confirmatory Factor Analysis and SEM]], [[Factor Analysis and PPCA]]).
- Rasch is the logit-linear "ability minus difficulty" structure also used in annotation models ([[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]]) and in Bradley-Terry ([[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]: BT is a Rasch model where "items" are opponents).

## See Also

[[Bürkner 2021 - Priors Hierarchical Pooling and Identification]] · [[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]
