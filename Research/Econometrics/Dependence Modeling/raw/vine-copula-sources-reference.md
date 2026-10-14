---
title: "Vine Copula Sources — Bibliographic Reference"
type: reference
date_created: 2026-10-14
note: "PDF downloads blocked by session egress policy (403 on all external HTTPS). Sources confirmed freely available; content synthesised from WebSearch + model knowledge."
---

# Vine Copula Sources — Bibliographic Reference

This file documents the primary sources for the vine copula notes in this folder.
Actual PDFs could not be downloaded due to egress proxy restrictions (403 on all external HTTPS CONNECTs).
Content for the notes was synthesised from targeted WebSearch results and established knowledge of this literature.

## Primary Sources

### 1. Aas, Czado, Frigessi & Bakken (2009)
**Title:** "Pair-copula constructions of multiple dependence"
**Journal:** *Insurance: Mathematics and Economics*, 44(2), 182–198
**DOI:** 10.1016/j.insmatheco.2007.02.001
**Free preprint:** LMU Munich SFB 386, Paper 487 (2006) — confirmed available at epub.ub.uni-muenchen.de/1855/1/paper_487.pdf (proxy blocked)
**Content:** The canonical reference for pair-copula constructions (PCCs). Introduces the C-vine and D-vine density factorizations, the h-function recursion for conditional CDFs, and sequential maximum likelihood estimation. Applied to exchange rate data.

### 2. Bedford & Cooke (2001)
**Title:** "Probability density decomposition for conditionally dependent random variables modelled by vines"
**Journal:** *Annals of Mathematics and Artificial Intelligence*, 32, 245–268
**Content:** First formal introduction of R-vine structures as a graphical organising device for pair-copula constructions.

### 3. Bedford & Cooke (2002)
**Title:** "Vines — a new graphical model for dependent random variables"
**Journal:** *Annals of Statistics*, 30(4), 1031–1068
**Content:** Full statistical treatment of regular vines (R-vines), the proximity condition, and the density factorization theorem.

### 4. Brechmann & Schepsmeier (2013)
**Title:** "Modeling dependence with C- and D-vine copulas: The R package CDVine"
**Journal:** *Journal of Statistical Software*, 52(3), 1–27
**DOI:** 10.18637/jss.v052.i03
**Free:** Full open-access at jstatsoft.org/v52/i03 (proxy blocked)
**Content:** Software paper covering sequential and joint MLE, structure selection, simulation, and goodness-of-fit tests in C- and D-vines using R.

### 5. Czado & Nagler (2022)
**Title:** "Vine copula based modeling"
**Journal:** *Annual Review of Statistics and Its Application*, 9, 453–477
**DOI:** 10.1146/annurev-statistics-040220-101153
**Content:** Comprehensive review covering construction, estimation, model selection, and applications. Argues that vine copulas outperform elliptical and Archimedean families by using only bivariate building blocks.

### 6. Dißmann, Brechmann, Czado & Kurowicka (2013)
**Title:** "Selecting and estimating regular vine copulae and application to financial returns"
**Journal:** *Computational Statistics and Data Analysis*, 59, 52–69
**Content:** The tree-by-tree structure-selection algorithm (maximum spanning tree on Kendall's τ) now implemented in VineCopula and rvinecopulib as the default.

### 7. Nagler & Czado (2016)
**Title:** "Evading the curse of dimensionality in nonparametric density estimation with simplified vine copulas"
**Journal:** *Journal of Multivariate Analysis*, 151, 69–89
**Content:** Nonparametric (kernel-based) estimation of pair copulas; connects vine copulas to the nonparametric dependence modelling literature.

## Software
- **VineCopula** (R): Schepsmeier et al. — successor to CDVine; on CRAN
- **rvinecopulib** (R/C++): Nagler & Czado — fast C++ backend, supports discrete variables; on CRAN
- **pyvinecopulib** (Python): Python bindings for rvinecopulib
