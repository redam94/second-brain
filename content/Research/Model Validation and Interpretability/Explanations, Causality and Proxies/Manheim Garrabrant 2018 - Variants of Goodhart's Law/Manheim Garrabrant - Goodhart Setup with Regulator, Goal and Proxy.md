---
title: "Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy"
tags:
  - source/ingested
  - topic/model-validation
  - topic/goodhart
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law.pdf]]"
source_location: "arXiv:1803.04585v4, p.1-2: introduction, footnote 1 (history of Goodhart's law), 'Varieties of Goodhart-like Phenomena' (definition and formal setup), footnotes 2-3"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law"
doc_type: paper
depends_on: []
used_by:
  - "[[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]"
  - "[[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]]"
  - "[[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]]"
  - "[[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]]"
  - "[[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]"
aliases:
  - Goodhart Effect Definition
  - Regulator-Proxy Model of Goodhart's Law
  - Goodhart Formal Setup
---

# Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy

> [!summary]
> This is the formal frame behind the whole taxonomy. A **regulator** acts on a system with state space $S$. The regulator has a true **goal** $G:S\to\mathbb{R}$ but can only observe a **proxy (metric)** $M:S\to\mathbb{R}$. The regulator applies selection pressure by allowing only the states with $M(s)\ge c$. A **Goodhart effect** is the collapse, under such optimization, of the statistical relationship between $G$ and $M$. The note also covers the paper's footnotes: Goodhart's 1975 wording, the related laws (Campbell, Lucas, cobra effect), the measure/metric distinction, and other forms of selection pressure.
^summary

## Overview

The paper begins (p.1) by observing that "There are several distinct failure modes for overoptimization of systems on the basis of metrics." These failures happen when a metric that can improve a system "is used to such an extent that further optimization is ineffective or harmful". The authors say the class is poorly understood for two reasons: the terminology is ambiguous, and discussions in that terminology "ignore[s] distinctions between different failure modes". The paper extends Garrabrant's 2017 "Goodhart Taxonomy" post, which noted "(at least) four different mechanisms".

The paper also argues that the stakes grow with optimization power: "The importance of Goodhart effects depends on the amount of power directed towards optimizing the proxy" (p.1). This explains why stronger optimizers are worse affected. A flexible ML search over thousands of model variants applies far more selection pressure to a validation metric than an analyst comparing two specifications does.

## Main Content

### Definition of a Goodhart effect

> [!definition] Goodhart effect (p.1, "Varieties of Goodhart-like Phenomena")
> "a Goodhart effect is when optimization causes a collapse of the statistical relationship between a goal which the optimizer intends and the proxy used for that goal."
>
> In the paper's words, the four categories introduced by Garrabrant are:
> 1. **Regressional**: "selection for an imperfect proxy necessarily also selects for noise".
> 2. **Extremal**: "selection for the metric pushes the state distribution into a region where old relationships no longer hold".
> 3. **Causal**: "an action on the part of the regulator causes the collapse".
> 4. **Adversarial**: "an agent with different goals than the regulator causes the collapse".
>
> "These varied forms often occur together, but defining them individually is useful." (p.2)
^def-goodhart-effect

### Formal setup

> [!definition] Regulator, state space, goal, proxy, permissible region (p.2)
> - A **system** $S$ with possible states $s\in S$.
> - A single actor, the **regulator**, influences the system by choosing a **permissible region** of the state space, $A\subseteq S$.
> - The **Goal** is the regulator's true objective, a mapping $G(s)\to\mathbb{R}$ for $s\in S$.
> - Because regulators have incomplete knowledge, they "cannot act based on $G(s)$". They act only on a **proxy** $M(s)\to\mathbb{R}$ for $s\in S$.
> - **Threshold action.** For simplicity the regulator chooses a threshold $c$, and the permissible states are $s\in A \iff M(s)\ge c$.
>
> "This creates a selection pressure that allows the first two Goodhart-like effects to occur" (p.2), namely regressional and extremal.
^def-setup

In summary:
$$
A_c=\{s\in S: M(s)\ge c\},\qquad \text{Goodhart effect: } \operatorname{Rel}(G,M\mid s\in A_c)\ \text{degrades as } c\uparrow,
$$
where $\operatorname{Rel}$ is any measure of how well $M$ tracks $G$. Examples are correlation, $E[G\mid M]$ relative to $M$, or the sign of $\partial E[G\mid M]/\partial M$. The paper does not fix one. Raising $c$ is "more optimization".

> [!definition] Measure vs metric (footnote 2, p.2)
> "In general, a mapping from $s\to\mathbb{R}$ is a measaure [sic], and if used for decision-making, it is known as a metric."
>
> The presentation is **single-dimensional**. "Use of multiple metrics and restrictions follows similar dynamics", but the single-dimensional case is "ideal" for discussing Goodhart effects.
^def-measure-metric

> [!definition] Forms of selection pressure (footnote 3, p.2)
> Restricting the available states (the threshold rule) is "one form of selection pressure". Others exist but are not needed for the basic dynamics:
> - **Probabilistic selection.** "the states are chosen probabilistically and the distribution can be influenced to prefer certain regions".
> - **Evolutionary selection.** A key special case: "the most likely states are generated based on a set of states selected in a previous generation".
^def-selection-pressure

Selection versus intervention is the main split in the paper. Selection (thresholding, reweighting, evolutionary search) changes *which* states are realised. Intervention (§3) changes the *causal mechanism* generating the states. Regressional and extremal effects need only selection. Causal effects need intervention. Adversarial effects need a second agent.

### Historical note: Goodhart, Campbell, Lucas, cobra (footnote 1, p.1)

- **Goodhart's original law** (Goodhart 1975, ref. [1]), as quoted in the paper: "any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes." The authors note that it "has been interpreted and explained more widely, perhaps to the point where it is ambiguous what the term means."
- **Campbell's law**, which "arguably has scholarly precedence" (Rodamar 2018, ref. [3]), and the **Lucas critique** were "also initially specific", and their interpretation "has also been expanded greatly". Campbell's original statement is quoted in footnote 5 (see [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]).
- The **Cobra Effect** and **perverse incentives** "are often closely related to these failures, and the different effects interact."
- None of these terms "were laid out formally". The proposed categories therefore "do not match what was originally discussed". A "separate forthcoming paper" was to relate the original formulations to the categories.

The Lucas critique is the macroeconomic version of the causal case: reduced-form relationships estimated under one policy regime change when policy changes. The paper does not develop this link.

### Target domains (p.1, Conclusion p.9-10)

The paper names economic regulation, public policy, machine learning, and AI alignment (citing Bostrom 2014, ref. [4]). In ML, the conclusion lists "extremal Goodhart effects due to using limited data and choosing overly parsimonious models, errors that occur due to myopic consideration of goals, and mistakes that occur when ignoring causality in a system."

## Examples

> [!example] Instantiating the setup in marketing analytics (vault illustration, not from the paper)
> - **States $s$**: candidate fitted models of a weekly sales series. Each $s$ is a specification: adstock form, saturation form, priors, control set.
> - **Goal $G(s)$**: how accurately model $s$ recovers true incremental channel effects. This is unobservable in real data.
> - **Proxy $M(s)$**: an observable score. Examples are in-sample $R^2$, MAPE on a hold-out window, "ROI plausibility", or total SHAP mass on media features.
> - **Regulator**: the analyst or an automated search, keeping models with $M(s)\ge c$ or taking $\arg\max_s M(s)$.
>
> The argmax is the limit $c\to\max M$, which is maximal selection pressure. So a broad search with a final argmax step is the regime where Goodhart effects are strongest. Each later note shows which mechanism breaks $G$-$M$ alignment.
^ex-instantiating-the-setup-in

## Connections

- The regulator/proxy framing matches the **target vs estimand** distinction in validation: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] puts the *estimand* first so that a convenient performance measure does not replace it.
- A threshold on a metric is a selection mechanism, so its effects are those of selection on an outcome-correlated variable: [[The Selection Problem]].
- Multiple metrics (footnote 2) are the multivariate case covered in [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].

## See Also
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — the full taxonomy and source map
- [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] — first consequence of threshold selection
- [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] — second consequence of threshold selection
- [[Researcher Degrees of Freedom]] — analyst choices as the regulator's permissible region
