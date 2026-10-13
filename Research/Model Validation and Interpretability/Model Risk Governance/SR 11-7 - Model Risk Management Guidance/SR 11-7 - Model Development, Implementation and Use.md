---
title: SR 11-7 - Model Development, Implementation and Use
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/concept
  - type/definition
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §IV Model Development, Implementation, and Use, pp. 5-8: intro p. 5 + fn. 4; 'Model Development and Implementation' pp. 5-7; 'Model Use' pp. 7-8 + fn. 5"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]"
used_by:
  - "[[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - SR 11-7 Model Development Standards
  - Asymmetry of User Challenge
  - SR 11-7 Conservatism Principle
---

# SR 11-7 - Model Development, Implementation and Use

> [!summary]
> Pillar 1 of SR 11-7 (§IV). Development must start from a **clear statement of purpose**, document theory and methods with attention to merits and limitations, **compare alternative approaches**, rigorously assess **data quality and relevance** (proxies identified, justified, documented), and **test** accuracy, robustness, stability and behaviour at extreme inputs — using a *variety* of tests, because "Any single test is rarely sufficient." Judgmental adjustments must be systematic and documented, and models must be integrated into information systems with controls. In **use**, users provide feedback but their challenge is weak, non-comprehensive and **asymmetric** — they rarely challenge favourable outcomes — so independent criticism is required. Reports should show **ranges** rather than point estimates, and claims of **conservatism** must be defined, measured and substantiated.

## Overview

§IV opens (p. 5) by stressing that "Model development is not a straightforward or routine technical process." The "experience and judgment of developers, as much as their technical knowledge, greatly influence the appropriate selection of inputs and processing components," and the training and experience of developers "affects the extent of model risk." Modelling is "multidisciplinary," models "should be tailored for specific applications and informed by business uses," and "a considerable amount of subjective judgment is exercised at various stages of model development, implementation, use, and validation." The point: "this subjectivity elevates the importance of sound and comprehensive model risk management processes."

**Footnote 4 (p. 5).** Smaller banks relying on vendor models "may be able to satisfy the standards in this guidance without an in-house staff of technical, quantitative model developers," but must "still choose the particular models and variables that are appropriate to its size, scale, and lines of business and ensure the models are appropriate for the intended use" (see [[SR 11-7 - Validation of Vendor and Third-Party Models]]).

## Main Content

### A. Model development and implementation (pp. 5-7)

> [!definition] Standard: Development Requirements (SR 11-7, §IV, pp. 5-6)
> 1. **Purpose.** "An effective development process begins with a clear statement of purpose to ensure that model development is aligned with the intended use."
> 2. **Theory and documentation.** "The design, theory, and logic underlying the model should be well documented and generally supported by published research and sound industry practice." Methodologies and processing components, "including the mathematical specification and the numerical techniques and approximations, should be explained in detail with particular attention to merits and limitations."
> 3. **Correctness.** Developers should ensure components "work as intended, are appropriate for the intended business purpose, and are conceptually sound and mathematically and statistically correct."
> 4. **Alternatives.** "Comparison with alternative theories and approaches is a fundamental component of a sound modeling process."
^def-development-requirements

#### Data (p. 6)

> [!definition] Standard: Data Quality, Relevance and Proxies (SR 11-7, §IV, p. 6)
> "there should be rigorous assessment of data quality and relevance, and appropriate documentation." Developers "should be able to demonstrate that such data and information are suitable for the model and that they are consistent with the theory behind the approach and with the chosen methodology."
> - "If data proxies are used, they should be carefully identified, justified, and documented."
> - If data "are not representative of the bank's portfolio or other characteristics, or if assumptions are made to adjust the data," these factors "should be properly tracked and analyzed so that users are aware of potential limitations."
> - "This is particularly important for external data and information (from a vendor or outside party), especially as they relate to new products, instruments, or activities."
^def-data-standard

#### Testing (p. 6)

> [!definition] Standard: Model Testing (SR 11-7, §IV, p. 6)
> Testing evaluates "the various components of a model and its overall functioning ... to determine whether the model is performing as intended." It includes:
> - "checking the model's accuracy, demonstrating that the model is robust and stable, assessing potential limitations, and evaluating the model's behavior over a range of input values";
> - assessing "the impact of assumptions" and identifying "situations where the model performs poorly or becomes unreliable";
> - applying testing "to actual circumstances under a variety of market conditions, including scenarios that are outside the range of ordinary expectations," covering "the variety of products or applications for which the model is intended";
> - evaluating "Extreme values for inputs ... to identify any boundaries of model effectiveness";
> - evaluating "The impact of model results on other models that rely on those results as inputs."
>
> Testing documentation should include "the purpose, design, and execution of test plans, summary results with commentary and evaluation, and detailed analysis of informative samples."
^def-testing-standard

> [!theorem] Principle: No Single Test Suffices (SR 11-7, §IV, p. 6)
> "The nature of testing and analysis will depend on the type of model and will be judged by different criteria depending on the context." "the appropriate statistical tests depend on specific distributional assumptions and the purpose of the model. Furthermore, in many cases statistical tests cannot unambiguously reject false hypotheses or accept true ones based on sample information. Different tests have different strengths and weaknesses under different conditions. Any single test is rarely sufficient, so banks should apply a variety of tests to develop a sound model."
^thm-no-single-test

This is the regulator's version of a familiar statistical point: tests have limited power and size distortions under misspecification (e.g. [[Granger 2003 - Spurious Regression and Cointegration - Overview]] on nominal $t$-tests in trending data), and a single passed test is weak evidence (cf. [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]). The remedy — a battery of tests probing different failure modes — parallels [[Posterior Predictive Checking]] with multiple test statistics.

#### Judgmental adjustments and systems (p. 7)

- **Judgmental and qualitative aspects** must also be sound. Banks may "take statistical output from a model and modify it with judgmental or qualitative adjustments"; this "may be appropriate," but adjustments must be "conducted in an appropriate and systematic manner, and are well documented."
- **Information systems.** "Models typically are embedded in larger information systems that manage the flow of data from various sources into the model and handle the aggregation and reporting of model outcomes." Model calculations "should be properly coordinated with the capabilities and requirements of information systems," and sound model risk management "depends on substantial investment in supporting systems to ensure data and reporting integrity, together with controls and testing to ensure proper implementation of models, effective systems integration, and appropriate use." (Compare [[Modeling as Software Development]].)

### B. Model use (pp. 7-8)

**Use as a test bed.** "Model use provides additional opportunity to test whether a model is functioning effectively and to assess its performance over time as conditions and model applications change." Users are "a knowledgeable internal constituency with strong interest in having models that function well," can "provide valuable business insight during the development process," and business managers who "do not agree with the outcome" may question methods — "Such questioning can be healthy if it is constructive and causes model developers to explain and justify the assumptions and design of the models."

> [!theorem] Principle: Asymmetry of User Challenge (SR 11-7, §IV "Model Use", p. 7)
> User challenge has three structural weaknesses:
> 1. **Weak** — it "may be weak if the model does not materially affect their results, if the resulting changes in models are perceived to have adverse effects on the business line, or if change in general is regarded as expensive or difficult."
> 2. **Not comprehensive** — users "focus on aspects of models that have the most direct impact on the user's measured business performance or compensation, and thus may ignore other elements and applications of the models."
> 3. **Asymmetric** — "users are less likely to challenge an outcome that results in an advantage for them. Indeed, users may incorrectly believe that model risk is low simply because outcomes from model-based decisions appear favorable to the institution."
>
> **Consequence:** "the nature and motivation behind model users' input should be evaluated carefully, and banks should also solicit constructive suggestions and criticism from sources independent of the line of business using the model."
^thm-user-challenge-asymmetry

**Why it matters statistically.** Asymmetric challenge is a selection filter: errors that make results look good survive, errors that make them look bad are fixed. Over many iterations this produces systematically optimistic models even when each individual fix is correct — the organisational form of the [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]], and a channel for [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview|Goodhart effects]] when users' compensation depends on model outputs.

#### Reports (pp. 7-8)

"Reports used for business decision making play a critical role in model risk management." They "should be clear and comprehensible and take into account the fact that decision makers and modelers often come from quite different backgrounds and may interpret the contents in different ways." "Reports that provide a range of estimates for different input-value scenarios and assumption values can give decision makers important indications of the model's accuracy, robustness, and stability as well as information on model limitations."

#### Model uncertainty (p. 8)

> [!definition] Standard: Accounting for Model Uncertainty (SR 11-7, §IV, p. 8)
> "An understanding of model uncertainty and inaccuracy and a demonstration that the bank is accounting for them appropriately are important outcomes of effective model development, implementation, and use." All models "have some degree of uncertainty and inaccuracy." These "can sometimes be quantified, for example, by an assessment of the potential impact of factors that are unobservable or not fully incorporated in the model, or by the confidence interval around a statistical model's point estimate." "Indeed, using a range of outputs, rather than a simple point estimate, can be a useful way to signal model uncertainty and avoid spurious precision." "At other times, only a qualitative assessment of model uncertainty and inaccuracy is possible."
>
> Ways to account for uncertainty: explicitly adjusting inputs or calculations "to produce more severe or adverse model output in the interest of conservatism"; "judgmental conservative adjustments to model output"; "placing less emphasis on that model's output"; or "ensuring that the model is only used when supplemented by other models or approaches."
^def-model-uncertainty

**Footnote 5 (p. 8).** Where models generate amounts in public financial statements, "any adjustments for model uncertainty must comply with generally accepted accounting principles."

#### Conservatism (p. 8)

> [!theorem] Principle: Conservatism Must Be Demonstrated, Not Asserted (SR 11-7, §IV, p. 8)
> Banks "should be careful in applying conservatism broadly or claiming to make conservative adjustments," because "the impact of such conservatism in complex models may not be obvious or intuitive." Specifically:
> - "Model aspects that appear conservative in one model may not be truly conservative compared with alternative methods."
> - "simply picking an extreme point on a given modeled distribution may not be conservative if the distribution was misestimated or misspecified in the first place."
> - "initially conservative assumptions may not remain conservative over time."
>
> Therefore banks "should justify and substantiate claims that model outputs are conservative with a definition and measurement of that conservatism that is communicated to model users." "sensitivity analysis or other types of stress testing can be used to demonstrate that a model is indeed conservative." A further option is "an additional cushion of capital."
>
> **Two failure modes of conservatism:** it "can become an impediment to proper model development and application if it is seen as a solution that dissuades the bank from making the effort to improve the model," and "excessive conservatism can lead model users to discount the model outputs."
^thm-conservatism-must-be-demonstrated

The misspecified-distribution point is sharp: a 99th percentile of a wrong predictive distribution is not a conservative bound. Calibration of the predictive distribution ([[Q - Four Meanings of Calibration]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]) is the precondition for any tail-based conservatism.

#### Transition to validation (p. 8)

"it is not enough for model developers and users to understand and accept the model. Because model risk is ultimately borne by the bank as a whole, the bank should objectively assess model risk and the associated costs and benefits using a sound model-validation process." → [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]].

## Examples

> [!example] Example: Development checklist derived from §IV (generic marketing illustration)
> **Setup:** a team builds a weekly sales-response model with 104 rows and 10 media/control variables.
> 1. *Purpose statement:* "forecast weekly sales 8 weeks ahead for inventory planning" — explicitly *not* channel attribution.
> 2. *Theory:* saturation and carryover forms cited from published work ([[Bayesian Media Mix Modeling - Overview]]); alternative specifications (no adstock; different saturation) compared.
> 3. *Data:* impressions used as a proxy for exposure — flagged, justified and documented; two missing weeks imputed and tracked.
> 4. *Tests:* holdout accuracy, residual autocorrelation, stability of coefficients across rolling windows, behaviour at 0 and 3x historical spend (boundary of effectiveness), effect on the downstream budget optimiser that consumes its output.
> 5. *Report:* forecast with 80% interval and scenario table rather than a single number.
> 6. *Conservatism claim:* "we use the lower 10% quantile for planning" — accompanied by a coverage check showing the 10% quantile is actually exceeded ~90% of the time out of sample.
^ex-development-checklist-derived-from

> [!example] Example: Asymmetric challenge in practice (generic illustration)
> Two model versions differ only in a prior. Version A shows a channel returning 3x; version B 1.2x. The channel manager challenges B ("the prior is too tight") but not A. Each challenge may be individually reasonable, yet the selection process now favours A for reasons unrelated to evidence. SR 11-7's remedy: evaluate "the nature and motivation behind model users' input" and obtain independent criticism.
^ex-asymmetric-challenge-in-practice

## Connections

- Comparing alternative approaches ↔ [[MMM Model Selection and Application]], [[Model Selection and Overfitting]].
- Testing at extreme inputs ↔ [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] (models evaluated off the data manifold behave arbitrarily).
- Ranges not point estimates ↔ [[Probabilistic Forecasting - Overview]].
- Adequate sample size for development ↔ [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]
- [[SR 11-7 - Conceptual Soundness, Sensitivity Analysis and Stress Testing]] — validation re-examines the developmental evidence produced here
