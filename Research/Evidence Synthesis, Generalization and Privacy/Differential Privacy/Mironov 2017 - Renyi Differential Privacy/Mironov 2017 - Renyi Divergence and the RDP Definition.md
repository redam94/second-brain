---
title: "Mironov 2017 - Renyi Divergence and the RDP Definition"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Sec. II and Sec. III (Definitions 1-4, Remarks 1-2), pp. 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - Renyi Differential Privacy - Overview]]"
used_by:
  - "[[Mironov 2017 - RDP Properties and Composition]]"
  - "[[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]"
  - "[[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]"
aliases:
  - Renyi divergence definition for privacy
  - RDP definition
  - (alpha, epsilon)-RDP
---

# Mironov 2017 - Renyi Divergence and the RDP Definition

> [!summary]
> Section II reviews $\varepsilon$-DP, $(\varepsilon,\delta)$-DP, the Laplace and Gaussian mechanisms and why $(\varepsilon,\delta)$ is an imperfect fit for them. Section III defines the Renyi divergence $D_\alpha$ and $(\alpha,\varepsilon)$-RDP: $D_\alpha(f(D)\Vert f(D'))\le\varepsilon$ for adjacent $D,D'$. Pure DP is the $\alpha=\infty$ case, and monotonicity of $D_\alpha$ in $\alpha$ means $(\infty,\varepsilon)$-RDP implies $(\alpha,\varepsilon)$-RDP for all finite $\alpha$.

## Overview

The conceptual move is to measure closeness of the output distributions by a one-parameter family of divergences rather than a worst-case density ratio ($\varepsilon$-DP) or a tail-mass slack ($\delta$). The parameter $\alpha$ selects which moment of the privacy loss to control.

## Main Content

### Background definitions (Sec. II)

> [!definition] Definition 1: $\varepsilon$-DP
> A randomized mechanism $f:\mathcal D\mapsto\mathcal R$ satisfies $\varepsilon$-DP if for any adjacent $D,D'\in\mathcal D$ and $S\subset\mathcal R$: $\Pr[f(D)\in S]\le e^{\varepsilon}\Pr[f(D')\in S]$. Adjacency is domain-specific, typically capturing the contribution of one individual.
^def-mironov-eps-dp

> [!definition] Laplace mechanism
> $\mathcal L_\varepsilon f(x)\triangleq f(x)+\Lambda(0,\Delta_1f/\varepsilon)$ where $\Lambda$ is the Laplace distribution and $\Delta_1f\triangleq\max_{D,D'}\|f(D)-f(D')\|_1$. **Basic composition**: if $f,g$ are $\varepsilon_1$- and $\varepsilon_2$-DP then releasing $(f(D),g(D))$ is $(\varepsilon_1+\varepsilon_2)$-DP, even if $g$ is chosen adaptively after seeing $f(D)$.
^def-mironov-laplace

> [!definition] Definition 2: $(\varepsilon,\delta)$-DP
> $f$ offers $(\varepsilon,\delta)$-DP if for adjacent $D,D'$ and $S\subset\mathcal R$: $\Pr[f(D)\in S]\le e^{\varepsilon}\Pr[f(D')\in S]+\delta$.
^def-mironov-approx-dp

**Why $(\varepsilon,\delta)$ is qualitatively different from pure DP.** The informal reading "$\varepsilon$-DP except with probability $\delta$" is hard to formalize: for two inputs one can build an $\varepsilon$-DP mechanism agreeing with $f$ on all but $\delta$ probability, but not for exponentially large input domains without exponentially diluting the guarantee. The $\delta$ term also hides two very different failure modes. With probability $\delta$, privacy may degrade gracefully (to $\varepsilon_1$-DP w.p. $\delta/2$, $\varepsilon_2$-DP w.p. $\delta/4$, and so on), leaving residual deniability, or the secret (whether a record is present) may become completely exposed. A single $(\varepsilon,\delta)$ statement cannot distinguish them. The standard advice is $\delta\ll1/N$ or negligible in $N$.

**Gaussian mechanism.** $\mathcal G_\sigma f(x)\triangleq f(x)+\mathcal N(0,\sigma^2)$. It cannot satisfy $\varepsilon$-DP for any $\varepsilon$; instead it satisfies a continuum of incomparable $(\varepsilon,\delta)$ guarantees for $\varepsilon<1$ and $\sigma>\sqrt{2\ln(1.25/\delta)}\,\Delta_2f/\varepsilon$, with $\Delta_2f\triangleq\max\|f(D)-f(D')\|_2$. Reasons to prefer Gaussian over Laplace: Gaussian noise is closed under addition (like errors already in the data), noise scales with $\ell_2$ not $\ell_1$ sensitivity (no larger, often much smaller), and Gaussian tails decay faster than exponential tails.

**Advanced composition.** For $k$-fold adaptive composition of an $(\varepsilon,\delta)$-DP mechanism, for any $\delta'>0$ the composite is $(\varepsilon',k\delta+\delta')$-DP with $\varepsilon'=\sqrt{2k\ln(1/\delta')}\,\varepsilon+k\varepsilon(e^\varepsilon-1)$ (Dwork, Rothblum, Vadhan). Kairouz et al. give the optimal $k$-fold bound for a single $(\varepsilon,\delta)$; Murtagh and Vadhan show that composing heterogeneous mechanisms optimally is #P-hard, with a PTAS. None of these handles mechanisms that satisfy several $(\varepsilon,\delta)$ guarantees at once.

**Related relaxations.** *CDP and zCDP* (Dwork-Rothblum; Bun-Steinke) require a linear bound on **all** positive moments of the privacy-loss variable; RDP applies to one moment at a time. The *moments accountant* ([[Abadi 2016 - Moments Accountant Theorems and Proofs]]) introduced the same quantity internally with a lossy translation to $(\varepsilon,\delta)$. *IND-CDP* limits the adversary computationally; *Pufferfish* and *coupled-worlds* use different stability constraints but the same closeness notion as $(\varepsilon,\delta)$.

### Renyi divergence and RDP (Sec. III)

> [!definition] Definition 3: Renyi divergence
> For distributions $P,Q$ over $\mathbb R$, the Renyi divergence of order $\alpha>1$ is
> $$D_\alpha(P\Vert Q)\triangleq\frac1{\alpha-1}\log\mathbb E_{x\sim Q}\Big[\Big(\frac{P(x)}{Q(x)}\Big)^{\alpha}\Big].$$
> All logarithms are natural. At the endpoints, by continuity: $D_1(P\Vert Q)=\lim_{\alpha\to1}D_\alpha=\mathbb E_{x\sim P}\log\frac{P(x)}{Q(x)}$ (the Kullback-Leibler divergence; note the expectation is over $P$), and $D_\infty(P\Vert Q)=\sup_{x\in\text{supp}Q}\log\frac{P(x)}{Q(x)}$. It is possible that $D_1$ is finite while $D_\alpha=+\infty$ for every $\alpha>1$.
^def-renyi-divergence

A mechanism $f$ is $\varepsilon$-DP **if and only if** $D_\infty(f(D)\Vert f(D'))\le\varepsilon$ for all adjacent $D,D'$. This motivates the relaxation.

> [!definition] Definition 4: $(\alpha,\varepsilon)$-RDP
> A randomized mechanism $f:\mathcal D\mapsto\mathcal R$ has $\varepsilon$-Renyi differential privacy of order $\alpha$, or $(\alpha,\varepsilon)$-RDP, if for any adjacent $D,D'\in\mathcal D$,
> $$D_\alpha\big(f(D)\,\Vert\,f(D')\big)\le\varepsilon.$$
^def-rdp

**Remark 1.** A finite $\varepsilon$ implies that feasible outcomes of $f(D)$ for some $D$ are feasible (non-zero density) for all inputs, except on a measure-zero set; the event space is taken to be the support. **Remark 2.** Renyi divergence can be defined for $\alpha<1$, including negative orders, but those are not used in the definition.

By monotonicity of $D_\alpha$ in $\alpha$ ([[Mironov 2017 - Appendix Renyi Divergence Properties]], Prop. 9), $(\infty,\varepsilon)$-RDP implies $(\alpha,\varepsilon)$-RDP for every finite $\alpha$, so RDP is a relaxation that contains pure DP as an end point. A mechanism's guarantee is a **curve** $\varepsilon(\alpha)$, which Mironov calls its budget curve.

## Examples

> [!example] Divergence of two Gaussians as a one-line RDP bound
> Setup: $P=\mathcal N(0,\sigma^2)$, $Q=\mathcal N(\mu,\sigma^2)$. Solution: $D_\alpha(P\Vert Q)=\alpha\mu^2/(2\sigma^2)$ (Proposition 7). For adjacent inputs with $|f(D)-f(D')|\le1$, $\mu\le1$, hence $(\alpha,\alpha/(2\sigma^2))$-RDP.
> Interpretation: the budget curve is a straight line through the origin with slope $1/(2\sigma^2)$. No $\delta$ appears. Details in [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]].
^ex-gaussian-rdp-def

## Connections

- Properties of RDP: [[Mironov 2017 - RDP Properties and Composition]]; conversion to $(\varepsilon,\delta)$: [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]].
- KL divergence appears at $\alpha=1$; for KL in a Bayesian context see [[The ELBO and KL Divergence Minimization]].
- The hypothesis-testing view treats DP as a trade-off between type I and type II errors; see [[Dong Roth Su 2022 - Trade-off Functions and f-DP]].

## See Also

- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]] (zCDP is $D_\alpha\le\rho\alpha$ for all $\alpha>1$)
