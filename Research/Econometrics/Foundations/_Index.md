---
title: "Index: Foundations"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-09
concept_count: 3
---

# Foundations

> [!abstract] Routing Summary
> This folder covers the conceptual foundations of applied econometrics from MHE Part I (Chapters 1-2). Contains 3 notes.
> - Need the four FAQs framework for empirical research? -> [[Research Questions in Econometrics]]
> - Need why randomization is the gold standard? -> [[The Experimental Ideal]]
> - Need potential outcomes and selection bias? -> [[The Selection Problem]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Four FAQs framework for organizing research | [[Research Questions in Econometrics]] | concept | [[Mostly Harmless Econometrics - Overview]], [[The Experimental Ideal]], [[The Selection Problem]] | Good research answers a causal or descriptive question clearly |
| Random assignment as causal inference benchmark | [[The Experimental Ideal]] | concept | [[The Selection Problem]], [[Research Questions in Econometrics]], [[Regression and the CEF]] | Randomization eliminates selection bias by design |
| Potential outcomes, selection bias decomposition | [[The Selection Problem]] | concept | [[Research Questions in Econometrics]], [[Mostly Harmless Econometrics - Overview]] | Selection bias = E[Y0i given Di=1] - E[Y0i given Di=0] |

## Notes
- [[Research Questions in Econometrics]] — CONTAINS: Four FAQs framework, causal vs descriptive questions, organizing empirical research
- [[The Experimental Ideal]] — CONTAINS: Random assignment, Tennessee STAR experiment, why experiments are the benchmark for causal inference
- [[The Selection Problem]] — CONTAINS: Potential outcomes framework, selection bias decomposition, overview of methods that address it

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 1-2

## See Also

- [[Regression Foundations/_Index|Regression Foundations]] — Regression as the next tool after understanding selection
- [[Activity Bias in Advertising]] — Selection bias in action: observational ad measurement
