---
title: "Morris et al 2019 - Motivation and Review of Simulation Practice"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "Abstract p.1; §1 Introduction pp.1-2; Table 1 p.3; §2 Review of Statistics in Medicine Vol. 34 pp.3-4; review results scattered through §3.2 p.6, §3.3 p.7, §3.4 p.8, Table 4 p.9, §4.3 p.13, §5.2 p.14, §5.3 p.17, §5.4 p.18, §6.2 p.19; Appendix A pp.30-33 (Fig. A1, Table A1, Fig. A2, Fig. A3). arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]"
used_by:
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]]"
aliases:
  - Statistics in Medicine Volume 34 simulation review
  - Uses of simulation studies
  - Simulation study definition (Morris)
---

# Morris et al 2019 - Motivation and Review of Simulation Practice

> [!summary]
> Why Morris, White & Crowther wrote the tutorial, and the evidence behind it. **§1** defines a simulation study, separates it from other Monte Carlo uses (MCMC, multiple imputation), and lists five uses. **§2 and Appendix A** describe a review of **100 randomly sampled simulation studies** from *Statistics in Medicine* Volume 34 (2015). The headline findings are scattered through the paper: **93 of 100 did not mention Monte Carlo SEs**, only **4 of 87** that reported $n_{\text{sim}}$ justified it, and only **7** presented Monte Carlo SEs at all. This note collects every review number in one place, including Table 4 (performance measures used) and the appendix figures.
^summary-motivation-review

## Overview

The authors' diagnosis (§1, p.1) is that some statisticians "lack the necessary understanding to execute a simulation study with confidence, while others are over-confident and so fail to think carefully about design and report results poorly." Their core reframing: "Simulation studies are empirical experiments and statisticians should therefore use knowledge of experimental design and analysis in running them" (§1, p.1). Everything else in the tutorial — [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods|ADEMP planning]], [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors|Monte Carlo SEs]], [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots|reporting]] — follows from treating a simulation as an experiment whose outputs are estimates.

## Main Content

### Definition and scope (§1, pp.1-2)

> [!definition] Simulation study (§1, p.1)
> "Simulation studies are computer experiments that involve creating data by pseudo-random sampling from known probability distributions."
>
> The key strength (Abstract, p.1): some "truth" — usually a parameter of interest — "is known from the process of generating the data," which lets us study properties such as bias.
^def-simulation-study

**Simulation vs analytic results (p.2).** Simulation gives *empirical* results for specific scenarios, as opposed to *analytic (algebraic)* results that may cover many scenarios. Analytic results may be impossible or hard to get, and "may apply only when data arise from a specific model." The quotable line: "Simulation studies come into their own when methods make wrong assumptions or data are messy because they can assess the resilience of methods in such situations" (p.2).

**What is *not* a simulation study (p.2).** "Monte Carlo simulation" covers any technique using pseudo-random sampling — e.g. what is needed to implement multiple imputation ([[Missing Data Models]]) or MCMC ([[Effective Sample Size and Monte Carlo Standard Error]]). These are out of scope "unless the properties of some such method are being evaluated by a simulation study."

> [!definition] Five uses of simulation studies in medical statistics (§1, p.2)
> 1. **Check algebra (and code)** — reassurance that no large error has been made when a new method was derived mathematically.
> 2. **Check large-sample approximations in finite samples** (e.g. the sampling distribution of an estimator).
> 3. **Absolute evaluation** of a new or existing method — often checking it works in the scenarios it was designed for.
> 4. **Comparative evaluation** of two or more methods.
> 5. **Sample size / power calculation** when designing a study under assumptions — cited example: Feiveson (2002) [1], "Power by simulation", *Stata Journal* (cf. [[Power Analysis and Sample Size]]).
>
> The tutorial focuses on evaluation (uses 3-4). Such studies are "typically motivated by frequentist theory and used to evaluate the frequentist properties of methods, even if the methods are Bayesian" (p.2). The citations for evaluating frequentist properties of Bayesian methods are Rubin (1984) [2], on "Bayesianly justifiable and relevant frequency calculations", and Grieve (2016) [3], on being a "well-calibrated" Bayesian in clinical drug development.
^def-five-uses

**A long-standing complaint (p.2).** Poor practice has been "lamented previously" by Hoaglin & Andrews (1975), Hauck & Anderson (1984), Ripley (1987), Burton et al. (2006) and Koehler, Brown & Haneuse (2009). The sharpest point: few reports acknowledge that Monte Carlo procedures give different results with different random numbers, "yet failing to report measures of uncertainty would be unacceptable in medical research" (p.2).

> [!note] Background literature the tutorial builds on (§1, p.2)
> The paper says there exist "some wonderful books on simulation methods in general" and "several excellent articles encouraging rigour in specific aspects of simulation studies", "but, until now, no unified practical guidance on simulation studies" (p.2). Full bibliographic details are in [[Morris et al 2019 - Full Reference List and Further Reading]].
>
> | Role in §1 | Ref | Work | What it covers |
> |---|---|---|---|
> | General book | [6] | Ripley (1987), *Stochastic Simulation*, Wiley | Generating random variates; also cited in §3.2 for simulating specific distributions |
> | General book | [9] | Morgan (1995), *Elements of Simulation*, Chapman & Hall/CRC | Same role as Ripley in §3.2 |
> | General book | [10] | Chang (2011), *Monte Carlo Simulation for the Pharmaceutical Industry*, CRC | Concepts, algorithms and case studies |
> | Rigour article | [1] | Feiveson (2002), "Power by simulation", *Stata Journal* 2(2):107-124 | Simulation for power/sample size |
> | Rigour article (also lament) | [4] | Hoaglin & Andrews (1975), *Am Stat* 29(3):122-126 | Reporting of computation-based results |
> | Rigour article (also lament) | [5] | Hauck & Anderson (1984), *Am Stat* 38(3):214-216 | Survey of how simulation studies are reported |
> | Rigour article (also lament) | [8] | Koehler, Brown & Haneuse (2009), *Am Stat* 63:155-162 | Assessing Monte Carlo error |
> | Rigour article | [11] | Díaz-Emparanza (2002), "Is a small Monte Carlo analysis a good analysis?", *Statistical Papers* 43(4):567-577 | Choosing the number of repetitions |
> | Rigour article | [12] | White (2010), "simsum: Analyses of simulation studies including Monte Carlo error", *Stata Journal* 10(3):369-385 | Software for performance measures and MCSEs (used for Table 8) |
> | Rigour article | [13] | Smith & Marshall (2011), "Importance of protocols for simulation studies in clinical drug development", *SMMR* 20(6):613-622 | Protocols (cf. [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]]) |
> | Rigour article | [14] | Crowther & Lambert (2013), "Simulating biologically plausible complex survival data", *Stat Med* 32(23):4118-4134 | Data generation for survival outcomes |
> | Rigour article | [15] | Holford, Hale, Ko et al. (1999), *Simulation in drug development: good practices* | Good-practice guidance |
> | Rigour article | [16] | O'Kelly, Anisimov, Campbell & Hamilton (2017), "Proposed best practice for projects that involve modelling and simulation", *Pharmaceutical Statistics* 16(2):107-113 | Best practice for modelling-and-simulation projects |
>
> The lament list (Hoaglin & Andrews; Hauck & Anderson; Ripley; Burton et al. 2006 [7], *Stat Med* 25(24):4279-4292; Koehler et al.) overlaps with both groups. Burton et al. 2006 is the closest predecessor: a design guide for simulation studies in medical statistics.
^ref-background-literature

**What the tutorial provides (p.2; Abstract).** (i) the ADEMP structured approach for planning and reporting; (ii) coherent terminology; (iii) coding guidance; (iv) critical discussion of performance measures and their estimation; (v) guidance on tabular and graphical presentation; (vi) new graphics (zip plot, lollipop plot); plus the review. The paper's own roadmap: §2 review, §3 ADEMP, §4 coding, §5 analysis and Monte Carlo SE, §6 reporting, §7 worked example, §8 conclusions with §8.1 future directions. Examples come from the authors' fields: survival data, missing data, meta-analysis and randomised trial design.

### Table 1 — the master checklist (p.3)

> [!definition] Table 1: Key steps and decisions in planning, coding, analysis and reporting (p.3)
> | Stage | Step / decision | Section |
> |---|---|---|
> | **PLANNING** | | 3 |
> | Aims | Identify specific aims of the simulation study. | 3.1 |
> | Data-generating mechanisms | Decide (in relation to aims) between resampling and simulation from a parametric model. | 3.2 |
> | | For parametric simulation, decide how simple or complex the model should be and whether it should be based on real data. | 3.2 |
> | | Determine what factors to vary and the levels of factors. | 3.2 |
> | | Decide whether factors are varied fully factorially, partly factorially or one-at-a-time. | 3.2 |
> | Estimand / target | Define estimands and/or other targets. | 3.3 |
> | Methods | Identify methods and check they are appropriate for the estimand/target; for comparisons, review the literature to include relevant methods. | 3.4 |
> | Performance measures | List all performance measures, justifying relevance to estimands/targets. | 3.5, 5.2 |
> | | For less-used measures, give explicit formulae to avoid ambiguity. | 5.2 |
> | | Choose $n_{\text{sim}}$ achieving acceptable Monte Carlo SE for key measures. | 5.2, 5.3 |
> | **CODING AND EXECUTION** | Separate scripts that analyse simulated datasets from scripts that analyse estimates datasets. | 4 |
> | | Start small and build up code, with plenty of checks. | 4 |
> | | Set the random number seed once per simulation *(see note)*. | 4 |
> | | Store the random number states at the start of each repetition. | 4 |
> | | If running chunks in parallel, use separate streams of random numbers. | 4 |
> | **ANALYSIS** | Exploratory analysis of results, particularly graphical. | 5 |
> | | Compute estimates of performance and Monte Carlo SEs. | 5.2 |
> | **REPORTING** | Describe the study using ADEMP with sufficient rationale for choices. | 6 |
> | | Structure tables/graphs to place competing methods side-by-side. | 6 |
> | | Include Monte Carlo SE as an estimate of simulation uncertainty. | 5.2 |
> | | Publish code, including user-written routines. | 8 |
>
> *Note:* Table 1's text reads "Set the random number seed once per simulation repetition", but §4.1 (p.10) says to set the seed "at the beginning, once and only once" and to *store states* per repetition. The §4.1 reading is the operative advice; see [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]].
^tbl-key-steps

### The review of Statistics in Medicine Volume 34 (§2, pp.3-4; Appendix A)

> [!example] Review design (§2, p.4)
> - **Population.** Research articles in Vol. 34 (2015), excluding tutorials, commentaries, book reviews, corrections, letters and responses: **264 research articles, of which 199 (75%) included at least one simulation study**.
> - **Sample size choice.** Most questions were binary; to estimate proportions with **maximum SE 0.05** (at $p=0.5$, $\sqrt{0.25/100}=0.05$), they **randomly selected 100** articles with a simulation study — the paper applies its own $n_{\text{sim}}$ logic to its review.
> - **Reviewers.** TPM 35, IRW 34, MJC 31; articles swapped if a reviewer was a (co-)author. TPM double-reviewed five of each other reviewer's articles to check agreement.
> - **Data.** Raw data released as a Stata file in the supplementary materials.
^ex-review-design

**Reviewer agreement (Appendix A, Fig. A1, p.30).** Agreement measured on **14 key variables**: type of DGM; DGM parameters given; total number of DGMs; number of factors varied; variation of factors; $n_{\text{sim}}$; justification of $n_{\text{sim}}$; number of methods; target; number of estimands; Monte Carlo errors presented; results in figure; results in table; results in text. Overall TPM agreed with the others on **132/140 answers (94%)**; IRW-TPM **65/70 (93%)**; MJC-TPM **67/70 (96%)**. Per-variable counts (read from Fig. A1, p.30; scale 0-5 agreements; 70 answers over 14 variables implies 5 double-coded articles per pair):

| Variable | IRW-TPM (W) | MJC-TPM (C) |
|---|---|---|
| Type of data-generating mechanism | 5 | 5 |
| Parameters of DGMs given | 5 | 5 |
| Number of DGMs in total | 3 | 5 |
| Number of factors varied | 4 | 5 |
| Variation of factors | 4 | 5 |
| Number of repetitions $n_{\text{sim}}$ | 5 | 5 |
| Justification of $n_{\text{sim}}$ | 5 | 5 |
| Number of methods | 5 | 5 |
| Target of simulation study | 5 | 5 |
| Number of estimands | 5 | 5 |
| Monte Carlo errors presented | 5 | 5 |
| Results given in figure | 4 | 5 |
| Results given in table | 5 | 5 |
| Results given in text | 5 | 2 |
| **Total** | **65/70** | **67/70** |

The column totals match the paper's 65/70 and 67/70, which supports the reading. The lowest single agreement is MJC-TPM on "results given in text" (2/5). For IRW-TPM it is "number of DGMs in total" (3/5).

#### All review findings, collected

| Topic | Finding | Location |
|---|---|---|
| DGM type | **97** parametric models, **3** resampling | §3.2 p.6 |
| Basis of parameter values (of 97) | 27 based on data, 1 partly on data, **69 on no data** | §3.2 p.6 |
| Parameters reported | 91/97 (94%) gave the parameters used | §3.2 p.6 |
| Most careful example | Design factors drawn from empirical data on 14,886 meta-analyses from 1,991 Cochrane Reviews (Kuss 2015) | §3.2 p.6 |
| Number of DGMs | 1 to $4.2\times10^{10}$ (~41 billion); most used under 20 | §3.2 p.6; App. A p.30 |
| Design of factor variation | Fully factorial most frequent; some partly factorial; **none used** interaction-only, predict-and-check or fractional factorial approaches | §3.2 p.6 |
| Primary target | **64 estimand, 21 null hypothesis, 8 selected model, 3 predictive performance, 4 other** | §3.3 p.7 |
| Estimand stated | 51 of 64 estimand-targeting studies stated the estimand | §3.3 p.7 |
| Methods compared | 1 to 33 methods | §3.4 p.8 |
| Misleading names | 8 articles had unclear performance measures; e.g. "mean error" used for a formula that is mean *absolute* error | §3.5 p.8 |
| Secondary targets | 9 studies primarily targeting a null hypothesis secondarily targeted an estimand and could have assessed bias; 1 did | §3.5 p.8 |
| Software | 62 mentioned software; 7 used more than one package | §4.3 p.13 |
| Monte Carlo SE | **93 did not mention Monte Carlo SEs** | §5.2 p.14 |
| Monte Carlo SE presentation | **7** presented MCSEs: 3 in text, 2 in a table, 1 in a graph, 1 in a float caption | §6.2 p.19 |
| $n_{\text{sim}}$ reported | 4 did not report $n_{\text{sim}}$; common values 500 and 1,000 | §5.3 p.17 |
| $n_{\text{sim}}$ justified | **4 of 87** reporting $n_{\text{sim}}$ gave any justification | §5.3 p.17 |
| Estimating $\theta$ | Of 74 studies with some $\theta$: 9 estimated it, 57 used a known $\theta$, 8 unclear | §5.4 p.18 |

The four $n_{\text{sim}}$ justifications (§5.3, p.17) were: "To evaluate the asymptotic biases"; "errors can be reduced by the large number of simulation replicates"; a computing-time justification to which a reviewer added that 10,000 meta-analyses guarantee an SE below 0.5 for an estimated percentage (Kuss); and, "most positively", Marozzi's explicit derivation of Monte Carlo SE.

> [!definition] Table 4: Performance measures evaluated in the Vol. 34 review — frequency (%) (p.9)
> | Performance measure | Overall | Estimand ($n$=64) | Null hypothesis ($n$=21) | Selected model ($n$=8) | Predictive performance ($n$=3) | Other ($n$=4) |
> |---|---|---|---|---|---|---|
> | Convergence | 12/85 (14%) | 10/61 (16%) | 1/15 (7%) | 1/6 (17%) | 0/2 | 0/1 |
> | Bias | 63/80 (79%) | 59/64 (92%) | 1/9 (11%) | 0/2 | 2/3 | 1/2 |
> | Empirical SE | 31/78 (40%) | 31/62 (50%) | 0/9 | 0/2 | 0/3 | 0/2 |
> | Mean squared error | 26/78 (33%) | 22/62 (35%) | 2/9 (22%) | 0/2 | 1/3 | 1/2 |
> | Model SE | 22/77 (29%) | 21/62 (34%) | 1/9 (11%) | 0/2 | 0/3 | 0/1 |
> | Type I error | 31/95 (33%) | 8/62 (13%) | 18/21 (86%) | 4/6 | 0/3 | 1/3 |
> | Power | 28/95 (29%) | 8/63 (13%) | 14/20 (17%)* | 4/6 | 0/3 | 2/3 |
> | Coverage | 42/79 (53%) | 39/63 (62%) | 1/9 (11%) | 0/2 | 1/3 | 1/2 |
> | Conf. int. length | 11/80 (14%) | 9/63 (14%) | 0/10 | 0/2 | 1/3 | 1/2 |
>
> Denominators change because not every measure applies to every study.
> \*Transcribed as printed; 14/20 is 70%, so "17%" appears to be a typo in the source.
^tbl-review-measures

**Software (Table A1, p.31).** Counts exceed 100 because some articles named several packages, and "mention" was judged leniently: none mentioned 38; **R 41**; **SAS 17**; Stata 4; WinBUGS 3; C, JAGS, MATLAB, SaTScan, StatXact 1 each.

**DGM summaries (Fig. A2, p.32; counts read off the dot plots, so approximate).**
- (a) *Total DGMs:* most studies used under 20; the most common totals were 3 (~12 studies), 4 (~10) and 12 (~8). The tail includes 9,090, 9,600 and $4.184\times10^{10}$.
- (b) *Factors varied:* 0 (~5), 1 (~13), **2 (~29)**, 3 (~22), 4 (~15), 5-6 (~5 each), and a few with 7, 8, 9, 14 and one outlier at 324.
- (c) *How factors varied:* factorial (~57) ≫ N/A (~19) > partly factorial (~12) > one-at-a-time (~8) > other (~4).
- (d) *$n_{\text{sim}}$ per DGM:* most common in descending order **1,000 (~41), 500 (~14), 10,000 (~10)**; others from 1 to 1,000,000; ~4 not stated.

**Estimands and methods (Fig. A3, p.33; approximate).** (a) A **single estimand** was most common (~31 studies), then 2-3 (~10-11 each), with a tail up to 32. (b) **Four methods** was the most common number (~23), then 3 (~17), 2 (~16), 1 (~13), up to 33. The authors' reading (App. A, p.30): few methods "suggests that simulation studies provide a proof-of-concept, or that the methods are designed for new problems for which there are few alternatives available."

## Examples

> [!example] Applying the review's own lens to a modelling team
> A quick audit of a team's own method-validation work can reuse the review's 14 variables as a scorecard: Was the DGM described with parameters? How many factors, and varied how? What $n_{\text{sim}}$, and was it justified? Were Monte Carlo SEs reported? In marketing analytics, a typical *we simulated it and the model recovered the effects* claim (e.g. one simulated weekly dataset of 104 rows, one seed, no MCSE) would fail most items. See [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]].
^ex-applying-review-own-lens

## Connections

- The finding that Monte Carlo uncertainty goes unreported parallels the MCMC-level advice in [[How Many Digits to Report]] and [[Effective Sample Size and Monte Carlo Standard Error]].
- The review is itself a small empirical study designed with a precision target, the same reasoning as [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^thm-nsim-coverage|Eq. 1]].
- Reporting failures in methods research mirror those documented for substantive research in [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] and [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].

## See Also

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
- [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] — what the review measured against
- [[Designing Simulated-Data Experiments]] — the Bayesian-workflow view of simulation
