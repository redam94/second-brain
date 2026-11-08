---
title: "Rizopoulos 2016 - Joint Model Specification and Posterior"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/definition
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Sec. 2, pp. 3-5; Eqs. 1-7"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on: []
used_by:
  - "[[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]]"
  - "[[Rizopoulos 2016 - Association Structures and Transformation Functions]]"
  - "[[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]]"
  - "[[Rizopoulos 2016 - JMbayes Joint Models Overview]]"
aliases:
  - "joint model longitudinal survival"
  - "shared random effects hazard"
  - "JMbayes model specification"
---

# Rizopoulos 2016 - Joint Model Specification and Posterior

> [!summary]
> Observed data are $(T_i,\delta_i,\mathbf y_i)$. The longitudinal outcome follows a GLMM with linear predictor $\eta_i(t)=\mathbf x_i^\top\boldsymbol\beta+\mathbf z_i^\top\mathbf b_i$; the hazard is $h_i(t)=h_0(t)\exp\{\boldsymbol\gamma^\top\mathbf w_i+f[H_i(t),\mathbf b_i,\boldsymbol\alpha]\}$. Conditional on $\mathbf b_i$ the processes are independent, which gives a posterior factorisation. The survival integral has no closed form and is computed by Gauss-Kronrod or Gauss-Legendre quadrature.

## Main Content

> [!definition] Joint model (Eqs. 1-3)
> Notation: $T_i^*$ true event time, $C_i$ censoring, $T_i=\min(T_i^*,C_i)$, $\delta_i=I(T_i^*\le C_i)$, $\mathbf y_i$ the $n_i$ longitudinal responses at times $t_{il}$.
> **Longitudinal** (GLMM, Eq. 1): $g(\mathbb E\{y_i(t)\mid\mathbf b_i\})=\eta_i(t)=\mathbf x_i(t)^\top\boldsymbol\beta+\mathbf z_i(t)^\top\mathbf b_i$, $g$ monotone link, $y$ from the exponential family, $\mathbf b_i\sim N(0,D)$ or multivariate $t_{df}(0,D)$.
> **Survival** (Eq. 2): $h_i(t\mid H_i(t),\mathbf w_i(t))=h_0(t)\exp\{\boldsymbol\gamma^\top\mathbf w_i(t)+f[H_i(t),\mathbf b_i,\boldsymbol\alpha]\}$, $H_i(t)=\{\eta_i(s),0\le s<t\}$ the marker history, $\mathbf w_i$ exogenous covariates, $\boldsymbol\alpha$ the association parameters.
> **Baseline hazard** (Eq. 3): $\log h_0(t)=\gamma_{h_0,0}+\sum_{q=1}^Q\gamma_{h_0,q}B_q(t,\mathbf v)$, B-splines with knots $\mathbf v$. Rule of thumb: total parameters between $1/10$ and $1/20$ of the number of events (Harrell 2001); or use 15-20 knots with a penalty (Eilers and Marx 1996).
^def-joint-model

> [!theorem] Conditional independence and posterior (Eqs. 4-7)
> Given $\mathbf b_i$ and $\theta$, longitudinal and event processes are independent and longitudinal measurements are mutually independent: $p(\mathbf y_i,T_i,\delta_i\mid\mathbf b_i,\theta)=p(\mathbf y_i\mid\mathbf b_i,\theta)\,p(T_i,\delta_i\mid\mathbf b_i,\theta)$ and $p(\mathbf y_i\mid\mathbf b_i,\theta)=\prod_lp(y_{il}\mid\mathbf b_i,\theta)$. Hence
> $$
> p(\theta,\mathbf b)\propto\prod_{i=1}^n\Big\{\prod_{l=1}^{n_i}p(y_{il}\mid\mathbf b_i,\theta)\Big\}p(T_i,\delta_i\mid\mathbf b_i,\theta)\,p(\mathbf b_i\mid\theta)\,p(\theta),
> $$
> with the exponential-family density $p(y_{il}\mid\mathbf b_i,\theta)=\exp\{[y_{il}\psi_{il}(\mathbf b_i)-c(\psi_{il}(\mathbf b_i))]/a(\varphi)-d(y_{il},\varphi)\}$ and the survival part
> $$
> p(T_i,\delta_i\mid\mathbf b_i,\theta)=h_i(T_i\mid H_i(T_i))^{\delta_i}\exp\Big\{-\int_0^{T_i}h_i(s\mid H_i(s))\,ds\Big\},\qquad S_i(t)=\exp\Big\{-\int_0^th_0(s)\exp[\boldsymbol\gamma^\top\mathbf w_i(t)+f\{H_i(s),\boldsymbol\alpha\}]ds\Big\}\ \text{(Eq. 7)}.
> $$
> The integral requires numerical quadrature (Gauss-Kronrod, Gauss-Legendre).
^thm-posterior

**Priors.** Independent diffuse normals for $\boldsymbol\beta,\boldsymbol\gamma,\boldsymbol\gamma_{h_0},\boldsymbol\alpha$. Penalised spline: $p(\gamma_{h_0}\mid\tau_h)\propto\tau_h^{\rho(K)/2}\exp\{-\tfrac{\tau_h}2\gamma_{h_0}^\top K\gamma_{h_0}\}$, $K=\Delta_r^\top\Delta_r+10^{-6}I$ ($\Delta_r$ the $r$-th difference penalty, $\rho(K)$ its rank), $\tau_h\sim\text{Gamma}(1,0.005)$ (Lang and Brezger 2004). Inverse-Wishart for $D$, inverse-Gamma for the error variance $\sigma^2$.

## Examples

> [!example] Cumulative hazard by Gauss-Legendre
> Setup: $\eta(t)=b_0+b_1t$, baseline $h_0=\lambda$, $f=\alpha\eta$: $h(t)=\lambda e^{\alpha(b_0+b_1t)}$. With $\lambda=0.05,b_0=0.5,b_1=0.3,\alpha=1.2,T=6$ the closed-form cumulative hazard is $\lambda e^{\alpha b_0}(e^{\alpha b_1T}-1)/(\alpha b_1)=1.941351$; a 15-point Gauss-Legendre rule reproduces it to $10^{-15}$. Interpretation: for smooth hazards a modest number of quadrature nodes per subject suffices, which is how E25 evaluates $H_i(T_i)$ inside PyMC.
^ex-gl-hazard
```python
import numpy as np
def cum_hazard(T, b0, b1, alpha, lam=0.05, k=15):
    x, w = np.polynomial.legendre.leggauss(k)
    s = 0.5*T*(x+1); ww = 0.5*T*w
    return (ww * lam * np.exp(alpha*(b0 + b1*s))).sum()
```

**PyMC-style sketch (untested).**
```python
with pm.Model():
    chol, corr, sd = pm.LKJCholeskyCov("chol", n=2, eta=2, sd_dist=pm.HalfNormal.dist(1))
    b = pm.MvNormal("b", 0, chol=chol, shape=(N, 2))             # random intercept, slope
    eta = beta0 + beta1*t_obs + b[sub,0] + b[sub,1]*t_obs
    pm.Normal("y", eta, sigma, observed=y)
    alpha = pm.Normal("alpha", 0, 1)
    H = cum_hazard_gl(T, beta0 + b[:,0], beta1 + b[:,1], alpha, shape, scale)  # nodes via leggauss
    pm.Potential("surv", (delta*(log_h(T)) - H).sum())
```

## Connections
[[Survival Analysis]], [[Hierarchical Models]], [[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]], [[Rizopoulos 2016 - Association Structures and Transformation Functions]].

## See Also
[[Rizopoulos 2016 - JMbayes Joint Models Overview]]
