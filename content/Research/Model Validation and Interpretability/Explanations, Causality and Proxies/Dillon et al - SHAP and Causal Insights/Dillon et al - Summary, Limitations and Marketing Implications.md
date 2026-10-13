---
title: Dillon et al - Summary, Limitations and Marketing Implications
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - topic/marketing-measurement
  - type/concept
  - type/example
  - method/shap
  - doc/tutorial
source: "[[raw/Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs).md]]"
source_location: "Section 'Summary' (raw lines 541-543) and footer (545-547); limitations and applications are vault synthesis across all sections"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights"
doc_type: tutorial
depends_on:
  - "[[Dillon et al - When SHAP Recovers Causal Effects]]"
  - "[[Dillon et al - Observed Confounding and Double ML for Ad Spend]]"
  - "[[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]]"
  - "[[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]"
used_by:
  - "[[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]"
aliases:
  - SHAP Driver Analysis Checklist
  - Dillon et al Summary and Limitations
---

# Dillon et al - Summary, Limitations and Marketing Implications

> [!summary]
> The article concludes: "Unless features in a model are the result of experimental variation, applying SHAP to predictive models without considering confounding is generally not an appropriate tool to measure causal impacts used to inform policy." Its recommendations are DML on prediction data when confounders are observed, and experiments otherwise. This note also records what the demonstration does **not** show: one seed, one DGP, a known graph, a linear constant-slope DML and a heuristic dendrogram. It then turns the lessons into a checklist for marketing driver analysis, with a worked weekly-media example.
^summary-conclusions

## Overview

The Summary section (raw line 543) makes five points:
1. "Flexible predictive models like XGBoost or LightGBM are powerful tools for solving prediction problems. However, they are not inherently causal models, so interpreting them with SHAP will fail to accurately answer causal questions in many common situations."
2. The no-confounding requirement, quoted in the summary box above.
3. "SHAP and other interpretability tools can be useful for causal inference, and SHAP is integrated into many causal inference packages, but those use cases are explicitly causal in nature." In other words, the objection is to explaining a *predictive* model, not to SHAP itself. SHAP applied to a CATE model explains the *effect* function.
4. "...using the same data we would collect for prediction problems and using causal inference methods like double ML that are particularly designed to return causal effects is often a good approach for informing policy. In other situations, only an experiment or other source of randomization can really answer what if questions."
5. "Causal inference always requires us to make important assumptions. The main point of this article is that the assumptions we make by interpreting a normal predictive model as causal are often unrealistic."

The footer (raw line 547) reads "Have a comment or question? Checkout [Github](https://github.com/shap/shap/blob/main/notebooks/overviews/Be%20careful%20when%20interpreting%20predictive%20models%20in%20search%20of%20causal%20insights.ipynb) or the [Medium](https://towardsdatascience.com/be-careful-when-interpreting-predictive-models-in-search-of-causal-insights-e68626e664b6) version of this article!"

## Main Content

### Consolidated decision table

| Question to ask of a SHAP "driver" | If yes → | Note |
|---|---|---|
| Was the feature randomized or otherwise independent of all causes of $Y$? | SHAP curve ≈ causal curve | [[Dillon et al - When SHAP Recovers Causal Effects#^cond-independence]] |
| Does it cluster low with features that **cause** it and $Y$? | adjust for them with DML | [[Dillon et al - Observed Confounding and Double ML for Ad Spend#^alg-double-ml]] |
| Does it cluster low with features it **causes**? | drop them (total effect) or keep them (direct effect) by design | [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule#^rule-control-or-drop]] |
| Could an unmeasured factor drive both it and $Y$? | no observational fix: experiment, IV, DiD or RD | [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies#^claim-randomization]] |

### Limitations of the demonstration (vault critique)

1. **Single replicate.** Each figure comes from one seed and one $n = 10{,}000$ sample. It is not a simulation study with Monte Carlo error ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]). The DML p-value of 0.85 for Ad spend is one draw.
2. **Known graph.** Every remedy is chosen with the true DAG in hand. The dendrogram heuristic for picking controls is shown to point at the right features, but it cannot tell confounders from mediators or colliders.
3. **Constant-slope DML.** `LinearDML` without effect modifiers estimates one average slope. The true effects are nonlinear (Last upgrade especially), and the plot draws the slope "arbitrarily" through the origin. For curves, use CATE or dose-response estimators ([[R-Learner and Orthogonal CATE Estimation]], [[Honest Trees and Causal Forests]]).
4. **Binary outcome as regression.** `RegressionWrapper` fits the outcome nuisance on the probability scale; the source calls it "a reasonable approximation". The SHAP overlay is on the logit scale and the DML plot on the probability scale, so effect sizes in the two kinds of figure are not directly comparable.
5. **Regularization story is model-specific.** The claim that XGBoost picks Ad spend because it summarizes three causes is a plausible mechanism, not a demonstrated one. A different seed or learner could split credit differently. That is the Rashomon phenomenon of [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] and the selection instability of [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
6. **Code remnants.** There is a stale comment in cell [1] (label "left as probability" but Bernoulli-drawn), a mislabeled comment in cell [13] ("Ad spend" for Discount), and dead code in `plot_effect`. None of these change the conclusions.
7. **SHAP's own definition choices.** Tree SHAP's interventional vs observational value function changes how credit is split among correlated features. The source does not discuss this, but it interacts with the redundancy story. See [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] and [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].

## Examples

> [!example] Example: SHAP on a weekly marketing driver model
> **Setup.** A gradient-boosted model predicts weekly sales from TV, search and social spend, price, promotions and seasonality. 52-156 rows is typical for weekly media data. Budgets are set *in anticipation of* demand, with more spend before holidays, and search spend responds to demand created by TV.
>
> **Reading the SHAP plot causally fails in three ways, one per scenario:**
> 1. *Observed confounding (Ad-spend pattern).* Spend tracks the seasonal demand calendar. A regularized learner can route seasonality through spend and credit the channel with demand it did not create. Fix: put the seasonal and pricing confounders in a DML or an MMM with explicit controls. With about 100 rows the nuisance models are weak, so the [[Regularization Bias and the Partially Linear Model|regularization bias]] that DML corrects is a live concern.
> 2. *Non-confounding redundancy (Sales calls/Interactions pattern).* Branded search is partly a mediator of TV. Including it splits TV's total effect and under-credits TV. Fix: decide the estimand (total vs direct) before choosing controls.
> 3. *Unobserved confounding (Discount pattern).* Competitor activity, distribution changes or demand shocks drive both spend decisions and sales. No observational adjustment fixes this; geo or user-level experiments do ([[Geo-Experiment Methodology - Overview]], [[Conversion Lift Studies on Ad Platforms]]), and their results can calibrate the model ([[Q - Using Experiment Results as Priors in a Bayesian MMM]]).
>
> **Interpretation.** A ranked SHAP bar chart of channels describes the fitted function. It is not an ROI ranking.
^ex-weekly-media

> [!example] Example: choosing among model fits by SHAP mass
> **Setup.** An analyst fits several per-segment tree models of a shared aggregate KPI and picks the one whose total SHAP mass on media features is largest, on the reasoning that it "sees the most media effect".
>
> **Problem.** By the Ad-spend mechanism, the fit that routes the most confounded signal through spend gets the most SHAP mass. The selection rule then rewards observed confounding. It is also a researcher degree of freedom: the analyst chooses among fits after seeing the explanations ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]).
>
> **Better.** Select models by held-out predictive accuracy for the prediction task ([[Cross Validation Checking]]). For effect claims, use causally motivated estimators validated against experiments or simulated ground truth ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]).
^ex-shap-mass-selection

## Connections

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — confounding by targeting and seasonality in MMM; the same three failure modes at the aggregate level.
- [[Bayesian Media Mix Modeling - Overview]] and [[MMM Model Selection and Application]] — the structural alternative to post-hoc SHAP.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — raising Ad spend because it predicts renewal is causal Goodhart.
- [[SR 11-7 - Model Risk Management Guidance - Overview]] and [[NIST AI RMF 1.0 - Overview]] — conceptual-soundness review should ask which task (prediction or causal) a model's explanations are used for.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — the cultural background of the confusion.
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — plausible-but-wrong findings, like Ad spend, are the ones that survive review.

## See Also

- [[Dillon et al - SHAP and Causal Insights - Overview]]
- [[Dillon et al - Prediction Tasks vs Causal Tasks]]
