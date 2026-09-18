---
title: Normalizing Flows as Conditional Density Estimators
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/concept
  - doc/paper
source: "[[raw/Papamakarios 2019 - Normalizing Flows for Probabilistic Modeling and Inference.pdf]]"
source_location: "Papamakarios, Nalisnick, Rezende, Mohamed & Lakshminarayanan (2019/2021 JMLR), Sec. 2.1 (pp. 2-4, Eqs. 1-6), Sec. 2.2 (pp. 4-5), Sec. 2.3.1-2.3.2 (pp. 6-8, Eqs. 13-19), Sec. 3.1 (pp. 12-23, Eqs. 29-34), Sec. 3.4 (pp. 29-30), Sec. 6.2.4 (pp. 48-49)"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
used_by:
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Likelihood Estimation and Sequential Neural Likelihood]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
aliases:
  - Conditional Normalizing Flows
  - Neural Density Estimators
  - Masked Autoregressive Flow
  - MAF
  - Neural Spline Flow
  - Flow-Based Conditional Density Estimation
---

# Normalizing Flows as Conditional Density Estimators

> [!summary]
> A **normalizing flow** defines a flexible density by pushing a simple base variable $u\sim p_u$ through an invertible, differentiable map $x = T(u)$ with a cheap Jacobian determinant, so that $p_x(x) = p_u(T^{-1}(x))\,|\det J_{T^{-1}}(x)|$ is *exact*, evaluable, and sampleable. Making the map depend on side information turns it into a **conditional density estimator**: $q_\phi(\theta\mid x)$ for [[Neural Posterior Estimation (NPE)|NPE]] or $q_\phi(x\mid\theta)$ for [[Neural Likelihood Estimation and Sequential Neural Likelihood|NLE]]. Papamakarios et al. call flows "a natural fit for likelihood-free inference." Two facts from the review govern their use in SBI: **fitting from samples is forward-KL minimization, i.e. maximum likelihood**, and **masked autoregressive flows are fast in one direction and $D$ times slower in the other**, which dictates which architecture suits which SBI target.

## Overview

[[Neural Simulation-Based Inference - Overview|Neural SBI]] needs a density model that (a) conditions on a vector, (b) can represent multimodal, skewed, truncated shapes, (c) gives exact log-densities for a maximum-likelihood loss, and (d) can be sampled. Mixture density networks (the original choice of Papamakarios & Murray 2016) satisfy these but scale poorly in the number of components. Flows satisfy all four by construction and have displaced them; the [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)|SBI benchmark]] uses Masked Autoregressive Flows and Neural Spline Flows throughout.

The name: "flow" is the trajectory samples follow through the chain $T = T_K\circ\cdots\circ T_1$; "normalizing" is the inverse direction, which takes data and "normalizes" it into the base density, usually a standard normal (Sec. 2.1). The review also makes a terminological point worth keeping: $u$ is not a *latent* variable, because "upon observing $x$, the corresponding $u = T^{-1}(x)$ is uniquely determined."

## Main Content

> [!definition] Flow-based model (Sec. 2.1, Eqs. 1-3) ^def-flow
> Let $x\in\mathbb R^D$ and $x = T(u)$ with $u\sim p_u(u)$, where $T$ is a **diffeomorphism** (invertible, with $T$ and $T^{-1}$ differentiable; $u$ must also be $D$-dimensional). Then
>
> $$
> p_x(x) = p_u(u)\,\big|\det J_T(u)\big|^{-1},\quad u = T^{-1}(x), \qquad\text{equivalently}\qquad p_x(x) = p_u\big(T^{-1}(x)\big)\,\big|\det J_{T^{-1}}(x)\big| .
> $$
>
> $|\det J_T(u)|$ is the local volume change: where $T$ expands a neighbourhood the density falls, where it contracts the density rises.

> [!theorem] Composition (Sec. 2.1, Eqs. 5-6) ^thm-composition
> Diffeomorphisms are closed under composition, with
>
> $$
> (T_2\circ T_1)^{-1} = T_1^{-1}\circ T_2^{-1}, \qquad \det J_{T_2\circ T_1}(u) = \det J_{T_2}\big(T_1(u)\big)\cdot\det J_{T_1}(u).
> $$
>
> So log-determinants *add* across layers, and a deep flow's log-density is a sum of cheap per-layer terms.

**Two operations, two costs.** "Sampling from the model requires the ability to sample from $p_u(u)$ and to compute the forward transformation $T$. Evaluating the model's density requires computing the inverse transformation $T^{-1}$ and its Jacobian determinant." "The application will dictate which of these operations need to be implemented and how efficient they need to be."

> [!theorem] Universality (Sec. 2.2) ^thm-universality
> If $p_x(x)>0$ everywhere and the conditional CDFs $\Pr(x_i'\le x_i\mid x_{<i})$ are differentiable, the map $z_i = F_i(x_i, x_{<i}) = \Pr(x_i'\le x_i\mid x_{<i})$ is a diffeomorphism with triangular Jacobian taking $p_x$ to the uniform distribution on $(0,1)^D$. Composing one such map with the inverse of another shows that a flow can turn any well-behaved base into any well-behaved target. Autoregressive flows implement this construction directly, so they "are universal approximators ... provided the transformer and the conditioner are flexible enough"; the authors caution that this "is just a statement of representational power and makes no guarantees about the flow's behavior in practice."

### Training: forward KL is what SBI uses

> [!definition] Forward KL = maximum likelihood (Sec. 2.3.1, Eqs. 13-14) ^def-forward-kl
> With samples $\{x_n\}$ from the target $p_x^*$ but no ability to evaluate it,
>
> $$
> \mathcal L(\theta) = D_{\mathrm{KL}}\big[p_x^*(x)\,\Vert\,p_x(x;\theta)\big] \approx -\frac1N\sum_{n=1}^N\Big[\log p_u\big(T^{-1}(x_n;\phi);\psi\big) + \log\big|\det J_{T^{-1}}(x_n;\phi)\big|\Big] + \text{const}.
> $$
>
> This needs only $T^{-1}$, its Jacobian determinant, and $p_u$: "we can train a flow model with maximum likelihood even if we are not able to compute $T$ or sample from $p_u$."

The **reverse KL** $D_{\mathrm{KL}}[p_x(x;\theta)\Vert p_x^*(x)]$ (Sec. 2.3.2, Eqs. 17-19) is the mirror image: it needs an evaluable (possibly unnormalized) target and a sampleable flow, and is the objective of variational inference with flows. This is the cleanest statement of the difference between [[Variational Inference and Pathfinder|VI]] and neural SBI: VI has the density and lacks samples, so it uses reverse KL; SBI has samples $(\theta_n,x_n)$ from the joint and lacks the density, so it uses forward KL. (A standard observation that the review itself does not make: the forward KL penalizes missing mass and so tends to over-cover, whereas the reverse KL tends to lock onto one mode; for a posterior approximation, over-dispersion is usually the less harmful error.)

### Autoregressive flows: transformer plus conditioner

> [!definition] Autoregressive flow (Sec. 3.1, Eqs. 29-32) ^def-ar-flow
>
> $$
> z_i' = \tau(z_i; h_i), \qquad h_i = c_i(z_{<i}),
> $$
>
> where the **transformer** $\tau$ is strictly monotonic in $z_i$ and the **conditioner** $c_i$ may be any function of the preceding dimensions (it "does not need to be a bijection"). The Jacobian is lower triangular, so
>
> $$
> \log\big|\det J_{f_\phi}(z)\big| = \sum_{i=1}^D\log\left|\frac{\partial\tau}{\partial z_i}(z_i;h_i)\right|,
> $$
>
> computable in $O(D)$.

**Transformers.** *Affine*: $\tau(z_i;h_i) = \alpha_i z_i+\beta_i$ with $\alpha_i = \exp\tilde\alpha_i$, giving $\log|\det J| = \sum_i\tilde\alpha_i$ (Eqs. 33-34). Simple, but a single affine autoregressive layer applied to a Gaussian yields conditionals that "will necessarily be Gaussian", and "it's unknown whether affine autoregressive flows with multiple layers are universal approximators or not." *Monotonic splines*: $K$ segments with learned knots and slopes; rational-quadratic splines (Durkan et al. 2019, the **Neural Spline Flow**) "are as fast to invert as to evaluate, while maintaining exact analytical invertibility", located by $O(\log K)$ binary search and arbitrarily flexible as $K$ grows.

**Conditioners.**
- *Masked* (MADE-style): one feed-forward network whose weight matrices are multiplied by binary masks so output $h_i$ sees only $z_{<i}$. All $h_i$ come out of one pass, so the forward direction is parallel; but inversion must proceed dimension by dimension and is "about $D$ times more expensive." This is the conditioner of **MAF** and **IAF**, which differ only in which direction is the fast one.
- *Coupling layers* (NICE, Real NVP, Glow): split $z = [z_{\le d}, z_{>d}]$, pass the first part through unchanged, and transform the second elementwise with parameters $F(z_{\le d})$. "Equally fast to evaluate or invert", but "the efficiency of coupling layers comes at the cost of reduced expressive power": a single coupling layer is not universal, so layers are stacked with permutations in between.

### Which direction must be fast in SBI?

| Use | Hot operation | Suitable flow |
|---|---|---|
| NLE: $q_\phi(x_o\mid\theta)$ inside an MCMC loop | density **evaluation**, thousands of times; sampling only for the goodness-of-fit diagnostic | MAF (fast evaluation, slow sampling), as chosen by the SNL paper |
| NPE: draw $10^4$ posterior samples per observation and evaluate $\log q_\phi(\theta_n\mid x_n)$ in training | **both** | coupling or spline flows; since $\dim\theta$ is small (tens at most), the $D\times$ penalty of MAF is also tolerable |

### Conditioning

In the SBI setting the conditioning vector (the data $x$ for NPE, the parameters $\theta$ for NLE) is fed as an extra input to every conditioner network, so the map $T(\cdot\,;\text{context})$ is a different diffeomorphism for each context while remaining invertible in its main argument. Sec. 6.2.4 states the recipe: generate $\{(\eta_n,x_n)\}$ from $p(\eta)p(x\mid\eta)$, then "fit a flow-based model $q(\eta\mid x)$ conditioned on $x$ ... in order to approximate the posterior", or "fit a flow-based model $q(x\mid\eta)$ conditioned on $\eta$ in order to approximate the intractable likelihood." For high-dimensional $x$ the context is first compressed by an embedding network trained jointly with the flow.

**Practicalities (Sec. 3.4).** Insert batch normalization between layers (it is itself an elementwise affine bijection with a trivial log-determinant, used in the SNL defaults) or activation normalization when batches are small. Because a flow is a diffeomorphism of $\mathbb R^D$ with a base density supported everywhere, a flow over a bounded parameter places some mass outside a uniform prior's support unless the parameter is first mapped to an unbounded space. The SBI benchmark reports the related finding for the MCMC-based methods: "(S)NLE and (S)NRE improved by transforming parameters to be unbounded: Without transformations, runs on some tasks can get stuck during MCMC sampling (e.g., Lotka-Volterra)" (Lueckmann et al. 2021, finding 6).

## Examples

**A one-layer conditional affine flow is heteroscedastic regression.** Let $\theta\in\mathbb R$, base $u\sim\mathcal N(0,1)$, and $\theta = \mu_\phi(x)+\exp(s_\phi(x))\,u$ with $\mu_\phi, s_\phi$ neural networks of the data. Then

$$
\log q_\phi(\theta\mid x) = \log\mathcal N\!\left(\frac{\theta-\mu_\phi(x)}{e^{s_\phi(x)}}\,\Big|\,0,1\right) - s_\phi(x),
$$

a Gaussian posterior approximation whose mean and scale are learned functions of $x$, exactly the single-component MDN of Papamakarios & Murray's Algorithm 1. Stacking $K$ such layers with autoregressive conditioners and swapping the affine $\tau$ for a rational-quadratic spline gives the Neural Spline Flow used for (S)NPE in the benchmark: "five flow transforms, two residual blocks of 50 hidden units each, ReLU non-linearity, and 10 bins" (Lueckmann et al. 2021, App. A.5). That benchmark found that "higher capacity density estimators were beneficial for posterior but not likelihood estimation."

```python
# conditional affine autoregressive layer (MAF-style), density direction
def log_prob(theta, context):
    u, logdet = theta, 0.0
    for layer in layers:                         # each layer: masked MLP -> (shift, log_scale)
        shift, log_scale = layer(u, context)     # h_i depends on u_{<i} and on the context only
        u = (u - shift) * torch.exp(-log_scale)  # inverse transform, parallel over dimensions
        logdet = logdet - log_scale.sum(-1)
    return standard_normal.log_prob(u).sum(-1) + logdet
```

## Connections

- [[Neural Posterior Estimation (NPE)]] - flows as $q_\phi(\theta\mid x)$; SNPE-C was designed specifically so flows could be used with proposals.
- [[Neural Likelihood Estimation and Sequential Neural Likelihood]] - conditional MAF as $q_\phi(x\mid\theta)$.
- [[Neural Ratio Estimation]] - the alternative that avoids density estimation and the invertibility constraint altogether.
- [[Variational Inference and Pathfinder]] - flows as variational families under the reverse KL; same architecture, opposite divergence, opposite requirement (density vs samples).
- [[Variational Posterior Estimator (Barber-Agakov)]] and [[Implicit Likelihood Estimator]] - amortized $q(\theta\mid y)$ and $q(y\mid\theta,d)$ in experimental design, for which a conditional flow is the natural high-capacity family.
- [[Synthetic Likelihood Construction]] - the zero-layer case: a Gaussian with $\theta$-dependent mean and covariance.

## See Also

- [[Amortized vs Sequential Inference]] - the conditional flow over *all* contexts is what amortization means operationally.
- [[The Typical Set and the Log Posterior Density]] - why density estimation in high dimensions is hard, and why NLE struggles with raw high-dimensional $x$.
- [[Approximation Methods]] - the BDA3 family of distributional approximations that flows generalize.
- [[Simulation-Based and Amortized Inference]] - where "neural density estimators" are named in the Bayesian Workflow book.
- [[Normalizing Flows for Variational Inference]] — reverse-KL vs forward-KL training of flows
