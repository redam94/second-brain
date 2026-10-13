---
title: Model Reliance, Causal Effects and Conditional Model Reliance
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§8 pp. 30-34 (§8.1 Prop. 19 Eq 8.1; §8.2 Eq 8.2; §8.2.1 Eq 8.3 and weight/impute estimators); App A.7 pp. 47-48; App B.9 pp. 65-67"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Common Support and Overlap]]"
used_by:
  - "[[Model Class Reliance - Recidivism Case Study]]"
  - "[[Model Class Reliance - Discussion, Limitations and Extensions]]"
aliases:
  - Conditional Model Reliance
  - Core Model Reliance
  - CMR
  - Conditional MCR
  - CMCR
  - Causal Interpretation of Model Reliance
---

# Model Reliance, Causal Effects and Conditional Model Reliance

> [!summary]
> MR studies how a model's *loss* changes under an intervention on the *data*. **Proposition 19:** for a binary treatment $T=X_1$ under ignorability and positivity, the MR of the true regression function $f_0=E(Y\mid T,C)$ equals $1+\frac{\mathrm{Var}(T)}{\mathbb E\,\mathrm{Var}(Y\mid T,C)}\sum_t\{\mathbb E(Y_1-Y_0\mid T=t)^2+\mathrm{Var}(\mathrm{CATE}(C)\mid T=t)\}$. So reliance grows with treatment prevalence, average effect size and effect *heterogeneity*, and falls with residual noise. **Conditional ("core") model reliance** $CMR=e_{\text{cond}}/e_{\text{orig}}$ permutes $X_1$ only among observations with the same $X_2$. It measures reliance on information *unique* to $X_1$ and avoids evaluating impossible $(x_1,x_2)$ combinations. Estimators: importance weighting, exact matching on discrete $X_2$, or residual imputation $X_1-\mu_1(X_2)$.
^summary

## Overview

Section 8 frames MR causally (p. 30). The goal mirrors causal inference, with the *model's performance* as the outcome and permuting $X_1$ as the intervention. Two results follow. When the model is nature's own conditional-mean function, MR reduces to familiar causal quantities (§8.1). And an alternative perturbation that respects the dependence between $X_1$ and $X_2$ gives conditional importance (§8.2).

## Main Content

### MR and conditional average treatment effects (§8.1)

Rename $(Y,X_1,X_2)$ as $(Y,T,C)$: binary treatment $T$, baseline covariates $C$. Let $f_0(t,c):=E(Y\mid C=c,T=t)$, with no restriction on its form. Let $Y_1$ and $Y_0$ be potential outcomes, $Y=Y_0(1-T)+Y_1T$, $\mathrm{CATE}(c):=E(Y_1-Y_0\mid C=c)$ ([[Potential Outcomes Framework]]).

> [!theorem] Proposition 19: Causal interpretation of MR (p. 31, Eq 8.1)
> Let $e_{\text{orig}}$ and $e_{\text{switch}}$ use squared-error loss $L(f,(y,t,c))=(y-f(t,c))^2$. If **conditional ignorability** $(Y_1,Y_0)\perp T\mid C$ and **positivity** $0<P(T=1\mid C=c)<1$ for all $c$ hold, then
> $$MR(f_0)=1+\frac{\mathrm{Var}(T)}{\mathbb E_{T,C}\mathrm{Var}(Y\mid T,C)}\sum_{t\in\{0,1\}}\Big\{\mathbb E(Y_1-Y_0\mid T=t)^2+\mathrm{Var}\big(\mathrm{CATE}(C)\mid T=t\big)\Big\},\qquad(8.1)$$
> where $\mathrm{Var}(T)$ is the marginal variance of treatment assignment.
>
> **Reading.**
> - If everyone is treated, $\mathrm{Var}(T)=0$ and $MR(f_0)=1$: scrambling $T$ changes nothing.
> - A larger average effect magnitude $\mathbb E(Y_1-Y_0\mid T=t)^2$ means more reliance.
> - More heterogeneity across subgroups, $\mathrm{Var}(\mathrm{CATE}(C)\mid T=t)$, also means more reliance. "A treatment may be important for predicting $Y$ even if the average treatment effect is zero, so long as the treatment helps some subgroups more than others" (p. 31).
> - More unexplained outcome noise, $\mathbb E\,\mathrm{Var}(Y\mid T,C)$, means less reliance.
^thm-prop19

> [!theorem] Proof of Proposition 19 (App B.9, pp. 65-67)
> Let $p=P(T=1)$ and $q=1-p$. Ignorability gives $f_0(t,c)=E(Y_t\mid C=c)$, so $e_{\text{orig}}(f_0)=q\,\mathbb E_{C\mid T=0}\mathrm{Var}(Y_0\mid C)+p\,\mathbb E_{C\mid T=1}\mathrm{Var}(Y_1\mid C)$ (B.50). For $e_{\text{switch}}$, independence of $T^{(a)}$ and $T^{(b)}$ gives four terms $A_{ij}=p^{i+j}q^{2-i-j}\mathbb E_{C\mid T=i}\mathbb E[\{Y_i-E(Y_j\mid C)\}^2]$:
> - $A_{00}=q^2\mathbb E_{C\mid T=0}\mathrm{Var}(Y_0\mid C)$ and $A_{11}=p^2\mathbb E_{C\mid T=1}\mathrm{Var}(Y_1\mid C)$;
> - $A_{01}=pq\,\mathbb E_{C\mid T=0}[\mathrm{Var}(Y_0\mid C)+\mathrm{CATE}(C)^2]$ and $A_{10}=pq\,\mathbb E_{C\mid T=1}[\mathrm{Var}(Y_1\mid C)+\mathrm{CATE}(C)^2]$.
>
> Summing, and using $p+q=1$, gives $e_{\text{switch}}(f_0)=e_{\text{orig}}(f_0)+\mathrm{Var}(T)\{\mathbb E_{C\mid T=0}\mathrm{CATE}^2+\mathbb E_{C\mid T=1}\mathrm{CATE}^2\}$ (B.52-B.54), with $pq=\mathrm{Var}(T)$. Then $\mathbb E[\mathrm{CATE}^2\mid T=t]=\mathbb E(Y_1-Y_0\mid T=t)^2+\mathrm{Var}(\mathrm{CATE}(C)\mid T=t)$. Divide by $e_{\text{orig}}(f_0)=\mathbb E_{T,C}\mathrm{Var}(Y\mid T,C)$.
^proof-prop19

**Combining with the bounds.** [[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^cor-22|Corollary 22]] bounds $MR(f^\star)$. When $f^\star=E(Y\mid X)$, Proposition 19 turns that bound into a statement about effect size and heterogeneity (App A.4).

### Conditional (core) model reliance (§8.2)

**Motivation (p. 31).** When $X_1$ and $X_2$ are highly correlated or redundant, good models can rely on either, and MCR correctly reports a wide range. Often, though, the question is how much a model relies on information in $X_1$ "that cannot alternatively be gleaned from $X_2$". The paper's example: age and accumulated wealth are correlated and both predict future promotion. How much does a promotion model rely on information available *only* from wealth?

> [!definition] Definition: Conditional switched loss, CMR and CMCR (Eq 8.2, p. 32)
> With $Z^{(a)},Z^{(b)}$ independent copies of $Z$:
> $$e_{\text{cond}}(f):=\mathbb E_{X_2}\Big[\mathbb E_{(Y^{(b)},X_1^{(a)},X_2^{(b)})}\big[L\{f,(Y^{(b)},X_1^{(a)},X_2^{(b)})\}\,\big|\,X_2^{(a)}=X_2^{(b)}=X_2\big]\Big],\qquad(8.2)$$
> the expected loss over pairs whose $X_1$ values are switched *given that the pair matches on $X_2$*. Equivalently, noise is added to $X_1$ so that it carries no information about $Y$ given $X_2$, while the joint distribution of $(X_1,X_2)$ is preserved.
> $$CMR(f):=\frac{e_{\text{cond}}(f)}{e_{\text{orig}}(f)}.$$
> **Conditional MCR (CMCR)** is defined like Eq 2.2 with CMR in place of MR.
> - If $X_1\perp X_2$, then CMR = MR.
> - Otherwise CMR falls as $X_2$ becomes more predictive of $X_1$, and CMCR is generally closer to 1 than MCR.
^def-cmr

**Advantage (p. 32).** CMR keeps perturbed inputs inside the support $\mathcal X$ rather than the product $\mathcal X_1\times\mathcal X_2$. So it is not influenced by impossible combinations of $x_1$ and $x_2$, while MR can be. This echoes Hooker (2007): evaluate models where the data actually live, which is the theme of [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]. **Challenge:** exact matched pairs may be rare, so CMR is hard to estimate nonparametrically.

### Estimating CMR (§8.2.1)

> [!definition] Estimators of $e_{\text{cond}}$ (§8.2.1, pp. 32-33; Eq 8.3)
> **Weighting** (discrete, low-dimensional covariates). Use the importance weight $w(x_1,x_2):=P(X_1=x_1\mid X_2=x_2)/P(X_1=x_1)$ (see also Hooker 2007):
> $$\hat e_{\text{weight}}(f):=\frac1{n(n-1)}\sum_i\sum_{j\ne i}w(\mathbf X_{1[i,\cdot]},\mathbf X_{2[j,\cdot]})\,L\{f,(\mathbf y_{[j]},\mathbf X_{1[i,\cdot]},\mathbf X_{2[j,\cdot]})\}.$$
> Unlikely combinations are down-weighted and impossible ones are discarded. It is unbiased if the probabilities are known.
>
> **Matching** (discrete, low-dimensional $X_2$). This needs no model of $X_1\mid X_2$:
> $$\hat e_{\text{match}}(f):=\frac1{n(n-1)}\sum_i\sum_{j\ne i}\frac{\mathbb 1(\mathbf X_{2[j,\cdot]}=\mathbf X_{2[i,\cdot]})}{P(X_2=\mathbf X_{2[i,\cdot]})}L\{f,(\mathbf y_{[j]},\mathbf X_{1[i,\cdot]},\mathbf X_{2[j,\cdot]})\}.\qquad(8.3)$$
> It is unbiased if $P(X_2=x_2)^{-1}$ is known. The inverse-probability weight is needed because the share of *matched pairs* at a value $x_2$ differs from the share of observations there; summing matched pairs naively is biased. In practice use $P(X_2=\mathbf X_{2[i,\cdot]})\approx\frac1{n-1}\sum_{j'\ne i}\mathbb 1(\mathbf X_{2[i,\cdot]}=\mathbf X_{2[j',\cdot]})$, with minor adjustments to avoid dividing by zero. This is analogous to exact matching in causal inference (Stuart 2010), which works best when exact matches are common.
>
> **Imputation under homogeneous residuals** (continuous or high-dimensional covariates). Let $\mu_1(x_2)=E(X_1\mid X_2=x_2)$ and assume the residual $X_1-\mu_1(X_2)$ is **independent of $X_2$**. Then
> $$e_{\text{cond}}(f)=\mathbb E\,L\{f,(Y^{(b)},\ X_1^{(a)}-\mu_1(X_2^{(a)})+\mu_1(X_2^{(b)}),\ X_2^{(b)})\},$$
> i.e. swap the *residuals* between random pairs. With $\mu_1$ known, the U-statistic is
> $$\hat e_{\text{impute}}(f):=\frac1{n(n-1)}\sum_i\sum_{j\ne i}L\{f,(\mathbf y_{[j]},\ \mathbf X_{1[i,\cdot]}-\mu_1(\mathbf X_{2[i,\cdot]})+\mu_1(\mathbf X_{2[j,\cdot]}),\ \mathbf X_{2[j,\cdot]})\}.$$
> In practice, plug in a regression or ML estimate of $\mu_1$. No explicit model of the joint distribution of $(X_1,X_2)$ is needed.
^def-cmr-estimators

> [!theorem] Unbiasedness of $\hat e_{\text{match}}$ and $\hat e_{\text{weight}}$ (App A.7, pp. 47-48)
> **Matching.** Each summand has the same expectation. Write $p_{x_2}(x)=P(X_2=x)$ and condition on $X_2^{(a)}$:
> $$\mathbb E\Big[\tfrac{\mathbb 1(X_2^{(a)}=X_2^{(b)})}{p_{x_2}(X_2^{(a)})}L\{f,(Y^{(b)},X_1^{(a)},X_2^{(b)})\}\Big]=\mathbb E_{X_2^{(a)}}\Big\{p_{x_2}(X_2^{(a)})\,\tfrac1{p_{x_2}(X_2^{(a)})}\,\mathbb E[L\mid X_2^{(b)}=X_2^{(a)},X_2^{(a)}]+0\Big\}=e_{\text{cond}}(f).$$
> **Weighting** (shown for discrete variables). Summing over $x_1^{(a)},x_2^{(b)},y^{(b)}$, the weight converts $P(X_1=x_1^{(a)})$ into $P(X_1=x_1^{(a)}\mid X_2=x_2^{(b)})$. The expectation then becomes $\mathbb E_{X_2^{(b)}}\mathbb E[L\mid X_2^{(a)}=X_2^{(b)},X_2^{(b)}]=e_{\text{cond}}(f)$.
^thm-cmr-unbiased

**Related approaches (pp. 33-34).**
- **Strobl et al. (2008)** give a similar *conditional permutation* procedure for trees. A formal comparison is hard because they "do not define a specific estimand" and their method is tree-specific ([[Strobl et al 2008 - Conditional Variable Importance - Overview]]).
- **Reduce the covariates** to induce approximate independence before computing an MR-like measure (Gregorutti et al. 2017).
- **Regroup** predictors of $X_1$ into $X_1$ itself (Toloşi & Lengauer 2011; the Kirk, Lewin & Stumpf discussion of Meinshausen & Bühlmann 2010, see [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]).
- **Extension:** condition only on the part of $X_2$ believed to *cause* $X_1$, by changing the outer expectation in (8.2). The paper otherwise focuses on MR and notes that similar results "could potentially be carried over" to CMR.

## Examples

> [!example] Prop 19 with numbers (illustrative)
> Take a 50/50 randomized promotion ($\mathrm{Var}(T)=0.25$) with residual variance $\mathbb E\,\mathrm{Var}(Y\mid T,C)=4$. Suppose the effect is $+1$ in half the customers and $-1$ in the other half, so ATE $=0$ and $\mathrm{Var}(\mathrm{CATE})=1$ in each arm. Then $MR(f_0)=1+\frac{0.25}{4}(0+1+0+1)=1.125$. The treatment matters for prediction (a 12.5% loss increase when scrambled) despite a zero average effect. A *homogeneous* effect of $+1$ gives the same 1.125: magnitude and heterogeneity enter symmetrically.
^ex-prop-19-with-numbers

> [!example] CMR for correlated media (marketing analogue)
> TV and branded-search spend are strongly correlated across weeks. MR for search permutes it independently of TV, creating impossible weeks with heavy search and no TV, and can overstate reliance. CMR via $\hat e_{\text{impute}}$ regresses search on TV and other drivers, then swaps residuals across weeks. That isolates reliance on the part of search *not* predictable from TV, which is closer to the incremental question a budget planner asks. This is still predictive reliance, not causal incrementality; see [[Dillon et al - SHAP and Causal Insights - Overview]].
^ex-cmr-for-correlated-media

## Connections

- **Causal vs predictive relevance.** Prop 19 holds only for $f_0$ under ignorability. For an arbitrary fitted $f$, MR is a property of the model, not of nature. Compare the interventional/observational distinction in [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- **Heterogeneous effects.** The $\mathrm{Var}(\mathrm{CATE})$ term ties MR to the CATE literature: [[Metalearners for CATE]].
- **Matching and weighting estimators** of CMR borrow directly from causal-inference adjustment: [[Matching Methods and Distance Measures]], [[Common Support and Overlap]].

## See Also
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]: tree-based conditional permutation
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]: why unconditional permutation extrapolates
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
