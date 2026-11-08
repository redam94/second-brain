---
title: "Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Sec. 3.1-3.2, pp. 4-6; Eqs. 1-5, Theorem 1; Appendix A, pp. 17-18"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]]"
  - "[[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]"
  - "[[Imai 2010 - Identification Compared with Pearl Robins and Principal Strata]]"
aliases:
  - natural direct and indirect effects
  - ACME definition
  - sequential ignorability theorem
  - causal mediation identification
---

# Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability

> [!summary]
> The causal mediation effect for unit $i$ is $\delta_i(t)=Y_i(t,M_i(1))-Y_i(t,M_i(0))$: hold treatment at $t$, shift the mediator from its control to its treated value. The ACME is nonparametrically identified by a mediator-distribution-weighted contrast of outcome regressions if treatment is ignorable given $X$ and the mediator is ignorable given $T$ and $X$ (Assumption 1, "sequential ignorability"). Total effect decomposes as $\tau=\delta(t)+\zeta(1-t)$.

## Overview

Setup: simple random sample of size $n$; for unit $i$ observe $(T_i,M_i,X_i,Y_i)$. $T_i\in\{0,1\}$ treatment, $M_i$ mediator with support $\mathcal M$, $X_i$ pre-treatment covariates (support $\mathcal X$), $Y_i$ outcome. Potential mediator $M_i(t)$; potential outcome $Y_i(t,m)$; observed $M_i=M_i(T_i)$, $Y_i=Y_i(T_i,M_i(T_i))$. If $M$ takes $J$ values there are $2J$ potential outcomes, only one observed. The notation assumes the outcome depends only on the *values* of $(T,M)$, not on how they were realised (a no-"encouragement" condition: $Y_i(t,M_i(t))=Y_i(t,M_i(1-t))=Y_i(t,m)$ if $M_i(1)=M_i(0)=m$).

## Main Content

> [!definition] Causal mediation effect, natural direct effect, total effect (Eqs. 1-3)
> $$
> \delta_i(t)=Y_i(t,M_i(1))-Y_i(t,M_i(0)),\qquad \zeta_i(t)=Y_i(1,M_i(t))-Y_i(0,M_i(t)),
> $$
> $$
> \tau_i=Y_i(1,M_i(1))-Y_i(0,M_i(0))=\delta_i(t)+\zeta_i(1-t),\quad t=0,1.
> $$
> $\bar\delta(t)=E[\delta_i(t)]$ is the **ACME**, $\bar\zeta(t)=E[\zeta_i(t)]$ the **average natural direct effect**, $\bar\tau=\bar\delta(t)+\bar\zeta(1-t)$.
^def-acme

Terminology: Pearl (2001) calls $\delta_i(t)$ the natural indirect effect; Robins (2003) the *pure* indirect effect for $\delta_i(0)$ and *total* indirect effect for $\delta_i(1)$. The **controlled direct effects** $Y_i(t,m)-Y_i(t,m')$ and $Y_i(1,m)-Y_i(0,m)$ differ from these: they fix the mediator at specific values rather than potential values. "The former examines whether $M$ mediates the relationship between $T$ and $Y$, the latter whether $T$ moderates the effect of $M$ on $Y$." The counterfactual $Y_i(t,M_i(1-t))$ is never observable under any single treatment status (cross-world quantity); the paper notes disagreement on whether to infer such quantities (Rubin 2005 vs Pearl 2001).

> [!definition] Assumption 1: sequential ignorability (Eqs. 4-5)
> For $t,t'\in\{0,1\}$ and all $x\in\mathcal X$:
> $$
> \{Y_i(t',m),M_i(t)\}\perp\!\!\!\perp T_i\mid X_i=x\qquad(4)
> $$
> $$
> Y_i(t',m)\perp\!\!\!\perp M_i(t)\mid T_i=t,X_i=x\qquad(5)
> $$
> with positivity $0<\Pr(T_i=t|X_i=x)$ and $0<p(M_i(t)=m|T_i=t,X_i=x)$. Treatment is first ignorable given pre-treatment $X$; then the mediator is ignorable given the observed treatment *and* $X$. Unlike Robins' sequential ignorability, (5) must hold **without** conditioning on post-treatment confounders.
^asm-sequential-ignorability

> [!theorem] Theorem 1: nonparametric identification
> Under Assumption 1, for $t=0,1$,
> $$
> \bar\delta(t)=\iint E(Y_i\mid M_i=m,T_i=t,X_i=x)\,\{dF_{M_i|T_i=1,X_i=x}(m)-dF_{M_i|T_i=0,X_i=x}(m)\}\,dF_{X_i}(x),
> $$
> $$
> \bar\zeta(t)=\iint\{E(Y_i|M_i=m,T_i=1,X_i=x)-E(Y_i|M_i=m,T_i=0,X_i=x)\}\,dF_{M_i|T_i=t,X_i=x}(m)\,dF_{X_i}(x).
> $$
^thm-nonparametric-identification

*Proof sketch (Appendix A; the paper's chain has seven equalities, condensed here).* Eq. (4) implies $Y_i(t',m)\perp T_i\mid M_i(t)=m',X_i=x$ (Eq. 25). Then
$$
E[Y_i(t,M_i(t'))|X_i=x]=\int E[Y_i(t,m)\mid M_i(t')=m,X_i=x]\,dF_{M_i(t')|X_i=x}(m)
$$
$$
=\int E[Y_i(t,m)\mid M_i(t')=m,T_i=t',X_i=x]\,dF_{M_i(t')|T_i=t',X_i}(m)\quad(\text{by 4})
$$
$$
=\int E[Y_i(t,m)\mid T_i=t',X_i=x]\,dF(\cdot)\;=\;\int E[Y_i(t,m)|T_i=t,X_i=x]\,dF(\cdot)
$$
(Eq. 5 removes the conditioning on $M_i(t')$; Eq. 4 then lets $T_i$ be switched between $t'$ and $t$), then Eq. 5 again with $M_i(t)=m$, $T_i=t$, and consistency $M_i=M_i(T_i)$, $Y_i=Y_i(T_i,M_i(T_i))$ give $\int E(Y_i|M_i=m,T_i=t,X_i=x)\,dF_{M_i|T_i=t',X_i=x}(m)$. Integrating over $X$ and differencing in $t'$ yields $\bar\delta(t)$; $\bar\zeta(t)$ follows from $\bar\tau=\bar\zeta(t)+\bar\delta(t')$.

### Remarks
- Holds for any (continuous or discrete) mediator and treatment regime; eq. (5) can be weakened to mean independence.
- **Post-treatment confounders.** If (5) only holds after conditioning on post-treatment confounders $Z_i$, natural effects are not identified without extra assumptions (Avin, Shpitser & Pearl 2005; Robins 2003). Sometimes pre-treatment conditioning is enough to address the main source of confounding.
- **Randomised treatment.** Eq. (4) holds by design; Eq. (5) does not (mediators are typically not randomised) - motivating [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]].
- The data generating process contains no information about whether Eq. 5 holds.

## Examples

> [!example] Binary $T$, binary $M$ (Eqs. 16-17)
> For discrete $M$: $\bar\delta(t)=\sum_m E(Y|M=m,T=t,X)\{\Pr(M=m|T=1,X)-\Pr(M=m|T=0,X)\}$. For $J=2$:
> $$
> \bar\delta(t)=\{\Pr(M=1|T=1,X)-\Pr(M=1|T=0,X)\}\{E(Y|M=1,T=t,X)-E(Y|M=0,T=t,X)\}.
> $$
> The ACME is the product of the effect of $T$ on $M$ and the effect of $M$ on $Y$ (holding $T=t$). Numerical check: $\Pr(M{=}1|T{=}1)=0.7,\ \Pr(M{=}1|T{=}0)=0.3$, $E(Y|M{=}1,T{=}t)-E(Y|M{=}0,T{=}t)=2$ gives $\bar\delta(t)=0.4\times2=0.8$.
^ex-binary-acme

```python
import numpy as np
def acme_discrete(p1, p0, mu_t):          # p1[m]=Pr(M=m|T=1), p0[m]=Pr(M=m|T=0), mu_t[m]=E[Y|M=m,T=t]
    return np.sum(np.asarray(mu_t)*(np.asarray(p1)-np.asarray(p0)))
print(acme_discrete([0.3,0.7],[0.7,0.3],[1.0,3.0]))   # 0.8
```

## Connections

- Marketing: $T$ = Meta spend (or exposure), $M$ = branded-search clicks, $Y$ = new customers; the ACME is the "halo through search" and the natural direct effect is Meta's effect with search held at its no-Meta value; see [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]].
- Compared with other identification results: [[Imai 2010 - Identification Compared with Pearl Robins and Principal Strata]].

## See Also

[[Imai 2010 - Causal Mediation Analysis - Overview]], [[Potential Outcomes Framework]], [[DAGs and Causal Identification]]
