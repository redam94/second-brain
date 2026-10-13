---
title: "Breiman 2001 - Statistical Modeling The Two Cultures"
tags:
  - source/ingested
  - topic/model-validation
  - topic/predictive-modeling
  - topic/feature-importance
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Statistical Science 16(3), 199–231 (2001), published version; quoted pp. 201, 206"
citation: "Breiman, L. (2001). Statistical modeling: The two cultures (with comments and a rejoinder by the author). Statistical Science, 16(3), 199–231."
date_ingested: 2026-10-13
folder: "Model Validation/Time Series Validation"
doc_type: paper
depends_on:
  - "[[Model Checking]]"
  - "[[Model Comparison]]"
used_by:
  - "[[Bergmeir et al 2018 - Cross-Validation for Time Series]]"
  - "[[Fisher et al 2019 - Model Class Reliance]]"
  - "[[Strobl et al 2007 - Bias in Random Forest Variable Importance]]"
  - "[[Meinshausen and Buhlmann 2010 - Stability Selection]]"
  - "[[Riley et al 2020 - Sample Size for Prediction Models]]"
aliases:
  - "Breiman 2001"
  - "The Two Cultures"
  - "Statistical Modeling: The Two Cultures"
  - "Rashomon effect"
---

# Breiman 2001 - Statistical Modeling The Two Cultures

> [!summary]
> Breiman contrasts the "data modeling" culture (assume a stochastic model, estimate its parameters, validate by goodness-of-fit) with the "algorithmic modeling" culture (treat the mechanism as unknown, judge models by predictive accuracy on held-out data). He argues for held-out predictive accuracy as the criterion of a good model — while also documenting the **Rashomon effect**: many different models predict equally well yet tell different stories about which variables matter. Both halves are central to validating ML models used for driver analysis.

## Overview

Breiman, L. (2001). *Statistical modeling: The two cultures*. **Statistical Science** 16(3), 199–231, with discussion by D. R. Cox, B. Efron, B. Hoadley and E. Parzen, and a rejoinder.

**Question.** Has statistics' commitment to data models limited its relevance, and what should replace goodness-of-fit as the test of a model?

**Context.** Drawing on his consulting experience (e.g. ozone-level forecasting, identifying chlorine-containing compounds from mass spectra) and the development of CART, bagging and random forests, Breiman estimated that about 98% of statisticians worked in the data-modeling culture and 2% in the algorithmic culture.

## Main Content

### Two cultures

- **Data modeling.** Assume $y = f(x;\theta) + \varepsilon$ with a specified stochastic form (e.g. linear regression, logistic regression); conclusions are about the model's parameters. Validation relies on goodness-of-fit tests and residual analysis, which Breiman argues have little power to reject a wrong model in many dimensions — so conclusions are about the model's mechanism, not nature's.
- **Algorithmic modeling.** Treat nature's box as unknown; find a function $f(x)$ (trees, forests, neural nets, SVMs) that predicts $y$ well. Validation is by **predictive accuracy on test data or cross-validation**.

### Three lessons

> [!definition] Rashomon effect (multiplicity of good models)
> For a given dataset there is often a large set of different models — different variables, different functional forms — whose prediction errors are nearly equal. Each tells a different story about which inputs matter, so the "important variables" of any single fitted model are not uniquely determined by the data.

^def-rashomon-effect

1. **Rashomon** — multiplicity of good models (above). Breiman's illustration: in best-subset regression, several small subsets of variables reach nearly the same residual sum of squares yet contain different variables, and perturbing the data changes which is selected.
2. **Occam** — the conflict between simplicity and accuracy: the most accurate predictors (forests, ensembles) are complex, while simple interpretable models are often less accurate.
3. **Bellman** — dimensionality can be a blessing: adding many features (e.g. via kernels) can increase predictive information for algorithmic methods.

### Information from black boxes

Breiman argues that accurate algorithmic models can still yield insight — e.g. random-forest **permutation variable importance** — and that a more accurate model gives more reliable information about the mechanism than a poorly fitting interpretable one. (Later work on the biases of permutation importance qualifies this: see [[Strobl et al 2007 - Bias in Random Forest Variable Importance]], [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]].)

In the discussion, Cox and Efron defended the data-modeling tradition, stressing that interpretation, causal questions and scientific understanding require more than predictive accuracy.

## Key Passages

> "Predictive accuracy on test sets is the criterion for how good the model is." — Breiman (2001), p. 201

> "Perturb the data slightly and you will very possibly get a different four-variable model and a different conclusion about which variables are important." — Breiman (2001), p. 206

## Implications for Model Validation

- **Held-out performance is the primary check** for any predictive model; in-sample fit or training accuracy is not evidence. For time series the test set must be in the future of the training data ([[Bergmeir et al 2018 - Cross-Validation for Time Series]]).
- **Predictive accuracy does not license driver interpretation.** Because of the Rashomon effect, a single model's feature ranking (e.g. SHAP or permutation importance) is one of many equally good stories; validation should examine importance across the set of near-optimal models ([[Fisher et al 2019 - Model Class Reliance]]) or across resamples ([[Meinshausen and Buhlmann 2010 - Stability Selection]]).
- **Stability tests.** Refit on bootstrap samples or slightly perturbed data and report how much rankings change; Breiman's quote predicts they often will.
- **Prediction ≠ causation.** The Cox/Efron objection — that policy questions need causal models — is the foundation of [[Dillon et al - SHAP Predictive Models and Causal Insights]] and [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]].

## Connections

- Rashomon effect → [[Fisher et al 2019 - Model Class Reliance]] (formalises importance over a class of good models) and [[Meinshausen and Buhlmann 2010 - Stability Selection]].
- Random-forest importance → [[Strobl et al 2007 - Bias in Random Forest Variable Importance]], [[Strobl et al 2008 - Conditional Variable Importance]].
- Predictive validation in the Bayesian workflow → [[Model Checking]], [[Model Comparison]].
- Small-sample optimism of apparent fit → [[Riley et al 2020 - Sample Size for Prediction Models]].

## See Also

- [[Fisher et al 2019 - Model Class Reliance]] — variable importance across the Rashomon set
- [[Meinshausen and Buhlmann 2010 - Stability Selection]] — selection stable under perturbation
- [[Strobl et al 2007 - Bias in Random Forest Variable Importance]] — biases in Breiman's importance measures
- [[Bergmeir et al 2018 - Cross-Validation for Time Series]] — test-set accuracy when data are serially dependent
- [[Dillon et al - SHAP Predictive Models and Causal Insights]] — why predictive importance is not causal
- [[Model Comparison]] — predictive model comparison (LOO, information criteria)
