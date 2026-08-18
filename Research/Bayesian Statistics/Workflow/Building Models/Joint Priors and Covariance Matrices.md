---
title: "Joint Priors and Covariance Matrices"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.6, pp. 82-85 (Eq. 5.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Prior Distributions]]"
  - "[[Generative and Partially Generative Models]]"
used_by:
  - "[[Models for Regression Coefficients - Student Grades]]"
  - "[[Prior Specification for Regression Models - Sleep Study]]"
  - "[[Prior Predictive Checking]]"
aliases:
  - "Piranha principle"
  - "LKJ prior"
  - "Prior independence"
  - "Empirical Bayes as approximation"
  - "R2D2 prior"
---

# Joint Priors and Covariance Matrices

> [!summary]
> Independent priors are the default for convenience and interpretability, but three situations break
> them: **the piranha principle** (many large effects cannot coexist, motivating joint priors like the
> regularized horseshoe, R2D2, and ARR2), **data-dependent priors** (which are not generative and
> should be understood as approximations to hierarchical models), and **covariance matrices** (where
> the positive-definiteness constraint makes independence impossible). The section's practical test is
> memorably simple: **"to see whether a prior density $p(\theta)$ is part of a fully generative model,
> just try to draw simulations of $\theta$ from it."**

## Overview

### Independence in priors, and the parameterization that earns it

"We commonly set up our models so that parameters are independent in their prior distributions,
$p(\theta,\phi) = p(\theta)p(\phi)$. This is **partly for convenience and partly because setting up the
model in this way is more understandable. But this means that we have to be careful with
parameterization.**"

> [!example] Toxicology: engineering independence into the parameterization (Gelman, Bois, and Jiang 1996)
> §2.2 of that paper sets up a toxicology model so its parameters are **plausibly independent a priori**:
> - express the volumes of body components **as proportions of lean body volume** rather than in liters,
>   "thus avoiding the correlation induced by people varying in size";
> - then use a **softmax transformation** to avoid the negative dependence that would arise from the
>   constraint that proportional volumes sum to 1.
>
> Compare the scale-transformation argument in
> [[Generative and Partially Generative Models#Scale transformations]] — the same move, motivated there
> by hierarchical pooling and here by prior independence.

> [!important] Prior independence can be *checked* — with a posterior predictive check
> "With hierarchical models, it can be possible to check prior independence using a posterior predictive
> check. **This check is posterior given the data but it is prior in the sense of studying the
> distribution of parameters across groups.**"
>
> §3.3 of Gelman, Bois, and Jiang (1996) "gives an example of a check in which we could **strongly
> reject** the model of prior independence."
>
> **What the rejection led to:** "The problem arose because **a certain physiological quantity had been
> measured with error but had been taken as known in our model**; in our expansion, we considered that
> quantity to be a **latent parameter**. In this expanded model, prior independence seemed to be a
> reasonable assumption, and it was also consistent with the data."
>
> **The resolution is the point:** "We were satisfied with this solution, which was **not to fit large
> prior correlations but rather to set up the model in a way that made substantive sense.**"

## Main Content

### The piranha principle

> [!definition] The piranha principle (Tosh et al. 2025; Ch. 5.6, p. 83)
> "**It is unlikely for many large effects to coexist; some dependence or interactions will be necessary
> to keep total effect sizes from becoming unreasonably large.**"
>
> **How to model this belief:** "set an informative prior on the **variation of the total effect** and
> then use **joint priors** for coefficients and residuals":
> - **(regularized) horseshoe** — Carvalho, Polson, and Scott (2009, 2010); Piironen and Vehtari (2017b)
> - **R2D2(M2)** — Zhang, Naughton, et al. (2022); Aguilar and Bürkner (2023)
> - **ARR2** — Kohns et al. (2025)
>
> See the case study in [[Models for Regression Coefficients - Student Grades]] (Ch. 28).
^def-piranha

This is the same phenomenon shown graphically in
[[Prior Predictive Checking#Implications of prior on data as dimension increases]] (Figure 5.8): weak
independent priors on many coefficients imply an extreme prior on the predictive probability. The
antidote is stated there as **"consider priors on outcomes and then derive a corresponding joint prior
on parameters."** Existing notes: [[The Horseshoe Prior]],
[[Regularized Horseshoe (Finnish Horseshoe)]], [[Global-Local Shrinkage Priors]].

> [!example] The $t_\nu(\mu,\sigma)$ reparameterization (Ch. 5.6, p. 83)
> Another case where the joint distribution must be thought about. "Here, we prefer to set up the prior
> in terms of $\nu$, $\mu$, and
> $$\tau = \sigma\sqrt{\frac{\nu}{\nu-2}}$$
> **to account for the standard deviation of the $t$ distribution being a function of both $\nu$ as
> well as $\sigma$.** Even though $\sigma$ is the scale parameter in the conventional expression of the
> $t$ distribution, **there is no need to set up a prior on that space.**"
>
> The lesson generalizes: put the prior on the quantity that has a stable interpretation (here the
> actual sd), not on whichever symbol the textbook parameterization happens to name.

Problems with naive prior independence are illustrated in §2.3 of Greenland (2001b); see also
Greenland (2001a, 2010).

### Prior distributions that depend on data

> [!warning] Data-dependent priors are not generative (Ch. 5.6, p. 83)
> "In the generative Bayesian framework, $\theta$ is generated from $p(\theta)$ and then $y$ from
> $p(y|\theta)$. This implies that $p(\theta)$ **must be a proper probability distribution that
> integrates to 1 and that it not depend on data.** In practice, though, we sometimes do set up a prior
> with reference to observed data. **This can be a shortcut to allowing more flexibility in modeling.**"
>
> **The education example.** An experiment where the average treatment effect is expected to be less
> than $0.05\sigma$, with $\sigma$ the sd of test scores in the population (e.g. all fourth-graders in
> the country). If $\sigma$ were known we would use $\text{normal}(0,\sigma)$. Since it isn't, either
> - preprocess by scaling data to mean 0, sd 1 and assign $\text{normal}(0,1)$ on the new scale, or
> - equivalently, keep the original scale and assign $\text{normal}(0,\, 0.05\, s_y)$ with $s_y$ the
>   **sample** sd.
>
> > **"There is no way to simulate from this model: the data distribution depends on the treatment
> > effect, whose prior distribution in turn depends on the data."**

> [!important] On the term "empirical Bayes"
> "If a prior has hyperparameters that are themselves estimated from data, this is sometimes called
> '**empirical Bayes**,' **a term which we dislike because it implies that regular Bayesian inference is
> not empirical.** We can think of this sort of data-dependent prior as **approximating a fully-Bayesian
> hierarchical model, in which the posterior distribution for the hyperparameters is summarized by a
> point estimate.**"
>
> See [[Empirical Bayes - Overview]] and [[Empirical Bayes Interpretation of Shrinkage]].

> [!definition] The generativity test, and three repairs (Ch. 5.6, pp. 83-84)
> **The test:** "To see whether a prior density $p(\theta)$ is part of a fully generative model, **just
> try to draw simulations of $\theta$ from it.** If that is not possible, the model can be interpreted
> as an approximation to a generative model."
>
> **Three standard repairs:**
> 1. **An improper uniform prior** can be replaced by a weak proper prior such as
>    $\text{normal}(0, 100)$.
> 2. **A prior that depends on data scaling** can be expanded to include the scaling as a parameter:
>    $\text{normal}(0,\, 0.05\, s_y) \;\to\; \text{normal}(0,\, 0.05\, \sigma_y)$, where $\sigma_y$ is a
>    **population parameter** which then gets its own weak prior.
> 3. **Hyperparameters estimated from data** can be included in the joint model, so that **empirical
>    Bayes is replaced by hierarchical Bayes** (BDA3 Ch. 5).
^def-generativity-test

### Priors for covariance matrices

> [!important] Why correlations cannot be independent
> "In a simple $2\times 2$ matrix, the correlation and standard deviations can be modeled independently
> and then composed. **But for larger matrices, the many correlation parameters cannot be independent
> and still construct a matrix that satisfies the constraints of a valid covariance matrix.**
> Intuitively, **if there are three random variables, and two of them are perfectly correlated, then the
> third must have the same correlation with the other two. This kind of non-independence is not only
> ordinary, but it is also often what we want to estimate.**"

> [!definition] The scale/correlation decomposition (Eq. 5.3, Ch. 5.6, p. 84)
> $$\Sigma = \text{Diag}(\sigma_1,\dots,\sigma_K)\; \Omega\; \text{Diag}(\sigma_1,\dots,\sigma_K)$$
> for a $K \times K$ covariance matrix, where $\Omega$ is the correlation matrix.
>
> **The $\sigma$ parameters are ordinary scale parameters** — "since each $\sigma_k$ can be set
> independently, these priors are not especially tricky." (For general advice on scale parameters see
> [[Prior Distributions#General principles]].)
>
> **The correlation matrix is the hard part**, because of the **positive definiteness** constraint,
> which creates two problems:
> 1. You must find a distribution defined on that constrained space.
> 2. **"A simple parametric form defined on the matrix will become more complicated after including the
>    constraint."**
^def-cov-decomposition

> [!warning] Uniform on correlations is not marginally uniform
> "**In three or more dimensions, a joint uniform prior on the correlations does not yield a marginal
> uniform prior on each correlation. Because of the constraint, the resulting marginal distribution on
> each correlation will be more concentrated near zero.**" Tokuda et al. (2025) demonstrate with
> visualizations.

> [!definition] The LKJ distribution (Lewandowski, Kurowicka, and Joe 2009)
> The authors' "current preference for a weak prior on a correlation matrix," for which **prior
> independence (a diagonal covariance matrix) is the baseline.**
>
> - **$\text{LKJ}(\eta = 1)$** is equivalent to a **uniform prior on the correlations.**
> - **Higher $\eta$** concentrates the prior closer to the identity matrix.
> - **The trap:** "for **any fixed value of $\eta$, larger matrices will be more concentrated around the
>   identity matrix**, because of the positive definite constraint."
> - **The remaining caveat:** "**The parameter $\eta$ does not fix the marginal individual correlations,
>   so care should still be taken to explore the implied marginals with prior predictive simulation.**"
^def-lkj-prior

> [!important] Correlation matrix or its Cholesky factor?
> "In practice, one must also choose between specifying a prior on the correlation matrix itself or
> rather on its **Cholesky factor.** Each has different computational and communication advantages in
> different contexts."
>
> - "**The most efficient parameterization of a multilevel model is very often the non-centered form.**
>   This is the default in packages like `brms`. **The non-centered parameterization places the prior on
>   a Cholesky factor of the correlation matrix.**"
> - "Other times, **the centered parameterization is better**, and then the prior is applied to the
>   correlation matrix, not its Cholesky factor."
>
> The mechanics of both forms are shown in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough#Model 6]]; the centered/non-centered tradeoff is
> the subject of [[Modeling Ideas to Address Computing Problems]].

**When LKJ is not enough.** "Some models require covariance matrices with **additional constraints
beyond being positive definite.** For example, in the **social relations model**, a matrix of dyad-level
effects contains additional symmetries, because **the individual IDs within the dyad are
exchangeable.**" (See Ch. 14 of McElreath 2020 — [[Social Network Models]].) "**As these matrices grow
in size, the additional constraints make it impossible to use a standard LKJ prior on the
correlations**" (Pinkney 2024).

**The Wishart alternative.** "Another option is the **scaled Wishart** model, in which we again use the
decomposition (5.3), but $\Omega$ is no longer constrained to be a correlation matrix. The Wishart prior
is common in some model families. But **as a general prior over covariance matrices, it is harder to
understand and use than the LKJ family.**"

## Connections

- The piranha principle is the theoretical justification for the shrinkage priors already in the vault:
  [[The Horseshoe Prior]], [[Regularized Horseshoe (Finnish Horseshoe)]],
  [[Choosing the Global Scale and Effective Nonzeros]].
- The generativity test is the operational form of the ladder in
  [[Generative and Partially Generative Models]] — rungs 1-3 all fail it in some component.
- LKJ's dimension-dependence is a covariance-matrix instance of the same phenomenon Figure 5.8 shows for
  regression coefficients: **a fixed prior gets stronger as dimension grows.**

## See Also
- [[Prior Distributions]] — informativity, soft constraints, and general principles
- [[Constructing Priors for Effect Sizes]] — where the numbers come from
- [[Prior Predictive Checking]] — the tool for exploring implied marginals of an LKJ prior
- [[Global-Local Shrinkage Priors]] — the joint-prior family the piranha principle recommends
