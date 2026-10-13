---
title: "Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures"
tags:
  - source/ingested
  - topic/model-validation
  - topic/machine-learning
  - topic/statistical-philosophy
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): Abstract and §1 Introduction (pp. 199-200), §2 Road Map (p. 200), §7 Algorithmic Modeling, §7.1 A New Research Community, §7.2 Theory in Algorithmic Modeling, §7.3 Recent Lessons (pp. 205-206)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]"
used_by:
  - "[[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]"
  - "[[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]"
  - "[[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]"
  - "[[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]"
  - "[[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]"
aliases:
  - Data modeling culture
  - Algorithmic modeling culture
  - Breiman two cultures definitions
  - Breiman black box picture
---

# Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures

> [!summary]
> Breiman frames all of statistics as a black box: inputs $\mathbf x$ go in, responses $\mathbf y$ come out, and "nature" sits inside. The **data modeling culture** fills the box with an assumed stochastic model, e.g. $y=f(\mathbf x,\text{noise},\text{parameters})$, estimates the parameters and validates by yes/no goodness-of-fit tests and residuals; he puts its population at 98% of statisticians. The **algorithmic modeling culture** treats the inside as complex and unknown, looks for any function $f(\mathbf x)$ that predicts $y$ well, and validates by predictive accuracy; 2% of statisticians, many people in other fields. The paper's thesis: exclusive reliance on the first culture has produced irrelevant theory and questionable conclusions and has kept statisticians out of new problems. §7 describes the machine-learning community that took up the second culture and the three "lessons" (Rashomon, Occam, Bellman) that organise the rest of the paper.
^sum-data-modeling-vs-alg-1

## Overview

This is the conceptual frame for the whole paper. Everything later — the critique of data models ([[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]), the three lessons, and the black-box examples — is an argument about which way of filling in the box gives more reliable answers.

## Main Content

### The black-box picture (§1, p. 199)

Data are produced by nature acting on a vector of input (independent) variables $\mathbf x$ to give response variables $\mathbf y$:

$$\mathbf y \;\longleftarrow\; [\text{nature}] \;\longleftarrow\; \mathbf x$$

> [!definition] Two goals of data analysis (§1, p. 199)
> - **Prediction**: predict the responses to future input variables.
> - **Information**: extract information about how nature associates the response variables with the input variables.
^def-two-goals

> [!definition] The Data Modeling Culture (§1, p. 199)
> The analysis "starts with assuming a stochastic data model for the inside of the black box." A common form: data are independent draws from
> $$\text{response variables} = f(\text{predictor variables},\ \text{random noise},\ \text{parameters}).$$
> Parameters are estimated from the data and the fitted model is then used for information and/or prediction. The box is filled in with, for example, linear regression, logistic regression or the Cox model.
> - **Model validation**: "Yes–no using goodness-of-fit tests and residual examination."
> - **Estimated culture population**: "98% of all statisticians."
^def-data-modeling

> [!definition] The Algorithmic Modeling Culture (§1, p. 199)
> The analysis "considers the inside of the box complex and unknown." The approach is to find a function $f(\mathbf x)$ — an algorithm operating on $\mathbf x$ — to predict $\mathbf y$. The box is labelled "unknown" and the tools are, for example, decision trees and neural nets.
> - **Model validation**: "Measured by predictive accuracy."
> - **Estimated culture population**: "2% of statisticians, many in other fields."
^def-algorithmic-modeling

The essential distinction, restated in the rejoinder (p. 230): "are you modeling the inside of the box or not?" Bayesians belong in the data-modeling culture under this definition.

### The thesis (§1, pp. 199-200)

Breiman argues that the statistical community's focus on data models has:

1. "Led to irrelevant theory and questionable scientific conclusions";
2. "Kept statisticians from using more suitable algorithmic models";
3. "Prevented statisticians from working on exciting new problems".

He also promises a review of algorithmic developments in machine learning and applications to three data sets.

**Two further Abstract claims (p. 199).** Algorithmic modeling, "both in theory and practice, has developed rapidly in fields outside statistics"; and "It can be used both on large complex data sets and as a more accurate and informative alternative to data modeling on smaller data sets." The second claim matters: Breiman is not only arguing for algorithms on big data, but also that they can beat data models on the small data sets statisticians usually analyse (the hepatitis and liver examples have 155 and 345 cases; see [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]). The Abstract closes: "If our goal as a field is to use data to solve problems, then we need to move away from exclusive dependence on data models and adopt a more diverse set of tools."

### Road map (§2, p. 200)

- Breiman's background: seven years as an academic probabilist, thirteen years of full-time freelance consulting, then the Berkeley Statistics Department from 1980. His views on algorithmic modelling were formed as a consultant (§3; see [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]]).
- §4: observations on published theoretical research in statistics.
- §5: misuse of data models leading to questionable conclusions.
- §6: how the commitment to data models kept statisticians out of new scientific and commercial fields.
- §7: the rise of algorithmic modelling in a new community, "often called machine learning". Timing claims (p. 200): "In the past fifteen years, the growth in algorithmic modeling applications and methodology has been rapid," largely outside statistics in a community of "mostly young computer scientists"; and "The advances, particularly over the last five years, have been startling."
- §8-10: three changes in perception, named **Rashomon** (the multiplicity of good models), **Occam** (the conflict between simplicity and accuracy) and **Bellman** (dimensionality — curse or blessing?).
- §11: "Information from a Black Box", showing that an algorithmic model can give more reliable information about the input-output structure than a data model, with two medical data sets and a genetic data set.
- A glossary at the end defines machine-learning terms ([[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]]).

### §7 Algorithmic modeling

**Precursors in statistics (§7, p. 205).** Under other names, algorithmic modelling had been used by industrial statisticians for decades (Daniel and Wood 1971, *Fitting Equations to Data*), by psychometricians and social scientists (Gifi 1990), and in medical data from Richard Olshen's work in the early 1980s (see also Zhang and Singer 1999). Jerome Friedman and Grace Wahba did pioneering algorithmic work. But the list of statisticians in the business was short and applications to data rarely appeared in journals; development was taken up outside statistics.

**§7.1 A new research community (p. 205).** In the mid-1980s two powerful new algorithms became available — **neural nets** and **decision trees** — and a community of young computer scientists, physicists and engineers, plus "a few aging statisticians", formed around them. Its goal was predictive accuracy, applied to problems where data models were obviously inapplicable: speech recognition, image recognition, nonlinear time-series prediction, handwriting recognition, prediction in financial markets. A large majority of its papers analyse real data, and "The criterion for any model is what is the predictive accuracy." Its venues were the NIPS proceedings and the *Machine Learning Journal*.

> [!definition] The single assumption of algorithmic theory (§7.2, p. 205)
> Nature's box is "complex, mysterious, and, at least, partly unknowable." The problem is to find an algorithm $f(\mathbf x)$ such that for future $\mathbf x$ in a test set, $f(\mathbf x)$ is a good predictor of $y$. The theory characterises algorithms' "strength" as predictors, their convergence if iterative, and what gives them good predictive accuracy. "The one assumption made in the theory is that the data is drawn i.i.d. from an unknown multivariate distribution."
^def-algorithmic-theory

**§7.2 Theory in algorithmic modeling (p. 205).** Examples of algorithm-focused theory:
- Wahba's smoothing-spline work, using cross-validation, built on reproducing-kernel Hilbert space theory (1990).
- The final chapter of the CART book (Breiman et al. 1984) proves asymptotic convergence of CART to the Bayes risk as trees grow with sample size.
- Vapnik's bounds on generalization error (infinite-test-set error) that depend on the algorithm's "capacity"; these led to support vector machines (Vapnik 1995, 1998), "which have proved to be more accurate predictors in classification and regression then neural nets, and are the subject of heated current research" (p. 205; "then" [sic]; see [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]).
- Breiman's own "Some infinity theory for tree ensembles" (2000), a function-space analysis of tree ensembles, with a section titled "My kingdom for some good theory." Boosting works very well, but "there isn't any finite sample size theory that tells us why it works so well."

**§7.3 Recent lessons (pp. 205-206).** The advances since the mid-1980s, especially in the previous five years, have been "phenomenal". The three most important lessons:

| Lesson | Meaning | Note |
|---|---|---|
| Rashomon | the multiplicity of good models | [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] |
| Occam | the conflict between simplicity and accuracy | [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] |
| Bellman | dimensionality — curse or blessing | [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] |

## Examples

> [!example] Placing a marketing-analytics workflow in the two cultures
> **Setup.** An analyst has weekly media data with 104 rows and wants to know which channels drive sales.
> - A *data-modeling* answer writes down an adstock-plus-saturation regression with Gaussian errors, estimates it, and checks residual plots. Conclusions are about the model's mechanism.
> - An *algorithmic* answer fits a gradient-boosted tree or forest, chooses it by held-out error, and reads off importance or partial dependence.
>
> **Interpretation.** Breiman's test for either one is the same: how well does the fitted box reproduce nature's box on data it has not seen? With 104 rows a forest may not beat the regression on held-out weeks, in which case Breiman's own criterion favours the regression. The cultures are defined by what they *assume about the box*, not by the software used. The later critiques (Cox, Efron) say that for causal questions about channels, prediction alone is not enough ([[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]).
^ex-data-modeling-vs-alg-2

## Connections

- The prediction-vs-information split is the same distinction drawn between prediction tasks and causal tasks in [[Dillon et al - SHAP and Causal Insights - Overview]].
- The data-modeling culture's habit of checking fit and then trusting the parameters has a Bayesian counterpart in [[Posterior Predictive Checking]] and the [[Bayesian Workflow - Overview]]; Breiman counts Bayesian modelling as part of the data-modeling culture.
- The machine-learning community's criterion — accuracy on unseen data — is the basis of [[Cross Validation Checking]] and [[Model Selection Using Predictive Performance]].
- [[Statistical Rethinking - The Golem of Prague]] makes a related point about mistaking a statistical procedure for a model of nature.

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — paper map
- [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] — where the views came from
- [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] — §4-6
- [[Causal Machine Learning - Overview]] — later work that uses algorithmic learners inside causal estimators
