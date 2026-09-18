---
title: "Limits and Objections to Pre-registration"
tags:
  - source/ingested
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Nosek et al 2018 - The Preregistration Revolution.pdf]]"
source_location: "Nosek et al. 2018, pp. 2602-2604 (Challenges 1-9; Narrative Inferences)"
date_ingested: 2026-06-28
folder: "Research Methodology/Pre-registration and Open Science"
doc_type: paper
depends_on:
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Prediction vs Postdiction]]"
  - "[[Pre-analysis Plans and the Open Science Ecosystem]]"
used_by:
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "Objections to Preregistration"
  - "Limits of Preregistration"
  - "What Preregistration Does Not Fix"
---

# Limits and Objections to Pre-registration

> [!summary]
> Pre-registration **reduces but does not eliminate** bias. Its honest central limit: it does not *prevent* poor statistical practice — it makes such practice **detectable**. This note collects the boundary conditions Nosek et al. acknowledge (preregistered-but-biased decision trees, multiple comparisons across a program of research, narrative cherry-picking) and the common objections (it constrains discovery; it's burdensome; the data are preexisting; my work is exploratory), with the authors' responses.

## Overview

> [!note] The governing principle
> "Preregistration does not eliminate the possibility of poor statistical practices, but it does make them **detectable**." It also does **not favor prediction over postdiction** — its only job is to make clear *which is which*. ^governing-principle

The empirical case is described as strong "in principle" but not yet fully established by experiment: the argument is inductively strong and supported by correlational evidence (e.g., Kaplan & Irvin 2015 found positive-result rates dropped sharply after primary-outcome pre-registration was required in clinical trials; Franco et al. 2014 found 40% of preregistered studies failed to report a manipulation and 70% failed to report an outcome variable — selective reporting that pre-registration *makes visible*). Crucially, **the benefits are lost if researchers do not follow their pre-registrations.**

## Main Content

### What pre-registration does NOT fix

> [!note] 1. Bias can be preregistered
> A pre-registered **decision tree** or **SOP** can itself encode bias — e.g., "test a sequence of exclusion rules and stop when $P<0.05$." The misbehavior is now **highly detectable** (anyone can read the plan), but the diagnosticity of the inference is still invalidated. Transparency catches it; it doesn't prevent it. ^preregistered-bias

> [!note] 2. Multiple comparisons across a program of research
> Brandon pre-registers every experiment but gets a positive result roughly 1 in 20 tries — plausibly all chance. Pre-registration does not eliminate the multiple-comparisons problem *across* studies. It makes correct correction **possible** only if (a) the plan is blind to outcomes **and** (b) **all** outcomes are reported. Full reporting lets readers see "1 in 20" and treat the hit as a likely false positive; replication then confirms or refutes it. ^program-multiplicity

> [!note] 3. Narrative cherry-picking
> Alexandra pre-registers perfectly, reports every outcome, and labels predictions vs postdictions correctly — yet her narrative dwells on the two most interesting of ten results. This is effectively an uncorrected multiple comparison at the level of *interpretation and citation*. It can be partly addressed statistically (e.g., Bonferroni-type corrections), but selective attention is hard to fix with statistics. Pre-registration does **not** stop authors or readers from taking narrative license beyond what the evidence supports. The remedy is transparency: with the full process visible, other observers can apply their own interpretations. ^narrative-license

### Common objections and the authors' responses

> [!example] "Pre-registration constrains discovery / exploratory science."
> Response: It does not favor confirmation over exploration; it labels them. Exploration remains fully free **after** the preregistered tests, and discoveries become predictions for the next study. Discovery science is vital — the only prohibition is dressing postdiction up as prediction.

> [!example] "It's too burdensome for high-throughput labs."
> Response: Use **pre-registration templates** (document which parameters change per experiment) or achieve confirmation via **replication** — the first run is exploratory, the second tests the prediction. "Easy data acquisition is a gift for rapidly establishing reproducibility."

> [!example] "My data are preexisting / from others."
> Response: Pure pre-registration still works if no one has observed the data. Otherwise, register the plan and **transparently report what was and was not known** in advance; account for any loss of blinding. Partial blinding is a gray area, but disclosed partial blinding beats none.

> [!example] "Longitudinal / massive datasets can't be fully planned up front."
> Response: Register each new wave before its variables are observed; use hold-out/cross-validation. Partial blinding offers more protection than none.

> [!example] "My work is genuinely exploratory, so pre-registration is useless."
> Response: It is common to *begin* exploratory but uncommon to *stay* exploratory through to a published paper. If $P$ values appear, prediction is being claimed — and their diagnosticity must be earned by pre-commitment. Report $P$ values only when testing predictions.

> [!example] "Collaborators have competing predictions."
> Response: Not a problem at all — this is **strong inference** (Platt 1964). Pre-registration can hold multiple predictions simultaneously; the requirement is well-defined questions and a plan that tests them.

> [!example] "There's no way to split the data and few clear predictions."
> Response: "There is no magical solution. The rules of statistical inference have no empathy for how hard it is to acquire the data." When data are scarce, progress is simply slower — and for important questions, that is acceptable.

### The realistic bottom line

Pre-registration shifts the culture from providing **means, motive, and opportunity** for dysfunction toward providing them for rigor (see [[Pre-registration and Open Science - Overview]]). It is a coordination problem in a decentralized system: stakeholders must align incentives so that "what is good for science and what is good for the scientist are the same thing." The tool is necessary but not sufficient — it must be paired with full reporting, replication, and honest interpretation.

## Examples

> [!example] Detectable, not prevented
> Two researchers preregister a decision tree that stops dropping outliers once $P<0.05$. The inference is invalid — but because the rule is public, a reviewer can immediately flag it. Without pre-registration, the same behavior would be invisible. This is the essence of "reduces but does not eliminate."

## Connections

- [[Pre-registration and Open Science - Overview]] — the means/motive/opportunity framing and the honest caveat.
- [[Prediction vs Postdiction]] — narrative and program-level multiplicity are residual ways postdiction leaks back in.
- [[Pre-analysis Plans and the Open Science Ecosystem]] — decision trees, SOPs, blinding, and cross-validation are the tools whose limits are described here.
- [[Garden of Forking Paths]] — multiple comparisons persist across studies and in narrative focus.
- [[Forking Paths and Bayesian Approaches]] — Bayesian regularization as a complementary (not substitute) safeguard.

## See Also

- [[Researcher Degrees of Freedom]] — the flexibilities pre-registration constrains but cannot fully eliminate
- [[The Experimental Ideal]] — design-side safeguards that pair with analysis-side commitment
