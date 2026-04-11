---
title: Flow Simulation Applications
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/simulation
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7282-7283"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Applications/Flows and Crowds"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Emergent Phenomena in ABM]]"
used_by: []
aliases:
  - Crowd simulation
  - Evacuation modeling
  - Traffic simulation with ABM
---

# Flow Simulation Applications

> [!summary]
> Bonabeau (2002) identifies flow simulations — evacuation, crowd dynamics, and traffic — as a major ABM application area where emergent phenomena (stampedes, traffic jams, panic) arise from individual agent movement rules. These applications demonstrate ABM's strength in modeling spatial systems where local interactions produce dangerous or counterintuitive macro-level patterns.

## Overview

Flow simulations are among the earliest and most compelling ABM applications. In these systems, each agent follows simple movement rules (avoid obstacles, move toward exits, maintain personal space) and the emergent collective patterns can be life-threatening (stampedes) or economically costly (traffic jams). The key insight is that these emergent patterns cannot be predicted from individual behavior alone.

## Main Content

### Evacuation and Crowd Dynamics

**Stampede phenomena**: Crowd stampedes induced by panic can lead to fatalities. They may be triggered by life-threatening situations (fires in crowded buildings) or arise from the rush for seats, "sometimes seemingly without cause" (Bonabeau 2002).

Notable examples cited:
- Panics in Harare, Zimbabwe
- The Roskilde rock concert in Denmark
- Pop concerts, sporting events, and demonstrations

**Why ABM is needed**: The frequency of such disasters seems to be increasing as growing population densities combine with easier transportation. ABM enables simulation of crowd behavior under different architectural layouts and evacuation strategies.

### Traffic Simulation

Traffic jams are a canonical example of emergence — a jam can move in the direction **opposite** to the cars causing it. This macro-level property is completely decoupled from the micro-level behavior of individual drivers.

ABM captures:
- **Individual driver heterogeneity**: Different speeds, reaction times, aggressiveness
- **Local interactions**: Following distance, lane changing, merging
- **Spatial structure**: Road networks, intersections, bottlenecks
- **Emergent patterns**: Phantom jams, wave propagation, gridlock

### TRANSIMS: A Large-Scale Example

Bonabeau describes **TRANSIMS** (TRansportation ANalysis and SIMulation System), developed at Los Alamos National Laboratory:
- Creates a virtual metropolitan region with roads, individual agents, and transportation infrastructure
- Simulates individual vehicle movements including cars, buses, and second-by-second traces
- Estimates vehicle emissions and traffic patterns
- Based on census data and survey data for specific census tracts
- Provides "a more accurate sense of the movements and daily routines of real people as they negotiate a full day with various transportation options"

## Connections

- Flow simulations exemplify [[Emergent Phenomena in ABM]] — macro patterns from micro rules
- They represent one of four ABM application areas identified by Bonabeau alongside [[Market and Financial Simulation]], [[Organizational Simulation]], and [[Operational Risk Modeling with ABM]]
- The spatial interaction structure relates to [[Network Topology Effects on Diffusion]] — topology matters for information/movement flow

## See Also
- [[ABM Methodology and Principles]] — the paradigm underlying flow simulation
- [[Emergent Phenomena in ABM]] — stampedes and jams as emergent phenomena
