---
title: "Index: Concept Notes - Value of Information and Adaptive Decisions"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Decisions and Value of Information]]"
date_updated: 2026-11-08
concept_count: 6
---

# Concept Notes - Value of Information and Adaptive Decisions

> [!abstract] Routing Summary
> Six concept notes (no raw source; each cites the literature) tying the ingested papers to the PyMC examples E87, E89, E92, E100 and E16: EVSI and the VoI hierarchy, pricing a model, EVSI-based monitor siting with known measurement error, when an exact GP earns its price, adaptive sampling on a noisy belief, and choosing an uncertainty display.
> - Need EVPI, EVPPI, EVSI definitions or the normal closed form? -> [[Value of Information Concept Note - EVPI, EVPPI and EVSI]]
> - Need to decide whether a model or forecast is worth buying (E87)? -> [[Value of Information Concept Note - Pricing a Model with EVPI]]
> - Need EVSI of a monitor reading with known error (E89)? -> [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]]
> - Need cost arithmetic and a decision test for exact versus approximate GPs (E92)? -> [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]]
> - Need UCB, Thompson sampling or replay evaluation for adaptive surveys (E100)? -> [[Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief]]
> - Need which uncertainty display fits which question (E16)? -> [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| VoI hierarchy | [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] | theorem | [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]] | $0\le\text{EVSI}\le\text{EVPPI}\le\text{EVPI}$ |
| EVSI normal closed form | [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] | theorem | hierarchy | $\tau\varphi(m/\tau)+m\Phi(m/\tau)-\max(m,0)$ |
| Model purchase rule | [[Value of Information Concept Note - Pricing a Model with EVPI]] | definition | EVSI | buy iff EVSI exceeds price |
| Site EVSI | [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]] | theorem | normal closed form, GP posterior | largest near threshold and large variance shrink |
| Exact-vs-approximate criterion | [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]] | theorem | GP cost | decision regret vs price gap |
| Adaptive policy | [[Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief]] | definition | acquisition functions | adaptivity free when variance-only and kernel known |
| Epistemic vs predictive band | [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]] | definition | posterior predictive | band is not a set of curves |

## Notes

- [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] — CONTAINS: EVPI/EVPPI/EVSI definitions, hierarchy proof sketch, normal closed form with verified table, Python, ENBS.
- [[Value of Information Concept Note - Pricing a Model with EVPI]] — CONTAINS: model-purchase rule, price ceiling theorem, compute arithmetic, worked ENBS example.
- [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]] — CONTAINS: kriging with noise, site EVSI formula, greedy and submodularity caveat, verified example.
- [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]] — CONTAINS: cost arithmetic for n=23,939, alternatives, decision-regret criterion.
- [[Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief]] — CONTAINS: UCB, Thompson, adaptivity result, replay evaluation.
- [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]] — CONTAINS: question-to-display table, epistemic vs predictive, band-vs-curve theorem.

## Sources
- No raw PDFs. Literature cited inside each note (several citations from memory and marked "verify"). Example method strings from <https://redam94.github.io/pymc-challenges/examples.html>.

## See Also
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]], [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]], [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]], [[Kay 2016 - When-ish is My Bus - Overview]], [[Hullman 2015 - Hypothetical Outcome Plots - Overview]].
