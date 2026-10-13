---
title: "Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§3 intro p.4; Table 2 p.4; §3.1 Aims pp.4-5; §3.2 Data-generating mechanisms pp.5-6; §3.3 Estimands and other targets pp.6-7 (Table 3 p.7); §3.4 Methods pp.7-8; §3.5 Performance measures p.8 (overview only); §6.1 p.19 (rationale for the ordering). arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - Motivation and Review of Simulation Practice]]"
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
  - "[[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]]"
aliases:
  - ADEMP framework
  - Simulation study design
  - Data-generating mechanism (simulation study)
  - Targets of a simulation study
  - Proof-of-concept vs stretch-or-break simulation
---

# Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods

> [!summary]
> **ADEMP** — **A**ims, **D**ata-generating mechanisms, **E**stimands (or other targets), **M**ethods, **P**erformance measures — is the planning and reporting skeleton of Morris, White & Crowther (2019, §3). This note gives the full content of the first four elements: the four frequentist properties that aims are framed around; parametric vs resampling DGMs, factorial vs one-at-a-time designs and three fallbacks when full factorial is too costly; Senn's **four DGM pitfalls**; the **targets table** (estimand, null hypothesis, model, prediction, design); the marginal-vs-conditional estimand trap; and how to define a "method" when models fail to converge. The fifth element, performance measures, has its own note: [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]].
^summary-ademp-planning

## Overview

The point of a structured plan is the same as a trial protocol: decisions are made, and justified, before results are seen. The authors note that "If the simulation study has been planned and written out before it is executed, the methods section is largely written" (§6.1, p.19), and that ADEMP's ordering "is usually the appropriate order to report them in a methods section" (§6.1, p.19).

> [!note] A quirk of the acronym (§3, p.4)
> The paper's §3 introduction expands the acronym in a different order from the letters: "This acronym comes from: Aims, Data-generating mechanisms, Methods, Estimands, Performance measures." The section numbering (3.3 Estimands, 3.4 Methods), Table 1 and the concluding remarks all use the A-D-E-M-P order, and the concluding §8 (p.25) lists "aims, data-generating mechanisms, methods, estimands and performance measures" again. The letters and sections are authoritative: **E before M**.
^note-quirk-acronym

### Notation (Table 2, p.4)

> [!definition] Table 2: Notation for simulation studies (p.4)
> | Symbol | Meaning |
> |---|---|
> | $\theta$ | An estimand (conceptually); also the true value of the estimand |
> | $n_{\text{obs}}$ | Sample size of one simulated dataset |
> | $n_{\text{sim}}$ | Number of repetitions — the *simulation sample size* |
> | $i=1,\dots,n_{\text{sim}}$ | Indexes repetitions |
> | $\hat\theta$ | The estimator of $\theta$ |
> | $\hat\theta_i$ | The estimate of $\theta$ from the $i$th repetition |
> | $\bar\theta$ | The mean of $\hat\theta_i$ across repetitions |
> | $\text{Var}(\hat\theta)$ | The true variance of $\hat\theta$, which can be estimated with large $n_{\text{sim}}$ |
> | $\widehat{\text{Var}}(\hat\theta_i)$ | An estimate of $\text{Var}(\hat\theta)$ from the $i$th repetition |
> | $\alpha$ | The nominal significance level |
> | $p_i$ | The $p$-value returned by the $i$th repetition |
^def-notation

## Main Content

### A — Aims (§3.1, pp.4-5)

> [!definition] Desirable frequentist properties of an estimator (§3.1, p.4)
> 1. **Consistency:** as $n\to\infty$, $\hat\theta\to\theta$. Finite-sample **unbiasedness** $E(\hat\theta)=\theta$ is also desirable, "though arguably less important since unbiasedness is not an invariant property." Some estimators are consistent but biased in small samples (logistic regression, for example).
> 2. **Valid variance estimation:** $\widehat{\text{Var}}(\hat\theta)$ should consistently estimate the sampling variance of $\hat\theta$. The paper's supporting citation ("see for example") is Kenward & Roger (1997) [18], *Small sample inference for fixed effects from restricted maximum likelihood* (Biometrics 53:983-997): the standard case where the naive REML variance of fixed effects is too small in small samples and needs an adjusted estimator plus adjusted degrees of freedom.
> 3. **Coverage:** at least $100(1-\alpha)\%$ of confidence intervals should contain $\theta$.
> 4. **Efficiency:** $\text{Var}(\hat\theta)$ should be as small as possible.
>
> Other properties are combinations. Short average CI length relates to (4) and its validity depends on (1)-(3). MSE combines (1) and (4). Properties can be traded: "small bias may be accepted if there is a substantial reduction in $\text{Var}(\hat\theta)$."
^def-estimator-properties

Typical primary aims (p.5), each with the example study the paper cites:

| Aim | Example cited (§3.1, p.5) |
|---|---|
| Large- or small-sample bias | White (1997) [19] — letter on survival analysis of trials adjusted for treatment switching |
| Precision, particularly relative to other methods | White & Thompson (2005) [20] — adjusting for partially missing baseline measurements in randomised trials |
| Variance estimation | Hughes, Sterne & Tilling (2014) [21] — comparison of imputation variance estimators |
| Robustness to misspecification | Morris, White & Royston (2014) [22] — tuning multiple imputation by predictive mean matching and local residual draws |

> [!definition] Proof-of-concept vs stretch-or-break studies (§3.1, p.5)
> - **Proof-of-concept:** show that a method is viable (or fallible) in some settings.
> - **Stretch or break:** identify the settings where the method may fail — possibly with "unrealistically extreme data-generating mechanisms to understand when and how each method fails." The cited example is again Morris, White & Royston (2014) [22], used when two competing methods are equally easy to implement and the choice is unlikely to change results materially.
>
> For **head-to-head** comparisons of methods designed for slightly different problems, two framings: when one method is correct, "How badly do others fail?"; when all are wrong in some way, "Which is most robust?" (p.5).
^def-poc-vs-break

The difficult part of realistic comparisons (p.5): "Does the data-generating mechanism favour certain methods over others? How can this be checked and justified?" Motivating data is the usual justification, but without "a broad spectrum of such motivating data, there is a risk of failing to convince readers that a method is fit for general use."

### D — Data-generating mechanisms (§3.2, pp.5-6)

> [!definition] Data-generating mechanism (DGM) (§3.2, p.5)
> "We use the term 'data-generating mechanism' to denote how random numbers are used to generate a dataset." It is preferred to *data-generating model*, which implies a parametric model and so names only one class of mechanism.
>
> **Out of scope:** "It is not the purpose of this article to explain how specific types of data should be generated." For methods to simulate from specific distributions the paper points to two books: Ripley (1987) [6], *Stochastic Simulation* (Wiley), and Morgan (1995) [9], *Elements of Simulation* (Chapman & Hall/CRC) (§3.2, p.5). For complex survival data specifically, the authors' own reference is Crowther & Lambert (2013) [14] (see [[Morris et al 2019 - Motivation and Review of Simulation Practice#^ref-background-literature|background literature]]).
>
> Two families:
> - **Parametric draws from a known model** — can explore many DGMs, including deliberately unrealistic ones.
> - **Resampling with replacement from a specific dataset** — the true DGM is unknown; resamples study the sampling distribution. Typically explores only one mechanism, but one relevant to the study at hand.
^def-dgm

"In planning a simulation study, it is usual to spend more time deciding on data-generating mechanisms than any other element of ADEMP" (p.5). DGMs may be simple, realistic, or "completely unrealistic" to break a method. Several DGMs are usual; sample size $n_{\text{obs}}$ is the most commonly varied factor because "performance often varies over $n_{\text{obs}}$" (p.5).

**Factorial design (p.5).** Commonly varied factors: $n_{\text{obs}}$ and true parameter values (e.g. zero vs non-zero). "Varying these factorially is likely to be more informative than one-by-one away from a 'base-case' data-generating mechanism, as doing so permits the exploration of interactions between factors." The two obstacles are presentation and computing time. If only presentation is the problem, run the full factorial anyway and, if results are consistent with no interaction, present one-factor-at-a-time from a base case.

> [!algorithm] Three fallbacks when a full factorial design is computationally infeasible (§3.2, pp.5-6)
> 1. **Interactions only where main effects exist.** If performance is acceptable and does not vary with factor A, it is unlikely that the chosen DGM happened to hide poor performance elsewhere.
> 2. **Predict and check** (analogous to external validation). Two factors, $A\in\{1,\dots,8\}$, $B\in\{1,\dots,5\}$, base case $A=1,B=1$.
>    1. Vary A from 1 to 8 holding $B=1$; vary B from 1 to 5 holding $A=1$.
>    2. Predict performance at an unexplored corner, e.g. $A=8,B=5$ — qualitatively ("bias increases as A increases and as B increases so when we increase both together we would expect even larger bias") or quantitatively (fit a model to existing results and use the marginal effects).
>    3. Run that single DGM and compare prediction with result, "with a responsibility to expore further when predictions are poor or incorrect" (sic).
> 3. **Fractional factorial design** — "a more satisfactory solution" (Skrondal 2000; Grieve 2016).
^alg-nonfactorial-fallbacks

> [!warning] Four DGM pitfalls, credited to Stephen Senn (§3.2, p.6)
> 1. **Resampling's implicit population.** Results from resampling with replacement are "relevant to an infinite population with the exact characteristics of that dataset." E.g. if a trial had a non-significant result, the treatment effect is still *non-zero* in the implicit population. Cited: Graves, Barnett, Burn & Cook (2018) [24], *Smaller clinical trials for decision making; using p-values could be costly* (F1000Research 7:1176). *Gloss (not in the paper):* resampling treats the observed sample effect as the population truth, so a "null" scenario cannot be produced by resampling a dataset whose sample effect is not exactly zero.
> 2. **Bayesian vs frequentist logic.** "Repeated simulation with a single parameter value is explicitly frequentist. The fact that $\hat\theta$ is on average equal to $\theta$ does not imply that $\theta$ is on average equal to $\hat\theta$."
> 3. "Failing to distinguish between what the simulator can know and what the estimator can know." Cited: Senn (1994) [25], *Methods for assessing difference between groups in change when initial measurement is subject to intra-individual variation* (Statistics in Medicine 13(21):2280-2285). The paper gives no further explanation or example. *Gloss (not in the paper), based on the cited title:* in a change-from-baseline problem the simulator generates each person's **true** baseline and then a baseline **measured with intra-individual error**. An analysis that conditions on the true baseline (because the simulation code has it) uses information no real analyst has, so its apparent good performance is an artefact. The general rule: every input to a method under test must be something observable in real data.
> 4. **Data-generation tricks with side effects.** To get bivariate data with $R^2=0.3$ in every repetition, one could rescale residuals — but that "would produce unintended side effects for other statistics."
^warn-dgm-pitfalls

Pitfall 2 is exactly the line between this frequentist design (fixed $\theta$, repeated data) and [[Simulation-Based Calibration - Overview|simulation-based calibration]], which draws a new $\theta$ from the prior for every repetition ([[The SBC Algorithm]]). Pitfall 3 is the oracle-information trap: a simulator for marketing data knows latent demand and true carryover, and the method under test must not ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview|AMSS]] separates hidden from observed variables for this reason).

### E — Estimands and other targets (§3.3, pp.6-7)

> [!definition] Estimand and target (§3.3, pp.6-7)
> An **estimand** $\theta$ is a population quantity that methods estimate; usually a parameter of the data-generating model, "but is occasionally some other quantity." With regression parameters $\boldsymbol\beta=(\beta_0,\dots,\beta_c)$, the estimand might be a specific $\beta$, a measure of prognostic ability, the fitted outcome mean, or something else. Choosing well requires understanding "the aims of analysis in practice."
>
> Studies that do not evaluate estimation have other **targets**: a null hypothesis, a selected model, predictions, or — when the method is a design — the design itself. One method can be evaluated against several targets: the best model-selection rule for estimating an exposure coefficient may differ from the best rule for prediction.
^def-estimand-target

> [!definition] Table 3: Possible targets of a simulation study and relevant performance measures (p.7)
> | Statistical task | Target | Example performance measures | Example from Vol. 34 |
> |---|---|---|---|
> | *Analysis:* Estimation | Estimand | Bias, empirical SE, mean-squared error, coverage | Kuss compares existing methods on bias, power and coverage |
> | *Analysis:* Testing | Null hypothesis | Type I error rate, power | Chaurasia & Harel compare new methods on type I and II error rates |
> | *Analysis:* Model selection | Model | Correct model rate; sensitivity or specificity for covariate selection | Wu et al. compare four new methods on "true positive" and "false positive" covariate-selection rates |
> | *Analysis:* Prediction | Prediction/s | Measures of predictive accuracy, calibration, discrimination | Ferrante compares four methods on mean absolute prediction error, etc. |
> | *Design:* Design a study | Selected design | Sample size, expected sample size, power / precision | Zhang compares designs across DGMs on number of significant results ("gain") and frequency of achieving the (near) optimal design |
^tbl-targets

> [!example] Marginal vs conditional estimands (§3.3 p.6; §3.4 p.8)
> In a randomised trial with a binary outcome, compare an **unadjusted** logistic regression with one **adjusted** for a covariate, estimand "the log odds ratio for randomised group." Mean estimates will differ, and "it would be tempting to conclude that at least one of the methods is biased. However, the two methods target different estimands – that is, the true unadjusted and adjusted log odds ratios differ" (non-collapsibility of the odds ratio).
>
> Two fixes:
> 1. **Same estimand by post-processing:** standardise the adjusted model to estimate the *marginal* odds ratio, the unadjusted analysis's estimand. This presumes that adjustment vs non-adjustment is the comparison of interest and that the conditional estimand is "a nuisance part of standard adjustment."
> 2. **Coarser: target the null hypothesis.** Because the setting is randomised, the null "odds ratio equals 1" is the same whether conditional or marginal.
^ex-marginal-conditional

The same issue appears with average vs conditional causal effects ([[Causal Estimands]]; [[Estimands in Longitudinal Research]]).

### M — Methods (§3.4, pp.7-8)

> [!definition] What counts as a "method" (§3.4, p.7)
> "The term 'method' is generic. Most often it refers to a model for analysis, but might refer to a design or some procedure (such as a decision rule)." Examples: Kahan (2013) [31] (bias in randomised factorial trials) and Campbell & Dean (2014) [32] (consequences of proportional-hazards-based model selection) evaluated procedures that chose an analysis based on a preliminary test in the same data.
^def-method

**Including serious contenders (pp.7-8).** Two issues:
1. **Knowledge of previous work.** Methods already shown to be flawed can be excluded to avoid repetition and "bloating of results" — *unless* they are used frequently in practice, e.g. last observation carried forward for incomplete longitudinal data, or the "3 + 3" dose-escalation design.
2. **Code.** Some new methods are published but not implemented in any software (examples cited: Robins & Wang 2000 [33], inference for imputation estimators; Reiter 2008 [34], multiple imputation when imputation records are not used for analysis), implemented poorly, or implemented in unfamiliar software. "For methods that have not been implemented, it is hard to argue that they should be included." R and Stata dominate user-written methods. "Note that one important role of simulation is to verify that code is correct" (p.8).

Methods may also be excluded if they do not target the specified estimand (example above).

> [!definition] Non-convergence and the "pure" vs procedural method (§3.4, p.8)
> Non-convergence and related issues such as perfect prediction ("separation") create "a conceptual issue with defining a method."
> - A **pure** evaluation assesses a model only when it converges.
> - A **procedural** evaluation scores what an analyst would actually do: "an analyst whose model fails to converge would not give up but explore other models until one converges." Crowther, Look & Riley evaluated such a procedure — if a model failed to converge, refit with more quadrature points.
>
> The choice changes what the missing-estimates rate means; see [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^def-missing-estimates|§5.1]].
^def-pure-vs-procedure

### P — Performance measures (§3.5, p.8): overview

A **performance measure** is "a numerical quantity used to assess the performance of a method"; "operating characteristic" is an equivalent term, especially for designs. Methods may output $\hat\theta_i$, $\widehat{\text{Var}}(\hat\theta_i)$ or $\widehat{\text{SE}}(\hat\theta_i)$, degrees of freedom, CIs, test statistics and more. For an estimand: bias first, then precision and coverage; for a null hypothesis: power and type I error. Clear names matter — a "mean error" whose formula was mean absolute error is the paper's cautionary example. The crucial point (p.9): "simulation studies are empirical experiments, meaning performance measures are themselves estimated, and estimates of performance are thus subject to error." Hence Monte Carlo SEs and a reasoned $n_{\text{sim}}$. Full formulas: [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]].

## Examples

> [!example] ADEMP filled in for the paper's own example (§7.1, p.20)
> - **A:** impact of misspecifying the baseline hazard; of fitting too complex a model; of avoiding the issue with a semiparametric model.
> - **D:** $n_{\text{obs}}=500$, $X_i\sim\text{Bern}(0.5)$, Weibull baseline hazard with $\gamma\in\{1,1.5\}$.
> - **E:** log hazard ratio $\theta=-0.5$.
> - **M:** exponential, Weibull and Cox PH models.
> - **P:** convergence, bias, coverage, empirical and model SE.
>
> Full detail: [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]].
^ex-ademp-filled-paper-own

## Connections

- The Bayesian-workflow counterpart is [[Designing Simulated-Data Experiments]], which likewise argues against a blind grid search and for aims-driven sequences of simulated experiments; [[Simulating an Underlying Process, Data Collection, and Inference]] is its DGM-building analogue.
- Treating the analyst's fallback rules as part of the method is the simulation-study version of [[Researcher Degrees of Freedom]] and the [[Garden of Forking Paths]].
- Model selection and prediction targets connect to [[Model Selection and Overfitting]] and [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].
- Factorial design of DGMs uses the same principles as [[Power Analysis and Sample Size]] and experimental design generally.

## See Also

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — ADEMP for an MMM / driver-analysis pipeline
- [[Nuisance Parameter Bias Simulation]] — a small simulation study already in the vault
