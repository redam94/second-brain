---
title: "Vine Copula References"
type: bibliography
date_created: 2026-10-30
note: "PDFs were located at freely accessible URLs (Project Euclid OA, LMU Munich working-paper repository) but could not be downloaded: academic domains (projecteuclid.org, epub.ub.uni-muenchen.de, arxiv.org, mediatum.ub.tum.de) were blocked by session network policy. Citations below are complete and accurate."
---

# Vine Copula Key References

## Foundational papers

**Bedford, T. and Cooke, R. M. (2001).** "Probability density decomposition for conditionally
dependent random variables modeled by vines." *Annals of Mathematics and Artificial
Intelligence* 32(1–4): 245–268.
- Introduced the vine graphical structure for decomposing multivariate distributions
- Companion to the 2002 paper; focuses on the density decomposition

**Bedford, T. and Cooke, R. M. (2002).** "Vines: A new graphical model for dependent random
variables." *Annals of Statistics* 30(4): 1031–1068. DOI: 10.1214/aos/1031689016
- Open access on Project Euclid (blocked by proxy)
- Defined regular vines (R-vines), C-vines, D-vines and the proximity condition
- Proved the density factorization theorem

**Aas, K., Czado, C., Frigessi, A. and Bakken, H. (2009).** "Pair-copula constructions of
multiple dependence." *Insurance: Mathematics and Economics* 44(2): 182–198.
- Working-paper version (2006): SFB 386 Discussion Paper 487, LMU Munich
  (epub.ub.uni-muenchen.de/1855/1/paper_487.pdf — blocked by proxy)
- Operationalized the vine framework for estimation; coined "pair copula construction"
- Sequential maximum likelihood; h-functions for conditional CDFs

## Reviews and textbooks

**Joe, H. (1996).** "Families of m-variate distributions with given margins and m(m-1)/2
bivariate dependence parameters." *IMS Lecture Notes Monograph Series* 28: 120–141.
- Early precursor: pair-copula idea without the vine graphical framework

**Kurowicka, D. and Cooke, R. M. (2006).** *Uncertainty Analysis with High Dimensional
Dependence Modelling.* Wiley.
- Book-length development of vine copulas

**Czado, C. (2019).** *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R.*
Lecture Notes in Statistics, Springer.
- Definitive practical reference; R-based; not open-access

## Software

- R: `VineCopula` (Schepsmeier et al.); `rvinecopulib` (Nagler & Vatter; C++ backend, faster)
- Python: `pyvinecopulib` (Nagler; wraps the C++ library)
- CRAN: https://cran.r-project.org/package=rvinecopulib
