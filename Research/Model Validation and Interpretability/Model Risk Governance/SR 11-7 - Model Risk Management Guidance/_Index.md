---
title: "Index: SR 11-7 - Model Risk Management Guidance"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
parent: "[[../_Index|Model Risk Governance]]"
date_updated: 2026-10-13
concept_count: 10
---

# SR 11-7 - Model Risk Management Guidance

> [!abstract] Routing Summary
> This folder covers the Federal Reserve / OCC Supervisory Guidance on Model Risk Management (SR Letter 11-7, April 4, 2011; 21 pp.), section by section, plus a generic application to marketing analytics. Contains 10 notes spanning the model and model-risk definitions, effective challenge, development and use standards, validation (independence, the pre-use gate, conceptual soundness, ongoing monitoring, outcomes analysis/back-testing, vendor models) and governance (board, policies, roles, internal audit, external resources, inventory, documentation).
> - Need the source map, scope, proportionality, prior guidance? → [[SR 11-7 - Model Risk Management Guidance - Overview]]
> - Need what counts as a model, model risk, aggregate risk, effective challenge, conservatism as a residual tool? → [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]
> - Need development standards, data/proxies, testing, user-challenge asymmetry, ranges vs point estimates, conservatism? → [[SR 11-7 - Model Development, Implementation and Use]]
> - Need validation definition, independence, validator authority, the pre-use gate, annual review, three core elements? → [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]
> - Need conceptual soundness, sensitivity analysis, stress testing? → [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]]
> - Need process verification, code control, spreadsheets, override analysis, benchmarking? → [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]]
> - Need outcomes analysis, back-testing definition, VaR example, parallel analysis, early warning, thresholds? → [[SR 11-7 - Outcomes Analysis and Back-Testing]]
> - Need vendor/third-party model validation? → [[SR 11-7 - Validation of Vendor and Third-Party Models]]
> - Need board, policy contents, owner/control/compliance roles, internal audit, external resources? → [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]]
> - Need inventory fields, documentation standard, validation report contents? → [[SR 11-7 - Model Inventory and Documentation Standards]]
> - Need how this applies to MMM / attribution / driver models? → [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Two costs of models | [[SR 11-7 - Model Risk Management Guidance - Overview]] | definition | — | direct (build) vs indirect (bad decisions) costs (p. 1) |
| Proportionality / materiality | [[SR 11-7 - Model Risk Management Guidance - Overview]] | principle | — | rigor commensurate with exposure, complexity, extent of use (pp. 2, 5) |
| Model (3 components) | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] | definition | — | input, processing, reporting; judgmental inputs included (p. 3) |
| Model quality dimensions | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] | definition | model | accuracy for forecasts, discriminatory power for rankings (p. 3) |
| Model risk (2 sources) | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] | definition | model | fundamental error; incorrect/inappropriate use (pp. 3-4) |
| Aggregate model risk | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] | definition | model risk | shared data/assumptions/methods correlate failures (p. 4) |
| Effective challenge | [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] | definition | — | incentives + competence + influence (p. 4) |
| Development standards | [[SR 11-7 - Model Development, Implementation and Use]] | standard | model | purpose, theory, alternatives, data, testing (pp. 5-7) |
| No single test suffices | [[SR 11-7 - Model Development, Implementation and Use]] | principle | testing | apply a variety of tests (p. 6) |
| User-challenge asymmetry | [[SR 11-7 - Model Development, Implementation and Use]] | principle | effective challenge | users rarely challenge favourable outcomes (p. 7) |
| Conservatism must be demonstrated | [[SR 11-7 - Model Development, Implementation and Use]] | principle | model uncertainty | extreme point of a misspecified distribution is not conservative (p. 8) |
| Model validation; independence | [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] | definition | effective challenge | no stake in verdict; judged by actions and outcomes (p. 9) |
| Validation gate | [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] | rule / algorithm | validation | deficiencies → no use, tight constraints, or rejection (p. 10) |
| Annual review; error thresholds | [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] | standard | validation | at least annual; redevelop if outcomes consistently outside range (p. 10) |
| Three core elements | [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] | definition | validation | soundness, monitoring, outcomes (p. 11) |
| Conceptual soundness | [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] | definition | three elements | review developmental evidence, alternatives, assumptions by impact (p. 11) |
| Sensitivity analysis; stress testing | [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] | definition | conceptual soundness | small changes → expected range; extremes → boundaries (p. 11) |
| Process verification | [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] | definition | ongoing monitoring | inputs, code change control, spreadsheets, reports (p. 12) |
| Override analysis | [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] | definition | ongoing monitoring | high or helpful overrides → redevelop (p. 13) |
| Benchmarking | [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] | definition | ongoing monitoring | benchmark is an alternative prediction; beware false comfort (p. 13) |
| Outcomes analysis; parallel analysis | [[SR 11-7 - Outcomes Analysis and Back-Testing]] | definition | three elements | range of tests; adjusted model must beat original (pp. 13-14) |
| Back-testing | [[SR 11-7 - Outcomes Analysis and Back-Testing]] | definition | outcomes analysis | out-of-development period, horizon-matched; holdout is not a substitute (p. 14) |
| VaR back-test | [[SR 11-7 - Outcomes Analysis and Back-Testing]] | example | back-testing | frequency + clustering + other percentiles (pp. 14-15) |
| Limited back-testing rule | [[SR 11-7 - Outcomes Analysis and Back-Testing]] | rule | back-testing | more scrutiny of limitations; inform senior management (p. 15) |
| Vendor model validation | [[SR 11-7 - Validation of Vendor and Third-Party Models]] | rule | three elements | validate own use; sensitivity + benchmarking; own outcomes (pp. 15-16) |
| Board, policies, roles | [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] | standard | effective challenge | owner accountable; control staff can restrict use (pp. 16-19) |
| Internal audit; external resources | [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] | standard | roles | audit evaluates, does not duplicate; internal party evaluates external work (pp. 19-20) |
| Model inventory | [[SR 11-7 - Model Inventory and Documentation Standards]] | definition | governance | firm-wide; variants as separate entries; 12 fields (p. 20) |
| Documentation; validation reports | [[SR 11-7 - Model Inventory and Documentation Standards]] | definition | governance | understandable by unfamiliar parties; executive summary (p. 21) |
| Marketing application | [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] | application | all above | gate + pre-registered criteria + known-truth simulation + experiment benchmarks |

## Notes

- [[SR 11-7 - Model Risk Management Guidance - Overview]] — CONTAINS: document metadata; two costs of models (^def-two-costs); proportionality (^def-proportionality); §I intro, fn. 1, §II purpose and scope, fn. 2 prior guidance, §VII conclusion; framework diagram; full Source Map; lifecycle example.
- [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]] — CONTAINS: model definition (^def-model) and listed uses; fn. 3; model quality dimensions (^def-model-quality); model risk two sources (^def-model-risk); limitations; drivers and aggregate model risk (^def-aggregate-model-risk); effective challenge (^def-effective-challenge); residual-risk tools and informed conservatism (^thm-model-risk-not-eliminable); materiality and three pillars; examples "is it a model?" and two sources of risk.
- [[SR 11-7 - Model Development, Implementation and Use]] — CONTAINS: §IV intro; fn. 4; development requirements (^def-development-requirements); data quality/proxies (^def-data-standard); testing standard (^def-testing-standard); no single test (^thm-no-single-test); judgmental adjustments; systems integration; model use; user-challenge asymmetry (^thm-user-challenge-asymmetry); reports; model uncertainty (^def-model-uncertainty); fn. 5; conservatism (^thm-conservatism-must-be-demonstrated); development checklist and asymmetric-challenge examples.
- [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] — CONTAINS: validation definition and scope (^def-model-validation); independence (^def-validation-independence); incentives/competence/influence table; validation gate (^thm-validation-gate) and decision algorithm (^alg-validation-gate); ongoing validation and annual review (^def-ongoing-validation); error thresholds (^def-error-thresholds); three core elements (^def-three-elements); examples.
- [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] — CONTAINS: conceptual soundness (^def-conceptual-soundness, ^def-conceptual-soundness-scope); sensitivity analysis (^def-sensitivity-analysis) with formal reading; stress testing (^def-stress-testing); plan for results (^thm-plan-for-results); qualitative judgment; collinearity and boundary examples.
- [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]] — CONTAINS: ongoing monitoring (^def-ongoing-monitoring); process verification six components (^def-process-verification); repeated tests and monitored limits; override analysis (^def-override-analysis); benchmarking (^def-benchmarking); override and spreadsheet examples.
- [[SR 11-7 - Outcomes Analysis and Back-Testing]] — CONTAINS: outcomes analysis (^def-outcomes-analysis); range of tests (^thm-range-of-tests); parallel outcomes analysis (^def-parallel-outcomes); back-testing (^def-backtesting) formalised; VaR example (^ex-var-backtest); test the model (^thm-test-the-model); early warning (^def-early-warning); predetermined thresholds (^thm-predetermined-thresholds); limited back-testing (^thm-limited-backtesting); quarterly-forecast and parallel-analysis examples.
- [[SR 11-7 - Validation of Vendor and Third-Party Models]] — CONTAINS: vendor obligations (^def-vendor-obligations); validate own use (^thm-validate-own-use); in-house knowledge and contingency (^def-vendor-contingency); related §VI requirements; black-box validation table; vendor tool example.
- [[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]] — CONTAINS: §VI intro; board and senior management (^def-board-senior-mgmt); policies (^def-policies) and checklist (^alg-policy-checklist); ownership/controls/compliance roles (^def-roles); internal audit (^def-internal-audit); external resources (^def-external-resources); small-team role mapping example.
- [[SR 11-7 - Model Inventory and Documentation Standards]] — CONTAINS: model inventory definition (^def-model-inventory); inventory field table (^tbl-inventory-fields); documentation standard (^def-documentation-standard); who documents (^def-who-documents); validation reports (^def-validation-report) and template (^alg-validation-report); inventory example for regional model family.
- [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] — CONTAINS: why attribution is a hard case; 16-row element mapping table; three governance devices (gate, pre-registered criteria, known-truth simulation); generic red flags; MMM acceptance protocol example; override example.

## Sources

- [[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]] — SR Letter 11-7 Attachment, Board of Governors of the Federal Reserve System and OCC, April 4, 2011 (all notes).

## See Also

- [[NIST AI RMF 1.0 - Overview]] — sibling framework for AI systems
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — designing known-truth validation studies
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — why MMM validation is hard
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — statistical case for independent validation
- [[Forecast Evaluation and Backtesting]] — outcomes-analysis toolkit
