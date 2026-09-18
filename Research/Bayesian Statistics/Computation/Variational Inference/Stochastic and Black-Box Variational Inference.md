---
title: Stochastic and Black-Box Variational Inference
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/stochastic-optimization
  - type/method
  - doc/paper
source:
  - "[[raw/Blei 2017 - Variational Inference A Review for Statisticians.pdf]]"
  - "[[raw/Ranganath 2014 - Black Box Variational Inference.pdf]]"
  - "[[raw/Kucukelbir 2017 - Automatic Differentiation Variational Inference.pdf]]"
source_location: "Blei et al. 2017 Sec. 4.3 (Eqs. 51-58, Alg. 3, pp. 19-22), Sec. 5.3; Ranganath et al. 2014 Secs. 2-4 (Eqs. 1-11, Algs. 1-2); Kucukelbir et al. 2017 Sec. 3.2 (Fig. 8); Kingma & Welling 2013 Sec. 2.2"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Mean-Field Family and Coordinate Ascent VI (CAVI)]]"
used_by:
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
  - "[[Normalizing Flows for Variational Inference]]"
aliases:
  - Stochastic Variational Inference
  - SVI
  - Black Box Variational Inference
  - BBVI
  - Score Function Gradient Estimator
  - REINFORCE Gradient Estimator
---

# Stochastic and Black-Box Variational Inference

> [!summary]
> Two independent sources of stochasticity turned VI from a model-by-model derivation into a general-purpose tool. **Stochastic variational inference (SVI)** (Hoffman et al. 2013; Blei et al. 2017, Sec. 4.3) subsamples *data*: for conditionally conjugate models the natural gradient of the ELBO is "coordinate update minus current value," and a single rescaled data point gives an unbiased estimate of it. **Black-box variational inference (BBVI)** (Ranganath et al. 2014) samples *latent variables*: it writes $\nabla_\lambda\mathrm{ELBO}=\mathbb E_q[\nabla_\lambda\log q(z\mid\lambda)\,(\log p(x,z)-\log q(z\mid\lambda))]$ and estimates it by Monte Carlo, requiring only evaluations of $\log p(x,z)$. The score-function estimator is fully general but high-variance, which is why differentiable models use the [[Reparameterization Trick and Variational Autoencoders|reparameterization gradient]] instead.

## Overview

[[Mean-Field Family and Coordinate Ascent VI (CAVI)|CAVI]] has two costs. *Computational:* "the coordinate ascent structure of the algorithm requires iterating through the entire data set at each iteration" (Blei et al., Sec. 4.3). *Human:* every new model needs its expectations derived by hand, and for nonconjugate models (even Bayesian logistic regression, Sec. 5.3) those expectations have no closed form. Ranganath et al. describe the second cost as "tedious bookkeeping" that "hinders us from rapidly exploring modeling assumptions."

Both costs are removed by the same idea: replace exact gradients of the [[The ELBO and KL Divergence Minimization|ELBO]] with **noisy unbiased gradients** and use stochastic approximation.

> [!theorem] Robbins-Monro conditions ^thm-robbins-monro
> Stochastic gradient ascent $\lambda_{t+1}=\lambda_t+\rho_t\,\hat g_t$ with $\mathbb E[\hat g_t]=\nabla f(\lambda_t)$ converges to a (local) optimum when the step sizes satisfy
> $$
> \sum_t\rho_t=\infty,\qquad\sum_t\rho_t^2<\infty,
> $$
> e.g. $\rho_t=t^{-\kappa}$ with $\kappa\in(0.5,1]$ (Blei et al., Eq. 58; Ranganath et al., Sec. 2). In practice both papers use adaptive per-coordinate rates (AdaGrad, $\rho_t=\eta\,\mathrm{diag}(G_t)^{-1/2}$ with $G_t$ the running sum of gradient outer products), which shrink the step where gradient variance is large.

## Main Content

### Stochastic VI: subsampling the data

Setting: the conditionally conjugate model of [[Mean-Field Family and Coordinate Ascent VI (CAVI)#^thm-expfam|the CAVI note]] with global variational parameter $\lambda$, local parameters $\varphi_i$, and conjugate-prior natural parameter $\alpha$.

> [!theorem] Natural gradient of the ELBO ^thm-natural-gradient
> The Euclidean gradient is $\nabla_\lambda\mathrm{ELBO}=a''(\lambda)\big(\mathbb E_\varphi[\hat\alpha]-\lambda\big)$, where $\mathbb E_\varphi[\hat\alpha]$ is the CAVI global update. The **natural gradient** premultiplies by the inverse Fisher information $a''(\lambda)^{-1}$ (the inverse covariance of the sufficient statistic), giving
> $$
> g(\lambda)=\mathbb E_\varphi[\hat\alpha]-\lambda
> $$
> (Blei et al., Eqs. 51-52). Natural gradients "warp the parameter space in a sensible way, so that moving the same distance in different directions amounts to equal change in symmetrized KL divergence." A step of size $\varepsilon_t$ is a convex combination: $\lambda_t=(1-\varepsilon_t)\lambda_{t-1}+\varepsilon_t\,\mathbb E_\varphi[\hat\alpha]$ (Eq. 54).

Since $\mathbb E_\varphi[\hat\alpha]=\alpha+[\sum_i\mathbb E_{\varphi_i^*}[t(z_i,x_i)],\,n]^\top$ is a sum over data, sample one index $t\sim\text{Unif}(1,\dots,n)$ and rescale:
$$
\hat g(\lambda)=\alpha+n\big[\mathbb E_{\varphi_t^*}[t(z_t,x_t)],\,1\big]^\top-\lambda,\qquad\mathbb E_t[\hat g(\lambda)]=g(\lambda)
$$
(Eqs. 56-57).

> [!algorithm] SVI for conditionally conjugate models (Blei et al., Algorithm 3) ^alg-svi
> Initialize $\lambda_0$; choose step sizes $\varepsilon_t$ satisfying Robbins-Monro. Repeat:
> 1. Sample a data point $t\sim\text{Unif}(1,\dots,n)$ (or a minibatch).
> 2. Optimize its local parameters, $\varphi_t^*=\mathbb E_\lambda[\eta(\beta,x_t)]$.
> 3. Form the coordinate update *as though $x_t$ were repeated $n$ times*: $\hat\lambda=\alpha+n\,\mathbb E_{\varphi_t^*}[t(z_t,x_t)]$.
> 4. $\lambda\leftarrow(1-\varepsilon_t)\lambda+\varepsilon_t\hat\lambda$.
>
> "SVI requires no new derivation beyond what is needed for CAVI. Any implementation of CAVI can be immediately scaled up to a stochastic algorithm."

The showcase is latent Dirichlet allocation on **1.8M New York Times articles** (Blei et al., Fig. 7), where CAVI-era topic models handled only thousands to tens of thousands of documents.

### Black-box VI: sampling the latent variables

> [!theorem] Score-function gradient of the ELBO ^thm-score-gradient
> For a variational family $q(z\mid\lambda)$,
> $$
> \nabla_\lambda\mathcal L=\mathbb E_{q}\Big[\nabla_\lambda\log q(z\mid\lambda)\,\big(\log p(x,z)-\log q(z\mid\lambda)\big)\Big],
> $$
> with Monte Carlo estimate $\frac1S\sum_{s=1}^S\nabla_\lambda\log q(z_s\mid\lambda)\big(\log p(x,z_s)-\log q(z_s\mid\lambda)\big)$, $z_s\sim q(\cdot\mid\lambda)$ (Ranganath et al., Eqs. 2-3). The derivation uses $\nabla_\lambda q=q\,\nabla_\lambda\log q$ (the log-derivative identity) and the fact that the **score** has mean zero, $\mathbb E_q[\nabla_\lambda\log q(z\mid\lambda)]=0$.

Why "black box": "the score function and sampling algorithms depend only on the variational distribution, not the underlying model." The practitioner supplies a function returning $\log p(x,z)$; nothing else about the model is used, not even its gradient. Discrete latent variables are therefore allowed, which the reparameterization approach cannot handle.

The catch is variance. Kingma & Welling (2013, Sec. 2.2) call this "naive" estimator one that "exhibits very high variance... and is impractical for our purposes." Ranganath et al. agree that the raw estimator's variance "can be too large to be useful" and add two model-agnostic variance reductions.

> [!definition] Rao-Blackwellization ^def-rao-blackwell
> Replace a function by its conditional expectation: $\hat J(X)=\mathbb E[J(X,Y)\mid X]$ has the same mean and variance reduced by $\mathbb E[(J-\hat J)^2]$. For a mean-field family $q(z\mid\lambda)=\prod_i q(z_i\mid\lambda_i)$, integrating out everything outside the Markov blanket of $z_i$ gives
> $$
> \nabla_{\lambda_i}\mathcal L=\mathbb E_{q_{(i)}}\Big[\nabla_{\lambda_i}\log q(z_i\mid\lambda_i)\big(\log p_i(x,z_{(i)})-\log q(z_i\mid\lambda_i)\big)\Big],
> $$
> where $p_i$ collects only the factors of the joint that involve $z_i$ (Ranganath et al., Eq. 5). No model-specific integral is needed: one simply drops the irrelevant terms of $\log p$.

> [!definition] Control variates ^def-control-variate
> For any $h$ with known mean, $\hat f(z)=f(z)-a\,(h(z)-\mathbb E[h(z)])$ has $\mathbb E[\hat f]=\mathbb E[f]$ and $\operatorname{Var}(\hat f)=\operatorname{Var}(f)+a^2\operatorname{Var}(h)-2a\operatorname{Cov}(f,h)$, minimized at $a^*=\operatorname{Cov}(f,h)/\operatorname{Var}(h)$ (Ranganath et al., Eq. 7). BBVI uses the score itself, $h=\nabla_\lambda\log q(z\mid\lambda)$, whose mean is exactly zero for every family; $a^*$ is estimated from the same samples. Algorithm 2 of the paper combines both reductions with AdaGrad and data subsampling ("doubly stochastic").

### Score-function versus reparameterization gradients

| | Score function (BBVI) | Reparameterization (ADVI, VAE) |
|---|---|---|
| Needs from model | $\log p(x,z)$ values | $\nabla_z\log p(x,z)$ |
| Needs from $q$ | $\nabla_\lambda\log q$, sampler | differentiable sampler $z=g_\lambda(\epsilon)$ |
| Discrete $z$ | Yes | No |
| Variance | High; needs Rao-Blackwellization and control variates | Low; "a single sample suffices" |

Kucukelbir et al. (2017, Sec. 3.2, Fig. 8) compare the two on a univariate model with a $\text{Gamma}(10,10)$ posterior and on a 100-dimensional nonlinear regression with likelihood $\mathcal N(y\mid\tanh(x^\top\beta),I)$. Across $M=1$ to $10^3$ Monte Carlo samples the reparameterization gradient has lower variance than BBVI, including BBVI with control variates: "While BBVI is more general... its gradients can suffer from high variance." The intuition is that the score estimator only learns about $\log p$ through scalar values at sampled points, while the pathwise estimator uses the model's gradient, which says in which direction to move each sample. The ADVI authors suggest the score estimator as the route to discrete latents, "with some care as these gradients will exhibit higher variance" (Sec. 5).

## Examples

> [!example] BBVI in a dozen lines ^ex-bbvi-code
> Mean-field Gaussian $q$, score-function gradient with the score as control variate (per-coordinate $a^*$):
>
> ```python
> import numpy as np
>
> def bbvi_step(log_joint, mu, log_sig, S=200, lr=0.01, rng=np.random.default_rng()):
>     sig = np.exp(log_sig)
>     z = mu + sig * rng.standard_normal((S, mu.size))          # z_s ~ q
>     logq = -0.5 * (((z - mu) / sig) ** 2).sum(1) - log_sig.sum()
>     w = np.array([log_joint(zs) for zs in z]) - logq          # log p(x,z) - log q(z)
>     score = np.hstack([(z - mu) / sig**2,                     # d log q / d mu
>                        ((z - mu) / sig) ** 2 - 1.0])          # d log q / d log_sig
>     f = score * w[:, None]
>     a = (((f - f.mean(0)) * (score - score.mean(0))).mean(0)
>          / score.var(0))                                      # a* = Cov(f,h)/Var(h)
>     grad = (f - a * score).mean(0)
>     return mu + lr * grad[:mu.size], log_sig + lr * grad[mu.size:]
> ```
>
> `log_joint` is never differentiated. Swap the Gaussian for a Gamma or a categorical and only `logq`, `score` and the sampler change, which is the sense in which the method is a reusable library.

**Applied reading.** Ranganath et al. fit several Gamma and Gamma-Normal time-series factor models to longitudinal lab data from 976 chronic kidney disease patients (33K visits, 17 lab measurements), using 1,000 samples and batch size 25. Against Metropolis-Hastings-within-Gibbs on a 20-hour budget, BBVI reached better held-out predictive likelihood faster (their Fig. 1). The variance study (Sec. 5.4, Fig. 2) found that Rao-Blackwellization "reduces the variance by several orders of magnitude," control variates reduce it further, and the plain estimator of Algorithm 1 "failed to make noticeable progress" in the time allotted. The broader point of that study is *workflow*: models "generally outside the realm of variational methods" could be proposed, fitted and compared by predictive likelihood without new derivations. This is the same iterate-quickly argument the [[Approximate Algorithms and Approximate Models|Bayesian Workflow]] literature makes for approximate computation in early model building.

## Connections

- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] - SVI reuses its local and global updates verbatim.
- [[The ELBO and KL Divergence Minimization]] - the objective whose gradient is being estimated.
- [[Reparameterization Trick and Variational Autoencoders]] - the low-variance alternative gradient for continuous latents.
- [[Automatic Differentiation Variational Inference (ADVI)]] - black-box VI specialized to differentiable models in Stan, with its own step-size sequence.
- [[Variational Posterior Estimator (Barber-Agakov)]] and [[Variational BOED - Overview]] - stochastic-gradient optimization of a variational bound, applied to expected information gain.

## See Also

- [[Divide-and-Conquer Algorithms]] - the MCMC-side answer to large data (partition, fit, combine), versus VI's subsampling.
- [[Efficient MCMC]] - gradient-based sampling; note HMC needs full-data gradients, one reason SVI scales where NUTS does not.
- [[Variational Inference - Overview]] - cluster map.
