---
title: "Dong Roth Su 2022 - Trade-off Functions and f-DP"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 1 (hypothesis-testing view) and Sec. 2.1, Definitions 2.1 and 2.3, Propositions 2.2, 2.4, 2.5, pp. 1-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]"
used_by:
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]"
  - "[[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]"
  - "[[Dong Roth Su 2022 - Privacy Amplification by Subsampling]]"
aliases:
  - trade-off function
  - f-differential privacy definition
  - hypothesis testing definition of DP
---

# Dong Roth Su 2022 - Trade-off Functions and f-DP

> [!summary]
> DP is recast as a hypothesis test between neighboring datasets $S,S'$. The **trade-off function** $T(P,Q)$ is the minimal type II error achievable at each type I level. A mechanism is **$f$-DP** if $T(M(S),M(S'))\ge f$ for all neighbors. $(\varepsilon,\delta)$-DP is exactly $f_{\varepsilon,\delta}$-DP, a piecewise-linear function; every symmetric trade-off function is a valid privacy parameter.

## Overview

The paper's starting observation (credited to Wasserman-Zhou and Kairouz-Oh-Viswanath): DP is most naturally defined through the attacker's hypothesis testing problem
$$H_0:\ \text{the underlying dataset is }S\quad\text{vs}\quad H_1:\ \text{the underlying dataset is }S'.$$
Rejecting $H_0$ corresponds to detecting the *absence* of Alice (the one individual in $S$ but not $S'$). For an $(\varepsilon,\delta)$-DP mechanism, any test at significance level $\alpha$ has power at most $e^\varepsilon\alpha+\delta$, only slightly above $\alpha$ for small $\varepsilon,\delta$, so every test is essentially powerless.

## Main Content

**Notation.** A dataset $S=(x_1,\dots,x_n)$, $x_i\in\mathcal X$. Datasets $S,S'$ are **neighbors** if they differ in exactly one record (replace-one adjacency). A **mechanism** $M$ is a randomized algorithm releasing $M(S)$. Let $P,Q$ be the distributions of $M(S),M(S')$.

A rejection rule $0\le\phi\le1$ has type I error $\alpha_\phi=\mathbb E_P[\phi]$ and type II error $\beta_\phi=1-\mathbb E_Q[\phi]$. These satisfy $\alpha_\phi+\beta_\phi\ge1-\text{TV}(P,Q)$ (Eq. 3), a rough constraint that the trade-off function refines.

> [!definition] Definition 2.1 (trade-off function)
> For distributions $P,Q$ on the same space, $T(P,Q):[0,1]\to[0,1]$,
> $$T(P,Q)(\alpha)=\inf\{\beta_\phi:\alpha_\phi\le\alpha\},$$
> the infimum over all measurable rejection rules. By the Neyman-Pearson lemma (Theorem A.1) the minimum is attained by the likelihood ratio test. The greater $T(P,Q)$, the harder it is to distinguish $P$ from $Q$.
^def-tradeoff-function

> [!theorem] Proposition 2.2 (characterization)
> A function $f:[0,1]\to[0,1]$ is a trade-off function if and only if $f$ is convex, continuous, non-increasing, and $f(x)\le1-x$ for $x\in[0,1]$.
^thm-tradeoff-characterization

Consequence: $\max\{f,g\}$ is a trade-off function if $f,g$ are. Convexity implies continuity on $(0,1)$; $f(\alpha)\ge0$ and $f\le1-\alpha$ give continuity at 1, so the continuity condition matters only at $x=0$.

> [!definition] Definition 2.3 ($f$-differential privacy)
> Let $f$ be a trade-off function. A mechanism $M$ is **$f$-DP** if $T\big(M(S),M(S')\big)\ge f$ for all neighboring datasets $S,S'$. Equivalently, distinguishing any two neighbors from the output is at least as difficult as distinguishing $P$ from $Q$ from one draw, where $f=T(P,Q)$.
^def-f-dp

The definition is parameterized by a *function* rather than a pair of reals, avoiding premature summarization. Because neighboring is symmetric, $f$-DP also requires $T(M(S'),M(S))\ge f$.

> [!theorem] Proposition 2.4 (symmetrization)
> If $M$ is $f$-DP then $M$ is $f^S$-DP with $f^S=\max\{f,f^{-1}\}$, where the (left-continuous) inverse is $f^{-1}(\alpha)=\inf\{t\in[0,1]:f(t)\le\alpha\}$. Writing $f=T(P,Q)$, $f^{-1}=T(Q,P)$, so $f^S$ is a symmetric trade-off function ($f^S=(f^S)^{-1}$) and $f^S\ge f$. Henceforth trade-off functions are assumed symmetric.
^thm-symmetrization

> [!definition] The $(\varepsilon,\delta)$ trade-off function
> $$f_{\varepsilon,\delta}(\alpha)=\max\big\{0,\ 1-\delta-e^{\varepsilon}\alpha,\ e^{-\varepsilon}(1-\delta-\alpha)\big\},\qquad0\le\alpha\le1.$$
> It is piecewise linear with intercept $1-\delta$, slopes $-e^{\pm\varepsilon}$ and is symmetric about $y=x$ (Figure 3, left).
^def-f-eps-delta

> [!theorem] Proposition 2.5 (Wasserman-Zhou)
> A mechanism is $(\varepsilon,\delta)$-DP if and only if it is $f_{\varepsilon,\delta}$-DP.
^thm-eps-delta-equiv

So $f$-DP generalizes $(\varepsilon,\delta)$-DP, which is a special case that uses only two parameters out of the whole function.

## Examples

> [!example] Reading $f_{\varepsilon,\delta}$ at a specific level
> Setup: $\varepsilon=1,\delta=0$ (pure 1-DP), test level $\alpha=0.05$.
> Solution: $f_{1,0}(0.05)=\max\{0,1-e\cdot0.05,\ e^{-1}(0.95)\}=\max\{0,0.864,0.349\}=0.864$. So type II error $\ge0.864$ and power $\le1-0.864=0.136=e^1\cdot0.05$.
> Interpretation: this is exactly the "power at most $e^\varepsilon\alpha+\delta$" statement of Section 1. Recomputed.
^ex-f-eps-delta

> [!example] Graphical reading of Figure 2
> The paper plots three trade-off curves $T(M(S),M(S'))$ against $f$; only the dashed curve that lies above $f$ everywhere satisfies $f$-DP. A mechanism whose trade-off curve crosses below $f$ at any $\alpha$ fails, even if it is above $f$ elsewhere: $f$-DP is a pointwise constraint on the whole curve.
^ex-fig2

## Connections

- GDP is the one-parameter family of trade-off functions of unit-variance Gaussians: [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]].
- $f$-DP and Renyi DP: Renyi DP measures indistinguishability by a divergence ([[Mironov 2017 - Renyi Divergence and the RDP Definition]]); the exact relation is in [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]].
- Type I and II error vocabulary: [[Power Analysis and Sample Size]].
- Marketing reading: the testing interpretation translates "attacker power at level $\alpha$" into plain language for non-technical stakeholders, e.g. "an adversary who wants to confirm a person was in a conversion cohort can be right at most so often"; see [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]].

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]]
- [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]] — the original hypothesis-testing characterization that Proposition 2.5 adapts.
