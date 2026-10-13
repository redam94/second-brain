---
title: "Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/variable-importance
  - type/example
  - type/concept
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): §11 Information from a Black Box (pp. 209-210), §11.1 Example I: Variable Importance in a Survival Data Set incl. Fig. 1 (p. 210), Fig. 2 and Fig. 3 (p. 211), text to p. 212; §11.2 Example II: Clustering in Medical Data incl. Fig. 4, Fig. 5 (pp. 212-213); §11.3 Example III: Microarray Data incl. Fig. 6 (p. 213); §11.4 Remarks about the Examples (pp. 213-214); rejoinder E2-E3 (pp. 229-230)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]"
  - "[[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]"
used_by:
  - "[[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]"
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
  - "[[Strobl et al 2008 - Conditional Variable Importance - Overview]]"
aliases:
  - The goal is not interpretability, but accurate information
  - Breiman hepatitis variable importance example
  - Breiman Bupa liver clustering example
  - Breiman microarray variable importance
  - Breiman 2001 Figures 1-6
---

# Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples

> [!summary]
> §11 resolves the Occam dilemma by changing the goal: "The goal is not interpretability, but accurate information." Three examples show a random forest giving more, and more reliable, information than logistic regression. **Hepatitis** (155 patients, 19 covariates): logistic regression has 17.4% CV error and its standardised coefficients point to variables 7 and 11; the forest has 12.3% error and its **permutation importance** (percent increase in out-of-bag error after permuting a variable) points to variables 12 and 17, each of which alone gives 14.3%. They are correlated surrogates, which explains why neither was selected in more than 60% of Diaconis and Efron's bootstrap re-analyses. **Bupa liver** (345 patients, 6 covariates): importance singles out blood tests 3, 5 and 4, and forest proximities reveal two distinct clusters among severe cases. **Lymphoma microarray** (81 samples, 4,682 genes): the forest fits with no variable selection and produces a gene-importance profile. Conclusions: higher predictive accuracy goes with more reliable information about the mechanism, and algorithmic models can supply both.
^sum-information-from-a-b-1

## Overview

This is the paper's empirical core and the origin of random-forest permutation importance as a tool for scientific conclusions. It is also where later work found problems: permutation importance under correlated features (Strobl 2008), extrapolation off the data manifold (Hooker et al. 2021) and the meaning of "importance" (Efron's question, and Breiman's admission in the rejoinder that importance "does not yet have a satisfactory theoretical definition").

## Main Content

### §11 Two black boxes (pp. 209-210)

Nature forms $y$ from $\mathbf x$ in a complex, unknown box; accurate prediction methods (neural nets, forests, support vectors) are also complex black boxes — "ours seems only slightly less inscrutable than nature's." In medical data, ensembles give cross-validated error significantly below logistic regression, but "Doctors can interpret logistic regression," and when forced to choose they pick interpretability.

> [!theorem] Reframing the Occam dilemma (§11, pp. 209-210)
> "Framing the question as the choice between accuracy and interpretability is an incorrect interpretation of what the goal of a statistical analysis is." The point of a model is useful information about the response-predictor relation; interpretability is one way to get it. A model need not be simple, nor a data model, to provide reliable information.
> - "The goal is not interpretability, but accurate information."
^thm-accurate-information

### §11.1 Example I: variable importance in a survival data set (pp. 210-212)

**Data.** Survival or non-survival of **155 hepatitis patients with 19 covariates** (UCI repository; contributed by Gail Gong; 32 deaths, 123 survivors). Previously analysed by Diaconis and Efron (1983) and by Cestnik, Kononenko and Bratko (1987), whose 17% was the lowest reported error rate.

**Prior analysis.** Peter Gregory (Stanford Medical School) concluded the important variables were **6, 12, 14, 19**, and "reports an estimated 20% predictive accuracy" (p. 210; the source says *accuracy*, but read against the 17-20% error rates elsewhere in §11.1 it is almost certainly meant as a 20% error rate — that reading is our interpretation), reducing variables first informally and then by an unspecified formal procedure (Breiman assumes logistic regression). Diaconis and Efron drew **500 bootstrap samples** and repeated a similar selection on each: "Of the four variables originally selected not one was selected in more than 60 percent of the samples. Hence the variables identified in the original analysis cannot be taken too seriously."

> [!algorithm] Repeated 10% holdout error estimate (§11.1, p. 210)
> 1. Leave out a random 10% of the data as a test set.
> 2. Fit the method on the remaining 90%.
> 3. Compute error on the left-out 10%.
> 4. Repeat 100 times and average the test errors.
^alg-holdout

**Logistic regression results.**
- CV error rate **17.4%**.
- Importance judged by $|\hat\beta_j|/\widehat{\mathrm{sd}}(\hat\beta_j)$, the standardised coefficients (**Fig. 1**). Conclusion: variables **7 and 11** most important.
- Logistic regression on 7 and 11 alone: CV error rises to **22.9%**.
- Best-subsets search: there are about 4,000 four-variable subsets (precisely $\binom{19}{4}=3{,}876$), and "almost certainly a substantial number" have near-minimal deviance with different pictures of the mechanism — the Rashomon problem.

**Fig. 1 — Standardized coefficients, logistic regression** (approximate values read from the plot, variables 1-19):

| Var | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $\lvert z\rvert$ | 1.9 | 0.05 | 1.25 | 0.3 | 0.6 | 0.8 | **2.35** | 1.1 | 1.2 | 0.4 | **2.7** | 1.3 | 1.15 | 2.0 | 0.4 | 0.55 | 1.25 | 1.5 | 0.45 |

**Random forest results.**
- Error rate (same 100 × 10% protocol) **12.3%** — "almost a 30% reduction from the logistic regression error."

> [!algorithm] Random-forest permutation variable importance (§11.1, p. 211)
> Random forests: many randomly constructed trees, each voting for a class; each tree is grown on a **bootstrap sample** of the training set (as in bagging), and at each node a **random selection of input variables** is searched for the best split.
>
> To measure the importance of variable $m$:
> 1. For the current tree, take the cases **left out** of its bootstrap sample (out-of-bag cases).
> 2. Randomly **permute** the values of variable $m$ among those cases.
> 3. Run the permuted cases down the current tree and record their classifications.
> 4. Repeat over all trees in the run.
> 5. Importance of $m$ = **percent increase in misclassification rate** due to "noising up" variable $m$, relative to the unpermuted out-of-bag error.
^alg-rf-permutation-importance

(The text says this measure is "shown in Figure 1"; it is the one plotted in Fig. 2.)

**Fig. 2 — Variable importance, random forest** (percent increase in error; approximate values read from the plot):

| Var | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| % | 5 | 5 | 5 | 0 | 16 | 16 | 11 | 16 | 16 | 16 | 21 | **41** | 16 | 10 | 0 | 0 | **41** | 16 | 26 |

- The forest singles out **variables 12 and 17**. Each alone in a random forest: test error **14.3%** over 100 replications; both together did no better. "We conclude that virtually all of the predictive capability is provided by a single variable, either 12 or 17."
- **Fig. 3** (titled "Variable 17 vs. probability #1"; two panels, variable 12 and variable 17, standardised to mean 0, sd 1, against the forest's estimated class-1 probability, smoothed with a weighted linear regression smoother): both curves are almost linear and similar — variable 12 rises from about $-2.7$ at probability 0.2 to a plateau near $0.4$ above 0.8; variable 17 rises from about $-1.8$ to about $0.7$ near probability 0.95. The two variables are highly correlated.
- Rerunning logistic regression with one or the other deleted changed little.
- **Permutation importance applied to logistic regression.** "Out of curiosity" (p. 212), Breiman scored logistic regression the same way he scored the forest: permute each variable in the 10% test set and measure the increase in test error. "Not much help" refers specifically to the top-3 ranking: variables 12 and 17 "were not among the 3 variables ranked as most important." As single variables in logistic regression, variable 12 gives **15.7%** error and variable 17 **19.3%**.

> [!theorem] Resolution of the Diaconis-Efron puzzle (§11.1, p. 212)
> "Variables 12 and 17 are surrogates for each other. If one of them appears important in a model built on a bootstrap sample, the other does not. So each one's frequency of occurrence is automatically less than 50%." In the ten bootstrap samples listed by Diaconis and Efron, either 12 or 17 appears in seven.
>
> **Efron's correction (p. 219).** Variables 12 or 17 (13 or 18 in Efron and Gong's numbering) appeared as important in 60% of the bootstrap simulations, against 59% for variable 19, the most for any single variable; see [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]].
^thm-surrogates

### §11.2 Example II: clustering in medical data (pp. 212-213)

**Data.** Bupa liver data (UCI), 345 patients in two classes by severity of liver malfunction (class 2 = severe). Covariates:

| # | Name | Meaning |
|---|---|---|
| 1 | mcv | mean corpuscular volume |
| 2 | alkphos | alkaline phosphatase |
| 3 | sgpt | alanine aminotransferase |
| 4 | sgot | aspartate aminotransferase |
| 5 | gammagt | gamma-glutamyl transpeptidase |
| 6 | drinks | half-pint equivalents of alcoholic beverage drunk per day |

The first five are blood tests thought related to liver function.

**Results.** Random forest misclassification error **28%**.

**Fig. 4 — Variable importance, Bupa data** (approximate percent increase in error): var 1 ≈ 1, var 2 ≈ −3, **var 3 ≈ 32**, var 4 ≈ 15, **var 5 ≈ 36**, var 6 ≈ 0. Blood tests 3 and 5 are most important, then test 4.

> [!definition] Forest similarity (proximity) for clustering (§11.2, p. 213)
> Random forests "also outputs an intrinsic similarity measure which can be used to cluster." (In Breiman's random-forest software, the proximity of two cases is the fraction of trees in which they land in the same terminal node; the paper does not define it further.)
^def-rf-proximity

Clustering class 2 on this similarity found **two clusters**. **Fig. 5 — Cluster averages, Bupa data** (average standardised value per variable, approximate):

| Variable | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Cluster 1, class 2 | 0.15 | 0.18 | −0.70 | −0.37 | −0.35 | 0.18 |
| Cluster 2, class 2 | 0.17 | 0.00 | 0.57 | 0.52 | 0.60 | 0.23 |
| Class 1 | −0.40 | −0.15 | −0.20 | −0.42 | −0.57 | −0.52 |

"The class two subjects consist of two distinct groups: those that have high scores on blood tests 3, 4, and 5 and those that have low scores on those tests."

### §11.3 Example III: microarray data (p. 213)

Random forests run on a **lymphoma microarray** data set with **three classes, 81 samples and 4,682 genes**, without any variable selection (Dudoit, Fridlyand and Speed 2000). The error rate was low. **Fig. 6 — Microarray variable importance** plots importance against gene number: two clusters of high importance, one around genes 600-1,000 (peaks above 500) and one around genes 3,300-3,700 (peaks near 300), with most genes near zero. The y-axis (importance) runs from 0 to 600 and the x-axis (variable number) from 0 to 5,000. Read from the rendered figure (approximate): the highest points, around 500-540, sit near gene 700; there are smaller secondary features — an isolated point near gene 1,450 at about 210 (with another near 1,500 at about 115) and a low cluster around genes 3,900-4,300 reaching only about 50-60. The result is "consistent with assessments of variable importance made using other algorithmic methods, but appears to have sharper detail."

### §11.4 Remarks about the examples (pp. 213-214)

- Friedman (1999) derives similar variable information from a different way of building a forest (gradient boosting); both are built to give low predictive error.
- **Baseline check.** Hepatitis: 32 deaths and 123 survivors, so calling everyone a survivor gives **20.6%** error. Logistic regression's 17.4% is only a small improvement: "It is not extracting much useful information from the data, which may explain its inability to find the important variables. Its weakness might have been unknown and the variable importances accepted at face value if its predictive accuracy was not evaluated."
- Forests can discover structure standard data models cannot (the class-2 clustering). Diaconis and Efron (1983) warned that "statistical experience suggests that it is unwise to fit a model that depends on 19 variables with only 155 data points available," but newer methods "thrive on variables—the more the better. For instance, random forests does not overfit." It is accurate on the 4,682-gene lymphoma data with no deletion.

> [!theorem] Conclusions of §11 (p. 214)
> - "Higher predictive accuracy is associated with more reliable information about the underlying data mechanism. Weak predictive accuracy can lead to questionable conclusions."
> - "Algorithmic models can give better predictive accuracy than data models, and provide better information about the underlying mechanism."
^thm-section11-conclusions

### Rejoinder on importance (pp. 229-230)

Breiman notes that importance has always been defined operationally — by best subsets/variable deletion, or by slope over standard error — and both can mislead. His definition is predictive: a variable is important if deleting it seriously hurts accuracy. With two highly correlated variables, deleting either alone does not hurt but deleting both does; the random-forest definition "spots both variables." He concedes that "Importance" lacks a satisfactory theoretical definition: it depends on dependencies between output and inputs and among the inputs, and "The problem begs for research." He also adds (E2) that "the more predictively accurate the model is, the more faith can be put into the variables that it fingers as important."

## Examples

> [!example] Applying the baseline check to a driver analysis
> **Setup.** A classifier predicts which customers churn; churn rate is 18%. The model's held-out error is 16.5%.
>
> **Breiman's §11.4 reasoning.** The all-stay baseline already gives 18% error, so the model extracts little information; its driver ranking should not be reported as findings. A model at 9% error has earned more trust in its importance ranking — though not causal interpretation (see Cox and Efron, and [[Dillon et al - SHAP and Causal Insights - Overview]]).
^ex-information-from-a-b-2

> [!example] When marginal permutation importance misleads
> Breiman's permutation breaks the link between variable $m$ and both the response and the other covariates. With correlated drivers (e.g. two media channels always flighted together) the permuted rows are combinations the model never saw, and importance can be inflated ([[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]); conditional permutation within strata of correlated covariates addresses this ([[Strobl et al 2008 - Conditional Variable Importance - Overview]]). Tree split-selection bias toward variables with many categories also distorts forest importances ([[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]).
^ex-information-from-a-b-3

## Connections

- Permutation importance as a model-reliance statistic and its range over the Rashomon set: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- Shapley-based alternatives and their problems: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- Importance is not causal effect: [[Dillon et al - SHAP and Causal Insights - Overview]].
- Bootstrap selection frequency (Diaconis-Efron) is the ancestor of [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — Efron and Hoadley on what "important" means
- [[Permutation Tests and Exact Inference]] — permutation for inference, as opposed to importance
