---
title: "Statistical and Computational Workflow for Bayesians and Non-Bayesians"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Appendix A, pp. 485-490"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Appendices"
doc_type: textbook
depends_on:
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[Why Bayes - Benefits, Costs, and Borders]]"
  - "[[Varieties of Bayesian Theory]]"
used_by:
  - "[[Software Assisted Workflow]]"
aliases:
  - Appendix A
  - Workflow for non-Bayesians
  - Non-Bayesian workflow
---

# Statistical and Computational Workflow for Bayesians and Non-Bayesians

> [!summary]
> Appendix A argues that **every key idea in the book has a non-Bayesian counterpart** and should be part of any statistical or machine-learning workflow. Prior information, information pooling, regularization, uncertainty propagation, predictive checking, model sequences, initialization, simulated-data validation, and goal-awareness are not Bayesian luxuries — they are general workflow requirements that Bayesian machinery merely makes explicit. The recurring move: name the Bayesian construct, then name what plays its role when there is no prior.

## Overview

The appendix walks through the book's key workflow ideas one at a time and asks, for each, what it looks like outside a fully Bayesian framework. The point throughout is **not to match each non-Bayesian method to a Bayesian model**, but to show that the underlying problem is common to both and that the diagnostic tools transfer.

## Main Content

### A.1 Use of prior information

**In Bayesian inference**, prior information enters in far more places than the prior distribution:
- the **specification of the data model** — linearity, a functional form such as the logistic, the structure of a neural network or Gaussian process;
- assumptions about **dependence** in time series, spatial data, and other structures;
- the choice of **families of probability distributions**.

Whether chosen for relevance to the problem or as conventional/default choices, these all **correspond to prior information — equivalently, a partial specification of the class of problems to which the model would be applied.**

**In non-Bayesian methods**, prior knowledge enters through:
- **design and sample size**, chosen by balancing cost against a prior assessment of possible effect sizes and the scale of variation;
- the choice of **transformations, regression predictors, error distribution**, and other model content;
- **what is considered data to be analyzed at all**;
- **structural choices** such as the depth and number of nodes of a network, and **tuning parameters for regularization**.

### A.2 Combining information from multiple sources

> [!tip] The virtue of hierarchical modeling, stated without jargon
> Different sorts of data can be modeled with **different data distributions conditional on a shared set of parameters**, which can in turn be allowed to vary. Partial pooling means **the analysis need not choose between no pooling (analyzing each source separately) and complete pooling (denying the difference between sources)**. This allows combining data from different experiments, scenarios, places, and times. Example: Weber et al. (2018) fit a pharmacokinetic model with informative priors to partially pool parameter inferences for **two different but related drugs**.

Non-Bayesian counterparts:
- **discrete rules** — e.g. combining datasets when their estimated parameters are not statistically significantly different;
- **hierarchical models fit non-Bayesianly** — e.g. marginal maximum likelihood estimates of the hyperparameters;
- **factor analysis** for data not on the same scale or with different measurement biases.

**Whatever the framework, the problem of combining sources is important, and leave-one-out predictive evaluation and simulation-based calibration checking should apply.**

### A.3 Regularization

When data are sparse — or, for complicated models, **locally sparse**, meaning not highly informative about particular parameters — inferences must be regularized: constrained in some way to ensure stability.

| Framework | Mechanism |
|---|---|
| Bayesian | **The prior distribution**, a soft constraint keeping parameter inferences close to their priors. Can conflict with the likelihood (see [[Tail Behavior and Prior-Likelihood Conflict]]). |
| Non-Bayesian | **A penalty function.** Penalized maximum likelihood **is** posterior mode estimation. Other methods with Bayesian interpretations: **wavelet shrinkage** (Donoho and Johnstone 1994; Chipman, Kolaczyk, and McCulloch 1997) and **dropout in deep learning** (Srivastava et al. 2014; Gal and Ghahramani 2016). |

> [!definition] The three alternatives to regularization
> 1. **Use unregularized estimates** that are too noisy to be useful.
> 2. **Simplify the model** — an extreme form of regularization in which some parameters are constrained to be *exactly* zero.
> 3. **Include more data** — a form of regularization in which any systematic differences between old and new data are assumed to be *exactly* zero.
^def-regularization-alternatives

### A.4 Using simulations to capture uncertainty

> [!warning] The book's workflow is not fully Bayesian, by design
> A defining characteristic of Bayesian inference is that **all** uncertainties are modeled probabilistically. From that perspective this workflow is not fully Bayesian: it operates in a framework that **does not assume we have enumerated all possible models of the data**, and it **does not usually make sense to compute posterior probabilities of different candidate models** (Chapter 7 of *Bayesian Data Analysis*). Instead, uncertainty about model choice is expressed by **predictive model averaging — Bayesian stacking** (Yao, Vehtari, Simpson, et al. 2018a; see [[Stacking and Predictive Model Averaging]]).

Inferences are still summarized by simulations, which "represent a sort of **pseudo-posterior distribution**" that propagates to give uncertainty about any summary of parameters or predictive quantities.

**Non-Bayesian versions of the same move:**
- Simplest: take the **point estimate** of $\theta$ plus an estimate of the **Fisher information** (for many models, the negative second-derivative matrix of the log likelihood), then **draw from the corresponding multivariate normal** as a pseudo-posterior. Under certain conditions (Appendix B of *BDA*) this is **asymptotically Bayesian**.
- **But in many settings the posterior is not approximately normal**, and uncertainty quantification from a point estimate and information matrix will fail. Then there are non-Bayesian methods based on **approximating the marginal likelihood** (Pinheiro and Bates 2000; Rue, Martino, and Chopin 2009b).
- Reframing: in non-Bayesian workflow, **simulation or bootstrapping is not an expression of uncertainty but a computational tool to construct approximately calibrated inferences** (Krinsky and Robb 1991; DiCiccio and Efron 1996).

### A.5 Prediction, generalization, and causal inference

**The aims of inference are not always the same as the parameters in the model.** For a regression $p(y|x,\theta)$:

- **Prediction** for a new $\tilde x$: for each draw $\theta^s$, $s = 1,\ldots,S$, sample $\tilde y^s \sim p(\tilde y \mid \tilde x, \theta^s)$ and collect $S$ simulations of $\tilde y$.
- **Generalization** to a new population: identical, except $\tilde x$ is a vector of length $\tilde N$ giving predictor values in the target population, yielding an $S \times \tilde N$ matrix of simulations.
- **Causal inference:** the same structure, but interested in **differences of counterfactuals** — for binary treatment $z$, the causal effect for a new item is $\tilde y^1 - \tilde y^0$.

> [!definition] Population average treatment effect (PATE)
> $$
> \text{PATE}^s = \frac{1}{\tilde N}\sum_{i=1}^{\tilde N}\left(\mathrm{E}(y \mid x = \tilde x_i, z = 1, \theta^s) - \mathrm{E}(y \mid x = \tilde x_i, z = 0, \theta^s)\right) \tag{A.1}
> $$
> where $\tilde x_i$, $i = 1,\ldots,\tilde N$, are predictor values in a population assumed large enough that only the *expected* outcome matters. **The $S$ posterior draws $\theta^s$ propagate to $S$ values of $\text{PATE}^s$**, taken as draws from the posterior distribution of the treatment effect. This assumes the measurement and data-collection process allows causal identification; the focus here is on the challenges of **generalization** within that context.
^def-pate-appendix

> [!warning] Only in the simplest models is the treatment effect a coefficient
> For simple models such as **linear regression with no interactions**, the PATE is a single coefficient. **More generally (A.1) must be calculated from the fitted model.**

**Why this matters outside Bayes:** we often want inferences for **functions of parameters, observed data, and latent data**, which requires propagating uncertainty. In settings with **nonlinearity and dependence of predictive quantities**, you cannot simply plug in point estimates, nor combine standard errors of parameters and predictions to get uncertainties for derived quantities. **So even in a non-Bayesian context it makes sense to use predictive simulations from some proxy for a posterior.**

### A.6 Visualizing model checking and model fit

Statistical inference is traditionally framed **unidirectionally**: you are given a model or procedure, which is then fit to data. In practice **models are at best approximations and at worst the product of unthinking habit or convention**, so their fit — and the sense of the resulting inferences and predictions — must be checked.

> [!tip] The goal is not to reject
> "The goal here, whether in a Bayesian or non-Bayesian context, is **not to 'reject' null hypotheses — we know ahead of time that just about all of our models are wrong** — but rather to explore their problems." The most useful diagnostic tools are therefore **not $p$-values or other numerical summaries but graphs that display data in comparison to fitted models**, following Tukey (1977), Box (1980), and Rubin (1984).
>
> Sometimes the comparison is **implicit** — a residual plot should ideally be patternless with zero average and no trend — and other times it helps to **directly juxtapose graphs of observed and simulated data**.

**The non-Bayesian obstacle and its workaround:** non-Bayesian methods typically do not employ fully generative models. With a data model $p(y|\theta)$ but no prior $p(\theta)$, predictive simulations must be **conditional on a point estimate of $\theta$ or on a distribution representing parameter uncertainty**. Bayesian methods of generative simulation and predictive comparison can thus serve a non-Bayesian purpose: **finding problems with model fit.** Indeed, **exploratory data analysis generally can be enhanced by explicit generative models** (Gelman 2003, 2004a; Hullman and Gelman 2021). **Predictive model evaluation should be part of any statistical workflow.**

### A.7 Fitting a sequence of models rather than focusing on just one

Statistical and machine learning theory focus on fitting — and perhaps checking — **one model at a time**; when multiple models are fit, the goal is typically to pick one or average over them. The appendix instead emphasizes that **models exist in relation to each other**.

Canonical model sequences:
- regressions with predictors added one at a time
- pharmacology models with one, two, three, or more **compartments**
- mixture models with increasing numbers of components
- multilevel models in which more and more parameters are allowed to vary
- adding dimensions to a factor analysis

> [!definition] Five reasons to start simple and add complexity one step at a time
> 1. **Simpler models are typically easier to understand.** *Not always* — when predicting an outcome constrained to $[0,1]$, a nonlinear S curve with asymptotes can be easier to parse than a linear regression with boundary issues — but typically fewer parameters and simpler functional forms are easier to interpret.
> 2. **Complicated models are best understood in relation to simpler special cases.** Start from a comparison of treatment and control averages, then account for pre-treatment variables one at a time, and **see what each additional adjustment does to the estimated causal effect**.
> 3. **The comparison is valuable in itself.** It is useful to know that the treatment group was older than the control group and that the treatment benefit appeared larger after adjusting for age. Even something as simple as age adjustment can be tricky (Gelman and Auerbach 2016).
> 4. **You may reach a model that fits well and does the job** — at which point it helps to **add a bit more complexity just to show the extra step is not necessary.**
> 5. **Computational benefit.** Simpler models are often easier to fit — *although not always: adding hierarchical structure can enhance computational stability and improve posterior geometry* — and once one model is fit, **its inferences can serve as a starting point for the next**.
^def-model-sequence-reasons

**"Even if you are not thinking of your model or method in terms of priors and posteriors, we think it should be valuable for your data-analytic workflow to include bridges between models of varying complexity."**

### A.8 Initial values and tuning parameters

- **Initial values** — the values of $\theta$ used to start the computation, which **can often be chosen based on inferences from simpler versions of the model**.
- **Tuning parameters** — the algorithm's settings (in HMC: **step size, mass matrix, and number of steps per iteration**), which themselves must be initialized and are then tuned during adaptation/warmup.

> [!warning] Initialization is part of the workflow, not an implementation detail
> "It is appealing for fitting algorithms to run entirely on their own. Unfortunately, **initial values can matter, even in simple optimization problems**." For problems where default initialization does not work, **starting points must be included in publicly available code for reproducibility.** As algorithms become more complicated they require more care in tuning — again, start from values that already worked with simpler versions of the model. **This applies to non-Bayesian computation too.**

### A.9 Simulated-data experimentation

Computation fails in many ways — **programming errors, nonidentified models, and difficult geometry** that makes it hard for HMC or other algorithms to traverse the target. The requirement is not just that an algorithm works *in general* (converging in reasonable time with computational stability) but that **it works for the particular model and data at hand**.

> [!definition] The SBC symmetry, stated compactly
> Draw a "true value" $\theta^{\text{true}}$ from the prior $p(\theta)$; simulate hypothetical data $y$ from $p(y \mid \theta^{\text{true}})$; draw posterior simulations $\theta^{\text{post}}$ from $p(\theta \mid y)$ — **that last step is typically the most challenging.** Repeated many times, **the joint distribution $p(\theta^{\text{true}}, y, \theta^{\text{post}})$ should be symmetric in $(\theta^{\text{true}}, \theta^{\text{post}})$**: identical whether computed forward or backward.
^def-sbc-symmetry

> [!warning] Why the exact analogue fails without a prior
> With no prior distribution there is **no joint distribution of data and parameters**, hence **no extended distribution $p(\theta^{\text{true}}, y, \theta^{\text{post}})$**. The non-Bayesian substitute: **fix $\theta^{\text{true}}$ at a value** — not drawn from a nonexistent prior — simulate $y \mid \theta^{\text{true}}$, perform inference on $\theta$, repeat many times, and **evaluate the statistical properties of the inferences**: check that unbiased estimates have the correct expected value under simulation, and that confidence intervals attain **nominal coverage**.
>
> **Limitation:** except asymptotically or for very simple models, these properties are only approximate **and depend on the true parameter values**, so the checks must be run for several reasonable choices of $\theta^{\text{true}}$.
>
> **Even so:** "Being able to **recover true parameter values under ideal conditions is a minimum requirement of any inferential computation**, and simulation is a general way to check this."

### A.10 Understanding methods by applying them to multiple problems

Applied data analysis should follow the principles of scientific investigation — hypothesizing, data collection, evaluation — but with everything shifted one level up:

| Scientific element | Its workflow counterpart |
|---|---|
| Hypotheses | **Workflow conjectures**, not statistical assumptions. Not "the data are normally distributed," "the relation is linear," "the effect is zero," but **"a linear regression model will be good enough for this problem," "Stan will fit this model in reasonable time," "existing data will give us sufficient accuracy for our current inferential goals."** |
| Data collection | **Simulations and inferences**, not collection of actual measurements |
| Evaluation | **Checks that our fitting procedures are working as they are supposed to** |

"For all but the simplest problems, data analysis is an iterative procedure involving many tries of constructing statistical models to approximate the underlying processes of interest, and a fair amount of experimenting to see what will work with the data at hand and where new information is needed."

> [!tip] Every method will be applied many times
> Any statistical method **will be applied many times — or we should at least consider the possibility that this could happen.** This is asserted not only from the standpoint of textbook writers and software developers (for whom defaults and repeated use are assumed) but **as applied researchers.**
>
> **The frequentist/Bayesian symmetry here:** the concept of **frequency properties** implies a **"reference set" of problems** for which the procedure will be used; the Bayesian counterpart is **the prior distribution, representing an ideal population of true parameter values** (Gelman 2018a). **Either way there is an implicit population and implicit replications.**
>
> The practical consequences: simulate replicated data under various assumptions and re-fit; think of any statistical procedure **not just as producing a one-time estimate but as a mapping from data to inferences**. One motivation for understanding the influence of data and priors (or, non-Bayesianly, external constraints) is **wanting to know how our methods will work in other settings**. "**The best way to get something to work once is to frame it as a more general problem.** Also, working on more problems helps each of us develop our own statistical workflow."

### A.11 Awareness of goals

> [!tip] "To know the past, one must first know the future." — Smullyan (1979)
> **The statistical application: design and data collection should be aligned with how you plan to analyze your data** (Gelman 2024a).

The worked illustration: with a random sample of $(x,y)$ from a population where $x$ is uniform on $[0,1]$, you can get a good estimate of the **average linear regression of $y$ on $x$ in that interval** and, with a large enough sample, **some sense of departures of $\mathrm{E}(y|x)$ from linearity**. **Extrapolating beyond this range requires more assumptions** — expressed as priors, variation bounds, or restrictions on functional forms. **Similar issues arise when estimating interactions.** The goals of the analysis determine where more modeling and data-analysis effort is appropriate.

## Connections

Read as a table, the appendix is a translation dictionary:

| Bayesian construct | Non-Bayesian counterpart |
|---|---|
| Prior distribution | Design/sample-size choices, transformations, network depth, regularization tuning parameters |
| Hierarchical partial pooling | Discrete combination rules, marginal MLE hyperparameters, factor analysis |
| Prior as soft constraint | Penalty function; penalized MLE = posterior mode; wavelet shrinkage; dropout |
| Posterior draws propagating uncertainty | Point estimate + Fisher information → multivariate normal pseudo-posterior; marginal-likelihood approximations; bootstrap as calibration device |
| Posterior predictive checks | Predictive simulation conditional on a point estimate; residual plots; EDA with explicit generative models |
| Model expansion sequence | Bridges between models of varying complexity |
| SBC symmetry of $p(\theta^{\text{true}}, y, \theta^{\text{post}})$ | Fix $\theta^{\text{true}}$, check bias and nominal coverage across many replications |
| Prior as population of true parameter values | Frequency properties' "reference set" of problems |

The two conceptual frames that recur: **there is always an implicit population and implicit replications**, and **inference targets are usually functions of parameters and data, not parameters themselves** — which is why simulation-based propagation is unavoidable in either framework.

## See Also
- [[Why Bayes - Benefits, Costs, and Borders]] — the book's own accounting of what Bayes buys and costs
- [[Varieties of Bayesian Theory]] — the philosophical positions this appendix stays neutral between
- [[There Is No Safe Haven]] — why non-Bayesian methods carry assumptions too
- [[From Inference to Data Analysis to Workflow]] — the master workflow diagram these sections summarize
- [[Prior Distributions]] — regularization as prior specification
- [[Stacking and Predictive Model Averaging]] — the alternative to posterior model probabilities
- [[Causal Inference as Generalization]] — the fuller treatment of PATE and generalization
- [[Posterior Predictive Checking]] — the graphical checking philosophy of §A.6
- [[Model Expansion - Predictive Consistency and Coherence]] — the sequence-of-models principle
- [[Initial Values, Adaptation, and Warmup]] — initialization and tuning in detail
- [[SBC in the Workflow]] — the symmetry of §A.9 in full
- [[Designing Simulated-Data Experiments]] — the practice §A.10 recommends generalizing
- [[From Inference to Decision]] — goal-awareness as it shapes analysis
- [[How to Get the Most Out of Bayesian Data Analysis]] — the companion appendix
