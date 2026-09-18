---
title: Permutation Tests and Exact Inference
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Wu Ding 2021 - Randomization Tests for Weak Null Hypotheses.pdf]]"
source_location: "Secs. 1.1-1.2, 2.2, 3.1, pp. 2-3, 6, 9"
date_ingested: 2026-06-28
folder: "Econometrics/Foundations/Randomization Inference"
doc_type: paper
depends_on:
  - "[[Fisher Randomization Test and the Sharp Null]]"
  - "[[Studentized Randomization Tests]]"
used_by:
  - "[[Randomization Inference - Overview]]"
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Conformal Prediction - Overview]]"
aliases:
  - Permutation Test
  - Exact Inference
  - Permutation vs Bootstrap
  - Exact vs Asymptotic Tests
---

# Permutation Tests and Exact Inference

> [!summary]
> A **permutation test** computes a $p$-value by re-labeling the data under an **exchangeability** assumption and recomputing the statistic across all (or many) relabelings. Under [[Fisher Randomization Test and the Sharp Null|Fisher's sharp null of no effect]] the [[Fisher Randomization Test and the Sharp Null|FRT]] is *numerically identical* to the permutation test — but the FRT is justified by the **randomization of the design** rather than by exchangeability of outcomes, so it covers a broader class of nulls and designs. Permutation/randomization tests deliver **exact** finite-sample $p$-values under the sharp null and only **asymptotic** validity under weak nulls (where [[Studentized Randomization Tests|studentization]] is required). The **bootstrap** is the other resampling route to weak-null inference; relative to it, the FRT's edge is finite-sample exactness under the sharp null.

## Overview

The permutation test (Pitman 1937; Hoeffding 1952; Romano 1990) reasons: *if the group labels are exchangeable under the null, the observed statistic should look typical among all label permutations.* Concretely, fix the outcomes, enumerate label permutations $\pi\in\Pi_N$, recompute $T_\pi$, and report the right-tail fraction $p=(N!)^{-1}\sum_\pi\mathbf 1(T_\pi\ge T)$. When $N!$ is huge, draw i.i.d. $\pi\sim\text{Unif}(\Pi_N)$ (Monte Carlo permutation test) — still valid up to Monte Carlo error.

Wu & Ding stress the conceptual difference from the FRT. The classical permutation test **assumes the outcomes are exchangeable**. The FRT instead takes the **random treatment assignment** as the source of inference on **fixed** potential outcomes, assuming no exchangeability (Kempthorne & Doerfler 1969). The two **coincide** under the sharp null of no effect, because then all imputed potential outcomes equal $Y_i^{\text{obs}}$ and re-assigning $W$ is the same as permuting labels. In general the FRT is strictly more general.

## Main Content

> [!definition] Permutation test ^def-permutation
> Given a statistic $T$ and an exchangeability hypothesis, the permutation $p$-value is $p = (N!)^{-1}\sum_{\pi\in\Pi_N}\mathbf 1(T_\pi \ge T)$, where $T_\pi$ recomputes $T$ after applying label permutation $\pi$ to the (fixed) data. Approximated by random sampling of permutations when full enumeration is infeasible.

> [!theorem] Exact vs asymptotic validity ^thm-exact-vs-asymptotic
> Under the **sharp null**, the permutation/randomization $p$-value is **finite-sample exact**: $\mathbb P(p\le\alpha)\le\alpha$ for all $N$, any statistic, any data-generating process — no large-sample approximation. Under a **weak null** the statistic's randomization distribution generally differs from its true sampling distribution, so validity holds only **asymptotically and only for a proper (studentized) statistic** (see [[Studentized Randomization Tests]], Theorem 1). Many classical parametric/non-parametric tests (Eden–Yates, Pitman, Kempthorne, Box–Andersen, Bradley, Lehmann) are *approximations* to the exact permutation/randomization test.

> [!definition] Studentization rescues permutation tests under heteroscedasticity ^def-student-permutation
> The need to studentize permutation statistics is classical (Neuhaus 1993; Janssen 1997, 1999; Chung & Romano 2013): in the two-sample Behrens–Fisher problem an **unstudentized** statistic gives an invalid permutation test under unequal variances, while a **studentized** one is asymptotically valid because it is asymptotically **pivotal**. Wu & Ding's twist: in the *finite-population* design-based setting the studentized $X^2$ is **not** asymptotically pivotal — instead its sampling distribution is **stochastically dominated** by the (pivotal $\chi^2_m$) randomization distribution, giving a **conservative** rather than exact asymptotic test.

> [!theorem] Permutation/FRT vs the bootstrap ^thm-vs-bootstrap
> The **bootstrap** is the other resampling method for weak nulls (Babu & Singh 1983; Hall 1988 use studentization for second-order accuracy; Imbens & Menzel 2018 fuse the bootstrap with finite-population causal inference). Relative to the bootstrap, the FRT/permutation test's distinctive advantage is being **finite-sample exact under the sharp null**. Both can target weak nulls asymptotically; the FRT additionally inherits exactness whenever a compatible sharp null is used for imputation. Studentization aids **first-order** accuracy (type I control) for the FRT, whereas in the bootstrap it is traditionally used for **second-order** accuracy.

## Examples

**Monte Carlo permutation $p$-value.** With $N=20$ and $\binom{20}{10}=184{,}756$ possible label splits, full enumeration is fine, but for $N=50$ it is astronomical. Instead draw $B=10{,}000$ random permutations $\pi^{(1)},\dots,\pi^{(B)}$, compute $T_{\pi^{(b)}}$ for each, and estimate
$$
\hat p = \frac{1 + \sum_{b=1}^{B}\mathbf 1\!\left(T_{\pi^{(b)}}\ge T\right)}{1+B}.
$$
The "+1" (counting the observed assignment) keeps the test valid. With $B=10{,}000$, a true $p=0.05$ is estimated with standard error $\approx\sqrt{0.05\cdot0.95/10000}\approx 0.0022$. Wu & Ding use $10^4$ Monte Carlo draws for their applied $p$-values and $2500$ permutations per run in simulations.

## Connections

- [[Fisher Randomization Test and the Sharp Null]] — coincides with the permutation test under the sharp null of no effect.
- [[Studentized Randomization Tests]] — studentization makes permutation/randomization tests valid under heteroscedasticity / weak nulls.
- [[Sharp vs Weak Null Hypotheses]] — exactness holds for sharp nulls; only asymptotic validity for weak nulls.
- [[Randomization Inference - Overview]] — situates permutation tests within design-based inference.

## See Also

- [[Synthetic Control Inference and Diagnostics]] — placebo/permutation inference in panel settings.
- [[Differences-in-Differences]] — permutation-based standard errors as a robustness device.
- [[Multiple Testing Corrections]] — permutation methods also underpin some max-T multiplicity adjustments.
- [[Power Analysis and Sample Size]] — exact tests' power is limited by the number of distinct permutations.
- [[Split Conformal Prediction and the Coverage Guarantee]] — same uniform-rank "+1" exchangeability argument
