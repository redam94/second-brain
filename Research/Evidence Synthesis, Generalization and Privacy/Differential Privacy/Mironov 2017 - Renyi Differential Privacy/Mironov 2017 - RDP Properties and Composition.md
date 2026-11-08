---
title: "Mironov 2017 - RDP Properties and Composition"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Sec. III (Table I, Propositions 1-2), pp. 3-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - Renyi Divergence and the RDP Definition]]"
  - "[[Mironov 2017 - Appendix Renyi Divergence Properties]]"
used_by:
  - "[[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]"
  - "[[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]"
aliases:
  - RDP post-processing and composition
  - RDP bad outcomes guarantee
  - RDP group privacy
---

# Mironov 2017 - RDP Properties and Composition

> [!summary]
> RDP inherits the properties that make DP useful: a "bad outcomes" guarantee (weaker than $e^\varepsilon$ but never a total breach), a Bayes-factor interpretation, closure under post-processing, **additive adaptive composition at each order** (Proposition 1), and group privacy under stable transformations (Proposition 2). Table I places these side by side with pure DP.

## Overview

Section III verifies, one by one, that the relaxed definition preserves the desiderata of pure DP. The key facts: $\varepsilon_1+\varepsilon_2$ composition holds at each fixed $\alpha$, so a privacy *budget* (per order) is restored.

## Main Content

### Bad-outcomes guarantee

For pure DP, if some outputs $S$ are labelled "bad", their probability changes by at most a factor $e^{\varepsilon}$ whether or not a person's record is included. For $(\alpha,\varepsilon)$-RDP the bound is the probability-preservation inequality (Proposition 10, [[Mironov 2017 - Appendix Renyi Divergence Properties]]):
$$e^{-\varepsilon}\Pr[f(D')\in S]^{\alpha/(\alpha-1)}\ \le\ \Pr[f(D)\in S]\ \le\ \big(e^{\varepsilon}\Pr[f(D')\in S]\big)^{(\alpha-1)/\alpha}.$$

### Robustness to auxiliary information (Bayes factor)

For pure DP, with any prior $p(D)$ and observation $X$, the posterior odds satisfy $\frac{p(D\mid X)}{p(D'\mid X)}\le e^{\varepsilon}\frac{p(D)}{p(D')}$. For RDP, define $R(D,D')=\frac{p(D'\mid X)}{p(D\mid X)}$ where $X\sim f(D)$; $R_{\text{post}}/R_{\text{prior}}=\frac{p(X\mid D')}{p(X\mid D)}$, and
$$\mathbb E_{f(D)}\Big[\Big(\frac{R_{\text{post}}(D,D')}{R_{\text{prior}}(D,D')}\Big)^{\alpha}\Big]=\exp\big[(\alpha-1)D_\alpha(f(D')\Vert f(D))\big]\le e^{(\alpha-1)\varepsilon}.$$
Taking logs and Jensen: $\mathbb E_{f(D)}[\log R_{\text{post}}-\log R_{\text{prior}}]\le D_\alpha(f(D)\Vert f(D'))\le\varepsilon$ (it equals $D_1$, and uses monotonicity). Compare with pure DP, which gives $|\log R_{\text{post}}-\log R_{\text{prior}}|\le\varepsilon$ **everywhere**, not just in expectation.

> [!theorem] Post-processing
> If $f$ is $(\alpha,\varepsilon)$-RDP and $g:\mathcal R\mapsto\mathcal R'$ is a randomized mapping, then $g\circ f$ is $(\alpha,\varepsilon)$-RDP. Reason: the data-processing inequality $D_\alpha(P\Vert Q)\ge D_\alpha(g(P)\Vert g(Q))$.
^thm-rdp-postprocessing

> [!theorem] Proposition 1 (adaptive composition)
> Let $f:\mathcal D\mapsto\mathcal R_1$ be $(\alpha,\varepsilon_1)$-RDP and $g:\mathcal R_1\times\mathcal D\mapsto\mathcal R_2$ be $(\alpha,\varepsilon_2)$-RDP (for each fixed first argument). Then the mechanism outputting $(X,Y)$ with $X\sim f(D)$, $Y\sim g(X,D)$ satisfies $(\alpha,\varepsilon_1+\varepsilon_2)$-RDP.
^thm-rdp-composition

*Proof.* Write $X,Y,Z$ for the distributions of $f(D)$, $g(X,D)$ and the joint $h(D)$, and $X',Y',Z'$ for the same under $D'$.
$$e^{(\alpha-1)D_\alpha(h(D)\Vert h(D'))}=\iint Z^\alpha Z'^{1-\alpha}=\int X(x)^\alpha X'(x)^{1-\alpha}\Big[\int Y(x,y)^\alpha Y'(x,y)^{1-\alpha}dy\Big]dx\le e^{(\alpha-1)\varepsilon_2}\int X^\alpha X'^{1-\alpha}\le e^{(\alpha-1)(\varepsilon_1+\varepsilon_2)}.$$
The guarantee holds whether releases are coordinated or not, or computed over the same or different versions of the data. This yields a well-defined notion of a per-individual **privacy budget**: a finite resource consumed with each release. For RDP the budget is a *curve* parameterized by $\alpha$.

> [!definition] $c$-stable transformation and group privacy
> A map $g:\mathcal D'\mapsto\mathcal D$ is $c$-stable if $g(A),g(B)$ adjacent in $\mathcal D$ implies there is a chain $D_0=A,\dots,D_c=B$ in $\mathcal D'$ with each consecutive pair adjacent. For pure DP, if $f$ is $\varepsilon$-DP and $g$ is $c$-stable then $f\circ g$ is $c\varepsilon$-DP. Group privacy is the case where $g$ blows up one person's impact.
^def-c-stable

> [!theorem] Proposition 2 (group privacy / pre-processing)
> If $f:\mathcal D\mapsto\mathcal R$ is $(\alpha,\varepsilon)$-RDP, $g:\mathcal D'\mapsto\mathcal D$ is $2^c$-stable and $\alpha\ge2^{c+1}$, then $f\circ g$ is $(\alpha/2^c,\,3^c\varepsilon)$-RDP.
^thm-rdp-group

*Proof sketch ($c=1$, induction for the rest).* Since $g$ is 2-stable, for adjacent $D,D'\in\mathcal D'$ there is $A\in\mathcal D$ with $g(D),A$ and $A,g(D')$ adjacent. Corollary 4(1) (weak triangle inequality with $p=q=2$) and monotonicity give $D_{\alpha/2}(h(D)\Vert h(D'))\le\frac{\alpha-1}{\alpha-2}D_\alpha(h(D)\Vert h(A))+D_{\alpha-1}(h(A)\Vert h(D'))\le3\varepsilon$. So group privacy degrades both the order (halved) and the level ($\times3$), a weaker statement than pure DP's linear scaling.

### Table I: properties shared by DP and RDP

| Property | Differential privacy | Renyi differential privacy |
|---|---|---|
| Change in probability of outcome $S$ | $\Pr[f(D)\in S]\le e^{\varepsilon}\Pr[f(D')\in S]$; $\Pr[f(D)\in S]\ge e^{-\varepsilon}\Pr[f(D')\in S]$ | $\Pr[f(D)\in S]\le(e^{\varepsilon}\Pr[f(D')\in S])^{(\alpha-1)/\alpha}$; $\Pr[f(D)\in S]\ge e^{-\varepsilon}\Pr[f(D')\in S]^{\alpha/(\alpha-1)}$ |
| Change in the Bayes factor | $R_{\text{post}}/R_{\text{prior}}\le e^{\varepsilon}$ always | $\mathbb E[(R_{\text{post}}/R_{\text{prior}})^\alpha]\le\exp[(\alpha-1)\varepsilon]$ |
| Change in log of the Bayes factor | $\lvert\Delta\log R\rvert\le\varepsilon$ always | $\mathbb E[\Delta\log R]\le\varepsilon$ |
| Post-processing | $f$ is $\varepsilon$-DP $\Rightarrow g\circ f$ is $\varepsilon$-DP | $f$ is $(\alpha,\varepsilon)$-RDP $\Rightarrow g\circ f$ is $(\alpha,\varepsilon)$-RDP |
| Adaptive sequential composition (basic) | $f,g$ are $\varepsilon$-DP $\Rightarrow(f,g)$ is $2\varepsilon$-DP | $f,g$ are $(\alpha,\varepsilon)$-RDP $\Rightarrow(f,g)$ is $(\alpha,2\varepsilon)$-RDP |
| Group privacy, pre-processing | $f$ is $\varepsilon$-DP, $g$ is $2^c$-stable $\Rightarrow f\circ g$ is $2^c\varepsilon$-DP | $f$ is $(\alpha,\varepsilon)$-RDP, $g$ is $2^c$-stable $\Rightarrow f\circ g$ is $(\alpha/2^c,3^c\varepsilon)$-RDP |

## Examples

> [!example] Budget curve composition
> Setup: three Gaussian releases with $\sigma_1=\sigma_2=2$ and $\sigma_3=1$ (unit sensitivity).
> Solution: each has RDP curve $\alpha/(2\sigma_i^2)$. Adding at each $\alpha$: $\varepsilon(\alpha)=\alpha\big(\tfrac18+\tfrac18+\tfrac12\big)=0.75\,\alpha$, which equals the curve of a single Gaussian with $\sigma_{\text{eff}}^2=1/(2\cdot0.75)=2/3$.
> Interpretation: heterogeneous mechanisms are added per order with no $\delta$ choices; only at the end do we pick the best $\alpha$ for an $(\varepsilon,\delta)$ statement ([[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]).
^ex-rdp-budget

## Connections

- Conversion of the composed curve to $(\varepsilon,\delta)$: [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]].
- Exact f-DP counterpart of composition (tensor product), strictly more informative: [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]].
- zCDP is the special case where the budget curve is linear $\rho\alpha$ for all $\alpha>1$: [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]].

## See Also

- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Mironov 2017 - Discussion, Budget Curves and Open Questions]]
