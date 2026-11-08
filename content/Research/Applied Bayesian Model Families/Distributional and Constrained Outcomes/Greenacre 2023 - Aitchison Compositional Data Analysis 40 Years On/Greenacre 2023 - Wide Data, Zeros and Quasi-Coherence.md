---
title: "Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On.pdf]]"
source_location: "Sec. 6, 7, 8, pp. 17-22"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On"
doc_type: paper
depends_on:
  - "[[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]]"
used_by:
  - "[[Greenacre 2023 - Compositional Outcome Models in PyMC]]"
aliases:
  - zeros in compositional data
  - quasi-isometry
  - amalgamation logratio SLR
  - Achilles heel of CoDA
---

# Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence

> [!summary]
> For wide genomics data (hundreds to thousands of parts, many zeros) the paper argues that exact coherence and isometry are unnecessary: measures of incoherence and anisometry show common transformations are "near enough". Amalgamated (summed) logratios are interpretable and zero-friendly; zeros, especially structural ones, remain "probably the thorniest and least-resolved issue".

## Overview

Sec. 6 shows CoDA for wide matrices (genomic sequencing, single-cell RNA-seq); Sec. 7 asks whether exact properties are needed; Sec. 8 concludes. The authors cite critiques that insisting on ILR/orthonormal coordinates is dogmatic.

## Main Content

### 6 Wide data

Sequencing counts are relative: their size reflects sequencing depth, not molecules in the input. Normalisation (CPM = closure; effective library size) either keeps counts relative (scale-free CoDA) or assumes sizes are true sizes. CoDA is scale-free: counts are viewed as conditioned on totals via a **multinomial model**, with count probabilities as the compositions estimated as parameters. The authors sketch scRNA-seq exploration comparing log-ratio analysis (LRA) on modelled compositions with CA on relative counts ("Gene-principal LRA biplot" figures; thymocytes, stromal, vascular endothelial cell types). Zeros are numerous in such data, and the number of zeros relates to the total count before normalisation, with consequences for downstream analysis.

### 7 Are exact coherence and isometry necessary?

> [!definition] Incoherence and anisometry measures
> Study random subcompositions of different sizes and compare their geometry (or effect sizes and p-values in model fits) with the full composition, using multidimensional-scaling **stress** or the **Procrustes correlation**: low stress near 0% or Procrustes correlation near 1 means high coherence. The same device against the CLR logratio geometry measures departure from isometry ("anisometry").
^def-incoherence

- LRs are coherent but numerous; ALRs are coherent with $d$ variables but not exactly isometric; CLRs isometric but incoherent (all parts involved).
- Pivot/isometric logratios and ILR are "black boxes": ratios of geometric means that users often cannot interpret.
- The paper lists dogmatic quotes such as "Compositional data analysis requires selecting an orthonormal basis" and argues interpretability should win.

> [!definition] Summed logratio (SLR), Eq. 12
> For disjoint part sets $D_1,D_2$: $\operatorname{SLR}(D_1,D_2)=\log\dfrac{\sum_{j\in D_1}x_j}{\sum_{j\in D_2}x_j}$. SLRs: simple, subject-matter driven (fatty acids), coherent with respect to adding components, can absorb zeros inside an amalgam (a geometric mean cannot), but do not decompose into LR log-contrasts. A data-driven hierarchical clustering by amalgamation (Fig. 3) loses minimal explained logratio variance at each merge, and can be used for variable selection or supervised learning.
^def-slr

### 8 Reappraisal and conclusion

- Take the logratio approach as a reference, not a gold standard; use incoherence/anisometry diagnostics.
- **Zeros** ("Achilles heel of CoDA"): in time-use data, a true zero for working time replaced by a small value "is creating a fiction for the sake of being able to use the chosen method"; the method should cope with the true zero. Structural zeros should not be replaced. Replacement algorithms are usually applied without attention to their effects, particularly with very many zeros.
- If compositions serve as predictors or responses, transformation choice is guided by interpretability, with pairwise/additive logratios most attractive.
- The final "last word" is given to Aitchison himself (that the logratio approach is simple).

## Examples

> [!example] Zero strategies in a marketing mix
> A channel that was off in some weeks has a structural zero share. Options: (i) add it to an "other" amalgam (SLR/amalgamation); (ii) model the zero pattern separately as in [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]; (iii) a power transform/CA approach with no replacement. Replacing zeros with $\epsilon$ makes results depend on $\epsilon$.
^ex-zero-strategies

## Connections

[[Greenacre 2023 - Compositional Outcome Models in PyMC]], [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]]

## See Also

[[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]
