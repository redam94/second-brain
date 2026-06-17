---
title: Simulation-Based Calibration - Overview
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/overview
  - doc/paper
source: "[[raw/1804.06788-Talts-SBC.pdf]]"
source_location: "Sec. 1-4, pp. 1-9"
date_ingested: 2026-06-17
folder: "Bayesian Statistics/Workflow"
doc_type: paper
depends_on:
  - "[[Data-Averaged Posterior Self-Consistency]]"
  - "[[Bayesian Workflow - Overview]]"
used_by:
  - "[[The SBC Algorithm]]"
  - "[[Interpreting SBC Histograms]]"
  - "[[SBC Case Studies]]"
aliases:
  - SBC
  - Simulation-Based Calibration
---

# Simulation-Based Calibration - Overview

> [!summary]
> Simulation-Based Calibration (SBC) is a general procedure for validating that a Bayesian computational algorithm samples the *correct* posterior for an assumed model. It works by running the algorithm over many datasets simulated from the joint prior/likelihood, then checking that the rank of each prior draw within its posterior sample is uniformly distributed — any deviation reveals computational error or model mis-implementation. SBC is a corrected, robust generalization of Cook, Gelman & Rubin (2006) and a critical step in a robust Bayesian workflow.

## Overview

Constructing a Bayesian analysis is conceptually simple: define a joint distribution over parameters $\theta$ and measurements $y$,
$$
\pi(y,\theta) = \pi(y \mid \theta)\,\pi(\theta),
$$
and condition on an observation $\tilde{y}$ to get the posterior $\pi(\theta \mid \tilde{y}) \propto \pi(\tilde{y}, \theta)$. Implementing the inference *accurately*, however, is hard. Every algorithm — Monte Carlo methods (MCMC), or deterministic approximations like INLA (Rue, Martino & Chopin 2009) and ADVI (Kucukelbir et al. 2017) — requires the posterior to have favorable properties to succeed. An algorithm that works in one analysis can fail spectacularly in another. We always get *some* answer, but without validation we have no idea how good it is.

SBC answers the question: **does my algorithm actually sample the posterior of the model I think I specified?** It requires just one assumption — that we have a generative model for the data. It is purely a *computational* check: it validates the inference pipeline (algorithm + implementation), not whether the model itself is adequate for the real world.

**Why naive single-dataset checks fail.** A popular but flawed alternative picks a single ground truth $\tilde{\theta}$, simulates $\tilde{y} \sim \pi(y \mid \tilde{\theta})$, and asks how well the posterior recovers $\tilde{\theta}$. The paper's counterexample: with $y \mid \mu \sim \mathrm{N}(\mu, 1^2)$, $\mu \sim \mathrm{N}(0,1^2)$ and $\tilde{\mu}=0$, a plausible draw $\tilde{y}=2.1$ gives a *correct* posterior $\mathrm{N}(1.05, 0.5^2)$ that appears to miss the truth (2+ SD away), while *buggy* code using variance 10 everywhere gives $\mathrm{N}(1.05, 5^2)$ that looks like good recovery. Behavior on a single simulation does not characterize the algorithm — we must consider the *entire* Bayesian joint distribution.

## Main Content

> [!definition] What SBC validates (calibration)
> SBC verifies that a computational algorithm is **calibrated** for an assumed generative model: that one-dimensional posterior test statistics are correctly distributed when averaged over the entire Bayesian joint distribution $\pi(\theta, y)$. This is analogous to checking the coverage of a credible interval under the assumed model. SBC's foundation is the **data-averaged posterior self-consistency** identity — that the prior equals the average of exact posteriors over data generated from the joint distribution.
> ^def-calibration

**Where it sits relative to other validation methods.** SBC builds on a long line of work exploiting the self-consistency of the Bayesian joint distribution:
- **Geweke (2004)** — a Gibbs sampler alternately drawing from $\pi(\theta \mid y)$ and $\pi(y \mid \theta)$; if the algorithm is accurate, marginal parameter samples are indistinguishable from prior samples. Diagnosed via $z$-scores of parameter means. **Problem:** $z$-scores are meaningful only after the Gibbs sampler converges, and convergence is slow because data and parameters are strongly correlated.
- **Cook, Gelman & Rubin (2006)** — avoided the auxiliary Gibbs sampler by using posterior CDF (quantile) values, which are uniform under correct computation. **Problems (corrected by SBC):** with finite MCMC samples the empirical CDF only asymptotically approaches the true value (no CLT guarantee); the empirical CDF $q = \tfrac{1}{L}\sum_{l=1}^L \mathbb{I}[\theta_l < \tilde\theta]$ is fundamentally *discrete* (one of $L+1$ values), causing visualization artifacts and requiring continuity corrections (Blom 1958) that Cook (2006) omitted; and autocorrelation breaks the independence assumptions behind the test statistics (a problem flagged in Gelman's 2017 correction). Running the CGR procedure on a simple Stan linear regression produced strong spurious deviations from uniformity (Fig. 1) even though Stan is highly accurate.

> [!definition] SBC's fix
> Rather than empirical CDF values (which are discrete and artifact-prone), SBC compares a histogram of **rank statistics** of each prior draw within its posterior sample to the discrete uniform distribution that arises under correct computation. This is immediately compatible with sampling-based algorithms and admits an exact uniformity theorem. See [[Rank Statistics and Uniformity]].
> ^def-fix

**Complement to predictive checks.** SBC uses draws from the joint *prior* distribution $\pi(\theta, y)$; posterior predictive checks (PPCs, BDA3 ch. 6) use the posterior predictive $\pi(\tilde y \mid y)$. SBC validates *computation*; PPCs and sensitivity analysis validate the *model assumptions* (predictive performance). Both are vital parts of a robust workflow — see [[Model Checking]].

## Examples

> [!example] The misleading single-ground-truth check
> **Setup:** $y \mid \mu \sim \mathrm{N}(\mu, 1)$, $\mu \sim \mathrm{N}(0,1)$, ground truth $\tilde\mu = 0$, simulated $\tilde y = 2.1$.
> **Result:** Correct posterior is $\mathrm{N}(1.05, 0.5^2)$ — appears to "miss" $\tilde\mu=0$. Buggy code (variance 10 in both prior and likelihood) gives $\mathrm{N}(1.05, 5^2)$ — appears to "cover" $\tilde\mu$.
> **Interpretation:** A single simulation can make correct code look broken and broken code look correct. Only averaging over many ground truths drawn from the prior characterizes the algorithm — motivating SBC.
> ^ex-single

## Connections

- **Foundation:** [[Data-Averaged Posterior Self-Consistency]] supplies the identity SBC exploits; [[Rank Statistics and Uniformity]] turns it into a testable, artifact-free criterion.
- **Procedure:** [[The SBC Algorithm]] is the step-by-step recipe; [[Interpreting SBC Histograms]] reads its diagnostic output; [[SBC Case Studies]] applies it to MCMC, ADVI, and INLA.
- **Workflow:** SBC is the "fitting and validating computation" step of [[Bayesian Workflow - Overview]] (see [[Fitting and Validating Computation]]). It complements [[Model Checking]] (posterior predictive checks) and MCMC convergence diagnostics in [[MCMC Basics]]/[[Efficient MCMC]].
- **Shared authorship:** Betancourt, Vehtari, and Gelman also author the Bayesian Workflow paper and BDA3 (see [[BDA3 - Overview]]).

## See Also

- [[Data-Averaged Posterior Self-Consistency]]
- [[Rank Statistics and Uniformity]]
- [[The SBC Algorithm]]
- [[Interpreting SBC Histograms]]
- [[SBC Case Studies]]
- [[Bayesian Workflow - Overview]]
- [[Model Checking]] · [[Model Comparison]]
