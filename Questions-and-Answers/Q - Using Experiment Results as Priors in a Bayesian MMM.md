---
title: "Q: How should a geo-lift or A/B experiment result become a prior in a Bayesian media mix model, and what should happen when the experiment and the MMM disagree?"
tags:
  - type/qa
  - topic/market-response
  - topic/bayesian-workflow
  - topic/bayesian-statistics
  - topic/causal-inference
  - topic/geo-experiments
date_asked: 2026-09-18
answered_from:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Prior Distributions]]"
  - "[[Constructing Priors for Effect Sizes]]"
  - "[[Tail Behavior and Prior-Likelihood Conflict]]"
  - "[[Influence of Likelihood and Prior]]"
  - "[[Prior Predictive Checking]]"
  - "[[Modeled and Unmodeled Data]]"
  - "[[Relating a Model to Subject-Matter Assumptions]]"
  - "[[Hierarchical Models]]"
  - "[[Empirical Bayes - Overview]]"
  - "[[Geo-Experiment Methodology - Overview]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[SDID for Geo Experiments and Marketing Panels]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
  - "[[Type S and Type M Errors]]"
  - "[[Plausible GMM - Overview]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
related_questions:
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
aliases:
  - Calibrating an MMM with lift tests
  - Experiment-informed priors for media mix models
  - Geo-lift as MMM prior
  - What to do when the lift test and the MMM disagree
---

# How should a geo-lift or A/B experiment result become a prior in a Bayesian media mix model, and what should happen when the experiment and the MMM disagree?

> [!summary]
> An experiment does not estimate an MMM parameter. It estimates **one functional of the response curve** — incremental sales per incremental dollar for one channel, between two specific spend levels, in specific geos, over one window including carryover — whereas the MMM's unknowns $(\beta_m,\mathcal K_m,\mathcal S_m,\alpha_m)$ define the whole curve. So the clean way in is as an **extra likelihood term on the MMM-implied version of the same counterfactual**, $\hat\Delta_e\sim\mathcal N(g_e(\Phi)+b_e,\ s_e^2)$, not as a prior pasted onto $\beta_m$; with several experiments, as a **hierarchical** layer whose between-experiment spread is the honest prior width. When the two disagree, the normal-normal update will silently average them into an answer neither supports, so the protocol is: overlay prior and likelihood on the functional, align estimands, audit both sides, then choose *explicitly* who yields — heavy tails (the model yields to the data it trusts more), an explicit **bias term on the observational side** (the MMM yields to the experiment), or reported conflict plus a new experiment designed to resolve it.

## Answer

### 1. Why this matters: the MMM is prior-dominated

[[Bayesian Estimation and Priors for MMM]] is blunt: with a couple of years of weekly data "the posterior may look almost the same as the prior." In Jin et al.'s simulations the $\beta$Hill curves are underestimated by 18–33% at two years of data and "there is no universally 'correct' prior"; in the shampoo application the retention-rate posterior "≈ its prior" and the optimal-mix posterior is bimodal ([[MMM Model Selection and Application]]). The Bayesian framing was adopted precisely "to incorporate prior knowledge." On the other side, [[Activity Bias in Advertising]] shows observational ad estimates can be wrong by two orders of magnitude (872% vs a randomised 5.4%) and that "more data doesn't help … this is a bias problem, not a variance problem" ([[Observational vs Experimental Methods in Advertising]]). An experiment is therefore both the most valuable information an MMM can receive and the thing most likely to contradict it. [[Geo-Experiment Methodology - Overview]] names the use directly: a geo iROAS "is exactly the kind of ground truth used to calibrate or validate an MMM's channel coefficients."

### 2. Two estimands that only look alike

| | Experiment | MMM |
|---|---|---|
| Object | One number with an SE: $\hat\Delta_e$ or $\mathrm{iROAS}=\Delta_{\text{resp}}/\Delta_{\text{cost}}$ ([[Time-Based Regression Estimator for Geo Experiments]]) | A function: $\beta_m\,\mathrm{Hill}(\mathrm{adstock}(x);\mathcal K_m,\mathcal S_m)$ |
| Spend contrast | From actual baseline $x^0$ to perturbed $x^1$ (go-dark, heavy-up) in the treated geos | Any; ROAS zeroes the channel, mROAS adds 1% ([[ROAS, mROAS, and Optimal Media Mix#^roas-eq]]) |
| Time | Intervention + cooldown weeks of one season | Average over the whole fitting window, carryover summed to $t_1+L-1$ |
| Population | Treated geos (volume-weighted for TBR; average geo on a log scale for SDID) | National or all-geo |
| Identification | Randomisation or a panel counterfactual | Regression on observational spend variation |

Consequences:

- A **go-dark holdout** matches the MMM's zero-out **ROAS** over that window. A **heavy-up** measures a finite difference *above* current spend, which on a concave curve is below average ROAS and approaches **mROAS** only for small perturbations. Comparing a heavy-up iROAS with the MMM's average ROAS manufactures a "disagreement" that is just curvature. TBR's design note flags the same thing: larger spend intensity "risks hitting diminishing marginal returns."
- **One experiment pins one point-to-point secant, not the curve.** [[Shape (Saturation) Effects]] shows very different $(\mathcal K,\mathcal S,\beta)$ triples give nearly identical curves in range: the *curve* is estimable, the *parameters* are not. An experiment therefore constrains a ridge in parameter space; separating slope from saturation needs a second experiment at a different spend level.
- **Carryover must be on both sides.** MMM ROAS includes the post-change period; an experiment read without cooldown understates lift ([[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]).

The mapping is then a definition, computed per posterior draw (never from posterior means — [[ROAS, mROAS, and Optimal Media Mix]]):

$$
g_e(\Phi)=\frac{\sum_{t=t_0}^{t_1+L-1}\left[\hat Y_t(x^{1};\Phi)-\hat Y_t(x^{0};\Phi)\right]}{\sum_{t=t_0}^{t_1}\left(x^1_t-x^0_t\right)}
$$

with the experiment's own geos, weeks, spend paths and outcome definition. This is [[Prior Distributions]]' advice made concrete: "elicit on the predictive scale, not the parameter scale."

### 3. Three ways to let the experiment in

**A. Experiment as likelihood (default).** Add one line per experiment:

$$
\hat\Delta_e \sim \mathcal N\left(g_e(\Phi)+b_e,\ s_e^2\right)
$$

In the taxonomy of [[Modeled and Unmodeled Data]], $\hat\Delta_e$ is modeled data, $s_e$ and the spend paths are unmodeled data. It is mathematically a prior on the functional $g_e$ — "data models sometimes become priors" — but it respects the nonlinearity, composes across experiments, and needs no re-parameterisation. The geo-holdout Q&A already treats the MMM as the likelihood $p(y\mid\theta,\xi)$ for a design $\xi$; this is that update done with a sufficient summary instead of raw geo-weeks. [[SDID for Geo Experiments and Marketing Panels]] makes the same point from the estimator side: a point estimate with a Gaussian interval "can still be used as a likelihood summary for MMM calibration," while BSTS or TBR hand over a full posterior.

> [!warning] Double counting (*synthesis*)
> If the MMM is fit on geo-level data that include the test geos and weeks, the experiment's sales are already in the likelihood. Either keep the raw data and drop the summary term (the randomised spend shock is then exogenous variation the MMM sees directly), or keep the summary and mask those cells. For a national MMM the overlap is usually negligible.

**B. Experiment as a prior on a parameter (only with care).** A half-normal on $\beta_m$ cannot encode an iROAS: the same ROAS corresponds to different $\beta_m$ as $\mathcal K_m,\mathcal S_m,\alpha_m$ move. If the tooling only accepts parameter priors, tune the prior and verify with a [[Prior Predictive Checking|prior predictive check]]: simulate $\Phi$ from the prior, compute $g_e(\Phi)$, and confirm its distribution matches the experiment's. This is a level-5 "specific informative" prior, so follow the documentation rule — "write a sentence about each parameter" tracing every number to its experiment.

**C. Several experiments: a hierarchical or meta-analytic prior.** "The prior for any given study represents the distribution of average treatment effects among a hypothetical population of problems" ([[Constructing Priors for Effect Sizes]]). With experiments $e=1,\dots,J$ on a channel (different quarters, creatives, regions):

$$
\hat\Delta_e\sim\mathcal N(\theta_e, s_e^2),\qquad \theta_e\sim\mathcal N\left(g_e(\Phi),\ \tau_m^2\right)
$$

$\tau_m$ is **transport variance** — how far a true effect in one window sits from the curve's average. It is what stops a single tight experiment from over-ruling two years of data about a different period. [[Hierarchical Models]] warns that with $J<5$ the posterior for $\tau$ collapses toward zero unless given a half-Cauchy or half-$t$ hyperprior with a domain-informed scale; with many experiments across brands, [[Empirical Bayes - Overview|empirical Bayes]] estimation of the population is the cheap version. Jin et al. recommend the same move — pool brands or geos "to manufacture more informative priors" rather than lengthen history, because market conditions drift.

> [!example] What the update does (normal-normal arithmetic as in [[Constructing Priors for Effect Sizes]])
> MMM-only posterior for the go-dark ROAS of paid social: $3.0\pm1.0$. Geo test: $1.2\pm0.5$. Precision weighting gives
> $$\frac{3.0/1.0^2+1.2/0.5^2}{1/1.0^2+1/0.5^2}=1.56,\qquad \text{sd}=\sqrt{1/5}=0.45$$
> Add transport sd $\tau=0.5$ to the experiment ($s^2=0.5$): the mean moves to $1.8$, sd $0.58$. Both answers lie in a region neither source favoured — which is why §5 exists.

### 4. How wide should $s_e$ be?

The reported standard error is a lower bound. Add, in variance:

1. **Estimator uncertainty.** The same geo panel gives different lifts under TBR, CausalImpact, SC and SDID ([[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]); TBR's interval is valid only under its stability assumption ([[TBR Design Sensitivity and the Stationarity Assumption]]).
2. **Transport** ($\tau_m$): time, creative, geo mix, spend level.
3. **Type M inflation.** "Statistically significant results from underpowered studies are therefore likely to be *exaggerated*" ([[Type S and Type M Errors]]). If the test is in the deck *because* it was significant, shrink it first: the early-childhood example turns $42\%\pm20\%$ into $8\%\pm9\%$ under a $\mathcal N(0,0.10)$ literature prior. Feeding the raw likelihood (route A) does this automatically, provided the MMM's own prior on the functional is realistic rather than flat.

A noisy experiment then contributes little, by arithmetic rather than by judgement call.

### 5. When they disagree: a protocol

> [!warning] The normal-normal model hides the conflict ([[Tail Behavior and Prior-Likelihood Conflict]])
> With $\bar y=10$ against a $\mathcal N(0,1)$ prior of equal information, the posterior is $\mathcal N(5.0,0.7)$ — "contradicting both prior and likelihood" — and "computation remains smooth": no divergences, no $\hat R$ warning. "Plotting prior and likelihood together is the only check that catches it."

**Step 0 — Detect.** For each experiment overlay (i) the MMM-only posterior of $g_e(\Phi)$ and (ii) the experiment likelihood. Run power-scaling sensitivity ([[Influence of Likelihood and Prior]]): a functional sensitive to **both** prior and likelihood scaling signals conflict; trust the importance-sampling answer only when Pareto $\hat k<0.7$.

**Step 1 — Align estimands** (§2): same window with cooldown, same spend contrast (secant vs. average vs. marginal), same geos and outcome. Many disagreements end here.

**Step 2 — Audit the experiment.** Estimator multiverse, placebo/A-A backtests, spillover into control geos, power and Type M, whether geos were randomised or hand-picked.

**Step 3 — Audit the MMM.** Is the functional prior-dominated (posterior ≈ prior)? Residual autocorrelation out to lag ~15 weeks was a misspecification signal in the shampoo model. Is spend correlated with unmodelled demand, promotions or other channels — the aggregate analogue of activity bias (*synthesis*: budgets follow expected demand, so the bias is typically upward for demand-capturing channels)?

**Step 4 — Choose who yields, explicitly.**

| Remedy (Gelman et al.'s table) | MMM translation | Conflict resolves toward | Use when |
|---|---|---|---|
| Thick-tailed term | Student-$t$/Cauchy on the *experiment* term | the MMM's time-series data | the experiment's transportability or execution is doubtful |
| Explicit bias term | $g_e^{\text{obs}}(\Phi)=g_e^{\text{causal}}+b_m$, $b_m\sim\text{Cauchy}(0,\text{small})$; experiment informs $g^{\text{causal}}$, budget decisions use $g^{\text{causal}}$ | the experiment | the experiment is clean and the MMM is observational — the usual case |
| Thin tails + diagnostics | Gaussian terms, conflict reported | neither | stakeholders should see both numbers |

The bias-term row is the fix [[Relating a Model to Subject-Matter Assumptions]] prescribes when estimates come "from observational studies rather than controlled experiments," and it is [[Plausible GMM - Overview|Plausible GMM]]'s move: replace the dogmatic assumption that the exogeneity moment holds exactly ($\mu_*\equiv0$) with a proper prior over the violation. Two of its lessons carry over. First, **no free lunch** — admitting possible bias "necessarily yields wider, less precise inference." Second, $\theta_*$ and $\mu_*$ "are not jointly identified," so from observational data alone the prior on $b_m$ never washes out; *the experiment is what identifies the bias*, and a channel never tested keeps its full bias uncertainty. Expect the counter-intuitive behaviour Gelman et al. document: $E(\theta\mid y)$ is non-monotonic — the larger the gap, the more is attributed to bias and the *less* the observational data move the causal estimate.

**Step 5 — If still unresolved, make it a design problem.** Choose the next test to maximise targeted EIG on the contested functional, ideally at a *different* spend level so curvature is identified ([[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]).

**Step 6 — Document.** For each experiment term: source, dates, geos, estimator, raw SE, inflation applied, window, and the conflict plot.

### Practical Implications

- **Default recipe:** one likelihood term per experiment on a matched counterfactual $g_e(\Phi)$; hierarchical $\tau_m$ per channel; a per-channel observational bias term $b_m$ with a tight-centred, heavy-tailed prior; decisions (mROAS, optimal mix) computed from the causal curve, per draw.
- **Match experiment type to MMM functional:** go-dark ↔ ROAS; small heavy-up ↔ mROAS; large heavy-up ↔ a secant you must compute explicitly.
- **Plan experiments in pairs of spend levels** if you want them to discipline saturation and not only scale.
- **Never trust a calibrated MMM without the overlay plot**; smooth sampling is not evidence of agreement.
- **Age your experiments** (*synthesis*): inflate $s_e$ or $\tau_m$ with time since the test — the informal version of the "hierarchical time series model" that [[Constructing Priors for Effect Sizes]] says historical priors approximate.
- **For agent-based models** the same device applies: a lift test becomes one more target statistic whose simulated counterpart is the ABM's geo-holdout counterfactual ([[Q - Using SMM to Calibrate Agent Based Models]]).

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Bayesian Estimation and Priors for MMM]] | Prior specifications, prior dominance, sensitivity of $\beta$Hill to the prior |
| [[ROAS, mROAS, and Optimal Media Mix]] | Counterfactual definitions of ROAS/mROAS; plug in draws, not means; optimal-mix variance |
| [[Shape (Saturation) Effects]] · [[Carryover (Adstock) Functional Forms]] | Curve identifiable, parameters not; carryover window $L$ |
| [[MMM Model Selection and Application]] · [[Bayesian Media Mix Modeling - Overview]] | Small-sample bias numbers, residual autocorrelation, pooling for priors |
| [[Constructing Priors for Effect Sizes]] | Prior as population of effects; meta-analytic priors; early-childhood shrinkage example |
| [[Tail Behavior and Prior-Likelihood Conflict]] | Hidden conflict, Cauchy vs bias-term remedies, non-monotonic posterior mean |
| [[Influence of Likelihood and Prior]] | Power-scaling sensitivity and the conflict diagnostic |
| [[Prior Distributions]] · [[Prior Predictive Checking]] · [[Modeled and Unmodeled Data]] | Predictive-scale elicitation, informativity ladder, documentation, variable taxonomy |
| [[Relating a Model to Subject-Matter Assumptions]] | Bias term when estimates are observational |
| [[Hierarchical Models]] · [[Empirical Bayes - Overview]] | Partial pooling across experiments; hyperprior on $\tau$ with few groups |
| [[Time-Based Regression Estimator for Geo Experiments]] · [[TBR Design Sensitivity and the Stationarity Assumption]] · [[SDID for Geo Experiments and Marketing Panels]] | What the experiment delivers (iROAS posterior / Gaussian summary) and its validity conditions |
| [[Activity Bias in Advertising]] · [[Observational vs Experimental Methods in Advertising]] | Size and nature of observational bias |
| [[Type S and Type M Errors]] | Exaggeration of significant, underpowered results |
| [[Plausible GMM - Overview]] | Priors over misspecification; non-identification of bias; no free lunch |
| [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] | MMM as likelihood for a design; choosing the next experiment |

## Related Concepts

- [[Geo-Experiment Methodology - Overview]] — where the experimental number comes from
- [[Counterfactual Impact Estimation]] — BSTS posterior as the experiment summary
- [[Advertising and Promotion Effects]] — elasticity generalisations (~0.10 short-run) as a sanity-check prior when no experiment exists
- [[Sensitivity Analysis in Observational Studies]] — the frequentist relative of the bias term
- [[Sequential and Adaptive BED]] — re-designing after each calibration cycle
- [[Q - Four Meanings of Calibration]] — "calibrating an MMM" is the parameter-tuning sense, not the probabilistic one
- [[Q - Partial Pooling Across Statistics and ML and When It Hurts]] — when pooling experiments across channels misleads
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — what each experiment type calibrates in an MMM, and converting user-level lift to MMM units

## Gaps

- **No ingested source on MMM calibration practice** (ROI-parameterised priors, lift-calibrated loss terms, experiment-based bias correction). Sections 3–5 are synthesis from the MMM, workflow and geo-experiment notes.
- **No coverage of power priors or commensurate priors** for discounting historical experiments; the ageing rule is improvised.
- **User-level A/B lift → MMM units** (conversions per exposed user to sales per dollar, platform-attributed outcomes, reach scaling) is not covered; this answer is solid only for geo-level tests.
- **Time-varying MMM coefficients** are absent, so "the experiment measured a different period" can only be absorbed by $\tau_m$.
- [[Plausible GMM - Overview]] lacks the formal §4 results, so the mapping to an MMM bias term is by analogy.

## Follow-Up Questions

- How should the MMM be re-parameterised so that channel ROAS at reference spend is itself a parameter with a prior?
- What prior scale for the observational bias $b_m$ is defensible per channel type (search vs. TV)?
- Given the current posterior, which spend level for the next geo test most reduces uncertainty about $\mathcal K_m$?
- How fast should an experiment's weight decay, and can that be estimated from repeated tests on one channel?
