---
title: "Strobl 2008 - Permutation Importance Null Hypotheses"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §2.3 The permutation importance (Eq. 1 and forest average), §2.4 Types of independence (two H0 displays, two factorizations, Figure 2)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]]"
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
used_by:
  - "[[Conditional Permutation Importance (Strobl 2008 Algorithm)]]"
  - "[[Strobl 2008 - Simulation Results for Conditional Importance]]"
aliases:
  - Strobl 2008 Types of Independence
  - Marginal Permutation Null Hypothesis
  - OOB Permutation Importance (Strobl 2008 Eq. 1)
---

# Strobl 2008 - Permutation Importance Null Hypotheses

> [!summary]
> This note covers the second mechanism. Breiman's permutation importance is the drop in out-of-bag accuracy after $X_j$ is permuted (Eq. 1). Read as a permutation test, permuting $X_j$ against **both** $Y$ and the other predictors $Z$ is valid under $H_0: X_j \perp Y, Z$. A positive score therefore signals a departure from this joint null. That departure may come from $X_j$ being related to $Y$, or simply from $X_j$ being **correlated with $Z$**, which is irrelevant when the question is predictive relevance. The paper's alternative permutes $X_j$ only within groups with $Z = z$. This keeps the correlation structure and targets the **conditional independence** null $H_0: (X_j \perp Y) \mid Z$. When $X_j \perp Z$ the two schemes agree.
^summary-nulls

## Overview

Permutation importance is the standard model-agnostic importance measure. Its general definition and its extrapolation problem are covered in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], which owns that concept in this vault. This note records the **tree-wise OOB form** used by Strobl et al. and their **null-hypothesis reading** of it.

## Main Content

### The original permutation importance (§2.3)

> [!definition] Tree-wise OOB permutation importance (Strobl 2008, §2.3, Eq. 1)
> Let $\overline{\mathcal{B}}^{(t)}$ be the out-of-bag (OOB) sample of tree $t \in \{1,\dots,ntree\}$. The importance of $X_j$ in tree $t$ is
> $$VI^{(t)}(\mathbf{X}_j) = \frac{\sum_{i \in \overline{\mathcal{B}}^{(t)}} I\big(y_i = \hat y_i^{(t)}\big)}{\big|\overline{\mathcal{B}}^{(t)}\big|} - \frac{\sum_{i \in \overline{\mathcal{B}}^{(t)}} I\big(y_i = \hat y_{i,\pi_j}^{(t)}\big)}{\big|\overline{\mathcal{B}}^{(t)}\big|}$$
> where
> - $\hat y_i^{(t)} = f^{(t)}(\mathbf{x}_i)$ is tree $t$'s predicted class for observation $i$;
> - $\hat y_{i,\pi_j}^{(t)} = f^{(t)}(\mathbf{x}_{i,\pi_j})$ is the prediction after permuting $X_j$, with $\mathbf{x}_{i,\pi_j} = (x_{i,1},\dots,x_{i,j-1}, x_{\pi_j(i),j}, x_{i,j+1},\dots,x_{i,p})$ and $\pi_j$ a random permutation of the OOB indices;
> - $I(\cdot)$ is the indicator function, so each term is OOB classification accuracy.
>
> By definition $VI^{(t)}(\mathbf{X}_j) = 0$ if $X_j$ is not used in tree $t$.
^def-vi-tree

> [!definition] Forest-level raw permutation importance (§2.3)
> $$VI(\mathbf{X}_j) = \frac{1}{ntree}\sum_{t=1}^{ntree} VI^{(t)}(\mathbf{X}_j)$$
> Standard software also reports a **scaled** version ("z-score"): the raw importance divided by its standard error. Because "recent results [16,17]" indicate that the raw importance has better statistical properties, the paper uses **only the unscaled raw importance**. In the published reference list, [16] is Strobl & Zeileis (2008), "Danger: High Power! – Exploring the Statistical Properties of a Test for Random Forest Variable Importance" (COMPSTAT 2008), and [17] is Diaz-Uriarte & Alvarez de Andrés (2006), "Gene Selection and Classification of Microarray Data Using Random Forest". Ref. [16] is also the source for the poor properties of the Breiman–Cutler test. It is *not* Strobl et al. 2007, which is ref. [13].
^def-vi-forest

*Regression note.* Eq. 1 is written for classification accuracy. The simulation in §2.1 is a regression problem, and the paper says all results apply to regression trees. In that case the accuracy difference is replaced by the increase in OOB mean squared error, which is how `party` computes it. The paper does not print the regression formula.

### Permutation tests as a lens (§2.4, paras. 1-3)

In a permutation test ([[Permutation Tests and Exact Inference]]), the null hypothesis says which permutations leave the joint distribution unchanged. For example, under the global null $Y \perp (X_1,\dots,X_p)$,
$$P(Y, X_1, \dots, X_p) = P(Y)\cdot P(X_1,\dots,X_p),$$
so permuting $Y$ alters nothing. If the null is false, the permutation changes the joint distribution, or a test statistic computed from it.

The authors then ask which null hypothesis makes the RF permutation scheme valid. Under that null the importance is a random draw from a distribution with mean zero. Any departure from it lowers accuracy, which serves as the test statistic, and so raises the importance.

### The two null hypotheses (§2.4, Figure 2)

**Figure 2** shows the two schemes. Left: the original **marginal** scheme, where the $X_j$ column is shuffled against $Y$ and against all of $Z$. Right: the new **conditional** scheme, where $X_j$ is shuffled only within blocks of observations that share a value (cell) of $Z$.

> [!theorem] Null hypothesis of the marginal (original) permutation importance (§2.4)
> Let $Z = (X_1,\dots,X_{j-1},X_{j+1},\dots,X_p)$. Permuting $X_j$ against both $Y$ and $Z$ corresponds to
> $$H_0:\; X_j \perp Y, Z \qquad\text{or equivalently}\qquad X_j \perp Y \;\wedge\; X_j \perp Z,$$
> under which the joint distribution factorizes as
> $$P(Y, X_j, Z) \overset{H_0}{=} P(Y, Z)\cdot P(X_j).$$
> **Consequence.** A positive importance shows a violation of *either* part, $X_j \not\perp Y$ **or** $X_j \not\perp Z$. Only the first part matters for whether $X_j$ helps predict $Y$.
^thm-h0-marginal

*Remark (not in the paper).* "Or equivalently" is looser than it reads. Pairwise independence $X_j \perp Y$ and $X_j \perp Z$ does **not** in general imply joint independence $X_j \perp (Y, Z)$. The factorization $P(Y,X_j,Z)=P(Y,Z)P(X_j)$ is the joint statement, and it is the one the permutation actually tests. The argument goes through as long as the joint version is used.

> [!theorem] Null hypothesis of the conditional permutation importance (§2.4)
> Permuting $X_j$ only within groups of observations with $Z = z$ corresponds to
> $$H_0:\; (X_j \perp Y)\mid Z,$$
> under which the conditional distribution factorizes as
> $$P(Y, X_j \mid Z) \overset{H_0}{=} P(Y\mid Z)\cdot P(X_j \mid Z) \qquad\text{or}\qquad P(Y \mid X_j, Z) \overset{H_0}{=} P(Y \mid Z),$$
> "which is the definition of conditional independence." The within-group permutation keeps the empirical dependence between $X_j$ and $Z$, so only the $X_j$–$Y$ link given $Z$ is broken.
^thm-h0-conditional

> [!definition] The stated aim of the conditional measure (§2.4, para. 4)
> Of the two ways the marginal null can fail ($X_j \not\perp Y$ or $X_j \not\perp Z$), only the first matters for predictive relevance. The paper therefore wants "a measure of deviation from the null hypothesis that $X_j$ and $Y$ are independent under a given correlation structure between $X_j$ and the other predictor variables, that is determined by our data set" (§2.4, para. 4). The correlation structure is taken **as given by the observed data**, not modelled. Permuting $X_j$ only within groups with $Z = z$ is how the paper preserves that structure (right panel of Fig. 2).
^def-cpi-aim

> [!theorem] Corollary: when the schemes agree and disagree (§2.4, final para.)
> - If $X_j \perp Z$, both schemes give the same result. The simulation confirms this for $X_5$–$X_{12}$.
> - If $X_j$ and $Z$ are correlated, the marginal scheme produces an "apparent increase in the importance of correlated predictor variables". That increase comes from departures from the uninteresting null $X_j \perp Z$.
^cor-agree

**Proof sketch.** Write $P(Y, X_j, Z) = P(Y \mid X_j, Z)\,P(X_j \mid Z)\,P(Z)$. A marginal permutation replaces this with $P(Y, Z)\,P(X_j)$, which changes the distribution if *either* $P(Y\mid X_j,Z) \ne P(Y\mid Z)$ *or* $P(X_j \mid Z) \ne P(X_j)$. A within-$Z$ permutation replaces it with $P(Y \mid Z)\,P(X_j \mid Z)\,P(Z)$, which changes the distribution **only if** $P(Y \mid X_j, Z) \ne P(Y \mid Z)$. If the fitted model reproduces these distributions, the resulting accuracy drop isolates conditional dependence.

## Examples

> [!example] Oracle linear model: how much each scheme should give (illustrative derivation, not in the paper)
> Take the §2.1 design and the **true** regression function $f(\mathbf{x}) = \boldsymbol\beta^\top \mathbf{x}$. Replacing $x_j$ with an independent copy $x_j'$ raises the expected squared error by
> $$\Delta_{\text{marg}} = \beta_j^2\,\mathbb{E}[(X_j - X_j')^2] = 2\beta_j^2\,\mathrm{Var}(X_j).$$
> For $X_1$ this is $2\cdot 25 \cdot 1 = 50$, the same as for $X_5$. For the oracle model, correlation does **not** inflate marginal importance. The inflation in forests comes from fitted trees that split on proxies such as $X_4$ (see [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]).
>
> Permuting within exact $Z$-cells instead gives
> $$\Delta_{\text{cond}} = 2\beta_j^2\,\mathrm{Var}(X_j \mid Z).$$
> For $X_1$ given $(X_2,X_3,X_4)$ with equicorrelation 0.9: $c = (0.9,0.9,0.9)^\top$, and $\Sigma_{ZZ}\mathbf 1 = 2.8\cdot\mathbf 1$, so $c^\top\Sigma_{ZZ}^{-1}c = 3(0.81)/2.8 \approx 0.868$. Then $\mathrm{Var}(X_1\mid Z)\approx 0.132$ and $\Delta_{\text{cond}} \approx 6.6$, against 50 for $X_5$.
>
> **Interpretation.** *Exact* conditioning measures the **unique** information in $X_j$. It shrinks strongly correlated true drivers well below uncorrelated drivers with the same $\beta$. The tree-cutpoint grid in [[Conditional Permutation Importance (Strobl 2008 Algorithm)]] conditions only coarsely. That may explain why the paper's conditional scores for $X_1, X_2$ come out near those for $X_5, X_6$ (the text says "almost equal"; the digitized Fig. 3 medians are 16–31 vs 9–16, so still *above*) rather than far below them. See [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance#^thm-fig3-readings]]. This tension comes up again in [[Strobl 2008 - Discussion, mtry Guidance and Limitations]].
^ex-oracle

## Connections

- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]: the marginal permutation creates points such as ($X_1$ high, $X_2$ low) that almost never occur when $\rho = 0.9$. The forest has to extrapolate there, which is a third reason for inflated scores. Conditional permutation stays on the data manifold.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]: model reliance is the population form of the marginal permutation importance, and a conditional variant also exists.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]: argues *for* marginal (interventional) permutation when the question is causal influence on the *model*. The "right" null depends on the question being asked.
- [[Conditional Independence Assumption]]: the same $(\cdot \perp \cdot)\mid Z$ structure, used for identification.

## See Also

- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
- [[Permutation Tests and Exact Inference]]
