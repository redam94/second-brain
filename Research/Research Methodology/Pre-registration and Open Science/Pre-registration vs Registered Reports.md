---
title: "Pre-registration vs Registered Reports"
tags:
  - source/ingested
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Nosek et al 2018 - The Preregistration Revolution.pdf]]"
source_location: "Nosek et al. 2018, pp. 2604-2605 (Making Preregistration the Norm; Advancing the Motive)"
date_ingested: 2026-06-28
folder: "Research Methodology/Pre-registration and Open Science"
doc_type: paper
depends_on:
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Prediction vs Postdiction]]"
used_by:
  - "[[Pre-analysis Plans and the Open Science Ecosystem]]"
  - "[[Limits and Objections to Pre-registration]]"
aliases:
  - "Registered Reports"
  - "Results-blind peer review"
  - "In-principle acceptance"
---

# Pre-registration vs Registered Reports

> [!summary]
> Pre-registration and Registered Reports are **two distinct mechanisms** for committing to a plan before seeing results. A **pre-registration** time-stamps an analysis plan to a registry — no peer review required. A **Registered Report** adds **results-blind peer review**: the journal reviews the question and methodology *before* data are collected and grants **in-principle acceptance**, so publication does not depend on how the results turn out. Registered Reports therefore attack **publication bias** and selective reporting directly, while also improving study designs during review.

## Overview

Both mechanisms enforce the [[Prediction vs Postdiction]] distinction, but they operate at different points in the workflow and solve different problems.

> [!definition] Pre-registration
> Posting the research questions and analysis plan to an independent registry before observing outcomes. It establishes the prediction/postdiction bright line but says nothing about whether or where the work will be published. ^prereg-def

> [!definition] Registered Report
> A publishing model (offered by dozens of journals, originating with Chambers et al. 2014 and Nosek & Lakens 2014) in which the manuscript is reviewed and accepted **before results exist**. ^registered-report-def

## Main Content

### The two-stage Registered Report workflow

> [!note] Stage 1 — results-blind review
> Authors submit the **research question and methodology** for peer review *before* observing outcomes. If reviewers agree the question is sufficiently important and the methodology is of sufficiently high quality, the paper receives **in-principle acceptance (IPA)**. ^stage-1

> [!note] Stage 2 — execution review
> Authors carry out the study and submit the final report. Reviewers do **not** evaluate the perceived importance of the outcomes. They evaluate **quality of execution** and **adherence to the preregistered plan**. ^stage-2

The decisive feature: because acceptance is decided at Stage 1, **the result (positive, negative, or null) cannot affect whether the paper is published**.

### What each mechanism fixes

| Problem | Plain pre-registration | Registered Report |
|---|---|---|
| Postdiction recast as prediction | Fixed (bright line) | Fixed |
| Forking paths / undisclosed flexibility | Fixed for planned analyses | Fixed for planned analyses |
| **Publication bias / file drawer** | Not addressed | **Fixed** (IPA before results) |
| Selective reporting of outcomes | Detectable | **Prevented** by design |
| Weak study design caught too late | Not addressed | **Improved during Stage 1 review** |
| Peer-review prestige / acceptance | Independent of it | Built in |

> [!note] Why results-blind review matters
> In the ordinary system, reviewers and editors favor novel, positive, clean results, so authors are incentivized to produce (or selectively report) them. Reviewing **before** results exist removes the outcome from the acceptance decision and aligns the reward with rigor rather than with a favorable result. This is the "motive" lever in the means/motive/opportunity framing of [[Pre-registration and Open Science - Overview]].

### Related incentive mechanisms

- **Pre-registration badges** — journals award a visible badge for preregistered work; analogous open-data badges produced a >10-fold increase in data sharing in an initial test (Kidwell et al. 2016).
- **The Preregistration Challenge** — one thousand \$1,000 awards for publishing the results of a preregistered study.
- **TOP Guidelines** — thousands of journals and many funders are signatories to the Transparency and Openness Promotion standards, which include pre-registration. (See [[Pre-analysis Plans and the Open Science Ecosystem]].)
- **Legal/editorial mandates** — pre-registration of clinical trials is required by US law and by ICMJE-adhering journals (though clinical-trial standards require only identification of primary/secondary outcomes, not a comprehensive analysis plan).

## Examples

> [!example] Same study, two paths
> A psychologist with a clear hypothesis can (a) **pre-register** the design and analysis on OSF, then submit the finished paper anywhere — publication still hinges on results; or (b) submit a **Registered Report**: get in-principle acceptance on the design, run the study, and publish regardless of whether the effect appears. Path (b) additionally protects against the file drawer.

## Connections

- [[Pre-registration and Open Science - Overview]] — situates both mechanisms within the broader practice.
- [[Prediction vs Postdiction]] — the distinction both mechanisms enforce.
- [[Pre-analysis Plans and the Open Science Ecosystem]] — the registries and PAP contents that pre-registration relies on.
- [[Limits and Objections to Pre-registration]] — what neither mechanism fully solves.

## See Also

- [[Garden of Forking Paths]] — the analytic-flexibility problem both mechanisms constrain
- [[Forking Paths and Bayesian Approaches]] — pre-registration recommended as a complementary safeguard
