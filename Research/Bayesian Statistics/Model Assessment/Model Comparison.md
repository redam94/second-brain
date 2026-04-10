---
title: "Model Comparison"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/model-comparison
  - topic/cross-validation
  - topic/information-criteria
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Model Assessment"
aliases:
  - "WAIC"
  - "LOO-CV"
  - "Bayes factors"
  - "ELPD"
doc_type: concept
source_location: "BDA3 Ch.7:165-196"
depends_on:
  - "[[Model Checking]]"
  - "[[Bayesian Linear Regression]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Overfitting and Information Criteria]]"
  - "[[Decision Analysis]]"
  - "[[Nonparametric Models Overview]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
---

# Model Comparison

> [!summary]
> Chapter 7 of BDA3 covers methods for evaluating, comparing, and expanding models based on predictive accuracy. The key measure is expected log predictive density (ELPD), estimated via cross-validation or information criteria.

## Measures of Predictive Accuracy

The gold standard is the **expected log pointwise predictive density (ELPD)**:

$$\text{elpd} = \sum_{i=1}^n \int p_t(\tilde{y}_i) \log p(\tilde{y}_i \mid y)\, d\tilde{y}_i$$

where $p_t$ is the true data-generating distribution. This must be estimated since $p_t$ is unknown.

## Information Criteria

- **AIC**: $-2\log p(y \mid \hat{\theta}) + 2k$ — penalizes by number of parameters $k$
- **DIC**: replaces $k$ with effective number of parameters $p_D$
- **WAIC** (Widely Applicable IC): fully Bayesian, computed from the posterior:
  $$\widehat{\text{elpd}}_{\text{WAIC}} = \sum_{i=1}^n \left(\log \frac{1}{S}\sum_{s=1}^S p(y_i \mid \theta^s) - V_s[\log p(y_i \mid \theta^s)]\right)$$

## Cross-Validation

- **Leave-one-out CV (LOO-CV)**: gold standard but expensive
- **Pareto-smoothed importance sampling (PSIS-LOO)**: efficient approximation using importance weights from the full posterior — implemented in the `loo` R package
- Preferred over WAIC in practice due to better diagnostics ($\hat{k}$ diagnostic)

## Bayes Factors

$$\text{BF}_{12} = \frac{p(y \mid M_1)}{p(y \mid M_2)} = \frac{\int p(y \mid \theta_1, M_1) p(\theta_1 \mid M_1)\, d\theta_1}{\int p(y \mid \theta_2, M_2) p(\theta_2 \mid M_2)\, d\theta_2}$$

> [!warning]
> Bayes factors are sensitive to the prior, especially for vague priors. BDA3 generally recommends predictive approaches (LOO, WAIC) over Bayes factors for model comparison.

## See Also

- [[Model Checking]] — qualitative model assessment
- [[Iterative Model Improvement]] — using comparisons to guide model building
- [[Evaluating Fitted Models]] — workflow perspective
