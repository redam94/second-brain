---
title: "Barker 2018 - N-Mixture Model and the Capture-Recapture View"
tags:
  - source/ingested
  - topic/population-estimation
  - type/definition
  - doc/paper
source: "[[raw/Barker 2018 - On the Reliability of N-Mixture Models for Count Data.pdf]]"
source_location: "Secs. 1.1, 2, 2.1, pp. 369-371, Eq. 1-2 and 5, Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Barker 2018 - Reliability of N-Mixture Models"
doc_type: paper
depends_on:
  - "[[Barker 2018 - Reliability of N-Mixture Models - Overview]]"
used_by:
  - "[[Barker 2018 - Poisson Alternative and Model Discrimination]]"
aliases:
  - N-mixture model definition
  - latent multinomial view of counts
---

# Barker 2018 - N-Mixture Model and the Capture-Recapture View

> [!summary]
> The N-mixture model is a closed-population capture-recapture model whose recapture information has been thrown away. Decomposing the Mt/M0 likelihood into $L_1\times L_2\times L_3$ shows that the part carrying most information about $N$ ($L_1$, hypergeometric recaptures) is missing, leaving only the weak terms $L_2L_3$.

## Overview

Strategies for abundance under imperfect detection: (i) capture-recapture with auxiliary data to estimate $p$ directly; (ii) N-mixture models, which assume constant $p$ (after covariates) plus a hierarchical model for $N$; (iii) index models for relative abundance assuming constant $p$.

> [!definition] N-mixture model
> For sites $i=1,\dots,I$ and visits $j=1,\dots,J$,
> $$n_{ij}\mid N_i\;\overset{iid}{\sim}\;\text{Binomial}(N_i,p),\qquad N_i\overset{iid}{\sim}\text{Poisson}(\nu)$$
> (or negative binomial, zero-inflated Poisson). Assumptions: (a) a closed population of $N_i$ animals at site $i$ across visits; (b) no animal counted twice within a visit; (c) detection $p$ constant after covariate adjustment. With a single site and $J>1$, $n_j\sim\text{Binomial}(N,p)$ lets both $N$ and $p$ be estimated, but only through second-moment information (Carroll and Lombard 1985).
^def-nmixture-model

Limitations listed by the authors: (i) a defined closed population is a strong assumption and an ill-defined sampling area induces individual heterogeneity in $p$; (ii) Poisson counts conditional on $N$ may be preferable if individuals may be counted repeatedly; (iii) uncontrolled variation in $p$ among visits breaks the model; (iv) estimating a binomial index $N$ is difficult and these difficulties flow through (Dennis et al. 2015: infinite or very large $\hat N$ when $p$ and $J$ are small).

## Main Content

### Counts as incomplete capture-recapture data
Let $\omega=(\omega_1,\dots,\omega_J)$ be a capture history and $x_\omega$ the number of individuals with history $\omega$ (so $x_{000}$ is unseen). With three occasions the unmarked counts are
$$n_1=x_{111}+x_{101}+x_{110}+x_{100},\quad n_2=x_{111}+x_{110}+x_{011}+x_{010},\quad n_3=x_{111}+x_{101}+x_{011}+x_{001}.$$
The $x_\omega$ are now latent (a **latent multinomial**; Link et al. 2010), and $(n_1,\dots,n_J)$ are not sufficient statistics for any model in the Otis series M0, ..., Mtbh, even assuming constant $p$.

> [!theorem] Likelihood decomposition under model Mt (Eq. 1)
> $$[\{x_\omega\}\mid N,\mathbf p]\;\propto\;\underbrace{\prod_{j=2}^{J}\binom{M_j}{m_j}\binom{N-M_j}{n_j-m_j}\Big/\binom{N}{n_j}}_{L_1=[\{m_j\}\mid\{n_j\},N]}\;\times\;\underbrace{\prod_{j=1}^{J}\binom{N}{n_j}p_j^{n_j}(1-p_j)^{N-n_j}}_{L_2=[\{n_j\}\mid N,\mathbf p]}$$
> where $m_j$ is the number of marked animals caught in sample $j$ and $M_j$ the number of marked animals in the population just before sample $j$. $L_1$ extends the two-sample hypergeometric model conditional on the captures $\{n_j\}$ and can be treated as a **partial likelihood** that contains virtually all the information about $N$ (Schofield and Barker 2016).
^thm-nmixture-eq1

> [!theorem] Decomposition under M0 (Eq. 2) and what N-mixtures keep
> Setting $p_1=\dots=p_J=p$ and writing $t=\sum_j n_j$,
> $$[\{x_\omega\}\mid N,p]\propto L_1\times\underbrace{\frac{\prod_j\binom{N}{n_j}}{\binom{JN}{t}}}_{L_2=[\{n_j\}\mid N,t]}\times\underbrace{\binom{JN}{t}p^{t}(1-p)^{JN-t}}_{L_3=[t\mid N,p]}.$$
> (i) $L_2$ carries some information about $N$ given $t$; this is what N-mixtures exploit. (ii) $L_2L_3$ is the likelihood for $n_j\mid N\overset{iid}{\sim}\text{Binomial}(N,p)$. Relative to $L_1$, the residual information in $L_2L_3$ is small (Fig. 1).
^thm-nmixture-eq2

With $m_j$ missing, summing out $L_1$ in Eq. 1 leaves $L_2$ only, $\prod_j\binom{N}{n_j}p_j^{n_j}(1-p_j)^{N-n_j}$, so distinct $p_j$ with unmarked counts is **over-specified**: reliable inference is impossible. Identifiability under M0 depends on equal $p_j$ (in capture-recapture it does not, owing to the dominance of $L_1$) and on binomial variation (see [[Barker 2018 - Poisson Alternative and Model Discrimination]]).

**Figure 1** plots the contribution of $L_1,L_2,L_3$ for a simulated $k=5$ study with closed population of 20 and $p=0.25$ per occasion: $L_1$ dominates the shape of the likelihood in $N$.

### N-mixtures and the multivariate Poisson (Sec. 2.1)
With $N_i\sim\text{Poisson}(\nu)$ and $\pi=\{\pi_\omega\}$ simple functions of the capture histories and $p$, the complete-data likelihood factorises into independent Poissons:

> [!theorem] Complete-data likelihood (Eq. 5)
> $$[\{x_{i\omega}\},\{N_i\}\mid p]=\prod_i\text{Multinomial}(\{x_{i\omega}\};N_i,\pi)\,\text{Poisson}(N_i;\nu)=\prod_i\prod_\omega\frac{e^{-\nu\pi_\omega}(\nu\pi_\omega)^{x_{i\omega}}}{x_{i\omega}!}.$$
> Summing out the latent quantities with $\{n_{ij}\}$ held fixed gives a **multivariate Poisson** marginal for $\{n_{ij}\}$ (Dennis et al. 2015), with marginal mean equal to marginal variance.
^thm-nmixture-eq5

## Examples

> [!example] Poisson thinning check
> With $\nu=30$, $p=0.1$: $P(n=2)=\sum_N\text{Poisson}(N;30)\,\text{Binomial}(2;N,0.1)=0.2240$, equal to $\text{Poisson}(2;3)=0.2240$. The marginal count is Poisson with mean $\nu p$, so the single-visit marginal cannot separate $\nu$ from $p$; only the covariance across visits within a site ($\nu p^2$) can.

```python
import numpy as np
from scipy.stats import poisson, binom
nu, p = 30, 0.1
lhs = sum(poisson.pmf(N, nu)*binom.pmf(2, N, p) for N in range(200))
print(lhs, poisson.pmf(2, nu*p))   # identical
```

## Connections

- The Mt/M0 series and Lincoln-Petersen estimator: [[Concept - Closed-Population Capture-Recapture and Otis Models]].
- Marginalising $N_i$ in practice (truncate at $N_{\max}$): [[Concept - Marginalising Latent Discrete Counts for HMC]].
- Latent multinomial / incomplete table view reappears in MSE: [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]].

## See Also

- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
- [[Barker 2018 - Poisson Alternative and Model Discrimination]]
