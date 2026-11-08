---
title: "Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros.pdf]]"
source_location: "Sec. 3.1-3.3, Eqs. (5)-(11), pp. 3-7"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Tsagris 2018 - Dirichlet Regression with Zeros"
doc_type: paper
depends_on:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]]"
used_by:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]]"
aliases:
  - ZADR
  - zero adjusted Dirichlet regression
  - simple ZADR
---

# Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression

> [!summary]
> ZADR treats each pattern of non-zero components as a sub-population with probability $\theta_b$ (MLE $n_b/n$). Within each, the non-zero sub-composition is Dirichlet. A common coefficient vector and common precision $\phi$ are shared across patterns through selection matrices $Q_b$, so rare zero patterns need not be estimated separately. This works because sub-compositions of a Dirichlet are Dirichlet with the corresponding parameters.

## Overview

Existing strategies: (i) imputation of rounded zeros (Palarea-Albaladejo and Martin-Fernandez 2008; robust version of Martin et al. 2012; `robCompositions`), which changes all components of affected vectors and handles large point masses poorly; (ii) explicit zero modelling: Aitchison (1982, pp. 271-273), Zadora et al. (2010), Stewart and Field (2011), Bear and Billheimer (2015), Scealy and Welsh (2011, square-root transform to the sphere with a Kent distribution), Leininger et al. (2013, spatial power transform). ZADR extends the second family to Dirichlet regression with covariates.

## Main Content

> [!definition] Zero-pattern mixture (Eqs. 5-6)
> Let $G$ index the non-zero components and $\theta_b=P[G=g_b]$, $\sum_{b=1}^B\theta_b=1$, over $B$ populations (subsets of non-zero components). Then
> $$
> f_{\mathbf Y}(\mathbf y)=\sum_{b=1}^Bf_{\mathbf Y,G}(\mathbf y,g_b)=f_{b^*}(\mathbf y_{b^*})\,\theta_{b^*},
> $$
> where $b^*$ is the pattern of $\mathbf y$ and $\mathbf y_{b^*}$ its $D_{b^*}$ non-zero components, with $\mathbf Y_{b^*}\sim\text{Dir}(\phi_{b^*},\mathbf a^*_{b^*})$.
^def-zero-mixture

> [!theorem] Full-pattern log-likelihood (Eq. 7) and MLE of $\theta$
> $$
> \ell=\sum_{b}\Big[n_b\log\theta_b+n_b\log\Gamma(\phi_b)-\sum_{j\in S_b}\sum_{i=1}^{D_b}\log\Gamma(\phi_ba_{bij}^*)+\sum_{j\in S_b}\sum_{i=1}^{D_b}(\phi_ba_{bij}^*-1)\log y_{bij}\Big],
> $$
> $S_b$ = observations with pattern $b$. The MLE is $\hat\theta_b=n_b/n$; the rest decouples into $B$ separate Dirichlet regressions. In practice many patterns have few observations, so estimation is unreliable.
^thm-zero-loglik

> [!definition] ZADR with shared parameters (Eq. 8)
> Following Bear and Billheimer (2015), assume the regression coefficients (and $\phi$) are the same across patterns: $\mathbf Y_b\sim\text{Dir}(\phi,Q_b\mathbf a^*)$ with a common $\mathbf a^*$ from Eq. (1). The selection matrix $Q_b$ picks the non-zero positions, e.g. for $D=4$ with zeros in positions 1 and 3:
> $$
> Q_1=\begin{pmatrix}0&1&0&0\\0&0&0&1\end{pmatrix}.
> $$
> With $Q_b\mathbf a^*[i]$ the $i$-th element of $Q_b\mathbf a^*$:
> $$
> \ell=n\log\Gamma(\phi)+\sum_bn_b\log\theta_b-\sum_b\sum_{j\in S_b}\sum_{i=1}^{D_b}\log\Gamma(\phi\,Q_b\mathbf a^*_j[i])+\sum_b\sum_{j\in S_b}\sum_{i=1}^{D_b}(\phi\,Q_b\mathbf a^*_j[i]-1)\log y_{bij}.
> $$
> This is called **simple ZADR**. Replacing $\phi$ by $\phi_j^*=e^{\mathbf x_j^\top\boldsymbol\gamma}$ (Eq. 9) gives the full **ZADR** with covariate-dependent precision; the models are compared by likelihood-ratio test.
^def-zadr

> [!definition] Why it works
> A Dirichlet with some components set to zero has non-zero components that are Dirichlet with the same parameters (marginalising/closing a Dirichlet gives a Dirichlet). The extra assumption needed for consistency: the vectors containing zeros, modelled by lower-dimensional Dirichlets, share the full Dirichlet's parameters (not proved by the authors).
^def-why-works

### Maximisation (Sec. 3.3)

The log-likelihood is the sum of the zero-free part and the part from vectors with zeros. Algorithm:

1. Apply ALR to zero-free vectors: $z_i=\log(y_i/y_1)$, $i=2,\dots,D$ (Eq. 10).
2. Least squares $\hat{\mathbf B}=(\mathbf X^\top\mathbf X)^{-1}\mathbf X^\top\mathbf Z$ (Eq. 11): the Aitchison model.
3. Use $\hat{\mathbf B}$ as starting values for maximising the Dirichlet regression likelihood (2) (initial coefficients; for model 4 random starting $\phi$).
4. Use these as starting values for maximising the ZADR log-likelihood (8); obtain final estimates.

Authors report no empirical sensitivity to starting values; the good start reduces local-maximum risk.

## Examples

> [!example] Python: ZADR log-likelihood contribution for one vector
> ```python
> import numpy as np
> from scipy.special import gammaln
> def zadr_loglik_row(y, a_star, phi):
>     """y: composition with zeros; a_star: full-length mean vector summing to 1."""
>     nz = y > 0                      # Q_b picks non-zero positions
>     alpha = phi * a_star[nz]
>     return gammaln(phi) - gammaln(alpha).sum() + ((alpha - 1) * np.log(y[nz])).sum()
> print(zadr_loglik_row(np.array([0.7, 0.0, 0.3]), np.array([0.5, 0.2, 0.3]), 10.0))
> ```
> Note: this is the Dirichlet kernel of the observed sub-composition, with $\Gamma(\phi)$ replaced by $\Gamma(\sum_{i\in nz}\phi a_i)$ in an exact sub-Dirichlet; the paper's Eq. 8 keeps $\Gamma(\phi)$ because the common $\phi$ is the total of the *full* parameter. Check against the paper before using in production.
^ex-zadr-python

## Connections

Compared against imputed log-ratio regression in [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]]. Counterpart conceptual discussion: [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]].

## See Also

[[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]
