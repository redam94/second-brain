---
title: "Index: Kumar et al 2020 - Problems with Shapley-Value Explanations"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Explanations, Causality and Proxies]]"
date_updated: 2026-10-13
concept_count: 6
---

# Kumar et al 2020 - Problems with Shapley-Value Explanations

> [!abstract] Routing Summary
> This folder fully captures Kumar, Venkatasubramanian, Scheidegger & Friedler (ICML 2020), a critique of Shapley-value feature attribution (SHAP, KernelSHAP, TreeSHAP, QII, FAE). Contains 6 notes spanning Shapley/SHAP definitions, the conditional-vs-interventional value-function dilemma, the additivity axiom, contrastive/actionable explanation and normative model evaluation. It is the vault's owner for **Shapley values / SHAP definitions**.
> - Need the definition of the Shapley value, its axioms, or what SHAP/KernelSHAP/TreeSHAP actually compute? → [[Shapley Values and SHAP Value Functions]]
> - Need why redundant/correlated features distort SHAP, or the off-manifold problem? → [[Kumar et al - Conditional vs Interventional Shapley Catch-22]]
> - Need what Shapley values do with interactions / multiplicative models? → [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]
> - Need why a positive SHAP value does not mean "increase this input"? → [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]
> - Need why "the drivers look right" is not model validation? → [[Kumar et al - Shapley Values in Normative Model Evaluation]]
> - Need the paper map, findings and source map? → [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Shapley value, axioms | [[Shapley Values and SHAP Value Functions]] | definition/theorem | — | $\phi_v(i)=\frac1{N!}\sum_\pi\Delta_v(i,S_{i,\pi})$; unique under symmetry, dummy, additivity |
| Conditional vs interventional value function, Table 1 | [[Shapley Values and SHAP Value Functions]] | definition | Shapley value | KernelSHAP defines conditional, computes interventional |
| Indirect-influence catch-22 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] | theorem | value functions | Conditional credits proxies; interventional evaluates off-manifold |
| Redundant-player result (eq. 6-13) | [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] | theorem | conditional value function | Adding $C\equiv B$ changes $\phi(A)$ from $\tfrac12/\tfrac12$ to $\tfrac13/\tfrac23$ weights |
| Asymmetric Shapley values | [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] | definition | causal ordering | Drops symmetry; needs causal knowledge |
| Out-of-distribution problem, Fig. 1 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] | example | interventional value function | $X_3=X_1X_2$ violated at evaluation points |
| Linear-model Shapley (eq. 14-19) | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] | theorem | axioms | $\phi(i)=\beta_i(x_i-\mathbb EX_i)$ |
| Multiplicative-model Shapley (eq. 20-23) | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] | theorem | axioms | $\phi(i)=f(x)/d$ for all $i$ |
| Contrastive explanation, foil | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] | definition | Shapley efficiency | Foil $\mathbb E f$ may be unrealisable |
| No action guidance | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] | example | — | $f=2-(x-1)^2$: $\phi=2$ at optimum |
| Normative evaluation, confirmation bias | [[Kumar et al - Shapley Values in Normative Model Evaluation]] | concept | §4.1-4.2 | Importance list judged "useful" by intuition match |

## Notes

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — CONTAINS: research question, contribution, motivation (§1), §1 survey of the seven Shapley-attribution methods critiqued, key-findings table, full Source Map (every section/equation/table/figure → note), full 30-entry reference list with venues/pages/DOIs and where each is cited, dependency diagram, marketing-analytics relevance.
- [[Shapley Values and SHAP Value Functions]] — CONTAINS: coalitional game and marginal contribution (eq. 1); Shapley value permutation/subset forms (eq. 2-3); symmetry/dummy/additivity theorem; notation table; conditional value function (eq. 4); interventional value function (eq. 5), QII, FAE; TreeSHAP vs KernelSHAP; Table 1 transcribed with verbatim caption; interventional vs conditional TreeSHAP (implicit in source); permutation-sampling algorithm; worked examples (interaction split, $R^2$ decomposition).
- [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] — CONTAINS: variable with no interventional effect; Adler et al. vs Merrick & Taly; interventional null-player property (Merrick & Taly) with proof sketch (incl. Adler et al.'s accuracy-via-indirect-information follow-on); TreeSHAP's sampling-free leaf-based conditional estimation; catch-22 claim; conditional issues ($2^d$ distributions, TreeSHAP limits); redundant-feature result eq. 6-13 with proof sketch; fairness-audit consequence; asymmetric Shapley values (Frye et al., full data-agnosticism quote); Figure 1 description (ranges eyeballed); $X_3=X_1X_2$ OOD example; Hooker & Mentch; Slack et al.; numeric and correlated-Gaussian examples.
- [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] — CONTAINS: axiom-pair non-uniqueness; Osborne & Rubinstein on additivity; linear-model derivation eq. 14-19; alternative attribution ψ (as printed, $1/|U|$, plus corrected reading); multiplicative-model derivation eq. 20-23 with proof sketch; numeric examples; baseline-dependence example; multiplicative marketing illustration.
- [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] — CONTAINS: Selbst & Barocas three motivations; GDPR/procedural justice; Miller/Lipton contrastive definition; Shapley set as "Why $f(x)$ rather than $\mathbb E f$"; Merrick & Taly reference foil; marginal contributions and stepwise selection; beetle example (with computed Shapley values); counterfactual explanations and actionable recourse; no-action claim; quadratic example; saturation illustration.
- [[Kumar et al - Shapley Values in Normative Model Evaluation]] — CONTAINS: Bhatt et al. use case; Kaur et al. mental-model finding; Passi & Jackson anecdote; Poursabzi-Sangdeh et al. quote; four evaluation questions; Weerts et al.; direct-test table; §5 conclusion; acknowledgments; limitations and counter-positions; model-selection-by-SHAP illustration; governance framing.

## Sources

- Kumar et al 2020 - Problems with Shapley-Value-Based Explanations — Kumar, I. E., Venkatasubramanian, S., Scheidegger, C., & Friedler, S. A. (2020). Problems with Shapley-value-based explanations as feature importance measures. ICML 2020, PMLR 119. arXiv:2002.11097v2. 10 pp.

## See Also

- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — counter-position on the value-function choice.
- [[Dillon et al - SHAP and Causal Insights - Overview]] — SHAP vs causal effects; double ML.
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — extrapolation in permutation importance.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — conditional permutation importance.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — Rashomon set and model reliance.
