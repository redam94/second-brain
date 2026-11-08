---
title: "Index: Blei 2003 - Latent Dirichlet Allocation"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/index
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Index"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
parent: "[[../_Index|Bayesian Nonparametrics and Topic Models]]"
date_updated: 2026-11-08
concept_count: 6
---

# Blei 2003 - Latent Dirichlet Allocation

> [!abstract] Routing Summary
> Fully captures Blei, Ng and Jordan (2003), *Latent Dirichlet Allocation*, JMLR 3:993-1022 (30 pp.), plus a concept extension for non-text uses. Six notes cover the model, related models, variational inference, experiments and baskets/sessions.
> - Need the paper on one page or the Source Map? -> [[Blei 2003 - Latent Dirichlet Allocation - Overview]]
> - Need the generative process, joint and exchangeability? -> [[Blei 2003 - LDA Generative Model and Exchangeability]]
> - Need pLSI vs LDA, parameter counts, topic simplex? -> [[Blei 2003 - Related Models and the Topic Simplex]]
> - Need the $\phi,\gamma$ updates, variational EM, Appendix A? -> [[Blei 2003 - Variational Inference and Parameter Estimation]]
> - Need smoothing, Table 1, perplexity/classification/CF experiments? -> [[Blei 2003 - Smoothed LDA, Examples and Experiments]]
> - Need LDA for baskets/sessions, PyMC sketch, Hungarian alignment? -> [[Blei 2003 - LDA Beyond Text Baskets and Sessions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| LDA generative process | [[Blei 2003 - LDA Generative Model and Exchangeability]] | definition | Dirichlet | 3-level hierarchy |
| Continuous mixture of unigrams | [[Blei 2003 - LDA Generative Model and Exchangeability]] | theorem | de Finetti | $k+kV$ parameters |
| Topic simplex | [[Blei 2003 - Related Models and the Topic Simplex]] | theorem | related models | LDA smooth on simplex |
| Variational updates | [[Blei 2003 - Variational Inference and Parameter Estimation]] | theorem | ELBO | $\phi\propto\beta\exp E\log\theta$, $\gamma=\alpha+\sum\phi$ |
| Variational EM | [[Blei 2003 - Variational Inference and Parameter Estimation]] | theorem | updates | $\beta_{ij}\propto\sum\phi w$ |
| Perplexity | [[Blei 2003 - Smoothed LDA, Examples and Experiments]] | definition | held-out likelihood | LDA best for all $k$ |
| Non-text LDA | [[Blei 2003 - LDA Beyond Text Baskets and Sessions]] | example | all | summed-out topics, Hungarian alignment |

## Notes
- [[Blei 2003 - Latent Dirichlet Allocation - Overview]] — CONTAINS: question, contributions, Source Map, examples E72/E73.
- [[Blei 2003 - LDA Generative Model and Exchangeability]] — CONTAINS: notation, generative definition, likelihood theorem, exchangeability theorem, marginalisation check.
- [[Blei 2003 - Related Models and the Topic Simplex]] — CONTAINS: unigram, mixture, pLSI vs LDA table, geometry theorem.
- [[Blei 2003 - Variational Inference and Parameter Estimation]] — CONTAINS: variational family, update theorem, algorithm, variational EM, E-step code.
- [[Blei 2003 - Smoothed LDA, Examples and Experiments]] — CONTAINS: smoothing, AP example, perplexity definition, Table 1, classification, collaborative filtering, discussion.
- [[Blei 2003 - LDA Beyond Text Baskets and Sessions]] — CONTAINS: item mapping, collapsed likelihood, PyMC sketch, Hungarian alignment code, baskets example.

## Sources
- Blei Ng Jordan 2003 - Latent Dirichlet Allocation — Blei DM, Ng AY, Jordan MI (2003), JMLR 3:993-1022.

## See Also
[[Arora 2012 - Practical Provable Topic Modeling - Overview]], [[Teh 2010 - Dirichlet Process - Overview]], [[Variational Inference - Overview]], [[Hierarchical Models]]
