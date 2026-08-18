---
title: "Simulated-Data Experimentation as Virtual Replication"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 10.5-10.6, pp. 183-190 (Figures 10.3-10.6)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Designing Simulated-Data Experiments]]"
  - "[[The Replication Crisis and Multiple Levels of Variation]]"
  - "[[There Is No Safe Haven]]"
used_by:
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Hot hand"
  - "Gilovich Vallone Tversky"
  - "Miller and Sanjurjo"
  - "Virtual replication"
  - "Preregistration"
  - "Design analysis"
---

# Simulated-Data Experimentation as Virtual Replication

> [!summary]
> **"Redoing an experiment, or even an observational study, can be expensive. Replicating on the computer is
> nearly free."** Two famous claims are dismantled with a dozen lines of R. The **hot hand**: simulating pure
> coin flips reproduces the "no hot hand" finding — the naive estimator has an expected value of **46% after
> three hits vs. 54% after three misses** under *independence*, an 8-point bias, "enough to separate mediocre
> from elite shooters." Tuned so the true probability cycles between **38.5% and 61.5%**, the naive estimator
> has expectation **exactly zero**. The section ends with the authors' unusually specific account of **why
> they like preregistration** — and it has nothing to do with $p$-values.

## Overview

> [!important] The proposition (Ch. 10.5, p. 183)
> "**Before any cathedral of scientific workflow is built, we can still employ existing tools and workflows
> toward the same ends. We can get a lot out of our general workflow of simulated-data experimentation,
> beyond any specific issues of Bayesian model building, fitting, and checking.**
>
> **The usual way to evaluate questionable claims is by replication. But redoing an experiment, or even an
> observational study, can be expensive. Replicating on the computer is nearly free.**"

## Main Content

### The hot hand in basketball

> [!example] The original finding and its 33-year reversal (Ch. 10.5, p. 183)
> **Gilovich, Vallone, and Tversky (1985)** analyzed professional basketball and "**found no evidence of
> statistical dependence in successive shots: the success rate of making a shot after having just made 1, 2,
> or 3 shots was about the same as the success rate after having just missed that number of shots.**"
>
> **They anticipated the obvious objection.** "To address the concern that this pattern could have arisen
> from **shot selection** (perhaps after you make a shot, the defense will cover you more closely so that
> your next shot becomes more difficult, and this could induce a negative correlation), **the researchers
> also performed a similar test on college basketball players in a practice setting where the difficulty of
> shots did not vary, and they again found no evidence of correlation.**"
>
> "**This finding was backed up by replications** (Avugos et al. 2013) **and for many years was taken as
> evidence that the hot hand in basketball was a myth sustained by humans' ability to see patterns even in
> random noise, a 'massive and widespread cognitive illusion'**" (Kahneman 2011).
>
> **The reversal** (Miller and Sanjurjo 2018, 2024): "**Because of the way the data were collected and
> analyzed, there would be a negative correlation between the outcomes of successive shots — even if they
> were as random as independent coin flips — and an observed zero correlation actually represented evidence
> of a hot hand.**"

> [!example] Demonstrating the bias by simulation (Ch. 10.5, pp. 183-184)
> The setup matches the original study: **26 players, 100 shots each**, comparing the success rate after
> three straight hits to the rate after three straight misses.
>
> ```r
> expt <- function(n_players=26, n_shots=100, p=0.5) {
>   p_after_hits <- rep(NA, n_players)
>   p_after_misses <- rep(NA, n_players)
>   for (j in 1:n_players) {
>     shots <- rbinom(n_shots, 1, p)
>     shots_before <- shots[1:(n_shots-3)] + shots[2:(n_shots-2)] + shots[3:(n_shots-1)]
>     shots_after <- shots[4:n_shots]
>     p_after_hits[j] <- mean(shots_after[shots_before==3])
>     p_after_misses[j] <- mean(shots_after[shots_before==0])
>   }
>   ok <- !is.na(p_after_hits + p_after_misses)
>   c(mean(p_after_hits[ok]), mean(p_after_misses[ok]))
> }
> ```
> Note the `ok` line: it **excludes players who had no run of three hits or three misses**, exactly as the
> original analysis had to.
>
> ```r
> n_reps <- 1000
> result <- array(NA, c(n_reps, 2))
> for (k in 1:n_reps){
>   result[k,] <- expt()
> }
> print(colMeans(result))
> ```
>
> **Result under pure coin flips ($p = 0.5$, independent):**
> $$
> \textbf{46\% after three hits}, \qquad \textbf{54\% after three misses}
> $$
>
> "**a surprising result given that, by construction, the shots were independent with a constant 50% success
> probability. A difference of 8 percentage points in the probability of making a shot is huge in basketball,
> enough to separate mediocre from elite shooters.**"

> [!example] Calibrating a true hot hand until the estimator reads zero
> **A sine-curve hot hand.** "We suppose the underlying probability of success for any player follows a sine
> curve, starting at 50%, rising to 70%, then declining down to 50% and then to 30%, finally returning to
> 50%":
> $$
> \Pr(y_t = 1) = 0.5 + 0.2\sin(2\pi t/100), \quad t = 1,\dots,100
> $$
> ```r
> result[k,] <- expt(p = 0.5 + 0.2*sin((1:100)*2*pi/100))
> ```
> **Result: 57% after three hits, 43% after three misses.** "**So such a huge hot-hand effect would overwhelm
> the estimation bias.**"
>
> **Halve the amplitude** — probability cycling between 40% and 60%:
> ```r
> result[k,] <- expt(p = 0.5 + 0.1*sin((1:100)*2*pi/100))
> ```
> **Result: 49% vs. 51%.** "**Interesting! If there truly is a hot hand, where a player's success probability
> is near 60% when he is hot and near 40% when he is cold, this will manifest itself as equal average
> probabilities of success following three straight hits or three straight misses.**"
>
> **Tune it exactly** — amplitude 0.115, cycling between **38.5% and 61.5%**:
> ```r
> result[k,] <- expt(p = 0.5 + 0.115*sin((1:100)*2*pi/100))
> ```
> gives "essentially equal" rates under the two conditions.
>
> > **"These simulations offer convincing evidence that the estimate used by Gilovich, Vallone, and Tversky
> > (1985) was biased; indeed, their estimate would have an expected value of zero even in the presence of a
> > large hot-hand effect."**
^ex-hot-hand-bias

> [!important] Variance, not just bias (Figure 10.3)
> "**Even in the absence of any concern about bias, it would make sense to set up a simulation study to get
> a sense of the uncertainty of any estimates.**"
> ```r
> naive_est <- result[,1] - result[,2]
> hist(naive_est)
> ```
>
> "**Under either model, the sampling variation of the estimate is high, which implies that there is a limit
> to how much can be learned from gathering only 100 shots from only 26 players.**
>
> **This might at first seem surprising — 2600 shots seems like lots of data, no? — but this is not such a
> large sample size for the task of estimating the difference between probabilities, especially given that
> only about 1/8 of the shots follow three successive hits or misses. The real sample size for this
> comparison is more like $2600/8 = 325$.**"
>
> The $1/8$ is $\Pr(\text{HHH}) + \Pr(\text{MMM}) = 2 \times (1/2)^3$ under the null. **A back-of-envelope
> effective sample size that the original design never computed.**

> [!example] Conditioning on one shot instead of three — better bias, worse discrimination (Figure 10.4)
> The obvious fix is to use all 2600 data points by conditioning on just the previous shot:
> ```r
> shots_before <- shots[1:(n_shots-1)]
> shots_after  <- shots[2:n_shots]
> p_after_hits[j] <- mean(shots_after[shots_before==1])
> ```
> "**The good news is that the bias of the estimate is much less; the bad news is that the comparison has
> difficulty detecting anything at all.** … **The distribution of possible values of the estimate under the
> model where there is a hot hand is almost the same as that for pure randomness, enough so that there just
> is not enough information to estimate the magnitude of the hot hand effect from these data, let alone to
> rule it out.**"
>
> **Why the signal is so small — a hand calculation worth reproducing.** Imagine two states: "hot" with 60%
> success, "cold" with 40%, half the time in each (so 50% overall).
> $$
> \Pr(\text{two successive hits}) = 0.5 \cdot 0.6^2 + 0.5 \cdot 0.4^2 = 0.26
> $$
> $$
> \Pr(\text{hit} \mid \text{previous hit}) = 0.26/0.5 = \mathbf{0.52}
> $$
> and symmetrically $\Pr(\text{hit} \mid \text{previous miss}) = 0.48$ — **"a difference of only 0.04. This
> declines to something less than 0.02 once we allow the transition between hot and cold status to be more
> gradual, as with our sine-curve model.**"
>
> **A genuinely large latent effect (40% to 60%) produces a 2-point observable difference.** That is the
> whole reason the original design could not have worked.

> [!example] Re-reading the original data (Ch. 10.5, p. 186)
> Gilovich, Vallone, and Tversky's own data show average success rates following **three misses, one miss,
> one hit, and three hits** of:
> $$
> 44.9\%, \quad 46.7\%, \quad 48.7\%, \quad 48.7\%
> $$
> "So the average success rate is **4 percentage points higher after three hits than after three misses**,
> and **2 percentage points higher after one hit than one miss.**
>
> **As can be seen in Figures 10.3 and 10.4, these results are actually much more consistent with the hot
> hand than with the coin-flip model.**"
>
> **The stated scope of the claim:** "**Our point here is not that the simple sine-curve model is correct, or
> that coin flips are the appropriate comparison, but rather that by doing a simulation study we can easily
> see two big problems with the naive estimates — their bias and their variability — which had not been
> noticed by the researchers at the time.**"
>
> **Extensions the authors list but do not run:** replacing coin flips with per-player constant
> probabilities; letting the sine-curve parameters vary by player; and for live games, "**allowing variation
> in defense and shot selection after hot or cold shooting patterns.**"

### Beauty and sex ratio

> [!example] Twenty simulated replications under the null (Figures 10.5-10.6, Ch. 10.5, p. 187)
> **The claim** (Kanazawa 2007; see Gelman and Weakliem 2009): more attractive parents were more likely to
> have girls. "**The linear regression slope does not reach conventional levels of statistical significance,
> but the comparison of the percentage of girl births for parents in the highest attractiveness category,
> compared to the average of all the others, did reach a $p$-value of less than 0.05. The result was reported
> uncritically in the news media and motivated some theorizing as to its causes.**"
>
> The Bayesian reanalysis was already given in [[There Is No Safe Haven]] (Figure 1.1): "**the data in this
> study provided essentially no evidence relative to existing prior information about sex ratios.**"
>
> **The different move made here.** "**Rather than reanalyzing the data … we would like to understand its
> statistical properties by simulating hypothetical replications.**"
>
> **The design being simulated:** 2792 participants with at least one biological child (Wave III of the
> National Longitudinal Study of Adolescent to Adult Health), with attractiveness category proportions from
> the full 4877-respondent sample: **2% "very unattractive," 5% "unattractive," 45% "about average," 37%
> "attractive," 11% "very attractive."**
>
> **The null model:** probability of a girl birth = **0.488**, independent of attractiveness. Simulate 2792
> births; fit the regression; repeat 20 times and plot.
>
> **The result (Figure 10.6):** "**We see patterns just as dramatic as that of the observed data**" —
> "**these can be taken as a sort of visual hypothesis test**" (Buja et al. 2009) — "**but here our point is
> slightly different; it is that the author of the original study could have performed these simulated
> replications at any time before or after analyzing their data to get a sense of how noisy such a study
> would be, even under ideal conditions.**"

### Simulation, preregistration, and design analysis

> [!important] Why people don't do this (Ch. 10.5, p. 188)
> "**One reason that researchers don't always do simulations is that they take effort. A simulation experiment
> requires a fully generative model — a rule for defining the truth and simulating data from some specified
> random process — followed by analysis of the simulated data, all nested within a loop and ending with
> comparison of inferences to truth.**
>
> **This involves additional work compared to that required to conduct an experiment, first because it
> requires an automatic procedure for data analysis and second because it requires a generative model.**
>
> **As discussed throughout this book, we have found that this additional effort involved in constructing a
> generative model and automating the data-analysis process is itself helpful for thinking through the
> experimental process. Indeed, it has similarities to the steps of preregistration.**"

> [!important] Two reasons the authors like preregistration — neither is about $p$-values
> "**We like preregistration. It's not something we used to do, and we still don't always do it. We have
> worked on thousands of research projects, and only a few of them had any preregistration at all. That said,
> we think preregistration has value, and we are doing it more and more. The reason we like preregistration
> has nothing at all to do with hypothesis tests or $p$-values or $p$-hacking or questionable research
> practices or anything like that.**
>
> **Reason 1 — it forces a generative model.** "**For our workflows, preregistration implies constructing a
> hypothetical world — sometimes this is a 'null hypothesis' of no effect, but it can also be a possible world
> corresponding to what we are actually aiming to study — and then simulating fake data and proposing and
> trying out analysis methods on those simulated data. We find this sort of commitment — the effort of laying
> out a complete generative model for the process — to be helpful.**" This includes "**seeing if the proposed
> analysis can recover parameters of interest from the simulated data, which is what's often called 'power
> analysis' although we prefer the more general term 'design analysis.'**"
>
> **Reason 2 — it makes discrepancies visible.** "**When other people preregister, that can be useful because
> then we can see discrepancies between the original plan and what actually got reported.** For two examples,
> see Gelman (2018b, 2024b) — **in both those cases, discrepancies between the preregistration and the final
> paper gave us doubts about the published claims. When these changes happen, it is not a moral failure on
> anyone's part — we can learn from data! — it's just relevant for understanding the theories being
> promulgated in these papers.**"
^imp-preregistration

> [!warning] The limits of preregistration
> "**Preregistration is not necessary for good science, but it can be a useful tool** … **Preregistration has
> a valuable indirect function of making it more difficult to do bad science. It does not directly turn bad
> science into good science. That doesn't make preregistration a bad idea; we should just be aware that this
> sort of procedural step can only be one small part of the story. Ultimately, science is about the substance
> of science, not just about the scientific method.**"
>
> **And the link between the two views:** "**If you do things right, your preregistration will involve the
> substance of what you're studying and will not merely be a procedural step, a form of paperwork that exists
> to validate the $p$-values or your posterior inferences that your study will produce. Rather, doing this
> preregistration will require simulating fake data, which in turn will require hypothesizing a full model of
> the underlying process.**"
>
> Compare the more combative claim in
> [[Model Selection and Overfitting#The severe-tests claim]]: a heavily tested data-dependent model may beat
> an untested preregistered one. The two positions are consistent — preregistration is valued here **for the
> modeling it forces, not for the commitment it enforces.**

> [!important] Before or after — it does not matter
> "**It is not at all necessary to do such experimentation ahead of time. It also makes sense to check and
> understand a procedure using simulated data after the real data have been collected and analyzed.**"
>
> This is the practical liberation of the whole section: **you can still run the hot-hand simulation today,
> for your own analysis, whatever stage it is at.**

## Examples

> [!example] Exercise 10.3 — extend the hot hand simulation (Ch. 10.6, p. 190)
> (a) Run the coin-flip simulations for **different values of `n_shots`** and make two plots: expected
> proportion of successes after 1, 2, or 3 hits/misses vs. number of shots; and the **difference** in
> expected proportions after $k$ hits or misses vs. `n_shots` — "**these represent the bias of the naive
> hot-hand estimate.**"
> (b) Add a visualization of the **standard error** of the estimate to the second plot.
> (c) Repeat for the true-hot-hand model (38.5%-61.5%).
> (d) "**Repeat the above steps, altering the conditions of the simulation, and plot the results as a
> function of the parameters that you are altering.**"

## Connections

- This section is [[Designing Simulated-Data Experiments]] applied not to your own model but to **someone
  else's published estimator** — which is why it functions as replication.
- The hot hand is the fully worked instance of the "scientifically degenerate" estimator catalogued in
  [[Statistical and Scientific Inference]]: an estimator justified by intuition, never simulated.
- The variance findings (effective $n$ of 325; a 20-point latent effect showing as 2 points) are
  **design analysis** — the same computation that
  [[The Replication Crisis and Multiple Levels of Variation]] argues is routinely skipped.

## See Also
- [[Designing Simulated-Data Experiments]] — the general method
- [[Statistical and Scientific Inference]] — degenerate estimators and the tangle
- [[There Is No Safe Haven]] — the Bayesian reanalysis of the sex-ratio study
- [[Simulation-Based Calibration - Overview]] — the formalized version of "simulate and check recovery"
- [[The Replication Crisis and Multiple Levels of Variation]] — the position this section engages with
