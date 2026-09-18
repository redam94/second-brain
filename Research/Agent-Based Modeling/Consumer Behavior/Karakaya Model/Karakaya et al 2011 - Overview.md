---
title: "Karakaya et al 2011 - Overview"
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/marketing
  - type/overview
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "Full paper, pp. 1-7"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Consumer Behavior/Karakaya Model"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
used_by:
  - "[[ABM in Marketing Strategy]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - Karakaya 2011
  - Marketing strategies WOM ABM
---

# Karakaya et al 2011 - Overview

> [!summary]
> This paper builds an agent-based simulation of a monopolistic market for a technological product to assess the efficiency and profitability of different marketing strategies (price, promotion, quality, opinion leader targeting) in the presence of word-of-mouth effects. The key finding is that product quality is the most significant factor affecting profitability when WOM is active, because WOM amplifies quality signals.

## Overview

**Citation:** Karakaya, C., Badur, B., & Aytekin, C. (2011). Analyzing the Effectiveness of Marketing Strategies in the Presence of Word of Mouth: Agent-Based Modeling Approach. *Journal of Marketing Research and Case Studies*, Vol. 2011, Article ID 421059.

**Research question:** How do different marketing strategies (varying price, promotion, quality, and opinion leader targeting) affect firm profitability when consumers are subject to word-of-mouth effects?

**Approach:** ABM simulation of N=1000 consumers connected through a social network based on preference similarity, with M=200 opinion leaders, over T=20 time steps, replicated 100 times per experiment.

## Main Content

### Model Components

The model has four key components:

1. **Consumer agents** with heterogeneous preferences and sensitivities (see [[Consumer Utility Function Components]])
2. **Social network** formed by preference similarity (see [[Social Network Formation in Consumer Markets]])
3. **Opinion leaders** with amplified WOM influence (see [[Opinion Leaders and Social Influence]])
4. **Purchase decisions** via utility threshold + logit function (see [[Logit Purchase Decision Model]])

### Consumer Utility Function

The total utility for consumer $i$ is:

$$U_i = U_{i1} + U_{i2} + U_{i3} + U_{i4}$$

where the four components cover quality, promotion, WOM, and price respectively. See [[Consumer Utility Function Components]] for full formal specification.

### Experimental Design

Five decision variables are manipulated:
- **Price** of the product
- **Promotion** intensity
- **Two product design parameters** (quality attributes $A_1$, $A_2$)
- **Number of opinion leaders** targeted

Each experiment varies one parameter while holding others constant, and is run with and without WOM to isolate the WOM effect. See [[Population Initialization and Parameter Sensitivity]] for parameter tables.

### Key Findings

1. **Quality dominates under WOM**: When WOM is active, product quality is the most significant factor affecting profitability — positive WOM from satisfied customers amplifies quality signals
2. **Price sensitivity with WOM**: Lowering price increases sales but negative WOM from dissatisfied consumers can offset gains
3. **Promotion has diminishing returns**: Increasing promotion has limited additional effect when WOM is present because organic WOM substitutes for paid promotion
4. **Opinion leader targeting matters**: The number of targeted opinion leaders significantly affects diffusion speed but has complex interactions with other variables

## Connections

- This paper operationalizes the general ABM framework from [[ABM Methodology and Principles]] in a marketing context
- The social network formation mechanism ([[Social Network Formation in Consumer Markets]]) is based on preference similarity, connecting to [[Heterogeneity in Agent Models]]
- The experimental design provides a template for [[Population Initialization and Parameter Sensitivity]]

## See Also
- [[Consumer Utility Function Components]] — the 4-component utility model
- [[Logit Purchase Decision Model]] — the stochastic purchase decision
- [[Word of Mouth Mechanisms]] — how WOM spreads through the network
- [[Social Network Formation in Consumer Markets]] — preference-similarity network construction
- [[Opinion Leaders and Social Influence]] — amplified WOM from targeted opinion leaders
- [[Population Initialization and Parameter Sensitivity]] — experimental calibration design with parameter tables
- [[ABM in Marketing Strategy]] — broader context of ABM in marketing
