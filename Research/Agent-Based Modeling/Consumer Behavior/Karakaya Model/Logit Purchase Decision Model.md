---
title: Logit Purchase Decision Model
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/marketing
  - type/concept
  - doc/paper
source: "[[raw/abm_consumer.pdf]]"
source_location: "pp. 9-10"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Consumer Behavior/Karakaya Model"
doc_type: paper
depends_on:
  - "[[Consumer Utility Function Components]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
used_by:
  - "[[ABM in Marketing Strategy]]"
  - "[[Population Initialization and Parameter Sensitivity]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - Logit purchase model
  - Stochastic purchase decision
---

# Logit Purchase Decision Model

> [!summary]
> Karakaya et al. (2011) use a two-stage purchase decision model combining a deterministic utility threshold with a stochastic logit function. A consumer purchases if their utility exceeds a buying threshold $\alpha$ AND a logit-transformed probability exceeds a random draw. This captures bounded rationality — consumers with high utility are likely but not certain to buy.

## Overview

The purchase decision model addresses the empirical observation that consumers do not always act rationally. Even when a product satisfies expectations, a consumer may not purchase — and conversely, a consumer may purchase impulsively despite low expected utility. The model uses a threshold from Granovetter (1978) combined with a logit function (Anderson, de Palma & Thisse 1992) to introduce calibrated randomness.

## Main Content

### The Logit Function

> [!definition] Definition: Logit Function for Purchase Decisions (Karakaya et al. 2011, Eq. 7)
> $$\text{Logit}(u) = \frac{1}{1 + e^{k(\alpha - u)}}$$
> where:
> - $u$: utility of the consumer
> - $k$: smoothing constant ($k = 5$ in experiments)
> - $\alpha$: buying threshold ($\alpha = 0.7$ in experiments)
>
> The logit function maps utility to a purchase probability in $[0, 1]$.
^def-logit-function

### Purchase Decision Rule

> [!definition] Definition: Purchase Decision Rule (Karakaya et al. 2011, Eq. 8)
> Consumer $i$ purchases the product if and only if:
> $$U_i > \alpha \quad \text{and} \quad \text{Logit}(U_i) \geq \tau_i$$
> where:
> - $\alpha = 0.7$: buying threshold (minimum utility for consideration)
> - $\tau_i \sim U(0, 1)$: random number generated for consumer $i$
^def-purchase-rule

### Two-Stage Mechanism

**Stage 1 — Threshold gate:** The consumer's utility must exceed $\alpha$ to even be considered. This represents a minimum acceptable level of satisfaction — consumers below this threshold are completely uninterested regardless of randomness.

**Stage 2 — Stochastic decision:** Among consumers who pass the threshold, the logit function converts their utility into a purchase probability. Higher utility leads to higher probability, but the outcome is still stochastic. A consumer with $U_i$ slightly above $\alpha$ has approximately 50% chance of purchasing, while a consumer with $U_i$ well above $\alpha$ has near-certain purchase probability.

### Properties of the Logit

The logit function has useful properties for this application:

- **Sigmoid shape**: Smooth transition from low to high purchase probability
- **Centered at threshold**: $\text{Logit}(\alpha) = 0.5$ — exactly 50% purchase probability at the threshold
- **Steepness controlled by $k$**: Higher $k$ makes the transition sharper; $k \to \infty$ recovers a deterministic step function
- **Bounded**: Always in $[0, 1]$, interpretable as a probability

### Post-Purchase Behavior

Once a consumer purchases:
- They use the product until the last time step ($T = 20$)
- They do not make another purchasing decision in consecutive time steps
- Their utility does not decay due to external factors after purchasing
- They begin disseminating WOM (positive or negative) based on their satisfaction

## Examples

> [!example] Example: Logit at Different Utility Levels
> **Setup:** With $k = 5$ and $\alpha = 0.7$:
>
> | Utility $U_i$ | $\text{Logit}(U_i)$ | Interpretation |
> |---|---|---|
> | 0.5 | 0.27 | Low utility — 27% chance of purchase |
> | 0.7 | 0.50 | At threshold — coin flip |
> | 0.9 | 0.73 | Above threshold — 73% chance |
> | 1.2 | 0.92 | Well above — 92% chance |
> | 1.5 | 0.98 | Very high — near certain |
>
> **Interpretation:** The logit creates a gradual transition rather than a sharp cutoff, with the steepness determined by $k = 5$.

## Connections

- This model operationalizes [[Agent Decision Rules and Bounded Rationality]] in the Karakaya framework
- The utility input comes from [[Consumer Utility Function Components]]
- The threshold concept relates to Granovetter's (1978) threshold models of collective behavior, also used in [[Product Adoption and Diffusion Models]]
- The sensitivity analysis of threshold and smoothing parameters is covered in [[Population Initialization and Parameter Sensitivity]]

## See Also
- [[Consumer Utility Function Components]] — the utility that feeds into this decision
- [[Agent Decision Rules and Bounded Rationality]] — comparison with other decision architectures
- [[Karakaya et al 2011 - Overview]] — paper context
