---
title: "Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 3.3 (pp. 19-22); Intro literature review (pp. 3-4)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Identification Using Replication Studies]]"
  - "[[Andrews Kasy 2019 - Identification Using Meta-Studies]]"
used_by:
  - "[[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]"
aliases:
  - "Meta-regressions under publication bias"
  - "Replication probability without selection"
---
# Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions

> [!summary]
> Three existing approaches are re-read inside the selection model: (i) the probability that a result "replicates" can be low with no selection at all; (ii) Egger/Card-Krueger meta-regressions are valid tests of no selection but their coefficients are biased as estimates of the mean effect under selection; (iii) bunching or discontinuities in the p-value or z-statistic distribution indicate selection or inflation.

## Overview

Section 3.3 plus the literature discussion of the Introduction. It is the paper's link to the funnel-plot tradition covered in [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]].

## Main Content

### Should results "replicate"?

Replication studies (OSC 2015; Camerer et al. 2016) are sometimes read as failing to "replicate the results" when original and replication are not both significant in the same direction. Under a constant publication probability (no selection) and $\sigma^*\equiv1$:

> [!theorem] Replication probability without selection
> $$
> P\big(Z^{*r}\,\text{sign}(Z^*)>1.96\;\big|\;|Z^*|>1.96\big)=\frac{\int\big[\Phi(-1.96-\theta)^2+\Phi(-1.96+\theta)^2\big]d\mu(\theta)}{\int\big[\Phi(-1.96-\theta)+\Phi(-1.96+\theta)\big]d\mu(\theta)}.
> $$
> If the true effect is zero in all studies this equals $0.025$; if $|\Theta^*|>M$ with probability one for large $M$ it is approximately $1$. *Proof sketch:* conditional on $\Theta=\theta$, $Z^*$ and $Z^{*r}$ are independent $N(\theta,1)$; sum the two same-sign significant events.

^thm-replication-probability

Recomputed for a constant true effect $\theta$:

| $\theta$ | 0 | 0.5 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|---|
| P(replicates in this sense) | 0.025 | 0.066 | 0.167 | 0.516 | 0.851 | 0.979 |

*Interpretation:* the share that replicate says little about selection unless the effect distribution is restricted, or replication rates fall *below* 0.025. (Table: my numerical evaluation of the printed formula.)

### Meta-regressions

> [!definition] Meta-regressions for publication bias
> The popular tests (Card and Krueger 1995; Egger et al. 1997) use best linear predictors
> $$
> E^*[X\mid1,\sigma]=\beta_0+\beta_1\sigma,\qquad E^*\!\big[Z\mid1,\tfrac1\sigma\big]=\beta_0+\beta_1\tfrac1\sigma,
> $$
> where $E^*$ denotes the best linear predictor.

^def-meta-regression

> [!theorem] Lemma 4
> Under Definition 3, if $p(\cdot)$ is constant (no selection), then
> $$
> E^*[X|1,\sigma]=E[\Theta^*]\quad(\text{intercept }E[\Theta^*],\text{ slope }0),\qquad E^*\!\big[Z|1,\tfrac1\sigma\big]=E[\Theta^*]\cdot\tfrac1\sigma\quad(\text{intercept }0,\text{ slope }E[\Theta^*]).
> $$
> *Proof sketch:* without selection $E[X|\sigma]=E[\Theta^*]$ by independence of $\Theta^*$ and $\sigma$, so $E[Z|\sigma]=E[\Theta^*]/\sigma$.

^thm-lemma4

So tests that the slope on $\sigma$ in the first regression (or the intercept in the Egger-form second regression) is zero are valid tests of the null of no publication bias, though "there are some forms of selectivity against which such tests have no power". Absent selection the other coefficient recovers $E[\Theta^*]$.

> [!theorem] Caveat: coefficients are not selection-corrected estimates
> Meta-regression coefficients are sometimes interpreted as selection-corrected mean effects (Doucouliagos and Stanley 2009; Christensen and Miguel 2016). Under selection $E[X|1,\sigma]$ is **non-linear** in both $\sigma$ and $1/\sigma$, so the linear coefficients are generally biased for $E[\Theta^*]$. (Stanley 2008 and Doucouliagos and Stanley 2009 note the bias but suggest $H_0:\beta_1=0$ still tests a zero true effect without heterogeneity.) With sign-normalised estimates the coefficients are not interpretable at all (supplement C.2). A one-sided-testing example is in supplement B.

^thm-metareg-caveat

### Distribution of p-values and z-statistics

Absent selectivity $f_Z=f_{Z^*}=\pi*\varphi$, i.e. $f_Z(z)=\int\varphi(z-\theta)\,d\mu(\theta)$, which must be infinitely differentiable and has bounded derivatives: $|\partial_z^kf_{Z^*}|\le\sup|\partial_z^k\varphi|$, in particular $f_{Z^*}\le\varphi(0)$ and $|f''_{Z^*}|\le\varphi(0)$, which rules out excessive bunching. With selection
$$
f_Z(z)=\frac{p(z)}{E[p(Z^*)]}f_{Z^*}(z),\qquad\frac{\lim_{z\downarrow z_0}p(z)}{\lim_{z\uparrow z_0}p(z)}=\frac{\lim_{z\downarrow z_0}f_Z(z)}{\lim_{z\uparrow z_0}f_Z(z)},
$$
so a discontinuity of $f_Z$ at a critical value (e.g. $1.96$) identifies the discontinuity of $p$; imposing a step function for $p$ identifies it up to scale. Spikes in $f_Z$ also indicate selection or inflation. Brodeur et al. (2016) instead target inflation by researchers, i.e. non-monotonicities of $f_Z$ not explainable by monotone $p$, via parametric $f_{Z^*}$.

### Other literature referenced

Trim and fill (Duval and Tweedie 2000); parametric selection models (Iyengar and Greenhouse 1988; Hedges 1992); Stanley and Doucouliagos (2014) power-weighting; Schuemie et al. (2014) empirical calibration of p-values; Bruns and Ioannidis (2016) p-curve in observational research; Carter et al. (2017) comparison of meta-analytic methods in psychology; McCrary et al. (2016) conservative tests; reviews: Rothstein et al. (2006), Christensen and Miguel (2016). Applications in economics/finance: Ioannidis, Stanley and Doucouliagos (2017); Chen and Zimmermann (2017); Havranek (2015); Hou, Xue and Zhang (2017); Furukawa (2017) models publication bias economically.

## Examples

**Worked Egger check from the paper's own data.** For the minimum-wage meta-study: regression of $X$ on $\sigma$ gives slope $0.408$ (SE 0.372); of $Z$ on $1/\sigma$ gives intercept $0.343$ (SE 0.283); neither rejects no selection ([[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]). For deworming: slope $0.296$ (SE 0.917), intercept $0.481$ (SE 0.889).

## Connections

- The funnel-plot interpretation and why the Egger intercept is not a corrected effect: [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]], [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]].
- Researcher-side inflation: [[Researcher Degrees of Freedom]].

### Relevance to marketing measurement

If your team monitors the "percentage of tests that replicate a significant lift", this note's formula shows the benchmark is $2.5\%$ under a null and is high under large true effects regardless of selection; the metric alone cannot diagnose selective reporting.

## See Also

- [[Andrews Kasy 2019 - Identification Using Meta-Studies]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
