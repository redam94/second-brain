---
title: "Index: Calibration Methods"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Calibration and Validation]]"
date_updated: 2026-04-10
concept_count: 3
---

# Calibration Methods

> [!abstract] Routing Summary
> This folder covers approaches to calibrating agent-based models. Contains 3 notes.
> - Need an overview of ABM calibration challenges and approaches? -> [[ABM Calibration Overview]]
> - Need the GA-based calibration procedure? -> [[Genetic Algorithm Calibration for ABM]]
> - Need the fitness evaluation mechanism? -> [[GA Fitness Evaluation and the RAM]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Calibration overview | [[ABM Calibration Overview]] | concept | [[ABM Methodology and Principles]] | Three approaches: GA, controlled experiments, analytical baselines |
| GA calibration | [[Genetic Algorithm Calibration for ABM]] | concept | [[ABM Calibration Overview]] | 6-gene chromosome, roulette wheel selection, 85% crossover, 1% mutation |
| Fitness evaluation | [[GA Fitness Evaluation and the RAM]] | concept | [[Genetic Algorithm Calibration for ABM]] | Dual macro/micro evaluation comparing simulation to observed data |

## Notes

- [[ABM Calibration Overview]] — CONTAINS: why ABM calibration is hard (5 challenges), three calibration approaches comparison, general calibration workflow
- [[Genetic Algorithm Calibration for ABM]] — CONTAINS: chromosome encoding (6 genes), GA procedure (elite selection, roulette wheel, arithmetic crossover, mutation), parameter table, convergence results
- [[GA Fitness Evaluation and the RAM]] — CONTAINS: RAM architecture, Category 1 (macro curves), Category 2 (micro probes), fitness computation, integration with GA loop

## Sources
- [[raw/abm_human_behaviour.pdf]] — GA calibration and RAM (Ben Said et al. 2002)
- [[raw/abm_consumer.pdf]] — Experimental calibration approach (Karakaya et al. 2011)
- [[raw/abm_word_of_mouth.pdf]] — Analytical baseline comparison (Bonabeau 2002)
