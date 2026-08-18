---
title: "SBC in the Workflow"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 14, pp. 249-254 (Figures 14.1-14.4, Eq. 14.1)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Simulation-Based Calibration"
doc_type: textbook
depends_on:
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[The SBC Algorithm]]"
  - "[[Rank Statistics and Uniformity]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Modeling as Software Development]]"
  - "[[Simulation-Based Calibration Checking in Model Development Workflow]]"
aliases:
  - "Simulation-based calibration checking"
  - "Posterior SBC"
  - "Gamma metric"
  - "Test quantities"
  - "SBC and wide priors"
---

# SBC in the Workflow

> [!summary]
> The book's Chapter 14, which updates the [[Simulation-Based Calibration - Overview|Talts et al. (2018)
> treatment]] already in this vault with the **Modrák et al. (2025) variant** and situates it in the
> workflow. Three things are new here. The **name is corrected**: "as the method is not calibrating
> anything, but only checking the calibration, the name **simulation-based calibration checking** is more
> accurate." The **$\gamma$ metric** provides a sensitive numerical uniformity test for when there are too
> many parameters to check visually. And the chapter is unusually frank about the **clash between SBC and
> wide priors** — "a prior can be weakly informative in the sense of having a small influence on the
> posterior, while being extreme in the sense of allowing substantively implausible datasets."

## Overview

> [!important] Why one simulated dataset is not enough (Figure 14.1, Ch. 14, p. 249)
> "**Using a single simulated dataset to test a model will not necessarily 'work,' even if the computational
> algorithm is working correctly.** The problem here arises
> - **not just because with one simulation anything can happen** (there is a 5% chance that a random draw
>   will be outside a 95% uncertainty interval)
> - **but also because Bayesian inference will in general only be calibrated when averaging over the prior,
>   not for any single parameter value.**
> - **Furthermore, parameter recovery may fail not because the algorithm fails, but because the observed data
>   are not providing information that could update the uncertainty quantified by the prior for a particular
>   parameter.**"
>
> **A specific and counterintuitive consequence:** "**If the prior and posterior are approximately unimodal
> and the chosen parameter value is from the center of the prior, we can expect overcoverage of posterior
> intervals.**" Picking a "reasonable" true value biases the check toward passing.
>
> **Figure 14.1's three scenarios:**
> | Scenario | Posterior vs. truth | Verdict |
> |---|---|---|
> | **1** | posterior centered at the true value | "**suggests the fit is reasonable**" |
> | **2** | true parameter in the tail | "**It is unclear whether this indicates a fault in our inference**" |
> | **3** | posterior **multimodal** | "**it becomes evident that comparing the posterior to a single point cannot validate the inference algorithm**" |
^imp-why-one-dataset-fails

## Main Content

### The procedure, and its two distinct purposes

> [!definition] The SBC loop (Ch. 14.1, pp. 249-250; Figure 14.2)
> "**The model parameters are drawn from the prior; then data are simulated conditional on these parameter
> values; then the model is fit to data; and finally the obtained posterior is compared to the simulated
> parameter values that were used to generate the data.**"
>
> **Two different things this can check:**
> 1. **Coherence of the inference algorithm** — "the focus is on the behavior of the inference algorithm,
>    which can reveal **implementation errors or bad finite time behavior of a correctly implemented
>    algorithm.**"
> 2. **Coherence of the generative model and the posterior code** — "the focus is on **checking that the
>    model code itself is correctly written.**"
>
> **The Modrák et al. (2025) formulation used here.** Simulate $S$ parameter sets from the prior and $S$
> corresponding datasets; fit each to obtain $M$ posterior draws; choose functions $T(\theta, y)$ called
> **test quantities**; compute a rank for each.
>
> **The claim being tested:** "**If our simulator, model, and probabilistic program all behave correctly,
> then for each test quantity the $S$ ranks should be uniformly distributed between 0 and $M$. This
> corresponds closely to claiming that for all $p \in (0,1)$, all posterior intervals of width $p$ contain
> the true value in $p$ proportion of the cases.**"
^def-sbc-checking

> [!important] Test quantities, and two practical requirements
> "**Test quantities are most commonly just the parameter values themselves, but in some cases it will make
> sense to study more complicated functions of parameters and data, hence the general formulation.**"
>
> **Ties:** "**If some draws of the test quantity are exactly equal to the simulated value, as can arise when
> investigating discrete summaries, we draw the rank uniformly at random across all the equal draws.**"
>
> **Independence:** "**we need the $M$ posterior draws to be independent or close to independence. If our
> fitting process produces correlated draws (as most MCMC algorithms would), it may be necessary to thin the
> draws to achieve that.**" — the thinning requirement developed in [[The SBC Algorithm]].

> [!important] SBC and truth-point benchmarking as two ends of a spectrum
> "**While in many ways superior to benchmarking against a truth point, simulation-based calibration checking
> requires fitting the model multiple times, which may incur a substantial computational cost.**
>
> **Roughly, a single truth-point benchmark will possibly flag gross problems, but it does not guarantee
> anything. As we do more experiments, it is possible to see finer and finer problems in the computation.**
>
> **It is an open research question to understand SBC with a small number of simulated datasets. We expect
> that abandoning random draws from the prior for a more purposeful exploration of the prior would make the
> method more efficient, especially in models with a relatively small number of parameters.**"

### Diagnostics: visual first, numerical when necessary

> [!definition] The six diagnostic shapes (Figures 14.3-14.4)
> "**Our preferred way to assess uniformity of ranks is via visualizations as they can reveal patterns that
> are not well summarized by scalar diagnostic quantities**" (Säilynoja, Bürkner, and Vehtari 2022).
>
> The two figures show the same six cases as **rank histograms** (14.3) and as **ECDF-difference plots**
> (14.4), with 95% intervals shown:
>
> | Shape | Diagnosis |
> |---|---|
> | flat | **Exact match** |
> | sloped | **Model overestimating** / **underestimating** |
> | $\cup$-shaped | **Model too certain** |
> | $\cap$-shaped | **Model too uncertain** |
> | spike at one end | **Some extra-low estimates** |
>
> See [[Interpreting SBC Histograms]] for the mechanics of why each shape means what it does.
>
> **When to go numerical:** "**there are valid use cases for numerical uniformity tests in SBC when there is
> a large number of parameters and checking all of them visually is not feasible.**"
^def-sbc-shapes

> [!definition] The $\gamma$ metric (Eq. 14.1, Ch. 14.2, pp. 251-252)
> "**One can use standard checks such as Kolmogorov-Smirnov or $\chi^2$ tests, but those tend to have
> suboptimal sensitivity.**"
>
> The $\gamma$ metric instead "**takes the likelihood of observing the most extreme point on the empirical
> cumulative distribution function if the rank distribution was indeed uniform**":
> $$
> \gamma = 2 \min_{1 \le i \le M+1}\Big[\min\big(\text{binomial}(R_i \mid S, z_i),\ 1 - \text{binomial}(R_i - 1 \mid S, z_i)\big)\Big]
> $$
> where $M$ is the number of posterior draws, $S$ the number of simulations (and thus of observed ranks),
> $z_i = \frac{i}{M+1}$ the expected proportion of ranks smaller than $i$, $R_i$ the observed count of ranks
> smaller than $i$, and $\text{binomial}(R|S,p)$ the binomial CDF.
>
> **Two uses:**
> - **Ranking:** "**Ordering by $\gamma$ can be directly used for finding the test quantities that show the
>   biggest problems and then inspecting them manually.**"
> - **Pass/fail:** "**A direct way to interpret $\gamma$ is that the visualizations of the empirical
>   cumulative distribution function with $1-\alpha$ confidence bands would show a problem if and only if
>   $\gamma$ is lower than the $\alpha$ quantile under the uniform distribution.**"
>
> Säilynoja, Bürkner, and Vehtari (2022) give computational methods for the quantiles of $\gamma$ under
> uniformity for given $M$ and $S$.
^def-gamma-metric

Note the design: **$\gamma$ is exactly the statistic underlying the ECDF confidence bands**, so the numerical
test and the visual check agree by construction — you are not adding a second, differently-behaved
diagnostic.

### The clash between SBC and wide priors

> [!warning] Weakly informative on the posterior, extreme on the data (Ch. 14.3, p. 252)
> "**A serious problem with SBC is that it clashes with the common practice of specifying wide priors so as
> to let the data speak. A prior can be weakly informative in the sense of having a small influence on the
> posterior, while being extreme in the sense of allowing substantively implausible datasets to appear when
> simulating from the prior.**"
>
> **The example:** logistic regression $\Pr(y_i=1) = \text{logit}^{-1}(a + bx_i)$ with standardized pre-test
> score $x \in [-2,2]$. "**With sufficient data, it should be possible to accurately estimate $a$ and $b$
> given a uniform prior or given a weakly-informative prior such as $a, b \sim \text{normal}(0, 100)$. But
> prior predictive draws $y$ from this model are likely to be all 0's or all 1's.**"
>
> > "**Applying SBC here should be mathematically correct but not particularly relevant to the applied goal
> > of checking the computation in the range of parameter values we might care about.**"
>
> **The vivid version:** Gabry, Simpson, et al. (2019) "**give an example in which simulated air pollution
> datasets were constructed where the pollution is denser than a black hole. These extreme data sets can
> cause an algorithm that works well on realistic data to fail dramatically. But this isn't really a problem
> with the computation so much as a problem with the prior.**"
>
> This is [[Prior Predictive Checking]]'s dimension effect arriving as a *computational* obstacle: the
> $\text{normal}(0,50)$ panel of Figure 5.5, which produced perfect-discrimination datasets, is precisely
> what SBC would be forced to condition on.
^wrn-sbc-wide-priors

> [!important] Two ways out
> **1. Tighten the priors.** "**Although this may be difficult, especially in cases when independent priors
> on individual parameters are not sufficient to constrain the model and a joint prior is required**"
> (Zhang, Naughton, et al. 2022; Hem, Fuglstad, and Riebler 2022; Aguilar and Bürkner 2023) — see
> [[Joint Priors and Covariance Matrices]].
>
> **2. Rejection sampling on the simulated data.** "**If we have some understanding of what types of data are
> problematic or unrealistic, a pragmatic option is to incorporate a rejection sampling step: we design a
> criterion to discard problematic datasets and generate new ones instead.** In the air pollution case we
> could for example **discard datasets with too large maximal pollution values as well as datasets with too
> small variance of the outcome.**
>
> **As long as the criterion only depends on data (and not on latent parameters), rejection sampling does not
> change what the correct posterior is and thus does not compromise SBC.**"
>
> That last condition is the crucial one and easy to get wrong: **reject on $y$, never on $\theta$.**

### Posterior SBC

> [!definition] Checking calibration where the posterior actually lives (Säilynoja, Schmitt, et al. 2026)
> "**The SBC approach as described above involves checking the calibration over the whole prior, which makes
> sense when we are assessing the reliability of inference for models before we have obtained data. After we
> have the data, we may be interested only [in] checking the calibration in the region of the parameter space
> which has most of the posterior mass.**
>
> **In posterior SBC, the posterior distribution of the model fitted to a representative dataset is used as a
> prior for simulating new data. To carry this prior into the simulated datasets, we simply combine the
> 'prior' data and the newly simulated data.**"
>
> **What it can and cannot detect:** "**In posterior SBC, the same inference algorithm is used to sample from
> the posterior and the augmented data posterior, and thus we are not able to detect discrepancies between
> the generative model and posterior density implementation, but we can detect incoherence of the inference
> algorithm with respect to Bayesian updating due to mistakes in implementation or failure to fully sample
> from the posterior.**"
>
> **Where it adds value beyond convergence diagnostics:** "**Many of these sampling issues are also likely to
> be detected by convergence diagnostics, but posterior SBC also provides a way to assess the magnitude of the
> possible bias when there are only weak signs of convergence issues (say one or two diverging Hamiltonian
> steps) or when there are not yet existing convergence diagnostics, as with amortized inference.**"
> (Cai, Greengard, et al. 2026 discuss problems with posterior SBC.)
^def-posterior-sbc

Posterior SBC is the direct answer to the wide-priors clash: it **replaces the prior with something the data
have already constrained**, so the simulated datasets are realistic by construction. The tradeoff is that it
gives up the ability to catch model-code errors, since the same code generates and fits.

### Practical questions

> [!important] "So the computations are coherent. Now what?"
> "**There is always a limitation of how small [the] miscalibrations [are] that can be detected with a finite
> number of SBC simulation runs, along with the question of what level of miscalibration would be a concern
> in the application. With a finite number of simulations, we may also just by chance get results that don't
> catch a small miscalibration.**
>
> **Sometimes there can be such miscalibration in different parts of the parameter space, that when combined
> in total SBC runs the discrepancies from uniformity cancel out and the total is close to uniform.** Modrák
> et al. (2025) propose additional test quantities that can help in such situations."
>
> The cancellation problem is the strongest argument for choosing test quantities beyond the raw parameters.

> [!important] "What if the computation is too slow to do 1000 replications?"
> "**It is better to run a few simulations than no simulations at all.**
> - **If the SBC ranks from a few simulation runs are at the extremes of 1 and $S+1$, that already indicates a
>   problem.**
> - **We can examine also $z$-scores, and an extreme value even from one simulation run can indicate a
>   problem.**
> - **Sometimes we can also start by using SBC to check the fitting of smaller submodels that can be computed
>   faster.**"

> [!important] SBC as software testing
> "**SBC can be used to test new implementations of inference algorithms** using models for which we assume
> the posteriors are such that the inference algorithm should be able to provide accurate inference. **Bad
> calibration would then indicate a bug in the specification of the target function (the log posterior
> density) or in the inference algorithm.**
>
> **SBC can also be used to test new implementations of a probability model. Using a separate generative model
> code to draw from the prior predictive distribution and posterior code for the posterior inference checks
> that the two codes are defining equivalent models.**"
>
> The second use is a genuine **unit test**: two independent implementations of the same model must agree, and
> SBC is the comparison. See [[Modeling as Software Development]].

## Examples

> [!example] Exercises 14.1-14.5 — mapping where SBC works (Ch. 14.4, p. 254)
> - **14.1** SBC for the model $y_i \sim \text{normal}(1/(a+bx_i), \sigma)$ of Exercise 12.4, with an
>   $\text{exponential}(1)$ prior on $\sigma$: run with $N = 100$, then **$N = 10$ and $N = 1$. "Does SBC work
>   in this example for these scenarios too?"**
> - **14.2** SBC for the [[Bioassay - A First Probabilistic Program|bioassay]] model with
>   $\text{normal}(0,5)$ priors and the positivity constraint on $b$, holding $J$, $n_j$, and $x_j$ at their
>   data values. Part (b): **"Explain why you can't do SBC for the version of the model with flat priors."**
>   (Because you cannot draw from an improper prior — see
>   [[Prior Distributions#Noninformative priors, and why "flat" is not "weak"]].)
> - **14.3** Replace the prior scale with $\sigma_0$ set ahead of time and **"perform SBC with different
>   values of $\sigma_0$ and see if there are settings where there is a problem with calibration"** — a direct
>   exploration of the wide-priors clash above.
> - **14.4** Allow $J$, $n_j$, $x_j$ as inputs and **"map out the settings where the procedure is or is not
>   approximately calibrated."**
> - **14.5** Apply SBC to the item-response model of
>   [[Multiple-Choice Exam - A Full Workflow Walkthrough|Section 4.4]].

## Connections

- This chapter is the formal endpoint of the informal checks in
  [[Designing Simulated-Data Experiments]] — which explicitly defers to it: "it is not sufficient to simulate
  a single dataset … a more elaborate and computationally intensive setup can be helpful."
- The wide-priors clash is a computational consequence of
  [[Prior Predictive Checking#Weak priors become strong as dimension increases]], and posterior SBC is the
  workaround.
- SBC-as-unit-test is the strongest link between this chapter and
  [[Modeling as Software Development]].

## See Also
- [[Simulation-Based Calibration - Overview]] — the Talts et al. (2018) treatment of the method
- [[The SBC Algorithm]] — Algorithms 1 and 2, thinning, and the choice of $N$ and $L$
- [[Interpreting SBC Histograms]] — the shape catalogue in detail
- [[Rank Statistics and Uniformity]] — the uniformity theorem
- [[Simulation-Based Calibration Checking in Model Development Workflow]] — the Ch. 31 case study
