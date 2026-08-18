---
title: "How to Get the Most Out of Bayesian Data Analysis"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/reference
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Appendix B, pp. 491-499"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Appendices"
doc_type: textbook
depends_on:
  - "[[Computational Tools and Probabilistic Programming]]"
used_by:
  - "[[Statistical and Computational Workflow for Bayesians and Non-Bayesians]]"
aliases:
  - Appendix B
  - BDA3 reading guide
  - How to read BDA3
---

# How to Get the Most Out of Bayesian Data Analysis

> [!summary]
> A chapter-by-chapter reading guide to **Bayesian Data Analysis, third edition** (BDA3), marking which sections still matter for learning Bayesian workflow with Stan and which have been superseded. The authors' recurring verdict: **much of the prior-to-posterior algebra in Part I is "if not obsolete, at least not as important as it once was"** now that Stan can fit complicated models directly — but the principles, the counterexamples, and the model-checking chapters remain essential. Includes explicit retractions (the $-2$ multiplier on information criteria, method-of-moments hyperparameter estimation, posterior predictive $p$-values).

## Overview

The authors' thinking about Bayesian statistics is summarized in **BDA3** (Gelman, Carlin, Stern, Dunson, Vehtari, and Rubin 2013) and **Statistical Rethinking**, second edition (McElreath 2020). Rather than repeat BDA3's material, this appendix goes through it chapter by chapter, **pointing out the parts most helpful for learning Bayesian workflow using Stan**.

## Main Content

### B.1 BDA3 Part I: Fundamentals of Bayesian inference

> [!warning] The framing verdict on Part I
> "Much of the material in this first part of BDA3, especially in **Chapters 2, 3, and 5**, concerns **algebra that is, if not obsolete, at least not as important as it once was**. But these chapters also introduce some key principles in the context of simple but realistic examples." The appendix's purpose is to let you "enter the Bayesian way of thinking without getting lost in now-irrelevant details."

#### BDA3 Chapter 1: Probability and inference

"You should read this chapter if for no other reason than **to overwrite various misconceptions you have about probability and Bayesian inference**."

| Section | What it gives you |
|---|---|
| 1.1 | Overview |
| Part of 1.4, **pp. 9–11 only** | Spelling correction example — the mechanics of Bayesian analysis for a discrete problem (three possibilities) and then model extensions, following the **general template of model building, inference, and expansion**. Sections 1.6 and 1.7 give further examples of assigning probabilities using models closely tied to empirical data. |
| 1.5 | Foundations of probability, the authors' pragmatic perspective. Further reading on philosophy: Gelman (2011b), Gelman and Shalizi (2013), Gelman and Hennig (2017). |

> [!definition] BDA3's concise notation, and the confusion it causes
> BDA3 assumes the reader can infer exact meaning from context. **A common confusion: $p(y|\theta)$ is a function of both $y$ and $\theta$**, but is called
> - the **data model / measurement model / sampling distribution** when considered as a distribution of $y$ given $\theta$;
> - the **likelihood** when considered as a function of $\theta$ with $y$ known.
>
> **The likelihood function is an unnormalized probability distribution describing uncertainty related to $\theta$.**
>
> The notation $p(\cdot)$ denotes **both continuous densities and discrete mass functions** — "as the notation would get messy when working with continuous and discrete distributions in the same mathematical expression." **For the same reason, summation over discrete distributions is often presented for simplicity with integrals.**
^def-bda-notation

#### BDA3 Chapters 2 and 3: Single-parameter and multiparameter models

> [!tip] Historical context for the conjugacy algebra
> "Now that we have Stan we can fit complicated models all at once. But back in the early 1990s when we were writing BDA, **each parameter represented an effort**, and we worked as much as possible with **conjugate priors**: models where the posterior distribution can be written analytically."
>
> These chapters "can be mostly thought of as **reference material** where we derive various standard analytic results. Going through the derivations can give insight on **how the updating of uncertainty works** and **basic properties of the most common distributions**."

| Section | Why read it |
|---|---|
| 2.2 | **Posterior as compromise between data and prior** |
| 2.3 | Summarizing posterior inference — "lists some common summaries without discussing how useful they are or when to use them." The present book has a much richer treatment. |
| 2.5 | Prior-posterior calculations with the normal distribution. **"You don't really need to know this stuff, but it's good to know where the derivation is."** |
| 2.7 | **Partial pooling for estimating the rates of a rare cancer** — "one of our favorite examples." |
| 2.9 | **Weakly informative priors** — "our thinking has advanced since this section was written (see Section 5.6), but this is still a good two-page introduction." |
| 3.1 | Averaging over parameters |
| 3.7 | **Simple logistic regression** |

> [!warning] Set aside the method of moments in §2.7
> "Don't obsess about how the posterior distribution is estimated from the data. When this section was written, it was simplest to fit this distribution using the **method of moments**, matching the mean and variance of the empirical distribution of cancer rates to their expectations under the model. **This introduces lots of complications, and it's much easier just to fit the model directly in Stan.**"
>
> Why it is still an excellent example: **it demonstrates the role of the prior distribution and data through a model with data from 3000 counties but a single prior distribution.**

On §3.1: "The math in this short section isn't so relevant, but the general idea could be useful when thinking about multidimensional and marginal distributions. **When working with Monte Carlo draws obtained from a multidimensional distribution, marginalization is simple: it is sufficient to look at the values of the draws only for those dimensions for which the marginal distribution is desired.**"

On §3.7: "a good simple example going through detailed steps of **model building, computation, and inferential summary** — not including model checking and expansion because this particular dataset is so small that there's nothing much to check. The only thing that's missing is **a graph of data and fitted model, but that's something you can do as an exercise**." The computation is "old-fashioned… simple summing over a grid, no mathematical integrals to worry about. **We recommend that you go to the trouble of understanding this computation**, even though in the future you'll be fitting this sort of model directly using a probabilistic programming language such as Stan."

> [!warning] Floating-point accuracy is a Chapter 2 concern, not just a Chapter 10 one
> "Most of the time BDA3 assumes that computations done with the computer just work. Some limitations of computers are discussed in Chapter 10 of BDA3, but **it is relevant already in Chapter 2 to understand that the usual way to store numbers in computers has limited accuracy**, and sometimes care needs to be taken — for example, **performing computations on the log scale as much as possible and then renormalizing and exponentiating at the end**."

#### BDA3 Chapter 4: Asymptotics and connections to non-Bayesian approaches

Asymptotic normality "used to be more important, back when a common method of summarizing a posterior was to compute its mean and curvature." **Three reasons it still matters:**
1. It helps to understand what happens to Bayesian inferences **as more data arrive — while also recognizing where asymptotic approximations fail**.
2. You will often encounter **approximate or non-Bayesian computations** — estimates, standard errors, hypothesis tests — and will want to integrate them into Bayesian thinking.
3. Approximating a posterior by its mode and uncertainty is now rare, **but can be useful as a building block for complicated problems** (BDA3 Ch. 13).

| Section | Reading instruction |
|---|---|
| 4.2 Large-sample theory | "Read the whole section if you can easily follow the math; otherwise **skip any tricky notation and just read the words**." |
| 4.3 **Counterexamples to large-sample results** | **"Read this whole section carefully, including all the math."** |
| 4.5 Bayesian interpretations of other statistical methods | "You'll need to know this too." |

> [!tip] Why the counterexamples matter most
> "Many of these counterexamples describe problems that **also affect pre-asymptotic behavior and (Markov chain) Monte Carlo methods**." That is, they are not asymptotic curiosities — they are the same pathologies that break your sampler.

On §4.2 the authors add a memorable disclaimer: "**we do believe this math is important. It's just not something to worry about when getting started.** It's similar to how you don't need to have much understanding of physics to drive a car, but if you want to start tinkering with your car, or building a new one, you'll want to know more."

#### BDA3 Chapter 5: Hierarchical models

> [!definition] Hierarchical modeling, in one sentence
> In simple Bayesian inference there is a fixed prior representing specific information about a parameter (say $\theta \sim \text{normal}(4.3, 1.2)$) and a fixed data model, combined to yield the posterior. The stumbling block: **we don't always feel comfortable specifying a precise numerical prior, but we do have relevant prior information about the structure of the problem.** **Hierarchical modeling can be seen as a method of using the data to fit the model and estimate the prior at the same time.**
^def-hierarchical-as-prior-estimation

| Section | Note |
|---|---|
| 5.1 Estimating a prior distribution from data | Presents the basic idea. **The hyperparameters are estimated by method of moments — "we would not recommend that now — indeed, it's a bit of a distraction in the exposition — so we recommend you redo the example yourself using Stan."** Still read the whole section. |
| 5.2 Exchangeability | **"You don't need to understand the de Finetti theorem"**, but exchangeability justifies many hierarchical models (BDA Ch. 5) and model assessment (BDA Chs. 6–7), so get a basic idea of its meaning by reading the examples. |
| 5.5 **Eight schools** | "The discussion and graphs surrounding this classic example are still very much worth reading." |
| 5.6 Hierarchical meta-analysis | Not necessary; read for another worked example. |
| 5.7 Priors for hierarchical variance parameters | "Our thinking has advanced since this section was written, but it's still a good starting point for thinking about hyperprior distributions in complex models." |

### B.2 BDA3 Part II: Fundamentals of Bayesian data analysis

> [!tip] These are the key chapters
> "**These are the key chapters in BDA3** because they go beyond Bayesian inference (learning through a particular model) to aspects of Bayesian workflow (**evaluating and using models**)."

#### BDA3 Chapter 6: Model checking

"Before BDA was written, **there was very little in the statistics literature on the checking of Bayesian models**. So this chapter provides both explication and justification of these methods."

| Section | Note |
|---|---|
| 6.1 | Overview of Bayesian model checking |
| 6.2 | Comparing fitted models to other knowledge |
| Part of 6.3, **pp. 143–144 only** | Posterior predictive checking — **"then you can skip the rest of the section which is mostly about $p$-values, which we don't recommend any more."** |
| 6.4 | **Graphical posterior predictive checks** — several examples, each illustrating different principles |
| 6.5 | Model checking for eight schools — "valuable **not so much for the graphs and $p$-values, which don't show much**, but for the discussion of the modeling assumptions and how they can be checked from data." |

#### BDA3 Chapter 7: Evaluating, comparing, and expanding models

"Fairly theoretical and represents our best effort to understand predictive-based model evaluation at the time the book was written."

> [!definition] The key idea of predictive model evaluation
> **When evaluating or comparing models this way, we are not interested in the posterior probability of the model but rather in how well it predicts. Thus a model can perform well for some purposes but not for others.**
^def-predictive-evaluation-purpose

For practical purposes the recommendation is **Vehtari, Gelman, and Gabry (2017)** — theory, Stan implementation, and examples. Chapter 7 remains useful for presenting the key ideas in compact form.

| Section | Note |
|---|---|
| 7.1 Measures of predictive accuracy | "Algebra that **any serious Bayesian modeler or user of probabilistic programming should know**, involving the **logarithm of the posterior density function** (the target or objective function in a Stan program)." |
| 7.2 Information criteria | Read to understand connections between **cross validation, AIC, BIC**, and other scores adjusting for effective number of parameters. "Feel free to skip the details unless you really care about all these different methods." |
| 7.4–7.5 Bayes factors and continuous model expansion | **"We don't recommend Bayes factors for model comparison; instead we prefer continuous model expansion. These sections explain why."** |
| 7.6 Implicit assumptions and model failure | Skippable self-contained case study, but recommended. |

> [!warning] Published erratum: drop the $-2$ multiplier
> "In Sections 7.2 and 7.3, **for historical reasons a multiplier of $-2$ is used. After the book was published, we have concluded that it causes too much confusion and recommend not to multiply by $-2$.**"

On §7.6: "a simple example of how a reasonable-seeming model can go wrong, how this problem can be found using predictive checking. This example is also valuable because it demonstrates that **a statistical procedure applied to a particular class of problems can include implicit assumptions — and when these assumptions are made explicit, they can improve the model**."

> [!tip] Quantitative comparison is not the whole story
> "In Chapter 7 and the recommended alternative reading (Vehtari, Gelman, and Gabry 2017), we **follow the lead of model selection literature and focus on quantitative comparison, but good Bayesian workflow includes also qualitative considerations**, as discussed by Navarro (2019) and also by us in the present book."

#### BDA3 Chapter 8: Modeling accounting for data collection

"Works out some of the implications of Bayesian inference in **sampling, causal inference, and selection**: all contexts where the model is fit to data that are **not necessarily representative of the population that is the target of study**."

> [!definition] The inclusion variable
> **The key idea is to include in the Bayesian model an "inclusion" variable with a probability distribution that represents the process by which data become observed.**
^def-inclusion-variable

| Section | Note |
|---|---|
| 8.1 | General framework for Bayesian modeling accounting for data collection |
| 8.5 | Randomization in Bayesian inference |
| Part of 8.6, **pp. 220–222 only** | Observational studies |
| 8.7 | Censoring and truncation — "skip for now, but useful if you want to work with data that have selection issues" |
| 8.8 | **Summary of when you can ignore details of the data collection process** |

#### BDA3 Chapter 9: Decision analysis

Examples in **medicine, social science, and public health**, in each case "assessing expected costs and benefits by **averaging over a posterior distribution**." Necessary: **9.1 Bayesian decision theory** and **9.5 personal vs. institutional decision analysis**. The other sections, presenting three examples in detail, are also recommended.

### B.3 BDA3 Part III: Advanced computation

> [!tip] Why learn the math if Stan just works?
> "You can drive a car without understanding the workings of the internal combustion engine; why can't you fit models in Stan without knowing how Hamiltonian Monte Carlo works? The short answer is that, **yes, you can** fit models in Stan without following what is going on under the hood, **but there are good reasons for gaining a deeper understanding. When a model is difficult to fit, you might be able to reparameterize it or change it in some way so it will fit better.**"

#### BDA3 Chapter 10: Introduction to Bayesian computation

| Section | Why |
|---|---|
| 10.3 Rejection sampling | "You may never use this in a real problem, but this simple method illustrates some general principles, so it's worth reading this section carefully and **programming up the example yourself in R or Python**." |
| 10.4 Importance sampling | **"The fast PSIS-LOO approach is based on importance sampling using the full data posterior as the proposal distribution for $n$ leave-one-out posteriors."** |
| 10.5 How many simulation draws are needed | **"Lays the foundation for understanding effective sample size (ESS), Monte Carlo standard error (MCSE), and how many digits should be displayed when reporting the results."** |
| 10.7 Debugging Bayesian computing | "Worth reading, even though the present book updates much of this advice." |

#### BDA3 Chapter 11: Basics of Markov chain simulation

"Until recently, the **Gibbs sampler and Metropolis algorithm** were the standard approaches for general Bayesian simulation. We have now mostly moved on, but it can be helpful to learn these algorithms as a first step toward more advanced approaches."

- **Markov chain simulation:** before §11.1, **pp. 275–276**.
- **Inference and assessing convergence:** part of §11.4, **pp. 281–284**. "You don't need to follow all the details, but you should understand the general principles of **monitoring the mixing of simulations**, as illustrated in Figures 11.1 and 11.3." Further reading: **Vehtari, Gelman, Simpson, et al. (2021)**, **Lambert and Vehtari (2022)**, **Margossian and Gelman (2025)**.

#### BDA3 Chapter 12: Computationally efficient Markov chain simulation

"When getting started, you don't need to read any of this chapter." If you want to understand HMC and Bayesian computational challenges generally, **read the whole chapter and work through the R code in Appendix C**, where posterior inference for the eight schools model is performed with several different simulation algorithms. Also recommended: **Neal (2011)** on HMC. **Stan and many other modern probabilistic programming frameworks use a dynamic variant of HMC which automatically selects the number of leapfrog steps using the no-U-turn criterion** (Hoffman and Gelman 2014).

#### BDA3 Chapter 13: Modal and distributional approximations

> [!definition] Three approximation strategies for models too difficult or too big
> 1. **Fitting a model to some summary or subsets of the data**
> 2. **Fitting a simpler model to your data**
> 3. **Giving up on full posterior simulation; summarizing the posterior in some way**
>
> "In practice we use all these approaches. We **restrict the range of application** of our analysis rather than trying to incorporate all possible data; we **work with models that necessarily simplify the world**; and if necessary we **approximate our computations**."
^def-three-approximations

Recommended sections when you reach that point: **13.7 (variational inference), 13.8 (expectation propagation), 13.10 (unknown normalizing factors)** — "Bayesian-focused explanations that are complementary to standard descriptions of these methods elsewhere in the literature."

### B.4 BDA3 Parts IV and V: Regression, nonlinear, and nonparametric models

"The remaining chapters cover specific classes of models, so you can dip into them as needed."

#### BDA3 Chapter 14: Introduction to regression models

| Section | Note |
|---|---|
| 14.1 Conditional modeling | "Important for explaining what it means to **condition on predictors** in a Bayesian framework. Also relevant to Stan, in allowing you to understand the distinction between **unmodeled data, modeled data, and parameters**" (see [[Modeled and Unmodeled Data]]). |
| 14.2 Bayesian analysis of classical regression | "You might not need this right away, but if you're ever going to get into **computational efficiency and approximate algorithms**, the matrix algebra here will be relevant." |
| 14.3 Regression for causal inference: incumbency and voting | Essentially a case study — read if planning Bayesian causal inference in social science. |
| 14.4–14.5 Goals of regression analysis; assembling the matrix of explanatory variables | General advice on building regression models. For much more: **Regression and Other Stories**. |
| 14.6 Regularization and dimension reduction | "More specifically Bayesian… good concepts but not much on specific approaches; for that we currently point to **Piironen and Vehtari (2017b) on the horseshoe and other shrinkage priors**." |

#### BDA3 Chapters 15 and 16: Hierarchical linear models and GLMs

> [!definition] Three reasons hierarchical regression is among the most important applications of Bayesian methods
> 1. **Hierarchical models can have many parameters relative to data** — data can be sparse — hence the relevance of **prior information and partial pooling**.
> 2. **Quantities of interest typically involve many parameters** (as with multilevel regression and poststratification) and predictions for new groups, and **simulation-based Bayesian inference excels at propagating uncertainty in high-dimensional settings**.
> 3. **Multilevel modeling provides a general template for combining data from different sources** — individual and state levels in a national survey, or different experiments in a meta-analysis.
^def-why-hierarchical

> [!warning] No sections recommended here
> "Unfortunately, it's hard for us to recommend any particular sections in these two chapters of BDA, as **the computational methods described there are out of date**, and for applied insight we recommend our book on multilevel models, **Gelman and Hill (2007)**."

#### BDA3 Chapter 17: Models for robust inference

> [!definition] Robustness is a description, not a virtue
> "An inference is **robust** to the extent that **it does not change much when various inputs are changed**. **Robustness is not always a desirable property: sometimes we do want inferences to be sensitive to certain aspects of the data or model.** So we should think of robustness as a **description** rather than a **virtue** of a statistical method."
^def-robustness

Read **17.1 (aspects of robustness)** and **17.2 (overdispersed versions of standard models)**. **"The remaining sections of this chapter use obsolete computational methods."**

#### BDA3 Chapter 18: Models for missing data

"Missing data are unavoidable in real statistics problems. Bayesian methods are appropriate in allowing us to account for uncertainty about missing observations." Read **18.1 (Notation)** — "extends the approach of Chapter 8, in which **the statistical model needs to include all information that predicts data inclusion**." In practice, "we often use various approximate approaches to missingness, **imputing missing values using some approximate methods**."

#### BDA3 Chapter 19: Parametric nonlinear models

Two case studies — **laboratory assays** and **toxicology**. Both recommended, "but because they **don't yet have corresponding Stan code**, they might not be the best examples to read right away. Instead it makes more sense to start with the **Stan case studies** (mc-stan.org/users/documentation/case-studies) and the examples from **StanCon** (github.com/stan-dev/stancon_talks)."

#### BDA3 Chapter 20: Basis function models

Read **20.1 (Introduction to splines)** — defines a class of spline models and illustrates them with **simulation from the prior** and a fit to a small dataset. Read alongside the case study by **Kharratzadeh (2017)**.

> [!tip] Smoothing priors beat parameter-count restrictions
> "A key step in Bayesian splines is the use of **priors that enforce smoothness**. This sort of smoothing gives us **more flexibility in modeling**, as compared to cruder unsmoothed approaches in which smoothing is done by **restricting the number of parameters** in the model."

#### BDA3 Chapter 21: Gaussian process models

"Gaussian processes are a general framework for models of dependence and are often used in **spatial statistics** or for **prior distributions that enforce local smoothness**." Read **21.1 (Introduction)** plus the case studies by **Zhang (2018)**, and **21.2 (Birthday example)** — **continued in Chapter 27 of the present book**; see [[Model Building - Time-Series Decomposition for Birthdays]].

#### BDA3 Chapter 22: Finite mixture models

Read **22.1 (Overview of mixture models)**. Also recommended: **Betancourt (2017b)**, **Stephens (2000)**, and the section on mixture models in the **Stan User's Guide**. (Stephens 2000 is the label-switching post-processing reference used in [[Simulation-Based Calibration Checking in Model Development Workflow]].)

#### BDA3 Chapter 23: Dirichlet process models

"You can read this entire chapter if you find yourself working with this class of model."

### B.5 BDA3 Appendixes

| Appendix | Note |
|---|---|
| **A: Standard probability distributions** | "A useful compendium of information on probability distributions, with the advantage of using a **consistent notation**." |
| **B: Outline of proofs of limit theorems** | Complements BDA Chapter 4 on asymptotic limits. |
| **C: Computation in R and Stan** | "Much of this appendix involves **programming directly in R the computations that are done automatically in Stan**. We recommend that you go through these computations as a way of understanding basic implementations of the **Gibbs sampler, Metropolis algorithm, and Hamiltonian Monte Carlo**." |

## Connections

Read as a whole, the appendix marks the boundary between what changed and what did not between BDA3 (2013) and this book (2026):

**Explicitly superseded or retracted:**
- Method-of-moments hyperparameter estimation (§§2.7, 5.1) → fit directly in Stan
- Posterior predictive $p$-values (most of §6.3) → graphical checks
- The $-2$ multiplier on information criteria (§§7.2–7.3) → drop it
- Bayes factors (§§7.4–7.5) → continuous model expansion
- Computational methods in Chapters 15–17 → out of date
- Conjugate prior-to-posterior algebra generally → reference material, not working method

**Explicitly still essential:**
- The counterexamples to large-sample results (§4.3) — "read carefully, including all the math"
- Graphical posterior predictive checks (§6.4)
- Measures of predictive accuracy (§7.1) — the log posterior density is the Stan target
- Importance sampling (§10.4) — the foundation of PSIS-LOO
- ESS and MCSE (§10.5)
- The inclusion-variable framework for data collection (Ch. 8)
- Conditional modeling and the modeled/unmodeled data distinction (§14.1)

**The framing advice** — read the words if the math is hard, but know where the derivation lives — mirrors the book's general stance that workflow is a practice informed by theory rather than derived from it.

## See Also
- [[Statistical and Computational Workflow for Bayesians and Non-Bayesians]] — the companion appendix
- [[Computational Tools and Probabilistic Programming]] — the Stan-era baseline that makes the algebra optional
- [[Modeled and Unmodeled Data]] — the distinction BDA3 §14.1 grounds
- [[Cross Validation Checking]] — the modern replacement for BDA3 Ch. 7's information criteria
- [[Model Selection Using Predictive Performance]] — why predictive accuracy, not model probability
- [[Posterior Predictive Checking]] — the graphical practice BDA3 Ch. 6 introduced
- [[Chains, Iterations, and Effective Sample Size]] — the ESS/MCSE material of BDA3 §10.5
- [[Effective Sample Size and Monte Carlo Standard Error]] — its modern treatment
- [[Approximations Based on Joint and Conditional Posterior Modes]] — modal approximations of BDA3 Ch. 13
- [[Variational Inference and Pathfinder]] — BDA3 §13.7 brought up to date
- [[Model Building - Time-Series Decomposition for Birthdays]] — the continuation of BDA3 §21.2
- [[Simulation-Based Calibration Checking in Model Development Workflow]] — where Stephens (2000) is applied
- [[Prior Distributions]] — the successor to BDA3 §2.9 on weakly informative priors
