---
title: "Pre-registration and Open Science - Overview"
tags:
  - source/ingested
  - topic/research-methodology
  - type/overview
  - doc/paper
source: "[[raw/Nosek et al 2018 - The Preregistration Revolution.pdf]]"
source_location: "Nosek et al. 2018, PNAS 115(11):2600-2606, full article"
date_ingested: 2026-06-28
folder: "Research Methodology/Pre-registration and Open Science"
doc_type: paper
depends_on:
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Prediction vs Postdiction]]"
  - "[[Pre-registration vs Registered Reports]]"
  - "[[Pre-analysis Plans and the Open Science Ecosystem]]"
  - "[[Limits and Objections to Pre-registration]]"
aliases:
  - "Preregistration Overview"
  - "The Preregistration Revolution"
  - "Open Science Practices"
---

# Pre-registration and Open Science - Overview

> [!summary]
> Pre-registration is the practice of committing to research questions and an analysis plan **before** observing the research outcomes. Its purpose is not to favor confirmation over exploration but to make transparent **which is which** — to draw a bright line between [[Prediction vs Postdiction|prediction (testing hypotheses) and postdiction (generating hypotheses)]]. Because ordinary biases (hindsight bias, motivated reasoning, confirmation bias) make it nearly impossible to honestly reconstruct after the fact what we expected, pre-commitment is the only reliable way to preserve the diagnosticity of statistical inference. Nosek, Ebersole, DeHaven & Mellor (2018) lay out the epistemic argument, practical strategies, the supporting ecosystem (OSF, AsPredicted, clinical-trial and RCT registries, Registered Reports), and the limits.

## Overview

This note is the entry point for the vault's coverage of pre-registration and open-science practices. It fills the gap between **recommending** pre-registration (see [[Forking Paths and Bayesian Approaches]]) and **motivating** it (see [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]]) by explaining *how* it works and *what ecosystem* supports it.

The core problem the paper addresses: science progresses by **generating hypotheses from existing observations** and **testing hypotheses with new observations**. This distinction is appreciated conceptually but routinely violated in practice. When a postdiction (an after-the-fact explanation) is presented as if it were a prediction, the apparent evidence is inflated, uncertainty is falsely reduced, and reproducibility declines. Pre-registration restores the distinction by time-stamping the commitment.

> [!definition] Pre-registration
> Committing to the research questions and analytic steps **without advance knowledge of the research outcomes**, usually by posting the plan to an independent registry (e.g., [https://clinicaltrials.gov/](https://clinicaltrials.gov/) or [https://osf.io/](https://osf.io/)) that preserves it and makes it discoverable (sometimes after an embargo). ^preregistration-def

## Main Content

### Why the distinction matters

> [!note] The credibility chain
> Mistaking postdiction for prediction → underestimates outcome uncertainty → psychological overconfidence → inflated false-positive rate → reduced reproducibility. Pre-registration breaks this chain at the first link.

Three forces in the current research culture create a conflict of interest — Nosek et al. frame it as **means, motive, and opportunity**:

- **Means** — reasoning biases (hindsight bias, confirmation bias, motivated reasoning) and the misuse of statistical tools.
- **Motive** — novel, positive, clean results are rewarded with jobs, grants, publications, and awards, yet such results are rare.
- **Opportunity** — without an a priori commitment, researchers can select, rationalize, and report whichever tests maximize reward over accuracy.

Pre-registration removes the **opportunity** and shifts the culture so that the same culture instead provides means, motive, and opportunity for *rigor*. ^means-motive-opportunity

### Why standard statistics assume prediction

Null hypothesis significance testing (NHST) and the $P$ value are designed for **prediction**, not postdiction. A $P$ value's diagnosticity depends on knowing how many tests could have been run. When analytic choices are influenced by the observed data — the [[Garden of Forking Paths]] problem — the effective number of tests is unknowable, and the $P$ value becomes uninterpretable. Pre-specifying the analytic pipeline restores diagnosticity. (See [[Prediction vs Postdiction]].)

### The two mechanisms

| Mechanism | When peer review happens | What it adds |
|---|---|---|
| **Pre-registration** | None required; plan is time-stamped to a registry | Distinguishes prediction from postdiction |
| **Registered Report** | Before results, at Stage 1 | Results-blind acceptance; improves design; defeats publication bias |

Detailed in [[Pre-registration vs Registered Reports]].

### The ecosystem

Domain-general and domain-specific services now make pre-registration feasible in any field: the **Open Science Framework (OSF)**, **AsPredicted**, **ClinicalTrials.gov**, the **AEA RCT Registry**, **RIDIE**, **EGAP**, and the WHO list of national registries — plus the **TOP Guidelines** and journal **badges** as incentives. See [[Pre-analysis Plans and the Open Science Ecosystem]].

### The honest caveat

Pre-registration **reduces but does not eliminate** bias. It does not fix multiple comparisons, narrative cherry-picking, or preregistered-but-biased decision trees; it makes such problems **detectable**. Covered in [[Limits and Objections to Pre-registration]].

## Examples

> [!example] The idealized cycle
> A researcher observes the world → forms a hypothesis → designs a study and analysis plan → **posts the plan to a registry** → collects and analyzes data per the plan → reports all preregistered outcomes → *then* explores freely for new postdictions → converts the best postdictions into predictions for the next study. In this ideal, pre-registration adds almost no burden. Most real research departs from the ideal, which is why the paper devotes most of its length to practical strategies (see [[Pre-analysis Plans and the Open Science Ecosystem]]).

## Connections

- [[Garden of Forking Paths]] — the problem pre-registration is designed to solve (data-contingent analysis invalidates $P$ values).
- [[Researcher Degrees of Freedom]] — the specific analytic flexibilities a pre-analysis plan must pin down.
- [[Forking Paths and Bayesian Approaches]] — recommends pre-registration as a (frequentist) safeguard complementary to Bayesian regularization.
- [[The Experimental Ideal]] — randomization is the design-side analog of pre-registration's analysis-side commitment.

## See Also

- [[Prediction vs Postdiction]] — the core epistemic argument
- [[Pre-registration vs Registered Reports]] — the two mechanisms, results-blind review
- [[Pre-analysis Plans and the Open Science Ecosystem]] — OSF, AsPredicted, AEA RCT Registry, PAP contents
- [[Limits and Objections to Pre-registration]] — what it does and doesn't fix
