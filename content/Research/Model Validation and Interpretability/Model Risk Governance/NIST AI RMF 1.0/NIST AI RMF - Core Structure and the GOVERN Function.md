---
title: "NIST AI RMF - Core Structure and the GOVERN Function"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 2 §5 AI RMF Core pp. 20-21 (PDF pp. 25-26) incl. Fig. 5 (p. 20) and boxed usage guidance (p. 21); §5.1 Govern pp. 21-24 incl. Table 1 Categories and subcategories for the GOVERN function pp. 22-24 (PDF pp. 26-29)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - Framing AI Risk and Measurement Challenges]]"
  - "[[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]"
used_by:
  - "[[NIST AI RMF - MAP Function]]"
  - "[[NIST AI RMF - MEASURE Function]]"
  - "[[NIST AI RMF - MANAGE Function]]"
aliases:
  - GOVERN MAP MEASURE MANAGE
  - AI RMF Core
  - AI RMF GOVERN Function
  - AI RMF Table 1
  - AI RMF Playbook
---

# NIST AI RMF - Core Structure and the GOVERN Function

> [!summary]
> Part 2 of the AI RMF, the **Core**, organizes AI risk management into four functions: **GOVERN**, **MAP**, **MEASURE** and **MANAGE**. Each splits into categories and subcategories. **Fig. 5** puts GOVERN at the center as "a cross-cutting function to inform and be infused throughout the other three." Actions "do not constitute a checklist, nor are they necessarily an ordered set of steps." Most users would start with MAP once GOVERN is in place, and then work iteratively. **GOVERN** builds the risk culture, policies, accountability, workforce diversity, stakeholder engagement and third-party controls. It has 6 categories and 19 subcategories (Table 1), including **GOVERN 1.6** (AI system *inventory*), **GOVERN 1.5** (ongoing monitoring with a defined *review frequency*), **GOVERN 1.7** (safe *decommissioning*), and **GOVERN 2.3** (*executive leadership* takes responsibility). The whole Core has 19 categories and 72 subcategories.
^summary

## Overview

The Core is the operational part of the framework. Each subcategory is an *outcome* ("Mechanisms are in place to ...") rather than a procedure. The companion **AI RMF Playbook** supplies suggested tactical actions (p. 21). Like the Cybersecurity Framework that the Core resembles (Appendix B notes the shared "Core set of functions, categories, and subcategories" structure), it is meant to be selected from and tailored. The selection can be written down as a profile ([[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]).

## Main Content

### §5 Core structure (pp. 20-21)

> [!definition] Definition: AI RMF Core (AI RMF §5, p. 20)
> "The AI RMF Core provides outcomes and actions that enable dialogue, understanding, and activities to manage AI risks and responsibly develop trustworthy AI systems." It "is composed of four functions: GOVERN, MAP, MEASURE, and MANAGE. Each of these high-level functions is broken down into categories and subcategories. Categories and subcategories are subdivided into specific actions and outcomes. Actions do not constitute a checklist, nor are they necessarily an ordered set of steps."
^def-core

> [!example] Figure 5: The four functions (p. 20; transcribed from image)
> A circle with **Govern** at the center ("A culture of risk management is cultivated and present"). Around it are **Map** ("Context is recognized and risks related to context are identified"), **Measure** ("Identified risks are assessed, analyzed, or tracked") and **Manage** ("Risks are prioritized and acted upon based on a projected impact"). Caption: "Governance is designed to be a cross-cutting function to inform and be infused throughout the other three functions."
^fig5-core

> [!algorithm] How to use the Core (AI RMF §5, pp. 20-21, boxed text p. 21)
> 1. Risk management "should be continuous, timely, and performed throughout the AI system lifecycle dimensions," and carried out with "diverse and multidisciplinary perspectives, potentially including the views of AI actors outside the organization" (p. 20). The reason given (pp. 20-21): "Having a diverse team contributes to more open sharing of ideas and assumptions about purposes and functions of the technology being designed, developed, deployed, or evaluated – which can create opportunities to surface problems and identify existing and emergent risks." §2 (p. 10) makes the same point, that diverse teams make "these implicit aspects more explicit" ([[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]).
> 2. Select what fits: "Some organizations may choose to select from among the categories and subcategories; others may choose and have the capacity to apply all."
> 3. Put GOVERN in place first. "Assuming a governance structure is in place, functions may be performed in any order across the AI lifecycle."
> 4. "After instituting the outcomes in GOVERN, most users of the AI RMF would start with the MAP function and continue to MEASURE or MANAGE."
> 5. Iterate: "the process should be iterative, with cross-referencing between functions as necessary." Some subcategories "apply to multiple functions, or ... logically should take place before certain subcategory decisions."
> 6. Use the **AI RMF Playbook** (online, voluntary) for "suggested tactical actions." "Playbook users can create tailored guidance selected from suggested material for their own use and contribute their suggestions for sharing with the broader community." It is part of the NIST Trustworthy and Responsible AI Resource Center (p. 21).
^alg-core-usage

**Category and subcategory counts** (counted from Tables 1-4):

| Function | Categories | Subcategories | Note |
|---|---|---|---|
| GOVERN | 6 | 19 | this note |
| MAP | 5 | 18 | [[NIST AI RMF - MAP Function]] |
| MEASURE | 4 | 22 | [[NIST AI RMF - MEASURE Function]] |
| MANAGE | 4 | 13 | [[NIST AI RMF - MANAGE Function]] |
| **Total** | **19** | **72** | |

### §5.1 GOVERN (pp. 21-22)

> [!definition] Definition: GOVERN Function (AI RMF §5.1, p. 21)
> The GOVERN function:
> - "cultivates and implements a culture of risk management within organizations designing, developing, deploying, evaluating, or acquiring AI systems;"
> - "outlines processes, documents, and organizational schemes that anticipate, identify, and manage the risks a system can pose, including to users and others across society – and procedures to achieve those outcomes;"
> - "incorporates processes to assess potential impacts;"
> - "provides a structure by which AI risk management functions can align with organizational principles, policies, and strategic priorities;"
> - "connects technical aspects of AI system design and development to organizational values and principles, and enables organizational practices and competencies for the individuals involved in acquiring, training, deploying, and monitoring such systems; and"
> - "addresses full product lifecycle and associated processes, including legal and other issues concerning use of third-party software or hardware systems and data."
^def-govern

Narrative points (p. 22):

- GOVERN "is a cross-cutting function that is infused throughout AI risk management and enables the other functions." Aspects "especially those related to compliance or evaluation, should be integrated into each of the other functions." "Attention to governance is a continual and intrinsic requirement for effective AI risk management over an AI system's lifespan and the organization's hierarchy."
- "Strong governance can drive and enhance internal practices and norms to facilitate organizational risk culture."
- "Governing authorities can determine the overarching policies that direct an organization's mission, goals, values, culture, and risk tolerance. Senior leadership sets the tone ... Management aligns the technical aspects of AI risk management to policies and operations."
- "Documentation can enhance transparency, improve human review processes, and bolster accountability in AI system teams."
- "After putting in place the structures, systems, processes, and teams described in the GOVERN function, organizations should benefit from a purpose-driven culture focused on risk understanding and management."
- GOVERN has to be repeated "as knowledge, cultures, and needs or expectations from AI actors evolve over time."

### Table 1: GOVERN categories and subcategories (pp. 22-24)

Transcribed from Table 1 (line breaks joined).

**GOVERN 1: Policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks are in place, transparent, and implemented effectively.**

| ID | Subcategory |
|---|---|
| GOVERN 1.1 | Legal and regulatory requirements involving AI are understood, managed, and documented. |
| GOVERN 1.2 | The characteristics of trustworthy AI are integrated into organizational policies, processes, procedures, and practices. |
| GOVERN 1.3 | Processes, procedures, and practices are in place to determine the needed level of risk management activities based on the organization's risk tolerance. |
| GOVERN 1.4 | The risk management process and its outcomes are established through transparent policies, procedures, and other controls based on organizational risk priorities. |
| GOVERN 1.5 | Ongoing monitoring and periodic review of the risk management process and its outcomes are planned and organizational roles and responsibilities clearly defined, including determining the frequency of periodic review. |
| GOVERN 1.6 | Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities. |
| GOVERN 1.7 | Processes and procedures are in place for decommissioning and phasing out AI systems safely and in a manner that does not increase risks or decrease the organization's trustworthiness. |

**GOVERN 2: Accountability structures are in place so that the appropriate teams and individuals are empowered, responsible, and trained for mapping, measuring, and managing AI risks.**

| ID | Subcategory |
|---|---|
| GOVERN 2.1 | Roles and responsibilities and lines of communication related to mapping, measuring, and managing AI risks are documented and are clear to individuals and teams throughout the organization. |
| GOVERN 2.2 | The organization's personnel and partners receive AI risk management training to enable them to perform their duties and responsibilities consistent with related policies, procedures, and agreements. |
| GOVERN 2.3 | Executive leadership of the organization takes responsibility for decisions about risks associated with AI system development and deployment. |

**GOVERN 3: Workforce diversity, equity, inclusion, and accessibility processes are prioritized in the mapping, measuring, and managing of AI risks throughout the lifecycle.**

| ID | Subcategory |
|---|---|
| GOVERN 3.1 | Decision-making related to mapping, measuring, and managing AI risks throughout the lifecycle is informed by a diverse team (e.g., diversity of demographics, disciplines, experience, expertise, and backgrounds). |
| GOVERN 3.2 | Policies and procedures are in place to define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems. |

**GOVERN 4: Organizational teams are committed to a culture that considers and communicates AI risk.**

| ID | Subcategory |
|---|---|
| GOVERN 4.1 | Organizational policies and practices are in place to foster a critical thinking and safety-first mindset in the design, development, deployment, and uses of AI systems to minimize potential negative impacts. |
| GOVERN 4.2 | Organizational teams document the risks and potential impacts of the AI technology they design, develop, deploy, evaluate, and use, and they communicate about the impacts more broadly. |
| GOVERN 4.3 | Organizational practices are in place to enable AI testing, identification of incidents, and information sharing. |

**GOVERN 5: Processes are in place for robust engagement with relevant AI actors.**

| ID | Subcategory |
|---|---|
| GOVERN 5.1 | Organizational policies and practices are in place to collect, consider, prioritize, and integrate feedback from those external to the team that developed or deployed the AI system regarding the potential individual and societal impacts related to AI risks. |
| GOVERN 5.2 | Mechanisms are established to enable the team that developed or deployed AI systems to regularly incorporate adjudicated feedback from relevant AI actors into system design and implementation. |

**GOVERN 6: Policies and procedures are in place to address AI risks and benefits arising from third-party software and data and other supply chain issues.**

| ID | Subcategory |
|---|---|
| GOVERN 6.1 | Policies and procedures are in place that address AI risks associated with third-party entities, including risks of infringement of a third-party's intellectual property or other rights. |
| GOVERN 6.2 | Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk. |

^table1-govern

### GOVERN subcategories most relevant to model validation

| Subcategory | Validation-practice reading |
|---|---|
| 1.3 | Validation depth scales with risk tier, the AI analogue of model-risk tiering. |
| 1.5 | A *defined review frequency* for each model (e.g. annual revalidation, quarterly monitoring review). |
| 1.6 | A model inventory: owner, purpose, status, last validation date. |
| 1.7 | Retirement procedures, so stale models are not left running. |
| 2.1, 2.3 | Named owners. Senior leadership owns the risk decision, not just the analysts. |
| 3.2 | Who may override the model and who signs off on its outputs. |
| 4.1 | "Critical thinking and safety-first mindset": culture that rewards challenging a model. |
| 4.3 | Infrastructure for testing and incident logging. |
| 6.1-6.2 | Vendor-model and third-party-data controls. |

## Examples

> [!example] Example: A minimal GOVERN layer for an analytics team (generic illustration)
> **Setup:** A team maintains 20 production models: media-response models, demand forecasts and churn scores.
>
> **GOVERN outcomes and their artefacts:**
> 1. *GOVERN 1.6 inventory*: one table with model ID, owner, intended use, risk tier, data sources, last validation, next review date.
> 2. *GOVERN 1.3 tiering*: Tier 1 = drives budget reallocation of more than X; Tier 2 = forecasting only; Tier 3 = exploratory. Validation depth is set by tier.
> 3. *GOVERN 1.5 frequency*: Tier 1 is revalidated annually and reviewed in monitoring each quarter.
> 4. *GOVERN 2.1/2.3*: a documented RACI. A senior sponsor signs off on Tier 1 deployments.
> 5. *GOVERN 4.3*: an incident log, e.g. "forecast error exceeded the 95% interval three weeks in a row."
> 6. *GOVERN 1.7*: models with no consumers for two quarters are retired and archived with their documentation.
> 7. *GOVERN 6.1*: a vendor attribution tool is listed in the inventory, with its own validation evidence requested.
^ex-a-minimal-govern-layer

## Connections

- **SR 11-7 crosswalk**: GOVERN 1.6 inventory ↔ SR 11-7 model inventory; GOVERN 2.3 ↔ board and senior management oversight; GOVERN 1.5 ↔ periodic review; GOVERN 6 ↔ vendor model guidance. See [[SR 11-7 - Model Risk Management Guidance - Overview]].
- **Culture of critical thinking** (GOVERN 4.1) is the organizational counterpart of pre-specification and effective challenge: [[Pre-registration and Open Science - Overview]], [[Researcher Degrees of Freedom]].
- **Testing infrastructure** (GOVERN 4.3): [[Modeling as Software Development]].

## See Also

- [[NIST AI RMF - MAP Function]]: usually the next function applied
- [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]: tailoring the Core
- [[NIST AI RMF 1.0 - Overview]]
