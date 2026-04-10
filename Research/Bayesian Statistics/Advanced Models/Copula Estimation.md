---
title: "Bayesian Copula Estimation"
tags:
  - source/ingested
  - topic/multivariate
  - topic/joint-distributions
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - Gaussian Copula
  - Joint Distribution Modelling
date_ingested: 2026-04-09
source: "[[raw/Bayesian copula estimation Describing correlated joint distributions]]"
doc_type: concept
source_location: "PyMC tutorial — full article"
depends_on:
  - "[[Nonparametric Models Overview]]"
  - "[[Factor Analysis and PPCA]]"
  - "[[Hierarchical Linear Models]]"
used_by:
  - "[[Social Network Models]]"
---

# Bayesian Copula Estimation

> [!abstract] Summary
> Copulas separate the correlation structure of a joint distribution from its marginal distributions. A Gaussian copula models the dependence through a multivariate normal in a latent space, with arbitrary marginals in observation space. Bayesian estimation fits both the marginals and the covariance parameter.

## The Problem

When modelling $P(a, b)$ for real data, the joint distribution often has:
- Non-Gaussian marginals (exponential, log-normal, skewed, etc.)
- Complex correlation structure incompatible with a simple multivariate normal

**Simple alternatives that fail:**
- Independence: $P(a,b) = P(a)P(b)$ — ignores dependence
- Multivariate Normal directly — forces Gaussian marginals

## Sklar's Theorem (Copula)

Any joint distribution $P(a, b)$ can be decomposed as:

$$P(a, b) = C(F_a(a),\ F_b(b))$$

where $C$ is the **copula** (a joint distribution on $[0,1]^2$) and $F_a, F_b$ are the marginal CDFs. The **Gaussian copula** uses a bivariate normal as $C$.

## Three-Space Schematic

```
Multivariate Normal Space    →    Uniform Space    →    Observation Space
   (a_norm, b_norm) ~ MVN        (a_unif, b_unif)        (a, b)
   Cov = [[1, ρ],[ρ, 1]]         = Φ(a_norm), Φ(b_norm)   = F_a⁻¹(a_unif)
                                                              F_b⁻¹(b_unif)
```

**Inference** runs the process in reverse:
1. Apply marginal CDFs to move $(a,b)$ → uniform space
2. Apply $\Phi^{-1}$ (probit) to move uniform → multivariate normal space
3. Fit a MVN to learn $\rho$

## Two-Stage Estimation in PyMC

Simultaneous estimation of marginals + copula parameter is unstable. The robust approach:

### Stage 1: Fit Marginals

```python
with pm.Model() as marginal_model:
    a_mu    = pm.Normal("a_mu", 0, 1)
    a_sigma = pm.Exponential("a_sigma", 0.5)
    pm.Normal("a", mu=a_mu, sigma=a_sigma, observed=a)

    b_scale = pm.Exponential("b_scale", 0.5)
    pm.Exponential("b", lam=1/b_scale, observed=b)

    marginal_idata = pm.sample()
```

### Stage 2: Transform Data and Fit Copula

```python
# Transform: observation → uniform → MVN space (using point estimates from stage 1)
a_unif = pm.logcdf(pm.Normal.dist(mu=a_mu_hat, sigma=a_sigma_hat), a)
a_norm = pm.math.probit(pt.exp(a_unif))

with pm.Model() as copula_model:
    chol, corr, stds = pm.LKJCholeskyCov("chol", n=2, eta=2.0,
                                          sd_dist=pm.Exponential.dist(1.0),
                                          compute_corr=True)
    cov = pm.Deterministic("cov", chol @ chol.T)
    pm.MvNormal("N", mu=0.0, cov=cov, observed=data)  # data in MVN space
```

> [!note] LKJCholeskyCov
> The LKJ distribution is the standard prior for correlation matrices in PyMC. `eta=2.0` gives a weakly informative prior that mildly favours lower correlations.

## Limitations

- The two-stage approach uses **point estimates** for marginal parameters (not the full posterior), introducing approximation error
- Assumes the correlation structure is fully captured by the MVN copula (no tail dependence beyond Gaussian)
- Identifiability: marginal location/scale parameters should be fit separately from the copula

## Connections

- Uses [[Nonparametric Models Overview|multivariate Bayesian models]] for joint distributions
- Related to [[Factor Analysis and PPCA]] (latent linear projection of multivariate data)
- LKJCholeskyCov is also used in [[Hierarchical Linear Models]] for correlation among random effects

## Source

- [[raw/Bayesian copula estimation Describing correlated joint distributions]] — PyMC example: Gaussian copula with Normal × Exponential marginals, Gates Foundation project
