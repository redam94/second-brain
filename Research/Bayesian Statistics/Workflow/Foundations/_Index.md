---
title: "Index: Foundations"
tags:
  - type/index
  - source/ingested
parent: "[[Workflow/_Index|Bayesian Workflow]]"
date_updated: 2026-08-18
concept_count: 8
---

# Foundations

> [!abstract] Routing Summary
> Part 1 (Chapters 1–4) of [[Bayesian Workflow Book - Overview|Gelman, Vehtari & McElreath (2026)]]. Covers why Bayes, what "Bayesian" even means, why no method is assumption-free, the master workflow diagram, the four-scenario taxonomy that organizes the book, and two complete introductory examples. 8 notes.
> - Need the **master workflow diagram (Figure 2.1)**? → [[From Inference to Data Analysis to Workflow]]
> - Need the **cost-benefit case for Bayes**? → [[Why Bayes - Benefits, Costs, and Borders]]
> - Need to know **which of subjective/objective/pragmatic Bayes** the book adopts? → [[Varieties of Bayesian Theory]]
> - Need the argument that **non-Bayesian methods carry assumptions too**? → [[There Is No Safe Haven]]
> - Need the **taxonomy that organizes the whole book**? → [[Four Modeling Scenarios]]
> - Need **Stan/PPL setup and the vocabulary of probabilistic programming**? → [[Computational Tools and Probabilistic Programming]]
> - Need a **first, minimal Stan program**? → [[Bioassay - A First Probabilistic Program]]
> - Need **one problem carried end to end through the entire workflow**? → [[Multiple-Choice Exam - A Full Workflow Walkthrough]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Benefits, costs, and borders of Bayesian inference | [[Why Bayes - Benefits, Costs, and Borders]] | concept | — | Bayes pays where prior information and uncertainty propagation matter; costs are computational and modeling effort |
| Subjective / objective / pragmatic Bayes | [[Varieties of Bayesian Theory]] | concept | [[Why Bayes - Benefits, Costs, and Borders]] | The book takes a pragmatic, falsificationist stance |
| No assumption-free method | [[There Is No Safe Haven]] | concept | [[Varieties of Bayesian Theory]] | Every method encodes assumptions; the choice is whether they are explicit |
| **Figure 2.1 master workflow diagram** | [[From Inference to Data Analysis to Workflow]] | concept | [[Why Bayes - Benefits, Costs, and Borders]] | Inference ⊂ data analysis ⊂ workflow; transcribed as mermaid |
| Four modeling scenarios | [[Four Modeling Scenarios]] | definition | [[From Inference to Data Analysis to Workflow]] | The taxonomy that determines which workflow steps apply |
| Probabilistic programming, Stan | [[Computational Tools and Probabilistic Programming]] | reference | — | The tooling assumed throughout the book |
| Bioassay logistic model | [[Bioassay - A First Probabilistic Program]] | example | [[Computational Tools and Probabilistic Programming]] | A complete first Stan program with prior, fit, and check |
| Full workflow walkthrough | [[Multiple-Choice Exam - A Full Workflow Walkthrough]] | example | all of the above | Every step of Figure 2.1 exercised on one dataset |

## Notes

- [[Why Bayes - Benefits, Costs, and Borders]] — CONTAINS: the benefits/costs ledger; where Bayesian methods stop paying off; Ch. 1.1
- [[Varieties of Bayesian Theory]] — CONTAINS: subjective, objective, and pragmatic Bayes; the book's stated position; Ch. 1.2
- [[There Is No Safe Haven]] — CONTAINS: the argument that all inference is assumption-laden; Ch. 1.3–1.5
- [[From Inference to Data Analysis to Workflow]] — CONTAINS: **Figure 2.1 transcribed as a mermaid diagram**, Figure 2.2, the three nested scopes; Ch. 2.1–2.2
- [[Four Modeling Scenarios]] — CONTAINS: the four-scenario taxonomy and what each implies for workflow; Ch. 2.3–2.5
- [[Computational Tools and Probabilistic Programming]] — CONTAINS: Stan, rstanarm, brms, cmdstanr; the modeled/unmodeled distinction in code; Ch. 3.1–3.4
- [[Bioassay - A First Probabilistic Program]] — CONTAINS: full Stan program, prior specification, posterior summary; Figures 3.1, 3.2; Ch. 3.5–3.6
- [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — CONTAINS: 16 figures' worth of a single problem carried through prior predictive checking, fitting, diagnostics, posterior predictive checking, expansion, and comparison; Ch. 4

## Sources
- [[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]] — Chapters 1–4, pp. 3–60

## See Also
- [[Building Models/_Index|Building Models]] — where the workflow goes next
- [[Bayesian Workflow Book - Overview]] — the book's routing index
- [[Statistical and Computational Workflow for Bayesians and Non-Bayesians]] — the non-Bayesian translation of these foundations
