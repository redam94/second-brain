---
title: "Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (cites the literature listed under Sources)"
source_location: "Literature synthesis (see Sources)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Lazy Evaluation and Local Kernels]]"
  - "[[Hilbert Space Gaussian Processes]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Research/Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions/_Index|Index for this source]]"
aliases:
  - Exact GP cost versus value
  - When an exact GP does not earn its price
---

# Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price

> [!summary]
> Concept note, no raw source. An exact GP costs $O(n^3)$ time and $O(n^2)$ memory; at $n\approx24{,}000$ the covariance matrix alone is about 4.6 GB in float64. The decision-relevant test of whether it earns that price is whether a cheaper approximation (HSGP, inducing points, local kernels) changes the *decision*, such as which sites are chosen, not whether it changes the fit.

## Overview

E92 (**Where should the next Argo floats go? An exact Gaussian process that did not earn its price**) fits "a two-scale space-time Matern GP with westward propagation ... exactly at n = 23,939, a blocked hand-coded gradient, Laplace with PSIS-weighted Sobol points and a NUTS audit of it in PyMC, a nugget at its prior edge, exact against ..." (the listed method string is truncated in the example index). Its title states the finding: the exact GP did not pay for itself relative to alternatives. This note records the cost arithmetic and the decision-based yardstick; the specific E92 comparison results are in the example, not reproduced here.

## Main Content

> [!definition] Exact GP cost
> Marginal likelihood of $n$ points needs a Cholesky factor of the $n\times n$ covariance: $\approx n^3/3$ flops, $n^2$ stored entries, repeated for every hyperparameter gradient step. Prediction at $n_*$ sites costs $O(nn_*+n^2)$ per solve after the factor.
^def-exact-gp-cost

> [!example] Arithmetic for $n=23{,}939$ (this vault's calculation)
> Entries $n^2=5.73\times10^8$; float64 $=4.58$ GB; float32 $=2.29$ GB; Cholesky $\approx4.6\times10^{12}$ flops per factorisation. A fit needing hundreds of gradient evaluations multiplies that accordingly, which is the "price" side of the ledger in [[Value of Information Concept Note - Pricing a Model with EVPI]].
^ex-exact-gp-arithmetic

**Cheaper alternatives.**
- *Hilbert-space (HSGP) approximation* with $m$ basis functions: cost about $O(nm+m^3)$ per likelihood, with basis count growing as length scales shrink relative to the domain (Solin and Sarkka 2020; Riutort-Mayol et al. 2023); see [[Hilbert Space Gaussian Processes]].
- *Local or compact-support kernels* and neighbour truncation: [[Krause 2008 - Lazy Evaluation and Local Kernels]] shows a provable loss $2kn\varepsilon_2/\sigma^4$ for truncation $\varepsilon_2$.
- *Inducing-point / sparse GPs*, *Vecchia/nearest-neighbour* approximations, *SPDE/INLA* for Matern fields (named for orientation; not detailed in this vault).

> [!theorem] Decision-based criterion for paying for exactness
> Let $d_{\text{exact}}$ and $d_{\text{approx}}$ be the decisions (for example selected sites) from the exact and approximate posteriors, and $U$ the utility under the exact posterior. The exact model earns its price iff $\mathbb{E}[U(d_{\text{exact}})-U(d_{\text{approx}})]>\text{price}(\text{exact})-\text{price}(\text{approx})$. If the two decisions coincide on the relevant range, the left side is zero and the approximation wins on any positive price gap.
^thm-exact-vs-approx

*Why this is natural for siting.* In Krause's setting the posterior variance, hence the siting objective, depends only on the kernel and locations, not on data values; errors in approximating the posterior mean never affect siting, only errors in the variance surface do. A conservative approximation of the variance may leave the ranking of top sites intact.

## Examples

Check for any approximation: compute the top-$k$ sites by greedy MI under the exact and approximate kernels on a small subsample and compare overlap and the achieved exact-model MI. If the approximate set achieves, say, at least 98% of the exact set's MI, the extra compute buys nothing decision-relevant; the 98% figure is an illustrative tolerance, not from a source.

```python
def regret(exact_value, approx_set, exact_best_set):
    """Relative loss of choosing approx_set evaluated under the exact objective."""
    return 1 - exact_value(approx_set)/exact_value(exact_best_set)
```

## Connections
- Marketing: for geo-level or time-varying response surfaces, ask whether the exact GP changes the *budget allocation*; if an HSGP gives the same allocation, buy the HSGP.
- Cost side: [[Value of Information Concept Note - Pricing a Model with EVPI]]; value side: [[Value of Information Concept Note - EVPI, EVPPI and EVSI]].

## See Also
- [[Gaussian Process Regression]], [[Hilbert Space Gaussian Processes]], [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]

## Sources
- Solin and Sarkka (2020), Hilbert space methods for reduced-rank GP regression, *Statistics and Computing* 30:419-446. Riutort-Mayol, Burkner, Andersen, Solin and Vehtari (2023), Practical Hilbert space approximate Bayesian GPs, *Statistics and Computing* 33:17 (citations from memory; verify). Krause et al. (2008). E92 method list at <https://redam94.github.io/pymc-challenges/examples.html>.
