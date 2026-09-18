---
title: "Pre-analysis Plans and the Open Science Ecosystem"
tags:
  - source/ingested
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Nosek et al 2018 - The Preregistration Revolution.pdf]]"
source_location: "Nosek et al. 2018, pp. 2601-2606 (Preregistration Distinguishes...; Preregistration in Practice; Advancing the Opportunity)"
date_ingested: 2026-06-28
folder: "Research Methodology/Pre-registration and Open Science"
doc_type: paper
depends_on:
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Prediction vs Postdiction]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Pre-registration vs Registered Reports]]"
  - "[[Limits and Objections to Pre-registration]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "Pre-analysis Plan"
  - "PAP"
  - "OSF"
  - "AsPredicted"
  - "AEA RCT Registry"
  - "Open Science Framework"
---

# Pre-analysis Plans and the Open Science Ecosystem

> [!summary]
> A **pre-analysis plan (PAP)** is the document that makes pre-registration concrete: it pins down the research questions and every analytic decision before the data are seen. This note covers what a PAP contains, the practical strategies for writing one when reality departs from the ideal (deviations, assumption violations, preexisting data, longitudinal designs), and the **registry ecosystem** that preserves and discloses these plans — OSF, AsPredicted, ClinicalTrials.gov, the AEA RCT Registry, RIDIE, and EGAP.

## Overview

Pre-registration only works if (a) the plan is specific enough to remove [[Researcher Degrees of Freedom]], and (b) it is **preserved** by an independent service so it cannot be quietly revised. The PAP provides constraint — it specifies *how the data will be used to confront the research questions* — and the registry provides the time-stamp and discoverability.

> [!definition] Pre-analysis plan (PAP)
> A document committing, in advance of observing outcomes, to the research questions and the full analytic pipeline: hypotheses, design, sample/stopping rule, variables and how they are constructed, exclusion criteria, transformations, the model and covariates, the specific tests, and decision rules for contingencies. ^pap-def

### What a PAP should pin down

Because even the simplest study has more than one defensible analysis, the PAP must remove the flexibility that creates forking paths:

- **Hypotheses / research questions** — and, where relevant, competing predictions.
- **Sampling and stopping rule** — target N and when data collection stops (optional stopping under NHST inflates error).
- **Variables** — exact definitions; how raw measures are combined or transformed.
- **Exclusion criteria** — which observations are dropped and why.
- **Model specification** — covariates, functional form, the specific inferential tests.
- **Decision rules** — what to do if assumptions are violated (see decision trees / SOPs below).
- **Commitment to report all preregistered outcomes** — not a selected subset.

## Main Content: Strategies when reality departs from the ideal

Nosek et al. devote most of the paper to nine practical challenges. The key strategies:

> [!note] Deviations during the study
> Plans break (e.g., Jolene targets 100 infants, gets 60, and some fall asleep — an exclusion she never anticipated). Deviations do not destroy diagnosticity if **transparently reported**. Even after the data are seen, a pre-registration plus disclosed deviations gives far more confidence than no pre-registration at all. ^deviations

> [!note] Assumption violations discovered during analysis — four tools
> When a variable shows a ceiling effect or non-normality (Courtney's problem), use:
> 1. **Sequential / incremental pre-registration** — register a first stage that inspects distributions to set exclusions/transformations (without revealing outcomes), then register the outcome model. Fragile: a leaky first stage compromises the second.
> 2. **Blinding the dataset** — scramble observations so distributional forms are retained but outcomes are unknowable until unblinded (MacCoun & Perlmutter 2015).
> 3. **Decision trees** — pre-specify the sequence of tests and decision rules (e.g., test normality → choose parametric vs nonparametric). Powerful but you can preregister bias into a tree (e.g., loop exclusions until $P<0.05$) — though that misbehavior is detectable.
> 4. **Standard operating procedures (SOPs)** — reusable decision rules across many studies (Lin & Green 2016); can become community norms (e.g., the IAT scoring pipeline). ^assumption-tools

> [!note] Preexisting data
> "Pure" pre-registration is still possible if **no one has observed the data** (a paleontologist predicting yet-undiscovered fossils; an economist predicting unreleased government data). Once data are observed, blinding is at risk — even indirectly (reading a summary, knowing a correlated result). The remedy: register the plan and **transparently report what was and was not known in advance**. Partial blinding creates a gray area between prediction and postdiction. ^preexisting-data

> [!note] Longitudinal & large multivariate datasets, and cross-validation
> For a 20-year project (Lily), register each new wave before its variables are observed — partial blinding beats none. For a single large dataset, use **cross-validation / hold-out**: split the data, explore one half to build models, **seal** the other half until exploration is done, then pre-register and unseal — converting postdictions into predictions on the hold-out (Fafchamps & Labonne 2016). ^cross-validation

> [!note] Many experiments & few a priori expectations
> Labs running many experiments use **pre-registration templates** that document which parameters change each run; trivially easy data acquisition can instead achieve confirmation via **replication** (the first run is exploratory; the second tests the prediction). Discovery-only research is legitimate as long as it does not dress postdiction as prediction. ^templates-replication

## The Open Science Ecosystem

> [!note] Registries and services
> - **Open Science Framework (OSF)** — [https://osf.io](https://osf.io); domain-general registry with multiple formats, including the comprehensive **Preregistration Challenge** format. >8,000 pre-registrations across all sciences at time of writing.
> - **AsPredicted** — [https://aspredicted.org/](https://aspredicted.org/); a simple form. *Not itself a registry* — users can keep forms private forever and selectively reveal them, so completed forms must be posted to a real registry to meet preservation/transparency standards.
> - **ClinicalTrials.gov** — the largest registry; clinical-trial registration is required by US law and ICMJE journals (requires primary/secondary outcomes, not yet full analysis plans).
> - **AEA RCT Registry** — [https://www.socialscienceregistry.org](https://www.socialscienceregistry.org); the American Economic Association's registry for randomized controlled trials in economics.
> - **RIDIE** — Registry for International Development Impact Evaluations.
> - **EGAP** — Evidence in Governance and Politics registry (political science).
> - **WHO registry network** — list of national/regional primary registries.
> ^ecosystem

> [!note] Incentive layer
> **TOP Guidelines** (transparency/openness standards adopted by thousands of journals and many funders), pre-registration **badges**, and the **Preregistration Challenge** awards shift career incentives toward pre-registration. Existing practices — grant methodology sections, IRB/ethics protocols, thesis proposals — are "de facto" partial pre-registrations that take only small steps to formalize. ^incentive-layer

## Examples

> [!example] Cross-validation in one study
> A team with one large dataset and few clear hypotheses splits it: the exploratory half generates candidate models; those are written into a PAP and registered; the sealed confirmatory half is then unsealed to test them. The same dataset yields both legitimate discovery and a genuine prediction test.

## Connections

- [[Researcher Degrees of Freedom]] — the flexibilities a PAP must enumerate and remove.
- [[Garden of Forking Paths]] — why an unspecified pipeline destroys $P$-value diagnosticity.
- [[Prediction vs Postdiction]] — sealing/blinding converts postdiction into legitimate prediction.
- [[Pre-registration vs Registered Reports]] — Registered Reports add results-blind review on top of the PAP.

## See Also

- [[Pre-registration and Open Science - Overview]] — the big picture
- [[Limits and Objections to Pre-registration]] — even a perfect PAP has limits
- [[The Experimental Ideal]] — randomized design as the complement to a pre-specified analysis
