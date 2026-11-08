---
title: "Simoiu 2017 - North Carolina Traffic Stops and the Three Tests"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/example
  - doc/paper
source: "[[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]"
source_location: "Sec. 3.1-3.4, pp. 8-13; Tables 1-2; Figures 3-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test"
doc_type: paper
depends_on:
  - "[[Simoiu 2017 - Threshold Test Generative Model]]"
used_by:
  - "[[Simoiu 2017 - Model Checks Robustness and Placebo Tests]]"
  - "[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]"
aliases:
  - "North Carolina stops results"
  - "Raleigh infra-marginality example"
  - "threshold test empirical results"
---

# Simoiu 2017 - North Carolina Traffic Stops and the Three Tests

> [!summary]
> On 4.5 million stops by the 100 largest non-state-patrol North Carolina departments, benchmark and outcome tests partly disagree (57 departments show both pointing to bias against black drivers; 42 are conflicting). The threshold test gives consistent lower search thresholds for black (7%) and Hispanic (6%) drivers than white (15%) and Asian (13%) drivers. In Raleigh the outcome test flags bias against white drivers, which the authors attribute to infra-marginality.

## Overview

**Data.** 9.5 million stops, Jan 2009-Dec 2014; 287 departments. Primary analysis excludes Native Americans (under 1%) and stops with unrecorded/"other" race (1.2%), excludes the State Patrol (47% of stops but 12% of searches and 6% of contraband found), and keeps the 100 largest local departments (91% of non-patrol stops): 4.5 million stops (50% white, 40% black, 8.5% Hispanic, 1.5% Asian). Overall search rate 4.1%; 29% of searches find contraband. "Search" = any of driver, passenger, vehicle, property; all five legal bases (probable cause, protective frisk, consent, incident to arrest, warrant) included, with robustness checks.

## Main Content

> [!example] Table 1: summary of stops, 100 largest departments
> | Driver race | Stops | Search rate | Hit rate |
> |---|---|---|---|
> | White | 2,227,214 | 3.1% | 32% |
> | Black | 1,810,608 | 5.4% | 29% |
> | Hispanic | 384,186 | 4.1% | 19% |
> | Asian | 67,508 | 1.7% | 26% |
>
> Benchmark test (search rates): bias against blacks and Hispanics, not Asians. Outcome test (hit rates): bias against blacks, Hispanics **and Asians**. Department level: in 57 departments both tests indicate discrimination against blacks; in 42 they conflict; in one both point against whites.
^ex-table1

> [!example] Table 2: inferred average search thresholds (weighted by stops)
> | Driver race | Threshold | 95% credible interval |
> |---|---|---|
> | White | 15% | (14%, 16%) |
> | Black | 7% | (3%, 10%) |
> | Hispanic | 6% | (5%, 8%) |
> | Asian | 13% | (11%, 16%) |
>
> Average threshold is $t_r=\sum_d t_{rd}n_d/\sum_d n_d$ with $n_d$ stops in department $d$. Thresholds lower for blacks and Hispanics in nearly every department; Asians in line with whites. Estimates are about $\pm2$ points.
^ex-table2

> [!example] Raleigh Police Department (Figures 5-6)
> Raleigh searches blacks more often (4% vs 2%) and finds contraband more often (16% vs 13%): benchmark says bias against blacks, outcome says bias against whites. Inferred signal distribution for blacks has a heavier right tail (four times more mass above 20%); thresholds are 6% (black) vs 9% (white). Hispanics in Raleigh: searched more (3% vs 2%), lower hit rate (11% vs 13%); all three tests agree. Supporting evidence for a heavy tail: stops of blacks are three times more likely to end in searches based on "observation of suspected contraband", which yield contraband 52% of the time. Conclusion: the outcome test is the odd one out and is plausibly misled by infra-marginality.
^ex-raleigh

**Reading the evidence.** The paper gives three reasons to prefer the threshold test in Raleigh (consistency across tests for Hispanics, implausibility of strong bias against whites given prior research, and a mechanistic explanation for the heavy tail) but says "it is difficult to know for sure".

## Examples
> [!example] Posterior-weighted average threshold
> Suppose department thresholds for blacks are 5%, 8% and 10% with stops 1000, 3000 and 1000. The weighted average is $(50+240+100)/5000\cdot 100\% = 7.8\%$ (a stop-weighted, not simple, mean).
^ex-weighted-threshold

## Connections
[[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]], [[Simoiu 2017 - Model Checks Robustness and Placebo Tests]], [[Poststratification]] (weighting by stop counts parallels poststratification), [[Type S and Type M Errors]].

## See Also
[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
