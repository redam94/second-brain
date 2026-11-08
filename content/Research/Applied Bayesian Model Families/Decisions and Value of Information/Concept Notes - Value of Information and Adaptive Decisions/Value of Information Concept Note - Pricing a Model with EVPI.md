---
title: "Value of Information Concept Note - Pricing a Model with EVPI"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (cites the literature listed under Sources)"
source_location: "Literature synthesis (see Sources)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions"
doc_type: paper
depends_on:
  - "[[Value of Information Concept Note - EVPI, EVPPI and EVSI]]"
used_by:
  - "[[Research/Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions/_Index|Index for this source]]"
aliases:
  - Pricing a model before you buy it
  - Model price versus value of information
---

# Value of Information Concept Note - Pricing a Model with EVPI

> [!summary]
> Concept note, no raw source. A better model or forecast is an information purchase, so its worth is capped by EVPI and measured by EVSI of what it would tell you; buy it only if that value exceeds its price. The price of a model is itself computable: compute, memory and precision costs scale in known ways. E87 pairs the two sides of the ledger.

## Overview

E87 (**Pricing a model: should a charity buy a flight-level forecast?**) uses flight on-time performance data (14,080,680 rows reduced to 494,547 flight x month cells). Per its listed methods the price is built as "rate x gradients + memory + precision", with an iso-cost map, GPU and CPU rates by cost shape, a gather and scatter timed on real indices, and float32 spacing and VRAM grids. This note supplies the value side from the VoI literature. (Details of E87 beyond those listed in the example index are not reproduced here.)

## Main Content

> [!definition] Decision rule for buying a model
> Let $V_0=\max_a\mathbb{E}U(a)$ be the value of deciding with current information. Let $\text{EVSI}(M)$ be the expected gain from acting on the output of model or forecast $M$ and $\text{price}(M)$ its full cost (build, compute, maintenance). Buy $M$ iff $\text{EVSI}(M)-\text{price}(M)>0$. Always $\text{EVSI}(M)\le\text{EVPI}$, so if $\text{price}(M)\ge\text{EVPI}$ no model can be worth it.
^def-model-purchase-rule

> [!theorem] Price ceiling
> If $\text{EVPI}<\text{price}$ then every model, forecast or study is dominated by deciding now. *Proof.* By the hierarchy theorem in [[Value of Information Concept Note - EVPI, EVPPI and EVSI]], any information source has value at most EVPI.
^thm-price-ceiling

**Pricing the compute side (standard arithmetic).** Rough cost of a Bayesian fit $\approx$ (number of gradient evaluations) x (cost per gradient). Dense linear algebra of size $n$ costs $O(n^3)$ time and $O(n^2)$ memory; a float32 dense $n\times n$ matrix needs $4n^2$ bytes. Quantities such as these determine whether a fit runs on a CPU, a GPU, or not at all (see [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]]).

**Accuracy side.** A forecast does not remove uncertainty fully; its value depends on how far it moves the posterior mean across the decision threshold, as in the normal closed form where EVSI depends on $\tau=\sqrt{s_0^2-s_1^2}$.

## Examples

With the verified numbers of the sibling note: prior incremental net benefit $N(0.3,0.5)$ and EVPI $=0.157$ in units of net benefit. A forecast equivalent to 4 observations of noise variance 1 is worth 0.111 (71% of EVPI). If it costs 0.08 in the same units, ENBS $=0.031>0$ and it is worth buying; one costing 0.12 is not, whatever its technical merits. A forecast equivalent to 16 observations is worth 0.142, so a price of 0.12 would then pay.

PyMC-style sketch (untested): evaluate $\text{price}(M)$ from timing a fixed number of gradient evaluations (`pm.sample` with `tune=0`, `draws=20` and `idata.sample_stats`), multiply by the planned number of evaluations and a unit rate, then compare to EVSI estimated by the regression method.

## Connections
- Marketing: a model upgrade (a hierarchical MMM, a geo-level model, a nowcast) is a purchase; EVPI of the budget decision, using the current posterior, bounds how much to spend before asking whether the allocation could change.
- Heath et al.'s case study ranks parameters by EVPPI so you know *which* input a better model should improve: [[Heath 2015 - Influenza Vaccine Case Study and Table 1]].

## See Also
- [[Value of Information Concept Note - EVPI, EVPPI and EVSI]], [[Decision Analysis]]

## Sources
- Decision-theoretic framework: Raiffa and Schlaifer (1961). E87 methods as listed at <https://redam94.github.io/pymc-challenges/examples.html>. Arithmetic for dense matrices is standard.
