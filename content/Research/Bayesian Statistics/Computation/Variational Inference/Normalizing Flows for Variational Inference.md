---
title: Normalizing Flows for Variational Inference
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/machine-learning
  - topic/normalizing-flows
  - type/method
  - doc/paper
source: "[[raw/Rezende 2015 - Variational Inference with Normalizing Flows.pdf]]"
source_location: "Secs. 1-2; Sec. 3 (Eqs. 5-9); Sec. 4 (Eqs. 10-15, Alg. 1); Sec. 5 (Eqs. 16-19); Sec. 6 (Tables 1-3, Figs. 3-4); Appendix A"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
used_by:
  - "[[Variational Inference - Overview]]"
aliases:
  - Planar Flow
  - Radial Flow
  - Flow-Based Variational Posterior
  - Variational Inference with Normalizing Flows
---

# Normalizing Flows for Variational Inference

> [!summary]
> The quality of VI is capped by the family $\mathcal Q$: with mean-field or Gaussian families "no solution is ever able to resemble the true posterior distribution," so, "unlike other inferential methods such as MCMC, even in the asymptotic regime we are unable [to] recover the true posterior" (Rezende & Mohamed 2015, Sec. 1). A **normalizing flow** enriches the family by pushing a simple base density $q_0$ through a chain of invertible maps $f_K\circ\dots\circ f_1$; the change-of-variables formula keeps the density computable, $\ln q_K(z_K)=\ln q_0(z_0)-\sum_k\ln|\det\partial f_k/\partial z_{k-1}|$. Choosing maps with $O(D)$ Jacobian determinants (**planar** and **radial** flows) gives a scalable, arbitrarily flexible, reparameterizable posterior that drops into the [[Reparameterization Trick and Variational Autoencoders|amortized VI]] training loop unchanged.

## Overview

The earlier notes locate VI's two characteristic failures, under-dispersion and inability to represent correlation, skew or multimodality, in the family rather than the optimizer. Rezende & Mohamed cite Turner & Sahani (2011) for both: variance under-estimation "can result in poor predictions and unreliable decisions," and limited posteriors "can also result in biases in the MAP estimates of any model parameters" (e.g. in time-series models). Prior remedies were structured mean-field (add some dependencies) and mixture posteriors, the latter requiring likelihood and gradient evaluations per mixture component per update.

Flows attack the problem from the direction [[Automatic Differentiation Variational Inference (ADVI)#^thm-optimal-transform|ADVI's optimal-transform result]] points to. ADVI uses a *fixed* transform $T$ plus a Gaussian and notes that the ideal $T^*=\Phi^{-1}\circ P(\theta\mid x)$ would make the Gaussian exact but is unknowable. A flow *learns* a parametric transform by maximizing the ELBO; Kucukelbir et al. cite exactly this paper as the way to "improve accuracy" by "a cascade of simple transformations."

## Main Content

> [!definition] Normalizing flow ^def-normalizing-flow
> For an invertible smooth $f:\mathbb R^d\to\mathbb R^d$ and $z'=f(z)$ with $z\sim q(z)$,
> $$
> q(z')=q(z)\left|\det\frac{\partial f^{-1}}{\partial z'}\right|=q(z)\left|\det\frac{\partial f}{\partial z}\right|^{-1}
> $$
> (Eq. 5). Composing $K$ maps, $z_K=f_K\circ\dots\circ f_1(z_0)$,
> $$
> \ln q_K(z_K)=\ln q_0(z_0)-\sum_{k=1}^K\ln\left|\det\frac{\partial f_k}{\partial z_{k-1}}\right|
> $$
> (Eqs. 6-7). "The path traversed by the random variables $z_k=f_k(z_{k-1})$... is called the flow and the path formed by the successive distributions $q_k$ is a normalizing flow." Each map acts as a local **expansion** (lowering density) or **contraction** (raising it).

> [!theorem] Law of the unconscious statistician for flows ^thm-lotus
> $$
> \mathbb E_{q_K}[h(z)]=\mathbb E_{q_0}\big[h(f_K\circ\dots\circ f_1(z_0))\big]
> $$
> (Eq. 8), with no Jacobian needed when $h$ does not depend on $q_K$. A flow is therefore *automatically reparameterized*: sample $z_0$ from the base (itself $\mu+\sigma\odot\epsilon$), push it through differentiable maps, and backpropagate. It is the [[Reparameterization Trick and Variational Autoencoders#^thm-reparameterization|reparameterization trick]] with a deeper $g_\phi$.

The obstacle is cost: a generic invertible network layer has an $O(D^3)$ Jacobian determinant. The paper's contribution is two map families whose determinant is $O(D)$.

> [!definition] Planar and radial flows ^def-planar-radial
> **Planar:** $f(z)=z+u\,h(w^\top z+b)$ with $\lambda=\{w,u\in\mathbb R^D,\,b\in\mathbb R\}$ and smooth elementwise $h$ (e.g. $\tanh$). With $\psi(z)=h'(w^\top z+b)\,w$, the matrix determinant lemma gives
> $$
> \left|\det\frac{\partial f}{\partial z}\right|=\big|1+u^\top\psi(z)\big|,\qquad\ln q_K(z_K)=\ln q_0(z)-\sum_{k=1}^K\ln\big|1+u_k^\top\psi_k(z_{k-1})\big|
> $$
> (Eqs. 10-13). It contracts or expands density perpendicular to the hyperplane $w^\top z+b=0$. Invertibility with $h=\tanh$ requires $w^\top u\ge-1$, enforced by reparameterizing $u$ (Appendix A).
> **Radial:** $f(z)=z+\beta\,h(\alpha,r)(z-z_0)$ with $r=|z-z_0|$, $h(\alpha,r)=1/(\alpha+r)$, and
> $$
> \det\frac{\partial f}{\partial z}=\big[1+\beta h(\alpha,r)\big]^{d-1}\big[1+\beta h(\alpha,r)+\beta h'(\alpha,r)\,r\big]
> $$
> (Eq. 14): contraction or expansion around a reference point $z_0$.
> Two successive transformations already turn a spherical Gaussian into a bimodal density (Fig. 1).

> [!theorem] Flow-based free energy bound ^thm-flow-bound
> With $q_\phi(z\mid x):=q_K(z_K)$, the negative ELBO is
> $$
> \mathcal F(x)=\mathbb E_{q_0(z_0)}[\ln q_0(z_0)]-\mathbb E_{q_0(z_0)}[\log p(x,z_K)]-\mathbb E_{q_0(z_0)}\Big[\sum_{k=1}^K\ln\big|1+u_k^\top\psi_k(z_{k-1})\big|\Big]
> $$
> (Eq. 15). In the amortized setting an inference network maps $x$ to the base parameters $(\mu,\sigma)$ *and* to the flow parameters $\lambda$. Cost is $O(LN^2)+O(KD)$ for $L$ deterministic layers of width $N$, flow length $K$ and latent dimension $D$ (Sec. 4.3). Training (Algorithm 1) is [[Reparameterization Trick and Variational Autoencoders#^alg-aevb|AEVB]] with one extra line: $z_K\leftarrow f_K\circ\dots\circ f_1(z_0)$.

**Infinitesimal flows and the asymptotic claim (Sec. 3.2).** Letting the flow length go to infinity gives a density evolving under a PDE. For the **Langevin flow** $dz=-\nabla_z\mathcal L(z)\,dt+\sqrt2\,d\xi$ with $\mathcal L$ the negative unnormalized log posterior, the Fokker-Planck stationary solution is $q_\infty(z)\propto e^{-\mathcal L(z)}$, "i.e. the true posterior." **Hamiltonian flow** on an augmented space $(z,\omega)$ is the dynamics of [[Efficient MCMC|HMC]]. This yields a unifying view (Sec. 5): NICE (Dinh et al. 2014) is a *finite volume-preserving* flow with coupling layers $f(z)=(z_A,\,z_B+h_\lambda(z_A))$ and unit Jacobian; Hamiltonian variational inference (Salimans et al. 2015) is an *infinitesimal volume-preserving* flow that converges to the posterior but needs likelihood gradients at every step, at both training and test time.

### Evidence (Sec. 6)

- **2-D test densities** $p(z)\propto e^{-U(z)}$ with multimodality and periodicity (Table 1): planar flows with $K=2,8,32$ show "a substantial improvement in the approximation quality as we increase the flow length"; NICE reaches similar asymptotic quality but planar flows need "far fewer parameters" (Fig. 3).
- **Binarized MNIST**, deep latent Gaussian model with 40 latents, bound on $-\ln p(x)$ (Table 2): diagonal-covariance baseline $\le89.9$; planar NF $\le87.5,\,86.5,\,85.7,\,85.1$ for $K=10,20,40,80$; NICE $\le88.6,\,87.9,\,87.3,\,87.2$ for the same $K$. Increasing flow length "systematically improves the bound" and "reduces the KL-divergence between the approximate posterior $q(z\mid x)$ and the true posterior" (Fig. 4).
- **CIFAR-10 patches**, 30 latents (Table 3): the reported $-\ln p(x)$ improves monotonically from $-293.7$ ($K=0$) to $-320.7$ ($K=10$).
- Training used an **annealed** free energy, $\beta_t=\min(1,\,0.01+t/10000)$ multiplying the $\log p(x,z_K)$ term, which the authors found "to provide better results": flexible posteriors are harder to optimize.

## Examples

> [!example] A planar flow layer ^ex-planar-code
> ```python
> import torch, torch.nn as nn, torch.nn.functional as F
>
> class Planar(nn.Module):
>     def __init__(self, D):
>         super().__init__()
>         self.u, self.w = nn.Parameter(torch.randn(D) * 0.01), nn.Parameter(torch.randn(D) * 0.01)
>         self.b = nn.Parameter(torch.zeros(1))
>
>     def forward(self, z):                         # z: (S, D)
>         wu = self.w @ self.u                      # enforce w^T u >= -1 (Appendix A)
>         u_hat = self.u + ((-1 + F.softplus(wu)) - wu) * self.w / (self.w @ self.w)
>         a = z @ self.w + self.b                   # (S,)
>         f = z + u_hat * torch.tanh(a)[:, None]
>         psi = (1 - torch.tanh(a) ** 2)[:, None] * self.w
>         logdet = torch.log(torch.abs(1 + psi @ u_hat) + 1e-8)
>         return f, logdet
>
> def neg_elbo(log_joint, mu, log_sig, flows, S=64):
>     eps = torch.randn(S, mu.numel())
>     z = mu + log_sig.exp() * eps                  # base draw, reparameterized
>     logq = (-0.5 * eps**2 - log_sig - 0.9189385).sum(1)
>     for fl in flows:
>         z, ld = fl(z); logq = logq - ld           # Eq. 13
>     return (logq - log_joint(z)).mean()           # Eq. 15
> ```
> Used on a fixed-dimensional Bayesian posterior (no encoder), this is "ADVI with a learned transform." Banana-shaped or funnel-shaped posteriors, the kind produced by multiplicative saturation-times-coefficient terms in a media mix model or by hierarchical scales, are the natural targets.

**Practical caveats.** A more flexible $\mathcal Q$ makes the ELBO surface harder (the annealing above; the [[Variational Inference and Pathfinder|Bayesian Workflow book]]: "the richer the family of approximations, the more challenging the optimization"). Reverse KL remains mode-seeking, so a flow *can* represent several modes but is not guaranteed to find them. Planar flows are weak per layer in high dimension, which is why later architectures (coupling, autoregressive and spline flows; see [[Normalizing Flows as Conditional Density Estimators]]) dominate in practice. And a flow posterior still needs the same verification as any other: [[Diagnosing Variational Inference (PSIS k-hat and VSBC)|$\hat k$]] works unchanged because $q_K$ has a computable density.

## Connections

- [[Automatic Differentiation Variational Inference (ADVI)]] - fixed transform plus Gaussian; flows are the learned generalization.
- [[Reparameterization Trick and Variational Autoencoders]] - the training loop and the amortized encoder that flows plug into.
- [[The ELBO and KL Divergence Minimization]] - the free energy $\mathcal F=-\mathrm{ELBO}$ with added log-determinant terms.
- [[Normalizing Flows as Conditional Density Estimators]] - the same construction trained by maximum likelihood on simulations (forward KL) rather than by the ELBO (reverse KL).
- [[Neural Simulation-Based Inference - Overview]] - where conditional flows serve as amortized posteriors for simulators and ABMs.
- [[Efficient MCMC]] - Hamiltonian dynamics as an infinitesimal volume-preserving flow.

## See Also

- [[Variational Inference and Pathfinder]] - cites "transformation flow" families as the rich end of the family/optimization trade-off.
- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] - the restricted family whose limitations motivate flows.
- [[Variational Inference - Overview]] - cluster map.
