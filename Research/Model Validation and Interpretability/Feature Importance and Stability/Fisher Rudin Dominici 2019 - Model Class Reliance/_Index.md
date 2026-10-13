---
title: "Index: Fisher Rudin Dominici 2019 - Model Class Reliance"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Feature Importance and Stability]]"
date_updated: 2026-10-13
concept_count: 14
---

# Fisher Rudin Dominici 2019 - Model Class Reliance

> [!abstract] Routing Summary
> This folder fully captures Fisher, Rudin & Dominici (2019, JMLR 20(177)), "All Models are Wrong, but Many are Useful". The paper covers Rashomon sets, model reliance (permutation importance), model class reliance (the range of importance over all near-optimal models), finite-sample theory, computation, causal links, simulations and a COMPAS application. It contains 14 notes. This folder is the vault's **owner of the Rashomon effect/set and model-reliance concepts**.
> - Need the paper summary or the section-to-note map? → [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
> - Need the definition of a Rashomon set or MCR? → [[Rashomon Sets and Model Class Reliance - Definitions]]
> - Need permutation importance as a U-statistic, MR vs algorithm reliance, or ratio vs difference? → [[Model Reliance - Permutation Importance as a U-Statistic]]
> - Need Theorems 4-6, the covering number or the best-in-class bound? → [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]
> - Need finite-sample CIs for any model characteristic, or the profile-likelihood link? → [[Rashomon-Set Confidence Intervals and Profile Likelihood]]
> - Need to *compute* MCR (Dinkelbach-style binary search, DC branch-and-bound)? → [[Model Class Reliance - Binary Search Computation]]
> - Need closed-form MR for linear models, or QP1QC for ridge and kernel classes? → [[Model Class Reliance for Linear and RKHS Model Classes]]
> - Need MR in terms of CATE, or conditional (core) model reliance? → [[Model Reliance, Causal Effects and Conditional Model Reliance]]
> - Need the simulation design and coverage results? → [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]
> - Need the COMPAS / Broward County numbers? → [[Model Class Reliance - Recidivism Case Study]]
> - Need the full proofs of Lemma 24, Theorems 4, 25, 6 or Corollary 22? → [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]]
> - Need the full proofs of Lemmas 9, 10, 13, 14 or Proposition 11? → [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]]
> - Need limitations, future work or a practical recipe? → [[Model Class Reliance - Discussion, Limitations and Extensions]]
> - Need authors, affiliations, keywords, funding or the full reference list? → [[Model Class Reliance - Bibliographic Details and Reference List]]
^routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| $\epsilon$-Rashomon set | [[Rashomon Sets and Model Class Reliance - Definitions]] | definition | model class, reference model | $\mathcal R(\epsilon)=\{f\in\mathcal F:e_{\text{orig}}(f)\le e_{\text{orig}}(f_{\text{ref}})+\epsilon\}$ |
| Model class reliance (MCR) | [[Rashomon Sets and Model Class Reliance - Definitions]] | definition | Rashomon set, MR | $[\min_{\mathcal R(\epsilon)}MR,\max_{\mathcal R(\epsilon)}MR]$; independent of the fitting algorithm |
| Model reliance (MR) | [[Model Reliance - Permutation Importance as a U-Statistic]] | definition | permutation importance | $MR=e_{\text{switch}}/e_{\text{orig}}$; 1 = no reliance |
| $\hat e_{\text{switch}}$ as a U-statistic | [[Model Reliance - Permutation Importance as a U-Statistic]] | theorem | MR | Proportional to the average over all $n!$ permutations without fixed points; unbiased |
| Algorithm reliance (AR) | [[Model Reliance - Permutation Importance as a U-Statistic]] | definition | — | Drop-and-refit compares two models, not one |
| Assumptions 1-3 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] | definition | — | Bounded individual, relative and aggregate loss |
| Theorem 4 (outer bound) | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] | theorem | Lemmas 23-24, Hoeffding | $MCR_+\le\widehat{MCR}_+(\epsilon_{\text{out}})+\mathcal Q_{\text{out}}$ w.p. $\ge1-\delta$ |
| Theorem 5 (uniform MR bound) | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] | theorem | covering number | $\sup_f|\widehat{MR}-MR|\le q(\delta,r,n)$ |
| Theorem 6 (inner bound) | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] | theorem | Theorems 5, 25 | $MCR_+\ge\widehat{MCR}_+(\epsilon_{\text{in}})-\mathcal Q_{\text{in}}$ |
| Corollary 22 | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] | theorem | Theorem 4 | Bound on best-in-class MR |
| Uniform deviation via mixture cover | [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]] | proof | Theorem 25, Hoeffding (U-statistics) | Cover chosen against $\tfrac12(D_p+D_s)$ gives $|\hat{\mathbb E}L(f)-\mathbb EL(f)|\le|\hat{\mathbb E}L(g)-\mathbb EL(g)|+2r$ |
| Monotonicity proofs (C.1-C.4 identities) | [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]] | proof | Lemmas 9-14 | Shift identities plus optimality give monotone optimal values in $\gamma$ |
| Proposition 7 | [[Rashomon-Set Confidence Intervals and Profile Likelihood]] | theorem | Lemma 23 | Min/max of $\phi$ over $\hat{\mathcal R}(\epsilon')$ covers $\phi(\mathcal R(\epsilon))$ |
| Profile likelihood = Rashomon set | [[Rashomon-Set Confidence Intervals and Profile Likelihood]] | theorem | likelihood | PLI is a min/max over $\hat{\mathcal R}(\chi_{1,1-\delta}/2n)$ |
| Lemmas 9-10, 13-14 | [[Model Class Reliance - Binary Search Computation]] | theorem | fractional programming | Bound functions plus monotonicity give a binary search over $\gamma$ |
| Proposition 11 | [[Model Class Reliance - Binary Search Computation]] | theorem | Lemma 10 | $\gamma\ge0$ suffices, so each step is reweighted ERM |
| Proposition 15 | [[Model Class Reliance for Linear and RKHS Model Classes]] | theorem | MR | $MR(f_\beta)=1+\frac{2}{e_{\text{orig}}}\{\mathrm{Cov}(Y,X_1)\beta_1-\beta_2'\mathrm{Cov}(X_2,X_1)\beta_1\}$ |
| QP1QC subproblems | [[Model Class Reliance for Linear and RKHS Model Classes]] | theorem | Remark 16 | Ridge and kernel MCR solvable globally |
| Proposition 19 | [[Model Reliance, Causal Effects and Conditional Model Reliance]] | theorem | ignorability, positivity | MR of $E(Y\mid T,C)$ is driven by $\mathrm{Var}(T)$, ATE² and $\mathrm{Var}(\mathrm{CATE})$ |
| Conditional model reliance (CMR) | [[Model Reliance, Causal Effects and Conditional Model Reliance]] | definition | MR | Permute $X_1$ within $X_2$; weighting, matching and imputation estimators |
| Conditions 20-21 | [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]] | definition | MCR | Nearly correct class plus valid bootstrap give coverage of $MR(f_0)$ |
| COMPAS MCR | [[Model Class Reliance - Recidivism Case Study]] | example | RKHS class | Race/sex [1.00, 1.56]; admissible [1.77, 3.61] |
| Reference list by role | [[Model Class Reliance - Bibliographic Details and Reference List]] | reference | — | All 73 cited works grouped into 8 roles |

## Notes

- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]. CONTAINS: research question, 8 key findings, argument diagram, notation table, full Source Map (every section, theorem, lemma, table, figure and appendix mapped to a note), marketing translation.
- [[Rashomon Sets and Model Class Reliance - Definitions]]. CONTAINS: §2 notation definition; population/empirical/$\epsilon<0$ Rashomon sets (Eq 4.1); choice of $f_{\text{ref}}$; standardized loss $\tilde L$; absolute-loss Rashomon set (App B.7) incl. the computation-unaffected and $f_{\text{ref}}$-redundancy remarks; informal MR displays (Eqs 2.1, 2.3); "Perturb" VI and uses of VI (§1); generality of Rashomon-set CIs; COMPAS provenance; MCR definition (Eqs 2.2, 2.4); Figure 1; contribution list; §5.2 related literature.
- [[Model Reliance - Permutation Importance as a U-Statistic]]. CONTAINS: definitions of $e_{\text{switch}}$, $e_{\text{orig}}$, MR (Eq 3.1); MR < 1 claim (App A.2); estimators (Eqs 3.2-3.6) incl. $\hat e_{\text{divide}}$; the $n!$-permutation identity with proof (App A.3); $MR_{\text{difference}}$ (Eq A.4); §3.2 limitations and algorithm reliance; worked $n=3$ example.
- [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]. CONTAINS: Assumptions 1-3; Theorem 4 with 4-step proof summary; Theorem 6 practical-implication typo flag; A.5 delta-method remark and uniform $MR_{\text{difference}}$ bound (B.26); Lemmas 23, 24; $r$-margin-expectation cover (Eq 4.4); Theorem 5 (Eq 4.5); Theorem 25 (Eqs B.22-B.28); Theorem 6 with proof sketch; Figure 3; Corollary 22; difference-based $\mathcal Q$ terms; numeric illustration of bound width.
- [[Rashomon-Set Confidence Intervals and Profile Likelihood]]. CONTAINS: Proposition 7 with proof; Lemma 26 (with a flag on its printed $\epsilon'_1$, which omits the leading $\epsilon$); best-in-class corollary; Corollary 27; estimated-$\phi$ caveat; profile-likelihood equivalence (Eq A.5); advantages and disadvantages; generality remarks.
- [[Model Class Reliance - Binary Search Computation]]. CONTAINS: Table 1; Condition 8; App C preamble identities C.1-C.4; Lemma 9 with proof and boundary-function reading; Figure 4; Lemma 10 with all-part proof sketch and the source's equality-qualified monotonicity implication; Figure 5; Eq 6.2 reweighting; Proposition 11 with proof; Condition 12; Lemma 13 (Eqs 6.4-6.5) incl. equality cases; Lemma 14 with 3-part proof sketch; full binary-search algorithm; Figure 2; §6.3 DC branch-and-bound algorithm.
- [[Model Class Reliance for Linear and RKHS Model Classes]]. CONTAINS: Proposition 15 (Eqs 7.1-7.2) with population and finite-sample proofs; $O(n)$ computation; additive-model extension; Remark 16 (Eq 7.3); $\mathcal F_{\text{lm},r_{\text{lm}}}$ (Eq 7.4); QP1QC (Eq 7.5); Lemma 17 with C.7 proof incl. the equality-at-optimum remark; RKHS class (Eqs 7.6-7.7); RKHS QP1QC (Eqs 7.8-7.11); Lemma 18 with the paper's C.8 relaxation proof and a flag on its lower output bound ($\mu-\sqrt{r_{\mathbf D}r_k}$, not $-(\mu+\sqrt{r_{\mathbf D}r_k})$); full step-by-step finite-sample proof of Eq 7.2 (B.48-B.49); worked collinearity example.
- [[Model Reliance, Causal Effects and Conditional Model Reliance]]. CONTAINS: Proposition 19 (Eq 8.1) with full proof; CMR, $e_{\text{cond}}$ (Eq 8.2), CMCR; weighting, matching (Eq 8.3) and imputation estimators; App A.7 unbiasedness proofs; related conditional-importance approaches; numeric example.
- [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]. CONTAINS: §9.1 framing (AR as in-sample / ranking step) and design (data, $\mathcal F_{d3}$, hinge loss, $\epsilon$); AR/MR/MCR results ($\widehat{MR}(f_{\text{ref}})=3.47$); Figure 6 (same 300 draws, straight-line single-input models, dashed/solid green ovals); Conditions 20-21 with primary and secondary goals and the $MR(f_c)$ typo flag; §9.2 simulation design (as an algorithm); results; Figure 7; ADEMP reading.
- [[Model Class Reliance - Recidivism Case Study]]. CONTAINS: §10 opening context (judicial bias, uses of risk tools, outcome/covariate bias channels, proxies); §10 setup (data, variables, RKHS class, $\epsilon$, splits); results table (MR, AR, MCR, CIs) and the AR-MR agreement remark; global-cap and truncation caveats; Figure 8 incl. the $\hat e_{\text{stnd}}$ y-axis notation; §10.2 CSP, proxies and limitations.
- [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]]. CONTAINS: Lemma 24 proof (Eqs B.5-B.9, partial derivatives); Theorem 4 Steps 1-4 (Eqs B.10-B.19) incl. $q(k)=q_{\text{ratio}}(k,k/\sqrt2)$, Hoeffding U-statistic exponents, difference version; Corollary 22 proof (B.20-B.21); proofs of Eqs B.22-B.26 (mixture cover $D^\star$, switched $\tilde D_p,\tilde D_s,\tilde D^\star$, B.29-B.37); source of the $r\sqrt2$ radius; B.25 printing inconsistency; Theorem 6 proof (B.38-B.45) incl. $\delta/2$ rewrite of $\mathcal Q_{\text{in}}$ and difference version; table of where the log constants come from.
- [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]]. CONTAINS: App C preamble identities C.1-C.4 and $\hat e_{\text{divide}}$ scope; Lemma 9 proof both parts (C.5); Lemma 10 Parts 1-3 (C.6); Proposition 11 proof (C.7-C.10); Lemma 13 both parts incl. equality cases (C.11); Lemma 14 Parts 1-3 (C.12-C.16) incl. Condition 12 at $\gamma=0$; source typo in C.5.3; worked bisection example.
- [[Model Class Reliance - Bibliographic Details and Reference List]]. CONTAINS: title, venue, arXiv version; author affiliations and contribution order; keywords; acknowledgments and NIH/EPA/HEI grant numbers; App A.1 code location; all 73 references grouped into 8 roles with citing sections and vault links; entry-count check.
- [[Model Class Reliance - Discussion, Limitations and Extensions]]. CONTAINS: §11 conclusion and 4 future directions; App A.1 code; table of 12 stated limitations with locations; interpretive cautions; practical MCR validation recipe for marketing models.

## Sources
- [[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]: Fisher, A., Rudin, C. & Dominici, F. (2019). All Models are Wrong, but Many are Useful: Learning a Variable's Importance by Studying an Entire Class of Prediction Models Simultaneously. *JMLR* 20(177):1-81 (arXiv 1801.01489v5). All 81 pages are covered.

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]: split-selection bias in tree importances
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]: conditional permutation importance
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]: why unconditional permutation extrapolates
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]: stability across perturbed fits
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]: Shapley-value explanation pitfalls
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: origin of the "Rashomon effect"
- [[Bias in Random Forest Variable Importance]]: existing vault note on RF importance bias
