---
title: "Index: Calibration Methods"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Calibration and Validation]]"
date_updated: 2026-04-11
concept_count: 8
doc_type: index
folder: "Research/Agent-Based Modeling/Calibration and Validation/Calibration Methods"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Calibration Methods

> [!abstract] Routing Summary
> This folder covers approaches to calibrating agent-based models. Contains 8 notes across two approaches: GA-based point estimation (Ben Said, Karakaya, Bonabeau) and uncertainty quantification-based calibration (McCulloch et al. 2022).
> - Need an overview of ABM calibration challenges and approaches? -> [[ABM Calibration Overview]]
> - Need the GA-based calibration procedure? -> [[Genetic Algorithm Calibration for ABM]]
> - Need the fitness evaluation mechanism? -> [[GA Fitness Evaluation and the RAM]]
> - Need the combined HM+ABC framework for calibration with uncertainty quantification? -> [[HM-ABC Calibration Framework]]
> - Need History Matching methodology (implausibility score, waves)? -> [[History Matching for ABMs]]
> - Need ABC rejection sampling for ABMs? -> [[Approximate Bayesian Computation for ABMs]]
> - Need the three ABM uncertainty types (model discrepancy, ensemble variance, observation)? -> [[Uncertainty Quantification for ABM Calibration]]
> - Need worked examples on SugarScape, birds, and RISC? -> [[ABM Calibration Case Studies]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Calibration overview | [[ABM Calibration Overview]] | concept | [[ABM Methodology and Principles]] | Three approaches: GA, controlled experiments, analytical baselines |
| GA calibration | [[Genetic Algorithm Calibration for ABM]] | concept | [[ABM Calibration Overview]] | 6-gene chromosome, roulette wheel selection, 85% crossover, 1% mutation |
| Fitness evaluation | [[GA Fitness Evaluation and the RAM]] | concept | [[Genetic Algorithm Calibration for ABM]] | Dual macro/micro evaluation comparing simulation to observed data |
| HM+ABC pipeline | [[HM-ABC Calibration Framework]] | overview | [[ABM Calibration Overview]] | 4-step pipeline: define space → quantify UQ → run HM → run ABC; 3,185 runs vs 11,000+ for ABC alone |
| History Matching | [[History Matching for ABMs]] | concept | [[HM-ABC Calibration Framework]], [[Uncertainty Quantification for ABM Calibration]] | Implausibility $I^r(x) = d^2 / (V_s + V_o + V_m)$; Pukelsheim $c=3$ rule |
| ABC for ABMs | [[Approximate Bayesian Computation for ABMs]] | concept | [[History Matching for ABMs]] | Rejection sampling with HM-informed prior; $\varepsilon = 3(V_o + V_s + V_m)$ |
| Uncertainty types | [[Uncertainty Quantification for ABM Calibration]] | concept | [[ABM Calibration Overview]] | 4 sources: parameter, model discrepancy, ensemble variance, observation uncertainty |
| Case studies | [[ABM Calibration Case Studies]] | example | [[HM-ABC Calibration Framework]] | SugarScape (2 params), birds (comparison to alternatives), RISC (16 binary model variants) |

## Notes

- [[ABM Calibration Overview]] — CONTAINS: why ABM calibration is hard (5 challenges), three calibration approaches comparison, general calibration workflow
- [[Genetic Algorithm Calibration for ABM]] — CONTAINS: chromosome encoding (6 genes), GA procedure (elite selection, roulette wheel, arithmetic crossover, mutation), parameter table, convergence results
- [[GA Fitness Evaluation and the RAM]] — CONTAINS: RAM architecture, Category 1 (macro curves), Category 2 (micro probes), fitness computation, integration with GA loop
- [[HM-ABC Calibration Framework]] — CONTAINS: 4-step pipeline overview, efficiency comparison table, birds 3,185 vs 11,000+ runs result, accuracy trade-off (coverage vs precision)
- [[History Matching for ABMs]] — CONTAINS: implausibility score (Eq. 1), model discrepancy variance (Eq. 2), ensemble variance (Eqs. 3–4), wave structure, LHS sampling, stopping criteria, SugarScape 10-wave example
- [[Approximate Bayesian Computation for ABMs]] — CONTAINS: rejection sampling algorithm, HM-informed prior, $\varepsilon$ threshold setting (Eq. 5), posterior refinement, accuracy table vs ABC alone
- [[Uncertainty Quantification for ABM Calibration]] — CONTAINS: 4 uncertainty sources (parameter uncertainty, model discrepancy $V^r_m$, ensemble variance $V^r_s$, observation uncertainty $V_o$), total uncertainty budget, why traditional calibration fails
- [[ABM Calibration Case Studies]] — CONTAINS: SugarScape step-by-step, birds model (3 fitting criteria, 3 waves, efficiency comparison vs simulated annealing/EA/ABC), RISC Scottish cattle farms (16 binary model variants, MASE error metric, POM application)

## Sources
- [[raw/abm_human_behaviour.pdf]] — GA calibration and RAM (Ben Said et al. 2002)
- [[raw/abm_consumer.pdf]] — Experimental calibration approach (Karakaya et al. 2011)
- [[raw/abm_word_of_mouth.pdf]] — Analytical baseline comparison (Bonabeau 2002)
- [[raw/calibration_ABM.pdf]] — HM+ABC framework (McCulloch et al. 2022, JASSS 25(2))
