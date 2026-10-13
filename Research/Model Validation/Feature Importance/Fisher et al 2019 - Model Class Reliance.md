---
title: "Fisher et al 2019 - Model Class Reliance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/rashomon-set
  - type/definition
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "JMLR 20, 1–81 (2019); p. 2"
citation: "Fisher, A., Rudin, C. & Dominici, F. (2019). All models are wrong, but many are useful: Learning a variable's importance by studying an entire class of prediction models simultaneously. Journal of Machine Learning Research, 20, 1–81."
date_ingested: 2026-10-13
folder: "Model Validation/Feature Importance"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures]]"
  - "[[Strobl et al 2008 - Conditional Variable Importance]]"
used_by:
  - "[[Meinshausen and Buhlmann 2010 - Stability Selection]]"
  - "[[Dillon et al - SHAP Predictive Models and Causal Insights]]"
aliases:
  - "Fisher 2019"
  - "Model class reliance"
  - "All models are wrong, but many are useful"
  - "MCR"
---

# Fisher et al 2019 - Model Class Reliance

> [!summary]
> Fisher, Rudin & Dominici formalise the observation that **many different models fit the data almost equally well** (the "Rashomon set") and can rely on entirely different variables. They define **model reliance** for a single model and **model class reliance (MCR)** — the range of reliance on a variable across all near-optimal models — with finite-sample guarantees. For validators, it turns "which features does the best model use?" into the more honest question "what range of importance is consistent with the data?", which is exactly what a best-of-many model-selection pipeline hides.

## Overview

*Fisher, A., Rudin, C. & Dominici, F. (2019). JMLR 20, 1–81.*

Breiman ([[Breiman 2001 - Statistical Modeling The Two Cultures]]) named the "Rashomon effect": a multiplicity of models with similar error but different stories. Importance computed for one chosen model inherits arbitrary choices (algorithm, seed, tuning). The paper asks how much a *well-performing* model could, at minimum and at most, rely on a variable of interest — motivated partly by auditing proprietary models (e.g. whether a criminal-recidivism score could be relying on protected attributes).

## Main Content

### Model reliance for one model

Split the features into the variable(s) of interest $X_1$ and the rest $X_2$. Let $e_{\text{orig}}(f) = \mathbb{E}\,L(f; Y, X_1, X_2)$ be expected loss and $e_{\text{switch}}(f)$ the expected loss when $X_1$ is replaced by an independent copy $X_1^{*}$ drawn from its marginal.

> [!definition] Model reliance (MR)
> $$\mathrm{MR}(f) = \frac{e_{\text{switch}}(f)}{e_{\text{orig}}(f)},$$
> (a difference version $e_{\text{switch}} - e_{\text{orig}}$ is also used). $\mathrm{MR}(f) = 1$ means $f$ does not use $X_1$; larger values mean more reliance. The empirical estimator averages the loss over all $n(n-1)$ pairs in which observation $i$'s $X_1$ is swapped into observation $j$:
> $$\hat e_{\text{switch}}(f) = \frac{1}{n(n-1)}\sum_{i=1}^{n}\sum_{j \ne i} L\big(f;\ y_j,\ x_{1,i},\ x_{2,j}\big),$$
> a U-statistic, avoiding the extra noise of a single random permutation.
^def-model-reliance

### Rashomon set and model class reliance

> [!definition] Rashomon set and model class reliance (MCR)
> For a model class $\mathcal F$, a reference model $f_{\text{ref}}$ and tolerance $\epsilon \ge 0$, the (population) **Rashomon set** is
> $$\mathcal R(\epsilon) = \{ f \in \mathcal F : e_{\text{orig}}(f) \le e_{\text{orig}}(f_{\text{ref}}) + \epsilon \}.$$
> **Model class reliance** is the interval
> $$[\mathrm{MCR}_-(\epsilon),\ \mathrm{MCR}_+(\epsilon)] = \Big[\min_{f \in \mathcal R(\epsilon)} \mathrm{MR}(f),\ \max_{f \in \mathcal R(\epsilon)} \mathrm{MR}(f)\Big].$$
^def-model-class-reliance

Key results:

- **Finite-sample bounds.** Empirical MCR computed on a slightly enlarged/shrunk empirical Rashomon set gives probabilistic bounds on the population $\mathrm{MCR}_\pm$, using uniform-convergence (covering-number) arguments over $\mathcal F$.
- **Computation.** For linear models and regularised kernel regression the search reduces to minimising linear combinations of $\hat e_{\text{orig}}$ and $\hat e_{\text{switch}}$, which can be solved (with a binary search over the combination weight) as convex or tractable non-convex problems.
- **Interpretation.** If $\mathrm{MCR}_-$ is close to 1, *every* good model can avoid the variable; if $\mathrm{MCR}_+$ is large, *some* good model leans on it heavily. A single fitted model's importance can sit anywhere in this interval.
- The paper also discusses conditional variants and links to causal effects, and notes that MR, like permutation importance, measures reliance of a *model*, not the effect of intervening on the variable.

## Key Passages

> "many prediction models may fit the data almost equally well. In such cases, the model used by one analyst may rely on entirely different covariate information than the model used by another analyst." — Fisher, Rudin & Dominici (2019), p. 2

## Implications for Model Validation

- When a pipeline fits many candidate models and keeps the best (by a small margin), the winner's feature ranking is one draw from the Rashomon set; report importance **ranges** across near-best models, not the winner's list.
- A driver whose $\mathrm{MCR}_-$ is near 1 cannot be called "necessary" for good prediction, however high it ranks in one model.
- Run-to-run disagreement in importance rankings (across seeds, algorithms or retrains) is expected under Rashomon multiplicity and should be measured, not ignored.
- Reliance is a property of models; it does not say what happens if the variable is changed ([[Dillon et al - SHAP Predictive Models and Causal Insights]]).

## Connections

- Formalises the Rashomon effect of [[Breiman 2001 - Statistical Modeling The Two Cultures]].
- Model reliance is the population version of permutation importance; it inherits the extrapolation concern of [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] and the proxy-credit issue of [[Strobl et al 2008 - Conditional Variable Importance]].
- [[Meinshausen and Buhlmann 2010 - Stability Selection]] attacks the same multiplicity by resampling data rather than enumerating models.
- Analytic multiplicity across equally defensible models echoes the [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]].

## See Also

- [[Meinshausen and Buhlmann 2010 - Stability Selection]] — stable variables across subsamples
- [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] — limits of permutation-based reliance
- [[Model Comparison]] — comparing candidate models on predictive performance
- [[Simmons et al 2011 - False-Positive Psychology]] — choosing among many analyses
