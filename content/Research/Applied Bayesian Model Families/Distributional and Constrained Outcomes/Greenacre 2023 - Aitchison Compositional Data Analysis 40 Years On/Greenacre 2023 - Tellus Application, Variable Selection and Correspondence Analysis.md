---
title: "Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/example
  - doc/paper
source: "[[raw/Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On.pdf]]"
source_location: "Sec. 2, 4, 5, pp. 2-17"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On"
doc_type: paper
depends_on:
  - "[[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]"
used_by:
  - "[[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]"
aliases:
  - Tellus geochemistry compositional example
  - logratio analysis vs correspondence analysis
  - Procrustes correlation FINDALR
---

# Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis

> [!summary]
> On the Tellus soil geochemistry data (6,799 samples, 52 elements) the simplest logratio choice — an ALR with a stable reference part (Al, Procrustes correlation 0.990) — reproduces the full logratio geometry; correspondence analysis of Box-Cox power-transformed data gives a zero-tolerant alternative with optimal power 0.5. Variable selection (a few pairwise logratios) is as important as the transformation.

## Overview

Data from the Tellus survey of Northern Ireland (second period 2004-2006), XRF analysis: **52 elements** (11 major, 18 minor, 14 trace, 9 rare-earth), **N=6,799** samples, converted to cation counts and closed; 10 geological age brackets. $d=51$.

## Main Content

### 4.1 To weight or not to weight

Total logratio variance is the average of the 52 CLR variances. Weights matter when rare parts have excessively high variance; diagnose by plotting CLR variances against mean proportions (Fig. 4). On Tellus there is no tendency for low-mean parts to show excessive variance, so unweighted analysis is acceptable (contrast an archaeometric example in the paper's ref. 42).

### 4.2 Selecting an ALR (FINDALR)

> [!definition] Procrustes correlation for ALR choice
> For each of the 52 candidate reference parts, compute the ALR configuration of the 6,799 samples and its Procrustes correlation with the full logratio (CLR) geometry (R `FINDALR` in `easyCODA`). Plot against $\operatorname{Var}\log(x_\text{ref})$ (Fig. 5).
^def-findalr

Result: the highest Procrustes correlation is **0.990** with reference **Al**; the lowest reference-log variance is Si (Al second lowest). Both are geochemically sensible references. ALR distances approximate the logratio distances from below (Fig. 6, a random 10,000 of 23,109,801 pairwise distances).

### 4.3 Correspondence-analysis alternative

CA double-centres relative abundances; logratio analysis (LRA = PCA of CLRs) double-centres log relative abundances. They are linked by the Box-Cox power transform $f(x)=(x^\alpha-1)/\alpha$: as $\alpha\to0$ it tends to $\log x$, and CA of power-transformed data approaches LRA (paper's refs. 35, 36). CA uses the chi-square distance (Euclidean on parts divided by $\sqrt{c_j}$, $c_j$ the average of part $j$). On Tellus the optimal power for CA is 0.5 (square-root), requiring no zero replacement; k-means with 3 clusters was run on the ALRs and on the square-root-transformed (chi-square) data and the two solutions were cross-tabulated to compare them.

### 4.4 Quasi-coherence

Random subcompositions of size 44 down to 4 (out of 52) show that Procrustes correlations of the chi-square geometry of parts with the full composition are plotted for 100 random subcompositions per size (axis from 0.75 to 1.00, Fig. 11); the authors read the high values as "quasi-coherence" (dilution of incoherence as the number of parts grows).

### 5 Variable selection

Because the logratio space has dimension $d=D-1$, a subset of $D-1$ linearly independent LRs can retain all information, but many equivalent subsets exist; data-driven stepwise selection finds small sets of pairwise logratios that explain most logratio variance. Table (selected, increasing coverage of total logratio variance):

| Step | LR | Parts | % variance explained | Procrustes corr. |
|---|---|---|---|---|
| 1 | Cl/Ga | 19, 24 | 44.7 | 0.669 |
| 2 | Ni/Rb | 33, 35 | 66.0 | 0.807 |
| 3 | Si/I | 1, 27 | 70.5 | 0.829 |
| 4 | Nd/Tl | 32, 45 | 74.2 | 0.852 |
| 5 | Mn/S | 5, 11 | 77.0 | 0.869 |
| 10 | Cu/Ta | 23, 42 | 85.9 | 0.917 |
| 15 | Cu/Yb | 23, 50 | 91.3 | 0.941 |
| 22 | Cr/Zn | 21, 51 | 95.2 | 0.957 |

(The table is a transcription of the paper's selected-LR listing; numbers are as printed.)

## Examples

> [!example] Reading the ALR choice
> Suppose you must choose a reference channel for ALR response modelling of spend shares. Compute, for each candidate reference, the Procrustes correlation between ALR geometry and CLR geometry and the variance of the log reference; prefer references with high correlation and low variance. Tellus shows the winner can have rank-2 variance and still give 0.990 agreement.
^ex-alr-reference

## Connections

[[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]; PCA/PCoA of compositions is dimension reduction in the same spirit as the manifold PCA reviewed in [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]].

## See Also

[[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]
