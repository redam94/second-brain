---
title: "Q: Multi-armed and contextual bandits, Bayesian optimisation, sequential Bayesian experimental design / deep adaptive design, dynamic treatment regimes with Q- and A-learning, switchback experiments and RLHF all choose actions from accumulating data. Laid out on one map, what is each optimizing, what is the state, and what feedback does it assume?"
tags:
  - type/qa
  - topic/multi-armed-bandits
  - topic/bayesian-experimental-design
  - topic/causal-inference
  - topic/online-experimentation
  - topic/large-language-models
  - topic/machine-learning
date_asked: 2026-09-18
answered_from:
  - "[[Multi-Armed Bandits and Thompson Sampling - Overview]]"
  - "[[Bernoulli Bandit and Thompson Sampling Algorithm]]"
  - "[[UCB and Greedy Algorithms for Bandits]]"
  - "[[Regret Bounds for Thompson Sampling]]"
  - "[[Contextual and Linear Bandits]]"
  - "[[Approximate Thompson Sampling and Practical Extensions]]"
  - "[[Bandit Models with Delayed and Censored Feedback]]"
  - "[[Bayesian Optimisation]]"
  - "[[Acquisition Functions]]"
  - "[[Value Loss and Entropy Search]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
  - "[[Dynamic Treatment Regimes Framework]]"
  - "[[Optimal Regime via Dynamic Programming]]"
  - "[[Q-learning]]"
  - "[[A-learning and Robustness]]"
  - "[[Time-Varying Treatments and G-computation]]"
  - "[[Switchback Experiment Design and Analysis]]"
  - "[[Confidence Sequences]]"
  - "[[RLHF and Instruction Tuning]]"
  - "[[Reward Modeling from Human Preferences]]"
  - "[[Tool Use and the Agent Loop]]"
  - "[[Open Challenges and Future Directions]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
related_questions:
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
aliases:
  - "Map of sequential decision methods"
  - "Bandits vs BO vs BED vs DTR vs RLHF"
  - "Sequential decision making taxonomy"
---

# A map of sequential decision methods, from bandits to RLHF

> [!summary]
> All of these methods run the same loop (model the history, act, observe, update) and differ on four things: the **objective** (cumulative regret, final value, information, policy value, or a valid estimate), whether the **state** is only the learner's *belief* or a *physical* state that actions change, whether data are gathered **online by the algorithm** or **logged offline by someone else**, and whether the **reward is observed, delayed, or itself estimated**. Bandits, BO and BED keep a fixed world and an epistemic state; dynamic treatment regimes and switchbacks exist because actions carry over; RLHF is a one-step contextual bandit whose reward is a fitted preference model. The first question for any media problem is therefore "does today's action change tomorrow's outcomes?", and the second is "who chose the actions in my data?".

## Answer

The earlier Q&A [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] established the three-way rule *learn → BED, optimize → BO, earn while learning → bandit* on a shared Bayesian surrogate. This note keeps that and adds the rows it lacked: dynamic treatment regimes, switchbacks and always-valid tests, delayed-feedback bandits, and RLHF.

### 1. The map

| Method | Optimizes | State | Horizon | Feedback assumed |
|---|---|---|---|---|
| **Multi-armed bandit** (TS, UCB) | Cumulative regret $\sum_t(\max_k\theta_k - \theta_{x_t})$, Bayesian or at fixed $\theta$ | None: $\theta$ "fixed over time"; only the posterior evolves | Long, many cheap pulls | Immediate reward of the played arm only |
| **Contextual / linear bandit** | Same regret, per context | Exogenous context $z_t$, "independent random", absorbed by augmenting the action | Long | Immediate; shared $\theta$ transfers across arms |
| **Delayed / censored bandit** | Regret, discounted by $\tau_{T-s}$ | None | Long | Conversion arrives after delay $D$ with *known* CDF; lost after window $m$ |
| **Bayesian optimisation** | Value loss $f(x_N)$ (EI, KG) or entropy of $x_*$ / $f(x_*)$ (ES, PES, MES) | None: $f$ fixed; belief = GP posterior | Short, expensive evaluations | Noisy evaluation of $f(x_n)$ |
| **Sequential BED** | Incremental EIG about $\theta$; no reward term | Belief $p(\theta\mid h_{t-1})$ | $T$ steps, greedy | Outcome $y_t \sim p(y\mid\theta,\xi_t)$ from the *assumed* model |
| **Deep adaptive design** | Total EIG $\sum_t$ incremental EIG | Raw history $h_{t-1}$ fed to a policy network | $T$ steps, non-myopic | Simulated in training, real at deployment |
| **DTR: Q- and A-learning** | Policy value $\mathbb E\{Y^*(d)\}$ over a regime class $\mathcal D$ | **Physical**: $(\bar s_k, \bar a_{k-1})$, with $S_k^*(\bar a_{k-1})$ caused by past treatment | $K$ stages, small | One final $Y$; logged trajectories |
| **G-computation** | Nothing: *evaluates* fixed sequences $\bar z$ | Time-varying confounders $L_t$ | $T$ periods | Logged; final $Y$ |
| **Switchback** | Minimax variance of $\hat\tau_m$, the lag-$m$ effect of sustained treatment | Last $m$ assignments (carryover) | $T/m$ coin flips | Outcome each period; design-based |
| **A/B test with mSPRT / confidence sequence** | Valid inference at any stopping time | None | Open | Per-unit outcome; the only action is stop or continue |
| **RLHF** (PPO-ptx) | $\mathbb E[r_\theta(x,y)] - \beta\,\mathrm{KL}(\pi\,\Vert\,\pi^{\mathrm{SFT}})$ plus a pre-training term | Prompt $x$; "bandit environment", episode ends after one response | One step | **Learned** reward from pairwise human rankings |
| **LLM agent loop / PSRL** | Task success / episodic return | Growing context $c_t$; MDP state | Episode | Tool observations; rewards and transitions |

| Method | Exploration mechanism | Data regime | Causal / structural assumptions |
|---|---|---|---|
| Bandits | Posterior sampling (probability matching) or optimism $U_t(x)$; $\epsilon$-dithering is the wasteful baseline | Online, algorithm sets actions | Stationarity; no carryover between pulls; a coherent prior (misspecified TS is measurably worse) |
| Delayed bandit | Optimism widened by $N_k/\tilde N_k$ while pulls are pending | Online | Delay CDF known and shared across arms |
| BO | Acquisition: PI $\lesssim$ EI $\lesssim$ UCB in explorativeness; entropy search is purely exploratory | Online, myopic | GP surrogate; loss held fixed throughout |
| BED / DAD | Everything is exploration | BED online with inference each step; DAD **trained offline on the simulator** | Model correct: BED "uses the model both to fit data and to choose new data" |
| DTR | **None**: no exploration term at all | **Offline batch**, SMART or observational | Consistency, SUTVA, sequential randomization, positivity; Q: every $Q_k$ correct; A: contrast correct plus propensity *or* nuisance |
| Switchback | None by design: fair coins, flip once per $m$ | Online but **non-adaptive** | Non-anticipation, $m$-carryover, bounded outcomes; no outcome model |
| RLHF | On-policy sampling at temperature 1; the KL leash *limits* exploration | Offline comparisons, then online rollouts against the proxy | Bradley–Terry choice model; labelers are the target population |

### 2. What is genuinely the same idea

**One Bellman recursion, two kinds of state.** [[Optimal Regime via Dynamic Programming]] defines $Q_k = \mathbb E\{V_{k+1}\mid \bar s_k,\bar a_k\}$ and $V_k = \max_{a_k}Q_k$ by backward induction. [[Value Loss and Entropy Search]] says the non-myopic BO acquisition is "a sequential decision problem solvable in principle by dynamic programming (Bellman equation), but with cost exponential in the horizon". [[From Designs to Policies (Deep Adaptive Design)]] calls adaptive design "a Bayes-adaptive Markov decision process with the incremental EIG as reward", and the Gittins index is the exact solution of the discounted independent-arm bandit. *Synthesis:* it is one recursion, but in bandits, BO and BED the state is **epistemic** (a posterior over a fixed world), while in DTRs it is **physical** (covariates that treatment changes). This is why DTRs can be solved from logged data with $K$ regressions, whereas belief-state problems fall back on myopia (EI, greedy EIG), randomisation (TS) or amortisation (DAD).

**Optimism is one construction.** Bandit UCB and GP-UCB are "the identical optimistic-score idea" ([[UCB and Greedy Algorithms for Bandits]]); the delayed-feedback index is the same score with an inflated width; a UCB index is a one-sided [[Confidence Sequences|confidence sequence]]. TS regret bounds need only that *some* valid $U_t$ exists.

**Information per unit of regret.** The information ratio $\Gamma_t = (\text{expected regret})^2 / I(x^*;(x_t,y_t)\mid \mathbb H_{t-1})$ in [[Regret Bounds for Thompson Sampling#^def-info-ratio]] puts bandits and BED on one axis: BED is the limit where the numerator is ignored, greedy the limit where the denominator is, and entropy search targets information about $x_*$ rather than all of $\theta$.

**Myopia and its two fixes.** EI is "empirically under-exploratory"; greedy BAD ignores future steps; per-timestep resampling in an MDP needs $2^N$ episodes on a chain. The fixes rhyme: DAD optimises the *total* EIG, and PSRL samples once and commits for the whole episode.

**The algorithm's own log is a SMART.** *Synthesis:* when the algorithm chooses actions from observed history, sequential randomization holds by construction with known propensities, which is the design condition [[Dynamic Treatment Regimes Framework]] calls the gold standard. What erodes is **positivity**: TS plays a hopeless arm with probability $\approx 0$, and the adaptive-assignment result in [[Confidence Sequences]] needs $P_t\in[p_{\min},1-p_{\min}]$. Switchbacks sit at the other extreme, where fair coins are provably optimal and no adaptation is allowed.

**Double robustness is the single-stage idea repeated per stage.** A-learning's factor $\{A_k - \pi_k\}$ times the residual is consistent if the propensity *or* the nuisance $h_k$ is right, the same structure as AIPW ([[A-learning and Robustness#^ex-double-robustness]]).

### 3. What only looks similar

- **"Q-learning".** In DTRs it is offline, finite-horizon, backward regression with no exploration, and it is inconsistent if *any* $Q_k$ is misspecified because $V_{k+1}=\max Q_{k+1}$ is a nonlinear response. Only the name and the recursion are shared with Watkins' online algorithm.
- **"Regret".** Murphy's advantage $C_k[I\{C_k>0\}-a_k]$ is a per-stage *function of state* estimated from data. Bandit regret is a cumulative *performance metric* of an algorithm.
- **Context vs state.** A contextual bandit's $z_t$ is exogenous. A DTR's $S_k$ is caused by $a_{k-1}$, and conditioning on it naively opens the collider path that [[Time-Varying Treatments and G-computation]] warns about.
- **RLHF is a contextual bandit in name only.** [[RLHF and Instruction Tuning#^def-bandit-env]] says so explicitly, yet there is no posterior over the reward, no regret and no exploration bonus. The Gibbs-form optimum $\pi^\star \propto \pi^{\mathrm{SFT}}\exp(r_\theta/\beta)$ resembles a prior-times-likelihood update, but it is regularisation toward a reference policy.
- **Observed vs elicited reward.** Every other row observes its reward. RLHF *estimates* it, and the reward model predicts held-out labelers at $69.6\%$ against an agreement ceiling of 73–77%. The specific failure is over-optimisation: a policy pushed outside the region where $r_\theta$ was fitted. The note's marketing analogue is conjoint: "do not optimise far outside the design region of the choice experiment without a regulariser".
- **Switchback vs two-arm bandit.** Both alternate treatments over time, but the switchback holds propensities at $1/2$ and discards post-switch windows to estimate a *sustained* effect; a bandit would chase the transient.

### Practical Implications

A routing checklist for media work:

1. **Does the action change future outcomes?** Adstock, frequency fatigue and customer state are carryover. If yes, the bandit's "$\theta$ fixed, no state" row is violated. For *measurement* use a switchback with $m$ set from the adstock half-life (weekly pulsing under three-week carryover "estimates a badly attenuated effect"). For *optimising a sequence* (CRM contact cadence, retargeting escalation) the problem is a DTR. If no (creative rotation, bid rules), stay with bandits.
2. **Who chose the actions in the data?** If the algorithm did, propensities are known. If planners did (historical MMM data), you are in the DTR/g-computation rows and owe sequential ignorability and positivity. Budget set in response to demand is the textbook violation.
3. **What is the deliverable?** Revenue during learning → TS. Best allocation in $\lesssim 20$ expensive geo tests → BO. Parameters for the MMM → BED/DAD. A decision rule over customer histories → Q-/A-learning. A claim with an error rate → fixed allocation plus a confidence sequence.
4. **Is the reward observed, delayed or a proxy?** Delay with eventual observation costs only an additive $\mu\sum_k\Delta_k$ and leaves the Lai–Robbins rate intact. A hard attribution window of length $m$ rescales the problem to $\tau_m\theta_k$ and makes it strictly harder, so lengthen the window before tuning the algorithm, and use the delay-corrected estimator $S_k/\tilde N_k$ rather than discarding pending pulls. If the reward is a proxy (clicks for incremental sales, a propensity score for CLV), apply the RLHF lessons: keep a leash to the incumbent policy, re-collect labels on-policy, and measure the proxy's ceiling.
5. **Misspecification cost rises down the map.** A bandit with a wrong prior learns slower. BED with a wrong model can get "stuck" querying uninformative designs. Q-learning with a wrong $Q_k$ is inconsistent. Prefer A-learning-style contrasts when the response surface is complex but the decision boundary is simple.
6. **Agent-based models as the simulator.** DAD and iDAD need only a simulator, so an ABM can train a geo-test design policy offline and stress-test a bandit under carryover before it touches spend.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Multi-Armed Bandits and Thompson Sampling - Overview]] · [[Bernoulli Bandit and Thompson Sampling Algorithm]] | Problem definition ($\theta$ fixed), TS as probability matching |
| [[UCB and Greedy Algorithms for Bandits]] | Optimism, GP-UCB identity, Gittins index, knowledge gradient |
| [[Regret Bounds for Thompson Sampling]] | Bayesian vs conditional regret, information ratio, TS failure modes |
| [[Contextual and Linear Bandits]] · [[Approximate Thompson Sampling and Practical Extensions]] | Exogenous context, coherent vs misspecified TS, nonstationarity, PSRL |
| [[Bandit Models with Delayed and Censored Feedback]] | Delay vs censoring, lower bounds, delay-corrected indices |
| [[Bayesian Optimisation]] · [[Acquisition Functions]] · [[Value Loss and Entropy Search]] | Losses, myopia, Bellman look-ahead |
| [[Sequential and Adaptive BED]] · [[From Designs to Policies (Deep Adaptive Design)]] | Incremental and total EIG, offline-trained policies |
| [[Dynamic Treatment Regimes Framework]] · [[Optimal Regime via Dynamic Programming]] · [[Q-learning]] · [[A-learning and Robustness]] | Estimand, assumptions, backward induction, robustness trade-off |
| [[Time-Varying Treatments and G-computation]] | Policy *evaluation* under sequential ignorability |
| [[Switchback Experiment Design and Analysis]] · [[Confidence Sequences]] | Non-adaptive design under carryover; anytime inference under adaptive assignment |
| [[RLHF and Instruction Tuning]] · [[Reward Modeling from Human Preferences]] | KL-regularised objective, bandit environment, learned reward |
| [[Tool Use and the Agent Loop]] | LLM as a stationary policy with state in the context |
| [[Open Challenges and Future Directions]] | BED's sensitivity to misspecification; BAD as a Bayes-adaptive MDP |
| Russo et al 2018 - A Tutorial on Thompson Sampling | Chs. 1-8 |
| q- and a- learning | Schulte et al. 2014, Secs. 2-6 |
| Ouyang 2022 - InstructGPT RLHF | Secs. 3.5, 4 |

## Related Concepts

- [[Expected Information Gain]] — the objective in the BED rows and the denominator of the information ratio
- [[The Numerical Agent]] — the probabilistic-numerics view of BO as a decision-making agent
- [[Decision Analysis]] — expected-utility framing; a reward model is an elicited utility
- [[Discrete Choice Models]] — the random-utility model behind pairwise preference data
- [[Interference and Marketplace Experiments]] — why switchbacks exist
- [[Delayed and Censored Feedback - Overview]] — the offline side of the delayed-reward row
- [[DML Estimators for ATE and the Interactive Model]] — the single-stage doubly-robust estimator that off-policy evaluation would generalise
- [[Q - Does Peeking Matter for a Bayesian]] — inference guarantees when these loops stop or allocate adaptively

## Gaps

- **Dream gap #58 (general RL and off-policy evaluation) is the hole in the middle of this map.** Three clusters use RL machinery (bandits/PSRL, DTRs, RLHF) and no note defines MDPs, policy gradients or PPO. There is no note on IPS or doubly-robust OPE, which is the bridge from logged media data to the value of a new policy.
- **No online method for the physical-state rows.** DTR notes are offline only; nothing covers bandits under carryover (restless or non-stationary-by-action) or SMART design for marketing.
- **Best-arm identification / pure exploration** appears only as a TS failure mode.
- **Delayed feedback with context or unknown delay**: Vernade et al. assume a known, shared delay CDF.
- **RLHF alternatives** (direct preference optimisation, uncertainty-aware reward models that would permit principled exploration) are not covered.

## Follow-Up Questions

- How would a doubly-robust off-policy estimator value a new budget rule from historical planner-chosen spend, and how fast does positivity fail?
- Can Thompson sampling be run over switchback blocks so that carryover is respected while allocation still adapts?
- What does a two-stage SMART for CRM contact policies look like, and how much does A-learning buy over Q-learning on it?
