---
title: "Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 4.4, pp. 13-15; Eqs. 21-22; Supp. B (B.1-B.2), Eqs. 49-84"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Darfur Application and Reporting]]"
  - "[[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]]"
  - "[[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]]"
aliases:
  - benchmarking with observed covariates
  - k times as strong as
  - formal bounds on confounder strength
---

# Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates

> [!summary]
> To judge plausibility, an analyst often argues a confounder is "no more than $k$ times as strong as" an important observed covariate $X_j$. The paper turns such claims into tight bounds on $R^2_{D\sim Z|X}$ and $R^2_{Y\sim Z|D,X}$, in three variants (total $R^2$; partial given $X_{-j}$; partial given $X_{-j}$ and $D$). The key correction over informal practice: the bound on the outcome association contains a collider-bias factor $\eta^2\ge k_Y$.

## Overview

Plausibility ("could such a confounder exist?") is the hardest step. Direct judgment about $R^2$ values of an unnamed $Z$ is hard; relative judgments against a known $X_j$ are easier. For the bound to be valid it must *identify* (bound) the bias, which requires deriving new functions of the chosen measure of relative strength (Cinelli et al. 2019), not just reading off observed statistics.

Assume $Z\perp X$, or equivalently work with the part of $Z$ not linearly explained by $X$.

## Main Content

> [!definition] Relative-strength parameters (Eq. 21; "type iii" bound used in the main text)
> For an observed covariate $X_j$ with remaining covariates $X_{-j}$:
> $$
> k_D:=\frac{R^2_{D\sim Z|X_{-j}}}{R^2_{D\sim X_j|X_{-j}}},\qquad k_Y:=\frac{R^2_{Y\sim Z|X_{-j},D}}{R^2_{Y\sim X_j|X_{-j},D}}.
> $$
> $k_D\le1$ is the claim that omitting $Z$ would hurt the treatment regression's fit no more than omitting $X_j$.
^def-kd-ky

> [!theorem] Bounds on the sensitivity parameters (Eq. 22)
> Write $R^2_{x}:=R^2_{D\sim X_j|X_{-j}}$ and $f^2_x:=R^2_x/(1-R^2_x)$. Then
> $$
> R^2_{D\sim Z|X}=k_D\,f^2_{D\sim X_j|X_{-j}}\quad(\text{feasible only if }k_Df^2_{D\sim X_j|X_{-j}}<1),
> $$
> $$
> R^2_{Y\sim Z|D,X}\le\eta^2\,f^2_{Y\sim X_j|X_{-j},D},\qquad \eta=\frac{\sqrt{k_Y}+\sqrt{r_{ZX}}}{\sqrt{1-r_{ZX}}},\qquad r_{ZX}:=R^2_{Z\sim X_j|X_{-j},D}=\frac{k_D\,R_x^4}{(1-k_DR_x^2)(1-R_x^2)}.
> $$
> The bounds are **tight**: some confounder attains equality. Because $\eta^2\ge k_Y$, ignoring the second term (informal benchmarking) understates the confounder's outcome association.
^thm-formal-bounds

> [!note] Verification
> The expressions for $R^2_{D\sim Z|X}$ and $r_{ZX}$ were checked by simulation (independent $X_j,Z$, $D=aX_j+bZ+\varepsilon$, $b^2=k_Da^2$, $n=2\times10^6$): empirical $R^2_{Z\sim X_j|D}=0.1291$ vs formula $0.1283$; $R^2_{D\sim Z|X_j}=0.2883$ vs $0.2874$. The closed form for $\eta$ follows the Supp. B.2 chain (Eqs. 74-83) and matches the form implemented in the `sensemakr` R package (`ovb_partial_r2_bound`); the PDF text extraction garbles the printed algebra, so the notation $r_{ZX}$ is this note's, not the paper's.

### Derivations (Supp. B)

**B.1 Total $R^2$ comparison.** If $R^2_{D\sim Z}=k_D R^2_{D\sim X_j}$ and $R^2_{Y\sim Z}=k_Y R^2_{Y\sim X_j}$ and $Z\perp X$, then $R^2_{D\sim Z+X}=R^2_{D\sim Z}+R^2_{D\sim X}$, so $R^2_{D\sim Z|X}=k_DR^2_{D\sim X_j}/(1-R^2_{D\sim X})$ (Eqs. 51-54). The outcome analogue plus the recursive partial-correlation formula (Eq. 55) give $R_{Y\sim Z|X,D}$. The sign is chosen so the confounder reduces $|\hat\tau|$: if $\hat\tau>0$, $R_{Y\sim Z|D,X}$ and $R_{D\sim Z|X}$ share a sign; the worst case is $R_{Y\sim Z|X,D}=\dfrac{|R_{Y\sim Z|X}|-|R_{Y\sim D|X}R_{D\sim Z|X}|}{\sqrt{1-R^2_{Y\sim D|X}}\sqrt{1-R^2_{D\sim Z|X}}}$ (Eq. 56).

**B.2 Partial $R^2$ comparison.** From $R^2_{D\sim Z|X_{-j}}=k_D R^2_{D\sim X_j|X_{-j}}$ and $R_{Z\sim X_j|X_{-j}}=0$ (since $Z\perp X$): $R_{D\sim Z|X}=\sqrt{k_D}\,f_{D\sim X_j|X_{-j}}$, i.e. $R^2_{D\sim Z|X}=k_Df^2_{D\sim X_j|X_{-j}}$ (Eq. 63), subject to the **feasibility** constraint $k_D\le(1-R^2_{D\sim X})/R^2_{D\sim X_j|X_{-j}}$ (Eq. 65). Example: if $X_j$ already explains 50% of residual treatment variance ($f^2=1$), no orthogonal $Z$ can be stronger. For the outcome, condition on $D$: $Z$ and $X_j$ become correlated given $D$ (collider), $R^2_{Z\sim X_j|X_{-j},D}=r_{ZX}$ above, and the recursive formula plus the triangle bound (Eqs. 79-83) yield $|R_{Y\sim Z|D,X}|\le\eta f_{Y\sim X_j|X_{-j},D}$ with equality attainable (Eq. 80 step).

**Extension to groups.** Replace $X_j$ by a set $X_{(1\ldots j)}$ via the iterated recursive partial correlation (Eqs. 66-69). Different covariate groups may bound $D$ and $Y$ separately (e.g. $X_1$ the main driver of selection, $X_2$ the main driver of outcome).

**Without conditioning on $D$ (Eqs. 70-72).** Define $k_Y$ with $R^2_{Y\sim X_j|X_{-j}}$ (no $D$), then use Eq. 72 to convert to $R_{Y\sim Z|D,X}$.

### When bounds can be trusted
Section 6.4 warns: "weak covariates can make the apparent bounds look better". The method is valid only if the analyst can argue the benchmark covariates are among the strongest predictors of $D$ or $Y$.

## Examples

> [!example] Darfur: `Female` as the benchmark
> Within a village, gender was likely the most important visible determinant of targeting (sexual violence), so the authors take $X_j=$`Female`. The bound for $k_D=k_Y=1$ is $R^2_{Y\sim Z|D,X}=12\%$, $R^2_{D\sim Z|X}=1\%$; $2\times$ gives $(24\%,2\%)$ and $3\times$ gives $(36\%,3\%)$ (points in Fig. 2). Estimates then fall to about 77%, 55% and 32% of the original.
^ex-bound-female

```python
import numpy as np
def ovb_bounds(r2dxj, r2yxj, kd=1.0, ky=1.0):
    """r2dxj = R2_{D~Xj|X-j}; r2yxj = R2_{Y~Xj|X-j,D}. Returns (R2_{D~Z|X}, R2_{Y~Z|D,X} bound)."""
    r2dz = kd*r2dxj/(1-r2dxj)
    assert r2dz < 1, "kd infeasible: data rule out a Z this strong"
    r2zx = kd*r2dxj**2/((1-kd*r2dxj)*(1-r2dxj))
    eta2 = ((np.sqrt(ky)+np.sqrt(r2zx))**2)/(1-r2zx)
    return r2dz, eta2*r2yxj/(1-r2yxj)
print(ovb_bounds(0.01, 0.10, 1, 1))   # illustrative inputs, not the Darfur Female values
```

## Connections

- Plugs into the contour plots of [[Cinelli Hazlett 2020 - Darfur Application and Reporting]].
- Why these bounds beat informal ones: [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]].
- Benchmarking idea in Bayesian settings (calibrating the sensitivity prior): [[Franks 2019 - Calibrating Sensitivity Parameters]].

## See Also

[[Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders]], [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
