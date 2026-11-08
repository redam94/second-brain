---
title: "Chen 2018 - Scope, Limitations and Statistical Use"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/concept
  - doc/paper
source: "[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]"
source_location: "Sec. 6-8, pp. 8-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chen 2018 - Neural ODEs"
doc_type: paper
depends_on:
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
  - "[[Chen 2018 - Latent ODE Time-Series Model]]"
used_by:
  - "[[Chen 2018 - Neural ODEs - Overview]]"
aliases:
  - neural ODE limitations
  - Picard uniqueness for neural ODEs
---

# Chen 2018 - Scope, Limitations and Statistical Use

> [!summary]
> The authors list four practical caveats (minibatching, uniqueness, tolerance choice, backward reconstruction error) and position the work among reversible nets, learned differential equations, GP-ODE links and ODE-sensitivity code in Stan and dolfin. The statistician's reading: gradients through a solver are cheap, but identifiability, solver error and non-uniqueness of weights are your problem, not the solver's.

## Overview

Sections 6-8 are short but contain the conditions under which the method is valid and where it is positioned relative to existing differentiable-ODE tools (including Stan's).

## Main Content

> [!theorem] Uniqueness of solutions (Picard-Lindelof, Sec. 6)
> The initial value problem $\dot z=f(z,t)$, $z(t_0)=z_0$ has a unique solution if $f$ is uniformly Lipschitz in $z$ and continuous in $t$ (Coddington & Levinson 1955). This holds for neural-network vector fields with finite weights and Lipschitz nonlinearities such as $\tanh$ or ReLU.
^thm-picard-uniqueness

| Issue (Sec. 6) | Statement | Practical consequence |
|---|---|---|
| Minibatching | Batch by concatenating states into one ODE of dimension $D\times K$; controlling error across all elements could require $K$ times more evaluations than solving individually, but in practice evaluations did not rise substantially. | Batched likelihoods over many subjects (population models) share one step-size sequence. |
| Uniqueness | See theorem above. | Trajectories cannot cross in state space; a planar neural ODE cannot represent some maps. |
| Tolerances | User must pick error tolerance for forward and reverse passes. Sequence modelling used the default $1.5\times10^{-8}$; classification and density estimation worked down to $10^{-3}$ and $10^{-5}$ respectively. | Too-loose forward tolerance corrupts the likelihood and gradients that NUTS/HMC rely on. |
| Reverse reconstruction | Re-integrating $z$ backward can introduce error if the reconstruction diverges from the forward path; remedy is checkpointing (store intermediate $z$ and re-integrate from them). The authors found it not a practical problem and checked that reversing many CNF layers recovered initial states. | For chaotic dynamics (positive Lyapunov exponent) this is a real problem; see [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]]. |

### Related work (Sec. 7), organized

| Theme | Cited work (as summarized in the paper) | Contrast |
|---|---|---|
| Adjoint for neural nets | LeCun et al. 1988; Pearlmutter 1995 | proposed, not demonstrated practically |
| Reversible / constant-memory nets | Gomez et al. 2017; Haber & Ruthotto 2017; Chang et al. 2017 | require restricted architectures that partition hidden units |
| Adaptive computation | Graves 2016; Figurnov et al. 2017; etc. | extra networks and parameters; ODE solvers have well-studied, cheap rules |
| Learning differential equations | Raissi & Karniadakis 2018; GPs with ODE solvers (Schober et al. 2014) | see [[Solving ODEs as Inference]] and [[ODE Filters and Smoothers]] |
| Differentiating through ODE solvers | dolfin (backprop through solver ops); **Stan** (forward sensitivity analysis, quadratic in the number of variables) vs adjoint (linear) | the paper provides a generic VJP so a solver composes with any differentiable component |

## Statistical use (editorial synthesis, not claims of the paper)

> [!warning] Not from the paper
> The following links the paper to Bayesian modelling practice and is the author's reading.

1. **Forward vs adjoint sensitivities.** For a handful of parameters and a small state, forward sensitivities (Stan, Torsten, `diffrax` forward mode) are simple and exact; adjoint wins when parameters are many (a neural-network vector field), as in universal differential equations ([[Universal Differential Equations and Scientific ML (Concept Note)]]).
2. **Bayesian inference over a neural vector field** has non-identified weights (permutation/sign symmetries), so weight-space $\hat R$ is meaningless; diagnostics belong in function (trajectory) space. See [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]].
3. **Solver error is part of the likelihood.** With loose tolerances HMC sees a noisy or biased potential energy; either tighten tolerances or model solver uncertainty ([[ODE Filters and Smoothers]]).
4. **Deterministic latent trajectories.** Latent ODEs have no process noise; if the data show stochastic variation in dynamics, SDE models are needed ([[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]]).

## Examples

**Choosing a tolerance by sensitivity (recipe).** Fit with `rtol=1e-3`, compute the log-likelihood and its gradient at the posterior mode; repeat at `1e-6`, `1e-9`. Accept the largest tolerance for which the log-likelihood differs by well under 0.1 and the gradient direction is unchanged. Applies to any ODE likelihood.

## Connections

[[HMC and Stan in Practice]], [[Efficient MCMC]], [[Automatic Differentiation Variational Inference (ADVI)]].

## See Also

[[Chen 2018 - Neural ODEs - Overview]], [[Chen 2018 - ODE-Nets for Supervised Learning]].
