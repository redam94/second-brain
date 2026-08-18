---
title: "Influence of Individual Data Points"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 8.4, pp. 148-150 (Figure 8.10)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Cross Validation Checking]]"
  - "[[Posterior Predictive Checking]]"
used_by:
  - "[[Influence of Likelihood and Prior]]"
  - "[[Model Selection and Overfitting]]"
  - "[[LOO Model Checking and Comparison - Roaches]]"
aliases:
  - "Pointwise LOO"
  - "Influence function"
  - "Leave-one-group-out"
  - "Moving vs removing a data point"
  - "Pareto k"
---

# Influence of Individual Data Points

> [!summary]
> Not "does the model fit?" but "**which observations does it fail on, and is there a pattern?**"
> Pointwise LOO log scores turn a single aggregate number into a diagnostic: in the arsenic example an
> `elpd` difference of $16.4 \pm 4.4$ between two models turns out to come from **about 10 specific
> non-switchers with very high arsenic levels.** The section also distinguishes two different notions of
> influence — **moving** a data point ($d\hat\theta/dy_i$) versus **removing** it — which behave very
> differently, and notes that in hierarchical models leave-one-out often does not match the inferential
> goal.

## Overview

> [!important] The framing (Ch. 8.4, p. 148)
> "**In addition to looking at the calibration of the conditional predictive distributions, we can also
> look at which observations are hard to predict and see if there is a pattern or explanation for why some
> are harder to predict than others. This approach can reveal potential problems in the data or data
> processing, or point to directions for model improvement**" (Vehtari, Gelman, and Gabry 2017; Gabry,
> Simpson, et al. 2019).
>
> **The two signals to look for:** "**Very low cross validation log predictive densities (or probabilities)
> and LOO-PIT values near 0 or 1 indicate observations which are far in the tails of the predictive
> distribution and can be difficult to predict.**"
>
> The broader context: "Complex models can be difficult to understand. Hence the need for a range of
> interrelated approaches, including **cross validation, stacking, boosting, and Bayesian evaluation.
> Exploratory model analysis** (Unwin, Volinsky, and Winkler 2003; Wickham 2006) **and explainable AI**
> (Chen, Li, et al. 2019; Gunning et al. 2019; Rudin 2019) complement methods for evaluating, comparing,
> and averaging models."

## Main Content

### Pointwise LOO as a diagnostic

> [!example] Arsenic in Bangladeshi wells (Figure 8.10; Vehtari, Gelman, and Gabry 2017)
> **The data.** A survey of residents from a small area in Bangladesh affected by arsenic in drinking
> water. Respondents with elevated arsenic in their wells were asked whether they were interested in
> **switching to a neighbor's well**; a series of models predict this binary response from household
> information.
>
> **The aggregate number.** Summing all the pointwise differences yields an estimated difference in
> expected log predictive densities $\text{elpd}_{\text{LOO}}$ of **16.4 with a standard error of just
> 4.4** — a clear win for one model.
>
> **What the plots add.**
> - **(a)** Pointwise $\text{LOO}_1$ vs. $\text{LOO}_2$ directly, marked by outcome (red crosses $y=1$,
>   blue circles $y=0$).
> - **(b)** The *difference* $\text{LOO}_1 - \text{LOO}_2$ plotted against **a key predictor**,
>   $\log_{10}(\text{arsenic})$.
>
> "**The scattered blue dots on the left side of Figure 8.10a and on the lower right of Figure 8.10b
> correspond to data points for which one of the models fits particularly poorly** — that is, large
> negative contributions to the expected log predictive density."
>
> **The finding:** "beyond that we can use this plot to **find which data points create problems for the
> model, in this case about 10 non-switchers with very high existing arsenic levels.**"
>
> "For any given data point, one model will fit better than another, but for this example the graphs
> reveal that **the difference in LOO between the models arises from model 2's poor predictions for about
> 10 particular data points.**"
>
> **And an honest note on when not to act:** "**In this particular example, we did not follow up on this
> modeling issue, because even more elaborate models that fit the data better do not change the
> conclusions and thus would not change any recommended actions in Bangladesh.**" (Gabry, Simpson, et al.
> 2019 and several case studies do provide examples where LOO-CV motivated model improvements.)
>
> Note the plotting move that makes this diagnostic work: **plot the LOO difference against a predictor,
> not against the index.** That is what converts "some points fit badly" into "the model fails at high
> arsenic levels."

### Two different notions of influence

> [!definition] Moving vs. removing (Ch. 8.4, p. 149)
> **Moving** — the classical definition. The influence of $y_i$ on an estimate $\hat\theta$ is
> $$\frac{d\hat\theta}{dy_i}$$
> the change if the point is shifted up or down with all others fixed. "**For discrete data it would make
> sense to replace the derivative with a finite difference such as
> $\hat\theta(y_i=1) - \hat\theta(y_i=0)$.** In a model with correlated data such as a time series or
> spatial process, **it could make sense to condition on a more realistic perturbation of many neighboring
> data points at once.**"
>
> **Removing** — comparing $\hat\theta(y)$ to $\hat\theta(y_{-i})$, where $y_{-i}$ is the data with point
> $i$ removed.
^def-two-influences

> [!example] Why the two differ — a point at the edge of the predictor range
> Least squares $y = a + bx + \text{error}$, with $x$ ranging uniformly from 0 to 10; interest in the
> influence on the slope $\hat{b}$. Consider a point with $x_i = 10$.
>
> | | Behavior |
> |---|---|
> | **Moving** | "**It will have a large influence** … $d\hat{b}/dy_i$ will be far from zero, **and this influence does not depend on the data point $y_i$**" |
> | **Removing** | "**depends strongly on $y_i$**: if the data point happens to fall **exactly on the fitted regression line, then removing it will not change the estimate at all**, but if it is much higher or lower, removal can make a difference" |
>
> **They are not unrelated.** "Although the effect of removal depends on $y_i$, we can compute something
> like the **average squared effect of removal, integrating over the predictive distribution of $y_i$, and
> that will be larger for data points at the extreme of the range of $x$.**"
>
> **And removal does more than move a point estimate:** "**removing a data point can affect the inference
> for $b$ — in this case, increasing its uncertainty — even if it happens to leave the point estimate
> unchanged.**"

> [!important] The Bayesian version
> "In Bayesian workflow, we would replace **influence on the point estimate** with **influence on the
> posterior distribution.** It is most convenient to study the **posterior mean** because it is an average
> over that distribution, and so **influence can be computed by differentiating within the integral.**"
>
> **The limitation, acknowledged:** "**this approach has limitations if the data are clustered or otherwise
> structured so that multiple points would need to be removed to have an effect, but it can still be part
> of general workflow, given that it is computationally inexpensive and can be valuable in many applied
> settings.**"

### Two computational routes

> [!definition] Route 1 — importance weights from PSIS-LOO
> "Following this cross validation idea, **the influence of an individual data point $y_i$ can be
> summarized according to properties of the distribution of the importance weights computed when
> approximating LOO-CV**" (Vehtari, Gelman, and Gabry 2017; implemented in the **`loo`** R package).
>
> In practice this is the **Pareto $\hat{k}$** diagnostic: a high $\hat{k}$ means the importance weights
> are heavy-tailed, which means the posterior changes a lot when that point is removed — i.e. the point is
> influential *and* the approximation is unreliable for it. The threshold used in this book is
> $\hat{k} < 0.7$; see [[Influence of Likelihood and Prior]].

> [!definition] Route 2 — data removal as a gradient in a larger model space
> "An alternative approach to importance weighting is to frame the removal of data points as **a gradient
> in a larger model space.** Suppose we have a simple independent likelihood $\prod_{i=1}^n p(y_i|\theta)$
> and we work with the more general form
> $$\prod_{i=1}^n p(y_i \mid \theta)^{\alpha_i}$$
> which reduces to the original likelihood when $\alpha_i = 1$ for all $i$. **Leave-one-out cross
> validation corresponds to setting $\alpha_i = 0$ for one observation at a time.**
>
> Another option (Giordano, Broderick, and Jordan 2018; implemented by Giordano 2018) is to **compute the
> gradient of the augmented log likelihood as a function of $\alpha$: this can be interpreted as a sort of
> differential cross validation or influence function.**"
>
> Note that this is the *same* power-scaling device used for prior sensitivity in
> [[Influence of Likelihood and Prior]] — applied per-observation to the likelihood rather than globally
> to the prior.
^def-power-weighted-likelihood

### Influence for correlated data

> [!warning] Leave-one-out may not match the inferential goal (Ch. 8.4, p. 150)
> "**Cross validation for multilevel (hierarchical) models requires more thought. Leave-one-out is still
> possible, but it does not always match our inferential goals.**
>
> For example, when performing multilevel regression for adjusting political surveys, **we are often
> interested in estimating opinion at the state level. A model can show real improvements at the state
> level with this being undetectable at the level of cross validation of individual observations**"
> (Wang and Gelman 2015).
>
> **The variants:** Millar (2018), Merkle, Furr, and Rabe-Hesketh (2019), and Vehtari (2019) "demonstrate
> different cross validation variants and their approximations in hierarchical models, including
> **leave-one-unit-out** and **leave-one-group-out.**"
>
> **What the authors actually do:** "In applied problems, we have performed **a mix of approaches, holding
> out some individual observations and some groups and then evaluating predictions at both levels**"
> (Price, Nero, and Gelman 1996).
^wrn-loo-vs-goal

> [!important] The computational catch — and its consolation
> "Importance sampling provides an efficient way to perform leave-one-out cross validation.
> **Unfortunately, using importance sampling to approximate leave-one-unit-out cross validation tends to be
> much harder. This is because more observations are left out at a time, which implies stronger changes in
> the posterior distributions from the full to the subsetted model. As a result, we may have to rely on
> more costly model refits.**
>
> **The good news is that there are typically fewer units than observations, implying fewer model fits than
> the leave-one-out case.**"

## Connections

- The LOO-difference-vs-predictor plot is the diagnostic form of the grouped posterior predictive check in
  [[Posterior Predictive Checking]] (Figure 8.5d): both look for structure in the residual misfit that the
  model does not include.
- The power-weighted likelihood $\prod p(y_i|\theta)^{\alpha_i}$ is the same construction that
  [[Influence of Likelihood and Prior]] applies globally — one framework covering data influence and
  prior influence.
- Which CV scheme matches which goal is the same question as which replication scenario you are checking:
  [[Simulation to Express Uncertainty#The three replication scenarios in a hierarchical model]].

## See Also
- [[Cross Validation Checking]] — the LOO machinery this section repurposes as a diagnostic
- [[Influence of Likelihood and Prior]] — the same question asked of the prior rather than the data
- [[Model Selection and Overfitting]] — using elpd differences for comparison rather than diagnosis
- [[LOO Model Checking and Comparison - Roaches]] — an extended case study of these tools
