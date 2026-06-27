---
title: "Nuisance Parameter Bias Simulation"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/research-methodology
  - type/example
  - doc/article
  - method/stan
  - method/r
  - method/python
source: "[[raw/These Are Not the Effects You Are Looking For]]"
source_location: "Simulation Study"
date_ingested: 2026-06-26
folder: "Research Methodology"
doc_type: article
depends_on:
  - "[[Table 2 Fallacy]]"
  - "[[Logic of Regression Adjustment]]"
  - "[[DAGs and Causal Identification]]"
used_by:
  - "[[Table 2 Fallacy]]"
aliases:
  - Table 2 simulation
  - nuisance parameter bias
---

# Nuisance Parameter Bias Simulation

> [!summary]
> A simulation study by A. Jordan Nafa (2022) demonstrates empirically that nuisance parameters in multivariable regression are almost never recoverable as causal effects, and that this bias does not shrink with sample size. Using 3,000 simulated datasets fit with Stan/HMC, the study shows 90% credible intervals for confounder coefficients fail to contain the true value 70–99% of the time.

## Overview

This simulation provides a concrete, quantitative demonstration of the [[Table 2 Fallacy]]. The key insight: if one would not present and interpret the coefficient for $X$ without a valid identification strategy for $X$, one should not interpret any other coefficient without an equally valid strategy for *that* variable. Since most applied regression models lack such strategies for their confounders, essentially all nuisance parameter interpretations in the literature are invalid.

## Simulation Design

### Causal Graph

The data-generating process (DGP) is a DAG with:
- **Observed**: treatment $X$, outcome $Y$, measured confounders $\{Z, W, L, J\}$
- **Unobserved**: confounders $U$ (fixed at 1.0) and $V$ (fixed at 0.5)
- **Biasing paths**: $Z \leftarrow U \to Y$ and $J \leftarrow V \to Y$

The valid adjustment set for identifying $X \to Y$ is $\{Z, W, L, J\}$. However:
- $Z \to Y$ is confounded by $Z \leftarrow U \to Y$ (potentially)
- $J \to Y$ is confounded by $J \leftarrow V \to Y$ (always)
- $W \to Y$ is confounded by $W \leftarrow U \to Y$ (always, since $W = \gamma_1 U + \epsilon$)
- $L \to Y$ is confounded by both $U$ and $V$ (always)

### Experimental Manipulation

The path $U \to Z$ is toggled by a binary condition `cond`:
- **Z Unconfounded** (`cond = FALSE`): $U$ does not flow into $Z$, so $Z$ and $U$ are independent → $Z \to Y$ is identifiable
- **Z Confounded** (`cond = TRUE`): $Z = \gamma_5 W + U \cdot \delta + \gamma_6 L + \epsilon_Z$ → $Z \to Y$ is unidentifiable

### Data Generation Equations

$$
\begin{aligned}
W_i &\sim \gamma_1 U + \sigma_W \\
J_i &\sim \gamma_2 V + \sigma_J \\
L_i &\sim \gamma_3 U + \gamma_4 V + \sigma_L \\
Z_i &\sim \gamma_5 W_i + \delta U + \gamma_6 L_i + \sigma_Z
\end{aligned}
$$

Treatment propensity:

$$
\begin{aligned}
X_i &\sim \text{Bernoulli}(\theta_i) \\
\theta_i &= \text{logit}^{-1}(\gamma_7 Z_i + \gamma_8 W_i + \gamma_9 J_i + \gamma_{10} L_i + \sigma_X)
\end{aligned}
$$

Outcome DGP:

$$Y_i \sim \alpha + \beta_1 X_i + \beta_2 Z_i + \beta_3 L_i + \beta_4 J_i + \beta_5 W_i + V + U + \sigma$$

where $\alpha = 0.50$, $\sigma \sim \mathcal{N}(0, 0.5)$, true coefficients: $\beta_X = -0.5$, $\beta_Z = 0.0$, $\beta_L = 0.5$, $\beta_J = 0.0$, $\beta_W = 0.5$.

**Scale**: 3,000 datasets (500 repetitions × 3 sample sizes [2,500, 5,000, 10,000] × 2 conditions [Z confounded, Z unconfounded]).

### Code: Data Simulation (R)

```r
sim_dag_data <- function(N, a, b, cond, conf) {
  g <- rnorm(10, 0.5, 0.5)          # path coefficients
  V <- conf[1] + rnorm(N, 0, 0.1)
  U <- conf[2] + rnorm(N, 0, 0.1)
  W <- g[1] * U + rnorm(N, 0, 0.1)
  J <- g[2] * V + rnorm(N, 0, 0.1)
  L <- g[3] * U + g[4] * V + rnorm(N, 0, 0.1)
  Z <- g[5] * W + (U * cond) + g[6] * L + rnorm(N, 0, 0.1)
  logit_theta <- g[7]*Z + g[8]*W + g[9]*J + g[10]*L + rnorm(N, 0, 0.01)
  theta <- exp(logit_theta)/(1 + exp(logit_theta))
  X <- rbinom(N, size = 1, prob = theta)
  mu <- b[1]*X + b[2]*Z + b[3]*L + b[4]*J + b[5]*W
  Y <- a + mu + U + V + rnorm(N, 0, 0.2)
  data.table(X, Z, L, J, W, Y)
}
```

### Code: Data Simulation (Python)

```python
def sim_dag_data(N, a, b, cond, conf):
    g = rnorm(0.5, 0.5, 10)
    V = conf["V"] + rnorm(0, 0.1, N)
    U = conf["U"] + rnorm(0, 0.1, N)
    W = g[0] * U + rnorm(0, 0.1, N)
    J = g[1] * V + rnorm(0, 0.1, N)
    L = g[2] * U + g[3] * V + rnorm(0, 0.1, N)
    Z = g[4] * W + (U * cond) + g[5] * L + rnorm(0, 0.1, N)
    logit_theta = g[6]*Z + g[7]*W + g[8]*J + g[9]*L + rnorm(0, 0.01, N)
    theta = inv_logit(logit_theta)
    X = rbinom(n=1, p=theta, size=N)
    mu = b["X"]*X + b["Z"]*Z + b["L"]*L + b["J"]*J + b["W"]*W
    Y = a + mu + U + V + rnorm(0, 0.2, N)
    return DataFrame({"X": X, "Z": Z, "L": L, "J": J, "W": W, "Y": Y})
```

### Model Specification

A Bayesian linear regression with weakly informative priors scaled to the data (Gelman, Hill & Vehtari 2021):

$$
\begin{aligned}
y_i &\sim \mathcal{N}(\mu, \sigma) \\
\mu &= \alpha + \mathbf{X}_n \boldsymbol{\beta}_k \\
\alpha &\sim \mathcal{N}(\bar{y},\; 2\sigma_y) \\
\beta_k &\sim \mathcal{N}\!\left(0,\; 2\frac{\sigma_y}{\sigma_{x_k}}\right) \\
\sigma &\sim \text{Exponential}\!\left(\frac{1}{\sigma_y}\right)
\end{aligned}
$$

### Code: Stan Model

```stan
data {
  int<lower=1> N;
  int<lower=1> K;
  vector[N] Y;
  matrix[N, K] P;
  vector[K] truth;
}
transformed data {
  matrix[N, K] X;
  vector[K] X_means;
  vector[K] X_sd;
  for (i in 1:K) {
    X[, i] = P[, i] - mean(P[, i]);
    X_means[i] = mean(P[, i]);
    X_sd[i] = sd(P[, i]);
  }
  real mu_alpha = mean(Y);
  real sigma_alpha = 2 * sd(Y);
  vector[K] beta_sd = 2 * (sd(Y)/X_sd);
  real sigma_prior = 1/sd(Y);
}
parameters {
  real alpha;
  vector[K] beta;
  real<lower = 0> sigma;
}
model {
  target += normal_id_glm_lpdf(Y | X, alpha, beta, sigma);
  target += exponential_lpdf(sigma | sigma_prior);
  target += normal_lpdf(alpha | mu_alpha, sigma_alpha);
  target += normal_lpdf(beta | 0, beta_sd);
}
generated quantities {
  real Intercept = alpha - dot_product(beta, X_means);
  vector[K] bias = truth - beta;
}
```

Fitting: 4 HMC chains × 2,000 iterations (1,000 warmup), `adapt_delta=0.9`, `max_treedepth=12`. Parallelized via `{furrr}` (3 workers); wall time ≈ 35 minutes on 12-core Ryzen 9 5900X.

## Results

### Coverage Probabilities for 90% Credible Intervals

| Parameter | True Value | Z Confounded (n=2,500) | Z Confounded (n=5,000) | Z Confounded (n=10,000) | Z Unconfounded (n=2,500) | Z Unconfounded (n=5,000) | Z Unconfounded (n=10,000) |
|-----------|------------|----------------------|----------------------|------------------------|--------------------------|--------------------------|---------------------------|
| $X$ | −0.5 | 0.89 | 0.89 | 0.91 | 0.89 | 0.90 | 0.89 |
| $Z$ | 0.0 | **0.01** | **0.01** | **0.00** | 0.93 | 0.91 | 0.90 |
| $L$ | 0.5 | 0.16 | 0.11 | 0.07 | 0.06 | 0.05 | 0.03 |
| $J$ | 0.0 | 0.13 | 0.07 | 0.06 | 0.11 | 0.08 | 0.06 |
| $W$ | 0.5 | 0.29 | 0.21 | 0.15 | 0.14 | 0.13 | 0.09 |

> [!example] Key Takeaways from Coverage Table
> 1. **$X$ recovers well** in both conditions: 90% CIs capture the true value at nominal rates (~89–91%).
> 2. **$Z$ is correctly recoverable only when unconfounded** by $U$ (coverage 90–93%). When $U \to Z$ is active, coverage collapses to essentially zero (0–1%).
> 3. **$L$, $J$, $W$ are almost never recovered** — in either condition. Coverage rates of 3–29% mean the CI misses the true value 71–97% of the time.
> 4. **Coverage for nuisance parameters decreases as $n$ grows** — bigger data makes the wrong inference more confidently wrong.
^ex-coverage-table

### Error of Magnitude

Among models where the 90% CI fails to capture the true value, the average Root Mean Squared Error (RMSE) of the bias is substantial:
- For $Z$ (confounded condition): high RMSE, comparable to the true value's scale
- For $J$, $L$, $W$: average bias RMSE is often *worse* in the unconfounded condition for $Z$ than in the confounded condition — the residual confounding (via $U$ and $V$) is severe regardless

Error rates by parameter:
- $L$: wrong 88.5% of the time (average across conditions and sample sizes)
- $J$: wrong 91.6% of the time
- $W$: wrong 78.4% of the time
- $Z$ (confounded): wrong 99.6% of the time

### Practical Implication

> [!example] The "Big Data" Fallacy
> Since bias in nuisance parameters does not decrease with $n$, increasing sample size does not mitigate the Table 2 Fallacy. Large observational datasets produce narrower credible intervals *around the wrong value*. "Big data" is not a substitute for causal reasoning and experimental design.
^ex-big-data

## Connections

- [[Table 2 Fallacy]] — This simulation is the empirical proof-of-concept for the Table 2 Fallacy argument
- [[Logic of Regression Adjustment]] — The theoretical explanation for why coverage fails for nuisance parameters
- [[DAGs and Causal Identification]] — The DAG structure underlying the DGP and the adjustment set choice
- [[Bayesian Propensity Score Weighting]] — A correct approach that avoids misinterpreting confounder coefficients by focusing estimation on the treatment

## See Also

- [[Simulation-Based Calibration - Overview]] — Related technique for validating that a Bayesian model recovers true parameter values under its own DGP
- [[Omitted Variables Bias]] — What happens when the confounder set is *incomplete* (different failure mode from Table 2 Fallacy)
