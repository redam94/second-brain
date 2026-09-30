---
title: "Statistical Rethinking: The Golem of Prague"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/philosophy-of-science
  - topic/statistical-modeling
  - type/overview
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Golem of Prague"
  - "Statistical golems"
doc_type: overview
source_location: "Statistical Rethinking Ch.1, pp. 1-17"
depends_on:
  - "[[raw/StatRethink-Bayes.pdf]]"
used_by:
  - "[[Garden of Forking Data]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Statistical Rethinking - Overview]]"
---

# The Golem of Prague

> [!summary]
> Chapter 1 of Statistical Rethinking argues that statistical models are like golems — powerful but mindless constructs that follow instructions literally. Instead of choosing among pre-made tests, scientists should learn to build and understand their own models. Three key arguments: (1) hypotheses are not models, (2) falsification rarely works cleanly, and (3) we should build rather than test.

## Statistical Golems

Statistical tests (t-tests, chi-squared, ANOVA, etc.) are pre-fabricated golems: powerful within their domain but dangerous when misapplied. Scientists often choose tests from a flowchart without understanding the underlying model. McElreath argues for **golem engineering** — learning to construct, evaluate, and modify statistical models directly.

## Hypotheses Are Not Models

A crucial insight: the mapping between hypotheses, process models, and statistical models is **many-to-many**:

1. Any statistical model (M) may correspond to more than one process model (P)
2. Any hypothesis (H) may correspond to more than one process model (P)
3. Any statistical model (M) may correspond to more than one hypothesis (H)

> [!warning] Rejecting a Null Tells You Little
> When we reject a null hypothesis, we haven't confirmed the alternative — the same statistical model that fits the "null" process could also fit a "selection" process. Model comparison across multiple non-null models is far more informative.

## Why Falsification Rarely Works

Three problems with naive falsification:
1. **Observation error** — measurements are imprecise; "black swan" detections are probabilistic
2. **Continuous hypotheses** — most scientific hypotheses are about degree, not binary truth (e.g., "80% of swans are white")
3. **Falsification is consensual** — the scientific community argues toward consensus; it's not a clean logical operation

## Three Tools for Golem Engineering

1. **Bayesian data analysis** — treating "randomness" as a property of information, not of the world; the golem is random, not the coin
2. **[[Hierarchical Models|Multilevel models]]** — parameters all the way down; four reasons to use them: (a) adjust for repeat sampling, (b) adjust for imbalance, (c) study variation, (d) avoid averaging
3. **[[Overfitting and Information Criteria|Model comparison using information criteria]]** — AIC, DIC, WAIC; navigating between overfitting (Scylla) and underfitting (Charybdis)

## See Also

- [[Probability and Bayesian Inference]] — BDA3's formal treatment of the same Bayesian foundations
- [[Garden of Forking Data]] — the next chapter, building the first Bayesian model
- [[Garden of Forking Paths]] — Gelman's related concept about researcher degrees of freedom
- [[Researcher Degrees of Freedom]] — the multiplicity problem that golem engineering aims to address
- [[Hierarchical Models]] — BDA3's treatment of multilevel models (tool #2)
- [[Overfitting and Information Criteria]] — formal coverage of AIC, DIC, WAIC (tool #3)
- [[Statistical Rethinking - Overview]] — full book overview
- [[Choosing and Building Models]] — Bayesian Workflow's operationalization of "golem engineering": how to actually build custom models step by step
- [[Bayesian Workflow - Overview]] — the full principled workflow that golem engineering motivates: prior predictive checks, SBC, PPC, model comparison
