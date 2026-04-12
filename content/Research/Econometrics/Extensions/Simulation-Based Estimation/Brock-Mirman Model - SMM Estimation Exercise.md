---
title: "Brock-Mirman Model - SMM Estimation Exercise"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - topic/macroeconomics
  - type/example
  - doc/tutorial
source: "[[raw/19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]]"
source_location: "Ch. 19, Sections 19.4.2 and 19.7 (Exercise 19.1)"
date_ingested: 2026-04-12
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: tutorial
depends_on:
  - "[[SMM Python Implementation]]"
  - "[[SMM Weighting Matrix and Inference]]"
  - "[[Method of Simulated Moments]]"
used_by:
  - "[[Simulation-Based Estimation - Overview]]"
aliases:
  - Brock Mirman SMM
  - BM1972 SMM
  - stochastic growth model SMM
---

# Brock-Mirman Model — SMM Estimation Exercise

> [!summary]
> Evans (2024) Ch. 19 uses the Brock and Mirman (1972) stochastic optimal growth model as a canonical SMM exercise. The model has a known analytical policy function but latent productivity shocks, making it a clean test case for simulation-based estimation. Four parameters $(\alpha, \rho, \mu, \sigma)$ are identified from six empirical moments computed on quarterly macroeconomic time series.

## Overview

The Brock-Mirman (1972) model is a workhorse of quantitative macroeconomics: a representative agent maximises expected discounted utility from consumption, subject to a stochastic production technology. The model is well-suited to SMM because:
- It is **fully simulable** given parameters $(\alpha, \beta, \rho, \mu, \sigma)$
- It has a **closed-form policy function** (savings rule), making simulation efficient
- The productivity shock $z_t$ is **latent** — it drives the data but is not directly observed — a canonical motivation for SMM over GMM

See [[Method of Simulated Moments]] for the general MSM theory and [[SMM Python Implementation]] for the Python workflow this exercise follows.

## Model Equations

The Brock-Mirman (1972) stochastic growth model is characterised by six equations:

> [!definition] Definition: Brock-Mirman (1972) Structural System
>
> **Euler equation (consumption):**
> $$
> (c_t)^{-1} - \beta \, E[r_{t+1}(c_{t+1})^{-1}] = 0 \tag{BM.1}
> $$
>
> **Budget constraint:**
> $$
> c_t + k_{t+1} - w_t - r_t k_t = 0 \tag{BM.2}
> $$
>
> **Wage (labour FOC):**
> $$
> w_t - (1 - \alpha) e^{z_t} (k_t)^\alpha = 0 \tag{BM.3}
> $$
>
> **Return on capital (capital FOC):**
> $$
> r_t - \alpha e^{z_t} (k_t)^{\alpha-1} = 0 \tag{BM.4}
> $$
>
> **TFP process (AR(1)):**
> $$
> z_t = \rho z_{t-1} + (1-\rho)\mu + \varepsilon_t, \quad \varepsilon_t \sim N(0, \sigma^2) \tag{BM.5}
> $$
>
> **Output:**
> $$
> y_t = e^{z_t}(k_t)^\alpha \tag{BM.6}
> $$
^def-bm-system

**Variables:** $c_t$ = consumption; $k_{t+1}$ = savings/investment (= next period's capital, full depreciation assumed); $w_t$ = wage; $r_t$ = return on capital; $z_t$ = log TFP (latent); $y_t$ = GDP.

**Parameters and constraints:**
$$
\alpha, \beta \in (0,1), \quad \mu, \sigma > 0, \quad \rho \in (-1, 1)
$$

## Analytical Policy Function

> [!theorem] Theorem: Brock-Mirman Policy Function
> The household's optimal savings decision has the closed-form solution:
> $$
> k_{t+1} = \alpha \beta \, e^{z_t} (k_t)^\alpha \tag{BM.7}
> $$
> This eliminates the need to numerically solve the Euler equation at each guess of $\theta$ during SMM estimation.
^thm-bm-policy

## Simulation Algorithm

Given parameters $\theta = (\alpha, \rho, \mu, \sigma)$ with $\beta = 0.99$ fixed:

1. **Initialise:** Set $z_0 = \mu$, $k_1 = \overline{k}$ (sample mean of $k_t$ from data). These are fixed across all simulations.
2. **Draw uniform shocks once:** Sample $u_{s,t} \sim U(0,1)$ for $s = 1,\ldots,S$ and $t = 1,\ldots,T$. **Never re-draw inside the optimizer.** See [[Practical Issues in Simulation Estimation]] for the common random numbers principle.
3. **Generate $\varepsilon_{s,t}$:** Convert uniform draws via inverse normal CDF:
   $$
   \varepsilon_{s,t} = \sigma \cdot \Phi^{-1}(u_{s,t})
   $$
4. **Simulate $z_{s,t}$** using (BM.5) recursively:
   $$
   z_{s,t} = \rho z_{s,t-1} + (1-\rho)\mu + \varepsilon_{s,t}
   $$
5. **Simulate $k_{s,t+1}$** using the policy function (BM.7).
6. **Simulate $w_{s,t}$, $r_{s,t}$** from (BM.3)–(BM.4).
7. **Simulate $c_{s,t}$** from the budget constraint (BM.2).
8. **Simulate $y_{s,t}$** from (BM.6).

## SMM Estimation Setup

> [!example] Exercise 19.1: Estimating the Brock-Mirman Model by SMM
>
> **Data:** `NewMacroSeries.txt` — 100 quarterly observations of $(c_t, k_t, w_t, r_t, y_t)$ for $t = 1, \ldots, 100$.
>
> **Calibrated:** $\beta = 0.99$
>
> **Parameters to estimate:** $\hat{\theta} = (\hat{\alpha}, \hat{\rho}, \hat{\mu}, \hat{\sigma})$
>
> **Estimation bounds:**
> $$
> \alpha \in [0.01,\, 0.99], \quad \rho \in [-0.99,\, 0.99], \quad \mu \in [5,\, 14], \quad \sigma \in [0.01,\, 1.1]
> $$
>
> **Six moments to match** ($R = 6 > K = 4$, so the model is overidentified):
>
> | Moment | Description |
> |--------|-------------|
> | $\text{mean}(c_t)$ | Average consumption |
> | $\text{mean}(k_t)$ | Average capital stock |
> | $\text{mean}(c_t / y_t)$ | Average consumption share |
> | $\text{var}(y_t)$ | Variance of output |
> | $\text{corr}(c_t, c_{t-1})$ | First-order autocorrelation of consumption |
> | $\text{corr}(c_t, k_t)$ | Cross-correlation of consumption and capital |
>
> **Simulation design:** $S = 1{,}000$ simulations, $T = 100$ periods each.
>
> **Part 1:** Estimate with identity weighting matrix $W = I_6$. Report $\hat{\theta}$, moment errors, criterion function value, and standard errors $\hat{\Sigma}_{SMM}$.
>
> **Part 2:** Re-estimate with the two-step optimal weighting matrix $\hat{W}_{2\text{step}} = \hat{\Omega}_2^{-1}$. Report the same quantities and compare standard errors to Part 1.
>
> See [[SMM Weighting Matrix and Inference]] for the two-step procedure and the Jacobian-based $\hat{\Sigma}_{SMM}$ formula.
^ex-bm-smm

## Moment Selection Rationale

The six moments are chosen to identify the four parameters through distinct channels:

- $\text{mean}(c_t)$ and $\text{mean}(k_t)$ are driven primarily by $\mu$ (long-run TFP level) and $\alpha$ (capital share determining steady-state ratios)
- $\text{mean}(c_t/y_t)$ pins down the consumption-to-output ratio, which is a function of $\alpha\beta$ in the Brock-Mirman solution
- $\text{var}(y_t)$ and $\text{corr}(c_t, c_{t-1})$ are sensitive to the TFP volatility $\sigma$ and persistence $\rho$
- $\text{corr}(c_t, k_t)$ reflects the capital-consumption co-movement induced by the AR(1) TFP process

The overidentification ($R = 6 > K = 4$) allows for a specification test: moments not used in estimation can be verified against the estimated model — a key diagnostic recommended in [[SMM Weighting Matrix and Inference]].

## Why SMM and Not GMM?

The productivity shock $z_t$ in (BM.5) is **latent**: it is not directly observed in the data. Although the budget constraint and FOCs pin down the model structure, computing theoretical moments like $E[y_t^2]$ or $\text{corr}(c_t, k_t)$ requires integrating over the distribution of the entire TFP path — a high-dimensional integral with no closed form.

SMM resolves this by simulating the TFP path $\{z_{s,t}\}$ directly, making any moment computable via Monte Carlo averaging. See [[Method of Simulated Moments]] for the general consistency result showing SMM works for any $R \geq 1$ simulations.

## Connections

- [[SMM Python Implementation]] — Python workflow (`trunc_norm_draws`, `err_vec`, `criterion`, two-step W, `Jac_err`) directly applicable to this exercise with BM-specific simulation replacing `trunc_norm_draws`
- [[SMM Weighting Matrix and Inference]] — identity W, two-step W, and $\hat{\Sigma}_{SMM}$ procedures used in both parts of the exercise
- [[Method of Simulated Moments]] — consistency and $(1+1/R)$ variance inflation theorem
- [[Practical Issues in Simulation Estimation]] — common random numbers (fix $u_{s,t}$ before optimizer), step-size for Jacobian

## See Also

- [[Simulation-Based Estimation - Overview]] — situates SMM within the family of simulation-based methods
- [[Indirect Inference]] — alternative that uses AR(1) or VAR regression coefficients as moments (natural choice for BM model)
- [[SMM Estimator for Copulas]] — another application of the same SMM framework

## Sources

- [Computational Methods for Economists — Ch. 19](https://opensourceecon.github.io/CompMethods/struct_est/SMM.html) — Evans (2024), Sections 19.4.2, 19.7
- Brock, W.A. and L.J. Mirman (1972), "Optimal Economic Growth and Uncertainty: The Discounted Case," *Journal of Economic Theory* 4(3), 479–513
- Smith, A.A. Jr. (2020), "Indirect Inference," *New Palgrave Dictionary of Economics*, Palgrave MacMillan
