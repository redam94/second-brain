---
title: "Mironov 2017 - Appendix Renyi Divergence Properties"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Appendix, Propositions 8-11 and Corollary 4, pp. 11-13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - Renyi Divergence and the RDP Definition]]"
used_by:
  - "[[Mironov 2017 - RDP Properties and Composition]]"
  - "[[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]"
aliases:
  - Renyi divergence non-negativity monotonicity
  - probability preservation Renyi
  - weak triangle inequality Renyi
---

# Mironov 2017 - Appendix Renyi Divergence Properties

> [!summary]
> The appendix recalls and re-proves four facts about Renyi divergence used throughout: non-negativity (Prop. 8), monotonicity in the order (Prop. 9), probability preservation (Prop. 10; the engine of the "bad outcomes" bound and of the RDP-to-DP conversion), and a weak triangle inequality (Prop. 11, with four special cases in Cor. 4).

## Overview

Renyi divergence is not a metric: it is not symmetric and does not satisfy the triangle inequality. A weaker triangle inequality relating different orders does hold. For a comprehensive treatment the paper points to two references on Renyi divergence (van Erven and Harremoes; Langlois et al.).

## Main Content

> [!theorem] Proposition 8 (non-negativity)
> For $\alpha\ge1$ and arbitrary distributions $P,Q$: $D_\alpha(P\Vert Q)\ge0$.
^thm-renyi-nonneg

*Proof.* For $\alpha>1$ let $\varphi(x)=x^{1-\alpha}$ (convex) and $g(x)=Q(x)/P(x)$. Then $D_\alpha=\frac1{\alpha-1}\log\mathbb E_P[\varphi(g)]\ge\frac1{\alpha-1}\log\varphi(\mathbb E_P[g])=0$ by Jensen, since $\mathbb E_P[g]=\int Q=1$. For $\alpha=1$ use $\varphi(x)=\log(1/x)$.

> [!theorem] Proposition 9 (monotonicity)
> For $1\le\alpha<\beta$: $D_\alpha(P\Vert Q)\le D_\beta(P\Vert Q)$.
^thm-renyi-monotone

*Proof (following van Erven-Harremoes).* The map $x\mapsto x^{\frac{\alpha-1}{\beta-1}}$ is concave. Write $D_\alpha=\frac1{\alpha-1}\log\mathbb E_P\big[(P/Q)^{\alpha-1}\big]=\frac1{\alpha-1}\log\mathbb E_P\big[((P/Q)^{\beta-1})^{\frac{\alpha-1}{\beta-1}}\big]$ and apply Jensen to get $\le\frac1{\alpha-1}\log\big\{\mathbb E_P[(P/Q)^{\beta-1}]\big\}^{\frac{\alpha-1}{\beta-1}}=D_\beta$. The case $\alpha=1$ follows by continuity.

> [!theorem] Proposition 10 (probability preservation; Langlois et al.)
> Let $\alpha>1$ and let $P,Q$ be distributions over $\mathcal R$ with identical support. For any event $A\subset\mathcal R$,
> $$
> P(A)\le\big(\exp[D_\alpha(P\Vert Q)]\cdot Q(A)\big)^{(\alpha-1)/\alpha}.
> $$
^thm-prob-preservation

*Proof.* Hölder: $\|fg\|_1\le\|f\|_p\|g\|_q$ for $1/p+1/q=1$. Take $p=\alpha$, $q=\alpha/(\alpha-1)$, $f=P/Q^{1/q}$, $g=Q^{1/q}$:
$$
\int_AP\le\Big(\int_AP^\alpha Q^{1-\alpha}\Big)^{1/\alpha}\Big(\int_AQ\Big)^{(\alpha-1)/\alpha}\le\exp[D_\alpha(P\Vert Q)]^{(\alpha-1)/\alpha}Q(A)^{(\alpha-1)/\alpha}.
$$
The bound's dependence on $\alpha$ is often non-monotone: as $\alpha\to1$, $D_\alpha$ shrinks but the exponent $(\alpha-1)/\alpha\to0$, pushing the other way. Several proofs find the optimal or approximately optimal $\alpha$.

> [!theorem] Proposition 11 (weak triangle inequality)
> For distributions $P,Q,R$, $\alpha>1$ and any $p,q>1$ with $1/p+1/q=1$,
> $$
> D_\alpha(P\Vert Q)\le\frac{\alpha-1/p}{\alpha-1}D_{p\alpha}(P\Vert R)+D_{q(\alpha-1/p)}(R\Vert Q).
> $$
^thm-weak-triangle

*Proof.* Write $e^{(\alpha-1)D_\alpha(P\Vert Q)}=\int P^\alpha Q^{1-\alpha}=\int\frac{P^\alpha}{R^{\alpha-1/p}}\cdot\frac{R^{\alpha-1/p}}{Q^{\alpha-1}}$ and apply Hölder with exponents $p,q$:
$$
\le\Big(\int P^{p\alpha}R^{1-p\alpha}\Big)^{1/p}\Big(\int R^{q\alpha-q/p}Q^{q-q\alpha}\Big)^{1/q}=\exp\big[(\alpha-\tfrac1p)D_{p\alpha}(P\Vert R)\big]\cdot\exp\big[(\alpha-1)D_{q\alpha-q/p}(R\Vert Q)\big].
$$
(The exponent of $Q$ equals $1-(q\alpha-q/p)$ because $1/p+1/q=1$.) Take logs and divide by $\alpha-1$. The case $\alpha=1$ follows by continuity.

> [!theorem] Corollary 4 (special cases for $P,Q,R$ with common support)
> 1. $D_\alpha(P\Vert Q)\le\frac{\alpha-1/2}{\alpha-1}D_{2\alpha}(P\Vert R)+D_{2\alpha-1}(R\Vert Q)$ (choose $p=q=2$).
> 2. $D_\alpha(P\Vert Q)\le\frac{\alpha}{\alpha-1}D_\infty(P\Vert R)+D_\alpha(R\Vert Q)$ ($p\to\infty$, $q\to1$).
> 3. $D_\alpha(P\Vert Q)\le D_\alpha(P\Vert R)+D_\infty(R\Vert Q)$ ($q\to\infty$, $p\to1$).
> 4. $D_\alpha(P\Vert Q)\le\frac{\alpha-\alpha/\beta}{\alpha-1}D_\beta(P\Vert R)+D_\beta(R\Vert Q)$ for an explicit $\beta=2\alpha-0.5+O(1/\alpha)$ (choose $\alpha p=\alpha q-1$ with $1/p+1/q=1$; then $\beta=p\alpha$).
^thm-cor4

Corollary 4(1) is the step used in Proposition 2 (group privacy) in [[Mironov 2017 - RDP Properties and Composition]].

## Examples

> [!example] Probability preservation for an RDP mechanism
> Setup: $(\alpha,\varepsilon)=(2,0.5)$, $Q(A)=0.01$.
> Solution: $P(A)\le(e^{0.5}\times0.01)^{1/2}=(0.01649)^{0.5}=0.1284$.
> Interpretation: an event with 1% baseline probability could have probability up to about 12.8% under the neighbouring input. The pure-DP analogue with $\varepsilon=0.5$ would allow only $e^{0.5}\times0.01\approx1.65\%$. This shows how much weaker the RDP bound is at low $\alpha$ and small baselines, and why the order $\alpha$ must be optimized; the numbers are recomputed here.
^ex-prob-pres

## Connections

- Consumers of these propositions: composition and conversion in [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]; bad-outcome tables in [[Mironov 2017 - Discussion, Budget Curves and Open Questions]].
- Data-processing for hypothesis tests (Blackwell) is the exact analogue of the post-processing property here: [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]].
- KL ($\alpha=1$) background: [[The ELBO and KL Divergence Minimization]].

## See Also

- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Mironov 2017 - Renyi Divergence and the RDP Definition]]
