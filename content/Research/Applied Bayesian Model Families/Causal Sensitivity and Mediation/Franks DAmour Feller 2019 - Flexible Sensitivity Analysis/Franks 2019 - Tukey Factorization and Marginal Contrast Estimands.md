---
title: "Franks 2019 - Tukey Factorization and Marginal Contrast Estimands"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Sec. 3.1-3.2, pp. 8-12; Eqs. 3-6; Conditions 1-2; Definition 1; Theorem 1; Corollary 1.1; Appendix A (proof of Theorem 1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]]"
used_by:
  - "[[Franks 2019 - Logistic Selection with Exponential Family Mixtures]]"
aliases:
  - Tukey's factorization
  - causal inference is missing data twice
  - copula invariance marginal contrast
  - selection factors sensitivity
---

# Franks 2019 - Tukey Factorization and Marginal Contrast Estimands

> [!summary]
> Tukey's factorization writes the joint law of $(T,Y(t))$ as an identified observed part times an unidentified **selection function** ratio. For both potential outcomes it adds a conditional **copula** for $(Y(0),Y(1))$ given $T$, but Theorem 1 shows ATE, ATT, ATC and QTE (marginal-contrast estimands) depend only on the two marginal selection functions, so the study can be treated as two independent missing-data problems.

## Overview

Two technical conditions are needed. They hold automatically for the logistic-mEF family of [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]] (Condition 1) or must be argued (Condition 2).

## Main Content

### One potential outcome (Sec. 3.1)

> [!definition] Tukey factorization for one arm (Eq. 3)
> $$
> f_\psi(Y(t),T|X)=f^{obs}(Y(t)|T=t,X)\,f(T=t|X)\cdot\frac{f_\psi(T|Y(t),X)}{f_\psi(T=t|Y(t),X)}.
> $$
> The first two factors constitute the identified observed-data density; the last (the **selection function** ratio) is unidentified but interpretable and determines the relation between observed and missing outcome distributions.
^def-tukey-one-arm

> [!definition] Condition 1 (integral constraint, Eq. 4)
> $$
> \int_{\mathcal Y}f^{obs}(Y(t)|T=t,X)\,\frac{f_\psi(T=1{-}t|Y(t),X)}{f_\psi(T=t|Y(t),X)}\,dY(t)=\frac{f(T=1{-}t|X)}{f(T=t|X)}.
> $$
> Arises by integrating (3) over $Y(t)$ (the odds of being in the other arm must match the marginal odds). It restricts the selection functions usable; it has caused technical difficulty in earlier work (Robins et al. 2000).
^cond-integral

> [!definition] Condition 2 (outcome overlap)
> $P(Y(t)\in A|T=1{-}t,X)>0\Rightarrow P(Y(t)\in A|T=t,X)>0$ for all measurable $A$. The support of the missing outcomes lies inside the support of the observed ones, so the missing distribution is an extrapolation (re-weighting) of the observed one. Unlike Condition 1 it is an assumption about the true data-generating process and cannot be enforced by model specification.
^cond-outcome-overlap

### Both potential outcomes (Sec. 3.2)
Under Conditions 1-2 the joint density is determined by the observed data plus **three unidentified models**: treatment given $Y(1)$ alone, treatment given $Y(0)$ alone, and a copula.

> [!definition] General factorization (Eq. 5)
> $$
> f(T,[Y(0),Y(1)]|X)=\Big[f(Y(0)|T{=}0,X)f(T{=}0|X)\tfrac{f(T|Y(0),X)}{f(T{=}0|Y(0),X)}\Big]\Big[f(Y(1)|T{=}1,X)f(T{=}1|X)\tfrac{f(T|Y(1),X)}{f(T{=}1|Y(1),X)}\Big]\frac{c\big(F(Y(0)|T,X),F(Y(1)|T,X)\,\big|\,T,X\big)}{f(T|X)},
> $$
> with marginal selection factors $f(T|Y(1),X)$, $f(T|Y(0),X)$ and conditional copula density
> $c=\dfrac{f(Y(0),Y(1)|T,X)}{f(Y(0)|T,X)f(Y(1)|T,X)}$.
> Hence the missing outcome given the observed one (Eq. 6):
> $f^{mis}(Y(t)|T{=}1{-}t,Y(1{-}t),X)\propto f^{obs}(Y(t)|T{=}t,X)\frac{f(T{=}1{-}t|Y(t),X)}{f(T{=}t|Y(t),X)}\,c(\cdot)$.
^def-tukey-two-arm

> [!definition] Marginal contrast estimand (Definition 1)
> $\tau$ is a **marginal contrast** iff it is a function only of the marginals $f(Y(0)|X)$ and $f(Y(1)|X)$. Includes ATE and QTE (and ATT, ATC, odds ratios); excludes the proportion with a positive effect, the variance of the treatment effect, and unit-level effects.
^def-marginal-contrast

> [!theorem] Theorem 1
> If $f(T,[Y(0),Y(1)]|X)$ admits Tukey's factorization (5) and $\tau$ is a marginal contrast, then $\tau$ is uniquely determined by the marginal selection factors $f(T|Y(1),X)$ and $f(T|Y(0),X)$; it is invariant to the conditional copula.
^thm-marginal-contrast-invariance

*Proof (Appendix A).* It suffices to show $f(Y(t)|T)$ is free of copula parameters. $f(Y(t)|T=t)$ is modelled directly. For $T=1-t$:
$$
f(Y(t)|T{=}1{-}t)=\int f(Y(t),Y(1{-}t)|T{=}1{-}t)\,dY(1{-}t)\propto f(Y(t)|T{=}t)\frac{f(T{=}1{-}t|Y(t))}{f(T{=}t|Y(t))}\int c(\cdot)\,f(Y(1{-}t)|T{=}1{-}t)\,dY(1{-}t),
$$
and by the definition of the copula density the integral equals $\int f(Y(1{-}t)|Y(t),T)\,dY(1{-}t)=1$. So the copula integrates out.

> [!theorem] Corollary 1.1 (Bayesian invariance)
> If, in addition, the copula parameters are a priori independent ("distinct") of the parameters of all other factors in (5), the **posterior** of any marginal-contrast estimand is invariant to the copula specification in the likelihood.
^cor-copula-invariance

Consequence: only the two selection factors must be specified, which matters because dependence between potential outcomes is unobservable "even in experiments". Non-marginal estimands (individual effects, optimal regimes; Klausch et al. 2018) would require the copula and are left to future work.

## Examples

> [!example] Perfect-doctor, Rubin (2003)
> A doctor who perfectly predicts $Y(0),Y(1)$ and assigns the better arm: the dependence between $Y(0),Y(1)$ matters for individual effects but, by Theorem 1, not for the ATE once the two selection functions ($\gamma_0<0$, $\gamma_1>0$ in the logistic parameterisation of the next notes) are fixed.

```python
# Tilting an observed sample to the missing distribution via self-normalised importance weights (Eq. 1)
import numpy as np
def tilt_weights(y, gamma, sign=+1):
    w = np.exp(sign * gamma * y)           # odds f(T=1-t|y)/f(T=t|y) for a logistic selection in y
    return w / w.sum()
y_obs = np.random.default_rng(0).normal(10, 2, 1000)
w = tilt_weights(y_obs, 0.2)
print("observed mean", y_obs.mean(), " implied missing mean", (w*y_obs).sum())
```

## Connections

- The selection function is the Bayesian analogue of the "confounding function" in Robins and Blackwell sensitivity analyses; in marketing, $f(T|Y(0))$ asks "are high-baseline-demand markets more likely to receive the media push?" (hidden targeting).
- Used with logistic selection in [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]].

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Copula Estimation]], [[Potential Outcomes Framework]]
