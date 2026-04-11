---
title: "Index: Calibration and Validation"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Agent-Based Modeling]]"
date_updated: 2026-04-10
---

# Calibration and Validation

> [!abstract] Routing Summary
> This topic covers the challenges and methods for calibrating and validating agent-based models. Contains 3 sub-topics and 5 total notes.
> - For calibration methods (GA, experimental, analytical) -> [[Calibration Methods/_Index|Calibration Methods]]
> - For experimental design and parameter sensitivity -> [[Experimental Design/_Index|Experimental Design]]
> - For validation challenges and standards -> [[Validation/_Index|Validation]]

## Sub-topics
- [[Calibration Methods/_Index|Calibration Methods]] — COVERS: ABM calibration overview (3 approaches), genetic algorithm calibration (chromosome encoding, GA operators, convergence), Result-Analysis Module (dual macro/micro fitness evaluation)
- [[Experimental Design/_Index|Experimental Design]] — COVERS: parameter initialization distributions, one-at-a-time experimental design, 100-replication strategy, WOM toggle, benchmark configuration, sensitivity findings
- [[Validation/_Index|Validation]] — COVERS: Merson's plausibility criterion, Troitzsch's systematic validation difficulty, input-output mismatch, stochastic variation, the plausibility standard

## Cross-Cutting Concepts
- **Micro-macro gap**: All sub-topics address the challenge of connecting agent-level parameters to population-level observables — calibration searches for the right micro parameters, experimental design explores their effects, and validation assesses whether the mapping is correct
- **Stochasticity management**: Replication (Karakaya, 100 runs), population-level fitness (Ben Said, GA), and analytical baselines (Bonabeau) are all strategies for handling stochastic variation

## Sources
- [[raw/abm_human_behaviour.pdf]] — GA calibration and RAM
- [[raw/abm_consumer.pdf]] — Experimental design and sensitivity
- [[raw/abm_word_of_mouth.pdf]] — Analytical baselines and validation discussion
