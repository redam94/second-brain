---
title: "AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - topic/causal-inference
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §3 p.21; §3.1 pp.21-22; §3.2 pp.22-23 (ROAS estimator); §4.1.2-4.1.3 pp.26-27 (base sales, mROAS via 5% cut)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]"
  - "[[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]"
  - "[[AMSS Discussion, Limitations and Validation Practice]]"
aliases:
  - AMSS virtual experiment
  - Simulated ground-truth ROAS
  - Ground-truth ROAS by simulation
  - AMSS counterfactual scenario
---

# AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS

> [!summary]
> AMSS gets **ground truth** by running **virtual experiments**. It simulates many datasets under the actual scenario
> and many under a counterfactual scenario, then averages the contrasts. **ROAS** compares a channel's budget with that
> budget set to zero. **mROAS** compares it with the budget cut by 5%. **Base sales** set all budgets to zero. The
> counterfactual removes **every pathway** of the channel, so ground-truth ROAS is a **total effect**, including effects
> that run through other channels. Interventions must be set on **upstream, actionable or non-actionable settings**
> such as budgets, campaign settings, seasonality or competition. Downstream quantities such as sales or uncapped
> search spend cannot be set.

## Overview

Marketing analyses produce three kinds of output (§3, p.21):

- **Prediction**: the KPI under a specified change in strategy;
- **Attribution**: the KPI split across the existing channels;
- **Optimization**: proposed strategies that raise the KPI.

"Counterfactual data generation is the key capability required to evaluate these analyses" (p.21). The simulator can
run the same world under a different setting and identify the causal consequence. In
[[Potential Outcomes Framework|potential-outcomes]] terms, AMSS can draw both $Y(b)$ and $Y(b')$. It cannot draw them for
the *same* random seed path, but it can average over many paths. This is the ground truth that observational MMMs never
have, and that experiments supply only for a snapshot
([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]).

## Main Content

> [!definition] Scenario and counterfactual scenario (§3.1, p.21)
> A **scenario** is a complete specification of the simulation parameters. A **counterfactual scenario** is a modified
> parameterisation. Comparing data from the two reveals the causal effect of the modification. The canonical
> comparison is a positive media budget against a zero budget, which gives the **incremental** sales from that spend.
^def-amss-scenario

> [!definition] Three types of counterfactual (§3.1, p.22)
> 1. Changes to **actionable** settings, e.g. each channel's yearly budget. *Supported.*
> 2. Changes to **non-actionable** settings, e.g. seasonality or competitor activity. *Supported.*
> 3. Changes that require **modifying the simulator's structure**, e.g. fixing paid-search spend, which the search
>    module cannot do. *Not supported without redesign.*
>
> Some quantities are **not interventionable** by design. Sales "cannot be specified, only generated." Uncapped search
> spend depends on query volume, SOV and CPC, so it varies outside the modeler's control. Several campaign settings can
> achieve the same spend with different consumer impact, which makes "fix search spend" **not well-defined**. Hence
> "rather than specifying search spend when measuring media effectiveness, modelers should instead specify values for
> upstream variables such as the budget or the campaign settings" (p.22).
^def-amss-counterfactual-types

> [!definition] Total effect through multiple pathways (§3.1, pp.21-22)
> In a TV + uncapped-search system, TV spend can:
> - generate sales directly, with no interaction with search;
> - raise category and brand query volume, and so paid-search volume;
> - change the disposition of searchers (more favourable), and so paid-search effectiveness.
>
> "Running a virtual experiment that removes television advertising will show the combined impact of eliminating all
> of these pathways" (p.22).
^def-amss-total-effect

**Consequence for attribution.** Ground-truth TV ROAS is a **total** causal effect of the TV budget. A regression with
both TV and search spend as regressors conditions on a **mediator** (search spend). Its TV coefficient estimates
something closer to a **controlled direct effect**, and the TV → search pathway lands in the search coefficient. The
paper's simple scenario deliberately shuts these pathways off (query rates and CTRs do not depend on favorability) so
that total and direct effects coincide. In the general case the estimand is part of the validation design. See
[[DAGs and Causal Identification]] and [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].

> [!theorem] Simulated ground-truth ROAS estimator (§3.2, pp.22-23)
> **Setup.** Strategy $b=(b_m)_{1:M}$, where $b_m$ is channel $m$'s budget and $m=1$ is TV. The counterfactual $b'$ is
> identical except $b'_1=0$. Generate $N_1$ datasets $D_{n_1}(b)$, each with total ad spend $x_{n_1}(b)$ and revenue
> $y_{n_1}(b)$, and $N_2$ datasets $D_{n_2}(b')$ with $x_{n_2}(b')$ and $y_{n_2}(b')$.
>
> **Estimator.**
> $$\hat\theta=\frac{1}{N_1N_2}\sum_{n_1=1}^{N_1}\sum_{n_2=1}^{N_2}\frac{y_{n_1}(b)-y_{n_2}(b')}{x_{n_1}(b)-x_{n_2}(b')} .$$
>
> **Claim.** By the law of large numbers $\hat\theta\to\theta$ (true ROAS), and a margin of error can be computed from
> the empirical variability. More variable scenarios need larger samples (p.22).
^thm-amss-roas

*Remarks (our analysis, not in the paper).*
1. The estimator averages **ratios** over all $N_1N_2$ cross-pairs, so it is a two-sample U-statistic. Its limit is
   $E\bigl[\frac{Y(b)-Y(b')}{X(b)-X(b')}\bigr]$ over independent draws. That equals the ratio-of-means
   $\frac{E[Y(b)]-E[Y(b')]}{E[X(b)]-E[X(b')]}$ only when the spend difference is (nearly) constant across pairs. For TV,
   spend is set by budget and flighting with small unit-cost noise, so the difference is almost fixed. For uncapped
   search, spend differences vary across draws, so the two definitions can diverge. The ratio-of-means is the usual
   ROAS definition, as in [[ROAS, mROAS, and Optimal Media Mix]].
2. $x$ is "total ad spend", so the denominator is the change in **total** spend. Under the TV counterfactual, search spend
   can also change, which matters when channels interact.
3. Ground truth is defined for the **same time window** as the estimate. The §4.2 "same-year" ROAS excludes spillover
   into the next year.

> [!definition] Marginal ROAS and base sales (§4.1.2-4.1.3, pp.26-27)
> - **mROAS**: the same estimator with $b'_m=0.95\,b_m$, the "incremental effect of the last 5% spent in the channel."
> - **Base sales**: the all-budgets-zero counterfactual, averaged over 1,000 simulations. These are the sales the
>   advertiser "would generate in the absence of any advertising."
> - Ground truth can be **any** functional of the scenario, e.g. expected weekly sales (p.22).
^def-amss-mroas-base

## Examples

> [!example] Ground truth in the simple scenario (Table 4, p.28)
> TV ROAS uses 1,000 datasets at the actual budget and 1,000 with TV at zero. Search is computed the same way, and mROAS
> uses 5% cuts. Margins of error are in parentheses.
>
> | Year | TV ROAS | TV mROAS | Search ROAS | Search mROAS |
> |---|---|---|---|---|
> | 2 | 1.79 (0.00) | 0.41 (0.02) | 1.90 (0.00) | 1.94 (0.03) |
> | 3 | 2.11 (0.00) | 0.40 (0.02) | 1.85 (0.00) | 1.52 (0.03) |
> | 4 | 2.23 (0.00) | 0.47 (0.02) | 1.86 (0.00) | 1.76 (0.08) |
>
> **Interpretation.** TV's average return is about 2 but its marginal return is about 0.4: the last TV dollar returns
> 40 cents. That fits the Hill frequency curve plus reach saturation. Search mROAS is close to its ROAS, which
> suggests search is closer to linear in budget over this range; the paper does not comment on this. mROAS margins of error are an order of magnitude larger than ROAS
> margins, because a 5% budget cut produces a small sales difference relative to the noise.
^ex-amss-ground-truth-simple-scenario

## Connections

- **Morris et al. on true values.** When the estimand is not a parameter of the DGM, its true value has to be
  approximated, typically by a large simulation. AMSS's counterfactual averaging is that device. See
  [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- **Model-side counterfactuals.** In Bayesian MMM, ROAS and mROAS are computed by counterfactual prediction from the
  *fitted* model ([[ROAS, mROAS, and Optimal Media Mix]]). AMSS computes the same quantities from the *true* world. The
  validation question is whether the two agree.
- **Experiments as virtual and real.** A geo experiment estimates the same total-effect contrast in reality
  ([[Geo-Experiment Methodology - Overview]]). AMSS was built to evaluate geo designs too (Vaver & Koehler 2011, cited in
  the abstract).
- **Counterfactual inference generally.** [[Counterfactual Inference]] covers model-based counterfactual prediction.

## See Also

- [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]: ground truth used to score regressions
- [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]: why search spend is not settable
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
