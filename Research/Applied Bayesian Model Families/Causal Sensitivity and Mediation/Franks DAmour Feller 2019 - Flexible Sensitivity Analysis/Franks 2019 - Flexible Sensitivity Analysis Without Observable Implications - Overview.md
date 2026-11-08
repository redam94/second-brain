---
title: "Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/overview
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Whole paper, arXiv:1809.00399v3 (JASA 2020), pp. 1-38 incl. Appendices A-B"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Sensitivity Analysis in Observational Studies]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]]"
  - "[[Franks 2019 - Discussion Limits and Bayesian Sketch]]"
aliases:
  - Franks D'Amour Feller 2019
  - Tukey's factorization sensitivity analysis
  - flexible sensitivity analysis Bayesian
---

# Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview

> [!summary]
> Franks, D'Amour & Feller (JASA 2020) build a Bayesian-friendly sensitivity analysis for unmeasured confounding from **Tukey's factorization**: the missing potential-outcome distribution is the observed one *tilted* by an unidentified selection function $f(T|Y(t),X)$. Because the observed-data model is fit once and never depends on the sensitivity parameters, the parameters are genuinely unidentified, model checking is separated from sensitivity analysis, and any flexible model (BART, Dirichlet process mixtures) can be used. A calibration identity maps a chosen "variance in treatment explained by the potential outcome" to the logistic selection slope $\gamma_t$.

## Overview

**Problem.** Latent-confounder sensitivity models (Rosenbaum & Rubin 1983; Imbens 2003; Dorie et al. 2016; Carnegie et al. 2016) put the sensitivity parameters *inside* the observed-data likelihood, so the data inform them (e.g. a mixture of normals reveals the confounder), blurring sensitivity analysis with model checking and forcing a refit for every parameter value.

**Idea.** Parameterise the missing outcome distribution as a tilt of the observed one:
$$f^{mis}_{\psi,t}(Y(t)|T=1{-}t,X)\;\propto\;\frac{f_\psi(T=t|Y(t),X)}{f_\psi(T=1{-}t|Y(t),X)}\,f^{obs}_t(Y(t)|T=t,X)\qquad(1)$$
(importance weights equal to the odds of observing the outcome). Estimands: ATE, ATT, ATC, quantile effects (QTE).

**Contributions.** (1) Tukey's factorization extended to causal inference ("causal inference is missing data twice") with a copula for the dependence of $Y(0),Y(1)$; (2) Theorem 1: marginal-contrast estimands do not depend on the copula; (3) logistic selection with mixtures of exponential families (logistic-mEF) gives closed-form missing distributions and automatically satisfies the integral constraint; (4) interpretation by sign and calibration by "implicit $R^2$" (Proposition 3); (5) applications: NHANES blood pressure with BART, JTPA job training with a Dirichlet-process mixture.

## Main Content

### Source Map

| Paper section | Content | Note |
|---|---|---|
| Abstract, Sec. 1 (pp. 1-2) | motivation, contributions, workflow strengths | this note |
| Sec. 2.1-2.2 (pp. 2-4) | setup, estimands, Assumption 1, summary of approach, Eq. 1 | [[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]] |
| Sec. 2.3 (pp. 4-5) | related methods (NPI models, Linero-Daniels, Hahn et al.) | [[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]] |
| Sec. 2.4, Example 1, Fig. 1 (pp. 6-8) | identified sensitivity parameters in latent-class model | [[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]] |
| Sec. 3.1, Eqs. 3-4, Conditions 1-2 | one-arm Tukey factorization, integral constraint, overlap | [[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]] |
| Sec. 3.2, Eqs. 5-6, Def. 1, Thm 1, Cor. 1.1 | both arms, copula, marginal contrasts | [[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]] |
| Sec. 4.1-4.2, Eqs. 7-14, Props 1-2, Examples 2-4 | logistic selection, exponential-family tilts, mixtures | [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]] |
| Sec. 5.1, Examples 5-7 | interpreting signs of $\gamma_0,\gamma_1$ | [[Franks 2019 - Calibrating Sensitivity Parameters]] |
| Sec. 5.2, Eqs. 15-18, Prop. 3, Fig. 4 | calibration against variation explained | [[Franks 2019 - Calibrating Sensitivity Parameters]] |
| Sec. 6.1, Eqs. 19-23, Fig. 2 | NHANES / BART | [[Franks 2019 - NHANES and Job Training Applications]] |
| Sec. 6.2, Eqs. 24-28, Fig. 3 | JTPA / DP mixture / zero-inflated QTE | [[Franks 2019 - NHANES and Job Training Applications]] |
| Sec. 7 | discussion, extensions, outcome-overlap limits | [[Franks 2019 - Discussion Limits and Bayesian Sketch]] |
| Appendix A | proofs of Thm 1 and Prop. 3 | [[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]], [[Franks 2019 - Calibrating Sensitivity Parameters]] |
| Appendix B | alternative BART / BCF observed models, Figs. 4-5 | [[Franks 2019 - NHANES and Job Training Applications]] |

## Motivating PyMC examples

From https://redam94.github.io/pymc-challenges/examples.html:
- **E102** "Which way does the bias go? Hidden targeting, reach and the sign of a propensity estimate" (sign of $\gamma_0,\gamma_1$: single-arm vs two-arm confounding determines whether the estimate is biased up or down).
- **E62** "When the model cannot answer: unidentified parts..." (the logic of an unidentified selection function: the answer depends on it, the data cannot inform it).
- **E107** "What a hidden confounder can do..." (calibrating hidden-confounder strength against observed covariates, here via implicit $R^2$).

## Examples

Quick intuition (Example 2): binary outcome with $f^{obs}=\text{Bern}(\text{logit}^{-1}\mu_t)$ and logistic selection slope $\gamma_t$: the unobserved arm is $\text{Bern}(\text{logit}^{-1}(\mu_t\pm\gamma_t))$, i.e. an additive shift in log-odds. Details in [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]].

## Connections

- OVB-based counterpart, formal for linear models: [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]; calibration here uses "implicit $R^2$" in the same spirit as partial $R^2$ benchmarks.
- Mediation counterpart with an unidentified correlation: [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]].
- Bayesian ML for the observed model: [[Chipman 2010 - BART - Overview]], [[Teh 2010 - Dirichlet Process - Overview]].
- Existing vault review: [[Sensitivity Analysis in Observational Studies]], [[Propensity Score in Bayesian CI]].

## See Also

[[Missing Data Models]], [[Potential Outcomes Framework]], [[Prior Predictive Checking]]
