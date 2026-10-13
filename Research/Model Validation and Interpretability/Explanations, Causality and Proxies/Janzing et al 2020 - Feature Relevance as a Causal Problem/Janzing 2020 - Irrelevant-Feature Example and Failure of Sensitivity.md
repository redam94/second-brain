---
title: Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §3 'Why observational conditionals are flawed', Example 1, eq. (6)-(13), Lemma 1, and the sensitivity-paradox paragraph, pp.4-5"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Janzing 2020 - Conditional vs Marginal Dropping of Features]]"
  - "[[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]]"
used_by:
  - "[[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]]"
  - "[[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]]"
aliases:
  - Janzing Lemma 1
  - Failure of sensitivity for conditional SHAP
  - Janzing Example 1 irrelevant feature
---

# Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity

> [!summary]
> Example 1 takes $f(x_1,x_2)=x_1$ with two perfectly correlated binary inputs. With **conditional** simplified functions (eq. 3), the unused input $X_2$ receives Shapley value $x_1/2-1/4\neq0$. With **marginal** ones (eq. 4) it receives exactly $0$. This proves **Lemma 1**: under observational conditioning, $\phi_i\neq0$ does not imply that $f$ depends on $x_i$. The apparent clash with the earlier statement that Shapley values "satisfy the axiom of sensitivity" (p.5) is resolved by noting that Sensitivity holds for the *induced binary function* $\tilde g$, not for $f$.
^summary

## Overview

This is the paper's main argument *against* eq. (3). It shows that conditional-expectation Shapley values attribute to the **data distribution** as well as to the model: any input correlated with a used input inherits credit. For model validation that is a serious failure. "Does the model use $X_2$?" is exactly the question a reviewer asks, and conditional SHAP can answer "yes" for a feature the code never reads.

## Main Content

> [!example] Example 1: Irrelevant feature (§3, eq. 6-13, pp.4-5)
> **Setup.** $f(x_1,x_2)=x_1$, so $X_2$ is "obviously" irrelevant. Both inputs are binary with
> $$p(x_1,x_2)=\begin{cases}1/2 & x_1=x_2\\ 0 & \text{otherwise.}\end{cases}$$
>
> **(i) Conditional expectations, eq. (3):**
> $$\begin{aligned}
> f_\emptyset(x)&=\mathbb E[f(X_1,X_2)]=1/2 &(6)\\
> f_{\{1\}}(x)&=\mathbb E[f(x_1,X_2)\mid x_1]=x_1 &(7)\\
> f_{\{2\}}(x)&=\mathbb E[f(X_1,x_2)\mid x_2]=x_2 &(8)\\
> f_{\{1,2\}}(x)&=f(x_1,x_2)=x_1 &(9)
> \end{aligned}$$
> Hence $C(2\mid\emptyset)=f_{\{2\}}(x)-f_\emptyset(x)=x_1-1/2$ (on the support $x_2=x_1$) and $C(2\mid\{1\})=f_{\{1,2\}}(x)-f_{\{1\}}(x)=x_1-x_1=0$, so
> $$\phi_2=\tfrac12\big(x_1-\tfrac12+x_1-x_1\big)=\frac{x_1}{2}-\frac14\neq0 .$$
>
> **(ii) Marginal expectations, eq. (4):**
> $$\begin{aligned}
> f_\emptyset(x)&=\mathbb E[f(X_1,X_2)]=1/2 &(10)\\
> f_{\{1\}}(x)&=\mathbb E[f(x_1,X_2)]=x_1 &(11)\\
> f_{\{2\}}(x)&=\mathbb E[f(X_1,x_2)]=1/2 &(12)\\
> f_{\{1,2\}}(x)&=f(x_1,x_2)=x_1 &(13)
> \end{aligned}$$
> giving $C(2\mid\emptyset)=0$ and $C(2\mid\{1\})=0$, hence $\phi_2=0$.
^ex-1-irrelevant-feature

**Completing the example (derived here, not in the paper).** Take $x=(1,1)$, so $f(x)-\mathbb Ef=1/2$.
- *Conditional:* $C(1\mid\emptyset)=x_1-\tfrac12=\tfrac12$ and $C(1\mid\{2\})=f_{\{1,2\}}-f_{\{2\}}=x_1-x_2=0$, so $\phi_1=\tfrac14$ and $\phi_2=\tfrac14$. The two inputs split the credit evenly, as if the model used both.
- *Marginal:* $\phi_1=\tfrac12(\tfrac12+\tfrac12)=\tfrac12$ and $\phi_2=0$. All credit goes to the input the model reads.

At $x=(0,0)$ the conditional values are $\phi_1=\phi_2=-\tfrac14$ and the marginal values are $\phi_1=-\tfrac12$, $\phi_2=0$. Both versions satisfy completeness. They differ only in *who* gets the credit.

> [!theorem] Lemma 1: Failure of Sensitivity (§3, p.5)
> When the relevance $\phi_i$ is defined through "simplified" functions $f_T$ built from **conditional expectations**, $f_T(x_T):=\mathbb E[f(X)\mid X_T=x_T]$, then "$\phi_i\neq0$ does not imply that $f$ depends on $x_i$."
>
> **Proof.** Example 1 is a counterexample: $f$ does not depend on $x_2$, yet $\phi_2=x_1/2-1/4\neq0$ for both $x_1\in\{0,1\}$. ∎
>
> The paper notes the result was "already discussed in Sundararajan and Najmi (2019)".
>
> *Transcription note.* The lemma as printed (p.5) reads $f_T(x_T):=\mathbb E[f(x)\mid X_{\bar T}=x_{\bar T}]$ — conditioning on the **complement** $\bar T$ and with lower-case $x$ inside $f$. This is almost certainly a typo: conditioning on the dropped features would make $f_T$ a function of $x_{\bar T}$, not $x_T$, contradicting the left-hand side, eq. (3), and Example 1. The statement above uses the intended form $\mathbb E[f(X)\mid X_T=x_T]$, i.e. eq. (3) $\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]$.
^thm-lemma-1

> [!theorem] Resolution of the sensitivity paradox (§3, p.5)
> §2.2 said Shapley values satisfy Sensitivity, yet Lemma 1 seems to say the opposite. The resolution is that Shapley values refer to **binary (set) functions**. Read eqs. (6)-(9) as the values of a binary function $\tilde g(z_1,z_2)$ on inputs $(z_1,z_2)\in\{00,10,01,11\}$, where $z_j=1$ means feature $j$ is "included". Then $\tilde g$ **does** depend on the second bit ($\tilde g(01)=x_2\neq\tilde g(00)=1/2$). So the Shapley values do not violate Sensitivity *for $\tilde g$*, but "we certainly care about 'sensitivity for $f$'." The distinction between $\tilde g$ and $f$ is crucial "although in our example $f$ is binary itself". Under the marginal definition, eqs. (10)-(13), the second bit is irrelevant for $\tilde g$ as well, so the paradox does not arise.
^thm-sensitivity-paradox

### General version (editorial)

The mechanism generalises at once. Under eq. (3), for any coalition $T$ containing a correlated proxy $j$ of a used feature $k\notin T$, $f_T(x)$ moves with $x_j$ through $\mathbb E[X_k\mid X_j=x_j]$. So $C(j\mid T)\neq0$ unless $f$ is flat in $x_k$. With perfect correlation, conditional SHAP splits credit **equally** among exact copies, regardless of which copy the model uses. The redundant-player analysis owned by [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] shows the same thing: adding a duplicate feature rewrites everyone's attribution.

## Examples

> [!example] Example: "Model reads search, SHAP credits brand TV" (marketing illustration)
> A per-segment gradient-boosted model of weekly conversions uses paid search clicks but not brand TV GRPs. In the training weeks TV and search move together, because TV drives brand search. Conditional SHAP (e.g. a conditional TreeSHAP or kernel-conditional estimator) will give TV a positive share in high-TV weeks. A reviewer who sees this cannot tell whether the model uses TV.
> Marginal/interventional SHAP gives TV exactly zero — the *model-validation* answer. (Whether TV *causes* conversions through search is a separate, causal question that neither number answers. See [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]].)
^ex-model-reads-search-shap

## Connections

- The permutation-importance analogue: unconditional permutation importance credits only used features but extrapolates, while conditional permutation importance de-credits proxies — [[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- Proxy credit as a fairness concern ("does the model use a protected attribute?") is why the paper cites the fairness literature in §1. See [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]].
- The model-class view: even marginal SHAP describes one fitted $f$. Another equally accurate $f'$ that reads TV instead of search would flip the answer. See [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].

## See Also

- [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] — eqs. (3)-(4)
- [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] — the positive argument for (4)
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
