---
title: "Degtiar 2023 - Doubly Robust and Combined Methods"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 5.3 (5.3.1 one study, 5.3.2 multiple studies), PDF pp. 18-21"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
  - "[[Degtiar 2023 - Outcome Regression Methods]]"
used_by:
  - "[[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]"
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - A-IPPW
  - Augmented inverse probability of participation weighting
  - TMLE for transportability
  - Cross-design synthesis
  - Calibrated risk-adjusted regression
  - Combining RCT and observational data
---

# Degtiar 2023 - Doubly Robust and Combined Methods

> [!summary]
> Doubly robust estimators combine an **outcome regression** with a **selection-propensity model**; they are consistent if either is correct and efficient if both are. The review covers TMLE (for encouragement designs with instruments), **A-IPPW** (generalizability and transportability forms, normalized variant, weighted outcome regression), calibration weighting (Dong et al.), a domain-adaptation neural estimator (Johansson et al.), and methods that **combine randomized and observational data** (cross-design synthesis, Bayesian calibrated risk-adjusted regressions, Kallus et al.'s two-step debiasing, Lu et al.'s comprehensive-cohort estimators).

## Overview

"Double robust methods for generalizability and transportability typically combine outcome and propensity of selection regressions. They are asymptotically unbiased when at least one of these regression functions is consistently estimated, and if both are consistently estimated, asymptotically efficient. However, if neither regression is estimated consistently, the mean squared error may be worse than using a propensity or outcome regression alone. Incorporation of flexible modeling approaches can help mitigate regression misspecification."

Three asymptotically locally efficient double robust approaches exist for randomized data: **TMLE for instrumental variables** (Rudolph and van der Laan 2017), **A-IPPW** (Dahabreh et al. 2018, 2019a), and an **augmented calibration weighting estimator** that can use target outcomes (Dong et al. 2020).

## Main Content

### 5.3.1 One study

> [!definition] TMLE for transportability in an encouragement design (Rudolph and van der Laan 2017)
> A semiparametric substitution estimator developed for transportability with instrumental variables, used for generalizability by Schmid et al. (2020). Three PATE estimators: intent-to-treat, complier, as-treated. Steps: (1) obtain an initial estimate from an outcome regression; (2) bias-reduction step: adjust via a **fluctuation function** using a "clever covariate" $C$ derived from the efficient influence curve and incorporating selection-propensity information. For the intent-to-treat PATE the fluctuation takes the form $\text{logit}\big(\hat E(Y\mid S=1,A,Z,X)\big)+C$ with
> $$
> C=\frac{\mathbb I(S=1,A=a)}{P(A=a\mid S=1,X)\,P(S=1)}\cdot\frac{P(Z=z\mid S=0,A=a,X)\,P(X\mid S=0)}{P(Z=z\mid S=1,A=a,X)\,P(X\mid S=1)}
> $$
> where $Z$ is the intervention actually taken and $A$ the assigned intervention. (As printed in the review; in TMLE practice the clever covariate enters with a fitted coefficient $\epsilon$.) Outcome and propensity regressions can be fit flexibly, e.g. with ensemble machine learning. Variances come from the influence curve.
^def-tmle-transport

> [!definition] Augmented IPPW (A-IPPW; Dahabreh et al. 2018, 2019a,c)
> Estimating-equation based, with $w_i$ as in IPPW ([[Degtiar 2023 - Weighting and Matching Methods]]). Three double robust estimators: A-IPPW, A-IPPW with normalized weights summing to 1 (ensuring bounded estimates), and a weighted outcome regression using participation weights. Non-normalized forms, with $\hat m_a(X_i)=\hat E(Y_i\mid S_i=1,A_i=a,X_i)$:
> $$
> \text{generalizability:}\quad\frac1n\sum_{i=1}^n\Big\{w_i\big(Y_i-\hat m_a(X_i)\big)+\hat m_a(X_i)\Big\}
> $$
> $$
> \text{transportability:}\quad\frac1n\sum_{i=1}^N\Big\{w_i\big(Y_i-\hat m_a(X_i)\big)+\big(1-\mathbb I(S_i=1)\big)\hat m_a(X_i)\Big\}.
> $$
> Developed for generalizing to all trial-eligible individuals (Dahabreh et al. 2019a,c) and for transporting to trial-eligible individuals *not* in the trial (Dahabreh et al. 2018).
^def-aippw

Structure of A-IPPW: the outcome-regression prediction $\hat m_a$ supplies the main estimate; the weighted residual $w_i(Y_i-\hat m_a)$ corrects it. If $\hat m_a$ is right the residual term has mean zero regardless of weights; if the weights are right the residual term repairs a misspecified $\hat m_a$.

Inference and caveats: variance by empirical sandwich estimates or nonparametric bootstrap. Because the estimators are partial M-estimators, they can produce estimates **outside bounds** if the outcome regression is poorly chosen, and may have multiple solutions. Other double robust estimators resemble IPPW with sampling weights from non-propensity approaches (Josey et al. 2020a,b; Dong et al. 2020). The Dong et al. semiparametric efficient augmented weighting estimator calibrates the RCT covariate distribution to match the sampling-weighted target sample.

**Domain adaptation.** A reweighted outcome-regression method for observational data that does *not* claim double robustness draws on unsupervised domain adaptation: predict for a target domain when outcomes are observed only in a source domain. Johansson et al. (2018): a regularized neural network for PCATE that jointly learns representations and a reweighting function. Representation learning balances study/target covariate distributions and treated/control distributions in representation space; results are reweighted to minimize an upper bound on the expected loss under the target covariate distribution. Also: propensity-score reweighted likelihoods for calibrating control outcomes from prior studies (Nie et al. 2013); reweighted outcome regression to the target (Flores and Mitnik 2013).

### 5.3.2 Multiple studies, especially RCT plus observational data

Goal: retain the **internal validity of randomized data** and the **external validity of target-sample observational data**. These methods rely broadly on the assumption that the relationship between unmeasured confounders and potential outcomes is the same in the RCT as in the target sample, weaker than the no-unmeasured-confounding assumption of most earlier methods.

| Method | Data | Key assumption / property | Weakness |
|---|---|---|---|
| Multi-RCT extension of A-IPPW (Dahabreh et al. 2019d) | individual-level data from several RCTs | extends A-IPPW, IPPW and outcome regression to multiple studies | |
| **Cross-design synthesis** (Begg 1992; Greenhouse et al. 2017; Kaizar 2011) | RCT (summary level OK if outcomes by subgroup) and observational | known differences in effect modifiers (e.g. eligibility criteria); estimates effects for patients excluded from the RCT; effectively assumes a **constant amount of unmeasured confounding** across RCT-eligible and ineligible patients | few strata of modifiers; simulations: smaller bias than RCT or observational data alone under common scenarios and better coverage via smaller bias and larger variance (Kaizar 2011) |
| **Bayesian calibrated risk-adjusted regressions** (Varadhan, Henderson and Weiss 2016; Henderson et al. 2017) | individual-level RCT and observational | parametric; outcome regressions plus calibration by selection propensity; target and RCT assumed represented by (possibly different) subsets of the observational data; performs well with poor RCT-target overlap | needs observational data with substantial modifier overlap with both target and RCT; robust variance or bootstrap |
| **Two-step debiasing** (Kallus, Puli and Shalit 2018) | observational target, RCT | step 1: arm-specific outcome regression (or flexible regression) on observational data; step 2: standardize observational data to the RCT population, then debias by adding a correction term (may depend on covariates) estimated from RCT data; consistent for PCATE | assumes calibrating internal-validity bias in the overlap region calibrates the whole target; may not reduce bias if the covariate distribution is highly imbalanced (average biases differ between overlapping and nonoverlapping subsets) |
| **Comprehensive cohort designs** (Lu et al. 2019) | RCT plus a parallel observational cohort of patients who decline randomization | assumes **no unmeasured confounding** in the observational data; semiparametric doubly robust estimators with flexible regression | |
| Propensity strata with both data types (Rosenman et al. 2018, 2020) | randomized and observational | handles positivity-of-treatment violations in the target; 2020 extension adjusts for unmeasured confounding | |

## Examples

> [!example] Why "double" robustness matters: wrong outcome model, right weights
> On the geo-test toy the true effect is $\tau(x)=1+0.8x$, PATE $0.6$. If the outcome model omits the treatment-by-$x$ interaction, a pure outcome-regression estimate is $0$ (it cannot represent heterogeneity). The A-IPPW transportability estimator with the same wrong outcome model but correct participation weights recovers $0.604$ on average over 200 replications (sd $0.12$). With a correct outcome model it gives $0.597$ (sd $0.113$), lower variance than IPPW ($0.189$) and slightly higher than outcome regression ($0.068$) when that model is right. Full results table: [[Degtiar 2023 - Marketing Application Transporting Experiment Results]].
> ```python
> def aippw(a, ma):                     # transportability form, odds weights w = (1-pi_s)/pi_s/pi_a
>     m = (A == a); w = (1 - pis[m]) / pis[m] / 0.5
>     return ((w * (Y[m] - ma(xs[m]))).sum() + ma(xt).sum()) / len(xt)
> pate_hat = aippw(1, m1) - aippw(0, m0)
> ```

> [!example] Marketing reading: combining geo experiments with observational panels
> Cross-design logic maps onto "geo experiment + always-on observational MMM data": the experiment protects internal validity for the test markets; observational data cover the rollout markets but are confounded by targeting. The review's assumption (the confounding structure is the same in the experimental and the target-sample data) is exactly the kind of assumption an MMM user would have to defend before using a geo-test result to *calibrate* an observational model for other markets. See [[Bayesian Estimation and Priors for MMM]] for how calibration priors enter MMM.

## Connections

- Efficient-influence-function style estimators and double robustness in a related setting: [[Doubly-Robust Estimands for ATT(g,t)]].
- Combining experimental and observational designs in the data-fusion framework: [[Bareinboim 2016 - Transportability and Data Fusion]].
- Instrumental-variable TMLE background: [[Instrumental Variables]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
