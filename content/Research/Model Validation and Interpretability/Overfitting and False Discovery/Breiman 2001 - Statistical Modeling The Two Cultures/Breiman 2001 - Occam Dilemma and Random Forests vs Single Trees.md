---
title: "Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees"
tags:
  - source/ingested
  - topic/model-validation
  - topic/machine-learning
  - topic/interpretability
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): §9 Occam and Simplicity vs. Accuracy (pp. 206-207), §9.1 Growing Forests for Prediction (p. 207), §9.2 Forests Compared to Trees with Table 1 (data set descriptions) and Table 2 (test set misclassification error) (p. 207), §9.3 Random Forests are A+ Predictors (p. 208), §9.4 The Occam Dilemma (p. 208)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]"
  - "[[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]]"
used_by:
  - "[[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]"
  - "[[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]"
aliases:
  - Occam dilemma
  - Breiman Occam dilemma
  - Breiman 2001 Table 2 forest vs tree
  - Trees A+ interpretability, forests F
---

# Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees

> [!summary]
> §9 states the **Occam dilemma**: "Accuracy generally requires more complex prediction methods. Simple and interpretable functions do not make the most accurate predictors." Single trees get an A+ for interpretability (the Colorado court-delay tree) but a B for prediction. Growing a **forest** — many trees on perturbed training sets, combined by vote or average — cuts test error sharply: Table 2 shows forest vs single-tree misclassification on 10 UCI-style data sets, e.g. breast cancer 2.9% vs 5.9%, ionosphere 5.5% vs 11.2%, letters 3.4% vs 12.4%, shuttle 0.007% vs 0.062%. On the four Statlog data sets with test sets, the forest ranked first on all four (average rank 1.0 against 7.3 for the next best of 18 classifiers). But forests rate an F on interpretability. Breiman's resolution: "go for predictive accuracy first, then try to understand why"; §11 argues the dilemma disappears once the goal is accurate information rather than interpretability.
^sum-occam-dilemma-and-ra-1

## Overview

The second lesson. It is where the paper's prediction-first stance meets the practical demand for explainable models, and where Hoadley's comment ([[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]) pushes back with a "solution to the Occam dilemma."

## Main Content

### §9 Occam's razor and the trade-off (pp. 206-207)

Occam's Razor is usually read as "simpler is better", but "in prediction, accuracy and simplicity (interpretability) are in conflict." Linear regression gives a fairly interpretable picture of the $\mathbf y,\mathbf x$ relation but is usually less accurate than neural nets.

> [!example] The Colorado court-delay tree (§9, pp. 206-207)
> **Setup.** Late-1970s study, funded by the Center for the State Courts, of delay in criminal cases (the Constitution guarantees a speedy trial). Colorado was chosen for its excellent computerised court data. Response: time from arraignment to sentencing; predictors: all other information in the trial history.
>
> **Result.** A large decision tree was grown and shown to the assembled Colorado judges. One split was on "District N", which had longer delays. Breiman did not comment on it, but heard one judge say to another on the way out: "I knew those guys in District N were dragging their feet."
>
> **Point.** Trees "rate an A+" on interpretability — but they "are good, but not great, predictors. Give them, say, a B on prediction."
^ex-court-tree

### §9.1 Growing forests for prediction (p. 207)

> [!algorithm] Forest prediction (§9.1, p. 207)
> 1. Grow many trees (say 50 or 100) on the same data, each on a **perturbed** version of the training set (perturb, grow a tree, perturb again, grow another, ...).
> 2. **Classification**: drop a new $\mathbf x$ down each tree; each tree votes for a class; predict the class with the most votes.
> 3. **Regression**: average the individual tree predictions.
>
> Known ways to grow the forest: bagging (Breiman 1996b), boosting (Freund and Schapire 1996), arcing (Breiman 1998), additive logistic regression (Friedman, Hastie and Tibshirani 1998).
^alg-forest

> [!definition] Random forests (§9.1, p. 207; detailed in §11.1, p. 211)
> Successive trees are grown "by introducing a random element into their construction." Example: with 20 predictors, at each node choose several of the 20 at random and split on the best of those; or use a random combination of a random selection of a few variables. (Related ideas: Ho 1998; Amit and Geman 1997; developed in Breiman 1999.) In §11.1 each tree is additionally grown on a **bootstrap sample** of the training set, as in bagging.
^def-random-forests

### §9.2 Forests compared to trees (p. 207)

**Table 1 — Data set descriptions** (mostly from the UCI repository):

| Data set | Training sample size | Test sample size | Variables | Classes |
|---|---|---|---|---|
| Cancer | 699 | — | 9 | 2 |
| Ionosphere | 351 | — | 34 | 2 |
| Diabetes | 768 | — | 8 | 2 |
| Glass | 214 | — | 9 | 6 |
| Soybean | 683 | — | 35 | 19 |
| *(line)* | | | | |
| Letters | 15,000 | 5000 | 16 | 26 |
| Satellite | 4,435 | 2000 | 36 | 6 |
| Shuttle | 43,500 | 14,500 | 9 | 7 |
| DNA | 2,000 | 1,186 | 60 | 3 |
| Digit | 7,291 | 2,007 | 256 | 10 |

> [!algorithm] Test-error protocol for Table 2 (§9.2, p. 207)
> - **Five smaller data sets (above the line):** (1) leave out a random 10% of the data; (2) run CART and the forest on the other 90%; (3) run the left-out 10% down both and compute their errors; (4) repeat 100 times and average.
> - **Five larger data sets (below the line):** use the separate test set supplied with the data.
^alg-table2-protocol

**Table 2 — Test set misclassification error (%)**:

| Data set | Forest | Single tree |
|---|---|---|
| Breast cancer | 2.9 | 5.9 |
| Ionosphere | 5.5 | 11.2 |
| Diabetes | 24.2 | 25.3 |
| Glass | 22.0 | 30.4 |
| Soybean | 5.7 | 8.6 |
| *(line)* | | |
| Letters | 3.4 | 12.4 |
| Satellite | 8.6 | 14.8 |
| Shuttle ×10³ | 7.0 | 62.0 |
| DNA | 3.9 | 6.2 |
| Digit | 6.2 | 17.1 |

(The shuttle row is scaled by $10^3$, i.e. 0.007% vs 0.062%.) "People who have been in the classification field for a while find these increases in accuracy startling. Some errors are halved. Others are reduced by one-third." (p. 207) In regression the decreases in mean-squared test error are similar.

### §9.3 Random forests are A+ predictors (p. 208)

- The **Statlog Project** (Michie, Spiegelhalter and Taylor 1994) compared 18 classifiers, including neural nets, CART, linear and quadratic discriminant analysis and nearest neighbour. The first four below-the-line data sets in Table 1 were the only Statlog sets with separate test sets. On these the forest ranked **1, 1, 1, 1** (average rank 1.0); the next best classifier averaged **7.3**.
- **Digit** (16×16 grey-scale handwritten ZIP-code numerals, used heavily at AT&T Bell Labs): a neural net handcrafted to the data got 5.1% test error vs 6.2% for a standard random-forest run.

### §9.4 The Occam dilemma (p. 208)

> [!theorem] The Occam dilemma (§9.4, p. 208)
> Forests are A+ predictors but "Trying to delve into the tangled web that generated a plurality vote from 100 trees is a Herculean task. So on interpretability, they rate an F."
> - "Accuracy generally requires more complex prediction methods. Simple and interpretable functions do not make the most accurate predictors."
>
> Breiman's recommendation: "Using complex predictors may be unpleasant, but the soundest path is to go for predictive accuracy first, then try to understand why." He adds that from a goal-oriented viewpoint there is no Occam's dilemma (the paper attributes this to "Section 10", but the argument is made in §11), and points to Domingos (1998, 1999) on Occam's Razor.
^thm-occam-dilemma

| Model | Interpretability grade | Prediction grade |
|---|---|---|
| Single tree | A+ | B |
| Random forest | F | A+ |
| Segmented scorecard (Hoadley, p. 223) | "A++" for the shallow tree | very accurate (Hoadley's claim) |

## Examples

> [!example] Occam in a marketing response model
> **Setup.** A forest predicting weekly sales from media and price beats a log-linear regression on held-out weeks by 15% in mean absolute error.
>
> **Breiman's advice.** Prefer the forest for forecasting, then extract information from it (permutation importance, partial dependence) and check that information is stable across refits. **Caveats from the discussion:** Hoadley shows that constrained additive models in the leaves of a shallow tree can match black boxes in some domains; Cox and Efron note that for "what if we cut spend by 10%?" questions — predictions under conditions unlike the data — accuracy on held-out weeks is not the relevant test.
^ex-occam-dilemma-and-ra-2

## Connections

- Bagging and forests reduce variance by aggregation, the same logic as [[Stacking and Predictive Model Averaging]].
- Forest-based causal estimation adds honesty and splitting rules for heterogeneity: [[Honest Trees and Causal Forests]], [[Generalized Random Forests - Local Moment Equations]].
- Interpreting forests afterwards — and the pitfalls — are covered in [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] and [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]: the forest's vote averages over many Rashomon members.

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] — the third lesson
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — the answer to the dilemma
