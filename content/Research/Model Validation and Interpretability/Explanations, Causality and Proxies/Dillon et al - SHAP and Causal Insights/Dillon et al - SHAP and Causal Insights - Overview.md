---
title: Dillon et al - SHAP and Causal Insights - Overview
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - topic/double-machine-learning
  - type/overview
  - method/shap
  - method/econml
  - method/xgboost
  - doc/tutorial
source: "[[raw/Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs).md]]"
source_location: "Whole article: SHAP documentation example notebook (overviews), raw file lines 1-547, notebook cells [1]-[13], 11 figures"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights"
doc_type: tutorial
depends_on:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
  - "[[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]"
  - "[[DAGs and Causal Identification]]"
  - "[[Regularization Bias and the Partially Linear Model]]"
used_by:
  - "[[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
aliases:
  - SHAP and Causal Interpretation of Predictive Models
  - Be Careful When Interpreting Predictive Models in Search of Causal Insights
  - Dillon LaRiviere Lundberg Roth Syrgkanis
  - SHAP Is Not Causal
---

# Dillon et al - SHAP and Causal Insights - Overview

> [!summary]
> A SHAP-documentation case study by Eleanor Dillon, Jacob LaRiviere, Scott Lundberg, Jonathan Roth and Vasilis Syrgkanis (Microsoft). It simulates subscriber retention from a **known causal graph**, fits XGBoost to eight observed features, and overlays the true causal effect curve on each SHAP dependence plot. The thesis: "SHAP makes transparent the correlations picked up by predictive ML models. But making correlations transparent does not make them causal!" SHAP matches the causal effect only for a feature that is independent of both the other features and any unmeasured confounders (Economy). It fails in three named ways. **Observed confounding**: Ad spend has zero causal effect yet ranks as a top driver, and double ML with the right controls fixes it ($p = 0.85$). **Non-confounding redundancy**: Sales calls' effect is split with its downstream feature Interactions, and dropping that feature fixes it. **Unobserved confounding**: Discount looks harmful though its effect is positive, and Bugs reported looks helpful though its effect is zero. Double ML fails here too, so only randomization helps.
^summary-overview

## Overview

**Research question.** When does reading an explanation of a *predictive* model (SHAP on gradient-boosted trees) tell a decision-maker which levers to pull? The authors' answer is that it rarely does. "All predictive models implicitly assume that everyone will keep behaving the same way in the future, and therefore correlation patterns will stay constant" (introduction). Intervention questions need causal models, "which requires making assumptions and using the tools of causal analysis".

**Contribution.** The piece is a didactic, fully reproducible notebook rather than a theorem paper. Its contributions are:
1. a clean split between **prediction tasks** and **causal tasks** ([[Dillon et al - Prediction Tasks vs Causal Tasks]]);
2. a simulated data-generating process with a known DAG and a `FixableDataFrame` "do-operator", so true causal effects can be computed and drawn over SHAP plots ([[Dillon et al - Subscriber Retention Data-Generating Process]]);
3. a four-way taxonomy of when SHAP can or cannot be read causally, each case paired with a remedy ([[Dillon et al - SHAP Plots vs True Causal Effects]]);
4. the use of SHAP's **redundancy-clustering dendrogram** to diagnose observed redundancy and to pick candidate controls ([[Dillon et al - When SHAP Recovers Causal Effects]]);
5. a worked **double/debiased ML** (econML `LinearDML`) remedy and its failure mode ([[Dillon et al - Observed Confounding and Double ML for Ad Spend]], [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]);
6. a decision rule for an uncertain graph: **control when unsure** ([[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]]).

**Key findings (in the simulation).**

| Scenario | Feature | What SHAP shows | True causal effect | Double ML (observed controls) | What works |
|---|---|---|---|---|---|
| Independent and unconfounded | Economy | positive, matches truth | positive | not run in the source (no confounders, so not needed) | the predictive model itself |
| Observed confounding (redundancy with causal drivers) | Ad spend | positive, top-3 driver | **zero** | correct: no effect ($p = 0.85$) | DML controlling for Monthly usage and Last upgrade |
| Non-confounding redundancy (mediator in the model) | Sales calls | effect underestimated (credit goes to Interactions) | positive (direct plus via Interactions) | gives the *direct* effect only if the mediator is controlled | drop the downstream feature (univariate model) |
| Unobserved confounding | Discount | negative | small **positive** | **large negative** (fails) | experiment, IV, DiD or RD |
| Unobserved confounding | Bugs reported | positive | **zero** (bugs *faced* has a negative effect) | not run in the source | experiment or measure the confounders |

The source's closing claim is: "The main point of this article is that the assumptions we make by interpreting a normal predictive model as causal are often unrealistic" (Summary).

## Source Map

Section-by-section checklist. Raw-file line numbers refer to the stored markdown copy.

| Source section (raw lines) | Content | Note |
|---|---|---|
| Title, byline, introduction (1-7) | thesis; correlation vs causation; "keep behaving the same way" | [[Dillon et al - Prediction Tasks vs Causal Tasks]] |
| A subscriber retention example (9-135): cells [1]-[2] | eight features; `FixableDataFrame`; `generator`; `user_retention_dataset`; `fit_xgboost` | [[Dillon et al - Subscriber Retention Data-Generating Process]] |
| Same section (137-167): cells [3]-[4], Figs. 1-2 | SHAP global bar plot with clustering; SHAP scatter plots | [[Dillon et al - SHAP Plots vs True Causal Effects]] |
| Prediction tasks versus causal tasks (169-189) | surprising signs (bugs, discounts); business-partner explanations; definitions of the two task types | [[Dillon et al - Prediction Tasks vs Causal Tasks]] |
| The challenges of estimating causal effects (191-245): cell [5], Fig. 3 | causal graph code and edge list | [[Dillon et al - Subscriber Retention Data-Generating Process]] |
| Same section (247-292): cell [6], Fig. 4 | `marginal_effects` true-effect overlay; bugs, discount and ad spend diagnoses | [[Dillon et al - SHAP Plots vs True Causal Effects]] |
| When predictive models can answer causal questions (294-315): cell [7], Fig. 5 | Economy; reading the redundancy dendrogram; independence condition | [[Dillon et al - When SHAP Recovers Causal Effects]] |
| When predictive models cannot ... but causal inference methods can help (317-319) | transition | [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] |
| Observed confounding (321-338): cell [8], Fig. 6 | definition of an observed confounder; regularization picks Ad spend | [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] |
| Observational Causal Inference (340-453): cell [9], Fig. 7 | double ML algorithm; `RegressionWrapper`, `double_ml`, `plot_effect`; $p = 0.85$; Fig. 7 value reading (slope $\approx -0.009$, 99.9% band $\approx \pm 0.04$ on the slope); choosing controls from the dendrogram | [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] |
| Non-confounding redundancy (455-492): cells [10]-[11], Figs. 8-9 | definition; Sales calls and Interactions; direct vs total effects in DML; control-or-drop rule; univariate model | [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]] |
| When neither predictive models nor unconfounding methods can answer causal questions (494-539): cells [12]-[13], Figs. 10-11 | unobserved confounding; DML on Discount fails (Fig. 11 value reading); randomization; IV, DiD, RD | [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]] |
| Summary (541-543) | conclusions | [[Dillon et al - Summary, Limitations and Marketing Implications]] |
| Footer (545-547) | links to the GitHub notebook and the Medium version (full URLs written out) | this note (Sources); [[Dillon et al - Summary, Limitations and Marketing Implications]] |

**Figures** (all hosted on shap.readthedocs.io; descriptions in the linked notes). The source text describes only some panels. Panel-by-panel readings of Figs. 1, 2, 4 and 9 come from the hosted images, are labelled as vault readings and are cross-checked against the vault's true-effect computation:

| Fig. | Cell | Content | Note |
|---|---|---|---|
| 1 | [3] | global mean-abs SHAP bar plot with redundancy dendrogram | [[Dillon et al - SHAP Plots vs True Causal Effects]] |
| 2 | [4] | SHAP scatter (dependence) plots for all 8 features | [[Dillon et al - SHAP Plots vs True Causal Effects]] |
| 3 | [5] | causal graph (graphviz) | [[Dillon et al - Subscriber Retention Data-Generating Process]] |
| 4 | [6] | SHAP scatter plus true causal-effect overlay | [[Dillon et al - SHAP Plots vs True Causal Effects]] |
| 5, 6, 8, 10 | [7], [8], [10], [12] | the same bar plot re-displayed with different commentary | the respective scenario notes |
| 7 | [9] | DML slope for Ad spend vs true (flat) effect, 99.9% band; value reading: slope $\approx -0.009$, band $\approx \pm 0.04$ on the slope, covering 0 | [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] |
| 9 | [11] | univariate Sales-calls SHAP vs true effect | [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]] |
| 11 | [13] | DML slope for Discount vs true (positive) effect; value reading: DML slope $\approx -1.05$ (band $\approx \pm 0.16$) vs true $\approx +0.06$ | [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]] |

**Code cells**: all 13 cells are reproduced verbatim. Cells [1], [2], [5] and [6] are in the DGP and SHAP-plot notes, and cells [3], [4] and [7]-[13] are in the scenario notes.

## Main Content

### Argument flow

1. A predictive model plus SHAP gives a plausible-looking driver ranking: Discount, Ad spend, Bugs reported.
2. The dependence plots show signs that cannot be right for policy: more bugs means more renewal, and bigger discounts mean less renewal.
3. Whether that matters depends on the task. For forecasting it is fine; for choosing interventions it is not.
4. A causal graph locates three mechanisms that drive SHAP away from the causal effect: unobserved confounding, observed confounding through redundancy, and non-confounding redundancy.
5. Each mechanism gets the matching tool: nothing is needed when the feature is independent; DML when all confounders are observed; dropping descendants for mediators; randomization or quasi-experiments when confounders are unobserved.

### Key concepts and where they live

> [!definition] Prediction task vs causal task
> Defined in [[Dillon et al - Prediction Tasks vs Causal Tasks#^def-prediction-task]] and [[Dillon et al - Prediction Tasks vs Causal Tasks#^def-causal-task]].
^ov-tasks

> [!definition] Observed confounder; non-confounding redundancy; unobserved confounding
> See [[Dillon et al - Observed Confounding and Double ML for Ad Spend#^def-observed-confounder]], [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule#^def-nonconfounding-redundancy]] and [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies#^def-unobserved-confounding]].
^ov-failure-modes

> [!theorem] Independence condition for causal SHAP
> See [[Dillon et al - When SHAP Recovers Causal Effects#^cond-independence]].
^ov-condition

> [!algorithm] Double ML (three-step partialling-out)
> See [[Dillon et al - Observed Confounding and Double ML for Ad Spend#^alg-double-ml]].
^ov-dml

## Examples

> [!example] One-line application to marketing analytics
> In a driver model of weekly sales built on 52-156 rows of media data, a ranked SHAP bar chart of channels describes the fitted function. It is not an ROI ranking. Spend that is planned against expected demand behaves like Ad spend here (observed confounding by seasonality). Branded search behaves like Interactions (a mediator of other media). Unmeasured demand shocks behave like Product need. The full worked example is in [[Dillon et al - Summary, Limitations and Marketing Implications]].
^ex-marketing-one-line

## Connections

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] argues abstractly that Shapley values do not tell a user which action to take. This notebook is the concrete demonstration.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] shows that interventional SHAP correctly answers questions about the *model*. This notebook shows why that answer is misread as a statement about the *world*.
- [[Causal Machine Learning - Overview]], [[Regularization Bias and the Partially Linear Model]], [[Neyman Orthogonality]] and [[Cross-Fitting and Sample Splitting]] cover the DML theory behind `LinearDML`.
- [[DAGs and Causal Identification]] and [[Omitted Variables Bias]] give the formal account of all three failures.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] is the "algorithmic modeling" culture whose outputs are being over-read.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] covers causal Goodhart: acting on a non-causal driver such as Ad spend breaks the correlation.
- [[Experimental Benchmarks for Observational Ad Measurement]] and [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] give real-world evidence that observed-confounder adjustment for ads is often not enough.

## See Also

- [[_Index|Index: Dillon et al - SHAP and Causal Insights]] — folder routing table.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — equally accurate models can rely on Ad spend or on its causal parents; reliance is not causation.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — conditional importance handles correlated predictors in a different way.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — the same confounding problems in media mix models.
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — Cox and Efron: prediction is not enough for causal factors
- [[AMSS Discussion, Limitations and Validation Practice]] — simulator protocol for testing SHAP driver rankings against counterfactual effects
- [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] — explainability vs interpretability distinction
- [[Model Reliance, Causal Effects and Conditional Model Reliance]] — conditions under which permutation importance maps to ATE and CATE

## Sources

- Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs). The original notebook is on GitHub (`shap/shap`, `notebooks/overviews/`), and a Medium version appeared in *Towards Data Science* (raw line 547 footer: "Have a comment or question? Checkout Github or the Medium version of this article!").
  - GitHub notebook: <https://github.com/shap/shap/blob/main/notebooks/overviews/Be%20careful%20when%20interpreting%20predictive%20models%20in%20search%20of%20causal%20insights.ipynb>
  - Medium / Towards Data Science: <https://towardsdatascience.com/be-careful-when-interpreting-predictive-models-in-search-of-causal-insights-e68626e664b6>
