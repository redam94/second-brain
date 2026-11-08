---
title: "Reinhart 2018 - Crime, Epidemic and Network Applications"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Sec. 4.2-4.4, 5, pp. 22-27"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
  - "[[Reinhart 2018 - ETAS Earthquake Models and Omori Law]]"
used_by:
aliases:
  - "self-exciting crime model"
  - "Hawkes on networks"
---

# Reinhart 2018 - Crime, Epidemic and Network Applications

> [!summary]
> The ETAS template transfers to crime (near-repeat victimisation), infectious disease (transmission as excitation) and events on networks (email replies, contagion of violence). Conclusion of the review: the background/triggered split must be interpreted with care when the true mechanism is fully contagious.

## Overview
Different fields choose different background and kernel structures; the shared pieces are the conditional intensity and the branching-structure toolbox.

## Main Content

### Crime (Sec. 4.2)
Mohler et al. (2011): $\lambda(s,t)=\nu(t)\mu(s)+\sum_{t_i<t}g(s-s_i,t-t_i)$, nonparametric via Algorithm 1 (subsampled for 5,376 residential burglaries). Mohler (2014) parametric version with leading indicators $M_i$: $\mu(s)=\sum_i\frac{\alpha_{M_i}}{2\pi\eta^2T}\exp(-\|s-s_i\|^2/2\eta^2)$, $g(s,t,M)=\frac{\theta_M}{2\pi\omega\sigma^2}e^{-t/\omega}e^{-\|s\|^2/2\sigma^2}$. Chicago, 78,852 violent crimes 2007-12, target = homicide; the self-exciting model outperformed fixed hot-spots ($\theta=0$) and near-repeat-only ($\alpha=0$) models. Theory background: routine activities, rational choice, law of crime concentration (Weisburd 2015).

### Epidemics (Sec. 4.3)
Meyer, Elias & Hohle (2012): invasive meningococcal disease, 636 cases in Germany 2002-08: $\lambda(s,t)=\rho(s,t)\exp(\beta^\top z(s,t))+\sum_{j\in I^*(s,t)}e^{\eta_j}g(t-t_j)f(\|s-s_j\|)$, $\eta_j=\gamma_0+\gamma^\top m_j$, Gaussian spatial $f$, constant temporal $g$; Meyer & Held (2014) power-law $f$. Schoenberg, Hoffman & Harrigan (2017): recursive model $\lambda=\mu+\iint H(\lambda(s',t'))g\,dN$ with $H(x)=\kappa x^{-\alpha}$ (decreasing productivity), fitted to LA measles.

### Networks (Sec. 4.4)
Fox et al. (2016): email at West Point, $\lambda_i(t)=\nu_i\mu(t)+\sum_j\sum_{r^{ij}_k<t}\theta_{ij}\omega_ie^{-\omega_i(t-r^{ij}_k)}$ (EM + bootstrap). Zipkin et al. (2015): a self-exciting process per edge to infer missing sender/recipient. Green, Horel & Papachristos (2017): contagion of gun violence, $\lambda_k(t)=\mu(t)+\sum_{t_i<t}\varphi_{k_i,k}(t-t_i)$ with $\varphi_{u,v}=\beta e^{-\beta t}\,\alpha\,\text{dist}(u,v)^{-2}$ for dist $\le3$.

> [!definition] Interpretation caveat (Sec. 5)
> If an infection has no unobserved carriers, "background" cases only reflect unobserved infections; better reporting lowers apparent background and the estimated $m$ is underestimated (some triggered infections are missing). Self-exciting models are most meaningful when the generative process is truly clustered.

^def-interpretation-caveat

## Examples
PyMC sketch for a marketing analogue (untested; conceptual): counts of daily conversions $y_t$ with discrete-time Hawkes intensity $\lambda_t=\mu_t+\alpha\sum_{k\ge1}w_k y_{t-k}$, $\sum w_k=1$, $y_t\sim\text{Poisson}(\lambda_t)$, $\mu_t=\exp(\text{media effect})$. Report $\alpha$ (endogenous share) alongside media lift. This is an analogy beyond the paper.

## Connections
- [[Social Network Models]] and [[Hoff 2002 - Latent Space Models Overview]] for networks as outcomes instead of event streams.
- Marketing measurement: contagion vs. exogenous demand; see [[MMM Model Selection and Application]].

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]]
