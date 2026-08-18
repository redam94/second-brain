---
title: "Relating a Model to Subject-Matter Assumptions"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.2, pp. 66-69 (Figure 5.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Choosing an Initial Model]]"
  - "[[Hierarchical Models]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
used_by:
  - "[[Prior Distributions]]"
  - "[[Specifying the Data Model and the Prior]]"
  - "[[Poststratification]]"
aliases:
  - "8 schools"
  - "Eight schools model"
  - "SAT coaching experiment"
---

# Relating a Model to Subject-Matter Assumptions

> [!summary]
> A line-by-line audit of the **8 schools** model: six assumptions, why each is defensible, and — for
> each — the concrete setting in which its violation would matter enough to justify expanding the
> model. The section models a workflow habit worth copying: **"there are good reasons for each of the
> assumptions of the model; still, all these assumptions are wrong. The question is whether they are
> wrong enough that it would be worth the effort to expand our model."**

## Overview

**The setting.** In the late 1970s, experiments were performed in each of 8 New Jersey high schools to
estimate the effect of a coaching program on the SAT-V (Scholastic Aptitude Test, Verbal), described
by Alderman and Powers (1980). In each school, students were given two pre-tests and then **randomly
assigned** to treatment or control. After coaching ended, both groups took the SAT-V, and a regression
was fit per school predicting exam score from pre-tests and treatment indicator. The estimated
treatment effect (the treatment coefficient) and its standard error were reported. **The raw data have
been lost** — only the summaries survive.

| School | Type | Class size | $n_j$ | Effect $y_j$ | SE $\sigma_j$ |
|---|---|---|---|---|---|
| A | Public | 1 | 50 | 28.4 | 14.9 |
| B | Public | 20 | 79 | 7.9 | 10.2 |
| C | Public | 10 | 39 | $-2.8$ | 16.3 |
| D | Public | 24 | 91 | 6.8 | 11.0 |
| E | Public | 30 | 99 | $-0.6$ | 9.4 |
| F | Private | 6 | 72 | 0.6 | 11.4 |
| G | Private | 12 | 94 | 18.0 | 10.4 |
| H | Private | 10 | 35 | 12.2 | 17.6 |

> [!definition] Rubin's (1981) model
> $$y_j \sim \text{normal}(\theta_j, \sigma_j), \quad j = 1,\dots,J$$
> $$\theta_j \sim \text{normal}(\mu, \tau), \quad j = 1,\dots,J$$
> $$p(\mu, \tau) \propto 1$$
> where $\theta_j$ is the coaching effect in school $j$, and $\mu, \tau$ are the mean and standard
> deviation of a **hypothetical superpopulation of treatment effects**.
^def-8-schools

> [!important] The partial-pooling result and why $\tau \approx 0$ here
> The posterior for each $\theta_j$ is a partial-pooling compromise between the unpooled $y_j$ and the
> completely-pooled average, with the proportion of pooling equal to
> $$\frac{\sigma_j^2}{\sigma_j^2 + \tau^2}$$
>
> **"The standard deviation of the eight raw estimates $y_j$ is approximately the same as the
> individual estimates' standard errors $\sigma_j$, so there is no evidence of any variation in the
> underlying effects $\theta_j$.** As a result, the Bayesian estimate of $\tau$ happens to be close to
> zero. **This example represents the common setting in which any underlying variation cannot be well
> estimated from available data.**"

## Main Content

### The six assumptions, audited

> [!example] Assumption 1 — Unbiased estimation
> **The claim:** $\theta_j$, the causal effect of interest, is the expected value of the distribution
> of the estimate $y_j$.
> **Why defensible:** "backed up by the **design** of the study: a randomized experiment with no
> dropouts and a direct measurement of the outcome of interest."
> **When it would fail:** if the estimates came from **observational studies** rather than controlled
> experiments; if adjustment for treatment/control differences among completers was insufficient; or if
> "the conditions of the experiment were very different from real-world coaching settings."
> **The fix:** add a **bias term** to the data model with a prior giving the scale of possible bias.
> "Including such a term … would have the effect of **increasing posterior uncertainty about future
> treatment effects.**" (Compare the bias-term model in
> [[Tail Behavior and Prior-Likelihood Conflict]].)

> [!example] Assumption 2 — Known sampling variances
> **The claim:** the standard error from each fitted regression is *the known sampling variance*.
> **The honest version of the model:** label it $s_j$ and add a line
> $$\frac{(n_j - 2)s_j^2}{\sigma_j^2} \sim \chi^2_{n_j - 3}$$
> with three degrees of freedom subtracted to account for the regression fit. The now-unknown
> $\sigma_j$ would need modeling too, e.g. $\sigma_j \sim \text{lognormal}(\mu_{\log\sigma}, \tau_{\log\sigma})$
> with weak hyperpriors.
> **The calculation that justifies not bothering:** with $n_j \approx 60$, the coefficient of variation
> of $s_j^2$ from the $\chi^2_{58}$ distribution is $\sqrt{2/58} = 0.186$; the CV of $s_j$ is
> approximately half that, **0.093**. "Given that the experiments specify each $s_j$ to within
> approximately 10%, it seemed acceptable in practice to just take the $\sigma_j$'s as known."
> **When it would matter:** the different $\sigma_j$ cause different *amounts* of pooling — "the
> estimate for school C will be pooled much more than for school E." If a hierarchical model were fit
> to the standard errors themselves, "the estimated $\sigma_j$'s would end up **much closer to each
> other**, and the estimates $\theta_j$ would be partially pooled by pretty much the same fraction."

> [!example] Assumption 3 — Normal data model
> **Why defensible:** the $y_j$ are least squares estimates, which "from statistical theory we know will
> be approximately normally distributed in the absence of outliers — and these standardized test scores
> fall in a **restricted range** and so cannot take on extreme values."
> **When it would fail:** "It is hard to imagine how the estimates $y_j$ would not have approximate
> normal error distributions." This is the one assumption the authors decline to worry about.

> [!example] Assumption 4 — Normal distribution for the $\theta_j$
> **Why defensible:** appropriate "if the treatment effects can be considered as the **sum of many small
> independent pieces**, which makes sense in this example. Each school has its own students and
> teachers, each of which can make some small contribution."
> **Three directions of expansion, if it failed:**
> 1. **Add a group predictor.** To allow public/private differences: $\theta_j \sim \text{normal}(a + bu_j, \tau)$
>    with $u_j = 0$ public, $1$ private. Note: "This is a hierarchical normal regression **conditional
>    on $u$**, but for the population corresponds not to a normal distribution of effects but to a
>    **mixture of normals.**" Class size would be another natural predictor — "especially given that the
>    coaching program with the smallest class size had the highest estimated effect."
> 2. **Long tails.** $\theta_j \sim t_4(\mu, \tau)$ or $t_4(a + bu_j, \tau)$, allowing very large
>    positive or negative effects.
> 3. **Asymmetric tails.** If effects could be very large positive but not negative:
>    $\theta_j = \phi_j - \psi_j$ with $\phi_j \sim \text{lognormal}(\mu_\phi, \sigma_\phi)$,
>    $\psi_j \sim \text{lognormal}(\mu_\psi, \sigma_\psi)$ and $\sigma_\phi \gg \sigma_\psi$; or gamma
>    distributions with different scale parameters.
>
> > **"What is most relevant here is how the model is structured rather than the functional form of the
> > distribution."**
>
> **Why none of it is done:** "it would be difficult to estimate all these hyperparameters from the
> available data on only 8 schools, **especially in the setting here where the data are consistent with
> zero between-school variation in effects.**"

> [!example] Assumptions 5 and 6 — Uniform prior for $\mu$ and $\tau$
> **Why defensible:** "Prior or contextual knowledge of these parameters is weak compared to the range
> of estimates from the experiment." Test-prep sellers claimed benefits of 100 points or more, "but
> these were not serious estimates, as they were based on simple before-after comparisons with **no
> adjustment for the natural gains made by students when they take a test twice** and no adjustment for
> selection."
>
> If the prior expectation is that effects are under 100 points, that gives very little information:
> $\mu$ is probably much less than 100, could be near zero **or even slightly negative** ("if the
> coaching programs are counterproductive, perhaps by distracting students from their regular school
> work"), and $\sigma$ is likely the same order of magnitude as $\mu$.
>
> **The stated reason for uniform:** "not because there was a belief that all possible values of these
> hyperparameters were equally likely, but rather because it seemed that **any relevant prior
> information would be overwhelmed by the data in this case.**"
>
> **For $\mu$ specifically:** "the data provide more information about $\mu$ than any realistic prior
> information we might have: given our uniform prior, the 95% posterior is approximately $(0, 16)$, and
> **it is hard to imagine a prior that would help much here.**"

> [!important] The one genuinely useful prior structure — a reparameterization for $\tau$
> "Given our prior ignorance about $\mu$ … it is hard to imagine that we could say much about $\tau$.
> **There is one assumption we might be willing to make, however: the larger the average effect, the
> larger we might expect the variation to be.** To put it another way, **if $\mu$ is near zero, so that
> on average the treatment gave no advantage, then it would be reasonable to suspect that the effect
> does not vary much either.**"
>
> **The implementation:** set independent priors on $\mu$ and on the ratio $\mu/\tau$ — "on the grounds
> that, before seeing the data, we might assume something about the average effect and something about
> its **relative** variation."
>
> **The effect:** such a reparameterization with weak information on $\mu/\tau$ "would in this
> particular analysis have the effect of **downweighting larger values of $\tau$** in the posterior and
> thus **partially pooling the individual school effects closer to each other**, compared to the
> uniform-$\tau$ model."
>
> This is a general and underused technique: encode dependence between a location and a scale by
> putting the prior on their ratio. Compare the $t_\nu(\mu,\sigma)$ reparameterization in
> [[Prior Distributions#Joint prior distribution of parameters]].

### Generalizing beyond the eight schools

> [!warning] What $\theta_j$ actually means
> "We wrote that $\theta_j$ is the treatment effect in school $j$. **Strictly speaking it is the average
> effect of the coaching program in school $j$, among the students who participated in the experiment
> in that school.**"
>
> To generalize to new students or schools: fit a regression predicting the effect from school
> characteristics (assumption 4 above) **and then poststratify**, projecting for cases outside the
> study. "This might not be easy: **the suburban setting of the study is not representative of the
> population of U.S. high schools**, and so any national generalization would require some assumption
> about the variation in effects going beyond the information available in the data." See
> [[Poststratification]].

**The sample sizes themselves.** 8 schools with 30-100 students each. "In the model being fit, these
sample sizes are implicitly **conditioned on** in the posterior distribution — that is, they are
[[Modeled and Unmodeled Data|unmodeled data]] — but **they can change when considering predictions for
new schools and designs of new experiments.**"

Further discussion of the coaching problem: Messick et al. (1980), DerSimonian and Laird (1983),
Powers (1993).

## Connections

- The audit template here — *state the assumption, say why it holds, name the setting where it fails,
  name the model expansion* — is the section's real contribution and applies to any model.
- Assumption 2's "known variance" shortcut recurs whenever summary statistics rather than raw data are
  modeled, as in the meta-analysis priors of [[Prior Distributions]].
- The $\mu/\tau$ reparameterization idea reappears as the funnel-avoidance strategy in
  [[Modeling Ideas to Address Computing Problems]].
- The 8 schools model's near-zero $\tau$ makes it the canonical hard-geometry test case for
  [[Failure Modes and Steps Forward]] and [[SBC Case Studies]].

## See Also
- [[Hierarchical Models]] — BDA3 Ch. 5, the original home of this example
- [[Partial Pooling as Multiple Comparisons Correction]] — the statistical rationale for the shrinkage
- [[Choosing an Initial Model]] — how the model got chosen in the first place
- [[Specifying the Data Model and the Prior]] — where this model's prior/likelihood boundary is
  re-examined
