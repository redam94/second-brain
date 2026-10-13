---
title: "Strobl 2008 - Correlated Predictor Selection in Tree Ensembles"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §2 Methods (introductory paras.), §2.1 Simulation design (Table 1), §2.2 Illustration of variable selection (Figure 1)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]]"
  - "[[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Strobl 2008 - Simulation Results for Conditional Importance]]"
  - "[[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]"
  - "[[Strobl 2008 - Discussion, mtry Guidance and Limitations]]"
aliases:
  - Strobl 2008 Simulation Design
  - Strobl 2008 Selection Rates
  - mtry and Correlated Predictor Selection
---

# Strobl 2008 - Correlated Predictor Selection in Tree Ensembles

> [!summary]
> This note covers the first mechanism behind inflated importance for correlated predictors. Tree splits are chosen greedily, one variable at a time and conditional only on the current branch. At the **root split** each variable is judged only by its marginal association with $Y$, so a predictor that is merely correlated with a strong driver looks almost as good as the driver. The paper's simulation has 12 Gaussian predictors, $X_1$–$X_4$ block-correlated at 0.9, and coefficients $(5,5,2,0,-5,-5,-2,0,0,0,0,0)$. With `mtry = 1`, the correlated $X_3$ and $X_4$ are chosen for first splits as often as the true drivers. As `mtry` grows they are chosen less often than $X_1, X_2$ but **more often than the equally strong uncorrelated drivers** $X_5, X_6$. Over all splits the advantage mostly disappears, but some preference for correlated variables with small or zero coefficients remains (§2.2, Fig. 1).
^summary-selection

## Overview

Section 2 opens with a short account of ensembles. **Bagging** fits a tree to each bootstrap sample or subsample and averages their votes. Individual trees are unstable but right on average. Several empirical studies support this view: Breiman's bagging and arcing papers, Bauer & Kohavi, and Dietterich (refs. [23-26]). In particular, Bühlmann & Yu showed that the gain comes from **smoothing hard decision boundaries**, which lowers variance. **Random forests** add diversity by restricting each split to a random subset of `mtry` candidate variables. That lets variables "that were otherwise outplayed by their competitors" enter the ensemble. Such a variable may not be optimal for the current split, but its selection "may reveal interaction effects with other variables that otherwise would have been missed and thus work towards the global optimality of the ensemble" (§2, para. 2). This is a claim about the **ensemble** as a whole and is separate from the later point (§2.2, ref. [33]) about global optimality of individual trees.

## Main Content

### Why greedy splitting prefers correlated predictors (§2, para. 3)

> [!definition] Locally optimal recursive split selection (§2, para. 3)
> At each node, CART-style trees pick the next split variable by optimizing a criterion (e.g. Gini gain) **within the current node**. The node is defined by all previous splits on the same branch. So split selection is
> - **conditional** on variables already used higher up the same branch, and
> - **unconditional** with respect to every other predictor.
>
> The **first** split depends only on the univariate association between each candidate and $Y$. A predictor with little or no association with $Y$ of its own, but highly correlated with an influential predictor, "may appear equally well suited for splitting as the truly influential predictor variable."
^def-local-split

The authors leave this property alone on purpose. Local search keeps trees computationally feasible, and globally optimal partitions are currently limited to low-dimensional problems (§2.2, final para.).

### Simulation design (§2.1, Table 1)

> [!example] Simulation design, Strobl et al. 2008 §2.1
> **Data-generating process.**
> $$
> y_i = \beta_1 x_{i,1} + \cdots + \beta_{12} x_{i,12} + \varepsilon_i, \qquad \varepsilon_i \overset{iid}{\sim} N(0, 0.5)
> $$
> The paper writes the error as $N(0, 0.5)$ and does not say whether 0.5 is the variance or the standard deviation.
>
> **Predictors.** $X_1,\dots,X_{12} \sim N(0, \Sigma)$ with unit variances $\sigma_{jj}=1$. The first four are **block-correlated**, $\sigma_{jj'} = 0.9$ for $j \ne j' \le 4$. All other covariances are 0.
>
> **Coefficients (Table 1, "Regression coefficients of the data generating process"):**
>
> | $X_j$ | $X_1$ | $X_2$ | $X_3$ | $X_4$ | $X_5$ | $X_6$ | $X_7$ | $X_8$ | ⋯ | $X_{12}$ |
> |---|---|---|---|---|---|---|---|---|---|---|
> | $\beta_j$ | 5 | 5 | 2 | 0 | −5 | −5 | −2 | 0 | ⋯ | 0 |
>
> Six of the twelve predictors are influential. **The design is a matched pair.** $X_1$–$X_4$ and $X_5$–$X_8$ have the same coefficient pattern (in absolute value), but only $X_1$–$X_4$ are correlated. Any difference in importance between, say, $X_1$ and $X_5$ is therefore an artefact of correlation. $X_4$ is the key test case: it has a zero coefficient but correlates 0.9 with three non-null predictors. $X_9$–$X_{12}$ are independent noise.
>
> **Fitting.** Forests are grown with `cforest` from the R package `party` (unbiased conditional-inference trees), using several values of `mtry`. The stated reason for varying `mtry` is "to be able to investigate the mechanisms responsible for the results of Nicodemus and Shugart", whose preliminary study found that permutation importance depends strongly on `mtry` (§2.1, final sentences). All other settings are package defaults.
>
> **Replications.** 500 (stated in §3).
>
> **`mtry` grid.** The text does not list it. The figure panels show `mtry` ∈ {1, 3, 8} in both Fig. 1 and Fig. 3 ([[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]).
>
> **Not stated anywhere:** the sample size $n$ per data set.
^ex-sim-design

The covariance structure follows Archer & Kimes. Their goal was to identify **one** influential predictor in a correlated set. This paper adds the comparison of correlated with uncorrelated predictors that have the same effect size.

### Selection-rate findings (§2.2, Figure 1)

**Figure 1** ("Selection rates"): relative selection rates of the twelve variables in the **first splits** (left panel) and in **all splits** (right panel) of all trees, for forests with different `mtry`.

> [!theorem] Finding: selection pattern for correlated predictors (§2.2, Fig. 1)
> **First splits (marginal association only):**
> 1. `mtry = 1` (no competition): $X_3$ and $X_4$ are chosen **as often as** the strong drivers $X_1, X_2, X_5, X_6$. They act as stand-ins for the influential variables they correlate with. Noise variables $X_8$–$X_{12}$ are also chosen almost as often. The authors attribute this to the "lax choice of the stop criterion", not to signal.
> 2. Larger `mtry` (strong competitors sometimes available): $X_3, X_4$ are chosen **less often than** $X_1, X_2$ but **more often than** the equally strong uncorrelated $X_5, X_6$.
>
> **All splits (conditional on the branch):**
> 3. Correlated predictors lose most of their advantage, because lower splits are conditional on variables already used, which may include the true correlated drivers.
> 4. A preference remains for correlated variables with small or zero coefficients ($X_3, X_4$ over $X_7, X_8$), with a similar dependence on `mtry`. This is because selection is still not conditional on *all* correlated variables.
^thm-selection-pattern

**Digitized values.** Figure 1 is transcribed in [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance#^ex-fig1-first]] and [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance#^ex-fig1-all]]. Root-split shares at `mtry = 3`: $X_1, X_2$ ≈ 0.22; $X_3$ ≈ 0.17; $X_4$ ($\beta = 0$) ≈ 0.15; $X_5, X_6$ ($\beta = -5$) ≈ 0.08. At `mtry = 8`: $X_1, X_2$ ≈ 0.41, $X_3$ ≈ 0.13, $X_4$ ≈ 0.05, and $X_5$–$X_{12}$ ≈ 0. Over all splits at `mtry = 8`, $X_5, X_6$ (≈0.95) slightly exceed $X_1, X_2$ (≈0.90), while $X_3$ (0.61) and $X_4$ (0.38) far exceed $X_7$ (0.21) and $X_8$ (0.05).

**Why it matters for importance.** A variable chosen near the root affects more observations and therefore receives more permutation importance. Early-split preference passes straight into the importance score. This is "part of this artefact", and the other part is the permutation scheme ([[Strobl 2008 - Permutation Importance Null Hypotheses]]).

## Examples

> [!example] Two-variable intuition (illustrative derivation, not in the paper)
> Let $Y = 5X_1 + \varepsilon$, $X_4 = 0.9X_1 + \sqrt{1-0.81}\,U$ with $U \perp X_1$, unit variances. Then $\mathrm{Corr}(Y, X_4) = 0.9\,\mathrm{Corr}(Y, X_1)$. At the root, a single best split on $X_4$ reduces squared error by about $0.81$ times as much as the best split on $X_1$ (exact for a linear projection, approximate for a single cut). When `mtry = 1` and only $X_4$ is drawn, a cut on $X_4$ is the best split available at that node. That is why proxies are picked at the root.
^example-selection-2

> [!example] Marketing analogue (illustrative)
> A forest is fit to per-segment weekly KPI data where display and paid-social spend are flighted together. With a small `mtry`, many trees split first on whichever of the two is drawn, so both get high root-split shares even if only one moves the KPI. Selection frequency is not evidence of an effect.
^example-selection-3

## Connections

- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] covers a separate split-selection bias: variables with more cutpoints win by chance. `cforest` removes that bias, which is why it is used here. The *correlation* preference shown here survives even with unbiased trees.
- The design is a clean example of a matched-contrast simulation. Compare [[Designing Simulated-Data Experiments]] and [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]. The text does not report $n$ or Monte Carlo standard errors.
- Randomized split candidates are also used in [[Honest Trees and Causal Forests]].

## See Also

- [[Strobl 2008 - Simulation Results for Conditional Importance]]: the importance scores for this design.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
