---
title: ABM Calibration Overview
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/calibration
  - type/concept
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "pp. 187-188"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Calibration and Validation/Calibration Methods"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Heterogeneity in Agent Models]]"
used_by:
  - "[[Genetic Algorithm Calibration for ABM]]"
  - "[[GA Fitness Evaluation and the RAM]]"
  - "[[ABM Validation Challenges]]"
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
aliases:
  - ABM calibration
  - Model calibration
  - Parameter estimation for ABM
---

# ABM Calibration Overview

> [!summary]
> Calibrating an ABM means finding agent-level parameter values that produce realistic macro-level outcomes. This is fundamentally harder than calibrating equation-based models because the mapping from micro parameters to macro observables is nonlinear, stochastic, and high-dimensional. The three papers illustrate different calibration strategies: genetic algorithms (Ben Said), controlled experimentation with replication (Karakaya), and comparison to analytical baselines (Bonabeau).

## Overview

Calibration is the process of adjusting model parameters so that the model's outputs match observed real-world data. For ABM, this is a particularly challenging inverse problem: given observed macro-level patterns (market shares, diffusion curves, sales volumes), find the micro-level agent parameters (preferences, sensitivities, behavioral thresholds) that produce these patterns when agents interact.

## Main Content

### The Calibration Challenge for ABM

> [!important] Why ABM Calibration Is Hard
> ABM calibration faces several unique challenges compared to equation-based model calibration:
> 1. **High dimensionality**: Each agent can have many parameters, and with $N$ heterogeneous agents, the parameter space is enormous
> 2. **Nonlinear micro-macro mapping**: Small changes in agent rules can produce large changes in emergent behavior (and vice versa)
> 3. **Stochasticity**: The same parameters can produce different outcomes across simulation runs
> 4. **Equifinality**: Different parameter combinations may produce the same macro-level patterns
> 5. **Computational cost**: Each evaluation requires running a full simulation

### Calibration Approaches Across the Papers

#### Genetic Algorithm Calibration (Ben Said et al. 2002)

The most sophisticated approach: a GA evolves a population of agent chromosome configurations, evaluated by comparing simulation outputs to observed market data. This is detailed in [[Genetic Algorithm Calibration for ABM]] and [[GA Fitness Evaluation and the RAM]].

**Strengths**: Can explore large parameter spaces, handles nonlinearity and stochasticity
**Weaknesses**: Computationally expensive, may find local optima, requires observed data for fitness evaluation

#### Controlled Experimentation (Karakaya et al. 2011)

Karakaya uses a systematic experimental design:
- Parameters are initialized using domain knowledge and literature values
- Five decision variables are varied one at a time while holding others constant
- Each experiment is replicated 100 times to account for stochasticity
- Results are compared qualitatively to known marketing phenomena

**Strengths**: Transparent, interpretable, identifies individual parameter effects
**Weaknesses**: Does not systematically search the parameter space, relies on domain knowledge for initial values

#### Analytical Baseline Comparison (Bonabeau 2002)

Bonabeau calibrates implicitly by comparing ABM outputs to known analytical solutions:
- When the ABM with random networks matches the differential equation solution, the model is "calibrated" to the known baseline
- Deviations from the baseline (e.g., under clustered networks) are then attributable to the structural difference, not to parameter misspecification

**Strengths**: Provides clear benchmark, separates structural from parametric effects
**Weaknesses**: Only works when an analytical solution exists for comparison

### General Calibration Workflow

1. **Define target observables**: What macro-level patterns should the model reproduce? (market shares, diffusion curves, sales patterns)
2. **Specify parameter ranges**: Use domain knowledge to bound plausible parameter values
3. **Choose search strategy**: GA, grid search, Bayesian optimization, manual tuning
4. **Define fitness/loss function**: How to measure the distance between simulated and observed patterns
5. **Run calibration**: Search the parameter space, evaluating each candidate by running simulations
6. **Validate**: Check that calibrated parameters produce realistic behavior on held-out data or unseen scenarios

## Connections

- The GA approach is detailed in [[Genetic Algorithm Calibration for ABM]] and [[GA Fitness Evaluation and the RAM]]
- The experimental approach is detailed in [[Population Initialization and Parameter Sensitivity]]
- Calibration success must be assessed through [[ABM Validation Challenges|validation]]
- Agent heterogeneity ([[Heterogeneity in Agent Models]]) is what makes calibration high-dimensional

## See Also
- [[Genetic Algorithm Calibration for ABM]] — the GA-based calibration method
- [[GA Fitness Evaluation and the RAM]] — how calibration fitness is measured
- [[Population Initialization and Parameter Sensitivity]] — experimental calibration approach
- [[ABM Validation Challenges]] — validating calibrated models
