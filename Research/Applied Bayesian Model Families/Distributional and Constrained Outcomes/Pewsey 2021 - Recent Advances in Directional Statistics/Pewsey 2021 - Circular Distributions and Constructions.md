---
title: "Pewsey 2021 - Circular Distributions and Constructions"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]]"
source_location: "Sec. 1-3.1, Eqs. (1)-(7), pp. 1-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics"
doc_type: paper
depends_on:
  - "[[Pewsey 2021 - Directional Statistics - Overview]]"
used_by:
  - "[[Pewsey 2021 - Circular Regression and Serial Dependence]]"
  - "[[Pewsey 2021 - Circular Models in PyMC]]"
aliases:
  - von Mises distribution
  - wrapped normal
  - projected normal
  - wrapped Cauchy
  - sine-skewed circular
  - circular distributions
---

# Pewsey 2021 - Circular Distributions and Constructions

> [!summary]
> A circular pdf is non-negative, $2\pi$-periodic and integrates to 1 over any length-$2\pi$ interval. Models arise by wrapping, projection or perturbation (plus conditioning, diffusion, maximum entropy). The von Mises, wrapped normal/Cauchy and projected normal are the workhorses; flexible families add skewness, peakedness and multimodality.

## Overview

Directions on $S^1$ are angles $\theta\in[0,2\pi)$ or unit vectors $\mathbf x=(\cos\theta,\sin\theta)^\top$ or complex $z=e^{i\theta}$. Axial data identify $\theta$ and $\theta+\pi$. Times on the 24-hour clock can be analysed as circular after mapping to the circle (Gill and Hangartner 2010). Exploratory tools (Sec. 2): moving rose diagram, wrap-around time series plot, circular data image, area-proportional rose diagrams, circular boxplots (Abuzaid et al. 2012, centred on the circular median using $d_c(\phi,\theta)=\pi-|\pi-|\theta-\phi||$, Eq. 1), CircSiZer, WiZer (the wrapped normal is the only kernel guaranteeing circular causality; Huckemann et al. 2016) and SphereSiZer.

## Main Content

> [!definition] Von Mises (Eq. 2)
> $$f_\Theta(\theta;\mu,\kappa)=\frac{1}{2\pi I_0(\kappa)}\exp\{\kappa\cos(\theta-\mu)\},$$
> $\mu\in[0,2\pi)$ mean direction, $\kappa>0$ concentration, $I_\nu$ modified Bessel function of the first kind. Derivable using five constructions (Mardia and Jupp 1999, Sec. 3.5.4). Trigonometric moments $\varphi_k=E e^{ik\Theta}=A_k(\kappa)e^{ik\mu}$ with $A_1(\kappa)=I_1(\kappa)/I_0(\kappa)$ (standard result) the mean resultant length $\rho$.
^def-vonmises

> [!definition] Wrapping
> If $X$ is linear, $\Theta=X\bmod2\pi$ ($=\operatorname{Arg}\{e^{iX}\}$). The cf of $\Theta$ is $\{\varphi_k=\varphi_X(k)\}$ and $f_\Theta(\theta)=\sum_{k\in\mathbb Z}f_X(\theta+2\pi k)$. **Wrapped Cauchy**: $f(\theta;\mu,\rho)=\frac{1}{2\pi}\frac{1-\rho^2}{1+\rho^2-2\rho\cos(\theta-\mu)}$ with $\varphi_k=(\rho e^{i\mu})^k$ (Eq. 3) — the rare closed form. **Wrapped normal** ($X\sim N(\mu,\sigma^2)$) closely approximates the vM and vice versa (Pewsey and Jones 2005). Other wrapped families: skew-normal, exponential, Laplace, $t$, stable, generalized normal-Laplace.
^def-wrapping

> [!definition] Projection
> Stereographic: $\Theta=2\tan^{-1}X$. Radial projection of $\mathbf X=(X_1,X_2)$: $\Theta=\operatorname{Arg}(X_1+iX_2)$, i.e. $\mathbf X/\|\mathbf X\|\in S^1$. The **projected normal** (offset normal / angular Gaussian) can be symmetric or asymmetric, unimodal or bimodal; natural for measurements relative to an observer.
^def-projection

> [!definition] Perturbation: cardioid and sine-skewed
> **Cardioid**: $f=\frac{1}{2\pi}\{1+2\rho\cos(\theta-\mu)\}$, $|\rho|<\tfrac12$. **Sine-skewed** (Abe and Pewsey 2011): $f(\theta;\mu,\lambda)=g(\theta-\mu)\{1+\lambda\sin(\theta-\mu)\}$ with symmetric unimodal base $g$ and $\lambda\in[-1,1]$; same normalising constant as $g$; $\lambda>0$ skews anticlockwise; only moderate asymmetry and may not be unimodal.
^def-perturbation

> [!definition] Overarching and highly flexible unimodal families
> **Jones-Pewsey** (2005): $f\propto\{1+\tanh(\kappa\psi)\cos(\theta-\mu)\}^{1/\psi}$, $\kappa\ge0$, shape $\psi\in\mathbb R$; contains uniform, cardioid, vM and WC. **Kato-Jones** (2015, Eq. 4): $f(\theta)=\frac{1}{2\pi}\{1+2\gamma\frac{\cos(\theta-\mu)-\rho\cos\lambda}{1+\rho^2-2\rho\cos(\theta-\mu-\lambda)}\}$ with $\mu\in[0,2\pi)$, $\rho\in[0,1)$, $\gamma\in[0,(1+\rho)/2]$, $\lambda\in[-\pi,\pi)$ subject to $\rho\gamma\cos\lambda\ge(\rho^2+2\gamma-1)/2$; closed-form cdf; generalises the WC by extending trigonometric moments. **Möbius transformation** (Eq. 5): $\Theta^*=\phi+\omega+2\tan^{-1}[w_r\tan\{(\Theta-\omega)/2\}]$, $w_r=(1-r)/(1+r)$; applied to circular uniform gives WC (McCullagh 1996). **Inverse Batschelet** (Jones and Pewsey 2012): transformation of argument, four parameters, Laplace-like shapes. Most flexible unimodal: Jones-Pewsey 2012 and Kato-Jones 2015.
^def-flexible

> [!definition] Multimodality: mixtures and generalized vM
> **Mixture** (Eq. 6): $f(\theta;\mathbf p,\boldsymbol\mu,\boldsymbol\kappa)=\sum_{j=1}^mp_jf(\theta;\mu_j,\kappa_j)$, $\sum p_j=1$. Identifiability of location-scale wrapped mixtures: Holzmann et al. (2004). **Generalized vM of order $m$** (Eq. 7): $f\propto\exp\{\kappa_0+\sum_{j=1}^m\kappa_j\cos(j(\theta-\mu_j))\}$ (Gatto 2008), normalising constant numerical; Fernández-Durán's non-negative trigonometric sums need no constants but are over-parameterised; Taniguchi et al. (2020) normalise spectra via residue theorem.
^def-multimodal

## Examples

> [!example] Choosing a model for hourly wind direction
> Wind direction at an airport can be bimodal (on-shore / off-shore). A single vM cannot represent both; a two-component vM mixture (Eq. 6) or a projected normal (which can be bimodal) can. Using the wrapped normal vs vM matters little for unimodal data (Pewsey and Jones 2005), but heavy-tailed/peaked data favours WC or Jones-Pewsey.
^ex-wind-direction

> [!example] Python: von Mises mean resultant length and MLE
> ```python
> import numpy as np
> from scipy import stats, special, optimize
> theta = stats.vonmises.rvs(kappa=3.0, loc=1.0, size=2000, random_state=1)
> C, S = np.cos(theta).mean(), np.sin(theta).mean()
> mu_hat, rho = np.arctan2(S, C), np.hypot(C, S)               # mean direction, resultant length
> kappa_hat = optimize.brentq(lambda k: special.i1(k)/special.i0(k) - rho, 1e-6, 100)
> print(mu_hat, rho, kappa_hat)                                # ML for vM = moment estimator
> ```
^ex-vm-mle

## Connections

Regression on these: [[Pewsey 2021 - Circular Regression and Serial Dependence]]; PyMC: [[Pewsey 2021 - Circular Models in PyMC]].

## See Also

[[Pewsey 2021 - Directional Statistics - Overview]]
