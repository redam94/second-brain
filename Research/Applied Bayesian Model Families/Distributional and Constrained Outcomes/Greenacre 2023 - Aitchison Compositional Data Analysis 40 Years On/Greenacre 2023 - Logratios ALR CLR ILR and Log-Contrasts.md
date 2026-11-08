---
title: "Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On.pdf]]"
source_location: "Sec. 3.3, 3.4, 3.7, 3.8, 3.9, pp. 4-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On"
doc_type: paper
depends_on:
  - "[[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]]"
used_by:
  - "[[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]]"
  - "[[Greenacre 2023 - Compositional Outcome Models in PyMC]]"
aliases:
  - ALR CLR ILR
  - additive logratio
  - centered logratio
  - isometric logratio
  - log-contrast
---

# Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts

> [!summary]
> Pairwise logratios (LR), additive logratios (ALR, fixed reference part) and centred logratios (CLR, divide by geometric mean) all have dimension $d=D-1$ and are linear in $\log x$. CLR is exactly isometric to the full logratio geometry but not coherent; ALR is coherent but only approximately isometric; ILR is both but needs ratios of geometric means that are hard to interpret.

## Overview

Zeros prevent logarithms, so every logratio transform needs zero replacement or a different tool (see [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]).

## Main Content

> [!definition] Pairwise logratio (Eq. 2)
> $\operatorname{LR}(j,k)=\log(x_j/x_k)=\log x_j-\log x_k$, $j\ne k$. There are $\tfrac12D(D-1)$ unique LRs (Tellus: $\tfrac12\cdot52\cdot51=1326$), linearly interrelated with rank $d=D-1$. LRs map $S^d$ to $\mathbb R^d$.
^def-lr

> [!definition] Additive logratio, ALR (Eq. 3)
> $\operatorname{ALR}(j\mid\text{ref})=\log(x_j/x_\text{ref})$, $j\ne\text{ref}$: $d$ logratios with a common denominator (the reference). There are $D$ possible ALRs. If $\log x_\text{ref}$ has very low variance, ALRs are practically $\log x_j$ up to a near-constant. Wide data sets often contain such a near-constant reference.
^def-alr

> [!definition] Centred logratio, CLR (Eq. 4)
> $\operatorname{CLR}(j)=\log\frac{x_j}{g(\mathbf x)}=\log x_j-\frac1D\sum_k\log x_k$ with geometric mean $g(\mathbf x)=(x_1\cdots x_D)^{1/D}$. $\operatorname{CLR}(j)=\frac1D\sum_k\operatorname{LR}(j,k)$. The $D$ CLRs sum to zero so have rank $d$; they live in $T^d=\{\mathbf y\in\mathbb R^D:\sum y_j=0\}$ (Eq. 5). Euclidean distances on CLRs equal those on all $\tfrac12D(D-1)$ LRs, so the CLR transformation is *isometric*.
^def-clr

> [!definition] Log-contrast
> $\sum_ja_j\log x_j$ with $\sum_ja_j=0$ (ensures scale invariance). LR and ALR have coefficients $+1,-1$ on two parts; a CLR has $1-\tfrac1D$ on part $j$ and $-\tfrac1D$ on the others. If compositions are *predictors or responses*, all logratio transformations generate the same log-contrasts, so the choice among them is driven by interpretability, with LR/ALR being the most attractive.
^def-logcontrast

> [!definition] Isometry and ILR
> **Logratio geometry**: the set of distances between cases based on all LRs. A set of transformed variables is *isometric* if it reproduces this geometry exactly up to scale. ILRs use $d$ orthogonal log-contrasts. Example with parts A,B,C,D,E: $h_1=\tfrac12(\log A+\log B)-\tfrac13(\log C+\log D+\log E)=\log\frac{(AB)^{1/2}}{(CDE)^{1/3}}$ (coefficients $[\tfrac12,\tfrac12,-\tfrac13,-\tfrac13,-\tfrac13]$, sum 0); $h_2=\tfrac{1}{\sqrt2}$-type contrast of A vs B, etc. (Eq. 6 matrix: rows $[\tfrac12\ \tfrac12\ -\tfrac13\ -\tfrac13\ -\tfrac13]$, $[1\ -1\ 0\ 0\ 0]$, $[0\ 0\ 1\ -\tfrac12\ -\tfrac12]$, $[0\ 0\ 0\ 1\ -1]$ up to normalisation) giving a dendrogram of balances. $h_1$ equals the average of the six LRs between {A,B} and {C,D,E}.
^def-ilr

> [!theorem] Dispersion in compositions (Aitchison)
> The variation matrix $\mathbf T=[\tau_{jk}]$, $\tau_{jk}=\operatorname{Var}\log(x_j/x_k)$, and covariances of LRs follow from it: $\operatorname{Cov}(\operatorname{LR}(j,k),\operatorname{LR}(u,v))=\tfrac12(\tau_{jk}+\tau_{uv}-\tau_{ju}-\tau_{kv})$. Total logratio variability $=\frac1D\sum_{j<k}\tau_{jk}=\sum_j\operatorname{Var}(\operatorname{CLR}(j))$.
^thm-variation-matrix

Greenacre's version, $\text{TotVar}$, divides by $D$ again (weights $1/D^2$); weights on parts can be unequal. Distances are defined as *averages* rather than sums so they are comparable across numbers of parts (Sec. 3.9).

| Transform | # variables | Coherent? | Isometric? | Needs |
|---|---|---|---|---|
| LR (all pairs) | $\tfrac12D(D-1)$ | yes | yes (by definition) | selection of subset |
| ALR (reference) | $D-1$ | yes | approx. (quasi) | choice of reference |
| CLR | $D$ (rank $D-1$) | no (uses all parts) | yes | singular covariance |
| ILR / pivot | $D-1$ | no | yes | orthonormal basis; ratios of geometric means |
| SLR (amalgamation) | any | with respect to additions | not a log-contrast | subject-matter amalgams |

## Examples

> [!example] Python: ALR, CLR and ILR in numpy
> ```python
> import numpy as np
> x = np.array([[0.5, 0.3, 0.2], [0.2, 0.3, 0.5]])          # compositions (rows sum to 1)
> alr = np.log(x[:, :-1] / x[:, [-1]])                        # reference = last part
> clr = np.log(x) - np.log(x).mean(axis=1, keepdims=True)
> # one ILR basis: balance {1,2 | 3} and {1 | 2}
> V = np.array([[1/np.sqrt(6), 1/np.sqrt(6), -2/np.sqrt(6)],
>               [1/np.sqrt(2), -1/np.sqrt(2), 0]])
> ilr = clr @ V.T
> # CLR distances equal the "all-LR" distances (isometry)
> d_clr = np.linalg.norm(clr[0] - clr[1])
> ```
^ex-logratio-python

## Connections

Logratio response models: [[Greenacre 2023 - Compositional Outcome Models in PyMC]] and Dirichlet alternatives [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]].

## See Also

[[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]
