---
title: "Index: Foundations (Bayesian Experimental Design)"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Experimental Design]]"
date_updated: 2026-06-27
concept_count: 4
---

# Foundations

> [!abstract] Routing Summary
> The shared conceptual core of Bayesian experimental design: the **origin** (Lindley's measure), the **objective** (EIG), **why it's hard** (nested estimation), and **how it extends to sequences** (adaptive design). Contains 4 notes.
> - The historical origin — Lindley's 1956 average-information measure, Theorems 1–9, the design rule? → [[Lindley's Information Measure]]
> - The design objective — EIG, its four equivalent forms, mutual-information reading? → [[Expected Information Gain]]
> - Why the EIG can't be computed directly; the NMC estimator and its slow $\mathcal{O}(C^{-1/3})$ rate? → [[Nested Estimation and Nested Monte Carlo]]
> - Sequential/adaptive design, incremental EIG, total EIG, greedy myopia? → [[Sequential and Adaptive BED]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Lindley's measure; Defs 1–2; Thms 1–9; partial order; design rule | [[Lindley's Information Measure]] | concept/theorem | [[Probability and Bayesian Inference]] | $\mathcal{I}(\mathcal{E},p(\theta))=E_x[\mathcal{I}_1(x)-\mathcal{I}_0]$; non-negative, additive, concave |
| EIG; information gain; mutual-information forms; optimal design | [[Expected Information Gain]] | concept/definition | [[Lindley's Information Measure]] | $\mathrm{EIG}(\xi)=\mathbb{E}_{p(y,\theta\mid\xi)}[\log\frac{p(\theta\mid y,\xi)}{p(\theta)}]=\mathrm{MI}_\xi(\theta;y)$ |
| Double intractability; NMC estimator; debiasing vs variational | [[Nested Estimation and Nested Monte Carlo]] | concept/theorem | [[Expected Information Gain]] | NMC is biased ($\mathcal{O}(1/M)$), costs $NM$, rate $\mathcal{O}(C^{-1/3})$ with $M\propto\sqrt N$ |
| BAD; incremental EIG; total EIG additivity; greedy myopia | [[Sequential and Adaptive BED]] | concept | [[Expected Information Gain]] | $\mathrm{EIG}_\theta(\xi_t\mid h_{t-1})$ with updated prior; $\mathrm{TEIG}=\sum_t$ incremental EIGs |

## Notes

- [[Lindley's Information Measure]] — CONTAINS: Shannon→statistics adaptation; information of a distribution (Eqs. 3–5, sign convention); Definitions 1–2 (average information = EIG, Eqs. 6–7); symmetric/mutual-information forms (Eqs. 8–11); Theorems 1–9 (non-negativity, additivity, sufficiency, concavity, diminishing returns, partial order, Blackwell relation); the design rule; worked examples (normal variance, determinant/D-optimality criterion, Wald SPRT, Beta-binomial sequential boundary).
- [[Expected Information Gain]] — CONTAINS: InfoGain (Eq. 1) & EIG (Eqs. 2–3) definitions; four equivalent forms / mutual-information theorem; double-intractability argument; decision-theoretic (log-score utility) reading; discrete Rao–Blackwellized estimator.
- [[Nested Estimation and Nested Monte Carlo]] — CONTAINS: NMC estimator (Eq. 7) + importance-sampled NMC (Eq. 8); convergence theorem ($\mathcal{O}(C^{-1/3})$, $M\propto\sqrt N$, finite-$M$ bias); the two escape routes (MLMC debiasing vs variational approximation); Jensen-bias worked example.
- [[Sequential and Adaptive BED]] — CONTAINS: sequential model (Eq. 5); incremental EIG (Eq. 4); total-EIG additivity (Eq. 17); the two flaws of traditional BAD; estimator-compatibility caveat; adaptive psychology / CES examples.

## Sources
- [[../raw/Lindley 1956 - On a Measure of the Information Provided by an Experiment.pdf]] — Lindley, D.V. (1956), *On a Measure of the Information Provided by an Experiment*, **Ann. Math. Stat.** 27(4):986–1005. The founding paper.
- [[../raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]] — §2 (objectives, BAD), §3.1–3.2 (nested estimation, debiasing)
- [[../raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]] — §2 (background, NMC, sequential model)
- [[../raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]] — §2 (background), §3.5 (iterated design)

## See Also
- [[Research/Bayesian Experimental Design/Variational EIG Estimators/_Index|Variational EIG Estimators]] — the fast estimators that beat NMC
- [[Decision Analysis]] — expected-utility framing of the EIG
- [[Introduction to Bayesian Computation]] — the inference machinery these methods rely on
