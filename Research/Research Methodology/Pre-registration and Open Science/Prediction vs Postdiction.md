---
title: "Prediction vs Postdiction"
tags:
  - source/ingested
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Nosek et al 2018 - The Preregistration Revolution.pdf]]"
source_location: "Nosek et al. 2018, pp. 2600-2602 (Intro; Mental Constraints; Standard Tools of Statistical Inference Assume Prediction)"
date_ingested: 2026-06-28
folder: "Research Methodology/Pre-registration and Open Science"
doc_type: paper
depends_on:
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Garden of Forking Paths]]"
used_by:
  - "[[Pre-registration vs Registered Reports]]"
  - "[[Limits and Objections to Pre-registration]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "Confirmatory vs Exploratory"
  - "Prediction and Postdiction"
  - "Hypothesis Testing vs Hypothesis Generation"
  - "HARKing"
---

# Prediction vs Postdiction

> [!summary]
> **Prediction** (confirmatory research) acquires new data to *test* an idea about what will occur; **postdiction** (exploratory research) uses existing data to *generate* an explanation for what occurred. Both are vital, but they license different inferences. The danger is that the line blurs without pre-commitment: human biases make it easy — and rewarding — to recast a postdiction as a prediction. Standard statistical tools (NHST, $P$ values) are valid only for prediction, so confusing the two corrupts inference. Pre-registration is the mechanism that keeps the two distinct.

## Overview

Philosophers and methodologists have named this distinction many ways; Nosek et al. collapse the synonyms into two general terms:

| Prediction (confirmatory) | Postdiction (exploratory) |
|---|---|
| Hypothesis-**testing** | Hypothesis-**generating** |
| Context of justification | Context of discovery |
| Data-**independent** analysis | Data-**contingent** analysis |
| "What *will* occur?" | "*Why* did this occur?" |
| Data confront the possibility of being wrong | Data already known; explanation built to fit |

> [!definition] Prediction
> The acquisition of data to **test** ideas about what will occur. Data are used to confront the possibility that the prediction is wrong. Establishes diagnostic evidence for explanatory claims. ^prediction-def

> [!definition] Postdiction
> The use of data to **generate** hypotheses about why something occurred. The data are already known, and the postdiction is generated to explain them. Vital for discovery of possibilities not yet considered. ^postdiction-def

Neither mode is superior. Postdiction drives discovery — "progress in science often proceeds via unexpected discovery." Prediction tests whether those discoveries hold. The error is not doing one or the other; it is **mislabeling** one as the other.

## Main Content

### Why the line blurs: mental constraints

Researchers naturally alternate between the two modes, and several well-documented biases make it hard to tell them apart after the fact:

> [!note] HARKing
> **H**ypothesizing **A**fter the **R**esults are **K**nown (Kerr 1998): generating a hypothesis from observed data and then evaluating that hypothesis on the *same* data. This is circular reasoning — the hallmark of postdiction disguised as prediction. ^harking

- **Hindsight bias** ("I-knew-it-all-along effect") — outcomes seem more predictable after the fact. The observer simultaneously builds a postdiction *and* believes they would have predicted it. Tversky: this "ability to explain that which we cannot predict... leads us to believe that there is a less uncertain world than there actually is."
- **Vague predictions** — a prediction loose enough that many outcomes can be rationalized as confirming it (e.g., "treatment improves health," then pick the 1 of 5 outcomes that moved).
- **Motivated reasoning & confirmation bias** — seeking confirming evidence, discounting disconfirming evidence, misremembering the original purpose to match what was found. These operate outside conscious control, so **good intentions are not sufficient**.

### Why standard statistics break under postdiction

> [!note] NHST assumes prediction
> NHST and the $P$ value are designed for hypothesis **testing**. A $P$ value at $P < 0.05$ is a claim about how unlikely the data are under the null — but its diagnosticity depends on **how many tests were performed**. Being the only test is very different from being 1 of 20, 200, or 2,000. ^nhst-assumes-prediction

Even the simplest study has more than one defensible way to run the test (exclusions, transformations, covariate choices — the [[Researcher Degrees of Freedom]]). Correcting for the *literal* number of tests is straightforward but rarely done, and it still does not capture how *observing the data* steers which tests get run — the [[Garden of Forking Paths]]. When paths are chosen after seeing the data, the effective number of comparisons is unknowable and the $P$ value loses its diagnosticity:

> In other words, NHST cannot be used with confidence for postdiction.

In **prediction**, the pipeline is fixed before the data are seen, so (with correction for the planned tests) $P$ values retain their meaning. This is exactly the property pre-registration secures.

### The formal definition this yields

Nosek et al. give a clean operational rule: *analyses that are part of the pre-registration inform **prediction**; analyses conducted on the data that are not part of the pre-registration inform **postdiction**.* Pre-registration can, in principle, establish a **bright line** between the two.

## Examples

> [!example] The biomedical researcher
> Predicts "the treatment improves health," measures five outcomes, finds one positive, and reports it as confirming the prediction. The vague prediction plus selective focus converts a postdiction (1 of 5 hit) into a spurious test.

> [!example] Discovery science is still legitimate
> A researcher who "wades into new problems with little idea of what direction it will go" is doing valuable postdiction. The problem is only when discovery is "dressed up" as a test of theoretical predictions — reporting $P$ values as if hypotheses were specified in advance. Preserving the diagnosticity of $P$ values means reporting them only when testing predictions.

## Connections

- [[Garden of Forking Paths]] — the mechanism by which data-contingent (postdictive) analysis silently invalidates $P$ values.
- [[Researcher Degrees of Freedom]] — the analytic choices that proliferate forking paths.
- [[Pre-registration and Open Science - Overview]] — pre-registration as the fix for the blurred line.
- [[Limits and Objections to Pre-registration]] — even perfect pre-registration leaves narrative and multiple-comparison gaps.

## See Also

- [[Pre-registration vs Registered Reports]] — mechanisms that enforce the prediction/postdiction distinction
- [[Forking Paths and Bayesian Approaches]] — the Bayesian view of why data-contingent $P$ values fail
- [[The Experimental Ideal]] — design-side commitment analogous to analysis-side pre-commitment
