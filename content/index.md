---
title: "Second Brain"
tags:
  - type/index
  - type/vault-root
---

# Second Brain

> [!abstract] About
> A structured knowledge base covering Bayesian statistics, econometrics, causal inference, and agent-based modeling. Notes are cross-linked by topic — use the graph view or search bar to explore connections across the collection.

---

## Selected Analyses

### [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG|How would a geo-holdout experiment be encoded as a design ξ and its EIG computed against an MMM posterior?]]
*July 1, 2026 · Market Response · Bayesian Experimental Design · Bayesian Statistics*

Encode the geo-holdout as a **design vector**  = which geos get their spend perturbed, on which channel(s), by how much, and over which weeks.

---

### [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments|How do adstock/carryover dynamics interact with the timing of sequential media experiments (delayed outcomes)?]]
*July 1, 2026 · Market Response · Bayesian Experimental Design · Bayesian Statistics*

Carryover means an intervention's effect is **spread over future periods**, so a sequential experimentation loop faces **delayed outcomes**: you cannot read a test's result — or start a clean next test — until the adstock has decayed.

---

### [[Q - Continuous Learning in Media Measurement with Interaction Effects|What would continuous learning look like in media measurement, given that media has interaction effects and learning all interactions is costly or needs more cells than available techniques support?]]
*July 1, 2026 · Market Response · Bayesian Experimental Design · Bayesian Statistics · Probabilistic Numerics*

Continuous learning in media measurement is a **closed loop**: a Bayesian *surrogate* of the response surface (a media-mix model or GP) is continually re-fit as data arrive; an **active-experimentation** layer then picks the next spend allocation / geo-test to run by maximizing **expected information gain** about the effects — including interactions — that are still uncertain and decision-relevant.

---

### [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation|When should continuous media learning use Bayesian experimental design vs Bayesian optimization vs a bandit?]]
*July 1, 2026 · Market Response · Bayesian Experimental Design · Probabilistic Numerics · Bayesian Statistics*

All three sit on the *same Bayesian surrogate* of the response surface and differ only in **objective**.

---

### [[Q - Using SMM to Calibrate Agent Based Models|How can SMM be used to calibrate agent based models?]]
*April 11, 2026 · Agent Based Modeling · Calibration · Simulation Estimation · Econometrics*

The Simulated Method of Moments (SMM) calibrates an ABM by choosing structural parameters  to minimize a weighted distance between observed macro-level data moments and their simulated counterparts produced by running the ABM at .

---


## Knowledge Base

| Domain | Core Topics |
|--------|-------------|
| [[Research/Bayesian Statistics/_Index\|Bayesian Statistics]] | Inference fundamentals, hierarchical models, MCMC, model checking |
| [[Research/Econometrics/_Index\|Econometrics]] | Identification strategies, regression foundations, simulation-based estimation |
| [[Research/Agent-Based Modeling/_Index\|Agent-Based Modeling]] | Calibration methods, social dynamics, consumer behavior |
| [[Research/Research Methodology/_Index\|Research Methodology]] | Experimental design, multiple comparisons, causal reasoning |

Browse the full collection via the **search bar** or explore topic connections in the **graph view**.
