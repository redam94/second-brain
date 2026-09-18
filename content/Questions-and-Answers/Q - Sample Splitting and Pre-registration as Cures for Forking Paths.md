---
title: "Q: Are pre-registration, multiplicity control, hierarchical partial pooling, cross-fitting, honest trees and train/calibration splits all the same cure for the garden of forking paths?"
tags:
  - type/qa
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/machine-learning
  - topic/causal-inference
  - topic/bayesian-workflow
date_asked: 2026-09-18
answered_from:
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Prediction vs Postdiction]]"
  - "[[Pre-analysis Plans and the Open Science Ecosystem]]"
  - "[[Limits and Objections to Pre-registration]]"
  - "[[Multiple Testing Corrections]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[Regularization Bias and the Partially Linear Model]]"
  - "[[Honest Trees and Causal Forests]]"
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Pre-Trend Testing and Its Pitfalls]]"
  - "[[The Peeking Problem and Optional Stopping]]"
  - "[[Always-Valid p-values and the mSPRT]]"
  - "[[Model Selection and Overfitting]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Synthetic Control Requirements]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
related_questions:
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
aliases:
  - Is sample splitting the same idea as pre-registration
  - Keeping selection data independent of evaluation data
  - Three cures for data-contingent analysis
---

# Are pre-registration, multiplicity control, hierarchical partial pooling, cross-fitting, honest trees and train/calibration splits all the same cure for the garden of forking paths?

> [!summary]
> No — they are three different cures for one disease. The disease is $T(y;\phi(y))$: the analysis $\phi$ was chosen by the data that then evaluate it. **Cure A (separate)** makes the choosing data independent of the evaluating data: pre-registration does it in *time*, sealed hold-outs, cross-fitting, honest trees, split-conformal calibration folds and rolling-origin backtests do it by *partition*. These six really are one idea. **Cure B (pay)** keeps the dependence but charges for it: Bonferroni/BH, alpha-spending and always-valid $p$-values enlarge the reference set to every path that could have been taken. **Cure C (dissolve)** removes the choice: partial pooling, model expansion and stacking estimate all the paths jointly. They fix different symptoms, fail under different conditions, and only A and C repair the exaggerated estimate as well as the error rate.

## Answer

### The disease, in Gelman and Loken's notation

[[Garden of Forking Paths]] distinguishes a pre-specified test $T(y;\phi)$ from a data-contingent one $T(y;\phi(y))$ and from explicit fishing $T(y;\phi^{\text{best}}(y))$. The $p$-value's sampling distribution assumes "repetition of the same procedure", but "if the procedure itself changes with the data … the standard sampling distribution is wrong" ([[Forking Paths and Bayesian Approaches]]). [[Prediction vs Postdiction]] gives the same split in Nosek's vocabulary — *data-independent* versus *data-contingent* analysis — and names the circular case HARKing: "generating a hypothesis from observed data and then evaluating that hypothesis on the *same* data."

*Synthesis:* there are exactly three logical ways to make an inference about $T(y;\phi(y))$ honest again. Make $\phi$ independent of the $y$ it is applied to; keep the dependence but compute the reference distribution over all $\phi$ that might have been chosen; or stop choosing and analyse all $\phi$ at once.

### Cure A — separate the choosing data from the evaluating data

| Method | What does the choosing | What is evaluated | How independence is obtained | Are data recycled? | Note |
|---|---|---|---|---|---|
| Pre-registration | The researcher, before data exist | A planned test | **Time**: $\phi$ fixed before $y$ is seen; blinding | n/a | [[Prediction vs Postdiction]] |
| Sealed hold-out | The researcher, on the exploratory half | Registered models on the sealed half | Random partition + registration: "explore one half … **seal** the other half … then pre-register and unseal" | No | [[Pre-analysis Plans and the Open Science Ecosystem]] |
| Synthetic-control design lock-in | The analyst, on pre-intervention data | Post-period gap | Weights "fixed before outcomes"; "mimics the pre-analysis plan of a randomized trial" | No | [[Synthetic Control Requirements]] |
| Cross-fitting (DML) | An ML learner fitting nuisances $\hat\eta$ on $I_k^c$ | The orthogonal score on fold $I_k$ | Random $K$-fold partition; roles rotated | Yes — "the *full* sample size $N$ appears" | [[Cross-Fitting and Sample Splitting]] |
| Honest trees | The greedy splitting rule on half $\mathcal J$ | Leaf treatment effects on half $\mathcal I$ | Each $Y_i$ used to place splits *or* estimate, "never both" | Yes — subsampling "re-randomize[s] the $\mathcal I/\mathcal J$-data splits" | [[Honest Trees and Causal Forests#^def-honesty]] |
| Split conformal | Model fitting on $\mathcal I_1$ | Score quantile on calibration fold $\mathcal I_2$ | Score function "does not depend on the calibration or test data" | No (that is its statistical cost) | [[Split Conformal Prediction and the Coverage Guarantee#^alg-split-conformal]] |
| Rolling-origin backtest | Fitting and tuning on data up to $T$ | Proper scores on $T+1,\dots,T+H$ | Time ordering: only ever condition on the past | Yes, across origins | [[Forecast Evaluation and Backtesting]] |

These are genuinely the same idea, and the notes say so pairwise: honesty is "sample splitting at the tree level"; the Nosek hold-out is literally called "cross-validation"; rolling-origin is "the time-ordered counterpart" of LOO. In every row the proof has the same shape: *conditional on the choosing sample, the chosen object is a fixed function*, so the evaluating sample behaves as if the analysis had been pre-specified. For cross-fitting that is the one-line Chebyshev argument — the remainder "has mean zero and variance … $\to_P 0$", needing only consistency and no complexity restriction ([[Cross-Fitting and Sample Splitting#^thm-split-chebyshev]]). For honest trees, "conditional on the partition, the $\mathcal I$-sample leaf means are unbiased". For split conformal, "conditional on $\mathcal I_1$, the score function is a fixed measurable map", so ranks are uniform.

What differs is *who the forking agent is*: a motivated human with hindsight bias, or an algorithm. The winner's-curse mechanism is identical — a greedy tree "preferentially selects differences inflated by noise", exactly as a researcher scanning subgroups does. *Synthesis:* the algorithmic versions are pre-registration for learners.

> [!example] The contrived overfitter ([[Cross-Fitting and Sample Splitting]])
> Let $\hat g_0(X_i)=g_0(X_i)+(Y_i-g_0(X_i))/N^{1/2-\epsilon}$ in-sample. It converges at nearly the parametric rate — "excellent by any predictive yardstick" — yet without splitting the remainder grows like $N^{\epsilon}\to\infty$. Two-fold cross-fitting with the *same* learner removes the bias at no cost in spread. The chooser's predictive quality is irrelevant; only its independence from the evaluation sample matters.

### Cure B — keep the dependence, enlarge the reference set

[[Multiple Testing Corrections]] separate nothing. They accept that $m$ paths were (or could have been) walked and charge for it: $P(\text{at least one FP})=1-(1-\alpha)^m$, so test at $\alpha/m$ (Bonferroni), step down (Holm), or control the false-discovery proportion (BH). Peeking is the same disease along the time axis — "$\min_{n\le N}p_n\le\alpha$" is a union of events, ten looks give 0.203 rather than 0.05, and a patient peeker rejects with probability one ([[The Peeking Problem and Optional Stopping#^thm-foregone]]). The cure is again to pay: alpha-spending over planned looks, or an [[Always-Valid p-values and the mSPRT|always-valid $p$-value]] valid "at **every stopping time**", bought with intervals up to roughly twice the CLT width.

Cure B's weakness is that it needs the family to be *enumerable*. [[Prediction vs Postdiction]] is blunt: correcting for the literal number of tests "still does not capture how *observing the data* steers which tests get run … the effective number of comparisons is unknowable." It also "adjust[s] *thresholds* but leave[s] *point estimates* unchanged" ([[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]), so the selected estimate is still exaggerated — the always-valid note concedes "the estimate at the stopping time is biased even though the error rate is controlled."

### Cure C — dissolve the choice

[[Multiple Comparisons - Bayesian Perspective]] reframes: "the real problem is not multiple testing but insufficient modeling of the relationships between parameters." A group-level distribution $\delta_j\sim\mathrm N(\mu,\sigma_\delta^2)$ shrinks every comparison's $z$-score by

$$
z_{\text{Bayes}}=z_{\text{classical}}\cdot\frac{1}{\sqrt{1+\sigma_{\bar y}^2/\sigma_\theta^2}}
$$

([[Partial Pooling as Multiple Comparisons Correction#^thm-zscore-shrinkage]]), adaptively: in the eight-schools simulation classical analysis finds a significant comparison in 47% of replications with 63% correct sign, the multilevel model in 5% with 89%. The Bayesian-workflow version is the same move applied to models rather than groups: "when we might be selecting among a large set of possible models, we instead **embed these in a larger model**, **perform predictive model averaging**, or **use all of the models simultaneously**" — "rather than correcting inference for the selection, **avoid selecting**" ([[Model Selection and Overfitting]]). Regularizing priors ([[Overfitting and Information Criteria]]) belong here too.

Cure C involves no independence at all; it uses *every* datum for *every* estimate. Its reach is limited to forks that can be written as parameters of one model over an exchangeable family — subgroups, sites, channels, outcomes, candidate models — and it says nothing about exclusion rules, outcome definitions or stopping. The workflow note admits a case it cannot rescue: the 99%-Biden forecast, where an implausible output triggered a bug hunt that otherwise would not have happened, and "model averaging would not resolve this problem."

### Side by side

| | A: separate | B: pay | C: dissolve |
|---|---|---|---|
| Restores | Validity of the evaluation as if pre-specified | Error rate over the family | Coherent joint estimates |
| Fixes winner's-curse / Type M? | Yes (fresh data are unbiased) | No | Yes (shrinkage) |
| Needs the family of paths enumerated? | No | Yes | Yes (as a model) |
| Price | Data (unless rotated), flexibility | Power, wider intervals | A defensible exchangeability/model assumption |
| Handles human forks (exclusions, outcome choice)? | Yes | Poorly | No |
| Handles many parallel comparisons? | No — "with correction for the planned tests" still required | Yes | Yes |

### Where the unifying idea is necessary but not sufficient

1. **Disjoint is not independent.** A pre-trend test gates a DiD on *pre-period* coefficients and evaluates *post-period* ones — different data — yet leads and lags are correlated through the shared reference period ($\rho=\sigma^2/2$). Conditioning on passing adds $\Sigma_{12}\Sigma_{22}^{-1}(\mathbb E[\hat\beta_{pre}\mid\text{pass}]-\beta_{pre})$; in the note's simulation bias rises from 0.87 to 1.21 ([[Pre-Trend Testing and Its Pitfalls#^thm-pretest-prop1]]), "a selection mechanism in the same family as publication bias and the 'garden of forking paths.'" Forecasting has the same trap: random $K$-fold leaks the future, and for global models a test window "must not overlap in calendar time" with other series' training windows.
2. **One split protects one layer of choice.** "Even if we use cross validation … the act of selecting the model with the best predictive performance leads again to double use of data" ([[Model Selection and Overfitting#^wrn-double-dipping]]). Hence "tune each nuisance learner by CV *within* $I_k^c$", and conformal is broken by "tuning the model on the calibration fold". The random partition is itself a fork, which is why DML reports the **median over $S$ splits** with a dispersion-inflated variance (up to 30% larger s.e. in the 401(k) data).
3. **Independence cures overfitting, not other biases.** Sample splitting "does **not** rescue the naive estimator" from regularization bias — that needs [[Neyman Orthogonality]] ([[Regularization Bias and the Partially Linear Model]]). Forest intervals are "honest about variance but not about smoothing bias"; conformal still needs exchangeability. And "bias can be preregistered", multiplicity persists across a research programme, and pre-registration makes poor practice "**detectable**", not impossible ([[Limits and Objections to Pre-registration]]).
4. **Bayes is not an exemption.** Posteriors ignore the stopping rule, but the frequentist error of "stop when $\mathbb P(\tau>0\mid\text{data})>0.95$" inflates exactly like peeking. And the workflow's counter-claim deserves equal billing: a model that "withstood … severe tests is, despite being the result of data-dependent iterative workflow, more trustworthy than a preregistered model that has not been tested at all."

### Practical Implications

**Decision rule — classify the fork, then pick the cure.**

1. *Is a human choosing after seeing outcomes* (KPI, exclusion rule, window, estimator)? Cure A in time: write it down first; if the data already exist, seal a hold-out.
2. *Is an algorithm choosing* (splits, nuisance fits, hyper-parameters, conformal scores)? Cure A by partition, one split per layer of choice, rotate folds, and check the folds are actually independent (time, geography, shared shocks).
3. *Are there many parallel estimates of the same kind* (channels, geos, segments, metrics)? Cure C; fall back to B when a contractual error rate is required.
4. *Is the choice when to stop?* Cure B along time (always-valid or group-sequential), or pre-commit the horizon.
5. *Is the choice among many similar-performing models?* Cure C (stack or expand); selection is "free" only when the loser would have had averaging weight zero.
6. *Never gate the analysis on a low-powered test computed from correlated data* (pre-trend checks, balance checks): report sensitivity instead.

For the owner's work:

- **MMM.** The adstock × saturation × control-set grid is explicit search. Hold out in *time* (rolling origin), tune inside each training window, and prefer stacking or one expanded hierarchical model across channels/geos to picking the best specification. Fix priors and the decision metric before seeing ROI posteriors.
- **Geo experiments.** Treat design as pre-registration: assignment, pretest/test/cooldown lengths, estimator (TBR, SDID, BSTS) and primary KPI locked before the test period, as the synthetic-control note recommends. Placebo backtests are legitimate choosers because they use only pre-period data; gating on "the pre-period lift chart is flat" is not. *Synthesis:* extending the cooldown because the cumulative effect "is still rising" is optional stopping.
- **User-level experiments.** Always-valid monitoring for stop decisions; partial pooling across segments and metrics rather than scanning for the significant one; honest forests (`honesty = TRUE`) for heterogeneity, with forest-discovered segments confirmed on fresh traffic.
- **Bayesian causal inference.** Cross-fit any ML nuisance and report across-split dispersion; "Bayesian" exempts neither a stop-on-posterior rule nor a specification search.
- **Agent-based models.** *Synthesis:* calibrate on one set of moments or periods and validate on held-out ones; choosing summary statistics after seeing which the model matches is HARKing for simulators.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]] | The disease: $T(y;\phi(y))$ and the combinatorics of analytic choices |
| [[Prediction vs Postdiction]], [[Pre-analysis Plans and the Open Science Ecosystem]], [[Limits and Objections to Pre-registration]] | Cure A in time; the sealed hold-out; what pre-registration does not fix |
| [[Cross-Fitting and Sample Splitting]], [[Regularization Bias and the Partially Linear Model]] | Cure A by partition; why splitting alone is insufficient |
| [[Honest Trees and Causal Forests]] | Honesty; winner's curse in split selection |
| [[Split Conformal Prediction and the Coverage Guarantee]] | Train/calibration split; what breaks the guarantee |
| [[Forecast Evaluation and Backtesting]], [[Synthetic Control Requirements]] | Time-ordered splitting, leakage; design lock-in on pre-period data |
| [[Multiple Testing Corrections]], [[The Peeking Problem and Optional Stopping]], [[Always-Valid p-values and the mSPRT]] | Cure B across hypotheses and across time |
| [[Multiple Comparisons - Bayesian Perspective]], [[Partial Pooling as Multiple Comparisons Correction]], [[Forking Paths and Bayesian Approaches]] | Cure C for families of comparisons |
| [[Model Selection and Overfitting]], [[Overfitting and Information Criteria]] | Cure C for families of models; double dipping; severe tests |
| [[Pre-Trend Testing and Its Pitfalls]] | Disjoint-but-dependent selection |
| [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] | Earlier Q&A on cures B and C for model search |

## Related Concepts

- [[Type S and Type M Errors]] — the exaggeration that cures A and C repair and cure B leaves alone
- [[Hierarchical Models]] — the exchangeability assumption cure C rests on
- [[Stacking and Predictive Model Averaging]] — using all models instead of selecting one
- [[Neyman Orthogonality]] — the companion ingredient splitting cannot replace
- [[Confidence Sequences]] — interval form of paying for optional stopping
- [[Honest DiD - Sensitivity to Parallel Trends Violations]] — sensitivity analysis instead of a gating pre-test
- [[Q - Does Peeking Matter for a Bayesian]] — the stopping-rule fork in depth
- [[Q - Partial Pooling Across Statistics and ML and When It Hurts]] — when cure C's exchangeability assumption fails
- [[Q - Exchangeability and What Replaces It When It Fails]] — the assumption behind both conformal splits and pooling

## Gaps

- No note on **formal post-selection / selective inference** (conditioning on the selection event); Taylor & Tibshirani and Berk et al. appear only as citations in [[Model Selection and Overfitting]]. This fourth cure is missing from the comparison.
- No coverage of **adaptive data analysis / the reusable hold-out**, nor of the **power cost** of a one-shot split versus rotation.
- The three-family taxonomy (separate / pay / dissolve) is synthesis; no vault note states it.
- Multiverse / specification-curve analysis has no dedicated note.
- ABM notes recommend checking "held-out patterns" but give no protocol for splitting moments or periods between calibration and validation.
- E-values and safe testing are not covered beyond the mSPRT.

## Follow-Up Questions

- How much power does a sealed 50/50 hold-out cost in a typical geo test, and when does rotation recover it without reintroducing dependence?
- Can conditional (selective) inference replace the gating pre-trend test in DiD-style geo analyses?
- What is a workable pre-analysis-plan template for a Bayesian MMM refresh, given that iterative model checking is part of the workflow?
