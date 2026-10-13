---
title: Shapley Values and SHAP Value Functions
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Kumar et al 2020 - Problems with Shapley-Value-Based Explanations.pdf]]"
source_location: "Kumar, Venkatasubramanian, Scheidegger & Friedler (2020), ICML/PMLR 119, arXiv:2002.11097v2 — §2 Background: §2.1 eq. (1)-(3) and the three axioms (p.1-2); §2.2 notation (p.2); §2.2.1 Value functions eq. (4)-(5) (p.2); §2.2.2 Algorithms and Table 1 (p.2-3)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations"
doc_type: paper
depends_on:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
used_by:
  - "[[Kumar et al - Conditional vs Interventional Shapley Catch-22]]"
  - "[[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]"
  - "[[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]"
  - "[[Kumar et al - Shapley Values in Normative Model Evaluation]]"
  - "[[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]"
  - "[[Dillon et al - SHAP and Causal Insights - Overview]]"
aliases:
  - Shapley value
  - Shapley values
  - SHAP values
  - SHAP value function
  - Shapley sampling values
  - Shapley axioms (symmetry, dummy, additivity)
  - Conditional and interventional SHAP value functions
---

# Shapley Values and SHAP Value Functions

> [!summary]
> The **Shapley value** of a cooperative game $(N,v)$ averages a player's marginal contribution $v(S\cup i)-v(S)$ over all orderings of the players; it is the *unique* allocation of $v(\text{all})$ satisfying **symmetry, dummy and additivity**. Feature-attribution methods (SHAP, KernelSHAP, TreeSHAP, Shapley sampling values, QII, FAE) treat features as players and set $v_{f,x}(D)=f(x)$, but they must also say what a *subset* of features is worth. There are two families: the **conditional** value function $\mathbb E[f(X)\mid X_S=x_S]$ and the **interventional** one $\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$. Kumar et al.'s Table 1 shows that several methods *define* the conditional game but *compute* the interventional one (KernelSHAP), which is why they classify methods by what is estimated. This note is the vault's owner note for the Shapley/SHAP definitions.
^summary

## Overview

This note transcribes §2 ("Background") of [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview|Kumar et al. (2020)]] in full: the classical definition, the axioms, the notation for features, the two value-function families and the algorithmic split summarised in Table 1. Every later critique in the paper is phrased in this notation, so the downstream notes ([[Kumar et al - Conditional vs Interventional Shapley Catch-22]], [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]) link back here.

The basic move is old. Kruskal (1987) and Lipovetsky & Conklin (2001) used the Shapley value for *global* importance in linear regression, with $v_f(S)$ the $R^2$ of a linear model built on predictors $S$; this decomposes explained variance additively across features. Owen & Prieur (2017) used it for sensitivity analysis, where the payoff is the total variance of a function (§2.2.1, p.2). The recent "local" methods (Ribeiro et al. 2016; Lundberg & Lee 2017; Lundberg et al. 2018) define a payoff $v_{f,x}:2^d\to\mathbb R$ that depends on the instance $x$ being explained.

## Main Content

### Classical Shapley values (§2.1, p.1-2)

> [!definition] Definition: Coalitional game and marginal contribution (§2.1, eq. 1, p.2)
> A **coalitional game** has a set of $N$ players and a characteristic function $v$ mapping subsets $S\subseteq\{1,2,\dots,N\}$ to real values $v(S)$, with $v(\emptyset)=0$. $v(S)$ is the collective payoff the players in $S$ can gain by "cooperating". The **marginal contribution** of player $i$ to coalition $S$ is
> $$\Delta_v(i,S)=v(S\cup i)-v(S). \tag{1}$$
^def-game-marginal

> [!definition] Definition: Shapley value — permutation and subset forms (§2.1, eq. 2-3, p.2)
> Let $\Pi$ be the set of permutations of $\{1,\dots,N\}$ and, for $\pi\in\Pi$, let $S_{i,\pi}=\{j:\pi(j)<\pi(i)\}$ be the players preceding $i$ in $\pi$. The Shapley value of $i$ is
> $$\phi_v(i)=\frac{1}{N!}\sum_{\pi\in\Pi}\Delta_v(i,S_{i,\pi}). \tag{2}$$
> Grouping permutations by the set that precedes $i$ (each $S$ precedes $i$ in $|S|!\,(N-|S|-1)!$ orderings):
> $$\phi_v(i)=\frac{1}{N!}\sum_{S\subseteq\{1,\dots,N\}\setminus\{i\}}|S|!\,(N-|S|-1)!\,\Delta_v(i,S). \tag{3}$$
> (The paper prints the sum over $S\subseteq\{1,\dots,N\}$; terms with $i\in S$ have $\Delta_v(i,S)=0$, so the two readings agree.)
>
> **Reading:** a weighted average of $i$'s marginal contributions to every possible subset — equivalently, the expected marginal contribution when players join in a uniformly random order.
^def-shapley-value

> [!theorem] Theorem: Axiomatic characterization (§2.1, p.2)
> $\phi_v$ is the **unique** allocation of the grand-coalition value $v(\{1,\dots,N\})$ satisfying:
> 1. **Symmetry:** for two players $i,j$, if $\Delta_v(i,S)=\Delta_v(j,S)$ for any subset $S$, then $\phi_v(i)=\phi_v(j)$.
> 2. **Dummy:** for a single player $i$, if $\Delta_v(i,S)=0$ for all subsets $S$, then $\phi(i)=0$.
> 3. **Additivity:** for a single player $i$ and two value functions $v,w$, $\phi_v(i)+\phi_w(i)=\phi_{v+w}(i)$.
>
> Together with the efficiency built into "allocation of $v(\{1,\dots,N\})$" this gives $\sum_i\phi_v(i)=v(\{1,\dots,N\})-v(\emptyset)$.
>
> **Caveat developed in §3.2:** for any *two* of the three axioms there is a non-Shapley allocation satisfying them, so uniqueness rests on all three — and additivity is the contested one (see [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]).
^thm-shapley-axioms

### Shapley values for feature importance (§2.2, p.2)

Given a model $f(x_1,\dots,x_d)$, the features $1,\dots,d$ are the players and $v$ is "some measure of the importance or influence of that subset"; $\phi_v(i)$ is read as the influence of feature $i$ on the outcome. A method is a choice of value function $v_f$ plus a way to compute or approximate the resulting Shapley values.

> [!definition] Notation (§2.2, p.2)
> | Symbol | Meaning |
> |---|---|
> | $D$ | the set of features $\{1,2,\dots,d\}$ |
> | $X$ | a multivariate random variable $\{X_1,\dots,X_d\}$ |
> | $x$ | a set of values $\{x_1,\dots,x_d\}$ |
> | $X_S$ | the random variables $\{X_i:i\in S\}$ |
> | $x_S$ | the values $\{x_i:i\in S\}$ |
> | $\bar S$ | the complement $D\setminus S$ |
> | $v_{f,x}(S)$ | value of coalition $S$ when explaining $f$ at $x$; $v_{f,x}(D)=f(x)$ |
^def-notation

### Value functions (§2.2.1, p.2)

For local explanation, the grand-coalition value is the prediction, $v_{f,x}(D)=f(x)$. The methods differ in how $v_{f,x}$ acts on proper subsets.

> [!definition] Definition: Conditional (observational) value function (§2.2.1, eq. 4, p.2)
> Shapley sampling values (Štrumbelj & Kononenko 2014) and SHAP values (Lundberg & Lee 2017) are *defined* through the conditional expected model output when only the features in $S$ are known:
> $$v_{f,x}(S)=\mathbb E[f(X)\mid X_S=x_S]=\mathbb E_{X_{\bar S}\mid X_S}\big[f(x_S,X_{\bar S})\big]. \tag{4}$$
^def-conditional-value

> [!definition] Definition: Interventional value function (§2.2.1, eq. 5, p.2)
> Quantitative Input Influence (QII; Datta et al. 2016) borrows from causal inference: simulate an *intervention* on the features not in $S$, breaking their correlation with the features in $S$:
> $$v_{f,x}(S)=\mathbb E_{\mathcal D}\big[f(x_S,X_{\bar S})\big], \tag{5}$$
> where $\mathcal D$ is derived from the product of the marginal distributions of the features in $\bar S$. Merrick & Taly (2019) generalise the use of a distribution other than the data's and propose the **Formulate, Approximate, Explain (FAE)** framework that unifies several Shapley-explanation approaches.
^def-interventional-value

The distinction is between *conditioning on* $X_S=x_S$ (an observational quantity, see [[Spurious Association and Confounds]]) and *setting* $X_S$ while drawing the rest independently (an intervention in the sense of [[Do-Calculus in Summary Causal DAGs|do-calculus]]). Which is the "right" target is argued from the causal side in [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview|Janzing et al. (2020)]].

### Algorithms and Table 1 (§2.2.2, p.2-3)

Methods with the same stated value function can differ because of the assumptions used in approximation:

- **TreeSHAP** (Lundberg et al. 2018) — "an efficient algorithm for calculating SHAP values on additive tree-based models such as random forests and gradient boosting machines" (p.2). (Kumar et al. do not call it *exact*; it computes without Monte Carlo sampling — §3.1.1 says it estimates the conditional expectations "directly, without sampling, using information computed during model training", p.3-4 — but the conditional distribution it uses is itself a leaf-count model of the training data, see [[Kumar et al - Conditional vs Interventional Shapley Catch-22]].) It estimates $\mathbb E_{X_{\bar S}\mid X_S}[f(x_S,X_{\bar S})]$ from the proportion of training samples matching the condition $x_S$ that fall into each leaf, so it does **not** rely on feature independence.
- **KernelSHAP** (Lundberg & Lee 2017) — estimates the conditional expectation *by assuming feature independence*: samples of $X_{\bar S}$, $\bar S=D\setminus S$, are drawn from their marginal joint distribution. This "effectively approximates an expectation over an interventional distribution instead, though in a slightly different way from QII" (p.3).

> [!definition] Table 1 — stated vs estimated value function (p.3)
> | Method | Stated $v_{f,x}(S)$ | Actually approximated $\hat v_{f,x}(S)$ |
> |---|---|---|
> | KernelSHAP, Shapley sampling values | $\mathbb E_{X_{\bar S}\mid X_S}[f(x_S,X_{\bar S})]$ | $\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$ |
> | QII, FAE, Interventional TreeSHAP | $\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$ | $\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$ |
> | Conditional TreeSHAP, Frye et al. (2019), Aas et al. (2019) | $\mathbb E_{X_{\bar S}\mid X_S}[f(x_S,X_{\bar S})]$ | $\mathbb E_{X_{\bar S}\mid X_S}[f(x_S,X_{\bar S})]$ |
>
> Caption (verbatim, p.3): "Proposed value function $v_{f,x}$ for each method, compared with the quantity $\hat v_{f,x}$ the algorithm actually approximates. The interventional distribution $\mathcal D$ used depends on the method (i.e., for KernelSHAP it is the observational joint distribution of $\bar X$)."
>
> *Gloss (ours, not in the caption):* the symbol printed as $\bar X$ is ambiguous; read with the §2.2.2 text ("samples of the features in $\bar S = D\setminus S$ are drawn from the marginal joint distribution of these variables"), it means the observational joint distribution of $X_{\bar S}$, drawn independently of $x_S$.
>
> **Interventional vs conditional TreeSHAP (left implicit by the source).** Table 1 lists "Interventional TreeSHAP" next to QII and FAE (value function and estimate both $\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$), and "Conditional TreeSHAP" next to Frye et al. and Aas et al. (both conditional). The paper never describes the interventional variant in the text. Its only algorithmic description of TreeSHAP (§2.2.2, p.2-3; §3.1.1, p.4) is the leaf-proportion conditional estimator, so §2.2.2 and §3.1.1 are about *conditional* TreeSHAP. The row-label is the paper's only signal that an interventional variant exists. *Background, not from the source:* in the SHAP library, interventional TreeSHAP walks each tree with a background dataset and replaces the features not in $S$ with background values, ignoring their dependence on $x_S$. That makes it an exact computation of the marginal/interventional game, the reason it is listed with QII and FAE.
>
> **Convention adopted for the rest of the paper:** a method is called *interventional* or *conditional* according to its **estimation** method. KernelSHAP, Shapley sampling values, QII and FAE are **interventional**; TreeSHAP and the in-distribution samplers of Aas et al. and Frye et al. are **conditional**.
^tbl-value-functions

> [!algorithm] Generic Monte Carlo estimator of a local Shapley value (permutation sampling; Štrumbelj & Kononenko style — illustration, not in the source)
> Input: model $f$, instance $x$, feature $i$, background sampler for $X_{\bar S}$ (marginal → interventional; conditional model → conditional), $M$ draws.
> 1. For $m=1,\dots,M$: draw a random permutation $\pi$ and let $S=S_{i,\pi}$.
> 2. Draw background $z\sim$ sampler for $X_{\bar S}$ (given $x_S$ if conditional).
> 3. Form $x^{+}=(x_{S\cup i},z_{\overline{S\cup i}})$ and $x^{-}=(x_S,z_{\bar S})$; record $\delta_m=f(x^+)-f(x^-)$.
> 4. Return $\hat\phi(i)=\frac1M\sum_m\delta_m$.
>
> The *only* difference between a conditional and an interventional estimator is the sampler in step 2 — which is exactly where Kumar et al.'s §3.1 catch-22 lives.
^alg-permutation-sampling

## Examples

> [!example] Example: Interaction credit is split evenly (illustration consistent with §2)
> **Setup.** $f(x)=x_1+x_2+x_1x_2$, $X_1,X_2$ independent with mean 0 (so conditional and interventional value functions coincide). Explain $x=(2,1)$, $f(x)=5$.
>
> **Value function.** $v(\emptyset)=\mathbb E f(X)=0$; $v(\{1\})=x_1+0+0=2$; $v(\{2\})=x_2=1$; $v(\{1,2\})=5$.
>
> **Shapley values (eq. 3, $N=2$, weights $\tfrac12,\tfrac12$).**
> $\phi(1)=\tfrac12[v(1)-v(\emptyset)]+\tfrac12[v(12)-v(2)]=\tfrac12(2)+\tfrac12(4)=3$;
> $\phi(2)=\tfrac12(1)+\tfrac12(5-2)=2$. Sum $=5=f(x)-v(\emptyset)$.
>
> **Interpretation.** In general $\phi(1)=x_1+\tfrac12x_1x_2$ and $\phi(2)=x_2+\tfrac12x_1x_2$: each main effect is credited to its own feature and the interaction term is divided equally, irrespective of which feature "drives" it. This even split is the seed of the multiplicative-model result in [[Kumar et al - Additivity Axiom Limits for Non-Additive Models#^thm-multiplicative]].
^ex-interaction-split

> [!example] Example: Global $R^2$ (Shapley/LMG) decomposition (§2.2.1 historical use)
> **Setup.** Weekly sales regressed on two media drivers over 104 weeks; $R^2(\{TV\})=0.30$, $R^2(\{\text{search}\})=0.40$, $R^2(\{TV,\text{search}\})=0.50$ (hypothetical numbers).
>
> **Shapley share.** $\phi(TV)=\tfrac12(0.30)+\tfrac12(0.50-0.40)=0.20$; $\phi(\text{search})=\tfrac12(0.40)+\tfrac12(0.50-0.30)=0.30$; total $0.50$.
>
> **Interpretation.** This is the Kruskal / Lipovetsky-Conklin use: an additive split of explained variance among correlated predictors. It answers "how much fit is attributable", not "what would sales do if TV spend changed" — the gap Kumar et al.'s §4.2 presses on ([[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]).
^ex-r2-decomposition

## Connections

- [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] — §3.1: each value function has a failure mode.
- [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] — §3.2: what the axioms force on additive vs multiplicative models.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — argues the interventional value function is the conceptually right one for explaining a model.
- [[Dillon et al - SHAP and Causal Insights - Overview]] — why SHAP of a predictive model is not a causal effect; links to [[DML Estimators for ATE and the Interactive Model]].
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] and [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — the permutation-importance counterpart of the marginal-vs-conditional sampler choice.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — importance of a variable across *all* good models rather than for one fitted $f$.

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — parent overview and source map.
- [[Counterfactual Inference]] — the interventional quantity the conditional game does not compute.
- [[Spurious Association and Confounds]] — why conditioning on correlated features transfers credit.
