---
title: Neural Simulation-Based Inference - Index
tags:
  - type/index
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - topic/machine-learning
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Neural Simulation-Based Inference"
parent: "[[Research/Bayesian Statistics/Computation/_Index|Computation]]"
---

# Neural Simulation-Based Inference - Index

> [!abstract] Routing Summary
> Neural (deep-learning) methods for Bayesian inference in simulators with intractable likelihoods: learn a surrogate for the posterior (NPE), the likelihood (NLE / SNL) or the likelihood-to-evidence ratio (NRE) from simulated $(\theta, x)$ pairs. Anchored by the Cranmer, Brehmer & Louppe (2020) review, the founding method papers, the Lueckmann et al. (2021) benchmark, the Papamakarios et al. normalizing-flows review, and the Dyer et al. (2022) application to economic agent-based models. Extends the vault's coverage of ABC, synthetic likelihood and SMM / indirect inference.
>
> - Need the big picture, the taxonomy, or where to start? → [[Neural Simulation-Based Inference - Overview]]
> - Need to learn the posterior directly, with no MCMC (and the proposal-prior theorem, SNPE-A/B/C)? → [[Neural Posterior Estimation (NPE)]]
> - Need a learned likelihood to plug into MCMC, or the neural successor to synthetic likelihood? → [[Neural Likelihood Estimation and Sequential Neural Likelihood]]
> - Need inference by classification, the likelihood-ratio trick, or likelihood-free MH / HMC? → [[Neural Ratio Estimation]]
> - Need to understand the density estimator itself (change of variables, MAF, coupling layers, spline flows, forward vs reverse KL)? → [[Normalizing Flows as Conditional Density Estimators]]
> - Need to decide between one reusable network and rounds focused on a single dataset? → [[Amortized vs Sequential Inference]]
> - Need to know whether the neural posterior can be trusted (C2ST, MMD, SBC, coverage, what SBC misses)? → [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]
> - Need to calibrate an agent-based or economic time-series model, with learned summary statistics? → [[Neural SBI for Agent-Based and Economic Models]]
> - Need the practitioner's checklist for choosing a method? → [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)#Practitioner's questions (Box 1)|Box 1 questions]] and [[Neural Simulation-Based Inference - Overview#^ex-recommendations|Cranmer et al. recommendations]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| SBI problem, three neural targets | [[Neural Simulation-Based Inference - Overview]] | overview | Simulation-Based and Amortized Inference; ABC; Synthetic Likelihood | $p(x\mid\theta)=\int p(x,z\mid\theta)dz$ intractable; surrogates for posterior, likelihood or ratio fix sample efficiency, inference quality and amortization |
| Neural posterior estimation | [[Neural Posterior Estimation (NPE)]] | method | Overview; Normalizing Flows | Prop. 1: training on $\theta\sim\tilde p$ learns $\tilde p(\theta)p(\theta\mid x)/p(\theta)$; correct by $p/\tilde p$; SNPE-A/B/C differ in how |
| Neural likelihood estimation, SNL | [[Neural Likelihood Estimation and Sequential Neural Likelihood]] | method | Overview; Normalizing Flows; NPE; Synthetic Likelihood | The proposal does not bias a likelihood estimator; conditional MAF + MCMC; trains on all rounds |
| Neural ratio estimation | [[Neural Ratio Estimation]] | method | Overview; MCMC Basics | Optimal classifier of joint vs product of marginals gives $r(x\mid\theta)=p(x\mid\theta)/p(x)=d^*/(1-d^*)$; drop into MH / HMC |
| Conditional normalizing flows | [[Normalizing Flows as Conditional Density Estimators]] | concept | Overview | $p_x(x)=p_u(T^{-1}(x))\lvert\det J_{T^{-1}}(x)\rvert$; forward KL = maximum likelihood from samples; MAF fast to evaluate, $D$ times slower to sample |
| Amortization vs active learning | [[Amortized vs Sequential Inference]] | concept | Overview; NPE; NLE; NRE | Sequential improves sample efficiency with diminishing returns; only amortized estimators make SBC cheap |
| Benchmarking and diagnostics | [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] | method | Overview; Amortized vs Sequential; SBC | C2ST preferred (0.5 best); NLTP and median distance unreliable; SBC is only a consistency check; no algorithm dominates |
| ABM / economic application | [[Neural SBI for Agent-Based and Economic Models]] | application | NPE; NRE; Amortized vs Sequential; Benchmarking; ABM Calibration Overview | NPE / NRE beat KDE-likelihood MCMC with 10 to 1000 times fewer simulations; recurrent embedding nets learn summaries; SBC with 5,000 replicates feasible |

## Notes

- [[Neural Simulation-Based Inference - Overview]] - CONTAINS: simulator and implicit-model definitions, the intractable-likelihood integral, three shortcomings of ABC / classical density estimation, three forces (ML, active learning, integration and augmentation), NPE / NLE / NRE comparison table, trade-offs among targets, gray-box quantities (joint score, joint ratio), Cranmer et al. recommendations, relevance to marketing measurement, one-training-set-three-surrogates example.
- [[Neural Posterior Estimation (NPE)]] - CONTAINS: $\epsilon$-free motivation, NPE loss, Proposition 1 (proposal prior), Algorithms 1-2 (SNPE-A), mixture density networks and MDN-SVI, SNPE-A / B / C comparison table with failure modes, strengths and weaknesses of posterior targets, original experiments (Gaussian mixture, Bayesian linear regression, Lotka-Volterra, M/G/1), training-loop sketch.
- [[Neural Likelihood Estimation and Sequential Neural Likelihood]] - CONTAINS: no-proposal-bias theorem, SNL Algorithm 1, conditional MAF likelihood, recommended hyperparameters, MCMC step and its pitfalls, relation to Wood's synthetic likelihood, likelihood goodness-of-fit diagnostic, high-dimensional-data limitation, SLCP / Lotka-Volterra / Hodgkin-Huxley results.
- [[Neural Ratio Estimation]] - CONTAINS: likelihood ratio trick, failure of the reference hypothesis, likelihood-to-evidence ratio estimator, training algorithm, logit trick for stability, likelihood-free MH and HMC, ROC / AUC diagnostic, multi-class (contrastive) generalization, SNRE, predecessors (CARL, LFIRE), 1-D worked example with the exact log ratio.
- [[Normalizing Flows as Conditional Density Estimators]] - CONTAINS: change-of-variables definition, composition rule, universality argument, forward vs reverse KL, autoregressive flows (transformer + conditioner), affine and spline transformers, masked conditioners vs coupling layers, which direction must be fast for NPE vs NLE, conditioning on context, batch / activation normalization, affine-flow-as-heteroscedastic-regression example.
- [[Amortized vs Sequential Inference]] - CONTAINS: definitions of amortized and sequential inference, three mechanisms by which rounds destroy amortization, degree-of-amortization table for NPE / NLE / NRE, benchmark findings on sequential methods, what amortization buys (validation, real-time, design loops), when to go sequential, hybrid strategy, marketing-ABM decision example.
- [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] - CONTAINS: benchmark design (algorithms, ten tasks, budgets), metric-applicability table, why NLTP and median distance mislead (with the KL decomposition), C2ST definition and settings, MMD and KSD problems, the six findings, SBC for neural posteriors, coverage, what SBC cannot see, misspecification warning, Cranmer et al. diagnostic catalogue, Box 1 questions, C2ST code.
- [[Neural SBI for Agent-Based and Economic Models]] - CONTAINS: review of existing Bayesian ABM methods and their $nR$ simulation cost, black-box / simulation-efficient / discriminative arguments, embedding networks for learned summaries, implementation details, evaluation by Wasserstein and MMD against ground truth, Tables 1-2 (Brock & Hommes, multivariate GBM), SBC on Franke & Westerhoff, caveats, marketing-ABM calibration workflow, comparison with SMM.

## External / Cross-Folder Links

- [[Simulation-Based and Amortized Inference]] - the Bayesian Workflow section note this cluster expands.
- [[Approximate Bayesian Computation for ABMs]], [[HM-ABC Calibration Framework]], [[History Matching for ABMs]], [[ABM Calibration Overview]], [[Uncertainty Quantification for ABM Calibration]] - classical ABM calibration.
- [[Synthetic Likelihood - Overview]], [[Synthetic Likelihood Construction]] - the Gaussian likelihood surrogate that NLE generalizes.
- [[Simulation-Based Estimation - Overview]], [[Method of Simulated Moments]], [[Indirect Inference]], [[Efficient Method of Moments]], [[Q - Using SMM to Calibrate Agent Based Models]] - frequentist simulation estimators.
- [[Simulation-Based Calibration - Overview]], [[The SBC Algorithm]], [[Rank Statistics and Uniformity]], [[Interpreting SBC Histograms]], [[Data-Averaged Posterior Self-Consistency]] - validation.
- [[Variational Inference and Pathfinder]], [[MCMC Basics]], [[HMC and Stan in Practice]] - likelihood-based computation.
- [[Likelihood-Free ACE and Gradient Estimation]], [[Implicit Likelihood Estimator]], [[Variational Posterior Estimator (Barber-Agakov)]] - the same surrogates inside Bayesian experimental design.

## Sources

- [[raw/Cranmer Brehmer Louppe 2020 - The Frontier of Simulation-Based Inference.pdf]] - Cranmer, K., Brehmer, J. & Louppe, G. (2020), "The frontier of simulation-based inference," *PNAS*. arXiv:1911.01429.
- [[raw/Papamakarios Murray 2016 - Fast Epsilon-Free Inference of Simulation Models.pdf]] - Papamakarios, G. & Murray, I. (2016), "Fast $\epsilon$-free Inference of Simulation Models with Bayesian Conditional Density Estimation," *NeurIPS*. arXiv:1605.06376.
- [[raw/Papamakarios Sterratt Murray 2019 - Sequential Neural Likelihood.pdf]] - Papamakarios, G., Sterratt, D. C. & Murray, I. (2019), "Sequential Neural Likelihood: Fast Likelihood-free Inference with Autoregressive Flows," *AISTATS*. arXiv:1805.07226.
- [[raw/Hermans Begy Louppe 2020 - Likelihood-free MCMC with Amortized Approximate Ratio Estimators.pdf]] - Hermans, J., Begy, V. & Louppe, G. (2020), "Likelihood-free MCMC with Amortized Approximate Ratio Estimators," *ICML*. arXiv:1903.04057.
- [[raw/Lueckmann 2021 - Benchmarking Simulation-Based Inference.pdf]] - Lueckmann, J.-M., Boelts, J., Greenberg, D. S., Goncalves, P. J. & Macke, J. H. (2021), "Benchmarking Simulation-Based Inference," *AISTATS*. arXiv:2101.04653.
- [[raw/Papamakarios 2019 - Normalizing Flows for Probabilistic Modeling and Inference.pdf]] - Papamakarios, G., Nalisnick, E., Rezende, D. J., Mohamed, S. & Lakshminarayanan, B. (2021), "Normalizing Flows for Probabilistic Modeling and Inference," *JMLR*. arXiv:1912.02762.
- [[raw/Dyer 2022 - Black-Box Bayesian Inference for Economic Agent-Based Models.pdf]] - Dyer, J., Cannon, P., Farmer, J. D. & Schmon, S. (2022), "Black-box Bayesian inference for economic agent-based models." arXiv:2202.00625.
