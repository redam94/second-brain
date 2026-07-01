---
title: "Social Network Models"
tags:
  - source/ingested
  - topic/social-networks
  - topic/dyadic-data
  - source/statistical-rethinking
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - Social Networks SR
  - Dyadic Models
date_ingested: 2026-04-09
doc_type: concept
source: "[[raw/Social Networks]]"
source_location: "raw/Social Networks"
depends_on:
  - "[[Copula Estimation]]"
  - "[[Hierarchical Linear Models]]"
  - "[[Spatial Models - BYM]]"
  - "[[Generalized Linear Models]]"
used_by:
  - "[[Missing Data - Statistical Rethinking]]"
---

# Social Network Models

> [!abstract] Summary
> Social network analysis in the Statistical Rethinking framework models **dyadic relationships** between individuals as latent generalized social states. The model captures within-dyad reciprocity and between-dyad variation, enabling inference about sharing behaviour and social structure.

## The Problem of Dyadic Data

In social networks, observations come in **dyads** (pairs of individuals). Key structure:

- $y_{AB}$: what A does to/for B (e.g., food shared by A with B)
- $y_{BA}$: what B does to/for A
- These are **not independent**: reciprocity means $y_{AB}$ and $y_{BA}$ are correlated

Standard regression ignores this dyadic dependence. Social network models treat it explicitly.

## Generalized Giving Model (Statistical Rethinking, Lecture 15)

Based on McElreath's Koster & Leckie-style household food sharing model:

$$y_{AB} \sim \text{Poisson}(\lambda_{AB})$$
$$\log \lambda_{AB} = \alpha + \underbrace{g_{AB}}_{\text{giving: A→B}} + \underbrace{r_A}_{\text{A's general giving}} + \underbrace{r_B}_{\text{B's general receiving}}$$

Where the key latent structure is the **dyadic** giving term $g_{AB}$:

$$\begin{pmatrix} g_{AB} \\ g_{BA} \end{pmatrix} \sim \text{MVN}\!\left(\mathbf{0},\ \begin{pmatrix} \sigma^2 & \rho\sigma^2 \\ \rho\sigma^2 & \sigma^2 \end{pmatrix}\right)$$

- $\rho$: **reciprocity** — how strongly giving in one direction predicts giving in return
- $\sigma^2$: variance of dyadic effects (heterogeneity in relationship strength)
- $r_A$, $r_B$: **generalised giving/receiving** rates for each individual (not dyad-specific)

> [!tip] Key insight
> By estimating $\rho$, we can quantify whether relationships are reciprocal (positive $\rho$) or one-directional (zero/negative $\rho$). This cannot be done with standard regression.

## Network as a Latent Variable

The dyadic effects $g_{AB}$ can be visualised as a weighted network — edges between each pair of individuals with weights proportional to the posterior mean of $g_{AB}$. This gives:

- **Posterior uncertainty** over network structure
- Natural interpretation: the network is a latent variable inferred from observed behaviour, not directly measured

## PyMC Sketch

```python
with pm.Model() as network_model:
    # Reciprocity correlation matrix for each dyad
    rho = pm.Beta("rho", 2, 2)
    sigma_g = pm.Exponential("sigma_g", 1)
    cov_dyad = sigma_g**2 * pm.math.stack([[1, rho], [rho, 1]])

    # Generalised giving/receiving per individual
    r = pm.Normal("r", 0, 1, shape=(N_individuals, 2))  # [giving, receiving]

    # Dyadic effects for each (i, j) pair
    G = pm.MvNormal("G", mu=0, cov=cov_dyad, shape=(N_dyads, 2))

    # Likelihood
    log_lambda = alpha + G[dyad_idx, direction] + r[sender_idx, 0] + r[receiver_idx, 1]
    pm.Poisson("y", mu=pm.math.exp(log_lambda), observed=y)
```

## Connections

- Dyadic correlation: related to [[Copula Estimation]] (modelling joint distributions with correlation structure)
- [[Hierarchical Linear Models]] — individuals as random effects; dyads as nested structure
- [[Spatial Models - BYM]] — also uses graph structure to model dependence between units
- Statistical Rethinking lectures: [[Missing Data - Statistical Rethinking|Lecture 18 (Missing Data)]] is from the same series

## Source

- [[raw/Social Networks]] — PyMC port of Statistical Rethinking 2023, Lecture 15 (McElreath)
- Video: [Lecture 15 — Social Networks](https://youtu.be/L_QumFUv7C8)
