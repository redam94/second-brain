---
title: "Bareinboim 2016 - Transportability and Data Fusion"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Bareinboim 2016 - Causal Inference and the Data-Fusion Problem.pdf]]"
source_location: "Transportability and the Problem of Data Fusion and Conclusion, pp. 7350-7352 (PDF pp. 6-8), Fig. 5, Eqs. 15-17, Summary Result 3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Bareinboim Pearl 2016 - Causal Inference and Data Fusion"
doc_type: paper
depends_on:
  - "[[Bareinboim 2016 - SCM Principles and Confounding Bias]]"
  - "[[Bareinboim 2016 - Sample Selection Bias and Recoverability]]"
  - "[[Pearl 2014 - Selection Diagrams and Definition of Transportability]]"
used_by:
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - Data fusion problem
  - Meta-transportability (2016 summary)
  - Transport formulas Eq 15 16 17
  - External validity solved
---

# Bareinboim 2016 - Transportability and Data Fusion

> [!summary]
> Task 4 asks how to extrapolate experimental findings across populations that differ in distributions *and* in causal mechanisms. The paper recaps selection diagrams, re-derives three transport formulas (Eqs. 15-17) for the age, language-proxy and biomarker scenarios of the 2014 paper, states that transportability is feasible **iff** a do-calculus sequence separates the $do$-operator from the $S$-variables, and extends to **data fusion**: combining many heterogeneous studies, with a consistent estimator constructible from several limited sources even when it is not constructible from any one alone (Summary Result 3). The Conclusion declares recovery from selection bias plus generalization of trials, together "external validity", to be formally solved.

## Overview

Transportability, introduced in ref. 45 (the 2014 paper reviewed in [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]), "lies at the heart of every scientific investigation because, invariably, experiments performed in one environment are intended to be used elsewhere, where conditions are likely to be different." Special cases appear under labels such as lack of external validity (refs 46, 47), heterogeneity (48) and meta-analysis (49, 50). The paper formalizes the problem nonparametrically and shows that, "despite glaring differences between the two populations, it might still be possible to infer causal effects at the target population by borrowing experimental knowledge from the source populations."

## Main Content

### Selection diagrams and the query

> [!definition] Selection diagram (this paper's phrasing)
> Variable $S$ (drawn as a square) is a special variable representing the set of all unaccounted factors (the paper's example: proximity to the beach) that create differences in, say, $Z$ (age) between source $\pi$ and target $\pi^*$. Conditioning on $S=s^*$ means considering $\pi^*$; otherwise $\pi$. Footnote ##: each diagram is the **overlap** of the causal diagrams of source and target; formally, each variable $V_i$ is supplemented with an $S$-node whenever the underlying function $f_i$ or background factor $U_i$ differs between $\pi$ and $\pi^*$. "If knowledge about commonalities and disparities is not available, transport across domains cannot, of course, be justified."
^def-selection-diagram-2016

**Task.** Express $Q=P(y\mid do(x),S=s^*)=P^*(y\mid do(x))$ in terms of experiments conducted in $\pi$, i.e. $P(y,z\mid do(x))$, and observations collected in $\pi^*$, i.e. $P^*(y,x,z)$.

### Fig. 5A: age differs between populations (Eq. 15)

$X$ treatment, $Y$ outcome, $Z$ age; $S\to Z$ and no $S\to Y$.

$$
\begin{aligned}
Q&=P(y\mid do(x),S=s^*)\\
&=\sum_z P(y\mid do(x),S=s^*,z)\,P(z\mid S=s^*,do(x))\\
&=\sum_z P(y\mid do(x),z)\,P(z\mid S=s^*,do(x))\\
&=\sum_z P(y\mid do(x),z)\,P(z\mid S=s^*)\\
&=\sum_z P(y\mid do(x),z)\,P^*(z)
\end{aligned}\qquad[15]
$$

Justification (paper): the first line conditions on $Z$; the second uses the independence $(S\perp Y\mid Z)_{G_{\overline X}}$, called **S-admissibility**, "the graphical mirror of S-ignorability"; the third is Rule 3 of the do-calculus ($Z$ is a pretreatment variable not affected by $do(x)$); the last is the definition of the $S$-node. Equation 15 is a **transport formula**: the first factor is estimable from $\pi$, the second from $\pi^*$.

### Fig. 5B: language as proxy for unmeasured age (Eq. 16)

$Z$ = language skills, a proxy for unmeasured age; populations differ in how $Z$ depends on age, with the same age distribution. A simple derivation (ref 45) gives the **different** equation
$$
Q=P(y\mid do(x)),\qquad[16]
$$
i.e. direct transport with no reweighting.

### Fig. 5C: post-treatment biomarker (Eq. 17)

$Z$ is a post-treatment biomarker and populations differ in how $Z$ depends on $X$:
$$
Q=\sum_z P(y\mid do(x),z)\,P^*(z\mid x)\qquad[17]
$$
To estimate the effect in $\pi^*$, estimate the $z$-specific effect in $\pi$ and average over $z$ weighted by $P^*(z\mid x)$ estimated at $\pi^*$ rather than the traditional $P^*(z)$.

### Fig. 5D: not transportable

A scenario "in which $Q$ is not transportable regardless of the number of samples collected": the unmeasured confounder (bidirected arrow) between $Z$ and $Y$ precludes transportability.

| Fig. | Where $S$ points | Story | Formula |
|---|---|---|---|
| 5A | $Z$ | age distributions differ | $\sum_z P(y\mid do(x),z)P^*(z)$ [15] |
| 5B | $Z$ (via unmeasured age) | proxy; age law the same | $P(y\mid do(x))$ [16] |
| 5C | $Z$ (post-treatment) | $Z$ depends on $X$ differently | $\sum_z P(y\mid do(x),z)P^*(z\mid x)$ [17] |
| 5D | $Z$ with $Z\leftrightarrow Y$ confounding | hidden confounder | not transportable |

### General theory: decision procedure

> [!theorem] Transportability criterion (refs 45, 51, 52)
> Transportability is feasible **if and only if** there exists a sequence of do-calculus rules that transforms the query $Q=P(y\mid do(x),s^*)$ into an expression where the $do$-operator is separated from the $S$-variables. A complete and effective procedure (refs 51, 52) decides, given any selection diagram, whether such a sequence exists and synthesizes a transport formula when possible. Each transport formula determines what information must be extracted from the experimental and observational studies and how to combine them.
^thm-transportability-iff

### Transportability from multiple populations (data fusion)

Generalizing transportability to multiple environments with limited experiments in each yields a principled solution to **data fusion**: combine results from many experimental and observational studies, each on a different population and under different conditions, to synthesize an aggregate effect measure "better in some sense than any one study in isolation." This problem is "typically handled by 'averaging out' differences (e.g. using inverse-variance weighting), which, in general, tends to blur, rather than exploit design distinctions among the available studies." Using multiple selection diagrams to encode commonalities, ref. 53 synthesizes an estimator that is **guaranteed to provide an unbiased estimate of the desired quantity whenever such an estimate exists**, based on information each study shares with the target. "Remarkably, a consistent estimator can be constructed from multiple sources with a limited experiment even in cases where it is not constructable from any subset of sources considered separately" (ref. 54).

> [!summary] Summary Result 3 (Transportability and data fusion)
> There are complete solutions to transportability and data fusion, comprising (a) graphical and algorithmic criteria for deciding transportability and data fusion in nonparametric models; (b) automated procedures for extracting transport formulas specifying what must be collected in each study; and (c) an assurance that, **when the algorithm fails, fusion is infeasible regardless of sample size**. Details: refs 45, 52, 54.
^summary-result-3

### Conclusion (as stated)

The unification of the structural, counterfactual and graphical approaches produced tools resolving confounding control, sampling bias and generalization across populations through one approach: **a syntactic transformation of the query into a form derivable from the available information**. A by-product: recovery from sampling selection bias and generalization of randomized clinical trials, "which, taken together, make up the formidable problem called 'external validity' (refs 45 and 46), have been given a complete formal characterization and can thus be considered 'solved' (55)." The authors hope to stimulate further research on drawing causal inferences from big data.

## Examples

> [!example] Fusion thinking for a measurement stack (our illustration, not the paper's)
> Data sources: national MMM time series (observational, population $\pi_0$), two geo experiments in different regions (experimental, $\pi_1,\pi_2$), a platform conversion-lift study (experimental, selection-biased user sample), and the target = next year's planned budget in region $\pi^*$.
> 1. Draw one selection diagram per source against the target; put $S$-nodes on the mechanisms you believe differ (e.g. baseline demand, media price, funnel conversion).
> 2. Let the algorithm (or by hand, the do-calculus) decide whether $P^*(\text{sales}\mid do(\text{spend}))$ is derivable.
> 3. If yes, the resulting formula says which factor to take from which study. For example, a factor like $P(y\mid do(x),z)$ from the geo test with the largest overlap and $P^*(z\mid x)$ from the target's own observational panel.
> 4. If the algorithm fails, no amount of additional data of the same design will help; the remedy is a new design (a second experiment on the missing variable) or a stronger assumption.
>
> Contrast with inverse-variance pooling, which would blend the experiments' effects without regard to which mechanisms are shared.

> [!example] Python: formula (15) vs (17) vs (16) as a decision function
> ```python
> def transport(story, p_y_do_xz, p_star_z=None, p_star_z_given_x=None, p_y_do_x=None, x=None):
>     """Return P*(y|do(x)) under each of the paper's three stories (dicts keyed by z / (x,z))."""
>     if story == "5A":   # pre-treatment Z, S->Z                  Eq. 15
>         return sum(p_y_do_xz[(x, z)] * p_star_z[z] for z in p_star_z)
>     if story == "5B":   # proxy, age law unchanged               Eq. 16
>         return p_y_do_x[x]
>     if story == "5C":   # post-treatment Z, S->Z                 Eq. 17
>         return sum(p_y_do_xz[(x, z)] * p_star_z_given_x[x][z] for z in (0, 1))
>     raise ValueError("5D-type diagrams are not transportable: no formula exists")
> ```
^example-transport-function

## Connections

- Full derivations, definitions and theorems for the single-source case: [[Pearl 2014 - Selection Diagrams and Definition of Transportability]], [[Pearl 2014 - S-Admissibility and the Graphical Criterion]], [[Pearl 2014 - Appendix Derivations of Transport Formulas]].
- Contrast with estimator-first treatments that assume the right covariates are known and focus on weighting and doubly robust estimation: [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]] (which cites this paper as the identifiability review).
- The "averaging out" critique relates to hierarchical/partial pooling: [[Hierarchical Models]].
- Marketing application and worked numbers: [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]]; estimator walk-through [[Degtiar 2023 - Marketing Application Transporting Experiment Results]].

## See Also

- [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]
- [[Bareinboim 2016 - Sample Selection Bias and Recoverability]]
