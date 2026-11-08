---
title: "Silverman 2020 - Poisson Log-Linear Model for Multiple Lists"
tags:
  - source/ingested
  - topic/population-estimation
  - type/definition
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 3, Eq. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Data Sets for Multiple Systems Estimation]]"
used_by:
  - "[[Silverman 2020 - Frequentist Model Selection Results]]"
  - "[[Silverman 2020 - Bayesian-Threshold Method]]"
aliases:
  - Cormack log-linear capture-recapture
  - dark figure Poisson model
---

# Silverman 2020 - Poisson Log-Linear Model for Multiple Lists

> [!summary]
> Cormack's (1989) log-linear model treats the count $N_A$ of cases on exactly the lists in $A$ as independent Poisson($\lambda_A$) with $\log\lambda_A$ = intercept + list main effects + pairwise interactions. The dark figure is $N_\emptyset\sim\text{Poisson}(\lambda_\emptyset)$ with $\log\lambda_\emptyset=\mu$, so the estimate is simply $e^{\mu}$.

## Overview

With $K$ lists, for each subset $A\subseteq\{1,\dots,K\}$ let $N_A$ be the number of cases on all lists in $A$ and no others. With $K=6$ there are 64 subsets; the empty set $\emptyset$ is the unobserved "dark figure"; 63 cells are observable (zero counts reinstated, e.g. 26 non-zero UK rows become 63 observations).

## Main Content

> [!definition] Poisson log-linear MSE model (Eq. 1)
> $N_A\overset{ind}{\sim}\text{Poisson}(\lambda_A)$ with
> $$
> \log\lambda_A=\mu+\sum_{i\in A}\alpha_i+\sum_{\substack{i,j\in A\\ i<j}}\beta_{ij}.
> $$
> $\mu$ intercept, $\alpha_i$ main effect of list $i$ (its size), $\beta_{ij}$ pairwise interaction ($\exp\beta_{ij}$: how many times more or less likely a case is to be on both $i$ and $j$ than under independence). With $K=6$: 6 main effects and 15 interactions = 22 parameters fitted to 63 observable cells. Higher-order interactions are omitted.
^def-ms-loglinear

> [!theorem] Dark figure estimate
> $\log\lambda_\emptyset=\mu$, so $\hat N_\emptyset=e^{\hat\mu}$; the total is $\hat N=n+e^{\hat\mu}$ with $n$ the observed count. Estimation error in $\lambda_\emptyset$ is expected to dominate Poisson variation, so $\hat\lambda_\emptyset$ is used as the estimate. Other parameters are not needed for the point estimate (but they determine $\mu$).
^thm-ms-dark-figure

**Assumptions.** Cases behave independently and obey the same probability laws of appearing on the lists. This is strong; with observed covariates it is "only a jumping off point". Lists need not be independent: interactions encode dependence.

**Link to the multinomial model.** The Poisson model approximates a multinomial with fixed unknown total, cases falling on list combinations with probabilities proportional to the Poisson means. Cormack (1992) gives a profile-likelihood interval for the total under the multinomial.

**Two model-fitting strategies**: (1) choose a subset of parameters by a model-selection criterion and constrain the rest to zero ([[Silverman 2020 - Frequentist Model Selection Results]]); (2) model-average, usually Bayesian ([[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]], [[Silverman 2020 - Bayesian-Threshold Method]]).

## Examples

> [!example] Two lists: Lincoln-Petersen as a special case
> $K=2$, main effects only: independence of lists. The cells $N_{\{1\}},N_{\{2\}},N_{\{12\}}$ are fitted exactly and $e^{\hat\mu}=N_{\{1\}}N_{\{2\}}/N_{\{12\}}$, which gives $\hat N=n_1n_2/m$ (Lincoln-Petersen) once $n_1=N_{\{1\}}+N_{\{12\}}$, $n_2=N_{\{2\}}+N_{\{12\}}$, $m=N_{\{12\}}$ and the observed total are added back. See [[Concept - Closed-Population Capture-Recapture and Otis Models]]. If the two lists are positively dependent the independence estimate is biased low.

```python
# Poisson log-linear MSE: statsmodels, main effects only, K=3 lists
import numpy as np, itertools, statsmodels.api as sm
K = 3
cells = [h for h in itertools.product([0, 1], repeat=K) if any(h)]
counts = np.array([40, 35, 8, 30, 10, 9, 3])          # illustrative counts
X = sm.add_constant(np.array(cells, float))
fit = sm.GLM(counts, X, family=sm.families.Poisson()).fit()
mu = fit.params[0]; n = counts.sum()
print("dark figure", np.exp(mu), "total", n + np.exp(mu))
```

## Connections

- Poisson/multinomial correspondence and the latent-table view: [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]].
- Generalized linear model background: [[Generalized Linear Models]].
- Prior choices on $\beta_{ij}$: [[Silverman 2020 - Bayesian-Threshold Method]].

## See Also

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
