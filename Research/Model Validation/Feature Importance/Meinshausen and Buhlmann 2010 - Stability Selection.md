---
title: "Meinshausen and Buhlmann 2010 - Stability Selection"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/variable-selection
  - type/theorem
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "JRSS-B 72(4), 417–473 (2010); arXiv:0809.2932v2, p. 6"
citation: "Meinshausen, N. & Bühlmann, P. (2010). Stability selection. Journal of the Royal Statistical Society: Series B, 72(4), 417–473."
date_ingested: 2026-10-13
folder: "Model Validation/Feature Importance"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Fisher et al 2019 - Model Class Reliance]]"
  - "[[Riley et al 2020 - Sample Size for Prediction Models]]"
aliases:
  - "Meinshausen Buhlmann 2010"
  - "Meinshausen and Bühlmann 2010"
  - "Stability selection"
---

# Meinshausen and Buhlmann 2010 - Stability Selection

> [!summary]
> Meinshausen & Bühlmann propose **stability selection**: run a variable-selection procedure on many random subsamples and keep only variables selected in a large fraction of them. A simple theorem bounds the expected number of falsely selected variables without knowing the noise level or tuning the regularisation exactly. For validators, it gives a principled, error-controlled replacement for trusting the variable list (or importance top-$k$) of a single fit.

## Overview

*Meinshausen, N. & Bühlmann, P. (2010). Stability selection. JRSS-B 72(4), 417–473 (read paper with discussion). [arXiv:0809.2932v2]*

In high-dimensional problems ($p$ large, possibly $p \gg n$), selection methods such as the lasso depend sharply on the regularisation parameter $\lambda$, and the selected set changes with small perturbations of the data. Choosing $\lambda$ by cross-validation optimises prediction, not correct selection, and typically admits many false positives. The paper asks for a selection method whose error is controlled and which is insensitive to $\lambda$.

## Main Content

> [!definition] Selection probabilities and the stable set
> Let $\hat S^{\lambda} \subseteq \{1,\dots,p\}$ be the variables selected by a base procedure (e.g. lasso) at regularisation $\lambda \in \Lambda$. Draw random subsamples $I \subset \{1,\dots,n\}$ of size $\lfloor n/2 \rfloor$ **without replacement**. The **selection probability** of variable $k$ is
> $$\hat\Pi^{\lambda}_k = \mathbb P^{*}\big(k \in \hat S^{\lambda}(I)\big),$$
> estimated over many subsamples. For a cut-off $\pi_{\text{thr}} \in (\tfrac12, 1)$ the **stable set** is
> $$\hat S^{\text{stable}} = \Big\{k : \max_{\lambda \in \Lambda} \hat\Pi^{\lambda}_k \ge \pi_{\text{thr}}\Big\}.$$
^def-stability-selection

> [!theorem] Error control (Theorem 1)
> Let $V = |N \cap \hat S^{\text{stable}}|$ be the number of falsely selected (noise) variables, and $q_\Lambda = \mathbb E\,|\hat S^{\Lambda}(I)|$ the expected number of variables selected by the base procedure on a subsample across $\Lambda$ (where $\hat S^{\Lambda} = \bigcup_{\lambda \in \Lambda} \hat S^{\lambda}$). Assume the distribution of $\{\mathbb 1\{k \in \hat S^{\lambda}\}, k \in N\}$ is exchangeable over noise variables for all $\lambda$, and the base procedure is no worse than random guessing. Then for $\pi_{\text{thr}} \in (\tfrac12, 1]$,
> $$\mathbb E(V) \le \frac{1}{2\pi_{\text{thr}} - 1}\cdot\frac{q_\Lambda^2}{p}.$$
^thm-stability-selection-bound

Consequences and further results:

- The bound lets an analyst choose $(q_\Lambda, \pi_{\text{thr}})$ to control the **per-family error rate** $\mathbb E(V)$ (and hence the family-wise error rate, since $\mathbb P(V \ge 1) \le \mathbb E(V)$), without estimating the noise variance.
- Results are insensitive to $\pi_{\text{thr}}$ within roughly $0.6$–$0.9$, and the regularisation region $\Lambda$ matters far less than the single $\lambda$ choice does for the plain lasso.
- **Randomised lasso.** Re-weighting each variable's penalty by random weights in $[\alpha, 1]$ before each subsample fit, combined with stability selection, gives consistent variable selection under conditions weaker than the lasso's irrepresentable condition — i.e. it can work when predictors are fairly correlated.
- Applications include graphical-model (network) estimation and gene-expression data; the method wraps any selection procedure, not only the lasso.

## Key Passages

> "Instead the data are perturbed (for example by subsampling) many times and we choose all structures or variables that occur in a large fraction of the resulting selection sets." — Meinshausen & Bühlmann (2010), p. 6

## Implications for Model Validation

- Never treat the top-$k$ features of a single fitted model as "the drivers"; refit on subsamples (or across seeds/time blocks) and report how often each feature is selected or ranked top-$k$.
- A stability threshold gives a defensible, error-controlled shortlist; features that appear in, say, fewer than 60% of refits should not be communicated as key drivers.
- With many candidate predictors and few observations (e.g. weekly series of a few years), selection instability is the norm — compare the error bound $q^2/((2\pi_{\text{thr}}-1)p)$ with the number of variables actually being claimed.
- For time series, subsampling should respect temporal dependence (blocks rather than random rows) — see [[Bergmeir et al 2018 - Cross-Validation for Time Series]].

## Connections

- Directly answers Breiman's warning that perturbing the data changes which variables look important ([[Breiman 2001 - Statistical Modeling The Two Cultures]]).
- Resampling-based counterpart to the model-enumeration approach of [[Fisher et al 2019 - Model Class Reliance]].
- Error-rate control links it to [[Multiple Testing Corrections]]; the overfitting-from-many-candidates problem it guards against is quantified in [[Riley et al 2020 - Sample Size for Prediction Models]].
- A Bayesian alternative for selection uncertainty is the [[Spike-and-Slab Prior for Covariate Selection]].

## See Also

- [[Fisher et al 2019 - Model Class Reliance]] — importance across all near-optimal models
- [[Strobl et al 2008 - Conditional Variable Importance]] — correlated predictors and importance
- [[Riley et al 2020 - Sample Size for Prediction Models]] — candidate predictors versus sample size
- [[Simmons et al 2011 - False-Positive Psychology]] — selection among many analyses inflates false positives
- [[Spike-and-Slab Prior for Covariate Selection]] — posterior inclusion probabilities as a Bayesian analogue
