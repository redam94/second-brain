---
title: Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Kumar et al 2020 - Problems with Shapley-Value-Based Explanations.pdf]]"
source_location: "Kumar, Venkatasubramanian, Scheidegger & Friedler (2020), 'Problems with Shapley-value-based explanations as feature importance measures', ICML 2020, PMLR 119, arXiv:2002.11097v2 (30 Jun 2020), 10 pp. — whole paper: Abstract and §1 (p.1); §2 (p.1-3); §3 (p.3-6); §4 (p.6-9); §5 (p.9); references (p.9-10)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations"
doc_type: paper
depends_on:
  - "[[Shapley Values and SHAP Value Functions]]"
used_by:
  - "[[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]"
  - "[[Dillon et al - SHAP and Causal Insights - Overview]]"
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - Kumar et al 2020
  - Kumar et al 2020 Shapley Critique
  - Problems with Shapley-value-based explanations as feature importance measures
  - Problems with Shapley-Value Feature Importance
---

# Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview

> [!summary]
> Kumar, Venkatasubramanian, Scheidegger & Friedler (ICML 2020) argue that Shapley-value attributions (SHAP, KernelSHAP, TreeSHAP, Shapley sampling values, QII, FAE) "fail to serve their desired purpose in general" as feature-importance measures. **Mathematically** (§3): choosing a value function is a catch-22 — *conditional* values need a model of the feature distribution and change when a redundant copy of a feature is added (eq. 6-13), while *interventional* values evaluate the model off the data manifold, where behaviour is arbitrary and manipulable (Fig. 1); and the additivity axiom makes Shapley values uninformative for non-additive models (a zero-centred product model gives every feature $f(x)/d$, eq. 20-23). **Human-centrically** (§4): Shapley sets are not the selective, contrastive explanations people use; they give no action guidance (a person at the optimum of $2-(x-1)^2$ gets $\phi=2>0$); and in practice they are read through confirmation bias — stakeholders called a model "useful" from its importance list alone. Recommendation: use only "in narrowly constrained settings where they admit a clear interpretation" (p.1).
^summary

## Overview

**Authors and affiliations (p.1 footnote).** I. Elizabeth Kumar and Suresh Venkatasubramanian (School of Computing, University of Utah), Carlos Scheidegger (Department of Computer Science, University of Arizona), Sorelle A. Friedler (Department of Computer Science, Haverford College); published in *Proceedings of the 37th International Conference on Machine Learning*, Vienna, PMLR 119, 2020.

**Research question.** Do Shapley-value-based explanations deliver what they are claimed to — a principled measure of feature importance that serves the purposes people want explanations for?

**Contribution.** A two-part critique (§1, p.1). First, "applying the Shapley value to the problem of feature importance introduces mathematically formalizable properties which may not align with what we would expect from an explanation." Second, "taking a human-centric perspective, we evaluate Shapley-value-based explanations through established frameworks of what people expect from explanations, and find them wanting." The abstract summarises: "We show that mathematical problems arise when Shapley values are used for feature importance, and that the solutions to mitigate these necessarily induce further complexity, such as the need for causal reasoning."

**Motivation (§1, p.1).** As predictive models become "increasingly inscrutable", their black-box nature can obscure "illegal bias or signals accidentally learned from artifacts irrelevant to the task at hand". The Shapley value — "a method for additively attributing value among players of a cooperative game", with features as players and the model's prediction as the game — has become one of the most prominent tools for "explaining" such models. Its justification rests on "two pillars": its mathematical properties and its fit to specific motivations for explanation. The paper attacks both pillars.

**The methods under critique — §1's motivating survey (p.1).** The introduction frames the target as a family: "A variety of methods to assign feature influence using the Shapley value have recently been developed (Lipovetsky & Conklin, 2001; Štrumbelj & Kononenko, 2014; Lundberg et al., 2018; Datta et al., 2016b; Merrick & Taly, 2019; Frye et al., 2019; Aas et al., 2019)." In vault terms these are, respectively: Shapley decomposition of regression $R^2$; Shapley sampling values; TreeSHAP; Quantitative Input Influence (QII); the explanation game / FAE framework; asymmetric Shapley values; and dependence-aware conditional Shapley estimation — each mapped to its value function in [[Shapley Values and SHAP Value Functions#^tbl-value-functions|Table 1]]. The paper then states its thesis: Shapley-value-based explanations "fail to serve their desired purpose in general", and it cautions against them "except in narrowly constrained settings where they admit a clear interpretation" (p.1). Roadmap: frameworks in §2, the two-part critique in §3-§4, discussion and suggestions in §5.

## Main Content

### Key Findings

| # | Finding | Location | Note |
|---|---|---|---|
| 1 | Methods are best classified by the value function they *estimate*; KernelSHAP defines the conditional game but computes an interventional one | §2.2, Table 1 | [[Shapley Values and SHAP Value Functions#^tbl-value-functions]] |
| 2 | Conditional vs interventional is a catch-22 (indirect influence vs off-manifold evaluation) | §3.1 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-catch-22]] |
| 3 | Adding an exact copy $C$ of $B$ changes $A$'s and $B$'s attributions though the function is unchanged on the data | §3.1.1, eq. 6-13 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-redundant-players]] |
| 4 | Asymmetric Shapley values fix redundancy only by injecting causal knowledge; results are sensitive to it | §3.1.1 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^def-asymmetric-shapley]] |
| 5 | Interventional values depend on model extrapolation and can be gamed (Slack et al.) | §3.1.2, Fig. 1 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-ood-misleading]] |
| 6 | Linear model: $\phi(i)=\beta_i(x_i-\mathbb EX_i)$; product model: $\phi(i)=f(x)/d$ for all $i$ | §3.2, eq. 14-23 | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] |
| 7 | Shapley sets average all contrasts against a foil $\mathbb E f$ that may be unrealisable; humans select contrasts | §4.1 | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] |
| 8 | Shapley values give no action guidance | §4.2 | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations#^thm-no-action]] |
| 9 | In normative evaluation, Shapley values feed confirmation bias and answer no concrete evaluation question directly | §4.3 | [[Kumar et al - Shapley Values in Normative Model Evaluation]] |

### Source Map

Every section, equation, table and figure of the source, and the note that holds it.

| Source item | Content | Note |
|---|---|---|
| Abstract, §1 Introduction (p.1) | Motivation, survey of Shapley-attribution methods (7 citations), two-part critique, roadmap | this note |
| §2 Background intro | Scope | [[Shapley Values and SHAP Value Functions]] |
| §2.1 Classical Shapley values, eq. (1)-(3) | Game, marginal contribution, permutation and subset forms | [[Shapley Values and SHAP Value Functions#^def-shapley-value]] |
| §2.1 axioms | Symmetry, Dummy, Additivity; uniqueness | [[Shapley Values and SHAP Value Functions#^thm-shapley-axioms]] |
| §2.2 Shapley values for feature importance, notation | $D, X, x, X_S, x_S$ | [[Shapley Values and SHAP Value Functions#^def-notation]] |
| §2.2.1 Value functions, eq. (4)-(5) | Kruskal / Lipovetsky-Conklin $R^2$, Owen-Prieur; conditional (SHAP) vs interventional (QII, FAE) | [[Shapley Values and SHAP Value Functions#^def-conditional-value]], [[Shapley Values and SHAP Value Functions#^def-interventional-value]] |
| §2.2.2 Algorithms | TreeSHAP, KernelSHAP | [[Shapley Values and SHAP Value Functions]] |
| Table 1 (p.3) + caption | Stated vs estimated value functions; interventional vs conditional TreeSHAP | [[Shapley Values and SHAP Value Functions#^tbl-value-functions]] |
| §3 Mathematical issues (intro) | Two sources of problems | [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] |
| §3.1 Conditional vs interventional | No-interventional-effect variables; Adler et al. vs Merrick & Taly; interventional null-player property; catch-22 | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^def-no-interventional-effect]], [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-interventional-null-player]], [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-catch-22]] |
| §3.1.1 Issues with conditional distributions, eq. (6)-(13) | $2^d$ distributions; TreeSHAP limits; redundant-feature example; fairness-audit consequence; asymmetric Shapley values (Frye et al.) | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-redundant-players]], [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^def-asymmetric-shapley]] |
| Figure 1 (p.5) | Conditional vs marginal sampling around $f(1,2)$ | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^fig-1]] |
| §3.1.2 Issues with interventional distributions | $X_3=X_1X_2$ example; Hooker & Mentch; Slack et al. | [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^ex-engineered-feature]] |
| §3.2 Additivity constraints, axiom-pair claim | Osborne & Rubinstein on additivity | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models#^thm-axiom-pairs]] |
| §3.2 eq. (14)-(19) | Linear model result | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models#^thm-additive-case]] |
| §3.2 alternative attribution ψ | Equal split without additivity | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models#^def-psi]] |
| §3.2 eq. (20)-(23) | Multiplicative model result | [[Kumar et al - Additivity Axiom Limits for Non-Additive Models#^thm-multiplicative]] |
| §4 Human-centric issues (intro) | Doshi-Velez & Kim; Selbst & Barocas three motivations | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] |
| §4.1 Explanations as contrastive statements | GDPR, Miller/Lipton contrastive definition | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations#^def-contrastive]] |
| §4.1.1 Shapley set as single contrast | Foil $\mathbb E f(x)$; Merrick & Taly reference $r$ | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations#^thm-foil]] |
| §4.1.2 Marginal contributions as contrasts | Stepwise selection; beetle example | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations#^ex-beetle]] |
| §4.2 Enabling action | Counterfactual explanations, recourse; $2-(x-1)^2$ example | [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations#^ex-quadratic]] |
| §4.3 Normative evaluation | Kaur et al.; Passi & Jackson quote; Poursabzi-Sangdeh quote; four questions; Weerts et al. | [[Kumar et al - Shapley Values in Normative Model Evaluation]] |
| §5 Conclusion; acknowledgments | "ill-suited as a general solution" | [[Kumar et al - Shapley Values in Normative Model Evaluation#^thm-conclusion]] |
| References (p.9-10) | 30 entries (Datta et al. 2016a/2016b are the same paper listed twice), full bibliographic details | this note, [[#Reference list (p.9-10)]] |

There are no appendices, theorems in the formal numbered sense, simulations or empirical tables beyond Table 1; the analytic results are unnumbered worked derivations, each given a block id above.

### Reference list (p.9-10)

Transcribed from the PDF's reference list. The text layer drops some glyphs (en-dashes in page ranges, apostrophes, "ø"); these are restored below and marked † where the restoration is the vault's reading of a garbled range.

| # | Reference | Where used |
|---|---|---|
| 1 | Aas, K., Jullum, M., and Løland, A. Explaining individual predictions when features are dependent: More accurate approximations to Shapley values. arXiv:1903.10464 [cs, stat], March 2019. | §1; Table 1; §3.1.1 |
| 2 | Adler, P., Falk, C., Friedler, S. A., Nix, T., Rybeck, G., Scheidegger, C., Smith, B., and Venkatasubramanian, S. Auditing black-box models for indirect influence. *Knowledge and Information Systems*, 54(1):95–122, 2018. | §3.1 |
| 3 | Barocas, S., Selbst, A. D., and Raghavan, M. The hidden assumptions behind counterfactual explanations and principal reasons. *FAT\* '20*, pp. 80–89†, ACM, 2020. doi:10.1145/3351095.3372830. | §4.2 |
| 4 | Bhatt, U., Xiang, A., Sharma, S., Weller, A., Taly, A., Jia, Y., Ghosh, J., Puri, R., Moura, J. M. F., and Eckersley, P. Explainable machine learning in deployment. *FAT\* '20*, pp. 648–657†, ACM, 2020. doi:10.1145/3351095.3375624. | §4.3 |
| 5 | Datta, A., Sen, S., and Zick, Y. Algorithmic transparency via quantitative input influence: Theory and experiments with learning systems. *2016 IEEE Symposium on Security and Privacy (SP)*, pp. 598–617, IEEE, 2016a. | §2.2.1 (QII) |
| 6 | Datta, A., Sen, S., and Zick, Y. (identical entry), 2016b — duplicate of #5. | §1 |
| 7 | Doshi-Velez, F. and Kim, B. Towards a rigorous science of interpretable machine learning. arXiv:1702.08608, February 2017. | §4 intro |
| 8 | Frye, C., Feige, I., and Rowat, C. Asymmetric Shapley values: incorporating causal knowledge into model-agnostic explainability, 2019. | §1; Table 1; §3.1.1 |
| 9 | Hooker, G. and Mentch, L. Please stop permuting features: An explanation and alternatives. arXiv:1905.03151v1, 2019. | §3.1.2 |
| 10 | Kahneman, D. and Miller, D. T. Norm theory: Comparing reality to its alternatives. *Psychological Review*, 93(2):136, 1986. | §4.1 |
| 11 | Kaur, H., Nori, H., Jenkins, S., Caruana, R., Wallach, H., and Wortman Vaughan, J. Interpreting interpretability: Understanding data scientists' use of interpretability tools for machine learning. *CHI '20*, pp. 1–14†, ACM, 2020. doi:10.1145/3313831.3376219. | §4.3 |
| 12 | Kruskal, W. Relative importance by averaging over orderings. *The American Statistician*, 41(1):6–10, 1987. | §2.2.1 |
| 13 | Lipovetsky, S. and Conklin, M. Analysis of regression in game theory approach. *Applied Stochastic Models in Business and Industry*, 17(4):319–330, 2001. | §1; §2.2.1 |
| 14 | Lipton, P. Contrastive explanation. *Royal Institute of Philosophy Supplements*, 27:247–266, 1990. | §4.1 |
| 15 | Lundberg, S. M. and Lee, S.-I. A unified approach to interpreting model predictions. *NeurIPS*, pp. 4765–4774, 2017. | §2.2.1-2.2.2 (SHAP, KernelSHAP) |
| 16 | Lundberg, S. M., Erion, G. G., and Lee, S.-I. Consistent individualized feature attribution for tree ensembles. arXiv:1802.03888, 2018. | §1; §2.2.2 (TreeSHAP) |
| 17 | Merrick, L. and Taly, A. The explanation game: Explaining machine learning models with cooperative game theory. arXiv:1909.08128, 2019. | §1; §2.2.1; §3.1; §4.1; §4.2 |
| 18 | Miller, T. Explanation in artificial intelligence: Insights from the social sciences. *Artificial Intelligence*, 267:1–38, 2019. | §4.1 |
| 19 | Osborne, M. J. and Rubinstein, A. *A Course in Game Theory*, 1994. | §3.2 |
| 20 | Owen, A. B. and Prieur, C. On Shapley value for measuring importance of dependent inputs. *SIAM/ASA Journal on Uncertainty Quantification*, 5(1):986–1002, 2017. | §2.2.1 |
| 21 | Passi, S. and Jackson, S. J. Trust in data science: Collaboration, translation, and accountability in corporate data science projects. *Proc. ACM Hum.-Comput. Interact.*, 2(CSCW):136:1–136:28, November 2018. doi:10.1145/3274405. | §4.3 |
| 22 | Poursabzi-Sangdeh, F., Goldstein, D. G., Hofman, J. M., Vaughan, J. W., and Wallach, H. Manipulating and measuring model interpretability. arXiv:1802.07810, 2018. | §4.3 |
| 23 | Ribeiro, M. T., Singh, S., and Guestrin, C. "Why should I trust you?": Explaining the predictions of any classifier. *KDD '16*, pp. 1135–1144, ACM, 2016. | §2.2.1 |
| 24 | Selbst, A. D. and Barocas, S. The intuitive appeal of explainable machines. SSRN Scholarly Paper ID 3126971, March 2018. | §4 intro; §4.1 |
| 25 | Slack, D., Hilgard, S., Jia, E., Singh, S., and Lakkaraju, H. Fooling LIME and SHAP: Adversarial attacks on post hoc explanation methods. *AAAI/ACM Conference on AI, Ethics, and Society (AIES)*, 2020. | §3.1.2 |
| 26 | Štrumbelj, E. and Kononenko, I. Explaining prediction models and individual predictions with feature contributions. *Knowledge and Information Systems*, 41(3):647–665, 2014. | §1; §2.2.1 |
| 27 | Ustun, B., Spangher, A., and Liu, Y. Actionable recourse in linear classification. *FAT\* '19*, pp. 10–19, ACM, 2019. | §4.2 |
| 28 | Venkatasubramanian, S. and Alfano, M. The philosophical basis of algorithmic recourse. *FAT\* '20*, pp. 284–293†, ACM, 2020. doi:10.1145/3351095.3372876. | §4.2 |
| 29 | Wachter, S., Mittelstadt, B., and Russell, C. Counterfactual explanations without opening the black box: Automated decisions and the GDPR. *Harv. J.L. & Tech.*, 31:841, 2017. | §4.2 |
| 30 | Weerts, H. J., van Ipenburg, W., and Pechenizkiy, M. A human-grounded evaluation of SHAP for alert processing. *KDD Workshop on Explainable AI (KDD-XAI '19)*, 2019. arXiv:1907.03324. | §4.3 |

Vault cross-links for cited works: Hooker & Mentch → [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] (the published successor of #9).

### Concept dependency

```
Shapley Values and SHAP Value Functions (§2)
 ├─> Conditional vs Interventional Catch-22 (§3.1)
 ├─> Additivity Axiom Limits (§3.2)
 │     └─> Contrastive and Actionable Explanations (§4.1-4.2)
 └─────────> Normative Model Evaluation + Conclusion (§4.3, §5)
```

## Examples

> [!example] Example: Why it matters for marketing analytics
> Tree-model SHAP values are widely used to "decompose" a KPI into drivers in weekly or daily media data. The paper predicts the specific failure modes there: near-duplicate media metrics shift credit ([[Kumar et al - Conditional vs Interventional Shapley Catch-22]]); correlated flighting forces off-manifold evaluation; saturating and multiplicative response makes attributions level-differences rather than marginal returns ([[Kumar et al - Additivity Axiom Limits for Non-Additive Models]], [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]); and choosing a model because its SHAP drivers look right is confirmation, not validation ([[Kumar et al - Shapley Values in Normative Model Evaluation]]).
^ex-marketing-relevance

## Connections

- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — resolves the value-function choice in favour of interventional expectations, the choice Kumar et al. say creates the out-of-distribution problem.
- [[Dillon et al - SHAP and Causal Insights - Overview]] — even "correct" SHAP values describe the model, not the world.
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — the extrapolation mechanism cited in §3.1.2.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] and [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — conditional permutation importance and estimator bias in importance rankings.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — importance across the Rashomon set rather than one model.
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — resampling stability of selected/important features.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — optimising "plausible explanations" as a proxy for model quality.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — importance measures as the algorithmic culture's window into black boxes.
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] and [[Researcher Degrees of Freedom]] — analyst flexibility in choosing players, value function and model.
- [[SR 11-7 - Model Risk Management Guidance - Overview]] and [[NIST AI RMF 1.0 - Overview]] — governance frameworks that ask for testable evaluation rather than plausibility.

## See Also

- [[Shapley Values and SHAP Value Functions]] — owner note for Shapley/SHAP definitions.
- [[Garden of Forking Paths]]
- [[Spurious Association and Confounds]]
- [[Model Selection and Overfitting]]
- [[Cross Validation Checking]]
- [[Janzing 2020 - Symmetry Axiom Objection and Reply]] — when interventional SHAP credit is symmetric
- [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] — presenting explanations to humans
