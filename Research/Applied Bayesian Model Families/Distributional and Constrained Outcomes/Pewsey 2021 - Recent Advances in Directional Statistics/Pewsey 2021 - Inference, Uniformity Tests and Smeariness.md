---
title: "Pewsey 2021 - Inference, Uniformity Tests and Smeariness"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]]"
source_location: "Sec. 4-5, Eq. (15), pp. 11-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics"
doc_type: paper
depends_on:
  - "[[Pewsey 2021 - Circular Distributions and Constructions]]"
used_by:
  - "[[Pewsey 2021 - Circular Models in PyMC]]"
aliases:
  - Rayleigh test
  - Sobolev tests uniformity
  - smeariness
  - score matching directional
---

# Pewsey 2021 - Inference, Uniformity Tests and Smeariness

> [!summary]
> Inference for directional models is mostly likelihood-based; ML estimators of full exponential-family models are moment estimators. Normalising constants motivate pseudo-likelihood and score matching, and Bayesian MCMC is increasingly common. The key hypothesis test is **uniformity** (no preferred direction), with Sobolev tests (Rayleigh, Bingham as special cases) the main class. "Smeariness" makes naive intrinsic-mean inference on the circle slower than $n^{-1/2}$.

## Overview

Sec. 4 (inference) and Sec. 5 (testing: uniformity 5.1, symmetry 5.2, location/concentration, goodness-of-fit 5.4, other scenarios 5.5). Calibration is by asymptotic theory or resampling for small samples.

## Main Content

### Inference

- **Likelihood and moments.** ML estimators of exponential-family models are moment estimators (van der Vaart 2000, ch. 4): closed forms for vM and Mardia-Sutton cylindrical model. Otherwise numerical maximisation with moment estimates as starting values. Exact ML for the Fisher-Bingham family: Kume and Sei (2018, holonomic gradient method).
- **Pseudo-likelihood** (Kent et al. 2008) and **score matching** (Hyvärinen 2005; Mardia et al. 2016; Takasu et al. 2018) avoid normalising constants.
- **Asymptotics.** Delta method for central location, concentration, skewness and kurtosis (Pewsey 2004a); boundary parameters by Self and Liang (1987); bootstrap CIs for small samples (Pewsey et al. 2013, ch. 5). Le Cam local asymptotic normality for rank-based estimators (Ley et al. 2013).
- **Bayesian.** MCMC on embedded manifolds (Byrne and Girolami 2013); Bayesian methods for vM (Damien and Walker 1999), vM mixtures (Mulder et al. 2020a), WC (Ghosh et al. 2019), vMF (Núñez-Antonio and Gutiérrez-Peña 2005b), projected normal (2005a); scoring rules (Giummolè et al. 2019). Robust estimators: Agostinelli (2007).
- **Reference systems** matter for inference: Mastrantonio et al. (2019).

> [!definition] Smeariness
> Nonparametric inference on intrinsic means on $S^1$ and $S^d$ can differ from Euclidean: asymptotic rates are slower than $n^{-1/2}$ under *smeariness* (Hotz and Huckemann 2015; Eltzner and Huckemann 2019); finite-sample smeariness (Hundrieser et al. 2020) may affect all circular distributions. Consequence: quantile-based tests may be inappropriate while suitable bootstrap tests remain valid.
^def-smeariness

### Testing uniformity

> [!theorem] Sobolev statistics (Eq. 15)
> For a sample $\mathbf X_1,\dots,\mathbf X_n$ on $S^d$,
> $$S_n(\{v_k^2\})=\frac1n\sum_{i,j=1}^n\sum_{k=1}^\infty v_k^2h_k(\mathbf X_i,\mathbf X_j),$$
> with $h_k(\mathbf u,\mathbf v)=2\cos(k\cos^{-1}(\mathbf u^\top\mathbf v))$ for $d=1$ and $h_k=(1+\tfrac{2k}{d-1})C_k^{(d-1)/2}(\mathbf u^\top\mathbf v)$ for $d>1$ ($C_k$ Gegenbauer polynomials). The weights $\{v_k^2\}$ must decay fast enough for convergence. Choosing $v_k=\delta_{kj}$ gives **Rayleigh** ($j=1$; Rayleigh 1919) and **Bingham** ($j=2$; Bingham 1974) tests, modified by Jupp (2001) for faster convergence.
^thm-sobolev

Also: data-driven (information-criterion-truncated) Sobolev tests (Bogdan et al. 2002 for $S^1$; Jupp 2008, 2009); Pycke's pairwise chordal distance tests; projected-ecdf Watson/Rothman/Anderson-Darling extensions on $S^d$ (García-Portugués et al. 2020a); Cramér-von Mises four-point; Gini mean difference spacings; Bayesian tests (Mulder and Klugkist 2021); high-dimensional ($d\to\infty$) tests based on $\max_{i<j}|\mathbf X_i^\top\mathbf X_j|$ (Cai and Jiang 2012). Simulation comparisons on $S^1$: Landler et al. (2018); grouped data: Humphreys and Ruxton (2017), Landler et al. (2019).

**Other testing.** Symmetry (5.2), goodness-of-fit (5.4: e.g. vM GOF), location/concentration tests, and "other scenarios" (5.5) are reviewed with citations only; the survey does not state formulas for them.

## Examples

> [!example] Rayleigh test for a preferred hour (Python)
> ```python
> import numpy as np
> from scipy import stats
> hours = np.array([8, 9, 9, 10, 11, 14, 22], float)             # purchase hours
> theta = 2*np.pi*hours/24
> n = len(theta)
> R = np.hypot(np.cos(theta).sum(), np.sin(theta).sum())/n         # mean resultant length
> Z = n*R**2                                                       # Rayleigh statistic
> p = np.exp(-Z) * (1 + (2*Z - Z**2)/(4*n))                        # standard small-n approximation
> print(R, Z, p)
> ```
> Under uniformity $2nR^2\to\chi^2_2$; null example: Oklahoma earthquake times in E81 serve as a "no preferred hour" check.
^ex-rayleigh

## Connections

Bayesian counterparts for PyMC: [[Pewsey 2021 - Circular Models in PyMC]]. Multiple-testing and false-discovery context: [[Model Validation and Interpretability - Overview]].

## See Also

[[Pewsey 2021 - Directional Statistics - Overview]]
