---
title: "Mironov 2017 - Renyi Differential Privacy - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Whole paper, CSF 2017 (arXiv 1702.07476v3), pp. 1-13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - Renyi Divergence and the RDP Definition]]"
  - "[[Mironov 2017 - RDP Properties and Composition]]"
used_by:
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]"
  - "[[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]"
aliases:
  - RDP paper overview
  - Mironov RDP overview
---

# Mironov 2017 - Renyi Differential Privacy - Overview

> [!summary]
> Mironov defines $(\alpha,\varepsilon)$-Renyi differential privacy (RDP): the Renyi divergence of order $\alpha$ between output distributions on adjacent inputs is at most $\varepsilon$. RDP is a strictly stronger notion than $(\varepsilon,\delta)$-DP, generalizes pure DP (the case $\alpha=\infty$), composes by simply adding the curves $\alpha\mapsto\varepsilon(\alpha)$, and makes the Gaussian mechanism trivial to analyze ($\varepsilon(\alpha)=\alpha/(2\sigma^2)$ for unit sensitivity). It converts back to $(\varepsilon,\delta)$-DP via $\varepsilon+\log(1/\delta)/(\alpha-1)$.

## Overview

**Problem.** $(\varepsilon,\delta)$-DP fits poorly its two most common uses. A single Gaussian mechanism satisfies a whole *curve* of incomparable $(\varepsilon(\delta),\delta)$ guarantees, so reporting one point discards information. Advanced composition yields a combinatorial explosion of $(\varepsilon,\delta)$ choices, and optimal composition of heterogeneous mechanisms is #P-hard (Murtagh and Vadhan).

**Contribution.** A privacy definition based on Renyi divergence that (i) shares the key properties of DP (Table I), (ii) is analytically tractable for Gaussian noise, (iii) restores a *privacy budget* (curves add) while still allowing advanced-composition-type bounds (Proposition 4), and (iv) converts to $(\varepsilon,\delta)$-DP (Proposition 3).

**Relation to prior work.** Concentrated DP and zero-concentrated DP (Dwork-Rothblum; Bun-Steinke) require a *linear* bound on all positive moments of the privacy-loss variable. RDP bounds **one moment at a time**: less restrictive and allowing more accurate numerics. The moments accountant of [[Abadi 2016 - Moments Accountant Theorems and Proofs]] introduced the same quantity as an internal tool, with a lossy translation to $(\varepsilon,\delta)$.

**Key results.**

| Result | Statement |
|---|---|
| $\varepsilon$-DP $\iff$ $(\infty,\varepsilon)$-RDP | $D_\infty(f(D)\Vert f(D'))\le\varepsilon$ |
| Composition (Prop. 1) | $(\alpha,\varepsilon_1)$ then $(\alpha,\varepsilon_2)$ gives $(\alpha,\varepsilon_1+\varepsilon_2)$ |
| RDP to DP (Prop. 3) | $(\alpha,\varepsilon)$-RDP $\Rightarrow(\varepsilon+\frac{\log(1/\delta)}{\alpha-1},\delta)$-DP |
| Gaussian (Cor. 3) | $\sigma$-noise on sensitivity 1 is $(\alpha,\alpha/(2\sigma^2))$-RDP |
| Advanced composition (Cor. 1) | $n$-fold $\varepsilon$-DP is $(4\varepsilon\sqrt{2n\log(1/\delta)},\delta)$-DP when $\log(1/\delta)\ge\varepsilon^2n$ |

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, I Introduction | motivation, contributions, outline | this note |
| II Differential privacy and its flavors (Defs. 1-2, Laplace, Gaussian, advanced composition, CDP/zCDP/moments accountant, other relaxations) | background | [[Mironov 2017 - Renyi Divergence and the RDP Definition]] |
| III Renyi DP (Defs. 3-4, Remarks 1-2, Table I, Prop. 1, Prop. 2) | definition and properties | [[Mironov 2017 - Renyi Divergence and the RDP Definition]]; [[Mironov 2017 - RDP Properties and Composition]] |
| IV RDP and $(\varepsilon,\delta)$-DP (Prop. 3) | conversion | [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]] |
| V Advanced composition theorem (Lemma 1, Prop. 4, Cor. 1, Remark 3) | composition | [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]] |
| VI Basic mechanisms (Props. 5-7, Cors. 2-3, Tables II, Figs. 1-2) | randomized response, Laplace, Gaussian | [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] |
| VII Discussion (probabilistic guarantee, baseline-dependent bounds, tracking, Fig. 3) | interpretation | [[Mironov 2017 - Discussion, Budget Curves and Open Questions]] |
| VIII Conclusions and open questions | summary | [[Mironov 2017 - Discussion, Budget Curves and Open Questions]] |
| Appendix (Props. 8-11, Cor. 4) | Renyi divergence facts | [[Mironov 2017 - Appendix Renyi Divergence Properties]] |

## Examples

> [!example] The one-line reason to prefer RDP for Gaussian noise
> $n$ compositions of a Gaussian mechanism with parameter $\sigma$ (unit sensitivity) have RDP curve $\alpha\mapsto n\alpha/(2\sigma^2)$, identical to a single Gaussian with parameter $\sigma/\sqrt n$. No $(\varepsilon,\delta)$ bookkeeping is needed until the very end.
^ex-rdp-gaussian

## Connections

- Accounting for DP-SGD: [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]].
- Hypothesis-testing refinement that is strictly more informative than any divergence: [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]].
- A real deployment that uses the zCDP member of this family: [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]].
- Marketing relevance: [[Mironov 2017 - Discussion, Budget Curves and Open Questions]] (budget curves for multi-release reporting).

## See Also

- [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]
- [[Mironov 2017 - RDP Properties and Composition]]
- [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] — basic composition and privacy-loss divergence background.
- [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] — the advanced composition theorem RDP re-derives.
