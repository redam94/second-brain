---
title: Neural Ratio Estimation
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/method
  - doc/paper
source: "[[raw/Hermans Begy Louppe 2020 - Likelihood-free MCMC with Amortized Approximate Ratio Estimators.pdf]]"
source_location: "Hermans, Begy & Louppe (2020, ICML), Secs. 2.1-2.2 (pp. 1-2), Sec. 3 and 3.1 with Algorithm 1 (pp. 2-4), Sec. 3.2 ROC diagnostic (p. 4), Sec. 5 experiments (pp. 5-6); Cranmer et al. (2020) Sec. 3.B; Lueckmann et al. (2021) App. A.7-A.8; Dyer et al. (2022) Sec. 3.3"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Amortized vs Sequential Inference]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - NRE
  - SNRE
  - AALR-MCMC
  - Likelihood Ratio Trick
  - Likelihood-to-Evidence Ratio Estimation
  - Amortized Approximate Likelihood Ratio
---

# Neural Ratio Estimation

> [!summary]
> **Neural ratio estimation (NRE)** converts Bayesian inference for a simulator into **binary classification**. Train a classifier $d_\phi(x,\theta)$ to tell *dependent* pairs $(x,\theta)\sim p(x,\theta)$ from *independent* pairs $(x,\theta)\sim p(x)p(\theta)$; the optimal classifier's logit is the log **likelihood-to-evidence ratio** $\log r(x\mid\theta) = \log p(x\mid\theta)/p(x)$, so $\hat p(\theta\mid x) = p(\theta)\,\hat r(x\mid\theta)$. MCMC needs only likelihood *ratios* between consecutive states, so $\hat r$ drops straight into Metropolis-Hastings or HMC without ever evaluating a density. Hermans, Begy & Louppe (2020) call this **AALR-MCMC**. No density estimator, no invertibility constraint, no normalizing constant: just a well-calibrated classifier.

## Overview

Cranmer, Brehmer & Louppe (2020, Sec. 3.B) describe the idea as a relative of the GAN discriminator: "a classifier is trained using supervised learning to discriminate two sets of data, though in this case both sets come from the simulator and are generated for different parameter points $\theta_0$ and $\theta_1$. The classifier output function can be converted into an approximation of the likelihood ratio between $\theta_0$ and $\theta_1$!" They call this "manifestation of the Neyman-Pearson lemma in a machine learning setting" the **likelihood ratio trick**, and they recommend it whenever sampling synthetic data from the surrogate is not needed, because "estimating the likelihood ratio through a classifier is an example of supervised learning and often a simpler task" than density estimation.

The reason a *ratio* is enough (Hermans et al., Sec. 2.1): the Metropolis-Hastings acceptance probability for a move $\theta_t\to\theta'$ is

$$
\rho = \min\left(1,\; \frac{p(\theta')\,p(x\mid\theta')}{p(\theta_t)\,p(x\mid\theta_t)}\cdot\frac{q(\theta_t\mid\theta')}{q(\theta'\mid\theta_t)}\right),
$$

in which the evidence $p(x)$ cancels and the intractable likelihood enters only through $r(x\mid\theta',\theta_t) = p(x\mid\theta')/p(x\mid\theta_t)$.

## Main Content

> [!theorem] The likelihood ratio trick (Hermans et al., Sec. 2.2) ^thm-lr-trick
> Train a classifier $d(x)$ to separate $x\sim p(x\mid\theta_0)$ (label 1) from $x\sim p(x\mid\theta_1)$ (label 0). The optimal decision function is
>
> $$
> d^*(x) = \frac{p(x\mid\theta_0)}{p(x\mid\theta_0)+p(x\mid\theta_1)}, \qquad\text{hence}\qquad r(x\mid\theta_0,\theta_1) = \frac{d^*(x)}{1-d^*(x)}.
> $$
>
> Parameterizing the classifier by $\theta$ and fixing a reference hypothesis $\theta_{\text{ref}}$ gives a likelihood-to-reference ratio $r(x\mid\theta) = d^*(x,\theta)/(1-d^*(x,\theta))$, from which any pairwise ratio follows as $r(x\mid\theta_0,\theta_1) = r(x\mid\theta_0)/r(x\mid\theta_1)$.

**Why the reference hypothesis fails.** Hermans et al. (Sec. 3.1) report that "simply relying on the amortized likelihood-to-reference ratio estimator $\hat r$ does not yield satisfactory results, even when considering simple toy problems." If an observation has negligible density under both $p(x\mid\theta)$ and $p(x\mid\theta_{\text{ref}})$ there is no training data there, so "the ratio $\hat r(x\mid\theta)$ can take on an arbitrary value": many decision functions minimize the loss equally well (their Fig. 2). $\theta_{\text{ref}}$ becomes "a sensitive hyper-parameter which requires careful tuning."

> [!definition] Likelihood-to-evidence ratio estimator (Hermans et al., Sec. 3.1) ^def-lte-ratio
> Train $d_\phi(x,\theta)$ to distinguish dependent pairs $(x,\theta)\sim p(x,\theta)$ with label $y=1$ from independent pairs $(x,\theta)\sim p(x)p(\theta)$ with label $y=0$. The optimal classifier and the induced ratio are
>
> $$
> d^*(x,\theta) = \frac{p(x,\theta)}{p(x,\theta)+p(x)p(\theta)}, \qquad r(x\mid\theta) = \frac{d^*(x,\theta)}{1-d^*(x,\theta)} = \frac{p(x,\theta)}{p(x)p(\theta)} = \frac{p(x\mid\theta)}{p(x)}.
> $$
>
> The ratio "will always be defined everywhere it needs to be evaluated, as the joint $p(x,\theta)$ is consistently supported by the product of marginals." The posterior density follows directly: $\hat p(\theta\mid x) = p(\theta)\,\hat r(x\mid\theta)$.

> [!algorithm] Training $d_\phi(x,\theta)$ (Hermans et al., Algorithm 1) ^alg-nre
> Repeat until converged, with batch size $M$ and criterion $\ell$ (binary cross-entropy):
> 1. sample $\theta\leftarrow\{\theta_m\sim p(\theta)\}_{m=1}^M$;
> 2. sample $\theta'\leftarrow\{\theta'_m\sim p(\theta)\}_{m=1}^M$;
> 3. simulate $x\leftarrow\{x_m\sim p(x\mid\theta_m)\}_{m=1}^M$;
> 4. $\mathcal L\leftarrow \ell\big(d_\phi(x,\theta),1\big)+\ell\big(d_\phi(x,\theta'),0\big)$;
> 5. $\phi\leftarrow\text{OPTIMIZER}(\phi,\nabla_\phi\mathcal L)$.
>
> The "independent" class costs no extra simulations: it is the same $x$ re-paired with a fresh (or shuffled) $\theta'$.

**Numerical stability.** In the saturating regime where the classifier separates the classes almost perfectly, $d/(1-d)$ is unstable. The fix is to take "$\log\hat r(x\mid\theta)$ from the neural network before applying the sigmoidal projection in the output layer, since $\log\hat r(x\mid\theta)$ is the logit of $d(x,\theta)$", which also prevents vanishing gradients when computing $\nabla_\theta\log\hat r$.

### Likelihood-free MCMC

- **Metropolis-Hastings.** Replace the likelihood ratio in $\rho$ by $\hat r(x\mid\theta',\theta_t) = \hat r(x\mid\theta')/\hat r(x\mid\theta_t)$; "the algorithm remains otherwise unchanged."
- **Hamiltonian Monte Carlo.** With potential $U(\theta) = -\log p(x\mid\theta)$, the energy difference is $U(\theta_t)-U(\theta') = \log r(x\mid\theta',\theta_t)$ and the force is recoverable from a differentiable classifier, since $\nabla_\theta\log\hat r(x\mid\theta) = \nabla_\theta\log p(x\mid\theta)$ (the evidence does not depend on $\theta$). Cost: a backward pass through the ratio network per leapfrog step. See [[HMC and Stan in Practice]].

The method is **amortized**: "once the likelihood ratio estimator is trained, it is possible to run MCMC for any $x\sim p(x)$" (Lueckmann et al. 2021, App. A.7). Since $p(x_o)$ is constant in $\theta$, $\hat r(x_o\mid\theta)$ is proportional to the likelihood, so a different prior $p'(\theta)$ can be applied at inference time as $p'(\theta)\,\hat r(x_o\mid\theta)$ without retraining; the practical limit is that the classifier is only trustworthy where the training prior put mass.

> [!example] ROC diagnostic (Hermans et al., Sec. 3.2) ^ex-roc-diagnostic
> An exact ratio satisfies the identity $p(x\mid\theta) = p(x)\,r(x\mid\theta)$. So draw $x\sim p(x)$, reweight by $\hat r(x\mid\theta)$, and train a *second* classifier to distinguish the reweighted marginal from fresh simulations at $\theta$. "A diagonal ROC (AUC = 0.5) curve indicates that a classifier is insensitive and $\hat r(x\mid\theta) = r(x\mid\theta)$"; with the caveat that the same result arises "if the classifier is not powerful enough to extract any predictive features." The paper reports AUC = 0.58 on the tractable SLCP-style problem, 0.5 on detector calibration and M/G/1, and 0.55 on Lotka-Volterra. This is a classifier two-sample test applied to the surrogate, cousin of the C2ST metric in [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]].

### Multi-class generalization and SNRE

Durkan et al. (2020), as summarized in Dyer et al. (2022, Sec. 3.3.2) and Lueckmann et al. (2021, App. A.7), recast the task as picking the one correct $\theta$ out of a contrasting set of size $K$ for a given $x$; the network $f_\phi(x,\theta)$ then learns $\log\big(p(\theta\mid x)/p(\theta)\big)$. This shows the AALR loss "is closely related to the atomic SNPE-C/APT approach" and that both fit one contrastive framework. The benchmark used this variant with $K=10$, a ResNet classifier (two hidden layers of 50 units), and slice sampling with 100 chains.

**Sequential NRE** (Lueckmann et al. 2021, Algorithm 8) replaces the prior by a proposal $\tilde p(\theta)$ sampled by MCMC from the previous round's estimate, with positives from $p(x\mid\theta)\tilde p(\theta)$ and negatives from $p(x)\tilde p(\theta)$. "Exact posterior evaluation is not possible anymore, but samples can be obtained as before via MCMC", "at the cost of needing to train new classifiers for different $x_o$."

### Predecessors

CARL (Cranmer et al. 2015) learns likelihood ratios against a reference for frequentist tests. **LFIRE** (Dutta et al. 2016) estimates a likelihood-to-evidence ratio by logistic regression on summary statistics but "requires retraining for every evaluation of different $\theta$"; AALR trains one amortized classifier. Classifier ABC (Gutmann et al.) uses classification accuracy as the ABC discrepancy itself.

## Examples

**A 1-D sanity check.** Let $\theta\sim\mathcal N(0,1)$ and $x\mid\theta\sim\mathcal N(\theta,1)$, so $p(x) = \mathcal N(0,2)$ and the exact log ratio is

$$
\log r(x\mid\theta) = -\tfrac12(x-\theta)^2 + \tfrac14x^2 + \tfrac12\log 2 .
$$

A small MLP on inputs $(x,\theta)$ trained by Algorithm 1 should reproduce this quadratic surface in its logit. Then $\log\hat p(\theta\mid x_o) = \log p(\theta)+\log\hat r(x_o\mid\theta)$ is, up to a constant, $-\tfrac12\theta^2-\tfrac12(x_o-\theta)^2$: the conjugate posterior $\mathcal N(x_o/2,\,1/2)$ recovered with no density model at all.

```python
# one NRE training step (binary cross-entropy on logits)
theta   = prior.sample((M,))
x       = simulate(theta)
theta_p = theta[torch.randperm(M)]                 # break the pairing -> p(x)p(theta)
logit_j = net(x, theta)                            # log r_hat on dependent pairs
logit_m = net(x, theta_p)                          # log r_hat on independent pairs
loss    = bce_with_logits(logit_j, ones) + bce_with_logits(logit_m, zeros)

# likelihood-free MH acceptance at observation x_o
log_alpha = (net(x_o, th_new) + prior.log_prob(th_new)) - (net(x_o, th_old) + prior.log_prob(th_old))
```

## Connections

- [[Neural Simulation-Based Inference - Overview]] - NRE is the "amortized likelihood ratio" panel (Fig. 3g) of the Cranmer et al. taxonomy.
- [[Neural Likelihood Estimation and Sequential Neural Likelihood]] - "AALR-MCMC mirrors SNL as the trained conditional density estimator is plugged into MCMC samplers"; unlike SNL, a ratio cannot generate synthetic data but can evaluate the posterior density directly.
- [[Neural Posterior Estimation (NPE)]] - the multi-class NRE loss and SNPE-C are two faces of one contrastive objective.
- [[MCMC Basics]] - the acceptance ratio that makes a ratio sufficient.
- [[Likelihood-Free ACE and Gradient Estimation]] - for implicit models in experimental design, Foster et al. train an *unnormalized* likelihood approximation $f_\psi(\theta,y)$ inside a contrastive bound, the same "you only need the likelihood up to a $\theta$-free factor" insight. The log ratio $\log p(x\mid\theta)/p(x)$ that NRE learns is the pointwise mutual information whose expectation is the expected information gain.
- [[Approximate Bayesian Computation for ABMs]] - ABC "does not lend itself to frequentist inference"; a learned ratio does, via likelihood-ratio tests.

## See Also

- [[Amortized vs Sequential Inference]] - NRE amortizes the network but not the MCMC.
- [[Neural SBI for Agent-Based and Economic Models]] - NRE with recurrent embedding networks on economic ABMs, motivated as a *discriminative* alternative to modelling time series generatively.
- [[Implicit Likelihood Estimator]] - the density-estimation alternative in the design setting.
- [[Simulation-Based and Amortized Inference]] - workflow-level context.
