---
title: "Modeling Ideas to Address Computing Problems"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 12.4, pp. 226-234 (Figures 12.13-12.15)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Failure Modes and Steps Forward]]"
  - "[[Prior Distributions]]"
  - "[[Fit Fast, Fail Fast]]"
used_by:
  - "[[What to Do About Convergence Problems]]"
  - "[[Fitting Simpler Models for Computational Purposes]]"
  - "[[Sampling Problems with Latent Variables - No Vehicles in the Park]]"
aliases:
  - "Folk theorem of statistical computing"
  - "Meeting in the middle"
  - "QR decomposition"
  - "Marginalization"
  - "Zero-avoiding priors"
  - "Ladder of abstraction"
---

# Modeling Ideas to Address Computing Problems

> [!summary]
> **"Usually we think of computation being in the service of modeling … But things can go the other way,
> too."** The organizing idea is the **folk theorem of statistical computing**: when you have computational
> problems, often there's a problem with your model. The section supplies a systematic set of modeling
> remedies — **reparameterization** (five worked examples), **marginalization**, **adding prior
> information**, **adding data** — plus two debugging strategies: **modulate the prior** (super-weak priors
> to expose non-identification without blowing up; very strong priors to ease a parameter loose), and
> **meet in the middle** between a simple model that works and a complex one that doesn't.

## Overview

> [!definition] The folk theorem of statistical computing (Gelman 2008c; Yao, Vehtari, and Gelman 2022)
> "**When you have computational problems, often there's a problem with your model.**
>
> **Not always — sometimes you will have a model that is legitimately difficult to fit — but many cases of
> poor convergence correspond to regions of parameter space that are not of substantive interest or even to a
> nonsensical model.**"
>
> **Examples of fundamentally problematic models:** "**bugs in code**" or "**using a normally-distributed
> varying intercept for each individual observation in a normal or logistic regression context, where they
> cannot be informed by data.**"
>
> > **"Our first instinct when faced with a problematic model should not be to throw more computational
> > resources at the problem (for example by running the sampler for more iterations or reducing the step
> > size of the HMC algorithm), but to check whether our model contains some substantive pathology."**
^def-folk-theorem

> [!important] Identification is not a binary
> "**In classical statistics, models are sometimes classified as identifiable or nonidentifiable, but this
> can be misleading (even after adding intermediate categories such as partial or weak identification), as
> the classical definition is asymptotic, and the amount of information that can be learned from finite data
> depends also on the specific finite realization that was actually observed.**"

## Main Content

### Debugging strategy 1 — modulate the prior

> [!definition] Two directions (Ch. 12.4, p. 226)
> **Super-weak priors, to expose non-identification safely.** "**You can add a $\text{normal}(0,100)$ prior
> to every parameter in the model. The assumption is that everything is on unit scale so these priors will
> have no effect — unless the model is blowing up from nonidentification. The super-weak prior allows you to
> see problems without the model actually blowing up.**"
>
> **Very strong priors, to ease a fixed parameter loose.** "Consider the following scenario: **You fit a
> model, and in order to keep your inference under control, you set some of the parameters to fixed, preset
> values. Now you want to let these parameters float** … **But if you just jump all the way to flat priors,
> or even weakly informative priors, your inferences blow up** … **So you ease into it by giving your
> parameters very strong priors. For example, if you had a parameter that you'd given a preset value of 4,
> you try it with a $\text{normal}(4, 0.1)$ prior, or maybe $\text{normal}(4, 1)$.**"
>
> **The coding detail that makes this work:** "**When you do this, you also should specify initial values or
> set the scaling in the Stan code, for example by assigning `<offset=4, multiplier=0.1>` when declaring the
> parameter.**"
^def-prior-modulation

### Debugging strategy 2 — meet in the middle

> [!definition] Figure 12.13 (from Gelman and Hill 2007)
> "**The starting point is that a model is not performing well** … **The path toward diagnosing the problem
> is to move from two directions:**
> - **to gradually simplify the poorly-performing model, stripping it down until you get something that
>   works;**
> - **and from the other direction starting with a simple and well-understood model and gradually adding
>   features until the problem appears.**"
>
> The figure's asterisk marks the complex model that fails; dots on the upper left mark simple successes;
> dots on the lower right mark failed simplifications; "**the dotted line represents the idea that the
> problems can be identified somewhere between the simple models that fit and the complex models that
> don't.**"
>
> **Unit testing for models:** "**if the model has multiple components (for example, a differential equation
> and a linear predictor for parameters of the equation), it is usually sensible to perform a sort of unit
> test by first making sure each component can be fit separately, using simulated data.**"
>
> **And the honest possible outcome:** "**We may never end up fitting the complex model we had intended to
> fit at first, either because it was too difficult to fit using currently available computational
> algorithms, or because existing data and prior information are not informative enough to allow useful
> inferences from the model, or simply because the process of model exploration leads us in a different
> direction than we had originally planned.**"
^def-meet-in-middle

> [!example] Six concrete suggestions for a slow model (Ch. 12.4, p. 228)
> A Stan forum query: **a multilevel logistic regression with 35,000 data points, 14 predictors, and 9
> batches of varying intercepts, which failed to finish after several hours** using `rstanarm` defaults. The
> advice given, in no particular order:
>
> 1. **"Simulate data from the model and try fitting the model to the simulated data.** Frequently a badly
>    specified model is slow, and working with simulated data allows us not to worry about lack of fit."
> 2. **"Start with a smaller model and build up.** First fit the model with no varying intercepts. Then add
>    one batch of varying intercepts, then the next, and so forth."
> 3. **"Run for 200 iterations, rather than the default.** Eventually you can run for 2000, but there is no
>    point in doing that while you're still trying to figure out what's going on."
> 4. **"Put at least moderately informative priors on the regression coefficients and group-level variance
>    parameters."**
> 5. **"Consider some interactions of the group-level predictors.** It seems strange to have an additive
>    model with 14 terms and no interactions." — flagged by the authors themselves as apparently irrelevant
>    to speed: "**it is a reminder that ultimately the goal is to make predictions or learn something about
>    the underlying process, not merely to get some arbitrary pre-chosen model to converge.**"
> 6. **"Fit the model on a subset of your data."**
>
> "**The common theme in all these tips is to think of any particular model choice as provisional, and to
> recognize that data analysis requires many models to be fit in order to gain control over the process.**"

### Debugging strategy 3 — monitor intermediate quantities

> [!important] Plot, don't print (Ch. 12.4, p. 228)
> "**Another useful approach is to save intermediate quantities in our computations and plot them along with
> other MCMC output** (using `bayesplot` or `ArviZ`). **These displays are an alternative to inserting print
> statements inside the code. In our experience, we typically learn more from a visualization than from a
> stream of numbers in the console.**"
>
> **For chains stuck in low-density regions:** "**it can be helpful to look at predictions from the model
> given these parameter values to understand what is going wrong** … **But the most direct approach is to
> plot the expected data conditional on the parameter values in these stuck chains, and then to transform
> the gradient of the parameters to the gradient of the expected data. This should give some insight as to
> how the parameters map to expected data in the relevant regions of the posterior.**"
>
> **The hardest class of bug:** "**This sort of behavior can also arise from numerical problems: the model is
> theoretically well identified, but due to imprecision in the floating-point representation of numbers in
> the computer, the calculations return unreasonable values** … **Often the only possible diagnostic is to
> invoke the log density computation with a set of parameters from the problematic region, print intermediate
> values, and search for infinities, zeros, and very small or large numbers that would not make sense.**"

### Remedy 1 — Reparameterization

> [!important] The target geometry
> "**An HMC-based sampler will work best if its mass matrix is appropriately tuned and the geometry of the
> joint posterior distribution is relatively uninteresting, in that it has no sharp corners, cusps, or other
> irregularities. This is easily satisfied in many standard models as sample size increases, as a consequence
> of the asymptotic normality of the posterior distribution (the Bernstein-von Mises theorem).**
>
> **With finite data, we can no longer guarantee this asymptotic utopia** … **Finding a suitable
> reparameterization can be an open-ended creative process.**"

> [!example] Five reparameterizations (Ch. 12.4, pp. 230-231)
> **1. Hierarchical funnels → non-centered parameterization.** "Hierarchical models can have difficult funnel
> pathologies in the limit when group-level variance parameters approach zero" (Gelman, Huang, et al. 2008;
> Neal 2011). See [[Failure Modes and Steps Forward#The funnel]] and Ch. 29.
>
> **2. Correlated predictors → QR decomposition.** For $E(y) = X\beta$, decompose $X = QR$ with $Q$
> orthogonal and $R$ upper-triangular, then reparameterize as
> $$
> E(y) = Q\theta, \qquad \theta = R\beta
> $$
> "**Since $Q$ is orthogonal, $\theta$ will tend to be uncorrelated. Finally, since $R$ is easy to invert, we
> can recover the parameters on the original scale, $\beta = R^{-1}\theta$.**"
>
> **3. Start and end times → start time and log duration.** "**When modeling both start and end times of an
> event (for example, the flowering period of a plant), the end time will tend to be positively correlated
> with the start time, which may induce difficult geometry** … **It will thus often make sense to instead
> reparameterize to the start time and the logarithm of duration, which implicitly constrains the duration to
> be positive. In addition, when comparing multiple groups, it is often natural to think of additive shifts
> in starting time and of multiplicative changes in duration, which is the natural scale of this
> parameterization.**"
>
> **4. Multiple variance components → total variance and a simplex.** "Hierarchical models have variance
> allocated to each group-level parameter as well as the residual variance; state-space models such as the
> Kalman filter have the process noise and the observation noise; Gaussian process models have the variance
> of the process prior and the observation noise. **With limited data, it may be hard to allocate variance
> precisely to individual components, inducing negative correlations in the posterior of the variance
> parameters. In this case it may be helpful to reparameterize the model in terms of total variance and a
> simplex that determines how the variance is split among its individual components.**" Implemented in the
> `makemyprior` R package (Hem, Fuglstad, and Riebler 2022).
>
> **5. Three-parameter logistic curve → identified quantities.** For $E(y) = m\,\text{logit}^{-1}(a+bx)$,
> "**when the full dynamic range of $E(y)$ is not observed, this model is poorly identified. For example when
> we only see the initial ramp-up of the sigmoid, the data effectively only provide a lower bound for $m$,
> which can then have a strong posterior dependence with $b$.**"
>
> Replace $m$ and $a$ with $\gamma = E(y|x=0)$ and $\eta = -a/b$ (the $x$ coordinate of the inflection point):
> $$
> E(y) = \gamma\,\frac{\text{logit}^{-1}\big(b(x - \eta)\big)}{\text{logit}^{-1}(-b\eta)}
> $$
> "**which looks more complicated than the original function but has the advantage that $\gamma$ will be well
> identified (as it corresponds to the prediction in the range of the data), and one can put a prior on
> $\eta$ that suppresses locations far from the observed range of $x$**" (Mangiola, McCoy, Modrák, et al.
> 2021).
>
> > **"A shared idea of the latter two examples is to find quantities that are well identified by the data and
> > use those as the basis for our new parameterization."**
^ex-reparameterizations

### Remedy 2 — Marginalization

> [!definition] Sample the marginal, recover the conditional (Ch. 12.4, p. 231)
> "**Challenging geometries in the posterior distribution are often due to interactions between parameters.
> An example is the funnel shape, which we may observe when plotting the joint density of the group-level
> scale parameter $\phi$ and the individual-level mean $\theta$. In contrast, the marginal density of $\phi$
> is well behaved.**
>
> **Hence, we can efficiently use MCMC to sample from the marginal posterior,**
> $$
> p(\phi \mid y) = \int_\Theta p(\phi, \theta \mid y)\, d\theta
> $$
> **and then recover posterior draws for $\theta$ by doing exact sampling from the conditional distribution
> $p(\theta|\phi,y)$, at a small computational cost.**"
>
> **Where this is standard:** hierarchical normal models (BDA3 Ch. 5) and Gaussian processes with a normal
> likelihood (Rasmussen and Williams 2006; Betancourt 2020a).
^def-marginalization

> [!example] Marginalizing varying intercepts out of a logistic regression
> Returning to the bioassay rats of [[Bioassay - A First Probabilistic Program]]: "**If there was an
> additional structure within the group of rats for each dose (such as multiple batches of the experiment),
> we might want to allow varying intercepts** … **if instead of adding intercepts that come from a normal
> distribution on the logit scale (as is typically done), we could assume they follow a beta distribution on
> the probability scale and are centered at the average probability. This lets us analytically marginalize
> out the varying intercepts to yield a beta-binomial distribution for outcomes within each group.**"
>
> **The tradeoff:** "**The beta model can become awkward if group-level predictors are added, so there is a
> tradeoff between computational efficiency and clarity of the model.**"
>
> **When the marginal is unavailable:** "**In general, the densities $p(y|\phi)$ and $p(\theta|\phi,y)$ are
> not available to us. Exploiting the structure of the problem, we can approximate these distributions using
> latent Gaussian models (the Laplace approximation) … When coupled with HMC, this marginalization scheme
> can, depending on the case, be more effective than reparameterization**" (Margossian, Vehtari, et al.
> 2020b). See [[Approximations Based on Joint and Conditional Posterior Modes]].

### Remedy 3 — Adding prior information

> [!example] The sum of two declining exponentials (Figure 12.14, Ch. 12.4, pp. 231-232)
> **The model** — "a well-known ill-conditioned problem in numerical analysis [that] also arises in
> applications such as pharmacology" (Jacquez 1972):
> $$
> y_i = \left(a_1 e^{-b_1 x_i} + a_2 e^{-b_2 x_i}\right) e^{\epsilon_i}, \qquad \epsilon_i \sim \text{normal}(0,\sigma) \tag{12.2}
> $$
> with $a_1, a_2, \sigma > 0$ and $b_1, b_2 > 0$ **ordered $b_1 < b_2$** "so as to uniquely define the two
> model components."
>
> **Case A — separable.** $b_1 = 0.1$, $b_2 = 2.0$ (a factor of 20 apart), $a_1 = 1.0$, $a_2 = 0.8$,
> $\sigma = 0.2$; 1000 data points with $x$ uniform on $(0,10)$. "**The simulations run smoothly and the
> posterior inference recovers the five parameters.**"
>
> **Case B — a factor of 2 apart.** $b_1 = 0.1$, $b_2 = 0.2$. "**Now when we try to fit the model in Stan, we
> get terrible convergence. The two declining exponentials have become essentially impossible to
> distinguish, as we have indicated in the graph by also including the curve $y = 1.8e^{-0.135x}$, which is
> essentially impossible to distinguish from the true model given these data.**"
>
> **The fix:** "**default $\text{normal}(0,1)$ priors on all the parameters do sufficient regularization,
> while still being weak if the model has been set up so the parameters are roughly on unit scale.**" Check
> sensitivity by comparing $\text{normal}(0,0.5)$ and $\text{normal}(0,2)$, or by power scaling —
> [[Influence of Likelihood and Prior]].
>
> **Why it works, mechanically:** "**Using an informative normal distribution for the prior adds to the
> tail-log-concavity of the posterior density, which leads to a quicker MCMC mixing time.**"
>
> **And why it is not a bias/efficiency tradeoff:** "**the informative prior does not represent a tradeoff of
> model bias vs. computational efficiency; rather, in this case the model fitting is improved as the
> computation burden is eased, an instance of the folk theorem.**"
>
> **The caveats:** "**there can be strong priors with thick tails, and thus the tail behavior is not
> guaranteed to be more log-concave. On the other hand, the prior can be weak in the context of the
> likelihood while still guaranteeing a log-concave tail. The informativeness of a model depends on what
> questions are being asked.**"
^ex-declining-exponentials

> [!definition] The ladder of abstraction (Ch. 12.4, p. 232)
> Four steps:
> 1. **Poor mixing of MCMC;**
> 2. **Difficult geometry** as a mathematical explanation for the above;
> 3. **Weakly informative data for some parts of the model** as a statistical explanation for the above;
> 4. **Substantive prior information** as a solution to the above.
>
> > **"Starting from the beginning of this ladder, we have computational troubleshooting; starting from the
> > end, computational workflow."**
^def-ladder-of-abstraction

> [!warning] Zero-avoiding priors, and the honesty they require
> "**When trying to avoid the funnel pathologies of hierarchical models in the limit when group-level variance
> parameters approach zero, one could use zero-avoiding priors (for example, lognormal or inverse gamma
> distributions) to avoid the regions of high curvature**" (related to Chung et al. 2013, 2014).
>
> "**Zero-avoiding priors can make sense when such prior information is available, such as for the
> length-scale parameter of a Gaussian process** (Fuglstad et al. 2019), **but we want to be careful when
> using such a restriction merely to make the algorithm run faster. If we use a restrictive prior to speed
> computation, we should make it clear that this is information being added to the model or make prior
> sensitivity analysis to check whether the added information changes substantially the conclusions.**"
>
> **The general warning that closes the section:**
> > "**We have found that poor mixing of statistical fitting algorithms can often be fixed by stronger
> > regularization. This does not come free, though: in order to effectively regularize without blurring the
> > aspects of the model we want to estimate, we need some subject-matter knowledge — actual prior
> > information. Haphazardly tweaking the model until computational problems disappear is dangerous and can
> > threaten the validity of inferences without there being a good way to diagnose the problem.**"

### Remedy 4 — Adding data

> [!example] Geometry improves with sample size (Figure 12.15, Ch. 12.4, pp. 233-234)
> "**Similarly to adding prior information, one can constrain the model by adding new data sources that are
> handled within the model. For example, a calibration experiment can inform the standard deviation of a
> response.**"
>
> **Panel (a) — the likelihood for $(\mu, \log\sigma)$ from standard normal data:**
> | $N$ | Behavior |
> |---|---|
> | **1** | "**the likelihood increases without bounds**" |
> | **2** | "**the geometry is still funnel-like which can cause computational problems**" |
> | **8** | "**the funnel shape is mostly suppressed**" |
>
> **Panel (b) — a real 8-parameter Lotka-Volterra population dynamics model** (Carpenter 2018):
> | Data points | Behavior |
> |---|---|
> | **6** | "**shows a funnel shape. The red points indicate divergent transitions … the results are not trustworthy**" |
> | **9** | "**Stan becomes able to fit the model, despite the slightly uneven geometry**" |
> | **21** | "**the model is well behaved**" |
>
> **The important difference from the hierarchical funnel:** "**While the funnel-like shape of the posterior in
> such cases looks similar to the funnel in hierarchical models, this pathology is much harder to avoid, and
> we can often only acknowledge that the full model is not informed by the data and a simpler model needs to
> be used.**"
>
> There is no reparameterization that fixes having only six observations.

## Connections

- The folk theorem is what turns every entry in [[Failure Modes and Steps Forward]] into a modeling question
  rather than a tuning question.
- The ladder of abstraction is the bridge between this chapter and Part 2: steps 3 and 4 are
  [[Prior Distributions]] and [[Influence of Likelihood and Prior]] arriving from the computational side.
- "Meeting in the middle" is the debugging version of the incremental construction advice in
  [[Model Expansion - Predictive Consistency and Coherence#Building from simpler components]].

## See Also
- [[Failure Modes and Steps Forward]] — the symptoms these remedies address
- [[What to Do About Convergence Problems]] — the decision procedure
- [[Fitting Simpler Models for Computational Purposes]] — approximating the model rather than fixing it
- [[Sampling Problems with Latent Variables - No Vehicles in the Park]] — reparameterization as a case study
