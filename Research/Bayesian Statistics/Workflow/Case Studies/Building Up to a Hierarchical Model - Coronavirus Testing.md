---
title: "Building Up to a Hierarchical Model - Coronavirus Testing"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - method/mrp
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 19, pp. 305-316 (Figures 19.1-19.5, Eq. 19.1-19.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Specifying the Data Model and the Prior]]"
  - "[[Poststratification]]"
  - "[[Influence of Likelihood and Prior]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Santa Clara antibody study"
  - "Bendavid"
  - "Sensitivity and specificity"
  - "Prevalence estimation"
  - "Rare disease testing"
---

# Building Up to a Hierarchical Model — Coronavirus Testing

> [!summary]
> A reanalysis of the **Santa Clara County SARS-CoV-2 antibody study** (Bendavid et al. 2020), which
> reported a prevalence of 2.5%-4.2% from **50 positive tests out of 3330**. Once uncertainty in the
> test's **specificity** is propagated properly, the 95% interval becomes **(0, 1.8%)** — "**the
> substantive conclusion from that earlier report has been overturned.**" The chapter then builds a
> hierarchical model over 13 specificity and 3 sensitivity studies, discovers that **weak hyperpriors give
> a prevalence interval reaching 16%**, and shows exactly why: three calibration studies cannot pin down a
> variance component. The concluding defense is the chapter's most important paragraph: **"the only way to
> avoid this influence of the prior would be to sweep it under the rug."**

## Overview

> [!important] Why this problem is hard (Ch. 19.1, p. 305)
> "**When the base rate is low, estimates become critically sensitive to misclassifications**" (Hemenway
> 1997).
>
> **The study.** 3330 residents of Santa Clara County tested in early April 2020; **50 positive**, raw rate
> **1.5%**. After adjusting for sex, ethnicity, and zip code, the authors reported **2.5%-4.2%**, implying
> infections **50-85×** the reported case count and an **infection fatality rate of 0.12%-0.2%** — "much
> lower than IFRs in the range of 0.5%-1% that had been estimated from areas with outbreaks."
>
> **What went wrong:** "**they did not correctly account for uncertainty in the specificity (true negative
> rate) of the test.** There was also concern about the adjustment they performed for
> non-representativeness of their sample. **Thus, the controversy arose from statistical adjustment and
> assessment of uncertainty.**"

> [!example] The base-rate intuition, worked in counts (Gigerenzer, Gaissmaier, et al. 2007)
> A 95%-accurate test, 1% prevalence, a positive result. "**The usual intuition suggests that the conditional
> probability should be approximately 95%, but it is actually much lower.**"
>
> Out of 1000 people: 10 have the disease, 990 do not.
> $$0.95 \times 10 = 9.5 \text{ true positives}, \qquad 0.05 \times 990 = 49.5 \text{ false positives}$$
> $$\text{positive predictive value} = \frac{9.5}{9.5 + 49.5} = \mathbf{0.16}$$
> "**a number that is difficult to make sense of without visualizing the hypothetical populations.**"

## Main Content

### The classical estimator and its two failure modes

> [!definition] Prevalence from an imperfect test (Eq. 19.1, Ch. 19.2, p. 306)
> With prevalence $\pi$, specificity $\gamma$, and sensitivity $\delta$, the expected positive rate is
> $$p = \pi\delta + (1-\pi)(1-\gamma)$$
> which inverts to
> $$\pi = \frac{p + \gamma - 1}{\delta + \gamma - 1}$$
>
> **The classical calculation for these data:** $\hat{p} = 50/3330 = 0.015$ with se
> $\sqrt{0.015(1-0.015)/3330} = 0.002$. With $\gamma = 0.995$, $\delta = 0.80$:
> $$\hat\pi = \frac{0.015 + 0.995 - 1}{0.80 + 0.995 - 1} = 0.013, \qquad \text{se} = \frac{0.002}{0.795} = 0.003$$
>
> **Two immediate difficulties:**
> 1. "**If the observed rate $\hat{p}$ is less than $1-\gamma$, the false positive rate of the test, then the
>    estimate becomes meaninglessly negative.**"
> 2. "**If there is uncertainty in the specificity and sensitivity parameters, it becomes challenging to
>    propagate uncertainty through the nonlinear expression.**"
^def-prevalence-formula

### Model 1 — calibration data as part of the model

> [!definition] The pooled model (Eq. 19.2, Ch. 19.2, p. 307)
> $$y \sim \text{binomial}(n, p), \qquad p = (1-\gamma)(1-\pi) + \delta\pi$$
> $$y_\gamma \sim \text{binomial}(n_\gamma, \gamma), \qquad y_\delta \sim \text{binomial}(n_\delta, \delta)$$
> with $\text{uniform}(0,1)$ priors on $\pi, \gamma, \delta$.
>
> **The identification point:** "**The three parameters $\pi$, $\gamma$, and $\delta$ are not jointly
> identified from only the number of positive test cases, hence the need for an informative prior on $\gamma$
> and $\delta$. This can be seen as a generalization of the usual approach of assuming that these parameters
> are known exactly.**"
>
> ```stan
> parameters {
>   real<lower=0, upper=1> p, spec, sens;
> }
> transformed parameters {
>   real p_sample = p * sens + (1 - p) * (1 - spec);
> }
> model {
>   y_sample ~ binomial(n_sample, p_sample);
>   y_spec   ~ binomial(n_spec, spec);
>   y_sens   ~ binomial(n_sens, sens);
> }
> ```
> **The data:** $y/n = 50/3330$, $y_\gamma/n_\gamma = 399/401$, $y_\delta/n_\delta = 103/122$.
>
> Note the structure: the calibration experiments enter as **additional likelihood terms**, which is exactly
> the "calibration data as prior" reframing of
> [[Specifying the Data Model and the Prior#Multilevel modeling and the boundary between prior and likelihood]].
^def-prevalence-model

> [!example] The result that overturns the study (Figure 19.1, Ch. 19.2, p. 308)
> "**Figure 19.1a shows the joint posterior simulations for $\pi$ and $\gamma$: uncertainty in the population
> prevalence is in large part driven by uncertainty in the specificity.** … **the data and model are
> consistent with prevalence as low as 0% and as high as 2%.**"
>
> **Why the usual interval summary fails:** "**The asymmetric posterior distribution with its hard bound at
> zero suggests that the usual central 95% interval will not be a good inferential summary. Instead we use the
> shortest posterior interval**" (Liu, Gelman, and Zheng 2015) — see
> [[Point Estimates and Uncertainties#Univariate summaries]].
>
> $$\text{95\% shortest posterior interval for } \pi: \quad (0,\ 1.8\%)$$
>
> "**which is much different from the intervals reported by Bendavid et al. (2020a,b), with or without their
> correction for nonrepresentativeness of the sample. As a result, the substantive conclusion from that earlier
> report has been overturned. From the given data, the uncertainty in the specificity is large enough that the
> data do not supply strong evidence of a substantial prevalence.**"
^ex-prevalence-overturned

> [!important] Power-scaling on the pooled model (Figure 19.2)
> Scaling prior and likelihood by $\alpha \in \{0.5, 1, 2\}$ ("corresponding approximately to halving or
> doubling the amount of information"):
> - "**the likelihood is weakly informative and prior is strongly informative about sensitivity $\delta$ and
>   specificity $\gamma$**" — as expected, since these come from separate calibration data;
> - "**both the likelihood and prior are informative about prevalence $\pi$**";
> - "**it is also good to see that the new data are informative about the prevalence and that the posterior is
>   not solely determined by the prior. Overall the results are robust with respect to power scaling.**"
>
> The Stan code needed to enable it:
> ```stan
> generated quantities {
>   real log_lik = binomial_lpmf(y_sample | n_sample, p_sample);
>   real log_prior = binomial_lpmf(y_spec | n_spec, spec) +
>                    binomial_lpmf(y_sens | n_sens, sens);
> }
> ```

### Model 2 — hierarchical over 13 specificity and 3 sensitivity studies

> [!definition] Letting the test properties vary (Ch. 19.3, p. 309)
> "**Sensitivity and specificity can vary across experiments, so it is not appropriate to simply pool the data
> from these separate studies; indeed, these particular data are not consistent with constant error rates**"
> (Fithian 2020).
> $$\text{logit}(\gamma_j) \sim \text{normal}(\mu_\gamma, \sigma_\gamma), \qquad \text{logit}(\delta_j) \sim \text{normal}(\mu_\delta, \sigma_\delta)$$
>
> **The coding convention:** "**$j=1$ corresponds to the study of interest, with other $j>1$ representing
> studies of specificity or sensitivity given known samples.**" The Stan program uses the
> `<offset=..., multiplier=...>` idiom for the implicit non-centered parameterization.
>
> **What is not modeled, and why:** "**In general it could make sense to allow correlation between $\gamma_j$
> and $\delta_j$** (Guo, Riebler, and Rue 2017), **but the way the data are currently available to us,
> specificity and sensitivity are estimated from separate studies, and so there is no information about such a
> correlation.**"
>
> **A caveat on the link:** "**One could also consider alternatives to the logistic transform, which allows the
> unbounded normal distribution to map to the unit interval but might not be appropriate for tests where the
> specificity can actually reach the value of 1.**"
^def-hierarchical-test-model

> [!warning] Weak hyperpriors give a 16% upper bound (Figure 19.3a)
> With $\sigma_\gamma, \sigma_\delta \sim \text{normal}_+(0,1)$ and $\mu \sim \text{normal}(4,2)$:
>
> | Parameter | Median (95% interval) |
> |---|---|
> | **Prevalence $\pi$** | **0.016 (0.000, 0.160)** |
> | Specificity $\gamma_1$ | 0.997 (0.987, 1.000) |
> | **Sensitivity $\delta_1$** | **0.797 (0.065, 1.000)** |
> | $\sigma_\gamma$ | 1.62 (0.82, 2.61) |
> | $\sigma_\delta$ | 0.87 (0.11, 2.16) |
>
> "**Where does that upper bound come from: how could an underlying prevalence of 16% be plausible, given that
> only 1.5% of the people in the sample tested positive? The answer can be seen from the large uncertainty in
> the sensitivity parameter, which in turn comes from the possibility that $\sigma_\delta$ is very large.**
>
> **The trouble is that the sensitivity information in these data comes from only three experiments, which is
> not enough to get a good estimate of the underlying distribution**" (Guo, Riebler, and Rue 2017).
>
> **The calibration for why $\text{normal}_+(0,1)$ *looked* weak:** "**A shift of 1 on the logit scale
> represents a pretty big change** … $\text{logit}(0.8) = 1.4$, **so if 0.8 is a typical value of sensitivity,
> and if $\sigma_\delta = 1$, then we would expect sensitivities to vary by roughly ± 1 standard deviation, or
> 0.4 to 2.4 on the logit scale, which corresponds to a probability range from 0.60 to 0.92.**"
^wrn-weak-hyperprior-blowup

> [!example] The stronger hyperprior, and how its scale was chosen (Figure 19.3b)
> "**The only way to make progress here is to constrain the sensitivity parameters in some way** … **we can
> consider it as a relaxation of the assumption of Bendavid et al. (2020b) that $\sigma_\delta = 0$.**"
>
> Replace with $\sigma_\gamma, \sigma_\delta \sim \text{normal}_+(0, 0.3)$. **The reasoning for 0.3:**
> "**start with the point estimate of $\mu_\delta$, which is 1.54. If $\sigma_\delta$ were 0.3, then there
> would be a roughly 2/3 chance that the sensitivity in a new experiment is in the range
> $\text{logit}^{-1}(1.54 \pm 0.3)$, which is $(0.78, 0.86)$. This seems reasonable.**"
>
> | Parameter | Median (95% interval) |
> |---|---|
> | **Prevalence $\pi$** | **0.013 (0.001, 0.021)** |
> | Sensitivity $\delta_1$ | 0.821 (0.622, 0.959) |
> | $\sigma_\gamma$ | 0.72 (0.26, 1.15) |
> | $\sigma_\delta$ | 0.39 (0.00, 0.73) |
>
> "**the infection rate is estimated to be somewhere between 0.1% and 2.1%.**"

### The two-dimensional sensitivity analysis

> [!example] Sweeping both hyperprior scales (Figure 19.5, Ch. 19.4, pp. 312-313)
> A grid over $\sigma_\gamma \sim \text{normal}_+(0, \tau_\gamma)$ and
> $\sigma_\delta \sim \text{normal}_+(0, \tau_\delta)$, plotting the posterior median and central 90% interval
> for $\pi$ on the log scale.
>
> **What it shows:**
> - "**The posterior median of $\pi$ is not sensitive to the scales $\tau_\gamma$ and $\tau_\delta$, but the
>   uncertainty in that estimate … is influenced by these settings.**"
> - "**In the graphs on the right, when the sensitivity hyperprior parameter $\tau_\delta$ is given a high
>   value, the upper end of the interval is barely constrained.**"
> - **Too small is also wrong:** "**When $\tau_\gamma$ and $\tau_\delta$ are too low, the variation in
>   specificity and sensitivity are constrained to be nearly zero, all values are pooled, and uncertainty is
>   artificially deflated.**"
> - **The asymmetry between the two:** "**It is possible to use a weak hyperprior on the scale of the
>   specificity distribution, $\sigma_\gamma$: this makes sense given that there are 13 prior specificity
>   studies. For the scale of the sensitivity distribution, $\sigma_\delta$, it is necessary to use a prior
>   scale of 0.5 or less.**"
>
> **The general principle extracted:** "**wide hyperpriors on hierarchical scale parameters can pull most of
> the probability mass into areas of wide variation and dominate the data, leading to inflated
> uncertainty.**"
>
> **A note on the graph itself:** "**The noise in the rightmost graph represents Monte Carlo error that is a
> consequence of the weakly specified model.**"
>
> **Cost:** the brute-force version required "**re-running MCMC 55 times, which even for this simple model took
> 7 minutes**"; the power-scaling version of Figure 19.4 took "**a few seconds.**"
^ex-two-way-hyperprior-sweep

> [!important] The defense of prior dependence (Ch. 19.4, p. 313)
> "**The complexity of this sensitivity analysis might seem intimidating: if Bayesian inference is this
> difficult and this dependent on priors, maybe it is not a good idea?**
>
> **We would argue that the problem is not as difficult as it might look.** The steps show the basic workflow:
> **We start with a simple model, then add hierarchical structure. For the hierarchical model we started with
> weak priors on the hyperparameters and examined the inferences, which made us realize that we had prior
> information (that specificities and sensitivities of the tests should not be so variable), which we then
> incorporated into the next iteration.** Performing the sensitivity analysis was fine — **it helped us
> understand the inferences better — but it was not necessary for us to get reasonable inferences.**
>
> **Conversely, non-Bayesian analyses would not be immune from this sensitivity to model choices, as is
> illustrated by the mistakes made by Bendavid et al. (2020b) to treat specificity and sensitivity as not
> varying at all, to set $\sigma_\gamma = \sigma_\delta = 0$ in our notation.**"
>
> **An alternative, and why it doesn't escape either:** "An alternative could be to use the calibration studies
> to get point estimates of $\sigma_\gamma$ and $\sigma_\delta$, **but then there would still be the problem of
> accounting for uncertainty in these estimates.**"
>
> > **"In short, the analysis shown in Figure 19.5 formalizes a dependence on prior information that would
> > arise, explicitly or implicitly, in any reasonable analysis of these data."**
>
> And in the chapter conclusion: "**The inference depends strongly on the priors on the distributions of
> sensitivity and specificity, but that is unavoidable: the only way to avoid this influence of the prior would
> be to sweep it under the rug, for example by just assuming a zero variation in the test parameters.**"
^imp-prior-dependence-defense

### Extensions: MRP for a non-representative sample

> [!definition] Replacing the constant $\pi$ with a regression (Eq. 19.3, Ch. 19.5, p. 313)
> "**It would be impossible to poststratify the raw data on 2 sexes, 4 ethnicity categories, 4 age categories,
> and 58 zip codes, as the resulting 1856 cells would greatly outnumber the positive tests in the data.**" The
> published analysis adjusted for sex × ethnicity × zip code — "**questionable, first because they did not
> adjust for age, and second because of noisy weights.**"
>
> The MRP alternative:
> $$\pi_i = \text{logit}^{-1}\!\left(\beta_1 + \beta_2\,\text{male}_i + \beta_3 x^{\text{zip}}_{\text{zip}[i]} + \alpha^{\text{eth}}_{\text{eth}[i]} + \alpha^{\text{age}}_{\text{age}[i]} + \alpha^{\text{zip}}_{\text{zip}[i]}\right)$$
> with $\alpha^{\text{name}} \sim \text{normal}(0, \sigma^{\text{name}})$ and
> $\sigma^{\text{eth}}, \sigma^{\text{age}}, \sigma^{\text{zip}} \sim \text{normal}_+(0, 0.5)$.
>
> **Why the zip-level predictor $x^{\text{zip}}$ is essential:** "**Otherwise, with so many zip codes, the
> multilevel model will just partially pool most of the zip code adjustments to zero, and not much will be
> gained from the geographic poststratification. The importance of geographic predictors is well known in the
> MRP literature.**"
>
> **Prior scaling for the coefficients:** a unit logistic prior on the **centered intercept**
> $\beta_1 + \beta_2\overline{\text{male}} + \beta_3\bar{x}^{\text{zip}}$ (equivalent to $\text{uniform}(0,1)$
> on the average person's probability), $\beta_2 \sim \text{normal}(0, 0.5)$, and
> $\beta_3 \sim \text{normal}(0, 0.5/s_{\text{zip}})$ — "**to give some prior regularization on the
> contribution of each predictor.**" ("Stan allows direct assignment of distributions to transformed
> parameters; in this particular case, the transform is **affine and thus does not require a Jacobian
> adjustment**.")
>
> **Then poststratify** in `generated quantities`:
> $$p_{\text{avg}} = \frac{\sum_j N_j \pi_j}{\sum_j N_j}$$
>
> **And a candid note:** "**Unfortunately the raw data from the Santa Clara study are not available, so we fit
> the model to simulated data to check the stability of the computation.**"
^def-prevalence-mrp

> [!important] Three further directions (Ch. 19.5, p. 315)
> 1. **Continuous test measurements.** "**We have so far assumed that test results are binary, but additional
>    information can be gained from continuous measurements that make use of partial information when data are
>    near detection limits**" (Gelman, Chew, and Shnaidman 2004; Bouman et al. 2020).
> 2. **Individual-level symptom data.** "**With individual-level symptom and test data, a model with multiple
>    outcomes could yield substantial gains in efficiency compared to the existing analysis using only a single
>    positive/negative test result on each participant.**"
> 3. **Sites testing both known positives and known negatives**, enabling bivariate priors — but "**the
>    situation is complicated because, in general, sensitivity is negatively correlated with specificity in
>    diagnostic tests, but above or below average testing quality at the sites will provide positive
>    correlation. Thus it may be better to formulate priors in terms of bias (trading sensitivity for
>    specificity) and accuracy instead.**"

## Connections

- The chapter is the clearest illustration in the book of the
  [[Modeling Ideas to Address Computing Problems#The ladder of abstraction|ladder]] run in the *statistical*
  direction: weak data on a variance component → absurd posterior → recognize you hold prior information →
  encode it.
- The calibration-data-as-likelihood structure is the concrete case behind
  [[Specifying the Data Model and the Prior]]'s claim that the prior/likelihood boundary is a labeling
  choice.
- The two-dimensional hyperprior sweep and the power-scaling figures are the same analysis at two
  computational costs — 7 minutes vs. seconds — a practical argument for
  [[Influence of Likelihood and Prior|importance-sampling sensitivity analysis]].

## See Also
- [[Poststratification]] — the MRP machinery sketched in §19.5
- [[Influence of Likelihood and Prior]] — power-scaling diagnostics
- [[Hierarchical Models]] — BDA3 background on variance components estimated from few groups
- [[Statistical and Scientific Inference]] — the scientific-workflow framing of a contested applied claim
