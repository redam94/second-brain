---
title: "Kumar et al 2020 - Problems with Shapley-Value Explanations"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/definition
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "ICML 2020, PMLR 119; arXiv:2002.11097v2, §4.2, §4.3"
citation: "Kumar, I. E., Venkatasubramanian, S., Scheidegger, C. & Friedler, S. A. (2020). Problems with Shapley-value-based explanations as feature importance measures. Proceedings of the 37th International Conference on Machine Learning (ICML), PMLR 119."
date_ingested: 2026-10-13
folder: "Model Validation/Interpretability and Causality"
doc_type: paper
depends_on:
  - "[[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]]"
  - "[[Janzing et al 2020 - Feature Relevance Is a Causal Problem]]"
used_by:
  - "[[Dillon et al - SHAP Predictive Models and Causal Insights]]"
aliases:
  - "Kumar 2020"
  - "Problems with Shapley-value-based explanations"
---

# Kumar et al 2020 - Problems with Shapley-Value Explanations

> [!summary]
> Kumar, Venkatasubramanian, Scheidegger & Friedler argue that Shapley-value feature importance (including SHAP) has both **mathematical** problems — every choice of value function either evaluates the model off the data distribution or credits features the model does not use — and **human-centric** problems: the explanations do not tell users what to change, yet stakeholders treat importance lists as validation. For model validators, a SHAP ranking is neither a test of model quality nor a recommendation for action.

## Overview

*Kumar, I. E., Venkatasubramanian, S., Scheidegger, C. & Friedler, S. A. (2020). ICML 2020, PMLR 119. [arXiv:2002.11097v2]*

Shapley values from cooperative game theory became the dominant way to attribute a model's prediction to its inputs because they are the unique attribution satisfying a set of attractive axioms. The paper asks whether those axioms, once a value function for "a model with only some features present" is chosen, actually deliver explanations that answer the questions people bring to them.

## Main Content

> [!definition] Shapley value
> For a set of $n$ players $N$ and a value function $v: 2^N \to \mathbb R$, player $i$'s Shapley value is
> $$\phi_i(v) = \sum_{S \subseteq N\setminus\{i\}} \frac{|S|!\,(n-|S|-1)!}{n!}\,\big[v(S \cup \{i\}) - v(S)\big],$$
> the average marginal contribution of $i$ over all orderings of the players. It is the unique attribution satisfying **efficiency** ($\sum_i \phi_i = v(N) - v(\emptyset)$), **symmetry**, **dummy/null player** (a player that never changes $v$ gets 0) and **linearity/additivity**.
^def-shapley-value

For model explanation the players are features and one must define $v(S)$ — the model's output when only features $S$ are "known" — for an instance $x$:

> [!definition] Value functions for feature attribution
> - **Conditional (observational):** $v_x(S) = \mathbb E\big[f(X) \mid X_S = x_S\big]$.
> - **Interventional (marginal):** $v_x(S) = \mathbb E_{X_{\bar S}}\big[f(x_S, X_{\bar S})\big]$, drawing the absent features from their marginal distribution, independent of $x_S$.
^def-shapley-value-functions

### Mathematical problems

- **Interventional value functions evaluate off-manifold.** Combining $x_S$ with independently drawn $X_{\bar S}$ creates inputs the model never saw when features are dependent — the same extrapolation issue as [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]].
- **Conditional value functions credit unused features.** Because $\mathbb E[f(X)\mid X_S = x_S]$ changes when a feature correlated with a used feature is conditioned on, a feature the model ignores can receive non-zero Shapley value: the dummy axiom holds with respect to the *game*, not the *model*. Explanations therefore conflate model behaviour with data correlations, and are expensive and hard to estimate.
- **Additivity hides interactions.** Shapley values split an interaction effect among the participating features according to fixed weights, so a single number per feature cannot convey how features combine; different underlying models can yield the same attributions.

### Human-centric problems

- Shapley values do not answer **contrastive** or **counterfactual** questions ("what should change for a different outcome?").
- They are not **actionable**: a large attribution does not imply that changing the feature will change the outcome (Key Passage, §4.2).
- In practice, importance lists are used to build trust in a model — the authors report a case where stakeholders judged a model "useful" from the importance list alone (Key Passage, §4.3).

The authors conclude that Shapley explanations should be used only with a clear, narrow question in mind, and call for explanation methods tailored to specific user goals.

## Key Passages

> "Further, observing that a certain feature carries a large influence over the model does not necessarily imply that changing that feature (even significantly) will change the outcome favorably." — Kumar et al. (2020), §4.2

> "In one instance, when developers communicated the results of a modeling effort to project managers, the stakeholders immediately decided it was "useful" based entirely on the feature importance list" — Kumar et al. (2020), §4.3

## Implications for Model Validation

- Do not accept a plausible-looking SHAP ranking as evidence that a model is valid; plausibility of explanations is not predictive or causal validation.
- Record which SHAP variant (interventional versus conditional/"tree path dependent") produced a ranking; with correlated drivers the variants can disagree, and neither is "the" importance.
- Interaction-heavy tree models compress into additive attributions that can look stable while concealing different underlying behaviours.
- Driver rankings used for recommendations need a causal design; SHAP does not supply one ([[Dillon et al - SHAP Predictive Models and Causal Insights]]).

## Connections

- [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]] defends the interventional value function for describing the *model*; Kumar et al. show it still has costs (off-manifold evaluation) and that neither choice answers the user's actual question.
- Proxy credit under the conditional value function mirrors marginal-importance problems in forests ([[Strobl et al 2008 - Conditional Variable Importance]]).
- Stakeholder over-trust in importance lists connects to selection of convenient findings ([[Garden of Forking Paths]]) and to metric gaming ([[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]]).

## See Also

- [[Dillon et al - SHAP Predictive Models and Causal Insights]] — practical demonstration of SHAP's causal limits
- [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] — the off-manifold problem
- [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]] — the causal argument for interventional SHAP
- [[Fisher et al 2019 - Model Class Reliance]] — importance is model-specific
- [[Counterfactual Inference]] — the counterfactual questions Shapley values do not answer
