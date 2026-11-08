---
title: "Index: Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 18
---

# Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy

> [!abstract] Routing Summary
> This folder fully captures Wasserman and Zhou (2010), *A Statistical Framework for Differential Privacy* (JASA 105(489); arXiv:0811.2501v2): differential privacy as a constraint on hypothesis tests, an inconsistency theorem, and rates of convergence for private histogram, exponential-mechanism and orthogonal-series density estimators, with both results tables, the simulation and the open questions. 8 notes cover every section, theorem, proof outline and the figure (re-run with code).
> - Need the paper on one page, headline results table or the section-to-note map? -> [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]]
> - Need the setup (data release mechanism $Q_n$, $\alpha$-DP definition, exponential mechanism definition, closure Lemma 2.6)? -> [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]
> - Need DP as a bound on testing power ($1-\beta\le e^{\alpha}\gamma$) and Bayes factors? -> [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]]
> - Need consistency, $\epsilon_n$-informativeness and the point-mass inconsistency theorem? -> [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]]
> - Need smoothed and perturbed histograms (Thm. 4.1-4.4), their rates and proofs? -> [[Wasserman Zhou 2010 - Histogram Release Mechanisms]]
> - Need the small-ball-probability accuracy bound and the $n^{-1/3}$ KS rate? -> [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]
> - Need Sobolev density estimation, private orthogonal series, Thm. 6.2-6.3? -> [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]]
> - Need both rate tables, the Beta(10,10) simulation or the open questions? -> [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Data release mechanism $Q_n$; sanitized database | [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] | definition | none | conditional law of $Z$ given $X$ |
| $\alpha$-differential privacy (Def. 2.3) | [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] | definition | Hamming distance | $Q_n(B\mid x)/Q_n(B\mid y)\le e^{\alpha}$ |
| Exponential mechanism (eq. 2) | [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] | definition | $\xi$, $\Delta_{n,k}$ | density $\propto e^{-\alpha\xi/2\Delta}$ |
| Closure facts (Lemma 2.6) | [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] | theorem | Def. 2.3 | postprocessing; i.i.d. resampling free for any $k$; Laplace |
| Testing-power bound (Thm. 2.4) | [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]] | theorem | Neyman-Pearson | power $\le\gamma e^{\alpha}$ |
| Consistency, $\epsilon_n$-informative (Def. 3.1) | [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]] | definition | $\rho$ | $\rho(F,\hat F_Z)=O_P(\epsilon_n)$ |
| Inconsistency for point masses (Thm. 3.2) | [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]] | theorem | Def. 2.3 | no DP mechanism consistent in KS uniformly |
| Smoothed histogram (Thm. 4.1) | [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] | theorem | histogram | DP iff $k\ln(\frac{(1-\delta)m}{n\delta}+1)\le\alpha$ |
| Smoothed histogram rates (Thm. 4.2, 4.3) | [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] | theorem | Thm. 4.1 | KS $\sqrt{\log n}\,n^{-2/(6+r)}$; $L_2$ $n^{-2/(2r+3)}$ |
| Perturbed histogram (Thm. 4.4) | [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] | theorem | Laplace | $L_2$ minimax rate $n^{-2/(2+r)}$ |
| KS sensitivity (Lemma 5.1) | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] | theorem | triangle inequality | $\Delta_{n,k}\le1/n$ |
| Small ball probability $R(k,\epsilon)$ (Def. 5.2) | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] | definition | empirical cdf | $P^k(\rho(F,\hat G)\le\epsilon)$ |
| Exponential-mechanism accuracy (Thm. 5.3) | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] | theorem | Def. 5.2 | $\le(\sup p)^ke^{-3\alpha\epsilon_n/16\Delta}/R+O(n^{-c})$ |
| KS rate $n^{-1/3}$ (Thm. 5.4) | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] | theorem | Thm. 5.3 | $k_n\asymp n^{2/3}$, $\epsilon_n\asymp n^{-1/3}$ |
| Private mean | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] | example | Thm. 5.3 | $k=1$ suffices |
| Sobolev ellipsoid; series sensitivity (Lemma 6.1) | [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]] | theorem | basis bound $c_0$ | $\Delta\le2c_0^2m_n/n$ |
| Series exponential mechanism (Thm. 6.2) | [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]] | theorem | Lemma 6.1 | $n^{-\gamma/(2\gamma+1)}$ |
| Perturbed series (Thm. 6.3) | [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]] | theorem | Laplace | minimax $n^{-2\gamma/(2\gamma+1)}$ |
| Rate tables, simulation | [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]] | example | all of the above | only perturbation under $L_2$ is minimax; error depends on $n\alpha$ |

## Notes

- [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]] — CONTAINS: question, five contributions, Table 1, complete Source Map, marketing-measurement angle.
- [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] — CONTAINS: literature context, setup, $Q_n$, Example 2.1, Def. 2.2-2.3, exponential mechanism definition, Thm. 2.5, Lemma 2.6 + proof.
- [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]] — CONTAINS: Thm. 2.4 + proof, Bayes factor remark (checked), tightness via randomized response, ROC reading.
- [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]] — CONTAINS: Def. 3.1, alternatives to $\rho(F,\hat F_Z)$, Thm. 3.2 + proof, interpretation.
- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] — CONTAINS: Lipschitz class, histogram estimator, smoothed histogram Thm. 4.1-4.3 + proofs (with the printed $\delta$ exponent discrepancy), perturbed histogram Thm. 4.4 + proof, Dirichlet comparison, $k_{\max}$ table, code.
- [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] — CONTAINS: general exponential mechanism, Lemma 5.1, Def. 5.2, Thm. 5.3 + proof, Thm. 5.4 + proof outline, private mean, design constants.
- [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]] — CONTAINS: Sobolev setup, Lemma 6.1, Thm. 6.2 + proof outline (Berry-Esseen, $\chi^2$ tail, Lemma 9.3), perturbed estimator, Thm. 6.3, factor-2 notes, code.
- [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]] — CONTAINS: Tables 1-2, derived exponents by dimension, Figure 1 values, own re-run, $n\alpha$ observation, open questions 1-4.

## Sources

- [[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]] — Wasserman L, Zhou S (2010), JASA 105(489); arXiv:0811.2501v2, 42 pages; the sole source for all notes.

## See Also

- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]] — origin of the Laplace mechanism used in the perturbed releases.
- [[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]] — exponential mechanism proof and composition.
- [[Nonparametric Models Overview]], [[Power Analysis and Sample Size]], [[Geo-Experiment Design and Power Analysis]] — statistical and measurement context.
