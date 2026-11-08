---
title: "Item Response Theory Norms and You Are Here Placement (Concept Note)"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/concept-note
source: "concept note, no raw source (cites Bürkner 2021; Frank et al. 2017 Wordbank; standard IRT references)"
source_location: "Synthesis; see Bürkner 2021 notes for the model classes"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Concept Notes"
doc_type: concept
depends_on:
  - "[[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]"
  - "[[Bürkner 2021 - Priors Hierarchical Pooling and Identification]]"
used_by:
  - "[[Bürkner 2021 - Bayesian IRT with brms Overview]]"
aliases:
  - you are here percentile placement
  - IRT norms by age
  - marginal likelihood quadrature IRT
  - Gauss-Hermite 2PL
---

# Item Response Theory Norms and You Are Here Placement (Concept Note)

> [!summary]
> To place one respondent ("you are here") in an age norm: fit an IRT model (e.g. 2PL) to many checklists, score the respondent's latent ability by its posterior (EAP or full posterior via quadrature), and convert to a percentile against an age-specific distribution of abilities (normal or skew-normal, location varying smoothly with age). The ingredients - marginalising ability by Gauss-Hermite quadrature, identification of section/location effects, two-stage plug-in norms - are the technical content of E116. Concept note, no raw source; calculations are verified in code.

## Overview

Motivating dataset in E116: Wordbank CDI Words & Sentences (American English; Frank, Braginsky, Yurovsky & Marchman 2017, CC BY 4.0), 9,537 checklists x 680 words, ages 16-30 months. Each child ticks the words they say: binary item responses with a strong age trend. The aim is a growth-chart-like percentile for a new child.

## Main Content

> [!definition] Marginal likelihood of a person with ability integrated out
> For respondent $p$ with responses $y_{pi}$ and 2PL probabilities $\psi_{pi}=\text{logistic}(\alpha_i(\theta_p+\xi_i))$, with $\theta_p\sim N(\mu_{a(p)},\sigma_\theta^2)$ (location depending on age $a(p)$):
> $$
> p(y_p\mid\xi,\alpha,\mu,\sigma_\theta)=\int\prod_i\psi_{pi}^{y_{pi}}(1-\psi_{pi})^{1-y_{pi}}\;N(\theta\mid\mu_{a(p)},\sigma_\theta^2)\,d\theta.
> $$
> ^def-marginal-lik

**Quadrature.** Approximate with Gauss-Hermite nodes $\theta_k=\mu+\sigma_\theta z_k$ with weights $w_k$. A fixed grid is cheap but loses accuracy for respondents far from the prior mean (extreme scores); *adaptive* Gauss-Hermite recentres and rescales nodes at each respondent's posterior mode and curvature, giving accurate integrals with fewer nodes. Items with all-correct or all-wrong patterns need care (the likelihood is monotone in $\theta$).

**Identification.** The same scale non-identifiability as in [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]: fix $\sigma_\theta$ (or the reference-age distribution). If item easiness is decomposed into section (word category) means plus item deviations, constrain section means to sum to zero (zero-sum) to separate them from the global location (a "location ridge" otherwise); the idea is the standard sum-to-zero contrast.

**Two-stage plug-in.** Stage 1: fit item parameters $(\xi,\alpha)$ on the calibration sample, treating each child's ability as latent. Stage 2: fix those item parameters and score each child by EAP or posterior; fit the age norm (location by age, scale, skewness) on stage-1 scores or integrate over their posterior uncertainty. Plugging in ignores item-parameter uncertainty (usually small with thousands of children), and the shrinkage of EAP scores compresses the apparent spread, which matters when the norm is fitted to EAPs rather than to the latent distribution.

> [!definition] Percentile placement
> If the age-specific latent distribution is $F_a(\theta)$ (normal, or skew-normal for the left-skewed vocabulary distribution at older ages), a respondent with posterior $p(\theta\mid y)$ has percentile $\Pi=\int F_a(\theta)\,p(\theta\mid y)\,d\theta$ - the expected percentile - with a credible interval from the posterior quantiles. Month-to-month smoothness: let location and shape vary with age via orthogonal deviations (e.g. polynomial or per-month deviations orthogonal to a linear trend) to avoid collinearity with the global slope.
> ^def-percentile-placement

## Examples

> [!example] Quadrature scoring and percentile for one respondent
> **Setup.** Simulated 2PL: 60 items, $\xi_i\sim N(0,1)$, $\log\alpha_i\sim N(0,0.2^2)$, 2,000 respondents with $\theta\sim N(0,1)$. 41-node Gauss-Hermite rule.
> **Solution.** For respondent 0, the EAP is $1.61$ (true $\theta=1.52$). Fitting a skew-normal to 500 EAPs gives a placement of EAP $=1.0$ at the $86.6$th percentile, identical to the normal-based $86.6$ here because the simulated abilities are symmetric.
> **Interpretation.** The posterior mean is close to the truth with 60 items; skewness changes the percentile only when the age-specific distribution really is skewed (as in the toddler vocabulary data).
> ^ex-quadrature-placement

```python
import numpy as np
from scipy.stats import skewnorm
nodes, w = np.polynomial.hermite_e.hermegauss(41); w = w/w.sum()   # N(0,1) rule
def post(y, xi, a, mu=0., sd=1.):
    t = mu + sd*nodes
    p = 1/(1+np.exp(-a[None, :]*(t[:, None]+xi[None, :])))
    ll = (y*np.log(p)+(1-y)*np.log(1-p)).sum(1) + np.log(w)
    pr = np.exp(ll-ll.max()); pr /= pr.sum()
    return t, pr                                   # nodes, posterior weights
# EAP = (t*pr).sum(); expected percentile = (skewnorm.cdf(t, *norm_params)*pr).sum()
```

PyMC-style (untested): marginalise ability by quadrature in `pm.Potential`, e.g. `logp_k = log_w[k] + sum_i bernoulli_logit(y_pi, a_i*(t_k+xi_i))` and `pm.math.logsumexp(logp_k)` per person; skew-normal norm via `pm.SkewNormal`.

## Relevance to marketing measurement

The same machinery places a customer or panelist on a latent scale (engagement, brand affinity) relative to a segment norm: score, then percentile. It also supports adaptive survey design (item information) and short-form scales (select high-discrimination items). Test fairness across markets: [[Bürkner 2021 - Covariates and Differential Item Functioning]].

## Connections

- Hierarchical priors on items/persons: [[Bürkner 2021 - Priors Hierarchical Pooling and Identification]]; factor-analytic view: [[Confirmatory Factor Analysis and SEM]], [[Factor Analysis and PPCA]].
- Hierarchical modelling: [[Hierarchical Models]].

## See Also

[[Bürkner 2021 - Bayesian IRT with brms Overview]]
