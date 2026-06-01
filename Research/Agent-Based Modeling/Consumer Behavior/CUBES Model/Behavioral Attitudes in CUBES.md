---
title: Behavioral Attitudes in CUBES
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
  - "[[CUBES Simulator Architecture]]"
  - "[[Heterogeneity in Agent Models]]"
used_by:
  - "[[Behavioral Primitives and Thresholds]]"
  - "[[Imitation and Conditioning Processes]]"
  - "[[Genetic Algorithm Calibration for ABM]]"
aliases:
  - Behavioral attitudes
  - BA in CUBES
  - Mistrust opportunism conditioning innovativeness imitation
---

# Behavioral Attitudes in CUBES

> [!summary]
> CUBES models consumer behavior through five behavioral attitudes (BA) — mistrust, opportunism, conditioning, innovativeness, and imitation — that collectively determine how agents perceive, filter, and respond to market stimuli. These attitudes are not brand-specific but represent general psychological dispositions that evolve through social processes. Each attitude has an intensity level that varies across agents and changes over time through imitation and conditioning.

## Overview

The behavioral attitude framework is founded on concepts from marketing research, psycho-sociology, and consumption studies. Unlike models that focus on rational utility maximization, CUBES treats consumer behavior as driven by a set of psychological primitives that filter and weight external stimuli. This approach captures the observation that consumers are influenced by sociological and psychological factors beyond simple preference matching.

## Main Content

> [!definition] Definition: Behavioral Attitudes (Ben Said et al. 2002)
> Behavioral attitudes (BA) are issued from **social processes** and **personality traits**. They are not situated as far as they are not related to a given brand. The assumption is that the set of individual psychological criteria forms a single attitude whose characteristics evolve globally and independently of the number of competing brands.
^def-behavioral-attitudes

### The Five Behavioral Attitudes

#### 1. Mistrust

> [!definition] Definition: Mistrust BA
> A reactive modulator that introduces skepticism toward incoming stimuli. High-mistrust agents require stronger stimuli to change their opinions. Functions as a **filter** that raises the effective threshold for behavioral primitive activation.
^def-mistrust

#### 2. Opportunism

> [!definition] Definition: Opportunism BA
> A reactive modulator that amplifies responsiveness to perceived deals and opportunities. High-opportunism agents are more sensitive to promotional stimuli and price advantages. Functions as an **amplifier** for deal-related signals.
^def-opportunism

#### 3. Conditioning

> [!definition] Definition: Conditioning BA
> A social dynamics process based on classical reinforcement. Repeated exposure to consistent stimuli strengthens the conditioning attitude, making the consumer more likely to respond similarly in the future. Relates to brand loyalty formation and habitual purchasing.
^def-conditioning

#### 4. Innovativeness

> [!definition] Definition: Innovativeness BA
> A personality trait that modulates openness to new products and willingness to adopt innovations. High-innovativeness agents are more likely to try new brands and respond to innovation stimuli. This attitude is intrinsically related to purchase acts in CUBES.
^def-innovativeness

#### 5. Imitation

> [!definition] Definition: Imitation BA
> A social dynamics process where agents adopt behaviors observed in their social surroundings. High-imitation agents are strongly influenced by the choices of friends, family, and opinion leaders. This is the primary mechanism for WOM diffusion in CUBES.
^def-imitation

### Architecture: Social Dynamics vs Reactive Modulators

The five attitudes are organized into two functional categories:

| Category | Attitudes | Mechanism |
|----------|-----------|-----------|
| **Social Dynamics** | Conditioning, Imitation | Evolve through social processes; depend on interactions with other agents |
| **Reactive Modulators** | Mistrust, Opportunism, Innovativeness | Personality traits that filter/weight stimuli; more stable over time |

Social dynamics attitudes produce **instantiated behavioral attitudes** that are then modified by reactive modulators to produce **derived behavioral attitudes**.

### Attitude Intensity and Evolution

- Each BA has a numerical **intensity** value for each agent
- Intensities are initially set based on the agent's socio-demographic profile and the simulation's initial parameters
- Over time, intensities evolve through:
  - **Imitation process**: Convergence toward neighbors' attitudes
  - **Conditioning process**: Reinforcement from repeated stimuli
  - **External shocks**: Marketing actions that shift attitudes

### Experimental Observations

From the simulation results (Ben Said et al. 2002):

- **Young population (15-25)**: BA intensities show unstable oscillation over 60 simulation steps due to high interaction rates and susceptibility to change
- **Old population (45-65)**: BA intensities converge and stabilize after approximately 15 simulation steps, reflecting stronger established preferences

## Connections

- Attitudes are activated through [[Behavioral Primitives and Thresholds]] — the mechanism that translates BA intensities into behavioral responses
- The evolution of attitudes is driven by [[Imitation and Conditioning Processes]]
- Individual variation in BA intensities implements [[Heterogeneity in Agent Models]]
- BA characteristics are encoded in GA chromosomes for calibration — see [[Genetic Algorithm Calibration for ABM]]

## See Also
- [[CUBES Simulator Architecture]] — how BAs fit into the overall system
- [[Behavioral Primitives and Thresholds]] — how BAs translate to behavior
- [[Imitation and Conditioning Processes]] — how BAs evolve over time
- [[Ben Said et al 2002 - Overview]] — paper context
- [[Word of Mouth Mechanisms]] — imitation BA is the primary channel through which WOM spreads in CUBES
- [[Opinion Leaders and Social Influence]] — opinion leaders drive the imitation and conditioning processes
- [[Product Adoption and Diffusion Models]] — innovativeness BA governs the timing of early adoption
- [[Network Topology Effects on Diffusion]] — social network structure determines how imitation propagates across agents
