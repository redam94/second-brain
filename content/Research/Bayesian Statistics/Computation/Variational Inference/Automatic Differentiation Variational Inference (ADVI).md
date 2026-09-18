---
title: Automatic Differentiation Variational Inference (ADVI)
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/probabilistic-programming
  - type/method
  - method/stan
  - method/pymc
  - doc/paper
source: "[[raw/Kucukelbir 2017 - Automatic Differentiation Variational Inference.pdf]]"
source_location: "Sec. 2 (Eqs. 1-11, Alg. 1, Figs. 1-3, pp. 3-11); Sec. 3 (Figs. 4-9, Table 2, pp. 11-16); Sec. 4 (Figs. 10-15); Sec. 5; Appendices A-D"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Mean-Field Family and Coordinate Ascent VI (CAVI)]]"
  - "[[Stochastic and Black-Box Variational Inference]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
used_by:
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
  - "[[Normalizing Flows for Variational Inference]]"
aliases:
  - Automatic Differentiation Variational Inference
  - Mean-Field ADVI
  - Full-Rank ADVI
  - ADVI in Stan
---

# Automatic Differentiation Variational Inference (ADVI)

> [!summary]
> **ADVI** (Kucukelbir, Tran, Ranganath, Gelman & Blei 2017) turns VI into a generic algorithm for any *differentiable probability model*: the user writes the model (e.g. in Stan) and nothing else. The recipe has three ingredients: (1) automatically **transform** constrained latent variables to $\mathbb R^K$, adding a log-Jacobian term, so that one variational family serves every model; (2) posit a **Gaussian** in the unconstrained space, either mean-field or full-rank, which implies a non-Gaussian approximation in the original space; (3) **standardize** the Gaussian (the reparameterization trick) so the gradient moves inside the expectation, compute it by automatic differentiation with a single Monte Carlo draw, and run stochastic gradient ascent with an adaptive step size. It is fast and automatic; its accuracy is limited by the Gaussian family and, in mean-field form, by ignored posterior correlation.

## Overview

Before ADVI, "each step requires expert thought and analysis in the service of a single algorithm for a single model" (Sec. 2.2): choose a family satisfying the support constraint, derive expectations, derive updates, implement, debug. ADVI removes every model-specific step for the class of models that Stan already supports for HMC, those with continuous latent variables and a gradient $\nabla_\theta\log p(x,\theta)$ on the support of the prior. Discrete latents must be marginalized out, exactly as for [[HMC and Stan in Practice|HMC in Stan]]. No conjugacy of any kind is assumed; the running example is a Poisson likelihood with a Weibull prior on the rate.

This is the algorithm behind Stan's `variational` method and PyMC's `ADVI`/`FullRankADVI`, and therefore the algorithm that [[SBC Case Studies]] finds miscalibrated on a simple linear regression.

## Main Content

> [!definition] Differentiable probability model ^def-differentiable-model
> A joint density $p(x,\theta)$ with continuous latent variables $\theta\in\operatorname{supp}(p(\theta))\subseteq\mathbb R^K$ whose log-joint gradient $\nabla_\theta\log p(x,\theta)$ exists on the support of the prior. Includes GLMs, mixtures and HMMs/topic models with discrete variables marginalized, state-space models, Gaussian processes, deep exponential families (Table 1). Excludes models where marginalization is intractable (Ising, sigmoid belief nets, untruncated Bayesian nonparametrics).

### Step 1: transform to real coordinate space

Reverse KL requires $\operatorname{supp}(q)\subseteq\operatorname{supp}(p(\theta\mid x))$ ([[The ELBO and KL Divergence Minimization#^thm-zero-forcing|support constraint]]); ADVI additionally assumes the posterior support equals the prior support. Rather than pick a family per constraint type, define a one-to-one differentiable $T:\operatorname{supp}(p(\theta))\to\mathbb R^K$ and set $\zeta=T(\theta)$. The transformed joint is
$$
p(x,\zeta)=p\big(x,T^{-1}(\zeta)\big)\,\big|\det J_{T^{-1}}(\zeta)\big| .
$$
For a positive rate, $T=\log$ and the Jacobian factor is $e^\zeta$; e.g. $p(x,\zeta)=\text{Poisson}(x\mid e^\zeta)\,\text{Weibull}(e^\zeta;1.5,1)\,e^\zeta$ (Sec. 2.3). Stan supplies the library of transforms (bounds, simplexes, ordered vectors, covariance and Cholesky factors), the same ones it uses for HMC.

### Step 2: a Gaussian family in the unconstrained space

> [!definition] Mean-field and full-rank Gaussian families ^def-advi-families
> **Mean-field:** $q(\zeta;\phi)=\mathcal N(\zeta;\mu,\operatorname{diag}(\sigma^2))$ with $\omega=\log\sigma$, so $\phi=(\mu,\omega)\in\mathbb R^{2K}$ is unconstrained.
> **Full-rank:** $q(\zeta;\phi)=\mathcal N(\zeta;\mu,LL^\top)$ with $L$ lower-triangular (diagonal not constrained positive), so $\phi=(\mu,L)\in\mathbb R^{K+K(K+1)/2}$.
> The implied density on the original space, $q(T(\theta);\phi)\,|\det J_T(\theta)|$, is **non-Gaussian** and automatically respects the support (Sec. 2.4).

Two remarks from the paper. A Gaussian variational approximation "is not equivalent to the Laplace approximation": Laplace expands around the MAP ([[Approximations Based on Joint and Conditional Posterior Modes]]); ADVI minimizes an average discrepancy. And full-rank is "a form of structured mean-field variational inference" whose off-diagonal terms "capture posterior correlations," at $O(K^2)$ parameter cost.

### Step 3: the objective, standardization and gradients

> [!theorem] ELBO in real coordinate space ^thm-advi-elbo
> $$
> \mathcal L(\phi)=\mathbb E_{q(\zeta;\phi)}\Big[\log p\big(x,T^{-1}(\zeta)\big)+\log\big|\det J_{T^{-1}}(\zeta)\big|\Big]+\mathbb H\big[q(\zeta;\phi)\big]
> $$
> (Eq. 5). The optimization $\phi^*=\arg\max_\phi\mathcal L(\phi)$ is now **unconstrained**. The Gaussian entropy is analytic: implemented once, reused for all models.

Automatic differentiation cannot differentiate an expectation whose measure depends on $\phi$. **Elliptical standardization** fixes this: $\eta=S_\phi(\zeta)=\operatorname{diag}(\exp(\omega))^{-1}(\zeta-\mu)$ (mean-field) or $L^{-1}(\zeta-\mu)$ (full-rank), so $\eta\sim\mathcal N(0,I)$ regardless of $\phi$. The paper notes this is the same device "also known as... the 're-parameterization trick' (Kingma and Welling, 2014)" (fn. 6); see [[Reparameterization Trick and Variational Autoencoders]]. With $\zeta=S_\phi^{-1}(\eta)$ and $\theta=T^{-1}(\zeta)$:
$$
\nabla_\mu\mathcal L=\mathbb E_{\mathcal N(\eta)}\Big[\nabla_\theta\log p(x,\theta)\,\nabla_\zeta T^{-1}(\zeta)+\nabla_\zeta\log\big|\det J_{T^{-1}}(\zeta)\big|\Big],
$$
$$
\nabla_\omega\mathcal L=\mathbb E_{\mathcal N(\eta)}\Big[\big(\nabla_\theta\log p(x,\theta)\,\nabla_\zeta T^{-1}(\zeta)+\nabla_\zeta\log|\det J_{T^{-1}}(\zeta)|\big)\,\eta^\top\operatorname{diag}(\exp(\omega))\Big]+1,
$$
and for full-rank the same bracket times $\eta^\top$ plus $(L^{-1})^\top$ (Eqs. 7-9). Everything inside the expectations is an autodiff call; the expectation is a Monte Carlo average over $M$ draws and "in practice a single sample suffices."

> [!algorithm] ADVI (Kucukelbir et al., Algorithm 1) ^alg-advi
> **Input:** data $x_{1:N}$, model $p(x,\theta)$.
> 1. Initialize $\mu^{(1)}=0$ and $\omega^{(1)}=0$ (mean-field) or $L^{(1)}=I$ (full-rank): a standard Gaussian in unconstrained space.
> 2. Choose the step-size scale $\eta\in\{0.01,0.1,1,10,100\}$ by a short search on a data subset.
> 3. **While** the change in ELBO exceeds a threshold:
>    - draw $\eta_m\sim\mathcal N(0,I)$, $m=1,\dots,M$;
>    - estimate $\nabla_\mu\mathcal L$ and $\nabla_\omega\mathcal L$ (or $\nabla_L\mathcal L$) by Monte Carlo;
>    - compute step sizes $\rho^{(i)}$ and update $\mu\leftarrow\mu+\operatorname{diag}(\rho^{(i)})\nabla_\mu\mathcal L$, similarly $\omega$ or $L$.
> 4. **Return** $\mu^*,\omega^*$ (or $L^*$).
>
> **Step size** (Eqs. 10-11): $\rho_k^{(i)}=\eta\cdot i^{-1/2+\epsilon}\cdot\big(\tau+\sqrt{s_k^{(i)}}\big)^{-1}$ with $s_k^{(i)}=\alpha\,(g_k^{(i)})^2+(1-\alpha)\,s_k^{(i-1)}$, using $\epsilon=10^{-16}$, $\alpha=0.1$, $\tau=1$. The decaying factor satisfies Robbins-Monro; the last factor is RMSProp-like finite-memory curvature adaptation.
> **Cost:** $O(NMK)$ per iteration, or $O(BMK)$ with minibatches of size $B$ and the likelihood scaled by $N/B$.

### Properties (Sec. 3)

> [!example] Accuracy: what mean-field loses ^ex-advi-accuracy
> - **Correlated 2-D Gaussian** (1000 data points, analytic posterior): both variants recover the mean. Marginal variances: analytic $(0.28,0.31)$, full-rank $(0.28,0.31)$, mean-field $(0.13,0.14)$ (Fig. 4). "ADVI minimizes the KL divergence from the approximation to the exact posterior; this leads to a systemic underestimation of marginal variances."
> - **Logistic regression** (10 coefficients, 1000 points): posterior means agree with NUTS; mean-field "underestimates marginal posterior variances on most of the coefficients," full-rank matches (Fig. 5).
> - **Stochastic volatility** (500 time steps, AR(1) log-volatility): here mean-field gets even the *mean* wrong, "particularly when the log volatility drifts far away from $\mu$," because neighbouring $h_t$ are strongly correlated; full-rank matches sampling, and its covariance matrix shows the banded structure that mean-field cannot (Figs. 6-7).
>
> **Recommendation:** "Scientists interested in posterior variances and covariances should use the full-rank approximation... Scientists interested in prediction should initially rely on the mean-field approximation," because "accurate posterior mean estimates dominate predictive accuracy; underestimating marginal variances matters less."

The stochastic volatility case is the warning for time-series work: latent states in a [[Bayesian Media Mix Modeling - Overview|media mix model]] with time-varying baselines or coefficients have exactly this local correlation structure.

> [!theorem] Sensitivity to the transformation and the optimal $T$ ^thm-optimal-transform
> The choice of $T$ changes the implied family on the original space. For Gamma posteriors on $\mathbb R_{>0}$, $T_2(\theta)=\log(e^\theta-1)$ beats $T_1(\theta)=\log\theta$: $\mathrm{KL}(q\|p)$ is $1.6\times10^{-2}$ vs $8.1\times10^{-2}$ for $\text{Gamma}(1,2)$, and $7.7\times10^{-4}$ vs $8.5\times10^{-3}$ for $\text{Gamma}(10,10)$ (Table 2), because $T_2$ is nearly linear for large $\theta$ and both Gamma and Gaussian are light-tailed. The **optimal** transformation is
> $$
> T^*=\Phi^{-1}\circ P(\theta\mid x),
> $$
> posterior CDF followed by the standard-normal quantile function, under which a Gaussian is exact. But estimating $P(\theta\mid x)$ "is just as hard as the original goal" (Sec. 3.3). *Learning* an approximation to $T^*$ is what [[Normalizing Flows for Variational Inference|normalizing flows]] do.

**Gradient variance.** The ADVI (pathwise) gradient has lower variance than the BBVI score-function gradient, with or without control variates, on both a univariate and a 100-dimensional model (Fig. 8); see [[Stochastic and Black-Box Variational Inference]].

**Speed (Sec. 4).** Measured by held-out predictive likelihood against time: parity with NUTS on ARD linear regression (250 regressors, 10,000 points) and hierarchical logistic regression (145 regressors); "an order of magnitude" faster on non-negative matrix factorization of the Frey faces; on a 30-component Gaussian mixture over 250,000 images, minibatch ADVI converges in about two hours where "NUTS cannot handle such large datasets," with minibatches below $B=500$ giving worse optima; clustering 1.7 million taxi trajectories after ADVI-fitted PPCA with an ARD prior selected an 11-dimensional subspace. All of these comparisons are *predictive*, the regime in which the paper itself says variance errors matter least.

## Examples

> [!example] Running and checking ADVI ^ex-advi-usage
> ```python
> # PyMC (sketch): mean-field, then full-rank, then draw for diagnostics
> with model:
>     mf = pm.fit(n=50_000, method="advi")            # mean-field Gaussian
>     fr = pm.fit(n=50_000, method="fullrank_advi")   # full-rank Gaussian
>     idata_vi = fr.sample(2_000)
> ```
> ```r
> # CmdStanR (sketch)
> fit <- mod$variational(data = d, algorithm = "fullrank",
>                        tol_rel_obj = 1e-4, output_samples = 2000)
> ```
> Three habits follow directly from the papers:
> 1. **Center and scale predictors, and non-center hierarchies.** Mean-field can only be right if the posterior is nearly factorized in the unconstrained coordinates. The linear-regression calculation in [[Mean-Field Family and Coordinate Ascent VI (CAVI)#^ex-mf-gaussian|the mean-field note]] shows an uncentered predictor alone can halve the slope's posterior sd; [[Hierarchical Models|hierarchical]] funnels need the non-centered form (see [[Computational Troubleshooting]]).
> 2. **Tighten the tolerance.** Yao et al. (2018) show the default relative-ELBO tolerance of $10^{-2}$ can stop far too early ($\hat k=4.4$ vs $0.61$ at $10^{-5}$ on a 100-regressor linear model).
> 3. **Compute $\hat k$** from the draws before using any interval: [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]].

**Open issues named by the authors (Sec. 5):** sensitivity to $T$; first-order optimization only; initialization at a standard Gaussian and the finite search for $\eta$ are heuristics; no discrete latents without falling back on the high-variance score-function estimator.

## Connections

- [[Reparameterization Trick and Variational Autoencoders]] - elliptical standardization *is* the reparameterization trick, applied to global parameters rather than per-datum latents.
- [[Stochastic and Black-Box Variational Inference]] - the alternative gradient estimator and the Robbins-Monro framework.
- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] - source of the variance-underestimation result that mean-field ADVI inherits.
- [[Normalizing Flows for Variational Inference]] - learned transformations in place of a fixed $T$ plus Gaussian.
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] - all of Yao et al.'s experiments use mean-field ADVI.
- [[Variational Inference and Pathfinder]] - Pathfinder, the quasi-Newton alternative the Bayesian Workflow book prefers for initialization.
- [[HMC and Stan in Practice]] and [[Efficient MCMC]] - the same transforms and autodiff, used for exact sampling.

## See Also

- [[SBC Case Studies]] - ADVI's rank histogram on linear regression.
- [[Factor Analysis and PPCA]] - PPCA with ARD is one of the paper's case-study models.
- [[Initial Values, Adaptation, and Warmup]] - using a fast approximation to initialize MCMC.
- [[Approximate Algorithms and Approximate Models]] - when a fast, biased fit is good enough.
- [[Variational Inference - Overview]] - cluster map.
