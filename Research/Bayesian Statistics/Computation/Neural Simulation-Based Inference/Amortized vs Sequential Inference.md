---
title: Amortized vs Sequential Inference
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/concept
  - doc/paper
source: "[[raw/Cranmer Brehmer Louppe 2020 - The Frontier of Simulation-Based Inference.pdf]]"
source_location: "Cranmer, Brehmer & Louppe (2020), Sec. 1.C (p. 3), Sec. 2.B active learning (p. 4), Sec. 3.B (pp. 6-7), Sec. 3.D (p. 8); Papamakarios & Murray (2016) Sec. 2.4 and Fig. 1; Papamakarios et al. (2019) Sec. 3; Lueckmann et al. (2021) Sec. 3 findings 3 and 5 (pp. 6-7) and Box 1 (p. 8); Dyer et al. (2022) Sec. 3.5"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Likelihood Estimation and Sequential Neural Likelihood]]"
  - "[[Neural Ratio Estimation]]"
used_by:
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
aliases:
  - Amortized Inference
  - Amortization in SBI
  - Sequential SBI
  - Active Learning in Simulation-Based Inference
  - Round-Based Training
  - Proposal Prior
---

# Amortized vs Sequential Inference

> [!summary]
> An **amortized** estimator is trained once on simulations from the *prior* and then answers $p(\theta\mid x)$ for **any** $x$ at the cost of a forward pass: "after a (computationally expensive) upfront simulation and training phase, new data can be evaluated very efficiently." A **sequential** (round-based, active-learning) estimator spends its simulations where the posterior for one particular $x_o$ lives, and is more sample-efficient for that $x_o$ but useless for any other. Cranmer, Brehmer & Louppe (2020) name the tension directly: "there is a tradeoff between active learning, which tailors the efficiency to a particular observed data set, and amortization, which benefits from surrogates that are agnostic about the observed data." Which side to take depends on how many datasets you will analyse, how expensive the simulator is, how sharp the posterior is relative to the prior, and whether you need to [[The SBC Algorithm|validate]] the inference.

## Overview

Amortization is one of the three axes on which Cranmer et al. fault classical methods (Sec. 1.C). [[Approximate Bayesian Computation for ABMs|ABC]] is the non-amortized extreme: because the observed data enter the accept/reject step (and the proposal in SMC-ABC), "inference for new observations requires repeating the entire inference algorithm." Density-estimation likelihoods are the amortized extreme: in their Fig. 3e "the blue 'data' box only enter[s] at the inference stage and not affecting the expensive simulation step", which made the approach "particularly well-suited for problems with many i.i.d. observations."

Neural surrogates sit wherever you put them. Trained on prior simulations they are amortized; trained over rounds with a proposal adapted to $x_o$ they are sequential. The four method pairs in the SBI benchmark, NPE/SNPE, NLE/SNLE, NRE/SNRE and REJ-ABC/SMC-ABC, were chosen precisely to isolate this choice (Lueckmann et al. 2021, Sec. 2.1).

## Main Content

> [!definition] Amortized inference ^def-amortized
> An inference procedure whose expensive stage (simulation and training) does not depend on the observation. Formally, a surrogate is fitted to $(\theta_n,x_n)\sim p(\theta)\,p(x\mid\theta)$ so that it approximates the target conditional *globally*: $q_\phi(\theta\mid x)\approx p(\theta\mid x)$ for all $x$ in the prior predictive, or $q_\phi(x\mid\theta)$ / $\hat r(x,\theta)$ for all $\theta$ in the prior's support. Dyer et al. (2022, Sec. 3.1) describe these as "global posterior density estimators" in which "pointwise estimates of $p(\theta\mid y)$ can borrow strength from, and share information between, one another."

> [!definition] Sequential (round-based) inference ^def-sequential
> Split a budget of $R$ simulations into rounds $N_1,N_2,\dots$ In round 1 draw $\theta\sim p(\theta)$; in round $i\ge2$ draw $\theta\sim\tilde p_i(\theta)$, where the **proposal** $\tilde p_i$ is the round-$(i-1)$ posterior estimate for the fixed observation $x_o$; retrain after each round. The estimator is "now non-amortised" (Dyer et al., Sec. 3.5). This is the simplest form of what Cranmer et al. (Sec. 2.B) call active learning: "run the simulator at parameter points that are expected to increase our knowledge the most."

### Why sequential training costs amortization: three mechanisms

1. **Posterior targets (SNPE) learn the wrong conditional.** By [[Neural Posterior Estimation (NPE)#^thm-proposal-prior|Proposition 1 of Papamakarios & Murray]], training on $\theta\sim\tilde p$ yields $q_\phi(\theta\mid x)\propto\frac{\tilde p(\theta)}{p(\theta)}p(\theta\mid x)$. The correction (post-hoc division, importance weights, or atomic proposals) restores the posterior at $x_o$, but the network has seen data only near $x_o$. Their Fig. 1 shows it: the prior-trained MDN "learns the posterior distributions for a large range of possible observations $x$", whereas the proposal-trained one "gives accurate posterior probabilities only near the value actually observed."
2. **Likelihood targets (SNLE) stay unbiased but become local.** By [[Neural Likelihood Estimation and Sequential Neural Likelihood#^thm-no-proposal-bias|the SNL argument]], the proposal "does not bias learning the likelihood asymptotically", yet it "controls where $q_\phi(x\mid\theta)$ will be most accurate." A surrogate accurate only near the posterior of $x_o$ is inaccurate where a different observation's posterior would sit.
3. **Ratio targets (SNRE) lose the evidence normalization.** With positives from $p(x\mid\theta)\tilde p(\theta)$ and negatives from $p(x)\tilde p(\theta)$, "exact posterior evaluation is not possible anymore", and sample efficiency comes "at the cost of needing to train new classifiers for different $x_o$" (Lueckmann et al., App. A.8).

### Degrees of amortization across the three targets

| Method (single round) | Network amortized over | Per-observation cost | Many i.i.d. observations $x_{1:T}$ for one $\theta$ |
|---|---|---|---|
| **NPE** | all $x$ | one forward pass, direct sampling | needs an exchangeable / recurrent embedding of the set |
| **NLE** | all $\theta$ (and all $x$) | an MCMC run | natural: $\prod_t q_\phi(x_t\mid\theta)$ |
| **NRE** | all $(x,\theta)$ | an MCMC run | natural: $\sum_t\log\hat r(x_t,\theta)$ |

This is Box 1 of the benchmark: "To perform SBI separately for different data points (i.e. compute $p(\theta\mid x_1), p(\theta\mid x_2),\dots$), methods that allow 'amortization' (NPE) are likely preferable. While NLE and NRE allow amortisation of the neural network, MCMC sampling is required, which takes additional time. Conversely, if we want to run SBI conditioned on many i.i.d. data (e.g. $p(\theta\mid x_1,x_2,\dots)$) methods based on likelihood or ratio estimation (NLE, NRE), or NPE with exchangeable neural networks would be appropriate."

> [!theorem] Empirical findings on the trade-off (Lueckmann et al. 2021, Sec. 3) ^thm-sequential-findings
> - **Finding 3: "Sequential estimation improves sample efficiency."** "Sequential algorithms outperform non-sequential ones. The difference was small on simple tasks (i.e. linear Gaussian cases), yet pronounced on most others. However, we also found these methods to exhibit diminishing returns as the simulation budget grows."
> - **Finding 5: "No one algorithm to rule them all."** "There was no clear-cut answer as to which sequential method (SNLE, SNRE, and SNPE) should be preferred."
> - The benchmark split each budget (1k to 100k simulations) "equally ... across 10 rounds."
> - Simulation count is not wall-clock time: "(S)ABC was much faster than approaches requiring network training. Overall, sequential neural algorithms exhibited longest runtimes" (Sec. 4, fourth limitation). A plausible reason, not stated in the paper, is that every round retrains the network and, for SNLE/SNRE, reruns MCMC to draw the next proposal.

Earlier evidence points the same way. In Papamakarios & Murray's Bayesian linear regression "sequentially fitting a prior proposal was more than ten times cheaper than training with prior samples, and more accurate"; SNL reports that guiding simulations "reduces simulation cost by orders of magnitude" relative to single-round neural likelihood.

### What amortization buys beyond speed

- **Validation.** [[Simulation-Based Calibration - Overview|SBC]] and expected-coverage checks require inference on hundreds or thousands of simulated datasets. The benchmark authors declined to use SBC or the averaged log-probability metric for exactly this reason: "for all algorithms that are not amortized (all but one), evaluating posteriors at different $x_o$ would require rerunning inference." Dyer et al. make the constructive version of the point: for a KDE-likelihood method SBC with $P\simeq10^3$ datasets "can easily reach the order of $10^8$" simulations, while for an amortized NPE/NRE it needs no new simulations at all. **A sequential posterior cannot be checked this way without repeating the whole sequential procedure per SBC replicate.**
- **Real-time and repeated inference.** The posterior for new data "in real time as new data come in", in the words of [[Simulation-Based and Amortized Inference]].
- **Design and sensitivity loops.** Anything that wraps inference in an outer loop (power analysis, experimental design, prior sensitivity over simulated data) multiplies the per-observation cost.

### When sequential is the right call

Cranmer et al.: "A good compromise here will depend on the number of observations and the sharpness of the posterior compared to the prior." The benchmark's Box 1 adds: "For time-intensive and complex simulators, it can be beneficial to use sequential methods to increase sample efficiency", while noting "for some applications, inference is performed on a fixed dataset, and one cannot resort to sequential algorithms" (the simulations were produced in advance). More elaborate acquisition rules than "propose from the last posterior" exist, such as Bayesian-optimization and uncertainty-driven schemes, and "may increase sample efficiency if only few simulations can be obtained."

A practical hybrid, consistent with all of the above: train an amortized estimator on a broad prior, validate it with SBC, then use its posterior for $x_o$ as the first-round proposal of a short sequential refinement if the amortized posterior is visibly under-resolved.

## Examples

**Deciding for a marketing ABM.** Suppose one run of an agent-based media-response simulator takes 30 seconds.

- *One client, one dataset, 8 parameters, sharp posterior.* A 5,000-run budget is 42 CPU-hours. When the posterior is far narrower than the prior, prior simulations mostly land where nothing can be learned about $x_o$. Use SNPE or SNLE over about 10 rounds. Accept that calibration can only be spot-checked (posterior predictive checks; SBC restricted to a handful of replicates).
- *Forty geos or brands sharing one simulator, refit quarterly.* The per-dataset cost of sequential inference is paid 160 times a year; an amortized NPE is paid once. Spend the budget on 50,000 prior simulations, run SBC on 1,000 held-out draws for free, and report posteriors instantly. Widen the prior enough that every real dataset falls inside the prior predictive, since an amortized network extrapolates badly.
- *Panel of i.i.d. households for one parameter vector.* Prefer NLE or NRE so the per-household terms multiply; no set-embedding network is required.

```python
# round-based proposal loop common to SNPE / SNLE / SNRE
proposal = prior
for r in range(num_rounds):
    theta = proposal.sample((sims_per_round,))
    x     = simulate(theta)
    estimator.append_simulations(theta, x, proposal=proposal)   # proposal needed for SNPE's correction
    estimator.train()
    proposal = estimator.build_posterior().set_default_x(x_o)   # tailored to x_o: no longer amortized
```

## Connections

- [[Neural Posterior Estimation (NPE)]] - the proposal-prior theorem and the three SNPE corrections.
- [[Neural Likelihood Estimation and Sequential Neural Likelihood]] - why no correction is needed for likelihood targets.
- [[Neural Ratio Estimation]] - amortized network, non-amortized sampler.
- [[Approximate Bayesian Computation for ABMs]] and [[HM-ABC Calibration Framework]] - SMC-ABC and history matching are sequential, observation-specific refocusing schemes; history matching's wave-by-wave shrinking of the non-implausible region is the emulator-world analogue of a round-based proposal.
- [[History Matching for ABMs]] - the same "spend simulations where it matters" logic, expressed as discarding implausible regions and resampling the retained space more densely in each wave.
- [[Variational Inference and Pathfinder]] - amortized VI (an inference network) versus per-dataset VI is the same distinction on the likelihood-based side.
- [[Variational Posterior Estimator (Barber-Agakov)]] - experimental design needs a posterior for *every* hypothetical outcome, the purest case for amortization.

## See Also

- [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] - the evidence base for the sequential findings, and the diagnostics amortization enables.
- [[Fit Fast, Fail Fast]] - the workflow argument for cheap repeated inference.
- [[Simulation-Based and Amortized Inference]] - the workflow-level statement of the amortization idea.
- [[Neural SBI for Agent-Based and Economic Models]] - Dyer et al. use sequential training for the benchmark posteriors and amortized training for the SBC study, illustrating both halves of this note.
