---
title: CUBES Simulator Architecture
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/consumer-behavior
  - type/concept
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "pp. 186-187"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Consumer Behavior/CUBES Model"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Ben Said et al 2002 - Overview]]"
used_by:
  - "[[Behavioral Attitudes in CUBES]]"
  - "[[Genetic Algorithm Calibration for ABM]]"
aliases:
  - CUBES
  - CUstomer BEhavior Simulator
---

# CUBES Simulator Architecture

> [!summary]
> CUBES (CUstomer BEhavior Simulator) is a multi-agent simulation platform built on the Swarm engine that simulates populations of consumer agents interacting concurrently in a virtual market with competing brands. The architecture separates social dynamics (imitation, conditioning processes) from reactive modulators (personality traits: mistrust, opportunism, innovativeness) and uses behavioral primitives as the core decision mechanism.

## Overview

CUBES was developed as part of the CUBES project at FTR&D / LIP6 to simulate consumer behaviors in competing markets including several brands and virtual populations of several thousand consumers. The software includes a simulation engine, parameterization tools, and observation tools.

## Main Content

### System Components

The CUBES architecture (Figure 1 in the paper) consists of:

1. **Brand agents**: Each brand has:
   - A marketing strategy (publicity actions, brand image)
   - The ability to emit stimuli to the consumer population

2. **Consumer agents**: Each consumer has:
   - A set of behavioral attitudes (BA)
   - A socio-demographic profile
   - Opinions about each brand
   - A decision mechanism based on behavioral primitives

3. **Simulation engine**: Built on the Swarm simulation engine (http://www.swarm.org), providing concurrent agent execution

### Architecture Diagram

The system follows a two-layer architecture:

**Social Dynamics Layer:**
- **Conditioning process**: Repeated exposure to stimuli reinforces attitudes
- **Imitation process**: Agents copy behaviors of connected agents

**Reactive Modulators Layer (Personality Traits):**
- **Mistrust personality trait**: Filters incoming stimuli with skepticism
- **Opportunism personality trait**: Amplifies deal-seeking behavior
- **Innovativeness personality trait**: Modulates openness to new products

These two layers interact to produce:
- **Instantiated Behavioral Attitudes** (from social dynamics)
- **Derived Behavioral Attitudes** (modified by personality traits)

### Simulation Flow

1. Brands emit **external stimuli** (promotions, rumors, innovations, recommendations)
2. Each stimulus is characterized by type, color (brand identifier), and intensity
3. Consumer agents perceive stimuli through their **behavioral primitives (BP)**
4. BPs filter stimuli through **inhibiting and triggering thresholds**
5. Accepted stimuli modify the consumer's **opinions** about brands
6. Purchase decisions are made based on accumulated opinions
7. Market-level outcomes (market shares, diffusion curves) are observed

### Agent Communication

Each consumer agent has a **perception field** — a spatial radius limiting communication with other agents. This field is a function of the agent's socio-demographic profile and behavioral attitudes (particularly innovativeness). The communication gradient models the fact that WOM influence weakens with social distance.

### Population Scale

Simulations typically include:
- Several thousand consumer agents (5000-7000 in experiments)
- 3 competing brands
- 60-120 simulation time steps

## Connections

- CUBES implements [[ABM Methodology and Principles]] with a psychology-inspired architecture
- The behavioral layer is detailed in [[Behavioral Attitudes in CUBES]] and [[Behavioral Primitives and Thresholds]]
- Population calibration uses [[Genetic Algorithm Calibration for ABM]]
- The architecture enables the emergent phenomena observed in [[Market Share Equilibrium and Lock-In]]

## See Also
- [[Ben Said et al 2002 - Overview]] — paper context
- [[Behavioral Attitudes in CUBES]] — the five BA types
- [[Behavioral Primitives and Thresholds]] — the core decision mechanism
