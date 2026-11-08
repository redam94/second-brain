---
title: "Pearl 2014 - Motivating Examples and Transport Formulas"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/example
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Sec. 3, arXiv pp. 6-9 (journal pp. 585-587), Examples 1-3, Eqs. 3.1-3.4, Fig. 3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]]"
used_by:
  - "[[Pearl 2014 - Selection Diagrams and Definition of Transportability]]"
  - "[[Pearl 2014 - S-Admissibility and the Graphical Criterion]]"
aliases:
  - LA to NYC transport example
  - Age, language and biomarker transport examples
  - Transport formula 3.1 3.2 3.3 3.4
---

# Pearl 2014 - Motivating Examples and Transport Formulas

> [!summary]
> Three Los Angeles to New York City examples show that the right way to reuse an LA experiment depends on the *causal role* of the variable $Z$ whose distribution differs between cities. The same observed disparity $P(z)\neq P^*(z)$ calls for reweighting by $P^*(z)$ when $Z$ is age (Eq. 3.1), for no adjustment when $Z$ is a proxy that does not affect treatment or outcome (Eq. 3.2), and for reweighting by $P^*(z\mid x)$ when $Z$ is a post-treatment biomarker (Eq. 3.4).

## Overview

Notation used throughout: $\Pi$ = study population (Los Angeles, experiment available), $\Pi^*$ = target population (NYC, only observational data available); starred distributions $P^*$ refer to $\Pi^*$. $X$ = exposure, $Y$ = outcome, $Z$ = covariate. Footnote 11: each graph represents the causal structure of the population *prior to treatment*, so $X$ is the level of treatment an individual would take by free choice. Footnote 12: the arrow $Z\to X$ means older people seek treatment more; $Z\to Y$ is the effect of age on the outcome.

## Main Content

### Example 1: $Z$ = age (Fig. 3a)

An LA randomized trial estimates the age-specific effects $P(y\mid do(x),Z=z)$. NYC is older: $P(x,y,z)\neq P^*(x,y,z)$, in particular $P(z)\neq P^*(z)$. Natural inclination: age-specific effects are invariant across cities.

> [!theorem] Transport formula for pre-treatment $Z$ (Eq. 3.1)
> $$
> P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\,P^*(z)\qquad(3.1)
> $$
> It combines **experimental** results from LA, $P(y\mid do(x),z)$, with the **observational** aspect $P^*(z)$ of NYC to produce an *experimental* claim about NYC.
^thm-transport-3-1

Footnote 13: at first glance this is routine "standardization" or "recalibration" (Westergaard 1916; Yule 1934; Lane and Nelder 1982), but it raises the deeper question *why* age-specific effects should be invariant across populations. The task of the paper: state assumptions that make (3.1) valid. Related questions: what must be assumed about other confounders (latent and observed) for (3.1)? Would the same formula hold if $Z$ were a proxy for age, e.g. language proficiency? What if $Z$ is an exposure-dependent variable such as hypertension level standing between $X$ and $Y$?

### Example 2: $Z$ = language proficiency, a proxy for unmeasured age (Fig. 3b)

$Z$ does not affect $X$ or $Y$ but correlates with both through age, which is unmeasured in both studies. Given $P(z)\neq P^*(z)$, how to estimate $P^*(y\mid do(x))$ from the $z$-specific LA effect?

Two readings of the *same* inequality $P(z)\neq P^*(z)$:

| Reading | What differs | Right formula |
|---|---|---|
| (i) Cities have identical age distributions; NYC residents acquire language skills at a younger age, so $P(z\mid \text{age})\neq P^*(z\mid\text{age})$ | the mechanism $\text{age}\to Z$ | $P^*(y\mid do(x))=P(y\mid do(x))$ (3.2): $Z$ is irrelevant, ignore the disparity |
| (ii) $P(z\mid\text{age})=P^*(z\mid\text{age})$ and the disparity reflects genuine age differences, $P(\text{age})\neq P^*(\text{age})$ | the age distribution | reweighting is needed, and (3.2) is invalid since age modifies the response to $X$ |

Because age is unmeasured, (i) cannot be distinguished from (ii) in the probability distribution $P$. **Every distribution compatible with Fig. 3(b) is also compatible with Fig. 3(a), yet the two processes dictate different transport formulas.** Hence "the choice of the proper transport formula depends on the causal context in which population differences are embedded."

**Why $Z$-specific effects are not invariant here.** Using Fig. 3(b), the $Z$-specific effect in NYC is
$$
P^*(y\mid do(x),z)=\sum_{\text{age}}P^*(y\mid do(x),z,\text{age})P^*(\text{age}\mid do(x),z)=\sum_{\text{age}}P^*(y\mid do(x),\text{age})P^*(\text{age}\mid z)=\sum_{\text{age}}P(y\mid do(x),\text{age})P^*(\text{age}\mid z).
$$
If the populations differ in the relation between age and skill, $P(\text{age}\mid z)\neq P^*(\text{age}\mid z)$, the skill-specific causal effect differs as well. Intuition: a NYC person at skill level $z$ is probably in a different age group from a Los Angeles person at the same skill; since age, not skill, shapes treatment response, LA residents respond differently from NYC residents at the same skill. The essential difference between Examples 1 and 2: **age is exogenous; skills are indicative of earlier factors (age, education, ethnicity) capable of modifying the effect.**

### Example 3: $Z$ = post-treatment biomarker, surrogate endpoint (Fig. 3c)

$Z$ is $X$-dependent, standing on the causal path from $X$ to $Y$ (a disease biomarker); the drug affects $Y$ both directly and through $Z$; $X$ and $Y$ are confounded. Assume the disparity $P(z\mid x)\neq P^*(z\mid x)$ is found, and the $z$-specific effect $P(y\mid do(x),z)$ is estimated in LA for all $x,z$. Can the (average or $z$-specific) effect in NYC be estimated?

Here (3.1) is wrong: the overall effect (in LA and NYC) is no longer a simple average of $z$-specific effects. The correct weighting is
$$
P^*(y\mid do(x))=\sum_z P^*(y\mid do(x),z)\,P^*(z\mid do(x))\qquad(3.3)
$$
which reduces to (3.1) only when $Z$ is unaffected by $X$. (3.2) is also wrong because $Z$ lies on the causal path and affects the relation of $X$ and $Y$.

**Surrogate framing.** Use $Z$ as a *surrogate endpoint* for an outcome $Y$ that is expensive to measure (Prentice 1989; Ellenberg and Hamilton 1989). Instead of two locations, take two studies at the same place at different times. In study 1, $P(y,z\mid do(x))$ is measured and $Z$ proves a good surrogate. Once $Z$ is proclaimed a surrogate, manufacturers look for direct means of controlling it (e.g. cholesterol-reducing substances), so both $P(z)$ and $P(z\mid do(x))$ change to $P^*(z)$ and $P^*(z\mid do(x))$. We want the drug effect $P^*(y\mid do(x))$ in the new population as cheaply as possible, by an observational study estimating $P^*(z,x)$, acknowledging confounding between $X$ and $Y$.

> [!theorem] Transport formula for post-treatment $Z$ (Eq. 3.4)
> Assuming (graphically) that the disparity stems only from a difference in people's susceptibility to $X$ (the way $Z$ is affected by $X$), not from a change in some unobservable confounder,
> $$
> P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\,P^*(z\mid x)\qquad(3.4)
> $$
> This differs from both (3.1) and (3.2): the $z$-specific effects are reweighted by the *conditional* $P^*(z\mid x)$ estimated in the target. Proven in Sec. 5 (Example 8, [[Pearl 2014 - S-Admissibility and the Graphical Criterion]]).
^thm-transport-3-4

Footnote 14: often a second randomized experiment to estimate $P^*(z\mid do(x))$ is possible at higher cost; then a transport formula is derivable under more relaxed assumptions, e.g. allowing $X$ and $Z$ to be confounded.

### Take-aways from Sec. 3

1. **Transportability is a causal, not statistical, notion** (Sec. 4 opening): conditions and formulas depend on causal relations, not only on statistics. In Example 3 it matters whether the change in $P(z\mid x)$ was due to a change in how $Z$ is affected by $X$ or due to a change in confounding of $X$ and $Z$; this cannot be determined by comparing $P(z\mid x)$ with $P^*(z\mid x)$. If $X$ and $Z$ are confounded (Fig. 6e), $P(z\mid x)\neq P^*(z\mid x)$ can hold while $P(z\mid do(x))$ is the same in both, and a different formula emerges.
2. Licensing transportability requires knowledge of the **mechanisms** and where they differ.
3. Summary of the three scenarios: pre-treatment $Z$, $S\to Z$: use (3.1); unmeasured parent of $Z$ with identical marginals: use (3.2); post-treatment $Z$, $S\to Z$: use (3.4).

## Examples

> [!example] Numerical check of (3.1) versus the naive carry-over (3.2), and of (3.4)
> Toy binary model. Example 1: $P(Y=1\mid x,z)$: $(0,0)\!:\!0.20,\ (1,0)\!:\!0.50,\ (0,1)\!:\!0.30,\ (1,1)\!:\!0.40$; $P(Z=1)=0.30$ in LA and $0.70$ in NYC. Since $Z$ blocks the backdoor $X\leftarrow Z\to Y$, $P(y\mid do(x),z)=P(y\mid x,z)$.
> - Stratum effects: $z=0$: $+0.30$; $z=1$: $+0.10$.
> - LA ATE (also what naive carry-over (3.2) would claim): $0.7(0.30)+0.3(0.10)=0.24$.
> - NYC ATE by (3.1): $0.3(0.30)+0.7(0.10)=0.16$.
>
> Example 3: $P(Y=1\mid x,z)=0.10+0.20x+0.40z$, no hidden confounding, $P(Z=1\mid x)=0.20+0.30x$ in LA and $0.50+0.10x$ in NYC. Effect$(x{:}0\to1)=0.20+0.40\,[P(z{=}1\mid x{=}1)-P(z{=}1\mid x{=}0)]$.
> - LA effect: $0.20+0.40(0.30)=0.32$.
> - NYC effect by (3.4): $0.20+0.40(0.10)=0.24$.
> - Wrongly applying (3.1) with the marginal $P^*(z)$: the $z$-specific effect is constant at $0.20$ so it returns $0.20$, missing the mediated part.
> ```python
> p_y = {(0,0):.20,(1,0):.50,(0,1):.30,(1,1):.40}      # P(Y=1|x,z) = P(Y=1|do(x),z)
> ate = lambda pz: sum((p_y[(1,z)]-p_y[(0,z)])*(pz if z else 1-pz) for z in (0,1))
> print(ate(.30), ate(.70))                            # 0.24 (LA / naive), 0.16 (Eq. 3.1 for NYC)
> p3 = lambda x,z: .10+.20*x+.40*z
> pzx_tgt = lambda x: .50+.10*x
> ey = lambda x: sum(p3(x,z)*(pzx_tgt(x) if z else 1-pzx_tgt(x)) for z in (0,1))
> print(ey(1)-ey(0))                                   # 0.24 (Eq. 3.4)
> ```
^example-numeric-transport

> [!example] Marketing reading
> Treat "LA experiment, NYC target" as "geo test in market set A, rollout to market set B". If the markets differ in the share of loyal customers $Z$ (pre-treatment, unaffected by ads), (3.1) says reweight loyalty-specific lifts by the target market's loyalty mix. If $Z$ is "branded search volume" (reacts to ads), (3.4) says use B's *observed* $P^*(z\mid x)$ at the spend levels B actually runs. Full discussion: [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].

## Connections

- Formalized in [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] (Figs. 4a-4c are the selection-diagram versions of Figs. 3a-3c).
- Proved in [[Pearl 2014 - S-Admissibility and the Graphical Criterion]]: (3.1) is Corollary 1, (3.4) is Example 8 via Theorem 3.
- Standardization link: the reweighting in (3.1) is the post-stratification estimator in [[Degtiar 2023 - Weighting and Matching Methods]].
- Mediator-style structure: [[Instrumental Variables and Principal Stratification]] (post-treatment variables and why ignorability language is too coarse).

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
- [[Potential Outcomes Framework]], [[Causal Estimands]]
