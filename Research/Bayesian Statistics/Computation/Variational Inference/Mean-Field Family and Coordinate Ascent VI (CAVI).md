---
title: Mean-Field Family and Coordinate Ascent VI (CAVI)
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/mixture-models
  - type/method
  - doc/paper
source: "[[raw/Blei 2017 - Variational Inference A Review for Statisticians.pdf]]"
source_location: "Secs. 2.3-2.5 (Eqs. 15-20, Alg. 1, Figs. 1-2, pp. 7-11); Sec. 3 (Eqs. 21-35, Alg. 2, pp. 11-16); Secs. 4.1-4.2 (Eqs. 36-50, pp. 17-19); Sec. 5.2"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Variational Inference - Overview]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Stochastic and Black-Box Variational Inference]]"
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - CAVI
  - Coordinate Ascent Variational Inference
  - Mean-Field Variational Family
  - Mean-Field Variational Bayes
  - Mean-Field Approximation
---

# Mean-Field Family and Coordinate Ascent VI (CAVI)

> [!summary]
> The **mean-field family** assumes the latent variables are mutually independent under $q$: $q(z)=\prod_{j=1}^m q_j(z_j)$. With this family the [[The ELBO and KL Divergence Minimization|ELBO]] can be maximized one factor at a time, and the optimal factor has a closed form: $q_j^*(z_j)\propto\exp\{\mathbb E_{-j}[\log p(z_j\mid z_{-j},x)]\}$, the exponentiated expected log *complete conditional* (Blei et al. 2017, Eq. 17). Iterating this update is **coordinate ascent variational inference (CAVI)**, a deterministic cousin of the Gibbs sampler. The family "can capture any marginal density of the latent variables" but "cannot capture correlation between them," and under reverse KL this makes it systematically **underestimate marginal variances**.

## Overview

Mean-field CAVI is the classical form of VI and the one to understand first, because every pathology of modern black-box VI is already visible in it. Its strengths are that updates are closed-form for a large class of models (conditionally conjugate exponential families), the ELBO increases monotonically, and there are no step sizes to tune. Its weaknesses are that each new model needs a hand derivation, each sweep touches the whole data set, the optimum is only local, and the independence assumption is wrong for nearly every posterior of applied interest. The first two weaknesses motivate [[Stochastic and Black-Box Variational Inference]]; the last motivates full-rank [[Automatic Differentiation Variational Inference (ADVI)|ADVI]] and [[Normalizing Flows for Variational Inference|flows]].

## Main Content

> [!definition] Mean-field variational family ^def-mean-field
> $$
> q(z) = \prod_{j=1}^m q_j(z_j).
> $$
>
> "Each latent variable $z_j$ is governed by its own variational factor" (Blei et al., Eq. 15). The family is *not* a model of the data ($x$ does not appear); the ELBO connects $q$ to the data. The parametric form of each $q_j$ is not assumed in advance; for many models it is *determined* by the update below. Generalizations: **structured VI** adds dependencies between factors; **mixture** families add latent variables inside $q$. Both improve fidelity at the cost of a harder optimization (Sec. 2.3).

> [!theorem] Optimal coordinate update ^thm-cavi-update
> Fix all factors $q_\ell$, $\ell\ne j$. The factor maximizing the ELBO is
>
> $$
> q_j^*(z_j)\ \propto\ \exp\big\{\mathbb E_{-j}[\log p(z_j\mid z_{-j},x)]\big\}\ \propto\ \exp\big\{\mathbb E_{-j}[\log p(z_j, z_{-j},x)]\big\},
> $$
>
> where $\mathbb E_{-j}$ is the expectation under $\prod_{\ell\neq j}q_\ell(z_\ell)$ (Blei et al., Eqs. 17-18).
>
> *Proof sketch (Eq. 19).* By iterated expectation and the mean-field factorization, as a function of $q_j$ alone
> $$
> \mathrm{ELBO}(q_j) = \mathbb E_j\big[\mathbb E_{-j}[\log p(z_j,z_{-j},x)]\big] - \mathbb E_j[\log q_j(z_j)] + \text{const},
> $$
> which is, up to a constant, $-\mathrm{KL}(q_j\,\|\,q_j^*)$. It is maximized by $q_j=q_j^*$. Because the right side of the update does not involve $q_j$, this is a valid coordinate step.

> [!algorithm] CAVI (Blei et al., Algorithm 1) ^alg-cavi
> **Input:** model $p(x,z)$, data $x$. **Output:** $q(z)=\prod_j q_j(z_j)$.
> 1. Initialize the factors $q_j(z_j)$.
> 2. **While** the ELBO has not converged:
>    - **for** $j\in\{1,\dots,m\}$: set $q_j(z_j)\propto\exp\{\mathbb E_{-j}[\log p(z_j\mid z_{-j},x)]\}$.
>    - Compute $\mathrm{ELBO}(q)=\mathbb E[\log p(z,x)]-\mathbb E[\log q(z)]$.
> 3. **Return** $q(z)$.
>
> CAVI "goes uphill on the ELBO... eventually finding a local optimum."

**Relation to Gibbs sampling.** The [[MCMC Basics|Gibbs sampler]] "maintains a realization of the latent variables and iteratively samples from each variable's complete conditional." CAVI "uses the same complete conditional. It takes the expected log, and uses this quantity to iteratively set each variable's variational factor" (Sec. 2.4). Any model for which a Gibbs sampler is easy to write is one for which CAVI is easy to derive. CAVI can also be read as **variational message passing** on the graphical model: each variable's update depends only on the variational parameters of its Markov blanket, which is what enabled automated software for conjugate-exponential graphs.

> [!theorem] Exponential-family complete conditionals ^thm-expfam
> Suppose each complete conditional is in an exponential family,
> $$
> p(z_j\mid z_{-j},x) = h(z_j)\exp\{\eta_j(z_{-j},x)^\top z_j - a(\eta_j(z_{-j},x))\}.
> $$
> Then $q_j^*(z_j)\propto h(z_j)\exp\{\mathbb E[\eta_j(z_{-j},x)]^\top z_j\}$: the optimal factor is **in the same exponential family** as the complete conditional, with natural parameter
> $$
> \nu_j = \mathbb E\big[\eta_j(z_{-j},x)\big]
> $$
> (Blei et al., Eqs. 36-40). For **conditionally conjugate** models with global variables $\beta$ and local variables $z_i$, $p(\beta,z,x)=p(\beta)\prod_i p(z_i,x_i\mid\beta)$, this gives the local update $\varphi_i=\mathbb E_\lambda[\eta(\beta,x_i)]$ and the global update $\lambda=[\alpha_1+\sum_i\mathbb E_{\varphi_i}[t(z_i,x_i)],\ \alpha_2+n]^\top$ (Eqs. 47-48). The class includes Bayesian mixtures of exponential families, matrix factorization, some hierarchical linear and probit regressions, stochastic block models and LDA (Sec. 4).

This is the structural reason the global/local split in [[Hierarchical Models]] matters computationally: CAVI alternates an "E-like" step over per-unit latents and an "M-like" step over shared parameters, and the global step is what [[Stochastic and Black-Box Variational Inference|SVI]] makes stochastic.

### Practicalities (Sec. 2.5)

- **Initialization and local optima.** "CAVI only guarantees convergence to a local optimum, which can be sensitive to initialization"; ten random starts on a Gaussian mixture give ten different final ELBOs (Fig. 2). For mixtures, many optima are label-switched copies, and "representing one of these modes is sufficient for exploring latent clusters or predicting new observations." The same symmetry is what defeats HMC on mixtures ([[Monsters and Mixtures]]).
- **Convergence.** Stop when the ELBO change falls below a threshold. The ELBO trajectory shows "elbows": plateaus followed by jumps as the approximation changes shape (Fig. 3), so a loose threshold can stop on a plateau.
- **Numerical stability.** Work with log probabilities and use $\log\sum_i e^{x_i}=\alpha+\log\sum_i e^{x_i-\alpha}$ with $\alpha=\max_i x_i$ (Eq. 20).

### Accuracy

> [!theorem] What is known about mean-field accuracy ^thm-mf-accuracy
> - The mean-field optimum for a correlated Gaussian "has the same mean as the original density" but "the marginal variances of the approximation under-represent those of the target density" (Sec. 2.3, Fig. 1).
> - Wang & Titterington (2005, 2006), for Bayesian Gaussian mixtures: CAVI converges to a local optimum, the variational posterior mean is a consistent estimator approaching the MLE at rate $O(1/n)$, but the asymptotic variational posterior covariance is **"too small"**, differing from the inverse Fisher information by a positive-definite matrix (Sec. 5.2).
> - You et al. (2014): mean-field posterior means are consistent for the Bayesian linear model with normal / inverse-gamma priors.
> - Giordano et al. (2015) post-process mean-field output to correct the covariance (linear response); see Sec. 5.4.
>
> The pattern: **point estimates usually fine, uncertainty too narrow.**

## Examples

> [!example] Mean-field fit to a correlated Gaussian ^ex-mf-gaussian
> Apply the update to a target $p(z)=\mathcal N(m,\Lambda^{-1})$ with precision matrix $\Lambda$ (the standard calculation from Bishop 2006, Sec. 10.1.2, which both Blei et al. and Kucukelbir et al. cite for this effect). Keeping terms in $z_j$,
> $$
> \mathbb E_{-j}[\log p(z)] = -\tfrac12\Lambda_{jj}z_j^2 + z_j\Big(\Lambda_{jj}m_j-\sum_{k\ne j}\Lambda_{jk}\big(\mathbb E[z_k]-m_k\big)\Big)+\text{const},
> $$
> so $q_j^*=\mathcal N\big(m_j-\Lambda_{jj}^{-1}\sum_{k\neq j}\Lambda_{jk}(\mathbb E[z_k]-m_k),\ \Lambda_{jj}^{-1}\big)$. The fixed point has $\mathbb E[z]=m$ (means exact) and
> $$
> \operatorname{Var}_q(z_j)=\frac1{\Lambda_{jj}}\ \le\ (\Lambda^{-1})_{jj}=\operatorname{Var}_p(z_j).
> $$
> The mean-field variance is the *conditional* variance of $z_j$ given the others, not the marginal variance. For two unit-variance coordinates with correlation $\rho$, $\operatorname{Var}_q=1-\rho^2$: at $\rho=0.9$ the standard deviation is understated by a factor $\sqrt{0.19}\approx0.44$. Kucukelbir et al.'s Fig. 4 reports true variances $(0.28, 0.31)$ against mean-field $(0.13, 0.14)$, a ratio of about $0.46$, which corresponds to $\rho\approx0.73$ under this formula.
>
> **Linear regression.** With known noise $\sigma^2$, a flat prior and design columns $(1, x_i)$, the posterior precision of $(\alpha,\beta)$ is $\Lambda=\sigma^{-2}X^\top X$. Hence
> $$
> \operatorname{Var}_q(\beta)=\frac{\sigma^2}{\sum_i x_i^2}\qquad\text{vs.}\qquad\operatorname{Var}_p(\beta)=\frac{\sigma^2}{\sum_i(x_i-\bar x)^2},
> $$
> a ratio of $1-n\bar x^2/\sum_i x_i^2$. For $x$ spread uniformly over $[0,10]$ that ratio is $0.25$: the mean-field posterior standard deviation of the slope is **half** the truth. This is a sufficient mechanism for the slope miscalibration that [[SBC Case Studies]] reports for ADVI on a simple linear regression, and it disappears if the predictor is centered, a reparameterization that makes the posterior itself factorize.

> [!example] CAVI for a Bayesian mixture of Gaussians (Blei et al., Sec. 3, Algorithm 2) ^ex-cavi-gmm
> Model: $\mu_k\sim\mathcal N(0,\sigma^2)$, $c_i\sim\text{Cat}(1/K)$, $x_i\mid c_i,\mu\sim\mathcal N(c_i^\top\mu,1)$. Family: $q(\mu,c)=\prod_k\mathcal N(\mu_k;m_k,s_k^2)\prod_i\text{Cat}(c_i;\varphi_i)$, which turns out to be the optimal mean-field form. Updates (Eqs. 26, 34):
> $$
> \varphi_{ik}\propto\exp\big\{\mathbb E[\mu_k]x_i-\mathbb E[\mu_k^2]/2\big\},\qquad m_k=\frac{\sum_i\varphi_{ik}x_i}{1/\sigma^2+\sum_i\varphi_{ik}},\qquad s_k^2=\frac{1}{1/\sigma^2+\sum_i\varphi_{ik}} .
> $$
> The $\mu_k$ update is a "weighted complete conditional, where each data point is weighted by its variational probability of being assigned to component $k$."
>
> ```python
> import numpy as np
> from scipy.special import logsumexp
>
> def cavi_gmm(x, K, sigma2=10.0, iters=100, seed=0):
>     rng = np.random.default_rng(seed)
>     m = rng.normal(x.mean(), x.std(), K); s2 = np.ones(K)
>     for _ in range(iters):
>         # local step: responsibilities, E[mu]=m, E[mu^2]=m^2+s2
>         logphi = np.outer(x, m) - 0.5 * (m**2 + s2)
>         phi = np.exp(logphi - logsumexp(logphi, axis=1, keepdims=True))
>         # global step: weighted conjugate update
>         prec = 1.0 / sigma2 + phi.sum(0)
>         m, s2 = (phi * x[:, None]).sum(0) / prec, 1.0 / prec
>     return m, s2, phi
> ```
>
> On 10,000 image histograms (imageCLEF, 576 dimensions, $K=30$) CAVI reaches its held-out predictive plateau "in less than a minute," orders of magnitude faster than NUTS on the same model (Sec. 3.4, Fig. 6), with the authors' caveat that this "is not a definitive comparison" since a collapsed Gibbs sampler might do better.

## Connections

- [[The ELBO and KL Divergence Minimization]] - the objective being climbed and why reverse KL shrinks $q$.
- [[Stochastic and Black-Box Variational Inference]] - replaces the full-data global step with a noisy natural gradient, and replaces hand derivations with Monte Carlo gradients.
- [[Automatic Differentiation Variational Inference (ADVI)]] - mean-field *Gaussian* in unconstrained space; inherits the variance result above.
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] - U-shaped VSBC histograms are the calibration signature of the under-dispersion derived here.
- [[MCMC Basics]] - Gibbs sampling, the stochastic analogue using the same complete conditionals.
- [[Approximation Methods]] - BDA3's presentation of variational Bayes with the same factorized family.

## See Also

- [[Monsters and Mixtures]] - mixture models, label switching, and why a single mode is often enough.
- [[Hierarchical Models]] - the global/local structure that conditionally conjugate CAVI exploits.
- [[Variational Inference and Pathfinder]] - the workflow book's view of normal-family VI.
- [[Interpreting SBC Histograms]] - reading the rank-histogram shapes that under-dispersed approximations produce.
- [[Spike-and-Slab Prior for Covariate Selection]] - a model class where Gibbs is standard and mean-field VI is a common fast alternative.
