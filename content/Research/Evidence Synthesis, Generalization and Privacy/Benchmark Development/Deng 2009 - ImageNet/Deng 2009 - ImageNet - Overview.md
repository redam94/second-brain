---
title: "Deng 2009 - ImageNet - Overview"
tags:
  - source/ingested
  - topic/benchmarks
  - type/overview
  - doc/paper
source: "[[raw/Deng 2009 - ImageNet.pdf]]"
source_location: "CVPR 2009, pp. 248-255 (Abstract, Sec. 1-5)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Deng 2009 - ImageNet"
doc_type: paper
depends_on:
  - "[[Deng 2009 - Construction Pipeline and AMT Quality Control]]"
  - "[[Deng 2009 - Dataset Properties and Comparison with Other Datasets]]"
  - "[[Deng 2009 - Applications and Future Work]]"
used_by:
  - "[[Wang 2018 - GLUE - Overview]]"
  - "[[Liang 2022 - HELM - Overview]]"
aliases:
  - ImageNet 2009 overview
  - Deng et al. ImageNet paper
---

# Deng 2009 - ImageNet - Overview

> [!summary]
> Deng, Dong, Socher, Li, Li and Fei-Fei (CVPR 2009) introduce ImageNet, a large-scale image ontology built on the WordNet noun hierarchy: the goal is 500-1000 clean, full-resolution images for each of about 80,000 synsets (about 50 million images). The reported version has 12 subtrees, 5,247 synsets and 3.2 million images, labeled with roughly 99.7% precision through a two-stage pipeline of web-scale candidate collection plus Amazon Mechanical Turk (AMT) verification with a per-synset adaptive vote threshold. The paper is the template for how a modern ML benchmark is built: define the label space from an existing ontology, over-collect noisy candidates, buy cheap human judgments, and control quality statistically.

## Overview

**Research question.** Image data on the web is abundant but disorganized. How can it be turned into a *resource* (training data and benchmark) that is large in scale, accurate, diverse, and hierarchically organized, so that recognition algorithms can be developed and compared at a scale beyond small datasets such as Caltech101/256, MSRC and PASCAL?

**Contribution.**
- A **label space** taken from WordNet's IS-A hierarchy ([[Deng 2009 - Dataset Properties and Comparison with Other Datasets]]).
- A **construction method** that decouples recall (search-engine candidate collection, with query expansion and translation) from precision (crowdsourced verification with adaptive consensus) ([[Deng 2009 - Construction Pipeline and AMT Quality Control]]).
- A **property audit** along four axes (scale, hierarchy, accuracy, diversity) against TinyImage, ESP, LabelMe and Lotus Hill.
- **Three demonstration applications** (non-parametric object recognition, tree-based classification, automatic object localization) and a roadmap ([[Deng 2009 - Applications and Future Work]]).

**Key results.**

| Quantity | Value in this paper |
|---|---|
| Target scale | about 50 million images, about 50K-80K synsets, 500-1000 images each |
| Reported scale | 12 subtrees, 5,247 synsets, 3.2 million images |
| Average images per synset | over 600 |
| Share of WordNet covered | about 10% of synsets |
| Labeling precision (80 sampled synsets, all depths of mammal and vehicle trees) | 99.7% average |
| Candidate pool per synset after de-duplication | over 10K images |
| Search-engine candidate accuracy (prior work) | about 10% |
| Average image size | about 400 x 350 |

> [!definition] Synset
> A *synonym set* (synset) is a WordNet node: one meaningful concept, possibly described by several words or phrases. ImageNet attaches a set of images to each noun synset and inherits WordNet's IS-A links between synsets. ^def-synset

## Main Content

The paper has five sections. Section 2 describes ImageNet's properties, Section 3 how it was built, Section 4 three applications, and Section 5 future work. A distinctive design stance, repeated in later benchmark papers, is that the benchmark is a *by-product of a data-collection pipeline whose statistical quality controls are first-class*, not just a list of examples.

### Source Map

| Paper section | Pages (approx.) | Covered in |
|---|---|---|
| Abstract, 1 Introduction | 1 | This note; [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] |
| 2 Properties: scale, hierarchy, accuracy, diversity (Figs. 1-6) | 1-3 | [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] |
| 2.1 ImageNet and related datasets (Table 1) | 3-4 | [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] |
| 3.1 Collecting candidate images | 4 | [[Deng 2009 - Construction Pipeline and AMT Quality Control]] |
| 3.2 Cleaning candidate images (AMT, Fig. 7) | 4-5 | [[Deng 2009 - Construction Pipeline and AMT Quality Control]] |
| 4.1 Non-parametric object recognition (Fig. 8) | 5-6 | [[Deng 2009 - Applications and Future Work]] |
| 4.2 Tree-based image classification (Fig. 9) | 6 | [[Deng 2009 - Applications and Future Work]] |
| 4.3 Automatic object localization (Figs. 10-12) | 6-7 | [[Deng 2009 - Applications and Future Work]] |
| 5 Discussion and future work | 7 | [[Deng 2009 - Applications and Future Work]] |
| References | 8 | not reproduced (bibliography only) |

## Examples

> [!example] The scale arithmetic
> Target: $\approx 50{,}000$ synsets $\times$ $500$-$1000$ images $=$ $25$-$50$ million images. Current: $5{,}247$ synsets with $3.2$M images gives $3.2\text{M}/5247 \approx 610$ images per synset, matching "over 600". Since only about 10% of WordNet is covered, the full build is roughly an order of magnitude more work. ^ex-scale-arithmetic

## Connections

- The AMT confidence-table idea is a per-class **posterior probability of correctness given votes**, a Bayesian-flavored quality control (see [[Deng 2009 - Construction Pipeline and AMT Quality Control]]).
- ImageNet is the single-score benchmark that [[Liang 2022 - HELM - Overview]] contrasts with GLUE-style score vectors and its own score *matrix*: "traditional benchmarks like ImageNet that assign a single score".
- [[Wang 2018 - GLUE - Overview]] repeats the "established datasets plus a platform" pattern in NLP.

**Relevance to marketing measurement.** A ground-truth benchmark is only as good as its labels. The same logic motivates experiment-based benchmarks for observational ad measurement: randomized lift studies play the role of the "clean labels" against which cheaper, noisier estimators are judged (see [[Experimental Benchmarks for Observational Ad Measurement]]). The adaptive-vote idea (collect more evidence for harder items) parallels sequential allocation of experimental budget.

## See Also

- [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/Deng 2009 - ImageNet/_Index|Index: Deng 2009 - ImageNet]]
- [[Experimental Benchmarks for Observational Ad Measurement]]
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] (what happens when a benchmark score becomes the target)
