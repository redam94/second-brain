---
title: "NIST AI RMF - MAP Function"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 2 §5.2 Map pp. 24-25 (PDF pp. 29-30); Table 2 Categories and subcategories for the MAP function pp. 26-28 (PDF pp. 31-33)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - Core Structure and the GOVERN Function]]"
used_by:
  - "[[NIST AI RMF - MEASURE Function]]"
  - "[[NIST AI RMF - MANAGE Function]]"
aliases:
  - AI RMF MAP Function
  - AI RMF Table 2
  - AI RMF Go/No-Go Decision
  - MAP 2.3 Construct Validation
---

# NIST AI RMF - MAP Function

> [!summary]
> **MAP** "establishes the context to frame risks related to an AI system" (§5.2, p. 24). Its outcomes are the basis for MEASURE and MANAGE. When MAP is done, users should have "sufficient contextual knowledge about AI system impacts to inform an initial **go/no-go decision**" (p. 25). Table 2 has 5 categories and 18 subcategories: context (MAP 1), categorization (MAP 2), capabilities, benefits and costs against benchmarks (MAP 3), component and third-party risks (MAP 4), and impact characterization (MAP 5). For statistical validation the key items are **MAP 1.1** (intended purpose, assumptions and limitations, "related TEVV and system metrics"), **MAP 2.2** (*knowledge limits*), **MAP 2.3** (scientific integrity, experimental design, data representativeness, and **construct validation**), **MAP 3.3** (targeted application scope), and **MAP 5.1** (likelihood and magnitude of each impact).
^summary

## Overview

MAP is where the *intended use* is pinned down. ISO's definition of validation (§3.1) is relative to "a specific intended use," so MAP is logically prior to any validation exercise: without MAP 1.1 there is nothing to validate *against*. MAP also deals with the problem that knowledge is spread across the lifecycle: "AI actors in charge of one part of the process often do not have full visibility or control over other parts" (p. 24).

## Main Content

### §5.2 narrative (pp. 24-25)

> [!definition] Definition: MAP Function (AI RMF §5.2, pp. 24-25)
> "The MAP function establishes the context to frame risks related to an AI system." The information gathered "enables negative risk prevention and informs decisions for processes such as model management, as well as an initial decision about appropriateness or the need for an AI solution. Outcomes in the MAP function are the basis for the MEASURE and MANAGE functions. Without contextual knowledge, and awareness of risks within the identified contexts, risk management is difficult to perform. The MAP function is intended to enhance an organization's ability to identify risks and broader contributing factors" (p. 25).
^def-map

**Why context is hard** (pp. 24-25): the lifecycle has "many interdependent activities involving a diverse set of actors." "Early decisions in identifying purposes and objectives of an AI system can alter its behavior and capabilities," and deployment dynamics "can shape the impacts." So "the best intentions within one dimension of the AI lifecycle can be undermined via interactions with decisions and conditions in other, later activities." This "can introduce uncertainty into risk management practices," and anticipating sources of negative risk "can mitigate this uncertainty and enhance the integrity of the decision process."

Getting broad perspectives (diverse internal team plus external collaborators, end users, impacted communities) helps organizations (p. 25). The depth of that engagement is itself proportional: it "may vary based on the risk level of a particular AI system, the makeup of the internal team, and organizational policies." Broad perspectives "can help organizations proactively prevent negative risks and develop more trustworthy AI systems by":

1. improve "their capacity for understanding contexts;"
2. check "their assumptions about context of use;"
3. enable "recognition of when systems are not functional within or out of their intended context;"
4. identify "positive and beneficial uses of their existing AI systems;"
5. improve "understanding of limitations in AI and ML processes;"
6. identify "constraints in real-world applications that may lead to negative impacts;"
7. identify "known and foreseeable negative impacts related to intended use of AI systems; and"
8. anticipate "risks of the use of AI systems beyond intended use."

> [!theorem] Principle: MAP Ends in a Go/No-Go Decision (AI RMF §5.2, p. 25)
> "After completing the MAP function, Framework users should have sufficient contextual knowledge about AI system impacts to inform an initial go/no-go decision about whether to design, develop, or deploy an AI system. If a decision is made to proceed, organizations should utilize the MEASURE and MANAGE functions along with policies and procedures put into place in the GOVERN function." MAP must continue "as context, capabilities, risks, benefits, and potential impacts evolve over time."
>
> **Pairing:** MANAGE 1.1 repeats the decision after measurement: "whether its development or deployment should proceed" ([[NIST AI RMF - MANAGE Function]]).
^thm-go-no-go

### Table 2: MAP categories and subcategories (pp. 26-28)

Transcribed from Table 2 (line breaks joined).

**MAP 1: Context is established and understood.**

| ID | Subcategory |
|---|---|
| MAP 1.1 | Intended purposes, potentially beneficial uses, context-specific laws, norms and expectations, and prospective settings in which the AI system will be deployed are understood and documented. Considerations include: the specific set or types of users along with their expectations; potential positive and negative impacts of system uses to individuals, communities, organizations, society, and the planet; assumptions and related limitations about AI system purposes, uses, and risks across the development or product AI lifecycle; and related TEVV and system metrics. |
| MAP 1.2 | Interdisciplinary AI actors, competencies, skills, and capacities for establishing context reflect demographic diversity and broad domain and user experience expertise, and their participation is documented. Opportunities for interdisciplinary collaboration are prioritized. |
| MAP 1.3 | The organization's mission and relevant goals for AI technology are understood and documented. |
| MAP 1.4 | The business value or context of business use has been clearly defined or – in the case of assessing existing AI systems – re-evaluated. |
| MAP 1.5 | Organizational risk tolerances are determined and documented. |
| MAP 1.6 | System requirements (e.g., "the system shall respect the privacy of its users") are elicited from and understood by relevant AI actors. Design decisions take socio-technical implications into account to address AI risks. |

**MAP 2: Categorization of the AI system is performed.**

| ID | Subcategory |
|---|---|
| MAP 2.1 | The specific tasks and methods used to implement the tasks that the AI system will support are defined (e.g., classifiers, generative models, recommenders). |
| MAP 2.2 | Information about the AI system's knowledge limits and how system output may be utilized and overseen by humans is documented. Documentation provides sufficient information to assist relevant AI actors when making decisions and taking subsequent actions. |
| MAP 2.3 | Scientific integrity and TEVV considerations are identified and documented, including those related to experimental design, data collection and selection (e.g., availability, representativeness, suitability), system trustworthiness, and construct validation. |

**MAP 3: AI capabilities, targeted usage, goals, and expected benefits and costs compared with appropriate benchmarks are understood.**

| ID | Subcategory |
|---|---|
| MAP 3.1 | Potential benefits of intended AI system functionality and performance are examined and documented. |
| MAP 3.2 | Potential costs, including non-monetary costs, which result from expected or realized AI errors or system functionality and trustworthiness – as connected to organizational risk tolerance – are examined and documented. |
| MAP 3.3 | Targeted application scope is specified and documented based on the system's capability, established context, and AI system categorization. |
| MAP 3.4 | Processes for operator and practitioner proficiency with AI system performance and trustworthiness – and relevant technical standards and certifications – are defined, assessed, and documented. |
| MAP 3.5 | Processes for human oversight are defined, assessed, and documented in accordance with organizational policies from the GOVERN function. |

**MAP 4: Risks and benefits are mapped for all components of the AI system including third-party software and data.**

| ID | Subcategory |
|---|---|
| MAP 4.1 | Approaches for mapping AI technology and legal risks of its components – including the use of third-party data or software – are in place, followed, and documented, as are risks of infringement of a third party's intellectual property or other rights. |
| MAP 4.2 | Internal risk controls for components of the AI system, including third-party AI technologies, are identified and documented. |

**MAP 5: Impacts to individuals, groups, communities, organizations, and society are characterized.**

| ID | Subcategory |
|---|---|
| MAP 5.1 | Likelihood and magnitude of each identified impact (both potentially beneficial and harmful) based on expected use, past uses of AI systems in similar contexts, public incident reports, feedback from those external to the team that developed or deployed the AI system, or other data are identified and documented. |
| MAP 5.2 | Practices and personnel for supporting regular engagement with relevant AI actors and integrating feedback about positive, negative, and unanticipated impacts are in place and documented. |

^table2-map

### MAP 2.3 and construct validity

> [!definition] Definition: Construct Validation in MAP 2.3 (AI RMF Table 2, p. 27; vault gloss)
> MAP 2.3 requires that "scientific integrity and TEVV considerations" be documented, including "experimental design, data collection and selection (e.g., availability, representativeness, suitability), system trustworthiness, and construct validation."
>
> **Gloss (from measurement theory, not defined in the AI RMF):** *construct validity* is the degree to which a measured quantity actually represents the theoretical concept it claims to measure. For a model output called "channel importance," the construct is the causal contribution of the channel to the KPI. The measurement is whatever the model computes, e.g. a SHAP share, a coefficient, or a permutation drop. Construct validation is the argument and evidence that the second tracks the first.
^def-map23-construct

This links to §1.2.1's warning that metrics "may inadvertently reflect factors unrelated to the underlying impact," and to Goodhart effects once a proxy is optimized: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].

### MAP subcategories mapped to statistical practice

| Subcategory | Statistical-practice artefact |
|---|---|
| MAP 1.1 | Model purpose statement: estimand, decision supported, users, assumptions, TEVV metrics |
| MAP 1.4 | Business-value statement; for existing models, a re-evaluation |
| MAP 1.5 | Documented tolerance, e.g. maximum acceptable forecast error or decision regret |
| MAP 2.1 | Method class: forecaster, causal estimator, classifier |
| MAP 2.2 | *Knowledge limits*: data range, extrapolation boundaries, unidentified effects |
| MAP 2.3 | Data representativeness, experimental vs observational design, construct validity |
| MAP 3.2 | Cost of errors (e.g. regret from misallocation) linked to tolerance |
| MAP 3.3 | Scope statement: "valid for national weekly forecasting; not for regional attribution" |
| MAP 3.5 | Human oversight process (analyst review before outputs ship) |
| MAP 4.1-4.2 | Third-party data feeds and vendor model components with their controls |
| MAP 5.1 | Likelihood × magnitude per impact (the §1.1 risk definition applied) |

## Examples

> [!example] Example: MAP for a segment-level driver model (generic illustration)
> **Setup:** Per-segment gradient-boosted models of a shared weekly KPI, 52-156 rows per segment, 15 media and price features.
>
> - **MAP 1.1**: Intended use is to rank media drivers for each segment so budget can be reallocated. Users are brand managers. Assumption: the feature effects are causal. TEVV metric: rolling-origin MAPE, plus ranking recovery in a known-truth simulation.
> - **MAP 2.2 knowledge limits**: With 52 rows and 15 correlated features, effects are weakly identified. Outside the observed spend range the model is pure extrapolation.
> - **MAP 2.3**: The design is observational, with no randomized spend variation. *Construct validity* of "SHAP share = causal importance" is **not established**.
> - **MAP 3.3 scope**: Restrict the use to descriptive reporting until experiments are run.
> - **MAP 5.1**: The likelihood of misranking is high (weak identification). Its magnitude is moderate (budget shifts are reversible within a quarter).
> - **Go/no-go**: *Go* for descriptive use. *No-go* for automated reallocation.
^ex-map-for-a-segment

## Connections

- **Intended use and validation**: ISO validation definition in [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]; SR 11-7's emphasis on the model's intended purpose ([[SR 11-7 - Model Risk Management Guidance - Overview]]).
- **Experimental design (MAP 2.3)**: [[Geo-Experiment Design and Power Analysis]], [[Conversion Lift Studies on Ad Platforms]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] (a case where observational estimates were wildly off).
- **Knowledge limits (MAP 2.2)**: sample-size adequacy, [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]; MMM identification challenges, [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].
- **Construct validity**: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].

## See Also

- [[NIST AI RMF - Core Structure and the GOVERN Function]]
- [[NIST AI RMF - MEASURE Function]]: what is measured once context is mapped
- [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]
- [[NIST AI RMF 1.0 - Overview]]
