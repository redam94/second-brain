---
title: "Parameter Estimation in Market Response"
aliases:
  - "MRM Estimation"
  - "OLS GLS 2SLS Marketing"
  - "Bayesian Marketing Estimation"
tags:
  - type/concept
  - topic/market-response
  - topic/estimation
  - topic/econometrics
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_ingested: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 5"
chapter: "5"
status: complete
doc_type: concept
source_location: "Ch. 5, Sec. 5.1, pp. 185-200"
depends_on:
  - "[[Design of Static Response Models]]"
  - "[[Design of Dynamic Response Models]]"
  - "[[Functional Forms in Marketing]]"
  - "[[Market Share Models]]"
used_by:
  - "[[Model Testing and Specification]]"
  - "[[Flexible Functional Forms]]"
  - "[[Model Selection and Exploratory Analysis]]"
  - "[[Marketing Generalizations Overview]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
  - "[[Implementation of Market Response Models]]"
---

# Parameter Estimation in Market Response

> [!abstract] Summary
> Chapter 5 covers the estimation toolkit for market response models: OLS and its 8 assumptions, GLS/FGLS for autocorrelated errors, SUR for multi-equation systems, 2SLS/3SLS for simultaneous equations, and Bayesian approaches including hierarchical Bayes (HB) and Empirical Bayes (EB). Also covers IV estimation for endogenous regressors.

## Variable Classification

> [!definition] Variable Types
> - **Exogenous**: determined outside the model (macro variables, season)
> - **Predetermined**: includes lagged endogenous variables; not correlated with current errors
> - **Current endogenous**: jointly determined with the dependent variable in the same period (e.g., advertising when spending reacts to same-period sales signals)
>
> Simultaneity arises when marketing instruments are **current endogenous** — OLS is biased and inconsistent.
> ^def-var-types

## OLS

> [!theorem] OLS Estimator
> For the linear model $\mathbf{q} = \mathbf{X}\boldsymbol{\beta} + \mathbf{u}$:
>
> $$\hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{q} \tag{Eq 5.5}$$
>
> $$\text{Var}(\hat{\boldsymbol{\beta}}) = \sigma^2(\mathbf{X}'\mathbf{X})^{-1} \tag{Eq 5.6}$$
>
> BLUE (Best Linear Unbiased Estimator) under all 8 Gauss-Markov assumptions (Table 5-1):
> 1. Linearity
> 2. Fixed $\mathbf{X}$ (or independence of $\mathbf{X}$ and $\mathbf{u}$)
> 3. Full rank of $\mathbf{X}$
> 4. $E(\mathbf{u}) = \mathbf{0}$
> 5. $E(\mathbf{u}\mathbf{u}') = \sigma^2 \mathbf{I}$ (homoscedasticity + no autocorrelation)
> 6. No multicollinearity
> 7. Correct functional form
> 8. No simultaneity bias
> ^thm-ols

## Generalized Least Squares (GLS/FGLS)

When errors are autocorrelated or heteroscedastic ($E(\mathbf{u}\mathbf{u}') = \sigma^2 \mathbf{\Omega}$, $\mathbf{\Omega} \neq \mathbf{I}$):

$$\hat{\boldsymbol{\beta}}_{\text{GLS}} = (\mathbf{X}'\mathbf{\Omega}^{-1}\mathbf{X})^{-1}\mathbf{X}'\mathbf{\Omega}^{-1}\mathbf{q}$$

When $\mathbf{\Omega}$ is unknown, **Feasible GLS (FGLS)** substitutes a consistent estimate $\hat{\mathbf{\Omega}}$. In practice: estimate the error ARMA structure from OLS residuals, then transform data by the estimated filter.

## Seemingly Unrelated Regressions (SUR)

For a system of $M$ equations (e.g., sales equations for multiple brands) with correlated errors across equations:

$$\mathbf{q}_m = \mathbf{X}_m \boldsymbol{\beta}_m + \mathbf{u}_m, \quad m = 1, \ldots, M$$
$$E(u_{mt} u_{m't}) = \sigma_{mm'}$$

**SUR** (Zellner 1962) is more efficient than OLS equation-by-equation when:
1. Errors are correlated across equations
2. Regressors differ across equations

SUR is the standard estimator for **MCI/MNL market share systems** (see [[Market Share Models]]) and multi-brand advertising effects.

## Simultaneous System and 2SLS/3SLS

> [!definition] Structural System
> The full simultaneous system in matrix form:
>
> $$\mathbf{Y}\mathbf{\Gamma} + \mathbf{X}\mathbf{B} = \mathbf{U} \tag{Eq 5.4}$$
>
> where $\mathbf{Y}$ = current endogenous variables, $\mathbf{X}$ = predetermined variables, $\mathbf{\Gamma}$ and $\mathbf{B}$ = structural coefficient matrices.
>
> **2SLS** (Two-Stage Least Squares): instrument endogenous RHS variables with exogenous variables. First stage: regress endogenous $\mathbf{Y}$ on $\mathbf{X}$; second stage: substitute fitted values $\hat{\mathbf{Y}}$ in structural equation. Consistent but less efficient than 3SLS.
>
> **3SLS**: adds SUR cross-equation correlation to 2SLS. Full system efficiency when the model is correctly specified.
>
> **ILS** (Indirect Least Squares): OLS on the reduced form, then back-solves for structural parameters. Exact identification only.
> ^def-2sls

See [[Instrumental Variables]] for the IV estimator in a causal inference context.

## Bayesian Estimation

> [!definition] Bayesian Posterior
> The Bayesian approach updates a **prior** distribution $p(\boldsymbol{\beta}, \sigma)$ with the **likelihood** $p(\mathbf{q}|\boldsymbol{\beta}, \sigma)$:
>
> $$p(\boldsymbol{\beta}, \sigma | \mathbf{q}) \propto p(\mathbf{q} | \boldsymbol{\beta}, \sigma) \cdot p(\boldsymbol{\beta}, \sigma) \tag{Eq 5.14}$$
>
> With a **noninformative prior** $p(\boldsymbol{\beta}, \sigma) \propto 1/\sigma$ (Eq 5.15):
>
> $$[\boldsymbol{\beta} | \mathbf{q}] \sim N(\hat{\boldsymbol{\beta}}_{\text{OLS}},\ \sigma^2 (\mathbf{X}'\mathbf{X})^{-1}) \tag{Eq 5.27}$$
>
> The posterior mean equals the OLS estimate; Bayesian and frequentist results coincide under diffuse priors.
> ^def-bayes-posterior

### Hierarchical Bayes (HB) Shrinkage

> [!definition] HB Shrinkage Estimator
> When parameters vary across brands/markets (random coefficients), the HB estimator (Eq 5.30) shrinks individual estimates toward the grand mean:
>
> $$\hat{\boldsymbol{\beta}}^{\text{HB}}_i = \mathbf{W}_i \hat{\boldsymbol{\beta}}_i + (\mathbf{I} - \mathbf{W}_i) \bar{\boldsymbol{\beta}}$$
>
> where $\mathbf{W}_i$ is a matrix that downweights individual estimates with high sampling variance and upweights the pooled mean. This is a **Stein-like shrinkage** rule that dominates OLS in mean squared error when there are $\geq 3$ parameters.
>
> **Empirical Bayes (EB)**: estimates the hyperparameters $(\bar{\boldsymbol{\beta}}, \boldsymbol{\Sigma})$ from data rather than specifying them a priori. More automated but ignores uncertainty in hyperparameters.
> ^def-hb

Related to [[Hierarchical Linear Models]] and the partial-pooling perspective in [[Partial Pooling as Multiple Comparisons Correction]].

## Estimation Decision Tree (Figure 5-2)

```
Single equation?
├── No autocorrelation, homoscedastic → OLS
├── Autocorrelated errors → GLS/FGLS
└── Endogenous regressors → IV / 2SLS

Multiple equations?
├── No cross-equation correlation → OLS equation-by-equation
├── Correlated errors, different X → SUR
└── Simultaneous system → 2SLS or 3SLS
```

## Hausman Test for Endogeneity

> [!theorem] Hausman Test
> To test whether a regressor $X$ is endogenous (correlated with $u$):
>
> 1. Regress $X$ on all exogenous variables $\mathbf{Z}$; save residuals $\hat{v}$
> 2. Include $\hat{v}$ in the structural equation alongside $X$
> 3. If the coefficient on $\hat{v}$ is significant (Wald statistic), $X$ is endogenous — use IV/2SLS
>
> This is also called the regression-based Hausman-Wu test.
> ^thm-hausman

Related to [[Instrumental Variables]] (MHE context).

## Cross-Links

- Functional forms requiring nonlinear estimation: [[Functional Forms in Marketing]]
- ADL / Koyck estimation issues (MA errors): [[Carryover Effects and Distributed Lags]]
- Testing and diagnostics: [[Model Testing and Specification]]
- Bayesian workflow: [[Bayesian Workflow - Overview]]
- IV estimator theory: [[Instrumental Variables]]
- SUR for market share systems: [[Market Share Models]]
