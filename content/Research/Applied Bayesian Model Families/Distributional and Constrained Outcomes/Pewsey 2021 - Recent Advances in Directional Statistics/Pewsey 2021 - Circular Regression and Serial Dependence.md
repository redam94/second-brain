---
title: "Pewsey 2021 - Circular Regression and Serial Dependence"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]]"
source_location: "Sec. 6-7, 10, Eqs. (16)-(20), pp. 15-19 and 24-26"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics"
doc_type: paper
depends_on:
  - "[[Pewsey 2021 - Circular Distributions and Constructions]]"
used_by:
  - "[[Pewsey 2021 - Circular Models in PyMC]]"
aliases:
  - circular regression
  - tan-half link
  - projected normal regression
  - circular time series
  - harmonic regression
---

# Pewsey 2021 - Circular Regression and Serial Dependence

> [!summary]
> Regression taxonomy: circular-circular, circular-linear (angular response), linear-circular (harmonic/trigonometric-polynomial predictors) and spherical responses. For an angular response, link-based models ($2\tan^{-1}$) are hard to estimate by ML (Presnell et al. 1998), so projected-normal regression and Bayesian priors are favoured. Circular time series use projected, wrapped, linked-ARMA and circular-AR constructions.

## Overview

Notation $Y\text{-}X$: response-covariate. Nonparametric regression is in Sec. 7.2.

## Main Content

### Circular-circular

> [!definition] Inverse-tangent link model (Eq. 16, Polsen and Taylor 2015)
> $\Psi=\operatorname{Arg}\{g_1(\Theta;\boldsymbol\eta)+ig_2(\Theta;\boldsymbol\eta)\}+\varepsilon\pmod{2\pi}$, with conditional mean direction given by the Arg term, $g_1,g_2$ not uniquely identifiable, $\varepsilon$ a circular error. Special cases: decentred model (Rivest 1997, vM errors), Möbius models (Downs and Mardia 2002 with vM; Kato et al. 2008 with WC; Kato and Jones 2010). Sarma and Jammalamadaka (1993) bivariate model with trigonometric-polynomial $g_1,g_2$.
^def-circcirc

### Circular-linear (angular response)

> [!definition] Link-function regression (Fisher and Lee 1992)
> $E(\Theta\mid\mathbf X=\mathbf x)=2\tan^{-1}(\boldsymbol\beta^\top\mathbf x)$ (the "tan-half" link): maps the origin of $\mathbb R$ to angle 0 and both extremes to $\pm\pi$. Difficulties in ML estimation (Presnell et al. 1998); semi-parametric Bayes (George and Ghosh 2006); weakly informative priors (Mulder and Klugkist 2017).
^def-tanhalf

> [!definition] Projected-normal regression (Presnell et al. 1998)
> Latent bivariate linear response $\mathbf W_i\sim N_2(\mathbf B^\top\mathbf x_i,\boldsymbol\Sigma)$ and $\Theta_i=\operatorname{Arg}(W_{i1}+iW_{i2})$. Popular for Bayesian work (Núñez-Antonio et al. 2011; Wang and Gelfand 2013; Hernandez-Stumpfhauser et al. 2016); interpretation of predictor effects: Cremers et al. (2018). Extensions: mixed models (Núñez-Antonio and Gutiérrez-Peña 2014), finite mixtures with correlated random coefficients (Maruotti 2016), hidden Markov heterogeneity (Maruotti et al. 2016).
^def-projected-reg

Other approaches: Lund (2002) tree-based; longitudinal models by estimating equations (Artes et al. 2000), variance components (D'Elia 2001), correlated sine multivariate vM (Lagona 2016, with Bayesian extension Mulder and Klugkist 2017); animal orientation models with vM errors and consensus mean (Rivest et al. 2016); random-effects circular regression (Rivest and Kato 2019).

### Linear-circular

> [!definition] Trigonometric (harmonic) regression
> Regress a linear response on sums of trigonometric polynomials of the circular covariate (Johnson and Wehrly 1978), by least squares: $E[Y\mid\theta]=\beta_0+\sum_{m=1}^M\{a_m\cos(m\theta)+b_m\sin(m\theta)\}$ (standard form). Bayesian versions: Bhattacharya and SenGupta (2009a); SenGupta and Bhattacharya (2015). Cylindrical responses: Cremers et al. (2020).
^def-harmonic-reg

### Spherical responses

Chang (1986) first; Downs (2003) Möbius/stereographic with vMF; Hinkle et al. (2014) polynomial manifold-linear; Rosenthal et al. (2014) projective linear transformations; Cornea et al. (2017) semi-parametric intrinsic; Paine et al. (2020) general $S^2$ response with anisotropic errors; Scealy and Wood (2019) $S^d$-$\mathbb R^q$ heteroscedastic scaled vMF.

### Nonparametric (Sec. 7)

> [!definition] Spherical KDE and Nadaraya-Watson (Eqs. 17-20)
> $\hat f(\mathbf x;h)=\frac{c_L(h)}{n}\sum_{j=1}^nL\!\left(\frac{1-\mathbf x^\top\mathbf X_j}{h^2}\right)$. With vMF kernel $L(r)=e^{-r}$ on $S^1$: $\hat f(\theta;\kappa)=\frac{1}{2\pi I_0(\kappa)n}\sum_j\exp\{\kappa\cos(\theta-\Theta_j)\}$, $\kappa=1/h^2$. Nadaraya-Watson: $\hat m(\theta;\kappa)=\frac{\sum_jY_j\exp\{\kappa\cos(\theta-\Theta_j)\}}{\sum_j\exp\{\kappa\cos(\theta-\Theta_j)\}}$. Using a WC kernel instead of vM worsens performance (Tsuruta and Sagae 2017a). Local polynomial versions: Di Marzio et al. (2009).
^def-kde

### Serial dependence (Sec. 10)

> [!definition] Circular time-series constructions
> - **Projected**: $\Theta_t=\operatorname{Arg}(X_t+iY_t)$ for a stationary bivariate normal process.
> - **Wrapped**: $\Theta_t=X_t\bmod2\pi$ (e.g. wrapped AR, Breckling 1989).
> - **Linked ARMA**: $\Theta_t=\mu+g(X_t)$ with link $g:\mathbb R\to(-\pi,\pi)$ and $X_t=g^{-1}(\Theta_t)$ an ARMA(p,q) process.
> - **CAR** (circular autoregressive): $\Theta_t\mid\Theta_{t-1}=\theta_{t-1},\dots$ is vM with mean $\mu_t=\mu+g[\alpha_1g^{-1}(\theta_{t-1}-\mu)+\cdots+\alpha_pg^{-1}(\theta_{t-p}-\mu)]$ and concentration $\kappa$.
> - **Markov** processes from bivariate circular densities (Wehrly and Johnson 1980; Hughes 2007; Kato 2010).
> Continuous time: vM diffusion random walks (Hill and Häder 1997); toroidal Langevin diffusions (García-Portugués et al. 2019); filtering with vMF, Bingham, wrapped normal; particle filters for WC ship tracking.
^def-circ-ts

## Examples

> [!example] Harmonic seasonal predictor
> Day-of-year $d$ with $\theta=2\pi d/365.25$: $\mu(d)=\beta_0+a_1\cos\theta+b_1\sin\theta+a_2\cos2\theta+b_2\sin2\theta$. Amplitude of harmonic $m$ is $\sqrt{a_m^2+b_m^2}$, phase $\operatorname{atan2}(b_m,a_m)$. This is the E81 "harmonic circular predictor" and the same basis as periodic Fourier seasonality terms in MMM; see [[Local Linear Trend and Seasonality]].
^ex-harmonic

## Connections

[[Pewsey 2021 - Circular Models in PyMC]], [[Generalized Linear Models]] (the mean-direction models are non-canonical-link GLM analogues).

## See Also

[[Pewsey 2021 - Directional Statistics - Overview]]
