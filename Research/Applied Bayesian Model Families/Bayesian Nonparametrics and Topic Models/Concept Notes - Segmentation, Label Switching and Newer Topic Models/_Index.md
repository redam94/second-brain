---
title: "Index: Concept Notes - Segmentation, Label Switching and Newer Topic Models"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/index
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Index"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models"
doc_type: concept
parent: "[[../_Index|Bayesian Nonparametrics and Topic Models]]"
date_updated: 2026-11-08
concept_count: 5
---

# Concept Notes - Segmentation, Label Switching and Newer Topic Models

> [!abstract] Routing Summary
> Concept notes (no raw source) covering topics from the PyMC examples E75, E72 and E73 that the four primary sources do not cover directly: DP mixtures for image segmentation, label switching, short-text topic models (GSDMM, BTM), neural/embedding topic models, and topic model evaluation.
> - Need DP mixtures on superpixels, BSDS500, boundary probabilities? -> [[Concept - DP Mixtures for Image Segmentation]]
> - Need label switching, co-assignment, Hungarian alignment? -> [[Concept - Label Switching and Label-Invariant Summaries]]
> - Need GSDMM or BTM for short texts? -> [[Concept - Short-Text Topic Models GSDMM and BTM]]
> - Need ProdLDA, ETM, BERTopic overview? -> [[Concept - Neural and Embedding Topic Models]]
> - Need coherence, diversity, stability yardsticks? -> [[Concept - Topic Model Evaluation and Stability]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Superpixel DP mixture | [[Concept - DP Mixtures for Image Segmentation]] | concept | DP mixture | boundary prob = 1 - co-assignment |
| Label switching | [[Concept - Label Switching and Label-Invariant Summaries]] | definition | exchangeable labels | use label-invariant functionals |
| GSDMM | [[Concept - Short-Text Topic Models GSDMM and BTM]] | definition | mixture of unigrams | one topic per document |
| BTM | [[Concept - Short-Text Topic Models GSDMM and BTM]] | definition | co-occurrence | corpus-level biterms |
| Amortised topic models | [[Concept - Neural and Embedding Topic Models]] | definition | VI | encoder replaces per-doc VI |
| Yardsticks | [[Concept - Topic Model Evaluation and Stability]] | definition | topics | coherence, diversity, stability |

## Notes
- [[Concept - DP Mixtures for Image Segmentation]] — CONTAINS: BSDS500, SLIC, truncated DP mixture, boundary-probability theorem, PyMC sketch, Binder code.
- [[Concept - Label Switching and Label-Invariant Summaries]] — CONTAINS: definition, remedies, Hungarian theorem, code.
- [[Concept - Short-Text Topic Models GSDMM and BTM]] — CONTAINS: DMM/GSDMM sampler, BTM definition, runnable GSDMM.
- [[Concept - Neural and Embedding Topic Models]] — CONTAINS: model table, amortised-inference definition, selection guide.
- [[Concept - Topic Model Evaluation and Stability]] — CONTAINS: yardstick definitions and code.

## Sources
No raw source (concept notes). Literature cited from memory and not downloaded: Martin et al. 2001; Arbelaez et al. 2011; Achanta et al. 2012; Sudderth and Jordan 2008; Binder 1978; Dahl 2006; Lau and Green 2007; Wade and Ghahramani 2018; Stephens 2000; Jasra, Holmes, Stephens 2005; Yin and Wang 2014; Yan et al. 2013; Miao et al. 2016; Srivastava and Sutton 2017; Dieng et al. 2020; Angelov 2020; Grootendorst 2022; Chang et al. 2009; Mimno et al. 2011; Bouma 2009; Lau et al. 2014. Verify citations before relying on them.

## See Also
[[Teh 2010 - Dirichlet Process - Overview]], [[Blei 2003 - Latent Dirichlet Allocation - Overview]], [[Arora 2012 - Practical Provable Topic Modeling - Overview]], [[De Blasi 2015 - Gibbs-Type Priors - Overview]]
