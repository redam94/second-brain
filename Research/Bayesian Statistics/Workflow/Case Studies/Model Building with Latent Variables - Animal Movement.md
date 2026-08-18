---
title: "Model Building with Latent Variables - Animal Movement"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 26, pp. 401-416 (Figures 26.1-26.10, Eq. 26.1-26.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Failure Modes and Steps Forward]]"
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Sampling Problems with Latent Variables - No Vehicles in the Park]]"
aliases:
  - "Hidden Markov model"
  - "HMM"
  - "White shark movement"
  - "Forward algorithm"
  - "Label switching in HMMs"
  - "Ordering constraints can hurt"
---

# Model Building with Latent Variables — Markov Models for Animal Movement

> [!summary]
> A **hidden Markov model** for white shark movement in Gansbaii, South Africa: 14 sharks tracked at
> 5-minute intervals, with step lengths and turning angles clustered into latent behavioral states. The
> chapter's most valuable content is a **failed attempt at a standard fix**: imposing the usual
> `positive_ordered` constraint to solve label switching **introduces its own pathology** —
> "**this ordering introduces pathology into the posterior distribution that can cause trouble in exploring
> the parameter space**," with chains sticking where $\mu_1 \approx \mu_2$. Non-exchangeable priors also
> fail. The solution that works: **exchangeable priors with no constraint at all, then reorder the draws
> after sampling** — diagnosed by noticing that **$\hat{R}$ for `lp__` is 1.0** while $\hat{R}$ for the
> parameters is 10.5.

## Overview

**The setting.** White sharks are "a top predator, playing an important role in marine ecosystems, and are
listed as a vulnerable species," and also the object of a cage-diving ecotourism industry. Researchers
tagged 14 sharks (5 male, 9 female, 290-450 cm) with acoustic transmitters and followed them at a 20 m
minimum distance "**so as to not affect their natural movements**," recording position every 5 minutes.

> [!important] A data-preprocessing decision, and its justification (Ch. 26.1, pp. 401-402)
> Tracks contain long gaps "as researchers were unable to locate the shark or get a good enough signal."
> Two standard options: interpolate, or split.
>
> "**Interpolating missing positions from animal movement data is tricky, especially with longer temporal gaps
> in which the animal could have exhibited multiple movement types. Interpolation approaches implemented for
> animal movement data, like the continuous-time correlated random walk, will often assume a nearly straight
> line movement between two geographic points.**
>
> **For now, to avoid making assumptions of how to interpolate missing data, we split the longer time series
> when there were gaps of more than 30 minutes.**" Tracks with fewer than 10 observations were then removed.
>
> A clean instance of choosing the assumption you can defend over the one that keeps more data.

## Main Content

### The model

> [!definition] Discrete-time, finite-state HMM (Ch. 26.2, pp. 402-403)
> $$y_t \mid z_t \sim f(y_t \mid \theta_{z_t}), \qquad z_t \mid z_{t-1} \sim \text{categorical}(\omega_{z_{t-1}}), \qquad z_1 \sim \text{categorical}(\delta)$$
>
> "**In its most basic form, an HMM is a time series model where the distribution that generates the data at
> each point in time depends on a latent state generated according to a first-order Markov chain.**"
>
> **Why ecologists use them:** "**an animal is assumed to exhibit a finite set of behaviors and, depending on
> the temporal scale at which the data are collected, it is likely to exhibit the behavior for some period of
> time before switching to another behavior.**"
>
> **With an honest caveat on interpretation:** "**While generally the HMM states to animal behaviors is not a
> one-to-one relationship, we can still learn a lot about animals from the patterns that emerge.**"
^def-hmm

> [!definition] The state-dependent distributions, chosen for the data at hand
> Observations are step length $s_t$ and turning angle $a_t$. Two independence assumptions are named:
> **longitudinal conditional independence** (a joint distribution allowing correlation) vs.
> **contemporaneous conditional independence** ($f(s_t, a_t|z_t) = f(s_t|z_t) f(a_t|z_t)$); the latter is
> adopted.
>
> $$a_t \mid z_t \sim \text{von Mises}(\tau_{z_t}, \kappa_{z_t})$$
> $$s_t \mid z_t \sim p_{z_t}\,\mathbb{I}(s_t = 0) + (1-p_{z_t})\,\text{gamma}(\mu_{z_t}, \sigma_{z_t})$$
>
> **Three modeling details worth noting:**
> - **Gamma in mean-sd parameterization**, recovering $\alpha = \mu^2/\sigma^2$, $\beta = \mu/\sigma^2$: "**we
>   can write it using the location-scale $(\mu,\sigma)$ parameterization which facilitates prior
>   specification**" — the scale-free reparameterization principle of
>   [[Generative and Partially Generative Models#Scale transformations]].
> - **A point mass at zero:** "**due to artifacts in the data-collection process, some step lengths were
>   computed as zero. To account for this, we add a point mass on 0 to the step length distribution for each
>   state.**"
> - **The von Mises** is "a continuous distribution on the circle, where the state-specific location parameter
>   $\tau_k$ refers to the expected directional mean."

> [!definition] Marginalizing the discrete states — the forward algorithm (Eq. 26.1, Ch. 26.2, pp. 403-404)
> "**In order to fit an HMM in Stan, we need to** [marginalize over the states]**, as Stan does not support
> discrete parameters.**"
>
> The likelihood as a matrix product, with $\omega$ the $K\times K$ transition matrix and
> $P(y_t) = \text{diag}(f(y_t|\theta_{z_t=1}), \dots, f(y_t|\theta_{z_t=K}))$:
> $$\mathcal{L}(\theta|y) = \delta^\top P(y_1)\,\omega P(y_2)\cdots \omega P(y_T)\,\mathbf{1}$$
>
> "**The likelihood can be evaluated efficiently using a recursive process called the forward algorithm, with a
> computational cost that is linear in the number of observations $O(TK^2)$.**"
>
> **On the log scale, for stability:**
> $$\log \alpha_{1,k} = \log\delta_k + \log f(y_1|z_1=k)$$
> $$\log \alpha_{t,k} = \log\left(\sum_{i=1}^K \exp\big(\log\alpha_{t-1,i} + \log\omega_{i,k}\big)\right) + \log f(y_t|z_t=k)$$
> $$\ell_T = \log\sum_{i=1}^K \exp(\log\alpha_{T,i})$$
>
> The Stan implementation uses `log_sum_exp` at each step and **pre-transposes the log transition matrix**
> (`log_tpm_tr[j,i] = log(tpm[i,j])`) so the inner loop is a single vectorized `log_sum_exp`.
^def-forward-algorithm

### The label-switching saga

> [!warning] Attempt 1 — `positive_ordered`, the textbook fix, backfires (Figure 26.2, Ch. 26.2, p. 405)
> "**HMMs are mixture models that suffer from issues of label switching: the parameters are only identifiable up
> to permutation of the state labels.**" The standard remedy:
> ```stan
> parameters {
>   positive_ordered[Nstates] mu;
> }
> ```
> **Result with 10 chains:** "**our chains fail to converge, even after taking into account the possibility of
> label switching** … **Multiple chains stay in an area of the parameter space where $\mu_1 \approx \mu_2$.**"
>
> > "**This issue turns out to have been introduced when we imposed an ordering of the parameters. While an
> > ordering of the state-dependent means could theoretically alleviate some of the issues of label switching,
> > this ordering introduces pathology into the posterior distribution that can cause trouble in exploring the
> > parameter space.**"
>
> "**The difficulty at this stage is that it is unclear how much probability mass is associated with the area
> where $\mu_1 \approx \mu_2$.**"
>
> This is a genuinely important correction to the standard advice in
> [[Failure Modes and Steps Forward#Failure 4 — Label switching in mixture models]], which lists ordering
> constraints as one of two general solutions. **The constraint creates a hard boundary that the sampler can
> get stuck against.**
^wrn-ordering-backfires

> [!warning] Attempt 2 — non-exchangeable priors, also fails (Figure 26.3, Ch. 26.2, p. 406)
> ```stan
> mu[1] ~ normal(0.1, 0.05);
> mu[2] ~ normal(0.2, 0.05);
> ```
> "**to reflect that we expect $\mu_1 < \mu_2$ but allow some overlap.**"
>
> **Result:** "**Again, the chains do not mix well** … **the mean estimates are concentrated in roughly two
> locations but that the ordering is not preserved as sometimes $\mu_1 > \mu_2$.**"
>
> **And here is the diagnostic subtlety:** "**Keeping in mind that our priors for these parameters are
> non-exchangeable, our models are then different when $\mu_1 < \mu_2$ compared to when $\mu_1 > \mu_2$, which
> is reflected in the difference in the values of `lp__`.**"
>
> The non-exchangeable prior does not merely label the states — **it makes the two labelings genuinely
> different models**, so the chains are exploring a mixture of two distinct posteriors.

> [!example] Attempt 3 — exchangeable priors, no constraint, reorder afterwards (Figures 26.4-26.5)
> ```
>            mean  se_mean    sd   2.5%    50%   97.5% n_eff  Rhat
> mu[1]      0.16     0.03  0.07   0.08   0.15    0.24     5 10.53
> mu[2]      0.16     0.03  0.07   0.08   0.15    0.24     5 10.62
> tpm[1,1]   0.97     0.00  0.01   0.93   0.97    0.99    21  1.16
> lp__    -424.07     0.04  2.51 -429.8 -423.8  -420.19  4103  1.00
> ```
> **$\hat{R} = 10.5$ for the means. And this is fine.**
>
> > "**One indication that the lack of convergence may be due to label switching is that $\hat{R}$ for the
> > unnormalized log posterior density, `lp__`, is 1.0.**"
>
> **This is the transferable diagnostic:** in a symmetric-mode problem, `lp__` is invariant to the relabeling
> while the parameters are not. **A clean `lp__` alongside terrible parameter $\hat{R}$ is the signature of
> label switching rather than genuine non-convergence.**
>
> "**We can reorder our joint posterior draws so that the parameter values associated with the smaller of the
> two $\mu$ correspond to the same state across all chains and check for convergence.**" After reordering, the
> traceplots "**show good mixing (also revealed by $\hat{R}$ being less than 1.01).**"
>
> **Note also the compute budget:** 10 chains rather than the usual 4 — which is what made the diagnosis
> possible, per
> [[Failure Modes and Steps Forward#Failure 6 — Multimodality]]'s advice to run more chains when multimodality
> is suspected.
^ex-lp-diagnoses-label-switching

### State decoding

> [!definition] Three algorithms, all in `generated quantities` (Ch. 26.3, pp. 409-410)
> Once the parameters are fit, the latent states can be recovered three ways:
> | Algorithm | Gives |
> |---|---|
> | **Forward-backward** | marginal state probabilities $p(z_t \mid y)$ at each time |
> | **Viterbi** | the single most likely state sequence |
> | **Forward-filtering backward-sampling (FFBS)** | **draws from the posterior of the whole state sequence** |
>
> The forward-backward code recomputes the forward variables $\alpha$ and adds backward variables $\beta$, with
> $$\Pr(z_t = n \mid y) = \exp\big(\log\alpha_{t,n} + \log\beta_{t,n} - \ell\big)$$
>
> **FFBS** draws the last state from $p(z_T|y)$ and then walks backwards:
> ```stan
> state_sequence[Tlen] = categorical_rng(state_probs[Tlen]);
> for (t in 1:(Tlen-1)) {
>   t_star = Tlen - t;
>   ffbs_prob_unnorm = exp(log_tpm_tr[state_sequence[t_star+1]] + lalpha_mat[t_star]);
>   ffbs_prob_norm = ffbs_prob_unnorm / sum(ffbs_prob_unnorm);
>   state_sequence[t_star] = categorical_rng(ffbs_prob_norm);
> }
> ```
>
> **FFBS is the one that propagates uncertainty properly** — Viterbi gives a point estimate of the sequence,
> while FFBS gives draws that can be carried into any downstream summary, in the spirit of
> [[Simulation to Express Uncertainty]].
^def-state-decoding

### Extending to time-varying transitions and varying effects

> [!definition] Predictors in the transition matrix (Eq. 26.2-26.3, Ch. 26.4, p. 413)
> "**The time-homogeneous Markov model for animal movement implies that there will be no trends in the
> frequencies of different behaviors in steady state. Instead, animals are generally likely to vary in
> exhibition of their behaviors depending on exogenous and endogenous variables.**"
>
> Via a multinomial logit link on each row — for $K=2$, a logistic regression on the off-diagonals:
> $$\text{logit}(\omega^t_{ij}) = \beta_{0,i} + \beta_{1,i}\cos\!\left(\frac{2\pi t}{1440}\right) + \beta_{2,i}\sin\!\left(\frac{2\pi t}{1440}\right) + \beta_{3,i}\,\text{chum}_t + \beta_{4,i}\,\text{male}_t$$
>
> **The scientific question motivating this:** "**one of the key questions in the study of white shark movement
> in South Africa is how their behaviors may be affected by the tourism industry's chumming activities.**"
>
> **Time of day is encoded as a cosine/sine pair** on minute-of-day (1440 minutes), a compact way to represent
> a smooth periodic effect with two coefficients.
>
> **Implementation detail:** the diagonal is fixed to 1 before row-normalization
> (`tpm[t,i,j] = 1` when `i == j`), which identifies the multinomial logit.

> [!important] Varying effects, and where to put them
> "**Incorporation of predictors in the transition probability matrix may not completely explain the
> heterogeneity across individuals.**"
> $$\text{logit}(\omega^t_{ij}) = \epsilon_{n,i} + \sum_m \beta_{m,i} x_{m,t}, \qquad \epsilon_{n,i} \sim f(\cdot)$$
>
> **Where to place them, and the tradeoff:** "**Varying effects can be modeled in the transition probability
> matrix only, often to ensure that the states can be interpreted in the same context across individuals.
> However, unexplained variability across individual animals that may affect how various behaviors manifest can
> be better captured by modeling varying effects in the state-dependent distributions.**"
>
> **The choice of distribution for $\epsilon$:** the literature uses either continuous random effects or
> discrete ones (Towner et al. 2016 use discrete "as it only requires summations to evaluate the likelihood");
> here continuous.
>
> **The additional motivation, which is about study design:** "**to account for the bias introduced by the
> researchers following the sharks for short periods of time as well as combining varied length time
> series.**"
>
> **And a familiar computational note:** "**Fitting our initial model with varying effects for tracks resulted
> in divergences, but using a non-centered parameterization resolved the issue**" —
> [[Failure Modes and Steps Forward#The funnel]].

### The biology

> [!example] Two movement patterns (Ch. 26.4, p. 414)
> | State | Turning angles | Step length (per 5 min) | Interpretation |
> |---|---|---|---|
> | 1 | varied, $-\pi$ to $\pi$ | **~8 m** | "**area-restricted search type behavior**" |
> | 2 | centered around 0 | **~22 m** | "**transitory behavior**" |
>
> "**From the shark positional data, we were able to identify two movement patterns that are of biological
> interest to the researchers.**" Figure 26.10 shows 500 posterior draws of the time-varying transition
> probabilities for male and female sharks without chum, and for one specific track including proximity to
> chumming — the estimand the study was designed to address.

## Examples

> [!example] General lessons (Ch. 26.5, p. 415)
> "**When fitting hidden Markov models in a Bayesian framework, we learned that convergence issues can arise as
> a result of label switching and specification of the prior distribution. These are different than the
> convergence issues we expect when the MCMC fails to sufficiently explore the parameter space. However,
> carefully specifying prior distributions and reordering our posterior draws can fix some of these problems.**
>
> **For instance, in the case of animal movement modeling, we often desire that the state-dependent
> distributions be sufficiently different from one another, making the mean of the distribution an ideal
> parameter to use for reordering the joint posterior draws after sampling has been done.**"
>
> **The generality of the structure:** "**The basic structure of a hidden Markov model is used across
> Markov-switching, regime-switching, and state-switching models in statistics, and is used across many fields
> like economics, finance, astronomy, and ecology.**"
>
> **Extensions not pursued:** "additional states, specifying a joint distribution for step lengths and turning
> angles, allowing for a higher order dependence in our underlying Markov chain, or including more flexible
> structures in our state-dependent distribution and additional predictors."

> [!example] Exercises 26.2-26.3 — local vs. global posterior predictive checks (Ch. 26.6, p. 416)
> The pairing is the point, and it is the
> [[Posterior Predictive Checking#Prior and posterior checks in one hierarchical framework|three-replication
> distinction]] made concrete:
> - **26.2 (local):** simulate $y^{\text{rep}}$ "**corresponding to the 14 sharks in the analysis**" — same
>   sharks, same varying effects.
> - **26.3 (global):** simulate "**corresponding to 14 *new* sharks drawn from posterior predictive
>   distribution**" — new draws of the track-level effects.
>
> Both parts then ask for 100 replicates and a discussion of "**any aspects of the data that are not captured
> by the posterior predictive simulations.**"
>
> Exercise 26.1 is a graphics exercise with a pointed instruction: "**The ordering of the panels should make
> sense; don't just list them in order of ID number**" — the sorting lesson of
> [[Posterior Predictive Checking - Stochastic Learning in Dogs]].

## Connections

- The `lp__`-is-fine-but-parameters-are-not diagnostic is the most portable thing in this chapter, and applies
  to any model with **exchangeable symmetric modes** — mixtures, factor models, network models.
- The finding that **ordering constraints can create pathology** qualifies the advice in
  [[Failure Modes and Steps Forward]] and in
  [[Using a Fitted Model for Decision Analysis - Classification Competition]] (Exercise 20.3), where `ordered`
  is recommended as the fix.
- The forward algorithm here is the discrete-state analogue of the Kalman filter recursion in
  [[Linear-Gaussian State-Space Models]] — both marginalize latent states in $O(T)$ to give a computable
  likelihood.

## See Also
- [[Failure Modes and Steps Forward]] — label switching, mixtures, and the funnel
- [[Linear-Gaussian State-Space Models]] — the continuous-state counterpart
- [[The Kalman Filter]] — the analogous forward recursion
- [[Simulation to Express Uncertainty]] — why FFBS draws beat a Viterbi point estimate
