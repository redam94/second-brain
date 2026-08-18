---
title: "Predictive Model Checking and Comparison - Clinical Trial"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/brms
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 18, pp. 293-304 (Figures 18.1-18.12)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Posterior Predictive Checking]]"
  - "[[Cross Validation Checking]]"
  - "[[Model Selection Using Predictive Performance]]"
  - "[[Influence of Likelihood and Prior]]"
used_by:
  - "[[Debugging a Model - World Cup Football]]"
aliases:
  - "Nabiximols trial"
  - "Cannabis use clinical trial"
  - "Beta-binomial overdispersion"
  - "Midpoint rule for comparing continuous and discrete models"
---

# Predictive Model Checking and Comparison — Clinical Trial

> [!summary]
> A clinical trial of **nabiximols** for reducing cannabis use, 128 participants, days-of-use in the past
> 28 days measured at weeks 0, 4, 8, 12. The case study opens with a puzzle: **a continuous normal model
> beats a binomial model by 305 elpd**, even though the outcome is a bounded count. The answer is
> **overdispersion** — the binomial cannot produce enough 0s and 28s — and the fix is a **beta-binomial**,
> which then beats the normal by 539. The chapter's real lesson is delivered at the end: with the *normal*
> model, the conclusion about the treatment "**is different**" from the beta-binomial one. **The choice of
> data model changed the answer, not just the fit.**

## Overview

**The data** (Lintzeris et al. 2020): 128 participants, placebo vs. nabiximols, 12-week treatment with
"weekly clinical reviews, structured counseling, and flexible medication doses — up to 32 sprays daily."
Outcome `cu` = number of days of cannabis use in the previous 28 (`set` = 28), at four time points.

> [!important] Why histograms rather than trajectories (Figure 18.1)
> "**Usually in plotting such data we would prefer time series showing the trajectory for individual
> participants; here we display histograms because in this chapter we will be focusing on the comparison of
> different models for the distributions of the data, in particular handling the bunching up of responses at
> the extreme values of 0 and 28.**"
>
> The plotting choice is dictated by the modeling question. Both groups "**show a sharp drop in days of
> cannabis use after the first month.**"

## Main Content

### The puzzle: normal beats binomial

> [!example] The comparison, and the technique that makes it legitimate (Ch. 18.1, pp. 293-295)
> Two `brms` models, both with a varying intercept per participant:
> ```r
> fit_normal   <- brm(cu ~ group*week + (1 | id), family=gaussian(), ...)
> fit_binomial <- brm(cu | trials(set) ~ group*week + (1 | id), binomial(link=logit), ...)
> ```
> ```
>               elpd_diff se_diff
> fit_normal          0.0     0.0
> fit_binomial     -304.8   118.5
> ```
> `loo` warns: `Not all models have the same y variable.`
>
> **Comparing a density to probabilities — the midpoint rule (Figure 18.2).** "**We can't compare densities
> and probabilities directly, but we can discretize the density to get comparable probabilities. As the
> outcomes are integers $(0,1,\dots,28)$, we can compute probabilities for intervals
> $((-0.5,0.5), (0.5,1.5), \dots)$ and use the midpoint rule** … **In this case, as the width is 1, the value
> of the midpoint density is equal to the approximated probability value.**"
>
> "**As the continuous function is relatively smooth compared to the discretization interval, the midpoint
> rule provides a sufficiently accurate approximation.**" ([[Debugging a Model - World Cup Football]] Ch. 23
> includes a case where it does **not** work.)
^ex-midpoint-rule

> [!warning] The diagnosis: the binomial cannot be overdispersed enough (Figure 18.3)
> "**How is it possible that the binomial distribution, which is a model for counts in a bounded range,
> performs so much worse than a continuous normal model for these discrete data?**"
>
> **Posterior predictive check:** "**the binomial model predicts lower probability for both 0 and 28 than what
> is observed in the data. Yes, the model includes varying intercepts for participants, but participant-specific
> counts vary across time periods much more than would be expected from the fitted binomial model.**"
>
> **LOO-PIT-ECDF** ($p^{\text{POT}}_{\text{unif}} = 0.000$): "**too many LOO-PIT values near 0 and 1, which
> indicates the posterior predictive intervals are too narrow.**"

> [!warning] But the normal model is also bad — and the PIT plot nearly hides it (Figure 18.4)
> The normal model's posterior predictive replicates "**look even more different than the observed data,
> including predicting outcomes less than 0 and larger than 28. But the higher probabilities of 0 and 28,
> relative to what was predicted from the binomial model, make the normal model win in the LOO comparison.**"
>
> Its LOO-PIT ($p^{\text{POT}}_{\text{unif}} = 0.006$) "**indicates clear non-uniformity, but it is difficult
> to see from the plot that the normal model is predicting beyond the limits of the data. **The errors at
> different ends of the data are in different directions and happen to mostly balance out in the LOO-PIT
> plot.**
>
> > **This is why it is useful to look at both marginal and conditional predictive checks.**"
>
> A concrete instance of the warning in [[Cross Validation Checking]] that a clean PIT plot is not proof of
> calibration — here two opposite errors cancel.
^wrn-pit-cancellation

### The fix: beta-binomial

> [!example] Combining the advantages of both (Figure 18.5, Ch. 18.2, p. 295)
> "**To combine the advantages of the binomial model (it predicts discrete data) and the normal model (it
> allows variation over time to be fit from the data), we try a beta-binomial model, which is an overdispersed
> version of the binomial.**"
> ```r
> fit_betabinomial <- brm(cu | trials(set) ~ group*week + (1 | id), beta_binomial(), ...)
> ```
> ```
>                  elpd_diff se_diff
> fit_betabinomial       0.0     0.0
> fit_normal          -538.5    33.5
> ```
> "**The difference is so big that it is unlikely that fixing the Pareto $\hat{k}$ warnings would change the
> conclusion. We confirm this using moment matching** (Paananen et al. 2021) **to improve the LOO computation,
> and there is no practical difference.**"
>
> LOO-PIT now gives $p^{\text{POT}}_{\text{unif}} = 0.28$ — well calibrated.

> [!important] Checking specifically for zero- and 28-inflation (Figure 18.6)
> "**The data included many counts of 0 and 28, and we can further check whether we might need to include zero
> inflation or 28-inflation.** LOO-PIT-ECDF plots can sometimes be weak to detect zero inflation, and a type of
> calibration plot also known as the **reliability diagram** (Dimitriadis, Gneiting, and Jordan 2021) is better
> for binary targets" (Säilynoja, Johnson, et al. 2025).
>
> The plots compare predicted probability of nonzero (and of 28) against observed conditional event
> probabilities, with a **PAV-adjusted monotonic calibration curve** in red and bootstrapped confidence bands
> in blue. "**Although the red line does not completely stay within the blue envelope, the discrepancies are
> small and the overall fit seems good, and thus it does not seem necessary to expand the model with zero or
> 28 inflation.**"
>
> See [[Posterior Predictive Checking#Displays matched to the data type]].

### Prior sensitivity and a model refinement

> [!example] Power scaling flags every global parameter (Figure 18.7, Ch. 18.2, pp. 297-298)
> "**The priors used in the above analysis are narrow compared to what we usually see**," so power-scaling
> sensitivity analysis is run on both prior and likelihood, using "**the gradient of the cumulative
> Jensen-Shannon divergence at $\alpha = 1$.**"
>
> The diagnostic table reports **potential conflict for all 11 global parameters**. "**This does not necessarily
> imply that anything is wrong with the prior, as the data model can have problems too.**"
>
> Priors are widened to $\text{normal}(0,3)$ throughout; "**Repeating the sensitivity analysis … we now see no
> prior-likelihood conflict. PSIS-LOO comparison also shows slightly better predictive performance, although
> the performance difference is too small to matter in practice.**"
>
> **Two reasons the diagnostic says "potential":** "**First, the diagnostic thresholds are arbitrary. Second, if
> the parameters have posterior dependence, the posterior marginals can be sensitive to the prior even if the
> joint posterior and actual quantities of interest are not prior sensitive.**"
>
> > **"The goal of prior-likelihood sensitivity analysis is not to adjust priors until there are no diagnostic
> > messages. Instead, they mean we need to think more."**

> [!important] A substantive modeling error, caught by thinking rather than by a diagnostic
> "**The above models included the baseline `week=0` in the interaction term with `group`, which does not make
> sense as the treatment should not affect the outcome at time 0.**"
>
> The fix moves baseline `cu` to a pre-treatment predictor: `cu ~ group*week + cu_baseline + (1 | id)`.
> Comparing fairly requires excluding week-0 pointwise elpd from the earlier models:
> ```
>                    elpd_diff se_diff
> fit_betabinomial2b       0.0     0.0
> fit_betabinomial2      -34.3     9.9
> ```
> "**By comparing the posterior distributions for the beta-binomial dispersion parameter `phi`, we see that the
> estimated overdispersion in the new model is smaller (a larger value of `phi` corresponds to lower
> dispersion), leading to less uncertainty in predictions.**"
>
> Note that the misspecification was showing up **as extra overdispersion** — a structural error absorbed into
> a variance parameter, which is why no calibration check flagged it.

### Inference for the treatment effect

> [!definition] Why the marginal posterior is not enough (Ch. 18.3, pp. 298-300)
> "**As the treatment is included in an interaction term, looking at the univariate posterior marginal
> distribution is not sufficient for estimating the treatment effect.**"
>
> Instead, predict for a **new** participant (`id=129`) at the median baseline (`cu_baseline=28`), under each
> arm, and take the difference — the procedure of [[Causal Inference as Generalization]].
>
> **Two versions, differing in what uncertainty is included:**
> | Quantity | Includes | Result |
> |---|---|---|
> | **Posterior predictive distribution** (Figure 18.9) | epistemic **+ aleatoric** (unknown id intercept and beta-binomial noise) | "**90% possibility of smaller `cu` with nabiximols than with placebo**" |
> | **Expectation of the predictive distribution** (Figure 18.11) | epistemic only — "**as in average over many new individuals**" | "**99% probability of smaller expected `cu`**" |
>
> "**The difference between groups is the biggest in week 12.**"
^def-two-predictive-quantities

> [!important] A graphics digression worth keeping (Figure 18.10)
> "**We have used quantile plots with 100 dots, as these are better than kernel density estimates and
> histograms for showing spikes (as here exactly at zero) and make it easy to estimate tail probabilities by
> counting the dots.**"
>
> Comparing three alternatives on the same week-12 difference: "**The ggplot2 KDE oversmooths a lot, the
> ggdist KDE and the ggplot2 histogram smooth less, but it is easier to see the tail probabilities with the
> dot plot.**" See [[How Many Digits to Report#Graphical display]].

### The payoff: the data model changes the conclusion

> [!warning] Normal vs. beta-binomial on the quantity of interest (Figure 18.12, Ch. 18.4, pp. 300-302)
> ```
>                    elpd_diff se_diff
> fit_betabinomial2b       0.0     0.0
> fit_normal2b          -269.4    23.6
> ```
> and for the paper's own specification (total days over 12 weeks):
> ```
>                    elpd_diff se_diff
> fit_betabinomial2c       0.0     0.0
> fit_normal2c          -152.9    17.1
> ```
>
> **The four posteriors for the treatment effect compared side by side:**
> - "**The normal models underestimate the magnitude of the change and are overconfident, with much narrower
>   posteriors.**"
> - For **weeks 9-12** (models with week as a predictor): "**the conclusion about benefit of nabiximols is the
>   same with the normal and beta-binomial models despite that the normal model underestimates the effect.**"
> - For **weeks 1-12** (models without week as a predictor): "**the conclusion regarding the benefit of
>   nabiximols is different.**"
>
> "**In this case, the LOO-CV comparisons and posterior predictive checks show that the beta-binomial has much
> better average performance and matches the data much better, and we can safely drop the normal models from
> consideration.**"
>
> > **"The results here show how the choice of data model can matter for the conclusions."**
^wrn-data-model-changes-conclusion

This is the counterexample to the reassurance in
[[A Data Model Is Not Just a Likelihood#When a wrong data model still works]] that a wrong data model often
gives similar inferences — and it shows the workflow that distinguishes the two situations: **check
calibration, compare predictive performance, and only then look at the effect.**

### A subtle model-comparison lesson

> [!example] Comparing with and without the treatment variable (Ch. 18.5, p. 302)
> "**Since estimating the treatment effect is the goal of the analysis, it might seem that it is pointless to
> fit models that do not account for the treatment. We do not need model selection or comparison to tell us to
> include the treatment. But comparing models with and without treatment could still inform us about the
> importance of the treatment effect, in the context of total variation in outcomes.**"
>
> ```
>                    elpd_diff se_diff
> fit_betabinomial3b       0.0     0.0   (no group variable)
> fit_betabinomial2b      -0.9     2.3   (with group)
> ```
>
> **Why the log score sees nothing:** "**This is probably due to the actual effect not being far from zero, and
> the aleatoric uncertainty for a new 4-week period is big. The predictive distribution is wide and, due to the
> constrained range, has thick tails. This induces a U-shape in the distribution of outcomes, which makes the
> log score insensitive in the tails.**"
>
> **The fix — change the scoring rule to drop aleatoric uncertainty:** "**we can also focus on comparing
> absolute error of the means of the predictive distributions considered as point estimates. This approach has
> the benefit that we can drop the aleatoric uncertainty and improve accuracy of the finite MCMC sample.**"
>
> Result: "**The probability is 95% that the leave-one-out predictive absolute error is smaller with the model
> that includes the treatment group variable.**"
>
> **And Bayes factors do no better:** `bridgesampling` gives a Bayes factor of **0.5**. "**Like LOO-CV, the
> Bayes factor does not see any large difference … The Bayes factor is a ratio of marginal likelihoods, and
> marginal likelihoods can be formulated as sequential log score predictive performance quantities, which
> explains why it is also weak for ranking models in cases of high aleatoric uncertainty.**"
>
> A genuinely useful diagnostic insight: **when aleatoric uncertainty dominates, log-score comparison is the
> wrong instrument**, and this affects LOO and Bayes factors alike.
^ex-log-score-insensitive

## Examples

> [!example] General lessons (Ch. 18.6, p. 303)
> "**We should trust our model before making final conclusions based on the posterior. Simpler models in the
> beginning of the workflow may be useful, but, where possible, conclusions should be based on models that have
> been checked against predictions.**
>
> **An improvement can make a model more trustworthy for generalizations even when it doesn't much improve
> predictive performance as measured by the leave-one-out cross validation log score. In this example, there is
> a clear difference in the location and width of the posterior for the treatment effect between the simple
> normal model and the improved beta-binomial model.**"

## Connections

- The normal-beats-binomial puzzle is a compact demonstration that **elpd ranks models on average predictive
  accuracy, not on structural correctness** — the normal wins by being wrong in a more forgiving direction.
- The PIT-cancellation warning and the log-score insensitivity result are two independent reasons this chapter
  insists on **multiple checks**: [[Posterior Predictive Checking]], LOO-PIT, PAV calibration, and elpd all
  see different things.
- The data-model-changes-the-conclusion finding is the strongest empirical support in the book for
  [[A Data Model Is Not Just a Likelihood#Choosing the data model is a modeling decision too]].

## See Also
- [[Posterior Predictive Checking]] — PIT, rootograms, and PAV calibration plots
- [[Cross Validation Checking]] — LOO-PIT and why the same data cannot be used twice
- [[Model Selection Using Predictive Performance]] — elpd differences and their standard errors
- [[Influence of Likelihood and Prior]] — the power-scaling diagnostics used here
- [[Debugging a Model - World Cup Football]] — continuous vs. discrete models revisited
