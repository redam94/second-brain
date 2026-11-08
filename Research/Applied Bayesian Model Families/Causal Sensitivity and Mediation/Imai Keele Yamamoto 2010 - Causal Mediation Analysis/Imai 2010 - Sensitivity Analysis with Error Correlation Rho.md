---
title: "Imai 2010 - Sensitivity Analysis with Error Correlation Rho"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Sec. 5.1-5.3, pp. 11-13; Eq. 24, Theorem 4, Corollary 1; Appendices C-E, pp. 18-19"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]]"
used_by:
  - "[[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]]"
  - "[[Imai 2010 - Media Framing Application and Simulation]]"
aliases:
  - mediation sensitivity analysis
  - rho sensitivity parameter
  - sensitivity of mediation to unmeasured confounding
  - sensitivity of ACME to sequential ignorability violation
---

# Imai 2010 - Sensitivity Analysis with Error Correlation Rho

> [!summary]
> Randomising $T$ guarantees Eq. (4) but not Eq. (5), so unmeasured pre-treatment variables can confound $M$ and $Y$. The sensitivity parameter $\rho=\text{Corr}(\varepsilon_{i2},\varepsilon_{i3})$ (zero under sequential ignorability) indexes the violation. Theorem 4 gives the ACME as a closed-form function of $\rho$; Corollary 1 shows the data cannot bound $\rho$ ($(-1,1)$) or the ACME ($(-\infty,\infty)$). The ACME changes sign exactly at $\rho=\tilde\rho$, the residual correlation from the reduced-form equations.

## Overview

The proof of Theorem 2 shows that under Eq. (4) alone, $\varepsilon_{i2}\perp T_i$ and $\varepsilon_{i3}\perp T_i$ but $\varepsilon_{i2}\not\perp\varepsilon_{i3}$ unless Eq. (5) also holds. The sensitivity parameter

$$\rho\equiv\text{Corr}(\varepsilon_{i2},\varepsilon_{i3}),\qquad -1<\rho<1\qquad(24)$$

is nonzero when omitted variables related to both the observed mediator and the potential outcomes remain after conditioning on $T_i$ and $X_i$. These variables must **causally precede** $T_i$; post-treatment confounders are not covered. (Roy, Hogan & Marcus 2008 used the same strategy of evaluating a quantity over an unidentifiable sensitivity parameter.)

## Main Content

> [!theorem] Theorem 4 (identification given $\rho$)
> In the LSEM (11)-(13) with Eq. (4) holding and $\rho$ given, with $\sigma_j^2=\text{Var}(\varepsilon_{ij})$ for $j=1,2$ (reduced-form errors from (11) and (12)) and $\tilde\rho=\text{Corr}(\varepsilon_{i1},\varepsilon_{i2})$:
> $$\bar\delta(0)=\bar\delta(1)=\frac{\beta_2\sigma_1}{\sigma_2}\left\{\tilde\rho-\rho\sqrt{\frac{1-\tilde\rho^2}{1-\rho^2}}\right\}.$$
^thm-acme-given-rho

*Proof (Appendix D).* Estimable: $(\alpha_1,\alpha_2,\beta_1,\beta_2)$ from equation-by-equation OLS of (11), (12), plus $\sigma_1^2,\sigma_2^2,\tilde\rho$ from the residuals. Write $\varepsilon_{i1}=\gamma\varepsilon_{i2}+\varepsilon_{i3}$ (from (14)). Then $\tilde\rho\sigma_1\sigma_2=\gamma\sigma_2^2+\rho\sigma_2\sigma_3$ and $\sigma_1^2=\gamma^2\sigma_2^2+\sigma_3^2+2\gamma\rho\sigma_2\sigma_3$. If $\rho=0$: $\gamma=\tilde\rho\sigma_1/\sigma_2$. Otherwise substitute $\sigma_3=(\tilde\rho\sigma_1-\gamma\sigma_2)/\rho$ to get the quadratic $\gamma^2-2\gamma\tilde\rho\sigma_1/\sigma_2+\sigma_1^2(\tilde\rho^2-\rho^2)/\{\sigma_2^2(1-\rho^2)\}=0$; the root with $\sigma_3\ge0$ is $\gamma=\frac{\sigma_1}{\sigma_2}\{\tilde\rho-\rho\sqrt{(1-\tilde\rho^2)/(1-\rho^2)}\}$. Multiply by $\beta_2$.

Remarks on Theorem 4:
1. Estimation: covariance matrix of $(\varepsilon_{i1},\varepsilon_{i2})$ from OLS residuals of (11)-(12). For standard errors the paper recommends iterative feasible GLS for seemingly unrelated regressions (Zellner 1962); this also handles interactions and covariates.
2. The ACME is **monotone** in $\rho$ (increasing or decreasing depending on $\text{sign}(\beta_2)$) and **symmetric** about $(\rho,\bar\delta)=(0,\beta_2\tilde\rho\sigma_1/\sigma_2)$.
3. $\bar\delta=0\iff\rho=\tilde\rho$. So if $\hat\delta=\hat\beta_2\hat\gamma<0$ the true ACME is negative for all $\rho<\tilde\rho$ (the opposite sign convention if positive).

> [!theorem] Corollary 1 (no information about $\rho$)
> Under the LSEM with Eq. (4) but not necessarily Eq. (5), the sharp bounds on $\rho$ and the ACME are $(-1,1)$ and $(-\infty,\infty)$.
^cor-no-information

(The first statement follows from the proof of Theorem 4; the second by taking limits of $\bar\delta$ as $\rho\to\pm1$.)

> [!theorem] Appendix C: Assumption 1 implies $\rho=0$
> Under Eqs. (4)-(5), $E(\varepsilon_{i2}(T_i)|T_i)=0$ and $E(\varepsilon_{i3}(T_i,M_i(T_i))|T_i,M_i)=0$. Then $0=E[\varepsilon_{i3}M_i]=E[\varepsilon_{i3}(\alpha_2+\beta_2T_i+\varepsilon_{i2})]=E[\varepsilon_{i3}\varepsilon_{i2}]$, so $\rho=0$; equivalently $\rho\neq0$ implies a violation of Assumption 1.
^thm-rho-zero

### Interpretation through omitted-variable $R^2$ (Sec. 5.2)
Decompose $\varepsilon_{ij}=\lambda_jU_i+\varepsilon'_{ij}$, $j=2,3$, with $U_i$ an unobserved **pre-treatment** confounder, sequential ignorability holding given $(U_i,T_i)$, and $\varepsilon'_{ij}\perp U_i$. Define the proportions of previously *unexplained* variance explained by $U$:
$$R^{2*}_M=1-\frac{\text{Var}(\varepsilon'_{i2})}{\text{Var}(\varepsilon_{i2})},\qquad R^{2*}_Y=1-\frac{\text{Var}(\varepsilon'_{i3})}{\text{Var}(\varepsilon_{i3})},$$
and of the *original* variance: $\tilde R^2_M=(1-R^2_M)R^{2*}_M$, $\tilde R^2_Y=(1-R^2_Y)R^{2*}_Y$, where $R^2_M,R^2_Y$ are the $R^2$ of regressions (12), (13). (The tilde versions are bounded above by $\text{Var}(\varepsilon_{i2})/\text{Var}(M_i)$ and $\text{Var}(\varepsilon_{i3})/\text{Var}(Y_i)$.) Then
$$\rho^2=R^{2*}_MR^{2*}_Y=\frac{\tilde R^2_M\tilde R^2_Y}{(1-R^2_M)(1-R^2_Y)},\qquad \rho=\text{sgn}(\lambda_2\lambda_3)R^*_MR^*_Y.$$
So the analyst specifies the two $R^2$ values and the sign of $\lambda_2\lambda_3$. This is the mediation counterpart of the partial-$R^2$ parameterisation in [[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]] (cf. Imbens 2003).

### Extensions (Sec. 5.3, Appendix E)
- Probit models for discrete mediator/outcome: Imai, Keele & Tingley (2009).
- **Nonparametric, binary $M$ and $Y$.** Sharp bounds without Eq. 5 (Eq. 29), written in terms of $P_{ymt}=\Pr(Y=y,M=m|T=t)$; for $\bar\delta(1)$ the lower bound is $\max\{-P_{001}-P_{011},\,-P_{000}-P_{001}-P_{100},\,-P_{011}-P_{010}-P_{110}\}$ and the upper bound $\min\{P_{101}+P_{111},\,P_{000}+P_{100}+P_{101},\,P_{010}+P_{110}+P_{111}\}$. These **always contain zero**, so the sign of the ACME is unidentified without more assumptions. The sensitivity parameter $\upsilon$ is the maximum absolute difference in the proportion of any principal stratum between those with different mediator values under the same treatment (Eq. 31); for fixed $\upsilon$ the sharp bounds solve a linear programme over the stratum probabilities $\pi^{m_1m_0}_{y_{11}y_{10}y_{01}y_{00}}$ with constraints (32)-(35) and sum to one (constraint (35) ties the stratum probabilities to the observed $P_{ymt}$ via ignorability of treatment; $\upsilon\in[0,1]$ and $\upsilon=0$ iff sequential ignorability holds).
  - **Fig. 3 (media framing, mediator and treatment dichotomised at sample medians).** The sharp upper and lower bounds on $\bar\delta(1)$ and $\bar\delta(0)$ widen with $\upsilon$ until they flatten at the no-assumption bounds (Eqs. 29-30). The upper bounds cross zero at very small $\upsilon$ ($0.019$ for $\bar\delta(1)$, $0.022$ for $\bar\delta(0)$), so the nonparametric analysis finds the ACME rather *sensitive* to violations of sequential ignorability, in contrast to the apparent robustness of the parametric LSEM analysis; the paper cautions that the two are not directly comparable because the parameters differ.

## Examples

> [!example] Checking Theorem 4 by simulation
> $T\sim\text{Bernoulli}(0.5)$, $U\sim N(0,1)$, $M=0.5+0.8T+0.7U+0.7e_1$, $Y=1+0.4T+0.6M+0.9U+e_2$, $n=4\times10^5$. True ACME $=0.8\times0.6=0.48$. The Baron-Kenny estimate ignoring $U$ is $0.993$ ($\rho=0$ assumed). The residual correlation $\tilde\rho=0.720$. The structural $\rho=\frac{0.7\cdot0.9}{\sqrt{0.98}\sqrt{1.81}}=0.473$. Theorem 4 at $\rho=0.473$ gives $0.479\approx0.48$. Values along the curve: $\rho=-0.5\to1.546$; $0\to0.993$; $0.3\to0.692$; $0.6\to0.275$; $0.72\to0$.
^ex-theorem4-check

```python
import numpy as np
def acme_given_rho(beta2, s1, s2, rho_tilde, rho):
    return beta2*s1/s2*(rho_tilde - rho*np.sqrt((1-rho_tilde**2)/(1-rho**2)))
rho_grid = np.linspace(-0.95, 0.95, 77)
# usage: curve = acme_given_rho(b2_hat, s1_hat, s2_hat, rt_hat, rho_grid); zero crossing at rho = rho_tilde
```

## Connections

- Reading the curve: how correlated must unmeasured mediator-outcome causes be to flip the sign of the indirect effect? In the marketing halo example (E35) the "search as control" vs "search left out" contrast is a coarser version of the same question; see [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]].
- OVB analogue for the outcome regression: [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]].

## See Also

[[Imai 2010 - Causal Mediation Analysis - Overview]], [[Sensitivity Analysis in Observational Studies]]
