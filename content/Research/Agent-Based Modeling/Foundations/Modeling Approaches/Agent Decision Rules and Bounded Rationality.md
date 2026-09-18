---
title: Agent Decision Rules and Bounded Rationality
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7281, 7287"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Foundations/Modeling Approaches"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
used_by:
  - "[[Consumer Utility Function Components]]"
  - "[[Logit Purchase Decision Model]]"
  - "[[Behavioral Primitives and Thresholds]]"
  - "[[Homo Silicus - LLMs as Simulated Economic Agents]]"
  - "[[LLM-Powered Agents - Overview]]"
  - "[[LLM Agents vs Rule-Based Agents in ABM]]"
  - "[[Generative Agents Architecture - Memory, Reflection and Planning]]"
aliases:
  - Agent decision making
  - Bounded rationality in ABM
---

# Agent Decision Rules and Bounded Rationality

> [!summary]
> ABM agents make decisions through a variety of rule-based mechanisms rather than perfect rational optimization. The three papers illustrate a spectrum of approaches: threshold-based activation of behavioral primitives (Ben Said), utility maximization with stochastic logit noise (Karakaya), and simple probability-based adoption rules (Bonabeau). All share the principle that agents use local, imperfect information and bounded cognitive resources.

## Overview

A fundamental design choice in any ABM is how agents make decisions. Unlike rational choice models in classical economics that assume agents maximize utility with perfect information, ABM agents typically operate with bounded rationality — they use heuristics, respond to local stimuli, and may not always act in their best interest. This is both a feature (more realistic) and a challenge (more parameters to calibrate).

## Main Content

### Decision Rule Architectures

The three papers implement three distinct decision architectures:

#### 1. Threshold-Based Rules (Ben Said et al. 2002)

Agents in CUBES respond to external stimuli through **behavioral primitives (BP)** that activate when stimulus intensity exceeds a threshold:

- Each BP has an **inhibiting threshold** ($Inh\_Thr_{inf}$, $Inh\_Thr_{sup}$) and a **triggering threshold** ($Trig\_Thr$)
- Stimuli below the inhibiting range have no effect
- Stimuli between inhibiting and triggering ranges affect opinions but don't trigger action
- Stimuli above the triggering threshold activate the BP and influence the agent's behavior

This creates a nonlinear, step-like response where small stimuli are filtered out — a form of bounded attention.

See [[Behavioral Primitives and Thresholds]] for the full state diagram.

#### 2. Utility + Logit Rules (Karakaya et al. 2011)

Agents compute a utility $U_i$ from four components (quality, promotion, WOM, price), then apply a two-stage purchase decision:

1. **Threshold check**: $U_i > \alpha$ (buying threshold)
2. **Stochastic decision**: $\text{logit}(U_i) \geq \tau_i$ where $\tau_i$ is a random draw

> [!definition] Definition: Logit Purchase Rule (Karakaya et al. 2011)
> $$
> \text{if } U_i > \alpha \text{ and } \text{logit}(U_i) \geq \tau_i, \text{ consumer } i \text{ purchases the product}
> $$
> where $\text{logit}(u) = \frac{1}{1 + e^{k(\alpha - u)}}$, $k$ is a smoothing constant, and $\alpha$ is the buying threshold.
^def-logit-purchase

This combines rational utility comparison with stochastic noise, capturing the empirical observation that "human beings do not always act rationally and they may not always purchase a product even though it satisfies consumer's expectations" (Karakaya et al. 2011).

See [[Logit Purchase Decision Model]] for full details.

#### 3. Probability-Based Rules (Bonabeau 2002)

In the product adoption model, each agent $k$ adopts with a probability given by the rate of the master equation — the probability of becoming one is equal to $V(\hat{\rho}_k)$ per time unit:

$$
P(\text{adopt}_k) = V(\hat{\rho}_k) = \frac{(1 + \theta^d)\hat{\rho}_k^d}{\hat{\rho}_k^d + \theta^d}
$$

This is the simplest architecture: a direct mapping from local information (fraction of adopting neighbors) to adoption probability.

### Bounded Rationality Features

All three approaches incorporate bounded rationality:

| Feature | Ben Said | Karakaya | Bonabeau |
|---------|----------|----------|----------|
| Information | Local stimuli only | Neighborhood WOM | Neighbor adoption fraction |
| Attention | Threshold filtering | Buying threshold $\alpha$ | Implicit in $V$ shape |
| Noise | Threshold variation | Logit randomness | Probabilistic adoption |
| Memory | Attitude persistence | Promotion smoothing ($\beta$) | None (memoryless) |
| Learning | Attitude evolution | Utility updates | None |

### Stochasticity in Agent Decisions

> [!important] Role of Randomness
> Bonabeau (2002) emphasizes that "stochasticity applies to the agents' behavior. With ABM, one is not opposed to a noise term added almost out of necessity but rather to an ABM where nothing is certain." Randomness in ABM is a feature representing genuine uncertainty in individual behavior, not just statistical noise around a deterministic trend.

## Connections

- The threshold architecture is detailed in [[Behavioral Primitives and Thresholds]]
- The utility + logit architecture is formalized in [[Consumer Utility Function Components]] and [[Logit Purchase Decision Model]]
- The adoption probability rule feeds into [[Product Adoption and Diffusion Models]]
- All decision rules interact with [[Heterogeneity in Agent Models|agent heterogeneity]] through individually varied parameters

## See Also
- [[Consumer Utility Function Components]] — the Karakaya utility model
- [[Behavioral Primitives and Thresholds]] — the CUBES decision mechanism
- [[Product Adoption and Diffusion Models]] — the Bonabeau adoption rule
- [[ABM Methodology and Principles]] — the broader framework these rules operate within
- [[Heterogeneity in Agent Models]] — agent heterogeneity determines how decision-rule parameters vary across individuals
- [[Emergent Phenomena in ABM]] — bounded rationality at the individual level generates macro-level emergent outcomes
- [[Discrete Choice Models]] — the econometric structural analogue of the logit decision rule; compare to the Karakaya utility + logit architecture
- [[Tool Use and the Agent Loop]] — the other, LLM sense of "agent"
- [[LLM Agents vs Rule-Based Agents in ABM]] — LLMs as an alternative to hand-written decision rules
