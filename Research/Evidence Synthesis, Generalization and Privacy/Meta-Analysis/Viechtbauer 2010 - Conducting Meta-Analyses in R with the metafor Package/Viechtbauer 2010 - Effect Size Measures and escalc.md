---
title: "Viechtbauer 2010 - Effect Size Measures and escalc"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 3.1, pp. 6-10; Sec. 3.2 formula interface, pp. 10-11"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]"
used_by:
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
  - "[[Roever 2020 - Pediatric Liver Transplant Worked Example]]"
aliases:
  - escalc outcome measures
  - meta-analysis effect size measures
---

# Viechtbauer 2010 - Effect Size Measures and escalc

> [!summary]
> Before any model is fitted a meta-analyst needs, for every study, an effect size $y_i$ and its sampling variance $v_i$. `escalc()` computes these for 2x2 tables (RR, OR, RD, arcsine RD, Peto), raw/standardized mean differences, correlations (raw, unbiased, Fisher $z$) and proportions (raw, logit, arcsine, Freeman-Tukey), including zero-cell adjustments. Log or variance-stabilising transformations make the normality and known-variance assumptions of the model more plausible.

## Overview

The models of [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] take $(y_i,v_i)$ as data. Section 3.1 documents how these are produced. Signature:

`escalc(measure, ai, bi, ci, di, n1i, n2i, m1i, m2i, sd1i, sd2i, xi, mi, ri, ni, data=NULL, add=1/2, to="only0", vtype="LS", append=FALSE)`

with a second **formula interface** `escalc(measure, formula, weights, data, add, to, vtype)`.

## Main Content

### 2x2 table data

Each study gives cells $a_i,b_i$ (group 1: outcome 1, outcome 2), $c_i,d_i$ (group 2), with $n_{1i}=a_i+b_i$, $n_{2i}=c_i+d_i$. Designs: RCT (treatment/control), case-control, cross-sectional. Inputs: either $a_i,b_i,c_i,d_i$ or $a_i,c_i,n_{1i},n_{2i}$.

| `measure` | Definition | Notes |
|---|---|---|
| `"RR"` | $\log\dfrac{a_i/n_{1i}}{c_i/n_{2i}}$ | log relative risk |
| `"OR"` | $\log\dfrac{a_id_i}{b_ic_i}$ | log odds ratio |
| `"RD"` | $a_i/n_{1i}-c_i/n_{2i}$ | risk difference |
| `"AS"` | $\arcsin\sqrt{a_i/n_{1i}}-\arcsin\sqrt{c_i/n_{2i}}$ | arcsine-transformed RD (Rucker et al. 2009) |
| `"PETO"` | $\dfrac{a_i-s_in_{1i}/n_i}{s_it_in_{1i}n_{2i}/(n_i^2(n_i-1))}$, $s_i=a_i+c_i$, $t_i=b_i+d_i$, $n_i=n_{1i}+n_{2i}$ | Peto log OR; assumes true OR = 1 in all tables |

Logs make RR and OR symmetric around 0 and closer to normal.

### Zero cells

`add` (default 1/2) and `to` control continuity corrections: `to="all"` adds in all $k$ tables; `"only0"` (default) adds only in tables with a zero cell; `"if0all"` adds in all tables only if any table has a zero; `"none"` or `add=0` means no adjustment (division by zero is recoded `NA`).

### Mean differences

| `measure` | Definition | Notes |
|---|---|---|
| `"MD"` | $m_{1i}-m_{2i}$ | raw mean difference |
| `"SMD"` | $(m_{1i}-m_{2i})/s_{p,i}$ | pooled SD $s_{p,i}$; automatically corrected for slight positive bias (Hedges and Olkin 1985); `vtype="LS"` large-sample variance, `"UB"` unbiased |

### Correlations

| `measure` | Definition |
|---|---|
| `"COR"` | raw $r_i$; `vtype` LS or approximately unbiased UB (Hedges 1989) |
| `"UCOR"` | unbiased $r_i$, correcting slight negative bias (Olkin and Pratt 1958, eq. 2.7) |
| `"ZCOR"` | Fisher $z_i=\tfrac12\log\frac{1+r_i}{1-r_i}$: variance-stabilising and normalising (Fisher 1921) |

### Proportions (single-group data, $x_i$ events of $n_i$)

| `measure` | Definition |
|---|---|
| `"PR"` | $x_i/n_i$ |
| `"PLO"` | $\log\frac{x_i}{n_i-x_i}$ (logit) |
| `"PAS"` | $\arcsin\sqrt{x_i/n_i}$ |
| `"PFT"` | Freeman-Tukey double arcsine: $\tfrac12\left[\arcsin\sqrt{\frac{x_i}{n_i+1}}+\arcsin\sqrt{\frac{x_i+1}{n_i+1}}\right]$ |

Zero-handling (`add`, `to`) applies to $x_i$ and $m_i=n_i-x_i$.

> [!definition] Standard error formulas used elsewhere in this folder
> The paper does not print the variance formulas; two standard large-sample ones appear in the companion paper ([[Roever 2020 - Pediatric Liver Transplant Worked Example]]): log odds ratio $\text{SE}=\sqrt{1/a+1/b+1/c+1/d}$ and log relative risk $\text{SE}=\sqrt{1/a-1/(a+b)+1/c-1/(c+d)}$.
^def-se-formulas

### Formula interface

For 2x2 data in long format the formula is `outcome ~ group | study` with `weights` = cell frequencies (multipart formula via the `Formula` package). Long format required: one row per cell, columns `study` (k-level factor), `grp` (two-level factor), `out` (two-level factor) and `freq`. The advantage is generality for future multi-arm and multi-outcome structures; for ordinary one-row-per-study data the default interface is easier.

## Examples

> [!example] Log relative risk for BCG trial 1 (Aronson 1948)
> Cells: treated TB+ $a=4$, TB- $b=119$ ($n_1=123$); control $c=11$, $d=128$ ($n_2=139$). $y_1=\log\frac{4/123}{11/139}=\log(0.03252/0.07914)=-0.8893$. Variance $v_1=\frac1a-\frac1{n_1}+\frac1c-\frac1{n_2}=0.25-0.00813+0.09091-0.00719=0.32558$, matching the printed `yi=-0.88931133`, `vi=0.325584765`. Negative values mean lower infection risk in the vaccinated group.
^ex-escalc-bcg-trial1

## Connections

- In marketing measurement, the analogue of `escalc` is turning each experiment into a (lift estimate, standard error) pair on a scale where normality is credible: log relative lift, or iROAS with a delta-method SE. Meta-analysing raw ratios without a log transform is the same mistake as pooling raw odds ratios.
- The variance-stabilising transformations (Fisher $z$, arcsine) are what make "known $v_i$" a reasonable approximation, an assumption discussed in [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]].

## See Also

- [[Viechtbauer 2010 - BCG Vaccine Worked Example]]
- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
