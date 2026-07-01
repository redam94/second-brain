---
title: The Global Optimisation Problem
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 29-30, pp. 245-249"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[The Local Optimisation Problem]]"
  - "[[First- and Second-Order Optimisation Methods]]"
  - "[[The Numerical Agent]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Bayesian Optimisation]]"
  - "[[Value Loss and Entropy Search]]"
  - "[[Acquisition Functions]]"
  - "[[Further Topics in Global Optimisation]]"
aliases:
  - Global Optimisation
  - Exploration-Exploitation Trade-off
  - Black-Box Optimisation
  - Expensive Objective
---
# The Global Optimisation Problem
> [!summary]
> Global optimisation seeks the **global** minimiser $x_*$ of a possibly multimodal, **expensive black-box** objective $f(x)\in\mathbb{R}$ where gradients may not exist or be too costly, and each evaluation may be noisy. Because the search domain is enormous and uniformly high-uncertainty, the core challenge is the **exploration–exploitation trade-off**: honing in on known-good regions vs. probing high-uncertainty regions for improbable, high-payoff discoveries. Managing this trade-off *requires* a probabilistic **surrogate** model of the objective — the entry point for [[Bayesian Optimisation]].

## Overview
Local optimisation (Part IV) finds the extremum of a (assumed-convex) objective; on a multimodal objective it converges only to the mode nearest its start. **Global optimisation** instead targets $f(x_*):=\min_x f(x)$ over *all* local modes — a much harder problem. Bayesian optimisation is the probabilistic-numerical approach to it, and is *exceptional* among PN methods: it was conceived from a probabilistic viewpoint from its inception (no direct non-probabilistic predecessor, traced to Kushner 1962), and is already mature, popular and economically impactful (by citations, competition results, library usage). Applications span robotics, sensor networks, environmental monitoring, software engineering, and hyperparameter tuning.

## Main Content
### The setting
> [!definition] Global optimisation
> Given an objective $f(x)\in\mathbb{R}$ (w.l.o.g. minimisation; maximise by minimising $-f$), possibly multimodal, find the **global minimiser** $x_*$ with $f(x_*):=\min_x f(x)$ — the minimum over *all* local modes. The objective:
> - may be **expensive** to evaluate (time, money, computation), limiting the evaluation budget;
> - may be evaluated only with **observation noise**;
> - may lack usable **gradients** (non-existent or too costly);
> - lives on a domain $X$ (commonly $X\subset\mathbb{R}^d$ compact, but possibly discrete, graph- or string-valued).
>
> Note $f$ may have no minimum at all in general, but $\min_x f(x)$ is defined if $f$ is continuous and the domain compact.
^def-global-opt

### Exploration vs. exploitation
> [!definition] Exploration–exploitation trade-off
> - **Exploitation:** an evaluation with high probability of improvement — a low-risk move near a known low value, expected to yield an (often incremental) improvement. Exploitation hones in on a local mode, as local optimisation would.
> - **Exploration:** an evaluation in a region of high uncertainty — high-risk, may yield *no* improvement, but warranted by improbable, high-payoff possibilities such as discovering an entirely new local mode.
>
> Exploration is **hard**: the search domain is normally enormous and begins uniformly high-uncertainty (e.g. $[0,1]^D$ has $2^D$ corners — $>10^6$ for $D=20$). Existing evaluations are few, "like stars dotted in the void"; the challenge is sifting the mass of uncertainty for the evaluation that best promises reward. This mirrors intelligent behaviour (creativity, venture capital, finding lost keys) and motivates sophisticated algorithms.
^def-explore-exploit

### Why a surrogate is needed
Correctly reasoning about **uncertainty in unvisited regions** is what drives exploration — hence a *probabilistic* model of the objective is essential. This model, a **surrogate**, is the global-optimisation equivalent of the *model* in [[Bayesian Quadrature|numerical integration]]. Predominantly a [[Gaussian Process Regression|Gaussian process]] (encoding structure such as smoothness), it: (i) accommodates noisy evaluations, and (ii) supplies the uncertainty assessment that governs exploration. Without structure, optimisation could be no better than finding a needle in a haystack.

Relative to local optimisation, global optimisation typically: is **less amenable to theoretical treatment**; requires **more computation for the optimisation process itself** (justifiable only when objective evaluations are very expensive); and **scales poorly in dimension** (reliable in practice only for $\lesssim 20$ relevant inputs). The real world is often more complex than convex, and a "zoo" of competing global optimisers exists — evolutionary methods, branch-and-bound, Monte-Carlo — but Bayesian optimisation is the principled probabilistic member.

## Examples
> [!example] Three evaluations in the void (Fig. 30.1)
> An expensive objective $f(x)$ on $x\in[-5,5]$ has been evaluated (with noise error bars) at just three locations. The rest of the domain is entirely uncertain. The optimiser must choose future evaluation locations to determine $x_*$ and/or $f(x_*)$ under a tight budget. A [[Gaussian Process Regression|GP]] surrogate turns these three points into a posterior mean, marginal uncertainties (shading), and — crucially — an (intractable) probability density over the *location* of the minimum, which concentrates the decision problem.

## Connections
- Contrasts with [[The Local Optimisation Problem]]: global vs. local minimum; expensive black box (sample efficiency) vs. cheap steps.
- Motivated at the end of [[First- and Second-Order Optimisation Methods]]: when a full ML pipeline is the objective, *sample* efficiency dominates and the problem becomes experimental design.
- The surrogate is a [[Gaussian Process Regression|GP]] (as in [[Bayesian Quadrature]]); the exploration/exploitation decision is an [[The Numerical Agent|agent]] action.
- Directly sets up [[Bayesian Optimisation]] (the loop), [[Value Loss and Entropy Search]] and [[Acquisition Functions]] (the loss/decision rules), and [[Further Topics in Global Optimisation]].

## See Also
- [[Bayesian Optimisation]] — the surrogate-plus-acquisition loop that solves this problem.
- [[The Local Optimisation Problem]] — the local counterpart and its limitations.
- [[Acquisition Functions]] — concrete decision rules balancing exploration and exploitation.
- [[Value Loss and Entropy Search]] — loss functions framing the goal of optimisation.
