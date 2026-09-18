---
title: Interference and Marketplace Experiments
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/interference
  - topic/causal-inference
  - topic/marketplaces
  - type/concept
  - doc/paper
source: "[[raw/Johari 2020 - Experimental Design in Two-Sided Platforms.pdf]]"
source_location: "Secs. 1-9 (pp. 1-33): Eqs. 7-9, 19-21, 26-27, Theorems 1-4, Proposition 4, Corollary 1; survey context from [[raw/Larsen 2022 - Statistical Challenges in Online Controlled Experiments.pdf]] Sec. 6 (pp. 21-24)"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[Online Experimentation - Overview]]"
  - "[[Potential Outcomes Framework]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Switchback Experiment Design and Analysis]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
aliases:
  - Interference and Marketplace Experiments (Switchback, Cluster Randomization)
  - SUTVA Violations in A/B Tests
  - Marketplace Interference
  - Network Interference
  - Two-Sided Randomization
  - Global Treatment Effect
  - Cluster Randomization for Interference
---

# Interference and Marketplace Experiments

> [!summary]
> The difference-in-means estimator is unbiased for the average treatment effect only under **SUTVA**: a unit's outcome may not depend on anyone else's assignment. In social networks (treated users message control friends) and marketplaces (treated and control units compete for the same drivers, listings or ad slots) this fails, and the estimand of interest becomes the **global treatment effect (GTE)**: everyone treated versus no-one treated. Johari, Li, Liskovich & Weintraub (2020; *Management Science* 2022) model a two-sided booking platform as a Markov chain with a mean-field ODE limit and show that the bias of the two standard designs depends on **market balance**: customer-side randomization (CR) is unbiased when demand-constrained and biased when supply-constrained; listing-side randomization (LR) is the reverse; both *overestimate* a positive effect. A **two-sided randomization (TSR)** design interpolates between them. Design-side alternatives are **cluster randomization** (networks, geos) and [[Switchback Experiment Design and Analysis|switchbacks]] (time), all of which buy lower bias with higher variance.

## Overview

Larsen et al. (Sec. 6) give two canonical examples. *LinkedIn messaging*: a feature that makes treated users send more messages also makes their control-group friends reply more, contaminating control (**network interference**). *Lyft pricing*: a treatment that makes riders book more rides depletes the shared pool of drivers, lowering bookings in control (**marketplace interference**). In both cases "traditional randomization no longer adequately approximates the counterfactuals". Reported magnitudes are large: Blake & Coey (2014) found an eBay auction experiment off by a factor of two; Fradkin (2019) a 50% overestimate in simulation; Holtz et al. (2020) estimated the interference bias on Airbnb at almost one third of the treatment effect.

There are two strategies (Larsen Sec. 6): **design** the interference away, by assigning units that influence each other to the same arm so that a difference in means is again meaningful, or **model** it, keeping unit-level randomization and its power but relying on a correctly specified interference model. Johari et al. sit in between: a structural market model is used to understand *when* simple designs are biased and to motivate a new design.

## Main Content

> [!definition] SUTVA, interference, and the global treatment effect ^def-gte
> With assignment vector $\mathbf W = (W_1,\dots,W_n)$, unit $i$'s potential outcome is in general $Y_i(\mathbf W)$. **SUTVA** asserts $Y_i(\mathbf W) = Y_i(W_i)$. **Interference** (spillover, leakage) is any violation. The decision-relevant estimand is the **global treatment effect**
>
> $$
> \mathrm{GTE} = \mu(\mathbf 1) - \mu(\mathbf 0),
> $$
>
> the difference in the (steady-state) outcome rate between a fully treated and a fully controlled market. Under SUTVA this equals the usual ATE; under interference a 50/50 experiment observes *neither* world.

### The market model (Johari et al. Secs. 3-4)

$N$ listings of types $\theta$ (mass $\rho(\theta)$) are either available or occupied. Customers of types $\gamma$ arrive as Poisson processes with total rate $\lambda$ per listing. An arriving customer includes each available type-$\theta$ listing in her consideration set with probability $\alpha_\gamma(\theta)$ and chooses by multinomial logit with utilities $v_\gamma(\theta)$ and outside option $\epsilon_\gamma$. A booked listing stays occupied for an exponential time with rate $\tau(\theta) = \tau\nu(\theta)$. As $N \to \infty$ the scaled state $s_t(\theta)$, the mass of available listings, follows the mean-field ODE (Eqs. 7-8)

$$
\frac{d}{dt}s_t(\theta) = \big(\rho(\theta) - s_t(\theta)\big)\tau(\theta) - \lambda\sum_\gamma \phi_\gamma\, p_\gamma(\theta \mid s_t), \qquad p_\gamma(\theta\mid s) = \frac{\alpha_\gamma(\theta)v_\gamma(\theta)s(\theta)}{\epsilon_\gamma + \sum_{\theta'}\alpha_\gamma(\theta')v_\gamma(\theta')s(\theta')} .
$$

Theorem 1 shows a unique, globally asymptotically stable steady state $s^*$ (via a convex Lyapunov function); Theorem 2 (Kurtz) shows the finite Markov chain converges to this fluid limit. The ratio $\lambda/\tau$ is **market balance**: small means demand-constrained (few customers, inventory replenishes quickly), large means supply-constrained. A treatment is a change in choice parameters $(\tilde\alpha, \tilde v)$, e.g. better photos, badges, or showing completion rates; it is encoded by doubling the type space into control and treated copies.

### Designs and naive estimators (Sec. 5)

Let $Q_{ij}(T)$ be the booking rate over $[0,T]$ of customers in condition $i$ booking listings in condition $j$.

- **Customer-side randomization (CR)**: a fraction $a_C$ of customers is treated; $\widehat{\mathrm{GTE}}^{CR} = Q_{11}/a_C - Q_{01}/(1-a_C)$.
- **Listing-side randomization (LR)**: a fraction $a_L$ of listings is treated and every customer sees a mix; $\widehat{\mathrm{GTE}}^{LR} = Q_{11}/a_L - Q_{10}/(1-a_L)$.
- **Two-sided randomization (TSR)**: both sides are randomized and the intervention is applied *only when a treated customer views a treated listing*. The naive estimator (Eq. 21) is

$$
\widehat{\mathrm{GTE}}^{TSRN} = \frac{Q_{11}}{a_C a_L} - \frac{Q_{01} + Q_{10} + Q_{00}}{1 - a_C a_L},
$$

which reduces to CR as $a_L \to 1$ and to LR as $a_C \to 1$. A multiple-randomization design of this kind was proposed independently by Bajari et al. (2019).

> [!theorem] Bias depends on market balance (Theorems 3-4, Proposition 4) ^thm-market-balance
> In the mean-field steady state:
>
> 1. **Demand-constrained**, $\lambda/\tau \to 0$: $\widehat{\mathrm{GTE}}^{CR}/\lambda - \mathrm{GTE}/\lambda \to 0$ for all $a_C \in (0,1)$, whereas generically $\lim \widehat{\mathrm{GTE}}^{LR}/\lambda - \mathrm{GTE}/\lambda \ne 0$.
> 2. **Supply-constrained**, $\lambda/\tau \to \infty$: $\mathrm{GTE}/\tau \to 0$ and $\widehat{\mathrm{GTE}}^{LR}/\tau - \mathrm{GTE}/\tau \to 0$, whereas generically the CR estimator stays biased.
> 3. For a **positive** treatment ($\tilde\alpha\tilde v > \alpha v$ everywhere) the biases in (1) and (2) are strictly **positive**: the naive estimators *overestimate* the GTE.

**Intuition.** When inventory replenishes between arrivals, customers never compete, so CR has no interference; but under LR each customer compares treated with control listings side by side, and the treated listings *cannibalise* bookings from control listings, so the contrast is inflated. When supply is scarce, every available listing gets booked anyway, so listings do not compete and LR is clean; but under CR treated customers book inventory that control customers would otherwise have found. In each biased case, "individuals in the treatment group face less competition than they would in the global treatment setting, whereas the individuals in the control group face more competition than in the global control setting". In the supply-constrained limit the GTE itself vanishes (inventory, not demand, binds), so the LR *relative* bias need not vanish even though its absolute bias does.

**Tuning TSR (Sec. 6.3).** Choose allocations as a function of observable market balance (Eq. 26):

$$
a_C(\lambda/\tau) = 1 - e^{-\lambda/\tau} + \bar a_C e^{-\lambda/\tau}, \qquad a_L(\lambda/\tau) = \bar a_L\big(1 - e^{-\lambda/\tau}\big) + e^{-\lambda/\tau},
$$

so TSR becomes CR when demand-constrained and LR when supply-constrained; Corollary 1 shows TSRN is unbiased in both limits. Because a TSR experiment observes all four cells $Q_{00}, Q_{01}, Q_{10}, Q_{11}$, it measures competition directly. The heuristic estimators TSRI-1 and TSRI-2 start from an interpolation $\beta\,\widehat{\mathrm{GTE}}^{CR} + (1-\beta)\,\widehat{\mathrm{GTE}}^{LR}$ and subtract cross-cell correction terms weighted by a factor $k$; TSRI-2 had the lowest bias of all five estimators at intermediate balance.

**Bias-variance trade-off (Sec. 7).** In simulations with $N = 5000$ listings over 500 runs, the ordering of bias matches the mean-field theory, but the TSR estimators with the lowest bias have the highest variance; TSRN has variance similar to the better of CR and LR. Bias is insensitive to market size and horizon while variance shrinks with both, so large, long experiments should prioritise bias reduction and small, short ones variance.

### Cluster randomization

For network interference the dominant design is **graph-cluster randomization** (Ugander et al. 2013; Eckles et al. 2014; Saveski et al. 2017): partition the graph by community detection so that most edges are within clusters, and randomize clusters. Units then mostly share treatment with their neighbours, approximating the all-treated and all-control worlds, but the effective sample size is the number of clusters and power drops sharply. **Ego-cluster** designs (Saint-Jacques et al. 2019) use many small clusters of one ego plus some alters, recovering power and allowing the spillover itself to be estimated by treating ego and alters differently. Inference must respect the randomization unit; see [[Standard Errors and Clustering]]. In Johari et al.'s comparison (Sec. 8), a cluster-randomized estimator beats TSR when the market is tightly clustered (customers strongly prefer one listing type) and loses when the market is interconnected, where no clean partition exists. For auctions, **budget-split designs** (Liu et al. 2021) give each arm its own copy of the budget so the arms no longer compete for it.

**Geo experiments are cluster-randomized designs.** Randomizing DMAs rather than users is precisely a response to interference (shared auctions, cross-device identity, offline sales) plus measurement constraints, and it pays the same price in effective sample size; see [[Geo-Experiment Design and Power Analysis]]. Residual interference appears as cross-border spillover.

## Examples

**Badge experiment on a lodging platform.** The platform tests a "top host" badge that raises a listing's utility from $v = 0.315$ to $\tilde v = 0.394$ (the paper's Figure 2 parameters: a 20% steady-state booking probability under global control and 23% under global treatment at $\lambda = \tau$).

- In low season ($\lambda/\tau \ll 1$), randomize **customers**. An LR test would show badged listings far outperforming unbadged ones mainly because they *divert* bookings, not because total bookings rise.
- In peak season ($\lambda/\tau \gg 1$) almost everything books regardless; randomize **listings**. A CR test would show treated customers booking more only because they got to scarce inventory first.
- In between, run TSR with allocations from Eq. 26, or cluster by destination if travellers rarely substitute across destinations.

**Advertising analogue.** A bidding-algorithm test that splits *campaigns* (the supply of ads competing for impressions) is an LR-type design: the treated campaigns win auctions from the control campaigns and the measured lift overstates the global effect. Splitting *users* is CR-type and is biased when shared budgets or frequency caps bind. Budget-split, geo-cluster or switchback designs are the remedies.

**Simulation as a design tool.** The Markov-chain market model is a compact agent-based simulator: heterogeneous agents, a choice rule and inventory dynamics. Simulating global treatment, global control and each candidate design gives the bias and variance of every estimator *before* running anything live. The same approach transfers to richer agent-based market models, where the mean-field limit plays the role of an analytical check.

## Connections

- [[Potential Outcomes Framework]] — SUTVA is part of the definition of $Y_i(w)$; interference requires $Y_i(\mathbf W)$.
- [[Switchback Experiment Design and Analysis]] — randomize the whole market over time instead of units within it.
- [[Geo-Experiment Design and Power Analysis]] and [[Geo-Experiment Methodology - Overview]] — spatial cluster randomization in marketing measurement.
- [[Standard Errors and Clustering]] — inference when the randomization unit is a cluster.
- [[Sample Ratio Mismatch and Trustworthiness Checks]] — a different failure: there the *analysed sample* is distorted, here the *potential outcomes* are.
- [[Online Experimentation - Overview]] — interference as one of the four failure modes of the naive A/B test.
- [[Observational vs Experimental Methods in Advertising]] — randomization alone does not guarantee the right estimand in ad markets.
- [[Differences-in-Differences]] and [[Synthetic Control]] — aggregate-unit alternatives when only a few markets can be treated.

## See Also

- [[The Experimental Ideal]]
- [[Activity Bias in Advertising]]
- [[Randomization Inference - Overview]]
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]
- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — contamination across a user's devices and identities as a form of interference
