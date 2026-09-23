---
title: "Index: Simulation-Based Calibration"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Bayesian Statistics/Workflow/_Index|Bayesian Workflow]]"
date_updated: 2026-08-18
concept_count: 1
---

# Simulation-Based Calibration

> [!abstract] Routing Summary
> Chapter 14 of [[Bayesian Workflow Book - Overview|Gelman, Vehtari & McElreath (2026)]] — SBC as an integrated workflow step rather than a standalone validation ritual. 1 note here; the **theory** lives in the Talts et al. (2018) notes at the parent folder level and the **worked debugging session** lives in Case Studies.
> - Need **SBC's place in the workflow, the $\gamma$ metric, and when to run it**? → [[SBC in the Workflow]]
> - Need the **foundational identity** (prior = data-averaged posterior)? → [[Data-Averaged Posterior Self-Consistency]]
> - Need the **rank statistic and uniformity theorem**? → [[Rank Statistics and Uniformity]]
> - Need the **step-by-step algorithm**? → [[The SBC Algorithm]]
> - Need to **read histogram shapes** (∪, ∩, sloped)? → [[Interpreting SBC Histograms]]
> - Need **worked examples from the original paper** (HMC/ADVI/INLA, eight schools)? → [[SBC Case Studies]]
> - Need a **full debugging session with five real bugs**? → [[Simulation-Based Calibration Checking in Model Development Workflow]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| SBC as a workflow step | [[SBC in the Workflow]] | concept | [[The SBC Algorithm]] | Eq. 14.1; Figures 14.1–14.4; the $\gamma$ metric; where SBC fits between model specification and fitting to real data |
| Data-averaged posterior identity | [[Data-Averaged Posterior Self-Consistency]] | theorem | — | $\int p(\theta\mid y)\,p(y)\,dy = p(\theta)$ |
| Rank uniformity | [[Rank Statistics and Uniformity]] | theorem | [[Data-Averaged Posterior Self-Consistency]] | Ranks of prior draws among posterior draws are uniform |
| The algorithm | [[The SBC Algorithm]] | concept | [[Rank Statistics and Uniformity]] | Algorithms 1 and 2 |
| Histogram diagnosis | [[Interpreting SBC Histograms]] | concept | [[The SBC Algorithm]] | ∪ = overdispersed, ∩ = underdispersed, sloped = biased |
| Debugging with SBC | [[Simulation-Based Calibration Checking in Model Development Workflow]] | example | [[SBC in the Workflow]] | Five bugs found; data-only filtering preserves the SBC identity |

## Notes

- [[SBC in the Workflow]] — CONTAINS: Eq. 14.1; Figures 14.1–14.4; the $\gamma$ metric; SBC's cost and when it is worth paying; Ch. 14 of the book

**From Talts et al. (2018), stored one level up** — complementary theory, not superseded:
- [[Simulation-Based Calibration - Overview]] — CONTAINS: the method at a glance
- [[Data-Averaged Posterior Self-Consistency]] — CONTAINS: the foundational identity
- [[Rank Statistics and Uniformity]] — CONTAINS: the uniformity theorem
- [[The SBC Algorithm]] — CONTAINS: Algorithms 1 and 2
- [[Interpreting SBC Histograms]] — CONTAINS: histogram shape diagnosis, autocorrelation handling
- [[SBC Case Studies]] — CONTAINS: HMC/ADVI/INLA comparisons, eight schools

## Sources
- Gelman Vehtari McElreath 2026 - Bayesian Workflow (book) — Chapter 14, pp. 249–254
- 1804.06788-Talts-SBC — the original SBC paper

## See Also
- [[Simulation-Based Calibration Checking in Model Development Workflow]] — Chapter 31, the worked case study
- [[Research/Bayesian Statistics/Workflow/Computational Workflow/_Index|Computational Workflow]] — convergence diagnostics, which SBC complements
- [[Designing Simulated-Data Experiments]] — the broader family of simulated-data checks
