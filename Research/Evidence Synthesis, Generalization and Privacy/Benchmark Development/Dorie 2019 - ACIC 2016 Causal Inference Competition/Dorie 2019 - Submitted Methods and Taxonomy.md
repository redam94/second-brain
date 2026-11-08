---
title: "Dorie 2019 - Submitted Methods and Taxonomy"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Secs. 4.5 and 5 (pp. 12-18), Table 1 (p. 15); Appendix A.2 Tables 3-4 (pp. 31-34); A.6 (pp. 39-41)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Simulation Design and Knobs]]"
used_by:
  - "[[Dorie 2019 - Evaluation Metrics and Results by Method]]"
  - "[[Dorie 2019 - Predicting Performance and Variance Decomposition]]"
aliases:
  - ACIC 2016 method taxonomy
  - ACIC submitted methods
  - BART SL TMLE calCause h2o
---

# Dorie 2019 - Submitted Methods and Taxonomy

> [!summary]
> Submissions are classified by ten features: stratification, matching, weighting, propensity-score fit (with nonparametric and variable-selection variants), response-surface fit (with nonparametric and variable-selection variants) and ensembling. Most estimated a propensity score, most fit a response surface, over half weighted, and matching was almost absent from the black-box portion. Five original methods were top performers (BART, SL+TMLE, calCause, h2o, DR w/GBM+MDIA), and the organisers added ten post-competition variants to probe why.

## Overview

The competition was announced to the Atlantic Causal Inference Conference mailing list (about 800 people), the conference website on 21 April 2016, several machine-learning listservs and a widely read statistics blog. Preliminary results were presented in May 2016 and the competition was then reopened for new submissions.

## Main Content

### Taxonomy of method features (Sec. 5.1)

> [!definition] Ten method features (Table 1 columns)
> | Code | Feature | Idea |
> |---|---|---|
> | ST | Stratification | Compare outcomes within cells (subclasses) defined by covariates, propensity score or tree leaves |
> | MC | Matching | Hand-pick controls nearest to treated units under a distance (often the propensity score); drop the rest |
> | WT | Weighting | Reweight controls (ATT) to resemble the treated; survey-weighting analogue |
> | PS | Propensity score fit | Model $\Pr(Z\mid X)$, a balancing score |
> | PS NP | PS nonparametric | Flexible assignment model (trees, boosting, NN) |
> | PS VS | PS variable selection | LASSO, elastic net, screening for the assignment model |
> | RS | Response surface fit | Model $\mathbb{E}[Y\mid X,Z]$ |
> | RS NP | RS nonparametric | Flexible outcome model (BART, GP, forests, boosting) |
> | RS VS | RS variable selection | Select confounders or predictors for the outcome model |
> | EN | Ensemble | A library of separately fitted methods combined by cross-validation or weights (narrow definition; random forests and BART are not ensembles here) |
^def-method-features

If sufficient balance is achieved by stratification, matching or weighting, a simple difference in means is unbiased; alternatively, if the response surface is modelled correctly, preprocessing is not needed (Hahn 1998; Hill 2011). The paper categorises methods by whether they model assignment or response rather than deciding which are formally *doubly robust*. TMLE (van der Laan and Rubin) is highlighted as useful with high-dimensional nuisance parameters. Variable selection (LASSO, elastic net) can reduce the problem to true confounders.

> [!example] Table 1: feature matrix (transcribed from the printed table)
> First block DIY, second block black-box. An entry lists the features the method uses.
>
> | Method | Features |
> |---|---|
> | Ad Hoc (DIY) | RS, RS VS |
> | Bayes LM | RS |
> | Calibrated IPW | WT, PS |
> | DR w/GBM+MDIA 1 | WT, PS, PS NP, RS, RS NP |
> | DR w/GBM+MDIA 2 | WT, PS, PS NP, RS, RS NP |
> | IPTW estimator | WT, PS, PS VS, RS |
> | GLM-Boost | WT, PS |
> | LAS Gen Gam | MC, PS VS, RS, RS NP, RS VS |
> | Manual | MC, PS, RS |
> | MITSS | ST, PS, RS, RS NP |
> | ProxMatch | MC |
> | RBD TwoStepLM | ST, PS, RS |
> | Regression Trees | WT, PS, PS NP, RS, RS NP |
> | VarSel NN | MC, WT, PS, PS NP, PS VS, RS, RS VS |
> | Weighted GP | RS, RS NP |
> | Adj. Tree Strat (BB) | ST, PS, PS NP, RS |
> | Balance Boost | WT, PS, PS NP |
> | BART | RS, RS NP |
> | calCause | RS, RS NP, EN |
> | CBPS | ST, PS, RS |
> | h2o Ensemble | WT, PS, PS NP, RS, RS NP, EN |
> | LASSO+CBPS | WT, PS, PS VS, RS, RS VS |
> | Linear Model | RS |
> | MHE Algorithm | RS |
> | SL+TMLE | WT, PS, PS NP, PS VS, RS, RS NP, RS VS, EN |
> | teffects ra | RS |
> | teffects ipw | WT, PS |
> | teffects ipwra | WT, PS, RS |
> | teffects psmatch | MC, PS |
> | Tree Strat | ST, PS, PS NP, RS |
^ex-table1-features

Observation (paper): "Most explicitly estimated a propensity score. Most fit a model to the response surface. More than half used some sort of weighting. Matching was almost entirely absent from the black-box portion... The black box methods and their submitters favor sophisticated nonparametric modeling techniques."

### Top performers (Sec. 5.3)

> [!definition] The five best original methods
> | Method | Type | Description |
> |---|---|---|
> | **BART** | Black box | Bayesian Additive Regression Trees: sum of many small trees with priors on structure and leaf values. Fits $f(x,z)$ jointly, then draws $y(1)=f(x,1)$ and $y(0)=f(x,0)$ from the posterior predictive; posterior of an average effect from averaging differences over the target units (Hill 2011) |
> | **SL+TMLE** | Black box, ensemble | Super Learner (cross-validated weighted combination of glm, gbm, gam, glmnet, splines) for assignment and response; propensity weights incorporate the ATT; then a TMLE correction (universal least-favourable one-dimensional submodel); covariates pre-screened by univariate association with the outcome |
> | **calCause** | Black box, ensemble | Cross-validation selects between Random Forest and a Gaussian process (FastFood kernel) for the control response surface; imputes control outcomes for treated units; differences averaged; bootstrap for uncertainty |
> | **h2o Ensemble** | Black box, ensemble | Super learning (glm, random forest, deep learning, LASSO, ridge) separately for propensity score and control response; differences averaged with IPTW ATT weights |
> | **DR w/GBM+MDIA 1 and 2** | DIY | Generalised boosted regression (up to three-way interactions) for assignment and response; ATT weights calibrated by Minimum Discriminant Information Adjustment (MDIA, i.e., calibration weighting, exponential tilting or entropy balancing) to match the treated means of every covariate and of the estimated control response surface exactly; bias-corrected doubly-robust-type estimator; bootstrap SEs. Version 1: 5-fold CV for model selection; version 2: 50,000 trees (many more than CV would choose, particularly for selection) |
^def-top-performers

### Post-competition methods (Sec. 5.4)

The Super Learner team resubmitted with BART in the library; the organisers created nine more to isolate what drives success.

| Created method | What it tests |
|---|---|
| SL+BART+TMLE | Adds BART to Super Learner library |
| BART IPTW | Does also modelling assignment help BART? BART (CV-chosen priors) for $\Pr(Z\mid X)$ combined by IPTW |
| SuperLearner (no TMLE) | Contribution of the TMLE step |
| BART+TMLE | BART with IPTW plus TMLE; propensity via BART with CV |
| BART Xval | Response-only BART with cross-validated hyperparameters instead of default prior |
| BART MChains | Several MCMC chains from distinct starts (typical BART uses one) |
| MBART SymInt | Multiple chains with symmetric (normal-approximation) intervals instead of percentile |
| BART on PScore | Propensity score as a covariate (after Hahn, Murray and Carvalho 2017) |
| SL+TMLE Joint | Fit treated and control response surfaces jointly (like BART) rather than separately; ensemble included BART |

(The text says nine additional methods plus the revised SL; the table above lists the nine named in Sec. 5.4 together with SL+BART+TMLE.)

### Glossary of remaining submissions (Tables 3-4)

| Method | Description (condensed) |
|---|---|
| Ad Hoc | GBM screening of control-outcome predictors, ad hoc transformations, stepwise AIC over models with up to three-way interactions; predicts control outcomes for treated. Described by its submitter as not automated and "tenuous grounding in statistical theory" |
| Bayes LM | Naive Bayesian linear model |
| Calibrated IPW | Logistic propensity calibrated so the estimator is unbiased if control response is linear in covariates; asymptotic variance |
| GLM-Boost | Boosted GLM, bootstrap CIs |
| IPTW estimator | Stabilised ATT IPTW; propensity from covariates highly correlated with response; bootstrap |
| LAS Gen GAM | LASSO selects covariates for treatment and response; GenMatch one control per treated; GAM on matched data |
| Manual | Hand-done logistic regression, matching, weighted linear regression |
| MITSS | Multiple imputation with two subclassification splines; missing potential outcomes imputed with penalised spline on the missingness probability plus linear adjustments |
| ProxMatch | Matching on random-forest proximity matrix |
| RBD TwoStepLM | Stratify on a linear-model propensity score to mimic randomised block design, regression adjustment within strata, combine |
| Regression Trees | Bootstrap propensity estimates from decision trees; individual trees and boosted ensemble; sample weights |
| VarSel NN | RF and LASSO selection on the response; NN propensity; caliper to drop non-overlapping treated; optmatch; ATT weights; regression |
| Weighted GP | GP for treated; weighted GP for controls with covariate-shift weights via KL importance estimation (Frank-Wolfe) |
| BalanceBoost | Boosting to maximise a covariate-balancing score; outcome regression adjustment; conservative intervals (above 95% coverage) |
| CBPS | Covariate balancing propensity score used to stratify; third-order polynomial linear model on controls; weighted combination across strata |
| LASSO+CBPS | LASSO-selected CBPS (Imai and Ratkovic 2014) reweighting; weighted LASSO with interactions and polynomials for response |
| Linear Model | OLS |
| MHE Algorithm | "State of the art in labor and development econometrics": OLS with robust standard errors |
| teffects ipw / ipwra / psmatch / ra | Stata `teffects`: IPW with logistic first-order terms; IPW with regression adjustment; nearest-neighbour propensity matching; separate regression adjustment |
| Tree Strat / Adj. Tree Strat | CART propensity tree; leaves as strata for ATT; adjusted version adds regularised regression adjustment within strata |

### Submitters (A.6)

DIY (method: submitter, affiliation at time): IPTW estimator, Chanmin Kim (Harvard); MITSS, Liangyuan Hu and Chenyang Gu (Mount Sinai); Bayes LM, Christoph Kurz and GLM-Boost, Manuel Huber (Helmholtz Zentrum Muenchen); Regression Trees, Dave Harris (Florida); Calibrated IPW, Gi-Soo Kim (Seoul National); DR w/GBM+MDIA and Ad Hoc, John Lockwood (ETS); Weighted GP, Junfeng Wen and Russ Grenier (Alberta); LAS Gen GAM, Leonid Liu and Annie Wang (Analyst Institute); Manual, Mao Hu (Acumen); RBD TwoStepLM, Peng Ding (UC Berkeley); ProxMatch, Hui Fen Tan, David Miller and James Savage (Cornell); VarSel NN, Zhipeng Hou and Bryan Keller (Teachers College).
Black box: MHE, Peter Aronow (Yale); BART, Douglas Galagate and Nicole Bohme Carnegie; teffects, Seth Lirette (Mississippi); LASSO+CBPS, James Pustejovsky; calCause, Chen Yanover and colleagues (IBM Research Haifa); BalanceBoost, Qingyuan Zhao (Stanford); Tree Strat and Adj. Tree Strat, Stefan Wager (Stanford); h2o, Hyunseung Kang (Stanford); CBPS, Yongnam Kim (Wisconsin); SL+TMLE, Susan Gruber and Mark van der Laan. Some methods were submitted as representative of a field rather than as best practice.

## Examples

> [!example] Decomposing a method by features
> **Method.** BART IPTW = BART (RS, RS NP) plus assignment model (PS, PS NP) plus weighting (WT).
> **Question.** Does adding the assignment model help? In the paper it did not: BART IPTW did *not* improve bias or RMSE relative to plain BART, whereas BART+TMLE, BART MChains and BART Xval improved slightly ([[Dorie 2019 - Evaluation Metrics and Results by Method]]).
> **Interpretation.** The feature taxonomy lets the organisers run "ablations" by recombining parts of top performers, which is the paper's method for explaining success rather than just ranking it.
^ex-feature-ablation

## Connections

- BART and nonparametric outcome modelling: [[Nonparametric Causal Inference]]; weighting: [[Bayesian Inverse Probability Weighting]]; matching and propensity scores: [[Propensity Score Matching - Overview]]; CATE learners such as T-learners fit control/treated response surfaces separately: [[Metalearners for CATE]].
- Black-box submissions here play the role of "automated" estimators; the DIY entries show the human-in-the-loop cost (e.g., Ad Hoc).

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Evaluation Metrics and Results by Method]]
