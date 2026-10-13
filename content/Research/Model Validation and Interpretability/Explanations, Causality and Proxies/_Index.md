---
title: "Index: Explanations, Causality and Proxies"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - topic/goodhart
parent: "[[../_Index|Model Validation and Interpretability]]"
date_updated: 2026-10-13
source_count: 4
note_count: 35
---

# Explanations, Causality and Proxies

> [!abstract] Routing Summary
> This cluster covers why model explanations and optimized metrics are **not** causal levers. It has 4 sub-topics (one per source) and 35 notes: 31 content notes and 4 source indexes. Three sources examine Shapley-value / SHAP attribution: what it computes, the choice between conditional and interventional value functions, and why it does not recover real-world causal effects. The fourth gives the taxonomy of how a proxy metric stops tracking its goal once it is optimized (Goodhart's Law).
> - Need the definition of the Shapley value, its axioms, or what SHAP / KernelSHAP / TreeSHAP compute? → [[Shapley Values and SHAP Value Functions]]
> - Need a general critique of Shapley explanations (redundancy, off-manifold evaluation, additivity, no action guidance)? → [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations/_Index|Kumar et al 2020]]
> - Need to choose between **conditional and marginal (interventional)** SHAP? → [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] and [[Kumar et al - Conditional vs Interventional Shapley Catch-22]]
> - Need proof that conditional SHAP credits a feature the model never uses? → [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]
> - Need why marginal SHAP is causal *for the model* but not *for the world*? → [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]]
> - Need a worked simulation showing SHAP vs the true causal effect, with remedies (double ML, IV/DiD/RD, experiments)? → [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights/_Index|Dillon et al]]
> - Need guidance on whether to include a mediator or confounder as a control? → [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]]
> - Need why "the drivers look right" is not validation? → [[Kumar et al - Shapley Values in Normative Model Evaluation]]
> - Need why optimizing a KPI, selecting the best model, or extrapolating a response curve breaks the metric-goal link? → [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law/_Index|Manheim & Garrabrant 2018]]
> - Need a Goodhart audit checklist for measurement and model validation? → [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]]
^routing-summary

## Sub-topics

- [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations/_Index|Kumar et al 2020 - Problems with Shapley-Value Explanations]] (6 notes): Kumar, Venkatasubramanian, Scheidegger & Friedler, ICML 2020. COVERS: classical Shapley value (permutation and subset forms, symmetry/dummy/additivity axioms, uniqueness); conditional vs interventional value functions and the method-to-value-function table (KernelSHAP defines the conditional game but computes the interventional one); the catch-22 of indirect influence vs off-manifold evaluation; the redundant-player result (eq. 6-13); asymmetric Shapley values; the out-of-distribution / manipulability problem (Fig. 1); linear-model and multiplicative-model Shapley values (eq. 14-23); contrastive explanations and the unrealisable foil; no action guidance ($f=2-(x-1)^2$); confirmation bias in normative model evaluation. **Owner of the Shapley / SHAP definitions.** Overview: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]
- [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem/_Index|Janzing et al 2020 - Feature Relevance as a Causal Problem]] (8 notes): Janzing, Minorics & Blöbaum, AISTATS 2020. COVERS: five baseline-attribution properties, integrated gradients and Theorem 1; Shapley set function eq. (2); conditional (eq. 3) vs marginal (eq. 4) dropping of features; back-door adjustment eq. (5); Example 1 / Lemma 1 (conditional SHAP violates sensitivity); inputs-as-causes, giving $\mathbb E[Y\mid do(X_T=x_T)]=\mathbb E f(x_T,X_{\bar T})$ (eq. 14); the symmetry-axiom objection and reply; KernelSHAP weighted least squares (eq. 15) vs the SHAPR kernel conditional estimator on Gaussian and HAR data (Figs. 4-5); the model-vs-world decision rule. **Owner of interventional vs observational feature relevance.** Overview: [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
- [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights/_Index|Dillon et al - SHAP and Causal Insights]] (9 notes): Dillon, LaRiviere, Lundberg, Roth & Syrgkanis, SHAP documentation case study; all 13 notebook cells reproduced. COVERS: prediction tasks vs causal tasks; a simulated subscriber-retention data-generating process with a known DAG and a `FixableDataFrame` do-operator; SHAP dependence plots overlaid with true causal effects; the independence condition under which SHAP is causal; the redundancy-clustering dendrogram; observed confounding fixed by double ML (econML `LinearDML`, Ad spend $p=0.85$); non-confounding redundancy (mediators) and the control-or-drop rule; unobserved confounding, where double ML fails and IV/DiD/RD/experiments are needed; limitations and a marketing-measurement checklist. **Owner of the applied "SHAP is not causal" workflow.** Overview: [[Dillon et al - SHAP and Causal Insights - Overview]]
- [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law/_Index|Manheim Garrabrant 2018 - Variants of Goodhart's Law]] (8 notes): Manheim & Garrabrant, arXiv:1803.04585v4. COVERS: the regulator / goal / proxy / threshold setup and the definition of a Goodhart effect; history (Goodhart, Campbell, Lucas, cobra); Regressional Goodhart (tails coming apart, shrinkage $\lambda=\tau^2/(\tau^2+\sigma^2)$); Extremal Goodhart (model insufficiency, change in regime); Causal Goodhart (shared-cause, intermediary and metric-manipulation interventions); non-causal look-alikes (ignored shared cause / intermediary / additional cause); Adversarial Goodhart (misalignment, Campbell's law, normal and non-causal cobra effects); applied simulations and a 9-step validation audit. **Owner of the Goodhart taxonomy.** Overview: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]

## Concept Map

| Concept | Kumar et al 2020 | Janzing et al 2020 | Dillon et al | Manheim & Garrabrant 2018 |
|---|---|---|---|---|
| Shapley value definition and axioms | [[Shapley Values and SHAP Value Functions]] (owner) | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] (set-function form, eq. 2; attribution axioms incl. sensitivity) | uses SHAP as given | — |
| Conditional vs interventional / marginal value function | [[Kumar et al - Conditional vs Interventional Shapley Catch-22]]: a catch-22, neither is satisfactory | [[Janzing 2020 - Conditional vs Marginal Dropping of Features]]: marginal is correct for the model | tree-explainer SHAP plots in [[Dillon et al - SHAP Plots vs True Causal Effects]] | — |
| Credit to redundant / correlated / unused features | redundant-player result (eq. 6-13) | [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]] (Lemma 1) | [[Dillon et al - When SHAP Recovers Causal Effects]] (redundancy dendrogram) | — |
| Off-manifold evaluation / extrapolation | out-of-distribution problem, Fig. 1 | acknowledged as a limitation of the marginal value function ([[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]]) | — | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] |
| Model-level vs world-level causality | indirect influence needs causal knowledge | [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] (inputs are the model's only causes) | [[Dillon et al - Prediction Tasks vs Causal Tasks]] | — |
| Confounding (observed / unobserved) | — | back-door eq. (5) | [[Dillon et al - Observed Confounding and Double ML for Ad Spend]]; [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]] | shared cause in [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| Mediators / intermediaries | — | — | [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]] | intermediary intervention; ignored intermediary in [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| Symmetry axiom | symmetry dropped in asymmetric Shapley values | [[Janzing 2020 - Symmetry Axiom Objection and Reply]] | — | — |
| Interactions / non-additive response | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] | — | — | regime change in the extreme region |
| Action guidance (does a positive attribution mean "do more")? | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]: no | no for real-world features | no; acting needs a causal estimate | intervening on a predictive driver causes Causal Goodhart |
| Selection on a noisy score / best-model choice | [[Kumar et al - Shapley Values in Normative Model Evaluation]] (confirmation bias) | — | — | [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] |
| Gaming of metrics and explanations | manipulable via off-manifold behaviour (Slack et al.) | — | — | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| Estimation algorithms | KernelSHAP, TreeSHAP | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] | XGBoost + TreeSHAP; econML `LinearDML` | toy models eq. 1-9; simulations in the applied note |
| Applied / marketing synthesis | MMM failure modes in the overview | [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] | [[Dillon et al - Summary, Limitations and Marketing Implications]] | [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] |
| Formal setup | — | — | [[Dillon et al - Subscriber Retention Data-Generating Process]] | [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] |

## Cross-Cutting Concepts

- **Which value function for "dropped" features: the main disagreement.** [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] argues firmly for the marginal (interventional) expectation. Its reasons are that conditioning violates sensitivity ([[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]) and that intervening on a model's inputs equals marginalizing ([[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]]). [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] agrees that the conditional game credits proxies, but it treats the marginal fix as a second failure: it forces off-manifold evaluation, where the model's behaviour is arbitrary and can be gamed. The two papers agree on the facts (conditional ⇒ indirect influence; marginal ⇒ extrapolation). They disagree on whether the marginal choice settles the matter. Janzing lists extrapolation as a limitation but keeps the marginal value function as the right model-level explanation; Kumar et al. conclude that no general-purpose choice works.
- **Model explanation is not world causation: full agreement.** Janzing restricts its causal claim to the model output ("not a property of the external world"). Kumar et al. say that fixing redundancy requires causal knowledge (asymmetric Shapley values). Dillon et al. show the gap in practice: Ad spend, with zero true effect, ranks as a top driver, and Discount and Bugs reported get the wrong sign ([[Dillon et al - SHAP Plots vs True Causal Effects]]). The causal remedies (double ML, quasi-experiments, randomization) all lie outside the explanation method ([[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]).
- **When SHAP is causal.** Only Dillon et al. state a sufficient condition: the feature is independent of the other features and of unmeasured confounders ([[Dillon et al - When SHAP Recovers Causal Effects]]). This matches Kumar et al.'s linear-model result $\phi(i)=\beta_i(x_i-\mathbb EX_i)$ ([[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]) and Janzing's linear ground-truth experiments ([[Janzing 2020 - KernelSHAP vs SHAPR Experiments]]). With independent features and an additive model, all three readings coincide.
- **Redundancy and proxies.** The same structure, a correlated stand-in for the real cause, appears four ways. Kumar's redundant copy changes the attributions. Janzing's unused correlated input gets credit. Dillon's Ad spend borrows credit from its causal parents, and Interactions takes credit from Sales calls. Manheim & Garrabrant's shared cause breaks under intervention ([[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]]). The Goodhart paper adds a dynamic layer: a proxy that is honestly predictive at rest fails once someone *acts* on it.
- **Mediators: control or drop?** Dillon et al. recommend controlling when unsure, because a controlled mediator gives the direct effect only ([[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]]). Manheim & Garrabrant show what goes wrong when an intermediary is ignored or intervened on ([[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]]). The two notes are complementary: one is about estimation, the other about optimization.
- **"The drivers look right" as false validation.** Kumar et al. document stakeholders who judged a model useful from its importance list alone ([[Kumar et al - Shapley Values in Normative Model Evaluation]]). Manheim & Garrabrant explain why choosing the model or variant with the best-looking score overstates its true quality ([[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]). Both point to the same audit discipline: [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]].
- **Extrapolation.** The off-manifold points that interventional SHAP evaluates (Kumar) and the response-curve region beyond observed spend (Manheim & Garrabrant, extremal Goodhart) are the same hazard: the model is queried where it was never fit ([[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]]).
- **Marketing measurement reading.** All four applied notes reach the same conclusion: a SHAP channel ranking is not an ROI ranking, and a KPI optimized hard enough stops measuring its goal. See [[Dillon et al - Summary, Limitations and Marketing Implications]], [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] and [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]].

## Sources

- Kumar et al 2020 - Problems with Shapley-Value-Based Explanations: Kumar, Venkatasubramanian, Scheidegger & Friedler, "Problems with Shapley-value-based explanations as feature importance measures", ICML 2020, PMLR 119 (arXiv:2002.11097v2), 10 pp.
- Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem: Janzing, Minorics & Blöbaum, "Feature relevance quantification in explainable AI: A causal problem", AISTATS 2020, PMLR 108 (arXiv:1910.13413v2), 11 pp.
- Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs): Dillon, LaRiviere, Lundberg, Roth & Syrgkanis, "Be careful when interpreting predictive models in search of causal insights", SHAP documentation example notebook (13 cells, 11 figures).
- Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law: Manheim & Garrabrant, "Categorizing Variants of Goodhart's Law", arXiv:1803.04585v4, 10 pp.

## See Also

- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]: equally accurate models can rely on different features, so reliance is not causation.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]: conditional permutation importance, a different answer to the correlated-predictor problem.
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]: the off-manifold extrapolation problem for permutation importance.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: predictive accuracy vs understanding, background to the prediction-vs-causal split.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]: confounding and extrapolation in media mix models.
- [[DAGs and Causal Identification]]: back-door adjustment and graph-based identification.
- [[Potential Outcomes Framework]]: the real-world estimand that model attributions do not identify.
- [[Regularization Bias and the Partially Linear Model]]: theory behind the double-ML remedy.
- [[Spurious Association and Confounds]]: confounding in regression.
- [[Experimental Benchmarks for Observational Ad Measurement]]: how far observational ad estimates fall from experimental truth.
- [[Garden of Forking Paths]]: analyst choices that turn validation into confirmation.
