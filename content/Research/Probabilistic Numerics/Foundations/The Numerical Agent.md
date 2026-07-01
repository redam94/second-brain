---
title: The Numerical Agent
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Introduction, pp. 2-16"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Computation as Probabilistic Inference]]"
used_by:
  - "[[Active Bayesian Quadrature and Bayesian Monte Carlo]]"
  - "[[Probabilistic Step-Size Selection and Line Searches]]"
  - "[[Bayesian Optimisation]]"
  - "[[Value Loss and Entropy Search]]"
  - "[[Acquisition Functions]]"
  - "[[Probabilistic Numerics - Overview]]"
aliases:
  - Numerical Solver as Agent
  - Decision-Theoretic View of Numerics
  - Autonomous Numerical Agents
---
# The Numerical Agent
> [!summary]
> The second central insight of PN: a numerical algorithm is an *agent*. It receives evaluations (data), forms beliefs, and *decides its own actions* — which nodes to evaluate next — so as to minimise an expected loss. Quantified (probabilistic) uncertainty is what makes those decisions principled: it drives exploration, weighs the value of an iteration against its cost, and enables **early stopping**. PN insists uncertainty must not be identified with randomness — an expected-loss-minimising action is deterministic and would never be returned by a random number generator.

## Overview
Traditionally a numerical method is seen as a passive map: data (evaluations) in, estimate out. But a method must *also* decide *which* computations to perform — which integrand nodes, which search points, which step sizes. These decisions form a feedback loop: an agent that chooses its own data can be inefficient (collecting redundant data) or unreliable (neglecting informative regions). PN treats numerical algorithms exactly as machine learning treats its algorithms — as **agents** interacting with a source of data. In the book's framing (Figure 1), a computational agent interacts with "numerics" (the CPU/GPU as an interactive data source) just as a reinforcement-learning or active-learning agent interacts with the world: it receives evaluations and selects computations (actions) to perform.

This view is not merely aesthetic. It directly motivates *adaptive* algorithms whose evaluation rule is derived from their internal probabilistic beliefs. And it depends on the first insight, [[Computation as Probabilistic Inference]]: only a probabilistic solver has calibrated beliefs on which to base decisions.

## Main Content
> [!definition] Probabilistic numerical agent
> A **numerical agent** is an entity that takes actions to achieve a goal. It (i) receives *evaluations* $y$ (integrand values, gradients, matrix–vector products) from the computational source; (ii) maintains a probabilistic belief — a posterior $p(x\mid y)$ over the intractable solution $x$ (see [[Computation as Probabilistic Inference]]); and (iii) selects the next **action** $a$ (which node/point/step to evaluate) as the one minimising an **expected loss**
> $$
> a^\star = \arg\min_{a}\; \mathbb{E}_{p(\,\cdot\,\mid y)}\big[\,\ell(a)\,\big],
> $$
> where $\ell$ scores outcomes (e.g. residual error, or the negative *information value* of the evaluation minus its computational cost). The way the agent later *combines* collected numbers into an estimate is interpreted as a posterior expectation; the *rule for choosing* those numbers arises from the same probabilistic model via decision theory. A classical numerical method can thus be read as an **autonomous agent acting consistently with its internal probabilistic beliefs**.
^def-numerical-agent

### What uncertainty buys the agent
> [!definition] Roles of quantified uncertainty
> 1. **Early stopping.** Unlike evaluating an analytic expression, a numerical procedure has no obvious end: the current error is unknown. Generic methods therefore run many cautious iterations to guarantee high precision, consuming computation. A well-calibrated posterior lets the agent stop as soon as its uncertainty is acceptably small — trading precision for cost deliberately.
> 2. **Exploration.** An intelligent agent occasionally "gambles" on an uncertain action to learn. Predictive uncertainty quantifies the *value* of a numerical iteration, weighed against its real cost; not all iterations are equal, and choosing where to evaluate is a cost–benefit optimisation.
> 3. **Reliable self-assessment / bias control.** A well-designed agent gives a reliable estimate of its own uncertainty, reducing bias in downstream computations (e.g. an ODE forward solve inside an inverse problem: honest uncertainty helps the outer loop explore parameter space efficiently even if the inner estimate is not more precise).
^def-uncertainty-roles

### Numerics should not be random
> [!definition] Uncertainty ≠ randomness
> Probability theory makes no formal distinction between **aleatory/stochastic** uncertainty (randomness) and **epistemic** uncertainty (lack of knowledge): both are spreads of unit measure over hypotheses. But randomness is only one *source* of uncertainty. Some concepts — notably **bias** — require carefully separating the two types. Randomness is often used within numerics to make hard decisions (e.g. where to evaluate); PN argues this is ill-suited, because an expected-loss-minimising action is deterministic and will *never* be produced by a random number generator. Non-random, expected-loss-minimising decisions promise dramatically lower computation. This is not a wholesale rejection of Monte Carlo but exposes deep subtleties in it.
^def-uncertainty-not-randomness

## Examples
> [!example] Bayesian optimisation as the paradigm agent
> An optimiser feeds evaluations of an objective to itself and, at each step, uses its posterior belief about the objective to choose the next query point via an **acquisition function** (expected improvement, entropy search, etc.) — the concrete expected-loss / value-of-information rule. This *is* the numerical-agent template, and it predates the wider PN movement. See [[Bayesian Optimisation]], [[Acquisition Functions]], [[Value Loss and Entropy Search]].

> [!example] Probabilistic line search
> In optimisation, choosing a step size is a one-dimensional decision. A probabilistic line search maintains a GP belief over the objective along the search direction and *decides* when the Wolfe conditions are satisfied with enough confidence to stop — an agent making an early-stopping decision under uncertainty. See [[Probabilistic Step-Size Selection and Line Searches]].

> [!example] Active quadrature node selection
> An integration agent chooses evaluation nodes $t_i$ to most reduce its posterior variance on $\int f\,\mathrm{d}t$, rather than using a fixed grid — the value-of-computation trade-off in action. See [[Active Bayesian Quadrature and Bayesian Monte Carlo]].

## Connections
- Depends on and complements [[Computation as Probabilistic Inference]]: inference supplies the beliefs; the agent view supplies the decisions.
- The decision-theoretic machinery (acquisition/loss functions) is developed in [[Acquisition Functions]] and [[Value Loss and Entropy Search]].
- The randomness-vs-uncertainty argument recurs when contrasting PN with Monte Carlo in [[Active Bayesian Quadrature and Bayesian Monte Carlo]].

## See Also
- [[Computation as Probabilistic Inference]] — the belief side of the agent.
- [[Bayesian Optimisation]] — the canonical numerical agent.
- [[Probabilistic Step-Size Selection and Line Searches]] — agent decisions in local optimisation.
- [[Probabilistic Numerics - Overview]] — top-level map.
