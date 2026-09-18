---
title: "Index: Questions and Answers"
tags:
  - type/index
date_updated: 2026-09-18
question_count: 29
---

# Questions and Answers

> [!abstract] Routing Summary
> Answered questions from the vault knowledge base. Each answer is cross-linked
> to its source notes and related concepts.
> Browse by topic below or search for keywords.

## By Topic

### Marketing Measurement / Adaptive Experimentation
- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — A measure→decide→experiment→update loop: a Bayesian MMM/GP surrogate, shrinkage (horseshoe/partial pooling) to carry many interactions cheaply, and EIG-driven adaptive design (BED/DAD) to test only the interactions that matter — dissolving the full-factorial "cell explosion"
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — Encode a geo-test as a design vector $\xi$ (geos × channels × magnitude × window); the MMM is the likelihood; compute targeted EIG by nested/variational Monte Carlo over the MMM posterior and optimize by stochastic-gradient ascent
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — Same Bayesian surrogate, three objectives: learn (BED/EIG) → optimize (BO/acquisition) → earn-while-learning (bandit/regret); which to use for measurement vs allocation vs always-on tactics
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — Adstock delays outcomes: size read-out windows to the carryover tail, insert washouts (or model residual adstock) to avoid contamination, treat carryover as a Kalman-filtered latent state, and make adaptive scheduling delay-aware
- [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] — All six estimators impute the same missing block (treated geos' untreated outcomes) but assume different structure for it; a diagnostic table maps each pairwise disagreement to the one assumption that broke
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]] — An experiment identifies incremental return between two spend levels in one window, so it enters as a likelihood on the MMM-implied counterfactual (with hierarchical spread), not as a prior on β; includes a disagreement protocol
- [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]] — Adstock is interference across time with no finite carryover order: switchbacks lose effective sample size, always-valid tests keep type I error but bias magnitude, geo tests need adstock-free pretests and cooldowns; six-step decision rule
- [[Q - Optimizing Media Spend on CLV with Delayed Feedback]] — Objective becomes incremental customers × model-based value + value change of existing customers; CLV posterior multiplies response posterior, discounting becomes first-order, and 'acquired' is a post-treatment variable
- [[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]] — The equal-marginal-return condition transfers fully across compute, media and experiment budgets; Kaplan-vs-Chinchilla is an MMM extrapolation warning; the data situation (unobserved, dynamic, competitive response) does not transfer

### Econometrics / Simulation-Based Estimation
- [[Q - Using SMM to Calibrate Agent Based Models]] — How to apply SMM to ABM calibration: moment selection, common random numbers, two-step W, standard errors, and comparison to genetic algorithm approaches
- [[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]] — Methods differ in which summaries are compared, how the comparison is scored, and whether the simulator sits inside the search loop; recommended path: Morris/Sobol screening → history matching → amortized NPE/NRE validated by SBC, with SMM's J-test as misspecification check

### Causal Inference / Identification
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — Nine strategies (CIA, DAGs, IV, DiD, RD, Synthetic Control, metalearners, BSTS, sensitivity analysis) with assumptions and estimands
- [[Q - Covariate Adjustment for Precision vs Identification]] — Same algebra everywhere — what differs is whether randomization already balances the covariate: if so adjustment only buys variance (CUPED, GBR/TBR); if not the covariates are the identification argument and must come from a DAG
- [[Q - The Common Structure of Doubly-Robust Estimators]] — Every DR method is a model prediction plus weighted residuals with a product-of-errors remainder; 'doubly' means model-DR (AIPW, CS-DiD), rate-DR (DML, R-learner) or SDID's weights-or-model balance; the X-learner is not DR
- [[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]] — Nearly every method estimates the CATE; only conformal intervals (and BART's predictive) address ITEs; separates confidence, credible and prediction intervals and gives a rule for marketing targeting
- [[Q - A Unified View of Sensitivity to Assumption Violations]] — Each method embeds the analysis in a perturbation family, sizes the perturbation, then aggregates (worst case, average, derivative, variance share); the dividing line is whether data can ever inform the perturbation
- [[Q - Exchangeability and What Replaces It When It Fails]] — Four replacement families: permute only as the design randomized, reweight by a density ratio, model until residual symmetry is plausible, or trade exactness for a bound; the FRT needs a known assignment law, not exchangeable outcomes

### Research Methodology / Multiple Comparisons
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] -- Classical corrections vs. Bayesian alternatives (partial pooling, regularizing priors, projection predictive selection) for model search
- [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]] — Three different cures, not one: separate choosing data from evaluating data (pre-registration, cross-fitting, honesty, split conformal), pay for the dependence (multiplicity, always-valid p), or dissolve the choice (partial pooling, stacking)

### Statistical Modeling / General
- [[Q - Common Pitfalls in Statistical Modeling]] -- Eight major pitfall categories: confounding, forking paths, overfitting, missing data, golem misuse, neglecting model checks, computational issues, Type S/M errors

### Bayesian vs. Frequentist Statistics
- [[Q - Differences Between Frequentist and Bayesian Statistics]] -- Core philosophical divide (probability as frequency vs. belief), confidence vs. credible intervals, priors, hierarchical models, model comparison
- [[Q - Does Peeking Matter for a Bayesian]] — The posterior given the model is unaffected by optional stopping, but frequentist error of posterior-threshold rules, sign/magnitude error at a fixed truth and prior sensitivity are not protected; the mSPRT statistic is a Bayes factor; 7-step media-test protocol

### Bayesian Computation, Calibration and Shared Machinery
- [[Q - Four Meanings of Calibration]] — SBC calibrates the computation (prior-averaged), conformal is a finite-sample marginal-coverage theorem, forecast calibration is an empirical property, solver calibration is average-case, and ABM/persona 'calibration' just means fitting; each property needs a sharpness check
- [[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]] — One algorithm — filter, RTS smoother, innovations likelihood = O(N) GP regression with a Gauss–Markov prior; BSTS predicts without updates for a counterfactual, ODE filters feed themselves zero residuals and read covariance as numerical error
- [[Q - Variational Bounds Compared from the ELBO to EIG Estimators]] — Every objective is 'intractable quantity = surrogate ± expected KL': expectation under q gives reverse KL (under-disperses), under the joint gives forward KL (over-covers); NPE loss equals the Barber–Agakov bound up to prior entropy; 2×2 table places NMC, PCE, VNMC, ACE
- [[Q - Partial Pooling Across Statistics and ML and When It Hurts]] — Shared mechanism: units as draws from a learned population with precision-weighted compromise (hierarchical Bayes, James–Stein, Gamma-Gamma/NBD); global forecasters and LLMs pool without an inspectable τ; six conditions under which pooling hurts

### Machine Learning and AI Bridges
- [[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]] — Silicon sampling is poststratification with an LLM as the cell model and no uncertainty estimate: usable as theory, pilot or prior, never as the estimate; 12-step validation protocol
- [[Q - In-Context Learning as Amortized Bayesian Inference]] — The analogy holds for cost-shifting, log-score training and the learn-a-population-then-sharpen structure (closest sibling: Chronos, not NPE); it breaks on the missing explicit prior, no latent posterior, order dependence and no calibration check
- [[Q - A Map of Sequential Decision Methods from Bandits to RLHF]] — Twelve methods mapped on objective, state, horizon, feedback, exploration and data regime; the main splits are belief state vs physical state and algorithm-chosen vs logged data; RLHF is a contextual bandit with a learned reward

## Recent Questions

| Question | Date | Key Sources |
|----------|------|-------------|
| [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] | 2026-09-18 | [[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[TBR Design Sensitivity and the Stationarity Assumption]] |
| [[Q - Using Experiment Results as Priors in a Bayesian MMM]] | 2026-09-18 | [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]], [[ROAS, mROAS, and Optimal Media Mix]], [[Shape (Saturation) Effects]] |
| [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]] | 2026-09-18 | [[Switchback Experiment Design and Analysis]], [[Interference and Marketplace Experiments]], [[Always-Valid p-values and the mSPRT]], [[Confidence Sequences]] |
| [[Q - Optimizing Media Spend on CLV with Delayed Feedback]] | 2026-09-18 | [[Customer Lifetime Value - Overview]], [[Pareto-NBD Model]], [[BG-NBD Model]], [[Gamma-Gamma Model of Monetary Value]] |
| [[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]] | 2026-09-18 | [[Neural Scaling Laws]], [[Compute-Optimal Training (Chinchilla)]], [[ROAS, mROAS, and Optimal Media Mix]], [[Shape (Saturation) Effects]] |
| [[Q - Covariate Adjustment for Precision vs Identification]] | 2026-09-18 | [[CUPED and Regression-Adjusted Variance Reduction]], [[Logic of Regression Adjustment]], [[Table 2 Fallacy]], [[Nuisance Parameter Bias Simulation]] |
| [[Q - The Common Structure of Doubly-Robust Estimators]] | 2026-09-18 | [[Frequentist Causal Estimation]], [[DML Estimators for ATE and the Interactive Model]], [[Neyman Orthogonality]], [[Doubly-Robust Estimands for ATT(g,t)]] |
| [[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]] | 2026-09-18 | [[Causal Estimands]], [[Metalearners for CATE]], [[S-Learner]], [[T-Learner and Minimax Rate]] |
| [[Q - A Unified View of Sensitivity to Assumption Violations]] | 2026-09-18 | [[Honest DiD - Sensitivity to Parallel Trends Violations]], [[Pre-Trend Testing and Its Pitfalls]], [[Sensitivity Analysis in Observational Studies]], [[Plausible GMM - Overview]] |
| [[Q - Exchangeability and What Replaces It When It Fails]] | 2026-09-18 | [[Permutation Tests and Exact Inference]], [[Fisher Randomization Test and the Sharp Null]], [[Randomization Inference - Overview]], [[Sharp vs Weak Null Hypotheses]] |
| [[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]] | 2026-09-18 | [[Simulation-Based Estimation - Overview]], [[Method of Simulated Moments]], [[SMM Weighting Matrix and Inference]], [[Indirect Inference]] |
| [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]] | 2026-09-18 | [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Forking Paths and Bayesian Approaches]], [[Prediction vs Postdiction]] |
| [[Q - Does Peeking Matter for a Bayesian]] | 2026-09-18 | [[The Peeking Problem and Optional Stopping]], [[Always-Valid p-values and the mSPRT]], [[Confidence Sequences]], [[Garden of Forking Paths]] |
| [[Q - Four Meanings of Calibration]] | 2026-09-18 | [[Simulation-Based Calibration - Overview]], [[Data-Averaged Posterior Self-Consistency]], [[Rank Statistics and Uniformity]], [[Interpreting SBC Histograms]] |
| [[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]] | 2026-09-18 | [[State-Space Models and the Kalman Filter - Overview]], [[Linear-Gaussian State-Space Models]], [[The Kalman Filter]], [[The RTS Smoother]] |
| [[Q - Variational Bounds Compared from the ELBO to EIG Estimators]] | 2026-09-18 | [[The ELBO and KL Divergence Minimization]], [[Mean-Field Family and Coordinate Ascent VI (CAVI)]], [[Normalizing Flows for Variational Inference]], [[Reparameterization Trick and Variational Autoencoders]] |
| [[Q - Partial Pooling Across Statistics and ML and When It Hurts]] | 2026-09-18 | [[Hierarchical Models]], [[Hierarchical Linear Models]], [[Partial Pooling as Multiple Comparisons Correction]], [[Empirical Bayes - Overview]] |
| [[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]] | 2026-09-18 | [[LLM-Powered Agents - Overview]], [[Silicon Samples and Algorithmic Fidelity]], [[Validity, Bias and Calibration of LLM-Simulated Populations]], [[Persona Mixture Calibration of LLM Agents]] |
| [[Q - In-Context Learning as Amortized Bayesian Inference]] | 2026-09-18 | [[In-Context Learning and Few-Shot Prompting]], [[Autoregressive Language Modeling and Pretraining]], [[Transformers and LLM Foundations - Overview]], [[Neural Posterior Estimation (NPE)]] |
| [[Q - A Map of Sequential Decision Methods from Bandits to RLHF]] | 2026-09-18 | [[Multi-Armed Bandits and Thompson Sampling - Overview]], [[Bernoulli Bandit and Thompson Sampling Algorithm]], [[UCB and Greedy Algorithms for Bandits]], [[Regret Bounds for Thompson Sampling]] |
| [[Q - Continuous Learning in Media Measurement with Interaction Effects]] | 2026-07-01 | [[Bayesian Media Mix Modeling - Overview]], [[Sequential and Adaptive BED]], [[Expected Information Gain]], [[Horseshoe and Regularized Horseshoe Priors]], [[Bayesian Optimisation]] |
| [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] | 2026-07-01 | [[Expected Information Gain]], [[Nested Estimation and Nested Monte Carlo]], [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Structural Time-Series Model]] |
| [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] | 2026-07-01 | [[Bayesian Optimisation]], [[Acquisition Functions]], [[The Global Optimisation Problem]], [[Q- and A-learning - Overview]] |
| [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] | 2026-07-01 | [[Carryover (Adstock) Functional Forms]], [[ROAS, mROAS, and Optimal Media Mix]], [[Linear-Gaussian State-Space Models]], [[Bayesian Structural Time-Series Model]] |
| [[Q - Using SMM to Calibrate Agent Based Models]] | 2026-04-11 | [[Method of Simulated Moments]], [[ABM Calibration Overview]], [[Genetic Algorithm Calibration for ABM]], [[SMM Weighting Matrix and Inference]] |
| [[Q - Uncovering Causal Estimates from Non-Experimental Data]] | 2026-04-10 | [[The Selection Problem]], [[Instrumental Variables]], [[Differences-in-Differences]], [[Synthetic Control]] |
| [[Q - Differences Between Frequentist and Bayesian Statistics]] | 2026-04-09 | [[Probability and Bayesian Inference]], [[Asymptotics and Frequentist Connections]], [[Hierarchical Models]] |
| [[Q - Common Pitfalls in Statistical Modeling]] | 2026-04-09 | [[Spurious Association and Confounds]], [[Garden of Forking Paths]], [[Overfitting and Information Criteria]], [[Model Checking]] |
| [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] | 2026-04-09 | [[Multiple Comparisons - Bayesian Perspective]], [[Garden of Forking Paths]], [[Partial Pooling as Multiple Comparisons Correction]] |

## All Questions

- [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] — All six estimators impute the same missing block (treated geos' untreated outcomes) but assume different structure for it; a diagnostic table maps each pairwise disagreement to the one assumption that broke
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]] — An experiment identifies incremental return between two spend levels in one window, so it enters as a likelihood on the MMM-implied counterfactual (with hierarchical spread), not as a prior on β; includes a disagreement protocol
- [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]] — Adstock is interference across time with no finite carryover order: switchbacks lose effective sample size, always-valid tests keep type I error but bias magnitude, geo tests need adstock-free pretests and cooldowns; six-step decision rule
- [[Q - Optimizing Media Spend on CLV with Delayed Feedback]] — Objective becomes incremental customers × model-based value + value change of existing customers; CLV posterior multiplies response posterior, discounting becomes first-order, and 'acquired' is a post-treatment variable
- [[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]] — The equal-marginal-return condition transfers fully across compute, media and experiment budgets; Kaplan-vs-Chinchilla is an MMM extrapolation warning; the data situation (unobserved, dynamic, competitive response) does not transfer
- [[Q - Covariate Adjustment for Precision vs Identification]] — Same algebra everywhere — what differs is whether randomization already balances the covariate: if so adjustment only buys variance (CUPED, GBR/TBR); if not the covariates are the identification argument and must come from a DAG
- [[Q - The Common Structure of Doubly-Robust Estimators]] — Every DR method is a model prediction plus weighted residuals with a product-of-errors remainder; 'doubly' means model-DR (AIPW, CS-DiD), rate-DR (DML, R-learner) or SDID's weights-or-model balance; the X-learner is not DR
- [[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]] — Nearly every method estimates the CATE; only conformal intervals (and BART's predictive) address ITEs; separates confidence, credible and prediction intervals and gives a rule for marketing targeting
- [[Q - A Unified View of Sensitivity to Assumption Violations]] — Each method embeds the analysis in a perturbation family, sizes the perturbation, then aggregates (worst case, average, derivative, variance share); the dividing line is whether data can ever inform the perturbation
- [[Q - Exchangeability and What Replaces It When It Fails]] — Four replacement families: permute only as the design randomized, reweight by a density ratio, model until residual symmetry is plausible, or trade exactness for a bound; the FRT needs a known assignment law, not exchangeable outcomes
- [[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]] — Methods differ in which summaries are compared, how the comparison is scored, and whether the simulator sits inside the search loop; recommended path: Morris/Sobol screening → history matching → amortized NPE/NRE validated by SBC, with SMM's J-test as misspecification check
- [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]] — Three different cures, not one: separate choosing data from evaluating data (pre-registration, cross-fitting, honesty, split conformal), pay for the dependence (multiplicity, always-valid p), or dissolve the choice (partial pooling, stacking)
- [[Q - Does Peeking Matter for a Bayesian]] — The posterior given the model is unaffected by optional stopping, but frequentist error of posterior-threshold rules, sign/magnitude error at a fixed truth and prior sensitivity are not protected; the mSPRT statistic is a Bayes factor; 7-step media-test protocol
- [[Q - Four Meanings of Calibration]] — SBC calibrates the computation (prior-averaged), conformal is a finite-sample marginal-coverage theorem, forecast calibration is an empirical property, solver calibration is average-case, and ABM/persona 'calibration' just means fitting; each property needs a sharpness check
- [[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]] — One algorithm — filter, RTS smoother, innovations likelihood = O(N) GP regression with a Gauss–Markov prior; BSTS predicts without updates for a counterfactual, ODE filters feed themselves zero residuals and read covariance as numerical error
- [[Q - Variational Bounds Compared from the ELBO to EIG Estimators]] — Every objective is 'intractable quantity = surrogate ± expected KL': expectation under q gives reverse KL (under-disperses), under the joint gives forward KL (over-covers); NPE loss equals the Barber–Agakov bound up to prior entropy; 2×2 table places NMC, PCE, VNMC, ACE
- [[Q - Partial Pooling Across Statistics and ML and When It Hurts]] — Shared mechanism: units as draws from a learned population with precision-weighted compromise (hierarchical Bayes, James–Stein, Gamma-Gamma/NBD); global forecasters and LLMs pool without an inspectable τ; six conditions under which pooling hurts
- [[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]] — Silicon sampling is poststratification with an LLM as the cell model and no uncertainty estimate: usable as theory, pilot or prior, never as the estimate; 12-step validation protocol
- [[Q - In-Context Learning as Amortized Bayesian Inference]] — The analogy holds for cost-shifting, log-score training and the learn-a-population-then-sharpen structure (closest sibling: Chronos, not NPE); it breaks on the missing explicit prior, no latent posterior, order dependence and no calibration check
- [[Q - A Map of Sequential Decision Methods from Bandits to RLHF]] — Twelve methods mapped on objective, state, horizon, feedback, exploration and data regime; the main splits are belief state vs physical state and algorithm-chosen vs logged data; RLHF is a contextual bandit with a learned reward
- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — Model interactions with a continuous surrogate + shrinkage rather than a full factorial; use expected-information-gain adaptive design (and amortized DAD policies / Bayesian-optimization acquisitions) to spend scarce experiments only on decision-relevant interactions
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — Design $\xi$ = geos × channels × magnitude × window; MMM as likelihood/simulator; targeted EIG via NMC/variational estimators; gradient ascent over designs; BSTS read-out
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — Learn → BED (EIG), optimize → BO (acquisition), earn-while-learning → bandit (regret); one surrogate, three objectives; compose them (periodic BED/BO + continuous bandit)
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — Delayed outcomes from adstock: window to the carryover tail, washout/model overlap, carryover-as-latent-state (Kalman/BSTS), delay-aware adaptive scheduling
- [[Q - Using SMM to Calibrate Agent Based Models]] — Choose ABM parameters to minimize weighted distance between observed and simulated macro moments; enables formal standard errors and specification testing via J-test
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — Nine identification strategies: CIA/matching, DAGs, IV, DiD, RD, synthetic control, metalearners, BSTS, sensitivity analysis
- [[Q - Differences Between Frequentist and Bayesian Statistics]] -- Probability as frequency vs. belief; confidence vs. credible intervals; priors; partial pooling; WAIC vs. AIC; when each framework excels
- [[Q - Common Pitfalls in Statistical Modeling]] -- Eight pitfall categories with remedies: confounding, forking paths, overfitting, missing data, golem misuse, model checking, computational issues, Type S/M errors
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] -- Stop selecting by significance; use regularizing priors, projection predictive selection, or multilevel models with partial pooling
