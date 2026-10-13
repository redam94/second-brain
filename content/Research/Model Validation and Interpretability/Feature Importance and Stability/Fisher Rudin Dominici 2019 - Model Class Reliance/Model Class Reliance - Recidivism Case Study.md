---
title: Model Class Reliance - Recidivism Case Study
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/fairness
  - type/example
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§1 p. 3; §10 pp. 38-40; §10.1 p. 40 (Fig. 8 p. 41); §10.2 pp. 40-42"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Class Reliance for Linear and RKHS Model Classes]]"
  - "[[Model Class Reliance - Binary Search Computation]]"
  - "[[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]"
used_by:
  - "[[Model Class Reliance - Discussion, Limitations and Extensions]]"
aliases:
  - COMPAS Model Class Reliance Analysis
  - Broward County MCR Analysis
  - MCR for Proprietary Black-Box Models
---

# Model Class Reliance - Recidivism Case Study

> [!summary]
> The authors use MCR to bound how much the proprietary COMPAS violent-recidivism score relies on race and sex, or their unmeasured proxies. They use the public Broward County data (3,373 African-American or Caucasian defendants) and a flexible RBF-kernel regression class fit to *predict the COMPAS score*. **Inadmissible (race, sex):** $\widehat{MR}(f_{\text{ref}})=1.09$, AR $=0.94$, MCR $=[1.00,1.56]$, 95% bootstrap CI $[1.00,1.73]$. **Admissible (age, number of priors, felony indicator):** $\widehat{MR}=2.78$, AR $=1.87$, MCR $=[1.77,3.61]$, CI $[1.62,3.96]$. The key assumption: the class contains a good model whose reliance matches COMPAS's (the analogue of Condition 20). Under it, if COMPAS relied on race, sex or proxies by a factor above 1.73, intervals this low would occur with probability below 0.05.
^summary

## Overview

**Why MCR fits this problem (§1 p. 3; §10 pp. 38-39).** COMPAS is proprietary, so it cannot be inspected directly, but its predictions are public. MCR lets the analyst *drop the assumption that COMPAS lies in the model class*. Instead it assumes the class contains *some* well-performing model that relies on the variables as much as COMPAS does. Then the MCR interval contains COMPAS's reliance. (Provenance: COMPAS was developed by Northpointe Inc., which in 2017 joined Courtview Justice Solutions and Constellation Justice Systems under the name Equivant; §1 p. 3.)

> [!example] Opening context of §10 (pp. 38-39)
> 1. **Human bias.** Evidence suggests bias among judges and prosecutors (Spohn 2000; Blair et al. 2004; Paternoster & Brame 2008).
> 2. **Risk tools as the remedy.** Partly to counter this, recidivism prediction models increasingly inform decisions on **pretrial release, sentencing and parole** (Monahan & Skeem 2016; Picard-Fritsche et al. 2017). Ideally they avoid human bias and give judges empirically tested tools.
> 3. **Two channels for bias in the models.** If arrest rates across demographic groups do not reflect underlying crime rates (Beckett et al. 2006; Ramchand et al. 2006; U.S. DOJ Civil Rights Division 2016), bias enters through (i) the **outcome**, future crime, which is measured imperfectly via arrests or convictions, and (ii) the **covariates**, which include the number of prior convictions (Corbett-Davies et al. 2016; Lum & Isaac 2016).
> 4. **Opacity.** A black-box model "can evade scrutiny" and cannot offer recourse or explanations to people rated "high risk".
> 5. **Focus: transparency.** COMPAS is known not to use race *explicitly*, but there is concern that it relies on race *implicitly* through proxies, i.e. variables statistically dependent with race (Larson et al. 2016; Corbett-Davies et al. 2016; see also §11).
>
> The goal is therefore to bound how much COMPAS relies on covariate subsets, explicitly or implicitly, under stated assumptions.
^ex-sec10-context

## Main Content

> [!example] Setup of the COMPAS analysis (§10, pp. 39-40)
> **Data.**
> - Broward County, Florida defendants with recorded COMPAS scores (Larson et al. 2016).
> - Restricted to defendants recorded as African-American or Caucasian, $n=3{,}373$, "due to sparseness in the remaining categories."
>
> **Variables.**
> - **Outcome $Y$:** the COMPAS violent recidivism *score*, not actual recidivism.
> - **"Admissible" variables:** age, number of priors, and whether the current charge is a felony.
> - **"Inadmissible" variables:** race and sex.
> - The labels are explicitly "not intended to be legally precise".
>
> **Loss.** Squared error $\{y-f(x_1,x_2)\}^2$.
>
> **Model class.** $\mathcal F_{\mathbf D,r_k}$ of Eq 7.6 ([[Model Class Reliance for Linear and RKHS Model Classes#^def-rkhs-class]]), built from a training subset $S$ of 500 observations:
> - $\mathbf D$ = covariate matrix of $S$;
> - $\mu$ = mean of $Y$ in $S$;
> - $k$ = RBF kernel $k_{\sigma_s}(x,\tilde x)=\exp(-\|x-\tilde x\|^2/2\sigma_s)$, with $\sigma_s$ minimizing the CV loss of a Nadaraya-Watson kernel regression on $S$;
> - $r_k$ chosen by CV on $S$.
>
> **Threshold and reference.** $\epsilon=0.1\times$ the CV loss on $S$. $f_{\text{ref}}\in\mathcal F_{\mathbf D,r_k}$ is trained on $S$.
>
> **Evaluation.** On the held-out **2,873** observations:
> - $\widehat{MR}(f_{\text{ref}})$, empirical MCR via the §6 binary search (QP1QC steps), and bootstrap CIs as in §9.2;
> - **AR**: train models from $\mathcal F_{\mathbf D,r_k}$ on $S$ with and without each variable group, and compare held-out losses.
^ex-compas-setup

> [!theorem] Results (§10.1, p. 40)
> | Variable group | $\widehat{MR}(f_{\text{ref}})$ | AR | Empirical MCR | 95% bootstrap CI for MCR |
> |---|---|---|---|---|
> | Inadmissible (race, sex) | 1.09 | 0.94 | [1.00, 1.56] | [1.00, 1.73] |
> | Admissible (age, priors, felony) | 2.78 | 1.87 | [1.77, 3.61] | [1.62, 3.96] |
>
> - **Inadmissible.** Every model in $\mathcal F_{\mathbf D,r_k}$ with empirical loss within $\epsilon$ of $f_{\text{ref}}$ loses at most 56% more accuracy when race and sex are permuted. Neither AR nor MR can make such a statement, because they do not upper-bound the reliance of good models. Under the assumptions, "if COMPAS relied on sex, race, or their unmeasured proxies by a factor greater than 1.73, then intervals as low as what we observe would occur with probability < 0.05."
> - **Admissible.** Symmetrically, reliance below 1.77 would make intervals this high unlikely (p < 0.05). This is consistent with Rudin et al. (2019), who find age highly predictive of the COMPAS score.
> - **AR versus MR.** The paper describes AR (0.94 inadmissible, 1.87 admissible) as "roughly in agreement with MR" (1.09 and 2.78) (p. 40). Both single-number methods rank the admissible group well above the inadmissible group. Neither gives an upper bound over all good models, which is the gap MCR fills.
> - **Conclusion.** Race and sex play "somewhere between a null role and a modest role" in determining the COMPAS score, and they are less important than the admissible factors.
^thm-compas-results

**Two technical caveats in the results (p. 40).**
1. **The upper limit 3.61 is a global cap, not just a Rashomon cap.** It maximizes empirical MR across *all* models in $\mathcal F_{\mathbf D,r_k}$ (Eq 6.5, [[Model Class Reliance - Binary Search Computation#^thm-lemma13]]). The regularization constraint makes it impossible to perform arbitrarily badly on perturbed data while performing well on unperturbed data. So COMPAS's reliance on the admissible variables may be *underestimated* by empirical MCR.
2. **Left truncation at 1.** Both intervals are cut at 1. Concluding that some good model has no reliance is usually precise enough ([[Model Reliance - Permutation Importance as a U-Statistic#^thm-mr-below-one]]).

> [!example] Figure 8 (p. 41): Empirical MR and MCR for the Broward County data
> **Axes.** Empirical MR $\widehat{MR}(f)$ (x, about 1.0-4.0) against empirical loss (y, about 2.4-3.6), with a dotted vertical line at MR = 1. The caption labels the y-axis $\hat e_{\text{stnd}}(f)$, a "standardized" empirical loss. The paper does not define $\hat e_{\text{stnd}}$ anywhere in §10 or the appendices. It is **not** the relative loss $\tilde L=L-L(f_{\text{ref}})$ of App B.1, which would put $f_{\text{ref}}$ at 0, whereas the axis runs from about 2.4 upward. Read it as the empirical squared-error loss on whatever standardized scale the authors used for the regression; the notation is recorded so it is not mistaken for $\hat e_{\text{orig}}$ on the raw COMPAS scale.
>
> **What is plotted.** For each variable group, solid convex "bowls" (grey = inadmissible, blue = admissible) come from the §6 procedure and are guaranteed to contain every model in $\mathcal F_{\mathbf D,r_k}$. Circles mark $f_{\text{ref}}$'s MR for each group. "×" marks are additional models found during the search, showing where each bowl is tight. A dashed horizontal line sits at $f_{\text{ref}}$'s loss plus $\epsilon$. Brackets mark bootstrap CIs for $MCR_-$ and $MCR_+$.
>
> **Purpose.** The procedure tightens each bowl as much as possible near the dashed line.
^fig-8

### Discussion and limitations (§10.2, pp. 40-42)

- **Fairness link.** Asking whether a model relies on sex and race *after adjusting for other covariates* relates to **conditional statistical parity (CSP)**. A decision rule satisfies CSP if its decisions are independent of a sensitive variable conditional on "legitimate" covariates $C$ (Corbett-Davies et al. 2017; Kamiran et al. 2013). Roughly, similar people are treated similarly (Dwork et al. 2012). If COMPAS were uninfluenced by race, sex or related variables conditional on legitimate ones, it would satisfy CSP.
- **CSP's weakness.** The criterion becomes superficial if $C$ includes too many variables, especially proxies for the sensitive variable. Several fairness metrics compete (Kleinberg et al. 2017; Chouldechova 2017; Nabi & Shpitser 2018).
- **Admissible vs. inadmissible is blurry.** Some variables are both legitimate risk predictors and race proxies. Because arrest rates for misdemeanors and drug offences are disproportionate, *prior misdemeanor convictions* may act as such a proxy (Corbett-Davies et al. 2016; Lum & Isaac 2016).
- **Conditional association.** Unmeasured proxies are not the only route by which race could predict the score. Other COMPAS inputs could be associated with race only *conditionally* on the admissible variables. The finding that race has limited predictive utility for the score suggests such conditional relationships are also limited.

## Examples

> [!example] Auditing a vendor's black-box score (generic analytics analogue)
> A media-measurement vendor provides weekly "incrementality scores" from an undisclosed model. The analyst has the scores and the candidate drivers: spend by channel, seasonality, price, distribution. Fitting a flexible kernel or ridge class to *predict the vendor's score*, then computing MCR per driver, bounds how much the vendor's model could rely on, for example, a seasonality proxy versus media spend. The bound holds only if the class contains a good model matching the vendor's reliance. If the seasonality MCR is $[1.0,1.1]$, any acceptable surrogate barely uses seasonality. A wide range means the score cannot be explained uniquely. This is an "effective challenge" tactic in the sense of [[SR 11-7 - Model Risk Management Guidance - Overview]].
^ex-auditing-a-vendor-s

## Connections

- The analysis treats the *proprietary model's output* as $Y$. MCR then describes the black box, not the world. Prop 19's causal reading does not apply.
- On proxies, conditional reliance (CMR) would ask about race information *not* recoverable from priors and age ([[Model Reliance, Causal Effects and Conditional Model Reliance#^def-cmr]]). The paper reports MR and MCR, not CMR, for this analysis.
- Governance framing: [[NIST AI RMF 1.0 - Overview]] (fairness and transparency characteristics), [[SR 11-7 - Model Risk Management Guidance - Overview]].
- Code for §9.1 and §10 is public (App A.1): github.com/aaronjfisher/mcr-supplement.

## See Also
- [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]: the bootstrap procedure used here
- [[Model Class Reliance - Discussion, Limitations and Extensions]]
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
