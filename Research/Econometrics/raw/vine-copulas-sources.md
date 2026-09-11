---
title: "Source References: Vine / Pair-Copula Constructions"
tags: [source/reference, topic/econometrics]
date_created: 2026-09-11
note: "PDFs unavailable for download in this session (network egress blocked for arxiv.org, TUM epub, and other academic repositories). Notes written from training knowledge and WebSearch summaries."
---

# Vine / Pair-Copula Constructions — Source References

> [!note] Download status
> PDF downloads were not possible in this ingest session because outbound HTTPS connections
> to academic repositories (arxiv.org, epub.ub.uni-muenchen.de, mediaTUM, projecteuclid.org)
> were blocked by the session's egress proxy. Notes are written from training knowledge
> and WebSearch result summaries.

## Primary Sources

### Bedford & Cooke (2001)
- **Title:** "Probability density decomposition for conditionally dependent random variables modeled by vines"
- **Venue:** *Annals of Mathematics and Artificial Intelligence* 32(1–4), pp. 245–268
- **Key contribution:** Introduced the vine graphical model for encoding pair-copula constructions

### Bedford & Cooke (2002)
- **Title:** "Vines — a new graphical model for dependent random variables"
- **Venue:** *Annals of Statistics* 30(4), pp. 1031–1068
- **DOI:** 10.1214/aos/1031689016
- **Key contribution:** Formal theory of regular vines (R-vines), proximity condition, density factorization

### Aas, Czado, Frigessi & Bakken (2009)
- **Title:** "Pair-copula constructions of multiple dependence"
- **Venue:** *Insurance: Mathematics and Economics* 44(2), pp. 182–198
- **Key contribution:** Practical specification and estimation of C-vine and D-vine copulas using h-functions

### Dißmann, Brechmann, Czado & Kurowicka (2013)
- **Title:** "Selecting and estimating regular vine copulae and application to financial returns"
- **Venue:** *Computational Statistics & Data Analysis* 59, pp. 52–69
- **Key contribution:** Sequential structure-selection algorithm (maximum spanning tree by |Kendall's τ|)

### Czado (2019)
- **Title:** *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*
- **Series:** Lecture Notes in Statistics 222, Springer
- **Key contribution:** Comprehensive textbook treatment: estimation, selection, model diagnostics, software

### Joe (1997)
- **Title:** *Multivariate Models and Dependence Concepts*
- **Series:** Chapman & Hall
- **Key contribution:** Original conditional density decomposition (§4.5) predating the vine framework

## Software References
- **rvinecopulib** (R/C++): Nagler & Vatter — https://github.com/vinecopulib/rvinecopulib
- **pyvinecopulib** (Python): wrapper around rvinecopulib — https://github.com/vinecopulib/pyvinecopulib
- **VineCopula** (R): Schepsmeier et al. — CRAN package, original implementation
