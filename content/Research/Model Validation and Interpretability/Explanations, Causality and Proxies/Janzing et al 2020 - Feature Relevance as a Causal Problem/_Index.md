---
title: "Index: Janzing et al 2020 - Feature Relevance as a Causal Problem"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Explanations, Causality and Proxies]]"
date_updated: 2026-10-13
concept_count: 8
---

# Janzing et al 2020 - Feature Relevance as a Causal Problem

> [!abstract] Routing Summary
> This folder fully captures Janzing, Minorics & Blöbaum (AISTATS 2020), which argues that Shapley-value attributions should drop features with **marginal (interventional)** rather than **observational conditional** expectations. Contains 8 notes spanning attribution axioms, conditional vs marginal value functions, the failure of sensitivity under conditioning, the inputs-as-causes argument, the symmetry debate, and the KernelSHAP vs SHAPR experiments. It is the vault's owner for **interventional vs observational feature relevance**.
> - Need the paper map, findings and section-by-section source map? → [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
> - Need the attribution axioms (completeness, sensitivity, ...), integrated gradients or Theorem 1? → [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]]
> - Need the definitions of conditional (eq. 3) vs marginal (eq. 4) SHAP, or the back-door eq. (5)? → [[Janzing 2020 - Conditional vs Marginal Dropping of Features]]
> - Need proof that conditional SHAP credits unused features (Example 1, Lemma 1)? → [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]
> - Need why $\mathbb E[Y\mid do(X_T=x_T)]=\mathbb E f(x_T,X_{\bar T})$, and why it is model-level only? → [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]]
> - Need the symmetry-axiom objection (Sundararajan & Najmi Ex. 4.9) and reply? → [[Janzing 2020 - Symmetry Axiom Objection and Reply]]
> - Need KernelSHAP's weighted least squares, the Aas et al. kernel estimator, or the simulation designs? → [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]]
> - Need limitations, model-vs-world guidance, or marketing implications? → [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Five attribution properties | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] | definition | — | Completeness, Sensitivity, Impl. Invariance, Linearity, Symmetry |
| Theorem 1 (path methods) | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] | theorem | five properties | First four ⇒ convex combo of path methods; IG unique symmetric path |
| Shapley value of set function, eq. (2) | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] | definition | — | $\phi_i=\sum_T [n\binom{n-1}{\lvert T\rvert}]^{-1}C(i\mid T)$, $\sum\phi_i=g(U)$ |
| Conditional vs marginal simplified function, eq. (3)-(4) | [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] | definition | eq. (2) | SHAP theory uses (3), code uses (4) |
| Back-door adjustment, eq. (5), Fig. 1 | [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] | theorem | [[DAGs and Causal Identification]] | Intervention breaks dependence on $X_1$, keeps $X_2$-$X_3$ dependence |
| Example 1 / Lemma 1 | [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]] | theorem/example | eq. (3) | Conditional: $\phi_2=x_1/2-1/4\ne0$; marginal: $\phi_2=0$ |
| Interventional = marginal, eq. (14), Fig. 2 | [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] | theorem | eq. (5) | $\mathbb E[Y\mid do(X_T=x_T)]=\mathbb E f(x_T,X_{\bar T})$ |
| Symmetry objection and reply, Fig. 3 | [[Janzing 2020 - Symmetry Axiom Objection and Reply]] | example | five properties | Credit $1-p$ vs $1-q$; $\tilde g$ itself asymmetric |
| Shapley kernel WLS, eq. (15) | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] | definition/algorithm | eq. (2) | $k(U,T)=(\lvert U\rvert-1)/[\binom{\lvert U\rvert}{\lvert T\rvert}\lvert T\rvert(\lvert U\rvert-\lvert T\rvert)]$ |
| Aas et al. kernel conditional estimator | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] | algorithm | eq. (3) | Mahalanobis-weighted average of $f$ |
| Gaussian and HAR experiments, Figs. 4-5 | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] | example | linear ground truth | Marginal errors near 0 (spikes about 1,750 / 4,500 / 1,220); conditional dispersed over $\pm0.5$ (Gaussian) or $\pm0.10$ (HAR) |
| Model-vs-world decision rule | [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] | concept | eq. (14) | Marginal for model use; neither for real causal effects |

## Notes

- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — CONTAINS: research question, contribution, key findings, argument diagram, full Source Map, complete 27-entry reference list grouped by role, one-case worked example, positioning vs Kumar/Strobl/Hooker/Dillon, marketing relevance
- [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] — CONTAINS: §1 motivation, problem set-up and paper plan (uniqueness claim, Datta et al. support); §2 prior work; integrated gradients eq. (1); five properties; Theorem 1; Shapley set function eq. (2); baseline set function; worked IG vs Shapley example
- [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] — CONTAINS: notation; eq. (3)-(4); Lundberg & Lee's justification; footnote 3; Fig. 1 with drawn edges and node colouring; back-door eq. (5) with proof sketch; two structural observations; media-planning illustration
- [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]] — CONTAINS: Example 1 eq. (6)-(13); completed $\phi_1,\phi_2$ at (1,1) and (0,0); Lemma 1 with proof (printed $X_{\bar T}$ typo flagged); sensitivity-paradox resolution via $\tilde g$; general proxy-credit mechanism; marketing illustration
- [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] — CONTAINS: inputs-as-causes framing; true features vs inputs; Fig. 2 (five-feature drawing, cut edges, caption); eq. (14) with proof sketch; corollary on interventional Shapley values; footnote 4; licensed-vs-not table; confounded MMM example
- [[Janzing 2020 - Symmetry Axiom Objection and Reply]] — CONTAINS: Fig. 3 table; Ex. 4.9 objection; verification $\phi_1=1-p$; two-part reply; $\tilde g$ definition; full $\tilde g$ table and contributions $C(j\mid T)$; additive-model generalisation; comment on axiom levels; channel illustration
- [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] — CONTAINS: eq. (15) Shapley kernel; KernelSHAP sampling algorithm; eq. (16); linear ground truth; Gaussian conditional formulas; $n=3$/$n=10$ design table; Fig. 4 with read-off values and pooling counts; Aas et al. 3-step estimator; HAR design table; Fig. 5 with read-off values; editorial assessment; audit recipe
- [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] — CONTAINS: §5 claims; acknowledgements; scope limits; limitations table; "true to the model vs true to the data" framing; decision rule; SHAP-mass model-selection anti-pattern; co-flighting example

## Sources

- Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem — Janzing, Minorics & Blöbaum, AISTATS 2020 (PMLR 108), arXiv:1910.13413v2, 11 pp.

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — owner of Shapley/SHAP definitions; conditional-vs-interventional catch-22
- [[Dillon et al - SHAP and Causal Insights - Overview]] — SHAP is not causal evidence about the world
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — off-manifold extrapolation cost of marginal schemes
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — conditional permutation importance (the data-level analogue)
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — attribution across the Rashomon set
- [[DAGs and Causal Identification]] — back-door criterion
