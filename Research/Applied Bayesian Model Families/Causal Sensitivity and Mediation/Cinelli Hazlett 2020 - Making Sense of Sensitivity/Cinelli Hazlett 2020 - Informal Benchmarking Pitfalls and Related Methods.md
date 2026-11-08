---
title: "Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 6.1-6.4, pp. 20-26; Fig. 4; Supp. C, Fig. 5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]]"
aliases:
  - informal benchmarking
  - E-value comparison
  - Oster delta critique
  - benchmarking bias
---

# Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods

> [!summary]
> Informal benchmarking, meaning "plot the observed covariate's own partial $R^2$s as the confounder's strength", fails even when the analyst knows $Z$ is exactly like $X$ and $Z\perp X$: the observed $X$ statistics are themselves distorted by omitting $Z$ (collider bias through $D$) and by the $R^2$-vs-Cohen's-$f^2$ scale change. The paper also contrasts $RV$ with Frank's impact thresholds, the E-value, Hosman et al.'s $t$-value parameterisation, and Oster's $\delta$, and closes with warnings against mechanical use.

## Overview

Prior proposals (Frank 2000; Imbens 2003; Frank et al. 2008; Hosman et al. 2010; Blackwell 2013; Dorie et al. 2016; Carnegie et al. 2016; Middleton et al. 2016; Hong et al. 2018) calibrate the hypothetical confounder by plotting observed statistics of covariates in the same sensitivity plot. This note covers why that is wrong and how the other methods relate.

## Main Content

### Why informal benchmarks mislead (Sec. 6.2)
Compare coefficient on $X$ in the full vs restricted model: $\hat\beta_{res}-\hat\beta=\hat\gamma\hat\psi$, where $\hat\psi$ is the coefficient on $X$ in $Z=\hat\delta D+X\hat\psi+\hat\varepsilon_Z$. Even if $X\perp Z$, $\hat\psi\neq0$ because **$D$ is a collider**: conditioning on $D$ induces dependence between $Z$ and $X$. Hence any observed statistic that conditions on $D$ (partial correlations, partial $R^2$, $t$-values) of $X$ is contaminated by the omission of $Z$.

Two discrepancies between informal and proper benchmarks (in the partial-$R^2$ parameterisation):
1. **Baseline variance adjustment.** Informal uses $k_DR^2_{D\sim X_j|X_{-j}}$; correct uses $k_Df^2_{D\sim X_j|X_{-j}}$ with $f^2=R^2/(1-R^2)$. Affects both coordinates.
2. **Collider bias** in the outcome coordinate: informal uses $k_YR^2_{Y\sim X_j|X_{-j},D}$, correct uses $\eta^2f^2_{Y\sim X_j|X_{-j},D}$ with $\eta^2\ge k_Y$.

The error grows when $X_j$ is strongly associated with $D$ and as $k$ grows. If the benchmark does not condition on $D$ (Frank 2000) the collider issue disappears but the scale issue remains.

> [!example] Fig. 4 simulation: confounder identical to an observed covariate
> $Y=X+Z+\varepsilon_y$, $D=X+Z+\varepsilon_d$, $X=\varepsilon_x$, $Z=\varepsilon_z$, all iid standard normal; true effect of $D$ is **zero** and $Z$ is "exactly like $X$". Unadjusted estimate $\approx0.5$. Paper: informal benchmark yields 0.31 (concluding a $Z$ like $X$ is insufficient to zero the effect); proper bound yields 0 (correct). I reproduced this with $n=200{,}000$:
>
> | Quantity | Value |
> |---|---|
> | $\hat\tau_{res}$ | 0.498 |
> | informal benchmark ($R^2_{D\sim X}=0.334$, $R^2_{Y\sim X|D}=0.101$) | adjusted estimate 0.303 |
> | formal bound ($R^2_{D\sim Z|X}\le0.502$, $R^2_{Y\sim Z|D,X}\le0.339$) | adjusted estimate $-0.008$ |
> | truth (planted $Z$ in regression) | $-0.0003$; actual partial $R^2$s 0.498 and 0.334 |
^ex-fig4-informal

Supp. C repeats the point for `treatSens` (Carnegie et al. 2016) and `konfound` (Frank): in the same simulation the Frank impact threshold is 0.469 vs the observed covariate impact $R_{Y\sim X}R_{D\sim X}=0.314$, wrongly implying robustness. The `treatSens` package was removed from CRAN on 14 October 2019 for lack of maintenance.

### Related measures (Sec. 6.1)
**Frank (2000) impact thresholds.** Impact $=R_{Y\sim Z|X}R_{D\sim Z|X}$. But bias is determined by $BF=R_{Y\sim Z|D,X}f_{D\sim Z|X}$, not by the product. Rewriting (Eq. 25):
$$\text{relative bias}=\frac{\left|R_{Y\sim Z|X}R_{D\sim Z|X}-R_{Y\sim D|X}R^2_{D\sim Z|X}\right|}{\left|R_{Y\sim D|X}(1-R^2_{D\sim Z|X})\right|}.$$
So (i) zero impact can still bias; (ii) non-zero impact can give zero bias (when impact $=R_{Y\sim D|X}R^2_{D\sim Z|X}$); (iii) the two terms enter asymmetrically, so same-impact confounders differ in bias. The impact needed for relative bias $q$ is $R_{Y\sim D|X}(q-(q-1)R^2_{D\sim Z|X})$, which depends on $R^2_{D\sim Z|X}$ unless $q=1$.

**E-value (VanderWeele & Ding 2017).** Parameterises confounder strength with risk ratios; for risk ratio $RR>1$, $E=RR+\sqrt{RR(RR-1)}$. For other effect measures it is approximate; for OLS the $RV$ is exact. Partial $R^2$ (variance explained) vs risk-ratio scale is a context-dependent choice.

**Hosman, Hansen & Holland (2010).** Also OVB-based, but (a) relies on informal benchmarking and (b) asks the analyst to calibrate intuition with the confounder's $t$-value, which mixes strength with sample size. Footnote: a $t$ of 200 with $df=100$ means partial $R^2=0.9975$; with $df=10^7$ it means $<0.5\%$.

**Oster (2017).** Gives a formal identification result with $R_{max}$ (maximum $R^2$ of the full outcome regression, one-to-one with $R^2_{Y\sim Z|X,D}$ by Eq. 26: $R^2_{Y\sim Z|X,D}=(R_{max}-R^2_{Y\sim D+X})/(1-R^2_{Y\sim D+X})$) and $\delta_{Oster}=\dfrac{\text{cov}(W_2,D)/\text{var}(W_2)}{\text{cov}(W_1,D)/\text{var}(W_1)}$, with indices $W_1=X\hat\beta$, $W_2=Z\hat\gamma$. For one covariate, $\delta_{Oster}=\hat\lambda\hat\beta/(\hat\gamma\hat\theta)$ where $D=\hat\theta X+\hat\lambda Z+\hat\varepsilon_D$. It depends on the outcome coefficients, so "$\delta=1$ means equal importance for treatment" is false: with standardised variables, $\hat\beta=\hat\theta=p$, $\hat\gamma=\hat\lambda=p/2$, $\hat\tau=0$ gives $\delta_{Oster}=1$ though $Z$ has one half (coefficient) or one quarter (variance) of $X$'s explanatory power. The paper's $k_D$ captures that notion directly.

### Sensitivity analysis as principled argument (Sec. 6.4)
- Sensitivity analyses "tell us what we would have to be prepared to believe in order to accept the substantive claims" (Rosenbaum).
- The paper refuses universal thresholds: a 15% RV is not automatically "good" in a poorly controlled regression where the analyst cannot rule out strong unobservables.
- Do not use covariates as bounds unless they are plausibly among the strongest predictors; "a particular moral hazard is that weak covariates can make the apparent bounds look better".
- Raises the bar for both skeptic and proponent. Warns against using sensitivity analysis to gatekeep publication.
- Other obstacles to adoption (6.1): complex assumptions on confounder distribution; no simple reporting measure; difficulty linking to domain knowledge. In political science only 4 of 64 observational papers in 2017's three top journals used formal sensitivity analysis (footnote 2).

## Examples

```python
# Reproduce Fig. 4: informal vs formal benchmark for a Z exactly like X
import numpy as np
rng = np.random.default_rng(3); n = 200_000
X, Z = rng.normal(size=n), rng.normal(size=n)
D = X + Z + rng.normal(size=n); Y = X + Z + rng.normal(size=n)
def fit(y, *c):
    A = np.column_stack([np.ones(n)] + list(c)); b = np.linalg.lstsq(A, y, rcond=None)[0]; return b, y - A @ b
b, r = fit(Y, D, X); tau, df = b[1], n - 3
se = r.std(ddof=3) / (fit(D, X)[1].std() * np.sqrt(df))
def pr2(y, x, *ctrl):
    ry = fit(y, *ctrl)[1] if ctrl else y - y.mean(); rx = fit(x, *ctrl)[1] if ctrl else x - x.mean()
    return np.corrcoef(ry, rx)[0, 1]**2
r2dx, r2yxd = pr2(D, X), pr2(Y, X, D)
adj = lambda ry, rd: tau - np.sqrt(ry*rd/(1-rd))*np.sqrt(df)*se
print("informal:", adj(r2yxd, r2dx))
r2dz = r2dx/(1-r2dx); r2zx = r2dx**2/((1-r2dx)*(1-r2dx))
eta2 = (1+np.sqrt(r2zx))**2/(1-r2zx)
print("formal  :", adj(eta2*r2yxd/(1-r2yxd), r2dz))
```

## Connections

- Pitfall relevant to marketing: benchmarking an unobserved "brand intent" or "ad-targeting score" against an observed feature like past purchases; see [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]].
- The Bayesian way to avoid mis-calibrated benchmarks: priors on sensitivity parameters calibrated to estimable quantities, [[Franks 2019 - Calibrating Sensitivity Parameters]].

## See Also

[[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]], [[Sensitivity Analysis in Observational Studies]], [[Instrumental Variables]]
