---
title: "Constructing Priors for Effect Sizes"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.6, pp. 79-82 (Figures 5.3, 5.4)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Prior Distributions]]"
  - "[[Relating a Model to Subject-Matter Assumptions]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[From Inference to Decision]]"
  - "[[The Replication Crisis and Multiple Levels of Variation]]"
  - "[[Predictive Model Checking and Comparison - Clinical Trial]]"
aliases:
  - "Zero-centered priors"
  - "Meta-analytic prior"
  - "Cochrane prior"
  - "Signal-to-noise ratio prior"
  - "Exaggeration factor"
---

# Constructing Priors for Effect Sizes

> [!summary]
> Four concrete routes to a prior for a treatment effect: **reason it out from the structure of the
> experiment** (the cancer-tumor dialogue), **center at zero on equilibrium grounds**, **extrapolate
> from historical fits** (election coefficients), and **estimate it by meta-analysis** — the last of
> which produces reusable, off-the-shelf priors: a two-component mixture fit to 178 Cochrane medical
> trials and 86 Open Science Collaboration psychology experiments, expressed in **scale-free
> signal-to-noise ratios** so they transfer across topics.

## Overview

> [!example] The early-childhood intervention: what a prior is worth (Ch. 5.6, p. 79)
> **The data.** A non-Bayesian estimate that the program increased eventual adult earnings by **42%**,
> with standard error approximately **20%**. "This is a seemingly very large effect, but with a lot of
> uncertainty."
>
> **The prior.** $\text{normal}(0, 0.10)$ for the true effect size, "based on the existing literature
> for this sort of study."
>
> **The posterior** (normal-normal precision-weighted combination):
> $$
> \hat{\theta} = \frac{\frac{1}{0.10^2}\cdot 0 + \frac{1}{0.20^2}\cdot 0.42}{\frac{1}{0.10^2} + \frac{1}{0.20^2}} = 0.08, \qquad \text{se} = \sqrt{\frac{1}{\frac{1}{0.10^2} + \frac{1}{0.20^2}}} = 0.09
> $$
>
> "which is **much more reasonable than the inferential summary from the local data alone.** You could
> argue against the $\text{normal}(0,0.10)$, and that's fine too, in that this would be part of a
> **discussion of possible true effect sizes.**"
>
> (See §1.5 of Gelman, Hill, and Vehtari 2020, and p. 78 of Gelman and Vehtari 2024.)

**The generic version.** An experiment estimating an average treatment effect $\theta$ yields an
unbiased $\hat\theta$ with known variance 0.1, on a unit-scale outcome — "so 0.1 represents a
substantial but not huge effect; thus, **this experiment has the power to identify large effects but is
too noisy to identify small effects.**" Compress the data model as
$\hat\theta(y) \sim \text{normal}(\theta, 0.1)$. If we expect the true effect to be much less than 0.1,
we might write $\theta \sim \text{normal}(0, 0.05)$. "We can think of this as prior information, a
prior assumption, **or context for the problem under study.**"

> [!warning] The standing caveat
> "In real-world problems, **our inferences will always exclude some relevant information**, and we
> should be aware of this when interpreting results. **Whatever data model and prior we use can at best
> represent an approximation to our knowledge.**"

## Main Content

### Route 1 — Reasoning out a prior from the experiment's structure

> [!example] The cancer researcher's challenge (Ch. 5.6, pp. 79-80)
> A researcher asked for a prior for the effect of a **novel treatment, something that had never been
> tried before.** The dialogue that produced one:
>
> 1. **Ask about the structure of the experiment.** A one-year study. The parameter of interest: the
>    slope of the regression of tumor size over time under treatment, **minus** the slope for controls.
>    Tumors were approximately **100 grams** at the start.
> 2. **Propose possible effect sizes and test them against intuition.** A null effect was surely
>    possible. Could the treatment eliminate the tumor entirely during the experiment? What about a 50%
>    reduction? And what would happen in the control group under standard therapy — would tumors stay
>    the same, or might they double?
> 3. **Get the researcher's conjecture.** Controls would show no average change; an effective treatment
>    could **halve** the tumor, i.e. a slope of $-50$ g/year.
> 4. **Make it scale-free.** Define the effect relative to initial tumor size: a slope of $-0.5$.
> 5. **Set the prior:** $\theta \sim \text{normal}(0, 0.25)$.
>
> **Why each feature of that prior:**
> - **Centered at 0** — "the new treatment could help or harm (this can happen, especially given that it
>   is being compared to best existing protocol)."
> - **sd 0.25** — "if it does help, the hoped-for effect of $-0.5$ is **on the extreme end** of possible
>   effects" (two sd).
> - **Unbounded** — "it provides a **soft constraint** rather than a hard constraint, which makes sense
>   given that there is nothing in the model that would imply a hard boundary (other than that the
>   treatment effect cannot be more than $-1$, which is far enough in the tail that we don't really need
>   to worry about it)."

### Route 2 — Zero-centering, and the equilibrium argument for it

> [!definition] What a zero-centered prior asserts (Ch. 5.6, p. 80)
> "**The prior for any given study represents the distribution of average treatment effects among a
> hypothetical population of problems of which the current study represents a random draw.**" If
> $\theta_j$ is the average effect in study $j$, the prior is the population from which $\theta_j$ was
> drawn.
^def-prior-as-population

> [!important] The equilibrium argument
> Cases where the prior mean would **not** be zero:
> - **Negative**, if "many ideas are being tested against the status quo; most are bad ideas, but some
>   might be better, which is the purpose of the experimentation."
> - **Positive**, if "new ideas are only being tried if there is already strong external evidence in
>   their favor."
>
> **The default:** zero, "on the theory that, on one hand, **the low-hanging fruit have already been
> picked**, and, on the other, **people will not usually be testing very bad ideas.**"
>
> **The self-consistency check that makes it an equilibrium:** "It would be unusual to conduct an
> experiment to estimate a parameter with a prior mean of $\text{normal}(0.2, 0.1)$, **as that would
> imply the strong assumption that the vast majority of the hypothetical population of effects are
> positive, in which case one might expect they would already have been tested and implemented.**"
>
> "When testing a new treatment, **the uncertainty about its effect is typically large enough compared
> to its expected benefit that a zero-centered prior can be a reasonable approximation.**"

**The scope limit.** "The above reasoning applies to studies intended to estimate the effects of **new
treatments.** But there are other parameters in a model that might need priors. For example, consider a
regression predicting vote preference given sex, ethnicity, and income. **There is no reason to expect
the coefficients of these predictors to be near zero.**"

### Route 3 — Historically-based priors

> [!example] Election coefficients over time (Figure 5.3, Ch. 5.6, pp. 80-81)
> Logistic regressions predicting probability of Republican presidential vote from **sex, race, and
> income**, fit separately to National Election Study data for each election **1952-2000**.
>
> **The obstacle: the first-step estimates are themselves unstable.** "The coefficient of `black` in
> 1964 [shows] **complete separation**: of the 87 African Americans in the survey that year, **none
> reported a preference for the Republican candidate.** We fit the model in R, which yielded a finite
> estimate, but **that number and its standard error are essentially meaningless, being a function of
> how long the iterative fitting procedure goes before giving up. The maximum likelihood estimate for
> the coefficient of `black` in that year is $-\infty$.**"
>
> **The fix, then the prior.** The bottom row of Figure 5.3 shows estimates after including
> weakly-informative zero-centered priors (`stan_glm`). "From these we can get a sense of a reasonable
> range of coefficients that, at least in the short term, **can serve as an informative prior for the
> following elections.**"
>
> **What is not automatic about it:** "Constructing this prior distribution **requires some model,
> implicit or explicit, of how the coefficients might be expected to change over time, along with some
> assumption about the prior correlation among the predictors.** Indeed, we can think of this two-step
> procedure as **an informal approximation to fitting a hierarchical time series model on all the data
> at once.**"
>
> Note the double duty: the same example demonstrates *(a)* that a weak prior stabilizes complete
> separation (as in [[Multiple-Choice Exam - A Full Workflow Walkthrough]]) and *(b)* that stabilized
> past fits become tomorrow's prior.

### Route 4 — Meta-analysis as a source of default priors

> [!definition] Reframing the target of a meta-analysis (Ch. 5.6, p. 81)
> "The usual application of meta-analysis is to combine different estimates of the same underlying
> quantity in different settings. **Once we accept that treatment effects will vary by person and
> situation, it is clear that average treatment effects will vary from study to study, and thus the
> target of the meta-analysis should be not a single universal effect but rather a distribution of
> average treatment effects.**
>
> **This distribution can be considered as a prior for the average effect size in a single study drawn
> at random from those used in the analysis.**"
>
> (BDA3 §5.6 establishes the meta-analysis / hierarchical modeling connection, following Rubin 1989.)
^def-meta-analytic-prior

> [!example] The van Zwet and Gelman (2022) priors (Figure 5.4, Ch. 5.6, pp. 81-82)
> **Two corpora, chosen for a specific reason:** 86 psychology experiments from the **Open Science
> Collaboration (OSC)** and 178 medical trials from the **Cochrane** database. "We chose these corpora
> because, **as collections of registered studies, they seemed less subject to selection bias** than
> usual scientific reports which are well known to select on statistical significance." Figure 5.4a-b
> confirms the $z$-score distributions "do not show the sorts of dramatic patterns of selection biases
> that have been found in broader surveys."
>
> **Two departures from the standard 8-schools analysis:**
>
> 1. **Model the signal-to-noise ratio, not the effect size.** "The different experiments in the
>    Cochrane database are on different topics and the effects are on different scales; **the
>    distribution of effect sizes on the original scales of measurement would be far too broad to
>    provide any utility as a prior for a new study.** In contrast, **signal-to-noise ratios are
>    scale-free** and, empirically, are often close enough to zero." The analysis is straightforward
>    under the approximation that each study's $z$-score is **normal with mean equal to the
>    signal-to-noise ratio and standard deviation 1.**
> 2. **Estimate the underlying distribution as a mixture of two zero-centered normals** rather than a
>    single normal.
>
> **The Cochrane result, in the authors' own words:**
> > "We estimated the distribution of the $z$-values as a two-component mixture of zero-mean normals
> > with standard deviations **1.8 and 3.7** and mixture proportions **0.42 and 0.58** … we can obtain
> > the distribution of the signal-to-noise ratios **by deconvolution**. This distribution has the same
> > mixing proportions as the distribution of the $z$-values, and the standard deviations are
> > $\sqrt{1.8^2 - 1} = 1.5$ and $\sqrt{3.7^2 - 1} = 3.5$."
>
> **The two ready-to-use priors on the signal-to-noise ratio:**
> $$
> \text{Cochrane (medical trials):}\quad 0.42\,\text{normal}(0, 1.5) + 0.58\,\text{normal}(0, 3.5)
> $$
> $$
> \text{OSC (psychology):}\quad 0.57\,\text{normal}(0, 1.2) + 0.43\,\text{normal}(0, 4.1)
> $$
>
> **Why the medical distribution is broader:** "**medical experiments have higher stakes and are
> designed to have high power, so their corpus contains fewer studies with very low signal-to-noise
> ratios.**"
>
> These "are now ready to use as priors in future studies that could be considered comparable to the
> psychology experiments in the OSC or the clinical trials in the Cochrane database." An application to
> a high-profile surgical experiment appears at the end of [[From Inference to Decision]] (§7.3).

> [!important] The deconvolution step, spelled out
> If $z \sim \text{normal}(\text{SNR}, 1)$ and $\text{SNR} \sim \text{normal}(0, s)$, then marginally
> $z \sim \text{normal}(0, \sqrt{s^2 + 1})$. So having fit the observed $z$-distribution with
> component sd $\sigma_z$, the underlying SNR component sd is $\sqrt{\sigma_z^2 - 1}$ — subtracting the
> unit sampling noise. The mixing proportions are unchanged because the convolution acts
> component-wise.

### The stakes: exaggeration factors

> [!warning] Why any of this matters (Ch. 5.10, p. 97)
> "**Using raw, unregularized estimates in noisy settings leads to systematic overestimates of treatment
> effects, and these 'exaggeration factors' can be huge**" (Gelman and Carlin 2014; van Zwet and Gelman
> 2022).
>
> Applied to the early-childhood example: "Even if data issues are set aside and this is taken as an
> **unbiased** estimate, it is very noisy, and any realistic expectation for an average treatment effect
> would be much lower."
>
> "**This is the sort of problem that motivates the use of strong priors** — but then we do need to be
> aware of how the resulting inferences can depend on technical aspects of the model such as tail
> behavior." See [[Tail Behavior and Prior-Likelihood Conflict]].

## Connections

- The prior-as-population definition here is the same object as $p(\theta)$ in the "room full of urns"
  image of [[Why Bayes - Benefits, Costs, and Borders]], now estimated rather than assumed.
- The meta-analytic prior is a **hierarchical model whose top level is reused across projects** — the
  logical endpoint of [[Relating a Model to Subject-Matter Assumptions]]'s superpopulation framing.
- Exaggeration factors are the quantitative content of
  [[The Replication Crisis and Multiple Levels of Variation]].

## See Also
- [[Prior Distributions]] — the informativity ladder these priors sit on
- [[Joint Priors and Covariance Matrices]] — when independent priors are not enough
- [[Empirical Bayes - Overview]] — estimating a prior from data, and why the authors dislike the name
- [[Partial Pooling as Multiple Comparisons Correction]] — the shrinkage these priors deliver
