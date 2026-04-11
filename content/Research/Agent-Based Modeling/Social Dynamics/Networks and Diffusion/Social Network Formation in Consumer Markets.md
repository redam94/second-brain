---
title: Social Network Formation in Consumer Markets
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/social-networks
  - type/concept
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "pp. 2, 6"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Social Dynamics/Networks and Diffusion"
doc_type: paper
depends_on:
  - "[[Heterogeneity in Agent Models]]"
  - "[[ABM Methodology and Principles]]"
used_by:
  - "[[Word of Mouth Mechanisms]]"
  - "[[Opinion Leaders and Social Influence]]"
  - "[[Network Topology Effects on Diffusion]]"
aliases:
  - Social networks in ABM
  - Consumer networks
  - Preference-based network formation
---

# Social Network Formation in Consumer Markets

> [!summary]
> Karakaya et al. (2011) form social networks based on preference similarity: consumers with similar product preferences are more likely to be connected, reflecting homophily. The network determines who can influence whom through WOM. Bonabeau (2002) explores how different network topologies (random vs. clustered) produce qualitatively different diffusion dynamics. Ben Said et al. (2002) use spatial perception fields rather than explicit network structures.

## Overview

Social networks are the substrate through which WOM propagates in agent-based market models. The structure of the network — who is connected to whom — fundamentally shapes information diffusion, opinion formation, and market outcomes. Different assumptions about network formation lead to different emergent dynamics.

## Main Content

### Preference-Based Network Formation (Karakaya)

> [!definition] Definition: Preference-Distance Network (Karakaya et al. 2011)
> The differences between individual consumers' preferences are used as the indicator of distance between individuals, assuming that individuals having similar product preferences are more likely to have similar life standards and are more likely to encounter each other (Carley 2003). Individuals that have a distance lower than a predetermined threshold are assumed to be connected.
^def-preference-network

The formation process:
1. Each consumer $i$ has preference values $P_{ij}$ for product attributes $j \in \{1, 2\}$
2. The absolute value of the differences between individuals' preference values determines distance
3. If the distance is below a threshold, consumers are connected
4. Connected consumers can influence each other through WOM and can be influenced by a person who has similar product preferences

**Homophily principle**: This design encodes the sociological finding that people with similar preferences tend to form social connections (Carley 2003).

### Spatial Perception Fields (Ben Said)

CUBES uses a different approach — rather than explicit networks, each agent has a **perception field**:

- A spatial radius within which the agent can communicate
- Information propagates following a gradient (intensity decreases with distance)
- The field width depends on the agent's innovativeness BA and socio-demographic profile
- This creates an implicit, spatially-structured network

### Network Topology Exploration (Bonabeau)

Bonabeau (2002) systematically varies network topology to study its effects:

1. **Random neighbors**: Each agent connected to $n = 30$ randomly selected others -> Smooth S-curve adoption (similar to differential equations)
2. **Clustered neighbors**: Two clusters with dense within-cluster and sparse between-cluster connections -> Two-wave adoption pattern

See [[Network Topology Effects on Diffusion]] for detailed analysis.

### Network Properties and Their Effects

| Network Property | Effect on Market Dynamics |
|-----------------|-------------------------|
| **High clustering** | Information cascades within clusters; delayed cross-cluster diffusion |
| **High connectivity** | Faster diffusion; approaches mean-field dynamics |
| **Homophily** | Segments emerge naturally; WOM circulates within similar groups |
| **Scale-free** (not modeled) | Opinion leaders emerge from hub nodes |
| **Perception fields** | Spatially local influence; gradient effects |

## Connections

- Network structure determines how [[Word of Mouth Mechanisms|WOM]] propagates
- [[Opinion Leaders and Social Influence|Opinion leaders]] are defined by their network position (especially in CUBES)
- Network topology effects are analyzed in [[Network Topology Effects on Diffusion]]
- Preference heterogeneity from [[Heterogeneity in Agent Models]] drives network formation in Karakaya

## See Also
- [[Network Topology Effects on Diffusion]] — how topology shapes dynamics
- [[Word of Mouth Mechanisms]] — what propagates through the network
- [[Opinion Leaders and Social Influence]] — high-influence network positions
