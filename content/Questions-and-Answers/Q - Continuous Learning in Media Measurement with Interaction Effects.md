---
title: "Q: What would continuous learning look like in media measurement, given that media has interaction effects and learning all interactions is costly or needs more cells than available techniques support?"
tags:
  - type/qa
  - topic/market-response
  - topic/bayesian-experimental-design
  - topic/bayesian-statistics
  - topic/probabilistic-numerics
date_asked: 2026-07-01
answered_from:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Functional Forms in Marketing]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[Expected Information Gain]]"
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
  - "[[High-Dimensional Design Applications]]"
  - "[[Bayesian Optimisation]]"
  - "[[Acquisition Functions]]"
  - "[[Global-Local Shrinkage Priors]]"
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
related_questions:
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - Continuous learning in media measurement
  - Active learning of media interaction effects
  - Adaptive experimentation for media mix with interactions
  - How to learn media interactions without a full factorial
---

# What would continuous learning look like in media measurement, given interaction effects and the cell-explosion problem?

> [!summary]
> Continuous learning in media measurement is a **closed loop**: a Bayesian *surrogate* of the response surface (a media-mix model or GP) is continually re-fit as data arrive; an **active-experimentation** layer then picks the next spend allocation / geo-test to run by maximizing **expected information gain** about the effects — including interactions — that are still uncertain and decision-relevant. The combinatorial "too many cells" problem is not solved by testing every cell; it is dissolved two ways: (1) **model interactions continuously** (GP kernels or parametric interaction terms) instead of enumerating a full factorial, and (2) **shrink** the many interaction coefficients with global–local / hierarchical priors so data is spent only on interactions the evidence supports. The information-driven experiment-selection rule is the *same* expected-loss/value-of-information logic that drives [[Bayesian Optimisation]] acquisition functions, and it scales to hundreds of design dimensions via gradient-based BOED and amortized policies.

## Answer

### 1. Reframe "continuous learning" as a measure → decide → experiment → update loop

Static media measurement fits one media-mix model (MMM) to a fixed observational history and reads off effects. The trouble, documented directly in the vault, is that this is *information-starved*: for a typical MMM sample (a couple of years of weekly data), **"the posterior is dominated by the prior and the data cannot correct prior-induced bias"** ([[Bayesian Estimation and Priors for MMM]]), and the derived optimal media mix **"has large variance (in one scenario, three modes)"** ([[ROAS, mROAS, and Optimal Media Mix]]). Interaction effects make this worse: they are exactly the terms with the least observational identification.

Continuous learning replaces the one-shot fit with a loop:

1. **Model** — maintain a Bayesian posterior over the response surface (§2).
2. **Decide** — act on it (allocate budget) via expected-loss minimization ([[Decision Analysis]], [[ROAS, mROAS, and Optimal Media Mix]]).
3. **Experiment** — deliberately choose the *next* test to run so as to most reduce uncertainty about the effects/interactions that matter (§3).
4. **Update** — fold the new data into the posterior and repeat.

Steps 3–4 are what make it "continuous," and they are the province of [[Bayesian Experimental Design - Overview|Bayesian experimental design]] and [[Bayesian Optimisation]].

### 2. The measurement model, and why interactions do not require a full factorial

**Parametric MMM.** The vault's MMM ([[Bayesian Media Mix Modeling - Overview]], Jin et al. Google 2017) already captures the two nonlinearities linear regression misses — **carryover/adstock** ([[Carryover (Adstock) Functional Forms]]) and **shape/saturation** ([[Shape (Saturation) Effects]]) — in a Bayesian framework. Cross-channel **interactions** (synergy between, say, TV and search) enter as multiplicative or interaction terms; the marketing-measurement literature catalogues multiplicative and other non-additive functional forms that encode interaction without a separate experimental cell per combination ([[Functional Forms in Marketing]]).

**Continuous (nonparametric) surrogate.** Alternatively, model the response surface with a [[Gaussian Process Regression|Gaussian process]]. A GP with a non-additive kernel represents *all* interactions implicitly through the covariance function — you never enumerate cells; you infer a smooth surface from wherever you have data. Scalable variants such as [[Hilbert Space Gaussian Processes|Hilbert-space GPs]] make this tractable at MMM data sizes.

> [!tip] The key move for the cell-explosion problem
> A full factorial over $K$ channels with pairwise (or higher) interactions needs $O(2^K)$ or more cells. Both a GP surrogate and a parametric interaction model **replace enumeration with a function** — you learn a continuous response surface and *query it* at any allocation, so "cells" become points you may or may not choose to sample, not a grid you must fill.

### 3. Taming the interaction/cell explosion with shrinkage

Even with a parametric interaction model, the number of candidate interaction coefficients explodes. The vault's answer is **not more data per cell but stronger structure**:

- **Global–local shrinkage / horseshoe priors** write each (interaction) coefficient as $\beta_j \sim \mathcal N(0, \tau^2\lambda_j^2)$: a global scale $\tau$ pulls *everything* toward zero while a heavy-tailed local scale $\lambda_j$ lets genuinely large interactions escape ([[Global-Local Shrinkage Priors]]). The **regularized horseshoe** adds a principled way to encode expected sparsity via the *effective number of nonzeros* $m_\text{eff}$ and regularizes large coefficients under weak likelihoods ([[Horseshoe and Regularized Horseshoe Priors]]) — precisely the weak-likelihood regime MMM lives in.
- **Hierarchical / partial pooling.** Treat cell-level (e.g. geo × channel) effects as exchangeable draws from a population distribution; partial pooling **"shrinks noisy estimates toward the group mean while preserving well-estimated group effects"** ([[Hierarchical Models]]), giving a data-adaptive correction with a quantified shrinkage factor $1/\sqrt{1+\sigma_{\bar y}^2/\sigma_\theta^2}$ ([[Partial Pooling as Multiple Comparisons Correction]]). This lets you carry *many* interaction cells at once because unsupported ones collapse toward zero rather than overfitting.
- **Factor structure.** Where interactions share latent drivers, a low-rank [[Factor Analysis and PPCA|factor / PPCA]] representation compresses a high-dimensional interaction matrix into a few factors.

Net effect: the model can *nominally* contain far more interaction terms than you have cells for, because the prior spends degrees of freedom only where the data demand it. This is the statistical half of "more cells than techniques can support."

### 4. The learning engine: active, information-driven experimentation

Shrinkage controls variance, but to actually *learn* the decision-relevant interactions you must gather informative data. This is [[Bayesian Experimental Design - Overview|Bayesian experimental design (BED)]].

> [!definition] Expected Information Gain ([[Expected Information Gain]])
> For a candidate experiment (design) $\xi$ — e.g. a geo-holdout, a spend perturbation, a channel on/off pattern — the **EIG** is the expected reduction in posterior entropy about the latent effects $\theta$, equivalently the mutual information $\mathrm{MI}_\xi(\theta;y)$:
> $$
> \mathrm{EIG}(\xi)=\mathbb E_{p(y\mid\xi)}\big[\mathrm H[p(\theta)]-\mathrm H[p(\theta\mid y,\xi)]\big].
> $$
> The optimal next experiment is $\xi^\*=\arg\max_\xi \mathrm{EIG}(\xi)$.

Point $\theta$ at the **interaction coefficients you are still uncertain about and that move the budget decision**, and EIG-maximization automatically proposes the test that best resolves them — instead of testing all cells, you test the few that pay for themselves in information.

- **Continuous, adaptive loop.** [[Sequential and Adaptive BED]] (Bayesian adaptive design) chooses each experiment $\xi_t$ from the current posterior $p(\theta\mid h_{t-1})$ by maximizing the **incremental EIG** — literally the design → run → infer → repeat loop of §1.
- **Real-time policies.** Re-optimizing EIG every cycle is costly; **[[From Designs to Policies (Deep Adaptive Design)|Deep Adaptive Design (DAD)]]** trains a policy network offline to map history directly to the next design, so at deployment a single forward pass proposes the next test "no inference, no optimization, in real time" and is **non-myopic**.
- **Scaling to many design dimensions.** The objection that interactions need "more cells than techniques can support" is met head-on by gradient-based BOED: [[High-Dimensional Design Applications]] shows one-stage gradient methods delivering ~2× the EIG of baselines in a **400-dimensional** design and beating human experts in a **100-D** real docking problem — regimes where enumerating or grid-searching cells is hopeless ([[Unified SGD BOED - Overview]], [[Adaptive Contrastive Estimation (ACE)]]).

### 5. The unifying insight: information-selection = Bayesian-optimization acquisition

Choosing the next experiment to maximize EIG is the **same expected-loss / value-of-information logic** as choosing the next evaluation in [[Bayesian Optimisation]]: BO "maps a loss through the surrogate to an **acquisition function** $\alpha(x\mid\mathcal D)$ — an expected loss whose optimiser selects the next evaluation" ([[Bayesian Optimisation]]). If the goal is to *find the best budget allocation* (optimize) rather than to *characterize all interactions* (learn), swap the EIG objective for an acquisition function — [[Acquisition Functions|Expected Improvement, GP-UCB, Knowledge Gradient]], or the information-theoretic [[Value Loss and Entropy Search|entropy search]] family (which is itself EIG about the location of the optimum). Both live on the same GP/Bayesian surrogate.

Practical machinery for real programs comes from [[Further Topics in Global Optimisation]]: **batch/parallel BO** (propose several geo-tests at once), and **multi-fidelity** modelling (combine cheap correlational MMM reads with expensive but clean geo-experiments) — a natural fit for media, where information sources vary in cost and cleanliness.

### Practical Implications

A concrete continuous-measurement system:

1. **Surrogate**: Bayesian MMM with adstock + saturation, cross-channel interaction terms under a **regularized-horseshoe** prior (or a GP response surface), fit by MCMC/HMC ([[Bayesian Estimation and Priors for MMM]]).
2. **Uncertainty target**: identify interaction coefficients whose posterior is both wide *and* budget-relevant (large influence on [[ROAS, mROAS, and Optimal Media Mix|mROAS]]).
3. **Experiment selection**: each planning cycle, choose the geo-holdout / spend-perturbation that maximizes **incremental EIG** on those targets ([[Sequential and Adaptive BED]]); amortize with a **DAD** policy if cycles are frequent.
4. **Act**: allocate budget by minimizing expected loss under the current posterior ([[Decision Analysis]]).
5. **Update & repeat**: shrinkage keeps unsupported interactions dormant; EIG "wakes up" only the ones worth the spend of a test.

The upshot: you never need a cell for every interaction. You need a *continuous surrogate*, *strong priors* that make many interactions cheap to carry, and an *information objective* that spends your limited, expensive experiments on the interactions that actually change the decision.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Bayesian Media Mix Modeling - Overview]] | The measurement model: adstock, saturation, Bayesian estimation |
| [[Bayesian Estimation and Priors for MMM]] | Why observational MMM is information-starved (prior dominates) |
| [[ROAS, mROAS, and Optimal Media Mix]] | Decision layer + the high-variance/multimodal optimal-mix posterior motivating experiments |
| [[Functional Forms in Marketing]] | Multiplicative/interaction functional forms without per-cell enumeration |
| [[Global-Local Shrinkage Priors]] | Carrying many interaction coefficients via $\tau,\lambda_j$ shrinkage |
| [[Horseshoe and Regularized Horseshoe Priors]] | Sparsity via $m_\text{eff}$; regularization under weak likelihoods |
| [[Partial Pooling as Multiple Comparisons Correction]] | Data-adaptive shrinkage of many cell-level effects |
| [[Hierarchical Models]] | Partial pooling / exchangeability foundation |
| [[Expected Information Gain]] | The objective that selects the next experiment |
| [[Sequential and Adaptive BED]] | The continuous adaptive design loop (incremental EIG) |
| [[From Designs to Policies (Deep Adaptive Design)]] | Real-time, non-myopic amortized experiment policies |
| [[High-Dimensional Design Applications]] | Gradient BOED scaling to 100–400-D design spaces |
| [[Bayesian Optimisation]] · [[Acquisition Functions]] | Same value-of-information logic when the goal is to optimize allocation |
| [[Gaussian Process Regression]] · [[Hilbert Space Gaussian Processes]] | Continuous interaction surrogate instead of a factorial grid |
| Jin et al. 2017 | Original MMM source |
| Rainforth et al. 2023 | Adaptive design, DAD, computational scaling |

## Related Concepts

- [[Value Loss and Entropy Search]] — information-theoretic acquisitions; EIG about the optimum's location
- [[Further Topics in Global Optimisation]] — batch/parallel and multi-fidelity BO for real experimentation programs
- [[Adaptive Contrastive Estimation (ACE)]] / [[Prior Contrastive Estimation (PCE)]] — gradient EIG bounds enabling high-dimensional design
- [[Reaction Functions and Competitive Dynamics]] — competitive interactions in market response
- [[Decision Analysis]] — the expected-loss decision layer that closes the loop
- [[Factor Analysis and PPCA]] — low-rank compression of high-dimensional interaction structure
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] — the shrinkage view of "too many effects"
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — why observational MMM needs experimental augmentation

## Gaps

The vault covers every *building block* but not their assembled application to media specifically:
- **No note explicitly combines MMM + BED** into a media-experimentation loop (geo-experiments as EIG-optimal designs). The synthesis above is inferred from adjacent notes; consider ingesting a source on **incrementality / geo-experiments** (e.g. Google's geo-based `GeoLift`/`MMM + experiment calibration` literature).
- **No note on multi-armed bandits / Thompson sampling** for always-on creative or budget allocation — a common "continuous learning" mechanism adjacent to BED/BO; worth ingesting.
- **Interaction-specific experimental design** (fractional factorials, D-/A-optimality for interaction terms) is only covered in its Bayesian/EIG form via [[Information-Theoretic Design Objectives]]; the classical alphabetic-optimality treatment is thin.

## Follow-Up Questions

- How would a geo-holdout experiment be encoded as a design $\xi$ and its EIG computed against an MMM posterior?
- When should continuous media learning use **BED** (characterize interactions) vs **Bayesian optimization** (find the best mix) vs a **bandit** (maximize online reward)?
- How do adstock/carryover dynamics interact with *sequential* experiment timing (delayed outcomes) in an adaptive design?
- Can a **DAD-style policy** be trained to propose weekly budget-perturbation experiments for an MMM, and what would its reward be?
