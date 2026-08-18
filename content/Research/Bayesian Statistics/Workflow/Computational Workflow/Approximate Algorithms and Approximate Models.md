---
title: "Approximate Algorithms and Approximate Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/overview
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 13 intro and 13.6, pp. 239-240, 245-246 (Figure 13.1)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Fit Fast, Fail Fast]]"
  - "[[What to Do About Convergence Problems]]"
  - "[[From Inference to Decision]]"
used_by:
  - "[[Approximations Based on Joint and Conditional Posterior Modes]]"
  - "[[Variational Inference and Pathfinder]]"
  - "[[Fitting Simpler Models for Computational Purposes]]"
aliases:
  - "Approximate inference"
  - "Speed accuracy tradeoff"
  - "Exact algorithm for an approximate model"
---

# Approximate Algorithms and Approximate Models

> [!summary]
> The chapter's organizing idea is a reframing that dissolves most of the anxiety about approximation:
> **"an approximate algorithm [can be understood] as an exact algorithm for an approximate model."**
> Empirical Bayes becomes a point-mass prior; a Laplace approximation becomes a data-dependent
> multivariate normal model; **early stopping becomes a prior centered at the starting point.** The
> practical guidance is staged by workflow position: **early on, large-scale features suffice and
> approximation is cheap progress; late on, "fine-scale and delicate features" require MCMC.** "The point
> is to use a suitable tool for the job and to not try to knock down a retaining wall using a sculptor's
> chisel."

## Overview

> [!definition] The tradeoff (Figure 13.1, Ch. 13 intro, p. 239)
> "**Markov chain simulation is a form of approximation where the theoretical error approaches zero as the
> number of simulations increases.** If the chains have mixed, we can make a good estimate of the Monte
> Carlo standard error, **and for practical purposes we often treat these computations as exact.**
>
> **Unfortunately, running MCMC to convergence is not always a scalable solution as data and models get
> large, hence the desire for faster approximations.**"
>
> Figure 13.1 sketches distance-from-target against computation time for MCMC and for an approximate
> algorithm: the approximate curve starts lower and **plateaus**, the MCMC curve starts higher and keeps
> descending. "**Which algorithm performs better depends on the time budget of the user and where the two
> curves intersect.**"
>
> **Two important qualifications on the figure:** "**This graph is only conceptual; in a real problem, the
> positions of these lines would be unknown, and indeed in some problems an approximate algorithm can
> perform worse than MCMC even at short time scales.**"
^def-approximation-tradeoff

> [!important] Accuracy requirements depend on workflow position
> "**Depending on where we are in the workflow, we have different requirements of our computed posteriors.
> Near the end of the workflow, where we are examining fine-scale and delicate features, we require accurate
> exploration of the posterior distribution. This usually requires MCMC.**
>
> **On the other hand, at the beginning of the workflow, we can frequently make our modeling decisions based
> on large-scale features of the posterior that can be accurately estimated using relatively simple
> methods.**
>
> **The point is to use a suitable tool for the job and to not try to knock down a retaining wall using a
> sculptor's chisel.**"
>
> This is the [[From Inference to Decision#Different perspectives on modeling and prediction|three
> perspectives]] of §7.4 applied concretely: the "model exploration" perspective tolerates approximation
> that the "traditional statistical" perspective does not.

**The default stance:** "**We usually use Stan's NUTS-HMC for posterior inference: it is a robust algorithm
and implementation, and its speed is often sufficient. However, sometimes we can use other algorithms for
faster inference during the early steps of workflow (fit fast, fail fast) or to be able to scale the
computation for bigger data.**"

## Main Content

### The catalogue of approximations

| Approach | Note | When it fits |
|---|---|---|
| **Modal approximations and Laplace** | [[Approximations Based on Joint and Conditional Posterior Modes]] | large $n$, informative likelihood, near-normal posterior |
| **Variational inference and Pathfinder** | [[Variational Inference and Pathfinder]] | rough approximation; **initialization for HMC**; very large models |
| **Simulation-based and amortized inference** | [[Simulation-Based and Amortized Inference]] | **intractable likelihoods**; repeated inference across many datasets |
| **Divide-and-conquer** | [[Divide-and-Conquer Algorithms]] | sequential data arrival; parallel computation over data subsets |
| **Simplifying the model itself** | [[Fitting Simpler Models for Computational Purposes]] | when the computation cannot be brought to the model |

### Three uses of an approximate inference

> [!definition] What approximations are *for* (Ch. 13.6, p. 245)
> 1. "**A quick answer, an alternative to full Bayesian computing**";
> 2. "**Starting values for MCMC**";
> 3. "**An implicit simpler model, useful as comparison in the model-development workflow.**"
>
> Use 3 is the one most easily overlooked: an approximate fit is not only a cheap version of the right
> answer, it is **a legitimate member of the model sequence** in the sense of
> [[Comparing Models Visually]].
^def-three-uses

> [!important] Approximate inference is itself iterative
> "**Improving a computation is similar to iterative model building in that it can involve experimenting and
> testing. Getting any particular model to fit can be a small research project in itself.**"
>
> "**There is no one-size-fits-all approximate inference algorithm, but when a workflow includes relatively
> well-understood components such as generalized linear models, multilevel regression, autoregressive time
> series models, or Gaussian processes, it is often possible to construct an appropriate approximate
> algorithm.**"
>
> **And they can be checked:** "**depending on the specific approximation being used, generic diagnostic
> tools described by Yao, Vehtari, Simpson, et al. (2018b), Talts et al. (2020), and Modrák et al. (2025)
> can be used to verify that a particular approximate algorithm reproduces the features of the posterior
> that you care about for a specific model.**"
>
> Diagnostics exist not only for MCMC but for **importance sampling** (Vehtari, Simpson, et al. 2024) and
> **variational inference** (Yao, Vehtari, Simpson, et al. 2018b; Dhaka, Catalina, Andersen, et al. 2020;
> Dhaka, Catalina, Welandawe, et al. 2021) — see [[Failure Modes and Steps Forward]].

### The reframing: an exact algorithm for an approximate model

> [!definition] The alternative view (Ch. 13.6, p. 246)
> "**An alternative view is to understand an approximate algorithm as an exact algorithm for an approximate
> model. In this sense, a workflow is a sequence of steps in an abstract computational scheme aiming to infer
> some ultimate, unstated model.**
>
> **More usefully, we can think of things like:**
> | Approximation | The model it is exact for |
> |---|---|
> | **empirical Bayes** | "**replacing a model's prior distributions with a particular data-dependent point-mass prior**" |
> | **Laplace approximation** | "**a data-dependent multivariate normal fit to the target distribution**" |
> | **nested Laplace (INLA)** | "**fits a family of normal approximations to the posterior conditional on hyperparameters**" |
> | **early stopping of an iterative algorithm** | "**an approximate Bayesian approach in which the starting point of the computation acts as a sort of prior**" |
^def-exact-for-approximate

The last row is the most striking. **Early stopping is not "not converging" — it is a shrinkage estimator
whose shrinkage target is the initialization.** Which explains why
[[Initial Values, Adaptation, and Warmup]] treats the initialization distribution as "a very crude previous
model."

> [!important] How to evaluate any approximation
> "**To evaluate an approximation, you can simulate from the desired model with known parameters, then apply
> the computational steps of fitting, then see what you can recover by comparing inferences to the assumed
> true values of the parameters.**"
>
> That is [[Designing Simulated-Data Experiments]] and, in its formal version,
> [[Simulation-Based Calibration - Overview]] — which is why Ch. 14 immediately follows this one.

## Examples

> [!example] Exercise 13.3 — three speedups, compared honestly (Ch. 13.7, p. 247)
> Simulating $n = 5000$ MRP respondents (following Exercise 7.3):
> **(a)** Demonstrate MRP works, comparing inference to the assumed true state-level values, running 4 chains
> in parallel.
> **(b)** Then experiment with three speedups:
> - **fitting to subsets of data and combining inferences**;
> - **running 100 warmup and 100 saved iterations per chain** instead of 1000/1000;
> - **fixing the group-level variance parameters.**
>
> > "**For each of these, compare it to the brute-force approach in computation time, and then compare the
> > inferences and say if you think the result is reasonably close to the brute-force approach and thus
> > worth the time saving.**"
>
> The two-column framing — *time saved* against *inference changed* — is the right way to evaluate any
> approximation, and is exactly what Figure 13.1 sketches.

> [!example] Exercises 13.5-13.7 — what variational inference gets right and wrong
> Approximating a $d$-dimensional $\text{MVN}(\mu,\Sigma)$ by a **factorized** $\text{MVN}(\nu,\Psi)$
> minimizing $\text{KL}(q\|p)$. The results to be derived:
> - the optimum is $\nu = \mu$ and $\Psi_{ii} = 1/(\Sigma^{-1})_{ii}$;
> - $\text{var}(z_i \mid z_{-i}) = 1/(\Sigma^{-1})_{ii}$, so **"the optimal variational approximation
>   correctly estimates the conditional variance of $p$"**;
> - **but $\Psi_{ii} \le \Sigma_{ii}$, strictly for at least two coordinates if $\Sigma$ is non-diagonal** —
>   the marginal variances are **underestimated**;
> - and via entropy $\mathcal{H}(p) = \log|\Sigma|(2\pi e)^d/2$, at the optimum
>   $\text{KL}(q\|p) = \mathcal{H}(p) - \mathcal{H}(q)$, so **entropy is underestimated too.**
>
> Exercise 13.7 asks to verify this numerically with **ADVI in Stan on a 10-dimensional Gaussian target**
> (Margossian and Saul 2023). A precise, checkable statement of the standard warning that **mean-field VI
> is overconfident.**

## Connections

- The staged accuracy requirement is the computational face of
  [[Fit Fast, Fail Fast]]: approximation is not a compromise on the answer, it is a way to get through
  more models.
- The "exact algorithm for an approximate model" reframing makes approximation subject to
  [[Model Selection and Overfitting|the same evaluation as any other model]] — including LOO comparison
  against the exact fit.
- Which approximation suits which pathology is determined by the geometry taxonomy of
  [[What to Do About Convergence Problems]].

## See Also
- [[Approximations Based on Joint and Conditional Posterior Modes]] — Laplace, INLA, TMB
- [[Variational Inference and Pathfinder]] — the optimization-based family
- [[Simulation-Based and Amortized Inference]] — when there is no tractable likelihood
- [[Fitting Simpler Models for Computational Purposes]] — approximating the model instead of the algorithm
- [[Approximation Methods]] — BDA3 background
