---
title: "Hierarchical Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/hierarchical-models
  - topic/partial-pooling
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Multilevel models"
  - "Partial pooling"
  - "Eight schools"
doc_type: concept
source_location: "BDA3 Ch.5, pp. 101-138"
depends_on:
  - "[[Single-Parameter Models]]"
  - "[[Probability and Bayesian Inference]]"
  - "[[Multiparameter Models]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Hierarchical Linear Models]]"
  - "[[MCMC Basics]]"
  - "[[Computational Troubleshooting]]"
  - "[[Choosing and Building Models]]"
  - "[[Iterative Model Improvement]]"
  - "[[Evaluating Fitted Models]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
  - "[[Empirical Bayes - Overview]]"
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[Customer Lifetime Value - Overview]]"
  - "[[Local vs Global Forecasting Models]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
---

# Hierarchical Models

> [!summary]
> Chapter 5 of BDA3 introduces hierarchical (multilevel) models — the workhorse of applied Bayesian statistics. Parameters are modeled as exchangeable draws from a common population distribution, enabling partial pooling between groups. Partial pooling optimally balances bias and variance: it shrinks noisy estimates toward the group mean while preserving well-estimated group effects.

## The Core Idea: Exchangeability

Parameters $\theta_1, \ldots, \theta_J$ are **exchangeable** if their joint distribution is invariant to permutations of the indices — we have no prior reason to treat any group differently. By **de Finetti's theorem**, exchangeable parameters can be written as conditionally i.i.d. given hyperparameters:

$$\theta_j \mid \mu, \tau \sim \mathcal{N}(\mu, \tau^2), \quad j = 1, \ldots, J$$

This is the probabilistic justification for the hierarchical model structure: exchangeability implies a prior, not the other way around.

> [!definition] Definition: Exchangeability
> A sequence $\theta_1, \ldots, \theta_J$ is exchangeable if for any permutation $\pi$:
> $$p(\theta_1, \ldots, \theta_J) = p(\theta_{\pi(1)}, \ldots, \theta_{\pi(J)})$$
> Finite exchangeability implies a hierarchical model with hyperparameter $\phi$.
^def-exchangeability

## The Eight Schools Example

The canonical example (Rubin 1981): estimating coaching effects from 8 independent educational experiments, each with its own estimated effect $y_j$ and known SE $\sigma_j$.

| Estimator | Approach | Result |
|-----------|----------|--------|
| No pooling | $\hat{\theta}_j = y_j$ | High variance; large SEs |
| Complete pooling | $\hat{\theta}_j = \bar{y}$ | Biased if effects truly differ |
| **Partial pooling** | Hierarchical posterior | Optimal bias-variance tradeoff |

The Bayes estimate under the normal hierarchical model:
$$\hat{\theta}_j^{\text{Bayes}} \approx \frac{\frac{1}{\sigma_j^2}\, y_j + \frac{1}{\tau^2}\, \mu}{\frac{1}{\sigma_j^2} + \frac{1}{\tau^2}}$$

This is a **precision-weighted average** of the group observation $y_j$ and the grand mean $\mu$. The weight on the group observation increases as $\sigma_j$ decreases (more data) or $\tau$ increases (more between-group variation). ^partial-pooling-formula

**Key insight**: the posterior for $\tau$ is informed by how much the groups actually vary. If all $y_j$ are similar, $\hat{\tau} \approx 0$ and estimates collapse to complete pooling. If they vary widely, $\hat{\tau}$ is large and estimates approach no-pooling.

## Structure of a Hierarchical Model

> [!definition] Definition: Three-Level Hierarchical Model
> $$y_j \mid \theta_j \sim p(y_j \mid \theta_j) \quad \text{(data model)}$$
> $$\theta_j \mid \phi \sim p(\theta_j \mid \phi) \quad \text{(group-level model / prior)}$$
> $$\phi \sim p(\phi) \quad \text{(hyperprior)}$$
> where $\phi = (\mu, \tau)$ are the hyperparameters governing the group-level distribution.
^def-hierarchical-structure

The posterior factorizes as:
$$p(\theta_1, \ldots, \theta_J, \phi \mid y) \propto p(\phi) \prod_{j=1}^{J} p(\theta_j \mid \phi)\, p(y_j \mid \theta_j)$$

Inference proceeds by first marginalizing over $\phi$, then drawing $\theta_j \mid \phi$ given the posterior for $\phi$. In practice this requires MCMC (see [[MCMC Basics]]).

## Hyperprior Choice

The hyperprior on $\tau$ (the between-group SD) is critical:
- **Flat prior** $p(\tau) \propto 1$: can cause improper posteriors when $J$ is small
- **Half-Cauchy($0, s$)**: recommended weakly informative prior (Gelman 2006); $s$ set to the expected scale of between-group variation
- **Half-$t_\nu$**: heavier tails than half-Cauchy; useful when outlier groups are plausible
- **Inverse-Gamma**: historically popular but can underestimate $\tau$ — avoid

> [!warning] Boundary Avoidance
> When $J$ is small (e.g. $J < 5$ groups), the posterior for $\tau$ can concentrate near 0, collapsing to complete pooling. Use half-Cauchy or half-$t$ hyperpriors with a scale parameter informed by domain knowledge to avoid this.

## Partial Pooling as Regularization

Partial pooling is equivalent to **regularization** of the group-level estimates. The hierarchical prior on $\theta_j$ acts as a penalty on how far group means deviate from $\mu$:
- Analogous to ridge regression (L2 penalty) applied to group effects
- The penalty strength is determined *from the data* via the posterior for $\tau$, unlike fixed ridge penalties
- In high dimensions, this adaptive regularization is crucial — see [[Bayesian Linear Regression]] for the regression analog

This connection makes hierarchical models the Bayesian answer to many problems framed as "multiple comparisons" or "multiple testing" in the frequentist literature. See [[Partial Pooling as Multiple Comparisons Correction]] for the formal algebra.

## Key Practical Concepts

- **Weakly informative hyperpriors**: half-Cauchy or half-$t$ on $\tau$ avoid boundary issues
- **Meta-analysis**: hierarchical models are the natural framework for combining estimates across studies — the group-level model is the meta-analytic model
- **Non-centered parameterization**: for sampling efficiency, reparameterize $\theta_j = \mu + \tau \eta_j$, $\eta_j \sim \mathcal{N}(0,1)$ — avoids funnel geometry in the posterior
- **Varying intercepts and slopes**: the regression extension ([[Hierarchical Linear Models]]) allows $\mu_j$ and $\beta_j$ to vary by group, with partial pooling on each

## Connections to Causal Inference

Hierarchical models appear naturally in causal inference:
- **Treatment effect heterogeneity**: each unit's effect $\tau_i$ as an exchangeable draw from a population distribution — connects to [[Local Average Treatment Effects]] (compliers form a group)
- **Principal stratification** (see [[Instrumental Variables and Principal Stratification]]): compliance strata are exchangeable latent groups
- **Bayesian DiD**: see [[Bayesian Difference in Differences]] for partial pooling over time periods

## See Also

- [[Single-Parameter Models]] — building block for each group
- [[Bayesian Workflow - Overview]] — iterative building of hierarchical models
- [[Partial Pooling as Multiple Comparisons Correction]] — how partial pooling formally serves as a multiple comparisons correction (z-score shrinkage algebra)
- [[Multiple Comparisons - Bayesian Perspective]] — Gelman et al. (2009) on multilevel models replacing classical corrections
- [[Type S and Type M Errors]] — the error framework that motivates hierarchical modeling over classical corrections
- [[Local Average Treatment Effects]] — treatment effect heterogeneity in econometrics
- [[Differences-in-Differences]] — frequentist panel approach using similar exchangeability assumptions
- [[Instrumental Variables]] — complier heterogeneity parallels hierarchical variation across groups
- [[Bayesian Linear Regression]] — the single-level model that hierarchical models generalize
- [[Overfitting and Information Criteria]] — model comparison and regularization connect directly to partial pooling
- [[Garden of Forking Paths]] — hierarchical models address multiple comparisons that forking paths create
- [[Researcher Degrees of Freedom]] — partial pooling regularizes the researcher-flexibility problem structurally
- [[Linear Models in Statistical Rethinking]] — the single-level Gaussian model that hierarchical models extend (McElreath Ch. 4 → Ch. 12)
- [[Generalized Linear Models]] — hierarchical GLMs add group-level random effects to non-Gaussian likelihoods
- [[Efficient MCMC]] — HMC with non-centered parameterization is required for efficient sampling from hierarchical posteriors
- [[Power Analysis and Sample Size]] — multilevel models improve effective power by pooling information across groups
- [[Empirical Bayes - Overview]] — empirical-Bayes estimation of the prior, the frequentist analogue of hierarchical pooling
- [[Local vs Global Forecasting Models]] — partial pooling analogy for cross-series learning
- [[Bayesian and Hierarchical Extensions of CLV Models]] — hierarchical Bayes for customer-level parameters
- [[Bayesian Media Mix Modeling - Overview]] — an applied example: hierarchical priors pooling media effects across geos or brands
