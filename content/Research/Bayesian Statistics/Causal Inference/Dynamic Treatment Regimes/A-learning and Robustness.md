---
title: "A-learning and Robustness"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "§5.2-5.3 A-Learning & Comparison, §6 Simulations, pp. 652-660"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: paper
depends_on:
  - "[[Q-learning]]"
  - "[[Optimal Regime via Dynamic Programming]]"
used_by: []
aliases:
  - A-learning
  - advantage learning
  - contrast function
  - g-estimation treatment regimes
  - double robustness DTR
---

# A-learning and Robustness

> [!summary]
> A-learning ("A" for advantage; Blatt, Murphy & Zhu 2004) exploits the fact that deducing the optimal regime needs only the treatment **contrast** $C_k(\bar s_k, \bar a_{k-1}) = Q_k(\cdot, 1) - Q_k(\cdot, 0)$, not the full Q-function. It models $C_k$ parametrically along with the **propensity** $\pi_k$ (and a nuisance function $h_k = Q_k(\cdot, 0)$), and estimates them by g-estimation (Robins 2004). This yields **double robustness**: consistent estimation of the optimal regime if the contrast is correct and *either* the propensity *or* the nuisance $h_k$ is correct — a weaker requirement than Q-learning's "all Q-functions correct." The price is some efficiency loss when everything is correctly specified. The paper's simulations map this **bias–variance / robustness trade-off**.

## Overview

A-learning is the robust alternative to [[Q-learning]] within the [[Optimal Regime via Dynamic Programming|dynamic-programming framework]]. The insight: the arg-max defining the optimal rule depends only on the *contrast* between treatments, so the parts of the outcome regression that are common across treatments need not be modeled correctly. This note gives the contrast/advantage functions, the g-estimation equations, the double-robustness property, and the simulation findings comparing the two methods.

## Main Content

### Contrast and advantage functions

> [!definition] Contrast / advantage (regret) function (§5.2)
> For binary options $\Psi_k = \{0,1\}$, the **contrast function** is
> $$
> C_k(\bar s_k, \bar a_{k-1}) = Q_k(\bar s_k, \bar a_{k-1}, 1) - Q_k(\bar s_k, \bar a_{k-1}, 0).
> $$
> Any Q-function decomposes as $Q_k(\bar s_k, \bar a_k) = h_k(\bar s_k, \bar a_{k-1}) + a_k\,C_k(\bar s_k, \bar a_{k-1})$ with $h_k = Q_k(\cdot, 0)$, so the optimum is $a_k = I\{ C_k > 0 \}$ — **it depends only on $C_k$**. The related **advantage / regret** is $C_k\,[ I\{C_k>0\} - a_k ]$ (Murphy 2003): the loss from not taking the optimal treatment. $C_k$ is also the **optimal blip-to-zero function** (Robins 2004; Moodie et al. 2007).
> ^def-contrast

### G-estimation

> [!definition] Contrast-based A-learning estimating equations (§5.2, Eqs. 30-31)
> Posit models $C_k(\bar s_k, \bar a_{k-1}; \psi_k)$ for the contrast, $h_k(\bar s_k, \bar a_{k-1}; \beta_k)$ for the nuisance, and $\pi_k(\bar s_k, \bar a_{k-1}; \varphi_k)$ for the propensity $\operatorname{pr}(A_k = 1 \mid \text{history})$. At decision $k$ (response $\bar V_{(k+1)i}$, with $\bar V_{(K+1)i} = Y_i$), solve jointly in $(\psi_k, \beta_k, \varphi_k)$:
> $$
> \sum_{i=1}^{n} \lambda_k(\bar S_{ki}, \bar A_{(k-1)i}; \psi_k)\,\bigl\{ A_{ki} - \pi_k(\bar S_{ki}, \bar A_{(k-1)i}; \varphi_k) \bigr\}\,\bigl\{ \bar V_{(k+1)i} - A_{ki} C_k(\cdots; \psi_k) - h_k(\cdots; \beta_k) \bigr\} = 0,
> $$
> $$
> \sum_{i=1}^{n} \frac{\partial h_k}{\partial \beta_k}\,\bigl\{ \bar V_{(k+1)i} - A_{ki} C_k(\cdots; \psi_k) - h_k(\cdots; \beta_k) \bigr\} = 0,
> $$
> together with the binary-regression score for $\varphi_k$. The estimated rule is $\hat d_k^{\text{opt}} = I\{ C_k(\bar s_k, \bar a_{k-1}; \hat\psi_k) > 0 \}$, fit backward as in Q-learning (Eq. 32). A practical choice is $\lambda_k = \partial C_k / \partial \psi_k$; the variance-optimal $\lambda_k$ is complex.
> ^def-g-estimation

> [!example] Double robustness (§5.2)
> The factor $\{A_{ki} - \pi_k\}$ multiplying the residual is the key: as long as the **contrast $C_k$ is correctly specified**, the estimating equation has mean zero — and hence yields a **consistent** estimator of $\psi_k$ (and the optimal regime) — if *at least one* of the propensity $\pi_k$ or the nuisance $h_k$ is correctly specified. This is the **double-robustness** property. By contrast, [[Q-learning]] requires correct specification of the *entire* Q-function (here both $h_k$ and $C_k$).
> ^ex-double-robustness

### Q vs. A-learning: the trade-off

> [!example] Efficiency vs. robustness, and simulation findings (§5.3, §6, Figs. 1-6)
> - **All models correct:** Q-learning is **more efficient** (e.g. at $K=1$ with correct variance model, the Q-learning estimating equation is the optimal form; A-learning is generally not, so it is relatively inefficient).
> - **Propensity misspecified, contrast correct:** A-learning still yields **consistent** inference on $\psi$ and the optimal regime, whereas Q-learning (which doesn't use the propensity) can be **inconsistent** if its Q-function is wrong. Simulations (Figs. 1, 4): A-learning maintains high value-efficiency $R(\hat d^{\text{opt}})$ across propensity misspecification.
> - **Q-function misspecified:** A-learning's robustness shows most clearly — its value-efficiency stays high while Q-learning's degrades as misspecification grows (Figs. 2, 5).
> - **Both misspecified:** neither dominates uniformly; performance depends on the direction/magnitude of misspecification (Figs. 3, 6).
> - **Performance metrics:** MSE ratio (A/Q) of $\hat\psi$ components (>1 favors Q-learning) and the **v-efficiency** $R(\hat d^{\text{opt}}) = \mathbb{E}\{H(\hat d^{\text{opt}})\}/H(d^{\text{opt}})$ — the fraction of the true optimal regime's population value achieved.
> ^ex-tradeoff
>
> **Interpretability angle.** A-learning is a *middle ground*: it allows flexible/nonlinear modeling of the nuisance $h_k$ while keeping a simple, interpretable parametric contrast $C_k$ — plausible when the science suggests a complex outcome surface but a simple optimal decision boundary. Under the null of no treatment effect in a SMART, contrast functions are zero and correctly specified by design, so A-learning gives consistent inference.

## Connections

- The robust counterpart to [[Q-learning]] within the [[Optimal Regime via Dynamic Programming|backward-induction framework]]; both estimate the same $d^{\text{opt}}$.
- G-estimation derives from Robins's **structural nested mean models**; double robustness parallels that of [[Bayesian Inverse Probability Weighting|IPW/doubly-robust estimators]] in single-stage causal inference.
- Demonstrated on the STAR\*D depression study (§7) as well as the simulations summarized here.

## See Also

- [[Q-learning]] — the full-outcome-model alternative
- [[Q- and A-learning - Overview]] — head-to-head comparison
- [[Time-Varying Treatments and G-computation]] — related sequential-treatment estimation
