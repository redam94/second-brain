---
title: Kumar et al - Shapley Values in Normative Model Evaluation
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Kumar et al 2020 - Problems with Shapley-Value-Based Explanations.pdf]]"
source_location: "Kumar et al. (2020) §4.3 Shapley-based explanations for normative evaluation (p.8-9): Bhatt et al., Kaur et al., Passi & Jackson quote, Poursabzi-Sangdeh et al. quote, four evaluation questions, Weerts et al.; §5 Conclusion (p.9)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations"
doc_type: paper
depends_on:
  - "[[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]"
  - "[[Kumar et al - Conditional vs Interventional Shapley Catch-22]]"
  - "[[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]"
used_by:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
  - "[[SR 11-7 - Model Risk Management Guidance - Overview]]"
  - "[[NIST AI RMF 1.0 - Overview]]"
aliases:
  - Shapley values for normative evaluation
  - Feature-importance confirmation bias (Kumar et al)
  - Passi and Jackson feature-importance anecdote
  - Kumar et al conclusion and limitations
---

# Kumar et al - Shapley Values in Normative Model Evaluation

> [!summary]
> §4.3 and §5 of Kumar et al. (2020). Shapley explanations are mainly used for **normative evaluation** — deciding whether a model's behaviour is acceptable (Bhatt et al. 2020). The authors make three points: (1) data scientists lack an accurate mental model of what SHAP output means yet use it to approve deployment (Kaur et al. 2020); (2) in that vacuum, **narrative and confirmation bias** take over — stakeholders judged a model "useful" from its feature-importance list alone (Passi & Jackson 2018); (3) even correctly understood, Shapley values give no *direct* answer to concrete evaluation questions (pipeline errors, spurious correlations, bias, whether a feature improves accuracy), and human studies find interpretability can even hurt error detection (Poursabzi-Sangdeh et al. 2018; Weerts et al. 2019). Conclusion: the game-theoretic framework is "ill-suited as a general solution"; explanation methods should come from specific use cases and models, with human accessibility in mind. This note also holds the discussion of the paper's limitations and its implications for marketing-model validation.
^summary

## Overview

Normative evaluation happens "either at the development stage, to help a human evaluate a model, or at the decision-making stage, to help a human evaluate a specific decision made by a model" (p.8). The section's thesis: "the information content of the Shapley value is insufficient for evaluation" (p.8). This is the third of Selbst & Barocas's motivations (see the table in [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]).

## Main Content

### Point 1 — no clear mental model (p.8)

"Since there is no standard procedure for converting Shapley values into a statement about a model's behavior, developers rely on their own mental model of what the values represent." **Kaur et al. (2020)** ran a contextual inquiry and survey of data scientists using interpretability tools including the SHAP Python package: "many participants did not have an accurate mental model of what a SHAP analysis represents, yet used them to make decisions on whether the model was ready for deployment, over-trusting and misusing the tool."

### Point 2 — narrative and confirmation bias (p.8-9)

> [!example] Anecdote: a model judged "useful" from its importance list (§4.3, p.8-9, quoting Passi & Jackson 2018)
> **Setting.** Ethnographic fieldwork with a corporate data-science team, where applying intuition to feature importance was a key part of the development cycle. When developers presented a modelling effort to project managers, "the stakeholders immediately decided it was 'useful' based entirely on the feature importance list":
> > "Certain highly-weighted features matched business intuitions, and everyone in the meeting considered this a good thing. . . . Regarding counterintuitive feature importances, [a data scientist] reminded [the stakeholders] that machine-learning models do not approach data in the same way humans do. He pointed out that models use 'a lot of complex math' to tell us things that we may not know or fully understand."
>
> **Authors' reading.** "This suggests that even when an individual lacks a correct mental model of the meaning of Shapley values, they may use them to justify their evaluation anyway, whether or not this analysis is well-founded."
>
> **Structural point (vault gloss).** Intuitive importances confirm the model; counter-intuitive ones are explained away as the model "knowing more". The list cannot fail the model — an evaluation with no rejection region, the explanation-side analogue of the unfalsifiable analyses in [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
^ex-passi-jackson

> [!example] Evidence: transparency can hurt error detection (§4.3, p.9, quoting Poursabzi-Sangdeh et al. 2018)
> "Participants who were shown a clear model with a small number of features were better able to simulate the model's predictions. However, contrary to what one might expect when manipulating interpretability, we found no improvements in the degree to which participants followed the model's predictions when it was beneficial to do so. Even more surprisingly, increased transparency hampered people's ability to detect when the model makes a sizable mistake and correct for it, seemingly due to information overload." (Apostrophes in "model's" and "people's" are dropped in the printed PDF and restored here.)
>
> Authors' inference: "common intuition for the benefits of interpretability (and the types of questions it can help answer) may be based on faulty assumptions, and these questions should instead be concretely specified and tested."
^ex-poursabzi

### Point 3 — no direct answers to evaluation questions (p.9)

> [!definition] Concrete evaluation questions data scientists might ask (§4.3, p.9)
> 1. Whether an error was made at any point in the data processing pipeline for a certain feature.
> 2. Whether the model is acting upon spurious correlations or other artifacts of training data.
> 3. Whether the model exhibits inappropriate biases.
> 4. Whether the model's accuracy will improve if a certain feature is included or excluded.
>
> "While Shapley-value-based methods might help qualitatively inform investigations that lead to answers to these questions, it is not clear that they provide direct answers to any specific question related to the points of interest above." **Weerts et al. (2019)**, a human-grounded evaluation of SHAP for alert processing, "did not find evidence that it helped users assess the correctness of predictions."
^def-evaluation-questions

> [!algorithm] Direct tests for each evaluation question (vault synthesis — not in the source)
> | Question | Direct test that answers it | Vault notes |
> |---|---|---|
> | 1. Pipeline error in a feature | Data validation / unit tests on the feature; compare distributions to source; posterior or prior predictive checks of the input | [[Posterior Predictive Checking]], [[Prior Predictive Checking]] |
> | 2. Spurious correlations / artefacts | Out-of-time and out-of-segment validation; placebo features; simulation with known truth | [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Granger 2003 - Spurious Regression and Cointegration - Overview]], [[Designing Simulated-Data Experiments]] |
> | 3. Inappropriate bias | Group-wise error and outcome metrics against stated criteria | [[NIST AI RMF 1.0 - Overview]] |
> | 4. Does feature $j$ improve accuracy? | Refit with/without $j$ and compare held-out loss (repeat across folds) | [[Cross Validation Checking]], [[Model Selection and Overfitting]] |
> | (Causal) Will changing $j$ change $Y$? | Experiment or identified causal estimator | [[DML Estimators for ATE and the Interactive Model]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] |
^alg-direct-tests

### §5 Conclusion (p.9)

> [!theorem] Conclusion (§5, p.9)
> "Shapley values enjoy mathematically satisfying theoretical properties as a solution to game theory problems. However, applying a game theoretic framework does not automatically solve the problem of feature importance, and our work shows that in fact this framework is ill-suited as a general solution to the problem of quantifying feature importance. Rather than relying on notions of mathematical correctness, our work suggests that we need more focused approaches that stem from specific use cases and models, developed with human accessibility in mind."
^thm-conclusion

The introduction states the practical recommendation: "caution against their usage except in narrowly constrained settings where they admit a clear interpretation" (p.1). Acknowledgments list NSF grants IIS-1633724, IIS-1633387, DMR-1709351, IIS-1815238, the DARPA SD2 Program and the ARCS Foundation.

## Discussion, Limitations and Extensions (vault assessment)

The paper has no published discussants. The points below are the vault's assessment, marked as such.

- **Position paper, not an empirical study.** No new experiments; §3 results are analytic examples and §4 relies on cited human studies. The examples are deliberately extreme (exact duplicates, zero-centred products) — real cases lie between, and the size of the distortion has to be checked case by case (e.g. by a simulation study with known truth, [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]).
- **Baseline dependence.** The multiplicative result needs zero means; with other baselines the split changes ([[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] example 3). That strengthens the general point — the attribution depends on a reference choice — rather than weakening it.
- **Counter-position.** [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] argues that, when the goal is to explain the *model*, interventional expectations are the correct choice and the off-manifold evaluation is part of what the model does. Kumar et al.'s answer is that off-manifold behaviour is not learned from data and can be manipulated.
- **Model vs world.** Even with an agreed value function, Shapley values describe $f$, not the data-generating process; [[Dillon et al - SHAP and Causal Insights - Overview]] develops this with double ML as the causal alternative.
- **Later literature (not in the source, for orientation).** Subsequent work develops the "true to the model vs true to the data" framing and catalogues the many Shapley variants; the paper's catch-22 remains the standard statement of the choice.

## Examples

> [!example] Example: Choosing among model fits by explanation plausibility (generic marketing analytics illustration)
> **Pattern.** An analyst fits several per-segment tree models of a shared aggregate KPI on weekly drivers (52-156 rows each), inspects SHAP summary plots, and keeps the fit whose driver ranking "matches the business", or the fit in which marketing drivers carry the largest total SHAP mass.
>
> **What §3-§4 say about it.**
> 1. The ranking shifts with redundant features (§3.1.1) and off-manifold evaluation of correlated media drivers (§3.1.2).
> 2. Interaction credit is split by rule, not by evidence (§3.2).
> 3. Agreement with intuition is the Passi & Jackson failure: it confirms priors and cannot reject the model (§4.3).
> 4. SHAP mass is not marginal return (§4.2).
> 5. Selecting the fit that maximises an importance statistic adds a selection step that rewards noise — a regressional-Goodhart effect ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]) and a forking path ([[Garden of Forking Paths]]).
>
> **Better practice.** Pre-specify the model choice criterion as held-out predictive accuracy with time-respecting folds ([[Forecast Evaluation and Backtesting]]); check attribution stability across resamples ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]) and across the set of near-optimal models ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]); validate causal claims against experiments.
^ex-plausibility-selection

> [!example] Example: Governance framing
> Model-risk guidance asks validators for "effective challenge" of a model's conceptual soundness ([[SR 11-7 - Model Risk Management Guidance - Overview]]); an importance plot reviewed for plausibility is not such a challenge, because there is no outcome of the review that would fail the model. The NIST framework's TEVV functions likewise ask for tests tied to specific claims ([[NIST AI RMF 1.0 - Overview]]).
^ex-governance

## Connections

- [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] — first two Selbst & Barocas motivations.
- [[Researcher Degrees of Freedom]] and [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — flexible, intuition-driven evaluation inflates false "validations".
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — the algorithmic-modelling culture relies on importance measures to extract information from black boxes; this paper questions how those measures are read.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — MMM validation challenges where plausibility checks are often all that is available.

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]
- [[Spurious Association and Confounds]]
- [[Model Selection and Overfitting]]
