---
title: "Source Notes: Vine / Pair-Copula Construction Literature"
type: source-summary
date: 2026-08-24
status: proxy-blocked-pdf-unavailable
---

# Source Notes: Vine / Pair-Copula Construction Literature

> **Note:** PDFs could not be downloaded in this session because the network egress proxy blocks all academic domains (arXiv.org, epub.ub.uni-muenchen.de, jstatsoft.org, etc.). Notes were written from training knowledge of the cited papers.

## Primary Sources

### Aas, Czado, Frigessi & Bakken (2009)
"Pair-copula constructions of multiple dependence"  
*Insurance: Mathematics and Economics*, 44(2), 182-198.  
DOI: 10.1016/j.insmatheco.2007.02.001  
Free PDF: https://epub.ub.uni-muenchen.de/1855/1/paper_487.pdf (blocked in this session)

**Content summary:**  
Proposed using a cascade/sequence of bivariate copulas (pair copulas) to model multivariate dependence flexibly. Formalized C-vine (canonical vine) and D-vine (drawable vine) as special cases of the Bedford-Cooke vine. Introduced sequential likelihood-based estimation via the h-function recursion. Key result: any multivariate distribution factorizes into a product of d(d-1)/2 bivariate pair copulas arranged on d-1 trees, where each bivariate family can be chosen independently.

### Bedford & Cooke (2001, 2002)
"Probability density decomposition for conditionally dependent random variables modelled by vines"  
*Annals of Mathematics and Artificial Intelligence*, 32, 245-268 (2001).  
"Vines: A new graphical model for dependent random variables"  
*Annals of Statistics*, 30(4), 1031-1068 (2002).

**Content summary:**  
Original formal definition of regular vines (R-vines) as a graphical framework for organizing pair copula constructions. Defined the tree sequence T_1,...,T_{d-1}, the proximity condition, and the density factorization. C-vine and D-vine are special cases of the R-vine.

### Brechmann & Schepsmeier (2013)
"Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine"  
*Journal of Statistical Software*, 52(3), 1-27.  
DOI: 10.18637/jss.v052.i03  
Free (open access): https://www.jstatsoft.org/article/view/v052i03 (blocked in this session)

**Content summary:**  
Implementation reference for C- and D-vine copulas in R. Covers sequential and joint MLE estimation, copula family selection by AIC/BIC, goodness-of-fit tests, and simulation. Documents the CDVine package (now superseded by VineCopula).

### Czado (2019)
*Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*  
Springer Lecture Notes in Statistics, 222.

**Content summary:**  
Textbook treatment. Covers regular vines (R-vines), Dissmann et al. (2013) structure selection algorithm (max-spanning-tree on Kendall's tau), truncated vines, time-varying vines, Bayesian inference for vine copulas, and R package usage. More comprehensive than Aas et al. (2009).

### Czado & Nagler (2022)
"Vine Copula Based Modeling"  
*Annual Review of Statistics and Its Application*, 9, 453-477.

**Content summary:**  
Survey paper reviewing 15 years of vine copula development: estimation (sequential, full MLE, Bayesian), model selection, extensions to time series and spatial data, and current directions.

### Oh & Patton (2012/2017) — comparison baseline
"Modelling Dependence in High Dimensions with Factor Copulas"  
*Journal of Business and Economic Statistics* (JBES), 35(1), 139-154.

**Content summary:**  
Factor copula alternative for very high dimensions (50-100+). Notes that vine copulas have "hard-to-interpret/test assumptions" and do not scale as well. Provides the comparison point discussed in the vault's factor copula notes.
