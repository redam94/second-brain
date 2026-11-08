---
title: "Index: Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 24
---

# Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3

> [!abstract] Routing Summary
> This folder captures Chapters 1-3 of Dwork and Roth (2014), *The Algorithmic Foundations of Differential Privacy* (Found. Trends Theor. Comput. Sci. 9(3-4):211-407): the promise and motivation, the definition of $(\varepsilon,\delta)$-DP with post-processing and group privacy, and the basic techniques (randomized response, Laplace, exponential mechanism, Report Noisy Max, simple and advanced composition, Gaussian mechanism, sparse vector). Chapters 4-13 and the appendices are not captured. 10 notes cover every section of Ch. 1-3, with each theorem stated and proved or sketched.
> - Need the book chapters 1-3 on one page, headline results or the section-to-note map? -> [[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]]
> - Need why anonymization, differencing, auditing, summary statistics fail, or why "nothing is learned" privacy is impossible? -> [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]]
> - Need the formal definition ($\varepsilon,\delta$), privacy loss, randomization necessity, synopsis generators? -> [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]
> - Need post-processing, group privacy, what DP promises or does not, granularity of privacy, "all small epsilons are alike"? -> [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]
> - Need randomized response, $(\ln3,0)$-DP and its estimator? -> [[Dwork Roth 2014 - Randomized Response]]
> - Need $\ell_1$ sensitivity, the Laplace mechanism, counting and histogram queries, accuracy theorem? -> [[Dwork Roth 2014 - Laplace Mechanism]]
> - Need private selection: Report Noisy Max, exponential mechanism, utility bound, pumpkins, Gumbel trick? -> [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]
> - Need basic composition, max-divergence, Lemma 3.17, Azuma, Chernoff? -> [[Dwork Roth 2014 - Basic Composition and Divergence Tools]]
> - Need advanced composition with proof, Bob's lifetime example, the Gaussian mechanism, humans and ghosts? -> [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]
> - Need AboveThreshold, Sparse, NumericSparse and their accuracy? -> [[Dwork Roth 2014 - Sparse Vector Technique]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Fundamental Law of Information Recovery | [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] | definition | none | too many accurate answers destroy privacy |
| Impossibility of semantic-security privacy | [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] | theorem | auxiliary information | analyst is also adversary |
| $(\varepsilon,\delta)$-differential privacy (Def. 2.4) | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] | definition | histogram databases | $\Pr[\mathcal{M}(x)\in S]\le e^{\varepsilon}\Pr[\mathcal{M}(y)\in S]+\delta$ |
| Privacy loss random variable | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] | definition | Def. 2.4 | $\ln\frac{\Pr[\mathcal{M}(x)=\xi]}{\Pr[\mathcal{M}(y)=\xi]}$ |
| Randomization is essential | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] | theorem | Def. 2.4 | deterministic non-trivial algorithms fail |
| Post-processing (Prop. 2.1) | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] | theorem | Def. 2.4 | $f\circ\mathcal{M}$ is $(\varepsilon,\delta)$-DP |
| Group privacy (Thm. 2.2) | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] | theorem | Def. 2.4 | $(k\varepsilon,0)$ for groups of $k$ |
| Utility guarantee | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] | theorem | post-processing | expected utility changes by $\le e^{\varepsilon}$ |
| Randomized response (Claim 3.5) | [[Dwork Roth 2014 - Randomized Response]] | example | Def. 2.4 | $(\ln3,0)$-DP; $\hat p=2\bar y-\tfrac12$ |
| $\ell_1$-sensitivity (Def. 3.1) | [[Dwork Roth 2014 - Laplace Mechanism]] | definition | neighbours | $\Delta f=\max\|f(x)-f(y)\|_1$ |
| Laplace mechanism (Thm. 3.6) | [[Dwork Roth 2014 - Laplace Mechanism]] | theorem | $\Delta f$ | scale $\Delta f/\varepsilon$ gives $(\varepsilon,0)$-DP |
| Accuracy of Laplace (Thm. 3.8) | [[Dwork Roth 2014 - Laplace Mechanism]] | theorem | Fact 3.7 | error $\le\ln(k/\delta)\Delta f/\varepsilon$ |
| Report Noisy Max (Claim 3.9) | [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] | theorem | Laplace | $(\varepsilon,0)$-DP selection |
| Exponential mechanism (Def. 3.4, Thm. 3.10) | [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] | theorem | utility sensitivity | prob. $\propto\exp(\varepsilon u/2\Delta u)$ is $(\varepsilon,0)$-DP |
| Exponential-mechanism utility (Thm. 3.11, Cor. 3.12) | [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] | theorem | Thm. 3.10 | within $\frac{2\Delta u}{\varepsilon}(\ln|R|+t)$ of OPT w.p. $1-e^{-t}$ |
| Simple composition (Thm. 3.14-3.16) | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] | theorem | Def. 2.4 | $(\sum\varepsilon_i,\sum\delta_i)$ |
| Max-divergence, Lemma 3.17 | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] | definition | statistical distance | DP iff $D_\infty\le\varepsilon$; coupling form |
| KL bound (Lemma 3.18) | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] | theorem | max-divergence | $D\le\varepsilon(e^{\varepsilon}-1)$ |
| Advanced composition (Thm. 3.20) | [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] | theorem | Lemmas 3.17-3.19 | $\varepsilon'=\sqrt{2k\ln(1/\delta')}\varepsilon+k\varepsilon(e^{\varepsilon}-1)$ |
| Gaussian mechanism (Thm. 3.22) | [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] | theorem | $\Delta_2$ | $\sigma\ge c\Delta_2/\varepsilon$, $c^2>2\ln(1.25/\delta)$ |
| AboveThreshold (Thm. 3.23, 3.24) | [[Dwork Roth 2014 - Sparse Vector Technique]] | theorem | Laplace | $(\varepsilon,0)$-DP for any stream length |
| Sparse, NumericSparse (Thm. 3.25-3.28) | [[Dwork Roth 2014 - Sparse Vector Technique]] | theorem | composition | pay only for $c$ above-threshold queries |
| Granularity of privacy | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] | concept | Def. 2.4 | vertex vs edge, event vs user |

## Notes

- [[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]] — CONTAINS: scope, the promise, headline-results table, complete Source Map for Ch. 1-3, marketing-measurement angle.
- [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] — CONTAINS: Fundamental Law, failure of anonymization, differencing, auditing, summary statistics (GWAS), "ordinary facts", "just a few"; Sec. 2.2 no-semantic-security argument; differencing demo.
- [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] — CONTAINS: curator model, Def. 2.1-2.4, $\delta$ discussion, privacy loss, randomization necessity, auxiliary parameters, synopsis generators, floating-point remark, bibliographic notes.
- [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] — CONTAINS: Prop. 2.1 + proof, Thm. 2.2, $(\varepsilon,\delta)$ group footnote, utility guarantee + proof, what DP does not promise, six qualitative properties, granularity example, small epsilons.
- [[Dwork Roth 2014 - Randomized Response]] — CONTAINS: two-coin procedure, Claim 3.5 + proof, estimator, derived generalisation to any $\varepsilon$, simulation.
- [[Dwork Roth 2014 - Laplace Mechanism]] — CONTAINS: Def. 3.1-3.3, Thm. 3.6 + proof, Ex. 3.1-3.3, Fact 3.7, Thm. 3.8 + proof, Python.
- [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] — CONTAINS: Ex. 3.4, Claim 3.9 + proof, Def. 3.4, Thm. 3.10-3.13 + proofs, Ex. 3.5 (with arithmetic caveat), Ex. 3.6, Gumbel trick, simulations.
- [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] — CONTAINS: Thm. 3.1-3.4 tools, Thm. 3.14-3.16, Def. 3.5-3.6, Remark 3.2, Lemma 3.17 + sketch, Lemma 3.18 + proof, Lemma 3.19.
- [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] — CONTAINS: composition experiment, Def. 3.7, Thm. 3.20 + proof, Cor. 3.21, Ex. 3.7 (recomputed), Gaussian mechanism, Laplace vs Gauss, weak quantification, humans and ghosts, comparison table.
- [[Dwork Roth 2014 - Sparse Vector Technique]] — CONTAINS: Alg. 1-3, Thm. 3.23-3.28 + proofs, Def. 3.9-3.10, take-away, bibliographic notes, simulation.

## Sources

- Dwork 2014 - The Algorithmic Foundations of Differential Privacy — Dwork C, Roth A (2014), Found. Trends Theor. Comput. Sci. 9(3-4): 211-407, 281 PDF pages. Only Ch. 1-3 (printed pp. 5-65) were ingested.

## See Also

- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]] — original paper for the Laplace mechanism and composition.
- [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]] — statistical rates for these mechanisms.
- [[Multiple Testing Corrections]], [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]], [[Bayesian Media Mix Modeling - Overview]] — measurement context.
