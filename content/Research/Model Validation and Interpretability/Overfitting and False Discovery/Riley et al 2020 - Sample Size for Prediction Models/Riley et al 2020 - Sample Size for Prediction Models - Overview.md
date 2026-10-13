---
title: "Riley et al 2020 - Sample Size for Prediction Models - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/sample-size
  - topic/prediction-models
  - type/overview
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "Riley, Ensor, Snell, Harrell, Martin, Reitsma, Moons, Collins & van Smeden (2020), 'Calculating the sample size required for developing a clinical prediction model', BMJ 368:m441 (Research Methods & Reporting, published 18 March 2020). Whole paper, BMJ pp. 1-12: Summary points; introduction; Moving beyond 10 EPV; Steps 1-4; Recommendations and software (Box 1); Applied examples 1-3; Extensions; Conclusion; Figs 1-5. Supplementary material S1-S6 is referenced but not contained in the PDF."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Model Selection and Overfitting]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
used_by:
  - "[[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]"
  - "[[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]]"
  - "[[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]"
  - "[[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]]"
  - "[[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]"
  - "[[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]"
  - "[[Riley 2020 - References, Supplements and Back Matter]]"
aliases:
  - Riley et al 2020
  - Riley BMJ 2020 sample size
  - Calculating the sample size required for developing a clinical prediction model
  - pmsampsize paper
  - Minimum sample size for prediction model development
---

# Riley et al 2020 - Sample Size for Prediction Models - Overview

> [!summary]
> **Question.** How large must a development dataset be for a regression-based prediction model (continuous, binary or time-to-event outcome) to give reliable predictions in new individuals? **Answer.** Not "10 events per variable". The required size depends on the number of **candidate** predictor parameters $P$, the total $n$, the outcome proportion or rate, and the anticipated model fit (Cox-Snell $R^2_{cs}$). The paper turns this into a **four-step procedure**: (1) estimate overall risk or mean outcome precisely; (2) keep mean prediction error small (MAPE $\le 0.05$, or residual SD within 10%); (3) keep expected **shrinkage** $\le 10\%$ via $n = P / [(S-1)\ln(1-R^2_{cs}/S)]$; (4) keep **optimism** in the apparent Nagelkerke $R^2$ $\le 0.05$. Take the **largest** $n$. Implemented in `pmsampsize` (Stata/R). Worked examples need 5249 (binary, EPP 8.75), 5143 (survival, EPP 23.1) and 254 (continuous) participants.
^summary

## Overview

**Motivation (standfirst, p. 1).** Hundreds of prediction models are published each year, but many are developed on datasets too small for the number of participants or outcome events. The standfirst says this leads to inaccurate predictions and so to incorrect healthcare decisions for some individuals. The paper exists to give a principled minimum sample size and close off that failure route. See [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#Standfirst: the motivating problem (p. 1)|the standfirst section]].

**Contribution.** A practical BMJ guide that condenses four methodology papers (van Smeden et al. 2016, 2019; Riley et al. 2019 Parts I and II) into checklist form (Box 1). It is not new theory. It gives closed-form sample-size criteria, guidance for choosing the hard input ($R^2_{cs}$), three worked examples with software calls, and extensions covering subgroups, existing datasets, variable selection, machine learning and model updating.

**Key findings / claims.**
1. The 10 EPP rule is too simplistic. Defensible EPP ranges from below 10 to over 25 depending on context. The paper's own examples give 8.75, 13.8, 20.8, 23.1 and 25.5.
2. Overfitting is governed by the **candidate** parameter count, not by the predictors that survive selection.
3. Post-hoc shrinkage cannot reliably rescue a small sample, because the shrinkage factor is itself estimated imprecisely and is negatively correlated with apparent performance.
4. With binary outcomes $R^2_{cs}$ is capped well below 1 (max 0.33 at prevalence 0.05), so low anticipated $R^2_{cs}$ values are normal and drive large $n$.
5. Machine-learning models may need more than 10 times the events per predictor that regression needs. Data splitting is discouraged; use all the data and bootstrap for internal validation.

**Why it matters outside medicine.** The criteria apply to any regression-type predictive model fitted to a finite dataset. A weekly marketing-mix model with 52-156 rows and dozens of candidate parameters (channel coefficients, adstock and saturation parameters, seasonality terms, controls) is a small-$n$, many-$P$ development problem. The shrinkage and optimism criteria give a principled way to ask "how many parameters can this dataset support?" instead of relying on a rows-per-variable rule of thumb. See [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting#Marketing-analytics reading|the marketing reading]].

## Main Content

### Section map

| Paper section (BMJ page) | Content | Note |
|---|---|---|
| Standfirst (p. 1) | Motivation: many published models built on too-small data, leading to inaccurate predictions and wrong decisions | this note, [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#Standfirst: the motivating problem (p. 1)]] |
| Summary points box (p. 1) | 9 summary points | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#Summary points]] |
| Introduction (pp. 1-2) | What prediction models are; Wells score, QRISK, Nottingham index; pointer to supplement S1 (example equations); development dataset | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]] |
| Moving beyond the 10 EPV rule of thumb (p. 2) | Effective sample size; EPV vs EPP; candidate parameters; history (Peduzzi/Concato 1990s); 2-per-predictor rule for continuous | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]] |
| Sample size calculation to ensure precise predictions... (p. 2) | Four-step framing; largest $n$ wins | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] |
| Step 1: precise overall risk / mean (p. 2) + **Fig 1** (p. 9) | Margin-of-error formulas, binary and exponential survival | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] |
| Step 2: small mean error (pp. 2-3) + **Fig 2** (p. 10) | van Smeden MAPE formula; $234+P$ for continuous residual SD | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] |
| Step 3: small required shrinkage (p. 3) + **Fig 3** (p. 10) | Overfitting, shrinkage, shrinkage formula, examples (206; 1698) | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] |
| Step 3 (cont.): $R^2_{cs}$, max($R^2_{cs}$) values (p. 3) + **Fig 4** (p. 11) | Signal:noise, choosing $R^2_{cs}$, max($R^2_{cs}$) table | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]] |
| Step 4: small optimism (p. 4) + **Fig 5** (p. 12) | Nagelkerke optimism $\delta$; $S$ formula; 1079 example | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] |
| Recommendations and software; **Box 1** (p. 4) | B1-B4, T1-T3, C1-C4; `pmsampsize`; BeyondEPV app | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] |
| Applied examples 1-3 (pp. 4-5) | Pre-eclampsia (binary), recurrent VTE (survival), fat-free mass (continuous) | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] |
| Extensions: key subgroups; existing dataset; variable selection; machine learning; model updating (pp. 5-6) | | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] |
| Conclusion (p. 6) | Use more data if possible; no data splitting; external validation needs a different approach | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] |
| Contributors, funding, competing interests, patient involvement, provenance; accepted 19 Dec 2019 / published 18 Mar 2020 (pp. 6, 8) | Back matter | [[Riley 2020 - References, Supplements and Back Matter#Back matter (p. 6), paraphrased]] |
| References 1-78 (pp. 6-8) | Full itemised bibliography | [[Riley 2020 - References, Supplements and Back Matter#^tab-refs]] |
| Supplementary S1-S6 | Where each is cited and for what (S1 example equations and C1; S2 continuous precision; S3 $234+P$; S4 continuous shrinkage; S5 max($R^2_{cs}$); S6 continuous optimism) | [[Riley 2020 - References, Supplements and Back Matter#Supplementary materials S1-S6: what each is cited for]]. Contents **not in PDF**: see Gaps |

### Source Map (checklist)

| Item | Location | Captured in |
|---|---|---|
| Standfirst motivation (too-small datasets, inaccurate predictions, wrong decisions) | p. 1 | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#Standfirst: the motivating problem (p. 1)]] |
| Summary points (9 bullets) | p. 1 | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#Summary points]] |
| Intro pointer to supplement S1 (example regression equations) | p. 1 | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]], [[Riley 2020 - References, Supplements and Back Matter]] |
| Definition: effective sample size by outcome type | p. 2 | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#^def-eff-n]] |
| Definition: EPV vs EPP, candidate parameters | p. 2 | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule#^def-epp]] |
| Fig 1 binary margin-of-error formula and 385/139/246 | p. 9 | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD#^fig1-binary]] |
| Fig 1 time-to-event exponential CI and 2366 person-years | p. 9 | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD#^fig1-tte]] |
| Fig 2 MAPE regression formula and 461/695 | p. 10 | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD#^fig2-mape]] |
| Continuous residual SD criterion $234+P$ | p. 3 | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD#^res-sd]] |
| Definition of overfitting and of shrinkage | p. 3 | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting#^def-overfit]] |
| Shrinkage paradox (imprecise and negatively correlated) | p. 3 | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting#^shrinkage-paradox]] |
| Fig 3 shrinkage formula and 1698 example (EPP 8.5 vs 25.5) | p. 10 | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting#^fig3-shrinkage]] |
| Continuous shrinkage example (206 for $P=30$, $R^2=0.7$) | p. 3 | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting#^cont-shrink]] |
| Fig 5 optimism formula and 1079 example | p. 12 | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting#^fig5-optimism]] |
| $R^2_{cs}$ definition, signal:noise interpretation | p. 3 | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum#^def-r2cs]] |
| max($R^2_{cs}$) values for prevalence 0.5 down to 0.01 | p. 3 | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum#^tab-maxr2]] |
| Nagelkerke $R^2$ definition | p. 4 | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum#^def-nagelkerke]] |
| Fig 4 three routes to choose $R^2_{cs}$ | p. 11 | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum#^fig4]] |
| Box 1 (B1-B4, T1-T3, C1-C4) | p. 4 | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples#^box1]] |
| Software: `pmsampsize`, BeyondEPV app | p. 4 | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples#Software]] |
| Example 1 pre-eclampsia (5249; 3500) | pp. 4-5 | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples#^ex1]] |
| Example 2 recurrent VTE (5143; 3429) | p. 5 | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples#^ex2]] |
| Example 3 fat-free mass (254) | p. 5 | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples#^ex3]] |
| Key subgroups; separation; sparse-data bias | p. 5 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Accurate predictions in key subgroups]] |
| Existing dataset; "quick look" warning | p. 5 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Existing datasets]] |
| Variable selection / lasso / elastic net; selection instability | pp. 5-6 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Variable selection and penalisation]] |
| Machine learning needs more data (>10x EPP; >200 EPP unstable) | p. 6 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Machine learning]] |
| Model updating (recalibration; constrained updating) | p. 6 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Model updating]] |
| Conclusion: no data splitting; bootstrap; external validation differs | p. 6 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Conclusion]] |
| Back matter (contributors, funding, competing interests, PPI, dates) | pp. 6, 8 | [[Riley 2020 - References, Supplements and Back Matter#Back matter (p. 6), paraphrased]] |
| References 1-78 (incl. core methodology 13-16; alternative $R^2$ 39-42; external validation 75-78) | pp. 6-8 | [[Riley 2020 - References, Supplements and Back Matter#^tab-refs]] |
| Supplement map S1-S6 | pp. 1-4 | [[Riley 2020 - References, Supplements and Back Matter#Supplementary materials S1-S6: what each is cited for]] |

## Examples

> [!example] One-glance summary of the paper's numbers
> | Setting | Inputs | Binding criterion | Required $n$ | EPP |
> |---|---|---|---|---|
> | Fig 1 binary | $\phi=0.5$, $\delta=0.05$ | B1 | 385 | — |
> | Fig 2 binary | $\phi=0.3$, $P=10$, MAPE 0.05 | B2 | 461 | 13.8 |
> | Fig 3 binary | $P=20$, $R^2_{cs}=0.1$, $S=0.9$ | B3 | 1698 | 8.5 ($\phi=0.1$) / 25.5 ($\phi=0.3$) |
> | Fig 5 binary | $P=20$, $R^2_{cs}=0.2$, $\phi=0.05$ | B4 | 1079 | — |
> | Ex. 1 pre-eclampsia | $P=30$, $\phi=0.05$, $R^2_{cs}=0.05$ | B3 | 5249 | 8.75 |
> | Ex. 2 recurrent VTE | $P=30$, rate 0.065, $R^2_{cs}=0.051$ | T2 | 5143 | 23.1 |
> | Ex. 3 fat-free mass | $P=20$, $R^2=0.9$, mean 26.7, SD 8.7 | residual SD | 254 | 12.7 per parameter |
^tab-summary

## Connections

- **Overfitting theory.** Formalises, for the frequentist regression setting, what [[Model Selection and Overfitting]] and [[Overfitting and Information Criteria]] describe as optimism. The Step 4 "optimism in apparent $R^2$" is the same quantity that cross-validation and bootstrap optimism correction estimate ([[Cross Validation Checking]]).
- **Shrinkage.** Step 3 targets a uniform shrinkage factor (van Houwelingen / Copas), the frequentist relative of [[Empirical Bayes Interpretation of Shrinkage]] and of Bayesian regularising priors ([[Global-Local Shrinkage Priors]], [[Regularized Horseshoe (Finnish Horseshoe)]]).
- **Sample-size planning.** The prediction-model analogue of [[Power Analysis and Sample Size]]. The question is "precise and not overfit", not "significant".
- **False discovery.** Candidate-parameter counting is the modelling face of [[Researcher Degrees of Freedom]] and the [[Garden of Forking Paths]]. See [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] and [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- **Selection instability.** The extension section's warning about unstable selected subsets is the problem addressed by [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- **ML vs regression.** The ">10x events per predictor for ML" finding is a data-hunger counterpoint to [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- **MMM.** Small-$n$ marketing-mix data: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]].

## Gaps

- Supplementary materials S1-S6 (continuous-outcome intercept and residual-variance derivations, continuous shrinkage and optimism formulas, the max($R^2_{cs}$) derivation) are **not in the ingested PDF**. Where a formula is standard (max($R^2_{cs}$) for a binary outcome) it is reconstructed and **labelled as reconstructed**. The paper's continuous-outcome shrinkage figures (206, 68) are recorded as stated and not re-derived.
- References 1-78 are itemised in [[Riley 2020 - References, Supplements and Back Matter]]. The papers themselves (e.g. van Smeden et al. 2016 BMC Med Res Methodol 16:163; van Smeden et al. 2019 Stat Methods Med Res 28:2455-74; Riley et al. 2019 Stat Med 38:1262-75 and 1276-96) are not ingested in the vault.

## See Also

- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] — start here to apply the method
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — the van Smeden MAPE formula is the output of a simulation study of the kind ADEMP describes
- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] — internal validation when rows are serially dependent
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — model-development standards that a sample-size justification supports
