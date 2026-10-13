---
title: Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §1 Motivation pp.1-2; §2 Prior Work p.2; §2.1 eq. (1), five properties, footnotes 1-2, Theorem 1 pp.2-3; §2.2 eq. (2) and baseline set function p.3"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
used_by:
  - "[[Janzing 2020 - Conditional vs Marginal Dropping of Features]]"
  - "[[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]]"
  - "[[Janzing 2020 - Symmetry Axiom Objection and Reply]]"
aliases:
  - Janzing attribution axioms
  - Integrated gradients axioms (Janzing 2020 restatement)
  - Path methods and Theorem 1 (Friedman 2004)
---

# Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients

> [!summary]
> Sections 1-2 of Janzing, Minorics & Blöbaum (2020) set up the attribution problem — how much each input $x_j$ is "responsible" for an output $f(x)$ — and recall the axiomatic results for the **single-baseline** case: five properties (Completeness, Sensitivity, Implementation Invariance, Linearity, Symmetry-Preserving), Theorem 1 (any method satisfying the first four is a convex combination of path methods, and integrated gradients is the only symmetry-preserving path method), and the Shapley value of a set function, eq. (2). These axioms are the yardstick later used to judge the conditional and marginal versions of SHAP.
^summary

## Overview

The motivation (§1, p.1) is that deep models are fragile — image classifiers "fail spectacularly" under adversarial changes that look minor to humans (citing Goodfellow et al. 2015, Sharif et al. 2016, Kurakin et al. 2018, Eykholt et al. 2018, Brown et al. 2018). Understanding these failures "is challenging since it is hard to analyze which features were decisive for the classification in a particular case" (§1, p.1). That sentence is the bridge from robustness to the paper's topic: feature attribution is the tool for finding out which inputs were decisive for one particular prediction. The authors add that robustness is only one motivation — fairness requirements (Dwork et al. 2012; Kilbertus et al. 2017; Barocas et al. 2018) and legal or ethical review also demand that we understand why an algorithm decided what it did.

The formal problem (§1, p.1): the input/output behaviour is a function $f:\mathcal X_1\times\dots\times\mathcal X_n\to\mathbb R$, where $\mathcal X_j$ is the range (discrete or continuous) of input $X_j$, $X:=(X_1,\dots,X_n)$, and the output $Y$ is real-valued — assumed, in the paper's words, "for reasons that will become clear later" (§1, p.1). The reason is that the paper's main construction averages $f$ over dropped features, $\mathbb E[f(X)]$ and $\mathbb E[f(x_T,X_{\bar T})]$, which needs a real-valued output for expectations to exist. For one input $x=(x_1,\dots,x_n)$ we want to say how much each $x_j$ is responsible for $f(x)$. The authors stress that this question only makes sense once we say **what the input should have been instead**. There are two ways to answer that:

1. **A baseline element** $x^0$: explain $f(x)-f(x^0)$ by imagining that only some baseline values $x^0_j$ are replaced by $x_j$. The paper notes that this baseline case "has been studied in the literature mostly for the case of real-valued inputs and differentiable $f$" (§1, p.1), which is why integrated gradients (a gradient method) is the canonical answer there. This is the subject of §2 (and of this note).
2. **The expectation** $\mathbb E[f(X)]$ over some distribution $P_X$: explain $f(x)-\mathbb E[f(X)]$ by keeping some values and *averaging the rest*. This is the paper's main subject, and the question it asks is **which distribution to average over** — see [[Janzing 2020 - Conditional vs Marginal Dropping of Features]].

**Prior work named (§2, p.2):** DeepLIFT (Shrikumar et al. 2016), Layer-wise Relevance Propagation (Binder et al. 2016), LIME (Ribeiro, Singh & Guestrin 2016 — the paper's in-text citation prints this as "Ribeiro and Singh (2016)" (sic), and its reference-list entry is also garbled; corrected here to the standard three-author citation), gradient-based methods (Chattopadhyay et al. 2019), and Molnar (2019) for a survey of model-agnostic methods. The authors note that Datta et al. (2016, Quantitative Input Influence) already contain "all the ideas of this work at least implicitly", but appeared before Lundberg & Lee (2017) and so could not address SHAP specifically (§1, p.2).

**The paper plan in §1 (p.2).** §1 closes with a roadmap that makes three further claims:
- **Uniqueness under the axioms.** §2 "summarizes results from the literature regarding axioms for feature attribution for the case where there is a unique baseline reference input. Here integrated gradients and Shapley values (as the generalization to discrete input) are the unique attribution functions for the stated set of axioms" (§1, p.2). This is the informal headline. The precise statement in §2 is narrower: Theorem 1 below says the four axioms force a *convex combination of path methods*, and integrated gradients is unique only among single path methods that are symmetry-preserving. Shapley values are then presented as the discrete (set-function) counterpart (§2.2).
- **Support from Datta et al.** "Our view on marginalization over unused features is supported by Datta et al. (2016) for similar reasons" (§1, p.2). In other words, the marginal (unconditional) averaging over dropped features that the paper defends was already the choice in Quantitative Input Influence, on intervention-based grounds.
- **Justified overlap.** The authors think "the big overlap of the present paper with existing literature is justified by aiming at this clarification only, while keeping this clarification as self-consistent as possible" (§1, p.2). The roadmap then lists §3 (attribution when averaging over unused features, plus the criticism) and §4 (experiments).

## Main Content

### §2.1 Integrated gradients and the five properties

> [!definition] Definition: Integrated gradients (§2.1, eq. 1, p.2; Sundararajan et al. 2017)
> For a baseline $x^0$ and $f$ differentiable almost everywhere (footnote 1: Sundararajan et al. 2017, Prop. 1), the attribution of $x_i$ to the difference
> $$f(x)-f(x^0)\tag{1}$$
> is
> $$\mathrm{IntegratedGrads}_i(x;f):=(x_i-x^0_i)\int_{\alpha=0}^{1}\frac{\partial f\big(x^0+\alpha(x-x^0)\big)}{\partial x_i}\,d\alpha .$$
> Generalising the straight line from $x^0$ to $x$ to an arbitrary path $\gamma$ gives a **path method**.
^def-integrated-gradients

> [!definition] Definition: Five desirable properties of an attribution $\mathrm{atr}_i(x;f)$ (§2.1, p.2)
> 1. **Completeness:** $\sum_i \mathrm{atr}_i(x;f)=f(x)-f(x^0)$.
> 2. **Sensitivity:** if $f$ does not depend on $x_i$, then $\mathrm{atr}_i(x;f)=0$.
> 3. **Implementation invariance:** if $f$ and $f'$ agree on all inputs, then $\mathrm{atr}_i(x;f)=\mathrm{atr}_i(x;f')$ for all $i$. (Footnote 2: this axiom is pointless if it concerns *functions* rather than *algorithms*; it is listed only for consistency with the literature.)
> 4. **Linearity:** $\mathrm{atr}_i(x;af_1+bf_2)=a\,\mathrm{atr}_i(x;f_1)+b\,\mathrm{atr}_i(x;f_2)$ for $a,b\in\mathbb R$.
> 5. **Symmetry-preserving:** if $f$ is symmetric in components $i$ and $j$, and $x_i=x_j$ and $x^0_i=x^0_j$, then $\mathrm{atr}_i(x;f)=\mathrm{atr}_j(x;f)$.
>
> Unlike LIME, DeepLIFT and LRP, integrated gradients satisfies all five (Sundararajan et al. 2017; Aas et al. 2019).
^def-five-properties

> [!theorem] Theorem 1 (§2.1, p.3; Friedman 2004, Thm. 1; Sundararajan et al. 2017, Thm. 1)
> If an attribution method satisfies **Completeness, Sensitivity, Implementation Invariance and Linearity**, then it is a **convex combination of path methods**. Furthermore, **integrated gradients is the only path method that is symmetry-preserving**.
>
> *Remark (p.3):* convex combinations of path methods can also be symmetry-preserving without being integrated gradients — uniqueness is among single path methods only.
^thm-1-path-methods

The paper cites Theorem 1 without proof. *Editorial gloss (not in the paper):* the idea behind it is that Friedman's cost-sharing result says that additive, monotone-consistent sharing rules on continuous "cost functions" are mixtures of path rules. Completeness pins down the endpoints, linearity gives the mixture, and sensitivity rules out credit to idle coordinates. Among single paths, only the straight diagonal treats two symmetric coordinates identically.

### §2.2 Shapley values for a set function

> [!definition] Definition: Shapley value of a set function (§2.2, eq. 2, p.3)
> Let $U:=\{1,\dots,n\}$ and $g:2^U\to\mathbb R$ with $g(U)\neq0$ and $g(\emptyset)=0$. The contribution of $j$ given $T\subseteq U$ is
> $$C(j\mid T):=g(T\cup\{j\})-g(T),$$
> which "can be negative and also exceed $g(U)$" (p.3). The Shapley value (Shapley 1953) of $i$ is
> $$\phi_i:=\sum_{T\subseteq U\setminus\{i\}}\frac{1}{n\binom{n-1}{|T|}}\,C(i\mid T),\tag{2}$$
> and it satisfies $g(U)=\sum_{i=1}^n\phi_i$. It is the average contribution of $i$ to $g(U)$ over orders of inclusion.
^def-shapley-set-function

For the general Shapley axioms and the SHAP value-function vocabulary, the vault's owner note is in [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]. This note keeps the paper's own notation, $C(j\mid T)$ and $\phi_i$, which the rest of the note set uses.

> [!definition] Definition: Baseline set function and "simplified" function (§2.2, p.3)
> Shapley values at first only attribute **binary** inputs, by identifying subsets $T$ with binary words in $\{0,1\}^n$. To attribute $f(x)-f(x^0)$, define
> $$g(T):=f_T(x_T)-f(x^0),\qquad T\subseteq\{1,\dots,n\},$$
> where $f_T$ is the **"simplified" function** with reduced input $x_T$, obtained from $f$ by taking all remaining features from the baseline $x^0$. In particular $f_\emptyset(x_\emptyset)=f(x^0)$.
^def-baseline-set-function

> [!theorem] Claim: Shapley values satisfy the axioms — for the binary function (§2.2, p.3)
> With respect to the binary function defined by $g$, Shapley values satisfy Completeness, Sensitivity, Implementation Invariance and Linearity (Aas et al. 2019). By Theorem 1 they are therefore a convex combination of path methods. They are also symmetry-preserving, but they **do not coincide with integrated gradients**.
^thm-shapley-axioms-binary

The phrase "with respect to the binary function" matters later. [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity|Lemma 1]] and the [[Janzing 2020 - Symmetry Axiom Objection and Reply|symmetry discussion]] both turn on the difference between the axioms holding for the induced binary function $\tilde g$ and holding for the model $f$ itself.

**Sundararajan & Najmi (2019)** ("The many Shapley values for model explanation") study Shapley attribution mostly relative to an auxiliary baseline, but also mention attribution relative to an expectation. They had already noted that Shapley values built on conditional distributions can give non-zero credit to unimportant features, though "didn't consider the problem from a causal perspective" (p.3).

## Examples

> [!example] Example: Integrated gradients for a product (constructed illustration)
> Let $f(x_1,x_2)=x_1x_2$, $x^0=(0,0)$ and $x=(a,b)$. Along the straight path, $\partial f/\partial x_1=\alpha b$, so $\mathrm{IG}_1=a\int_0^1\alpha b\,d\alpha=ab/2$, and likewise $\mathrm{IG}_2=ab/2$. Completeness holds: $ab/2+ab/2=f(x)-f(x^0)$.
> The baseline Shapley value gives the same split here: $g(\{1\})=f(a,0)-0=0$, $g(\{2\})=0$, $g(\{1,2\})=ab$, so $\phi_1=\tfrac12[g(\{1\})-0]+\tfrac12[g(\{1,2\})-g(\{2\})]=ab/2$. In general the two methods differ (p.3).
^ex-integrated-gradients-for-a

## Connections

- The paper's question is a **choice of baseline distribution**. The baseline axioms are undisputed. The fight is over what replaces $x^0$ once the baseline becomes $\mathbb E f(X)$. See [[Janzing 2020 - Conditional vs Marginal Dropping of Features]].
- A forking-paths view: the value function is an analyst choice that can flip attributions, much like the choices described in [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]].
- In marketing analytics, "baseline" carries a second meaning, the *base sales* of an MMM decomposition. Contribution charts from an MMM are a baseline attribution of exactly this kind: sales at actual spend minus sales at a zero-spend (or reference-spend) baseline. See [[Bayesian Media Mix Modeling - Overview]].

## See Also

- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — paper map
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — owner of Shapley/SHAP definitions
- [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]] — where the Sensitivity axiom breaks for $f$
- [[Janzing 2020 - Symmetry Axiom Objection and Reply]] — where the Symmetry axiom is debated
