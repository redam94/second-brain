---
title: "Q: The vault uses 'calibration' in at least four senses — simulation-based calibration of a Bayesian computation, coverage calibration in conformal prediction, probabilistic calibration of forecasts under proper scoring rules, and parameter calibration of agent-based models (plus uncertainty calibration of probabilistic numerical solvers and LLM-population calibration). What does each one guarantee, and what does it not?"
tags:
  - type/qa
  - topic/calibration
  - topic/bayesian-workflow
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - topic/agent-based-modeling
date_asked: 2026-09-18
answered_from:
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Data-Averaged Posterior Self-Consistency]]"
  - "[[Rank Statistics and Uniformity]]"
  - "[[Interpreting SBC Histograms]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
  - "[[Conformal Prediction - Overview]]"
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Marginal vs Conditional Coverage]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Posterior Predictive Checking]]"
  - "[[Cross Validation Checking]]"
  - "[[ABM Calibration Overview]]"
  - "[[History Matching for ABMs]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
  - "[[Uncertainty Calibration for Linear Solvers]]"
  - "[[Persona Mixture Calibration of LLM Agents]]"
  - "[[Asymptotics and Frequentist Connections]]"
related_questions:
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
aliases:
  - "Four meanings of calibration"
  - "What does calibrated mean"
  - "SBC vs conformal coverage vs forecast calibration vs ABM calibration"
---

# The vault uses "calibration" in at least four senses. What does each one guarantee, and what does it not?

> [!summary]
> Every use of "calibrated" in the vault is shorthand for a sentence with three blanks: *this object's stated uncertainty matches frequencies, **averaged over this reference distribution**, **assuming this***. [[Simulation-Based Calibration - Overview|SBC]] calibrates an *algorithm* over the prior predictive of an assumed model; [[Split Conformal Prediction and the Coverage Guarantee|conformal prediction]] calibrates a *prediction set* marginally over exchangeable draws, with a finite-sample theorem; [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)|forecast calibration]] is an *empirical property* of predictive distributions against real outcomes, with no theorem behind it; and [[ABM Calibration Overview|ABM]] and [[Persona Mixture Calibration of LLM Agents|LLM-persona]] "calibration" is a *verb* meaning parameter fitting, which guarantees no coverage of anything. None of the six senses implies another, all of the property senses are *necessary but not sufficient* (a prior-as-posterior passes SBC; a climatological forecast is calibrated; a useless model gives valid conformal sets), and only the conformal guarantee survives model misspecification.

## Answer

### The template: calibrated *of what*, *over what*, *assuming what*

| # | Sense | Object called "calibrated" | Reference distribution | What is guaranteed | What is **not** |
|---|---|---|---|---|---|
| 1 | Simulation-based calibration ([[Simulation-Based Calibration - Overview]]) | An inference **algorithm + implementation** for an assumed generative model | The Bayesian joint $\pi(\theta,y)$: truths from the prior, data from the likelihood | Exact computation $\Rightarrow$ rank of $f(\tilde\theta)$ is discrete-uniform on $\{0,\dots,L\}$ ([[Rank Statistics and Uniformity#^thm-uniformity\|Theorem 1]]); equivalently credible intervals have nominal coverage *on average over the prior* | Model adequacy; correctness *at the observed data*; informativeness (posterior = prior passes) |
| 2 | Conformal coverage ([[Split Conformal Prediction and the Coverage Guarantee]]) | A **prediction set** $\mathcal C(x)$ wrapped around any predictor | Calibration fold + test point, exchangeable | $1-\alpha\le\mathbb P(Y\in\mathcal C(X))\le 1-\alpha+\tfrac1{n+1}$, finite-sample, any model, any distribution | Coverage at a given $x$; coverage for *this* calibration set; small sets; anything under shift or serial dependence |
| 3 | Probabilistic (forecast) calibration ([[Probabilistic Forecasting - Overview]]) | A **predictive distribution** $F$ against realised outcomes | The empirical sequence of forecast situations | Nothing a priori — it is *checked* (PIT uniform, $\text{Coverage}(p)=p$) and *rewarded* by proper scores | Sharpness; joint/multi-step calibration; good parameter estimates |
| 4 | ABM parameter calibration ([[ABM Calibration Overview]]) | A **parameter vector** (or region, or ABC posterior) | None in general; for HM, the variance budget $V_s+V_o+V_m$ | GA/SA: a best-fit point. HM: the right parameter survives with probability $\ge0.95$ if the variances are right. HM+ABC: an approximate posterior | Uniqueness (equifinality); honest uncertainty for point methods; that the ABC posterior is itself calibrated in sense 1 |
| 5 | Solver uncertainty calibration ([[Uncertainty Calibration for Linear Solvers]]) | The **posterior covariance** of a probabilistic numerical method | Random projections $v$, or matrix elements | With $\omega$ from Rayleigh regression, standardised errors of $Av$ are $\approx\mathcal N(0,1)$; with $\omega\ge\max_{ij}[A]_{ij}$ a hard (loose) bound | Simultaneous calibration of every element — "no scalar $\omega$ (nor even a full spd $W_0$)" achieves it |
| 6 | LLM-population calibration ([[Persona Mixture Calibration of LLM Agents]]) | Simplex **mixture weights** over theory-grounded personas | Aggregate human choice shares on $G$ calibration tasks | A least-squares fit; empirically, out-of-sample MSE $0.094$ vs $0.182$ persona-less | Mechanism ("that inference is too strong"); uncertainty (point weights); individual-level heterogeneity; validity once agents interact |

### 1. SBC: is the *computation* self-consistent?

The foundation is a tautology of the joint distribution: averaging exact posteriors over data simulated from the prior predictive returns the prior,

$$
\pi(\theta)=\int \mathrm d\tilde y\,\mathrm d\tilde\theta\;\pi(\theta\mid\tilde y)\,\pi(\tilde y\mid\tilde\theta)\,\pi(\tilde\theta)
$$

([[Data-Averaged Posterior Self-Consistency]]). [[Rank Statistics and Uniformity]] turns this into an exact finite-sample test, requiring *independent* draws from the *exact* posterior and that "the model used to simulate the data is the same as the one used to fit it". Deviations are interpretable: $\cup$ = over-confident, $\cap$ = over-dispersed, slope = bias, and boundary spikes can be mere autocorrelation ([[Interpreting SBC Histograms]]).

What it does not deliver is stated bluntly in the SBI note:

> [!warning] SBC is a consistency check ([[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)#^warn-sbc-limits]])
> "If the approximate posterior were the prior, a calibration test as described above would not be able to detect this." Calibration is necessary, not sufficient: pair it with a measure of **sharpness** (posterior contraction) or averaged NLTP. And "none of these diagnostics address the issues encountered if the model is misspecified."

Two further limits. SBC is an *average over the prior*: [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] tabulates VSBC as blind to "failures specific to the realized data", with PSIS $\hat k$ the complementary check *at* the observed data; and because full uniformity is a test VI "will essentially always fail", VSBC weakens it to *symmetry* — calibration of the centre only. Per-$\theta$ frequentist coverage is different again: [[Asymptotics and Frequentist Connections]] gives it only asymptotically, and not for underidentified, boundary, multimodal or growing-dimension models — a fair description of most ABMs and many MMMs.

### 2. Conformal: a *theorem* about marginal coverage

Conformal prediction does not check calibration; it *constructs* it. Thresholding at the $\lceil(n+1)(1-\alpha)\rceil$-th smallest calibration score gives [[Split Conformal Prediction and the Coverage Guarantee#^thm-split-coverage|the split-conformal coverage theorem]] with **no** assumption on the model: "a useless model yields valid but uninformative (huge) sets". This is the only sense in the vault that is robust to misspecification.

The fine print is about what is averaged over ([[Marginal vs Conditional Coverage]]): marginal coverage is guaranteed; *training-conditional* coverage is random, $\mathrm{Beta}(n+1-l,\,l)$ — "typically between .88 and .92" for $\alpha=0.1$, $n=1000$; group-conditional coverage needs per-group calibration; object-conditional coverage is **impossible** distribution-free. The worked example — 96% coverage for retail customers, 36% for wholesale, 90% overall — is what a marginal guarantee permits. It is "broken by: time-series dependence, covariate shift, label shift, tuning the model on the calibration fold"; under drift only the bound $1-\alpha-2\sum_i\tilde w_i\epsilon_i$ remains ([[Conformal Prediction - Overview#^thm-drift]]).

### 3. Forecast calibration: an empirical property, scored not proved

Gneiting & Raftery define calibration as "the statistical consistency between the distributional forecasts and the observations" and sharpness as "a property of the forecasts only"; the goal is to "maximize the sharpness of the predictive distributions subject to calibration" ([[Probabilistic Forecasting - Overview]]). Nothing guarantees it. It is **diagnosed** by the PIT — "a 90% predictive interval should contain 90% of the observations" generalised to all levels ([[Posterior Predictive Checking]]) — or by the coverage curve, and **rewarded** jointly with sharpness by a [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)|strictly proper score]].

What it does not give:
- **Sharpness.** "A climatological (unconditional) forecast is calibrated by construction but not sharp." Three 95% intervals with ≈95% coverage scored $4.77$, $5.32$, $8.04$ on the interval score — "coverage alone cannot separate them; width alone prefers the wrong one". Improper scores actively destroy calibration (optimal spread inflation $r=0.05$ under the linear score vs $1.62$–$2.41$ under proper ones).
- **Joint calibration.** DeepAR's shuffled-sample experiment: "marginals can be perfectly calibrated while 9-step sums are not" ([[Forecast Evaluation and Backtesting]]).
- **An honest check, unless data are split.** Posterior PIT "would falsely claim miscalibration" for the flexible nabiximols model ($p=0.000$; LOO-PIT $p=0.28$) and "can also overlook miscalibration" ([[Cross Validation Checking]]). For ordered data even LOO leaks; use a rolling origin.
- **Correct inference.** "A model with poor predictive calibration may still yield correct estimates and support good decisions."

### 4 and 6. "Calibration" as a verb: fitting simulator parameters

In [[ABM Calibration Overview]], calibration is "adjusting model parameters so that the model's outputs match observed real-world data" — what a statistician calls *estimation*. GA, simulated annealing and controlled experimentation return a point with "no uncertainty quantification"; equifinality means "no unique solution exists". The one probabilistic statement in this family is [[History Matching for ABMs#^implausibility-score|the implausibility cut-off]]: by Pukelsheim's $3\sigma$ rule the correct parameter has $I^r(x)<3$ with probability $\ge0.95$ — but HM "makes no probabilistic statements about parameters", and the bound is only as good as $V_s$, $V_o$, $V_m$ ([[Uncertainty Quantification for ABM Calibration]]). Model discrepancy "cannot be reduced by better calibration". HM+ABC does return a posterior — slightly narrower 95% CIs than ABC alone, "trades coverage for precision" — but whether that posterior is *calibrated in sense 1* is a separate question the ABM notes never ask.

[[Persona Mixture Calibration of LLM Agents]] is "the low-dimensional, linear special case": a convex program for shares $\hat w$. Its evidence is out-of-sample MSE, not coverage; the note's caveats list non-identification when personas do not separate on the tasks, no uncertainty, and loss of linearity once agents interact.

### 5. Solver calibration: making a *numerical* error bar honest

[[Uncertainty Calibration for Linear Solvers]] starts from a CG posterior whose mean is excellent and whose naive covariance collapses to zero. Calibration means choosing the null-space scale $\omega$ so the posterior standard deviation tracks the true error: a property sense (like 1–3) reached by a fitting step (like 4). The hard bound is loose for the off-diagonal majority; the Rayleigh-regression average "gives no guarantee" and can under-estimate diagonal errors by $>10\times$. "Calibration is thus a deliberate choice between conservative bounds and realistic average error."

### What is the same idea, and what only looks similar

**Genuinely the same.** Senses 1, 2 and 3 are one construction — *the rank (or PIT) of the truth inside the stated uncertainty is uniform*. The vault says so: SBC's histogram reading "mirrors the forecast-calibration literature (Anderson 1996; Hamill 2001)", and the conformal proof is "the rank of the test score [is] uniform on $\{1,\dots,n+1\}$". The $\cup$/$\cap$/slope vocabulary transfers across SBC histograms, VSBC and PIT-ECDFs, and sense 5's standardised $z$-scores are the Gaussian version. *Synthesis:* what differs is only the ensemble. In SBC the "truth" is a simulated $\tilde\theta$ and the ensemble is the model's own prior predictive, so a pass certifies the *computation* and says nothing about the world. In PIT the truth is an observed $y$, so a pass is evidence about *model plus computation* in the visited regime. In conformal the ensemble is real exchangeable data and uniformity is *forced* by construction, so it needs no check but says nothing about parameters.

**Only looks similar.** Senses 4 and 6 are estimation, and their output is an *input* to the property senses: "we calibrated the ABM" and "the ABM's posterior is calibrated" are unrelated claims. "Coverage" also splits: prior-averaged coverage of credible intervals *for $\theta$* (sense 1), marginal coverage of prediction sets *for $y$* (sense 2), empirical coverage on a backtest (sense 3). None is per-$\theta$ frequentist coverage.

**The common failure mode.** Every property sense is satisfiable trivially — prior-as-posterior, infinite conformal set, climatology, $\omega=\operatorname{tr}A$ — so each needs a sharpness partner: posterior contraction, set size / SSC, a proper score, the average-scale $\omega$.

### Decision rule

1. *Did I write the sampler, VI or neural posterior myself, or is the geometry hard?* → SBC (sense 1) with data size and design held fixed; add $\hat k$ at the observed data. A pass licenses the computation only.
2. *Do my predictive intervals match reality?* → LOO-PIT, or rolling-origin coverage curves plus CRPS/WQL for time series (sense 3). Check the *aggregate you will report* (cumulative sums), not just marginals.
3. *Does a decision need a guaranteed error rate and I distrust the model?* → conformal wrapper (sense 2), if calibration and deployment points are exchangeable or reweightable; report FSC/SSC.
4. *Am I fitting a simulator?* → say "estimate". Use HM+ABC or neural SBI rather than GA, then return to steps 1–2.
5. *Anyone says "calibrated"* → ask for the three blanks.

### Practical Implications

- **Bayesian MMM.** Run SBC once per model *structure*, with the real spend design held fixed. If production uses ADVI, the VI note's rule applies: "never infer interval quality from good out-of-sample prediction" — held-out lpd *improved* while the posterior approximation degraded. Sense 3 on holdout weeks says nothing about whether the ROI posterior is right: predictive calibration does not identify causal parameters. "Calibrating the MMM to lift tests" is sense 4 (constraining parameters with external data); see [[Q - Using Experiment Results as Priors in a Bayesian MMM]].
- **Geo experiments.** The effect interval from TBR/BSTS *is* a forecast interval, so its credibility is sense 3: placebo backtests over pseudo-intervention dates, checking "whether the 90% interval for the **cumulative sum** covers the truth" ([[Forecast Evaluation and Backtesting]]). Vanilla split conformal is not justified on weekly series.
- **ABMs.** Keep the chain explicit: *calibrate* (sense 4) with a method that yields a posterior → *SBC* the inference (sense 1; cheap only if amortised, since it needs "inference for hundreds of $x_o$") → *check where the real $x_o$ falls* in the simulated summaries, because every diagnostic is blind to simulator misspecification → *posterior predictive / held-out pattern* validation (sense 3). HM's $V_m$ is the only place discrepancy enters; do not let it be zero by default.
- **LLM agents.** Persona weights fitted to aggregate shares are point estimates; the note's suggested Dirichlet–binomial version would make them eligible for senses 1 and 3.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Simulation-Based Calibration - Overview]] | Computational calibration defined; SBC vs PPC |
| [[Data-Averaged Posterior Self-Consistency]] | The identity SBC tests |
| [[Rank Statistics and Uniformity]] | Theorem 1 and its conditions |
| [[Interpreting SBC Histograms]] | Shape vocabulary; forecast-calibration lineage |
| [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] | What SBC cannot see; sharpness; misspecification |
| [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] | Prior-averaged vs observed-data diagnostics |
| [[Conformal Prediction - Overview]] | Distribution-free definition; drift theorem; MMM caveat |
| [[Split Conformal Prediction and the Coverage Guarantee]] | Coverage theorem, Beta law, assumptions |
| [[Marginal vs Conditional Coverage]] | Four notions of coverage; impossibility; FSC/SSC |
| [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] | Propriety; improper-score and interval-score examples |
| [[Probabilistic Forecasting - Overview]] | Calibration and sharpness defined |
| [[Forecast Evaluation and Backtesting]] | Coverage curve; span sums; geo placebo backtest |
| [[Posterior Predictive Checking]] | PIT; "calibration is not the ultimate goal" |
| [[Cross Validation Checking]] | PIT vs LOO-PIT double-use artefact |
| [[ABM Calibration Overview]] | Calibration as parameter search; equifinality |
| [[History Matching for ABMs]] | Implausibility and the $3\sigma$ rule |
| [[Uncertainty Quantification for ABM Calibration]] | The variance budget HM depends on |
| [[Uncertainty Calibration for Linear Solvers]] | Hard bound vs average-case $\omega$ |
| [[Persona Mixture Calibration of LLM Agents]] | Mixture-weight fitting and its caveats |
| [[Asymptotics and Frequentist Connections]] | When credible intervals gain frequentist coverage |

## Related Concepts

- [[The SBC Algorithm]] and [[SBC Case Studies]] — procedure and worked failures behind sense 1.
- [[Conformalized Quantile Regression]] — the sharpness partner for conformal coverage.
- [[HM-ABC Calibration Framework]] — the posterior-producing form of sense 4.
- [[Validity, Bias and Calibration of LLM-Simulated Populations]] — where persona calibration sits among validity remedies.
- [[Q - Exchangeability and What Replaces It When It Fails]] — the assumption behind sense 2 and behind LOO-PIT.
- [[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]] — sense 4 in depth.

## Gaps

- **No note on recalibration methods** (isotonic/Platt/temperature scaling, expected calibration error); PAV plots appear only as a diagnostic in [[Posterior Predictive Checking]].
- **No dedicated note on calibrating an MMM to experiments** — arguably the owner's most frequent use of the word; only a one-line pointer in [[Geo-Experiment Methodology - Overview]].
- **Expected-coverage tests for SBI** are flagged by the SBI diagnostics note as "a later literature not among this cluster's sources"; nothing on SBC under misspecification.
- **Kennedy–O'Hagan calibration of computer models** (a GP discrepancy term) is absent; the ABM notes treat discrepancy only as a variance $V_m$.
- **Conformal for time series** stops at the drift bound.
- [[Asymptotics and Frequentist Connections]] (375 words) is the vault's only treatment of frequentist coverage of Bayesian intervals.

## Follow-Up Questions

- For an HM+ABC posterior, what does an SBC run look like, and does the tolerance $\varepsilon$ show up as a $\cap$-shaped histogram?
- Can "conformalizing Bayes" give an MMM's weekly predictive intervals a drift-bounded guarantee, and how large is $\sum_i\tilde w_i\epsilon_i$ on real media data?
- After lift tests calibrate an MMM (sense 4), how should it be checked in senses 1 and 3 without reusing those tests?
