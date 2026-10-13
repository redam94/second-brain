---
title: "Permute-and-Predict Extrapolation in Variable Importance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, §1 Introduction pp. 1-5, incl. eq. (1); MCR definition also §5 item 1, p. 10"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
  - "[[Bias in Random Forest Variable Importance]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]]"
  - "[[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]"
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
  - "[[Problems with Shapley-Value Feature Importance]]"
aliases:
  - Permute-and-Predict
  - PaP Methods
  - Permutation Variable Importance (Breiman)
  - Permutation Importance Extrapolation
  - Partial Dependence and ICE Extrapolation
---

# Permute-and-Predict Extrapolation in Variable Importance

> [!summary]
> **Permute-and-predict (PaP)** diagnostics query a *fixed, already-trained* model at modified inputs: permutation variable importance ($\mathrm{VI}^\pi_j$), partial dependence ($\mathrm{PD}_j$) and ICE curves. They cost $O(N)$ predictions, work with any learner, have no tuning parameters and are very stable. When features are dependent, though, replacing $x_j$ by a draw from its **marginal** distribution moves query points into regions with **no training data**. The diagnostic then reports the model's **extrapolation** behaviour rather than its fit to the data. Hooker, Mentch & Zhou (2021, §1) separate this from a second, unavoidable issue: the permutation **estimand** ignores dependence even for a known function.
^summary-pap-extrapolation

## Overview

This is the vault's owner note for **permutation importance and its extrapolation problem**. It holds the definitions and conceptual framing from §1 of [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview|Hooker, Mentch & Zhou (2021)]]. The evidence (simulations, mechanism) and the remedies live in sibling notes.

## Main Content

### Framing: explaining the black box at all (§1, p. 1)

The paper opens by noting that machine-learning models are "algebraically complex" and give little insight into how they reach predictions, which has led many researchers to propose methods to "X-ray the black box". It adds that the task is precarious enough that some authors argue against post hoc explanation **altogether**, citing **Rudin (2019)**, *Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead* (Nature Machine Intelligence 1(5)). Hooker, Mentch & Zhou do not take that position. They accept that importance summaries are useful but argue that the cheap, model-agnostic versions must be replaced by ones that cost an extra model. The interpretable-model alternative is close to the additive-model distillation they recommend for effect plots in §6 ([[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]), and to the "two cultures" debate in [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].

### Notation (§1, p. 2)

- $X$: $N\times p$ feature matrix with rows $x_i$; $y$: response vector.
- $f$: a model trained on $(y,X)$ and held fixed.
- $L(y_i, f(x_i))$: loss for predicting $y_i$.
- $X^{\pi,j}$: $X$ with column $j$ randomly permuted; its rows are $x_i^{\pi,j}$.
- $X^{x,j}$: $X$ with the $j$th entry of every row set to the value $x$; rows $x_i^{x,j}$.
- $x_{-j}$: all features except $j$; $p_j(x_j)$: marginal density of $x_j$; $p_{-j}(x_{-j})$: marginal density of the rest.

### The three PaP tools

> [!definition] Definition: Permutation variable importance (Breiman 2001) (§1, p. 2)
> $$
> \mathrm{VI}^\pi_j=\sum_{i=1}^N L\big(y_i,f(x_i^{\pi,j})\big)-L\big(y_i,f(x_i)\big).
> $$
> It measures the increase in loss when $x_{ij}$ is replaced by a value drawn at random from the **marginal** distribution of feature $j$. Breiman designed it for random forests using **out-of-bag (OOB)** loss: importance is averaged over trees and each tree is scored on the data it did not see. The OOB version is written $\mathrm{VI}^o_j$ in §2. For other learners, training or test loss can be used. Fisher et al. (2019) average over **all** permutations and derive U-statistic concentration bounds; they also give a conditional-permutation version.
^def-vi-perm

> [!definition] Definition: Partial dependence function (Friedman 2001) (§1, p. 2)
> $$
> \mathrm{PD}_j(x)=\frac1N\sum_{i=1}^N f\big(x_i^{x,j}\big),
> $$
> the average prediction when the $j$th feature of every observation is set to $x$. Multivariate versions are defined in the same way.
^def-pdp

> [!definition] Definition: Individual conditional expectation curve (Goldstein et al. 2015) (§1, p. 2)
> $$
> \mathrm{ICE}_{i,j}(x)=f\big(x_i^{x,j}\big),
> $$
> the prediction for observation $i$ traced out as feature $j$ varies. $\mathrm{PD}_j$ is the average of the ICE curves. ICE shows how the effect of $x_j$ changes with the other inputs. For large $N$, a random subset of curves is plotted. Goldstein et al. note that ICE plots can help **detect** extrapolation.
^def-ice

**Why they are popular** (§1, pp. 2-3): $O(N)$ cost, any learner, no tuning, stable averages, wide software support, and an intuitive feel that "can give practitioners a (perhaps unwarranted) sense of confidence" (p. 2).

### Prior evidence of correlation bias (§1, p. 3)

- **Strobl et al. (2007)**: in classification trees, OOB permutation importance is biased toward features that are correlated with others and/or have many categories; bootstrapping makes this worse. See [[Bias in Random Forest Variable Importance]].
- **Archer & Kimes (2008)**: performance improves when signal features are uncorrelated with noise features.
- **Nicodemus et al. (2010)**: a large simulation; OOB measures overestimate correlated predictors.
- **Toloşi & Lengauer (2011)** (cited in §4): the same pattern in feature ranking.

### Two effects that must be separated (§1, p. 3)

> [!definition] Definition: Population targets of PaP diagnostics (§1, p. 3)
> For a fixed $f$, as $N\to\infty$, permutation importance targets
> $$
> \mathrm{VI}^\pi_j(f)=E_{y,x}\big[L(y,f_{-j}(x_{-j}))-L(y,f(x))\big],\qquad f_{-j}(x_{-j})=\int f(x)\,p_j(x_j)\,dx_j,
> $$
> where $p_j$ is the **marginal** density of $x_j$. Partial dependence targets
> $$
> f_j(x_j)=\int f(x)\,p_{-j}(x_{-j})\,dx_{-j}.
> $$
> Both integrate against **marginal** densities, so they put weight on $(x_j,x_{-j})$ combinations that the joint distribution rarely or never produces.
^def-pap-targets

1. **Effect 1, the summary of a known function.** Permutation ignores the correlation between $x_1$ and $x_2$ and treats each as separately manipulable, "in ways that may not be realistic." This cannot be avoided. Whether it is appropriate depends on the application, and Strobl et al.'s arguments address this question.
2. **Effect 2, the estimation effect.** Treat the permutation importance of the *true* function as the estimand and the permutation importance of a fitted random forest as the estimate. The estimate is then substantially biased because the forest is evaluated where it must extrapolate. The authors, following Hooker (2007), regard this effect as **at least as important** as the first.

**Geometry.** If $x_1,x_2$ are strongly positively dependent, no training point pairs large $x_1$ with small $x_2$. Predictions in that corner depend on the learner's extrapolation, and permutation methods put substantial weight on exactly those predictions. See the pregnant-men example in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview#^ex-pregnant-men]].

### The linear-model yardstick (§1, pp. 3-4)

For $f(x)=\beta_0+\sum_j\beta_jx_j$ with unit-variance covariates, permutation importance equals $\beta_j^2$ (up to scale) **regardless of the correlation**. This matches the reading "the change in $y$ for one unit change in $x_j$, keeping all else fixed". $\beta_j^2$, or its rank, is therefore the estimand when a random forest or neural network is fit to data from this model and then permuted. The authors find that the estimate is **biased upward for correlated covariates, and the bias grows with the correlation**. The alternative measures they recommend define importance differently even in linear models, but they do not extrapolate, so they do not show this gap between importance of the true model and importance of the ML estimate.

### Why it matters: backward elimination (§1, p. 4)

Consider recursive feature elimination with random forests, as in Díaz-Uriarte & De Andres (2006). If $x_1,x_2$ are strongly correlated, the inflated PaP scores keep both of them ahead of features that matter more in the true linear model. The process can end with a set of **mutually correlated, individually weak** features while more predictive ones are discarded.

### Inference, not model audit (§1, p. 4)

The paper treats variable importance as an **estimate** of the same quantity computed with the unknown true function. This is a statistical-properties view, as opposed to a **model audit** that summarizes a fixed fitted model. The authors compare this to Fisher et al.'s (2019) distinction between **model reliance** (importance of a feature to one fitted model) and **model class reliance**, which they describe as providing a generalized notion of confidence interval for variable importance; see [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] (the owner note for model reliance and the Rashomon set).

> [!definition] Definition: Model class reliance, as used in this paper (§1, p. 4; §5 item 1, p. 10)
> Model class reliance (MCR, Fisher et al. 2019) "examines how widely an importance measure can vary while maintaining close-to-optimal predictive accuracy" (p. 10). In Fisher et al.'s formal version (not spelled out in this paper), it is the range of an importance measure over the models in a class whose loss is within a tolerance of the best achievable loss. The paper calls it "a highly adaptable analogue of profile confidence intervals for methods based on optimization" (p. 4): just as a profile interval collects the parameter values whose profile likelihood stays near the maximum, MCR collects the importance values of all near-optimal models. It "can be employed with any notion of variable importance", either the PaP measures criticized here or **conditional permutations**. The authors do not study MCR, but say their results "would advocate for using the latter" (p. 4), and repeat on p. 10 that "this conditional version should be preferred".
^def-mcr-hmz

The paper studies **bias due to extrapolation only**, not variability. Measures of variability depend on the learner. For ensembles such as random forests, confidence intervals can be obtained through U-statistic theory (Ishwaran & Lu 2019, Statistics in Medicine 38(4)).

### Preview of remedies (§1, pp. 4-5)

- **Conditional generation**: draw $x_j$ from $x_j\mid x_{-j}$; Strobl et al. (2008) belongs here.
- **Re-learning**: mute the feature and fit a new model. Variants include permute-and-refit (Mentch & Hooker 2016, 2017), LOCO, which drops the feature (Lei et al. 2018), and the conditional randomization test with knockoffs (Candès et al. 2018). Under squared error all share one population target.
- Re-learning can still mislead. A permuted feature can **improve** accuracy in low-signal settings (Mentch & Zhou 2020). The authors therefore call **condition-and-relearn** "essentially the gold standard for evaluating feature importance" (p. 5).
- Both remedies need an extra model, which is the source of the subtitle "variable importance requires at least one more model".

Full definitions and theorems: [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]].

### Scope of the paper (§1, p. 5)

- The paper focuses on **permutation methods and their variants** that can be applied either to the **learned model** or to the **learning algorithm** that produced it, "in the spirit of staying within the algorithm class (Fisher et al., 2019)". Re-learning variants refit with the *same* algorithm rather than switching model families.
- It considers only **model-agnostic** procedures, applicable to any learner. Learner-specific diagnostics such as tree split-improvement are mentioned but not studied.
- Functional-ANOVA, distillation and Shapley approaches are acknowledged as alternatives but set aside. Generalized fANOVA and distillation are "not as straightforward" to implement, and Shapley implementations are "more complex than the methods we examine in this paper" (p. 5).
- Variability and confidence intervals are out of scope; the paper studies bias.

### Related frameworks (§1, p. 5)

> [!definition] Definition: Functional ANOVA decomposition (§1, eq. (1), p. 5)
> $$
> f(x)=f_0+f_1(x_1)+\dots+f_p(x_p)+\sum_{i<j}f_{ij}(x_i,x_j)+\dots
> $$
> Each effect $f_u$ for an index set $u$ is defined by averaging over the remaining features. When features are **independent**, PaP importance equals a **Sobol index** (Sobol 1993; Roosen 1995). Hooker (2007) generalized the expansion to arbitrary feature distributions in order to **avoid extrapolation**.
^def-fanova

- **Model distillation** (Tan et al. 2018): approximate the black box by an additive model. This gives results similar to the generalized functional ANOVA but is harder to implement than PaP.
- **Shapley values** (Lundberg & Lee 2017) assign "credit" to covariates for any quantity, including predictive performance or individual predictions. Some implementations have the same permutation structure and can be similarly misleading (Slack et al. 2020), and their implementation is more complex than PaP. See [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- **Split-improvement importance** (Friedman 2001) is specific to trees and is biased toward features with more potential splits (Strobl et al. 2007). Corrections: Zhou & Hooker (2019), Loecher (2020), Li et al. (2019).

## Examples

> [!example] Example: why the forest's corner matters
> Let $x_1,x_2\sim U[0,1]$ with Gaussian-copula correlation 0.9, and let $y=x_1+\varepsilon$. A permuted copy of $x_2$ is independent of $x_1$, so the permuted points fill the whole unit square (§4, Fig. 4 left) and many land in the nearly empty off-diagonal corners. There the random forest has no data and predicts by averaging distant leaves. The difference $f(x^{\pi,2})-f(x)$ is then large even though $x_2$ is irrelevant. Worked through in [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]].
^ex-forest-corner

> [!example] Example: marketing driver ranking (generic illustration)
> Per-segment tree models predict a shared aggregate KPI from weekly price, promotion depth and display activity. Promotion depth and display are almost always run together. Permutation importance then asks the model about deep promotions without display (and the reverse), a combination that never happened, so both features can outrank an independently varied price. The fix is to compare against a refit model, or to perturb promotion depth conditionally on display.
^ex-marketing-driver-ranking

## Connections

- Sobol-index view of importance under independence: [[Variance-Based Sensitivity and Sobol Indices]].
- The off-manifold issue for SHAP value functions: [[Problems with Shapley-Value Feature Importance]]; causal defence of interventional evaluation: [[Feature Relevance as a Causal Problem]].
- Permutation **tests**, which permute to build a null distribution, are a different use of permutation: [[Permutation Tests and Exact Inference]].
- Tree-based learners whose extrapolation drives the bias: [[Honest Trees and Causal Forests]].

## See Also
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — conditional permutation in practice
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — split-selection bias, a different mechanism
