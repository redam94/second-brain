---
title: "SMM Copula Simulation and Application"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - topic/copulas
  - type/example
  - doc/paper
source: "[[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Oh & Patton (2011), Sections 3-4, pp. 14-21"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Copula SMM"
doc_type: paper
depends_on:
  - "[[SMM Estimator for Copulas]]"
  - "[[SMM Copula Asymptotic Theory]]"
  - "[[SMM Copula Specification Testing]]"
  - "[[Dependence Measures for Copulas]]"
used_by: []
aliases:
  - SMM Copula Monte Carlo
  - Financial Firm Dependence Application
---

# SMM Copula Simulation and Application

> [!summary]
> Oh and Patton (2011) validate their SMM estimator through an extensive Monte Carlo study covering three copula models (Clayton, Normal, factor copula) in dimensions $N = 2, 3, 10$, for both *iid* and AR(1)-GARCH(1,1) data. The SMM estimator is approximately unbiased with moderate efficiency loss (20-40% for $N=2$, declining to ~20% for $N=10$) relative to MLE. The empirical application to seven major U.S. financial firms (2001-2010) finds significant tail dependence and mild evidence of stronger dependence during crashes than booms.

## Monte Carlo Study Design

### Three Copula Models

| Model | Parameters | Closed-Form Likelihood | Closed-Form Dependence |
|-------|-----------|----------------------|----------------------|
| Clayton | $\kappa$ | Yes | Kendall's $\tau$ only |
| Normal (Gaussian) | $\rho$ | Yes | Spearman's $\rho$ only |
| Factor copula | $(\sigma^2, \nu^{-1}, \lambda)$ | **No** | **None** |

**True parameter values** (calibrated to produce rank correlation $\approx 1/2$):
- Clayton: $\kappa = 1.00$
- Normal: $\rho = 0.50$
- Factor copula: $\sigma^2 = 1.00$, $\nu^{-1} = 0.25$, $\lambda = -0.50$

### Two Data Scenarios

**Scenario 1 — *iid* data:** Marginal distributions are standard Normal. Only copula parameters need estimation.

**Scenario 2 — AR(1)-GARCH(1,1) data:** Each variable follows:
$$
Y_{it} = \phi_0 + \phi_1 Y_{i,t-1} + \sigma_{it} \eta_{it}
$$
$$
\sigma_{it}^2 = \omega + \beta \sigma_{i,t-1}^2 + \alpha \sigma_{i,t-1}^2 \eta_{i,t-1}^2
$$

with $[\phi_0, \phi_1, \omega, \beta, \alpha] = [0.01, 0.05, 0.05, 0.85, 0.10]$ (matching daily equity return dynamics). Marginal parameters are estimated in a first stage; standardized residuals are used for copula estimation.

### Estimation Settings

- Sample size: $T = 1{,}000$ (approximately 4 years of daily data)
- Simulations: $S = 25 \times T = 25{,}000$
- Dependence measures used: Spearman's rank correlation + quantile dependence at $q = 0.05, 0.10, 0.90, 0.95$ (5 measures averaged across pairs)
- Weight matrix: Identity ($\hat{\mathbf{W}}_T = \mathbf{I}$)
- Replications: 100

## Key Results

### Bias and Precision (Tables 1 and 2)

> [!example] Example: Simulation Results for *iid* Data (Table 1)
> **Clayton copula ($\kappa_0 = 1.00$):**
>
> | | MLE | GMM | SMM | SMM* |
> |---|-----|-----|-----|------|
> | **$N=2$** | | | | |
> | Bias | 0.001 | -0.014 | -0.006 | -0.004 |
> | Std dev | 0.085 | 0.119 | 0.122 | 0.110 |
> | Median | 1.011 | 0.982 | 0.991 | 0.998 |
> | **$N=10$** | | | | |
> | Bias | 0.008 | 0.007 | 0.008 | 0.004 |
> | Std dev | 0.050 | 0.068 | 0.066 | 0.059 |
> | Median | 1.005 | 1.002 | 1.005 | 0.999 |
>
> **Normal copula ($\rho_0 = 0.50$):**
>
> | | MLE | GMM | SMM |
> |---|-----|-----|-----|
> | **$N=2$** | | | |
> | Bias | 0.004 | -0.001 | -0.001 |
> | Std dev | 0.024 | 0.034 | 0.034 |
> | **$N=10$** | | | |
> | Bias | 0.003 | -0.002 | -0.002 |
> | Std dev | 0.014 | 0.017 | 0.017 |
>
> **Interpretation:**
> - All estimators are approximately **unbiased** (bias small relative to std dev)
> - **Precision improves with dimension** $N$ due to exchangeability — more pairs provide more information
> - **SMM vs. MLE efficiency loss**: ~40% for $N=2$, declining to ~20% for $N=10$ (measured by std dev ratio)
> - **SMM vs. GMM**: loss from simulating (rather than knowing) the moment function is 0-3% — negligible
^example-iid-results

> [!example] Example: Simulation Results for AR-GARCH Data (Table 2)
> Results are **very similar** to the *iid* case, confirming the surprising theoretical result that first-stage estimation error does not affect the asymptotic distribution ([[SMM Copula Asymptotic Theory#^prop-2-normality|Proposition 2]]).
>
> **Factor copula ($\sigma_0^2 = 1.00$, $\nu_0^{-1} = 0.25$, $\lambda_0 = -0.50$, $N=10$):**
>
> | | $\sigma^2$ | $\nu^{-1}$ | $\lambda$ |
> |---|-----------|-----------|----------|
> | Bias | -0.004 | -0.016 | -0.012 |
> | Std dev | 0.085 | 0.079 | 0.071 |
> | Median | 0.990 | 0.238 | -0.508 |
>
> The factor copula can only be estimated by SMM (no closed-form likelihood or dependence measures), and the estimates are well-centered with reasonable precision.
^example-garch-results

### Coverage and Step Size Sensitivity (Table 3)

> [!example] Example: Step-Size Sensitivity for Confidence Intervals
> The asymptotic covariance estimator ([[SMM Copula Asymptotic Theory#^prop-3-variance|Proposition 3]]) requires a numerical derivative with step size $\varepsilon_{T,S}$. The theory requires $\varepsilon_{T,S} \to 0$ but $\varepsilon_{T,S} \times \min(\sqrt{T}, \sqrt{S}) \to \infty$.
>
> For $T = 1{,}000$: the threshold is $\varepsilon > 1/\sqrt{1000} \approx 0.032$.
>
> **95% confidence interval coverage rates (Normal copula, $N=3$, *iid*):**
>
> | $\varepsilon_{T,S}$ | Coverage |
> |-------------------|----------|
> | 0.1 | ~95% (nominal) |
> | 0.01 | ~95% (nominal) |
> | 0.001 | Much below 95% |
> | 0.0001 | As low as 2% |
>
> **Key takeaway:** Standard numerical differentiation step sizes (e.g., MATLAB's default $6 \times 10^{-6}$) are **far too small** for this application. Use $\varepsilon_{T,S} = 0.01$ or $0.1$.
^example-step-size

### Over-Identifying Restrictions Test (Table 3)

The J-test rejection rates at the 5% nominal level are close to 95% acceptance for all three correctly specified copula models and all step sizes, confirming that the [[SMM Copula Specification Testing#^prop-4-j-test|Proposition 4]] test has correct size.

## Empirical Application: Financial Firm Dependence

### Data

- **Period**: January 2001 to December 2010 ($T = 2{,}515$ trading days)
- **Assets**: Bank of America, Bank of New York, Citigroup, Goldman Sachs, J.P. Morgan, Morgan Stanley, Wells Fargo
- **Returns**: Daily stock returns, positively skewed and leptokurtic (kurtosis 16.0 to 119.8)

### Marginal Models

Each stock's return is modeled as:

$$
r_{it} = \phi_{0i} + \phi_{1i} r_{i,t-1} + \phi_{2i} r_{m,t-1} + \varepsilon_{it}, \quad \varepsilon_{it} = \sigma_{it} \eta_{it}
$$

$$
\sigma_{it}^2 = \omega_i + \beta_i \sigma_{i,t-1}^2 + \alpha_{1i} \varepsilon_{i,t-1}^2 + \gamma_{1i} \varepsilon_{i,t-1}^2 \cdot \mathbf{1}_{[\varepsilon_{i,t-1} \leq 0]} + \alpha_{2i} \varepsilon_{m,t-1}^2 + \gamma_{2i} \varepsilon_{m,t-1}^2 \cdot \mathbf{1}_{[\varepsilon_{m,t-1} \leq 0]}
$$

where $r_{mt}$ is the S&P 500 index return. This is a GJR-GARCH model with asymmetric responses to market shocks.

### Dependence Structure

> [!example] Example: Dependence Measures Among Seven Financial Firms (Table 4)
> **Rank correlations** (upper triangle of Table 4):
> - Average: 0.63
> - Range: 0.55 to 0.76
> - Highest: Bank of America / Wells Fargo (0.76)
>
> **Tail dependence** (average of 1% and 99% quantile dependence):
> - Range: 0.16 to 0.40
> - Substantial tail dependence — not captured by Gaussian copula
>
> **Asymmetry** (difference between 90% and 10% quantile dependence):
> - Mostly **negative** (14 out of 21 pairs)
> - Interpretation: **dependence is stronger during crashes than during booms**
^example-financial-dependence

### Model Estimation Results

> [!example] Example: Copula Model Estimates for Financial Firms (Table 5)
> Three copula models estimated using SMM with 5 dependence measures, $\hat{\mathbf{W}}_T = \mathbf{I}$, $B = 1{,}000$ bootstraps, $\varepsilon_{T,S} = 0.1$:
>
> **Clayton copula** ($\kappa$):
> - MLE: $\hat{\kappa} = 2.23$ (SE 0.07)
> - SMM: $\hat{\kappa} = 1.73$ (SE 0.05)
> - J-test p-value: **<0.001** (strongly rejected)
> - Issue: Clayton imposes *only* lower tail dependence, too asymmetric for the data
>
> **Normal copula** ($\rho$):
> - MLE: $\hat{\rho} = 0.63$ (SE 0.01)
> - SMM: $\hat{\rho} = 0.64$ (SE 0.01)
> - J-test p-value: **0.043** (marginally rejected at 5%)
> - Issue: Normal copula implies zero tail dependence, but data shows substantial tail dependence
>
> **Factor copula** ($\sigma^2, \nu^{-1}, \lambda$):
> - SMM only (no MLE available)
> - $\hat{\sigma}^2 = 2.77$ (SE 0.16)
> - $\hat{\nu}^{-1} = 0.52$ (SE 0.10) — **significantly > 0**, indicating tail dependence
> - $\hat{\lambda} = -0.27$ (SE 0.21) — not significantly different from 0
> - J-test p-value: **not rejected** — factor copula fits adequately
>
> **Conclusion:** The factor copula provides the best fit. Tail dependence ($\nu^{-1}$) is the key feature missing from Clayton and Normal copulas. The asymmetry parameter ($\lambda$) is not statistically significant, though the point estimate suggests mildly stronger crash dependence.
^example-model-comparison

## Connections

- Validates [[SMM Copula Asymptotic Theory|Propositions 1-3]] in finite samples
- Applies [[SMM Copula Specification Testing|Proposition 4 J-test]] to compare copula models
- Uses [[Dependence Measures for Copulas]] as the moment conditions
- Demonstrates the [[SMM Estimator for Copulas#^def-factor-copula|factor copula model]] which requires SMM
- Extends [[Copula Estimation|standard copula estimation]] to intractable models

## See Also

- [[SMM Estimator for Copulas]] — the estimator applied here
- [[SMM Copula Asymptotic Theory]] — theoretical justification
- [[SMM Copula Specification Testing]] — the J-test used for model comparison
- [[Dependence Measures for Copulas]] — the moments matched
- [[Method of Simulated Moments]] — the general SMM framework of which this is a copula application
- [[Brock-Mirman Model - SMM Estimation Exercise]] — another structural SMM application (macroeconomic growth model), useful for cross-domain comparison

## Sources

- Oh_Patton_SMM_copulas_nov11 — Oh & Patton (2011), Sections 3-4
