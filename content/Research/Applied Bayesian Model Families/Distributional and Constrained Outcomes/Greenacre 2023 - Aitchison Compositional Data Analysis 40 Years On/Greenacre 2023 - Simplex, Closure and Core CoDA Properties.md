---
title: "Greenacre 2023 - Simplex, Closure and Core CoDA Properties"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On.pdf]]"
source_location: "Sec. 1, 3.1, 3.2, 3.5, 3.6, pp. 1-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On"
doc_type: paper
depends_on: []
used_by:
  - "[[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]"
  - "[[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]"
aliases:
  - closure and the simplex
  - subcompositional coherence
  - spurious correlation compositions
---

# Greenacre 2023 - Simplex, Closure and Core CoDA Properties

> [!summary]
> A composition is a non-negative vector divided by its total; it lives on the simplex $S^d$ with $d=D-1$ and only *relative* information is meaningful. Aitchison's approach is built on scale invariance and subcompositional coherence; two further properties (dominance, distributional equivalence) are discussed and the paper argues dominance is optional.

## Overview

Aitchison (1982, read paper; 1986 book) addressed problems of analysing data subject to the unit-sum constraint. Early applications had few parts (10, 4, 3, 7); modern ones (ecology, microbiome, omics) have hundreds or thousands.

## Main Content

> [!definition] Simplex and composition
> With $D=d+1$ parts, the simplex is $S^d=\{(x_1,\dots,x_{d+1}):x_j\ge0,\ \sum_j x_j=1\}$ (Eq. 1). Its dimension is $d=D-1$ because any part is determined by the rest. For $N<D$ (wide matrices) the dimension of the sample is $N-1$. **Closure** $\mathcal C(\mathbf x)=\mathbf x/\sum_jx_j$ turns a positive vector into a composition; the original total is its *size* and the closed vector its *shape*. Zeros are admitted in the definition (most real data sets contain them, some are structural).
^def-simplex

> [!definition] Scale invariance
> Results must be identical for $\mathbf X$ and $\mathbf Y=\mathbf D_q\mathbf X$ for any diagonal matrix of positive scalars: $\mathcal C(\mathbf x_i)=\mathcal C(\mathbf y_i)$ for all rows. Only the shape matters (except where the size is substantively meaningful, e.g. allometry of fish).
^def-scale-invariance

> [!definition] Subcompositional coherence
> A *subcomposition* of $C=c+1<D$ parts, re-normalised by its own subtotal, lives in $S^c$. **Coherence** requires that relationships among a set of parts be the same whether they are computed within the full composition or any subcomposition. Part *ratios* satisfy it; raw proportions do not. **Incoherence** can be measured (e.g. via stress or Procrustes correlation across random subcompositions); "quasi-coherence" is closeness to exact coherence.
^def-coherence

> [!example] The correlation paradox (Tellus, p. 4)
> Geochemist A analyses all 52 elements and finds correlation of La and Y equal to **0.479**; geochemist C analyses only the 9 rare-earth elements (a subcomposition, renormalised) and finds **-0.344**. With ratios (log-ratios) all three geochemists have identical data and no paradox.
^ex-correlation-paradox

> [!definition] Subcompositional dominance
> Distances between cases computed on a subcomposition should be no larger than on the full composition. This holds if distances are *sums* of positive logratio terms, but fails for averages. Averaged distances are comparable across studies with different numbers of parts, so the paper concludes dominance need not hold: it depends on the research question.
^def-dominance

> [!definition] Distributional equivalence (proportionality)
> Two parts are distributionally equivalent if one is a scalar multiple of the other; the analysis should be unchanged if they are amalgamated. Measured by the variance of their logratio $\operatorname{Var}\log(x_j/x_k)$. Tellus: Sm/Yb has variance 0.0062 (nearly proportional; Sm $\approx2.4\times$Yb; uncentered correlation 0.997) while Br/Nd has variance 5.06. Logratio methods violate this property (splitting a column into 10 equal parts multiplies its variance by 10); *weighting* parts restores it (link to correspondence analysis).
^def-dist-equivalence

**Definitions of amalgamation and partition.** Amalgamations merge parts by summation (e.g. fatty acids into saturated / monounsaturated / polyunsaturated; Tellus mafic = Mg+Fe+Mn, felsic = Na+Si+Al+K); a partition amalgamates all parts into subsets. Aitchison emphasised the hierarchy of parts.

## Examples

Tellus: 3,883 zeros (1.1% of values) from 12 of 52 cation elements below detection; no structural zeros assumed; zeros replaced by 2/3 of the element's minimum positive value (triangular-distribution argument); alternative imputations did not change conclusions.

## Connections

- Next: transformations in [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]; quasi-coherence in [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]].
- Spurious correlations from closure are the compositional analogue of selecting on a collider; marketing share-of-spend analyses face the same issue.

## See Also

[[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]
