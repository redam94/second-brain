---
title: "Influence of Likelihood and Prior"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/priorsense
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 8.5-8.6, pp. 150-156 (Figures 8.11-8.13)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Tail Behavior and Prior-Likelihood Conflict]]"
  - "[[Prior Distributions]]"
  - "[[Influence of Individual Data Points]]"
used_by:
  - "[[Prior Specification for Regression Models - Sleep Study]]"
  - "[[Models for Regression Coefficients - Student Grades]]"
  - "[[Topology of Models]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
aliases:
  - "Power scaling"
  - "priorsense"
  - "Prior sensitivity analysis"
  - "Static sensitivity analysis"
  - "Bayesian R2 prior"
---

# Influence of Likelihood and Prior

> [!summary]
> Sensitivity analysis without refitting. **Power scaling** (Kallioinen et al. 2024) raises the prior or
> likelihood to the power $\alpha$ and reweights the existing draws by importance sampling, which
> "**allows likelihood and prior sensitivity analysis without the need to define explicit
> alternatives.**" The diagnostic logic is a $2\times2$: sensitivity **to both** means prior-likelihood
> conflict; **to neither** means the data dominate. The section closes with the strongest statement in
> the book of the high-dimensional prior problem: **weak independent priors on 26 regression coefficients
> combine into a strong prior favoring high $R^2$.**

## Overview

> [!important] Why assess the whole prior and likelihood, not just data points (Ch. 8.5, p. 150)
> "**There are also good reasons to assess the influence of the whole likelihood and the components of the
> prior distribution. These assessments are sometimes considered parts of sensitivity analysis, which is a
> broader set of assessments including comparisons of different data models.**
>
> **The most direct way to understand the influence of priors is to run sensitivity analysis by refitting
> the model with multiple priors. If the posterior is sensitive to the changes in the prior, this can be
> either due to prior-likelihood conflict or weakly informative likelihood. Thus, it is useful to consider
> likelihood and prior sensitivity analysis at the same time.**"
>
> The same applies to other model choices, "including the data model."

> [!warning] Multiverse analysis, with a limit
> "Comparing the inference results for different prior and model assumptions can be considered a form of
> **multiverse analysis. However we generally advise against fitting all possible combinations of
> predictors, since many model specifications will be nonsensical. Restricting ourselves to models
> compatible with our background knowledge saves on computation and produces more intelligible
> results.**"
>
> Tooling: the R package **`multiverse`** (Sarma, Kale, et al. 2023) — see
> [[Computational Tools and Probabilistic Programming]].

## Main Content

### Power scaling

> [!definition] Power-scaling sensitivity analysis (Kallioinen et al. 2024)
> "Kallioinen et al. (2024) propose an approach in which **sensitivity is studied by analyzing how the
> posterior changes if the likelihood or prior is exponentiated to the power $\alpha$, that is, power
> scaled. This allows likelihood and prior sensitivity analysis without the need to define explicit
> alternatives.**"
>
> - $\alpha > 1$ → **tighter** prior (or stronger likelihood) than the one used;
> - $\alpha < 1$ → **wider** prior (or weaker likelihood).
>
> **How it stays cheap:** "**Importance sampling can be used to approximate the posterior of the new model
> by reweighting posterior draws from the old model, provided the two posteriors are similar enough to be
> bridged by importance sampling**" (Paananen et al. 2021; McCartan 2022; Kallioinen et al. 2024; Vehtari,
> Simpson, et al. 2024).
>
> **And when they aren't:** "**And if they are not, this is also valuable information in itself.**"
>
> The reliability is monitored by the **Pareto $\hat{k}$**: "**The estimated Pareto $k$ values indicate how
> much we can trust the importance sampling approximation used in the prior sensitivity analysis, with
> $\hat{k} < 0.7$ considered trustworthy.**"
^def-power-scaling

Alternative tooling: the R package **`Adjustr`** (McCartan 2022) "defines different priors to be tested
and compared."

> [!example] Weakly informative vs. narrow prior (Figure 8.11, Ch. 8.5, p. 151)
> A linear regression (the sleep study of Ch. 17), showing the posteriors of `b_Days`, `b_Intercept`, and
> `sigma` under $\alpha \in \{0.8,\, 1,\, 1.25\}$:
>
> | Prior used in the model | Behavior under power scaling |
> |---|---|---|
> | **Weakly informative** (top row) | "the posterior is **essentially the same** with different $\alpha$ values" |
> | **Narrow** (bottom row) | "the posterior is **sensitive to relatively small changes in the prior**" |
>
> The visual signature is unmistakable: three overlapping densities versus three shifted ones.

> [!important] The diagnostic logic
> "**If the posterior inference for [the] quantity of interest is sensitive to both likelihood and prior,
> there is prior-likelihood conflict, which can [be] due to a bad prior. But sometimes new data really are
> in disagreement with a valid prior. Sensitivity analysis is a way to understand a fitted model and can
> motivate further investigation.**"
>
> The **`priorsense`** package "provides diagnostics for **prior-likelihood conflict**, **weak
> likelihood**, or **strong likelihood and no prior sensitivity**." Used in the case studies of Chapters
> 17, 18, 19, and 21.
>
> This is the tool that would have caught the hidden conflict in
> [[Tail Behavior and Prior-Likelihood Conflict]], where the normal-normal posterior at $\bar{y}=10$ gave
> no warning at all.

> [!warning] The goal is not a clean diagnostic report
> "**The goal of prior sensitivity analysis should not be to adjust priors until there are no diagnostic
> messages. Instead, potential prior-likelihood conflict means we need to think more.**"

> [!warning] Marginal sensitivity can be uninterpretable
> "By default, the `priorsense` package performs the sensitivity analysis **for all parameters**, which can
> be fine for simple models. **For more complex models, posterior dependence can arise when a function of
> two or more parameters is identified but the individual parameters are not. In such cases, analyzing the
> sensitivity of marginal posteriors is not so useful.**
>
> For example, **coefficients in a fitted spline model can be highly correlated in the posterior so that
> their marginal posteriors are not easily interpretable alone. In such cases and eventually in any case,
> it is good to directly analyze the sensitivity of the quantities of interest, such as average treatment
> effect.**"
>
> Same lesson as the banana in [[Point Estimates and Uncertainties]]: **work with the derived quantity,
> not the parameter vector.**

### Static sensitivity analysis

> [!definition] Sensitivity without refitting *or* reweighting (Ch. 8.5, p. 152)
> "**Static sensitivity analysis** [is] a way to study sensitivity of posterior inferences of quantities of
> interest to parameters in the model. **Static sensitivity analysis does not refit the model with
> alternative priors. Instead it examines the sensitivity of posterior simulations to variation in
> parameters.**"
^def-static-sensitivity

> [!example] Toxicology: reading one scatterplot two ways (Figure 8.12; Gelman, Bois, and Jiang 1996)
> **The display.** Posterior simulations for one of six participants in toxicology experiments, plotting
> two derived quantities — **the percent of the toxin metabolized under low and high exposure** — against
> two of that person's physiological parameters. "Figure 8.12 can thus be considered as **four
> scatterplots**, as each of the two graphs is really two plots superimposed."
>
> **Reading 1 — the direct interpretation: posterior correlation.**
> - **Figure 8.12a (the scaling coefficient of the toxin's metabolism):** it "**entirely determine[s] the
>   percent metabolized at high dose** (the cluster of dots on the bottom half) **but tells us nothing
>   about the percent metabolized at low dose.**" The perfect correlation under high dose "makes sense, as
>   **this scaling coefficient governs the maximum rate of metabolism.**"
> - **Figure 8.12b (the Michaelis-Menten coefficient**, governing the rate before saturation): "**positively
>   correlated** … with the percent metabolized at high dose, but **negatively predictive** of the percent
>   metabolized at low dose. **It is not immediately clear where this negative correlation comes from;
>   presumably it arises through dependence with other parameters in the model that govern the equilibrium
>   concentrations of the toxin.**"
>
> **Reading 2 — the indirect interpretation: prior sensitivity, for free.**
> > "**Each scatterplot can be read indirectly to reveal sensitivity of the quantity plotted on the
> > $y$-axis to the prior of the parameter plotted on the $x$-axis.** The interpretation goes as follows:
> > **a change in the prior distribution for the parameter plotted on the $x$-axis can be performed by
> > reweighting of the points on the graph according to the ratio of the new prior to that used in the
> > analysis. With these graphs, the importance weighting can be visualized implicitly without requiring
> > the computation of the weighted average: the impact of changes in the prior distribution can be seen
> > based on the dependence in the scatterplot.**"
>
> **This is the elegant part.** If the scatterplot is flat, no reweighting of the $x$-axis can move the
> $y$-axis, so the quantity is insensitive to that parameter's prior. If it slopes steeply, it is
> sensitive. **You read off the answer without any computation at all.**

### Prior predictive checking vs. prior sensitivity analysis

> [!important] Which to do first (Ch. 8.5, p. 153)
> "**If the data swamp the prior and the posterior shape is mostly determined by the likelihood, a
> nonsensical prior predictive distribution is not an issue. Thus if the data are assumed to dominate, it
> is possible to skip prior predictive checking until after prior and likelihood sensitivity analysis
> indicates sensitivity to the prior.**
>
> **Prior predictive checking still remains useful before collecting data, building understanding of the
> model, or when it is assumed that some model components may be only weakly informed by data.**"
>
> A rare piece of explicit ordering advice in a book that mostly resists prescribing sequence.

### Weak priors on parameters, strong priors on predictions

> [!warning] The $R^2$ demonstration (Figure 8.13, Ch. 8.5, p. 153)
> "**Priors are commonly set directly on parameters, and wide priors are said to be 'weak.' However,
> because of the concentration of measure in high dimensional space, weak priors on individual parameters
> can combine to yield strong priors on predictions of interest**" (Gelman 1996, for time series and
> spatial models).
>
> **The example:** the implicit prior on **Bayesian $R^2$** in a regression predicting student grades from
> **26 predictors**, under three priors on the coefficients:
>
> | Prior on coefficients | Implied prior on $R^2$ |
> |---|---|
> | **(a) default weak prior** | **strongly favors high $R^2$** |
> | **(b) normal prior scaled with the number of predictors** | moderated |
> | **(c) regularized horseshoe** | moderated |
>
> "**If we want the prior on $R^2$ to stay fixed, the prior on each individual coefficient needs to get
> tighter.**"
>
> **The alternative construction:** "**This can also be done by setting the prior directly on $R^2$ and
> then deriving a joint prior on regression coefficients and residual variance**" (Zhang, Naughton, et al.
> 2022; Aguilar and Bürkner 2023) — the R2D2 family. Demonstrated in
> [[Models for Regression Coefficients - Student Grades]] (Ch. 28).
>
> Same phenomenon as Figure 5.8 in [[Prior Predictive Checking]], now measured on an interpretable scale.

> [!important] Priors must be understood jointly
> "**An expanded model can require additional thought regarding parameterization.** For example, when going
> from $\text{normal}(\mu,\sigma)$ to $t_\nu(\mu,\sigma)$, **we have to be careful with the prior on
> $\sigma$. The scale parameter $\sigma$ looks the same for the two models, but the variance of the $t$
> distribution is actually**
> $$
> \frac{\nu}{\nu-2}\sigma^2 \quad\text{rather than}\quad \sigma^2
> $$
> **Accordingly, if $\nu$ is small, $\sigma$ is no longer close to the residual standard deviation.**"
>
> "**In general, we need to think in terms of the joint prior over all the parameters in a model, to be
> assessed in the context of the generative model for the data, lest unfortunate cancellations or
> resonances lead to less stabilizing or more informative priors than intended**" (Gelman, Simpson, and
> Betancourt 2017; Kennedy, Simpson, and Gelman 2019).
>
> Same reparameterization point as
> [[Joint Priors and Covariance Matrices#The piranha principle]], here framed as a model-expansion hazard.

> [!important] The meta-message about workflow
> "**The above examples carry particular messages about priors but also a meta-message about how we think
> about workflow when constructing statistical models. Phrases such as 'the information budget still needs
> to be divided' represent important but informal decisions we make about how much effort we put in to
> include prior information. Such concerns are not always clear in articles or textbooks that present the
> final model as is, without acknowledging the tradeoffs and choices that have been made.**"

### How much information is in the prior?

> [!definition] Measuring the information provided by an experiment
> "Lindley (1956) and Goel and DeGroot (1981) discuss how to measure the information provided by an
> experiment **in terms of how different the posterior is from the prior.** Kallioinen et al. (2024)
> present a practical tool to **compare the amount of information coming from the prior and likelihood
> separately.**"
>
> **What to do about a weakly informed model:** "**If the data are not informative on some aspects of the
> model, we may improve the situation by providing more information via priors.**"
>
> **And a striking preference:** "**Furthermore, we often prefer to use a model with parameters that can be
> updated by the information in the data instead of a model that may be closer to the truth but where data
> are not able to provide sufficient information.**"
>
> Illustrations of weakly informed parameters: Chapter 4 (test scores) and Chapter 19 (coronavirus
> testing); the related question of **how informative the data are about the functional form** is
> demonstrated in Chapter 21.
>
> "Asymptotic results can supply some insight into finite-sample performance, but **we generally prefer to
> consider the posterior distribution that is in front of us.**"

## Examples

> [!example] Exercise 8.4 — partial pooling under an extreme outlier (Ch. 8.6, p. 155)
> In the 8 schools model, suppose school A's raw estimate becomes **1000** instead of 28, with the standard
> errors unchanged. Three things change at once, "**all three of these contribute to increasing the
> estimate for $\theta_1$**":
> (i) the raw estimate for A goes up; (ii) $\mu$ goes up, pulling the population mean higher; (iii) $\tau$
> goes up, **reducing partial pooling.**
>
> **(a)** With $\hat\mu = 130$, which is closest to the posterior median of $\theta_1$:
> $\hat\mu$, $\tfrac{7}{8}\hat\mu + \tfrac18 1000$, $\tfrac18\hat\mu + \tfrac78 1000$, or $1000$?
> **(b)** For **school C** ($y_3 = -3$, posterior median 7 in the original analysis) the three effects **no
> longer pull in the same direction**: $\mu$ increases (pulling $\theta_3$ up) but $\tau$ increases too
> (reducing the pull toward the mean). What is the resulting posterior median?
> **(c)** "**Are these results surprising?** Explain what you might have expected before working out the
> problem, and explain your answers in terms of partial pooling."

> [!example] Exercise 8.6 — how many games equal the preseason line? (Ch. 8.6, p. 156)
> Using `nba2023.txt` (game outcomes, points scored and allowed, betting lines, schedule strength):
> **"Use these data to come up with an estimate of the relative amount of information provided about a
> team's season-wide ability level from its performance in a single game, compared to the prior information
> as represented by the preseason betting line. To put it another way, how many games need to be played
> before the amount of information from game performance is roughly equal to that from the prior?"**
>
> A direct, quantitative version of the "prior comes in once, likelihood $n$ times" argument in
> [[Prior Distributions#Don't overthink it]].

## Connections

- Power scaling and the power-weighted likelihood of
  [[Influence of Individual Data Points#Route 2]] are the same device — exponentiate a factor of the
  target and differentiate — applied to the prior and to individual observations respectively.
- This section is the answer to the problem posed by
  [[Tail Behavior and Prior-Likelihood Conflict]]: conflict invisible in the posterior becomes visible
  under power scaling.
- The $R^2$ result is the measured version of the dimension effect in
  [[Prior Predictive Checking#Weak priors become strong as dimension increases]].

## See Also
- [[Prior Distributions]] — the informativity ladder these diagnostics test
- [[Joint Priors and Covariance Matrices]] — the joint priors recommended when marginals mislead
- [[Influence of Individual Data Points]] — the data-side counterpart
- [[Prior Specification for Regression Models - Sleep Study]] — an extended `priorsense` case study
