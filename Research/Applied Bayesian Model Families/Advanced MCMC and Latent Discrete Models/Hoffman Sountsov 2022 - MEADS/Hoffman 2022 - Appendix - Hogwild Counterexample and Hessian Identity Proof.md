---
title: "Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]"
source_location: "Appendices D-E, pp. 14-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Sountsov 2022 - MEADS"
doc_type: paper
depends_on:
  - "[[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]"
  - "[[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]"
used_by:
aliases:
  - "Hogwild ECA counterexample"
  - "Proof of expected negative Hessian equals gradient outer product"
---

# Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof

> [!summary]
> Two appendices with full arguments: (D) a two-bit XOR kernel that is exactly valid when applied one state at a time but collapses to the absorbing state $(0,0)$ when applied to both states simultaneously, showing why "hogwild" ECA is invalid; (E) a proof that $\mathbb E_p[-\nabla^2\log p]=\mathbb E_p[(\nabla\log p)^\top\nabla\log p]$ under boundary-vanishing conditions.

## Overview

These justify two design constraints of MEADS: fold-based parallel ECA ([[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]) and estimating the Hessian from gradients ([[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]).

## Main Content

> [!example] Appendix D: hogwild adaptation fails
> Two independent uniform bits $x_0,x_1\in\{0,1\}$, $p(x)=\tfrac14$. Kernel for updating one state given the other: $x_i'=\text{XOR}(x_i,x_{1-i})$.
> - **One at a time is valid.** Holding $x_{1-i}$ fixed, the two possible maps ($\text{XOR}(x_i,0)=x_i$ and $\text{XOR}(x_i,1)=1-x_i$) are both reversible with respect to the uniform distribution, so alternating updates leave the uniform distribution invariant.
> - **Simultaneous (hogwild) is wrong.** $x_0'=\text{XOR}(x_0,x_1)=x_1'$, so after one iteration the two states are identical; another iteration sends both to 0 ($\text{XOR}(0,0)=\text{XOR}(1,1)=0$). After two iterations the chain is stuck in absorbing state $x_0=x_1=0$.
> - The one-at-a-time chain is neither ergodic nor aperiodic, which can be fixed by occasionally (probability 0.01) applying a kernel that resamples $x_0,x_1$ uniformly; the hogwild version then still has a stationary distribution heavily biased toward $x_0=x_1=0$ since resampling is rare.
^ex-hogwild-xor

```python
import random
def run(hogwild, steps=20000, p_reset=0.01):
    x=[random.randint(0,1), random.randint(0,1)]; zeros=0
    for _ in range(steps):
        if random.random()<p_reset: x=[random.randint(0,1), random.randint(0,1)]
        elif hogwild: x=[x[0]^x[1], x[1]^x[0]]
        else:
            i=random.randint(0,1); x[i]=x[i]^x[1-i]
        zeros += (x==[0,0])
    return zeros/steps
print(run(False), run(True))   # about 0.26 vs about 0.99: hogwild is badly biased
```
(The snippet is a direct implementation of the appendix description; the one-at-a-time version targets 0.25 for the state $(0,0)$.)

> [!theorem] Appendix E: expected negative Hessian equals expected score outer product (eq. 10)
> Let $p$ be twice differentiable almost everywhere and continuous, with $p(\theta_i\mid\theta_{\setminus i})\to0$ as $|\theta_i|\to\infty$ for each $i$. Then
> $$-\int p(\theta)\nabla^2\log p(\theta)\,d\theta=\int p(\theta)\Big(\frac{\partial\log p}{\partial\theta}\Big)^{\!\top}\frac{\partial\log p}{\partial\theta}\,d\theta.$$
> *Proof.* Since $\nabla^2p=\frac{\partial}{\partial\theta}\big(p\,\nabla\log p\big)=p\big[(\partial\log p/\partial\theta)^\top(\partial\log p/\partial\theta)+\nabla^2\log p\big]$ (eq. 11), it suffices to show $\int\nabla^2_{\theta_i,\theta_j}p\,d\theta=0$ for all $i,j$. For $i\ne j$: write $\int\nabla_{\theta_i}\nabla_{\theta_j}p\,d\theta=\int p(\theta_{\setminus i,j})\int\nabla_{\theta_i}p(\theta_i\mid\theta_{\setminus i,j})\Big[\int_{-\infty}^\infty\nabla_{\theta_j}p(\theta_j\mid\theta_{\setminus j})d\theta_j\Big]\dots=0$, because $\int_{-\infty}^\infty\nabla_{\theta_j}p(\theta_j\mid\theta_{\setminus j})d\theta_j=0$ by the fundamental theorem of calculus and the vanishing boundary condition. For $i=j$: $\int\nabla_{\theta_i}\nabla_{\theta_i}p\,d\theta=\int p(\theta_{\setminus i})\int_{-\infty}^\infty\nabla_{\theta_i}\nabla_{\theta_i}p(\theta_i\mid\theta_{\setminus i})d\theta_id\theta_{\setminus i}=0$ because the first derivative also vanishes at $\pm\infty$. $\square$
^thm-hessian-identity

> [!example] One-dimensional sanity check
> For $p=\mathcal N(0,\sigma^2)$: $\nabla\log p=-\theta/\sigma^2$, $\nabla^2\log p=-1/\sigma^2$. Then $-\mathbb E[\nabla^2\log p]=1/\sigma^2$ and $\mathbb E[(\nabla\log p)^2]=\mathbb E[\theta^2]/\sigma^4=1/\sigma^2$. The two sides agree, and $1/\sigma^2$ is the $\lambda_{\max}(H)$ that MEADS wants for the step size.
^ex-hessian-1d

## Connections

[[Hoffman 2022 - MEADS - Overview]] lists where each appendix is used. For the importance of boundary decay in funnels (where it can fail numerically) see [[Betancourt 2015 - Hierarchical Geometry and the Funnel]].

## See Also
[[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]], [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]
