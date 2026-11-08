---
title: "Dahabreh 2020 - Trial Participation Process, Designs and Estimands"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Secs. 1-3, pp. 2-5, Table 1"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]]"
used_by:
  - "[[Dahabreh 2020 - Identifiability Conditions and Identification]]"
  - "[[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]"
aliases:
  - "Dahabreh generalizability vs transportability"
  - "nested trial design and non-nested trial design"
---

# Dahabreh 2020 - Trial Participation Process, Designs and Estimands

> [!summary]
> Defines the trial participation process (eligible, invited, participant), separates *generalizability* from *transportability*, distinguishes nested from non-nested trial designs, fixes the observed-data structure (Table 1), and states the causal quantity $E[Y^a-Y^{a'}\mid S=0]$ as the target. Key takeaway: only $E[Y^a\mid S=0]$ is identifiable in non-nested designs; the pooled-cohort effect is not.

## Overview
Trial participants differ from clinical-practice (or deployment) populations in effect modifiers. Informal subjective assessment cannot be evaluated or audited, so the paper builds formal methods for the common setting: individual-level $(X,A,Y)$ from the trial, individual-level $X$ only from the target.

## Main Content

### Participation process
> [!definition] Trial participation process
> (i) Investigators set **eligibility criteria**, defining the *trial-eligible* population. (ii) Eligible individuals are **invited** (recruitment), defining the *invited* population. (iii) Invited individuals who **consent** define the *participant* population. Distributional differences in effect modifiers across these stages are what create the gap between the trial effect and the target effect. ^def-participation-process

> [!definition] Generalizability versus transportability
> **Generalizability**: the target population coincides with, or is a subset of, the trial-eligible population. **Transportability**: the target includes at least some individuals who are *not* trial-eligible (and cannot be participants). Together they are called *extending inferences* from a trial to a target population. The paper notes other authors use different definitions (its ref. [14]). ^def-gen-vs-transport

In generalizability analyses the target still often has different effect-modifier distributions than participants; in transportability analyses such differences are more likely.

### Study designs
> [!definition] Nested trial design
> The trial is embedded in a simple random sample from a broader population (e.g., a comprehensive cohort study, or a trial inside a health-care system). Baseline covariates are collected from *all* cohort members; treatment and outcome only from randomized individuals. ^def-nested-design

> [!definition] Non-nested trial design
> A completed trial is combined with a *separately obtained* sample from the target population: all trial participants but only a subset of non-participants (with unknown sampling probability) are in the composite dataset. Covariates are available for both; treatment and outcome only for the randomized. Typical in drug development/regulation and policy research with administrative or survey data. ^def-non-nested-design

The same estimators apply to both designs. Treatment/outcome data from the target, if they exist, can be used to evaluate assumptions but are not needed. This matters when target treatment-outcome data are confounded, mismeasured, costly, or impossible to collect.

### Data and notation
Variables: baseline covariates $X$; assigned treatment $A$; outcome $Y$; participation indicator $S\in\{0,1\}$ ($S=1$ trial participant). $Y^a$ is the potential outcome under treatment $a$.

- Nested: i.i.d. tuples $(X_i,S_i,S_iA_i,S_iY_i)$, $i=1,\dots,n$; $n_{RCT}=\sum_i I(S_i=1)$, $n_{obs}=\sum_i I(S_i=0)$.
- Non-nested: trial data $(X_i,S_i=1,A_i,Y_i)$, $i=1..n_{RCT}$; target-sample data $(X_i,S_i=0)$, $i=1..\tilde n_{obs}$, with $\tilde n=n_{RCT}+\tilde n_{obs}$. Here $\tilde n_{obs}\neq n_{obs}$ because only a subset of non-participants is sampled.

> [!example] Table 1 - data structure (binary treatment, nested design)
> | Unit | $S$ | $A$ | $Y$ | $X$ |
> |---|---|---|---|---|
> | $1,\dots,n_0$ | 1 | 0 | $y_i$ | $x_i$ |
> | $n_0+1,\dots,n_{RCT}$ | 1 | 1 | $y_i$ | $x_i$ |
> | $n_{RCT}+1,\dots,n$ | 0 | - | - | $x_i$ |
>
> Of the $n_{RCT}$ participants, $n_0$ get $A=0$ and $n_1$ get $A=1$. Non-participants have only $(S=0,X)$: a special **missingness pattern** — the outcome is missing by design for $S=0$. ^ex-table1-data-structure

### Causal quantities
> [!definition] Target-population average treatment effect
> For treatment values $a,a'$: $$\Delta_{S=0}=E[Y^a-Y^{a'}\mid S=0].$$ Under standard assumptions the trial identifies $E[Y^a-Y^{a'}\mid S=1]$. The two differ "when the effect of treatment varies over baseline covariates that are differentially distributed between trial participants and non-participants", i.e., when the distribution of effect modifiers *on the additive scale* differs. ^def-target-ate

For nested designs the cohort-wide effect $E[Y^a-Y^{a'}]$ is also of interest (previous work, ref. [16]), but **in non-nested designs it is not identifiable** without information on the sampling of the target population, since the data are a "mixture" of trial and target with arbitrary mixing proportions. The tutorial therefore focuses on the components $E[Y^a\mid S=0]$.

## Examples
- Marketing analogue: eligibility = markets a platform allows for a geo test; invited = markets the agency proposes; participant = markets where the client agrees. Target = all other markets. See [[Geo-Experiment Methodology - Overview]].

## Connections
Next: conditions under which $E[Y^a\mid S=0]$ is identified in [[Dahabreh 2020 - Identifiability Conditions and Identification]]. Back: [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]].

## See Also
- [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] — site-level analogue of the participation process.
