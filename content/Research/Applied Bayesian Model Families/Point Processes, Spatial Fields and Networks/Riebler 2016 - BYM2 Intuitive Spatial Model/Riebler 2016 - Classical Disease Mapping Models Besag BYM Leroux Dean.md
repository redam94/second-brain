---
title: "Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping.pdf]]"
source_location: "Sec. 2-3.1, pp. 2-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Riebler 2016 - BYM2 Intuitive Spatial Model"
doc_type: paper
depends_on:
used_by:
  - "[[Riebler 2016 - Scaling and the BYM2 Construction]]"
aliases:
  - "Besag model"
  - "Leroux model"
  - "Dean model"
  - "disease mapping setup"
---

# Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean

> [!summary]
> Disease mapping uses $y_i\mid\theta_i\sim\text{Poisson}(E_i\theta_i)$ with $\log\theta_i=\mu+z_i^\top\beta+b_i$. Four latent models for $b$: Besag (intrinsic GMRF), BYM (structured + unstructured), Leroux (mixed precision) and Dean (mixed variance). None has a scaled structured part; Leroux cannot be scaled.

## Overview
Raw SMRs $\hat\theta_i=y_i/E_i$ have $\mathrm{Var}(\hat\theta_i)=\theta_i/E_i$, so small-$E_i$ areas are noisy; borrow strength over neighbours. Weakly informative $N(0,100)$ priors on $\mu,\beta$.

## Main Content

> [!definition] Poisson disease-mapping likelihood
> $y_i\mid\theta_i\sim\text{Poisson}(E_i\theta_i)$, $\eta_i=\log\theta_i=\mu+z_i^\top\beta+b_i$; $E_i$ expected cases from population at risk; $b$ spatial random effect for unexplained heterogeneity.

^def-disease-mapping-likelihood

> [!definition] Besag (ICAR) model, eq. 1-2
> $b_i\mid b_{-i},\tau_b\sim N\big(\frac1{n_{\delta_i}}\sum_{j\in\delta_i}b_j,\ \frac1{n_{\delta_i}\tau_b}\big)$; joint $\pi(b\mid\tau_b)\propto\exp(-\frac{\tau_b}2\sum_{i\sim j}(b_i-b_j)^2)=\exp(-\frac{\tau_b}2b^\top Qb)$ with $Q_{ii}=n_{\delta_i}$, $Q_{ij}=-1$ if $i\sim j$, else 0. $Q$ is singular: rank deficiency equals the number of connected components $I$ (1 for a connected map), $\mathbf 1$ is a null vector, density $\pi(b\mid\tau_b)=K\tau_b^{(n-I)/2}\exp(-\frac{\tau_b}2b^\top Qb)$; impose sum-to-zero on each component. Cannot represent pure overdispersion.

^def-besag-model

> [!definition] BYM model
> $b=v+u$, $v\sim N(0,\tau_v^{-1}I)$ (overdispersion), $u\sim N(0,\tau_u^{-1}Q^-)$ (Besag); $\mathrm{Var}(b)=\tau_v^{-1}I+\tau_u^{-1}Q^-$. Not identifiable as a split; $\tau_v^{-1}$ is a marginal variance whereas $\tau_u^{-1}$ is a *conditional* variance given neighbours, so priors on the two are not on the same scale.

^def-bym-model

> [!definition] Leroux model (eq. 3)
> $\mathrm{Var}(b\mid\tau_b,\phi)=\tau_b^{-1}\big((1-\phi)I+\phi Q\big)^{-1}$, $\phi\in[0,1]$: pure overdispersion at $\phi=0$, Besag at $\phi=1$; the *precision matrix* is a weighted average of $I$ and $Q$.

^def-leroux-model

> [!definition] Dean model (eq. 4-5)
> $b=\tau_b^{-1/2}(\sqrt{1-\phi}\,v+\sqrt\phi\,u)$, $\mathrm{Var}(b)=\tau_b^{-1}\big((1-\phi)I+\phi Q^-\big)$: a BYM reparameterisation with $\tau_u^{-1}=\tau_b^{-1}\phi$, $\tau_v^{-1}=\tau_b^{-1}(1-\phi)$; the *covariance* is a weighted average.

^def-dean-model

## Examples
Neighbour-list format for INLA (Appendix B): first line $n$; each following line = region index, number of neighbours, neighbour indices. In PyMC, `pm.ICAR(W=adjacency, sigma=...)` implements the Besag density (E18).

## Connections
[[Riebler 2016 - Scaling and the BYM2 Construction]] fixes the unscaled-precision problem; [[Spatial Models - BYM]] gives the basic BYM tutorial.

## See Also
[[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]]
