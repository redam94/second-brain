---
title: "Index: Dong Roth Su 2022 - Gaussian Differential Privacy"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 9
---

# Dong Roth Su 2022 - Gaussian Differential Privacy

> [!abstract] Routing Summary
> This folder fully captures Dong, Roth and Su (2022), *Gaussian Differential Privacy* (JRSS-B 84(1); arXiv 1905.02383): $f$-DP via hypothesis-testing trade-off functions, Gaussian DP, post-processing and the Blackwell order, the primal-dual link to $(\varepsilon,\delta)$-DP, group privacy, the composition theorem and central limit theorems, composition of approximate DP with an $O(1/n)$ Berry-Esseen-beating bound, the subsampling theorem, the noisy-SGD analysis, and the conversion to divergence-based DP (Appendix B). It contains 9 notes covering every main-text section, theorem and figure; appendix proofs are covered at the level of their lemmas and strategies.
> - Need the paper on one page, contributions, headline formulas or the section-to-note map? -> [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
> - Need trade-off functions, Def. 2.3 of $f$-DP, Prop. 2.2, symmetrization, or $f_{\varepsilon,\delta}$? -> [[Dong Roth Su 2022 - Trade-off Functions and f-DP]]
> - Need $G_\mu$, $\mu$-GDP, Theorem 2.7 (Gaussian mechanism), or how to pick $\mu$? -> [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]
> - Need post-processing, Blackwell's theorem, GDP to $(\varepsilon,\delta)$ conversion, or group privacy ($k\mu$)? -> [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]]
> - Need the tensor product, Theorem 3.2, GDP composition $\sqrt{\sum\mu_i^2}$, or the CLTs (Theorems 3.4-3.5)? -> [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]
> - Need composition of $(\varepsilon,\delta)$-DP, Theorem 3.6, Theorem 3.7, or the Figure 5 numbers? -> [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]]
> - Need the sampling operator $C_p$, Theorem 4.2, or a comparison with the classical subsampling lemma? -> [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]]
> - Need the NoisySGD analysis, Corollary 5.4, or the MNIST comparison with the moments accountant? -> [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]
> - Need $f$-DP to RDP conversion, why RDP is less informative, open problems, or marketing-oriented communication of $\mu$? -> [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Trade-off function $T(P,Q)$ | [[Dong Roth Su 2022 - Trade-off Functions and f-DP]] | definition | Neyman-Pearson | convex, non-increasing, $\le1-x$ |
| $f$-DP | [[Dong Roth Su 2022 - Trade-off Functions and f-DP]] | definition | trade-off function | $T(M(S),M(S'))\ge f$ |
| $(\varepsilon,\delta)$-DP as $f_{\varepsilon,\delta}$ | [[Dong Roth Su 2022 - Trade-off Functions and f-DP]] | theorem | $f$-DP | piecewise linear |
| Gaussian trade-off $G_\mu$; $\mu$-GDP | [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]] | definition | $f$-DP | $\Phi(\Phi^{-1}(1-\alpha)-\mu)$ |
| Gaussian mechanism (Thm 2.7) | [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]] | theorem | GDP | noise $\text{sens}/\mu$ is $\mu$-GDP, tight |
| Post-processing; Blackwell order | [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] | theorem | trade-off function | $f$-DP is most informative |
| Primal-dual (Props. 2.11-2.12; Cor. 2.13) | [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] | theorem | convex conjugate | $\delta(\varepsilon)=1+f^*(-e^\varepsilon)$ |
| Group privacy (Thm 2.14, Prop. 2.15) | [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] | theorem | $f$-DP | $1-(1-f)^{\circ k}$; $k\mu$-GDP |
| Tensor product; composition (Thm 3.2, Cor. 3.3) | [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] | theorem | Neyman-Pearson | closed and tight; $\sqrt{\sum\mu_i^2}$ |
| CLTs (Thms 3.4-3.5) | [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] | theorem | $\text{kl},\kappa_2,\kappa_3$ | converge to $G_{2K/s}$ |
| Approximate-DP CLT (Thm 3.6); Berry-Esseen beating (Thm 3.7) | [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]] | theorem | Thm 3.5, $f_{\varepsilon,\delta}$ decomposition | $G_\mu\otimes f_{0,1-e^{-\delta}}$; error $O(1/n)$ |
| Sampling operator $C_p$; Thm 4.2; Cor. 4.3 | [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]] | theorem | primal-dual, Lemma 4.4 | $M\circ\text{Sample}_m$ is $C_p(f)$-DP |
| NoisySGD (Thm 5.1, 5.2, Cor. 5.4, 5.6) | [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]] | theorem | composition, subsampling, GDP | $\mu=\sqrt2c\sqrt{e^{\sigma^{-2}}\Phi(1.5/\sigma)+3\Phi(-0.5/\sigma)-2}$ |
| Divergence conversion (App. B) | [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] | theorem | $f$-DP | $\mu$-GDP gives $(\alpha,\mu^2\alpha/2)$-RDP |
| Open problems | [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] | concept | all | local $f$-DP, inhomogeneous Berry-Esseen |

## Notes

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]] — CONTAINS: problem, four contributions, headline formulas, full Source Map including Appendices A-G, 1-GDP power example.
- [[Dong Roth Su 2022 - Trade-off Functions and f-DP]] — CONTAINS: hypothesis-testing view, Def. 2.1, Prop. 2.2, Def. 2.3, Prop. 2.4, $f_{\varepsilon,\delta}$, Prop. 2.5, worked $\alpha=0.05$ example.
- [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]] — CONTAINS: $G_\mu$, Def. 2.6, Thm 2.7 with proof, tightness, relation to $(\varepsilon,\delta)$/RDP/zCDP, example, Python.
- [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] — CONTAINS: Prop. 2.8, Lemma 2.9, Thm 2.10, informativeness, Props. 2.11-2.12, Cor. 2.13, Thm 2.14, Prop. 2.15, household example.
- [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] — CONTAINS: Def. 3.1 and properties, Thm 3.2 with proof idea, Cor. 3.3, functionals, Thms 3.4-3.5, Gaussian sanity check.
- [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]] — CONTAINS: Eqs. 11-13, Thm 3.6, Thm 3.7, binomial representation, Figure 5 numbers, Python.
- [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]] — CONTAINS: Def. 4.1, Thm 4.2, closed form (14), Cor. 4.3, Lemma 4.4, proof outline, Figure 6 numbers, Python.
- [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]] — CONTAINS: Algorithm 1, Thms 5.1-5.2, Lemmas 5.3, 5.5, Cors. 5.4, 5.6, Figure 7 table with pairing check, $(\varepsilon,\delta)$ conversion, Python.
- [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] — CONTAINS: Props. B.1, B.4, B.5, B.7, Cor. B.6, Discussion open problems, limitations, attacker-power illustration.

## Sources
- Dong Roth Su 2022 - Gaussian Differential Privacy — Dong J, Roth A, Su WJ (2022), JRSS-B 84(1), arXiv 1905.02383, 86 pages; the sole source for all notes.

## See Also
- [[Mironov 2017 - Renyi Differential Privacy - Overview]] — divergence-based DP.
- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]] — the SGD analysis improved here.
- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]] — zCDP in production.
- [[Power Analysis and Sample Size]] — type I / II error background.
