---
title: "Index: Extensions"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-11
concept_count: 13
---

# Extensions

> [!abstract] Routing Summary
> This folder covers extensions to the core econometric toolkit from MHE Chapters 7-8, PyMC tutorials, and simulation-based estimation papers. Contains 13 notes.
> - Need distributional effects or QTE? -> [[Quantile Regression]]
> - Need multinomial logit/probit or random utility? -> [[Discrete Choice Models]]
> - Need robust SEs, clustering, or Moulton factor? -> [[Standard Errors and Clustering]]
> - Need simulation-based estimation overview (MSM, indirect inference, EMM)? -> [[Simulation-Based Estimation - Overview]]
> - Need MSM/SMM theory and estimator? -> [[Method of Simulated Moments]]
> - Need indirect inference with auxiliary models? -> [[Indirect Inference]]
> - Need asymptotically efficient simulation estimation (SNP)? -> [[Efficient Method of Moments]]
> - Need SMM for copula models (Oh & Patton)? -> [[SMM Estimator for Copulas]]
> - Need asymptotic theory for copula SMM (Props 1-3)? -> [[SMM Copula Asymptotic Theory]]
> - Need J-test for copula specification? -> [[SMM Copula Specification Testing]]
> - Need Monte Carlo and financial application results? -> [[SMM Copula Simulation and Application]]
> - Need implementation guidance (variance reduction, step sizes)? -> [[Practical Issues in Simulation Estimation]]
> - Need rank dependence measures (Spearman's ρ, quantile/tail dependence) for copula SMM? -> [[Dependence Measures for Copulas]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Conditional quantiles, QTE, approximation property | [[Quantile Regression]] | concept | [[Regression and the CEF]], [[Local Average Treatment Effects]], [[The Selection Problem]] | QR estimates treatment effects across the distribution |
| Random utility, multinomial logit/probit, Bayesian discrete choice | [[Discrete Choice Models]] | tutorial | [[Regression and the CEF]], [[Instrumental Variables]], [[Quantile Regression]] | McFadden's random utility framework for categorical outcomes |
| Robust SEs, Moulton factor, serial correlation, few-cluster corrections | [[Standard Errors and Clustering]] | concept | [[Regression and the CEF]], [[Differences-in-Differences]], [[Research Questions in Econometrics]] | Cluster at the level of treatment assignment |
| MSM, indirect inference, EMM -- overview of simulation-based methods | [[Simulation-Based Estimation - Overview]] | overview | [[Standard Errors and Clustering]], [[Copula Estimation]] | Replace intractable criterion functions with Monte Carlo |
| MSM criterion function, consistency, asymptotic normality | [[Method of Simulated Moments]] | concept/theorem | [[Simulation-Based Estimation - Overview]] | Consistent for any $R \geq 1$; variance inflated by $(1+1/R)$ |
| Auxiliary model approach: min-distance and score-based | [[Indirect Inference]] | concept/theorem | [[Method of Simulated Moments]] | Match auxiliary model estimates between real and simulated data |
| SNP density, EMM procedure, asymptotic efficiency | [[Efficient Method of Moments]] | concept/theorem | [[Indirect Inference]] | Achieves MLE efficiency via flexible SNP auxiliary model |
| Oh-Patton SMM using rank dependence measures | [[SMM Estimator for Copulas]] | concept | [[Method of Simulated Moments]], [[Dependence Measures for Copulas]] | SMM for copulas when likelihood is unavailable |
| Assumptions 1-4, Propositions 1-3 (consistency, normality, variance) | [[SMM Copula Asymptotic Theory]] | theorem | [[SMM Estimator for Copulas]] | First-stage estimation error does not affect copula estimator |
| J-test, over-identifying restrictions, simulated critical values | [[SMM Copula Specification Testing]] | theorem | [[SMM Copula Asymptotic Theory]] | $\chi^2_{m-p}$ with efficient weight; simulated CVs otherwise |
| Monte Carlo study + 7-firm financial dependence | [[SMM Copula Simulation and Application]] | example | [[SMM Copula Asymptotic Theory]], [[SMM Copula Specification Testing]] | ~20-40% efficiency loss vs MLE; significant tail dependence in financials |
| Common RNGs, antithetic/control variates, step sizes | [[Practical Issues in Simulation Estimation]] | concept | [[Method of Simulated Moments]], [[Indirect Inference]] | Step size for numerical derivatives must be $\gg 1/\sqrt{T}$ |
| Spearman's ρ, quantile dependence, tail dependence — pure copula functionals | [[Dependence Measures for Copulas]] | definition | [[Copula Estimation]] | Invariant to marginals; used as SMM moments in Oh & Patton |

## Notes
- [[Quantile Regression]] -- CONTAINS: Conditional quantile functions, quantile treatment effects (QTE), approximation property, distributional effects
- [[Discrete Choice Models]] -- CONTAINS: Random utility model, multinomial logit/probit, IIA assumption, Bayesian discrete choice in PyMC, McFadden framework
- [[Standard Errors and Clustering]] -- CONTAINS: Heteroskedasticity-robust SEs, Moulton factor, serial correlation in panels, few-cluster corrections, wild bootstrap
- [[Simulation-Based Estimation - Overview]] -- CONTAINS: MSM vs indirect inference vs EMM comparison, SV and diffusion motivating examples, $(1+1/R)$ variance structure
- [[Method of Simulated Moments]] -- CONTAINS: MSM criterion function, conditional vs unconditional moments, consistency theorem, asymptotic normality, optimal weight matrix, SV model example
- [[Indirect Inference]] -- CONTAINS: Binding function, minimum distance estimator, score-based estimator, auxiliary model choice, smoothly embedded condition
- [[Efficient Method of Moments]] -- CONTAINS: SNP density (location, scale, Hermite polynomial), EMM estimator, asymptotic efficiency theorem, model selection for SNP
- [[SMM Estimator for Copulas]] -- CONTAINS: Oh-Patton DGP, two-stage estimation, rank dependence moments, SMM estimator definition, factor copula model, nesting of GMM/MM
- [[SMM Copula Asymptotic Theory]] -- CONTAINS: Assumptions 1-4, Proposition 1 (consistency), Proposition 2 (asymptotic normality with 3 rate cases), Proposition 3 (variance estimation via bootstrap + numerical derivatives)
- [[SMM Copula Specification Testing]] -- CONTAINS: Proposition 4 (J-test), chi-squared with efficient weight, simulated critical values for general weight, simulation procedure
- [[SMM Copula Simulation and Application]] -- CONTAINS: Monte Carlo for Clayton/Normal/factor copulas, iid and AR-GARCH data, step-size sensitivity, 7 financial firms (2001-2010), tail dependence and asymmetry findings
- [[Practical Issues in Simulation Estimation]] -- CONTAINS: Common random numbers, antithetic variates, control variates, auxiliary model selection strategies, step-size guidelines, simulation size trade-offs, implementation checklist
- [[Dependence Measures for Copulas]] -- CONTAINS: Spearman's rank correlation, quantile dependence, tail dependence coefficients, asymmetry measures, pure copula functionals invariant to marginals

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] -- Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 7-8
- [[raw/Discrete Choice and Random Utility Models]] -- PyMC tutorial: Bayesian discrete choice models
- [[raw/tdb136.pdf]] -- Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] -- Oh & Patton (2011), "Simulated Method of Moments Estimation for Copula-Based Multivariate Models"

## See Also

- [[Generalized Linear Models]] -- Bayesian approach to logistic/Poisson regression
- [[Monsters and Mixtures]] -- Maximum entropy justification for categorical models
- [[Copula Estimation]] -- Bayesian copula estimation (complementary approach)
