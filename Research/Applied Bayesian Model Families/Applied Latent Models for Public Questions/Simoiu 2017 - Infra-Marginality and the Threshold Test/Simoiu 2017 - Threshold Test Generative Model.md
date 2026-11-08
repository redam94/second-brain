---
title: "Simoiu 2017 - Threshold Test Generative Model"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/definition
  - doc/paper
source: "[[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]"
source_location: "Sec. 2.3, pp. 4-8; Eqs. 1-3; Figure 2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test"
doc_type: paper
depends_on:
  - "[[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]]"
used_by:
  - "[[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]]"
  - "[[Simoiu 2017 - Model Checks Robustness and Placebo Tests]]"
  - "[[Simoiu 2017 - Limitations Extensions and Identification Ridge]]"
  - "[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]"
aliases:
  - "threshold test model"
  - "latent threshold signal detection model"
  - "hierarchical threshold model"
---

# Simoiu 2017 - Threshold Test Generative Model

> [!summary]
> Each stop of a race-$r$ driver by department $d$ draws a signal $p\sim\text{Beta}(\phi_{rd},\lambda_{rd})$, a search occurs iff $p\ge t_{rd}$, and a hit occurs with probability $p$. Search and hit counts are binomial with probabilities $p_{rd}=1-I_{t_{rd}}(\phi_{rd},\lambda_{rd})$ and $q_{rd}=\phi_{rd}\,(1-I_{t_{rd}}(\mu_{rd},\lambda_{rd}+1))/(1-I_{t_{rd}}(\phi_{rd},\lambda_{rd}))$. Identification comes from additive race and department structure on $\phi,\lambda$ plus hierarchical priors on thresholds.

## Overview

Observed per stop: race $r_i$, department $d_i$, search $S_i\in\{0,1\}$, hit $H_i\le S_i$. Goal: race-specific thresholds per department. Bayesian benefits: uncertainty without bootstrapping, and pooling across departments for rarely stopped groups.

## Main Content

> [!definition] Generative process (Sec. 2.3)
> Signal: $p_i\sim\text{Beta}(\phi_{r_id_i},\lambda_{r_id_i})$ with **mean** $\phi\in(0,1)$ and **total count** $\lambda>0$ (i.e. $\alpha=\phi\lambda$, $\beta=(1-\phi)\lambda$). Search: $S_i=1$ iff $p_i\ge t_{r_id_i}$. Hit: $H_i\sim\text{Bernoulli}(p_i)$ if $S_i=1$, else $H_i=0$. Structure (Eqs. 1-2): $\phi_{rd}=\text{logit}^{-1}(\phi_r+\phi_d)$, $\lambda_{rd}=\exp(\lambda_r+\lambda_d)$, with $\phi_d=\lambda_d=0$ for the largest department. This gives $2(D+R-1)$ parameters for $DR$ signal distributions.
^def-generative

> [!definition] Priors
> $\phi_r,\lambda_r\sim N(0,2)$; $\phi_d\sim N(\mu_\phi,\sigma_\phi)$, $\mu_\phi\sim N(0,2)$, $\sigma_\phi\sim N^+(0,2)$; $\lambda_d$ likewise; thresholds $t_{rd}\sim\text{logit}^{-1}(N(\mu_{t_r},\sigma_{t_r}))$ with $\mu_{t_r}\sim N(0,2)$, $\sigma_{t_r}\sim N^+(0,2)$ per race. $N^+$ is half-normal. Two SDs of $N(0,2)$ on $\phi_r$ span roughly a 2%-98% chance of contraband; the same range holds for thresholds; $\lambda$ can differ across departments by a factor of about 50. Results hold with $N(0,4)$ priors (slower).
^def-priors

> [!theorem] Sufficient statistics and exact likelihood (Eq. 3)
> Aggregate $S_{rd}=\sum_{i\in T_{rd}}S_i$, $H_{rd}=\sum_{i\in T_{rd}}H_i$, with $n_{rd}$ stops fixed. Then
> $$S_{rd}\sim\text{Bin}(n_{rd},p_{rd}),\ p_{rd}=1-I_{t_{rd}}(\phi_{rd},\lambda_{rd});\qquad H_{rd}\sim\text{Bin}(S_{rd},q_{rd}),\ q_{rd}=\mathbb E[p\mid p\ge t_{rd}]=\phi_{rd}\,\frac{1-I_{t_{rd}}(\mu_{rd},\lambda_{rd}+1)}{1-I_{t_{rd}}(\phi_{rd},\lambda_{rd})},$$
> with $I_x(\phi,\lambda)$ the beta CDF in mean/count parametrisation and $\mu_{rd}=(\phi_{rd}\lambda_{rd}+1)/(\lambda_{rd}+1)$. The likelihood thus has $2DR$ binomial terms, independent of the number of stops.
>
> *Proof.* $\mathbb E[p\mid p\ge t]=\frac{1}{1-F(t)}\int_t^1 p\,f(p)\,dp$, and $p\,\text{Beta}(p;\alpha,\beta)=\frac{\alpha}{\alpha+\beta}\text{Beta}(p;\alpha+1,\beta)$, giving $\phi\,(1-F(t;\alpha+1,\beta))/(1-F(t;\alpha,\beta))$, whose first argument pair in mean/count form is $(\mu,\lambda+1)$. $\square$
^thm-likelihood

> [!theorem] Parameter counting (why the model is identified)
> Per race-department pair there are three unknowns $(t,\phi,\lambda)$ but only two observed rates (search, hit), so $3DR$ unknowns face $2DR$ data. The additive structure reduces the total to $2(D+R-1)+DR$, which is $<2DR$ when $R\ge3$ and $D\ge5$. Hierarchical priors add regularisation. (Identification is by structure plus priors, not by data alone; see [[Simoiu 2017 - Limitations Extensions and Identification Ridge]].)
^thm-counting

## Examples

> [!example] Checking Eq. 3 numerically
> With $\phi=0.3,\ \lambda=25,\ t=0.2$ the formula gives $q=0.320578$; direct conditional expectation of a $\text{Beta}(7.5,17.5)$ above 0.2 gives $0.320578$ as well. Interpretation: the closed form is exact, so no simulation of individual stops is needed.
^ex-eq3
```python
from scipy import stats
phi, lam, t = 0.3, 25, 0.2
a, b = phi*lam, (1-phi)*lam
q = phi * (1 - stats.beta(a+1, b).cdf(t)) / (1 - stats.beta(a, b).cdf(t))
```

**PyMC-style sketch (untested).**
```python
with pm.Model():
    phi_r = pm.Normal("phi_r", 0, 2, shape=R); lam_r = pm.Normal("lam_r", 0, 2, shape=R)
    mu_t = pm.Normal("mu_t", 0, 2, shape=R); sd_t = pm.HalfNormal("sd_t", 2, shape=R)
    t = pm.math.invlogit(pm.Normal("t_raw", mu_t[:,None], sd_t[:,None], shape=(R, D)))
    phi = pm.math.invlogit(phi_r[:,None] + phi_d[None,:]); lam = pm.math.exp(lam_r[:,None] + lam_d[None,:])
    # beta CDF via pt.betainc(a, b, x): p = 1 - betainc(phi*lam, (1-phi)*lam, t)
    pm.Binomial("S", n, p, observed=S); pm.Binomial("H", S, q, observed=H)
```

## Connections
[[Hierarchical Models]] (shrinkage of $t_{rd}$ toward race means), [[Efficient MCMC]] (the paper samples with Stan NUTS, 5 chains of 2,500 warm-up + 2,500 draws, $\hat R<1.05$), a related fast variant by Pierson et al. (2017) is cited.

## See Also
[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
