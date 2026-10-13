---
title: "NIST AI RMF 1.0 - AI Risk Management Framework"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk
  - type/concept
  - doc/reference
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "external framework"
citation: "National Institute of Standards and Technology (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0). NIST AI 100-1. U.S. Department of Commerce."
date_ingested: 2026-10-13
folder: "Model Validation/Simulation and Governance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Supervisory Guidance on Model Risk Management]]"
  - "[[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]"
used_by: []
aliases:
  - "NIST AI RMF"
  - "AI RMF 1.0"
  - "NIST AI 100-1"
  - "AI Risk Management Framework"
---

# NIST AI RMF 1.0 - AI Risk Management Framework

> [!summary]
> The NIST AI Risk Management Framework (January 2023) is a voluntary, sector-neutral framework for managing risks from AI systems across their life cycle. It defines the characteristics of trustworthy AI — with **valid and reliable** as the foundation — and organises risk management into four functions: **Govern, Map, Measure, Manage**. For predictive and media-analytics models, it complements SR 11-7 by adding explicit attention to context of use, measurement of trustworthiness, and post-deployment monitoring.

## Overview

**Citation:** National Institute of Standards and Technology (2023). *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1. External framework, cited for structure rather than as reviewed literature.

**Context:** Developed by NIST under a congressional mandate through an open, consensus-driven process, the framework is non-binding and use-case agnostic. It is accompanied by a companion **Playbook** of suggested actions and supports **profiles** that tailor the framework to particular sectors or applications. Part 1 frames AI risk and trustworthiness; Part 2 is the Core of functions, categories and subcategories.

## Main Content

> [!definition] Characteristics of trustworthy AI
> NIST lists seven characteristics, to be balanced against each other in context:
> 1. **Valid and reliable** — the system fulfils its intended requirements (validation) and performs consistently without failure under expected conditions; accuracy and robustness are part of this. It is the base on which the others rest.
> 2. **Safe**
> 3. **Secure and resilient**
> 4. **Accountable and transparent**
> 5. **Explainable and interpretable**
> 6. **Privacy-enhanced**
> 7. **Fair, with harmful bias managed**
^def-trustworthy-ai

> [!definition] The four core functions
> - **Govern** — a cross-cutting function that establishes a culture of risk management: policies, accountability structures, roles, workforce competence, and processes for engaging stakeholders and managing third-party risk. It informs and is infused through the other three.
> - **Map** — establishes context: the intended purpose and setting of use, the people affected, the system's capabilities and limitations, and the assumptions it relies on; identifies risks and benefits before deployment.
> - **Measure** — uses quantitative and qualitative methods to analyse, assess, benchmark and monitor AI risks and trustworthiness characteristics, including testing, evaluation, verification and validation (TEVV) before and after deployment, and tracking of emergent risks.
> - **Manage** — allocates resources to mapped and measured risks: prioritising and treating risks, deciding whether to deploy, monitoring in production, responding to incidents, and decommissioning where needed.
>
> The functions are iterative rather than a strict sequence.
^def-ai-rmf-functions

### Notable themes

- **Risks are socio-technical:** they depend on how outputs are interpreted and used, not just on the model's statistics.
- **Measurement is hard:** the framework acknowledges that AI risks may be difficult to measure, that metrics may be gamed or fail to capture what matters, and that laboratory performance may differ from performance in deployment.
- **Explainability ≠ validity:** interpretability is a separate characteristic; an explanation can be clear and still describe a model that is not valid for the intended use.
- **Human oversight and documentation** of intended use, limitations and known failure modes are expected throughout.

## Key Passages

The raw source records no verbatim passages from the AI RMF; it was cited together with SR 11-7 to structure a model-inventory and independent-validation-gate plan.

## Implications for Model Validation

- **Map before Measure.** Write down what decision each model output feeds (e.g. ranking which drivers to change, forecasting a KPI under a plan) and whether that use requires causal validity; a predictive model used for intervention is a context mismatch ([[Janzing et al 2020 - Feature Relevance Is a Causal Problem]], [[Dillon et al - SHAP Predictive Models and Causal Insights]]).
- **Measure validity with ground truth:** time-ordered back-tests ([[Bergmeir et al 2018 - Cross-Validation for Time Series]]), simulation with known effects ([[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]], [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]]), and experiments ([[Gordon et al 2019 - Advertising Measurement at Facebook]]).
- **Measure stability, not just accuracy:** whether importance rankings survive resampling ([[Meinshausen and Buhlmann 2010 - Stability Selection]]) and whether equally good models disagree ([[Fisher et al 2019 - Model Class Reliance]]).
- **Manage gaming and drift** once outputs become targets ([[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]]).
- **Govern:** keep an inventory and an independent release gate, mirroring [[SR 11-7 - Supervisory Guidance on Model Risk Management]].

## Connections

- Banking-sector predecessor focused on validation mechanics: [[SR 11-7 - Supervisory Guidance on Model Risk Management]].
- Interpretability limits: [[Kumar et al 2020 - Problems with Shapley-Value Explanations]].
- Overfitting and analytic flexibility as validity risks: [[Riley et al 2020 - Sample Size for Prediction Models]], [[Simmons et al 2011 - False-Positive Psychology]].

## See Also

- [[SR 11-7 - Supervisory Guidance on Model Risk Management]] — three-pillar model risk framework
- [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]] — rigorous TEVV via simulation
- [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] — why metrics degrade when optimized
- [[Model Checking]] — statistical validation tools
