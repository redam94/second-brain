---
title: SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §VI Governance, Policies, and Controls: intro p. 16; Board of Directors and Senior Management p. 17; Policies and Procedures pp. 17-18; Roles and Responsibilities pp. 18-19; Internal Audit p. 19; External Resources p. 20"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]"
  - "[[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]"
used_by:
  - "[[SR 11-7 - Model Inventory and Documentation Standards]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - SR 11-7 Governance
  - Model Owner (SR 11-7)
  - Three Lines of Model Risk Management
  - Internal Audit of Model Risk Management
---

# SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources

> [!summary]
> Pillar 3 of SR 11-7 (§VI, pp. 16-20): "a weak governance function will reduce the effectiveness of overall model risk management" even if development and validation are good. The **board** is ultimately responsible and sets a framework grounded in individual *and aggregate* model risk; **senior management** executes it (policies, staff, oversight, effective challenge, remedial action) and reports to the board. **Policies**, approved by the board or delegates and reviewed **annually**, must cover every aspect — including accuracy targets, discrepancy standards, pre-production validation standards, vendor rules, documentation and an inventory. **Roles** split into *ownership* (business-unit **model owner**, ultimately accountable), *controls* (risk-control staff managing independent validation, with authority to **restrict model use**; temporary exceptions bounded by timelines and limits) and *compliance*. **Internal audit** evaluates whether the framework is comprehensive, rigorous and effective — without duplicating it — including inventory completeness and validators' objectivity, competence and standing. **External resources** may help, under a written scope, with a designated internal party who can evaluate their work, and a contingency plan.

## Overview

§VI opens (p. 16): "Developing and maintaining strong governance, policies, and controls over the model risk management framework is fundamentally important to its effectiveness." A strong framework provides "explicit support and structure to risk management functions through policies defining relevant risk management activities, procedures that implement those policies, allocation of resources, and mechanisms for evaluating whether policies and procedures are being carried out as specified." Proportionality applies: "the extent and sophistication of a bank's governance function is expected to align with the extent and sophistication of model usage."

The inventory and documentation subsections of §VI are in [[SR 11-7 - Model Inventory and Documentation Standards]].

## Main Content

### Board of directors and senior management (p. 17)

> [!definition] Standard: Board and Senior Management Responsibilities (SR 11-7, §VI, p. 17)
> **Board:** together with senior management, "should establish a strong model risk management framework that fits into the broader risk management of the organization. That framework should be grounded in an understanding of model risk—not just for individual models but also in the aggregate. The framework should include standards for model development, implementation, use, and validation." "While the board is ultimately responsible, it generally delegates to senior management." "Board members should ensure that the level of model risk is within their tolerance and direct changes where appropriate."
>
> **Senior management duties:** "establishing adequate policies and procedures and ensuring compliance, assigning competent staff, overseeing model development and implementation, evaluating model results, ensuring effective challenge, reviewing validation and internal audit findings, and taking prompt remedial action when necessary." Senior management, "directly and through relevant committees, is responsible for regularly reporting to the board on significant model risk, from individual models and in the aggregate, and on compliance with policy."
>
> These actions "will set the tone for the whole organization about the importance of model risk and the need for active model risk management."
^def-board-senior-mgmt

### Policies and procedures (pp. 17-18)

> [!definition] Standard: Model Risk Management Policies (SR 11-7, §VI, pp. 17-18)
> **Basic requirement:** "Consistent with good business practices and existing supervisory expectations, banks should formalize model risk management activities with policies and the procedures to implement them" (p. 17). Both are required: written *policies* stating the standards, and *procedures* that operationalize them. Policies "should be consistent with this guidance."
>
> **Approval and review:** "The board or its delegates should approve model risk management policies and review them annually," updating them as needed for "changes in market conditions, bank products and strategies, bank exposures and activities, and practices in the industry." Policies should be "commensurate with the bank's relative complexity, business activities, corporate culture, and overall organizational structure."
>
> **Required coverage:** "model and model risk definitions; assessment of model risk; acceptable practices for model development, implementation, and use; appropriate model validation activities; and governance and controls over the model risk management process."
>
> **Quantitative standards:** "Policies should emphasize testing and analysis, and promote the development of targets for model accuracy, standards for acceptable levels of discrepancies, and procedures for review of and response to unacceptable discrepancies."
>
> **Vendors:** "a description of the processes used to select and retain vendor models, including the people who should be involved in such decisions."
>
> **Validation:** "The prioritization, scope, and frequency of validation activities should be addressed." Policies "should establish standards for the extent of validation that should be performed before models are put into production and the scope of ongoing validation," and "detail the requirements for validation of vendor models and third-party products."
>
> **Documentation:** policies "should require maintenance of detailed documentation of all aspects of the model risk management framework, including an inventory of models in use, results of the modeling and validation processes, and model issues and their resolution."
>
> **Roles and external resources:** policies "should identify the roles and assign responsibilities ... with clear detail on staff expertise, authority, reporting lines, and continuity," and "outline controls on the use of external resources for validation and compliance and specify how that work will be integrated."
^def-policies

> [!algorithm] Checklist: Minimum contents of a model risk policy (derived from §VI, pp. 17-18)
> 1. Definitions of *model* and *model risk*.
> 2. Method for assessing model risk (individual and aggregate; materiality tiers).
> 3. Development, implementation and use standards.
> 4. Accuracy targets; acceptable discrepancy standards; procedure for responding to unacceptable discrepancies.
> 5. Validation: prioritization, scope, frequency; pre-production standard; ongoing scope.
> 6. Vendor model selection/retention process (named participants) and vendor validation requirements.
> 7. Documentation requirements: inventory, modelling and validation results, issues and resolutions.
> 8. Roles, responsibilities, expertise, authority, reporting lines, continuity.
> 9. Controls on external resources and integration of their work.
> 10. Board/delegate approval; annual review.
^alg-policy-checklist

### Roles and responsibilities (pp. 18-19)

> [!definition] Definition: Ownership, Controls and Compliance Roles (SR 11-7, §VI, pp. 18-19)
> "Conceptually, the roles in model risk management can be divided among ownership, controls, and compliance." Whatever the assignment, "it is important that reporting lines and incentives be clear, with potential conflicts of interest identified and addressed."
>
> **Ownership (business units).** "Business units are generally responsible for the model risk associated with their business strategies. The role of model owner involves ultimate accountability for model use and performance within the framework set by bank policies and procedures." Owners ensure models are "properly developed, implemented, and used," that models in use "have undergone appropriate validation and approval processes," "promptly identify new or changed models, and provide all necessary information for validation activities."
>
> **Controls (risk-control staff, individuals and/or committees).** Responsibilities "include risk measurement, limits, and monitoring," and "managing the independent validation and review process to ensure that effective challenge takes place." Appropriate resources should be assigned to validation. Issues found "should be communicated by risk-control staff to relevant individuals and business users throughout the organization, including senior management, with a plan for corrective action." "Control staff should have the authority to restrict the use of models and monitor any limits on model usage. While they may grant exceptions to typical procedures of model validation on a temporary basis, that authority should be subject to other control mechanisms, such as timelines for completing validation work and limits on model use."
>
> **Compliance.** "Compliance with policies is an obligation of model owners and risk-control staff, and there should be specific processes in place to ensure that these roles are being carried out effectively and in line with policy. Documentation and tracking of activities surrounding model development, implementation, use, and validation are needed to provide a record that makes compliance with policy transparent." (p. 19)
^def-roles

Together with internal audit, this is often described as a "three lines" structure (owner → control/validation → audit). SR 11-7 itself uses the *ownership/controls/compliance* vocabulary plus a separate internal-audit subsection.

### Internal audit (p. 19)

> [!definition] Standard: Internal Audit of Model Risk Management (SR 11-7, §VI, p. 19)
> **Mandate:** "assess the overall effectiveness of the model risk management framework, including the framework's ability to address both types of model risk described in Section III, for individual models and in the aggregate." Findings "should be documented and reported to the board or its appropriately delegated agent." Internal audit needs "the proper incentives, ... appropriate skills, and ... adequate stature."
>
> **Not duplication:** "Internal audit's role is not to duplicate model risk management activities. Instead, its role is to evaluate whether model risk management is comprehensive, rigorous, and effective." Staff need "sufficient expertise in relevant modeling concepts as well as their use in particular business lines." "If some internal audit staff perform certain validation activities, then they should not be involved in the assessment of the overall model risk management framework."
>
> **What audit verifies:**
> 1. acceptable policies exist and owners/control groups comply;
> 2. records of model use and validation — "whether validations are performed in a timely manner and whether models are subject to controls that appropriately account for any weaknesses in validation activities";
> 3. "Accuracy and completeness of the model inventory";
> 4. "processes for establishing and monitoring limits on model usage";
> 5. whether "procedures for updating models are clearly documented," and whether they are followed;
> 6. that owners and control groups meet "documentation standards, including risk reporting";
> 7. "supporting operational systems" and "the reliability of data used by models."
>
> **Auditing the validators:** internal audit should "evaluate the objectivity, competence, and organizational standing of the key validation participants, with the ultimate goal of ascertaining whether those participants have the right incentives to discover and report deficiencies," and review internal and external validation "with the same rigor."
^def-internal-audit

Note the recursion: effective challenge is applied to the challengers. Audit checks the incentive-competence-influence triad ([[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-effective-challenge]]) of the validation function itself.

### External resources (p. 20)

> [!definition] Standard: Use of External Resources (SR 11-7, §VI, p. 20)
> "Although model risk management is an internal process, a bank may decide to engage external resources" for "model validation and review, compliance functions, or other activities in support of internal audit." They "may provide added knowledge and another level of critical and effective challenge," but the benefit "should be weighed against the added costs ... and the added time that external parties require to understand internal data, systems, and other relevant bank-specific circumstances."
>
> Requirements:
> 1. "a clearly written and agreed-upon scope of work";
> 2. "A designated internal party from the bank should be able to understand and evaluate the results of validation and risk-control activities conducted by external resources," responsible for "verifying that the agreed upon scope of work has been completed; evaluating and tracking identified issues and ensuring they are addressed; and making sure that completed work is incorporated into the bank's overall model risk management framework";
> 3. if externals do only part of the work, "the bank should coordinate internal resources to complete the full range of work needed";
> 4. "a contingency plan in case an external resource is no longer available or is unsatisfactory."
^def-external-resources

## Examples

> [!example] Example: Mapping SR 11-7 roles onto a small analytics team (generic illustration)
> | SR 11-7 role | Small-team implementation |
> |---|---|
> | Board / senior management | Head of analytics + business sponsor; sets risk tolerance (which decisions models may drive) and reviews a quarterly model-risk summary |
> | Model owner | The business lead who uses the media model's outputs for budget decisions; accountable for use within stated limits |
> | Developer | Modelling analyst(s) |
> | Control / validation | A peer from a different team, not rewarded on the model's adoption, with authority to block release; temporary exceptions logged with an expiry date |
> | Compliance | Release checklist and inventory entry required before outputs leave the team |
> | Internal audit | Annual review by someone outside the reporting line that checks the inventory against what was actually delivered, and whether validation ever changed anything |
> | External resources | Outside reviewer with written scope; an internal person able to evaluate their findings |
^ex-mapping-sr-11-7

## Connections

- Pre-committed accuracy targets and discrepancy standards ↔ pre-registration: [[Pre-analysis Plans and the Open Science Ecosystem]].
- Conflicts of interest in measurement ↔ [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] (adversarial/Campbell's-law variants).
- NIST's GOVERN function generalises this section: [[NIST AI RMF 1.0 - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Model Inventory and Documentation Standards]] — the remaining §VI subsections
- [[SR 11-7 - Validation of Vendor and Third-Party Models]]
