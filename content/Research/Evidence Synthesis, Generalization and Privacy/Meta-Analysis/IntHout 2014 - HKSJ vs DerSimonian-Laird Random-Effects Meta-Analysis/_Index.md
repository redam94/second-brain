---
title: "Index: IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
tags:
  - type/index
  - source/ingested
  - topic/meta-analysis
parent: "[[../_Index|Meta-Analysis]]"
date_updated: 2026-11-08
concept_count: 7
---

# IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis

> [!abstract] Routing Summary
> This folder fully captures IntHout, Ioannidis and Borm (2014), *The Hartung-Knapp-Sidik-Jonkman method for random effects meta-analysis is straightforward and considerably outperforms the standard DerSimonian-Laird method* (BMC Med. Res. Methodol. 14:25): formal DL and HKSJ definitions, the simulation design and Table 1 of error rates, the 689-analysis Cochrane comparison (Table 2), the DL-to-HKSJ conversion with both worked examples (Tables 3-6) and the discussion. 7 notes.
> - Need the paper on one page, headline error rates, or the section map? -> [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
> - Need the DL and HKSJ formulas and the $\text{var}_{HKSJ}=q\,\text{var}_{DL}$ relation? -> [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]
> - Need the simulation design (scenarios, algorithms A-C)? -> [[IntHout 2014 - Simulation Design]]
> - Need Table 1 (min-max error rates) and the interpretation? -> [[IntHout 2014 - Simulation Results and Error Rates]]
> - Need the Cochrane 2012 empirical results (Table 2)? -> [[IntHout 2014 - Cochrane Empirical Comparison]]
> - Need to convert a DL forest plot to HKSJ, with the zinc and ALL examples and R code? -> [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]
> - Need limitations, alternative methods and recommendations? -> [[IntHout 2014 - Discussion, Limitations and Recommendations]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| DL variance and $z$-test | [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] | definition | [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] | $1/\sum w^\tau$, normal |
| HKSJ variance and $t$-test | [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] | definition | DL | weighted residual variance, $t_{k-1}$ |
| HKSJ as rescaled DL | [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] | theorem | both | $\text{var}_{HKSJ}=q\,\text{var}_{DL}$ |
| Size-mixture simulation | [[IntHout 2014 - Simulation Design]] | concept | I-squared | 10,000 series per scenario |
| DL inflation | [[IntHout 2014 - Simulation Results and Error Rates]] | theorem | design | up to 30.9-33.7% at $k=2$ |
| HKSJ near nominal | [[IntHout 2014 - Simulation Results and Error Rates]] | theorem | design | about 5%, at most about 10% |
| Table 1 | [[IntHout 2014 - Simulation Results and Error Rates]] | definition | simulation | min-max by mixture, outcome, $k$ |
| Cochrane comparison | [[IntHout 2014 - Cochrane Empirical Comparison]] | concept | HKSJ | 25.1% of DL positives lost |
| Conversion recipe | [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]] | definition | HKSJ | zinc $p$: 0.04 to 0.16 |
| Limitations | [[IntHout 2014 - Discussion, Limitations and Recommendations]] | theorem | all | caution for $\le5$ unequal studies |

## Notes

- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]] — CONTAINS: question, contributions, key results, full Source Map.
- [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] — CONTAINS: model, DL, HKSJ, scaling theorem and consequences, $I^2$, Python.
- [[IntHout 2014 - Simulation Design]] — CONTAINS: scenario grid, algorithms A-C, own replication and generator code.
- [[IntHout 2014 - Simulation Results and Error Rates]] — CONTAINS: Figure 1 reading, full Table 1, binary-outcome ranges.
- [[IntHout 2014 - Cochrane Empirical Comparison]] — CONTAINS: selection rules, Table 2, Thorlund corroboration, a flagged count inconsistency.
- [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]] — CONTAINS: recipe, Tables 3-6 step by step, R code, reproduction.
- [[IntHout 2014 - Discussion, Limitations and Recommendations]] — CONTAINS: evidence summary, caveats, alternative-method table, software status, conclusions.

## Sources

- IntHout J, Ioannidis JPA, Borm GF (2014). BMC Medical Research Methodology 14:25. PDF: IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis

## See Also

- [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]], [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]]
- [[Multiple Testing Corrections]], [[Power Analysis and Sample Size]]
