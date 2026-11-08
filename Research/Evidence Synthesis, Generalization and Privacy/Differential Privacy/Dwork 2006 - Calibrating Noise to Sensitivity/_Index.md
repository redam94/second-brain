---
title: "Index: Dwork 2006 - Calibrating Noise to Sensitivity"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 16
---

# Dwork 2006 - Calibrating Noise to Sensitivity

> [!abstract] Routing Summary
> This folder fully captures Dwork, McSherry, Nissim and Smith (2006), *Calibrating Noise to Sensitivity in Private Data Analysis* (TCC 2006; J. Privacy and Confidentiality 7(3):17-51, 2016-17 reprint): the founding paper of differential privacy. It defines $\varepsilon$-DP, proves the Laplace mechanism (non-adaptive and adaptive), computes sensitivities of histograms, covariance and sampled functions, generalises to metric spaces, and proves interactive/non-interactive separation. 9 notes cover every section, theorem, proof and example.
> - Need the paper on one page, headline results, or the section-to-note map? -> [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]]
> - Need the pre-DP history (Dinur-Nissim, SuLQ, $k$-anonymity), the contributions list or the smoker example? -> [[Dwork 2006 - Motivation, Contributions and Related Work]]
> - Need the definition of $\varepsilon$-DP, neighbours, randomized response, Laplace count, or why total variation fails? -> [[Dwork 2006 - Differential Privacy Definition and Basic Examples]]
> - Need postprocessing, composition (simple and adaptive with budget), group privacy proofs, or the hypothesis-testing interpretation (Eq. 3)? -> [[Dwork 2006 - Postprocessing, Composition and Group Privacy]]
> - Need global $\ell_1$ sensitivity, the Laplace mechanism theorem and proof, or the adaptive version (Thm. 3.4)? -> [[Dwork 2006 - Sensitivity and the Laplace Mechanism]]
> - Need sensitivity of histograms, mean and covariance (the $3\varepsilon$ mechanism), distance-from-property, or Lemma 3.5? -> [[Dwork 2006 - Low-Sensitivity Functions and Applications]]
> - Need noise for non-numeric outputs, the precursor of the exponential mechanism (Thm. 3.7), or the survey of later work? -> [[Dwork 2006 - Sensitivity in General Metric Spaces]]
> - Need the impossibility results for non-interactive and local release (Thm. 4.1, Prop. 4.2)? -> [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]
> - Need the hybrid argument, Lemma 4.3 and Claim 4.4 proofs? -> [[Dwork 2006 - Proof of the Separation Lemma]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Neighbouring datasets, set-difference metric | [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] | definition | histogram representation | neighbours at $\ell_1$ distance 1; Hamming costs factor 2 |
| $\varepsilon$-differential privacy (Def. 2.1, 2.3) | [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] | definition | neighbours | $\Pr(\mathcal{M}(x)\in S)\le e^{\varepsilon}\Pr(\mathcal{M}(x')\in S)$ |
| Randomized response (Example 1) | [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] | example | Def. 2.1 | $\varepsilon$-DP; sd $\Theta(\sqrt n/\varepsilon)$ |
| Total variation is insufficient (Example 3) | [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] | example | Def. 2.1 | subsampling has SD $\varepsilon$ yet is not DP |
| Closure under postprocessing (Prop. 2.4) | [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] | theorem | Def. 2.1 | $g\circ\mathcal{M}$ is $\varepsilon$-DP |
| Composition (Lemmas 2.5, 2.6) | [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] | theorem | Def. 2.1 | $\varepsilon=\sum\varepsilon_i$, even adaptively |
| Group privacy (Def. 2.7, Lemma 2.8) | [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] | theorem | Def. 2.1 | $(1,\varepsilon/k)\Rightarrow(k,\varepsilon)$ |
| $\ell_1$ sensitivity (Def. 3.1) | [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] | definition | neighbours | $S(f)=\sup\|f(x)-f(x')\|_1$ |
| Laplace mechanism (Prop. 3.3) | [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] | theorem | $S(f)$ | $f(x)+\mathrm{Lap}(S(f)/\varepsilon)^d$ is $\varepsilon$-DP |
| Adaptive Laplace mechanism (Thm. 3.4) | [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] | theorem | Prop. 3.3 | $\mathrm{Lap}(T/\varepsilon)$ while joint $S\le T$ |
| Disjoint analyses; distance from property | [[Dwork 2006 - Low-Sensitivity Functions and Applications]] | theorem | Def. 3.1 | $S(f)\le\max_iS(f_i)$, dimension-free |
| Private mean and covariance | [[Dwork 2006 - Low-Sensitivity Functions and Applications]] | example | composition | $3\varepsilon$-DP; noise gains $\sqrt d$ and $d$ |
| Lemma 3.5 (low sample complexity) | [[Dwork 2006 - Low-Sensitivity Functions and Applications]] | theorem | Def. 3.1 | $S(f)\le2\sigma$ |
| Metric-space sensitivity, Thm. 3.7 | [[Dwork 2006 - Sensitivity in General Metric Spaces]] | theorem | triangle inequality | sampling $\propto e^{-\varepsilon d_Z/2S_Z}$ is $\varepsilon$-DP |
| Non-interactive separation (Thm. 4.1, Prop. 4.2) | [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] | theorem | Obs. 1 | needs $n=2^{\Omega(d)}$-scale databases |
| Lemma 4.3, Claim 4.4, hybrid argument | [[Dwork 2006 - Proof of the Separation Lemma]] | theorem | pairwise independence | $\mathrm{SD}=O((\varepsilon^2/\alpha2^d)^{1/3})$ |

## Notes

- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]] — CONTAINS: research question, contributions, key-results table, full Source Map (every section to note), marketing-measurement angle.
- [[Dwork 2006 - Motivation, Contributions and Related Work]] — CONTAINS: setting, noisy-sum precursors, contributions 1-4, the smoker example, related-work table (Agrawal-Srikant, Evfimievski, Dinur-Nissim, $k$-anonymity), discussion (OnTheMap, RAPPOR).
- [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] — CONTAINS: Def. dataset/neighbours, Remark 2.1 (Hamming factor 2), Def. 2.1, 2.2, 2.3, Examples 1-3 with derived estimator variance, nonnegligible-leakage argument, Python.
- [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] — CONTAINS: Prop. 2.4 + proof, Lemmas 2.5, 2.6 + proof, Def. 2.7, Lemma 2.8 + proof, Sec. 2.2 interpretations (hypothesis-testing Eq. 3, game-theoretic, variants), budgeted-curator Python.
- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] — CONTAINS: Def. 3.1, Example 4, Def. 3.2, Prop. 3.3 + proof, Thm. 3.4 + proof, accuracy corollary, density-ratio Python check.
- [[Dwork 2006 - Low-Sensitivity Functions and Applications]] — CONTAINS: disjoint analyses, distance from property, mean/covariance mechanism, Lemma 3.5 + proof, Reed-Solomon counterexample, Python.
- [[Dwork 2006 - Sensitivity in General Metric Spaces]] — CONTAINS: Def. 3.6, Eq. (6), Thm. 3.7 + proof, Remark 3.1, Hamming-cube example (flip-probability note), Sec. 3.4 survey.
- [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] — CONTAINS: non-interactive mechanism definition, Observation 1, Thm. 4.1, local mechanisms, Prop. 4.2, Dinur-Nissim comparison, numeric reading, Sec. 4.4.
- [[Dwork 2006 - Proof of the Separation Lemma]] — CONTAINS: Lemma 4.3, Claim 4.4 + proof (with a corrected sign check), hybrid proofs of Thm. 4.1 and Prop. 4.2, numerical verification.

## Sources

- [[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]] — Dwork C, McSherry F, Nissim K, Smith A (2016-17), J. Privacy and Confidentiality 7(3): 17-51 (reprint of TCC 2006, pp. 265-284), 36 PDF pages; the sole source for all notes.

## See Also

- [[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]] — textbook treatment of the same definitions and mechanisms.
- [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]] — statistical interpretation and rates of convergence.
- [[Power Analysis and Sample Size]], [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]], [[Bayesian Media Mix Modeling - Overview]] — measurement-side context.
