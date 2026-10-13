---
title: "Index: Meinshausen Buhlmann 2010 - Stability Selection"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Feature Importance and Stability]]"
date_updated: 2026-10-13
concept_count: 12
---

# Meinshausen Buhlmann 2010 - Stability Selection

> [!abstract] Routing Summary
> This folder fully captures Meinshausen & Bühlmann (2010), *Stability Selection* (JRSS-B; arXiv:0809.2932v2, 30 pp.) in 12 notes. Stability selection runs any sparse selector on many half-samples, keeps variables with a high selection frequency, bounds the expected number of false selections in finite samples, and with a randomised Lasso is consistent without the irrepresentable condition.
> - Need the big picture, section map or source checklist? → [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
> - Need the Lasso / graphical Lasso setup and notation ($S$, $N$)? → [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]
> - Need selection probabilities, stability paths, the stable set or the algorithm? → [[Stability Paths and the Stable-Variable Set]]
> - Need the PFER/FWER bound $E(V)\le q_\Lambda^2/((2\pi_{thr}-1)p)$, calibration or its proof? → [[Stability Selection PFER Bound (Theorem 1) and Its Proof]]
> - Need the graphical-model example or computational cost vs CV? → [[Stability Selection for Gaussian Graphical Models and Computational Cost]]
> - Need the irrepresentable condition, the §3 intro claims, the randomised Lasso or the $\rho>0.5$ toy example? → [[Randomised Lasso and the Irrepresentable Condition]]
> - Need Theorem 2, sparse eigenvalues and Lemmas 3-7? → [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]
> - Need randomised OMP and Tropp's exact recovery condition? → [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]
> - Need the simulation designs (A)-(G), Figs 5-7 and the CV comparison? → [[Stability Selection Simulation Study - Designs A-G and Results]]
> - Need the actual (approximate) numbers behind Figs 5-6, per design and cell? → [[Stability Selection Figs 5-6 - Per-Cell Power Readings]]
> - Need limitations, what it does not deliver, or a practitioner checklist? → [[Stability Selection - Discussion, Limitations and Practice]]
> - Need the reference list or which external result a proof uses? → [[Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works]]
^abstract-ss-routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Sparse structure $S$, $N$; Lasso; graphical Lasso | [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]] | definition | — | eqs (1)-(4) |
| Selection probability $\hat\Pi^\lambda_K$ (Def. 1) | [[Stability Paths and the Stable-Variable Set]] | definition | Setup | Half-samples without replacement |
| Stable set (Def. 2) | [[Stability Paths and the Stable-Variable Set]] | definition | Def. 1 | $\max_\lambda\hat\Pi^\lambda_k\ge\pi_{thr}$ |
| Riboflavin permutation example | [[Stability Paths and the Stable-Variable Set]] | example | Def. 1-2 | CV admits 14 null genes; randomised SS separates all 6 |
| PFER bound (Thm 1) | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] | theorem | Def. 3, exchangeability | $E(V)\le q_\Lambda^2/((2\pi_{thr}-1)p)$ |
| Simultaneous selection (Def. 5, Lemma 1) | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] | lemma | Def. 1 | $\hat\Pi^{simult}\ge2\hat\Pi-1$ |
| Pointwise control | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] | definition | Thm 1 | $\Lambda=\{\lambda\}$ |
| Graphical-model SS, cost | [[Stability Selection for Gaussian Graphical Models and Computational Cost]] | example | Thm 1 | $E(V)\le30$ of 12720 edges; ≈3× 10-fold CV |
| Irrepresentable condition (12) | [[Randomised Lasso and the Irrepresentable Condition]] | definition | Setup | Needed for Lasso consistency |
| Randomised Lasso (13) | [[Randomised Lasso and the Irrepresentable Condition]] | definition | Lasso | Penalties in $[\lambda,\lambda/\alpha]$ |
| Sparse eigenvalues (Def. 4, Asm 1) | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] | definition | — | $\phi_{max}/\phi_{min}^{3/2}<\sqrt C/\kappa$ |
| Consistency of SS + randomised Lasso (Thm 2) | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] | theorem | Asm 1 | No noise selected for all $\lambda\ge\lambda_{min}$ |
| ROMP, exact recovery condition (19) | [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]] | algorithm | Randomised Lasso | Consistency claimed under relaxed ERC |
| Designs A-G, Figs 5-7 | [[Stability Selection Simulation Study - Designs A-G and Results]] | example | Thm 1-2 | SS ≥ base method except design A; FP control vs CV |
| Per-cell power values, Figs 5-6 | [[Stability Selection Figs 5-6 - Per-Cell Power Readings]] | example | Designs A-G | Lasso 0.40 → SS 0.63 → SS+rand 0.67 (avg, 0.1s); Fig. 6 exceptions |
| Limitations and practice | [[Stability Selection - Discussion, Limitations and Practice]] | concept | all | Exchangeability, i.i.d. resampling, not causal |
| Bibliography | [[Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works]] | reference | — | 48 works; Zhang & Huang (2008) drives Lemma 4 |

## Notes

- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — CONTAINS: research question, contributions, key findings, full Source Map (section → note), dependency chain
- [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]] — CONTAINS: §1-1.2; sparse $S$/$N$ definition; linear model (1); Lasso (2); Gaussian graphical model (3); graphical Lasso (4); clustering/consensus clustering remark
- [[Stability Paths and the Stable-Variable Set]] — CONTAINS: §2-2.3; Def. 1 selection probabilities (5); Remark 1; stability path; Def. 2 stable variables (7); eq. (6); median probability model link; stability-selection algorithm; Example I riboflavin permutation (Fig. 1), CV picks 14 null genes Fig. 1 per-panel plot readings (top-4 separation band ≈0.47-0.74; α=0.2 all 6 above top permuted ≈0.29).
- [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] — CONTAINS: §2.4; Def. 3; Theorem 1 (8)-(9); PFER/PCER/FWER; exchangeability discussion; calibration table ($\sqrt{0.8p}$, $\pi_{thr}=0.9$); $\lambda_{min}$ via $q$; pointwise control; App. §6.1 Def. 5 (20), Lemma 1 (21) with proof; §6.2 Lemma 2, proof of Thm 1; calibration-arithmetic check (2.5 vs 4); minimal-PFER check ($1/p^2$ vs $1/p$) Π̂^{simult,q} typo flag.
- [[Stability Selection for Gaussian Graphical Models and Computational Cost]] — CONTAINS: §2.5 Example II (Fig. 2 real, Fig. 3 permuted null); §2.6 cost accounting (25 vs 8.1 fits; ratio 3 or 5.5; 10 s timing) Figs 2-3 panel-by-panel readings (null-row stability edges 1, 2, 3, 1, 0, 0).
- [[Randomised Lasso and the Irrepresentable Condition]] — CONTAINS: §3 model (10), consistency (11); §3 intro claims (plain subsampling already gives large gains; Random-Forest-style randomisation); irrepresentable condition (12); adaptive Lasso/thresholding; randomised Lasso (13) and weight scheme; weakness trade-off; relation to Bolasso/adaptive Lasso/thresholding; §3.2 toy example (Fig. 4) Fig. 4 readings (variable-3 peak ≈0.99/0.83/0.71 for α=1/0.5/0.2; ρ for figure unstated).
- [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] — CONTAINS: Def. 4 (14); Assumption 1 (15) vs sparse Riesz (16); Theorem 2 (17)-(18); Remarks 2-4; App. §6.3 Def. 6; Lemmas 3-7 (22)-(34) with step-by-step proofs (probability splits, $\chi^2$ tail, union bound, projection invariance, KKT monotonicity); $\lambda_{min}$ radical checked against page image; eq. (26) constant check; proof map Lemma 3 step-1 inequality chain (s≥1).
- [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]] — CONTAINS: §3.3 FoBa/MC+ mention; ROMP algorithm; exact recovery condition (19); claimed consistency result; artificial noise covariates caveat; "sufficient and necessary" vs "sufficient" note; OMP/ROMP results table from Fig. 6
- [[Stability Selection Simulation Study - Designs A-G and Results]] — CONTAINS: §4 ADEMP framing; designs (A)-(G); response generation (SNR 0.5/2, Bayes 1/8, 1/3); performance measure; Fig. 5 header table (violations, max cor); per-design numeric reading of Fig. 5 and Fig. 6 incl. exceptions; headline findings; Fig. 7 error-control experiment with numeric ranges per panel
- [[Stability Selection Figs 5-6 - Per-Cell Power Readings]] — CONTAINS: per-cell tables (Lasso/SS/SS+rand, 0.1s and 0.4s) for Fig. 5 Lasso regression, Fig. 6 logistic Lasso and OMP; averages; exceptions where base method wins; 60-vs-64 cell count note
- [[Stability Selection - Discussion, Limitations and Practice]] — CONTAINS: §5 claims; limitations table; what SS does not deliver; practitioner checklist; SHAP-mass contrast; gaps (JRSS-B discussion, arithmetic flags) consolidated errata table (incl. Π̂^{simult,q} typo).
- [[Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works]] — CONTAINS: all 48 references grouped by role with citation pages

## Sources
- [[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]] — Meinshausen & Bühlmann (2010), JRSS-B 72(4):417-473; arXiv:0809.2932v2 (all notes)

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — single-fit importance bias
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — importance under correlated predictors
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — importance stability across near-optimal models
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — analytic flexibility
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — simulation-study design
- [[Multiple Testing Corrections]] — FWER/FDR background
- [[Model Selection and Overfitting]] — why CV over-selects
