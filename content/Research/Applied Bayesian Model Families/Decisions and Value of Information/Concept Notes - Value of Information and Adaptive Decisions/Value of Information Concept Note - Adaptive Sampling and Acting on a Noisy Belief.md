---
title: "Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (cites the literature listed under Sources)"
source_location: "Literature synthesis (see Sources)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions"
doc_type: paper
depends_on:
  - "[[Acquisition Functions]]"
  - "[[Bayesian Optimisation]]"
  - "[[Hilbert Space Gaussian Processes]]"
  - "[[Multi-Armed Bandits and Thompson Sampling - Overview]]"
used_by:
  - "[[Research/Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions/_Index|Index for this source]]"
aliases:
  - Adaptive survey on a noisy belief
  - Acting on a noisy belief
---

# Value of Information Concept Note - Adaptive Sampling and Acting on a Noisy Belief

> [!summary]
> Concept note, no raw source. When a survey chooses the next measurement location from a posterior it has itself updated, the policy acts on a *noisy belief*: exploration rules such as UCB or Thompson sampling trade the posterior mean against posterior uncertainty. With a known kernel, adaptivity adds nothing for variance-based objectives (Krause et al.); with unknown hyperparameters or mean-based goals it can matter, and a policy is best evaluated by counterfactual replay on logged data.

## Overview

E100 (**Acting on a noisy belief: an adaptive radiation survey**) uses Safecast bGeigie volunteer radiation logs around Iitate and Minamisoma, 2011-2013 (301,693 readings) with "cleaning duplicated citizen-science logs, decay correction, an HSGP field with trip effects and Student-t noise, predictive checks that catch trip noise, counterfactual replay that reveals one real reading per stop, UCB". This note connects those steps to the decision-theory and active-learning notes already in the vault.

## Main Content

> [!definition] Adaptive survey policy
> At step $t$ with posterior $p_t(f)$ over the field, choose $x_t=\arg\max_x a_t(x)$ for an acquisition score $a_t$, observe $y_t=f(x_t)+\epsilon_t$ (noise $\epsilon_t$ possibly heavy-tailed and trip-correlated), update. Examples: GP-UCB, $a_t(x)=\mu_t(x)+\sqrt{\beta_t}\,\sigma_t(x)$ (Srinivas et al. 2010); Thompson sampling, $a_t(x)=\tilde f(x)$ for $\tilde f\sim p_t$ ([[Multi-Armed Bandits and Thompson Sampling - Overview]]); expected improvement and entropy search ([[Acquisition Functions]], [[Bayesian Optimisation]]).
^def-adaptive-policy

> [!theorem] When adaptivity is free (Krause et al., Sec. 10)
> If the kernel is known and the objective is the posterior variance (or MI), $\sigma^2_{*|A}$ does not depend on observed values, so the best sequential strategy equals the best fixed design. With uncertain kernel parameters (and for objectives that depend on the observed values, such as finding hot spots) closed-loop strategies can do better ([[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]]).
^thm-adaptivity-free

**Noisy belief.** The belief is noisy in three ways: posterior uncertainty about $f$; model misspecification (trip effects, Student-$t$ outliers, duplicated logs); and sample-path noise in the policy itself. Heavy tails mean a Gaussian likelihood overreacts to outliers, so a policy chasing high readings can be lured to bad data; robust likelihoods and posterior predictive checks guard against it ([[Posterior Predictive Checking]]).

**Counterfactual replay.** To evaluate a policy offline from logged data one can replay the policy over the logged locations and score it only where a real reading exists. The example index notes that replay "reveals one real reading per stop", so the policy's score is based on observed readings at the points it chooses among logged stops; unlogged choices cannot be evaluated. This is the same limitation as off-policy evaluation in bandits.

**Value of information view.** UCB's bonus $\sqrt{\beta_t}\sigma_t(x)$ is a heuristic for the option value of learning at $x$; EVSI gives the exact one-step version, the knowledge gradient (see [[Value of Information Concept Note - EVPI, EVPPI and EVSI]]).

## Examples

Toy numbers: two sites with posterior $N(1.0,0.1^2)$ and $N(0.8,0.5^2)$; UCB with $\sqrt\beta=1$ scores 1.1 vs 1.3 and explores site 2. The one-step EVSI for site 2 with threshold 1.0 is positive because its posterior straddles the threshold with larger spread.

```python
import numpy as np
def ucb_pick(mu, sd, sqrt_beta=1.0):
    return int(np.argmax(mu + sqrt_beta*sd))
print(ucb_pick(np.array([1.0, 0.8]), np.array([0.1, 0.5])))   # 1
```

PyMC-style sketch (untested): HSGP field `gp = pm.gp.HSGP(m=[30], c=1.5, cov_func=cov)`, trip effects as a hierarchical intercept, `pm.StudentT` likelihood; acquisition on posterior draws of `f` at candidate locations.

## Connections
- Marketing: adaptive allocation of a test budget across markets from a noisy posterior is a bandit with delayed, noisy rewards; Thompson sampling and UCB are the usual rules.
- Decision value: [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]].

## See Also
- [[Acquisition Functions]], [[Bayesian Optimisation]], [[Hilbert Space Gaussian Processes]], [[Multi-Armed Bandits and Thompson Sampling - Overview]]

## Sources
- Srinivas, Krause, Kakade and Seeger (2010), Gaussian process optimization in the bandit setting, ICML (citation from memory; verify). Krause et al. (2008), Sec. 10. E100 method list at <https://redam94.github.io/pymc-challenges/examples.html>.
