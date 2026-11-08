---
title: "Dorie 2019 - Simulation Design and Knobs"
tags:
  - source/ingested
  - topic/benchmarks
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Secs. 4.2-4.3 (pp. 8-11); Appendix A.1, Table 2 (pp. 28-31)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Estimands, Ignorability and Design Choices]]"
used_by:
  - "[[Dorie 2019 - Predicting Performance and Variance Decomposition]]"
  - "[[Dorie 2019 - Toy ACIC-Style Simulation in Python]]"
  - "[[Dorie 2019 - Evaluation Metrics and Results by Method]]"
aliases:
  - ACIC 2016 data-generating process
  - ACIC simulation knobs
  - ACIC Table 2 settings
---

# Dorie 2019 - Simulation Design and Knobs

> [!summary]
> Data sets were simulated from 58 real covariates (4,802 children, Collaborative Perinatal Project) with randomly generated assignment mechanisms and response surfaces controlled by six "knobs": degree of nonlinearity, percentage treated, overlap, alignment, treatment effect heterogeneity and effect magnitude. Of 216 possible knob combinations the organisers kept 77 non-trivial settings, each replicated 100 times for the black-box competition (7,700 data sets), with 20 settings used once each for the DIY competition.

## Overview

The DGP is defined as a *model over DGPs*: because the functions are generated randomly, the parameters controlling the framework define a distribution over data-generating processes, and a specific value of those parameters is a "knob" setting.

## Main Content

### Real-data calibration (Sec. 4.2)

- **Source:** Collaborative Perinatal Project (Niswander and Gordon 1972), a longitudinal study of pregnant women and their children 1959 to 1974; public data on over 55,000 pregnancies with over 6,500 variables.
- **Hypothetical study:** a twins study of the impact of birth weight on a child's IQ; confounders chosen as a researcher might choose.
- **Complete cases:** **4,802 observations and 58 covariates**: 3 categorical, 5 binary, 27 count, 23 continuous.

### Model structure (Sec. 4.3)

> [!definition] ACIC data-generating factorisation
> The joint distribution of potential outcomes and treatment given covariates factors as
> $$p\bigl(Y(1),Y(0),Z\mid X\bigr)=\underbrace{p\bigl(Y(1),Y(0)\mid X\bigr)}_{\text{response surface}}\;\underbrace{p(Z\mid X)}_{\text{assignment mechanism}},$$
> which encodes ignorability because $p(Y(1),Y(0)\mid Z,X)=p(Y(1),Y(0)\mid X)$. Both pieces are generalised additive functions: covariates pass through transformations $f_j$ (polynomial terms, indicators, step functions) that are added or multiplied, e.g. $f(x_i)=f_1(x_{i1})+f_2(x_{i2})+f_3(x_{i1})f_4(x_{i2})$, and the sum may pass through a link such as $g(x_i)=\exp\{f_3(x_{i1})+f_4(x_{i2})+f_3(x_{i1})f_4(x_{i2})\}$.
^def-acic-dgp

**Generation details (A.1).** Coefficients are drawn from Student-$t$ distributions when unbounded and beta-prime when strictly positive. Covariates are scaled to about $[-1,1]$; sub-function locations and scales are generated to map to the same region. Terms are rescaled so propensity scores lie almost exclusively in $0.1$ to $0.9$ and response variables have mean $0$ and expected SD $1$. The treated and control response surfaces are adjusted to meet a generated average treatment effect; the noise and treatment effect are generated from heavy-tailed distributions.

### The six knobs

> [!definition] Knobs and their implementation
> | Knob | Meaning | Implementation (Table 2 columns and A.1 bullets) | Oracle/diagnostic metric (with reported range) |
> |---|---|---|---|
> | **1. Degree of nonlinearity** | Nonlinearity in response and assignment | *Treatment model* $\in\{\text{linear},\text{polynomial},\text{step}\}$: linear adds predictors as linear terms with random coefficients; polynomial may add quadratic or cubic terms for continuous predictors; step adds jumps $I\{x\le A\}(x_j)$ and kinks $(x_k-B)I\{x\le C\}(x_k)$. *Response model* $\in\{\text{linear},\text{exponential},\text{step}\}$; exponential contains the polynomial condition and adds one term $\exp\{f_1(x_j)+f_2(x_k)\}$. Up to three-way interactions and third-order polynomials | $R^2$ of $Y$ on observed untransformed $X$: range $0.02$ to $0.93$, quartiles $[0.26,0.37,0.48]$ |
> | **2. Percentage treated** | Baseline fraction treated | Low (about 35% expected) or high (about 65%) | Low: 95% of sims in $[0.20,0.38]$; high: $[0.41,0.67]$ (range differs due to overlap) |
> | **3. Overlap** | Controls dissimilar to all treated | *penalize* vs *full*: when not full, a large negative penalty term $A\cdot I\{x_j>B\}\cdot I\{x_k\le C\}\cdots$ in $\operatorname{logit}\Pr(Z=1\mid X)$ forces propensity near $0$ in a corner of covariate space (B, C from marginal quantiles) | Mean Mahalanobis distance to nearest opposite-arm neighbour in ground-truth covariate space: quartiles $[3.73,4.31,4.99]$ (overlap knob = 1) and $[4.16,4.75,5.50]$ (knob = 0) |
> | **4. Alignment** | Overlap in terms between assignment and response (true confounders) | Marginal probability that an assignment term is copied to the response: *low* about 25%, *high* about 75%, or *none* | absolute correlation between $\operatorname{logit}p(Z\mid X)$ and $Y$, from about $0$ to $0.94$, median $\approx0.29$ |
> | **5. Treatment effect heterogeneity** | Non-parallel response surfaces | *none*: treatment is a single additive term; *low*: treatment interacts with about three response terms; *high*: about six | SD of $\mathbb{E}[Y(1)-Y(0)\mid X]$ normalised by SD of outcome: $0$ to $2.06$, quartiles $[0.47,0.73,1.01]$; exactly $0$ for 200 realizations with knob 0 |
> | **6. Magnitude of effect** | Size of SATT | No explicit knob; varies implicitly with other knobs; participants told it varies | Median SATT across 7,700 realizations $0.68$ SD, IQR $0.57$ to $0.79$ |
^def-acic-knobs

**Imbalance.** Not a knob, but arises from the assignment mechanism. Oracle imbalance metric: Euclidean norm of the distance between control and treated covariate means in ground-truth space, quartiles $[0.78,1.30,2.68]$. Lack of overlap implies lack of balance, but imbalance can exist with perfect overlap.

**Why alignment matters.** Only covariates in both the assignment mechanism and the response surface cause bias. A covariate in only one affects efficiency, not bias. Functional form matters: if age enters assignment linearly but the response linearly and squared, including linear age removes bias and the squared term is not needed; if the squared term is in both, conditioning on it is required. Following Kern et al. (2016), alignment reflects the dimension of the confounder space. Practical implications: more potential bias for a given covariate set; difficulty of finding true confounders when they are few relative to the covariates; methods privileging predictors of only treatment or only response are disadvantaged.

### Scenario counts

All knob combinations yield **216** scenarios; the organisers focused on the most interesting **77** by removing trivial or redundant cases such as simple linear models or unconfounded treatment and response. Each of the 77 settings has **100 independent replications**, giving **7,700** realizations. For the DIY competition, 20 settings (marked in Table 2) were used, one data set each.

> [!example] Table 2: the 77 simulation settings (Appendix A.1)
> Columns as printed. "DIY #" gives the DIY data-set number for settings 1-20.
>
> | # | Trt model | Trt % | Overlap | Response model | Trt/Rsp alignment | Heterogeneity | DIY # |
> |---|---|---|---|---|---|---|---|
> | 1 | linear | low | penalize | linear | high | high | 10 |
> | 2 | polynomial | low | penalize | exponential | high | none | 1 |
> | 3 | linear | low | penalize | linear | high | none | 9 |
> | 4 | polynomial | low | full | exponential | high | high | 4 |
> | 5 | linear | low | penalize | exponential | high | high | 15 |
> | 6 | polynomial | low | penalize | linear | high | high | 2 |
> | 7 | polynomial | low | penalize | exponential | high | high | 5 |
> | 8 | polynomial | low | penalize | exponential | none | high | 13 |
> | 9 | step | low | penalize | step | high | high | 8 |
> | 10 | linear | low | penalize | exponential | low | high | 14 |
> | 11 | polynomial | low | penalize | linear | low | high | 19 |
> | 12 | polynomial | low | penalize | exponential | low | high | 12 |
> | 13 | linear | high | penalize | exponential | high | high | 18 |
> | 14 | polynomial | high | penalize | linear | high | high | 20 |
> | 15 | polynomial | high | penalize | exponential | high | high | 6 |
> | 16 | polynomial | high | penalize | exponential | none | high | 17 |
> | 17 | step | high | penalize | step | high | high | 7 |
> | 18 | linear | high | penalize | exponential | low | high | 3 |
> | 19 | polynomial | high | penalize | linear | low | high | 16 |
> | 20 | polynomial | high | penalize | exponential | low | high | 11 |
> | 21 | polynomial | low | penalize | step | low | low |  |
> | 22 | polynomial | low | penalize | step | low | high |  |
> | 23 | polynomial | low | penalize | step | high | low |  |
> | 24 | polynomial | low | penalize | step | high | high |  |
> | 25 | polynomial | low | penalize | exponential | low | low |  |
> | 26 | polynomial | low | penalize | exponential | high | low |  |
> | 27 | polynomial | low | full | step | low | low |  |
> | 28 | polynomial | low | full | step | low | high |  |
> | 29 | polynomial | low | full | step | high | low |  |
> | 30 | polynomial | low | full | step | high | high |  |
> | 31 | polynomial | low | full | exponential | low | low |  |
> | 32 | polynomial | low | full | exponential | low | high |  |
> | 33 | polynomial | low | full | exponential | high | low |  |
> | 34 | polynomial | high | penalize | step | low | low |  |
> | 35 | polynomial | high | penalize | step | low | high |  |
> | 36 | polynomial | high | penalize | step | high | low |  |
> | 37 | polynomial | high | penalize | step | high | high |  |
> | 38 | polynomial | high | penalize | exponential | low | low |  |
> | 39 | polynomial | high | penalize | exponential | high | low |  |
> | 40 | polynomial | high | full | step | low | low |  |
> | 41 | polynomial | high | full | step | low | high |  |
> | 42 | polynomial | high | full | step | high | low |  |
> | 43 | polynomial | high | full | step | high | high |  |
> | 44 | polynomial | high | full | exponential | low | low |  |
> | 45 | polynomial | high | full | exponential | low | high |  |
> | 46 | polynomial | high | full | exponential | high | low |  |
> | 47 | polynomial | high | full | exponential | high | high |  |
> | 48 | step | low | penalize | step | low | low |  |
> | 49 | step | low | penalize | step | low | high |  |
> | 50 | step | low | penalize | step | high | low |  |
> | 51 | step | low | penalize | exponential | low | low |  |
> | 52 | step | low | penalize | exponential | low | high |  |
> | 53 | step | low | penalize | exponential | high | low |  |
> | 54 | step | low | penalize | exponential | high | high |  |
> | 55 | step | low | full | step | low | low |  |
> | 56 | step | low | full | step | low | high |  |
> | 57 | step | low | full | step | high | low |  |
> | 58 | step | low | full | step | high | high |  |
> | 59 | step | low | full | exponential | low | low |  |
> | 60 | step | low | full | exponential | low | high |  |
> | 61 | step | low | full | exponential | high | low |  |
> | 62 | step | low | full | exponential | high | high |  |
> | 63 | step | high | penalize | step | low | low |  |
> | 64 | step | high | penalize | step | low | high |  |
> | 65 | step | high | penalize | step | high | low |  |
> | 66 | step | high | penalize | exponential | low | low |  |
> | 67 | step | high | penalize | exponential | low | high |  |
> | 68 | step | high | penalize | exponential | high | low |  |
> | 69 | step | high | penalize | exponential | high | high |  |
> | 70 | step | high | full | step | low | low |  |
> | 71 | step | high | full | step | low | high |  |
> | 72 | step | high | full | step | high | low |  |
> | 73 | step | high | full | step | high | high |  |
> | 74 | step | high | full | exponential | low | low |  |
> | 75 | step | high | full | exponential | low | high |  |
> | 76 | step | high | full | exponential | high | low |  |
> | 77 | step | high | full | exponential | high | high |  |
^ex-table2-settings

**Reading the table.** Settings 1-20 (the DIY sets) mix linear, polynomial and step models with mostly *penalize* overlap and *high* heterogeneity; only setting 4 in the DIY block uses *full* overlap. Settings 21-77 are a factorial-style exploration with polynomial and step treatment models. Counts from the table: treatment model polynomial 39, step 32, linear 6; low-treated 40, high-treated 37; overlap penalized 45, full 32; response exponential 39, step 32, linear 6; alignment high 39, low 36, none 2; heterogeneity high 43, low 32, none 2.

## Examples

> [!example] Alignment knob in miniature
> **Setup.** Assignment uses covariates $x_1,x_2,x_3$; the response copies each assignment term with probability $0.25$ (low) or $0.75$ (high).
> **High alignment.** Most assignment terms also drive $Y$, so most are true confounders; omitting or mis-modelling them biases the estimate heavily.
> **Low alignment.** Only about one in four is a confounder; flexible methods that can identify which terms matter gain relative to those that adjust for everything or select on the assignment model alone.
> **Interpretation.** In the paper, poor alignment plus response nonlinearity were "almost completely predictive of poor performance" ([[Dorie 2019 - Predicting Performance and Variance Decomposition]]). A runnable toy is in [[Dorie 2019 - Toy ACIC-Style Simulation in Python]].
^ex-alignment-knob

## Connections

- Planning a simulation as aims, DGMs, estimands, methods and performance measures: [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]].
- Calibrating simulations to real covariates but simulating treatment and outcome is the "compromise position" in [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]].
- Marketing: a simulation harness for marketing models (media effects with nonlinear saturation, targeting that aligns with response) can adopt knob tables of exactly this form; see [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Submitted Methods and Taxonomy]]
