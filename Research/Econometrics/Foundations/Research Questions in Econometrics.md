---
title: Research Questions in Econometrics
aliases:
  - Questions about Questions
  - Four Research FAQs
tags:
  - source/ingested
  - topic/econometrics
  - topic/research-design
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Foundations"
doc_type: concept
source_location: "MHE Ch. 1, pp. 3-7"
depends_on:
  - "[[Mostly Harmless Econometrics - Overview]]"
  - "[[The Experimental Ideal]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Conditional Independence Assumption]]"
  - "[[Instrumental Variables]]"
  - "[[Differences-in-Differences]]"
  - "[[Standard Errors and Clustering]]"
---

# Research Questions in Econometrics

> [!summary]
> Good econometrics starts with a good research agenda. The four "Frequently Asked Questions" provide a framework for organizing any empirical research project.

## The Four FAQs

### 1. What is the causal relationship of interest?
The most interesting research in social science is about **cause and effect**. Example: the causal effect of schooling on wages (~40% higher wages for a college degree).

### 2. What experiment could ideally capture this effect?
Imagine yourself with no budget constraint and no IRB. What experiment would you run? Questions that cannot be answered by *any* experiment are **FUQ'd** (Fundamentally Unidentified Questions).

### 3. What is your identification strategy?
How does your research design use observational data to approximate the ideal experiment? Chapters 3-6 of [[Mostly Harmless Econometrics - Overview|MHE]] provide the conceptual frameworks.

### 4. What is your mode of statistical inference?
What population, sample, and assumptions underlie your standard errors? Covered in Chapter 8.

> [!tip] FUQ'd Questions
> Questions about the causal effect of immutable characteristics (race, gender) seem FUQ'd but can be reframed: labor market discrimination turns on whether someone *believes* you are a certain race/gender, which *can* be manipulated (e.g., audit studies with fake resumes).

## See Also

- [[Mostly Harmless Econometrics - Overview]] — full book overview
- [[The Experimental Ideal]] — the ideal benchmark for FAQ #2
- [[The Selection Problem]] — the fundamental identification challenge
- [[Conditional Independence Assumption]] — selection on observables strategy (FAQ #3)
- [[Instrumental Variables]] — instrument-based identification (FAQ #3)
- [[Differences-in-Differences]] — panel data identification (FAQ #3)
- [[Regression Discontinuity Designs]] — threshold-based identification (FAQ #3)
- [[Standard Errors and Clustering]] — mode of statistical inference (FAQ #4)
- [[Bayesian Workflow - Overview]] — iterative Bayesian research design paralleling the FAQ framework
- [[Omitted Variables Bias]] — the specific failure mode that FAQ #3 (identification strategy) aims to rule out
- [[Activity Bias in Advertising]] — a worked example showing all four FAQs applied to an advertising measurement problem
