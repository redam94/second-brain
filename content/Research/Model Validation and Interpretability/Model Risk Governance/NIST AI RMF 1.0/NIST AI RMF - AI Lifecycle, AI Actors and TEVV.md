---
title: "NIST AI RMF - AI Lifecycle, AI Actors and TEVV"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 1 §2 Audience pp. 9-11 (PDF pp. 14-16) incl. Fig. 2 (p. 10) and Fig. 3 (p. 11); Appendix A: Descriptions of AI Actor Tasks from Figures 2 and 3, pp. 35-37 (PDF pp. 40-42); Executive Summary definition of AI actors p. 2"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF 1.0 - Overview]]"
used_by:
  - "[[NIST AI RMF - MEASURE Function]]"
  - "[[NIST AI RMF - Core Structure and the GOVERN Function]]"
  - "[[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]]"
aliases:
  - Test, Evaluation, Verification, and Validation (TEVV)
  - TEVV
  - AI RMF AI Actors
  - AI Lifecycle and Key Dimensions (Fig. 2)
  - AI Actors Across Lifecycle Stages (Fig. 3)
  - AI RMF Appendix A
---

# NIST AI RMF - AI Lifecycle, AI Actors and TEVV

> [!summary]
> §2 of the AI RMF names its **audience**: the *AI actors* who design, develop, deploy, evaluate and use AI systems across a lifecycle adapted from the OECD. **Fig. 2** arranges the lifecycle as five dimensions: People & Planet at the center, then Application Context, Data & Input, AI Model, and Task & Output. Around them sit seven stages: Plan and Design, Collect and Process Data, Build and Use Model, Verify and Validate, Deploy and Use, Operate and Monitor, Use or Impacted by. **Fig. 3** gives the TEVV activity, tasks and representative actors for each stage. Its caption sets the **separation principle**: model builders and users are kept apart from model verifiers and validators. **Appendix A** describes 15 actor groups. It also says that, ideally, verification and validation are done by different people from test and evaluation, and it lists TEVV tasks for each phase. TEVV "allows for both mid-course remediation and post-hoc risk management" (p. 9).
^summary

## Overview

The AI RMF borrows its definition of *AI actors* from the OECD: "those who play an active role in the AI system lifecycle, including organizations and individuals that deploy or operate AI" (Executive Summary, p. 2). §2 explains that NIST changed the OECD classification framework (2022) to highlight test, evaluation, verification and validation (**TEVV**) throughout the lifecycle and to generalize the operational context. For validation practice, this is the most relevant structural part of the document. It turns the bank-regulatory idea of independent validation ([[SR 11-7 - Model Risk Management Guidance - Overview]]) into a lifecycle-wide role.

## Main Content

### §2 Audience (pp. 9-10)

- **Diversity.** Ideally, AI actors "will represent a diversity of experience, expertise, and backgrounds and comprise demographically and disciplinarily diverse teams" (p. 9). "The AI RMF is intended to be used by AI actors across the AI lifecycle and dimensions" (p. 9).
- **NIST's modification of the OECD framework.** The OECD classifies AI lifecycle activities by five socio-technical dimensions; Fig. 2 shows them "slightly modified by NIST." "The NIST modification highlights the importance of test, evaluation, verification, and validation (TEVV) processes throughout an AI lifecycle and generalizes the operational context of an AI system" (p. 9).
- **Primary audience.** These are the actors working in four dimensions of Fig. 2 (Application Context, Data and Input, AI Model, Task and Output) "who perform or manage the design, development, deployment, evaluation, and use of AI systems and drive AI risk management efforts" (p. 9).
- **TEVV actors.** "AI actors with TEVV-specific expertise are integrated throughout the AI lifecycle and are especially likely to benefit from the Framework." Done regularly, TEVV tasks "can provide insights relative to technical, societal, legal, and ethical standards or norms, and can assist with anticipating impacts and assessing and tracking emergent risks" (p. 9).
- **Secondary audience (People & Planet).** This dimension "represents human rights and the broader well-being of society and the planet." Its actors are trade associations, standards bodies, researchers, advocacy groups, environmental groups, civil society organizations, end users, and potentially impacted individuals and communities. They "comprise a separate AI RMF audience who informs the primary audience" (pp. 9-10). They can:
  1. help provide context and understand potential and actual impacts;
  2. act as a source of formal or quasi-formal norms and guidance;
  3. "designate boundaries for AI operation (technical, societal, legal, and ethical)";
  4. promote discussion of tradeoffs between civil liberties and rights, equity, the environment and the planet, and the economy (p. 10).
- **Collective responsibility.** "Successful risk management depends upon a sense of collective responsibility among AI actors." Diverse teams make "implicit aspects more explicit," which creates opportunities to surface problems (p. 10).

> [!definition] Definition: TEVV and the Separation Principle (AI RMF §2, p. 9; Fig. 3 caption, p. 11; Appendix A, pp. 35-36)
> **TEVV** (test, evaluation, verification, and validation) tasks "are performed throughout the AI lifecycle. They are carried out by AI actors who examine the AI system or its components, or detect and remediate problems" (App. A, p. 35). "As a regular process within an AI lifecycle, TEVV allows for both mid-course remediation and post-hoc risk management" (§2, p. 9).
>
> **Separation principle (two levels):**
> 1. *Builders vs validators*: "AI actors in the AI Model dimension (Figure 2) are separated as a best practice, with those building and using the models separated from those verifying and validating the models" (Fig. 3 caption, p. 11).
> 2. *Testers vs validators*: "Ideally, AI actors carrying out verification and validation tasks are distinct from those who perform test and evaluation actions" (App. A, pp. 35-36).
>
> **Timing:** TEVV "can be incorporated into a phase as early as design, where tests are planned in accordance with the design requirement" (p. 36).
^def-tevv

> [!theorem] TEVV Tasks by Lifecycle Phase (Appendix A, p. 36)
> - **Design, planning, and data**: "internal and external validation of assumptions for system design, data collection, and measurements relative to the intended context of deployment or application."
> - **Development (model building)**: "model validation and assessment."
> - **Deployment**: "system validation and integration in production, with testing, and recalibration for systems and process integration, user experience, and compliance with existing legal, regulatory, and ethical specifications."
> - **Operations**: "ongoing monitoring for periodic updates, testing, and subject matter expert (SME) recalibration of models, the tracking of incidents or errors reported and their management, the detection of emergent properties and related impacts, and processes for redress and response."
^thm-tevv-by-phase

### Figure 2: lifecycle and key dimensions (p. 10)

Fig. 2 is a ring diagram (transcribed from the image). **People and Planet** is at the center. The **inner ring** holds the four key dimensions, and the **outer ring** holds the lifecycle stages attached to each dimension:

| Key dimension (inner ring) | Lifecycle stage(s) (outer ring) |
|---|---|
| Application Context | Plan and Design; Operate and Monitor |
| Data and Input | Collect and process data |
| AI Model | Build and use model; Verify and validate |
| Task and Output | Deploy and Use |
| People and Planet (centre) | (Use or Impacted by, per Fig. 3) |

Caption (p. 10): "The two inner circles show AI systems' key dimensions and the outer circle shows AI lifecycle stages. Ideally, risk management efforts start with the Plan and Design function in the application context and are performed throughout the AI system lifecycle."

### Figure 3: AI actors across lifecycle stages (p. 11)

Transcribed from the rotated table image. Row labels in the figure: Key Dimensions, Lifecycle Stage, TEVV, Activities, Representative Actors.

| Key dimension | Lifecycle stage | TEVV | Activities | Representative actors |
|---|---|---|---|---|
| Application Context | Plan and Design | TEVV includes audit & impact assessment | Articulate and document the system's concept and objectives, underlying assumptions, and context in light of legal and regulatory requirements and ethical considerations | System operators; end users; domain experts; AI designers; impact assessors; TEVV experts; product managers; compliance experts; auditors; governance experts; organizational management; C-suite executives; impacted individuals/communities; evaluators |
| Data & Input | Collect and Process Data | TEVV includes internal & external validation | Gather, validate, and clean data and document the metadata and characteristics of the dataset, in light of objectives, legal and ethical considerations | Data scientists; data engineers; data providers; domain experts; socio-cultural analysts; human factors experts; TEVV experts |
| AI Model | Build and Use Model | TEVV includes model testing | Create or select algorithms; train models | Modelers; model engineers; data scientists; developers; domain experts; with consultation of socio-cultural analysts familiar with the application context and TEVV experts |
| AI Model | Verify and Validate | TEVV includes model testing | Verify & validate, calibrate, and interpret model output | (same as Build and Use Model) |
| Task & Output | Deploy and Use | TEVV includes integration, compliance testing & validation | Pilot, check compatibility with legacy systems, verify regulatory compliance, manage organizational change, and evaluate user experience | System integrators; developers; systems engineers; software engineers; domain experts; procurement experts; third-party suppliers; C-suite executives; with consultation of human factors experts, socio-cultural analysts, governance experts, TEVV experts |
| Application Context | Operate and Monitor | TEVV includes audit & impact assessment | Operate the AI system and continuously assess its recommendations and impacts (both intended and unintended) in light of objectives, legal and regulatory requirements, and ethical considerations | System operators, end users, and practitioners; domain experts; AI designers; impact assessors; TEVV experts; system funders; product managers; compliance experts; auditors; governance experts; organizational management; impacted individuals/communities; evaluators |
| People & Planet | Use or Impacted by | TEVV includes audit & impact assessment | Use system/technology; monitor & assess impacts; seek mitigation of impacts; advocate for rights | End users, operators, and practitioners; impacted individuals/communities; general public; policy makers; standards organizations; trade associations; advocacy groups; environmental groups; civil society organizations; researchers |

The point to take from Fig. 3 is that **Verify and Validate** is its own lifecycle stage. It is not a sub-step of Build. Its activities ("verify & validate, calibrate, and interpret model output") correspond to the work a model-validation function does.

### Appendix A: actor-task descriptions (pp. 35-37)

| Actor group | Lifecycle location | Responsibilities (paraphrased) | Representative actors named |
|---|---|---|---|
| **AI Design** | Application Context; Data & Input | Create concept and objectives; plan, design, collect and process data "so that the AI system is lawful and fit-for-purpose"; document concept, assumptions, context, requirements; gather and clean data; document dataset metadata | Data scientists, domain experts, socio-cultural analysts, DEIA experts, impacted community members, human-factors (UX/UI) experts, governance experts, data engineers, data providers, system funders, product managers, third parties, evaluators, legal/privacy governance |
| **AI Development** | AI Model | Provide initial infrastructure; "model building and interpretation tasks, which involve the creation, selection, calibration, training, and/or testing of models or algorithms" | ML experts, data scientists, developers, third parties, legal/privacy governance experts, experts in socio-cultural and contextual deployment factors |
| **AI Deployment** | Task & Output | Contextual decisions on how the system is used; pilot; check compatibility with legacy systems; ensure regulatory compliance; manage organizational change; evaluate user experience | System integrators, software developers, end users, operators and practitioners, evaluators, domain experts in human factors, socio-cultural analysis and governance |
| **Operation and Monitoring** | Application Context / Operate and Monitor | Operate the system and "regularly assess system output and impacts" | System operators, domain experts, AI designers, users who interpret output, product developers, evaluators and auditors, compliance experts, organizational management, research community |
| **TEVV** | Throughout | Examine the system or components; detect and remediate problems; tasks by phase (see callout above) | (TEVV experts; separation recommended) |
| **Human Factors** | Throughout | Human-centered design; involvement of end users and interested parties; context-specific norms and values; evaluate and adapt user experience; human-centered evaluation and testing; inform impact assessments | Human factors professionals |
| **Domain Expert** | Throughout | Knowledge of an industry, economic sector, context or application area; "essential guidance for AI system design and development"; "interpret outputs in support of work performed by TEVV and AI impact assessment teams" | Multidisciplinary practitioners or scholars |
| **AI Impact Assessment** | Throughout | Assess "requirements for AI system accountability, combating harmful bias, examining impacts of AI systems, product safety, liability, and security" | Impact assessors and evaluators (technical, human-factor, socio-cultural, legal) |
| **Procurement** | Acquisition | Acquire AI models, products, or services from a third-party developer, vendor, or contractor | Actors with financial, legal, or policy-management authority |
| **Governance and Oversight** | Organization-wide | "management, fiduciary, and legal authority and responsibility"; concerned with "the impact and sustainability of the organization as a whole" | Organizational management, senior leadership, Board of Directors |
| *Additional:* **Third-party entities** | External | Providers, developers, vendors, evaluators of data, algorithms, models, systems; "external to the design, development, or deployment team"; technologies "may be complex or opaque, and risk tolerances may not align" | Vendors, providers |
| **End users** | Use | Individuals or groups using the system for specific purposes; "can range in competency from AI experts to first-time technology end users" | — |
| **Affected individuals/communities** | Impacted | All directly or indirectly affected; "do not necessarily interact with the deployed system" | — |
| **Other AI actors** | Norms | Provide "formal or quasi-formal norms or guidance" | Trade associations, standards developing organizations, advocacy groups, researchers, environmental groups, civil society organizations |
| **General public** | Society | "most likely to directly experience positive and negative impacts"; may motivate actions of other actors | Individuals, communities, consumers |

## Examples

> [!example] Example: Staffing TEVV for a marketing-analytics model team (generic illustration)
> **Setup:** A five-person analytics team builds weekly response models for several brands.
>
> **Applying the separation principle:**
> - *Build* (AI Development): two modelers fit the models.
> - *Test and evaluate*: a third analyst runs the agreed backtests (rolling-origin error, posterior predictive checks) on the frozen model. These are tests the modelers specified.
> - *Verify and validate*: a reviewer who neither built nor tested the model checks that the requirements for the *intended use* (budget reallocation) are met. This includes whether the model recovers known effects in simulation ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]) and whether the test design itself matches deployment conditions.
> - *Domain expert*: a media planner checks that the outputs make sense for the business.
> - *Operate and Monitor*: monthly comparison of forecasts to actuals; incidents are logged.
>
> **Why the second level of separation matters:** If the people who chose the tests also judge whether the tests passed, the [[Researcher Degrees of Freedom|researcher degrees of freedom]] in choosing tests are unchecked. This is the same failure mode as the [[Garden of Forking Paths]].
^ex-staffing-tevv-for-a

## Connections

- **Independent validation lineage.** Fig. 3's separation principle is the AI-era version of SR 11-7's requirement that validation be independent of development ([[SR 11-7 - Model Risk Management Guidance - Overview]]). Appendix A adds a second layer: testers and validators should also be separate.
- **Verify vs validate.** Verification asks whether the system was built right (the code implements the spec). Validation asks whether the right system was built (it meets the requirements for its intended use). See §3.1's ISO definition in [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]. Computational checks such as [[Simulation-Based Calibration - Overview]] are verification. Out-of-sample and causal checks ([[Cross Validation Checking]], [[Experimental Benchmarks for Observational Ad Measurement]]) are validation.
- **Operations TEVV** ("SME recalibration of models", "detection of emergent properties") corresponds to production monitoring: [[Forecast Evaluation and Backtesting]], [[Posterior Predictive Checking]].
- **Where the Core uses these roles.** GOVERN 2.1 documents roles. GOVERN 3.2 defines human-AI configuration roles. MEASURE 1.3 requires independent assessors. MEASURE 2.1 documents TEVV test sets. MEASURE 2.13 evaluates TEVV effectiveness. See [[NIST AI RMF - MEASURE Function]].

## See Also

- [[NIST AI RMF 1.0 - Overview]]
- [[NIST AI RMF - MEASURE Function]]: where TEVV becomes required outcomes
- [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]]: Appendix C on human roles
- [[Modeling as Software Development]]: testing practice for statistical models
- [[Bayesian Workflow - Overview]]: model checking as an iterative workflow
