---
title: "Posterior Predictive Checking - Stochastic Learning in Dogs"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/brms
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 21, pp. 323-340 (Figures 21.1-21.14)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Posterior Predictive Checking]]"
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Model Selection Using Predictive Performance]]"
used_by:
  - "[[Model Building with Latent Variables - Animal Movement]]"
aliases:
  - "Bush and Mosteller"
  - "Stat-dogs"
  - "Stochastic learning model"
  - "Sorting before plotting"
---

# Posterior Predictive Checking — Stochastic Learning in Dogs

> [!summary]
> Built around **Bush and Mosteller (1955)**, one of the earliest simulation-based graphical model checks
> in statistics — they simulated 30 "**stat-dogs**" and compared them by eye to 30 real dogs. The chapter's
> single most transferable lesson is about **display**: reordering both real and simulated dogs by time of
> last shock reveals a discrepancy that "**was not apparent**" in the original unsorted comparison. Six
> models are then fitted and compared; a **two-parameter mechanistic model matches a hierarchical logistic
> regression**, and the hierarchical version of the mechanistic model adds nothing — because 25 trials per
> dog is simply not enough to tell dogs apart, as simulation experiments then confirm.

## Overview

> [!definition] The experiment and the original model (Bush and Mosteller 1955; Ch. 21.1, p. 323)
> **30 dogs**, each placed in a cage where "**it would be shocked if it did not jump out in time, a few
> seconds after a light goes on.** After 25 tries, all of the dogs learned to jump and avoid the shock."
>
> $$\Pr(\text{shock}) = a^{(\#\text{ previous shocks})}\, b^{(\#\text{ previous avoidances})}$$
>
> **Why this functional form is well designed:** "**the probability of being shocked starts at 1, which is
> appropriate, as there is no reason the dogs should know at the start that the light would precede a shock,
> and indeed any dogs that jumped before the first trial were excluded.** From then on, as long as the
> parameters $a$ and $b$ are between 0 and 1, the probability of shock gradually declines over time."
>
> **The 1955 estimates:** $(\hat{a}, \hat{b}) = (0.92, 0.79)$ — "**each shock reduces the probability of shock
> in future trials by 8%, and each avoidance reduces the future probability of shock by 21%.**" Fitting this
> was "now a trivial maximum likelihood optimization problem but in 1955 requiring a bit of thought and
> explanation."
^def-bush-mosteller

> [!important] How the 1955 check differs from a full posterior predictive check
> "**How well does this model fit the data?** (We don't ask, '*Does* this model fit the data?' **because fit is
> not a yes/no question.**)"
>
> Two differences from modern PPC, each with a reason it was acceptable here:
> 1. "**They used a point estimate of the parameters, not a full posterior distribution. But this particular
>    model has only two parameters, and the experiment has enough data to estimate them accurately, so
>    simulated data from the best-fit model won't be so different from drawing from the posterior
>    predictive.**"
> 2. "**They only simulated a single random replicated dataset, but that works here because the data have
>    internal replication: one simulated dataset represents 30 independently-sampled 'stat-dogs.'**"

## Main Content

### The display lesson

> [!example] Sorting reveals what the raw comparison hides (Figure 21.3, Ch. 21.1, p. 324)
> The chapter reproduces the comparison **in ASCII**, "**just to demonstrate how this can be done using the
> technology of 1955**," with `S` for shock and `.` for avoidance — **but with the dogs ordered by time of
> their last shock.**
>
> **What the reordering reveals:**
> - in the real data, "**the dogs that are shocked several times in a row and then suddenly seem to figure out
>   what is going on**";
> - in the simulations, "**the bottom third of the stat-dogs display shows several dogs that seem to have
>   learned avoidance and then get shocked one last time near the end of the (simulated) experiment.**"
>
> > "**This discrepancy suggests possible room for improvement in the model, and it was not apparent in the
> > comparison in Figure 21.1. This example demonstrates the importance of the details of graphical display
> > when comparing a fitted model to data.**"
>
> The same sorting, in colour, drives Figure 21.4 — five posterior predictive replicates from each of four
> models, stacked against the real data. **Sorting a matrix display by a meaningful summary is a general,
> cheap technique**, and one of the few concrete display recipes the book offers.
^ex-sorting-the-display

### Six models, compared

> [!definition] The model sequence (Ch. 21.2, pp. 325-331)
> | Model | Specification | Notes |
> |---|---|---|
> | **M0 — logistic** | $\Pr(\text{shock}) = \text{logit}^{-1}(\alpha + \beta t)$, $t = 2,\dots,25$ | $t = 1$ excluded: "**the probability of shock is 1 when $t=1$** … **Modeling [it] with logistic regression would be problematic as the logistic transformation always takes us somewhere between 0 and 1**" |
> | **M0h — hierarchical logistic** | $\alpha_j, \beta_j$ per dog, bivariate normal | |
> | **M2 — two-parameter logarithmic** | $\Pr(\text{shock}) = a^{x_{1jt}} b^{x_{2jt}}$, $a,b \sim \text{uniform}(0,1)$ | the Bush-Mosteller model |
> | **M4 — hierarchical logarithmic** | $(\text{logit}(a)_j, \text{logit}(b)_j) \sim \text{MVN}$ | |
>
> **Fitted values:** M0 gives $\hat\alpha = 2.18 \pm 0.23$, $\hat\beta = -0.28 \pm 0.02$; M2 gives
> $\hat{a} = 0.92 \pm 0.01$, $\hat{b} = 0.79 \pm 0.02$ — "**dogs appear to learn more from an avoidance than
> a shock.**"
>
> **The mechanism this encodes:** "**If dogs learn more from avoidances, this creates a positive feedback
> whereby success is followed by further success, so that a dog that gets on the right track can learn
> quickly, whereas a dog that is repeatedly shocked will be slower to figure out what to do.**"

> [!important] Assessing the priors by projecting them, before fitting
> For M0's default `brms` priors — $t_3(0, 2.5)$ on the intercept, $\text{normal}(0,1)$ added on the slope:
> - **The intercept prior** "implies that $\alpha$ will roughly be in the range $(-2.5, 2.5)$, which becomes
>   $(0.08, 0.92)$ on the probability scale. **From the design of the study, we know that $\Pr(\text{shock})$
>   will be close to 1 for early trials, so this prior will have the effect of pulling these estimated
>   probabilities toward 0.5, although the $t_3$ has a long enough tail that this shrinkage will be weak.**"
> - **The slope prior** "implies that $\beta$ will roughly be between $-1$ and 1, **which in the context of
>   this problem is a very wide range. As $t$ goes from 2 to 25, the logit probability of shock increases by
>   $23\beta$, and 23 is huge on that scale: $\text{logit}^{-1}(23) = 1 - 10^{-10}$. So this prior is
>   essentially equivalent to including no prior information at all.**"
>
> Exactly the projection technique of [[Bioassay - A First Probabilistic Program]].

> [!warning] Simulating a time-series model requires sequential replication
> For M2 the posterior predictive draws cannot be generated in one vectorized step:
> ```stan
> generated quantities {
>   array[J,T] int<lower=0, upper=1> y_rep;
>   for (j in 1:J) {
>     prev_shock_rep = 0; prev_avoid_rep = 0;
>     y_rep[j,1] = 1;
>     for (t in 2:T) {
>       prev_shock_rep += y_rep[j, t-1];
>       prev_avoid_rep += 1 - y_rep[j, t-1];
>       p_rep = a^prev_shock_rep * b^prev_avoid_rep;
>       y_rep[j,t] = bernoulli_rng(p_rep);
>     }
>   }
> }
> ```
> "**For this model, we need to do the posterior predictive simulation sequentially as the number of previous
> shocks and avoidances need to be simulated before using them to predict the next time probability.**
>
> **In either case, the challenge is that the counts of previous shocks and avoidances appear as unmodeled
> predictors $x$ in model (21.1) but need to be given probability models in the replications.**"
>
> This is [[Modeled and Unmodeled Data]] in action: **a variable that is data when fitting must become
> modeled when replicating**, or the check is meaningless. The R version requires the same care, calling
> `posterior_predict()` inside a loop with sequentially updated data.
^wrn-sequential-ppc

> [!example] The LOO comparisons, and the surprise (Ch. 21.2)
> ```
>          elpd_diff se_diff        elpd_diff se_diff        elpd_diff se_diff
> bfit_0h        0.0     0.0   bfit_0h   0.0     0.0   bfit_0h   0.0     0.0
> bfit_0       -12.2     5.7   bfit_2   -4.4     4.3   bfit_4   -3.5     3.1
> ```
> - **Hierarchy helps the logistic model** (−12.2 ± 5.7): "**There is evidence in the data that some dogs
>   learn faster than others.**"
> - **The mechanistic two-parameter model matches it** (−4.4 ± 4.3): "similar predictive performance."
> - **But hierarchy does *not* help the mechanistic model** (−3.5 ± 3.1):
>
> > "**Varying coefficients in the logistic regression did help as the behavior in time was different for
> > different dogs, but in the log model, inclusion of previous shocks and avoidances for each dog already
> > contains information on the behavior of different dogs, and additional variation does not seem to be
> > necessary to fit the data.**"
>
> A clean example of **two different model structures capturing the same feature of the data** — heterogeneous
> learning rates — by different means. The mechanistic model gets it for free from the positive-feedback
> structure.

### Five further checks, none of which separates the models

> [!example] The checking battery (Ch. 21.3, pp. 331-333)
> | Check | Figure | Result |
> |---|---|---|
> | **Test statistic: mean number of switches** between shocks and avoidances — chosen "as it will reveal if there is more structure in time than what the models do" | 21.5 | no clear separation |
> | **Per-dog posterior predictive distributions** (first 9 dogs) | 21.6 | "**biggest difference at time $t=2$**, and the 2-parameter logarithmic model has a bigger drop after the first avoidance, **but the differences are so small that they have little effect on average predictive performance**" |
> | **PAV-adjusted calibration plots** on LOO predicted probabilities | 21.7 | "**No difference appears in the calibration performance**" |
> | **PAV-adjusted residuals vs. time** — "more data efficient than simple binned residuals" and without "the need to select the bin size" | 21.8 | "no big difference … although Model 4 seems to have smaller residuals" |
> | **Power-scaling prior sensitivity** | 21.9 | "**For all parameters the prior sensitivity is small (less than 0.05) and less than the likelihood sensitivity**" |
> | **Leave-future-out CV** — used because "**the data have a sequential structure, we may suspect that leave-one-out cross validation is not sensitive enough**" | — | $-2.2 \pm 3.4$: "**no practical difference**" |
>
> The chapter is unusually honest that **a full checking battery can come back empty**. The models genuinely
> are close, and no amount of diagnostics manufactures a distinction.

### Summarizing a hierarchical fit: draws, not point estimates

> [!important] Figures 21.10 and 21.11 side by side (Ch. 21.4, pp. 333-334)
> **Figure 21.10** shows **10 random posterior draws**, each a scatterplot of $(a_j, b_j)$ across the 30 dogs.
> "**The 10 graphs look much different from each other, which implies that there is a lot of posterior
> uncertainty in the hyperparameters. The data are consistent with there being very little variation among
> dogs, or with dogs varying only in the effect of shocks or only in the effect of avoidances, or with dogs
> varying in both parameters. There is only so much we can learn from just 30 dogs with only 25 trials.**"
>
> The diagonal $a_j = b_j$ is drawn on each panel; "**for most of the dogs, $b_j$ is clearly less than $a_j$,
> implying that dogs typically learn more from avoidances than shocks**" — the one conclusion that survives
> across draws.
>
> **Figure 21.11** shows the **posterior medians** as a single scatterplot.
>
> > "**There is nothing wrong with this plot, but looking at it alone could give an inappropriate feeling of
> > certainty which is dispelled by Figure 21.10.**"
> >
> > "**We recommend when displaying such posterior summaries to examine many posterior simulations rather than
> > to simply look at point estimates.**"
>
> The clearest illustration in the book of "avoid premature collapsing of the wave function" —
> [[Point Estimates and Uncertainties]] — applied to a *display* rather than to a number.
^imp-draws-not-medians

### Simulated-data experiments: how much data would be enough?

> [!example] Experiment 1 — fit M4 to data simulated from M0h (Figure 21.12, Ch. 21.5, p. 335)
> "**One assumption about the 2-parameter logarithmic model is that if the parameters $a$ and $b$ are
> different, then the dogs learn a different amount from shocks and avoidances. We can test what happens if we
> simulate data from the logistic regression model which has only one parameter … and then fit the
> two-parameter logarithmic model.**"
>
> **Result:** the population distributions of $a$ and $b$ look the same whether fit to the real data or to
> logistic-simulated data. "**There is no practical difference in these, which is probably due to time
> correlating highly with previous shocks and with previous avoidances.**"
>
> **A genuinely important negative result:** the apparent finding that $b < a$ — that dogs learn more from
> avoidances — **is not evidence for that mechanism**, because data with no such mechanism produce the same
> estimates. This is [[Generative and Partially Generative Models#All models are only partially generative]]
> demonstrated experimentally.

> [!example] Experiment 2 — recovery from the model's own simulations (Figures 21.13-21.14)
> **The procedure**, chosen over drawing from the prior because "**in this situation with a weak prior there is
> a concern that the resulting parameter values will be unrealistic**":
> 1. Choose hyperparameters that seem reasonable;
> 2. Simulate $a_j, b_j$ for each dog;
> 3. Simulate data;
> 4. Fit;
> 5. Compare inferences to both the simulated parameters and the assumed hyperparameters.
>
> **Values used:** $\mu_{\text{logit}(ab)} = (2.4, 1.3)$, $\sigma = (0.32, 0.40)$, from the posterior medians —
> but with the **correlation deliberately set to 0 rather than the estimated $-0.1$**: "**it does not seem
> reasonable to suppose that dogs who learn more from shocks would learn less from avoidances, and we want our
> simulation experiment to be plausible.**"
>
> **25 trials (Figure 21.13c):** "**the estimates are close to the true values, and approximately 50% of the
> intervals contain the true values.**" But the intervals are wide — the dogs cannot be told apart.
>
> **50 trials (Figure 21.14):** "**again, you cannot tell the dogs apart** … **A glance at Figure 21.14a
> reveals why: essentially no information is provided by the second half of this experiment, as trials 26-50
> are just about all avoidances. So we are left with an inherent limitation as to how much can be learned
> about each dog, no matter how long the experiment goes.**"
>
> **A design insight no amount of modeling could substitute for**: once the dogs have learned, further trials
> carry no information.
>
> **300 dogs, 25 trials each:**
> ```
>  variable            mean median   sd     q5    q95
>  mu_logit_ab[1]      2.40   2.40 0.06   2.31   2.50
>  mu_logit_ab[2]      1.28   1.28 0.05   1.20   1.36
>  sigma_logit_ab[1]   0.30   0.31 0.10   0.10   0.45
>  sigma_logit_ab[2]   0.40   0.40 0.08   0.28   0.53
>  Omega_logit_ab[1,2] -0.02 -0.04 0.26  -0.39   0.45
> ```
> "**With 300 dogs, the population mean and standard deviation parameters are estimated with high precision.
> Meanwhile, the individual dog parameters are not estimated so precisely, which makes sense given that we
> only have 25 trials per dog.**
>
> **Perhaps more surprisingly, the population correlation has a large amount of posterior uncertainty, with a
> 90% interval of $(-0.39, 0.45)$: even 300 dogs are not enough to identify this hyperparameter precisely.**"
>
> The same lesson as the intercept-slope correlation in
> [[Prior Specification for Regression Models - Sleep Study]]: **correlations between varying effects are the
> last thing a hierarchical model learns.**
^ex-how-much-data

## Examples

> [!example] General lessons (Ch. 21.6, p. 338)
> **On the two model structures:** "**a simple two-parameter logarithmic model constructed based on first
> principles performed as well as a hierarchical logistic regression** … **This indicates how a pattern in the
> data can be modeled in different ways. In this case, some dogs learn faster than others. In the hierarchical
> logistic regression, this is modeled by learning rates varying by dog. In the logarithmic regression, it is
> modeled by allowing dogs to learn faster from avoidances than from shocks, which creates a rich-get-richer
> positive feedback mechanism.**"
>
> **On the coding cost of the hierarchical version:** "**The parameters $(a_j, b_j)$ are defined on the range
> $(0,1)$ so it was convenient to work on the logistic scale** … **To write this model in brms, we used an
> explicit logit transformation. This makes the program a bit more awkward to read, which for now is just the
> price we must pay for reliable computing. On the plus side, the same code would work for higher dimensions.**"
>
> **On whether the effort was worthwhile:** "**In this case, the two-parameter model was probably sufficient in
> practice — indeed, this was the model fit by Bush and Mosteller (1955) — but we are glad that we could fit
> the hierarchical model too, as this skill will be valuable for problems with more data per group.**"

> [!example] Exercises 21.1-21.3 (Ch. 21.7, pp. 338-339)
> - **21.1** Impute 25 more trials per dog from the fitted model, refit, compare uncertainties. The exercise
>   states the tension explicitly: "**On one hand, this will be twice the sample size; on the other hand,
>   according to the model future observations will almost all be avoidances, so they won't convey much new
>   information.**"
> - **21.2** The same, but simulating 30 additional **dogs** rather than additional trials.
> - **21.3** "**Instead consider a first-order Markov model in which, for each dog, the probability of a shock
>   depends only on what happened in the previous trial, but these probabilities can vary by dog.**"
>
> 21.1 and 21.2 together are a **design analysis**: which axis of the experiment to extend.

## Connections

- The sorted display (Figure 21.3) is the concrete answer to
  [[Posterior Predictive Checking#Choosing test summaries]]'s admission that "it is often necessary to come up
  with a unique visualization tailored to the specific problem."
- The sequential `generated quantities` block is the clearest illustration of why
  [[A Data Model Is Not Just a Likelihood]] insists the data model, not just the likelihood, is needed for
  replication.
- Experiment 1 — fitting M4 to M0h-simulated data — is a **model-discrimination** check rather than a
  parameter-recovery check, a use of simulation not covered in
  [[Designing Simulated-Data Experiments]] but closely related to
  [[Simulating an Underlying Process, Data Collection, and Inference]].

## See Also
- [[Posterior Predictive Checking]] — the checking machinery exercised here
- [[Designing Simulated-Data Experiments]] — the parameter-recovery experiments of §21.5
- [[Point Estimates and Uncertainties]] — draws vs. medians in a hierarchical display
- [[Model Selection Using Predictive Performance]] — the elpd comparisons and leave-future-out CV
