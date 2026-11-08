---
title: "Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 2.3-2.5, Propositions 2.8, 2.11, 2.12, 2.15, Lemma 2.9, Theorems 2.10, 2.14, Corollary 2.13, Fig. 4, pp. 9-13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Trade-off Functions and f-DP]]"
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]"
used_by:
  - "[[Dong Roth Su 2022 - Privacy Amplification by Subsampling]]"
  - "[[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]"
aliases:
  - f-DP post-processing
  - Blackwell order privacy
  - primal-dual f-DP epsilon-delta
  - f-DP group privacy
---

# Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy

> [!summary]
> $f$-DP is closed under post-processing, is the **most informative** privacy notion compatible with post-processing (its induced order equals the Blackwell order), is dual to an infinite family of $(\varepsilon,\delta)$ guarantees via the convex conjugate ($\delta(\varepsilon)=1+f^*(-e^\varepsilon)$), and degrades under groups of size $k$ as $1-(1-f)^{\circ k}$, which turns $\mu$-GDP into $k\mu$-GDP.

## Overview

Sections 2.3-2.5 establish the structural properties that make $f$-DP a complete privacy framework: post-processing, informativeness (Blackwell), a lossless dictionary with $(\varepsilon,\delta)$-DP (used later to import subsampling), and group privacy.

## Main Content

### Post-processing and informativeness (Sec. 2.3)

> [!theorem] Proposition 2.8 and Lemma 2.9
> If $M$ is $f$-DP, then $\text{Proc}\circ M$ is $f$-DP for any (randomized) $\text{Proc}:Y\to Z$. This follows from: for any distributions $P,Q$, $T(\text{Proc}(P),\text{Proc}(Q))\ge T(P,Q)$.
^thm-fdp-postprocessing

> [!theorem] Theorem 2.10 (Blackwell, 1950)
> For $P,Q$ on $Y$ and $P',Q'$ on $Z$ the following are equivalent: (a) $T(P,Q)\le T(P',Q')$; (b) there exists a randomized algorithm $\text{Proc}:Y\to Z$ with $\text{Proc}(P)=P'$, $\text{Proc}(Q)=Q'$.
^thm-blackwell

Post-processing induces the **Blackwell order** $\preceq_{\text{Blackwell}}$ on pairs of distributions ("easier to distinguish in the Blackwell sense"); $T(P,Q)\le T(P',Q')$ defines the testing order. Any privacy notion with post-processing has an induced order containing Blackwell's, but should not be much larger: the trivial divergence $D_0\equiv0$ has the largest order and is uninformative. $f$-DP is the **most informative** notion in that $\text{Ineq}(\preceq_{\text{trade-off}})=\text{Ineq}(\preceq_{\text{Blackwell}})$, whereas this fails for Renyi DP and $(\varepsilon,\delta)$-DP (proved in Appendix B, see [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]).

### Primal-dual perspective (Sec. 2.4)

> [!theorem] Proposition 2.11 (dual to primal)
> Let $I$ be an index set with $\varepsilon_i\in[0,\infty)$, $\delta_i\in[0,1]$. A mechanism is $(\varepsilon_i,\delta_i)$-DP for all $i\in I$ if and only if it is $f$-DP with $f=\sup_{i\in I}f_{\varepsilon_i,\delta_i}$.
^thm-dual-to-primal

> [!theorem] Proposition 2.12 (primal to dual)
> For a symmetric trade-off function $f$ (extended by $f(x)=\infty$ for $x<0$ and $x>1$), with convex conjugate $g^*(y)=\sup_x\{yx-g(x)\}$, a mechanism is $f$-DP if and only if it is $(\varepsilon,\delta(\varepsilon))$-DP for all $\varepsilon\ge0$ with
> $$\delta(\varepsilon)=1+f^*(-e^{\varepsilon}).$$
^thm-primal-to-dual

> [!theorem] Corollary 2.13 (GDP to $(\varepsilon,\delta)$)
> A mechanism is $\mu$-GDP if and only if it is $(\varepsilon,\delta(\varepsilon))$-DP for all $\varepsilon\ge0$, where
> $$\delta(\varepsilon)=\Phi\Big(-\frac\varepsilon\mu+\frac\mu2\Big)-e^{\varepsilon}\Phi\Big(-\frac\varepsilon\mu-\frac\mu2\Big).$$
^thm-gdp-eps-delta

The conversion is exact: any $(\varepsilon,\delta)$ guarantee derived for the Gaussian mechanism is implied by this corollary (it appeared earlier in Balle-Wang; "privacy profile" of Balle-Barthe-Gaboardi is an infinite collection of $(\varepsilon,\delta)$). Figure 4: each $(\varepsilon,\delta(\varepsilon))$ guarantee corresponds to two supporting lines (symmetric to each other) of the trade-off function, so keeping only a subset of $(\varepsilon,\delta)$ pairs (say, only small $\delta$) loses information. The primal view is easier for composition; the dual view (lower complexity of two parameters) is convenient for importing subsampling results ([[Dong Roth Su 2022 - Privacy Amplification by Subsampling]]).

### Group privacy (Sec. 2.5)

Datasets $S,S'$ are **$k$-neighbors** if there is a chain $S=S_0,\dots,S_k=S'$ with consecutive datasets neighboring or identical. $M$ is $f$-DP **for groups of size $k$** if $T(M(S),M(S'))\ge f$ for all $k$-neighbors.

> [!theorem] Theorem 2.14 (group privacy)
> If a mechanism is $f$-DP then it is $\big[1-(1-f)^{\circ k}\big]$-DP for groups of size $k$, where $h^{\circ k}$ is the $k$-fold iterated composition ($h^{\circ2}(x)=h(h(x))$). In particular, if a mechanism is $\mu$-GDP then it is $k\mu$-GDP for groups of size $k$.
^thm-group-privacy

$1-(1-f)^{\circ k}$ is a trade-off function, symmetric if $f$ is; the bound is closed and tight (cannot be improved in general), and $1-(1-f)^{\circ k}\le1-(1-f)^{\circ(k-1)}$, consistent with larger groups being easier to detect (proved in Appendix A).

> [!theorem] Proposition 2.15 (Laplace limit of group pure DP)
> Fix $\mu\ge0$ and set $\varepsilon=\mu/k$. As $k\to\infty$, $1-(1-f_{\varepsilon,0})^{\circ k}\to T\big(\text{Lap}(0,1),\text{Lap}(\mu,1)\big)$ uniformly on $[0,1]$.
^thm-laplace-limit

Two remarks: $T(\text{Lap}(0,1),\text{Lap}(\mu,1))$ is not equal to $f_{\varepsilon,\delta}$ for any $(\varepsilon,\delta)$, so $(\varepsilon,\delta)$-DP is not expressive enough for the group operation; and the approximation is accurate even for small $k$: for $\mu=1,k=4$ it is within 0.005 uniformly. ($\text{Lap}(\mu,b)$ has density $\frac1{2b}e^{-|x-\mu|/b}$.)

## Examples

> [!example] Group privacy for a household
> Setup: a release is $0.5$-GDP per individual; a household has $k=4$ members whose records are correlated and all enter the dataset.
> Solution: Theorem 2.14 gives $4\times0.5=2$-GDP for the group. At $\delta=10^{-5}$, 0.5-GDP corresponds to $\varepsilon\approx1.99$ and 2-GDP to $\varepsilon\approx10.0$ (recomputed from Corollary 2.13).
> Interpretation: protecting a group of four costs a fivefold increase in $\varepsilon$ at the same $\delta$ here, but only a linear increase in $\mu$, which is the natural scale. For marketing data where one household contributes many devices, group size matters for the claimed level.
^ex-group-privacy

## Connections

- RDP post-processing and group privacy are weaker analogues (order halves, $\varepsilon$ triples): [[Mironov 2017 - RDP Properties and Composition]].
- The Blackwell/Neyman-Pearson viewpoint is the basis for the composition theorem: [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]].
- Subsampling uses the dual representation: [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]].

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]
