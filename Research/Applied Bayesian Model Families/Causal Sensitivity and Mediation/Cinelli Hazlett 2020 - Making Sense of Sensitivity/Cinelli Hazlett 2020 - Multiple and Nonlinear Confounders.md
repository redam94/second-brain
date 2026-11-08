---
title: "Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 4.5, p. 15; Eqs. 23-24; footnote 15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Darfur Application and Reporting]]"
aliases:
  - sensitivity to multiple confounders
  - linear combination confounder Z*
---

# Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders

> [!summary]
> A *set* of omitted confounders $Z$ (possibly non-linear, interacted, or standing in for functional-form misspecification of $X$) induces the same bias as the single composite $Z^*=Z\hat\gamma$. Since $Z^*$ has the same outcome partial $R^2$ as $Z$ but a no-larger treatment partial $R^2$, the single-confounder formulas are **conservative upper bounds** for the multivariate case.

## Overview

Allow $Z$ to be an $n\times k$ matrix with coefficient vector $\hat\gamma$ in the full model

$$Y=\hat\tau D+X\hat\beta+Z\hat\gamma+\hat\varepsilon_{full}.\qquad(23)$$

## Main Content

> [!theorem] Multiple confounders reduce to one composite (Eqs. 23-24)
> Let $Z^*:=Z\hat\gamma$. Regressing on $(D,X,Z^*)$ gives the same $\hat\tau$ as regressing on $(D,X,Z)$, and $R^2_{Y\sim Z^*|D,X}=R^2_{Y\sim Z|D,X}$. But $R^2_{D\sim Z^*|X}\le R^2_{D\sim Z|X}$. Therefore the bias from omitting $Z$ is at most the value of the single-confounder formula evaluated at $(R^2_{Y\sim Z|D,X},R^2_{D\sim Z|X})$.
^thm-multiple-confounders

*Proof sketch.* $\hat\gamma$ is chosen to maximise the fit with the outcome, not with the treatment. The composite $Z^*$ is a linear combination of the columns of $Z$, so the treatment can be explained at most as well by $Z^*$ as by $Z$ (a regression on more regressors can only increase $R^2$). Hence $R^2_{D\sim Z^*|X}\le R^2_{D\sim Z|X}$, and since bias is increasing in $R^2_{D\sim Z|X}$ (Eq. 13), the bound follows. (An alternative proof is in Hosman et al. 2010, Sec. 4.1.)

**Degrees of freedom.** For multivariate $Z$ use $df-k$ in the SE formula (Eq. 12) instead of $df-1$; but the exercise is hypothetical ("one can always imagine to have measured $Z^*$"), so the correction is a formality.

### Non-linear confounders and functional-form misspecification
The columns of $Z$ are arbitrary, so the result covers non-linearity. Let the correct model be $Y=\hat\tau D+\hat\beta X+\hat\gamma_1Z+\hat\gamma_2Z^2+\hat\gamma_3(Z\times X)+\hat\gamma_4X^2+\hat\varepsilon$. If the analyst did not measure $Z$ nor think $X$ enters quadratically, set $Z=(Z_1=Z,\,Z_2=Z^2,\,Z_3=Z\times X,\,Z_4=X^2)$ and all previous arguments follow. Thus the same plot can be read as a sensitivity bound to *all* omitted variables acting together, including misspecification of the observed covariates' functional form.

### What "conservative" means
Sensitivity statements are **exact** for a single linear confounder and **conservative** for multiple or non-linear ones: any confounder collection with the same pair of partial $R^2$ values (outcome side, treatment side of the *collection*) produces at most that much bias.

## Examples

> [!example] Wealth and Political Attitudes together
> In Darfur, a skeptic worries Wealth and Political Attitudes (possibly interacted) confound the harm-peace relation. Treat $Z=(\text{Wealth},\text{PolAtt},\text{Wealth}\times\text{PolAtt})$. The analyst never needs to specify their joint distribution: she asks whether *the group* could explain, say, $12\%$ of residual outcome variance and $1\%$ of residual treatment variance (the `Female` bound), and reads the answer off the contour plot.

```python
# Composite-confounder check: Z* = Z @ gamma has the same outcome partial R2 but no larger treatment partial R2
import numpy as np
rng = np.random.default_rng(0); n = 20000
X = rng.normal(size=(n, 2)); Z = rng.normal(size=(n, 3))
D = X @ [.5, .2] + Z @ [.4, -.3, .2] + rng.normal(size=n)
Y = 0.2*D + X @ [.3, .1] + Z @ [.5, .5, -.4] + rng.normal(size=n)
def resid(v, M): A = np.column_stack([np.ones(n), M]); return v - A @ np.linalg.lstsq(A, v, rcond=None)[0]
gamma = np.linalg.lstsq(np.column_stack([np.ones(n), D, X, Z]), Y, rcond=None)[0][-3:]
zs = Z @ gamma
r2 = lambda a, b: np.corrcoef(a, b)[0,1]**2
Dx = resid(D, X)
print("R2_D~Z*|X  :", r2(Dx, resid(zs, X)))
Zres = np.column_stack([resid(Z[:,i], X) for i in range(3)])
print("R2_D~Z|X   :", 1 - resid(Dx, Zres).var()/Dx.var())   # >= the line above
```

## Connections

- Marketing: an MMM or lift regression omits many drivers at once (seasonality, promotions, competitor actions). The multivariate result lets one summarise them as a single worst-case pair of partial $R^2$ values; see [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]].
- Related: [[Missing Data Models]] (assumptions about unobserved parts cannot be tested).

## See Also

[[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]], [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
