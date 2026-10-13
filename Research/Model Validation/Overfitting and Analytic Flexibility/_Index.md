---
title: "Index: Overfitting and Analytic Flexibility"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Model Validation]]"
date_updated: 2026-10-13
concept_count: 3
---

# Overfitting and Analytic Flexibility

> [!abstract] Routing Summary
> This folder covers why small samples, many candidate predictors, and best-of-many analysis choices produce optimistic or false findings. Contains 3 reference notes.
> - Need minimum sample size for a prediction model? → [[Riley et al 2020 - Sample Size for Prediction Models]]
> - Need why small effects + flexible analysis yield false findings? → [[Ioannidis 2005 - Why Most Published Research Findings Are False]]
> - Need researcher degrees of freedom / p-hacking simulation? → [[Simmons et al 2011 - False-Positive Psychology]]

## Concept Map

| Note | Type | Key Result |
|------|------|------------|
| [[Riley et al 2020 - Sample Size for Prediction Models]] | definition | Riley's criteria: shrinkage $S\ge0.9$, optimism in $R^2_{Nag}\le0.05$, precise overall risk; $p$ counts all parameters *considered* |
| [[Ioannidis 2005 - Why Most Published Research Findings Are False]] | theorem | PPV $= (1-\beta)R/(R-\beta R+\alpha)$, eroded by bias $u$ and many teams |
| [[Simmons et al 2011 - False-Positive Psychology]] | definition | Four routine choices combined → ~61% false-positive rate |

## Notes

- [[Riley et al 2020 - Sample Size for Prediction Models]] — CONTAINS: Riley sample-size criteria (^def-riley-criteria); $n \ge p/((S-1)\ln(1-R^2_{CS}/S))$; apparent performance is optimistic; Chan & Perry / Jin et al small-n context
- [[Ioannidis 2005 - Why Most Published Research Findings Are False]] — CONTAINS: PPV formulas with bias and multiple teams (^thm-ioannidis-ppv); six corollaries
- [[Simmons et al 2011 - False-Positive Psychology]] — CONTAINS: Definition of researcher degrees of freedom; per-choice false-positive rates; six author requirements, four reviewer guidelines

## Sources
- [[Research/Model Validation/raw/model-validation-references.md|Model validation references]] — bibliography and verified quotations

## See Also
- [[../_Index|Model Validation]] — parent topic
