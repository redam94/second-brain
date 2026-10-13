---
title: Rashomon Sets and Model Class Reliance - Definitions
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/variable-importance
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "Abstract; §1 pp. 1-4; §2-2.1 pp. 4-7 (Eqs 2.1-2.4, Fig. 1); §4 p. 11 (Eq 4.1); §5.2 p. 18; App B.1 p. 48; App B.7 pp. 63-64"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]"
  - "[[Model Selection and Overfitting]]"
used_by:
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
  - "[[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]"
  - "[[Rashomon-Set Confidence Intervals and Profile Likelihood]]"
  - "[[Model Class Reliance - Binary Search Computation]]"
aliases:
  - Rashomon Set
  - Epsilon-Rashomon Set
  - Rashomon Effect
  - Model Class Reliance
  - MCR
  - Population Model Class Reliance
---

# Rashomon Sets and Model Class Reliance - Definitions

> [!summary]
> The **$\epsilon$-Rashomon set** $\mathcal R(\epsilon)$ is every model in a prespecified class $\mathcal F$ whose expected loss is at most $\epsilon$ above a reference model $f_{\text{ref}}$. **Model class reliance** is the interval $[MCR_-(\epsilon), MCR_+(\epsilon)]$ of the smallest and largest model reliance (MR) attained inside that set. Its empirical analogue replaces expectations with in-sample averages. MCR describes the *prediction problem plus class*, not any one fitted model. It does not depend on the algorithm that selected a model.
^summary

## Overview

The paper's starting point (§1, pp. 1-2) is Breiman's **Rashomon effect**: many prediction models fit the data almost equally well, yet they may rely on entirely different covariates. The name comes from Kurosawa's 1950 film in which four witnesses give different accounts of one event. The authors pose three questions. How should analysts describe the importance of each covariate comprehensively? How well can one analyst recover another's conclusions? Does the model that predicts best necessarily give the most accurate interpretation?

**Existing VI tools and what they are used for (§1, pp. 1-2).** In random forests, VI is the drop in accuracy when a covariate is permuted (Breiman 2001; Breiman et al. 2001; later Strobl et al. 2008, Altmann et al. 2010, Gregorutti et al. 2015/2017 and others). A similar **"Perturb"** VI measure has been used for neural networks, where noise is *added* to covariates rather than permuting them (Recknagel et al. 1997; Yao et al. 1998; Scardi & Harding 1999; Gevrey et al. 2003). The paper lists three uses of such tools:
- identifying covariates that must be measured with high precision;
- improving the transparency of a "black box" model (see also Rudin 2019);
- determining which scenarios may cause the model to fail.

None of them accounts for the fact that many models may fit almost equally well, so one analyst's model may rely on entirely different covariates from another's.

Their answer is to study the whole set of near-optimal models. The motivating hope (§1, p. 2): even if no candidate model is the true data-generating process, some well-performing candidates may place the same importance on a variable as the true process does. If so, the range of importance over the good models brackets the truth. That range "aims to reflect the nature of the prediction problem itself" (§1, p. 2) rather than one analyst's choices.

## Main Content

### Setup (§2, p. 4)

> [!definition] Definition: Data, model class, loss, algorithm (§2, p. 4)
> - $Z=(Y,X_1,X_2)\in\mathcal Z$ is a random variable with outcome $Y\in\mathcal Y$ and covariates $X=(X_1,X_2)\in\mathcal X$. The subsets $X_1\in\mathcal X_1$ (variables of interest) and $X_2\in\mathcal X_2$ may each be multivariate. Observations are iid and $n\ge 2$. The minimizers and maximizers used throughout are assumed to exist.
> - The data set is $\mathbf Z=[\mathbf y\ \mathbf X]$, with $\mathbf X=[\mathbf X_1\ \mathbf X_2]$ ($n\times p$). $v_{[j]}$ is the $j$th element of a vector, and $A_{[i,\cdot]}$, $A_{[\cdot,j]}$, $A_{[i,j]}$ are a row, a column and an element.
> - A **model class** is a prespecified subset $\mathcal F\subset\{f\mid f:\mathcal X\to\mathcal Y\}$ of measurable functions. Its members are **models**.
> - A **loss** is a nonnegative $L:(\mathcal F\times\mathcal Z)\to\mathbb R_{\ge 0}$, e.g. squared error $L_{se}(f,(y,x_1,x_2))=(y-f(x_1,x_2))^2$ or hinge $L_h(f,(y,x_1,x_2))=(1-yf(x_1,x_2))_+$.
> - An **algorithm** is any procedure $\mathcal A:\mathcal Z^n\to\mathcal F$ from data sets to models.
^def-mcr-setup

The authors deliberately say "model reliance" rather than "importance" to signal that the target is *prediction*: how much a model leans on a covariate for accuracy. This is distinct from the inferential VI estimands of van der Laan (2006) and Williamson et al. (2017) (§2, p. 4).

### Rashomon sets

> [!definition] Definition: Population and empirical $\epsilon$-Rashomon sets (§2.1 p. 5; Eq 4.1 p. 11; §4.1 p. 14)
> Given a prespecified reference model $f_{\text{ref}}$ and $\epsilon\ge 0$:
> $$\mathcal R(\epsilon,f_{\text{ref}},\mathcal F):=\{f\in\mathcal F: e_{\text{orig}}(f)\le e_{\text{orig}}(f_{\text{ref}})+\epsilon\},\qquad e_{\text{orig}}(f)=\mathbb E L(f,Z).$$
> The empirical analogue is
> $$\hat{\mathcal R}(\epsilon,f_{\text{ref}},\mathcal F):=\{f\in\mathcal F:\hat e_{\text{orig}}(f)\le \hat e_{\text{orig}}(f_{\text{ref}})+\epsilon\},\qquad \hat e_{\text{orig}}(f)=\tfrac1n\textstyle\sum_i L(f,\mathbf Z_{[i,\cdot]}).$$
> To allow $\epsilon<0$ (needed for the inner bound, Theorem 6), the empirical set is generalized to $\hat{\mathcal R}(\epsilon)=\{f_{\text{ref}}\}\cup\{f\in\mathcal F:\hat e_{\text{orig}}(f)\le\hat e_{\text{orig}}(f_{\text{ref}})+\epsilon\}$, which is never empty. The abbreviations $\mathcal R(\epsilon)$ and $\hat{\mathcal R}(\epsilon)$ are used when $f_{\text{ref}}$ and $\mathcal F$ are clear.
^def-rashomon-set

**Interpretation (§2.1, p. 5).** $\mathcal R(\epsilon)$ "can be thought of as representing models that might be arrived at due to differences in data measurement, processing, filtering, model parameterization, covariate selection, or other analysis choices." In other words, it is the model-space image of the [[Garden of Forking Paths]].

**Choosing $f_{\text{ref}}$ (§4, p. 11).** The theory is simplest when $f_{\text{ref}}$ is *prespecified*. Examples are an emergency-room injury-severity flowchart or any decision rule already in use. It can also be fit on a separate split. The ideal choice is the best-in-class model $f^\star=\arg\min_{f\in\mathcal F}e_{\text{orig}}(f)$, but $f^\star$ is unknown. Any $f_{\text{ref}}\in\mathcal F$ is **conservative**: $\mathcal R(\epsilon,f_{\text{ref}},\mathcal F)\supseteq\mathcal R(\epsilon,f^\star,\mathcal F)$, because $e_{\text{orig}}(f_{\text{ref}})\ge e_{\text{orig}}(f^\star)$.

**Standardized loss (App B.1, p. 48).** For the proofs it is convenient to write $\tilde L(f,z):=L(f,z)-L(f_{\text{ref}},z)$. Then $\mathcal R(\epsilon)=\{f_{\text{ref}}\}\cup\{f\in\mathcal F:\mathbb E\tilde L(f,Z)\le\epsilon\}$ and $\hat{\mathcal R}(\epsilon)=\{f_{\text{ref}}\}\cup\{f\in\mathcal F:\hat{\mathbb E}\tilde L(f,Z)\le\epsilon\}$.

> [!definition] Definition: Absolute-loss Rashomon set (App B.7, pp. 63-64)
> An alternative replaces the relative threshold with an absolute one: $\mathcal R(\epsilon_{\text{abs}},f_{\text{ref}},\mathcal F)=\{f_{\text{ref}}\}\cup\{f\in\mathcal F:\mathbb E L(f,Z)\le\epsilon_{\text{abs}}\}$ for $\epsilon_{\text{abs}}>0$. Including $f_{\text{ref}}$ still guarantees non-emptiness. All results carry over if Assumption 2 is replaced by Assumption 1 and $2B_{\text{ref}}$ by $B_{\text{ind}}$ in the thresholds $\epsilon_{\text{out}},\epsilon_{\text{best}},\epsilon_{\text{in}},\epsilon',\epsilon'_1$. The reason is that $\tilde L$ ranges over an interval of length $2B_{\text{ref}}$, while $L$ ranges over one of length $B_{\text{ind}}$. The computation in §6 is written on this absolute scale.
>
> Two further remarks in B.7:
> - **Computation is largely unaffected.** The paper says computing empirical MCR is "largely unaffected" by whether $L$ or $\tilde L$ is used, because it is simple to transform one optimization problem into the other (p. 63). (Our gloss: $\hat{\mathbb E}\tilde L(f,Z)=\hat e_{\text{orig}}(f)-\hat e_{\text{orig}}(f_{\text{ref}})$, so a relative threshold $\epsilon$ is the absolute threshold $\epsilon_{\text{abs}}=\hat e_{\text{orig}}(f_{\text{ref}})+\epsilon$.)
> - **Including $f_{\text{ref}}$ is often redundant.** The explicit inclusion of $f_{\text{ref}}$ is still required so that empirical and population Rashomon sets are nonempty. But in many cases it is redundant when interpreting the set, for example when $\epsilon\ge0$ and $\mathbb E L(f_{\text{ref}},Z)\le\epsilon_{\text{abs}}$, since $f_{\text{ref}}$ then already meets the loss condition (p. 64).
> - The swap of Assumption 2 for Assumption 1 applies "whenever this is not redundant", and the $2B_{\text{ref}}\to B_{\text{ind}}$ replacement is made in Theorem 4, Corollary 22, Theorem 6, Proposition 7 and Corollary 27.
^def-abs-rashomon

### Model reliance (informal) and model class reliance

> [!definition] Definition: Informal model reliance, population and in-sample (Eqs 2.1 and 2.3, pp. 5-6)
> $$MR(f):=\frac{\text{Expected loss of }f\text{ under noise}}{\text{Expected loss of }f\text{ without noise}}\qquad(2.1)$$
> $$\widehat{MR}(f):=\frac{\text{In-sample loss of }f\text{ under noise}}{\text{In-sample loss of }f\text{ without noise}}\qquad(2.3)$$
> In Fig. 1-A the x-axis reads MR as the *percent increase* in $f$'s expected loss when noise is added to $X_1$. The added noise must render $X_1$ completely uninformative of $Y$ without altering the marginal distribution of $X_1$ (§2.1, p. 5, citing Breiman 2001 and Breiman et al. 2001). Eq 2.3 is "the extent to which $f$ appears to rely on $X_1$ in a given sample" (p. 6). The formal versions, $MR(f)=e_{\text{switch}}(f)/e_{\text{orig}}(f)$ (Eq 3.1) and its U-statistic estimator (Eq 3.6), are in [[Model Reliance - Permutation Importance as a U-Statistic#^def-mr]].
^def-mr-informal

> [!definition] Definition: Model class reliance, population and empirical (Eqs 2.2 and 2.4, pp. 6)
> $$[MCR_-(\epsilon),\,MCR_+(\epsilon)]:=\Big[\min_{f\in\mathcal R(\epsilon)}MR(f),\ \max_{f\in\mathcal R(\epsilon)}MR(f)\Big]\qquad(2.2)$$
> $$[\widehat{MCR}_-(\epsilon),\,\widehat{MCR}_+(\epsilon)]:=\Big[\min_{f\in\hat{\mathcal R}(\epsilon)}\widehat{MR}(f),\ \max_{f\in\hat{\mathcal R}(\epsilon)}\widehat{MR}(f)\Big]\qquad(2.4)$$
> Here $\widehat{MR}(f)$ is the in-sample loss under noise divided by the in-sample loss without noise (Eq 2.3; formal Eq 3.6).
^def-mcr

**Reading the interval (§4, p. 11).**
- If $MCR_+(\epsilon)$ is low, no well-performing model in $\mathcal F$ places high importance on $X_1$, and $X_1$ "can be discarded at low cost regardless of future modeling decisions."
- If $MCR_-(\epsilon)$ is large, every well-performing model must rely substantially on $X_1$, and $X_1$ deserves careful attention.
- $\mathcal F$ may mix parametric forms, e.g. "all linear models and all decision tree models with less than 6 single-split nodes."
- The range does not depend on the fitting algorithm. It is valid for any algorithm producing models in $\mathcal F$, and for any $f\in\mathcal F$.

> [!example] Figure 1 (p. 5): Rashomon sets and MCR
> **Panel A (population).** The y-axis is expected loss $\mathbb E L(f,Z)$ and the x-axis is $MR(f)$. The class $\mathcal F$ is a cloud of points. A horizontal band of height $\epsilon$ above $f_{\text{ref}}$ cuts out $\mathcal R(\epsilon)$. Its projection on the x-axis is the MCR interval, from "rely less on $X_1$" to "rely more on $X_1$".
> **Panel B (empirical).** The same picture with in-sample loss $\hat{\mathbb E}L(f,Z)=\frac1n\sum_iL(f,\mathbf Z_{[i,\cdot]})$ and $\widehat{MR}(f)$, giving $\hat{\mathcal R}(\epsilon)$ and $[\widehat{MCR}_-,\widehat{MCR}_+]$.
^fig-1

**Generality of the Rashomon-set tools (§1, p. 3).** The tools "can be used to make finite-sample inferences for arbitrary characteristics of well-performing models". The examples given are the range of risk predictions that well-fitting models assign to a particular covariate profile, and the *variance of predictions* made by well-fitting models. In some cases they "may provide finite-sample confidence intervals (CIs) where none have previously existed" (p. 3; see §5 and [[Rashomon-Set Confidence Intervals and Profile Likelihood]]).

**COMPAS motivation and provenance (§1, p. 3).** Proprietary recidivism models trained on criminal records are increasingly used in U.S. courtrooms, and may rely on race, sex or proxies for them. COMPAS (Correctional Offender Management Profiling for Alternative Sanctions) was developed by Northpointe Inc.; in 2017 Northpointe, Courtview Justice Solutions and Constellation Justice Systems joined under the name Equivant. Because COMPAS predictions are public, one can fit a flexible class to predict them. MCR then lets the analyst assume only that the class contains *some* well-performing model with the same reliance as COMPAS, not that COMPAS has a known parametric form. See [[Model Class Reliance - Recidivism Case Study]].

### Contributions listed in §2.1 (pp. 6-7)

1. **Estimation of MR and population MCR.** U-statistic properties of $\widehat{MR}(f)$ (§3.1, Theorem 5) and finite-sample bounds on MCR. Some of these require a covering-number limit on $\mathcal F$. → [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]
2. **Computation of empirical MCR.** A general optimization procedure (§6) with implementations for regularized linear and RKHS classes (§7). It outputs a closed-form convex envelope containing $\mathcal F$ (Fig. 2). For classes where loss minimization is itself open (e.g. neural networks), computing MCR remains open. → [[Model Class Reliance - Binary Search Computation]]
3. **Interpretation of MR** via additive-model coefficients (Prop 15) and conditional causal effects (Prop 19).
4. **Conditional importance** extension (§8.2).
5. **Generalized Rashomon-set inference** for arbitrary model characteristics, analogous to profile likelihood (§5). → [[Rashomon-Set Confidence Intervals and Profile Likelihood]]

### Related literature on the Rashomon effect (§5.2, p. 18)

- **Breiman et al. (2001)** introduced the Rashomon effect as an ambiguity problem and suggested *ensembling* the good models. The authors object that this "may only push the problem from the member level to the ensemble level", since many ensembles also fit well.
- The Rashomon effect also appears outside statistics (Heider 1988; Roth & Mehta 2002).
- **Tulabandhula & Rudin (2014)** optimize a decision rule to perform well under the range of outcomes predicted by any good model.
- **Statnikov et al. (2013)** find multiple Markov boundaries: minimal covariate sets that make $Y$ independent of the rest.
- **Nevo & Ritov (2017)** report interpretations across a set of well-fitting sparse linear models.
- **Meinshausen & Bühlmann (2010)** estimate structural aspects (e.g. selected variables) from their stability across perturbed samples and regularization levels ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]; see also Azen et al. 2001).
- **Letham et al. (2016)** search for pairs of well-fitting dynamical-systems models with maximally different predictions.

## Examples

> [!example] Why one model's importance can mislead (§1 and §8.2 logic)
> Suppose $X_1$ and $X_2$ are near-duplicates (age and accumulated wealth predicting promotion, the paper's §8.2 example). One analyst's lasso keeps $X_1$ and drops $X_2$, so the $X_1$ importance is high. Another analyst's lasso keeps $X_2$, so the $X_1$ importance is about 1 (none). Both fits have the same loss and both lie in $\mathcal R(\epsilon)$. MCR for $X_1$ is wide, roughly $[1,\text{high}]$. That correctly reports that the data cannot say whether $X_1$ *specifically* is needed. A single permutation importance would report one end of the range as if it were the answer.
^ex-why-one-model-s

> [!example] Marketing analogue
> In weekly media data with 52-156 rows, a class of saturating-adstock regressions with ridge penalties often contains fits that attribute a sales lift to TV and equally good fits that attribute it to branded search. The Rashomon set makes the competing stories explicit. MCR for each channel's spend reports how much any acceptable model must, or could, lean on that channel. Compare [[Challenges and Opportunities in Media Mix Modeling]] and [[MMM Model Selection and Application]].
^ex-marketing-analogue

## Connections

- The Rashomon set is a *frequentist, set-valued* analogue of a posterior over models. A Bayesian MMM's posterior spread over channel contributions plays a similar role ([[Bayesian Media Mix Modeling - Overview]]). MCR uses no prior, but it also does not weight models by plausibility within the set.
- It formalizes the "many analyses" view of [[Researcher Degrees of Freedom]] and [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] for interpretation rather than hypothesis tests.
- Selection by in-sample fit alone tends to overfit; see [[Model Selection and Overfitting]]. The $\epsilon$-band is a fit criterion, and §4.1 controls overfitting inside it.

## See Also
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]: paper overview and source map
- [[Model Reliance - Permutation Importance as a U-Statistic]]: formal MR
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: origin of "Rashomon effect"
