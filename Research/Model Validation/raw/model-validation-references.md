---
title: "Model Validation References (bibliography + quoted passages)"
source_url: "https://claude.ai/artifact/JsPUPf7vEWxG9KfKnrv4Jk"
date_captured: 2026-10-13
note: "Reference list and the verbatim quotations from the 'What the research says' section of an internal analytics model-validation review (Oct 2026). Internal product findings are deliberately omitted; only the public literature is recorded here. Page numbers follow the version checked (often a preprint/working paper), not the journal."
---

# Model Validation References

Source: internal analytics model-validation review (12 Oct 2026), References + §5 "What the research says". Quotations were checked word-for-word by the review's author against the file version noted in brackets.

## Bibliography

1. Bergmeir, C., Hyndman, R. J. & Koo, B. (2018). A note on the validity of cross-validation for evaluating autoregressive time series prediction. *Computational Statistics & Data Analysis* 120, 70–83. [Author preprint, 23 July 2017.]
2. Blake, T., Nosko, C. & Tadelis, S. (2015). Consumer heterogeneity and paid search effectiveness: A large-scale field experiment. *Econometrica* 83(1), 155–174. [NBER Working Paper 20171, May 2014.]
3. Board of Governors of the Federal Reserve System & Office of the Comptroller of the Currency (2011). *Supervisory Guidance on Model Risk Management* (SR 11-7). External framework.
4. Breiman, L. (2001). Statistical modeling: The two cultures. *Statistical Science* 16(3), 199–231. [Published version.]
5. Chan, D. & Perry, M. (2017). *Challenges and Opportunities in Media Mix Modeling*. Google Inc. [White paper.]
6. Dillon, E., LaRiviere, J., Lundberg, S., Roth, J. & Syrgkanis, V. *Be careful when interpreting predictive models in search of causal insights*. SHAP documentation, shap.readthedocs.io. [Accessed 11 Oct 2026.]
7. Fisher, A., Rudin, C. & Dominici, F. (2019). All models are wrong, but many are useful: Learning a variable's importance by studying an entire class of prediction models simultaneously. *JMLR* 20, 1–81.
8. Gelman, A. & Loken, E. (2013). The garden of forking paths. Working paper, Columbia University. [14 Nov 2013.]
9. Gordon, B. R., Zettelmeyer, F., Bhargava, N. & Chapsky, D. (2019). A comparison of approaches to advertising measurement: Evidence from big field experiments at Facebook. *Marketing Science* 38(2), 193–225. [Author manuscript, 12 Apr 2018.]
10. Granger, C. W. J. & Newbold, P. (1974). Spurious regressions in econometrics. *Journal of Econometrics* 2(2), 111–120. Citation only.
11. Granger, C. W. J. (2003). Time series analysis, cointegration, and applications. Nobel Lecture, 8 Dec 2003, pp. 360–366.
12. Hooker, G., Mentch, L. & Zhou, S. (2021). Unrestricted permutation forces extrapolation: Variable importance requires at least one more model, or there is no free variable importance. *Statistics and Computing* 31, 82. [arXiv:1905.03151v2.]
13. Ioannidis, J. P. A. (2005). Why most published research findings are false. *PLoS Medicine* 2(8), e124.
14. Janzing, D., Minorics, L. & Blöbaum, P. (2020). Feature relevance quantification in explainable AI: A causal problem. *AISTATS 2020*, PMLR 108. [arXiv:1910.13413v2.]
15. Jin, Y., Wang, Y., Sun, Y., Chan, D. & Koehler, J. (2017). *Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects*. Google Inc.
16. Kumar, I. E., Venkatasubramanian, S., Scheidegger, C. & Friedler, S. A. (2020). Problems with Shapley-value-based explanations as feature importance measures. *ICML 2020*, PMLR 119. [arXiv:2002.11097v2.]
17. Lewis, R. A. & Rao, J. M. (2015). The unfavorable economics of measuring the returns to advertising. *QJE* 130(4), 1941–1973. [WP "On the Near Impossibility of Measuring the Returns to Advertising", 2013.]
18. Manheim, D. & Garrabrant, S. (2018). Categorizing variants of Goodhart's law. arXiv:1803.04585. [v4, Feb 2019.]
19. Meinshausen, N. & Bühlmann, P. (2010). Stability selection. *JRSS-B* 72(4), 417–473. [arXiv:0809.2932v2.]
20. Morris, T. P., White, I. R. & Crowther, M. J. (2019). Using simulation studies to evaluate statistical methods. *Statistics in Medicine* 38(11), 2074–2102. [arXiv:1712.03198v3.]
21. National Institute of Standards and Technology (2023). *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. NIST AI 100-1. External framework.
22. Riley, R. D. et al. (2020). Calculating the sample size required for developing a clinical prediction model. *BMJ* 368, m441.
23. Simmons, J. P., Nelson, L. D. & Simonsohn, U. (2011). False-positive psychology. *Psychological Science* 22(11), 1359–1366.
24. Strobl, C., Boulesteix, A.-L., Kneib, T., Augustin, T. & Zeileis, A. (2008). Conditional variable importance for random forests. *BMC Bioinformatics* 9, 307.
25. Strobl, C., Boulesteix, A.-L., Zeileis, A. & Hothorn, T. (2007). Bias in random forest variable importance measures: Illustrations, sources and a solution. *BMC Bioinformatics* 8, 25.
26. Yule, G. U. (1926). Why do we sometimes get nonsense-correlations between time-series? *JRSS* 89(1), 1–63. Citation only.
27. Zhang, S. & Vaver, J. (2017). *Introduction to the Aggregate Marketing System Simulator*. Google technical paper.

## Quoted passages, grouped by theme

### 1. Small samples and many candidate predictors produce false findings
- "the amount of model overfitting is dictated by the total number of predictor parameters considered, not just those included in the final model equation" — Riley et al. (2020), p. 2 of 12
- "A major cause of this problem is that the number of predictor ("feature") parameters considered by machine learning approaches will usually far exceed that for regression, even when the same set of predictors is considered, particularly because they routinely examine multiple interaction terms and categorise continuous predictors." — Riley et al. (2020), p. 6 of 12
- "apparent predictive performance (as observed in the development dataset itself) will be optimistic" — Riley et al. (2020), p. 3 of 12
- "A typical MMM dataset, consisting of three years of national weekly data is only 156 data points." — Chan & Perry (2017), p. 6
- "Large scale simulation studies show that the model can be estimated well on a large data set, but it may produce biased estimates for the typical sample size of a couple of years of weekly national-level data." — Jin et al. (2017), p. 28
- Jin et al. recover response curves "very well" only with sixty years of weekly data; with two years, curves are underestimated by roughly 18–40% (p. 16, Table 4).
- "Corollary 2: The smaller the effect sizes in a scientific field, the less likely the research findings are to be true." — Ioannidis (2005), p. 0697

### 2. Choosing the best of many analyses manufactures findings
- "Rather, it is common (and accepted practice) for researchers to explore various analytic alternatives, to search for a combination that yields "statistical significance," and to then report only what "worked." The problem, of course, is that the likelihood of at least one (of many) analyses producing a falsely positive finding at the 5% level is necessarily greater than 5%." — Simmons, Nelson & Simonsohn (2011), p. 1
- Combining four routine choices leads "to a stunning 61% false-positive rate" — Simmons et al. (2011), p. 3
- "even if the chosen data analysis is a deterministic function of the observed data, this does not eliminate the multiple comparisons problem" — Gelman & Loken (2013), p. 13
- "fields that use commonly agreed, stereotyped analytical methods (e.g., Kaplan-Meier plots and the log-rank test) [24] may yield a larger proportion of true findings than fields where analytical methods are still under experimentation (e.g., artificial intelligence methods) and only "best" results are reported." — Ioannidis (2005), p. 0698

### 3. Weekly series correlate by chance; validation must respect time
- Spurious correlation between unrelated autocorrelated series known since Yule (1926) and Granger & Newbold (1974).
- "the standard regression computer package would very often appear to "find" a relationship whereas in fact there was none." — Granger (2003), Nobel Lecture, p. 363
- "Predictive accuracy on test sets is the criterion for how good the model is." — Breiman (2001), p. 201
- "Practitioners usually resort to out-of-sample (OOS) evaluation instead, where a section from the end of the series is withheld for evaluation." — Bergmeir, Hyndman & Koo (2018), p. 2
- "The scope for meaningful cross-validation of an MMM is typically limited due to small datasets and the time-series nature of the data which doesn't allow for simple random sampling to produce a validation set." — Chan & Perry (2017), fn. 2, pp. 10–11
- Bergmeir et al.'s positive result (standard K-fold CV is valid) covers only purely autoregressive models with uncorrelated errors.

### 4. Tree importance is unstable and credits proxies
- "a predictor variable that is per se only weakly or not at all associated with the response, but is highly correlated with another influential predictor variable, may appear equally well suited for splitting as the truly influential predictor variable." — Strobl et al. (2008), §2 Methods
- "When features in the training set exhibit statistical dependence, permute-and-predict methods can be highly misleading when applied to the original model." — Hooker, Mentch & Zhou (2021), p. 1
- "Some implementations of Shapley values exhibit the same permutation structure that we critique here and can be similarly misleading" — Hooker et al. (2021), p. 5
- "But this means that if Ad Spend is highly correlated with both Last Upgrade and Monthly Usage, XGBoost may use Ad Spend instead of the causal features! This property of XGBoost (or any other machine learning model with regularization) is very useful for generating robust predictions of future retention, but not good for understanding which features we should manipulate if we want to increase retention." — Dillon et al., SHAP docs, §"Observed confounding"
- "Perturb the data slightly and you will very possibly get a different four-variable model and a different conclusion about which variables are important." — Breiman (2001), p. 206
- "many prediction models may fit the data almost equally well. In such cases, the model used by one analyst may rely on entirely different covariate information than the model used by another analyst." — Fisher, Rudin & Dominici (2019), p. 2
- "Instead the data are perturbed (for example by subsampling) many times and we choose all structures or variables that occur in a large fraction of the resulting selection sets." — Meinshausen & Bühlmann (2010), p. 6
- Strobl et al. (2007): tree importance favours variables with more possible split points; but "variable selection with random forest variable importance measures is not affected by our findings" when only continuous predictors are used (§Conclusion).

### 5. Importance describes the model, not what to change
- "It is tempting to take this analysis one step further and assume that interpretation tools can also identify what features decision makers should manipulate if they want to change outcomes in the future. However, in this article, we discuss how using predictive models to guide this kind of policy choice can often be misleading." — Dillon et al., SHAP docs, opening
- "Unless features in a model are the result of experimental variation, applying SHAP to predictive models without considering confounding is generally not an appropriate tool to measure causal impacts used to inform policy." — Dillon et al., §Summary
- "Further, observing that a certain feature carries a large influence over the model does not necessarily imply that changing that feature (even significantly) will change the outcome favorably." — Kumar et al. (2020), §4.2
- "Accordingly, Y is the output of the system and not a property of the external world." — Janzing, Minorics & Blöbaum (2020), p. 5, fn. 4
- "When selecting for a proxy measure, you select not only for the true goal, but also for the difference between the proxy and the goal." — Manheim & Garrabrant (2018), p. 2
- "If a regulator intervenes to maximize a metric, the causal pathway can change such that the proxy no longer tracks the goal." — Manheim & Garrabrant (2018), p. 4

### 6. Plausible output from observational ad measurement is often badly wrong
- "we calculate Return on Investment (ROI) using typical OLS methods, which result in a ROI of over 4,100% without time and geographic controls, and a ROI of over 1,400% with such controls." — Blake, Nosko & Tadelis (2015), p. 5. The experiment gave ROI of −63% (95% CI −124% to −3%).
- "The bias can be large: in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods." — Gordon et al. (2019), p. 2
- "Our findings suggest that commonly used observational approaches based on the data usually available in the industry often fail to accurately measure the true effect of advertising." — Gordon et al. (2019), Abstract
- "selection bias unaccounted for by observational methods only needs to explain a tiny fraction of sales variation to severely bias observational estimates" — Lewis & Rao (2015), WP Abstract
- "In one instance, when developers communicated the results of a modeling effort to project managers, the stakeholders immediately decided it was "useful" based entirely on the feature importance list" — Kumar et al. (2020), §4.3

### 7. Simulation with known truth is how methods are validated
- "A key strength of simulation studies is the ability to understand the behaviour of statistical methods because some 'truth' (usually some parameter/s of interest) is known from the process of generating the data." — Morris, White & Crowther (2019), p. 1
- "Simulation studies come into their own when methods make wrong assumptions or data are messy because they can assess the resilience of methods in such situations." — Morris et al. (2019), p. 2
- "One design implication is that methods with known properties should be included where possible as a check that these properties are exhibited." — Morris et al. (2019), p. 12
- "it is important to have a source of truth against which the accuracy of estimates can be verified" — Zhang & Vaver (2017), p. 2
- "Given the complex marketing environment and the multitude of analytical methods that are available, simulation is an essential tool for evaluating and comparing analysis options." — Zhang & Vaver (2017), p. 31
- "Because the datasets are simulated, the true underlying ROAS is known and the model output can be compared to a ground truth." — Chan & Perry (2017), §5.6, p. 15. Chan & Perry suggest advertisers give vendors simulated data "where the ground truth is known but withheld" to evaluate their modelling process.

### 8. Governance frameworks (cited for structure, not reviewed literature)
- SR 11-7 (Fed/OCC 2011) and NIST AI RMF 1.0 (2023) used to structure a model-inventory + independent-validation-gate plan.
