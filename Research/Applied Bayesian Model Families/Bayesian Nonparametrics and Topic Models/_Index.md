---
title: "Index: Bayesian Nonparametrics and Topic Models"
tags:
  - type/index
  - source/ingested
  - topic/bayesian-nonparametrics
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 37
---

# Bayesian Nonparametrics and Topic Models

> [!abstract] Routing Summary
> This cluster covers infinite-dimensional priors: the Dirichlet process and DP mixtures, Gibbs-type / Pitman-Yor partitions and unseen-species estimation, the Indian buffet process for latent features, LDA and anchor-word topic models, label switching and short-text topic models. It has 6 sub-folders and 37 notes, written to cover the methods used in the PyMC worked examples E26, E30, E31, E72, E73, E75 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Arora 2012: [[Arora 2012 - Practical Provable Topic Modeling - Overview]]
> - Blei 2003: [[Blei 2003 - Latent Dirichlet Allocation - Overview]]
> - De Blasi 2015: [[De Blasi 2015 - Gibbs-Type Priors - Overview]]
> - Griffiths 2011: [[Griffiths 2011 - The Indian Buffet Process - Overview]]
> - Teh 2010: [[Teh 2010 - Dirichlet Process - Overview]]
^routing-summary

## Sub-topics

- [[Arora 2012 - Practical Provable Topic Modeling/_Index|Arora 2012 - Practical Provable Topic Modeling]] (5 notes) — COVERS: Arora, Ge, Halpern, Mimno, Moitra, Sontag, Wu and Zhu give a topic-model learner that is both provable and practical. It finds anchor words by a combinatorial farthest-point rule (FastAnchorWords) and recovers topics by a per-word convex (simplex-constrained) regression on the word co-occurrence matrix $Q$ (RecoverKL / RecoverL2). On real data it matches collapsed Gibbs sampling on held-out…
- [[Blei 2003 - Latent Dirichlet Allocation/_Index|Blei 2003 - Latent Dirichlet Allocation]] (6 notes) — COVERS: LDA is a three-level hierarchical Bayesian model in which each document is a random mixture $\theta\sim\text{Dir}(\alpha)$ over $k$ topics and each word is drawn from the topic-word multinomial $\beta_{z}$. Exact inference is intractable; the paper gives a variational algorithm and shows lower held-out perplexity than unigram, mixture of unigrams and pLSI, with no overfitting
- [[Concept Notes - Segmentation, Label Switching and Newer Topic Models/_Index|Concept Notes - Segmentation, Label Switching and Newer Topic Models]] (5 notes) — COVERS: Concept notes: [[Concept - DP Mixtures for Image Segmentation]], [[Concept - Label Switching and Label-Invariant Summaries]], [[Concept - Neural and Embedding Topic Models]], [[Concept - Short-Text Topic Models GSDMM and BTM]], [[Concept - Topic Model Evaluation and Stability]]
- [[De Blasi 2015 - Gibbs-Type Priors/_Index|De Blasi 2015 - Gibbs-Type Priors]] (7 notes) — COVERS: De Blasi, Favaro, Lijoi, Mena and Prunster review Gibbs-type priors: discrete nonparametric priors whose probability of a new value depends on the sample size $n$ and the number of distinct values $k$ but not on the frequencies. They contain the Dirichlet process (DP), Pitman-Yor (PY) and normalised generalised gamma (NGG) processes, with a discount $\sigma$ controlling whether $K_n$ grows like…
- [[Griffiths 2011 - The Indian Buffet Process/_Index|Griffiths 2011 - The Indian Buffet Process]] (8 notes) — COVERS: Griffiths and Ghahramani derive the Indian buffet process (IBP), a distribution over equivalence classes of sparse binary matrices with $N$ rows and unboundedly many columns, as the $K\to\infty$ limit of a beta-Bernoulli feature model. It lets a latent feature model infer how many features are present; the number of used features is $\text{Poisson}(\alpha H_N)$ and each object has…
- [[Teh 2010 - Dirichlet Process/_Index|Teh 2010 - Dirichlet Process]] (6 notes) — COVERS: Teh's Encyclopedia of Machine Learning entry defines the Dirichlet process (DP) as a distribution over distributions with Dirichlet-distributed finite-dimensional marginals, then derives its conjugate posterior, the Blackwell-MacQueen urn, the Chinese restaurant process (CRP), the stick-breaking construction and the DP mixture. Key takeaway: one object, four equivalent views, and the prior number…

## Motivating PyMC examples

E26, E30, E31, E72, E73, E75 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]
- [[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]
- [[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]
- [[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]
- [[raw/Teh 2010 - Dirichlet Process.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
