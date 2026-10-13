---
title: "NIST AI RMF - How AI Risks Differ and Human-AI Interaction"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Appendix B: How AI Risks Differ from Traditional Software Risks pp. 38-39 (PDF pp. 43-44); Appendix C: AI Risk Management and Human-AI Interaction pp. 40-41 (PDF pp. 45-46); Executive Summary p. 1"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]"
  - "[[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]"
used_by:
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
aliases:
  - AI RMF Appendix B
  - AI RMF Appendix C
  - How AI Risks Differ from Traditional Software Risks
  - AI RMF Human-AI Interaction
  - Human-AI Configurations
---

# NIST AI RMF - How AI Risks Differ and Human-AI Interaction

> [!summary]
> **Appendix B** explains why AI needs its own risk framework. It lists 14 risks that are new or increased compared with traditional software. Among them: data may not represent the intended context, and "the ground truth may either not exist or not be available". Datasets go stale. Pre-trained models raise "statistical uncertainty" and reproducibility problems. Maintenance is triggered by "data, model, or concept drift". Testing standards are underdeveloped, and side effects are hard to detect "beyond statistical measures". It also lists five gaps that existing frameworks cannot handle (harmful bias, generative AI, ML-specific attacks, AI attack surface, and third-party / transfer-learning / off-label use). **Appendix C** covers human-AI interaction. Human-AI configurations range "from fully autonomous to fully manual". Systemic and human-cognitive biases enter through design choices. AI can amplify human bias in some tasks and complement it in others. Presenting AI information to humans is complex. Data on how often and why humans *overrule* AI output "may be useful to collect and analyze" (p. 41).
^summary

## Overview

The Executive Summary previews Appendix B (p. 1). AI systems "may be trained on data that can change over time, sometimes significantly and unexpectedly." They are "frequently complex, making it difficult to detect and respond to failures," and they are "inherently socio-technical." Appendix B gives the full list, and Appendix C develops the socio-technical point for the human side of the system. Both appendices bear directly on statistical model validation. Most items in B describe properties of *statistical learning from data*, not of deep learning in particular.

## Main Content

### Appendix B: how AI risks differ (pp. 38-39)

Framing (p. 38): AI risks, like software risks, "can be bigger than an enterprise, span organizations, and lead to societal impacts," but AI brings risks "not comprehensively addressed by current risk frameworks." Some risky features "also can be beneficial." For example, pre-trained models and transfer learning "can advance research and increase accuracy and resilience." Identifying context in MAP helps determine the level of risk.

> [!definition] AI-Specific Risks That Are New or Increased (Appendix B, pp. 38-39)
> | # | Risk (as listed) | Statistical reading |
> |---|---|---|
> | 1 | "The data used for building an AI system may not be a true or appropriate representation of the context or intended use of the AI system, and the ground truth may either not exist or not be available." Harmful bias and data quality issues affect trustworthiness. | Sample ≠ target population; missing labels or counterfactuals (e.g. ad attribution never observes the untreated outcome) |
> | 2 | "AI system dependency and reliance on data for training tasks, combined with increased volume and complexity typically associated with such data." | Behavior is learned from data, not specified |
> | 3 | "Intentional or unintentional changes during training may fundamentally alter AI system performance." | Sensitivity to seeds, hyperparameters and refits; [[Researcher Degrees of Freedom]] |
> | 4 | "Datasets used to train AI systems may become detached from their original and intended context or may become stale or outdated relative to deployment context." | Non-stationarity, covariate shift |
> | 5 | "AI system scale and complexity (many systems contain billions or even trillions of decision points) housed within more traditional software applications." | — |
> | 6 | "Use of pre-trained models that can advance research and improve performance can also increase levels of statistical uncertainty and cause issues with bias management, scientific validity, and reproducibility." | Unknown training distribution of borrowed components |
> | 7 | "Higher degree of difficulty in predicting failure modes for emergent properties of large-scale pre-trained models." | — |
> | 8 | "Privacy risk due to enhanced data aggregation capability for AI systems." | Linkage and inference attacks |
> | 9 | "AI systems may require more frequent maintenance and triggers for conducting corrective maintenance due to data, model, or concept drift." | Monitoring and retraining triggers |
> | 10 | "Increased opacity and concerns about reproducibility." | Reproducible pipelines |
> | 11 | "Underdeveloped software testing standards and inability to document AI-based practices to the standard expected of traditionally engineered software for all but the simplest of cases." | No agreed unit tests for statistical correctness |
> | 12 | "Difficulty in performing regular AI-based software testing, or determining what to test, since AI systems are not subject to the same controls as traditional code development." | The test oracle problem |
> | 13 | "Computational costs for developing AI systems and their impact on the environment and planet." | — |
> | 14 | "Inability to predict or detect the side effects of AI-based systems beyond statistical measures." | Validation limited to what metrics capture |
^def-ai-specific-risks

**Relation to existing frameworks** (p. 39): Privacy and cybersecurity risk management apply throughout. "Privacy and cybersecurity risks are also considered as part of broader enterprise risk management considerations, which may incorporate AI risks." Organizations addressing "Secure and Resilient" and "Privacy-Enhanced" may leverage existing standards. NIST points to the Cybersecurity Framework, Privacy Framework, Risk Management Framework, and Secure Software Development Framework, which "have some features in common with the AI RMF." Like most risk approaches, they are "outcome-based rather than prescriptive and are often structured around a Core set of functions, categories, and subcategories." The qualifier: "While there are significant differences between these frameworks based on the domain addressed – and because AI risk management calls for addressing many other types of risks – frameworks like those mentioned above may inform security and privacy considerations in the MAP, MEASURE, and MANAGE functions of the AI RMF."

> [!theorem] Gaps Existing Guidance Cannot Fill (Appendix B, p. 39)
> "Existing frameworks and guidance are unable to:
> 1. adequately manage the problem of harmful bias in AI systems;
> 2. confront the challenging risks related to generative AI;
> 3. comprehensively address security concerns related to evasion, model extraction, membership inference, availability, or other machine learning attacks;
> 4. account for the complex attack surface of AI systems or other security abuses enabled by AI systems; and
> 5. consider risks associated with third-party AI technologies, transfer learning, and off-label use where AI systems may be trained for decision-making outside an organization's security controls or trained in one domain and then 'fine-tuned' for another."
>
> Closing: technology advances "should be monitored and deployed to take advantage of those developments and work towards a future of AI that is both trustworthy and responsible."
^thm-framework-gaps

**"Off-label use"** (gap 5) is worth noting for analytics. A model built for one purpose (forecasting) is used for another (attribution). That is the misuse category of model risk in SR 11-7 terms ([[SR 11-7 - Model Risk Management Guidance - Overview]]).

### Appendix C: human-AI interaction (pp. 40-41)

Framing (p. 40): Organizations "may enhance their AI risk management by understanding current limitations of human-AI interaction." Data-driven approaches "attempt to convert or represent individual and social observational and decision-making practices into measurable quantities." "Representing complex human phenomena with mathematical models can come at the cost of removing necessary context," which "may in turn make it difficult to understand individual and societal impacts."

> [!definition] Four Issues for Human-AI Interaction (Appendix C, pp. 40-41)
> 1. **Human roles must be defined and differentiated.** "Human-AI configurations can span from fully autonomous to fully manual." AI systems "can autonomously make decisions, defer decision making to a human expert, or be used by a human decision maker as an additional opinion." Some need no human oversight ("models used to improve video compression"). Others specifically require it.
> 2. **Design decisions reflect systemic and human-cognitive biases.** Actors "bring their cognitive biases, both individual and group, into the process." Biases enter "via human assumptions, expectations, and decisions during design and modeling tasks." They "may be exacerbated by AI system opacity." Organizational systemic biases "can influence how teams are structured and who controls the decision-making processes."
> 3. **Human-AI interaction results vary.** "Under certain conditions – for example, in perceptual-based judgment tasks – the AI part of the human-AI interaction can amplify human biases, leading to more biased decisions than the AI or human alone." When these variations are "judiciously taken into account in organizing human-AI teams," they "can result in complementarity and improved overall performance."
> 4. **Presenting AI system information to humans is complex.** "Humans perceive and derive meaning from AI system output and explanations in different ways, reflecting different individual preferences, traits, and skills."
^def-human-ai-issues

How the Core addresses these (p. 41):

- **GOVERN** clarifies "roles and responsibilities for the humans in the Human-AI team configurations and those who are overseeing the AI system performance." It also creates mechanisms to make decision-making "more explicit, to help counter systemic biases" (GOVERN 3.2).
- **MAP** defines "processes for operator and practitioner proficiency" and technical standards and certifications (MAP 3.4). It also improves competency in analyzing context, limitations, real-world impacts and decision processes.
- **GOVERN and MAP** stress interdisciplinary, demographically diverse teams and feedback from impacted communities. Human-factors actors anchor design "to user intentions and representatives of the broader AI community, and societal values."

> [!theorem] Open Research: Challenge and Override (Appendix C, p. 41)
> "The degree to which humans are empowered and incentivized to challenge AI system output requires further studies. Data about the frequency and rationale with which humans overrule AI system output in deployed systems may be useful to collect and analyze."
>
> **Operationalized in:** MANAGE 4.1 ("appeal and override") and MEASURE 3.3 (feedback and appeal processes). The analogue in bank model risk is override monitoring.
^thm-override-data

## Examples

> [!example] Example: Override logging for a budget-recommendation model (generic illustration)
> **Setup:** A response model recommends weekly channel budgets, and planners can accept or override each recommendation.
>
> **Applying Appendix C:**
> - *Configuration (issue 1)*: The model is "an additional opinion" for a human decision maker, not autonomous.
> - *Bias amplification (issue 3)*: If planners accept recommendations that match their priors and override the rest, the combined system can be more biased than either alone. Logging is needed to detect this.
> - *Data to collect (p. 41)*: For each recommendation, record accepted or overridden, the reason code, and the realized outcome. Override rates by channel, and outcomes of overridden vs accepted decisions, feed MEASURE 3.1 and MANAGE 4.1.
> - *Presentation (issue 4)*: Show intervals, not point recommendations alone, so users do not mistake precision for certainty ([[Q - Four Meanings of Calibration]]).
^ex-override-logging-for-a

> [!example] Example: "Ground truth may not exist" in marketing measurement (Appendix B item 1)
> Incremental sales from advertising are a counterfactual quantity. They are never observed in the training data, so standard accuracy metrics on observed sales cannot validate attributions. Ground truth must be *constructed*, either by randomized experiments ([[Conversion Lift Studies on Ad Platforms]], [[Geo-Experiment Design and Power Analysis]]) or by simulation with known effects ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]). The gap between observational and experimental estimates can be large: [[Experimental Benchmarks for Observational Ad Measurement]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
^ex-ground-truth-may-not

## Connections

- **Drift and staleness** (B items 4, 9): [[Forecast Evaluation and Backtesting]], [[Conformal Prediction Under Covariate Shift]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].
- **Testing difficulty / oracle problem** (B items 11-12): [[Modeling as Software Development]], [[Simulation-Based Calibration - Overview]] (one of the few automated correctness tests for Bayesian inference code).
- **Changes during training** (B item 3) and **design-stage cognitive bias** (C issue 2): [[Garden of Forking Paths]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
- **Statistical uncertainty from pre-trained components** (B item 6): LLM evaluation challenges in [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]].
- **Explanations presented to humans** (C issue 4): [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].

## See Also

- [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]: Appendix A actors
- [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]: the three bias categories
- [[NIST AI RMF 1.0 - Overview]]
