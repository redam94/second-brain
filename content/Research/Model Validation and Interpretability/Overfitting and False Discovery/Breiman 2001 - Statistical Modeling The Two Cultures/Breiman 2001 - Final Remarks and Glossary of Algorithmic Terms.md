---
title: "Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms"
tags:
  - source/ingested
  - topic/model-validation
  - topic/machine-learning
  - type/definition
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): §12 Final Remarks (p. 214), Glossary (pp. 214-215), Acknowledgments and References (p. 215), Additional References (p. 231)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]"
used_by:
  - "[[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]"
  - "[[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]"
  - "[[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]"
aliases:
  - Infinite test set error
  - Breiman glossary generalization error
  - Breiman definition of bagging
---

# Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms

> [!summary]
> §12 restates the position: statistics aims to predict and to learn about the data mechanism, "Nowhere is it written on a stone tablet what kind of model should be used," and Breiman is "not against data models per se" — but the field has a vested interest in them. He points to astronomy and gene-expression problems as statistical adventures that need open toolkits. The glossary defines **infinite test set error** (generalization error) $E\,L(Y,\phi(X))$ for a predictor $\phi$ built from an i.i.d. training set, **predictive accuracy**, **trees and nodes**, **dropping $\mathbf x$ down a tree**, **bagging** and **boosting**.
^sum-final-remarks-and-gl-1

## Overview

The glossary gives the paper's only formal definitions of the machine-learning objects it relies on; they are the reference point for the "predictive accuracy" criterion used throughout.

## Main Content

### §12 Final remarks (p. 214)

- The goals are to use data to predict and to get information about the underlying mechanism. "To make my position clear, I am not against data models per se. In some situations they are the most appropriate way to solve the problem. But the emphasis needs to be on the problem and on the data."
- The field "has a vested interest in data models, come hell or high water." Example: Dempster (1998) on modelling; on the 1990 Census adjustment Dempster admits not knowing much about the data but argues a strong dose of modelling can solve it. "That more modeling can make error-ridden data accurate seems highly unlikely to me."
- Terabytes of scientific and commercial data need analysis. Astronomers scanning images of millions of stellar objects need automated ways to find certain or novel objects — Breiman doubts data models apply, yet counts it as a statistical problem. Microarray analysis (§11.3) can advance genetics, but its variable-importance analysis "would be difficult to do accurately using a stochastic data model."
- "The best solution could be an algorithmic model, or maybe a data model, or maybe a combination. But the trick to being a scientist is to be open to using a wide variety of tools."
- Statistics' roots lie in working with data and checking theory against data; he notes a move over the previous ten years toward real-world problems and collaboration, a trend that "has to continue if we are to survive as an energetic and creative field."

### Glossary (pp. 214-215)

> [!definition] Infinite test set error / generalization error (Glossary, p. 214)
> Let $L(y,\hat y)$ measure the error when $y$ is the true response and $\hat y$ the prediction. In classification the usual loss is $L(y,\hat y)=1$ if $y\neq\hat y$ and $0$ if $y=\hat y$; in regression $L(y,\hat y)=(y-\hat y)^2$. Given a training set $\{(y_n,\mathbf x_n),\ n=1,2,\dots,N\}$ drawn i.i.d. from the distribution of the random vector $(Y,\mathbf X)$, build a predictor $\phi(\mathbf x)$ of $y$. The **infinite test set error** is
> $$
> E\,L\big(Y,\phi(\mathbf X)\big),
> $$
> called the **generalization error** in machine learning. It is estimated either by setting aside part of the data as a test set or by cross-validation.
^def-generalization-error

> [!definition] Predictive accuracy (Glossary, p. 214)
> The size of the estimated generalization error; good predictive accuracy means low estimated error.
^def-predictive-accuracy

> [!definition] Trees, nodes, and dropping $\mathbf x$ down a tree (Glossary, p. 214)
> "Trees and nodes" refers to decision trees as in Breiman, Friedman, Olshen and Stone (1984). When a vector $\mathbf x$ is "dropped" down a tree, at each intermediate node it is sent left or right according to its coordinates; it stops at a terminal node and receives that node's prediction.
^def-tree-drop

> [!definition] Bagging — bootstrap aggregating (Glossary, pp. 214-215)
> Start with any algorithm that maps a training set to a predictor $\phi(\mathbf x)$ (tree construction, logistic regression with variable deletion, etc.).
> 1. Draw a bootstrap sample from the training set and build $\phi_1(\mathbf x)$.
> 2. Draw another bootstrap sample and build $\phi_2(\mathbf x)$.
> 3. Continue for $K$ steps.
> 4. **Regression**: the bagged predictor at $\mathbf x$ is the average of $\phi_k(\mathbf x)$. **Classification**: the class with the plurality vote of the $\phi_k(\mathbf x)$.
>
> Bagging is effective at variance reduction (Breiman 1996b).
^def-bagging

> [!definition] Boosting (Glossary, p. 215)
> A more complex way than bagging of forming a classification ensemble (Freund and Schapire 1996). It uses no randomisation; it proceeds by altering the weights on the training set. Its prediction error performance is excellent (see Breiman 1998).
^def-boosting

### Acknowledgments and references (p. 215)

Breiman credits three decades of conversations with Jerome Friedman, Richard Olshen on the Cox model, William Meisel (who headed some of the prediction projects and helped his transition from probability to algorithms), Charles Stone, and the editor Leon Gleser, whose comments prompted a major rewrite. The full reference list follows (p. 215, transcribed from the source; spellings as printed, with errors marked). Reference-list inconsistencies against the text are tabulated in the Overview ([[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]).

**Main References (p. 215)**

- Amit, Y. and Geman, D. (1997). Shape quantization and recognition with randomized trees. *Neural Computation* 9 1545-1588.
- Arena, C., Sussman, N., Chiang, K., Mazumdar, S., Macina, O. and Li, W. (2000). Bagging Structure-Activity Relationships: A simulation study for assessing misclassification rates. Presented at the Second Indo-U.S. Workshop on Mathematical Chemistry, Duluth, MI.
- Bickel, P., Ritov, Y. and Stoker, T. (2001). Tailor-made tests for goodness of fit for semiparametric hypotheses. Unpublished manuscript.
- Breiman, L. (1996a). The heuristics of instability in model selection. *Ann. Statist.* 24 2350-2381.
- Breiman, L. (1996b). Bagging predictors. *Machine Learning J.* 26 123-140.
- Breiman, L. (1998). Arcing classifiers. Discussion paper, *Ann. Statist.* 26 801-824.
- Breiman, L. (2000). Some infinity theory for tree ensembles. Technical report, Berkeley.
- Breiman, L. (2001). Random forests. *Machine Learning J.* 45 5-32. (Cited in the text as "Breiman, 1999".)
- Breiman, L. and Friedman, J. (1985). Estimating optimal transformations in multiple regression and correlation. *J. Amer. Statist. Assoc.* 80 580-619. (Not cited in the text.)
- Breiman, L., Friedman, J., Olshen, R. and Stone, C. (1984). *Classification and Regression Trees*. Wadsworth, Belmont, CA.
- Cristianini, N. and Shawe-Taylor, J. (2000). *An Introduction to Support Vector Machines*. Cambridge Univ. Press.
- Daniel, C. and Wood, F. (1971). *Fitting Equations to Data*. Wiley, New York.
- Dempster, A. (1998). Logicist statistic 1. Models and modeling. *Statist. Sci.* 13 3 248-276.
- Diaconis, P. and Efron, B. (1983). Computer intensive methods in statistics. *Scientific American* 248 116-131.
- Domingos, P. (1998). Occam's two razors: the sharp and the blunt. *Proc. Fourth Int. Conf. on Knowledge Discovery and Data Mining* 37-43. AAAI Press.
- Domingos, P. (1999). The role of Occam's razor in knowledge discovery. *Data Mining and Knowledge Discovery* 3 409-425.
- Dudoit, S., Fridlyand, J. and Speed, T. (2000). Comparison of discrimination methods for the classification of tumors. Technical report, Berkeley.
- Freedman, D. (1987). As others see us: a case study in path analysis (with discussion). *J. Ed. Statist.* 12 101-223.
- Freedman, D. (1991). Statistical models and shoe leather. *Sociological Methodology 1991* (with discussion) 291-358.
- Freedman, D. (1991). Some issues in the foundations of statistics. *Foundations of Science* 1 19-83. (Second 1991 entry; the text cites "Freedman (1995)", which this may be meant to be.)
- Freedman, D. (1994). From association to causation via regression. *Adv. in Appl. Math.* 18 59-110.
- Freund, Y. and Schapire, R. (1996). Experiments with a new boosting algorithm. *Machine Learning: Proc. Thirteenth Int. Conf.* 148-156. Morgan Kaufmann.
- Friedman, J. (1999). Greedy predictive approximation: a gradient boosting machine. Technical report, Stanford.
- Friedman, J., Hastie, T. and Tibshirani, R. (2000). Additive logistic regression: a statistical view of boosting. *Ann. Statist.* 28 337-407. (Cited in the text as 1998.)
- Gifi, A. (1990). *Nonlinear Multivariate Analysis*. Wiley, New York.
- Ho, T. K. (1998). The random subspace method for constructing decision forests. *IEEE Trans. Pattern Analysis and Machine Intelligence* 20 832-844.
- Landwehr, J., Pregibon, D. and Shoemaker, A. (1984) (printed "Landswher, J., Preibon, D."). Graphical methods for assessing logistic regression models (with discussion). *J. Amer. Statist. Assoc.* 79 61-83.
- McCullagh, P. and Nelder, J. (1989). *Generalized Linear Models*. Chapman and Hall, London.
- Meisel, W. (1972). *Computer-Oriented Approaches to Pattern Recognition*. Academic Press, New York.
- Michie, D., Spiegelhalter, D. and Taylor, C. (1994). *Machine Learning, Neural and Statistical Classification*. Ellis Horwood, New York.
- Mosteller, F. and Tukey, J. (1977). *Data Analysis and Regression*. Addison-Wesley.
- Mountain, D. and Hsiao, C. (1989). A combined structural and flexible functional approach for modelenery [sic] substitution. *J. Amer. Statist. Assoc.* 84 76-87.
- Stone, M. (1974). Cross-validatory choice and assessment of statistical predictions. *J. Roy. Statist. Soc. B* 36 111-147.
- Vapnik, V. (1995). *The Nature of Statistical Learning Theory*. Springer, New York.
- Vapnik, V. (1998). *Statistical Learning Theory*. Wiley, New York.
- Wahba, G. (1990). *Spline Models for Observational Data*. SIAM, Philadelphia.
- Zhang, H. and Singer, B. (1999). *Recursive Partitioning in the Health Sciences*. Springer, New York.

Missing from the list although cited: Cestnik, Kononenko and Bratko (1987) (§11.1).

**Additional References (rejoinder, p. 231)**

- Beveridge, W. V. I. (1952) (printed "Beverdige"). *The Art of Scientific Investigation*. Heinemann, London.
- Breiman, L. (1994). The 1990 Census adjustment: undercount or bad data (with discussion)? *Statist. Sci.* 9 458-475.
- Cox, D. R. and Wermuth, N. (1996). *Multivariate Dependencies*. Chapman and Hall, London.
- Efron, B. and Gong, G. (1983). A leisurely look at the bootstrap, the jackknife, and cross-validation. *Amer. Statist.* 37 36-48.
- Efron, B. and Tibshirani, R. (1996). Improvements on cross-validation: the .632+ rule. *J. Amer. Statist. Assoc.* 91 548-560.
- Efron, B. and Tibshirani, R. (1998). The problem of regions. *Ann. Statist.* 26 1287-1318.
- Gong, G. (1982). Cross-validation, the jackknife, and the bootstrap: excess error estimation in forward logistic regression. Ph.D. dissertation, Stanford Univ.
- MacKay, R. J. and Oldford, R. W. (2000). Scientific method, statistical method, and the speed of light. *Statist. Sci.* 15 224-253.
- Parzen, E. (1979). Nonparametric statistical data modeling (with discussion). *J. Amer. Statist. Assoc.* 74 105-131.
- Stone, C. (1977). Consistent nonparametric regression. *Ann. Statist.* 5 595-645.

## Examples

> [!example] Generalization error with squared loss
> A forecaster $\phi$ for weekly sales is trained on 104 weeks. With $L(y,\hat y)=(y-\hat y)^2$, the generalization error is the expected squared error on a new week drawn from the same distribution. Scoring 52 later weeks estimates it — but the i.i.d. assumption in the definition fails for time series, which is why time-ordered holdouts and the conditions in [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] matter. Hoadley's comment adds that a test sample from today's population does not guarantee future performance.
^ex-final-remarks-and-gl-2

## Connections

- Estimating generalization error: [[Cross Validation Checking]], [[Model Selection Using Predictive Performance]], [[Forecast Evaluation and Backtesting]].
- Loss choice beyond 0-1 and squared error: [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]; Hoadley argues for business losses ("generalization dollars saved").
- Bagging's variance reduction is the basis of random forests ([[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]) and of the Arena et al. stabilisation example ([[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]).

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]
