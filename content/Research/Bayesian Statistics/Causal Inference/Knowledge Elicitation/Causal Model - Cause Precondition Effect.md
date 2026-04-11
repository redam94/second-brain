---
title: "Causal Model - Cause Precondition Effect"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/knowledge-elicitation
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]]"
source_location: "§2, pp. 439-440"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on: []
used_by:
  - "[[Interactive Knowledge Elicitation Method]]"
aliases:
  - cause-precondition-effect model
  - three-element causal model
---

# Causal Model — Cause, Precondition, Effect

> [!summary]
> Yamashita et al. propose a causal model with three elements — cause, precondition, and effect — that can represent indirect causal relationships mediated by enabling conditions. It is simpler than FRAM (6-aspect functional resonance analysis) yet more expressive than a plain cause-effect model, making it tractable for non-expert use.

## Overview

Existing causal formalisms present a tradeoff:
- **Simple cause-effect**: Easy to use, but cannot represent conditional or mediated causation
- **FRAM** (Functional Resonance Analysis Method): Captures 6 aspects of causality (Time, Control, Precondition, Resource, Input, Output) but is too complex for non-experts

The proposed three-element model occupies the middle ground.

## Main Content

> [!definition] Definition: Cause
> An event or factor that **directly** triggers an effect. Without the cause, the effect cannot occur. In the FRAM analogy, this corresponds to the Input aspect.
^def-cause

> [!definition] Definition: Precondition
> An event or factor that is **not** the direct cause, but whose presence is **necessary** for the effect to occur. If the cause occurs without the precondition, the effect does not happen.
>
> In FRAM, preconditions cover the Precondition, Time, Control, and Resource aspects.
^def-precondition

> [!definition] Definition: Effect
> The outcome or consequence that results when both a cause and its required preconditions are present.
^def-effect

> [!example] Example: Blackout + Medical Equipment
> **Cause:** Blackout (direct trigger)
> **Precondition:** Inadequate emergency power supply (necessary enabling condition)
> **Effect:** Medical equipment cannot be used
>
> *Without* the precondition, the effect does not follow from the cause: if adequate backup power exists, a blackout would not disable the medical equipment.
>
> **Countermeasure framing:** The precondition "inadequate emergency power supply" is elicited as a countermeasure: "install adequate emergency power supply."

## Relationship to FRAM

| FRAM Aspect | Maps to |
|-------------|---------|
| Input | Cause |
| Precondition, Time, Control, Resource | Precondition |
| Output | Effect |

The two remaining FRAM aspects (Input and Output) map directly to cause and effect, while the other four map to preconditions. This simplification covers most practically important cases in disaster scenarios.

## Countermeasure Elicitation Strategy

Rather than asking participants to identify preconditions directly (which requires domain expertise and reflection), the method asks for **countermeasures** — actions to prevent or mitigate an effect. Countermeasures are interpretations of preconditions from the perspective of intervention:

> *"Installing adequate emergency power supply"* is the countermeasure corresponding to the precondition *"inadequate emergency power supply."*

This design choice makes the model tractable for non-experts: it is easier to think of what one would do to prevent something than to identify what enabling conditions were necessary.

## Connections

- Used by: [[Interactive Knowledge Elicitation Method]] (GUI asks for causes, effects, and countermeasures using this model)
- Contrast with [[Potential Outcomes Framework]] — a different approach to formalizing causality (statistical, not structural/descriptive)
- Related to structural causal models / DAGs, though at a conceptual rather than formal probabilistic level

## See Also

- [[Yamashita 2020 - Overview]] — paper context
- [[Interactive Knowledge Elicitation Method]] — how this model is operationalized in a workshop
