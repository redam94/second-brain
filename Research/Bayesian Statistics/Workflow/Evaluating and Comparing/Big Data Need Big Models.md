---
title: "Big Data Need Big Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9 intro and 9.1, pp. 157-159"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Choosing an Initial Model]]"
  - "[[Poststratification]]"
  - "[[Joint Priors and Covariance Matrices]]"
used_by:
  - "[[Topology of Models]]"
  - "[[Model Expansion - Predictive Consistency and Coherence]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Big data is messy data"
  - "Why iterate - four reasons"
  - "Model building as a language-like task"
---

# Big Data Need Big Models

> [!summary]
> The opening argument of the model-comparison chapter, and a direct rebuttal of a common belief:
> **"It is frequently assumed that big data can alleviate the need for careful modeling. We do not
> believe this is the case."** Big data is observational, proxy-based, and messy, so extrapolating from
> it requires *more* adjustment, not less — which requires regularization, latent-variable modeling,
> and missingness/measurement-error models. The section closes with **four reasons to build models
> iteratively**, two of them about human cognition and software practice rather than statistics.

## Overview

> [!important] Model building as a language-like task (Ch. 9 intro, p. 157)
> "**Model building is a language-like task in which the modeler combines existing finite components**
> (linear, logistic, and exponential functions; additive and multiplicative models; binomial, Poisson,
> and normal distributions; varying coefficients; and so forth) **in order to express an infinite amount
> of new data, features of existing data, or ideas about underlying processes.**"
>
> "In textbook treatments of statistics, **the data model is typically just given.** In applications,
> though, we want to set up a data model based on some combination of **fit to the data** (as found in
> posterior predictive checks) and **domain expertise. If the model is being chosen from a small menu,
> we would like to at least be transparent about that.**"

> [!important] What usually matters most in a data model
> "**Often the most important part of the specification of the data model is not its distributional form,
> but how the data are linked to underlying parameters of interest.**"
>
> *Example:* "in election forecasting, our model for polls includes terms for **nonsampling error for
> individual polls and for polling averages**" (Shirani-Mehr et al. 2018).

> [!important] Finite data, finite information
> "**Given finite data, there is a finite amount of information available. Thus simple model components
> can be sufficient, since we are not able to learn more complex features.**
>
> For example, we often use a **linear model when deviations from the linearity in the data range are
> small compared to the unexplained variation**, and we often use the **normal distribution when we are
> not concerned about predictions in the far tails.**"

> [!warning] Pre-processing makes every generative model an approximation
> "**Data are typically pre-processed before they come to us, so that any generative model is necessarily
> an approximation.** This can arise in **meta-analysis** or in settings where **many predictors have been
> combined into one or two numerical summaries using a machine learning algorithm or another
> dimensionality reduction technique.**
>
> As always, we need to be concerned about data quality, and this affects Bayesian workflow in that **it
> can make sense to expand a model to allow for systematic and varying error**" — see Ch. 25.5.

**Where model expansion comes from.** "Model expansion can come in response to **new data, failures of
models fit to existing data, or computational struggles with existing fitting procedures.**" The election
forecast (Gelman, Hullman, et al. 2020) started from Linzer's (2013) poll-aggregation model and was
expanded in 2016 "in response to prediction failures in certain swing states, which we attributed to
**poor modeling of correlations of vote swings between states**, along with **nonsampling errors in the
polls**" (Gelman and Azari 2017).

## Main Content

### Adding parameters means relaxing a prior

> [!definition] Model expansion as prior relaxation (Ch. 9.1, p. 157)
> "A key part of Bayesian workflow is expanding a model to make use of more data. This can be as simple
> as adding regression predictors — **but when more parameters are added, it can be necessary to assume
> that not all of them can have a big effect in the model at the same time.**
>
> **One way to see this is to consider the addition of a parameter as a relaxation of a prior distribution
> that was previously concentrated at zero.**"
>
> *Example:* "we expanded the election model … to account for **political polarization** by adding
> interaction terms to the regression, **allowing the coefficients for the national economic predictor to
> be lower in recent years.**"
^def-expansion-as-relaxation

### Why big data need bigger models

> [!warning] The rebuttal (Ch. 9.1, p. 158)
> **"It is frequently assumed that big data can alleviate the need for careful modeling. We do not
> believe this is the case."**
>
> - **"Quantity does not always substitute for quality, and quality and quantity are very often
>   negatively associated."**
> - **"Big data is messy data."**
> - **"Big data prioritizes availability over randomization, which means big data is almost always
>   observational rather than from designed experiments."**
> - **"Big data frequently uses available proxies rather than direct measurements of underlying constructs
>   of interest."**
>
> "**To make relevant inferences from big data, we need to extrapolate from sample to population, from
> control to treatment group, and from measurements to latent variables**" — the three core tasks of
> [[Poststratification#The three core tasks of statistics]]. "**All these steps require statistical
> assumptions and adjustment of some sort.**"
>
> *The worked path:* "we might fit a **multilevel model** for data given respondents' demographic and
> geographic characteristics and then **poststratify** to connect the predictions to the goal of inference
> about the general population."
^wrn-big-data-messy

> [!important] The technical barrier, and the two things needed to get past it
> "**Each of these steps of statistical extrapolation should be more effective if we adjust for more
> factors — that is, include more information — but we quickly reach a technical barrier. It is unlikely
> that many independent factors would have a big effect** (Tosh et al. 2025 — the
> [[Joint Priors and Covariance Matrices#The piranha principle|piranha principle]])**. Models that adjust
> for many factors can become hard to estimate, and effective modeling requires:**
> **(a) regularization** to get more stable estimates — "**and in turn to allow us to adjust for more
> factors**";
> **(b) modeling of latent variables** (for example parameters that vary by person when modeling
> longitudinal data), **missingness, and measurement error.**"
>
> Note the circularity that makes (a) essential rather than optional: **regularization is what makes it
> possible to adjust for more factors, and adjusting for more factors is what big data requires.**

> [!important] The model emerges from the application
> "**A key part of Bayesian workflow is adapting the model to the data at hand and the questions of
> interest. The model does not exist in isolation and is not specified from the outside; it emerges from
> engagement with the application and the available data.**"

### Combining data sources of different kinds

> [!example] Fitting a model to individual *and* aggregate data (Weber et al. 2018)
> "It sometimes happens that we have **two forms of measurement of similar data**, thus requiring a
> generative model for both data sources. Sometimes this creates technical challenges, as when we are
> - **combining direct measurements on a sample with population summary statistics**,
> - **integrating measurements of different quality** (Lin et al. 1999),
> - or when **information is available on partial margins of a table** (Deming and Stephan 1940).
>
> **The pharmacological case.** "We fit a pharmacological model with **direct data for a set of patients
> taking one drug but only average data for a set of patients that had received a competitor's product.
> In order to avoid the computational cost of modeling as latent data the outcomes of all the averaged
> patients, we devised an analytic method to approximate the relevant integral so that we could include
> the averaged data in the likelihood function.**"
>
> The pattern is worth noting: rather than treat the aggregated patients' outcomes as thousands of latent
> variables, **integrate them out analytically** — the same move as the censoring integral in
> [[A Data Model Is Not Just a Likelihood]], with the same cost (the resulting likelihood no longer
> displays its data model).

### Four reasons to build models iteratively

> [!definition] Why iterate, given humans and computers (Ch. 9.1, pp. 158-159)
> "**In the ideal world, we would build one perfect model and solve the math. In the real world we need to
> take into account the limitations of humans and computers, and this should be included in models of
> science and models of statistics**" (Navarro 2019; Devezer et al. 2020).
>
> **1. Cognitive.** "**Our limited cognitive capabilities make it easier to learn gradually. Iterative
> model building starting from a simple model is gradual learning and helps us better understand the
> modeled phenomenon. Models can be understood as measurement instruments probing the data, and simpler
> models can produce useful information.**"
>
> **2. Economic.** "**Building a rich model takes effort, and it can be efficient in human time to start
> from a simpler model and stop when the model seems to be sufficiently good.** One goal of workflow is to
> make the process easier for humans, **even in the idealized setting where exact computation can be
> performed automatically.**"
>
> **3. Computational.** "**Given a proper posterior, computation in Bayesian inference is theoretically
> solved. In practice, we must contend with finite computational resources. An algorithm for which
> asymptotic guarantees exist can fail when run for a finite time. There is no fully automated computation
> that yields perfect results, at least not across the vast range of models practitioners care about.**
> … **It is easier to understand computational challenges when there are fewer moving parts. Hence, even
> if a mathematical description of a model is given, correctly implementing the model tends to require
> iteration.**"
>
> **4. Software-engineering.** "**The complexity of complicated computational models makes it difficult for
> the human user to disentangle computational concerns, modeling issues, data quality problems, and bugs
> in the model code. By building models iteratively, we can employ good software development practices —
> including incremental and iterative processes — in our modeling procedure. Simple model components can
> be checked to make sure they act in an expected way before more complicated components are added.**"
^def-four-reasons-to-iterate

Note that **only reason 3 is about statistics at all.** Reasons 1, 2, and 4 are about the analyst and the
code — the same argument made psychologically in
[[Four Modeling Scenarios#Psychological struggles]] and operationally in
[[Modeling as Software Development]].

## Connections

- "Big data is messy data" is why [[Poststratification]] and [[Causal Inference as Generalization]] belong
  in a workflow book at all: the adjustments they describe are exactly what large observational datasets
  demand.
- The regularization requirement is the applied case for the shrinkage priors of
  [[Global-Local Shrinkage Priors]] and the joint priors of
  [[Joint Priors and Covariance Matrices]].
- The four reasons to iterate are the justification for the whole structure of
  [[From Inference to Data Analysis to Workflow|Figure 2.1]].

## See Also
- [[Topology of Models]] — the structure that iteration navigates
- [[Choosing an Initial Model]] — where the first model in the sequence comes from
- [[Model Expansion - Predictive Consistency and Coherence]] — how to expand without breaking the prior
- [[Modeling as Software Development]] — reason 4, developed at length
