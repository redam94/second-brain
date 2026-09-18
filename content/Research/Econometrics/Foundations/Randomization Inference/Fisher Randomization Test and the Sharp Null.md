---
title: Fisher Randomization Test and the Sharp Null
tags:
  - source/ingested
  - topic/causal-inference
  - type/theorem
  - doc/paper
source: "[[raw/Wu Ding 2021 - Randomization Tests for Weak Null Hypotheses.pdf]]"
source_location: "Sec. 2.2, pp. 5-7"
date_ingested: 2026-06-28
folder: "Econometrics/Foundations/Randomization Inference"
doc_type: paper
depends_on:
  - "[[Randomization Inference - Overview]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Sharp vs Weak Null Hypotheses]]"
  - "[[Studentized Randomization Tests]]"
  - "[[Permutation Tests and Exact Inference]]"
aliases:
  - FRT
  - Fisher Randomization Test
  - Sharp Null Hypothesis
  - Fisher's Exact Test of No Effect
---

# Fisher Randomization Test and the Sharp Null

> [!summary]
> The **Fisher Randomization Test (FRT)**, formulated by [[The Experimental Ideal|Fisher (1935)]] and recast in potential-outcomes terms by Rubin (1980), tests a **sharp null hypothesis** — one that, together with the observed data, recovers *all* missing potential outcomes. Under such a null **any** test statistic has a *known* distribution: cycle through all assignments $W$, recompute the statistic, and the **exact $p$-value** is the fraction of re-assignments yielding a statistic at least as extreme as the observed one. This makes the FRT **finite-sample exact** regardless of the statistic, sample size, or data-generating process.

## Overview

A null hypothesis is **sharp** (Rubin 2005) if it determines every entry of the "Science Table" $\{Y_i(j): i=1,\dots,N;\ j=1,\dots,J\}$ given the observed data. The canonical example is **Fisher's sharp null of no effect**:
$$
H_{0\text F}:\quad Y_i(1) = Y_i(2) = \cdots = Y_i(J)\quad\text{for all } i=1,\dots,N.
$$
For $J=2$ this is $Y_i(1) = Y_i(0)$ for every unit — the treatment changes *no* unit's outcome. Once we know this, the unobserved potential outcomes are filled in directly from the observed ones ($Y_i^*(j) = Y_i^{\text{obs}}$ for all $j$), so the entire Science Table is known and the statistic's null distribution is computable by enumeration.

The deep point (Rubin 1980; Kempthorne & Doerfler 1969): the validity comes from the **assignment mechanism**, not from any exchangeability or i.i.d. assumption on the outcomes. Randomization alone justifies the test.

## Main Content

> [!definition] Sharp null hypothesis ^def-sharp-null
> A null hypothesis is **sharp** if, combined with the observed data $\{W_i, Y_i^{\text{obs}}\}$, it determines all missing potential outcomes in the Science Table. Fisher's sharp null $H_{0\text F}: Y_i(1)=\cdots=Y_i(J)$ for all $i$ is the leading case. Under a sharp null, every test statistic $T$ has a **known** distribution over the randomization of $W$.

> [!theorem] Finite-sample exactness of the FRT under the sharp null ^thm-frt-exact
> Under a sharp null hypothesis, for **any** test statistic $T$ and **any** data-generating process for the potential outcomes, the FRT $p$-value
> $$
> p \;=\; (N!)^{-1}\sum_{\pi \in \Pi_N} \mathbf 1\!\left(T_\pi \ge T\right)
> $$
> is **finite-sample exact**: $\mathbb P(p \le \alpha) \le \alpha$ for every level $\alpha$ (with equality up to the discreteness of the randomization distribution). The $p$-value is a right-tail probability — larger $T$ means greater deviation from the null.

> [!definition] The FRT procedure (FRT-1 to FRT-4) ^def-frt-steps
> Given a sharp null used to impute outcomes and a statistic $T$:
> 1. **FRT-1.** Compute $T$ from the observed $\{W_i, Y_i^{\text{obs}}\}$.
> 2. **FRT-2.** Impute the full potential-outcome vector $Y_i^*$ for each unit using the (compatible) sharp null. Under Fisher's $H_{0\text F}$ this is just $Y_i^*(j)=Y_i^{\text{obs}}$ for all $j$.
> 3. **FRT-3.** For each permutation $\pi \in \Pi_N$, form the re-assigned observed data $Y_{\pi,i}^{\text{obs}} = \sum_j W_{\pi(i)}(j)Y_i^*(j)$ and recompute $T_\pi$.
> 4. **FRT-4.** Report $p = (N!)^{-1}\sum_\pi \mathbf 1(T_\pi \ge T)$.
> When $N!$ is too large, draw i.i.d. permutations $\pi \sim \text{Unif}(\Pi_N)$ to approximate $p$ up to Monte Carlo error — the test remains valid.

> [!theorem] FRT reduces to the classical permutation test under $H_{0\text F}$ ^thm-frt-permutation
> Under Fisher's sharp null of no effect, all imputed potential outcomes equal $Y_i^{\text{obs}}$, so FRT-3 simply **permutes the treatment labels** $W$ while the outcomes stay fixed ($Y_{\pi,i}^{\text{obs}} = Y_i^{\text{obs}}$). In this case the FRT and the classical [[Permutation Tests and Exact Inference|permutation test]] are *numerically identical*. In general, the FRT admits a broader class of nulls and designs than the permutation test.

A subtlety exploited later: the FRT can be aimed at a **weak** null by choosing an *artificial but compatible* sharp null for the imputation step (treatment-unit additivity, i.e. constant effects), then using a statistic that detects departures from the weak null. The imputed Science Table satisfies $Y_i^*(W_i) = Y_i^{\text{obs}}$, so it is consistent with the data. See [[Sharp vs Weak Null Hypotheses]] and [[Studentized Randomization Tests]].

## Examples

**Exact permutation $p$-value, by hand.** Take $N=6$, $N_1=3$ treated, $N_2=3$ control. Observed outcomes: treated $= (9, 7, 8)$, control $= (4, 6, 5)$. Observed statistic $T = \hat\tau = \bar Y_{\text{treated}} - \bar Y_{\text{control}} = 8 - 5 = 3$.

Under $H_{0\text F}$ the six numbers $\{9,7,8,4,6,5\}$ are fixed; only *which three are labeled treated* varies. There are $\binom{6}{3}=20$ equally likely label assignments. For each, compute $\hat\tau$. The observed split $(9,7,8)$ vs $(4,6,5)$ gives the **largest possible** treated mean, so $\hat\tau = 3$ is the maximum over all 20 assignments. Exactly one of the 20 (the observed one) attains $T_\pi \ge 3$, so the one-sided exact $p$-value is $1/20 = 0.05$. (A two-sided test on $|\hat\tau|$ would count both the observed split and its mirror image, giving $2/20 = 0.10$.) No distributional assumption was used — only the 20 equally likely randomizations.

## Connections

- [[Randomization Inference - Overview]] — places the FRT within design-based inference.
- [[Sharp vs Weak Null Hypotheses]] — contrasts Fisher's sharp null with Neyman's weak null and explains why the FRT must be modified for the latter.
- [[Studentized Randomization Tests]] — uses the FRT machinery with an artificial sharp null plus a studentized statistic to test weak nulls.
- [[Permutation Tests and Exact Inference]] — the FRT specializes to the permutation test under the sharp null of no effect.

## See Also

- [[Potential Outcomes Framework]] — the Science Table and the imputation logic.
- [[The Experimental Ideal]] — Fisher's randomization principle.
- [[Power Analysis and Sample Size]] — power of exact tests depends on the number of distinct randomizations.
- [[Conformal Prediction - Overview]] — prediction sets are inverted permutation tests
