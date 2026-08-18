---
title: "Visualizing High-Dimensional Inference"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 8 intro and 8.1, pp. 137-142 (Figures 8.1-8.4)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Point Estimates and Uncertainties]]"
  - "[[Simulation to Express Uncertainty]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Posterior Predictive Checking]]"
  - "[[Comparing Models Visually]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Graphical model exploration"
  - "Fivethirtyeight tail behavior"
  - "Checking a forecast distribution"
---

# Visualizing High-Dimensional Inference

> [!summary]
> Convergence is not evidence that a model is fit for purpose. This section opens Part 2's evaluation
> chapter with a three-step checklist, then argues that **tables and marginal posterior plots
> systematically hide the interplay of uncertainty and variation** in hierarchical models. Its
> centerpiece is a forensic examination of the **Fivethirtyeight 2020 election forecast**, in which
> examining *conditional* probabilities in the tails — "if Biden loses New Jersey, his chance of winning
> Alaska goes **up** from 20% to 42%" — exposes a structural flaw invisible in any marginal summary or
> correlation matrix.

## Overview

> [!important] The opening warning (Ch. 8 intro, p. 137)
> "Conceiving, programming, debugging, and running a model through convergence can take so much effort
> that **it can be tempting to stop there and declare success. But convergence is not evidence that the
> model is fit for any particular purpose.**"
>
> "**Unfortunately, the workflow for evaluating a fit model is usually more convoluted than fitting it.
> There are many different things that can be checked, and each of these checks can lead in different
> directions.**"

> [!definition] Three steps that are almost always necessary (Ch. 8 intro, p. 137)
> 1. **Check parameter estimates to see that they make sense** — "this represents fit to **implicit prior
>    information**."
> 2. **Prior, posterior, and cross validation predictive checking** — simulate replicated data and compare
>    to observed data. "This is to check **fit to data**."
> 3. **Consider how the model will be used.** "For example, you might be interested not just in particular
>    named parameters such as $\alpha$ or $\beta_3$ but in **derived quantities such as a ratio of
>    parameters or a poststratified average.**"
>
> Related computational tools: **cross validation, prior sensitivity, and likelihood sensitivity.**
> "These are all broadly useful across a wide range of model types and decision contexts."
^def-three-evaluation-steps

> [!warning] What conventional displays fail to show (Ch. 8.1, p. 137)
> "The usual ways of displaying Bayesian inference **do not fully capture the multiple levels of variation
> and uncertainty** in our inferences.
> - **A table or even a graph of parameter estimates, uncertainties, and standard errors is only showing
>   one-dimensional margins;**
> - **graphs of marginal posterior distributions are unwieldy for models with many parameters and also
>   fail to capture the interplay between uncertainty and variation in a hierarchical model.**"
>
> The starting point is ordinary good practice: "**graph data and fitted models, both for the
> 'exploratory data analysis' purpose of uncovering unexpected patterns in the data and also more
> directly to understand how the model relates to the data used to fit it.**"

## Main Content

### Graphs to understand complex inferences

> [!example] The white gender gap in the 2016 election (Ghitza and Gelman 2020; Figures 8.1-8.2)
> **Figure 8.1a — a map.** The estimated gender gap in support for the two candidates among white
> voters, by county. Circle area ∝ number of voters; shading runs from light (gap near the national
> average) to dark (more extreme). In the published paper the direction is colour-coded: dark purple =
> no difference between white men and white women, light gray = **white women supporting Clinton 7.5
> points more**, dark green = a gap of **15 points**.
>
> **The pattern the map reveals:** "a white gender gap that is **low in much of the south and high in the
> west and much of the northeast and midwest**."
>
> **Figure 8.1b — a scatterplot, motivated by the map.** Gender gap vs. Obama's 2012 county-level vote
> share among white voters. It "reveals that **the white gender gap tends to be highest in counties where
> the white vote is close to evenly split.**"
>
> **Figure 8.2 — model comparison as a graph.** County-level support for Clinton as estimated from two
> different models, plotted against each other.
>
> > **"This example demonstrates a general workflow in exploratory graphics, in which the results from
> > inferential summary motivates future exploration."**
>
> The sequence — map → scatterplot → model comparison — is the point: **each display raises the question
> the next one answers.**

**Tooling.** Gabry, Simpson, et al. (2019) present the book's ideas on graphics for Bayesian workflow;
much is implemented in **`bayesplot`** (Gabry and Mahr 2024; also Kay 2023, 2024; Kumar et al. 2019;
Martin et al. 2026).

> [!important] The unrealized promise of probabilistic programming
> "**Probabilistic programming ultimately has the potential to allow random variables to be manipulated
> like any other data objects, with uncertainty implicit in all the plots and calculations** (Kerman and
> Gelman 2004, 2007), **but much more work needs to be done to turn this possibility into reality**,
> going beyond point and interval estimation so that we can make full use of the models we fit."

### Case study: auditing the Fivethirtyeight 2020 forecast

> [!important] Why this counts as Bayesian workflow
> The Fivethirtyeight forecast produced daily win probabilities plus simulations of the vector of vote
> margins in the 50 states (plus D.C. and the Maine/Nebraska congressional districts). "**Although these
> simulations did not come from a Bayesian analysis, we can think of them as representing a posterior or
> forecast distribution. That is, we can use methods of Bayesian workflow to check the implicit model
> corresponding to this probabilistic forecast**" (Gelman 2020b).
>
> Workflow checking applies to **any** set of predictive simulations, regardless of how they were
> produced.

> [!example] The four anomalies noticed by eye (Ch. 8.1, p. 139)
> From the maps and visualizations in the month before the election:
> 1. Biden given a **3% chance of winning Alabama** ("which seemed high");
> 2. **Trump winning California** displayed as within "the range of scenarios our model thinks is
>    possible" ("which didn't seem right");
> 3. the possibility that **Biden could win every state except New Jersey**;
> 4. in the scenarios where **Trump won California, he had only a 60% chance of winning overall** ("which
>    seems way too low").
>
> **The conjecture:** these came "from the Fivethirtyeight team **adding independent wide-tailed errors
> to the state-level forecasts**" — consistent with their statement, "*We think it's appropriate to make
> fairly conservative choices especially when it comes to the tails of your distributions.*"
> - **Wide tails** allow the weird predictions (Trump winning California).
> - **Independence** of the extra error terms yields the strange conditionals: "**If Trump were to win
>   New Jersey or, even more so, California, this would most likely happen only as part of a national
>   landslide. But with independent errors, Trump winning New Jersey or California would just be one of
>   those things, a fluke that provides very little information about a national swing.**"

> [!warning] Why the correlation matrix hides it
> "**You can really only see this behavior in the tails of the forecasts if you go looking there.** For
> example, **if you compute the correlation matrix of the state predictors, this is mostly estimated from
> the mass of the distribution, as the extreme tails only contribute a small amount of the
> probability.**"
>
> This is the section's key methodological point: **summary statistics of a predictive distribution are
> computed from where the mass is, so pathologies in the tails survive every summary you would normally
> compute.** Only conditioning on a tail event exposes them.
^wrn-tails-invisible

**The investigation, using the 40,000 simulations published on the Fivethirtyeight website.**

**Step 1 — marginal win probabilities look fine.**
```r
> round(apply(biden_wins, 2, mean), 2)
 AK   AL   AR   AZ   CA   CO   ...
0.20 0.02 0.02 0.68 1.00 0.96  ...
```
"That looked about right. Not perfect — **we would not have assessed Biden's chance of winning Alabama
as high as 2%** — but this is what Fivethirtyeight is giving us."

**Step 2 — condition on a tail event.**
```r
> condition <- biden_loses[,"NJ"]
> round(apply(biden_wins[condition,], 2, mean), 2)
 AK   AL   AR   AZ   CA   ...
0.42 0.13 0.11 0.23 0.95  ...
```

> [!example] Three anomalies, quantified (Figures 8.3-8.4)
> **(a) Alaska given New Jersey.** "If Biden does unexpectedly poorly in New Jersey and loses the state,
> **his chance of winning Alaska goes up from 20% to 42%.** How could that be?"
>
> Figure 8.3a: "**The correlation over the entire posterior distribution is zero, but there is a negative
> correlation in the tails**, so that the model predicts that a big swing toward Trump in New Jersey would
> predict him doing worse in Alaska."
>
> **(b) Pennsylvania given New Jersey.**
> ```r
> > round(mean(biden_wins[,"PA"] [biden_loses[,"NJ"]]), 2)
> [1] 0.61
> > round(mean(biden_wins[,"PA"] [biden_wins[,"NJ"]]), 2)
> [1] 0.87
> ```
> "In the (highly unlikely) event that Biden loses in New Jersey, his win probability in Pennsylvania
> declines from 87% to 61%. **But this is still not nearly enough. Pennsylvania was a swing state. If
> Trump were to win in New Jersey, then something special would be going on, and Pennsylvania should be a
> slam dunk for the Republicans.**"
>
> "The posterior correlation of forecast vote share in these two states is **0.43**, and we see this in
> the central mass of Figure 8.3b, **but in the extremes of the distribution, the correlation goes away.**"
>
> **(c) Mississippi given Washington — the worst case.**
> ```r
> > round(mean(trump_wins[,"MS"] [trump_wins[,"WA"]]), 2)
> [1] 0.31
> > round(mean(trump_wins[,"MS"] [biden_wins[,"WA"]]), 2)
> [1] 0.90
> ```
> "**If Trump were to pull off the upset of the century and win Washington, it seems that his prospects
> in Mississippi wouldn't be so great.**" The scatterplot shows an implausible **$-0.42$ correlation**
> between the vote shares.
>
> **Not everywhere.** "The tail problem is not happening for all pairs of states." Pennsylvania and
> Wisconsin show a **healthy 0.81** correlation (Figure 8.4a); Alabama and Mississippi likewise.

> [!important] The substantive argument for why $-0.42$ is unreasonable
> "**Why do we think it so unreasonable to have a correlation of $-0.42$ between the election outcomes of
> Mississippi and Washington? It's because the uncertainty doesn't work that way. Sure, Mississippi's
> nothing like Washington. That's not the point. The point is, where's the uncertainty in the forecast
> coming from? It's coming from the possibility that the polls might be way off, and the possibility that
> there could be a big swing during the final weeks of the campaign. We'd expect a positive correlation
> for each of these, especially if we're talking about big shifts.**
>
> There **are** some swings that cause shifts toward the Democrats in some states and toward Republicans
> in others, so it makes sense for there to be some negative-correlation components in the model. **But
> in aggregate we expect these to be dominated by national and regional swings leading to positive
> correlations across the board.**"
>
> Note the form of the argument: not "this correlation looks wrong" but **"reason about the sources of
> uncertainty, and ask what correlation structure each source implies."** That is what makes it a model
> criticism rather than an intuition.

> [!example] The diagnosis: low correlations force wide state tails
> The original conjecture (independent long-tailed errors) is "**part of the story … but not the whole
> thing.**"
>
> "Many of the between-state correlations in the simulations are **low, even sometimes negative. And
> these low correlations, in turn, explain why the tails in each individual state are so wide** (leading
> to high estimates of Biden winning Alabama, and so forth):
>
> **If the Fivethirtyeight team was tuning the variance of the state-level simulations to get an
> uncertainty that seemed reasonable to them at the national level, then they'd need to crank up those
> state-level uncertainties, as these low correlations would cause them to mostly cancel out in the
> national averaging. Increase the between-state correlations, and you can decrease the variance for each
> state's forecast and still get what you want at the national level.**"
>
> **The best guess at the source:** "the negative correlations came from **error terms in the forecast
> based on state-level demographics: if these added terms are small in magnitude but have wide tails, they
> could induce negative correlations for extreme events while having minimal impact in the meat of the
> forecast distribution.**"
>
> **The honest coda:** "These models have lots of moving parts, and it can be hard to keep track of all of
> them. **Our election forecasting models have their own problems with tail calibration** (Gelman 2020a),
> **and even after the election is over it is difficult to evaluate forecasts, given that the election only
> happens once.**"

> [!important] What the case study demonstrates
> "**The sort of in-depth analysis of a multivariate forecast distribution demonstrates one of the central
> ideas of Bayesian workflow, which is that we move back and forth between data, modeling, and theory.
> Finding anomalies with inferences pushes us to improve our model and incorporate additional data and
> prior information, leading to new models that can again be checked.**"

## Connections

- The technique here — **condition on a tail event and inspect the conditional distribution** — is a
  generalization of [[Posterior Predictive Checking]] to a *joint* predictive distribution, and it is
  what marginal test statistics cannot do.
- The failure being diagnosed is a **joint prior** problem, exactly the class of issue that
  [[Joint Priors and Covariance Matrices]] warns about: independent components implying an implausible
  joint structure.
- "Only happens once" is the evaluation problem that motivates
  [[Simulated-Data Experimentation as Virtual Replication]].

## See Also
- [[Posterior Predictive Checking]] — the formalized version of "compare simulations to data"
- [[Point Estimates and Uncertainties]] — why marginal summaries mislead in the first place
- [[Comparing Models Visually]] — the model-comparison graphics of Figure 8.2
- [[Evaluating Fitted Models]] — the 2020 paper's shorter treatment
