---
title: "Functional Forms in Marketing"
aliases:
  - "Sales Response Functional Forms"
  - "Marketing Response Functions"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/functional-forms
  - topic/econometrics
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 3"
chapter: "3"
status: complete
doc_type: concept
source_location: "Ch. 3, Sec. 3.2, pp. 94-128"
depends_on:
  - "[[Markets Data and Sales Drivers]]"
  - "[[Response Models for Marketing Management]]"
used_by:
  - "[[Market Share Models]]"
  - "[[Aggregation of Relations]]"
  - "[[Design of Static Response Models]]"
  - "[[Shape of the Marketing Response Function]]"
  - "[[Parameter Estimation in Market Response]]"
  - "[[Flexible Functional Forms]]"
  - "[[Advertising and Promotion Effects]]"
  - "[[Price and Distribution Effects]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
---

# Functional Forms in Marketing

> [!abstract] Summary
> Chapter 3 is the technical core of the book, cataloguing ten functional forms for the sales response function $Q = f(X)$, each with full derivation, elasticity formula, shape properties, and marketing interpretation. Also covers the SCAN*PRO multiplicative scanner model, random coefficients specifications, and switching models.

## Response Sensitivity and Elasticity

> [!definition] Response Sensitivity and Elasticity
> **Response sensitivity** (absolute): $\partial Q / \partial X$
>
> **Point elasticity** (scale-free): $\eta = \frac{\partial Q}{\partial X} \cdot \frac{X}{Q} = \frac{d \ln Q}{d \ln X}$
>
> Elasticity is preferred for cross-study comparison and meta-analysis because it is dimensionless. For marketing instruments, elasticities serve as the key empirical generalizations.
> ^def-elasticity

---

## 1. Linear Form

> [!definition] Linear
> $$Q = \beta_0 + \beta_1 X$$
>
> **Elasticity:**
> $$\eta = \beta_1 \frac{X}{Q} = \frac{\beta_1 X}{\beta_0 + \beta_1 X}$$
>
> **Shape:** Constant slope; no saturation. Increasing, decreasing, or flat depending on sign of $\beta_1$.
>
> **Use:** First-order approximation in log-linear models; baseline for testing against nonlinear alternatives.
> ^def-linear

---

## 2. Semilogarithmic Form

> [!definition] Semilogarithmic
> $$Q = \beta_0 + \beta_1 \ln X$$
>
> **Elasticity:**
> $$\eta = \frac{\beta_1}{Q} = \frac{\beta_1}{\beta_0 + \beta_1 \ln X}$$
>
> **Shape:** Concave (diminishing returns) when $\beta_1 > 0$. Useful when a large range of $X$ is observed.
> ^def-semilog

---

## 3. Power / Log-Log Form (Constant Elasticity)

> [!definition] Power Form
> $$Q = e^{\beta_0} X^{\beta_1}$$
>
> Taking logs: $\ln Q = \beta_0 + \beta_1 \ln X$
>
> **Elasticity:**
> $$\eta = \beta_1 \quad \text{(constant)}$$
>
> **Shape:** Concave for $0 < \beta_1 < 1$; convex (increasing returns) for $\beta_1 > 1$; linear for $\beta_1 = 1$.
>
> **Marketing use:** Most common form for advertising and price response. The log-log specification fits by OLS directly on $\ln Q$ and $\ln X$.
> ^def-power

---

## 4. Multiplicative Form

> [!definition] Multiplicative (Multi-instrument)
> $$Q = e^{\beta_0} X_1^{\beta_1} X_2^{\beta_2} \cdots X_J^{\beta_J} \tag{Eq 3.16}$$
>
> Taking logs: $\ln Q = \beta_0 + \beta_1 \ln X_1 + \cdots + \beta_J \ln X_J$
>
> **Elasticity of instrument $j$:**
> $$\eta_j = \beta_j \quad \text{(constant, independent of other instruments)}$$
>
> **Properties:** Cross-elasticities are zero (no interaction). Easily estimated by OLS on log-transformed data. The workhorse model for scanner data analysis (see SCAN*PRO below).
> ^def-multiplicative

---

## 5. Exponential Form (Increasing Returns)

> [!definition] Exponential
> $$Q = e^{\beta_0} e^{\beta_1 X} = e^{\beta_0 + \beta_1 X}$$
>
> For pricing applications: $Q = Q^0 e^{-\beta_1 P}$, $\beta_1 > 0$
>
> **Elasticity:**
> $$\eta = \beta_1 X$$
>
> **Shape:** Convex — increasing marginal returns. Appropriate for threshold phenomena or situations where heavy spending compounds.
> ^def-exponential

---

## 6. Log-Reciprocal / Inverse Form (S-Shaped Saturation)

> [!definition] Log-Reciprocal
> $$Q = \exp\!\left(\beta_0 - \frac{\beta_1}{X}\right)$$
>
> **Elasticity:**
> $$\eta = \frac{\beta_1}{X}$$
>
> **Shape:** S-shaped with saturation at $e^{\beta_0}$; inflection point at $X = \beta_1/2$. Increasing marginal returns at low $X$, diminishing returns at high $X$.
> ^def-log-reciprocal

---

## 7. Gompertz Form

> [!definition] Gompertz
> $$Q = \beta_0 \beta_1^{\beta_2^{-\beta_3 X}}, \quad 0 < \beta_1 < 1, \; 0 < \beta_2 < 1, \; \beta_3 > 0$$
>
> **Shape:** Asymmetric S-curve with faster initial growth than logistic; upper asymptote $\beta_0$. Used for product adoption and life-cycle modeling. Related to [[Product Adoption and Diffusion Models]].
> ^def-gompertz

---

## 8. Modified Exponential (Saturation without S-Shape)

> [!definition] Modified Exponential
> $$Q = Q^0 (1 - e^{-\beta_1 X})$$
>
> **Elasticity:**
> $$\eta = \frac{\beta_1 X e^{-\beta_1 X}}{1 - e^{-\beta_1 X}}$$
>
> **Shape:** Concave with upper asymptote $Q^0$. No inflection point. Appropriate when saturation is observed but there is no initial convex phase.
> ^def-mod-exponential

---

## 9. Logistic Form

> [!definition] Logistic
> $$Q = \frac{Q^0}{1 + \exp\!\left(-(\beta_0 + \sum_j \beta_j X_j)\right)}$$
>
> **Shape:** Symmetric S-curve, bounded in $(0, Q^0)$. Standard form for binary choice when $Q$ is market share (bounded in [0,1]). Related to [[Logit Purchase Decision Model]].
> ^def-logistic

---

## 10. ADBUDG Form (Little 1970)

> [!definition] ADBUDG
> $$Q = \beta_0 + (\beta_1 - \beta_0) \frac{X^{\beta_2}}{\beta_3^{\beta_2} + X^{\beta_2}}$$
>
> Parameters:
> - $\beta_0$: sales at zero advertising (minimum)
> - $\beta_1$: saturation sales (maximum)
> - $\beta_2$: shape parameter ($\beta_2 < 1$: concave; $\beta_2 > 1$: S-shaped)
> - $\beta_3$: advertising level at midpoint $(\beta_0 + \beta_1)/2$
>
> **Elasticity at midpoint:**
> $$\eta = \frac{\beta_2}{2}(\beta_1 - \beta_0) / Q(\beta_3)$$
>
> **Properties:** Highly flexible; nests concave and S-shaped responses; parameterized by managerially interpretable quantities. Widely used in budget optimization (see [[Optimal Marketing Decisions and Forecasting]]).
> ^def-adbudg

---

## SCAN*PRO Scanner Model

> [!definition] SCAN*PRO
> The SCAN*PRO model (Wittink et al.) applies the multiplicative form to weekly scanner data:
>
> $$Q_{bst} = \exp(\mu_{bs}) \cdot \left(\frac{P_{bst}}{P^*_{bs}}\right)^{\beta_1} \cdot \prod_k F_{kbst}^{\gamma_k} \cdot \prod_k D_{kbst}^{\delta_k} \cdot \epsilon_{bst}$$
>
> where $P^*_{bs}$ is a reference price, $F_k$ are feature advertising dummies, $D_k$ are display dummies. Estimated in log form by OLS or GLS at the store-brand-week level.
>
> **Key property:** Allows brand-specific intercepts $\mu_{bs}$ capturing unobserved brand equity and store heterogeneity.
> ^def-scanpro

---

## Random Coefficients Model

> [!definition] Random Coefficients
> When response varies across brands, markets, or time, parameters are treated as random:
>
> $$Q_{it} = \beta_{0i} + \beta_{1i} X_{it} + \epsilon_{it}$$
>
> where $\beta_{ji} = \bar{\beta}_j + u_{ji}$, and $u_{ji} \sim (0, \Sigma_\beta)$. Estimation via GLS (Swamy 1970) or hierarchical Bayes. Connects to [[Hierarchical Linear Models]] and the HB shrinkage estimator in [[Parameter Estimation in Market Response]]. (Eq 3.44 in book)
> ^def-random-coeff

## Systematically Varying Parameters

Parameters can be made functions of other variables (e.g., competitive context, season):

$$\beta_1 = \alpha_0 + \alpha_1 Z_t$$

substituting into the model yields an **interaction term** $\alpha_1 Z_t X_t$. This generalizes the constant-coefficient model and allows heterogeneous response across subgroups or time periods. See also [[Shape of the Marketing Response Function]].

## Switching Models

When the functional form itself is unknown a priori, a **switching regression** tests whether the data support different response regimes (e.g., pre/post competitive entry):

$$Q_t = \begin{cases} f_1(X_t; \beta_1) + \epsilon_t & \text{if regime 1} \\ f_2(X_t; \beta_2) + \epsilon_t & \text{if regime 2} \end{cases}$$

Regime assignment can be endogenous (Goldfeld-Quandt, Maddala-Nelson) or triggered by an observable event.

## Functional Form Selection Summary

| Form | Shape | Saturation | Constant $\eta$? | Marketing Context |
|------|-------|-----------|-----------------|-------------------|
| Linear | Linear | No | No | Simple baseline |
| Semilog | Concave | No | No | Large advertising range |
| Power | Concave/convex | No | **Yes** | Advertising, price |
| Multiplicative | — | No | **Yes** | Multi-instrument |
| Exponential | Convex | No | No | Threshold advertising |
| Log-reciprocal | S-shaped | Yes | No | Threshold + saturation |
| Gompertz | Asymmetric S | Yes | No | Life cycle adoption |
| Modified exponential | Concave | Yes | No | Saturation without S |
| Logistic | Symmetric S | Yes | No | Market share |
| ADBUDG | Flexible | Yes | No | Budget optimization |

## Cross-Links

- Market share extensions: [[Market Share Models]]
- Dynamic extensions: [[Carryover Effects and Distributed Lags]], [[Shape of the Marketing Response Function]]
- Estimation of nonlinear forms: [[Parameter Estimation in Market Response]]
- Empirical elasticities: [[Advertising and Promotion Effects]], [[Price and Distribution Effects]]
- Product adoption S-curves: [[Product Adoption and Diffusion Models]]
