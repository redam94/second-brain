---
title: Fisher Rudin Dominici 2019 - Model Class Reliance - Overview
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/variable-importance
  - type/overview
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "JMLR 20(177):1-81, 2019 (arXiv 1801.01489v5); all sections §1-§11 and Appendices A-C"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]"
  - "[[Model Selection and Overfitting]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
  - "[[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]"
  - "[[Rashomon-Set Confidence Intervals and Profile Likelihood]]"
  - "[[Model Class Reliance - Binary Search Computation]]"
  - "[[Model Class Reliance for Linear and RKHS Model Classes]]"
  - "[[Model Reliance, Causal Effects and Conditional Model Reliance]]"
  - "[[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]"
  - "[[Model Class Reliance - Recidivism Case Study]]"
  - "[[Model Class Reliance - Discussion, Limitations and Extensions]]"
  - "[[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]]"
  - "[[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]]"
  - "[[Model Class Reliance - Bibliographic Details and Reference List]]"
aliases:
  - All Models are Wrong but Many are Useful
  - Fisher Rudin Dominici 2019
  - Model Class Reliance paper
  - MCR paper
---

# Fisher Rudin Dominici 2019 - Model Class Reliance - Overview

> [!summary]
> Fisher, Rudin & Dominici (JMLR 2019) observe that when many models fit the data almost equally well (the **Rashomon effect**), the importance of a variable to *one* fitted model says little about the problem. They define **model reliance (MR)**, a permutation-importance ratio $e_{\text{switch}}(f)/e_{\text{orig}}(f)$, and **model class reliance (MCR)**, the minimum and maximum MR over all models in a prespecified class whose loss is within $\epsilon$ of a reference model (the **$\epsilon$-Rashomon set**). They give finite-sample "outer" and "inner" bounds showing that empirical MCR is a sensible estimator. They also give binary-search algorithms (exact QP1QC subproblems for linear and kernel models), link MR to U-statistics, linear coefficients and conditional average treatment effects, and apply MCR to the Broward County COMPAS data. There the MCR range for race and sex is [1.00, 1.56] and for age, priors and felony status it is [1.77, 3.61].
^summary

## Overview

**Bibliographic details.** Aaron Fisher (Takeda Pharmaceuticals), Cynthia Rudin (Duke University, Computer Science and Electrical and Computer Engineering) and Francesca Dominici (Harvard T.H. Chan School of Public Health, Biostatistics). Authors are listed in order of contribution. JMLR 20(177):1-81, 2019; ingested from arXiv:1801.01489v5 (23 Dec 2019). Keywords: Rashomon, permutation importance, conditional variable importance, U-statistics, transparency, interpretable models. Funded by NIH, EPA and Health Effects Institute grants. Full details and the grouped reference list: [[Model Class Reliance - Bibliographic Details and Reference List]].

**Research question.** Variable-importance (VI) tools describe how much one model's accuracy depends on a covariate. Different well-performing models can rely on completely different covariates, though. The paper asks three things: how much *any* well-performing model in a class can rely on a variable, how much it must rely on it, and whether this range can be estimated and computed with guarantees.

**Core contribution.** The paper replaces "importance of the fitted model" with an interval: the range of reliance over the set of near-optimal models. If the upper end $MCR_+(\epsilon)$ is low, no good model needs the variable. If the lower end $MCR_-(\epsilon)$ is high, every good model needs it. The authors stress that the interval "does not depend on the fitting algorithm used to select a model" (§4, p. 11). It is a property of the prediction problem and the class, not of the analyst's choices. That makes it a direct answer to the [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]] critique, applied to interpretation.

**Key findings and results.**
1. **MR as a U-statistic** (§3.1). Breiman's random-forest permutation importance, averaged over all $n(n-1)$ off-diagonal pairings, is an unbiased U-statistic. This gives unbiasedness, asymptotic normality and Hoeffding bounds. The authors state that, to their knowledge, this link between permutation importance and U-statistics had not been established before (§3.1, p. 9). → [[Model Reliance - Permutation Importance as a U-Statistic]]
2. **Finite-sample bounds** (§4.1, Thms 4-6). The "outer" bounds (Thm 4) need no complexity limit. The uniform MR bound (Thm 5) and the "inner" bounds (Thm 6) use an $r$-margin-expectation covering number. Together they show empirical MCR is within a neighbourhood of population MCR with high probability. → [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]
3. **Rashomon sets give general finite-sample CIs** (§5.1, Prop 7). For any model characteristic $\phi(f)$, optimizing over an enlarged empirical Rashomon set gives a CI. It matches the profile-likelihood interval when the loss is a negative log-likelihood. → [[Rashomon-Set Confidence Intervals and Profile Likelihood]]
4. **Computation** (§6, Lemmas 9-14, Prop 11). A Dinkelbach-style binary search over $\gamma$ minimizes linear combinations $\gamma\hat e_{\text{orig}}+\hat e_{\text{switch}}$ and returns a closed-form convex envelope bounding empirical MR at every loss level. → [[Model Class Reliance - Binary Search Computation]]
5. **Linear and RKHS classes** (§7). MR for linear models has a closed form in covariances and coefficients (Prop 15). Each search step is an unconstrained QP or a QP1QC (trust-region type) for ridge-constrained linear and kernel regression. → [[Model Class Reliance for Linear and RKHS Model Classes]]
6. **Causal links and conditional reliance** (§8). For a binary treatment, MR of the true regression function decomposes into treatment prevalence, average effect and CATE heterogeneity (Prop 19). Conditional model reliance (CMR) permutes $X_1$ only within levels of $X_2$. → [[Model Reliance, Causal Effects and Conditional Model Reliance]]
7. **Simulations** (§9). In a degree-3 polynomial toy example, algorithm reliance (AR) differs from MR and MCR. Under misspecification, MCR bootstrap CIs keep 95% coverage up to moderate nonlinearity ($\gamma=0.3$), where a standard bootstrap fails. The price is intervals about 2-4 times wider. → [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]
8. **COMPAS application** (§10). Inadmissible (race, sex): MCR [1.00, 1.56], bootstrap CI [1.00, 1.73]. Admissible (age, priors, felony): MCR [1.77, 3.61], CI [1.62, 3.96]. The authors conclude race and sex are "likely not the dominant predictive factors in the COMPAS score" (§1, p. 3). → [[Model Class Reliance - Recidivism Case Study]]

## Main Content

### The argument in one diagram

```
 single model f ──► MR(f) = e_switch / e_orig          (§3; U-statistic estimator)
        │
 many good models ──► ε-Rashomon set R(ε) ⊂ F          (§2.1, §4)
        │
        ▼
 MCR(ε) = [min MR, max MR] over R(ε)                    (Eq 2.2)
        │
   ┌────┼──────────────────────┬───────────────────────────┐
 estimation              computation                interpretation
 Thm 4 outer bound       Lemma 9/13 bound functions  Prop 15 linear coefs
 Thm 5 uniform MR        Lemma 10/14 monotonicity    Prop 19 CATE
 Thm 6 inner bound       Prop 11 γ ≥ 0               §8.2 conditional MR
 Prop 7 general CIs      §7 QP1QC for lm / RKHS
```

### Notation used across the note set

| Symbol | Meaning |
|---|---|
| $Z=(Y,X_1,X_2)$ | outcome $Y$, covariates of interest $X_1$, other covariates $X_2$ (each may be multivariate); iid, $n\ge 2$ |
| $\mathcal F$ | model class, a subset of measurable $f:\mathcal X\to\mathcal Y$ |
| $L(f,z)\ge 0$ | loss, e.g. squared error or hinge $(1-yf)_+$ |
| $\mathcal A:\mathcal Z^n\to\mathcal F$ | an *algorithm* (fitting procedure) |
| $f_{\text{ref}}$ | prespecified reference model (benchmark) |
| $e_{\text{orig}}(f)$, $e_{\text{switch}}(f)$ | expected loss without and with $X_1$ "switched" |
| $MR(f)$, $\widehat{MR}(f)$ | population and empirical model reliance |
| $\mathcal R(\epsilon)$, $\hat{\mathcal R}(\epsilon)$ | population and empirical $\epsilon$-Rashomon sets |
| $MCR_\pm(\epsilon)$, $\widehat{MCR}_\pm(\epsilon)$ | population and empirical model class reliance |
| $B_{\text{ind}},B_{\text{ref}},b_{\text{orig}},B_{\text{switch}}$ | loss-boundedness constants (Assumptions 1-3) |
| $\mathcal N(\mathcal F,r)$ | $r$-margin-expectation covering number |

## Source Map

Every section, numbered result, table and figure of the paper, mapped to the note that holds it.

| Source item | Location | Note |
|---|---|---|
| Abstract, §1 Introduction (Rashomon effect, COMPAS motivation, roadmap) | pp. 1-4 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| §2 Notation & Technical Summary | pp. 4 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| §2.1 Summary of Rashomon Sets & MCR, Eqs 2.1-2.4, contribution list | pp. 4-7 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| Figure 1 (population vs empirical Rashomon set and MCR) | p. 5 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| Figure 2 (convex envelope output of MCR computation) | p. 7 | [[Model Class Reliance - Binary Search Computation]] |
| §3 Model Reliance, $e_{\text{switch}}$, $e_{\text{orig}}$, Eq 3.1, MR < 1 | pp. 7-8 | [[Model Reliance - Permutation Importance as a U-Statistic]] |
| §3.1 U-statistic estimators, Eqs 3.2-3.6, link to Breiman permutation | pp. 8-9 | [[Model Reliance - Permutation Importance as a U-Statistic]] |
| §3.2 Limitations of existing VI methods; Algorithm Reliance (AR) | p. 10 | [[Model Reliance - Permutation Importance as a U-Statistic]] |
| §4 MCR; Eq 4.1 $\mathcal R(\epsilon,f_{\text{ref}},\mathcal F)$; choice of $f_{\text{ref}}$ | p. 11 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| §4.1 Assumptions 1-3 | p. 12 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| Theorem 4 (outer MCR bounds), Eqs 4.2-4.3 | pp. 12-13 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| Eq 4.4 $r$-margin-expectation cover, covering number | p. 14 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| Theorem 5 (uniform bound for $\widehat{MR}$), Eq 4.5 | p. 14 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| Theorem 6 (inner MCR bounds), Eqs 4.6-4.7 | p. 15 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| Figure 3 (terms in Theorems 4 & 6) | p. 16 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| §5, §5.1 Proposition 7 (finite-sample CIs from Rashomon sets), profile-likelihood link | pp. 15-18 | [[Rashomon-Set Confidence Intervals and Profile Likelihood]] |
| §5.2 Related literature on the Rashomon effect | p. 18 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| §6 Calculating empirical MCR; Table 1 (tractability) | pp. 18-20 | [[Model Class Reliance - Binary Search Computation]] |
| §6.1 Condition 8, Lemma 9, Figure 4, Lemma 10, Eq 6.2, Proposition 11, Figure 5 | pp. 20-24 | [[Model Class Reliance - Binary Search Computation]] |
| §6.2 Condition 12, Lemma 13 (Eqs 6.4-6.5), Lemma 14 | pp. 24-25 | [[Model Class Reliance - Binary Search Computation]] |
| §6.3 Convex models, DC programs, branch-and-bound | p. 25 | [[Model Class Reliance - Binary Search Computation]] |
| §7, §7.1 Proposition 15 (MR for linear/additive models), Eqs 7.1-7.2 | pp. 26-27 | [[Model Class Reliance for Linear and RKHS Model Classes]] |
| §7.2 Remark 16 (QP for linear MCR), Eq 7.3 | p. 27 | [[Model Class Reliance for Linear and RKHS Model Classes]] |
| §7.3, 7.3.1-7.3.2 Regularized linear models, Eqs 7.4-7.5, Lemma 17 | pp. 27-28 | [[Model Class Reliance for Linear and RKHS Model Classes]] |
| §7.4, 7.4.1-7.4.2 RKHS regression, Eqs 7.6-7.11, Lemma 18 | pp. 28-30 | [[Model Class Reliance for Linear and RKHS Model Classes]] |
| §8, §8.1 Proposition 19 (MR and CATE), Eq 8.1 | pp. 30-31 | [[Model Reliance, Causal Effects and Conditional Model Reliance]] |
| §8.2 Conditional (core) model reliance, Eq 8.2 | pp. 31-32 | [[Model Reliance, Causal Effects and Conditional Model Reliance]] |
| §8.2.1 Weighting, matching (Eq 8.3), imputation estimators of CMR | pp. 32-34 | [[Model Reliance, Causal Effects and Conditional Model Reliance]] |
| §9, §9.1 Toy polynomial-classifier example, Figure 6 | pp. 34-36 | [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]] |
| §9.2 Conditions 20-21, bootstrap simulation design | pp. 36-37 | [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]] |
| §9.2.1 Results, Figure 7 (coverage) | pp. 37-38 | [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]] |
| §10 COMPAS data analysis setup | pp. 38-40 | [[Model Class Reliance - Recidivism Case Study]] |
| §10.1 Results, Figure 8 | pp. 40-41 | [[Model Class Reliance - Recidivism Case Study]] |
| §10.2 Discussion & Limitations (conditional statistical parity, proxies) | pp. 40-42 | [[Model Class Reliance - Recidivism Case Study]] |
| §11 Conclusion and future work | pp. 42-43 | [[Model Class Reliance - Discussion, Limitations and Extensions]] |
| App A.1 Code | p. 43 | [[Model Class Reliance - Discussion, Limitations and Extensions]] |
| App A.2 Model reliance less than 1 | pp. 43-44 | [[Model Reliance - Permutation Importance as a U-Statistic]] |
| App A.3 $\hat e_{\text{switch}}$ and all $n!$ permutations | pp. 44-45 | [[Model Reliance - Permutation Importance as a U-Statistic]] |
| App A.4 Corollary 22 (bound on best-in-class MR) | p. 45 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| App A.5 Ratios vs differences; $Q_{\text{out,difference}}$ etc. | pp. 45-46 | [[Model Reliance - Permutation Importance as a U-Statistic]] (definition), [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] (bounds) |
| App A.6 Rashomon sets and profile likelihood intervals, Eq A.5 | pp. 46-47 | [[Rashomon-Set Confidence Intervals and Profile Likelihood]] |
| App A.7 Unbiased estimates of CMR | pp. 47-48 | [[Model Reliance, Causal Effects and Conditional Model Reliance]] |
| App B.1 Lemma 23 (standardized loss, Hoeffding) | pp. 48-49 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| App B.2 Lemma 24 (transform bounds to ratio/difference), Eqs B.5-B.9 | pp. 49-51 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] (statement), [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]] (full proof) |
| App B.3.1-B.3.4 Proof of Theorem 4 (4 steps), Eqs B.10-B.19, difference version | pp. 51-54 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] (summary), [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]] (full) |
| App B.4 Proof of Corollary 22, Eqs B.20-B.21 | p. 54 | [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]] |
| App B.5.1 Theorem 25 statement (Eqs B.22-B.28) | p. 55 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] |
| App B.5.2-B.5.6 Proofs of Eqs B.22-B.26 (mixture cover $D^\star$, switched $\tilde D_p,\tilde D_s,\tilde D^\star$, Eqs B.29-B.37) | pp. 56-58 | [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]] |
| App B.5.7 Proof of Theorem 6 (Eqs B.38-B.45), difference version | pp. 59-62 | [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]] |
| App B.6 Proof of Prop 7; Lemma 26; Corollary 27 | pp. 62-63 | [[Rashomon-Set Confidence Intervals and Profile Likelihood]] |
| App B.7 Absolute vs relative losses in the Rashomon set | pp. 63-64 | [[Rashomon Sets and Model Class Reliance - Definitions]] |
| App B.8 Proof of Proposition 15 | pp. 64-65 | [[Model Class Reliance for Linear and RKHS Model Classes]] |
| App B.9 Proof of Proposition 19 | pp. 65-67 | [[Model Reliance, Causal Effects and Conditional Model Reliance]] |
| App C preamble (Eqs C.1-C.4; $\hat e_{\text{divide}}$ scope) | pp. 67-68 | [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]] |
| App C.1-C.2 proofs of Lemmas 9-10 (Eqs C.5-C.6) | pp. 68-70 | [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]] |
| App C.3 proof of Prop 11 (Eqs C.7-C.10) | pp. 70-71 | [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]], [[Model Class Reliance - Binary Search Computation]] |
| App C.4-C.5 proofs of Lemmas 13-14 (Eqs C.11-C.16) | pp. 71-74 | [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]] |
| App C.6-C.8 proofs of Remark 16, Lemmas 17-18 | pp. 75-77 | [[Model Class Reliance for Linear and RKHS Model Classes]] |
| Title page: authors, affiliations, contribution order, keywords, arXiv version | p. 1 | [[Model Class Reliance - Bibliographic Details and Reference List]] |
| Acknowledgments and funding (NIH, EPA, HEI grants) | p. 43 | [[Model Class Reliance - Bibliographic Details and Reference List]] |
| References (all 73 entries, grouped by role with citing section) | pp. 76-81 | [[Model Class Reliance - Bibliographic Details and Reference List]] |

**Source issues flagged in the notes.** (1) Theorem 6's practical-implication sentence (p. 15) says "underestimate" where Eq 4.6 supports "overestimate": see [[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^thm-6]]. (2) Eq B.25 is printed with the inverted ratio $\hat e_{\text{orig}}/\hat e_{\text{switch}}$. (3) The last line of the C.5.3 chain has $\hat h_{+,\gamma_1}(\hat g_{+,\gamma_2})$ for $\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})$. (4) The §9.2 simulation design prints $\mathrm{Var}(X_1)=\mathrm{Var}(X_2)=0$ alongside a nonzero covariance: see [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]. (5) The §9.2 interpretation of Condition 20 writes $MR(f_c)$ for $MR(f_0)$ (p. 37): same note. (6) Lemma 26 (App B.6, p. 62) prints $\epsilon'_1$ without the leading $\epsilon$ that Lemma 23 includes: see [[Rashomon-Set Confidence Intervals and Profile Likelihood#^lem-26]]. (7) Lemma 18's lower output bound $-(\mu+\sqrt{r_{\mathbf D}r_k})$ should be $\mu-\sqrt{r_{\mathbf D}r_k}$, so the stated $B_{\text{ind}}$ is conservative for $\mu\ge0$ and not guaranteed for $\mu<0$: see [[Model Class Reliance for Linear and RKHS Model Classes#^thm-lemma18]].

**Numbering note.** The paper numbers all items in one shared sequence: Assumptions 1-3, Theorem 4, Theorem 5, Theorem 6, Proposition 7, Condition 8, Lemma 9, Lemma 10, Proposition 11, Condition 12, Lemma 13, Lemma 14, Proposition 15, Remark 16, Lemma 17, Lemma 18, Proposition 19, Condition 20, Condition 21, Corollary 22, Lemma 23, Lemma 24, Theorem 25, Lemma 26 and Corollary 27. Every one of them appears in a note above.

## Examples

> [!example] Marketing-analytics translation
> A media-mix team has 104 weekly rows and fits a ridge-penalized regression of sales on adstocked spend for eight channels, plus price and seasonality. Search and TV spend are strongly collinear. Several fits with near-identical held-out error credit search very differently. Reporting the permutation importance of the one chosen fit hides this. MCR reports the range instead. For example, every model within 5% of the best loss has a search MR between 1.02 and 1.9. Then "search is essential" is not supported, but "search could be dropped at almost no cost" (a loss increase of about 2%) is not ruled out either. See [[Model Class Reliance - Discussion, Limitations and Extensions]].
^ex-marketing-analytics-translation

## Connections

- **Rashomon effect.** The term comes from Breiman's "two cultures" paper ([[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]). This paper turns it into an estimand. This note set owns the Rashomon-set and model-reliance concepts for the vault.
- **Permutation importance and its extrapolation problem.** MR is "unrestricted" permutation importance; see [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] for why permuting correlated features evaluates models off the data manifold. §8.2's CMR is this paper's answer, close to [[Strobl et al 2008 - Conditional Variable Importance - Overview]].
- **Bias in tree importances.** See [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] and [[Bias in Random Forest Variable Importance]].
- **Stability across perturbed fits.** [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] studies how stable *selection* is across perturbed fits. MCR studies *reliance* across near-optimal fits.
- **Shapley-based explanations.** These share the single-model limitation; see [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- **Analytic flexibility.** The Rashomon set formalizes the set of analyses a researcher *could* have reported: [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]].
- **Model risk.** MCR is a quantitative form of "effective challenge" of a model's interpretation: [[SR 11-7 - Model Risk Management Guidance - Overview]].

## See Also
- [[Rashomon Sets and Model Class Reliance - Definitions]]: start here for the formal objects
- [[Model Class Reliance - Discussion, Limitations and Extensions]]: practical takeaways and caveats
- [[Dillon et al - SHAP and Causal Insights - Overview]]: why predictive importance is not causal effect
- [[Simulation Studies for Evaluating Statistical Methods (ADEMP)]]: framework for reading the §9 simulation
- [[Permute-and-Predict Extrapolation in Variable Importance]] — MCR as a profile-CI analogue usable with conditional permutations
- [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] — Breiman's original Rashomon statement
- [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] — applied Rashomon set in MMM
