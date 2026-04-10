---
title: Regression Discontinuity Designs
aliases:
  - RD
  - Sharp RD
  - Fuzzy RD
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/regression-discontinuity
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Identification Strategies"
doc_type: concept
source_location: "MHE Ch. 6, pp. 189-202"
depends_on:
  - "[[Instrumental Variables]]"
  - "[[Local Average Treatment Effects]]"
  - "[[Regression and the CEF]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Mostly Harmless Econometrics - Overview]]"
---

# Regression Discontinuity Designs

> [!summary]
> RD designs exploit precise knowledge of rules determining treatment. When treatment is assigned based on a threshold in a running variable, comparing outcomes just above and below the cutoff provides credible causal estimates. Sharp RD is a selection-on-observables story; fuzzy RD is an IV strategy.

## Sharp RD

Treatment is a **deterministic, discontinuous** function of a covariate:

$$D_i = \begin{cases} 1 & \text{if } x_i \geq x_0 \\ 0 & \text{if } x_i < x_0 \end{cases}$$

The regression model:
$$Y_i = f(x_i) + \rho D_i + \eta_i$$

where $f(x_i)$ is a smooth function (often modeled with polynomials).

### Parametric approach
$$Y_i = \alpha + \beta_1 x_i + \beta_2 x_i^2 + ... + \beta_p x_i^p + \rho D_i + \eta_i$$

### Nonparametric approach
Compare means in a small neighborhood $[x_0 - \delta, x_0 + \delta]$:
$$\lim_{\delta \to 0} E[Y_i | x_0 < x_i < x_0+\delta] - E[Y_i | x_0-\delta < x_i < x_0] = E[Y_{1i} - Y_{0i} | x_i = x_0]$$

### Key Example: Incumbency advantage (Lee, 2008)
- Running variable: vote share margin of victory
- Treatment: winning the current election
- Result: ~40 percentage point incumbency advantage in re-election probability

## Fuzzy RD

Treatment probability **jumps** at the threshold but doesn't go from 0 to 1:

$$P[D_i = 1 | x_i] = \begin{cases} g_0(x_i) & \text{if } x_i \geq x_0 \\ g_1(x_i) & \text{if } x_i < x_0 \end{cases}$$

Fuzzy RD = **IV with $T_i = 1(x_i \geq x_0)$ as the instrument** for $D_i$.

### Key Example: Class size in Israel (Angrist & Lavy, 1999)
- **Maimonides' Rule**: class size capped at 40; cohort of 41 splits into two classes
- Instrument: predicted class size from the rule ($m_{sc}$)
- Result: 7-student reduction raises math scores by ~1.75 points (0.18σ)

## Validity Checks

1. **Pre-treatment covariates** should show no jump at $x_0$
2. **Density of $x_i$** should be smooth at $x_0$ (no bunching/manipulation)
3. **Discontinuity sample** robustness: results should be stable as the window narrows

> [!warning] Nonlinearity vs. Discontinuity
> A sharp turn in $E[Y_{0i}|x_i]$ can be mistaken for a jump due to treatment. Use flexible functional forms and restrict to observations near the cutoff.

## See Also

- [[Instrumental Variables]] — fuzzy RD is IV
- [[Local Average Treatment Effects]] — fuzzy RD estimates LATE on compliers at the cutoff
- [[Mostly Harmless Econometrics - Overview]]
- [[Model Checking]] — posterior predictive checks for formalizing RD validity tests
