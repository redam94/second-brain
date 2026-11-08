---
title: "Reinhart 2018 - Simulation, Inference and Diagnostics"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Sec. 3.3, 3.4, 3.6, pp. 14-19, Alg. 4-6, Fig. 3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
  - "[[Reinhart 2018 - Stochastic Declustering]]"
used_by:
  - "[[Reinhart 2018 - ETAS Earthquake Models and Omori Law]]"
aliases:
  - "Hawkes simulation thinning"
  - "point process residual diagnostics"
  - "super-thinning"
---

# Reinhart 2018 - Simulation, Inference and Diagnostics

> [!summary]
> Self-exciting processes can be simulated by Ogata's two-stage thinning (Alg. 4) or, much cheaper, by generating the cluster tree directly (Alg. 5). Parameter uncertainty comes from Rathbun's asymptotic covariance or the parametric bootstrap (Alg. 6); Hessian-based errors are poor in short windows. Fit is checked by thinning/super-thinning to a homogeneous Poisson process and by Voronoi residual maps.

## Overview
Simulation underlies bootstrap, forecasting and checking; diagnostics adapt residual methods from spatial point processes (Baddeley et al.) to space-time.

## Main Content

### Simulation (Sec. 3.3)
- **Thinning** (Lewis & Shedler 1979 for NHPP). **Alg. 4 (Ogata 1998):** integrate space out, $\lambda_X(t)=\nu_0+\sum_{j:t_j<t}\nu_j(t)$ with $\nu_0=\int_{\mathcal X}\mu$, $\nu_j(t)=\int_{\mathcal X}g(s,t)\,ds$; draw waiting times from an exponential with dominating rate $\Lambda_c$, accept with probability $\lambda_X/\Lambda_c$, then choose the parent index $J$ by the smallest $J$ with $\sum_{j\le J}\nu_j(t_i)>U\lambda_X(t_i)$ and draw the location from $\mu$ (if $J=0$) or from normalised $g$ centred at $s_J$. Expensive: $\lambda_X$ is a large sum at each candidate.
> [!definition] Algorithm 5: cluster simulation (Zhuang, Ogata & Vere-Jones 2004)
> (1) Simulate background $G^{(0)}$ from $\mu(s)$; (2)-(4) for each event in generation $G^{(l)}$ draw $N\sim\text{Poisson}(m)$ offspring with locations/times from normalised $g$; set $G^{(l+1)}$ = offspring; repeat until empty; return $\bigcup_l G^{(l)}$.

^def-cluster-simulation

Edge effects: simulate on a larger window and cut. Moller & Rasmussen (2005) give perfect simulation for temporal Hawkes processes.

### Inference (Sec. 3.4)
> [!theorem] Asymptotic normality
> Ogata (1978): temporal MLEs are asymptotically normal with covariance the inverse expected Fisher information. Rathbun (1996): for spatio-temporal processes, MLEs are consistent and asymptotically normal as $T\to\infty$ under regularity conditions, with covariance estimator
> $$\hat\Sigma=\Big[\sum_{i=1}^n\frac{\Delta(s_i,t_i)}{\lambda(s_i,t_i)}\Big]^{-1},\qquad \Delta_{kl}=\frac{\dot\lambda_k\dot\lambda_l}{\lambda},\ \dot\lambda_k=\partial\lambda/\partial\theta_k$$
> (eq. 14 as printed in the review; consult Rathbun 1996 for the exact regularity conditions and estimator before use).

^thm-asymptotic-normality

Wang, Schoenberg & Jackson (2010): Hessian-based standard errors can be heavily biased for short observation periods.
**Algorithm 6 (parametric bootstrap).** Simulate from $\hat\Theta$ in the same window, refit, repeat $B$ times (e.g. 1000), take 2.5%/97.5% quantiles. No small-sample guarantee; test in simulation. **Partial likelihood** (Schoenberg 2016): dropping terms gives identical estimates under separability, consistent under additive models with small omitted effects.

### Model selection and diagnostics (Sec. 3.6)
- AIC/BIC/HQ; Chen et al. (2018): AIC better in small samples, worse in large.
- **Thinning to homogeneity** (Schoenberg 2003): with $b=\inf\lambda$, retain event $i$ with prob. $p_i=b/\hat\lambda(s_i,t_i)$; the result is Poisson($b$) if the model is right; test with Ripley's $K$.
- **Super-thinning** (Clements, Schoenberg & Veen 2012): choose $b\le k\le\sup\lambda$, thin with $p_i=\min(k/\hat\lambda,1)$ and superimpose a Poisson process of rate $\max(k-\hat\lambda,0)$; result homogeneous with rate $k$.
- **Voronoi residuals** (Bray et al. 2014): cell $V_i$ around each event; residual $=1-\iint_{V_i\times\text{unit time}}\hat\lambda$ (observed count in the cell is 1 by construction); grids are poor (small cells skewed; large cells cancel). Fig. 3 shows a Voronoi map for a misspecified constant-background fit: positive residuals where the true background is high.

## Examples

```python
import numpy as np
rng = np.random.default_rng(3)
def sim_hawkes_thinning(nu, a, b, T):          # Ogata-style thinning for exp kernel (temporal)
    t, ev = 0., []
    while True:
        lam_bar = nu + a*b*sum(np.exp(-b*(t-e)) for e in ev) + a*b   # upper bound just after t
        t += rng.exponential(1/lam_bar)
        if t > T: return np.array(ev)
        lam = nu + a*b*sum(np.exp(-b*(t-e)) for e in ev)
        if rng.uniform() < lam/lam_bar: ev.append(t)
print(len(sim_hawkes_thinning(.2,.75,1.5,200.))/200., "(stationary theory 0.8; lower here from start-up edge effect, no pre-sample events)")
```

## Connections
- Feeds [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]] (forecast simulation).
- For posterior predictive checks in PyMC, see [[Prior Predictive Checking]].

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]]
