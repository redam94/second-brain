---
title: "Index: Model Risk Governance"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
parent: "[[../_Index|Model Validation and Interpretability]]"
date_updated: 2026-10-13
concept_count: 22
---

# Model Risk Governance

> [!abstract] Routing Summary
> This topic covers the organizational side of model validation: what counts as a model, where model risk comes from, who may build, test, validate and approve a model, which evidence a model needs before and after deployment, and how inventory, documentation, monitoring and decommissioning keep that evidence current. It has 2 sub-topics, one per source document, with 22 notes in total. SR 11-7 (bank supervisory guidance, 2011) has 10 notes and the NIST AI RMF 1.0 (voluntary AI framework, 2023) has 12. Each source is captured section by section, and each Overview contains a full Source Map from source section to note.
> - Need the bank-regulatory model risk standard (model definition, effective challenge, three validation elements, inventory)? → [[SR 11-7 - Model Risk Management Guidance/_Index|SR 11-7 - Model Risk Management Guidance]]
> - Need AI-specific risk management (trustworthiness characteristics, GOVERN/MAP/MEASURE/MANAGE, fairness, explainability)? → [[NIST AI RMF 1.0/_Index|NIST AI RMF 1.0]]
> - Need SR 11-7 on one page? → [[SR 11-7 - Model Risk Management Guidance - Overview]]
> - Need the AI RMF on one page? → [[NIST AI RMF 1.0 - Overview]]
> - Need what counts as a model and what "effective challenge" means? → [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]
> - Need independence of validators and the rule that validation can block use? → [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] and [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]
> - Need conceptual soundness, sensitivity analysis, stress testing, or construct validation? → [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] and [[NIST AI RMF - MAP Function]]
> - Need back-testing, outcomes analysis, or documented test design? → [[SR 11-7 - Outcomes Analysis and Back-Testing]] and [[NIST AI RMF - MEASURE Function]]
> - Need monitoring, override tracking, benchmarking, or decommissioning? → [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] and [[NIST AI RMF - MANAGE Function]]
> - Need inventory fields, documentation, or validation-report contents? → [[SR 11-7 - Model Inventory and Documentation Standards]] and [[NIST AI RMF - Core Structure and the GOVERN Function]]
> - Need vendor or third-party model rules? → [[SR 11-7 - Validation of Vendor and Third-Party Models]]
> - Need fairness, privacy, or explainability vs interpretability? → [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]
> - Need what to do when a risk cannot be measured? → [[NIST AI RMF - Framing AI Risk and Measurement Challenges]]
> - Need a crosswalk between the two frameworks? → [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]
> - Need either framework applied to MMM, attribution or driver models? → [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] and [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]

## Sub-topics

- [[SR 11-7 - Model Risk Management Guidance/_Index|SR 11-7 - Model Risk Management Guidance]] — COVERS: the Federal Reserve / OCC Supervisory Guidance on Model Risk Management (SR Letter 11-7, April 4, 2011, 21 pp.), every section and footnote. Topics: the two costs of models; proportionality; the three-component model definition; model quality (accuracy vs discriminatory power); model risk from fundamental error or misuse; aggregate model risk; effective challenge (incentives, competence, influence); development, data/proxy and testing standards; user-challenge asymmetry; conservatism that must be demonstrated; validation independence and the pre-use gate; annual review and error thresholds; the three core elements (conceptual soundness with sensitivity analysis and stress testing; ongoing monitoring with process verification, overrides and benchmarking; outcomes analysis with back-testing, the VaR example, parallel analysis and early warning); vendor-model validation; board, policies, roles, internal audit and external resources; model inventory fields, documentation and validation reports; a generic application to marketing analytics. 10 notes.
- [[NIST AI RMF 1.0/_Index|NIST AI RMF 1.0]] — COVERS: NIST AI 100-1, *Artificial Intelligence Risk Management Framework* (January 2023), from the front matter through Appendix D. Topics: the AI-system definition; risk, risk tolerance and residual risk; the Fig. 1 harm taxonomy; seven measurement challenges ("unmeasured is not low risk"); lifecycle and actors with TEVV and builder/validator separation; the seven trustworthiness characteristics, the weakest-link principle and tradeoffs; validity, reliability, accuracy and robustness; safety, security and resilience; transparency, explainability and interpretability (what/how/why); privacy; fairness and three bias categories; the Core with all 72 subcategories of GOVERN, MAP (go/no-go, construct validation), MEASURE (independent assessors, meta-evaluation of TEVV) and MANAGE (risk responses, deactivation); profiles; effectiveness; how AI risks differ from software risks; human-AI interaction and override data; framework attributes; an SR 11-7 crosswalk and validation checklist for marketing models. 12 notes.

## Concept Map

| Concept | SR 11-7 note | NIST AI RMF note | Relationship |
|---|---|---|---|
| Scope: what is governed | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] (model = input, processing, reporting) | [[NIST AI RMF 1.0 - Overview]] (AI system = outputs predictions, recommendations, decisions) | Both broad enough to include any statistical marketing model |
| Definition of risk | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] (fundamental error + misuse; aggregate risk) | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] (probability × magnitude; harms to people, organizations, ecosystems) | SR 11-7 is model-centred; NIST is impact-centred and socio-technical |
| Proportionality / prioritization | [[SR 11-7 - Model Risk Management Guidance - Overview]] (rigor scales with materiality) | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] (§1.2.3 prioritization); [[NIST AI RMF - Core Structure and the GOVERN Function]] (GOVERN 1.3 tiering) | Agree |
| Independent challenge | [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] (independence; incentives, competence, influence) | [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] (builders ≠ validators; testers ≠ validators); [[NIST AI RMF - MEASURE Function]] (MEASURE 1.3) | Agree; NIST adds a second separation layer |
| Pre-use decision | [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] (validation gate: no use, restrict, or reject) | [[NIST AI RMF - MAP Function]] (go/no-go); [[NIST AI RMF - MANAGE Function]] (MANAGE 1.1) | Agree |
| Fitness for intended use | [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] (validation per ISO 9000); [[NIST AI RMF - MAP Function]] (MAP 2.3 construct validation) | Agree; NIST names construct validation explicitly |
| Sensitivity, robustness, stress | [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] (robustness, reliability) | Agree |
| Out-of-sample evidence | [[SR 11-7 - Outcomes Analysis and Back-Testing]] (holdout is not a substitute for back-testing) | [[NIST AI RMF - MEASURE Function]] (MEASURE 2.3, 2.5: deployment-like conditions; generalization limits) | Agree |
| Ongoing monitoring | [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] | [[NIST AI RMF - MANAGE Function]] (MANAGE 4.1); [[NIST AI RMF - MEASURE Function]] (MEASURE 3) | Agree |
| Overrides | [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] (override analysis) | [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] (App. C override data) | Agree |
| Inventory and documentation | [[SR 11-7 - Model Inventory and Documentation Standards]] | [[NIST AI RMF - Core Structure and the GOVERN Function]] (GOVERN 1.6 inventory, 1.7 decommissioning) | Agree; NIST adds decommissioning |
| Vendor and third-party models | [[SR 11-7 - Validation of Vendor and Third-Party Models]] | [[NIST AI RMF - Core Structure and the GOVERN Function]] (GOVERN 6); [[NIST AI RMF - MANAGE Function]] (MANAGE 3) | Agree |
| Governance roles | [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] | [[NIST AI RMF - Core Structure and the GOVERN Function]] | Agree; NIST adds workforce diversity and culture |
| Model uncertainty and conservatism | [[SR 11-7 - Model Development, Implementation and Use]] (ranges; conservatism must be demonstrated) | [[NIST AI RMF - MANAGE Function]] (residual risk communicated) | Complementary |
| Unmeasurable risks | — (implicit only) | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]]; [[NIST AI RMF - MEASURE Function]] (MEASURE 1.1) | NIST only |
| Evaluating the validation process | Internal audit evaluates validators ([[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]]) | [[NIST AI RMF - MEASURE Function]] (MEASURE 2.13 meta-evaluation) | NIST makes it a measurement task |
| Explainability, privacy, fairness | — | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] | NIST only |
| Profiles / tailoring | — | [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] | NIST only |
| Application to marketing analytics | [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] | [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]] | Both vault syntheses; incremental effect is never observed |

## Cross-Cutting Concepts

Where the two sources agree:
- **Independent challenge is the central control.** SR 11-7 requires challengers with the incentives, competence and influence to force change, and validators with no stake in the verdict ([[SR 11-7 - Model Definition, Model Risk and Effective Challenge]], [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]). The AI RMF separates builders from verifiers and validators, and testers from validators, and calls for independent assessors in MEASURE 1.3 ([[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]], [[NIST AI RMF - MEASURE Function]]). The statistical reason is in [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]].
- **Validation is relative to an intended use.** SR 11-7 states quality per use (accuracy for forecasts, discriminatory power for rankings) and requires validation of a bank's own use of vendor models. The AI RMF defines validation as evidence that requirements for "a specific intended use" are met, and requires a scope statement (MAP 3.3). A model that predicts well is therefore not shown to be causally valid ([[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]).
- **Decisions have gates and exits.** SR 11-7 has a pre-use validation gate and re-development when outcomes stay outside thresholds. The AI RMF has a go/no-go after MAP and MEASURE, consideration of non-AI alternatives, and mechanisms to "supersede, disengage, or deactivate" ([[NIST AI RMF - MANAGE Function]]).
- **Rigor scales with materiality.** SR 11-7's proportionality principle corresponds to the AI RMF's risk prioritization and tiering (GOVERN 1.3).
- **Monitoring, overrides and inventory continue after deployment.** Both require ongoing monitoring, override analysis, a firm-wide inventory and documentation readable by people who did not build the model.

Where they differ:
- **Model-centred vs impact-centred.** SR 11-7 frames risk as financial loss from wrong or misused models. The AI RMF frames it as harm to people, organizations and ecosystems, and adds trustworthiness characteristics that SR 11-7 does not address: fairness, privacy, explainability, safety and security ([[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]], [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]).
- **What cannot be measured.** The AI RMF states that an unmeasured risk is neither high nor low and must be documented (MEASURE 1.1). SR 11-7 handles weak evidence by asking for more scrutiny when back-testing is limited and for informing senior management ([[SR 11-7 - Outcomes Analysis and Back-Testing]]).
- **Evaluating the validation itself.** The AI RMF makes the effectiveness of TEVV metrics a measured outcome (MEASURE 2.13). In SR 11-7 the equivalent is internal audit's review of the validation function.
- **Binding force and specificity.** SR 11-7 is supervisory guidance for banks and gives concrete standards (annual review, inventory fields, back-testing at the forecast horizon). The AI RMF is voluntary, sector-agnostic and outcome-based. Its 72 subcategories are outcomes, not a checklist, and it adapts to a setting through profiles ([[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]).
- **Lifecycle end.** The AI RMF covers decommissioning explicitly (GOVERN 1.7, MANAGE 2.4). SR 11-7 stops at redevelopment or rejection.

Shared hard case: for attribution and media-mix models, the target (incremental effect) is never observed. Both application notes therefore use known-truth simulation and experiment benchmarks in place of direct outcomes analysis ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]).

## Sources

- [[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]] — SR Letter 11-7 Attachment, Board of Governors of the Federal Reserve System and OCC, April 4, 2011, 21 pp. Captured in full in [[SR 11-7 - Model Risk Management Guidance/_Index|SR 11-7 - Model Risk Management Guidance]].
- [[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]] — NIST AI 100-1, January 2023 (doi:10.6028/NIST.AI.100-1). Captured in full in [[NIST AI RMF 1.0/_Index|NIST AI RMF 1.0]].

## See Also

- [[../_Index|Model Validation and Interpretability]] — parent topic
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — designing known-truth validation studies
- [[Forecast Evaluation and Backtesting]] — outcomes-analysis toolkit
- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] — out-of-time validation design
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — statistical case for independent validation
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — metric gaming and construct validity
- [[Dillon et al - SHAP and Causal Insights - Overview]] — explanation vs causal interpretation
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — why MMM validation is hard
- [[Pre-registration and Open Science - Overview]] — pre-specification as a governance control
