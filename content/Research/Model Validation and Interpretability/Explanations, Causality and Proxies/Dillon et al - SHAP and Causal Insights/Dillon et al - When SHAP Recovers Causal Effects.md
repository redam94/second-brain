---
title: Dillon et al - When SHAP Recovers Causal Effects
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/theorem
  - type/concept
  - method/shap
  - doc/tutorial
source: "[[raw/Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs).md]]"
source_location: "Section 'When predictive models can answer causal questions', cell [7], Fig. 5 (raw lines 294-315)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights"
doc_type: tutorial
depends_on:
  - "[[Dillon et al - SHAP Plots vs True Causal Effects]]"
  - "[[Conditional Independence Assumption]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Dillon et al - Observed Confounding and Double ML for Ad Spend]]"
  - "[[Dillon et al - Summary, Limitations and Marketing Implications]]"
aliases:
  - SHAP Redundancy Clustering Diagnostic
  - Independence Condition for Causal SHAP
---

# Dillon et al - When SHAP Recovers Causal Effects

> [!summary]
> The success case. XGBoost plus SHAP recovers the causal effect of **Economy** because the feature has a "strong independent component": it is redundant neither with other measured features nor with unmeasured confounders. The SHAP bar plot's **redundancy dendrogram** can check the first condition. Economy merges with other features only at the top, so there is no observed confounding. The second condition, no unobserved confounding, is invisible to any data diagnostic and "requires using domain knowledge". Such independence is rare naturally but common for **experimentally varied** features.
^summary-when-shap-causal

## Overview

"Notice that our predictive model does a good job of capturing the real causal effect of the Economy feature (a better economy has a positive effect on retention). So when can we expect predictive models to capture true causal effects?" (raw line 296). In the DGP, $E \sim U(0,1)$ is a root node with a single child, Did renew ([[Dillon et al - Subscriber Retention Data-Generating Process#^def-retention-scm]]). Its observed correlation with every other feature is about 0.00-0.02.

## Main Content

> [!theorem] Condition: Independence makes predictive SHAP causal (raw lines 298, 313, 315)
> "The important ingredient that allowed XGBoost to get a good causal effect estimate for Economy is the feature's strong independent component (in this simulation); its predictive power for retention is not strongly redundant with any other measured features, or with any unmeasured confounders. In consequence, it is not subject to bias from either unmeasured confounders or feature redundancy."
>
> General statement: "For classic predictive ML models to deliver causal results the features need to be independent not only of other features in the model, but also of unobserved confounders."
>
> Practical corollary: "It's not common to find examples of drivers of interest that exhibit this level of independence naturally, but we can often find examples of independent features when our data contains some experiments."
^cond-independence

**Why it works (vault gloss).** If $X_j \perp (X_{-j}, U)$, where $U$ are the unobserved causes of $Y$, then $X_j$ has no back-door path. So $\mathbb E[Y \mid do(X_j = x)] = \mathbb E[Y \mid X_j = x]$. The observational regression on $X_j$, and any additive component a model attributes to it, then targets the causal curve. Independence from the other model inputs also means the model has no incentive to route $X_j$'s signal through a proxy, or a proxy's signal through $X_j$. This is the same logic that makes a randomized treatment unconfounded ([[The Experimental Ideal]], [[Conditional Independence Assumption]]). The condition is sufficient, not necessary: [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] shows how to do better when only the *observed* part fails.

### Reading the redundancy dendrogram (cell [7], Fig. 5)

Cell [7] (raw lines 305-306), verbatim:

```python
# Economy is independent of other measured features.
shap.plots.bar(shap_values, clustering=clust, clustering_cutoff=1)
```

[Fig. 5](https://shap.readthedocs.io/en/latest/_images/example_notebooks_overviews_Be_careful_when_interpreting_predictive_models_in_search_of_causal_insights_15_0.png) is the same bar plot as Fig. 1.

> [!definition] Definition: Redundancy clustering in the SHAP bar plot (raw line 311)
> "Since we have added clustering to the right side of the SHAP bar plot we can see the redundancy structure of our data as a dendrogram. When features merge together at the bottom (left) of the dendrogram it means that that [sic] the information those features contain about the outcome (renewal) is very redundant and the model could have used either feature. When features merge together at the top (right) of the dendrogram it means the information they contain about the outcome is independent from each other."
>
> The clustering is computed by `shap.utils.hclust(X, y, linkage="single")`. It is *supervised*: it uses `y`, so it measures redundancy **with respect to the outcome**, not raw collinearity. `clustering_cutoff=1` controls which merges are drawn.
^def-redundancy-clustering

> [!algorithm] Procedure: two-part causal-readiness check for a SHAP driver
> 1. **Observed redundancy (data check).** Locate the feature in the dendrogram. If it merges with other features only near the top, as Economy does, it passes: "We can see that Economy is independent from all the other measured features by noting that Economy does not merge with any other features until the very top of the clustering dendrogram. This tells us that Economy does not suffer from observed confounding" (raw line 313). If it merges low, as Ad spend does with Monthly usage and Last upgrade, or Sales calls with Interactions, do not read its SHAP values causally. Go to [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] or [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]].
> 2. **Unobserved confounding (domain check).** "But to trust that the Economy effect is causal we also need to check for unobserved confounding. Checking for unmeasured confounders is harder and requires using domain knowledge (provided by the business partners in our example above)." No dendrogram can show this. Discount and Bugs reported pass step 1 and still fail ([[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]).
> 3. Only if both checks pass, or the feature was **randomized**, read the SHAP dependence curve as a causal-effect curve.
^proc-causal-readiness

## Examples

> [!example] Example: an experimentally varied lever
> **Setup.** Suppose part of the discount schedule had been set by a randomized price test, independent of salespeople's beliefs about product need.
>
> **Result.** Within that randomized slice, Discount is independent of Product need. A predictive model trained on those rows meets the independence condition for Discount, and its SHAP curve would tilt toward the true small positive effect. That is the source's remark that independent features appear "when our data contains some experiments".
>
> **Interpretation.** In marketing data, randomized holdouts and geo tests play this role. Linking them to an observational model is the theme of [[Q - Using Experiment Results as Priors in a Bayesian MMM]].
^ex-experimental-lever

> [!example] Example: what the check would say about each feature
> | Feature | Dendrogram (per source) | Domain check | Causal SHAP? |
> |---|---|---|---|
> | Economy | joins only at top | no known hidden confounder | yes |
> | Ad spend | redundant with Monthly usage, Last upgrade | — | no (observed confounding) |
> | Sales calls | redundant with Interactions | — | no (credit split) |
> | Discount | "fairly independent" | Product need confounds | no |
> | Bugs reported | "fairly independent" | Product need, Bugs faced confound | no |
^ex-feature-check

## Connections

- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — a model-side treatment of correlated predictors in importance scores. It complements, but does not replace, the causal check.
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — which redundant feature a regularized learner picks is unstable across resamples. That is another symptom of the same redundancy.
- [[Sensitivity Analysis in Observational Studies]] — a formal way to carry out step 2 when domain knowledge is incomplete.

## See Also

- [[Dillon et al - SHAP and Causal Insights - Overview]]
- [[Dillon et al - SHAP Plots vs True Causal Effects]]
