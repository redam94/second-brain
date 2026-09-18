---
title: Online Experimentation - Index
tags:
  - type/index
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/ab-testing
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
parent: "[[Research/Research Methodology/Experimental Design/_Index|Experimental Design]]"
---

# Online Experimentation - Index

> [!abstract] Routing Summary
> Statistics of large-scale online A/B testing: variance reduction, sequential / always-valid inference, trustworthiness checks, and interference-robust designs. Anchored by Deng et al. (2013, CUPED), Johari, Pekelis & Walsh (2015, always-valid inference), Howard et al. (2021, confidence sequences), Fabijan et al. (2019, SRM), Kohavi et al. (2012, puzzling outcomes), Johari et al. (2020, two-sided platforms), Bojinov et al. (2020, switchbacks) and the Larsen et al. (2022) review.
>
> - Need the big picture / where to start? → [[Online Experimentation - Overview]]
> - Need more power without more traffic (pre-period covariates, control variates)? → [[CUPED and Regression-Adjusted Variance Reduction]]
> - Need to know why checking the dashboard daily inflates false positives? → [[The Peeking Problem and Optional Stopping]]
> - Need a $p$-value that stays valid under continuous monitoring? → [[Always-Valid p-values and the mSPRT]]
> - Need an interval valid at every sample size, nonparametric, with code? → [[Confidence Sequences]]
> - Need the closed-form boundary to implement? → [[Confidence Sequences#^def-normal-mixture|normal mixture boundary]]
> - Need to check whether an experiment's data can be trusted (SRM, A/A, carryover)? → [[Sample Ratio Mismatch and Trustworthiness Checks]]
> - Need to handle SUTVA violations in networks, marketplaces or ad auctions? → [[Interference and Marketplace Experiments]]
> - Need to design or analyse a time-randomized (switchback) test with carryover? → [[Switchback Experiment Design and Analysis]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| OCE framework and failure modes | [[Online Experimentation - Overview]] | overview | The Experimental Ideal; Potential Outcomes; Power Analysis | $n = 16\sigma^2/\delta^2$ makes 0.02% effects undetectable; four failure modes map to the notes below |
| CUPED / control variates | [[CUPED and Regression-Adjusted Variance Reduction]] | method | Overview; Power Analysis | $\operatorname{var}(\Delta_{cv}) = \operatorname{var}(\Delta)(1-\rho^2)$ with $\theta = \operatorname{cov}(Y,X)/\operatorname{var}(X)$; about 50% reduction at Bing; never use post-treatment covariates |
| Peeking / optional stopping | [[The Peeking Problem and Optional Stopping]] | concept | Overview; Power Analysis | $\mathbb P(\min_n p_n \le \alpha) \gg \alpha$; by the LIL a patient peeker rejects w.p. 1; 10 looks give about 20% FPR |
| Always-valid $p$-values, mSPRT | [[Always-Valid p-values and the mSPRT]] | method | Peeking | Thm 1 duality with power-one sequential tests; $p_n = \min(p_{n-1}, 1/\Lambda_n^H)$; Thm 2 first-order efficiency; Thm 3 mixing variance matches effect prior; commutes with Bonferroni and BH-G |
| Confidence sequences | [[Confidence Sequences]] | concept | Peeking; mSPRT; Potential Outcomes | $\mathbb P(\forall t: \theta_t \in \mathrm{CI}_t) \ge 1-\alpha$; stitched LIL boundary; normal mixture $u(v) = \sqrt{(v+\rho)\log((v+\rho)/(\alpha^2\rho))}$; empirical-Bernstein and sequential ATE; under $2\times$ CLT width |
| SRM and trust checks | [[Sample Ratio Mismatch and Trustworthiness Checks]] | application | Overview; The Experimental Ideal | $\chi^2$ test on arm counts; about 6% of Microsoft experiments; five-stage taxonomy, ten diagnostic rules; A/A tests, carryover, OEC pitfalls; sequential multinomial test |
| Interference, CR / LR / TSR, clusters | [[Interference and Marketplace Experiments]] | concept | Overview; Potential Outcomes | GTE estimand; CR unbiased when demand-constrained, LR when supply-constrained; naive estimators overestimate positive effects; TSR interpolates; cluster randomization trades bias for variance |
| Switchback experiments | [[Switchback Experiment Design and Analysis]] | method | Interference; Randomization Inference | $m$-carryover; Horvitz–Thompson estimator unbiased; fair coins, flip every $m$ periods: $\mathbb T^* = \{1, 2m+1, \dots, (n-2)m+1\}$; exact FRT and conservative CLT |

## Notes

- [[Online Experimentation - Overview]] — CONTAINS: OCE definition and notation (variants, units, metrics, OEC, guardrails), ATE and lift, table of four failure modes, Larsen sample-size example (147,456 vs 9.2 billion), triggered analysis, CV$/\sqrt n$ result for Sessions/User, early-trend fallacy (67% / 55%), relevance to geo experiments, ad auctions, lift studies and ABMs, pipeline pseudo-code.
- [[CUPED and Regression-Adjusted Variance Reduction]] — CONTAINS: stratification variance decomposition, control variate estimator, optimal $\theta$ and $(1-\rho^2)$ theorem, unbiasedness of $\Delta_{cv}$ under randomization, stratification as special case, covariate choice, pre-period length (correlation vs coverage), missing pre-period data, pre-trigger covariates, delta method for page-level metrics, DQ-per-user post-treatment bias example, relation to ANCOVA and semiparametric efficiency, Bing slowdown experiment, Python sketch.
- [[The Peeking Problem and Optional Stopping]] — CONTAINS: decision rule / sequential test / fixed-horizon $p$-value definitions, union-over-looks argument, LIL "sampling to a foregone conclusion", behavioural amplifiers (trends, novelty, primacy), six remedies (discipline, group sequential, SPRT with $A$, $B$ thresholds, always-valid, Bayesian, bandits), costs of optional stopping, simulation table of false positive rates by monitoring schedule.
- [[Always-Valid p-values and the mSPRT]] — CONTAINS: Definitions 1-2, Theorem 1 duality and proof sketch, mSPRT definition, Ville/martingale justification of the $1/\alpha$ threshold, power one, Gaussian closed form and link to the normal mixture boundary, $(M,\alpha)$ user model, aggressive / conservative / Goldilocks regimes, Theorems 2-3 and Eq. 12 for $\gamma_*^2$, robustness to mixing misspecification, Proposition 4 vs fixed horizon, Optimizely data, two-stream normal and Bernoulli tests, Bonferroni / BH-G / FCR results, limitations, simulation and code.
- [[Confidence Sequences]] — CONTAINS: properties P1-P4, definition, Lemma 3 equivalences, sub-$\psi$ condition and uniform boundaries, linear boundary (Lemma 1), stitched boundary and finite LIL bound (Eq. 2), method of mixtures (Lemma 2), two-sided normal mixture (Eq. 14) and tuning of $\rho$ (Prop. 3), $\sqrt{v\log v}$ vs $\sqrt{v\log\log v}$ trade-off, empirical-Bernstein Theorem 4, sequential ATE with AIPW pseudo-outcomes (Corollary 2), running intersection caveat, width-ratio table, Python implementation.
- [[Sample Ratio Mismatch and Trustworthiness Checks]] — CONTAINS: SRM definition and $\chi^2$ test, selection-bias argument with survival indicator $R$, MSN carousel sign reversal, five-stage taxonomy table with examples and prevention, positive-cause SRMs, ten rules of thumb, A/A tests, carryover (3 weeks to 3+ months), OEC decomposition, Lindon–Malek sequential multinomial Bayes-factor test, fixed and sequential code examples, lift-study and geo readings.
- [[Interference and Marketplace Experiments]] — CONTAINS: SUTVA / interference / GTE definitions, network vs marketplace interference, reported bias magnitudes, Markov chain model and mean-field ODE (Eqs. 7-8), market balance $\lambda/\tau$, CR / LR / TSR designs and naive estimators (Eqs. 19-21), Theorems 3-4 and Proposition 4 with intuition, TSR allocation rule (Eq. 26), TSRI estimators, bias-variance simulations, graph-cluster and ego-cluster randomization, budget-split designs, geo experiments as cluster designs, lodging and advertising examples, simulation as a design tool.
- [[Switchback Experiment Design and Analysis]] — CONTAINS: non-anticipation and $m$-carryover assumptions, lag-$p$ estimand, regular switchback definition, Horvitz–Thompson estimator, minimax design problem, Theorems 1-2 and the $T = 12$, $m = 2$ example, granularity and robustness corollaries, exact randomization test (Algorithm 1), variance bound $\hat\sigma_U^2$, Theorem 3 CLT, misspecified $m$, procedure for identifying $m$, horizon planning, Python design / estimator / test code, simulation comparing HT with the naive contrast, media-flighting interpretation.

## External / Cross-Folder Links

- [[The Experimental Ideal]], [[Potential Outcomes Framework]] — identification and notation that every note builds on.
- [[Power Analysis and Sample Size]], [[Multiple Testing Corrections]], [[Type S and Type M Errors]] — sibling experimental-design notes (fixed-horizon power, multiplicity, exaggeration under low power).
- [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Pre-registration and Open Science - Overview]] — optional stopping and post-hoc filtering as analysis flexibility.
- [[Logic of Regression Adjustment]] — covariate adjustment for identification, contrasted with CUPED's adjustment for precision.
- [[Randomization Inference - Overview]], [[Fisher Randomization Test and the Sharp Null]], [[Sharp vs Weak Null Hypotheses]] — design-based inference used by switchbacks and the sequential ATE.
- [[Standard Errors and Clustering]] — randomization unit vs analysis unit; cluster designs.
- [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[Geo-Experiment Methodology - Overview]] — spatial cluster randomization and pre-period modelling in marketing.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]], [[UCB and Greedy Algorithms for Bandits]], [[Sequential and Adaptive BED]] — adaptive alternatives to fixed-allocation testing.
- [[Delayed and Censored Feedback - Overview]] — delayed outcomes interacting with early stopping and carryover.
- [[Activity Bias in Advertising]], [[Observational vs Experimental Methods in Advertising]] — advertising measurement context.
- [[Empirical Bayes - Overview]], [[James-Stein Estimator]] — fitting the mSPRT mixing distribution from past experiments.
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]], [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — related Q&A notes.

## Sources

- [[raw/Deng 2013 - CUPED Improving Sensitivity with Pre-Experiment Data.pdf]] — Deng, A., Xu, Y., Kohavi, R. & Walker, T. (2013), "Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data," *WSDM 2013*.
- [[raw/Johari 2015 - Always Valid Inference.pdf]] — Johari, R., Pekelis, L. & Walsh, D. (2015; v3 2019), "Always Valid Inference: Continuous Monitoring of A/B Tests," arXiv:1512.04922 (*Operations Research* 2022).
- [[raw/Howard 2021 - Time-uniform Nonparametric Confidence Sequences.pdf]] — Howard, S., Ramdas, A., McAuliffe, J. & Sekhon, J. (2021), "Time-uniform, nonparametric, nonasymptotic confidence sequences," *Annals of Statistics*; arXiv:1810.08240.
- [[raw/Larsen 2022 - Statistical Challenges in Online Controlled Experiments.pdf]] — Larsen, N., Stallrich, J., Sengupta, S., Deng, A., Kohavi, R. & Stevens, N. (2022), "Statistical Challenges in Online Controlled Experiments: A Review of A/B Testing Methodology," arXiv:2212.11366.
- [[raw/Kohavi 2012 - Trustworthy Online Controlled Experiments Five Puzzling Outcomes.pdf]] — Kohavi, R., Deng, A., Frasca, B., Longbotham, R., Walker, T. & Xu, Y. (2012), "Trustworthy Online Controlled Experiments: Five Puzzling Outcomes Explained," *KDD 2012*.
- [[raw/Fabijan 2019 - Diagnosing Sample Ratio Mismatch.pdf]] — Fabijan, A. et al. (2019), "Diagnosing Sample Ratio Mismatch in Online Controlled Experiments: A Taxonomy and Rules of Thumb for Practitioners," *KDD 2019*.
- [[raw/Lindon 2020 - Anytime-Valid Inference for Multinomial Count Data.pdf]] — Lindon, M. & Malek, A. (2020), "Anytime-Valid Inference for Multinomial Count Data," arXiv:2011.03567.
- [[raw/Johari 2020 - Experimental Design in Two-Sided Platforms.pdf]] — Johari, R., Li, H., Liskovich, I. & Weintraub, G. (2020), "Experimental Design in Two-Sided Platforms: An Analysis of Bias," arXiv:2002.05670 (*Management Science* 2022).
- [[raw/Bojinov 2020 - Design and Analysis of Switchback Experiments.pdf]] — Bojinov, I., Simchi-Levi, D. & Zhao, J. (2020), "Design and Analysis of Switchback Experiments," arXiv:2009.00148 (*Management Science* 2023).
