---
title: Empirical Bayes - Index
tags:
  - type/index
  - source/ingested
  - topic/bayesian-statistics
folder: "Bayesian Statistics/Inference Fundamentals/Empirical Bayes"
date_ingested: 2026-06-28
---

# Empirical Bayes - Index

Leaf index for the Empirical Bayes folder, covering Efron's *Large-Scale Inference* Chapter 1 — "Empirical Bayes and the James-Stein Estimator."

> [!abstract] Routing Summary
> - Need the big picture / how the two EB branches fit together? → [[Empirical Bayes - Overview]]
> - Need the nonparametric posterior-mean formula $(x+1)f(x+1)/f(x)$? → [[Robbins Formula and Poisson Empirical Bayes]]
> - Need the shrinkage estimator and its grand-mean form? → [[James-Stein Estimator]]
> - Need why the MLE is inadmissible for $N \geq 3$ (the proof + risk)? → [[Stein's Paradox and Risk Dominance]]
> - Need "shrinkage = estimated prior" and the link to hierarchical Bayes / regularization? → [[Empirical Bayes Interpretation of Shrinkage]]
> - Need the baseball worked example with real numbers? → [[James-Stein Estimator]] (Table 1.1) and [[Stein's Paradox and Risk Dominance]] (Table 1.2)

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| EB program & two branches | [[Empirical Bayes - Overview]] | overview | (the 4 below) | Prior estimable from the marginal of $N$ parallel cases |
| Nonparametric (Poisson) EB | [[Robbins Formula and Poisson Empirical Bayes]] | theorem | Overview | $E[\theta\mid x] = (x+1)\,f(x+1)/f(x)$ |
| James-Stein estimator | [[James-Stein Estimator]] | theorem | Overview, Robbins | $\hat\mu^{(JS)} = (1 - \tfrac{N-2}{S})\boldsymbol{z}$; grand-mean form (1.35) |
| Stein's paradox / risk dominance | [[Stein's Paradox and Risk Dominance]] | theorem | James-Stein, Overview | JS dominates MLE for $N \geq 3$; risk $N - E\{(N-2)^2/S\}$ |
| Shrinkage as estimated prior | [[Empirical Bayes Interpretation of Shrinkage]] | concept | James-Stein, Robbins, Overview | Parametric EB; link to hierarchical Bayes & regularization |

## Notes

- [[Empirical Bayes - Overview]] — CONTAINS: Bayes rule & marginal density (1.2-1.3); the EB principle; the two historical branches (Robbins, Stein); baseball and kidney examples at a glance.
- [[Robbins Formula and Poisson Empirical Bayes]] — CONTAINS: Poisson marginal $f(x)$; Robbins' formula $(x+1)f(x+1)/f(x)$ with proof idea; empirical-frequency plug-in estimator; insurance-claims example.
- [[James-Stein Estimator]] — CONTAINS: model (1.7); Bayes rule $B=A/(A+1)$ (1.16); marginal estimate $E\{(N-2)/S\}=1/(A+1)$ (1.22); JS estimator (1.23); grand-mean form (1.35); risk ratio (1.25); limited-translation (1.37); baseball Table 1.1; regression form (1.39).
- [[Stein's Paradox and Risk Dominance]] — CONTAINS: dominance theorem (1.26); Stein's unbiased risk identity (1.27-1.30); exact JS risk (1.31); total-vs-individual caveat; simulation Table 1.2; Clemente/Munson "paradox."
- [[Empirical Bayes Interpretation of Shrinkage]] — CONTAINS: parametric EB (1.32-1.35); regression shrinkage (1.38-1.39); links to hierarchical Bayes, regularization/ridge, bias-variance; Fig. 1.1 "learning from others"; limited-translation as prior-protection.

## Sources

- [[raw/Efron - Empirical Bayes and the James-Stein Estimator (LSI Ch1).pdf]] — Efron, *Large-Scale Inference*, Ch. 1, pp. 1-12.
