---
title: "Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines"
tags:
  - source/ingested
  - topic/model-validation
  - topic/machine-learning
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): §10 Bellman and the Curse of Dimensionality (p. 208), §10.1 Digging It Out in Small Pieces (p. 208), §10.2 The Shape Recognition Forest (p. 208), §10.3 Support Vector Machines incl. the optimal-hyperplane diagram and Vapnik's bound (pp. 208-209)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]"
  - "[[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]]"
used_by:
  - "[[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]"
  - "[[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]"
aliases:
  - Blessing of dimensionality
  - Breiman Bellman lesson
  - Vapnik support-vector generalization bound
  - Amit-Geman shape recognition forest
---

# Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines

> [!summary]
> §10 reverses the traditional advice to escape Bellman's "curse of dimensionality" by deleting variables or compressing them into a few features. Reducing dimension throws away information; instead, **increase dimensionality** by adding many functions of the predictors and extract the small pieces of information each holds. Two exemplars: the **Amit-Geman shape recognition forest** (thousands of hierarchical geometric features, 1,000+ shallow randomised trees, 0.7% test error on NIST handwritten digits) and **support vector machines** (add polynomial monomials until the classes become linearly separable; ZIP-code test error 4.1%, NIST 1.1%). Overfitting is controlled not by dimension but by the number of support vectors, through Vapnik's bound $E(GE)\le E(\#\text{support vectors})/(N-1)$.
^sum-bellman-blessing-of-1

## Overview

The third lesson. It is the most direct challenge to small-sample statistical training (Diaconis and Efron's warning about 19 variables with 155 cases is quoted in §11.4), and Efron's comment asks where the bias-variance trade-off went. Breiman's answer: regularisation comes from the algorithm's structure (margin, voting), not from cutting variables.

## Main Content

### §10 The curse (p. 208)

For decades the first step in prediction was to avoid the curse: with too many variables, find a few features that "contain most of the information" and use them instead. In regression, logistic regression and survival models, the advice was variable deletion. Meisel (1972) wrote that "the features ... must be relatively few in number." "But recent work has shown that dimensionality can be a blessing."

> [!theorem] Digging it out in small pieces (§10.1, p. 208)
> "Reducing dimensionality reduces the amount of information available for prediction." There is information in each predictor and in combinations of predictors. So:
> - "Instead of reducing dimensionality, increase it by adding many functions of the predictor variables."
>
> There may then be thousands of features, each with a small amount of information; the problem is how to extract and combine those pieces. The two outstanding examples are the Shape Recognition Forest and Support Vector Machines.
^thm-blessing

> [!example] §10.2 The Shape Recognition Forest (Amit and Geman 1997) (p. 208)
> **Data.** 1992 NIST competition for reading handwritten numerals: 223,000 pixel pictures written by over 2,000 individuals.
>
> **Algorithm.**
> 1. Define many thousands of small geometric features in a hierarchical assembly.
> 2. Grow **shallow** trees; at each node choose **100 features at random** from the appropriate hierarchy level and find the optimal split among them.
> 3. Dropping a picture down one tree lands it in a terminal node giving class probabilities $p_0,\dots,p_9$ for digits $0,\dots,9$.
> 4. Grow over 1,000 trees, average the probabilities over the forest, and predict the digit with the largest averaged probability.
>
> **Result.** 100,000 training and 50,000 test examples: test error 0.7%, "close to the limits of human error."
^ex-amit-geman

### §10.3 Support vector machines (pp. 208-209)

> [!definition] Optimal separating hyperplane and support vectors (§10.3, pp. 208-209)
> Two-class data with prediction vectors in $M$-dimensional Euclidean space: $\{\mathbf x_1\}$ for class 1 and $\{\mathbf x_2\}$ for class 2. If a hyperplane separates them, the **optimal separating hyperplane** is the one whose distance to any prediction vector is maximal (the maximum-margin hyperplane). The vectors in either class that achieve the minimum distance to it are the **support vectors**; their coordinates determine the hyperplane's equation. Vapnik (1995) showed that if a separating hyperplane exists, the optimal one has low generalization error. (The paper includes a diagram of the optimal hyperplane with support vectors on the margin.)
^def-svm

> [!algorithm] Raising dimension until separation (§10.3, p. 209)
> 1. Start with the original $M$ predictors. Two-class data are rarely linearly separable.
> 2. Add all quadratic monomials $x_{m_1}x_{m_2}$ as extra features. A hyperplane in the expanded space is a more complex surface in the original space, and separation is more likely.
> 3. If still not separable, add cubic monomials, and so on. With 30 original predictors, monomials up to degree four give about 40,000 features.
> 4. If separation cannot be had with relatively few support vectors, use the soft-margin version, which adds a penalty for vectors on the wrong side of the hyperplane.
>
> Computation: clever algorithms reduce the search to a quadratic program with linear inequality constraints of order $N$ (the number of cases), **independent of the feature-space dimension**; specialised solvers give an order-of-magnitude speed-up over generic QP.
^alg-svm-expansion

Results quoted: ZIP-code data — separation with fourth-degree monomials, **test error 4.1%**; a large subset of the NIST database — separation after adding up to fourth-degree monomials, **test error 1.1%**.

> [!theorem] Vapnik's support-vector bound on generalization error (§10.3, p. 209; Vapnik 1995)
> Separation can always be had by raising the dimension high enough, but a too-complex separating hyperplane generalises badly. For the optimal separating hyperplane trained on $N$ cases,
> $$
> E(GE)\ \le\ \frac{E(\text{number of support vectors})}{N-1},
> $$
> where $GE$ is the generalization (infinite-test-set) error and the expectation is over all training sets of size $N$ drawn from the same distribution as the original training set.
>
> **Reading.** The number of support vectors increases with feature-space dimension. If it becomes too large, the hyperplane will not generalise well. So the controlling quantity is the number of support vectors, not the raw dimension.
>
> **Proof sketch (leave-one-out argument, not given in the paper).** The leave-one-out error on $N$ cases is an unbiased estimate of the expected error of a machine trained on $N-1$ cases. Removing a non-support vector leaves the optimal hyperplane unchanged, so that case is still correctly classified; only support vectors can be misclassified when left out. Hence leave-one-out error $\le$ (number of support vectors)/$N$, and taking expectations gives $E[GE_{N-1}]\le E[\#SV_N]/N$. This is the standard textbook form. The paper states its bound with $N-1$ in the denominator (§10.3, p. 209); this note does not attempt to reconcile the two forms, and the leave-one-out argument above is supplementary material, not the paper's content.
^thm-vapnik-bound

SVMs also handle regression, give "excellent performance" and were "beginning to supplant the use of neural nets." Cristianini and Shawe-Taylor (2000) is recommended as a readable introduction.

### Cox's reaction (p. 218)

Cox notes that Vapnik's result confirms the folklore that with many explanatory variables complete separation in logistic regression is quite likely. Mainstream thinking treats complete separation as a priori unlikely and the separating plane as unstable; he suspects bootstrap and cross-validation "may give here a quite misleading illusion of stability," while accepting that if the separator is subtle and stable Breiman's methods win — "an empirical question in each application." See [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]].

## Examples

> [!example] Feature explosion in practice: the credit scorecard (Hoadley, pp. 220-221)
> Hoadley's discussion gives a business case: 24 raw inputs (12 months of bills and payments) were turned into hundreds of characteristics, pared to about 100, each binned into about 10 attributes, across about 10 segments — $100\times10\times10=10{,}000$ features. "Yes indeed, dimensionality is a blessing."
^ex-bellman-blessing-of-2

> [!example] Blessing or curse with weekly media data
> With 156 weekly rows, adding hundreds of lagged and transformed media features to a linear model will overfit; the blessing in §10 depends on a fitting method that controls effective complexity (margins, averaging over randomised trees, shrinkage) and on honest held-out evaluation. Use [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]-style reasoning about events per parameter, or shrinkage priors such as [[Global-Local Shrinkage Priors]], rather than assuming more features are free.
^ex-bellman-blessing-of-3

## Connections

- Efron's reply in the discussion: the success "must hinge on some form of biased estimation" — regularisation, pruning, or margin maximisation; see [[Empirical Bayes Interpretation of Shrinkage]] for the statistical view of that bias.
- Random-feature selection at each node is the same device as in random forests ([[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]).
- High-dimensional selection with error control: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]] — definition of generalization error
- [[Model Selection and Overfitting]]
