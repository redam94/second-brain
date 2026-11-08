---
title: "Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]"
source_location: "pp. 345-352: Eqs. 17-31, Figs. 4-7"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
doc_type: paper
depends_on:
  - "[[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]]"
used_by:
  - "[[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]]"
  - "[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]"
aliases:
  - "ramped exponential normal phase priors"
  - "multiphase radiocarbon models"
  - "contiguous and sequential phases"
---

# Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing

> [!summary]
> The uniform phase generalises to any within-phase density defined by two characteristic boundaries (ramped, exponential, normal), and multiphase models multiply group priors: overlapping phases are independent, contiguous phases share a boundary, and sequential phases with a hiatus add the constraint $t_b<t_c$. Refinements keep the whole-model span prior neutral. Cross-referenced boundaries tie sub-models together.

## Overview

If the uniform assumption is wrong (activity grows through the phase, material is residual, activity rises and tails off), only Eq. 15 changes; the "prior independent of the overall span" property is preserved.

## Main Content

> [!definition] Within-phase distributions (Eqs. 17-22)
> Given boundaries $t_a<t_b$, events $t_i$ have conditional density:
> - **Ramped** (events grow in number): $p(t_i\mid t_a,t_b)=2\,p_H(t_i,t_b)\,\dfrac{t_i-t_a}{(t_b-t_a)^2}$ (Eq. 17); overall prior $\propto p_H(t_a,t_b)\prod_i 2p_H(t_i,t_b)(t_i-t_a)/(t_b-t_a)^2$ (Eq. 18).
> - **Exponential** (definite end $t_b$, earlier events with time constant $\tau=t_b-t_a$): $p(t_i\mid t_a,t_b)=p_H(t_i,t_b)\dfrac{\exp\{-(t_b-t_i)/(t_b-t_a)\}}{t_b-t_a}$ (Eq. 19), prior Eq. 20. Used for residual material; Figure 5 applies it to Stonehenge ditch antlers (`Tau_Boundary`), estimating $\tau$.
> - **Normal** (gradual onset and tail, $t_a,t_b$ are the $1\sigma$ limits): $p(t_i\mid t_a,t_b)=\dfrac{1}{(t_b-t_a)\sqrt{\pi/2}}\exp\!\Big\{-\dfrac{(2t_i-t_b-t_a)^2}{2(t_b-t_a)^2}\Big\}$ (Eq. 21), prior Eq. 22. The latter two let events spill beyond the boundaries.
> OxCal keywords: `Boundary`, `Zero_Boundary` (ramp), `Tau_Boundary` (exponential), `Sigma_Boundary` (normal). The 4-parameter **trapezium** model (Karlsberg 2006) is mentioned but not implemented.
^def-group-priors

> [!definition] Multiphase priors (Eqs. 23-25)
> With events $t_i$ in phase 1 (boundaries $t_a,t_b$) and $t_j$ in phase 2:
> - **Overlapping** (independent): $p(\mathbf t)\propto\prod_i\dfrac{p_H(t_a,t_i,t_b)}{t_b-t_a}\prod_j\dfrac{p_H(t_c,t_j,t_d)}{t_d-t_c}$ (Eq. 23).
> - **Contiguous** (shared boundary $t_b$): $\prod_i\dfrac{p_H(t_a,t_i,t_b)}{t_b-t_a}\prod_j\dfrac{p_H(t_b,t_j,t_c)}{t_c-t_b}$ (Eq. 24).
> - **Sequential with hiatus**: $p_H(t_b,t_c)\prod_i\dfrac{p_H(t_a,t_i,t_b)}{t_b-t_a}\prod_j\dfrac{p_H(t_c,t_j,t_d)}{t_d-t_c}$ (Eq. 25).
^def-multiphase

> [!theorem] Refinements keeping the span prior neutral (Eqs. 26-30)
> With more than two boundaries the boundary events themselves are no longer uniform in span. Treat the inner boundaries $t_k$ as a uniform phase between the first $t_a$ and last $t_m$: $p(t_k\mid t_a,t_m)=p_H(t_a,t_k,t_m)/(t_m-t_a)$ (Eq. 26), e.g. contiguous 2-phase: extra factor $1/(t_c-t_a)$ (Eq. 27), hiatus: $1/(t_d-t_a)^2$ (Eq. 28; Nicholls and Jones 2001). If $t_a,t_m$ also have limits (lower/upper $llim_a,ulim_a,llim_m,ulim_m$), multiply by $1/g$ with
> $$g=\min\{(ulim_m-llim_a)-(t_m-t_a),\ (t_m-t_a)-(llim_m-ulim_a),\ ulim_a-llim_a,\ ulim_m-llim_m\}\quad\text{(Eqs. 29-30)}$$
> to maintain a uniform effective prior for $t_m-t_a$ (Bronk Ramsey 2008). OxCal 4 option `UniformSpanPrior` (default on). The authors stress these refinements "will only make very slight differences in practice".
^thm-span-refinement

**Beyond simple phases (Figure 7, Eq. 31).** Tie sub-models by *cross-referencing* an event: in the Iron Age Israel model (Mazar and Bronk Ramsey 2008) a main two-phase sequence (start $t_a$, transition $t_b$, end $t_c$) is combined with a "Late Iron I" phase from $t_d$ to the same $t_b$ (`Boundary("=Transition I/II")`), giving $p\propto\prod_i\frac{p_H(t_a,t_i,t_b)}{t_b-t_a}\prod_j\frac{p_H(t_b,t_j,t_c)}{t_c-t_b}\frac1{t_c-t_a}\prod_k\frac{p_H(t_d,t_k,t_b)}{t_d-t_b}$.

**Cautions.** Use sparingly: cross-references slow MCMC; avoid putting an event in two versions of the same phase (duplicating prior); ask whether "synchronous" is reasonable (fine for a tephra horizon, doubtful for vegetation or cultural change). Framework hypotheses (Aegean Late Bronze Age, British Bronze Age) are working assumptions and results depend on them.

## Examples

> [!example] Stonehenge antlers with an exponential group (Figure 5)
> Setup: nine antler 14C dates ($4330\pm18$ to $4432\pm22$ BP and two $\pm60$) from the main ditch, assumed to predate the construction event $E$ with exponentially distributed lag (`Tau_Boundary("T")` ... `Boundary("E")`, $\tau=E-T$). Result: the posterior for $\tau$ (acquisition time scale) has 95.4% range 0-109 years. Interpretation: antlers may be somewhat older than the construction but within about a century; illustrative only, not a full site analysis.
^ex-stonehenge

## Connections
[[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]], [[Bronk Ramsey 2009 - Deposition Models and Sequences]], [[Hierarchical Models]] (boundaries as hyperparameters), [[Survival Analysis]] (exponential lag).

## See Also
[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
