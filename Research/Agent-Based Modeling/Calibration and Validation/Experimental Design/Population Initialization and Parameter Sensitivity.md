---
title: Population Initialization and Parameter Sensitivity
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/calibration
  - type/concept
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "pp. 6, 10"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Calibration and Validation/Experimental Design"
doc_type: paper
depends_on:
  - "[[ABM Calibration Overview]]"
  - "[[Consumer Utility Function Components]]"
  - "[[Heterogeneity in Agent Models]]"
used_by:
  - "[[ABM in Marketing Strategy]]"
aliases:
  - Parameter initialization
  - Sensitivity analysis in ABM
  - Experimental design for ABM
---

# Population Initialization and Parameter Sensitivity

> [!summary]
> Karakaya et al. (2011) use a structured experimental design where consumer agent parameters are initialized from specified distributions (uniform, mixed) and five decision variables are varied one at a time across experiments, each replicated 100 times. This approach enables systematic assessment of how individual marketing decisions (price, promotion, quality, opinion leader targeting) affect profitability, while replication controls for stochastic variation.

## Overview

In any ABM, the initial configuration of the agent population and the experimental design for parameter exploration are critical methodological choices. Karakaya et al. provide a template for how to initialize heterogeneous agent populations and systematically explore the parameter space without the computational cost of a full GA-based calibration.

## Main Content

### Fixed Model Parameters (Table 1)

| Parameter | Notation and Value |
|-----------|-------------------|
| Number of time steps | $T = 20$ |
| Number of consumers | $N = 1000$ |
| Number of opinion leaders | $M = 200$ |
| Product characteristics value | $A_1 \in (0.1, 1)$, $A_2 \sim U(0.6, 1)$ |
| Cost of the product | $Cost = A_1 \times 0.1 + A_2 \times 0.2$ |
| Buying threshold | $\alpha = 0.7$ |
| Exponential smoothing constant | $\beta = 0.5$ |
| Smoothing constant for logit | $k = 5$ |

### Consumer Parameter Distributions

Agent heterogeneity is created through random initialization:

| Parameter | Distribution | Rationale |
|-----------|-------------|-----------|
| Product preference $P_{i1}$ | Mixed: 60% mid-range (0.4-0.8), 20% low (0.1-0.4), 20% high (0.8-1.0) | Reflects realistic preference distribution for "best match" attributes |
| Product preference $P_{i2}$ | $U(0.6, 1)$ | "More is better" attribute — all consumers want at least moderate levels |
| Price sensitivity $PrSen_i$ | $U(0.5, 1)$ | All consumers are at least moderately price-sensitive |
| Quality sensitivity $K_i$ | Randomly assigned | Individual quality importance |
| Promotion sensitivity $Pr_i$ | Randomly assigned | Individual responsiveness to advertising |
| Social sensitivity $S_i$ | Randomly assigned | Individual susceptibility to WOM |

### Experimental Design

Five decision variables are manipulated:
1. **Price** of the product
2. **Promotion** intensity
3. **Product attribute 1** ($A_1$) — quality dimension 1
4. **Product attribute 2** ($A_2$) — quality dimension 2
5. **Number of opinion leaders** targeted

#### One-at-a-Time (OAT) Design

Each experiment varies **one** decision variable while holding all others constant at benchmark values. This allows isolation of individual effects but cannot capture interaction effects.

#### Replication Strategy

Each experiment configuration is replicated **100 times** to account for stochastic variation in:
- Random parameter assignment to agents
- Random network formation
- Stochastic purchase decisions (logit randomness)

#### WOM Toggle

Each experiment is performed **twice**: once with WOM in effect and once without WOM. This isolates the contribution of WOM to each marketing strategy's effectiveness.

### Benchmark Configuration

The benchmark (Experiment 1) uses a low-quality product with:
- Small size (low $A_1$), low resolution (low $A_2$)
- High price
- Low promotion intensity
- 5 opinion leaders targeted

This worst-case scenario establishes a baseline for measuring the effect of improvements.

### Key Sensitivity Findings

From the experimental results:
- **Quality improvements**: Most significant effect on profitability, especially with WOM active (WOM amplifies quality signals)
- **Price reductions**: Increase sales volume but can reduce profitability; negative WOM from price-driven but quality-indifferent consumers can offset gains
- **Promotion increases**: Diminishing returns when WOM is active (organic WOM substitutes for paid promotion)
- **Opinion leader targeting**: Accelerates diffusion but has complex interactions with quality

## Connections

- Parameter distributions create the [[Heterogeneity in Agent Models|agent heterogeneity]] in the Karakaya model
- Parameters feed into the [[Consumer Utility Function Components|utility function]]
- This experimental approach contrasts with the [[Genetic Algorithm Calibration for ABM|GA calibration]] used in CUBES
- Results inform [[ABM in Marketing Strategy|marketing strategy]] recommendations

## See Also
- [[ABM Calibration Overview]] — broader calibration context
- [[Consumer Utility Function Components]] — what these parameters parameterize
- [[Karakaya et al 2011 - Overview]] — paper context
