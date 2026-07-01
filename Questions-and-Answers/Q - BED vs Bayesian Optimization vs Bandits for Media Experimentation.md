---
title: "Q: When should continuous media learning use Bayesian experimental design vs Bayesian optimization vs a bandit?"
tags:
  - type/qa
  - topic/market-response
  - topic/bayesian-experimental-design
  - topic/probabilistic-numerics
  - topic/bayesian-statistics
date_asked: 2026-07-01
answered_from:
  - "[[Bayesian Experimental Design - Overview]]"
  - "[[Expected Information Gain]]"
  - "[[Information-Theoretic Design Objectives]]"
  - "[[Bayesian Optimisation]]"
  - "[[Acquisition Functions]]"
  - "[[Value Loss and Entropy Search]]"
  - "[[The Global Optimisation Problem]]"
  - "[[Further Topics in Global Optimisation]]"
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
  - "[[Q- and A-learning - Overview]]"
related_questions:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
aliases:
  - BED vs Bayesian optimization vs bandits
  - When to use experimental design vs optimization vs bandits in media
  - Learn vs optimize vs earn in media experimentation
---

# When should continuous media learning use BED vs Bayesian optimization vs a bandit?

> [!summary]
> All three sit on the *same Bayesian surrogate* of the response surface and differ only in **objective**. **Bayesian experimental design (BED)** maximizes **expected information gain** about the parameters $\theta$ — use it when the deliverable is an *accurate measurement* (attribution, interaction effects, elasticities). **Bayesian optimization (BO)** maximizes an **acquisition function** to find the *best budget allocation* $x_\*$ in as few expensive tests as possible — use it when the deliverable is a *decision*, not a report. A **bandit** maximizes **cumulative reward / minimizes regret** while learning online — use it for *always-on* tactical allocation (creative rotation, bidding) where every impression is both a test and a payout. Rule of thumb: **learn → BED, optimize → BO, earn-while-learning → bandit.** They compose: BED/BO to establish the response surface periodically, a bandit to exploit it continuously.

## Answer

### The one thing they share

Each method maintains a Bayesian posterior over the response surface (an MMM or a [[Gaussian Process Regression|GP]]) and chooses the next action by optimizing an expected quantity under that posterior. What differs is **what expectation they optimize**:

| Paradigm | Optimizes | Objective | Media deliverable |
|----------|-----------|-----------|-------------------|
| **BED** | expected **information** about $\theta$ | $\mathrm{EIG}(\xi)=\mathrm{MI}_\xi(\theta;y)$ ([[Expected Information Gain]]) | accurate effects/interactions, attribution |
| **BO** | expected **improvement** in the objective | acquisition $\alpha(x\mid\mathcal D)$ — EI/UCB/KG ([[Acquisition Functions]]) | the best media mix, found cheaply |
| **Bandit** | expected **cumulative reward** | minimize regret $\sum_t [f(x_\*)-f(x_t)]$ | most revenue while allocating live |

### 1. BED — when the goal is to *learn*

Use BED when the output is a *measurement*: you need trustworthy estimates of channel effects, saturation, and especially cross-channel **interactions** to brief planning. BED explicitly targets the *reduction of parameter uncertainty* ([[Bayesian Experimental Design - Overview]]), and the EIG is "the most common and best-performing" design objective ([[Information-Theoretic Design Objectives]]). Concretely, this is the geo-holdout-as-design workflow of [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]. For continuous programs, [[Sequential and Adaptive BED|adaptive BED]] and amortized [[From Designs to Policies (Deep Adaptive Design)|DAD policies]] pick each successive test.

### 2. BO — when the goal is to *optimize*

Use BO when you don't need the whole response surface, just its **argmax**: the budget split that maximizes revenue/ROAS with the fewest expensive experiments. [[The Global Optimisation Problem]] is exactly "find the global minimiser of an expensive, noisy black-box under an exploration–exploitation trade-off." BO's [[Acquisition Functions|acquisition functions]] — PI, EI, GP-UCB, Knowledge Gradient — encode that trade-off in closed form; [[Value Loss and Entropy Search]] adds information-theoretic acquisitions that value learning *the location of the optimum* specifically. Media-relevant machinery lives in [[Further Topics in Global Optimisation]]: **batch/parallel BO** (launch several geo-tests at once) and **multi-fidelity** (blend cheap correlational reads with expensive clean experiments).

> [!note] BED and BO are two settings of one dial
> BED maximizes information about *all of* $\theta$; entropy-search BO maximizes information about *the optimum $x_\*$ only*. Choose BED to characterize the surface, entropy-search BO to shortcut straight to the best allocation. This is the unifying value-of-information insight from [[Q - Continuous Learning in Media Measurement with Interaction Effects]].

### 3. Bandits — when the goal is to *earn while learning*

Use a bandit for **always-on tactical decisions** — creative/message rotation, real-time bidding, on-site placement — where each action simultaneously *is* the experiment and *earns* (or costs) reward, so you pay for every unit of exploration as **regret**. Bandits (ε-greedy, UCB, Thompson sampling) balance exploration and exploitation to minimize cumulative regret rather than to end with a precise parameter estimate. The vault does **not** yet have a dedicated bandit/Thompson-sampling note (see Gaps), but two anchors connect it to existing content:

- **Shared vocabulary with BO**: the bandit **UCB** rule is the same idea as **GP-UCB** in [[Acquisition Functions]] — an upper-confidence-bound acquisition. BO is essentially a bandit over a *continuous, GP-modeled* arm space; [[Further Topics in Global Optimisation]] notes BO "relates to but differs from reinforcement learning."
- **Sequential decision theory**: choosing actions over time from accumulating history to maximize a long-run objective is the **dynamic treatment regime** problem — [[Q- and A-learning - Overview]], [[Optimal Regime via Dynamic Programming]] (backward induction, Q/value functions). A non-myopic media-allocation policy is a DTR/RL problem; [[From Designs to Policies (Deep Adaptive Design)|DAD]] is its BED-flavored, information-seeking cousin.

### 4. How to choose — and compose

- **Deliverable is a report/attribution** (what does each channel and interaction do?) → **BED**.
- **Deliverable is a one-shot or periodic allocation** with few, expensive tests → **BO**.
- **Deliverable is continuous live allocation** where exploration has direct cost → **bandit**.
- **Myopic vs long-horizon**: greedy EIG/EI are one-step; use **DAD policies** (BED) or **DTR/RL** (bandit side) when tests are frequent and you must be non-myopic.

They are layers, not rivals: run **BED/BO periodically** to (re)learn the response surface and its interactions, then let a **bandit exploit** that surface continuously between refreshes.

### Practical Implications

- Match the tool to the *deliverable*, not the algorithm's popularity: measurement→BED, decision→BO, live money→bandit.
- Reuse one surrogate (MMM/GP) across all three; only swap the objective.
- Watch the **cost of exploration**: BED/BO treat experiments as an investment in information; bandits charge exploration to the P&L as regret in real time.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Bayesian Experimental Design - Overview]] · [[Expected Information Gain]] | The "learn" objective (EIG / mutual information) |
| [[Information-Theoretic Design Objectives]] | EIG as the best design objective; vs Fisher information |
| [[Bayesian Optimisation]] · [[Acquisition Functions]] | The "optimize" objective; PI/EI/UCB/KG closed forms |
| [[Value Loss and Entropy Search]] | Information-theoretic acquisitions (ES/PES/MES) |
| [[The Global Optimisation Problem]] | Exploration–exploitation, regret framing |
| [[Further Topics in Global Optimisation]] | Batch/multi-fidelity BO; BO vs RL |
| [[From Designs to Policies (Deep Adaptive Design)]] | Non-myopic amortized policies (BED side) |
| [[Q- and A-learning - Overview]] · [[Optimal Regime via Dynamic Programming]] | Sequential-decision / DTR analog of bandits/RL |

## Related Concepts

- [[Decision Analysis]] — expected-loss framing shared by all three
- [[High-Dimensional Design Applications]] — scaling the "learn" objective to many dimensions
- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — the loop these three objectives can each drive
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — when experiments/bandits aren't available

## Gaps

- **No dedicated note on multi-armed bandits, Thompson sampling, UCB1, or contextual bandits.** This is the biggest gap for the "earn-while-learning" paradigm; the answer bridges via GP-UCB and dynamic treatment regimes. Consider ingesting a bandits reference (e.g. Lattimore & Szepesvári, *Bandit Algorithms*) or Russo et al., *A Tutorial on Thompson Sampling*.
- **No note on regret bounds** (cumulative vs simple regret) to formalize the bandit objective.
- **BO↔RL relationship** is only mentioned in passing in [[Further Topics in Global Optimisation]].

## Follow-Up Questions

- What would a contextual bandit for creative rotation look like with an MMM/GP as the reward model?
- How do you hand off from a BED/BO "learning" phase to a bandit "earning" phase without discarding the posterior?
- Is Thompson sampling on a GP surrogate equivalent to a randomized entropy-search acquisition?
