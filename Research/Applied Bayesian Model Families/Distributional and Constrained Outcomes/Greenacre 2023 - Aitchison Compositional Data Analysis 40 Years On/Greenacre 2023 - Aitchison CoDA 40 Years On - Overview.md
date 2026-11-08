---
title: "Greenacre 2023 - Aitchison CoDA 40 Years On - Overview"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/overview
  - doc/paper
source: "[[raw/Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On.pdf]]"
source_location: "Entire paper, Statistical Science (arXiv 2201.05197v3), 30 pp."
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On"
doc_type: paper
depends_on: []
used_by:
  - "[[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]]"
  - "[[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]"
  - "[[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]]"
  - "[[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]"
  - "[[Greenacre 2023 - Compositional Outcome Models in PyMC]]"
aliases:
  - Greenacre Grunsky Bacon-Shone Erb Quinn 2023
  - Aitchison CoDA reappraisal
---

# Greenacre 2023 - Aitchison CoDA 40 Years On - Overview

> [!summary]
> Greenacre, Grunsky, Bacon-Shone, Erb and Quinn (2023) review Aitchison's logratio approach to compositional data (data on the simplex, sum-to-one) 40 years after his 1982 read paper. Their thesis: exact *subcompositional coherence* and exact *isometry* are not needed; simple pairwise/additive logratios (ALR) or even Box-Cox power transforms are "quasi-coherent" and "quasi-isometric" enough, and zeros remain the "Achilles heel".

## Overview

**Question.** What properties must a transformation of compositional data satisfy, and are the complicated isometric logratios (ILR/pivot) necessary?

**Contribution.** A guided tour of CoDA properties (scale invariance, coherence, dominance, distributional equivalence, isometry), a worked 6,799-sample geochemical example (Tellus), wide-data genomics, and measures of incoherence/anisometry to *quantify* departures rather than demand exactness.

**Key result.** On Tellus, the ALR with reference Al reaches Procrustes correlation 0.990 with the full logratio geometry; correspondence analysis of Box-Cox ($\alpha=0.5$) power-transformed data needs no zero replacement and gives similar structure.

## Motivating PyMC examples

**E70** "Compositional data: parts of a whole (Dirichlet, logistic-normal, Dirichlet-multinomial)" (Aitchison's Arctic lake sediments; 2024 UK general election, 542 English constituencies) — closure and spurious correlation, ALR/CLR/ILR, Dirichlet regression, logistic-normal with LKJ and covariate-dependent scale — at <https://redam94.github.io/pymc-challenges/examples.html>. See [[Greenacre 2023 - Compositional Outcome Models in PyMC]] and [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]].

## Main Content — Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note; [[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]] |
| 2 Tellus geochemical data set (N=6799, D=52, zeros) | [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]] |
| 3.1 Scale invariance; 3.2 Coherence; 3.5 Dominance; 3.6 Distributional equivalence | [[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]] |
| 3.3 Pairwise/additive logratios; 3.4 CLR; 3.7 Log-contrasts; 3.8 Isometry/ILR; 3.9 Dispersion measures | [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]] |
| 4 Application (weighting, ALR selection, CA alternative, quasi-coherence) | [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]] |
| 5 Variable selection | [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]] |
| 6 Wide data (genomics, scRNA-seq) | [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]] |
| 7 Are exact coherence and isometry necessary? (7.1-7.5 incl. amalgamation/SLR) | [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]] |
| 8 Reappraisal and conclusion (zeros, "last word") | [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]] |
| (concept translation) | [[Greenacre 2023 - Compositional Outcome Models in PyMC]] |

## Relevance to marketing measurement

Channel-share, budget-allocation and market-share outcomes are compositions: modelling shares with unconstrained regressions produces spurious negative correlations and predictions outside $[0,1]$. A log-ratio response model respects the constraint, and conclusions about "share of spend" should be checked for subcompositional coherence when channels are aggregated or dropped. See [[Generalized Linear Models]], [[Hierarchical Models]].

## Connections

Zero handling continues in [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]; directional (square-root) view of compositions appears in [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]].

## See Also

Source index: `_Index.md` in this folder.
