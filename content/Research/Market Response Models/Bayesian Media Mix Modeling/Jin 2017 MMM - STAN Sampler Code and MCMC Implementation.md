---
title: "Jin 2017 MMM - STAN Sampler Code and MCMC Implementation"
tags:
  - source/ingested
  - topic/market-response
  - topic/mcmc
  - type/definition
  - method/stan
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 3, pp. 6-7; Sec. 5.1, p. 11; Sec. 8 Table 8, p. 23; Appendix 'STAN Sampler Codes', pp. 28-30; References pp. 33-34"
date_updated: 2026-10-13
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]"
  - "[[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]"
aliases:
  - Jin 2017 Stan code
  - Jin MMM Stan model
  - Delayed adstock Hill Stan program
---

# Jin 2017 MMM - STAN Sampler Code and MCMC Implementation

> [!summary]
> The paper's appendix gives a complete **Stan program** for the delayed-adstock + Hill MMM (Eq. 7) with the Table 3 priors. Lagged spend is pre-arranged as an $N \times M \times L$ array of row vectors. Each draw computes $\alpha^{(l-\theta)^2}$ weights, normalises the adstock, applies the Hill function, and forms $\mu_t=\tau+\sum_m\beta_m\text{Hill}_m+\gamma^\top z_t$. The authors also wrote a **custom C++ Gibbs sampler** (slice-sampling updates using the BOOM library), which ran about **20 times faster in wall-clock terms** on the simulated data (52 s for 10k iterations vs 1149 s for 1k). Strong posterior correlation among the transformation parameters makes HMC slow: hours to days on a few thousand data points.
^summary

## Overview

Sec. 3 (pp. 6-7) describes two samplers.
1. **Gibbs sampling** (Gelfand & Smith 1990; Geman & Geman 1984) splits the parameter vector into blocks and samples each low-dimensional conditional in turn. The non-conjugate conditionals are drawn with Neal's (2003) **slice sampler**, in C++ on Scott's BOOM library.
2. **Hamiltonian Monte Carlo** via **Stan** (Carpenter et al. 2016; NUTS, Hoffman & Gelman 2014). The user writes the log density and Stan does the inference.

**References cited for estimation and sampling in Sec. 3 (citation map).**

| Topic | Reference cited | Role in the paper |
|---|---|---|
| Frequentist fit, Eq. 8 | Lehmann & Casella (1998), *Theory of Point Estimation*, p. 449 | variance and asymptotic distribution of the MLE $\hat\Phi=\arg\max_\Phi L(y\mid X,Z,\Phi)$. The paper calls $L$ the **log likelihood** |
| Posterior summaries | Hartigan (2012) *Bayes Theory*; Hoff (2009) *A First Course in Bayesian Statistical Methods* | quantile-based credible intervals as a fuller summary than the posterior mean, median or mode |
| Gibbs sampling | Gelfand & Smith (1990); Geman & Geman (1984) | partition $\Phi$ and draw low-dimensional conditionals |
| Slice sampling | Neal (2003) | non-conjugate updates inside the custom Gibbs sampler |
| Software | Scott (2016) BOOM R/C++ library; Carpenter et al. (2016) Stan | Gibbs implementation; HMC implementation |
| HMC / NUTS | Hoffman & Gelman (2014) | the method Stan runs |
| Priors | Gelman (2006), "Prior distribution", *Encyclopedia of Environmetrics*, pp. 1634-1637 | priors with the same support give similar posteriors when the data are informative, and dominate when they are not |
| Convergence | Gelman & Rubin (1992) | $\hat R$ (potential scale reduction factor), reported as equal to or close to 1 for all four shampoo models (Table 8 caption) |

High correlation between the transformation parameters (the near-unidentifiable $(K,S,\beta)$ ridge and the $\alpha$-$\theta$ coupling) is "a special challenge" for Stan. It finishes in reasonable time on a few hundred points but can take "quite a few hours or even a couple of days" on a few thousand points. The custom Gibbs sampler is "much more efficient" (p. 7).

## Main Content

> [!algorithm] Stan program from the Appendix (pp. 28-30; transcribed from the source)
> ```stan
> functions {
>   // the Hill function
>   real Hill(real t, real ec, real slope) {
>     return 1 / (1 + (t / ec)^(-slope));
>   }
>   // the adstock transformation with a vector of weights
>   real Adstock(row_vector t, row_vector weights) {
>     return dot_product(t, weights) / sum(weights);
>   }
> }
>
> data {
>   // the total number of observations
>   int<lower=1> N;
>   // the vector of sales
>   real<lower=0> Y[N];
>   // the maximum duration of lag effect, in weeks
>   int<lower=1> max_lag;
>   // the number of media channels
>   int<lower=1> num_media;
>   // a vector of 0 to max_lag - 1
>   row_vector[max_lag] lag_vec;
>   // 3D array of media variables
>   row_vector[max_lag] X_media[N, num_media];
>   // the number of other control variables
>   int<lower=1> num_ctrl;
>   // a matrix of control variables
>   row_vector[num_ctrl] X_ctrl[N];
> }
>
> parameters {
>   // residual variance
>   real<lower=0> noise_var;
>   // the intercept
>   real tau;
>   // the coefficients for media variables
>   vector<lower=0>[num_media] beta_medias;
>   // coefficients for other control variables
>   vector[num_ctrl] gamma_ctrl;
>   // the retention rate and delay parameter for the adstock transformation of
>   // each media
>   vector<lower=0,upper=1>[num_media] retain_rate;
>   vector<lower=0,upper=max_lag-1>[num_media] delay;
>   // ec50 and slope for Hill function of each media
>   vector<lower=0,upper=1>[num_media] ec;
>   vector<lower=0>[num_media] slope;
> }
>
> transformed parameters {
>   // a vector of the mean response
>   real mu[N];
>   // the cumulative media effect after adstock
>   real cum_effect;
>   // the cumulative media effect after adstock, and then Hill transformation
>   row_vector[num_media] cum_effects_hill[N];
>   row_vector[max_lag] lag_weights;
>
>   for (nn in 1:N) {
>     for (media in 1 : num_media) {
>       for (lag in 1 : max_lag) {
>         lag_weights[lag] <- pow(retain_rate[media], (lag - 1 - delay[media]) ^ 2);
>       }
>      cum_effect <- Adstock(X_media[nn, media], lag_weights);
>      cum_effects_hill[nn, media] <- Hill(cum_effect, ec[media], slope[media]);
>     }
>     mu[nn] <- tau +
>               dot_product(cum_effects_hill[nn], beta_medias) +
>               dot_product(X_ctrl[nn], gamma_ctrl);
>   }
> }
>
> model {
>   retain_rate ~ beta(3,3);
>   delay ~ uniform(0, max_lag - 1);
>   slope ~ gamma(3, 1);
>   ec ~ beta(2,2);
>   tau ~ normal(0, 5);
>
>   for (media_index in 1 : num_media) {
>     beta_medias[media_index] ~ normal(0, 1);
>   }
>   for (ctrl_index in 1 : num_ctrl) {
>     gamma_ctrl[ctrl_index] ~ normal(0,1);
>   }
>
>   noise_var ~ inv_gamma(0.05, 0.05 * 0.01);
>   Y ~ normal(mu, sqrt(noise_var));
> }
> ```
^stan-code

> [!definition] How the code maps to the paper's notation
>
> | Stan name | Paper symbol | Notes |
> |---|---|---|
> | `X_media[n, m]` (row vector of length `max_lag`) | $(x_{t,m}, x_{t-1,m},\dots,x_{t-L+1,m})$ | lagged spend is pre-built outside Stan; element `lag` holds $x_{t-(\text{lag}-1),m}$ |
> | `lag_weights[lag] = retain_rate^((lag-1-delay)^2)` | $w^d_m(l)=\alpha_m^{(l-\theta_m)^2}$, $l=\text{lag}-1$ | delayed adstock, Eq. 3 |
> | `Adstock` | Eq. 1 | normalised weighted average |
> | `Hill(t, ec, slope)` | $\text{Hill}(x;K,S)$, Eq. 4 | `ec` ("EC50") $=K$, constrained to $(0,1)$ because spend is scaled to $[0,1]$ |
> | `beta_medias` with `<lower=0>` + `normal(0,1)` | $\beta_m\sim$ half-normal$(0,1)$ | the constraint truncates the normal |
> | `delay` in $[0, L-1]$, `uniform(0, max_lag-1)` | $\theta_m\sim U(0,12)$ for $L=13$ | |
> | `noise_var ~ inv_gamma(0.05, 0.05*0.01)` | $\operatorname{Var}(\epsilon)\sim$ IG$(0.05, 0.0005)$ | Table 3 |
> | `Y ~ normal(mu, sqrt(noise_var))` | Gaussian white-noise likelihood | Eq. 7 |
>
> `lag_vec` is declared but never used. Fixing `slope` at 1 gives the reach transformation (Models II/IV).
>
> **Geometric adstock is *not* `delay = 0`.** With `delay` fixed at 0 the code computes `retain_rate^((lag-1)^2)`, that is $w^d(l;\alpha,0)=\alpha^{l^2}$. This is a half-Gaussian kernel that decays much faster than geometric decay, $\alpha^{l}$ (Eq. 2). For $\alpha=0.8$ the lag-3 weight is $0.8^9\approx0.13$, against $0.8^3\approx0.51$ for geometric. Models III/IV therefore need a different weight line, `lag_weights[lag] <- pow(retain_rate[media], lag - 1);`, and `delay` removed from the parameters and the model block. The two adstock families are not nested. See [[Carryover (Adstock) Functional Forms#^delayed-adstock]].
>
> **The `ec` bound fixes the prior support on $K$.** `ec` is declared `<lower=0,upper=1>`, so the program can only run the beta$(2,2)$ and uniform$(0,1)$ priors of Sec. 7.2. To reproduce the uniform$(0,10)$ arm, or any setting where the true $K$ lies outside the scaled spend range (Scenario II, $K=2$), the declaration must change to `upper=10` (with `ec ~ uniform(0, 10)`). Under the code as printed, a true $K=2$ has zero prior mass. See [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]].
^code-map

> [!warning] Running this code with a current Stan release (my notes, not from the paper)
> The program uses syntax that has been **removed** from current Stan: the `<-` assignment operator (now `=`) and old array declarations such as `real Y[N]` (now `array[N] real Y`). It also declares the per-iteration scratch variables `cum_effect` and `lag_weights` in `transformed parameters`, so they get saved as outputs. Moving them into local blocks avoids that. Other possible speed-ups: vectorise the lag weights, and use a non-centred or orthogonalised parameterisation. The paper's own Sec. 8 result is that **orthogonalising correlated controls** gave a 40-fold speed-up (3040 s to 75 s; see [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors#^table8]]).
^modernization

> [!algorithm] Gibbs-with-slice-sampling scheme (Sec. 3, as described)
> 1. Partition $\Phi=(\tau,\gamma,\beta,\alpha,\theta,K,S,\sigma^2)$ into blocks.
> 2. For each block in turn, draw from its full conditional given all other blocks. Linear-Gaussian blocks ($\tau,\gamma$ and, given the transforms, $\beta$) and $\sigma^2$ (inverse-gamma prior) may have closed-form conditionals. Use **slice sampling** for the non-conjugate transformation parameters $(\alpha_m,\theta_m,K_m,S_m)$.
> 3. Repeat for 10,000 iterations (Sec. 5.1) and discard burn-in.
>
> *The paper does not publish the Gibbs code. Steps 1-2 are the standard construction implied by its description, and which blocks are conjugate is my inference.*
^gibbs-scheme

## Examples

> [!example] Timing summary across the paper
>
> | Setting | Sampler | Iterations | Time |
> |---|---|---|---|
> | Simulated dataset (2 yr, 3 media) | custom Gibbs | 10,000 | 52 s |
> | Simulated dataset (2 yr, 3 media) | Stan | 1000 | 1149 s |
> | Shampoo, Model I, 2 media, correlated controls | Stan, 3 chains | 1000/chain | 3040 s |
> | Shampoo, Model I, 2 media, orthogonal controls | Stan | 1000/chain | 75 s |
> | Shampoo, Models I-IV, 5 media, orthogonal | Stan | 1000/chain | 471 / 181 / 112 / 91 s |
^timing-summary-across-the

## Connections

- HMC behaviour on correlated, ridge-shaped posteriors: [[HMC and Stan in Practice]], [[What to Do About Convergence Problems]], [[MCMC Basics]].
- Comparing samplers by effective draws per second rather than raw time: [[Effective Sample Size and Monte Carlo Standard Error]].
- Checking that this sampler and model recover known parameters on average is what [[Simulation-Based Calibration - Overview]] formalises.
- Hierarchical extensions (brand or geo pooling) of the same Stan model: [[Hierarchical Models]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map
- [[Bayesian Estimation and Priors for MMM]]
- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — Chan & Perry recommend Stan for graphical MMMs
