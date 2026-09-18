---
title: Approximate Bayesian Computation for ABMs
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[Research/Agent-Based Modeling/raw/calibration_ABM.pdf]]"
source_location: "Sections 3.7–3.9, 3.20–3.21, pp. 5–6"
date_ingested: 2026-04-11
folder: "Agent-Based Modeling/Calibration and Validation/Calibration Methods"
doc_type: paper
depends_on:
  - "[[HM-ABC Calibration Framework]]"
  - "[[History Matching for ABMs]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
used_by:
  - "[[ABM Calibration Case Studies]]"
  - "[[Global Sensitivity Analysis - Overview]]"
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Simulation-Based Inference - Overview]]"
aliases:
  - ABC calibration
  - rejection sampling ABC
  - ABC posterior ABM
---

# Approximate Bayesian Computation for ABMs

> [!summary]
> Approximate Bayesian Computation (ABC) calibrates ABMs by sampling parameter sets from a prior, running the model, and accepting samples where the model error is below a threshold $\varepsilon$. Unlike standard Bayesian inference, ABC never requires an explicit likelihood — only the ability to simulate. When preceded by HM, the non-implausible region serves as an informed uniform prior, dramatically reducing wasted model runs and producing a concentrated posterior.

## Overview

ABC circumvents the need for a likelihood function — which is typically intractable for stochastic ABMs — by using simulation outputs directly. A parameter set is "accepted" if its simulated output is close enough to the observed data. The accepted samples approximate the posterior distribution.

The framework uses rejection sampling ABC but notes that Markov chain Monte Carlo and sequential Monte Carlo variants can improve efficiency further.

## Rejection Sampling ABC

> [!definition] Definition: ABC Rejection Sampling
> Given prior $\pi(\theta)$ and observed data $z^*$:
> 1. Sample $\theta^* \sim \pi(\theta)$
> 2. Run model with $\theta^*$ to get output $f(\theta^*)$
> 3. Compute error $d(z^*, f(\theta^*))$
> 4. If $d(z^*, f(\theta^*)) \leq \varepsilon$: **accept** $\theta^*$ (add to posterior sample)
> 5. Else: **reject** $\theta^*$, return to step 1
>
> Repeat until $n$ accepted particles. The accepted $\{\theta^*\}$ approximate the posterior $p(\theta \mid d(z^*, f(\theta)) \leq \varepsilon)$.
^abc-rejection

## HM-Informed Prior and $\varepsilon$ Threshold

> [!definition] Definition: HM-Informed ABC Setup
> When HM precedes ABC:
> - **Prior**: $\pi(\theta) = \text{Uniform}$ over the HM non-implausible region (not the full parameter space)
> - **Initial threshold**: $\varepsilon = 3(V_o + V^r_s + V^r_m)$ — consistent with the HM $3\sigma$ implausibility cutoff
>
> In subsequent ABC iterations, $\varepsilon$ may be adaptively reduced (Del Moral et al. 2012; Lenormand et al. 2013) to refine the posterior.
^hm-informed-abc

## Why ABC Cannot Compute a Likelihood for ABMs

ABM likelihoods are intractable because:
- The model is stochastic: the same parameters produce different outputs on each run
- The mapping from parameters to observations is high-dimensional and non-analytic
- There is no closed-form expression for $p(\text{data} \mid \theta)$

ABC bypasses the likelihood by replacing it with a simulation-based acceptance criterion.

## $\varepsilon$ Selection

| $\varepsilon$ too small | $\varepsilon$ too large |
|------------------------|------------------------|
| Nearly all samples rejected | Many implausible samples accepted |
| Computationally expensive | Biased posterior (too diffuse) |
| Near-exact posterior | Poor approximation |

Strategy: Start with a large $\varepsilon$ (informed by HM uncertainties), then adaptively reduce over successive runs.

## Posterior Refinement

After a first ABC run:
1. Use the resulting posterior as the prior for a second run
2. Reduce $\varepsilon$ adaptively
3. Apply kernel density estimation to smooth the posterior

## Comparison: ABC with and without HM Prior

From the birds case study (Section 5.1, 1000 particles):

| Setup | Posterior | Total model runs |
|-------|-----------|-----------------|
| HM + ABC | Concentrated around scouting $\in [0.2, 0.5]$, survival $\approx 0.98$ | **3,185** |
| ABC alone (Thiele et al. 2014) | Similar but requires more particles | **11,000+** |

The HM-informed prior eliminates sampling of implausible regions, saving ~2,047 extra model runs on average.

## Accuracy Assessment

From 100-parameter accuracy tests (Section 5.16–5.17):

| Method | True param in 95% CI | Mean Absolute Error | 95% CI size |
|--------|---------------------|---------------------|-------------|
| ABC alone (scouting) | 92.31% | 0.132 | 0.447 |
| HM+ABC (scouting) | 90.11% | 0.130 | 0.434 |
| ABC alone (survival) | 96.70% | 0.004 | 0.021 |
| HM+ABC (survival) | 93.41% | 0.003 | 0.015 |

**Interpretation**: HM+ABC produces slightly narrower, more precise CIs (smaller MAE) at the cost of marginally lower coverage. This is acceptable given the large efficiency gain.

## Connections
- ABC is a likelihood-free Bayesian method; connects to [[MCMC Basics]] (MCMC-ABC and SMC-ABC are more efficient variants)
- Compare to [[Genetic Algorithm Calibration for ABM]] — GA gives a point estimate; ABC gives a full distribution
- The $\varepsilon$ threshold directly uses components from [[Uncertainty Quantification for ABM Calibration]]
- Posterior output connects to [[Bayesian Workflow - Overview]] — ABC posterior can be used for prediction and model comparison

## See Also
- [[History Matching for ABMs]] — provides the informed prior
- [[HM-ABC Calibration Framework]] — the combined pipeline
- [[Uncertainty Quantification for ABM Calibration]] — the uncertainty components feeding $\varepsilon$
- [[ABM Calibration Case Studies]] — ABC applied to three models
- [[Global Sensitivity Analysis - Overview]] — screening parameters before calibration
- [[Neural Posterior Estimation (NPE)]] — the tolerance-free neural alternative to ABC
