---
title: "Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]]"
source_location: "Sec. 3.2-3.4, 7.1, 8, 9, 11-14, Eqs. (8)-(14), pp. 7-10, 20-31"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics"
doc_type: paper
depends_on:
  - "[[Pewsey 2021 - Circular Distributions and Constructions]]"
used_by:
  - "[[Pewsey 2021 - Directional Statistics - Overview]]"
aliases:
  - von Mises-Fisher
  - toroidal circula models
  - cylindrical models
  - directional PCA
  - spatial circular processes
---

# Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics

> [!summary]
> Beyond the circle: tori (pairs of angles), cylinders (angle + linear), spheres (von Mises-Fisher, Fisher-Bingham, Kent), and the associated machinery for density estimation, dimension reduction, classification, spatial processes and software. Copula-like constructions ("circulas") bind marginal circular distributions into toroidal ones.

## Overview

This note collects the parts of the survey that go beyond univariate circular models and regression: Secs. 3.2-3.4, 7.1, 8, 9, 11, 12, 13 and 14.

## Main Content

### Toroidal models (3.2)

> [!definition] Bivariate von Mises (Eq. 8, Mardia 1975)
> $f(\theta_1,\theta_2)\propto\exp\{\kappa_1\cos(\theta_1-\mu_1)+\kappa_2\cos(\theta_2-\mu_2)+(\cos(\theta_1-\mu_1),\sin(\theta_1-\mu_1))\,\mathbf A\,(\cos(\theta_2-\mu_2),\sin(\theta_2-\mu_2))^\top\}$,
> eight parameters (three more than the minimum five), maximum-entropy/exponential family, normalising constant a doubly infinite sum (Mardia 2010). Five-parameter submodels: sine (Singh et al. 2002), cosine (Mardia et al. 2007), hybrid (Kent et al. 2008); conditionals are vM but marginals are generally not (can be bimodal). Multivariate sine vM on $T^d$ (Mardia et al. 2008): conditionals vM, so pseudo-likelihood applies.
^def-bvm

> [!definition] Binding densities and circulas (Eqs. 9-10)
> Wehrly and Johnson (1980): $f(\theta_1,\theta_2)=2\pi f_{\Theta_1}(\theta_1)f_{\Theta_2}(\theta_2)f_\Omega(2\pi[F_{\Theta_2}(\theta_2)-qF_{\Theta_1}(\theta_1)])$ with circular "binding" pdf $f_\Omega$ and $q=\pm1$ (sign of dependence). Copula form (Shieh and Johnson 2005): $f=f_{\Theta_1}f_{\Theta_2}\,c(F_{\Theta_1},F_{\Theta_2})$. Jones et al. (2015): $f=4\pi^2f_{\Theta_1}f_{\Theta_2}c^\circ(2\pi F_{\Theta_1},2\pi F_{\Theta_2})$ where $c^\circ$ is a **circula density** (circular-uniform arguments, doubly periodic); (9) corresponds to $c^\circ(\phi_1,\phi_2)=\frac1{2\pi}f_\Omega(\phi_2-q\phi_1)$. Kato et al. (2018): Fourier-series circulas. Bivariate WC (Kato and Pewsey 2015) has all marginals and conditionals WC. Compare [[Factor Copulas - Overview]] for the linear-copula analogue.
^def-circula

### Cylindrical models (3.3)

Mardia and Sutton (1978): conditioning a trivariate normal gives a six-parameter model with vM marginal for $\Theta$ and $X\mid\Theta=\theta$ normal (closed-form ML). Kato and Shimizu (2008): eight-parameter generalized vM extension. Marginal specification (Eq. 11): $f(\theta,x)=2\pi f_\Theta(\theta)f_X(x)f_\Omega(2\pi[F_\Theta(\theta)-qF_X(x)])$ (Johnson and Wehrly 1978; wind-energy and ocean-engineering applications). Mastrantonio (2018): joint projected and skew-normal for multivariate cylindrical data.

### Spherical models (3.4)

> [!definition] von Mises-Fisher and Fisher-Bingham (Eqs. 12-13)
> $f_{\mathbf X}(\mathbf x;\boldsymbol\mu,\kappa)=\frac{\kappa^{(d-1)/2}}{(2\pi)^{(d+1)/2}I_{(d-1)/2}(\kappa)}\exp\{\kappa\mathbf x^\top\boldsymbol\mu\}$ on $S^d$; Fisher-Bingham: $f\propto\exp\{\kappa\mathbf x^\top\boldsymbol\mu+\mathbf x^\top\mathbf A\mathbf x\}$ ($\mathbf A$ symmetric $(d+1)\times(d+1)$) contains Kent, Fisher-Watson, Bingham-Mardia, Bingham, Watson (the last two for axial data). Normalising constants: Kume and Sei (2018). Simulation: Kent et al. (2018).
^def-vmf

Other models: small-sphere distributions (Kim et al. 2019); spherical rotational-symmetry skew models (Ley and Verdebout 2017b; Jupp et al. 2016); projected normal family (Hernandez-Stumpfhauser et al. 2017); projected gamma on the positive orthant (Núñez-Antonio and Geneyro 2020); **directional log-spline** densities $f(\mathbf x)=\exp\{c_0+\sum_jc_jR_d(\mathbf x;\mathbf k_j)\}$ (Eq. 14, Ferreira et al. 2008).

### Density estimation (7.1)

Kernel estimators (Eq. 17), series-based (needlets, Fourier) and Bayesian (Dirichlet process mixtures of vMF) approaches; see [[Pewsey 2021 - Circular Regression and Serial Dependence]] for the KDE formula.

### Dimension reduction and clustering (8-9)

Manifold PCA: extrinsic (tangent space) vs intrinsic (geodesic), forward vs backward (Damon and Marron 2014). Principal geodesic analysis (Fletcher et al. 2004) centres at the intrinsic mean; its optimisation is hard (Sommer et al. 2014), so tangent PCA is an approximation. Classification: chordal-distance rules (SenGupta and Roy 2005), depth-vs-depth, Watson/vMF Bayes rules (Figueiredo and Gomes 2006; 2009), Dirichlet process mixture of vMF classifier (Bhattacharya and Dunson 2012), naive Bayes with vMF (López-Cruz et al. 2015). Clustering: mixtures with spherical components.

### Spatial and spatio-temporal (11)

Hierarchical Bayesian models for directional fields fitted by MCMC: wrapped normal CAR for hurricane winds (Modlin et al. 2012), wrapped Gaussian spatial process for wave directions (Jona-Lasinio et al. 2012), projected normal processes for direction and height (Wang and Gelfand 2014), wrapped skew-normal process (Mastrantonio et al. 2016a), space-time extensions (Mastrantonio et al. 2016b); hidden-Markov models for sea-surface patterns (Lagona et al. 2015b) and hidden Markov random fields for cylindrical series (Lagona and Picone 2016; Ranalli et al. 2018).

### Other topics (12)

Statistical depth (angular simplicial/Tukey depth; Agostinelli and Romanazzi 2013), design of experiments (Otieno and Anderson-Cook 2012; optimal designs by Dette and co-authors), order-restricted analysis, outlier detection, and **compositional data analysis** (12.5): Aitchison (1986) log-ratios vs Stephens (1982) square-root map from the simplex to the sphere $S^d$, developed by Scealy and Welsh (2011, 2014a,b, 2017); Cuesta-Albertos et al. (2009) link the two for uniformity testing. See [[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]] and [[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]].

### Software (13) and conclusions (14)

R: `circular`, `Directional` (general), `bpDir`, `season`, `bReeze` (plots), `rgl`, `plot3D`; other languages: CircStat (MATLAB), PyCircStat (Python), libDirectional, Mocapy++, geomstats. Expected future: more flexible models, high-dimensional/mixed-type data, Bayesian, nonparametric and resampling methods. A BibTeX file of over 1,700 references is at github.com/egarpor/DirectionalStatsBib.

## Examples

> [!example] Square-root map for shares
> If $\mathbf p\in S^{D-1}_\text{simplex}$ then $\mathbf x=(\sqrt{p_1},\dots,\sqrt{p_D})\in S^{D-1}_\text{sphere}$, with zeros landing on the sphere's boundary (the orthant) rather than being forbidden — this is why Scealy and Welsh's Kent regression handles zeros without imputation.
^ex-sqrt-map

## Connections

Compositional alternative to log-ratios; torus models relate to copulas ([[Factor Copulas - Overview]]).

## See Also

[[Pewsey 2021 - Directional Statistics - Overview]]
