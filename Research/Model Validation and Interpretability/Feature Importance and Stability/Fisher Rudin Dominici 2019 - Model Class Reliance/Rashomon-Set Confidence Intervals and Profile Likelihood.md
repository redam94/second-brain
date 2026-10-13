---
title: Rashomon-Set Confidence Intervals and Profile Likelihood
tags:
  - source/ingested
  - topic/model-validation
  - topic/statistical-inference
  - type/theorem
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§5 p. 15; §5.1 pp. 15-18 (Prop. 7); App A.6 pp. 46-47 (Eq A.5); App B.6 pp. 62-63 (Lemma 26, Cor. 27)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
  - "[[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]"
used_by:
  - "[[Model Class Reliance - Discussion, Limitations and Extensions]]"
aliases:
  - Finite-Sample CIs from Rashomon Sets
  - Rashomon Set Confidence Interval
  - MCR Proposition 7
  - Profile Likelihood as Rashomon Set
---

# Rashomon-Set Confidence Intervals and Profile Likelihood

> [!summary]
> Section 5 generalizes the MCR argument from model reliance to **any model characteristic** $\phi:\mathcal F\to\mathbb R$, such as a coefficient norm or a prediction at a covariate profile. **Proposition 7:** with $\epsilon'=\epsilon+2B_{\text{ref}}\sqrt{\log(2\delta^{-1})/2n}$, the interval $[\min_{\hat{\mathcal R}(\epsilon')}\phi,\ \max_{\hat{\mathcal R}(\epsilon')}\phi]$ contains $\{\phi(f):f\in\mathcal R(\epsilon)\}$ with probability at least $1-\delta$. This holds in finite samples, without asymptotics and without a correct likelihood. When $L$ is a negative log-likelihood, the classic **profile-likelihood interval** is exactly a min/max over an empirical Rashomon set with threshold $\chi^2_{1,1-\delta}/2n$. The Rashomon-set threshold shrinks more slowly than that, so it is more conservative.
^summary

## Overview

The idea behind Theorem 4, isolated here, is that "models with near-optimal performance in the population tend to have relatively good performance in random samples" (§5, p. 15). That turns finite-sample inference into *in-sample optimization*. To bound a property of the good models, optimize that property over a slightly enlarged empirical Rashomon set.

## Main Content

> [!theorem] Proposition 7: Finite-sample CIs from Rashomon sets (§5.1, p. 17)
> Let $\phi:\mathcal F\to\mathbb R$ be a characteristic of interest that can be computed exactly for any $f$. Let
> $$\epsilon':=\epsilon+2B_{\text{ref}}\sqrt{\frac{\log(2\delta^{-1})}{2n}},\qquad\hat\phi_-(\epsilon'):=\min_{f\in\hat{\mathcal R}(\epsilon')}\phi(f),\qquad\hat\phi_+(\epsilon'):=\max_{f\in\hat{\mathcal R}(\epsilon')}\phi(f).$$
> If **Assumption 2 holds for all $f\in\mathcal R(\epsilon)$**, then
> $$\mathbb P\Big(\{\phi(f):f\in\mathcal R(\epsilon)\}\subseteq\big[\hat\phi_-(\epsilon'),\hat\phi_+(\epsilon')\big]\Big)\ge1-\delta.$$
> The CI has a rigorous coverage rate *and* a coherent in-sample reading: it is the range of $\phi$ over models whose empirical loss is not much above that of $f_{\text{ref}}$.
>
> **Examples of $\phi$:** for $f_\beta(x)=x'\beta$, $\phi(f_\beta)=\|\beta\|_2^2$ or $\phi(f_\beta)=f_\beta(x_{\text{new}})$, the risk assigned to a given covariate profile.
^thm-prop7

> [!theorem] Lemma 26: One good model is captured (App B.6, p. 62)
> Let $\epsilon'_1:=\epsilon+2B_{\text{ref}}\sqrt{\log(\delta^{-1})/2n}$. For any $f_1\in\mathcal R(\epsilon)$ satisfying **Assumption 2**, $\mathbb P\{\phi(f_1)\in[\hat\phi_-(\epsilon'_1),\hat\phi_+(\epsilon'_1)]\}\ge1-\delta$.
>
> **Proof.** The event holds whenever $f_1\in\hat{\mathcal R}(\epsilon'_1)$, which fails with probability at most $\delta$ by [[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^lem-23|Lemma 23]].
>
> **Source note.** As printed, Lemma 26 defines $\epsilon'_1:=2B_{\text{ref}}\sqrt{\log(\delta^{-1})/2n}$ without the leading $\epsilon$. The proof invokes Lemma 23, whose $\epsilon'_1$ is $\epsilon+2B_{\text{ref}}\sqrt{\log(\delta^{-1})/2n}$, so the $\epsilon+$ form above is the one the proof supports.
^lem-26

**Proof of Proposition 7 (App B.6.1, p. 63).** Let $f_{-,\epsilon,\phi}$ and $f_{+,\epsilon,\phi}$ attain the min and max of $\phi$ over $\mathcal R(\epsilon)$. The set $\{\phi(f):f\in\mathcal R(\epsilon)\}$ escapes the interval only if one of these two endpoints does. Lemma 26 at $\delta/2$ for each, plus a union bound, gives $\delta/2+\delta/2=\delta$. That is why $\log(2\delta^{-1})$ appears in $\epsilon'$.

> [!theorem] Corollary (§5.1, p. 17): All best-in-class models
> Setting $\epsilon=0$ in Proposition 7 gives a finite-sample CI covering $\phi(f^\star)$ simultaneously for every $f^\star\in\arg\min_{f\in\mathcal F}\mathbb E L(f,Z)$.
^cor-best-in-class

> [!theorem] Corollary 27: Unique best-in-class model (App B.6.2, p. 63)
> Let $\epsilon'_0:=2B_{\text{ref}}\sqrt{\log(\delta^{-1})/2n}$, and let $\hat\phi_\pm(\epsilon'_0)$ be the min and max of $\phi$ over $\hat{\mathcal R}(\epsilon'_0)$. If $f^\star$ **uniquely** minimizes $e_{\text{orig}}$ over $\mathcal F$ and satisfies **Assumption 2**, then $\mathbb P\{\phi(f^\star)\in[\hat\phi_-(\epsilon'_0),\hat\phi_+(\epsilon'_0)]\}\ge1-\delta$.
>
> **Proof.** $f^\star\in\mathcal R(0)$, so apply Lemma 26. Uniqueness means only one model must be captured, so no union bound is needed and the threshold uses $\log(\delta^{-1})$ instead of $\log(2\delta^{-1})$. This is a slightly tighter statement.
^cor-27

### Caveat: characteristics that must be estimated (§5.1, p. 17)

Proposition 7 assumes $\phi(f)$ is known exactly once $f$ is known. That fails for $\phi(f)=MR(f)$ or $\phi(f)=\mathrm{Var}\{f(X_1,X_2)\}$, which depend on the unknown population. Then a correction for the estimation error of $\phi$ is needed, such as the $\mathcal Q_{\text{out}}$ term of [[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^thm-4|Theorem 4]].

### Profile likelihood as a Rashomon set (§5.1 pp. 17-18; App A.6)

> [!theorem] Profile-likelihood intervals are min/max over an empirical Rashomon set (App A.6, Eq A.5, pp. 46-47; Coker et al. 2018)
> **Setup.**
> - Models $f_\theta$ are indexed by $\theta=(\gamma,\psi)\in\Theta$, with scalar parameter of interest $\gamma$ and nuisance $\psi$.
> - $e_{\text{orig}}(f_\theta)$ has a unique minimizer $\theta^\star=(\gamma^\star,\psi^\star)$.
> - If $s_\theta:=\int\exp\{-L(f_\theta,z)\}dz<\infty$, define the likelihood $\mathcal L(z;\theta)=\exp\{-L(f_\theta,z)\}/s_\theta$. Then $\hat\theta=\arg\min\hat e_{\text{orig}}(f_\theta)$ is the MLE.
> - Let $\phi(f_{(\gamma,\psi)})=\gamma$.
>
> **Result.** The $(1-\delta)$ profile-likelihood interval is
> $$\mathrm{PLI}(\delta)=\Big\{\gamma:\log\mathcal L(\mathbf Z;\hat\theta)-\log\mathcal L(\mathbf Z;\hat\theta_\gamma)\le\tfrac{\chi_{1,1-\delta}}2\Big\},\qquad \hat\theta_\gamma=\arg\max_{\{\theta:\phi(f_\theta)=\gamma\}}\mathcal L(\mathbf Z;\theta)$$
> $$=\Big\{\gamma:\exists\hat\theta_\gamma,\ \phi(f_{\hat\theta_\gamma})=\gamma,\ f_{\hat\theta_\gamma}\in\hat{\mathcal R}\big(\tfrac{\chi_{1,1-\delta}}{2n},f_{\hat\theta},\mathcal F\big)\Big\}.\qquad(A.5)$$
> Here $\chi_{1,1-\delta}$ is the $1-\delta$ quantile of $\chi^2_1$. If $\mathrm{PLI}$ is a contiguous interval, it equals $[\hat\phi_-(\chi_{1,1-\delta}/2n),\hat\phi_+(\chi_{1,1-\delta}/2n)]$, an empirical Rashomon set with $f_{\text{ref}}=\hat\theta$.
^thm-pli

**Advantages of Proposition 7 over profile likelihood (p. 17).**
- It does not need asymptotics.
- It does not need the likelihood to be known up to a parametric form.
- It covers the whole near-optimal set $\mathcal R(\epsilon)$, not a single, possibly misspecified $f^\star$. This is useful "when different near-optimal models accurately describe different aspects of the underlying data generating process, but none capture it completely."

**Disadvantage.** The threshold $\epsilon'=\epsilon+2B_{\text{ref}}\sqrt{\log(2\delta^{-1})/2n}$ shrinks at rate $n^{-1/2}$, while the profile-likelihood threshold $\chi_{1,1-\delta}/2n$ shrinks at rate $n^{-1}$. So the Rashomon CI is wider. §4.1 has the same disadvantage, so the authors use these results mainly to motivate point estimates.

**Generality (p. 18).** Rashomon sets "reframe a wide set of finite-sample inference problems as in-sample optimization problems." The CIs need not be in closed form. Existing profile-likelihood machinery might be reused for finite-sample results. Approximate optimizers used for complex classes, such as MCMC for BART (Chipman et al. 2010), could be repurposed for approximate finite-sample inference.

## Examples

> [!example] Range of predicted risk for one profile
> Take $\phi(f)=f(x_{\text{new}})$ for a particular customer or market profile. Proposition 7 gives the range of predictions that *any* near-optimal model could make there, with finite-sample coverage. This is an honest "model-multiplicity" interval for a forecast or a scenario response, as opposed to the sampling interval of one fitted model.
^ex-range-of-predicted-risk

> [!example] Marketing illustration: ROI range across acceptable MMM fits
> Let $\phi$ be the implied marginal ROI of a channel in a regularized linear response model, a linear functional of $\beta$. The Rashomon-set CI is the min and max of that ROI over all fits within $\epsilon'$ of the reference loss. With a ridge-type class this is a QP1QC (see [[Model Class Reliance for Linear and RKHS Model Classes]]). The result says how much the ROI conclusion depends on which acceptable model was chosen. Compare posterior intervals in [[Bayesian Media Mix Modeling - Overview]].
^ex-marketing-illustration-roi-range

## Connections

- Profile likelihood is the classical frequentist device for nuisance parameters. Proposition 7 is its finite-sample, misspecification-tolerant cousin.
- [[Conformal Prediction - Overview]] also gives finite-sample, distribution-free intervals, but for *outcomes* rather than for model characteristics.
- In sensitivity analysis for observational studies, ranges over "plausible" models play a similar role ([[Sensitivity Analysis in Observational Studies]]).

## See Also
- [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]: the MR-specific version with the extra $\mathcal Q$ correction
- [[Rashomon Sets and Model Class Reliance - Definitions]]
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
- [[Permute-and-Predict Extrapolation in Variable Importance]] — same profile-CI reading of MCR from an independent source
