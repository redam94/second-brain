---
title: Janzing 2020 - Conditional vs Marginal Dropping of Features
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §3 opening, eq. (3)-(4), footnote 3 pp.3-4; 'Observational versus interventional conditional distributions' paragraph, Fig. 1, eq. (5) p.4"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]]"
  - "[[DAGs and Causal Identification]]"
used_by:
  - "[[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]"
  - "[[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]]"
  - "[[Janzing 2020 - KernelSHAP vs SHAPR Experiments]]"
aliases:
  - Observational vs interventional SHAP value function
  - Marginal expectation value function (Janzing)
  - Janzing eq. 3 vs eq. 4
  - Interventional Shapley Values
---

# Janzing 2020 - Conditional vs Marginal Dropping of Features

> [!summary]
> To attribute $f(x)-\mathbb E f(X)$ with Shapley values, the features left out of a coalition must be "dropped" by averaging over some distribution. There are two candidates: the **observational conditional** $\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]$ (eq. 3, proposed by Lundberg & Lee 2017) and the **marginal** $\mathbb E[f(x_T,X_{\bar T})]$ (eq. 4, which SHAP actually computes, citing feature independence). Through Pearl's back-door adjustment (Fig. 1, eq. 5), §3 shows that an **intervention** keeps the remaining variables at their *unconditional* joint distribution. That is the structural template for eq. (4) being the correct choice, not merely an approximation.
^summary

## Overview

§3 ("How should we sample the dropped features?") moves from a fixed baseline $x^0$ to attribution relative to $\mathbb E[f(X)]$. The authors note that explaining why one input's output is far from the average is "particularly interesting for understanding 'outliers'" (p.3). For a credit-risk or media model, that is the question "why is *this* week's prediction so far above typical?"

## Main Content

### Notation (§3, pp.3-4)

- $U=\{1,\dots,n\}$; for $T\subseteq U$, $\bar T=U\setminus T$ is its complement; $x_T$ is the sub-vector of $x$ on $T$; $X_{\bar T}$ is the random sub-vector on $\bar T$.
- $\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]$ is the **conditional expectation** of $f$ given $X_T=x_T$.
- $\mathbb E[f(x_T,X_{\bar T})]$ is the expectation over the distribution of $X_{\bar T}$ *without conditioning* on $X_T=x_T$. The paper calls this the **"marginal expectation"**.

> [!definition] Definition: The two candidate simplified functions (§3, eq. 3-4, p.4)
> $$
> f_T(x):=\mathbb E\big[f(x_T,X_{\bar T})\mid X_T=x_T\big]\tag{3}
> $$
> $$
> f_T(x):=\mathbb E\big[f(x_T,X_{\bar T})\big]\tag{4}
> $$
> In either case the set function is $g(T):=f_T(x)-f_\emptyset(x)$ (so $f_\emptyset(x)=\mathbb E f(X)$ and $g(U)=f(x)-\mathbb E f(X)$), and $\phi_i$ is computed from eq. (2) of [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients#^def-shapley-set-function|the Shapley set-function definition]].
^def-eq3-eq4

**Lundberg & Lee's position (p.4).** They propose (3). Because it is hard to compute, they approximate it by (4) and justify the approximation by assuming feature independence.

**Janzing et al.'s position (p.4).** "We will argue that using (4) rather than (3) is conceptually the right thing in the first place." The aim is "to prevent others from 'improving' SHAP by finding an approximation for the conditional expectation that is better than the marginal expectation". The examples given are Aas et al. (2019) and Lundberg et al. (2018). Footnote 3 adds that TreeExplainer in SHAP "has meanwhile been changed accordingly", i.e. towards the interventional/marginal version.

### Observational vs interventional conditioning (§3, p.4)

The authors say the ideas of this paragraph are already in Datta et al. (2016) in a more general, abstract form, and point also to Friedman (2001, partial dependence) and Zhao & Hastie (2019, causal interpretation of black-box models).

> [!definition] Definition: Causal structure of Figure 1 (§3, Fig. 1, p.4)
> **Drawn edges (checked against the rendered figure, p.4):** $Z\to X_1$, $Z\to X_2$, $Z\to X_3$, and $X_1\to Y$, $X_2\to Y$, $X_3\to Y$. There is **no direct edge $Z\to Y$**, and no edges among $X_1,X_2,X_3$. $Z$ is drawn as a **white** node, meaning latent ("we may therefore assume $Z$ to be latent, which we have indicated by white color", p.4). All other nodes ($X_1,X_2,X_3,Y$) are **black**, i.e. observed.
>
> $Z$ generates the dependences between $X_1$ and $X_2,X_3$. The text's "backdoor path $X_1\leftarrow Z\to Y$" is shorthand: in the drawn graph, $Z$ reaches $Y$ only through $X_2$ and $X_3$, so the back-door paths are $X_1\leftarrow Z\to X_2\to Y$ and $X_1\leftarrow Z\to X_3\to Y$. Conditioning on $\{X_2,X_3\}$ blocks both. Caption: the observational conditional $p(y\mid x_1)$ "does not correctly describe how $Y$ changes after intervening on $X_1$ because the common cause $Z$ 'confounds' the relation between $X_1$ and $Y$."
^fig-1-confounded

**Why $\mathbb E[Y\mid X_1=x_1]$ is the wrong object.** Observing $X_1=x_1$ also shifts the distribution of $X_2,X_3$, because of their dependence on $X_1$ through $Z$. So $\mathbb E[Y]-\mathbb E[Y\mid X_1=x_1]$ reflects the influence of $X_2,X_3$ as well as that of $X_1$.

> [!theorem] Proposition: Back-door adjustment for Fig. 1 (§3, eq. 5, p.4)
> Using Pearl's (2000) do-operator,
> $$
> \mathbb E\big[Y\mid do(X_1=x_1)\big]=\int\mathbb E[Y\mid x_1,x_2,x_3]\;p(x_2,x_3)\,dx_2\,dx_3 .\tag{5}
> $$
> **Proof sketch.** $\{X_2,X_3\}$ blocks the only back-door path $X_1\leftarrow Z\to Y$ (through $Z\to X_{2,3}\to Y$), and neither variable descends from $X_1$. The back-door criterion therefore applies, giving $p(y\mid do(x_1))=\int p(y\mid x_1,x_2,x_3)p(x_2,x_3)\,dx_2dx_3$. Since $Z$ is never needed, it may be latent.
^thm-eq5-backdoor

> [!theorem] Two structural observations used later (§3, p.4)
> 1. Eq. (5) contains **no conditional distribution given $X_1=x_1$**. Replacing $p(x_2,x_3)$ with $p(x_2,x_3\mid x_1)$ would give the observational $\mathbb E[Y\mid X_1=x_1]$. In the paper's words, "the intervention on $X_1$ breaks the dependences to $X_2,X_3$."
> 2. The **dependences between $X_2$ and $X_3$ are kept**. They are unaffected by the intervention on $X_1$.
>
> Read with $Y=f(X)$, these are exactly the properties of the marginal simplified function (4). The dropped features are drawn from their own joint law $P_{X_{\bar T}}$, with no conditioning on $x_T$ but with their mutual dependence intact. Formalised in [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]].
^thm-two-observations

Note what (4) is **not**. It is not a product of one-dimensional marginals: the dropped features keep their joint dependence. That separates "marginal/interventional" from the "independent-features" approximation, which is a further simplification. In practice KernelSHAP samples rows of a background dataset, which preserves the joint law of $X_{\bar T}$. See [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]].

## Examples

> [!example] Example: Confounded media planning (marketing illustration)
> Weekly data, 52-156 rows: $X_1$ = TV spend, $X_2$ = search spend, $X_3$ = promotion depth, $Y$ = modelled sales, and $Z$ = an unrecorded seasonal demand forecast that drives both the TV plan and true sales. $\mathbb E[Y\mid X_1=\text{high}]$ also picks up the high search and promotion levels that co-occur with heavy TV. Formula (5) instead averages the model's response at TV = high over the *ordinary* mix of search and promotion weeks.
> For the model $f$ these are the same two quantities as eq. (3) and eq. (4). What (5) does **not** give you is the effect of TV on *real* sales, since $Z$ also feeds $Y_{\text{real}}$ through channels the model may have absorbed into $X_1$'s coefficient. See [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] for that distinction.
^ex-confounded-media-planning

## Connections

- Back-door criterion and adjustment formula: [[DAGs and Causal Identification]], [[Do-Calculus in Summary Causal DAGs]], [[Logic of Regression Adjustment]].
- Eq. (4) is the average over $X_{\bar T}$ that defines Friedman's partial dependence. The extrapolation cost of evaluating $f$ at $(x_T,X_{\bar T})$ pairs that never occur is the theme of [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- The permutation-importance analogue of eq. (3) is the conditional permutation scheme of [[Strobl et al 2008 - Conditional Variable Importance - Overview]], which takes the *opposite* side for a data-level question.
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] treats the (3)-vs-(4) choice as a dilemma with no clean exit.

## See Also

- [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]] — what goes wrong with (3)
- [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] — why (4) is the interventional quantity
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
