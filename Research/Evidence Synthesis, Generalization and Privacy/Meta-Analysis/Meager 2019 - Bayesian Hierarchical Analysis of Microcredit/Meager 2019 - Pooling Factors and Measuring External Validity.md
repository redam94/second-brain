---
title: "Meager 2019 - Pooling Factors and Measuring External Validity"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. II.C (pp. 69-71): eq. 6-8, footnotes 12-13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Hierarchical Model Specifications]]"
  - "[[Meager 2019 - Bayesian Estimation, Priors and Computation]]"
used_by:
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
  - "[[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]"
aliases:
  - "Pooling factor omega"
  - "Generalised pooling factor lambda (Gelman and Pardoe)"
  - "External validity metrics for hierarchical models"
---
# Meager 2019 - Pooling Factors and Measuring External Validity

> [!summary]
> External validity is measured by $\sigma_\tau^2$, the posterior predictive distribution of the next site's effect $\tau_{K+1}$, and three pooling metrics: the conventional $\omega(\tau_k)=\widehat{se}_k^2/(\tilde\sigma_\tau^2+\widehat{se}_k^2)$ (eq. 6), a proximity-based "brute force" $\breve\omega_b(\tau_k)$ (eq. 7) and the Gelman-Pardoe $\lambda_\tau$ (eq. 8). Values of $0$ mean no pooling and $1$ full pooling; above 0.5 signals more general than local information.

## Overview

How the paper turns "how generalisable are these trials?" into numbers. This note defines each metric exactly, shows a worked computation with a runnable snippet, and records the interpretive rules.

## Main Content

### External validity and the predictive distribution

> [!definition] External validity via $\sigma_\tau^2$
> External validity is often characterised by how well the average impact predicts effects across contexts (Pritchett and Sandefur 2015; Allcott 2015), measured by the heterogeneity $\sigma_\tau^2$ in all the models. If $\sigma_\tau^2=0$ a policymaker in Ethiopia learns as much from Mexico as from Ethiopia itself; if $\sigma_\tau^2$ is large she learns little from studies outside her setting. A larger $\sigma_\tau^2$ widens the **posterior predictive distribution** of the impact in the next comparable study $\tau_{K+1}$ - the model-conditional best guess of the impact of expanding access in a new location. The paper therefore reports $\tilde\sigma_\tau^2$ and the full posteriors of $\tau$ and $\tau_{K+1}$.

^def-external-validity

A drawback: it is unclear what counts as a large or small $\sigma_\tau^2$, so interpretable pooling metrics are added.

### Pooling metrics

> [!definition] Equation (6) - Conventional pooling factor
> For each site $k$ (Gelman and Hill 2007, p. 477):
> $$\omega(\tau_k)=\frac{\widehat{se}_k^{\,2}}{\tilde\sigma_\tau^2+\widehat{se}_k^{\,2}}.$$
> It decomposes the potential variation in the estimate for site $k$ into genuine underlying uncertainty $\tilde\sigma_\tau^2$ and sampling error $\widehat{se}_k^2$. $\omega(\tau_k)>0.5$ means $\tilde\sigma_\tau^2$ is smaller than the sampling variation: substantial pooling and a "small" $\tilde\sigma_\tau^2$; then $\tau$ is a better signal of $\tau_k$ than $\hat\tau_k$ is, and a policymaker should update beliefs about the general effect from any one RCT. Concern: it conditions on sampling variation (so sample size influences it), which may be uncomfortable for frequentists.

^def-omega

> [!definition] Equation (7) - Brute-force (proximity) pooling factor
> $$\breve\omega_b(\tau_k)\equiv\big\{\omega:\;\tilde\tau_k=\omega\,\tilde\tau+(1-\omega)\,\hat\tau_k\big\},$$
> the weight that places the posterior mean $\tilde\tau_k$ of site $k$'s effect between the posterior mean $\tilde\tau$ of the general effect and the no-pooling estimate $\hat\tau_k$. In the Rubin model it equals $\omega(\tau_k)$; in richer models that pool several parameters (e.g. model 2) it differs. It is constrained to $[0,1]$ (rare excursions arise from shrinkage on other parameters).

^def-omega-brute

> [!definition] Equation (8) - Generalised pooling factor (Gelman and Pardoe 2006)
> Let $E_{\text{post}}[\cdot]$ be expectation under the full posterior and $\epsilon_k=\tau_k-\tau$. Then
> $$\lambda_\tau\equiv1-\frac{\dfrac{1}{K-1}\displaystyle\sum_{k=1}^K\big(E_{\text{post}}[\epsilon_k]-\overline{E_{\text{post}}[\epsilon]}\big)^2}{E_{\text{post}}\!\left[\dfrac1{K-1}\displaystyle\sum_{k=1}^K\big(\epsilon_k-\bar\epsilon\big)^2\right]}.$$
> The denominator is the posterior average variance of the errors; the numerator is the variance of the posterior *average* error across sites. A relatively large numerator means little pooling (the error variance is mostly across site-specific blocks); a small numerator means substantial pooling. Gelman and Pardoe suggest $\lambda_\tau>0.5$ indicates more general ("population-level") than site-specific information.

^def-lambda

All three have support $[0,1]$ ($0$ no pooling, $1$ full pooling), are reported as simple averages across sites, and are computed for both treatment effects $\tau$ and control means $\mu$ - the latter because similar control means could make similar treatment effects merely reflect similar study locations ([[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]).

> [!theorem] Conjugate link between $\omega$ and shrinkage (derived)
> In model (1) with $\tau,\sigma_\tau$ known, the posterior of $\tau_k$ is normal with mean $\omega_k\tau+(1-\omega_k)\hat\tau_k$ and variance $\omega_k\sigma_\tau^2=(1-\omega_k)\widehat{se}_k^2$, where $\omega_k=\widehat{se}_k^2/(\sigma_\tau^2+\widehat{se}_k^2)$. *Proof sketch:* combine the $N(\tau,\sigma_\tau^2)$ prior and $N(\tau_k,\widehat{se}_k^2)$ likelihood; the posterior precision is $1/\widehat{se}_k^2+1/\sigma_\tau^2$ and the posterior mean is the precision-weighted average. So $\omega_k$ is exactly the shrinkage weight toward the general effect, which is why eq. 7 coincides with eq. 6 in the Rubin model. (This identity is standard; the paper states only that eq. 7 equals eq. 6 in the Rubin model.)

^thm-omega-shrinkage

## Examples

> [!example] Pooling factors and predictive intervals in a Rubin model (hypothetical data)
> *Setup.* Seven sites with hypothetical estimates $\hat\tau=(24,-3,9,4,15,1,5)$ and standard errors $\widehat{se}=(20,6,12,2.5,18,3,8)$ (these are **not** Meager's data - her per-site posteriors are only in figures and online appendix tables). Flat prior on $\tau$, half-Cauchy$(0,10)$ prior on $\sigma_\tau$. Compute the grid posterior of $(\tau,\sigma_\tau)$, then $\omega_k$ at the posterior mean of $\sigma_\tau^2$, then the predictive $\tau_{K+1}\sim N(\tau,\sigma_\tau^2)$.
> *Solution.* Posterior mean $\tau=3.03$ and posterior mean $\sigma_\tau^2=18.4$. $\omega_k=(0.96,0.66,0.89,0.25,0.95,0.33,0.78)$, average $0.69$. Quantiles (2.5, 25, 50, 75, 97.5%): $\tau$: $(-2.1,1.4,2.9,4.5,8.9)$; $\tau_{K+1}$: $(-6.9,0.7,2.9,5.1,14.0)$. Full pooling: $2.80\pm3.43$.
> *Interpretation.* Imprecise sites (large $\widehat{se}$) are shrunk heavily ($\omega\approx0.95$) while the precise sites (se 2.5 and 3) keep most of their own signal; the 95% predictive interval for a new site (width 20.9) is nearly twice as wide as the interval for $\tau$ (width 11.0) - the same qualitative gap as Meager's Fig 5 vs OLS.

^ex-rubin-pooling

```python
import numpy as np
from scipy import stats

tau_hat = np.array([24.0, -3.0, 9.0, 4.0, 15.0, 1.0, 5.0])   # hypothetical
se      = np.array([20.0,  6.0, 12.0, 2.5, 18.0, 3.0, 8.0])
tau_grid = np.linspace(-30, 40, 701); sig_grid = np.linspace(0.01, 40, 800)
T, S = np.meshgrid(tau_grid, sig_grid, indexing="ij")
# marginal likelihood: tau_hat_k ~ N(tau, se_k^2 + sigma^2)
loglik = sum(stats.norm.logpdf(th, T, np.sqrt(s**2 + S**2)) for th, s in zip(tau_hat, se))
logpost = loglik + stats.halfcauchy.logpdf(S, scale=10)
post = np.exp(logpost - logpost.max()); post /= post.sum()

sig2_mean = (post * S**2).sum()
omega = se**2 / (sig2_mean + se**2)                  # eq. (6)
print("omega:", omega.round(2), "mean:", omega.mean().round(2))

rng = np.random.default_rng(0)
idx = rng.choice(post.size, 200_000, p=post.ravel())
tau_new = rng.normal(T.ravel()[idx], S.ravel()[idx])  # posterior predictive for tau_{K+1}
print("tau_{K+1} quantiles:", np.percentile(tau_new, [2.5, 25, 50, 75, 97.5]).round(1))
```

## Connections

- The model that defines $\tau_k$, $\sigma_\tau$: [[Meager 2019 - Hierarchical Model Specifications]]; priors/estimation: [[Meager 2019 - Bayesian Estimation, Priors and Computation]].
- Reported pooling values: [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]].
- Partial pooling as a multiplicity correction: [[Partial Pooling as Multiple Comparisons Correction]].
- Complementary fixed-vs-random view of study weighting: [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]].

### Relevance to marketing measurement

For a set of channel lift tests, report $\omega$ per test and the posterior predictive interval for the next flight rather than just the average lift; a "portability score" near 1 says one market's result is informative for another, near 0 says test each market.

## See Also

- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Hierarchical Models]]
