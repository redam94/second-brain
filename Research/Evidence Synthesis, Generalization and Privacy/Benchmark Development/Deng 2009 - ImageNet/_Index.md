---
title: "Index: Deng 2009 - ImageNet"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
  - doc/paper
parent: "[[../_Index|Benchmark Development]]"
date_updated: 2026-11-08
concept_count: 9
---

# Deng 2009 - ImageNet

> [!abstract] Routing Summary
> This folder fully captures Deng, Dong, Socher, Li, Li and Fei-Fei (2009), *ImageNet: A Large-Scale Hierarchical Image Database* (CVPR 2009, pp. 248-255): the WordNet-based label space, the two-stage construction pipeline (search-engine candidates, AMT verification with adaptive per-synset consensus), the four audited properties (scale, hierarchy, accuracy, diversity), the comparison with TinyImage, ESP, LabelMe and Lotus Hill, three demonstration applications and the future-work plan. It contains 4 notes (paper is 8 pages).
> - Need the paper on one page, headline numbers, or the section-to-note map? -> [[Deng 2009 - ImageNet - Overview]]
> - Need how candidates are collected and how AMT votes are turned into accept/reject (confidence table)? -> [[Deng 2009 - Construction Pipeline and AMT Quality Control]]
> - Need scale, hierarchy, accuracy, diversity measures, Table 1, or the comparison with other datasets? -> [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]]
> - Need NN-voting, NBNN, the tree-max classifier, localization, or the future-work plan? -> [[Deng 2009 - Applications and Future Work]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Synset | [[Deng 2009 - ImageNet - Overview]] | definition | WordNet | 12 subtrees, 5,247 synsets, 3.2M images |
| Candidate pool | [[Deng 2009 - Construction Pipeline and AMT Quality Control]] | definition | search engines, WordNet | over 10K candidates per synset |
| Confidence score table | [[Deng 2009 - Construction Pipeline and AMT Quality Control]] | definition | at least 10 votes on a sample | harder synsets need more votes |
| Semantic difficulty from vote table | [[Deng 2009 - Construction Pipeline and AMT Quality Control]] | theorem | confidence table | no majority implies hard to illustrate |
| ImageNet hierarchy | [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] | definition | WordNet IS-A | 147 dog categories |
| Average-image diversity measure | [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] | definition | lossless JPEG size | smaller size means more diverse |
| Property matrix (Table 1) | [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] | concept | datasets compared | only ImageNet has all of 5 properties |
| NBNN distance | [[Deng 2009 - Applications and Future Work]] | definition | SIFT descriptors | full resolution beats 32x32 NN-voting |
| Tree-max classifier | [[Deng 2009 - Applications and Future Work]] | definition | per-synset classifiers | beats independent classifiers at nearly every height |

## Notes

- [[Deng 2009 - ImageNet - Overview]] — CONTAINS: research question, contributions, headline numbers table, Def. synset, scale arithmetic, full Source Map.
- [[Deng 2009 - Construction Pipeline and AMT Quality Control]] — CONTAINS: Sec. 3.1 query expansion and translation, Sec. 3.2 AMT task design, adaptive consensus algorithm, Fig. 7 confidence table reproduced, 99.7% audit, Beta-binomial posterior interpretation with Python.
- [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] — CONTAINS: scale table by subtree, hierarchy, accuracy, diversity measure, Table 1 reproduced, point-by-point comparison with TinyImage, ESP, LabelMe, Lotus Hill, dataset-audit example and code.
- [[Deng 2009 - Applications and Future Work]] — CONTAINS: four recognition experiments, NBNN, tree-max classifier protocol and results, localization and k-means clustering, Sec. 5 future work, tree-max toy example and code.

## Sources

- Deng, J., Dong, W., Socher, R., Li, L.-J., Li, K., and Fei-Fei, L. (2009). ImageNet: A Large-Scale Hierarchical Image Database. CVPR 2009, 248-255. [[raw/Deng 2009 - ImageNet.pdf]]

## See Also

- [[Wang 2018 - GLUE/_Index|Index: Wang 2018 - GLUE]]
- [[Liang 2022 - Holistic Evaluation of Language Models/_Index|Index: Liang 2022 - Holistic Evaluation of Language Models]]
- [[Experimental Benchmarks for Observational Ad Measurement]]
