---
title: "From Inference to Decision"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 7.3-7.4, pp. 130-134 (Figure 7.9)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Causal Inference as Generalization]]"
  - "[[Constructing Priors for Effect Sizes]]"
  - "[[Point Estimates and Uncertainties]]"
used_by:
  - "[[Using a Fitted Model for Decision Analysis - Classification Competition]]"
  - "[[Statistical and Scientific Inference]]"
  - "[[The Replication Crisis and Multiple Levels of Variation]]"
aliases:
  - "ORBITA"
  - "Heart stents study"
  - "Against significance thresholding"
---

# From Inference to Decision

> [!summary]
> Why the significance threshold is the wrong decision rule, and what to use instead. The arithmetic
> that anchors the argument: **an estimate exactly one standard error from zero — "only weak evidence"
> by conventional standards — still implies an 84% posterior probability that the effect is positive**
> (76% under a moderately informative prior). The chapter reanalyzes the **ORBITA heart-stent trial**,
> published as a null finding at $p = 0.20$, and shows that under either a flat prior or a
> **Cochrane-derived meta-analytic prior** the data support **a small positive effect** — probability
> 0.71 or 0.80 of an effect between 0 and 30 seconds.

## Overview

> [!definition] The canonical setup (Ch. 7.3, pp. 130-131)
> An unbiased estimate $\hat\theta$ with standard error $s$: $\hat\theta \sim \text{normal}(\theta, s)$.
> With a **uniform prior**, $\theta|y \sim \text{normal}(\hat\theta, s)$ — "conveying that we are treating
> the estimate and standard error as **sufficient statistics**."
>
> With prior $\theta \sim \text{normal}(0, \sigma_0)$ — "you have no reason to believe the effect is
> positive or negative, but **small effects are more likely than large effects**, and $\sigma_0$ represents
> the scale of effects that might be expected":
> $$\theta \mid y \sim \text{normal}\!\left(\frac{\frac{1}{s^2}\hat\theta}{\frac{1}{s^2} + \frac{1}{\sigma_0^2}},\; \sqrt{\frac{1}{\frac{1}{s^2} + \frac{1}{\sigma_0^2}}}\right)$$
>
> **Two calibrations of $\sigma_0$ offered:**
> - **A/B test of a small marketing innovation**, outcome = log spending, mature industry:
>   $\sigma_0 = 0.01$, "implying that we would not expect any intervention to increase or decrease
>   average spending by much more than 1%."
> - **Cancer treatment**, typical tumor size ~100 grams: $\sigma_0 = 50$, "implying that it is unlikely
>   but possible that the treatment could cause tumor sizes to double on average or to bring them to
>   zero."
>
> "**Our point here is not that these priors are 'correct' but that assumptions about the population of
> possible effect sizes are relevant to decision making, so we should be thoughtful and open in our
> assumptions about this population.**"
^def-decision-setup

> [!important] The one-standard-error calculation
> Suppose $s = 0.1$ and $\hat\theta = 0.1$ — exactly one standard error from zero.
>
> "It is fair to say this is only **weak evidence** in favor of a positive effect: **it would be no
> surprise to see an estimate this large even if the true $\theta$ were zero. On the other hand, under
> this model the posterior probability is 84% that $\theta$ is positive.**"
>
> With a moderately informative $\theta \sim \text{normal}(0, 0.1)$, the posterior probability that
> $\theta > 0$ is
> $$\Phi(1/\sqrt{2}) = 0.76$$
> "**Including this prior decreases the posterior odds of a positive effect from 5:1 to 3:1.**"
>
> The point is not that 84% is high — it is that **the significance framework maps this to "no effect,"
> discarding the 5:1 odds entirely.**

## Main Content

### The Bayesian answer, and three reasons to stop short of it

> [!definition] Propagating the posterior into a decision (Ch. 7.3, p. 131)
> "**From the Bayesian perspective, the answer is clear: take the posterior distribution $p(\theta|y)$ and
> propagate it as necessary to any decisions.**"
>
> **The A/B example.** Treatment A is the status quo, B a marketing idea, $\theta$ the relative dollars
> gained per potential customer under B. The idea applies to $b$ potential customers and costs $c$ to
> implement. Go with B if the expected net gain is positive:
> $$b\,E(\theta|y) - c > 0 \quad \Longleftrightarrow \quad E(\theta|y) > c/b$$
>
> **The three assumptions this rule requires, stated explicitly:**
> 1. **Stakes are small enough for expected monetary value.** "If your company is making many small
>    independent decisions, none of which has an extremely variable outcome, **the total effect on the
>    bottom line will be approximately the sum of their expected values, from the law of large
>    numbers.**"
> 2. **No other known or predictable outcomes** — "as would arise, for example, if acting on this
>    marketing idea would **preclude the development or implementation of other, potentially better,
>    innovations**; or, conversely, if implementing the idea would **open the door to further
>    developments.**" So $c$ "is intended to represent the **net** cost of implementation, including
>    expected opportunity costs or benefits."
> 3. **The model is an approximation.** "**Even the discussion of a 'treatment effect' $\theta$ is a
>    simplification, as real effects will depend on situations which change over time.**"
^def-expected-value-rule

> [!important] Three legitimate reasons to separate inference from decision (Ch. 7.3, pp. 131-132)
> "It is common practice to use the statistical information obtained about $\theta$ to make an inferential
> summary **without reference to the ultimate decision problem.**"
>
> 1. **Costs and benefits might be unknown** — "rather than propagating uncertainty all the way to the end
>    of the process it makes sense to pause and just say what is known about $\theta$."
> 2. **Outcomes can be multidimensional** — "as when considering a new medical treatment that is expensive
>    but could save lives. **Ultimately we do think it can make sense to put dollars and lives on a common
>    scale** (Lin et al. 1999), **but we will generally be interested in the estimated costs and benefits,
>    not just in the decision recommendation.**"
> 3. **Different people do different jobs** — "the experimenters, data analysts, and decision makers could
>    be three different groups of people, in which case **the job of the statistician is to aid in design
>    and analysis and then to stop and supply the necessary information for others to make the
>    decision.**"
>
> The third reason is "related to the idea of **multiple imputation**, in which missing data are imputed
> **without direct reference to the purpose for which the completed datasets will be used**" (Meng 1994;
> Rubin 1996). See [[Missing Data Models]].

### Against classical thresholding

> [!warning] Two well-known problems with significance-based decisions (Ch. 7.3, p. 132)
> Classical thresholding: if $|\hat\theta|/s > 2$, act as if the point estimate is the true effect;
> otherwise act as if it is zero.
>
> 1. **"Selection on statistical significance leads effect sizes to be overestimated"** — **type M**
>    (magnitude) errors (Gelman and Carlin 2014).
> 2. **"It throws away information to ignore results that do not cross the significance threshold"** — "as
>    discussed above, **even an estimate that is only 1 standard error from zero, and thus easily
>    explainable by chance, can still correspond to a high probability of identifying the sign of the
>    effect.**"
>
> **"Using the posterior mean as a point estimate avoids these problems."**

> [!warning] But the naive Bayesian threshold is *too strict*
> "A natural Bayesian counterpart to classical thresholding would be to declare 'statistical significance'
> or 'high confidence' **if the posterior mean is more than 2 posterior standard deviations away from
> zero.**
>
> **The problem here is that, to the extent you believe your posterior distribution, this threshold is
> very strict, corresponding to at least a 97.5% posterior probability of getting the correct sign. Even
> if $|E(\theta|y)|/\text{sd}(\theta|y) = 1$, the posterior odds are still 5:1 of identifying the sign of
> $\theta$ correctly.**
>
> **Decades of classical estimates have trained us to distrust point estimates, but such distrust is not
> necessarily appropriate for inferences that have already been partially pooled.**"
>
> This is subtle and easy to miss: the *reason* classical point estimates deserve distrust is that they
> are unregularized. A partially pooled posterior mean has already had the exaggeration removed — see
> [[Constructing Priors for Effect Sizes#The stakes: exaggeration factors]].
^wrn-bayesian-threshold

> [!important] The recommendation: present everything (Figure 7.9)
> "**In general we recommend presenting all estimates of potential interest, along with uncertainties,
> rather than selecting based on a cutoff of any kind. Bayesian inferences account for uncertainty, and
> let's take advantage of that.**"
>
> Figure 7.9 shows two designs for displaying many posterior estimates and uncertainties on a single plot
> (from Gelman and Margalit 2021, and Mitchell, Gelman, Ross, et al. 2018).
>
> "**Larger studies could require a more elaborate series of graphical displays, but we believe this would
> be worth the effort, as compared to the usual practice of partially reporting results based on
> thresholds.**"

## Examples

> [!example] ORBITA — reanalyzing a "null" heart-stent trial (Al-Lamee et al. 2017; Ch. 7.3, pp. 132-134)
> **The published result.** An estimated increase in treadmill time of **16.6 seconds, se 12.7**,
> $p = 0.20$ — "**not 'statistically significant'** and was thus reported as a null finding, to the extent
> that people expressed surprise that the treatment was ineffective. For example, a news report
> characterized the result as '**unbelievable … stunned leading cardiologists by countering decades of
> clinical experience.**'"
>
> **The improved analysis.** "The statistical analysis in the published paper was **statistically
> inefficient.**" After correction (Gelman, Carlin, and Nallamothu 2019): estimate **21.3**, se **12.6**,
> $p = 0.09$.
>
> **The even-handed reading of the $p$-value:**
> - *On one hand,* "the significance level does imply that an estimate this large **would not be a
>   surprise even in the absence of any effect**; that is, the magnitude of the estimate, relative to its
>   uncertainty, is compatible with there being no effect."
> - *On the other hand,* "**the estimated effect is positive. The data are more compatible with a positive
>   effect than a negative effect; moderately large positive effects are compatible with the data, whereas
>   any compatible negative effects would be very small.**"
>
> **Two reference points for judging the magnitude — both essential to the interpretation:**
> 1. **Against the outcome's own spread.** Mean pre-treatment treadmill time was **506 seconds**, sd
>    **188**. So 21.3 is "approximately **one-tenth of a standard deviation**, which is **not a huge shift
>    in the distribution but can be meaningful for a treatment that represents one component of a larger
>    regimen and is not intended singlehandedly to resolve a medical condition.**"
> 2. **Against the design.** "The study was designed to have sufficient power to detect an effect of **30
>    seconds**, which is a bit less than the benefits estimated from **single anti-anginal agents**." This
>    gives a natural three-way partition of the parameter space.
>
> **Analysis 1 — flat prior** (reproducing the classical analysis):
> $$\theta \mid y \sim \text{normal}(21.3,\ 12.6)$$
>
> | Region | Posterior probability |
> |---|---|
> | Effect **negative** | **5%** |
> | Effect **between 0 and 30 s** | **71%** |
> | Effect **greater than 30 s** | **24%** |
>
> "**Using this default analysis, it seems fair to conclude that the experiment shows a positive effect
> for stents in this setting, although the effect is most likely small and lower than was hoped.**"
>
> **Analysis 2 — the Cochrane meta-analytic prior** (van Zwet and Gelman 2022; see
> [[Constructing Priors for Effect Sizes]]):
> $$\theta/s \sim 0.42\,\text{normal}(0, 1.5) + 0.58\,\text{normal}(0, 3.5)$$
> "If we assume that **the standard error provides no additional information about the effect size**, we
> can combine the prior with the normal likelihood to yield a normal-mixture posterior, **although the
> weights will no longer be 0.42 and 0.58. Rather than working out the algebra, we simply combine the
> distributions in Stan and simulate.**"
>
> | Region | Posterior probability |
> |---|---|
> | Effect **negative** | **0.07** |
> | Effect **small (0-30 s)** | **0.80** |
> | Effect **moderately large (>30 s)** | **0.13** |
>
> **The conclusion:** "**So if considered as a sample from the experiments in the Cochrane database, the
> results again assign the highest probability to a small positive effect. We think this would be a better
> summary than the statement in the published paper that the treatment 'did not increase exercise time by
> more than the effect of a placebo procedure'**" — consistent with Kass (2011) on interpreting statistical
> inferences pragmatically in light of their assumptions.
>
> **Note how little the two priors differ in conclusion.** Both say "small positive effect, most likely."
> The informative prior mainly shifts mass from ">30 s" to "0-30 s" — it regularizes the optimistic tail,
> not the sign.

### Different perspectives on modeling and prediction (§7.4)

> [!definition] Three inferential goals (Ch. 7.4, p. 134)
> | Perspective | Goal | When computation can stop |
> |---|---|---|
> | **Traditional statistical** | Accurately summarize the posterior for a model chosen ahead of time | "**as long as necessary to reach approximate convergence**" |
> | **Machine learning** | **Prediction, not parameter estimation** | "when **cross validation prediction accuracy has plateaued**" |
> | **Model exploration** | Trying out a series of models, "**many of which will have terrible fit to data, poor predictive performance, and slow convergence**" | approximations are attractive — but see the caveat |
>
> **What each implies:**
> - *Traditional:* "**run computation for a long time, using approximations only when absolutely
>   necessary.** Another way of saying this is that in traditional statistics, **the approximation might be
>   in the choice of model rather than in the computation.**"
> - *Machine learning:* "**pick an algorithm that trades off predictive accuracy, generalizability, and
>   scalability**, so as to make use of as much data as possible within a fixed computational budget."
> - *Model exploration:* "we want to cycle through many models, which makes approximations attractive.
>   **But there is a caveat: if we are to efficiently and accurately explore the model space rather than
>   the algorithm space, we require any approximation to be sufficiently faithful as to reproduce the
>   salient features of the posterior.**"
>
> **What the distinction is *not*:** "**The distinction here is not about inference vs. prediction, or
> exploratory vs. confirmatory analysis. Indeed all parameters in inference can be viewed as some
> quantities to predict, and all of our modeling can be viewed as having exploratory goals** (Gelman
> 2003). **Rather, the distinction is how much we trust a given model and allow the computation to
> approximate.**"
^def-three-perspectives

> [!important] Why problems seem obvious only in hindsight
> "As we illustrate with the case studies in Chapters 25 and 30, **problems with a statistical model often
> seem obvious in hindsight, but we need the workflow to identify them and understand the obviousness.**
>
> Another important feature of these examples … is that **particular challenges in modeling arise in the
> context of the data at hand: had the data been different, we might never have encountered these
> particular issues, but others might well have arisen. This is one reason that subfields of applied
> statistics advance from application to application, as new wrinkles become apparent in existing
> models.**"

## Connections

- The three perspectives of §7.4 are the framing for
  [[Approximate Algorithms and Approximate Models]] (Ch. 13): which approximations are acceptable depends
  on which perspective you occupy.
- The type M / type S vocabulary is developed in
  [[The Replication Crisis and Multiple Levels of Variation]] and simulated in Exercise 7.2 of
  [[Causal Inference as Generalization]].
- A full worked decision problem, with an explicit loss function, is
  [[Using a Fitted Model for Decision Analysis - Classification Competition]] (Ch. 20).

## See Also
- [[Causal Inference as Generalization]] — producing the posterior this section acts on
- [[Constructing Priors for Effect Sizes]] — where the Cochrane prior comes from
- [[Decision Analysis]] — BDA3's treatment, including institutional decision analysis
- [[Point Estimates and Uncertainties]] — the summaries recommended in place of thresholds
