---
title: "Debugging a Model - World Cup Football"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 23, pp. 353-368 (Figures 23.1-23.6)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Posterior Predictive Checking]]"
  - "[[A Data Model Is Not Just a Likelihood]]"
  - "[[Model Selection Using Predictive Performance]]"
used_by:
  - "[[Predictive Model Checking and Comparison - Clinical Trial]]"
aliases:
  - "2014 World Cup"
  - "Missing factor of 2"
  - "Signed square root bug"
  - "Latent continuous rounded model"
  - "Jacobian for LOO comparison"
---

# Debugging a Model — World Cup Football

> [!summary]
> The book's designated **debugging** case study, and the bug is beautifully mundane: Stan has no `sign()`
> function, so the code used `step(dif) - 0.5`, which returns $\pm 0.5$ rather than $\pm 1$ — **a missing
> factor of 2**. The model converged, the estimates looked reasonable, and only a **routine posterior
> predictive check** caught it: far more than 5% of games fell outside their 95% intervals. The second half
> of the chapter is a careful treatment of a question the earlier chapters raised repeatedly — **how to
> compare continuous and discrete models legitimately** — and shows that the naive comparison favors the
> square-root model by 31.9 elpd, while the correct comparison (Jacobian plus integration) **reverses the
> ranking.**

## Overview

> [!definition] The model (Ch. 23.1, p. 353)
> For game $i$ between teams $j_1$ and $j_2$ scoring $s_1$ and $s_2$:
> $$y_i = \text{sign}(s_1 - s_2)\sqrt{|s_1 - s_2|}, \qquad y_i \sim t_\nu\!\left(a_{j_1[i]} - a_{j_2[i]},\ \sigma_y\right)$$
> with $\nu = 7$, "**which has been recommended as a robust alternative to the normal**" (Liu 2004).
>
> **Why the square root:** "**we have a feeling that, when the game is not close, the extra goals don't provide
> as much information.**" **Why the $t$:** "**we were thinking of occasional outliers such as a famous semifinal
> match where Germany beat Brazil by a score of 7 to 1.**"
>
> **The team-ability model, borrowing external information.** Only 64 games among 32 teams, so the abilities
> are partially pooled toward the **Soccer Power Index** available a month before the tournament (Silver
> 2014): rankings from Brazil (32) to Australia (1), "**rescaled to have mean 0 and standard deviation 1/2, to
> get 'prior scores' that ranged from $-0.83$ to $+0.83$.**"
> $$a_j = b \cdot \text{prior\_score}_j + \sigma_a \alpha_j, \qquad \alpha_j \sim \text{normal}(0,1)$$
> "**all we care about are the relative, not the absolute, team abilities, so we can just set $\mu = 0$.**"
>
> **The candid framing:** "**It turned out, when the continuous model was all fit and we started tinkering with
> it, that neither the square-root transformation nor the long-tailed $t$ distribution were really necessary**
> … **But we'll work with this particular model because that was how we first thought of setting it up.**"
^def-worldcup-model

## Main Content

### The fit that looked fine

> [!example] Reading the parameters, all of which made sense (Ch. 23.1, pp. 354-355)
> ```
>  variable  mean median   sd  mad    q5   q95 rhat ess_bulk
>  b         0.45   0.45 0.10 0.10  0.29  0.62 1.00     3157
>  sigma_a   0.17   0.17 0.08 0.07  0.04  0.30 1.00      835
>  sigma_y   0.42   0.42 0.05 0.05  0.34  0.51 1.00     2039
> ```
> Every parameter admitted a sensible interpretation:
> - **$b = 0.45$** — "teams with higher prior rankings did better … **a good team is about half a goal (on the
>   square-root scale) better than a poor team.** We can give this latter interpretation because we have
>   already put the prior score predictor on a standardized scale."
> - **$\sigma_a = 0.17$** — "**a small value, indicating that, unsurprisingly, our final estimates of team
>   abilities are not far from the initial ranking.**" Attributed to two factors: "**first, the initial ranking
>   is pretty accurate; second, there aren't a lot of data points here.**"
> - **$\sigma_y = 0.42$** — "**the uncertainty in any game is about half a goal on the square-root scale, about
>   as much as the variation between good and bad teams. On any given day, any team could beat any other
>   team.**"
>
> **And the display was chosen thoughtfully too.** Teams are ordered by prior ranking for two reasons: "**this
> ordering is informative: there's a general trend from good to bad**," and "**the prior ranking is what we
> were using to pull toward in the multilevel model, so this graph is equivalent to a plot of estimate vs.
> group-level predictor, which is the sort of graph we like to make to understand what a multilevel model is
> doing.**"
>
> **Nothing here reveals the bug.** $\hat{R}$, ESS, parameter magnitudes, and substantive interpretation all
> pass.

> [!warning] The posterior predictive check that caught it (Figure 23.2, Ch. 23.2, p. 355)
> ```stan
> generated quantities {
>   vector[N_games] y_rep;
>   vector[N_games] y_rep_original_scale;
>   for (n in 1:N_games) {
>     y_rep[n] = student_t_rng(df, a[team_1[n]] - a[team_2[n]], sigma_y);
>   }
>   y_rep_original_scale = y_rep .* abs(y_rep);   // reverse the signed square root
> }
> ```
> Plotting each game's outcome against its 95% predictive interval:
>
> > "**Something went wrong. Far more than 5% of the data points are outside the 95% intervals.**"
^wrn-ppc-catches-bug

### The debugging path

> [!example] Three hypotheses, two eliminated, one accidental fix (Ch. 23.2-23.3, pp. 356-358)
> **Hypothesis 1 — the $t$ distribution.** "**replacing it by a normal, or keeping the $t$ but estimating the
> degrees of freedom parameter, did not change anything noticeably.**"
>
> **Hypothesis 2 — discreteness of the data.** "**no, that wasn't it either: the poor coverage of these
> intervals goes well beyond rounding error.**"
>
> **Hypothesis 3 — the square-root transformation.** Refitting on the raw score differential gives **Figure
> 23.4, which "looks fine: approximately 95% of the game outcomes fall within the 95% predictive
> intervals.**"
>
> **At this point the model works — but the cause is still unknown.** "**At this point we could stop and declare
> victory, but first we would like to figure out what went wrong with that square root model.**"

> [!warning] The bug (Ch. 23.3, p. 358)
> ```stan
> sqrt_dif[i] = (step(dif[i]) - 0.5) * sqrt(abs(dif[i]));       // WRONG
> ```
> "**That last line above is wrong — it's missing a factor of 2. Stan doesn't have a `sign()` function, so we
> hacked something using `step(dif[i]) - 0.5`. But this difference takes on the value $+0.5$ if `dif` is
> positive or $-0.5$ if `dif` is negative.**"
> ```stan
> sqrt_dif[i] = 2 * (step(dif[i]) - 0.5) * sqrt(abs(dif[i]));   // correct
> ```
>
> **Why it was invisible to every other check:** halving the data does not break convergence, does not produce
> implausible parameter values, and does not change the *relative* ordering of teams. It only makes the
> predictive intervals — expressed on the correct scale by `y_rep_original_scale` — too narrow by a factor of
> four.
>
> After the fix (Figure 23.5), "**All is fine now. In retrospect we never needed that square root in the first
> place, but it's good to have figured out our error, in case we need to fit such a model in the future.**
>
> > **It was also instructive how we found that mistake through a routine plot comparing data to the posterior
> > predictive distribution.**"
^wrn-the-factor-of-two

> [!important] What the corrected model can and cannot say
> "**The final 95% predictive intervals are wide, indicating that with the information used in this model, we
> can't say much about any individual game. That's fine; it is what it is.**"
>
> Similarly, on the marquee question: "**we could compute lots of fun things such as the probability that
> Argentina would beat Germany if the final were played again, but it's clear enough from this picture that the
> estimate will be close to 50%, so really the model isn't giving us much for that one game.**"
>
> **Figure 23.6** fits the model with the prior rankings removed ($b = 0$): "**Estimates are much more noisy.**"
> LOO confirms: "**The model including the prior rankings predicts much better, which is no surprise given
> that the importance of the prior rankings is estimated from the data; the model ignoring the prior rankings
> is just the special case of $b = 0$.**"

### Discrete data: three equivalent formulations

> [!definition] Formulation 1 — an explicit latent continuous variable (Ch. 23.5, p. 361)
> "**As a more general strategy, we can set up a model for a latent continuous outcome and define the observed
> score differential as this continuous variable, rounded to the nearest integer.**"
> $$z_i \sim \text{normal}(a_{j_1[i]} - a_{j_2[i]},\ \sigma_z), \qquad y_i = \text{round}(z_i)$$
> The likelihood is a **box function**:
> $$p(y_i \mid z_i) = \begin{cases} 1 & z_i \in (y_i - 0.5,\ y_i + 0.5) \\ 0 & \text{otherwise}\end{cases}$$
>
> **How to code a discontinuous posterior in Stan — as a constraint, not a statement:**
> ```stan
> parameters {
>   vector<lower=dif-0.5, upper=dif+0.5>[N_games] z;
> }
> model {
>   z ~ normal(a[team_1] - a[team_2], sigma_z);   // no statement for y at all
> }
> ```
> "**The model block does not include the data model for $y_i$ at all, but the effect of the likelihood
> $p(y_i|z_i)$ is coded through the constraints on $z_i$. This is another example where, due to the properties
> of Stan, we don't code the model completely as a generative model, and part of the data model comes in the
> constraint**" — see [[A Data Model Is Not Just a Likelihood]].
>
> **The generative part goes in `generated quantities`**, where the $z_i^{\text{rep}}$ are deliberately
> **unconstrained**: "**we are assuming the goal difference can be different in a replicated game.**"
^def-latent-rounded-model

> [!definition] Formulation 2 — marginalize the latent variable analytically
> $$p(\alpha,b,\sigma_a,\sigma_z \mid y) \propto p(\alpha,b,\sigma_a,\sigma_z) \prod_{i=1}^{64} \int_{y_i - 0.5}^{y_i+0.5} p(z_i \mid \alpha,b,\sigma_z)\, dz_i$$
> computed as a difference of CDFs:
> ```stan
> target += log_diff_exp(normal_lcdf(dif[n]+.5 | a[team_1[n]]-a[team_2[n]], sigma_z),
>                        normal_lcdf(dif[n]-.5 | a[team_1[n]]-a[team_2[n]], sigma_z));
> ```
> "**`log_diff_exp` computes $\log(\exp(a) - \exp(b))$ while taking care of the floating point numerical
> accuracy.**"
>
> "**Running this model, there is no difference in the posterior up to usual Monte Carlo variation.**"

> [!important] Formulation 3 — the continuous model *is* the midpoint approximation
> $$\int_{y_i-0.5}^{y_i+0.5} p(z_i \mid \cdot)\, dz_i \approx \big((y_i+0.5)-(y_i-0.5)\big)\, p(y_i \mid \cdot) = p(y_i \mid \cdot)$$
> "**exactly the term in the continuous model after replacing $\sigma_z$ with $\sigma_y$.**"
>
> **When it is safe:** "**If $\sigma_y$ is relatively big compared to the integration interval (which in this
> case is 1) … then the midpoint rule should be fine. In this case the posterior mean of $\sigma_y$ is about
> 1.5.**"
>
> **The comparison confirms it** — discrete and continuous posteriors are numerically identical to two decimal
> places across all parameters. "**For this problem it would be fine for most purposes to perform inferences
> treating the discrete score differential as a continuous outcome and then include the rounding just when
> generating predictions.**"
>
> This is the same midpoint argument used in
> [[Predictive Model Checking and Comparison - Clinical Trial]] — and this chapter is where it is derived.

> [!example] A digression on rounding rules that matters more than it looks
> "**Stan uses the C++ standard library function `round()` with rounding away from zero, but R uses rounding to
> even digits. Thus in theory, when we write the model in mathematical form, we should specify which rounding
> rule is used. As the probability of continuous value being exactly at the halfway point is zero, the
> probability of seeing a difference in the inference given different rounding rules is zero, so it actually
> doesn't matter.**
>
> **Mathematically the probability of continuous value being exactly at half point is 0, but computers store
> the real valued numbers with floating point presentation, which can code only a finite number of values …
> with double float (64 bits), the probability that a random value drawn uniformly from 0 to 1 is stored
> exactly as 0.5 is about $10^{-16}$, not exactly zero.**"
>
> **Why this is worth knowing:** "**in other cases it is possible that the interval endpoint is an invalid value
> in the model. For example, if the model includes a parameter representing a probability in the interval
> $(0,1)$, the algorithm can still reach the floating point value 0 which can lead to a computation error.**
>
> **These small differences in details often have no practical effect, but they can cause confusion about
> discrepancies between the mathematical model and its implementation in code.**"

### Comparing continuous and discrete models legitimately

> [!warning] The naive comparison gets the ranking backwards (Ch. 23.6, pp. 364-365)
> **Without** the Jacobian correction and with a midpoint `log_lik`:
> ```
>                                                              elpd_diff se_diff
> Continuous, normal, sqrt diff, midpoint log_lik, no Jacobian       0.0     0.0
> Continuous, normal, diff, midpoint log_lik                       -31.9     4.7
> ```
> **With** proper computation:
> ```
>                                                              elpd_diff se_diff
> Continuous, normal, diff, proper log_lik                           0.0     0.0
> Discrete, latent normal, diff, proper log_lik                     -0.5     0.5
> Continuous, normal, sqrt diff, proper log_lik, Jacobian           -7.6     5.2
> Discrete, latent normal, sqrt diff, proper log_lik, Jacobian      -8.4     5.2
> ```
>
> > "**taking the square root makes the performance worse, and there is no difference between the corresponding
> > continuous and discrete models up to Monte Carlo variation.**"
>
> A **39-point swing** produced entirely by the change-of-variables bookkeeping.
^wrn-jacobian-reverses-ranking

> [!definition] Why the square-root case needs actual integration, not just a Jacobian
> For a smooth transformation, comparing models on different response scales needs only the Jacobian — e.g.
> for a log-transformed outcome, $p(y_i|\theta) = p(\log y_i | \theta)/y_i$ (the mesquite example in
> *Regression and Other Stories* Ch. 12; the same device used in
> [[Prior Specification for Regression Models - Sleep Study]]).
>
> **But here it fails:** "**for square-root transformation and score differences this does not work, as the
> score difference $y_i$ can be 0 and then the Jacobian $1/(2\sqrt{|y_i|})$ becomes infinite. Even if the
> Jacobian were finite for all outcome values, we would need to take into account that the integration interval
> length is not 1, and the Jacobian can affect the curvature.**"
>
> So the integral must be done properly:
> $$\int_{y_i - 0.5}^{y_i + 0.5} \frac{1}{2\sqrt{|\tilde{y}|}}\, \text{normal}\!\left(\text{sign}(\tilde{y})\sqrt{|\tilde{y}|}\ \Big|\ a_{j_1[i]} - a_{j_2[i]},\ \sigma_y\right) d\tilde{y}$$
> "**This integral is also well defined for $y_i = 0$, but we just need to compute the integral in parts
> avoiding the problematic singularity at 0. Stan provides the `integrate_1d` function using the double
> exponential quadrature algorithm.**"
^def-integration-not-jacobian

> [!important] Making elpd interpretable by exponentiating (Ch. 23.6, p. 365)
> "**The usual log score … requires some practice to have intuition on the log-score values directly. For a
> discrete distribution, this score is just the logarithm of the predictive probability. By exponentiating the
> pointwise LOO-CV log-score values, we get the probabilities that we would have predicted the left out
> observation correctly, which is more easily interpretable.**"
> ```r
> exp(mean(fit_discr$loo()$pointwise[,"elpd_loo"]))   # geometric mean
> ```
>
> | Model | Mean probability of predicting the exact score difference |
> |---|---|
> | Pooled normal, no prior score | **0.125** |
> | Hierarchical, no prior score | **0.135** |
> | Prior score only, no match results | **0.14** |
> | Hierarchical + prior score | **0.143** |
>
> "**This shows that we can get some improvement, but there is still a lot of randomness in the exact score
> difference (predicting which team wins would have less uncertainty). The prior score and the match results
> provide similar information, and while combining them doesn't improve the leave-one-out predictive
> performance much, we do see that combining them reduces the uncertainty in the posterior.**"
>
> **Converting elpd to an interpretable probability is a small trick worth reusing** whenever the outcome is
> discrete.

> [!example] Bivariate Poisson, tried and found unnecessary
> "**We also tested bivariate Poisson and Poisson difference models, which are commonly used to analyze scores
> in sports** (Karlis and Ntzoufras 2003; Egidi, Macrì-Demartino, and Palaskas 2024), **but in this case there
> was no difference in predictive performance compared to the discretized normal model. The bivariate Poisson
> distribution includes a parameter for modeling dependence between the scores, but with these data the
> dependence was estimated to be small.**
>
> **Although the bivariate model did not improve predictive performance here, it was worth trying it to see if
> it made a difference.**" (The `footBayes` R package has several such models, including dynamic ones.)

## Examples

> [!example] The general conclusion about continuous models for discrete data (Ch. 23.6, p. 366)
> "**We saw how a continuous model can be used for a discrete outcome with negligible difference in inferences
> for quantities of interest (in this case, team abilities), with discrete predictions constructed simply by
> rounding the continuous predictions. This can work well if the latent uncertainty is big enough compared to
> the distance between the discrete values and if the distances are equal. If the distances are 1, then the
> continuous-data model density values are equivalent to probability values approximated using the midpoint
> rule.**
>
> **Continuous-data models are common, but ultimately no data are truly continuous. Even if we measure something
> that can be considered to be continuous, for example, height or weight, the measurements have limited accuracy
> and will be recorded with some rounding, and there is a limit of accuracy to any floating-point
> computations.**"

## Connections

- The bug's discovery is the strongest single argument in the book for
  [[Posterior Predictive Checking]] as **routine practice rather than a final validation step** — every other
  diagnostic passed.
- The three formulations of the rounded model parallel the three codings of censoring in
  [[Incremental Development and Testing - Black Cat Adoptions]]: latent variable, analytic marginalization,
  and a reformulation. Both chapters conclude that **agreeing implementations build confidence.**
- The Jacobian-plus-integration requirement is the precise version of the warning in
  [[Model Selection Using Predictive Performance]] that elpd comparisons require the same response variable.

## See Also
- [[Posterior Predictive Checking]] — the check that found the bug
- [[A Data Model Is Not Just a Likelihood]] — the data model living in a parameter constraint
- [[Predictive Model Checking and Comparison - Clinical Trial]] — the midpoint rule applied, and a case where it works
- [[Coding a Series of Models - Movie Ratings]] — the item-response model this one adapts
