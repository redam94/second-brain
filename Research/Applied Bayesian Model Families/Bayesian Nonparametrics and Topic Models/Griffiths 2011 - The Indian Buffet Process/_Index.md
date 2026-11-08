---
title: "Index: Griffiths 2011 - The Indian Buffet Process"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/index
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Index"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
parent: "[[../_Index|Bayesian Nonparametrics and Topic Models]]"
date_updated: 2026-11-08
concept_count: 8
---

# Griffiths 2011 - The Indian Buffet Process

> [!abstract] Routing Summary
> Fully captures Griffiths and Ghahramani (2011), *The Indian Buffet Process: An Introduction and Review*, JMLR 12:1185-1224 (40 pp.). Eight notes cover the CRP review, latent feature models, the infinite limit, the IBP and its properties, Gibbs sampling with the linear-Gaussian model, applications, and extensions.
> - Need the paper on one page, headline results or the Source Map? -> [[Griffiths 2011 - The Indian Buffet Process - Overview]]
> - Need the CRP derivation by limits (the template)? -> [[Griffiths 2011 - Infinite Mixtures and the CRP Review]]
> - Need the beta-Bernoulli finite model and sparsity bound? -> [[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]]
> - Need left-ordered form and the limit theorem? -> [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]]
> - Need the buffet process, $P(Z)$, $K_+\sim\text{Poisson}(\alpha H_N)$? -> [[Griffiths 2011 - The Indian Buffet Process and Its Properties]]
> - Need Gibbs conditionals and the linear-Gaussian marginal likelihood? -> [[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]]
> - Need the application list? -> [[Griffiths 2011 - Applications of the IBP]]
> - Need the two-parameter IBP, stick-breaking, beta process, Markov IBP? -> [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Finite beta-Bernoulli prior | [[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]] | definition | CRP review | $E[\text{ones}]\le N\alpha$ |
| lof equivalence | [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]] | definition | finite prior | column-permutation classes |
| Infinite limit | [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]] | theorem | lof classes | Eq. 14 |
| IBP | [[Griffiths 2011 - The Indian Buffet Process and Its Properties]] | definition | limit | Poisson($\alpha/i$) new dishes |
| Properties | [[Griffiths 2011 - The Indian Buffet Process and Its Properties]] | theorem | IBP | $K_+\sim\text{Poisson}(\alpha H_N)$ |
| Linear-Gaussian marginal | [[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]] | theorem | IBP | depends on $K_+$ columns only |
| Two-parameter IBP | [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]] | definition | IBP | decouples sparsity and $K_+$ |
| IBP stick-breaking | [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]] | theorem | DP stick-breaking | cumulative products of Beta$(\alpha,1)$ |

## Notes
- [[Griffiths 2011 - The Indian Buffet Process - Overview]] — CONTAINS: question, contributions, Source Map, motivating example E31, marketing relevance.
- [[Griffiths 2011 - Infinite Mixtures and the CRP Review]] — CONTAINS: finite class prior, CRP limit theorem, Gibbs, three-customer example.
- [[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]] — CONTAINS: $Z\odot V$ decomposition, beta-Bernoulli definition, marginal, sparsity bound.
- [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]] — CONTAINS: histories, lof, limit theorem and proof sketch, left-ordering example.
- [[Griffiths 2011 - The Indian Buffet Process and Its Properties]] — CONTAINS: IBP definition, $P(Z)$, exchangeable IBP, Poisson view, properties, simulation code.
- [[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]] — CONTAINS: Gibbs conditionals, marginal likelihood theorem, demonstrations, verification code, PyMC sketch.
- [[Griffiths 2011 - Applications of the IBP]] — CONTAINS: Sec. 6.1-6.9 table, conclusions.
- [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]] — CONTAINS: two-parameter IBP, stick-breaking, beta process, Markov and phylogenetic IBP.

## Sources
- [[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]] — Griffiths TL, Ghahramani Z (2011), JMLR 12:1185-1224.

## See Also
[[Teh 2010 - Dirichlet Process - Overview]], [[De Blasi 2015 - Gibbs-Type Priors - Overview]], [[Nonparametric Models Overview]], [[Factor Analysis and PPCA]]
