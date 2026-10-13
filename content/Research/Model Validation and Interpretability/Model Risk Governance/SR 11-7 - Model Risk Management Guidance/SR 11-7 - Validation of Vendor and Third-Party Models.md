---
title: SR 11-7 - Validation of Vendor and Third-Party Models
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §V Model Validation, 'Validation of Vendor and Other Third-Party Products', pp. 15-16; related: §IV footnote 4 (p. 5); §VI policies on vendor selection (pp. 17-18) and vendor documentation (p. 21)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]]"
  - "[[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]]"
  - "[[SR 11-7 - Outcomes Analysis and Back-Testing]]"
used_by:
  - "[[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - Vendor Model Validation
  - Third-Party Model Validation (SR 11-7)
---

# SR 11-7 - Validation of Vendor and Third-Party Models

> [!summary]
> SR 11-7 (§V, pp. 15-16) holds vendor and third-party products — "data, parameter values, and complete models" — to the **same principles** as in-house models, with a modified process. Banks need a **selection process**; vendors should supply **developmental evidence**, **testing results**, clear **limitations and assumptions**, and ongoing performance monitoring and outcomes analysis. But "Banks are expected to validate their own use of vendor products": where code is opaque, lean more on **sensitivity analysis and benchmarking**; document and justify **customization**; investigate vendor data and assumptions for **representativeness**; run monitoring and outcomes analysis on the **bank's own outcomes**; keep knowledge **in-house**; and maintain **contingency plans** if the vendor disappears.

## Overview

The problem is structural: with vendor products "the modeling expertise is external to the user and ... some components are considered proprietary" (p. 15). SR 11-7 refuses to let that become an exemption: vendor products "should nevertheless be incorporated into a bank's broader model risk management framework following the same principles as applied to in-house models, although the process may be somewhat modified."

**Footnote 4 (§IV, p. 5)** adds that smaller banks may rely on vendors without in-house developers, but must still "choose the particular models and variables that are appropriate to its size, scale, and lines of business and ensure the models are appropriate for the intended use."

## Main Content

> [!definition] Standard: Vendor Obligations a Bank Should Require (SR 11-7, §V, p. 16)
> 1. **Selection process:** "banks should ensure that there are appropriate processes in place for selecting vendor models."
> 2. **Developmental evidence:** require the vendor "to provide developmental evidence explaining the product components, design, and intended use, to determine whether the model is appropriate for the bank's products, exposures, and risks."
> 3. **Testing results:** "Vendors should provide appropriate testing results that show their product works as expected."
> 4. **Limitations:** "They should also clearly indicate the model's limitations and assumptions and where the product's use may be problematic."
> 5. **Ongoing vendor monitoring:** "Banks should expect vendors to conduct ongoing performance monitoring and outcomes analysis, with disclosure to their clients, and to make appropriate modifications and updates over time."
^def-vendor-obligations

> [!theorem] Rule: Banks Validate Their Own Use of Vendor Products (SR 11-7, §V, p. 16)
> "Banks are expected to validate their own use of vendor products."
> 1. **Opaque code → other tools:** "External models may not allow full access to computer coding and implementation details, so the bank may have to rely more on sensitivity analysis and benchmarking."
> 2. **Customization:** "Vendor models are often designed to provide a range of capabilities and so may need to be customized by a bank for its particular circumstances. A bank's customization choices should be documented and justified as part of validation."
> 3. **Vendor data and assumptions:** "If vendors provide input data or assumptions, or use them to build models, their relevance for the bank's situation should be investigated. Banks should obtain information regarding the data used to develop the model and assess the extent to which that data is representative of the bank's situation."
> 4. **Own outcomes:** "The bank also should conduct ongoing monitoring and outcomes analysis of vendor model performance using the bank's own outcomes."
^thm-validate-own-use

> [!definition] Standard: In-House Knowledge and Contingency (SR 11-7, §V, p. 16)
> "Systematic procedures for validation help the bank to understand the vendor product and its capabilities, applicability, and limitations. Such detailed knowledge is necessary for basic controls of bank operations. It is also very important for the bank to have as much knowledge in-house as possible, in case the vendor or the bank terminates the contract for any reason, or if the vendor is no longer in business. Banks should have contingency plans for instances when the vendor model is no longer available or cannot be supported by the vendor."
^def-vendor-contingency

**Related governance requirements (§VI).** Policies should describe "the processes used to select and retain vendor models, including the people who should be involved in such decisions" (pp. 17-18) and "detail the requirements for validation of vendor models and third-party products" (p. 18). Documentation: the bank "should ensure that appropriate documentation of the third-party approach is available so that the model can be appropriately validated" (p. 21). See [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] and [[SR 11-7 - Model Inventory and Documentation Standards]].

### Black-box validation toolkit

When code is unavailable, the three validation elements reduce to input-output probes:

| Element | Black-box version |
|---|---|
| Conceptual soundness | Vendor's developmental evidence + documented limitations; review of customization choices |
| Sensitivity / stress | Perturb inputs, observe outputs; map boundaries ([[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing#^def-sensitivity-analysis]]) |
| Benchmarking | Compare to alternative models/data ([[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking#^def-benchmarking]]) |
| Outcomes analysis | Back-test on *own* outcomes ([[SR 11-7 - Outcomes Analysis and Back-Testing#^def-backtesting]]) |
| Known-truth test (applied extension) | Feed synthetic data with known effects and check recovery ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) |

## Examples

> [!example] Example: A vendor attribution or optimisation tool (generic illustration)
> **Setup:** a team licenses a black-box tool that ingests weekly spend and sales and returns channel contributions and an optimal budget.
> **SR 11-7 checklist:** (1) request the vendor's methodology documentation, validation results and stated limitations; (2) document every configuration choice (lag windows, priors, channel groupings) and why; (3) ask what data calibrated any built-in priors or benchmarks and whether it resembles this business; (4) perturb inputs (±10% spend in one channel) and check outputs move sensibly; (5) compare contributions with any available experiment; (6) back-test the tool's sales forecasts on the team's own subsequent weeks; (7) keep exportable copies of inputs/outputs and an internal understanding sufficient to switch providers.
^ex-a-vendor-attribution-or

## Connections

- Platform-reported lift studies are third-party *data* products and fall under the same scrutiny: [[User-Level Ad Experiments - Overview]], [[Experimental Benchmarks for Observational Ad Measurement]].
- Explanations returned by black-box tools have their own validity limits: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- NIST AI RMF treats third-party AI components under GOVERN/MAP with similar expectations: [[NIST AI RMF 1.0 - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review#^def-model-validation]] — vendor parity in the scope definition
