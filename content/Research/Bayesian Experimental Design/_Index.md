---
title: "Index: Bayesian Experimental Design"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-06-27
concept_count: 21
---

# Bayesian Experimental Design

> [!abstract] Routing Summary
> Information-theoretic design of experiments: choose designs $\xi$ to maximize the **expected information gain (EIG)** about latents $\theta$. This topic ingests four papers tracing the field's full arc — its **foundation** (Lindley 1956), fast EIG **estimation** (Foster 2019), **unified gradient** design optimization (Foster 2020), and a **review** through policy-based adaptive design (Rainforth 2023). Contains 21 notes across 4 sub-topics.
> - The big picture across all papers / where to start? → [[Bayesian Experimental Design - Overview]]
> - Core concepts (EIG, nested estimation, adaptive design)? → [[Research/Bayesian Experimental Design/Foundations/_Index|Foundations]]
> - Fast EIG estimators (posterior, marginal, VNMC, implicit)? → [[Research/Bayesian Experimental Design/Variational EIG Estimators/_Index|Variational EIG Estimators]]
> - One-stage gradient design (ACE, PCE, high-D applications)? → [[Research/Bayesian Experimental Design/Gradient-Based Unified BOED/_Index|Gradient-Based Unified BOED]]
> - The state of the field (objectives, computation, policies, challenges)? → [[Research/Bayesian Experimental Design/Modern BED Review/_Index|Modern BED Review]]

## Sub-topics

- [[Research/Bayesian Experimental Design/Foundations/_Index|Foundations]] — COVERS: Lindley's (1956) founding average-information measure (Defs 1–2, Theorems 1–9, the design rule); the EIG objective & its four equivalent (mutual-information) forms; double intractability and the NMC estimator ($\mathcal{O}(C^{-1/3})$); sequential/adaptive design and the incremental/total EIG. *(4 notes.)*
- [[Research/Bayesian Experimental Design/Variational EIG Estimators/_Index|Variational EIG Estimators]] — COVERS (Foster 2019): four amortized variational EIG estimators — posterior/Barber–Agakov (lower), marginal (upper), VNMC (upper, consistent), implicit-likelihood — with $\mathcal{O}(T^{-1/2})$ convergence and selection rules. *(6 notes.)*
- [[Research/Bayesian Experimental Design/Gradient-Based Unified BOED/_Index|Gradient-Based Unified BOED]] — COVERS (Foster 2020): single SGA loop jointly optimizing a variational lower bound and the design; the ACE & PCE contrastive bounds; likelihood-free ACE and gradient estimators; high-dimensional applications (400-D regression, 100-D docking). *(5 notes.)*
- [[Research/Bayesian Experimental Design/Modern BED Review/_Index|Modern BED Review]] — COVERS (Rainforth 2023): EIG vs Fisher-information objectives; the computational revolution (MLMC debiasing, variational, implicit); stochastic-gradient design; deep adaptive design (policies); open challenges. *(6 notes.)*

## Cross-Cutting Concepts

Concepts that span multiple sub-topics:
- **Expected Information Gain** — the single objective every method optimizes: [[Expected Information Gain]] (defined) → estimated by [[Variational BOED - Overview|Foster 2019 estimators]] / [[The Computational Revolution in EIG Estimation|MLMC & variational]] → optimized by [[Unified SGD BOED - Overview|Foster 2020 SGA]] / [[From Designs to Policies (Deep Adaptive Design)|DAD policies]].
- **Mutual-information bounds repurposed for design** — Barber–Agakov ([[Variational Posterior Estimator (Barber-Agakov)]]), InfoNCE ([[Prior Contrastive Estimation (PCE)]]), and the adaptive contrastive bound ([[Adaptive Contrastive Estimation (ACE)]]).
- **Bound-trapping** — pairing a lower bound (ACE/$\hat\mu_{\text{post}}$) with an upper bound (VNMC/$\hat\mu_{\text{marg}}$) to verify designs: [[Convergence Rates and Estimator Selection]], [[High-Dimensional Design Applications]].
- **Sequential / adaptive design** — from greedy BAD ([[Sequential and Adaptive BED]]) to amortized non-myopic policies ([[From Designs to Policies (Deep Adaptive Design)]]).
- **Implicit-likelihood models** — [[Implicit Likelihood Estimator]] (error-bounded) → [[Likelihood-Free ACE and Gradient Estimation]] (bound-preserving) → [[The Computational Revolution in EIG Estimation|review §3.3.2]].

## Concept Dependency Chain

[[Lindley's Information Measure]] → [[Expected Information Gain]] → [[Nested Estimation and Nested Monte Carlo]] → [[Variational BOED - Overview]] → {[[Variational Posterior Estimator (Barber-Agakov)]], [[Variational Marginal Estimator]], [[Variational NMC Estimator]], [[Implicit Likelihood Estimator]]} → [[Convergence Rates and Estimator Selection]] → [[Unified SGD BOED - Overview]] → [[Adaptive Contrastive Estimation (ACE)]] → [[Prior Contrastive Estimation (PCE)]] / [[Likelihood-Free ACE and Gradient Estimation]] → [[High-Dimensional Design Applications]]; and (review thread) [[Information-Theoretic Design Objectives]] → [[The Computational Revolution in EIG Estimation]] → [[Optimization and Gradient Schemes for BED]] → [[From Designs to Policies (Deep Adaptive Design)]] → [[Open Challenges and Future Directions]].

## Sources
- [[raw/Lindley 1956 - On a Measure of the Information Provided by an Experiment.pdf]] — Lindley, D.V., *On a Measure of the Information Provided by an Experiment*, **Ann. Math. Stat.** 27(4):986–1005, 1956. The founding paper.
- [[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]] — Foster et al., *Variational Bayesian Optimal Experimental Design*, NeurIPS 2019. arXiv:1903.05480.
- [[raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]] — Foster et al., *A Unified Stochastic Gradient Approach to Designing Bayesian-Optimal Experiments*, AISTATS 2020. arXiv:1911.00294.
- [[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]] — Rainforth, Foster, Ivanova, Bickford Smith, *Modern Bayesian Experimental Design*, Statistical Science 2023. arXiv:2302.14545.

## See Also
- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — inference, computation, and decision analysis that BED builds on
- [[Research/Research Methodology/Experimental Design/_Index|Experimental Design (frequentist)]] — the classical power-analysis counterpart
- [[Decision Analysis]] — EIG as expected utility of an experiment
