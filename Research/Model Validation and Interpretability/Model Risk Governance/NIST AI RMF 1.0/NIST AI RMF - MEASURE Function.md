---
title: "NIST AI RMF - MEASURE Function"
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]"
source_location: "NIST AI 100-1 (Jan 2023), Part 2 §5.3 Measure pp. 28-29 (PDF pp. 33-34); Table 3 Categories and subcategories for the MEASURE function pp. 29-31 (PDF pp. 34-36)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/NIST AI RMF 1.0"
doc_type: reference
depends_on:
  - "[[NIST AI RMF - MAP Function]]"
  - "[[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]"
  - "[[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]"
used_by:
  - "[[NIST AI RMF - MANAGE Function]]"
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
aliases:
  - AI RMF MEASURE Function
  - AI RMF Table 3
  - MEASURE 2.13 Meta-Evaluation of TEVV
  - AI RMF Independent Assessors
---

# NIST AI RMF - MEASURE Function

> [!summary]
> **MEASURE** "employs quantitative, qualitative, or mixed-method tools, techniques, and methodologies to analyze, assess, benchmark, and monitor AI risk and related impacts" (§5.3, p. 28). It should include "rigorous software testing and performance assessment methodologies with associated measures of uncertainty, comparisons to performance benchmarks, and formalized reporting." Independent review "can mitigate internal biases and potential conflicts of interest." Systems are tested "before their deployment and regularly while in operation." Table 3 has 4 categories and 22 subcategories, the largest function. The subcategories that matter most for validation: **MEASURE 1.1** (document what *cannot* be measured), **1.3** (assessors who were not front-line developers), **2.1** (document test sets, metrics and tools), **2.3** (performance "demonstrated for conditions similar to deployment"), **2.5** (demonstrated valid and reliable, with generalization limits documented), **2.9** (model explained, validated, documented), **2.13** (the *TEVV metrics themselves* are evaluated), **3.x** (tracking emergent risks over time) and **4.x** (feedback on whether measurement works).
^summary

## Overview

MEASURE is the AI RMF's model-validation function. It turns the TEVV role from Fig. 3 ([[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]) into required outcomes, and it operationalizes each trustworthiness characteristic (§3) as a MEASURE 2.x subcategory. Two features stand out compared with ordinary validation practice. Unmeasurable risks must be *documented*, not ignored (1.1, 3.2). And the measurement process must itself be evaluated (2.13, 4.x).

## Main Content

### §5.3 narrative (pp. 28-29)

> [!definition] Definition: MEASURE Function (AI RMF §5.3, p. 28)
> "The MEASURE function employs quantitative, qualitative, or mixed-method tools, techniques, and methodologies to analyze, assess, benchmark, and monitor AI risk and related impacts. It uses knowledge relevant to AI risks identified in the MAP function and informs the MANAGE function. AI systems should be tested before their deployment and regularly while in operation. AI risk measurements include documenting aspects of systems' functionality and trustworthiness."
^def-measure

> [!theorem] Requirements on Measurement Processes (AI RMF §5.3, p. 28)
> 1. **Scope**: "tracking metrics for trustworthy characteristics, social impact, and human-AI configurations."
> 2. **Rigor**: processes "should include rigorous software testing and performance assessment methodologies with associated measures of uncertainty, comparisons to performance benchmarks, and formalized reporting and documentation of results."
> 3. **Independence**: "Processes for independent review can improve the effectiveness of testing and can mitigate internal biases and potential conflicts of interest."
> 4. **Traceable tradeoffs**: "Where tradeoffs among the trustworthy characteristics arise, measurement provides a traceable basis to inform management decisions. Options may include recalibration, impact mitigation, or removal of the system from design, development, production, or use, as well as a range of compensating, detective, deterrent, directive, and recovery controls."
> 5. **End state**: "After completing the MEASURE function, objective, repeatable, or scalable test, evaluation, verification, and validation (TEVV) processes including metrics, methods, and methodologies are in place, followed, and documented."
> 6. **Norms**: "Metrics and measurement methodologies should adhere to scientific, legal, and ethical norms and be carried out in an open and transparent process. New types of measurement, qualitative and quantitative, may need to be developed. The degree to which each measurement type provides unique and meaningful information to the assessment of AI risks should be considered."
> 7. **Outcome**: users "will enhance their capacity to comprehensively evaluate system trustworthiness, identify and track existing and emergent risks, and verify efficacy of the metrics." "Measurement outcomes will be utilized in the MANAGE function to assist risk monitoring and response efforts" ([[NIST AI RMF - MANAGE Function]]). MEASURE must continue "as knowledge, methodologies, risks, and impacts evolve over time."
^thm-measure-requirements

Each requirement corresponds to a familiar statistical practice:

| AI RMF phrase | Statistical counterpart |
|---|---|
| "associated measures of uncertainty" | Intervals, posterior uncertainty, calibrated predictive distributions ([[Conformal Prediction - Overview]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]) |
| "comparisons to performance benchmarks" | Naive or seasonal-naive baselines, the current incumbent model, the human baseline (§1.2.1) |
| "independent review" | Separation of builder and validator (Fig. 3) |
| "objective, repeatable" | Scripted, versioned evaluation pipelines ([[Modeling as Software Development]]) |
| "verify efficacy of the metrics" | Known-truth simulation of the validation procedure (MEASURE 2.13) |
| "unique and meaningful information" | Avoid redundant metrics; ask what each check could detect |

### Table 3: MEASURE categories and subcategories (pp. 29-31)

Transcribed from Table 3 (line breaks joined).

**MEASURE 1: Appropriate methods and metrics are identified and applied.**

| ID | Subcategory |
|---|---|
| MEASURE 1.1 | Approaches and metrics for measurement of AI risks enumerated during the MAP function are selected for implementation starting with the most significant AI risks. The risks or trustworthiness characteristics that will not – or cannot – be measured are properly documented. |
| MEASURE 1.2 | Appropriateness of AI metrics and effectiveness of existing controls are regularly assessed and updated, including reports of errors and potential impacts on affected communities. |
| MEASURE 1.3 | Internal experts who did not serve as front-line developers for the system and/or independent assessors are involved in regular assessments and updates. Domain experts, users, AI actors external to the team that developed or deployed the AI system, and affected communities are consulted in support of assessments as necessary per organizational risk tolerance. |

**MEASURE 2: AI systems are evaluated for trustworthy characteristics.**

| ID | Subcategory | §3 characteristic |
|---|---|---|
| MEASURE 2.1 | Test sets, metrics, and details about the tools used during TEVV are documented. | (all) |
| MEASURE 2.2 | Evaluations involving human subjects meet applicable requirements (including human subject protection) and are representative of the relevant population. | — |
| MEASURE 2.3 | AI system performance or assurance criteria are measured qualitatively or quantitatively and demonstrated for conditions similar to deployment setting(s). Measures are documented. | Valid & reliable |
| MEASURE 2.4 | The functionality and behavior of the AI system and its components – as identified in the MAP function – are monitored when in production. | Valid & reliable |
| MEASURE 2.5 | The AI system to be deployed is demonstrated to be valid and reliable. Limitations of the generalizability beyond the conditions under which the technology was developed are documented. | Valid & reliable |
| MEASURE 2.6 | The AI system is evaluated regularly for safety risks – as identified in the MAP function. The AI system to be deployed is demonstrated to be safe, its residual negative risk does not exceed the risk tolerance, and it can fail safely, particularly if made to operate beyond its knowledge limits. Safety metrics reflect system reliability and robustness, real-time monitoring, and response times for AI system failures. | Safe |
| MEASURE 2.7 | AI system security and resilience – as identified in the MAP function – are evaluated and documented. | Secure & resilient |
| MEASURE 2.8 | Risks associated with transparency and accountability – as identified in the MAP function – are examined and documented. | Accountable & transparent |
| MEASURE 2.9 | The AI model is explained, validated, and documented, and AI system output is interpreted within its context – as identified in the MAP function – to inform responsible use and governance. | Explainable & interpretable |
| MEASURE 2.10 | Privacy risk of the AI system – as identified in the MAP function – is examined and documented. | Privacy-enhanced |
| MEASURE 2.11 | Fairness and bias – as identified in the MAP function – are evaluated and results are documented. | Fair |
| MEASURE 2.12 | Environmental impact and sustainability of AI model training and management activities – as identified in the MAP function – are assessed and documented. | (sustainability) |
| MEASURE 2.13 | Effectiveness of the employed TEVV metrics and processes in the MEASURE function are evaluated and documented. | (meta) |

**MEASURE 3: Mechanisms for tracking identified AI risks over time are in place.**

| ID | Subcategory |
|---|---|
| MEASURE 3.1 | Approaches, personnel, and documentation are in place to regularly identify and track existing, unanticipated, and emergent AI risks based on factors such as intended and actual performance in deployed contexts. |
| MEASURE 3.2 | Risk tracking approaches are considered for settings where AI risks are difficult to assess using currently available measurement techniques or where metrics are not yet available. |
| MEASURE 3.3 | Feedback processes for end users and impacted communities to report problems and appeal system outcomes are established and integrated into AI system evaluation metrics. |

**MEASURE 4: Feedback about efficacy of measurement is gathered and assessed.**

| ID | Subcategory |
|---|---|
| MEASURE 4.1 | Measurement approaches for identifying AI risks are connected to deployment context(s) and informed through consultation with domain experts and other end users. Approaches are documented. |
| MEASURE 4.2 | Measurement results regarding AI system trustworthiness in deployment context(s) and across the AI lifecycle are informed by input from domain experts and relevant AI actors to validate whether the system is performing consistently as intended. Results are documented. |
| MEASURE 4.3 | Measurable performance improvements or declines based on consultations with relevant AI actors, including affected communities, and field data about context-relevant risks and trustworthiness characteristics are identified and documented. |

^table3-measure

### Three ideas in MEASURE that formalize good statistical practice

> [!theorem] MEASURE 1.1 + 3.2: Document the Unmeasurable (Table 3, pp. 29-30)
> "The risks or trustworthiness characteristics that will not – or cannot – be measured are properly documented" (1.1). "Risk tracking approaches are considered for settings where AI risks are difficult to assess using currently available measurement techniques or where metrics are not yet available" (3.2).
>
> **Reading:** A validation report has to list its blind spots. For an observational attribution model, the causal accuracy of attributions usually *cannot* be measured from the training data, and the report must say so. This is the operational form of §1.2.1's principle that being unable to measure a risk does not make it low.
^thm-document-unmeasurable

> [!theorem] MEASURE 1.3: Independent Assessment (Table 3, p. 29)
> Assessments involve "internal experts who did not serve as front-line developers for the system and/or independent assessors." Domain experts, users, external actors and affected communities are consulted "as necessary per organizational risk tolerance."
>
> **Reading:** This is the Fig. 3 separation principle restated as a required outcome. The level of independence scales with risk tolerance, like SR 11-7's proportionality.
^thm-independent-assessment

> [!theorem] MEASURE 2.13 + 4.x: Meta-Evaluation of the Validation Process (Table 3, pp. 30-31)
> "Effectiveness of the employed TEVV metrics and processes in the MEASURE function are evaluated and documented" (2.13). MEASURE 4 requires "feedback about efficacy of measurement," including domain-expert input "to validate whether the system is performing consistently as intended" (4.2), and documented "performance improvements or declines" from field data (4.3).
>
> **Reading (vault gloss).** A validation check $V$ is a test whose job is to flag a defective model. Its effectiveness is its **power** to detect the defects that matter, $\Pr(V \text{ flags} \mid \text{model defective})$, at an acceptable false-alarm rate, $\Pr(V \text{ flags} \mid \text{model adequate})$. These can only be estimated where the truth is known. That means simulation with planted defects ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) or comparison against experimental ground truth ([[Experimental Benchmarks for Observational Ad Measurement]]). For example, high in-sample $R^2$ has almost no power to detect a misranked driver, so it fails MEASURE 2.13 as a check of attribution validity.
^thm-meta-evaluation

### Mapping MEASURE 2.x to concrete checks for a predictive model

| Subcategory | Concrete check for a statistical / ML model |
|---|---|
| 2.1 | Validation report records the test-set definition (time window, holdout geography), metrics, software versions |
| 2.3 | Out-of-time / rolling-origin evaluation on periods like the deployment period ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]) |
| 2.4 | Production monitoring: forecast vs actual, interval coverage, input drift ([[Forecast Evaluation and Backtesting]]) |
| 2.5 | Validity for intended use. For causal uses: recovery of known effects in simulation, agreement with experiments. Document extrapolation limits |
| 2.6 | "Fail safely ... beyond its knowledge limits": e.g. refuse or flag recommendations outside the observed spend range |
| 2.9 | Explanation (coefficients, SHAP) and its validation, e.g. stability across refits ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]) and across the Rashomon set ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]) |
| 2.11 | Disaggregated error by segment; checks for systematic under-performance |
| 2.13 | Simulation study of the validation pipeline itself |
| 3.1 | Scheduled re-checks; incident log for unanticipated failures |
| 4.2 | Domain experts review whether outputs make business sense |

## Examples

> [!example] Example: Evaluating whether a validation metric works (MEASURE 2.13; generic illustration)
> **Setup:** A team validates per-segment driver models with two checks. (A) Held-out MAPE below 10%. (B) Total SHAP mass of the top three drivers above 60%.
>
> **Meta-evaluation design:**
> 1. Simulate 500 synthetic datasets with 104 weekly rows and known driver effects. Plant a defect in half of them: an omitted confounder that inflates a non-causal channel.
> 2. Fit the production pipeline to each dataset and apply checks A and B.
> 3. Estimate each check's detection rate on defective datasets and its false-alarm rate on clean ones.
>
> **Plausible outcome (hypothetical; not reported in the source):** Check A flags few confounded datasets, because the confounder keeps prediction accurate. Check B may *pass* confounded datasets more often, because concentrated spurious attributions raise SHAP mass. Neither check is effective for the attribution use, so MEASURE 2.13 records this, and MEASURE 1.1 records causal validity as not measurable by the current pipeline.
>
> **Lesson:** Choosing among model fits by attribution mass instead of held-out accuracy can *select for* the defect. A measurement that has not been evaluated can be worse than none (cf. [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
^ex-evaluating-whether-a-validation

## Connections

- **Uncertainty measures**: [[Q - Four Meanings of Calibration]], [[Conformal Prediction - Overview]], [[Simulation-Based Calibration - Overview]] (verifying that posterior uncertainty is computed correctly).
- **Predictive checks**: [[Posterior Predictive Checking]], [[Prior Predictive Checking]], [[Cross Validation Checking]].
- **Independent assessment and analytic flexibility**: [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Researcher Degrees of Freedom]].
- **Feature-importance validity (MEASURE 2.9)**: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Spurious validity in time series**: [[Granger 2003 - Spurious Regression and Cointegration - Overview]]. A high-fit regression of trending series passes naive accuracy checks.
- **SR 11-7 crosswalk**: MEASURE 2.3/2.5 ↔ outcomes analysis and back-testing; MEASURE 2.9 ↔ conceptual soundness; MEASURE 1.3 ↔ effective challenge ([[SR 11-7 - Model Risk Management Guidance - Overview]]).

## See Also

- [[NIST AI RMF - MANAGE Function]]: what is done with measurement results
- [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]: TEVV roles
- [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]
- [[NIST AI RMF 1.0 - Overview]]
