---
title: "LOO Model Checking and Comparison - Roaches"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/brms
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 24, pp. 369-388 (Figures 24.1-24.21)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Cross Validation Checking]]"
  - "[[Model Selection Using Predictive Performance]]"
  - "[[Posterior Predictive Checking]]"
  - "[[Influence of Individual Data Points]]"
used_by:
  - "[[Predictive Model Checking and Comparison - Clinical Trial]]"
aliases:
  - "Roaches"
  - "p_loo diagnostic"
  - "Moment matching"
  - "K-fold cross validation"
  - "Integrated LOO"
  - "Zero-inflated negative binomial"
---

# LOO Model Checking and Comparison — Roaches

> [!summary]
> The book's deepest treatment of **cross-validation computation and its failure modes**. A pest-control
> experiment (160 treatment, 104 control apartments) is fit with five models, and the chapter's real
> subject is **what to do when PSIS-LOO breaks.** Three diagnostics do the work: **`p_loo` far exceeding
> the parameter count** signals misspecification (273.5 against 4 parameters for the Poisson model); **high
> Pareto $\hat{k}$** signals a flexible model whose posterior shifts too much when a point is dropped; and
> the escalating repairs are **moment matching → $K$-fold → integrating the varying intercept out with
> 1-D quadrature.** The cautionary result: ignoring the $\hat{k}$ warnings would have declared the
> varying-intercept model better by **275 elpd** when the honest answer is **0.6 ± 7.1** — no difference.

## Overview

**The experiment** (Gelman and Hill 2007, §8.3): outcome $y_i$ = roaches caught in traps in apartment $i$;
predictors `sqrt_roach1` (square root of pre-treatment count), `treatment`, `senior` (building restricted
to elderly residents); and **`log(exposure2)` as an offset** because "the number of days for which the roach
traps were used is not the same for all apartments."

## Main Content

### Model 1 — Poisson, and three ways to see it fail

> [!warning] Every diagnostic agrees (Figures 24.1-24.3, Ch. 24.1, pp. 369-371)
> **The marginal posteriors look decisive:** "**All marginal posteriors are clearly away from zero. But we need
> to do some model checking before trusting these results.**"
>
> **Check 1 — density overlay** with $\sqrt{\cdot}$ scaling on the $x$-axis "**to better illustrate the
> differences for small counts**": "**The marginal distribution of model replicated data clearly differs from
> the observed data, which are more dispersed.**"
>
> "**Posterior predictive checking can sometimes have difficulties because the same data are being checked as
> were used to fit the model … but in this case the discrepancy is so big that further checks are not
> needed.**"
>
> **Check 2 — discrete rootogram**, "**for count data often a better choice**" (Säilynoja, Johnson, et al.
> 2025) — see [[Posterior Predictive Checking#Displays matched to the data type]].
>
> **Check 3 — the `p_loo` diagnostic:**
> ```
>            Estimate    SE
> elpd_loo    -5477.1 699.9
> p_loo         273.5  62.8
> ```
> > "**The estimated `p_loo` is much higher than the number of parameters, which is 4 in this model. This
> > indicates misspecification, which we also saw with posterior predictive checking. Many high Pareto $\hat{k}$
> > values in PSIS-LOO without moment matching were likely also caused by model misspecification.**"
>
> **`p_loo` versus the actual parameter count is one of the most useful diagnostics in the chapter**, and it
> is nearly free — it comes with every `loo()` call.
^wrn-p-loo-diagnostic

> [!example] What model comparison says when the model is wrong (Ch. 24.1, p. 372)
> Dropping predictors one at a time from the misspecified Poisson model:
> ```
>                              elpd_diff se_diff
> Poisson without senior             0.0     0.0
> Poisson full model                -9.8   180.7
> Poisson without treatment       -213.4   228.1
> Poisson without sqrt(roach1)   -2749.6   637.9
> ```
> "**Based on this, the `sqrt_roach1` predictor seems to be relevant. Dropping `treatment` would lead to a
> large drop in elpd, but the uncertainty is large, and cross validation indicates that neither `treatment` nor
> `senior` is necessarily relevant.**"
>
> **Note the standard errors: 180.7 and 228.1.** The comparison is essentially uninformative.
>
> "**The posterior marginals are conditional on the model, but cross validation is more cautious by not using
> any model for the future data distribution.**" — a compact statement of why the two disagree.

### Model 2 — negative binomial

> [!example] The conclusions change (Figure 24.4, Ch. 24.2, p. 372)
> ```r
> fit_nb <- update(fit_p, family=negbinomial)
> ```
> with the brms default $\text{inverse-gamma}(0.4, 0.3)$ on the shape parameter (Vehtari 2024).
>
> > "**The estimated treatment effect is much closer to zero, and the coefficient for `senior` has a lot of
> > probability mass on both sides of zero. So it matters which model we use, and we should trust posteriors
> > only when the model passes predictive checking.**"
>
> "**As discussed in Chapter 15 of Gelman, Hill, and Vehtari (2020), it often makes sense to start with the
> negative binomial model for counts and skip the Poisson model, but here we demonstrate the workflow of
> comparing the two.**"
>
> **The checks now pass:** the rootogram shows "a good fit … with no clear discrepancy"; PIT-ECDF gives
> $p^{\text{POT}}_{\text{unif}} = 0.29$; LOO-PIT gives 0.13; `p_loo` is **8.6** against 5 parameters — "closer
> to the actual number of parameters but still slightly larger, which is slightly concerning."
>
> **On why PIT and LOO-PIT agree here:** "**`p_loo` is small compared to the number of observations, and we
> may expect LOO-PIT-ECDF to look similar to posterior PIT-ECDF** … **there is not much difference … for such
> a rigid model.**"
>
> ```
>                              elpd_diff se_diff
> Negative binomial full model       0.0     0.0
> Poisson full model             -4595.1   679.8
> ```

> [!important] When you do *not* need to fix the computation
> The same comparison without moment matching gives $-4574.4 \pm 674.5$ rather than $-4595.1 \pm 679.8$.
>
> "**This illustrates that we don't always need to improve PSIS-LOO computation to get rid of all high Pareto
> $\hat{k}$ values, if the difference between the models is clearly bigger than possible bias from partially
> failing computation.**"
>
> A pragmatic rule worth keeping: **fix the computation when the answer depends on it.**

### Model 3 — Poisson with a varying intercept per observation, and the PSIS-LOO breakdown

> [!warning] A flexible model breaks importance sampling (Ch. 24.3, pp. 377-378)
> Adding `(1 | id)` with one intercept per observation:
> ```
>            Estimate   SE
> elpd_loo     -625.3 23.9
> p_loo         161.2  4.4
>
> Pareto k diagnostic values:
>                          Count  Pct.
> (-Inf, 0.7]   (good)        68  26.0%
>   (0.7, 1]    (bad)        175  66.8%
>   (1, Inf)    (very bad)    19   7.3%
> ```
> "**The estimate of `p_loo` is less than the number of parameters (267), but it is relatively large compared
> to the number of observations, which indicates a flexible model. In this case, this is due to each
> observation having its own intercept parameter.**
>
> > **Removing one observation changes the posterior for that intercept so much that importance sampling fails,
> > even with Pareto smoothing.**"
>
> **The escalating repairs:**
> | Repair | Result |
> |---|---|
> | **Moment matching** (requires `save_pars(all=TRUE)`) | "reduce the number of high Pareto $\hat{k}$ values from 204 to 46, **which is still a lot.** With varying coefficient models, the posterior of the group-specific parameters is changing so much that moment matching for a high dimensional non-normal posterior is not so helpful" |
> | **`reloo=TRUE`** | "would in this case require **46 re-fits** of the model" |
> | **$K$-fold CV**, $K=10$ | **10 re-fits.** "**This shows that cross validation itself is not infeasible for varying parameter models.**" |
^wrn-psis-loo-breakdown

> [!warning] The comparison that would have been wrong (Ch. 24.3, pp. 378-379)
> **Honest ($K$-fold for both):**
> ```
>                             elpd_diff se_diff
> Poisson varying intercepts        0.0     0.0
> Negative binomial                -0.6     7.1
> ```
> **What PSIS-LOO with $\hat{k}$ warnings would have said:**
> ```
>          elpd_diff se_diff
> fit_pvi        0.0     0.0
> fit_nb      -275.0    18.5
> ```
> > "**Had we ignored the high Pareto $k$ warnings, we would have mistakenly assumed that the varying-intercept
> > model fit much better.**"
>
> **And WAIC is worse still:** $-310.6 \pm 18.3$. "**As usual, WAIC performs worse for this purpose.**"
>
> A **275-point error** in a model comparison, produced entirely by a computational diagnostic being ignored.

> [!warning] Predictive checks also fail on flexible models (Figures 24.12-24.15)
> The rootogram for the varying-intercept model "**looks good, but that can be explained with having one
> parameter for each observation which makes it possible for the model to perfectly represent the seen
> data.**"
>
> **PIT-ECDF gives $p^{\text{POT}}_{\text{unif}} = 0.000$:** "**there are too many PIT values near 0.5**" —
> and the interval plot shows "**many of the observations are in the middle of the posterior predictive
> interval, which can be explained by having a flexible model with one parameter for each observation.**"
>
> > **"Posterior predictive checking is likely to fail with flexible models (having big `p_loo`)."**
>
> **And LOO-PIT does not save you either, if the LOO computation is itself broken:** the LOO-PIT plot "**looks
> slightly better but still shows a problem because PSIS-LOO fails.**" Figure 24.15's caption: "**The plot is
> misleading due to the failing PSIS-LOO computation.**"
>
> The exact situation anticipated in [[Cross Validation Checking]] — and here the *fix* to the check is itself
> broken, which is why the next section is needed.

### Model 4 — integrating the varying intercept out

> [!definition] One-dimensional quadrature inside `generated quantities` (Ch. 24.4, pp. 381-382)
> "**We can improve stability by integrating that intercept out with something more accurate than the
> importance sampling** (Vehtari, Mononen, et al. 2016). **If there is only one group or individual-specific
> parameter, then we can integrate that out easily with one-dimensional adaptive quadrature** (Merkle, Furr,
> and Rabe-Hesketh 2019). **A two-dimensional problem can be handled with nested one-dimensional quadratures,
> but for more parameters nested quadrature is likely to be too slow.**"
>
> ```stan
> functions {
>   real integrand(real z, real notused, array[] real theta,
>                  array[] real X_i, array[] int y_i) {
>     real sigmaz = theta[1];
>     real mu_i = theta[2];
>     real p = exp(normal_lpdf(z | 0, sigmaz) + poisson_log_lpmf(y_i | z + mu_i));
>     return (is_inf(p) || is_nan(p)) ? 0 : p;
>   }
> }
> generated quantities {
>   vector[N] log_lik;
>   vector[N] y_loorep;
>   for (i in 1:N) {
>     real mu_i = offsett[i] + alpha + X[i,]*beta;
>     log_lik[i] = log(integrate_1d(integrand, negative_infinity(), positive_infinity(),
>                                   append_array({sigmaz}, {mu_i}), {0}, {y[i]},
>                                   integrate_1d_reltol));
>     y_loorep[i] = poisson_log_rng(normal_rng(0, sigmaz) + mu_i);
>   }
> }
> ```
> Note `y_loorep`: "**the LOO predictive distribution given other parameters than `z`. This is needed to get the
> correct LOO predictive distributions when combined with integrated PSIS-LOO.**" And the guard clause
> `is_inf(p) || is_nan(p) ? 0 : p` — a small piece of numerical defensiveness worth copying.
>
> **Why the integration goes in `generated quantities`, not in `model`:** "**We could also move the integrated
> likelihood to the model block and not use Stan to sample the varying intercepts at all. This would make
> marginal posterior computation easier, but using quadrature integration $N$ times for each leapfrog step in
> HMC/NUTS sampling will increase the sampling time more than what would be the benefit** … **When we do the
> integration in the generated quantities, the quadrature is computed only for each saved iteration, making
> the computation faster.**"
^def-integrated-loo

> [!example] With the computation fixed, the checks become honest (Figures 24.16-24.17)
> ```
>                                        elpd_diff se_diff
> Poisson varying intercepts w. int-LOO        0.0     0.0
> Negative binomial                           -3.7     7.6
> ```
> matching the $K$-fold answer. LOO-PIT now gives **$p^{\text{POT}}_{\text{unif}} = 0.28$** rather than 0.000.
>
> The **PAV reliability diagram** for predicting nonzero counts "**looks better than with the negative binomial
> model. The predicted probabilities have a wider range, and the calibration curve stays better inside the
> envelope.**"
>
> **And an explanation of why the two models are nearly equivalent:** "**the varying intercepts are close to
> normally distributed (as we expected), and thus the difference compared to the negative binomial mostly
> arises from the different distributions for the individual variation.**" (A Poisson with lognormal varying
> intercepts and a negative binomial are both overdispersed Poissons — they differ only in the mixing
> distribution.)

### Model 5 — zero-inflated negative binomial, and the substantive answer

> [!example] The final model (Ch. 24.5, pp. 384-386)
> "**The proportion of zeros is high in the data, and the calibration plot for the negative binomial model
> indicates a slight miscalibration in the prediction of zeros vs. nonzeros.**"
> ```r
> fit_zinb <- brm(bf(y  ~ sqrt_roach1 + treatment + senior + offset(log(exposure2)),
>                    zi ~ sqrt_roach1 + treatment + senior + offset(log(exposure2))),
>                 family=zero_inflated_negbinomial(), ...)
> ```
> ```
>            Estimate   SE
> elpd_loo     -859.1 37.8
> p_loo          10.2  2.7
> ```
> "**The estimate of `p_loo` is close to 9, the total number of parameters in the model, which is a good
> sign.**"
> ```
>                                 elpd_diff se_diff
> Zero-inflated negative binomial       0.0     0.0
> Negative binomial                   -23.0     7.0
> ```
>
> **Reading the coefficients (Figure 24.19):** "**The marginal effects for the logistic part have opposite sign,
> which makes sense given that it is predicting the extra zeros.**"

> [!important] Getting a single interpretable answer out of a two-component model
> "**The treatment effect is now divided between the negative binomial and logistic components. We can use the
> model to make predictions for the expected number of roaches given treatment and no-treatment to get one set
> of marginal posterior summaries.**"
> ```r
> pred_zinb <- posterior_epred(fit_zinb,
>   newdata=rbind(mutate(roaches, treatment=0), mutate(roaches, treatment=1)))
> ```
> The **ratio of expected roaches with vs. without treatment** is then the reported quantity.
>
> "**As discussed in Chapter 18 of Gelman, Hill, and Vehtari (2020), it makes sense to give this difference a
> causal interpretation, as the treatment was randomly assigned and our model does not adjust for
> post-treatment predictors**" — precisely the condition whose violation
> [[Statistical and Scientific Inference]] names as scientifically degenerate.
>
> **Comparing the three models on that ratio (Figure 24.21):** "**All the models show a benefit of treatment,
> but the Poisson predictions are overconfident with posterior intervals that are too narrow. Posteriors using
> the negative binomial and zero-inflated negative binomial models are similar, and in this case it should not
> matter for decision making even if the slightly worse negative binomial model were used.**"

> [!important] Prior sensitivity on the estimand, not the parameters
> "**As there is posterior dependence among the coefficients in these models, it is not so useful to look at
> sensitivity to individual parameters. Instead we focus on a quantity of substantive interest, the ratio of
> expected number of roaches under treatment or control conditions.**"
> ```r
> powerscale_sensitivity(fit_zinb, prediction = \(x, ...) ratio_zinb)
> ```
> ```
>  variable  prior likelihood diagnosis
>  ratio    0.0408      0.133 -
> ```
> "**We see no prior sensitivity, and the likelihood is informative.**"
>
> Exactly the advice given in
> [[Influence of Likelihood and Prior#Marginal sensitivity can be uninterpretable]], applied.

## Connections

- The chapter is effectively a **field guide to `loo` diagnostics**: `p_loo` vs. parameter count for
  misspecification, Pareto $\hat{k}$ for computational failure, and a repair ladder of moment matching →
  $K$-fold → integrated LOO.
- "Posterior predictive checking is likely to fail with flexible models" is the strongest statement in the
  book of the problem that [[Cross Validation Checking]] exists to solve — and this chapter shows the case
  where the standard solution *also* fails.
- The zero-inflation question and the PAV reliability diagrams recur in
  [[Predictive Model Checking and Comparison - Clinical Trial]], where the same tools decide against adding
  zero inflation.

## See Also
- [[Cross Validation Checking]] — LOO-PIT and why double-used data mislead
- [[Model Selection Using Predictive Performance]] — elpd differences and their standard errors
- [[Influence of Individual Data Points]] — Pareto $\hat{k}$ as an influence diagnostic
- [[Posterior Predictive Checking]] — rootograms and PAV calibration plots
