---
title: "Allcott 2015 - Model of External Validity and Site Selection Bias"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Sec. 3, pp. 6-9"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]]"
used_by:
  - "[[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]"
  - "[[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]"
aliases:
  - "external unconfoundedness"
  - "site selection bias definition"
---

# Allcott 2015 - Model of External Validity and Site Selection Bias

> [!summary]
> Extends Hotz, Imbens and Mortimer (2005): the target ATE is identified from sample data if unconfoundedness, overlap, *external* unconfoundedness and *external* overlap hold. With many sites, external unconfoundedness reduces to "no site selection bias" (Assumption 3B) — weaker than homogeneous site effects, but guaranteed only by random or quasi-random site selection.

## Overview
Rubin causal model: $T_i\in\{0,1\}$ treatment; potential outcomes $Y_i(1),Y_i(0)$; $\tau_i=Y_i(1)-Y_i(0)$; $X_i$ covariates; $D_i\in\{1,0\}$ equals 1 if $i$ is in the sample population (treated/evaluated), 0 if in the target population.

## Main Content

### 3.1 External validity

> [!definition] Assumptions 1-4
> 1. **Unconfoundedness**: $T_i\perp (Y_i(1),Y_i(0))\mid X_i$.
> 2. **Overlap**: $0<\Pr(T_i=1\mid X_i=x)<1$.
> 3. **External unconfoundedness**: $D_i\perp (Y_i(1)-Y_i(0))\mid X_i$.
> 4. **External overlap**: $0<\Pr(D_i=1\mid X_i=x)<1$. ^def-assumptions-1-4

> [!theorem] Transport of the ATE
> If Assumptions 1-4 hold on the support of $X$ in the target population,
>
> $$
> E[\tau_i\mid D_i=0]=E\big[\,E[Y_i\mid T_i=1,D_i=1,X_i]-E[Y_i\mid T_i=0,D_i=1,X_i]\;\big|\;D_i=0\big].\tag{1}
> $$

^thm-transport-ate

**Proof sketch** (footnote 5; follows Hotz-Imbens-Mortimer Lemma 1): the two unconfoundedness assumptions imply for each $x$: $E[\tau_i\mid D_i=0,X_i=x]=E[\tau_i\mid D_i=1,X_i=x]=E[Y_i\mid D_i=1,T_i=1,X_i=x]-E[Y_i\mid D_i=1,T_i=0,X_i=x]$. The overlap assumptions make it feasible to average over the target distribution of $X$.

Two differences from Hotz et al.: (i) (1) does not require random assignment within sample sites, so it covers quasi-experiments; (ii) external unconfoundedness is a *weaker* version of their "unconfounded location" assumption $D_i\perp(Y_i(1),Y_i(0))\mid X_i$; only the difference in potential outcomes must be independent of $D_i$. The stronger version motivates testing $D_i\perp Y_i(0)\mid X_i$, but that is theoretically neither necessary nor sufficient, and in Opower it is uninformative because untreated usage mostly reflects weather variation (Appendix C).

### 3.2 Sites, replication and site selection bias

> [!definition] Site
> A setting in which a programme might be implemented or evaluated, comprising a population of individuals, a treatment as implemented ($F_s$), and an economic environment ($V_s$). $S_i$ = site of individual $i$; $\tau_s(x)=E[\tau_i\mid X_i=x,S_i=s]=E[\tau_i\mid X_i=x,F_s,V_s]$. $D_s\in\{1,0\}$ indicates a sample site. ^def-site

Selection operates at site level in Opower (whole sites are in sample or in target).

> [!definition] Assumption 3A - homogeneous site effects
> $\tau_{s'}(x)=\tau_{s''}(x)$ for a pair of sites. Equivalent to external unconfoundedness when extrapolating from one sample site to one target site. Rarely plausible; made implicitly whenever single-site results are applied elsewhere. ^def-assumption-3a

> [!definition] Assumption 3B - no site selection bias
> $E[\tau_s(x)\mid D_s=1]=E[\tau_s(x)\mid D_s=0]$ over a large number of sites. Equivalent to external unconfoundedness for many sample and many target sites; weaker than 3A because site heterogeneity is allowed if it "averages out". ^def-assumption-3b

> [!definition] Site selection bias
> The failure of external unconfoundedness when sites enter the sample through mechanisms other than random or quasi-random assignment. The word "bias" does not mean sample-site effect estimates are wrong for those sites; it means sample effects differ systematically from target effects. ^def-site-selection-bias

- 3B is guaranteed by random site assignment (e.g., JTPA hoped to randomize sites within 20 strata of size, region and programme quality) or quasi-random assignment (Moving to Opportunity and the RAND Health Insurance Experiment chose cities for diversity).
- Replication helps only if replication sites are chosen randomly or quasi-randomly.
- Site selection bias is distinct from the within-sample heterogeneity underlying LATE: such heterogeneity is neither necessary nor sufficient for site selection bias (footnote 9 offers the analogy of a site as a set of compliers; bias arises when available instruments systematically identify populations whose LATEs differ from the target ATE).
- 3A holding across all sites is sufficient for 3B, so significant dispersion of site effects is a necessary precondition for site selection bias ([[Allcott 2015 - Opower Program, Selection Mechanisms and Data]]).

## Examples
- With 111 sites, 3B implies the average over early (sample) sites equals the average over late (target) sites, which is directly testable with the metadata ([[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]).

## Connections
- Individual-level analogue: conditions (4)-(5) in [[Dahabreh 2020 - Identifiability Conditions and Identification]] (his $S$ = sample indicator, here $D$).
- [[The Experimental Ideal]] — internal validity via randomization; this note is the external-validity counterpart.

## See Also
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
- [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]]
