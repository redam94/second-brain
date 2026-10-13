---
title: "Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/overview
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), Statistics and Computing 31:82; arXiv:1905.03151v2 (7 Oct 2021), pp. 1-22 — Abstract, §1-§7, Appendix A"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Bias in Random Forest Variable Importance]]"
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
used_by:
  - "[[Problems with Shapley-Value Feature Importance]]"
  - "[[Feature Relevance as a Causal Problem]]"
aliases:
  - Unrestricted Permutation Forces Extrapolation
  - There Is No Free Variable Importance
  - Hooker Mentch Zhou 2021
  - Hooker and Mentch 2019 permutation importance
---

# Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview

> [!summary]
> Hooker, Mentch & Zhou argue that **permute-and-predict (PaP)** diagnostics — Breiman's permutation variable importance, partial dependence plots (PDPs) and individual conditional expectation (ICE) plots — are misleading when features are **dependent**, because permuting one column of a correlated pair creates query points in regions **with no training data**, so the diagnostic mostly measures how the fitted model **extrapolates**. In a 10-feature linear simulation with $x_1,x_2$ joined by a Gaussian copula ($\rho=0.9$), random forests and neural networks rank $x_1,x_2$ above features with equal or larger true coefficients, while a fitted linear model does not. The remedy costs "at least one more model": generate the feature **conditionally** on the others, or **re-learn** the model without it (LOCO, permute-and-relearn), and ideally do both (**condition-and-relearn**). Under squared error these alternatives all target $E(f(x)-E[f(x)\mid x_{-j}])^2$ (Theorem 2). Re-learning after an unconditional permutation is still not enough for **hypothesis tests**: it inflates false rejections for noise features that are correlated with real ones.
^summary-hmz2021

## Overview

**Citation.** Giles Hooker (UC Berkeley), Lucas Mentch and Siyu Zhou (University of Pittsburgh). *Unrestricted permutation forces extrapolation: variable importance requires at least one more model, or there is no free variable importance.* Statistics and Computing 31, 82 (2021) (journal venue added from the published record; the ingested arXiv file prints only arXiv:1905.03151v2 [stat.ME], 7 Oct 2021). Earlier versions circulated as Hooker & Mentch (2019), which is how [[Problems with Shapley-Value Feature Importance]] cites it.

**Research question.** Why do permutation-based importance measures and effect plots over-weight correlated features when applied to flexible learners, and what should replace them?

**One-sentence thesis** (p. 1, §1, verbatim): "When features in the training set exhibit statistical dependence, permute-and-predict methods can be highly misleading when applied to the original model."

**Contributions** (stated aims (i)-(iii), p. 4):
1. A review of the literature on correlation-induced bias in permutation importance (Strobl et al. 2007; Archer & Kimes 2008; Nicodemus et al. 2010; Toloşi & Lengauer 2011).
2. New demonstrations with random forests and neural networks, plus an **explanation**: the bias comes from evaluating the model far from the data (extrapolation), via the *potential nearest neighbours* of permuted points in trees and via exploding variance in neural nets.
3. Advocacy of measures that avoid extrapolation: conditional importance, dropped-variable (LOCO), permute-and-relearn, and condition-and-relearn. The paper proves these share a population target under squared error and gives their expectations for linear models.

## Key Findings

| # | Finding | Where | Note |
|---|---------|-------|------|
| 1 | For least-squares linear fits, $E_\pi \mathrm{VI}^\pi_j = 2\hat\beta_j^2\sum_i(x_{ij}-\bar x_j)^2$ whatever the correlation; PD and ICE are straight lines of slope $\hat\beta_j$ | Thm 1, p. 6 | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] |
| 2 | With $\rho=0.9$, RF and NN permutation importance rank $x_1,x_2$ (coef 1) above $x_3$-$x_5$ (coef 1) and often above $x_9$ (coef 1.2); linear models keep the right ordering | §3, Fig. 1 | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] |
| 3 | The inflation is largest for small $N$ and for OOB importance, and persists at large $N$ for large $\rho$ (RF at $\rho=0.9$: rank about 7.4 at $N=100$, 6.1 at $N=5000$; OOB about 8 throughout; theory 4) | §3, Fig. 2 | same |
| 4 | Trees predict at permuted, off-data points by averaging from **distant** potential nearest neighbours; NNs show large between-fit variance off the data (Gibbs-like oscillation) | §4, Figs. 4-6 | [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] |
| 5 | Conditional, LOCO, permute-and-relearn and condition-and-relearn importances share the target $E(f(x)-f_{-j}(x_{-j}))^2$ with $f_{-j}=E[f\mid x_{-j}]$ | Thm 2, p. 13 | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |
| 6 | For linear models these alternatives scale with the **residual variance** of $x_j$ given $x_{-j}$ (compensation effect), not its marginal variance | Thm 3, p. 13 | same |
| 7 | Permute-and-relearn **tests** reject far above 5% for noise features correlated (0.7) with signal features; true-conditional and Model-X knockoff substitutes stay near 5% | §5.1, Fig. 8 | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] |
| 8 | On hourly bike-share data, `temp` is important under OOB importance but unimportant under permute-and-relearn | §5.2, Fig. 9 | same |
| 9 | Effect plots are harder to fix: restricting ICE to supported ranges, generalized functional ANOVA, or additive-model distillation | §6 | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |

## Main Content

### Argument flow

1. **Define PaP tools** and distinguish two effects: (a) the permutation *estimand* ignores dependence even for a known function; (b) applying it to an *estimated* function adds extrapolation bias. The paper takes (b) to be at least as important. → [[Permute-and-Predict Extrapolation in Variable Importance]]
2. **Build a transparent benchmark** (linear truth, uniform marginals, copula-correlated $x_1,x_2$). Theorem 1 says what PaP should return for a linear model. → [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]]
3. **Show the failure** for RF/NN, and **explain it** geometrically. → [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]
4. **Replace** with measures that need an extra model; prove a shared target and the linear-model expectations. → [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]
5. **Caution** that ranking is not testing; real data example. → [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]]
6. **Effect plots** and conclusions. → [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]
7. **Back matter**: acknowledgments and the annotated reference list. → [[Hooker Mentch Zhou 2021 - References and Acknowledgments]]

### Source Map

| Source location | Content | Note |
|---|---|---|
| Abstract, p. 1 | PaP critique; extrapolation; recommend muting + re-learning | this note |
| §1 p. 1 | "X-ray the black box" framing; Rudin (2019) argues against post hoc explanation altogether | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| §1 pp. 1-2 | Definitions: $\mathrm{VI}^\pi_j$, OOB importance, $\mathrm{PD}_j$, $\mathrm{ICE}_{i,j}$; $O(N)$ cost, no tuning | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| §1 pp. 3 | Literature on correlation bias; two effects; population targets $\mathrm{VI}^\pi_j(f)$, $f_{-j}$, $f_j$; pregnant-men example | same |
| §1 pp. 3-4 | Linear-model thesis ($\beta_j^2$), backward elimination danger, inference vs model audit, model class reliance (definition, profile-CI analogue) | same (^def-mcr-hmz) |
| §1 pp. 4-5 | Alternatives preview: conditional generation, re-learning (Mentch-Hooker, LOCO, CRT/knockoffs); condition-and-relearn "gold standard" | same + [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |
| §1 p. 5 | Scope: permutation variants on the learned model or algorithm, "staying within the algorithm class"; model-agnostic only; Shapley "more complex" | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| §1 p. 5, eq. (1) | Functional ANOVA, Sobol indices, model distillation, Shapley, split-improvement | [[Permute-and-Predict Extrapolation in Variable Importance]] |
| §2 pp. 5-6, eq. (2) | Simulation model; Gaussian copula; design rationale | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] |
| §2 p. 6, Theorem 1 | PaP for linear least squares; unhatted $\beta_{j'}$ and missing $\hat\beta_0$ in the PD/ICE constants flagged (^warn-thm-1-hats) | same |
| §2 p. 6 | Simulation protocol (RF, 20-node NN, 50 reps, ICE reference points) | same |
| §3 pp. 7-8, Figs. 1-3 | Rank results; full Fig. 1 table (4 series × 10 features × 2 panels); full Fig. 2 tables (all four panels, every $\rho\times N$ cell) plus caption check ("fandom" typo, panel order verified); Fig. 3 PD, PD-SD and ICE readings, with a line-type inconsistency flagged | same |
| §4 pp. 8-11, eq. (3), Figs. 4-6 | Extrapolation; $\varepsilon\sim N(0,0.05)$ resolved as SD 0.05 (SNR $=(1/12)/0.0025=100/3$); potential nearest neighbours; Fig. 4 contour-level table and leaf-boundary description (^fig4-readings); NN variance and Gibbs effects; Fig. 5 mean and SD contour values; Fig. 6 PD/ICE readings | [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] |
| §5 pp. 10-12 | Two families of alternatives; the two modes of the knockoff framework; MCR with conditional permutations; definitions $\mathrm{VI}^C,\mathrm{VI}^D,\mathrm{VI}^{\pi L},\mathrm{VI}^{CL}$ | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |
| §5 p. 13, Theorems 2-3 | Shared target; linear expectations; compensation; joint importance; notation problems in Theorem 3 ($\hat\gamma_0$ vs $\gamma_j$, $\beta_j^2$ vs $\hat\beta_j^2$, factor 2) flagged (^warn-thm-3-notation) | same |
| §5 p. 13 | Local methods (saliency, LIME, SHAP) and their global limits | same |
| §5 p. 14, Fig. 7 | Rank agreement of the four alternatives; full Fig. 7 tables (6 panels, every measure × feature for $\rho=0$ and $\rho=0.9$) | same |
| §5.1 pp. 14-16, Fig. 8 | Ordering vs testing; permute-and-relearn test inflation; full Fig. 8 table (SNR × model × $q$) and knockoff / truth ranges | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] |
| §5.2 pp. 16-17, Fig. 9 | Bike-sharing OOB vs $\mathrm{VI}^{\pi L}$ ranks | same |
| §6 pp. 16-18 | PD alternatives: restricted ICE, generalized fANOVA, GAM distillation (formal additive model of eq. (1)'s one-dimensional terms and distillation algorithm, ^def-additive-distillation) | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] |
| §7 p. 18 | Conclusions | same |
| Acknowledgments p. 18 | NSF grants DMS-1712554, DMS-1712041, DMS-2015400; University of Pittsburgh Center for Research Computing | [[Hooker Mentch Zhou 2021 - References and Acknowledgments]] |
| References pp. 18-21 | 46 references, with venues, grouped by role | [[Hooker Mentch Zhou 2021 - References and Acknowledgments]] |
| App. A pp. 21-22 | Proofs of Theorems 1-3 (incl. the remark that $\mathrm{VI}^D$ = replacing $x_j$ by a constant) | Thm 1 → [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]]; Thms 2-3 → [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] |

## Examples

> [!example] Example: the pregnant-men query (p. 3, §1)
> In a model with both pregnancy status and gender, permuting pregnancy status independently of gender would, in the authors' words, "result in the evaluation of the response of pregnant men as often as pregnant women." PaP importance is then partly a measure of what the model predicts for impossible inputs.
^ex-pregnant-men

> [!example] Example: correlated media channels in a driver model (generic illustration)
> In weekly marketing data with 52-156 rows, TV and paid-search spend often rise and fall together because both follow the same flighting calendar. A tree ensemble fit to sales, and scored by permutation importance, will be queried at weeks with heavy TV and no search. No such weeks are in the data, so the forest returns an average of distant leaves. Per this paper, both correlated channels will tend to rank **above** an uncorrelated channel with an equal true effect.
^ex-media-channels

## Connections

- Owner note for **permutation importance and extrapolation** in this run: [[Permute-and-Predict Extrapolation in Variable Importance]].
- The **selection/categorical** bias of RF importance is a different mechanism: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] and [[Bias in Random Forest Variable Importance]].
- **Conditional** permutation inside tree partitions: [[Strobl et al 2008 - Conditional Variable Importance - Overview]].
- **Model reliance / model class reliance** (cited for averaging over all permutations, U-statistic bounds, conditional permutation): [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- The same off-manifold problem for interventional **SHAP**: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and [[Problems with Shapley-Value Feature Importance]]; the causal reading that defends interventional evaluation: [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- Stability of selected sets when importances are noisy: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- Algorithmic-modelling culture where permutation importance originated: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- The simulation design follows the aims/data/estimand/methods/performance structure in [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- Choosing among importance variants after seeing results is one of the [[Researcher Degrees of Freedom]].

## See Also
- [[Research/Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation/_Index|Index: Hooker Mentch Zhou 2021]] — routing table for this note set
- [[Variance-Based Sensitivity and Sobol Indices]] — PaP importance equals a Sobol index when features are independent
- [[SHAP and Causal Interpretation of Predictive Models]] — interpretation-as-causation warnings
- [[Dillon et al - SHAP and Causal Insights - Overview]] — practical SHAP caveats
- [[Strobl 2007 - Null and Power Case Results]] — earlier documented failure of permutation importance
- [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]] — states the permutation-mimics-absence premise that Hooker et al. critique
- [[Model Reliance - Permutation Importance as a U-Statistic]] — MR is the unrestricted permute-and-predict estimand
- [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] — Kumar §3.1.2 cites Hooker & Mentch for the off-manifold problem in interventional SHAP
- [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] — cut-edge intervention is off-manifold evaluation
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — origin of the permute-and-predict procedure
