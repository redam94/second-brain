---
title: "Dorie 2019 - Estimands, Ignorability and Design Choices"
tags:
  - source/ingested
  - topic/benchmarks
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Secs. 3.1-3.3 (pp. 5-6), 4.1 (p. 7), 4.4 (pp. 11-12)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]]"
used_by:
  - "[[Dorie 2019 - Simulation Design and Knobs]]"
aliases:
  - SATT estimand
  - Ignorability and overlap in ACIC
  - Issues not addressed by the ACIC competition
---

# Dorie 2019 - Estimands, Ignorability and Design Choices

> [!summary]
> The competition targets the sample average treatment effect on the treated (SATT) for a binary treatment under strong ignorability, with overlap guaranteed for the treated, and simulates both treatment and outcome from real covariates. These restrictions make the competition fair and tractable, and the paper lists explicitly what it does not test: non-binary treatments, non-continuous outcomes, non-iid data, varying size, measurement error and violated assumptions.

## Overview

Section 3 sets notation; Section 4.1 justifies the design restrictions; Section 4.4 lists scope limits. Together they define the *estimand and assumptions* part of the ADEMP-style specification (see [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]).

## Main Content

### Notation and estimands (Sec. 3, 3.1)

Binary treatment $Z_i\in\{0,1\}$ ($0$ control, $1$ treatment). $Y_i(0)$, $Y_i(1)$ are potential outcomes; individual effect $Y_i(1)-Y_i(0)$ (Rubin 1978); observed outcome $Y_i=(1-Z_i)Y_i(0)+Z_iY_i(1)$. See [[Potential Outcomes Framework]].

> [!definition] Sample-level average effects
> - **SATE:** $\mathbb{E}[Y(1)-Y(0)]$ taken over the analysis sample.
> - **SATT** (sample average effect of treatment on the treated): the same average over treated units, $\frac{1}{n_1}\sum_{i:Z_i=1}\{Y_i(1)-Y_i(0)\}$.
> - **SATC** (on the controls): average over control units.
> Population analogues exist but are not addressed in the competition.
^def-sate-satt-satc

Related estimand vocabulary: [[Causal Estimands]].

### Structural assumptions (Sec. 3.2)

> [!definition] Ignorability and overlap
> **Ignorability** (a.k.a. selection on observables, all confounders measured, exchangeability, conditional independence, no hidden bias):
> $$Y(0),Y(1)\perp Z\mid X.$$
> Then $\mathbb{E}[Y(a)\mid Z=a,X]=\mathbb{E}[Y(a)\mid X]$ and an average effect is identified by averaging $\mathbb{E}[Y(1)\mid Z=1,X]-\mathbb{E}[Y(0)\mid Z=0,X]$ over the distribution of $X$ (over the treated units' $X$ for ATT; controls' for ATC). In a completely randomised experiment, $Y(0),Y(1)\perp Z$.
> **Strong ignorability** adds **overlap** (common support): $0<\Pr(Z=1\mid X)<1$ for all $X$ in the sample. Without it there are regions with treated but no controls (or vice versa), so "empirical counterfactuals" may not exist and methods rely on extrapolation of the response model.
> In causal-graph language the observed covariates form an admissible back-door adjustment set. All covariates are pre-treatment.
^def-ignorability-overlap

**Parametric assumptions (Sec. 3.3).** Even under ignorability one must estimate $\mathbb{E}[Y(1)\mid X]$ and $\mathbb{E}[Y(0)\mid X]$, nontrivial in high dimensions; the competition focuses on reliable causal inference when parametric assumptions are hard to satisfy.

### Design choices and their rationale (Sec. 4.1)

| Choice | Rationale (paper) |
|---|---|
| **Ignorability throughout** | Non-ignorable settings need context and science; inventing science would force submitters to guess it, and mapping to an existing theory would need subject expertise that could favour some teams |
| **Estimand: SATT** | Most methods can target it easily; a few do not naturally target the sample or population ATE. Sample-level because matching and similar methods lack natural variance estimators for population estimands (Abadie and Imbens 2006) |
| **Overlap only for the inferential (treated) group** | For SATT, only treated units need counterparts. If overlap fails researchers often redefine the inferential group (changing the estimand), which would make fairness complicated, so such settings were excluded |
| **Simulate both $Z$ and $Y$** | Guarantees ignorability and lets the organisers manipulate balance, overlap and nonlinearity in measurable ways, enabling analysis of data features vs performance |
| **Real covariates** | Calibrate variable types and covariate correlations (see [[Dorie 2019 - Simulation Design and Knobs]]) |

Information given to participants: continuous outcome, binary treatment, 58 covariates, ignorability holds, observations are iid, not all covariates are confounders; there are 77 scenarios, and only 20 data sets for the DIY competition.

### Issues not addressed (Sec. 4.4)

> [!definition] Scope limits listed by the authors
> 1. **Non-binary treatment:** fewer potential outcomes to reason about with binary; nonlinear relationships make summarising the effect harder.
> 2. **Non-continuous response:** non-collapsible parameters (Greenland, Robins and Pearl 1999): marginal and conditional expectations differ.
> 3. **Non-iid data:** heterogeneous errors or correlated responses are common; iid-only methods have limited viability.
> 4. **Varying data size or covariate count:** $n$, $p$ and $p/n$ affect performance.
> 5. **Covariate measurement error:** biases estimates; few standard methods accommodate it.
> 6. **Weakening the assumptions:** violating ignorability or overlap for the inferential group.
^def-scope-limits

## Examples

> [!example] Why SATT needs overlap only for the treated
> **Setup.** Propensity $e(x)=\Pr(Z=1\mid X=x)$ is $0$ on a corner region $C$ (no treated), positive elsewhere.
> **SATT.** Averages $Y(1)-Y(0)$ over treated units, none in $C$; the controls in $C$ are simply never needed. Overlap for the treated holds provided for every treated $x$ there are controls with similar $x$, even if some controls have no treated counterpart.
> **SATC or ATE.** Would require $Y(1)$ predictions for controls in $C$, with no treated data there; that is extrapolation.
> **Interpretation.** This is exactly the "low overlap" knob: controls in a corner of covariate space are dissimilar to all treated, tempting model-based methods to extrapolate ([[Dorie 2019 - Simulation Design and Knobs]]).
^ex-satt-overlap

## Connections

- Marketing: lift studies commonly estimate effect on the exposed (ATT-like) and observational benchmarks need overlap among exposed users; see [[From ITT to Treatment-on-the-Treated in Ad Experiments]] for the experimental ITT vs TOT distinction and [[Experimental Benchmarks for Observational Ad Measurement]].
- Propensity-score vocabulary: [[Propensity Score Matching - Overview]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Simulation Design and Knobs]]
