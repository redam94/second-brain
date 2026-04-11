---
title: Word of Mouth Mechanisms
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/marketing
  - type/concept
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "pp. 2-3, 8"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Social Dynamics/Word of Mouth"
doc_type: paper
depends_on:
  - "[[Consumer Utility Function Components]]"
  - "[[Social Network Formation in Consumer Markets]]"
  - "[[Imitation and Conditioning Processes]]"
used_by:
  - "[[Opinion Leaders and Social Influence]]"
  - "[[ABM in Marketing Strategy]]"
  - "[[Market Share Equilibrium and Lock-In]]"
aliases:
  - WOM
  - Word-of-mouth
  - C2C communication
---

# Word of Mouth Mechanisms

> [!summary]
> Word of mouth (WOM) is the influence an individual receives from others that affects purchasing decisions. All three papers model WOM as a critical market force: Karakaya models it as a utility component with positive/negative valence; Ben Said models it through the imitation process with spatial perception fields; Bonabeau shows it drives network-dependent adoption dynamics. McKinsey estimates two thirds of the US economy is driven by WOM effects (Dye 2000).

## Overview

WOM represents consumer-to-consumer (C2C) information transfer about products and brands. Unlike advertising (firm-to-consumer), WOM is organic, bidirectional, and carries higher credibility because it comes from peers. The challenge for companies is that they cannot fully control WOM — it can be positive or negative, and negative WOM from dissatisfied consumers can undermine marketing efforts.

## Main Content

### WOM in the Karakaya Model

In Karakaya et al. (2011), WOM enters the consumer utility function as the third component:

$$U_{i3} = WOM_i \cdot S_i \cdot C_{WOM}$$

where $WOM_i$ is the total WOM received by consumer $i$, $S_i$ is their social sensitivity, and $C_{WOM}$ is a global constant.

#### WOM Generation Rules

1. **Only purchasers generate WOM**: A consumer must have purchased the product to create a WOM effect
2. **WOM valence depends on satisfaction**: The direction and level of WOM disseminated to others depends on the first utility component ($U_{i1}$, quality satisfaction)
3. **Negative WOM is possible**: Even after purchasing, a dissatisfied consumer can disseminate negative WOM, hampering other consumers' buying stimuli
4. **Opinion leader amplification**: If the WOM source is an opinion leader, the influence is **3x** that of a normal consumer

#### WOM Propagation

WOM spreads through the social network formed by preference similarity (see [[Social Network Formation in Consumer Markets]]). Consumers connected to each other through similar preferences can influence each other's purchase decisions.

### WOM in the CUBES Model

In Ben Said et al. (2002), WOM operates through the **imitation process** rather than a direct utility component:

- Agents propagate information through a "mouth-to-ear" mechanism
- Each agent has a **perception field** limiting communication radius
- Communication width depends on innovativeness BA and socio-demographic profile
- Information intensity follows a spatial gradient — decreasing with distance

See [[Imitation and Conditioning Processes]] for the full mechanism.

### WOM in the Bonabeau Model

In Bonabeau (2002), WOM is implicit in the adoption model:

- Each agent observes the fraction of adopters in their local neighborhood ($\hat{\rho}_k = n_k/n$)
- This local information drives adoption decisions through the value function $V(\hat{\rho}_k)$
- The key insight is that local vs. global information creates fundamentally different dynamics (see [[ABM vs Equation-Based Modeling]])

### Positive vs. Negative WOM

> [!important] Negative WOM
> Karakaya et al. (2011) explicitly model negative WOM: "even though the consumer purchased the product, he can disseminate negative WOM and hamper other consumers' buying stimuli." This is critical because:
> - A price reduction that attracts price-sensitive but quality-indifferent consumers can generate negative WOM that offsets the sales gains
> - Companies cannot simply maximize WOM volume — they must ensure WOM quality by maintaining product quality
> - Negative WOM from unsatisfied consumers can be created "by unsuccessful WOM strategy as it happened to McDonalds" (Wasserman 2006)

### Key Empirical Claims

- Over 85% of top 1000 firms use WOM tactics (JWT Worldwide, via Wasserman 2006)
- Two thirds of the US economy is driven by WOM effects (McKinsey, via Dye 2000)
- High levels of positive WOM "scientifically proven" to derive business growth (Kirby & Marsden 2006)

## Connections

- WOM utility component is defined in [[Consumer Utility Function Components]]
- WOM spreads through [[Social Network Formation in Consumer Markets|social networks]]
- [[Opinion Leaders and Social Influence]] amplify WOM effects
- WOM is the mechanism behind [[Market Share Equilibrium and Lock-In|lock-in]] and [[Product Adoption and Diffusion Models|diffusion]] dynamics
- In CUBES, WOM operates through [[Imitation and Conditioning Processes]]

## See Also
- [[Opinion Leaders and Social Influence]] — agents who amplify WOM
- [[Consumer Utility Function Components]] — how WOM enters utility
- [[Social Network Formation in Consumer Markets]] — the network WOM travels through
- [[ABM in Marketing Strategy]] — strategic implications of WOM
