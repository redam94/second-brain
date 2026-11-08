---
title: "Bareinboim 2016 - Sample Selection Bias and Recoverability"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Bareinboim 2016 - Causal Inference and the Data-Fusion Problem.pdf]]"
source_location: "Sample Selection Bias and The Generalizability of Clinical Trials, pp. 7349-7350 (PDF pp. 5-6), Fig. 4, Eqs. 13-14, Definition 4, Theorem 1, Summary Result 2"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Bareinboim Pearl 2016 - Causal Inference and Data Fusion"
doc_type: paper
depends_on:
  - "[[Bareinboim 2016 - SCM Principles and Confounding Bias]]"
used_by:
  - "[[Bareinboim 2016 - Transportability and Data Fusion]]"
aliases:
  - Selection backdoor criterion
  - S-backdoor
  - Recoverability from selection bias
  - Generalizability of clinical trials (Bareinboim Pearl)
---

# Bareinboim 2016 - Sample Selection Bias and Recoverability

> [!summary]
> Sample selection bias arises when units enter the data by a mechanism (indicator $S=1$) that depends on treatment, outcome or their causes. The paper shows when $P(y\mid do(x))$ can be **recovered** from $P(\cdot\mid S=1)$: simple cases (Fig. 4A/4B), the **selection-backdoor criterion** (Definition 4, Theorem 1) which jointly handles confounding and selection and needs an *unbiased* dataset on a subset of variables, and the clinical-trial pattern in which **post-treatment** variables enable generalization (Eq. 14) and the usual S-ignorability reweighting fails.

## Overview

Confounding bias concerns treatment assignment; selection bias concerns *data gathering*. Example: in a study of a training program's effect on earnings, high earners report more often, so inferences are biased. Selection bias challenges tasks in AI (refs 27, 28), statistics (29, 30), genetics, economics and epidemiology. In the paper's notation, $S$ is a special **indicator variable**: $S=1$ means the unit entered the data pool, $S=0$ otherwise. Only $P(y,x\mid S=1)$ (and possibly some population-level marginals) is accessible.

## Main Content

### Canonical models (Fig. 4A, 4B)

- **Fig. 4B**: selection is treatment dependent ($X\to S$), and $S$ is d-separated from $Y$ by $X$, so $P(y\mid x)=P(y\mid x,S=1)$. If $X$ and $Y$ are unconfounded, $P(y\mid x)=P(y\mid do(x))$, hence
$$P(y\mid do(x))=P(y\mid x,S=1)\quad\text{(recoverable; refs 37, 38).}$$
- **Fig. 4A**: selection is *also outcome dependent* ($Y\to S$); $S$ is not separable from $Y$ by $X$ and $Q$ is **not recoverable** by any method without stronger assumptions (ref 39).
- The odds ratio can be recovered from selection bias even in settings where the risk difference cannot (refs 37, 38, 41).

### Confounding and selection together (Fig. 4C-F)

In realistic models, covariates (age, sex, socioeconomic status) affect sampling probabilities. In Fig. 4C, $W_1$ (sex) drives treatment and sampling, so *both* biases must be controlled. By the backdoor criterion, $\{W_1,W_2\}$, $\{W_1,W_2,Z\}$, $\{W_1,Z\}$, $\{W_2,Z\}$ and $\{Z\}$ are all backdoor admissible, but **only $\{Z\}$ is appropriate for selection bias**: in the adjustment formula (Eq. 8) with set $T$, the prior $P(t)$ must also be estimable, which is feasible only for the set independent of $S$. The proper adjustment is
$$P(y\mid do(x))=\sum_z P(y\mid x,z,S=1)\,P(z\mid S=1).$$

In Fig. 4D no set is both admissible and available from the biased dataset. In a big-data setting, however, additional datasets measuring population-level quantities over subsets of variables may exist (e.g. $P(\text{age},\text{sex},\text{race})$ from census data, free of selection bias).

> [!definition] Definition 4 (Selection backdoor criterion, S-backdoor; ref 39)
> Let $Z$ be partitioned into $Z^+\cup Z^-$, where $Z^+$ contains all nondescendants of $X$ and $Z^-$ the descendants of $X$, and let $G_s$ be the graph including the sampling mechanism $S$. $Z$ satisfies the **selection backdoor criterion** if
> 1. $Z^+$ blocks all backdoor paths from $X$ to $Y$ in $G_s$;
> 2. $X$ and $Z^+$ block all paths between $Z^-$ and $Y$ in $G_s$, i.e. $(Z^-\perp Y\mid X,Z^+)$;
> 3. $X$ and $Z$ block all paths between $S$ and $Y$ in $G_s$, i.e. $(Y\perp S\mid X,Z)$; and
> 4. $Z$ and $Z\cup\{X,Y\}$ are measured in the **unbiased** and **biased** studies, respectively.
>
> Conditions 1 and 2 ensure $Z$ is backdoor admissible; condition 3 separates the sampling mechanism from $Y$; condition 4 guarantees $Z$ is measured in both the population-level and biased data.
^def-s-backdoor

> [!theorem] Theorem 1 (recovery under S-backdoor)
> If $Z$ is S-backdoor admissible, causal effects are identified by
> $$P(y\mid do(x))=\sum_z P(y\mid x,z,S=1)\,P(z)\qquad[13]$$
> where $P(z)$ comes from the unbiased (population-level) data and $P(y\mid x,z,S=1)$ from the biased data.
^thm-s-backdoor

**Worked check on Fig. 4D.** Any of $\{T_1,Z_3\}$, $\{Z_1,Z_3\}$, $\{Z_2,Z_3\}$, $\{W_2,Z_3\}$ satisfies conditions 1 and 2. The first three fail condition 3, but $\{W_2,Z_3\}$ satisfies it because $Y\perp S\mid\{W_2,Z_3\}$ in $G$. If census data measure $\{W_2,Z_3\}$ and the biased data measure $\{X,Y,W_2,Z_3\}$, condition 4 holds and
$$P(y\mid do(x))=\sum_{w_2,z_3}P(y\mid x,w_2,z_3,S=1)\,P(w_2,z_3).$$

**Sufficient, not necessary.** In Fig. 4E, condition 1 is never satisfied, yet a do-calculus derivation recovers the experimental distribution *even without an unbiased dataset* (ref 40), via a ratio of selection-conditioned probabilities normalized by $P(w_2\mid w_1,S=1)$ (the exact expression is printed on p. 7350 of the paper). Fig. 4E and 4F show structures with no S-admissible set requiring more involved recoverability strategies involving post-treatment variables.

### The generalizability of clinical trials (Fig. 4F)

In trials, confounding need not be controlled (randomization), and the main task is to generalize from a nonrepresentative sample ($S=1$) to the population at large. Participation cannot be mandated, so volunteers who respond to financial and medical incentives may differ from the policy population. Assume (big-data context) that both the $S$-biased experimental distribution $P(y,z\mid do(x),S=1)$ and an unbiased observational distribution $P(x,z,y)$ are available. The derivation transforms the target into those two datasets:

$$\begin{aligned}
P(y\mid do(x))&=\sum_z P(y\mid do(x),z)\,P(z\mid do(x))\\
&=\sum_z P(y\mid do(x),z)\,P(z\mid x)\\
&=\sum_z P(y\mid do(x),z,S=1)\,P(z\mid x)\end{aligned}\qquad[14]$$

The first factor is estimable from the trial's biased data; the second from the population-level dataset. (Reading of the derivation: the second line uses $P(z\mid do(x))=P(z\mid x)$, i.e. $X$ and $Z$ unconfounded in the Fig. 4F population; the third uses S-admissibility, $S\perp Y\mid Z,X$, which lets the trial's $S=1$ stratum-specific effect stand in for the population one. The paper prints the three lines without annotations.)

> [!theorem] Post-treatment variables and S-ignorability (correction to a standard practice)
> Previous analyses (refs 12, 42, 43) invariably relied on **S-ignorability**, $Y_x\perp S\mid Z$, under which generalization is accomplished by reweighting (recalibrating) $P(z)$. Recently it was shown (ref 44) that S-ignorability is **rarely satisfied by post-treatment variables** and, even when it is, reweighting by $P(z)$ does not give the correct result. Valid generalization needs only **S-admissibility**, $S\perp Y\mid Z,X$, and that $P(z\mid do(x))$ be identified; both are readable from the graph. The general reweighting estimator is Eq. 14 with $P(z\mid do(x))$ replacing $P(z\mid x)$. (Footnote: "the language of ignorability is too coarse for handling posttreatment variables.")
^thm-s-admissibility-trials

> [!summary] Summary Result 2 (Recoverability from selection bias)
> The S-backdoor criterion is a sufficient condition for simultaneously controlling confounding and sampling selection bias. In clinical trials, causal effects can be recovered from selection bias via simple graphical conditions using both pretreatment and posttreatment variables. More powerful recoverability methods exist for special model classes (refs 39-41).
^summary-result-2

## Examples

> [!example] Numerical recovery (Fig. 4B-type design)
> Population: $X\in\{0,1\}$ randomized-like (no confounding), $P(Y{=}1\mid x)=0.30+0.20x$. Units enter the sample with probability depending on treatment only: $P(S{=}1\mid x)=0.8$ if $x{=}1$, $0.2$ if $x{=}0$. Because selection depends only on $X$, $P(y\mid x,S{=}1)=P(y\mid x)$ and the effect $0.20$ is recovered from the biased sample. If instead $P(S{=}1\mid x,y)$ depends on $Y$ (Fig. 4A), the naive estimate is biased.
> ```python
> import numpy as np
> rng = np.random.default_rng(1); n = 2_000_000
> x = rng.integers(0,2,n); y = rng.random(n) < .30+.20*x
> s_trt = rng.random(n) < np.where(x==1, .8, .2)               # selection on X only (Fig. 4B)
> s_out = rng.random(n) < np.where(y, .9, .3)                  # selection on Y (Fig. 4A)
> eff = lambda m: y[m & (x==1)].mean() - y[m & (x==0)].mean()
> print(round(eff(s_trt),3), round(eff(s_out),3))              # 0.200 (recovered) vs 0.188 (biased)
> ```
> Output: `0.2 0.188`. The second number (0.188 against a true 0.20) is distorted because outcome-dependent selection changes the within-arm outcome rates asymmetrically (here the sample over-represents converters, compressing the risk difference); the odds ratio would still be recoverable (refs 37, 38, 41).
^example-selection-recovery

> [!example] Marketing reading
> Platform conversion-lift or panel data are rarely random samples of the customer base: users who opt in to tracking, browse logged-in, or are reachable on the platform are selected ($S=1$). If selection depends on exposure ($X\to S$) only, the within-sample lift is recoverable (Fig. 4B). If selection depends on conversion (e.g. only converters are identifiable after a login or purchase), the effect is not recoverable without a population-level reference. S-backdoor says what to take from an unbiased source (e.g. a census-like first-party customer file measuring $\{W_2,Z_3\}$) and what from the biased platform data. Cf. the observational-versus-RCT lift comparisons in [[Conversion Lift Studies on Ad Platforms]] and selection issues in MMM data noted in [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]].

## Connections

- Same machinery as transportability: [[Bareinboim 2016 - Transportability and Data Fusion]] (an $S$ node there marks population difference, here sampling).
- The potential-outcomes counterpart (IPPW with $P(S=1\mid X)$, conditional exchangeability $Y^a\perp S\mid X$): [[Degtiar 2023 - Weighting and Matching Methods]] and [[Degtiar 2023 - Identifying Assumptions]].
- 2014 paper's explicit exclusion of man-made selection: [[Pearl 2014 - Selection Diagrams and Definition of Transportability]].
- Backdoor background: [[Bareinboim 2016 - SCM Principles and Confounding Bias]].

## See Also

- [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]
