---
title: "Q: How should I handle multiple comparisons when selecting from hundreds of models?"
tags:
  - type/qa
  - topic/multiple-comparisons
  - topic/research-methodology
  - topic/bayesian-statistics
  - topic/model-comparison
date_asked: 2026-04-09
date_ingested: 2026-04-09
folder: Questions-and-Answers
source: vault
source_location: vault-synthesis
doc_type: qa
answered_from:
  - "[[Multiple Testing Corrections]]"
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Type S and Type M Errors]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Iterative Model Improvement]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Model Comparison]]"
depends_on:
  - "[[Multiple Testing Corrections]]"
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Type S and Type M Errors]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Model Comparison]]"
used_by:
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
related_questions:
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
aliases:
  - "Multiple comparisons with many models"
  - "Model selection and p-hacking"
  - "Variable selection multiple testing"
---

# How should I handle multiple comparisons when selecting from hundreds of models?

> [!summary]
> Running hundreds of models and selecting variables or transformations based on statistical significance is a textbook instance of the [[Garden of Forking Paths]] problem -- the p-values from selected models are invalid because the selection procedure is data-contingent. The vault contains a progression of solutions: classical corrections ([[Multiple Testing Corrections|Bonferroni/FDR]]) are a starting point but become impractical at scale. The recommended approach is to use [[Hierarchical Models|multilevel models]] with [[Partial Pooling as Multiple Comparisons Correction|partial pooling]], [[Overfitting and Information Criteria|regularizing priors]], and [[Iterative Model Improvement|projection predictive variable selection]] rather than significance-based model selection.

## Answer

### The Problem: Why Significance-Based Selection Fails

Running hundreds of models and picking variables based on $p < 0.05$ creates a massive multiplicity problem. With $m$ independent tests at $\alpha = 0.05$ ([[Multiple Testing Corrections]]):

$$P(\text{at least one false positive}) = 1 - (1 - \alpha)^m$$

With 100 models this probability is 99.4%; with 1000 it is essentially 100%.

But the problem is deeper than the raw count of tests. [[Garden of Forking Paths|Gelman & Loken (2013)]] identify three levels of data-contingent analysis:

1. **Pre-specified test**: $T(y; \phi)$ with $\phi$ fixed in advance
2. **Researcher degrees of freedom**: $T(y; \phi(y))$ -- a single test is run, but different data would have led to a different test
3. **Explicit search**: $T(y; \phi^{\text{best}}(y))$ -- trying many tests and reporting the best

Selecting variable transformations and model specifications based on significance is structurally identical to case 3, even without intent to deceive ([[Researcher Degrees of Freedom]]). The [[Researcher Degrees of Freedom|combinatorial explosion]] is enormous: choosing which variables to include, how to transform them, which interactions to test, and which model form to use creates a space far larger than the number of models explicitly fit.

> [!warning] The Winner's Curse
> The model or transformation you select as "most significant" is likely the one with the largest [[Type S and Type M Errors|Type M error]]. When the true effect is near zero, an estimator with a large standard deviation is more likely to produce large point estimates -- statistically significant results from a heavily searched model space are likely *exaggerated*, not evidence of large effects ([[Type S and Type M Errors#^thm-type-m-inflation]]).

### Approach 1: Classical Corrections (Limited Utility)

[[Multiple Testing Corrections]] adjust significance thresholds:

| Method | Threshold for $m = 100$ | Controls |
|--------|------------------------|----------|
| **Bonferroni** | $p \leq 0.0005$ | FWER (any false positive) |
| **Holm** (step-down) | Adaptive, more powerful | FWER |
| **Benjamini-Hochberg** | Adaptive, $p_{(k)} \leq (k/m)\alpha$ | FDR (proportion of false positives) |

**Limitations for model selection:**
- Bonferroni becomes extremely conservative -- with hundreds of models, the threshold drops to levels where almost nothing is significant ([[Multiple Testing Corrections]])
- These methods adjust *thresholds* but leave *point estimates* unchanged -- they don't address [[Type S and Type M Errors|Type M errors]] (exaggerated effect sizes)
- They assume you're testing pre-specified hypotheses, not searching through a model space
- Classical corrections can actually *increase* Type S and Type M error rates by further reducing power ([[Type S and Type M Errors]])

> [!tip] When Classical Corrections Are Appropriate
> Bonferroni/Holm: few tests, each individually important, zero tolerance for false positives. BH/FDR: many parallel tests (genomics, imaging) with batch follow-up planned. Neither is designed for the model search problem ([[Multiple Testing Corrections]]).

### Approach 2: Reframe What Errors Matter

Rather than asking "is this significant?", ask ([[Type S and Type M Errors]]):

- **Type S (sign) error**: Do I have the *direction* of the effect right?
- **Type M (magnitude) error**: How exaggerated is my estimate likely to be? The **exaggeration ratio** is $|\hat{\tau}| / |\tau|$.

> [!example] Example: Eight Schools Simulation ([[Partial Pooling as Multiple Comparisons Correction#^ex-eight-schools-sim]])
> In 1000 simulations of 8 school effects with 28 pairwise comparisons each:
> - Classical analysis finds at least one significant comparison in **47%** of simulations
> - Of those significant results, only **63% have the correct sign** -- a 37% Type S error rate
> - Bayesian hierarchical analysis: significant in only **5%** of simulations, with **89% correct sign**

### Approach 3: Multilevel Models with Partial Pooling (Recommended)

[[Multiple Comparisons - Bayesian Perspective|Gelman, Hill & Yajima (2009)]] argue that [[Hierarchical Models|multilevel models]] replace classical corrections entirely. The mechanism is [[Partial Pooling as Multiple Comparisons Correction|partial pooling]]:

For a normal-normal hierarchical model, the posterior z-score for any comparison is ([[Partial Pooling as Multiple Comparisons Correction#^thm-zscore-shrinkage]]):

$$z_{\text{Bayes}} = z_{\text{classical}} \cdot \frac{1}{\sqrt{1 + \sigma_{\bar{y}}^2 / \sigma_\theta^2}}$$

The shrinkage factor is always $< 1$, and it **adapts to the data**:
- When groups are similar ($\sigma_\theta^2$ small): strong shrinkage, aggressive correction
- When groups are genuinely different ($\sigma_\theta^2$ large): weak shrinkage, little correction needed

| Property | Classical (Bonferroni/FDR) | Multilevel (Partial Pooling) |
|----------|---------------------------|------------------------------|
| Adjusts | Threshold / interval width | Point estimates + intervals |
| Point estimates | Unchanged | Improved (shrunk toward mean) |
| Interval width | Always wider | Can be *narrower* than classical |
| Adapts to data | No (fixed penalty for $m$) | Yes (adapts to variance ratio) |
| Type S error | Not addressed | Reduced by shrinkage |
| Type M error | Not addressed | Reduced by shrinkage |

### Approach 4: Regularizing Priors for Variable Selection

Instead of selecting variables by significance, use priors that encode skepticism about extreme effects ([[Overfitting and Information Criteria]], [[Iterative Model Improvement]]):

- **Ridge-like**: $\beta_j \sim \text{N}(0, \tau^2)$ -- shrinks all coefficients toward zero
- **Lasso-like**: $\beta_j \sim \text{Laplace}(0, \lambda)$ -- encourages sparsity
- **Horseshoe prior**: heavy-tailed, allows genuinely large signals while strongly shrinking noise -- state of the art for sparse high-dimensional problems

> [!warning] Information Budget ([[Iterative Model Improvement]])
> As models grow more complex, priors need to become *tighter* to avoid destabilizing estimates. Selecting variable transformations based on significance is effectively choosing a very permissive implicit prior over the model space.

### Approach 5: Predictive Model Comparison (Don't Pick One Model)

Rather than selecting the "best" model by significance, evaluate models on **out-of-sample predictive accuracy** ([[Model Comparison]], [[Overfitting and Information Criteria]]):

- **PSIS-LOO** (Pareto-smoothed importance sampling leave-one-out): efficient approximation of LOO-CV with $\hat{k}$ diagnostics -- preferred in practice
- **WAIC**: fully Bayesian information criterion, no Gaussian approximation needed
- **Stacking**: when model comparison is uncertain, *combine* models rather than selecting one ([[Iterative Model Improvement]]):

$$p_{\text{stack}}(\tilde{y} \mid \text{data}) = \sum_k w_k \, p_k(\tilde{y} \mid \text{data})$$

Weights $w_k$ are chosen to minimize cross-validation error. This outperforms both single-model selection and traditional Bayesian model averaging.

### Approach 6: Projection Predictive Variable Selection (Best Practice)

For your specific workflow of selecting from a large model space, **projection predictive variable selection** (Piironen & Vehtari, 2017) is the current best practice ([[Iterative Model Improvement]]):

1. Fit a **full model** with all candidate variables and regularizing priors (e.g., horseshoe)
2. **Project** the full model's predictive distribution onto smaller submodels
3. Find the **minimal submodel** that preserves the full model's predictive performance

This avoids the overfitting that comes from searching through many models independently -- the variable selection is guided by the full model's posterior, not by individual significance tests.

### Approach 7: Multiverse Analysis

If you must explore many model specifications, [[Iterative Model Improvement]] recommends **multiverse analysis**: fit all plausible variants and examine how conclusions change. If conclusions are robust across the model space, the specific model choice matters less.

### Practical Implications

For your workflow of running hundreds of models:

1. **Stop selecting by significance** -- p-values from a searched model space are meaningless ([[Forking Paths and Bayesian Approaches]])
2. **Fit one well-specified model** with regularizing priors (horseshoe for sparsity) that includes all candidate variables and transformations
3. **Use projection predictive selection** to identify the minimal sufficient variable set
4. **Evaluate via PSIS-LOO or WAIC**, not in-sample $R^2$ or $p$-values
5. **If comparing groups/conditions**, use multilevel models -- partial pooling handles multiple comparisons automatically
6. **Report full posterior intervals**, not binary significance decisions
7. **Be suspicious of large effects** from the model search -- they are likely Type M errors

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Multiple Testing Corrections]] | Classical corrections: Bonferroni, Holm, BH/FDR |
| [[Garden of Forking Paths]] | Why model search invalidates p-values (Gelman & Loken 2013) |
| [[Researcher Degrees of Freedom]] | Catalogs sources of analytic flexibility |
| [[Type S and Type M Errors]] | Reframes errors: sign and magnitude matter more than Type 1 |
| [[Multiple Comparisons - Bayesian Perspective]] | Core paper: multilevel models replace corrections (Gelman et al. 2009) |
| [[Partial Pooling as Multiple Comparisons Correction]] | Formal algebra: shrinkage reduces z-scores adaptively |
| [[Forking Paths and Bayesian Approaches]] | Why Bayesian methods handle data-contingent analysis |
| [[Iterative Model Improvement]] | Stacking, projection predictive selection, multiverse analysis |
| [[Overfitting and Information Criteria]] | Information criteria, regularizing priors |
| [[Model Comparison]] | LOO-CV, PSIS-LOO, WAIC, Bayes factors |
| [[raw/multiple2f.pdf]] | Gelman, Hill & Yajima (2009) -- primary source |
| [[raw/p_hacking.pdf]] | Gelman & Loken (2013) -- garden of forking paths |
| [[raw/StatRethink-Bayes.pdf]] | Statistical Rethinking Ch. 9 -- overfitting and regularization |
| [[raw/BDA3.pdf]] | BDA3 Ch. 7 -- model comparison |
| [[raw/BayesWorkflow.pdf]] | Gelman et al. (2020) -- Bayesian workflow |

## Related Concepts

- [[Hierarchical Models]] -- the foundational framework for partial pooling (BDA3 Ch. 5)
- [[Hierarchical Linear Models]] -- regression extensions with partial pooling
- [[Bayesian Linear Regression]] -- regularizing priors in regression
- [[Power Analysis and Sample Size]] -- underpowered studies amplify all these problems
- [[Choosing and Building Models]] -- principled model building workflow
- [[Evaluating Fitted Models]] -- posterior predictive checks
- [[Q - Differences Between Frequentist and Bayesian Statistics]] — the paradigm-level context for why these approaches differ

## Gaps

- **No vault coverage of the horseshoe prior in detail** -- [[Bayesian Linear Regression]] mentions it but consider ingesting Piironen & Vehtari (2017) "Sparsity information and regularization in the horseshoe and other shrinkage priors" for the full treatment
- **Projection predictive variable selection lacks a dedicated note** -- only mentioned in [[Iterative Model Improvement]]. Consider ingesting Piironen & Vehtari (2017) "Comparison of Bayesian predictive methods for model selection" as a full source
- **No worked example of multiverse analysis** in the vault

## Follow-Up Questions

- How do I implement projection predictive variable selection in practice (e.g., in R with `projpred` or in Python)?
- What horseshoe prior specification should I use for my specific number of candidate variables?
- How does partial pooling interact with cross-validation for model selection?
- When is stacking preferred over projection predictive selection?
- How should I handle multiple comparisons when the models are non-nested or structurally different?
