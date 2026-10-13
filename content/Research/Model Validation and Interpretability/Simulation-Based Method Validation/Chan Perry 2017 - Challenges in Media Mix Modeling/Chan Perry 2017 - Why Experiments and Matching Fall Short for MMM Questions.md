---
title: "Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - topic/causal-inference
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "Abstract and §1 Introduction (pp.1-2); §2 Causal Inference: §2.1 Randomized experiments (p.2), §2.2 Potential outcomes incl. selection-bias decomposition and Eq. (1) matching estimator (pp.2-4)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Propensity Score Matching - Overview]]"
  - "[[Common Support and Overlap]]"
used_by:
  - "[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]"
  - "[[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]]"
aliases:
  - Chan Perry selection bias decomposition
  - Chan Perry matching estimator
  - Why advertisers turn to MMM
  - MMM causal questions (Chan Perry)
---

# Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions

> [!summary]
> Sections 1-2 of Chan & Perry (2017) set up the paper's argument. Advertisers ask MMMs **causal** questions (past ROAS,
> what-if spend, optimal allocation). The two textbook routes to causal answers are impractical at the breadth an MMM is
> asked to cover. Randomized experiments would be needed at many spend levels and allocations. The potential-outcomes
> **matching estimator** (Eq. 1) needs an untreated period for every control configuration seen in treated periods, which
> cannot hold with ~156 correlated weekly rows. The naive on/off comparison splits exactly into a causal effect plus a
> **selection-bias** term, and that term is the thread running through the rest of the paper.
^summary

## Overview

The paper opens (Abstract, §1, pp.1-2) by stating its stance: MMMs answer causal questions with correlational tools.
"Typically though, MMMs are regression models based on a limited amount of aggregated observational data and such
models produce correlational, not causal results. It is only under certain narrow conditions that these estimates can be
considered causal" (§1, p.1). Section 2 then asks why an advertiser does not simply use the gold-standard alternatives.
The answer motivates the regression MMM of §3
([[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]) and the challenge catalogue of §4.

## Main Content

### The questions an MMM is asked (§1, p.1)

MMMs date to the 1960s (the paper cites Borden 1964 and McCarthy 1978 on the "marketing mix"). They regress aggregate
sales over time on advertising, other marketing variables and controls (weather, seasonality, competition). From the
fit, analysts derive ROAS and optimized budgets, "based on the assumption that these models provide valid causal
results" (p.1). The three canonical questions (p.1):

1. What was my ROAS on TV last year? (a retrospective, **average** effect)
2. What would my sales be if more or less money were spent next year? (a **counterfactual response curve**)
3. How should my media budgets be allocated to maximize sales? (an **optimization over many counterfactuals**)

Each of these is an intervention question. See [[ROAS, mROAS, and Optimal Media Mix]] for the formal definitions of
average and marginal ROAS used in the companion Bayesian MMM paper.

### Paper roadmap (§1, pp.1-2)

| Section | Role |
|---|---|
| §2 | Two causal approaches (randomized experiments, potential outcomes) and why they are "impractical or infeasible" for answering *all* the advertiser's questions, "Hence the reason advertisers turn to MMMs" (p.1) |
| §3 | Context: a widely used regression form that "attempts to address carryover and diminishing returns", plus the type of data typically available (pp.1-2) |
| §4 | Challenges that "can be grouped broadly into three main areas; data limitations, selection bias, and modeling" (p.2) |
| §5 | "turns to a more optimistic note" and highlights opportunities to address §4 (p.2) |
| §6 | Final remarks on three needs: to acknowledge uncertainty in the modeling process, for transparency between modeler and end user, and "to educate end-users of MMMs on their capabilities and limitations" (p.2) |

### §2.1 Randomized experiments (p.2)

> [!definition] Randomized experiment (Chan & Perry §2.1, p.2)
> To learn what happens if the advertiser does action $X$, randomly split a population into a **test** group (action $X$
> performed) and a **control** group (no action). Randomization balances all other sources of variation, so the only
> systematic difference between groups is $X$, and an observed difference in outcome can be attributed to $X$.
> Experiments can be run at the **user**, **store** or **geographic** level; the feasible level is bounded by the
> granularity at which $X$ can be targeted and outcomes tracked.
> *Citations in the source:* Hinkelmann & Kempthorne (2008) as "a general introduction to experiments"; Vaver & Koehler
> (2011) for experiments at user, store or geographic level (both §2.1, p.2).
^def-cp-rct

Why experiments do not replace an MMM (p.2):

- **Breadth.** An MMM is expected to describe a channel's effect *at many spend levels* and to drive budget
  optimization. Answering the same questions experimentally would take "many experiments with many different conditions
  over time", which for "most, if not all advertisers" is infeasible.
- **Technical hurdles** in implementing randomization.
- **Opportunity cost** of withholding ads from a control group.
- **Cost** of running ads to the test group.
- **Weak effects** that may need very large samples (Lewis & Rao 2015; see
  [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]).

Vault context: geo-level designs are in [[Geo-Experiment Methodology - Overview]] and
[[Geo-Experiment Design and Power Analysis]]; user-level designs are in [[User-Level Ad Experiments - Overview]]; the
choice between them is in [[User-Level vs Geo-Level Experiments - When to Use Which]].

### §2.2 Potential outcomes (pp.2-4)

**Framing (pp.2-3).** If advertisers cannot run randomized experiments at scale and must rely on historical data, they
can try to reach causal conclusions through the potential-outcomes framework, which the paper notes is "also known as
the Rubin causal model" and cites to Imbens & Rubin (2015). For this framework applied to *digital advertising*, the
paper points to Chan, Ge, Gershony, Hesterberg & Lambert (2010), on evaluating online ad campaigns with causal models
at scale in a pipeline (KDD '10), and Lambert & Pregibon (2007), on assessing new features for online advertisers
(ADKDD '07). Full entries are in the Overview's References section
([[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]).

Setup (p.3): one ad channel that is either on or off in each period $t$.

| Symbol | Meaning |
|---|---|
| $y_t$ | observed sales in period $t$ |
| $x_t \in \{0,1\}$ | indicator that the channel was on in period $t$ |
| $y_t^1$ | potential sales if the channel is on |
| $y_t^0$ | potential sales if the channel is off |
| $E(\cdot)$ | the **sample average** over the relevant periods (not a population expectation) |
| $z_t$ | vector of control variables that could affect sales at $t$, *including other ad channels* |
| $P(\cdot)$ | empirical probability |

The causal ROAS over the periods is $E(y_t^1 - y_t^0)$ (p.3). Only one of $y_t^1, y_t^0$ is observed per period
(the fundamental problem; see [[Potential Outcomes Framework]]).

> [!definition] Naive on/off contrast = effect on treated periods + selection bias (§2.2, p.3)
> $$
> E(y_t\mid x_t=1)-E(y_t\mid x_t=0)=\underbrace{\left[E(y^1_t\mid x_t=1)-E(y^0_t\mid x_t=1)\right]}_{\text{causal effect during treated periods}}+\underbrace{\left[E(y^0_t\mid x_t=1)-E(y^0_t\mid x_t=0)\right]}_{\text{selection bias}}
> $$
> The first bracket compares sales in the on-periods with the sales those *same* periods would have had with the channel
> off. The second bracket is **selection bias**: in a randomized experiment its expected value is zero by design. The
> paper uses the term for "any biases in the treatment selection mechanism that are also correlated with the outcome
> (sales), which in this context means potentially everything that determines ad spend" (p.3).
^def-cp-selection-decomp

**Derivation (one line).** Add and subtract $E(y_t^0\mid x_t=1)$ to $E(y_t^1\mid x_t=1)-E(y_t^0\mid x_t=0)$, using
$y_t = y_t^1$ when $x_t=1$ and $y_t=y_t^0$ when $x_t=0$.

Sources of selection bias named on p.3: actions by the **advertiser**, by **potential purchasers**, or by **competing
advertisers**. The worked case: if ads are turned on following seasonal demand, then
$E(y_t^0\mid x_t=1)\neq E(y_t^0\mid x_t=0)$, because on-periods would have had higher sales anyway. The paper calls this
problem "one of the most demanding problems in applied statistics" (p.3).

**Bridge to matching (p.3).** The paper states that this selection bias "needs to be accounted for in order to produce a
valid causal result", and then proposes a remedy: "One way to control for selection bias is through the use of the
matching estimator described below." It then defines the controls: "Let $z_t$ be the vector of control variables which
could potentially affect sales at time $t$. These control variables would include other ad channels." Treating the other
ad channels as controls is what makes the overlap requirement below so hard to meet. Media channels are correlated, so
on-periods for one channel rarely have off-period twins with the same spend in every other channel.

> [!definition] Matching estimator (§2.2, Eq. 1, pp.3-4)
> $$
> E(y^1_t-y^0_t\mid x_t=1)=\sum_{z\mid x_t=1}\Big[E(y_t\mid x_t=1,z)-E(y_t\mid x_t=0,z)\Big]\times P(z_t=z\mid x_t=1)\qquad(1)
> $$
> Within each control configuration $z$ observed during on-periods, compare on- and off-period sales; then average the
> within-cell differences with weights equal to how often each $z$ occurs among on-periods. This estimates the effect on
> the treated periods.
>
> **Requirement (p.4):** for every combination of control values that occurs when $x_t=1$ there must be observations with
> $x_t=0$ (an overlap / common-support condition).
^def-cp-matching

Why matching fails at MMM scale (p.4):

1. **Correlated media.** If channels move together, cells with channel on and its partners at the same level, but this
   channel off, simply do not occur.
2. **Curse of dimensionality.** The number of cells grows exponentially with the number of control variables.
3. **Few data points.** With MMM-sized data the overlap assumption "is nearly impossible to satisfy in order to use the
   matching estimator to provide the full range of ROAS estimates" (p.4).

Conclusion of §2 (p.4): with experiments and matching both infeasible or impractical, advertisers turn to regression.

## Examples

> [!example] Seasonal on/off selection bias in numbers (vault illustration, not from the paper)
> **Setup.** 104 weeks; 52 high-season weeks with baseline sales 120 and 52 low-season weeks with baseline 80. The
> advertiser runs the channel in 40 of the high-season weeks and 10 of the low-season weeks. The true lift is +5 in any
> week the channel is on.
>
> **On-periods:** $E(y^0\mid x=1) = (40\cdot120+10\cdot80)/50 = 112$, so $E(y\mid x=1)=117$.
> **Off-periods:** $E(y^0\mid x=0) = (12\cdot120+42\cdot80)/54 \approx 88.9$.
>
> **Naive contrast:** $117-88.9 = 28.1$. **Decomposition:** causal effect $5$ + selection bias $112-88.9=23.1$.
> The naive estimate overstates the lift by more than 5x. A matching estimator with $z=$ season recovers $5$ here,
> because both seasons contain on- and off-weeks; it fails as soon as some season x competitor x promotion cell has no
> off-weeks.
^ex-cp-seasonal-numbers

## Connections

- The decomposition is the time-series analogue of the observational-vs-RCT gap measured on real campaigns in
  [[Experimental Benchmarks for Observational Ad Measurement]]; the individual-level mechanism is
  [[Activity Bias in Advertising]].
- Eq. (1) is exact matching on $z$; propensity-score versions and the overlap diagnostics are in
  [[Propensity Score Matching - Overview]] and [[Common Support and Overlap]].
- The selection-bias term is developed channel by channel in
  [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]].
- The paid-search field experiment owned by another note set, [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]],
  measured how large this term can be in practice for a targeted channel.

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]: paper overview and section map
- [[Potential Outcomes Framework]]: general Rubin causal model
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]]: how experiments can still enter an MMM as priors
