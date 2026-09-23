---
title: Randomization Inference - Index
tags:
  - type/index
  - source/ingested
  - topic/causal-inference
date_ingested: 2026-06-28
folder: "Econometrics/Foundations/Randomization Inference"
---

# Randomization Inference - Index

> [!abstract] Routing Summary
> Randomization / permutation inference for randomized experiments, anchored by Wu & Ding (2021), "Randomization Tests for Weak Null Hypotheses in Randomized Experiments" (JASA). Covers the foundational Fisher randomization test and the paper's contribution: studentized tests valid for weak nulls.
>
> - Need the big picture / where to start? → [[Randomization Inference - Overview]]
> - Need the core procedure and exact $p$-value (sharp null)? → [[Fisher Randomization Test and the Sharp Null]]
> - Need Fisher's sharp null vs Neyman's weak null (and why it matters)? → [[Sharp vs Weak Null Hypotheses]]
> - Need the main result — a test valid for *weak* nulls under heteroscedasticity? → [[Studentized Randomization Tests]]
> - Need the general permutation principle, exact vs asymptotic, vs bootstrap? → [[Permutation Tests and Exact Inference]]
> - Need to know which statistic to actually use? → [[Studentized Randomization Tests#^summary-recommendation|use $X^2$ / studentized $t^2$ / Huber–White $F$]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Design-based inference framing | [[Randomization Inference - Overview]] | overview | Potential Outcomes; The Experimental Ideal | Randomness comes from assignment $W$; potential outcomes are fixed; FRT exact under sharp null, conservative under weak null |
| Fisher randomization test | [[Fisher Randomization Test and the Sharp Null]] | theorem | Overview; Potential Outcomes | Under sharp null any statistic has known dist.; $p=(N!)^{-1}\sum_\pi\mathbf 1(T_\pi\ge T)$ is finite-sample exact |
| Sharp vs weak nulls | [[Sharp vs Weak Null Hypotheses]] | concept | FRT; Potential Outcomes | Sharp $Y_i(1)=Y_i(2)\ \forall i$ ⟹ weak $\bar Y(1)=\bar Y(2)$, not conversely; heterogeneity breaks naive FRT |
| Studentized FRT ($X^2$) | [[Studentized Randomization Tests]] | theorem | FRT; Sharp vs Weak; Overview | Thm 1: $X^2$ proper — exact under sharp null + asymptotically conservative under weak null; $B$, $F$, $|\hat\tau|$ improper |
| Permutation tests / exact inference | [[Permutation Tests and Exact Inference]] | concept | FRT; Studentized FRT | FRT = permutation test under sharp null; exact (sharp) vs asymptotic (weak); contrast with bootstrap |

## Notes

- [[Randomization Inference - Overview]] — CONTAINS: design-based inference definition, CRE setup, finite-population parameters $\bar Y(j)$/$S(j,k)$, randomization distribution, conservative estimator $\hat D$, finite-population asymptotics, reading map.
- [[Fisher Randomization Test and the Sharp Null]] — CONTAINS: sharp null definition, finite-sample exactness theorem, FRT-1→FRT-4 procedure, FRT≡permutation test under $H_{0\text F}$, worked 6-unit exact $p$-value.
- [[Sharp vs Weak Null Hypotheses]] — CONTAINS: Fisher vs Neyman null definitions, $H_{0\text N}(C,x):C\bar Y=x$, sharp⟹weak logic, variance-heterogeneity failure of naive FRT, special cases (equal var / balanced $J=2$ / binary).
- [[Studentized Randomization Tests]] — CONTAINS: $X^2$ Wald statistic, Proposition 4 properness criterion, Theorem 1 dual validity ($\sum a_j\xi_j^2 \le_{\text{st}} \chi^2_m$), Box-type $B$ and OLS $F$ impropriety, Huber–White repair, $\chi^2$ approximation, practical recommendation, Charness–Gneezy example.
- [[Permutation Tests and Exact Inference]] — CONTAINS: permutation test definition, exact-vs-asymptotic theorem, studentization/Behrens–Fisher, FRT-vs-bootstrap comparison, Monte Carlo $p$-value formula.

## External / Cross-Folder Links

- [[Potential Outcomes Framework]] — foundational potential-outcomes and Science Table notation.
- [[The Experimental Ideal]] — randomization principle and comparability of groups.
- [[Differences-in-Differences]], [[Synthetic Control]], [[Synthetic Control Inference and Diagnostics]] — related identification/inference designs.
- [[Power Analysis and Sample Size]] — designing experiments with adequate power.
- [[Multiple Testing Corrections]] — multiplicity when running many tests.

## Sources

- Wu Ding 2021 - Randomization Tests for Weak Null Hypotheses — Wu, J. & Ding, P. (2021), "Randomization Tests for Weak Null Hypotheses in Randomized Experiments," *Journal of the American Statistical Association*.
