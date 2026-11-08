---
title: "Index: Decisions and Value of Information"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 37
---

# Decisions and Value of Information

> [!abstract] Routing Summary
> This cluster covers turning posteriors into decisions: EVPI/EVPPI/EVSI, decision curves and net benefit, mutual-information sensor placement with GPs, adaptive sampling, and communicating uncertainty (quantile dotplots, hypothetical outcome plots). It has 6 sub-folders and 37 notes, written to cover the methods used in the PyMC worked examples E16, E87, E89, E90, E91, E92, E100 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Heath 2015: [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
> - Hullman 2015: [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
> - Kay 2016: [[Kay 2016 - When-ish is My Bus - Overview]]
> - Krause 2008: [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
> - Vickers 2019: [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]
^routing-summary

## Sub-topics

- [[Concept Notes - Value of Information and Adaptive Decisions/_Index|Concept Notes - Value of Information and Adaptive Decisions]] (6 notes) — COVERS: Concept notes: [[Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief]], [[Value of Information Concept Note - EVPI, EVPPI and EVSI]], [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]], [[Value of Information Concept Note - Pricing a Model with EVPI]], [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]], [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]]
- [[Heath 2015 - Review of Expected Value of Information Methods/_Index|Heath 2015 - Review of Expected Value of Information Methods]] (7 notes) — COVERS: Heath, Manolopoulou and Baio (2015, arXiv:1507.02513) review how to compute the **Expected Value of Partial Perfect Information (EVPPI)** from a probabilistic sensitivity analysis (PSA) sample. Four post-2007 methods (Strong-Oakley, Sadatsafavi et al., GAM regression, Gaussian-process regression) all agree with a 55-minute-per-parameter nested Monte Carlo benchmark, and the regression methods win…
- [[Hullman 2015 - Hypothetical Outcome Plots/_Index|Hullman 2015 - Hypothetical Outcome Plots]] (6 notes) — COVERS: Hullman, Resnick and Adar (PLoS ONE 2015, CC BY) introduce **Hypothetical Outcome Plots (HOPs)**, animations that show one draw per frame from a distribution, and test them against error bars and violin plots on 288 Mechanical Turk participants. For questions about two or three variables (for example Pr(B > A)), HOPs have far lower mean absolute error (about 0.09-0.14 versus 0.35-0.63); for one…
- [[Kay 2016 - When-ish is My Bus/_Index|Kay 2016 - When-ish is My Bus]] (5 notes) — COVERS: Kay, Kola, Hullman and Munson (CHI 2016) design and test uncertainty displays for real-time bus predictions on a phone. They introduce the **quantile dotplot** (a dotplot of evenly spaced quantiles of the predictive distribution), and in a controlled experiment with 541 participants find that a 20-dot version reduces the standard deviation of probability estimates by about 1.15 times relative to…
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes/_Index|Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes]] (9 notes) — COVERS: Krause, Singh and Guestrin (JMLR 9, 2008) choose $k$ sensor locations in a Gaussian-process (GP) field by maximising the **mutual information** $I(X_A;X_{V\setminus A})$ between the sensed and unsensed locations. The problem is NP-complete, but mutual information is submodular and approximately monotone, so the simple greedy rule achieves at least $(1-1/e)(\text{OPT}-k\varepsilon)$. Lazy…
- [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis/_Index|Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis]] (4 notes) — COVERS: Vickers, Van Calster and Steyerberg (2019, *Diagnostic and Prognostic Research* 3:18, open access CC BY 4.0) explain decision curve analysis (DCA), introduced by Vickers and Elkin (2006), by relabelling its axes: y is **benefit** and x is **preference**. A model or test is worth using if it has the highest net benefit across the range of clinically reasonable preferences. Key takeaway: net…

## Motivating PyMC examples

E16, E87, E89, E90, E91, E92, E100 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]
- [[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]
- [[raw/Kay Kola Hullman Munson 2016 - When (ish) is My Bus.pdf]]
- [[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]
- [[raw/Vickers Van Calster Steyerberg 2019 - A Simple Step-by-Step Guide to Interpreting Decision Curve Analysis.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
