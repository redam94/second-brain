---
title: Neural Likelihood Estimation and Sequential Neural Likelihood
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/method
  - doc/paper
source: "[[raw/Papamakarios Sterratt Murray 2019 - Sequential Neural Likelihood.pdf]]"
source_location: "Papamakarios, Sterratt & Murray (2019, AISTATS), Sec. 2 (p. 2), Sec. 3 and Algorithm 1 (pp. 2-3), Sec. 4 related work (p. 4), Sec. 5 experiments (pp. 4-7), Sec. 6 discussion (pp. 7-8); benchmark settings from Lueckmann et al. (2021) App. A.3-A.4"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[Normalizing Flows as Conditional Density Estimators]]"
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Synthetic Likelihood - Overview]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Amortized vs Sequential Inference]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
aliases:
  - NLE
  - SNL
  - SNLE
  - Sequential Neural Likelihood
  - Neural Likelihood Estimation
  - Neural Synthetic Likelihood
---

# Neural Likelihood Estimation and Sequential Neural Likelihood

> [!summary]
> **Neural likelihood estimation (NLE)** fits a conditional density estimator $q_\phi(x\mid\theta)$, in the SNL paper a conditional **Masked Autoregressive Flow**, to simulated pairs, then runs ordinary MCMC on the surrogate posterior $\hat p(\theta\mid x_o)\propto q_\phi(x_o\mid\theta)\,p(\theta)$. It is [[Synthetic Likelihood - Overview|synthetic likelihood]] with the Gaussian replaced by a flow and the per-$\theta$ refit replaced by one network shared across all $\theta$. **Sequential Neural Likelihood (SNL)** adds rounds in which new parameters are proposed from the current posterior estimate. Its key theoretical selling point over [[Neural Posterior Estimation (NPE)|SNPE]]: **the proposal does not bias a likelihood estimator**, so no importance correction is needed.

## Overview

Papamakarios, Sterratt & Murray (2019) start from the defect of sequential posterior estimation. Because parameters are drawn from a proposal $\tilde p(\theta)$ rather than the prior, a posterior network "will approximate $p(x_o\mid\theta)\,\tilde p(\theta)$ instead of $p(x_o\mid\theta)\,p(\theta)$", so "an adjustment of either the learned posterior or the proposed samples must be made to account for sampling from the 'wrong' prior" (Sec. 2). SNPE-A's analytic adjustment can produce negative variances; SNPE-B's importance weights can have high variance.

SNL "avoids the bias introduced by the proposal, by opting to learn a model of the likelihood instead of the posterior." The price is that the result is not a posterior but an unnormalized one, and an MCMC step is required on top.

## Main Content

> [!theorem] The proposal does not bias the likelihood estimate (SNL, Sec. 3, p. 3) ^thm-no-proposal-bias
> Let $\theta_n\sim\tilde p(\theta)$, $x_n\sim p(x\mid\theta_n)$, and $\tilde p(\theta,x) = p(x\mid\theta)\tilde p(\theta)$. For large $N$, maximizing $\sum_n\log q_\phi(x_n\mid\theta_n)$ is approximately maximizing
>
> $$
> \mathbb E_{\tilde p(\theta,x)}\big[\log q_\phi(x\mid\theta)\big] = -\,\mathbb E_{\tilde p(\theta)}\Big[D_{\mathrm{KL}}\big(p(x\mid\theta)\,\Vert\,q_\phi(x\mid\theta)\big)\Big] + \text{const}.
> $$
>
> This is maximized when the KL is zero on the support of $\tilde p$, i.e. when $q_\phi(x\mid\theta) = p(x\mid\theta)$ for all $\theta$ with $\tilde p(\theta)>0$. Hence "as long as we do not exclude parts of the parameter space, the way we propose parameters does not bias learning the likelihood asymptotically. Unlike when learning the posterior, no adjustment is necessary."

In finite samples the proposal is not irrelevant; it "controls where $q_\phi(x\mid\theta)$ will be most accurate." That is the lever SNL pulls: put the training data where the posterior mass is.

> [!algorithm] Sequential Neural Likelihood (Algorithm 1) ^alg-snl
> **Input:** observed data $x_o$, estimator $q_\phi(x\mid\theta)$, rounds $R$, simulations per round $N$.
> 1. Set $\hat p_0(\theta\mid x_o) = p(\theta)$ and $\mathcal D = \{\}$.
> 2. For $r = 1,\dots,R$:
>    - for $n=1..N$: sample $\theta_n\sim\hat p_{r-1}(\theta\mid x_o)$ **with MCMC**, simulate $x_n\sim p(x\mid\theta_n)$, add $(\theta_n,x_n)$ to $\mathcal D$;
>    - (re-)train $q_\phi(x\mid\theta)$ on **all** of $\mathcal D$ and set $\hat p_r(\theta\mid x_o)\propto q_\phi(x_o\mid\theta)\,p(\theta)$.
> 3. Return $\hat p_R(\theta\mid x_o)$.
>
> After $r$ rounds the effective proposal is the mixture $\tilde p_r(\theta) = \frac1r\sum_{i=0}^{r-1}\hat p_i(\theta\mid x_o)$. Unlike SNPE, which trains only on the latest round, SNL "trains on all simulations obtained up to each round", which is legitimate precisely because of the theorem above.

**Single-round NLE** is the $R=1$ case: train once on prior simulations, then MCMC. The SNL paper calls it "Neural Likelihood (NL)" and uses it as a control "to assess the benefit of SNL's guiding strategy"; Lueckmann et al. (2021) rename the pair NLE / SNLE.

### The estimator: conditional MAF

The likelihood surrogate is a conditional Masked Autoregressive Flow: $x$ is the image of $z_0\sim\mathcal N(0,I)$ under $K$ autoregressive bijections $z_k = f_k(z_{k-1},\theta)$, each "implemented by a Masked Autoencoder for Distribution Estimation conditioned on $\theta$" with a lower-triangular Jacobian, so

$$
q_\phi(x\mid\theta) = \mathcal N(z_0\mid 0, I)\,\prod_k \left|\det\frac{\partial f_k}{\partial z_{k-1}}\right|^{-1}.
$$

See [[Normalizing Flows as Conditional Density Estimators]]. MAF is fast to *evaluate* (one pass) and slow to *sample*, exactly the asymmetry that suits a likelihood evaluated inside an MCMC loop.

**Recommended defaults (Sec. 5.1).** 5 autoregressive layers, each with two hidden layers of 50 tanh units, batch normalization between layers, Adam with minibatch 100 and learning rate $10^{-4}$, 1000 simulations per round with 5% held out, early stopping after 20 epochs without validation improvement. "These settings were held constant and performed robustly across all experiments."

**The MCMC step.** Axis-aligned slice sampling; the chain "persists across rounds" and is burned in for 200 iterations at the start of each round. For higher-dimensional $\theta$ they point to [[HMC and Stan in Practice|Hamiltonian Monte Carlo]], which is available because $q_\phi(x_o\mid\theta)$ is differentiable in $\theta$. Lueckmann et al. (2021, finding 6) later found that "single chains initialized by sampling from the prior with axis-aligned slice sampling ... frequently got stuck in single modes" and that transforming parameters to be unbounded mattered; they used 100 chains. The MCMC step is a real source of error, not a formality.

### Relationship to synthetic likelihood

The paper classifies [[Synthetic Likelihood Construction|Wood's synthetic likelihood]] as the direct predecessor: it "estimates the mean $m_\theta$ and covariance matrix $S_\theta$ of a batch of data $x_n\sim p(x\mid\theta)$ sampled at a given $\theta$, and then approximates $p(x_o\mid\theta)\approx\mathcal N(x_o\mid m_\theta,S_\theta)$", typically "as an inner loop in the context of an MCMC sampler." Two differences define NLE:

1. **Shape.** A flow is not restricted to Gaussian summaries, so the central-limit argument behind [[Chaos and Phase-Insensitive Statistics|carefully chosen statistics]] is no longer needed for validity (though good summaries still help).
2. **Sharing across $\theta$.** Synthetic likelihood spends a fresh batch of simulations at every MCMC state and "requires new simulations for every MCMC step, thus requiring orders of magnitude more simulations" (Lueckmann et al. 2021). NLE interpolates across $\theta$ with one network; the simulator is never called inside the sampler. Gaussian-process surrogate ABC (Meeds & Welling) is the intermediate step, modelling $(m_\theta, S_\theta)$ as functions of $\theta$.

### Diagnostics unique to a likelihood surrogate

- **Simulation-based calibration** on 200 prior draws with 9 near-independent posterior samples each (Sec. 5.2); see [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]].
- **Median distance** between data simulated at posterior draws and $x_o$, per round, to judge convergence and "determine the minimum number of rounds."
- **Likelihood goodness-of-fit.** Because $q_\phi(x\mid\theta)$ is a generative model of data, one can simulate $N$ points from $p(x\mid\theta)$ and $N$ from $q_\phi(x\mid\theta)$ at a fixed $\theta$ and compute their Maximum Mean Discrepancy. "This kind of diagnostic is not possible with methods that approximate the posterior or the likelihood ratio."

### Limits

"SNL relies on estimating the density of the data, which is a hard problem in high dimensions" (Sec. 6). With raw time series or images as $x$, modelling $p(x\mid\theta)$ is harder than modelling $p(\theta\mid x)$, which is why NPE and NRE, which can absorb an embedding network, are usually preferred for high-dimensional outputs, and why NLE still leans on summary statistics.

## Examples

**SLCP: a simple likelihood with a complex posterior (Sec. 5.2).** $\theta\in\mathbb R^5$ with a uniform prior; $x$ is four 2-D points drawn from $\mathcal N(m_\theta, S_\theta)$ whose mean and covariance are nonlinear (squared) functions of $\theta$. The likelihood is a plain Gaussian, yet the posterior "has four symmetric modes (due to squaring), and vertical cut-offs (due to the uniform prior)." The authors' lesson: "approximating the likelihood can be simpler than approximating the posterior." Measured by MMD to the true posterior, SNL gave the best accuracy for a given number of simulations; SNPE-A "fails in the second round due to the variance of the proposal becoming negative", SNPE-B "experiences high variability", and "SMC-ABC and SL require orders of magnitude more simulations than the sequential neural methods."

**Real simulators.** On Lotka-Volterra (4 parameters, 9 features) SNL and SNPE-A performed best; SBC under a broad prior showed SNL "is sometimes over-confident", traced to prior draws whose populations die out or explode, and calibration was reasonable under a prior restricted to oscillating regimes. On a Hodgkin-Huxley neuron (12 parameters, 18 features) "SNL outperforms all other methods" and the goodness-of-fit curve showed the flow had not fully converged, a cue to run more rounds.

```python
# SNL skeleton
D, post = [], prior
for r in range(R):
    theta = post.sample(N)                       # MCMC on q(x_o | theta) p(theta); prior in round 1
    D += [(t, simulate(t)) for t in theta]
    fit_flow(q, D)                               # maximise sum log q(x | theta) over ALL rounds
    post = MCMCPosterior(lambda t: q.log_prob(x_o, context=t) + prior.log_prob(t))
```

## Connections

- [[Neural Simulation-Based Inference - Overview]] - NLE is the "amortized likelihood" panel of the Cranmer et al. taxonomy.
- [[Synthetic Likelihood - Overview]], [[Synthetic Likelihood Construction]], [[Nicholson's Blowfly Application]] - the Gaussian ancestor; SNL uses the same ecological style of benchmark.
- [[Neural Posterior Estimation (NPE)]] - the method SNL was designed to fix.
- [[Neural Ratio Estimation]] - "mirrors SNL" in plugging a surrogate into MCMC, but learns a ratio with a classifier.
- [[Implicit Likelihood Estimator]] - the same learned $q(y\mid\theta,d)$, used there to estimate expected information gain for implicit models.
- [[MCMC Basics]] and [[HMC and Stan in Practice]] - the samplers that finish the job.
- [[Simulation-Based Estimation - Overview]] - simulated maximum likelihood is the frequentist use of an estimated likelihood; a trained $q_\phi(x_o\mid\theta)$ can be maximized as well as sampled.

## See Also

- [[Amortized vs Sequential Inference]] - what the rounds buy and what they cost.
- [[Approximate Bayesian Computation for ABMs]] - the SMC-ABC baseline in the experiments.
- [[Method of Simulated Moments]] and [[Indirect Inference]] - alternatives when only a point estimate is needed.
- [[Simulation-Based and Amortized Inference]] - workflow-level context.
