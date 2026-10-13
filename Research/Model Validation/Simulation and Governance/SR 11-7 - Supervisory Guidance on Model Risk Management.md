---
title: "SR 11-7 - Supervisory Guidance on Model Risk Management"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk
  - type/concept
  - doc/reference
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "external framework"
citation: "Board of Governors of the Federal Reserve System & Office of the Comptroller of the Currency (2011). Supervisory Guidance on Model Risk Management (SR Letter 11-7 / OCC Bulletin 2011-12)."
date_ingested: 2026-10-13
folder: "Model Validation/Simulation and Governance"
doc_type: reference
depends_on:
  - "[[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]"
  - "[[Model Checking]]"
used_by:
  - "[[NIST AI RMF 1.0 - AI Risk Management Framework]]"
aliases:
  - "SR 11-7"
  - "SR 11-7 model risk management"
  - "Supervisory Guidance on Model Risk Management"
  - "OCC 2011-12"
---

# SR 11-7 - Supervisory Guidance on Model Risk Management

> [!summary]
> SR 11-7, issued in 2011 by the US Federal Reserve and the OCC, is the reference framework for managing **model risk** — the possibility of adverse consequences from decisions based on incorrect or misused model outputs. It rests on three pillars: sound development and use, **independent validation** (conceptual soundness, ongoing monitoring, outcomes analysis), and governance (policies, roles, a model inventory, documentation). Though written for banks, it is widely used as a template for governing any model whose outputs drive business decisions.

## Overview

**Citation:** Board of Governors of the Federal Reserve System & Office of the Comptroller of the Currency (2011), *Supervisory Guidance on Model Risk Management*, SR Letter 11-7 (OCC Bulletin 2011-12). External framework, cited here for structure rather than as reviewed literature.

**Context:** Following the financial crisis, regulators formalized expectations for how banks build, validate and oversee quantitative models used in lending, valuation, risk measurement and stress testing. The guidance is principles-based and deliberately general, so it transfers readily to marketing, forecasting and machine-learning models.

## Main Content

> [!definition] Model and model risk (SR 11-7)
> A **model** is a quantitative method, system or approach that applies statistical, economic, financial or mathematical theories, techniques and assumptions to process input data into quantitative estimates. It has three components: an information input component, a processing component, and a reporting component that turns estimates into business information.
> **Model risk** is the potential for adverse consequences from decisions based on incorrect or misused model outputs and reports. It arises from two sources: (1) the model has **fundamental errors** (in theory, design, data or implementation) and produces inaccurate outputs relative to its purpose; (2) the model is **used incorrectly or inappropriately**, including outside the conditions it was designed for.
^def-model-risk

> [!definition] Effective challenge
> The guiding principle of model risk management: critical analysis by objective, informed parties who can identify model limitations and assumptions and produce appropriate changes. Effective challenge depends on **incentives** (independence from development, compensation and stature), **competence** (technical knowledge), and **influence** (the authority to have findings acted on).
^def-effective-challenge

### Pillar 1 — Model development, implementation and use

Clear statement of purpose; sound theory and methodology; rigorous assessment of data quality and relevance; testing of the model's accuracy, robustness, stability and limitations under a range of inputs (including extreme ones); documentation sufficient for an unfamiliar party to understand the model. Use should be consistent with the model's design, with awareness of uncertainty — conservative adjustments or overlays where outputs are uncertain.

### Pillar 2 — Model validation

Validation is the set of activities that verify a model performs as expected, in line with its design objectives and business uses, and should be performed by staff independent of development. Its three core elements:

1. **Evaluation of conceptual soundness** — review of design, theory, assumptions, data and variable selection, with developmental evidence; sensitivity analysis.
2. **Ongoing monitoring** — confirming the model is implemented correctly and continues to perform as intended as products, exposures and markets change; includes **process verification** and **benchmarking** against alternative models or data.
3. **Outcomes analysis** — comparison of model outputs with actual outcomes, including **back-testing** on out-of-sample data and analysis of whether errors fall within expected ranges.

Validation applies to vendor and third-party models as well, even when proprietary details are unavailable; then sensitivity analysis and benchmarking carry more weight. Validation should be periodic (at least annually reviewed) and repeated after material changes.

### Pillar 3 — Governance, policies and controls

Board and senior-management oversight; written policies defining roles and responsibilities (owners, developers, users, validators, internal audit); a comprehensive **model inventory** recording each model's purpose, use, limitations and validation status; documentation standards; and internal-audit review of the whole framework. Model risk should be managed in aggregate as well as model by model.

## Key Passages

The raw source records no verbatim passages from SR 11-7; it was cited to structure a model-inventory and independent-validation-gate plan.

## Implications for Model Validation

- **Inventory every model that drives a decision**, with its purpose, intended use, known limitations (e.g. not causal, small samples per segment) and validation status.
- **Separate building from validating.** An independent reviewer with the authority to block release is the core control; developer self-assessment is not validation.
- **Conceptual soundness first:** ask whether a predictive model is being used for a causal purpose (ranking what to change), which is a misuse risk in SR 11-7's sense — see [[Dillon et al - SHAP Predictive Models and Causal Insights]].
- **Outcomes analysis = honest back-testing** with time-ordered holdouts ([[Bergmeir et al 2018 - Cross-Validation for Time Series]]) and, where possible, comparison with experiments ([[Gordon et al 2019 - Advertising Measurement at Facebook]]).
- **Benchmarking** against simpler models and against simulated ground truth ([[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]], [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]]).
- **Ongoing monitoring** for drift and for metric gaming once outputs become targets ([[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]]).

## Connections

- Complementary, broader AI framework: [[NIST AI RMF 1.0 - AI Risk Management Framework]].
- Evidence about how model outputs go wrong: [[Riley et al 2020 - Sample Size for Prediction Models]], [[Simmons et al 2011 - False-Positive Psychology]], [[Fisher et al 2019 - Model Class Reliance]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations]].

## See Also

- [[NIST AI RMF 1.0 - AI Risk Management Framework]] — Govern/Map/Measure/Manage structure for AI systems
- [[Model Checking]] — statistical tools for conceptual-soundness and fit review
- [[Model Comparison]] — benchmarking among candidate models
- [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]] — rigorous benchmarking against known truth
- [[Operational Risk Modeling with ABM]] — related risk-modelling material in the vault
