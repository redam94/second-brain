---
title: "Index: Foundations"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Econometrics/_Index|Econometrics]]"
date_updated: 2026-06-28
concept_count: 4
---

# Foundations

> [!abstract] Routing Summary
> This folder covers the conceptual foundations of applied econometrics and causal inference. Contains 4 notes plus the Randomization Inference sub-topic.
> - Need the four FAQs framework for empirical research? -> [[Research Questions in Econometrics]]
> - Need why randomization is the gold standard? -> [[The Experimental Ideal]]
> - Need potential outcomes and selection bias? -> [[The Selection Problem]]
> - Need DAGs, d-separation, backdoor adjustment, valid adjustment sets? -> [[Directed Acyclic Graphs]]
> - Need Fisher randomization tests, sharp vs weak nulls, studentized/permutation inference? -> [[Research/Econometrics/Foundations/Randomization Inference/_Index|Randomization Inference]]

## Sub-topics

| Sub-topic | Notes | Covers |
|-----------|-------|--------|
| [[Research/Econometrics/Foundations/Randomization Inference/_Index\|Randomization Inference]] | 5 | Fisher randomization test & the sharp null, sharp vs weak (Neyman) nulls, studentized randomization tests with dual finite-sample/asymptotic validity, permutation tests & exact inference — Wu & Ding (2021) |

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Four FAQs framework for organizing research | [[Research Questions in Econometrics]] | concept | [[Mostly Harmless Econometrics - Overview]], [[The Experimental Ideal]], [[The Selection Problem]] | Good research answers a causal or descriptive question clearly |
| Random assignment as causal inference benchmark | [[The Experimental Ideal]] | concept | [[The Selection Problem]], [[Research Questions in Econometrics]], [[Regression and the CEF]] | Randomization eliminates selection bias by design |
| Potential outcomes, selection bias decomposition | [[The Selection Problem]] | concept | [[Research Questions in Econometrics]], [[Mostly Harmless Econometrics - Overview]] | Selection bias = E[Y0i given Di=1] - E[Y0i given Di=0] |
| DAGs, forks/chains/colliders, backdoor adjustment, d-separation | [[Directed Acyclic Graphs]] | concept | [[The Selection Problem]], [[The Experimental Ideal]] | Conditioning on valid adjustment set (no colliders, all forks/chains blocked) recovers causal effect from observational data |

## Notes
- [[Research Questions in Econometrics]] — CONTAINS: Four FAQs framework, causal vs descriptive questions, organizing empirical research
- [[The Experimental Ideal]] — CONTAINS: Random assignment, Tennessee STAR experiment, why experiments are the benchmark for causal inference
- [[The Selection Problem]] — CONTAINS: Potential outcomes framework, selection bias decomposition, overview of methods that address it
- [[Directed Acyclic Graphs]] — CONTAINS: DAG definition, forks/chains/colliders, conditioning rules, paths, backdoor paths, backdoor adjustment formula, d-separation, d-connection, valid adjustment sets, worked example with complex DAG, Simpson's Paradox

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 1-2
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Graham Harrison, Towards Data Science (2023-04-06): DAGs from basics to backdoor adjustment

## See Also

- [[Research/Econometrics/Regression Foundations/_Index|Regression Foundations]] — Regression as the next tool after understanding selection
- [[Activity Bias in Advertising]] — Selection bias in action: observational ad measurement
