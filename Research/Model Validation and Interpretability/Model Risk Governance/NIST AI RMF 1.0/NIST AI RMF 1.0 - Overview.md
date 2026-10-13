---
title: "NIST AI RMF 1.0 - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/overview
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1, Artificial Intelligence Risk Management Framework (AI RMF 1.0), January 2023, doi:10.6028/NIST.AI.100-1 (48 PDF pages). Front matter; Executive Summary pp. 1-3; Part 1 §§1-4 pp. 4-19; Part 2 §§5-6 pp. 20-34 (Tables 1-4); Appendices A-D pp. 35-42. Page numbers are printed page footers (PDF page = printed page + 5)."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Model Risk Management Guidance - Overview]]"
used_by:
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
aliases:
  - NIST AI Risk Management Framework
  - NIST AI RMF
  - AI RMF 1.0
  - NIST AI 100-1
  - AI Risk Management Framework
  - AI System (NIST definition)
---

# NIST AI RMF 1.0 - Overview

> [!summary]
> The NIST **AI Risk Management Framework** (AI RMF 1.0, NIST AI 100-1, January 2023) is a voluntary, sector-agnostic, outcome-based framework for managing risks from AI systems. "AI system" is defined broadly enough to include any statistical model that produces predictions or recommendations. **Part 1** frames risk as probability × magnitude of consequences. It lists the challenges of measuring AI risk and states that "the inability to appropriately measure AI risks does not imply that an AI system necessarily poses either a high or low risk". It defines the audience across a lifecycle in which those who **build** models are separated from those who **verify and validate** them. It also sets out seven **characteristics of trustworthy AI**, with *valid and reliable* as the necessary base. **Part 2**, the **Core**, has four functions: **GOVERN** (cross-cutting culture, policy, inventory), **MAP** (context, ending in a go/no-go decision), **MEASURE** (TEVV, with independent assessors, documented test sets, and evaluation of the metrics themselves), and **MANAGE** (prioritize, treat, monitor, decommission). Together they have 19 categories and 72 subcategories, which are outcomes, not a checklist. **Profiles** tailor the Core to a setting. **Appendices** cover actor tasks, how AI risks differ from software risks, human-AI interaction, and the framework's design attributes.
^summary

## Overview

> [!quote] Opening framing (Executive Summary, p. 1)
> AI technologies "have significant potential to transform society and people's lives – from commerce and health to transportation and cybersecurity to the environment and our planet." They "can drive inclusive economic growth and support scientific advancements that improve the conditions of our world," but "also pose risks that can negatively impact individuals, groups, organizations, communities, society, the environment, and the planet." The framework then gives four axes along which AI risks can be described: "Like risks for other types of technology, AI risks can emerge in a variety of ways and can be characterized as long- or short-term, high- or low-probability, systemic or localized, and high- or low-impact."
^exec-framing

**Purpose of risk management** (Executive Summary, p. 1). "AI risk management is a key component of responsible development and use of AI systems. Responsible AI practices can help align the decisions about AI system design, development, and uses with intended aim and values." Risk management "can drive responsible uses and practices by prompting organizations and their internal teams who design, develop, and deploy AI to think more critically about context and potential or unexpected negative and positive impacts. Understanding and managing the risks of AI systems will help to enhance trustworthiness, and in turn, cultivate public trust."


- **Mandate and process.** It was directed by the National Artificial Intelligence Initiative Act of 2020 (P.L. 116-283) (p. 2). It is also consistent with NIST's broader AI work under the National Security Commission on Artificial Intelligence recommendations and the Plan for Federal Engagement in Developing Technical Standards and Related Tools (p. 3). It was developed through a Request for Information, three workshops, public comments on a concept paper and two drafts, and many smaller meetings (Executive Summary, pp. 2-3).
- **Character.** "intended to be voluntary, rights-preserving, non-sector-specific, and use-case agnostic" (p. 2). "The AI RMF is intended to be practical, to adapt to the AI landscape as AI technologies continue to develop, and to be operationalized by organizations in varying degrees and capacities so society can benefit from AI while also being protected from its potential harms" (p. 2). It is outcome-based and non-prescriptive (Appendix D).
- **Companions.** The online **AI RMF Playbook** gives suggested tactical actions for each subcategory (p. 21). A **Roadmap** collects priority research (p. 3).
- **Function scope.** "While GOVERN applies to all stages of organizations' AI risk management processes and procedures, the MAP, MEASURE, and MANAGE functions can be applied in AI system-specific contexts and at specific stages of the AI lifecycle" (p. 3).
- **Maintenance.** NIST "will continue to align the AI RMF and related guidance with applicable international standards, guidelines, and practices" (p. 2). It is a living document with two-number versioning. A formal community review is due "no later than 2028" (front matter).
- **Doc type.** This is a reference/standards document, not a research paper. It has no theorems or empirical results. Its formal content is definitions (mostly adapted from ISO), principles, and the four outcome tables.

> [!definition] Definition: AI System (AI RMF, Executive Summary, p. 1)
> "an engineered or machine-based system that can, for a given set of objectives, generate outputs such as predictions, recommendations, or decisions influencing real or virtual environments. AI systems are designed to operate with varying levels of autonomy" (adapted from OECD Recommendation on AI:2019; ISO/IEC 22989:2022).
>
> Under this definition, a gradient-boosted driver model, a media-mix model, a demand forecaster or a recommender all count. The framework is not limited to deep learning or generative AI.
^def-ai-system

> [!definition] Definition: Responsible AI Vocabulary (AI RMF, Executive Summary, pp. 1-2)
> "Core concepts in responsible AI emphasize human centricity, social responsibility, and sustainability" (p. 1). From the boxed text on p. 2:
> - **Social responsibility**: the organization's responsibility "for the impacts of its decisions and activities on society and the environment through transparent and ethical behavior" (ISO 26000:2010).
> - **Sustainability**: the "state of the global system, including environmental, social, and economic aspects, in which the needs of the present are met without compromising the ability of future generations to meet their own needs" (ISO/IEC TR 24368:2022).
> - "Responsible AI is meant to result in technology that is also equitable and accountable" (p. 2).
> - **Professional responsibility**: an approach that "aims to ensure that professionals who design, develop, or deploy AI systems and applications or AI-based products or systems, recognize their unique position to exert influence on people, society, and the future of AI" (ISO/IEC TR 24368:2022).
> - **AI actors**: "those who play an active role in the AI system lifecycle, including organizations and individuals that deploy or operate AI" (OECD 2019; p. 2).
^def-responsible-ai

**Why AI needs its own framework** (Executive Summary, p. 1). AI systems "may be trained on data that can change over time, sometimes significantly and unexpectedly." Their contexts are "frequently complex, making it difficult to detect and respond to failures." They are "inherently socio-technical in nature, meaning they are influenced by societal dynamics and human behavior." "AI risks – and benefits – can emerge from the interplay of technical aspects combined with societal factors related to how a system is used, its interactions with other AI systems, who operates it, and the social context in which it is deployed." "Without proper controls, AI systems can amplify, perpetuate, or exacerbate inequitable or undesirable outcomes"; "with proper controls, AI systems can mitigate and manage inequitable outcomes." Appendix B gives the full list: [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]].

## Main Content

### Key findings / takeaways for model validation

1. **Validity is the foundation.** Fig. 4 makes *valid and reliable* "a necessary condition of trustworthiness." Validation is defined relative to "a specific intended use" (§3.1). → [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]
2. **Unmeasured ≠ safe.** An inability to measure a risk says nothing about its size (§1.2.1). Unmeasurable risks must be *documented* (MEASURE 1.1). → [[NIST AI RMF - Framing AI Risk and Measurement Challenges]], [[NIST AI RMF - MEASURE Function]]
3. **Separation of builders and validators**, at two levels: builders vs verifiers/validators (Fig. 3), and testers vs validators (App. A). → [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]
4. **Explanations are not interpretations.** Transparency answers *what happened*, explainability *how*, interpretability *why* (§3.5). → [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]
5. **Construct validation** is named as a TEVV consideration (MAP 2.3). → [[NIST AI RMF - MAP Function]]
6. **Validate the validation.** "Effectiveness of the employed TEVV metrics and processes ... are evaluated" (MEASURE 2.13). → [[NIST AI RMF - MEASURE Function]]
7. **Decisions have exits.** Go/no-go after MAP and after MEASURE (MANAGE 1.1), consideration of non-AI alternatives (MANAGE 2.1), and mechanisms to "supersede, disengage, or deactivate" (MANAGE 2.4). → [[NIST AI RMF - MANAGE Function]]
8. **Trustworthiness is weakest-link.** Tradeoffs among characteristics are settled by transparent human judgment, not by analysis (§3). → [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]

### Source Map

Every section, figure, table and appendix of the source, with the note that captures it. Pages are printed page numbers.

| Source location | Content | Note |
|---|---|---|
| Front matter (unnumbered) | Update schedule, versioning, review by 2028; Version Control Table fields; Playbook comment channel | [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] |
| Executive Summary pp. 1-3 | Benefits/risks framing (incl. inclusive growth) and four risk axes; purpose of risk management (align with aim and values, public trust); practical, operationalized in varying degrees; AI system definition; why AI risk is unique (socio-technical interplay); responsible AI box; mandates (NAII Act, NSCAI, federal standards plan); alignment with international standards; two-part structure; function scope (GOVERN everywhere, others system/stage-specific); Playbook; development process | this note |
| §1 Framing Risk p. 4 | Purpose of AI risk management | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| §1.1 p. 4 | Risk, impact, harm definitions; risk management (ISO 31000); over-trust in AI | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| Fig. 1 p. 5 | Harms to people / organization / ecosystem | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| §1.2.1 pp. 5-6 | Seven risk measurement challenges | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| §1.2.2 p. 7 | Risk tolerance (not prescribed; sector definitions of harm; document once defined) | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| §1.2.3 pp. 7-8 | Risk prioritization; risk management culture; cessation and low-risk clauses; residual risk | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| §1.2.4 pp. 8-9 | Integration with enterprise risk management; role-dependent awareness; use with related frameworks | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] |
| §2 Audience pp. 9-10 | OECD dimensions and NIST's modification; TEVV; primary and People & Planet audiences | [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] |
| Fig. 2 p. 10 | Lifecycle and key dimensions | [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] |
| Fig. 3 p. 11 | AI actors across lifecycle stages; separation principle | [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] |
| §3 intro pp. 12-13 | Seven characteristics; weakest link; tradeoffs; contextual awareness; boxed text | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] |
| Fig. 4 p. 12 | Characteristics diagram | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] |
| §3.1 pp. 13-14 | Valid and reliable: validation, reliability, accuracy, robustness | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] |
| §3.2 pp. 14-15 | Safe | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] |
| §3.3 p. 15 | Secure and resilient | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] |
| §3.4 pp. 15-16 | Accountable and transparent | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] |
| §3.5 pp. 16-17 | Explainable and interpretable; what/how/why | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] |
| §3.6 p. 17 | Privacy-enhanced | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] |
| §3.7 pp. 17-18 | Fair with harmful bias managed; three bias categories | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] |
| §4 p. 19 | Effectiveness of the AI RMF; nine expected benefits | [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] |
| §5 pp. 20-21 | Core structure; Fig. 5; usage guidance; Playbook | [[NIST AI RMF - Core Structure and the GOVERN Function]] |
| §5.1 + Table 1 pp. 21-24 | GOVERN (6 categories, 19 subcategories) | [[NIST AI RMF - Core Structure and the GOVERN Function]] |
| §5.2 + Table 2 pp. 24-28 | MAP (5 categories, 18 subcategories); go/no-go | [[NIST AI RMF - MAP Function]] |
| §5.3 + Table 3 pp. 28-31 | MEASURE (4 categories, 22 subcategories) | [[NIST AI RMF - MEASURE Function]] |
| §5.4 + Table 4 pp. 31-33 | MANAGE (4 categories, 13 subcategories) | [[NIST AI RMF - MANAGE Function]] |
| §6 pp. 33-34 | Use-case, temporal (current/target), cross-sectoral profiles | [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] |
| Appendix A pp. 35-37 | AI actor task descriptions; TEVV tasks by phase | [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] |
| Appendix B pp. 38-39 | 14 AI-specific risks; relation to privacy/cybersecurity frameworks; 5 gaps in existing frameworks | [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] |
| Appendix C pp. 40-41 | Human-AI interaction: 4 issues; override data | [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] |
| Appendix D p. 42 | Ten attributes of the AI RMF | [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] |
| (synthesis) | Worked Core pass, SR 11-7 crosswalk, validation checklist | [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]] |

### Structure at a glance

| Function | Role | Categories | Subcategories | Most validation-relevant |
|---|---|---|---|---|
| GOVERN | Culture, policy, accountability (cross-cutting) | 6 | 19 | 1.3 tiering, 1.5 review frequency, 1.6 inventory, 1.7 decommissioning, 2.3 executive ownership |
| MAP | Context; go/no-go | 5 | 18 | 1.1 intended use, 2.2 knowledge limits, 2.3 construct validation, 3.3 scope |
| MEASURE | TEVV, tracking, measurement feedback | 4 | 22 | 1.1 unmeasurable risks, 1.3 independence, 2.1 test docs, 2.3/2.5 validity, 2.9 explanation, 2.13 meta-evaluation |
| MANAGE | Prioritize, respond, monitor | 4 | 13 | 1.1 proceed?, 1.3 responses, 1.4 residual risk, 2.1 non-AI alternatives, 2.4 deactivate |

### Reading order

1. This overview → 2. [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] → 3. [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] → 4. [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] → 5. [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] → 6. [[NIST AI RMF - Core Structure and the GOVERN Function]] → 7. [[NIST AI RMF - MAP Function]] → 8. [[NIST AI RMF - MEASURE Function]] → 9. [[NIST AI RMF - MANAGE Function]] → 10. [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] → 11. [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] → 12. [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]].

## Examples

> [!example] Example: Routing a validation question through the framework (generic illustration)
> **Setup:** A team is about to deploy a weekly media-response model that recommends budget shifts.
>
> - **Is it in scope?** Yes. It "can, for a given set of objectives, generate outputs such as predictions, recommendations, or decisions" (AI system definition, p. 1).
> - **Before building:** MAP 1.1 and 3.3 require a documented intended purpose and a targeted application scope; MAP ends in a go/no-go decision ([[NIST AI RMF - MAP Function]]).
> - **Validation evidence:** MEASURE 2.1 (documented test sets and metrics), 2.5 (valid and reliable, with limits of generalizability documented), and 1.3 (independent assessors) ([[NIST AI RMF - MEASURE Function]]).
> - **What cannot be measured:** the true incremental effect of each channel is never observed, so it is documented as an unmeasured risk under MEASURE 1.1 rather than treated as low risk (§1.2.1).
> - **After deployment:** MANAGE 4.1 monitoring, with the option to "supersede, disengage, or deactivate" under MANAGE 2.4 ([[NIST AI RMF - MANAGE Function]]).
^ex-routing-a-validation-question

## Connections

- **Lineage and complement:** [[SR 11-7 - Model Risk Management Guidance - Overview]]. SR 11-7's independent validation, inventory, documentation and ongoing monitoring all reappear in the AI RMF. The AI RMF adds socio-technical harms, fairness, privacy, explainability, explicit treatment of what *cannot* be measured, and evaluation of the validation process itself.
- **Validity and generalization:** [[Cross Validation Checking]], [[Model Selection and Overfitting]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].
- **Known-truth TEVV:** [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]], [[Simulation-Based Calibration - Overview]], [[Designing Simulated-Data Experiments]].
- **Explanations vs causes:** [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- **Metric gaming and construct validity:** [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- **Analytic flexibility as human-cognitive bias:** [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- **Uncertainty reporting:** [[Conformal Prediction - Overview]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]], [[Q - Four Meanings of Calibration]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]: bank model-risk guidance, the closest predecessor
- [[Bayesian Workflow - Overview]]: iterative model checking as a workflow
- [[Modeling as Software Development]]: testing practice for statistical code
- [[Pre-registration and Open Science - Overview]]: pre-specification as a governance control
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: accuracy vs interpretability debate
