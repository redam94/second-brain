---
title: Market Share Equilibrium and Lock-In
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/marketing
  - type/concept
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "pp. 189"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Social Dynamics/Market Dynamics"
doc_type: paper
depends_on:
  - "[[Imitation and Conditioning Processes]]"
  - "[[Word of Mouth Mechanisms]]"
  - "[[Emergent Phenomena in ABM]]"
used_by:
  - "[[ABM in Marketing Strategy]]"
aliases:
  - Lock-in effect
  - Market share dynamics
  - Brand dominance
---

# Market Share Equilibrium and Lock-In

> [!summary]
> Ben Said et al. (2002) demonstrate two emergent market share phenomena using the CUBES simulator: brand lock-in (a dominant brand maintaining dominance despite competitor efforts) and cyclic market share competition (brands cyclically trading customers in initially equilibrated markets). These phenomena emerge from the interaction of imitation processes, behavioral attitudes, and network structure, and reproduce patterns observed in real markets.

## Overview

Market share dynamics are among the most important emergent phenomena in consumer ABM. The question is whether initial market conditions persist, reverse, or oscillate. Traditional economic models often predict convergence to Nash equilibria; ABM reveals that path-dependent dynamics and positive feedback loops can produce lock-in effects that resist equilibration.

## Main Content

### Experiment 1: Brand Lock-In

> [!example] Example: Lock-In from Initial Dominance (Ben Said et al. 2002, Fig. 8)
> **Setup:** Virtual market with 7000 consumer agents, 3 competing brands. BRAND0 starts with 70% market share; the remaining 30% is equally distributed between BRAND1 and BRAND2.
>
> **Result:** After more than 90 simulation time steps, BRAND0 **conserves its dominance** on the market despite repeated attempts of BRAND1 and BRAND2 to pick up BRAND0 customers. The two dominated brands remain with marginal market shares during all the simulation.
>
> **Mechanism:** The initial dominance creates a positive feedback loop through the imitation process: more BRAND0 customers -> more positive WOM for BRAND0 -> more imitation toward BRAND0 -> reinforced dominance. This is a classic **lock-in** effect driven by network externalities in WOM.
^example-lock-in

### Experiment 2: Cyclic Competition

> [!example] Example: Cyclic Market Shares (Ben Said et al. 2002, Fig. 9)
> **Setup:** Same virtual market with 7000 agents, but now all 3 brands start with **equal market shares** (~33% each).
>
> **Result:** Over 120 time steps, competition among the brands is **cyclic** — brands trade customers in oscillating waves where few brands share the customers at any given time. Market shares fluctuate rather than converging to a stable equilibrium.
>
> **Interpretation:** "What we are emphasizing here is that it is possible to reproduce realistic market evolutions using the CUBES behavioral model using elementary and basic behavioral attitudes" (Ben Said et al. 2002).
^example-cyclic

### Mechanisms Behind Lock-In

The lock-in effect arises from three interacting mechanisms:

1. **Imitation cascade**: More users of a brand generate more positive recommendation stimuli, which attract more users through imitation
2. **Conditioning reinforcement**: Repeated exposure to a dominant brand's stimuli conditions consumers to prefer it
3. **Disqualification by opinion leaders**: Opinion leaders of the dominant brand emit negative disqualification stimuli against competing brands, actively suppressing competitor growth

### Age-Dependent Dynamics

The behavioral attitude convergence results provide additional insight:
- **Young populations (15-25)**: Unstable oscillation in attitudes over 60 steps — high interaction rates and susceptibility to change prevent lock-in from stabilizing
- **Old populations (45-65)**: Attitudes converge and stabilize after ~15 steps — established preferences reinforce lock-in

### Connection to Real Markets

The paper notes that these phenomena reproduce patterns observed in real markets:
- Brand lock-in resembles network effects in technology markets (e.g., operating systems, social networks)
- Cyclic competition resembles market share dynamics in consumer goods (e.g., retail brands cycling through popularity)
- The role of initial conditions in determining long-term outcomes resonates with path-dependence theory

## Connections

- Lock-in is an instance of [[Emergent Phenomena in ABM]]
- It is driven by the [[Imitation and Conditioning Processes|imitation and conditioning processes]]
- [[Word of Mouth Mechanisms]] is the channel through which positive feedback operates
- [[Opinion Leaders and Social Influence|Opinion leaders]] accelerate lock-in through their amplified influence
- Strategic implications are discussed in [[ABM in Marketing Strategy]]

## See Also
- [[Emergent Phenomena in ABM]] — lock-in as a case of emergence
- [[Imitation and Conditioning Processes]] — the processes driving lock-in
- [[Ben Said et al 2002 - Overview]] — paper context
