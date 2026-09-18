---
title: Randomization Inference - Overview
tags:
  - source/ingested
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Wu Ding 2021 - Randomization Tests for Weak Null Hypotheses.pdf]]"
source_location: "Secs. 1-2, pp. 2-6"
date_ingested: 2026-06-28
folder: "Econometrics/Foundations/Randomization Inference"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Fisher Randomization Test and the Sharp Null]]"
  - "[[Sharp vs Weak Null Hypotheses]]"
  - "[[Studentized Randomization Tests]]"
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Switchback Experiment Design and Analysis]]"
aliases:
  - Randomization-Based Inference
  - Randomization Inference Overview
  - Design-Based Inference
---

# Randomization Inference - Overview

> [!summary]
> **Randomization inference** treats the treatment assignment mechanism — not a sampling model on the outcomes — as the sole source of randomness for statistical inference. The potential outcomes $\{Y_i(j)\}$ are regarded as *fixed* constants attached to a finite population of $N$ units; only $W = (W_1,\dots,W_N)$, the realized assignment, is random. This **design-based** view, originating with [[The Experimental Ideal|Fisher (1935)]] and Neyman (1923/1990), justifies the [[Fisher Randomization Test and the Sharp Null|Fisher Randomization Test (FRT)]] and yields *finite-sample exact* $p$-values under a [[Sharp vs Weak Null Hypotheses|sharp null]]. Wu & Ding (2021) extend the FRT to **weak (Neyman) nulls** by pairing it with a [[Studentized Randomization Tests|studentized statistic]] that is simultaneously finite-sample exact under the sharp null and asymptotically valid under the weak null.

## Overview

In the [[Potential Outcomes Framework]] for a completely randomized experiment (CRE), each unit $i \in \{1,\dots,N\}$ has a vector of potential outcomes $Y_i = (Y_i(1),\dots,Y_i(J))^{\mathsf T}$, one per treatment level $j \in \{1,\dots,J\}$. The experimenter fixes group sizes $N_1,\dots,N_J \ge 2$ summing to $N$ and assigns treatments so that every realization with $\sum_i W_i(j) = N_j$ has equal probability $\prod_j N_j!/N!$. Unit $i$'s observed outcome is $Y_i^{\text{obs}} = Y_i(W_i)$.

Randomization inference asks: *given that the assignment was randomized, how surprising is the observed test statistic relative to the distribution it would have had over all the assignments that could equally have occurred?* Because the potential outcomes are held fixed, the reference distribution is generated entirely by permuting/re-assigning $W$ — this is the **randomization distribution**.

Two foundational null hypotheses anchor the field (see [[Sharp vs Weak Null Hypotheses]]):
- **Fisher's sharp null** $H_0: Y_i(1) = Y_i(0)$ for *every* unit $i$ — no effect for anyone. Sharpness means the null + observed data **recover all missing potential outcomes**, so any statistic has a *known, exact* null distribution.
- **Neyman's weak null** $H_0: \bar Y(1) = \bar Y(0)$ (zero **average** effect) — leaves room for treatment-effect heterogeneity and does **not** pin down the missing potential outcomes.

The central tension this paper resolves: the FRT is purpose-built for sharp nulls, yet practitioners want to test weak nulls. Naively running an FRT with a non-studentized statistic (e.g. the difference in means $|\hat\tau|$) can **fail to control type I error** for the weak null under variance heterogeneity (heteroscedastic potential outcomes). The fix is **studentization**.

## Main Content

> [!definition] Design-based (randomization) inference ^def-design-based
> Potential outcomes $\{Y_i(j)\}$ are fixed; the only randomness is the treatment assignment $W$, drawn from a known distribution determined by the experimental design. Means $\bar Y(j) = \sum_{i=1}^N Y_i(j)/N$ and covariances $S(j,k) = \sum_{i=1}^N \{Y_i(j)-\bar Y(j)\}\{Y_i(k)-\bar Y(k)\}/(N-1)$ are **fixed finite-population parameters**, not population expectations. Inference targets these finite-population quantities.

> [!definition] Randomization distribution ^def-rand-dist
> Conditioning on the original data $\{W_i, Y_i^{\text{obs}}\}$, fill in all potential outcomes (via the sharp null used for imputation), then recompute the statistic $T_\pi$ for every permutation/re-assignment $\pi \in \Pi_N$. The collection $\{T_\pi : \pi \in \Pi_N\}$, denoted $T_\pi \mid W$, is the **randomization distribution** — the reference null distribution for the $p$-value.

> [!definition] Conservative type I error control ^def-conservative
> The FRT with statistic $T$ *conservatively* controls type I error at level $\alpha$ if $\mathbb P\{(N!)^{-1}\sum_{\pi}\mathbf 1(T_\pi \ge T) \le \alpha\} \le \alpha$. Wu & Ding's studentized test is **conservative** (not exact) for the weak null asymptotically, but **exact** for the sharp null in finite samples.

> [!theorem] Why design-based asymptotics are needed ^thm-fp-asymptotics
> The exact sampling distribution of a statistic $T$ under the weak null $H_{0\text N}(C,x)$ depends on **unknown** potential-outcome covariances $S(j,k)$, $j\ne k$, which have no unbiased estimator (potential outcomes $Y_i(j)$ and $Y_i(k)$ are never jointly observed). Wu & Ding therefore adopt **finite-population asymptotics** (Li & Ding 2017): under regularity (Assumption 1: $N_j/N \to p_j \in (0,1)$, convergent moments, negligible max term), $N^{1/2}(\hat{\bar Y} - \bar Y) \xrightarrow{d} \mathcal N(0_J, V)$ with a covariance $V = D - S \preceq D$ that is **conservatively** estimable by $\hat D = N\,\text{diag}\{\hat S(1,1)/N_1,\dots,\hat S(J,J)/N_J\}$.

The remaining notes develop: the [[Fisher Randomization Test and the Sharp Null|FRT mechanics and the sharp-null exactness result]]; the [[Sharp vs Weak Null Hypotheses|sharp-vs-weak distinction (Fisher vs Neyman)]]; the [[Studentized Randomization Tests|studentized statistic $X^2$ that achieves dual validity]]; and the broader [[Permutation Tests and Exact Inference|permutation principle and its relation to the bootstrap]].

## Examples

A 60-second mental model. Suppose $N=4$ units, two treated ($N_1=2$) and two control ($N_2=2$), with observed outcomes $(5,3 \mid 2,1)$ (treated $\mid$ control). The difference in means is $\hat\tau = 4 - 1.5 = 2.5$. Under the **sharp null** $Y_i(1)=Y_i(2)$, every observed value would be the same regardless of assignment, so we simply re-deal which two of the four numbers are "treated." There are $\binom{4}{2}=6$ equally likely assignments; computing $\hat\tau$ (or $|\hat\tau|$) for each gives the randomization distribution, and the **exact $p$-value** is the fraction of these $\ge$ the observed $2.5$. This is the kernel of every randomization test; subsequent notes replace $|\hat\tau|$ with the studentized $X^2$ so the same procedure also handles the *weak* null under heteroscedasticity.

## Connections

- [[Potential Outcomes Framework]] — the fixed-potential-outcomes setup randomization inference is built on.
- [[The Experimental Ideal]] — randomization as the engine that makes treatment groups comparable and inference valid.
- [[Fisher Randomization Test and the Sharp Null]] — the core procedure (FRT-1 through FRT-4).
- [[Sharp vs Weak Null Hypotheses]] — Fisher vs Neyman nulls and why the distinction matters.
- [[Studentized Randomization Tests]] — the paper's main contribution.
- [[Permutation Tests and Exact Inference]] — generalization and contrast with the bootstrap.

## See Also

- [[Synthetic Control]] and [[Synthetic Control Inference and Diagnostics]] — placebo/permutation-style inference in a different design.
- [[Differences-in-Differences]] — permutation/randomization inference is sometimes used for DiD standard errors.
- [[Power Analysis and Sample Size]] — designing experiments with adequate power for the tests above.
- [[Multiple Testing Corrections]] — relevant when many randomization tests are run jointly.
