---
title: "Q: How do adstock/carryover dynamics interact with the timing of sequential media experiments (delayed outcomes)?"
tags:
  - type/qa
  - topic/market-response
  - topic/bayesian-experimental-design
  - topic/bayesian-statistics
date_asked: 2026-07-01
answered_from:
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[Bayesian Filtering and Smoothing]]"
related_questions:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
aliases:
  - Carryover and sequential experiment timing
  - Delayed outcomes in adaptive media experiments
  - Adstock washout periods and measurement windows
---

# How do adstock/carryover dynamics interact with the timing of sequential media experiments (delayed outcomes)?

> [!summary]
> Carryover means an intervention's effect is **spread over future periods**, so a sequential experimentation loop faces **delayed outcomes**: you cannot read a test's result — or start a clean next test — until the adstock has decayed. Three consequences follow. (1) **Measurement windows must span the carryover tail** (including the post-change period), or ROAS is undercounted. (2) **Back-to-back experiments contaminate each other** through lingering adstock, so you need **washout periods** or must model the overlap explicitly. (3) The cleanest treatment is to make carryover a **latent state** in a state-space model and let a **Kalman filter/smoother** attribute delayed sales to past exposures — which also lets [[Sequential and Adaptive BED|adaptive BED]] account for the fact that an experiment's information *arrives with a lag* when it schedules the next test.

## Answer

### 1. Carryover = the effect outlives the exposure

The **adstock** transform replaces current spend with a normalized weighted average of current and past spend over $L$ periods; the **geometric-decay** form peaks at exposure and decays by a retention rate $\alpha_m$, while **delayed adstock** peaks $\theta_m$ periods *later* ([[Carryover (Adstock) Functional Forms]]). Equivalently, distributed-lag (Koyck/ADL/PDL) structures spread one period's spend across many periods of response ([[Carryover Effects and Distributed Lags]]). So an experiment that changes spend in weeks $[t_0,t_1]$ keeps moving sales well past $t_1$ — a **delayed outcome**.

This is not a nuisance to ignore: [[ROAS, mROAS, and Optimal Media Mix]] computes attribution counterfactually **"including the post-change period because carryover keeps affecting sales after the change."** Cut the window short and you systematically **understate** the channel's ROAS.

### 2. Consequence A — size the measurement window to the carryover tail

Before reading a test result, wait for the adstock to substantially decay. A practical rule: the read-out window should cover the **effective duration** implied by $\alpha_m$ (e.g. weeks to reach <5% residual carryover, $L_{\text{eff}}\approx \log(0.05)/\log(\alpha_m)$). Reading at $t_1$ alone truncates the tail; the post-period must be part of the estimand.

### 3. Consequence B — washout to avoid cross-experiment contamination

In a sequential loop, if experiment $k{+}1$ starts while experiment $k$'s adstock is still live, the two effects **superpose** and the design becomes confounded. Options:

- **Washout period** — a gap between experiments long enough for prior adstock to decay (simple, but slows the learning loop).
- **Model the overlap** — carry the residual adstock from prior tests as a known covariate so the likelihood $p(y\mid\theta,\xi)$ correctly de-confounds concurrent effects. This keeps the loop fast and is the more information-efficient choice.

Either way, the **incremental EIG** of the next design ([[Sequential and Adaptive BED]]) must be evaluated against a posterior that already conditions on the in-flight carryover — otherwise the design overestimates how much *new* information the next test brings.

### 4. Consequence C — treat carryover as a latent state (the cleanest solution)

Adstock is literally a hidden accumulator that evolves over time and drives observed sales — a **state-space model**:

> [!definition] Carryover as a state-space model ([[Linear-Gaussian State-Space Models]])
> A state-space model pairs a **transition equation** for a hidden Markov state $\mathbf x_k$ with an **observation equation** linking measurements $\mathbf y_k$ to that state. Encode the adstock accumulator as (part of) $\mathbf x_k$: it decays by $\alpha_m$ each period (transition) and, after saturation, contributes to sales (observation). Delayed outcomes are then just observations of a slowly-decaying state.

With this framing, [[Bayesian Filtering and Smoothing|Kalman filtering/smoothing]] attributes delayed sales back to the exposures that caused them, in $\mathcal O(N)$ time, and naturally handles the **lag between acting and observing**. The [[Bayesian Structural Time-Series Model|BSTS/CausalImpact]] approach is exactly this: a state-space decomposition (trend + seasonality + regression) whose posterior predictive gives the counterfactual over the **post-intervention period** — the right tool to read a geo-holdout whose effect trails off gradually (see [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]).

### 5. Consequence D — delayed information changes the adaptive schedule

In [[Sequential and Adaptive BED|adaptive design]], each step picks $\xi_t$ from the posterior after seeing history $h_{t-1}$. With carryover, the outcome of $\xi_{t-1}$ is **not fully observed** when it is time to choose $\xi_t$ — the informative sales are still accruing. A myopic greedy loop that assumes immediate feedback will mis-time tests. Remedies:

- **Delay-aware scheduling** — condition on partially-observed outcomes (filtered state), not on a not-yet-arrived final read.
- **Non-myopic policies** — a [[From Designs to Policies (Deep Adaptive Design)|DAD-style]] policy trained to maximize *total* EIG over the horizon internalizes that information arrives late, spacing and sequencing tests accordingly.

### Practical Implications

- **Set the read-out window from the retention rate $\alpha_m$**, and always include the post-change period in the estimand — otherwise ROAS is biased low.
- **Insert washouts or model residual adstock** between sequential tests to prevent contamination.
- **Represent carryover as a latent state** and use a Kalman filter/BSTS so delayed outcomes are attributed correctly and read out as counterfactuals.
- **Make the adaptive schedule delay-aware** (or use a non-myopic policy) so the next test isn't chosen on stale, still-accruing feedback.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Carryover (Adstock) Functional Forms]] | Geometric vs delayed adstock; retention rate $\alpha_m$ |
| [[Carryover Effects and Distributed Lags]] | Koyck/ADL/PDL distributed-lag structures |
| [[ROAS, mROAS, and Optimal Media Mix]] | Attribution must include the post-change carryover period |
| [[Sequential and Adaptive BED]] | Incremental EIG loop that scheduling must respect |
| [[Linear-Gaussian State-Space Models]] | Carryover as a latent decaying state |
| [[Bayesian Filtering and Smoothing]] · [[The Kalman Filter]] | $\mathcal O(N)$ attribution of delayed sales to exposures |
| [[Bayesian Structural Time-Series Model]] | Counterfactual post-period read-out (CausalImpact) |
| [[From Designs to Policies (Deep Adaptive Design)]] | Non-myopic policies that internalize delayed information |

## Related Concepts

- [[Design of Dynamic Response Models]] — dynamic model specification for lagged effects
- [[Local Linear Trend and Seasonality]] — the other state-space components a media time series needs
- [[Multivariate Persistence and Cointegration]] — long-run/persistent media effects beyond finite adstock
- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — the loop this timing analysis constrains
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — where the window $[t_0,t_1]$ is set

## Gaps

- **No note on experimental design under delayed/censored feedback** specifically (e.g. delayed-reward bandits, surrogate outcomes). The synthesis is built from adstock + sequential-BED + state-space notes.
- **No treatment of optimal washout length** as a formal trade-off (information lost to waiting vs bias from contamination).
- **Attribution windows / conversion lag** from the ad-measurement literature are not ingested.

## Follow-Up Questions

- What washout length minimizes total loss (waiting cost + contamination bias) for a given retention rate $\alpha_m$?
- How do you compute incremental EIG when the previous experiment's outcome is only partially observed (filtered)?
- Can a single state-space model jointly host adstock, seasonality, and the experiment indicator so all tests are analyzed in one filter?
