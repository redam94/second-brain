---
title: Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - topic/propensity-score
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) §3.1-3.3 eq. (1)-(8) pp. 10-13, fn. 9-11; §4 intro, §4.1 eq. (9)-(16), §4.2 eq. (17)-(28), §4.3 pp. 13-20, fn. 12-13"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Local Average Treatment Effects]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Common Support and Overlap]]"
  - "[[Propensity Score and the Balancing Property]]"
used_by:
  - "[[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]]"
  - "[[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]"
  - "[[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]"
aliases:
  - Gordon 2019 Estimators
  - EM PSM STRAT RA IPWRA STRATREG
  - Gordon 2019 ATT Lift Definition
---

# Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators

> [!summary]
> The formal core of Gordon et al. (2019), §3-4. The RCT target is the **ATT**, recovered as ITT divided by the exposure rate under one-sided noncompliance (eq. 5-7). Results are reported as **ATT lift**: the ATT divided by the treated group's counterfactual conversion rate (eq. 8). The observational side discards the control arm, assumes **unconfoundedness + overlap** (strong ignorability, eq. 14-16), and estimates the same ATT with six estimators: exact matching (EM), propensity-score matching (PSM), stratification (STRAT), regression adjustment (RA), inverse-probability-weighted RA (IPWRA) and stratified regression (STRATREG), eq. 17-28. Section 4.3 argues that fully deterministic targeting would remove overlap and leave only regression-discontinuity-style designs, which would need as much platform cooperation as an RCT.

^summary-gordon-et-al-2019-rct-estimands-unconfou

## Overview

Every number in the paper is a comparison between two estimates of the *same* estimand: the experimental lift $\tau_\ell$ and the observational lift $\tau_\ell^m$ for method $m$. This note states the notation and every estimator exactly as written in the paper (eq. 1-28). The derivation of ITT-to-ATT scaling is also covered across sources in [[From ITT to Treatment-on-the-Treated in Ad Experiments]]. Here it is restated in this paper's notation so the source is fully captured.

## Main Content

### 3.1 Definitions and assumptions

> [!definition] Units, assignment, exposure, outcomes (§3.1, eq. 1)
> A study has $N$ users $i=1,\dots,N$ drawn from an infinite population. Assignment $Z_i\in\{0,1\}$ (test = 1). Exposure $W_i(Z_i)\in\{0,1\}$, with $W_i(0)=0$ for every user (control is never exposed), while $W_i(1)$ is endogenous. Covariates $X_i\in\mathbb X\subset\mathbb R^P$ are unaffected by the experiment. Potential outcomes are $Y_i(Z_i,W_i(Z_i))\in\{0,1\}$. Under one-sided noncompliance the observed outcome is
> $$
> Y_i^{obs}=Y_i(Z_i,W_i^{obs})=\begin{cases}Y_i(0,0) & Z_i=0,\ W_i^{obs}=0\\ Y_i(1,0) & Z_i=1,\ W_i^{obs}=0\\ Y_i(1,1) & Z_i=1,\ W_i^{obs}=1\end{cases}\tag{1}
> $$
> Variables carry no study subscript because every analysis is within one study.

^def-g19-po

**Assumptions for the RCT** (§3.1):
1. **SUTVA** (Rubin 1978): one version of treatment and no interference. Single login means no one is shown the wrong arm. Interference could happen if test users shared ads with control users, but users do not know they are in an experiment, and on-platform sharing would be visible. If test users did show control users the ad, estimates would be **conservative** because control conversions would be inflated (fn. 9). See [[Interference and Marketplace Experiments]].
2. **Random assignment**: $Z_i$ is independent of all potential outcomes and both potential treatments. This cannot be tested directly. The randomization checks found nothing against it ([[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]]).
3. **Exclusion restriction** (needed only for the ATT): $Y_i(0,w)=Y_i(1,w)$ for $w\in\{0,1\}$. Assignment affects outcomes only through exposure, which is plausible because users do not know their arm. This lets $Z$ act as an instrument ([[Instrumental Variables]]).

An ITT analysis needs only (1)-(2). The paper uses the **ATT** because the observational methods cannot produce an ITT once the control group has been dropped. Footnote 10 notes that any ITT is conditional on the "entire treatment", which for online ads "includes the advertising platform, including its ad-optimization system".

### 3.2 Causal effects in the RCT

$$
\mathrm{ITT}_Y=E[Y(1,W(1))-Y(0,W(0))]\tag{2}
$$
$$
\widehat{\mathrm{ITT}}_Y=\frac1N\sum_{i=1}^N\big(Y_i(1,W_i^{obs})-Y_i(0,W_i^{obs})\big)\tag{3}
$$
$$
\mathrm{ATT}=E[Y(1,W(1))-Y(0,W(0))\mid W(1)=1]\tag{4}
$$

> [!theorem] ATT as a Wald / IV ratio under one-sided noncompliance (§3.2, eq. 5-7; Imbens & Angrist 1994)
> $$
> \tau=\frac{\mathrm{ITT}_Y}{\mathrm{ITT}_W}=\frac{E[Y(1,W(1))]-E[Y(0,W(0))]}{E[W(1)]-E[W(0)]}\tag{5}
> $$
> With $W_i(0)=0$ for all users and complete randomization, $\mathrm{ITT}_W=E[W(1)]=\pi_{co}$, the share of compliers (test users who are exposed). Split the ITT into compliers and noncompliers:
> $$
> \mathrm{ITT}_Y=\mathrm{ITT}_{Y,co}\,\pi_{co}+\mathrm{ITT}_{Y,nc}\,(1-\pi_{co})\tag{6}
> $$
> The exclusion restriction gives $Y_i(1,0)=Y_i(0,0)$, so $\mathrm{ITT}_{Y,nc}=0$ and
> $$
> \tau\equiv\mathrm{ATT}\equiv\mathrm{ITT}_{Y,co}=\frac{\mathrm{ITT}_Y}{\pi_{co}}.\tag{7}
> $$
> **Conditions:** randomization, SUTVA, exclusion, and one-sided noncompliance (no always-takers and no defiers). Under these the **LATE equals the ATT**.
> **Interpretation:** dividing by $\pi_{co}$ "undilutes" the ITT. The ATT is specific to whoever ends up exposed, so its meaning changes from study to study as targeting changes ([[Local Average Treatment Effects]]).

^thm-g19-att

### 3.3 Lift

> [!definition] ATT lift (§3.3, eq. 8)
> $$
> \tau_\ell=\frac{\Delta\text{ conversion rate due to ads in the treated group}}{\text{conversion rate of the treated group if they had not been treated}}=\frac{\tau}{E[Y^{obs}\mid Z=1,W^{obs}=1]-\tau}\tag{8}
> $$
> The denominator is the estimated counterfactual conversion rate of the exposed users. Lift normalizes across advertisers and outcomes. Its drawback, in the paper's words: "differences between methods can seem large when the treated group's baseline conversion rate is small" (p. 13). ROI is not reported because profit margins are unavailable. ROI is a monotone transform of lift, but decisions often use ROI cut-offs (fn. 11).

^def-g19-lift

### 4 Observational approaches: the thought experiment

The advertiser follows "customary practice by choosing a target sample and making all users eligible to see the ad". Only some of them end up exposed, and the effect is estimated by comparing exposed with unexposed users. "This approach is equivalent to creating a test sample without a control group held out" (§4, p. 13). The methods combine matching, stratification and regression. They are used in academic marketing studies and by industry vendors (§4, pp. 13-14):

| Application of matching (§4, p. 13) | Study cited |
|---|---|
| Internet vs TV advertising for brand building | Draganska, Hartmann & Stanglein (2014), *JMR* 51 |
| Firm-generated social-media content and customer metrics | Kumar, Bezawada, Rishika, Janakiraman & Kannan (2016), *J. Marketing* 80(1) |
| Whether DVR access affects sales of advertised products | Bronnenberg, Dubé & Mela (2010), *JMR* 47(6) |
| Pharmaceutical detailing | Rubin & Waterman (2007), *Statistical Science* 21(2) |
| Mutual-fund name changes and later inflows | Cooper, Gulen & Rau (2005), *J. Finance* 60(6) |
| Alcohol advertising aimed at adolescents | Ellickson, Collins, Hambarsoomians & McCaffrey (2005), *Addiction* 100(2) |

**Industry practice.** "comScore, Nielsen, and Nielsen Catalina Solutions, all rely on matching and regression methods to evaluate various marketing programs" (p. 13). The supporting citations (p. 14) are Abraham (2008, *HBR*, "The off-line impact of online ads"), comScore (2010, press release on its AdEffx Smart Control methodology), Klein & Wood (2013, Nielsen Catalina Solutions and Time Inc. single-source cross-platform report) and Berkovich & Wood (2016, Nielsen discussion paper on single-source data). The authors note that vendor implementations are hard to pin down, but "discussions with several industry experts and public case studies confirm these methods are in active use." **Footnote 13** names two Nielsen Catalina Solutions web case studies as examples, both accessed 7 April 2018: one on a streaming-audio campaign for a toaster-pastry brand, whose URL slug reads "pandora-pop-tarts-groove-to-the-tune-of-3x-roas", and one on "frozen-entrees". The paper gives only the URLs, so the "3x ROAS" figure is the vendor's own claim and the paper does not assess it. More recent methods (covariate-balancing propensity scores, Zubizarreta's optimization-based matching and stable weights, Athey-Imbens-Wager approximate residual balancing) are left for future work (fn. 12). Gordon, Moakler & Zettelmeyer (2023) later ran that follow-up with DML; see [[Experimental Benchmarks for Observational Ad Measurement]].

### 4.1 Observational definitions

The control group is ignored and notation is redefined within the test group:
$$
Y_i(W_i)\equiv Y_i(Z_i=1,W_i)\tag{9}
$$
$$
Y_i^{obs}\equiv Y_i(W_i)=\begin{cases}Y_i(0)&W_i=0\\Y_i(1)&W_i=1\end{cases}\tag{10}
$$
$$
\tau^m=E[Y(1)-Y(0)\mid W=1],\qquad \tau_\ell^m=\frac{\tau^m}{E[Y^{obs}\mid W=1]-\tau^m}\tag{11-12}
$$

> [!definition] Naive exposed-vs-unexposed (EU) estimator (§4.1, eq. 13)
> If $W_i$ were random and independent of $X_i$,
> $$
> \tau^{eu}=E[Y(1)-Y(0)\mid X]=E[Y(1)]-E[Y(0)],\qquad \tau_\ell^{eu}=\frac{E[Y(1)]-E[Y(0)]}{E[Y(0)]}.\tag{13}
> $$
> In practice $\tau^{eu}$ mixes the treatment effect with selection bias. The paper uses it as the naive baseline (Abraham 2008).

^def-g19-eu

> [!definition] Strong ignorability (§4.1, eq. 14-16; Rosenbaum & Rubin 1983b)
> **Unconfoundedness:** $(Y_i(0),Y_i(1))\perp\!\!\!\perp W_i\mid X_i$ (eq. 14). This is "considered the most controversial and is untestable without an experiment" ([[Conditional Independence Assumption]]).
> **Overlap:** $0<\Pr(W_i=1\mid X_i)<1$ for all $X_i\in\mathbb X$ ([[Common Support and Overlap]]).
> **Propensity score:** $e(x)\equiv\Pr(W_i=1\mid X_i=x)$ (eq. 15).
> **Balancing result:** under strong ignorability, $(Y_i(0),Y_i(1))\perp\!\!\!\perp W_i\mid e(X_i)$ (eq. 16). Two users with the same propensity score are as good as randomly exposed ([[Propensity Score and the Balancing Property]]).

^def-g19-ignorability

### 4.2 The six estimators

Throughout, $N_e=\sum_i W_i$ is the number of exposed test users. ATT estimators impute $\widehat{Y_i(0)}$ for exposed users.

> [!definition] (1) Exact matching, EM (§4.2, eq. 17-18)
> For each exposed user $i$, let $\mathcal M_i^c$ be the unexposed users with $X_j^{em}=X_i^{em}$ on a small discrete set $X^{em}\subset X$. In the results this set is **age and gender only**, described as "a naive benchmark used widely in industry".
> $$
> \widehat{Y_i(0)}=\frac1{|\mathcal M_i^c|}\sum_{j\in\mathcal M_i^c}Y_j^{obs},\qquad \hat\tau^{em}=\frac1{N_e}\sum_{i=1}^{N}W_i\big(Y_i(1)-\widehat{Y_i(0)}\big).\tag{17-18}
> $$
> Matching needs no outcome model.

^def-g19-em

> [!definition] (2) Propensity-score matching, PSM (§4.2, eq. 19-20)
> Mahalanobis matching on all of $X$ works poorly with many covariates and is computationally heavy, so the paper matches on the estimated **log-odds** $\ell(x;\phi)=\ln\frac{e(x;\phi)}{1-e(x;\phi)}$, which linearizes the unit interval (Rubin 2001). Matching uses the $M$ nearest unexposed users **with replacement**, which reduces bias, does not depend on sort order and is cheaper to compute. $m^c_{i,k}$ is the index of the $k$-th closest unexposed user by $|e(x_{m^c_{i,k}};\phi)-e(x_i;\phi)|$, and $\mathcal M_i^c=\{m^c_{i,1},\dots,m^c_{i,M}\}$.
> $$
> \widehat{Y_i(0)}=\frac1M\sum_{j\in\mathcal M_i^c}Y_j^{obs},\qquad \hat\tau^{psm}=\frac1{N_e}\sum_{i=1}^{N}W_i\big(Y_i(1)-\widehat{Y_i(0)}\big).\tag{19-20}
> $$
> See [[Matching Methods and Distance Measures]] and [[Matching Algorithms and Caliper]].

^def-g19-psm

> [!definition] (3) Stratification on the propensity score, STRAT (§4.2, eq. 21-23)
> Split the range of the linearized score into $J$ intervals $[b_{j-1},b_j)$ and let $B_{ij}=\mathbb 1\{b_{j-1}<\ell(x_i,\phi)\le b_j\}$ (eq. 21). Stratum counts are $N_{wj}=\sum_i\mathbb 1\{W_i=w\}B_{ij}$.
> $$
> \hat\tau_j^{strat}=\frac1{N_{1j}}\sum_iW_iB_{ij}Y_i-\frac1{N_{0j}}\sum_i(1-W_i)B_{ij}Y_i,\qquad \hat\tau^{strat}=\sum_{j=1}^J\frac{N_{1j}}{N_1}\hat\tau_j^{strat}.\tag{22-23}
> $$
> Strata are weighted by their share of treated users, which is what makes this an ATT.

^def-g19-strat

> [!algorithm] Data-driven strata (§4.2, after eq. 23; Imbens & Rubin 2015)
> The paper does not use Cochran's (1968) rule of $J=5$ equal-sized strata or Eckles & Bakshy's (2017) rule of growing $J$ with $n$. It uses:
> 1. Start with the full sample as one stratum.
> 2. Propose splitting a stratum at its **median** propensity score.
> 3. Accept the split if the two halves have **significantly different average propensity scores**.
> 4. Recurse until the $t$-statistic comparing the halves falls below a threshold, or a new stratum would fall below a minimum sample size.
>
> The result is more and narrower strata where propensity scores vary most, which is where they help most.

^alg-g19-strata

> [!definition] (4) Regression adjustment, RA (§4.2, eq. 24-26)
> The simplest version is $Y_i^{obs}=\alpha+\beta'X_i+\tau^{reg}W_i+\varepsilon_i$ (eq. 24). More generally, let $\mu_w(x)=E[Y^{obs}\mid W=w,X=x]$ (eq. 25). For the ATT only $\mu_0$ is needed: fit $\mu_0(X_i;\beta_0)=\beta_0'X_i$, with flexible functions of $X_i$, on unexposed users, then
> $$
> \hat\tau^{ra}=\frac1{N_e}\sum_{i=1}^NW_i\big[Y_i^{obs}-\mu_0(X_i;\hat\beta_0)\big].\tag{26}
> $$
> If the covariate distributions of exposed and unexposed users differ a lot, $\mu_0$ is extrapolating and the estimate is likely biased ([[Logic of Regression Adjustment]]).

^def-g19-ra

> [!definition] (5) Inverse-probability-weighted regression adjustment, IPWRA (§4.2)
> The outcome model is fit with propensity weights (Hirano, Imbens & Ridder 2003):
> $$
> \min_{\{\phi,\beta\}}\sum_{i=1}^N W_i\,\frac{(Y_i-\mu_0(X_i;\beta_0))^2}{1-e(X_i;\phi)}
> $$
> (as printed in the paper; see the note below), then eq. 26 with $\hat\beta_0$ gives $\hat\tau^{ipwra}$. The estimator is **doubly robust** (Robins & Ritov 1997): consistent if either the propensity model or the outcome model is correctly specified. Exposure model, outcome model and ATT are estimated jointly by two-step GMM, which gives efficient estimates and robust SEs (Wooldridge 2007). See [[Q - The Common Structure of Doubly-Robust Estimators]] and [[Bayesian Inverse Probability Weighting]].
>
> *Reader's note:* $\mu_0$ is the untreated-outcome model, so it would normally be fit on unexposed users ($1-W_i$) with ATT odds weights $e/(1-e)$. The objective above is transcribed exactly as printed in the working paper.

^def-g19-ipwra

> [!definition] (6) Stratification + regression, STRATREG (§4.2, eq. 27-28)
> Recommended by Imbens (2015) and Eckles & Bakshy (2017). Use the recursive strata above, then run a regression within each stratum $j$:
> $$
> Y_i=\alpha_j+\tau_j^{stratreg}W_i+\beta_j'X_i+\varepsilon_i,\qquad \hat\tau^{stratreg}=\sum_{j=1}^J\frac{N_{1j}}{N_T}\tau_j^{stratreg}.\tag{27-28}
> $$
> ($N_T$ in eq. 28 is the same treated total written $N_1$ in eq. 23.) Within a stratum the covariates are roughly balanced, so the regression extrapolates less and removes leftover imbalance.

^def-g19-stratreg

### 4.3 Alternative methods and the limit of deterministic targeting

- Each method tries "to find and isolate the random variation that exists in the data, while conditioning on the endogenous variation".
- **Critique.** Targeting systems aim to make exposure *deterministic*. If the analyst observed the platform's exact data and decision rule, "the propensity score distribution would collapse to discrete masses at 0 and 1". Common support would disappear, and every matching method and every regression that needs support would fail ([[Propensity Score Matching - Balancing Theorem and Failure Modes]]).
- **Regression discontinuity.** With fully deterministic targeting, identification would have to come from something like an RD design comparing near-identical users on either side of the targeting rule ([[Regression Discontinuity Designs]]). That needs the platform's full data and rule. The authors argue RD is unlikely to be more popular than RCTs, since advertisers avoid RCTs partly because they need platform cooperation, and "if a platform had the sophistication to run an RD design, it would probably also have the sophistication to implement RCTs" (p. 19).
- **Current reality.** Targeting is not yet fully deterministic. Quasi-random exposure still comes from visit timing, pacing, and remaining campaign budget (§4.3 names budget where §1 names unrelated bids), so the methods "need not fail". But "as ad-targeting systems become more sophisticated, such failure is increasingly likely" (p. 20).

## Examples

> [!example] Computing every estimand for Study 4 (§7.1-7.2 numbers in this note's formulas)
> Inputs: control conversion rate 0.033%, test 0.045%, exposure share $\pi_{co}=37\%$, exposed-in-test rate 0.079%, unexposed-in-test rate 0.025%. Rates are scaled by a random constant (§7).
> 1. $\widehat{\mathrm{ITT}}_Y=0.045-0.033=0.012$ pp; ITT lift $=0.012/0.033\approx 38\%$ (Table 3 reports 37.7%).
> 2. $\hat\tau=0.012/0.37\approx0.033$ pp (eq. 7).
> 3. Counterfactual rate of the exposed $=0.079-0.033=0.046\%$; $\hat\tau_\ell=0.033/0.046\approx 73\%$ (eq. 8; reported 72.8%, 95% CI [49%, 103%]).
> 4. Footnote 20 checks this: the unexposed-in-test rate (0.025%) is assumed equal to what the would-be-unexposed in control did. The control mean 0.033% is a 63/37 mixture of 0.025% and 0.046%: $0.63(0.025)+0.37(0.046)\approx0.033$.
> 5. Naive EU lift (eq. 13): §7.2 states that the exposed and unexposed conversion rates "was 0.061% and 0.019%, respectively, implying an ATT lift of 316%". *Reader's check:* plugging those two rounded rates into eq. 13 gives $(0.061-0.019)/0.019\approx221\%$, and Table 4's 0.079%/0.025% gives $\approx216\%$. Neither matches 316%. Because the reported conversion rates are masked by a random scaling constant (§7), the paper's 316% (also used in Fig. 8, Fig. 11 and Table 6) should be taken as the authoritative figure, with the quoted rates illustrative only.

^exa-g19-rct-estimands-unconf-1

## Connections

- Eq. 5-7 is the standard Wald/LATE argument from [[Instrumental Variables]] and [[Local Average Treatment Effects]], and [[Instrumental Variables and Principal Stratification]] treats it in principal-stratum language.
- STRAT and STRATREG are close relatives of [[Poststratification]] and subclassification, applied to an estimated score.
- These six estimators remove bias only from *observed* confounders. What happens when unobserved ones remain is the subject of [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]] and [[Sensitivity Analysis in Observational Studies]].
- The later DML benchmark keeps the same estimand and lift definition: [[Experimental Benchmarks for Observational Ad Measurement]], [[DML Estimators for ATE and the Interactive Model]].
- Choosing among six estimators and four covariate sets is itself analytic flexibility; see [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]].

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]] — how $e(x;\phi)$ is estimated and how $\tau_\ell$ vs $\tau_\ell^m$ is tested.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — the ITT/ATT precision trade-off across sources.
- [[Propensity Score Matching - Overview]], [[Covariate Balance and Matching Diagnostics]].
