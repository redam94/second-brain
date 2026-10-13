---
title: Shape (Saturation) Effects
tags:
  - source/ingested
  - topic/market-response
  - type/definition
  - doc/paper
  - topic/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 2.2, pp. 3-5 (Eqs. 4-6, Figure 2); Sec. 6 Table 4, p. 16"
date_ingested: 2026-06-17
date_updated: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Shape of the Marketing Response Function]]"
used_by:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]"
  - "[[Kumar et al - Additivity Axiom Limits for Non-Additive Models]]"
  - "[[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]]"
  - "[[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]"
  - "[[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]"
  - "[[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]]"
aliases:
  - Hill Function
  - Shape Effect
  - Saturation Curve
  - Diminishing Returns
  - betaHill
  - Reach Transformation
---

# Shape (Saturation) Effects

> [!summary]
> The **shape effect** captures diminishing returns: at high spend, advertising saturates. Jin et al. model curvature with the **Hill function** from pharmacology, parameterized by a half-saturation point $\mathcal{K}_m$ and a slope/shape parameter $\mathcal{S}_m$, scaled by the coefficient $\beta_m$ (the "$\beta$Hill" form). Depending on $\mathcal{S}_m$ the curve is concave ($\mathcal{S}<1$) or S-shaped ($\mathcal{S}>1$). The flexible $\beta$Hill is **poorly identifiable** — very different parameter triples can produce near-identical curves over the observed spend range — so a parsimonious one-parameter **reach transformation** (fixing $\mathcal{S}=1$) is often preferred.
^summary

## Overview

A linear response curve (Guadagni & Little 1983) cannot represent ad saturation. A curvature function maps transformed spend to a saturating response. The Hill function (Gesztelyi et al. 2012; Hill 1910), originally an empirical receptor-binding model, provides a flexible saturating form on $[0,\infty)$.

## Main Content

> [!definition] Hill function (saturation)
> $$
> \text{Hill}(x_{t,m};\,\mathcal{K}_m,\mathcal{S}_m) = \frac{1}{1 + (x_{t,m}/\mathcal{K}_m)^{-\mathcal{S}_m}}, \qquad x_{t,m} \ge 0,
> $$
> where $\mathcal{S}_m > 0$ is the **shape parameter** (a.k.a. *slope*) and $\mathcal{K}_m > 0$ is the **half-saturation point** — so named because $\text{Hill}(\mathcal{K}_m) = 1/2$ for any $\mathcal{S}_m$. As $x \to \infty$, $\text{Hill} \to 1$. (Eq. 4)
^hill-eq

> [!definition] Scaled shape transform ($\beta$Hill)
> To allow channel-specific maximum effects, multiply by the regression coefficient $\beta_m$:
> $$
> \beta_m\,\text{Hill}_m(x_{t,m}) = \beta_m - \frac{\mathcal{K}_m^{\mathcal{S}_m}\,\beta_m}{x_{t,m}^{\mathcal{S}_m} + \mathcal{K}_m^{\mathcal{S}_m}}.
> $$
> $\beta_m$ is the asymptotic (maximum) effect as spend grows large. Shape behavior in $\mathcal{S}$ (Figure 2, same $\mathcal{K},\beta$): $\mathcal{S}>1$ gives a convex-near-zero **S-shape** (red curve); $\mathcal{S}<1$ is more concave near zero and flattens faster (green); $\mathcal{S}=1$ is the intermediate concave case. (Eq. 5)
^betahill-eq

> [!definition] Reach transformation (one-parameter form, $\mathcal{S}=1$)
> A parsimonious special case used by Jin, Shobowale, Koehler & Case (2012) relating reach $R$ to GRPs/impressions $G$:
> $$
> R = a - \frac{b}{G + b/a}.
> $$
> Setting $a = \beta$, $b = \mathcal{K}\beta$, $G = x$ makes this equal to $\beta\text{Hill}(x)$ with $\mathcal{S} = 1$. Estimating the **reach transformation** is equivalent to fixing $\mathcal{S}=1$ in the Hill function — fewer parameters, better identifiability. (Eq. 6)
^reach-eq

> [!warning] Identifiability problem
> The three $\beta$Hill parameters $(\mathcal{K},\mathcal{S},\beta)$ are **essentially unidentifiable** in some regimes. (1) Within a finite observed range, a curve with $(\mathcal{K}=0.5,\mathcal{S}=1,\beta=0.3)$ is matched almost exactly by a very different triple $(\mathcal{K}=0.95,\mathcal{S}=0.748,\beta=0.393)$, diverging only for $x>1$. (2) When $\mathcal{K}$ lies **outside the observed spend range**, two curves can be nearly identical inside the range and diverge only outside it. Consequence: the model **cannot extrapolate** the response beyond observed spend, but the $\beta$Hill *curve* can still be estimated well within the observed range even when the individual parameters cannot. Other curvature forms — sigmoid/logistic, the integral of a normal, or monotone regression splines — are also possible but may share the identifiability issue.
^identifiability

> [!example] Figure 2 parameter sets (p. 5; added in the 2026-10-13 audit)
> Figure 2 plots $\beta\text{Hill}(x)$ for $x\in[0,1.5]$ with the following $(K, S, \beta)$:
>
> | Curve | Half-saturation $K$ | Slope $S$ | $\beta$ | Role |
> |---|---|---|---|---|
> | black solid | 0.5 | 1 | 0.3 | reference ($S=1$) |
> | black dashed | 0.95 | 0.748 | 0.3925 | near-identical to black solid for $x\le1$, diverges for $x>1$ (identifiability case 1) |
> | red | 0.5 | 2 | 0.3 | $S>1$: convex near 0, S-shape |
> | green | 0.5 | 0.5 | 0.3 | $S<1$: more concave near 0, flattens faster |
> | blue solid | 1.5 | 2 | 0.8 | $K$ outside observed range $(0,1)$ |
> | blue dashed | 2 | 1.867 | 1.144 | near-identical to blue solid within $(0,1)$ (identifiability case 2) |
>
> Footnote definitions used with the reach transform (Eq. 6): **reach** is the number of people in the target audience reached by a campaign divided by the audience size (footnote 1). **GRP** is impressions delivered to the target audience divided by the number of people in the target audience, times 100 (footnote 2).
^fig2-params

## Examples

> [!example] Curve estimable, parameters not (Sec. 6)
> In large-sample simulations the $\beta$Hill *curves* are recovered with very low bias and small variance, yet the posterior medians of $\mathcal{K}$, $\mathcal{S}$, $\beta$ vary widely — a direct manifestation of the near-unidentifiability above. In small samples the curves are systematically **underestimated**; Media 1 (true $\mathcal{S}=1$) has the largest bias because $\mathcal{S}=1$ makes the shape less identifiable. Relative bias of $\beta$Hill (Table 4, p. 16):
>
> | | $x=0.5$, two years | $x=0.5$, sixty years | $x=1$, two years | $x=1$, sixty years |
> |---|---|---|---|---|
> | Media 1 ($S=1$) | -39.7% | -0.2% | -32.5% | -0.2% |
> | Media 2 | -25.6% | 3.4% | -18.1% | 3.3% |
> | Media 3 | -39.0% | 10.4% | -25.3% | 10.4% |
>
> The bias is worse at $x=0.5$ (mid-curve) than at full spend for every medium in the two-year arm. Full study design, per-parameter Fig. 7 readings and the mechanism: [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]].
^curve-estimable-parameters-not

## Connections

- Formalizes the concave-vs-S-shaped response distinction in [[Shape of the Marketing Response Function]].
- Applied after adstock in the combined model: [[Carryover (Adstock) Functional Forms]], [[Bayesian Media Mix Modeling - Overview]].
- Priors on $\mathcal{S}$ (gamma) and $\mathcal{K}$ (beta over observed range) and their sensitivity: [[Bayesian Estimation and Priors for MMM]].
- The Hill/reach choice is one axis of the model-selection grid in [[MMM Model Selection and Application]].

## See Also

- [[Carryover (Adstock) Functional Forms]]
- [[Shape of the Marketing Response Function]]
- [[Bayesian Media Mix Modeling - Overview]]
- [[_Index|Index: Bayesian Media Mix Modeling]]
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] — curve vs parameter recovery
- [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] — K outside the observed range
- [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] — partial dependence extrapolates at unsupported spend levels; additive models are safer for response curves
- [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] — saturating response makes Shapley attributions baseline-dependent
- [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] — extrapolating saturation curves beyond observed spend
- [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] — Hill function applied to per-person frequency
- [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] — narrow spend range leaves saturation unidentified
- [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] — concave response, optimal vs break-even spend
