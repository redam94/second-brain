---
title: "Hooker Mentch Zhou 2021 - References and Acknowledgments"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/reference
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, Acknowledgments p. 18; References pp. 18-21; author affiliations p. 1"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
used_by:
  - "[[Permute-and-Predict Extrapolation in Variable Importance]]"
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
  - "[[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]]"
  - "[[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]"
aliases:
  - Hooker Mentch Zhou 2021 bibliography
  - Permute-and-predict paper reference list
---

# Hooker Mentch Zhou 2021 - References and Acknowledgments

> [!summary]
> This note covers the back matter of Hooker, Mentch & Zhou (2021): author affiliations, funding acknowledgments, and the **46-entry reference list** (pp. 18-21). The references are grouped by role in the argument, with full venue, the section(s) where each is cited, and the vault note that discusses it. In the body notes these works are cited inline, often without a venue, and this note is where those venues are recorded. Use it to trace a claim back to its primary source, or to see which literatures the paper draws on: random-forest importance bias, conditional and knockoff methods, re-learning tests, functional ANOVA and Sobol indices, and local explanations.
^summary-hmz-references

## Overview

**Authors and affiliations** (p. 1 footnotes): Giles Hooker, University of California, Berkeley; Lucas Mentch, University of Pittsburgh; Siyu Zhou, University of Pittsburgh.

> [!info] Acknowledgments (p. 18)
> The work was "partially supported by NSF grants DMS-1712554, DMS-1712041 and DMS-2015400 as well as the Center for Research Computing at the University of Pittsburgh."
^ack

The reference list has 46 entries. Four involve the first author on functional ANOVA and additive-model explanation (Hooker 2007; Lou et al. 2013; Tan et al. 2018a, b). Five are the authors' own earlier work on tree importance and random-forest inference (Zhou & Hooker 2019; Mentch & Hooker 2016, 2017; Coleman, Peng & Mentch 2019; Mentch & Zhou 2020). The paper builds on this earlier work for both the explanation and the remedies.

## Main Content

### 1. Permute-and-predict tools and their origins

| Reference | Venue | Cited in | Role | Vault note |
|---|---|---|---|---|
| Breiman, L. (2001). Random Forests | *Machine Learning* 45, 5-32 | §1 | Origin of permutation (OOB) variable importance | [[Permute-and-Predict Extrapolation in Variable Importance#^def-vi-perm]] |
| Friedman, J. H. (2001). Greedy function approximation: a gradient boosting machine | *Annals of Statistics*, 1189-1232 | §1 | Origin of partial dependence plots; split-improvement importance | [[Permute-and-Predict Extrapolation in Variable Importance#^def-pdp]] |
| Goldstein, A., Kapelner, A., Bleich, J. & Pitkin, E. (2015). Peeking inside the black box: visualizing statistical learning with plots of individual conditional expectation | *J. Computational and Graphical Statistics* 24(1), 44-65 | §1, §6 | Origin of ICE plots; noted ICE can detect extrapolation | [[Permute-and-Predict Extrapolation in Variable Importance#^def-ice]] |
| Gregorutti, B., Michel, B. & Saint-Pierre, P. (2015). Grouped variable importance with random forests and application to multiple functional data analysis | *Computational Statistics & Data Analysis* 90, 15-35 | §2 | Theorem 1 part 1 (PaP = $2\hat\beta_j^2\sum(x_{ij}-\bar x_j)^2$) | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] |
| Fisher, A., Rudin, C. & Dominici, F. (2019). All models are wrong, but many are useful: learning a variable's importance by studying an entire class of prediction models simultaneously | *JMLR* 20(177), 1-81 | §1, §2, §5 | Averaging over all permutations, U-statistic bounds, model class reliance, conditional model reliance | [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] |
| Ishwaran, H. & Lu, M. (2019). Standard errors and confidence intervals for variable importance in random forest regression, classification, and survival | *Statistics in Medicine* 38(4), 558-582 | §1 | U-statistic confidence intervals for forest importance | [[Permute-and-Predict Extrapolation in Variable Importance]] |

### 2. Evidence of correlation and selection bias in importance

| Reference | Venue | Cited in | Role | Vault note |
|---|---|---|---|---|
| Strobl, C., Boulesteix, A.-L., Zeileis, A. & Hothorn, T. (2007). Bias in random forest variable importance measures: illustrations, sources and a solution | *BMC Bioinformatics* 8(1), 25 | §1 | OOB importance biased toward correlated / many-category features; split-improvement bias | [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] |
| Archer, K. J. & Kimes, R. V. (2008). Empirical characterization of random forest variable importance measures | *Computational Statistics & Data Analysis* 52(4), 2249-2260 | §1 | Better performance when signal and noise features are uncorrelated | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| Nicodemus, K. K., Malley, J. D., Strobl, C. & Ziegler, A. (2010). The behaviour of random forest permutation-based variable importance measures under predictor correlation | *BMC Bioinformatics* 11(1), 110 | §1 | Large simulation: OOB overestimates correlated predictors | same |
| Toloşi, L. & Lengauer, T. (2011). Classification with correlated features: unreliability of feature ranking and solutions | *Bioinformatics* 27(14), 1986-1994 | §4 | Same pattern in feature ranking | [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] |
| Díaz-Uriarte, R. & De Andres, S. A. (2006). Gene selection and classification of microarray data using random forest | *BMC Bioinformatics* 7(1), 3 | §1 | Backward elimination with forests, the screening use at risk | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| Bénard, C., Da Veiga, S. & Scornet, E. (2021). MDA for random forests: inconsistency, and a practical solution via the Sobol-MDA | arXiv:2102.13347 | §7 | Analysis of the precise biases of PaP | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |

### 3. Conditional generation, knockoffs and pseudovariables

| Reference | Venue | Cited in | Role | Vault note |
|---|---|---|---|---|
| Strobl, C., Boulesteix, A.-L., Kneib, T., Augustin, T. & Zeileis, A. (2008). Conditional variable importance for random forests | *BMC Bioinformatics* 9(1), 307 | §5 | First conditional permutation scheme (within-partition permutation) | [[Strobl et al 2008 - Conditional Variable Importance - Overview]] |
| Tuv, E., Borisov, A., Runger, G. & Torkkola, K. (2009). Feature selection with ensembles, artificial variables, and redundancy elimination | *JMLR* 10, 1341-1366 | §5 | Tree ensembles for predictively non-redundant feature sets | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |
| Wu, Y., Boos, D. D. & Stefanski, L. A. (2007). Controlling variable selection by the addition of pseudovariables | *JASA* 102(477), 235-243 | §5 | Pseudovariables to tune linear model size | same |
| Barber, R. F., Candès, E. J., et al. (2015). Controlling the false discovery rate via knockoffs | *Annals of Statistics* 43(5), 2055-2085 | §5 | Knockoff filter; FDR control (augment-and-filter mode) | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures#^def-knockoff-modes]] |
| Candès, E., Fan, Y., Janson, L. & Lv, J. (2018). Panning for gold: "model-X" knockoffs for high dimensional controlled variable selection | *JRSS-B* 80(3), 551-577 | §1, §5, §5.1 | Model-X knockoffs; conditional randomization test; the §5.1 knockoff substitute | same; [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application#^ex-noise-test-sim]] |
| Berrett, T. B., Wang, Y., Barber, R. F. & Samworth, R. J. (2020). The conditional permutation test for independence while controlling for confounders | *JRSS-B* 82(1), 175-197 | §7 | Hybrid: non-uniform permutations informed by the conditional law | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |
| Liu, Y. & Zheng, C. (2018). Auto-encoding knockoff generator for FDR controlled variable selection | arXiv:1809.10765 | §7 | Learning a model for $x_{ij}\mid x_{i,-j}$ | same |
| Nelsen, R. B. (2007). An introduction to copulas | Springer | §2 | Gaussian copula used to correlate $x_1,x_2$ | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] |

### 4. Re-learning and hypothesis tests

| Reference | Venue | Cited in | Role | Vault note |
|---|---|---|---|---|
| Mentch, L. & Hooker, G. (2016). Quantifying uncertainty in random forests via confidence intervals and hypothesis tests | *JMLR* 17(1), 841-881 | §1, §5, §5.1, §7 | Permute-and-relearn; first formal RF importance tests | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures#^def-vi-pil]] |
| Mentch, L. & Hooker, G. (2017). Formal hypothesis tests for additive structure in random forests | *J. Computational and Graphical Statistics* 26(3), 589-597 | §1, §6 | Permute-and-refit; tests for interactions | same; [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |
| Mentch, L. & Zhou, S. (2020). Getting better from worse: augmented bagging and a cautionary tale of variable importance | arXiv:2003.03629 | §1, §5.1 | A permuted feature can improve accuracy in low-signal settings; permute-and-relearn tests over-reject | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] |
| Coleman, T., Peng, W. & Mentch, L. (2019). Scalable and efficient hypothesis testing with random forests | arXiv:1904.07830 | §5.1 | Scalable nonparametric importance test | same |
| Williamson, B. D., Gilbert, P. B., Simon, N. R. & Carone, M. (2020). A unified approach for inference on algorithm-agnostic variable importance | arXiv:2004.03683 | §5.1 | Model-agnostic test used in the Fig. 8 simulation | same |
| Lei, J., G'Sell, M., Rinaldo, A., Tibshirani, R. J. & Wasserman, L. (2018). Distribution-free predictive inference for regression | *JASA* 113(523), 1094-1111 | §1, §5 | LOCO importance in a conformal-inference framework | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures#^def-vi-d]]; [[Conformal Prediction - Overview]] |
| Lehmann, E. L. & Romano, J. P. (2006). Testing statistical hypotheses | Springer | §5 | LOCO as a classical idea | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |

### 5. Functional ANOVA, Sobol indices, Shapley and distillation

| Reference | Venue | Cited in | Role | Vault note |
|---|---|---|---|---|
| Hooker, G. (2007). Generalized functional ANOVA diagnostics for high-dimensional functions of dependent variables | *J. Computational and Graphical Statistics* 16(3) | §1, §6, §7 | Source of the extrapolation explanation; generalized fANOVA | [[Permute-and-Predict Extrapolation in Variable Importance#^def-fanova]] |
| Sobol, I. M. (1993). Sensitivity analysis for non-linear mathematical models | *Mathematical Modelling and Computational Experiment* 1, 407-414 | §1 | PaP importance = Sobol index under independence | [[Variance-Based Sensitivity and Sobol Indices]] |
| Roosen, C. B. (1995). Visualization and exploration of high-dimensional functions using the functional ANOVA decomposition | PhD thesis, Stanford University | §1 | Early use of fANOVA to interpret ML functions | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| Chastaing, G., Gamboa, F., Prieur, C., et al. (2012). Generalized Hoeffding-Sobol decomposition for dependent variables: application to sensitivity analysis | *Electronic Journal of Statistics* 6, 2420-2448 | §6 | Smoothing-based estimation of generalized fANOVA | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |
| Owen, A. B. (2014). Sobol' indices and Shapley value | *SIAM/ASA J. Uncertainty Quantification* 2(1), 245-251 | §7 | Shapley-based importance | [[Shapley Values and SHAP Value Functions]] |
| Lundberg, S. M. & Lee, S.-I. (2017). A unified approach to interpreting model predictions | *NeurIPS* (31st), 4768-4777 | §1, §5, §7 | SHAP | [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] |
| Lou, Y., Caruana, R., Gehrke, J. & Hooker, G. (2013). Accurate intelligible models with pairwise interactions | *KDD '13*, 623-631 | §6 | Additive models as interpretable surrogates | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |
| Tan, S., Caruana, R., Hooker, G., Koch, P. & Gordo, A. (2018a). Learning global additive explanations for neural nets using model distillation | arXiv:1801.08640 | §1, §6, §7 | Additive-model distillation | same |
| Tan, S., Caruana, R., Hooker, G. & Lou, Y. (2018b). Distill-and-compare: auditing black-box models using transparent model distillation | *AIES '18*, 303-310 | §1, §6, §7 | Same | same |
| Wood, S. N. (2006). Generalized additive models: an introduction with R | Chapman and Hall/CRC | §6 | GAM fitting | same |

### 6. Split-improvement corrections

| Reference | Venue | Cited in | Role |
|---|---|---|---|
| Zhou, Z. & Hooker, G. (2019). Unbiased measurement of feature importance in tree-based methods | arXiv:1903.05179 | §1 | Correction for split-improvement bias |
| Loecher, M. (2020). Unbiased variable importance for random forests | *Communications in Statistics - Theory and Methods*, 1-13 | §1 | Same |
| Li, X., Wang, Y., Basu, S., Kumbier, K. & Yu, B. (2019). A debiased MDI feature importance measure for random forests | arXiv:1906.10845 | §1 | Same |

### 7. Local explanations, critiques and data

| Reference | Venue | Cited in | Role | Vault note |
|---|---|---|---|---|
| Rudin, C. (2019). Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead | *Nature Machine Intelligence* 1(5), 206-215 | §1 | Argues against post hoc explanation altogether | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| Simonyan, K., Vedaldi, A. & Zisserman, A. (2013). Deep inside convolutional networks: visualising image classification models and saliency maps | arXiv:1312.6034 | §5 | Saliency (gradient) explanations | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |
| Ribeiro, M. T., Singh, S. & Guestrin, C. (2016). "Why should I trust you?": explaining the predictions of any classifier | *KDD '16*, 1135-1144 | §5 | LIME | same |
| Slack, D., Hilgard, S., Jia, E., Singh, S. & Lakkaraju, H. (2020). Fooling LIME and SHAP: adversarial attacks on post hoc explanation methods | *AIES '20*, 180-186 | §1, §5 | Off-distribution manipulation of SHAP/LIME | [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] |
| Wachter, S., Mittelstadt, B. & Russell, C. (2017). Counterfactual explanations without opening the black box: automated decisions and the GDPR | *Harvard Journal of Law and Technology* 31, 841 | §7 | Counterfactual explanations may share extrapolation problems | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |
| Fanaee-T, H. & Gama, J. (2013). Event labeling combining ensemble detectors and background knowledge | *Progress in Artificial Intelligence*, 1-15 | §5.2 | Hourly bike-share data (UCI) | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application#^ex-bike-share]] |

(The source truncates two author lists with "et al.": Barber et al. 2015 is printed as "Barber, R. F., E. J. Candès, et al." and Chastaing et al. 2012 as "Chastaing, G., F. Gamboa, C. Prieur, et al."; the authors shown here are as printed. Some titles are lightly recased, e.g. "Mda"/"sobol-mda" → "MDA"/"Sobol-MDA", "mdi" → "MDI", "fdr" → "FDR", "gdpr" → "GDPR".)

## Examples

> [!example] Example: tracing a claim to its primary source
> The body notes say that "Theorem 1 part 1 is given in Gregorutti et al. (2015) and Fisher et al. (2019)". The table above gives the venue (*CSDA* 90, 15-35) and shows that Fisher et al. is the same JMLR paper that introduces model class reliance. A reviewer checking the theorem can go to either source. A reader who wants the variance side of importance, which this paper leaves out, is pointed to Ishwaran & Lu (2019) in *Statistics in Medicine*.
^ex-trace-claim

## Connections

- The most-cited strands map to other source sets in this vault: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- LOCO's conformal-inference origin: [[Conformal Prediction - Overview]].
- Sobol indices and their estimation: [[Variance-Based Sensitivity and Sobol Indices]].

## See Also
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — section map
- [[Research/Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation/_Index|Index: Hooker Mentch Zhou 2021]]
