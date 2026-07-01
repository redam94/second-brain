---
title: Probabilistic Numerics - Overview
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/overview
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Introduction, pp. 1-16; whole book"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics"
doc_type: textbook
depends_on: []
used_by:
  - "[[Computation as Probabilistic Inference]]"
  - "[[The Numerical Agent]]"
aliases:
  - Probabilistic Numerics
  - PN
  - Hennig Osborne Kersting
  - Computation as Machine Learning
---

# Probabilistic Numerics - Overview

> [!summary]
> **Probabilistic Numerics (PN)** treats a numerical computation — integration, linear algebra, optimisation, differential equations — as a problem of **statistical inference**: place a prior over the intractable latent quantity (an integral, a solution vector, a function optimum, an ODE trajectory), treat each expensive evaluation as data through a likelihood, and return a **posterior** rather than a point estimate. Two insights organise the whole book: (1) *a numerical solver is uncertain about its answer, so its error should be modelled with a probability measure*; (2) *a numerical algorithm is an **agent*** that decides which computations to perform so as to minimise expected loss. A recurring payoff is that many trusted **classical methods (trapezoid rule, Gaussian quadrature, Conjugate Gradients, BFGS, Runge–Kutta) turn out to be the posterior mean of a specific Gaussian inference procedure** — so PN is as fast and reliable as the methods people already use, but additionally reports calibrated uncertainty that can be propagated through pipelines and used to stop early.

## The Book

*Probabilistic Numerics: Computation as Machine Learning*, by **Philipp Hennig, Michael A. Osborne, and Hans P. Kersting** (Cambridge University Press, 2022). This is a draft/pre-publication copy ingested for personal study; see [[raw/ProbabilisticNumerics.pdf]].

The text is organised into seven parts plus a solutions section. Each part first states the numerical problem, then reveals the classical solver as inference, then builds new uncertainty-aware algorithms on that foundation.

## The Two Central Insights

> [!abstract] The thesis in one paragraph
> A numerical method takes in **evaluations** (of an integrand, a matrix-vector product, an objective, a vector field) and returns an **estimate** of a quantity that has no analytic form. Because the estimate is not exact and its error is unknown, we are genuinely *uncertain* about it — and probability is the natural language for that uncertainty (Poincaré, 1896). Moreover, the method must *decide* which evaluations to make; that makes it an **agent** interacting with the CPU/GPU as a source of data, and its decisions can be chosen to minimise an **expected loss**. See [[Computation as Probabilistic Inference]] and [[The Numerical Agent]].

Key framing commitments (Introduction, pp. 9–16):
- **PN adopts a Bayesian view but is not dogmatically Bayesian.** Numerics rarely affords models informed by all prior knowledge; a *loss on computation* dictates which parts of the prior are worth including — closer to the frequentist muddling of loss and prior.
- **Uncertainty ≠ randomness.** PN captures *epistemic* uncertainty (lack of knowledge about a determined-but-unknown number) with probability, and argues that expected-loss-minimising (non-random) decisions usually beat Monte-Carlo randomness for choosing evaluations.
- **Calibration is essential.** A posterior is only useful if its *width* (variance/support) is a trustworthy notion of the method's probable error. Much of the book estimates a remaining scale parameter at runtime with minimal overhead.
- **Imprecise computation is to be embraced.** With calibrated uncertainty we can deliberately spend less computation on the least-important sub-problems (e.g. sub-sampled big data), and harmonise uncertainty across a *pipeline* of computations via graphical-model scaffolding.

## Map of the Vault (routing)

> [!abstract] Where to go
> - The Gaussian inference toolbox everything is built on → [[Foundations/_Index|Foundations]]
> - Integration / Bayesian quadrature → [[Research/Probabilistic Numerics/Integration/_Index|Integration]]
> - Solving linear systems as inference → [[Research/Probabilistic Numerics/Linear Algebra/_Index|Linear Algebra]]
> - Local & global optimisation, Bayesian optimisation → [[Research/Probabilistic Numerics/Optimisation/_Index|Optimisation]]
> - Solving ODEs with filters/smoothers → [[Research/Probabilistic Numerics/Differential Equations/_Index|Differential Equations]]

| Part | Vault sub-topic | Numerical task | Classical method revealed as inference |
|------|-----------------|----------------|----------------------------------------|
| I. Mathematical Background | [[Foundations/_Index\|Foundations]] | — (the Gaussian toolbox) | — |
| II. Integration | [[Research/Probabilistic Numerics/Integration/_Index\|Integration]] | $\int f\,\mathrm{d}\nu$ | Trapezoid, Gauss & Clenshaw–Curtis quadrature → [[Classical Quadrature as Inference]] |
| III. Linear Algebra | [[Research/Probabilistic Numerics/Linear Algebra/_Index\|Linear Algebra]] | solve $Ax=b$ | Conjugate Gradients, Cholesky → [[Conjugate Gradients as Probabilistic Inference]] |
| IV–V. Optimisation | [[Research/Probabilistic Numerics/Optimisation/_Index\|Optimisation]] | $\min_x f(x)$ | Line search, BFGS, Bayesian optimisation → [[First- and Second-Order Optimisation Methods]], [[Bayesian Optimisation]] |
| VI. Differential Equations | [[Research/Probabilistic Numerics/Differential Equations/_Index\|Differential Equations]] | solve $\dot y = f(y,t)$ | Runge–Kutta, multistep → [[Classical ODE Solvers as Regression]], [[ODE Filters and Smoothers]] |
| VII. The Frontier | (in [[Further Topics in ODE Solvers]]) | open problems | — |

## The Unifying Machinery

Every part instantiates the **same Gaussian-inference pattern** from Part I:

1. **Prior**: a Gaussian / Gaussian-process (or Gauss–Markov) measure over the latent object — see [[Gaussian Distributions and Algebra]], [[Gaussian Process Regression]], [[Gauss-Markov Processes and SDEs]].
2. **Likelihood**: a *linear* observation model relating cheap evaluations to the latent object (integration is a linear functional; a matrix-vector product is linear; an ODE residual is an approximately linear constraint).
3. **Posterior**: obtained in closed form by Gaussian conditioning ([[Gaussian Distributions and Algebra]]) or, for time-like structure, by [[Bayesian Filtering and Smoothing]].
4. **Decisions**: choose the next evaluation (node, search direction, matrix probe, step) by minimising expected loss — the [[The Numerical Agent|agent]] view; calibrate the remaining scale via [[Hierarchical Inference in Gaussian Models]].

Because step 3 returns a *distribution*, the same object supports (a) a point estimate that often coincides with a classical method, and (b) an error bar that propagates to the next computation.

## Cross-Cutting Threads

- **Classical method = posterior mean.** The single most repeated result of the book, seen in [[Classical Quadrature as Inference]], [[Conjugate Gradients as Probabilistic Inference]], [[First- and Second-Order Optimisation Methods]], and [[Classical ODE Solvers as Regression]].
- **Filtering is the engine of time-like solvers.** [[Bayesian Filtering and Smoothing]] powers both state-space Gaussian processes and [[ODE Filters and Smoothers]].
- **Active evaluation / value of information.** [[Active Bayesian Quadrature and Bayesian Monte Carlo]], [[Acquisition Functions]], and [[Value Loss and Entropy Search]] all choose evaluations to reduce posterior uncertainty about the quantity of interest.
- **Calibration & computational constraints.** [[Uncertainty Calibration for Linear Solvers]], [[Computational Constraints on Probabilistic Solvers]], and [[Convergence and Priors in Bayesian Quadrature]] address making PN both trustworthy and cheap.
- **Consolidating numerics with statistics.** The deepest payoff (§41.3): a probabilistic ODE solver inside an inverse problem reduces estimator bias — [[Further Topics in ODE Solvers]].

## See Also
- [[Foundations/_Index|Foundations]] — start here for the Gaussian toolbox
- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — the inferential foundations PN borrows
- [[Research/Bayesian Experimental Design/_Index|Bayesian Experimental Design]] — the same expected-information-gain logic that drives active evaluation and acquisition functions
