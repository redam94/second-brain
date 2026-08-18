---
title: "Simulating an Underlying Process, Data Collection, and Inference"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - topic/causal-inference
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 6.4-6.5, pp. 112-114 (Figures 6.4, 6.5, 6.6)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Simulation to Express Uncertainty]]"
used_by:
  - "[[Causal Inference as Generalization]]"
  - "[[Simulated-Data Experimentation as Virtual Replication]]"
  - "[[Simulation-Based Calibration - Overview]]"
aliases:
  - "Midterm and final exam simulation"
  - "Unbalanced treatment assignment simulation"
  - "Functional form sensitivity"
---

# Simulating an Underlying Process, Data Collection, and Inference

> [!summary]
> An extended simulation study in which the *design* varies, not just the parameters. Four scenarios
> crossing **balanced vs. unbalanced treatment assignment** with **linear vs. nonlinear** response
> reveal the key asymmetry of covariate adjustment: **with balanced assignment, a misspecified linear
> adjustment still recovers the effect (10.5 ± 0.8 against a truth of 10); with unbalanced assignment,
> the same misspecification biases it badly (7.3 ± 0.9).** Randomization buys robustness to functional
> form, not just to confounding.

## Overview

> [!important] The purpose
> "**A good way to understand a model is to fit it to data simulated from different scenarios. These
> scenarios serve as experiments that help us learn how inferences depend upon the data-generating
> process and the model structure.**"

> [!example] The simple version — robustness of linear regression to distributional form
> "Specify data $x_i$, $i=1,\dots,n$; draw coefficients $a$ and $b$ and a residual standard deviation
> $\sigma$ **from our prior distribution**; simulate $y_i \sim \text{normal}(a+bx_i,\sigma)$; and fit the
> model. **Repeat this 1000 times and we can check the coverage of interval estimates: that's a version
> of simulation-based calibration checking.**"
>
> **Then break it deliberately:** "fit the same model but simulate data using different assumptions, for
> example drawing independent data points $y_i$ from the **$t_4$ distribution** rather than the normal.
> **This will then fail simulation-based calibration checking — the wrong model is being fit — but the
> interesting question here is, how bad will these inferences be?**" One could examine coverage of
> posterior 50% and 95% intervals for the coefficients.
>
> Note the framing: SBC failure is the *starting point* of the interesting question, not the end of it.
> See [[Simulation-Based Calibration - Overview]].

## Main Content

### The exam-score study: four scenarios

> [!definition] The data-generating process (Ch. 6.4, pp. 112-113)
> 500 students take a midterm and a final exam.
> 1. Draw true abilities $\eta_i \sim \text{normal}(50, 20)$.
> 2. Draw the two exam scores independently: $x_i, y_i \sim \text{normal}(\eta_i, 10)$.
>
> This induces a correlation between the two scores of
> $$\frac{20^2}{20^2 + 10^2} = 0.8$$
> "**we designed the simulation with this high value to make patterns apparent in the graphs.**"
>
> **The hypothetical intervention:** a treatment performed after the midterm that **adds exactly 10
> points** to any student's final exam score. The true effect is 10 by construction.
^def-exam-simulation

> [!example] Scenario 1 — Balanced assignment, linear response (Figure 6.4b)
> Each student has an equal chance of treatment or control.
>
> | Estimator | Estimate | Comment |
> |---|---|---|
> | **Difference in group means** | $10.7 \pm 1.8$ | unbiased, but noisy |
> | **Regression adjusting for midterm score** | $9.7 \pm 0.6$ | **three times more precise** |
>
> Both are fine. Adjustment buys **efficiency**, as predicted by principle 2 of
> [[Generative and Partially Generative Models#Choosing predictors]]: a variable that influences the
> outcome but shares no causes with the treatment improves precision without being needed for
> identification.

> [!example] Scenario 2 — Unbalanced assignment, linear response (Figure 6.5)
> The probability of treatment now depends on the midterm score:
> $$\Pr(z=1) = \text{logit}^{-1}\!\left(\frac{x - 50}{10}\right)$$
> so **the treatment is preferentially given to the less well-performing students.**
>
> "The underlying regression lines are the same as before, **as this simulation changes the distribution
> of $z$ but not the model for $y|x,z$.**"
>
> | Estimator | Estimate | Comment |
> |---|---|---|
> | **Difference in group means** | $\mathbf{-13.8 \pm 1.5}$ | "**a terrible inference given that the true effect is, by construction, 10**" — wrong *sign*, and confidently so |
> | **Linear regression adjusting for $x$** | $9.7 \pm 0.8$ | **recovers the effect** |
>
> Adjustment is now doing identification work, not efficiency work. Note that the naive estimate is not
> merely biased — its interval excludes the truth by more than 15 standard errors.

> [!example] Scenarios 3 and 4 — the nonlinear response (Figure 6.6)
> "**But this new estimate is sensitive to the functional form of the adjustment for $x$.**"
>
> The alternative data-generating model keeps the true treatment effect at 10 but makes
> $E(y|x,z)$ **non-linear**: the midterm score is still drawn as $\text{normal}(\eta_i, 10)$, but the
> **final exam score is transformed.**
>
> | Design | Linear-adjustment estimate | Verdict |
> |---|---|---|
> | **Balanced** (Fig. 6.6a) | $10.5 \pm 0.8$ | "**reasonable**" |
> | **Unbalanced** (Fig. 6.6b) | $\mathbf{7.3 \pm 0.9}$ | biased low; interval excludes 10 |
>
> **The explanation, and the key result of the section:**
> > "Even though the linear model is wrong and thus the resulting estimate is not fully statistically
> > efficient, **the balance in the design ensures that on average the specification errors will
> > cancel**, and the estimate is $10.5 \pm 0.8$. **But the unbalanced design has problems: even after
> > adjusting for $x$ in the linear regression, the estimate is $7.3 \pm 0.9$.**"
>
> **Randomization protects against functional-form misspecification; adjustment alone does not.** With
> balance, the specification error is symmetric across treatment groups and cancels in the difference.
> With imbalance, treated and control units occupy different regions of $x$-space, so the misfit does
> not cancel — the linear adjustment extrapolates the wrong curve across the gap.
^ex-functional-form

### The general lesson

> [!important] What this example is doing in this book (Ch. 6.4, p. 114)
> "**The point of this example is to demonstrate how simulation of a statistical system under different
> conditions can give us insight, not just about computational issues but also about data and inference
> more generally.**
>
> One could go further in this particular example by considering **varying treatment effects, selection
> on unobservables, and other complications. Such theoretical explorations can be considered indefinitely
> to address whatever concerns might arise.**"

Note what varied across the four scenarios: **not the parameters, but the design and the true
functional form.** This is a different axis of simulation from
[[Designing Simulated-Data Experiments]], where the model was held fixed and parameter values swept.
Here the *model being fit* is held fixed and the *world* is varied — which is how you learn a method's
domain of validity rather than its precision.

## Examples

> [!example] Exercise 6.1 — the BMJ submissions data (Ch. 6.5, p. 114)
> `BMJSubmissions.csv` contains data from a 2019 publication on papers submitted to the *British Medical
> Journal*: local time of submission, year of submission, country of corresponding author, and a
> country ID index variable. The exercise set uses these data for simulation-based exploration.

## Connections

- The balanced/unbalanced contrast is the simulation-based version of the identification arguments in
  [[Potential Outcomes Framework]] and [[Frequentist Causal Estimation]] — here demonstrated rather than
  proved.
- Scenario 4's failure is exactly why [[Causal Inference as Generalization]] insists that causal
  estimands be framed as *predictions under a specified population*, which makes the extrapolation
  visible.
- The "vary the world, not the parameters" design is generalized in
  [[Simulated-Data Experimentation as Virtual Replication]] (§10.5).

## See Also
- [[Designing Simulated-Data Experiments]] — the parameter-sweep counterpart
- [[Simulation-Based Calibration - Overview]] — the formalized version of the coverage check described here
- [[Poststratification]] — adjusting for imbalance when generalizing rather than estimating
- [[Metalearners for CATE]] — modern methods for the varying-treatment-effect extension flagged at the end
