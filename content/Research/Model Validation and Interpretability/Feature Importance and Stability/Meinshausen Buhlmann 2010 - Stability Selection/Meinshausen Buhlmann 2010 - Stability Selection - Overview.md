---
title: "Meinshausen Buhlmann 2010 - Stability Selection - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/variable-selection
  - topic/high-dimensional-statistics
  - type/overview
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), JRSS-B 72(4):417-473; ingested from arXiv:0809.2932v2 (16 May 2009), 30 pp. Whole paper: Abstract, §1-§5, Appendix §6.1-6.3, Figs 1-7, eqs (1)-(34)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Multiple Testing Corrections]]"
  - "[[Model Selection and Overfitting]]"
  - "[[Cross Validation Checking]]"
used_by:
  - "[[Stability Paths and the Stable-Variable Set]]"
  - "[[Stability Selection PFER Bound (Theorem 1) and Its Proof]]"
  - "[[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]"
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
aliases:
  - Stability Selection
  - Meinshausen-Buhlmann Stability Selection
  - Meinshausen and Bühlmann 2010
---

# Meinshausen Buhlmann 2010 - Stability Selection - Overview

> [!summary]
> Meinshausen & Bühlmann wrap any sparse selector (Lasso, graphical Lasso, OMP, boosting, clustering) in a subsampling loop. They estimate how often each variable is selected over random half-samples and keep the variables whose maximum **selection probability** over a regularisation range $\Lambda$ clears a threshold $\pi_{thr}$. Two results carry the paper. **Theorem 1** gives a finite-sample bound on the expected number of false selections, $E(V)\le q_\Lambda^2/((2\pi_{thr}-1)p)$, which replaces the hard choice of $\lambda$ with an error-rate target. **Theorem 2** shows that stability selection with a **randomised Lasso** (random penalty weights in $[\lambda,\lambda/\alpha]$) is variable-selection consistent even when the Lasso's irrepresentable condition fails. In simulations and on two genomics datasets it matches cross-validation's power while cutting false selections sharply.
^summary-ss-meinshausen-buhlmann-2010-stability-sele

## Overview

**Research question.** Sparse structure estimation (which regression coefficients are non-zero, which edges a Gaussian graphical model has, how many clusters exist) needs a regularisation level $\lambda$. Choosing $\lambda$ is hard in high dimensions because the noise level is unknown and prediction-optimal choices such as cross-validation over-select. How can we choose regularisation with a guarantee, and can we beat the design conditions that limit the Lasso?

**Contribution.** Stability selection is "not a new variable selection technique. Its aim is rather to enhance and improve existing methods" (§2, p. 4). It has three parts:
1. **Stability paths**: selection probability $\hat\Pi^\lambda_k$ against $\lambda$, a resampling counterpart to the coefficient path (§2.1).
2. **Error control**: a finite-sample per-family error rate (PFER) bound that turns a target $E(V)$ into a choice of $(q_\Lambda,\pi_{thr})$ (§2.4, Thm 1).
3. **Randomised Lasso**: extra randomness in the penalty weights, which gives consistency under a sparse-eigenvalue condition that is much weaker than the irrepresentable condition (§3, Thm 2).

**Key findings.**
- On the riboflavin data with 4082 of 4088 genes permuted, the stability path separates real from permuted genes far better than the Lasso path. Cross-validation admits 14 permuted genes (§2.2, Fig. 1).
- Results are insensitive to $\pi_{thr}\in(0.6,0.9)$ and to $\Lambda$ (§2.4).
- Computational cost is about 100 subsample fits, roughly 3 times 10-fold CV (§2.6).
- Across 64 simulation scenarios, stability selection recovers as many or more true variables than the base method in every design except the near-orthogonal one. Randomisation helps most when many variables violate the irrepresentable condition (§4, Fig. 5-6). In plot readings for Lasso regression, the average P(first $0.1s$ correct) is 0.40 for the Lasso, 0.63 with subsampling and 0.67 with added randomisation. For classification and OMP (Fig. 6) a few cells favour the base method, and the OMP gain is small ([[Stability Selection Figs 5-6 - Per-Cell Power Readings]]).
- On real designs the $E(V)\le 2.5$ bound holds empirically even though exchangeability is implausible (Fig. 7).

## Main Content

### Source Map

Every section, definition, theorem, lemma, algorithm, figure and equation, with the note that holds it.

| Source location | Content | Note |
|---|---|---|
| Abstract, §1 (pp. 1-2) | Problem of regularisation choice; contributions | [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]] |
| §1.1 (pp. 2-3), eqs (1)-(4) | Sparse $\beta$, $S$, $N$; linear model; Lasso; Gaussian graphical model; graphical Lasso; clustering | [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]] |
| §1.2 (p. 4) | Outline, prior resampling-for-validation work | [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]] |
| §2 intro (p. 4) | Generic selector $\hat S^\lambda$, tuning parameters (penalty, OMP steps, boosting iterations) | [[Stability Paths and the Stable-Variable Set]] |
| §2.1, Def. 1, eq. (5), Remark 1 (pp. 4-5) | Selection probabilities, stability paths | [[Stability Paths and the Stable-Variable Set]] |
| Fig. 1 (p. 5) | Lasso path vs stability path vs randomised-Lasso stability path, riboflavin data; approximate per-panel readings (separation levels, top permuted-gene values) | [[Stability Paths and the Stable-Variable Set]] |
| §2.2 (pp. 5-6) | Example I: riboflavin, $n=115$, $p=4088$, permutation experiment, CV picks 14 noise genes | [[Stability Paths and the Stable-Variable Set]] |
| §2.3, Def. 2, eqs (6)-(7) (pp. 6-7) | Stable variables $\hat S^{stable}$; median probability model link | [[Stability Paths and the Stable-Variable Set]] |
| §2.4, Def. 3, Thm 1, eqs (8)-(9) (pp. 7-8) | PFER bound; exchangeability; not-worse-than-random-guessing; minimal PFER (printed $1/p^2$, checked as $1/p$) | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] |
| §2.4 calibration (p. 8) | $\pi_{thr}=0.9$, $q_\Lambda=\sqrt{0.8p}$ gives $E(V)\le1$; FWER version; choosing $\lambda_{min}$ | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] |
| §2.4 "Pointwise Control" (p. 8) | $\Lambda=\{\lambda\}$; equivalence for incremental selectors | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] |
| §2.5, Figs 2-3 (pp. 9-10) | Example II: graphical Lasso on 160 genes, $E(V)\le30$ of 12720 edges; permuted null; per-panel readings (null-row stability edge counts 1, 2, 3, 1, 0, 0) | [[Stability Selection for Gaussian Graphical Models and Computational Cost]] |
| §2.6 (p. 10) | Computational requirements: 100 subsamples, cost ≈ 25 vs 8.1 full fits | [[Stability Selection for Gaussian Graphical Models and Computational Cost]] |
| §3 intro, eqs (10)-(11) (p. 11) | Gaussian linear model, consistency definition, $s\log p=o(n)$; claim that plain subsampling already gives large gains; randomisation in the spirit of Random Forests | [[Randomised Lasso and the Irrepresentable Condition]] |
| §3 intro (p. 11) | ERC called "sufficient and necessary" (vs "sufficient" in §3.3) | [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]] |
| §3.1, eqs (12)-(13) (pp. 11-12) | Irrepresentable condition; randomised Lasso with weakness $\alpha$ | [[Randomised Lasso and the Irrepresentable Condition]] |
| §3.1, Def. 4, Assumption 1, eqs (14)-(16) (p. 13) | Sparse eigenvalues; sparse Riesz comparison | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] |
| §3.1, Thm 2, eqs (17)-(18) (p. 13) | Consistency of stability selection with randomised Lasso | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] |
| Remarks 2-4 (p. 14) | Beta-min consistency; conservativeness for large $\lambda$; subsampling + weights via Markov | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] |
| §3.1 weakness trade-off; "Relation to other work" (pp. 14-15) | $\alpha\in(0.2,0.8)$; Bolasso, adaptive Lasso, thresholding | [[Randomised Lasso and the Irrepresentable Condition]] |
| §3.2, Fig. 4 (p. 15) | Toy example $p=n=200$, $\Sigma_{13}=\Sigma_{23}=\rho$ ($\rho$ for the figure unstated); Fig. 4 readings for $\alpha=1,0.5,0.2$ | [[Randomised Lasso and the Irrepresentable Condition]] |
| §3.3, ROMP algorithm, eq. (19) (p. 16) | Randomised orthogonal matching pursuit; exact recovery condition | [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]] |
| §4 designs (A)-(G) (pp. 17-19) | Simulation designs and real designs | [[Stability Selection Simulation Study - Designs A-G and Results]] |
| Fig. 5 (p. 17) | Lasso regression: P(first 0.1s / 0.4s correct), "64" settings (60 plotted); violations, max cor; reading by design | [[Stability Selection Simulation Study - Designs A-G and Results]] |
| Fig. 5 bar/cross values (p. 17) | Per-cell approximate values, all 60 cells × 2 rows | [[Stability Selection Figs 5-6 - Per-Cell Power Readings]] |
| Fig. 6 (p. 18) | Lasso classification and OMP regression; exceptions where the base method wins | [[Stability Selection Simulation Study - Designs A-G and Results]] |
| Fig. 6 bar/cross values (p. 18) | Per-cell approximate values, classification and OMP, 4 rows | [[Stability Selection Figs 5-6 - Per-Cell Power Readings]]; OMP summary in [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]] |
| Fig. 7 (p. 19), §4 (p. 20) | Stability selection vs CV on (F), (G): $E(V)\le2.5$ control; CV 11-75 false selections vs SS about 0-2 ($\alpha=0.5$) / 1.5-4 ($\alpha=1$) | [[Stability Selection Simulation Study - Designs A-G and Results]] |
| §5 (p. 21) | Discussion | [[Stability Selection - Discussion, Limitations and Practice]] |
| App. §6.1, Def. 5, eq. (20), Lemma 1, eq. (21) (pp. 21-22) | Sample splitting; simultaneous selection probability; $\hat\Pi^{simult}\ge 2\hat\Pi-1$ | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] |
| App. §6.2, Lemma 2 (pp. 22-23) | Proof of Theorem 1 (incl. the $\hat\Pi^{simult,q}$ typo) | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] |
| App. §6.3, Def. 6, Lemmas 3-7, eqs (22)-(34) (pp. 23-27) | Proof of Theorem 2, step by step (probability splits, $\chi^2$ tail, union bound, projection invariance, KKT monotonicity, $\alpha\le1/s\le1/7$); eq. (26) constant check | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] |
| Acknowledgments, References (pp. 27-30) | 48 cited works with citation pages and roles | [[Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works]] |
| JRSS-B discussion contributions (published read paper, within pp. 417-473) | Not in the arXiv PDF | Not captured; see Gaps in [[Stability Selection - Discussion, Limitations and Practice]] |

### Concept Dependency Chain

```
Lasso / graphical Lasso / OMP (base selectors, §1.1)
  └─> selection probabilities Π̂ (Def 1) ─> stability path (§2.1)
        └─> stable set Ŝ^stable (Def 2)
              ├─> PFER bound (Thm 1) <─ Lemma 1 (sample splitting) + Lemma 2 (Markov)
              │     └─> calibration of q_Λ, π_thr, pointwise control
              └─> randomised Lasso (eq 13) + sparse eigenvalues (Asm 1)
                    └─> consistency without irrepresentable condition (Thm 2) <─ Lemmas 3-7
                          └─> ROMP analogue (§3.3)
```

## Examples

> [!example] The whole method on one screen (worked calibration)
> **Setup:** $p=1000$ candidate variables, target $E(V)\le1$, threshold $\pi_{thr}=0.9$.
> **Calibrate (Thm 1):** (9) requires $q_\Lambda^2\le(2\cdot0.9-1)\cdot1000\cdot1=800$, so $q_\Lambda\le28$. This is the paper's rule $q_\Lambda=\sqrt{0.8p}$ (§2.4, p. 8).
> **Run (Defs 1-2):** on each of about 100 half-samples of size $\lfloor n/2\rfloor$, run the Lasso (or randomised Lasso, $\alpha\in(0.2,0.8)$) from $\lambda_{max}$ down until 28 variables have entered; record which variables were selected.
> **Select:** keep every variable selected in at least 90% of half-samples. Under exchangeability, at most one false selection is expected.
> **Cost (§2.6):** about 25 full-data Lasso fits when $p>n$, roughly three times 10-fold CV.
> Each step is developed in [[Stability Paths and the Stable-Variable Set]] and [[Stability Selection PFER Bound (Theorem 1) and Its Proof]].
^ex-ss-overview-walkthrough

## Connections

- **Overfitting and forking paths.** Choosing $\lambda$ by eye or by many CV runs is one of the [[Researcher Degrees of Freedom]] (see also [[Garden of Forking Paths]]). Stability selection replaces that choice with a pre-declared error target, a procedural fix in the spirit of [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].
- **Multiple testing.** The PFER and FWER bounds are frequentist multiple-testing guarantees ([[Multiple Testing Corrections]]) for a selection procedure that has no p-values.
- **Prediction vs selection.** The paper's warning that CV over-selects is a concrete case of [[Model Selection and Overfitting]] and [[Cross Validation Checking]]. Predictive accuracy and correct structure are different targets, the theme of [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- **Bayesian analogues.** The stable set is the frequentist cousin of the median probability model; compare [[Spike-and-Slab Prior for Covariate Selection]] and [[Global-Local Shrinkage Priors]].
- **Other importance and stability methods in this run.** [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] (stability across near-optimal models, not across subsamples) and [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- **Marketing analytics.** In weekly media data with 52-156 rows and dozens of correlated channel, price and macro controls, a single Lasso fit's selected set is fragile. Selection frequency over subsamples is a direct diagnostic of that fragility. See [[Stability Selection - Discussion, Limitations and Practice]].

## See Also
- [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]
- [[Stability Paths and the Stable-Variable Set]]
- [[Stability Selection PFER Bound (Theorem 1) and Its Proof]]
- [[Stability Selection for Gaussian Graphical Models and Computational Cost]]
- [[Randomised Lasso and the Irrepresentable Condition]]
- [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]
- [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]
- [[Stability Selection Simulation Study - Designs A-G and Results]]
- [[Stability Selection Figs 5-6 - Per-Cell Power Readings]]
- [[Stability Selection - Discussion, Limitations and Practice]]
- [[Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works]]
- [[Strobl 2007 - Bootstrap-Induced Association]] — rationale for subsampling without replacement rather than the bootstrap
- [[Strobl 2008 - Peptide-Binding Application]] — mid-rank reshuffling of correlated predictors is a use case for stability checks
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] — instability of selected predictor subsets in small samples
- [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] — instability of subset selection
