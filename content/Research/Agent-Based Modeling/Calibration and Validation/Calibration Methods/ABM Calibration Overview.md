---
title: ABM Calibration Overview
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/calibration
  - type/concept
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "pp. 187-188; also [[raw/calibration_ABM.pdf]] Sections 1–2"
date_ingested: 2026-04-10
date_updated: 2026-04-11
folder: "Agent-Based Modeling/Calibration and Validation/Calibration Methods"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Heterogeneity in Agent Models]]"
used_by:
  - "[[Genetic Algorithm Calibration for ABM]]"
  - "[[GA Fitness Evaluation and the RAM]]"
  - "[[HM-ABC Calibration Framework]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
  - "[[ABM Validation Challenges]]"
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
aliases:
  - ABM calibration
  - Model calibration
  - Parameter estimation for ABM
---

# ABM Calibration Overview

> [!summary]
> Calibrating an ABM means finding agent-level parameter values that produce realistic macro-level outcomes. This is fundamentally harder than calibrating equation-based models because the mapping from micro parameters to macro observables is nonlinear, stochastic, and high-dimensional. Four distinct strategies appear in the literature: genetic algorithms (Ben Said 2002), controlled experimentation (Karakaya 2011), analytical baseline comparison (Bonabeau 2002), and uncertainty-quantification-based calibration combining History Matching with Approximate Bayesian Computation (McCulloch et al. 2022). The first three yield point estimates; HM+ABC yields a full posterior distribution with explicit uncertainty bounds.

## Overview

Calibration is the process of adjusting model parameters so that the model's outputs match observed real-world data. For ABM, this is a particularly challenging inverse problem: given observed macro-level patterns (market shares, diffusion curves, farm size distributions), find the micro-level agent parameters (preferences, sensitivities, behavioral thresholds) that produce these patterns when agents interact.

## The Calibration Challenge for ABM

> [!important] Why ABM Calibration Is Hard
> ABM calibration faces several unique challenges compared to equation-based model calibration:
> 1. **High dimensionality**: Each agent can have many parameters, and with $N$ heterogeneous agents, the parameter space is enormous
> 2. **Nonlinear micro-macro mapping**: Small changes in agent rules can produce large changes in emergent behavior (and vice versa)
> 3. **Stochasticity**: The same parameters can produce different outcomes across simulation runs — requiring replication to estimate expected outputs
> 4. **Equifinality / identifiability**: Different parameter combinations may produce the same macro-level patterns; no unique solution exists
> 5. **Computational cost**: Each evaluation requires running a full simulation; for large ABMs a single run may take minutes or hours
> 6. **Model discrepancy**: Even with perfect parameters, the model is an abstraction — it cannot perfectly replicate reality; ignoring this inflates overconfidence in calibrated estimates

## Calibration Methods

### Point Estimation Methods

These methods return a single best-fitting parameter set. They are computationally cheaper but provide no uncertainty quantification.

#### Genetic Algorithm Calibration (Ben Said et al. 2002)

A GA evolves a population of agent chromosome configurations, evaluated by a dual macro/micro fitness function (the RAM). This is the most sophisticated point-estimation approach in this literature.

- **How**: Chromosome encodes 6 agent parameters; roulette wheel selection, 85% crossover rate, 1% mutation; population evaluated by comparing simulation outputs to observed market data
- **Strengths**: Explores large non-linear parameter spaces; handles stochasticity via population-level averaging
- **Weaknesses**: Produces a point estimate only; no posterior; may find local optima; does not quantify model discrepancy or observation uncertainty
- **Detail**: [[Genetic Algorithm Calibration for ABM]], [[GA Fitness Evaluation and the RAM]]

#### Controlled Experimentation (Karakaya et al. 2011)

A systematic one-at-a-time experimental design:
- Parameters initialized from domain knowledge and literature
- Each decision variable varied while others are held constant
- 100 replications per condition to account for stochasticity
- Results compared qualitatively to known marketing phenomena

- **Strengths**: Transparent, identifies individual parameter effects, interpretable
- **Weaknesses**: Does not search the full parameter space; relies on prior knowledge for initial values; no systematic uncertainty quantification
- **Detail**: [[Population Initialization and Parameter Sensitivity]]

#### Simulated Annealing and Evolutionary Algorithms

Used in the territorial birds literature (Thiele et al. 2014) as comparators to HM+ABC:
- **Simulated annealing**: ~256 model runs; searches for single best-fit parameter set
- **Evolutionary algorithms**: ~290 model runs; similar goal
- **Strengths**: Fewer model runs than distributional methods
- **Weaknesses**: Point estimates only; no posterior; fewer runs means less accurate ensemble variance estimation

#### Analytical Baseline Comparison (Bonabeau 2002)

Calibrates implicitly by comparing ABM outputs to known analytical solutions (e.g., differential equation solutions for mean-field networks):
- Deviations from the baseline under structured networks are attributable to structure, not parameter misspecification

- **Strengths**: Clear benchmark; separates structural from parametric effects
- **Weaknesses**: Only works when an analytical solution exists

### Distributional / Uncertainty-Quantification Methods

These methods return a posterior distribution over the parameter space and explicitly quantify uncertainty. More informative but require more model runs.

#### History Matching + Approximate Bayesian Computation (McCulloch et al. 2022)

The current state-of-the-art approach for ABM calibration with full uncertainty quantification. A two-stage pipeline:

**Stage 1 — History Matching (HM)**: Iteratively eliminate implausible parameter regions using an implausibility score:
$$
I^r(x) = \frac{d^2(z^r, f^r(x))}{V^r_s + V^r_o + V^r_m}
$$
where $V^r_s$ = ensemble variance, $V^r_o$ = observation uncertainty, $V^r_m$ = model discrepancy. Parameters with $I^r(x) \geq 3$ are discarded. Waves continue until the non-implausible space stops shrinking.

**Stage 2 — Approximate Bayesian Computation (ABC)**: Sample from the HM non-implausible region as a uniform prior; accept samples where model error $\leq \varepsilon = 3(V_o + V^r_s + V^r_m)$. Returns a full posterior distribution.

- **Strengths**: Full posterior distribution; explicit uncertainty quantification; more efficient than ABC alone (3,185 vs 11,000+ runs in the birds case study); applies to Pattern-Oriented Modelling (multiple model variants)
- **Weaknesses**: More runs than point-estimation methods (vs. ~256–290 for SA/EA); 95% CIs slightly narrower than ABC alone (trades coverage for precision)
- **Detail**: [[HM-ABC Calibration Framework]], [[History Matching for ABMs]], [[Approximate Bayesian Computation for ABMs]], [[Uncertainty Quantification for ABM Calibration]], [[ABM Calibration Case Studies]]

## Methods Comparison

| Method | Output | Model Runs (birds) | Uncertainty QU | Handles Stochasticity |
|--------|--------|--------------------|----------------|----------------------|
| Simulated annealing | Point estimate | ~256 | No | Implicitly |
| Evolutionary algorithms | Point estimate | ~290 | No | Implicitly |
| Genetic algorithm (Ben Said) | Point estimate | Variable | No | Via population fitness |
| Controlled experiments (Karakaya) | Sensitivity analysis | 100 per condition | No | 100 replications |
| ABC alone | Posterior | 11,000+ | Partially (via $\varepsilon$) | Via $\varepsilon$ |
| **HM + ABC** | **Posterior** | **~3,185** | **Yes (explicit)** | **Via ensemble variance $V^r_s$** |

## General Calibration Workflow (UQ-Aware)

1. **Define target observables**: What macro-level patterns should the model reproduce?
2. **Specify parameter ranges**: Use domain knowledge or physical constraints to bound plausible values
3. **Quantify all uncertainties**: Measure $V^r_m$ (model discrepancy), $V^r_s$ (ensemble variance), $V_o$ (observation uncertainty)
4. **Choose calibration strategy**: Point estimate (GA/SA/EA) if UQ is not required; HM+ABC if a posterior is needed
5. **Run calibration**: Search/prune the parameter space; for HM+ABC, run waves then ABC
6. **Validate**: Check calibrated model reproduces held-out patterns; assess via [[ABM Validation Challenges]]

## Connections

- GA approach: [[Genetic Algorithm Calibration for ABM]], [[GA Fitness Evaluation and the RAM]]
- Experimental approach: [[Population Initialization and Parameter Sensitivity]]
- HM+ABC pipeline: [[HM-ABC Calibration Framework]]
- Uncertainty types: [[Uncertainty Quantification for ABM Calibration]]
- Validation: [[ABM Validation Challenges]]
- Agent heterogeneity ([[Heterogeneity in Agent Models]]) is what makes calibration high-dimensional

## See Also
- [[Genetic Algorithm Calibration for ABM]] — GA-based point estimation
- [[GA Fitness Evaluation and the RAM]] — macro/micro fitness measurement
- [[HM-ABC Calibration Framework]] — UQ-based posterior calibration
- [[History Matching for ABMs]] — the implausibility wave procedure
- [[Approximate Bayesian Computation for ABMs]] — rejection sampling posterior
- [[Uncertainty Quantification for ABM Calibration]] — the four uncertainty sources
- [[ABM Calibration Case Studies]] — SugarScape, birds, RISC applications
- [[Population Initialization and Parameter Sensitivity]] — experimental calibration
- [[ABM Validation Challenges]] — validating any calibrated model
