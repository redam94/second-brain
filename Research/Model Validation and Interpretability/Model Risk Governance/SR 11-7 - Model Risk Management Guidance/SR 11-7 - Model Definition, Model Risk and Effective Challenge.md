---
title: SR 11-7 - Model Definition, Model Risk and Effective Challenge
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/definition
  - type/concept
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §III Overview of Model Risk Management, pp. 3-5, incl. footnote 3 (p. 3)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Model Risk Management Guidance - Overview]]"
used_by:
  - "[[SR 11-7 - Model Development, Implementation and Use]]"
  - "[[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]"
  - "[[SR 11-7 - Governance Roles, Policies, Internal Audit and External Resources]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - SR 11-7 Model Definition
  - Model Risk (SR 11-7)
  - Effective Challenge
  - Effective Challenge of Models
  - Aggregate Model Risk
---

# SR 11-7 - Model Definition, Model Risk and Effective Challenge

> [!summary]
> §III of SR 11-7 sets the vocabulary of the whole guidance. A **model** is any quantitative method that turns input data and assumptions into quantitative estimates, and has three components: **input, processing, reporting**; judgment-based inputs are included if the output is quantitative. **Model risk** is the potential for adverse consequences from decisions based on incorrect or misused model outputs; it arises from (1) **fundamental error** and (2) **incorrect or inappropriate use**, grows with complexity, input uncertainty, breadth of use and impact, and must be assessed **in aggregate** across models sharing data, assumptions or methods. The guiding principle for managing it is **effective challenge**, which requires *incentives, competence and influence* together. Because model risk cannot be eliminated, limits on use, monitoring, revision, supplementary analysis and informed conservatism are also needed; intensity scales with materiality.

## Overview

This section answers three questions: what is in scope (the model definition), what can go wrong (model risk), and what the core management principle is (effective challenge). Everything later in SR 11-7 — development standards, the three validation elements, governance roles — is an elaboration of these definitions.

## Main Content

### What counts as a model (p. 3)

> [!definition] Definition: Model (SR 11-7, §III, p. 3)
> "the term model refers to a quantitative method, system, or approach that applies statistical, economic, financial, or mathematical theories, techniques, and assumptions to process input data into quantitative estimates."
>
> A model "consists of three components":
> 1. "an information input component, which delivers assumptions and data to the model";
> 2. "a processing component, which transforms inputs into estimates";
> 3. "a reporting component, which translates the estimates into useful business information."
>
> "The definition of model also covers quantitative approaches whose inputs are partially or wholly qualitative or based on expert judgment, provided that the output is quantitative in nature."
^def-model

**Listed uses** of models meeting the definition (p. 3): analysing business strategies, informing business decisions, identifying and measuring risks, valuing exposures/instruments/positions, stress testing, assessing capital adequacy, managing client assets, measuring compliance with internal limits, maintaining the formal control apparatus, and financial/regulatory reporting and public disclosures.

**Footnote 3 (p. 3).** More qualitative approaches that do *not* meet the model definition are "outside the scope of this guidance" but "should also be subject to a rigorous control process."

Two practical consequences:
- The **reporting layer is part of the model**. A dashboard that converts coefficients into a score, a ranking or a "driver importance" chart is in scope (and §V p. 9 confirms "All model components, including input, processing, and reporting, should be subject to validation").
- **Judgmental overlays are not exempt**: if expert judgment produces a number, it is a model.

### Models as simplifications; quality is use-specific (p. 3)

Models are "simplified representations of real-world relationships among observed characteristics, values, and events." Simplification is both inevitable (reality is complex) and "intentional, to focus attention on particular aspects considered to be most important for a given model application."

> [!definition] Definition: Dimensions of Model Quality (SR 11-7, §III, p. 3)
> "Model quality can be measured in many ways: precision, accuracy, discriminatory power, robustness, stability, and reliability, to name a few." The appropriate metric depends on use: "precision and accuracy are relevant for models that forecast future values, while discriminatory power applies to models that rank order risks." "Models are never perfect," and "In all situations, it is important to understand a model's capabilities and limitations given its simplifications and assumptions."
^def-model-quality

This matters because a model validated for one quality dimension (e.g. forecast accuracy) is not thereby validated for another (e.g. correct ranking of drivers) — see [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] for the analogous prediction-vs-explanation split.

### Model risk and its two sources (pp. 3-4)

> [!definition] Definition: Model Risk (SR 11-7, §III, pp. 3-4)
> "The use of models invariably presents model risk, which is the potential for adverse consequences from decisions based on incorrect or misused model outputs and reports. Model risk can lead to financial loss, poor business and strategic decision making, or damage to a bank's reputation." It "occurs primarily for two reasons":
>
> **(1) Fundamental error.** "The model may have fundamental errors and may produce inaccurate outputs when viewed against the design objective and intended business uses." The modelling exercise involves "application of theory, choice of sample design and numerical routines, selection of inputs and estimation, and implementation in information systems. Errors can occur at any point from design through implementation." Shortcuts, simplifications or approximations "could compromise the integrity and reliability of outputs," and "errors in inputs or incorrect assumptions will lead to inaccurate outputs."
>
> **(2) Incorrect or inappropriate use.** "Even a fundamentally sound model producing accurate outputs consistent with the design objective of the model may exhibit high model risk if it is misapplied or misused." "Models by their nature are simplifications of reality, and real-world events may prove those simplifications inappropriate." This is "even more of a concern if a model is used outside the environment for which it was designed" — intentionally ("as they apply existing models to new products or markets") or "inadvertently as market conditions or customer behavior changes."
^def-model-risk

**Limitations** (p. 4) have two origins: "weaknesses in the model due to its various shortcomings, approximations, and uncertainties," and "assumptions underlying a model that may restrict the scope to a limited set of specific circumstances and situations." "Decision makers need to understand the limitations of a model to avoid using it in ways that are not consistent with the original intent."

The second source — misuse of a sound model — is the one most often missed in practice. A forecasting model that is accurate on total sales can still be *misused* if its coefficients are read as causal effects (cf. [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]), and a model can drift out of its design environment silently (cf. [[Conformal Prediction Under Covariate Shift]]).

### Managing model risk like other risks (p. 4)

> [!definition] Definition: Drivers of Model Risk and Aggregate Model Risk (SR 11-7, §III, p. 4)
> "Model risk should be managed like other types of risk. Banks should identify the sources of risk and assess the magnitude." Model risk **increases with**: "greater model complexity, higher uncertainty about inputs and assumptions, broader use, and larger potential impact."
>
> "Banks should consider risk from individual models and in the aggregate. Aggregate model risk is affected by interaction and dependencies among models; reliance on common assumptions, data, or methodologies; and any other factors that could adversely affect several models and their outputs at the same time."
^def-aggregate-model-risk

Implication: a family of models fitted from one pipeline to one shared data feed is *one correlated risk*, not many independent ones — a systematic pipeline error corrupts every member at once.

### Effective challenge (p. 4)

> [!definition] Definition: Effective Challenge (SR 11-7, §III, p. 4)
> "A guiding principle for managing model risk is 'effective challenge' of models, that is, critical analysis by objective, informed parties who can identify model limitations and assumptions and produce appropriate changes. Effective challenge depends on a combination of incentives, competence, and influence."
> - **Incentives** — "stronger when there is greater separation of that challenge from the model development process and when challenge is supported by well-designed compensation practices and corporate culture."
> - **Competence** — "a key to effectiveness since technical knowledge and modeling skills are necessary to conduct appropriate analysis and critique."
> - **Influence** — "challenge may fail to be effective without the influence to ensure that actions are taken to address model issues. Such influence comes from a combination of explicit authority, stature within the organization, and commitment and support from higher levels of management."
^def-effective-challenge

The three are jointly necessary. A competent reviewer with no authority, an authoritative reviewer rewarded for the model's adoption, or a well-intentioned but non-technical reviewer each fail the test. The same triad reappears for validators (§V, pp. 9-10; see [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]) and for internal audit (§VI, p. 19).

### Residual risk: other tools and informed conservatism (pp. 4-5)

> [!theorem] Principle: Model Risk Cannot Be Eliminated (SR 11-7, §III, pp. 4-5)
> "Even with skilled modeling and robust validation, model risk cannot be eliminated, so other tools should be used to manage model risk effectively. Among these are establishing limits on model use, monitoring model performance, adjusting or revising models over time, and supplementing model results with other analysis and information. Informed conservatism, in either the inputs or the design of a model or through explicit adjustments to outputs, can be an effective tool, though not an excuse to avoid improving models."
^thm-model-risk-not-eliminable

The four residual-risk tools:
1. limits on model use;
2. performance monitoring;
3. adjustment/revision over time;
4. supplementing outputs with other analysis and information;

plus **informed conservatism** (inputs, design or explicit output adjustments) — elaborated and constrained in §IV ([[SR 11-7 - Model Development, Implementation and Use#^thm-conservatism-must-be-demonstrated]]).

### Materiality and the three elements (p. 5)

Materiality governs intensity (see [[SR 11-7 - Model Risk Management Guidance - Overview#^def-proportionality]]). §III closes by naming the three elements developed in the rest of the document: (1) "robust model development, implementation, and use"; (2) "a sound model validation process"; (3) "governance, which sets an effective framework with defined roles and responsibilities for clear communication of model limitations and assumptions, as well as the authority to restrict model usage."

## Examples

> [!example] Example: Is it a model? (generic illustrations)
> - A spreadsheet that multiplies last year's channel ROIs by planned spend to forecast next quarter's sales: **yes** — inputs (ROIs, spend), processing (multiplication and summation), reporting (forecast). Being a spreadsheet makes it *more* risky, not exempt (§V p. 12).
> - An analyst's judgmental 1-10 rating of each campaign that is then averaged into a score: **yes** — "inputs ... partially or wholly qualitative or based on expert judgment" with quantitative output.
> - A purely narrative strategic assessment: **no** — but footnote 3 still requires "a rigorous control process."
^ex-is-it-a-model

> [!example] Example: The two sources of model risk for a weekly response model (generic illustration)
> **Fundamental error:** an adstock transformation is coded with the decay applied in the wrong direction; outputs are wrong for every use. **Misuse:** the model was built to forecast total weekly sales, and its predictive feature importances are later reported as each channel's "impact"; the model is accurate for its design objective, but the use is outside it. **Aggregate risk:** forty such models for forty segments share the same coding error and data feed — one defect, forty wrong outputs.
^ex-the-two-sources-of

## Connections

- The use-outside-the-design-environment source of risk (a model "used outside the environment for which it was designed") is the governance face of distribution shift: [[Conformal Prediction Under Covariate Shift]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].
- Effective challenge supplies the organisational answer to the statistical problems in [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]] and [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
- Many equally accurate models with different explanations (the Rashomon effect) is a specific "limitation" that conceptual-soundness review should surface: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]] — source map
- [[SR 11-7 - Model Development, Implementation and Use]] — pillar 1
- [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]] — effective challenge applied to validators
- [[NIST AI RMF 1.0 - Overview]] — broader notion of AI risk
