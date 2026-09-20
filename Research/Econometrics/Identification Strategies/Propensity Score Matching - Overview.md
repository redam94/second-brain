---
title: "Propensity Score Matching - Overview"
aliases:
  - PSM
  - propensity score matching
  - observational study matching
  - selection on observables matching
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/PSM-Rosenbaum-Rubin-Stuart-Survey.md]]"
source_location: "Rosenbaum & Rubin (1983) Biometrika 70: 41–55; Stuart (2010) Statistical Science 25: 1–21"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Matching Algorithms and Caliper]]"
  - "[[Covariate Balance and Matching Diagnostics]]"
  - "[[Bayesian Propensity Score Weighting]]"
  - "[[Activity Bias in Advertising]]"
---

# Propensity Score Matching - Overview

> [!summary]
> Propensity score matching (PSM) exploits the Rosenbaum-Rubin balancing theorem: conditioning on $e(X) = P(T=1\mid X)$ is sufficient to achieve covariate balance between treatment groups, reducing a high-dimensional adjustment problem to a one-dimensional one. PSM estimates the Average Treatment Effect on the Treated (ATT) by pairing each treated unit with a control unit of similar propensity score, then comparing outcomes within matched pairs. It is a *design* method — not a regression method — and its validity is assessed through balance diagnostics, not hypothesis tests.

## Overview

When randomisation is impossible, causal identification under the **selection-on-observables** assumption requires that treatment assignment be *as-good-as-random* conditional on a set of measured pre-treatment covariates $X$:

$$\{Y(0), Y(1)\} \perp T \mid X \quad \text{(ignorability)}$$

See [[Conditional Independence Assumption]] for the formal statement. The challenge is that $X$ may be high-dimensional, making direct adjustment — conditioning on all of $X$ simultaneously — difficult. Propensity score matching addresses this through dimensionality reduction.

The three frequentist strategies for exploiting ignorability — outcome modelling, inverse probability weighting (IPW), and doubly-robust estimation — are surveyed in [[Frequentist Causal Estimation]]. PSM is a fourth, closely related strategy: it finds a matched *control group* that is directly comparable to the treated group without specifying a parametric outcome model.

## The Propensity Score

> [!definition] Definition: Propensity Score (Rosenbaum & Rubin 1983)
> The **propensity score** is the conditional probability of receiving treatment given pre-treatment covariates:
> $$e(X_i) = P(T_i = 1 \mid X_i)$$
> In practice, $e(X)$ is unknown and must be estimated, typically via logistic regression:
> $$\hat{e}(X) = \text{logit}^{-1}(X\hat{\beta})$$
^def-propensity-score

Using the *estimated* propensity score has a counterintuitive property: Hirano, Imbens & Ridder (2003) show that the estimated $\hat{e}(X)$ achieves better finite-sample balance than the true $e(X)$, because the estimation step incorporates sample information.

## The Balancing Theorem

> [!theorem] Theorem: Propensity Score Balancing (Rosenbaum & Rubin 1983, Theorem 1)
> If treatment assignment is **strongly ignorable** given $X$:
> $$\{Y(0), Y(1)\} \perp T \mid X \quad \text{and} \quad 0 < e(x) < 1 \ \forall x$$
> then:
> 1. **Identification holds given only $e(X)$**: $\{Y(0), Y(1)\} \perp T \mid e(X)$
> 2. **The propensity score is a balancing score**: $T \perp X \mid e(X)$
>
> The second property is the key dimensionality-reduction result: within strata of equal propensity score, the covariate distribution is the same in treatment and control groups — regardless of the dimension of $X$.
^thm-balancing

**Why this is powerful:** Instead of conditioning on all of $X$ simultaneously (which may require many cells or a parametric model), it is sufficient to condition on the single scalar $e(X)$. This converts a $p$-dimensional problem into a 1-dimensional one.

**The identification consequence:** Under strong ignorability,

$$\tau_{\text{ATT}} = E[Y(1) - Y(0) \mid T=1] = E\!\big[E[Y \mid T=1, e(X)] - E[Y \mid T=0, e(X)] \;\big|\; T=1\big]$$

so ATT is identified by comparing outcomes within propensity-score strata.

## Required Assumptions

Propensity score matching requires two conditions:

> [!definition] Definition: Strong Ignorability (Rosenbaum & Rubin 1983)
> Treatment assignment is **strongly ignorable** given $X$ if:
> 1. **Unconfoundedness** (CIA): $\{Y(0), Y(1)\} \perp T \mid X$ — no unobserved confounders
> 2. **Overlap** (common support): $0 < P(T=1 \mid X=x) < 1$ for all $x$ in the support of $X$
^def-strong-ignorability

**Unconfoundedness** is the key untestable assumption: all variables that jointly affect treatment and outcome must be observed and included in $X$. If an unobserved variable $U$ confounds the relationship, PSM does not recover the causal effect — see [[The Selection Problem]] for why this is hard and [[Activity Bias in Advertising]] for a case where it fails.

**Overlap** ensures that every treated unit has a potential match in the control pool. When overlap fails, matching implicitly extrapolates — units in regions of poor overlap are dropped or matched to distant controls.

## What PSM Estimates: ATT, Not ATE

PSM most naturally estimates the **Average Treatment Effect on the Treated (ATT)**:

$$\tau_{\text{ATT}} = E[Y(1) - Y(0) \mid T=1]$$

because the control group is constructed to be the counterfactual for *treated* units. The ATE:

$$\tau_{\text{ATE}} = E[Y(1) - Y(0)]$$

requires that both treated and untreated units have matches — harder to satisfy when overlap is limited. For ATE, IPW is often preferred. See [[Frequentist Causal Estimation#^def-ipw]].

## PSM vs IPW: Conceptual Differences

| Dimension | PSM | IPW |
|-----------|-----|-----|
| What it does | Selects a matched control sample | Reweights the full sample |
| Unit disposal | Discards unmatched units (controls and sometimes treated) | Uses all units (with extreme weights for low-overlap units) |
| Estimand | ATT (naturally) | ATE or ATT (with weight normalisation) |
| Sensitivity to extreme PS | Caliper prevents extreme PS pairs | Extreme weights inflate variance; trimming needed |
| Sample size after adjustment | Reduced (matched sample only) | Same size; effective $N$ reduced by variance of weights |
| Primary diagnostic | Covariate balance in matched sample | Distribution of weights; effective sample size |

Both are consistent under correct PS model specification; doubly-robust estimators (see [[Frequentist Causal Estimation#^def-dr]]) combine the two for robustness.

## Why PSM Fails: The Activity Bias Case

[[Activity Bias in Advertising]] demonstrates the limits of PSM: when treatment assignment is driven by an *unobserved* time-varying covariate (user activity level that simultaneously predicts ad exposure and purchase propensity), PSM cannot balance on the key confounder because it is not measured. The observed $X$ does not satisfy unconfoundedness, so the balancing theorem does not apply.

The diagnostic signature: after matching, remaining SMD for observed covariates may be small, but causal estimates remain biased because $U \not\in X$. No amount of matching sophistication repairs a violated unconfoundedness assumption.

## The PSM Workflow

1. **Specify the DAG** to identify the adjustment set $X$ (see [[DAGs and Causal Identification]])
2. **Estimate the propensity score**: fit logistic regression $T \sim X$; extract $\hat{e}(X_i)$
3. **Match**: pair treated and control units using $\hat{e}(X)$ — see [[Matching Algorithms and Caliper]]
4. **Assess balance**: check covariate balance in the matched sample — see [[Covariate Balance and Matching Diagnostics]]
5. **Iterate**: if balance is poor, adjust the PS model (add interactions, polynomials) or change the matching algorithm
6. **Estimate ATT**: compare outcomes in the matched sample using regression (including covariates reduces variance and corrects for residual imbalance)

> [!tip] PSM as Preprocessing
> Ho, Imai, King & Stuart (2007) reframe PSM as *nonparametric preprocessing* — it reduces model dependence of the subsequent regression step. After matching, the outcome model is estimated in a balanced sample where regression extrapolation is minimal.

## Connections

- [[Frequentist Causal Estimation]] — IPW and doubly-robust estimators that use the same propensity score but weight rather than match
- [[Bayesian Propensity Score Weighting]] — Bayesian extension using the Liao-Zigler marginalization (weighting, not matching)
- [[Conditional Independence Assumption]] — the unconfoundedness assumption that matching relies on
- [[The Selection Problem]] — why observational data requires adjustment in the first place
- [[Matching Algorithms and Caliper]] — the algorithmic details of how to form matched pairs
- [[Covariate Balance and Matching Diagnostics]] — how to verify that matching has achieved its goal

## See Also

- [[DAGs and Causal Identification]] — DAG-based reasoning to choose the adjustment set $X$
- [[Activity Bias in Advertising]] — example where PSM fails (unobserved confounder)
- [[Instrumental Variables]] — alternative when unconfoundedness fails; uses exogenous variation
- [[Differences-in-Differences]] — alternative when panel data available; removes time-invariant unobservables
- [[Sensitivity Analysis in Observational Studies]] — after matching, assess robustness to unmeasured confounders via Rosenbaum bounds; complement to balance diagnostics
