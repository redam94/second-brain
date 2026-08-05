---
title: "Q: What are some common pitfalls in statistical modeling a data scientist should be aware of?"
tags:
  - type/qa
  - topic/research-methodology
  - topic/bayesian-statistics
  - topic/causal-inference
  - topic/model-comparison
  - topic/statistical-modeling
date_asked: 2026-04-09
answered_from:
  - "[[Statistical Rethinking - The Golem of Prague]]"
  - "[[Spurious Association and Confounds]]"
  - "[[Omitted Variables Bias]]"
  - "[[The Selection Problem]]"
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Type S and Type M Errors]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Model Checking]]"
  - "[[Evaluating Fitted Models]]"
  - "[[Computational Troubleshooting]]"
  - "[[Missing Data - Statistical Rethinking]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Choosing and Building Models]]"
  - "[[Multiple Testing Corrections]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
related_questions:
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
folder: "Questions-and-Answers"
source: "vault"
date_ingested: 2026-04-09
doc_type: qa
source_location: "synthesized from vault notes"
depends_on:
  - "[[Statistical Rethinking - The Golem of Prague]]"
  - "[[Spurious Association and Confounds]]"
  - "[[Omitted Variables Bias]]"
  - "[[The Selection Problem]]"
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Type S and Type M Errors]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Model Checking]]"
  - "[[Evaluating Fitted Models]]"
  - "[[Computational Troubleshooting]]"
  - "[[Missing Data - Statistical Rethinking]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Choosing and Building Models]]"
  - "[[Multiple Testing Corrections]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
used_by:
  - "[[Missing Data - Statistical Rethinking]]"
  - "[[Spurious Association and Confounds]]"
  - "[[Statistical Rethinking - The Golem of Prague]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Computational Troubleshooting]]"
aliases:
  - "Statistical modeling mistakes"
  - "Modeling pitfalls for data scientists"
  - "Common statistical errors"
---

# What are some common pitfalls in statistical modeling a data scientist should be aware of?

> [!summary]
> The vault identifies eight major pitfall categories: (1) confusing correlation with causation via confounds and selection bias, (2) the garden of forking paths and multiple comparisons, (3) overfitting vs. underfitting, (4) ignoring missing data mechanisms, (5) misusing statistical tests as "golems," (6) neglecting model checking, (7) computational problems masking model problems, and (8) Type S/M errors from underpowered analyses. Each pitfall has specific remedies grounded in Bayesian workflow, causal DAGs, and proper experimental design.

## Answer

### 1. Confusing Correlation with Causation

The most fundamental pitfall. The vault covers this from two complementary perspectives:

**Confounding and spurious association** ([[Spurious Association and Confounds]], [[raw/StatRethink-Bayes.pdf|Statistical Rethinking Ch. 5]]): When a confound $C$ causes both predictor $X$ and outcome $Y$, bivariate regression shows a "significant" effect that disappears when $C$ is included. The classic example: Waffle House density correlates with divorce rate, but both are driven by being a Southern state.

> [!warning] Post-Treatment Bias ([[Spurious Association and Confounds]])
> Controlling for variables *caused by* the treatment blocks the indirect causal path. If treatment $\to$ mediator $\to$ outcome, including the mediator makes the treatment appear ineffective. This connects to the econometric concept of [[Conditional Independence Assumption|bad controls]].

**Selection bias** ([[The Selection Problem]], [[raw/Mostly Harmless Econometrics.pdf|MHE Ch. 2]]): Individuals who receive treatment differ systematically from those who don't. The observed difference decomposes as:

$$E[Y_i|D_i=1] - E[Y_i|D_i=0] = \underbrace{E[Y_{1i}-Y_{0i}|D_i=1]}_{\text{ATT}} + \underbrace{E[Y_{0i}|D_i=1] - E[Y_{0i}|D_i=0]}_{\text{selection bias}}$$

Selection bias can be so large it reverses the sign of the true effect -- hospitals appear harmful because sick people seek them out.

**Omitted variables bias** ([[Omitted Variables Bias]], [[raw/Mostly Harmless Econometrics.pdf|MHE Ch. 3]]): The OVB formula $\rho^s = \rho^l + \gamma^l \cdot \delta_{As}$ shows that omitting a relevant variable biases the coefficient on included variables by the product of (a) the omitted variable's effect on the outcome and (b) its correlation with the included variable.

> [!example] Example: Activity Bias in Advertising ([[Activity Bias in Advertising]])
> Lewis, Rao & Reiley (2011) showed that observational methods overestimate the causal effect of online ads by **160x** compared to the RCT. The mechanism: users exposed to ads are inherently more active online, and this activity bias cannot be controlled away no matter how many covariates are included. The [[Conditional Independence Assumption]] is fundamentally violated.

**Remedy:** Draw causal DAGs before modeling. Use the potential outcomes framework to be explicit about what you're estimating. When possible, use [[The Experimental Ideal|randomized experiments]]; otherwise, apply [[Instrumental Variables|IV]], [[Differences-in-Differences|DD]], or [[Regression Discontinuity Designs|RD]] with clear identification strategies.

---

### 2. The Garden of Forking Paths and Multiple Comparisons

Covered in detail in [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].

The [[Garden of Forking Paths|garden of forking paths]] ([[raw/p_hacking.pdf|Gelman & Loken 2013]]) describes how the many decision points in data analysis -- which variables to include, how to transform them, which subgroups to examine -- create an enormous space of possible analyses. Even without intent to deceive, the p-value from the analysis you chose does not account for the analyses you *would have* chosen with different data ([[Researcher Degrees of Freedom]]).

With just 5 binary analytic choices, there are $2^5 = 32$ possible analysis paths. The probability that at least one yields $p < 0.05$ is far higher than 5%.

**Remedy:** Use [[Partial Pooling as Multiple Comparisons Correction|multilevel models with partial pooling]], [[Overfitting and Information Criteria|regularizing priors]], and [[Iterative Model Improvement|projection predictive variable selection]]. See the linked Q&A for the full progression of solutions.

---

### 3. Overfitting and Underfitting

[[Overfitting and Information Criteria]] ([[raw/StatRethink-Bayes.pdf|Statistical Rethinking Ch. 9]]) uses the metaphors of Scylla (overfitting) and Charybdis (underfitting):

- **$R^2$ always increases** with more parameters -- even random predictors improve in-sample fit
- A 5th-degree polynomial achieves $R^2 = 0.99$ on 6 data points but predicts *negative* brain volumes between them
- More complex models learn noise; simpler models miss real patterns

**Two families of solutions:**

1. **Regularizing priors** -- informative priors skeptical of extreme parameter values. The Bayesian version of ridge/lasso regression ([[Bayesian Linear Regression]])
2. **Information criteria** -- score models on estimated out-of-sample predictive accuracy:
   - **WAIC**: fully Bayesian, pointwise, no Gaussian approximation needed ([[Overfitting and Information Criteria]])
   - **PSIS-LOO**: efficient LOO-CV approximation with $\hat{k}$ diagnostics -- preferred in practice ([[Model Comparison]])

> [!warning] Information Budget ([[Choosing and Building Models]])
> As models grow more complex, priors need to become *tighter*. Even independent $\text{normal}(0,1)$ priors on individual logistic regression coefficients become strongly informative in the joint prior as the number of predictors increases -- pushing predicted probabilities toward 0 or 1.

---

### 4. Ignoring Missing Data Mechanisms

[[Missing Data - Statistical Rethinking]] emphasizes that the strategy for handling missing data depends on the *causal mechanism* generating the missingness:

| Mechanism | Implication |
|-----------|-------------|
| **MCAR** | Complete-case analysis unbiased (but rare in practice) |
| **MAR** | Imputation valid if you condition on the right observables |
| **MNAR** | Must model the missingness mechanism explicitly |

> [!warning] DAG Diagnosis ([[Missing Data - Statistical Rethinking]])
> Always draw a causal DAG with the missingness indicator $R$ as a node. Conditioning on $R=1$ (complete cases) opens collider paths that can induce bias even under MAR.

**Remedy:** Treat missing values as latent variables with priors. Bayesian imputation naturally propagates uncertainty in imputed values through to parameter posteriors. Use `pm.Normal.dist()` in PyMC or similar approaches.

---

### 5. Using Statistical Tests as "Golems"

[[Statistical Rethinking - The Golem of Prague]] ([[raw/StatRethink-Bayes.pdf|Statistical Rethinking Ch. 1]]) argues that statistical tests (t-tests, chi-squared, ANOVA) are pre-fabricated golems -- powerful within their domain but dangerous when misapplied. Three key insights:

1. **Hypotheses are not models** -- the mapping between hypotheses, process models, and statistical models is many-to-many. Rejecting a null tells you very little.
2. **Falsification rarely works cleanly** -- observation error, continuous hypotheses, and the consensual nature of science all undermine naive falsification
3. **Build, don't test** -- learn to construct, evaluate, and modify statistical models directly rather than choosing from a flowchart

> [!tip] Comparing Marginal Significance ([[Spurious Association and Confounds]])
> Even if $\beta_f$ is "significant" and $\beta_m$ is not, the *difference* $\beta_f - \beta_m$ may not be significant. Always compute the contrast directly from the posterior.

---

### 6. Neglecting Model Checking

[[Model Checking]] ([[raw/BDA3.pdf|BDA3 Ch. 6]]) and [[Evaluating Fitted Models]] ([[raw/BayesWorkflow.pdf|Bayesian Workflow Sec. 6]]) describe the iterative process of assessing model fit:

**Posterior predictive checking:** simulate replicated data $y^{\text{rep}}$ from the fitted model and compare to observed data:

$$p(y^{\text{rep}} \mid y) = \int p(y^{\text{rep}} \mid \theta)\, p(\theta \mid y)\, d\theta$$

If $y^{\text{rep}}$ doesn't "look like" the observed data, the model is missing something.

**Prior predictive checking** ([[Choosing and Building Models]]): simulate data *before* observing real data to verify that your priors imply sensible data ranges. This catches unreasonable priors before they corrupt inference.

**LOO-CV diagnostics** ([[Evaluating Fitted Models]]): identify hard-to-predict observations (potential outliers or model misfit), check calibration via LOO-PIT, and assess observation influence.

**Remedy:** Model checking is iterative: identify misfit $\to$ expand the model $\to$ check again. Focus on **severe tests** -- checks likely to fail if the model would give misleading answers to the questions you care about.

---

### 7. Computational Problems Masking Model Problems

[[Computational Troubleshooting]] ([[raw/BayesWorkflow.pdf|Bayesian Workflow Sec. 5]]) introduces the **folk theorem of statistical computing**:

> When you have computational problems, often there is a problem with your model, not the algorithm.

Divergent transitions, poor mixing, and slow convergence often signal a nonsensical model, not an algorithmic limitation. Common pathologies:

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Divergent transitions | Funnel geometry in hierarchical models | Non-centered parameterization |
| Slow mixing | Weakly informative data | Add reasonable prior information |
| Label switching | Symmetric modes in mixtures | Constrain to identify one mode |
| Multimodality | Substantively distinct explanations | Stacking; stronger priors |

**Debug strategy:** Move from two directions -- simplify the failing model top-down, and build up from a working simple model bottom-up. Where they meet is where the pathology lives.

---

### 8. Type S and Type M Errors from Underpowered Analyses

[[Type S and Type M Errors]] ([[raw/multiple2f.pdf|Gelman et al. 2009, Sec. 3.1]]) reframes what goes wrong beyond the classical Type 1/Type 2 dichotomy:

- **Type S (sign) error**: claiming an effect is positive when it's actually negative
- **Type M (magnitude) error**: the exaggeration ratio $|\hat{\tau}|/|\tau|$ is far from 1

> [!theorem] Large Standard Errors Inflate Type M Errors ([[Type S and Type M Errors#^thm-type-m-inflation]])
> When the true effect is near zero, an estimator with a large standard deviation is more likely to produce large point estimates. Statistically significant results from underpowered studies are likely *exaggerated* -- large estimates are a byproduct of large standard errors, not evidence of large effects.

This is the mechanism behind the "winner's curse": the most impressive result in a set of comparisons is likely the most exaggerated ([[Power Analysis and Sample Size]]).

**Remedy:** Frame questions in terms of sign and magnitude, not "is it zero?" Use [[Hierarchical Models|multilevel models]] that naturally control Type S/M errors through shrinkage. Be suspicious of large effects from small samples.

### Practical Implications

A checklist for avoiding these pitfalls:

1. **Before modeling**: Draw a causal DAG. Include missingness mechanisms. Identify the target estimand.
2. **Building the model**: Start simple, build modularly ([[Choosing and Building Models]]). Use regularizing priors. Perform prior predictive checks.
3. **Fitting**: Monitor convergence diagnostics. If computation fails, suspect the model first ([[Computational Troubleshooting]]).
4. **Evaluating**: Posterior predictive checks. LOO-CV with PSIS diagnostics. Check calibration.
5. **Comparing models**: Use PSIS-LOO or WAIC, not $R^2$ or p-values. Consider stacking rather than selecting one model ([[Iterative Model Improvement]]).
6. **Reporting**: Full posterior intervals, not binary significance. Compute contrasts directly. Acknowledge uncertainty.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Statistical Rethinking - The Golem of Prague]] | Philosophy: models as golems, build don't test |
| [[Spurious Association and Confounds]] | Confounding, post-treatment bias, masked relationships |
| [[Omitted Variables Bias]] | OVB formula and bias direction |
| [[The Selection Problem]] | Potential outcomes framework, selection bias decomposition |
| [[Activity Bias in Advertising]] | Dramatic real-world example of confounding (160x overestimate) |
| [[Garden of Forking Paths]] | Data-contingent analysis invalidates p-values |
| [[Researcher Degrees of Freedom]] | Sources of analytic flexibility |
| [[Type S and Type M Errors]] | Sign and magnitude errors from underpowered studies |
| [[Multiple Testing Corrections]] | Classical corrections: Bonferroni, FDR, Holm |
| [[Partial Pooling as Multiple Comparisons Correction]] | Hierarchical models as adaptive correction |
| [[Overfitting and Information Criteria]] | Bias-variance tradeoff, information criteria, regularization |
| [[Model Checking]] | Posterior predictive checks (BDA3 Ch. 6) |
| [[Evaluating Fitted Models]] | Workflow for model evaluation (Bayesian Workflow Sec. 6) |
| [[Choosing and Building Models]] | Modular model construction, prior predictive checks |
| [[Computational Troubleshooting]] | Folk theorem, debugging strategies |
| [[Missing Data - Statistical Rethinking]] | Missingness mechanisms, Bayesian imputation |
| [[raw/StatRethink-Bayes.pdf]] | Statistical Rethinking (McElreath) |
| [[raw/BDA3.pdf]] | Bayesian Data Analysis 3rd ed. (Gelman et al.) |
| [[raw/BayesWorkflow.pdf]] | Bayesian Workflow (Gelman et al. 2020) |
| [[raw/Mostly Harmless Econometrics.pdf]] | Mostly Harmless Econometrics (Angrist & Pischke) |
| [[raw/p_hacking.pdf]] | Garden of Forking Paths (Gelman & Loken 2013) |
| [[raw/multiple2f.pdf]] | Multiple Comparisons (Gelman, Hill & Yajima 2009) |
| [[raw/ssrn-2080235.pdf]] | Activity Bias (Lewis, Rao & Reiley 2011) |

## Related Concepts

- [[Conditional Independence Assumption]] -- when controlling for observables is sufficient for causal identification
- [[Instrumental Variables]] -- using exogenous variation when CIA fails
- [[Differences-in-Differences]] -- controlling for time-invariant unobservables
- [[Regression Discontinuity Designs]] -- exploiting arbitrary assignment rules
- [[Hierarchical Models]] -- the foundational framework for partial pooling and shrinkage
- [[Bayesian Workflow - Overview]] -- the full iterative modeling workflow
- [[Model Comparison]] -- LOO-CV, PSIS-LOO, WAIC, Bayes factors
- [[Bayesian Linear Regression]] -- regularizing priors in regression
- [[Counterfactual Inference]] -- explicit counterfactual framing
- [[Data Collection Models]] -- Bayesian treatment of ignorability and selection mechanisms
- [[Q - Differences Between Frequentist and Bayesian Statistics]] -- paradigm differences that shape which pitfalls are most salient
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] -- deep dive on pitfall #2

## Gaps

- **No dedicated note on Simpson's paradox** -- mentioned implicitly via confounding but no formal treatment with examples
- **No note on p-value misinterpretation** specifically (e.g., common misreadings of what $p < 0.05$ means)
- **No coverage of data leakage** in train/test splits or cross-validation
- **No coverage of survivorship bias** as a specific selection mechanism
- **Limited treatment of multicollinearity** -- mentioned briefly in [[Spurious Association and Confounds]] but no dedicated note with VIF diagnostics or remedies
- **No coverage of ecological fallacy** (group-level associations not holding at individual level)

## Follow-Up Questions

- How should I structure a causal DAG for my specific modeling problem?
- What prior predictive checks should I run before fitting a Bayesian model?
- How do I diagnose and fix divergent transitions in Stan/PyMC?
- What is the right missing data strategy when the mechanism is MNAR?
- How does regularization interact with causal identification (e.g., can shrinkage introduce bias in treatment effect estimates)?
