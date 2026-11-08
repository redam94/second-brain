---
title: "Dahabreh 2020 - Identifiability Conditions and Identification"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Sec. 4, pp. 5-6"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]]"
used_by:
  - "[[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]"
  - "[[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]"
aliases:
  - "exchangeability over S and positivity of trial participation"
  - "transport formula for the target potential outcome mean"
---

# Dahabreh 2020 - Identifiability Conditions and Identification

> [!summary]
> Five conditions (consistency, mean exchangeability over $A$ in the trial, positivity of treatment, mean exchangeability over $S$, positivity of participation) identify the target potential-outcome mean as the trial outcome regression averaged over the *target* covariate distribution: $E[Y^a\mid S=0]=E\big[E[Y\mid X,S=1,A=a]\mid S=0\big]$. Only the last two conditions are about transport, and exchangeability over $S$ is untestable.

## Overview
Notation: $X$ covariates, $S$ participation, $A$ assigned treatment, $Y^a$ potential outcome under $a$. The goal is the target mean $E[Y^a\mid S=0]$ (and hence effects).

## Main Content

### Identifiability conditions

> [!definition] (1) Consistency of potential outcomes
> If $A_i=a$ then $Y_i=Y_i^a$. Implicitly, trial participation affects outcomes only through treatment assignment (no Hawthorne effects). ^def-consistency

> [!definition] (2) Conditional exchangeability in mean over $A$ (in the randomized population)
> $E[Y^a\mid X=x,S=1,A=a]=E[Y^a\mid X=x,S=1]$ for every $x$ with $f_{X,S}(x,S=1)>0$. Expected to hold whether randomization was unconditional or conditional on covariates; weaker than $Y^a\perp A\mid X,S=1$. ^def-exch-A

> [!definition] (3) Positivity of treatment assignment
> $\Pr[A=a\mid X=x,S=1]>0$ for every $a$ and every $x$ with $f_{X,S}(x,S=1)>0$ (conditioning on the covariates needed for exchangeability over $A$). ^def-pos-A

> [!definition] (4) Conditional exchangeability in mean over $S$
> $E[Y^a\mid X=x,S=1]=E[Y^a\mid X=x,S=0]$ for every $x$ with $f_{X,S}(x,S=0)>0$. Weaker than $Y^a\perp S\mid X$. **Untestable.** ^def-exch-S

> [!definition] (5) Positivity of trial participation
> $\Pr[S=1\mid X=x]>0$ for every $x$ with $f_{X,S}(x,S=0)>0$ (conditioning on the covariates needed for exchangeability over $S$). Informally: as the trial grows, every covariate pattern in the target is represented in the trial. It does *not* need to be bounded away from 1, since $f_{X,S}(x,S=0)>0$ and $\Pr[S=1\mid X=x]=1$ cannot both hold. ^def-pos-S

Conditions (1)-(3) are expected from well-run (marginally or conditionally) randomized trials. Positivity of participation is hard to verify and exchangeability over $S$ is strong and untestable; both "need to be examined on the basis of substantive knowledge".

> [!note] Transportability needs some eligibility variables to be irrelevant
> In transportability the target includes trial-ineligible people. Conditions (4)-(5) then hold only if some variables defining trial eligibility are *not* needed for exchangeability over $S$ (e.g., trial restricted to certain locations, but conditional on other variables, location is unrelated to outcome). If all eligibility variables are needed, the target must be limited to trial-eligible non-participants.

### Identification

> [!theorem] Identification of the target potential outcome mean
> Under (1)-(5), for each treatment $a$, $$E[Y^a\mid S=0]=E\big[\,E[Y\mid X,S=1,A=a]\;\big|\;S=0\,\big],$$ and the target ATE is $$E[Y^a-Y^{a'}\mid S=0]=E\big[E[Y\mid X,S=1,A=a]\mid S=0\big]-E\big[E[Y\mid X,S=1,A=a']\mid S=0\big].$$ ^thm-identification

**Proof sketch** (the paper's formal proof is in its Appendix, absent from the PDF; this chain follows from the stated conditions):
1. Law of iterated expectations: $E[Y^a\mid S=0]=E\{E[Y^a\mid X,S=0]\mid S=0\}$.
2. Exchangeability over $S$ (4), valid on the support of $X$ in $S=0$, and positivity (5) so the right side is defined: $E[Y^a\mid X,S=0]=E[Y^a\mid X,S=1]$.
3. Exchangeability over $A$ (2) with positivity (3): $E[Y^a\mid X,S=1]=E[Y^a\mid X,S=1,A=a]$.
4. Consistency (1): $=E[Y\mid X,S=1,A=a]$.

> [!definition] Functional of interest
> $\mu(a)\equiv E\big\{E[Y\mid X,S=1,A=a]\mid S=0\big\}$. Estimating $\mu(a)$ is the subject of [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]. ^def-mu-a

> [!note] Weaker identification of effects only
> The Appendix (absent from the PDF) shows the target ATE is identified under conditional exchangeability **in measure** over $S$, which is weaker than exchangeability in mean; under that weaker assumption effects but not potential-outcome means are identified. The paper focuses on means because they are of "inherent scientific and policy interest".

## Examples
**Marketing reading.** $S=1$: geo-lift test markets; $S=0$: other markets; $X$: market size, baseline sales, category development index. Condition (4): given $X$, expected incrementality of a campaign is the same in tested and untested markets. Violated if, e.g., markets were chosen because the client believed they respond well (selection on unmeasured gains). Condition (5): no untested market looks unlike every tested market.

## Connections
- Graph-based criteria for the same question: the graphical selection-diagram approach (separate cluster notes). The paper itself points to DAG-based transportability algorithms (refs [64]-[66]) for reasoning about (4).
- Statistical sensitivity when (4) fails: [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]].

## See Also
- [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]]
- [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]]
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] — "external unconfoundedness" is the same condition (4) at site level.
