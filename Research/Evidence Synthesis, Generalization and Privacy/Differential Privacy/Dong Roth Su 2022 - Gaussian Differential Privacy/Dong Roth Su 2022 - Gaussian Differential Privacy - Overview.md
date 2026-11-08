---
title: "Dong Roth Su 2022 - Gaussian Differential Privacy - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Whole paper, JRSS-B 84(1), arXiv 1905.02383, main text pp. 1-32 and Appendices A-G pp. 33-86"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Trade-off Functions and f-DP]]"
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]"
  - "[[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]"
used_by:
  - "[[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]]"
aliases:
  - GDP paper overview
  - f-DP paper overview
  - Dong Roth Su overview
---

# Dong Roth Su 2022 - Gaussian Differential Privacy - Overview

> [!summary]
> Dong, Roth and Su start from the hypothesis-testing meaning of DP and define **$f$-differential privacy**: a mechanism is $f$-DP if distinguishing neighboring datasets is at least as hard as the testing problem whose optimal type I / type II error trade-off is $f$. $f$-DP generalizes $(\varepsilon,\delta)$-DP, composes **exactly** (tensor product), has a central limit theorem whose limit is **Gaussian DP** ($\mu$-GDP, one parameter), admits a clean subsampling theorem, and gives a sharper privacy analysis of noisy SGD than the moments accountant.

## Overview

**Problem.** $(\varepsilon,\delta)$-DP is mis-parameterized for composition: the composition of $(\varepsilon_i,\delta_i)$-DP mechanisms cannot be described by any single $(\varepsilon,\delta)$, and finding the best $\varepsilon$ for a given $\delta$ is #P-hard (Murtagh-Vadhan). Divergence-based relaxations (CDP, zCDP, Renyi DP, tCDP) track Gaussian compositions but lose the hypothesis-testing interpretation and either do not admit privacy amplification by subsampling or need complex analysis.

**Contributions (Section 1.1).**
1. *An algebra for composition*: $f$-DP is closed and tight under composition, $f_1\otimes\cdots\otimes f_n$ (Theorem 3.2).
2. *A central limit phenomenon*: composition of many "very private" mechanisms converges to GDP, a single-parameter family $G_\mu=T(\mathcal N(0,1),\mathcal N(\mu,1))$ (Theorems 3.4-3.7).
3. *A primal-dual perspective*: $f$-DP is equivalent to an infinite family of $(\varepsilon,\delta)$-DP guarantees via the convex conjugate (Propositions 2.11-2.12), letting results for $(\varepsilon,\delta)$-DP be imported, notably subsampling (Theorem 4.2).
4. *Application*: a sharper analysis of noisy SGD (Section 5): Figure 7 shows GDP bounds improving on the $(\varepsilon,\delta)$ bounds from the moments accountant.

**Headline formulas.**

| Object | Formula |
|---|---|
| Gaussian trade-off | $G_\mu(\alpha)=\Phi(\Phi^{-1}(1-\alpha)-\mu)$ |
| $(\varepsilon,\delta)$ trade-off | $f_{\varepsilon,\delta}(\alpha)=\max\{0,\,1-\delta-e^\varepsilon\alpha,\,e^{-\varepsilon}(1-\delta-\alpha)\}$ |
| Gaussian mechanism | noise $\mathcal N(0,\text{sens}^2/\mu^2)$ is $\mu$-GDP |
| GDP composition | $\sqrt{\mu_1^2+\cdots+\mu_n^2}$-GDP |
| GDP to $(\varepsilon,\delta)$ | $\delta(\varepsilon)=\Phi(-\tfrac\varepsilon\mu+\tfrac\mu2)-e^\varepsilon\Phi(-\tfrac\varepsilon\mu-\tfrac\mu2)$ |
| Group privacy | $\mu$-GDP becomes $k\mu$-GDP for groups of size $k$ |
| Subsampling | $M\circ\text{Sample}_m$ is $C_p(f)$-DP, $p=m/n$ |

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, 1 Introduction, 1.1 Contributions | motivation, four contributions | this note |
| 2 preliminaries; 2.1 Def. 2.1, Prop. 2.2, Def. 2.3, Prop. 2.4, Prop. 2.5, Figs. 2-3 | trade-off functions, $f$-DP, symmetrization, $(\varepsilon,\delta)$ case | [[Dong Roth Su 2022 - Trade-off Functions and f-DP]] |
| 2.2 Def. 2.6, Theorem 2.7, Eq. (7) | GDP and the Gaussian mechanism | [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]] |
| 2.3 Prop. 2.8, Lemma 2.9, Theorem 2.10 (Blackwell) | post-processing, informativeness | [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] |
| 2.4 Props. 2.11-2.12, Cor. 2.13, Fig. 4 | primal-dual, GDP to $(\varepsilon,\delta)$ | [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] |
| 2.5 Theorem 2.14, Prop. 2.15 | group privacy | [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] |
| 3 intro, 3.1 Def. 3.1, Theorem 3.2, Cor. 3.3 | composition theorem | [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] |
| 3.2 Theorems 3.4-3.5, functionals $\text{kl},\kappa_2,\kappa_3,\bar\kappa_3$, Fig. 1 | central limit theorems | [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] |
| 3.3 Theorem 3.6, Eqs. (11)-(13), Theorem 3.7, Fig. 5 | composing $(\varepsilon,\delta)$-DP, beating Berry-Esseen | [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]] |
| 4 intro, 4.1 Def. 4.1, Theorem 4.2, Eq. (14), Cor. 4.3, Lemma 4.4, Fig. 6 | subsampling | [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]] |
| 4.2 Prop. 4.5, proof of Theorem 4.2 | proof of subsampling theorem | [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]] |
| 5.1 Algorithm 1, Theorem 5.1 | NoisySGD | [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]] |
| 5.2 Theorem 5.2, Lemma 5.3, Cor. 5.4 | asymptotic analysis | [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]] |
| 5.3 Lemma 5.5, Cor. 5.6, Fig. 7 | Berry-Esseen bound; MNIST comparison | [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]] |
| 6 Discussion | summary and future directions | [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] |
| Appendix A (technical details of Sec. 2; Neyman-Pearson Thm A.1; log-concavity Prop. A.3) | proofs of Props. 2.2, 2.4, 2.12, Thm 2.14, Prop. 2.15, Eq. (6) | [[Dong Roth Su 2022 - Trade-off Functions and f-DP]]; [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]] |
| Appendix B (Props. B.1, B.4, B.5, Cor. B.6, Prop. B.7) | conversion to divergence-based DP; Renyi order not Blackwell | [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] |
| Appendix C (Lemmas C.1-C.2, self-contained proof of composition) | proof of Theorem 3.2 | [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] |
| Appendix D (omitted proofs of Sec. 3) | proofs of Thms 3.4-3.6, tensor-product properties | [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]; [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]] |
| Appendix E (proof of Theorem 3.7) | smoothing argument | [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]] |
| Appendix F (details of Sec. 4; Prop. F.2) | formula (14), tightness at $f=0$ | [[Dong Roth Su 2022 - Privacy Amplification by Subsampling]] |
| Appendix G (proofs of Sec. 5; Prop. G.1) | $\chi^2_+$, Lemma 5.3, Lemma 5.5 | [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]] |

The appendices (pp. 33-86) were read at the level of their stated lemmas and proof strategies; full line-by-line proofs of the CLT constants (Theorems 3.4-3.7, Appendices D-E) are summarized, not reproduced.

## Examples

> [!example] What 1-GDP means in testing terms
> Setup: a mechanism is $1$-GDP. An attacker tests "Alice is in the dataset" at significance level $\alpha=0.05$.
> Solution: $G_1(0.05)=\Phi(\Phi^{-1}(0.95)-1)=\Phi(0.645)=0.7405$, so the best test has type II error at least 0.74, i.e. power at most $26.0\%$. Compare pure $\varepsilon=1$-DP, whose bound on power is $e^\varepsilon\alpha=13.6\%$ at the same level.
> Interpretation: GDP quantifies the whole trade-off curve, not a single point. The two numbers are not comparable guarantees of the same mechanism (1-GDP is far weaker than 1-DP); the example only shows how the testing reading is used. Recomputed here.
^ex-gdp-power

## Connections

- Renyi DP is strictly less informative than $f$-DP: [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] and [[Mironov 2017 - Renyi Differential Privacy - Overview]].
- SGD privacy: improves on [[Abadi 2016 - Moments Accountant Theorems and Proofs]].
- The hypothesis-testing view of DP originates with Wasserman and Zhou (sibling source in this cluster).
- Marketing relevance: [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]] (communicating privacy as attacker power).

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]
- [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]
- [[Power Analysis and Sample Size]] (type I/II error vocabulary)
