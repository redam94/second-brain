---
title: "Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/overview
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Whole paper, JMLR 9:235-284 (50 pp.)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Gaussian Process Regression]]"
  - "[[Expected Information Gain]]"
used_by:
  - "[[Krause 2008 - GP Model and Posterior Variance]]"
  - "[[Krause 2008 - Entropy versus Mutual Information Criteria]]"
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
aliases:
  - Krause Singh Guestrin 2008
  - Near-optimal sensor placement
---

# Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview

> [!summary]
> Krause, Singh and Guestrin (JMLR 9, 2008) choose $k$ sensor locations in a Gaussian-process (GP) field by maximising the **mutual information** $I(X_A;X_{V\setminus A})$ between the sensed and unsensed locations. The problem is NP-complete, but mutual information is submodular and approximately monotone, so the simple greedy rule achieves at least $(1-1/e)(\text{OPT}-k\varepsilon)$. Lazy evaluation and local kernels make it scale, and experiments show it beats the disk model, entropy and classical A/D/E-optimal design.

## Overview

**Research question.** Where should a limited number of sensors go so that readings at the chosen sites predict the field everywhere else?

**Contributions** (Sec. 1): (1) maximise Caselton and Zidek's (1984) mutual-information criterion and show it beats entropy and classical criteria; (2) prove NP-completeness but give a polynomial-time constant-factor $(1-1/e)$ algorithm; (3) online bounds usable for branch and bound and for any other heuristic; (4) lazy evaluations and local-kernel truncation for speed with provable cost; (5) robustness to node failure and model uncertainty; (6) extensive experiments on temperature (Intel Berkeley lab, 54 nodes) and Pacific Northwest precipitation (167 regions).

**Key results.** Theorem 2 (NP-completeness), Lemma 3 (submodularity), Lemma 5 and Corollary 6 (approximate monotonicity from fine discretisation), Theorem 7 ($(1-1/e)(\text{OPT}-k\varepsilon)$), Proposition 8 (online bound), Theorem 9 (local-kernel guarantee), Proposition 10 and 11 (robustness), Remarks 12-14 (why entropy, information gain and classical A/D/E-optimality lack these guarantees).

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E89 - Where should the next air monitors go?** Marginal Matern GP with known measurement error, exact county conditionals, closed-form EVSI checked by brute force, **lazy greedy** site selection and "simulated joint value against summed gains" (a test of the submodular diminishing-returns story).
- **E92 - Where should the next Argo floats go? An exact Gaussian process that did not earn its price.** Same siting question on a space-time GP with 23,939 points; the cost trade-off is discussed in [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]].
- **E100 - Acting on a noisy belief: an adaptive radiation survey** uses an HSGP field and UCB-style acting; see [[Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief]].

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, 1 Introduction | Problem, contributions, Fig. 1 (Intel lab) | this note |
| 2.1-2.3 Multivariate normal, GPs, nonstationarity | Eqs. (1)-(2), kernels, Nott-Dunsmuir nonstationary estimate | [[Krause 2008 - GP Model and Posterior Variance]] |
| 3.1 Entropy criterion | Eqs. (3)-(5), Theorem 1 (Ko et al.), greedy entropy, boundary problem | [[Krause 2008 - Entropy versus Mutual Information Criteria]] |
| 3.2 Mutual information | Caselton-Zidek criterion, Fig. 4, Theorem 2, Fig. 5 | [[Krause 2008 - Entropy versus Mutual Information Criteria]] |
| 4.1 Algorithm | Greedy rule Eq. (6), Algorithm 1 | [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] |
| 4.2 Approximation bound | Lemma 3, Theorem 4, Lemma 5, Corollary 6, Theorem 7, Fig. 6 | [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] |
| 4.3-4.5 Costs, online bounds, MIP | budgeted greedy, Proposition 8, branch and bound, Figs 5, 7 | [[Krause 2008 - Costs, Online Bounds and Exact Optimisation]] |
| 5.1-5.2 Lazy evaluation, local kernels | Algorithms 2-3, Theorem 9, Fig. 8 | [[Krause 2008 - Lazy Evaluation and Local Kernels]] |
| 6.1-6.2 Robustness | $MI_R$, Propositions 10-11, model uncertainty $MI_M$ | [[Krause 2008 - Robust Placements]] |
| 7 Related work; 8 Notes (disk model, entropy, information gain, experimental design) | Remarks 12-14, counterexamples | [[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]] |
| 9.1-9.7 Experiments | datasets, stationary vs nonstationary, disk, entropy, A/D/E, greedy vs heuristics, lazy, local kernels | [[Krause 2008 - Experiments and Empirical Findings]] |
| 10 Future work; 11 Conclusions | sequential designs, submodular cost, constrained placements | [[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]] |
| Appendix A | Proofs of Theorem 2, Lemma 5, Corollary 6, Theorem 7, Remark 12 | proof sketches in [[Krause 2008 - Entropy versus Mutual Information Criteria]] and [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] |

## Examples

Greedy mutual-information versus greedy entropy on a 1-D grid is worked, with runnable code and output, in [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]].

## Connections

- Relevance to marketing measurement: choosing which geos or markets to measure (or in which to run lift tests) so that the measured set informs unmeasured ones is the same selection problem; a GP over geos or time with a noise term is the model, and mutual information is the "variance of everything else" objective. The paper does not discuss marketing.
- Active learning link: [[Expected Information Gain]], [[Bayesian Experimental Design - Overview]], [[Bayesian Optimisation]], [[Acquisition Functions]].
- Base model: [[Gaussian Process Regression]]; scalable fields: [[Hilbert Space Gaussian Processes]].

## See Also
- [[Research/Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes/_Index|Index for this source]]
- [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]]
