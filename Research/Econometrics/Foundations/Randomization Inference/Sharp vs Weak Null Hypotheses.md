---
title: Sharp vs Weak Null Hypotheses
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Wu Ding 2021 - Randomization Tests for Weak Null Hypotheses.pdf]]"
source_location: "Secs. 1.1, 2.2, 4.2, pp. 2, 5-6, 12-13"
date_ingested: 2026-06-28
folder: "Econometrics/Foundations/Randomization Inference"
doc_type: paper
depends_on:
  - "[[Fisher Randomization Test and the Sharp Null]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Studentized Randomization Tests]]"
aliases:
  - Fisher vs Neyman Null
  - Weak Null Hypothesis
  - Neyman Null
  - Sharp Null vs Weak Null
---

# Sharp vs Weak Null Hypotheses

> [!summary]
> The **sharp (Fisher) null** asserts the treatment changes *no individual's* potential outcomes — $Y_i(1)=\cdots=Y_i(J)$ for all $i$ — and *pins down the entire Science Table*. The **weak (Neyman) null** asserts only that certain *averages* of potential outcomes are equal — e.g. $\bar Y(1)=\bar Y(2)$, zero average treatment effect — and **leaves treatment-effect heterogeneity unrestricted**, so it does *not* determine the missing potential outcomes. The sharp null implies the weak null, never the reverse. This gap is exactly why a [[Fisher Randomization Test and the Sharp Null|Fisher Randomization Test]] built for the sharp null can be *invalid* for the weak null, and why [[Studentized Randomization Tests|studentization]] is needed.

## Overview

Both nulls live in the [[Potential Outcomes Framework]] with fixed potential outcomes $Y_i(j)$, finite-population means $\bar Y(j) = \sum_i Y_i(j)/N$, and covariances $S(j,k)$. They differ in **how much they constrain**:

- A **sharp / strong / Fisher** null confines *all individual* potential outcomes. With the data it recovers the whole Science Table, so every statistic has a known exact null distribution (see [[Fisher Randomization Test and the Sharp Null]]).
- A **weak / average / Neyman** null confines *only averages* of the potential outcomes. It is, by Rubin's (2005) definition, "any hypothesis that is not sharp." It does **not** recover the missing potential outcomes, because many heterogeneous Science Tables share the same averages.

The general weak hypothesis in this paper is written as a linear contrast of mean potential outcomes:
$$ H_{0\text N}(C, x):\quad C\bar Y = x, $$
where $\bar Y = (\bar Y(1),\dots,\bar Y(J))^{\mathsf T}$, $C \in \mathbb R^{m\times J}$ is a full-row-rank contrast matrix with $C\mathbf 1_J = 0_m$, and $x \in \mathbb R^m$ (usually $x = 0_m$). The treatment-control ATE null $\tau = \bar Y(1)-\bar Y(2)=0$ is the case $C=(1,-1)$; one-way ANOVA $\bar Y(1)=\cdots=\bar Y(J)$ is another.

## Main Content

> [!definition] Sharp (Fisher) null ^def-sharp
> $H_{0\text F}: Y_i(1)=\cdots=Y_i(J)$ for all $i=1,\dots,N$. Constrains **every individual** potential outcome; together with the data it determines the full Science Table. No restriction is left for heterogeneity — there *is* no heterogeneity under it.

> [!definition] Weak (Neyman) null ^def-weak
> $H_{0\text N}(C,x): C\bar Y = x$. Constrains **only averages/contrasts of means**. The ATE special case is $H_{0\text N}: \bar Y(1)-\bar Y(2)=0$. It **permits arbitrary unit-level treatment-effect heterogeneity** and does not determine the missing potential outcomes.

> [!theorem] Logical relationship: sharp ⟹ weak (strictly) ^thm-sharp-implies-weak
> The sharp null $H_{0\text F}$ implies the weak null $H_{0\text N}$ (if every individual effect is zero, the average effect is zero), but **not conversely**: average effects can vanish while individual effects are large and offsetting. Hence the set of data-generating processes consistent with the weak null strictly contains those consistent with the sharp null. A test calibrated to the sharp null need not control type I error over the larger weak-null set.

> [!theorem] Why the gap breaks the naive FRT — variance heterogeneity ^thm-frt-invalid
> To FRT a weak null one imputes the Science Table via a *compatible artificial sharp null* $H_{0\text F}(C,x,\tilde C,\tilde x)$ that imposes **treatment-unit additivity** (constant effects beyond the tested contrast):
> $$ \begin{pmatrix} C \\ \tilde C \end{pmatrix} Y_i = \begin{pmatrix} x \\ \tilde x \end{pmatrix}\quad\text{for all } i, $$
> implying $Y_i^*(j) = Y_i^{\text{obs}} + z_j - z_{W_i}$. The catch: under the *true* weak null the potential outcomes may have **unequal variances** $S(1,1)\neq\cdots\neq S(J,J)$ (heteroscedasticity). A non-studentized statistic such as the difference in means $|\hat\tau|$ then has a randomization distribution that does **not** match its true sampling distribution — the FRT with $|\hat\tau|$ (or the classical $F$) **fails to control type I error**, even asymptotically, unless variances are equal or the design is balanced ($N_1=N_2$). This is the modern face of the Neyman–Fisher controversy (Neyman 1935; Ding & Dasgupta 2018). For $J>2$ even balanced designs do not rescue $F$ or $|\hat\tau|$.

> [!definition] When non-studentized statistics happen to be valid ^def-special-valid
> The naive statistics are *proper* for the weak null only in special cases: (i) homoscedastic potential outcomes $S(1,1)=\cdots=S(J,J)$; (ii) $J=2$ with a **balanced** design $N_1=N_2$ (Corollary 3); or (iii) **binary outcomes** under the ANOVA-type null $\bar Y(1)=\cdots=\bar Y(J)$, since for binary data the mean determines the variance $S(j,j)=N\bar Y(j)\{1-\bar Y(j)\}/(N-1)$, so equal means force equal variances. For general weak nulls of binary outcomes ($C\bar Y=x$) variances still differ, so studentization is still recommended.

## Examples

**Heterogeneity that hides in the average.** Let $J=2$, $N=4$. Suppose the true individual effects are $\tau_1 = +10, \tau_2 = -10, \tau_3 = +10, \tau_4 = -10$. The **average** effect is $\bar\tau = 0$, so the *weak* null $\bar Y(1)=\bar Y(2)$ holds. But the *sharp* null $Y_i(1)=Y_i(2)$ is badly false (no individual has zero effect). A randomization test that imputes assuming constant effects would assign the same variance to both arms, whereas the real treated/control variances differ — inflating false rejections for a non-studentized statistic. The studentized $X^2$ (next note) divides by an arm-specific variance estimate and stays valid.

## Connections

- [[Fisher Randomization Test and the Sharp Null]] — the test designed for the sharp null; imputation via a compatible artificial sharp null lets it reach the weak null.
- [[Studentized Randomization Tests]] — the studentized statistic $X^2$ that restores validity for the weak null.
- [[Randomization Inference - Overview]] — broader framing of design-based inference.
- [[Potential Outcomes Framework]] — defines $\bar Y(j)$, $S(j,k)$, and the Science Table.

## See Also

- [[Power Analysis and Sample Size]] — sharp vs weak nulls have different effective alternatives and power.
- [[The Experimental Ideal]] — randomization balances groups *on average*, the natural target of a weak null.
