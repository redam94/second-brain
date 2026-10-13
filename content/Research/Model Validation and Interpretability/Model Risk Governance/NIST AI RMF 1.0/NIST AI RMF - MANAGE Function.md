---
title: "NIST AI RMF - MANAGE Function"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 2 §5.4 Manage p. 31 (PDF p. 36); Table 4 Categories and subcategories for the MANAGE function pp. 32-33 (PDF pp. 37-38)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - MAP Function]]"
  - "[[NIST AI RMF - MEASURE Function]]"
used_by:
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
aliases:
  - AI RMF MANAGE Function
  - AI RMF Table 4
  - AI RMF Risk Response Options
  - MANAGE 2.4 Supersede, Disengage, or Deactivate
---

# NIST AI RMF - MANAGE Function

> [!summary]
> **MANAGE** "entails allocating risk resources to mapped and measured risks on a regular basis and as defined by the GOVERN function. Risk treatment comprises plans to respond to, recover from, and communicate about incidents or events" (§5.4, p. 31). Table 4 has 4 categories and 13 subcategories. **MANAGE 1** covers prioritizing and responding: the proceed/stop determination (1.1), prioritizing by impact and likelihood (1.2), and the four response options *mitigate, transfer, avoid, accept* (1.3). It also documents **negative residual risk** as "the sum of all unmitigated risks" (1.4). **MANAGE 2** covers benefit-maximizing strategies: consider "viable non-AI alternative systems" (2.1), sustain value (2.2), respond to unknown risks (2.3), and be able to "supersede, disengage, or deactivate" a system (2.4). **MANAGE 3** covers third-party and pre-trained models. **MANAGE 4** covers post-deployment monitoring, including "appeal and override," continual improvement, and incident communication.
^summary

## Overview

MANAGE closes the loop. MAP establishes context, MEASURE produces evidence, and MANAGE turns that evidence into decisions and resource allocation. For a validation function, MANAGE is where a finding becomes an action: restricting use, adding controls, falling back to a simpler method, or retiring the model.

## Main Content

### §5.4 narrative (p. 31)

> [!definition] Definition: MANAGE Function (AI RMF §5.4, p. 31)
> "The MANAGE function entails allocating risk resources to mapped and measured risks on a regular basis and as defined by the GOVERN function. Risk treatment comprises plans to respond to, recover from, and communicate about incidents or events."
>
> - Contextual information from expert consultation (established in GOVERN, carried out in MAP) "is utilized in this function to decrease the likelihood of system failures and negative impacts."
> - "Systematic documentation practices established in GOVERN and utilized in MAP and MEASURE bolster AI risk management efforts and increase transparency and accountability."
> - "Processes for assessing emergent risks are in place, along with mechanisms for continual improvement."
> - End state: "plans for prioritizing risk and regular monitoring and improvement will be in place," with enhanced capacity "to allocate risk management resources based on assessed and prioritized risks." MANAGE must continue "as methods, contexts, risks, and needs or expectations from relevant AI actors evolve over time."
^def-manage

### Table 4: MANAGE categories and subcategories (pp. 32-33)

Transcribed from Table 4 (line breaks joined).

**MANAGE 1: AI risks based on assessments and other analytical output from the MAP and MEASURE functions are prioritized, responded to, and managed.**

| ID | Subcategory |
|---|---|
| MANAGE 1.1 | A determination is made as to whether the AI system achieves its intended purposes and stated objectives and whether its development or deployment should proceed. |
| MANAGE 1.2 | Treatment of documented AI risks is prioritized based on impact, likelihood, and available resources or methods. |
| MANAGE 1.3 | Responses to the AI risks deemed high priority, as identified by the MAP function, are developed, planned, and documented. Risk response options can include mitigating, transferring, avoiding, or accepting. |
| MANAGE 1.4 | Negative residual risks (defined as the sum of all unmitigated risks) to both downstream acquirers of AI systems and end users are documented. |

**MANAGE 2: Strategies to maximize AI benefits and minimize negative impacts are planned, prepared, implemented, documented, and informed by input from relevant AI actors.**

| ID | Subcategory |
|---|---|
| MANAGE 2.1 | Resources required to manage AI risks are taken into account – along with viable non-AI alternative systems, approaches, or methods – to reduce the magnitude or likelihood of potential impacts. |
| MANAGE 2.2 | Mechanisms are in place and applied to sustain the value of deployed AI systems. |
| MANAGE 2.3 | Procedures are followed to respond to and recover from a previously unknown risk when it is identified. |
| MANAGE 2.4 | Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use. |

**MANAGE 3: AI risks and benefits from third-party entities are managed.**

| ID | Subcategory |
|---|---|
| MANAGE 3.1 | AI risks and benefits from third-party resources are regularly monitored, and risk controls are applied and documented. |
| MANAGE 3.2 | Pre-trained models which are used for development are monitored as part of AI system regular monitoring and maintenance. |

**MANAGE 4: Risk treatments, including response and recovery, and communication plans for the identified and measured AI risks are documented and monitored regularly.**

| ID | Subcategory |
|---|---|
| MANAGE 4.1 | Post-deployment AI system monitoring plans are implemented, including mechanisms for capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery, and change management. |
| MANAGE 4.2 | Measurable activities for continual improvements are integrated into AI system updates and include regular engagement with interested parties, including relevant AI actors. |
| MANAGE 4.3 | Incidents and errors are communicated to relevant AI actors, including affected communities. Processes for tracking, responding to, and recovering from incidents and errors are followed and documented. |

^table4-manage

### The risk-response decision

> [!algorithm] Risk Treatment Loop Implied by MANAGE 1 (Table 4, p. 32; structured paraphrase)
> 1. **Determine fitness** (1.1). Does the system achieve its intended purposes and objectives? If not, should development or deployment stop? This repeats MAP's go/no-go, now with MEASURE evidence.
> 2. **Prioritize** (1.2). Rank documented risks by impact, likelihood, and available resources or methods (the §1.1 risk definition again).
> 3. **Respond** (1.3). For high-priority risks, choose and document one of:
>    - *Mitigate*: reduce likelihood or magnitude, e.g. constrain use, add controls, recalibrate.
>    - *Transfer*: move the risk to another party, e.g. contract or insurance.
>    - *Avoid*: do not do the risky activity, e.g. do not deploy for that use.
>    - *Accept*: proceed knowingly within tolerance.
> 4. **Document residual risk** (1.4): the "sum of all unmitigated risks," communicated to downstream acquirers and end users.
> 5. **Prepare exits** (2.4). Make sure someone can "supersede, disengage, or deactivate" the system if outcomes are "inconsistent with intended use."
> 6. **Monitor and improve** (4.1-4.3), then go back to step 1 when new evidence arrives.
^alg-risk-treatment

> [!definition] Definition: Negative Residual Risk (MANAGE 1.4, p. 32)
> "Negative residual risks (defined as the sum of all unmitigated risks)." If risks $r_1,\dots,r_m$ have been assessed and treatments reduce each to $\tilde r_i\le r_i$, then residual risk is $R_{\text{res}}=\sum_{i}\tilde r_i$, where $\tilde r_i=r_i$ for untreated risks. (The additive notation is a vault gloss on the "sum" wording. Compare §1.2.3, where residual risk is "risk remaining after risk treatment".)
^def-negative-residual-risk

**MANAGE 2.1: non-AI alternatives.** The framework explicitly asks whether a simpler non-AI method would reduce "the magnitude or likelihood of potential impacts." In analytics this means asking whether a randomized experiment, a simple heuristic, or a transparent regression would serve the decision better than a complex model.

## Examples

> [!example] Example: Responding to a failed attribution validation (generic illustration)
> **Setup:** MEASURE found that per-segment driver rankings are not stable across refits, and simulation shows they misrank planted effects 40% of the time (hypothetical figures).
>
> - **MANAGE 1.1**: The system does not achieve its stated objective, which is a reliable driver ranking for reallocation. Deployment for that use should not proceed.
> - **MANAGE 1.3 responses**:
>   - *Mitigate*: pool segments hierarchically to stabilize estimates, and report intervals instead of ranks.
>   - *Avoid*: withdraw the ranking from automated budget rules.
>   - *Accept*: keep the descriptive dashboard with a documented caveat.
> - **MANAGE 2.1**: Consider non-AI alternatives, such as geo holdout experiments for the top channels ([[Geo-Experiment Design and Power Analysis]]), whose results can then be used as priors ([[Q - Using Experiment Results as Priors in a Bayesian MMM]]).
> - **MANAGE 1.4 residual risk**: The descriptive dashboard may still be read causally by users. Document this and communicate it.
> - **MANAGE 2.4**: Give a named owner the authority to switch off the ranking widget.
> - **MANAGE 4.1**: Log analyst overrides of recommendations, with reasons (cf. Appendix C, [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]]).
^ex-responding-to-a-failed

## Connections

- **SR 11-7 crosswalk**: MANAGE 1.1 ↔ the validation outcome deciding model use; MANAGE 1.3 "accept" with limits ↔ SR 11-7's use of models with documented limitations and compensating controls; MANAGE 4.1 "appeal and override" ↔ override monitoring ([[SR 11-7 - Model Risk Management Guidance - Overview]]).
- **Response options** are the standard ISO 31000-style treatments (avoid, mitigate, transfer, accept).
- **Non-AI alternatives** (2.1) relate to the experimental-vs-observational tradeoff: [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]], [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].
- **Sustaining value / drift** (2.2, 3.2): [[Forecast Evaluation and Backtesting]].

## See Also

- [[NIST AI RMF - MEASURE Function]]
- [[NIST AI RMF - Framing AI Risk and Measurement Challenges]]: residual risk and prioritization (§1.2.3)
- [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]
- [[NIST AI RMF 1.0 - Overview]]
