---
title: Janzing 2020 - Symmetry Axiom Objection and Reply
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - type/example
  - type/theorem
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §3 'The problem with the symmetry axiom', Fig. 3 (Table 3 of Sundararajan & Najmi 2019), binary function g-tilde, p.6"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]]"
  - "[[Janzing 2020 - Conditional vs Marginal Dropping of Features]]"
used_by:
  - "[[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]]"
aliases:
  - Sundararajan Najmi Example 4.9 (Janzing reply)
  - Symmetry objection to marginal Shapley values
---

# Janzing 2020 - Symmetry Axiom Objection and Reply

> [!summary]
> Sundararajan & Najmi (2019, Ex. 4.9) object that expectation-based Shapley values break the **symmetry** axiom. For $f=X_1+X_2$ with independent $X_1,X_2\in\{1,2\}$, $P(X_1=2)=p$ and $P(X_2=2)=q$, the input $(2,2)$ gives $x_1$ credit $1-p$ and $x_2$ credit $1-q$. Janzing et al. reply that (i) this is sensible, since each input's credit is its distance from its own mean, and (ii) the symmetry axiom concerns the induced binary function $\tilde g$, which really is asymmetric here, so the axiom is not violated.
^summary

## Overview

This note covers the last part of §3 (p.6), "The problem with the symmetry axiom". It answers the second axiom-level criticism of attribution relative to $\mathbb E f(X)$. The first was the failure of sensitivity under conditioning, which counts *against* eq. (3) ([[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]). This one is aimed at expectation-based Shapley values *in general*, so it would also hit the marginal definition the paper defends. The symmetry property being debated is property 5 of [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients#^def-five-properties|§2.1]].

## Main Content

> [!example] Fig. 3: Table 3 of Sundararajan & Najmi (2019), reproduced in Janzing et al. (p.6)
> | Probability | $X_1$ | $X_2$ | $f=X_1+X_2$ |
> |---|---|---|---|
> | $(1-p)(1-q)$ | 1 | 1 | 2 |
> | $(1-p)\,q$ | 1 | 2 | 3 |
> | $(1-q)\,p$ | 2 | 1 | 3 |
> | $p\,q$ | 2 | 2 | 4 |
>
> $X_1$ and $X_2$ are independent, with $P(X_1=2)=p$ and $P(X_2=2)=q$.
^fig-3-symmetry-table

> [!theorem] The objection (Sundararajan & Najmi 2019, Ex. 4.9, as rephrased on p.6)
> At $(x_1,x_2)=(2,2)$, $x_1$ gets attribution $1-p$ and $x_2$ gets $1-q$. If $p\neq q$, the two inputs get different credit even though $f$ is symmetric, which the objection calls a violation of symmetry. Because $X_1\perp X_2$, conditional and marginal expectations coincide here, so the issue arises "regardless of whether one defines the simplified function $f_T$ with respect to marginal or conditional expectations."
^thm-symmetry-objection

**Verification (derived here).** $\mathbb E X_1=1+p$ and $\mathbb E X_2=1+q$. Under the marginal definition, $f_{\{1\}}(x)=x_1+\mathbb E X_2$ and $f_\emptyset=\mathbb EX_1+\mathbb EX_2$, so $C(1\mid\emptyset)=x_1-\mathbb EX_1$ and $C(1\mid\{2\})=x_1-\mathbb EX_1$. Hence $\phi_1=x_1-\mathbb E X_1=2-(1+p)=1-p$, and likewise $\phi_2=1-q$. In general, for linear $f$ the attribution is $\alpha_j(x_j-\mathbb EX_j)$ (see [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]]).

> [!theorem] The reply (Janzing et al., p.6)
> 1. **It makes intuitive sense.** "the value $x_j$ that is farther from its mean contributes more to the fact that $f(x_1,x_2)$ deviates from its mean." If $x_1=\mathbb E[X_1]$ exactly, "we would certainly say that $x_1$ does not contribute to the deviation from the mean at all." The authors therefore do not follow Sundararajan & Najmi in treating this as a problem.
> 2. **The axiom holds where it applies.** Symmetry holds for Shapley values *of the binary function* defined by including or excluding features. Define
> $$
> \tilde g(z_1,z_2):=\mathbb E\big[f(x_T,X_{\bar T})\big],\qquad T=\{j:z_j=1\}.
> $$
> This $\tilde g$ is **not symmetric** in $z_1,z_2$, since
> $$
> \tilde g(1,0)=x_1+\mathbb E[X_2]\;\neq\;\tilde g(0,1)=x_2+\mathbb E[X_1]
> $$
> whenever $p\neq q$ (here $3+q$ vs $3+p$). Unequal credit for an asymmetric $\tilde g$ is what symmetry *requires*.
^thm-symmetry-reply

### The full induced game for $x=(2,2)$ (derived here)

The paper gives only $\tilde g(1,0)$ and $\tilde g(0,1)$. With $\mathbb EX_1=1+p$ and $\mathbb EX_2=1+q$, all four values of $\tilde g$, and all four marginal contributions, are:

| $(z_1,z_2)$ | $T$ | $\tilde g(z_1,z_2)=\mathbb E[f(x_T,X_{\bar T})]$ | Centred $g(T)=\tilde g-\tilde g(0,0)$ |
|---|---|---|---|
| $(0,0)$ | $\emptyset$ | $\mathbb EX_1+\mathbb EX_2=2+p+q$ | $0$ |
| $(1,0)$ | $\{1\}$ | $x_1+\mathbb EX_2=3+q$ | $1-p$ |
| $(0,1)$ | $\{2\}$ | $\mathbb EX_1+x_2=3+p$ | $1-q$ |
| $(1,1)$ | $\{1,2\}$ | $x_1+x_2=4$ | $2-p-q$ |

| Contribution | Value |
|---|---|
| $C(1\mid\emptyset)=\tilde g(1,0)-\tilde g(0,0)$ | $1-p$ |
| $C(1\mid\{2\})=\tilde g(1,1)-\tilde g(0,1)$ | $1-p$ |
| $C(2\mid\emptyset)=\tilde g(0,1)-\tilde g(0,0)$ | $1-q$ |
| $C(2\mid\{1\})=\tilde g(1,1)-\tilde g(1,0)$ | $1-q$ |

So $\phi_1=\tfrac12(1-p)+\tfrac12(1-p)=1-p$ and $\phi_2=1-q$ by eq. (2), and completeness holds: $\phi_1+\phi_2=2-p-q=f(x)-\mathbb Ef(X)$. Each player's contribution does not depend on the coalition it joins, so the game is **additive**. It is symmetric in the two players exactly when $1-p=1-q$, i.e. $p=q$. (The paper's $\tilde g$ is not centred, so $\tilde g(0,0)\ne0$. Shapley values are unchanged by subtracting the constant $\tilde g(0,0)$, which turns $\tilde g$ into the set function $g(T)=f_T(x)-f_\emptyset(x)$ of §2.2 with $g(\emptyset)=0$.)

> [!theorem] Generalisation: additive models with marginal dropping (derived here, not in the paper)
> Let $f(x)=\sum_j h_j(x_j)$ be additive, with $f_T$ defined by marginal expectations (eq. 4). Then
> $$
> \tilde g(T)=\sum_{j\in T}h_j(x_j)+\sum_{j\notin T}\mathbb E\,h_j(X_j),\qquad C(j\mid T)=h_j(x_j)-\mathbb E\,h_j(X_j)\ \text{for every }T,
> $$
> so $\phi_j=h_j(x_j)-\mathbb E\,h_j(X_j)$. In the linear case, $h_j(x_j)=\alpha_jx_j$, this gives $\phi_j=\alpha_j(x_j-\mathbb EX_j)$, the ground truth used in §4.2. The induced game is symmetric in $i,j$ if and only if $h_i(x_i)-\mathbb Eh_i(X_i)=h_j(x_j)-\mathbb Eh_j(X_j)$. A symmetric $f$ ($h_i=h_j$, $x_i=x_j$) therefore gets equal credit **only if** $\mathbb Eh_i(X_i)=\mathbb Eh_j(X_j)$, i.e. only if the two inputs share the relevant mean. With independent features, conditional dropping (eq. 3) gives the same game, which is why the paper says the objection applies "regardless" of which definition is used. With dependent features the conditional game is generally **not** additive, even for additive $f$, because $\mathbb E[h_k(X_k)\mid X_T=x_T]$ then depends on $x_T$. That is the mechanism behind [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity|Lemma 1]].
^thm-additive-marginal-game

### Comment

This is the same move as in the [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity#^thm-sensitivity-paradox|sensitivity paradox]]: an axiom stated for $f$ is checked on the induced game $\tilde g$. The paper's position is consistent. Sensitivity is demanded **for $f$**, which holds only under marginal values, while symmetry is accepted **for $\tilde g$**. A critic could say the paper picks whichever level of description suits each axiom. The paper's own defence (§5) is that axioms "stated in a too vague manner" leave "some room for interpretation".

## Examples

> [!example] Example: Two symmetric channels with different typical spend (marketing illustration)
> A response model of the form $\text{sales}=\alpha(\text{Display}+\text{Social})$ treats the two channels identically. In a week where both channels spend 2 units, display's typical spend is 1.9 and social's is 1.1. Marginal SHAP gives display $\alpha(0.1)$ and social $\alpha(0.9)$. Social gets more credit for this week's *deviation from the average week* because its spend was unusual. That is a statement about **deviations**, not about per-unit effectiveness, which is equal by construction. Reading SHAP shares as channel ROI would be wrong for this reason alone.
^ex-two-symmetric-channels-with

## Connections

- The same "which level does the axiom apply to?" move resolves the sensitivity paradox: [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity#^thm-sensitivity-paradox]].
- The additive-game result is the closed-form ground truth used for the linear experiments: [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^thm-linear-ground-truth]].
- The paper's closing remark that vaguely stated axioms leave "some room for interpretation": [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]].
- Credit for deviations from a mean is not channel effectiveness. For marginal ROI see [[ROAS, mROAS, and Optimal Media Mix]].

## See Also

- [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients#^def-five-properties|Symmetry-preserving axiom]]
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — axiom-level critique of Shapley explanations
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
