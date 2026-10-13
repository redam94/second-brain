---
title: "Index: Simulation-Based Method Validation"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/simulation
parent: "[[../_Index|Model Validation and Interpretability]]"
date_updated: 2026-10-13
---

# Simulation-Based Method Validation

> [!abstract] Routing Summary
> This topic covers how to check whether a statistical or marketing-measurement method recovers the truth when real data never reveal it: generate data with known ground truth, run the method many times, and score it with properly quantified Monte Carlo error. It contains 3 sub-topics (one per source) and 29 notes plus 3 source indexes. The three sources fit together as **why** (Chan & Perry 2017: regression MMMs cannot be validated by fit), **what to simulate** (Zhang & Vaver 2017: the AMSS simulator, a data-generating mechanism with counterfactual ROAS ground truth) and **how to run the study** (Morris, White & Crowther 2019: the ADEMP framework, performance measures and Monte Carlo SEs).
> - Why MMMs need simulation validation (data limits, selection bias, five equal-fit models that disagree) → [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling/_Index|Chan Perry 2017 - Challenges in Media Mix Modeling]]
> - A realistic simulator of aggregate marketing data, and how to compute ground-truth ROAS / mROAS → [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator/_Index|Zhang Vaver 2017 - Aggregate Marketing System Simulator]]
> - How to design, code, analyse and report any simulation study (ADEMP, bias/coverage/MSE with MCSEs, choosing $n_{\text{sim}}$) → [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)/_Index|Morris White Crowther 2019 - Simulation Studies (ADEMP)]]
> - A ready-made ADEMP protocol for a Bayesian MMM or a SHAP driver-ranking pipeline → [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]
> - A step-by-step protocol for validating a pipeline against a simulator → [[AMSS Discussion, Limitations and Validation Practice]]
> - Why good $R^2$ / holdout MAPE cannot pick the causal model → [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]
> - How much error unmodelled carryover causes, with numbers → [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]
> - How many repetitions to run → [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]
> - Start with one overview per source → [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]], [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]
^routing-summary

## Sub-topics

- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling/_Index|Chan Perry 2017 - Challenges in Media Mix Modeling]] (8 notes) — COVERS: why experiments and matching fall short (selection-bias decomposition, Eq. 1 matching and overlap); MMM data sources and the additive regression specification (Eqs. 2-3, five trustworthiness conditions); data limitations (156 rows vs 60-80+ parameters, correlated channels Fig. 1, narrow spend range and average vs marginal ROAS Fig. 2); selection bias (ad targeting, seasonality, funnel effects, endogenous price controls); model selection and uncertainty (five models with $R^2$ 0.98-0.99 disagreeing by up to 50%, Figs. 3-4); opportunities (better data, Bayesian priors, category and geo pooling, demand-proxy controls, graphical models, Fig. 5); simulation-based validation with withheld truth and transparency obligations (§5.6, §6); full 19-item reference list.
- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator/_Index|Zhang Vaver 2017 - Aggregate Marketing System Simulator]] (10 notes) — COVERS: virtual experiments as motivation; the hidden-state Markov formalism (198 mindset segments, multinomial migration Eqs. 1-2, App. A notation); natural migration, market-size, de-satiation and the lag family $Q_\alpha$ (no-lag theorem, Eqs. 10-14); the traditional media module (Poisson reach/frequency, Hill effect Eq. 3); the paid search module (auction, CPC/SOV, organic vs paid); the sales event (demand curves, competitor strength and substitutability, post-purchase satiation); ground truth via counterfactual scenarios (total effect, well-defined interventions, simulated ROAS / mROAS, Table 4); the MMM evaluation (Tables 4-7, Fig. 14: no-lag TV-ROAS MSE 0.025 → 1.618 as carryover rises, 0.067 with lags); limitations and a simulator-validation protocol.
- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)/_Index|Morris White Crowther 2019 - Simulation Studies (ADEMP)]] (11 notes) — COVERS: definition and uses of simulation studies and the review of 100 published studies (93 without MCSEs, 4/87 justified $n_{\text{sim}}$); ADEMP planning (aims, factorial DGMs and fallbacks, Senn's four pitfalls, estimands and targets Table 3, pure vs procedural methods); coding (seed once, store RNG states, streams, build-up, four datasets Table 5); performance measures with Monte Carlo SEs (Table 6, bias-eliminated coverage, Figure 1, conditional coverage Table 7); estimates-data checks and $n_{\text{sim}}$ (Eq. 1); reporting (tables, nested-loop, zip and lollipop plots, 13-item checklist); worked exponential vs Weibull vs Cox example (Table 8); protocols, code release, consortia; all 76 references; an ADEMP application to MMM and SHAP pipelines.

## Concept Map

| Concept | Where it lives | Source | Role in the validation workflow |
|---|---|---|---|
| Selection bias = naive contrast minus causal effect | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]], [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]] | Chan & Perry | Failure mode a simulator must reproduce |
| Additive MMM (Eq. 3) and trustworthiness conditions | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] | Chan & Perry | The method (M) under test |
| Equal-fit models with different ROAS | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] | Chan & Perry | Why fit statistics cannot replace ground truth |
| Average vs marginal ROAS identifiability | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]], [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] | Chan & Perry; Zhang & Vaver | Estimands (E): ROAS vs mROAS |
| Simulator with withheld truth; blind RFP | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] | Chan & Perry | The call for simulation validation |
| Virtual experiment | [[AMSS Motivation - Virtual Experiments for Marketing Measurement]] | Zhang & Vaver | Rationale for a simulator |
| Hidden-state segment migration | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] | Zhang & Vaver | Data-generating mechanism (D) |
| Carryover from migration ($Q_\alpha$) | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]] | Zhang & Vaver | A DGM factor to vary |
| Hill saturation on frequency | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] | Zhang & Vaver | A DGM factor; model-side counterpart in [[Shape (Saturation) Effects]] |
| Organic vs paid search incrementality | [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]] | Zhang & Vaver | Simulated selection bias (cf. Chan & Perry §4.2.1) |
| Competition and post-purchase satiation | [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]] | Zhang & Vaver | DGM realism |
| Counterfactual ROAS / mROAS as total effect | [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] | Zhang & Vaver | Estimand (E) when it is not a DGM parameter |
| Lag-omission bias | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] | Zhang & Vaver | Example of performance (P) results |
| ADEMP | [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] | Morris et al. | Planning and reporting frame for the whole workflow |
| Factorial DGMs and fallbacks | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] | Morris et al. | How to vary DGM factors |
| Seeds, RNG states, streams | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]] | Morris et al. | Reproducible execution |
| Bias, EmpSE, MSE, coverage + MCSEs (Table 6) | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] | Morris et al. | Performance measures (P) |
| $n_{\text{sim}}$ from target MCSE (Eq. 1) | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] | Morris et al. | Sizing the study |
| Zip and lollipop plots | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] | Morris et al. | Reporting |
| Protocols, code release, consortia | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]], [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] | Morris et al.; Chan & Perry | Transparency and governance |
| ADEMP for MMM / SHAP | [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]], [[AMSS Discussion, Limitations and Validation Practice]] | Morris et al.; Zhang & Vaver (applied) | End-to-end protocol |

## Cross-Cutting Concepts

- **Ground truth must come from outside the fitted model.** Chan & Perry show that five MMMs with $R^2$ 0.98-0.99 give conflicting ROAS and allocations ([[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]). Zhang & Vaver show the same thing with numbers: a no-lag model's TV-ROAS error is almost all bias, and fit statistics do not reveal it ([[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]). Morris et al. supply the general principle that a method is judged by known-$\theta$ performance measures ([[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]). **All three agree.**
- **The estimand must be defined before the simulation.** Morris et al. separate estimands from other targets (Table 3) and marginal from conditional estimands ([[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]). Zhang & Vaver give the marketing version: ROAS is a *total effect* across pathways, defined by counterfactual budget scenarios, and some interventions (fixing uncapped search spend) are not well defined ([[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]). Chan & Perry add that average ROAS is poorly identified from a narrow spend range while mROAS near current spend is better identified ([[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]).
- **The DGM should be structurally different from the model under test.** AMSS deliberately generates carryover, saturation and selection effects from population dynamics rather than from the regression's own response equation ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]). Morris et al. warn against DGMs that favour one method (Senn's pitfalls) and against drawing $\theta$ from the prior when the aim is frequentist evaluation. Bayesian fake-data checks such as [[Designing Simulated-Data Experiments]] and [[Simulation-Based Calibration - Overview]] simulate *under the model's own assumptions*. **These answer different questions, and the sources do not conflict:** self-consistency checks test the computation, while a structurally different DGM tests robustness to misspecification.
- **Monte Carlo error is usually ignored.** Morris et al. found 93 of 100 studies reported no MCSE ([[Morris et al 2019 - Motivation and Review of Simulation Practice]]). The AMSS demonstration reports bias and MSE over 1,000 simulated datasets, but neither results table gives Monte Carlo SEs. **This is where the sources differ:** AMSS is an exemplary D and E, but its P is weaker than the ADEMP standard. [[AMSS Discussion, Limitations and Validation Practice]] and [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] close that gap.
- **Carryover and saturation appear on both sides.** In AMSS they are DGM mechanics ([[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]], [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]). In the companion Bayesian MMM they are model components ([[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]]). Simulation tests whether the model's functional forms recover effects that the DGM produces differently.
- **Selection bias.** Chan & Perry rank it as "perhaps" the largest hurdle (targeting, seasonality, funnels, endogenous controls). AMSS reproduces it mechanically in its paid search module, where queries reflect underlying demand ([[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]). Real-experiment evidence for the same effect is in [[Experimental Benchmarks for Observational Ad Measurement]] and [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
- **Transparency and pre-registration.** Chan & Perry ask modelers to disclose model choice, model uncertainty and how much the priors drive results ([[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]]). Morris et al. ask for protocols, released code and author consortia ([[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]]). Both are responses to the same problem as [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]].
- **Limits of simulation evidence.** Morris et al. call simulation results "points of light on a landscape": they hold only for the DGMs studied. Zhang & Vaver list AMSS's own simplifications. Chan & Perry treat simulation as necessary but not enough, alongside better data and experiments. **All three agree** that simulation shows where methods fail, not that they work everywhere.

## Sources

- [[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]] — Chan, D. & Perry, M. (2017). *Challenges and Opportunities in Media Mix Modeling.* Google white paper, 16 pp.
- [[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]] — Zhang, S. & Vaver, J. (2017). *Introduction to the Aggregate Marketing System Simulator.* Google technical report, 43 pp.
- [[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]] — Morris, T. P., White, I. R. & Crowther, M. J. (2019). Using simulation studies to evaluate statistical methods. *Statistics in Medicine* 38(11):2074-2102.

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — the companion Bayesian MMM (Jin et al. 2017), whose sample-size simulation is in [[MMM Model Selection and Application]]
- [[Designing Simulated-Data Experiments]] and [[Simulation-Based Calibration - Overview]] — Bayesian-workflow simulation checks
- [[Effective Sample Size and Monte Carlo Standard Error]] — Monte Carlo error within one MCMC fit
- [[Geo-Experiment Methodology - Overview]] — experimental ground truth that simulators can also evaluate
- [[Dillon et al - SHAP and Causal Insights - Overview]] — predictive attribution vs causal effect, a natural simulation target
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — formal treatment of many equally good models
- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] — time-series validation
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — model risk governance
