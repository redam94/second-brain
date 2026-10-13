---
title: SR 11-7 - Validation Independence, Validation Gate and Periodic Review
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/definition
  - type/concept
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §V Model Validation (introductory subsection), pp. 9-10; 'Key Elements of Comprehensive Validation' list, p. 11"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]"
  - "[[SR 11-7 - Model Development, Implementation and Use]]"
used_by:
  - "[[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]]"
  - "[[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]]"
  - "[[SR 11-7 - Outcomes Analysis and Back-Testing]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - Model Validation (SR 11-7)
  - Independence of Model Validation
  - SR 11-7 Validation Gate
  - Three Core Elements of Validation
---

# SR 11-7 - Validation Independence, Validation Gate and Periodic Review

> [!summary]
> The opening of SR 11-7 §V defines **model validation** ("processes and activities intended to verify that models are performing as expected, in line with their design objectives and business uses"), extends it to every model component and to vendor models, and scales its rigor with materiality. Validation should be **independent** — done by people with no stake in the verdict — but independence is instrumental and "judged by actions and outcomes." Validators need incentives, competence (including business knowledge) and **explicit authority** whose reality is shown by models actually changed. Before first use, validation acts as a **gate**: significant deficiencies mean no use or use "only under very tight constraints"; severe ones mean rejection; if validation is infeasible, that fact must be disclosed and compensated. After launch: ongoing validation, at least **annual review**, validation of material changes, periodic full re-validation, and **error thresholds** that trigger redevelopment. The framework has **three core elements**: conceptual soundness, ongoing monitoring, outcomes analysis.

## Overview

§V is the longest section of SR 11-7 (pp. 9-16). Its introductory subsection — captured here — sets the principles that apply to every validation activity; the three core elements and vendor validation have their own notes.

## Main Content

### Definition and scope (p. 9)

> [!definition] Definition: Model Validation (SR 11-7, §V, p. 9)
> "Model validation is the set of processes and activities intended to verify that models are performing as expected, in line with their design objectives and business uses. Effective validation helps ensure that models are sound. It also identifies potential limitations and assumptions, and assesses their possible impact. As with other aspects of effective challenge, model validation should be performed by staff with appropriate incentives, competence, and influence."
>
> **Scope:** "All model components, including input, processing, and reporting, should be subject to validation; this applies equally to models developed in-house and to those purchased from or developed by vendors or consultants."
>
> **Rigor:** "commensurate with the bank's overall use of models, the complexity and materiality of its models, and the size and complexity of the bank's operations."
^def-model-validation

### Independence (p. 9)

> [!definition] Definition: Independence of Validation (SR 11-7, §V, p. 9)
> "Validation involves a degree of independence from model development and use. Generally, validation should be done by people who are not responsible for development or use and do not have a stake in whether a model is determined to be valid."
>
> - **Instrumental, not formal:** "Independence is not an end in itself but rather helps ensure that incentives are aligned with the goals of model validation. While independence may be supported by separation of reporting lines, it should be judged by actions and outcomes, since there may be additional ways to ensure objectivity and prevent bias."
> - **Developer/user validation permitted with review:** "some validation work may be most effectively done by model developers and users; it is essential, however, that such validation work be subject to critical review by an independent party, who should conduct additional activities to ensure proper validation."
> - **How quality is judged:** "the quality of the process is judged by the manner in which models are subject to critical review. This could be determined by evaluating the extent and clarity of documentation, the issues identified by objective parties, and the actions taken by management to address model issues."
^def-validation-independence

### The effective-challenge triad applied to validators (pp. 9-10)

| Requirement | SR 11-7 text (§V, pp. 9-10) | Evidence it is met |
|---|---|---|
| **Incentives** | Banks "can support appropriate incentives in validation through compensation practices and performance evaluation standards that are tied directly to the quality of model validations and the degree of critical, unbiased review"; "corporate culture plays a role if it establishes support for objective thinking and encourages questioning and challenging of decisions." | Validators are not rewarded for model adoption or speed of approval |
| **Competence** | "Staff doing validation should have the requisite knowledge, skills, and expertise." "A high level of technical expertise may be needed because of the complexity of many models, both in structure and in application." Validators also need "a significant degree of familiarity with the line of business using the model and the model's intended use." "A model's developer is an important source of information but cannot be relied on as an objective or sole source on which to base an assessment of model quality." | Validator can re-implement or independently test the model |
| **Influence** | Validators "should have explicit authority to challenge developers and users and to elevate their findings, including issues and deficiencies." Their reporting line "should have sufficient influence or stature ... to ensure that any issues and deficiencies are appropriately addressed in a timely and substantive manner," reflected in "reporting lines, title, rank, or designated responsibilities." | "a pattern of actual instances in which models, or the use of models, have been appropriately changed as a result of validation" |

The last row is an empirical test of governance: a validation function that has *never* changed or blocked a model is evidence of *weak* challenge.

### The validation gate (p. 10)

> [!theorem] Rule: The Validation Gate (SR 11-7, §V, p. 10)
> "The range and rigor of validation activities conducted prior to first use of a model should be in line with the potential risk presented by use of the model. If significant deficiencies are noted as a result of the validation process, use of the model should not be allowed or should be permitted only under very tight constraints until those issues are resolved. If the deficiencies are too severe to be addressed within the model's framework, the model should be rejected."
>
> **When pre-use validation is infeasible:** "If it is not feasible to conduct necessary validation activities prior to model use because of data paucity or other limitations, that fact should be documented and communicated in reports to users, senior management, and other relevant parties. In such cases, the uncertainty about the results that the model produces should be mitigated by other compensating controls. This is particularly applicable to new models and to the use of existing models in new applications."
^thm-validation-gate

> [!algorithm] Algorithm: Pre-use validation decision (structured restatement of §V, p. 10)
> 1. Assess the potential risk of the model's intended use; set validation range and rigor proportionally.
> 2. If necessary validation cannot be performed (data paucity etc.): document the gap; communicate it to users, senior management and other parties; impose **compensating controls**; go to step 6.
> 3. Perform validation (conceptual soundness, testing, planned monitoring and outcomes analysis).
> 4. If no significant deficiencies → **approve** for intended use.
> 5. If significant deficiencies:
>    - fixable within the model's framework → **do not allow use**, or allow "only under very tight constraints," until resolved;
>    - too severe for the framework → **reject**.
> 6. Record outcome, constraints and next review date in the model inventory ([[SR 11-7 - Model Inventory and Documentation Standards]]).
^alg-validation-gate

### Ongoing validation and periodic review (p. 10)

> [!definition] Standard: Ongoing Validation and Periodic Review (SR 11-7, §V, p. 10)
> - **Continuity:** "Validation activities should continue on an ongoing basis after a model goes into use, to track known model limitations and to identify any new ones."
> - **Benign periods:** validation "is an important check on model use during periods of benign economic and financial conditions, when estimates of risk and potential loss can become overly optimistic, and when the data at hand may not fully reflect more stressed conditions."
> - **Change:** ongoing validation helps "ensure that changes in markets, products, exposures, activities, clients, or business practices do not create new model limitations." Example: "if credit risk models do not incorporate underwriting changes in a timely manner, flawed and costly business decisions could be made before deterioration in model performance becomes apparent."
> - **Annual review:** "Banks should conduct a periodic review—at least annually but more frequently if warranted—of each model to determine whether it is working as intended and if the existing validation activities are sufficient." The review may "affirm previous validation work, suggest updates to previous validation activities, or call for additional validation activities."
> - **Material changes:** "Material changes to models should also be subject to validation."
> - **Full re-validation:** "It is generally good practice for banks to ensure that all models undergo the full validation process ... at some fixed interval, including updated documentation of all activities."
^def-ongoing-validation

### What validation delivers; error thresholds (p. 10)

> [!definition] Definition: Validation Outputs and Error Thresholds (SR 11-7, §V, p. 10)
> Validation "helps reduce model risk by identifying model errors, corrective actions, and appropriate use," provides "an assessment of the reliability of a given model, based on its underlying assumptions, theory, and methods," and thus "information about the source and extent of model risk." It "can reveal deterioration in model performance over time and can set thresholds for acceptable levels of error, through analysis of the distribution of outcomes around expected or predicted values. If outcomes fall consistently outside this acceptable range, then the models should be redeveloped."
^def-error-thresholds

Formally, if $\hat y_t$ is the model's prediction and $y_t$ the realised outcome, the validator fixes an acceptable band for $e_t = y_t - \hat y_t$ (e.g. a predictive interval $[\hat q_{\alpha/2,t}, \hat q_{1-\alpha/2,t}]$) *in advance*, and redevelopment is triggered when exceedances are "consistent" — a frequency well above $\alpha$, or clustering. Operational details are in [[SR 11-7 - Outcomes Analysis and Back-Testing]].

### The three core elements (p. 11)

> [!definition] Definition: Three Core Elements of Validation (SR 11-7, §V "Key Elements of Comprehensive Validation", p. 11)
> "An effective validation framework should include three core elements:
> - Evaluation of conceptual soundness, including developmental evidence
> - Ongoing monitoring, including process verification and benchmarking
> - Outcomes analysis, including back-testing"
^def-three-elements

| Element | Question it answers | Note |
|---|---|---|
| 1. Conceptual soundness | Is the model well designed and built, for this purpose and data? | [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] |
| 2. Ongoing monitoring | Is it implemented, used and performing as intended now? | [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] |
| 3. Outcomes analysis | Do its outputs match what actually happened? | [[SR 11-7 - Outcomes Analysis and Back-Testing]] |
| (+) Vendor products | Same principles, modified process | [[SR 11-7 - Validation of Vendor and Third-Party Models]] |

## Examples

> [!example] Example: Applying the gate when outcomes cannot be observed (generic illustration)
> **Setup:** a new attribution model estimates each channel's incremental contribution; there is no ground-truth incrementality data, so outcomes analysis on the estimand is infeasible before launch.
> **SR 11-7 treatment:** document that pre-use validation of the attribution output is not feasible ("data paucity"); communicate this to users and senior management; impose compensating controls — e.g. use outputs only directionally, require agreement with at least one experiment before reallocating more than a set share of budget, and schedule a known-truth simulation study ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]). Record the constraint and its expiry in the inventory.
^ex-applying-the-gate-when

> [!example] Example: Testing whether independence is real (generic illustration)
> Over two years, an analytics team's reviewer approved 30 of 30 models without requested changes. Under SR 11-7's "actions and outcomes" test this is a red flag: either all models were perfect, or the reviewer lacks incentives, competence or influence. Reviewing whether any reviewer finding ever changed a model is the evidence SR 11-7 asks for.
^ex-testing-whether-independence-is

## Connections

- Independence as a defence against analytic flexibility: [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Pre-analysis Plans and the Open Science Ecosystem]], [[Prediction vs Postdiction]].
- Predetermined error bands ↔ calibrated predictive intervals: [[Conformal Prediction - Overview]], [[Forecast Evaluation and Backtesting]].
- NIST's MEASURE function requires independent assessors in the same spirit: [[NIST AI RMF 1.0 - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-effective-challenge]]
- [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] — control staff authority to restrict models and grant temporary exceptions
