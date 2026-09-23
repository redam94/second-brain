---
title: "Q: Doubly-robust estimation appears in the vault as AIPW, the DML interactive-model score, the Callaway–Sant'Anna doubly-robust ATT(g,t), SDID's double robustness, the X-learner and weighted conformal prediction. What is the common structure, and in what sense is each one 'doubly' robust?"
tags:
  - type/qa
  - topic/causal-inference
  - topic/econometrics
  - topic/treatment-effects
  - topic/machine-learning
  - topic/bayesian-statistics
date_asked: 2026-09-18
answered_from:
  - "[[Frequentist Causal Estimation]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Neyman Orthogonality]]"
  - "[[Doubly-Robust Estimands for ATT(g,t)]]"
  - "[[SDID vs DiD vs Synthetic Control]]"
  - "[[X-Learner]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
  - "[[A-learning and Robustness]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Conformal Prediction Under Covariate Shift]]"
  - "[[Bayesian Inverse Probability Weighting]]"
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Bayesian Outcome Models]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Propensity Score and the Balancing Property]]"
  - "[[Common Support and Overlap]]"
  - "[[Synthetic Control Extensions]]"
related_questions:
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
aliases:
  - common structure of doubly robust estimators
  - model vs rate double robustness
  - is there a Bayesian doubly robust estimator
---

# Doubly-robust estimation appears in the vault as AIPW, the DML interactive-model score, the Callaway–Sant'Anna doubly-robust ATT(g,t), SDID's double robustness, the X-learner and weighted conformal prediction. What is the common structure, and in what sense is each one "doubly" robust?

> [!summary]
> Every genuinely doubly-robust procedure in the vault has the same skeleton: a **model-based prediction plus a weighted average of that model's residuals**, arranged so the leading error is a **product** (error of the outcome-type nuisance) $\times$ (error of the weight-type nuisance). "Doubly" then means one of three different things: **model DR** (consistent if *either* nuisance is correctly specified — AIPW, Callaway–Sant'Anna, A-learning), **rate DR** ($\sqrt N$-normal if the *product* of the two ML error rates is $o(N^{-1/2})$ — DML, and in function-valued form the R-learner and locally-centered GRF), or **SDID's balancing DR** (bias vanishes if *either* the unit weights or the time weights balance the latent factors). Weighted conformal prediction is doubly robust for **coverage**, by a different mechanism; the **X-learner is not doubly robust at all**, despite using both outcome models and a propensity score; and a dogmatically Bayesian analysis has **no** DR analogue, because the propensity score drops out of the likelihood.

## Answer

### 1. The shared skeleton

The template is the AIPW estimator of [[Frequentist Causal Estimation#^def-dr]]: $\hat\tau^{\text{DR}}=\hat\tau^{\text{reg}}+N^{-1}\sum_i\big[Z_iR_i/e(X_i)-(1-Z_i)R_i/(1-e(X_i))\big]$ with $R_i=Y_i-\hat\mu_{Z_i}(X_i)$. [[DML Estimators for ATE and the Interactive Model]] writes the same thing as a score,

$$
\psi(W;\theta,\eta)=\big(g(1,X)-g(0,X)\big)+\frac{D\,(Y-g(1,X))}{m(X)}-\frac{(1-D)(Y-g(0,X))}{1-m(X)}-\theta ,
$$

and [[Neyman Orthogonality]] explains where it comes from: "orthogonal score = original score + influence-function adjustment" — the plug-in $g(1,X)-g(0,X)-\theta$ plus the correction for having estimated $g$.

*Synthesis (algebra not written out in any one note, but implied by the DML note's "the second-order term is a cross-product $\delta_m\times\delta_g$"):* evaluate the treated-arm part of the score at arbitrary fixed $(g,m)$ and take expectations using $\mathbb E[D\mid X]=m_0$:

$$
\mathbb E\Big[g(1,X)+\tfrac{D(Y-g(1,X))}{m(X)}\Big]-\mathbb E[g_0(1,X)]=\mathbb E\Big[\big(g_0(1,X)-g(1,X)\big)\,\frac{m_0(X)-m(X)}{m(X)}\Big].
$$

That single product is the whole story. Read it three ways:

| Reading of the product $(g_0-g)\times(m_0-m)$ | Name | Statement in the vault |
|---|---|---|
| Either factor is *identically zero* | **Model double robustness** | "consistent if *either* the propensity score model *or* the outcome model is correctly specified" ([[Frequentist Causal Estimation#^thm-double-robustness]]) |
| Its derivative in each factor is zero at the truth | **Neyman orthogonality** | $\partial_\eta\mathbb E_P\psi(W;\theta_0,\eta_0)[\eta-\eta_0]=0$; first-order insensitivity to both nuisances ([[Neyman Orthogonality]]) |
| Both factors shrink and the product is $o(N^{-1/2})$ | **Rate double robustness** | $\lVert\hat m_0-m_0\rVert_{P,2}\times\lVert\hat g_0-g_0\rVert_{P,2}\le\delta_NN^{-1/2}$ (Theorem 5.1 of the DML note) |

[[Neyman Orthogonality]] says it directly: double robustness and orthogonality "are two faces of the same product-form remainder."

### 2. Model DR versus rate DR

These are different guarantees for different workflows.

- **Model DR** is a statement about *parametric misspecification*: fit a logit and an OLS, one may be wrong forever, and the estimator is still consistent. It says nothing about the rate or the standard errors when one model is wrong.
- **Rate DR** is a statement about *regularised ML learners that are both right in the limit but slow*. With both nuisances at $N^{-0.35}$ and $N=10{,}000$, a non-orthogonal score carries bias of about four standard-error units, the orthogonal one about $0.16$ ([[Neyman Orthogonality]], numerical intuition). The trade-off is explicit in Remark 5.2: with sparsity indices $s_g,s_m$ the requirement is $s_gs_m\ll N$, "much weaker than $(s_g)^2+(s_m)^2\ll N$" — a very sparse propensity buys a dense outcome regression and vice versa. It needs [[Cross-Fitting and Sample Splitting|cross-fitting]] as the second ingredient, and delivers more than consistency: uniform $\sqrt N$-normality and Hahn's efficiency bound.
- **Known design collapses both.** When $m_0$ is known (an RCT), the second derivative vanishes and "only consistency of $\hat g_0$ is needed"; the outcome model becomes pure variance reduction (Pennsylvania bonus example, where every learner gives $-0.07$ to $-0.085$).

### 3. Each appearance, side by side

| Appearance | Outcome-type nuisance | Weight-type nuisance | Sense of "doubly" | What is protected |
|---|---|---|---|---|
| AIPW ([[Frequentist Causal Estimation]]) | $\mu_z(x)$ | $e(x)$ | Model DR | Consistency of the PATE |
| DML interactive model ([[DML Estimators for ATE and the Interactive Model]]) | $g_0(D,X)$ | $m_0(X)$ | Rate DR (product rate) + orthogonality | $\sqrt N$-normal, efficient ATE / ATTE / LATE |
| Callaway–Sant'Anna ([[Doubly-Robust Estimands for ATT(g,t)]]) | $m_{g,t,\delta}(X)=\mathbb E[Y_t-Y_{g-\delta-1}\mid X,\text{comparison}]$ | generalized propensity $p_g(X)$ | Model DR (logit + OLS in practice) | Consistency of each $ATT(g,t)$ under *conditional* parallel trends |
| A-learning ([[A-learning and Robustness]]) | baseline $h_k=Q_k(\cdot,0)$ | propensity $\pi_k$ | Model DR, *conditional on a correct contrast $C_k$* | Consistency of the optimal-regime parameters $\psi_k$ |
| R-learner, GRF local centering ([[R-Learner and Orthogonal CATE Estimation]], [[Generalized Random Forests - Local Moment Equations]]) | $m^*(x)=\mathbb E[Y\mid X]$ | $e^*(x)$ | Rate-type (quasi-oracle): both at $o(n^{-1/4})$ | Oracle regret for the *function* $\tau(\cdot)$ |
| SDID ([[SDID vs DiD vs Synthetic Control]]) | time weights $\hat\lambda$ (a regression of post on pre) | unit weights $\hat\omega$ (a regression of treated on controls) | Balancing DR over *latent factors* | Bias $B(\omega,\lambda)\approx0$ under $Y=L+W\circ\tau+E$ |
| Weighted split-CQR ([[Conformal Inference for Counterfactuals and ITEs]]) | conditional quantiles $\hat q_\beta(x)$ | $1/\hat e(x)$ likelihood-ratio weights | Either-or, for **coverage** | $\lim\mathbb P(Y(1)\in\hat C(X))\ge1-\alpha$ |
| X-learner ([[X-Learner]]) | $\hat\mu_0,\hat\mu_1$ | $g(x)=e(x)$ as mixing weight | **None** | — |

Notes on the rows that differ from plain AIPW:

**Callaway–Sant'Anna.** Theorem 1 shows OR, IPW and DR estimands are *identical as identification targets* and differ only once nuisances are fitted. The DR estimand is literally (treated weight $-$ propensity-odds comparison weight) $\times$ (long difference $-$ outcome regression) — weights times residuals. The DML note identifies its ATTE score (5.4) as the cross-sectional analogue, which is what would license ML nuisances. What is made robust is covariate adjustment *inside* parallel trends, not parallel trends itself.

**SDID.** The bias can be grouped as a unit-weighted contrast of time-regression residuals or a time-weighted contrast of unit-regression residuals, so it vanishes if either regression "fits and generalises"; "even if neither model generalizes sufficiently well on its own, it suffices for one model to predict the generalization error of the other." The authors themselves liken this to AIPW, and the equivalence with augmented synthetic control (linear $\hat m(Y_{i,pre})=\hat\lambda_0+Y_{i,pre}\hat\lambda_{pre}$) shows the mapping: **time weights play the outcome model, unit weights play the propensity/balancing weights** ([[Synthetic Control Extensions]] gives the same "SC applied to regression residuals" form). What is different: the nuisances are functions of a *latent* matrix $L$, not of observed $X$; there is no correct-specification statement, only an untestable one ("essentially an assumption of no unexplained confounding"); and the asymptotics need $N_{co},T_{pre}\to\infty$.

**Weighted conformal.** Theorem 1 of Lei & Candès is an either-or result (A1: $1/\hat e$ consistent; A2: quantiles consistent), but the mechanism is not a product-form bias. If the weights are right, Proposition 1 gives coverage "uniform over all $P_{Y\mid X}$ and all quantile learners"; if the quantiles are right, $0$ is approximately the $(1-\alpha)$ quantile of *any* reweighting of the scores, so the weights stop mattering. With wrong weights and arbitrary quantiles the loss is bounded by $\Delta_w=\tfrac12\mathbb E\lvert\hat w-w\rvert$. The authors stress that "consistency of point estimates and coverage of interval estimates are different concepts." The weights are the same propensity odds as in IPW ([[Conformal Prediction Under Covariate Shift]], [[Propensity Score and the Balancing Property]]); the object protected is different.

**X-learner — looks similar, is not.** It fits both outcome models, cross-imputes $\tilde D_i^1=Y_i-\hat\mu_0(X_i)$ and $\tilde D_i^0=\hat\mu_1(X_i)-Y_i$, and combines $\hat\tau^X=g\hat\tau_0+(1-g)\hat\tau_1$ with $g=e(x)$. The propensity here is a *variance-driven mixing weight* ("the better-estimated CATE component dominates"), not a residual reweighting, and the vault's X-learner note never claims double robustness — its guarantee is a minimax rate $m^{-a_\tau}+n^{-a_0}$. [[R-Learner and Orthogonal CATE Estimation]] records Nie & Wager's counterexample: shift $\hat\mu_{(0)}$ down and $\hat\mu_{(1)}$ up by $c/n^{0.25+\xi}$ and $\hat\tau^X$ moves by exactly that amount — first-order sensitivity. *Synthesis:* this is immediate from the combination rule, since the shift contributes $e\cdot c+(1-e)\cdot c=c$ whatever $e$ is. The doubly-robust CATE estimators in the vault are the R-learner and locally-centered GRF; the "DR-learner" is mentioned once in [[Frequentist Causal Estimation]] but has no note.

### 4. Is there a Bayesian analogue?

Strictly, no. Under ignorability and prior independence the assignment model factors out, so "the Bayesian posterior for causal estimands depends *only on the outcome model*" ([[Propensity Score in Bayesian CI]]); Robins, Hernán & Wasserman: "Bayesian inference must ignore the propensity score" ([[Bayesian Inverse Probability Weighting]]). A pure Bayesian analysis is therefore **singly robust by construction**, and the failure mode has a Bayesian name — **regularization-induced confounding**, where shrinkage priors on nuisance coefficients "effectively remove confounding regardless of what the data say" ([[Bayesian Outcome Models#^warn-reg-confounding]]); BART is also "overconfident in poor overlap regions" ([[Bayesian Outcome Models#^ex-41]]).

What the vault offers instead:

| Device | What it is | DR status |
|---|---|---|
| Liao–Zigler Bayesian IPW | Posterior draws of $e(x)$, weighted outcome fit per draw, Rubin's rules (SE $1.02$ vs naive $0.66$) | **Not DR.** Propagates propensity uncertainty; still singly robust on the propensity side, and "only quasi-Bayesian" |
| $\hat e(X)$ as a covariate, $\mu(z,x,\hat e(x))$; BCF | Outcome regression on propensity strata | Called "Bayesian double robustness" (Wang 2012; Saarela 2016): redundant if the outcome model is right, balancing if it is wrong. A robustness *heuristic* — no product-rate theorem; two-stage, and joint fitting has the **feedback problem** |
| Dependent priors | Link $\theta_Z,\theta_Y$ a priori; Zigler–Dominici recovers Hájek IPW as a posterior mean | Bayesian justification of IPW, not DR; "no general recipe" |
| Posterior-predictive plug-in (Ding & Liu) | Draw both models, push draws through $\hat\tau^{\text{DR}}$ | Inherits frequentist DR; "not dogmatically Bayesian" |
| Bayesian bootstrap | DR as an M-estimation problem under a Dirichlet-process prior ([[General Structure of Bayesian CI]]) | DR with Bayesian uncertainty, but gives up informative priors |

So the honest summary: the Bayesian analogue of double robustness is **design-stage use of the propensity score plus a flexible outcome prior**, or a hybrid that feeds posterior draws into a frequentist DR functional. None of these makes the posterior itself doubly robust.

### 5. What "doubly robust" never buys

1. **Identification.** Unconfoundedness, conditional parallel trends, or SDID's no-unexplained-confounding are assumed, not protected: "ML on $X$ cannot fix a missing confounder."
2. **Overlap.** $1/\hat m$ enters the score; "a highly predictive $\hat m$ is not 'good': it signals limited overlap" ([[Common Support and Overlap]]). Conformal is the one method that fails loudly — the interval becomes $(-\infty,\infty)$ where $e(x)=0$.
3. **Both wrong.** No guarantee; in the A-learning simulations "neither dominates uniformly."
4. **Free efficiency.** A-learning pays an efficiency price when everything is right; SDID's unequal weights "may worsen the precision" on pure-noise panels.

### Practical Implications

- **User-level ad experiments (known randomisation).** Use cross-fit AIPW with the *design* propensity. Any consistent outcome learner is enough, the CI is $\hat\sigma/\sqrt N$, and weighted-CQR ITE intervals are finite-sample exact. Here DR is a precision device, not a bias device.
- **Observational exposure data (ad targeting).** Rate DR is the relevant notion: cross-fit, clip $\hat m$ (the DML sketch uses $0.01$), and read a near-perfect exposure classifier as a warning about overlap rather than a success. Report how much the estimate moves across learners, as in the 401(k) table.
- **Staggered geo roll-outs with covariates.** Callaway–Sant'Anna DR per $(g,t)$, then aggregate. Remember its robustness is over *covariate adjustment* only.
- **Hand-picked geo tests.** SDID's double robustness is over latent market factors; it is why SDID is roughly unbiased where DiD is "visibly off-centre", and under random assignment it is simply more precise (RMSE $0.024$ vs $0.044$).
- **Bayesian MMM.** *Synthesis:* an MMM is an outcome-model-only analysis, so it sits in the singly-robust column and is exposed to regularization-induced confounding whenever shrinkage priors are put on control variables that also drive spend. The closest available safeguards are (i) residualising spend on its drivers as a sensitivity fit — the PLR/GRF local-centering moment accepts continuous treatments — and (ii) anchoring with experiments, where the assignment mechanism is known.
- **Checklist.** (a) Which two nuisances? (b) Is the remainder a product of their errors, or is one of them merely a mixing weight (X-learner)? (c) Parametric fits → claim model DR; ML fits → cross-fit and claim rate DR. (d) Is the design known? Then the outcome model only buys precision. (e) What is protected — a point estimate, a function, or coverage? (f) Check overlap before anything else.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Frequentist Causal Estimation]] | AIPW definition; either-or theorem |
| [[DML Estimators for ATE and the Interactive Model]], [[Neyman Orthogonality]] | AIPW as orthogonal score; product-rate condition; known-propensity case |
| [[Doubly-Robust Estimands for ATT(g,t)]] | OR / IPW / DR estimands for staggered DiD |
| [[SDID vs DiD vs Synthetic Control]], [[Synthetic Control Extensions]] | Two groupings of the bias; ASCM equivalence; untestable-assumption caveat |
| [[A-learning and Robustness]] | DR conditional on a correct contrast; efficiency price |
| [[X-Learner]], [[R-Learner and Orthogonal CATE Estimation]] | Propensity as mixing weight; quasi-oracle property; counterexample |
| [[Generalized Random Forests - Local Moment Equations]] | Local centering; continuous treatments |
| [[Conformal Inference for Counterfactuals and ITEs]], [[Conformal Prediction Under Covariate Shift]] | Double robustness of coverage; $\Delta_w$ bound; propensity-odds weights |
| [[Bayesian Inverse Probability Weighting]], [[Propensity Score in Bayesian CI]] | Why weights are not in the likelihood; Liao–Zigler; three strategies; feedback problem |
| [[Bayesian Outcome Models]], [[General Structure of Bayesian CI]] | Regularization-induced confounding; BCF; Bayesian bootstrap |
| [[Propensity Score and the Balancing Property]], [[Common Support and Overlap]] | The weight-side nuisance and positivity |
| Chernozhukov 2018 - Double Debiased Machine Learning | §5.1, Theorem 5.1, Remark 5.2 |
| Arkhangelsky 2021 - Synthetic Difference in Differences | §4.2, p. 23 |
| Lei Candes 2020 - Conformal Inference of Counterfactuals and ITEs | Proposition 1, Theorem 1 |
| Li et al. - 2022 - Bayesian causal inference a critical review | §5, pp. 10–13 |

## Related Concepts

- [[Cross-Fitting and Sample Splitting]] — the second ingredient that turns orthogonality into rate DR
- [[Regularization Bias and the Partially Linear Model]] — the single-robust failure that motivates the product form
- [[Sensitivity Analysis in Observational Studies]] — what to do about the assumption DR does not protect
- [[Simultaneous Inference via Multiplier Bootstrap]] — inference built on the DR influence function for $ATT(g,t)$
- [[SDID for Geo Experiments and Marketing Panels]] — the applied reading for geo lift
- [[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]] — where the X- and R-learners sit among CATE methods
- [[Q - Covariate Adjustment for Precision vs Identification]] — the known-design case where the outcome model is only a precision device

## Gaps

- **No DR-learner note.** [[Frequentist Causal Estimation]] points to a "DR-learner" in [[Metalearners for CATE]], but that note covers only S-, T- and X-learners. The pseudo-outcome regression that *is* the doubly-robust CATE metalearner is missing.
- **No TMLE or general semiparametric-efficiency note**; efficient influence functions appear only through [[Neyman Orthogonality]].
- **Continuous-treatment DR** (generalized propensity score, dose-response) is absent — the case that matters for media spend. Only the PLR/GRF partialling-out moment covers continuous $D$.
- **Bayesian DR is second-hand**: Wang et al., Saarela et al., Ding & Liu and the Bayesian bootstrap are one-paragraph summaries from the Li et al. review; no worked example.
- **Both-models-wrong behaviour** (the Kang & Schafer debate) is only name-checked in the conformal note.
- **Conformal DR**: the vault records the either-or theorem and the $\Delta_w$ bound but no product-type bound, so whether coverage error is second order is not answered here.
- **SDID**: the formal conditions under which "one regression predicts the generalization error of the other" are stated only informally.

## Follow-Up Questions

- What does the DR-learner pseudo-outcome look like, and how does it compare with the R-learner under weak overlap?
- Can a geo-level Bayesian MMM be given a design-stage "spend propensity" in the spirit of BCF's $\hat e(X)$ covariate, and does it reduce regularization-induced confounding?
- How do Callaway–Sant'Anna DR estimates change when the logit/OLS nuisances are replaced by cross-fit ML?
- Is there a doubly-robust correction for a simulator: ABM prediction plus weighted residuals from experimental cells?
