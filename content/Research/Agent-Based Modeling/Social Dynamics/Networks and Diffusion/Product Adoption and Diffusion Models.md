---
title: Product Adoption and Diffusion Models
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/diffusion
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7285-7287"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Social Dynamics/Networks and Diffusion"
doc_type: paper
depends_on:
  - "[[ABM vs Equation-Based Modeling]]"
  - "[[Emergent Phenomena in ABM]]"
used_by:
  - "[[Network Topology Effects on Diffusion]]"
  - "[[ABM in Marketing Strategy]]"
aliases:
  - Product adoption
  - Diffusion of innovations
  - S-curve adoption
---

# Product Adoption and Diffusion Models

> [!summary]
> Bonabeau (2002) presents a formal product adoption model where a product's value depends on the fraction of adopters, creating positive network externalities. The model demonstrates that aggregate system dynamics and ABM produce equivalent results for well-mixed populations but diverge when network structure introduces local information asymmetries. The adoption process follows an S-curve driven by a threshold effect at ~40% adoption.

## Overview

Product adoption and diffusion is a classic application of ABM. The fundamental question is: how does a new product spread through a population? Traditional models (Bass diffusion model, system dynamics) treat the population as well-mixed. ABM reveals that network structure can qualitatively change diffusion patterns.

## Main Content

### The Value Function

> [!definition] Definition: Product Value Function (Bonabeau 2002)
> $$
> V(N) = V(\rho) = \frac{(1 + \theta^d)\rho^d}{\rho^d + \theta^d}
> $$
> where:
> - $\rho = N/N_T$ is the fraction of adopters in a population of $N_T$ potential adopters
> - $\theta = 0.4$ is a characteristic value (adoption threshold)
> - $d = 4$ controls the steepness of the adoption curve
>
> **Properties:**
> - $V(0) = 0$: no value when no one has adopted
> - $V(N_T) = 1$: maximum value when everyone has adopted
> - $\theta$ acts as a threshold: the value curve takes off when user base approaches 40% of the population
^def-value-function

### Adoption Dynamics

The adoption rate follows the master equation:

$$
\partial_t \rho = V(\rho)(1 - \rho)
$$

This produces the characteristic **S-curve**:
1. **Slow start**: Few adopters -> low value -> low adoption rate
2. **Tipping point**: When $\rho$ approaches $\theta$ (~40%), the value curve takes off
3. **Rapid growth**: High value + many non-adopters -> fast adoption
4. **Saturation**: Few remaining non-adopters -> slow completion

### Agent-Level Transition Rule

Each individual agent has a transition probability:

$$
P(\text{adopt}_k) = V(\hat{\rho}_k) \text{ per time unit}
$$

where $\hat{\rho}_k = n_k/n$ is person $k$'s local estimate of the adoption fraction based on their $n$ neighbors.

### Network Effects on Diffusion

The critical insight is that $\hat{\rho}_k \neq \rho$ when the network is not well-mixed:

- **Random network** (30 random neighbors per agent): $\hat{\rho}_k \approx \rho$ -> Smooth S-curve, consistent with differential equation
- **Clustered network** (two clusters): $\hat{\rho}_k$ varies dramatically between clusters -> Two-wave adoption pattern

See [[Network Topology Effects on Diffusion]] for detailed analysis.

### Connection to Rogers' Diffusion Theory

The ABM approach connects to Rogers' (1983) diffusion of innovations theory:
- **Innovators** adopt early with low $\hat{\rho}_k$ (high innovativeness threshold)
- **Early adopters** follow once some neighbors have adopted
- **Early majority** wait for substantial neighborhood adoption
- **Late majority** and **laggards** adopt only under strong social pressure

In CUBES, these adopter categories are formalized through the five-group classification of consumers based on adoption speed (Ben Said et al. 2002, footnote).

## Examples

> [!example] Example: Adoption Dynamics with $\theta = 0.4$, $d = 4$ (Bonabeau 2002, Fig. 3-4)
> **Setup:** 100 agents, 5% initial adopters, time unit = 10 days.
>
> **Random network (30 neighbors):** Adoption follows a smooth S-curve reaching saturation around day 100. Nearly identical to the differential equation solution.
>
> **Clustered network (2 clusters):** Adoption proceeds in two distinct waves — the cluster containing the initial adopters saturates first (by ~day 50), then adoption jumps to the second cluster and proceeds to saturation (~day 120). The transition between waves produces a visible plateau in the adoption curve.

## Connections

- This model formally demonstrates the comparison in [[ABM vs Equation-Based Modeling]]
- Network topology effects are detailed in [[Network Topology Effects on Diffusion]]
- The adoption model connects to the broader [[Emergent Phenomena in ABM|emergence]] concept
- In marketing contexts, diffusion interacts with [[Word of Mouth Mechanisms]] and [[Opinion Leaders and Social Influence|opinion leader]] targeting

## See Also
- [[ABM vs Equation-Based Modeling]] — formal comparison using this model
- [[Network Topology Effects on Diffusion]] — how topology shapes adoption
- [[Word of Mouth Mechanisms]] — the mechanism driving adoption
