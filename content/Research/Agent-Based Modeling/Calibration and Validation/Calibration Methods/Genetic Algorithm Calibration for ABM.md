---
title: Genetic Algorithm Calibration for ABM
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/calibration
  - topic/genetic-algorithms
  - type/concept
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "pp. 187-188"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Calibration and Validation/Calibration Methods"
doc_type: paper
depends_on:
  - "[[ABM Calibration Overview]]"
  - "[[CUBES Simulator Architecture]]"
  - "[[Behavioral Attitudes in CUBES]]"
used_by:
  - "[[GA Fitness Evaluation and the RAM]]"
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - GA calibration
  - Genetic algorithm for ABM
  - Evolutionary calibration
---

# Genetic Algorithm Calibration for ABM

> [!summary]
> Ben Said et al. (2002) use genetic algorithms to calibrate the CUBES consumer agent population. Each GA chromosome encodes an agent's behavioral and socio-economic characteristics (6 genes). The GA evolves a population of agent configurations through fitness-proportionate selection, arithmetic crossover, and mutation, evaluated by a Result-Analysis Module that compares simulated market outcomes to observed data. This approach enables automated discovery of realistic agent population parameters.

## Overview

Genetic algorithms (Holland 1975) have been used for evolving complex systems including neural networks and cellular automata. Ben Said et al. apply GA to the specific problem of calibrating ABM agent populations — finding the parameter values for individual agents that, when combined in a simulation, reproduce observed market phenomena.

## Main Content

### Chromosome Encoding

> [!definition] Definition: Consumer Agent Chromosome (Ben Said et al. 2002)
> Each consumer agent is represented by a chromosome encoding 6 characteristics:
> 1. **BA characteristics**: The behavioral attitude intensity values (mistrust, opportunism, conditioning, innovativeness, imitation)
> 2. **Age**: The consumer agent's age
> 3. **Number of acquaintances**: Size of the agent's social network
> 4. **Social class**: The social class to which the consumer agent belongs
> 5. **Professional and educational levels**: Socio-economic status
> 6. **Product necessity**: How essential the product is for this consumer
>
> Most parameters are real numbers, encoded using a **value-encoding** technique.
^def-ga-chromosome

### GA Procedure

The GA follows a standard evolutionary loop with specific design choices:

#### Step 1: Fitness Evaluation

For each consumer agent chromosome $C_i$ ($i \in [1, N]$):
- A fitness value $f_i$ is calculated by the **Result-Analysis Module (RAM)**
- The RAM associates a fitness score to each individual agent by comparing their simulated behavior to macro-level observed results
- See [[GA Fitness Evaluation and the RAM]] for details

#### Step 2: Elite Selection

A portion of consumer agent chromosomes having the highest fitness (elite) are copied without modification into the next generation.
- **Elite rate**: 10% of the population size

#### Step 3: Selection, Crossover, and Mutation

**Selection**: Fitness-proportionate (**Roulette Wheel** selection method)
- Individuals with higher fitness have proportionally higher probability of being selected as parents

**Crossover**: Arithmetic crossover with a random mixing parameter $p \in [0, 1]$:

> [!definition] Definition: Arithmetic Crossover (Ben Said et al. 2002)
> Given two parent chromosomes $(a_1, b_1, pc_1, c_1, pd_1, d_1)$ and $(a_2, b_2, pc_2, c_2, pd_2, d_2)$, the two offspring are:
> - Child 1: $(pa_1 + (1-p)a_2, pb_1 + (1-p)b_2, ppc_1 + (1-p)pc_2, pc_1 + (1-p)c_2, ppd_1 + (1-p)pd_2, pd_1 + (1-p)d_2)$
> - Child 2: $(pa_2 + (1-p)a_1, pb_2 + (1-p)b_1, ppc_2 + (1-p)pc_1, pc_2 + (1-p)c_1, ppd_2 + (1-p)pd_1, pd_2 + (1-p)d_1)$
>
> **Crossover rate**: 85%
^def-arithmetic-crossover

**Mutation**: Random perturbation within the definition range of the chosen gene
- **Mutation rate**: 1%
- Picks a random value within the gene's valid range

#### Step 4: Termination

Two termination criteria (combined):
1. The proportion of individuals whose fitness exceeds a fixed value reaches a certain percentage
2. The global fitness of the population does not vary during a fixed number of GA iterations (convergence)

### GA Parameters Summary

| Parameter | Value |
|-----------|-------|
| Population size | N consumer agents (thousands) |
| Elite rate | 10% |
| Selection method | Roulette Wheel (fitness-proportionate) |
| Crossover type | Arithmetic |
| Crossover rate | 85% |
| Mutation rate | 1% |
| Encoding | Value encoding (real numbers) |
| Termination | Dual criterion (fitness threshold + convergence) |

### Convergence Results

The average population fitness over 45 generations (Figure 5 in paper) shows:
- Rapid improvement in the first ~10 generations
- Gradual convergence over generations 10-30
- Near-plateau after ~35 generations
- Population of 5000 consumer agents achieves realistic behavioral patterns

## Connections

- The fitness evaluation is detailed in [[GA Fitness Evaluation and the RAM]]
- The chromosomes encode properties from [[Behavioral Attitudes in CUBES]] and the [[CUBES Simulator Architecture]]
- GA calibration is one approach discussed in [[ABM Calibration Overview]]
- The calibrated population produces the emergent phenomena in [[Market Share Equilibrium and Lock-In]]

## See Also
- [[GA Fitness Evaluation and the RAM]] — how fitness is computed
- [[ABM Calibration Overview]] — broader context of ABM calibration
- [[Behavioral Attitudes in CUBES]] — the attitudes encoded in chromosomes
- [[ABM Methodology and Principles]] — the foundational ABM framework that defines why calibration is needed
