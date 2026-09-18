---
title: Behavioral Primitives and Thresholds
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/consumer-behavior
  - type/concept
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "pp. 186-187"
date_ingested: 2026-04-10
date_updated: 2026-08-03
folder: "Agent-Based Modeling/Consumer Behavior/CUBES Model"
doc_type: paper
depends_on:
  - "[[Behavioral Attitudes in CUBES]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
used_by:
  - "[[Genetic Algorithm Calibration for ABM]]"
aliases:
  - Behavioral primitives
  - BP mechanism
  - Threshold activation in CUBES
---

# Behavioral Primitives and Thresholds

> [!summary]
> Behavioral primitives (BP) are the core decision mechanism in CUBES. Each BP is activated by external stimuli (promotions, rumors, innovations, recommendations) and filtered through a three-threshold system: lower inhibiting threshold, upper inhibiting threshold, and triggering threshold. This creates a nonlinear response where weak stimuli are ignored, moderate stimuli affect opinions, and strong stimuli trigger behavioral changes.

## Overview

BPs are formalized uniformly as generic response mechanisms activated by different types of external stimuli. Each stimulus has a type, a brand identifier (color), and an intensity value. The BP mechanism determines whether a stimulus is strong enough to affect the agent's opinions and whether it triggers a behavioral change such as a purchase or recommendation.

## Main Content

### BP Activation Mechanism

> [!definition] Definition: Behavioral Primitive (Ben Said et al. 2002)
> A behavioral primitive (BP) is activated after the perception of an external stimulus. The BP intensity $V_{BP}$ is compared against three thresholds that determine the agent's response:
> - **Lower inhibiting threshold** ($Inh\_Thr_{inf}$): minimum intensity to activate the BP for positive stimuli
> - **Upper inhibiting threshold** ($Inh\_Thr_{sup}$): minimum intensity to activate the BP for negative stimuli
> - **Triggering threshold** ($Trig\_Thr$): intensity above which the external stimulus has an impact on the consumer agent's opinions
^def-behavioral-primitive

### State Diagram

The BP state diagram (Figure 3 in the paper) defines four states based on stimulus intensity:

#### State 1: Inactive BP ($V_{BP} < Inh\_Thr_{inf}$ or $Inh\_Thr_{inf} < V_{BP} < Inh\_Thr_{sup}$)
- Reception of external stimulus with **no effect on opinions**
- The stimulus is too weak to pass the inhibiting filter

#### State 2: Active BP, No Opinion Effect ($Inh\_Thr_{sup} \leq V_{BP} < Trig\_Thr$)
- Reception of external stimulus with **no effect on opinions** but the BP is active
- The stimulus is above inhibiting threshold but below triggering threshold

#### State 3: Active BP, Positive Effect ($V_{BP} \geq Trig\_Thr$, positive stimulus)
- Reception of external stimulus **with effect on opinions**
- The stimulus is strong enough to modify the agent's brand opinions positively

#### State 4: Active BP, Negative Effect ($V_{BP} \geq Trig\_Thr$, negative stimulus)
- Reception of external stimulus **with effect on opinions** (negative direction)
- The stimulus triggers a negative opinion change

### Threshold Personalization

The triggering and inhibiting thresholds are personalized for each agent:

- Thresholds are expressed as a function of the consumer agent's **socio-demographic profile** and **initial simulation parameters**
- The population is initially divided into several segments according to attributes such as age, family, and professional status
- This creates heterogeneous sensitivity to stimuli across the agent population

### Stimulus Properties

Each external stimulus is characterized by:
1. **Type**: rumor, promotion, innovation, recommendation
2. **Color**: brand identifier (null if the stimulus is a market-wide rumor)
3. **Intensity**: numerical value indicating force of the stimulus

### Perception and Involvement

CUBES models two additional cognitive dimensions:

- **Perception**: How the agent selects, organizes, and interprets marketing and environmental stimuli
- **Involvement**: The motivation state related to the consumer, controlled by an adjustment of behavioral attitude rejection margins relative to positive and negative stimuli

Higher involvement lowers the effective threshold, making the agent more responsive to stimuli.

## Connections

- BPs operate on the [[Behavioral Attitudes in CUBES|behavioral attitudes]] — the attitudes determine baseline threshold levels
- The threshold mechanism is a specific implementation of [[Agent Decision Rules and Bounded Rationality]]
- BP parameters are encoded in GA chromosomes for [[Genetic Algorithm Calibration for ABM|calibration]]
- The stimulus types connect to [[Imitation and Conditioning Processes]] (recommendations trigger imitation BPs)

## See Also
- [[Behavioral Attitudes in CUBES]] — the attitudes that parameterize BPs
- [[CUBES Simulator Architecture]] — where BPs fit in the system
- [[Agent Decision Rules and Bounded Rationality]] — comparison with other decision mechanisms
- [[Population Initialization and Parameter Sensitivity]] — threshold heterogeneity across socio-demographic segments and parameter sensitivity in ABMs
- [[Uncertainty Quantification for ABM Calibration]] — BP threshold parameters are among the calibration targets explored via UQ ensemble methods
