---
title: "Imai 2010 - LSEM Baron-Kenny Interaction and Estimation"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Sec. 3.4, 4.1-4.2, pp. 8-10; Eqs. 11-20, Theorems 2-3; Appendix B, p. 18"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]]"
used_by:
  - "[[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]"
  - "[[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]]"
aliases:
  - Baron and Kenny causal interpretation
  - product of coefficients ACME
  - Theorem 2 LSEM mediation
---

# Imai 2010 - LSEM Baron-Kenny Interaction and Estimation

> [!summary]
> Under sequential ignorability, Baron & Kenny's product-of-coefficients $\hat\beta_2\hat\gamma$ is a valid ACME estimator, but implicitly assumes $\bar\delta(1)=\bar\delta(0)$ (Assumption 2). Adding a $T\times M$ interaction identifies $\bar\delta(t)=\beta_2(\gamma+t\kappa)$. The paper also gives plug-in nonparametric estimators (Eq. 18-20) with asymptotic variance (Theorem 3), and clarifies that testing $\beta_1=0$ is unnecessary.

## Overview

Baron & Kenny (1986) model, with optional pre-treatment covariates added to each equation:

$$
Y_i=\alpha_1+\beta_1T_i+\varepsilon_{i1}\quad(11),\qquad M_i=\alpha_2+\beta_2T_i+\varepsilon_{i2}\quad(12),\qquad Y_i=\alpha_3+\beta_3T_i+\gamma M_i+\varepsilon_{i3}\quad(13).
$$

Substituting (12) into (13): $Y_i=(\alpha_3+\alpha_2\gamma)+(\beta_3+\beta_2\gamma)T_i+(\gamma\varepsilon_{i2}+\varepsilon_{i3})$ (14). So (11) is redundant, with $\alpha_1=\alpha_3+\alpha_2\gamma$ and $\beta_1=\beta_3+\beta_2\gamma$. Testing $\beta_1=0$ is unnecessary: the ACME can be nonzero while the total effect is zero (indirect offsets direct).

## Main Content

> [!theorem] Theorem 2 (identification under the LSEM)
> In the LSEM (11)-(13) under Assumption 1, the ACME is identified and $\bar\delta(0)=\bar\delta(1)=\beta_2\gamma$ (equality of the two is also assumed). The average natural direct effects are $\bar\zeta(0)=\bar\zeta(1)=\beta_3$ and the total effect $\bar\tau=\beta_3+\beta_2\gamma$.
^thm-lsem-identification

*Proof (Appendix B).* Write potential outcomes $M_i(T_i)=\alpha_2+\beta_2T_i+\varepsilon_{i2}(T_i)$ and $Y_i(T_i,M_i(T_i))=\alpha_3+\beta_3T_i+\gamma M_i(T_i)+\varepsilon_{i3}(T_i,M_i(T_i))$ with $E\varepsilon_{i2}(t)=E\varepsilon_{i3}(t,m)=0$. Eq. (4) gives $\varepsilon_{i2}(t)\perp T_i$ so $E(\varepsilon_{i2}|T_i)=0$; Eq. (5) gives $\varepsilon_{i3}(t,m)\perp M_i|T_i=t$ so $E(\varepsilon_{i3}|T_i,M_i)=0$. Hence OLS on (12) and (13) is unbiased; applying Theorem 1 with $E(M|T)=\alpha_2+\beta_2T$ and $E(Y|M,T)=\alpha_3+\beta_3T+\gamma M$ yields $\beta_2\gamma$.

> [!definition] Assumption 2 (no interaction between treatment and the ACME)
> $\bar\delta(1)=\bar\delta(0)$. Equivalent to $\bar\zeta(1)=\bar\zeta(0)$. It is implied by Robins' no-interaction assumption (9) but is stated on the ACME, not on controlled direct effects, and is not required by Theorem 1.
^asm-no-interaction

**With interaction.** Extend (13) to $Y_i=\alpha_3+\beta_3T_i+\gamma M_i+\kappa T_iM_i+\varepsilon_{i3}$ (15). Under Assumption 1:
$$
\bar\delta(t)=\beta_2(\gamma+t\kappa),\quad\bar\zeta(t)=\beta_3+\kappa(\alpha_2+\beta_2t),\quad\bar\tau=\beta_2\gamma+\beta_3+\kappa(\alpha_2+\beta_2).
$$
Kraemer et al.'s proposal (establish mediation by testing $\gamma=0$ or $\kappa=0$) is "neither necessary nor sufficient" for $\bar\delta(t)=0$.

### Estimation
**Parametric.** Fit (12) and (13) separately; $\hat\delta(t)=\hat\beta_2\hat\gamma$. Standard errors: Delta/Sobel $\text{Var}(\hat\delta)\approx\beta_2^2\text{Var}(\hat\gamma)+\gamma^2\text{Var}(\hat\beta_2)$; Goodman (1960) exact adds $\text{Var}(\hat\gamma)\text{Var}(\hat\beta_2)$. With interaction: $\text{Var}(\hat\delta(t))\approx(\gamma+t\kappa)^2\text{Var}(\hat\beta_2)+\beta_2^2\{\text{Var}(\hat\gamma)+t\,\text{Var}(\hat\kappa)+2t\,\text{Cov}(\hat\gamma,\hat\kappa)\}$ (the printed formula uses $t$ for $t^2$, equal since $t\in\{0,1\}$).

**Nonparametric, discrete $M$ (Eq. 18).** With $J$ mediator values, $n_t=\sum_i1\{T_i=t\}$:
$$
\hat\delta(t)=\sum_{m=0}^{J-1}\left\{\frac{\sum_iY_i1\{T_i=t,M_i=m\}}{\sum_i1\{T_i=t,M_i=m\}}\right\}\left\{\frac1{n_1}\sum_i1\{T_i=1,M_i=m\}-\frac1{n_0}\sum_i1\{T_i=0,M_i=m\}\right\}.
$$

> [!theorem] Theorem 3 (asymptotic variance, given realised $T$)
> Under Assumption 1, with $\nu_{tm}=\Pr(M=m|T=t)$ and $\mu_{tm}=E(Y|M=m,T=t)$, the variance of the estimator in Eq. 18 is asymptotically approximated (Delta method) by a sum of three kinds of terms: (i) the conditional outcome variance $\text{Var}(Y|M=m,T=t)$ scaled by $\nu_{1-t,m}/(n_t\,\nu_{tm})$-type factors; (ii) the sampling variability of the estimated mediator probabilities in both arms, which carries the factors $\nu_{1-t,m}(1-\nu_{1-t,m})\mu_{tm}^2$ and the cross terms $-2\sum_{m<m'}\nu_{1-t,m}\nu_{1-t,m'}\mu_{tm}\mu_{tm'}$, divided by $n_{1-t}$; and (iii) a $\text{Var}(Y|T=t)/n_t$ term. Population quantities are replaced by sample analogues and strata are aggregated by sample size.
^thm-asymptotic-variance

> [!warning] Transcription note
> The text extraction scrambles the multi-line displayed variance in Theorem 3, so only its structure (not every coefficient, nor the exact placement of $n_t$ and $n_{1-t}$) is described above. Use the bootstrap for production inference, which the paper also recommends for Eq. 19.

**Covariate-adjusted (Eq. 19).** With nonparametric fits $\hat\mu_{tm}(x)$, $\hat\nu_{tm}(x)$:
$\hat\delta(t)=\frac1n\sum_i\sum_m\hat\mu_{tm}(X_i)\{\hat\nu_{1m}(X_i)-\hat\nu_{0m}(X_i)\}$; no simple variance, use bootstrap.

**Continuous $M$ (Eq. 20).** Draw $K$ mediator values $\tilde m^{(k)}_{ti}$ from the fitted conditional $\hat\psi_t(X_i)=p(M_i|T_i=t,X_i)$ and average $\hat\mu_{t\tilde m^{(k)}_{1i}}(X_i)-\hat\mu_{t\tilde m^{(k)}_{0i}}(X_i)$ over $i$ and $k$. This is the "counterfactual propagation" idea later used with posterior draws in Bayesian mediation; see [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]].

## Examples

> [!example] ACME with and without interaction
> Take $\alpha_2=-0.5,\beta_2=1,\alpha_3=0.5,\beta_3=-0.5,\gamma=0.5,\kappa=1.5$ in the paper's Monte Carlo. With the interaction the ACME differs by treatment arm ($0.675$ vs $4.03$ on the lognormal outcome scale) so Assumption 2 is clearly violated; in the media framing data the test of $\bar\delta(0)=\bar\delta(1)$ has $p=0.238$ so no-interaction is tenable.

```python
import numpy as np, statsmodels.api as sm
def lsem_acme(T, M, Y, interact=False):
    X2 = sm.add_constant(T); m2 = sm.OLS(M, X2).fit()
    cols = [T, M] + ([T*M] if interact else [])
    m3 = sm.OLS(Y, sm.add_constant(np.column_stack(cols))).fit()
    b2 = m2.params[1]; g = m3.params[2]; k = m3.params[3] if interact else 0.0
    return {t: b2*(g + t*k) for t in (0, 1)}, m2, m3
```

## Connections

- The ACME as a product of two effects is the continuous-$M$ analogue of Eq. 17 in [[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]].
- Sensitivity of $\beta_2\gamma$ to correlated errors: [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]].

## See Also

[[Imai 2010 - Causal Mediation Analysis - Overview]], [[Hierarchical Models]]
