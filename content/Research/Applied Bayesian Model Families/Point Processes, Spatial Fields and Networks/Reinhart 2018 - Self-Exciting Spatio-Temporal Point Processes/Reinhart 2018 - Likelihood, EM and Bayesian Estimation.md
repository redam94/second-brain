---
title: "Reinhart 2018 - Likelihood, EM and Bayesian Estimation"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Sec. 2.4, 3.1, 3.5, pp. 6-10, 17-18"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
  - "[[Reinhart 2018 - Hawkes Processes and Conditional Intensity]]"
used_by:
  - "[[Reinhart 2018 - Stochastic Declustering]]"
  - "[[Reinhart 2018 - ETAS Earthquake Models and Omori Law]]"
aliases:
  - "Point process log-likelihood"
  - "Hawkes EM algorithm"
  - "branching structure EM"
---

# Reinhart 2018 - Likelihood, EM and Bayesian Estimation

> [!summary]
> The likelihood of a point process is $\prod_i\lambda(t_i)\exp(-\int_0^T\lambda)$: a sum of log-intensities minus the *compensator*. For self-exciting models, introducing the latent parent indicator $u_i$ yields an EM algorithm (E step = triggering probabilities) and a partitioned posterior that is far easier for MCMC (Ross 2016).

## Overview
Direct likelihood evaluation costs $O(n^2)$ (each $\lambda(t_i)$ sums over earlier events) and the surface can be nearly flat, so numerical maximisation can fail (Veen & Schoenberg 2008). Branching structure fixes this.

## Main Content

> [!theorem] Point-process likelihood (Daley & Vere-Jones, Prop. 7.2.III, 7.3.III)
> For a temporal process with conditional intensity $\lambda$, $L(\Theta)=\Big[\prod_{i=1}^n\lambda(t_i)\Big]\exp\!\big(-\int_0^T\lambda(t)\,dt\big)$. For the spatio-temporal case on $\mathcal X\times[0,T)$ (eq. 8):
> $$
> \ell(\Theta)=\sum_{i=1}^n\log\lambda(s_i,t_i)-\int_0^T\!\!\int_{\mathcal X}\lambda(s,t)\,ds\,dt.
> $$
> With marks: $\ell=\sum\log\lambda_g(s_i,t_i)+\sum\log f(\kappa_i\mid s_i,t_i)-\iint\lambda_g$.

^thm-pp-likelihood

*Derivation sketch.* Start from the Janossy density $j_n(t_1,\dots,t_n\mid T)=p_1(t_1)p_2(t_2|t_1)\cdots p_n(t_n|t_{1:n-1})\,S_{n+1}(T|t_{1:n})$, with hazards $h_k=p_k/S_k=-\tfrac{d}{dt}\log S_k$, so $S_k(t)=\exp(-\int_{t_{k-1}}^{t}h_k)$ and $\lambda(t)=h_k(t\mid t_{1:k-1})$ on $(t_{k-1},t_k]$. Multiplying gives the product-times-exponential form. Spatial locations are treated as marks.

> [!definition] Compensator integral and its approximations
> The term $\iint\lambda$ is expensive for arbitrary polygons $\mathcal X$. Schoenberg (2013) replaces it by an integral over $\mathbb R^2\times[0,\infty)$ (upper bound, exact if excitation stays inside the window; it overestimates, penalising bad $\Theta$). Lippiello et al. (2014) show the *temporal* truncation biases more than the spatial one; use the $\mathbb R^2$ approximation only in space.

^def-compensator

> [!theorem] EM with branching structure (Veen & Schoenberg 2008)
> Let $u_i=0$ if event $i$ is background and $u_i=j$ if triggered by event $j$. Complete-data log-likelihood:
> $$
> \ell_c(\Theta)=\sum_i\mathbb 1(u_i{=}0)\log\mu(s_i)+\sum_i\sum_j\mathbb 1(u_i{=}j)\log g(s_i-s_j,t_i-t_j)-\iint\lambda.
> $$
> E step (eqs. 9-10): $\Pr(u_i=j)=\dfrac{g(s_i-s_j,t_i-t_j)}{\lambda(s_i,t_i)}$ for $t_j<t_i$ (0 otherwise), and $\Pr(u_i=0)=\dfrac{\mu(s_i)}{\lambda(s_i,t_i)}=1-\sum_{j<i}\Pr(u_i=j)$. M step: maximise $\mathbb E[\ell_c]$ with these weights; repeat until convergence.

^thm-hawkes-em

Analogy: a mixture model where $u_i$ is the component label. Boundary warning (Zhuang, Ogata & Vere-Jones 2004): unobserved events just outside $\mathcal X\times[0,T)$ create "background" events and observed events near the boundary have offspring outside, so $m$ is biased **downward**.

### Bayesian approaches (Sec. 3.5)
- Rasmussen (2013): MCMC on the likelihood (Metropolis-within-Gibbs) or a cluster-structure sampler.
- Loeffler & Flaxman (2017): HMC in Stan for a crime Hawkes model.
- Ross (2016): direct likelihood MCMC is $O(n^2)$ per evaluation with strongly correlated parameters; instead sample $u_i$ from eqs. 9-10, then given $u$ the events split into $N+1$ sets $S_j=\{t_i:u_i=j\}$, each an inhomogeneous Poisson process with intensity $\propto g$ (or $\mu$ for $S_0$). The log-likelihood partitions, decorrelating parameters.

## Examples

> [!example] Exponential Hawkes: closed-form compensator and O(n) recursion
> For $g(u)=\alpha\beta e^{-\beta u}$ the compensator is $\Lambda=\nu T+\alpha\sum_i\big(1-e^{-\beta(T-t_i)}\big)$ and $\lambda(t_i)=\nu+\alpha\beta R_i$ with $R_i=e^{-\beta(t_i-t_{i-1})}(1+R_{i-1})$, $R_1=0$. Cost $O(n)$ instead of $O(n^2)$.

```python
import numpy as np
def hawkes_ll(t, T, nu, a, b):
    R = np.zeros(len(t))
    for i in range(1, len(t)):
        R[i] = np.exp(-b*(t[i]-t[i-1]))*(1+R[i-1])
    lam = nu + a*b*R
    comp = nu*T + a*np.sum(1-np.exp(-b*(T-t)))
    return np.log(lam).sum() - comp
def hawkes_ll_naive(t, T, nu, a, b):
    ll = 0.
    for i in range(len(t)):
        ll += np.log(nu + a*b*np.exp(-b*(t[i]-t[:i])).sum())
    return ll - (nu*T + a*np.sum(1-np.exp(-b*(T-t))))
t = np.sort(np.random.default_rng(1).uniform(0, 50, 200))
print(hawkes_ll(t,50,.5,.4,2.), hawkes_ll_naive(t,50,.5,.4,2.))
```

PyMC sketch (untested; use `pytensor.scan` for the recursion and `pm.Potential` for the likelihood):
```python
import pymc as pm, pytensor, pytensor.tensor as pt
with pm.Model():
    nu = pm.LogNormal("nu", 0, 1); a = pm.Beta("a", 2, 2); b = pm.LogNormal("b", 0, 1)
    dt = pt.as_tensor(np.diff(t, prepend=t[0]))
    R, _ = pytensor.scan(lambda d, Rprev: pt.exp(-b*d)*(1+Rprev), sequences=dt, outputs_info=pt.zeros(()))
    lam = nu + a*b*R
    pm.Potential("ll", pt.log(lam).sum() - nu*T - a*pt.sum(1-pt.exp(-b*(T-t))))
```
Prior $a\sim\text{Beta}$ keeps the branching ratio in $(0,1)$ (subcritical).

## Connections
- [[Reinhart 2018 - Stochastic Declustering]] reuses the E-step probabilities.
- The compensator/likelihood structure mirrors [[Survival Analysis]] hazards.

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]] | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]]
