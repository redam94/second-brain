---
title: Consumer Utility Function Components
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/marketing
  - type/concept
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "pp. 7-8"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Consumer Behavior/Karakaya Model"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Heterogeneity in Agent Models]]"
  - "[[Karakaya et al 2011 - Overview]]"
used_by:
  - "[[Logit Purchase Decision Model]]"
  - "[[Word of Mouth Mechanisms]]"
  - "[[ABM in Marketing Strategy]]"
aliases:
  - Consumer utility in ABM
  - Karakaya utility function
---

# Consumer Utility Function Components

> [!summary]
> Karakaya et al. (2011) define a four-component additive utility function for consumer agents: quality ($U_{i1}$), promotion ($U_{i2}$), word-of-mouth ($U_{i3}$), and price ($U_{i4}$). Each component incorporates individual heterogeneity through agent-specific sensitivity parameters. This utility drives the purchase decision through a logit threshold model.

## Overview

The utility function is based on Zhang and Zhang (2007) and captures the four key factors influencing consumer purchase decisions: the intrinsic quality match between product and consumer preferences, the effect of promotional activities, the social influence from other consumers' WOM, and the price of the product. The design choice to make utility additive allows each component to be analyzed independently.

## Main Content

### Total Utility

> [!definition] Definition: Consumer Utility Function (Karakaya et al. 2011, Eq. 1)
> The total utility for consumer $i$ is the sum of four components:
> $$
> U_i = U_{i1} + U_{i2} + U_{i3} + U_{i4}
> $$
> where $U_{i1}$ = quality utility, $U_{i2}$ = promotion utility, $U_{i3}$ = WOM utility, $U_{i4}$ = price utility.
^def-total-utility

### Component 1: Quality Utility ($U_{i1}$)

> [!definition] Definition: Quality Utility Component (Karakaya et al. 2011, Eq. 2-3)
> $$
> U_{i1} = \frac{G_{i1} + G_{i2}}{2} \cdot K_i
> $$
> where $K_i$ is the quality sensitivity of consumer $i$, and the goodness-of-fit $G_{ij}$ for product attribute $j$ is:
> $$
> G_{ij} = \begin{cases} 1 + |P_{ij} - A_j| & \text{if } A_j > P_{ij} \\ 1 - |P_{ij} - A_j| & \text{if } A_j < P_{ij} \end{cases}
> $$
> - $A_j$: product characteristic value for attribute $j$
> - $P_{ij}$: preference value of consumer $i$ for attribute $j$, $j \in \{1, 2\}$
^def-quality-utility

**Interpretation:** When the product attribute exceeds the consumer's preference ($A_j > P_{ij}$), the goodness-of-fit *increases* beyond 1 — the consumer gets more than they wanted. When the product falls short ($A_j < P_{ij}$), the fit *decreases* below 1. The two product attributes are averaged and scaled by individual quality sensitivity.

**Product attributes:** The model uses two attributes — Attribute 1 is a "best match" type (e.g., size — consumers have ideal points) with $P_{i1} \sim$ mixed distribution (60% mid-range, 20% low, 20% high). Attribute 2 is a "more is better" type (e.g., screen resolution) with $P_{i2} \sim U(0.6, 1)$.

### Component 2: Promotion Utility ($U_{i2}$)

> [!definition] Definition: Promotion Utility Component (Karakaya et al. 2011, Eq. 4)
> $$
> U_{i2} = Pr_i \cdot C_{pr} \cdot (Pro_t + \beta \cdot Pro_{t-1})
> $$
> - $Pr_i$: promotion sensitivity of consumer $i$
> - $C_{pr}$: constant promotion sensitivity factor (independent of consumer)
> - $Pro_t$: promotion intensity at time $t$
> - $\beta$: exponential smoothing constant ($\beta = 0.5$)
^def-promotion-utility

**Interpretation:** Consumers have memory — the previous time step's promotion continues to influence through exponential smoothing. This captures the carryover effect of advertising.

### Component 3: WOM Utility ($U_{i3}$)

> [!definition] Definition: WOM Utility Component (Karakaya et al. 2011, Eq. 5)
> $$
> U_{i3} = WOM_i \cdot S_i \cdot C_{WOM}
> $$
> - $WOM_i$: amount of WOM consumer $i$ receives (can be positive or negative)
> - $S_i$: social sensitivity of consumer $i$
> - $C_{WOM}$: constant WOM sensitivity factor
^def-wom-utility

**Key design choice:** WOM can be *negative*. Even if a consumer purchased the product, they can disseminate negative WOM if dissatisfied, hampering other consumers' buying stimuli. See [[Word of Mouth Mechanisms]] for details.

### Component 4: Price Utility ($U_{i4}$)

> [!definition] Definition: Price Utility Component (Karakaya et al. 2011, Eq. 6)
> $$
> U_{i4} = -(PrSen_i \cdot price \cdot C_{price})
> $$
> - $PrSen_i$: price sensitivity of consumer $i$, drawn from $U(0.5, 1)$
> - $price$: price of the product (set by company each time step)
> - $C_{price}$: constant price sensitivity factor
^def-price-utility

**Interpretation:** Price always reduces utility (negative sign). The restricted range $PrSen_i \in [0.5, 1]$ ensures all consumers are at least moderately price-sensitive.

### Cost Structure

Product cost is linearly related to quality:

$$Cost = A_1 \cdot 0.1 + A_2 \cdot 0.2$$

Higher quality attributes increase production costs, creating the fundamental trade-off the firm must navigate.

## Examples

> [!example] Example: Benchmark Experiment Parameters (Karakaya et al. 2011, Table 1)
> **Setup:** $N = 1000$ consumers, $M = 200$ opinion leaders, $T = 20$ time steps, $\alpha = 0.7$ (buying threshold), $\beta = 0.5$ (smoothing), $k = 5$ (logit smoothing). Product: small size ($A_1$ low), low resolution ($A_2$ low), high price, low promotion. 5 opinion leaders targeted.
>
> **Result:** This benchmark (low quality, high price, low promotion) produces the lowest sales, providing a baseline against which quality improvements, price reductions, and promotion increases are compared.

## Connections

- The utility feeds into the [[Logit Purchase Decision Model]] for the actual purchase decision
- $U_{i3}$ connects to [[Word of Mouth Mechanisms]] — the WOM component can amplify or suppress the other components
- Heterogeneous sensitivity parameters ($K_i$, $Pr_i$, $S_i$, $PrSen_i$) instantiate [[Heterogeneity in Agent Models]]
- Parameter values and experimental variations are detailed in [[Population Initialization and Parameter Sensitivity]]

## See Also
- [[Logit Purchase Decision Model]] — how utility translates to purchase
- [[Word of Mouth Mechanisms]] — how $WOM_i$ is computed
- [[Karakaya et al 2011 - Overview]] — paper context
