---
title: Further Topics in Global Optimisation
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/overview
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 34, pp. 275-278"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[Bayesian Optimisation]]"
  - "[[Acquisition Functions]]"
  - "[[Value Loss and Entropy Search]]"
used_by: []
aliases:
  - Batch Bayesian Optimisation
  - Multi-Fidelity Bayesian Optimisation
  - AutoML
  - Parallel BO
  - Bayesian Optimisation Software
---
# Further Topics in Global Optimisation
> [!summary]
> Practical [[Bayesian Optimisation|BO]] extends beyond the single-point loop: **batch/parallel BO** proposes several evaluations at once via a joint distribution over $f(x_B)$; BO relates to but differs from **reinforcement learning**; and its flagship application is **AutoML** (hyperparameter tuning), where PN structure — conditional hyperparameters, partial training-curve information, and **multi-fidelity** (variable training-set size) — can be modelled to accelerate search by orders of magnitude. Mature open-source software (e.g. `emukit`) implements these methods.

## Overview
Chapter 34 surveys the topics that turn BO from a textbook loop into a deployed tool. All build on the surrogate + acquisition framework; the PN framing's payoff is that the *joint probability distribution* over evaluations makes previously ad-hoc extensions (batching, fidelity, conditional structure) principled.

## Main Content
### Batch / parallel evaluation (§34.1)
> [!definition] Batch Bayesian optimisation
> Many objectives permit **simultaneous** evaluations (parallel drug trials, parallel training of ML architectures, agent-based simulations alongside a real trial). Batch BO proposes a *set* of locations $x_B$ **before** knowing any $f(x_B)$. The PN framing supplies an explicit **joint probability distribution over the values $f(x_B)$**, acknowledging their probabilistic relationships — crucial for a good batch, whose desiderata are excluding **redundant** measurements (likely to return the same information) and balancing exploration against exploitation. Batch variants exist for **EI** (a.k.a. *multi-point EI*), **UCB**, **KG**, **PES**, and flexible acquisition families (particularly EI). Batch BO is also the vehicle for approximate **multi-step look-ahead** (see [[Value Loss and Entropy Search]] §32.4): the sequential problem is relaxed to a batch model choosing all future locations at once.
^def-batch

### Relation to reinforcement learning (§34.2)
> [!definition] BO vs. reinforcement learning
> Both address a (partially observed) Markov decision process, but differ:
> 1. **Objective:** RL cares about the return at *every* iteration (a discounted sum of evaluations); optimisation cares only about the *final* returned value, so BO can more acceptably make low-value exploratory evaluations.
> 2. **State:** in RL the agent's evaluations typically *change the objective's state*; in optimisation there is (usually) no state.
> 3. **Method & culture:** RL usually learns a *policy*; BO is explicitly decision-theoretic. RL is often the outer system, BO used *internally* (e.g. to tune RL hyperparameters). BO has also been used *within* RL (alternating Bayesian quadrature to marginalise environment variables with BO for policy search).
^def-rl

### Application: Automated Machine Learning (§34.3)
> [!definition] AutoML / hyperparameter tuning
> BO's most prominent current use is tuning the configuration (especially **hyperparameters**) of other ML algorithms — **AutoML**. The objective is expensive (validation loss / neg-log-likelihood of a model taking hours to train, possibly including cost-per-second), its arguments include regularisation penalties, architecture choices, and internal-numerics parameters (learning rates). Conveniently there are usually $\le10$–$20$ important hyperparameters — dimensionality compatible with BO. BO tuned AlphaGo's hyperparameters for its match against Lee Sedol.
^def-automl

> [!definition] PN structure exploitable in AutoML
> The objective exposes structure that informs prior and loss:
> - **Conditional hyperparameters:** relevance of one hyperparameter may depend on another (e.g. whether "hidden units in layer 3" matters is conditional on "number of layers"). A GP covariance can capture this variable-dimension structure (Swersky et al. 2013).
> - **Partial / early information via training curves:** training a model (local optimisation, Part IV) yields decaying-exponential **learning curves**; even before convergence, early stages predict the ultimate objective value. If the early curve does not promise a competitive value, the computation can be **aborted early**. A joint model over training curves (internal to each evaluation) and the objective (Swersky, Snoek & Adams 2014) exploits this.
> - **Multi-fidelity evaluations:** observations of higher **fidelity** cost more. The canonical example is **training-set size**: a larger training set costs more but is more informative about full-data performance. Treating training-set size as an optimisation variable and building a bespoke BO model (surrogate + cost-aware loss) yields orders-of-magnitude acceleration (Nickson et al. 2014; Klein et al. 2017; McLeod et al. 2015).
^def-automl-structure

### Software (§34.3.1)
> [!definition] Bayesian optimisation libraries
> Dozens of open-source BO libraries exist, most implementing the acquisitions of [[Acquisition Functions]], some specialised to hyperparameter tuning. The text recommends **`emukit`** (Paleyes et al. 2019, `emukit.github.io`) as a full-featured BO sublibrary that *additionally* supports other PN methods.
^def-software

## Examples
> [!example] Multi-fidelity by training-set size
> To tune a classifier, evaluating validation loss on the *full* dataset is expensive. A multi-fidelity BO models the loss as a function of both the hyperparameters *and* the training-set size (fidelity): cheap low-fidelity evaluations on small subsets guide the search, expensive full-fidelity evaluations confirm promising regions. The surrogate captures how low-fidelity results predict full-data performance, and the loss accounts for the variable cost — cutting total compute by orders of magnitude versus always evaluating at full fidelity.

## Connections
- Extends the [[Bayesian Optimisation|BO]] loop and the [[Acquisition Functions|acquisitions]] (batch EI/UCB/KG/PES).
- Batch BO realises the approximate multi-step look-ahead of [[Value Loss and Entropy Search]] §32.4.
- Training curves connect to [[The Local Optimisation Problem|local optimisation]] (Part IV): early-stopping intuition reused as a fidelity signal.
- Concludes Part V of [[Probabilistic Numerics - Overview]]; the next Part (VI) turns to ODEs.

## See Also
- [[Bayesian Optimisation]] — the base loop these topics extend.
- [[Acquisition Functions]] — the single-point acquisitions with batch variants.
- [[Value Loss and Entropy Search]] — multi-step look-ahead and its batch relaxation.
- [[The Local Optimisation Problem]] — training curves as internal, partial-information signals.
