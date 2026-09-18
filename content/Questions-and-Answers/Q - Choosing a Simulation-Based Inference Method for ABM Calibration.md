---
title: "Q: For calibrating an agent-based model, how do I choose among SMM, indirect inference, EMM, synthetic likelihood, ABC, history matching, genetic-algorithm calibration and neural posterior / likelihood / ratio estimation?"
tags:
  - type/qa
  - topic/agent-based-modeling
  - topic/likelihood-free-inference
  - topic/simulation-estimation
  - topic/calibration
  - topic/bayesian-statistics
date_asked: 2026-09-18
answered_from:
  - "[[Simulation-Based Estimation - Overview]]"
  - "[[Method of Simulated Moments]]"
  - "[[SMM Weighting Matrix and Inference]]"
  - "[[Indirect Inference]]"
  - "[[Efficient Method of Moments]]"
  - "[[Practical Issues in Simulation Estimation]]"
  - "[[Synthetic Likelihood - Overview]]"
  - "[[Synthetic Likelihood Construction]]"
  - "[[Chaos and Phase-Insensitive Statistics]]"
  - "[[ABM Calibration Overview]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[History Matching for ABMs]]"
  - "[[HM-ABC Calibration Framework]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
  - "[[ABM Calibration Case Studies]]"
  - "[[Genetic Algorithm Calibration for ABM]]"
  - "[[GA Fitness Evaluation and the RAM]]"
  - "[[Neural Simulation-Based Inference - Overview]]"
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Likelihood Estimation and Sequential Neural Likelihood]]"
  - "[[Neural Ratio Estimation]]"
  - "[[Amortized vs Sequential Inference]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Neural SBI for Agent-Based and Economic Models]]"
  - "[[Simulation-Based and Amortized Inference]]"
  - "[[Global Sensitivity Analysis - Overview]]"
  - "[[Morris Elementary Effects Screening]]"
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
related_questions:
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
aliases:
  - Choosing an SBI method for ABM calibration
  - SMM vs ABC vs history matching vs neural SBI
  - Likelihood-free calibration decision table
  - Which calibration method for an agent-based model
---

# For calibrating an agent-based model, how do I choose among SMM, indirect inference, EMM, synthetic likelihood, ABC, history matching, genetic-algorithm calibration and neural posterior / likelihood / ratio estimation?

> [!summary]
> The eleven methods differ on only three design choices: **what is compared** (hand-picked moments, an auxiliary model's parameters, or learned summaries), **how the comparison is scored** (a quadratic distance to minimise, a threshold to pass, a Gaussian or neural density to evaluate) and **whether the simulator is called inside the search loop or once up front**. Choose by asking, in order: can I afford more than a few hundred runs, do I need a posterior or a point estimate with a specification test, do trustworthy low-dimensional summaries exist, and will I re-fit on many datasets. The vault's evidence supports a default pipeline for a marketing ABM: **Morris/Sobol screening, then history-matching waves, then amortized NPE or NRE with a learned embedding (SMM moments as the baseline summary vector), validated by SBC**, with SMM's $J$-test or the synthetic-likelihood $\chi^2$ kept as the misspecification alarm that no neural method provides.

## Answer

[[Q - Using SMM to Calibrate Agent Based Models]] covers the SMM workflow in detail (moments, common random numbers, two-step $W$, standard errors). This note places SMM among its alternatives and does not repeat that recipe.

### One problem, three design choices

An ABM is an implicit model: its likelihood $p(x\mid\theta)=\int p(x,z\mid\theta)\,dz$ integrates over "every random draw made by every agent at every tick" ([[Neural Simulation-Based Inference - Overview]]). [[ABM Calibration Overview]] lists what makes the inverse problem hard: high dimension, a nonlinear micro-macro map, stochasticity, equifinality, run cost and model discrepancy. Every method below is a different answer to the same three questions.

| Design choice | Options in the vault |
|---|---|
| What is compared | user moments (SMM, GA/RAM, ABC, HM); auxiliary-model parameters or scores (indirect inference, EMM); phase-insensitive statistics assumed Gaussian (synthetic likelihood); learned embedding $s_\varphi(x)$ (NPE, NRE) |
| How it is scored | quadratic form minimised (SMM, II, EMM); heuristic fitness (GA); hard threshold (ABC $\varepsilon$, HM cutoff 3); explicit density (synthetic likelihood, NLE); classifier logit (NRE); direct conditional density of $\theta$ (NPE) |
| Where the simulator sits | inside an optimiser (SMM, II, EMM, GA); inside an MCMC or rejection loop (synthetic likelihood, ABC); in design waves (HM, sequential neural); once, up front (amortized NPE / NLE / NRE) |

### What is genuinely the same idea

*Synthesis:* the following identifications are not stated in any single note but follow from putting their equations side by side.

- **SMM, synthetic likelihood and history matching share one statistic.** SMM minimises $e(\theta)^\top W e(\theta)$ with $W=\hat\Omega^{-1}$ ([[SMM Weighting Matrix and Inference]]). Wood's log synthetic likelihood is $-\tfrac12(\mathbf s-\hat{\boldsymbol\mu}_\theta)^\top\hat{\boldsymbol\Sigma}_\theta^{-1}(\mathbf s-\hat{\boldsymbol\mu}_\theta)-\tfrac12\log|\hat{\boldsymbol\Sigma}_\theta|$ ([[Synthetic Likelihood Construction]]): the optimally weighted SMM criterion with the weight matrix re-estimated at every $\theta$, plus a log-determinant, read as a likelihood instead of a loss. The implausibility $I^r(x)=d^2/(V^r_s+V^r_o+V^r_m)$ of [[History Matching for ABMs]] is the same standardised squared distance per output, with the variance *inflated* by observation error and model discrepancy, aggregated by a max rather than a sum, and used as a cut rather than an objective.
- **The $J$-test and the synthetic-likelihood $\chi^2$ check are the same diagnostic.** Both say the minimised quadratic form should be $\chi^2$ (with $R-K$ and $\dim(\mathbf s)$ degrees of freedom respectively) if the model can reproduce the summaries.
- **Auxiliary parameters are summary statistics.** [[Chaos and Phase-Insensitive Statistics]] says so directly: autoregression coefficients in synthetic likelihood are "the same device" as the auxiliary-model coefficients of [[Indirect Inference]]. An NPE embedding network is the limit of this line: a summary "learned concurrently using the same loss function" ([[Neural SBI for Agent-Based and Economic Models]]).
- **NLE is synthetic likelihood with the Gaussian replaced by a flow and the per-$\theta$ refit replaced by one network shared across $\theta$** ([[Neural Likelihood Estimation and Sequential Neural Likelihood]]).
- **HM waves, SMC-ABC and sequential neural rounds are one idea**: spend simulations where the posterior for this $x_o$ lives. [[Amortized vs Sequential Inference]] calls history matching "the emulator-world analogue of a round-based proposal".

### What only looks similar

- **EMM's SNP density versus NLE's flow.** Both are flexible densities, but the SNP model is fitted to the *observed* series and its score supplies moment conditions ([[Efficient Method of Moments]]); the flow is fitted to *simulated* $(\theta,x)$ pairs and is the likelihood surrogate. EMM's efficiency theorem also assumes a stationary Markovian density, the assumption Dyer et al. call "particularly poorly suited" to non-equilibrium ABMs.
- **HM's non-implausible region versus a credible region.** HM "makes no probabilistic statements about parameters"; it only hands ABC an informed uniform prior.
- **GA fitness versus an SMM criterion.** In Ben Said et al. the chromosome encodes an *individual agent's* six characteristics and the RAM scores each agent ([[Genetic Algorithm Calibration for ABM]], [[GA Fitness Evaluation and the RAM]]); it evolves a population of agents, not a parameter vector, and ignores $V^r_s$ and $V^r_m$ ([[Uncertainty Quantification for ABM Calibration]]).
- **"Calibration" in SBC versus ABM calibration.** SBC checks the self-consistency of the inference, not the fit of the ABM; see [[Q - Four Meanings of Calibration]].

### Decision table

| Method | Output | Simulator cost it tolerates | Parameter dimension | Summaries | Stochasticity | Misspecification | Re-fit on many datasets |
|---|---|---|---|---|---|---|---|
| **SMM / MSM** | $\hat\theta$, asymptotic SEs | $S\ge20$ runs per optimiser step; variance factor $(1+1/S)$ | low, $K\le R$ with full-rank Jacobian | hand-picked moments, $R>K$ | averaged over $S$ runs; needs common random numbers; two-step $W$ down-weights noisy moments | **$J$-test** when $R>K$ | full re-optimisation |
| **Indirect inference** | $\hat\theta$, SEs | moderate to high: minimum-distance form needs $R$ nested auxiliary fits per step, score form needs one | $q\ge p$ auxiliary parameters | implied by the auxiliary model | as SMM | auxiliary model may be misspecified by design; efficient only if "smoothly embedded" | re-optimise |
| **EMM** | $\hat\theta$, MLE-efficient asymptotically | high | low | data-driven SNP scores | as SMM | over-parameterised SNP loses efficiency in small samples; stationarity assumed | re-fit SNP and re-optimise |
| **Synthetic likelihood** | posterior or MLE, AIC / GLRT | cheap only: $N_r$ replicates at *every* MCMC state, "orders of magnitude more simulations" | low | roughly Gaussian statistics; robust to uninformative ones | estimates $\boldsymbol\Sigma_\theta$ directly; built for chaotic, phase-sensitive dynamics | $\chi^2_{\dim(\mathbf s)}$ check | no |
| **ABC (rejection / SMC)** | $\varepsilon$-inflated posterior samples | cheap, low-dimensional: 11,000+ runs for 2 parameters (birds) | curse of dimensionality | summaries + distance + $\varepsilon$ | via $\varepsilon$ | none beyond what is put into $\varepsilon$ | "repeat the entire inference algorithm" |
| **History matching** | non-implausible region | **expensive**: 80 to 320 wave runs, 420 in total (birds) | low to moderate, LHS waves | a few outputs, max over $r$ | ensemble variance $V^r_s$, $K$ chosen where variance stabilises (30 birds, 200 SugarScape) | **explicit $V^r_m$ term**; "all parameters implausible" is a stopping outcome (*synthesis:* read it as a sign the model cannot reproduce the targets) | no |
| **HM + ABC** | posterior | 3,185 runs versus 11,000+ | as HM | as ABC | $\varepsilon=3(V_o+V^r_s+V^r_m)$ | inherited from HM | no |
| **GA / SA / EA** | point estimate, no UQ | 256 to 290 runs (SA / EA, birds) | handles rugged, larger spaces | any fitness function | implicit averaging | none; fits inside the noise floor | no |
| **NPE** | normalised posterior, direct sampling | $10^3$ to $10^4$ runs in Dyer et al.; one run per $\theta$ | 3 to 4 in Dyer et al.; benchmark tasks up to 10 | **learned** by embedding net, or hand-crafted | absorbed into the learned conditional | none; extrapolates silently | **yes**, one forward pass; makes SBC affordable |
| **NLE / SNL** | likelihood surrogate + MCMC | as NPE; sequential version cheapest per dataset | up to 12 (Hodgkin-Huxley, under SNL) | still needs low-dimensional $x$ | models $p(x\mid\theta)$ directly | none; but offers a likelihood goodness-of-fit MMD check | network yes, MCMC per dataset; i.i.d. units multiply naturally |
| **NRE** | ratio + MCMC | as NPE | as NPE | learned embedding possible | classifier on pairs | none; ROC / AUC diagnostic | network yes, MCMC per dataset; prior can be swapped without retraining |

Numbers are from [[ABM Calibration Case Studies]], [[Practical Issues in Simulation Estimation]], [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] and [[Neural SBI for Agent-Based and Economic Models]].

### Reading the table by criterion

**Simulator cost.** Methods that resimulate inside a chain pay at least $nR$ runs with $n$ "often a few hundred thousand" (Dyer et al.). Surrogate methods "decouple the act of simulating from the task of constructing the posterior", which is where the reported 10- to 15-fold (Brock-Hommes) and 1000-fold (GBM) budget reductions against a KDE likelihood come from. Against that, rejection methods have "a computational footprint that is orders of magnitudes smaller" and remain competitive "on low-dimensional problems and for cheap simulators" (benchmark finding 4). With only a few hundred runs, HM or a point optimiser are the only options the vault documents.

**Parameter dimension.** Reduce it before calibrating. [[Morris Elementary Effects Screening]] costs $r(p+1)$ runs (220 for 10 parameters at $r=20$); [[Variance-Based Sensitivity and Sobol Indices]] then costs $N(p+2)$ on the survivors. Fix parameters with $S_{Ti}\approx0$; never fix one with small $S_i$ but large $S_{Ti}$, because it acts through interactions ([[Global Sensitivity Analysis - Overview]]). *Synthesis:* a parameter with $S_{Ti}\approx0$ for every calibration target is also unidentified, so screening doubles as an equifinality check and as a guide to which moments identify which parameters.

**Full posterior.** SMM, II and EMM give $\hat\theta$ with asymptotic normal errors, whose "major drawback ... is that only parameter point estimates are produced" (Dyer et al.); they cannot represent the multimodal or ridge-shaped posteriors that equifinality produces. NPE must represent such shapes directly; NLE and NRE let MCMC find them ("simple likelihood, complex posterior"), but the benchmark found single chains "frequently got stuck in single modes".

**Summary statistics.** Cranmer et al.'s rule: "if powerful low-dimensional summaries already exist, traditional techniques remain reasonable." When they do not, learned embeddings beat hand-crafted ones for diffuse posteriors, but hand-crafted ones won for SNPE on the sharp Brock-Hommes posterior (0.336 versus 0.477 Wasserstein), so "learned summaries are not a free lunch at $10^4$ simulations". For raw time series prefer NPE or NRE over NLE: "it is generally a simpler task to discriminate between complex time-series data than it is to generate such time-series."

**Stochasticity and path dependence.** Optimiser-based methods need a criterion that is smooth in $\theta$, hence common random numbers and therefore control of the ABM's seeds; they are not fully black-box. For tipping, lock-in or near-chaotic dynamics, do not match trajectories point by point: [[Chaos and Phase-Insensitive Statistics]] shows the joint density becomes "wildly irregular", and the cure is phase-insensitive summaries (autocovariances, autoregression coefficients, quantile regressions) whatever method consumes them.

**Misspecification.** Only three tools in the vault speak to it: HM's $V^r_m$, the SMM $J$-test and the synthetic-likelihood $\chi^2$. For the neural family the warning is blunt: "none of these diagnostics address the issues encountered if the model is misspecified", and a neural estimator is reliable only "when the observed data are in the typical set of the simulated training data" ([[Simulation-Based and Amortized Inference]]).

**Amortization.** Amortize when one simulator serves many datasets or when you need SBC; go sequential for "time-intensive and complex simulators" and a single sharp posterior. A sequential posterior cannot be SBC-checked without repeating the whole procedure per replicate. And "you cannot cheaply amortize a model you are still changing."

### Practical Implications

A decision rule for a consumer or media-response ABM:

1. **Screen.** Morris, then Sobol on survivors. Freeze $S_{Ti}\approx0$ parameters.
2. **Budget under roughly 500 runs:** history matching only; report the non-implausible region, not a posterior. Use SA / GA only if a single best-fit configuration is genuinely all you need.
3. **Need a specification test, have long series and defensible moments:** SMM with two-step $W$ and the $J$-test. If good moments are unclear but a reduced-form model is natural, use score-based indirect inference. *Synthesis:* for MMM work the natural auxiliary model is the MMM itself: choose $\theta$ so that the MMM fitted to simulated sales returns the adstock, saturation and ROI estimates obtained on the real data. This calibrates the ABM precisely on the features the downstream analysis cares about, and the binding function $b(\theta)$ documents how structural behaviour maps to MMM coefficients.
4. **Need a posterior, $10^3$ to $10^4$ runs, one dataset:** HM waves to shrink the box, then SNPE or SNRE (about 10 rounds), or HM + ABC if there are only two or three parameters and good summaries.
5. **Many geos, brands or quarterly refits:** amortized NPE with a GRU embedding of the weekly series, prior wide enough that every real dataset lies inside the prior predictive, SBC on 1,000 to 5,000 held-out draws. For a panel of i.i.d. households under one $\theta$, prefer NLE or NRE so per-unit terms multiply.
6. **Always:** keep the SMM moment vector as a baseline summary; run a "dress rehearsal" with C2ST on a tractable simplified simulator; posterior predictive checks on the real series; check that $x_o$'s embedding sits inside the simulated cloud; pair SBC with a sharpness measure, since a posterior equal to the prior passes SBC.
7. **Using the ABM as a test bed for geo-experiment or MMM estimators** requires the posterior, not $\hat\theta$: propagate parameter uncertainty into the synthetic worlds, or estimator rankings will be conditional on one arbitrary point in an equifinal set.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Simulation-Based Estimation - Overview]] | MSM / II / EMM comparison; common $(1+1/R)$ variance structure |
| [[Method of Simulated Moments]], [[SMM Weighting Matrix and Inference]] | consistency at fixed $R$, optimal weight, identification, $J$-test |
| [[Indirect Inference]] | binding function, minimum-distance versus score forms, smooth embedding |
| [[Efficient Method of Moments]] | SNP score generator, efficiency theorem, over-parameterisation warning |
| [[Practical Issues in Simulation Estimation]] | common random numbers, simulation-size table |
| [[Synthetic Likelihood - Overview]], [[Synthetic Likelihood Construction]], [[Chaos and Phase-Insensitive Statistics]] | Gaussian likelihood of summaries, $\chi^2$ check, phase-insensitive statistics |
| [[ABM Calibration Overview]], [[Uncertainty Quantification for ABM Calibration]] | six calibration challenges; $V^r_m$, $V^r_s$, $V_o$ |
| [[History Matching for ABMs]], [[Approximate Bayesian Computation for ABMs]], [[HM-ABC Calibration Framework]], [[ABM Calibration Case Studies]] | implausibility, $\varepsilon$ rule, run counts, coverage figures |
| [[Genetic Algorithm Calibration for ABM]], [[GA Fitness Evaluation and the RAM]] | what the GA actually evolves and scores |
| [[Neural Simulation-Based Inference - Overview]] | three neural targets, Cranmer et al. recommendations |
| [[Neural Posterior Estimation (NPE)]], [[Neural Likelihood Estimation and Sequential Neural Likelihood]], [[Neural Ratio Estimation]] | per-method strengths, failure modes, diagnostics |
| [[Amortized vs Sequential Inference]] | when to amortize; marketing ABM worked cases |
| [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] | six benchmark findings, SBC limits, misspecification warning |
| [[Neural SBI for Agent-Based and Economic Models]] | Dyer et al. results, embedding nets, NPE-versus-SMM contrast |
| [[Simulation-Based and Amortized Inference]] | typical-set caveat; amortization economics |
| [[Global Sensitivity Analysis - Overview]], [[Morris Elementary Effects Screening]], [[Variance-Based Sensitivity and Sobol Indices]] | screen-then-quantify costs and rules |
| [[raw/calibration_ABM.pdf]], [[raw/tdb136.pdf]], [[raw/Dyer 2022 - Black-Box Bayesian Inference for Economic Agent-Based Models.pdf]], [[raw/Lueckmann 2021 - Benchmarking Simulation-Based Inference.pdf]] | primary sources behind the numbers |

## Related Concepts

- [[The SBC Algorithm]] and [[Interpreting SBC Histograms]] — the validation that amortization makes free.
- [[Posterior Predictive Checking]] — the one diagnostic available with only $x_o$.
- [[Normalizing Flows as Conditional Density Estimators]] — the estimator class behind NPE and NLE.
- [[ABM Validation Challenges]] — calibration by any of these methods is still not validation.
- [[Q - Using SMM to Calibrate Agent Based Models]] — the detailed SMM recipe this note extends.

## Gaps

- **No head-to-head on one ABM.** The vault's comparisons are pairwise and on different models: SA / EA / ABC / HM+ABC on the birds model, KDE versus NPE / NRE in Dyer et al., ABC / SL versus neural methods on benchmark tasks. No source runs SMM or indirect inference against ABC or NPE on the same simulator, so the table's cross-family rankings are synthesis.
- **Indirect inference and EMM are covered only for financial time series**; no vault source applies them to an ABM, and the "MMM as auxiliary model" idea above is untested.
- **Emulator-based history matching** (Gaussian-process or Bayes-linear emulators, the usual route for very expensive simulators) is not covered; the HM notes run the ABM directly. [[Gaussian Process Regression]] exists but is not connected to calibration beyond a see-also.
- **Misspecification-robust SBI** (robust synthetic likelihood, generalised Bayesian or discrepancy-aware neural posteriors) is absent; the vault only records that the standard diagnostics do not address it.
- **High-dimensional $\theta$.** Evidence stops at about 12 parameters (Hodgkin-Huxley, under SNL; NPE evidence stops at 3 to 4 parameters on ABMs and 10 on benchmark tasks); nothing on hierarchical parameterisation of agent heterogeneity distributions.
- SMC-ABC, regression-adjusted ABC and expected-coverage tests are mentioned but not developed.

## Follow-Up Questions

- How would score-based indirect inference with a Bayesian MMM as the auxiliary model be implemented, and what does its binding function reveal about MMM bias?
- Can history matching's model-discrepancy variance be carried into an NPE workflow, for example by adding discrepancy noise to simulated series before training?
- What summary statistics are phase-insensitive for diffusion and lock-in dynamics in a consumer ABM?
- How should an ABM posterior be propagated when the ABM is used to benchmark geo-test estimators?
