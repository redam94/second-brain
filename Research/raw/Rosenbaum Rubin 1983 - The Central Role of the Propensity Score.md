---
type: source-reference
title: "Rosenbaum & Rubin (1983) — The Central Role of the Propensity Score in Observational Studies for Causal Effects"
citation: "Rosenbaum, P. R. and Rubin, D. B. (1983). The central role of the propensity score in observational studies for causal effects. Biometrika, 70(1):41–55."
doi: "10.2307/2335942"
url: "https://www.jstor.org/stable/2335942"
free_url: "https://www.stat.cmu.edu/~ryantibs/journalclub/rosenbaum_1983.pdf"
note: "PDF download blocked by session network policy on 2026-07-01. Content sourced from training knowledge of this foundational paper."
---

# Rosenbaum & Rubin (1983)

**Full citation:** Rosenbaum, P. R. and Rubin, D. B. (1983). The central role of the propensity score in observational studies for causal effects. *Biometrika*, 70(1):41–55.

**Free version (inaccessible during ingest):** https://www.stat.cmu.edu/~ryantibs/journalclub/rosenbaum_1983.pdf

---

## Paper Summary

15-page paper in Biometrika that introduces the propensity score and proves its two central theorems. The foundational reference for all propensity-score-based methods in observational causal inference.

**Research question:** How can observational studies estimate causal effects while accounting for differences in observed covariates between treated and control groups, without requiring a fully parametric model?

**Key contribution:** Propensity scores reduce the dimensionality of covariate adjustment from the full covariate vector X to a single scalar, while preserving the balancing property required for causal identification.

---

## Paper Structure

- **§1 Introduction**: Observational studies vs. experiments; the role of observed covariates
- **§2 Propensity scores**: Definition, Theorem 1 (balancing), Corollary (ignorability sufficiency)
- **§3 Estimating propensity scores**: Logistic regression, discriminant analysis, iterative logit
- **§4 Methods using propensity scores**: Subclassification (§4.1), matching (§4.2), covariance adjustment (§4.3)
- **§5 Checking balance**: Assessing covariate balance within propensity score strata
- **§6 Example**: Wisconsin Survey data — effect of father's occupational prestige on son's earnings

---

## Key Results

1. **Theorem 1 (Balancing Property):** $T \perp X \mid e(X)$ where $e(x) = \Pr(T=1 \mid X=x)$.
   Within any stratum where $e(X)$ is constant, the multivariate distribution of $X$ is the same for treated and control units.

2. **Corollary (Ignorability Sufficiency):** If strong ignorability holds given $X$ — i.e., $(Y(0),Y(1)) \perp T \mid X$ and $0 < e(x) < 1$ for all $x$ — then strong ignorability also holds given the scalar $e(X)$ alone.

3. **Dimension reduction:** Instead of conditioning on all $p$ covariates, one can match or stratify on the single scalar propensity score and still achieve unconfounded comparisons.

---

## Connection to Vault Notes

→ [[Rosenbaum and Rubin 1983 - Overview]] — Paper overview note
→ [[Propensity Score Definition and Properties]] — Theorem 1 and Corollary with full derivations
→ [[Propensity Score Matching Methods]] — §4.1–4.2: subclassification and matching methods
→ [[Covariate Balance Diagnostics]] — §5: balance checking procedures
