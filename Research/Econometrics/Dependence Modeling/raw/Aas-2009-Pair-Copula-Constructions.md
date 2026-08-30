---
type: source-reference
doc_type: paper
---

# Aas et al. (2009) — Pair-Copula Constructions of Multiple Dependence

**Full citation:**
Aas, K., Czado, C., Frigessi, A., & Bakken, H. (2009). Pair-copula constructions of multiple dependence. *Insurance: Mathematics and Economics*, 44(2), 182–198. https://doi.org/10.1016/j.insmatheco.2007.02.001

**Free access:** https://mistis.inrialpes.fr/docs/pair-copula-construction.pdf (blocked by proxy at ingest time; also at https://epub.ub.uni-muenchen.de/1855/1/paper_487.pdf)

**Abstract:** Financial data often exhibit complex patterns of dependence in the tails. Aas et al. show how multivariate data with such patterns can be modelled using a cascade of pair-copulae acting on two variables at a time. The paper provides the statistical inference framework (sequential MLE) and simulation algorithms for canonical (C-) and drawable (D-) vine pair-copula constructions.

## Key Sections

1. Introduction — motivation: bivariate copulas handle pairwise dependence, but multivariate extension is non-trivial; prior work (Joe 1996, Bedford & Cooke 2001, 2002) introduced the vine framework without full inference
2. Pair-copula constructions — the factorization of a d-dimensional density into d(d-1)/2 bivariate (conditional) copulas; the n! different decompositions and the vine organization
3. Canonical vine (C-vine) — star-tree structure with one root variable per tree; useful when one variable dominates
4. Drawable vine (D-vine) — path-tree structure; useful when no single variable dominates
5. Statistical inference — sequential parameter estimation (Inference Functions for Margins, IFM); log-likelihood; model selection via AIC/BIC
6. Simulation — algorithm for simulating from C-vine and D-vine
7. Application — Norwegian financial data (4 stocks + 2 currencies, n=6)
8. Appendices — proofs of density factorizations

## Key Results

- Any d-dimensional density admits d! distinct factorizations into bivariate copula densities; C-vine and D-vine are two canonical organisations using d(d-1)/2 pair copulas
- C-vine tree $T_j$ has one root node connected to all others (star structure); pair copulas in tree $T_j$ involve conditioning sets of size $j-1$
- D-vine tree $T_j$ is a path; each edge involves adjacent conditioning
- Sequential MLE estimates each pair copula one tree at a time, fixing previous-tree parameters; full MLE jointly optimizes all parameters
- Empirically: t-copulas preferred for most pairs; non-Gaussian pair copulas improve fit significantly over the Gaussian copula baseline
