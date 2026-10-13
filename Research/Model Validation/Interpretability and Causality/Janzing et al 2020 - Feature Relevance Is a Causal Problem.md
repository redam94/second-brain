---
title: "Janzing et al 2020 - Feature Relevance Is a Causal Problem"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "AISTATS 2020, PMLR 108; arXiv:1910.13413v2, p. 5, fn. 4"
citation: "Janzing, D., Minorics, L. & Blöbaum, P. (2020). Feature relevance quantification in explainable AI: A causal problem. Proceedings of the 23rd International Conference on Artificial Intelligence and Statistics (AISTATS), PMLR 108."
date_ingested: 2026-10-13
folder: "Model Validation/Interpretability and Causality"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Do-Calculus in Summary Causal DAGs]]"
used_by:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations]]"
  - "[[Dillon et al - SHAP Predictive Models and Causal Insights]]"
aliases:
  - "Janzing 2020"
  - "Feature relevance quantification in explainable AI: A causal problem"
  - "Interventional SHAP"
---

# Janzing et al 2020 - Feature Relevance Is a Causal Problem

> [!summary]
> Janzing, Minorics & Blöbaum argue that choosing how to "remove" features when computing Shapley-style relevance is a **causal** question, and that, because the model's inputs causally determine its output, the right value function is the **interventional** (marginal) expectation, not the observational conditional one. The crucial corollary for validators: this relevance is about the *algorithm's* output, not the real-world target — "Y is the output of the system and not a property of the external world."

## Overview

*Janzing, D., Minorics, L. & Blöbaum, P. (2020). AISTATS 2020, PMLR 108. [arXiv:1910.13413v2]*

Shapley-based explanations (e.g. SHAP) need a value function $v(S)$: the model's expected output when only features $S$ are fixed. Earlier SHAP work motivated the conditional expectation $\mathbb E[f(X)\mid X_S = x_S]$ and then approximated it, under a feature-independence assumption, by the marginal expectation. The paper argues the marginal form is not merely an approximation but the conceptually correct quantity.

## Main Content

### The causal model of explanation

Distinguish the real-world variables $X_1,\dots,X_n$ from the **inputs** $\tilde X_1,\dots,\tilde X_n$ fed into the algorithm, with output $Y = f(\tilde X)$. In observational data $\tilde X_j = X_j$, but the inputs are the only causes of $Y$ in this causal model ([[Directed Acyclic Graphs]]). Asking "how relevant is feature $j$ for the output?" means asking what happens to $Y$ when the inputs are set — an intervention.

> [!definition] Interventional value function
> For instance $x$ and coalition $S$,
> $$v_x(S) = \mathbb E\big[Y \mid do(\tilde X_S = x_S)\big] = \int f(x_S, x_{\bar S})\, p(x_{\bar S})\, dx_{\bar S},$$
> i.e. the absent inputs keep their **marginal** (observational) distribution. Because $Y$ depends on $X$ only through $f$, intervening on inputs $\tilde X_S$ does not change the distribution of the other inputs, so no back-door adjustment beyond the marginal is needed. The observational conditional $\mathbb E[Y\mid \tilde X_S = x_S]$ differs whenever features are dependent.
^def-interventional-value-function

### Why the observational version fails

With the conditional expectation, a feature that has **no influence on $f$** can still receive non-zero relevance, simply because conditioning on it changes the expected value of correlated features that $f$ does use. The authors show examples where this violates the intuitive requirement that an input which does not enter the function gets zero attribution, and argue that the interventional formulation restores it.

### Scope

The interventional relevance quantifies the dependence of the *model's output* on its inputs. It says nothing about how the real-world target would change if the real-world variable were manipulated, unless the model itself is a valid causal model of that target. The authors stress this distinction (Key Passage).

## Key Passages

> "Accordingly, Y is the output of the system and not a property of the external world." — Janzing, Minorics & Blöbaum (2020), p. 5, fn. 4

## Implications for Model Validation

- Interventional SHAP is the right tool for **auditing what a model does** (which inputs move its predictions); it is not evidence about what moves the business outcome.
- When communicating SHAP results, label them as properties of the model ("the model's forecast is sensitive to X"), not of the world ("X drives sales").
- The interventional form still evaluates the model on input combinations that may be unrealistic under strong correlation ([[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations]]); validators should check whether such regions are relevant.
- To make causal statements about real drivers, a separate causal analysis (DAG, adjustment, experiment) is required ([[Dillon et al - SHAP Predictive Models and Causal Insights]]).

## Connections

- Gives the causal rationale for interventional Shapley values, which [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] critiques from the user-goal side.
- The marginal/conditional distinction parallels marginal versus conditional permutation importance in [[Strobl et al 2008 - Conditional Variable Importance]].
- Uses $do$-notation as in [[Do-Calculus in Summary Causal DAGs]]; the model-versus-world distinction echoes the [[Table 2 Fallacy]].

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] — limits of both value functions
- [[Dillon et al - SHAP Predictive Models and Causal Insights]] — why model relevance is not policy relevance
- [[Directed Acyclic Graphs]] — causal graphs underlying the argument
- [[Causal Estimands]] — what a real-world causal effect would be
