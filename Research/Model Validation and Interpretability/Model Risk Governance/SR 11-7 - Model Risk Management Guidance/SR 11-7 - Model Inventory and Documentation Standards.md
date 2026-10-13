---
title: SR 11-7 - Model Inventory and Documentation Standards
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/definition
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §VI Governance, Policies, and Controls: 'Model Inventory' p. 20; 'Documentation' p. 21"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]]"
used_by:
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - Model Inventory
  - Model Inventory (SR 11-7)
  - SR 11-7 Documentation Standard
  - Model Validation Report
---

# SR 11-7 - Model Inventory and Documentation Standards

> [!summary]
> The last two subsections of SR 11-7 §VI (pp. 20-21). A **model inventory** must cover models in use, under development and recently retired; besides line-of-business inventories, a designated party maintains a **firm-wide inventory** to assess aggregate model risk; any **variation warranting separate validation is a separate entry**, cross-referenced. Entries record purpose, products, usage and restrictions, inputs and sources, component models, outputs and intended use, functioning status, last update, policy exceptions, responsible individuals, completed and planned validation dates, and the period the model is expected to remain valid. **Documentation** must be detailed enough that "parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions"; it needs incentives because developers undervalue it; everyone in the process documents their work; and **validation reports** need clear executive summaries with purpose, synopsis, major limitations and key assumptions.

## Overview

These two subsections turn the rest of SR 11-7 into something auditable. Without an inventory, aggregate model risk ([[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-aggregate-model-risk]]) cannot be assessed and internal audit cannot test completeness; without documentation, "model risk assessment and management will be ineffective."

## Main Content

### Model inventory (p. 20)

> [!definition] Definition: Model Inventory (SR 11-7, §VI, p. 20)
> "Banks should maintain a comprehensive set of information for models implemented for use, under development for implementation, or recently retired. While each line of business may maintain its own inventory, a specific party should also be charged with maintaining a firm-wide inventory of all models, which should assist a bank in evaluating its model risk in the aggregate. Any variation of a model that warrants a separate validation should be included as a separate model and cross-referenced with other variations."
^def-model-inventory

The inventory "may contain varying levels of information, given different model complexity and the bank's overall level of model usage." SR 11-7's general guidelines for its contents, as a field schema:

| Field | SR 11-7 wording (p. 20) |
|---|---|
| Purpose and products | "the purpose and products for which the model is designed" |
| Usage | "actual or expected usage" |
| Restrictions | "any restrictions on use" |
| Inputs | "the type and source of inputs used by a given model" |
| Components | "underlying components (which may include other models)" |
| Outputs | "model outputs and their intended use" |
| Status | "whether models are functioning properly" |
| Last update | "a description of when they were last updated" |
| Policy exceptions | "any exceptions to policy" |
| People | "the names of individuals responsible for various aspects of the model development and validation" |
| Validation dates | "the dates of completed and planned validation activities" |
| Validity horizon | "the time frame during which the model is expected to remain valid" |
| Lifecycle state (from definition) | in use / under development / recently retired |
| Variations (from definition) | separate entry per variant warranting separate validation, cross-referenced |

^tbl-inventory-fields

Three design points: (1) **lifecycle coverage** — retired models stay visible, so past decisions can be traced; (2) **dependency tracking** — components "which may include other models" make the inventory a graph, the basis for aggregate risk; (3) **variant granularity** — the unit of inventory is the unit of validation.

### Documentation (p. 21)

> [!definition] Definition: Documentation Standard (SR 11-7, §VI, p. 21)
> "Without adequate documentation, model risk assessment and management will be ineffective. Documentation of model development and validation should be sufficiently detailed so that parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions."
>
> **Functions:** documentation "provides for continuity of operations, makes compliance with policy transparent, and helps track recommendations, responses, and exceptions." "Developers, users, control and compliance units, and supervisors are all served by effective documentation." Banks "can benefit from advances in information and knowledge management systems and electronic documentation."
^def-documentation-standard

> [!definition] Standard: Who Documents What (SR 11-7, §VI, p. 21)
> - **Incentives:** "Documentation takes time and effort, and model developers and users who know the models well may not appreciate its value. Banks should therefore provide incentives to produce effective and complete model documentation."
> - **Developers:** "responsibility during model development for thorough documentation, which should be kept up-to-date as the model and application environment changes."
> - **Other participants:** document "their work, including ongoing monitoring, process verification, benchmarking, and outcomes analysis."
> - **Decision makers:** "line of business or other decision makers should document information leading to selection of a given model and its subsequent validation."
> - **Vendor models:** ensure "appropriate documentation of the third-party approach is available so that the model can be appropriately validated."
^def-who-documents

> [!definition] Standard: Validation Reports (SR 11-7, §VI, p. 21)
> "Validation reports should articulate model aspects that were reviewed, highlighting potential deficiencies over a range of financial and economic conditions, and determining whether adjustments or other compensating controls are warranted. Effective validation reports include clear executive summaries, with a statement of model purpose and an accessible synopsis of model and validation results, including major limitations and key assumptions."
^def-validation-report

> [!algorithm] Template: Validation report skeleton (derived from §VI p. 21 and §V)
> 1. **Executive summary** — model purpose; accessible synopsis of model and validation results; major limitations; key assumptions; verdict (approved / approved with constraints / rejected — per [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review#^thm-validation-gate]]).
> 2. **Scope** — model aspects reviewed; components (input, processing, reporting).
> 3. **Conceptual soundness** — alternatives compared; key assumptions and their impact; data relevance.
> 4. **Sensitivity and stress results** — boundaries of model performance.
> 5. **Process verification** — code/version control, data checks, report accuracy.
> 6. **Outcomes analysis** — back-test design and results vs predetermined thresholds; benchmark comparisons.
> 7. **Deficiencies across conditions** — "over a range of financial and economic conditions."
> 8. **Required adjustments / compensating controls** and owners, with timelines.
^alg-validation-report

## Examples

> [!example] Example: Inventory entries for a family of marketing models (generic illustration)
> A team fits one sales-response model per region (5 regions) with a shared pipeline, plus a budget optimiser consuming all five.
> - Each regional model warrants separate validation (different data, different decisions) → **5 entries**, cross-referenced as variants of one specification.
> - The optimiser is a **6th entry**, listing the 5 models as components.
> - Shared pipeline code and the common data feed are recorded as shared inputs → an aggregate-risk flag: a defect in either affects all six.
> - Each entry records restrictions (e.g. "directional allocation only; ROI point estimates not approved"), last update, validator, last and next validation dates, and validity horizon (e.g. "until next annual refresh or a >30% shift in channel mix").
^ex-inventory-entries-for-a

## Connections

- Recording discarded variants addresses the multiplicity problem of [[Researcher Degrees of Freedom]] and [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview|the Rashomon set]]: auditors can see how many models were tried.
- NIST AI RMF's GOVERN 1.6 (inventory) and documentation outcomes descend from these subsections: [[NIST AI RMF 1.0 - Overview]].
- Reproducible modelling workflows: [[Modeling as Software Development]], [[Bayesian Workflow - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] — audit checks inventory accuracy and completeness
