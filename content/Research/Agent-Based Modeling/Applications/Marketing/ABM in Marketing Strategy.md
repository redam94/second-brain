---
title: ABM in Marketing Strategy
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/marketing
  - type/concept
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "pp. 3, 6-7, 10-17"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Applications/Marketing"
doc_type: paper
depends_on:
  - "[[Consumer Utility Function Components]]"
  - "[[Word of Mouth Mechanisms]]"
  - "[[Opinion Leaders and Social Influence]]"
  - "[[Population Initialization and Parameter Sensitivity]]"
used_by: []
aliases:
  - Marketing mix ABM
  - 4Ps in ABM
  - Marketing strategy simulation
---

# ABM in Marketing Strategy

> [!summary]
> ABM enables marketers to simulate the effects of different marketing strategies (price, promotion, quality, opinion leader targeting) in a virtual market with heterogeneous consumers connected through social networks. Karakaya et al. (2011) find that product quality is the most significant profitability driver when WOM is active, promotion has diminishing returns under WOM, and negative WOM from dissatisfied customers can offset price-reduction gains.

## Overview

Marketing strategy traditionally relies on the 4Ps framework (McCarthy 1960): Product, Price, Place, and Promotion. ABM allows marketers to simulate how changes to these variables propagate through a consumer network, accounting for WOM effects, opinion leader influence, and heterogeneous consumer preferences — effects that traditional marketing mix models typically ignore.

## Main Content

### The Marketing Mix in ABM

Karakaya et al. (2011) model three of the 4Ps explicitly (excluding Place):

| Marketing Variable | Model Component | How It's Varied |
|-------------------|----------------|-----------------|
| **Product (Quality)** | Attributes $A_1$, $A_2$ in utility component $U_{i1}$ | Low to high quality configurations |
| **Price** | Price in utility component $U_{i4}$ | Different price levels |
| **Promotion** | Intensity $Pro_t$ in utility component $U_{i2}$ | Low to high promotion |
| **Opinion Leaders** | Number of targeted opinion leaders | 5 to varying numbers |

### Key Experimental Findings

#### Quality Effects (Most Significant)

> [!important] Quality Dominates Under WOM
> Product quality is the most significant factor affecting profitability when WOM is active. This is because:
> 1. High quality -> high $U_{i1}$ -> more purchases -> positive WOM from satisfied customers
> 2. Positive WOM -> higher $U_{i3}$ for connected consumers -> more purchases -> more positive WOM
> 3. This positive feedback loop amplifies quality advantages beyond what direct utility effects would predict
>
> Without WOM, quality still matters but the amplification effect is absent.

#### Price Effects (Complex Interactions)

- Lowering price increases $U_{i4}$ (less negative) -> more purchases
- But price-driven purchasers may have low quality satisfaction -> negative WOM
- Net effect depends on the balance between volume gains and WOM quality
- "Lowering price increases sales but negative WOM from dissatisfied consumers can offset gains"

#### Promotion Effects (Diminishing Returns)

- Promotion increases $U_{i2}$ -> more purchases in early time steps
- But when WOM is active, organic WOM **substitutes** for paid promotion
- Additional promotion spending yields diminishing marginal returns
- "Increasing promotion has limited additional effect when WOM is present"

#### Opinion Leader Targeting (Accelerator)

- More targeted opinion leaders accelerate initial diffusion
- Each opinion leader costs a fixed fee, creating a cost-effectiveness calculation
- Diminishing marginal returns to adding more opinion leaders
- Critical interaction: targeting many leaders for a low-quality product generates fast adoption followed by negative WOM backlash

### Strategic Implications

1. **Quality-first strategy**: Under WOM, invest in product quality before marketing spend — WOM amplifies quality signals more than advertising
2. **Beware of premature scaling**: Aggressive price cuts or promotion for a low-quality product can generate negative WOM that is harder to reverse than not having marketed at all
3. **WOM as a substitute for promotion**: In connected markets, organic WOM can replace some paid advertising — but only if the product generates positive consumer experiences
4. **Opinion leader selection matters**: The interaction between product quality and opinion leader targeting means the optimal number of leaders depends on product quality

### ABM vs Traditional Marketing Analysis

| Feature | Traditional Analysis | ABM Analysis |
|---------|---------------------|-------------|
| Consumer interactions | Ignored | Explicitly modeled |
| WOM effects | External or absent | Endogenous |
| Heterogeneity | Market segments | Individual agents |
| Network effects | Ignored | Topology-dependent |
| Dynamic feedback | Limited | Full feedback loops |

## Connections

- The utility model driving these results is in [[Consumer Utility Function Components]]
- WOM mechanisms are in [[Word of Mouth Mechanisms]]
- Opinion leader strategies are in [[Opinion Leaders and Social Influence]]
- Parameter details are in [[Population Initialization and Parameter Sensitivity]]
- This is one of several ABM applications discussed in Bonabeau (2002) — see also [[Market and Financial Simulation]], [[Organizational Simulation]]

## See Also
- [[Consumer Utility Function Components]] — the underlying utility model
- [[Word of Mouth Mechanisms]] — the WOM that amplifies marketing effects
- [[Karakaya et al 2011 - Overview]] — paper context
- [[Market Response Models - Overview]] — traditional (non-ABM) marketing mix modeling; same 4Ps decisions without agent heterogeneity or WOM endogeneity
- [[Advertising and Promotion Effects]] — empirical advertising elasticity (≈0.10 short-run); compare with ABM finding that WOM substitutes for promotion
- [[Marketing Generalizations Overview]] — empirical meta-analysis that ABM findings should be benchmarked against
