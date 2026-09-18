---
title: "Q: Honest DiD, Rosenbaum-style sensitivity analysis for unobserved confounding, Plausible GMM's prior over moment misspecification, synthetic-control placebo and backdating checks, prior/likelihood power-scaling sensitivity and Sobol global sensitivity indices all ask how wrong the assumptions can be before the conclusion changes. What would a unified view look like?"
tags:
  - type/qa
  - topic/causal-inference
  - topic/econometrics
  - topic/bayesian-workflow
  - topic/agent-based-modeling
  - topic/uncertainty-quantification
date_asked: 2026-09-18
answered_from:
  - "[[Honest DiD - Sensitivity to Parallel Trends Violations]]"
  - "[[Pre-Trend Testing and Its Pitfalls]]"
  - "[[Sensitivity Analysis in Observational Studies]]"
  - "[[Plausible GMM - Overview]]"
  - "[[Plausible Moment Restriction Model]]"
  - "[[Quasi-Bayes for Plausible Moment Restrictions]]"
  - "[[Gaussian Local Prior Approximation]]"
  - "[[Plausible GMM - Institutions and GDP Application]]"
  - "[[Synthetic Control Inference and Diagnostics]]"
  - "[[Synthetic Control Requirements]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[Influence of Likelihood and Prior]]"
  - "[[Influence of Individual Data Points]]"
  - "[[Tail Behavior and Prior-Likelihood Conflict]]"
  - "[[Global Sensitivity Analysis - Overview]]"
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
  - "[[Morris Elementary Effects Screening]]"
  - "[[Local vs Global Sensitivity Analysis]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
  - "[[Omitted Variables Bias]]"
  - "[[Instrumental Variables]]"
  - "[[Topology of Models]]"
  - "[[Comparing Models Visually]]"
related_questions:
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Four Meanings of Calibration]]"
aliases:
  - Unified view of sensitivity analysis
  - How wrong can the assumptions be before the conclusion changes
  - Breakdown values across DiD, confounding, GMM, priors and ABMs
  - Sensitivity analysis taxonomy
---

# A unified view of sensitivity to assumption violations

> [!summary]
> Every method in the list is the same three-step construction: (i) **embed** the nominal analysis in a larger family indexed by a perturbation $\eta$, with $\eta_0$ the assumption as originally made; (ii) **put a size on** the perturbation — a hard set $H(M)$, a prior $\pi(\eta)$ with a scale, a power $\alpha$, or an input distribution; (iii) **aggregate** the target over that family and report the result — worst case (robust interval, breakdown value), average (a wider posterior), derivative (local sensitivity) or variance share (Sobol index). What genuinely differs is whether the data can ever inform $\eta$: for parallel trends, hidden confounding and exclusion restrictions they cannot, so the size of the perturbation must come from outside the data and "no free lunch" applies; for priors and data points they can; for ABM parameters no data are involved at all. Placebo, backdating and pre-trend checks are *not* sensitivity analyses — they are falsification tests, and the vault's notes show why the two should not be confused.

## Answer

### 1. The common skeleton

*Synthesis:* no single vault note states this, but every source note fits it. Let $\theta$ be the quantity of interest and $T(\eta)$ what the analysis would report if the assumption were relaxed to $\eta$. The nominal analysis reports $T(\eta_0)$. A sensitivity analysis chooses

1. **the perturbation** $\eta$ — what is allowed to be wrong;
2. **a parameterisation of its size** — a family $H(M)$ with $H(0)=\{\eta_0\}$, or a distribution $\pi_s(\eta)$ with scale $s$;
3. **an aggregator and a report**:

| Aggregator | Formula | Report | Vault instances |
|---|---|---|---|
| Worst case | $[\inf_{\eta\in H(M)}T(\eta),\ \sup_{\eta\in H(M)}T(\eta)]$ | identified set, robust CI, **breakdown value** $M^*=\inf\{M:\text{conclusion fails}\}$ | Honest DiD, Rosenbaum $\Gamma$, E-value, Cornfield |
| Average | $\int T(\eta)\,\pi_s(\eta)\,d\eta$, as a full posterior | wider (quasi-)posterior, plotted against $s$ | Plausible GMM, Bayesian hidden-$U$ models, copula sensitivity, bias-term model |
| Derivative | $\partial T/\partial\eta$ at $\eta_0$ | local sensitivity diagnostic | power scaling, influence functions, OAT |
| Variance share | $V(\mathbb E[T\mid\eta_i])/V(T)$ | first-order / total-effect index | Sobol, Morris (ranking proxy) |
| Enumeration | $\{T(\eta_k)\}$ over a finite list | heat map, specification curve | multiverse, leave-one-out donors |

The [[Sensitivity Analysis in Observational Studies]] note calls step (i)–(ii) **transparent parametrization**: "explicitly separating identified parameters (which the data inform) from non-identified parameters (sensitivity parameters, which require prior information or a range of values)." That phrase is the best one-line summary of the whole family.

### 2. The methods side by side

| Method | (i) What is perturbed | (ii) How the size is parameterised | (iii) What is reported | Can data inform $\eta$? |
|---|---|---|---|---|
| [[Honest DiD - Sensitivity to Parallel Trends Violations\|Honest DiD]] | post-period differential trend $\delta_{post}$ | $\Delta^{RM}(\bar M)$: post shocks $\le\bar M\times$ largest pre shock; $\Delta^{SD}(M)$: slope changes by $\le M$ per period | interval "estimate minus worst-case bias", uniform-coverage CI, breakdown $\bar M$ | only through $\delta_{pre}$, as a *calibration*, never directly |
| Rosenbaum $\Gamma$ | treatment-assignment odds for units with identical $X$ | odds ratio $\Gamma\ge1$ | threshold $\Gamma^*$ where the randomization p-value crosses $\alpha$ | no |
| E-value / Cornfield | strength of a hidden $U$ with both $Z$ and $Y$ | minimum risk-ratio association | one number needed to "explain away" | no |
| Hidden-$U$ logistic model (Dorie et al.); copula model (Franks et al.) | $U\to Z$, $U\to Y$ log-odds ratios; or the dependence linking the two arms' potential-outcome distributions | grid (frequentist) or prior (Bayesian) | $\tau$ over the grid, or a posterior | no |
| [[Plausible GMM - Overview\|Plausible GMM]] | moment violation $\mu_*$ in $m(\theta_*)=\mu_*$ (e.g. the IV exclusion restriction) | proper prior $\mu\sim\mathcal N(0,\Lambda/T)$, scale multiplier $c$ | quasi-posterior for $\theta$; HPD interval plotted against $c$ | no — the prior's impact is not asymptotically negligible |
| SC placebo / backdating / leave-one-out | which unit, which date, which donor | discrete enumeration | permutation p-value from RMSPE ratios; backdated gaps; spread of leave-one-out estimates | partly — these are *tests* |
| TBR stationarity stress test | stability of $(\alpha,\beta)$ between pretest and test | simulated drift (+0.5%/week exponential growth), correlation $\rho$ | bias and coverage of the iROAS interval | partly, via cooldown flattening |
| [[Influence of Likelihood and Prior\|Power scaling]] | the prior or the whole likelihood | exponent $\alpha$ around 1 (e.g. 0.8, 1.25) | shift of the posterior; $2\times2$ diagnosis; Pareto $\hat k$ | yes — a strong likelihood swamps it |
| [[Influence of Individual Data Points\|Data influence]] | one observation's weight or value | $\alpha_i\in[0,1]$ in $\prod_i p(y_i\mid\theta)^{\alpha_i}$; or $d\hat\theta/dy_i$ | Pareto $\hat k$, pointwise elpd, influence gradient | yes |
| Sobol / Morris | model input parameters $X_i$ | input ranges or distributions, varied jointly | $S_i$, $S_{Ti}$, $\mu^*$, $\sigma$ | not applicable — no data involved |
| HM/ABC model discrepancy | ABM structural error | variance $V_m$ added to $V_s+V_o$ | size of the non-implausible set | weakly |
| [[Comparing Models Visually\|Multiverse]] | the model specification itself | nodes of the [[Topology of Models\|model topology]] that pass checks | conclusions $\times$ specifications heat map | yes, via model checking |

### 3. What is genuinely the same idea

**(a) $\bar M$, $\Gamma$, $\mu$ and the OVB product are one object.** The [[Omitted Variables Bias]] formula $\rho^s=\rho^l+\gamma^l\delta_{As}$ is the prototype: bias equals (effect of the omitted thing on the outcome) $\times$ (its association with treatment). Cornfield's inequality and the E-value bound exactly those two factors ([[Sensitivity Analysis in Observational Studies#^def-e-value]]). The Plausible GMM IV example is the same algebra for [[Instrumental Variables|the exclusion restriction]]: the exact-IV estimand equals $\theta_*+(\mathbb E[D_tX_t])^{-1}\mu_*$, bias proportional to the violation and inversely proportional to first-stage strength. Honest DiD's Lemma 2.1 is again "point estimate minus worst-case bias, given the observed pre-trend". The Honest DiD note says so directly: "$\bar M$ plays the role of a Rosenbaum-$\Gamma$-type sensitivity parameter", and the PGMM note says $\mu$ "plays the role of the sensitivity parameter … but here it carries a *prior* rather than being varied over a fixed set."

**(b) Hard set versus prior is a choice of aggregator, not of philosophy.** PGMM's Overview records that in the Gaussian limit experiment the Bayes credible interval under a two-point least-favourable prior coincides with Armstrong–Kolesár's minimax robust interval, and that a union $\cup_{\mu_*\in C}CI(\mu_*,\alpha)$ gives uniform coverage over a known set $C$ — the same union construction as Honest DiD's Lemma 2.2. The Honest DiD note points the other way: a random-walk or smooth-trend prior on $\delta_{post}$ given $\delta_{pre}$ in a [[Bayesian Difference in Differences]] "is the Bayesian analogue of $\Delta^{RM}$ / $\Delta^{SD}$". The exception is Rosenbaum's $\Gamma$, which the vault flags as having "no natural Bayesian analogue" because it lives inside Fisherian randomization inference.

**(c) No free lunch is universal.** PGMM proves it: the quasi-posterior variance $V=(G^\top A_\theta G)^{-1}$ is never smaller than efficient GMM's, and efficient GMM is "the limiting, over-confident special case $\Lambda\to0$" ([[Gaussian Local Prior Approximation#^ex-no-free-lunch]]). Honest DiD's robust sets were 40–80% longer than the estimated identified set in the VAT example, and — unlike a pre-test — they get *wider* when leads are noisy.
*Synthesis:* by the Woodbury identity the plausibility-adjusted weight is $A_\theta=(\Omega+\Lambda)^{-1}$: sampling variance plus misspecification variance. That is structurally the History Matching implausibility $I(x)=d^2/(V_s+V_o+V_m)$ in [[Uncertainty Quantification for ABM Calibration]], where ignoring model discrepancy $V_m$ "causes the HM procedure to retain too few parameter sets". $V_m$ is the ABM's $\Lambda$. The explicit **bias term** $y\sim\text{normal}(\theta+\text{bias},\sigma)$, $\text{bias}\sim\text{Cauchy}(0,0.1)$ in [[Tail Behavior and Prior-Likelihood Conflict]] is the same device in a plain Bayesian model — and it shows a consequence PGMM's Gaussian case hides: with heavy tails $E(\theta\mid y)$ becomes non-monotonic in $\bar y$.

**(d) Power scaling and data deletion are one framework.** The workflow notes state that $\prod_i p(y_i\mid\theta)^{\alpha_i}$ with $\alpha_i\to0$ is leave-one-out, its gradient in $\alpha$ is an influence function, and power-scaling the prior is "the same device … applied globally" ([[Influence of Individual Data Points#^def-power-weighted-likelihood]]). PGMM's sensitivity plot (HPD interval against prior-scale multiplier $c$; midpoint stable near 2.1, excluding zero throughout, [[Plausible GMM - Institutions and GDP Application#^ex-figure1]]) is a refit-based prior-scale analysis of exactly this kind, applied to a prior over misspecification rather than over a parameter.

**(e) Static sensitivity is a Sobol index in disguise.** *Synthesis:* [[Influence of Likelihood and Prior#^def-static-sensitivity|static sensitivity analysis]] reads the scatterplot of a quantity of interest against a parameter across posterior draws — flat means insensitive to that parameter's prior. The first-order index $S_i=V(\mathbb E[Y\mid X_i])/V(Y)$ is the variance of the conditional-mean curve in that same scatterplot. Caveat: Sobol's decomposition assumes independent inputs, which posterior draws are not, so this is a heuristic, not a theorem.

### 4. What only looks similar

1. **Falsification tests are not sensitivity analyses.** Backdating, in-time placebos and "no significant leads" all check an *observable implication* in the pre-period. [[Pre-Trend Testing and Its Pitfalls]] shows the cost: a linear trend detected only 50–80% of the time can produce bias as large as the estimate, and conditioning on passing adds a further bias term $\Sigma_{12}\Sigma_{22}^{-1}(\mathbb E[\hat\beta_{pre}\mid\text{pass}]-\beta_{pre})$. Sensitivity analysis uses the same pre-period information *quantitatively* instead of as a gate. *Synthesis:* the SC RMSPE ratio $r_j=R_j(T_0+1,T)/R_j(1,T_0)$ already scales post-period gaps by pre-period fit — it is a relative-magnitudes statistic — but the vault has no SC analogue of a reported breakdown $\bar M$. Leave-one-out over donors is closer to a true sensitivity analysis (it perturbs the estimator's inputs), and [[Synthetic Control Requirements]] gives one directional bound: with un-excludable positive spillovers the SC estimate is a lower bound on the effect magnitude.
2. **Identified versus unidentified perturbations.** Power scaling asks whether the *data* overwhelm a modelling choice; if the likelihood is strong the answer is reassuring. For $\delta_{post}$, $\Gamma$, $\mu_*$ no amount of data helps. Reporting "`priorsense` found no prior sensitivity" says nothing about confounding.
3. **Sobol indices attribute, they do not bound.** $S_{Ti}$ tells you which input drives output variance over an assumed input distribution; it does not say how far an input can move before a conclusion flips. It answers "which assumption should I worry about", not "how much".
4. **Local versus global cuts across all of this.** OAT misses interactions ($Y=ab$ at baseline $(0,0)$: both inputs look irrelevant, yet $S_{Ta}=S_{Tb}=1$; [[Local vs Global Sensitivity Analysis#^oat-pitfalls]]). *Synthesis:* most causal sensitivity analyses are OAT over assumptions. The duty-to-bargain example had to move the reference period because honest sets *require* $\tau_{pre}=0$ — assumptions interact. The multiverse is the factorial remedy, with the workflow book's warning that "many model specifications will be nonsensical".

### Practical Implications

A checklist for any deliverable (geo test, MMM, observational lift study, ABM):

1. **Name the load-bearing assumption and ask whether data can ever inform it.** If not (parallel trends, no hidden confounding, exclusion, TBR's [[TBR Design Sensitivity and the Stationarity Assumption#^def-tbr-stationarity|stability of $(\alpha,\beta)$]]), you need rows 1–6 of the table, not a diagnostic.
2. **Parameterise the violation in units a stakeholder can judge.** Honest DiD's marketing reading is the template: "the lift is positive unless week-to-week divergence between test and control regions during the campaign was more than $\bar M$ times the largest divergence seen in the pre-period." Use $\Delta^{RM}$ for weekly data with promotional shocks, $\Delta^{SD}$ for slow brand or distribution drift. For PGMM-style priors, calibrate as the AJR example does ("elasticity no larger than 10%" $\Rightarrow$ sd 0.05).
3. **Report the curve and the breakdown value, not a pass/fail.** Robust interval against $\bar M$, HPD against $c$, iROAS bias against drift rate. For TBR the vault only has the simulated stress test (bias and under-coverage at low $\rho$; TBR-OR unstable below $\rho\approx0.5$) — *Synthesis:* run the pseudo-geo-experiment procedure with injected drift and report the drift at which the iROAS interval first covers zero.
4. **Replace pre-period gates with power statements.** Report what trend the pretest *could* have detected ([[Pre-Trend Testing and Its Pitfalls]]), and keep backdating/placebo plots as descriptive evidence.
5. **For the Bayesian MMM**, run power scaling on the *derived quantity* (ROAS, optimal split), not marginal parameters — Hill parameters are individually unidentified, exactly the case where "analyzing the sensitivity of marginal posteriors is not so useful". Sensitivity to both prior and likelihood signals conflict; do not tune priors until the warnings vanish.
6. **For ABMs**, Morris screen then Sobol-quantify, fix inputs with $S_{Ti}\approx0$, and carry $V_m$ explicitly; a large $S_{Ti}-S_i$ gap means OAT "what-if" scenarios shown to stakeholders will mislead.
7. **Expect to pay.** If the sensitivity-aware interval is no wider than the nominal one, the perturbation set was probably set to $\{\eta_0\}$.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Honest DiD - Sensitivity to Parallel Trends Violations]] | $\Delta^{RM}$, $\Delta^{SD}$, Lemma 2.1, breakdown value, marketing reading |
| [[Pre-Trend Testing and Its Pitfalls]] | Why tests of assumptions are not sensitivity analyses |
| [[Sensitivity Analysis in Observational Studies]] | Cornfield, E-value, $\Gamma$, copula; "transparent parametrization" |
| [[Plausible GMM - Overview]], [[Plausible Moment Restriction Model]], [[Quasi-Bayes for Plausible Moment Restrictions]], [[Gaussian Local Prior Approximation]], [[Plausible GMM - Institutions and GDP Application]] | Prior over misspecification, no free lunch, link to minimax intervals, HPD-vs-scale plot |
| [[Synthetic Control Inference and Diagnostics]], [[Synthetic Control Requirements]] | RMSPE ratio, backdating, leave-one-out, spillover lower bound |
| [[TBR Design Sensitivity and the Stationarity Assumption]] | Simulated violation of stationarity, TBR-OR |
| [[Influence of Likelihood and Prior]], [[Influence of Individual Data Points]], [[Tail Behavior and Prior-Likelihood Conflict]] | Power scaling, static sensitivity, moving vs removing, bias-term model |
| [[Global Sensitivity Analysis - Overview]], [[Variance-Based Sensitivity and Sobol Indices]], [[Morris Elementary Effects Screening]], [[Local vs Global Sensitivity Analysis]] | Variance-share aggregator, OAT failure |
| [[Uncertainty Quantification for ABM Calibration]] | Model discrepancy $V_m$ |
| [[Omitted Variables Bias]], [[Instrumental Variables]] | The bias algebra being bounded |
| [[Topology of Models]], [[Comparing Models Visually]] | Multiverse as enumeration over specifications |

## Related Concepts

- [[The Selection Problem]] — $\delta_{post}$, hidden $U$ and $\mu_*$ are all forms of selection bias being bounded rather than assumed away
- [[General Structure of Bayesian CI]] — non-identified parameters still get posteriors, so priors on them must be explicit
- [[Garden of Forking Paths]] — a multiverse chosen after seeing results is itself a forking path
- [[History Matching for ABMs]] — where $V_m$ enters the implausibility score
- [[Bayesian Structural Time-Series Model]] — absorbs the drift that breaks TBR, shifting the assumption rather than removing it
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — the identification strategies whose assumptions are perturbed here

## Gaps

- **Partial identification proper is missing** (Dream gap #30): no note on Manski's no-assumption bounds, Balke–Pearl IV bounds or Lee trimming bounds. The vault covers the *sensitivity* end ($M>0$ small) but not the $M\to\infty$ worst-case end, so the claim that both are one continuum rests on Honest DiD alone.
- **No sensitivity analysis for synthetic control or TBR that reports a breakdown value**; only tests and a simulated stress test. Conformal/"honest" SC inference is not ingested.
- **E-value and Rosenbaum-bound mechanics are described, not derived**; regression-based tools (Cinelli–Hazlett robustness values, Oster's $\delta$) are absent, so the OVB formula is never turned into a reportable number.
- **PGMM §4 theorems** (Bernstein–von Mises, coverage) are known only from the introduction, as that note's own Gaps section records.
- **Sobol with dependent inputs** (Shapley effects) is not covered, which is what item 3(e) would need to be rigorous.

## Follow-Up Questions

- Can a relative-magnitudes restriction be built for synthetic control, using placebo-period gaps to calibrate $\bar M$ for the post-period gap?
- What prior on $\delta_{post}$ in a Bayesian DiD reproduces $\Delta^{SD}(M)$ coverage, and how does its posterior compare with the FLCI?
- How should an MMM report a breakdown value for "unobserved demand driver correlated with spend", combining the OVB formula with experiment-calibrated priors?
