---
title: "Index: Calibration and Validation"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Agent-Based Modeling]]"
date_updated: 2026-04-11
doc_type: index
folder: "Research/Agent-Based Modeling/Calibration and Validation"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Calibration and Validation

> [!abstract] Routing Summary
> This topic covers the challenges and methods for calibrating and validating agent-based models. Contains 3 sub-topics and 10 total notes.
> - For calibration methods (GA, HM+ABC, uncertainty quantification) -> [[Calibration Methods/_Index|Calibration Methods]]
> - For experimental design and parameter sensitivity -> [[Experimental Design/_Index|Experimental Design]]
> - For validation challenges and standards -> [[Validation/_Index|Validation]]

## Sub-topics
- [[Calibration Methods/_Index|Calibration Methods]] — COVERS: ABM calibration overview (3 approaches), GA calibration (chromosome encoding, GA operators, convergence), Result-Analysis Module (macro/micro fitness), HM+ABC framework (implausibility score $I^r(x) = d^2/(V_s+V_o+V_m)$, wave-based pruning, ABC rejection sampling, $\varepsilon = 3(V_o+V_s+V_m)$), uncertainty quantification (4 sources: parameter uncertainty, model discrepancy, ensemble variance, observation uncertainty), case studies (SugarScape 10 waves, territorial birds 3,185 vs 11,000+ runs, RISC Scottish farms 16 binary variants + POM)
- [[Experimental Design/_Index|Experimental Design]] — COVERS: parameter initialization distributions, one-at-a-time experimental design, 100-replication strategy, WOM toggle, benchmark configuration, sensitivity findings
- [[Validation/_Index|Validation]] — COVERS: Merson's plausibility criterion, Troitzsch's systematic validation difficulty, input-output mismatch, stochastic variation, the plausibility standard

## Cross-Cutting Concepts
- **Micro-macro gap**: All sub-topics address the challenge of connecting agent-level parameters to population-level observables — calibration searches for the right micro parameters, experimental design explores their effects, and validation assesses whether the mapping is correct
- **Stochasticity management**: Replication (Karakaya, 100 runs), population-level fitness (Ben Said, GA), analytical baselines (Bonabeau), and ensemble variance quantification (McCulloch HM+ABC, $K$ runs per parameter set until variance stabilises) are all strategies for handling stochastic variation
- **Uncertainty acknowledgment**: The HM+ABC framework makes explicit what GA/SA/EA methods ignore — model discrepancy, ensemble variance, and observation uncertainty must be quantified and incorporated into the calibration criterion, not minimized away
- **Point estimate vs. posterior**: GA/simulated annealing/evolutionary algorithms find the best-fitting parameter set (computationally cheap, ~256–290 runs); HM+ABC finds the full posterior distribution of plausible parameters (more informative, ~3,185 runs); both are appropriate depending on whether uncertainty quantification is required

## Sources
- [[raw/abm_human_behaviour.pdf]] — GA calibration and RAM (Ben Said et al. 2002)
- [[raw/abm_consumer.pdf]] — Experimental design and sensitivity (Karakaya et al. 2011)
- [[raw/abm_word_of_mouth.pdf]] — Analytical baselines and validation discussion (Bonabeau 2002)
- [[raw/calibration_ABM.pdf]] — HM+ABC framework with UQ (McCulloch et al. 2022, JASSS 25(2))
