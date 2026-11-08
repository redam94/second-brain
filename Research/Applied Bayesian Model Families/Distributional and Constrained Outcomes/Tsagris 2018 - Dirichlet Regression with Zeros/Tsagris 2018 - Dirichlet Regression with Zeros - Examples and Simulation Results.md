---
title: "Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/example
  - doc/paper
source: "[[raw/Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros.pdf]]"
source_location: "Sec. 4.1-4.5, Tables 1-6, Figs. 1-4, pp. 7-14"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Tsagris 2018 - Dirichlet Regression with Zeros"
doc_type: paper
depends_on:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]]"
used_by:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]]"
aliases:
  - ZADR empirical results
  - Arctic lake zero experiment
---

# Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results

> [!summary]
> Four real data sets and a 6 x 3 x 5 x 1000 simulation compare simple ZADR, ZADR, Aitchison regression (zeros imputed with `robCompositions`) and the Kent model. Aitchison is slightly better on two real sets, ZADR on the others; with many injected zeros ZADR wins, and in simulation the proportion of runs with lower KL goes to 1 as $n$ grows.

## Overview

Performance metrics (Eq. 12), computed on the *unimputed* observed data: Kullback-Leibler divergence $\text{KL}(\mathbf y,\hat{\mathbf y})=\sum_i\sum_jy_{ij}\log(y_{ij}/\hat y_{ij})$ (with $0\log0=0$) and the squared $L_2$ norm $\|\mathbf y-\hat{\mathbf y}\|^2=\sum_i(\mathbf y_i-\hat{\mathbf y}_i)^\top(\mathbf y_i-\hat{\mathbf y}_i)$.

## Main Content

### 4.1 Florida 2000 presidential election (Smith 2002)

67 counties, 10 candidates, 8 demographic covariates; 23 counties had at least one zero (about 5% of values).

| Model | KL | $L_2$ |
|---|---|---|
| simple ZADR | 0.844 | 0.519 |
| Aitchison (imputed) | 0.648 | 0.513 |
| Dirichlet-multinomial | 0.638 | 0.512 |

Converted to expected vote counts, the $\chi^2$ distance slightly favours simple ZADR. Count/frequency data can be analysed by compositional regressions with zeros handled.

### 4.2 Forensic glass (n = 214, six glass types, D = 8, 392 zeros = 22.9%)

Zeros: Mg 19.63%, K 14.02%, Ba 82.24%, Fe 67.29%; Na, Al, Si, Ca have none. Only covariate: refractive index. KL 4.02 (simple ZADR) vs 3.95 (Aitchison); $L_2$ 0.142 vs 0.137. Wald tests: all coefficients significant for Aitchison except Si; same for ZADR plus Fe non-significant. (Table 2 gives coefficients such as Mg intercept -1.394 (0.018) vs -1.947 (0.081).)

### 4.3 Foraminifera (Aitchison 2003; 30 depths, 4 components, 5 vectors with zeros)

Covariate $\log$ depth; Triloba is the reference. Simple ZADR coefficients (Table 3):

| Response | Constant | Slope |
|---|---|---|
| Obesa | -1.225 (0.348) | 0.117 (0.131) |
| Pachyderma | -2.392 (0.463) | 0.087 (0.173) |
| Atlantica | -2.298 (0.494) | -0.046 (0.193) |
| $\phi$ | 15.889 (2.473) | |

Full ZADR (Table 4): $\phi$ constant 3.725 (0.481), slope -0.371 (0.184). Log-likelihoods 124.040 (simple) vs 125.877 (full): no significant gain ($\chi^2_1$). Aitchison coefficients (Table 5) are similar: Obesa -1.319 (0.369), 0.121 (0.140); Pachyderma -3.065 (0.755), 0.083 (0.288); Atlantica -2.596 (0.540), -0.208 (0.206).

| Model (Table 6) | KL | $L_2$ |
|---|---|---|
| simple ZADR | **3.126** | 1.065 |
| Kent (Scealy and Welsh) | 3.172 | **1.062** |
| Aitchison (imputed) | 3.556 | 1.173 |

### 4.4 Arctic lake (sand, silt, clay at 39 depths)

Four models fitted to the zero-free data, then with 2 and 4 injected zeros (Fig. 3). The Aitchison fit bends toward the two points with zeros and, with 4 zeros on low-sand points, "has lost the bulk of the data"; the ZADR models "seem not to have been affected at all".

### 4.5 Simulation

Data from $\text{Dir}(\phi=10,\mathbf a^*)$ and from logistic-normal $\text{MVN}_{D-1}(\boldsymbol\mu=\mathbf B\mathbf X,\boldsymbol\Sigma)$ (diagonal $\Sigma$ with exponential entries), two covariates; $n\in\{30,50,100,200,350,500\}$, $D\in\{3,5,10\}$, zero rate $\pi\in\{10,20,30,40,50\}\%$ (zeros assigned and rows re-closed; for $D=3,5,10$ one, two and five components respectively), 1000 replications per cell. Metric: proportion of times KL(ZADR) < KL(Aitchison). Results: for Dirichlet data it increases with $n$ and reaches 1; for logistic-normal data with $D=5$ likewise; for $D=3$ it reaches 1 for 40-50% zeros; for $D=10$ Dirichlet data it was 1 for all sample sizes.

## Examples

> [!example] Python: simulating the zero-injection experiment
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> def dirichlet_with_zeros(n, a_star, phi, pi_zero, k_zero):
>     Y = rng.dirichlet(phi * a_star, size=n)
>     rows = rng.random(n) < pi_zero
>     for r in np.where(rows)[0]:
>         idx = rng.choice(len(a_star), k_zero, replace=False)
>         Y[r, idx] = 0.0
>         Y[r] /= Y[r].sum()                       # re-close
>     return Y
> Y = dirichlet_with_zeros(200, np.array([.5, .3, .2]), 10.0, 0.3, 1)
> print((Y == 0).mean(0))
> ```
^ex-zero-injection

## Connections

[[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]], [[Greenacre 2023 - Compositional Outcome Models in PyMC]], [[Model Validation and Interpretability - Overview]] (simulation-based validation, ADEMP style).

## See Also

[[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]
