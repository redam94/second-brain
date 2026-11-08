---
title: "Index: Paun 2018 - Comparing Bayesian Models of Annotation"
tags:
  - type/index
  - source/ingested
  - topic/latent-traits
parent: "[[../_Index|Rankings, Raters and Latent Traits]]"
date_updated: 2026-11-08
concept_count: 5
---

# Paun 2018 - Comparing Bayesian Models of Annotation

> [!abstract] Routing Summary
> Full capture of Paun et al. (TACL 2018): six Bayesian annotation models (MULTINOM, Dawid-Skene, MACE, HIERD&S, ITEMDIFF, LOGRNDEFF), four datasets, evaluation against gold, predictive density, annotator characterization and difficulty. 5 notes.
> - Need paper summary and source map? -> [[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]
> - Need pooled/unpooled models, Dawid-Skene, MACE, EM code? -> [[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]]
> - Need hierarchical D&S, item difficulty, logistic random effects? -> [[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]]
> - Need datasets, metrics, Tables 1-9? -> [[Paun 2018 - Evaluation Protocol and Results Tables]]
> - Need priors, non-centering, label switching, guidelines? -> [[Paun 2018 - Implementation Priors Label Switching and Guidelines]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| MULTINOM, D&S, MACE | [[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]] | definition | Overview | confusion matrices vs credibility |
| HIERD&S, ITEMDIFF, LOGRNDEFF | [[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]] | definition | D&S | partial pooling avoids overfit |
| Evaluation results | [[Paun 2018 - Evaluation Protocol and Results Tables]] | example | models | structure beats majority vote |
| Label switching, non-centering | [[Paun 2018 - Implementation Priors Label Switching and Guidelines]] | concept | results | relabel chains with gold sample |

## Notes

- [[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]] — CONTAINS: contributions, model table, source map, E69 link.
- [[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]] — CONTAINS: three generative processes, D&S posterior, EM code, PyMC sketch.
- [[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]] — CONTAINS: three hierarchical models.
- [[Paun 2018 - Evaluation Protocol and Results Tables]] — CONTAINS: Table 1 stats, metrics, Tables 2-9.
- [[Paun 2018 - Implementation Priors Label Switching and Guidelines]] — CONTAINS: Sec. 3, 6-8.

## Sources

[[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]

## See Also

[[Hierarchical Models]] · [[Monsters and Mixtures]]
