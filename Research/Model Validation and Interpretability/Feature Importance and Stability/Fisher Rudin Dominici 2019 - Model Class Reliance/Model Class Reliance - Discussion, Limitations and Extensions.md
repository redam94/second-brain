---
title: Model Class Reliance - Discussion, Limitations and Extensions
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - type/concept
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§11 Conclusion pp. 42-43; App A.1 p. 43; limitations collected from §4.1 p. 12, §5.1 pp. 17-18, §6 p. 19, §6.3 p. 25, §8.2 p. 32, §9.2.1 p. 38, §10.1-10.2 pp. 40-42"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
  - "[[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]"
  - "[[Model Class Reliance - Recidivism Case Study]]"
used_by: []
aliases:
  - MCR Limitations
  - MCR Future Work
  - Using Model Class Reliance in Practice
---

# Model Class Reliance - Discussion, Limitations and Extensions

> [!summary]
> The authors' conclusion (§11) presents MCR as a "more comprehensive and robust" importance measure than single-model VI. They list four open directions: computation for more model classes, MCR-based variable selection, asymptotics when the class and reference are learned on a growing first split, and the size and visualization of Rashomon sets. Caveats stated across the paper:
> - The finite-sample bounds are too loose to serve as CIs.
> - Coverage of a true model's reliance needs a "nearly correct" class.
> - $\epsilon$, $f_{\text{ref}}$ and $\mathcal F$ are user choices.
> - Unconditional MR evaluates impossible covariate combinations.
> - Computation for non-convex classes such as neural networks is open.
>
> This note also translates MCR into a practical validation recipe for marketing-analytics models.
^summary

## Overview

MCR answers "how much could, and must, an acceptable model rely on $X_1$?" That question exposes the analytic flexibility hidden behind one reported importance number. This note collects what the paper says MCR does *not* do, what remains open, and how to use it without misreading it.

## Main Content

### Conclusion and future work (§11, pp. 42-43)

1. **Contribution restated.** MCR is the upper and lower limit on how important a set of variables can be to any well-performing model in a class. The paper derives bounds motivating the point estimates, and connections between permutation importance, U-statistics, conditional VI and conditional causal effects. The COMPAS application illustrates use on a proprietary model.
2. **Computation for more classes and losses.** For classes where empirical loss minimization is convex, MCR can be computed conservatively via a series of convex (or DC) problems. $\widehat{MCR}_-$ is often no harder than reweighted ERM. General computation procedures remain open.
3. **Variable selection.** If $MCR_+$ is small for a variable, no well-performing model can depend heavily on it, so it can be eliminated.
4. **Learned $\mathcal F$ and $f_{\text{ref}}$.** The theory assumes $\mathcal F$ and $f_{\text{ref}}$ are prespecified. In practice they are set on a first split of size $n_1$, and MCR is estimated on a second split of size $n_2$. The constants $B_{\text{ind}},B_{\text{ref}},B_{\text{switch}},b_{\text{orig}}$ then depend on $n_1$. Studying sequences $\{n_1,f_{\text{ref},n_1},\mathcal F_{n_1}\}$, with $n_1$ and $n_2$ growing at different rates, "may more thoroughly capture how model classes are determined by analysts".
5. **Rashomon sets as objects of study.** Their *size* and its link to generalization (Semenova & Rudin 2019), and methods to *visualize* them (Dong & Rudin 2019). Beyond MR, Rashomon sets support finite-sample inference on other attributes of best-in-class models (§5).

**Code (App A.1).** R code for §9.1 and §10 is at github.com/aaronjfisher/mcr-supplement.

### Limitations stated in the paper

| Limitation | Where | Consequence |
|---|---|---|
| Finite-sample bounds are "impractically large" as CIs | §4.1 p. 12; §5.1 p. 17 | Theory justifies the point estimate; uncertainty comes from the bootstrap, which has no finite-sample guarantee |
| Prop 7 threshold shrinks as $n^{-1/2}$, slower than profile likelihood's $n^{-1}$ | §5.1 p. 17 | Rashomon-set CIs are conservative |
| Prop 7 needs $\phi(f)$ known exactly | §5.1 p. 17 | Estimated characteristics such as MR or $\mathrm{Var}f(X)$ need an extra correction term |
| Coverage of $MR(f_0)$ needs Condition 20 (a good model in $\mathcal F$ matching $f_0$'s reliance) | §9.2 pp. 36-38 | Fails under strong misspecification ($\gamma\ge0.4$); more data does not help |
| MCR is generic, so less powerful than a correctly specified sensitivity analysis | §9.2.1 p. 38 | Intervals about 2-4 times wider than a single-model bootstrap |
| Regularization caps the achievable MR (Eq 6.5) | §10.1 p. 40 | $\widehat{MCR}_+$ may underestimate the reliance of a less-regularized black box |
| MR permutes $X_1$ independently of $X_2$ | §8.2 p. 32 | Impossible $(x_1,x_2)$ combinations; CMR fixes this but is hard to estimate nonparametrically |
| Computation for non-convex classes (e.g. neural networks) is open | §2.1 p. 6; §6.3 p. 25 | Only heuristic inner bounds (e.g. simulated annealing) are available |
| DC branch-and-bound converges slowly in high dimension | §6.3 p. 25 | Very conservative envelopes |
| $\hat e_{\text{divide}}$ breaks Prop 11 | §6.1 p. 24; App C.3 | Only approximate reweighted-ERM tractability for large-$n$ shortcuts |
| Ratio MR unstable when $\min e_{\text{orig}}$ is small | App A.5 | Prefer $MR_{\text{difference}}$, perhaps normalized by $\mathrm{Var}(Y)$ |
| Admissible/inadmissible labels and proxies are contestable | §10.2 | Conclusions about sensitive variables depend on which proxies are measured |

### Interpretive cautions (synthesis)

- **MCR is not causal.** It describes the reliance of *predictive* models. Only for $f_0=E(Y\mid X)$ under ignorability does MR map onto treatment effects (Prop 19). For channel or driver attribution, see [[Dillon et al - SHAP and Causal Insights - Overview]] and [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- **The answer depends on $\mathcal F$, $\epsilon$ and $f_{\text{ref}}$.** These are themselves analyst choices. MCR moves the forking paths from "which model" to "which class and tolerance". That is more honest, because it is stated up front, but it is not choice-free ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]]).
- **A wide MCR is a finding.** It says the data cannot tell whether the variable matters, which is exactly the underspecification that single-model reports hide.

## Examples

> [!algorithm] Practical recipe: MCR as a validation check for a marketing model (synthesis, not from the paper)
> 1. **Fix the class.** For example, a ridge-penalized regression on adstocked, saturated channel spends with weekly data of 52-156 rows, or a per-segment tree model of a shared aggregate KPI. Fix $\mathcal F$ and $f_{\text{ref}}$ on an early time block.
> 2. **Choose $\epsilon$.** Use a business-meaningful loss tolerance, e.g. 5-10% of $f_{\text{ref}}$'s *held-out* error, as the paper does with $0.1\times$ the CV loss.
> 3. **Compute the range.** For each channel, compute $[\widehat{MCR}_-,\widehat{MCR}_+]$ on a later block, with the §6 search (exact for ridge or kernel classes) or heuristic search for trees. Use $MR_{\text{difference}}$ if errors are small.
> 4. **Use CMR for correlated channels.** For strongly correlated channels (TV and branded search), also compute CMR by residual swapping.
> 5. **Read the result.** A channel with $\widehat{MCR}_-\gg1$ is robustly needed. A channel whose range includes 1 cannot be declared important from this data. Report the range, not one model's importance.
> 6. **Do not rank model fits by reliance or SHAP mass.** Choosing among fits by total SHAP or importance mass instead of held-out accuracy selects for whatever story the analyst prefers inside the Rashomon set. MCR makes that set explicit. Model choice should still use predictive validation ([[Cross Validation Checking]], [[Cross-Validation for Time Series Prediction]]).
> 7. **Check time-series validity.** With autocorrelated weekly data, both the reference fit and $\epsilon$ should come from valid time-series validation ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]). Permuting weeks breaks temporal structure, so consider block-wise switching.
^alg-mcr-recipe

## Connections

- **Two cultures.** Breiman's algorithmic culture embraced the Rashomon multiplicity. MCR gives it a quantitative interpretive tool ([[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]).
- **Stability selection** is the selection-frequency counterpart: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- **Goodhart risk.** If an importance score becomes a target, e.g. "maximize the share attributed to media", analysts will find a model in the Rashomon set that delivers it ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
- **Replicability.** A single model's importance is one draw from many defensible analyses, much like a single published p-value ([[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]).
- **Media-mix practice.** Collinearity and limited data make MMM a textbook Rashomon setting: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Challenges and Opportunities in Media Mix Modeling]], [[MMM Model Selection and Application]]. Simulated ground truth can test whether MCR covers true channel reliance: [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].
- **Sample size.** Narrow Rashomon sets need enough data relative to class complexity: [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].

## See Also
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]: a related vault Q&A on model multiplicity
- [[Model Selection and Overfitting]]
