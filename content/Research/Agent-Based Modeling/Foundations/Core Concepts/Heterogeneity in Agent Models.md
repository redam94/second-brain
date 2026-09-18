---
title: Heterogeneity in Agent Models
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7281, 7287"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Foundations/Core Concepts"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
used_by:
  - "[[Consumer Utility Function Components]]"
  - "[[Behavioral Attitudes in CUBES]]"
  - "[[Population Initialization and Parameter Sensitivity]]"
  - "[[Silicon Samples and Algorithmic Fidelity]]"
  - "[[LLM-Powered Agents - Overview]]"
  - "[[LLM Agents vs Rule-Based Agents in ABM]]"
  - "[[Persona Mixture Calibration of LLM Agents]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - Agent heterogeneity
  - Individual differences in ABM
---

# Heterogeneity in Agent Models

> [!summary]
> Heterogeneity — the ability to give each agent unique attributes, preferences, and behavioral parameters — is one of ABM's defining advantages over aggregate models. All three papers rely heavily on agent heterogeneity to produce realistic market dynamics, from randomly distributed sensitivity parameters (Karakaya) to socio-demographic profiles and behavioral attitudes (Ben Said) to differentiated network positions (Bonabeau).

## Overview

Traditional market models generally concentrate on single individuals or representative agents, ignoring that real populations consist of diverse individuals with different preferences, sensitivities, social positions, and decision strategies. ABM enables modelers to represent this diversity directly, giving each agent its own parameter set. This heterogeneity is often the source of emergent phenomena — homogeneous populations tend to produce trivial dynamics.

## Main Content

> [!definition] Definition: Heterogeneity in ABM (Bonabeau 2002, Khouja et al. 2008)
> ABM gives the opportunity of modeling heterogeneity, meaning it enables one to model any number of agents that have different attributes with differentiated values. Each agent in the model behaves according to her preferences and gets influenced by a motivation function.
^def-heterogeneity

### Forms of Heterogeneity Across the Papers

#### Karakaya et al. (2011): Preference and Sensitivity Heterogeneity

Each consumer agent has individually assigned:
- **Product preference values** $P_{ij}$ for each product attribute $j$, drawn from specified distributions
- **Quality sensitivity** $K_i$ — how much product quality matters to this consumer
- **Promotion sensitivity** $Pr_i$ — responsiveness to advertising
- **Price sensitivity** $PrSen_i$ — drawn from $U(0.5, 1)$ to ensure all consumers care at least somewhat about price
- **Social sensitivity** $S_i$ — susceptibility to word-of-mouth influence

This creates a population where some consumers are quality-driven, others are price-sensitive, and others are socially influenced — mirroring real market segments.

#### Ben Said et al. (2002): Behavioral and Socio-Demographic Heterogeneity

CUBES encodes heterogeneity through:
- **Behavioral attitudes (BA)**: Each agent has individual intensity levels for mistrust, opportunism, conditioning, innovativeness, and imitation
- **Socio-demographic profile**: Age, educational level, professional level, social class
- **Behavioral primitive thresholds**: Individual inhibiting and triggering thresholds determine how each agent responds to stimuli
- **Perception field**: Each agent has a communication radius limiting WOM reach

#### Bonabeau (2002): Structural and Behavioral Heterogeneity

Bonabeau emphasizes heterogeneity at multiple levels:
- **Network position**: Agents occupy different positions in the interaction topology, giving them different exposure to information
- **Local vs. global information**: Each agent knows only the fraction of adopters in their neighborhood $\hat{\rho}_k = n_k/n$, not the global adoption rate
- **Decision thresholds**: Individual agents can have different adoption criteria

### Why Heterogeneity Matters

Bonabeau (2002) argues that ABM should be used when "the population is heterogeneous, when each individual is potentially different." Key implications:

1. **Aggregate models fail with heterogeneity**: When you average over a heterogeneous population, you lose the variance that drives dynamics. A mean-field model sees $\rho$ (global adoption fraction) while each agent sees $\hat{\rho}_k$ (local fraction) — and these differ dramatically across network positions.

2. **Segmentation emerges naturally**: Rather than pre-defining market segments, heterogeneous agents self-sort into behavioral clusters through their interactions.

3. **Tail effects matter**: A small number of highly connected or highly influential agents ([[Opinion Leaders and Social Influence|opinion leaders]]) can disproportionately drive market outcomes — an effect invisible in aggregate models.

## Examples

> [!example] Example: Price Sensitivity Heterogeneity (Karakaya et al. 2011)
> **Setup:** Consumers are assigned price sensitivity $PrSen_i \sim U(0.5, 1)$ rather than $U(0, 1)$.
>
> **Rationale:** "In any case we assume price is an important attribute in the purchase decision so we randomly assign price sensitivity values to consumers between 0.5 and 1 instead of distributing it evenly between 0 and 1."
>
> **Implication:** This design choice ensures that no consumer is completely indifferent to price, reflecting the empirical reality that budget constraints always matter at some level. The remaining variation ($0.5$ to $1$) still allows meaningful heterogeneity in how much price matters relative to quality and social influence.

## Connections

- Heterogeneity drives the need for careful [[Population Initialization and Parameter Sensitivity|parameter initialization strategies]]
- It interacts with [[Social Network Formation in Consumer Markets|network structure]] — heterogeneous agents in heterogeneous networks produce richer dynamics than either alone
- [[Behavioral Attitudes in CUBES]] provides a concrete implementation of multi-dimensional behavioral heterogeneity
- [[Emergent Phenomena in ABM]] — heterogeneity is a primary driver of emergence; homogeneous populations tend to produce trivial or mean-field dynamics, while heterogeneous populations self-organize into complex macro-patterns
- [[ABM Calibration Overview]] — estimating heterogeneous parameter distributions from data is the core calibration challenge created by agent-level heterogeneity

## See Also
- [[ABM Methodology and Principles]] — heterogeneity as a core ABM property
- [[Emergent Phenomena in ABM]] — heterogeneous populations produce emergent macro-patterns that homogeneous populations cannot
- [[Consumer Utility Function Components]] — how heterogeneity enters the Karakaya utility model
- [[Population Initialization and Parameter Sensitivity]] — practical strategies for assigning heterogeneous parameters
- [[ABM Calibration Overview]] — estimating the distribution of heterogeneous agent parameters from observed data
- [[Opinion Leaders and Social Influence]] — the extreme end of behavioral heterogeneity: highly influential agents with outsized market impact
- [[Network Topology Effects on Diffusion]] — network position heterogeneity amplifies behavioral heterogeneity in diffusion dynamics
- [[ABM vs Equation-Based Modeling]] — heterogeneity is the primary reason to choose ABM over aggregate equation-based models
- [[Silicon Samples and Algorithmic Fidelity]] — persona-conditioned heterogeneity
- [[Shifted-Beta-Geometric Model for Contractual Retention]] — the "ruse of heterogeneity" in aggregate retention curves
