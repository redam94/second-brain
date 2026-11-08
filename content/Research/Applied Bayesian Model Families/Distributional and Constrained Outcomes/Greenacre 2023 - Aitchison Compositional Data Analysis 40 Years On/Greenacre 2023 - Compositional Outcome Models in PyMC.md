---
title: "Greenacre 2023 - Compositional Outcome Models in PyMC"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On.pdf]]"
source_location: "Sec. 3.3-3.8 and 6 (translation to Bayesian models is a concept note, not in the paper)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On"
doc_type: paper
depends_on:
  - "[[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]"
  - "[[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]"
used_by:
  - "[[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]"
aliases:
  - logistic-normal regression PyMC
  - Dirichlet-multinomial PyMC
  - compositional response PyMC
---

# Greenacre 2023 - Compositional Outcome Models in PyMC

> [!summary]
> Three Bayesian likelihoods cover compositional outcomes: logistic-normal (Gaussian on ALR/ILR coordinates, flexible covariance), Dirichlet (mean-precision, only negative correlations) and Dirichlet-multinomial (counts with extra-multinomial variation). This concept note (not in the paper) sketches each in PyMC and the LOO comparison trap across scales. Code is **untested**.

## Overview

Greenacre et al. stress that once a composition is expressed in logratios, "everything that follows is standard statistical practice". Bayesian regression with a compositional response is therefore a multivariate-normal regression on logratio coordinates, or a Dirichlet family on the simplex. The motivating example E70 (Arctic lake sediments; 2024 UK election shares) compares these.

## Main Content

> [!definition] Logistic-normal regression
> Let $\mathbf y_i\in S^{D-1}$ and $\mathbf z_i=\operatorname{alr}(\mathbf y_i)\in\mathbb R^{D-1}$. Then $\mathbf z_i\sim N(\mathbf B^\top\mathbf x_i,\ \boldsymbol\Sigma)$, $\boldsymbol\Sigma=\operatorname{diag}(\boldsymbol\sigma)\mathbf R\operatorname{diag}(\boldsymbol\sigma)$, $\mathbf R\sim\text{LKJ}(\eta)$. Covariate-dependent scale: $\log\sigma_{ik}=a_k+\mathbf c_k^\top\mathbf x_i$. The ALR reference choice does not change the model class (any ALR is a linear map of any other) but changes the prior geometry.
^def-logistic-normal

> [!definition] Dirichlet regression (mean-precision)
> $\mathbf y_i\sim\text{Dir}(\phi_i\,\mathbf m_i)$ with $\mathbf m_i=\operatorname{softmax}(\mathbf B^\top\mathbf x_i)$ (reference row fixed at 0) and precision $\phi_i=\exp(\mathbf g^\top\mathbf x_i)$. Covariance between parts is always negative; precision may depend on covariates. See [[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]].
^def-dirichlet-reg

> [!definition] Dirichlet-multinomial
> For counts $\mathbf n_i$ with total $N_i$: $\mathbf p_i\sim\text{Dir}(\phi\mathbf m_i)$, $\mathbf n_i\sim\text{Multinomial}(N_i,\mathbf p_i)$, marginalised analytically. Overdispersion relative to the multinomial is $1+(N_i-1)/(\phi+1)$. Natural for election counts, microbiome counts, and the genomics case in Sec. 6 (multinomial conditioned on totals).
^def-dm

> [!example] PyMC 5 sketches (untested)
> ```python
> import numpy as np, pymc as pm, pytensor.tensor as pt
> # Y: (n, D) compositions with no zeros; X: (n, p) with intercept column
> n, D = Y.shape; p = X.shape[1]
> Z = np.log(Y[:, :-1] / Y[:, [-1]])                           # ALR, last part = reference
>
> with pm.Model() as logistic_normal:
>     B = pm.Normal("B", 0, 1, shape=(p, D - 1))
>     chol, corr, sds = pm.LKJCholeskyCov("chol", n=D - 1, eta=2.0,
>                                        sd_dist=pm.Exponential.dist(2.0), compute_corr=True)
>     pm.MvNormal("Z", mu=pt.dot(X, B), chol=chol, observed=Z)
>
> with pm.Model() as dirichlet:
>     B = pm.Normal("B", 0, 1, shape=(p, D - 1))
>     eta = pt.concatenate([pt.dot(X, B), pt.zeros((n, 1))], axis=1)
>     m = pt.special.softmax(eta, axis=1)
>     log_phi = pm.Normal("log_phi", 3, 1)
>     pm.Dirichlet("Y", a=pt.exp(log_phi) * m, observed=Y)
>
> with pm.Model() as dirmult:                                   # counts N: (n, D)
>     B = pm.Normal("B", 0, 1, shape=(p, D - 1))
>     m = pt.special.softmax(pt.concatenate([pt.dot(X, B), pt.zeros((n, 1))], axis=1), axis=1)
>     phi = pm.Gamma("phi", 2, 0.1)
>     pm.DirichletMultinomial("N", n=N.sum(1), a=phi * m, observed=N)
> ```
^ex-pymc-compositional

**Comparing across scales.** Logistic-normal likelihoods are densities on $\mathbb R^{D-1}$ (ALR scale), Dirichlet likelihoods are densities on the simplex. LOO/ELPD values are comparable only after adding the Jacobian of the ALR map, $\log|J|=-\sum_{j=1}^{D}\log y_j$ (so that the logistic-normal density is on $S^{D-1}$); forgetting it makes the Gaussian look spuriously better or worse. This is the E70 "LOO across scales via the log-ratio Jacobian" point.

**Spurious correlation.** Compare the correlation matrix of raw shares (forced negative bias) with that of the ALR coordinates; coefficient interpretation should be in terms of log-ratios (effect of $x$ on $\log(y_j/y_\text{ref})$).

**Zeros.** Logistic-normal and plain Dirichlet need strictly positive data. Options: model zero patterns (Tsagris: [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]]), amalgamate, or use counts with Dirichlet-multinomial which allows zero counts. See [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]].

## Examples

For constituency-level vote shares with covariates: Dirichlet-multinomial on vote counts (accounts for sampling noise from constituency size) plus a logistic-normal random effect for region is the multi-level version; partial pooling across regions follows [[Hierarchical Models]].

## Connections

[[Generalized Linear Models]] (multinomial-logit is the DM/multinomial mean model), [[Posterior Predictive Checking]], [[Prior Predictive Checking]].

## See Also

[[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]
