---
title: "Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Appendix G, p. 34; applications section is the note author's"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]"
  - "[[Dehghani 2021 - Task Selection Bias Case Studies]]"
used_by:
  - "[[Dehghani 2021 - The Benchmark Lottery - Overview]]"
aliases:
  - Benchmarking checklist
  - Benchmark lottery in marketing measurement
---

# Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications

> [!summary]
> Appendix G gives a nine-item benchmarking checklist for reviewers and area chairs aimed at reducing the benchmark lottery effect, and notes that Gebru et al.'s datasheet questions can be used as a creation checklist. This note reproduces the checklist and then, as an application by the note author, maps lottery mechanisms to marketing measurement practice (MMM selection, lift-test calibration, vendor bake-offs).

## Overview

The checklist is explicitly a proposal "with the hope of reducing the benchmark lottery effect," recognising that the effect has multiple roots. It targets *review*, not authoring, because reviewer expectations are the community-bias channel ([[Dehghani 2021 - Community Bias and the GLUE Example]]).

## Main Content

> [!definition] Benchmarking checklist for reviewers and area chairs (App. G)
> 1. If reviews express written dissatisfaction about the choice of baselines, tasks or benchmarks, are there rationales beyond the fact that the requested datasets are "must-have" benchmarks?
> 2. Do reviews consider benefits such as efficiency, fairness and simplicity outside the commonly evaluated performance metrics (e.g., accuracy)?
> 3. Are there negative points because the paper proposes a method that deviates from the current trend or hype? If so, are there rational justifications?
> 4. If a paper is penalised for not performing well on only a subset of tasks, is there enough logical elaboration in the review?
> 5. Do reviews assess the evaluation strategy in terms of different sources of variance (multiple splits, multiple random seeds, etc.)?
> 6. If there are statistical-significance analyses, are they appreciated? If not, are recommendations to add them provided?
> 7. If the paper claims SOTA or improvements over baselines, are there ablations on how much of the improvement is secured by tricks not tied to the main contributions?
> 8. If reviews ask for more experiments, analyses or benchmarks, are potential blockers considered (e.g., out of reach in compute budget for pre-training or extremely large datasets)?
> 9. If the paper proposes a new idea deviating from common paradigms, is "out of the hype" thinking valued as opposed to solely recognising SOTA performance?
^def-reviewer-checklist

The appendix also states that Gebru et al. (2018) "provided a list of questions for the benchmark creation process that covers motivation of the benchmark, composition, collection process, and recommended uses," and that such data can be framed as checklists for benchmark creation: see [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]].

### Mapping the checklist to lottery mechanisms

| Checklist item | Mechanism addressed |
|---|---|
| 1, 4, 9 | Community bias |
| 2, 3 | Community bias; complexity/simplicity guideline |
| 5, 6 | Statistical testing; multiple splits |
| 7 | Statefulness: tricks accumulated on mature benchmarks |
| 8 | Rigging via compute asymmetry |

### Application to marketing measurement (note author's mapping)

| Lottery mechanism | Marketing-measurement counterpart | Practical safeguard |
|---|---|---|
| Task selection bias | Choosing which geos, weeks or past lift tests to validate on determines which MMM specification "wins" | Report results on all subsets and by subset; use rank stability across subsets as a diagnostic |
| Aggregation | Averaging MAPE over channels or periods hides a model that fails on one big channel | Report per-channel errors; geometric or rank aggregation as sensitivity analysis |
| Community bias | "Must-have" validation windows or vendor-standard metrics enforced by stakeholders | Document why each metric or window is used |
| Statefulness | Repeatedly tuning priors against the same holdout weeks or the same calibration experiments | Reserve fresh experiments for final validation; log how many times the holdout was consulted |
| Rigging | Vendor bake-offs where each vendor chooses its own windows, metrics and tuning budget | Fix a shared protocol and tuning budget in advance |
| Living benchmark | A rolling library of new lift tests | Add new tests, flag superseded ones, version the library |

Calibration against experiments is one example: [[Experimental Benchmarks for Observational Ad Measurement]] discusses benchmarking observational methods against randomised lift studies, where the lottery issues are the choice of studies and the adaptive tuning of observational methods.

## Examples

> [!example] Applying checklist item 5 to an MMM comparison
> **Setup.** Model $M_1$ (hierarchical Bayesian) vs $M_2$ (frequentist ridge) on a single 13-week holdout; $M_1$ has 4% lower MAPE.
> **Questions.** What are the sources of variance (which 13 weeks; random seeds in MCMC; data-driven hyperparameters)? How often was this holdout consulted?
> **Action.** Re-evaluate on multiple rolling-origin splits, record spread of the difference, and only claim superiority if the difference is large relative to split-to-split variation.
> **Interpretation.** This is the paper's "beyond a single train-test split" recommendation applied to forecasting-style back-tests; see [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]].
^ex-mmm-multiple-splits

## Connections

- Sibling benchmark notes: [[Gebru 2021 - Datasheets for Datasets - Overview]], [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]].
- Honest uncertainty around model choice complements the forking-paths literature: [[Garden of Forking Paths]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]]
