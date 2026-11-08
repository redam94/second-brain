---
title: "Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion"
tags:
  - source/ingested
  - topic/population-estimation
  - type/example
  - doc/paper
source: "[[raw/Barker 2018 - On the Reliability of N-Mixture Models for Count Data.pdf]]"
source_location: "Secs. 4, 4.1, 5, pp. 374-376, Eq. 7-10, Table 2, Fig. 3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Barker 2018 - Reliability of N-Mixture Models"
doc_type: paper
depends_on:
  - "[[Barker 2018 - Poisson Alternative and Model Discrimination]]"
used_by:
  - "[[Concept - Marginalising Latent Discrete Counts for HMC]]"
aliases:
  - Poisson regression for relative abundance
  - alder flycatcher N-mixture example
---

# Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion

> [!summary]
> If the goal is relative abundance after controlling for detection covariates, Poisson regression (log link, optionally with site random effects) extracts what N-mixtures reliably deliver. On alder flycatcher data, site-covariate effects agree across N-mixture, Poisson, random-effects Poisson and double-Poisson fits, while baseline abundance and detection are model-dependent.

## Overview

With constant $p$ (or covariate-explained $p$), replicate counts give a minimum variance unbiased estimate $\bar n_i$ of $\mu_i=E[n_{ij}]$ (Gauss-Markov), so relative abundance is reliably estimable. Absolute abundance requires a decomposition $\mu=pN$ that counts alone cannot support.

## Main Content

> [!definition] Poisson count model for relative abundance (Eq. 7-9)
> $n_{ij}\sim\text{Poisson}(\mu_{ij})$ with $\mu_{ij}=pN_i=e^{\alpha_p+\alpha_N+z_i\beta_N}$ ($p<1$ is relaxed: without marking, multiple counting makes $E[n_i]<N_i$ unnecessary). With $t_i=\sum_jn_{ij}$ and $T=\sum_it_i$ the likelihood factorises as
> $$[\{n_{ij}\}\mid\{\mu_{ij}\}]=\underbrace{\prod_i\frac{t_i!}{\prod_jn_{ij}!}\left(\tfrac1J\right)^{t_i}}_{[\{n_{ij}\}\mid\{t_i\}]}\times\underbrace{\frac{T!}{\prod_it_i!}\prod_i\left(\frac{\xi_i}{\sum_h\xi_h}\right)^{t_i}}_{[\{t_i\}\mid T,\beta_N]}\times\underbrace{\frac{e^{-\phi}\phi^T}{T!}}_{[T\mid\phi]},$$
> where $\xi_i=e^{z_i\beta_N}$ and $\phi=Je^{\alpha_p}\sum_iN_i$. The intercepts $\alpha_p$ and $\alpha_N$ are **confounded** in $\phi$. The partial likelihood $[\{t_i\}\mid T,\beta_N]$ gives MLEs of $\beta_N$ (the relative abundances).
^def-poisson-relative-abundance

With visit covariates $w_{ij}$ and coefficients $\beta_p$ the model $\mu_{ij}=e^{\alpha_p+\alpha_N+w_{ij}\beta_p+z_i\beta_N}$ factorises the same way (Eq. 10), with $\xi_i\propto e^{z_i\beta_N}\sum_je^{w_{ij}\beta_p}$: detection covariates $\beta_p$ and relative abundance $\beta_N$ are both estimable; $\alpha_p$ and $\alpha_N$ remain confounded. It is a standard Poisson regression, so deviance goodness-of-fit and random-effect extensions are available (partial pooling for relative abundance rather than as an identification device).

### Alder flycatcher example (Sec. 4.1)
Data: subset of Chandler et al. (2009), $I=50$ sites, $J=3$ visits, visit covariates time $t$ and date $d$, site covariates woody cover $w$ and plant vertical structure $s$ (all standardised).

> [!definition] Models fitted
> - **N-mixture** (R `unmarked`): $n_{ij}\sim\text{Bin}(N_i,p_{ij})$, $N_i\sim\text{Pois}(\nu_i)$, $\text{logit}(p_{ij})=\alpha_p+\beta_1t+\beta_2d$, $\log\nu_i=\alpha_\nu+\gamma_1w+\gamma_2s$.
> - **Poisson regression** (`glm`): $n_{ij}\sim\text{Pois}(p_{ij}\nu_i)$, $\log(p_{ij})=\alpha_p+\beta_1t+\beta_2d$, $\log\nu_i=\alpha_\nu+\gamma_1w+\gamma_2s$, so $\log\mu_{ij}=\alpha+\beta_1t+\beta_2d+\gamma_1w+\gamma_2s$, $\alpha=\alpha_p+\alpha_\nu$.
> - **Random-effects Poisson** (`lme4::glmer`): site intercept $\alpha_i\sim N(\mu_\alpha,\sigma^2_\alpha)$.
> - **Random-effects double Poisson**: $n_{ij}\sim\text{DoublePoisson}(\mu_{ij},\theta_{ij})$, $\log\mu_{ij}=m_{ij}+\varepsilon_i$, with $\log\log\theta_{ij}=m_{ij}$ chosen to mimic the N-mixture's Poisson-like behaviour at small $\mu$ and under-dispersion otherwise; fitted by `integrate` and `optim`.
^def-flycatcher-models

> [!example] Table 2 (reproduced)
> | Model | Log-likelihood | No. parameters | AIC |
> |---|---|---|---|
> | N-mixture | -131.11 | 6 | 274.21 |
> | Poisson regression | -139.57 | 5 | 289.14 |
> | Random-effects Poisson | -139.12 | 6 | 290.24 |
> | Random-effects double Poisson | -130.76 | 6 | 273.52 |
>
> **Interpretation.** AIC differences appear large (double Poisson best, N-mixture 0.7 behind, Poisson models about 15-17 worse), yet Figure 3 shows the site-covariate effects $\gamma_1$ (woody cover) and $\gamma_2$ (plant structure) are similar in all four models: they are relative-abundance effects. The visit coefficients $\beta_1,\beta_2$ and the intercept differ superficially only because the N-mixture uses a logit link for $p$ and the Poisson a log link. Inference on $\alpha_p$ vs $\alpha_\nu$ is very different across models: completely confounded under Poisson, identified under the N-mixture only by the repeated-binomial assumption.
^ex-flycatcher-table2

### Discussion (Sec. 5)
- The appeal (inference without marking) comes with a "critical loss of information" (Sec. 2); alternatives like negative binomial or zero-inflated Poisson for $N_i$ have analogous non-identifiable counterparts (binomial/negative-binomial example in the supplement).
- "The problem is not an inability to fit the N-mixture model, but rather an inability of the data to discriminate among models that have vastly different implications for inference about $N$."
- Only by assuming the alternatives do not hold and that $p$ is constant or fully covariate-explained can $N$ be inferred; with sparse data little residual information remains to check.
- Misconception: that alternatives cannot model abundance and detectability covariates simultaneously. Random-effect Poisson models can (Link and Sauer 1997), as the partition of Eq. 10 shows. Using the *same* covariate for abundance and detection in N-mixtures depends entirely on the binomial structure.
- **Message**: counts under imperfect detection can reliably serve only as indices. If absolute abundance is needed, spend effort on additional data such as recaptures of marked animals.

## Examples

> [!example] Relevance to marketing measurement
> Observed conversions in a channel factor as exposure-opportunity times response rate. With only aggregate counts, the product is identified and its pieces are not, unless a separate source (a lift test, geo experiment, or user-level panel) anchors one factor. This mirrors the "relative abundance only" conclusion and the case for combining experiments with observational data. An analogy; not a claim of the paper.

```python
# Relative-abundance Poisson regression (statsmodels), counts n[i,j], site covariate z[i]
import numpy as np, statsmodels.api as sm
rng = np.random.default_rng(3)
I, J = 50, 3
z = rng.normal(size=I); N = rng.poisson(np.exp(2+0.5*z)); n = rng.binomial(N[:, None], 0.3, (I, J))
X = sm.add_constant(np.repeat(z, J)); y = n.ravel()
print(sm.GLM(y, X, family=sm.families.Poisson()).fit().params)  # slope ~0.5 recovered; intercept = alpha_N + alpha_p
```

## Connections

- Random-effect Poisson = partial pooling: [[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]].
- Dispersion beyond Poisson: [[Monsters and Mixtures]]. GLM background: [[Generalized Linear Models]].
- PyMC N-mixture sketch with marginalisation: [[Concept - Marginalising Latent Discrete Counts for HMC]].

## See Also

- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
- [[Concept - Closed-Population Capture-Recapture and Otis Models]]
