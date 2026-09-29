# Vine Copula Sources: Bibliographic Summary

> **Note on PDF availability:** PDF downloads for all academic domains (arXiv, epub.ub.uni-muenchen.de, projecteuclid.org, tudelft.nl, inrialpes.fr) were blocked by the session's network egress policy. This file documents the key papers, their content, and bibliographic details drawn from training knowledge and WebSearch verification (2026-09-27). Original PDFs should be downloaded manually and placed alongside this file.

---

## Primary Sources

### 1. Aas, Czado, Frigessi & Bakken (2009)
**Title:** Pair-copula constructions of multiple dependence  
**Journal:** Insurance: Mathematics and Economics, 44(2), 182–198  
**DOI:** 10.1016/j.insmatheco.2007.02.001  
**Free preprint:** https://epub.ub.uni-muenchen.de/1855/1/paper_487.pdf (blocked in session)

**Key contributions:**
- Operationalises Bedford & Cooke's vine framework for statistical estimation
- Proposes sequential maximum likelihood: fit tree T₁ first, use pseudo-observations for T₂, etc.
- Works out the density formula for C-vine and D-vine explicitly
- Demonstrates pair-copula flexibility: each pair copula can be from a different family
- Applied to financial log-returns (Norwegian equities) and commodity prices

### 2. Bedford & Cooke (2001)
**Title:** Probability density decomposition for conditionally dependent random variables modeled by vines  
**Journal:** Annals of Mathematics and Artificial Intelligence, 32, 245–268

**Key contributions:**
- First introduction of vine (regular vine) as graphical framework
- Proves that d(d-1)/2 bivariate copulas suffice to specify any d-dimensional distribution
- Defines the vine tree sequence T₁, T₂, ..., T_{d-1}

### 3. Bedford & Cooke (2002)
**Title:** Vines — a new graphical model for dependent random variables  
**Journal:** Annals of Statistics, 30(4), 1031–1068  
**Free PDF:** TU Delft server https://filelist.tudelft.nl/.../mv3.pdf (blocked in session)  
**Project Euclid:** https://projecteuclid.org/journals/annals-of-statistics/volume-30/issue-4/

**Key contributions:**
- Full mathematical theory of regular vines (R-vines)
- Graph-theoretic conditions for valid vine structures (proximity condition)
- Proves density factorisation theorem: f = product of bivariate copulas × marginals
- Defines D-vines (path structure) and C-vines (star structure) as special cases

### 4. Dissmann, Brechmann, Czado & Kurowicka (2013)
**Title:** Selecting and estimating regular vine copulae and application to financial returns  
**Journal:** Computational Statistics & Data Analysis, 59, 52–69  
**arXiv:** https://arxiv.org/abs/1202.2002 (blocked in session)

**Key contributions:**
- Systematic algorithm for R-vine structure selection (Dissmann's algorithm)
- Greedy approach: maximise dependence measure (Kendall's τ) at each tree
- Full MLE for general R-vine
- Financial application: 5 European stock indices

### 5. Czado (2019)
**Title:** Analyzing Dependent Data with Vine Copulas  
**Publisher:** Springer Lecture Notes in Statistics, vol. 222  
**DOI:** 10.1007/978-3-030-13785-4

**Scope:** Comprehensive textbook treatment of vine copulas — pair-copula constructions, estimation, model selection, simulation, time-series extensions, spatial applications.

### 6. Czado (2010 chapter)
**Title:** Pair-Copula Constructions of Multivariate Copulas  
**In:** Copula Theory and Its Applications (Springer), pp. 93–109  
**Free PDF:** https://mediatum.ub.tum.de/doc/1079253/651951.pdf (blocked in session)

---

## Software References

- **VineCopula** (R): Schepsmeier, Stöber, Brechmann, Gräler, Nagler, Erhardt (2023). CRAN: VineCopula. Provides CDVineSeqEst, RVineMLE, BiCopSelect (AIC/BIC).
- **rvinecopulib** (R): Nagler, Vatter (2023). Wraps the C++ library vinecopulib. Faster, supports non-parametric families, mBICV model selection.
- **pyvinecopulib** (Python): vinecopulib GitHub org. Python bindings to the same C++ library.
- **CDVine** (R, legacy): Original package for C-vine and D-vine estimation.
