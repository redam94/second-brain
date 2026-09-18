---
title: Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
  - type/method
  - doc/paper
source: "[[raw/Lueckmann 2021 - Benchmarking Simulation-Based Inference.pdf]]"
source_location: "Lueckmann, Boelts, Greenberg, Goncalves & Macke (2021, AISTATS), Sec. 2.1-2.4 (pp. 2-5, Table 1 p. 5), Sec. 3 findings 1-6 (pp. 6-7), Box 1 (p. 8), Sec. 4 limitations (p. 9), App. M.1-M.2 (p. 42); Cranmer et al. (2020) Sec. 3.C (p. 8); Papamakarios et al. (2019) Sec. 5.2; Hermans et al. (2020) Sec. 3.2"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[Amortized vs Sequential Inference]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[The SBC Algorithm]]"
used_by:
  - "[[Neural SBI for Agent-Based and Economic Models]]"
aliases:
  - SBI Benchmark
  - sbibm
  - C2ST
  - Classifier Two-Sample Test
  - Diagnosing Simulation-Based Inference
  - SBI Diagnostics
---

# Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)

> [!summary]
> A neural posterior has no $\hat R$, no divergences, no effective sample size: a badly trained network returns a smooth, confident, wrong answer. Two questions must be kept apart. **Benchmarking** (you know the truth): how close is $q(\theta\mid x_o)$ to a reference posterior? Lueckmann et al. (2021) show that "the choice of performance metric is critical", reject the two most common metrics, and settle on the **classifier two-sample test (C2ST)**, where 0.5 is perfect and 1.0 is useless. **Diagnosing** (you do not know the truth, the real situation): is the procedure at least *self-consistent*? Here the tools are [[Simulation-Based Calibration - Overview|simulation-based calibration]] and the coverage property it implies, posterior predictive checks, and surrogate-specific tests. Both papers stress the limits: SBC "is merely a consistency check" that a posterior equal to the prior would pass, and none of it detects a misspecified simulator.

## Overview

The benchmark (code: `sbibm`) has three ingredients (Sec. 2): **algorithms**, in sequential and non-sequential pairs (REJ-ABC/SMC-ABC, NLE/SNLE, NPE/SNPE, NRE/SNRE, plus RF-ABC and synthetic likelihood reported separately); **ten tasks** chosen so that reference posterior samples can be obtained; and **metrics**. Each task has 10 observations with 10k reference posterior samples each, every algorithm is run at budgets from 1k to 100k simulations, and the hyperparameter sweep comprised "more than 10k runs."

Tasks: Gaussian Linear and Gaussian Linear Uniform (10-d; trivial scaling and truncated support), **SLCP** and SLCP with 92 distractor outputs, Bernoulli GLM on 10-d sufficient statistics and on 100-d raw data, a Gaussian Mixture from the ABC literature, **Two Moons** (bimodal, crescent-shaped), **SIR** (2 parameters, 10 time points) and **Lotka-Volterra** (4 parameters, 10 time points per species).

## Main Content

### Which metric is usable depends on what you know

> [!definition] Applicability of metrics (Lueckmann et al., Table 1) ^def-metric-applicability
> Access to ground truth is cumulative: (i) only $x_o$; (ii) the generating $\theta_o$; (iii) samples from the true posterior; (iv) its gradients; (v) its density. Correspondingly usable: 1 = posterior predictive checks, 2 = probability of $\theta_o$, 3 = two-sample tests (MMD, C2ST), 4 = one-sample tests (kernelized Stein discrepancy), 5 = $f$-divergences. What the algorithm returns also matters: ABC returns only samples; (S)NLE and (S)NRE return samples and an unnormalized density; only (S)NPE returns a normalized density that "can be evaluated and sampled directly, without MCMC."

**Two popular metrics the benchmark rejects.**

**Negative log probability of the true parameters (NLTP)**, $-\mathbb E[\log q(\theta_o\mid x_o)]$, is used in most of the papers in this cluster. Averaged over many prior-predictive pairs it is legitimate, because (App. M.1)

$$
\mathbb E_{\theta_o\sim p(\theta)}\,\mathbb E_{x_o\sim p(x\mid\theta_o)}\big[-\log q(\theta_o\mid x_o)\big] = \mathbb E_{x_o\sim p(x)}\,D_{\mathrm{KL}}\big(p(\theta\mid x_o)\,\Vert\,q(\theta\mid x_o)\big) + \mathbb E_{x_o\sim p(x)}\,H\big(p(\theta\mid x_o)\big),
$$

and the entropy term is common to all algorithms. But on a handful of pairs it misleads. Their example: $\theta\sim\mathcal N(0,1)$, $x\mid\theta\sim\mathcal N(\theta,1)$, $\theta_o=0$, and an unlucky $x_o=2.1$. The true posterior is $\mathcal N(1.05, 0.5^2)$, under which $\theta_o$ is more than two standard deviations out; an algorithm that *wrongly* reports standard deviation 1 assigns $\theta_o$ higher probability and scores better. Empirically, NLTP over 10 observations "had a correlation of only 0.3 with C2ST on Two Moons and 0.6 on the SLCP task."

**Median distance of posterior predictive samples to $x_o$ (MEDDIST).** "PPCs should be considered a mere check rather than a metric": an algorithm with "a good MAP point estimate could perfectly pass this check even if the estimated posterior is poor."

> [!definition] Classifier two-sample test (C2ST) ^def-c2st
> Train a classifier to discriminate samples of the approximate posterior from samples of the reference posterior and report held-out **accuracy**: 0.5 means indistinguishable, 1.0 means perfectly separable. Benchmark settings (Sec. 2.4): a multilayer perceptron with two hidden layers, "each with 10 times as many ReLU units as the dimensionality of the data", five-fold cross-validation. The scale is interpretable and, unlike **MMD** with the median-heuristic kernel, C2ST was not fooled by multimodality: on Two Moons "MMD had difficulty discerning markedly different posteriors." Kernelized Stein discrepancy "showed numerical problems on Two Moons."

> [!theorem] The six findings (Lueckmann et al., Sec. 3) ^thm-benchmark-findings
> 1. **Choice of performance metric is key.** C2ST, MMD and MEDDIST rank the same runs differently.
> 2. **These are not solved problems.** "For several tasks, no algorithm could solve them with the specified budget (e.g., SLCP, Lotka-Volterra)."
> 3. **Sequential estimation improves sample efficiency**, with diminishing returns at large budgets. See [[Amortized vs Sequential Inference]].
> 4. **Density- or ratio-estimation algorithms generally outperform classical techniques**, because they "efficiently interpolate between different simulations. Without such model-based interpolation, even a simple 10-d Gaussian task can be challenging." But rejection methods have "a computational footprint that is orders of magnitudes smaller", so "on low-dimensional problems and for cheap simulators, these methods can still be competitive."
> 5. **No one algorithm to rule them all.** No consistent winner among SNLE, SNRE and SNPE.
> 6. **The benchmark diagnoses implementation issues.** For (S)NLE and (S)NRE the MCMC step "can limit the performance": single slice-sampling chains started from the prior "frequently got stuck in single modes", and both methods "improved by transforming parameters to be unbounded." Also, "higher capacity density estimators were beneficial for posterior but not likelihood estimation."

### Diagnosing without ground truth

**Simulation-based calibration.** Draw $\theta\sim p(\theta)$, $x\sim p(x\mid\theta)$, $\theta'\sim q(\theta'\mid x)$. The benchmark's App. M.2 restates the [[Data-Averaged Posterior Self-Consistency|self-consistency identity]]: the marginal of $\theta'$ is $\pi(\theta') = \int p(x)\,q(\theta'\mid x)\,dx$, which equals the prior when $q$ is the true posterior. The [[The SBC Algorithm|SBC algorithm]] tests this through [[Rank Statistics and Uniformity|rank statistics]], and [[Interpreting SBC Histograms|histogram shapes]] indicate over- or under-dispersion and bias. The SNL paper used it with 200 joint draws and 9 near-independent posterior samples per draw.

**Coverage.** Uniform SBC ranks imply that, for each scalar parameter, credible intervals of every level contain the generating value with their nominal frequency when averaged over the prior predictive; the vault's [[Simulation-Based Calibration - Overview]] puts it as "analogous to checking the coverage of a credible interval under the assumed model." Cranmer et al. (Sec. 3.C) describe the repair as well as the test: using "a parametric bootstrap approach" one can "calibrate the inference procedure to provide confidence sets and posteriors with proper coverage and credibility", although "such procedures may require a large number of simulations." An over-confident neural posterior (SBC histogram piled at the extremes, coverage below nominal) is the dangerous direction, because it produces false certainty about $\theta$. Dedicated expected-coverage tests for SBI are a later literature not among this cluster's sources.

> [!warning] What SBC cannot see (App. M.2) ^warn-sbc-limits
> "SBC as described above is merely a consistency check. For example, if the approximate posterior were the prior, a calibration test as described above would not be able to detect this. This is a realistic failure mode in simulation-based inference. It could happen with rejection ABC in the limit $\epsilon\to\infty$, or when learned summary statistics have no information about $\theta$." Calibration is necessary, not sufficient: pair it with a measure of **sharpness** (posterior contraction relative to the prior) or with NLTP averaged over many draws, which does reward informativeness.

**Cost.** Both SBC and averaged NLTP need "inference for hundreds of $x_o$ which is only feasible if inference is rapid (amortized)." This is why the benchmark itself did not rely on SBC, and why amortized NPE is the easiest method to validate.

**Other checks catalogued by Cranmer et al. (Sec. 3.C, p. 8).** Training classifiers "to distinguish data from the surrogate model and the true simulator"; "checking known expectation values of estimators of the likelihood, likelihood ratio, or score"; "varying reference parameters that should leave the inference result invariant"; ensemble methods; comparing network outputs "against known asymptotic properties." Their verdict: "Passing these sanity checks does not guarantee that an estimator is correct, but failing them is an indication of problems."

**Surrogate-specific diagnostics.**
- NLE: MMD between simulator draws and flow draws at a fixed $\theta$, a test of the likelihood fit itself; see [[Neural Likelihood Estimation and Sequential Neural Likelihood]].
- NRE: the [[Neural Ratio Estimation#^ex-roc-diagnostic|ROC / AUC test]] of the identity $p(x\mid\theta) = p(x)\,r(x\mid\theta)$.
- All methods: [[Posterior Predictive Checking]] against $x_o$, remembering it is "a mere check."

> [!warning] Misspecification is out of scope for every diagnostic here ^warn-misspecification
> "None of these diagnostics address the issues encountered if the model is misspecified and the simulator is not an accurate description of the system being studied" (Cranmer et al., p. 8). SBC validates inference *under the simulator*. A real $x_o$ that lies outside the simulator's prior predictive sends a neural network into extrapolation with no warning. Always check where $x_o$ falls in the simulated distribution of the summaries or the embedding.

### Practitioner's questions (Box 1)

Do we need the posterior or only a point estimate? Is the simulator really a black box (if the likelihood is available, use MCMC or VI; if internals are exposed, consider probabilistic programming)? What domain knowledge exists for priors, distances and architectures? Do we have or can we learn summary statistics ("the posterior given summary statistics $p(\theta\mid s(x_o))$ is only equivalent to $p(\theta\mid x_o)$ if the summary statistics are sufficient")? Is everything low-dimensional and the simulator cheap (then classical ABC is competitive)? Are simulations expensive (then go sequential)? Will inference be repeated (then amortize)?

## Examples

**C2ST in a dozen lines.**

```python
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import cross_val_score
import numpy as np

def c2st(approx, reference, seed=0):
    X = np.vstack([approx, reference])
    X = (X - reference.mean(0)) / reference.std(0)              # z-score
    y = np.r_[np.zeros(len(approx)), np.ones(len(reference))]
    d = X.shape[1]
    clf = MLPClassifier(hidden_layer_sizes=(10 * d, 10 * d), max_iter=1000, random_state=seed)
    return cross_val_score(clf, X, y, cv=5, scoring="accuracy").mean()   # 0.5 best, 1.0 worst
```

For a real problem there is no reference posterior, so C2ST is a tool for **dress rehearsals**: build a simplified version of your simulator with a tractable likelihood, obtain a reference posterior by MCMC, and use C2ST to choose the algorithm, budget and architecture before moving to the real simulator, which is how Dyer et al. use tractable economic models.

**SBC for an amortized NPE.** With a trained $q_\phi$, draw $P=1000$ pairs from the joint, draw $L=99$ samples from $q_\phi(\cdot\mid x_p)$ for each, record the rank of each $\theta_{p,j}$ among its samples, and histogram per parameter. Cost: zero new simulations beyond the 1000 held-out pairs. A $\cup$-shaped histogram signals an over-confident network (train longer, add capacity, or add simulations); a $\cap$ shape signals an under-confident one.

## Connections

- [[Simulation-Based Calibration - Overview]], [[The SBC Algorithm]], [[Rank Statistics and Uniformity]], [[Interpreting SBC Histograms]], [[Data-Averaged Posterior Self-Consistency]], [[SBC Case Studies]] - the vault's full treatment of SBC (Talts et al. 2018), developed there for MCMC and VI; everything carries over with the neural posterior in place of the sampler.
- [[Amortized vs Sequential Inference]] - why only amortized estimators are cheap to validate.
- [[Neural Posterior Estimation (NPE)]], [[Neural Likelihood Estimation and Sequential Neural Likelihood]], [[Neural Ratio Estimation]] - the algorithms benchmarked; their original papers mostly report NLTP and MMD, the metrics questioned here.
- [[Approximate Bayesian Computation for ABMs]] and [[Synthetic Likelihood - Overview]] - the classical baselines; synthetic likelihood "requires new simulations for every MCMC step, thus requiring orders of magnitude more simulations."
- [[Posterior Predictive Checking]] - the one diagnostic always available with only $x_o$.
- [[Variational Inference and Pathfinder]] - faces the same "is this approximation any good?" problem on the likelihood-based side.

## See Also

- [[Fitting and Validating Computation]] and [[Computational Troubleshooting]] - the general Bayesian-workflow stance on validating computation with fake data.
- [[Uncertainty Quantification for ABM Calibration]] - sources of uncertainty a calibrated posterior still omits.
- [[Neural SBI for Agent-Based and Economic Models]] - Wasserstein and MMD against a ground-truth posterior plus SBC, applied to economic ABMs.
- [[Neural Simulation-Based Inference - Overview]] - the cluster hub.
