---
title: "Index: Sterne 2011 - Funnel Plot Asymmetry"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/index
  - doc/paper
source: "[[raw/Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry.pdf]]"
parent: "[[../_Index|Meta-Analysis]]"
date_updated: 2026-11-08
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry"
doc_type: paper
concept_count: 7
aliases:
  - "Sterne 2011 - Funnel Plot Asymmetry index"
---
# Sterne 2011 - Funnel Plot Asymmetry

> [!abstract] Routing Summary
> This folder captures Sterne et al. (2011), the standard guidance on funnel plots and the Egger test (substituted for the 1997 Egger paper, whose PDF was not freely retrievable). It contains 4 notes covering all sections, Boxes 1-2 and Figures 1-5.
> - Need the paper on one page, the Egger-substitution note, or the section-to-note map? -> [[Sterne 2011 - Funnel Plot Asymmetry - Overview]]
> - Need funnel plot definitions, the 95% triangle, Box 1 (sources of asymmetry) or contour-enhanced plots? -> [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]
> - Need the Egger regression formulas, Box 2 testing rules, a simulation, or what Egger 1997 reported? -> [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]]
> - Need the magnesium example, fixed vs random pull, or regression extrapolation? -> [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Funnel plot; 95% region | [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] | definition | - | symmetric inverted funnel absent bias |
| Sources of asymmetry (Box 1) | [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] | definition | funnel plot | reporting bias, quality, heterogeneity, artefact, chance |
| Egger test | [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]] | definition | funnel plot | intercept $a$ in SND on precision; $a=0$ is symmetry |
| Egger equivalence | [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]] | theorem | Egger test | $a=\beta_1$, $b=\beta_0$ |
| Box 2 testing rules | [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]] | definition | Egger test | need ~10 studies; choose test by outcome and $\tau^2$ |
| Random-effects pull | [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] | theorem | asymmetry | RE estimate dominated by small studies |
| Magnesium example | [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] | example | fixed vs random | ISIS-4 90% weight; I2=68% |

## Notes

- [[Sterne 2011 - Funnel Plot Asymmetry - Overview]] - CONTAINS: question, contributions, source substitution note, Source Map, one-line recommendations.
- [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]] - CONTAINS: Def. funnel plot and 95% triangle; Box 1; heterogeneity, reporting-bias and chance sections; interpretation rules; Fig 1-3.
- [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]] - CONTAINS: Def./Thm. Egger regression and equivalence; binary-outcome coupling; Box 2; decision table; Egger 1997 abstract results; simulation + Python.
- [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]] - CONTAINS: Thm. random-effects pull; magnesium example (Fig 4-5); compare-FE-RE rule; regression extrapolation; discussion; numeric illustration.

## Sources

- Sterne et al. (2011), BMJ 342:d4002, doi:10.1136/bmj.d4002 - Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry (substituted for Egger et al. 1997, BMJ 315:629).

## See Also

- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
