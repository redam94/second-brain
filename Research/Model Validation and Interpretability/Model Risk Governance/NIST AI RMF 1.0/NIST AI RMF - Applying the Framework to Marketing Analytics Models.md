---
title: "NIST AI RMF - Applying the Framework to Marketing Analytics Models"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - topic/marketing-measurement
  - type/example
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "Synthesis applying NIST AI 100-1 (Jan 2023) §§1-6 and Tables 1-4 (printed pp. 4-34) and Appendices A-C (pp. 35-41) to marketing-analytics models; the crosswalk and examples are vault illustrations, not NIST content"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - Core Structure and the GOVERN Function]]"
  - "[[NIST AI RMF - MAP Function]]"
  - "[[NIST AI RMF - MEASURE Function]]"
  - "[[NIST AI RMF - MANAGE Function]]"
used_by:
  - "[[NIST AI RMF 1.0 - Overview]]"
aliases:
  - AI RMF for Marketing Models
  - AI RMF and SR 11-7 Crosswalk
  - AI RMF Validation Checklist
---

# NIST AI RMF - Applying the Framework to Marketing Analytics Models

> [!summary]
> This note works through the AI RMF Core for typical marketing-analytics models: media-mix models, per-segment driver models built with tree ensembles and SHAP, and demand forecasts. Under the framework's definition, all of these are "AI systems" (they generate predictions or recommendations that influence decisions). The note gives (1) a worked GOVERN→MAP→MEASURE→MANAGE pass over a driver-analysis model, (2) a crosswalk from AI RMF subcategories to SR 11-7 model-risk concepts, and (3) a validation checklist built from the subcategories most relevant to statistical validity. The central lesson is that the Core makes a team state **which use** the model is valid for, so that predictive accuracy is not used as evidence of causal validity. Everything here is a vault illustration that applies the source. None of it is NIST text.
^summary

## Overview

The AI RMF is sector-agnostic and written mostly with human-facing AI in mind. Marketing models are usually aggregate and not human-facing, so §1.2.3 suggests "lower initial prioritization." Their main harms fall in Fig. 1's middle column (harm to an organization through misallocation). They still face every measurement challenge in §1.2.1. In particular, the ground truth for attribution "may either not exist or not be available" (Appendix B).

## Main Content

### Crosswalk: AI RMF ↔ SR 11-7

| SR 11-7 concept | AI RMF counterpart | What the AI RMF adds |
|---|---|---|
| Independent validation / effective challenge | Fig. 3 separation; App. A tester ≠ validator; MEASURE 1.3 | Second separation layer; external and affected parties consulted |
| Model inventory | GOVERN 1.6 | Decommissioning (GOVERN 1.7) |
| Board and senior management oversight | GOVERN 2.3 | Workforce diversity (GOVERN 3) |
| Conceptual soundness | MAP 2.3 (scientific integrity, construct validation); MEASURE 2.9 | Explicit construct validation |
| Outcomes analysis, back-testing | MEASURE 2.3, 2.5 | "Conditions similar to deployment"; generalization limits documented |
| Ongoing monitoring | MEASURE 2.4, 3.1; MANAGE 4.1 | Emergent and unanticipated risks; feedback from users |
| Model limitations, use restrictions | MAP 2.2, 3.3; MANAGE 1.3-1.4 | Residual risk communicated to end users |
| Vendor models | GOVERN 6; MAP 4; MANAGE 3 | Pre-trained models monitored (MANAGE 3.2) |
| Overrides | MANAGE 4.1; App. C | Research call on human incentives to challenge |
| (not covered) | §3.5-3.7; MEASURE 2.8-2.12 | Explainability, privacy, fairness, environment |
| (implicit) | MEASURE 1.1, 3.2 | Document unmeasurable risks |
| (implicit) | MEASURE 2.13, 4.x | Evaluate the validation process itself |

### Validation checklist derived from the Core

> [!algorithm] Statistical-Model Validation Checklist (vault synthesis from Tables 1-4)
> 1. **Inventory and tier** the model (GOVERN 1.3, 1.6). Set the review frequency (GOVERN 1.5).
> 2. **State the intended use and estimand** (MAP 1.1). Classify it as forecasting, causal effect, or ranking (MAP 2.1).
> 3. **Document knowledge limits**: data range, sample size, identification (MAP 2.2). Check sample-size adequacy ([[Riley et al 2020 - Sample Size for Prediction Models - Overview]]).
> 4. **Argue construct validity** of every reported quantity (MAP 2.3).
> 5. **Write the scope statement**: what the model must not be used for (MAP 3.3).
> 6. **List unmeasurable risks** (MEASURE 1.1).
> 7. **Assign an independent reviewer** (MEASURE 1.3).
> 8. **Document the test design**: out-of-time splits, metrics, tools (MEASURE 2.1). Use time-series-appropriate CV ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]). Guard against spurious fits of trending series ([[Granger 2003 - Spurious Regression and Cointegration - Overview]]).
> 9. **Demonstrate validity for the intended use** (MEASURE 2.3, 2.5). For causal uses, check recovery in known-truth simulation ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) or against experiments.
> 10. **Validate explanations** (MEASURE 2.9). Check stability across refits and the Rashomon set. Check that correlated features are not driving permutation artefacts ([[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]]).
> 11. **Evaluate the checks themselves** (MEASURE 2.13).
> 12. **Decide**: proceed, restrict, or stop (MANAGE 1.1). Choose a response (MANAGE 1.3). Document residual risk (MANAGE 1.4). Consider non-AI alternatives such as experiments (MANAGE 2.1).
> 13. **Monitor**: drift, incidents, overrides (MEASURE 2.4, 3.1; MANAGE 4.1-4.3). Retire the model when it is stale (GOVERN 1.7).
^alg-validation-checklist

## Examples

Worked passes through the Core for typical marketing-analytics models.

> [!example] Example: Mapping a marketing driver-analysis model onto the Core (generic illustration)
> **Setup:** An analytics team fits per-segment gradient-boosted models of a shared weekly KPI. They report SHAP-based driver "importance" to brand managers, who use it to shift budget.
>
> **GOVERN:** The model enters the AI system inventory (GOVERN 1.6) with an owner, purpose and review frequency (GOVERN 1.5). A reviewer who did not build it is named (MEASURE 1.3, enabled by GOVERN 2.1).
>
> **MAP:** The intended purpose is budget reallocation, which is a *causal* use (MAP 1.1). Knowledge limits are documented: 52-156 weekly rows per segment, collinear media, no randomized variation (MAP 2.2). Construct validity of reading importance as impact is flagged as not established (MAP 2.3). Initial go/no-go: proceed only for descriptive use until causal validity is shown.
>
> **MEASURE:**
> - Document test sets and metrics (MEASURE 2.1), e.g. rolling-origin forecast error ([[Forecast Evaluation and Backtesting]]).
> - Demonstrate validity for deployment-like conditions (MEASURE 2.3, 2.5) with a known-truth simulation where the true driver effects are set by design.
> - Record that causal importance cannot be measured from observational data alone (MEASURE 1.1).
> - Evaluate whether the validation metric would actually catch a wrong ranking (MEASURE 2.13).
>
> **MANAGE:** If simulation shows the rankings are not recovered, either mitigate (restrict to forecasting use, add experiments) or avoid (MANAGE 1.3). Make sure mechanisms exist to "supersede, disengage, or deactivate" the importance report (MANAGE 2.4). Log analysts' overrides (MANAGE 4.1).
>
> **Lesson:** The Core makes the team state *which* use the model is valid for. This is the same distinction SR 11-7 draws between fundamental model error and misuse ([[SR 11-7 - Model Risk Management Guidance - Overview]]).
^ex-driver-model-core

> [!example] Example: Selecting among fits by SHAP mass (anti-pattern under MEASURE 2.13)
> **Setup:** For each segment, the team fits several candidate models and keeps the one whose top drivers carry the largest total SHAP mass. Held-out accuracy is not used.
>
> **Framework reading:**
> - The selection rule is a researcher degree of freedom that optimizes a proxy (attribution concentration), not validity. This is a *computational and statistical* bias (§3.7) that needs no bad intent.
> - MEASURE 2.3 requires performance demonstrated "for conditions similar to deployment setting(s)". The selection criterion is not a performance criterion at all.
> - MEASURE 2.13 asks whether the TEVV process is effective. A rule that rewards concentrated attributions selects for overfit or confounded fits, so it fails.
> - Remedy: select by out-of-sample performance, then check stability of explanations across the near-optimal set ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]).
>
> **Related:** [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
^ex-shap-mass-selection

> [!example] Example: Trustworthiness tradeoff when upgrading a response model (§3, pp. 12-13)
> **Setup:** Replace a transparent linear response model with a more accurate but opaque ensemble.
>
> **Framework reading:** "Accurate but opaque and uninterpretable systems" are listed as undesirable (p. 13), and so are inaccurate transparent ones. The tradeoff "between predictive accuracy and interpretability" (p. 12) has to be settled by human judgment in a "transparent and appropriately justifiable" way (p. 13). Validity is the base that cannot be traded (Fig. 4). Higher accuracy on the KPI does not make the ensemble's attributions valid; see [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] for the underlying debate.
^ex-accuracy-interpretability

## Connections

- **MMM practice challenges** that make MAP 2.2/2.3 bite: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Bayesian Media Mix Modeling - Overview]].
- **Experiments as non-AI alternatives and ground truth**: [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Q - Using Experiment Results as Priors in a Bayesian MMM]].
- **SHAP and causal claims**: [[Dillon et al - SHAP and Causal Insights - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- **False discovery at scale** (many segments × many drivers): [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

## See Also

- [[NIST AI RMF 1.0 - Overview]]
- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]: writing this as a use-case profile
