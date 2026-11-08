---
title: "Index: Teh 2010 - Dirichlet Process"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/index
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Index"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
parent: "[[../_Index|Bayesian Nonparametrics and Topic Models]]"
date_updated: 2026-11-08
concept_count: 6
---

# Teh 2010 - Dirichlet Process

> [!abstract] Routing Summary
> Fully captures Teh (2010), *Dirichlet Process*, Encyclopedia of Machine Learning (13 pp.). Six notes cover the definition, posterior, urn/CRP, stick-breaking, DP mixtures and the reference map.
> - Need the paper on one page, source map or the PyMC examples that use it? -> [[Teh 2010 - Dirichlet Process - Overview]]
> - Need the definition, moments or posterior conjugacy? -> [[Teh 2010 - DP Definition and Posterior Conjugacy]]
> - Need the urn predictive, CRP, or the prior on the number of clusters? -> [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]
> - Need stick-breaking, truncation levels or a PyMC sketch? -> [[Teh 2010 - Stick-Breaking Construction]]
> - Need DP mixtures, density estimation, or the practical checklist? -> [[Teh 2010 - DP Mixture Models and Applications]]
> - Need extensions (PY, HDP, dependent DP) or the reference map? -> [[Teh 2010 - Extensions and Reference Map]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Dirichlet process | [[Teh 2010 - DP Definition and Posterior Conjugacy]] | definition | Dirichlet distribution | Dir marginals on every partition |
| Posterior conjugacy | [[Teh 2010 - DP Definition and Posterior Conjugacy]] | theorem | DP definition | $\text{DP}(\alpha+n,\cdot)$ |
| Blackwell-MacQueen urn | [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] | theorem | posterior | predictive $\propto\alpha H+\sum\delta$ |
| CRP; number of clusters | [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] | theorem | urn | $E[m]=\alpha(\psi(\alpha+n)-\psi(\alpha))$ |
| Stick-breaking | [[Teh 2010 - Stick-Breaking Construction]] | theorem | DP definition | $\pi_k=\beta_k\prod(1-\beta_l)$ |
| DP mixture | [[Teh 2010 - DP Mixture Models and Applications]] | definition | stick-breaking, CRP | infinite mixture, $K\sim\alpha\log n$ |
| Extensions, reference map | [[Teh 2010 - Extensions and Reference Map]] | concept | all | PY, HDP, dependent DP |

## Notes
- [[Teh 2010 - Dirichlet Process - Overview]] — CONTAINS: research question, key results, Source Map, motivating PyMC examples E26/E30/E75.
- [[Teh 2010 - DP Definition and Posterior Conjugacy]] — CONTAINS: Def. DP, moments theorem, posterior theorem with proof sketch, variance example.
- [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] — CONTAINS: urn theorem, CRP, number-of-clusters theorem, simulation code.
- [[Teh 2010 - Stick-Breaking Construction]] — CONTAINS: Sethuraman theorem, truncation levels, PyMC sketch.
- [[Teh 2010 - DP Mixture Models and Applications]] — CONTAINS: finite-limit and DP mixture definitions, applications, practical checklist.
- [[Teh 2010 - Extensions and Reference Map]] — CONTAINS: generalisations, future directions, 18-item reference map.

## Sources
- [[raw/Teh 2010 - Dirichlet Process.pdf]] — Teh YW (2010), Dirichlet Process, in Encyclopedia of Machine Learning (author PDF, 13 pp.).

## See Also
[[Griffiths 2011 - The Indian Buffet Process - Overview]], [[De Blasi 2015 - Gibbs-Type Priors - Overview]], [[Nonparametric Models Overview]], [[Monsters and Mixtures]]
