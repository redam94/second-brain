---
title: "Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/goodhart
  - topic/causal-inference
  - topic/ai-alignment
  - type/overview
  - doc/paper
source: "[[raw/Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law.pdf]]"
source_location: "Manheim & Garrabrant, 'Categorizing Variants of Goodhart's Law', arXiv:1803.04585v4 [cs.AI] (24 Feb 2019; first posted Mar 2018), 10 pp. — whole paper: introduction and footnote 1 (p.1); Varieties of Goodhart-like Phenomena and formal setup, footnotes 2-3 (p.1-2); §1 Regressional (p.2); §2 Extremal (p.2-4); §3 Causal (p.4-7); §4 Adversarial (p.7-9); Conclusion (p.9-10); references (p.10)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law"
doc_type: paper
depends_on:
  - "[[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]]"
used_by:
  - "[[Model Risk Management (SR 11-7)]]"
  - "[[NIST AI Risk Management Framework]]"
  - "[[SHAP and Causal Interpretation of Predictive Models]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
aliases:
  - Goodhart's Law Variants
  - Goodhart Taxonomy
  - Categorizing Variants of Goodhart's Law
  - Manheim and Garrabrant 2018
  - Four Goodhart Mechanisms
---

# Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview

> [!summary]
> Manheim & Garrabrant (arXiv:1803.04585, v4 2019) take "Goodhart's Law" (a measure stops tracking its goal once you optimize it) and split it into **four mechanisms**, each with sub-cases and a toy model. The four are: **Regressional** (selecting on a noisy proxy also selects for the noise, $M=G+\varepsilon$); **Extremal** (optimization pushes the system into regions where the learned proxy-goal relationship no longer holds, through *model insufficiency* or *change in regime*); **Causal** (the regulator's own intervention, on a *shared cause*, an *intermediary*, or the *metric itself*, breaks the causal path); and **Adversarial** (another agent games the metric, through *adversarial misalignment* / *Campbell's law*, or through *normal* and *non-causal cobra effects* when incentives are used). The vault owns the Goodhart taxonomy here. For model validation it gives names to familiar failures: picking the model with the best-looking diagnostics, extrapolating a response curve past the observed spend range, treating a predictive driver as a lever, and setting KPI targets that teams then game.
^summary

## Overview

**Research question.** Goodhart's Law is used loosely for any failure in which optimizing a metric stops serving, or starts harming, the goal behind it. The authors argue that this loose usage hides *different* failure modes with different causes and different fixes. The question is which distinct mechanisms make a metric's relationship to its goal break down under optimization, and how each can be stated formally.

**Contribution.** The paper builds on Garrabrant's 2017 blog post "Goodhart Taxonomy", which listed "(at least) four different mechanisms" (p.1). It gives a minimal formal setup (a regulator selects states by thresholding a proxy), a definition of a *Goodhart effect*, and nine named sub-cases, each with a toy model. It also catalogues three *non-causal* mistakes about causal structure that look like causal Goodhart but are really regressional or extremal (p.6-7).

**Definition used throughout.** Defined on p.1: a Goodhart effect occurs when "optimization causes a collapse of the statistical relationship between a goal which the optimizer intends and the proxy used for that goal." See [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy#^def-goodhart-effect]].

**Why it matters (p.1).** The size of a Goodhart effect depends on how much optimization power is aimed at the proxy. The authors therefore single out AI, whose added optimization power makes the problem "especially critical for that field". They name economic regulation, public policy, machine learning and AI alignment as the target domains.

## Main Content

### The taxonomy at a glance

| # | Category | Sub-case | Mechanism (one line) | Toy model | Note |
|---|---|---|---|---|---|
| 1 | Regressional | — | Selecting on $M$ also selects on $M-G$ ("tails come apart") | $M=G+\text{normal}(\mu,\sigma^2)$, eq. (1) | [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] |
| 2a | Extremal | Model insufficiency | Learned relation is only approximately right in the observed region; selection moves away from it | $M=G(s_i)+G'(s_i)$, eq. (2) | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] |
| 2b | Extremal | Change in regime | True relation differs in the extreme region (measurement saturation or a different generating process) | $G=M+x$ if $M\le a$, $M+y$ if $M>a$, eq. (3) | same |
| 3a | Causal | Shared cause intervention | Regulator sets common cause $X$; metric-goal link reduces to residual noise | DAG $M\leftarrow X\rightarrow G$, do($X$) | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| 3b | Causal | Intermediary intervention | Regulator sets mediator $X$ on Goal $\to X\to$ Metric; $M\perp G$ | do($X$) | same |
| 3c | Causal | Metric manipulation | Regulator sets $M$ directly | do($M$) | same |
| — | (Non-causal look-alikes) | Ignored shared cause / ignored intermediary / ignored additional cause | Wrong causal model; under *selection* these give worse regressional or extremal Goodhart, not causal Goodhart | eq. (4)-(6) | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| 4a | Adversarial | Adversarial misalignment, incl. Campbell's law | Agent with other goals selects knowing the regulator will select on $M$ | $M_R=G_R+X$, $M_A=G_A\cdot X$, eq. (7) | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| 4b | Adversarial | Normal cobra effect | Incentive aligns agent with $M_R$; agent changes an ignored cause $Y$ of $M_R$ | $G_{AR}=G_{A0}+M_R$, eq. (8) | same |
| 4c | Adversarial | Non-causal cobra effect | Same incentive, but agent applies selection pressure, causing extremal or worse regressional effects | $G_{AR}=G_{A0}+M_R$, eq. (9) | same |

### Ordering logic of the paper

The categories are ordered by how much the regulator does and how many actors there are (p.2, p.4, p.7):

1. **Selection only, one actor** gives regressional and extremal effects. They "require selection pressure, but do not involve an intervention on the part of the regulator" (p.4).
2. **Intervention by the one actor** gives causal effects. These "[do] not require any uncertainty, nor ... an incorrect understanding of the relationships" (p.4). The regulator's own action causes them.
3. **Multiple actors** give adversarial effects, where other agents "react in different ways to create Goodhart-like effects following any of the earlier paradigms" (p.8).

The authors stress that "These varied forms often occur together, but defining them individually is useful" (p.2).

### Key findings / claims

- Regressional Goodhart "cannot be avoided" with any inexact metric. It is "the most fundamental" (p.2).
- Extremal Goodhart is the "out of sample prediction" problem of statistics and ML (p.3). In ML it typically comes from **underfitting**: a low-order polynomial looks adequate in the observed range, and optimization then moves into the region where the higher-order terms dominate.
- Causal Goodhart arises even with correct beliefs about the observational relationship. The windmill example (p.4) shows this: building many windmills changes the wind speeds the siting model relied on.
- The same causal *mistakes* lead to extremal or worse regressional effects when the regulator *selects* rather than intervenes (p.6).
- Adversarial effects reuse all earlier mechanisms. The agent may exploit regressional or extremal effects, or intervene causally (p.8).
- Conclusion (p.9-10): in ML the relevant errors are extremal effects from limited data and "overly parsimonious models", errors from "myopic consideration of goals", and errors from ignoring causality. In AI alignment the issues are "fundamental".

## Source Map

Every part of the paper and the note that holds it.

| Source location | Content | Note |
|---|---|---|
| Title block, abstract-like intro (p.1) | Problem statement; extends Garrabrant [2]; target domains; optimization power | this note; [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] |
| Footnote 1 (p.1) | Goodhart's original 1975 wording; Campbell's law; Lucas critique; cobra effect; perverse incentives; forthcoming paper | [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] |
| "Varieties of Goodhart-like Phenomena" (p.1-2) | Definition of Goodhart effect; four categories; formal setup $S$, $s$, $A$, $G$, $M$, threshold $c$ | [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] |
| Footnote 2 (p.2) | Measure vs metric; single-dimensional simplification | [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] |
| Footnote 3 (p.2) | Other forms of selection pressure (probabilistic, evolutionary) | [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] |
| §1 Regressional Goodhart, eq. (1) (p.2) | Definition; "tails come apart"; simple model; unavoidability | [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] |
| §2 Extremal Goodhart intro (p.2-3) | Definition; out-of-sample prediction; two routes | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] |
| §2 Model insufficiency, eq. (2) (p.3) | Definition; simple model (notation $s_i$, $G'$ glossed); policy and polynomial-underfitting examples | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] |
| §2 Change in regime, eq. (3) (p.3-4) | Definition; piecewise model; two routes ("errors are systemically incorrect in a given region" vs a different generating process); wind-instrument saturation; atmospheric boundary layer | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] |
| Bridge paragraph (p.4) | Selection vs intervention | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] (section "Bridge to causal Goodhart") |
| §3 Causal Goodhart definition, windmill example (p.4) | Definition; no uncertainty required | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| §3 "Three Causal Goodhart Effects", DAG figure (p.4-5) | Shared cause / intermediary / metric manipulation figure (incl. the two dashed alternative Goal placements in the metric-manipulation panel) | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| §3 Shared Cause Intervention (p.5) | Definition; simple model; two-tests example | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| §3 Intermediary Intervention (p.5) | Definition; simple model | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| §3 Metric Manipulation, footnote 4 (p.5-6) | Definition; teacher changes grades | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| §3 causes of causal Goodhart (p.6) | Mistaken / missing causal understanding, lack of foresight | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] |
| §3 "Non-Causal Goodhart Effects in Causal Systems", figure (p.6) | Ignored shared cause / ignored intermediary figure (dashed = true, dotted = assumed, directed Goal⋯>Metric); "three cases" vs two-panel inconsistency | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| §3 Ignored Shared Cause, eq. (4) (p.6) | Definition; simple model; conditional independence | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| §3 Ignored Intermediary (p.7) | Definition | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| §3 figure "Ignored Metric Cause / Ignored Goal Cause" (p.7) | Two DAGs (solid modelled edge, dashed ignored cause); conflicts with "(No Figure provided.)" | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| §3 Ignored Additional Cause, eq. (5)-(6) (p.7) | Definition; simple models; classification by distribution of $X$ | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] |
| §4 Adversarial intro (p.7-8) | Adversarial misalignment vs cobra effects | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| §4 Adversarial Misalignment Goodhart, footnote 5 (p.8) | Definition; Campbell's original statement | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| §4 Campbell's Law, eq. (7), footnote 6 (p.8) | Definition; simple model; correlation claim | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| §4 Cobra effect history (p.8-9) | Colonial-India anecdote; normal vs non-causal cobra | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| §4 Normal Cobra Effect, figure, eq. (8) (p.9) | Definition; ignored cause $Y$; DAG | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| §4 Non-Causal Cobra Effect, eq. (9) (p.9) | Definition; simple model | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] |
| Conclusion (p.9-10) | Domains: policy, ML, AI alignment | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]; [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] |
| References [1]-[7] (p.10) | Goodhart 1975; Garrabrant 2017; Rodamar 2018; Bostrom 2014; Lewis 2014; Campbell 1979; Siebert 2001 | this note (below) |
| — (vault synthesis, not in paper) | Simulations of each mechanism; marketing-analytics mapping; mitigations | [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] |

The paper has **9 numbered equations** and **4 figures**. The figures are the three causal-Goodhart DAGs (p.5), the two ignored-cause DAGs (p.6), the ignored metric/goal cause DAGs (p.7) and the cobra-effect DAG (p.9). It has **no tables, theorems or empirical data**. All of its content is definitional, with toy models.

### References of the paper (p.10)

1. C. E. Goodhart, *Problems of Monetary Management: The U.K. Experience* (1975), Papers in Monetary Economics, Reserve Bank of Australia.
2. S. Garrabrant, "Goodhart Taxonomy", LessWrong, 30 Dec 2017.
3. J. Rodamar, "There ought to be a law! Campbell v. Goodhart", *Significance* 15 (2018).
4. N. Bostrom, *Superintelligence: Paths, Dangers, Strategies* (2014).
5. G. Lewis, "Why the tails come apart", LessWrong (2014) and The Polemical Medic (2015).
6. D. T. Campbell, "Assessing the impact of planned social change", *Evaluation and Program Planning* 2(1) (1979).
7. H. Siebert, *Der Kobra-Effekt* (2001).

## Examples

> [!example] Reading a model-selection rule through the taxonomy
> An analyst fits 40 variants of a weekly media model (52-156 rows each). They keep the variant whose media coefficients give the "most plausible" ROIs, or the largest total SHAP mass on media variables, instead of the variant with the best held-out accuracy. The taxonomy names several failures at once:
> - **Regressional.** "Plausibility" is a noisy proxy for "correct". The selected variant is the one whose estimation noise happened to push it towards plausibility ([[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]).
> - **Extremal.** If the chosen variant implies spend far above anything observed, its saturation curve is being trusted outside the region where it was learned ([[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]]).
> - **Causal.** Reallocating budget treats the model's predictive association as a causal lever ([[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]]).
> - **Adversarial.** If channel teams are rewarded on the model's attributed ROI, they have an incentive to shape inputs or tagging ([[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]).
>
> [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] works this example through with simulations.
^ex-reading-a-model-selection

## Connections

- **Researcher degrees of freedom.** Choosing among analyses by how the result looks is regressional Goodhart applied to the analyst's own pipeline: [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- **Model selection.** Optimizing an in-sample fit statistic is the regressional or extremal case: [[Model Selection and Overfitting]], [[Cross Validation Checking]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].
- **Explanations as proxies.** Treating feature-importance scores as the goal: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Causal structure.** The causal and non-causal cases use DAG reasoning: [[Directed Acyclic Graphs]], [[DAGs and Causal Identification]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]].
- **Governance.** Effective challenge and TEVV both guard against metric gaming: [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].
- **AI alignment.** Reward models are proxies optimized hard: [[Reward Modeling from Human Preferences]], [[RLHF and Instruction Tuning]].

## See Also
- [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] — formal setup and definitions
- [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] — applied synthesis with simulations
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — predictive accuracy as a goal vs a proxy for understanding
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — MMM practice, where many of these failures are routine
- [[Kumar et al - Shapley Values in Normative Model Evaluation]] — selecting models by SHAP plausibility is proxy optimisation
- [[NIST AI RMF - MAP Function]] — construct validation of metrics
