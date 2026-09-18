---
title: "Propensity Score Matching: Foundational Papers Survey"
source: "https://doi.org/10.1093/biomet/70.1.41"
author:
  - "[[Paul R. Rosenbaum]]"
  - "[[Donald B. Rubin]]"
  - "[[Elizabeth A. Stuart]]"
  - "[[Guido W. Imbens]]"
published: "1983 / 2004 / 2010"
created: 2026-06-28
description: >
  Survey of the classical propensity score matching framework covering: Rosenbaum & Rubin (1983) Biometrika — the balancing theorem and identification result; Rosenbaum & Rubin (1985) American Statistician — practical matching algorithms and caliper choice; Stuart (2010) Statistical Science — comprehensive review of matching methods and balance diagnostics; Imbens (2004) Review of Economics and Statistics — nonparametric treatment-effect estimation including matching estimators. All papers freely available: arXiv:1010.5586 (Stuart), NBER WP t0294 (Imbens).
tags:
  - "clippings"
  - "doc/paper"
  - "topic/causal-inference"
  - "topic/econometrics"
---

# Propensity Score Matching: Survey of Foundational Literature

This note summarises the four principal references for the classical propensity score matching (PSM) framework, as the source PDFs could not be retrieved programmatically. Content is drawn from comprehensive coverage of these papers in the causal inference literature.

---

## 1. Rosenbaum & Rubin (1983) — *The Central Role of the Propensity Score in Observational Studies for Causal Effects* (Biometrika 70: 41–55)

### Core result: The Balancing Theorem

Let $T \in \{0,1\}$ be treatment, $X$ be a vector of pre-treatment covariates, and $e(X) = P(T=1 \mid X)$ be the **propensity score**.

**Theorem (Rosenbaum & Rubin, 1983, Theorem 1):** If treatment assignment is strongly ignorable given $X$:

$$
\{Y(0), Y(1)\} \perp T \mid X \quad \text{and} \quad 0 < P(T=1 \mid X) < 1
$$

then treatment assignment is also strongly ignorable given the propensity score $e(X)$ alone:

$$
\{Y(0), Y(1)\} \perp T \mid e(X)
$$

**Balancing property:** Conditional on $e(X)$, the distribution of $X$ is the same in the treatment and control groups:

$$
T \perp X \mid e(X)
$$

This is a one-dimensional sufficient statistic for achieving covariate balance in the treatment group, regardless of the dimensionality of $X$. This is the key dimensionality-reduction result that makes matching computationally feasible.

### Identification corollary

Under strong ignorability, conditional average treatment effects are identified from observable quantities:

$$
\tau(x) = E[Y \mid T=1, e(X)=e] - E[Y \mid T=0, e(X)=e]
$$

The paper proposes four estimators: (1) subclassification on the propensity score (Cochran 1968 extended), (2) direct adjustment, (3) matching, (4) covariance adjustment in matched samples.

### Propensity score estimation

Rosenbaum & Rubin recommend estimating $e(X) = P(T=1 \mid X)$ via logistic regression. For exact balance, the true propensity score is rarely used; the estimated score is preferred in practice (estimated PS has better finite-sample properties than the true PS — a counterintuitive result formalised by Hirano, Imbens & Ridder 2003).

---

## 2. Rosenbaum & Rubin (1985) — *Constructing a Control Group Using Multivariate Matched Sampling Methods that Incorporate the Propensity Score* (American Statistician 39: 33–38)

### Matching algorithms

The paper introduces the practical matching workflow:

1. Estimate $\hat{e}(X)$ via logistic regression.
2. Construct matched pairs by **nearest-neighbour matching on the logit propensity score** $\log[\hat{e}(X)/(1-\hat{e}(X))]$.
3. Apply a **caliper** $\delta$ to prevent poor matches: only accept a match if $|\text{logit}\,\hat{e}(T_i) - \text{logit}\,\hat{e}(C_j)| \leq \delta$.

### Caliper width recommendation

Rosenbaum & Rubin (1985) recommend $\delta = 0.25 \sigma_{\text{logit}}$, where $\sigma_{\text{logit}}$ is the standard deviation of the logit propensity score in the full (pre-matched) sample. Austin (2011) revisits this empirically and refines the recommendation to $0.2 \sigma_{\text{logit}}$.

### Covariate balance assessment

The paper advocates checking balance by examining the **standardised difference** for each covariate before and after matching, rather than relying on hypothesis tests. This diagnostic philosophy — look at effect sizes, not p-values — is a key methodological contribution.

---

## 3. Stuart (2010) — *Matching Methods for Causal Inference: A Review and a Look Forward* (Statistical Science 25: 1–21; arXiv:1010.5586)

### Taxonomy of matching methods

| Method | Description | When to use |
|--------|-------------|-------------|
| **Nearest neighbour (greedy)** | Each treated unit matched to closest control; no backtracking | Simple, fast; risk of poor matches with bad overlap |
| **Nearest neighbour with caliper** | NN matching with maximum distance $\delta$ | Prevents large mismatches; may leave some treated unmatched |
| **Optimal matching** | Minimise total matched distance across all pairs | Avoids greedy suboptimality; slower, requires `optmatch` |
| **Full matching** | All units in matched subclasses (1+ treated, 1+ control each) | Most efficient use of data; complex weighting |
| **Subclassification** | Divide PS distribution into strata (typically 5 quintiles) | Reduces extrapolation; easy to implement |
| **Mahalanobis distance** | Distance in covariate space (not PS) | Low-dimensional $X$; exact balance on specific variables |
| **Exact matching** | Force exact equality on key covariates | When a few discrete covariates must be matched exactly |
| **Coarsened exact matching (CEM)** | Coarsen covariates; exact match within coarsened strata | Controls imbalance directly; Iacus, King & Porro (2012) |

### Matching estimand

Matching typically estimates the **Average Treatment Effect on the Treated (ATT)**:

$$
\tau_{\text{ATT}} = E[Y(1) - Y(0) \mid T=1]
$$

because the matched control group is the counterfactual specifically for treated units. IPW estimators more naturally target ATE. The choice of estimand should drive the choice of method.

### Common support (overlap)

Matching automatically handles the **common support** problem: treated units whose propensity scores fall outside the control distribution cannot be matched and are excluded. This narrows the estimand to the region of overlap — a feature, not a bug, because extrapolation in that region is impossible.

---

## 4. Imbens (2004) — *Nonparametric Estimation of Average Treatment Effects Under Exogeneity: A Review* (RESTAT 86: 4–29; NBER WP t0294)

### Matching as a nonparametric estimator

Imbens (2004) places matching in the class of nonparametric estimators for:

$$
\tau = E[Y(1) - Y(0)]
$$

The **matching estimator** of Abadie & Imbens (2006) is:

$$
\hat{\tau}_M = N^{-1} \sum_{i=1}^{N} (2T_i - 1)(1 + K_M(i))^{-1}[Y_i - \hat{\mu}_{1-T_i}(X_i)]
$$

where $K_M(i)$ is the number of times unit $i$ is used as a match. This estimator is $\sqrt{N}$-consistent under regularity conditions.

### Bias of nearest-neighbour matching

A key result (Abadie & Imbens 2006): nearest-neighbour matching is generally biased at rate $N^{-1/2}$ in finite samples due to **imperfect covariate matching**. The bias comes from residual covariate imbalance within matched pairs. The bias-corrected matching estimator adjusts for this using regression within matched pairs.

### Efficiency comparisons

Under selection on observables, the **semiparametric efficiency bound** for ATE is:

$$
V^* = E\!\left[\frac{\sigma^2_1(X)}{e(X)} + \frac{\sigma^2_0(X)}{1-e(X)} + (\tau(X) - \tau)^2\right]
$$

where $\sigma^2_t(X) = \text{Var}[Y(t) \mid X]$. IPW achieves this bound (with known PS); matching does not achieve it but doubly-robust estimators do.

---

## Key Takeaway for the Vault

The classical PSM framework fills the gap between:
- **Bayesian IPW (Liao-Zigler)** — see [[Bayesian Propensity Score Weighting]]
- **Frequentist IPW and DR estimators** — see [[Frequentist Causal Estimation]]

Matching is conceptually distinct from weighting: it *discards* units that lack suitable comparators, making the selection of the estimand explicit. The diagnostics (love plots, overlap plots, SMD) are the practitioner's primary tool for validating the design.

## References

- Rosenbaum, P.R. & Rubin, D.B. (1983). The central role of the propensity score in observational studies for causal effects. *Biometrika* 70(1): 41–55. https://doi.org/10.1093/biomet/70.1.41
- Rosenbaum, P.R. & Rubin, D.B. (1985). Constructing a control group using multivariate matched sampling methods. *The American Statistician* 39(1): 33–38.
- Stuart, E.A. (2010). Matching methods for causal inference: A review and a look forward. *Statistical Science* 25(1): 1–21. arXiv:1010.5586.
- Imbens, G.W. (2004). Nonparametric estimation of average treatment effects under exogeneity: A review. *Review of Economics and Statistics* 86(1): 4–29. NBER WP t0294.
- Austin, P.C. (2011). Optimal caliper widths for propensity-score matching when estimating differences in means and differences in proportions in observational studies. *Pharmaceutical Statistics* 10(2): 150–161.
- Abadie, A. & Imbens, G.W. (2006). Large sample properties of matching estimators for average treatment effects. *Econometrica* 74(1): 235–267.
