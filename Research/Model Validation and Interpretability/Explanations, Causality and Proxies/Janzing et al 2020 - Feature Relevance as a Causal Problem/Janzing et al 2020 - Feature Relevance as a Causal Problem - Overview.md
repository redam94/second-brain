---
title: Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem.pdf]]"
source_location: "Janzing, Minorics & Blöbaum, 'Feature relevance quantification in explainable AI: A causal problem', AISTATS 2020, PMLR 108 (arXiv:1910.13413v2, 27 Nov 2019), whole paper pp.1-11: Abstract; §1; §2.1-2.2; §3; §4.1-4.2; §5; references"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Janzing et al 2020 - Feature Relevance as a Causal Problem"
doc_type: paper
depends_on:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
  - "[[DAGs and Causal Identification]]"
used_by:
  - "[[Dillon et al - SHAP and Causal Insights - Overview]]"
aliases:
  - Janzing Minorics Bloebaum 2020
  - Feature Relevance as a Causal Problem
  - Feature Relevance Quantification in Explainable AI
  - Marginal vs Conditional Expectations in SHAP
---

# Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview

> [!summary]
> Janzing, Minorics & Blöbaum (AISTATS 2020) ask which distribution should be used for the "dropped" features when Shapley values attribute $f(x)-\mathbb E f(X)$. Distinguishing Pearl's **observational** from **interventional** conditioning, they argue that the right object is the *interventional* expectation $\mathbb E[Y\mid do(X_T=x_T)]$. Because the inputs of an algorithm are its only causes, this equals the **marginal** expectation $\mathbb E[f(x_T,X_{\bar T})]$ (eq. 14). Observational conditional expectations violate sensitivity: by Lemma 1, a feature the function ignores can get non-zero credit. The scope is narrow by design: $Y$ is "the output of the system and not a property of the external world", so the paper settles what SHAP explains about the *model* and nothing about the causal effect of a real-world feature.
^summary

## Overview

### Research Question and Contribution

**Bibliographic details (title block, p.1).** Dominik Janzing, Lenon Minorics and Patrick Blöbaum, all at **Amazon Research Tübingen, Germany**. The paper's own date line is **25 November 2019**; the arXiv stamp of v2 is 27 Nov 2019 (arXiv:1910.13413v2 [stat.ML]). Published at AISTATS 2020, PMLR 108.

**Question.** When explaining why $f(x)$ deviates from $\mathbb E f(X)$ with Shapley values, the features outside a coalition $T$ must be averaged out. Should they be averaged over $P(X_{\bar T}\mid X_T=x_T)$, as in the theory of SHAP (Lundberg & Lee 2017), or over $P(X_{\bar T})$, as in its implementation?

**Contribution (Abstract, p.1).** The confusion "is based on not carefully distinguishing between observational and interventional conditional probabilities". The authors "conclude that unconditional rather than conditional expectations provide the right notion of dropping features in contradiction to the theoretical justification of the software package SHAP". SHAP's code is unaffected because it uses marginal expectations as an "approximation". That approximation "encouraged others to 'improve' SHAP in a way that we believe to be flawed".

## Main Content

### Key findings

1. Under observational conditioning, irrelevant-but-correlated inputs get credit (Example 1, Lemma 1).
2. Treating inputs as causes of the output makes the interventional and marginal value functions coincide (eq. 14). Marginal SHAP is thereby causally justified *for the model*.
3. The alleged symmetry violation of expectation-based Shapley values (Sundararajan & Najmi 2019) is defensible: the induced binary game is itself asymmetric.
4. On linear models with known attribution $\alpha_j(x_j-\mathbb EX_j)$, KernelSHAP (marginal) is close to the truth while SHAPR (conditional) is widely dispersed, both on Gaussian simulations and on UCI Human Activity Recognition data (Figs. 4-5, histograms only; read-off values: Gaussian errors span about $\pm0.5$, HAR errors about $\pm0.10$).

### How the argument fits together

```
baseline axioms (§2) ──► which distribution for dropped features? (§3, eq. 3 vs 4)
                               │
           ┌───────────────────┼─────────────────────────┐
     back-door eq.(5)    Example 1 / Lemma 1      inputs-as-causes eq.(14)
   intervention cuts     conditional ⇒ credit      do(X_T) on model
   X1's dependences      to unused features        = marginal expectation
           └───────────────────┼─────────────────────────┘
                     marginal SHAP is right (for f)
                               │
             symmetry reply (§3)   ·   experiments (§4)   ·   conclusion (§5)
```

### Source Map

| Source section | Content | Note |
|---|---|---|
| Title block (p.1) | Authors, Amazon Research Tübingen affiliation, date line 25 Nov 2019, arXiv v2 stamp 27 Nov 2019 | this note, Bibliographic details |
| Abstract, §1 Motivation (pp.1-2) | Robustness/adversarial motivation ("hard to analyze which features were decisive") and fairness motivation; baseline case studied "mostly for the case of real-valued inputs and differentiable $f$"; $Y$ real-valued "for reasons that will become clear later"; problem $f:\mathcal X_1\times\dots\times\mathcal X_n\to\mathbb R$; baseline vs expectation; paper plan, incl. claim that IG and Shapley values are the unique attribution functions for the axioms, and that Datta et al. (2016) supports marginalization over unused features | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] |
| §2 Prior Work (p.2) | DeepLIFT, LRP, LIME (cited as "Ribeiro and Singh (2016)" sic), gradient methods, Molnar | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] |
| §2.1 eq. (1), 5 properties, fn. 1-2 (p.2) | Integrated gradients; Completeness, Sensitivity, Implementation Invariance, Linearity, Symmetry-Preserving | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients#^def-five-properties]] |
| §2.1 Theorem 1 (p.3) | Convex combinations of path methods; IG unique symmetric path method | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients#^thm-1-path-methods]] |
| §2.2 eq. (2) (p.3) | Shapley value of set function; $C(j\mid T)$; baseline set function $g(T)=f_T(x_T)-f(x^0)$; Sundararajan & Najmi (2019) | [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients#^def-shapley-set-function]] |
| §3 eq. (3)-(4), fn. 3 (pp.3-4) | Conditional vs marginal simplified functions; Lundberg & Lee's justification; TreeExplainer change | [[Janzing 2020 - Conditional vs Marginal Dropping of Features#^def-eq3-eq4]] |
| §3 Fig. 1, eq. (5) (p.4) | Confounded structure (drawn edges $Z\to X_{1,2,3}\to Y$, no $Z\to Y$; $Z$ white = latent); back-door adjustment; two observations | [[Janzing 2020 - Conditional vs Marginal Dropping of Features#^fig-1-confounded]], [[Janzing 2020 - Conditional vs Marginal Dropping of Features#^thm-eq5-backdoor]] |
| §3 Example 1, eq. (6)-(13) (pp.4-5) | Irrelevant feature $f=x_1$ with $X_1=X_2$ | [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity#^ex-1-irrelevant-feature]] |
| §3 Lemma 1 + paradox (p.5) | Failure of Sensitivity (printed form conditions on $X_{\bar T}$ — typo, flagged); $\tilde g$ vs $f$ | [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity#^thm-lemma-1]] |
| §3 Fig. 2, eq. (14), fn. 4 (pp.5-6) | True features vs inputs (Fig. 2 drawn with five features; bottom panel cuts $\tilde X_1\to X_1$, $\tilde X_2\to X_2$; caption typo "ob some object"); interventional = marginal | [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation#^thm-eq14-interventional-marginal]] |
| §3 symmetry, Fig. 3 (p.6) | Sundararajan & Najmi Ex. 4.9; reply via $\tilde g(1,0)\neq\tilde g(0,1)$; full $\tilde g$ table and contributions; additive-model generalisation | [[Janzing 2020 - Symmetry Axiom Objection and Reply]] |
| §4.1.1 eq. (15) (p.7) | Shapley kernel weighted least squares; subset sampling | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^def-eq15-shapley-kernel]] |
| §4.1.2 eq. (16) (p.7) | KernelSHAP Monte Carlo set function | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] |
| §4.2 (p.7) | Linear ground truth $\alpha_j(x_j-\mathbb EX_j)$; SHAP vs SHAPR | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^thm-linear-ground-truth]] |
| §4.2.1, Fig. 4 (p.8) | Gaussian conditional; $n=3$, $n=10$ designs and results; Fig. 4 values (errors on $\pm0.5$; marginal spikes about 1,750 and 4,500; pooled about $n\times1000$ errors) | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^ex-gaussian-design]], [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^fig-4-gaussian]] |
| §4.2.2, Fig. 5 (pp.8-9) | Aas et al. kernel estimator (3 steps); UCI HAR design and results; Fig. 5 values (errors on $\pm0.10$; marginal spike about 1,220, conditional peak about 230) | [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^alg-aas-kernel-conditional]], [[Janzing 2020 - KernelSHAP vs SHAPR Experiments#^fig-5-har]] |
| §5 Conclusion, Acknowledgements (p.9) | Restated claims; axioms vague | [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] |
| References (pp.9-11) | 27 references, listed in full below | cited inline across notes |

### Reference list (pp.9-11)

All 27 entries, grouped by the role they play in the paper:

| Role | References |
|---|---|
| Adversarial-robustness motivation (§1) | Goodfellow, Shlens & Szegedy 2015 (ICLR); Sharif et al. 2016 (ACM CCS); Kurakin, Goodfellow & Bengio 2018; Eykholt et al. 2018 (CVPR); Brown et al. 2018 (Adversarial Patch, arXiv:1712.09665) |
| Fairness motivation (§1) | Dwork et al. 2012 (ITCS); Kilbertus et al. 2017 (NeurIPS); Barocas, Hardt & Narayanan 2018 (fairmlbook.org) |
| Attribution methods surveyed (§2) | Shrikumar, Greenside & Kundaje 2016 (DeepLIFT); Binder et al. 2016 (LRP); Ribeiro, Singh & Guestrin 2016 (LIME); Chattopadhyay et al. 2019 (ICML, causal attributions for neural nets); Molnar 2019 (Interpretable Machine Learning) |
| Axiomatic results (§2) | Sundararajan, Taly & Yan 2017 (integrated gradients, ICML); Friedman 2004 (path methods, IJGT 32(4)); Shapley 1953; Sundararajan & Najmi 2019 (The many Shapley values, arXiv:1908.08474) |
| SHAP and its conditional variants (§3-4) | Lundberg & Lee 2017 (NeurIPS); Lundberg, Erion & Lee 2018 (TreeSHAP, arXiv:1802.03888); Aas, Jullum & Løland 2019 (SHAPR, arXiv:1903.10464) |
| Causal and marginalisation background (§1, §3) | Pearl 2000 (Causality); Datta, Sen & Zick 2016 (Quantitative Input Influence, IEEE S&P); J. H. Friedman 2001 (gradient boosting / partial dependence, Ann. Stat.); Zhao & Hastie 2019 (JBES) |
| Computation and data (§4) | Charnes et al. 1988 (Shapley value as weighted least squares); Mahalanobis 1936; Anguita et al. 2013 (HAR dataset, ESANN) |

## Examples

> [!example] Example: The paper's argument in one worked case
> Take Example 1 of the paper: $f(x_1,x_2)=x_1$ with $X_1=X_2$ binary and equiprobable, explained at $x=(1,1)$, so $f(x)-\mathbb Ef=1/2$. Conditional dropping (eq. 3) splits the credit $\phi_1=\phi_2=1/4$, although the model never reads $x_2$. Marginal dropping (eq. 4) gives $\phi_1=1/2$, $\phi_2=0$. Eq. (14) shows that the marginal numbers are exactly what an intervention on the model's inputs would produce. Details: [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity#^ex-1-irrelevant-feature]].
^ex-argument-in-one-case

## Connections

### Positioning

- **Against conditional SHAP.** The paper is the theoretical counterpoint to the conditional-expectation programme of Aas et al. (2019) and the early conditional TreeSHAP. Footnote 3 records that TreeExplainer "has meanwhile been changed accordingly".
- **Versus Kumar et al. (2020).** [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] treats the conditional/interventional choice as a catch-22. Janzing et al. resolve it by fixing the question (*how does the output respond when the inputs are set?*), at the price Kumar et al. emphasise: evaluating $f$ off the data manifold.
- **Versus permutation importance.** In the analogous permutation-importance debate, conditional schemes are usually preferred for the *data-level* question. See [[Strobl et al 2008 - Conditional Variable Importance - Overview]] and [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Versus causal claims from SHAP.** The paper's model-level causality is exactly what practitioners must *not* read as market-level causality. See [[Dillon et al - SHAP and Causal Insights - Overview]].

### Marketing-Analytics Relevance

- A SHAP decomposition of a sales or conversion model is a statement about the **model**. Marginal SHAP is the correct way to ask "which inputs does it use?", e.g. when reviewing per-segment tree models of a shared KPI. Conditional SHAP will smear credit across co-flighted channels.
- Neither version estimates incrementality. Channel effects need identification: experiments, geo tests, or adjustment for confounders like demand ([[Experimental Benchmarks for Observational Ad Measurement]], [[Bayesian Media Mix Modeling - Overview]], [[Causal Machine Learning - Overview]]).
- Choosing among model fits by total SHAP mass instead of held-out accuracy is a [[Researcher Degrees of Freedom|researcher degree of freedom]], not validation.

### Notes in this set

- [[Janzing 2020 - Baseline Attribution Axioms and Integrated Gradients]] — §1-2: problem set-up, five axioms, Theorem 1, Shapley set function
- [[Janzing 2020 - Conditional vs Marginal Dropping of Features]] — §3: eq. (3)-(5), Fig. 1
- [[Janzing 2020 - Irrelevant-Feature Example and Failure of Sensitivity]] — §3: Example 1, Lemma 1, $\tilde g$ paradox
- [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] — §3: Fig. 2, eq. (14), scope
- [[Janzing 2020 - Symmetry Axiom Objection and Reply]] — §3: Fig. 3
- [[Janzing 2020 - KernelSHAP vs SHAPR Experiments]] — §4: eq. (15)-(16), Gaussian and HAR experiments, Figs. 4-5
- [[Janzing 2020 - Conclusions, Limitations and Model-vs-World Attribution]] — §5 and synthesis

## See Also

- [[Spurious Association and Confounds]] — confounding in regression, the source of the model/world gap
- [[Do-Calculus in Summary Causal DAGs]] — the do-operator in more general graphs
- [[Potential Outcomes Framework]] — the real-world estimand that model attributions do not identify
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — attribution across equally good models
- [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] — catch-22 including the information-theoretic position
