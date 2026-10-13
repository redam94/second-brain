---
title: "NIST AI RMF - Accountability, Explainability, Privacy and Fairness"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - topic/interpretability
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 1 §3.4 Accountable and Transparent pp. 15-16; §3.5 Explainable and Interpretable pp. 16-17; §3.6 Privacy-Enhanced p. 17; §3.7 Fair – with Harmful Bias Managed pp. 17-18 (PDF pp. 20-23)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]"
used_by:
  - "[[NIST AI RMF - MEASURE Function]]"
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
aliases:
  - AI RMF Transparency vs Explainability vs Interpretability
  - AI RMF Accountable and Transparent
  - AI RMF Explainable and Interpretable
  - AI RMF Privacy-Enhanced
  - AI RMF Three Categories of AI Bias
---

# NIST AI RMF - Accountability, Explainability, Privacy and Fairness

> [!summary]
> This note covers the last four trustworthiness characteristics of the AI RMF (§§3.4-3.7). **Accountable and transparent**: "Accountability presupposes transparency." A transparent system is not necessarily accurate or fair, but an opaque one is hard to assess at all. **Explainable and interpretable**: explainability is "a representation of the mechanisms underlying AI systems' operation," and interpretability is "the meaning of AI systems' output in the context of their designed functional purposes." Transparency answers *what happened*, explainability answers *how*, and interpretability answers *why*. **Privacy-enhanced**: privacy-enhancing technologies and data minimization, at a possible cost in accuracy. **Fair, with harmful bias managed**: NIST's three bias categories are *systemic*, *computational and statistical*, and *human-cognitive*, and each "can occur in the absence of prejudice, partiality, or discriminatory intent" (p. 18).
^summary

## Overview

These four characteristics are where the AI RMF goes furthest beyond classical model-risk guidance. For interpretable-ML practice, the most useful part is the three-way split of transparency, explainability and interpretability in §3.5. It gives precise names to a distinction this vault develops at length: a SHAP decomposition explains *how* a fitted function maps inputs to outputs. It does not, without more, interpret *why* the outcome happens in the world.

## Main Content

### §3.4 Accountable and Transparent (pp. 15-16)

> [!definition] Definition: Transparency and Accountability (AI RMF §3.4, pp. 15-16)
> - "Trustworthy AI depends upon accountability. Accountability presupposes transparency."
> - **Transparency** "reflects the extent to which information about an AI system and its outputs is available to individuals interacting with such a system – regardless of whether they are even aware that they are doing so."
> - **Meaningful transparency** "provides access to appropriate levels of information based on the stage of the AI lifecycle and tailored to the role or knowledge of AI actors or individuals interacting with or using the AI system." "By promoting higher levels of understanding, transparency increases confidence in the AI system."
> - **Scope**: "from design decisions and training data to model training, the structure of the model, its intended use cases, and how and when deployment, post-deployment, or end user decisions were made and by whom."
^def-transparency-accountability

> [!theorem] Principle: Transparency Is Necessary but Not Sufficient (AI RMF §3.4, p. 16)
> "A transparent system is not necessarily an accurate, privacy-enhanced, secure, or fair system. However, it is difficult to determine whether an opaque system possesses such characteristics, and to do so over time as complex systems evolve."
>
> **Reading:** Transparency does not make a system trustworthy. It is what makes it possible to check the other characteristics, which is why Fig. 4 draws it as a vertical bar touching all of them.
^thm-transparency-necessary

Further points (pp. 15-16):

- Transparency "is often necessary for actionable redress related to AI system outputs that are incorrect." It should cover human-AI interaction, e.g. "how a human operator or user is notified when a potential or actual adverse outcome caused by an AI system is detected."
- "The role of AI actors should be considered when seeking accountability for the outcomes of AI systems." Accountability practices differ "across cultural, legal, sectoral, and societal contexts." When "life and liberty are at stake," developers and deployers should "proportionally and proactively" adjust practices. "Maintaining organizational practices and governing structures for harm reduction, like risk management, can help lead to more accountable systems."
- Transparency efforts should weigh "the level of necessary resources and the need to safeguard proprietary information."
- "Maintaining the provenance of training data and supporting attribution of the AI system's decisions to subsets of training data can assist with both transparency and accountability." Training data "may also be subject to copyright."
- Developers are "encouraged to test different types of transparency tools in cooperation with AI deployers to ensure that AI systems are used as intended."

### §3.5 Explainable and Interpretable (pp. 16-17)

> [!definition] Definition: Explainability vs Interpretability (AI RMF §3.5, p. 16)
> "Explainability refers to a representation of the mechanisms underlying AI systems' operation, whereas interpretability refers to the meaning of AI systems' output in the context of their designed functional purposes."
>
> Together they help operators, overseers and users "gain deeper insights into the functionality and trustworthiness of the system, including its outputs." The stated **underlying assumption**: "perceptions of negative risk stem from a lack of ability to make sense of, or contextualize, system output appropriately." "Explainable and interpretable AI systems offer information that will help end users understand the purposes and potential impact of an AI system."
^def-explainability-interpretability

> [!definition] Definition: What / How / Why Triad (AI RMF §3.5, p. 17)
> "Transparency, explainability, and interpretability are distinct characteristics that support each other. Transparency can answer the question of 'what happened' in the system. Explainability can answer the question of 'how' a decision was made in the system. Interpretability can answer the question of 'why' a decision was made by the system and its meaning or context to the user."
>
> | Characteristic | Question | Example artefact for a predictive model |
> |---|---|---|
> | Transparency | *What* happened? | Model card, data lineage, version log, who approved deployment |
> | Explainability | *How* was the output produced? | Coefficients, partial dependence, SHAP values, permutation importance |
> | Interpretability | *Why*, and what does it mean in context? | A justified statement that "raising channel X spend raises KPI" (requires causal assumptions) |
>
> (The third column is a vault illustration, not from the source.)
^def-what-how-why

Management of these risks (pp. 16-17):

- Lack of explainability can be managed "by describing how AI systems function, with descriptions tailored to individual differences such as the user's role, knowledge, and skill level."
- "Explainable systems can be debugged and monitored more easily, and they lend themselves to more thorough documentation, audit, and governance."
- Interpretability risk "often can be addressed by communicating a description of why an AI system made a particular prediction or recommendation." NIST points to its own "Four Principles of Explainable Artificial Intelligence" and "Psychological Foundations of Explainability and Interpretability in Artificial Intelligence" (p. 17).

**Vault gloss.** The *how* vs *why* split matches the observational vs interventional distinction for feature attributions. Explanations of the fitted function (marginal or interventional SHAP, permutation importance) answer *how*. Answering *why* for the real-world outcome needs causal identification. See [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and [[Dillon et al - SHAP and Causal Insights - Overview]]. Permutation-based explanations can themselves be wrong about *how* when features are correlated: [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]].

### §3.6 Privacy-Enhanced (p. 17)

> [!definition] Definition: Privacy (AI RMF §3.6, p. 17)
> "Privacy refers generally to the norms and practices that help to safeguard human autonomy, identity, and dignity. These norms and practices typically address freedom from intrusion, limiting observation, or individuals' agency to consent to disclosure or control of facets of their identities (e.g., body, data, reputation)." (Refers to the NIST Privacy Framework.)
^def-privacy

- Values: "anonymity, confidentiality, and control generally should guide choices for AI system design, development, and deployment."
- Privacy risks "may influence security, bias, and transparency and come with tradeoffs with these other characteristics." "Like safety and security, specific technical features of an AI system may promote or reduce privacy."
- New AI-specific risk: AI can enable "inference to identify individuals or previously private information about individuals."
- Remedies: privacy-enhancing technologies ("PETs") for AI, and "data minimizing methods such as de-identification and aggregation for certain model outputs."
- **Tradeoff**: "Under certain conditions such as data sparsity, privacy-enhancing techniques can result in a loss in accuracy, affecting decisions about fairness and other values in certain domains."

In marketing measurement, the move from user-level to aggregated or privacy-protected data is this tradeoff in practice: [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]].

### §3.7 Fair – with Harmful Bias Managed (pp. 17-18)

> [!definition] Definition: Fairness and Harmful Bias (AI RMF §3.7, p. 17)
> "Fairness in AI includes concerns for equality and equity by addressing issues such as harmful bias and discrimination." Standards of fairness "can be complex and difficult to define because perceptions of fairness differ among cultures and may shift depending on application." "Organizations' risk management efforts will be enhanced by recognizing and considering these differences."
>
> **Bias mitigation is not fairness:** "Systems in which harmful biases are mitigated are not necessarily fair. For example, systems in which predictions are somewhat balanced across demographic groups may still be inaccessible to individuals with disabilities or affected by the digital divide or may exacerbate existing disparities or systemic biases."
^def-fairness

> [!definition] Definition: Three Categories of AI Bias (AI RMF §3.7, p. 18; NIST SP 1270)
> "Bias is broader than demographic balance and data representativeness." NIST identifies "three major categories of AI bias to be considered and managed: systemic, computational and statistical, and human-cognitive. Each of these can occur in the absence of prejudice, partiality, or discriminatory intent."
>
> | Category | Where it lives | Description (p. 18) |
> |---|---|---|
> | **Systemic** | Datasets; organizational norms, practices and processes; broader society | "can be present in AI datasets, the organizational norms, practices, and processes across the AI lifecycle, and the broader society that uses AI systems" |
> | **Computational and statistical** | Datasets and algorithmic processes | "often stem from systematic errors due to non-representative samples" |
> | **Human-cognitive** | Individual or group perception and decision-making | "how an individual or group perceives AI system information to make a decision or fill in missing information, or how humans think about purposes and functions of an AI system"; "omnipresent in decision-making processes across the AI lifecycle" |
^def-three-bias-categories

- "Bias exists in many forms and can become ingrained in the automated systems that help make decisions about our lives." "While bias is not always a negative phenomenon, AI systems can potentially increase the speed and scale of biases and perpetuate and amplify harms."
- "Bias is tightly associated with the concepts of transparency as well as fairness in society." For more, NIST SP 1270, *Towards a Standard for Identifying and Managing Bias in Artificial Intelligence* (p. 18).

**Statistical reading.** "Computational and statistical bias" covers the familiar estimation biases: selection bias, non-representative samples, confounding, and selection of results among many analyses. "Human-cognitive bias" covers the analyst's own choices: [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], and the motivated reasoning documented in [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].

## Examples

> [!example] Example: Separating what / how / why for a SHAP driver report (generic illustration)
> **Setup:** A dashboard shows, for each of 12 regional segments, a tree model of a shared weekly KPI and its mean |SHAP| ranking of drivers.
>
> - **Transparency (what):** Document the data window, feature list, model version, who approved the report, and the fact that the models were selected by total SHAP mass and not by held-out accuracy. Without this, users cannot assess the report at all (§3.4 principle).
> - **Explainability (how):** The SHAP values correctly describe how each fitted function responds to its inputs, conditional on the background distribution chosen. Correlated media inputs make this description depend on that choice ([[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]).
> - **Interpretability (why):** The claim "TV drives the KPI in region 7" is a causal interpretation. It needs identification (experiments, DML with credible controls), which the dashboard does not supply ([[Dillon et al - SHAP and Causal Insights - Overview]], [[DML Estimators for ATE and the Interactive Model]]).
> - **Bias categories:** Selecting among model fits by attribution mass is a *computational and statistical* bias, and reading the result as causal is a *human-cognitive* bias. Neither requires bad intent (p. 18).
^ex-separating-what-how-why

## Connections

- **Transparency ↔ documentation**: MEASURE 2.8 and 2.9 ([[NIST AI RMF - MEASURE Function]]); GOVERN 4.2 ([[NIST AI RMF - Core Structure and the GOVERN Function]]).
- **Explainability vs causal attribution**: [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] (explanations of one model vs the whole Rashomon set).
- **Statistical bias** links to [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] (bias parameter $u$) and [[Experimental Benchmarks for Observational Ad Measurement]] (observational bias against RCT benchmarks).
- **Privacy-accuracy tradeoff** in measurement: aggregated geo data vs user-level logs; [[Geo-Experiment Design and Power Analysis]].

## See Also

- [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]: §3 framing and §§3.1-3.3
- [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]]: Appendix C on human-cognitive bias in human-AI teams
- [[NIST AI RMF 1.0 - Overview]]
