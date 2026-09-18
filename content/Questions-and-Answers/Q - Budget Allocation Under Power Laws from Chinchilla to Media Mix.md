---
title: "Q: Chinchilla compute-optimal training, optimal media mix under saturating response (ROAS / mROAS, Dorfman–Steiner), and power analysis / experimental design are all budget-allocation problems under diminishing returns. What transfers between them, and what does not?"
tags:
  - type/qa
  - topic/market-response
  - topic/large-language-models
  - topic/bayesian-experimental-design
  - topic/uncertainty-quantification
date_asked: 2026-09-18
answered_from:
  - "[[Neural Scaling Laws]]"
  - "[[Compute-Optimal Training (Chinchilla)]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[Shape of the Marketing Response Function]]"
  - "[[Functional Forms in Marketing]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
  - "[[Advertising and Promotion Effects]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Reaction Functions and Competitive Dynamics]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[Bayesian Optimisation]]"
  - "[[Expected Information Gain]]"
  - "[[Decision Analysis]]"
related_questions:
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
aliases:
  - Chinchilla vs media mix optimization
  - Budget allocation under diminishing returns
  - Scaling laws and marketing response curves
  - Equal marginal returns across compute, media and experiments
---

# Budget allocation under power laws: from Chinchilla to media mix

> [!summary]
> The optimisation transfers completely: all three problems are solved by **equal marginal return per unit of the constrained resource**, and in each the fitted curvature exponents (scaling exponents, elasticities, Hill slopes, the $1/\sqrt n$ of sampling) fix the split. The estimation lesson transfers as a warning: Kaplan and Chinchilla fitted the same functional family and disagreed on the allocation ($N_{opt}\propto C^{0.73}$ versus $C^{0.50}$) because of a biased measurement protocol and a narrow fitting range — exactly the two ways an MMM response curve goes wrong. What does *not* transfer is the data situation: scaling-law losses are directly observed, nearly noiseless, experimentally designed and stable over six to eight orders of magnitude, whereas media response is a causal counterfactual estimated from about a hundred observational weeks, with carryover, competitor reaction, drifting elasticities and cross-channel interactions that have no counterpart in $\hat L(N,D)$.

## Answer

### 1. The shared first-order condition

| | Chinchilla | Media mix | Single budget level | Experiment design |
|---|---|---|---|---|
| Objective | $\min\ E+A N^{-\alpha}+B D^{-\beta}$ | $\max \sum_t \hat Y_t(\mathbf x;\Phi)$ incl. post-period to $t_1+L-1$ | $\max\ (P-c)Q(A)-A$ | $\min$ CI half-width (or $\max$ EIG) |
| Constraint | $6ND=C$ (a **product**) | $\sum_m c_m=\mathcal C$ (a **sum**) | none — level is free | geos, weeks, spend differential |
| FOC | $\alpha A N^{-\alpha}=\beta B D^{-\beta}$ | $\text{mROAS}_m=\lambda$ for all $m$ | $(P-c)\,\partial Q/\partial A=1$ | marginal precision per dollar equal across levers |
| Exponents give | $N_{opt}\propto C^{\beta/(\alpha+\beta)}$, $D_{opt}\propto C^{\alpha/(\alpha+\beta)}$ | spend shares | $A^*/S^*=\eta_{QA}/\eta_{QP}$ | $N\propto\sigma^2/d^2$ |
| Source | [[Compute-Optimal Training (Chinchilla)#^thm-frontier]] | [[ROAS, mROAS, and Optimal Media Mix#^optimal-mix]] | [[Optimal Marketing Decisions and Forecasting#^thm-dorfman-steiner]] | [[Power Analysis and Sample Size]], [[Geo-Experiment Design and Power Analysis#^thm-gbr-variance]] |

The Chinchilla note already says the media problem is "solved by the same Lagrange condition of equalized marginal returns per unit of cost". Two refinements make the correspondence exact.

*Synthesis — sum versus product constraints.* Chinchilla's budget is multiplicative, so it is additive in $\log N+\log D$ and the condition equalises derivatives with respect to **log** inputs: $\partial\hat L/\partial\log N=\partial\hat L/\partial\log D$, which is the note's "elasticity-weighted reducible losses … are balanced". A media budget is additive in dollars, so the condition equalises derivatives with respect to dollars — mROAS. For a constant-elasticity response $f_m=k_mx_m^{\beta_m}$ ([[Functional Forms in Marketing#^def-power]]), $f_m'=\beta_mf_m/x_m$, i.e.

$$
\text{mROAS}_m=\eta_m\times\text{ROAS}_m ,\qquad\text{so at the optimum}\qquad \frac{x_m}{\sum_jx_j}=\frac{\eta_mf_m}{\sum_j\eta_jf_j}.
$$

Budget share is proportional to elasticity times contribution. This is the multi-channel form of Dorfman–Steiner (advertising-to-sales ratio $=\eta_{QA}/\eta_{QP}$; $0.10/2.5=4\%$), and of the vault's multiplicative-mix result that spend ratios across instruments equal elasticity ratios. It also explains why ranking channels on average ROAS misallocates: at the optimum a low-elasticity channel *must* show a higher ROAS.

*Synthesis — the Hill tail is a Chinchilla term.* The $\beta$Hill transform is written in [[Shape (Saturation) Effects#^betahill-eq]] as $\beta_m-\beta_m\mathcal K^{\mathcal S}/(x^{\mathcal S}+\mathcal K^{\mathcal S})$. For $x\gg\mathcal K$ the shortfall from saturation is $\approx\beta\mathcal K^{\mathcal S}x^{-\mathcal S}$ — a power-law deficit with "$A$" $=\beta\mathcal K^{\mathcal S}$ and exponent $\mathcal S$, sitting below an asymptote just as $A/N^\alpha$ sits above the irreducible $E$. The same parameter trade-off that makes $(\mathcal K,\mathcal S,\beta)$ "essentially unidentifiable" applies to $(E,A,\alpha)$ fitted far from the asymptote.

**How the exponents move the split as the budget grows.** Kaplan's 10× compute buys 5.5× parameters and 1.8× tokens; Hoffmann's buys about 3.2× of each. In media the expansion path is set the same way: with $\text{mROAS}_m=\lambda$ and power curves, $x_m\propto\lambda^{-1/(1-\eta_m)}$, so less-curved channels absorb a growing share of incremental budget (*synthesis*). Under Hill saturation every channel's mROAS eventually falls below cost, which is where the Dorfman–Steiner *level* condition takes over — a question Chinchilla never asks because $C$ is exogenous.

**Experiments are the same problem with exponent $\tfrac12$.** $N_{\text{per group}}=2(Z_{\alpha/2}+Z_{1-\beta})^2\sigma^2/d^2$ says precision is a power law in sample size. The geo notes give the multi-input version: TBR's iROAS half-width falls as $1/f$ in spend intensity, as $1/\sqrt n$ in pretest length but is "**bounded below**" by $\sigma_0/(\bar c\sqrt T)$, improves with test length "with diminishing returns", and *grows* with cooldown length at fixed spend. *Synthesis:* that floor is the Kaplan phrase "when not bottlenecked by the other two" in another domain — pretest weeks cannot substitute for test weeks, just as parameters cannot substitute for tokens. The Chinchilla and scaling-law notes draw the same link: IsoFLOP profiles are "the analogue of a power curve traced by pilot simulation", and the pseudo-geo-experiment procedure is that pilot simulation.

### 2. The estimation problem: Kaplan versus Chinchilla as a cautionary tale

Both papers assumed power laws. They disagreed on the allocation because of how the curve was *measured*.

| Failure in scaling laws | What the vault records | MMM counterpart |
|---|---|---|
| **Protocol bias** | Kaplan used one cosine schedule for all horizons; intermediate losses overestimate what a matched schedule achieves, which "understates the value of training smaller models on less data" | Mis-specified carryover: response read before adstock has played out understates a channel's return (stated in the Chinchilla note). ROAS must sum to $t_1+L-1$ |
| **Narrow range** | Most Kaplan runs below 100M parameters; "slight curvature in the FLOP-loss frontier", so "extrapolating from small models misleads" | $\mathcal K$ outside the observed spend range is unidentifiable; the model "**cannot extrapolate**". Budget 0.5 (sparse region) gave a **three-mode** posterior for the optimal mix; budget 1 gave a tight unimodal one |
| **Exponent leverage** | Rounded published constants give $N_{opt}\approx32$B at Gopher's budget, the unrounded fit 40B; "the third decimal of the exponent moves the answer materially". Kaplan's crossover point is uncertain by an order of magnitude | Two-year samples bias $\beta$Hill at $x=1$ by $-18\%$ to $-33\%$; posteriors of $\alpha$ and $\theta$ in the shampoo data roughly equal their priors |
| **Fit dominated by the dense regime** | Huber loss needed; larger $\delta$ "pushes the model to overfit the small compute regime and poorly predict held-out data from larger runs" | *Synthesis:* most weeks sit near average spend, so the likelihood is dominated by exactly the region that says least about curvature |
| **Bookkeeping** | Embedding parameters counted or not changes the trend | Spend versus impressions versus GRPs; change-period definition |

What Hoffmann et al. did about it is the transferable method: **three independent estimation routes** (training-curve envelope, IsoFLOP profiles, parametric fit) agreeing on $a\approx0.5$; **bootstrap intervals** on the exponents; a **head-to-head test** at $10^{21}$ FLOPs; and one **confirmatory run** at scale (Chinchilla 70B beats Gopher 280B, 67.6% versus 60.0% MMLU). Note that Approach 2 involves no extrapolating functional form: hold the budget fixed, vary the split, find the valley.

*Synthesis — the iso-budget geo test.* The media analogue of an IsoFLOP profile is a multi-cell geo experiment at **fixed total spend** with different channel splits across cells, fitted with a parabola in log-share. It measures the allocation optimum directly, inside the range where it will be used, and is the natural triangulation partner for an MMM-derived mix.

### 3. Deciding under an uncertain curve

- **Propagate, do not plug in.** The ROAS note is explicit that averaging parameters and then plugging in is *wrong*; push each posterior draw $\Phi_j$ through the metric. The scaling-law note recommends the same upgrade: a Bayesian fit with posterior uncertainty "carried through to the design decision".
- **Route A is the decision; route B is the diagnostic.** [[Decision Analysis]] gives $d^*=\arg\min_d\mathbb E[L(d,\theta)\mid y]$. Optimising the *average* predicted sales over draws (Eq. 15) is that rule and gives one stable mix. Optimising per draw (Eq. 16) gives the posterior of the argmax, whose multimodality tells you whether the data determine the answer at all.
- **Flat optima cut both ways.** Kaplan: models between 0.6× and 2.2× the optimal size cost only 20% more compute. Jin et al.: variance in estimated sales across draws is comparable to or larger than the variation caused by changing the mix, so the optimum "is **not trustworthy**". *Synthesis:* these are the same fact — a flat objective makes the argmax ill-determined but deviations cheap. Report expected regret of the chosen mix against each draw's optimum, not only the argmax distribution.
- **If the argmax posterior is diffuse, buy information.** In [[Bayesian Optimisation]] the multi-modal optimal-mix posterior is $p(x_*)$ and the location-information loss targets its entropy; [[Expected Information Gain]] is the design objective when the deliverable is the curve itself. Both have diminishing returns, so the experiment budget is a fourth allocation problem nested inside the third. The BO note's defence of myopia — "the surrogate is often *wrong*" — applies with more force to an MMM than to a GP.

### 4. Where the analogy fails

1. **The objective is not observed.** Pretraining loss is measured directly with seed noise of about 0.02; incremental sales are a counterfactual. BIC "select[s] the best *regression* model, not the best *causal* model", and the scaling-law runs were designed experiments while MMM spend is observational.
2. **Dynamic range.** Eight orders of magnitude in compute versus whatever spend variation happened to occur in $n=106$ weekly observations. Lengthening the history is "*not* the recommended fix" because market conditions drift; the vault's fix is pooling brands or geos for informative priors.
3. **Carryover and timing.** Compute has no adstock. Media has retention $\alpha_m$, delayed peaks $\theta_m$, a long-run effect about double the short-run, a 90% duration of six to nine months, and possible hysteresis. The allocation is over a *flight pattern*: concave response implies even spending, S-shaped response can make **pulsing** optimal, convex response gives corner solutions ([[Shape of the Marketing Response Function]]). With $\mathcal S>1$ the objective is not concave and the Lagrangian condition is necessary, not sufficient.
4. **Competition.** Own-response is "a partial equilibrium result"; rivals react and "ignoring reactions overstates the value of marketing investments". Nothing reacts to your FLOPs.
5. **Non-stationarity.** Scaling exponents transfer across text distributions with a constant offset. Advertising elasticities decline over the life cycle (0.625 → 0.496 → 0.274; new products 0.26 versus established 0.05), so last year's curve is a prior, not a law.
6. **Interactions.** Jin et al.'s ROAS machinery assumes additive media effects with no cross-channel spillover; the multiplicative form builds synergy in; price and non-price advertising move price sensitivity in opposite directions. $\hat L(N,D)$ is additively separable by assumption, and interaction enters only through the constraint.
7. **Costs outside the objective.** Inference cost scales with $N$, which pushed Chinchilla to a smaller model than loss alone required; margin, long-run brand effects and CLV play that role in media.
8. **One shot versus repeated play.** "It is typically only feasible to train these large models once", so extrapolation is unavoidable. Media is re-allocated weekly, so sequential learning can replace extrapolation.

### Practical Implications

1. **Allocate on mROAS, never ROAS**, computed per posterior draw including the carryover tail. Sanity-check with $\text{mROAS}\approx\eta\times\text{ROAS}$ against the meta-analytic $\eta\approx0.10$–$0.22$.
2. **Do not recommend a mix outside the observed spend range** without an experiment. Flag any channel whose posterior $\mathcal K$ sits at the edge of its range-constrained prior.
3. **Audit the measurement protocol before the curve** — adstock window $L$, change-period definition, cooldown length. That, not the functional form, is what separated Kaplan from Chinchilla. Residual autocorrelation to lag 15 in the shampoo model is the kind of signal to chase.
4. **Triangulate:** parametric MMM, an iso-budget multi-cell geo test, and a confirmatory holdout of the recommended mix.
5. **Report three numbers:** the route-A mix, the route-B spread, and expected regret. If regret is small, stop optimising; if the spread is wide *and* regret is large, spend on information.
6. **Size experiments with the same logic:** spend intensity first (half-width $\propto1/f$, watching saturation), then test length, and only then pretest length, which hits a floor; do not pad cooldown.
7. **Prefer parsimonious curvature** (reach, $\mathcal S=1$; geometric adstock) when likelihoods tie, as BIC did, and carry functional-form uncertainty as a multiverse rather than as extra parameters.
8. **Treat fitted curves as perishable** and re-estimate on a schedule.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Compute-Optimal Training (Chinchilla)]] | Constrained problem, closed-form frontier, three estimation approaches, why Kaplan differed, the marketing paragraph |
| [[Neural Scaling Laws]] | Power-law premise, Kaplan allocation, flat optimum, where the laws must fail |
| [[ROAS, mROAS, and Optimal Media Mix]] | Metrics, budget-constrained problem, routes A/B, three-mode posterior |
| [[Shape (Saturation) Effects]], [[Bayesian Estimation and Priors for MMM]], [[MMM Model Selection and Application]] | Hill form, unidentifiability, no extrapolation, small-sample bias, BIC, bimodal optimum |
| [[Optimal Marketing Decisions and Forecasting]], [[Functional Forms in Marketing]], [[Shape of the Marketing Response Function]] | Dorfman–Steiner, elasticities, shape-dependent pulsing |
| [[Advertising and Promotion Effects]] | Elasticity benchmarks, long-run multiplier, life-cycle drift |
| [[Carryover (Adstock) Functional Forms]], [[Reaction Functions and Competitive Dynamics]] | Where the analogy breaks |
| [[Power Analysis and Sample Size]], [[Geo-Experiment Design and Power Analysis]], [[TBR Design Sensitivity and the Stationarity Assumption]] | Design as allocation; scaling of CI half-width in each lever |
| [[Bayesian Optimisation]], [[Expected Information Gain]], [[Decision Analysis]] | Acting and experimenting under an uncertain curve |

## Related Concepts

- [[Carryover Effects and Distributed Lags]] — Koyck dynamics behind the long-run multiplier
- [[Multivariate Persistence and Cointegration]] — hysteresis and permanent effects
- [[Acquisition Functions]] and [[Value Loss and Entropy Search]] — concrete rules for choosing the next spend level
- [[Type S and Type M Errors]] — what under-powered experiments do to the elasticities fed into the allocation
- [[Prior Predictive Checking]] — check implied response at target spend before trusting an extrapolation
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — which objective to use once you decide to buy information

## Gaps

- **No note derives the multi-channel allocation rule**; the share formula $x_m\propto\eta_mf_m$ and the Hill-tail correspondence are synthesis from the vault's definitions.
- **Source-note correction (resolved 2026-09-18):** while answering this question, [[Optimal Marketing Decisions and Forecasting]] was found to state $A^*/S^*=\alpha/m$ with $m=(P-c)/P$ for the multiplicative model, and its Dorfman–Steiner derivation lines were garbled. The first-order condition $(P-c)\alpha Q/A=1$ yields $A^*/S^*=\alpha m=\alpha/\beta$; the source note has been corrected accordingly. Still worth checking against Hanssens et al. Ch. 9 for the book's own notation.
- **No value-of-information note**: nothing on EVPI/EVSI or on how much media budget to divert to experiments, and [[Decision Analysis]] is a short stub.
- **No robust or risk-averse allocation** under posterior uncertainty, and no dynamic allocation with adstock state beyond the optimal-control sketch.
- **Post-Chinchilla scaling work is absent** (inference-aware or data-constrained multi-epoch laws), so point 7 of Section 4 rests on one sentence of the Chinchilla note.
- **Competitive-response-adjusted response curves** are not connected to the Bayesian MMM notes.

## Follow-Up Questions

- How many cells and weeks does an iso-budget geo test need to locate the optimal split to within a given regret?
- What is the expected regret of the route-A mix in the Jin et al. Scenario II simulation, and does it justify the label "not trustworthy"?
- How does the optimal allocation change when the state is adstock and the objective is discounted CLV?
- Can a hierarchical prior over Hill exponents across brands play the role that cross-scale data played for Chinchilla?
