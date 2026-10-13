---
title: "Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/concept
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, §6 'Partial Dependence Alternatives' pp. 16-18; §7 'Conclusions' p. 18"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Permute-and-Predict Extrapolation in Variable Importance]]"
  - "[[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]"
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
aliases:
  - Generalized functional ANOVA partial dependence
  - Restricted ICE plots
  - Additive model distillation for effect plots
---

# Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions

> [!summary]
> Fixing **effect plots** is harder than fixing importance scores. §6 discusses three options.
> 1. **Restrict ICE curves** to the range of $x_j$ supported by the data. This needs an estimated conditional distribution.
> 2. **Generalized functional ANOVA** (Hooker 2007): find $f_1(x_1)+f_{-1}(x_{-1})$ closest to $f$ in $L^2(p)$ under the *joint* feature density. This needs $p(x)$ and a high-dimensional $f_{-1}$.
> 3. **Additive-model distillation**: fit a GAM to $f$ or to the data (Lou et al. 2013; Tan et al. 2018). This gives a coherent, extrapolation-free picture.
>
> Simply averaging only the "supported" parts of ICE curves can be **strongly misleading**. §7 concludes that every sound alternative costs additional computation or modelling. Condition-and-relearn is best for importance. Local methods (LIME, saliency) avoid extrapolation but give no global summary, and counterfactual explanations may share the problem.
^summary-hmz-pd-alternatives

## Overview

§5 fixed importance by staying on the data distribution. For plots of effects this is "less straightforward" (p. 16), because a PD curve is defined by varying $x_j$ over its **whole** range at every observation.

## Main Content

### Option 1: Restricted ICE plots (§6, p. 16)

- In Fig. 3, each ICE line is drawn **solid** only over the high-density range of $x_1$ given the other features. This gives local information and also shows how strongly $x_1$ depends on the other covariates.
- That range must be determined somehow. Goldstein et al. (2015) suggested marking the observations on ICE plots, but this does not show over what range the curve rests on nearby data.
- The paper used **±2 standard deviations within the Gaussian copula** that generated the data. Without that knowledge, the bounds require an **estimated conditional distribution**.

> [!theorem] Caution: Averaging only the supported ICE segments (§6, p. 16)
> Fig. 6 might suggest modifying PD to average only the solid parts of each ICE line. The authors warn this "could be strongly misleading", because changes due to $x_2$ get attributed to $x_1$. Different observations contribute at different $x_1$ values, and their $x_2$ values also differ.
^caution-restricted-pd

### Option 2: Generalized functional ANOVA (§6, pp. 16-18)

> [!definition] Definition: Distribution-weighted additive projection (Hooker 2007) (§6, p. 16)
> Choose functions $f_1(x_1)$ and $f_{-1}(x_{-1})$ to minimize
> $$
> \int\big(f(x)-f_1(x_1)-f_{-1}(x_{-1})\big)^2\,p(x)\,dx,
> $$
> where $p(x)$ approximates the **joint** feature distribution and $f_{-1}$ is an unknown function of all features except $x_1$. The fitted $f_1$ plays the role of a partial dependence function, but it is weighted by where the data actually are. It is the generalized version of the functional ANOVA in eq. (1) ([[Permute-and-Predict Extrapolation in Variable Importance#^def-fanova]]).
^def-gen-fanova

- Hooker (2007) minimized a **quasi-Monte Carlo** approximation of the integral, which needs an estimate of $p(x)$. That estimate is unlikely to be accurate in high dimensions.
- Chastaing et al. (2012) added **smoothing** methods (generalized Hoeffding-Sobol decomposition).
- Mentch & Hooker (2017) used similar structures to **test for feature interactions** in random forests.
- **Key obstacle**: $f_1$ and the high-dimensional $f_{-1}$ must be estimated **jointly**, which needs specialized learning methods.

### Option 3: Additive models / distillation (§6, p. 18)

- Lou et al. (2013) and Tan et al. (2018) fit a **generalized additive model** (Wood 2006) containing only the one-dimensional terms on the right of eq. (1).
- The GAM can be fit to the **data** directly, or to the values of $f(x)$ as **model distillation**.
- The linear-model fits in Fig. 3 belong to this class and provide "a coherent, extrapolation-free, representation of the underlying function."

> [!definition] Definition: Additive model of the one-dimensional terms of eq. (1) (§6, p. 18; formal statement is the vault's rendering)
> The source describes this option in words: a GAM "that includes only one-dimensional functions in the right hand side of (1)". Written out, the functional ANOVA (1) is $f(x)=f_0+\sum_{j=1}^pf_j(x_j)+\sum_{i<j}f_{ij}(x_i,x_j)+\dots$, and the additive model keeps only the first two parts:
> $$
> g(x)=g_0+\sum_{j=1}^p g_j(x_j),
> $$
> with each $g_j$ a smooth univariate function (e.g. a penalized spline, Wood 2006), centred for identifiability, e.g. $\sum_i g_j(x_{ij})=0$. There are two ways to fit it:
> - **To the data**: $\hat g=\arg\min_{g\text{ additive}}\sum_{i=1}^N\big(y_i-g(x_i)\big)^2+\sum_j\lambda_j\,\mathrm{Pen}(g_j)$.
> - **As model distillation** of a black box $f$: $\hat g=\arg\min_{g\text{ additive}}\sum_{i=1}^N\big(f(x_i)-g(x_i)\big)^2+\sum_j\lambda_j\,\mathrm{Pen}(g_j)$. The black box's predictions at the observed $x_i$ are the response.
>
> The effect display for feature $j$ is the curve $\hat g_j(x_j)$.
^def-additive-distillation

> [!algorithm] Algorithm: Additive-model distillation of a fitted model (§6, p. 18; steps are the vault's rendering)
> 1. Fit the flexible model $f$ (forest, network, boosting) as usual.
> 2. Compute $f(x_i)$ at the **observed** feature vectors only, $i=1,\dots,N$. Optionally use held-out or extra in-distribution points. Never use points on a grid or from permuted columns.
> 3. Fit $g(x)=g_0+\sum_jg_j(x_j)$ to the pairs $(x_i,f(x_i))$ by penalized least squares.
> 4. Plot each $\hat g_j$ over the observed range of $x_j$. Report the fidelity of the distillation, e.g. $R^2$ of $g$ against $f$ on the observed points, so readers know how much of $f$ (interactions) the display leaves out.
^alg-distillation

**Why this avoids extrapolation, and how it relates to Option 2.**
- The fitting criterion only involves $f$ (or $y$) at observed $x_i$. Unlike PD, nothing is evaluated at off-support combinations such as (large $x_1$, small $x_2$) in the copula design. This is the sense of "coherent, extrapolation-free" (p. 18).
- Comparing it with the [[#^def-gen-fanova|distribution-weighted additive projection]] above, the additive model is the generalized functional ANOVA criterion with **two simplifications**: the integral against $p(x)$ is replaced by the empirical average over the sample, which is automatically weighted by where the data lie, and the high-dimensional $f_{-1}(x_{-1})$ is restricted to the additive $\sum_{j\ne1}g_j(x_j)$. That restriction is what removes the "key problem" of jointly estimating a high-dimensional $f_{-1}$ (p. 18). The price is that interactions are not shown.
- Fig. 3's linear fits are the special case $g_j(x_j)=\hat\beta_jx_j$. Their "effect curves" are the Theorem 1 lines of slope $\hat\beta_j$.
- *Vault gloss, not in the paper:* the same compensation effect applies. With highly correlated $x_1,x_2$ the backfitting splits their shared signal between $g_1$ and $g_2$, and these components are less stable than those of independent features. Additive displays avoid extrapolation but not collinearity. Compare [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures#^def-compensation]].


### Conclusions (§7, p. 18)

1. Naïve permutation methods can mislead even in simple examples, and **extrapolation by flexible models** is a significant source of error. The precise bias depends on the learner, the feature dependence and the response function; Bénard et al. (2021) analyse it for random forests (Sobol-MDA).
2. All alternatives need more computation.
   - $\mathrm{VI}^{\pi L}_j$ still permutes but refits. Mentch & Hooker (2016) found that keeping the feature dimension gives a better statistical comparison than dropping and refitting ($\mathrm{VI}^D_j$).
   - **Condition-and-relearn** is better still, because the replacements keep at least approximate dependence on the remaining features.
   - Berrett et al. (2020), the **conditional permutation test**, is a hybrid: it permutes, but samples permutations non-uniformly according to the conditional distribution.
   - Non-refitting approaches need a model for $x_{ij}\mid x_{i,-j}$; Liu & Zheng (2018) build auto-encoding knockoff generators.
3. Generalized **Sobol indices** (Hooker 2007) and **Shapley values** (Owen 2014; Lundberg & Lee 2017) are further options. If they are not computed carefully, they can show the same extrapolation bias.
4. PD and ICE plots raise the same concern. **Local** methods (LIME, saliency) avoid extrapolation but give no global picture, for example of a **threshold** function. **Counterfactual explanations** (Wachter et al. 2017) may extrapolate in a similar way; the authors did not study this.
5. Additive-model displays (Tan et al. 2018) represented overall function behaviour better than combinations of local explanations. The diagnostics of Hooker (2007) still need specialized methods.

### Limitations and scope (as stated or implied in the paper)

- The paper studies **bias** only. Variability and confidence intervals are left to other work, such as U-statistics (Ishwaran & Lu 2019) and model class reliance (§1).
- The analytic conditional distribution in the simulations is a convenience that practice rarely has (§5).
- Theorems 2-3 are exact for **squared error** and **linear** models respectively. Beyond these, the measures may differ (§5).
- The extrapolation explanations are given for random forests and single-hidden-layer neural networks only.

## Examples

> [!example] Example: response curves from a flexible MMM surrogate (generic illustration)
> A team fits gradient-boosted trees to 104 weeks of sales and plots the partial dependence of sales on TV spend to read off saturation. TV spend never exceeded its 90th percentile in weeks with low search spend. The top of the PD curve therefore averages predictions for (high TV, low search) combinations the model never saw, and its flattening or rising may reflect how trees extrapolate rather than saturation. Two safer options follow from §6. One is to show ICE only over the supported range of TV given the other inputs. The other is to fit an explicitly additive saturation model and read curves from that; see [[Shape (Saturation) Effects]].
^ex-mmm-response-curves

## Connections

- Functional ANOVA and Sobol indices in the independent-input case: [[Variance-Based Sensitivity and Sobol Indices]].
- Additive, interpretable-by-design models over post-hoc explanation: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- Reliance on local explanations and SHAP: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]].
- Governance requirements to document limits of model use: [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].
- Choosing which importance or effect display to report after looking at several is a forking path: [[Garden of Forking Paths]].

## See Also
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
- [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]
