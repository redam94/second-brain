---
title: "Spatial Models — Besag-York-Mollie (BYM)"
tags:
  - source/ingested
  - topic/spatial-statistics
  - topic/areal-data
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - BYM
  - BYM2
  - ICAR
  - Intrinsic Conditional Autoregressive
source: "[[raw/The Besag-York-Mollie Model for Spatial Data]]"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Advanced Models"
doc_type: concept
source_location: "raw/The Besag-York-Mollie Model for Spatial Data"
depends_on:
  - "[[Nonparametric Models Overview]]"
  - "[[Hierarchical Linear Models]]"
  - "[[Generalized Linear Models]]"
  - "[[Hilbert Space Gaussian Processes]]"
used_by:
  - "[[Social Network Models]]"
---

# Spatial Models — Besag-York-Mollie (BYM)

> [!abstract] Summary
> The BYM model is the standard Bayesian approach for **areal spatial data** (counties, census tracts, etc.). It decomposes spatial variation into a structured component (ICAR prior, capturing spatial autocorrelation) and an unstructured component (i.i.d. random effects), with a mixture parameter $\rho$ controlling the balance.

## When to Use BYM

- **Data type**: Areal (discrete spatial units with neighbourhood structure), not point-referenced data
- **Goal**: Partition variance into spatially-structured vs. unstructured components; estimate predictor effects after accounting for spatial autocorrelation
- **Scale**: Computationally efficient — cost grows nearly *linearly* in number of areas (unlike full [[Nonparametric Models Overview|Gaussian Process]])
- For continuous spatial data, use a [[Hilbert Space Gaussian Processes|Gaussian Process]] instead

## The ICAR Prior

**Intrinsic Conditional Autoregressive (ICAR)** is the engine of BYM. Given adjacency matrix $W$ (1 if areas share a border, 0 otherwise), ICAR encodes:

$$
f(\phi \mid W) \propto \exp\!\left(-\frac{1}{2} \sum_{i \sim j}(\phi_i - \phi_j)^2\right)
$$

Key properties:
- Penalises differences between **neighbouring** areas (Tobler's first law of geography: nearby things are more similar)
- $\phi$ is constrained to sum to zero (zero-mean)
- Improper prior — must be embedded in a larger model with identifiable parameters
- In PyMC: `pm.ICAR("phi", W=W)`

### Graph Theory Vocabulary

| Term | Spatial Meaning |
|------|----------------|
| Node | An area (census tract, county) |
| Edge | Shared border between two areas |
| Adjacency matrix $W$ | $W_{ij}=1$ if areas $i,j$ share a border |
| Edge list | Equivalent compact representation of $W$ |

## The BYM2 Parameterisation

The modern BYM formulation (Riebler et al., 2016) uses a **scaled, identified mixture**:

$$
\text{BYM component} = \beta + \sigma\!\left(\sqrt{1-\rho}\;\theta + \sqrt{\rho/s}\;\phi\right)
$$

| Parameter | Meaning |
|-----------|---------|
| $\beta$ | Intercept (re-centres the mixture) |
| $\sigma$ | Joint scale of random effects |
| $\rho \in [0,1]$ | Fraction of variance that is spatially structured |
| $\theta \sim N(0,1)$ | Unstructured random effects |
| $\phi$ | ICAR spatial effects (standardised by scaling factor $s$) |
| $s$ | Scaling factor (computed from $W$) |

> [!info] The scaling factor $s$
> $s$ is the geometric mean of the diagonal of the pseudo-inverse of the graph Laplacian $Q = D - W$. It normalises $\phi$ so that $\text{Var}(\phi) \approx 1$, making $\phi$ and $\theta$ directly comparable and $\sigma$ interpretable as a joint scale.
>
> **Intuition**: Densely connected graphs (every area adjacent to every other) imply little variance — the scaling factor corrects for this so $\rho$ can be interpreted consistently across different graph structures.

## PyMC Model (NYC Traffic Accidents)

```python
with pm.Model(coords=coords) as BYM_model:
    beta0   = pm.Normal("beta0", 0, 1)            # intercept
    beta1   = pm.Normal("beta1", 0, 1)            # fragmentation effect
    theta   = pm.Normal("theta", 0, 1, dims="area_idx")  # unstructured RE
    phi     = pm.ICAR("phi", W=W_nyc, dims="area_idx")  # structured RE
    sigma   = pm.HalfNormal("sigma", 1)
    rho     = pm.Beta("rho", 0.5, 0.5)

    mixture = pt.sqrt(1 - rho) * theta + pt.sqrt(rho / scaling_factor) * phi
    mu = pt.exp(log_E + beta0 + beta1 * fragment_index + sigma * mixture)
    y_i = pm.Poisson("y_i", mu, observed=y)
```

- **Offset** `log_E`: log-population, makes `mu` an *excess risk rate* (not raw count)
- **Poisson likelihood**: appropriate for count outcomes (traffic accidents, disease cases)

## Variance Decomposition

After fitting, visualise each component separately:

| Visualisation | Set | Interpretation |
|---------------|-----|----------------|
| Spatial smoothing | $\rho=1$, $\beta_1=0$ | What spatial structure alone explains |
| Predictor effect | $\sigma=0$ | What fragmentation index alone explains |
| Unstructured residuals | $\rho=0$, $\beta_1=0$ | Remaining unstructured noise |

Spatial smoothing is useful for **forecasting**: low-accident tracts surrounded by high-accident neighbourhoods will likely regress toward their neighbours in the future (partial pooling in space).

## Connections

- ICAR relates to the [[Hilbert Space Gaussian Processes|HSGP]] (graph Laplacian eigenfunctions ~ Laplace operator eigenfunctions)
- Random effects structure: compare [[Hierarchical Linear Models]] (pooling across groups)
- Poisson GLM: see [[Generalized Linear Models]]

## See Also

- [[Hilbert Space Gaussian Processes]] — HSGP for continuous spatial/temporal data; BYM is the areal-data counterpart
- [[Hierarchical Linear Models]] — BYM's spatial random effects are a structured form of hierarchical pooling
- [[Generalized Linear Models]] — Poisson GLM that the BYM model wraps
- [[Nonparametric Models Overview]] — broader context of non-parametric Bayesian approaches to which BYM belongs
- [[Social Network Models]] — a related graph-structured model where nodes are agents rather than areas

## Source

- [[raw/The Besag-York-Mollie Model for Spatial Data]] — PyMC example by Daniel Saunders (2023); NYC pedestrian accident data
- Riebler et al. (2016): "An intuitive Bayesian spatial model for disease mapping that accounts for scaling"
- Stan case study: [ICAR and BYM2](https://mc-stan.org/users/documentation/case-studies/icar_stan.html)
