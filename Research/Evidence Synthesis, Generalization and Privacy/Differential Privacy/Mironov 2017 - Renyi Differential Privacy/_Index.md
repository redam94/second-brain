---
title: "Index: Mironov 2017 - Renyi Differential Privacy"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 7
---

# Mironov 2017 - Renyi Differential Privacy

> [!abstract] Routing Summary
> This folder fully captures Mironov (2017), *Renyi Differential Privacy* (IEEE CSF 2017; arXiv 1702.07476): the definition of $(\alpha,\varepsilon)$-RDP via Renyi divergence, its DP-like properties (Table I, Propositions 1-2), conversion to $(\varepsilon,\delta)$-DP (Proposition 3), an advanced composition theorem (Lemma 1, Proposition 4, Corollary 1), the RDP curves of randomized response, Laplace and Gaussian (Table II), the discussion with Figure 3, and the appendix facts about Renyi divergence. It contains 7 notes covering every section, proposition and figure.
> - Need the paper on one page, key results table, or the section-to-note map? -> [[Mironov 2017 - Renyi Differential Privacy - Overview]]
> - Need the definition of Renyi divergence, $(\alpha,\varepsilon)$-RDP, the critique of $(\varepsilon,\delta)$, or related relaxations (CDP, zCDP, moments accountant)? -> [[Mironov 2017 - Renyi Divergence and the RDP Definition]]
> - Need post-processing, adaptive composition (Prop. 1), group privacy (Prop. 2), bad-outcomes bound, or Table I? -> [[Mironov 2017 - RDP Properties and Composition]]
> - Need $\varepsilon+\log(1/\delta)/(\alpha-1)$, Lemma 1, Proposition 4, or Corollary 1 with proofs and numbers? -> [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]
> - Need RDP curves for randomized response, Laplace or Gaussian (Table II), or Figures 1-2? -> [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]
> - Need baseline-dependent guarantees, tracking cumulative loss, Figure 3, or open questions? -> [[Mironov 2017 - Discussion, Budget Curves and Open Questions]]
> - Need non-negativity, monotonicity, probability preservation, or the weak triangle inequality? -> [[Mironov 2017 - Appendix Renyi Divergence Properties]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Renyi divergence $D_\alpha$ | [[Mironov 2017 - Renyi Divergence and the RDP Definition]] | definition | none | $D_1=\text{KL}$, $D_\infty=$ max log-ratio |
| $(\alpha,\varepsilon)$-RDP | [[Mironov 2017 - Renyi Divergence and the RDP Definition]] | definition | Renyi divergence | $\varepsilon$-DP $\iff(\infty,\varepsilon)$-RDP |
| Post-processing | [[Mironov 2017 - RDP Properties and Composition]] | theorem | data processing | $g\circ f$ keeps $(\alpha,\varepsilon)$ |
| Adaptive composition (Prop. 1) | [[Mironov 2017 - RDP Properties and Composition]] | theorem | RDP | curves add per order |
| Group privacy (Prop. 2) | [[Mironov 2017 - RDP Properties and Composition]] | theorem | Cor. 4 | $2^c$-stable gives $(\alpha/2^c,3^c\varepsilon)$ |
| RDP to $(\varepsilon,\delta)$ (Prop. 3) | [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]] | theorem | Prop. 10 | $\varepsilon+\frac{\log1/\delta}{\alpha-1}$ |
| Lemma 1 | [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]] | theorem | $D_\infty$ both ways | $D_\alpha\le2\alpha\varepsilon^2$ |
| Advanced composition (Prop. 4, Cor. 1) | [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]] | theorem | Lemma 1, Prop. 1 | $\varepsilon'=4\varepsilon\sqrt{2n\log1/\delta}$ |
| Randomized response RDP (Prop. 5) | [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] | theorem | RDP definition | closed form, $\alpha=1$ limit |
| Laplace RDP (Prop. 6, Cor. 2) | [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] | theorem | RDP definition | closed form; $\to1/\lambda$ as $\alpha\to\infty$ |
| Gaussian RDP (Prop. 7, Cor. 3) | [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] | theorem | RDP definition | $\alpha/(2\sigma^2)$ |
| Baseline-dependent guarantee; budget curves | [[Mironov 2017 - Discussion, Budget Curves and Open Questions]] | concept | Props. 1, 4, 10 | 13 orders suffice (Fig. 3) |
| Props. 8-11, Cor. 4 | [[Mironov 2017 - Appendix Renyi Divergence Properties]] | theorem | Renyi divergence | nonneg., monotone, probability preservation, weak triangle |

## Notes

- [[Mironov 2017 - Renyi Differential Privacy - Overview]] — CONTAINS: problem with $(\varepsilon,\delta)$, contribution, relation to CDP/zCDP/moments accountant, key-results table, full Source Map, one-line Gaussian example.
- [[Mironov 2017 - Renyi Divergence and the RDP Definition]] — CONTAINS: Defs. 1-4, Laplace and Gaussian mechanisms, critique of $(\varepsilon,\delta)$ failure modes, advanced composition background, related relaxations, Remarks 1-2, Gaussian example.
- [[Mironov 2017 - RDP Properties and Composition]] — CONTAINS: bad-outcomes bound, Bayes-factor interpretation, post-processing, Prop. 1 with proof, $c$-stable definition, Prop. 2 with proof sketch, Table I, budget-curve composition example.
- [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]] — CONTAINS: Prop. 3 with proof, Lemma 1 with proof sketch, Prop. 4 with proof, Cor. 1 with proof, Remark 3, numeric comparison with basic and Dwork-Rothblum-Vadhan composition, Python.
- [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] — CONTAINS: Props. 5-7, Cors. 2-3 with proofs, Table II, Figures 1-2 described, numerical verification, Python, weekly-count example.
- [[Mironov 2017 - Discussion, Budget Curves and Open Questions]] — CONTAINS: probabilistic guarantee, baseline-dependent table, Prop. 4 vs Cor. 1 comparison, tracking accumulated loss, Figure 3, conclusions, open questions, marketing reading.
- [[Mironov 2017 - Appendix Renyi Divergence Properties]] — CONTAINS: Props. 8-11 and Cor. 4 with proofs, probability-preservation example.

## Sources
- [[raw/Mironov 2017 - Renyi Differential Privacy.pdf]] — Mironov I (2017), IEEE CSF 2017, arXiv 1702.07476v3 (25 Aug 2017), 13 pages; the sole source for all notes.

## See Also
- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]] — the moments accountant that motivated RDP.
- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]] — hypothesis-testing relaxation, strictly more informative than any divergence.
- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]] — zCDP accounting in production.
- [[The ELBO and KL Divergence Minimization]] — KL background.
