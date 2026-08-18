---
title: "Failure Modes and Steps Forward"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 12.3, pp. 212-226 (Figures 12.4-12.12)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Fit Fast, Fail Fast]]"
  - "[[Chains, Iterations, and Effective Sample Size]]"
  - "[[Prior Distributions]]"
used_by:
  - "[[Modeling Ideas to Address Computing Problems]]"
  - "[[What to Do About Convergence Problems]]"
  - "[[Sampling Problems with Latent Variables - No Vehicles in the Park]]"
  - "[[Challenge of Multimodality - Differential Equation for Planetary Motion]]"
aliases:
  - "Divergences"
  - "The funnel"
  - "Non-centered parameterization"
  - "Label switching"
  - "Improper posterior diagnosis"
  - "Pedantic mode"
---

# Failure Modes and Steps Forward

> [!summary]
> The book's diagnostic catalogue: **eight named computational pathologies**, each with the symptom, the
> diagnosis, and the fix. The running theme is that **the warning message rarely names the problem** — a
> `max_treedepth` warning meant an unused parameter in one case and an uncentered predictor in another,
> and in neither case was raising `max_treedepth` the answer. The single most useful rule of thumb stated
> here: **"if the proportion of the iterations with observed divergences is higher than say 1%, increasing
> `adapt_delta` is unlikely to help."** The centerpiece is the **funnel**, with the non-centered
> reparameterization that takes $\hat{R}$ from 1.17 to 1.00 and bulk-ESS from 19 to 1382.

## Overview

> [!important] Why parameters end up poorly identified (Ch. 12.3, p. 212)
> "**There are various ways that parameters in a model can be poorly identified by the data. Examples
> include linear regression with near-collinear predictors, logistic regression with separation, and any
> model where two different parameters trade off against each other. The result will be a ridge or plateau
> in the likelihood, so that the data rule out some regions of parameter space but provide little or no
> information along the ridge or in the plateau.**
>
> **In extreme cases such as perfect collinearity or complete separation with flat priors, the flat zone of
> the likelihood extends to infinity, the posterior distribution is improper, and Markov chain simulations
> will drift to infinity. With a proper prior, this degeneracy will not occur, but posterior dependence
> between the parameters can still be high, and this can cause the simulations to progress slowly.**"

> [!definition] Two reasons posterior dependence slows MCMC
> **1. Shape mismatch with the jumping distribution.** "**If near-collinearity induces a high posterior
> correlation between two parameters, then computation can be slow unless the jumping rule also has a high
> correlation between these two variables. In theory this should be possible using an adaptive procedure
> … but this will be difficult in high or even moderate dimensions; if the model has 1000 parameters, the
> corresponding covariance matrix has over half a million parameters.**"
>
> **2. Curvature that varies across the space.** "**The local curvature of the posterior distribution can
> itself vary over the distribution — even for simple linear regressions, covariances between coefficients
> depend on variance parameters, and this gets even more complicated for nonlinear models — so that there
> is no single covariance matrix to aim for.**"
>
> Reason 2 is why adaptation alone cannot solve the funnel: **there is no correct global answer.**
^def-posterior-dependence

## Main Content

### The catalogue

> [!example] Failure 1 — Improper posterior (Figure 12.4)
> **The setup:** logistic regression with **complete separation** in the data, and the prior on `beta`
> accidentally omitted.
>
> **The symptoms:**
> ```
> Warning: 1580 of 4000 (40.0%) transitions ended with a divergence.
> Warning: 2420 of 4000 (60.0%) transitions hit the maximum treedepth limit of 10.
> ```
> plus "$\hat{R}$ **is almost 3 for both `alpha` and `beta`, which indicates that the chains are not mixing
> at all.**"
>
> **The wrong response, and the rule that prevents it:** "**Rather than adjusting the sampling algorithm
> options by increasing `adapt_delta` or `max_treedepth`, it is better first to investigate the
> posterior.**" Figure 12.4b shows draws reaching $10^{35}$ — "**typical when applying Hamiltonian Monte
> Carlo to an improper posterior.**"
>
> > **"In general, if the proportion of the iterations with observed divergences is higher than say 1%,
> > increasing `adapt_delta` is unlikely to help."**
>
> **Stan's pedantic mode catches it statically:**
> ```
> Warning: The parameter beta has no priors.
> Warning: The parameter alpha has no priors.
> ```
> (enabled with `pedantic=TRUE` at compile time, or afterwards with `check_syntax()`).
>
> **The fix:** add `alpha ~ normal(0, 10); beta ~ normal(0, 10);` — "**Now there are no warnings, all
> convergence diagnostics look good.**"
^ex-improper-posterior

> [!example] Failure 2 — An unused parameter (Figure 12.5)
> "**When writing and editing models, a common mistake is to declare a parameter but not use it in the
> model. If the parameter is not used at all, it will not have a proper prior, and the likelihood will not
> provide any information about that parameter, and thus the posterior along that parameter will be
> improper, and any optimization or simulation will drift and never converge.**"
>
> **The symptom is misleading:** only `Warning: 1686 of 4000 (42.0%) transitions hit the maximum treedepth
> limit of 10.` — **which says nothing about an unused parameter.**
>
> **The diagnosis:** "$\hat{R}$**, bulk-ESS, and tail-ESS look good for `alpha` and `beta`, but really bad
> for `gamma`, clearly pointing where to look for problems in the model code.**" The traceplot shows
> chains drifting to values above $10^{20}$.
>
> **Pedantic mode again:** `Warning: The parameter gamma was declared but was not used in the density
> calculation.`
>
> **The transferable lesson:** *per-parameter* diagnostics localize the problem in a way the global warning
> cannot. Always read the whole $\hat{R}$/ESS column, not just the headline warning.

> [!example] Failure 3 — Competing parameters and aliasing (Figure 12.6)
> **The setup:** a redundant column of 1s added to the design matrix alongside an explicit `alpha`
> intercept.
>
> **The symptom is subtle:** "**The Stan sampling time per chain with the original data matrix was less than
> 0.1 seconds. Now the Stan sampling time per chain is several seconds, which is suspicious. There are no
> automatic convergence diagnostic warnings** … **ESS estimates are above the recommended diagnostic
> thresholds, but lower than what we would expect in general from Stan for such a simple problem.**"
>
> **The diagnosis:** the scatterplot shows `alpha` and `beta[1]` with correlation $\mathbf{-0.999}$.
>
> **And what pedantic mode cannot do:** "**The Stan compiler pedantic check examining the code can't
> recognize this issue, as the problem depends also on the data.**" (A constant predictor can arise from an
> augmented intercept, or "**if the data for one of the predictors used in the specific analysis happen to
> take on only one unique value.**")
>
> **Two structural forms of aliasing, both familiar from
> [[Multiple-Choice Exam - A Full Workflow Walkthrough]]:**
> - **Additive.** In the item-response model $y_{jk} = \alpha_j - \beta_k + \text{error}$, "an arbitrary
>   constant can be added to all the $\alpha_j$ and subtracted from all the $\beta_k$." Fixes: proper
>   priors; fixing one value; or **constraining the $\alpha$s or $\beta$s to sum to zero.** "**This is a
>   case of the folk theorem of statistical computing and an example of how computational challenges can
>   motivate part of the model specification.**"
> - **Multiplicative.** With discrimination, $y_{jk} = \delta_k(\alpha_j - \beta_k) + \text{error}$, "the
>   data model is unaltered if all the $\delta_k$ are multiplied by some common factor and all the
>   $\alpha$s and $\beta$s divided by it."

> [!warning] Failure 4 — Label switching in mixture models
> "**If you fit a model with $K$ components, how will the model know which mixture component goes with which
> data?** … **there will be $K!$ identical copies of the likelihood, and fitting the model can lead to severe
> convergence problems, with different chains going to different-but-identical modes.**"
>
> **The double bind, stated precisely:**
> > "**If the data are weak enough so that any of the different posterior modes blur into each other, there
> > will be a problem of interpretation, as the inference for any of the $K$ sets of mixture parameters will
> > include inferences for all the others.** … **if $\mu_1$ and $\mu_2$ are not clearly distinguished, then
> > the mixture weights are well identified in their sum, $\lambda_1 + \lambda_2$, but when the modes move
> > apart, $\lambda_1$ and $\lambda_2$ can be separately identified, resulting in difficult geometry.**
> >
> > **A particular problem with Bayesian inference is that, depending on hyperparameters, a single posterior
> > distribution can contain both these possibilities. In short: if the modes are far apart, MCMC will not
> > mix well, but if the modes are close together, the inferences for individual parameters will be
> > uninterpretable.**"
>
> **Two general solutions** (Stephens 2000):
> 1. **Constraints** — in the prior or the parameterization. E.g. restrict $\mu_1 < \mu_2 < \dots < \mu_K$,
>    or give distinctive priors: $\mu_k \sim \text{normal}(a + bk, \sigma_\mu)$ "**where $b$ is constrained
>    to be positive (as otherwise there will be an aliasing problem with the sign of $b$ and the order of
>    the $\mu_k$ not being jointly identified).**"
> 2. **Post-processing** — reorder the $\mu_k$ for each draw.
>
> "**Both these strategies are more challenging in higher dimensions when there is no natural way to order
> the components.**"
^wrn-label-switching

> [!example] Failure 5 — High posterior correlation from an uncentered predictor (Figure 12.7)
> **The setup:** the Kilpisjärvi temperature regression with **year used raw** (1952-2013) as the predictor.
>
> **The symptom:** a `max_treedepth` warning; ESS above the threshold of 100 "**but lower than we would
> expect after running 4 chains with 1000 saved iterations each for such a simple model.**"
>
> **The diagnosis:** "**the intercept `alpha` denotes the temperature at year 0, which is far away from the
> range of observed $x$. If the intercept changes, the slope needs to change too.**"
>
> **The fix and its magnitude:** subtract 1982.5 from year. "**With this change, there is no posterior
> correlation, bulk-ESS estimates are 3 times bigger, and the average computation time per chain goes from
> 1.3 seconds to less than 0.05 seconds: two orders of magnitude faster inference. In a bigger problem this
> could correspond to reduction of computation time from 24 hours to less than 20 minutes.**"
>
> **The lesson stated explicitly:** "**a computing problem revealed a modeling problem, and fixing the model
> improved the computation. It would have been a mistake to have responded to the slow convergence by simply
> running Stan for more iterations, throwing more resources at the problem.**"
>
> **Why adaptation doesn't save you:** "**By default, Stan's MCMC adaptation learns the posterior scale for
> each parameter. Stan also can learn posterior correlations during warmup** … **However, using the full
> covariance matrix learned in the adaptation phase adds a lot of computation time when the dimensionality
> is large, and thus full covariance adaptation is not enabled by default. Low rank plus diagonal covariance
> matrix would be a useful compromise** (Bales et al. 2019), **but that is not available at the time of this
> writing.**"

> [!example] Failure 6 — Multimodality (Figures 12.8-12.9)
> **The setup:** fit $y_i \sim t_4(\mu,\sigma)$ to 100 points actually drawn from a two-component normal
> mixture, $\phi_i = \pm 5$ with probability 0.5 each.
>
> **Well-separated modes (Figure 12.8):**
> ```
>  variable  mean  median   sd  mad   q5  q95  rhat  ess_bulk  ess_tail
>  mu        -0.1    -0.2  4.3  6.3 -4.9  4.6   1.7         6       163
> ```
> "**the chains are not mixing between the modes.**"
>
> **The probability of missing it entirely:** "**with random initialization each chain has 50% probability of
> ending in either mode. We used Stan's default of 4 chains, [so] there is a 12.5% chance that when running
> Stan once, we would miss the multimodality. If the attraction areas within the random initialization range
> are not equal, the probability of missing one mode is even higher.**"
>
> **The efficient alternative to many chains:** "**Instead of running a large number of costly Markov chains,
> we can run the much faster Pathfinder algorithm from different initial values to help find more modes, and
> then start fewer Markov chains based on the found modes. Pathfinder can also discard modes that have
> negligible posterior mass so that further computation is focused where it matters.**"
>
> **A limitation of more chains:** "**the probability of chains ending in different modes can be different
> from the relative probability mass of each mode, and running more chains doesn't fix this.**"
>
> **Closer modes (Figure 12.9)** — means at $\pm 3$ instead of $\pm 5$:
> - $\hat{R}$ "**a bit over the diagnostic threshold**," bulk-ESS "suspiciously small";
> - **the tell-tale signature: "Tail-ESS values that are much larger than bulk-ESS are an indication of
>   multimodality"**;
> - the traceplot shows "**chains jumping between the modes, but the jumps happen only occasionally … which
>   can lead to large bias in estimating the relative mass of each mode**";
> - **the rank ECDF difference plot** (Säilynoja, Bürkner, and Vehtari 2022) "**shows that the ranks are
>   clearly deviating from the uniformity assumption.**"
> - **Here, running longer helps:** "**As the chains are mixing between the modes, even if slowly, running
>   the chains longer or running more chains will improve the accuracy.**"
>
> **Remedies:** tempering algorithms; **adaptive path sampling** usable with Stan (Yao, Cademartori, et al.
> 2025); or **stacking to weight chains by cross validation** (Yao, Vehtari, and Gelman 2022), which
> "**will have the approximate effect of discarding chains that are stuck in out-of-the-way low-probability
> modes.**"
>
> **The honest limit:** "**in higher dimensions there is no general way to find all the modes of a
> distribution through local searching. So to make progress on multimodal problems it can be helpful to gain
> some statistical understanding, starting with the question of where the multimodality is coming from.**
> **From a Bayesian perspective, each mode in the posterior can be thought of as a different explanation or
> generative model for the data, so one way to connect the modes is by continuous model expansion**" —
> [[Model Expansion - Predictive Consistency and Coherence]].
^ex-multimodality

> [!example] Failure 7 — Numerical overflow from distant initial values (Figure 12.10)
> **The setup:** Poisson regression with proper $\text{normal}(0,10)$ priors, but predictors far from unit
> scale.
>
> **The symptom:**
> ```
> Chain 1 Rejecting initial value:
> Chain 1   Log probability evaluates to log(0), i.e. negative infinity.
> Chain 1   Stan can't start sampling from this initial value.
> ```
> plus large $\hat{R}$, small ESS, and scatterplots showing "**two chains have been stuck away from two
> others.**"
>
> **The precise mechanism:** "**the initial values for `beta` are sampled from $(-2,2)$ and `x` has some
> large values. If the initial value for `beta` is higher than about 0.3 or lower than $-0.4$, some of the
> values of $\exp(\alpha + \beta x)$ will overflow to floating point infinity.**"
>
> **Two fixes:** "**change the initialization range** … **the sampling succeeds if the initial values are
> drawn from $(-0.001, 0.001)$**, achievable with `init=0.001`. **Alternatively we can scale `x` to be close
> to unit scale.**"

> [!example] Failure 8 — Varying curvature and thick tails (Figure 12.11)
> "**Even more difficult [than high correlation] is when the pattern of scale or correlation varies
> throughout the distribution, so that the best adaptation in one place will not work well in other
> places.**
>
> **The logarithm of the normal density function has constant curvature, which makes global adaptation easy.
> Otherwise the distribution has varying curvature, and if the tail is far from normal, the high variation in
> curvature can lead to problems.**"
>
> **The demonstration:** the separated logistic regression, now with a **proper but thick-tailed
> $\text{Cauchy}(0,10)$ prior.** $\hat{R}$ near threshold, ESS low, and "**the marginal histograms and joint
> scatterplots show a thick tail. The dynamic HMC algorithm used by Stan, along with many other MCMC
> methods, have problems with such thick tails, and mixing is slow.**" Rank ECDF plots make the between-chain
> differences clear.
>
> **Both directions are hard:** "**Very thin-tailed posteriors can also be challenging as the log density
> drops faster and faster in the tail and now the required step size in the tail would need to be smaller
> than in the bulk.**"
>
> **An important caveat about Cauchy priors:** "**Using the Cauchy prior does not always lead to a
> thick-tailed posterior density. For constrained parameters, Stan makes automatic transformations and moves
> in the unconstrained space** … **the Cauchy prior for a positively constrained parameter has a tail shape
> on the transformed scale that leads to efficient sampling.**"

> [!example] Failure 9 — A scale parameter missing its positivity constraint
> Forgetting `real<lower=0> sigma;` produces:
> ```
> Exception: normal_id_glm_lpdf: Scale vector is -0.747476, but must be positive finite! ...
> ```
> "**Sometimes these warnings appear in the early phase of the sampling, even if the model has been correctly
> defined. Now we have a lot of warnings: the sampler keeps trying to jump to infeasible values** … **Many
> rejections may lead to biased estimates.**"
>
> **Pedantic mode:** `A normal_id_glm distribution is given parameter sigma as a scale parameter (argument
> 4), but sigma was not constrained to be strictly positive.`

### The funnel

> [!definition] Where the funnel comes from (Ch. 12.3, p. 221)
> For $y_i \sim \text{normal}(\mu_{k[i]}, \sigma)$ with $\mu_k \sim \text{normal}(\mu_0, \sigma_0)$, plotted
> on the scale $(\mu_1,\dots,\mu_K, \log\sigma_0)$:
>
> "**this prior can be visualized as having the shape of a funnel or, more precisely, a horn, with a long
> narrow neck corresponding to the zone where $\sigma_0 \to 0$ and the $\mu_k$ are (probabilistically)
> constrained to be near zero, and a wide mouth corresponding to large values of $\sigma_0$.**
>
> **For moderate or large dimensionality, most of the mass of a unit multivariate normal distribution is
> close to the surface of the sphere; thus, if $K$ is moderate or large, most of the mass of this joint prior
> will be on the edge of the funnel.**"
>
> **Two distinct challenges:**
> 1. "**Almost all the mass is on the edge of the funnel, but moving along individual dimensions of $\mu_k$
>    or $\sigma_0$ takes you across or into the funnel, not along the edge.**"
> 2. "**The curvature of this edge, as a function of $\log\sigma_0$, is constantly changing. The ideal step
>    size of HMC-NUTS depends on where you are in parameter space** … **When in the main body of the
>    distribution, the chains will have difficulty getting into the neck of the funnel, and the chains will
>    have a corresponding difficulty leaving the neck once they get there.**"
^def-funnel

> [!example] The funnel diagnosed and fixed (Figure 12.12, Ch. 12.3, pp. 222-223)
> **The data:** Kilpisjärvi temperatures with each year a group — **71 groups, 3 observations each.** "**With
> only three observations per group, the likelihood is weak for each $\mu_k$, and the prior is likely to
> dominate the posterior shape. The number of groups is 71, and this high dimensionality makes the funnel
> challenging.**"
>
> **Centered parameterization:**
> ```stan
> model {
>   mu0 ~ normal(10, 10);
>   sigma0 ~ normal(0, 10);
>   mu ~ normal(mu0, sigma0);      // <- the funnel
>   sigma ~ lognormal(0, 0.5);
>   y ~ normal(mu[x], sigma);
> }
> ```
> ```
> variable  mean median   sd  mad   q5  q95 rhat ess_bulk ess_tail
> sigma0    0.32   0.27 0.21 0.23 0.07 0.72 1.17       19       36
> ```
> ```
> Warning: 406 of 4000 (10.0%) transitions ended with a divergence.
> ```
> "**Figure 12.12a plots the posterior draws of $\log\sigma_0$ and $\mu_1$ with the draws associated with
> diverged Hamiltonian simulation shown in red** … **the flagged draws [are] in the narrow bottom part,
> hinting the sampler has not been able to visit the narrow part of the funnel due to a large step size.**"
>
> **The tempting non-fix — raise `adapt_delta`:** Figure 12.12b shows "**the sampler is able to reach much
> smaller $\log\sigma_0$ values, and there are no divergences. However, the convergence diagnostics still
> indicate serious mixing problems**": $\hat{R} = 1.13$, bulk-ESS 28.
>
> **The real fix — non-centered parameterization**, defining $\mu_k = \mu_0 + \sigma_0 z_k$:
> ```stan
> parameters {
>   real mu0;
>   real<lower=0> sigma0;
>   vector[K] z;                   // latent variable
>   real<lower=0> sigma;
> }
> transformed parameters {
>   vector[K] mu = mu0 + sigma0 * z;
> }
> model {
>   mu0 ~ normal(10, 10);
>   sigma0 ~ normal(0, 10);
>   z ~ normal(0, 1);              // <- sampling happens here, no funnel
>   sigma ~ lognormal(0, 0.5);
>   y ~ normal(mu[x], sigma);
> }
> ```
> ```
> variable  mean median   sd  mad   q5  q95 rhat ess_bulk ess_tail
> sigma0    0.32   0.30 0.22 0.24 0.03 0.73 1.00     1382     2186
> ```
> **$\hat{R}$: 1.17 → 1.00. Bulk-ESS: 19 → 1382.**
^ex-funnel-fix

> [!warning] The non-centered parameterization is not universally better
> "**The funnel shape in the posterior often arises from a funnel-shaped prior and weak likelihood.
> Unfortunately the non-centered parameterization can create its own computational problems in the case of a
> strong likelihood, as arises with a large number of observations in each group. Thus we may need to think
> or test which parameterization to use.**
>
> **We can use the centered parameterization if the likelihood is strong, but with a strong likelihood for
> each group, it is also possible that a hierarchical model is not needed at all. The most challenging case
> is when some groups have weak likelihood and some groups have strong likelihood, as then different
> parameterizations would be the best for each group parameter.**"
>
> **The state of the art:** "**at the time of this writing, there is no automatic adaptive parameterization
> to solve the problem in the general case. However, a variant of the NUTS algorithm has been developed,
> WALNUTS** (Bou-Rabee et al. 2025), **that can adapt the step size locally during the actual sampling, and
> this shows great promise in reliably sampling posteriors with highly varying curvature.**"

### Two structural notes

> [!definition] High dimensions: the $3d$ rule
> "For the $d$-dimensional unit normal with symmetric jumping kernel
> $\theta^* | \theta^{t-1} \sim \text{MVN}(\theta^{t-1}, \sigma_{\text{jump}}^2 I_d)$, the kernel that
> maximizes Metropolis efficiency has
> $$\sigma_{\text{jump}} \approx 2.4/\sqrt{d}$$
> **and it has an efficiency of approximately $0.33/d$, implying that roughly $3d$ iterations of the chain
> are required to get the equivalent of one new independent draw**" (Gelman, Roberts, and Gilks 1996).
>
> "**Hamiltonian Monte Carlo is more effective because its iterations follow the gradient and curve through
> the distribution, effectively moving around this sphere more efficiently.**" See
> [[The Typical Set and the Log Posterior Density]].

> [!warning] The mixture likelihood is unbounded — always
> For $p(y|\mu,\sigma,\lambda) = \prod_i \left(\sum_k \lambda_k \,\text{normal}(y_i|\mu_k,\sigma_k)\right)$
> (Eq. 12.1):
>
> "**It turns out there is no maximum: the likelihood is unbounded, and this is the case no matter what data
> are observed. To get the likelihood arbitrarily large, set one of the mixture means to one of the data
> points — for example, set $\hat\mu_1 = y_1$ — and then let the corresponding scale $\sigma_1$ go to zero**
> … **the mixture model allows the other components to take up the slack, as it were, allowing this infinite
> likelihood.**
>
> **And the problem is even worse than this might already sound, because these points of infinite likelihood
> are all over, as any mode can line up in this way with any data point.**"
>
> **The remedy: constrain the scales.** "**One way to constrain the model to be identified is to restrict the
> range of the scale parameters $\sigma_k$, most directly by restricting them to all be equal, or more
> generally by giving them a common distribution, for example $\log\sigma_k \sim \text{normal}(\log\sigma_0,
> 1)$** … **this prior roughly keeps the scale parameters within an order of magnitude of each other.**"
>
> **The worked case (Gelman and King 1990)** — Democratic vote share in contested U.S. congressional
> elections, a three-component mixture: one mode near **0.4 with sd ~0.1** (Republican-leaning districts),
> one near **0.6 with sd ~0.1** (Democratic-leaning), and "**a broader mode centered around 0.5 with a
> standard deviation of about 0.4 to catch everything else.**" Specified with informative hyperpriors —
> $\text{normal}(0.4, 0.1)$ and $\text{normal}(0.6, 0.1)$ on the first two component means. "**The key point
> is a strong prior made sense here, given our goals in fitting this model in the first place.**"
>
> A retrospective aside worth noting: the model was on the logistic scale, "**in retrospect, probably an
> unnecessary step, given that the two parties' vote shares in most districts are between 30% and 70%.**"

### What if you don't look?

> [!important] Three outcomes of fitting blindly (Ch. 12.3, pp. 225-226)
> **1. The algorithm fails to converge.** "**This is arguably the best scenario, as it would send you back to
> the model to figure out what went wrong.**"
>
> **2. The chains appear to mix, but do not capture the posterior.** "**Either because the simulations never
> happen to venture into dangerous zones of parameter space (such as the neck of the funnel or the spike
> modes in the mixture model) or because all the chains happen to start near and remain within one of the
> modes.**" The safeguard: "**it makes sense to understand the fitted model by simulating replicated data and
> comparing to observed data — that is, posterior predictive checking — which is something you should be
> doing anyway. An inappropriate fit, such as a mixture distribution with a spike at one point, should then
> produce unreasonable data, suggesting that a stronger prior is needed.**"
>
> **3. Something you never find.** "**This is not to say that convergence monitoring and predictive checking
> will reveal all problems. These steps will reveal bad fits, but it is possible for there to be other,
> unexplored, areas of parameter space that could also fit the data but were not reached by the simulation
> algorithm.**"
>
> **The remaining tool:** "**Another useful debugging technique is the fake-data check** … **run the MCMC
> algorithm and check that it converges to a distribution consistent with the assumed true parameter
> values**" — [[Simulation-Based Calibration - Overview]].

## Connections

- Nearly every failure here is fixed by a *modeling* change (a prior, a centering, a reparameterization)
  rather than a sampler setting — which is the folk theorem of
  [[Modeling Ideas to Address Computing Problems]] stated as a catalogue.
- The funnel and multimodality both reappear as full case studies:
  [[Sampling Problems with Latent Variables - No Vehicles in the Park]] (Ch. 29) and
  [[Challenge of Multimodality - Differential Equation for Planetary Motion]] (Ch. 30).
- The improper-posterior example is the computational half of the $y=0$ binomial discussion in
  [[Prior Distributions#Noninformative priors, and why "flat" is not "weak"]].

## See Also
- [[Fit Fast, Fail Fast]] — why diagnosing beats waiting
- [[Modeling Ideas to Address Computing Problems]] — the folk theorem and systematic remedies
- [[What to Do About Convergence Problems]] — the decision procedure when $\hat{R}$ is high
- [[Computational Troubleshooting]] — the 2020 paper's shorter catalogue
