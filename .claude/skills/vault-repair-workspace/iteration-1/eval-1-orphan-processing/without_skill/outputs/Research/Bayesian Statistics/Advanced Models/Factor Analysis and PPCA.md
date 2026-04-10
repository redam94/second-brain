---
title: "Factor Analysis and Probabilistic PCA"
source: "https://www.pymc.io/projects/examples/en/latest/case_studies/factor_analysis.html"
tags:
  - source/ingested
  - topic/bayesian
  - topic/dimensionality-reduction
  - method/factor-analysis
  - method/ppca
aliases:
  - Factor Analysis
  - Probabilistic PCA
  - PPCA
date_ingested: 2026-04-09
raw: "[[raw/Factor analysis]]"
folder: "Bayesian Statistics/Advanced Models"
---

# Factor Analysis and Probabilistic PCA (PPCA)

> [!abstract] Summary
> Factor analysis (FA) is a probabilistic model for identifying low-rank structure in multivariate data via latent variables. It is a **linear Gaussian model**: observed data $X$ are modelled as a noisy linear transformation of latent factors $F$. Probabilistic PCA (PPCA) is a special case with isotropic noise. Naive implementations suffer from non-identifiability; the constrained parametrisation (lower-triangular $W$) and amortized inference (marginalizing $F$) are the two key remedies.

## Model Formulation

$$X_{(d,n)} \mid W_{(d,k)}, F_{(k,n)} \sim \mathcal{N}(WF, \Psi)$$

where:
- $d$ = number of observed dimensions, $n$ = number of observations, $k$ = number of latent factors ($k \ll d$)
- $W$ = loading matrix (relates latent factors to observations)
- $F$ = factor scores (latent representation)
- $\Psi$ = diagonal noise covariance (FA); $\Psi = \sigma^2 I$ for PPCA

The fundamental assumption is that $WW^\top$ is **low rank**: most variance in $X$ is captured by a small number of latent directions.

## Relation to PCA

| Model | Prior on $F$ | Noise $\Psi$ |
|-------|-------------|--------------|
| PCA (standard) | Deterministic | -- |
| PPCA | $\mathcal{N}(0, I)$ | $\sigma^2 I$ (isotropic) |
| Factor Analysis | $\mathcal{N}(0, I)$ | $\text{diag}(\psi_1,\ldots,\psi_d)$ |

See also: [Ghahramani & Roweis model diagram](https://www.cs.ubc.ca/~murphyk/Bayes/Figures/gmka.gif).

## The Identifiability Problem

The naive model is **non-identified**: only the product $WF$ enters the likelihood, so $P(X \mid W, F) = P(X \mid W\Omega, \Omega^{-1}F)$ for any invertible $\Omega$. This causes factors and loadings to rotate, reflect, and permute freely between MCMC chains, producing:
- Inconsistent chain means (multi-modal posterior)
- Heavy autocorrelation in traceplots

> [!warning] Symptom
> If $\hat{R} > 1.01$ and ESS is very low for $W$ entries, the model is not identified.

See [[Identifiability in Latent Variable Models]] for the general problem and the constrained parametrisation fix.

## Constrained Parametrisation (Fix)

Restrict $W$ to be:
1. **Lower triangular** -- eliminates rotational freedom
2. **Positive, increasing diagonal entries** -- eliminates sign and permutation ambiguity (use cumulative sum of half-normal draws)

```python
def makeW(d, k, dim_names):
    n_od = int(k * d - k * (k - 1) / 2 - k)
    z = pm.HalfNormal("W_z", 1.0, dims="latent_columns")          # positive diag
    b = pm.Normal("W_b", 0.0, 1.0, shape=(n_od,), dims="packed_dim")  # off-diagonal
    L = expand_packed_block_triangular(d, k, b, pt.ones(k))
    W = pm.Deterministic("W", L @ pt.diag(pt.extra_ops.cumsum(z)), dims=dim_names)
    return W
```

With this parametrisation, chains agree on posterior means and $\hat{R}$ improves substantially.

## Amortized Inference (Marginalizing Out $F$)

Explicitly sampling the $k \times n$ matrix $F$ is expensive for large $n$ and prevents minibatch streaming. Instead, integrate $F$ out analytically:

$$X \mid W \sim \mathcal{N}(0,\ WW^\top + \sigma^2 I)$$

This reduces the parameter space to $W$ and $\sigma$ only. See [[Amortized Inference]] for details on the technique and its tradeoffs.

Benefits:
- Faster per-iteration computation (fewer parameters)
- Minibatch ADVI via `pm.Minibatch` + `pm.fit(method="fullrank_advi")`

```python
with pm.Model(coords=coords) as PPCA_amortized:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y.T, dims=("rows", "observed_columns"))
```

## Post-hoc Recovery of Factor Scores $F$

After fitting the amortized model, recover individual factor scores using the conjugate posterior. See [[Post-hoc Factor Score Recovery]] for derivation and implementation.

$$F \mid X, W \sim \mathcal{N}(\mu_F, \Sigma_F)$$

$$\mu_F = \left(I + \sigma^{-2}W^\top W\right)^{-1} \sigma^{-2} W^\top X$$

$$\Sigma_F = \left(I + \sigma^{-2}W^\top W\right)^{-1}$$

## Reconstruction Quality

Model quality can be assessed by comparing the reconstruction $\hat{X} = WF$ against the original data. A scatter plot of observed vs. reconstructed values with $R^2$ from linear regression provides a quick diagnostic. In the tutorial, even $k=2$ latent factors (vs. the true $k=4$) yields a decent reconstruction.

## Scalability Summary

| Approach | Fits large $n$? | Minibatch? | Notes |
|----------|----------------|------------|-------|
| Explicit $F$ (MCMC) | No -- $k \times n$ params | No | Simplest but slow |
| Amortized (MCMC) | Moderate | No | Covariance inversion bottleneck |
| Amortized (ADVI) | Yes | Yes | FullRankADVI + Minibatch |

## See Also

- [[Identifiability in Latent Variable Models]] -- The general identifiability problem and constrained parametrisation
- [[Amortized Inference]] -- Marginalizing latent variables for scalability
- [[Post-hoc Factor Score Recovery]] -- Recovering factor scores after amortized fitting
- [[Nonparametric Models Overview]] -- Gaussian processes as infinite-dimensional factor models
- [[Generalized Linear Models]] -- Linear Gaussian models in the GLM framework
- [[Approximation Methods]] -- ADVI and variational inference methods used here
- [[Confirmatory Factor Analysis and SEM]] -- CFA and SEM for psychometric latent variable models
- [[raw/Factor analysis]] -- Full PyMC tutorial with code and plots
