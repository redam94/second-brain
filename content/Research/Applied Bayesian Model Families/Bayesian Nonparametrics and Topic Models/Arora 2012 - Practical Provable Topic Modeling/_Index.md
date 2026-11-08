---
title: "Index: Arora 2012 - Practical Provable Topic Modeling"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/index
  - doc/paper
source: "[[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]"
source_location: "Index"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling"
doc_type: paper
parent: "[[../_Index|Bayesian Nonparametrics and Topic Models]]"
date_updated: 2026-11-08
concept_count: 5
---

# Arora 2012 - Practical Provable Topic Modeling

> [!abstract] Routing Summary
> Fully captures Arora et al., *A Practical Algorithm for Topic Modeling with Provable Guarantees* (arXiv 1212.4777; ICML 2013), 26 pp. incl. appendices. Five notes cover separability, the recovery step, FastAnchorWords with proofs, and experiments.
> - Need the paper on one page or the Source Map? -> [[Arora 2012 - Practical Provable Topic Modeling - Overview]]
> - Need Def. 2.1 (p-separable) and the original theorem? -> [[Arora 2012 - Separability and Anchor Words]]
> - Need RecoverKL/L2, the convex-hull argument, Q construction, runnable code? -> [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]]
> - Need FastAnchorWords, lemmas and sample complexity? -> [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]]
> - Need metrics, semi-synthetic results, real-data findings? -> [[Arora 2012 - Experiments and Evaluation Metrics]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| p-separable matrix; anchor word | [[Arora 2012 - Separability and Anchor Words]] | definition | admixture | each topic has a private word |
| Original recovery theorem | [[Arora 2012 - Separability and Anchor Words]] | theorem | separability | polynomial documents suffice |
| Convex-hull structure | [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]] | theorem | separability | rows of $\bar Q$ in hull of anchor rows |
| RecoverKL / RecoverL2 | [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]] | definition | convex hull | per-word simplex regression + Bayes |
| gamma-robust simplex | [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]] | definition | geometry | vertex far from hull of others |
| FastAnchorWords | [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]] | theorem | robustness | $O(\epsilon/\gamma)$-cover in $\tilde O(V^2+VK/\epsilon^2)$ |
| Sample complexity | [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]] | theorem | Lemma B.1 | $O((aK)^3\log V/D^3(\gamma p)^4)$ |
| Metrics and results | [[Arora 2012 - Experiments and Evaluation Metrics]] | example | algorithms | comparable to Gibbs, far faster |

## Notes
- [[Arora 2012 - Practical Provable Topic Modeling - Overview]] — CONTAINS: question, contributions, Source Map, examples E72/E73.
- [[Arora 2012 - Separability and Anchor Words]] — CONTAINS: admixture setup, Def. 2.1, Thm 2.2.
- [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]] — CONTAINS: Q construction, convex-hull theorem, Alg. 2/3, L2 kernelisation, EG/KKT, runnable code.
- [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]] — CONTAINS: Defs 4.1-4.2, Thm 4.3, Alg. 4, lemmas, Thm B.2, related work.
- [[Arora 2012 - Experiments and Evaluation Metrics]] — CONTAINS: data, metrics, result table for 5.2-5.6, Table 1, conclusions.

## Sources
- Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees — Arora S, Ge R, Halpern Y, Mimno D, Moitra A, Sontag D, Wu Y, Zhu M (2012/2013).

## See Also
[[Blei 2003 - Latent Dirichlet Allocation - Overview]], [[Concept - Short-Text Topic Models GSDMM and BTM]], [[Factor Analysis and PPCA]]
