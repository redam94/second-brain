---
title: "Stability Selection - Discussion, Limitations and Practice"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/feature-importance
  - type/concept
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §5 Discussion (p. 21); assumption caveats in §2.4 (p. 8), Remark 4 (p. 14), §3.3 (pp. 16-17), §4 (p. 20). Practitioner guidance in the final sections is the ingester's synthesis, flagged as such"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Selection PFER Bound (Theorem 1) and Its Proof]]"
  - "[[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]"
  - "[[Stability Selection Simulation Study - Designs A-G and Results]]"
  - "[[Stability Selection Figs 5-6 - Per-Cell Power Readings]]"
used_by:
  - "[[MMM Model Selection and Application]]"
aliases:
  - Stability Selection Limitations
  - Stability Selection in Practice
---

# Stability Selection - Discussion, Limitations and Practice

> [!summary]
> The authors' discussion (§5) makes four claims:
> - cross-validation "fails often for high-dimensional data, sometimes spectacularly";
> - stability selection gives finite-sample control of false discoveries and so a transparent way to choose regularisation;
> - its output depends little on the initial regularisation;
> - with the randomised Lasso it is consistent where the Lasso is not.
>
> The main limitations, from the paper's own caveats, are: Theorem 1 needs exchangeability of noise variables; Theorem 2's threshold is near 1 and asymptotic; the ROMP proof is only sketched; i.i.d. subsampling is assumed. Some calibration numbers in §4 do not match the bound's arithmetic. For applied marketing analytics, stability selection is a cheap, assumption-light **diagnostic of driver fragility**. It is not a guarantee of causal relevance.
^summary-ss-stability-selection-discussion-limitatio

## Overview

The arXiv version ends with a short discussion. The JRSS-B read-paper version adds published discussion contributions and an authors' reply, which are **not** in the ingested PDF and are not captured here (see Gaps).

## Main Content

### What the authors claim (§5, p. 21)

1. **Problem.** Structure estimation and variable selection are "notoriously difficult", especially in high dimensions, and "Cross-validation fails often for high-dimensional data, sometimes spectacularly."
2. **Generality.** It applies to any selector, demonstrated on regression and Gaussian graphical models.
3. **Error control.** Finite-sample familywise (or other false-discovery) control gives "a transparent principle to choose a proper amount of regularisation".
4. **Robustness.** The solution "depends surprisingly little on the chosen initial regularisation".
5. **Improvement over the base method.** Efficient high-dimensional selectors are often inconsistent "even in rather simple settings". Stability selection with the randomised Lasso is consistent where the Lasso fails.
6. **Summary phrase.** "the marriage of subsampling and high-dimensional selection algorithms, yielding finite sample familywise error control and markedly improved structure estimation."

### Limitations stated or implied by the paper

| Limitation | Where | Consequence |
|---|---|---|
| Theorem 1 needs **exchangeable** noise-variable selection indicators | §2.4 p. 8 | The guarantee is formally valid only for symmetric noise designs. Fig. 7 suggests robustness, but there is no proof |
| **Not worse than random guessing** | eq. (8) | Mild; weaker constants if violated |
| PFER bound is **conservative** (Markov + Lemma 1) | App. §6.2 | Fewer selections than needed for the target; some power lost |
| Theorem 2's threshold $\pi_{thr}\ge1-\delta_w$ with $\delta_w=p_w(1-p_w)^{Cs^2}$ is essentially 1 | p. 13, Lemma 7 | Qualitative explanation; practical $\pi_{thr},\alpha$ come from simulations |
| Theorem 2 assumes a **Gaussian linear model with fixed design**, $s\ge7$, $p>10$ | §3 | No theory for logistic, graphical or clustering cases in this paper |
| Weight-only randomisation in the theorem; subsampling + weights handled by a Markov argument | Remark 4 | Recommended practice is covered only loosely |
| **ROMP** consistency proof only reported, and uses artificial noise covariates | §3.3 | Not verifiable from this paper |
| Subsampling assumes **i.i.d.** observations | §2 | Time series, panels and clustered data need adapted resampling |
| Low $\alpha$ worsens conditioning | p. 14 | $\alpha\in(0.2,0.8)$ recommended |
| Computational cost ≈ 3× (up to 5.5×) 10-fold CV | §2.6 | Usually acceptable |
| §4 calibration: $q_\Lambda=\sqrt{0.8p}$, $\pi_{thr}=0.6$ stated as $E(V)\le2.5$, whereas (9) gives 4 | p. 20 | Reported discrepancy; see [[Stability Selection PFER Bound (Theorem 1) and Its Proof#^note-ss-calibration-check]] |
| Fig. 6 caption refers to "Fig. 2"; (G) reported as $n=158$ in §4 but $n=115$ in §2.2/Fig. 5 | pp. 18-19 | Typos; no substantive effect |
| Proof of Theorem 1 applies Lemma 2 to "$\hat\Pi^{simult,q}_k$"; should read $\hat\Pi^{simult,\lambda}_k$ | App. §6.2, p. 22 | Notational typo; see [[Stability Selection PFER Bound (Theorem 1) and Its Proof#^prf-ss-thm1]] |
| Lemma 5 proof writes $X_S\gamma$ where $X_A\gamma$ is meant | App. §6.3, p. 25 | Typo; flagged in [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] |
| Lemma 6 says "for all $\delta\in(0,1)$" although no $\delta$ appears, and eq. (26) has an inconsistent constant ($0.3$) | App. §6.3, pp. 24-25 | Constants need repair; flagged in [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] |
| In the proof of Theorem 2, the weight event probability is printed "$\ge1-\delta_w$" where Lemma 5 gives $\ge\delta_w$ | App. §6.3, pp. 26-27 | Typo; flagged in the Theorem 2 note |

### What stability selection does *not* deliver

- **No effect sizes or CIs.** It selects variables. It does not give unbiased coefficients or post-selection inference. Effect estimation after selection needs separate machinery ([[Regularization Bias and the Partially Linear Model]], [[DML Estimators for ATE and the Interactive Model]]).
- **No causal relevance.** A stably selected variable is stably *predictive* in the fitted model class. Correlated proxies and confounders can be stable too. Causal relevance is a different question ([[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]]).
- **No protection from a misspecified model class.** If every subsample fits the wrong functional form (e.g. no saturation in media effects), selection frequencies are stable but wrong.

## Examples

> [!example] Practitioner checklist for marketing-driver selection (ingester's synthesis, not from the paper)
> 1. **Decide the target first.** Fix an error target, e.g. $E(V)\le1$, and $\pi_{thr}$ (0.75-0.9) **before** looking at results. This removes a researcher degree of freedom ([[Researcher Degrees of Freedom]]).
> 2. **Bound the path.** Set $q_\Lambda\le\sqrt{E(V)(2\pi_{thr}-1)p}$ and stop each path at $q_\Lambda$ entries.
> 3. **Resample correctly.** For weekly data, draw half-samples of contiguous blocks (e.g. 8-13 week blocks) instead of i.i.d. rows. This keeps the autocorrelation that i.i.d. subsampling destroys ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]).
> 4. **Randomise.** Use randomised penalties ($\alpha\approx0.5$) when drivers are strongly collinear, e.g. channels bought together or several adstock versions of the same channel.
> 5. **Group related features.** Report group selection probabilities (any lag or transform of channel $j$) using Definition 1's set form.
> 6. **Run a null check.** Add permuted decoy drivers (common permutation, §2.2 style) and confirm none reach $\pi_{thr}$.
> 7. **Report frequencies, not one model.** Show selection frequencies next to, not instead of, the final model. A driver selected in 55% of half-samples is a fragile claim.
> 8. **Do not over-read stability.** Stability is not causal validity. Confirm key drivers with experiments where possible ([[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]).
^ex-ss-practice-checklist

> [!example] Contrast: choosing among fits by an in-sample importance total
> A common shortcut is to compare candidate model fits by the total importance (e.g. total SHAP mass) they assign to a favoured channel, instead of by held-out accuracy or selection stability. Stability selection reverses the logic. It asks how *reproducible* a driver's inclusion is across perturbations of the data, under a pre-declared false-selection budget. A driver that tops the importance ranking in one fit but appears in under half of the subsample fits should not be reported as a key driver. See [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
^example-ss-contrast-choosing-among-fits

## Connections

- **Overfitting and forking paths.** Searching over $\lambda$, feature sets and transforms is a garden of forking paths ([[Garden of Forking Paths]], [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]). Stability selection is one principled way to budget false discoveries across that search.
- **Goodhart risk.** If "selected by stability selection" becomes a target analysts tune toward (e.g. by adjusting the candidate pool), the guarantee erodes. See [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- **Bayesian analogue.** Posterior inclusion probabilities under shrinkage priors ([[Spike-and-Slab Prior for Covariate Selection]], [[Horseshoe and Regularized Horseshoe Priors]]) are the model-based counterpart. The median probability model (Barbieri & Berger 2004) is cited by the authors as related.
- **Governance.** Selection-stability evidence is natural material for model-validation "effective challenge" ([[SR 11-7 - Model Risk Management Guidance - Overview]]; [[NIST AI RMF 1.0 - Overview]] on measurement and TEVV).
- **Sample size.** Half-sampling halves the effective $n$, so small datasets lose power. See [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].

## Gaps in this capture

- **JRSS-B discussion not captured.** The citation names the published read paper, JRSS-B 72(4):417-473. That version runs to about p. 448 and is followed by the discussion contributions and the authors' reply (roughly pp. 448-473). The vault's raw file is arXiv:0809.2932v2, which has neither the discussion nor any revisions made for publication. To capture it, the published PDF would need to be added to `raw/`. Until then, no claim in this folder should be attributed to the discussants.
- **Fig. 5-6 values are approximate.** The paper prints no numbers. Every cell has been read off the plots to about ±0.03 in [[Stability Selection Figs 5-6 - Per-Cell Power Readings]].
- **Arithmetic flags raised by the ingester, none of them in the paper:**
  - The §4 calibration (2.5 vs 4; [[Stability Selection PFER Bound (Theorem 1) and Its Proof#^note-ss-calibration-check]]).
  - The minimal PFER ($1/p^2$ vs $1/p$; [[Stability Selection PFER Bound (Theorem 1) and Its Proof#^note-ss-min-pfer-check]]).
  - The eq. (26) constant ([[Randomised Lasso Consistency under Stability Selection (Theorem 2)#^note-ss-eq26-constant]]).
  - The 60-vs-64 cell count ([[Stability Selection Figs 5-6 - Per-Cell Power Readings#^note-ss-60-cells]]).
- The bibliography is captured in [[Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works]].
- Later developments (e.g. complementary-pairs refinements of the bound) are outside this source and not covered.

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Selection PFER Bound (Theorem 1) and Its Proof]]
- [[Stability Selection Simulation Study - Designs A-G and Results]]
- [[MMM Model Selection and Application]]
