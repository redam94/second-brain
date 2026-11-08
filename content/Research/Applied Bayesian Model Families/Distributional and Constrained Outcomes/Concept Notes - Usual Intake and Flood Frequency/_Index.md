---
title: "Index: Concept Notes - Usual Intake and Flood Frequency"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 2
---

# Concept Notes - Usual Intake and Flood Frequency

> [!abstract] Routing Summary
> Two **concept notes with no raw source**, covering topics in the PyMC examples for which no legally obtainable open primary paper was ingested: usual-intake estimation from repeated 24-hour recalls (E108) and log-Pearson III flood frequency with historic floods (E113). Each cites the standard literature and flags figures as from general knowledge.
> - Need usual-intake deconvolution, Box-Cox, Gauss-Hermite back-transform? -> [[Concept Notes - Usual Intake from Repeated Short-Term Measurements]]
> - Need log-Pearson III, frequency factors, censored historic floods? -> [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Usual intake model | [[Concept Notes - Usual Intake from Repeated Short-Term Measurements]] | definition | Box-Cox, random effects | $T(y_{ij})=u_i+e_{ij}$ |
| Gauss-Hermite back-transform | [[Concept Notes - Usual Intake from Repeated Short-Term Measurements]] | definition | usual intake | mean not median |
| Log-Pearson III | [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]] | definition | Pearson III | $\hat Q_T=10^{m+K_Ts}$ |
| Historic floods as censoring | [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]] | definition | LP3 | $F(\log X_H)^{H-k}$ |

## Notes

- [[Concept Notes - Usual Intake from Repeated Short-Term Measurements]] — CONTAINS: ISU/NCI model, back-transform, sampling issues, PyMC sketch, predictive checks.
- [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]] — CONTAINS: LP3 definition, frequency factor, censored historic information, pitfalls, Python.

## Sources

- No raw source (concept notes). Cited literature: Nusser et al. (1996); Tooze et al. (2006); Dodd et al. (2006); England et al. (2019, Bulletin 17C); Cohn et al. (1997).

## See Also

- [[Philip 2020 - Extreme Event Attribution Protocol - Overview]], [[Stasinopoulos 2007 - GAMLSS in R - Overview]]
