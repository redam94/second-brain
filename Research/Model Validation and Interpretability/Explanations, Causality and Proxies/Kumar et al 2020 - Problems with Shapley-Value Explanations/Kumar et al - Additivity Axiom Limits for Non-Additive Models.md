---
title: Kumar et al - Additivity Axiom Limits for Non-Additive Models
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - type/theorem
  - doc/paper
source: "[[raw/Kumar et al 2020 - Problems with Shapley-Value-Based Explanations.pdf]]"
source_location: "Kumar et al. (2020) §3.2 Additivity constraints: axiom-pair non-uniqueness and Osborne & Rubinstein quote (p.5); linear model eq. (14)-(19) (p.6); relaxed attribution ψ (p.6); multiplicative model eq. (20)-(23) (p.6)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations"
doc_type: paper
depends_on:
  - "[[Shapley Values and SHAP Value Functions]]"
used_by:
  - "[[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
aliases:
  - Kumar multiplicative-model Shapley result
  - Shapley values uninformative for multiplicative models
  - Additivity constraints (Kumar et al)
---

# Kumar et al - Additivity Axiom Limits for Non-Additive Models

> [!summary]
> §3.2 of Kumar et al. (2020) identifies a problem common to *both* value functions, rooted in the axioms. Shapley values are unique only because all three axioms hold, and the additivity axiom is the "not nearly so innocent" one. For a **linear model with independent features** every expectation value function gives $\phi(i)=\beta_i(x_i-\mathbb E X_i)$ — matching the intuition that scaled coefficients signal importance (eq. 14-19). But for a **multiplicative model** $f(x)=\prod_j x_j$ with independent, zero-centred features, every coalition except the grand one has value 0, so **every feature receives $f(x)/d$ regardless of its value** (eq. 20-23). Under an interventional reading, Shapley values are as uninformative for non-additive models as an equal-split rule is for linear ones; "model-agnostic" is not true "under the lens of a particular interpretation."
^summary

## Overview

[[Kumar et al - Conditional vs Interventional Shapley Catch-22|§3.1]] concerned the choice of value function. §3.2 assumes feature independence, which "renders the interventional versus conditional debate irrelevant", and shows that the Shapley value is still "conceptually limited for non-additive models" (p.5). The argument has three steps: (i) uniqueness rests on additivity; (ii) additivity makes the Shapley value behave well for additive models — and an alternative that drops additivity behaves badly there; (iii) the mirror image: for multiplicative models the Shapley value behaves like that bad alternative.

## Main Content

### Uniqueness rests on additivity (p.5)

> [!theorem] Claim: Each pair of axioms admits a non-Shapley allocation (§3.2, p.5)
> "For any two of the axioms described in Section 2.1, there exists an alternative attribution between players which satisfies those two but not the other; the Shapley value is therefore only unique because it satisfies all three." Because "the notion of the sum of two games is not especially meaningful", the **additivity** axiom has been described by game theorists (Osborne & Rubinstein 1994) as "mathematically convenient" and "not nearly so innocent as the other two".
^thm-axiom-pairs

See [[Shapley Values and SHAP Value Functions#^thm-shapley-axioms]] for the axioms.

### Additive models: Shapley recovers centred coefficients (eq. 14-19, p.6)

> [!theorem] Result: Shapley values of a linear model with independent features (§3.2, eq. 14-19, p.6)
> Let $f(x)=\beta_0+\beta_1x_1+\dots+\beta_dx_d$ with independent $X_i$. For any expectation value function and any $S$:
> $$v_{f,x}(S)=\mathbb E_{X_{\bar S}\mid X_S}[f(x_S,X_{\bar S})] \tag{14}$$
> $$=f(x_S,\mathbb E[X_{\bar S}]) \tag{15}$$
> $$=\sum_{j\in S}\beta_jx_j+\sum_{j\in\bar S}\beta_j\mathbb E[X_j]+\beta_0. \tag{16}$$
> The marginal contribution of $i\notin S$ is
> $$\Delta(i,S)=\Big[\sum_{j\in S}\beta_jx_j+\beta_ix_i+\sum_{j\in\overline{S\cup i}}\beta_j\mathbb E[X_j]+\beta_0\Big]-\Big[\sum_{j\in S}\beta_jx_j+\beta_i\mathbb E[X_i]+\sum_{j\in\overline{S\cup i}}\beta_j\mathbb E[X_j]+\beta_0\Big] \tag{17-18}$$
> $$=\beta_i\,(x_i-\mathbb E[X_i]). \tag{19}$$
> Because $\Delta(i,S)$ does not depend on $S$, the weighted average in eq. 3 is the same constant:
> $$\phi(i)=\beta_i\,(x_i-\mathbb E[X_i]).$$
>
> **Interpretation (p.6):** "the Shapley value is supported by the common intuition that coefficient size, if variables are appropriately scaled, signals importance in a linear model." Additivity also aligns with additive models in a second way: the games of two models sum to the expectation game of the sum of the models — "reasonable when the models are additive in the first place."
^thm-additive-case

### Relaxing additivity: the equal-split alternative ψ (p.6)

> [!definition] Definition: Alternative attribution ψ satisfying symmetry and dummy but not additivity (§3.2, p.6)
> Let $U$ be the set of dummy features. Define
> **As printed (p.6):** "$\psi : \psi(i) = v(i)$ for $i \in U$ and $\psi(i) = \frac{1}{|U|}(v(D) - \sum_{j\in U} v(j))$ where $U$ is the set of dummy features", i.e.
> $$\psi(i)=v(i)\ \text{ for } i\in U,\qquad \psi(i)=\frac{1}{|U|}\Big(v(D)-\sum_{j\in U}v(j)\Big)\ \text{ otherwise (as printed)}.$$
> **Reading consistent with the surrounding text:** dummies keep their (zero) stand-alone value and the remainder is split **equally** among the *non-dummy* features, so the intended normaliser is $|D\setminus U|$:
> $$\psi(i)=\frac{1}{|D\setminus U|}\Big(v(D)-\sum_{j\in U}v(j)\Big),\quad i\notin U.$$
> (Why $1/|U|$ looks like a typo: the authors say "any feature which did not satisfy $\beta_i(x_i-\mathbb E[X_i])=0$ would get the same attribution", an equal split over non-dummies; with the printed $1/|U|$ the attributions would not sum to $v(D)$ unless $|U|=|D\setminus U|$, breaking efficiency. The source does not comment on it.)
>
> **Consequence for linear models:** with the expectation value function, every non-dummy feature receives the same attribution, whatever its coefficient or deviation from the mean. "In this sense the additivity constraint seems necessary for a game-based feature attribution to provide any meaningful quantities about an additive model." Under an interventional interpretation — using attributions "to assess which data changes produce the largest model prediction change" — equal splitting "is not a helpful property".
^def-psi

### Multiplicative models: Shapley behaves like ψ (eq. 20-23, p.6)

"Under an interventional interpretation, Shapley values are as uninformative for non-additive models as this alternative attribution is for linear ones. For instance, any value function which always evaluates to 0 except on the grand coalition will evenly distribute influence among players" (p.6).

> [!theorem] Result: Equal attribution in a zero-centred product model (§3.2, eq. 20-23, p.6)
> Let $f(x)=\prod_{j=1}^d x_j$ (printed as $\Pi_{j=1}^d x_d$), with the $X_j$ **independent and centred at 0**. For any $S$:
> $$v_{f,x}(S)=\mathbb E[f(X_S,X_{\bar S})\mid X_S=x_S] \tag{20}$$
> $$=\mathbb E\Big[\prod_{j=1}^d X_j\,\Big|\,X_S=x_S\Big] \tag{21}$$
> $$=\prod_{j=1}^d\mathbb E[X_j\mid X_S=x_S] \tag{22}$$
> $$=\Big(\prod_{j\in S}x_j\Big)\Big(\prod_{j\in\bar S}\mathbb E[x_j]\Big), \tag{23}$$
> which, since $\mathbb E[X_j]=0$, "is always 0 unless $S=D$". Hence
> $$\phi(i)=\frac1d f(x)\quad\text{for every feature } i,$$
> "regardless of the value $x_i$. Even if, for instance, the magnitude of one of the variables is much higher than the other." The property "will, in fact, hold for all multiplicative functions of independently distributed, zero-centered data."
>
> **Proof sketch.** $\Delta(i,S)=0$ unless $S\cup i=D$, i.e. $S=D\setminus\{i\}$, where $\Delta(i,D\setminus i)=f(x)-0$. In eq. 3 this single term has weight $\frac{(d-1)!\,0!}{d!}=\frac1d$.
>
> **Conclusion:** "Shapley values are touted for their 'model-agnostic' quality, but under the lens of a particular interpretation, this is not the case."
^thm-multiplicative

## Examples

> [!example] Example: Linear model attribution (eq. 19)
> $f(x)=1+2x_1-3x_2$, $\mathbb E X_1=\mathbb E X_2=0$, independent; explain $x=(1,1)$, $f(x)=0$, $\mathbb E f=1$.
> $\phi(1)=2(1-0)=2$, $\phi(2)=-3(1-0)=-3$; sum $-1=f(x)-\mathbb E f(X)$. Under ψ both would receive $-\tfrac12$, hiding that $x_2$ pushes the prediction down and $x_1$ up.
^ex-linear

> [!example] Example: Wildly different inputs, identical credit (eq. 20-23)
> **Two features.** $x=(10,\,0.1)$, zero-mean independent features, $f(x)=1$. $\phi(1)=\phi(2)=0.5$. Feature 1 is 100 times further from its mean, and moving $x_2$ to 0 would kill the prediction just as moving $x_1$ would — the attribution cannot distinguish them.
>
> **Three features, signs.** $x=(2,-1,3)$, $f(x)=-6$: each feature gets $-2$, including the two features with positive values. A reader taking "negative SHAP = this input lowered the score" would be misled about features 1 and 3.
^ex-identical-credit

> [!example] Example: Non-zero means break the symmetry — showing the result's dependence on centring
> $f=x_1x_2$, independent, $\mathbb E X_1=\mathbb E X_2=1$, $x=(3,2)$: $v(\emptyset)=1$, $v(1)=3$, $v(2)=2$, $v(12)=6$, giving $\phi=(3,2)$ (see [[Kumar et al - Conditional vs Interventional Shapley Catch-22]]). The equal split is therefore a consequence of the zero baseline: shifting the reference point changes the allocation of the *same* interaction, which is itself a reminder that Shapley values for interactions encode a baseline choice.
^ex-nonzero-means

> [!example] Example: Multiplicative marketing models (illustration)
> Log-log demand models and many MMM specifications are multiplicative in levels: sales $=\text{base}\times\text{price}^{\beta_p}\times(1+\text{adstock})^{\beta_a}\times\text{season}$. A tree model trained on levels learns these interactions; its SHAP values split each interaction term evenly (or by a baseline-dependent rule) between the interacting drivers, so a channel's attribution partly reflects its *partners'* values in that week. Explaining the log of the KPI (where the model is additive) gives the coefficient-like reading of eq. 19 instead — a reminder to state the scale on which attributions are additive (cf. [[Shape (Saturation) Effects]]).
^ex-multiplicative-marketing

## Connections

- [[Shapley Values and SHAP Value Functions]] — eq. 3 weights used in the proof sketch.
- [[Kumar et al - Shapley Values as Contrastive and Actionable Explanations]] — §4.2's quadratic example is another non-additive case where the sign of $\phi$ misleads.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — accepts the interventional value function; the multiplicative result applies regardless.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — model reliance is a non-additive (non-decomposing) alternative importance notion.
- [[Shape of the Marketing Response Function]] — why marketing response is typically non-additive.

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — algorithmic models are exactly the non-additive ones.
