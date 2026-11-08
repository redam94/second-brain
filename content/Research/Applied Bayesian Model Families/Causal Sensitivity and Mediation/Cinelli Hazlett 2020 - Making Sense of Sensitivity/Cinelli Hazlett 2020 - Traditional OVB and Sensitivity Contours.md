---
title: "Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/definition
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 1-3, pp. 1-8; Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Omitted Variables Bias]]"
  - "[[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]"
aliases:
  - impact times imbalance
  - OVB via Frisch-Waugh-Lovell
---

# Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours

> [!summary]
> The classical OVB identity says that omitting a confounder $Z$ biases the treatment coefficient by $\hat\gamma\hat\delta$: the confounder's "impact" on the outcome times its "imbalance" across treatment. Plotting the adjusted estimate $\hat\tau_{res}-\hat\gamma\hat\delta$ over a grid of $(\hat\delta,\hat\gamma)$ gives a bivariate sensitivity contour plot, but the raw-coefficient parameterisation is unit-dependent and does not extend to many confounders or standard errors, which motivates the partial-$R^2$ version.

## Overview

The paper starts from two regressions. The investigator would like the **full** model but cannot observe $Z$, so runs the **restricted** one:

$$
Y=\hat\tau D+X\hat\beta+\hat\gamma Z+\hat\varepsilon_{full}\qquad(3)
$$
$$
Y=\hat\tau_{res}D+X\hat\beta_{res}+\hat\varepsilon_{res}\qquad(4)
$$

Here $Y$ is the outcome, $D$ the treatment (binary or continuous), $X$ the $n\times p$ matrix of observed pre-treatment covariates (including the constant), $Z$ a single unobserved covariate. The target is $\hat\tau$ (from the full model) and the observed quantity is $\hat\tau_{res}$.

## Main Content

> [!definition] Omitted variable bias (sample version)
> Let $A^{\perp X}$ denote the residual of $A$ after linear projection on $X$ (Frisch-Waugh-Lovell). Define the sample bias $\widehat{\text{bias}}:=\hat\tau_{res}-\hat\tau$ and the **imbalance** $\hat\delta:=\dfrac{\text{cov}(D^{\perp X},Z^{\perp X})}{\text{var}(D^{\perp X})}$, the coefficient on $D$ in the reverse regression $Z=\hat\delta D+X\hat\psi+\hat\varepsilon_Z$. Then
> $$
> \hat\tau_{res}=\hat\tau+\hat\gamma\hat\delta,\qquad \widehat{\text{bias}}=\hat\gamma\hat\delta.\qquad(5)\text{-}(6)
> $$
^def-ovb-impact-imbalance

*Derivation (Eq. 5).* By FWL, $\hat\tau_{res}=\text{cov}(D^{\perp X},Y^{\perp X})/\text{var}(D^{\perp X})$. Substituting $Y^{\perp X}=\hat\tau D^{\perp X}+\hat\gamma Z^{\perp X}+\hat\varepsilon_{full}$, and using that $\hat\varepsilon_{full}$ is orthogonal to $D$ and $X$, gives $\hat\tau_{res}=\hat\tau+\hat\gamma\,\text{cov}(D^{\perp X},Z^{\perp X})/\text{var}(D^{\perp X})$.

### Interpretation: impact times imbalance
- $\hat\gamma$ ("impact"): difference in expected outcome per unit of $Z$ at the same $D,X$.
- $\hat\delta$ ("imbalance"): coefficient of the *reverse* regression of $Z$ on $D$ and $X$, not of $D$ on $Z$. It is the conditional imbalance of $Z$ across treatment, the same object checked in covariate-balance tests.
- Whatever the true functional form of $E[Z|D,X]$ (i.e. whatever the assignment mechanism), only its **linear imbalance** enters the bias. No model of treatment assignment is needed.
- Footnote 7: $\hat\gamma$ is associational. It is a causal "impact" only under additional structural assumptions; $Z$ is only required to close back-door paths.

### Sensitivity contour plot (Fig. 1)
Each hypothesised pair $(\hat\delta,\hat\gamma)$ maps to the adjusted estimate $\hat\tau=\hat\tau_{res}-\hat\gamma\hat\delta$. The paper parameterises so the bias *hurts* the preferred hypothesis (reduces $|\hat\tau|$); the opposite direction is handled symmetrically.

> [!example] Darfur: the `Center` confounder
> Suppose a critic argues that people at the village *center* were more often harmed and also have different peace attitudes. With unadjusted $\hat\tau_{res}=0.097$ and an imbalance $\hat\delta=0.25$ (injured respondents 25 percentage points more likely to live in the center), the effect is zero only if $\hat\gamma\ge 0.097/0.25\approx0.39$; the paper reads from Fig. 1 that the impact "would have to be over 0.40" on a 0 to 1 `PeaceIndex`. Given relatively homogeneous villages, the authors argue this is hard to believe.
^ex-center-contour

The move from "perfect identification vs a critic's list of confounders" to "how much confounding would matter" is the main value of the exercise.

### Shortcomings of raw-coefficient OVB (motivation for Sec. 4)
1. **Units.** `Center` is binary so impact and imbalance are easy to read. For a latent trait like Political Attitudes, doubling the scale halves the needed impact and doubles the needed imbalance. Standardising does not help if the target is in original units.
2. **Multiple confounders.** How do Political Attitudes and Wealth, acting jointly and non-linearly, enter the plot?
3. **Benchmarking.** How can all unnamed confounders be benchmarked against an observed covariate like `Female`?
4. **Inference.** The plot says nothing about standard errors, $t$-values or intervals.

## Examples

```python
# Adjusted estimate over an (imbalance, impact) grid: Darfur-style numbers
import numpy as np
tau_res = 0.097
delta = np.linspace(0, 0.4, 5)       # imbalance grid
gamma = np.linspace(0, 0.4, 5)       # impact grid
adj = tau_res - np.outer(gamma, delta)   # rows gamma, cols delta
print(np.round(adj, 3))
# zero contour: gamma * delta = 0.097
print("gamma needed at delta=0.25:", tau_res / 0.25)
```

## Connections

- Mechanically identical to the omitted-variable formula in [[Omitted Variables Bias]]; see also [[Logic of Regression Adjustment]].
- Bayesian version: put priors on $(\gamma,\delta)$ and push through (5); see [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]].
- Next: [[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]].

## See Also

[[Sensitivity Analysis in Observational Studies]], [[Potential Outcomes Framework]], [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
