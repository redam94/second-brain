---
title: Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §5 Conclusion and Acknowledgements p.9; scope remarks §1 p.2 and §3 p.5 (footnote 4); editorial synthesis"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]]"
  - "[[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]"
  - "[[Janzing 2020 - Symmetry Axiom Objection and Reply]]"
  - "[[Janzing 2020 - KernelSHAP vs SHAPR Experiments]]"
used_by:
  - "[[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]"
aliases:
  - True to the model vs true to the data (Janzing context)
  - Model-level vs world-level attribution
---

# Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution

> [!summary]
> §5 restates the paper's claim. Recent attribution proposals contain a misconception: they use observational conditional distributions where interventional ones belong. SHAP's *implementation* escapes this because its "approximation" (marginal expectations) is the right quantity anyway. Attempts to "improve" SHAP with better conditional estimates are conceptually flawed, and vaguely stated axioms such as symmetry leave room for interpretation. This note collects the paper's conclusions, its explicit scope limits, and the limitations that matter when SHAP is used in model validation and marketing analytics.
^summary

## Overview

The paper's §5 (p.9) is a single paragraph plus acknowledgements. It restates the claims of §3 and the evidence of §4 and adds no new results. Below, the conclusion is first transcribed point by point, then set against the scope limits the paper states itself (§1 p.2, §3 p.5 and footnote 4). The limitations table and decision rule after that are editorial synthesis and are marked as such.

## Main Content

### §5 Conclusion, as stated (p.9)

1. **Problem.** Attributing the output for one particular multivariate input to the individual features.
2. **Misconception.** Recent proposals use **observational conditional** distributions rather than **interventional** distributions. The argument is phrased in Pearl's (2000) causal language.
3. **SHAP partly unaffected.** Parts of SHAP are unaffected, "although the corresponding theory part of the paper suffers from this issue", because they "'approximates' [sic] the observational expectations by an expression that would have been the right one in the first place."
4. **Why the clarification matters.** Other authors tried to "improve" SHAP "in a way that we consider conceptually flawed" (Aas et al. 2019 and conditional TreeSHAP, §3).
5. **Axioms.** Desirable properties "stated in a too vague manner" leave "some room for interpretation". The authors argued why their attribution satisfies a reasonable symmetry property, answering the criticism that interventional attribution violates symmetry ([[Janzing 2020 - Symmetry Axiom Objection and Reply]]).

*Acknowledgements (p.9):* Scott Lundberg and Anders Løland (the SHAP and SHAPR authors) for feedback, and Atalanti Mastakouri for remarks on the presentation.

### The paper's own scope limits

- **Model-level causality only.** The causal structure used is inputs → output of "this technical input / output system", and "$Y$ is the output of the system and not a property of the external world" (p.5, fn. 4). The argument is "agnostic about the causal relations between the true features in the real world".
- **Expectation baseline only.** The analysis concerns attribution of $f(x)-\mathbb E[f(X)]$ for a chosen $P_X$. Which $P_X$ to use (the training data, a reference population, a background subsample) is left open.
- **Self-described overlap with the literature.** The authors say the "big overlap of the present paper with existing literature is justified by aiming at this clarification only". Datta et al. (2016) contains the ideas "at least implicitly" (p.2).

### Limitations not resolved by the paper (editorial)

| Limitation | Why it matters | Where developed |
|---|---|---|
| **Off-manifold evaluation.** Eq. (14) requires $f(x_T,X_{\bar T})$ at combinations never observed. | Flexible learners (trees, nets) extrapolate arbitrarily there, so marginal SHAP can describe behaviour in regions where $f$ is unconstrained by data. | [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] |
| **Model ≠ world.** Interventional on the *model* is not interventional on the *market*. | A large marginal SHAP value for a channel can come from confounding or reverse causation in training data. | [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]], [[Dillon et al - SHAP and Causal Insights - Overview]] |
| **One model among many.** Attribution is a property of one fitted $f$. | Equally accurate models can attribute very differently (Rashomon set). | [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] |
| **Analyst choice of value function and background.** Conditional vs marginal vs baseline, and which background sample. | A forking path: the attribution can be tuned after seeing results. | [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]] |
| **Evidence is linear and histogram-only.** | Ground truth equals the marginal definition, and no error summaries are given. | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] |
| **Data-level questions are legitimate too.** | "Which variables carry information about $Y$?" is a different, also valid question, and conditional schemes target it. | [[Strobl et al 2008 - Conditional Variable Importance - Overview]] |

The debate that followed is usually summarised as **"true to the model" (interventional/marginal) vs "true to the data" (observational/conditional)**. That framing is not in this paper, but it is a fair description of where it sits: Janzing et al. are the canonical "true to the model" position.

### Practical guidance distilled

> [!theorem] Decision rule: which value function for which question (synthesis)
> - **"Does the fitted model use feature $j$, and how does its output respond?"** (debugging, model validation, effective challenge of a scoring model) → **marginal/interventional** SHAP, which satisfies sensitivity for $f$. Check how much of the background sample lies off the data manifold.
> - **"How much information about the outcome does feature $j$ carry, given the others?"** (data understanding) → a conditional scheme or conditional permutation importance, accepting that proxies share credit.
> - **"What happens to real sales if we change spend on channel $j$?"** → **neither**. Use identification: randomised or geo experiments, and causal models with confounders ([[Causal Machine Learning - Overview]], [[DML Estimators for ATE and the Interactive Model]], [[Experimental Benchmarks for Observational Ad Measurement]]).
^thm-decision-rule

## Examples

> [!example] Example: Choosing among model fits by SHAP mass (anti-pattern)
> A team fits several per-segment tree models of a shared aggregate KPI and keeps the one whose total SHAP mass on paid media looks most "reasonable", instead of comparing held-out accuracy. Janzing's framework shows why this does not validate anything. Marginal SHAP mass describes how each candidate $f$ responds to its inputs; it is not evidence about the market. Conditional SHAP mass mixes in the correlation structure of the inputs. Both can be moved by the choice of background data. Selection on attribution is a forking path ([[Researcher Degrees of Freedom]]). The appropriate checks are out-of-sample performance and experimental calibration, e.g. [[Q - Using Experiment Results as Priors in a Bayesian MMM]].
^ex-choosing-among-model-fits

> [!example] Example: Correlated media flighting (marketing illustration)
> In weekly data with 52-156 rows, TV and online video are usually flighted together. A tree model may split mostly on TV. Marginal SHAP then gives video near zero, which is correct for the model, and conditional SHAP gives video a share, which reflects the flighting plan. Neither tells the planner what video would add if flighted separately. Only variation that breaks the co-flighting, such as experiments or planned holdouts, can answer that. See [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] on correlated inputs in MMM.
^ex-correlated-media-flighting

## Connections

- The model-level causal argument behind the conclusions: [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation#^thm-eq14-interventional-marginal]].
- The evidence base: [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] (linear models, histograms only).
- The counter-position that conditional and interventional SHAP both have costs: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- Why SHAP output is not causal evidence about the market: [[Dillon et al - SHAP and Causal Insights - Overview]].

## See Also

- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — paper map
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — explanation outputs as part of effective challenge
- [[NIST AI RMF 1.0 - Overview]] — explainability and interpretability characteristics
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — interpreting algorithmic models
