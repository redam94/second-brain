---
title: "NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 1 §3 AI Risks and Trustworthiness intro pp. 12-13 (PDF pp. 17-18) incl. Fig. 4 (p. 12) and boxed text (p. 13); §3.1 Valid and Reliable pp. 13-14; §3.2 Safe pp. 14-15; §3.3 Secure and Resilient p. 15 (PDF pp. 18-20)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - Framing AI Risk and Measurement Challenges]]"
used_by:
  - "[[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]"
  - "[[NIST AI RMF - MEASURE Function]]"
aliases:
  - Characteristics of Trustworthy AI
  - Trustworthy AI Characteristics
  - AI RMF Valid and Reliable
  - AI RMF Weakest-Link Principle
  - AI RMF Safe, Secure and Resilient
---

# NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity

> [!summary]
> §3 of the AI RMF lists seven **characteristics of trustworthy AI**: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and interpretable; privacy-enhanced; and fair, with harmful bias managed. **Fig. 4** puts *Valid & Reliable* at the base as "a necessary condition of trustworthiness." *Accountable & Transparent* is a vertical bar because it relates to all the others. Trustworthiness "is only as strong as its weakest characteristics" (p. 12). The characteristics trade off against one another, and these tradeoffs are settled by contextual human judgment, not by analysis. This note covers the §3 framing and the first three characteristics. **§3.1** defines validation, reliability, accuracy and robustness using ISO definitions. It says accuracy must be "paired with clearly defined and realistic test sets," and it says accuracy and robustness can conflict. **§3.2** covers safety (simulation, in-domain testing, shutdown). **§3.3** covers security and resilience (adversarial examples, data poisoning, graceful degradation).
^summary

## Overview

§3 links risk (§1) to quality: "Approaches which enhance AI trustworthiness can reduce negative AI risks" (p. 12). For statistical modelers, the central point is that *validity* is the base of the structure, not one item among several. An interpretable, fair, transparent model that is not valid for its intended use is still untrustworthy. The remaining four characteristics (§§3.4-3.7) are in [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]].

## Main Content

### §3 framing (pp. 12-13)

> [!definition] Definition: The Seven Characteristics of Trustworthy AI (AI RMF §3, p. 12; Fig. 4)
> "Characteristics of trustworthy AI systems include: valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed."
>
> - All are "socio-technical system attributes." Accountability and transparency "also relate to the processes and activities internal to an AI system and its external setting."
> - "Neglecting these characteristics can increase the probability and magnitude of negative consequences". This ties directly back to the §1.1 risk definition.
>
> **Fig. 4 layout** (transcribed from the image, p. 12):
>
> | Safe | Secure & Resilient | Explainable & Interpretable | Privacy-Enhanced | Fair – With Harmful Bias Managed | **Accountable & Transparent** (vertical, spans both rows) |
> |---|---|---|---|---|---|
> | **Valid & Reliable** (base, spans the first five columns) | | | | | |
>
> Caption: "Valid & Reliable is a necessary condition of trustworthiness and is shown as the base for other trustworthiness characteristics. Accountable & Transparent is shown as a vertical box because it relates to all other characteristics."
^def-seven-characteristics

> [!theorem] Principle: Trustworthiness Is Joint, Contextual and Weakest-Link (AI RMF §3, pp. 12-13)
> 1. **Socio-technical.** The characteristics "are inextricably tied to social and organizational behavior, the datasets used by AI systems, selection of AI models and algorithms and the decisions made by those who build them, and the interactions with the humans who provide insight from and oversight of such systems" (p. 12).
> 2. **Human-chosen thresholds.** "Human judgment should be employed when deciding on the specific metrics related to AI trustworthiness characteristics and the precise threshold values for those metrics" (p. 12).
> 3. **Not separable.** "Addressing AI trustworthiness characteristics individually will not ensure AI system trustworthiness; tradeoffs are usually involved, rarely do all characteristics apply in every setting, and some will be more or less important in any given situation" (p. 12).
> 4. **Weakest link.** "Ultimately, trustworthiness is a social concept that ranges across a spectrum and is only as strong as its weakest characteristics" (p. 12).
> 5. **Named tradeoffs** (pp. 12-13): interpretability vs privacy; "predictive accuracy and interpretability"; privacy-enhancing techniques vs accuracy "under certain conditions such as data sparsity", which affects fairness decisions.
> 6. **Analysis does not settle a tradeoff.** Tradeoff analyses "can highlight the existence and extent of tradeoffs between different measures, but they do not answer questions about how to navigate the tradeoff." Those depend on "the values at play in the relevant context and should be resolved in a manner that is both transparent and appropriately justifiable" (p. 13).
> 7. **Contextual awareness** (p. 13). Subject matter experts can help evaluate TEVV findings and align TEVV parameters to deployment conditions. "When properly resourced, increasing the breadth and diversity of input from interested parties and relevant AI actors throughout the AI lifecycle can enhance opportunities for informing contextually sensitive evaluations, and for identifying AI system benefits and positive impacts. These practices can increase the likelihood that risks arising in social contexts are managed appropriately."
> 8. **Role-dependence.** "An AI designer or developer may have a different perception of the characteristics than the deployer" (p. 13).
> 8. **Boxed statement (p. 13).** "Highly secure but unfair systems, accurate but opaque and uninterpretable systems, and inaccurate but secure, privacy-enhanced, and transparent systems are all undesirable." It is "the joint responsibility of all AI actors to determine whether AI technology is an appropriate or necessary tool for a given context or purpose." The decision to commission or deploy "should be based on a contextual assessment of trustworthiness characteristics and the relative risks, impacts, costs, and benefits, and informed by a broad set of interested parties."
^thm-weakest-link

**Formalization (vault gloss, not from the source).** Suppose each characteristic $k\in\{1,\dots,7\}$ has a context-specific score $s_k\in[0,1]$. The weakest-link language suggests an aggregate like $T=\min_k s_k$ rather than a weighted average $\sum_k w_k s_k$. Under a minimum, a high score on one characteristic cannot make up for failure on another. Fig. 4 adds a constraint: if validity $s_{\text{VR}}$ is below threshold, the system is untrustworthy whatever the other scores are.

**Contextual awareness** (p. 13): subject-matter experts "can assist in the evaluation of TEVV findings and work with product and deployment teams to align TEVV parameters to requirements and deployment conditions." Broader, more diverse input "can enhance opportunities for informing contextually sensitive evaluations."

### §3.1 Valid and Reliable (pp. 13-14)

> [!definition] Definition: Validation, Reliability, Accuracy, Robustness (AI RMF §3.1, pp. 13-14)
> - **Validation**: "confirmation, through the provision of objective evidence, that the requirements for a specific intended use or application have been fulfilled" (ISO 9000:2015). Deploying systems that are "inaccurate, unreliable, or poorly generalized to data and settings beyond their training creates and increases negative AI risks" (p. 13).
> - **Reliability**: "ability of an item to perform as required, without failure, for a given time interval, under given conditions" (ISO/IEC TS 5723:2022). It is "a goal for overall correctness of AI system operation under the conditions of expected use and over a given period of time, including the entire lifetime of the system" (p. 13).
> - **Accuracy**: "closeness of results of observations, computations, or estimates to the true values or the values accepted as being true" (ISO/IEC TS 5723:2022). Measures "should consider computational-centric measures (e.g., false positive and false negative rates), human-AI teaming, and demonstrate external validity (generalizable beyond the training conditions)" (p. 14).
> - **Robustness or generalizability**: "ability of a system to maintain its level of performance under a variety of circumstances" (ISO/IEC TS 5723:2022). It is a goal for "appropriate system functionality in a broad set of conditions and circumstances, including uses of AI systems not initially anticipated." It requires not only expected-use performance but also performance "in ways that minimize potential harms to people if it is operating in an unexpected setting" (p. 14).
^def-valid-reliable

> [!theorem] Requirements for Accuracy Evidence (AI RMF §3.1, p. 14)
> 1. "Accuracy measurements should always be paired with clearly defined and realistic test sets – that are representative of conditions of expected use – and details about test methodology; these should be included in associated documentation."
> 2. "Accuracy measurements may include disaggregation of results for different data segments."
> 3. "Accuracy and robustness contribute to the validity and trustworthiness of AI systems, and can be in tension with one another in AI systems."
> 4. "Validity and reliability for deployed AI systems are often assessed by ongoing testing or monitoring that confirms a system is performing as intended."
> 5. Measurement "should take into consideration that certain types of failures can cause greater harm". "AI risk management efforts should prioritize the minimization of potential negative impacts, and may need to include human intervention in cases where the AI system cannot detect or correct errors."
^thm-accuracy-evidence

Reading for statistical practice:

- *Validation is defined relative to an intended use.* A model can be valid for forecasting and invalid for attribution. Which use is intended must be stated first (MAP 1.1; [[NIST AI RMF - MAP Function]]).
- *Representative test sets* means out-of-time or out-of-sample sets that look like deployment conditions. For temporal data, this means rolling-origin evaluation ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]), not random k-fold on non-stationary series.
- *Disaggregation* (by segment, region, brand) is how aggregate metrics are prevented from hiding subgroup failure.
- *Accuracy vs robustness*: a model tuned hard to the training distribution can lose robustness. This is the overfitting and selection problem: [[Model Selection and Overfitting]].

### §3.2 Safe (pp. 14-15)

> [!definition] Definition: Safe (AI RMF §3.2, pp. 14-15)
> AI systems should "not under defined conditions, lead to a state in which human life, health, property, or the environment is endangered" (ISO/IEC TS 5723:2022). Safe operation is improved through:
> 1. "responsible design, development, and deployment practices;"
> 2. "clear information to deployers on responsible use of the system;"
> 3. "responsible decision-making by deployers and end users; and"
> 4. "explanations and documentation of risks based on empirical evidence of incidents."
^def-safe

- Safety risks vary in severity. Those posing "a potential risk of serious injury or death call for the most urgent prioritization and most thorough risk management process" (p. 14).
- Consider safety "as early as possible with planning and design" (p. 15).
- Practical approaches: "rigorous simulation and in-domain testing, real-time monitoring, and the ability to shut down, modify, or have human intervention into systems that deviate from intended or expected functionality" (p. 15).
- Take cues from safety practice in "transportation and healthcare" and align with sector standards (p. 15).
- Measured by MEASURE 2.6: demonstrated safe, residual risk within tolerance, able to "fail safely, particularly if made to operate beyond its knowledge limits."

### §3.3 Secure and Resilient (p. 15)

> [!definition] Definition: Resilient vs Secure (AI RMF §3.3, p. 15)
> - **Resilient**: systems and their ecosystems "can withstand unexpected adverse events or unexpected changes in their environment or use – or if they can maintain their functions and structure in the face of internal and external change and degrade safely and gracefully when this is necessary" (adapted from ISO/IEC TS 5723:2022).
> - **Secure**: systems that "can maintain confidentiality, integrity, and availability through protection mechanisms that prevent unauthorized access and use." The NIST Cybersecurity Framework and Risk Management Framework apply.
> - **Common security concerns**: "adversarial examples, data poisoning, and the exfiltration of models, training data, or other intellectual property through AI system endpoints."
> - **Relationship**: "resilience is the ability to return to normal function after an unexpected adverse event, security includes resilience but also encompasses protocols to avoid, protect against, respond to, or recover from attacks." Resilience "relates to robustness and goes beyond the provenance of the data to encompass unexpected or adversarial use (or abuse or misuse) of the model or data."
^def-secure-resilient

Taken together, the three robustness-type concepts form a ladder: **robustness** (§3.1) means keeping performance under varied conditions. **Resilience** means returning to normal function after unexpected adverse events. **Security** means resilience plus protocols against deliberate attack.

## Examples

> [!example] Example: Accuracy vs interpretability tradeoff for a driver model (generic; AI RMF §3, pp. 12-13)
> **Setup:** A team can replace a transparent linear response model of a weekly KPI (validation MAPE 9%) with a gradient-boosted ensemble (MAPE 6%) whose driver attributions come from SHAP.
>
> **Applying §3:**
> 1. Validity comes first (Fig. 4). Is the *intended use* forecasting or budget attribution? For attribution, a lower MAPE is not evidence of valid driver effects ([[Dillon et al - SHAP and Causal Insights - Overview]]).
> 2. The tradeoff named on p. 12 ("predictive accuracy and interpretability") is real. The boxed text calls "accurate but opaque and uninterpretable systems" undesirable, and also "inaccurate but ... transparent" ones.
> 3. Analysis shows the size of the tradeoff (3 MAPE points). It does not decide it. The decision must be "transparent and appropriately justifiable" (p. 13). For example, keep the linear model for attribution and use the ensemble only for forecasts, and record why.
>
> **Lesson:** The weakest-link principle stops teams from using a gain in one characteristic (accuracy) to excuse a failure in another (validity of the attributions for the decision being made).
^ex-accuracy-vs-interpretability-tradeoff

> [!example] Example: Representative test sets for a 156-week model (§3.1, p. 14)
> **Setup:** 156 weekly observations, with the last 26 weeks covering a period of heavy price promotion.
>
> **Applying §3.1:** A random 80/20 split mixes promotion and non-promotion weeks in both sets, so it is not "representative of conditions of expected use" if the next quarter is also promotional. Use rolling-origin evaluation, report error separately for promotional and non-promotional weeks (disaggregation), document the test design (MEASURE 2.1), and monitor after deployment (MEASURE 2.4).
^ex-representative-test-sets-for

## Connections

- **Validity as foundation** parallels SR 11-7's "conceptual soundness" plus "outcomes analysis": [[SR 11-7 - Model Risk Management Guidance - Overview]].
- **External validity** (§3.1) maps to [[Causal Inference as Generalization]] and [[Conformal Prediction Under Covariate Shift]].
- **Robustness to unanticipated uses** relates to the Rashomon/model-multiplicity view: many near-optimal models can agree on accuracy and disagree off-distribution ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]).
- **Simulation for safety** ("rigorous simulation and in-domain testing") corresponds to known-truth simulation studies: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]], [[Designing Simulated-Data Experiments]].
- **Human-chosen thresholds** connects to researcher degrees of freedom. If thresholds are chosen after seeing results, the evaluation is compromised: [[Researcher Degrees of Freedom]], [[Pre-registration and Open Science - Overview]].

## See Also

- [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]: §§3.4-3.7
- [[NIST AI RMF - MEASURE Function]]: MEASURE 2.5-2.7 operationalize §§3.1-3.3
- [[NIST AI RMF 1.0 - Overview]]
- [[Cross Validation Checking]]: out-of-sample predictive checking
