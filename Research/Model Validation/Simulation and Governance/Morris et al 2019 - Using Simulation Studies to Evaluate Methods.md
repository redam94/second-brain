---
title: "Morris et al 2019 - Using Simulation Studies to Evaluate Methods"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation-studies
  - type/definition
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Statistics in Medicine 38(11), 2074–2102; quotes checked against arXiv:1712.03198v3, pp. 1, 2, 12"
citation: "Morris, T. P., White, I. R. & Crowther, M. J. (2019). Using simulation studies to evaluate statistical methods. Statistics in Medicine, 38(11), 2074–2102."
date_ingested: 2026-10-13
folder: "Model Validation/Simulation and Governance"
doc_type: paper
depends_on:
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]]"
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[SR 11-7 - Supervisory Guidance on Model Risk Management]]"
  - "[[NIST AI RMF 1.0 - AI Risk Management Framework]]"
aliases:
  - "Morris White Crowther 2019"
  - "Using simulation studies to evaluate statistical methods"
  - "ADEMP"
---

# Morris et al 2019 - Using Simulation Studies to Evaluate Methods

> [!summary]
> Morris, White & Crowther give a structured tutorial on planning, running, analysing and reporting simulation studies, organised around the **ADEMP** framework (Aims, Data-generating mechanisms, Estimands, Methods, Performance measures), with formulas for performance measures and their Monte Carlo standard errors. Because simulated data come with known truth, simulation is the standard way to check whether a modelling pipeline recovers what it claims to — the natural validation step for any model whose real-world outputs cannot be checked directly.

## Overview

**Citation:** Morris, T. P., White, I. R. & Crowther, M. J. (2019). *Statistics in Medicine* 38(11), 2074–2102 (arXiv:1712.03198).

**Motivation:** Simulation studies are ubiquitous in methodological research but often poorly planned and reported — the number of repetitions is not justified, Monte Carlo uncertainty is ignored, and data-generating mechanisms are not described well enough to reproduce. The authors, from the MRC Clinical Trials Unit, review practice in a sample of published simulation studies and set out a rigorous, reproducible workflow.

## Main Content

> [!definition] ADEMP: the structure of a simulation study
> - **A — Aims:** what question the study answers (e.g. is the estimator unbiased? does it keep nominal coverage when assumptions fail? which of several methods is most accurate?).
> - **D — Data-generating mechanisms:** how datasets are simulated, including which factors are varied (sample size, effect size, correlation, misspecification) and whether factors are varied fully factorially or one at a time.
> - **E — Estimands:** the targets of inference (true parameter values or other quantities known from the generating process).
> - **M — Methods:** the analysis methods applied to each simulated dataset, including benchmark methods with known properties.
> - **P — Performance measures:** how the methods' outputs are compared with the estimands.
^def-ademp

> [!definition] Core performance measures and Monte Carlo standard errors
> With $n_{\text{sim}}$ repetitions producing estimates $\hat\theta_i$, model-based standard errors $\widehat{\text{SE}}_i$ and confidence intervals, and true value $\theta$:
>
> | Measure | Estimate | Monte Carlo SE |
> |---|---|---|
> | Bias | $\frac{1}{n_{\text{sim}}}\sum_i \hat\theta_i - \theta$ | $\sqrt{\frac{1}{n_{\text{sim}}(n_{\text{sim}}-1)}\sum_i(\hat\theta_i-\bar\theta)^2}$ |
> | Empirical SE | $\sqrt{\frac{1}{n_{\text{sim}}-1}\sum_i(\hat\theta_i-\bar\theta)^2}$ | $\widehat{\text{EmpSE}}/\sqrt{2(n_{\text{sim}}-1)}$ |
> | Mean squared error | $\frac{1}{n_{\text{sim}}}\sum_i(\hat\theta_i-\theta)^2$ | — (see paper) |
> | Coverage | $\frac{1}{n_{\text{sim}}}\sum_i \mathbf{1}\{\theta\in \text{CI}_i\}$ | $\sqrt{\widehat{\text{Cov}}(1-\widehat{\text{Cov}})/n_{\text{sim}}}$ |
> | Power / type I error | $\frac{1}{n_{\text{sim}}}\sum_i \mathbf{1}\{p_i\le\alpha\}$ | $\sqrt{\widehat{\text{Pow}}(1-\widehat{\text{Pow}})/n_{\text{sim}}}$ |
>
> Other measures include relative error in the model-based SE (average $\widehat{\text{SE}}_i$ vs empirical SE) and **bias-eliminated coverage**, which separates under-coverage caused by bias from under-coverage caused by too-narrow intervals.
^def-simulation-performance-measures

> [!theorem] Choosing the number of repetitions
> Because each Monte Carlo SE above scales as $1/\sqrt{n_{\text{sim}}}$, the required number of repetitions for a target Monte Carlo SE follows by inversion. For coverage with expected value $C$:
> $$ n_{\text{sim}} = \frac{C(1-C)}{(\text{MCSE}_{\text{target}})^2}, $$
> e.g. $C=0.95$ and a desired MCSE of 0.5 percentage points gives $n_{\text{sim}} = 0.95\times 0.05/0.005^2 = 1900$. For bias, $n_{\text{sim}} = \operatorname{Var}(\hat\theta)/(\text{MCSE}_{\text{target}})^2$, using a pilot estimate of $\operatorname{Var}(\hat\theta)$.
^thm-nsim

### Practical recommendations

- Plan with ADEMP before coding; write a protocol.
- Set the random-number seed once and store the RNG state for each repetition so failures can be reproduced.
- Store the estimates from each repetition (not only summaries), and check them graphically before computing performance measures — outliers and non-convergence must be handled and reported explicitly.
- **Report Monte Carlo SEs** for every performance measure.
- Include methods with known properties as checks that the simulation itself works.
- Vary data-generating factors that matter for the method's assumptions, including settings where those assumptions are wrong.

## Key Passages

> "A key strength of simulation studies is the ability to understand the behaviour of statistical methods because some 'truth' (usually some parameter/s of interest) is known from the process of generating the data." — Morris, White & Crowther (2019), p. 1

> "Simulation studies come into their own when methods make wrong assumptions or data are messy because they can assess the resilience of methods in such situations." — Morris et al. (2019), p. 2

> "One design implication is that methods with known properties should be included where possible as a check that these properties are exhibited." — Morris et al. (2019), p. 12

## Implications for Model Validation

- **Use ADEMP as a validation protocol** for a modelling pipeline: state the aim (e.g. "do importance rankings recover the true drivers?"), simulate data resembling the real setting (same number of weeks per segment, realistic autocorrelation and collinearity), define estimands (true effects, true driver ranking), run the full pipeline including automated model search, and score it.
- **Simulate the whole pipeline, not just the final model.** If the production process picks the best of many models, the simulation must too; otherwise it will miss the optimism created by selection ([[Simmons et al 2011 - False-Positive Psychology]], [[Riley et al 2020 - Sample Size for Prediction Models]]).
- **Include null scenarios.** Data with no true effect test the false-positive rate — e.g. whether unrelated trending series are ranked as important ([[Granger and Newbold 1974 - Spurious Regressions]]).
- **Report Monte Carlo error** so differences between methods are not over-read.
- **Stress-test assumptions** (confounding, nonstationarity, small samples) — this is where simulation is most informative.

## Connections

- Marketing-specific simulator for this purpose: [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]].
- Recommended use in MMM vendor evaluation: [[Chan and Perry 2017 - Challenges in Media Mix Modeling]].
- Bayesian-computation analogue: [[Simulation-Based Calibration - Overview]].
- Governance frameworks that require such testing: [[SR 11-7 - Supervisory Guidance on Model Risk Management]] (outcomes analysis, benchmarking) and [[NIST AI RMF 1.0 - AI Risk Management Framework]] (Measure function).
- Simulation of importance-measure bias: [[Strobl et al 2007 - Bias in Random Forest Variable Importance]].

## See Also

- [[Simulation-Based Calibration - Overview]] — checking Bayesian inference with simulated truth
- [[Bayesian Workflow - Overview]] — fake-data simulation as part of a modelling workflow
- [[Power Analysis and Sample Size]] — power as a simulation performance measure
- [[Metalearner Simulation Results]] — an example simulation comparison in the vault
- [[Model Checking]] — complementary checks on real data
