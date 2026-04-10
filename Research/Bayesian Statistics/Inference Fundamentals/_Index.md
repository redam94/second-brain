---
title: "Index: Inference Fundamentals"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
concept_count: 9
---

# Inference Fundamentals

> [!abstract] Routing Summary
> This folder covers the foundations of Bayesian inference from BDA3 Part I and Statistical Rethinking Chapters 1-3. Contains 8 notes.
> - Need Bayes' theorem and notation? -> [[Probability and Bayesian Inference]]
> - Need conjugate priors (beta-binomial, normal)? -> [[Single-Parameter Models]]
> - Need hierarchical/partial pooling? -> [[Hierarchical Models]]
> - Need how partial pooling replaces multiple comparisons corrections? -> [[Partial Pooling as Multiple Comparisons Correction]]
> - Need posterior samples, HPDI, loss functions? -> [[Posterior Sampling and Summarization]]
> - Need Bayesian updating intuition? -> [[Garden of Forking Data]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Bayes' theorem, three steps of Bayesian analysis | [[Probability and Bayesian Inference]] | concept | raw/BDA3.pdf | Posterior = Prior x Likelihood / Evidence |
| Conjugate priors, beta-binomial, noninformative priors | [[Single-Parameter Models]] | concept | [[Probability and Bayesian Inference]] | Posterior is a compromise between prior and data |
| Nuisance parameters, marginal posteriors, bioassay | [[Multiparameter Models]] | concept | [[Probability and Bayesian Inference]], [[Single-Parameter Models]] | Marginalization integrates out nuisance parameters |
| Normal approximation, Bernstein-von Mises | [[Asymptotics and Frequentist Connections]] | concept | [[Multiparameter Models]], [[Probability and Bayesian Inference]] | Posteriors converge to normal with enough data |
| Exchangeability, partial pooling, eight schools | [[Hierarchical Models]] | concept | [[Single-Parameter Models]], [[Probability and Bayesian Inference]], [[Multiparameter Models]] | Partial pooling shrinks toward group mean |
| Z-score shrinkage, variance ratio, simulation evidence | [[Partial Pooling as Multiple Comparisons Correction]] | theorem | [[Hierarchical Models]], [[Multiple Comparisons - Bayesian Perspective]], [[Type S and Type M Errors]] | Shrinkage factor = $1/\sqrt{1+\sigma_{\bar{y}}^2/\sigma_\theta^2}$ always < 1 |
| Philosophy of statistical modeling | [[Statistical Rethinking - The Golem of Prague]] | overview | raw/StatRethink-Bayes.pdf | Hypotheses != models; all models are golems |
| Bayesian updating, grid approximation | [[Garden of Forking Data]] | concept | [[Statistical Rethinking - The Golem of Prague]], [[Probability and Bayesian Inference]] | Small world vs large world distinction |
| Working with posterior samples, HPDI, posterior predictive | [[Posterior Sampling and Summarization]] | concept | [[Garden of Forking Data]], [[Probability and Bayesian Inference]] | Summarize posteriors with intervals and predictions |

## Notes
- [[Probability and Bayesian Inference]] — CONTAINS: Bayes' theorem, three steps of Bayesian analysis, notation conventions, prior/likelihood/posterior framework
- [[Single-Parameter Models]] — CONTAINS: Beta-binomial model, conjugate priors, noninformative priors, posterior as compromise between prior and data
- [[Multiparameter Models]] — CONTAINS: Nuisance parameters, marginal posteriors, bioassay example, joint posterior factorization
- [[Asymptotics and Frequentist Connections]] — CONTAINS: Normal approximation to posterior, Bernstein-von Mises theorem, large-sample theory, counterexamples
- [[Hierarchical Models]] — CONTAINS: Exchangeability, partial pooling, eight schools example, hyperparameters, shrinkage
- [[Partial Pooling as Multiple Comparisons Correction]] — CONTAINS: Z-score shrinkage formula, variance ratio, posterior mean/sd algebra, 8 schools simulation (37% Type S rate classical vs 11% Bayesian), state test scores example
- [[Statistical Rethinking - The Golem of Prague]] — CONTAINS: Philosophy of statistical models as golems, hypotheses vs models, Bayesian vs frequentist framing
- [[Garden of Forking Data]] — CONTAINS: Bayesian updating as counting paths, grid approximation, quadratic approximation, MCMC preview
- [[Posterior Sampling and Summarization]] — CONTAINS: Sampling from posteriors, HPDI vs PI, MAP/mean/median, loss functions, posterior predictive simulation

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part I (pp. 1-137)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015), Chapters 1-3
- [[raw/multiple2f.pdf]] — "Why we (usually) don't have to worry about multiple comparisons" (Gelman, Hill & Yajima, 2009)
