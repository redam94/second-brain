---
title: Neural SBI for Agent-Based and Economic Models
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/agent-based-modeling
  - topic/machine-learning
  - type/application
  - doc/paper
source: "[[raw/Dyer 2022 - Black-Box Bayesian Inference for Economic Agent-Based Models.pdf]]"
source_location: "Dyer, Cannon, Farmer & Schmon (2022, arXiv 2202.00625), Sec. 1 (pp. 1-4), Sec. 2 review (pp. 4-9), Sec. 3.1-3.7 (pp. 9-16; embedding networks p. 15), Sec. 4 experiments (pp. 16-24; Table 1 p. 20, Table 2 p. 24), Sec. 5 SBC (pp. 24-27), App. A-B (pp. 34-35)"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
doc_type: paper
depends_on:
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Ratio Estimation]]"
  - "[[Amortized vs Sequential Inference]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[ABM Calibration Overview]]"
used_by: []
aliases:
  - Neural SBI for ABMs
  - Black-Box Bayesian Inference for ABMs
  - Neural Calibration of Agent-Based Models
  - NPE and NRE for Economic Simulation Models
  - Embedding Networks for Time-Series SBI
---

# Neural SBI for Agent-Based and Economic Models

> [!summary]
> Dyer, Cannon, Farmer & Schmon (2022) test [[Neural Posterior Estimation (NPE)|NPE]] and [[Neural Ratio Estimation|NRE]] as calibration tools for economic agent-based models, where the output is a (multivariate) time series and each run is expensive. They frame the two methods as **black-box, simulation-efficient, discriminative** alternatives to the ABM literature's existing Bayesian methods (parametric / KDE likelihoods inside Metropolis-Hastings, classical ABC, particle filters), all of which resimulate at every MCMC step. Headline results against ground-truth posteriors: better Wasserstein and MMD scores than the KDE method with a roughly **10- to 15-fold** smaller budget on the Brock & Hommes model (the prose says "10-fold"; Table 1 lists $1.5\times10^5$ against $10^4$) and a **1000-fold** smaller budget on multivariate geometric Brownian motion; **learned summary statistics** from a recurrent embedding network beat hand-crafted ones when the posterior is diffuse; and, because the estimators are amortized, **SBC with 5,000 replicates becomes feasible**, which the authors estimate would need on the order of $10^8$ simulations for the KDE approach.

## Overview

An ABM takes $\theta$ and returns a stochastic time series $x$; its likelihood is "only implicitly defined by the software." The economics literature has calibrated such models mostly by **simulated minimum distance**, $\hat\theta = \arg\min_\theta f(y,\theta)$, which includes the [[Method of Simulated Moments]] with $f = (g(y)-\hat g_\theta)'W(g(y)-\hat g_\theta)$ and [[Indirect Inference]] (Sec. 1). Its "major drawback ... is that only parameter point estimates are produced." Bayesian alternatives exist but share a structural flaw.

> [!definition] The common pattern of existing Bayesian ABM methods (Dyer et al., Sec. 2-3.1) ^def-generative-pattern
> "For a fixed parameter $\theta$, iid simulations $x^{(r)}\sim p(x\mid\theta)$, $r=1,\dots,R$, are sampled to produce a proxy likelihood $\hat p(x\mid\theta)$", and this is repeated at each of the $n$ states of an MCMC chain, so "at least $nR$ simulations from the ABM are required", with $n$ "often a few hundred thousand." The variants reviewed (after Grazzini et al. 2017) are:
> - a **parametric likelihood** assuming the series fluctuates i.i.d. around a stationary level, "closely related to synthetic likelihood";
> - a **KDE likelihood**, more flexible but cursed by dimensionality and still assuming independent observations;
> - **classical ABC** on summary statistics such as mean, standard deviation and lag-1 autocorrelation;
> - **particle filters** for state-space formulations, which need structural assumptions and many particles;
> - a **mixture-density-network transition model** (Platt 2021) retrained at every $\theta$.
>
> Two defects recur: independence or stationarity assumptions that are "particularly poorly suited" to models "designed to produce non-equilibrium dynamics", and a simulation bill that scales with the length of the MCMC chain.

The vault's existing calibration notes cover the ABC branch ([[Approximate Bayesian Computation for ABMs]], [[HM-ABC Calibration Framework]]), the optimization branch ([[Genetic Algorithm Calibration for ABM]]) and the moment-matching branch ([[Q - Using SMM to Calibrate Agent Based Models]]). This note is the neural branch.

## Main Content

### Three arguments for NPE and NRE (Sec. 3.1)

1. **Simulation-efficient.** They "decouple the act of simulating from the task of constructing the posterior" by learning "global posterior density estimators" $h:\mathcal Y\times\Theta\to\mathbb R$, so that pointwise posterior evaluations "borrow strength from, and share information between, one another." The older methods treat each evaluation of $p(\theta\mid y)$ "as standalone density estimation tasks."
2. **Black-box.** No stationarity, Markov-order or error-distribution assumptions, so "the modeller [can] concentrate resources on model design and implementation, rather than on developing bespoke inference algorithms for each new simulator."
3. **Discriminative, not generative.** Likelihood-type methods learn the stochastic map $\theta\mapsto x$, i.e. a generative model of a complicated time series. NPE and NRE learn $x\mapsto\theta$ (or a classifier on pairs). "It is generally a simpler task to discriminate between complex time-series data than it is to generate such time-series." This is the ABM-specific reason to prefer NPE/NRE over [[Neural Likelihood Estimation and Sequential Neural Likelihood|NLE]].

### Learned summary statistics

> [!definition] Embedding network (Sec. 3.6, p. 15) ^def-embedding-network
> A network $s_\varphi$ with trainable parameters $\varphi$ placed in front of the density (ratio) estimator, "whose function is to consume the original high-dimensional dataset $x$ and express this as a lower-dimensional summary statistic vector $s_\varphi(x)$." Its parameters "and of the density (ratio) estimator may then be learned concurrently using the same loss function", so informative features are learned "in an end-to-end fashion", without a separate summary-selection stage. The architecture is where inductive bias enters: recurrent units for time series, exchangeable networks for i.i.d. sets.

This replaces the step on which ABC, [[Synthetic Likelihood - Overview|synthetic likelihood]] and SMM all depend, the hand choice of moments. The standing caveat applies: low-dimensional sufficient statistics "for arbitrary probabilistic models are generally unobtainable" (their footnote on the Pitman-Koopman-Darmois result), so any summary, learned or not, may lose information; a learned one is at least optimized for the inference task.

### Implementation used in the paper (App. A-B)

- **NPE:** [[Normalizing Flows as Conditional Density Estimators|masked autoregressive flow]], 5 transforms, each with 2 blocks and 50 hidden features. **NRE:** residual network with two layers of size 50, multi-class (Durkan et al. 2020) loss.
- All variables z-scored; Adam, batch size 50, learning rate $5\times10^{-4}$; 10% validation split, stop after 20 epochs without improvement; the `sbi` Python package.
- **Embedding nets:** two stacked Elman recurrent units (hidden size 32) plus a linear layer of size 16 for Brock & Hommes set 1; two stacked GRUs (hidden 32) plus linear 16, "approximately 10,000 trainable parameters", for set 2 and the GBM model.
- **Sampling:** NPE samples directly. NRE posteriors are sampled with random-walk Metropolis-Hastings (50,000 pilot steps to estimate the proposal covariance, then 100,000 steps thinned by 100, scale $\ell = 2/\sqrt d$) or, for the SBC study, sampling-importance-resampling from the prior with weights $\hat r(y,\theta)$.
- **Training scheme:** sequential ([[Amortized vs Sequential Inference|SNPE / SNRE]], 10 rounds of 1,000 simulations) for the Brock & Hommes posteriors; amortized single-round NPE / NRE for the GBM model and the SBC study.

### Evaluation standard

The authors criticise the ABM literature for judging Bayesian methods by point estimates, such as the distance from the posterior mean to the generating parameter. This is misleading because closeness is "not measured in the geometry of the target distribution", because a good mean can coexist with a badly wrong width, and because "finite datasets are not guaranteed to yield posterior densities" centred on the truth. They instead use models with a **tractable transition density**, obtain a ground-truth posterior by MCMC, and report the **Wasserstein distance** and **MMD** (Gaussian kernel, median heuristic) between sample sets. Compare the metric discussion in [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]].

> [!example] Results against ground truth (Tables 1-2) ^ex-dyer-results
> **Brock & Hommes heterogeneous-beliefs asset-pricing model**, $\theta=(g_2,b_2,g_3,b_3)$, $T=100$, uniform priors. An asterisk marks hand-crafted summaries (mean, variance, max, min, median, quartiles, autocorrelations at lags 1-3); no asterisk means summaries learned by the embedding network. Lower is better.
>
> | Parameter set | Metric | KDE | SNPE | SNPE* | SNRE | SNRE* |
> |---|---|---|---|---|---|---|
> | 1 ($\beta=120$, sharp posterior) | Wasserstein | 0.690 | 0.477 | 0.336 | 0.241 | 0.299 |
> | 1 | MMD | 1.015 | 0.789 | 0.552 | 0.451 | 0.781 |
> | 2 ($\beta=10$, diffuse posterior) | Wasserstein | 0.304 | 0.154 | 0.306 | 0.164 | 0.291 |
> | 2 | MMD | 0.127 | 0.036 | 0.133 | 0.041 | 0.118 |
> | Simulation budget | | $1.5\times10^5$ | $10^4$ | $10^4$ | $10^4$ | $10^4$ |
>
> **Multivariate geometric Brownian motion** ($d=3$ drift parameters, $T=100$), single-round amortized estimators with learned summaries:
>
> | Metric | KDE | NPE | NRE |
> |---|---|---|---|
> | Wasserstein | 0.364 | 0.099 | 0.107 |
> | MMD | 0.137 | 0.005 | 0.004 |
> | Simulation budget | $10^6$ | $10^3$ | $10^3$ |
>
> Reading: the neural methods with learned summaries beat KDE everywhere at a fraction of the budget. With hand-crafted summaries on parameter set 2 they are only level with KDE (SNPE* marginally worse at 0.306 vs 0.304, SNRE* marginally better at 0.291), which the authors describe as "comparable and slightly favourable." Learned summaries clearly win when the posterior is diffuse (set 2) and for SNRE throughout; on set 1 the hand-crafted summaries actually did better for SNPE (0.336 vs 0.477), so learned summaries are not a free lunch at $10^4$ simulations. On the GBM model the KDE posterior is "insufficiently diffuse and biased."

### Validation that was previously unaffordable

Section 5 runs [[The SBC Algorithm|SBC]] on the **Franke & Westerhoff** "Wealth & Predisposition" model of fundamentalist and chartist traders, an ABM with no tractable likelihood. Amortized NPE and NRE are trained on $10^4$ simulations of length $T=100$ for $\theta=(\alpha_w,\eta,\sigma_c)$ with priors $\alpha_w\sim\mathcal U(0,15000)$, $\eta\sim\mathcal U(0,1)$, $\sigma_c\sim\mathcal U(0,5)$, and SBC uses $P=5{,}000$ replicates. The rank histograms mostly fall inside the expected band, with "a minor bias towards larger rank values" for $\alpha_w$ under both methods, read via [[Interpreting SBC Histograms|the usual rules]] as marginal posteriors "slightly biased towards lower values on average." For the KDE method the same exercise would cost at least $PnR$ simulations: with $P\simeq10^3$, $R=1$ and $n$ in the hundreds of thousands, "the order of $10^8$." The authors' point is that NPE and NRE "allow the modeller to make statements of this sort in the first place."

### Caveats for applied use

- The ground-truth comparisons use models with tractable transition densities and 3-4 parameters; the truly intractable ABM is assessed only by SBC, which checks self-consistency, not closeness to the true posterior and not informativeness (see the [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)#^warn-sbc-limits|SBC caveat]]).
- Series are short ($T=100$) and budgets small ($10^3$ to $10^4$); the general benchmark found hard tasks unsolved even at $10^5$ simulations.
- Nothing here addresses **misspecification**. A real market series outside the ABM's prior predictive yields an extrapolated posterior with no warning. Discrepancy-aware approaches such as [[History Matching for ABMs|history matching]] (which carries an explicit model-discrepancy term) and the uncertainty budget in [[Uncertainty Quantification for ABM Calibration]] remain relevant complements.
- Tables 1-2 report a single number per method and setting, with no run-to-run variability, so small differences (such as 0.304 vs 0.306) should not be over-read.

## Examples

**Workflow for calibrating a marketing ABM with NPE.**

1. **Prior.** Put proper priors on behavioural parameters (word-of-mouth rate, ad-response elasticity, churn). Optionally shrink the box first with [[History Matching for ABMs|history-matching waves]], as the [[HM-ABC Calibration Framework]] does before ABC.
2. **Simulate.** Draw $N=10^4$ parameter vectors and run the ABM once each, storing the *raw* weekly series of sales, awareness and share; no moment selection yet. One simulation per $\theta$, not $R$ replicates.
3. **Embed.** A GRU over the multivariate series emitting about 16 features, trained jointly with a conditional flow over $\theta$. Keep a hand-crafted-summary variant as a baseline, since Table 1 shows it can win.
4. **Validate.** SBC on 1,000 to 5,000 held-out joint draws; posterior predictive checks of the real series; confirm that the real data's embedding lies inside the cloud of simulated embeddings.
5. **Infer.** Evaluate $q_\phi(\theta\mid x_{\text{obs}})$: instantaneous, and reusable for each new market or quarter.
6. **Refine if needed.** If the posterior is much narrower than the prior, use it as the proposal for a few SNPE rounds.

```python
# sketch in the style of the `sbi` package; GRUEmbedding is a user-defined torch.nn.Module
embedding = GRUEmbedding(input_size=n_series, hidden_size=32, out_features=16)
flow      = posterior_nn(model="maf", embedding_net=embedding, num_transforms=5, hidden_features=50)
npe       = NPE(prior=prior, density_estimator=flow)
npe.append_simulations(theta, x_timeseries).train(training_batch_size=50, learning_rate=5e-4)
posterior = npe.build_posterior()
draws     = posterior.sample((10_000,), x=x_observed)          # then run SBC on held-out (theta, x)
```

**Versus SMM on the same model.** SMM needs $S$ simulations at every optimizer step with common random numbers, returns $\hat\theta$ with asymptotic standard errors and a $J$-test, and hinges on the chosen moments. NPE needs one batch of simulations up front, returns a full (possibly multimodal) posterior, learns its summaries, and supports SBC, but offers no overidentification test and no asymptotic theory. They are complements: the SMM moments are a sensible hand-crafted baseline summary vector for NPE.

## Connections

- [[ABM Calibration Overview]] - neural SBI is a fifth strategy beside genetic algorithms, controlled experimentation, analytical baselines and HM+ABC; like HM+ABC it yields a posterior rather than a point estimate.
- [[Approximate Bayesian Computation for ABMs]] and [[HM-ABC Calibration Framework]] - the classical Bayesian route; ABC is one of the kernels in Dyer et al.'s unifying Eq. (5), $\hat p(\theta\mid y)\propto\int K_\epsilon(y,x)\,p(x\mid\theta)\,p(\theta)\,dx$.
- [[Q - Using SMM to Calibrate Agent Based Models]], [[Method of Simulated Moments]], [[Indirect Inference]], [[Simulation-Based Estimation - Overview]] - the simulated-minimum-distance family the paper positions itself against.
- [[Synthetic Likelihood - Overview]] - the parametric-likelihood method of Grazzini et al. is "closely related."
- [[Neural Posterior Estimation (NPE)]], [[Neural Ratio Estimation]], [[Normalizing Flows as Conditional Density Estimators]] - the machinery.
- [[Amortized vs Sequential Inference]] - sequential for sharp single posteriors, amortized for SBC.
- [[Simulation-Based Calibration - Overview]], [[The SBC Algorithm]] - the validation made affordable.

## See Also

- [[ABM in Marketing Strategy]] - the class of marketing simulators this workflow targets.
- [[ABM Calibration Case Studies]] - earlier calibration examples in the vault.
- [[Uncertainty Quantification for ABM Calibration]] - ensemble, observation and discrepancy uncertainty.
- [[Bayesian Media Mix Modeling - Overview]] - the likelihood-based counterpart in marketing measurement; an ABM calibrated by NPE can serve as a simulated test bed for MMM and geo-experiment estimators.
- [[Simulation-Based and Amortized Inference]] - workflow-level context.
