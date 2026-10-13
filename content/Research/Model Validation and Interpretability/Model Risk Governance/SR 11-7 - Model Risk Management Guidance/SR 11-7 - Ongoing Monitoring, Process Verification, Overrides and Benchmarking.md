---
title: SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/definition
  - type/concept
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §V Model Validation, '2. Ongoing Monitoring', pp. 12-13"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]"
  - "[[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]]"
used_by:
  - "[[SR 11-7 - Outcomes Analysis and Back-Testing]]"
  - "[[SR 11-7 - Validation of Vendor and Third-Party Models]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - Ongoing Monitoring (SR 11-7)
  - Process Verification
  - Override Analysis
  - Benchmarking (SR 11-7)
---

# SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking

> [!summary]
> The second core element of SR 11-7 validation (§V.2, pp. 12-13) confirms that a model in production "is appropriately implemented and is being used and is performing as intended," and detects when changing products, clients or market conditions require adjustment, redevelopment or replacement. It contains: **process verification** (inputs accurate and complete; code under rigorous quality and change control with audit logs; system-integration checks; special attention to **spreadsheets and other user-developed applications**; reports carrying performance and limitation indicators); **repetition of development tests**, including sensitivity analysis, and monitoring of known operating limits; **override analysis** (frequent or consistently helpful overrides signal a model needing revision); and **benchmarking** against alternative data or models — where discrepancies trigger investigation but are not proof of error, and agreement is evidence that must not give "a false degree of comfort."

## Overview

Monitoring is the bridge between one-off validation and continuous use. It starts "when a model is first implemented in production systems for actual business use" and continues with a frequency tied to the model's nature, data availability and risk.

## Main Content

### Purpose and design of monitoring (p. 12)

> [!definition] Definition: Ongoing Monitoring (SR 11-7, §V.2, p. 12)
> "The second core element of the validation process is ongoing monitoring. Such monitoring confirms that the model is appropriately implemented and is being used and is performing as intended."
>
> It is "essential to evaluate whether changes in products, exposures, activities, clients, or market conditions necessitate adjustment, redevelopment, or replacement of the model and to verify that any extension of the model beyond its original scope is valid." "Any model limitations identified in the development stage should be regularly assessed over time."
>
> **Timing:** "Monitoring begins when a model is first implemented in production systems for actual business use. This monitoring should continue periodically over time, with a frequency appropriate to the nature of the model, the availability of new data or modeling approaches, and the magnitude of the risk involved."
>
> **Program:** "Banks should design a program of ongoing testing and evaluation of model performance along with procedures for responding to any problems that appear. This program should include process verification and benchmarking."
^def-ongoing-monitoring

### Process verification (p. 12)

> [!definition] Definition: Process Verification (SR 11-7, §V.2, p. 12)
> "Process verification checks that all model components are functioning as designed." Its components:
> 1. **Inputs** — "verifying that internal and external data inputs continue to be accurate, complete, consistent with model purpose and design, and of the highest quality available."
> 2. **Code control** — "Computer code implementing the model should be subject to rigorous quality and change control procedures to ensure that the code is correct, that it cannot be altered except by approved parties, and that all changes are logged and can be audited."
> 3. **System integration** — "can be a challenge and deserves special attention because the model processing component often draws from various sources of data, processes large amounts of data, and then feeds into multiple data repositories and reporting systems."
> 4. **User-developed applications** — "User-developed applications, such as spreadsheets or ad hoc database applications used to generate quantitative estimates, are particularly prone to model risk."
> 5. **System updates** — "As the content or composition of information changes over time, systems may need to be updated to reflect any changes in the data or its use."
> 6. **Reports** — "Reports derived from model outputs should be reviewed as part of validation to verify that they are accurate, complete, and informative, and that they contain appropriate indicators of model performance and limitations."
^def-process-verification

Modern equivalents: version control with protected branches and code review (item 2), data validation tests and schema checks on each pipeline run (item 1), end-to-end reproducibility tests (item 3), and banning manual spreadsheet steps between model output and the delivered report (item 4). See [[Modeling as Software Development]].

### Repeating development tests (pp. 12-13)

"Many of the tests employed as part of model development should be included in ongoing monitoring and be conducted on a regular basis to incorporate additional information as it becomes available. New empirical evidence or theoretical research may suggest the need to modify or even replace original methods." "Analysis of the integrity and applicability of internal and external information sources, including information provided by third-party vendors, should be performed regularly" (pp. 12-13).

"Sensitivity analysis and other checks for robustness and stability should likewise be repeated periodically. They can be as useful during ongoing monitoring as they are during model development." And: "If models only work well for certain ranges of input values, market conditions, or other factors, they should be monitored to identify situations where these constraints are approached or exceeded" (p. 13) — i.e. monitor the boundaries found by stress testing ([[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing#^def-stress-testing]]).

### Override analysis (p. 13)

> [!definition] Definition: Override Analysis (SR 11-7, §V.2, p. 13)
> "Ongoing monitoring should include the analysis of overrides with appropriate documentation. In the use of virtually any model, there will be cases where model output is ignored, altered, or reversed based on the expert judgment of model users. Such overrides are an indication that, in some respect, the model is not performing as intended or has limitations. Banks should evaluate the reasons for overrides and track and analyze override performance. If the rate of overrides is high, or if the override process consistently improves model performance, it is often a sign that the underlying model needs revision or redevelopment."
^def-override-analysis

Two diagnostic signals: (a) **override rate** high; (b) **override performance** — if overridden outputs systematically beat the model's original outputs against realised outcomes, the overrides contain information the model lacks. Conversely, overrides that *worsen* outcomes indicate a user-side problem (cf. asymmetric challenge, [[SR 11-7 - Model Development, Implementation and Use#^thm-user-challenge-asymmetry]]).

### Benchmarking (p. 13)

> [!definition] Definition: Benchmarking (SR 11-7, §V.2, p. 13)
> "Benchmarking is the comparison of a given model's inputs and outputs to estimates from alternative internal or external data or models. It can be incorporated in model development as well as in ongoing monitoring."
> - **Examples given:** for credit risk models, "models from vendor firms or industry consortia and data from retail credit bureaus"; pricing models for securities and derivatives "often can be compared with alternative models that are more accurate or comprehensive but also too time consuming to run on a daily basis."
> - **Quality of benchmarks:** "benchmark models should be rigorous and benchmark data should be accurate and complete to ensure a reasonable comparison."
> - **Discrepancies** "should trigger investigation into the sources and degree of the differences, and examination of whether they are within an expected or appropriate range given the nature of the comparison." Results "may suggest revisions to the model."
> - **Interpretation, both directions:** "differences do not necessarily indicate that the model is in error. The benchmark itself is an alternative prediction, and the differences may be due to the different data or methods used. If the model and the benchmark match well, that is evidence in favor of the model, but it should be interpreted with caution so the bank does not get a false degree of comfort."
^def-benchmarking

Why agreement can mislead: two models fitted to the same data with similar structure share the same confounding and the same identification failures, so they agree *and* are both wrong. Benchmarks are most informative when they use **different data or a different identification strategy** — e.g. a randomized experiment benchmarking an observational model ([[Experimental Benchmarks for Observational Ad Measurement]]). Even then the benchmark has its own noise ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]).

## Examples

> [!example] Example: Override tracking in a planning workflow (generic illustration)
> **Setup:** a forecast model produces weekly demand forecasts; planners may override them. Over 26 weeks, 11 forecasts were overridden (42%).
> **Analysis:** compare absolute error of the original model forecast vs the overridden value on those 11 weeks: overrides reduced error in 9 of 11 weeks, mostly in promotion weeks.
> **SR 11-7 reading:** both triggers fire — high override rate and override process "consistently improves model performance." The model "needs revision or redevelopment": promotion effects are missing from the model.
^ex-override-tracking-in-a

> [!example] Example: Process verification failure (generic illustration)
> A model's coefficients are exported to a spreadsheet where an analyst re-scales them into a 0-100 "importance score" for presentation. A copy-paste error shifts one row. The model itself was validated; the reporting component — "particularly prone to model risk" as a user-developed application — was not. SR 11-7 places both in scope (all three components; reports reviewed for accuracy and limitation indicators).
^ex-process-verification-failure

## Connections

- Monitoring for distribution shift: [[Conformal Prediction Under Covariate Shift]]; monitoring of experiments without inflating error: [[The Peeking Problem and Optional Stopping]].
- Benchmarking marketing models against experiments: [[Q - Using Experiment Results as Priors in a Bayesian MMM]], [[Geo-Experiment Methodology - Overview]], [[User-Level Ad Experiments - Overview]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
- Reports with limitation indicators ↔ [[NIST AI RMF 1.0 - Overview]] transparency and documentation outcomes.

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Outcomes Analysis and Back-Testing]] — the third element
- [[SR 11-7 - Validation of Vendor and Third-Party Models]] — where benchmarking substitutes for code access
