---
title: Reparameterization Trick and Variational Autoencoders
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/machine-learning
  - topic/deep-generative-models
  - type/method
  - doc/paper
source: "[[raw/Kingma 2013 - Auto-Encoding Variational Bayes.pdf]]"
source_location: "Secs. 1-2 (Eqs. 1-8, Alg. 1, pp. 1-5); Sec. 2.4; Sec. 3 (Eqs. 9-10); Sec. 4; Sec. 5 (Figs. 2-3); Appendices B, C, F"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Stochastic and Black-Box Variational Inference]]"
  - "[[Factor Analysis and PPCA]]"
used_by:
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
  - "[[Normalizing Flows for Variational Inference]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - Reparameterization Trick
  - Pathwise Gradient Estimator
  - Variational Autoencoder
  - VAE
  - Auto-Encoding Variational Bayes
  - AEVB
  - SGVB Estimator
  - Amortized Variational Inference
---

# Reparameterization Trick and Variational Autoencoders

> [!summary]
> Kingma & Welling (2013) make two contributions that bridge Bayesian VI and deep generative modeling. **(1) The reparameterization trick:** write a draw from $q_\phi(z\mid x)$ as a deterministic, differentiable function of parameter-free noise, $z=g_\phi(\epsilon,x)$ with $\epsilon\sim p(\epsilon)$, so that $\nabla_\phi\mathbb E_{q_\phi}[f(z)]=\mathbb E_{p(\epsilon)}[\nabla_\phi f(g_\phi(\epsilon,x))]$ can be estimated by ordinary backpropagation with low variance (the **SGVB** estimator). **(2) Amortized inference:** instead of separate variational parameters per data point, train a single **recognition model** (encoder) $q_\phi(z\mid x)$ jointly with the generative model (decoder) $p_\theta(x\mid z)$ on minibatches (the **AEVB** algorithm). With neural networks for both, the result is the **variational autoencoder (VAE)**, whose loss is exactly the [[The ELBO and KL Divergence Minimization|ELBO]] in its "reconstruction minus KL-to-prior" form.

## Overview

The setting differs from the fully Bayesian one of [[Automatic Differentiation Variational Inference (ADVI)|ADVI]] in where the latent variables live. Here each of $N$ i.i.d. data points $x^{(i)}$ has its **own** continuous latent $z^{(i)}$, generated as $z^{(i)}\sim p_\theta(z)$, $x^{(i)}\sim p_\theta(x\mid z)$. The global parameters $\theta$ are estimated by (approximate) maximum likelihood or MAP; VI is applied to the $z^{(i)}$. This is *variational EM* with a learned E-step. (Appendix F of the paper gives the fully Bayesian variant that also places a variational posterior on $\theta$, which is structurally ADVI.)

Kingma & Welling design for the case where everything classical fails at once (Sec. 2.1):

1. **Intractability.** $p_\theta(x)=\int p_\theta(z)p_\theta(x\mid z)\,dz$ is intractable, so is $p_\theta(z\mid x)$ (no EM), and so are the expectations that [[Mean-Field Family and Coordinate Ascent VI (CAVI)|mean-field VB]] would need. This happens as soon as the likelihood is "a neural network with a nonlinear hidden layer."
2. **Large data.** Batch optimization is too costly, and sampling-based EM would need "a typically expensive sampling loop per datapoint."

## Main Content

> [!definition] Per-datapoint variational bound ^def-vae-bound
> $$
> \log p_\theta(x^{(i)})=D_{KL}\big(q_\phi(z\mid x^{(i)})\,\|\,p_\theta(z\mid x^{(i)})\big)+\mathcal L(\theta,\phi;x^{(i)}),
> $$
> $$
> \mathcal L(\theta,\phi;x^{(i)})=-D_{KL}\big(q_\phi(z\mid x^{(i)})\,\|\,p_\theta(z)\big)+\mathbb E_{q_\phi(z\mid x^{(i)})}\big[\log p_\theta(x^{(i)}\mid z)\big]
> $$
> (Eqs. 1-3). $q_\phi(z\mid x)$ is the **probabilistic encoder** ("given a datapoint $x$ it produces a distribution... over the possible values of the code $z$"); $p_\theta(x\mid z)$ is the **probabilistic decoder**. Unlike mean-field VI, $q_\phi$ "is not necessarily factorial and its parameters $\phi$ are not computed from some closed-form expectation."

The difficulty is $\nabla_\phi$: the expectation is taken under a distribution that depends on $\phi$. The generic fix is the score-function estimator, $\nabla_\phi\mathbb E_{q_\phi}[f(z)]=\mathbb E_{q_\phi}[f(z)\nabla_\phi\log q_\phi(z)]$, which "exhibits very high variance... and is impractical for our purposes" (Sec. 2.2; see [[Stochastic and Black-Box Variational Inference]]).

> [!theorem] The reparameterization trick ^thm-reparameterization
> Let $z=g_\phi(\epsilon,x)$ with $\epsilon\sim p(\epsilon)$ independent of $\phi$ and $g_\phi$ differentiable, such that $z\sim q_\phi(z\mid x)$. Since $q_\phi(z\mid x)\prod_i dz_i=p(\epsilon)\prod_i d\epsilon_i$,
> $$
> \int q_\phi(z\mid x)f(z)\,dz=\int p(\epsilon)\,f\big(g_\phi(\epsilon,x)\big)\,d\epsilon\ \simeq\ \frac1L\sum_{l=1}^Lf\big(g_\phi(\epsilon^{(l)},x)\big),\qquad\epsilon^{(l)}\sim p(\epsilon),
> $$
> and the Monte Carlo estimate is **differentiable with respect to $\phi$** (Sec. 2.4). Univariate Gaussian: $z\sim\mathcal N(\mu,\sigma^2)\iff z=\mu+\sigma\epsilon$, $\epsilon\sim\mathcal N(0,1)$.
>
> **When is such a $g_\phi$ available?** Three routes (Sec. 2.4):
> 1. *Tractable inverse CDF:* $\epsilon\sim\mathcal U(0,I)$, $g_\phi=$ inverse CDF (exponential, Cauchy, logistic, Rayleigh, Pareto, Weibull, Gumbel, ...).
> 2. *Location-scale families:* $g=\text{location}+\text{scale}\cdot\epsilon$ (Gaussian, Laplace, Student-$t$, logistic, uniform, ...).
> 3. *Composition:* log-normal (exponentiated normal), Gamma (sum of exponentials), Dirichlet (normalized Gammas), Beta, $\chi^2$, $F$.
>
> Not available for discrete $z$, which is the niche left to score-function methods.

> [!definition] SGVB estimators ^def-sgvb
> Applying the trick to the bound with $z^{(i,l)}=g_\phi(\epsilon^{(i,l)},x^{(i)})$:
> $$
> \tilde{\mathcal L}^A(\theta,\phi;x^{(i)})=\frac1L\sum_{l=1}^L\Big[\log p_\theta(x^{(i)},z^{(i,l)})-\log q_\phi(z^{(i,l)}\mid x^{(i)})\Big],
> $$
> $$
> \tilde{\mathcal L}^B(\theta,\phi;x^{(i)})=-D_{KL}\big(q_\phi(z\mid x^{(i)})\,\|\,p_\theta(z)\big)+\frac1L\sum_{l=1}^L\log p_\theta(x^{(i)}\mid z^{(i,l)})
> $$
> (Eqs. 6-7). Version B integrates the KL analytically and "typically has less variance." For a minibatch $X^M$ of size $M$ from $N$ points, $\mathcal L(\theta,\phi;X)\simeq\frac NM\sum_{i=1}^M\tilde{\mathcal L}(\theta,\phi;x^{(i)})$ (Eq. 8).

> [!algorithm] Auto-Encoding Variational Bayes (Kingma & Welling, Algorithm 1) ^alg-aevb
> 1. Initialize $\theta,\phi$.
> 2. **Repeat** until convergence:
>    - $X^M\leftarrow$ random minibatch of $M$ data points;
>    - $\epsilon\leftarrow$ samples from $p(\epsilon)$;
>    - $g\leftarrow\nabla_{\theta,\phi}\tilde{\mathcal L}^M(\theta,\phi;X^M,\epsilon)$;
>    - update $\theta,\phi$ with SGD or Adagrad.
>
> "The number of samples $L$ per datapoint can be set to 1 as long as the minibatch size $M$ was large enough, e.g. $M=100$."

### The variational autoencoder

> [!definition] VAE with Gaussian encoder ^def-vae
> Prior $p(z)=\mathcal N(0,I)$. Decoder $p_\theta(x\mid z)$: Gaussian (real data) or Bernoulli (binary data) with parameters output by an MLP. Encoder $q_\phi(z\mid x^{(i)})=\mathcal N(z;\mu^{(i)},\sigma^{2(i)}I)$ with $\mu^{(i)},\sigma^{(i)}$ output by an MLP of $x^{(i)}$. Sampling: $z^{(i,l)}=\mu^{(i)}+\sigma^{(i)}\odot\epsilon^{(l)}$. With $J=\dim z$, Appendix B gives the closed-form KL, and the estimator is
> $$
> \mathcal L(\theta,\phi;x^{(i)})\simeq\frac12\sum_{j=1}^J\Big(1+\log(\sigma_j^{(i)})^2-(\mu_j^{(i)})^2-(\sigma_j^{(i)})^2\Big)+\frac1L\sum_{l=1}^L\log p_\theta(x^{(i)}\mid z^{(i,l)})
> $$
> (Eq. 10). The diagonal covariance is "just a (simplifying) choice, and not a limitation of our method."

**Why "autoencoder."** The second term is a negative reconstruction error: encode $x$ to a noisy code $z$, decode, score $x$. The first term "acts as a regularizer," pulling every per-datum posterior toward the prior. Classical autoencoders need ad hoc regularizers (denoising, contractive, sparse) to learn useful codes; here the regularizer is "dictated by the variational bound... lacking the usual nuisance regularization hyperparameter" (Sec. 4).

**Amortization.** Classical VI solves a separate optimization for each $z^{(i)}$ (the local step of [[Mean-Field Family and Coordinate Ascent VI (CAVI)|CAVI]]/SVI). The encoder replaces $N$ optimizations by one function $x\mapsto(\mu(x),\sigma(x))$ whose cost is spread ("amortized," in Rezende & Mohamed's 2015 term) across data, and which generalizes to new $x$ at test time with a single forward pass. The price is an **amortization gap**: the network's output need not be the per-datum optimum. The same idea, a network trained once to map data to a posterior approximation, is the core of [[Simulation-Based and Amortized Inference]], [[Neural Simulation-Based Inference - Overview]] and the [[Variational Posterior Estimator (Barber-Agakov)|Barber-Agakov posterior estimator]] in Bayesian experimental design.

### VAE as nonlinear probabilistic PCA

Kingma & Welling note (Sec. 4) the long-known link between *linear* autoencoders and linear-Gaussian latent variable models: PCA is the maximum-likelihood solution of $p(z)=\mathcal N(0,I)$, $p(x\mid z)=\mathcal N(x;Wz,\epsilon I)$ as $\epsilon\to0$ (Roweis 1998). That model is [[Factor Analysis and PPCA|probabilistic PCA]], for which the posterior $p(z\mid x)$ is Gaussian and *linear in $x$*, so EM is exact. The VAE keeps the prior and replaces $Wz$ by a neural network $f_\theta(z)$. The posterior is no longer tractable, so the exact E-step is replaced by an encoder network and the log likelihood by the ELBO:

| | PPCA / factor analysis | VAE |
|---|---|---|
| Decoder mean | $Wz+\mu$ (linear) | $f_\theta(z)$ (neural network) |
| Posterior $p(z\mid x)$ | Gaussian, closed form | intractable |
| Inference | exact E-step | amortized Gaussian $q_\phi(z\mid x)$ |
| Objective | $\log p_\theta(x)$ | $\mathrm{ELBO}\le\log p_\theta(x)$ |
| Fitting | EM / eigendecomposition | SGD with reparameterization |

### Evidence (Sec. 5)

On MNIST and Frey Face, AEVB was compared with the wake-sleep algorithm using the same encoder (500 hidden units for MNIST, 200 for Frey Face, minibatch $M=100$, $L=1$, Adagrad). AEVB "converged considerably faster and reached a better solution in all experiments" across latent dimensions $N_z\in\{3,5,10,20,200\}$ (Fig. 2). Notably, "superfluous latent variables did not result in overfitting, which is explained by the regularizing nature of the variational bound." With $N_z=3$, where the marginal likelihood can be estimated, AEVB also beat Monte Carlo EM with an HMC E-step, which cannot be run online on the full data set (Fig. 3).

## Examples

> [!example] A VAE in PyTorch ^ex-vae-code
> ```python
> import torch, torch.nn as nn, torch.nn.functional as F
>
> class VAE(nn.Module):
>     def __init__(self, d_x=784, d_h=500, d_z=20):
>         super().__init__()
>         self.enc = nn.Sequential(nn.Linear(d_x, d_h), nn.Tanh())
>         self.mu, self.logvar = nn.Linear(d_h, d_z), nn.Linear(d_h, d_z)
>         self.dec = nn.Sequential(nn.Linear(d_z, d_h), nn.Tanh(), nn.Linear(d_h, d_x))
>
>     def forward(self, x):
>         h = self.enc(x)
>         mu, logvar = self.mu(h), self.logvar(h)
>         z = mu + torch.exp(0.5 * logvar) * torch.randn_like(mu)   # reparameterization, L = 1
>         logits = self.dec(z)
>         recon = -F.binary_cross_entropy_with_logits(logits, x, reduction="sum")
>         neg_kl = 0.5 * torch.sum(1 + logvar - mu**2 - logvar.exp())   # Eq. 10, first term
>         return -(recon + neg_kl)          # negative ELBO summed over the minibatch
> ```
> Without the `torch.randn_like` line written as a function of `mu` and `logvar`, no gradient would reach the encoder; that one line is the whole trick.

> [!example] Where the same trick appears in applied Bayesian work ^ex-reparam-elsewhere
> - **ADVI** standardizes its Gaussian, $\zeta=\mu+L\eta$, for exactly this reason; Kucukelbir et al. list "re-parameterization trick" as a synonym for their elliptical standardization.
> - **Non-centered parameterization** of [[Hierarchical Models|hierarchical models]], $\theta_j=\mu+\tau\tilde\theta_j$ with $\tilde\theta_j\sim\mathcal N(0,1)$, is the same location-scale identity used for a different purpose: improving posterior geometry for HMC (see [[Efficient MCMC]]) and, per Yao et al. (2018), for ADVI.
> - **Synthetic data and embeddings for marketing.** A VAE over customer or creative features gives a generative model plus a low-dimensional representation with an explicit prior, a nonlinear counterpart to factor-analytic summaries of correlated media or survey variables.

## Connections

- [[The ELBO and KL Divergence Minimization]] - the VAE loss is the "fit minus complexity" form of the ELBO; the EM relation explains the $\theta$/$\phi$ split.
- [[Stochastic and Black-Box Variational Inference]] - score-function versus pathwise gradients.
- [[Automatic Differentiation Variational Inference (ADVI)]] - the same estimator applied to global parameters of an arbitrary Stan model.
- [[Normalizing Flows for Variational Inference]] - replaces the diagonal-Gaussian encoder with a flexible flow posterior.
- [[Factor Analysis and PPCA]] - the linear special case with a tractable posterior.
- [[Variational Posterior Estimator (Barber-Agakov)]] and [[Variational Marginal Estimator]] - amortized variational distributions trained by stochastic gradients for EIG estimation.

## See Also

- [[Normalizing Flows as Conditional Density Estimators]] and [[Neural Simulation-Based Inference - Overview]] - amortized neural posteriors when the likelihood is only available through simulation.
- [[Simulation-Based and Amortized Inference]] - the Bayesian Workflow book's treatment of amortization.
- [[EM and Gradient Optimization for the Delayed Feedback Model]] - EM with an exact E-step, the case the VAE generalizes away from.
- [[Variational Inference - Overview]] - cluster map.
