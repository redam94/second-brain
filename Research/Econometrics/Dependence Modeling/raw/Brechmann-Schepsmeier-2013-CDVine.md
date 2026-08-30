---
type: source-reference
doc_type: paper
---

# Brechmann & Schepsmeier (2013) — Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine

**Full citation:**
Brechmann, E. C., & Schepsmeier, U. (2013). Modeling dependence with C- and D-vine copulas: The R package CDVine. *Journal of Statistical Software*, 52(3), 1–27. https://doi.org/10.18637/jss.v052.i03

**Free access:** https://www.jstatsoft.org/article/view/v052i03 (open access journal; blocked by proxy at ingest time)

**Abstract:** CDVine is an R package for statistical inference of C- and D-vine copula models. The package provides tools for: (1) fitting pair copula families (normal, Student-t, Clayton, Gumbel, Frank, Joe, and rotations/mixtures), (2) sequential and MLE estimation, (3) simulation, (4) model selection via AIC/BIC, (5) goodness-of-fit tests. Published in the Journal of Statistical Software (open access).

## Key Sections

1. C- and D-Vine Copulas — review of the pair copula decomposition, the C-vine and D-vine structures, formulas for densities and CDFs
2. Model selection — copula family selection per pair; structure (ordering) selection heuristics
3. Parameter estimation — sequential IFM estimator and joint MLE via `optim`
4. CDVine package — functions: `CDVineSeqEst`, `CDVineMLE`, `CDVineSim`, `CDVineCopSelect`, `CDVineLogLik`, `CDVineAIC`, `CDVineBIC`, `CDVineGoFTest`
5. Applications — financial returns (DAX constituents), insurance data
6. Comparison with independence and Gaussian benchmarks

## Key Functions (R)

```r
library(CDVine)
CDVineSeqEst(data, family, type = 1)   # type=1 C-vine, type=2 D-vine; sequential est.
CDVineMLE(data, family, type = 1)      # joint MLE
CDVineSim(N, family, par, type = 1)    # simulate from fitted vine
CDVineCopSelect(data, familyset, type) # AIC/BIC pair copula family selection
```

## Note
The CDVine package has been superseded by VineCopula (Schepsmeier et al.) for R-vine (general) support. The conceptual content remains the primary reference for C-vine and D-vine specific implementation.
