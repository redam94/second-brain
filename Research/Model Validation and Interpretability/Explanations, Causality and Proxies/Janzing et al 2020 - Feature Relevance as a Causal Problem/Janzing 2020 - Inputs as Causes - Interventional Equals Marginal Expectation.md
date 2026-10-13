---
title: Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §3 causal-language paragraph, true features vs inputs, Fig. 2, eq. (14), footnote 4, pp.5-6"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Janzing 2020 - Conditional vs Marginal Dropping of Features]]"
  - "[[Do-Calculus in Summary Causal DAGs]]"
used_by:
  - "[[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]]"
  - "[[Janzing 2020 - KernelSHAP vs SHAPR Experiments]]"
aliases:
  - Janzing eq. 14
  - Interventional expectation of model output
  - True features vs algorithm inputs
---

# Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation

> [!summary]
> The paper's positive argument. Treat the algorithm as a causal system whose **inputs** $X_1,\dots,X_n$ are the only causes of its **output** $Y=f(X)$, and keep them formally separate from the **true features** $\tilde X_1,\dots,\tilde X_n$ of the real-world object. Intervening on $X_T$ then leaves $X_{\bar T}$ at its natural joint law, so $\mathbb E[Y\mid do(X_T=x_T)]=\mathbb E[f(x_T,X_{\bar T})]$ (eq. 14). This justifies the **marginal** value function "from the causal perspective". The price of the construction is its scope: the causality is that of the "technical input / output system", and "Y is the output of the system and not a property of the external world."
^summary

## Overview

[[Janzing 2020 - Conditional vs Marginal Dropping of Features|Eq. (5)]] showed that an intervention on $X_1$ cuts its dependence on the remaining causes of $Y$ while keeping their mutual dependence. This note applies that idea to the trivially known causal graph of a prediction algorithm: inputs → output.

## Main Content

### The causal reading of an algorithm (§3, p.5)

The authors "consider the inputs of an algorithm as causes of the output". They emphasise that this is not a claim about the world: "we are not talking about the causal relation between any features in the real world outside the computer (where the attribute predicted by Y may be the cause of the features), but only about causality of this technical input / output system". Footnote 4 adds: "Accordingly, Y is the output of the system and not a property of the external world."

> [!definition] Definition: True features vs inputs (§3, p.5, Fig. 2)
> - $\tilde X_1,\dots,\tilde X_n$: the **true features** obtained from an object (a customer, an image, a market-week).
> - $X_1,\dots,X_n$: the **inputs** plugged into the algorithm.
> - $Y=f(X_1,\dots,X_n)$: the algorithm's output.
>
> **Fig. 2, top (usual learning scenario):** $\tilde X_j\to X_j$ for each $j$, with $X_j=\tilde X_j$, and $X_1,\dots,X_n\to Y$. The $\tilde X_j$ may be arbitrarily dependent among themselves.
> **Fig. 2, bottom (hypothetical intervention):** the inputs $X_1,X_2$ are cut from $\tilde X_1,\tilde X_2$ and set to fixed values $x_1,x_2$. The remaining inputs $X_3,\dots,X_n$ are still copied from the object's true features and are therefore sampled from the usual joint distribution $P_{X_3,\dots,X_n}$.
>
> **What is actually drawn (p.6, checked against the rendered figure).** The figure uses exactly **five** true features and five inputs, not general $n$:
> - *Top panel:* a box labelled "object with features" holds five white nodes $\tilde X_1,\dots,\tilde X_5$. Each $\tilde X_j$ has one arrow to its own black input node $X_j$ ($\tilde X_1\to X_1,\dots,\tilde X_5\to X_5$), and all five inputs $X_1,\dots,X_5$ point to the black output $Y$. No edges are drawn among the $\tilde X_j$.
> - *Bottom panel:* the same box with $\tilde X_1,\dots,\tilde X_5$. The input nodes for features 1 and 2 are relabelled with the fixed lower-case values $x_1,x_2$ and have **no incoming arrows** (the edges $\tilde X_1\to X_1$ and $\tilde X_2\to X_2$ are deleted). $X_3,X_4,X_5$ keep their arrows from $\tilde X_3,\tilde X_4,\tilde X_5$, and $x_1,x_2,X_3,X_4,X_5$ all still point to $Y$.
>
> **Caption** (p.6): "Top: Causal structure of our prediction scenario: The output $Y$ is determined by the inputs $X_1,\dots,X_n$. In the usual learning scenario these inputs coincide with features $\tilde X_1,\dots,\tilde X_n$ ob some object, that is $X_j=\tilde X_j$. Bottom: To evaluate the impact of some inputs, say $X_1,X_2$, for the output $Y$ we consider a hypothetical scenario where we adjust these inputs to some fixed values $x_1,x_2$ and sample the remaining inputs from the usual joint distribution $P_{X_3,\dots,X_n}$." ("ob some object" is the original typo for "of some object".) So the caption speaks of general $n$ while the drawing shows $n=5$.
^def-true-features-vs-inputs

This separation lets us "talk about a hypothetical scenario where the inputs are changed compared to the true features" (p.5). We can feed the algorithm a TV value that this market-week did not have, without asking what would have happened to the market-week.

> [!theorem] Proposition: Interventional = marginal expectation (§3, eq. 14, p.5)
> Under the causal structure of Fig. 2, with the inputs $X_1,\dots,X_n$ the only causes of $Y$ and an intervention that "leaves the remaining components unaffected", the remaining inputs are "sampled from their natural joint distribution without conditioning", and
> $$\mathbb E\big[Y\mid do(X_T=x_T)\big]=\mathbb E\big[f(x_T,X_{\bar T})\big].\tag{14}$$
> **Proof sketch.** In the post-intervention graph, $X_T$ has no parents. $X_{\bar T}$ keeps its parents $\tilde X_{\bar T}$ and hence its marginal law $P_{X_{\bar T}}$, which does not depend on $x_T$ because the link $\tilde X_T\to X_T$ is cut. $Y$ is a deterministic function of $(X_T,X_{\bar T})$. So $\mathbb E[Y\mid do(x_T)]=\int f(x_T,x_{\bar T})\,dP_{X_{\bar T}}(x_{\bar T})$. Equivalently, apply the back-door/adjustment formula with $X_{\bar T}$ as the adjustment set. It blocks every back-door path from $X_T$ to $Y$, because all of them run $X_T\leftarrow\tilde X_T\cdots\tilde X_{\bar T}\to X_{\bar T}\to Y$. ∎
^thm-eq14-interventional-marginal

> [!theorem] Corollary: Causal justification of marginal SHAP (§3, pp.5-6)
> "Since the interventional expectations coincide with the marginal expectations, we have thus justified the use of marginal expectations for the Shapley values from the causal perspective." Using $f_T(x)=\mathbb E[Y\mid do(X_T=x_T)]$ in eq. (2) yields **interventional Shapley values**, which coincide with marginal Shapley values (eq. 4).
>
> **Minimal causal knowledge.** "the fact that the inputs $X_1,\dots,X_n$ cause the output $Y$ is the only causal knowledge needed to compute (14)". The separation of $\tilde X$ from $X$ "allows us to be agnostic about the causal relations between the true features in the real world" (p.5).
^thm-causal-justification

### What the argument licenses, and what it does not

| Question | Object | Does eq. (14) answer it? |
|---|---|---|
| How does the **model's output** respond if I set input $X_j$? | $\mathbb E[f(X)\mid do(X_j=x_j)]$ | **Yes.** Needs only "inputs cause outputs". |
| Does the model **use** input $j$? | Sensitivity for $f$ | **Yes.** Marginal $\phi_j=0$ whenever $f$ ignores $x_j$ ([[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity\|Lemma 1 contrast]]). |
| How would the **real outcome** respond if the real feature were set? | $\mathbb E[\tilde Y\mid do(\tilde X_j=x_j)]$ | **No.** That needs a causal model of $\tilde X$ and $\tilde Y$. $f$ is just a regression fitted to observational data, so its coefficients carry confounding. |
| Is the model's input-output response **plausible** at $(x_T,X_{\bar T})$ combinations never seen in training? | Extrapolation of $f$ | **No.** Eq. (14) asks for $f$ at those points but says nothing about whether $f$ is reliable there. |

The third row is the crux for applied use. If $\tilde Y$ (real sales) is a *cause* of some $\tilde X_j$ — the parenthetical in the quotation above, "where the attribute predicted by Y may be the cause of the features" — then the model's dependence on $X_j$ can be anti-causal, and a large interventional SHAP value is pure prediction, not effect. The fourth row is the objection pressed by [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].

## Examples

> [!example] Example: Media-mix regression with a demand confounder (marketing illustration)
> **Setup.** True world: an unobserved demand index $D$ raises both the planned TV budget $\tilde X_{\text{TV}}$ and real sales $\tilde Y$. TV's real effect is $\beta_{\text{TV}}=1$ per unit and $D$'s effect is $2$. TV is planned as $\tilde X_{\text{TV}}=D+\varepsilon$. A model trained without $D$ learns $f(x)=\hat\beta x_{\text{TV}}+\dots$ with $\hat\beta>1$, because it absorbs part of $D$.
>
> **Interventional SHAP** for a week with TV $=x$ is $\hat\beta(x-\mathbb E X_{\text{TV}})$. Per eq. (14) this is *exactly* how the model's output moves when the TV input is set to $x$, so the attribution is correct **for the model**.
>
> **Reading it as incremental sales** would overstate TV's effect by the factor $\hat\beta/\beta_{\text{TV}}$. Eq. (14) has nothing to say about that error. It is removed by identification: experiments or geo tests ([[Experimental Benchmarks for Observational Ad Measurement]]), controls for $D$ ([[Logic of Regression Adjustment]]), or orthogonalised estimators ([[DML Estimators for ATE and the Interactive Model]]). The practical cautions are developed in [[Dillon et al - SHAP and Causal Insights - Overview]].
^ex-media-mix-regression-with

## Connections

- Do-operator semantics and graph surgery: [[Do-Calculus in Summary Causal DAGs]], [[DAGs and Causal Identification]], [[Canonical Causal DAGs]].
- Potential-outcomes reading of the world-level estimand: [[Potential Outcomes Framework]].
- Same theme in a different literature: Zhao & Hastie (2019) on when partial dependence plots *are* causal (cited by the paper, p.4). They need the back-door criterion to hold for the real features.
- For marketing measurement, a model-level interventional attribution belongs with prediction diagnostics, not lift estimates. See [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] and [[Causal Machine Learning - Overview]].

## See Also

- [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] — synthesis and critique
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
