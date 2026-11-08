---
title: "Index: Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Decisions and Value of Information]]"
date_updated: 2026-11-08
concept_count: 9
---

# Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes

> [!abstract] Routing Summary
> Fully captures Krause, Singh and Guestrin (2008), JMLR 9:235-284: mutual-information sensor placement in GPs, NP-completeness, submodularity, the $(1-1/e)$ greedy guarantee, online bounds, lazy evaluation, local kernels, robustness, counterexamples for competing criteria, and the experiments. 9 notes.
> - Need the paper on one page or the section-to-note map, or the PyMC examples E89, E92, E100? -> [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
> - Need GP conditioning formulas, noise, or nonstationarity? -> [[Krause 2008 - GP Model and Posterior Variance]]
> - Need entropy versus mutual information, Theorem 1, Theorem 2? -> [[Krause 2008 - Entropy versus Mutual Information Criteria]]
> - Need the greedy rule, Lemma 3, Lemma 5, Theorem 7, or code? -> [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]
> - Need cost-aware greedy, the online bound, or the MIP? -> [[Krause 2008 - Costs, Online Bounds and Exact Optimisation]]
> - Need lazy greedy or local-kernel speedups (Theorem 9)? -> [[Krause 2008 - Lazy Evaluation and Local Kernels]]
> - Need robustness to node failure or kernel uncertainty? -> [[Krause 2008 - Robust Placements]]
> - Need related work, Remarks 12-14, or future work? -> [[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]]
> - Need the datasets and experimental findings? -> [[Krause 2008 - Experiments and Empirical Findings]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| GP conditional (Eqs. 1-2) | [[Krause 2008 - GP Model and Posterior Variance]] | theorem | [[Gaussian Process Regression]] | variance independent of observed values |
| Entropy criterion | [[Krause 2008 - Entropy versus Mutual Information Criteria]] | definition | GP posterior | border placement; NP-complete (Thm 1) |
| Mutual information criterion | [[Krause 2008 - Entropy versus Mutual Information Criteria]] | definition | entropy | $I(X_A;X_{V\setminus A})$; NP-complete (Thm 2) |
| Greedy gain Eq. (6) | [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] | definition | MI | $H(y\mid A)-H(y\mid\bar A)$ |
| Submodularity of MI (Lemma 3) | [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] | theorem | information never hurts | diminishing returns |
| Approximate monotonicity (Lemma 5, Cor. 6) | [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] | theorem | noise $\sigma^2>0$, fine mesh | $\varepsilon$-monotone up to $2k$ |
| Main guarantee (Thm 7) | [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] | theorem | Lemma 3, 5, Nemhauser | $(1-1/e)(\text{OPT}-k\varepsilon)$ |
| Budgeted greedy | [[Krause 2008 - Costs, Online Bounds and Exact Optimisation]] | definition | Thm 7 | benefit-cost ratio with triple enumeration |
| Online bound (Prop. 8) | [[Krause 2008 - Costs, Online Bounds and Exact Optimisation]] | theorem | submodularity | OPT $\le MI(A_k)+\sum\delta_{(i)}+k\varepsilon$ |
| MIP | [[Krause 2008 - Costs, Online Bounds and Exact Optimisation]] | definition | submodularity | exact optimum, constraint generation |
| Lazy greedy (Alg. 2) | [[Krause 2008 - Lazy Evaluation and Local Kernels]] | definition | submodularity | 7125 to 1172 MI evaluations |
| Local kernels (Alg. 3, Thm 9) | [[Krause 2008 - Lazy Evaluation and Local Kernels]] | theorem | compact support | time $O(nd^3+nk+kd^4)$ |
| Robust MI (Props 10-11) | [[Krause 2008 - Robust Placements]] | theorem | submodular closed under expectation | $\mathbb{E}[MI]\ge\rho\,MI(B)$ |
| Remarks 12-14 | [[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]] | theorem | competing criteria | entropy non-monotone; IG, A/D/E not submodular |
| Experiments | [[Krause 2008 - Experiments and Empirical Findings]] | example | all | MI > entropy, A/D/E, disk |

## Notes

- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]] — CONTAINS: question, contributions, motivating examples E89/E92/E100, Source Map.
- [[Krause 2008 - GP Model and Posterior Variance]] — CONTAINS: GP definition, Eqs. (1)-(2), noise, stationarity, nonstationary estimation, code, PyMC sketch.
- [[Krause 2008 - Entropy versus Mutual Information Criteria]] — CONTAINS: entropy criterion, Thm 1, MI criterion, Thm 2 with proof sketch, boundary problem, 1-D example.
- [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]] — CONTAINS: Algorithm 1, Lemma 3 proof, Thm 4, Lemma 5 proof sketch, Cor. 6, Thm 7, verified Python.
- [[Krause 2008 - Costs, Online Bounds and Exact Optimisation]] — CONTAINS: budgeted greedy, Prop. 8, MIP.
- [[Krause 2008 - Lazy Evaluation and Local Kernels]] — CONTAINS: Algorithms 2-3, Storkey kernel, Thm 9, empirical speedups.
- [[Krause 2008 - Robust Placements]] — CONTAINS: $MI_R$, Props 10-11, $MI_M$.
- [[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]] — CONTAINS: disk model, Remarks 12-14 with verified counterexamples, future work, conclusions.
- [[Krause 2008 - Experiments and Empirical Findings]] — CONTAINS: datasets, section-by-section findings, runtimes.

## Sources
- [[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]] — JMLR 9 (2008) 235-284, 50 pages, open access at jmlr.org.

## See Also
- [[Expected Information Gain]], [[Bayesian Experimental Design - Overview]], [[Bayesian Optimisation]], [[Acquisition Functions]], [[Gaussian Process Regression]], [[Hilbert Space Gaussian Processes]].
- [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]]
