---
title: "Meager 2019 - Bayesian Estimation, Priors and Computation"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. II.B (pp. 67-69), Appendix A (pp. 87-88)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Hierarchical Model Specifications]]"
used_by:
  - "[[Meager 2019 - Pooling Factors and Measuring External Validity]]"
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
aliases:
  - "Priors and Stan estimation for the microcredit model"
  - "LKJ prior and HMC in Meager 2019"
---
# Meager 2019 - Bayesian Estimation, Priors and Computation

> [!summary]
> The paper argues for Bayesian estimation because with $K=7$ the challenge is variance, not bias: priors regularise, improve mean squared error at the upper level, and allow joint inference on $(\tau,\sigma_\tau)$ and all $\tau_k$ instead of the plug-in of Empirical Bayes. The joint model uses a strong LKJ(3) prior on the correlation and a weak half-Cauchy prior on scale, fitted by HMC/NUTS in Stan with $\hat R<1.1$ on four chains.

## Overview

Section II.B (reasons for Bayesian inference and prior choices, eq. 5) and Appendix A (posterior, MCMC, HMC, convergence diagnostics).

## Main Content

### Why Bayesian

> [!definition] Arguments for Bayesian estimation
> 1. **Lower MSE of upper-level parameters** $(\tau,\sigma_\tau^2)$ relative to maximum likelihood (Chung et al. 2013, 2015; Gelman 2017): priors regularise (Hastie, Tibshirani, Friedman 2009), trading bias for variance. With seven studies "the main challenge for estimation at this scale is variance, not bias". Frequentist unbiased estimators of $\sigma_\tau^2$ have higher variance and tend to overestimate magnitudes of $\tau$ and $\{\tau_k\}$.
> 2. **Better uncertainty quantification.** Uncertainty at each level is correlated; inference on $(\tau,\sigma_\tau^2)$ depends on all $\tau_k$ and vice versa (Betancourt and Girolami 2013). HMC surmounts this, benefiting from informative priors. Empirical Bayes / random effects condition on point estimates of $(\tau,\sigma_\tau^2)$ and can yield too-narrow intervals.
> 3. **Tractability of richer models.** With $K=7$ even moderately flexible likelihoods overfit; estimating the correlation between control means and treatment effects is prone to overfitting, but setting it to zero (implicit in simpler models) is too restrictive, so a reasonably strong prior on the correlation is a compromise.
> 4. **Encode theory and context.** Footnote 9: "consider that the alternative is to use zero data points and assume the parameter takes a single known value with certainty." Penalised frequentist methods need tuning by cross-validation, which is noisy with seven studies.

^def-why-bayes

*Prior example (control-mean/effect correlation for profit).* Diminishing returns (small businesses grow faster with the same input) suggest a negative correlation; heterogeneous latent entrepreneurial talent (high control profits signal talent so loans have more impact) suggests a positive one. The net correlation is unlikely to be extreme in either direction, which is encoded as a penalty for large coefficients (classical regularisation). Where the community disagrees, priors should be more diffuse.

### The joint-model prior (equation 5)

> [!definition] Priors for model (2)
> Decompose $V=\text{diag}(\theta)\,\Omega\,\text{diag}(\theta)$ into a correlation matrix $\Omega$ and scale vector $\theta$ (Gelman and Hill 2007):
> $$
> \begin{pmatrix}\mu\\\tau\end{pmatrix}\sim N\!\left(\begin{pmatrix}0\\0\end{pmatrix},\begin{pmatrix}1000^2&0\\0&1000^2\end{pmatrix}\right),\quad\sigma_{y_k}\sim U[0,100000]\;\forall k,\quad\theta\sim\text{Cauchy}(0,10),\quad\Omega\sim\text{LKJcorr}(3).
> $$
> The half-Cauchy$(0,10)$ on $\theta$ (a Cauchy truncated to positive values on the scale parameters) lets scale vary widely; LKJ with concentration 3 favours correlations near zero (concentration 1 is uniform over correlation matrices). Remaining priors are diffuse with variance at least five times the variation in the data, reflecting diversity of beliefs. Less flexible models (Rubin, independent version) use weakly informative priors of similar strength.

^def-prior-eq5

Even before an RCT researchers can be confident $\tau$ is not of order US\$1 trillion PPP and is closer to US\$100 than to US\$100,000 - prior-free methods like simulated MLE do not focus the sampler on such regions, so are slower and less likely to converge. Because inference on the joint model is somewhat sensitive to the upper-level covariance prior, the paper also fits the Rubin model and an "independent" version (zero correlation between $\mu_k$ and $\tau_k$) as robustness checks (online appendix B shows final results similar).

### Appendix A - computation

> [!definition] Posterior and sampler
> The posterior of the basic full-data model is proportional to the likelihood (2) times the prior (5):
> $$
> p(\tau,\mu,\tau_1,\tau_2,\dots\mid Y)\propto\prod_{i=1}^N\prod_{k=1}^K N\big(y_{ik}\mid\mu_k+\tau_kT_{ik},\sigma_{y_k}^2\big)\times\prod_{k=1}^KN\big((\mu_k,\tau_k)\mid(\mu,\tau),V\big)\times N\big((\mu,\tau)\mid(0,0),I_2\big)\times\text{Cauchy}(0,10)\times\text{LKJcorr}(3).\tag{A1}
> $$
> (As printed, the prior on $(\mu,\tau)$ is written $N((\mu,\tau)|(0,0),I_2)$ in (A1) and with variance $1000^2$ in eq. 5; I reproduce both as printed.) This is not a known distribution and is characterised by MCMC. Maximum likelihood (Empirical Bayes) systematically underestimates lower-level uncertainty by conditioning on a single value of the hyperparameters; full Bayesian inference estimates the joint posterior, giving accurate marginals; proper priors guarantee a proper posterior. Even incorrectly centred, sufficiently diffuse priors can lower MSE by reducing variance at the cost of bias.

^def-posterior-a1

> [!definition] HMC with NUTS and diagnostics
> Estimation uses Hamiltonian Monte Carlo (discretised Hamiltonian dynamics), suited to hierarchical models, with the No-U-Turn Sampler (Hoffman and Gelman 2014) to auto-tune step sizes, implemented in Stan. Stan reports posterior means, marginal variances, 95% and 50% credible intervals (interpretable as the probability that the parameter lies in the interval), the Monte Carlo error of the posterior mean (should be small relative to the mean) and the Gelman-Rubin $\hat R$ (ratio of between- to within-chain variance; should be near 1). The paper runs **4 chains** and accepts $\hat R<1.1$.

^def-hmc-diagnostics

## Examples

*Prior on correlation.* With $\Omega\sim\text{LKJcorr}(\eta)$ in two dimensions the density of the correlation $\rho$ is proportional to $(1-\rho^2)^{\eta-1}$, so $\eta=1$ is uniform on $(-1,1)$ and $\eta=3$ is $\propto(1-\rho^2)^2$ (concentrated near 0, standard deviation $1/\sqrt{2\eta+1}=0.38$). This is a standard property of LKJ, not stated in the paper; it clarifies "favours correlations close to 0".

## Connections

- Hierarchical model background and priors: [[Hierarchical Models]]; MMM priors: [[Bayesian Estimation and Priors for MMM]].
- Shrinkage as regularisation vs overfitting: [[Overfitting and Information Criteria]].

### Relevance to marketing measurement

Same argument carries to few-experiment calibration: with 5-10 experiments per channel, $\sigma_\tau$ is poorly identified by likelihood alone and the prior on it matters; Meager's approach is a weak prior on scale, a weak-to-moderate prior on correlations, and sensitivity checks against alternative priors.

## See Also

- [[Meager 2019 - Hierarchical Model Specifications]]
- [[Meager 2019 - Pooling Factors and Measuring External Validity]]
