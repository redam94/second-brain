---
title: "Practical Issues in Simulation Estimation"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/concept
  - doc/paper
source: "[[raw/tdb136.pdf]], [[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Liesenfeld & Breitung (1998), Section 6, pp. 13-16; Oh & Patton (2011), Sections 2.4, 3"
date_ingested: 2026-04-11
date_updated: 2026-06-22
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Method of Simulated Moments]]"
  - "[[Indirect Inference]]"
  - "[[Efficient Method of Moments]]"
  - "[[SMM Copula Asymptotic Theory]]"
used_by:
  - "[[SMM Weighting Matrix and Inference]]"
  - "[[SMM Python Implementation]]"
aliases:
  - Variance Reduction in Simulation
  - Common Random Numbers
  - Simulation Estimation Implementation
---

# Practical Issues in Simulation Estimation

> [!summary]
> Implementing simulation-based estimators requires attention to several practical concerns: using **common random numbers** to ensure convergence of the iterative optimizer, **variance reduction techniques** (antithetic variates, control variates) to reduce Monte Carlo noise, careful **selection of the auxiliary model** for indirect inference, appropriate **step sizes** for numerical derivatives, and understanding the **trade-off between simulation size and computational cost**. This note covers implementation guidance from both Liesenfeld & Breitung (1998) and Oh & Patton (2011).

## Common Random Numbers

> [!important] Common Random Numbers Are Essential for Convergence
> At every iteration step of the optimization over $\theta$, the criterion function is estimated via simulations. For convergence of the iterative algorithm, it is critical to use **common random numbers**: the same set of simulated random variables $\{\varepsilon_t^{(r)}\}$ is used to generate simulated values $y_t^{(r)}(\theta)$ for every value of $\theta$ during the optimization.
>
> If new random draws were made at each iteration, the randomness would introduce additional noise into the objective function surface, and the algorithm would fail to converge (Hendry, 1984).

For the reduced form $y_t = \varrho(z_t, \varepsilon_t; \theta)$:
1. **Before optimization**: draw and store $\{\varepsilon_t^{(r)}\}_{r=1}^R$ for $t = 1, \ldots, T$
2. **During optimization**: for each candidate $\theta$, compute $y_t^{(r)}(\theta) = \varrho(z_t, \varepsilon_t^{(r)}; \theta)$ using the stored draws
3. The criterion function then varies smoothly in $\theta$ (modulo the inherent non-smoothness from indicator functions in EDF-based moments)

## Variance Reduction Techniques

The overall variance of simulation-based estimators consists of two components:
1. **Irreducible component**: the variance the estimator would have if based on the exact criterion function
2. **Monte Carlo sampling variance**: additional variance from evaluating the criterion function by simulation

The first component is irreducible; the second can be reduced by increasing $R$ or by variance reduction techniques.

### Antithetic Variates

> [!definition] Definition: Antithetic Variates
> To estimate a quantity $\omega$ by simulations, construct **two negatively correlated estimates** $\hat{\omega}_1$ and $\hat{\omega}_2$ such that their average $\frac{1}{2}(\hat{\omega}_1 + \hat{\omega}_2)$ has lower variance than either individual estimate.
>
> **Implementation:** If the reduced form error term $\varepsilon_t$ has a symmetric distribution around zero:
> - Compute $\hat{\omega}_1$ using simulated values $\{\varepsilon_t^{(r)}\}$
> - Compute $\hat{\omega}_2$ using $\{-\varepsilon_t^{(r)}\}$ (same draws, opposite sign)
>
> The two estimates are negatively correlated, and their average has reduced variance. The additional computing cost is negligible (one extra pass through the model with pre-generated draws).
^def-antithetic-variates

### Control Variates

> [!definition] Definition: Control Variates
> The control variate technique uses two components for the final Monte Carlo estimate of a quantity $\omega$:
> 1. The natural Monte Carlo estimate $\hat{\omega}^*$
> 2. An estimate $\bar{\omega}$ created from the same set of simulated random numbers as $\hat{\omega}^*$, with **known expectation** and positive correlation with $\hat{\omega}^*$
>
> The control variate estimate is:
> $$\tilde{\omega} = (\hat{\omega}^* - \bar{\omega}) + E(\bar{\omega})$$
>
> Under suitable conditions, $\text{var}(\tilde{\omega}) \ll \text{var}(\hat{\omega}^*)$.
>
> **Application to indirect inference** (Calzolari, Di Iorio, and Fiorentini, 1998): For the parameter-based indirect inference estimator, the control variate adjusts by the difference $(\hat{\lambda} - \bar{\lambda}_T)$, where $\hat{\lambda}$ is the auxiliary model estimate from observed data and $\bar{\lambda}_T$ is estimated from simulated data using $\hat{\lambda}_T$ as the parameter vector. Monte Carlo experiments show that combining indirect inference with control variates **substantially reduces** the Monte Carlo sampling variance, especially for continuous-time models.
^def-control-variates

## Auxiliary Model Selection (Indirect Inference)

For [[Indirect Inference]], the choice of auxiliary model determines efficiency. Two approaches:

### Strategy 1: Simple, Close Auxiliary Model

Choose a tractable model that captures the salient features of the structural model:

| Structural Model | Natural Auxiliary Model | Rationale |
|-----------------|----------------------|-----------|
| Stochastic volatility | GARCH | Both capture volatility clustering |
| CIR interest rate | Discrete-time approximation | Both model mean reversion |
| Jump-diffusion | GARCH with fat tails | Both produce leptokurtic returns |

**Advantages:** Simple to implement, few auxiliary parameters, stable estimation.

**Disadvantages:** May miss features of the structural model, leading to efficiency loss.

### Strategy 2: Data-Dependent SNP Model

Use the [[Efficient Method of Moments|SNP auxiliary model]], increasing its dimension with sample size:

**Advantages:** Asymptotically efficient; captures all features of the data.

**Disadvantages:**
- Over-parameterized SNP models can lead to substantial efficiency loss in small samples
- Choosing the SNP dimension ($l_\mu$, $l_s$, $k_u$, $k_z$) requires model selection (AIC/BIC)
- Computational cost is higher

> [!warning] Over-Parameterization
> Andersen, Chung, and Sørensen (1998) find evidence that score generators based on an over-parameterized SNP model lead to a **substantial loss of efficiency**, especially in smaller samples. Substituting an ARCH-type scale function for the polynomial scale in the SNP model improves efficiency because it directly captures the autocorrelation in variance typical of financial data.

## Step Size for Numerical Derivatives

When estimating the asymptotic covariance matrix of the SMM estimator, the Jacobian $\mathbf{G}_0$ must be estimated by numerical differentiation (see [[SMM Copula Asymptotic Theory#^prop-3-variance|Proposition 3]]).

> [!important] Step-Size Guidelines (Oh & Patton, 2011)
> The step size $\varepsilon_{T,S}$ must satisfy:
> 1. $\varepsilon_{T,S} \to 0$ (consistency)
> 2. $\varepsilon_{T,S} \times \min(\sqrt{T}, \sqrt{S}) \to \infty$ (convergence rate requirement)
>
> **Practical rule:** For sample size $T$:
> $$\varepsilon_{T,S} \gg \frac{1}{\sqrt{T}}$$
>
> | $T$ | Lower bound ($1/\sqrt{T}$) | Recommended $\varepsilon_{T,S}$ |
> |-----|--------------------------|---------------------------|
> | 250 | 0.063 | 0.1 |
> | 1,000 | 0.032 | 0.01 – 0.1 |
> | 5,000 | 0.014 | 0.01 – 0.05 |
>
> **Warning:** Standard numerical differentiation defaults (e.g., MATLAB's $6 \times 10^{-6}$, or forward-difference $\sqrt{\epsilon_{\text{machine}}} \approx 1.5 \times 10^{-8}$) are **catastrophically too small** for this application. Using these defaults can produce coverage rates as low as 2% for a nominal 95% confidence interval (see [[SMM Copula Simulation and Application#^example-step-size|step-size sensitivity results]]).

## Simulation Size ($R$ or $S$) Trade-offs

The number of simulations affects both efficiency and computation time:

| $R$ (or $S/T$) | Variance Inflation | When to Use |
|----------------|-------------------|-------------|
| $R = 1$ | $2\times$ GMM variance | Never (too noisy) |
| $R = 5$ | $1.2\times$ | Quick preliminary analysis |
| $R = 20$ | $1.05\times$ | Standard practice |
| $R = 25$ (Oh & Patton) | $1.04\times$ | Recommended for copula SMM |
| $R = 100$ | $1.01\times$ | Final results if computation permits |
| $R \to \infty$ | $1\times$ (= GMM) | Infeasible but useful benchmark |

For the factor copula model, Oh and Patton use $S = 25 \times T$. The 4% efficiency loss relative to $S = \infty$ is negligible compared to the ~20-40% loss from using moments rather than the likelihood.

## Small Sample Properties of Indirect Inference

Andersen, Chung, and Sørensen (1998) conduct a comprehensive Monte Carlo study of the [[Efficient Method of Moments|EMM]] estimator for the stochastic volatility model:

- **EMM vs. GMM**: EMM is generally more efficient than standard GMM
- **EMM vs. MLE**: Likelihood-based estimators are generally more efficient, but EMM approaches their efficiency as sample size increases
- **Key practical finding**: Substituting an ARCH-type scale function for the polynomial scale in the SNP model improves efficiency — it more directly captures the autocorrelation in variance implied by the SV model
- Over-parameterized SNP specifications lose efficiency in small samples

## Implementation Checklist

For practitioners implementing simulation-based estimation:

- [ ] **Common random numbers**: Draw and fix $\{\varepsilon_t^{(r)}\}$ before optimization begins
- [ ] **Sufficient simulations**: Use $R \geq 20$ (or $S \geq 20T$) to keep variance inflation below 5%
- [ ] **Appropriate step size**: Set $\varepsilon_{T,S}$ between $0.01$ and $0.1$ for numerical derivatives; never use software defaults
- [ ] **Bootstrap for $\boldsymbol{\Sigma}_0$**: Use $B \geq 1{,}000$ *iid* bootstrap replications
- [ ] **Weight matrix**: Identity matrix is simple and stable; efficient weight matrix gives $\chi^2$ J-test but may be numerically unstable
- [ ] **Convergence**: Check that the optimizer converges from multiple starting values
- [ ] **Variance reduction**: Consider antithetic variates if the model has symmetric errors

## Connections

- Implementation details for [[Method of Simulated Moments]], [[Indirect Inference]], and [[Efficient Method of Moments]]
- Step-size guidance directly affects [[SMM Copula Asymptotic Theory#^prop-3-variance|Proposition 3 variance estimation]]
- Monte Carlo evidence in [[SMM Copula Simulation and Application]] validates these practical recommendations

## See Also

- [[Simulation-Based Estimation - Overview]] — theoretical context
- [[Method of Simulated Moments]] — core MSM theory
- [[SMM Copula Asymptotic Theory]] — where step-size requirements arise formally
- [[SMM Copula Simulation and Application]] — empirical validation
- [[SMM Weighting Matrix and Inference]] — step-size guidance for numerical Jacobians in the parameter Σ̂ computation
- [[SMM Python Implementation]] — Python code illustrating the eps step-size issue in scipy L-BFGS-B and the common random numbers pattern
- [[Brock-Mirman Model - SMM Estimation Exercise]] — structural macro estimation example illustrating common random numbers and R-choice in practice
- [[SMM Estimation of Factor Copulas]] — high-dimensional application where R=25T and the step-size guidance is directly applied

## Sources

- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), Section 6
- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), Sections 2.4, 3
- Hendry, D.F. (1984), "Monte Carlo Experimentation in Econometrics," *Handbook of Econometrics* Vol. 2
- Calzolari, G., F. Di Iorio, and G. Fiorentini (1998), "Control Variates for Variance Reduction in Indirect Inference," *The Econometrics Journal*, forthcoming
