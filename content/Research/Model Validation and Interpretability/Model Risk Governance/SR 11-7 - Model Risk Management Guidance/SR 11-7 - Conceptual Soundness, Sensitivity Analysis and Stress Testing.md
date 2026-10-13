---
title: SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/definition
  - type/concept
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §V Model Validation, '1. Evaluation of Conceptual Soundness', pp. 11-12"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]"
  - "[[SR 11-7 - Model Development, Implementation and Use]]"
used_by:
  - "[[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]]"
  - "[[SR 11-7 - Validation of Vendor and Third-Party Models]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - Evaluation of Conceptual Soundness
  - Conceptual Soundness (SR 11-7)
  - SR 11-7 Sensitivity Analysis
  - SR 11-7 Stress Testing
---

# SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing

> [!summary]
> The first core element of SR 11-7 validation (§V.1, pp. 11-12) assesses "the quality of the model design and construction" by critically reviewing the **developmental evidence** — theory, key assumptions, data, calculations — and adding independent analysis. It requires comparison with **alternative approaches**, assessment of key assumptions and variable choices *by their impact on outputs*, and evaluation of **data relevance** (especially for external data or new uses). Two quantitative tools are named: **sensitivity analysis** (small input/parameter changes should produce outputs in an expected range; large swings indicate instability; multi-input perturbations reveal interactions) and **stress testing** (wide and extreme inputs establish the **boundaries** of model performance). Management must have a plan to act on the results, and qualitative judgment must be evaluated and documented too.

## Overview

Conceptual soundness is the element that can be done *before* outcomes exist — which makes it the main pre-use validation activity and the main validation tool whenever outcomes are unobservable (as for causal/attribution quantities). It re-examines what §IV required developers to produce ([[SR 11-7 - Model Development, Implementation and Use#^def-development-requirements]]).

## Main Content

### Developmental evidence (p. 11)

> [!definition] Definition: Evaluation of Conceptual Soundness (SR 11-7, §V.1, p. 11)
> "This element involves assessing the quality of the model design and construction. It entails review of documentation and empirical evidence supporting the methods used and variables selected for the model. Documentation and testing should convey an understanding of model limitations and assumptions. Validation should ensure that judgment exercised in model design and construction is well informed, carefully considered, and consistent with published research and with sound industry practice."
>
> **Timing:** "Developmental evidence should be reviewed before a model goes into use and also as part of the ongoing validation process, in particular whenever there is a material change in the model."
^def-conceptual-soundness

> [!definition] Standard: What the Conceptual-Soundness Review Must Cover (SR 11-7, §V.1, p. 11)
> A sound development process "will produce documented evidence in support of all model choices, including the overall theoretical construction, key assumptions, data, and specific mathematical calculations." Validation subjects these to "critical analysis by both evaluating the quality and extent of developmental evidence and conducting additional analysis and testing as necessary." In particular:
> 1. "Comparison to alternative theories and approaches should be included."
> 2. "Key assumptions and the choice of variables should be assessed, with analysis of their impact on model outputs and particular focus on any potential limitations."
> 3. "The relevance of the data used to build the model should be evaluated to ensure that it is reasonably representative of the bank's portfolio or market conditions, depending on the type of model. This is an especially important exercise when a bank uses external data or the model is used for new products or activities."
^def-conceptual-soundness-scope

Item 2's emphasis — assumptions judged *by their impact on outputs* — is what distinguishes validation from a literature check. An assumption that is questionable but inconsequential matters less than a plausible one that drives the answer.

### Sensitivity analysis (p. 11)

> [!definition] Definition: Sensitivity Analysis (SR 11-7, §V.1, p. 11)
> "Where appropriate to the particular model, banks should employ sensitivity analysis in model development and validation to check the impact of small changes in inputs and parameter values on model outputs to make sure they fall within an expected range. Unexpectedly large changes in outputs in response to small changes in inputs can indicate an unstable model. Varying several inputs simultaneously as part of sensitivity analysis can provide evidence of unexpected interactions, particularly if the interactions are complex and not intuitively clear."
^def-sensitivity-analysis

A formal reading: for model output $f(x;\theta)$ with inputs $x$ and parameters $\theta$, local sensitivity examines
$$
\Delta f \approx \nabla_x f \cdot \delta x + \nabla_\theta f \cdot \delta\theta
$$
for small $\delta x,\delta\theta$; an "expected range" is a pre-stated bound on $|\Delta f|$. One-at-a-time perturbations miss interactions (cross-partial terms $\partial^2 f/\partial x_i\partial x_j$), hence SR 11-7's call to vary "several inputs simultaneously" — the motivation for global methods in [[Local vs Global Sensitivity Analysis]] and [[Global Sensitivity Analysis - Overview]]. For Bayesian models, the parameter-side analogue is prior sensitivity ([[Influence of Likelihood and Prior]]); for variable selection, the data-side analogue is [[Meinshausen Buhlmann 2010 - Stability Selection - Overview|stability under resampling]].

### Stress testing (p. 11)

> [!definition] Definition: Model Stress Testing (SR 11-7, §V.1, p. 11)
> "Banks benefit from conducting model stress testing to check performance over a wide range of inputs and parameter values, including extreme values, to verify that the model is robust. Such testing helps establish the boundaries of model performance by identifying the acceptable range of inputs as well as conditions under which the model may become unstable or inaccurate."
^def-stress-testing

Note SR 11-7's stress testing here is *model* stress testing (probing the model's operating envelope), distinct from portfolio stress testing as a model *use* (listed on p. 3). The output is a documented **acceptable input range**, which ongoing monitoring then watches ([[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking#^def-ongoing-monitoring]]: constraints "approached or exceeded").

### Acting on results (pp. 11-12)

> [!theorem] Rule: A Plan for Using Test Results (SR 11-7, §V.1, pp. 11-12)
> "Management should have a clear plan for using the results of sensitivity analysis and other quantitative testing. If testing indicates that the model may be inaccurate or unstable in some circumstances, management should consider modifying certain model properties, putting less reliance on its outputs, placing limits on model use, or developing a new approach."
^thm-plan-for-results

The four responses form an escalation ladder: (1) modify the model; (2) reduce reliance on outputs; (3) limit use; (4) replace.

### Qualitative information and judgment (p. 12)

"Qualitative information and judgment used in model development should be evaluated, including the logic, judgment, and types of information used, to establish the conceptual soundness of the model and set appropriate conditions for its use. The validation process should ensure that qualitative, judgmental assessments are conducted in an appropriate and systematic manner, are well supported, and are documented."

## Examples

> [!example] Example: Sensitivity analysis for channel effect estimates (generic illustration)
> **Setup:** a regression-based response model reports an effect for each of 6 channels from 104 weekly observations; two channels' spends have correlation 0.9.
> **One-at-a-time:** perturb each channel's spend series by ±5% and refit. Channels 1-4 move by <3%; channels 5 and 6 swing by 40% in opposite directions.
> **Joint perturbation:** perturbing 5 and 6 together in the same direction moves their *sum* by <3%.
> **Reading per SR 11-7:** "Unexpectedly large changes in outputs in response to small changes in inputs can indicate an unstable model" — here, the split between the two collinear channels is not identified, though their total is. Per the plan-for-results rule, report the combined effect and place limits on use of the separate figures.
^ex-sensitivity-analysis-for-channel

> [!example] Example: Stress test establishing a boundary (generic illustration)
> A saturating response curve is fitted where historical weekly spend ranged 0-50k. Evaluating at 150k gives a response that depends almost entirely on the prior for the saturation parameter. The documented boundary of model effectiveness becomes "0-60k per week"; budget scenarios beyond it require separate evidence (e.g. a scaled experiment). Compare the off-support failure of permutation-based diagnostics in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
^ex-stress-test-establishing-a

## Connections

- Comparing alternatives and the many-good-models problem: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[MMM Model Selection and Application]].
- Assessing what explanation outputs mean (a reporting-component soundness check): [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]].
- Bias in variable-importance measures as a conceptual flaw: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]].
- Pre-data model checking: [[Prior Predictive Checking]]; known-truth recovery as stress test: [[Designing Simulated-Data Experiments]], [[Simulation-Based Calibration - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review#^def-three-elements]]
- [[Q - A Unified View of Sensitivity to Assumption Violations]]
