---
title: "Reinhart 2018 - Hawkes Processes and Conditional Intensity"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Sec. 1-2.3, pp. 1-6, Figs. 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
used_by:
  - "[[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]]"
  - "[[Reinhart 2018 - ETAS Earthquake Models and Omori Law]]"
aliases:
  - "Hawkes process"
  - "conditional intensity function"
  - "branching ratio"
---

# Reinhart 2018 - Hawkes Processes and Conditional Intensity

> [!summary]
> A self-exciting process has conditional intensity equal to a background rate plus a sum of triggering kernels centred at past events. The mean number of direct offspring is $m=\int g$; the process is subcritical (finite clusters) if $m<1$. Equivalent Poisson-cluster representation: background events ("immigrants") each start a branching tree.

## Overview
Regression on gridded counts suffers the Modifiable Areal Unit Problem; point-process models avoid aggregation by modelling the intensity of events at $(s,t)$ directly. Reinhart distinguishes: (i) homogeneous/inhomogeneous Poisson; (ii) log-Gaussian Cox processes (log-intensity is a Gaussian process; *random* but independent of event history); (iii) cluster processes (Neyman-Scott, Matern); (iv) self-exciting processes whose intensity depends on the *history* $\mathcal H_t$.

## Main Content

> [!definition] Conditional intensity
> For a simple temporal point process with event times $t_i\in[0,T)$, history $\mathcal H_t$ and counting measure $N$,
> $$\lambda(t\mid\mathcal H_t)=\lim_{\Delta t\to0}\frac{\mathbb E\,[N[t,t+\Delta t)\mid\mathcal H_t]}{\Delta t}.$$
> Spatio-temporally (eq. 1): $\lambda(s,t\mid\mathcal H_t)=\lim \dfrac{\mathbb E[N(B(s,\Delta s)\times[t,t+\Delta t))\mid\mathcal H_t]}{|B(s,\Delta s)|\Delta t}$.

^def-conditional-intensity

> [!definition] Hawkes (self-exciting) process
> Temporal: $\lambda(t\mid\mathcal H_t)=\nu+\int_0^t g(t-u)\,dN(u)=\nu+\sum_{i:t_i<t} g(t-t_i)$, with background rate $\nu$ and triggering function $g\ge 0$, $g(u)=0$ for $u<0$ (Hawkes 1971).
> Spatio-temporal (eq. 2): $\lambda(s,t\mid\mathcal H_t)=\mu(s)+\sum_{i:t_i<t} g(s-s_i,t-t_i)$. Often $g$ is separable, $g=f(s-s_i)\,h(t-t_i)$.

^def-hawkes-process

> [!theorem] Poisson-cluster representation (Hawkes & Oakes 1974)
> Any stationary self-exciting process with finite intensity is a Poisson cluster process: background events (cluster centres) form a Poisson process of rate $\nu$ (or $\mu(s)$); each event independently produces a Poisson number of direct offspring with mean
> $$m=\int_0^\infty g(t)\,dt\quad\Big(\text{spatio-temporal: } m=\int_{\mathcal X}\!\int_0^T g(s,t)\,dt\,ds\Big)$$
> placed according to $g$ normalised to a density. If $m<1$ clusters are a.s. finite, generation sizes form a geometric progression, and expected total cluster size (including the immigrant) is $1/(1-m)$.

^thm-cluster-representation

*Proof sketch.* Offspring of an event at $t_i$ form an inhomogeneous Poisson process with intensity $g(\cdot-t_i)$ by the superposition property; recursion gives a Galton-Watson tree with Poisson($m$) offspring; mean total progeny is $\sum_k m^k=1/(1-m)$.

> [!definition] Marks and ground process
> A marked process has events $(s_i,t_i,\kappa_i)$, $\kappa_i\in K$. With ground-process intensity $\lambda_g$ (eq. 4): $\lambda(s,t,\kappa)=\lambda_g(s,t)\,f(\kappa\mid s,t)$. Marks are **independent** if conditionally independent given $(s_i,t_i)$ and **unpredictable** if $\kappa_i$ is independent of the earlier events. A *multivariate* process has a finite mark set (event types).

^def-marks

Figure 1 (p. 4) shows an observed process decomposed into background plus generations 1 and 2 with parent arrows; the cluster structure is latent. Figure 2 (p. 6) compares an inhomogeneous Poisson process (high intensity in a central square) with a self-exciting process using it as background and a short-bandwidth Gaussian triggering kernel (expected cluster size 4): clumps visibly emerge.

## Examples

> [!example] Exponential-kernel Hawkes, branching ratio
> Let $g(u)=\alpha\beta e^{-\beta u}$. Then $m=\alpha$ (dimensionless branching ratio) and the mean intensity under stationarity is $\nu/(1-\alpha)$. With $\alpha=0.75$, expected cluster size $=1/(1-0.75)=4$, the value used in Fig. 2.

```python
import numpy as np
nu, a, b = 0.2, 0.75, 1.5
print("branching ratio m =", a, " cluster size =", 1/(1-a), " mean rate =", nu/(1-a))
rng = np.random.default_rng(0)
def sim_cluster(T):                      # Alg.-5 style: immigrants then generations
    ev = list(rng.uniform(0, T, rng.poisson(nu*T))); gen = ev[:]
    while gen:
        new = []
        for t0 in gen:
            k = rng.poisson(a)
            new += list(t0 + rng.exponential(1/b, k))
        gen = [t for t in new if t < T]; ev += gen
    return np.sort(ev)
x = sim_cluster(2000.); print(len(x)/2000., "events per unit time (theory 0.8)")
```

## Connections
- [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] - how to fit $(\nu,g)$.
- [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]] - $g$ = modified Omori law with magnitude-dependent productivity.
- Relevance to marketing measurement: the branching ratio $m$ is the "viral coefficient" analogue; $m\to1$ signals runaway cascades, so attribution models that ignore it overstate the exogenous (paid) share.

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]] | [[Simpson 2016 - Going Off Grid - Overview]]
