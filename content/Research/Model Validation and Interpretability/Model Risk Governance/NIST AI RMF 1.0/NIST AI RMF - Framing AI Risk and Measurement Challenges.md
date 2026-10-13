---
title: "NIST AI RMF - Framing AI Risk and Measurement Challenges"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 1 §1 Framing Risk, printed pp. 4-9 (PDF pp. 9-14): §1 intro p. 4; §1.1 Understanding and Addressing Risks, Impacts, and Harms p. 4; Fig. 1 p. 5; §1.2 Challenges p. 5; §1.2.1 Risk Measurement pp. 5-6; §1.2.2 Risk Tolerance p. 7; §1.2.3 Risk Prioritization pp. 7-8; §1.2.4 Organizational Integration and Management of Risk pp. 8-9"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF 1.0 - Overview]]"
used_by:
  - "[[NIST AI RMF - Core Structure and the GOVERN Function]]"
  - "[[NIST AI RMF - MAP Function]]"
  - "[[NIST AI RMF - MEASURE Function]]"
  - "[[NIST AI RMF - MANAGE Function]]"
aliases:
  - AI RMF Risk Definition
  - AI RMF Risk Tolerance
  - AI RMF Residual Risk
  - AI Risk Measurement Challenges
  - AI RMF Harm Taxonomy (Fig. 1)
---

# NIST AI RMF - Framing AI Risk and Measurement Challenges

> [!summary]
> §1 of the AI RMF defines **risk** as a composite of an event's probability and the size of its consequences, which may be positive or negative. Fig. 1 sorts the possible **harms** into three groups: harm to people, to an organization, and to an ecosystem. §1.2 lists four challenges. **Measurement** (§1.2.1) has seven named difficulties: third-party components, emergent risks, unreliable or gameable metrics, lifecycle stage, lab vs real world, inscrutability, and the lack of a human baseline. **Tolerance** (§1.2.2) is not prescribed by NIST. **Prioritization** (§1.2.3) says not to try to remove all risk, to stop when risk is unacceptable, and to document residual risk. **Integration** (§1.2.4) places AI risk inside enterprise risk management. The key epistemic point is that being unable to measure a risk "does not imply that an AI system necessarily poses either a high or low risk" (p. 5).
^summary

## Overview

Part 1 ("Foundational Information") opens by stating the purpose of AI risk management: to "minimize potential negative impacts of AI systems, such as threats to civil liberties and rights, while also providing opportunities to maximize positive impacts" (§1, p. 4). The section supplies the vocabulary that the Core ([[NIST AI RMF - Core Structure and the GOVERN Function]]) relies on. Risk tolerance is first set in GOVERN 1.3 and MAP 1.5. Likelihood and magnitude of impact are scored in MAP 5.1. Risks that cannot be measured are documented in MEASURE 1.1. Residual risk is recorded in MANAGE 1.4.

## Main Content

### §1.1 Risk, impact and harm (p. 4)

> [!definition] Definition: Risk and Risk Management (AI RMF §1.1, p. 4)
> - **Risk**: "the composite measure of an event's probability of occurring and the magnitude or degree of the consequences of the corresponding event." Impacts "can be positive, negative, or both and can result in opportunities or threats" (adapted from ISO 31000:2018).
> - **Negative risk**: "When considering the negative impact of a potential event, risk is a function of 1) the negative impact, or magnitude of harm, that would arise if the circumstance or event occurs and 2) the likelihood of occurrence" (adapted from OMB Circular A-130:2016). Schematically,
> $$
> \text{risk}(e) = f\big(\Pr[e],\ \text{magnitude of harm}(e)\big),
> $$
> where $e$ is an event and $f$ increases in both arguments. The framework does not specify $f$; the product $\Pr[e]\times\text{harm}(e)$ (expected loss) is the usual special case.
> - **Who bears harm**: "individuals, groups, communities, organizations, society, the environment, and the planet."
> - **Risk management**: "coordinated activities to direct and control an organization with regard to risk" (ISO 31000:2018, quoted in a box on p. 4).
^def-ai-rmf-risk

Further points in §1.1:

- Unlike many risk frameworks, the AI RMF also aims to "identify opportunities to maximize positive impacts." Managing risk "can enable AI developers and users to understand impacts and account for the inherent limitations and uncertainties in their models and systems" (p. 4).
- The framework "is designed to address new risks as they emerge," which matters "where impacts are not easily foreseeable and applications are evolving."
- **Automation over-trust**: "humans may assume that AI systems work – and work well – in all settings," and AI is "often perceived as being more objective than humans or as offering greater capabilities than general software" (p. 4).

> [!example] Figure 1: Examples of potential harms related to AI systems (p. 5)
> | Harm to People | Harm to an Organization | Harm to an Ecosystem |
> |---|---|---|
> | *Individual*: harm to a person's civil liberties, rights, physical or psychological safety, or economic opportunity | Harm to an organization's business operations | Harm to interconnected and interdependent elements and resources |
> | *Group/Community*: harm to a group, e.g. discrimination against a population sub-group | Harm to an organization from security breaches or monetary loss | Harm to the global financial system, supply chain, or interrelated systems |
> | *Societal*: harm to democratic participation or educational access | Harm to an organization's reputation | Harm to natural resources, the environment, and planet |
>
> Caption: "Trustworthy AI systems and their responsible use can mitigate negative risks and contribute to benefits for people, organizations, and ecosystems." (Transcribed from the figure image.)
^fig1-harms

For a marketing-analytics model, the middle column is usually the relevant one: a mis-specified attribution model harms the organization through misallocated budget (business operations, monetary loss). Harm to people becomes relevant when models target individuals.

### §1.2.1 Risk measurement (pp. 5-6)

> [!theorem] Principle: Unmeasured Is Not Low Risk (AI RMF §1.2.1, p. 5)
> "AI risks or failures that are not well-defined or adequately understood are difficult to measure quantitatively or qualitatively. The inability to appropriately measure AI risks does not imply that an AI system necessarily poses either a high or low risk."
>
> **Consequence in the Core:** MEASURE 1.1 requires that risks "that will not – or cannot – be measured are properly documented," and MEASURE 3.2 asks for tracking approaches where "metrics are not yet available." See [[NIST AI RMF - MEASURE Function]].
^thm-unmeasured-not-low

The seven named challenges:

| # | Challenge | What NIST says (p. 5-6) | Validation reading |
|---|---|---|---|
| 1 | **Third-party software, hardware, and data** | Third parties speed up R&D but "may complicate risk measurement." "Risk can emerge both from third-party data, software or hardware itself and how it is used." The developer's risk metrics "may not align" with the deployer's, and the developer "may not be transparent about the risk metrics or methodologies it used." Measurement and management "can be complicated by how customers use or integrate third-party data or systems into AI products or services, particularly without sufficient internal governance structures and technical safeguards." Regardless, "all parties and AI actors should manage risk" in what they "develop, deploy, or use." | Vendor models and pre-trained components need their own validation evidence; see GOVERN 6, MAP 4, MANAGE 3. |
| 2 | **Tracking emergent risks** | Identify and track emergent risks and consider techniques to measure them; "AI system impact assessment approaches" help in specific contexts. | Monitoring must look for failure modes that were not specified in advance. |
| 3 | **Availability of reliable metrics** | There is no "consensus on robust and verifiable measurement methods." Metric development "is often an institutional endeavor and may inadvertently reflect factors unrelated to the underlying impact." Measurement approaches "can be oversimplified, gamed, lack critical nuance, become relied upon in unexpected ways, or fail to account for differences in affected groups and contexts." Population measures work best when they recognize that "harms may affect varied groups or sub-groups differently" and that those harmed "are not always direct users." | This is the construct-validity and Goodhart problem; see [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]. |
| 4 | **Risk at different stages of the lifecycle** | Measuring early "may yield different results" than measuring late. "Some risks may be latent at a given point in time and may increase as AI systems adapt and evolve." The developer of a pre-trained model and the actor who deploys it in a specific use case can have different risk perspectives: "Such deployers may not recognize that their particular uses could entail risks which differ from those perceived by the initial developer." "All involved AI actors share responsibilities for designing, developing, and deploying a trustworthy AI system that is fit for purpose." | A pre-deployment validation pass does not cover drift; see MEASURE 2.4 and 3.1. |
| 5 | **Risk in real-world settings** | Lab or controlled measurements "may differ from risks that emerge in operational, real-world settings." | External validity; cf. [[Causal Inference as Generalization]]. |
| 6 | **Inscrutability** | Arises from "the opaque nature of AI systems (limited explainability or interpretability), lack of transparency or documentation ..., or inherent uncertainties in AI systems." | Links to §3.4-3.5 ([[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]). |
| 7 | **Human baseline** | Systems that "augment or replace human activity" need "some form of baseline metrics for comparison." This is hard because AI systems do tasks differently from humans. | A model should be benchmarked against the human or heuristic process it replaces. |

### §1.2.2 Risk tolerance (p. 7)

> [!definition] Definition: Risk Tolerance (AI RMF §1.2.2, p. 7)
> "Risk tolerance refers to the organization's or AI actor's ... readiness to bear the risk in order to achieve its objectives. Risk tolerance can be influenced by legal or regulatory requirements" (adapted from ISO Guide 73).
>
> Properties stated in the text:
> 1. "While the AI RMF can be used to prioritize risk, it does not prescribe risk tolerance."
> 2. Tolerances are "highly contextual and application and use-case specific." They are shaped by policies and norms from system owners, organizations, industries, communities or policy makers, and they "are likely to change over time." "Different organizations may have varied risk tolerances due to their particular organizational priorities and resource considerations." "Emerging knowledge and methods to better inform harm/cost-benefit tradeoffs will continue to be developed and debated by businesses, governments, academia, and civil society."
> 3. Where the challenges of specifying tolerance remain unresolved, "there may be contexts where a risk management framework is not yet readily applicable for mitigating negative AI risks."
> 4. (Box) The framework is meant "to augment existing risk practices." Organizations should follow existing sector rules for "risk criteria, tolerance, and response." "Some sectors or industries may have established definitions of harm or established documentation, reporting, and disclosure requirements." "Within sectors, risk management may depend on existing guidelines for specific applications and use case settings." "Where established guidelines do not exist, organizations should define reasonable risk tolerance. Once tolerance is defined, this AI RMF can be used to manage risks and to document risk management processes."
^def-risk-tolerance

### §1.2.3 Risk prioritization (pp. 7-8)

> [!theorem] Principle: Prioritize by Risk; Stop When Unacceptable (AI RMF §1.2.3, pp. 7-8)
> 1. **No zero-risk target.** "Attempting to eliminate negative risk entirely can be counterproductive in practice because not all incidents and failures can be eliminated." Unrealistic expectations make "risk triage inefficient or impractical" or waste "scarce resources." "A risk management culture can help organizations recognize that not all AI risks are the same, and resources can be allocated purposefully." "Actionable risk management efforts lay out clear guidelines for assessing trustworthiness of each AI system an organization develops or deploys."
> 2. **Proportionality.** "Policies and resources should be prioritized based on the assessed risk level and potential impact of an AI system." The degree to which a deployer customizes the system "can be a contributing factor."
> 3. **Highest risks first.** These "call for the most urgent prioritization and most thorough risk management process."
> 4. **Cessation rule.** Where risk levels are unacceptable, e.g. "where significant negative impacts are imminent, severe harms are actually occurring, or catastrophic risks are present", then "development and deployment should cease in a safe manner until risks can be sufficiently managed." Conversely, "If an AI system's development, deployment, and use cases are found to be low-risk in a specific context, that may suggest potentially lower prioritization."
> 5. **Human-facing vs not.** Higher initial priority goes to systems trained on "sensitive or protected data such as personally identifiable information" or whose outputs affect humans directly or indirectly. Systems that interact "only with computational systems" on non-sensitive data "may call for lower initial prioritization." Even so, non-human-facing systems "can have downstream safety or social implications."
^thm-prioritization

> [!definition] Definition: Residual Risk (AI RMF §1.2.3, p. 8)
> "Residual risk – defined as risk remaining after risk treatment (Source: ISO GUIDE 73) – directly impacts end users or affected individuals and communities." Documenting it forces the provider "to fully consider the risks of deploying the AI product" and "will inform end users about potential negative impacts." MANAGE 1.4 later operationalizes it as "the sum of all unmitigated risks" ([[NIST AI RMF - MANAGE Function]]).
^def-residual-risk

### §1.2.4 Organizational integration (pp. 8-9)

- "AI risks should not be considered in isolation. Different AI actors have different responsibilities and awareness depending on their roles in the lifecycle." Developers "often will not have information about how the system may be used" (p. 8).
- AI risk management "should be integrated and incorporated into broader enterprise risk management strategies and processes." Treating it alongside cybersecurity and privacy "will yield a more integrated outcome and organizational efficiencies."
- "The AI RMF may be utilized along with related guidance and frameworks for managing AI system risks or broader enterprise risks" (p. 8).
- **Risks shared with other software**: privacy of training data; "energy and environmental implications" of heavy compute; the "confidentiality, integrity, and availability" of the system and its data; and general security of the software and hardware.
- **Culture and incentives** (p. 9): accountability mechanisms, roles, "culture, and incentive structures" are required, and "Use of the AI RMF alone will not lead to these changes." Commitment must come "at senior levels." Small and medium organizations "may face different challenges than large organizations."

The integration principle is why the AI RMF fits alongside an existing model-risk regime such as [[SR 11-7 - Model Risk Management Guidance - Overview|SR 11-7]] and does not replace it.

## Examples

> [!example] Example: Applying §1.2 to an aggregate media-response model (generic illustration)
> **Setup:** A team fits a Bayesian media-mix model on 104 weeks of national data and uses it to reallocate budget.
>
> **§1.1 risk:** The harmful event is "the model recommends moving spend away from a channel that actually works." Its magnitude is the lost incremental revenue. Its probability depends on how well the channel effect is identified.
>
> **§1.2.1 measurement challenges:**
> - *Metrics* (3): in-sample fit or MAPE "may inadvertently reflect factors unrelated to the underlying impact", because fit does not validate causal ROI.
> - *Lab vs real world* (5): a simulation benchmark is a controlled setting.
> - *Human baseline* (7): compare against the planner's current heuristic allocation.
>
> **§1.2.1 principle:** Not being able to measure true ROI from observational data alone does not make the risk low. It must be documented, and ideally addressed with experiments ([[Geo-Experiment Design and Power Analysis]]).
>
> **§1.2.2 tolerance:** The organization decides how large a misallocation it will accept, e.g. at most 10% of budget moved on evidence below a stated posterior probability.
>
> **§1.2.3 prioritization:** The model uses only aggregate, non-personal data and is not human-facing, so its initial priority is lower. It still has downstream business impact, so it is not exempt.
^ex-applying-1-2-to

## Connections

- The probability × magnitude definition is the same decision-theoretic construction as expected loss. The AI RMF leaves the loss function and the tolerance threshold to the organization.
- Challenge 3 ("gamed", "relied upon in unexpected ways") is Goodhart's law in regulatory language: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- Challenge 4/5 (lifecycle, real world) motivate drift monitoring and out-of-time validation: [[Forecast Evaluation and Backtesting]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Conformal Prediction Under Covariate Shift]].
- "Inherent uncertainties" (challenge 6) maps to calibrated uncertainty reporting: [[Q - Four Meanings of Calibration]].
- The principle that unmeasured is not low risk parallels the [[Ioannidis 2005 - Why Most Published Findings Are False - Overview|Ioannidis]] point that a missing test is not evidence of a true finding.

## See Also

- [[NIST AI RMF 1.0 - Overview]]: framework map and source map
- [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]: §3, where risk is linked to trustworthiness
- [[NIST AI RMF - MANAGE Function]]: residual risk, response options
- [[SR 11-7 - Model Risk Management Guidance - Overview]]: model risk as defined in banking supervision
