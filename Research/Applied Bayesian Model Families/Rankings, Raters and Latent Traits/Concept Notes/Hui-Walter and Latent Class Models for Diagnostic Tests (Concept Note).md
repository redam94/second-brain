---
title: "Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/concept-note
source: "concept note, no raw source (cites Hui and Walter 1980; Dawid and Skene 1979; Albert and Dodd 2004; Dendukuri and Joseph 2001)"
source_location: "Synthesis; see Paun 2018 notes for the annotation-model zoo"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Concept Notes"
doc_type: concept
depends_on:
  - "[[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]]"
  - "[[Monsters and Mixtures]]"
used_by:
  - "[[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]"
aliases:
  - Hui-Walter model
  - latent class model without gold standard
  - conditional dependence diagnostic tests
  - parameter counting latent class identification
---

# Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)

> [!summary]
> When no test is a gold standard, latent class analysis estimates prevalence and each test's sensitivity and specificity from the joint pattern of results. Hui & Walter (1980) show two conditionally independent tests are identified if applied in two or more populations with different prevalence; with $J$ raters, the Dawid-Skene model is the multi-class generalisation. Conditional dependence between tests, label switching and degrees-of-freedom counting are the practical pitfalls. Concept note, no raw source; the numerical checks below are computed.

## Overview

Observed: binary results of $R$ tests on each subject; latent: true status $D\in\{0,1\}$. Parameters: prevalence $\pi$; per test sensitivity $Se_r=P(T_r=1\mid D=1)$ and specificity $Sp_r=P(T_r=0\mid D=0)$. Under **conditional independence** given $D$:
$$P(T_1=a,T_2=b)=\pi\,Se_1^aSe_2^b(1-Se_1)^{1-a}(1-Se_2)^{1-b}+(1-\pi)\,(1-Sp_1)^a(1-Sp_2)^b\,Sp_1^{1-a}Sp_2^{1-b}.$$

## Main Content

> [!definition] Hui-Walter design
> Two tests applied to subjects from $G\ge2$ populations with different prevalences $\pi_g$ but the same $Se$ and $Sp$ (constant accuracy). Each population gives a $2\times2$ table with 3 free cell probabilities.
> ^def-hui-walter

> [!theorem] Parameter counting for identifiability
> With $G=2$ populations, 2 tests: data degrees of freedom $=G(2^2-1)=6$; parameters: $\pi_1,\pi_2,Se_1,Sp_1,Se_2,Sp_2=6$. The model is exactly identified (saturated) - no degrees of freedom remain to check fit. Adding a third test or population gives over-identification. A single population with two tests has 3 data df but 5 parameters: not identified. With $R$ conditionally independent tests in one population the model is identified for $R\ge3$ ($2^R-1\ge2R+1$).
> ^thm-hw-counting

> [!definition] Conditional dependence
> If tests share error mechanisms (same biological marker, same annotator guideline), conditional independence fails. Add covariance parameters (Dendukuri & Joseph 2001): $P(T_1=1,T_2=1\mid D=1)=Se_1Se_2+\text{cov}_{12}^{D+}$ and similarly for $D=0$. These cost degrees of freedom and require more tests or populations; ignoring dependence biases prevalence and accuracy estimates (Albert & Dodd 2004 caution that latent class models can be non-robust to misspecified dependence - cited in Paun et al.).
> ^def-cond-dependence

**Label switching and the Youden condition.** The likelihood is invariant to swapping the roles of $D=0$ and $D=1$ with $Se\leftrightarrow1-Sp$. Impose better-than-chance accuracy, **Youden index** $J_r=Se_r+Sp_r-1>0$ for each test (or at least for one test), to select the correct mode; with a prior or constraint this removes the mirror solution. Relabelling post-hoc using a few gold labels is the Paun et al. recipe ([[Paun 2018 - Implementation Priors Label Switching and Guidelines]]).

**Dawid-Skene link.** Hui-Walter with $R$ raters is Dawid-Skene with binary classes, rater-specific confusion matrix $\begin{pmatrix}Sp_r&1-Sp_r\\1-Se_r&Se_r\end{pmatrix}$ and prevalence $\pi$ ([[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]]).

## Examples

> [!example] Cell probabilities for a two-population Hui-Walter design
> **Setup.** $Se=(0.9,0.8)$, $Sp=(0.95,0.9)$, prevalences $\pi=(0.3,0.1)$.
> **Solution.** Cells (++, +-, -+, --): population 1 $=(0.2195,0.0855,0.0905,0.6045)$; population 2 $=(0.0765,0.0585,0.0935,0.7715)$ - each sums to 1, giving 6 free numbers for 6 parameters.
> **Interpretation.** Different prevalence across the two groups is what breaks the symmetry; with equal prevalence the two tables would carry only 3 independent pieces of information.
> ^ex-hw-cells

```python
import numpy as np
Se, Sp, pi = [.9, .8], [.95, .9], [.3, .1]
def cells(p):
    out = []
    for a in (1, 0):
        for b in (1, 0):
            pos = (Se[0] if a else 1-Se[0])*(Se[1] if b else 1-Se[1])
            neg = ((1-Sp[0]) if a else Sp[0])*((1-Sp[1]) if b else Sp[1])
            out.append(p*pos + (1-p)*neg)
    return np.array(out)
print(cells(pi[0]).round(4), cells(pi[1]).round(4))
```

PyMC-style sketch for E69 (untested): `pi = pm.Beta("pi", 1, 1, shape=G)`; `se = pm.Beta(...)`, `sp = pm.Beta(...)` with a Youden constraint such as `pm.Potential("youden", pt.switch(se+sp > 1, 0, -np.inf))`; marginalise $D$ by `pm.math.logsumexp([log(pi)+..., log(1-pi)+...])` for each pattern count with a Multinomial likelihood.

## Relevance to marketing measurement

Two noisy measures of the same latent outcome with no ground truth (e.g. a survey-recall conversion flag and a platform-attributed conversion) face the same structure; Hui-Walter requires subpopulations with different true rates (e.g. geos or cohorts) and constant measurement error across them - a strong assumption worth stating explicitly.

## Connections

- Mixture identifiability and label switching: [[Monsters and Mixtures]]; confusion matrices with partial pooling: [[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]]; related factor models: [[Factor Analysis and PPCA]].
- Measurement error and latent variables in psychometrics: [[Confirmatory Factor Analysis and SEM]].

## See Also

[[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]
