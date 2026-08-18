---
title: "Challenge of Multimodality - Differential Equation for Planetary Motion"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 30, pp. 463-470 (Figures 30.1-30.5)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Failure Modes and Steps Forward]]"
  - "[[What to Do About Convergence Problems]]"
  - "[[Initial Values, Adaptation, and Warmup]]"
  - "[[Variational Inference and Pathfinder]]"
  - "[[Fitting Simpler Models for Computational Purposes]]"
  - "[[Topology of Models]]"
used_by:
  - "[[Stacking and Predictive Model Averaging]]"
aliases:
  - Planetary Motion case study
  - Multimodality case study
  - Pathfinder initialization example
  - Bad Markov chain slow Markov chain
---

# Challenge of Multimodality: Differential Equation for Planetary Motion

> [!summary]
> A mechanistic ODE model of a planet orbiting a star, fit to simulated data, where HMC fails dramatically: chains stick in local modes, runtimes range from ~2 seconds to ~2000 seconds, and $\hat{R} > 2$. The diagnosis requires physics, not just statistics — the tail modes are **approximate aliasing from the cyclical orbit**, a mathematical artifact carrying negligible probability mass. The fix is not a stronger prior (the wiggles survive, and *strengthen with more data*) but **Pathfinder initialization**, which turns 2000-second stuck chains into 1-second clean ones by failing fast on the minor modes.

## Overview

This chapter starts with a complicated model, hits inference problems, and works out what is going on. Its stated purpose is to show that **the workflow draws on both statistical and field expertise** and that it **is not an automated process — each step requires careful reasoning**. Finding the right visualization is repeatedly the key to understanding the model, its limitations, and how to improve it. The chapter monitors intermediate quantities (Section 12.4) and makes extensive use of predictive checks (Sections 5.9 and 8.2), and demonstrates the benefits of Pathfinder (Zhang, Carpenter, et al. 2022) for a multimodal posterior.

## Main Content

### The mechanistic model

A mechanistic model based on classical mechanics is chosen deliberately: it allows estimating quantities of **physical interest** such as stellar mass, applying **domain knowledge** more readily, and tracking the planet's trajectory in space and time.

> [!definition] Hamilton's formulation of the two-body problem
> Newton's laws as a system of two first-order differential equations:
> $$
> \frac{dq}{dt} = \frac{p}{m}
> $$
> $$
> \frac{dp}{dt} = -\frac{k}{r^3}(q - q^*)
> $$
> where
> - $q(t)$ is the planet's position vector over time,
> - $p(t)$ is the planet's momentum vector over time,
> - $m$ is the planet's mass (assumed 1 in some units),
> - $k = GmM$ with $G = 10^{-3}$ the gravitational constant in these units and $M$ the stellar mass, hence $k = 10^{-3} M$,
> - $r = \sqrt{(q-q^*)^t(q-q^*)}$ is the star-planet distance, with $q^*$ the star's fixed position.
>
> The planet moves on a plane, so $p$ and $q$ are each length-2 vectors. **Change in position is determined by momentum; change in momentum is driven by gravity.**
^def-hamilton-planetary

**Target of inference:** the gravitational force between star and planet, in particular the latent variable $k$. Other latents: initial position $q_0$ and momentum $p_0$, the subsequent positions $q(t)$, and the star's position $q^*$. (An astronomer would realistically use cylindrical coordinates; Cartesian is used for simplicity.)

**Data model** — positions recorded at regular intervals $t_1,\ldots,t_n$, each observation two-dimensional with independent normal errors:
$$
q_{\text{obs},i} \sim \text{MVN}\!\left(q(t_i),\ \sigma^2 I\right)
$$

Following the general workflow, the model is fit to **simulated data** to check parameter recovery, using Stan's numerical ODE solver. **The first attempt fails dramatically: the chains do not converge and take a long time to run.** That is the invitation to simplify — still in the controlled setting of simulated data, where every true value is known.

### The simplified model and its symptoms

The simplification: **estimate only $k$**, with prior $k \sim \text{normal}^+(0,1)$ and true value $k = 1$. Everything else is pinned at truth: $m = 1$, $q^* = (0,0)$, $q_0 = (1,0)$, $p_0 = (0,1)$.

> [!tip] Use MCMC even when quadrature would suffice
> The parameter space is one-dimensional, so the posterior could be computed by quadrature. MCMC is used anyway **because the goal is to understand the challenges that frustrate the sampling algorithm** — not to get the answer.

Running 8 chains × (500 warmup + 500 sampling):

- **Runtime varies from ~2 seconds to ~2000 seconds across chains.** Not necessarily a concern by itself, but it indicates the chains are behaving in substantially different ways.
- **$\hat{R}$ is large for some parameters.** The book's thresholds: comfortable with $\hat R < 1.01$; **$\hat R > 2$ indicates the chains are not mixing well.**

Traceplots (Figure 30.1) show chains stuck at local modes, not cohesively exploring the posterior. Some chains sit at much lower log posterior density than others, and posterior predictive checks for *those specific chains* show simulated data inconsistent with observations. **The chains with the lowest log posterior and highest $k$ are also the slowest.**

> [!tip] Plot the warmup iterations
> Departing from Stan's defaults, the authors plot **iterations during the warmup phase** as well. The plot then clearly shows that **which mode a chain converges to is determined by its initial value** — these modes are strongly attractive for the Markov chain. "A good plot can help us diagnose the problem almost instantaneously, but unfortunately, and despite our best efforts, **the default plot need not be that good plot**."

### The decisive question: real phenomenon or mathematical artifact?

> [!warning] The question to ask about any multimodality
> **Do these modes describe a latent phenomenon of interest that must be accounted for, or are they caused by a mathematical artifact?** The answer determines whether you should try to explore all modes or eliminate them. Because a simplified model is being fit, this can be worked out exactly and the insight carried back to the elaborate model.

Figure 30.2 plots the quadrature-computed likelihood across $k$ and confirms local modes: a dominating mode near $k=1$, followed by minor modes as $k$ increases. The mechanism follows from reading the log likelihood as a distance penalty:

$$
\log p(q_{\text{obs}} \mid k) = C - \frac{\|q_{\text{obs}} - q(k)\|_2^2}{2\sigma^2}
$$

with $C$ not depending on $k$.

> [!example] How the tail modes arise — approximate aliasing from a cyclical orbit
> **Setup (Figure 30.3):** simulate the planet's motion at $k = 0.5, 1.0, 1.6, 2.16, 3.0$. $k$ controls the strength of gravitational interaction: **a higher value implies a closer and shorter orbit.** True value $k = 1$.
>
> **Behavior on each side of the truth:**
> - For $k < 1$, the trajectory **can drift arbitrarily far** from the observed ellipse — so the likelihood falls away without structure.
> - For $k > 1$, the simulated ellipse **must be contained inside the observed ellipse**, which *bounds* the distance between $q_{\text{obs}}$ and $q$.
>
> **The mechanism:** as $k$ changes and the ellipse rotates, **some observed and simulated positions happen to come relatively close by chance**, inducing local modes that appear as wiggles in the tail of the likelihood. Concretely, the 35th observation (on the $k=1$ orbit) is closer to the position simulated with $k = 2.2$ than to the one simulated with $k = 1.6$.
>
> **Interpretation:** parameter values at these modes do **not** produce simulations in close agreement with the data — they merely do better than their *neighboring* parameter values, which is enough to create a bump. This is **approximate aliasing induced by the periodic structure of the data**.
>
> **Verdict:** the tail modes are a **mathematical artifact** and do **not** characterize a latent phenomenon of interest. Moreover they **contribute only negligible probability mass**. Hence any chain that does not focus on the dominating mode is wasting computational resources.

### Bad Markov chain, slow Markov chain?

The chains with the lowest log posteriors were the slowest — an instance of the **folk theorem of statistical computing** (Section 12.4; see [[Failure Modes and Steps Forward]]).

**Why, mechanically:** Hamilton's equations become harder to solve as $k$ increases. If the gravitational interaction is strong, the planet moves much faster, so each time step $dt$ incurs a greater change in $q(t)$ and the integrator's step size must shrink accordingly.

> [!tip] An easy deterministic problem can become difficult in a Bayesian analysis
> Bayesian inference requires solving the problem **across a range of parameter values**, so you must sometimes confront unsuspected versions of it. In the authors' experience with ODE models in pharmacology and epidemiology, a **more computationally expensive stiff solver** is sometimes required to handle difficult ODEs generated during warmup.
>
> For other problems, slow computation is a signal that **inference is allowing absurd parameter values** and that better priors or more reasonable initial points are needed. Unfortunately this **cuts against the "fail fast" principle** — we would prefer to flag problems quickly rather than spend time on dead ends.

### Three fixes considered, and their limits

**1. Building stronger priors — does not work here.**

One could encode that high $k$ is implausible, or that any data-generating process implying several orbits over the observation window is unlikely. When such information exists, stronger priors do improve computation. **But not here:**

> [!warning] Why a stronger prior fails against this multimodality
> A stronger prior would reduce the density at the minor modes, **but the wiggles in the tail of the joint would persist.** Paradoxically, **with more data these wiggles become stronger: the target function is fundamentally multimodal.** The current prior $k \sim \text{normal}^+(0,1)$ is **already inconsistent** with the values $k$ takes at the minor modes — and the chains get stuck there anyway. In principle one could go further and add a **hard constraint on orbital time or velocity** to remove the modes outright.

**2. Reweighting draws from each chain — partial.**

The chains fail to transition between modes, so some chains sample a region of low probability mass. A reweighting scheme such as **stacking** (Yao, Vehtari, and Gelman 2022; see [[Stacking and Predictive Model Averaging]]) can correct the Monte Carlo estimate. Two caveats: (i) 8 chains will not comprehensively explore all the modes, so **stacking here should really be treated as discarding the chains stuck at local modes**; and (ii) **the computational price is still paid** — chains in minor modes take up to ~1000× longer to run.

**3. Tuning the starting points — helps, but risks ad-hockery.**

> [!warning] Stan's default initialization is a tuning parameter you cannot ignore
> The default at the time sampled the initial point from $\text{uniform}(-2,2)$ **over the unconstrained space** — that is, $\log k^{(0)} \sim \text{uniform}(-2,2)$. Designed for unconstrained parameters on the unit scale, this **indulges values of $k$ wildly inconsistent with the prior and with domain expertise.** In a non-asymptotic regime the chain does not always forget its starting point, and here it is unlikely to do so even with many more iterations.
>
> The alternative — sampling $k^{(0)}$ from the prior — makes more chains converge quickly, but **some still get stuck**. Further manual tuning of initial values **risks ad-hoc overfitting**.

### Pathfinder to the rescue

> [!definition] Pathfinder (Zhang, Carpenter, et al. 2022)
> Approximates the posterior with a **mixture of normal distributions**. It runs a fast quasi-Newton **L-BFGS** optimizer and chooses the best normal approximation along the optimization path, where "best" means **minimizing the Kullback–Leibler divergence between the approximation and the posterior**. **Multi-Pathfinder** runs many paths in parallel and uses draws from all the resulting normal approximations as **importance-sampling proposals** to obtain approximate posterior draws.
> See [[Variational Inference and Pathfinder]].
^def-pathfinder-multimodal

> [!tip] Why Pathfinder beats MCMC on a multimodal target
> **Pathfinder is also vulnerable to multimodality** — some paths get caught in minor modes. The difference is that **each path is cheap even when it is caught**: draws from paths in negligible-density modes are discarded by the importance sampling, while draws from paths reaching the major mode are kept and used to initialize MCMC. **In those failure cases Pathfinder fails fast, unlike MCMC**, which pays ~1000× runtime to stay stuck.

**Simplified model, results:**
- 40 Pathfinder paths from Stan's default $\text{uniform}(-2,2)$ initialization, with importance sampling using the mixture of returned normals as proposal: **15 seconds**.
- **10 of 40 runs failed — "but this is not a problem as these runs failed fast!"**
- Random Pathfinder draws as MCMC initial values: **sampling for all eight chains takes 1 second**, and all convergence diagnostics are satisfactory.

### The full model

Estimating the star's position $q^*$ as well, the chains converge to many different values, with simulations that agree or disagree with observations depending on the chain. Unlike the simplified model, **traceplots show no obvious connection between starting points and neighborhoods of convergence** — hard to examine, since the model now has **7 parameters, some with strong posterior correlations**.

> [!tip] Reason about the physics to locate the degeneracy
> From $\frac{dp}{dt} = -\frac{k}{r^3}(q - q^*)$: **both $k$ and $r$ control the gravitational interaction.** So tweaking $q^*$ — and implicitly the star-planet distance $r$ — has an effect **similar to modifying $k$**. That conjecture predicts the same aliasing structure in $q^*$.

Verification: numerical integration over all 7 parameters is infeasible, so examine the **conditional likelihood of $q^*$** with $k$, $q_0$, and $p_0$ held fixed — yet another simplification. Figure 30.4 shows the suspected modes in both the one-coordinate slice (varying only the $x$-coordinate of $q^*$) and the two-coordinate surface, **confirming the conjecture**. Quadrature is what exposes the multimodality.

**Full model, results:**
- 40 Pathfinder paths, again initialized from $\text{uniform}(-2,2)$ to illustrate robustness: **3 seconds**. **29 of 40 paths fail — but they fail fast.**
- The **Pareto $\hat{k}$ diagnostic** (Vehtari, Simpson, et al. 2024) indicates the resulting approximation is good.
- MCMC with 8 Pathfinder-initialized chains: **25 seconds**, all convergence diagnostics good.
- Figure 30.5 contrasts posterior predictive checks per chain: (a) the failing simplified-model inference with $\text{uniform}(-2,2)$ initialization, versus (b) the working full-model inference with Pathfinder initialization.

## Examples

> [!example] The full diagnostic arc, condensed
> | Stage | Setup | Outcome |
> |---|---|---|
> | Full model, default init | 7 parameters, ODE solver, Stan defaults | Chains do not converge; long runtimes |
> | Simplified model ($k$ only), default init | 8 chains × 1000 iters | Runtime 2 s to 2000 s; $\hat R$ large; chains stuck at modes determined by initial value |
> | Quadrature on $k$ | 1-D likelihood | Dominating mode at $k \approx 1$; minor modes for $k > 1$ |
> | Simulate orbits at several $k$ | Fig. 30.3 | Modes are chance near-coincidences of observed and simulated points — approximate aliasing, negligible mass |
> | Stronger prior | $k \sim \text{normal}^+(0,1)$ already excludes the modes | Wiggles persist; **more data makes them stronger** |
> | Stacking | Reweight chains | Effectively discards stuck chains; runtime cost remains |
> | Init from prior | $k^{(0)} \sim$ prior | Better, but some chains still stick |
> | **Pathfinder init, simplified** | 40 paths, 15 s, 10 fail fast | MCMC: **1 s**, diagnostics clean |
> | Conditional likelihood of $q^*$ | Quadrature slice, Fig. 30.4 | Same modal structure — confirms $k$/$r$ equivalence |
> | **Pathfinder init, full model** | 40 paths, 3 s, 29 fail fast, Pareto $\hat k$ good | MCMC: **25 s**, diagnostics clean |

## Connections

The chapter's own general lessons:

1. **Simplify to diagnose.** When you fail to fit a model, examining a simplified model can reveal what frustrates the algorithm. In practice it is hard to find a simplification that is both manageable and still exhibits the pathology. **Reasoning about the topology surrounding the model** (Section 9.2, [[Topology of Models]]) helps. **A straightforward way to simplify is to fix some model parameters.**

2. **Do not combine unmixed chains.** Multimodal geometry prevents cohesive exploration, and simulations from chains that have not mixed should not simply be pooled. To decide what to do you must understand **how the local modes arose and how much probability mass they carry** — done here with posterior predictive checks.

3. **Minor modes with negligible probability mass can still trap a Markov chain.** The possibility of such ill-fitting modes implies **always run multiple chains, perhaps more than the current default of four.**

4. **Starting points matter and there is no universal default.** Ideally a chain forgets its initial value, but in a non-asymptotic regime it may not. "Just as there is no universal default prior, there is no universal default initial point." Modelers often must depart from defaults for numerically stable evaluation of the joint density. **At the same time we want dispersed initial points** so that convergence diagnostics are reliable and all relevant modes can potentially be explored. Like any tuning parameter, picking starting points is an **iterative process** with adjustments after a first fitting attempt.

5. **Do not mindlessly discard misbehaving chains.** Analyze where the poor behavior comes from and whether it hints at serious flaws in model or inference.

6. **Pathfinder can find many modes and give approximate posterior draws.** If the **Pareto $\hat k$ diagnostic for the Pathfinder approximation looks good, the importance sampling draws can be used directly without running MCMC at all.** Pathfinder provides a great way to **fit and fail fast**; if more draws are needed, run MCMC with Pathfinder initialization.

Contrasts with the rest of the book:
- The aliasing here is **multiplicative/geometric and approximate** (chance coincidences of a periodic trajectory), unlike the exact **additive** aliasing of competing intercepts in [[Sampling Problems with Latent Variables - No Vehicles in the Park]] and [[Model Building - Time-Series Decomposition for Birthdays]]. Exact aliasing is fixed by a constraint; approximate aliasing from periodicity is not.
- Unlike most convergence problems in [[What to Do About Convergence Problems]], **reparameterization is not the fix** — the geometry is genuinely multimodal, so initialization is.
- The physics reasoning about $k$ and $r$ is domain knowledge doing diagnostic work no generic tool would supply — the chapter's argument that workflow "draws on both statistical and field expertise."

Exercises (§30.6) push in both directions: **30.1** asks whether the simulation conditions (model parameters, time spacing of measurements, number of observations) can be changed so that **even Pathfinder struggles**, and conversely so that **HMC mixes well out of the box**. **30.2** relaxes the pinned parameters $m$, $q^*$, $q_0$, $p_0$, $\sigma$ one at a time, asking for each whether the resulting Stan program mixes and whether inferences match the true simulated values — with difficulties expected to be either **computational** (needing Pathfinder initialization) or **statistical** (needing informative priors for stable estimates).

## See Also
- [[Variational Inference and Pathfinder]] — the algorithm that resolves this case
- [[Failure Modes and Steps Forward]] — the folk theorem and the catalogue of multimodality symptoms
- [[What to Do About Convergence Problems]] — the general remedies, and why they fall short here
- [[Initial Values, Adaptation, and Warmup]] — starting points as a tuning parameter
- [[Fitting Simpler Models for Computational Purposes]] — simplify-to-diagnose as a workflow move
- [[Topology of Models]] — reasoning about the neighborhood of a model to find a useful simplification
- [[Stacking and Predictive Model Averaging]] — reweighting chains stuck in separate modes
- [[Cross Validation Checking]] — the Pareto $\hat k$ diagnostic used to validate the Pathfinder approximation
- [[Posterior Predictive Checking]] — how the minor modes were shown to be inconsistent with the data
- [[Sampling Problems with Latent Variables - No Vehicles in the Park]] — the contrasting case of exact additive aliasing
- [[Designing Simulated-Data Experiments]] — the simulated-data setting that made exact diagnosis possible
