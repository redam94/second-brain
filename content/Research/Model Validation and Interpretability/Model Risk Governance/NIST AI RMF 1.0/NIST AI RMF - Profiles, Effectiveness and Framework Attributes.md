---
title: "NIST AI RMF - Profiles, Effectiveness and Framework Attributes"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 2 §6 AI RMF Profiles pp. 33-34 (PDF pp. 38-39); Part 1 §4 Effectiveness of the AI RMF p. 19 (PDF p. 24); Appendix D Attributes of the AI RMF p. 42 (PDF p. 47); front-matter 'Update Schedule and Versions' (unnumbered page before the Table of Contents)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - Core Structure and the GOVERN Function]]"
used_by:
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
aliases:
  - AI RMF Profiles
  - AI RMF Current and Target Profiles
  - AI RMF Use-Case Profile
  - AI RMF Appendix D Attributes
  - Effectiveness of the AI RMF
---

# NIST AI RMF - Profiles, Effectiveness and Framework Attributes

> [!summary]
> This note covers how the AI RMF is meant to be tailored, judged and maintained. **Profiles** (§6) are of three kinds. *Use-case profiles* apply the Core to one setting (NIST's examples are hiring and fair housing). *Temporal profiles* compare a **Current Profile** with a **Target Profile** to find gaps and plan actions. *Cross-sectoral profiles* cover shared technologies such as large language models, cloud services or acquisition. NIST does not prescribe templates. **Effectiveness** (§4) is not yet measured. NIST plans future work on metrics, and users are encouraged to evaluate for themselves whether the framework has helped. The section lists nine expected benefits, including "explicit processes for making go/no-go system commissioning and deployment decisions" and "augmented capacity for TEVV." **Appendix D** lists ten design attributes: risk-based, consensus-driven, plain language, common vocabulary, compatible with other risk management, universally applicable, outcome-focused and non-prescriptive, aware of existing standards, law-agnostic, and a living document. The front matter commits to a formal community review "no later than 2028."
^summary

## Overview

These sections say what kind of object the AI RMF is. It is a *catalogue of outcomes* that an organization selects from (profiles). It is not a certification standard. Its value is asserted but not yet demonstrated (§4). It is designed to be revised. For a validation function, the profile mechanism is the practical bridge between the 72 abstract subcategories and a concrete validation standard for one type of model.

## Main Content

### §6 Profiles (pp. 33-34)

> [!definition] Definition: AI RMF Profiles (AI RMF §6, pp. 33-34)
> - **Use-case profile**: "implementations of the AI RMF functions, categories, and subcategories for a specific setting or application based on the requirements, risk tolerance, and resources of the Framework user: for example, an AI RMF hiring profile or an AI RMF fair housing profile" (p. 33). Profiles "may illustrate and offer insights into how risk can be managed at various stages of the AI lifecycle or in specific sector, technology, or end-use applications."
> - **Temporal profiles**: "descriptions of either the current state or the desired, target state of specific AI risk management activities within a given sector, industry, organization, or application context."
>   - **Current Profile**: "indicates how AI is currently being managed and the related risks in terms of current outcomes."
>   - **Target Profile**: "indicates the outcomes needed to achieve the desired or target AI risk management goals."
> - **Cross-sectoral profile**: covers "risks of models or applications that can be used across use cases or sectors," and how to govern, map, measure and manage "activities or business processes common across sectors such as the use of large language models, cloud-based services or acquisition" (p. 34).
> - "This Framework does not prescribe profile templates, allowing for flexibility in implementation" (p. 34).
^def-profiles

> [!algorithm] Gap Analysis with Temporal Profiles (AI RMF §6, p. 33; structured paraphrase)
> 1. Write the **Current Profile**: for each selected subcategory, record the current outcome.
> 2. Write the **Target Profile**: the outcomes needed to meet risk management goals.
> 3. Compare. "Comparing Current and Target Profiles likely reveals gaps to be addressed to meet AI risk management objectives."
> 4. Build action plans "to address these gaps to fulfill outcomes in a given category or subcategory."
> 5. Prioritize. "Prioritization of gap mitigation is driven by the user's needs and risk management processes."
> 6. Benchmark and budget. The approach "enables Framework users to compare their approaches with other approaches and to gauge the resources needed (e.g., staffing, funding) to achieve AI risk management goals in a cost-effective, prioritized manner."
^alg-profile-gap

### §4 Effectiveness of the AI RMF (p. 19)

- "Evaluations of AI RMF effectiveness – including ways to measure bottom-line improvements in the trustworthiness of AI systems – will be part of future NIST activities, in conjunction with the AI community."
- Organizations "are encouraged to periodically evaluate whether the AI RMF has improved their ability to manage AI risks, including but not limited to their policies, processes, practices, implementation plans, indicators, measurements, and expected outcomes."
- NIST "intends to work collaboratively with others to develop metrics, methodologies, and goals for evaluating the AI RMF's effectiveness."

> [!theorem] Expected Benefits to Framework Users (AI RMF §4, p. 19)
> Users "are expected to benefit from":
> 1. "enhanced processes for governing, mapping, measuring, and managing AI risk, and clearly documenting outcomes;"
> 2. "improved awareness of the relationships and tradeoffs among trustworthiness characteristics, socio-technical approaches, and AI risks;"
> 3. "explicit processes for making go/no-go system commissioning and deployment decisions;"
> 4. "established policies, processes, practices, and procedures for improving organizational accountability efforts related to AI system risks;"
> 5. "enhanced organizational culture which prioritizes the identification and management of AI system risks and potential impacts to individuals, communities, organizations, and society;"
> 6. "better information sharing within and across organizations about risks, decision-making processes, responsibilities, common pitfalls, TEVV practices, and approaches for continuous improvement;"
> 7. "greater contextual knowledge for increased awareness of downstream risks;"
> 8. "strengthened engagement with interested parties and relevant AI actors; and"
> 9. "augmented capacity for TEVV of AI systems and associated risks."
>
> **Status:** These are *expected* benefits. The document gives no evidence that they occur. This is a fair point for critics, and it is consistent with the framework's own MEASURE 2.13 standard of evaluating whether processes work.
^thm-expected-benefits

### Appendix D: Attributes of the AI RMF (p. 42)

NIST set out these attributes at the start of the work, and they "have remained intact." The AI RMF strives to:

| # | Attribute (p. 42) |
|---|---|
| 1 | "Be risk-based, resource-efficient, pro-innovation, and voluntary." |
| 2 | "Be consensus-driven and developed and regularly updated through an open, transparent process." All stakeholders should be able to contribute. |
| 3 | "Use clear and plain language that is understandable by a broad audience," including senior executives, government officials, NGO leadership and non-AI professionals, "while still of sufficient technical depth to be useful to practitioners." It should support communication of AI risk within and between organizations, to customers, and to the public. |
| 4 | "Provide common language and understanding to manage AI risks," offering "taxonomy, terminology, definitions, metrics, and characterizations for AI risk." |
| 5 | "Be easily usable and fit well with other aspects of risk management." It should be intuitive and adaptable as part of broader risk strategy, and "consistent or aligned with other approaches to managing AI risks." |
| 6 | "Be useful to a wide range of perspectives, sectors, and technology domains," and "universally applicable to any AI technology and to context-specific use cases." |
| 7 | "Be outcome-focused and non-prescriptive," providing "a catalog of outcomes and approaches rather than prescribe one-size-fits-all requirements." |
| 8 | "Take advantage of and foster greater awareness of existing standards, guidelines, best practices, methodologies, and tools for managing AI risks – as well as illustrate the need for additional, improved resources." |
| 9 | "Be law- and regulation-agnostic," supporting operation under applicable domestic and international regimes. |
| 10 | "Be a living document," readily updated as technology, understanding and approaches change and "as stakeholders learn from implementing AI risk management." |

^appD-attributes

### Versioning and update schedule (front matter, unnumbered page before the Table of Contents)

- The AI RMF "is intended to be a living document." NIST will review it regularly, and "a review with formal input from the AI community is expected to take place no later than 2028."
- **Two-number versioning**: the first number is the generation (e.g. 1.0) and "will change only with major revisions." Minor revisions use ".n" (e.g. 1.1). All changes are tracked in a Version Control Table "which identifies the history, including version number, date of change, and description of change."
- "NIST plans to update the AI RMF Playbook frequently." Comments on the Playbook "may be sent via email to AIframework@nist.gov at any time and will be reviewed and integrated on a semi-annual basis."

## Examples

> [!example] Example: A use-case profile for marketing response models (generic illustration)
> **Setup:** An organization wants a "media response model" profile.
>
> **Select subcategories** (a subset of the 72): GOVERN 1.3, 1.5, 1.6, 2.1; MAP 1.1, 2.2, 2.3, 3.3, 5.1; MEASURE 1.1, 1.3, 2.1, 2.3, 2.4, 2.5, 2.9, 2.13; MANAGE 1.1, 1.3, 2.1, 2.4, 4.1. Privacy (MEASURE 2.10) is included only if user-level data is used. Fairness (2.11) is usually low relevance for aggregate national models.
>
> **Current vs target (excerpt):**
>
> | Subcategory | Current | Target | Gap action |
> |---|---|---|---|
> | GOVERN 1.6 | Models listed in a slide deck | Versioned inventory with owners | Build inventory table |
> | MEASURE 1.3 | Builders self-validate | Reviewer separate from builder | Assign rotating reviewer |
> | MEASURE 2.5 | In-sample fit reported | Out-of-time + simulation recovery | Add backtest and known-truth simulation |
> | MEASURE 2.13 | Not done | Validation checks evaluated for power | Simulation study of checks |
> | MANAGE 2.1 | Model only | Experiments considered as alternative | Annual experiment plan |
>
> **Lesson:** The profile turns the voluntary catalogue into a concrete internal validation standard for one model type.
^ex-a-use-case-profile

## Connections

- **Profiles vs SR 11-7**: SR 11-7 is supervisory guidance with an expectation of compliance in banking. The AI RMF is voluntary, and profiles are where an organization decides what applies ([[SR 11-7 - Model Risk Management Guidance - Overview]]).
- **Unproven effectiveness** (§4) parallels the methodological point that a procedure should be validated before it is trusted: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- **Living document**: like a reproducible workflow, it is revised as evidence accumulates; [[Bayesian Workflow - Overview]].

## See Also

- [[NIST AI RMF - Core Structure and the GOVERN Function]]
- [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]
- [[NIST AI RMF 1.0 - Overview]]
