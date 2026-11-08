---
title: "Riebler 2016 - Scaling and the BYM2 Construction"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping.pdf]]"
source_location: "Sec. 3.2-3.4, pp. 5-7, eq. 6-8, Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Riebler 2016 - BYM2 Intuitive Spatial Model"
doc_type: paper
depends_on:
  - "[[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]]"
used_by:
  - "[[Riebler 2016 - Penalised Complexity Priors for BYM2]]"
aliases:
  - "BYM2 scaled parameterisation (Riebler)"
  - "scaled ICAR"
  - "generalised variance scaling"
---

# Riebler 2016 - Scaling and the BYM2 Construction

> [!summary]
> The marginal variances of an intrinsic GMRF depend on the graph, so a fixed prior on $\tau_b$ gives different smoothing on different maps. Scale $Q$ so the geometric mean of the marginal variances (the generalised variance $\sigma^2_{GV}$) is 1; then BYM2 $b=\tau_b^{-1/2}(\sqrt{1-\phi}v+\sqrt\phi u^\star)$ has marginal variance about $1/\tau_b$ and $\phi$ is the spatial fraction.

## Overview
Graph-dependence example (Fig. 1): with $\tau_b=1$, $\sigma^2_{GV}\approx0.29$ for Mittelfranken (12 districts), $0.40$ for Arnsberg (12 districts), $0.56$ for all 544 German districts, $4.78$ for the 3,111 continental US counties. Equal $n$ does not mean equal scale.

## Main Content

> [!definition] Generalised variance and scaling (eq. 6)
> $$\sigma^2_{GV}(u)=\exp\Big(\frac1n\sum_{i=1}^n\log\big(\tau_b^{-1}[Q^-]_{ii}\big)\Big).$$
> Scaled structure matrix $Q^\star=\sigma^2_{GV}(\tau_b{=}1)\cdot Q$ so that the geometric mean of $[Q^{\star-}]_{ii}$ equals 1.

^def-generalised-variance

Computation: avoid dense generalised inverse; for null space $V$ (e.g. $V=\mathbf 1$) add small $\epsilon$ to the diagonal and use the conditional-on-constraints marginal variances $\mathrm{Diag}(\mathrm{Var}(b\mid V^\top b=0))$ with sparse algebra (Rue & Held 2005, Sec. 3.2). INLA: `inla.scale.model(Q, constr=list(A=matrix(1,1,n), e=0))`. Scaling also matters for hypothesis testing on IGMRFs. The Leroux model cannot be scaled because the scale depends on $\phi$.

> [!definition] BYM2 model (eq. 7-8)
> $$b=\frac1{\sqrt{\tau_b}}\Big(\sqrt{1-\phi}\,v+\sqrt\phi\,u^\star\Big),\ v\sim N(0,I),\ u^\star\sim N(0,Q^{\star-}),\quad \mathrm{Var}(b)=\tau_b^{-1}\big((1-\phi)I+\phi Q^{\star-}\big).$$
> $\phi\in[0,1]$ is the proportion of marginal variance explained by the structured effect; $\phi=0$ pure overdispersion, $\phi=1$ Besag. Marginal variances are approximately $(1-\phi)/\tau_b+\phi/\tau_b=1/\tau_b$ (approximate because $Q^{\star-}$ equalises variances only in geometric mean).

^def-bym2

> [!definition] Sparsity-preserving augmented parameterisation (Sec. 3.4)
> The covariance in (8) contains $Q^{\star-}$, so its inverse is dense. Let $w=(w_1,w_2)$ with $w_2=u^\star$, $w_1=b$: $w_1\mid w_2\sim N\big(\sqrt{\phi/\tau_b}\,w_2,\ \frac{1-\phi}{\tau_b}I\big)$. Then $w$ has precision
> $$\begin{pmatrix}\frac{\tau_b}{1-\phi}I&-\frac{\sqrt{\phi\tau_b}}{1-\phi}I\\-\frac{\sqrt{\phi\tau_b}}{1-\phi}I&Q^\star+\frac{\phi}{1-\phi}I\end{pmatrix},$$
> sparse; $w_1$ has the correct marginal and $w_2$ is the structured component.

^def-sparse-bym2

## Examples

> [!example] Scaling factor on a 4x4 grid
> Compute the geometric-mean marginal variance of the Besag model on a 16-node grid graph and rescale: $\sigma^2_{GV}\approx0.4716$; after scaling the geometric mean is 1 (verified).

```python
import numpy as np
k = 4; n = k*k; A = np.zeros((n, n))
for i in range(k):
    for j in range(k):
        a = i*k + j
        if i+1 < k: A[a, a+k] = A[a+k, a] = 1
        if j+1 < k: A[a, a+1] = A[a+1, a] = 1
Q = np.diag(A.sum(1)) - A                       # Besag precision (connected graph, null space = 1)
c = np.exp(np.mean(np.log(np.diag(np.linalg.pinv(Q)))))   # sigma^2_GV for tau=1
Qs = Q * c                                      # scaled
print(c, np.exp(np.mean(np.log(np.diag(np.linalg.pinv(Qs))))))   # ~0.4716, 1.0
```

PyMC 5 BYM2 sketch (E18; untested; `pm.ICAR` requires the graph and a sum-to-zero soft constraint):
```python
import pymc as pm
with pm.Model():
    mu = pm.Normal("mu", 0, 1)
    tau_sd = pm.Exponential("sigma", 1/0.31)          # PC prior on sd: P(sigma > U)=alpha  -> rate = -log(alpha)/U
    phi = pm.Beta("phi", 0.5, 0.5)                    # placeholder; PC prior for phi is tabulated (see PC note)
    v = pm.Normal("v", 0, 1, shape=n)
    u = pm.ICAR("u", W=A, sigma=1.0, zero_sum_stdev=0.001) / np.sqrt(c)   # scale: Q* = c Q -> sd(u*) = sd(u)/sqrt(c)
    b = tau_sd * (pm.math.sqrt(1 - phi) * v + pm.math.sqrt(phi) * u)
    pm.Poisson("y", mu=E * pm.math.exp(mu + b), observed=y)
```
Check: with $Q^\star=cQ$ and $c=\sigma^2_{GV}$ from the code above, $\mathrm{Var}(u^\star)=Q^-/c$, so a unit-scale ICAR draw is divided by $\sqrt c$, as in the sketch.

Marketing note: with geo-level lift estimates $b_g$ on an adjacency graph, BYM2 yields a single interpretable $\phi$ ("how much of between-DMA heterogeneity is geographic") portable across country maps.

## Connections
[[Riebler 2016 - Penalised Complexity Priors for BYM2]] puts priors on $(\tau_b,\phi)$; [[Spatial Models - BYM]] explains the unscaled baseline.

## See Also
[[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]]
