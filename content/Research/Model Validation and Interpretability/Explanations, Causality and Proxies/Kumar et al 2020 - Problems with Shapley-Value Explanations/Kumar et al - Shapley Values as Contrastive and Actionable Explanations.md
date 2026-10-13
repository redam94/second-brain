---
title: Kumar et al - Shapley Values as Contrastive and Actionable Explanations
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Kumar et al 2020 - Problems with Shapley-Value-Based Explanations.pdf]]"
source_location: "Kumar et al. (2020) §4 intro, Selbst & Barocas framework (p.6); §4.1 Explanations as contrastive statements (p.7); §4.1.1 Shapley value sets as a single contrastive statement (p.7); §4.1.2 Marginal contributions as contrastive statements, beetle example (p.7-8); §4.2 Using Shapley-value-based methods to enable action, quadratic example (p.8)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations"
doc_type: paper
depends_on:
  - "[[Shapley Values and SHAP Value Functions]]"
  - "[[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]"
used_by:
  - "[[Kumar et al - Shapley Values in Normative Model Evaluation]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
aliases:
  - Shapley values as contrastive explanations
  - Shapley values do not enable action
  - Kumar quadratic Shapley example
  - Selbst and Barocas three motivations for explanation
---

# Kumar et al - Shapley Values as Contrastive and Actionable Explanations

> [!summary]
> §4.1-4.2 of Kumar et al. (2020) start the "human-centric" critique, using Selbst & Barocas's three motivations for explanation (dignity/autonomy, enabling action, normative evaluation). **Contrastive** (§4.1): people explain "Why P rather than Q?" (Miller 2019). A local Shapley set answers "Why $f(x)$ rather than $\mathbb E f(X)$?" — a foil that may correspond to no possible case — and each marginal contribution $\Delta(i,S)$ is a contrast, but the Shapley value *averages all of them*, whereas people select (preferring **necessary** causes; Lipton's beetle). **Action** (§4.2): unlike counterfactual explanations and actionable recourse, Shapley values do not say what to change; in $f(x)=2-(x-1)^2$ a person at the optimum gets $\phi=2>0$ and may wrongly infer that raising $x$ helps. Normative evaluation (§4.3) is in [[Kumar et al - Shapley Values in Normative Model Evaluation]].
^summary

## Overview

§3 used "functionally-grounded evaluation"; §4 is closer to Doshi-Velez & Kim's (2017) "human-grounded metrics" (p.6). The organising framework is Selbst & Barocas (2018), quoted (p.6):

> "The first is a fundamental question of autonomy, dignity, and personhood. The second is a more instrumental value: educating the subjects of automated decisions about how to achieve different results. The third is a more normative question—the idea that explaining the model will allow people to debate whether the model's rules are justifiable."

(The em-dash after "question" and the apostrophe in "model's" are missing from the printed PDF — it reads "questionthe" and "models rules" — and are restored here.)

The authors "argue that the theoretical properties of the Shapley value are not naturally well-suited to any one of these objectives" and note "many of these critiques also apply to other explanatory methods" (p.6-7).

| Selbst & Barocas motivation | Section | Kumar et al. verdict |
|---|---|---|
| Autonomy, dignity, personhood (explanation as procedural justice; GDPR "right to explanation") | §4.1 | Human explanations are contrastive and selective; Shapley sets average all contrasts against an often meaningless foil |
| Instrumental: how to achieve a different result | §4.2 | Shapley values carry no action guidance; a large/positive value need not mean changing the feature helps |
| Normative: are the model's rules justifiable? | §4.3 | No clear mental model, confirmation bias, no direct answers to evaluation questions — [[Kumar et al - Shapley Values in Normative Model Evaluation]] |

## Main Content

### 4.1 Explanations as contrastive statements (p.7)

The GDPR's "right to explanation" reflects a sense that deciding about a person without explanation is unethical — which Selbst & Barocas say is more about "procedural justice" than "wanting an explanation for the purpose of vindicating certain specific empowerment or accountability goals." How to evaluate an explanation provided "merely because it should"? Doshi-Velez & Kim suggest user tests; Kumar et al. instead draw on social-science theories of how humans generate and select explanations, surveyed by Miller (2019):

> [!definition] Definition: Contrastive explanation (Miller 2019, after Lipton 1990; quoted §4.1, p.7)
> "People do not explain the causes for an event per se, but explain the cause of an event relative to some other event that did not occur; that is, an explanation is always of the form 'Why P rather than Q?', in which P is the target event and Q is a counterfactual contrast case that did not occur."
>
> Q is the **foil**. Similar arguments: Merrick & Taly (2019), citing Kahneman & Miller's (1986) norm theory.
^def-contrastive

#### 4.1.1 The Shapley set as a single contrastive statement (p.7)

People ask for explanations when P is "unexpected" relative to Q. A Shapley explanation is a contrast with outcome $v(D)$ and implicit foil $v(\emptyset)$; locally,
$$
f(x)=\mathbb E(f(x))+\phi_1+\phi_2+\dots+\phi_d,
$$
so the Shapley values are "a set of answers to the question, 'Why $f(x)$ rather than $\mathbb E(f(x))$?'"

> [!theorem] Claim: The expected-value foil may be unrealisable (§4.1.1, p.7)
> "While the expected value of a function seems like a natural foil to an 'unexpected' $f(x)$, due to the properties of the expectation, there may not be a scenario in the data space of $X$ with the outcome $\mathbb E(f(x))$. Thus, the expected value may not be 'expected' by anyone with a reasonable understanding of the situation at hand at all."
>
> With interventional distributions, Merrick & Taly's framework yields a different contrast — "Why $f(x)$ rather than $f(r)$?", with $r$ drawn from a **reference distribution** — but this requires specifying that distribution and inherits the [[Kumar et al - Conditional vs Interventional Shapley Catch-22#^thm-ood-misleading|out-of-distribution issues]] of §3.1.2.
^thm-foil

#### 4.1.2 Marginal contributions as contrastive statements (p.7-8)

Each $\Delta(i,S)$ is itself a contrast: "Why choose a model with $S$ and $i$ rather than a model with just $S$? Because it improves $v$ by $\Delta(i,S)$ amount." This is the quantity used in **stepwise selection**, where features that increase accuracy are successively added. But the Shapley value considers *all* permutations, regardless of the order features were actually added: "It is not clear that taking an average of quantities representing 'all possible contrastive explanations' for a certain set of foils is a sensible way to summarize information." Miller argues humans are **selective** — some contrasts matter more than others — e.g. preferring necessary to sufficient causes.

> [!example] Example: Lipton's beetle — necessary vs sufficient causes (§4.1.2, p.7-8, quoting Miller 2019)
> **Setup.** Two DNA mutations $M_1,M_2$ in a beetle species make wings grow longer than normal *when kept in certain temperatures* $T$; either mutation is sufficient. Contrast with a beetle whose wings do not change.
>
> **Human explanation.** Temperature is preferred to either mutation "because neither M1 nor M2 are individually necessary for the observed event; merely that either M1 or M2. In contrast, the temperature is necessary, and is preferred, even if we know that the cause was M1."
>
> **Shapley reading.** For a positive ("long wings") classification, all "yes" cases share $T$, so a contrast highlighting $T$ is more relevant than ones based on $M_1$ or $M_2$. "This is fundamentally at odds with the idea that the 'yes' prediction should be split additively between different coalitions of M1, M2 and T, a property induced by the notion of the Shapley value."
>
> **Worked numbers (illustration, not in source).** Let $v(S)=1$ if $T\in S$ and ($M_1\in S$ or $M_2\in S$), else 0 (a beetle with $T,M_1,M_2$ all present). Of the 6 orderings, $T$ is pivotal whenever it comes after at least one mutation (4 orderings) → $\phi(T)=\tfrac46=\tfrac23$; $M_1$ is pivotal only in the ordering $(T,M_1,M_2)$ → $\phi(M_1)=\phi(M_2)=\tfrac16$. Shapley does rank $T$ highest, but still hands one third of a "yes" to mutations neither of which is necessary — an additive split of a conjunctive/disjunctive cause.
^ex-beetle

### 4.2 Using Shapley-value-based methods to enable action (p.8)

One motivation for explanation is helping individuals achieve a desirable outcome: query a contrast between person $p$'s outcome $f(p)$ and a person $q$ with user-chosen desirable outcome $f(q)=Q$, so $p$ can move toward $q$. Formalised as the **counterfactual explanation** problem (Wachter et al. 2017; hidden assumptions analysed by Barocas et al. 2020) and, restricted to mutable characteristics, **actionable recourse** (Ustun et al. 2019; analysed by Venkatasubramanian & Alfano 2020).

> [!theorem] Claim: Shapley values do not enable action (§4.2, p.8)
> "Unlike these methods, Shapley value based frameworks do not explicitly attempt to provide guidance how a user might alter one's behavior in a desirable way. Further, observing that a certain feature carries a large influence over the model does not necessarily imply that changing that feature (even significantly) will change the outcome favorably."
>
> Even if $v(\emptyset)$ is set to a desirable $f(q)$ (Merrick & Taly), "the Shapley values themselves do not correspond to specific actions: the interventional effect of changing one input from $x$ to that from $q$ is just one of the marginal contributions that are averaged together to form the Shapley value of that input" (§4.2, p.8, referring back to §4.1.2).
^thm-no-action

> [!example] Example: Positive attribution at the optimum (§4.2, p.8)
> **Setup.** Univariate $f(x)=2-(x-1)^2$, $X\sim N(0,1)$.
>
> **Computation.** $\mathbb E f(X)=2-\mathbb E[(X-1)^2]=2-(\operatorname{Var}X+(\mathbb EX-1)^2)=2-(1+1)=0$. A person with $x=1$ gets $f(1)=2$, so with one player $\phi(x)=f(1)-\mathbb E f(X)=2$ (the paper states $\mathbb E(X)=0$ and $\phi=2$).
>
> **Misreading.** Hoping for a higher score, the person sees a positive attribution and knows 1 is "a bit high" relative to the mean 0, and may conclude that increasing $x$ further increases the score — "but it will not": $x=1$ is the maximum.
>
> **Root cause.** The foil $\mathbb E(f(x))$ "is not desirable", and $\phi$ measures a level difference from the foil, not a local slope.
^ex-quadratic

## Examples

> [!example] Example: Saturated channel with a large positive SHAP value (illustration)
> A weekly KPI model learns a Hill-type response to a channel's adstocked spend (see [[Shape (Saturation) Effects]]). In a high-spend week the channel's SHAP value is large and positive because spend is far above its average — yet the marginal return at that spend may be near zero. The SHAP value answers "why this week's prediction rather than the average week's", not "what does one more dollar buy". Budget questions need the response-curve derivative (marginal ROAS) or an experiment — see [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] for a case where the attribution-implied return evaporated under experimentation.
^ex-saturated-channel

> [!example] Example: A foil no one would expect (illustration of §4.1.1)
> For a binary churn classifier with hard outputs $f\in\{0,1\}$ and churn rate 30%, the foil $\mathbb E f(X)=0.3$ is a "customer who 30%-churns" — no such customer exists. The Shapley set for a churner explains $1-0.3=0.7$ units of a quantity with no real-world counterpart.
^ex-unexpected-foil

## Connections

- [[Shapley Values and SHAP Value Functions]] — efficiency identity $f(x)=\mathbb E f+\sum\phi_i$ used in §4.1.1.
- [[Counterfactual Inference]] and [[Potential Outcomes Framework]] — the "what if I change $x$" quantities that recourse needs and Shapley does not supply.
- [[Dillon et al - SHAP and Causal Insights - Overview]] — the practitioner version: SHAP of a predictive model is not a causal effect.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — causal framing of feature relevance.
- [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] — the quadratic and beetle examples are non-additive cases, like the multiplicative result.

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]
- [[Kumar et al - Shapley Values in Normative Model Evaluation]] — the third motivation.
- [[Shape of the Marketing Response Function]] — why level attributions and marginal effects diverge under saturation.
