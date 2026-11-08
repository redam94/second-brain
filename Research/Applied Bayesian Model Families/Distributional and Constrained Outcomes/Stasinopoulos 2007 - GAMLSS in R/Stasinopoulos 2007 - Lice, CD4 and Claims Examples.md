---
title: "Stasinopoulos 2007 - Lice, CD4 and Claims Examples"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/example
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Sec. 3.2-3.4, pp. 13-33"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]"
  - "[[Stasinopoulos 2007 - Distributions and Additive Terms]]"
used_by:
  - "[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]"
aliases:
  - GAMLSS lice data
  - GAMLSS CD4 data
  - GAMLSS third party claims
---

# Stasinopoulos 2007 - Lice, CD4 and Claims Examples

> [!summary]
> Three demonstrations: (1) four count distributions on head-lice data (Sichel wins; Poisson is off by ~25,000 AIC points); (2) CD4 count vs age, where jointly smoothing mean and variance beats polynomials; (3) negative-binomial insurance claims, where term selection finds smooth effects in $\mu$ and covariates in $\sigma$. The authors stress these are capability demonstrations, "not to answer substantive questions in the data."

## Overview

Section 3.1 states the aims. Section 3.5 (head circumference) is in [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]].

## Main Content

### 3.2 Lice data (Williams 1944)

Frequencies of 1,083 Hindu male prisoners (Cannamore, South India, 1937-39) by number of head lice $y$ (frequencies used as weights). Four intercept-only fits (`head ~ 1`):

| Model | df | AIC |
|---|---|---|
| Sichel (`SICHEL`, mixed(10,50)) | 3 | **4646.198** |
| Negative binomial I (`NBI`) | 2 | 4653.687 |
| Poisson inverse Gaussian (`PIG`) | 2 | 4756.275 |
| Poisson (`PO`) | 1 | 29174.823 |

Sichel fit: $\hat\mu=e^{1.927}=6.869$, $\hat\sigma=e^{4.863}=129.4$, $\hat\nu=0.00079$ (SE 0.0157, near zero); global deviance 4640.198, SBC 4661.16. The profile deviance for $\nu$ gives a 95% CI $(-0.0853, 0.0887)$ (Fig. 1). Interpretation: heavy overdispersion makes the Poisson hopeless; NBI is within 7.5 AIC of the best; $\nu\approx0$ shows the third (shape) parameter adds little beyond NBI-like behaviour but AIC still favours it modestly.

### 3.3 CD4 data (Wade and Ades 1994)

CD4 counts of uninfected children born to HIV-1 mothers vs age (about 600 observations: 8 df plus 601 residual df). Three problems: (a) shape of $E(\text{cd4}\mid\text{age})$; (b) variance decreasing with age; (c) non-normality. Transforming $y$ and $x$ (Fig. 4: $\text{cd4}^{-0.5}$, $\log(\text{cd4}+0.1)$, $\text{cd4}^{0.5}$ against $\text{age}^{-0.5}$, $\log\text{age}$, $\text{age}^{0.5}$, age) does not fix all issues at once. GAMLSS addresses them one at a time:

| Mean model (normal, constant $\sigma$) | Result |
|---|---|
| orthogonal polynomial, degree 7 | best AIC and SBC but "wobbly" end (Fig. 5) |
| fractional polynomials `fp(age, 3)` | best by AIC/SBC; all three powers $=-2$: $557.5-599.3+1116.8\,\text{age}^{-2}+17776.2\,\text{age}^{-2}\log\text{age}+698.6\,\text{age}^{-2}(\log\text{age})^2$; global dev. 8950.37, df 8; "unconvincing" |
| piecewise polynomial `bs()` | AIC prefers 7 df, SBC 5 |
| cubic smoothing spline `cs()` | AIC: 10.85 extra df (13 total) overfits; SBC: 1.854 extra df (4 total) misses small ages |

Jointly smoothing $\mu$ and $\log\sigma$ with `cs()` (m42 = AIC, m31 = SBC): extra df $(\mu,\log\sigma)=(3.72,1.81)$ under AIC and $(2.55,0.93)$ under SBC. "By picking a suitable model for $\sigma$ the model for $\mu$ is less complicated." Validation-deviance tuning (`VGD()`) gave $(4.78,1.38)$ — similar. The lesson: modelling the variance lets the mean be simpler.

### 3.4 Third-party insurance claims (de Jong and Heller 2007)

176 New South Wales local government areas, 1984-86: `Claims`, `Accidents`, `KI` (killed/injured), `Population`, `Pop_density`, statistical division `SD` (13 levels); analysis uses logs of the continuous variables (`L_Population`, `L_Accidents`, `L_KI`, `L_Popdensity`).

- Poisson vs NBI: deviance drop of **4606.169** for one extra df $\Rightarrow$ use NBI for all later steps.
- Global deviance 6487.73 (Poisson) vs ~1883.9-1881.56 (NBI) quoted in iterations.
- `dropterm()`: no $\mu$-term can be dropped; `addterm()` on two-way interactions: none needed (e.g. SD:L_Popdensity $\chi^2=14.10$, $p=0.294$; L_Popdensity:L_Accidents $p=0.574$).
- `stepGAIC.CH()` with `gamlss.scope()` finds smooth `cs()` terms for L_Popdensity, L_Accidents and L_Population but not L_KI.
- Next, linear terms for $\log\sigma$ (excluding `SD`): L_Population, L_KI, L_Accidents were selected under AIC; the authors judge the AIC model "over complicated" and suggest a higher GAIC penalty.

## Examples

> [!example] What GAMLSS buys: variance modelling on CD4
> Model `cd4 ~ cs(age, df=a), sigma.fo = ~cs(age, df=b)` with $(a,b)=(3.72,1.81)$. At small ages both fitted $\mu$ and $\sigma$ are larger, and the SBC fit has "a slightly lower mean and standard deviation" than AIC at early ages. Predictive intervals computed as $\hat\mu(x)\pm z\hat\sigma(x)$ then widen correctly at young ages — which a constant-$\sigma$ polynomial would not do.
^ex-cd4-gains

## Connections

- Model comparison criteria: [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]].
- Counts with overdispersion: [[Generalized Linear Models]]; for the Bayesian equivalent a negative binomial with $\alpha$ regressed on covariates.

## See Also

[[Stasinopoulos 2007 - GAMLSS in R - Overview]]
