---
title: "Arora 2012 - Practical Provable Topic Modeling - Overview"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/overview
  - doc/paper
source: "[[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]"
source_location: "Whole paper (arXiv 1212.4777; ICML 2013), main text pp. 1-9, appendices A-D"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling"
doc_type: paper
depends_on:
  - "[[Blei 2003 - Latent Dirichlet Allocation - Overview]]"
used_by:
  - "[[Arora 2012 - Separability and Anchor Words]]"
  - "[[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]]"
  - "[[Arora 2012 - FastAnchorWords Algorithm and Guarantees]]"
  - "[[Arora 2012 - Experiments and Evaluation Metrics]]"
aliases:
  - "Arora anchor words overview"
  - "A Practical Algorithm for Topic Modeling with Provable Guarantees"
---

# Arora 2012 - Practical Provable Topic Modeling - Overview

> [!summary]
> Arora, Ge, Halpern, Mimno, Moitra, Sontag, Wu and Zhu give a topic-model learner that is both provable and practical. It finds anchor words by a combinatorial farthest-point rule (FastAnchorWords) and recovers topics by a per-word convex (simplex-constrained) regression on the word co-occurrence matrix $Q$ (RecoverKL / RecoverL2). On real data it matches collapsed Gibbs sampling on held-out likelihood and coherence at a small fraction of the runtime.

## Overview
**Research question.** Maximum-likelihood topic estimation is NP-hard even for two topics. Can topics be recovered in polynomial time with guarantees *and* work in practice, including with correlated topics?

**Contribution.** (1) Replace the linear programs of Arora et al. (2012b) for anchor selection with a combinatorial algorithm proven stable under noise; (2) replace matrix inversion with a probabilistic, gradient-based recovery (Bayes rule on $p(z\mid w)$); (3) an empirical comparison to Gibbs sampling.

**Key result.** Under $p$-separability, $\text{FastAnchorWords}$ finds $K$ points $O(\epsilon/\gamma)$-covering the vertices in $\tilde O(V^2+VK/\epsilon^2)$ time, and RecoverL2 learns $A$ to entry-wise error $\epsilon$ with $M=O((aK)^3\log V/(D^3(\gamma p)^4))$ documents.

## Source Map

| Paper section | Covered in |
|---|---|
| 1 Introduction | this note |
| 2 Background (admixtures, Def. 2.1, Thm 2.2) | [[Arora 2012 - Separability and Anchor Words]] |
| 3 Probabilistic approach (Alg. 1-3, RecoverKL, RecoverL2) | [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]] |
| 4 Combinatorial anchor finding (Def. 4.1-4.2, Thm 4.3, Alg. 4, Lemmas 4.4-4.6) | [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]] |
| 5 Experiments (5.1-5.6, Figs 1-6, Table 1) | [[Arora 2012 - Experiments and Evaluation Metrics]] |
| 6 Conclusions | this note; [[Arora 2012 - Experiments and Evaluation Metrics]] |
| Appendix A (proofs of anchor finding), B (recovery, Lemma B.1, Thm B.2) | [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]] |
| Appendix C (full empirical results, Tables 2-4, Figs 9-13) | [[Arora 2012 - Experiments and Evaluation Metrics]] |
| Appendix D (Q construction, exponentiated gradient, KKT test) | [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]] |

## Motivating PyMC examples
- **E73** After LDA: newer topic models, problem by problem. Lists "anchor-word spectral recovery and anchor-started Gibbs" alongside coherence, diversity and stability yardsticks, GSDMM and the biterm topic model. Link: [PyMC challenges examples](https://redam94.github.io/pymc-challenges/examples.html).
- **E72** (LDA on non-text data) supplies the data setting; see [[Blei 2003 - LDA Beyond Text Baskets and Sessions]].

## Relevance to marketing measurement
Spectral/anchor methods give deterministic, fast, restart-free topics on basket or query data, and anchors (items belonging to a single need-state) are interpretable. The trade-off: they are not Bayesian posteriors (no uncertainty on $A$ by default) and rely on separability; use them for initialisation or as stability checks against an MCMC/VI fit.

## Connections
[[Blei 2003 - Latent Dirichlet Allocation - Overview]], [[Factor Analysis and PPCA]] (moment-based latent structure), [[Concept - Topic Model Evaluation and Stability]].

## See Also
[[Research/Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling/_Index|Arora 2012 index]]
