---
title: "Q: What are some ways to uncover causal estimates from non-experimental data?"
tags:
  - type/qa
  - topic/causal-inference
  - topic/econometrics
  - topic/identification
  - topic/observational-studies
date_asked: 2026-04-10
answered_from:
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[Instrumental Variables]]"
  - "[[Local Average Treatment Effects]]"
  - "[[Differences-in-Differences]]"
  - "[[Regression Discontinuity Designs]]"
  - "[[Synthetic Control]]"
  - "[[Generalized Synthetic Control Method]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Sensitivity Analysis in Observational Studies]]"
  - "[[X-Learner]]"
  - "[[Bayesian Difference in Differences]]"
related_questions:
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
aliases:
  - quasi-experimental methods
  - identification strategies observational data
  - causal identification non-experimental
---

# What are some ways to uncover causal estimates from non-experimental data?

> [!summary]
> When randomization is impossible, causal estimates can be recovered through several "quasi-experimental" strategies, each exploiting a different source of exogenous variation or structural assumption. The core challenge — selection bias — is formalized in the [[The Selection Problem|potential outcomes framework]] as $E[Y_{0i}|D_i=1] \neq E[Y_{0i}|D_i=0]$. The main families of solutions are: (1) selection-on-observables methods (CIA, DAG adjustment, IPW, doubly-robust), (2) panel/longitudinal designs (Differences-in-Differences, Fixed Effects), (3) discontinuity-based designs (RD), (4) instrumental variables, (5) comparative case methods (Synthetic Control), and (6) ML-based heterogeneous effect estimation (metalearners). Sensitivity analysis assesses robustness when all assumptions are uncertain.

## Answer

### The Core Problem: Selection Bias

All non-experimental causal identification confronts the same fundamental obstacle. For each individual $i$, we observe only one potential outcome:

$$Y_i = Y_{0i} + (Y_{1i} - Y_{0i})D_i$$

A naive comparison of treated vs. untreated groups conflates the average treatment effect on the treated (ATT) with **selection bias** — the systematic difference in baseline outcomes between groups:

$$E[Y_i|D_i=1] - E[Y_i|D_i=0] = \underbrace{E[Y_{1i}-Y_{0i}|D_i=1]}_{\text{ATT}} + \underbrace{E[Y_{0i}|D_i=1] - E[Y_{0i}|D_i=0]}_{\text{selection bias}}$$

Each strategy below eliminates or neutralizes this selection bias term through a different mechanism ([[The Selection Problem]], MHE Ch. 2).

---

### Strategy 1: Conditional Independence Assumption (CIA) — Selection on Observables

> [!definition] CIA / Unconfoundedness
> $$Y_{si} \perp\!\!\!\perp S_i \mid X_i$$
> Conditional on observed covariates $X_i$, treatment is as good as randomly assigned. Also called **ignorability** ([[Potential Outcomes Framework]]) or **unconfoundedness**.

**When it works**: All confounders are observed and controlled for. Treatment selection is entirely driven by observable characteristics.

**Implementations**:

| Method | Mechanism | Note |
|--------|-----------|------|
| Regression adjustment | Include $X_i$ as controls; $\hat{\tau}^{\text{reg}} = N^{-1}\sum[\hat\mu_1(X_i)-\hat\mu_0(X_i)]$ | [[Frequentist Causal Estimation]] |
| IPW | Re-weight units by inverse propensity score $e(X_i)=P(D=1\|X)$ | [[Frequentist Causal Estimation#^def-ipw]] |
| Doubly-robust (DR) | Combines outcome model + IPW; consistent if *either* is correct | [[Frequentist Causal Estimation#^thm-double-robustness]] |
| Propensity score matching | Match on $e(X_i)$ to create balanced treatment/control groups | [[Frequentist Causal Estimation]] |

> [!warning] Bad Controls
> Only condition on **pre-treatment** covariates. Variables affected by treatment ("bad controls") open collider paths and introduce bias rather than removing it ([[Conditional Independence Assumption]], [[Directed Acyclic Graphs#^def-collider]]).

---

### Strategy 2: Causal Diagrams (DAGs) + Backdoor Adjustment

DAGs formalize which variables to condition on using graphical rules ([[Directed Acyclic Graphs]]).

> [!theorem] Backdoor Adjustment Formula ([[Directed Acyclic Graphs#^thm-backdoor]])
> If a set $Z$ blocks all backdoor paths from treatment $X$ to outcome $Y$ without opening collider paths or blocking front-door paths:
> $$P(Y \mid \text{do}(X=x)) = \sum_z P(Y \mid X=x, Z=z)\, P(Z=z)$$

**The three junction types** determine what to condition on:
- **Fork** $A \leftarrow B \rightarrow C$: condition on $B$ to block confounding
- **Chain** $A \rightarrow B \rightarrow C$: do *not* condition on $B$ (blocks the causal path)
- **Collider** $A \rightarrow B \leftarrow C$: do *not* condition on $B$ (opens a spurious path)

A valid adjustment set blocks all backdoor paths while preserving front-door paths and avoiding collider activation. DAGs convert the CIA from a vague "control for confounders" to a precise graphical criterion.

---

### Strategy 3: Instrumental Variables (IV)

When unobserved confounders make the CIA implausible, an instrument $z_i$ provides exogenous variation in treatment ([[Instrumental Variables]], MHE Ch. 4).

**Two IV requirements:**
1. **Relevance**: $\text{Cov}(s_i, z_i) \neq 0$ — instrument shifts treatment
2. **Exclusion restriction**: $\text{Cov}(\eta_i, z_i) = 0$ — instrument affects outcome *only* through treatment

**The IV estimand (Wald estimator):**
$$\hat\rho = \frac{E[Y_i|z_i=1] - E[Y_i|z_i=0]}{E[s_i|z_i=1] - E[s_i|z_i=0]} = \frac{\text{reduced form}}{\text{first stage}}$$

**2SLS** — the standard implementation: regress treatment on the instrument to get $\hat{s}_i$, then regress outcome on $\hat{s}_i$.

> [!warning] IV Estimates LATE, Not ATE
> With heterogeneous effects, IV identifies the **Local Average Treatment Effect (LATE)** — the causal effect only for *compliers* (those whose treatment status is changed by the instrument) ([[Local Average Treatment Effects]]). This has important external validity implications.

**Classic instruments**: Vietnam draft lottery (Angrist 1990), quarter of birth for schooling (Angrist & Krueger 1991), Maimonides' Rule for class size (Angrist & Lavy 1999).

---

### Strategy 4: Differences-in-Differences (DiD)

DiD uses panel data (units observed before and after treatment) to difference out time-invariant unobserved confounders ([[Differences-in-Differences]], MHE Ch. 5).

**The DiD estimator:**
$$\hat\beta_{DD} = (\bar Y_{\text{treat,after}} - \bar Y_{\text{treat,before}}) - (\bar Y_{\text{control,after}} - \bar Y_{\text{control,before}})$$

**Underlying regression:**
$$Y_{ist} = \gamma_s + \lambda_t + \beta D_{st} + \varepsilon_{ist}$$

where $\gamma_s$ are group fixed effects and $\lambda_t$ are time effects.

> [!definition] Common Trends Assumption
> The identifying assumption: $E(Y_{0ist}|s,t) = \gamma_s + \lambda_t$. Treatment and control groups may have different *levels* but must share the same *trend* in the absence of treatment. Testable with pre-treatment data via parallel pre-trends plots.

**Key example**: Card & Krueger (1994) used NJ vs. PA before/after NJ minimum wage increase to show employment rose rather than fell.

A **Bayesian DiD** formulation ([[Bayesian Difference in Differences]]) encodes parallel trends as a model constraint and returns a full posterior over the treatment effect, making uncertainty explicit.

---

### Strategy 5: Regression Discontinuity (RD)

When treatment is assigned by a rule based on a running variable crossing a threshold, comparing units just above and below the cutoff provides local causal estimates ([[Regression Discontinuity Designs]], MHE Ch. 6).

**Sharp RD** — deterministic jump at cutoff $x_0$:
$$\lim_{\delta\to0} E[Y_i | x_0 < x_i < x_0+\delta] - E[Y_i | x_0-\delta < x_i < x_0] = E[Y_{1i}-Y_{0i}|x_i=x_0]$$

**Fuzzy RD** — probabilistic jump at cutoff. Estimated as **IV** with $\mathbf{1}(x_i \geq x_0)$ as the instrument for $D_i$, yielding LATE at the cutoff ([[Local Average Treatment Effects]]).

**Validity checks**: Pre-treatment covariates should show no jump at $x_0$; the density of the running variable should be smooth at $x_0$ (McCrary test for manipulation).

**Classic examples**: Incumbency advantage (Lee 2008, vote-share margin), class size effect (Maimonides' Rule), scholarship eligibility cutoffs.

---

### Strategy 6: Synthetic Control

For aggregate units (states, countries) where DiD has too few observations, synthetic control constructs a weighted combination of untreated units that mimics the treated unit's pre-treatment trajectory ([[Synthetic Control]]).

> [!definition] Synthetic Control Estimator ([[Synthetic Control#^def-synth-estimator]])
> $$\hat Y_{1t}^N = \sum_{j=2}^{J+1} w_j Y_{jt}$$
> Weights $w_j \geq 0$, $\sum w_j = 1$ are chosen to minimize pre-treatment divergence between the treated unit and its synthetic version.

Treatment effect:
$$\hat\tau_{1t} = Y_{1t}^I - \hat Y_{1t}^N$$

**Inference** uses permutation (placebo) tests — apply the same procedure to each donor unit and compare the resulting "effects" to the actual treated unit's effect ([[Synthetic Control#^def-constrained-synth]]).

**Classic example**: California Proposition 99 cigarette tax — estimated −25 packs per capita by 2000, p-value ≈ 0.029 from placebo tests.

**Extensions** ([[Synthetic Control Extensions]]): penalized SC for multiple treated units, bias-corrected SC, elastic net, matrix completion. The **Generalized Synthetic Control Method** ([[Generalized Synthetic Control Method]]) unifies DiD and SC via an interactive fixed effects (IFE) model, handling multiple treated units and time-varying confounders.

---

### Strategy 7: ML-Based Heterogeneous Effect Estimation (Metalearners)

Under the CIA, machine learning methods can estimate **Conditional Average Treatment Effects** (CATE) $\tau(x) = E[Y_i(1)-Y_i(0)|X_i=x]$ flexibly ([[Metalearners for CATE]], Künzel et al. 2019).

| Learner | Description | Best When |
|---------|-------------|-----------|
| **S-Learner** | Single model with treatment as feature | Weak heterogeneity |
| **T-Learner** | Separate models per treatment arm | Balanced groups |
| **X-Learner** | Cross-imputes ITEs; then regresses on covariates | **Unbalanced** groups (large control, small treated) |

> [!theorem] X-Learner Minimax Optimality ([[X-Learner#^thm-x-learner]])
> For unbalanced designs with $n_0 \gg n_1$, the X-learner achieves rate $\min(m^{-a_\tau}, n^{-a_0})$ vs. the T-learner's $n^{-a_0}$. When the CATE is smoother than the response functions ($a_\tau > a_0$), the X-learner exploits the full data to estimate CATE at the faster rate.

---

### Strategy 8: Time-Series Causal Inference (BSTS / CausalImpact)

For interventions on a single time series, **Bayesian Structural Time-Series** (BSTS) models the pre-intervention trend and seasonality, then extrapolates the counterfactual ([[Bayesian Structural Time-Series Model]], Brodersen et al. 2015). The treatment effect is the observed minus counterfactual path.

Key components: local linear trend, seasonality, spike-and-slab variable selection over control series, Gibbs+Kalman smoother MCMC. The posterior gives pointwise, cumulative, and running-average effect estimates.

---

### Strategy 9: Sensitivity Analysis — Assessing Robustness

All observational strategies rely on untestable assumptions (unconfoundedness, exclusion restriction, common trends). Sensitivity analysis quantifies robustness to violations ([[Sensitivity Analysis in Observational Studies]]).

> [!definition] E-Value ([[Sensitivity Analysis in Observational Studies#^def-e-value]])
> The minimum risk-ratio association an unmeasured confounder $U$ would need with *both* treatment and outcome to explain away the observed effect. A large E-value = robust conclusion.

Other approaches: Rosenbaum & Rubin (1983) hidden binary confounder model, copula-based sensitivity (Franks et al. 2020) using transparent parametrization of non-identified quantities.

---

### Summary Map

| Strategy | Eliminates via | Key Assumption | Estimand |
|----------|---------------|----------------|----------|
| CIA / Regression | Conditioning on $X$ | All confounders observed | ATE / CATE |
| DAG Backdoor Adjustment | Valid adjustment set | Correct causal graph | ATE |
| IV / 2SLS | Exogenous $z$ | Exclusion restriction | LATE (compliers) |
| DiD / Fixed Effects | Panel differencing | Common trends | ATT |
| Sharp RD | Threshold comparison | Continuity at cutoff | LATE at cutoff |
| Synthetic Control | Constructed counterfactual | Pre-trend match | ATT (single unit) |
| Metalearners (X-learner) | ML under CIA | Unconfoundedness + overlap | CATE |
| BSTS / CausalImpact | Time-series extrapolation | Stationary control series | ATT (time-series) |

### Practical Implications

- **Start with DAGs**: Before choosing a strategy, draw the causal graph. This dictates whether CIA is defensible, whether an instrument exists, and what to condition on.
- **CIA requires rich observables**: If you suspect important unobserved confounders, CIA-based methods (regression, IPW, matching) will produce biased estimates — no amount of ML sophistication compensates.
- **IV trades ATE for LATE**: IV gets around unobserved confounding but estimates a local effect for compliers only. Consider whether the complier subpopulation is the policy-relevant group.
- **DiD requires pre-treatment data**: Always plot pre-trends to assess the common trends assumption; include leads in the event study specification.
- **Synthetic control is for aggregate units**: It shines with a single treated state/country observed over many time periods; it is not appropriate for individual-level data.
- **Sensitivity analysis is not optional**: Report E-values or conduct copula/Rosenbaum bounds analysis for observational conclusions. A finding that is non-robust to small confounding effects should not be presented as causal.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[The Selection Problem]] | Core framing — potential outcomes and selection bias decomposition |
| [[Conditional Independence Assumption]] | CIA / unconfoundedness and regression adjustment |
| [[Directed Acyclic Graphs]] | DAG-based identification, backdoor adjustment formula |
| [[Instrumental Variables]] | 2SLS, Wald estimator, exclusion restriction |
| [[Local Average Treatment Effects]] | LATE theorem, complier characterization |
| [[Differences-in-Differences]] | Fixed effects regression, common trends, Card & Krueger |
| [[Regression Discontinuity Designs]] | Sharp and fuzzy RD, validity checks |
| [[Synthetic Control]] | Convex weights, placebo inference, Proposition 99 |
| [[Generalized Synthetic Control Method]] | IFE model, multiple treated units, bootstrap inference |
| [[Frequentist Causal Estimation]] | IPW, doubly-robust estimator theorem |
| [[Sensitivity Analysis in Observational Studies]] | E-value, copula sensitivity, Rosenbaum bounds |
| [[X-Learner]] | Cross-imputation CATE estimation for unbalanced designs |
| [[Bayesian Difference in Differences]] | Bayesian DiD with full posterior over treatment effect |
| [[Bayesian Structural Time-Series Model]] | BSTS / CausalImpact for time-series interventions |
| [[raw/Mostly Harmless Econometrics.pdf]] | Angrist & Pischke (2008), Chs. 2–6 |
| [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] | Li, Ding & Mealli (2022) — Bayesian CI framework |
| [[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]] | Künzel et al. (2019), PNAS — metalearners |

## Related Concepts

- [[Potential Outcomes Framework]] — foundational notation for all strategies
- [[Causal Estimands]] — ITE, SATE, CATE, PATE, MATE — what we're estimating
- [[Omitted Variables Bias]] — what happens when CIA fails without a remedy
- [[Activity Bias in Advertising]] — real-world failure of CIA; motivates IV
- [[Bayesian Inverse Probability Weighting|Bayesian Propensity Scores and IPW]] — Bayesian take on IPW/matching
- [[Nonparametric Causal Inference]] — BART-based Bayesian causal estimation
- [[Counterfactual Inference]] — Bayesian counterfactual prediction (COVID deaths example)
- [[Q - Common Pitfalls in Statistical Modeling]] — confounding as a top pitfall
- [[Experimental Benchmarks for Observational Ad Measurement]] — empirical evidence on how well observational methods recover experimental ad effects

## Gaps

- **Regression Kink Designs (RKD)**: The vault covers RD designs but not the related RKD strategy (where the *slope* of the treatment function jumps at a threshold). No vault coverage — consider ingesting Card et al. (2015) or Nielsen et al. (2010).
- **Front-Door Criterion**: DAGs note covers backdoor adjustment but the vault has limited coverage of Pearl's front-door criterion for settings where all backdoor paths cannot be blocked. Consider ingesting Pearl (2009) *Causality* Ch. 3.
- **Staggered DiD / Callaway-Sant'Anna**: The vault's DiD note covers classical two-period DiD. Recent literature on heterogeneous-timing DiD (Callaway & Sant'Anna 2021, Goodman-Bacon 2021) is not yet ingested.
- **Causal Discovery / Structure Learning**: The vault covers eliciting expert knowledge for DAGs ([[Knowledge Elicitation/_Index|Knowledge Elicitation]]) but has limited coverage of automated causal discovery algorithms (PC, FCI, NOTEARS).

## Follow-Up Questions

- What is the LATE theorem, and when does an IV estimate the average treatment effect vs. only a local effect?
- When does DiD fail, and how do staggered treatment timing designs address heterogeneity in DiD?
- How does the Generalized Synthetic Control Method differ from classical synthetic control and DiD?
- When should I use the X-learner vs. T-learner vs. S-learner for heterogeneous treatment effect estimation?
- How do you build a causal DAG for a new research problem, and how do you choose the valid adjustment set?
