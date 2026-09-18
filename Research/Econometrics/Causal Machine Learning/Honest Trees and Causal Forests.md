---
title: Honest Trees and Causal Forests
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/treatment-effects
  - topic/random-forests
  - type/method
  - doc/paper
source: "[[raw/Wager Athey 2018 - Heterogeneous Treatment Effects using Random Forests.pdf]]"
source_location: "§2.1-2.4 (pp. 5-9), eqs. 1-9, Procedures 1-2, Remarks 1-2; §4 (pp. 18-19), Definitions 2b, 4b, Remark 4; §5 (pp. 19-23), Tables 1-3"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Common Support and Overlap]]"
  - "[[Cross-Fitting and Sample Splitting]]"
used_by:
  - "[[Asymptotic Normality and Inference for Forests]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
aliases:
  - Causal Forest
  - Causal Forests
  - Honest Tree
  - Honesty
  - Double-Sample Trees
  - Propensity Trees
  - Wager Athey Causal Forest
---

# Honest Trees and Causal Forests

> [!summary]
> A **causal forest** (Wager & Athey 2018, JASA) estimates the conditional average treatment effect $\tau(x)=\mathbb E[Y^{(1)}-Y^{(0)}\mid X=x]$ by averaging many **causal trees**, each of which estimates $\tau$ in a leaf as the difference in mean outcomes between treated and control units in that leaf. Trees are viewed as **adaptive nearest-neighbor matching**: under unconfoundedness, a small enough leaf "acts as though it had come from a randomized experiment." The defining requirement is **honesty** — for each training example, its response $Y_i$ may be used *either* to place splits *or* to estimate the within-leaf effect, never both — implemented by **double-sample trees** (split on half $\mathcal J$, estimate on half $\mathcal I$) or **propensity trees** (split on $W$ only). Honesty removes the adaptive-overfitting bias that would otherwise prevent *centered* confidence intervals; subsampling re-randomizes the $\mathcal I/\mathcal J$ split across trees so that no data are wasted.

## Overview

[[Metalearners for CATE]] (S-, T-, X-learners) wrap generic regressors to obtain $\hat\tau(x)$ but carry no distributional theory for $\hat\tau(x)$ itself. Wager & Athey's contribution is "the first set of results … that allows any type of random forest, including classification and regression forests, to be used for provably valid statistical inference": pointwise consistency, asymptotic normality, and a consistent variance estimator (developed in [[Asymptotic Normality and Inference for Forests]]). This note covers the *construction* — what a causal tree is, how it splits, and what honesty means.

**Setup.** i.i.d. $(X_i,Y_i,W_i)$ with $X_i\in[0,1]^d$, $W_i\in\{0,1\}$, potential outcomes $Y_i^{(0)},Y_i^{(1)}$ ([[Potential Outcomes Framework]]). Identification rests on unconfoundedness $\{Y_i^{(0)},Y_i^{(1)}\}\perp W_i\mid X_i$ (eq. 2; the vault's [[Conditional Independence Assumption]]) and overlap $\varepsilon<\mathbb P[W=1\mid X=x]<1-\varepsilon$ (eq. 6; [[Common Support and Overlap]]), which "effectively guarantees that, for large enough $n$, there will be enough treatment and control units near any test point $x$ for local methods to work." Unlike IPW approaches based on $\mathbb E[Y_i(W_i/e(x)-(1-W_i)/(1-e(x)))\mid X_i=x]=\tau(x)$, the causal forest reaches consistency "without needing to explicitly estimate the propensity $e(x)$."

## Main Content

> [!definition] Causal tree and causal forest (eqs. 4–5) ^def-causal-tree
> A regression tree predicts $\hat\mu(x)=|\{i:X_i\in L(x)\}|^{-1}\sum_{\{i:X_i\in L(x)\}}Y_i$, where $L(x)$ is the leaf containing $x$. A **causal tree** instead predicts
> $$
> \hat\tau(x)=\frac{1}{|\{i:W_i=1,X_i\in L\}|}\sum_{\{i:W_i=1,\,X_i\in L\}}Y_i\;-\;\frac{1}{|\{i:W_i=0,X_i\in L\}|}\sum_{\{i:W_i=0,\,X_i\in L\}}Y_i .
> $$
> A **causal forest** averages $B$ such trees, $\hat\tau(x)=B^{-1}\sum_{b=1}^B\hat\tau_b(x)$, each grown on a random subsample of size $s$ drawn *without replacement*, with $s/n\ll1$ (theory: $s\asymp n^\beta$, $\beta<1$).

Trees are "nearest neighbor methods with an adaptive neighborhood metric": leaves are narrow along directions where the signal changes quickly and wide elsewhere, which is where forests gain power over $k$-NN matching in moderate dimension. Following Breiman, the forest uses *deep* trees (minimum leaf size $k$ as small as 1 per arm), so no within-leaf propensity correction is needed — in contrast to Athey & Imbens' (2016) single, larger-leaved causal tree, which reweights by propensity inside each leaf.

> [!definition] Honesty (Definitions 2, 2b) ^def-honesty
> A (causal) tree is **honest** if, for each training example $i$, it only uses the response $Y_i$ to estimate the within-leaf treatment effect $\tau$ *or* to decide where to place splits, but not both. Formally: (a) *standard case* — the tree does not use $Y_1,\dots,Y_s$ in choosing splits (it may use $X_i$ and $W_i$); or (b) *double-sample case* — the tree does not use the $\mathcal I$-sample responses for placing splits.

> [!algorithm] Procedure 1 — Double-sample trees ^alg-double-sample
> **Input:** $n$ examples $(X_i,Y_i,W_i)$; minimum leaf size $k$.
> 1. Draw a random subsample of size $s$ without replacement; divide it into disjoint halves $|\mathcal I|=\lfloor s/2\rfloor$, $|\mathcal J|=\lceil s/2\rceil$.
> 2. Grow a tree by recursive partitioning. Splits may use any data from $\mathcal J$ and $X$- or $W$-observations from $\mathcal I$, but **not** $Y$-observations from $\mathcal I$.
> 3. Estimate leaf-wise responses using only $\mathcal I$-sample observations (eq. 5).
>
> Splits maximize the variance of $\hat\tau(X_i)$ over $i\in\mathcal J$ (Athey & Imbens 2016), subject to each leaf containing $\ge k$ $\mathcal I$-sample observations *of each treatment class*.

> [!algorithm] Procedure 2 — Propensity trees ^alg-propensity-tree
> 1. Draw a random subsample $\mathcal I$ of size $s$ without replacement.
> 2. Train a **classification tree for $W_i$** on $(X_i,W_i)_{i\in\mathcal I}$ (e.g. Gini criterion), each leaf keeping $\ge k$ observations of each class.
> 3. Estimate $\tau(x)$ with eq. (5) on the leaf containing $x$.
>
> Honest by construction (never looks at $Y$ when splitting). Leaves group units with similar treatment propensity — forest-based propensity matching — so this procedure is "particularly useful in observational studies, where we want to minimize bias due to variation in $e(x)$."

**Why the variance-of-$\hat\tau$ splitting rule (Remark 1).** For a regression tree, because predictions are leaf means, $\sum_{i\in\mathcal J}(\hat\mu(X_i)-Y_i)^2=\sum_{i\in\mathcal J}Y_i^2-\sum_{i\in\mathcal J}\hat\mu(X_i)^2$, so minimizing squared error is *equivalent to maximizing the variance of the fitted values*. The treatment effect analogue cannot minimize $\sum(\hat\tau(X_i)-\tau_i)^2$ directly — $\tau_i$ is never observed — but it *can* maximize the variance of $\hat\tau(X_i)$. The tree therefore seeks splits that expose **heterogeneity in treatment effects**, not heterogeneity in outcome levels. (GRF later replaces this exact criterion with a gradient-based approximation; see [[Generalized Random Forests - Local Moment Equations]].)

**Why honesty.** A greedy tree places splits where the observed $\hat\tau$ difference between children is largest, which preferentially selects differences inflated by noise; re-using the same $Y_i$ to estimate leaf effects yields estimates biased away from the truth (a winner's-curse effect). With honesty, conditional on the partition, the $\mathcal I$-sample leaf means are unbiased for the leaf's population means, and after the splitting stage (eq. 25)
$$
\mathbb E[\Gamma(x)\mid X,W]=\frac{\sum_{i\in\mathcal I^{(1)}(x)}\mathbb E[Y^{(1)}\mid X=X_i]}{|\mathcal I^{(1)}(x)|}-\frac{\sum_{i\in\mathcal I^{(0)}(x)}\mathbb E[Y^{(0)}\mid X=X_i]}{|\mathcal I^{(0)}(x)|},
$$
using unconfoundedness. Remaining bias is purely a *leaf-diameter* effect, controlled by Lipschitz continuity; overlap is what guarantees the diameter shrinks fast enough with both arms represented. Remark 2 and Appendix B add that adaptive (non-honest) forests with small leaves "can overfit to outliers in ways that make them inconsistent near the edges of sample space."

**No data are wasted.** Sample splitting is usually criticized for discarding half the data. Here "the forest subsampling mechanism enables us to achieve honesty without wasting any data …, because we re-randomize the $\mathcal I/\mathcal J$-data splits over each subsample." The authors further report that double-sample trees "can improve upon standard random forests in terms of mean-squared error as well." This is the forest-internal analogue of fold rotation in [[Cross-Fitting and Sample Splitting]].

**Additional regularity conditions used by the theory.** *Random-split*: every feature has probability $\ge\pi/d$ of being the split variable at each step (so leaves shrink in all directions). *$\alpha$-regular*: each split leaves at least a fraction $\alpha\le0.2$ of observations on each side, and the leaf containing $x$ has at least $k$ observations from each treatment group and fewer than $2k-1$ from at least one (Definition 4b) — "regular causal trees seek to act as fully grown trees for the rare treatment assignment." *Symmetric*: output invariant to the ordering of training examples. Remark 4 cautions that regularity cannot in general hold at all $x$ simultaneously; the theorems are **pointwise**.

## Examples

**Simulation 1 — confounding, no effect (eq. 27).** $\tau(x)=0$, $e(X)=\frac14(1+\beta_{2,4}(X_1))$, $m(X)=2X_1-1$, $n=500$, propensity trees with $B=1000$, $s=50$.

| $d$ | MSE: CF | MSE: 10-NN | MSE: 100-NN | Coverage: CF | 10-NN | 100-NN |
|---|---|---|---|---|---|---|
| 2 | 0.02 | 0.21 | 0.09 | 0.95 | 0.93 | 0.62 |
| 10 | 0.02 | 0.28 | 0.12 | 0.94 | 0.91 | 0.51 |
| 20 | 0.02 | 0.32 | 0.13 | 0.88 | 0.89 | 0.49 |
| 30 | 0.02 | 0.33 | 0.13 | 0.85 | 0.89 | 0.48 |

Causal forests hold MSE at 0.02 as $d$ grows while $k$-NN is an order of magnitude worse; nominal coverage holds up to $d\approx10$ and then decays.

**Simulation 2 — heterogeneity in an RCT (eq. 28).** $\tau(X)=\varsigma(X_1)\varsigma(X_2)$, $\varsigma(x)=1+1/(1+e^{-20(x-1/3)})$, $e=0.5$, $n=5000$, double-sample trees with $s=2500$, $B=2000$. MSE 0.02–0.04 vs. 0.29–0.38 for 7-NN across $d=2,\dots,8$; coverage 0.97 → 0.90. Unexpectedly, MSE *improves* with $d$ for small $d$ because extra split candidates decorrelate the trees. With a sharper spike (eq. 29) coverage falls to 0.73 at $d=8$ — "the random forest is dominated by bias instead of variance" — a reminder that forest CIs are honest about variance but not about smoothing bias near peaks and boundaries.

**Usage sketch (R `grf`, the successor implementation cited in fn. 8).**

```r
library(grf)
cf  <- causal_forest(X, Y, W, num.trees = 2000, honesty = TRUE)
hat <- predict(cf, X.test, estimate.variance = TRUE)
ci  <- cbind(hat$predictions - 1.96 * sqrt(hat$variance.estimates),
             hat$predictions + 1.96 * sqrt(hat$variance.estimates))
```

## Connections

- [[Asymptotic Normality and Inference for Forests]] — Theorems 1 and 11 and the infinitesimal jackknife that make the intervals above valid.
- [[Generalized Random Forests - Local Moment Equations]] — generalizes Procedure 1 (weights instead of tree averaging, gradient splitting) and reconciles Procedures 1 and 2 via local centering.
- [[Cross-Fitting and Sample Splitting]] — honesty is sample splitting at the tree level.
- [[Metalearners for CATE]], [[S-Learner]], [[T-Learner and Minimax Rate]], [[X-Learner]], [[Künzel 2019 - Overview]] — metalearner alternatives; Künzel et al. often use honest forests as base learners, but only the causal forest carries pointwise CI theory.
- [[Nonparametric Causal Inference]] — BART (Hill 2011), which the paper notes "won the … 2016 Atlantic Causal Inference Conference" challenge, is the Bayesian tree-ensemble route; it gives posterior intervals rather than frequentist pointwise guarantees.
- [[Matching Methods and Distance Measures]], [[Propensity Score Matching - Overview]] — causal forests as matching with a *learned*, outcome-relevant metric; propensity trees as forest-based propensity matching.

## See Also

- [[Common Support and Overlap]] — leaves without both arms cannot estimate $\tau$; the $k$-per-arm constraint operationalizes overlap locally.
- [[R-Learner and Orthogonal CATE Estimation]] — an alternative, loss-based route to $\tau(\cdot)$ that can be stacked with a causal forest.
- [[Heterogeneity in Agent Models]] — estimated CATE surfaces are a data-driven source of agent-level response heterogeneity for ABM calibration.
