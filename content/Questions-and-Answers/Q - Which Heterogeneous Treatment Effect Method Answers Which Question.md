---
title: "Q: S-, T-, X- and R-learners, causal forests / GRF, BART and Bayesian causal forests, moderation analysis, hierarchical models and conformal ITE intervals all address heterogeneous treatment effects. Which question does each actually answer, and what does its uncertainty interval mean?"
tags:
  - type/qa
  - topic/treatment-effects
  - topic/causal-inference
  - topic/machine-learning
  - topic/uncertainty-quantification
  - topic/conformal-prediction
date_asked: 2026-09-18
answered_from:
  - "[[Causal Estimands]]"
  - "[[Metalearners for CATE]]"
  - "[[S-Learner]]"
  - "[[T-Learner and Minimax Rate]]"
  - "[[X-Learner]]"
  - "[[Metalearner Simulation Results]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
  - "[[Honest Trees and Causal Forests]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
  - "[[Asymptotic Normality and Inference for Forests]]"
  - "[[Nonparametric Causal Inference]]"
  - "[[Bayesian Outcome Models]]"
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Moderation Analysis]]"
  - "[[Hierarchical Models]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Marginal vs Conditional Coverage]]"
  - "[[Local Average Treatment Effects]]"
  - "[[Group-Time Average Treatment Effects]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
related_questions:
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - CATE vs ITE vs subgroup ATE
  - which HTE method should I use
  - confidence vs credible vs prediction interval for treatment effects
---

# S-, T-, X- and R-learners, causal forests / GRF, BART and Bayesian causal forests, moderation analysis, hierarchical models and conformal ITE intervals all address heterogeneous treatment effects. Which question does each actually answer, and what does its uncertainty interval mean?

> [!summary]
> Almost every method on the list estimates the same object — the **CATE** $\tau(x)=\mathbb E[Y(1)-Y(0)\mid X=x]$, an *average* over everyone sharing $x$ — and they differ in how they regularise it and in whether the interval they print has any guarantee. Moderation analysis and hierarchical models answer a narrower question, a **subgroup ATE** along one pre-specified moderator or grouping; LATE and $ATT(g,t)$ are subgroup effects defined by compliance type or cohort rather than by covariates. Only conformal ITE intervals (and, under its model, BART's posterior predictive) address the **ITE** $\tau_i=Y_i(1)-Y_i(0)$. Correspondingly there are three kinds of interval: a **confidence interval** for the fixed function value $\tau(x)$ (causal forests; pointwise, asymptotic), a **credible interval** conditional on a prior and outcome model (BART/BCF, moderation, hierarchical), and a **prediction interval** for a random variable, with marginal coverage that does not shrink to zero with $n$ (conformal). For marketing targeting the CATE is the right target; ITE intervals are for "could this unit be harmed?" questions.

## Answer

### 1. Three estimands that are routinely conflated

[[Causal Estimands]] defines them:

- **ITE** $\tau_i\equiv Y_i(1)-Y_i(0)$ ([[Causal Estimands#^def-ite]]) — never observed; a *random variable* even given $x$.
- **CATE** $\tau(x)\equiv\mu_1(x)-\mu_0(x)$ ([[Causal Estimands#^def-cate]]) — a fixed, unknown function. The note warns that ITE and CATE "are sometimes conflated in the literature."
- **Subgroup / averaged effects** — SATE, PATE, MATE ("most Bayesian causal inference in practice focuses on the MATE"), and effects for groups not defined by $x$ at all: principal causal effects $\tau_u$ by compliance stratum, the **LATE** for compliers ([[Local Average Treatment Effects]]), and cohort-time effects $ATT(g,t)=\mathbb E[Y_t(g)-Y_t(0)\mid G_g=1]$ ([[Group-Time Average Treatment Effects]]).

Lei & Candès' point, recorded in [[Conformal Inference for Counterfactuals and ITEs]]: "a drug that cures 70% of patients and harms 30% can have a positive CATE in every stratum." The CATE is still an average. And the ITE distribution is only partly learnable: "the joint law of $(Y(1),Y(0))$ is never identified."

### 2. Method by method

| Method | Question it answers | How it regularises; main failure | Interval and its meaning |
|---|---|---|---|
| [[S-Learner]] | CATE, $\hat\mu(x,1)-\hat\mu(x,0)$ from one model | Borrows strength across arms; treatment indicator shrunk toward zero (RF picks $W$ only $\approx1/(p+1)$ of the time) | None with theory; `hte` bootstrap CIs |
| [[T-Learner and Minimax Rate]] | CATE, $\hat\mu_1-\hat\mu_0$ from two models | Minimax when arms balanced and $a_0=a_\tau$; bottlenecked at $n^{-a_0}$ by the small arm; separate regularisation can push $\hat\tau$ away from 0 even when $\tau^*\equiv0$ | As above |
| [[X-Learner]] | CATE with **unbalanced arms** | Cross-imputes ITEs, regresses them on $x$; rate $m^{-a_\tau}+n^{-a_0}$; not robust to $o(n^{-1/4})$ nuisance error | Bootstrap CIs that had "poor coverage in all scenarios" in Lei & Candès' simulation |
| [[R-Learner and Orthogonal CATE Estimation]] | CATE **under confounding**, as a function | Robinson residual-on-residual loss; quasi-oracle if nuisances are $o(n^{-1/4})$; the R-loss doubles as a **validation criterion** | **No pointwise intervals** ("forests add pointwise CIs, which the R-learner does not provide") |
| Causal forest / GRF ([[Honest Trees and Causal Forests]], [[Generalized Random Forests - Local Moment Equations]]) | CATE **at a point $x$**; also conditional average *partial* effects for continuous $W$ and conditional LATE (instrumental forest) | Honest, subsampled adaptive nearest-neighbour matching; local centering for confounding | **Frequentist CI**: $\hat\tau(x)\pm1.96\hat\sigma_n(x)$, asymptotically normal and centred ([[Asymptotic Normality and Inference for Forests]]) — *pointwise*, not a band |
| BART / BCF ([[Nonparametric Causal Inference]], [[Bayesian Outcome Models]]) | Posterior over the response surface $\mu(z,x)$, hence over CATE, ATE, ATT — and, via the posterior predictive, the ITE | Tree-ensemble prior; BCF splits $\mu(z,x)=g_1(x)+g_2(x)z$ with separate priors and $\hat e(x)$ fed to $g_1$; regularization-induced confounding; overconfident under poor overlap | **Credible interval** — probability statement given prior + outcome model |
| [[Moderation Analysis]] | "Does the slope of $x$ on $y$ change with *this* moderator $m$?" $f(m)=\beta_1+\beta_2m$ | Parametric, linear in one moderator; posterior on $\beta_2$; spotlight plot | Credible interval for $\beta_2$ and $f(m)$ |
| [[Hierarchical Models]] | "What is the effect in group $j$, borrowing strength from the others?" | Partial pooling $\theta_j\sim\mathcal N(\mu,\tau^2)$, penalty strength learned from data; boundary problems when $J<5$ | Credible interval for $\theta_j$, conditional on exchangeability |
| Conformal ITE ([[Conformal Inference for Counterfactuals and ITEs]]) | "Where does *this unit's* $Y(1)-Y(0)$ plausibly lie?" | Weighted split-CQR with propensity weights; any quantile learner | **Prediction interval**, $\mathbb P(\tau_i\in\hat C(X))\ge1-\alpha$ marginally; finite-sample exact when $e(x)$ is known |

Two details worth keeping from the source notes. First, the forest's honesty requirement — each $Y_i$ is used "*either* to place splits *or* to estimate the within-leaf effect, never both" — exists precisely because greedy splitting "preferentially selects differences inflated by noise … (a winner's-curse effect)." Second, the GRF moment framework is the only item on the list that handles **continuous treatments** ("spend, price, dose … covered as-is") and **instruments** in one estimator.

### 3. What the intervals mean

**Confidence interval (forests).** A statement about the fixed number $\tau(x)$ under repeated sampling, valid if (i) normality, (ii) "bias negligible relative to its standard deviation", (iii) consistent $\hat\sigma$. It holds only in a window $s_n\asymp n^\beta$, $\beta_{\min}<\beta<1$, with $\beta_{\min}\approx0.935$ at $d=2$ and $0.986$ at $d=10$ — so the rate $n^{-(1-\beta)/2}$ is slow. "In practice coverage fails through **bias**, not variance": coverage fell from $0.95$ to $0.85$ as $d$ went from 2 to 30, and to $0.73$ with a sharp spike in $\tau$. The guarantee is **pointwise**; "scanning for the subgroup with the largest $\hat\tau(x)$ reintroduces a multiple-comparisons problem."

**Credible interval (BART/BCF, moderation, hierarchical).** $\Pr(\tau(x)\in I\mid\text{data, prior, outcome model})$. It propagates to any functional for free ("these estimates come with full posterior distributions"), but has no frequentist guarantee: forest theorems do not cover it, and in Lei & Candès' table BART "theoretically" covers both CATE and ITE yet empirically fails with correlated covariates and heteroscedastic errors. Example 4.1 of [[Bayesian Outcome Models]] shows *why*: BART's interval width "remains similar regardless of overlap." For hierarchical models the interval is honest about multiplicity in a way the others are not — shrinkage toward $\mu$ is a data-adaptive multiple-comparisons correction ([[Partial Pooling as Multiple Comparisons Correction]]).

**Prediction interval (conformal).** A statement about a *random variable*, so its width has a floor set by irreducible outcome noise — with 200 geos "the intervals will be wide — the honest price of an individual-level claim." Coverage is **marginal**: [[Marginal vs Conditional Coverage]] shows a 90% set can cover 96% of retail and 36% of wholesale customers, and that distribution-free *conditional* coverage forces infinite-length intervals. Conditional validity is "a *model-dependent bonus*" obtained when quantiles are consistent; exact group-level coverage needs per-group calibration.

**How they nest.** "Prediction intervals typically contain confidence intervals for the mean": weighted CQR, not designed for it, covered the CATE conservatively in every scenario, whereas reading a CATE interval as an ITE interval is exactly the "potential danger" the paper's simulation was built to display. Simultaneous (uniform) bands exist in the vault only for $ATT(g,t)$ ([[Simultaneous Inference via Multiplier Bootstrap]]); "forests currently offer only pointwise intervals."

### 4. Same idea, or only similar?

**Genuinely the same.**
- BART-as-S-learner *is* the S-learner, and per-arm BART *is* the T-learner — [[Bayesian Outcome Models]] says so explicitly. A linear moderation model $\mu=\beta_0+\beta_1x+\beta_2xm+\beta_3m$ is the linear S-learner with one interaction ("$\mu(z,x)=x+z+xz$ … equivalent to fitting a linear regression in each group").
- A locally-centred causal forest *is* the R-learner with a forest kernel: $\hat\tau(x)=\arg\min_\tau\sum_i\alpha_i(x)(\tilde Y_i-\tau\tilde W_i)^2$.
- *Synthesis:* BCF's $g_1(x)+g_2(x)z$ with its own prior on $g_2$ and $\hat e(x)$ inside $g_1$ is the Bayesian counterpart of the R-learner's separation of "eliminate spurious effects" from "express $\tau^*(\cdot)$" — the R-learner note itself points to separate shrinkage priors on $\tau$-coefficients as the Bayesian analogue. Both are cures for the S-learner's shrink-the-treatment-to-zero problem.
- *Synthesis:* a hierarchical model over segments is a CATE estimator for a categorical $x$ with **partial pooling**; an honest forest leaf is the **no-pooling** local average. The precision-weighted formula ([[Hierarchical Models#^partial-pooling-formula]]) is what forests lack when leaves are small.

**Only similar.**
- A 95% CI for $\tau(x)$ and a 95% PI for $\tau_i$ share a format and nothing else.
- LATE heterogeneity is across *latent compliance types* — "different instruments identify different complier populations" — not across $x$. $ATT(g,t)$ heterogeneity is across *cohorts and time*. Neither is a CATE, though an instrumental forest estimates a LATE *conditional on* $x$.
- A credible interval for group $j$ and group-balanced conformal coverage in group $j$ answer different questions: one is about the group's mean effect under a model, the other about outcome coverage without one.
- The moderation note is careful that moderation is not mediation; it is also not causal unless $x$ is randomised or unconfounded — the note itself makes no identification claim.

### Practical Implications

*Synthesis, for media and ad experiments:*

1. **Targeting is a CATE problem.** A rule "treat segment $x$" can only act on $x$, so its value depends on $\tau(x)$ net of cost, not on unit-level noise. The voter-mailer example in [[Metalearner Simulation Results]] is the template: the CATE distribution was bimodal, and mailing habitual voters was *counterproductive*. Rank uplift models by held-out **R-loss**, the vault's only validation criterion for CATE.
2. **Pick the learner by design.**
   - Randomised, small holdout (unbalanced arms) → X-learner, or S-learner if the effect is near-constant.
   - Randomised, balanced, complex CATE → T-learner.
   - Observational exposure (targeted delivery) → R-learner or locally-centred GRF; S/T/X are exposed to regularisation bias.
   - Continuous spend → GRF conditional average partial effect.
   - Assigned-but-not-delivered ads → instrumental forest; the answer is for *compliers*, i.e. reachable users.
3. **Pick the interval by claim.**
   - "Segment $x$ has positive lift" → forest CI, low-dimensional $x$ (coverage degrades past $d\approx10$), pre-specified points.
   - "These 12 geos / 8 segments differ" → hierarchical model; report shrunken $\theta_j$ and expect fewer sign and magnitude errors.
   - "One hypothesised moderator (tenure, prior spend)" → moderation model.
   - "Which treated geos plausibly had positive lift?" or "could this customer be harmed?" → conformal ITE; exact with design propensities.
   - "Average effect in a pre-declared subgroup, with a CI" → cross-fit AIPW on that subgroup ([[DML Estimators for ATE and the Interactive Model]]), "rather than averaging $\hat\tau$."
   - Staggered roll-outs → $ATT(g,t)$ with simultaneous bands.
4. **Budget for power.** With $\sigma_n^2\approx s/n$, "detecting heterogeneity requires far larger samples than detecting an average effect."
5. **Do not pick winners from the same data.** Honesty, partial pooling and pre-specification are three answers to the same winner's curse.
6. **ABMs.** A fitted CATE surface is a data-driven source of agent heterogeneity ([[Heterogeneity in Agent Models]]), but it supplies only the *mean* response by $x$. The within-$x$ spread of individual responses is not identified, so that part of an agent population remains an assumption.
7. **Bayesian MMM.** Geo- or brand-level response parameters are subgroup effects with credible intervals; their validity rests on the outcome model and on exchangeability of geos, not on any coverage theorem.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Causal Estimands]] | ITE, CATE, SATE/PATE/MATE, principal effects |
| [[Metalearners for CATE]], [[S-Learner]], [[T-Learner and Minimax Rate]], [[X-Learner]] | Algorithms, rates, failure modes |
| [[Metalearner Simulation Results]] | Rule of thumb by balance/complexity; voter-turnout targeting example |
| [[R-Learner and Orthogonal CATE Estimation]] | Quasi-oracle CATE under confounding; R-loss validation; no CIs |
| [[Honest Trees and Causal Forests]] | Honesty, propensity trees, coverage simulations |
| [[Generalized Random Forests - Local Moment Equations]] | Local centering; continuous treatments; instrumental forests |
| [[Asymptotic Normality and Inference for Forests]] | Meaning and limits of forest CIs; $\beta_{\min}$; pointwise caveat |
| [[Nonparametric Causal Inference]], [[Bayesian Outcome Models]], [[Propensity Score in Bayesian CI]] | BART/BCF, credible intervals, overlap and regularization-induced confounding |
| [[Moderation Analysis]] | Interaction-term model and spotlight plot |
| [[Hierarchical Models]] | Partial pooling for group-level effects |
| [[Conformal Inference for Counterfactuals and ITEs]] | ITE prediction intervals; CATE-vs-ITE coverage table |
| [[Marginal vs Conditional Coverage]] | What a marginal guarantee does and does not say |
| [[Local Average Treatment Effects]], [[Group-Time Average Treatment Effects]] | Subgroup effects not defined by covariates |
| [[DML Estimators for ATE and the Interactive Model]] | CI for an average or subgroup-average effect |
| Lei Candes 2020 - Conformal Inference of Counterfactuals and ITEs | Sec. 3.6 simulation table |
| Wager Athey 2018 - Heterogeneous Treatment Effects using Random Forests | Theorems 1, 11; §5 Tables 1–3 |
| Nie Wager 2021 - Quasi-Oracle Estimation of Heterogeneous Treatment Effects | §4–6 |

## Related Concepts

- [[Partial Pooling as Multiple Comparisons Correction]] — why hierarchical intervals are multiplicity-aware
- [[Type S and Type M Errors]] — the error framing for noisy subgroup effects
- [[Multiple Testing Corrections]] — what scanning forest CIs for the best segment requires
- [[Simultaneous Inference via Multiplier Bootstrap]] — uniform bands, available for $ATT(g,t)$ only
- [[Conformalized Quantile Regression]] — the score behind ITE intervals
- [[Common Support and Overlap]] — every method degrades where one arm is absent; only conformal says so explicitly
- [[Instrumental Variables and Principal Stratification]] — Bayesian treatment of complier effects
- [[ROAS, mROAS, and Optimal Media Mix]] — budget rules that consume $\hat\tau(x)$
- [[Q - The Common Structure of Doubly-Robust Estimators]] — why the X-learner is not doubly robust and the R-learner is orthogonal
- [[Q - Partial Pooling Across Statistics and ML and When It Hurts]] — pooling versus local averaging

## Gaps

- **No uplift-evaluation or policy-learning notes**: Qini/uplift curves, policy value and off-policy evaluation of a targeting rule are absent; the R-loss is the only CATE validation tool.
- **No DR-learner**, and no dedicated BCF note (BCF is two paragraphs inside [[Bayesian Outcome Models]]).
- **No simultaneous inference for CATE functions**, and no note on honest post-selection inference for "best subgroup" claims.
- **Frequentist calibration of Bayesian HTE intervals** is covered only by Lei & Candès' simulation; nothing on when BART/BCF credible intervals do attain coverage.
- **Hierarchical models for experimental HTE** (multilevel regression with treatment-by-group slopes, many crossed groupings) are covered only through eight schools and a pointer to [[Hierarchical Linear Models]].
- **Partial identification of the ITE distribution** (bounds on the share harmed) is missing; the vault records only that the joint law is unidentified.
- [[Moderation Analysis]] is not written causally; its link to the CATE is asserted here, not in the note.

## Follow-Up Questions

- How should a targeting rule learned from $\hat\tau(x)$ be evaluated on held-out experimental data, and what is its confidence interval?
- When do BCF credible intervals achieve frequentist coverage for $\tau(x)$, and does feeding in $\hat e(x)$ help under weak overlap?
- Can group-balanced conformal calibration and hierarchical partial pooling be combined to get per-segment ITE intervals with small segments?
- How much larger must a geo experiment be to detect a given spread in geo-level effects than to detect the average lift?
