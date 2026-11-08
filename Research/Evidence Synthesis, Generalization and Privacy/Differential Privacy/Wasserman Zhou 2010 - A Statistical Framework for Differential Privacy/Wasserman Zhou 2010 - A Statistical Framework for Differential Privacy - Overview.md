---
title: "Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Whole paper (arXiv:0811.2501v2, JASA 105(489), 2010): Sec. 1 Introduction and Summary of Results, Sec. 2 Differential Privacy, Sec. 3 Informative Mechanisms, Sec. 4 Sampling From a Histogram, Sec. 5 Exponential Mechanism, Sec. 6 Orthogonal Series Density Estimation, Sec. 7 Example, Sec. 8 Conclusion, Sec. 9 Proofs"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]]"
  - "[[Nonparametric Models Overview]]"
used_by:
  - "[[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]"
  - "[[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]]"
  - "[[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]]"
  - "[[Wasserman Zhou 2010 - Histogram Release Mechanisms]]"
  - "[[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]"
  - "[[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]]"
  - "[[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]"
aliases:
  - Wasserman and Zhou 2010
  - A Statistical Framework for Differential Privacy
  - Wasserman Zhou JASA 2010
---

# Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview

> [!summary]
> Wasserman and Zhou re-read differential privacy in statistical language: a data release mechanism is a conditional distribution $Q_n(\cdot\mid X)$, DP caps the power of any hypothesis test about one individual at $\gamma e^{\alpha}$ for level $\gamma$, and mechanisms are compared by the **rate of convergence** of the released data's empirical distribution or density to the truth. Perturbing histogram counts with Laplace noise attains the minimax $L_2$ rate $n^{-2/(2+r)}$, whereas smoothed-histogram and exponential-mechanism releases are slower; the simulation shows the constants (noise inflation of 10x or more) matter as much as rates.

## Overview

**Authors / venue.** Larry Wasserman (Carnegie Mellon) and Shuheng Zhou (ETH Zurich). *A Statistical Framework for Differential Privacy*, JASA 105(489), 2010; arXiv:0811.2501v2 (42 pages). Research context: inspired by Blum, Ligett and Roth (2008), who gave a learning-theory approach to non-interactive release.

**Question.** Given i.i.d. data $X_1,\dots,X_n\sim P$ on $[0,1]^r$, which $\alpha$-DP mechanisms $Q_n$ yield released data $Z=(Z_1,\dots,Z_k)$ from which $P$ (its cdf $F$ or density $p$) can be estimated well, and at what rate?

**Contributions.**
1. DP phrased as a statistical constraint on hypothesis tests (Thm. 2.4) and as a statement about $Q_n$ (Def. 2.3).
2. A notion of *informative* mechanisms: consistency and $\epsilon_n$-informativeness measured by $\rho(F,\hat F_Z)$ (Def. 3.1), plus an impossibility result: no DP mechanism is consistent in KS distance for all $F$ (Thm. 3.2).
3. Two histogram-based releases (smoothed, perturbed) analysed under KS and $L_2$ distance (Thms. 4.1-4.4).
4. A general accuracy bound for the **exponential mechanism** in terms of *small ball probabilities* (Thm. 5.3), applied to the KS distance, the mean, and Sobolev density estimation (Thms. 5.4, 6.2).
5. A simulation (Beta(10,10)) showing that constants and the bin count matter far more for private than for non-private histograms (Sec. 7).

**Key results at a glance.** Rates for data in $\mathbb{R}^r$, Lipschitz density, smoothing parameter chosen optimally (Table 1 of the paper):

| Distance | smoothed histogram | perturbed histogram | exponential mechanism | minimax rate |
|---|---|---|---|---|
| $L_2$ (squared) | $n^{-2/(2r+3)}$ | $n^{-2/(2+r)}$ | NA | $n^{-2/(2+r)}$ |
| Kolmogorov-Smirnov | $\sqrt{\log n}\times n^{-2/(6+r)}$ | $\log n\times n^{-2/(2+r)}$ ($\sqrt{\log n/n}$ for $r=1$) | $n^{-1/3}$ | $n^{-1/2}$ |

## Main Content

### Source Map

| Paper section | Pages (arXiv) | Covered in |
|---|---|---|
| Abstract, 1 Introduction, literature on disclosure limitation | 1-3 | [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] |
| 1.1 Summary of Results (Tables 1-2) | 3-4 | this note; [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]] |
| 2 Differential Privacy (setup, Ex. 2.1, Def. 2.2-2.3, exponential mechanism definition, Lemma 2.6) | 4-7 | [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] |
| Thm. 2.4 (testing power), Bayes factor remark, Thm. 2.5 | 6-7 | [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]] |
| 3 Informative Mechanisms (Def. 3.1, Thm. 3.2) | 8-9 | [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]] |
| 4 Sampling From a Histogram, 4.1 smoothed (Thm. 4.1-4.3), 4.2 perturbed (Thm. 4.4), Machanavajjhala et al. comparison | 9-13 | [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] |
| 5 Exponential Mechanism, Lemma 5.1, Def. 5.2, Thm. 5.3 | 13-14 | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] |
| 5.1 KS distance (Thm. 5.4), 5.2 The mean | 15 | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] |
| 6 Orthogonal Series Density Estimation (Lemma 6.1, Thm. 6.2, 6.3) | 15-17 | [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]] |
| 7 Example (Figure 1) | 18-19 | [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]] |
| 8 Conclusion and open questions | 19-20 | [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]] |
| 9.1-9.2 Proofs of Thm. 2.4, Lemma 2.6 | 20 | [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]], [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] |
| 9.3 Proof of Thm. 3.2 | 21 | [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]] |
| 9.4-9.7 Proofs of Thm. 4.1-4.4 | 21-28 | [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] |
| 9.8-9.10 Proofs of Thm. 5.3, Lemma 5.1, Thm. 5.4 | 28-32 | [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] |
| 9.11 Proofs of Lemma 6.1, Thm. 6.2, Lemma 9.3 | 32-37 | [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]] |
| References | 37-42 | not captured (bibliography); key works named inline |

## Examples

The central quantitative example is the Beta(10,10) histogram simulation (Figure 1), reproduced and re-run with code in [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]; the hypothesis-testing bound is illustrated with randomized response in [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]].

## Connections

- **Marketing measurement.** The paper's lesson for anyone consuming privatised aggregates is statistical: (i) the *noise law is public*, so the privatised histogram is an additive-error observation and can be modelled, not just tolerated (the paper leaves "how a data analyst can use knowledge of $Q_n$ to improve inferences" to future work); (ii) the loss is governed by the ratio $m/(n\alpha)$ of bins to sample size times privacy: more granular cells (campaign x day x geo) inflate error quickly; (iii) rates hide constants and in the Beta(10,10) simulation (re-run in the rates note) perturbation inflated integrated squared error by factors from about 1x to about 20x even though the method attains the minimax rate. See [[Geo-Experiment Design and Power Analysis]] and [[Bayesian Estimation and Priors for MMM]].
- Nonparametric density estimation background: [[Nonparametric Models Overview]].

## See Also

- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]] — the Laplace mechanism used in the perturbed histogram.
- [[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]] — exponential mechanism and Laplace mechanism in textbook form.
