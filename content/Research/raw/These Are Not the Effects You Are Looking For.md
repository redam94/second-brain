---
title: "These Are Not the Effects You Are Looking For"
source: "https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/"
author:
  - "[[A. Jordan Nafa]]"
published:
created: 2026-06-25
description: "This blog post provides an overview of the logic of statistical control, the fallacy of mutual adjustment, and a simulation-based illustration of correct and incorrect approaches to the interpretation of multivariable regression models in the social sciences."
tags:
  - "clippings"
---
Notes About Assumptions

This post assumes a basic familiarity with Rubin’s ([^11], [^12], [^13]) potential outcomes framework and the general logic of directed acyclic graphs. For an introductory overview of the logic of causal inference in observational settings that may provide helpful background, I direct readers to Rohrer ([^10]) and Cinelli, Forney, and Pearl ([^1]).

## Introduction

Westreich and Greenland ([^15]) originally coined the term Table 2 fallacy to describe the common practice of presenting confounders included in a regression model alongside the treatment or exposure of interest in Table 2 of an article and tendency of researchers to interpret the coefficients for said confounders as total effect estimates. Subsequent work has further highlighted the problem in political science ([Keele, Stevenson, and Elwert 2019](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Keele2019)), economics ([Hünermund and Louw 2020](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Huenermund2020)), and sociology ([Lundberg, Johnson, and Stewart 2021](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Lundberg2021)). The consequences of this practice are often pernicious, with subsequent studies treating inappropriately reported estimates as theoretically informative quantities despite having no valid interpretation in their original context and readers drawing incorrect conclusions with no empirical basis. Despite efforts to discourage the practice and some steps in the right direction, the Table 2 fallacy remains an often committed mistake by researchers across a diverse range of fields.

This blog post provides an overview of the logic of statistical control, the fallacy of mutual adjustment, and a simulation-based illustration of correct and incorrect approaches to the interpretation of multivariable regression models in the social sciences. In this post I take as my starting point two primary assumptions about research in the quantitative social sciences. First, I assume the goal of any scientific study that does not explicitly state otherwise is to evaluate some proposed theoretical explanation for an assumed causal relationship. Research in the contemporary social sciences is primarily interested in evaluating theoretical claims about causal processes and the practice of relying on euphamisms and weasel words to avoid saying *cause* and *effect* while still heavily implying the existance of a causal relationship does not change this reality ([Hernán 2018](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Hernan2018); [Samii 2016](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Samii2016)).

Second, I assume that any theoretical process from which testable implications can be derived may be represented in the form of a directed acyclic graph (DAG). While DAGs may be more common in some fields than others, the ability to express an assumed theoretical process in the form of a non-parameteric causal graph is a necessary condition for specifying a model of the process and estimating a causal relationship. If this is not possible, it generally implies the researcher is confused about what exactly they are trying to accomplish and does not have a properly defined research question ([Lundberg, Johnson, and Stewart 2021](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Lundberg2021)).

Neither of these assumptions should be taken to imply all research in the social sciences must be concerned with evaluating causal claims. Indeed, there is value in *mere description* and exploratory research that highlights interesting questions and provides useful context for causal analyses or theory building ([Gerring 2004](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Gerring2004), [^4]). It is, however, necessary to be explicit about our inferential goals and the question we are attempting to answer in a given study. After all, the foundation of social scientific inquiry and quantitative research more broadly lies in the art of providing vague answers to precise questions.

## The Logic of Regression Adjustment

Following Rubin ([^11], [^12], [^13]), a causal effect is defined as the difference in *potential outcomes*. Letting $Y_{i}$ represent the observed outcome for each unit $i \in \left\{1 , 2 , \ldots , N\right\}$, $X_{i}$ the observed treatment status for the $i^{t h}$ unit, and $Z$ some set of measured confounders that influence both the treatment assignment mechanism and the observed outcome we can express the causal effect of a binary treatment as

$$
Y_{i} \left(X_{i} = 1 , Z_{i}\right) - Y_{i} \left(X_{i} = 0 , Z_{i}\right) (\text{1})
$$

As equation [1](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#eq-causal-effect) makes clear, a causal effect is the difference between the value of the outcome we observe under the treatment status $X_{i} = 1$ for unit $i$ and the *counterfactual* and value of the outcome we would have observed under $X_{i} = 0$.

In an ideal world, we could estimate unit-level treatment effects. In practice, however, since for each unit $i$ we can observe the potential outcome $Y_{i} \left(X_{i} = 1\right)$ or $Y_{i} \left(X_{i} = 0\right)$ but it is logically impossible to observe both. As such we typically take as our estimand the treatment effect in some subset of the population. For example, in a Bayesian framework we can express the posterior distribution of the population average treatment effect as

$$
PATE = \int E \left[Y_{ij} \left(X_{ij} = 1 , Z_{ij}\right)\right] - E \left[Y_{ij} \left(X_{ij} = 0 , Z_{ij}\right)\right] d Z_{ij} (\text{2})
$$

Given a set of identifying assumptions, equation [2](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#eq-bayes-pate) yields an estimate for the posterior distribution of the expected change in the outcome if all of the units received the treatment compared to what we would have observed if no unit was treated ([Oganisian and Roy 2020](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Oganisian2020)). We can represent this process in the form of a DAG as shown in figure [1](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#fig-simple-dag), which implies conditional on the set of measured confounders $Z = \left\{z_{1} , z_{2} , z_{3}\right\}$, the treatment assigment is as good as random thus identifying the causal path $X \rightarrow Y$. There are several strategies one might take to close the backdoor confounding paths $X \leftarrow Z \rightarrow Y$ including though not necessarily limited to random assignment of the treatment, propensity-score based methods, and regression adjustment. Since the topic of this post is statistical control, however, I limit my focus here to regression adjustment.

![](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/figs/fig-simple-dag.svg)

Figure 1: Simple DAG for the Effect of X on Y where Z Denotes Observed Confounders and U is an Unobserved Confounder

Although adjusting for the set of confounders $Z$ is sufficient to identify the total effect of $X$ on $Y$, it would be erronous to assume, as many researchers do, this implies any of the confounders in the adjustment set $Z$ are also themselves causally identified. In fact, based on the DAG in figure [1](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#fig-simple-dag), it is mathematically impossible to simultaneously identify both $X$ and any variable in the set $Z$ due the biasing paths $Z \leftarrow U \rightarrow Y$ where $U$ is an unobserved confounder. That is, under ideal conditions regression adjustment can be used to estimate causal effects in the abscence of random assignment. As a general rule, however, it is unlikely other covariates in a regression model may be ascribed a valid causal interpretation without further assumptions that are difficult to defend in practice.

## Simulation Study

To further illustrate why the concept of *mutual adjustment* is fundamentally flawed, consider the more complex data generation process depicted by the causal graph in figure [2](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#fig-dgp-dag). As in the example above, $X$ is some exposure or treatment of interest, $Y$ is the outcome, $\left\{Z , W , L , J\right\}$ is a set of measured confounders, and $\left\{U , V\right\}$ are unobserved confounders.

![](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/figs/fig-dgp-dag.svg)

Figure 2: DAG for a Hypothetical Data Generation Process

If our primary objective is to identify the causal path $X \rightarrow Y$, this can be acheived by adjusting for the set $\left\{Z , L , W , J\right\}$ as illustrated in figure [3](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#fig-simulation-dgp).[^17] Although this set is sufficient to identify the path $X \rightarrow Y$, it does not identify other paths such as $J \rightarrow Y$ or $Z \rightarrow Y$ which are confounded by the biasing paths $J \leftarrow V \rightarrow Y$ and $Z \leftarrow U \rightarrow Y$ respectively. If this all seems abstract, you can simply substitute the letters representing nodes in the figure above for theoretical constructs that are more familiar. The important takeaway here is when using statistical adjustment as an empirical strategy, the relationship between treatment and outcome is the path we care about and the adjustment set is a sacrifice we make on the altar of causal identification.

![](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/figs/fig-simulation-dgp.svg)

Figure 3: Data Generation Process for the Simulation Study

Thus far I have levied several bold claims, some of which amount to accusing many accomplished scholars of engaging in a practice that effectively amounts to the propagation of pseudo-science. Although I have grounded this argument squarely in the logic of causality, some readers may insist upon further illustration of just how wrong the practice of presenting and interpreting coefficients for nuisance parameters can be. After all, if we are able to justify the assumption the unobserved confounder $U$ is conditionally independent of $Z$, it is possible to jointly identify the causal paths $Z \rightarrow Y$ and $X \rightarrow Y$ based on the adjustment set $\left\{L , W , J\right\}$.

To demonstrate the magnitude of the problem, I simulate data based on the theoretical process depicted in figure [3](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#fig-simulation-dgp), manipulating the path $U \rightarrow Z$ to assess the bias in the estimate for the causal effect of $Z$ on $Y$. I also vary the dimensions of the data, considering 2,500, 5,000, and 10,000 observations and repeat the simulation 500 times per cell, resulting in 3,000 unique datasets. To provide a breif overview of the simulation design, I begin by drawing fixed values for the unobserved confounders $U$ and $V$ at 1.0 and 0.5, respectively. The path coefficients $\gamma_{k}$ for the dependencies between nodes are then drawn from a normal distribution such that $\gamma_{k} \sim Normal \left(0.5 , 0.5\right)$ for $k \in \left\{1 , \ldots , K\right\}$. The treatment propensity $\theta$ for the exposure $X$ and the measured confounders are then each a function of their respective ancestor nodes and random noise $\sigma \sim Normal \left(0 , 0.1\right)$ as follows

$$
\begin{aligned}Z_{i} & \sim \gamma_{5} W + \gamma_{6} L_{i} + \delta U + \sigma_{Z} \\ L_{i} & \sim \gamma_{3} U_{i} + \gamma_{4} V_{i} + \sigma_{L} \\ J_{i} & \sim \gamma_{2} V + \sigma_{J} \\ W_{i} & \sim \gamma_{1} U + \sigma_{W}\end{aligned}
$$
 and for the observed treatment

$$
\begin{aligned}X_{i} & \sim Bernoulli \left(\theta_{i}\right) \\ \theta_{i} & = logit^{- 1} \left(\gamma_{7} Z_{i} + \gamma_{8} W_{i} + \gamma_{9} J_{i} + \gamma_{10} L_{i} + \sigma_{X}\right)\end{aligned}
$$

where the $\delta U$ in the equation for $Z$ represents the experimental manipulation and $\sigma_{X} \sim Normal \left(0 , 0.01\right)$.

Finally, the outcome $Y_{i}$ is a function of a fixed intercept $\alpha$, coefficients for each parameter $\beta_{k}$, the unobserved confounders $U$ and $V$, and a random noise term $\sigma$ as expressed in equation [3](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#eq-outcome-dgp)

$$
Y_{i} \sim \alpha + \beta_{1} X_{i} + \beta_{2} Z_{i} + \beta_{3} L_{i} + \beta_{4} W_{i} + \beta_{5} J_{i} + V + U + \sigma (\text{3})
$$

where $\alpha = 0.50$ and $\sigma \sim Normal \left(0 , 0.5\right)$.

Under this assumed DGP, the true value of $Z$ should be recoverable if and only if the unobserved confounder $U$ is conditionally independent of $Z$. On the other hand, all of the covariates in the adjustment set $\left\{J , W , L\right\}$ may be expected to exhibit severe bias due to unobserved confounding. Code for simulating the data in R and Python is shown below.

Code

```
# Simulated DGP Based on the DAG in Figure 2
sim_dag_data <- function(N, a, b, cond, conf) {
  # Coefficients for ancestor nodes
  g <- rnorm(10, 0.5, 0.5)
    
  # Unobserved Confounders U and V
  V <- conf[1] + rnorm(N, 0, 0.1)
  U <- conf[2] + rnorm(N, 0, 0.1)
    
  # Measured Confounders {Z, L, J, W}
  W <- g[1] * U + rnorm(N, 0, 0.1)
  J <- g[2] * V + rnorm(N, 0, 0.1)
  L <- g[3] * U + g[4] * V + rnorm(N, 0, 0.1)
  Z <- g[5] * W + (U * cond) + g[6] * L + rnorm(N, 0, 0.1)
    
  # Treatment X
  logit_theta <- g[7] * Z + g[8] * W + g[9] * J + g[10] * L + rnorm(N, 0, 0.01)
  theta <- exp(logit_theta)/(1 + exp(logit_theta))
  X <- rbinom(N, size = 1, prob = theta)
    
  # Linear Predictor Data Generation Process
  mu <- b[1] * X + b[2] * Z + b[3] * L + b[4] * J + b[5] * W
    
  # Observed Response Y
  Y <- a + mu + U + V + rnorm(N, 0, 0.2)
    
  # Combine everything into a data frame
  out <- data.table(X, Z, L, J, W, Y)

  # Return just the data table
  return(out)
}
```

```python
# Required dependencies for the DAG data
from numpy.random import normal as rnorm
from numpy.random import uniform as runif
from numpy.random import binomial as rbinom
from numpy import exp, repeat
from polars import DataFrame, Series

# Inverse Logistic Transformation
def inv_logit(logit_theta):
  prob = exp(logit_theta)/(1 + exp(logit_theta))
  return prob

# Simulated DGP Based on the DAG in Figure 1
def sim_dag_data(N, a, b, cond, conf):
  # Coefficients for ancestor nodes
  g = rnorm(0.5, 0.5, 10)
    
  # Unobserved Confounders U and V
  V = conf["V"] + rnorm(0, 0.1, N)
  U = conf["U"] + rnorm(0, 0.1, N)
    
  # Measured Confounders {Z, L, J, W}
  W = g[0] * U + rnorm(0, 0.1, N)
  J = g[1] * V + rnorm(0, 0.1, N)
  L = g[2] * U + g[3] * V + rnorm(0, 0.1, N)
  Z = g[4] * W + (U * cond) + g[5] * L + rnorm(0, 0.1, N)
    
  # Treatment X
  logit_theta = g[6] * Z + g[7] * W + g[8] * J + g[9] * L + rnorm(0, 0.01, N)
  theta = inv_logit(logit_theta)
  X = rbinom(n = 1, p = theta, size = N)
    
  # Linear Predictor Data Generation Process
  mu = b["X"] * X + b["Z"] * Z + b["L"] * L + b["J"] * J + b["W"] * W
    
  # Observed Response Y
  Y = a + mu + U + V + rnorm(0, 0.2, N)
  
  # Store the Condition
  cond = Series(repeat(cond, N))

  # Combine everything into a data frame
  out = {"X": X, "Z": Z, "L": L, "J": J, "W": W, "Y": Y, "Condition": cond}
  return DataFrame(out)
```

Since this is a Bayesian statistics blog, we’ll specify the model and estimate the parameters using Hamiltonian Monte Carlo (HMC), though the concept outlined above holds regardless of inferential framework and taking a Bayesian approach may in fact be constraining how severe the bias in the parameter estimates can be.[^18] Our model here takes the following form

$$
\begin{aligned}y_{i} & \sim \mathcal{N} \left(\mu , \sigma\right) \\ \mu & = \alpha + X_{n} \beta_{k} + \sigma \\ \text{with priors} \\ \alpha & \sim Normal \left(\bar{y} , 2 \cdot \sigma_{y}\right) \\ \beta_{k} & \sim Normal \left(0 , 2 \cdot \frac{\sigma_{y}}{\sigma_{x_{k}}}\right) for k \in \left\{1 , \ldots , K\right\} \\ \sigma & \sim Exponential \left(\frac{1}{\sigma_{y}}\right)\end{aligned} (\text{4})
$$

where priors in equation [4](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#eq-model-formula) are specified based on the scaling approach outlined in Gelman, Hill, and Vehtari ([^2]) and thus automatically adjusted to be weakly informative for each of the simulated datasets.[^19] We can specify the model in Stan as follows

```
data {
  int<lower=1> N; // Observations
  int<lower=1> K; // Population-Level Coefficients
  vector[N] Y; // Response
  matrix[N, K] P; // Design Matrix for the Fixed Effects
  vector[K] truth; // True Values of the Coefficients
}

transformed data {
  // Centering the Design Matrix
  matrix[N, K] X;  // Centered version of P
  vector[K] X_means; // Column Means of P
  vector[K] X_sd; // Column SDs of P
  for (i in 1:K) {
    X[, i] = P[, i] - mean(P[, i]);
    X_means[i] = mean(P[, i]);
    X_sd[i] = sd(P[, i]);
  }

  // Data for the Intercept priors
  real mu_alpha;
  real sigma_alpha;
  mu_alpha = mean(Y);
  sigma_alpha = 2 * sd(Y);

  // Data for the Coefficient priors
  vector[K] beta_sd;
  beta_sd = 2 * (sd(Y)/X_sd);

  // Prior for the residual sd
  real sigma_prior;
  sigma_prior = 1/sd(Y);
}

parameters {
  real alpha; // Intercept for the Centered Predictors
  vector[K] beta; // Regression Coefficients
  real<lower = 0> sigma; // Residual Noise
}

model {
  // Likelihood
  target += normal_id_glm_lpdf(Y | X, alpha, beta, sigma);

  // Priors on the parameters
  target += exponential_lpdf(sigma | sigma_prior);
  target += normal_lpdf(alpha | mu_alpha, sigma_alpha);
  target += normal_lpdf(beta | 0, beta_sd);
}

generated quantities {
  // Recover the Non-Centered Intercept and Coefficients
  real Intercept = alpha - dot_product(beta, X_means);

  // Bias in the Parameter Estimates
  vector[K] bias;
  bias = truth - beta;
}
```

Although the models themselves only take a second or two to fit, repeating the process 3,000 times quickly becomes computationally burdensome. It is possible to side-step this problem by defining functions to prepare the data and fit models in parallel via the [furrr](https://github.com/DavisVaughan/furrr) package and `{cmdstanr}` as shown below. The `make_stan_data` function prepares the simulated datasets to be passed to Stan while the `sim_bayes` function fits the models and returns the necessary `draws_df` object containing the estimated parameters and generated quantities. This approach reduces the wall time for the simulations from 1.5 hours to about thirty minutes.

For each model, I run four Markov chains in parallel for 2,000 total iterations per chain with the first 1,000 for each chain discarded after the initial warm-up adaptation stage. The total run time for the simulations under Stan version 2.3.0 is approximately 35 minutes on a Windows 10 desktop computer with an 12-core Ryzen 9 5900X CPU and 128GB of DDR4 memory.

```
# Function for Building the Data to Pass to the Stan Model
make_stan_data <- function(data, truth, ...) {
  
  # Predictor Positions
  x_pos <- grep("[J-X]|Z", colnames(data))
  
  # Extract the predictor matrix
  P <- data[, ..x_pos]
  
  # Extract the response
  Y <- data$Y
  
  # Prepare the data for use with Stan
  stan_data <- list(
    N = nrow(P), # Observations
    K = ncol(P), # K Predictors
    Y = Y, # Response
    P = P, # Design Matrix
    truth = truth
  )
  
  # Return the list of data
  return(stan_data)
}

# Function for fitting the Stan Models in Parallel
sim_bayes <- function(stan_model, 
                      stan_data,
                      sampling, 
                      warmup, 
                      seed, 
                      chains,
                      ...) {
  
  # Set the initial number of draws to 0
  min_draws <- 0
  
  # Repeat the run if any of the chains stop unexpectedly
  while (min_draws < (sampling * chains)) {
    
    # Fit the Stan Model
    sim_fit <- stan_model$sample(
      data = stan_data,
      sig_figs = 5,
      parallel_chains = chains,
      iter_warmup = warmup,
      iter_sampling = sampling,
      max_treedepth = 12,
      adapt_delta = 0.9,
      seed = seed,
      show_messages = FALSE,
      ...
    )
    
    # Update the check
    min_draws <- posterior::ndraws(sim_fit$draws())
  }
  
  # Calculate a summary of the draws
  sim_draws <- sim_fit$draws(format = "draws_df")
  
  # Return the data frame of draws
  return(sim_draws)
}
```

```
# Load the necessary libraries
pacman::p_load(
  "tidyverse",
  "data.table",
  "cmdstanr",
  "posterior",
  "furrr",
  install = FALSE # Set this to true to install missing packages
)

# Set the initial rng seed
set.seed(2023)

# True Values for the Coefficients
betas <- c(-0.5, 0.00, 0.5, 0.00, 0.5)
names(betas) <- c("X", "Z", "L", "J", "W")

# Simulate 3,000 datasets of varying dimensions 
sim_data_df <- expand.grid(
  N = c(2.5e3, 5e3, 10e3),
  delta = c(FALSE, TRUE),
  rep = 1:500
) %>%
  # Nest the data by columns
  nest(sim_pars = c(delta, N)) %>%
  # Simulate the datasets
  mutate(sim_data = map(
    .x = sim_pars,
    ~ map2(
      .x = .x$delta,
      .y = .x$N,
      ~ sim_dag_data(
        N = .y, 
        a = 0.5, 
        b = betas, 
        cond = .x,
        conf = c(0.5, 1.0)
      ))
  )) %>%
  # Unnest the data dimensions
  unnest(cols = c(sim_pars, sim_data))
```

```
# Generate the data to pass to the stan models
sims_stan_data <- map(
  .x = sim_data_df$sim_data,
  ~ make_stan_data(
    data = .x,
    truth = betas
  ))

# Compile the Stan model
sim_mod <- cmdstan_model("bayes-linreg.stan")

# Parallel computation via furrr
plan(tweak(multisession, workers = 3))

# Fit models and add the draws to the simulation data frame
sim_draws_df <- sim_data_df %>% 
  mutate(sim_draws = future_map(
    .x = sims_stan_data,
    .f = ~ sim_bayes(
      stan_data = .x,
      stan_model = sim_mod,
      sampling = 1e3,
      warmup = 1e3,
      seed = 12345,
      chains = 4,
      refresh = 1e3
    ),
    .options = furrr_options(
      scheduling = 1,
      seed = TRUE,
      prefix = "prefix"
    ),
    .progress = TRUE
  ))

# Back from the future
plan(sequential)
```

```
# Parallel computation via furrr
plan(tweak(multisession, workers = 8))

# Summarize the nested draws_df objects
sim_draws_df <- sim_draws_df %>% 
  mutate(sim_draws_summ = future_map(
    .x = sim_draws,
    .f = ~ summarise_draws(.x, default_summary_measures()),
    .options = furrr_options(
      scheduling = 1,
      seed = TRUE,
      prefix = "prefix"
    ),
    .progress = TRUE
  ))

# Back from the future
plan(sequential)

# Extract and combine the posterior draws
sim_draws_combined <- sim_draws_df %>% 
  # Subset the needed columns
  select(rep:N, sim_draws_summ) %>% 
  # Unnest the draws, this requires about 25GB of memory
  unnest(cols = sim_draws_summ) %>% 
  # Filter estimates and bias for X and Z
  filter(str_detect(variable, "b.*[1-5]")) %>% 
  # Generate identifiers and labels
  mutate(
    # Coefficient or Bias Identifier
    type = if_else(str_detect(variable, "beta"), "Coefficient", "Bias"),
    # Manipulated condition
    condition = if_else(delta == TRUE, "Z Confounded", "Z Unconfounded"),
    # Parameter names
    param = case_when(
      variable %in% c("bias[1]", "beta[1]") ~ "X",
      variable %in% c("bias[2]", "beta[2]") ~ "Z",
      variable %in% c("bias[3]", "beta[3]") ~ "L",
      variable %in% c("bias[4]", "beta[4]") ~ "J",
      variable %in% c("bias[5]", "beta[5]") ~ "W"
    ),
    # True Parameter values
    truth = case_when(
      param %in% c("L", "W") ~ 0.5,
      param %in% c("Z", "J") ~ 0.0,
      param == "X" ~ -0.5
    ))
```

Since most researchers, at least in practice, adhere to dichotomous decision thresholds and test against point nulls, I start here by assessing the coverage rates for the 90% credible intervals for the posterior distribution of each parameter. As table [1](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#tbl-coverage-probs) illustrates, the credible intervals capture the true parameter value at or near nominal rates for $X$ and for $Z$ when $U$ is conditionally independent. If, however, $U$ and $Z$ are correlated the 90% credible intervals will virtually always fail to capture the true parameter value. Furthermore, as expected, recovery rates for the parameters $W$, $J$, and $L$ are generally abysmal under either condition and tend to decline as $n \rightarrow \infty$. The practical implication here is that if $U$ and $Z$ are in fact correlated, and we proceed to present and interpret $Z$ as if its respective coefficient is somehow meaningful, we will almost always be wrong. The picture is even more dire for the other parameters which are unlikely to have any meaningful interpretation under either scenario.

Table 1: Coverage Probabilities for 90% Bayesian Credible Intervals by Parameter

|  | 2,500 | 5,000 | 10,000 | 2,500 | 5,000 | 10,000 |
| --- | --- | --- | --- | --- | --- | --- |
| X | 0.89 | 0.89 | 0.91 | 0.89 | 0.90 | 0.89 |
| Z | 0.01 | 0.01 | 0.00 | 0.93 | 0.91 | 0.90 |
| L | 0.16 | 0.11 | 0.07 | 0.06 | 0.05 | 0.03 |
| J | 0.13 | 0.07 | 0.06 | 0.11 | 0.08 | 0.06 |
| W | 0.29 | 0.21 | 0.15 | 0.14 | 0.13 | 0.09 |

Just how wrong are these parameter estimates likely to be? Here I move beyond simple error probabilities and look more closely at errors of *magnitude*.[^20] Conditional on having already reach the incorrect conclusion that our credible interval contains the true parameter value when it in fact does not,[^21] figure [4](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#fig-type-m-error) shows the average root mean square error for each parameter in which the 90% credible interval fails to capture the true value. We see that on average the magnitude of bias in covariates can be quite large and in the case both $Z$ and $X$ are jointly identified, the magnitude of bias in the parameters $L$ and $W$ is on average **worse** than when $Z$ and $U$ are correlated. Nor does this bias decrease as $n \rightarrow \infty$, underscoring the reality that “big data” is not a substitute for experimental design or causal reasoning.

As table [1](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#tbl-coverage-probs) illustrated, if we present and interpret $L$ or $J$, or $W$ as if they are total effect estimates, we will on average be wrong 88.5%, 91.6%, and 78.4% of the time, respectively. Likewise, if the assumption that $U$ and $Z$ are conditionally independent fails, our chance of being wrong is 99.6%. This makes the practice of reporting and interpreting nuisance parameters in tables–often filled with largely meaningless astrisks–deeply concerning because, at least in principle, the goal of scientific inquiry and research more broadly is *to be less wrong*.

The important takeaway here is anything other than $X$ or whatever your main feature of interest happens to be, is a **nuisance parameter** and generally should not be presented or interpreted as if its respective coefficient or marginal effect estimate has some causal meaning. The chances your research design is capable of identifying every variable included in a model are virtually guaranteed to be zero and these estimates most certainly are not, as a collegue recently suggested, “a part of your contribution to existing research.” In fact, since presenting and interpreting hopelessly confounded coefficient estimates or marginal effects encourages those reading your work to do the same, those who persist in committing the table 2 fallacy or encourage others to do so are actively harming the pursuit of knowledge in their field by peddling what is in no uncertain terms pseudo-science.

Finally, for those wondering whether this applies to analyses whose aims are primarily descriptive or exploratory in nature the answer is “yes.” Since identifying relevant confounders is a process that must be informed and justified by theory, the need to adjust for potentially confounding factors itself implies causal aims as does any reporting or reliance on arbitrary decision rules such as “statistical significance” as a means of establishing whether a relationship exists ([Wysocki, Lawson, and Rhemtulla 2022](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Wysocki2022)). Indeed, outside of a causal framework p-values in the social sciences have no meaning or valid interpretation and thus the practice of reporting, at a minimum, “sign and significance” has always been and continues to be misguided.

## Conclusion

The overarching and unnecessarily long-winded point of this post is that applied researchers should focus on the feature of the world they care about. If one is interested in a relationship between the implementation of gender quotas and women’s representation in government, for example, one should simply focus on estimating the impact of quota adoption on the representation of women in government rather than wasting words opining about political corruption, electoral systems, or some other nuisance parameter.[^22]

One might attempt to object on the grounds incompetent reviewers often demand otherwise principled researchers engage in poor statistical practices but this is easily solved by placing all relevant tables in the appendix and adhereing to the common sense guideline that one should never present in a table what could be communicated in a graph. This post and the recommendations herein are broadly applicable in both experimental and observational contexts. The problem remains prevelant in both top tier journals and those with less prestige.

Of course, encouraging researchers to improve their own practices is only half the battle because bad habits and logical fallacies are learned behaviors oweing to the reality that graduate-level statistics in the social sciences is often taught entirely independent of any meaningful causal foundation. Students are instructed to interpret everything with the justification being that “they need experience in interpreting coefficients/marginal effects.” Yet, this has the unintended consequence of instilling in them that such an approach should be taken in their own work and they then go on to teach their future students those same poor practices. Before long, this results in entire fields in which presumed knowledge rests upon castles of sand and hinders scientific progress.

## Reuse

[CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0\)/)

## Citation

```
@online{jordan_nafa2022,
  author = {Jordan Nafa, A.},
  title = {These {Are} {Not} the {Effects} {You} {Are} {Looking} {For}},
  date = {2022-12-23},
  url = {https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/},
  langid = {en}
}
```

For attribution, please cite this work as:

Jordan Nafa, A. 2022. “These Are Not the Effects You Are Looking For.” [https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/).

[^1]: Cinelli, Carlos, Andrew Forney, and Judea Pearl. 2022. “ [A Crash Course in Good and Bad Controls](https://doi.org/10.1177/00491241221099552).” *Sociological Methods & Research*: 004912412210995.

[^2]: Gelman, Andrew, Jennifer Hill, and Aki Vehtari. 2021. *Regression and Other Stories*. Cambridge University Press.

[^3]: Gerring, John. 2004. “What Is a Case Study and What Is It Good For?” *American Political Science Review* 98: 341–54.

[^4]: ———. 2012. “ [Mere Description](https://doi.org/10.1017/s0007123412000130).” *British Journal of Political Science* 42(4): 721–46.

[^5]: Hernán, Miguel A. 2018. “ [The c-Word: Scientific Euphemisms Do Not Improve Causal Inference from Observational Data](https://doi.org/10.2105/ajph.2018.304337).” *American Journal of Public Health* 108(5): 616–19.

[^6]: Hünermund, Paul, and Beyers Louw. 2020. “ [On the Nuisance of Control Variables in Regression Analysis](https://doi.org/10.48550/ARXIV.2005.10314).” *arxiv*

[^7]: Keele, Luke, Randolph T. Stevenson, and Felix Elwert. 2019. “ [The Causal Interpretation of Estimated Associations in Regression Models](https://doi.org/10.1017/psrm.2019.31).” *Political Science Research and Methods* 8(1): 1–13.

[^8]: Lundberg, Ian, Rebecca Johnson, and Brandon M. Stewart. 2021. “ [What Is Your Estimand? Defining the Target Quantity Connects Statistical Evidence to Theory](https://doi.org/10.1177/00031224211004187).” *American Sociological Review* 86(3): 532–65.

[^9]: Oganisian, Arman, and Jason A. Roy. 2020. “ [A Practical Introduction to Bayesian Estimation of Causal Effects: Parametric and Nonparametric Approaches](https://doi.org/10.1002/sim.8761).” *Statistics in Medicine* 40(2): 518–51.

[^10]: Rohrer, Julia M. 2018. “ [Thinking Clearly about Correlations and Causation: Graphical Causal Models for Observational Data](https://doi.org/10.1177/2515245917745629).” *Advances in Methods and Practices in Psychological Science* 1(1): 27–42.

[^11]: Rubin, Donald B. 1974. “ [Estimating Causal Effects of Treatments in Randomized and Nonrandomized Studies](https://doi.org/10.1037/h0037350).” *Journal of Educational Psychology* 66(5): 688–701.

[^12]: ———. 1976. “ [Inference and Missing Data](https://doi.org/10.1093/biomet/63.3.581).” *Biometrika* 63(3): 581–92.

[^13]: ———. 2005. “ [Causal Inference Using Potential Outcomes](https://doi.org/10.1198/016214504000001880).” *Journal of the American Statistical Association* 100(469): 322–31.

[^14]: Samii, Cyrus. 2016. “ [Causal Empiricism in Quantitative Research](https://doi.org/10.1086/686690).” *The Journal of Politics* 78(3): 941–55.

[^15]: Westreich, Daniel, and Sander Greenland. 2013. “ [The Table 2 Fallacy: Presenting and Interpreting Confounder and Modifier Coefficients](https://doi.org/10.1093/aje/kws412).” *American Journal of Epidemiology* 177(4): 292–98.

[^16]: Wysocki, Anna C., Katherine M. Lawson, and Mijke Rhemtulla. 2022. “ [Statistical Control Requires Causal Justification](https://doi.org/10.1177/25152459221095823).” *Advances in Methods and Practices in Psychological Science* 5(2): 1–19.

[^17]: In this case the adjustment sets necessary to identify the total and direct effect of $X$ on $Y$ are the same, but this may not be the case in other contexts.

[^18]: One could also simply specify a frequentist prior here by assuming that all parameter values between $- \infty$ and $\infty$ are equally likely.

[^19]: Although this makes the prior data dependent which may in some cases be undesirable, it works quite well for this illustration.

[^20]: If it isn’t obvious at this point, I am leaning very heavily on the Bernstein-von Mises theorem here.

[^21]: Or in the frequentist case, whatever weird and tortured interpretation of a confidence interval you prefer because Neyman was a fundamentalist who refused to consider uncertainty in terms of beliefs.

[^22]: In many ways this recommendation echoes that made by Hünermund and Louw ([2020](https://www.ajordannafa.com/blog/2022/statistical-adjustment-interpretation/#ref-Huenermund2020))