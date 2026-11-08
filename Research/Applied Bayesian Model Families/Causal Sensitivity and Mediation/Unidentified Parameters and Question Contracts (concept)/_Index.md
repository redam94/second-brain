---
title: "Index: Unidentified Parameters and Question Contracts (concept)"
tags:
  - type/index
  - source/ingested
  - topic/causal-sensitivity
parent: "[[../_Index|Causal Sensitivity and Mediation]]"
date_updated: 2026-11-08
concept_count: 5
---

# Unidentified Parameters and Question Contracts (concept)

> [!abstract] Routing Summary
> This folder holds two concept notes (no raw source) on parameters the data cannot identify and on keeping a Bayesian answer tied to its question, motivated by PyMC example E62. They cite the partial-identification literature (Kadane, Poirier, Manski, Gustafson) and the workflow literature, and use small calculations verified in this vault.
> - Need why the posterior of an unidentified parameter stays prior-driven (proof, ridge example)? → [[Unidentified Parameters - Partial Identification and Bayesian Updating]]
> - Need question contracts, prior swapping vs contraction, baseline-vs-media non-identifiability, lift-test value, robust decisions? → [[Unidentified Parameters - Keeping the Answer on the Question]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Identified set / partial identification | Unidentified Parameters - Partial Identification and Bayesian Updating | definition | likelihood through $\phi=g(\theta)$ | identified part only |
| Conditional prior unchanged | Unidentified Parameters - Partial Identification and Bayesian Updating | theorem | Bayes' rule | $p(\psi|\phi,y)=p(\psi|\phi)$ |
| Ridge posterior | Unidentified Parameters - Partial Identification and Bayesian Updating | example | theorem | SD of $a$ = 0.71/1.42/3.54 for prior SD 1/2/5 |
| Question contract | Unidentified Parameters - Keeping the Answer on the Question | concept | estimand + decision | what must be identified |
| Lift-test value under collinearity | Unidentified Parameters - Keeping the Answer on the Question | example | ridge | SD of $\beta$ 0.632 to 0.099 at corr 0.988 |

## Notes

- [[Unidentified Parameters - Partial Identification and Bayesian Updating]] — CONTAINS: Def. identified set; Thm conditional prior unchanged + proof; ridge example with table; table of unidentified parts across the cluster's methods; Python.
- [[Unidentified Parameters - Keeping the Answer on the Question]] — CONTAINS: question contract; prior swap vs contraction; baseline vs media and LOO; lift-test value table; fake-data recovery; robust decisions; timing one gradient; Python.

## Sources
- No raw source: concept notes citing Kadane (1974), Poirier (1998), Manski (2003), Gustafson (2015), Betancourt (2018), Vehtari-Gelman-Gabry (2017), Talts et al. (2018), Chan & Perry (2017).

## See Also
- [[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]], [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]], [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]].
- [[Prior Predictive Checking]], [[Bayesian Estimation and Priors for MMM]].
