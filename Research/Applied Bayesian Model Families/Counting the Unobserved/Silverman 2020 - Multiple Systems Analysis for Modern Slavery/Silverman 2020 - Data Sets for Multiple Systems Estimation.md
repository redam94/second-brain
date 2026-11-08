---
title: "Silverman 2020 - Data Sets for Multiple Systems Estimation"
tags:
  - source/ingested
  - topic/population-estimation
  - type/example
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 2, Tables 1-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]"
used_by:
  - "[[Silverman 2020 - Frequentist Model Selection Results]]"
  - "[[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]"
aliases:
  - UK Netherlands New Orleans Kosovo MSE data
---

# Silverman 2020 - Data Sets for Multiple Systems Estimation

> [!summary]
> Four real multi-list data sets drive the whole comparison: UK 2013 potential trafficking victims (6 lists, 2744 cases), Netherlands 2010-2015 (6 lists, 8234 cases), Greater New Orleans 2016 (8 lists, 185 cases) and Kosovo 1999 killings (4 lists, 4400 cases). The modern-slavery tables are sparse with many non-overlapping list pairs; Kosovo is dense with strong dependence.

## Overview

Each data set is a table of counts for each observed combination of lists (an incomplete $2^K$ contingency table without the all-zero cell). Combinations with zero observed count are left out of the printed tables but kept in the analysis. Cell patterns are in the paper (Tables 1-4) and for Kosovo in the R package LCMCR.

## Main Content

### UK 2013 (Table 1; Bales et al. 2015)
Lists: LA (local authorities), NG (non-government organisations), PF (police forces), GO (government organisations, e.g. Border Force, GLAA), GP (general public), NCA (National Crime Agency). 26 observed list combinations. Single-list-only counts: LA 54, NG 463, PF 907, GO 695, GP 316, NCA 57. Overlaps are small: e.g. LA and NG only: 15; one case on LA, NG, PF and GO only. Total observed: **2744** (6 or 5 lists), **2428** (4 lists).

> [!definition] Derived UK variants
> *Five-list*: PF and NCA merged (NCA is not strictly police but has similar powers). *Four-list*: also omit GP (cases on this list may not be specified enough to match reliably). The variants test robustness of any method to merging or dropping lists.
^def-uk-variants

### Netherlands 2010-2015 (Table 2; van Dijk et al. 2017; Cruyff et al. 2017)
Lists: P (National Police), K (Border Police), I (Inspectorate SZW), R (regional coordinators), O (residential treatment centres and shelters), Z (others). Single-list-only counts: I 352, K 1299, O 403, P 4466, R 650, Z 632. Total observed **8234**. Five-list variant merges the two smallest lists (I and O).

### Greater New Orleans 2016 (Table 3; Bales et al. 2019)
Eight agencies, 185 individuals; lists labelled A to H for confidentiality (no other information was available). Counts are tiny (largest single list 70); none of the overlap sets contains more than two cases. Five-list variant merges the four lists with smallest counts into one list "BEFG".

### Kosovo, 20 March-22 June 1999 (Table 4; Ball et al. 2002, via LCMCR)
Four lists: EXH (exhumations), ABA (American Bar Association CEELI), OSCE, HRW. All 15 observable combinations have non-zero counts; 4400 known victims; large counts in higher-order overlaps. "This is in the nature of the particular application and is highly unlikely to occur in any modern slavery data set."

> [!example] Table 4 reproduced (cell patterns decoded from the column positions of the PDF)
> | EXH | ABA | OSCE | HRW | Count |
> |---|---|---|---|---|
> | 1 | 0 | 0 | 0 | 1131 |
> | 0 | 1 | 0 | 0 | 845 |
> | 0 | 0 | 1 | 0 | 936 |
> | 0 | 0 | 0 | 1 | 306 |
> | 1 | 1 | 0 | 0 | 177 |
> | 1 | 0 | 1 | 0 | 228 |
> | 1 | 0 | 0 | 1 | 106 |
> | 0 | 1 | 1 | 0 | 217 |
> | 0 | 1 | 0 | 1 | 31 |
> | 0 | 0 | 1 | 1 | 123 |
> | 1 | 1 | 1 | 0 | 181 |
> | 1 | 1 | 0 | 1 | 18 |
> | 1 | 0 | 1 | 1 | 42 |
> | 0 | 1 | 1 | 1 | 32 |
> | 1 | 1 | 1 | 1 | 27 |
>
> The counts sum to 4400 (check: singles 3218, pairs 882, triples 273, quadruple 27). 
^ex-kosovo-table4

| Data set | Lists $K$ | Observed cases | Character |
|---|---|---|---|
| UK 2013 | 6 (5, 4) | 2744 (2744, 2428) | sparse, non-overlapping pairs |
| Netherlands 2010-15 | 6 (5) | 8234 | sparse, small lists |
| New Orleans 2016 | 8 (5) | 185 | very sparse, overlaps $\le2$ |
| Kosovo 1999 | 4 | 4400 | dense, strong dependence |

## Examples

> [!example] Why zero overlaps matter
> UK: no case is on both LA and GP, and none on both LA and NCA. New Orleans five-list: 3 of 10 pair overlaps are empty; in the eight-list data 18 of 28 pairwise overlaps are empty. Maximum-likelihood interaction parameters for empty overlaps run to $-\infty$ ([[Silverman 2020 - Existence, Identifiability and Empty Overlaps]]).

## Connections

- The PyMC E109 example uses Kosovo (via LCMCR) and UK (via SparseMSE) data.
- Modelling approach: [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]].

## See Also

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
- [[Concept - Closed-Population Capture-Recapture and Otis Models]]
