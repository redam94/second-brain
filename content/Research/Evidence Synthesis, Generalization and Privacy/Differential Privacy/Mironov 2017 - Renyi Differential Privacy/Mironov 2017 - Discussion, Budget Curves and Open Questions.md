---
title: "Mironov 2017 - Discussion, Budget Curves and Open Questions"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Sec. VII (Discussion, Figure 3) and Sec. VIII (Conclusions), pp. 9-11"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]"
  - "[[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]"
used_by:
  - "[[Mironov 2017 - Renyi Differential Privacy - Overview]]"
aliases:
  - RDP discussion
  - RDP privacy budget curves
  - RDP open questions
---

# Mironov 2017 - Discussion, Budget Curves and Open Questions

> [!summary]
> RDP never permits a total privacy breach with no residual uncertainty, even at weak parameters: $\Pr[R_{\text{post}}>\beta R_{\text{prior}}]<e^{\varepsilon}/\beta^{1/(\alpha-1)}$. Its bound on a bad event depends on the baseline probability, which is more onerous to apply than pure DP but simpler and often tighter than $(\varepsilon,\delta)$. Reporting RDP at a common finite grid of $\alpha$ values (13 suffice in the paper's example) restores a *summable* privacy budget while preserving tight composition.

## Overview

Section VII argues for RDP against $(\varepsilon,\delta)$-DP on four counts: probabilistic guarantee, baseline-dependent guarantees, interpretability of composition bounds, and keeping track of accumulated loss. Section VIII lists findings and open questions.

## Main Content

### Probabilistic privacy guarantee

Pure DP: probability of a bad outcome rises by at most $e^\varepsilon$. $(\varepsilon,\delta)$-DP: additionally allows a $\delta$ term, enabling a complete compromise with probability $\delta$. RDP with any $\alpha>1$: the Bayes-factor moment bound of [[Mironov 2017 - RDP Properties and Composition]] plus Markov's inequality gives, as printed in the paper,
$$
\Pr\big[R_{\text{post}}(D,D')>\beta R_{\text{prior}}(D,D')\big]<\frac{e^{\varepsilon}}{\beta^{1/(\alpha-1)}}.
$$
(The exponent bookkeeping in the printed Section VII display is terse; the statement is quoted as printed and only the $\alpha=2$ reading below was used.) For $\alpha=2$ the probability that the posterior ratio grows by more than a factor $\beta$ decays like $O(1/\beta)$.

### Baseline-dependent guarantees

The RDP bound gets weaker for less likely outcomes. For a $(10.0,0.1)$-RDP mechanism, using $e^{-\varepsilon}Q^{\alpha/(\alpha-1)}\le P\le(e^\varepsilon Q)^{(\alpha-1)/\alpha}$ with $\alpha=10$, $\varepsilon=0.1$:

| $\Pr[f(D)\in S]=Q$ | Range of $\Pr[f(D')\in S]$ |
|---|---|
| 0.5 | $[0.419,\ 0.586]$ |
| $10^{-3}$ | $[0.00042,\ 0.00218]$ |
| $10^{-6}$ | $[0.195\times10^{-6},\ 4.36\times10^{-6}]$ |

(Recomputed values agree with the paper's.) In relative terms the range is wider for smaller events. To judge whether the increase in risk is tolerable one must first estimate the baseline risk, which is conceptually weaker and more onerous than pure DP. But compared with $(\varepsilon,\delta)$, the analysis is simpler and, for probabilities smaller than $\delta$, leads to stronger bounds, because $(\varepsilon,\delta)$ statements often come with an implicit $\varepsilon$-$\delta$ tradeoff that must be optimized given the baseline.

**Contrast of two equivalent advanced-composition statements.** Proposition 4 states the bound directly in the baseline probability: $\Pr[f(D')\in S]\le\exp(2\varepsilon\sqrt{n\log1/\Pr[f(D)\in S]})\Pr[f(D)\in S]$. Corollary 1 states it as $\le\exp(4\varepsilon\sqrt{2n\log1/\delta})\Pr[f(D)\in S]+\delta$ with a free parameter $\delta$ to optimize. The former is easier to interpret; the latter needs an optimization that Proposition 4 gives directly. For heterogeneous mechanisms the $(\varepsilon,\delta)$ form becomes even more complex.

### Keeping track of accumulated privacy loss

A finite per-individual privacy budget is intuitive; pure DP expresses it rigorously by additivity but naive summation exaggerates the loss, which grows sublinearly in the number of queries (advanced composition). Applying advanced composition destroys the abstraction of privacy as a non-negative real number: the guarantee becomes a single point on an implicit $(\varepsilon,\delta)$ curve. For many heterogeneous mechanisms one must choose which $(\varepsilon,\delta)$ points to represent each, in the analysis (not at run time). Distilling to one number discards information; publishing the whole curve shifts the problem to aggregation.

RDP restores the budget: RDP curves of composed mechanisms **add**, and the $\alpha$'s do not change. If every mechanism reports RDP at a common set of orders (including $+\infty$ to track pure DP), the aggregate is the sum of the reported vectors, and since Proposition 4 takes the mechanism's RDP curve as input, the sublinear growth is preserved.

> [!example] Figure 3: a mixed iterative mechanism
> Setup: an iterated mechanism made of randomized response ($p=0.52$), Laplace ($\lambda=20$) and Gaussian ($\sigma=10$), run for up to 100 iterations. Its RDP curve is the sum of the three closed forms (Table II). The figure bounds $\Pr[f(D')\in S]/\Pr[f(D)\in S]$ for baseline mass $0.1,10^{-3},10^{-6}$, once with optimal $\alpha\in(1,+\infty]$ and once with $\alpha$ restricted to the 13 values $\{1.5,1.75,2,2.5,3,4,5,6,8,16,32,64,+\infty\}$.
> Result: the two curves are nearly identical, supporting the thesis that reporting RDP on a restricted set of orders preserves tightness. The right panel plots the optimal $\alpha$ (log scale) over iterations.
^ex-figure3-mixed

### Conclusions and open questions (Sec. VIII)

Findings: RDP generalizes pure DP; shares (with adaptations) the properties that make DP useful; Gaussian analysis is particularly simple; a composition theorem follows from RDP properties alone, so the curve packs enough information about a composite mechanism that analysis needs no component details; and an RDP curve sampled at a few consistent points suffices to estimate aggregate loss.

Open questions: (1) Lemma 1 shows the RDP curve of a pure-DP mechanism is severely constrained; using those constraints more fully, e.g. for formal tightness bounds from select $\alpha$, is promising. (2) Proposition 10 (probability preservation) is not tight as $D_\alpha(P\Vert Q)\to0$: one expects $P(A)\to Q(A)$ but the bound does not improve beyond $P(A)^{(\alpha-1)/\alpha}$-type behaviour.

## Examples

```python
import numpy as np

def bad_event_range(Q, alpha, eps):
    """Range of Pr[f(D') in S] given Pr[f(D) in S]=Q for an (alpha, eps)-RDP mechanism (Table I)."""
    lo = np.exp(-eps) * Q ** (alpha / (alpha - 1))
    hi = (np.exp(eps) * Q) ** ((alpha - 1) / alpha)
    return lo, hi

for Q in (0.5, 1e-3, 1e-6):
    print(Q, bad_event_range(Q, 10.0, 0.1))
# (0.419, 0.586), (0.00042, 0.00218), (1.95e-07, 4.36e-06)
```

> [!example] Grounded marketing reading (inference)
> A measurement partner that releases many reports about the same users over time (daily conversion counts, weekly lift readouts, segment breakdowns) faces exactly the "accumulated loss" question. RDP-style accounting answers it by adding per-$\alpha$ curves across *heterogeneous* releases (counts with Gaussian noise, a randomized-response survey flag, a Laplace-noised ratio), then converting once at the end. This is a conceptual mapping; the paper does not discuss advertising.
^ex-marketing-releases

## Connections

- The same additive-curve idea is the engine of the moments accountant: [[Abadi 2016 - Moments Accountant Theorems and Proofs]].
- Hypothesis-testing semantics avoid the baseline dependence discussed here: [[Dong Roth Su 2022 - Trade-off Functions and f-DP]].
- Large-scale use of a linear RDP curve (zCDP): [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]].
- For conversion-lift readouts as a releasing process: [[Conversion Lift Studies on Ad Platforms]].

## See Also

- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Mironov 2017 - Appendix Renyi Divergence Properties]]
