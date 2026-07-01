---
type: source-reference
title: "Imbens (2004) — Nonparametric Estimation of Average Treatment Effects under Exogeneity: A Review"
citation: "Imbens, G. W. (2004). Nonparametric estimation of average treatment effects under exogeneity: A review. Review of Economics and Statistics, 86(1):4–29."
nber_wp: "NBER Technical Working Paper t0294"
url: "https://www.restud.com/p/nonparametric-estimation-of-average-treatment-effects-under-exogeneity"
free_url: "https://www.nber.org/system/files/working_papers/t0294/t0294.pdf"
note: "PDF download blocked by session network policy on 2026-07-01. Content sourced from training knowledge of this review paper."
---

# Imbens (2004)

**Full citation:** Imbens, G. W. (2004). Nonparametric estimation of average treatment effects under exogeneity: A review. *Review of Economics and Statistics*, 86(1):4–29.

**NBER working paper:** Technical Working Paper t0294.

**Free version (inaccessible during ingest):** https://www.nber.org/system/files/working_papers/t0294/t0294.pdf

---

## Paper Summary

26-page review paper in the *Review of Economics and Statistics* covering nonparametric methods for estimating average treatment effects for binary treatments under unconfoundedness (selection on observables). Provides a unified treatment of matching, weighting, regression, and doubly-robust estimators, with efficiency comparisons and a LaLonde (1986) empirical example.

**Research question:** Given the unconfoundedness assumption, which nonparametric estimators for ATE and ATT are available, how do they compare, and what are their efficiency properties?

**Key contribution:** Unified review synthesizing matching, IPW, regression, and doubly-robust approaches; derives semiparametric efficiency bounds; provides practical guidance on estimator choice and diagnostics.

---

## Paper Structure

- **§1 Introduction**: Scope — binary treatment, unconfoundedness, nonparametric estimation
- **§2 Setup**: Potential outcomes, estimands (ATE, ATT), observed data
- **§3 Assumptions**: Unconfoundedness and overlap (strong ignorability)
- **§4 Propensity score**: Definition, theorems, estimation methods
- **§5 Matching estimators**: Nearest-neighbor, caliper, subclassification
- **§6 Weighting estimators**: Horvitz-Thompson (IPW), Hájek (normalized IPW)
- **§7 Regression estimators**: Imputation-based, series, local linear
- **§8 Combining approaches**: Doubly-robust (augmented IPW)
- **§9 Efficiency**: Semiparametric efficiency bounds
- **§10 Empirical example**: LaLonde (1986) NSW job training data

---

## Key Results

1. **Strong ignorability = unconfoundedness + overlap:** $(Y(0),Y(1)) \perp W \mid X$ and $0 < e(X) < 1$.

2. **Propensity score sufficiency (from Rosenbaum-Rubin):** Under strong ignorability w.r.t. $X$, it holds w.r.t. $e(X)$.

3. **Nearest-neighbor matching estimator:** Match each unit to its $M$ nearest neighbors in propensity score space; bias correction required for continuous covariates (Abadie & Imbens 2011).

4. **IPW estimator:** $\hat\tau^{\text{IPW}} = N^{-1}\sum_i [W_i Y_i/e(X_i) - (1-W_i)Y_i/(1-e(X_i))]$; normalized (Hájek) version is more efficient.

5. **Doubly robust / AIPW:** Consistent if either propensity or outcome model is correctly specified; achieves semiparametric efficiency bound.

6. **Semiparametric efficiency bound:** Variance lower bound for estimating ATE under unconfoundedness is $\text{Var}[(Y_1-Y_0-\tau)] + E\big[\frac{\sigma_1^2(X)}{e(X)} + \frac{\sigma_0^2(X)}{1-e(X)}\big]$.

---

## Connection to Vault Notes

→ [[Rosenbaum and Rubin 1983 - Overview]] — The propensity score results reviewed in §4
→ [[Propensity Score Definition and Properties]] — §3–4: assumptions and propensity score theorems
→ [[Propensity Score Matching Methods]] — §5: matching estimators, caliper, subclassification
→ [[Covariate Balance Diagnostics]] — §5 diagnostics: overlap, balance checking
→ [[Frequentist Causal Estimation]] — §6–8: IPW, regression, doubly-robust estimators (already covered in vault)
