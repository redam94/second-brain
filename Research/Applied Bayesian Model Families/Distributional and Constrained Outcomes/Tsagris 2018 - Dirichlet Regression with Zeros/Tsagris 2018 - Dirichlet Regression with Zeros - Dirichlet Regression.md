---
title: "Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros.pdf]]"
source_location: "Sec. 1-2, Eqs. (1)-(4), pp. 1-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Tsagris 2018 - Dirichlet Regression with Zeros"
doc_type: paper
depends_on:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]"
used_by:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]]"
aliases:
  - Dirichlet regression mean precision
  - Dirichlet regression with variable precision
---

# Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression

> [!summary]
> Dirichlet regression in mean-precision form: $\mathbf Y\sim\text{Dir}(\phi,\mathbf a^*)$ with $\sum a_i^*=1$ and the multinomial-logit link tying $\mathbf a^*$ to covariates. It needs $d(p+1)+1$ parameters instead of the classical $D(p+1)$, and $\phi$ may also depend on covariates through a log link.

## Overview

The Dirichlet is a natural distribution on the simplex $S^d=\{(y_1,\dots,y_D):y_i\ge0,\sum y_i=1\}$, $d=D-1$. Earlier Dirichlet regressions: Gueorguieva et al. (2008), Hijazi and Jernigan (2009). Aitchison (2003) instead applies log-ratios and multivariate linear regression.

## Main Content

> [!definition] Dirichlet in mean-precision form
> $\mathbf Y\sim\text{Dir}(\phi,\mathbf a^*)$ has density
> $$f(\mathbf y)=\frac{\Gamma\!\left(\sum_{i=1}^D\phi a_i^*\right)}{\prod_{i=1}^D\Gamma(\phi a_i^*)}\prod_{i=1}^Dy_i^{\phi a_i^*-1},\qquad\sum_ia_i^*=1.$$
> $\mathbf a^*=E(\mathbf Y)$ is the mean and $\phi>0$ the precision (the usual Dirichlet parameters are $\alpha_i=\phi a_i^*$).
^def-dirichlet-meanprec

> [!definition] Multinomial-logit link (Eq. 1)
> With predictors $\mathbf x=(1,X_1,\dots,X_p)^\top$ and coefficient vectors $\boldsymbol\beta_i=(\beta_{0i},\dots,\beta_{pi})^\top$, $i=2,\dots,D$:
> $$a_1^*=\frac{1}{1+\sum_{k=2}^De^{\mathbf x^\top\boldsymbol\beta_k}},\qquad a_i^*=\frac{e^{\mathbf x^\top\boldsymbol\beta_i}}{1+\sum_{k=2}^De^{\mathbf x^\top\boldsymbol\beta_k}},\ i=2,\dots,D.$$
> Component 1 is the reference. $\log(a_i^*/a_1^*)=\mathbf x^\top\boldsymbol\beta_i$ so interpretation matches Aitchison's ALR regression.
^def-mnl-link

> [!theorem] Log-likelihood (Eq. 2)
> With $n$ observations $y_{ij}$ (component $i$, observation $j$) and common $\phi$:
> $$\ell=n\log\Gamma(\phi)-\sum_{j=1}^n\sum_{i=1}^D\log\Gamma(\phi a_{ij}^*)+\sum_{j=1}^n\sum_{i=1}^D(\phi a_{ij}^*-1)\log y_{ij}.$$
> Parameter count: $d(p+1)+1$.
^thm-dirichlet-loglik

> [!definition] Covariate-dependent precision (Eqs. 3-4)
> $\phi_j^*=e^{\mathbf x_j^\top\boldsymbol\gamma}$, $\boldsymbol\gamma=(\gamma_0,\dots,\gamma_p)$, and the log-likelihood becomes
> $$\ell=\sum_{j=1}^n\log\Gamma(\phi_j^*)-\sum_{j=1}^n\sum_{i=1}^D\log\Gamma(\phi_j^*a_{ij}^*)+\sum_{j=1}^n\sum_{i=1}^D(\phi_j^*a_{ij}^*-1)\log y_{ij}$$
> with $p$ additional parameters. Tested against the constant-precision model by a likelihood-ratio test.
^def-varying-precision

## Examples

> [!example] Interpreting a coefficient
> In the foraminifera fit (4 components, covariate $\log$ depth), $\hat\beta_{\text{slope}}$ for Obesa is 0.117: relative to the reference Triloba, Obesa's share increases with depth by factor $e^{0.117}\approx1.12$ per unit of log depth. See [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]].
^ex-interpret-coef

## Connections

Aitchison's alternative: [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]; PyMC form: [[Greenacre 2023 - Compositional Outcome Models in PyMC]]. The Dirichlet is not in the linear exponential family (Gourieroux et al. 1984), so consistency of estimates requires correct specification.

## See Also

[[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]
