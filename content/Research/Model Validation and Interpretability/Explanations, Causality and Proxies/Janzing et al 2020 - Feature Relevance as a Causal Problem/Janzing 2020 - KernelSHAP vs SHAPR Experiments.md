---
title: Janzing 2020 - KernelSHAP vs SHAPR Experiments
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/simulation
  - type/example
  - type/concept
  - method/shap
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum (AISTATS 2020, arXiv:1910.13413v2): §4 intro p.7; §4.1.1 eq. (15) p.7; §4.1.2 eq. (16) p.7; §4.2 linear ground truth p.7; §4.2.1 Gaussian conditional, n=3 and n=10, Fig. 4 p.8; §4.2.2 Aas et al. kernel estimator (3 steps), UCI HAR data, Fig. 5 pp.8-9"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Janzing 2020 - Conditional vs Marginal Dropping of Features]]"
  - "[[Gaussian Distributions and Algebra]]"
used_by:
  - "[[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]]"
aliases:
  - Janzing numerical evidence
  - KernelSHAP weighted least squares (Janzing eq. 15)
  - SHAPR kernel conditional estimator (Janzing restatement)
---

# Janzing 2020 - KernelSHAP vs SHAPR Experiments

> [!summary]
> §4 compares **marginal** Shapley values (python SHAP `KernelExplainer`) with **conditional** ones (R package SHAPR, Aas et al. 2019) on **linear** models. For these the "true" attribution is known in closed form: $\mathrm{contr}_j(x)=\alpha_j(x_j-\mathbb E X_j)$. There are two settings: simulated Gaussian features with exact conditionals ($n=3$ with $\alpha_1=0$; $n=10$ with $\alpha_1=\alpha_2=\alpha_3=0$; 1000 runs, sample size 1000), and the UCI Human Activity Recognition data (3 random features predict a 4th; 1000 runs). In histograms (Figs. 4-5), marginal errors concentrate near zero, especially for zero-coefficient features, while conditional errors are widely spread. No summary statistics are reported, but the figure values (axis ranges, peak counts, spreads) are transcribed below: Fig. 4 errors span $\pm0.5$ with marginal spikes of about 1,750 ($n=3$) and about 4,500 ($n=10$); Fig. 5 errors span only $\pm0.10$ with a marginal spike of about 1,220 against a conditional peak of about 230.
^summary

## Overview

The section's stated aim is to "show numerically that the marginal expectation $\mathbb E[f(x_T,X_{\bar T})]$ is a better choice than $\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]$" for attributing $f(x)-\mathbb E f(X)$ to the individual $x_j$ (§4, p.7). Following Aas et al. (2019, §2.3), it treats KernelSHAP as two parts: (1) Shapley values as the solution of a weighted least-squares problem, and (2) an approximation of the set function $g(T)$.

## Main Content

### §4.1.1 Shapley values as a weighted least-squares solution

> [!definition] Definition: Shapley kernel regression (§4.1.1, eq. 15, p.7; Charnes et al. 1988)
> The Shapley values $(\phi_1,\dots,\phi_n)$ of a set function $g$ solve
> $$
> \min_{\phi_1,\dots,\phi_n}\ \sum_{T\subseteq U}\Big[g(T)-\sum_{j\in T}\phi_j\Big]^2 k(U,T),\tag{15}
> $$
> with **Shapley kernel weights**
> $$
> k(U,T)=\frac{|U|-1}{\binom{|U|}{|T|}\,|T|\,(|U|-|T|)} .
> $$
> Since $k(U,U)=\infty$, one imposes the constraint $\sum_j\phi_j=g(U)$, or, numerically, sets $k(U,U)$ to a large number. (Likewise $k(U,\emptyset)=\infty$, which is consistent with $g(\emptyset)=0$.)
^def-eq15-shapley-kernel

> [!algorithm] KernelSHAP subset sampling (§4.1.1, p.7)
> The power set of $U$ has $2^n$ elements, so exact computation grows exponentially. KernelSHAP therefore:
> 1. samples subsets $T\subseteq U$ with probability proportional to the Shapley kernel weights $k(U,T)$;
> 2. evaluates $g(T)$ for each sampled subset (via §4.1.2);
> 3. solves the weighted least-squares problem (15) on the sampled subsets, subject to $\sum_j\phi_j=g(U)$.
^alg-kernelshap-sampling

### §4.1.2 Approximating the set function

Lundberg & Lee (2017) define $f_T(x)=\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]$. To evaluate it, they assume feature independence (or weak dependence), so that $\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]\approx\mathbb E[f(x_T,X_{\bar T})]$, and use
$$
f_{T,\text{KernelSHAP}}(x)\approx\frac1K\sum_{k}f\big(x_T,x^k_{\bar T}\big),\tag{16}
$$
where $x^k_{\bar T}$, $k=1,\dots,K$, are samples from $X_{\bar T}$. In the paper's view, (16) is a Monte Carlo estimate of the *correct* marginal quantity (4), not an approximation of (3). The authors also note that approximating the marginal expectation is computationally cheap compared with kernel estimation of the conditional (p.7).

### §4.2 Ground truth for linear models

> [!theorem] Linear ground truth (§4.2, p.7)
> For $f(x)=\alpha_0+\sum_i\alpha_ix_i$ with $\alpha_i\in\mathbb R$,
> $$
> f(x)-\mathbb E[f(X)]=\sum_i\alpha_i\,(x_i-\mathbb E X_i),
> $$
> "and hence, the attribution of $x_j$ is $\alpha_j(x_j-\mathbb E[X_j])$". Write $\mathrm{contr}_j(x):=\alpha_j(x_j-\mathbb E X_j)$. The reported error is $\phi_j-\mathrm{contr}_j(x)$.
^thm-linear-ground-truth

The authors note that Shapley values can also be computed for non-linear functions. The linear case is chosen because its ground truth is available analytically.

**Tools.** Marginal Shapley values come from the `KernelExplainer` class of the python SHAP package. Conditional values come from the R package SHAPR, which implements Aas et al. (2019).

### §4.2.1 Multivariate Gaussian features

> [!definition] Definition: Gaussian conditional used for the exact conditional expectation (§4.2.1, p.8; Aas et al. 2019, §3.1)
> If $X\sim N(\mu,\Sigma)$ with
> $$
> \mu=\begin{pmatrix}\mu_T\\\mu_{\bar T}\end{pmatrix},\qquad\Sigma=\begin{pmatrix}\Sigma_{TT}&\Sigma_{T\bar T}\\\Sigma_{\bar TT}&\Sigma_{\bar T\bar T}\end{pmatrix},
> $$
> then $P(X_{\bar T}\mid X_T=x_T)=N(\mu_{\bar T\mid T},\Sigma_{\bar T\mid T})$ with
> $$
> \mu_{\bar T\mid T}=\mu_{\bar T}+\Sigma_{\bar TT}\Sigma_{TT}^{-1}(x_T-\mu_T),\qquad \Sigma_{\bar T\mid T}=\Sigma_{\bar T\bar T}-\Sigma_{\bar TT}\Sigma_{TT}^{-1}\Sigma_{T\bar T}.
> $$
> The conditional expectation can therefore be approximated by sampling $X_{\bar T}$ directly from this distribution. (Background: [[Gaussian Distributions and Algebra]].)
^def-gaussian-conditional

> [!example] Simulation design (§4.2.1, p.8)
> | Setting | $n$ | Zero coefficients | Other coefficients | Mean, covariance | $x$ | Runs | Sample size | Intercept |
> |---|---|---|---|---|---|---|---|---|
> | Gaussian, $n=3$ | 3 | $\alpha_1=0$ | drawn i.i.d. $N(0,1)$ each run | $\mu=0$, $\Sigma=cc^\top$ with entries of $c$ i.i.d. $N(0,1)$ each run | random each run | 1000 | 1000 | $\alpha_0=0$ |
> | Gaussian, $n=10$ | 10 | $\alpha_1=\alpha_2=\alpha_3=0$ | as above ("almost the same setting") | as above | random each run | 1000 (as above) | 1000 (as above) | $\alpha_0=0$ |
>
> Set functions compared: $g(T)=\mathbb E[f(x_T,X_{\bar T})]-\mathbb Ef(X)$ (marginal, blue) vs $g(T)=\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]-\mathbb Ef(X)$ (conditional, red).
>
> *Transcription notes.* (a) The paper writes "we let $\alpha_1=0$ and choose in every run $\alpha_1$ and $\alpha_2$ independently from the standard normal distribution". The second "$\alpha_1$, $\alpha_2$" is presumably a typo for $\alpha_2,\alpha_3$. (b) With $c$ a vector, $\Sigma=cc^\top$ has rank one, so the features are perfectly collinear up to scale. That is an extreme dependence setting in which the conditional distribution given any one coordinate is degenerate. The paper does not comment on this. If $c$ is meant as a matrix, $\Sigma$ is a generic random covariance.
^ex-gaussian-design

> [!example] Fig. 4: Results, Gaussian (p.8)
> Caption: "Histogram showing the error of the Shapley Values for multivariate Gaussian distribution in the 3-dimensional (left) and 10-dimensional (right) setting with $\alpha_1=0$. Blue: error using marginal expectation, Red: error using conditional expectation."
> Legend labels in both panels: "error marginal expectation" (blue) and "error conditional expectation" (red). The plotted error is $\phi_j-\mathrm{contr}_j(x)$.
>
> **Values read off the figure** (approximate; the paper prints no numbers, so these are read from the rendered histograms on p.8):
>
> | Quantity | Left panel ($n=3$) | Right panel ($n=10$) |
> |---|---|---|
> | x-axis (error) range | about $-0.5$ to $0.5$ (ticks at $\pm0.4,\pm0.2,0$) | about $-0.5$ to $0.5$ (same ticks) |
> | y-axis maximum tick | 1750 | 4000 |
> | Blue (marginal) central bin at 0 | about **1,750** counts | about **4,500** counts |
> | Blue bins next to the spike | about 270 and 320 | about 870 and 880 |
> | Blue visible spread | small shoulder within about $\pm0.05$ (bins of about 140 and 100) | wider shoulder, visible out to about $\pm0.1$-$0.15$ (bins of about 500, 300, 150) |
> | Red (conditional) peak | about 120 near 0 | about 130 near 0 |
> | Red spread | almost flat, about 20-60 counts per bin across the whole $\pm0.5$ range | almost flat, about 50-100 counts per bin across the whole $\pm0.5$ range |
>
> **How much each histogram pools.** Each run yields one error per feature, so a panel pools about $n\times1000$ errors: about $3\times1000=3{,}000$ on the left and about $10\times1000=10{,}000$ on the right. That is why the $n=10$ spike is taller. The histograms mix zero-coefficient features with the others, and the paper says the spike comes from them: "The very precise results for the marginal expectation are mainly from feature 1" ($n=3$, p.8) and, for $n=10$, "from the features whose coefficient we set to 0" (p.8). For a zero-coefficient feature, both $\mathrm{contr}_j=0$ and the marginal Shapley value are exactly 0 (sensitivity), so the error is 0 up to solver noise.
>
> **Reading.** "Tightly concentrated at zero" needs a qualifier. The marginal errors form a spike at 0 plus a visible spread of about $\pm0.05$ ($n=3$) and about $\pm0.1$-$0.2$ ($n=10$). That spread is the KernelSHAP Monte Carlo and background-sample noise on the non-zero-coefficient features. The conditional errors are spread almost uniformly over the plotted $\pm0.5$ window, and the axis may cut off further tail mass. No numerical summaries (means, RMSEs) are given.
^fig-4-gaussian

### §4.2.2 Kernel estimation of the conditional (real data)

"If we have no information about the underlying distribution, it is hard to approximate the conditional distribution sufficiently. However, in low dimensions kernel estimates can provide a good approximation" (p.8). The paper uses the Aas et al. (2019) estimator to show how far conditional Shapley values deviate from $\alpha_j(x_j-\mathbb E[X_j])$.

> [!algorithm] Aas et al. (2019) kernel estimator of the conditional set function (§4.2.2, p.8)
> Given a sample $\{x^i\}$ and the point to explain, $x$:
> 1. Let $\Sigma_T$ be the sample covariance matrix of $X_T$. For each sample point $x^i$, compute the scaled **Mahalanobis distance** (Mahalanobis 1936)
> $$
> \mathrm{dist}_T(x,x^i):=\sqrt{\frac{(x_T-x^i_T)'\,\Sigma_T^{-1}\,(x_T-x^i_T)}{|T|}} .
> $$
> 2. Compute kernel weights with bandwidth $\sigma^2>0$:
> $$
> w_T(x,x^i):=\exp\!\Big(-\frac{\mathrm{dist}_T(x,x^i)^2}{2\sigma^2}\Big).
> $$
> 3. Sort the weights $w_T(x,x^i)$ (the paper says "in increasing order"; the intent is that the $K$ retained instances are the most heavily weighted) and let $\tilde x^i$ be the correspondingly ordered instances. Approximate
> $$
> g_{\text{cond}}(T):=\frac{\sum_{i=1}^K w_T(x,\tilde x^i)\,f(\tilde x^i_{\bar T},x_T)}{\sum_{i=1}^K w_T(x,\tilde x^i)} .
> $$
>
> This is a Nadaraya-Watson-style estimate of $\mathbb E[f(x_T,X_{\bar T})\mid X_T=x_T]$. Its quality degrades quickly as $|T|$ grows (curse of dimensionality).
^alg-aas-kernel-conditional

> [!example] Real-data design: UCI Human Activity Recognition (§4.2.2, pp.8-9)
> | Item | Value |
> |---|---|
> | Data | Human Activity Recognition Using Smartphones (Anguita et al. 2013), UCI |
> | Features | 561 |
> | Samples | train 7,352 + test 2,948, merged to **10,299** |
> | Model | linear regression: 3 randomly chosen features → a 4th randomly chosen feature as target |
> | Dependence structure | the activity label (not used) is a common cause of all features |
> | Shapley computation | SHAP (marginal) and SHAPR (conditional, $\sigma^2=0.1$, the SHAPR default), using the first 1000 samples |
> | $\mathbb E X_j$ | estimated from the whole dataset |
> | Explained point $x$ | random draw from the data |
> | Replications | 1000 |
>
> "we are not interested in the quality of the model, but rather in a model for which the ground truth of the attribution is known" (p.8).
^ex-har-design

> [!example] Fig. 5: Results, HAR (p.9)
> Caption: "Histogram showing the error of the Shapley Values for the data set Human Activity Recognition Using Smartphones Data Set. Blue: error using marginal expectation, Red: error using conditional expectation." Same legend labels as Fig. 4.
>
> **Values read off the figure** (approximate; read from the rendered histogram on p.9):
>
> | Quantity | Value |
> |---|---|
> | x-axis (error) range | $-0.10$ to $0.10$ (ticks at $\pm0.10,\pm0.05,0$). That is about **5x narrower** than Fig. 4's $\pm0.5$ |
> | y-axis maximum tick | 1200 |
> | Blue (marginal) central bin at 0 | about **1,220** counts, reaching the top of the plotting area |
> | Blue bins next to the spike | about 400 and 260 |
> | Blue shoulder | about 100-200 counts per bin within about $\pm0.01$-$0.02$, falling to near 0 by about $\pm0.03$ |
> | Red (conditional) peak | about **230** near 0 |
> | Red tails | about 10-40 counts per bin, reaching the plot edges at $\pm0.10$ |
>
> **Pooling.** 1000 runs with 3 features each gives about $3\times1000=3{,}000$ errors per colour.
>
> **Reading.** The pattern is the same as in Fig. 4: a marginal spike at zero and dispersed conditional errors. The absolute scale is much smaller, though. On HAR the conditional errors mostly stay within $\pm0.1$, while in the Gaussian simulation they cover $\pm0.5$. Because the paper gives no axis normalisation or feature scales, the two figures cannot be compared in units of the outcome. The red peak (about 230) is also much higher relative to the blue peak than in Fig. 4. The paper reports no numbers.
^fig-5-har

### Assessment (editorial)

- **The ground truth is the marginal answer.** For linear $f$, $\alpha_j(x_j-\mathbb EX_j)$ *is* the marginal Shapley value. The experiments therefore show that conditional SHAP differs from the marginal definition, and by how much. They cannot independently show that marginal is "right". That claim rests on the arguments of §3 ([[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity|Lemma 1]], [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation|eq. 14]]).
- **The marginal errors are Monte Carlo and estimation noise** (KernelSHAP subset sampling, finite background sample, estimated $\mathbb EX_j$). The conditional errors combine the *definitional* difference with kernel-estimation error. The design does not separate the two, except in the Gaussian case where the conditional is exact.
- **No uncertainty summaries.** Only histograms are shown. A reproduction would report bias and RMSE per feature with Monte Carlo standard errors, as recommended in [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

## Examples

> [!example] Example: A quick audit recipe for a marketing model (practice)
> Take a fitted media model $f$ and wrap it as $f^+(x,x_{\text{null}}):=f(x)$, which takes an extra **known-irrelevant** argument that it ignores. Let $X_{\text{null}}$ be a noisy copy of one real channel, so that it is strongly correlated with that channel. Compute SHAP for $f^+$ with both a marginal background and a conditional estimator. Marginal SHAP must give $X_{\text{null}}$ zero. Any mass conditional SHAP assigns it measures proxy leakage, which is Lemma 1 in practice. This follows the simulation logic of [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]].
^ex-a-quick-audit-recipe

## Connections

- The definitions being compared: [[Janzing 2020 - Conditional vs Marginal Dropping of Features#^def-eq3-eq4]].
- The closed-form ground truth $\phi_j=\alpha_j(x_j-\mathbb EX_j)$ is a special case of the additive-game result in [[Janzing 2020 - Symmetry Axiom Objection and Reply#^thm-additive-marginal-game]].
- Off-manifold evaluation in the marginal estimator (16): [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- Conditional Gaussian algebra used in §4.2.1: [[Gaussian Distributions and Algebra]].

## See Also

- [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] — eqs. (3)-(4) being compared
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — owner of KernelSHAP/TreeSHAP definitions
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — how such a simulation should be reported
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]
